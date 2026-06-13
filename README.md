# VA Disability Rating Estimator

A mobile-friendly, static educational web app that estimates possible VA disability ratings for selected Version 1 conditions and demonstrates combined-rating "VA math."

## Regulatory audit status

Version 1 criteria were reviewed against current eCFR rating schedule text in June 2026. The audit preserved the original Version 1 condition list and existing combined-rating VA math, updated outdated GERD logic from the former hiatal-hernia analogy to current DC 7206, preserved diagnostic-code references, and added in-app audit notes explaining assumptions and evidence limitations.

## Version 1 conditions

- Migraines
- Neck / cervical spine limitation of motion
- Shoulder limitation of motion
- Flat feet / pes planus
- Bunion / hallux valgus
- GERD
- Hypertension
- Sleep apnea


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
