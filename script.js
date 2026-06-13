const conditions = [
  {
    id: 'migraines', name: 'Migraines', code: '38 CFR § 4.124a, DC 8100',
    description: 'Focuses on frequency and severity of prostrating headache attacks and economic impact.',
    questions: [{ id: 'level', label: 'Which best describes documented migraine attacks?', options: [
      ['0', 'Not claimed, no diagnosis, or attacks are not prostrating'],
      ['10', 'Characteristic prostrating attacks average about one in 2 months over the last several months'],
      ['30', 'Characteristic prostrating attacks occur about once a month'],
      ['50', 'Very frequent, completely prostrating and prolonged attacks with severe economic inadaptability']
    ]}],
    estimate: a => explain(+a.level, 'Selected migraine frequency/severity level.')
  },
  {
    id: 'neck', name: 'Neck / cervical spine limitation of motion', code: '38 CFR § 4.71a, General Rating Formula for Diseases and Injuries of the Spine',
    description: 'Uses cervical forward flexion, combined range of motion, abnormal gait/contour, and ankylosis indicators.',
    questions: [{ id: 'level', label: 'What is the closest cervical spine finding?', options: [
      ['0', 'No compensable limitation shown'],
      ['10', 'Forward flexion >30° but ≤40°, combined ROM >170° but ≤335°, or painful motion/spasm not causing abnormal gait/contour'],
      ['20', 'Forward flexion >15° but ≤30°, combined ROM ≤170°, or spasm/guarding causing abnormal gait or abnormal spinal contour'],
      ['30', 'Forward flexion 15° or less, or favorable ankylosis of entire cervical spine'],
      ['40', 'Unfavorable ankylosis of entire cervical spine'],
      ['100', 'Unfavorable ankylosis of entire spine']
    ]}],
    estimate: a => explain(+a.level, 'Selected cervical-spine range-of-motion or ankylosis level.')
  },
  {
    id: 'shoulder', name: 'Shoulder limitation of motion', code: '38 CFR § 4.71a, DC 5201',
    description: 'Estimates one shoulder under arm limitation of motion criteria. Major/minor differences are simplified.',
    questions: [{ id: 'level', label: 'How far can the affected arm move from the side?', options: [
      ['0', 'No compensable limitation shown'],
      ['20', 'Limited at shoulder level or midway between side and shoulder level'],
      ['30', 'Major arm limited to 25° from side, or severe minor-arm limitation'],
      ['40', 'Major arm limited to 25° from side (maximum major-arm estimate)']
    ]}],
    estimate: a => explain(+a.level, 'Selected shoulder abduction/flexion limitation level; exact rating can depend on dominant arm and evidence.')
  },
  {
    id: 'pesPlanus', name: 'Flat feet / pes planus', code: '38 CFR § 4.71a, DC 5276',
    description: 'Considers mild, moderate, severe, and pronounced acquired flatfoot symptoms.',
    questions: [{ id: 'level', label: 'Which flatfoot description fits best?', options: [
      ['0', 'Mild symptoms relieved by built-up shoe or arch support'],
      ['10', 'Moderate: weight-bearing line over/medial to great toe, inward bowing tendo achillis, pain on manipulation and use'],
      ['20', 'Severe unilateral: marked deformity, accentuated pain, swelling on use, characteristic callosities'],
      ['30', 'Severe bilateral or pronounced unilateral symptoms'],
      ['50', 'Pronounced bilateral: marked pronation, extreme plantar tenderness, marked inward displacement/severe tendo achillis spasm, not improved by orthotics']
    ]}],
    estimate: a => explain(+a.level, 'Selected pes planus severity pattern; unilateral/bilateral evidence may change the exact percentage.')
  },
  {
    id: 'bunion', name: 'Bunion / hallux valgus', code: '38 CFR § 4.71a, DC 5280',
    description: 'Hallux valgus is generally noncompensable unless severe or post-operative with metatarsal head resection.',
    questions: [{ id: 'level', label: 'Which hallux valgus finding applies?', options: [
      ['0', 'Mild/moderate bunion symptoms only'],
      ['10', 'Severe, equivalent to amputation of great toe, or operated with resection of metatarsal head']
    ]}],
    estimate: a => explain(+a.level, 'Selected hallux valgus criterion.')
  },
  {
    id: 'gerd', name: 'GERD / analogous digestive rating', code: '38 CFR § 4.114, DC 7346 by analogy',
    description: 'GERD is often rated analogously to hiatal hernia symptoms; this is especially evidence-dependent.',
    questions: [{ id: 'level', label: 'Which digestive symptom pattern is closest?', options: [
      ['0', 'Occasional symptoms controlled by diet/medication without compensable pattern'],
      ['10', 'Two or more symptoms such as epigastric distress, dysphagia, pyrosis, regurgitation, substernal/arm/shoulder pain, less severe than 30%'],
      ['30', 'Persistently recurrent epigastric distress with dysphagia, pyrosis, regurgitation and substernal/arm/shoulder pain causing considerable impairment of health'],
      ['60', 'Pain, vomiting, material weight loss and hematemesis or melena with anemia, or other symptom combinations causing severe impairment of health']
    ]}],
    estimate: a => explain(+a.level, 'Selected analogous GERD/hiatal-hernia symptom pattern.')
  },
  {
    id: 'hypertension', name: 'Hypertension', code: '38 CFR § 4.104, DC 7101',
    description: 'Uses predominant blood pressure readings and medication history.',
    questions: [{ id: 'level', label: 'Which blood pressure / medication history best fits?', options: [
      ['0', 'Readings below compensable thresholds and no qualifying medication history'],
      ['10', 'Diastolic predominantly 100+, systolic predominantly 160+, or history of diastolic 100+ requiring continuous medication'],
      ['20', 'Diastolic predominantly 110+ or systolic predominantly 200+'],
      ['40', 'Diastolic predominantly 120+'],
      ['60', 'Diastolic predominantly 130+']
    ]}],
    estimate: a => explain(+a.level, 'Selected predominant blood pressure / medication criterion.')
  },
  {
    id: 'sleepApnea', name: 'Sleep apnea', code: '38 CFR § 4.97, DC 6847',
    description: 'Rates sleep apnea syndromes by breathing-assistance needs and complications.',
    questions: [{ id: 'level', label: 'Which sleep apnea finding applies?', options: [
      ['0', 'Asymptomatic but documented sleep disorder breathing'],
      ['30', 'Persistent daytime hypersomnolence'],
      ['50', 'Requires use of breathing assistance device such as CPAP'],
      ['100', 'Chronic respiratory failure with carbon dioxide retention or cor pulmonale, or requires tracheostomy']
    ]}],
    estimate: a => explain(+a.level, 'Selected sleep apnea treatment/complication level.')
  }
];

