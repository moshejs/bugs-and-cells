// Checks for the built pages. No dependencies: `node tests/check.mjs` (add `--live` to also fetch every
// cross-link target and expect HTTP 200).
//
// 1. Every page carries the same app script, and it parses.
// 2. Clinical vignettes: each clue is quoted from the answer's gallery card, no clue gives the name away, every
//    decisive key is on the answer's card and on none of the distractors' cards, so exactly one option matches
//    all decisive clues.
// 3. Cross-links to Medical Companions: hard-coded host, rel="noopener", no query string, only to a known
//    condition page, and only from a card whose own text names that condition. The anchors Medical Companions
//    links back to exist.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LIVE = process.argv.includes('--live');
let fails = 0;
const fail = m => { fails++; console.log('FAIL ' + m); };

// Medical Companions condition pages that exist (https://www.medcompanions.org/<slug>/).
const MC_SLUGS = ['alzheimers', 'fmf', 'myasthenia-gravis', 'gout', 'als', 'parkinsons-disease', 'multiple-sclerosis',
  'colorectal-cancer', 'ehlers-danlos-syndromes', 'tuberculosis', 'borderline-personality-disorder', 'adhd', 'autism',
  'bipolar-disorder', 'alcohol-use-disorder', 'myocardial-infarction', 'cirrhosis', 'sepsis-and-shock',
  'cystic-fibrosis', 'stroke', 'guillain-barre-syndrome', 'obesity'];
// Anchors that Medical Companions links to (keep in step with its tools/check_crosslinks.py).
const INBOUND = { gallery: ['bug-mycobacterium-tuberculosis', 'bug-campylobacter-jejuni', 'bug-streptococcus-gallolyticus-bovis',
  'bug-pseudomonas-aeruginosa'], virus: ['vir-hepatitis-b'], defense: [] };

// ---- 1. pages and script ----
const pages = [join(ROOT, 'index.html')];
for (const d of readdirSync(ROOT)) {
  const f = join(ROOT, d, 'index.html');
  try { if (statSync(f).isFile()) pages.push(f); } catch {}
}
const scriptOf = html => { const m = html.match(/<script>\n(\(\(\)=>\{[\s\S]*?\}\)\(\);)\n<\/script>/); return m && m[1]; };
const main = readFileSync(pages[0], 'utf8');
const SCRIPT = scriptOf(main);
if (!SCRIPT) { console.log('FAIL no app script in index.html'); process.exit(1); }
try { new vm.Script(SCRIPT); } catch (e) { fail('app script does not parse: ' + e.message); }
for (const p of pages) if (scriptOf(readFileSync(p, 'utf8')) !== SCRIPT) fail(`${p}: app script differs from index.html`);
console.log(`${pages.length} pages share one app script`);

