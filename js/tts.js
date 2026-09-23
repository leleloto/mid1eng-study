/* 음성 계층. 화면 코드는 TTS.play()/TTS.sequence()만 씀.
   1순위: audio/<슬러그>.mp3 (Kokoro-82M, af_heart, speed 0.9로 사전 생성)
   2순위: 브라우저 내장 음성 (파일 없는 문장 대비)
   슬러그 규칙은 scripts/gen_audio.py와 반드시 동일하게 유지할 것.

   재생 취소는 '세대(gen)' 번호로 한다. 새 재생 요청이 오면 gen이 올라가고,
   진행 중이던 연속 재생은 다음 단계에서 그걸 보고 스스로 물러난다.
   (불리언 플래그 하나를 돌려쓰면, play()가 끄고 바로 켜는 사이에
    이전 연속 재생이 취소 신호를 놓쳐 둘이 서로 끊으며 문장이 튄다.) */
const TTS = (() => {
  const DIR = "audio/";
  const cache = new Map();   // slug -> HTMLAudioElement
  const missing = new Set(); // 파일 없다고 확인된 슬러그
  let current = null;        // 재생 중인 audio
  let release = null;        // 대기 중인 playOne()의 resolve
  let gen = 0;               // 재생 세대

  const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 80);

  function el(text){
    const s = slug(text);
    if (missing.has(s)) return null;
    if (!cache.has(s)){
      const a = new Audio(DIR + s + ".mp3");
      a.preload = "none";
      a.addEventListener("error", () => missing.add(s), { once: true });
      cache.set(s, a);
    }
    return cache.get(s);
  }

  function speakFallback(text, rate){
    return new Promise(resolve => {
      if (!window.speechSynthesis) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = rate;
      u.onend = u.onerror = () => resolve();
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    });
  }

  /* 소리만 끊는다. 세대는 건드리지 않음 — 연속 재생이 다음 문장으로 넘어갈 때 씀 */
  function halt(){
    if (current){ current.pause(); current.currentTime = 0; current = null; }
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (release){ const r = release; release = null; r(); }
  }

  /* 내부용 한 문장 재생. 세대를 올리지 않으므로 연속 재생이 스스로를 취소하지 않음 */
  function playOne(text, rate){
    halt();
    const a = el(text);
    if (!a) return new Promise(res => {
      release = res;
      speakFallback(text, rate).then(() => { if (release === res) release = null; res(); });
    });
    return new Promise(resolve => {
      release = resolve;
      const done = () => {
        a.removeEventListener("ended", done);
        if (release === resolve) release = null;
        resolve();
      };
      a.playbackRate = rate;
      a.currentTime = 0;
      current = a;
      a.addEventListener("ended", done);
      a.play().catch(() => {           // 파일 없음/차단 → 브라우저 음성으로
        missing.add(slug(text));
        a.removeEventListener("ended", done);
        speakFallback(text, rate).then(done);
      });
    });
  }

  /* 진행 중인 재생을 모두 취소하고 이 문장만 재생 */
  function play(text, rate = 1){
    gen++;
    return playOne(text, rate);
  }

  function stop(){ gen++; halt(); }

  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* 문장 여러 개를 순서대로. onStep(index)로 현재 위치 알림.
     opts: { rate, repeat(문장당 반복 횟수), gap(문장 사이 쉬는 ms, 따라 읽을 시간) } */
  async function sequence(texts, opts = {}){
    const { rate = 1, repeat = 1, gap = 0, onStep = () => {} } = opts;
    const mine = ++gen;                       // 이 연속 재생의 세대
    const alive = () => mine === gen;         // 더 새 요청이 오면 false
    for (let i = 0; i < texts.length; i++){
      for (let r = 0; r < repeat; r++){
        if (!alive()) return;
        onStep(i, r);
        await playOne(texts[i], rate);
        if (!alive()) return;
        if (gap) await wait(gap);
        if (!alive()) return;
      }
    }
    onStep(-1, 0);
  }

  return { play, sequence, stop, slug };
})();
