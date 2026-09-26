const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/views.js'), 'utf8'), context);
const run = (sentence, keys, blank = false) => vm.runInContext(
  `renderKeywords(${JSON.stringify(sentence)}, ${JSON.stringify(keys)}, k => ${blank ? '`<input data-a="${esc(k)}">`' : '`<b>${esc(k)}</b>`'})`, context);
const sentence = 'Last Saturday, someone threw a cake at the Monalisa.';
assert.equal(run(sentence, ['threw', 'at']), 'Last Saturday, someone <b>threw</b> a cake <b>at</b> the Monalisa.');
assert.equal(run(sentence, ['threw', 'at'], true), 'Last Saturday, someone <input data-a="threw"> a cake <input data-a="at"> the Monalisa.');
assert.equal(run('He ran after him.', ['ran after']), 'He <b>ran after</b> him.');
assert.equal(run('painting in a room', ['in']), 'painting <b>in</b> a room');
assert.equal(run('a+b and aab', ['a+b']), '<b>a+b</b> and aab');
assert.equal(run('<b> & at', ['at']), '&lt;b&gt; &amp; <b>at</b>');
assert.equal(run('at home at noon', ['at']), '<b>at</b> home at noon');
assert.equal(run('No keywords.', []), 'No keywords.');
console.log('Keyword boundaries, phrases, escaping, first occurrence PASS');