// Pull the data literals out of the script and evaluate only them.
const grab = (name, end = '\n];') => {
  const i = SCRIPT.indexOf(`const ${name}=`); if (i < 0) throw new Error('missing ' + name);
  const j = SCRIPT.indexOf(end, i); return vm.runInNewContext('(' + SCRIPT.slice(i + name.length + 7, j + end.length - 1) + ')');
};
const BUGS = grab('BUGS'), VIRL = grab('VIRL'), VIG = grab('VIG');
const MC = grab('MC', '\n};'), MC_LINKS = grab('MC_LINKS', '};');
const MC_HOST = vm.runInNewContext(SCRIPT.match(/const MC_HOST=('[^']+');/)[1]);
const slugOf = s => s.toLowerCase().replace(/<[^>]+>/g, '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---- 2. vignettes ----
const norm = s => String(s).replace(/<[^>]+>/g, '').replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// whole-word match: no letter or digit right before or after the key
const has = (text, key) => new RegExp(`(?<![\\p{L}\\p{N}])${esc(norm(key))}(?![\\p{L}\\p{N}])`, 'u').test(norm(text));
const FIELDS = ['dz', 'w', 'h', 'p', 'o'], KINDS = ['who', 'set', 'find', 'vf', 'lab', 'path'];
const byName = Object.fromEntries(BUGS.map(b => [b.n, b]));
const cardText = b => [b.sub, ...FIELDS.map(f => b[f])].filter(Boolean).join(' · ');
const seen = new Set();
for (const v of VIG) {
  const b = byName[v.a], tag = `vignette ${v.a}`;
  if (!b) { fail(`${tag}: answer is not a gallery card`); continue; }
  if (seen.has(v.a)) fail(`${tag}: second vignette for the same organism`); seen.add(v.a);
  if (!Array.isArray(v.x) || v.x.length !== 3 || new Set(v.x).size !== 3 || v.x.includes(v.a)) fail(`${tag}: needs 3 distinct distractors`);
  for (const x of v.x) if (!byName[x]) fail(`${tag}: distractor ${x} is not a gallery card`);
  if (!v.c.some(c => c[0] === 'find')) fail(`${tag}: no findings row`);
  const decisive = v.c.filter(c => c[3]);
  if (!decisive.length) fail(`${tag}: no decisive clue`);
  // the full genus or species word, or the genus stem (strep…, staph…), would give the answer away
  const words = norm(v.a).split(/[^a-z]+/).filter(t => t.length >= 4), genus = words[0].slice(0, 5);
  for (const [kind, field, quote, dec, key] of v.c) {
    if (!KINDS.includes(kind)) fail(`${tag}: unknown row kind ${kind}`);
    if (!FIELDS.includes(field)) fail(`${tag}: unknown field ${field}`);
    if (!norm(b[field] || '').includes(norm(quote))) fail(`${tag}: "${quote}" is not on the card's ${field}`);
    for (const t of words) if (has(quote, t)) fail(`${tag}: "${quote}" gives away the name (${t})`);
    if (norm(quote).includes(genus)) fail(`${tag}: "${quote}" gives away the genus (${genus}…)`);
    if (/\b(treat|treated|treatment|therapy|management|mg)\b/i.test(quote)) fail(`${tag}: "${quote}" is about treatment`);
    if (!dec) continue;
    const k = key || quote;
    if (!norm(quote).includes(norm(k))) fail(`${tag}: key "${k}" is not part of its quote`);
    if (!has(cardText(b), k)) fail(`${tag}: key "${k}" is not on the answer's card`);
    for (const x of v.x) if (byName[x] && has(cardText(byName[x]), k)) fail(`${tag}: distractor ${x} shares the decisive clue "${k}"`);
  }
  const matchAll = [v.a, ...v.x].filter(n => byName[n] && decisive.every(c => has(cardText(byName[n]), c[4] || c[2])));
  if (matchAll.length !== 1 || matchAll[0] !== v.a) fail(`${tag}: ${matchAll.length} options match every decisive clue`);
}
const missing = BUGS.map(b => b.n).filter(n => !seen.has(n));
console.log(`${VIG.length} vignettes cover ${seen.size} of ${BUGS.length} gallery organisms${missing.length ? '; not covered: ' + missing.join(', ') : ''}`);

// ---- 3. cross-links ----
const linkHtml = vm.runInNewContext(`const MC_HOST=${JSON.stringify(MC_HOST)},MC=${JSON.stringify(MC)};` + SCRIPT.match(/const mcLink=.*;\n/)[0] + 'mcLink');
if (MC_HOST !== 'https://www.medcompanions.org') fail('MC_HOST is not the hard-coded production host');
const targets = new Set();
for (const [name, slug] of Object.entries(MC_LINKS)) {
  if (!MC_SLUGS.includes(slug) || !MC[slug]) { fail(`link ${name} → ${slug}: not a Medical Companions condition page`); continue; }
  const bug = byName[name], vir = VIRL.find(v => v[1] === name);
  if (!bug && !vir) { fail(`link ${name}: no gallery or virus card has that name`); continue; }
  const text = bug ? cardText(bug) : vir[2];
  if (!has(text, MC[slug].t)) fail(`link ${name} → ${slug}: the card does not name "${MC[slug].t}"`);
  const h = linkHtml(slug);
  const href = h.match(/href="([^"]+)"/)[1];
  if (href !== `https://www.medcompanions.org/${slug}/` || href.includes('?')) fail(`link ${name}: unexpected href ${href}`);
  if (!/rel="noopener"/.test(h)) fail(`link ${name}: no rel="noopener"`);
  targets.add(href);
}
// static link on the defense page (sepsis cascade)
const staticLinks = [...main.matchAll(/<a href="(https:\/\/www\.medcompanions\.org\/[^"]*)"([^>]*)>/g)];
for (const [, href, attrs] of staticLinks) {
  const slug = href.replace('https://www.medcompanions.org/', '').replace(/\/$/, '');
  if (!MC_SLUGS.includes(slug) || href.includes('?')) fail(`static link ${href}: not a known condition page`);
  if (!/rel="noopener"/.test(attrs)) fail(`static link ${href}: no rel="noopener"`);
  targets.add(href);
}
const defense = main.slice(main.indexOf('id="m-defense"'), main.indexOf('id="m-abx"'));
if (!/medcompanions\.org\/sepsis-and-shock\//.test(defense) || !has(defense, 'sepsis')) fail('defense page: sepsis link missing or topic not named');
if (/medcompanions\.org[^"]*[?&](utm|ref)=/.test(SCRIPT + main)) fail('tracking parameters on a cross-link');
// anchors Medical Companions points at
for (const id of INBOUND.gallery) if (!BUGS.some(b => 'bug-' + slugOf(b.n) === id)) fail(`inbound anchor #${id} has no gallery card`);
for (const id of INBOUND.virus) if (!VIRL.some(v => 'vir-' + slugOf(v[1]) === id)) fail(`inbound anchor #${id} has no virus card`);
console.log(`${Object.keys(MC_LINKS).length} card links + ${staticLinks.length} page link to ${targets.size} Medical Companions pages`);

if (LIVE) {
  const urls = [...targets, ...Object.keys(INBOUND).map(m => `https://bugs-and-cells.quentin.software/${m}/`)];
  for (const u of urls) {
    try { const r = await fetch(u, { redirect: 'manual' }); if (r.status !== 200) fail(`${u}: HTTP ${r.status}`); else console.log(`200 ${u}`); }
    catch (e) { fail(`${u}: ${e.message}`); }
  }
}

console.log(fails ? `${fails} problem(s)` : 'all checks passed');
process.exit(fails ? 1 : 0);
