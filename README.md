# VA Disability Rating Estimator

A mobile-friendly, static educational web app that estimates possible VA disability ratings for selected conditions and demonstrates combined-rating "VA math."

## Version 1 conditions

- Migraines
- Neck / cervical spine limitation of motion
- Shoulder limitation of motion
- Flat feet / pes planus
- Bunion / hallux valgus
- GERD or analogous digestive rating
- Hypertension
- Sleep apnea

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

## Regulatory audit

See `AUDIT.md` for a condition-by-condition comparison against current eCFR criteria, known limitations, and 2025-2026 update notes.
