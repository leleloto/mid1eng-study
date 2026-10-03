const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
for (const id of ['05', '06']) {
  let lesson;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, `../data/lesson${id}.js`), 'utf8'), { registerLesson: l => lesson = l });
  const sentences = lesson.passage.filter(Array.isArray).map(s => s[0]);
  assert(lesson.recallChunks, `Lesson ${id} needs meaning chunks`);
  assert.equal(lesson.recallChunks.length, sentences.length);
  lesson.recallChunks.forEach((line, i) => {
    const chunks = line.split(' / ');
    assert.equal(chunks.join(' '), sentences[i], `Sentence ${i + 1} must stay unchanged`);
    assert(chunks.length >= 2 && chunks.length <= 7);
    assert(chunks.some(c => c.includes(' ')), 'Must not split every word');
  });
  console.log(`Lesson ${id}: ${sentences.length} meaning-chunk sentences PASS`);
}
