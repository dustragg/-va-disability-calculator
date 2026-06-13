# VA Disability Rating Estimator Roadmap

## Current project status

The project is currently a static, browser-only educational estimator. It helps users answer symptom-based questions for selected VA disability conditions, displays possible individual rating estimates, and demonstrates combined-rating VA math. It does not manage accounts, upload documents, parse DBQs, use cloud sync, or provide legal, medical, or VA claims advice. Version 10 can optionally store workspace data in the user's own browser local storage and export/import user-controlled JSON backups.

Current capabilities include:

- Version 1 condition modules with regulatory audit notes.
- Version 2 lumbar spine and separate left/right lower-extremity radiculopathy modules.
- Combined-rating VA math using individual estimates and 38 CFR § 4.25-style rounding.
- In-browser form inputs and live results.
- Static hosting with no server-side persistence.
- Version 4 evidence tracking fields for every mapped condition, displayed separately from rating calculations.
- Version 5 browser local-storage save/reload, manual save, JSON export/import, reset, and privacy notice controls.
- Version 6 conservative, realistic, and optimistic estimate-mode controls, mode-specific result notes, evidence-readiness warnings, and first-pass scenario summary.
- Version 7 evidence-gap analysis, documentation suggestions, evidence strength labels, and claim-preparation summary.
- Version 8 custom unmapped condition tracking with no rating logic and no combined-rating math impact.
- Version 9 condition status, claim status, service-connection theory, medical-evidence strength, priority, personal notes, planning dashboard, and planning-aware save/export/import compatibility.
- Version 10 printable claim-preparation report with dashboard summary, estimated combined rating, mapped-condition ratings, evidence strength labels, evidence gaps, documentation suggestions, planning fields, unmapped tracking-only conditions, privacy/disclaimer language, optional full evidence details, browser print support, and paper/PDF print styles.

## Completed versions

### Version 1: regulatory-audited estimator foundation

Completed Version 1 modules:

- Migraines.
- Neck / cervical spine limitation of motion.
- Shoulder limitation of motion.
- Flat feet / pes planus.
- Bunion / hallux valgus.
- GERD under the current GERD diagnostic-code approach.
- Hypertension.
- Sleep apnea.

Version 1 also established:

- A consistent condition-module structure.
- In-app regulatory audit notes.
- Evidence and scope cautions.
- Combined-rating output for selected compensable estimates.

### Version 2: lumbar spine and lower-extremity radiculopathy

Completed Version 2 modules:

- Lumbar spine / thoracolumbar limitation of motion.
- IVDS comparison within the lumbar spine estimate.
- Left lower-extremity sciatic radiculopathy.
- Right lower-extremity sciatic radiculopathy.

Version 2 also added explicit cautions for:

- Separate neurologic ratings.
- Pyramiding risk.
- Bilateral-factor limitations.
- Evidence requirements for IVDS incapacitating episodes.

### Version 3: musculoskeletal, mental-health, and femoral nerve expansion

Completed Version 3 modules:

- Hip conditions, including bursitis and range-of-motion limitations.
- Knee conditions, including flexion, extension, instability, and meniscus conditions.
- Mental health conditions using the General Rating Formula for Mental Disorders.
- Left and right femoral nerve peripheral nerve support.

Version 3 preserved existing rating logic and added mapped condition-template metadata for the new modules.

### Version 4: evidence tracking foundation

Completed Version 4 work:

- Added structured evidence fields for symptoms, symptom frequency, symptom severity, medications and treatment, flare-ups, functional impact, work impact, doctor comments, radiology/imaging findings, DBQ findings, and general evidence notes to every mapped condition currently in the application.
- Added per-condition Evidence Summary output that displays entered evidence separately from rating criteria and calculation rationale.
- Added per-condition Evidence Readiness output for evidence present, evidence missing, and evidence not yet entered categories.
- Preserved all existing rating logic, condition templates, audit notes, combined-rating calculations, and static browser-only behavior.
- Kept evidence in memory only; no local storage, database, accounts, cloud sync, export/import, document upload, or AI parsing was implemented.

### Version 5: save and export foundation

Completed Version 5 work:

- Added optional browser local-storage saving with automatic reload on page load.
- Added a visible last-saved timestamp, manual save button, and auto-save disable control.
- Added JSON export containing rating selections, evidence fields, evidence-readiness selections, schema version, export timestamp, and restore metadata.
- Added JSON import with structure validation and graceful invalid-file handling.
- Added confirmed workspace reset that clears form data and removes saved local-storage workspace data.
- Added a prominent privacy notice explaining browser-only data handling, no accounts, no cloud sync, no server storage, and user-controlled exports.
- Preserved existing rating calculations, condition templates, audit notes, evidence tracking, and combined-rating behavior.

