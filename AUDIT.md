# VA Disability Rating Estimator Regulatory Audit

Audit date: June 13, 2026. Sources checked: current eCFR Title 38 Part 4, plus VA's digestive-system final rule. This report is educational and is not legal, medical, or VA claims advice.

## Cross-cutting findings

- The original estimator used simplified criteria and did not capture service connection, effective dates, protected ratings, pyramiding, bilateral factor, special monthly compensation, or separate complications.
- Combined-rating math under 38 CFR § 4.25 was retained. It is still a simplified calculator and does not apply the bilateral factor under 38 CFR § 4.26.
- The most important current-schedule correction is GERD: VA added current DC 7206 effective May 19, 2024. New current GERD criteria are based on documented esophageal stricture/dysphagia treatment rather than the older hiatal-hernia-by-analogy symptom pattern.
- Proposed respiratory/sleep-apnea changes are not final in current eCFR as of this audit, so the estimator continues to use current DC 6847.

## Condition-by-condition audit

### Migraines

- Diagnostic code used: 38 CFR § 4.124a, DC 8100.
- Criteria implemented before audit: 0%, 10%, 30%, 50% based on prostrating attack frequency and severe economic inadaptability.
- Current regulation comparison: Current eCFR DC 8100 lists 50% for very frequent completely prostrating and prolonged attacks productive of severe economic inadaptability, 30% for characteristic prostrating attacks averaging once a month, 10% for characteristic prostrating attacks averaging one in 2 months, and 0% for less frequent attacks.
- Omissions/simplifications: The tool cannot decide whether headaches are “characteristic prostrating,” whether attacks are “prolonged,” or whether evidence shows severe economic inadaptability.
- Over/underestimate risk: It can overestimate if the user selects prostrating/economic-impact terms not supported by evidence. It can underestimate if employment records, lay statements, treatment notes, or medication effects support greater frequency/severity than selected.
- Update made: Refined wording to track DC 8100 more closely and added assumptions.

### Neck / cervical spine limitation of motion

- Diagnostic code used: 38 CFR § 4.71a, General Rating Formula for Diseases and Injuries of the Spine, usually under DCs 5235-5243 depending on diagnosis.
- Criteria implemented before audit: 0%, 10%, 20%, 30%, 40%, and 100% based on cervical ROM/ankylosis; no IVDS bed-rest alternative.
- Current regulation comparison: Current eCFR provides 10%, 20%, 30%, 40%, and 100% tiers relevant to cervical or whole-spine findings and requires separately evaluating objective neurologic abnormalities. IVDS under DC 5243 may be rated by incapacitating episodes when that method is higher.
- Omissions/simplifications: The original estimator omitted IVDS incapacitating-episode ratings, separate neurologic abnormalities, Note (4) rounding to nearest 5 degrees, examiner-specific normal ROM, and the requirement that IVDS incapacitating episodes involve physician-prescribed bed rest and treatment.
- Over/underestimate risk: It could underestimate documented IVDS bed rest or separate radiculopathy. It could overestimate if users choose whole-spine ankylosis for an isolated cervical condition or do not account for examiner judgment on normal ROM.
- Update made: Added an IVDS bed-rest question and selects the higher of the general formula and IVDS formula. Added assumptions about neurologic abnormalities and evidence limits.

### Shoulder limitation of motion

- Diagnostic code used: 38 CFR § 4.71a, DC 5201.
- Criteria implemented before audit: Simplified 0%, 20%, 30%, and 40% tiers without a major/minor arm question; wording combined some levels.
- Current regulation comparison: DC 5201 distinguishes the major and minor arm. Limitation at shoulder level is 20% for either arm; midway between side and shoulder level is 30% for major and 20% for minor; limitation to 25 degrees from side is 40% for major and 30% for minor.
- Omissions/simplifications: The original estimator did not ask dominant side and could not correctly distinguish major/minor ratings. It also does not evaluate shoulder ankylosis, humerus impairment, clavicle/scapula impairment, arthritis, or painful motion minimums.
- Over/underestimate risk: It could overestimate a minor shoulder by using major-arm values and underestimate a major shoulder if the simplified selection was too low.
- Update made: Added dominant/non-dominant shoulder selection and mapped DC 5201 ratings separately.

### Flat feet / pes planus

- Diagnostic code used: 38 CFR § 4.71a, DC 5276.
- Criteria implemented before audit: 0%, 10%, 20%, 30%, 50%, but 30% combined “severe bilateral or pronounced unilateral” in one option.
- Current regulation comparison: DC 5276 assigns 0% for mild symptoms relieved by supports, 10% for moderate unilateral/bilateral, 20% severe unilateral, 30% severe bilateral, 30% pronounced unilateral, and 50% pronounced bilateral.
- Omissions/simplifications: The original did not clearly distinguish severe bilateral from pronounced unilateral, and could not verify marked deformity, accentuated pain, swelling on use, callosities, marked pronation, plantar tenderness, Achilles spasm/displacement, or orthotic response.
- Over/underestimate risk: It can overestimate if findings are subjective but not objectively documented. It can underestimate if bilateral/pronounced elements are present but not selected.
- Update made: Split severe bilateral and pronounced unilateral options while retaining both as 30%, and clarified the DC 5276 findings.

### Bunion / hallux valgus

