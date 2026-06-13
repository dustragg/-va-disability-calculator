const conditions = [
  {
    id: 'migraines', name: 'Migraines', code: '38 CFR § 4.124a, DC 8100',
    description: 'Current DC 8100 focuses on frequency of characteristic prostrating attacks and whether very frequent, completely prostrating, prolonged attacks produce severe economic inadaptability.',
    auditNote: 'Audit: DC 8100 remains the current migraine code. The regulation does not define “prostrating” or “severe economic inadaptability,” so this estimator preserves those terms and assumes the selected option is supported by medical and lay evidence over the last several months.',
    questions: [{ id: 'level', label: 'Which best describes documented migraine attacks?', options: [
      ['0', 'Less frequent attacks, not claimed, no diagnosis, or attacks are not characteristic prostrating attacks'],
      ['10', 'Characteristic prostrating attacks averaging one in 2 months over the last several months'],
      ['30', 'Characteristic prostrating attacks occurring on average once a month over the last several months'],
      ['50', 'Very frequent, completely prostrating and prolonged attacks productive of severe economic inadaptability']
    ]}],
    estimate: a => explain(+a.level, 'Selected current DC 8100 migraine frequency/severity level. Evidence must support prostrating attacks and any economic-inadaptability impact.')
  },
  {
    id: 'neck', name: 'Neck / cervical spine limitation of motion', code: '38 CFR § 4.71a, General Rating Formula for Diseases and Injuries of the Spine (DCs 5235-5243)',
    description: 'Uses the current cervical-spine General Rating Formula: forward flexion, combined range of motion, abnormal gait/contour, vertebral-body fracture, and ankylosis indicators.',
    auditNote: 'Audit: Criteria are current for cervical limitation under the General Rating Formula. This tool does not add separate ratings for objective neurologic abnormalities or IVDS incapacitating episodes; those evidence-dependent issues are outside Version 1 scope.',
    questions: [{ id: 'level', label: 'What is the closest cervical spine finding?', options: [
      ['0', 'No compensable limitation shown'],
      ['10', 'Forward flexion >30° but ≤40°; combined ROM >170° but ≤335°; localized tenderness/spasm/guarding not causing abnormal gait/contour; or vertebral body fracture with ≥50% height loss'],
      ['20', 'Forward flexion >15° but ≤30°; combined ROM ≤170°; or spasm/guarding causing abnormal gait or abnormal spinal contour'],
      ['30', 'Forward flexion 15° or less, or favorable ankylosis of entire cervical spine'],
      ['40', 'Unfavorable ankylosis of entire cervical spine'],
      ['100', 'Unfavorable ankylosis of entire spine']
    ]}],
    estimate: a => explain(+a.level, 'Selected cervical-spine range-of-motion or ankylosis level under the current General Rating Formula.')
  },
  {
    id: 'shoulder', name: 'Shoulder limitation of motion', code: '38 CFR § 4.71a, DC 5201',
    description: 'Estimates one shoulder under the current arm limitation-of-motion criteria, with major/minor arm differences preserved.',
    auditNote: 'Audit: DC 5201 now specifies flexion and/or abduction limited to 25°, midway between side and shoulder level (45°), or shoulder level (90°). Dominant-arm status changes the 45° and 25° ratings, so this estimator asks for it rather than collapsing major/minor criteria.',
    questions: [
      { id: 'dominance', label: 'Is the affected shoulder on the dominant (major) side?', options: [
        ['major', 'Yes, dominant/major arm'],
        ['minor', 'No, non-dominant/minor arm']
      ]},
      { id: 'level', label: 'How far is flexion and/or abduction limited?', options: [
        ['0', 'No compensable limitation shown'],
        ['90', 'Limited at shoulder level (flexion and/or abduction limited to 90°)'],
        ['45', 'Limited midway between side and shoulder level (flexion and/or abduction limited to 45°)'],
        ['25', 'Limited to 25° from side']
      ]}
    ],
    estimate: a => {
      const major = a.dominance !== 'minor';
      const ratings = { '0': 0, '90': 20, '45': major ? 30 : 20, '25': major ? 40 : 30 };
      return explain(ratings[a.level] || 0, `Selected DC 5201 limitation level for the ${major ? 'major' : 'minor'} arm; rating assumes flexion and/or abduction measurement is supported by examination evidence.`);
    }
  },
  {
    id: 'pesPlanus', name: 'Flat feet / pes planus', code: '38 CFR § 4.71a, DC 5276',
    description: 'Considers mild, moderate, severe, and pronounced acquired flatfoot symptoms with unilateral/bilateral differences.',
    auditNote: 'Audit: DC 5276 remains current and distinguishes severe unilateral (20%), severe bilateral (30%), pronounced unilateral (30%), and pronounced bilateral (50%). This estimator separates those choices and assumes symptoms are attributable to acquired flatfoot rather than another foot diagnosis.',
    questions: [{ id: 'level', label: 'Which flatfoot description fits best?', options: [
      ['0', 'Mild symptoms relieved by built-up shoe or arch support'],
      ['10', 'Moderate unilateral or bilateral: weight-bearing line over/medial to great toe, inward bowing tendo achillis, pain on manipulation and use'],
      ['20', 'Severe unilateral: marked deformity, accentuated pain, swelling on use, characteristic callosities'],
      ['30', 'Severe bilateral OR pronounced unilateral symptoms'],
      ['50', 'Pronounced bilateral: marked pronation, extreme plantar tenderness, marked inward displacement/severe tendo achillis spasm, not improved by orthotics']
    ]}],
    estimate: a => explain(+a.level, 'Selected DC 5276 pes planus severity pattern. The 30% choice includes either severe bilateral or pronounced unilateral criteria.')
  },
  {
    id: 'bunion', name: 'Bunion / hallux valgus', code: '38 CFR § 4.71a, DC 5280',
    description: 'Hallux valgus is compensable only when severe, equivalent to amputation of the great toe, or post-operative with resection of the metatarsal head.',
    auditNote: 'Audit: DC 5280 remains current with a maximum 10% schedular rating per affected foot. This single-condition Version 1 input does not separately calculate left and right foot ratings.',
    questions: [{ id: 'level', label: 'Which hallux valgus finding applies?', options: [
      ['0', 'Mild/moderate bunion symptoms only'],
      ['10', 'Severe, equivalent to amputation of great toe, or operated with resection of metatarsal head']
    ]}],
    estimate: a => explain(+a.level, 'Selected current DC 5280 hallux valgus criterion.')
  },

  {
    id: 'lumbar', name: 'Lumbar spine / thoracolumbar limitation', code: '38 CFR § 4.71a, General Rating Formula for Diseases and Injuries of the Spine (DCs 5235-5243); IVDS DC 5243',
    description: 'Uses the current thoracolumbar General Rating Formula criteria and compares them with the IVDS incapacitating-episode formula, selecting the higher single lumbar-spine estimate.',
    auditNote: 'Audit: Current spine criteria rate thoracolumbar disability by forward flexion, combined range of motion, abnormal gait/contour, and ankylosis unless IVDS under DC 5243 produces the higher evaluation. DC 5243 is for disc herniation with compression and/or irritation of the adjacent nerve root; other disc diagnoses are generally assigned DC 5242. Incapacitating episodes require physician-prescribed bed rest and treatment by a physician over the past 12 months.',
    notes: [
      'Separate objective neurologic abnormalities may be rated separately under an appropriate neurologic diagnostic code; use the lower-extremity radiculopathy entries when supported by evidence.',
      'Do not count the same manifestation twice. Pain, stiffness, aching, and limitation used for the spine estimate should not also be duplicated under another musculoskeletal code for the same functional impairment.',
      'This tool compares the General Rating Formula and IVDS formula for the lumbar estimate, but it does not perform the full VA adjudicative analysis of every possible analogous spine diagnosis.'
    ],
    questions: [
      { id: 'general', label: 'What is the closest thoracolumbar spine finding under the General Rating Formula?', options: [
        ['0', 'No compensable limitation shown'],
        ['10', 'Forward flexion >60° but ≤85°; combined ROM >120° but ≤235°; localized tenderness/spasm/guarding not causing abnormal gait/contour; or vertebral body fracture with ≥50% height loss'],
        ['20', 'Forward flexion >30° but ≤60°; combined ROM ≤120°; or spasm/guarding causing abnormal gait or abnormal spinal contour'],
        ['40', 'Forward flexion 30° or less, or favorable ankylosis of entire thoracolumbar spine'],
        ['50', 'Unfavorable ankylosis of entire thoracolumbar spine'],
        ['100', 'Unfavorable ankylosis of entire spine']
      ]},
      { id: 'ivds', label: 'If IVDS is documented, what is the total duration of qualifying incapacitating episodes in the past 12 months?', options: [
        ['0', 'No qualifying IVDS incapacitating episodes, IVDS not documented, or less than 1 week total'],
        ['10', 'At least 1 week but less than 2 weeks'],
        ['20', 'At least 2 weeks but less than 4 weeks'],
        ['40', 'At least 4 weeks but less than 6 weeks'],
        ['60', 'At least 6 weeks']
      ]}
    ],
    estimate: a => {
      const general = +a.general;
      const ivds = +a.ivds;
      const rating = Math.max(general, ivds);
      const method = ivds > general ? 'IVDS incapacitating-episode formula' : 'General Rating Formula';
      return explain(rating, `Selected ${method} because it produces the higher lumbar-spine estimate here (General Formula ${general}%, IVDS ${ivds}%).`);
    }
  },
  {
    id: 'radiculopathyLeft', name: 'Left lower extremity radiculopathy / sciatic nerve', code: '38 CFR § 4.124a, DC 8520 (sciatic nerve paralysis), DC 8620 (neuritis), DC 8720 (neuralgia)',
    description: 'Estimates left lower-extremity sciatic radiculopathy separately from the spine and right leg, using current sciatic nerve severity levels.',
    auditNote: 'Audit: Current sciatic nerve criteria under DC 8520 provide 10% mild, 20% moderate, 40% moderately severe, 60% severe incomplete paralysis with marked muscular atrophy, and 80% complete paralysis. Neuritis and neuralgia use DCs 8620 and 8720. This estimator assumes symptoms are attributable to the sciatic nerve distribution and supported by objective and/or competent evidence.',
    notes: [
      'Separate neurologic ratings may be appropriate for objective radiculopathy associated with a lumbar spine condition.',
      'Bilateral factor is not yet implemented, even if both lower extremities are selected.',
      'Pyramiding caution: do not rate the same neurologic symptoms under multiple nerves or diagnostic codes unless the evidence clearly supports distinct manifestations.'
    ],
    questions: [{ id: 'level', label: 'Which left sciatic nerve finding best fits?', options: [
      ['0', 'No compensable left sciatic radiculopathy selected'],
      ['10', 'Mild incomplete paralysis'],
      ['20', 'Moderate incomplete paralysis'],
      ['40', 'Moderately severe incomplete paralysis'],
      ['60', 'Severe incomplete paralysis with marked muscular atrophy'],
      ['80', 'Complete paralysis: foot dangles and drops, no active movement possible below the knee, knee flexion weakened or very rarely lost']
    ]}],
    estimate: a => explain(+a.level, 'Selected current sciatic nerve severity level for the left lower extremity. Rating is separate from lumbar limitation when supported and not duplicative.')
  },
  {
    id: 'radiculopathyRight', name: 'Right lower extremity radiculopathy / sciatic nerve', code: '38 CFR § 4.124a, DC 8520 (sciatic nerve paralysis), DC 8620 (neuritis), DC 8720 (neuralgia)',
    description: 'Estimates right lower-extremity sciatic radiculopathy separately from the spine and left leg, using current sciatic nerve severity levels.',
    auditNote: 'Audit: Current sciatic nerve criteria under DC 8520 provide 10% mild, 20% moderate, 40% moderately severe, 60% severe incomplete paralysis with marked muscular atrophy, and 80% complete paralysis. Neuritis and neuralgia use DCs 8620 and 8720. This estimator assumes symptoms are attributable to the sciatic nerve distribution and supported by objective and/or competent evidence.',
    notes: [
      'Separate neurologic ratings may be appropriate for objective radiculopathy associated with a lumbar spine condition.',
      'Bilateral factor is not yet implemented, even if both lower extremities are selected.',
      'Pyramiding caution: do not rate the same neurologic symptoms under multiple nerves or diagnostic codes unless the evidence clearly supports distinct manifestations.'
    ],
    questions: [{ id: 'level', label: 'Which right sciatic nerve finding best fits?', options: [
      ['0', 'No compensable right sciatic radiculopathy selected'],
      ['10', 'Mild incomplete paralysis'],
      ['20', 'Moderate incomplete paralysis'],
      ['40', 'Moderately severe incomplete paralysis'],
      ['60', 'Severe incomplete paralysis with marked muscular atrophy'],
      ['80', 'Complete paralysis: foot dangles and drops, no active movement possible below the knee, knee flexion weakened or very rarely lost']
    ]}],
    estimate: a => explain(+a.level, 'Selected current sciatic nerve severity level for the right lower extremity. Rating is separate from lumbar limitation when supported and not duplicative.')
  },

  {
    id: 'hip', name: 'Hip conditions / bursitis and limitation of motion', code: '38 CFR § 4.71a, DC 5019 (bursitis), DCs 5251-5253 (thigh/hip motion)',
    template: { mapped: true, bodySystem: 'Musculoskeletal', version: 3, lastRegulatoryReview: '2026-06-13' },
    description: 'Estimates one hip using current hip/thigh limitation-of-motion criteria. Bursitis is generally evaluated based on limitation of motion of the affected part.',
    auditNote: 'Audit: DC 5019 directs bursitis to be evaluated as degenerative arthritis based on limitation of motion of affected parts. This template uses DC 5251 extension, DC 5252 flexion, and DC 5253 rotation/adduction/abduction criteria and selects the highest single hip-motion estimate entered here. It does not estimate ankylosis, flail joint, femur impairment, hip replacement, or separate left/right hip ratings.',
    notes: [
      'Painful motion and functional loss may affect the supported measurement, but the same hip limitation should not be duplicated under multiple musculoskeletal codes.',
      'Use examination measurements and flare-up/repetitive-use estimates when available.'
    ],
    questions: [
      { id: 'extension', label: 'Is hip extension limited?', options: [
        ['0', 'No compensable extension limitation selected'],
        ['10', 'Extension limited to 5°']
      ]},
      { id: 'flexion', label: 'How far is thigh flexion limited?', options: [
        ['0', 'No compensable flexion limitation selected'],
        ['10', 'Flexion limited to 45°'],
        ['20', 'Flexion limited to 30°'],
        ['30', 'Flexion limited to 20°'],
        ['40', 'Flexion limited to 10°']
      ]},
      { id: 'otherMotion', label: 'Are rotation, adduction, or abduction limited?', options: [
        ['0', 'No compensable rotation/adduction/abduction limitation selected'],
        ['10', 'Cannot toe-out more than 15° on affected leg, or cannot cross legs'],
        ['20', 'Abduction motion lost beyond 10°']
      ]}
    ],
    estimate: a => {
      const extension = +a.extension;
      const flexion = +a.flexion;
      const otherMotion = +a.otherMotion;
      const rating = Math.max(extension, flexion, otherMotion);
      return explain(rating, `Selected the highest supported hip/thigh motion estimate (extension ${extension}%, flexion ${flexion}%, rotation/adduction/abduction ${otherMotion}%).`);
    }
  },
  {
    id: 'knee', name: 'Knee conditions / ROM, instability, and meniscus', code: '38 CFR § 4.71a, DCs 5257-5261, 5258-5259',
    template: { mapped: true, bodySystem: 'Musculoskeletal', version: 3, lastRegulatoryReview: '2026-06-13' },
    description: 'Estimates one knee by considering flexion, extension, recurrent subluxation/instability or patellar instability, and meniscus conditions, then uses the highest selected knee estimate.',
    auditNote: 'Audit: Current knee criteria include DC 5257 for recurrent subluxation/instability and patellar instability, DC 5260 flexion, DC 5261 extension, DC 5258 dislocated semilunar cartilage, and DC 5259 symptomatic removal of semilunar cartilage. This simplified template selects the highest single knee estimate to reduce pyramiding risk and does not calculate potentially separate VA ratings for distinct manifestations.',
    notes: [
      'VA may sometimes assign separate knee ratings for distinct manifestations, such as limitation of extension, limitation of flexion, instability, or meniscal symptoms, but that requires a careful anti-pyramiding analysis not automated here.',
      'This template does not estimate ankylosis, tibia/fibula impairment, genu recurvatum, knee replacement, or bilateral factor.'
    ],
    questions: [
      { id: 'flexion', label: 'How far is knee flexion limited?', options: [
        ['0', 'Flexion better than compensable levels or not selected'],
        ['10', 'Flexion limited to 45°'],
        ['20', 'Flexion limited to 30°'],
        ['30', 'Flexion limited to 15°']
      ]},
      { id: 'extension', label: 'How far is knee extension limited?', options: [
        ['0', 'Extension limited to less than 10° or not selected'],
        ['10', 'Extension limited to 10°'],
        ['20', 'Extension limited to 15°'],
        ['30', 'Extension limited to 20°'],
        ['40', 'Extension limited to 30°'],
        ['50', 'Extension limited to 45°']
      ]},
      { id: 'instability', label: 'Which instability or patellar-instability pattern is documented?', options: [
        ['0', 'No compensable instability pattern selected'],
        ['10', 'Sprain/incomplete ligament tear/repaired complete tear with persistent instability and prescribed brace, cane, or walker; or diagnosed patellar instability without qualifying repair/prescription pattern'],
        ['20', 'Persistent instability after unrepaired/failed complete ligament tear with prescribed assistive device or brace; or patellar instability after surgical repair requiring prescribed brace/cane/walker'],
        ['30', 'Persistent instability after unrepaired/failed complete ligament tear requiring both prescribed assistive device and brace; or patellar instability after surgical repair requiring prescribed brace plus cane/walker']
      ]},
      { id: 'meniscus', label: 'Which meniscus / semilunar cartilage finding applies?', options: [
        ['0', 'No compensable meniscus condition selected'],
        ['10', 'Symptomatic removal of semilunar cartilage'],
        ['20', 'Dislocated semilunar cartilage with frequent episodes of locking, pain, and effusion into the joint']
      ]}
    ],
    estimate: a => {
      const flexion = +a.flexion;
      const extension = +a.extension;
      const instability = +a.instability;
      const meniscus = +a.meniscus;
      const rating = Math.max(flexion, extension, instability, meniscus);
      return explain(rating, `Selected the highest supported simplified knee estimate (flexion ${flexion}%, extension ${extension}%, instability ${instability}%, meniscus ${meniscus}%). Separate ratings require adjudicative review.`);
    }
  },
  {
    id: 'mentalHealth', name: 'Mental health conditions', code: '38 CFR § 4.130, General Rating Formula for Mental Disorders (DCs 9201-9440)',
    template: { mapped: true, bodySystem: 'Mental disorders', version: 3, lastRegulatoryReview: '2026-06-13' },
    description: 'Uses the current General Rating Formula for Mental Disorders by occupational and social impairment level and representative symptoms.',
    auditNote: 'Audit: Current mental-disorder ratings under DCs 9201-9440 generally use the General Rating Formula for Mental Disorders. This estimator uses the impairment levels and examples in § 4.130, but actual ratings require review of all evidence, frequency, severity, duration, remissions, and occupational/social functioning rather than a symptom checklist alone.',
    notes: [
      'Do not combine multiple mental-health diagnoses separately when the same psychiatric manifestations are being evaluated under one General Rating Formula estimate.',
      'Eating disorders use a different formula and are not estimated by this template.'
    ],
    questions: [{ id: 'level', label: 'Which occupational and social impairment level best fits the documented mental-health evidence?', options: [
      ['0', 'A mental condition is formally diagnosed, but symptoms are not severe enough to interfere with occupational/social functioning or require continuous medication'],
      ['10', 'Mild or transient symptoms decreasing work efficiency only during significant stress, or symptoms controlled by continuous medication'],
      ['30', 'Occasional decrease in work efficiency and intermittent inability to perform occupational tasks, generally functioning satisfactorily'],
      ['50', 'Reduced reliability and productivity'],
      ['70', 'Deficiencies in most areas such as work, school, family relations, judgment, thinking, or mood'],
      ['100', 'Total occupational and social impairment']
    ]}],
    estimate: a => explain(+a.level, 'Selected the current General Rating Formula mental-health impairment level. Representative symptoms should support the selected occupational and social impairment level.')
  },
  {
    id: 'femoralNeuropathyLeft', name: 'Left lower extremity femoral nerve', code: '38 CFR § 4.124a, DC 8526 (anterior crural/femoral nerve), DC 8626, DC 8726',
    template: { mapped: true, bodySystem: 'Neurologic', version: 3, lastRegulatoryReview: '2026-06-13' },
    description: 'Adds left femoral-nerve peripheral nerve support where evidence identifies anterior crural/femoral nerve involvement distinct from sciatic radiculopathy.',
    auditNote: 'Audit: DC 8526 provides 10% mild, 20% moderate, 30% severe incomplete paralysis, and 40% complete paralysis of the quadriceps extensor muscles. Neuritis and neuralgia use DCs 8626 and 8726. This template assumes the femoral distribution is documented and not duplicative of sciatic symptoms.',
    notes: ['Pyramiding caution: do not duplicate the same numbness, pain, weakness, or functional loss under sciatic and femoral nerve templates unless evidence supports distinct nerve distributions.'],
    questions: [{ id: 'level', label: 'Which left femoral nerve finding best fits?', options: [
      ['0', 'No compensable left femoral nerve impairment selected'],
      ['10', 'Mild incomplete paralysis'],
      ['20', 'Moderate incomplete paralysis'],
      ['30', 'Severe incomplete paralysis'],
      ['40', 'Complete paralysis of quadriceps extensor muscles']
    ]}],
    estimate: a => explain(+a.level, 'Selected current femoral nerve severity level for the left lower extremity, separate only when evidence supports distinct manifestations.')
  },
  {
    id: 'femoralNeuropathyRight', name: 'Right lower extremity femoral nerve', code: '38 CFR § 4.124a, DC 8526 (anterior crural/femoral nerve), DC 8626, DC 8726',
    template: { mapped: true, bodySystem: 'Neurologic', version: 3, lastRegulatoryReview: '2026-06-13' },
    description: 'Adds right femoral-nerve peripheral nerve support where evidence identifies anterior crural/femoral nerve involvement distinct from sciatic radiculopathy.',
    auditNote: 'Audit: DC 8526 provides 10% mild, 20% moderate, 30% severe incomplete paralysis, and 40% complete paralysis of the quadriceps extensor muscles. Neuritis and neuralgia use DCs 8626 and 8726. This template assumes the femoral distribution is documented and not duplicative of sciatic symptoms.',
    notes: ['Pyramiding caution: do not duplicate the same numbness, pain, weakness, or functional loss under sciatic and femoral nerve templates unless evidence supports distinct nerve distributions.'],
    questions: [{ id: 'level', label: 'Which right femoral nerve finding best fits?', options: [
      ['0', 'No compensable right femoral nerve impairment selected'],
      ['10', 'Mild incomplete paralysis'],
      ['20', 'Moderate incomplete paralysis'],
      ['30', 'Severe incomplete paralysis'],
      ['40', 'Complete paralysis of quadriceps extensor muscles']
    ]}],
    estimate: a => explain(+a.level, 'Selected current femoral nerve severity level for the right lower extremity, separate only when evidence supports distinct manifestations.')
  },
  {
    id: 'gerd', name: 'GERD', code: '38 CFR § 4.114, DC 7206',
    description: 'Uses the current GERD diagnostic code, which centers on documented esophageal strictures, dysphagia, dilation/stent treatment, nutritional impact, and PEG/surgical correction.',
    auditNote: 'Audit: GERD now has its own diagnostic code, DC 7206; the prior hiatal-hernia analogy is outdated. The current criteria require documented stricture findings by barium swallow, CT, or EGD, so common reflux symptoms without documented stricture may be noncompensable under this code.',
    questions: [{ id: 'level', label: 'Which GERD / esophageal-stricture pattern is documented?', options: [
      ['0', 'Documented history without daily symptoms or daily medication requirement, or reflux symptoms without documented stricture evidence'],
      ['10', 'Documented esophageal stricture requiring daily medication to control dysphagia, otherwise asymptomatic'],
      ['30', 'Recurrent esophageal stricture causing dysphagia requiring dilation no more than 2 times per year'],
      ['50', 'Recurrent or refractory stricture causing dysphagia requiring dilation 3+ times/year, steroid dilation at least once/year, or esophageal stent placement'],
      ['80', 'Recurrent/refractory stricture causing dysphagia with aspiration, undernutrition, and/or substantial weight loss, plus surgical correction or PEG tube']
    ]}],
    estimate: a => explain(+a.level, 'Selected current DC 7206 GERD/esophageal-stricture criterion. Rating depends on objective documentation and treatment history.')
  },
  {
    id: 'hypertension', name: 'Hypertension', code: '38 CFR § 4.104, DC 7101',
    description: 'Uses predominant blood pressure readings and medication history under current hypertensive vascular disease criteria.',
    auditNote: 'Audit: DC 7101 remains current. The regulation requires confirmation by readings taken two or more times on at least three different days; this estimator assumes that evidence requirement is met.',
    questions: [{ id: 'level', label: 'Which blood pressure / medication history best fits?', options: [
      ['0', 'Readings below compensable thresholds and no qualifying medication history'],
      ['10', 'Diastolic predominantly 100+, systolic predominantly 160+, or history of diastolic 100+ requiring continuous medication'],
      ['20', 'Diastolic predominantly 110+ or systolic predominantly 200+'],
      ['40', 'Diastolic predominantly 120+'],
      ['60', 'Diastolic predominantly 130+']
    ]}],
    estimate: a => explain(+a.level, 'Selected current DC 7101 predominant blood pressure / medication criterion.')
  },
  {
    id: 'sleepApnea', name: 'Sleep apnea', code: '38 CFR § 4.97, DC 6847',
    description: 'Rates sleep apnea syndromes by documented sleep-disordered breathing, persistent daytime hypersomnolence, breathing-assistance device use, and severe respiratory/cardiac complications.',
    auditNote: 'Audit: DC 6847 remains current for obstructive, central, and mixed sleep apnea. This estimator preserves the existing criteria and assumes a qualifying diagnosis and prescribed/required device evidence where selected.',
    questions: [{ id: 'level', label: 'Which sleep apnea finding applies?', options: [
      ['0', 'Asymptomatic but documented sleep disorder breathing'],
      ['30', 'Persistent daytime hypersomnolence'],
      ['50', 'Requires use of breathing assistance device such as CPAP'],
      ['100', 'Chronic respiratory failure with carbon dioxide retention or cor pulmonale, or requires tracheostomy']
    ]}],
    estimate: a => explain(+a.level, 'Selected current DC 6847 sleep apnea treatment/complication level.')
  }
];


