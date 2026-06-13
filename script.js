const sourceNotes = [
  'Current eCFR checked June 13, 2026. Digestive-system ratings changed effective May 19, 2024; GERD now has DC 7206 instead of an analogous DC 7346-only approach.',
  'Sleep-apnea respiratory revisions have been proposed, but DC 6847 remains unchanged in current eCFR as of this review.',
  'Musculoskeletal estimates assume measurements already include functional loss after repeated use/flare-ups when the evidence supports it.'
];

const conditions = [
  {
    id: 'migraines', name: 'Migraines', code: '38 CFR § 4.124a, DC 8100',
    description: 'Focuses on characteristic prostrating attacks, frequency over the last several months, and severe economic inadaptability.',
    assumptions: 'The tool cannot decide whether an attack is “characteristic prostrating” or whether evidence shows “productive of severe economic inadaptability”; those require medical/lay/employment evidence.',
    questions: [{ id: 'level', label: 'Which best describes documented migraine attacks?', options: [
      ['0', 'Less frequent attacks, not claimed, or attacks are not characteristic prostrating attacks'],
      ['10', 'Characteristic prostrating attacks average one in 2 months over the last several months'],
      ['30', 'Characteristic prostrating attacks occur on average once a month over the last several months'],
      ['50', 'Very frequent completely prostrating and prolonged attacks productive of severe economic inadaptability']
    ]}],
    estimate: a => explain(+a.level, 'Selected the DC 8100 frequency/severity tier that best matches the answer.')
  },
  {
    id: 'neck', name: 'Neck / cervical spine limitation of motion', code: '38 CFR § 4.71a, General Rating Formula for Diseases and Injuries of the Spine (DCs 5235-5243)',
    description: 'Uses cervical forward flexion, combined cervical range of motion, guarding/spasm effects, ankylosis, and physician-prescribed IVDS bed rest if applicable.',
    assumptions: 'Separate neurologic abnormalities, thoracolumbar ratings, examiner-specific normal ROM findings, and IVDS bed-rest documentation are not fully captured.',
    questions: [{ id: 'level', label: 'What is the closest cervical spine finding?', options: [
      ['0', 'No compensable limitation shown'],
      ['10', 'Cervical flexion >30° but ≤40°, combined cervical ROM >170° but ≤335°, localized tenderness/guarding/spasm not causing abnormal gait/contour, or vertebral body fracture with 50%+ height loss'],
      ['20', 'Cervical flexion >15° but ≤30°, combined cervical ROM ≤170°, or spasm/guarding causing abnormal gait or abnormal spinal contour'],
      ['30', 'Cervical flexion 15° or less, or favorable ankylosis of entire cervical spine'],
      ['40', 'Unfavorable ankylosis of entire cervical spine'],
      ['100', 'Unfavorable ankylosis of entire spine']
    ]}, { id: 'ivds', label: 'If cervical IVDS with physician-prescribed bed rest is documented, how much in the past 12 months?', options: [
      ['0', 'No qualifying physician-prescribed bed rest'],
      ['10', 'At least 1 week but less than 2 weeks'],
      ['20', 'At least 2 weeks but less than 4 weeks'],
      ['40', 'At least 4 weeks but less than 6 weeks'],
      ['60', 'At least 6 weeks']
    ]}],
    estimate: a => {
      const rom = +a.level, ivds = +a.ivds;
      const rating = Math.max(rom, ivds);
      const basis = ivds > rom ? 'IVDS incapacitating-episode formula produced the higher estimate.' : 'General spine formula produced the higher estimate.';
      return explain(rating, basis);
    }
  },
  {
    id: 'shoulder', name: 'Shoulder limitation of motion', code: '38 CFR § 4.71a, DC 5201',
    description: 'Estimates limitation of motion of one arm and accounts for dominant (major) versus non-dominant (minor) arm.',
    assumptions: 'This does not evaluate ankylosis, humerus impairment, clavicle/scapula impairment, instability, or separate painful-motion/arthritis theories.',
    questions: [{ id: 'side', label: 'Which shoulder is affected?', options: [['major', 'Dominant / major arm'], ['minor', 'Non-dominant / minor arm']] },
      { id: 'level', label: 'How far can the affected arm move from the side?', options: [
      ['0', 'No compensable limitation shown'],
      ['20', 'Limited at shoulder level (flexion/abduction about 90°)'],
      ['25', 'Limited midway between side and shoulder level (about 45°)'],
      ['30', 'Limited to 25° from side']
    ]}],
    estimate: a => {
      if (a.level === '0') return explain(0, 'No compensable DC 5201 limitation selected.');
      if (a.level === '30') return explain(a.side === 'major' ? 40 : 30, 'Arm limited to 25° from side; DC 5201 assigns 40% for major arm and 30% for minor arm.');
      if (a.level === '25') return explain(a.side === 'major' ? 30 : 20, 'Arm limited midway between side and shoulder level; DC 5201 assigns 30% for major arm and 20% for minor arm.');
      return explain(20, 'Arm limited at shoulder level; DC 5201 assigns 20% for either arm.');
    }
  },
  {
    id: 'pesPlanus', name: 'Flat feet / pes planus', code: '38 CFR § 4.71a, DC 5276',
    description: 'Considers mild, moderate, severe, and pronounced acquired flatfoot, with unilateral/bilateral distinctions.',
    assumptions: 'The tool relies on the user to identify whether findings such as marked deformity, pronation, tenderness, swelling, callosities, and orthotic response are documented.',
    questions: [{ id: 'level', label: 'Which flatfoot description fits best?', options: [
      ['0', 'Mild symptoms relieved by built-up shoe or arch support'],
      ['10', 'Moderate unilateral or bilateral: weight-bearing line over/medial to great toe, inward bowing tendo achillis, pain on manipulation and use'],
      ['20', 'Severe unilateral: objective marked deformity, accentuated pain, swelling on use, and characteristic callosities'],
      ['30u', 'Pronounced unilateral: marked pronation, extreme plantar tenderness, marked inward displacement/severe tendo achillis spasm on manipulation, not improved by orthopedic shoes/appliances'],
      ['30b', 'Severe bilateral: objective marked deformity, accentuated pain, swelling on use, and characteristic callosities'],
      ['50', 'Pronounced bilateral: marked pronation, extreme plantar tenderness, marked inward displacement/severe tendo achillis spasm on manipulation, not improved by orthopedic shoes/appliances']
    ]}],
    estimate: a => explain(a.level === '30u' || a.level === '30b' ? 30 : +a.level, 'Selected the DC 5276 severity and unilateral/bilateral tier.')
  },
  {
    id: 'bunion', name: 'Bunion / hallux valgus', code: '38 CFR § 4.71a, DC 5280',
    description: 'Hallux valgus is generally 10% only when operated with metatarsal head resection or severe equivalent to great-toe amputation.',
    assumptions: 'Other foot injuries, arthritis, scars, or multiple toe conditions could require separate analysis not captured here.',
    questions: [{ id: 'level', label: 'Which hallux valgus finding applies?', options: [
      ['0', 'Mild/moderate bunion symptoms only'],
      ['10', 'Operated with resection of metatarsal head'],
      ['10', 'Severe, equivalent to amputation of great toe']
    ]}],
    estimate: a => explain(+a.level, 'Selected the DC 5280 hallux valgus criterion.')
  },
  {
    id: 'gerd', name: 'GERD', code: '38 CFR § 4.114, DC 7206; hiatal hernia DC 7346 rates as DC 7203',
    description: 'Uses current post-May 19, 2024 GERD criteria based on documented esophageal stricture with dysphagia, medication, dilation/stent/surgery/PEG, and complications.',
    assumptions: 'Findings must be documented by barium swallow, CT, or EGD. Claims or protected ratings governed by older criteria may require comparison with pre-May 19, 2024 criteria outside this estimator.',
    questions: [{ id: 'level', label: 'Which current GERD/esophageal-stricture pattern is documented?', options: [
      ['0', 'Documented history without daily symptoms or requirement for daily medications'],
      ['10', 'Documented esophageal stricture requiring daily medication to control dysphagia, otherwise asymptomatic'],
      ['30', 'Recurrent esophageal stricture causing dysphagia requiring dilation no more than 2 times per year'],
      ['50', 'Recurrent/refractory stricture causing dysphagia requiring dilation 3+ times/year, dilation using steroids at least once/year, or esophageal stent placement'],
      ['80', 'Recurrent/refractory stricture causing dysphagia with aspiration, undernutrition, or substantial weight loss, plus surgical correction or PEG tube']
    ]}],
    estimate: a => explain(+a.level, 'Selected the current DC 7206 GERD tier; older DC 7346-by-analogy symptom criteria are not used for new current-schedule estimates.')
  },
  {
    id: 'hypertension', name: 'Hypertension', code: '38 CFR § 4.104, DC 7101',
    description: 'Uses predominant blood pressure readings and qualifying continuous-medication history.',
    assumptions: 'Hypertension must be confirmed by readings taken two or more times on at least three different days; secondary causes and heart disease are not evaluated here.',
    questions: [{ id: 'level', label: 'Which blood pressure / medication history best fits?', options: [
      ['0', 'Readings below compensable thresholds and no qualifying medication history'],
      ['10', 'Diastolic predominantly 100+, systolic predominantly 160+, or history of diastolic 100+ requiring continuous medication'],
      ['20', 'Diastolic predominantly 110+ or systolic predominantly 200+'],
      ['40', 'Diastolic predominantly 120+'],
      ['60', 'Diastolic predominantly 130+']
    ]}],
    estimate: a => explain(+a.level, 'Selected the DC 7101 predominant blood pressure / continuous-medication criterion.')
  },
  {
    id: 'sleepApnea', name: 'Sleep apnea', code: '38 CFR § 4.97, DC 6847',
    description: 'Rates sleep apnea syndromes by documented sleep-disordered breathing, persistent daytime hypersomnolence, breathing-assistance device requirement, and severe complications.',
    assumptions: 'Current eCFR still awards 50% when a breathing assistance device such as CPAP is required. Proposed respiratory updates are not final and are not used.',
    questions: [{ id: 'level', label: 'Which sleep apnea finding applies?', options: [
      ['0', 'Asymptomatic but documented sleep disorder breathing'],
      ['30', 'Persistent daytime hypersomnolence'],
      ['50', 'Requires use of breathing assistance device such as CPAP'],
      ['100', 'Chronic respiratory failure with carbon dioxide retention or cor pulmonale, or requires tracheostomy']
    ]}],
    estimate: a => explain(+a.level, 'Selected the current DC 6847 treatment/complication level.')
  }
];

