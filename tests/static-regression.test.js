const fs = require('node:fs');
const assert = require('node:assert/strict');

const script = fs.readFileSync('script.js', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

function assertInOrder(haystack, labels) {
  let last = -1;
  for (const label of labels) {
    const index = haystack.indexOf(label);
    assert.notEqual(index, -1, `${label} should exist`);
    assert.ok(index > last, `${label} should appear after the previous section`);
    last = index;
  }
}

assert.match(script, /const WORKSPACE_SCHEMA_VERSION = 12;/, 'workspace schema should be v12');
assert.match(script, /WORKSPACE_STORAGE_KEY = 'vaDisabilityCalculator\.workspace\.v12'/, 'save/load should use v12 local-storage key');
assert.match(script, /LEGACY_WORKSPACE_STORAGE_KEYS = \['vaDisabilityCalculator\.workspace\.v11'.*v10.*v9.*v8.*v7.*v6.*v5/s, 'legacy import/load keys should remain supported');
assert.match(script, /trackingOnly = true;/, 'unmapped records should remain tracking-only');
assert.match(script, /ratingLogic = 'none';/, 'unmapped records should have no rating logic');
assert.match(script, /Tracking-only unmapped conditions are excluded/, 'report should disclose unmapped exclusion from combined math');
const renderResultsBody = script.slice(script.indexOf('function renderResults'), script.indexOf('const scenarioCombined', script.indexOf('function renderResults')));
assert.doesNotMatch(renderResultsBody, /renderClaimReport\(/, 'results refresh should not constantly regenerate the printable report');

assert.match(script, /bodySystemConditionMap = {/, 'body-system guided intake mapping should exist');
assert.match(script, /lowerBack: \['lumbar'\]/, 'Lower Back should reveal Lumbar Spine only');
assert.match(script, /showAllConditions/, 'show all conditions intake option should exist');
assert.match(script, /return selections\.includes\('showAllConditions'\);/, 'no body area selected should not default to showing all conditions');
assert.match(script, /if \(shouldShowAllConditions\(selections\)\) return new Set\(conditions\.map\(condition => condition\.id\)\)/, 'Show All Conditions should reveal every condition');
assert.match(script, /fieldset\.hidden = !visibleIds\.has\(fieldset\.dataset\.conditionId\)/, 'hidden conditions should be UI-filtered without disabling form values');
assert.doesNotMatch(script, /fieldset\.disabled\s*=/, 'hidden condition values should remain enabled in form data and rating math');
assert.match(html, /Select an area above to begin, or choose Show All Conditions\./, 'empty guided-intake state should be visible');
assertInOrder(html, ['Disclaimer:', 'What areas are affecting you?', 'How to use this estimator']);
assert.match(script, /bodySystemSelections: getBodySystemSelectionsFromForm\(\)/, 'body-system selections should be exported');
assert.match(script, /applyBodySystemSelections\(payload\.workspace\.bodySystemSelections\)/, 'body-system selections should be imported with sensible defaults');
assert.match(script, /Respiratory conditions are not yet implemented\. Consider using a tracking-only custom condition\./, 'breathing problems informational note should exist');

assert.match(html, /<details class="card workspaceControls advancedPanel"/, 'workspace controls should be collapsed in an advanced panel');
assert.match(html, /<details class="card privacyNotice advancedPanel"/, 'privacy notice should be collapsed in an advanced panel');
assert.match(html, /<details class="card unmappedConditionBuilder advancedPanel"/, 'custom unmapped condition builder should be collapsed');
assert.match(html, /<details class="card reportControls noPrint advancedPanel"/, 'claim report controls should be collapsed');
assert.match(html, /<details id="claimPlanningDashboard"/, 'claim planning dashboard should be collapsed');
assert.match(html, /<details id="claimPreparationSummary"/, 'claim preparation summary should be collapsed');
assert.match(html, /<details class="scenarioSummary card advancedPanel"/, 'scenario summary should be collapsed in advanced results');
assert.match(script, /<details class="evidenceCollection"/, 'detailed evidence tracking should be collapsed per condition');
assert.match(script, /function getRelevantEstimates/, 'results should be filtered to relevant conditions');
assert.match(script, /visibleIds\.has\(item\.id\) \|\| item\.rating > 0 \|\| hasConditionUserData\(item\)/, 'relevant conditions should include visible, rated, or user-entered data');
assert.match(script, /resultEmptyState card/, 'empty results state should render when no result cards are relevant');
assert.match(script, /<details class=\"advancedResultDetails\"[^`]*Selected estimate mode:/s, 'estimate mode explanation should be collapsed in result cards');
assert.match(script, /<details class=\"evidenceSummary\"/, 'evidence summary should be collapsed in result cards');
assert.match(script, /<details class=\"evidenceReadiness\"/, 'evidence readiness should be collapsed in result cards');
assert.match(script, /<details class=\"evidenceGapAnalysis\"/, 'evidence gap analysis should be collapsed in result cards');

assert.match(script, /function calculateCombined\(ratings\)/, 'combined-rating math function should remain present');
assert.match(script, /const remaining = 100 - combined;\s*const added = remaining \* \(item\.rating \/ 100\);\s*const next = combined \+ added;/, 'combined-rating math should remain unchanged');
assert.match(script, /if \(!claimReportGenerated\) renderClaimReport\(\);\s*window\.print\(\);/, 'print should work by generating only when no report exists');
assertInOrder(readme, Array.from({ length: 12 }, (_, index) => `## Version ${index + 1}`));

console.log('Static regression checks passed.');