const evidenceFields = [
  { id: 'symptoms', label: 'Symptoms', prompt: 'Describe symptoms in the veteran\'s own words or from medical records.' },
  { id: 'symptomFrequency', label: 'Symptom frequency', prompt: 'How often symptoms occur, including date ranges when known.' },
  { id: 'symptomSeverity', label: 'Symptom severity', prompt: 'Severity level, duration, and what makes symptoms better or worse.' },
  { id: 'medicationsTreatment', label: 'Medications and treatment', prompt: 'Medication names, therapy, devices, procedures, and treatment response.' },
  { id: 'flareUps', label: 'Flare-ups', prompt: 'Triggers, frequency, duration, additional limitations, and recovery time.' },
  { id: 'functionalImpact', label: 'Functional impact', prompt: 'Effects on walking, lifting, sleep, concentration, daily tasks, or self-care.' },
  { id: 'workImpact', label: 'Work impact', prompt: 'Missed work, accommodations, reduced reliability, safety limits, or task limits.' },
  { id: 'doctorComments', label: 'Doctor comments', prompt: 'Provider notes, diagnoses, restrictions, or medical opinions.' },
  { id: 'radiologyFindings', label: 'Radiology/imaging findings', prompt: 'X-ray, MRI, CT, EGD, sleep study, or other objective findings.' },
  { id: 'dbqFindings', label: 'DBQ findings', prompt: 'Relevant DBQ or C&P exam findings and measurements.' },
  { id: 'generalEvidenceNotes', label: 'General evidence notes', prompt: 'Other lay, medical, or administrative evidence notes.' }
];

