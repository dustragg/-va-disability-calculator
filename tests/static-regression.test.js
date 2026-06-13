const fs = require('node:fs');
const assert = require('node:assert/strict');

const script = fs.readFileSync('script.js', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

function assertInOrder(haystack, labels) {
  let last = -1;
  for (const label of labels) {
    const index = haystack.indexOf(label);
    assert.notEqual(index, -1, `${label} should exist`);
    assert.ok(index > last, `${label} should appear after the previous section`);
    last = index;
  }
}

assert.match(script, /const WORKSPACE_SCHEMA_VERSION = 11;/, 'workspace schema should be v11');
assert.match(script, /WORKSPACE_STORAGE_KEY = 'vaDisabilityCalculator\.workspace\.v11'/, 'save/load should use v11 local-storage key');
assert.match(script, /LEGACY_WORKSPACE_STORAGE_KEYS = \['vaDisabilityCalculator\.workspace\.v10'.*v9.*v8.*v7.*v6.*v5/s, 'legacy import/load keys should remain supported');
assert.match(script, /trackingOnly = true;/, 'unmapped records should remain tracking-only');
assert.match(script, /ratingLogic = 'none';/, 'unmapped records should have no rating logic');
assert.match(script, /Tracking-only unmapped conditions are excluded/, 'report should disclose unmapped exclusion from combined math');
const renderResultsBody = script.slice(script.indexOf('function renderResults'), script.indexOf('const scenarioCombined', script.indexOf('function renderResults')));
assert.doesNotMatch(renderResultsBody, /renderClaimReport\(/, 'results refresh should not constantly regenerate the printable report');

assert.match(script, /bodySystemConditionMap = {/, 'body-system guided intake mapping should exist');
assert.match(script, /showAllConditions/, 'show all conditions intake option should exist');
assert.match(script, /bodySystemSelections: getBodySystemSelectionsFromForm\(\)/, 'body-system selections should be exported');
assert.match(script, /applyBodySystemSelections\(payload\.workspace\.bodySystemSelections\)/, 'body-system selections should be imported with sensible defaults');
assert.match(script, /fieldset\.hidden = !visibleIds\.has\(fieldset\.dataset\.conditionId\)/, 'hidden conditions should be UI-filtered without disabling form values');
assert.match(script, /Respiratory conditions are not yet implemented\. Consider using a tracking-only custom condition\./, 'breathing problems informational note should exist');

assert.match(script, /if \(!claimReportGenerated\) renderClaimReport\(\);\s*window\.print\(\);/, 'print should work by generating only when no report exists');
assertInOrder(readme, Array.from({ length: 11 }, (_, index) => `## Version ${index + 1}`));

console.log('Static regression checks passed.');
