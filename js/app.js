/* 부팅·탭·저장. 과 추가는 data/lessonNN.js 만들고 index.html에 script 한 줄이면 끝. */

const LESSONS = [];
function registerLesson(l){ LESSONS.push(l); }   // data/*.js가 호출

/* 진도 저장 (이 브라우저에만). 실패해도 화면은 그대로 동작. */
const Store = {
  _get(k, d){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  _set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 사생활 보호 모드 등 */ } },
  known(id){ return new Set(this._get("known" + id, [])); },
  setKnown(id, set){ this._set("known" + id, [...set]); },
  best(id){ return this._get("best" + id, 0); },
  setBest(id, n){ this._set("best" + id, n); }
};

const TABS = [
  ["voca",   "단어장"],
  ["flash",  "플래시카드"],
  ["quiz",   "단어퀴즈"],
  ["shadow", "본문 쉐도잉"],
  ["dialog", "대화문"],
  ["blank",  "본문 빈칸"],
  ["gram",   "문법·표현"]
];

const App = {
  lesson: null,
  tab: TABS[0][0],
  keys: null,

  start(){
    if (!LESSONS.length) return;
    LESSONS.sort((a, b) => a.id - b.id);

    const seg = document.querySelector("#lessonSeg");
    seg.innerHTML = LESSONS.map((l, i) =>
      `<button data-id="${l.id}" aria-pressed="${i === 0}">${l.label}</button>`).join("");
    seg.onclick = e => {
      const b = e.target.closest("button"); if (!b) return;
      [...seg.children].forEach(x => x.setAttribute("aria-pressed", x === b));
      this.open(LESSONS.find(l => l.id === +b.dataset.id));
    };

    const nav = document.querySelector("#tabs");
    nav.innerHTML = TABS.map(([k, label], i) =>
      `<button data-t="${k}" aria-selected="${i === 0}">${label}</button>`).join("");
    document.querySelector("#panes").innerHTML = TABS.map(([k], i) =>
      `<section id="s-${k}" class="${i === 0 ? "on" : ""}"></section>`).join("");
    nav.onclick = e => {
      const b = e.target.closest("button"); if (!b) return;
      [...nav.children].forEach(x => x.setAttribute("aria-selected", x === b));
      this.show(b.dataset.t);
    };

    /* ▶ 버튼은 어디에 있든 한 곳에서 처리 */
    document.addEventListener("click", e => {
      const b = e.target.closest("[data-say]"); if (!b) return;
      document.querySelectorAll(".spk.playing").forEach(x => x.classList.remove("playing"));
      b.classList.add("playing");
      TTS.play(b.dataset.say).then(() => b.classList.remove("playing"));
    });

    document.addEventListener("keydown", e => {
      if (e.target.matches("input, textarea")) return;
      if (this.keys) this.keys(e);
    });

    this.open(LESSONS[0]);
  },

  open(lesson){
    TTS.stop();
    this.lesson = lesson;
    document.querySelector("#subtitle").textContent =
      `${lesson.label} ${lesson.title} · ${lesson.reading} · 단어 ${lesson.voca.length}개`;
    this.mounted = new Set();
    this.show(this.tab);
  },

  /* 탭은 처음 열 때 한 번만 그림 */
  show(tab){
    this.tab = tab;
    TTS.stop();
    document.querySelectorAll("#panes section").forEach(s => s.classList.toggle("on", s.id === "s-" + tab));
    const el = document.querySelector("#s-" + tab);
    if (!this.mounted.has(tab)){
      VIEWS[tab].mount(el, this.lesson);
      this.mounted.add(tab);
    }
    this.keys = VIEWS[tab].keys || null;
  }
};

document.addEventListener("DOMContentLoaded", () => App.start());
