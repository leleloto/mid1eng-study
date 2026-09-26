// PLAYWRIGHT_MODULE에 기존 Playwright 모듈 경로 지정 후 node scripts/check-quiz.cjs 실행.
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(process.argv[2] || pathToFileURL(path.join(__dirname, '../index.html')).href);
    await page.clock.install();
    await page.evaluate(() => { TTS.play = async () => {}; });
    for (const id of [5, 6]) {
      await page.locator(`[data-id="${id}"]`).click();
      await page.locator('[data-t=shadow]').click();
      if (id === 5) {
        const first = await page.locator('#sList .ln .en').first().innerHTML();
        assert(first.includes('Last Saturday,'));
        assert(first.includes('cake <b>at</b> the'));
      }
      await page.locator('[data-t=blank]').click();
      const reconstructed = await page.locator('#bList .en').evaluateAll(rows => rows.map(row => {
        const copy = row.cloneNode(true);
        copy.querySelectorAll('input').forEach(input => input.replaceWith(input.dataset.a));
        return copy.textContent;
      }));
      const expected = await page.evaluate(() => App.lesson.passage.filter(s => Array.isArray(s) && s[2]?.length).map(s => s[0]));
      assert.deepEqual(reconstructed, expected);
      await page.locator('[data-t=quiz]').click();
      const words = await page.evaluate(() => App.lesson.voca);
      for (const reverse of [false, true]) {
        if (reverse) await page.locator('#qDir').click();
        await page.locator('#qGo').click();
        assert.equal(await page.locator('.qn').innerText(), `1 / ${words.length}`);
        const seen = new Set();
        let missed;
        for (let i = 0; i < words.length; i++) {
          const question = await page.locator('.qt').innerText();
          const word = words.find(w => w[reverse ? 1 : 0] === question);
          assert(word, question);
          assert(!seen.has(question), 'Repeated word');
          seen.add(question);
          const answer = word[reverse ? 0 : 1];
          if (!i) missed = question;
          await page.locator('.opt').evaluateAll((buttons, { answer, wrong }) => {
            buttons.find(b => (b.dataset.o === answer) !== wrong).click();
          }, { answer, wrong: i === 0 });
          await page.clock.runFor(1000);
        }
        assert.equal(seen.size, words.length);
        assert.match(await page.locator('#qCard h2').innerText(), new RegExp(`${words.length - 1}개`));
        const best = await page.locator('#qBest').innerText();
        assert(best.includes('%'));
        await page.locator('#qRetry').click();
        assert.equal(await page.locator('.qn').innerText(), '1 / 1');
        assert.equal(await page.locator('.qt').innerText(), missed);
        const word = words.find(w => w[reverse ? 1 : 0] === missed);
        await page.locator('.opt').evaluateAll((buttons, answer) => buttons.find(b => b.dataset.o === answer).click(), word[reverse ? 0 : 1]);
        await page.clock.runFor(1000);
        assert.match(await page.locator('#qCard').innerText(), /전부 정답/);
        assert.equal(await page.locator('#qBest').innerText(), best, 'Retry must not inflate full-quiz record');
      }
      await page.locator('[data-t=recall]').click();
      await page.locator('#rGo').click();
      assert(await page.locator('#rBank .chip').count() > 0);
      console.log(`Lesson ${id}: shadow, blanks, all words, both directions, retry, record, recall PASS`);
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
