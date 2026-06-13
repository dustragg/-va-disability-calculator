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

assert.match(script, /const WORKSPACE_SCHEMA_VERSION = 10;/, 'workspace schema should remain v10');
assert.match(script, /WORKSPACE_STORAGE_KEY = 'vaDisabilityCalculator\.workspace\.v10'/, 'save/load should use v10 local-storage key');
assert.match(script, /LEGACY_WORKSPACE_STORAGE_KEYS = \['vaDisabilityCalculator\.workspace\.v9'.*v8.*v7.*v6.*v5/s, 'legacy import/load keys should remain supported');
assert.match(script, /trackingOnly = true;/, 'unmapped records should remain tracking-only');
assert.match(script, /ratingLogic = 'none';/, 'unmapped records should have no rating logic');
assert.match(script, /Tracking-only unmapped conditions are excluded/, 'report should disclose unmapped exclusion from combined math');
const renderResultsBody = script.slice(script.indexOf('function renderResults'), script.indexOf('const scenarioCombined', script.indexOf('function renderResults')));
assert.doesNotMatch(renderResultsBody, /renderClaimReport\(/, 'results refresh should not constantly regenerate the printable report');
assert.match(script, /if \(!claimReportGenerated\) renderClaimReport\(\);\s*window\.print\(\);/, 'print should work by generating only when no report exists');
assertInOrder(readme, Array.from({ length: 10 }, (_, index) => `## Version ${index + 1}`));

console.log('Static regression checks passed.');