const form = document.querySelector('#ratingForm');
const individualResults = document.querySelector('#individualResults');
const combinedSummary = document.querySelector('#combinedSummary');
const combinedSteps = document.querySelector('#combinedSteps');
const sourceNotesList = document.querySelector('#sourceNotes');

function explain(rating, reason) { return { rating, reason }; }
function html(items) { return items.join(''); }

function renderForm() {
  sourceNotesList.innerHTML = html(sourceNotes.map(note => `<li>${note}</li>`));
  form.innerHTML = html(conditions.map(condition => `
    <fieldset class="condition card">
      <div class="conditionHeader">
        <div><h2>${condition.name}</h2><p>${condition.description}</p></div>
        <span class="badge">${condition.code}</span>
      </div>
      <div class="questions">
        ${html(condition.questions.map(q => `
          <label for="${condition.id}-${q.id}">${q.label}
            <select id="${condition.id}-${q.id}" name="${condition.id}.${q.id}">
              ${html(q.options.map(([value, label]) => `<option value="${value}">${label}</option>`))}
            </select>
            <span class="help">Choose the answer best supported by current medical, lay, and claims evidence.</span>
          </label>`))}
        <p class="assumption"><strong>Assumption:</strong> ${condition.assumptions}</p>
      </div>
    </fieldset>`));
}

