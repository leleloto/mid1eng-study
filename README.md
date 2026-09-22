# 중1 동아(윤정미) 시험대비 학습사이트

## 실행

`실행.bat` 더블클릭 → 브라우저 자동으로 열림 (http://localhost:8765).

`index.html`을 바로 더블클릭해도 대부분 동작하지만, 브라우저에 따라 음성 파일이 막힐 수 있음. `실행.bat` 권장.

## 폴더

```
index.html        껍데기. 스크립트 로드만 함
css/style.css     색·간격 토큰이 :root에 모여 있음. 다크모드 자동
js/tts.js         음성 계층. 화면 코드는 TTS.play()/sequence()만 씀
js/views.js       탭별 화면. 탭 하나 = VIEWS 객체 하나
js/app.js         부팅·탭 전환·진도 저장
data/lesson05.js  과 하나 = 파일 하나
data/lesson06.js
audio/            문장·단어 mp3 (Kokoro-82M, af_heart, speed 0.9)
scripts/          음성 재생성용
```

## 과 추가하기

1. `data/lesson05.js`를 복사해 `data/lesson07.js`로 만들고 내용 교체
2. `index.html` 맨 아래에 `<script src="data/lesson07.js"></script>` 한 줄 추가
3. 음성 만들기 — 아래 참고

끝. `app.js`·`views.js`는 건드릴 일 없음.

### 데이터 스키마

```js
registerLesson({
  id: 7,                    // 정렬 기준
  label: "7과",             // 상단 버튼에 뜨는 이름
  title: "단원 제목",
  reading: "본문 제목",

  voca: [ ["english", "(품사) 뜻"], ... ],

  // 본문. { head: "소제목" }은 구분선, 배열은 문장
  // 세 번째 요소 = 빈칸/강조할 표현들 (없으면 생략)
  passage: [
    { head: "Challenge 01 — Olivia" },
    ["English sentence.", "한국어 해석", ["key", "words"]],
  ],

  extra: { head, cols, rows, note },   // 표 또는 추가 지문. 없으면 생략 가능
  dialogs: [ { no: 1, lines: [ ["W", "English", "해석"] ] } ],
  grammar:   [ { h: "제목", d: "설명 HTML", ex: ["예문"] } ],
  functions: [ { h: "제목", d: "설명 HTML", ex: ["예문"] } ],
  rewrites:  [ ["원문", ["= 같은 뜻 문장", ...]] ]
});
```

## 탭 추가하기

`js/views.js`에 `VIEWS.이름 = { mount(root, lesson) { ... } }` 추가하고,
`js/app.js`의 `TABS` 배열에 `["이름", "표시될 이름"]` 한 줄 추가.
`<section>`은 app.js가 알아서 만듦.

## 음성 재생성

문장을 고치거나 과를 추가했으면 음성도 다시 만들어야 함.

1. `scripts/lines.txt`에 영어 문장/단어를 한 줄에 하나씩 추가
2. 실행:

```
"C:\Users\YEEUN\Desktop\영어 유형 연습\.deps\kokoro\.venv\Scripts\python.exe" scripts\gen_audio.py scripts\lines.txt audio
```

이미 있는 mp3는 건너뜀. 파일명은 문장을 슬러그로 바꾼 것이고,
그 규칙은 `scripts/gen_audio.py`의 `slug()`와 `js/tts.js`의 `slug()`가 **똑같아야 함**.
둘 중 하나만 바꾸면 음성이 안 나오고 브라우저 기본 음성으로 넘어감.

## 진도 저장

localStorage. 이 브라우저에서만 유지되고 다른 기기와 공유되지 않음.
여러 기기에서 진도를 이어가려면 서버·로그인이 필요함 — 지금 구조엔 없음.
