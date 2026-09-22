/* 음성 계층. 화면 코드는 TTS.play()/TTS.sequence()만 씀.
   1순위: audio/<슬러그>.mp3 (Kokoro-82M, af_heart, speed 0.9로 사전 생성)
   2순위: 브라우저 내장 음성 (파일 없는 문장 대비)
   슬러그 규칙은 scripts/gen_audio.py와 반드시 동일하게 유지할 것. */
const TTS = (() => {
  const DIR = "audio/";
  const cache = new Map();   // slug -> HTMLAudioElement
  const missing = new Set(); // 파일 없다고 확인된 슬러그
  let current = null;        // 재생 중인 audio
  let stopped = false;
  let release = null;        // 재생 중인 play()의 resolve. stop()이 대기를 풀어 줌

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

  /* 재생 중단. 대기 중인 play()도 즉시 풀어 줘서 sequence가 멈추지 않게 함. */
  function stop(){
    stopped = true;
    if (current){ current.pause(); current.currentTime = 0; current = null; }
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (release){ const r = release; release = null; r(); }
  }

  /* 한 문장 재생. rate 1 = 원속도, 0.7 = 느리게. 끝나거나 중단되면 resolve. */
  function play(text, rate = 1){
    stop();
    stopped = false;
    const a = el(text);
    if (!a) return new Promise(res => { release = res; speakFallback(text, rate).then(() => { release = null; res(); }); });
    return new Promise(resolve => {
      release = resolve;
      const done = () => { a.removeEventListener("ended", done); if (release === resolve) release = null; resolve(); };
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

  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* 문장 여러 개를 순서대로. onStep(index)로 현재 위치 알림.
     opts: { rate, repeat(문장당 반복 횟수), gap(문장 사이 쉬는 ms, 따라 읽을 시간) } */
  async function sequence(texts, opts = {}){
    const { rate = 1, repeat = 1, gap = 0, onStep = () => {} } = opts;
    stopped = false;
    for (let i = 0; i < texts.length; i++){
      for (let r = 0; r < repeat; r++){
        if (stopped) return;
        onStep(i, r);
        await play(texts[i], rate);
        if (stopped) return;
        if (gap) await wait(gap);
      }
    }
    onStep(-1, 0);
  }

  return { play, sequence, stop, slug, get stopped(){ return stopped; } };
})();
