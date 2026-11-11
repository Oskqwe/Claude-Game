/* The Bulldog — Act I: everyday politics of a childhood (1884–1886).
   Owner's steer (11 Nov 2026): before the niche episodes, let the player show who this character is
   through ordinary political events of the period, rooted in history. These five scenes come before
   the routes divide ("What is to be done with the boy", 1887), so every Bulldog life plays them.
   Each one sets a real public event of the day around a child who could have been there. The events
   are sourced in data/facts.js; the child's part is invented, and each `real` note says so. */
(function () {
  const TM = window.TM;
  const act = TM.ACTS.bulldog[1];

  act.scenes.push(
    /* ─────────── July 1884: the franchise demonstration ─────────── */
    { id: 'franchise-1884', t: 1884.55, year: 1884, title: 'The Lords and the people',
      venue: { plate: 'city', label: 'The railings of Hyde Park, London' },
      text: 'July 1884. The Lords have thrown out the Bill that would give the vote to two million farm labourers and miners, and today working London answers them. Banners, brass bands and trade societies stream along Piccadilly towards Hyde Park, a column that takes hours to pass. Woom has brought you to watch from the railings. Your father\'s party leads the Lords. A docker beside you, sleeves rolled, asks whose boy you are.',
      basis: 'The great Hyde Park demonstration of 21 July 1884 against the Lords\' rejection of the Franchise Bill, which became the Third Reform Act.',
      real: 'On 21 July 1884 a vast procession marched to Hyde Park in protest at the House of Lords\' rejection of the Franchise Bill; a compromise followed, and the Third Reform Act passed that year. Nothing records the young Churchill there; his part in this scene is invented.',
      check: 'corroborated', facts: ['franchise-1884'],
      choices: [
        { label: 'Tell him, and say your father is for the working man too', effects: '@father+2 loyalty+1',
          roll: { stat: 'reputation', diff: 45,
            pass: { effects: 'press+2 rep+2', result: 'The docker roars with laughter and swings you onto his shoulders. "Here\'s a Tory for the vote," he tells his mates, and you ride half a furlong of the procession above the crowd.', diary: 'Rode on a docker\'s shoulders in Piccadilly. They cheered Papa\'s name, I think.' },
            fail: { effects: 'rep-1 @woom-1', result: 'Your father\'s name draws hisses from the men around you. Woom takes you firmly by the collar and walks you home by the back streets.', diary: 'They hissed Papa. I did not understand why, and Woom would not say.' } } },
        { label: 'Ask him why he wants the vote, and listen to the answer', effects: 'state+1 cap+2 #listener',
          result: 'He tells you about a brother in a Durham pit who pays rates and has no vote, and a landlord who has six. You ask questions until the band has passed. He shakes your hand at the end as if you were a man.',
          diary: 'A docker explained the franchise to me better than any master. A man in a pit has no vote. That cannot be right.' },
        { label: 'Tell him the Lords are right, and the mob should wait its turn', effects: 'order+2 steel+1 rep-1',
          result: 'He looks at you for a long moment, then turns back to the procession without a word. Woom says you were very rude. You feel you were very brave, and are not sure which is true.',
          diary: 'Told a docker the Lords were right. He did not argue. I think he thought me not worth it.' },
        { label: 'Slip Woom\'s hand and march with the miners to the Park', effects: 'temper+2 order-1 @woom-3',
          roll: { stat: 'health', diff: 40,
            pass: { effects: 'cap+2 #ran-off-1884', result: 'You march the whole way under a Northumberland banner and hear the speeches from the carts. A policeman returns you to a white-faced Woom at dusk.', diary: 'Marched with the miners to Hyde Park. Heard six speeches. Woom cried. I am sorry for that part only.' },
            fail: { effects: 'health-5 @woom-2', result: 'The crowd at the gates closes over you. You are knocked down, trodden on, and found an hour later by a constable with a bloody knee and no hat.', diary: 'Lost in the crowd. Knee cut. They were not angry with me, only with the Lords.' } } },
      ] },

    /* ─────────── February 1885: Khartoum ─────────── */
    { id: 'gordon-1885', t: 1885.1, year: 1885, title: 'Too late for Gordon',
      venue: { plate: 'school', label: 'The schoolroom, Brighton' },
      text: 'February 1885. The newsboys on the front are shouting it: Khartoum has fallen and General Gordon is dead, killed two days before the relief steamers came in sight of the walls. The telegrams are read aloud at prayers. In the streets the Grand Old Man has become the Murderer of Gordon. Miss Thomson sets the school a composition on the lesson of Khartoum. You are ten, and you know exactly what you think.',
      basis: 'The fall of Khartoum (26 January 1885) and the death of Gordon; the news reached London on 5 February. The young Churchill was then at school in Brighton.',
      real: 'The news of Khartoum\'s fall reached London on 5 February 1885 and caused a storm against Gladstone\'s government, which was blamed for sending the relief too late. The composition is invented. Churchill rode at Omdurman in 1898, the campaign that retook the Sudan.',
      check: 'corroborated', facts: ['gordon-1885'],
      choices: [
        { label: 'Write that England broke faith with a brave man, and must avenge him', effects: 'empire+2 steel+1 #gordon',
          result: 'Four pages, much underlined. Miss Thomson gives it the prize and reads the last paragraph aloud. You resolve, privately, to go to the Sudan when you are grown.',
          diary: 'Composition on Gordon won the prize. One day I shall see Khartoum.' },
        { label: 'Write that he disobeyed his orders, and paid for it', effects: 'order+2 empire-1 cap+1',
          result: 'Miss Thomson marks it fairly but reads none of it aloud. The other boys call you a Radical for a week. You find you do not mind being alone in an argument.',
          diary: 'They call me a Radical. A soldier must obey orders. Gordon did not. I will not take it back.' },
        { label: 'Write about the people of Khartoum, whom no one mentions', effects: 'state+1 empire-1 rep+1 #other-side',
          roll: { stat: 'reputation', diff: 40,
            pass: { effects: 'cap+2', result: 'You write about the townspeople starving through a siege that was not their quarrel. Miss Thomson writes "original" in the margin, and later sends it to your mother.', diary: 'Wrote about the people inside the walls. Miss T. says it was original. I meant it to be true.' },
            fail: { effects: 'rep-1', result: 'Miss Thomson says it is unpatriotic and makes you write it again. You write it again, the same, in a neater hand.', diary: 'Made to write it twice. Wrote the same thing twice.' } } },
        { label: 'Refuse to write it, and draw the campaign as a battle map instead', effects: 'temper+2 order-1',
          roll: { stat: 'temper', diff: 50,
            pass: { effects: 'cap+1 #tactician', result: 'Your map shows the desert route, the river route and where you would have sent the camels. Miss Thomson, despite herself, pins it to the wall.', diary: 'Drew the whole Nile campaign. Wolseley went the wrong way. Pinned on the wall!' },
            fail: { effects: 'rep-1', result: 'A map is not a composition. You write lines all Saturday and miss the riding.', diary: 'Lines instead of riding. The map was better than any composition.' } } },
      ] },

    /* ─────────── August 1885: the Primrose League ─────────── */
    { id: 'primrose-1885', t: 1885.6, year: 1885, title: 'The Primrose fête',
      venue: { plate: 'school', label: 'A Primrose League fête, Oxfordshire' },
      text: 'August 1885. An election is coming, the first in which farm labourers will vote, and the Primrose League your father helped to found holds a fête on the lawns of a great house. Tea tents, a brass band, a coconut shy, three thousand villagers in their Sunday best. Ladies in primrose sashes enrol them as Knights and Dames. Your mother is selling badges. A hay cart serves as the platform, and the speaker is late.',
      basis: 'The Primrose League, founded in 1883 by Lord Randolph Churchill and others in Disraeli\'s memory, and its fêtes before the 1885 general election, the first under the widened franchise.',
      real: 'Lord Randolph Churchill was among the League\'s founders in 1883; by the late 1880s it had hundreds of thousands of members and drew rural voters to the Conservatives with fêtes and entertainments. The general election of late 1885 was the first fought on the new franchise. The fête here is invented.',
      check: 'corroborated', facts: ['primrose-league', 'franchise-1884'],
      choices: [
        { label: 'Climb onto the hay cart and speak until he comes', effects: 'temper+2 press+1',
          roll: { stat: 'temper', diff: 55,
            pass: { effects: 'press+3 rep+3 #boy-orator', result: 'You tell three thousand villagers about Gordon, the Empire and your father, in that order. The lisp hardly shows. They cheer a ten-year-old for five minutes, and the speaker, arriving, has to follow you.', diary: 'Spoke from a hay cart to three thousand. They cheered. I could live on that sound.' },
            fail: { effects: 'rep-2 @father-3', result: 'The lisp catches on the first sentence and a farm boy mimics it. You climb down scarlet. Your father, told of it later, is not amused.', diary: 'Tried to speak. The lisp. They laughed. I shall practise until they cannot.' } } },
        { label: 'Help your mother sell badges to the farmers\' wives', effects: '@mother+5 fav+2',
          result: 'She lets you take the money and keep the book. By teatime you have enrolled forty-one Dames, and she kisses you in front of a duchess.',
          diary: 'Forty-one Dames enrolled. Mamma kissed me in front of everyone.' },
        { label: 'Go round the tea tents and ask the labourers how they mean to vote', effects: 'cap+2 state+1 #listener',
          result: 'Most will vote as the squire does. Some will vote for the man who promised three acres and a cow. One old shepherd says he will vote for whoever mends the bridge. You write it all down.',
          diary: 'Three acres and a cow is a better speech than any of ours. Must tell Papa.' },
        { label: 'Take over the coconut shy and run it for profit', effects: 'money+2 order-1 rep-1',
          result: 'You raise the price and lower the odds. By evening you have three pounds and a reputation among the stable boys. The agent makes you hand it all to the League.',
          diary: 'Made three pounds at the shy. The League took it. Politics is expensive.' },
      ] },

    /* ─────────── February 1886: the West End riots ─────────── */
    { id: 'riots-1886', t: 1886.00005, year: 1886, title: 'Windows in Pall Mall',
      venue: { plate: 'club', label: 'St James\'s Street, London' },
      text: 'February 1886. A day in London with Woom, for the dentist. Down from Trafalgar Square comes a crowd of unemployed men, thousands of them, after a meeting the police expected to be quiet. As they pass the clubs in Pall Mall, gentlemen jeer from the windows. Stones answer. Glass is crashing all along St James\'s Street, and shops are being looted in Piccadilly. Woom pulls you into a doorway. A man with a bleeding hand stumbles in beside you.',
      basis: 'The West End riots of 8 February 1886, after a meeting of the unemployed in Trafalgar Square.',
      real: 'On 8 February 1886 a crowd leaving a meeting of the unemployed in Trafalgar Square was jeered from club windows in Pall Mall, broke windows and looted shops in St James\'s Street and Piccadilly. The Metropolitan Police Commissioner resigned over the handling. The young Churchill\'s presence is invented.',
      check: 'corroborated', facts: ['west-end-riots'],
      choices: [
        { label: 'Give him your handkerchief and ask him what he wants', effects: 'state+2 @woom+2 #listener',
          result: 'Work, he says, and bread for three children in Deptford, and not to be laughed at by men who have never wanted either. He ties up his hand with your handkerchief and is gone into the crowd.',
          diary: 'A man in the riot wanted work and not to be laughed at. The club men laughed. I think I know who started it.' },
        { label: 'Shout for a policeman', effects: 'order+2 steel+1',
          result: 'There are none to be had. The police are guarding the wrong street. You learn that day how thin the line of order is, and how slowly the State moves when it is needed.',
          diary: 'Not a constable in St James\'s. The mob had the West End for an hour. Order is thinner than they tell you.' },
        { label: 'Watch everything, and write it up that night', effects: 'cap+2 press+1 #reporter',
          result: 'Twelve pages, with a map of the route and a list of the broken windows by club. Woom says it is the best thing you have ever written and makes you promise not to show your mother.',
          diary: 'Wrote up the riot. Twelve pages. Woom says I have a gift for trouble, and for describing it.' },
        { label: 'Say the gentlemen deserved their broken windows', effects: 'order-2 temper+1 @woom-2',
          result: 'You say it loudly, in the doorway, and a passing clubman tells you to hold your tongue. Woom agrees with him. You do not.',
          diary: 'Said the club men deserved it. A clubman told me to hold my tongue. I shall not.' },
      ] },

    /* ─────────── December 1886: the resignation ─────────── */
    { id: 'resignation-1886', t: 1886.95, year: 1886, title: 'Papa resigns',
      venue: { plate: 'city', label: 'Connaught Place, London' },
      text: 'December 1886. For five months your father has been Chancellor of the Exchequer and Leader of the House, at thirty-seven. Now, home for Christmas, you read in the newspaper that he has resigned over the cost of the Army and Navy, sure the Cabinet would beg him to stay. Lord Salisbourne has accepted. Callers come and go from the study, and nobody explains anything. Jack asks you whether Papa is finished.',
      basis: 'Lord Randolph Churchill\'s resignation as Chancellor in December 1886, which ended his career in office.',
      real: 'Lord Randolph Churchill resigned as Chancellor of the Exchequer in late December 1886 in a dispute over the Army and Navy estimates, expecting to be recalled. Salisbury accepted the resignation and he never held office again. The family lived in Connaught Place; the boy\'s part here is invented.',
      check: 'corroborated', facts: ['randal-resigns'],
      choices: [
        { label: 'Go to the study and tell your father he was right', effects: 'loyalty+2',
          roll: { stat: '@father', diff: 55,
            pass: { effects: '@father+8 #papas-boy', status: { father: 'Let you sit in the study the day he fell.' }, result: 'He looks up from his letters, and for once does not send you away. You sit by the fire while he writes. Before you go he says that one day you will understand what was done to him.', diary: 'Sat with Papa in the study the day he resigned. He let me stay.' },
            fail: { effects: '@father-4', status: { father: 'Sent you out of the study the day he fell.' }, result: 'He says, without looking up, that it is not a matter for schoolboys, and rings for the footman.', diary: 'Papa sent me out. I wanted to tell him he was right.' } } },
        { label: 'Tell Jack firmly that Papa will be back, and believe it', effects: 'loyalty+1 @jack+5',
          result: 'Jack believes you, because you are his brother. You go on believing it for a long time, longer than anyone in the family.',
          diary: 'Told Jack that Papa will be Prime Minister yet. I am sure of it.' },
        { label: 'Ask your mother what really happened', effects: '@mother+4 cap+2 #learns-the-game',
          result: 'She explains it plainly, as if you were grown: he offered to go, expecting to be begged to stay, and nobody begged. He had forgotten that the Prime Minister could find another Chancellor. You never forget it.',
          diary: 'Mamma says Papa played his last card and they let him. Never resign unless you mean it.' },
        { label: 'Decide that you will never throw away office in a temper', effects: 'order+1 steel+1 temper-2 #lesson-1886',
          result: 'You say nothing to anyone. But you make a promise to yourself at the nursery window, looking at the fog over the Park, and it is one you will mostly keep.',
          diary: 'Made myself a promise today. No one shall know what it is.' },
      ] },
  );
})();
