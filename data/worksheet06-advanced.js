/* 5과 학습지 폴더에 함께 들어 있던 Lesson 6 Vocabulary (Advanced). */
(() => {
  const s=(no,prompt,answer,passage='',explanation='')=>({no,prompt,answer:Array.isArray(answer)?answer:[answer],passage,explanation});
  const definitions=[
    ['leftover','food remaining after a meal',['남은 음식','남은음식']],
    ['challenge','something that needs great mental or physical effort to be done successfully',['도전','과제']],
    ['plog','to pick up trash while jogging',['조깅하며 쓰레기를 줍다','조깅하면서 쓰레기를 줍다','플로깅하다']],
    ['produce','to make or grow something',['생산하다','만들다']],
    ['container','an object for holding things, such as a can, box, or bottle',['용기','그릇','용기 그릇']],
    ['recycle','to put old paper, glass, or other materials through a special process so that they can be used again',['재활용하다']],
    ['eat out','to eat in a restaurant',['외식하다']],
    ['in return','as a response, exchange, or reward for something',['대가로','보답으로','답례로']]
  ];
  LESSONS.find(l=>l.id===6).worksheets.push({id:'advanced',title:'심화 어휘',source:'Vocabulary (Advanced) · 3쪽',note:'보기: in return / recycle / challenge / leftover / produce / container / plog / eat out. A는 영어 단어와 우리말 뜻을 따로 답합니다. C4는 원문의 한국어 “저녁식사”와 영어 lunch가 불일치하나 빈칸 정답은 right after입니다.',questions:[
    ...definitions.flatMap(([en,definition,ko],i)=>[
      s(`A${i+1} 영어`,'영영풀이에 맞는 말을 보기에서 골라 쓰세요.',en,definition,`${en}: ${ko[0]}.`),
      s(`A${i+1} 뜻`,`${en}의 우리말 뜻을 쓰세요.`,ko,'',`${en}: ${ko[0]}. 표현이 다르면 해설과 비교해 확인하세요.`)
    ]),
    s('B1','보기: environment / delivery / label / sew / reduce','reduce','We should _____ waste.','reduce waste: 쓰레기를 줄이다.'),
    s('B2','보기: environment / delivery / label / sew / reduce','sew','I can _____ a button on my shirt.','sew a button: 단추를 바느질하다.'),
    s('B3','보기: environment / delivery / label / sew / reduce','delivery','The pizza _____ arrived on time.','pizza delivery: 피자 배달.'),
    s('B4','보기: environment / delivery / label / sew / reduce','label','He took off the _____ from the bottle.','병의 라벨을 떼어 냈다는 뜻.'),
    s('B5','보기: environment / delivery / label / sew / reduce','environment','The _____ has plants, animals, and water.','environment: 환경.'),
    s('C1','나는 잘 잊어버려서 항상 메모를 한다.','forgetful','I am _____, so I always write things down.','forgetful: 잘 잊어버리는.'),
    s('C2','일회용 비닐봉지는 환경에 좋지 않다.','single-use','_____ plastic bags are bad for the environment.','single-use: 일회용의.'),
    s('C3','나는 종종 플라스틱병을 재사용하여 식물에 물을 준다.','reuse','I often _____ plastic bottles to water my plants.','재사용하다는 reuse. 사진의 필기 reduce는 오답.'),
    s('C4','식사 후 바로 우리는 공원에 갔다.','right after','We went to the park _____ lunch.','right after: ~ 직후에. 원문의 lunch는 점심이라는 뜻.'),
    s('C5','나는 친구의 숙제를 도와주었고, 그 대가로 그는 내 프로젝트를 도와주었다.','in return','I helped my friend with his homework, and _____, he helped me with my project.','in return: 대가로, 보답으로.')
  ]});
})();
