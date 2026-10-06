/* 제공된 사진의 6과 자료 9종. 학생 필기 대신 문항을 기준으로 정답 검토.
   06/08 사진은 같은 학습지이므로 한 번만 수록. 학생 개인정보·원본 사진은 게시하지 않음. */
(() => {
  const short = (no, prompt, answer, passage = '', explanation = '') =>
    ({no, prompt, answer: Array.isArray(answer) ? answer : [answer], passage, explanation});
  const choice = (no, prompt, choices, answer, passage = '', explanation = '') =>
    ({...short(no,prompt,String(answer),passage,explanation),choices});
  const vocab = [
    ['forget','잊다'],['zero-waste','쓰레기 배출 제로의; 쓰레기 없애기'],['favor','호의, 부탁; 찬성하다, 선호하다'],
    ['guess','추측하다; 추측'],['share','공유하다, 나누다; 몫, 지분'],['environment','환경'],['believe','믿다'],
    ['fix','고치다, 정하다'],['reusable','재사용할 수 있는'],['forgetful','잘 잊어버리는, 건망증이 있는'],
    ['produce','생산하다, 배출하다; 농산물'],['challenge','도전, 과제; 도전하다'],['container','용기, 그릇'],
    ['cool','멋진, 시원한; 식히다'],['decide','결정하다'],['else','그 밖에, 다른'],['delivery','배달, 인도'],
    ['soon','곧, 머지않아'],['leftover','남은 음식; 남은'],['by the way','그런데, 그나저나'],
    ['go out','외출하다; (불 등이) 꺼지다'],['give away for free','무료로 제공하다'],['eat out','외식하다'],
    ['completely','완전히, 전적으로'],['point','요점, 점; 가리키다'],['machine','기계'],['near','가까이에; 가까운'],
    ['single-use','일회용의'],['reduce','줄이다, 감소시키다'],['reuse','재사용하다; 재사용'],['sew','바느질하다, 꿰매다'],
    ['tear','찢다, 뜯다; 눈물'],['think','생각하다'],['hear','듣다'],['label','라벨, 상표; 라벨을 붙이다'],
    ['trash bag','쓰레기 봉투'],['recycle','재활용하다'],['plog','조깅하며 쓰레기를 줍다'],['right after','~ 직후에'],
    ['instead','대신에'],['go away','떠나다, 사라지다'],['run over','(차가) 치다, 넘치다'],['pick up','줍다, 집어 들다, 마중 나가다'],
    ['one by one','하나하나씩'],['in return','대가로, 보답으로'],['out of','~로부터']
  ];
  const trashTalk = 'A: I always _____ cans and bottles.\nB: Oh! You try to reduce trash, right?\nA: Yes. I want to save the Earth.\nB: That’s cool!';
  const cafe = 'A: For here or to go?\nB: For here, please. And can you please put my smoothie in a plastic cup, not in a glass?\nA: I’m sorry, but we don’t use single-use plastic cups inside the café.\nB: Oh, I see.';
  const plogging = 'A: Hi, Yuna. What are you doing here?\nB: Hi, Alex. I’m plogging with my club members.\nA: Excuse me?\nB: Plogging. It means jogging and picking up _____ at the same time.\nA: Sounds cool! So you’re a member of a plogging club.\nB: Yes. We plog together every Saturday morning from 10 to 12. Interested?\nA: Well, I’ll think about it.\nB: OK. By the way, can you please help me with this trash bag? It’s heavy.\nA: Sure. No problem.';
  const intro = 'Every day, we produce lots of waste, and the Earth is getting sicker and sicker. Do you want to save the Earth? Then, join the zero-waste challenge, and share your stories.';
  const olivia = 'Challenge 01 _____\nOlivia: My birthday was last Saturday, and my family and I ate out. There were lots of leftovers, but we brought them home. The next day, I made a nice lunch out of them. FYI, you can find great cooking ideas for leftovers on the Internet.';
  const domingo = 'Challenge 02 Reuse\nDomingo: My dog tore my bag. (①) I wanted to buy a new one, but I thought again. (②) So, I decided to fix (A) it and reuse (B) it. (③) I’m not very good at sewing, and I don’t think that the bag looks perfect. (④) I guess it’s all right. (⑤)';
  const emma = 'Challenge 03 Say No to Single-Use Plastic\nEmma: I often use food delivery services, but today, (A) I didn’t. Instead, I walked to my favorite restaurant with a reusable container and picked up the food. I heard _____ (B) plastic never goes away completely. I didn’t use any single-use plastic today. I felt good!';
  const minsu = 'Challenge 04 Recycle\nMinsu: Yesterday, I took some plastic and glass bottles to a recycling machine near my house.\n① I put them into the machine one by one, and I got some points in return.\n② What can I do with those points?\n③ Well, I can use them like money.\n④ Points are more useful than money.\n⑤ Don’t you think that’s cool?';
  LESSONS.find(l=>l.id===6).worksheets = [
    {id:'words',title:'단어 46개',source:'Word List · 1쪽',note:'학습지 단어 목록을 뜻 → 영어 쓰기로 바꾼 연습. 표시나 필기 유무와 관계없이 46개 전부 포함.',questions:
      vocab.map(([en,ko],i)=>short(String(i+1),ko,en,'',''))},
    {id:'crossword',title:'낱말 퍼즐',source:'Vocabulary (Crossword Puzzle) · 4쪽',note:'가로·세로 단서를 보고 단어 전체를 입력하세요. 사진의 격자는 단서별 입력 문제로 옮겼습니다.',questions:[
      short('가로 2','She s___ed a button on the shirt. (그녀는 셔츠에 단추를 바느질했다.) — 동사원형 쓰기','sew','','sewed는 sew의 과거형. 격자에 들어가는 동사원형은 sew.'),
      short('가로 4','Will you do me a f_____ and turn off the light?','favor','','do me a favor: 내 부탁을 들어주다.'),
      short('가로 7','to make something less or smaller','reduce','','reduce: 줄이다, 감소시키다.'),
      short('가로 9','Plastic bags are bad for the e__________.','environment','','environment: 환경.'),
      short('가로 11','food remaining after a meal','leftover','','leftover: 남은 음식. 학습지 격자는 단수 8글자.'),
      short('세로 1','중고의 — used by someone else before',['secondhand','second-hand'],'','secondhand: 다른 사람이 전에 사용한, 중고의.'),
      short('세로 3','Climbing a mountain is a great c________ for me.','challenge','','challenge: 도전.'),
      short('세로 5','The store has a washing m______ for shoes.','machine','','a washing machine: 세탁기.'),
      short('세로 6','재활용하다','recycle','','recycle: 재활용하다.'),
      short('세로 8','to make or grow something','produce','','produce: 생산하다.'),
      short('세로 10','to pick up trash while jogging','plog','','plog: 조깅하며 쓰레기를 줍다.')
    ]},
    {id:'concept',title:'to부정사 개념',source:'Grammar-1 설명 · 8쪽',note:'설명 페이지의 예문을 역할 구분 문제로 바꾼 연습. to + 동사원형은 명사·형용사·부사 역할을 할 수 있으며, 여기서는 명사 역할(주어·목적어·보어)을 연습합니다. want, hope, decide, plan 뒤에는 to부정사를 목적어로 씁니다.',questions:[
      ['To watch dramas is fun.','To watch dramas',1],['To help others brings happiness.','To help others',1],
      ['To wear a helmet can save your life.','To wear a helmet',1],['I love to play the guitar.','to play the guitar',2],
      ['They decided to clean the room.','to clean the room',2],['Kate wanted to write a book.','to write a book',2],
      ['My dream is to write a book.','to write a book',3],['His favorite hobby is to draw pictures.','to draw pictures',3],
      ['Their plan is to go on a trip next summer.','to go on a trip next summer',3]
    ].map(([sentence,part,answer],i)=>choice(String(i+1),`「${part}」의 역할은?`,['주어','목적어','보어'],answer,sentence,answer===1?'문장 앞에서 동작의 주체를 나타내는 주어.':answer===2?'동사가 원하는·결정한 행동을 나타내는 목적어.':'be동사 뒤에서 주어의 내용을 설명하는 보어.'))},
    {id:'infinitive',title:'to부정사 문장 완성',source:'Grammar-1 · 9쪽 (중복 사진 통합)',note:'빈칸에 들어갈 말만 쓰세요. C는 밑줄 친 부분만 고칩니다.',questions:[
      short('A1','규칙적으로 운동하는 것은 쉽지 않다. (exercise)','To exercise','_____ regularly is not easy.','to exercise가 주어. 문장 앞에서는 To로 시작.'),
      short('A2','그녀의 꿈은 세계를 여행하는 것이다. (travel)','to travel','Her dream is _____ the world.','be동사 뒤 보어로 to travel.'),
      short('A3','나는 영어 말하기를 잘하고 싶다. (want, be)','want to be','I _____ good at speaking English.','want + to부정사, be good at ~.'),
      short('A4','나는 주말에 쇼핑하러 가는 것을 좋아하지 않는다. (like, go)','like to go','I don’t _____ shopping on weekends.','don’t 뒤 동사원형 like, 뒤에 to go.'),
      short('A5','그들은 새 아파트로 이사하기로 결정했다. (decide, move)','decided to move','They _____ to a new apartment.','과거형 decided + to move.'),
      short('A6','그는 다음 달에 마라톤을 뛸 계획이니? (plan, run)','plan to run','Does he _____ a marathon next month?','Does 뒤에는 plans가 아닌 plan.'),
      short('B1','보기: learn / become / exercise / travel / take','to exercise','These are my three wishes. First, I want to stay healthy.\nI decided _____ every morning.','건강을 위해 매일 아침 운동하기로 결정: decided to exercise.'),
      short('B2','보기: learn / become / exercise / travel / take','to learn','Second, I want _____ Spanish.','want to learn: 배우고 싶다.'),
      short('B3','보기: learn / become / exercise / travel / take','to travel','I plan _____ around Spain this summer.','plan to travel. plan 뒤에 is를 넣지 않음.'),
      short('B4','보기: learn / become / exercise / travel / take','to take','Last, I want _____ a piano lesson.','take a lesson: 수업을 받다.'),
      short('B5','보기: learn / become / exercise / travel / take','to become','I hope _____ a pianist in the future.','hope to become: ~이 되기를 희망하다.'),
      short('C1','[learn]을 바르게 고치세요.','to learn','I decided [learn] taekwondo.','decide는 to부정사를 목적어로 취함.'),
      short('C2','[going]을 바르게 고치세요.','to go','My sister wants [going] to the concert.','want + to go.'),
      short('C3','[to eating]을 바르게 고치세요.','to eat','Jake hopes [to eating] ice cream every day.','to 뒤에는 동사원형 eat.')
    ]},
    {id:'exercise',title:'to부정사 Exercise A',source:'Grammar-1 · 11쪽',note:'역할 구분·어법·빈칸 완성. 원문에서 밑줄 친 부분은 [대괄호]로 표시했습니다.',questions:[
      choice('1(1)','[to read]의 역할은?',['주어','목적어','보어'],2,'I like [to read] books in my free time.','like의 목적어.'),
      choice('1(2)','[To be kind to your friends]의 역할은?',['주어','목적어','보어'],1,'[To be kind to your friends] is important.','is 앞에서 주어 역할.'),
      choice('1(3)','[to become a doctor]의 역할은?',['주어','목적어','보어'],3,'My goal is [to become a doctor].','목표의 내용을 설명하는 보어.'),
      choice('2','빈칸에 들어갈 말로 알맞지 않은 것은?',['planned','finished','hoped','wanted','decided'],2,'We _____ to go camping this weekend.','finish는 동명사를 목적어로 취하므로 finished going이 맞음.'),
      choice('3','어법상 올바른 문장은?',['She loves play the piano.','He decided staying home.','They plan joining the tennis club.','Did she finish to washing the dishes?','I don’t want to eat spaghetti for lunch.'],5,'','want to eat이 올바름. 나머지는 to play/playing, to stay, to join, washing으로 고쳐야 함.'),
      choice('4','[to]의 쓰임이 나머지와 다른 것은?',['Emma is kind [to] everyone.','The store is open from 9 [to] 6.','They went [to] Paris last summer.','I decided [to] go to the concert.','She walked [to] school yesterday.'],4,'','④는 to + 동사원형. 나머지는 명사·대명사·숫자 앞의 전치사.'),
      choice('5','보기의 to부정사와 역할이 같은 것은?',['He likes to ask questions.','Our dream is to go to space.','You need to be more careful.','To eat healthy is good for you.','I hope to hear good news from you.'],2,'보기: His hope is to have a pet.','보기와 ②는 be동사 뒤에서 주어를 설명하는 보어.'),
      choice('6','to부정사의 역할이 같은 것끼리 짝지어진 것은?',[
        'His job is to drive buses. / To eat healthy is important.',
        'Does he love to solve puzzles? / To read webtoons is my hobby.',
        'To learn about history is fun. / Do you plan to go to the concert?',
        'I want to do well on the exam. / The boy’s dream is to win a gold medal.',
        'My sister hopes to win the song contest. / What do you want to say?'
      ],5,'','⑤는 hopes와 want의 목적어. ① 보어/주어, ② 목적어/주어, ③ 주어/목적어, ④ 목적어/보어.'),
      choice('7','[동사]를 괄호 안의 말로 바꿀 수 없는 것은?',[
        'I [hope] to see you again. (want)','She [wants] to take a cooking class. (decides)',
        'They didn’t [like] to go to bed early. (enjoy)','Did you [decide] to buy the new phone? (plan)',
        'He [plans] to go to the library tomorrow. (hopes)'
      ],3,'','enjoy는 동명사를 취하므로 enjoy going으로 바꿔야 함.'),
      short('8(1)','친구와 나는 이번 주말에 놀이공원에 갈 계획이다. (plan, go)','plan to go','My friends and I _____ to the amusement park.','plan to go: 갈 계획이다.'),
      short('8(2)','우리는 롤러코스터 타기를 희망한다. (hope, ride)','hope to ride','We _____ the roller coaster.','hope to ride: 타기를 희망하다.'),
      short('8(3)','우리는 사진을 많이 찍고 싶다. (want, take)','want to take','We _____ lots of pictures.','want to take: 찍고 싶다.')
    ]},
    {id:'exam188',title:'단원평가 1–7',source:'단원평가 · 188쪽',questions:[
      choice('1','빈칸에 들어갈 말로 알맞은 것은?',['point','shower','challenge','waste','leftover'],3,'Join the walking _____ and take a walk every day.','walking challenge: 걷기 챌린지.'),
      choice('2','두 빈칸에 공통으로 들어갈 말은?',['buy','over','late','close','empty'],5,'The glass is half _____.\nPlease _____ the trash can.','empty는 형용사로 비어 있는, 동사로 비우다.'),
      choice('3','대화의 빈칸에 들어갈 말은?',['make','recycle','produce','buy','use'],2,trashTalk,'캔과 병을 재활용하여 쓰레기를 줄인다는 뜻.'),
      choice('4','대화의 trash와 바꿔 쓸 수 있는 것은?',['idea','waste','floor','story','container'],2,trashTalk,'trash와 waste는 쓰레기라는 뜻.'),
      choice('5','B의 말에 담긴 의도는?',['위로','거절','동의','명령','충고'],2,'A: Can you please carry this box to my car?\nB: I’m really sorry, Dad, but I’m late for my class.\nA: Oh, I see. I’ll ask somebody else.','수업에 늦었다는 이유로 부탁을 거절함.'),
      choice('6','대화가 이루어지는 장소는?',['교실','카페','병원','공장','마트'],2,cafe,'smoothie 주문과 inside the café에서 확인.'),
      short('7','스무디를 유리잔에 주는 이유가 되도록, 대화에서 말을 찾아 빈칸을 완성하세요.','use single-use plastic cups inside the café','They don’t _____.\n\n'+cafe,'카페 안에서는 일회용 플라스틱 컵을 사용하지 않기 때문. inside the café까지 써야 함.')
    ]},
    {id:'exam189',title:'단원평가 8–13',source:'단원평가 · 189쪽',questions:[
      choice('8','대화 후 이어질 B의 행동은?',['정원에 물 주기','켜진 전등 끄기','뛰어가서 물 잠그기','친구의 가방 들어 주기','다른 사람에게 길 알려 주기'],3,'A: Look. Somebody forgot to turn off the water.\nB: Again? People are so forgetful.\nA: I know. Can you run over there and turn off the water?\nB: Sure. No problem.','run over there and turn off the water: 저기로 뛰어가서 물을 잠그다.'),
      short('9','빈칸에 들어갈 말을 대화에서 찾아 한 단어로 쓰세요.','trash',plogging,'plogging은 조깅하며 쓰레기(trash)를 줍는 활동.'),
      choice('10','대화의 내용과 일치하지 않는 것은?',['유나는 동아리 회원들과 함께 있다.','Alex는 플로깅이라는 말을 못 알아들었다.','유나의 동아리는 토요일 아침마다 모인다.','Alex는 유나의 동아리에 가입할 것이다.','유나는 무거운 쓰레기봉투를 들고 있다.'],4,plogging,'Alex는 I’ll think about it이라고 했으므로 가입을 확정하지 않음.'),
      choice('11','빈칸에 들어갈 수 없는 것은?',['enjoyed','planned','hoped','decided','wanted'],1,'We _____ to watch the show.','enjoy는 to부정사가 아닌 동명사 watching을 목적어로 취함.'),
      choice('12','빈칸에 들어갈 말은?',['to write books','be a soccer player','cook for his family','sang with his friend','helping sick people'],1,'Taeho wants _____.','want의 목적어로 to + 동사원형이 필요.'),
      choice('13','괄호 안의 말을 순서대로 바르게 짝지은 것은?',['this — do','this — to do','that — do','that — to do','that — doing'],4,'I guess (this / that) it’s all right.\nWhat do you plan (do / to do / doing) this Sunday?','guess 뒤 절을 연결하는 that, plan 뒤 목적어 to do.')
    ]},
    {id:'exam190',title:'단원평가 14–19',source:'단원평가 · 190쪽',questions:[
      choice('14','어법상 틀린 것은?',['I decided to fix it.','I wanted to buy a bike.','I hope to see you soon.','They want eating pizza for dinner.','Ted plans to go camping this weekend.'],4,'','want eating이 아니라 want to eat.'),
      choice('15','[that]의 쓰임이 나머지와 다른 것은?',['I heard [that] he is a teacher.','I think [that] you are really fast.','I believe [that] girl is from Canada.','Jane doesn’t think [that] math is difficult.','Tom guesses [that] the movie is exciting.'],3,'','③은 girl을 꾸미는 지시형용사(저). 나머지는 절을 연결하는 접속사.'),
      short('16','우리는 이번 주말에 쇼핑하러 갈 계획이다. (go)','to go','We plan _____ shopping this weekend.','plan to go shopping. 빈칸에는 to go만 씀.'),
      choice('17','글에 이어질 내용은?',['분리수거를 제대로 하는 법','제로 웨이스트 챌린지 사례','제로 웨이스트의 의미와 유래','제로 웨이스트 챌린지의 효과','환경 보호 챌린지를 홍보하는 방법'],2,intro,'참여하고 경험을 공유하라고 했으므로 이어지는 내용은 참여 사례.'),
      choice('18','빈칸의 제목으로 알맞은 것은?',['Foods for Health','Save the Earth','Eat Less Move More','Reduce Food Waste','Leftover Recipes'],4,olivia,'남은 음식을 가져와 활용하여 음식물 쓰레기를 줄이는 사례.'),
      choice('19','글의 내용과 일치하는 것은?',['Olivia의 생일은 지난주 일요일이었다.','Olivia는 자신의 생일에 가족과 외식했다.','외식 후 남은 음식은 그리 많지 않았다.','Olivia는 그다음 날 남은 음식으로 저녁을 만들었다.','인터넷에서 남은 음식 보관법을 찾을 수 있다.'],2,olivia,'생일은 토요일, 남은 음식은 많았음. 다음 날 점심을 만들었고 인터넷에는 요리 아이디어가 있음.')
    ]},
    {id:'exam191',title:'단원평가 20–25',source:'단원평가 · 191쪽',questions:[
      choice('20','주어진 문장이 들어갈 위치는?',['①','②','③','④','⑤'],2,'주어진 문장: I learned that reusing is important for zero-waste living.\n\n'+domingo,'다시 생각한 뒤 재사용의 중요성을 배웠다는 내용, 그 결과 So로 수선 결심이 이어짐.'),
      short('21','(A)와 (B)의 it이 공통으로 가리키는 것을 글에서 찾아 두 단어로 쓰세요.','my bag',domingo,'강아지가 찢은 내 가방(my bag)을 수선해서 다시 사용함.'),
      short('22','(A) I didn’t의 didn’t 뒤에 생략된 말을 쓰세요.','use food delivery services',emma,'앞 문장의 use food delivery services가 생략됨. services는 복수.'),
      short('23','(B)에 들어갈 말을 한 단어로 쓰세요.','that',emma,'heard 뒤 목적어절을 연결하는 접속사 that.'),
      choice('24','글의 흐름상 어색한 문장은?',['①','②','③','④','⑤'],4,minsu,'포인트를 돈처럼 사용할 수 있다는 설명에서 돈보다 더 유용하다는 비교는 흐름과 맞지 않음.'),
      short('25','질문에 완전한 영어 문장으로 답하세요.',[
        'He put some plastic and glass bottles into a recycling machine.',
        'He put plastic and glass bottles into a recycling machine.',
        'He put some plastic and glass bottles into the recycling machine.',
        'He put plastic and glass bottles into the recycling machine.',
        'He put some plastic and glass bottles into the machine.',
        'He put plastic and glass bottles into the machine.',
        'He put some plastic and glass bottles in a recycling machine.',
        'He put plastic and glass bottles in a recycling machine.',
        'He put some plastic and glass bottles.',
        'He put plastic and glass bottles.'
      ],'Q: What did Minsu put into a recycling machine?\n\n'+minsu,'플라스틱병과 유리병을 넣음. He put …처럼 주어와 동사를 포함해 답함. 예시와 표현이 다른 답은 해설을 보고 선생님에게 확인하세요.')
    ]}
  ];
})();