const evidenceReadinessOptions = [
  ['notEntered', 'Evidence not yet entered'],
  ['present', 'Evidence present'],
  ['missing', 'Evidence missing']
];

const unmappedConditionFields = [
  { id: 'name', label: 'Condition name', type: 'text', prompt: 'Example: chronic sinus symptoms, wrist pain, skin rash' },
  { id: 'bodySystem', label: 'Body system', type: 'text', prompt: 'Example: Respiratory, Musculoskeletal, Skin, Neurologic' },
  { id: 'claimedTheory', label: 'Claimed theory', type: 'select', options: [
    ['direct', 'Direct service connection'],
    ['secondary', 'Secondary service connection'],
    ['increase', 'Increase for existing service-connected condition'],
    ['presumptive', 'Presumptive service connection'],
    ['aggravation', 'Aggravation'],
    ['unknown', 'Not sure yet']
  ]},
  { id: 'notes', label: 'Notes', type: 'textarea', prompt: 'High-level claim notes, timeline, or questions to resolve.' },
  { id: 'symptoms', label: 'Symptoms', type: 'textarea', prompt: 'Main symptoms and observable effects.' },
  { id: 'severity', label: 'Severity', type: 'textarea', prompt: 'Severity level, duration, and what makes symptoms better or worse.' },
  { id: 'frequency', label: 'Frequency', type: 'textarea', prompt: 'How often symptoms occur, duration, flare patterns, and date ranges.' },
  { id: 'medicationsTreatment', label: 'Medications/treatment', type: 'textarea', prompt: 'Medication names, therapy, devices, procedures, and response.' },
  { id: 'functionalImpact', label: 'Functional impact', type: 'textarea', prompt: 'Effects on walking, lifting, sleep, concentration, daily tasks, or self-care.' },
  { id: 'workImpact', label: 'Work impact', type: 'textarea', prompt: 'Missed work, accommodations, reduced reliability, safety limits, or task limits.' },
  { id: 'doctorComments', label: 'Doctor comments', type: 'textarea', prompt: 'Provider notes, diagnoses, restrictions, or medical opinions.' },
  { id: 'radiologyFindings', label: 'Imaging/radiology findings', type: 'textarea', prompt: 'X-ray, MRI, CT, ultrasound, sleep study, EMG/NCS, or other objective findings.' },
  { id: 'dbqFindings', label: 'DBQ findings', type: 'textarea', prompt: 'Relevant DBQ or C&P exam findings and measurements.' },
  { id: 'generalEvidenceNotes', label: 'General evidence notes', type: 'textarea', prompt: 'Other lay, medical, or administrative evidence notes.' }
];

