const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(() => {
      window.playedRates = [];
      HTMLMediaElement.prototype.play = function () {
        window.playedRates.push(this.playbackRate);
        return Promise.resolve();
      };
    });
    await page.goto(process.argv[2] || pathToFileURL(path.join(__dirname, '../index.html')).href);
    for (const id of [5, 6]) {
      await page.locator(`[data-id="${id}"]`).click();
      await page.locator('[data-t=shadow]').click();
      await page.locator('#sRate').click();
      for (const selector of ['#sList .spk', '#sList .spk', '#sList .ln .body', '#sList [data-grp]', '#sPlay']) {
        await page.locator(selector).first().click();
        assert.equal(await page.evaluate(() => playedRates.at(-1)), 0.7, selector);
        assert.equal(await page.locator('#sRate').getAttribute('aria-pressed'), 'true');
      }
      await page.locator('#sRate').click();
      await page.locator('#sList .spk').first().click();
      assert.equal(await page.evaluate(() => playedRates.at(-1)), 1);
      await page.locator('#sRate').click();
      await page.locator('[data-t=voca]').click();
      await page.locator('#s-voca [data-say]').first().click();
      assert.equal(await page.evaluate(() => playedRates.at(-1)), 1, 'Other tabs retain normal speed');
      console.log(`Lesson ${id}: single, repeat, row, paragraph, full playback rates PASS`);
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
