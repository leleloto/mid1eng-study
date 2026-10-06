/* 학교 학습지: 단원별 답안은 기존 브라우저 저장소에 보관. */
const worksheetNorm = value => norm(String(value).normalize('NFKD').replace(/\p{M}/gu, ''))
  .replace(/[‐‑–—-]/g, ' ').replace(/\s+/g, ' ').trim();
const worksheetCorrect = (question, value) => question.answer.some(a => worksheetNorm(a) === worksheetNorm(value));

VIEWS.worksheet = {
  mount(root, lesson){
    const groups = lesson.worksheets || [];
    if (!groups.length){
      root.innerHTML = '<div class="card">학교 학습지는 상단에서 <b>6과</b>를 선택하면 풀 수 있어요.</div>';
      return;
    }
    root.innerHTML = `<p class="note">학습지를 골라 답을 쓰고 채점하세요. 답은 이 브라우저에 자동 저장됩니다. 서술형은 등록된 정답 표현으로 채점하며, 다른 표현은 해설과 비교해 확인하세요.</p>
      <div class="bar" id="wGroups">${groups.map((g,i)=>`<button class="btn" data-wgroup="${i}">${esc(g.title)} <span class="secn">${g.questions.length}</span></button>`).join('')}</div>
      <div class="card" id="wIntro"></div>
      <div class="bar"><button class="btn pri" id="wCheck">채점</button><button class="btn" id="wRetry" hidden>오답만 다시 풀기</button><button class="btn" id="wReset">이 학습지 다시 풀기</button><span class="count" id="wCount" role="status" aria-live="polite"></span></div>
      <div id="wQuestions"></div><div class="bar"><button class="btn pri" id="wCheckBottom">채점</button></div>`;
    let index = 0, state;
    const key = () => 'worksheet' + lesson.id + '.' + groups[index].id;
    const save = () => Store._set(key(), state);
    const indices = () => state.only || groups[index].questions.map((_,i)=>i);
    const wrong = () => indices().filter(i=>!worksheetCorrect(groups[index].questions[i],state.answers[i] || ''));
    const draw = () => {
      const group = groups[index];
      root.querySelectorAll('[data-wgroup]').forEach(b=>b.classList.toggle('pri',Number(b.dataset.wgroup)===index));
      root.querySelector('#wIntro').innerHTML = `<h2>${esc(group.title)}</h2><p class="note">${esc(group.source)}</p>${group.note ? `<p>${esc(group.note)}</p>` : ''}${state.only ? '<p class="note">틀리거나 답하지 않은 문제만 다시 풀고 있어요.</p>' : ''}`;
      root.querySelector('#wQuestions').innerHTML = indices().map(i=>{
        const q=group.questions[i], value=state.answers[i] || '';
        const correct=worksheetCorrect(q,value);
        const answer=q.choices ? q.choices[Number(q.answer[0])-1] : q.answer[0];
        const field=q.choices ? `<div class="choices">${q.choices.map((c,j)=>`<label class="ch"><input type="radio" name="w${i}" data-wanswer="${i}" value="${j+1}" ${value===String(j+1)?'checked':''} ${state.graded?'disabled':''}><span class="chn">${j+1}.</span><span>${esc(c)}</span></label>`).join('')}</div>`
          : `<input class="exin" type="text" data-wanswer="${i}" value="${esc(value)}" aria-label="${esc(q.no)}번 답" placeholder="${group.id==='words'?'영어 단어·표현을 쓰세요':'답을 쓰세요'}" autocomplete="off" autocapitalize="off" spellcheck="false" ${state.graded?'disabled':''}>`;
        return `<div class="card wq"><div class="exhead"><span class="exno">${esc(q.no)}</span><span class="exprompt">${esc(q.prompt)}</span></div>${q.passage?`<pre class="expass">${esc(q.passage)}</pre>`:''}${field}
          ${state.graded?`<div class="exres ${correct?'ok':'no'}">${correct?'정답':value?'오답':'미응답'}${correct?'':` — 정답: ${esc(answer)}`}</div>${q.explanation?`<p class="note">${esc(q.explanation)}</p>`:''}`:''}</div>`;
      }).join('');
      const total=indices().length;
      root.querySelector('#wCount').textContent=state.graded?`${total}문항 중 ${total-wrong().length}개 정답`:'답안 자동 저장';
      root.querySelector('#wRetry').hidden=!state.graded || !wrong().length;
      for(const id of ['#wCheck','#wCheckBottom']) root.querySelector(id).disabled=!!state.graded;
    };
    const open = i => {
      index=i;
      state=Store._get(key(),{answers:{},graded:false});
      draw();
    };
    root.querySelector('#wGroups').onclick=e=>{
      const b=e.target.closest('[data-wgroup]'); if(b) open(Number(b.dataset.wgroup));
    };
    root.querySelector('#wQuestions').oninput=e=>{
      if(!e.target.matches('[data-wanswer]')) return;
      state.answers[e.target.dataset.wanswer]=e.target.value;
      save();
    };
    const grade=()=>{state.graded=true;save();draw();};
    root.querySelector('#wCheck').onclick=grade;
    root.querySelector('#wCheckBottom').onclick=()=>{grade();root.querySelector('#wCount').scrollIntoView({block:'center'});};
    root.querySelector('#wRetry').onclick=()=>{
      state.only=wrong();
      for(const i of state.only) delete state.answers[i];
      state.graded=false;save();draw();
    };
    root.querySelector('#wReset').onclick=()=>{state={answers:{},graded:false};save();draw();};
    open(0);
  }
};
