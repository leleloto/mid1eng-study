/* 5과 학습지 사진 전사. 필기·개인정보 제외. 단원평가 184쪽은 앞서 받은 폴더의 5과 사진에서 보완. */
(() => {
  const s=(no,prompt,answer,passage='',explanation='')=>({no,prompt,answer:Array.isArray(answer)?answer:[answer],passage,explanation});
  const c=(no,prompt,choices,answer,passage='',explanation='')=>({...s(no,prompt,Array.isArray(answer)?answer.map(String):String(answer),passage,explanation),choices});
  const words=[
    ['floor','층; 마루'],['sign','표지판, 표시, 신호'],['secret','비밀; 비밀의'],['anything','무엇이든; (부정문) 아무것도'],
    ['touch','만지다, 접촉하다'],['bottled','병에 담긴'],['understand','이해하다'],['janitor','관리인, 수위'],
    ['suspect','용의자; 의심하다'],['criminal','범죄자; 범죄의, 형사상의'],['inside','안에'],['eyewitness','목격자'],
    ['visitor','방문객'],['other','다른; 다른 것(사람)'],['reason','이유'],['golden','금빛의, 황금의'],['heavy','무거운'],
    ['bakery','빵집'],['catch','잡다'],['crime','범죄, 위법'],['piece','조각, 한 개'],['run away','도망가다'],
    ['run after','뒤쫓아가다'],['texting','문자 보내기, 문자 메시지를 주고받기'],['guard','경비원'],['height','높이, 키'],
    ['above','~ 위에'],['expensive','비싼'],['scene','현장, 장면'],['sell','팔다'],['steal','훔치다'],['wheelchair','휠체어'],
    ['wig','가발'],['empty','비어 있는'],['terribly','몹시, 매우, 심하게'],['old','나이 든, 오래된'],['bring','가져오다, 데려오다'],
    ['finally','마지막으로'],['remember','기억하다'],['problem','문제'],['second','두 번째의; 두 번째로'],['in fact','사실은'],
    ['bring A to B','A를 B에 가지고 가다'],['a piece of','~ 한 조각'],['fall off','~로부터 떨어지다'],['talk on the phone','전화로 통화하다']
  ];
  const animals='동물 | 나이 | 몸무게 | 속도\n코끼리 | 5 | 1500 kg | 25 km/h\n토끼 | 7 | 8 kg | 80 km/h\n사자 | 15 | 250 kg | 70 km/h';
  const guide='A: Everybody, look over here, please. This is Sunflowers by Van Gogh. (①)\nB: Wow, this is my favorite painting. (②)\nA: Yes, you may, but you must not use the flash. (③)\nB: Why not? It’s a little dark in here.\nA: I’m sorry, but using the flash can damage paintings. (④)\nB: Oh, I didn’t know that. (⑤)\nA: Everyone, we’ll move on to Monet’s painting next.\nB: Great!';
  const intro='Last Saturday, someone threw a cake _____ (a) the Monalisa in the Botero Museum _____ (b) Bogota, Colombia. There were four eyewitnesses. What did they say? Read the following, and find the criminal.';
  const witness='Ann Jones, a visitor\nI was looking at the Monalisa, and someone threw a cake at the painting. I (a) turned around and saw an old man. (①) He was standing (b) in front of a wheelchair. (②) I’m about 170 cm tall, and 그는 저보다 조금 더 키가 컸어요.\n\nCarlos Diaz, a janitor\nAn old man with gray hair (c) was running away, and something (d) fell off his head. (③) I (e) ran after him, but I couldn’t catch him. (④) He was faster than me. (⑤) In fact, the old man was not old. He was a young man with long brown hair.';
  const last='Diego Perez, a guard\nI went to the crime scene, and there _____ (A) pieces of cake all over the painting. There was also a wheelchair near the painting, and I found a cake box next to the wheelchair. The box was from Camila’s Bakery.\n\nCamila Santos, the owner of Camila’s Bakery\nLast Friday, a young man came in. I spoke to him in Spanish, but he didn’t understand me. He spoke only English. We had a lot of different cakes, but he just wanted the smallest _____ (B). We sold only one cake that day, so I remember him _____ (C). Oh, he had blue eyes.';
  LESSONS.find(l=>l.id===5).worksheets=[
    {id:'words',title:'단어 46개',source:'Word List · 1쪽',note:'학습지 단어 목록을 뜻 → 영어 쓰기로 바꾼 연습.',questions:words.map(([en,ko],i)=>s(String(i+1),ko,en))},
    {id:'crossword',title:'낱말 퍼즐',source:'Vocabulary (Crossword Puzzle) · 4쪽',note:'가로·세로 단서를 보고 단어를 입력하세요. 격자 대신 단서별 입력으로 구성했습니다.',questions:[
      s('가로 2','Being kind to everyone is our classroom r____.','rule','','rule: 규칙.'),
      s('가로 6','가발','wig','','wig: 가발.'),
      s('가로 8','not known or seen by others','secret','','secret: 비밀의.'),
      s('가로 10','진술','statement','','statement: 진술.'),
      s('가로 11','Lily can speak five l_______s. — 격자에 들어갈 단수 기본형','language','','문장에서는 languages. 끝의 s는 이미 주어져 있고 격자는 language 8글자.'),
      s('세로 1','how tall someone or something is','height','','height: 키, 높이.'),
      s('세로 3','someone who saw a crime or an accident','eyewitness','','eyewitness: 목격자.'),
      s('세로 4','The police caught the c_______ this morning.','criminal','','criminal: 범죄자.'),
      s('세로 5','근거 — something that makes it right or fair to do something','reason','','reason: 이유, 근거.'),
      s('세로 7','암호','code','','code: 암호.'),
      s('세로 9','Don’t f___ the fish in the pond.','feed','','feed: 먹이를 주다.'),
      s('세로 10','to take something that belongs to someone else','steal','','steal: 훔치다.')
    ]},
    {id:'comparison-concept',title:'비교급·최상급 개념',source:'Grammar-1 설명 · 9쪽',note:'설명 페이지의 예문을 빈칸 문제로 바꿨습니다. 비교급은 than과, 최상급은 주로 the 및 in/of 범위 표현과 함께 씁니다. 긴 형용사는 more/most, good·well은 better/best, bad는 worse/worst로 바뀝니다.',questions:[
      ['Summer is _____ than winter.','warm','warmer'],['This book is _____ than that one.','interesting','more interesting'],
      ['Leo runs _____ than Sam.','fast','faster'],['Bikes are _____ than cars.','cheap','cheaper'],
      ['Ted is _____ than Olivia.','young','younger'],['I will arrive _____ than you.','early','earlier'],
      ['You are _____ than the picture.','beautiful','more beautiful'],['Health is _____ than wealth.','important','more important'],
      ['Eating fruits is _____ than eating candies.','good','better'],['The food here is _____ than the service.','bad','worse'],
      ['Mark is the _____ student in his class.','tall','tallest'],['Mt. Everest is the _____ in the world.','high','highest'],
      ['I like this shirt the _____.','much','most'],['Jim is the _____ in the town.','strong','strongest'],
      ['She is the _____ of all.','smart','smartest'],['Health is the _____.','important','most important'],
      ['The red dress is the _____ of all.','expensive','most expensive'],['Love is the _____.','good','best'],
      ['The weather was the _____ in the morning.','bad','worst']
    ].map(([sentence,word,answer],i)=>s(String(i+1),`(${word})를 알맞게 바꿔 빈칸만 쓰세요.`,answer,sentence,`${word} → ${answer}. the가 주어졌다면 다시 쓰지 않음.`))},
    {id:'comparison-fill',title:'비교급·최상급 완성',source:'Grammar-1 · 10쪽',questions:[
      s('A1','(easy)를 알맞게 바꾸세요.','easier','English is _____ than math.','자음+y는 y를 i로 바꾸고 -er.'),
      s('A2','(hot)를 알맞게 바꾸세요.','hottest','August is the _____ month of the year.','hot은 t를 한 번 더 쓰고 -est.'),
      s('A3','(many)를 알맞게 바꾸세요.','more','Bill has _____ books than Kate.','many의 비교급 more.'),
      s('A4','(light)를 알맞게 바꾸세요.','lighter','Mina’s bag is _____ than mine.','light의 비교급 lighter.'),
      s('A5','(big)를 알맞게 바꾸세요.','biggest','Russia is the _____ country in the world.','big의 최상급 biggest.'),
      s('A6','(important)를 알맞게 바꾸세요.','more important','Health is _____ than money.','긴 형용사의 비교급 more important.'),
      s('A7','(interesting)를 알맞게 바꾸세요.','more interesting','Reading books is _____ than watching movies.','more interesting으로 비교.'),
      s('B1','표를 보고 (fast)를 활용해 완성하세요.','faster than',animals+'\n\nThe lion is _____ the elephant.','사자 70 km/h > 코끼리 25 km/h.'),
      s('B2','표를 보고 (heavy)를 활용해 완성하세요.','heavier than',animals+'\n\nThe elephant is _____ the rabbit.','코끼리 1500 kg > 토끼 8 kg.'),
      s('B3','표를 보고 (old)를 활용해 완성하세요.','the oldest',animals+'\n\nThe lion is _____ of the three animals.','사자 15세로 셋 중 가장 나이가 많음.'),
      s('B4','표를 보고 (fast)를 활용해 완성하세요.','the fastest',animals+'\n\nThe rabbit is _____ of the three animals.','토끼 80 km/h로 셋 중 가장 빠름.')
    ]},
    {id:'comparison-exercise',title:'비교급 Exercise A',source:'Grammar-1 · 11쪽',questions:[
      c('1','빈칸에 들어갈 말은?',['heavy','heavier','heavyer','the heavy','the heavier'],2,'My backpack is _____ than your backpack.','heavy → heavier.'),
      c('2','두 빈칸에 공통으로 들어갈 말은?',['well','good','best','better','more good'],4,'My new phone is _____ than my old one.\nShe sings _____ than her sister.','good과 well의 비교급은 모두 better.'),
      c('3','대화의 빈칸에 들어갈 문장은?',['He is tallest student of my class.','He is the tallest student in my class.','He is the best tall student of my class.','He is the very tallest student of my class.','He is the most tallest student in my class.'],[2,4],'A: Is Minsu taller than you?\nB: Yes, he is. _____','학습지 의도는 ② the tallest student in my class. 다만 ④의 very + 최상급은 강조 용법으로 가능하므로 ④도 인정. 학교 시험에서는 기본형 ②를 우선 확인하세요.'),
      c('4','비교급이 올바르게 사용된 문장은?',['She looks the more tired today.','The air was more bad than last week.','Math is the harder than English for me.','This question is more easy than that one.','John speaks louder than his brother.'],5,'','louder than이 올바름. worse, easier 등 형태에 주의.'),
      c('5','최상급이 올바르게 사용된 문장은?',['That movie is the best of the year.','They arrived the most earliest of all.','This is the more largest building in the city.','This book is the more interesting of the two.','Her dress was the beautifulest one at the party.'],1,'','① the best가 올바른 최상급. ④는 두 대상의 비교급 표현이므로 최상급을 묻는 이 문제의 답이 아님.'),
      s('6(1)','[the fastest]를 바르게 고치세요.','faster','He runs [the fastest] than the other players.','than 앞에는 비교급 faster.'),
      s('6(2)','[the more expensive]를 바르게 고치세요.','the most expensive','This restaurant is [the more expensive] in town.','마을 전체에서 가장 비싸므로 the most expensive.'),
      s('6(3)','[more smarter]를 바르게 고치세요.','smarter','My dog is [more smarter] than my friend’s dog.','more와 -er을 중복 사용하지 않음.'),
      s('7(1)','(high)를 알맞게 바꾸세요.','the highest','I got _____ score in my class.','학급에서 가장 높은 점수: the highest.'),
      s('7(2)','(difficult)를 알맞게 바꾸세요.','more difficult','This puzzle is _____ than the last one.','more difficult than.'),
      s('7(3)','(bad)를 알맞게 바꾸세요.','worse','The weather today is _____ than yesterday.','bad의 비교급 worse.'),
      c('8','“파란색 상자가 셋 중 제일 크다.”를 올바르게 옮긴 것은?',['The blue box is the biggest in the three.','The blue box is the biggest of the three.','The blue box is the most big in the three.','The blue box is the most biggest of the three.','The blue box is the very biggest of the three.'],[2,5],'','학습지 의도는 ② the biggest of the three. ⑤도 very로 최상급을 강조한 문법적으로 가능한 문장이므로 인정. 원문 기본형은 ②로 확인하세요.')
    ]},
    {id:'there-concept',title:'There is/are 개념',source:'Grammar-2 설명 · 12쪽',note:'설명 예문을 빈칸으로 바꾼 연습. be동사 뒤 명사가 단수·셀 수 없는 명사이면 is, 복수이면 are. 과거는 was/were. 의문문은 be동사를 there 앞으로 옮깁니다.',questions:[
      ['There _____ a book on the table.','is','a book은 단수.'],['There _____ a bird in the tree.','is','a bird는 단수.'],
      ['There _____ clouds in the sky.','are','clouds는 복수.'],['There _____ a computer on the desk.','is','a computer는 단수.'],
      ['There _____ pictures on the wall.','are','pictures는 복수.'],
      ['There _____ a cup on the shelf. (부정문, 축약형)',"isn't",'단수 a cup: is not = isn’t.'],
      ['There _____ flowers in the garden. (부정문, 축약형)',"aren't",'복수 flowers: are not = aren’t.'],
      ['_____ there a dog in the backyard?','Is','단수 의문문 Is there ~?'],
      ['_____ there children in the playground?','Are','children은 child의 복수형.'],
      ['_____ there any guests at the party? (과거)','Were','과거 복수 의문문 Were there ~? 대답은 Yes, there were. / No, there weren’t.']
    ].map(([p,a,e],i)=>s(String(i+1),'빈칸에 알맞은 be동사를 쓰세요.',a,p,e))},
    {id:'there-practice',title:'There is/are 연습',source:'Grammar-2 · 13쪽',note:'A는 O/X 판단 후 틀린 표현 고치기. B의 그림은 상황 설명으로 옮겼습니다.',questions:[
      ...[
        ['There [are] some pens on the desk.',1,'pens가 복수이므로 are.'],['[Is] there a park near here?',1,'a park는 단수.'],
        ['[Is] there any other problems now?',2,'problems가 복수이므로 Are.'],["There [wasn’t] many cars on the street yesterday.",2,'cars가 복수이므로 weren’t.'],
        ['[Was] there many people at the beach last weekend?',2,'people은 복수이므로 Were.'],['There [is] no homework today.',1,'homework는 셀 수 없는 명사이므로 is.']
      ].map(([p,a,e],i)=>c(`A${i+1}`,'[대괄호]의 표현이 올바른가요?',['O','X'],a,p,e)),
      s('A3 고치기','[Is]를 고치세요.','Are','[Is] there any other problems now?','복수 problems에 맞춰 Are.'),
      s('A4 고치기','[wasn’t]를 고치세요.',["weren't",'were not'],"There [wasn’t] many cars on the street yesterday.",'과거 복수 부정형 were not.'),
      s('A5 고치기','[Was]를 고치세요.','Were','[Was] there many people at the beach last weekend?','과거 복수 의문문 Were there ~?'),
      s('B1','그림 상황: 책상 위에 사과 한 개가 있음. (an apple)','There is an apple','_____ on the desk.','단수이므로 There is an apple.'),
      s('B2','그림 상황: 교실에 학생 세 명이 있음. (three students)','There are three students','_____ in the classroom.','복수이므로 There are three students.'),
      s('B3 질문','책상 위에 책 세 권이 있는지 물으세요. (three books)','Are there three books','_____ on the desk?','복수 의문문 Are there three books ~?'),
      s('B3 대답','그림 상황: 책상 위에 책 세 권이 있음.','are','Q: Are there three books on the desk?\nA: Yes, there _____.','Are there 질문에 Yes, there are.'),
      s('B4 질문','책상 위에 가방 하나가 있는지 물으세요. (a bag)','Is there a bag','_____ on the desk?','단수 의문문 Is there a bag ~?'),
      s('B4 대답','그림 상황: 가방은 책상 위가 아니라 바닥에 있음.',["isn't",'is not'],'Q: Is there a bag on the desk?\nA: No, there _____. It’s on the floor.','Is there 질문의 부정 대답은 No, there isn’t.')
    ]},
    {id:'exam184',title:'단원평가 1–7',source:'단원평가 · 184쪽 (앞서 받은 사진에서 보완)',questions:[
      c('1','빈칸에 공통으로 들어갈 말은?',['got','ran','looked','turned','took'],2,'They _____ away from the burning house.\nHe _____ after the bus, but he couldn’t catch it.','run away(도망가다), run after(뒤쫓다)의 과거형 ran.'),
      c('2','[about]의 의미가 나머지와 다른 것은?',['They were talking [about] the movie.','Don’t worry [about] us.','Let’s think [about] the problem.','We moved here [about] three years ago.','This book is [about] flowers.'],4,'','④는 약, 대략. 나머지는 ~에 관하여.'),
      c('3','사람을 뜻하는 단어가 아닌 것은?',['suspect','guard','statement','eyewitness','criminal'],3,'','statement는 진술. 나머지는 용의자·경비원·목격자·범죄자.'),
      c('4','자연스러운 대화가 되도록 (A)~(C)를 배열한 것은?',['A–C–B','B–A–C','B–C–A','C–A–B','C–B–A'],2,'A: May I take food into the museum?\n(A) How about water?\n(B) No, you may not. You must not bring any food inside.\n(C) Only bottled water is OK.','음식 반입 금지 → 물은 어떤지 질문 → 생수만 허용.'),
      c('5','대화에서 가리키는 표지판은?',['반려동물 출입 금지','음식물 반입 금지','휴대전화 사용 금지','만지지 마시오','뛰지 마시오'],4,'A: Look at that sign. You shouldn’t touch the painting.\nB: Oh, I didn’t know that. I’m sorry.','원문의 그림 보기를 표지판 뜻으로 옮김. touch the painting을 금지함.'),
      c('6','대화의 빈칸에 들어갈 말은?',['may I use your phone?','can you help me with this phone?','where can I find the way to the museum?','you must not talk on the phone here.','how do you like my phone?'],4,'A: Excuse me, but _____.\nB: I’m terribly sorry. I’ll turn off my phone.\nA: You don’t have to. Texting is OK.\nB: I see. Thank you.','통화는 금지하지만 문자는 허용하는 상황.'),
      c('7','짝지어진 대화가 자연스럽지 않은 것은?',[
        'A: It’s too cold here. May I close the window? / B: Sure. Go ahead.',
        'A: You shouldn’t eat food here. / B: Oh, I’m sorry. I didn’t know that.',
        'A: May I bring my pet inside the café? / B: No, I don’t have pets.',
        'A: Excuse me, sir. You shouldn’t park here. / B: I see. I’ll move it right away.',
        'A: My phone is not working. May I use yours? / B: Yes, you may. Here it is.'
      ],3,'','반려동물 반입 허락을 물었는데 자신은 반려동물이 없다고 답하는 것은 부자연스러움.')
    ]},
    {id:'exam185',title:'단원평가 8–13',source:'단원평가 · 185쪽',questions:[
      c('8','주어진 문장이 들어갈 위치는?',['①','②','③','④','⑤'],2,'주어진 문장: May I take a picture of it?\n\n'+guide,'Yes, you may라는 허락의 답변 바로 앞 ②.'),
      c('9','대화 속 두 사람의 관계는?',['의사–환자','도서관 사서–학생','박물관 가이드–관람객','경찰관–시민','운전기사–승객'],3,guide,'그림을 설명하고 다음 작품으로 이동을 안내하는 가이드와 관람객.'),
      c('10','어법상 틀린 것은?',['Tom is the funniest boy in my class.','He is the most famous actor in Korea.','Mt. Halla is higher than Mt. Jiri.','Soccer balls are bigger than tennis balls.','The red cap is very expensive than the blue one.'],5,'','than 앞에는 very expensive가 아닌 more expensive.'),
      c('11','어법상 옳은 문장을 모두 고른 것은?',['a, c','a, b, e','c, d, e','a, b, d, e','a, b, c, d, e'],2,'(a) There are many new items in this shop.\n(b) Who got the highest score on the math test?\n(c) Was there two apples on the table?\n(d) A turtle is slowest than a rabbit.\n(e) To me, science is more difficult than English.','c: Was → Were. d: slowest → slower. 따라서 a, b, e.'),
      c('12','빈칸에 들어갈 말을 순서대로 고르세요.',['is–is–are','is–are–is','is–are–are','are–is–are','are–are–are'],3,'A: Look! There _____ a small pond here.\nB: Oh. How many fish _____ there in the pond?\nA: Let’s see. There _____ three.','a pond 단수 is, 여러 마리 fish와 three는 복수 are.'),
      c('13','표의 내용과 일치하지 않는 것은?',['Ed is younger than Mike.','Mike is the oldest of the three.','Tom is taller than Ed.','Tom is shorter than Mike.','Ed is the youngest of the three.'],3,'이름 | 나이 | 키\nEd | 9 | 155 cm\nTom | 10 | 150 cm\nMike | 12 | 160 cm','Tom 150 cm로 Ed 155 cm보다 작음.')
    ]},
    {id:'exam186',title:'단원평가 14–21',source:'단원평가 · 186쪽',questions:[
      c('14','빈칸에 들어갈 말은?',['big','bigger','biggest','the bigger','more big'],2,'Australia is _____ than New Zealand.','big의 비교급 bigger.'),
      c('15','빈칸에 들어갈 말은?',['noisy','strong','popular','smart','funny'],3,'Minsu is more _____ than Jinho.','more popular. 다른 보기의 일반적인 비교급은 noisier, stronger, smarter, funnier.'),
      c('16','글 다음에 이어질 내용은?',['보테로 박물관의 역사','전시회 관람객들의 소감','모나리자를 그린 화가 소개','사건 목격자들의 진술','훼손된 그림의 가치'],4,intro,'목격자 네 명이 무엇이라고 말했는지 읽으라는 안내.'),
      c('17','(a), (b)에 들어갈 말을 고르세요.',['in–to','with–from','at–in','with–in','at–with'],3,intro,'throw A at B: B를 향해 A를 던지다. 도시 앞에는 in.'),
      c('18','(a)~(e)의 우리말 의미가 잘못된 것은?',['(a) 돌아섰다','(b) ~의 앞에','(c) 도망가고 있었다','(d) ~위를 지나갔다','(e) 쫓아갔다'],4,witness,'fell off는 ~로부터 떨어졌다.'),
      c('19','주어진 문장이 들어갈 위치는?',['①','②','③','④','⑤'],3,'주어진 문장: It was his wig.\n\n'+witness,'머리에서 떨어진 것이 가발이었다는 설명이므로 ③.'),
      c('20','글에서 알 수 없는 것은?',['Ann Jones가 보고 있었던 그림','Ann Jones의 키','Carlos Diaz의 직업','Carlos Diaz가 남자를 잡지 못한 이유','Carlos Diaz의 머리 색깔'],5,witness,'긴 갈색 머리는 범인의 머리. Carlos의 머리 색은 나오지 않음.'),
      s('21','“그는 저보다 조금 더 키가 컸어요.”가 되도록 배열해 완전한 문장을 쓰세요.','He was a little taller than me.','보기: a little / he / was / than / me / taller','a little + 비교급 + than: ~보다 조금 더 …한.')
    ]},
    {id:'exam187',title:'단원평가 22–25',source:'단원평가 · 187쪽',questions:[
      c('22','(A), (B), (C)를 순서대로 고르세요.',['was–it–clear','was–one–clearly','were–it–clearly','were–one–clear','were–one–clearly'],5,last,'복수 pieces이므로 were, 불특정 케이크 하나를 대신하는 one, remember를 꾸미는 부사 clearly.'),
      c('23','a young man에 관해 알 수 없는 것은?',['He visited Camila’s Bakery last Friday.','He didn’t understand Spanish.','His favorite cake was not in the bakery.','The color of his eyes was blue.','He wanted the smallest cake.'],3,last,'좋아하는 케이크가 빵집에 없었다는 내용은 나오지 않음.'),
      s('24(1)','질문에 답하도록 첫 빈칸을 완성하세요.','cake box','Q: What did Diego Perez find next to the wheelchair?\nA: He found a(n) _____ from Camila’s Bakery.\n\n'+last,'휠체어 옆에서 발견한 것은 cake box.'),
      s('24(2)','두 번째 빈칸을 완성하세요.',"Camila's Bakery",'He found a cake box from _____.\n\n'+last,'상자는 Camila’s Bakery에서 온 것.'),
      s('25(1)','이 분홍색 가방이 이 가게에서 가장 비싼 가방이다.','the most expensive bag','This pink bag is _____ in this shop.','학습지는 네 단어 빈칸: the most expensive bag.'),
      s('25(2)','탁자 위에 책이 많다.','There are many books','_____ on the table.','복수 books이므로 There are many books.')
    ]}
  ];
})();
