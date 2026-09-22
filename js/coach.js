/* 코치마크 — 처음 온 사람한테 "여기 눌러보세요" 하고 띄우는 말풍선.
   한 번 보면 그 키는 다시 안 뜸(localStorage). Coach.reset()으로 전부 다시 보이게 할 수 있음. */
const Coach = (() => {
  const KEY = k => "coach_" + k;
  let bubble = null;

  const hide = () => { if (bubble){ bubble.remove(); bubble = null; } };

  /* anchor 아래에 말풍선을 붙임. key는 '본 적 있음'을 기억하는 이름. */
  function show(anchor, key, text){
    if (!anchor) return;
    try { if (localStorage.getItem(KEY(key))) return; } catch { return; }
    hide();

    bubble = document.createElement("div");
    bubble.className = "coach";
    bubble.innerHTML = `<span>${text}</span><button aria-label="닫기">✕</button>`;
    document.body.appendChild(bubble);

    const place = () => {
      if (!bubble) return;
      const r = anchor.getBoundingClientRect();
      bubble.style.top = (r.bottom + scrollY + 10) + "px";
      bubble.style.left = Math.max(12, r.left + scrollX) + "px";
    };
    place();
    addEventListener("resize", place);
    addEventListener("scroll", place, { passive: true });

    const done = () => {
      try { localStorage.setItem(KEY(key), "1"); } catch {}
      removeEventListener("resize", place);
      removeEventListener("scroll", place);
      hide();
    };
    bubble.querySelector("button").onclick = done;
    anchor.addEventListener("click", done, { once: true });   // 눌러 보면 역할 끝
  }

  function reset(){
    try {
      Object.keys(localStorage).filter(k => k.startsWith("coach_")).forEach(k => localStorage.removeItem(k));
    } catch {}
  }

  return { show, hide, reset };
})();
