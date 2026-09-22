/* 탭 하나 = 여기 객체 하나. mount(el, lesson)만 구현하면 app.js가 알아서 붙임.
   탭 추가 = VIEWS에 항목 추가 + index.html에 <section id="s-키"> 한 줄. */
const VIEWS = {};

const h = (tag, attrs = {}, html = "") => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v; else e.setAttribute(k, v);
  }
  if (html) e.innerHTML = html;
  return e;
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const spk = text => `<button class="spk" data-say="${esc(text)}" title="듣기">▶</button>`;
const shuffle = a => a.slice().sort(() => Math.random() - .5);

/* 본문/대화 데이터에서 { head } 구분자를 걸러 문장만 */
const sentsOf = list => list.filter(x => Array.isArray(x));

/* ────────── 단어장 ────────── */
VIEWS.voca = {
  mount(root, L){
    root.innerHTML = `
      <div class="bar">
        <input type="search" id="vq" placeholder="단어 검색 (영어/뜻)">
        <button class="btn" id="vKo" aria-pressed="false">뜻 가리기</button>
        <button class="btn" id="vReset">체크 초기화</button>
      </div>
      <div class="card"><table><tbody id="vBody"></tbody></table></div>
      <p class="note">체크한 단어는 자동 저장됨. 뜻을 가린 상태에서 뜻 칸을 누르면 하나씩 확인 가능.</p>`;

    const body = root.querySelector("#vBody");
    const draw = () => {
      const kn = Store.known(L.id), f = root.querySelector("#vq").value.trim().toLowerCase();
      body.innerHTML = L.voca.map(([en, ko], i) =>
        (f && !en.toLowerCase().includes(f) && !ko.includes(f)) ? "" :
        `<tr class="${kn.has(en) ? "known" : ""}" data-en="${esc(en)}">
           <td class="n">${String(i + 1).padStart(3, "0")}</td>
           <td class="en"><button class="word" data-say="${esc(en)}">${esc(en)}</button></td>
           <td class="ko"><span>${esc(ko)}</span></td>
           <td class="act"><input type="checkbox" ${kn.has(en) ? "checked" : ""}></td>
         </tr>`).join("");
      Coach.show(body.querySelector(".word"), "voca", "단어를 누르면 발음이 나와요");
    };
    root.querySelector("#vq").oninput = draw;
    root.querySelector("#vKo").onclick = e => {
      const on = e.target.getAttribute("aria-pressed") !== "true";
      e.target.setAttribute("aria-pressed", on);
      e.target.textContent = on ? "뜻 보이기" : "뜻 가리기";
      body.closest("table").classList.toggle("hide-ko", on);
    };
    root.querySelector("#vReset").onclick = () => { Store.setKnown(L.id, new Set()); draw(); };
    body.onclick = e => {
      const tr = e.target.closest("tr"); if (!tr) return;
      if (e.target.matches("input[type=checkbox]")){
        const s = Store.known(L.id);
        e.target.checked ? s.add(tr.dataset.en) : s.delete(tr.dataset.en);
        Store.setKnown(L.id, s);
        tr.classList.toggle("known", e.target.checked);
      } else if (e.target.matches(".ko span")){
        e.target.classList.toggle("show");
      }
    };
    draw();
  }
};