let unmappedConditions = [];

const form = document.querySelector('#ratingForm');
const unmappedConditionForm = document.querySelector('#unmappedConditionForm');
const unmappedConditionList = document.querySelector('#unmappedConditionList');
const addUnmappedConditionBtn = document.querySelector('#addUnmappedConditionBtn');
const individualResults = document.querySelector('#individualResults');
const combinedSummary = document.querySelector('#combinedSummary');
const combinedSteps = document.querySelector('#combinedSteps');
const saveWorkspaceBtn = document.querySelector('#saveWorkspaceBtn');
const exportWorkspaceBtn = document.querySelector('#exportWorkspaceBtn');
const importWorkspaceInput = document.querySelector('#importWorkspaceInput');
const autoSaveToggle = document.querySelector('#autoSaveToggle');
const storageStatus = document.querySelector('#storageStatus');
const importStatus = document.querySelector('#importStatus');
const estimateModeSelect = document.querySelector('#estimateModeSelect');
const scenarioSummaryGrid = document.querySelector('#scenarioSummaryGrid');
const claimPreparationSummary = document.querySelector('#claimPreparationSummary');

const WORKSPACE_STORAGE_KEY = 'vaDisabilityCalculator.workspace.v8';
const LEGACY_WORKSPACE_STORAGE_KEYS = ['vaDisabilityCalculator.workspace.v7', 'vaDisabilityCalculator.workspace.v6', 'vaDisabilityCalculator.workspace.v5'];
const AUTOSAVE_STORAGE_KEY = 'vaDisabilityCalculator.autoSave.v5';
const WORKSPACE_SCHEMA_VERSION = 8;

