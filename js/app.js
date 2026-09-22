/* 부팅·탭·저장. 과 추가는 data/lessonNN.js 만들고 index.html에 script 한 줄이면 끝. */

const LESSONS = [];
function registerLesson(l){ LESSONS.push(l); }   // data/lessonNN.js가 호출

/* data/examNN.js가 호출. 과 데이터와 따로 둬서 기출만 갱신할 수 있게 함 */
function registerExam(lessonId, items){
  const l = LESSONS.find(x => x.id === lessonId);
  if (l) l.exam = (l.exam || []).concat(items);
  else EXAM_PENDING.push([lessonId, items]);     // 과 파일보다 먼저 로드된 경우
}
const EXAM_PENDING = [];

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
  ["recall", "본문 암기"],
  ["exam",   "기출문제"],
  ["gram",   "문법·표현"]
];

const App = {
  lesson: null,
  tab: TABS[0][0],
  keys: null,

  start(){
    if (!LESSONS.length) return;
    LESSONS.sort((a, b) => a.id - b.id);
    EXAM_PENDING.forEach(([id, items]) => registerExam(id, items));
    EXAM_PENDING.length = 0;

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
    /* 탭이 8개라 좁은 화면에선 선택된 탭이 밖으로 밀림.
       scrollIntoView는 가로축을 안 움직이고, offsetLeft는 header 기준이라 못 씀.
       화면 좌표 차이로 계산해서 직접 스크롤. */
    this.scrollTabIntoView = () => {
      const b = nav.querySelector('[aria-selected="true"]');
      if (!b || nav.scrollWidth <= nav.clientWidth) return;
      const nb = nav.getBoundingClientRect(), bb = b.getBoundingClientRect();
      nav.scrollLeft += (bb.left - nb.left) - (nb.width - bb.width) / 2;
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
    if (this.scrollTabIntoView) this.scrollTabIntoView();
  }
};

document.addEventListener("DOMContentLoaded", () => App.start());
