# VA Disability Rating Estimator

A mobile-friendly, static educational web app that estimates possible VA disability ratings for selected Version 1 through Version 12 condition-workspace foundations and demonstrates combined-rating "VA math."

## Regulatory audit status

Version 1 through Version 8 criteria were reviewed against current eCFR rating schedule text in June 2026. The audit preserved the original Version 1 condition list and existing combined-rating VA math, updated outdated GERD logic from the former hiatal-hernia analogy to current DC 7206, preserved diagnostic-code references, added in-app audit notes explaining assumptions and evidence limitations, introduced separate evidence-tracking fields that do not alter rating calculations, added educational estimate-mode scenario labels that preserve the selected-rating math, added evidence-gap analysis with documentation suggestions that remain separate from rating math, added custom unmapped condition tracking records that never create ratings or affect combined-rating math, added a printable claim-preparation report for organizing the current workspace, added a Version 11 body-system guided intake UI filter, and refined that intake in Version 12 so the page starts with compact area selection while preserving all rating math.

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

## Version 5 save, import, and export foundation

Version 5 keeps the application static and browser-only while adding persistence and backup controls for the Personal VA Claim Workspace.

### Saving

- The **Save workspace** button stores the current rating selections, evidence text fields, and evidence-readiness selections in this browser's local storage.
- Auto-save is enabled by default and saves changes in the same browser as users edit the workspace. Users can disable auto-save with the checkbox and still use manual save or export.
- The app displays the last saved timestamp when a workspace has been saved.
- A saved workspace automatically reloads from local storage on page load.

### JSON export and import

- **Export Workspace** downloads a JSON backup that includes rating selections, evidence fields, evidence-readiness selections, schema version, export timestamp, condition IDs, and evidence field IDs needed to restore the workspace.
- **Import Workspace** accepts a previously exported JSON file, validates that it is a recognized workspace export, and then restores matching known conditions and fields.
- Invalid, unreadable, or unrecognized files are rejected with an on-page status message instead of replacing the current workspace.

### Reset workspace

- **Reset workspace** clears all rating selections, evidence entries, and readiness selections, removes saved local-storage workspace data, and requires confirmation before deleting the workspace.

### Privacy limitations

- Workspace data remains in the user's browser local storage on the current device and browser profile.
- The app has no account system, cloud sync, database, server-side storage, document upload, or AI document parsing.
- Exported JSON files are controlled entirely by the user; anyone with access to the browser profile or exported files may be able to view entered claim information.
- Do not commit exported workspace JSON files or printed/PDF claim reports; they may contain sensitive claim or health information.

## Version 6 estimate modes

Version 6 adds conservative, realistic, and optimistic estimate modes to the Personal VA Claim Workspace. These modes are educational scenario lenses, not predictions of a VA decision.

- **Conservative** means the lowest rating clearly supported by entered evidence and selected criteria. In this first-pass implementation, the app does not automatically lower a selected rating just because evidence fields are blank; it warns when support may be incomplete.
- **Realistic** means the most likely rating based on selected criteria and available evidence. This remains the baseline behavior from prior versions: the rating shown is driven by the user's selected rating criteria.
- **Optimistic** means the highest plausible rating if unresolved evidence questions are documented favorably. The app does not automatically increase a rating solely because optimistic mode is selected.

Evidence readiness affects warnings only. Categories marked missing, categories not yet entered, and workspaces with little marked-present evidence can produce caution text and an under-supported flag for each condition result. Evidence readiness does not invent higher ratings, reduce ratings, replace criteria selections, or alter combined-rating VA math.

The scenario summary shows conservative, realistic, and optimistic combined estimates. Because full independent scenario logic is not implemented yet, all three combined estimates currently use the same audited selected-rating inputs and disclose that limitation in the UI.

Version 6 save/export/import compatibility includes the selected estimate mode in browser local storage and JSON workspace backups.

## Version 7 evidence gap analysis and documentation suggestions

Version 7 turns the existing evidence-readiness selections and entered evidence notes into per-condition evidence-gap analysis. For each condition, the app checks whether the available fields indicate support for diagnosis, current severity, frequency/duration, treatment or medication, functional impact, work impact, DBQ/C&P exam findings, provider comments, and imaging/radiology when relevant to that condition. Each category is labeled as present, missing, or not yet entered based on the existing readiness dropdowns and whether text has been entered in the related evidence fields.

The app also displays practical documentation suggestions for each condition. Suggestions combine condition-specific prompts, such as headache logs for migraines, range-of-motion and imaging notes for spine and joint conditions, occupational/social examples for mental health, sleep-study and CPAP details for sleep apnea, blood-pressure readings for hypertension, objective stricture or EGD/barium/CT details for GERD, podiatry and orthotics notes for foot conditions, and sensory/reflex/weakness findings for radiculopathy and femoral nerve entries. Missing or not-entered categories add additional targeted suggestions.

Each condition now receives an evidence strength label: **Stronger support**, **Needs review**, or **Weak / incomplete support**. This label is based only on readiness selections and entered notes. It is an organization aid, not a prediction of a VA decision, and it never changes the selected rating, individual estimate, scenario summary, or combined-rating math.

The top-level Claim Preparation Summary groups conditions by evidence strength and lists the most common missing or not-entered evidence categories across the workspace. Evidence-gap outputs are derived at runtime from the saved evidence fields and readiness selections; no separate gap-analysis metadata is saved to local storage or exported JSON. Version 7 keeps compatibility with prior Version 5 and Version 6 workspace imports while writing new browser saves/exports with schema version 7.

Limitations: the tool does not upload documents, parse medical records, identify stale or conflicting evidence, determine service connection, provide legal or medical advice, or decide whether evidence is sufficient for an official VA claim. Users must review their own records and the app's suggestions.