const estimateModes = {
  conservative: {
    label: 'Conservative',
    definition: 'Lowest rating clearly supported by entered evidence and selected criteria.',
    rationale: 'This first-pass conservative scenario does not lower a selected rating solely because fields are blank; it flags support concerns for user review.'
  },
  realistic: {
    label: 'Realistic',
    definition: 'Most likely rating based on selected criteria and available evidence.',
    rationale: 'This is the existing baseline estimate driven by the selected audited rating criteria.'
  },
  optimistic: {
    label: 'Optimistic',
    definition: 'Highest plausible rating if unresolved evidence questions are documented favorably.',
    rationale: 'This first-pass optimistic scenario does not increase ratings solely because optimistic mode is selected; unresolved evidence questions are shown as cautions.'
  }
};

function explain(rating, reason) { return { rating, reason }; }

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function normalizeEvidenceValue(value) {
  return String(value || '').trim();
}

function getConditionEvidence(condition, data) {
  const fields = Object.fromEntries(evidenceFields.map(field => [field.id, normalizeEvidenceValue(data.get(`${condition.id}.evidence.${field.id}`))]));
  const readiness = Object.fromEntries(evidenceFields.map(field => [field.id, data.get(`${condition.id}.readiness.${field.id}`) || 'notEntered']));
  return { fields, readiness };
}

function groupEvidenceByReadiness(evidence) {
  return evidenceFields.reduce((groups, field) => {
    const status = evidence.readiness[field.id] || 'notEntered';
    groups[status].push(field);
    return groups;
  }, { present: [], missing: [], notEntered: [] });
}

function getSelectedEstimateMode() {
  return estimateModes[estimateModeSelect?.value] ? estimateModeSelect.value : 'realistic';
}

function buildEvidenceCautions(evidence) {
  const groups = groupEvidenceByReadiness(evidence);
  const importantMissing = ['symptoms', 'symptomFrequency', 'symptomSeverity', 'functionalImpact', 'doctorComments', 'dbqFindings']
    .filter(id => evidence.readiness[id] === 'missing')
    .map(id => evidenceFields.find(field => field.id === id)?.label)
    .filter(Boolean);
  const notReviewedCount = groups.notEntered.length;
  const cautions = [];

  if (importantMissing.length) {
    cautions.push(`Important evidence categories marked missing: ${importantMissing.join(', ')}.`);
  }
  if (notReviewedCount > evidenceFields.length / 2) {
    cautions.push('Most evidence categories are still marked not entered, so support for the selected criteria may be incomplete.');
  }
  if (!groups.present.length) {
    cautions.push('No evidence categories are marked present yet.');
  }

  return { cautions, underSupported: cautions.length > 0, groups };
}

const evidenceGapCategories = [
  {
    id: 'diagnosis',
    label: 'Diagnosis evidence',
    fieldIds: ['doctorComments', 'generalEvidenceNotes'],
    missingLabel: 'Missing diagnosis evidence',
    suggestion: 'Add the diagnosis source, condition name, date, provider, or relevant medical-record note.'
  },
  {
    id: 'currentSeverity',
    label: 'Current severity evidence',
    fieldIds: ['symptomSeverity', 'symptoms', 'dbqFindings'],
    missingLabel: 'Missing current severity evidence',
    suggestion: 'Summarize current severity, measurements, exam findings, and what makes symptoms better or worse.'
  },
  {
    id: 'frequencyDuration',
    label: 'Frequency/duration evidence',
    fieldIds: ['symptomFrequency', 'flareUps'],
    missingLabel: 'Missing frequency/duration evidence',
    suggestion: 'Add frequency, duration, date ranges, flare-up patterns, and recovery time.'
  },
  {
    id: 'treatmentMedication',
    label: 'Treatment/medication evidence',
    fieldIds: ['medicationsTreatment'],
    missingLabel: 'Missing treatment/medication evidence',
    suggestion: 'List medications, devices, therapy, procedures, response, side effects, or lack of treatment if applicable.'
  },
  {
    id: 'functionalImpact',
    label: 'Functional-impact evidence',
    fieldIds: ['functionalImpact'],
    missingLabel: 'Missing functional-impact evidence',
    suggestion: 'Describe limits with daily activities such as walking, lifting, sleeping, concentration, self-care, or household tasks.'
  },
  {
    id: 'workImpact',
    label: 'Work-impact evidence',
    fieldIds: ['workImpact'],
    missingLabel: 'Missing work-impact evidence',
    suggestion: 'Document missed work, accommodations, reduced reliability, safety restrictions, productivity limits, or task changes.'
  },
  {
    id: 'imagingRadiology',
    label: 'Imaging/radiology evidence',
    fieldIds: ['radiologyFindings'],
    missingLabel: 'Missing imaging/radiology evidence',
    suggestion: 'Add X-ray, MRI, CT, EGD, barium swallow, sleep study, EMG/NCS, or other objective-study findings when relevant.'
  },
  {
    id: 'dbqCpExam',
    label: 'DBQ/C&P exam findings',
    fieldIds: ['dbqFindings'],
    missingLabel: 'Missing DBQ/C&P exam findings',
    suggestion: 'Summarize DBQ or C&P findings, measurements, examiner observations, and any documented flare-up or repetitive-use estimates.'
  },
  {
    id: 'providerComments',
    label: 'Doctor/provider comments',
    fieldIds: ['doctorComments'],
    missingLabel: 'Missing doctor/provider comments',
    suggestion: 'Add provider comments, diagnoses, restrictions, treatment assessments, or medical opinions already documented.'
  }
];

const imagingRelevantConditionIds = new Set(['neck', 'lumbar', 'shoulder', 'hip', 'knee', 'gerd', 'pesPlanus', 'bunion', 'sleepApnea', 'radiculopathyLeft', 'radiculopathyRight', 'femoralNeuropathyLeft', 'femoralNeuropathyRight']);

const conditionDocumentationSuggestions = {
  migraines: ['Keep a headache log showing dates, duration, prostrating attacks, triggers, medication use, provider notes, and missed work or reduced productivity.'],
  neck: ['Capture cervical range-of-motion measurements, painful motion, flare-up limitations, imaging, neurologic/radiculopathy findings, and functional impact.'],
  lumbar: ['Capture thoracolumbar range-of-motion measurements, flare-up limitations, imaging, radiculopathy findings, and physician-prescribed bed rest if IVDS is selected.'],
  shoulder: ['Capture flexion/abduction measurements, flare-up limits, instability or weakness observations, imaging, treatment, and functional impact.'],
  hip: ['Capture hip/thigh range-of-motion measurements, flare-up limits, gait or assistive-device notes, imaging, treatment, and functional impact.'],
  knee: ['Capture flexion/extension measurements, flare-up limits, instability testing, brace/cane prescriptions, meniscus findings, imaging, and functional impact.'],
  mentalHealth: ['Summarize occupational and social impairment examples, medication and treatment history, therapy notes, symptom frequency/severity, and work/family impact.'],
  sleepApnea: ['Document sleep-study results, CPAP or device prescription/use, daytime hypersomnolence, treatment response, and complications.'],
  hypertension: ['Track multiple blood-pressure readings from different days, medication history, treatment changes, and provider comments.'],
  gerd: ['Document dysphagia or stricture findings, EGD/barium/CT results, dilation or stent history, PEG/surgery history, treatment, and weight or nutrition impact if applicable.'],
  pesPlanus: ['Collect podiatry notes, orthotics history, pain on use/manipulation, deformity, swelling, callosities, and surgery history.'],
  bunion: ['Collect podiatry notes, surgery history, severity descriptions, pain/function limits, orthotics or footwear notes, and imaging if available.'],
  radiculopathyLeft: ['Document sensory changes, pain distribution, weakness, reflex changes, functional limits, and EMG/NCS findings if available.'],
  radiculopathyRight: ['Document sensory changes, pain distribution, weakness, reflex changes, functional limits, and EMG/NCS findings if available.'],
  femoralNeuropathyLeft: ['Document anterior thigh sensory changes, quadriceps weakness, reflex changes, functional limits, and EMG/NCS findings if available.'],
  femoralNeuropathyRight: ['Document anterior thigh sensory changes, quadriceps weakness, reflex changes, functional limits, and EMG/NCS findings if available.']
};

