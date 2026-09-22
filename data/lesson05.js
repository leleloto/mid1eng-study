/* 5과 데이터. 새 과 추가 = 이 파일 복사해서 id/내용만 교체 후 index.html에 script 한 줄 추가. */
registerLesson({
  id: 5,
  label: "5과",
  title: "Think like Sherlock Holmes",
  reading: "Who Threw a Cake at the Monalisa?",

  voca: [
    ["throw", "(동) 던지다 (- threw)"],
    ["museum", "(명) 박물관, 미술관"],
    ["eyewitness", "(명) 목격자"],
    ["following", "(명) 다음(에 나오는 것)"],
    ["criminal", "(명) 범인, 범죄자"],
    ["visitor", "(명) 방문객"],
    ["painting", "(명) 그림"],
    ["turn around", "뒤돌아보다"],
    ["in front of", "~의 앞에"],
    ["wheelchair", "(명) 휠체어"],
    ["about", "(부) 약, ~ 정도"],
    ["janitor", "(명) 청소부, 관리인"],
    ["run away", "도망치다"],
    ["fall off", "떨어지다 (- fell)"],
    ["gray", "(형) 회색의 / (명) 회색"],
    ["wig", "(명) 가발"],
    ["run after", "~을 뒤쫓다"],
    ["catch", "(동) 잡다, 붙잡다 (- caught)"],
    ["in fact", "사실은"],
    ["young", "(형) 젊은, 어린"],
    ["guard", "(명) 경비원"],
    ["crime scene", "(명) 범죄 현장"],
    ["piece", "(명) 조각"],
    ["all over", "~의 곳곳에, ~ 전체에"],
    ["next to", "~ 옆에"],
    ["bakery", "(명) 빵집"],
    ["owner", "(명) 주인"],
    ["understand", "(동) 이해하다 (- understood)"],
    ["Spanish", "(명) 스페인어 / (형) 스페인의"],
    ["a lot of", "많은"],
    ["different", "(형) 다른, 여러 가지의"],
    ["sell", "(동) 팔다 (- sold)"],
    ["clearly", "(부) 분명히, 똑똑히"],
    ["remember", "(동) 기억하다"],
    ["information", "(명) 정보"],
    ["suspect", "(명) 용의자"],
    ["height", "(명) 키, 높이"],
    ["language", "(명) 언어"]
  ],

  /* 본문. head = 소제목(음성 없음), en/ko = 쉐도잉 문장 */
  passage: [
    { head: "도입" },
    ["Last Saturday, someone threw a cake at the Monalisa in the Botero Museum in Bogota, Colombia.",
     "지난 토요일, 누군가 콜롬비아 보고타의 보테로 박물관에 있는 '모나리자'에 케이크를 던졌다.", ["threw", "at"]],
    ["There were four eyewitnesses.", "네 명의 목격자가 있었다.", ["There were"]],
    ["What did they say?", "그들은 뭐라고 말했을까?"],
    ["Read the following, and find the criminal.", "다음을 읽고, 범인을 찾아보라.", ["following", "criminal"]],

    { head: "Ann Jones, a visitor — 방문객" },
    ["I was looking at the Monalisa, and someone threw a cake at the painting.",
     "저는 '모나리자'를 보고 있었는데, 누군가 그 그림을 향해 케이크를 던졌어요.", ["looking at", "threw"]],
    ["I turned around and saw an old man.", "저는 뒤로 돌았고 한 노인을 봤어요.", ["turned around"]],
    ["He was standing in front of a wheelchair.", "그는 휠체어 앞에 서 있었어요.", ["in front of"]],
    ["I'm about 170 cm tall, and he was a little taller than me.",
     "저는 키가 170cm 정도인데, 그는 저보다 조금 더 컸어요.", ["about", "taller than"]],

    { head: "Carlos Diaz, a janitor — 청소부" },
    ["An old man with gray hair was running away, and something fell off his head.",
     "회색 머리의 한 노인이 도망가고 있었는데, 그의 머리에서 무언가 떨어졌어요.", ["running away", "fell off"]],
    ["It was his wig.", "그것은 그의 가발이었어요.", ["wig"]],
    ["I ran after him, but I couldn't catch him.", "저는 그를 뒤쫓았지만, 잡을 수 없었어요.", ["ran after", "catch"]],
    ["He was faster than me.", "그는 저보다 더 빨랐거든요.", ["faster than"]],
    ["In fact, the old man was not old.", "사실 그 노인은 나이 든 사람이 아니었어요.", ["In fact"]],
    ["He was a young man with long brown hair.", "그는 긴 갈색 머리의 젊은 남자였어요.", ["with"]],

    { head: "Diego Perez, a guard — 경비원" },
    ["I went to the crime scene, and there were pieces of cake all over the painting.",
     "저는 범죄 현장에 갔는데, 그림 곳곳에 케이크 조각들이 있었어요.", ["crime scene", "there were", "all over"]],
    ["There was also a wheelchair near the painting, and I found a cake box next to the wheelchair.",
     "그림 근처에 휠체어도 있었는데, 저는 휠체어 옆에서 케이크 상자를 발견했어요.", ["There was", "near", "next to"]],
    ["The box was from Camila's Bakery.", "그 상자는 Camila 빵집의 것이었어요.", ["from"]],

    { head: "Camila Santos, the owner of Camila's Bakery — 빵집 주인" },
    ["Last Friday, a young man came in.", "지난 금요일, 한 젊은 남자가 들어왔어요.", ["came in"]],
    ["I spoke to him in Spanish, but he didn't understand me.",
     "저는 그에게 스페인어로 말했지만, 그는 제 말을 이해하지 못했어요.", ["in Spanish", "understand"]],
    ["He spoke only English.", "그는 영어만 했어요."],
    ["We had a lot of different cakes, but he just wanted the smallest one.",
     "여러 가지 케이크가 많이 있었지만, 그는 가장 작은 것만 원했어요.", ["a lot of", "smallest", "one"]],
    ["We sold only one cake that day, so I remember him clearly.",
     "그날 케이크를 하나만 팔아서, 저는 그를 똑똑히 기억해요.", ["so", "remember"]],
    ["Oh, he had blue eyes.", "아, 그는 파란 눈이었어요."],

    { head: "마무리" },
    ["Now, look at the information about the suspects.", "이제 용의자들에 대한 정보를 보세요.", ["information", "suspects"]],
    ["Who threw the cake at the Monalisa?", "누가 '모나리자'에 케이크를 던졌을까요?", ["threw", "at"]]
  ],

  /* 용의자 표 — 본문 추론 문제용 */
  extra: {
    head: "The Suspects",
    cols: ["이름", "Height", "Hair", "Languages", "Eyes"],
    rows: [
      ["Andres Lozano", "176 cm", "long, black", "Spanish, English", "brown"],
      ["Larry Johnson", "173 cm", "long, brown", "English", "blue"],
      ["Tim Baker", "182 cm", "long, brown", "English", "green"],
      ["Luca Ferez", "166 cm", "short, gray", "Spanish", "blue"]
    ],
    note: "목격자 진술과 대조해 보면 범인은 <b>Larry Johnson</b>. 170cm보다 조금 큼(173), 긴 갈색 머리, 영어만 함, 파란 눈."
  },

  dialogs: [
    { no: 1, lines: [
      ["W", "Excuse me, but you must not talk on the phone here.", "실례합니다만, 여기서 통화하시면 안 됩니다."],
      ["B", "I'm terribly sorry. I'll turn off my phone.", "정말 죄송합니다. 휴대폰을 끌게요."],
      ["W", "You don't have to. Texting is OK.", "그럴 필요는 없어요. 문자하는 것은 괜찮아요."]
    ]},
    { no: 2, lines: [
      ["G", "Excuse me. May I touch this golden bear?", "실례합니다. 이 황금곰을 만져 봐도 될까요?"],
      ["M", "No, you may not. You must not touch anything in this room.", "아니요, 안 됩니다. 이 방에서는 어떤 것도 만지면 안 됩니다."]
    ]},
    { no: 3, lines: [
      ["B", "May I go to the video room, Mom?", "비디오방에 가도 돼요, 엄마?"],
      ["W", "Of course, but don't run.", "물론이지, 하지만 뛰지는 마라."],
      ["W", "Look at that sign. You must not run inside the museum.", "저 표지판을 봐. 박물관 안에서 뛰면 안 된단다."]
    ]},
    { no: 4, lines: [
      ["B", "May I take food into the museum?", "박물관에 음식을 가지고 들어가도 되나요?"],
      ["W", "No, you may not. You must not bring any food inside.", "아니요, 안 됩니다. 안으로 어떤 음식도 가지고 오시면 안 됩니다."]
    ]},
    { no: 5, lines: [
      ["G", "Excuse me. May I bring my dog to the store?", "실례합니다. 가게에 제 개를 데려가도 되나요?"],
      ["M", "No, you may not. You must not bring pets inside.", "아니요, 안 됩니다. 내부로 반려동물을 데려오시면 안 됩니다."]
    ]},
    { no: 6, lines: [
      ["B", "May I eat here?", "여기서 먹어도 되나요?"],
      ["W", "No, you may not eat inside the museum.", "아니요, 박물관 안에서는 드시면 안 됩니다."],
      ["B", "How about water? May I drink water?", "물은 어떤가요? 물은 마셔도 되나요?"],
      ["W", "Sure, water is OK.", "물론이죠, 물은 괜찮습니다."]
    ]}
  ],

  grammar: [
    { h: "비교급 · 최상급",
      d: "비교급 = '더 ~한/하게', <b>형용사/부사+er</b> 형태. 비교급 뒤에는 <b>than</b>(~보다)이 함께 쓰임.<br>최상급 = '가장 ~한/하게', <b>the+형용사/부사+est</b> 형태. 최상급 뒤에는 보통 <b>in+장소·범위</b> 또는 <b>of+비교 대상</b>이 옴.",
      ex: ["He was <b>taller than</b> me.",
           "He wanted <b>the smallest</b> cake.",
           "Math is <b>more difficult than</b> science for me.",
           "Emma is <b>the fastest</b> student <b>in</b> her class.",
           "This book is <b>the most expensive</b> <b>of</b> all.",
           "Rex is <b>the tallest</b> of the four robots."] },
    { h: "There is / are ~",
      d: "'(…에) ~가 있다'는 뜻. <b>be동사 뒤에 오는 명사(구)가 주어</b>이고, 그 주어에 따라 be동사가 결정됨. 보통 장소의 전치사구와 함께 쓰며, <b>there는 '거기에'로 해석하지 않음</b>.",
      ex: ["<b>There is</b> a dog under the table.",
           "<b>There are</b> three books on the bed.",
           "<b>There were</b> pieces of cake all over the painting.",
           "<b>There wasn't</b> an empty seat on the bus.",
           "<b>Are there</b> any other problems?",
           "<b>Is there</b> a bag on the desk? — No, <b>there isn't</b>."] }
  ],

  functions: [
    { h: "허락 구하고 답하기",
      d: "A: <b>May I</b> drink water in class?<br>B: <b>Yes, you may.</b> / <b>No, you may not.</b>",
      ex: ["<b>May I</b> touch this golden bear?",
           "<b>May I</b> go to the video room, Mom?",
           "<b>May I</b> take food into the museum?",
           "<b>May I</b> take a picture of it? — <b>Yes, you may</b>, but you must not use the flash."] },
    { h: "금지하기",
      d: "<b>You must not</b> + 동사원형 ~ : ~해서는 안 된다",
      ex: ["Excuse me, but <b>you must not</b> talk on the phone here.",
           "<b>You must not</b> touch anything in this room.",
           "Look at that sign. <b>You must not</b> run inside the museum.",
           "<b>You must not</b> bring any food inside."] }
  ],

  rewrites: [
    ["May I touch this golden bear?",
     ["Can I touch this golden bear?",
      "Is it okay to touch this golden bear?",
      "Do[Would] you mind if I touch this golden bear?",
      "Do[Would] you mind me touching this golden bear?"]],
    ["You must not eat snacks in class.",
     ["You should not eat snacks in class.",
      "Never eat snacks in class.",
      "Don't eat snacks in class.",
      "You are not allowed to eat snacks in class."]],
    ["No, you may not.",
     ["No, you can't.",
      "I'm afraid[sorry], but I mind.",
      "I'm afraid[sorry], but you can't."]],
    ["He was taller than me.",
     ["I was shorter than him.",
      "I was less tall than him.",
      "I was not so[as] tall as him."]],
    ["Emma is the fastest student in her class.",
     ["Emma is faster than any other student in her class.",
      "Emma is faster than all the other students in her class.",
      "No other student is faster than Emma in her class.",
      "No other student is as fast as Emma in her class."]],
    ["There wasn't an empty seat on the bus.",
     ["The bus didn't have an empty seat."]]
  ]
});
