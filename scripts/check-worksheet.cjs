const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({channel:'msedge', headless:true});
  try {
    const page = await browser.newPage({viewport:{width:390,height:844}});
    const errors=[]; page.on('pageerror', e=>errors.push(e.message));
    await page.goto(process.argv[2] || pathToFileURL(path.join(__dirname,'../index.html')).href);
    await page.locator('[data-id="6"]').click();
    assert.equal(await page.locator('[data-t="worksheet"]').count(),1,'School worksheet tab must exist');
    await page.locator('[data-t="worksheet"]').click();
    const groups = await page.evaluate(()=>LESSONS.find(l=>l.id===6).worksheets);
    assert.equal(groups.length,9);
    assert.equal(groups.flatMap(g=>g.questions).length,117);
    for(let i=0;i<groups.length;i++) {
      await page.locator(`[data-wgroup="${i}"]`).click();
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Mobile horizontal overflow');
      for(const q of groups[i].questions) {
        assert(q.answer?.length); assert(q.explanation || i===0);
      }
      await page.locator('#wQuestions .wq').evaluateAll((cards,questions)=>cards.forEach((card,i)=>{
        const input=card.querySelector('input');
        if(input.type==='radio') card.querySelectorAll('input')[Number(questions[i].answer[0])-1].click();
        else {input.value=questions[i].answer[0];input.dispatchEvent(new Event('input',{bubbles:true}));}
      }),groups[i].questions);
      await page.locator('#wCheck').click();
      assert.equal(await page.locator('#wQuestions .exres.ok').count(),groups[i].questions.length);
    }
    assert(await page.evaluate(()=>worksheetCorrect({answer:['use single-use plastic cups inside the café']},'USE SINGLE USE PLASTIC CUPS INSIDE THE CAFE.')));
    assert(!await page.evaluate(()=>worksheetCorrect({answer:['to learn']},'to learns')));
    if(process.env.WORKSHEET_SCREENSHOT) await page.screenshot({path:process.env.WORKSHEET_SCREENSHOT,fullPage:false});
    await page.locator('[data-wgroup="0"]').click();
    await page.locator('#wReset').click();
    await page.locator('#wQuestions input').first().fill('incorrect');
    await page.reload();
    await page.locator('[data-id="6"]').click();
    await page.locator('[data-t="worksheet"]').click();
    assert.equal(await page.locator('#wQuestions input').first().inputValue(),'incorrect');
    await page.locator('#wCheck').click();
    assert.match(await page.locator('#wQuestions .exres').first().innerText(),/오답/);
    await page.locator('#wRetry').click();
    assert.equal(await page.locator('#wQuestions input').first().inputValue(),'');
    await page.locator('[data-id="5"]').click();
    assert.match(await page.locator('#s-worksheet').innerText(),/6과/);
    assert.deepEqual(errors,[]);
    console.log('117 worksheet questions: correct grading, wrong/blank answers, retry, reload persistence, lesson isolation PASS');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