function hasEnteredEvidence(evidence, fieldIds) {
  return fieldIds.some(id => Boolean(evidence.fields[id]));
}

function buildEvidenceGapAnalysis(item) {
  const applicableCategories = evidenceGapCategories.filter(category => (
    category.id !== 'imagingRadiology' || imagingRelevantConditionIds.has(item.id)
  ));
  const gaps = applicableCategories.map(category => {
    const statuses = category.fieldIds.map(id => item.evidence.readiness[id] || 'notEntered');
    const entered = hasEnteredEvidence(item.evidence, category.fieldIds);
    const status = statuses.includes('missing') ? 'missing' : (statuses.includes('present') || entered ? 'present' : 'notEntered');
    return { ...category, status, entered };
  });
  const missingOrNotEntered = gaps.filter(gap => gap.status !== 'present');
  const presentCount = gaps.length - missingOrNotEntered.length;
  const enteredNoteCount = evidenceFields.filter(field => item.evidence.fields[field.id]).length;
  const missingCount = gaps.filter(gap => gap.status === 'missing').length;

  let strength = 'Weak / incomplete support';
  if (missingCount === 0 && presentCount >= Math.ceil(gaps.length * 0.65) && enteredNoteCount >= 3) {
    strength = 'Stronger support';
  } else if (presentCount >= Math.ceil(gaps.length * 0.35) || enteredNoteCount >= 2) {
    strength = 'Needs review';
  }

  const suggestions = [
    ...(conditionDocumentationSuggestions[item.id] || []),
    ...missingOrNotEntered.map(gap => `${gap.missingLabel}: ${gap.suggestion}`)
  ];

  return { gaps, missingOrNotEntered, strength, suggestions };
}

function buildModeSpecificResult(item, modeKey) {
  const mode = estimateModes[modeKey] || estimateModes.realistic;
  const evidenceReview = buildEvidenceCautions(item.evidence);
  const gapAnalysis = buildEvidenceGapAnalysis(item);
  return {
    ...item,
    modeKey,
    modeLabel: mode.label,
    modeDefinition: mode.definition,
    modeRationale: `${mode.rationale} Rating shown remains ${item.rating}% from the selected criteria: ${item.reason}`,
    evidenceCaution: evidenceReview.cautions.length ? evidenceReview.cautions.join(' ') : 'No evidence-readiness caution triggered by the current entries.',
    underSupported: evidenceReview.underSupported,
    evidenceGapAnalysis: gapAnalysis,
    evidenceStrength: gapAnalysis.strength
  };
}


