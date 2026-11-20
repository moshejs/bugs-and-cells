# r/medicalschool sample post (draft, not posted)

Status: **draft for the owner. Do not post it as written.** Rules checked 2026-11-20.

## Read this first: what the rules allow

**r/medicalschool does not allow this post without prior approval.** Rule 7 ("No advertising/self-promotion") says:
"Do not share your blog, vlog, YouTube channel, website [...]. If you have a free product you believe would really help medical students, message the mods for prior approval to posting."
Rule 13 ("No AI-generated content or AI tools") says posts "suspected of being AI-generated will be removed", and requests to promote AI study tools are declined.

- Rules page: https://www.reddit.com/r/medicalschool/about/rules/ (sidebar; full text also at https://www.reddit.com/r/medicalschool/wiki/rules)
- Rule 11: at least 10 comment karma and an account at least 72 hours old.
- What this means here: the site was built with heavy AI help (the repo's commits are co-authored by Claude), and this draft was written by an AI agent. So:
  1. Send the modmail below **before** posting. Say plainly how it was built, because hiding it breaks Rule 13 in spirit and gets the post removed if anyone notices. Expect a no.
  2. If the mods approve, **rewrite the post in your own words**. Use this draft as notes, not as copy.

**Alternatives, checked the same way (sidebar rules read 2026-11-20):**

| Subreddit | Rule that applies | Verdict |
|---|---|---|
| r/step1 (https://www.reddit.com/r/step1/) | Rule 1: "Do not request or offer to buy, trade, share, give, advertise, or sell access to [...] any third party resources" | **Banned.** Do not post. |
| r/medicalschoolanki (https://www.reddit.com/r/medicalschoolanki/) | Rule 6: "Promotional content, including links to your own tools, sites, or services, is not allowed without prior moderator approval." Rule 9: AI-tool posts must disclose costs. | Only with mod approval, and a poor fit because the sub is about Anki decks and this is a website. Skip it. |
| r/microbiology (https://www.reddit.com/r/microbiology/) | No self-promotion rule. Rule 5: posts must be about microorganisms. Rule 2: low-effort posts are removed. Rule 8: posts focused on AI are removed. Rule 9: account at least 72 hours old. | **Allowed** if the post is about microbiology content, not about the tool or AI. A variant is drafted below. Pathology pages are off-topic there. |

The raw rule text, as scraped, is in the proof folder: `~/quentin-admin-data/archive/2026-11-20-orchestrator/proof/bugs-and-cells/subreddit-rules-2026-11-20.txt`.

## Why the sample has 3 pages, not 5

Each candidate page was checked against references we could open: Merck Manuals Professional, CDC, FDA, MedlinePlus, NCI/SEER, ASM, WebPath and LibreTexts. NCBI Bookshelf (StatPearls) sits behind a reCAPTCHA for automated readers, so it was not used. **A page with any statement that an opened source contradicts or shows to be outdated was dropped.** Thirteen pages were checked and three passed. Fixing these errors is out of scope for this PR.

| Page | Result | What is wrong (source) |
|---|---|---|
| /hyper/ Hypersensitivity I–IV | **Kept** | No errors. One contested point: the page lists Hashimoto only under type IV, but Merck puts it under type II. It is left out of the sample. |
| /patterns/ Patterns of necrosis | **Kept** | No errors. Two standard teaching points ("every organ except the brain", blue-purple calcium in fat necrosis) were not found on an opened page. Nothing contradicts them. |
| /gram/ Gram stain | **Kept** | No errors. "5-minute stain" was not confirmed. The page says "alcohol"; ASM allows alcohol, acetone or a mix. |
| /abx/ Antibiotics | Dropped | The β-lactamase "counter" lists avibactam right after NDM-1, but avibactam does not inhibit metallo-β-lactamases (Merck carbapenems: https://www.merckmanuals.com/professional/infectious-diseases/bacteria-and-antibacterial-medications/carbapenems; CDC: https://www.cdc.gov/mmwr/volumes/74/wr/mm7423a2.htm). Metronidazole is listed for C. difficile, and Merck says it is "no longer recommended as a first-line antibiotic" (https://www.merckmanuals.com/professional/infectious-diseases/bacteria-and-antibacterial-medications/metronidazole-and-tinidazole). |
| /thrombo/ Hemostasis & thrombosis | Dropped | Andexanet is named as the Xa reversal agent, but US sales ended Dec 22, 2025, and the FDA says its risks outweigh its benefits (https://www.fda.gov/safety/medical-product-safety-information/update-safety-andexxa-astrazeneca-fda-safety-communication). Abciximab has also been unavailable in the US since 2019 (seen in search results only). |
| /infarct/ MI timeline | Dropped | "Troponin [...] stays up for a week" is understated; WebPath gives 10–14 days (https://webpath.med.utah.edu/TUTORIAL/MYOCARD/MYOCARD.html). Hypereosinophilia is placed at 4–12 h, where most tables put it at 12–24 h. |
| /neo/ Benign vs malignant | Dropped | The table says "(none)" for benign mesothelial and glial tumors. Adenomatoid tumor is benign and mesothelial, and pilocytic astrocytoma is WHO grade 1 (https://mypathologyreport.ca/?p=17224). "Most common tumor in women" for leiomyoma: Merck says "most common pelvic tumor". "Carcinoma 90%": SEER says 80–90% (https://training.seer.cancer.gov/disease/categories/classification.html). |
| /adapt/ Adaptation lab | Dropped | The scenario "A Pap smear shows [...] lost layering" is wrong, because a Pap smear is loose cells and cannot show layering; that takes a biopsy. This rests on how cytology works, not on a fetched source. |
| /shock/ Shock | Dropped | Anaphylaxis treatment lists steroids, but Merck: "Glucocorticoids have no proven role" (https://www.merckmanuals.com/professional/immunology-allergic-disorders/allergic,-autoimmune,-and-other-hypersensitivity-disorders/anaphylaxis). Anaphylactic cardiac output is shown as a flat "↑", while Merck says it can fall. |
| /healing/ Wound healing | Dropped | The keloid card says "excess type III collagen". Keloids are disorganized type I and III collagen, and type III excess goes with hypertrophic scars (https://en.wikipedia.org/wiki/Keloid). "10% tensile strength at 1 week": the opened sources put about 10% at 2 weeks. |
| /edema/ Edema | Dropped | Lists "too much aldosterone" as a cause of edema, but Merck on primary aldosteronism says "Edema is uncommon" (https://www.merckmanuals.com/professional/endocrine-and-metabolic-disorders/adrenal-disorders/primary-aldosteronism). At "Normal", the simulator labels tissue fluid "mild". |
| /virulence/ Toxins | Dropped, **not checked** | The automated fact-check of this page was stopped by a model safety filter, so it is unverified. A human should check it. |

Every page was rendered with Playwright at 390x844 and 1440x900. All returned HTTP 200, with no console errors and no page-level horizontal scroll; the chapter nav strip scrolls inside its own container, which is intended. Two rendering notes on the kept pages:

- /hyper/ on a phone: the Type I animation stage is nearly empty until the animation plays, and the "histamine" label is cut off at the right edge while it plays.
- Every page has two `<h1>` elements: the wordmark and the page title.

Screenshots are in the proof folder.

## Owner steps

1. Fix the dropped pages, or don't. Either way, the 3 kept pages are enough for the sample.
2. Send the modmail below from the account you will post with (https://www.reddit.com/message/compose?to=/r/medicalschool). Wait for a yes.
3. If they say yes, rewrite the post below in your own voice and post it. Reply to corrections in the comments, and log each one as a fix.
4. If they say no, post the r/microbiology variant instead (Gram stain only), or skip Reddit.

## Modmail draft (to r/medicalschool mods)

> Subject: Free path/micro study site — OK to post a sample?
>
> Hi mods. I'm a software engineer, not a medical student or clinician. I built a free pathology and microbiology study site, Bugs & Cells (no account, no ads, no paid tier). Per rule 7 I'm asking before posting.
>
> Being upfront for rule 13: I built it with a lot of help from AI coding tools, and I checked the pages I'd feature against Merck Manuals and other references. The post would put the actual content in the body (hypersensitivity types, necrosis patterns, Gram stain), link once, and mainly ask students to point out mistakes.
>
> If that's not a fit for the sub, no problem.

## Post draft (rewrite before posting)

**Title:** I made a free path/micro review site. Here are three topics from it; please tell me what's wrong.

**Body:**

I'm a software engineer, not a med student. I built a free pathology and microbiology study site with animated diagrams. I'd rather students find the mistakes now than have them sit there. Three topics from it:

**Hypersensitivity, I–IV ("ACID")**
- **I, Allergic:** IgE on mast cells. Minutes, plus a late phase at 4–8 h. Anaphylaxis, hay fever, asthma, urticaria. Epinephrine first.
- **II, Cytotoxic:** IgG/IgM against a cell-surface or matrix antigen. Transfusion reaction, HDN, AIHA, ITP, Goodpasture, pemphigus. Graves stimulates the receptor and myasthenia blocks it.
- **III, Immune complex:** antigen-antibody complexes deposit, activate complement and draw in neutrophils. SLE nephritis, PSGN, serum sickness (1–3 weeks), Arthus, PAN.
- **IV, Delayed (T cell):** 48–72 h. PPD, contact dermatitis (poison ivy, nickel), granulomas, GVHD, SJS.

**Patterns of necrosis**
- **Coagulative:** ghost outlines, no nuclei. Infarcts of solid organs (heart, kidney, spleen), but not the brain.
- **Liquefactive:** enzymes digest the tissue. Abscesses and brain infarcts.
- **Caseous:** cheesy center inside a granuloma. TB is the classic, plus some fungi.
- **Fat:** lipases split fat, and the fatty acids bind calcium to form soaps (saponification). Pancreatitis, breast trauma.
- **Fibrinoid:** bright pink smudge in vessel walls. Vasculitis, malignant hypertension.
- **Gangrene:** a clinical term, not a pattern. Dry = coagulative; wet = infection on top, so liquefactive; gas = C. perfringens.

**Gram stain, and what it misses**
- Crystal violet → iodine → decolorizer → safranin. Thick peptidoglycan keeps the purple; thin peptidoglycan plus an outer membrane washes out and turns pink.
- Won't Gram stain well:
  - Mycobacterium: waxy wall, so use acid-fast; they show up red.
  - Mycoplasma: no wall at all, which is also why penicillin doesn't work.
  - Treponema: too thin to see, so use darkfield.
  - Chlamydia, Rickettsia: they live inside our cells.

The site has interactive versions of these plus about 40 other topics, flashcards and a quiz. It's free with no account: https://bugs-and-cells.quentin.software

What I want: if you see something wrong, outdated, or taught differently in your course, comment with the page and what's off. I'll fix it and reply here. Classifications that sources disagree on (Hashimoto as type II vs IV, for one) are useful to hear about too.

## r/microbiology variant (no mod approval needed; keep it about the microbiology)

**Title:** Organisms that don't Gram stain well, and why (made this as a study page; corrections welcome)

**Body:** Use the "Gram stain, and what it misses" block above. Add one line saying you made it as part of a free study site, with the link once (https://bugs-and-cells.quentin.software/gram/), and ask: "Anything here that's oversimplified or that you'd teach differently?" Don't frame the post around the tool or AI (Rule 8).

## Claims and sources

Each claim in the post, where it appears on the site, and the reference that confirms it. Every reference page was opened on 2026-11-20.

| # | Claim in the post | On the site | Reference that confirms it |
|---|---|---|---|
| 1 | Type I: IgE on mast cells; minutes | /hyper/ | https://www.merckmanuals.com/professional/immunology-allergic-disorders/allergic,-autoimmune,-and-other-hypersensitivity-disorders/overview-of-allergic-and-atopic-disorders ("develop < 1 hour after exposure") |
| 2 | Type I late phase at 4–8 h | /hyper/ | https://www.merckmanuals.com/professional/immunology-allergic-disorders/allergic,-autoimmune,-and-other-hypersensitivity-disorders/anaphylaxis ("4 to 8 hours after the exposure or later") |
| 3 | Epinephrine first in anaphylaxis | /hyper/ | Merck anaphylaxis (above): "cornerstone of treatment" |
| 4 | Type I examples: anaphylaxis, hay fever, asthma, urticaria | /hyper/ | Merck allergic overview (row 1) |
| 5 | Type II: IgG/IgM against a cell-surface antigen; AIHA, ITP, Goodpasture, pemphigus, Graves, myasthenia | /hyper/ | Merck allergic overview (row 1); https://step2.medbullets.com/dermatology/120068/hypersensitivity-reactions |
| 6 | Type II: transfusion reaction, HDN | /hyper/ | https://bio.libretexts.org/Bookshelves/Microbiology/Microbiology_(OpenStax)/19%3A_Diseases_of_the_Immune_System/19.01%3A_Hypersensitivities |
| 7 | Type III: immune complexes, complement; SLE, serum sickness | /hyper/ | Merck allergic overview (row 1) |
| 8 | Type III: PSGN, Arthus, PAN | /hyper/ | Medbullets (row 5) |
| 9 | Serum sickness at 1–3 weeks | /hyper/ | https://medlineplus.gov/ency/article/000820.htm ("7 to 21 days after the first exposure") |
| 10 | Type IV: 48–72 h | /hyper/ | https://med.libretexts.org/Courses/Virginia_Tech_Carilion_School_of_Medicine/Block_V_Preparation_Materials/12%3A_Hypersensitivities/12.05%3A_Type_IV_(Delayed_Cell-Mediated)_Reactions ("two to three days") |
| 11 | Type IV: PPD, contact dermatitis, SJS | /hyper/ | Merck allergic overview (row 1); GVHD is in Medbullets (row 5) |
| 12 | Hashimoto classification differs between sources | /hyper/ lists type IV | Merck allergic overview lists it under type II; LibreTexts (row 10) and Medbullets list it under type IV |
| 13 | Coagulative: ghost cells, no nuclei; infarcts of solid organs | /patterns/ | https://webpath.med.utah.edu/CINJHTML/CINJ016.html; https://webpath.med.utah.edu/ATHHTML/ATH047.html |
| 14 | ...but not the brain (brain infarcts liquefy) | /patterns/ | https://webpath.med.utah.edu/CINJHTML/CINJ023.html ("liquefactive necrosis of the brain") |
| 15 | Liquefactive: abscesses, bacterial infection | /patterns/ | https://en.wikipedia.org/wiki/Necrosis; https://webpath.med.utah.edu/CINJHTML/CINJIDX.html |
| 16 | Caseous: cheesy center in a granuloma; TB | /patterns/ | https://webpath.med.utah.edu/CINJHTML/CINJ030.html; Wikipedia Necrosis (row 15) |
| 17 | Caseous: some fungi | /patterns/ | https://webpath.med.utah.edu/LUNGHTML/LUNG031.html (histoplasmosis, cryptococcosis, coccidioidomycosis) |
| 18 | Fat necrosis: lipases, soaps (saponification); pancreatitis | /patterns/ | https://webpath.med.utah.edu/CINJHTML/CINJ026.html; Wikipedia Necrosis (row 15) |
| 19 | Fat necrosis after breast trauma | /patterns/ | https://www.tau.ac.il/medicine/tau-only/webpath/breshtml/brest010.htm ("most common etiology is trauma") |
| 20 | Fibrinoid: pink in vessel walls; vasculitis, malignant hypertension | /patterns/ | https://en.wikipedia.org/wiki/Fibrinoid_necrosis |
| 21 | Gangrene: dry = coagulative, wet = liquefactive | /patterns/ | https://webpath.med.utah.edu/CINJHTML/CINJ032.html |
| 22 | Gas gangrene = C. perfringens | /patterns/ | https://www.merckmanuals.com/professional/infectious-diseases/anaerobic-bacteria/clostridial-soft-tissue-infections |
| 23 | Gram stain order: crystal violet, iodine, decolorizer, safranin | /gram/ | https://asm.org/protocols/gram-stain-protocols |
| 24 | Gram+ thick peptidoglycan keeps purple; Gram− thin peptidoglycan plus outer membrane turns pink | /gram/ | https://bio.libretexts.org/Learning_Objects/Laboratory_Experiments/Microbiology_Labs/Microbiology_Labs_II/06%3A_Gram_Stain_and_Capsule_Stain/6.01%3A_Introduction; https://www.merckmanuals.com/professional/infectious-diseases/bacteria-and-antibacterial-medications/overview-of-bacteria |
| 25 | Mycobacterium: acid-fast, red | /gram/ | https://www.merckmanuals.com/professional/infectious-diseases/laboratory-diagnosis-of-infectious-disease/microscopy |
| 26 | Mycoplasma: no wall; penicillin doesn't work | /gram/ | https://www.merckmanuals.com/professional/infectious-diseases/chlamydiae-and-mycoplasmas/mycoplasmas |
| 27 | Treponema: darkfield | /gram/ | Merck microscopy (row 25) |
| 28 | Chlamydia, Rickettsia live inside cells | /gram/ | Merck overview of bacteria (row 24) |
| 29 | "Free, no account" | whole site | Repo check: no login, sign-up or paywall code in `index.html`; JSON-LD has `isAccessibleForFree: true` |
| 30 | "about 40 other topics, flashcards and a quiz" | home, /review/, /quiz/ | 46 page folders in the repo (43 besides the three sampled); /review/ meta says "139 flashcards and 29 mnemonics" |
| 31 | "I built it" / "with a lot of help from AI coding tools" | repo | The commit history has Moshe Malka as author with Claude co-author trailers |

Not claimed anywhere: exam scores, user numbers, traffic, testimonials or clinician review.