### Version 6: conservative, realistic, and optimistic estimate modes

Completed Version 6 work:

- Added visible estimate-mode controls for conservative, realistic, and optimistic scenarios.
- Preserved the existing selected rating as the realistic baseline and kept all audited rating criteria and combined-rating calculations unchanged.
- Added mode-specific result notes showing selected mode, rating shown, rationale, evidence caution, and whether evidence fields may under-support the estimate.
- Used evidence-readiness fields to trigger warnings for missing important categories, mostly unentered evidence categories, or no categories marked present.
- Added a first-pass scenario summary for conservative, realistic, and optimistic combined estimates with an in-UI limitation note that independent scenario logic is not yet implemented.
- Included selected estimate mode in local storage, JSON export, and JSON import.

### Version 7: evidence gap analysis and documentation suggestions

Completed Version 7 work:

- Added per-condition Evidence Gap Analysis output for missing diagnosis evidence, current severity evidence, frequency/duration evidence, treatment/medication evidence, functional-impact evidence, work-impact evidence, relevant imaging/radiology evidence, DBQ/C&P exam findings, and doctor/provider comments.
- Added condition-specific documentation suggestions for migraines, spine/neck/back, shoulder/hip/knee, mental health, sleep apnea, hypertension, GERD, pes planus/bunion, radiculopathy, and femoral nerve entries.
- Added evidence strength labels: Stronger support, Needs review, and Weak / incomplete support.
- Added a top-level Claim Preparation Summary grouping conditions by evidence strength and listing common missing evidence categories across the workspace.
- Preserved all rating calculations, condition templates, audit notes, combined-rating calculations, evidence fields, local save/export/import, reset behavior, and estimate modes.
- Kept evidence-gap outputs derived at runtime; no separate gap-analysis metadata is stored in local storage or exported JSON.

### Version 8: unmapped condition tracking

Completed Version 8 work:

- Added a custom unmapped-condition section to the Personal VA Claim Workspace.
- Captured condition name, body system, claimed theory, notes, symptoms, severity, frequency, medications/treatment, functional impact, work impact, doctor comments, imaging/radiology findings, DBQ findings, and general evidence notes.
- Clearly marked custom records as **Tracking only — no rating logic yet**.
- Included unmapped condition names in the Claim Preparation Summary.
- Included unmapped conditions in browser save/load, JSON export, JSON import, and reset behavior.
- Preserved all mapped condition rating logic, evidence-gap analysis, estimate modes, and save/export behavior.
- Kept unmapped conditions out of individual rating results, scenario summaries, and VA combined-rating calculations.

### Version 9: condition status and priority tracking

Completed Version 9 work:

- Added claim-planning fields to every mapped condition: condition status, claim status, service connection theory, medical evidence strength, priority, and personal notes.
- Added the same planning fields to custom unmapped tracking-only conditions.
- Displayed planning fields on mapped condition result cards, unmapped condition cards, the Claim Preparation Summary, and a new Claim Planning Dashboard.
- Added dashboard groupings for high-priority conditions, conditions needing diagnosis, weak/no medical evidence, planned but not submitted, submitted/decided, and unmapped tracking-only conditions.
- Included planning fields in browser local storage, JSON export, and JSON import.
- Preserved Version 5 through Version 8 workspace imports by applying defaults when planning fields are absent and migrating older unmapped claimed-theory values where possible.
- Preserved all mapped rating calculations, existing rating conditions, evidence-gap logic, estimate modes, and combined-rating math.

### Version 10: claim report and printable summary

Completed Version 10 work:

- Added a Generate Claim Report section and Print Report button.
- Added a printable Claim Preparation Report generated from the current workspace.
- Included dashboard summary counts, estimated combined rating, selected estimate mode, individual mapped conditions and selected ratings, evidence strength labels, evidence gaps, documentation suggestions, planning fields, unmapped tracking-only conditions, and privacy/disclaimer language.
- Kept long evidence notes out of the report by default while allowing users to include full entered evidence details when practical.
- Added print CSS that hides editing controls and formats the report for paper/PDF output.
- Preserved local save/export/import, unmapped tracking, all mapped condition logic, and all rating calculations.

## Planned versions

### Version 11: expanded scenario snapshots

Goal: continue the architecture for a future Personal VA Claim Workspace while keeping the app static and preserving the existing estimator.

Planned work:

- Expand condition-template metadata for mapped and unmapped records where useful.
- Refine claim-tracking metadata without coupling it to rating calculations.
- Expand conservative, realistic, and optimistic scenario snapshots beyond the Version 6 first-pass framework.

### Version 12: local claim workspace prototype

Goal: allow users to manage a personal claim workspace in the browser without accounts, cloud storage, or server persistence.

Potential implementation options:

- Start with in-memory state and downloadable JSON exports.
- Add optional browser local storage only after privacy warnings and explicit user controls.
- Support unlimited user-added conditions as tracking records.
- Allow mapped conditions to connect to rating templates while unmapped conditions remain tracking-only.

### Version 13: reports and export workflows

Goal: help users prepare claim-review materials from their own entered data.

Planned work:

- Claim-preparation summary generation.
- Condition-by-condition evidence summaries.
- Evidence-gap checklists.
- Export to JSON and printable HTML/PDF-friendly layouts.
- Plain-language summaries of symptoms, functional impact, and supporting evidence.

### Version 14: document-ready architecture

Goal: prepare for eventual document upload and DBQ parsing without implementing those features prematurely.

Planned work:

- Define document metadata models.
- Define evidence-source references that can point to future uploaded files.
- Define DBQ-field mapping targets.
- Add parser-boundary interfaces so future ingestion cannot directly alter rating calculations without review.

## Technical architecture roadmap

The recommended architecture is a layered client-first architecture that can remain static today and evolve later if persistence, accounts, or document ingestion become appropriate.

### 1. Condition templates

Condition templates should describe each condition independently from user-specific claim records.

A future template should include:

- Stable condition ID.
- Display name.
- Diagnostic-code and CFR references.
- Mapped/unmapped status.
- Applicable body system.
- Rating-question definitions.
- Rating-logic function or rule table for mapped conditions.
- Required evidence categories.
- Common evidence gaps.
- Documentation suggestions.
- Pyramiding and bilateral-factor cautions.
- Last regulatory review date.

Mapped condition templates should produce rating estimates. Unmapped templates should support tracking only and clearly state that no rating logic is available.

### 2. Claim records

A saved claim record should represent a user's personal working file, not a regulatory template.

A future claim record should include:

- Claim ID.
- Claim name.
- Created and updated timestamps.
- List of condition records.
- User-selected estimate mode.
- Combined-rating snapshot.
- Export history metadata.
- User acknowledgements for privacy and educational-use warnings.

### 3. Condition records

A condition record should connect user-entered evidence to a condition template when available.

A future condition record should include:

- Record ID.
- Template ID when mapped.
- Custom condition name when unmapped.
- Claimed theory, such as direct, secondary, increase, or presumptive.
- Symptoms.
- Symptom frequency.
- Symptom severity.
- Medications and treatment.
- Flare-ups.
- Functional impact.
- Work impact.
- Doctor comments.
- Radiology findings.
- DBQ findings.
- Evidence notes.
- Evidence-gap flags.
- Documentation suggestions.
- Conservative, realistic, and optimistic estimate snapshots.

### 4. Estimate modes

The future workspace should distinguish estimate modes without altering the audited baseline calculations.

Recommended definitions:

- Conservative: uses the lowest rating supported by clearly documented evidence.
- Realistic: uses the most likely rating based on the overall entered evidence and current mapped criteria.
- Optimistic: shows the highest plausible rating if unresolved evidence questions are documented favorably.

Each mode should include a rationale and evidence-confidence indicator. Optimistic estimates should be labeled carefully and should never be presented as a predicted VA decision.

### 5. Evidence tracking

Evidence tracking should be structured but flexible.

Recommended evidence categories:

- Diagnosis evidence.
- Current severity evidence.
- Nexus or secondary-connection evidence.
- Treatment records.
- Medication records.
- Lay statements.
- Work-impact documentation.
- Imaging and radiology.
- DBQ or compensation-and-pension exam findings.
- Missing or stale evidence.

### 6. Future document ingestion

Document ingestion should be isolated behind a review workflow.

Recommended boundaries:

- Uploaded documents should first become document records.
- Parsed findings should become proposed evidence items.
- Users should review and accept proposed evidence before it affects summaries or estimates.
- Parser output should cite source document, page, and extracted field when available.
- Rating logic should remain deterministic and auditable.

## Data model roadmap

Future data models should be designed around templates, records, evidence, and exports.

Recommended top-level model families:

- `ConditionTemplate`: reusable rating/tracking definitions.
- `ClaimWorkspace`: the user's working claim file.
- `ConditionRecord`: one claimed or tracked condition inside a workspace.
- `EvidenceItem`: structured evidence entered manually or eventually extracted from documents.
- `EstimateSnapshot`: conservative, realistic, and optimistic estimates with rationale.
- `EvidenceGap`: a missing, stale, conflicting, or weak evidence item.
- `DocumentationSuggestion`: a non-advisory prompt describing records or notes that may help document a claim.
- `ExportPackage`: generated summaries and machine-readable exports.
- `DocumentRecord`: future file metadata and ingestion status.
- `ParsedFinding`: future extracted finding awaiting user review.

## Future condition roadmap

Future mapped-condition expansion should follow a repeatable process:

1. Select high-impact conditions where schedular criteria can be represented reliably.
2. Audit current CFR text and diagnostic-code history.
3. Define condition-template questions and rating rules.
4. Add evidence-gap definitions.
5. Add documentation suggestions.
6. Add tests for rating outputs and edge cases.
7. Add in-app cautions for pyramiding, bilateral factors, secondary conditions, and criteria limitations.

Potential future condition groups:

- Additional peripheral nerve patterns.
- Knee and ankle musculoskeletal conditions.
- Hip and thigh limitations.
- Scars and skin conditions.
- Respiratory conditions.
- Gastrointestinal conditions beyond GERD.
- Hearing loss and tinnitus.
- Mental-health conditions only if a careful, separately audited design can avoid misleading users.

Unmapped condition support should arrive before aggressive mapped-condition expansion so users can track any claimed condition even when no rating logic exists.

## Future evidence-tracking roadmap

Evidence tracking should evolve in stages:

1. Manual evidence notes attached to each condition.
2. Structured fields for symptoms, severity, frequency, medications, flare-ups, functional impact, provider comments, imaging, and DBQ findings.
3. Evidence-gap detection based on condition-template requirements.
4. Documentation suggestions tied to each gap.
5. Claim-preparation summary generation.
6. Expanded local import/export workflows beyond the Version 5 JSON workspace backup.
7. Future document metadata and parser-review workflow.

Evidence-gap examples:

- Diagnosis present but current severity not documented.
- Symptoms described but frequency not documented.
- Medication listed but dose or treatment response missing.
- Imaging referenced but radiology findings not summarized.
- Functional impact asserted but no work or daily-activity examples entered.
- Secondary theory selected but no nexus evidence summarized.

## Future export/reporting roadmap

Export and reporting should prioritize user control, transparency, and portability.

Recommended export formats:

- JSON for backup and re-import.
- Printable HTML for personal review.
- PDF-friendly claim-preparation summaries.
- CSV for evidence inventories.
- Condition-by-condition markdown summaries.

Recommended report sections:

- Claim overview.
- Conditions list.
- Individual estimate modes.
- Combined-rating estimate summary.
- Evidence gaps.
- Documentation suggestions.
- Symptom and functional-impact summaries.
- Medication and treatment summaries.
- DBQ/radiology summary fields.
- Disclaimer and limitations.

## Risks and limitations

Key risks:

- Users may mistake educational estimates for VA decisions.
- Regulations, M21-1 guidance, forms, and diagnostic criteria can change.
- Evidence quality is highly fact-specific.
- Pyramiding, bilateral factor, special monthly compensation, effective dates, service connection, and secondary theories are complex.
- Optimistic estimate modes may create false confidence if not labeled carefully.
- Document parsing can introduce errors, hallucinations, or missing context if not reviewed by users.
- Storing claim data creates privacy and security responsibilities.

Current intentional limitations:

- No database.
- No login or accounts.
- No cloud storage.
- No document upload.
- No AI document parsing.
- No new rating conditions in this roadmap change.
- No modification to existing rating calculations.

## Long-term vision: Personal VA Claim Workspace

The long-term vision is to evolve from a condition estimator into a private, user-controlled Personal VA Claim Workspace. The workspace should help users organize conditions, symptoms, medical findings, treatment history, evidence notes, and claim-preparation summaries while preserving the transparent rating-estimation foundation that already exists.

The end-state product should support:

- Unlimited mapped and unmapped conditions.
- Personal condition records with structured symptoms, severity, frequency, medications, flare-ups, functional impact, doctor comments, radiology findings, DBQ findings, and evidence notes.
- Conservative, realistic, and optimistic estimate modes.
- Evidence-gap detection.
- Documentation suggestions that may strengthen a claim file.
- Claim-preparation summaries.
- User-controlled export and backup.
- Future document upload and DBQ parsing through a cautious review workflow.

The guiding principle should be: keep rating logic transparent, keep user data portable, require user review before evidence changes estimates, and clearly separate educational estimation from legal, medical, or official VA claims advice.