const form = document.querySelector('#ratingForm');
const individualResults = document.querySelector('#individualResults');
const combinedSummary = document.querySelector('#combinedSummary');
const combinedSteps = document.querySelector('#combinedSteps');

function explain(rating, reason) { return { rating, reason }; }

function renderForm() {
  form.innerHTML = conditions.map(condition => `
    <fieldset class="condition card">
      <div class="conditionHeader">
        <div><h2>${condition.name}</h2><p>${condition.description}</p></div>
        <span class="badge">${condition.code}</span>
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
    </fieldset>
  `).join('');
}

function getAnswers() {
  const data = new FormData(form);
  return conditions.map(condition => {
    const answers = Object.fromEntries(condition.questions.map(q => [q.id, data.get(`${condition.id}.${q.id}`) || '0']));
    return { ...condition, ...condition.estimate(answers) };
  });
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

function renderResults() {
  const estimates = getAnswers();
  individualResults.innerHTML = estimates.map(item => `
    <article class="result card">
      <h3>${item.name}</h3>
      <p class="rating">${item.rating}%</p>
      <p><strong>Why this possible estimate was selected:</strong> ${item.reason}</p>
      <p class="citation"><strong>Reference:</strong> ${item.code}</p>
    </article>
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

renderForm();
renderResults();
form.addEventListener('change', renderResults);
document.querySelector('#resetBtn').addEventListener('click', () => { form.reset(); renderResults(); });