/* ────────── 플래시카드 ────────── */
VIEWS.flash = {
  mount(root, L){
    root.innerHTML = `
      <div class="bar">
        <button class="btn" id="fDir">영어 → 뜻</button>
        <button class="btn" id="fShuf">섞기</button>
        <button class="btn" id="fSay">🔊 발음</button>
        <span class="count" id="fCnt"></span>
      </div>
      <div class="flash" id="fCard">
        <div class="q" id="fQ"></div>
        <div class="a" id="fA"></div>
        <div class="hint">카드를 누르면 뒤집힘 · <kbd>←</kbd> <kbd>→</kbd> 이동 · <kbd>space</kbd> 뒤집기</div>
      </div>
      <div class="fbar"><button class="btn" id="fPrev">← 이전</button><button class="btn pri" id="fNext">다음 →</button></div>`;

    let order = L.voca.map((_, i) => i), i = 0, flip = false, enFirst = true;
    const draw = () => {
      const [en, ko] = L.voca[order[i]];
      root.querySelector("#fQ").textContent = enFirst ? en : ko;
      root.querySelector("#fA").textContent = flip ? (enFirst ? ko : en) : "";
      root.querySelector("#fCnt").textContent = `${i + 1} / ${order.length}`;
    };
    const move = d => { i = (i + d + order.length) % order.length; flip = false; draw(); };

    root.querySelector("#fCard").onclick = () => { flip = !flip; draw(); };
    root.querySelector("#fNext").onclick = () => move(1);
    root.querySelector("#fPrev").onclick = () => move(-1);
    root.querySelector("#fShuf").onclick = () => { order = shuffle(order); i = 0; flip = false; draw(); };
    root.querySelector("#fSay").onclick = () => TTS.play(L.voca[order[i]][0]);
    root.querySelector("#fDir").onclick = e => {
      enFirst = !enFirst; e.target.textContent = enFirst ? "영어 → 뜻" : "뜻 → 영어"; flip = false; draw();
    };
    this.keys = e => {
      if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === " "){ e.preventDefault(); flip = !flip; draw(); }
    };
    draw();
  }
};