function normalizeUnmappedCondition(record = {}) {
  const normalized = Object.fromEntries(unmappedConditionFields.map(field => [field.id, normalizeEvidenceValue(record[field.id])]));
  normalized.id = normalizeEvidenceValue(record.id) || `unmapped-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  normalized.trackingOnly = true;
  normalized.ratingLogic = 'none';
  return normalized;
}

function getUnmappedFormData() {
  const data = new FormData(unmappedConditionForm);
  return Object.fromEntries(unmappedConditionFields.map(field => [field.id, normalizeEvidenceValue(data.get(`unmapped.${field.id}`))]));
}

function renderUnmappedConditionForm() {
  unmappedConditionForm.innerHTML = unmappedConditionFields.map(field => {
    const name = `unmapped.${field.id}`;
    if (field.type === 'select') {
      return `<label for="unmapped-${field.id}">${field.label}<select id="unmapped-${field.id}" name="${name}">${field.options.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}</select></label>`;
    }
    if (field.type === 'text') {
      return `<label for="unmapped-${field.id}">${field.label}<input id="unmapped-${field.id}" name="${name}" type="text" placeholder="${field.prompt}"></label>`;
    }
    return `<label for="unmapped-${field.id}">${field.label}<textarea id="unmapped-${field.id}" name="${name}" rows="3" placeholder="${field.prompt}"></textarea></label>`;
  }).join('');
}

function addUnmappedCondition() {
  const record = normalizeUnmappedCondition(getUnmappedFormData());
  if (!record.name) {
    importStatus.textContent = 'Enter a custom condition name before adding a tracking-only condition.';
    return;
  }
  unmappedConditions.push(record);
  unmappedConditionForm.reset();
  importStatus.textContent = 'Tracking-only condition added. It will not create a rating or affect combined-rating math.';
  renderResults();
  maybeAutoSave();
}

function removeUnmappedCondition(id) {
  unmappedConditions = unmappedConditions.filter(condition => condition.id !== id);
  renderResults();
  maybeAutoSave();
}

function getClaimedTheoryLabel(value) {
  const field = unmappedConditionFields.find(item => item.id === 'claimedTheory');
  return field?.options.find(([optionValue]) => optionValue === value)?.[1] || value || 'Not entered';
}

function renderUnmappedConditionList() {
  if (!unmappedConditions.length) {
    unmappedConditionList.innerHTML = '<p class="emptyEvidence">No custom unmapped conditions added yet.</p>';
    return;
  }
  unmappedConditionList.innerHTML = unmappedConditions.map(condition => `
    <article class="unmappedConditionCard">
      <div class="conditionHeader">
        <div>
          <h3>${escapeHtml(condition.name)}</h3>
          <p><strong>Tracking only — no rating logic yet.</strong> This condition will not create an individual rating and is excluded from VA combined-rating math.</p>
        </div>
        <span class="badge trackingBadge">No rating logic</span>
      </div>
      <dl class="unmappedDetails">
        <div><dt>Body system</dt><dd>${condition.bodySystem ? escapeHtml(condition.bodySystem) : '<span class="emptyEvidence">Not entered</span>'}</dd></div>
        <div><dt>Claimed theory</dt><dd>${escapeHtml(getClaimedTheoryLabel(condition.claimedTheory))}</dd></div>
        ${unmappedConditionFields.filter(field => !['name', 'bodySystem', 'claimedTheory'].includes(field.id)).map(field => `
          <div><dt>${field.label}</dt><dd>${condition[field.id] ? escapeHtml(condition[field.id]) : '<span class="emptyEvidence">Not entered</span>'}</dd></div>
        `).join('')}
      </dl>
      <button type="button" class="danger removeUnmappedBtn" data-unmapped-id="${escapeHtml(condition.id)}">Remove tracking-only condition</button>
    </article>
  `).join('');
}

function renderForm() {
  form.innerHTML = conditions.map(condition => `
    <fieldset class="condition card">
      <div class="conditionHeader">
        <div><h2>${condition.name}</h2><p>${condition.description}</p></div>
        <span class="badge">${condition.code}</span>
      </div>
      <section class="ratingCriteria" aria-label="Rating criteria for ${condition.name}">
        <div class="sectionHeading">
          <p class="eyebrow">Affects estimate</p>
          <h3>Rating criteria</h3>
          <p>These selections drive the possible rating estimate. Evidence fields below are tracked separately and do not change ratings in this version.</p>
        </div>
        <div class="questions">
          ${condition.questions.map(q => `
            <label for="${condition.id}-${q.id}">${q.label}
              <select id="${condition.id}-${q.id}" name="${condition.id}.${q.id}">
                ${q.options.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}
              </select>
              <span class="help">Choose the answer best supported by medical and lay evidence.</span>
            </label>
          `).join('')}
        </div>
      </section>
      <section class="evidenceCollection" aria-label="Evidence collection for ${condition.name}">
        <div class="sectionHeading">
          <p class="eyebrow evidenceEyebrow">Evidence only</p>
          <h3>Evidence tracking</h3>
          <p>Use these optional fields to organize claim-support information. They are in-memory form entries only and do not affect the rating calculation.</p>
        </div>
        <div class="evidenceGrid">
          ${evidenceFields.map(field => `
            <div class="evidenceField">
              <label for="${condition.id}-evidence-${field.id}">${field.label}
                <textarea id="${condition.id}-evidence-${field.id}" name="${condition.id}.evidence.${field.id}" rows="3" placeholder="${field.prompt}"></textarea>
              </label>
              <label class="readinessControl" for="${condition.id}-readiness-${field.id}">Readiness
                <select id="${condition.id}-readiness-${field.id}" name="${condition.id}.readiness.${field.id}">
                  ${evidenceReadinessOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}
                </select>
              </label>
            </div>
          `).join('')}
        </div>
      </section>
    </fieldset>
  `).join('');
}

function getCurrentFormData() {
  const data = new FormData(form);
  const ratings = {};
  const evidence = {};

  conditions.forEach(condition => {
    ratings[condition.id] = Object.fromEntries(condition.questions.map(q => [q.id, data.get(`${condition.id}.${q.id}`) || '0']));
    evidence[condition.id] = getConditionEvidence(condition, data);
  });

  return { ratings, evidence, unmappedConditions: unmappedConditions.map(normalizeUnmappedCondition), estimateMode: getSelectedEstimateMode() };
}

function getWorkspacePayload() {
  return {
    schema: 'va-disability-calculator-workspace',
    version: WORKSPACE_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    metadata: {
      appName: 'VA Disability Rating Estimator',
      conditionIds: conditions.map(condition => condition.id),
      evidenceFieldIds: evidenceFields.map(field => field.id),
      estimateModeIds: Object.keys(estimateModes),
      unmappedConditionFieldIds: unmappedConditionFields.map(field => field.id)
    },
    workspace: getCurrentFormData()
  };
}

function getAnswers(modeKey = getSelectedEstimateMode()) {
  const data = new FormData(form);
  return conditions.map(condition => {
    const answers = Object.fromEntries(condition.questions.map(q => [q.id, data.get(`${condition.id}.${q.id}`) || '0']));
    const evidence = getConditionEvidence(condition, data);
    const baseline = { ...condition, evidence, ...condition.estimate(answers) };
    return buildModeSpecificResult(baseline, modeKey);
  });
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function validateWorkspacePayload(payload) {
  if (!isPlainObject(payload) || payload.schema !== 'va-disability-calculator-workspace' || !isPlainObject(payload.workspace)) {
    return { valid: false, message: 'This file is not a recognized workspace export.' };
  }

  if (!isPlainObject(payload.workspace.ratings) || !isPlainObject(payload.workspace.evidence)) {
    return { valid: false, message: 'Workspace ratings or evidence data is missing.' };
  }

  return { valid: true };
}

function applyEstimateModeFromPayload(payload) {
  const mode = payload.workspace.estimateMode;
  if (estimateModeSelect && estimateModes[mode]) estimateModeSelect.value = mode;
}

function applyWorkspacePayload(payload) {
  const validation = validateWorkspacePayload(payload);
  if (!validation.valid) return validation;

  applyEstimateModeFromPayload(payload);
  unmappedConditions = Array.isArray(payload.workspace.unmappedConditions)
    ? payload.workspace.unmappedConditions.map(normalizeUnmappedCondition).filter(condition => condition.name)
    : [];

  conditions.forEach(condition => {
    const conditionRatings = payload.workspace.ratings[condition.id] || {};
    condition.questions.forEach(question => {
      const input = form.elements[`${condition.id}.${question.id}`];
      const allowedValues = question.options.map(([value]) => value);
      if (input && allowedValues.includes(conditionRatings[question.id])) {
        input.value = conditionRatings[question.id];
      }
    });

    const conditionEvidence = payload.workspace.evidence[condition.id] || {};
    const fields = isPlainObject(conditionEvidence.fields) ? conditionEvidence.fields : {};
    const readiness = isPlainObject(conditionEvidence.readiness) ? conditionEvidence.readiness : {};

    evidenceFields.forEach(field => {
      const evidenceInput = form.elements[`${condition.id}.evidence.${field.id}`];
      if (evidenceInput && typeof fields[field.id] === 'string') evidenceInput.value = fields[field.id];

      const readinessInput = form.elements[`${condition.id}.readiness.${field.id}`];
      const allowedReadiness = evidenceReadinessOptions.map(([value]) => value);
      if (readinessInput && allowedReadiness.includes(readiness[field.id])) readinessInput.value = readiness[field.id];
    });
  });

  renderResults();
  return { valid: true };
}

function formatTimestamp(value) {
  if (!value) return 'No saved workspace yet.';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Saved workspace timestamp unavailable.';
  return `Last saved: ${date.toLocaleString()}`;
}

function updateStorageStatus(savedAt) {
  storageStatus.textContent = formatTimestamp(savedAt);
}

function loadAutoSavePreference() {
  autoSaveToggle.checked = localStorage.getItem(AUTOSAVE_STORAGE_KEY) !== 'disabled';
}

function saveWorkspace({ manual = false } = {}) {
  const payload = getWorkspacePayload();
  localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(payload));
  updateStorageStatus(payload.exportedAt);
  if (manual) importStatus.textContent = 'Workspace saved in this browser.';
}

function maybeAutoSave() {
  if (autoSaveToggle.checked) saveWorkspace();
}

function loadSavedWorkspace() {
  let raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
  if (!raw) {
    raw = LEGACY_WORKSPACE_STORAGE_KEYS.map(key => localStorage.getItem(key)).find(Boolean);
  }
  if (!raw) {
    updateStorageStatus();
    return;
  }

  try {
    const payload = JSON.parse(raw);
    const result = applyWorkspacePayload(payload);
    if (result.valid) {
      updateStorageStatus(payload.exportedAt);
      importStatus.textContent = 'Saved browser workspace loaded.';
    } else {
      updateStorageStatus();
      importStatus.textContent = result.message;
    }
  } catch {
    updateStorageStatus();
    importStatus.textContent = 'Saved browser workspace could not be read.';
  }
}

function exportWorkspace() {
  const payload = getWorkspacePayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `va-claim-workspace-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  importStatus.textContent = 'Workspace export downloaded.';
}

function importWorkspace(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    try {
      const payload = JSON.parse(String(reader.result || ''));
      const result = applyWorkspacePayload(payload);
      if (!result.valid) {
        importStatus.textContent = result.message;
        return;
      }
      if (autoSaveToggle.checked) saveWorkspace();
      importStatus.textContent = 'Workspace imported successfully.';
    } catch {
      importStatus.textContent = 'Import failed: choose a valid workspace JSON file.';
    } finally {
      importWorkspaceInput.value = '';
    }
  });
  reader.addEventListener('error', () => {
    importStatus.textContent = 'Import failed: the selected file could not be read.';
    importWorkspaceInput.value = '';
  });
  reader.readAsText(file);
}

function resetWorkspace() {
  const confirmed = window.confirm('Clear all rating selections, evidence fields, readiness selections, and saved browser data for this workspace?');
  if (!confirmed) return;
  form.reset();
  unmappedConditionForm.reset();
  unmappedConditions = [];
  localStorage.removeItem(WORKSPACE_STORAGE_KEY);
  LEGACY_WORKSPACE_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
  updateStorageStatus();
  importStatus.textContent = 'Workspace reset and saved browser data removed.';
  renderResults();
}

function roundToNearestTen(value) {
  return Math.min(100, Math.round(value / 10) * 10);
}

function calculateCombined(ratings) {
  const sorted = ratings.filter(r => r.rating > 0).sort((a, b) => b.rating - a.rating);
  let combined = 0;
  const steps = [];
  sorted.forEach((item, index) => {
    const remaining = 100 - combined;
    const added = remaining * (item.rating / 100);
    const next = combined + added;
    steps.push({ index: index + 1, name: item.name, rating: item.rating, previous: combined, remaining, added, next });
    combined = next;
  });
  return { raw: combined, rounded: roundToNearestTen(combined), sorted, steps };
}

function renderList(items, emptyText) {
  return `<ul>${items.length ? items.map(item => `<li>${escapeHtml(item)}</li>`).join('') : `<li>${emptyText}</li>`}</ul>`;
}