function getAnswers() {
  const data = new FormData(form);
  return conditions.map(condition => {
    const answers = Object.fromEntries(condition.questions.map(q => [q.id, data.get(`${condition.id}.${q.id}`) || '0']));
    return { ...condition, ...condition.estimate(answers) };
  });
}

function roundToNearestTen(value) { return Math.min(100, Math.round(value / 10) * 10); }

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

function renderResults() {
  const estimates = getAnswers();
  individualResults.innerHTML = html(estimates.map(item => `
    <article class="result card">
      <h3>${item.name}</h3>
      <p class="rating">${item.rating}%</p>
      <p><strong>Why this possible estimate was selected:</strong> ${item.reason}</p>
      <p><strong>Assumption / evidence limit:</strong> ${item.assumptions}</p>
      <p class="citation"><strong>Reference:</strong> ${item.code}</p>
    </article>`));

  const combined = calculateCombined(estimates);
  combinedSummary.textContent = `${combined.rounded}%`;
  combinedSteps.innerHTML = combined.steps.length ? html(combined.steps.map(step => `
    <div class="step">
      <strong>Step ${step.index}: ${step.name} (${step.rating}%)</strong><br>
      Prior combined ${step.previous.toFixed(1)}%; remaining efficiency ${step.remaining.toFixed(1)}%; add ${step.rating}% of remaining = ${step.added.toFixed(1)}%. New raw combined = ${step.next.toFixed(1)}%.
    </div>`)) + `<div class="step"><strong>Rounding:</strong> Raw combined ${combined.raw.toFixed(1)}% rounds to ${combined.rounded}% under 38 CFR § 4.25.</div>` : '<div class="step">No compensable individual estimates selected. Combined estimate is 0%.</div>';
}

renderForm();
renderResults();
form.addEventListener('change', renderResults);
document.querySelector('#resetBtn').addEventListener('click', () => { form.reset(); renderResults(); });