/* ────────── 단어 퀴즈 ────────── */
VIEWS.quiz = {
  mount(root, L){
    root.innerHTML = `
      <div class="bar">
        <button class="btn pri" id="qGo">20문제 시작</button>
        <button class="btn" id="qDir">영어 → 뜻</button>
        <span class="count" id="qBest"></span>
      </div>
      <div class="prog"><i id="qBar" style="width:0"></i></div>
      <div class="card" id="qCard"><p class="note">시작을 누르면 4지선다 문제가 나옴. 틀린 문제는 끝나고 모아서 보여줌.</p></div>`;

    let list = [], qi = 0, score = 0, wrong = [], enFirst = true;
    const best = () => root.querySelector("#qBest").textContent = "최고 기록 " + Store.best(L.id) + "점";

    const draw = () => {
      if (qi >= list.length) return end();
      const v = list[qi];
      const [q, a] = enFirst ? v : [v[1], v[0]];
      const opts = shuffle([a, ...shuffle(L.voca.filter(x => x[0] !== v[0])).slice(0, 3).map(x => enFirst ? x[1] : x[0])]);
      root.querySelector("#qBar").style.width = (qi / list.length * 100) + "%";
      root.querySelector("#qCard").innerHTML =
        `<div class="qhead"><span class="qn">${qi + 1} / ${list.length}</span><span class="qt">${esc(q)}</span></div>` +
        opts.map(o => `<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("");
      if (enFirst) TTS.play(v[0]);
      root.querySelectorAll(".opt").forEach(b => b.onclick = () => {
        const ok = b.dataset.o === a;
        ok ? score++ : wrong.push([q, a]);
        root.querySelectorAll(".opt").forEach(x => {
          x.disabled = true;
          if (x.dataset.o === a) x.classList.add("right");
          else if (x === b) x.classList.add("wrong");
        });
        setTimeout(() => { qi++; draw(); }, ok ? 320 : 950);
      });
    };
    const end = () => {
      root.querySelector("#qBar").style.width = "100%";
      Store.setBest(L.id, Math.max(Store.best(L.id), score)); best();
      root.querySelector("#qCard").innerHTML =
        `<h2>${list.length}문제 중 <span style="color:var(--accent)">${score}개</span> 정답</h2>` +
        (wrong.length
          ? `<h3>틀린 문제</h3><table><tbody>${wrong.map(([q, a]) =>
              `<tr><td class="en">${esc(q)}</td><td class="ko">${esc(a)}</td><td class="act">${spk(q)}</td></tr>`).join("")}</tbody></table>`
          : `<p class="note">전부 정답.</p>`);
    };

    root.querySelector("#qGo").onclick = () => {
      list = shuffle(L.voca).slice(0, Math.min(20, L.voca.length));
      qi = 0; score = 0; wrong = []; draw();
    };
    root.querySelector("#qDir").onclick = e => {
      enFirst = !enFirst; e.target.textContent = enFirst ? "영어 → 뜻" : "뜻 → 영어";
    };
    best();
  }
};

/* ────────── 본문 쉐도잉 ────────── */
VIEWS.shadow = {
  mount(root, L){
    const sents = sentsOf(L.passage);
    root.innerHTML = `
      <div class="bar">
        <button class="btn pri" id="sPlay">▶ 전체 따라 읽기</button>
        <button class="btn" id="sStop">■ 정지</button>
        <button class="btn" id="sRate" aria-pressed="false">느리게 0.7x</button>
        <button class="btn" id="sGap" aria-pressed="true">따라 읽을 틈 주기</button>
        <button class="btn" id="sKo" aria-pressed="false">해석 가리기</button>
      </div>
      <div class="card">
        <h2>${esc(L.reading)}</h2>
        <p class="note" style="margin-bottom:10px">문장을 누르면 <b>거기서부터 끝까지</b> 이어서 재생됨. 문단만 듣고 싶으면 소제목 옆 <b>▶ 이 문단</b>, 한 문장만 듣고 싶으면 오른쪽 <b>▶</b>. 재생 사이에 쉬는 동안 따라 읽으면 됨.</p>
        <div id="sList"></div>
      </div>
      ${L.extra ? `<div class="card"><h2>${esc(L.extra.head)}</h2>${this.extraHTML(L.extra)}</div>` : ""}`;

    /* 문단 = { head } 구분자로 끊긴 묶음. 문단 재생·문장부터 이어 재생에 씀 */
    const groups = [];
    let idx = 0;
    const html = L.passage.map(item => {
      if (!Array.isArray(item)){
        groups.push({ head: item.head, from: idx });
        const g = groups.length - 1;
        return `<div class="subhead grp">
                  <span>${esc(item.head || "본문")}</span>
                  <button class="btn sm" data-grp="${g}">▶ 이 문단</button>
                </div>`;
      }
      const [en, ko, keys = []] = item;
      const i = idx++;
      if (groups.length) groups[groups.length - 1].to = idx;
      let marked = esc(en);
      keys.forEach(k => { marked = marked.replace(esc(k), `<b>${esc(k)}</b>`); });
      return `<div class="ln" data-i="${i}" data-en="${esc(en)}">
                <span class="no">${String(i + 1).padStart(2, "0")}</span>
                <div class="body"><div class="en">${marked}</div><div class="ko">${esc(ko)}</div></div>
                <button class="spk" data-say="${esc(en)}" title="이 문장만">▶</button>
              </div>`;
    }).join("");
    const list = root.querySelector("#sList");
    list.innerHTML = html;

    const rows = [...list.querySelectorAll(".ln")];
    const mark = i => rows.forEach(r => r.classList.toggle("cur", +r.dataset.i === i));
    const rate = () => root.querySelector("#sRate").getAttribute("aria-pressed") === "true" ? 0.7 : 1;
    const gap = () => root.querySelector("#sGap").getAttribute("aria-pressed") === "true";

    /* from번째 문장부터 to번째 전까지 이어서 재생 */
    const run = (from = 0, to = sents.length) =>
      TTS.sequence(sents.slice(from, to).map(s => s[0]), {
        rate: rate(),
        gap: gap() ? 1200 : 200,
        onStep: i => mark(i < 0 ? -1 : from + i)
      });

    list.onclick = e => {
      const g = e.target.closest("[data-grp]");
      if (g){ const { from, to } = groups[+g.dataset.grp]; return run(from, to); }
      if (e.target.closest(".spk")) return;          // ▶는 그 문장만 (전역 핸들러)
      const ln = e.target.closest(".ln");
      if (ln) run(+ln.dataset.i);                    // 문장 누르면 거기서부터 끝까지
    };
    root.querySelector("#sPlay").onclick = () => run();
    root.querySelector("#sStop").onclick = () => { TTS.stop(); mark(-1); };
    Coach.show(rows[0], "shadow", "문장을 누르면 거기서부터 이어서 읽어 줘요");
    root.querySelector("#sKo").onclick = e => {
      const on = e.target.getAttribute("aria-pressed") !== "true";
      e.target.setAttribute("aria-pressed", on);
      e.target.textContent = on ? "해석 보이기" : "해석 가리기";
      list.classList.toggle("hide-trans", on);
    };
    ["#sRate", "#sGap"].forEach(sel => root.querySelector(sel).onclick = e => {
      e.target.setAttribute("aria-pressed", e.target.getAttribute("aria-pressed") !== "true");
    });
  },
  extraHTML(x){
    if (!x.rows) return `<p style="font-size:14px;margin:0">${x.note}</p>`;
    return `<table class="tbl"><thead><tr>${x.cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead>
            <tbody>${x.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>
            <details style="margin-top:10px"><summary class="note" style="cursor:pointer">정답 보기</summary>
            <p class="ex" style="margin-top:8px">${x.note}</p></details>`;
  }
};

/* ────────── 대화문 ────────── */
VIEWS.dialog = {
  mount(root, L){
    root.innerHTML = `
      <div class="bar">
        <button class="btn" id="dStop">■ 정지</button>
        <button class="btn" id="dKo" aria-pressed="false">해석 가리기</button>
      </div>` +
      L.dialogs.map(d => `
        <div class="card">
          <div class="bar" style="margin-bottom:6px">
            <h2 style="margin:0">Dialog ${d.no}</h2>
            <button class="btn sm" data-play="${d.no}">▶ 이어서 재생</button>
          </div>
          <div class="dl" data-no="${d.no}">
            ${d.lines.map(([who, en, ko]) => `
              <div class="ln" data-en="${esc(en)}">
                <div class="body">
                  <div class="en"><span class="who">${esc(who)}:</span>${esc(en)}</div>
                  <div class="ko">${esc(ko)}</div>
                </div>
                <button class="spk" data-say="${esc(en)}">▶</button>
              </div>`).join("")}
          </div>
        </div>`).join("");

    root.onclick = e => {
      const p = e.target.closest("[data-play]");
      if (p){
        const box = root.querySelector(`.dl[data-no="${p.dataset.play}"]`);
        const rows = [...box.querySelectorAll(".ln")];
        TTS.sequence(rows.map(r => r.dataset.en), {
          gap: 700,
          onStep: i => rows.forEach((r, j) => r.classList.toggle("cur", i === j))
        });
      }
    };
    root.querySelector("#dStop").onclick = () => {
      TTS.stop();
      root.querySelectorAll(".ln").forEach(r => r.classList.remove("cur"));
    };
    root.querySelector("#dKo").onclick = e => {
      const on = e.target.getAttribute("aria-pressed") !== "true";
      e.target.setAttribute("aria-pressed", on);
      e.target.textContent = on ? "해석 보이기" : "해석 가리기";
      root.querySelectorAll(".dl").forEach(d => d.classList.toggle("hide-trans", on));
    };
  }
};

/* ────────── 본문 빈칸 ────────── */
VIEWS.blank = {
  mount(root, L){
    const sents = sentsOf(L.passage).filter(s => (s[2] || []).length);
    root.innerHTML = `
      <div class="bar">
        <button class="btn pri" id="bCheck">정답 확인</button>
        <button class="btn" id="bClear">다시 풀기</button>
        <span class="count" id="bCnt"></span>
      </div>
      <div class="card">
        <h2>${esc(L.reading)} · 빈칸 채우기</h2>
        <p class="note" style="margin-bottom:10px">시험에 자주 나오는 전치사·접속사·동사 자리를 비워 둠. ▶로 문장을 듣고 채워도 됨.</p>
        <div id="bList">${sents.map(([en, ko, keys], i) => {
          let body = esc(en);
          keys.forEach(k => {
            body = body.replace(esc(k), `<input class="blank" data-a="${esc(k)}" size="${Math.max(5, k.length)}">`);
          });
          return `<div class="ln">
                    <span class="no">${String(i + 1).padStart(2, "0")}</span>
                    <div class="body"><div class="en">${body}</div><div class="ko">${esc(ko)}</div></div>
                    <button class="spk" data-say="${esc(en)}">▶</button>
                  </div>`;
        }).join("")}</div>
      </div>`;

    const inputs = () => [...root.querySelectorAll(".blank")];
    /* 채점하면 틀린 칸에 정답이 들어가므로, 다시 풀기 전에는 재채점을 막음
       (안 막으면 두 번째 채점이 무조건 100%로 나옴) */
    root.querySelector("#bCheck").onclick = e => {
      let ok = 0;
      inputs().forEach(i => {
        const good = i.value.trim().toLowerCase() === i.dataset.a.toLowerCase();
        i.classList.toggle("ok", good); i.classList.toggle("no", !good);
        if (good) ok++; else i.value = i.dataset.a;
        i.readOnly = true;
      });
      e.target.disabled = true;
      root.querySelector("#bCnt").textContent = `${inputs().length}개 중 ${ok}개 정답`;
    };
    root.querySelector("#bClear").onclick = () => {
      inputs().forEach(i => { i.value = ""; i.readOnly = false; i.classList.remove("ok", "no"); });
      root.querySelector("#bCheck").disabled = false;
      root.querySelector("#bCnt").textContent = "";
    };
  }
};

/* ────────── 본문 암기 (한→영 인출) ──────────
   읽고 알아보는 것과 직접 써내는 것은 다름. 서술형은 후자를 물어봄. */
VIEWS.recall = {
  mount(root, L){
    const sents = sentsOf(L.passage);

    root.innerHTML = `
      <div class="bar">
        <button class="btn pri" id="rGo">처음부터</button>
        <button class="btn" id="rWrong">틀린 것만 다시</button>
        <span class="count" id="rCnt"></span>
      </div>
      <div class="prog"><i id="rBar" style="width:0"></i></div>
      <div class="card" id="rCard"></div>`;

    let queue = [], at = 0, wrong = [], done = 0;

    const start = list => {
      queue = list.slice(); at = 0; wrong = []; done = 0; draw();
    };

    const draw = () => {
      if (at >= queue.length) return end();
      const [en, ko] = queue[at];
      root.querySelector("#rBar").style.width = (at / queue.length * 100) + "%";
      root.querySelector("#rCnt").textContent = `${at + 1} / ${queue.length}`;
      root.querySelector("#rCard").innerHTML = `
        <p class="ko-cue">${esc(ko)}</p>
        <textarea id="rIn" rows="2" placeholder="영어로 써 보세요"></textarea>
        <div class="bar" style="margin:10px 0 0">
          <button class="btn pri" id="rCheck">채점</button>
          <button class="btn" id="rHint">첫 글자 힌트</button>
          <button class="btn" id="rSay">🔊 듣기</button>
          <button class="btn" id="rSkip">모르겠음</button>
        </div>
        <div id="rOut"></div>`;

      const ta = root.querySelector("#rIn");
      ta.focus();
      ta.onkeydown = e => {
        if (e.key === "Enter" && !e.shiftKey){ e.preventDefault(); check(); }
      };
      root.querySelector("#rCheck").onclick = check;
      root.querySelector("#rSay").onclick = () => TTS.play(en);
      root.querySelector("#rHint").onclick = () =>
        root.querySelector("#rOut").innerHTML =
          `<div class="hintline">${en.split(/\s+/).map(w => esc(w[0]) + "_".repeat(Math.max(1, w.length - 1))).join(" ")}</div>`;
      root.querySelector("#rSkip").onclick = () => reveal(false, ta.value);
    };

    const check = () => {
      const mine = root.querySelector("#rIn").value;
      reveal(norm(mine) === norm(queue[at][0]), mine);
    };

    /* 채점 결과 + 단어 단위로 어디가 틀렸는지 */
    const reveal = (ok, mine) => {
      const [en] = queue[at];
      if (ok) done++; else wrong.push(queue[at]);
      root.querySelector("#rIn").disabled = true;
      root.querySelector("#rOut").innerHTML =
        `<div class="verdict ${ok ? "ok" : "no"}">${ok ? "정답" : "다시 보기"}</div>` +
        (ok ? "" : `<div class="diffline">${diff(mine, en)}</div>`) +
        `<div class="answerline">${esc(en)} ${spk(en)}</div>` +
        `<button class="btn pri" id="rNext" style="margin-top:10px">다음 →</button>`;
      const next = root.querySelector("#rNext");
      next.focus();
      next.onclick = () => { at++; draw(); };
      if (!ok) TTS.play(en);
    };

    const end = () => {
      root.querySelector("#rBar").style.width = "100%";
      root.querySelector("#rCnt").textContent = "";
      root.querySelector("#rCard").innerHTML =
        `<h2>${queue.length}문장 중 <span style="color:var(--accent)">${done}문장</span> 정답</h2>` +
        (wrong.length
          ? `<p class="note">틀린 ${wrong.length}문장은 "틀린 것만 다시"로 바로 다시 볼 수 있음.</p>
             <ul class="rw">${wrong.map(([en, ko]) =>
               `<li><b>${esc(en)}</b> ${spk(en)}<div class="eq">${esc(ko)}</div></li>`).join("")}</ul>`
          : `<p class="note">전부 정답. 본문은 외운 걸로 봐도 됨.</p>`);
      root.querySelector("#rWrong").disabled = !wrong.length;
      lastWrong = wrong;
    };

    let lastWrong = [];
    root.querySelector("#rGo").onclick = () => start(sents);
    root.querySelector("#rWrong").onclick = () => lastWrong.length && start(lastWrong);
    root.querySelector("#rWrong").disabled = true;
    root.querySelector("#rCard").innerHTML =
      `<p class="note">한국어를 보고 영어 문장을 직접 씁니다. 내신 서술형이 실제로 묻는 방식이라,
       읽어서 아는 것과 써낼 수 있는 것의 차이를 여기서 잡습니다. 대소문자·구두점은 안 따집니다.</p>`;
  }
};

/* 채점용 정규화 — 대소문자·구두점·중복 공백 무시 */
const norm = s => s.toLowerCase().replace(/[.,!?;:'"’‘“”]/g, "").replace(/\s+/g, " ").trim();

/* 최장 공통 부분수열로 내 답과 정답을 맞춰 보고, 틀린 자리만 표시 */
function diff(mine, right){
  const a = norm(mine).split(" ").filter(Boolean);
  const b = norm(right).split(" ").filter(Boolean);
  const m = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      m[i][j] = a[i] === b[j] ? m[i + 1][j + 1] + 1 : Math.max(m[i + 1][j], m[i][j + 1]);

  const out = [];
  let i = 0, j = 0;
  const words = mine.trim().split(/\s+/).filter(Boolean);   // 원문 표기 그대로 보여주려고
  while (i < a.length && j < b.length){
    if (a[i] === b[j]){ out.push(esc(words[i] ?? a[i])); i++; j++; }
    else if (m[i + 1][j] >= m[i][j + 1]){ out.push(`<s>${esc(words[i] ?? a[i])}</s>`); i++; }
    else { out.push(`<u>${esc(b[j])}</u>`); j++; }
  }
  while (i < a.length) out.push(`<s>${esc(words[i] ?? a[i])}</s>`), i++;
  while (j < b.length) out.push(`<u>${esc(b[j])}</u>`), j++;
  return out.join(" ") + `<div class="difflegend"><s>지울 것</s> · <u>빠뜨린 것</u></div>`;
}

/* ────────── 기출문제 ──────────
   섹션(영역별 유형 / 자주 틀리는 / 서술형 / 적중 N회 …)을 골라서 풂.
   정답이 없는 문항은 채점 대상에서 빼고 그렇다고 표시함. */
const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦"];

VIEWS.exam = {
  mount(root, L){
    const all = L.exam || [];
    if (!all.length){
      root.innerHTML = `<div class="card"><p class="note">이 과의 기출문제는 아직 안 들어왔음.</p></div>`;
      return;
    }

    /* 섹션은 등장 순서 유지 */
    const order = [], bySec = new Map();
    all.forEach(q => {
      if (!bySec.has(q.section)){ bySec.set(q.section, []); order.push(q.section); }
      bySec.get(q.section).push(q);
    });

    root.innerHTML = `
      <div class="bar" id="secBar">
        ${order.map((s, i) => {
          const items = bySec.get(s);
          const n = items.filter(q => q.answer).length;
          return `<button class="btn${i ? "" : " pri"}" data-sec="${esc(s)}">${esc(s)}
                   <span class="secn">${items.length}${n < items.length ? `·채점 ${n}` : ""}</span></button>`;
        }).join("")}
      </div>
      <div class="bar">
        <button class="btn pri" id="exCheck">채점</button>
        <button class="btn" id="exClear">다시 풀기</button>
        <span class="count" id="exCnt"></span>
      </div>
      <div id="exList"></div>`;

    const list = root.querySelector("#exList");

    const drawSection = sec => {
      const items = bySec.get(sec);
      list.innerHTML = items.map((q, i) => {
        const gradable = !!q.answer;
        const body = q.type === "choice" && q.choices.length
          ? `<div class="choices">${q.choices.map((c, j) =>
              `<label class="ch"><input type="radio" name="q${i}" value="${CIRCLED[j]}">
                 <span class="chn">${CIRCLED[j]}</span><span>${esc(c)}</span></label>`).join("")}</div>`
          : `<input type="text" class="exin" placeholder="답을 쓰세요">`;
        return `<div class="card exq" data-i="${i}" data-ans="${esc(q.answer || "")}" data-type="${q.type}">
          <div class="exhead">
            <span class="exno">${esc(q.no)}</span>
            <span class="exprompt">${esc(q.prompt)}</span>
            ${gradable ? "" : `<span class="nograde" title="해설 책자가 따로 있어 정답이 없음">정답 없음</span>`}
          </div>
          ${q.passage ? `<pre class="expass">${esc(q.passage)}</pre>` : ""}
          ${q.note ? `<p class="exnote">※ ${esc(q.note)}</p>` : ""}
          ${body}
          <div class="exout"></div>
        </div>`;
      }).join("");
      root.querySelector("#exCnt").textContent = "";
      root.querySelector("#exCheck").disabled = false;
    };

    root.querySelector("#secBar").onclick = e => {
      const b = e.target.closest("[data-sec]"); if (!b) return;
      root.querySelectorAll("#secBar .btn").forEach(x => x.classList.toggle("pri", x === b));
      drawSection(b.dataset.sec);
    };

    root.querySelector("#exCheck").onclick = e => {
      let ok = 0, total = 0;
      list.querySelectorAll(".exq").forEach(card => {
        const ans = card.dataset.ans;
        const out = card.querySelector(".exout");
        if (!ans){ out.innerHTML = `<div class="exres dim">정답 미제공 — 해설 책자 확인 필요</div>`; return; }
        total++;
        const picked = card.querySelector("input[type=radio]:checked")?.value
                    ?? card.querySelector(".exin")?.value ?? "";
        const good = norm(picked) === norm(ans);
        if (good) ok++;
        out.innerHTML = `<div class="exres ${good ? "ok" : "no"}">${good ? "정답" : `오답 — 정답: ${esc(ans)}`}</div>`;
        card.querySelectorAll("input").forEach(i => i.disabled = true);
      });
      e.target.disabled = true;
      root.querySelector("#exCnt").textContent = total ? `채점 ${total}문항 중 ${ok}개 정답` : "채점 가능한 문항 없음";
    };
    root.querySelector("#exClear").onclick = () =>
      drawSection(root.querySelector("#secBar .pri").dataset.sec);

    drawSection(order[0]);
  }
};

/* ────────── 문법 · 표현 ────────── */
VIEWS.gram = {
  mount(root, L){
    const block = g => `<h3>${esc(g.h)}</h3><p style="font-size:14px;margin:0 0 8px">${g.d}</p>` +
      g.ex.map(x => `<div class="ex">${x} ${spk(x.replace(/<[^>]+>/g, ""))}</div>`).join("");
    root.innerHTML = `
      <div class="card"><h2>${esc(L.title)} · 문법</h2>${L.grammar.map(block).join("")}</div>
      <div class="card"><h2>의사소통 기능</h2>${L.functions.map(block).join("")}</div>
      <div class="card"><h2>교과서 필수 문장 전환</h2>
        <ul class="rw">${L.rewrites.map(([from, tos]) =>
          `<li><b>${esc(from)}</b> ${spk(from)}${tos.map(t => `<div class="eq">= ${esc(t)}</div>`).join("")}</li>`).join("")}</ul>
      </div>`;
  }
};