function renderClaimPreparationSummary(estimates) {
  const byStrength = {
    'Stronger support': [],
    'Needs review': [],
    'Weak / incomplete support': []
  };
  const categoryCounts = {};
  const trackingOnlyNames = unmappedConditions.map(condition => `${condition.name} — Tracking only, no rating logic yet`);

  estimates.forEach(item => {
    byStrength[item.evidenceStrength].push(item.name);
    item.evidenceGapAnalysis.missingOrNotEntered.forEach(gap => {
      categoryCounts[gap.label] = (categoryCounts[gap.label] || 0) + 1;
    });
  });

  const commonMissing = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([label, count]) => `${label} (${count} condition${count === 1 ? '' : 's'})`);

  claimPreparationSummary.innerHTML = `
    <p class="eyebrow">Version 8</p>
    <h3>Claim Preparation Summary</h3>
    <p class="scenarioLimitation">This summary organizes evidence readiness and entered notes. It does not predict an official decision and does not change any rating calculation.</p>
    <div class="claimSummaryGrid">
      <div><strong>Conditions with stronger support</strong>${renderList(byStrength['Stronger support'], 'None yet')}</div>
      <div><strong>Conditions needing review</strong>${renderList(byStrength['Needs review'], 'None yet')}</div>
      <div><strong>Conditions with weak/incomplete support</strong>${renderList(byStrength['Weak / incomplete support'], 'None yet')}</div>
      <div><strong>Most common missing evidence categories</strong>${renderList(commonMissing, 'No missing or not-entered categories detected')}</div>
      <div><strong>Unmapped tracking-only conditions</strong>${renderList(trackingOnlyNames, 'None yet')}</div>
    </div>
  `;
}

function renderResults() {
  const selectedMode = getSelectedEstimateMode();
  const estimates = getAnswers(selectedMode);
  renderClaimPreparationSummary(estimates);
  renderUnmappedConditionList();
  individualResults.innerHTML = estimates.map(item => `
    <article class="result card">
      <h3>${item.name}</h3>
      <p class="rating">${item.rating}%</p>
      <p><strong>Selected estimate mode:</strong> ${item.modeLabel} — ${item.modeDefinition}</p>
      <p><strong>Rating shown for this mode:</strong> ${item.rating}%</p>
      <p><strong>Mode rationale:</strong> ${item.modeRationale}</p>
      <p class="evidenceCaution ${item.underSupported ? 'needsReview' : 'ready'}"><strong>Evidence caution:</strong> ${item.evidenceCaution}</p>
      <p class="evidenceStrength"><strong>Evidence strength:</strong> ${item.evidenceStrength}</p>
      <p><strong>May be under-supported because evidence fields are missing or not entered:</strong> ${item.underSupported ? 'Yes' : 'No'}</p>
      <p><strong>Why this possible estimate was selected:</strong> ${item.reason}</p>
      <p><strong>Regulatory audit note:</strong> ${item.auditNote}</p>
      ${item.notes ? `<ul class="notes">${item.notes.map(note => `<li>${note}</li>`).join('')}</ul>` : ''}
      <section class="evidenceSummary" aria-label="Evidence summary for ${item.name}">
        <h4>Evidence Summary</h4>
        <dl>
          ${evidenceFields.map(field => {
            const value = item.evidence.fields[field.id];
            return `<div><dt>${field.label}</dt><dd>${value ? escapeHtml(value) : '<span class="emptyEvidence">Not entered</span>'}</dd></div>`;
          }).join('')}
        </dl>
      </section>
      <section class="evidenceReadiness" aria-label="Evidence readiness for ${item.name}">
        <h4>Evidence Readiness</h4>
        ${(() => {
          const groups = groupEvidenceByReadiness(item.evidence);
          return `
            <div class="readinessGrid">
              <div class="readinessBucket present"><strong>Evidence present</strong><ul>${groups.present.length ? groups.present.map(field => `<li>${field.label}</li>`).join('') : '<li>None marked present</li>'}</ul></div>
              <div class="readinessBucket missing"><strong>Evidence missing</strong><ul>${groups.missing.length ? groups.missing.map(field => `<li>${field.label}</li>`).join('') : '<li>None marked missing</li>'}</ul></div>
              <div class="readinessBucket notEntered"><strong>Evidence not yet entered</strong><ul>${groups.notEntered.length ? groups.notEntered.map(field => `<li>${field.label}</li>`).join('') : '<li>All evidence categories reviewed</li>'}</ul></div>
            </div>`;
        })()}
      </section>
      <section class="evidenceGapAnalysis" aria-label="Evidence gap analysis for ${item.name}">
        <h4>Evidence Gap Analysis</h4>
        <p class="scenarioLimitation">Gaps are based on readiness selections and entered evidence text only; they do not change this condition's rating estimate.</p>
        <ul class="gapList">
          ${item.evidenceGapAnalysis.gaps.map(gap => `
            <li class="${gap.status}">
              <strong>${gap.status === 'present' ? gap.label : gap.missingLabel}</strong>
              <span>${gap.status === 'present' ? 'Evidence marked present or notes entered.' : gap.status === 'missing' ? 'Marked as evidence missing.' : 'Evidence not yet entered.'}</span>
            </li>
          `).join('')}
        </ul>
        <h5>Documentation suggestions</h5>
        <ul class="suggestionList">${item.evidenceGapAnalysis.suggestions.map(suggestion => `<li>${escapeHtml(suggestion)}</li>`).join('')}</ul>
      </section>
      <p class="citation"><strong>Reference:</strong> ${item.code}</p>
    </article>
  `).join('');

  const scenarioCombined = Object.entries(estimateModes).map(([key, mode]) => ({ key, mode, combined: calculateCombined(getAnswers(key)) }));
  scenarioSummaryGrid.innerHTML = scenarioCombined.map(({ key, mode, combined }) => `
    <div class="scenarioCard ${key === selectedMode ? 'active' : ''}">
      <strong>${mode.label}</strong>
      <span>${combined.rounded}%</span>
      <small>${mode.definition}</small>
    </div>
  `).join('');

  const combined = calculateCombined(estimates);
  combinedSummary.textContent = `${combined.rounded}%`;
  combinedSteps.innerHTML = combined.steps.length ? combined.steps.map(step => `
    <div class="step">
      <strong>Step ${step.index}: ${step.name} (${step.rating}%)</strong><br>
      Prior combined ${step.previous.toFixed(1)}%; remaining efficiency ${step.remaining.toFixed(1)}%; add ${step.rating}% of remaining = ${step.added.toFixed(1)}%. New raw combined = ${step.next.toFixed(1)}%.
    </div>
  `).join('') + `<div class="step"><strong>Rounding:</strong> Raw combined ${combined.raw.toFixed(1)}% rounds to ${combined.rounded}% under 38 CFR § 4.25.</div>` : '<div class="step">No compensable individual estimates selected. Combined estimate is 0%.</div>';
}

renderUnmappedConditionForm();
renderForm();
loadAutoSavePreference();
loadSavedWorkspace();
renderResults();
estimateModeSelect.addEventListener('change', () => { renderResults(); maybeAutoSave(); });
form.addEventListener('change', () => { renderResults(); maybeAutoSave(); });
form.addEventListener('input', () => { renderResults(); maybeAutoSave(); });
addUnmappedConditionBtn.addEventListener('click', addUnmappedCondition);
unmappedConditionList.addEventListener('click', event => {
  const button = event.target.closest('.removeUnmappedBtn');
  if (button) removeUnmappedCondition(button.dataset.unmappedId);
});
saveWorkspaceBtn.addEventListener('click', () => saveWorkspace({ manual: true }));
exportWorkspaceBtn.addEventListener('click', exportWorkspace);
importWorkspaceInput.addEventListener('change', event => importWorkspace(event.target.files[0]));
autoSaveToggle.addEventListener('change', () => {
  localStorage.setItem(AUTOSAVE_STORAGE_KEY, autoSaveToggle.checked ? 'enabled' : 'disabled');
  importStatus.textContent = autoSaveToggle.checked ? 'Auto-save enabled for this browser.' : 'Auto-save disabled. Manual save and export still work.';
  if (autoSaveToggle.checked) saveWorkspace();
});
document.querySelector('#resetBtn').addEventListener('click', resetWorkspace);