## Version 8 unmapped condition tracking

Version 8 lets users add custom unmapped conditions to the Personal VA Claim Workspace when the app does not yet include rating logic for that condition. Each custom record includes condition name, body system, claimed theory, notes, symptoms, severity, frequency, medications/treatment, functional impact, work impact, doctor comments, imaging/radiology findings, DBQ findings, and general evidence notes.

Unmapped records are clearly labeled **Tracking only — no rating logic yet**. They appear in the custom condition list and the Claim Preparation Summary, save to browser local storage, export to JSON, import from JSON, and clear during reset. They are excluded from individual rating results, scenario summaries, and VA combined-rating math, and the app does not create ratings for them. Version 8 keeps compatibility with prior Version 5, Version 6, and Version 7 workspace imports while writing new saves/exports with schema version 8.

## Version 9 condition status and priority tracking

Version 9 adds claim-planning status fields to both mapped rating conditions and custom unmapped tracking-only conditions. Each condition can now track condition status, claim status, service connection theory, medical evidence strength, priority, and personal notes. These planning fields are displayed on mapped result cards, unmapped condition cards, the Claim Preparation Summary, and a new top-level Claim Planning Dashboard.

The Claim Planning Dashboard groups user-entered planning data into high-priority conditions, conditions needing diagnosis, conditions with weak or no medical evidence, conditions planned but not submitted, conditions submitted or decided, and unmapped tracking-only conditions. These groupings are organizational only and do not change individual rating estimates, scenario summaries, or combined-rating VA math.

Version 9 browser saves and JSON exports include planning fields for mapped and unmapped conditions. Imports from Version 5, Version 6, Version 7, and Version 8 remain supported; when older workspace files do not include planning fields, the app restores rating/evidence data and fills planning fields with safe defaults. Unmapped Version 8 claimed-theory values are carried forward into the new service-connection-theory field when possible.

Limitations remain unchanged: the app does not add rating conditions, alter rating calculations, upload documents, parse records with AI, sync accounts or cloud data, or provide legal or medical advice.

## Version 10 printable claim report

Version 10 adds a **Generate Claim Report** section that creates a printable claim-preparation report from the current browser workspace without changing any rating criteria, condition logic, evidence-gap logic, or combined-rating math. The report includes the Claim Planning Dashboard summary, estimated combined rating, individual mapped conditions with selected ratings, evidence strength labels, evidence gaps, documentation suggestions, planning fields, unmapped tracking-only conditions, and privacy/disclaimer language.

The report keeps evidence notes concise by default so printed/PDF copies remain readable. Users can optionally enable full evidence-note details before generating a refreshed report. The **Print Report** button prints the current generated report, creating one only if none exists yet, uses the browser print dialog, and print-specific CSS hides editing controls while formatting the report for paper or PDF. Local save, JSON export/import, unmapped tracking, and all existing calculations are preserved.

## Version 11 body-system guided intake

Version 11 adds a **What areas are affecting you?** guided intake section before the mapped condition modules. Veterans can select broad body areas and symptom groups such as neck, lower back, feet/ankles, headaches, numbness/tingling, sleep problems, reflux, mental health symptoms, or high blood pressure, and the app focuses the visible mapped condition modules on the corresponding existing rating templates.

The guided intake is a UI filter only. It does not create new rating logic, remove existing condition modules, reset hidden condition answers, change evidence-gap analysis, alter claim-planning data, modify reports, or change combined-rating math. In Version 12, if no selections are made, condition modules are hidden by default and the page shows: “Select an area above to begin, or choose Show All Conditions.” **Show All Conditions** displays every mapped module while preserving all saved ratings and workspace data.

Breathing Problems intentionally does not add respiratory rating calculations. Instead, the app displays: “Respiratory conditions are not yet implemented. Consider using a tracking-only custom condition.”

Version 11 browser saves and JSON exports include body-system selections. Version 12 continues to import Version 11 and earlier workspaces; absent body-system selections default to the new empty guided-intake state without deleting saved condition values.

## Version 12 UI cleanup and guided intake first

Version 12 makes **What areas are affecting you?** the primary workflow immediately after the disclaimer. The body-area selector uses compact collapsible checkbox groups, still supports multiple selections, preserves the Version 11 body-area-to-condition mappings, and keeps **Show All Conditions** for users who want to review every mapped condition.

Condition modules are no longer shown by default when no body area is selected. The app instead prompts users to select an area or choose Show All Conditions. Selecting Lower Back shows the existing Lumbar Spine module only; Show All Conditions reveals every existing mapped module. Hidden modules are only UI-filtered: their form controls are not disabled, so previously saved/imported values remain in form data, local save/export/import payloads, reports, and combined-rating math.

Advanced workspace areas are now behind collapsible panels, including Personal VA Claim Workspace controls, Privacy Notice, custom unmapped condition tracking, Generate Claim Report, Claim Planning Dashboard, Claim Preparation Summary, per-condition Detailed Evidence Tracking, and result-card Evidence Gap Analysis. Rating questions, condition descriptions, proposed results, and basic rationales remain visible for selected conditions. No rating conditions, individual rating calculations, combined-rating math, save/load behavior, export/import structure, evidence fields, planning fields, unmapped conditions, or reports were removed.

## Project roadmap

The project roadmap is to preserve the existing regulatory-audited rating estimator while evolving the app into a future Personal VA Claim Workspace. Planned architecture includes condition templates, mapped and unmapped condition tracking, structured evidence notes, expanded scenario logic, claim-preparation summaries, exports, and future document-ingestion boundaries.

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
