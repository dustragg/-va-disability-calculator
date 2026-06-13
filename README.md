# VA Disability Rating Estimator

A mobile-friendly, static educational web app that estimates possible VA disability ratings for selected Version 1, Version 2, Version 3, and Version 4 condition-workspace foundations and demonstrates combined-rating "VA math."

## Regulatory audit status

Version 1 through Version 4 criteria were reviewed against current eCFR rating schedule text in June 2026. The audit preserved the original Version 1 condition list and existing combined-rating VA math, updated outdated GERD logic from the former hiatal-hernia analogy to current DC 7206, preserved diagnostic-code references, added in-app audit notes explaining assumptions and evidence limitations, and introduced separate evidence-tracking fields that do not alter rating calculations.

## Version 1 conditions

- Migraines
- Neck / cervical spine limitation of motion
- Shoulder limitation of motion
- Flat feet / pes planus
- Bunion / hallux valgus
- GERD
- Hypertension
- Sleep apnea

## Version 2 conditions

- Lumbar spine / thoracolumbar limitation
- Left lower-extremity sciatic radiculopathy
- Right lower-extremity sciatic radiculopathy

## Version 3 conditions

- Hip conditions, including bursitis and range-of-motion limitations
- Knee conditions, including flexion, extension, instability, and meniscus conditions
- Mental health conditions using the General Rating Formula for Mental Disorders
- Left and right femoral nerve peripheral nerve support

## Version 4 evidence tracking foundation

Version 4 begins the Personal VA Claim Workspace foundation while keeping the app static and preserving all estimator behavior. Every mapped condition now includes structured, optional evidence fields for symptoms, symptom frequency, symptom severity, medications and treatment, flare-ups, functional impact, work impact, doctor comments, radiology/imaging findings, DBQ findings, and general evidence notes. Each evidence category can be marked as evidence present, evidence missing, or evidence not yet entered.

Evidence is currently stored only in the live browser form state while the page is open. There is no local storage, database, account system, cloud sync, export/import, document upload, or AI document parsing in this version. This keeps evidence collection separate from the audited rating criteria and prepares the data shape for future save/export functionality.

## Project roadmap

The project roadmap is to preserve the existing regulatory-audited rating estimator while evolving the app into a future Personal VA Claim Workspace. Planned architecture includes condition templates, mapped and unmapped condition tracking, structured evidence notes, conservative/realistic/optimistic estimate modes, claim-preparation summaries, exports, and future document-ingestion boundaries.

See [ROADMAP.md](ROADMAP.md) for the long-term architecture and version plan.

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 4173
```

Then visit `http://127.0.0.1:4173`.

## Validation

```bash
npm test
```

The test command runs a JavaScript syntax check with `node --check script.js`.