- Diagnostic code used: 38 CFR § 4.71a, DC 5280.
- Criteria implemented before audit: 0% for mild/moderate symptoms and 10% for severe equivalent to amputation or surgery with metatarsal-head resection.
- Current regulation comparison: DC 5280 provides a 10% rating for unilateral hallux valgus operated with resection of metatarsal head, or severe if equivalent to amputation of great toe.
- Omissions/simplifications: It does not evaluate other foot injuries, pes cavus, malunion/nonunion, scars, arthritis, or toe amputation criteria.
- Over/underestimate risk: Usually low for isolated DC 5280 because 10% is the maximum under that code; however, it may underestimate if another diagnostic code better represents a broader foot disability.
- Update made: Separated the two 10% criteria into distinct answer choices and added assumptions.

### GERD

- Diagnostic code used before audit: 38 CFR § 4.114, DC 7346 by analogy.
- Criteria implemented before audit: Old hiatal-hernia style symptoms at 0%, 10%, 30%, and 60% based on epigastric distress, dysphagia, pyrosis, regurgitation, substernal/arm/shoulder pain, health impairment, vomiting, weight loss, hematemesis/melena, and anemia.
- Current regulation comparison: VA's digestive-system final rule is effective May 19, 2024. Current eCFR includes DC 7206 for gastroesophageal reflux disease. DC 7206 assigns 0%, 10%, 30%, 50%, and 80% based on documented esophageal stricture(s) causing dysphagia, daily medication to control dysphagia, dilation frequency, steroid dilation, stent placement, aspiration/undernutrition/substantial weight loss, surgery, or PEG tube. Current DC 7346 for hiatal/paraesophageal hernia now directs rating as esophageal stricture under DC 7203.
- Omissions/simplifications: The original GERD logic was outdated for current-schedule estimates. It omitted the new DC 7206 and could overrate common reflux symptoms without documented stricture/dysphagia treatment under current rules. It also did not explain that older or protected ratings may involve effective-date rules and potentially more favorable prior criteria.
- Over/underestimate risk: High. The old 7346-analog logic could substantially overestimate current new-claim GERD ratings. Conversely, it capped at 60% and could underestimate rare current DC 7206 cases warranting 80%.
- Update made: Replaced GERD logic with current DC 7206 ratings and added notes about documentation, older criteria, and protected/effective-date issues.

### Hypertension

- Diagnostic code used: 38 CFR § 4.104, DC 7101.
- Criteria implemented before audit: 0%, 10%, 20%, 40%, and 60% based on predominant diastolic/systolic readings and medication history.
- Current regulation comparison: Current eCFR DC 7101 criteria match the implemented tiers. Notes require confirmation by readings taken two or more times on at least three different days and address secondary hypertension and separate evaluation from hypertensive heart disease.
- Omissions/simplifications: The original estimator did not state the confirmation requirement or secondary-cause/heart-disease rules.
- Over/underestimate risk: It can overestimate if isolated high readings are used rather than predominant confirmed readings. It can underestimate if medication history demonstrates prior diastolic pressure predominantly 100+.
- Update made: Added confirmation and scope assumptions.

### Sleep apnea

- Diagnostic code used: 38 CFR § 4.97, DC 6847.
- Criteria implemented before audit: 0%, 30%, 50%, and 100% based on documented sleep-disordered breathing, persistent daytime hypersomnolence, CPAP/breathing assistance device, and chronic respiratory failure/cor pulmonale/tracheostomy.
- Current regulation comparison: Current eCFR DC 6847 still matches those tiers. VA has proposed respiratory/sleep-apnea changes in rulemaking, but they are not final in current eCFR as of this audit.
- Omissions/simplifications: The estimator does not evaluate coexisting respiratory-condition combination restrictions under 38 CFR § 4.96, treatment compliance facts, or medical nexus/service connection.
- Over/underestimate risk: It can overestimate if the user selects CPAP without evidence that a breathing-assistance device is required. It may underestimate if chronic respiratory failure, cor pulmonale, or tracheostomy is present but not selected.
- Update made: Added current/proposed-rule assumption language while keeping current DC 6847 logic.

## Current-regulation sources used

- eCFR, 38 CFR § 4.124a, DC 8100 Migraine: https://www.ecfr.gov/current/title-38/chapter-I/part-4/subpart-B/subject-group-ECFRab3ca55f4548afe/section-4.124a
- eCFR, 38 CFR § 4.71a musculoskeletal system, including spine, DC 5201, DC 5276, and DC 5280: https://www.ecfr.gov/current/title-38/chapter-I/part-4/subpart-B/subject-group-ECFRd3005f7d828ea7b/section-4.71a
- eCFR, 38 CFR § 4.114 digestive system, including DC 7206 and DC 7346: https://www.ecfr.gov/current/title-38/chapter-I/part-4/subpart-B/subject-group-ECFRef3d6710e800bcd/section-4.114
- Federal Register final rule, Schedule for Rating Disabilities: The Digestive System, effective May 19, 2024: https://www.federalregister.gov/documents/2024/03/20/2024-05138/schedule-for-rating-disabilities-the-digestive-system
- eCFR, 38 CFR § 4.104, DC 7101 Hypertensive vascular disease: https://www.ecfr.gov/current/title-38/chapter-I/part-4/subpart-B/subject-group-ECFRc88f57fafb24f86/section-4.104
- eCFR, 38 CFR § 4.97, DC 6847 Sleep Apnea Syndromes: https://www.ecfr.gov/current/title-38/chapter-I/part-4/subpart-B/subject-group-ECFR14fb86bcc86c2cb/section-4.97
- Federal Register proposed respiratory-system rule materials were reviewed only to identify non-final sleep-apnea proposals; current eCFR remains controlling for this estimator.
