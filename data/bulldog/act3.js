/* The Bulldog — Act III: The Test (1938–1951), part 1: Munich to the fall of France. DRAFT.
   Spine: Churchill 1938–40 (RESEARCH.md §A, §B). Blended in: Duff Cooper (Duff Cowper) resigns over
   Munich; Amery (Leo Emery) seated at Munich, "speak for England" on 2 Sept 1939, Cromwell in the
   Norway debate; Keyes (Sir Roger Keys) and the Trondheim plan, the uniform in the Chamber; Bracken
   (Bracknell) and the silence of 9 May; Fitzroy Maclean, a serving officer elected in 1941 (part 2).
   Branch flags: !pm (the player is Prime Minister), !peer-war (Hallifield is PM, the player runs
   defence), !peace-1940 (terms taken in May 1940; see act3-war.js). */
(function () {
  const TM = window.TM;

  Object.assign(TM.PEOPLE, {
    pm: { name: 'Mr Nevil Chambers', role: 'Prime Minister' },
    hallifield: { name: 'Viscount Hallifield', role: 'Foreign Secretary' },
    margrave: { name: 'Captain David Margrave', role: 'Government Chief Whip' },
    cowper: { name: 'Duff Cowper', role: 'First Lord of the Admiralty, until Munich' },
    emery: { name: 'Leo Emery', role: 'Member for Sparkbrook' },
    astley: { name: 'Mr Clement Astley', role: 'Leader of the Labour Party' },
    greenhalgh: { name: 'Mr Arthur Greenhalgh', role: 'Deputy Leader of the Labour Party' },
  });

  const D = (chance, text, headline) => ({ chance, text, headline });

  TM.ACTS.bulldog[3] = {
    title: 'Act III · The Test',
    span: '1938–1951',
    intro: 'September 1938. Europe is waiting for war over Czechoslovakia, and the Prime Minister has flown three times to see Hitler. You are sixty-three, out of office for nine years, warning about Germany to a House that has heard you warn about too many things. The next thirteen years will decide whether you are remembered at all, and for what.',
    start: { year: 1938 },
    scenes: [],
  };
  const act = TM.ACTS.bulldog[3];

  act.scenes.push(
    { id: 'munich', t: 1938.76, year: 1938, title: 'Peace for our time', if: '!mp',
      venue: { plate: 'gallery', label: 'The House of Commons, October 1938' },
      doc: { type: 'paper', masthead: 'The Westminster Courier', date: '1 October 1938', headline: 'PRIME MINISTER BACK WITH PEACE', standfirst: 'Cheering crowds in Downing Street. Germany to take the Sudetenland in stages.', body: 'The Prime Minister returned from Munich last night to scenes of enthusiasm not seen since the Armistice. He appeared on the balcony of the Palace with Their Majesties. More than twenty thousand letters of thanks are said to have reached Downing Street.' },
      text: 'The Prime Minister has come back from Munich with an agreement: Czechoslovakia will give Hitler the Sudetenland, and the Czechs were not asked. The country is giddy with relief. Duff Cowper has resigned from the Admiralty in protest and made a fine speech. Now the House is to vote on the agreement. Your own constituency association is watching how you vote.',
      basis: 'The Munich debate and division, 3–6 October 1938; Duff Cooper\'s resignation; Churchill\'s and Amery\'s refusal to support the agreement.',
      real: 'The Commons approved Munich by 366 to 144. Churchill, Eden, Amery, Duff Cooper and about thirty Conservatives abstained, staying in their seats. Churchill called it a total and unmitigated defeat. Duff Cooper had resigned as First Lord on 3 October.',
      check: 'research', facts: ['munich-vote', 'duff-resign'],
      choices: [
        { label: 'Abstain, and stay in your seat', historical: true, effects: 'steel+3 loyalty-3 fav-8 seat-6 @cowper+8 !munich-rebel', result: 'You make the speech of your life, and sit still while the House divides. Thirty Tories sit with you. The Whips take down every name.', diary: 'Sat in my place with thirty others. A total defeat, I told them. They did not want to hear it.' },
        { label: 'Vote against the Government', effects: 'steel+4 loyalty-6 fav-14 seat-10 press+4 !munich-rebel #rebel', result: 'You walk into the No lobby with Labour. You are one of very few Tories there. The local paper calls for your resignation.', diary: 'Voted against. With the socialists. The association will want my head.' },
        { label: 'Vote with the Government, and rearm', effects: 'steel-2 loyalty+5 fav+10 seat+6', result: 'You support the agreement as time bought. Some of your friends do not speak to you for a month.', diary: 'Voted for Munich, as a breathing space. I hope to God we breathe.' },
      ] },

    { id: 'munich-lobby', t: 1938.77, year: 1938, title: 'The Lobby after Munich', kind: 'walk', place: 'lobby', if: '!mp',
      enter: 'Walk into the Lobby', skip: 'Go straight home', leaveLabel: 'Leave the Lobby',
      venue: { plate: 'gallery', label: 'The Members\' Lobby, October 1938' },
      text: 'The division is over and the Lobby is full. The Government\'s supporters are pleased with themselves, and the rebels are standing in small groups, being looked at. The Chief Whip is by the door with his notebook. The man who resigned the Admiralty is surrounded by well-wishers. Leo Emery is by the statues, and Bracknell is waiting for you by the post office.',
      basis: 'The aftermath of the Munich vote: Margesson\'s pressure on the rebels; Duff Cooper, Amery and Bracken.',
      real: 'Margesson, the Chief Whip, kept a close watch on the Conservative rebels after Munich, and several faced trouble in their constituencies. The anti-appeasers met in two loose groups, around Eden and around Churchill.',
      check: 'research', facts: ['munich-vote', 'eden-1938'],
      leave: 'You leave by the side door into Old Palace Yard. Whatever you said tonight, the Whips have it written down.',
      leaveAlone: 'You go home without speaking to anyone. The papers note that you looked tired.',
      npcs: [
        { id: 'margrave', name: 'Captain David Margrave', role: 'Government Chief Whip', at: [-2.4, -10.4], face: 0.25,
          look: { coat: 0x15151a, hat: 'none', hair: 0x2a2520 },
          talk: { text: 'The Chief Whip, tall and smooth, looks at you as a man looks at an unpaid bill. He mentions, pleasantly, that associations have long memories and that candidates are chosen afresh before each election. He wonders whether you would like to say anything for the Prime Minister\'s ear.',
            choices: [
              { label: 'Tell him you will not be bullied', historical: true, effects: 'steel+2 loyalty-2 @margrave-10', status: { margrave: 'Has you marked as an enemy.' }, result: 'He smiles and writes something down. You hear the next week that your agent has had a letter from Central Office.', diary: 'Told Margrave I will not be bullied. He wrote it down.' },
              { label: 'Promise to keep your criticisms inside the party', effects: 'loyalty+3 fav+4 steel-1 @margrave+8', result: 'He is pleased, and says so. Your friends notice how quiet you are for the rest of the autumn.', diary: 'Made my peace with Margrave. For now.' },
            ] },
          after: 'The Chief Whip is talking to a nervous young Member by the door.' },
        { id: 'cowper', name: 'Duff Cowper', role: 'Resigned as First Lord', at: [5.6, -7.4], face: -0.7,
          look: { coat: 0x101014, hat: 'none', hair: 0x3a2a1c },
          talk: { text: 'Duff Cowper, flushed and cheerful, has given up a Cabinet seat and a salary he could not afford to lose. He says the speech was the best thing he has ever done, and that his wife will have to go back on the stage. He asks whether you will come and dine with the others on Thursday.',
            choices: [
              { label: 'Dine with him and the rebels', historical: true, effects: 'steel+2 loyalty-2 cap+3 @cowper+12', result: 'Thursday\'s dinner is noisy, gloomy and full of plans. You leave at two, with friends you did not have a week ago.', diary: 'Dined with Cowper\'s lot. We are a party within the party now.' },
              { label: 'Congratulate him and keep your distance', effects: '@cowper+4 fav+2', result: 'He takes your hand warmly. He does not ask again.', diary: 'Congratulated Cowper. Did not join him. Prudent.' },
            ] },
          after: 'Duff Cowper is laughing at something in a crowd of admirers.' },
        { id: 'emery', name: 'Leo Emery', role: 'Member for Sparkbrook', at: [-6.4, -1.6], face: 1.1,
          look: { coat: 0x22201e, hat: 'none', hair: 0x8c8278, moustache: 0x8c8278 },
          talk: { text: 'Leo Emery, small and pugnacious, who once pushed you into a school swimming pool, or was pushed, says he sat in his seat while the House stood and cheered the Prime Minister off to Munich, and felt like a man at a funeral. He wants to know what you mean to do if it comes to war in the spring.',
            choices: [
              { label: 'Plan with him for a government of all parties', effects: 'state+1 loyalty-2 @emery+10 @astley+4', result: 'You agree that only a government with Labour in it can fight a war. He knows the Labour men better than you do.', diary: 'Emery and I agree: a national government, with Labour, when it comes.' },
              { label: 'Tell him rearmament first, governments later', effects: 'steel+1 @emery+3', result: 'He nods, unconvinced, and goes off to write a memorandum.', diary: 'Emery is writing a memorandum. He always is.' },
            ] },
          after: 'Leo Emery is writing in a small notebook.' },
        { id: 'bracknell', name: 'Brendan Bracknell', role: 'Your shadow', at: [4.4, 3.2], face: -1.3,
          look: { coat: 0x2a2a30, hat: 'none', hair: 0xb04a1c },
          talk: { text: 'Bracknell has been counting heads. Thirty abstained; he thinks ten more would have, if the Whips had not frightened them. He says your association is the danger now, and that he has friends in the newspapers who could help, if you will let him loose.',
            choices: [
              { label: 'Let him loose on the newspapers', effects: 'press+6 @bracknell+6 fav-3', result: 'Within the week three papers carry leaders about the man who was right. Central Office is furious.', diary: 'Bracknell has been busy. Three leaders in my favour. He is a marvel.' },
              { label: 'Tell him to keep the papers out of it', effects: 'loyalty+2 @bracknell-3', result: 'He sulks for a day, then finds something else to do for you.', diary: 'Kept Bracknell on the leash. He hates it.' },
            ] },
          after: 'Bracknell is on the telephone in the corner, talking fast.' },
      ] },

    { id: 'outside-1938', t: 1938.8, year: 1938, title: 'From the Press Gallery', if: '~!mp',
      venue: { plate: 'gallery', label: 'The Press Gallery, October 1938' },
      text: 'You watch the Munich debate from the Press Gallery, where your newspaper pays you to describe what you would rather be doing. Below you, men you despise are winning the argument. The Oxford by-election is coming, fought on Munich and nothing else, and the anti-Munich side is looking for candidates for the next one. A war, you think, would empty the House of its comfortable men.',
      basis: 'The Munich by-elections of autumn 1938 (Oxford, Bridgwater); Fitzroy Maclean and Profumo, who entered the House as serving officers during the war.',
      real: 'The Oxford by-election of October 1938 was fought on Munich; Quintin Hogg won as the Munich candidate. At Bridgwater in November an independent anti-appeasement candidate won. Several later Members, such as Profumo in 1940 and Fitzroy Maclean in 1941, were elected while serving officers.',
      check: 'unchecked', facts: ['oxford-1938'],
      choices: [
        { label: 'Stand as an anti-Munich independent at the next by-election', effects: 'steel+3 loyalty-4 #independent', roll: { stat: 'press', diff: 55,
            pass: { effects: 'seat+35 cap+5 office=Member_of_Parliament !mp !munich-rebel', result: 'A farming seat in the West turns out its Tory and sends you instead. Your maiden speech is about the Sudeten Germans\' victims.', diary: 'Elected on Munich! The farmers did it. The Government is shaken.' },
            fail: { effects: 'seat+10 rep+3', result: 'You lose by a few hundred. The Government breathes again.', diary: 'Beaten. Close. The country is half awake.' } } },
        { label: 'Write the warnings the House will not hear', effects: 'press+6 money+4 steel+2', result: 'Your articles are syndicated in forty papers abroad and read in every embassy in London.', diary: 'Forty papers. Berlin reads me. So, I hope, does Downing Street.' },
        { label: 'Join the Territorials and wait', effects: 'steel+2 health+2 !territorial', result: 'You take a commission in the Territorial Army. If it comes, you will be in uniform when it does.', diary: 'A Territorial commission, at my age. They were short of officers.' },
      ] },

    { id: 'conscription-1939', t: 1939.33, year: 1939, title: 'The Military Training Bill', if: '!mp',
      venue: { plate: 'gallery', label: 'The House of Commons, April 1939' },
      text: 'Hitler has taken Prague, and Britain has guaranteed Poland. Now the Government proposes conscription in peacetime for the first time: six months\' training for men of twenty and twenty-one. Labour and the Liberals will vote against it. You have been demanding it for a year. Some say it is too little and too late; some say it is a provocation to Berlin.',
      basis: 'The Military Training Act 1939: Cabinet decision 27 April, royal assent 26 May; 87 per cent of Labour MPs voted against.',
      real: 'The Military Training Act received royal assent on 26 May 1939. Men of twenty and twenty-one were called up for six months\' training, with the first registration on 3 June. Labour opposed it. It was superseded by full conscription when war came.',
      check: 'research', facts: ['military-training'],
      choices: [
        { label: 'Vote for it, and say it is not enough', historical: true, effects: 'steel+3 war+3 fav+2', result: 'You vote for it and demand a Ministry of Supply as well. The Government gets both, late.', diary: 'Conscription at last. Six months. It should have been two years ago.' },
        { label: 'Demand full national service at once', effects: 'steel+5 war+4 fav-3 @astley-6', result: 'You speak for full national service now. The House thinks you a warmonger. By September the House will agree with you.', diary: 'Called for full service. Warmonger, they say. Let them.' },
        { label: 'Vote with Labour against it', effects: 'steel-3 order-2 @astley+8 war-4', result: 'You vote against, with Labour, on liberty. It passes anyway.', diary: 'Voted against conscription. Liberty first. I am not sure I was right.' },
      ] },

    { id: 'speak-for-england', t: 1939.67, year: 1939, title: 'Speak for England', if: '!mp',
      venue: { plate: 'gallery', label: 'The House of Commons, 2 September 1939' },
      text: 'Germany invaded Poland yesterday. Tonight the Prime Minister has spoken, and he has not said that Britain will go to war. He has talked of a conference. The House is appalled. Labour\'s leader is in hospital, and his deputy, Arthur Greenhalgh, rises to answer. As he does, the Tory benches are silent. Someone should tell him that he speaks for them too.',
      basis: 'The Commons on the evening of 2 September 1939: Amery\'s cry across the floor to Arthur Greenwood to "speak for England", and Greenwood\'s speech.',
      real: 'When Greenwood rose on 2 September 1939, Amery called out to him to speak for England. Greenwood did. Simon then led a deputation of ministers to tell Chamberlain that war must be declared, and it was, the next morning.',
      check: 'research', facts: ['speak-for-england'],
      choices: [
        { label: 'Call out to him across the floor', effects: 'steel+3 loyalty-3 rep+6 @greenhalgh+12 #spoke-for-england', result: 'Your voice carries across the floor. Greenhalgh looks up, nods, and speaks as if the whole House were behind him. By the morning, it is.', diary: 'Called to Greenhalgh to speak for England. He did. War tomorrow.' },
        { label: 'Go to the Prime Minister\'s room with the others', effects: 'loyalty+1 cap+4 @pm-4', result: 'You join the ministers and Members who go to tell the Prime Minister that he must act or fall. He acts.', diary: 'Went to see Chambers. He has agreed. War in the morning.' },
        { label: 'Sit still and let others do it', effects: 'temper-2', result: 'Someone on your benches calls out to Greenhalgh. It is not you. You remember that.', diary: 'Emery called out. I should have.' },
      ] },

    { id: 'admiralty-1939', t: 1939.68, year: 1939, title: 'Winston is back', if: '!mp',
      venue: { plate: 'whitehall', label: 'The Admiralty, 3 September 1939' },
      text: 'War. The Prime Minister has sent for you. After ten years in the wilderness, he offers you a seat in the War Cabinet and the Admiralty, the office you left in disgrace in 1915. The same chair, the same maps, perhaps the same mistakes. The Board signals the Fleet. Or he offers you something smaller, if you are thought too dangerous.',
      basis: 'Churchill\'s return as First Lord of the Admiralty on 3 September 1939; the Admiralty\'s signal to the Fleet.',
      real: 'Churchill became First Lord of the Admiralty and a member of the War Cabinet on 3 September 1939. The Admiralty is said to have signalled the Fleet that he was back; the signal\'s wording is disputed.',
      check: 'unchecked', facts: ['winston-back'],
      choices: [
        { label: 'Take the Admiralty', historical: true, requires: 'reputation>40|!munich-rebel', showLocked: true, effects: 'cap+10 fav+6 office=First_Lord_of_the_Admiralty !admiralty2 !minister', roll: { stat: 'reputation', diff: 35,
            pass: { effects: 'war+3 press+6', result: 'You walk into the Admiralty at six in the evening. The octagonal table is where you left it. The Fleet goes to war under you for the second time.', diary: 'The Admiralty again. The same room. I have been away twenty-four years.' },
            fail: { effects: 'press-2', result: 'You take it, and find the Fleet smaller, older and more cautious than the one you left.', diary: 'The Admiralty. Fewer ships than in 1914. Worse ones.' } } },
        { label: 'Accept a lesser post and wait', effects: 'cap+5 loyalty+2 office=Minister_without_Portfolio !minister', result: 'You take a minor office and sit outside the War Cabinet, watching it lose the initiative.', diary: 'Minister without Portfolio. Without much else either.' },
        { label: 'Refuse to serve under the men of Munich', effects: 'steel+2 loyalty-5 press+4', result: 'You stay on the back benches, free and ignored, the conscience of a House that has stopped listening to its conscience.', diary: 'Refused office. They are relieved. So, God help me, am I.' },
      ] },

    { id: 'outside-1939', t: 1939.7, year: 1939, title: 'Into uniform', if: '~!mp',
      venue: { plate: 'veldt', label: 'A depot in the south of England' },
      text: 'The war has begun with nothing happening. The bombers have not come. Men are called up by age, and you are sixty-five, too old for the line. But the Territorials need officers, the Ministry of Information needs writers, and every constituency party is short of candidates now that the old men are retiring. You could put on a uniform, or find a seat.',
      basis: 'The Phoney War, 1939–40; wartime by-elections, uncontested under the electoral truce, which favoured party nominees.',
      real: 'The main parties agreed an electoral truce in September 1939: by-elections were left to the party holding the seat. Independents still stood and sometimes won from 1941.',
      check: 'unchecked', facts: ['electoral-truce'],
      choices: [
        { label: 'Seek a seat under the truce', effects: 'loyalty+3 fav+4', roll: { stat: 'favour', diff: 45,
            pass: { effects: 'seat+40 cap+4 office=Member_of_Parliament !mp', result: 'A safe seat falls vacant and the party gives it to you, unopposed under the truce.', diary: 'Elected unopposed. In wartime nobody minds who you are.' },
            fail: { effects: 'seat+5', result: 'The party prefers younger men in khaki.', diary: 'Passed over for a captain. Fair.' } } },
        { label: 'Join the Ministry of Information', effects: 'cap+3 press+4 office=Ministry_of_Information', result: 'You are given a desk, a typewriter and the job of explaining the war to neutrals. It is not easy, because nothing is happening.', diary: 'The Ministry of Information. We have nothing to inform anyone of.' },
        { label: 'Put on your uniform', effects: 'steel+3 rep+3 !territorial', result: 'You go to a depot in Kent and train men forty years younger than you.', diary: 'In uniform. The boys call me "Grandad". Not to my face.' },
      ] },

    { id: 'trondheim', t: 1940.28, year: 1940, title: 'The fjord', if: '!admiralty2|!route-navy',
      venue: { plate: 'whitehall', label: 'The Admiralty, April 1940' },
      text: 'Germany has seized Norway in a night. British troops are landing at Namsos and Andalsnes to take Trondheim from both sides, and making a mess of it. Sir Roger Keys, the hero of Zeebrugge, now a Member, has come in his admiral\'s uniform to beg leave to take old battleships straight up the fjord to Trondheim. The Naval Staff says the ships would be sunk by bombers.',
      basis: 'The Norwegian campaign, April 1940; Keyes\'s plan to force Trondheim fjord, which was refused.',
      real: 'Keyes pressed hard to lead a naval assault up Trondheim fjord, and was refused. The Allied landings around Trondheim failed and were withdrawn by early May. Keyes then spoke against the Government in the Norway Debate, in full uniform.',
      check: 'research', facts: ['keyes-trondheim'],
      choices: [
        { label: 'Refuse him, on the Staff\'s advice', historical: true, effects: 'loyalty+2 @keys-10 war-2', result: 'You refuse him, as kindly as you can. He goes away white with anger. The landings fail anyway.', diary: 'Refused Keys. The Staff was probably right. It feels like cowardice.' },
        { label: 'Let him go up the fjord', effects: 'steel+4 temper+3 @keys+15', roll: { stat: 'temper', diff: 60,
            pass: { effects: 'war+5 rep+6 press+6', result: 'The old battleships force the narrows at dawn and shell the forts. Trondheim falls. For a week, Britain has a victory.', diary: 'Keys took Trondheim! The bombers came late. Glory, for once.' },
            fail: { effects: 'war-6 rep-8', result: 'Two battleships are sunk in the fjord by dive-bombers, with most of their crews. The Norway disaster now has your name on it.', diary: 'Two battleships lost in the fjord. Keys survived. Many did not. My doing.' } } },
        { label: 'Call off Trondheim and hold Narvik', effects: 'temper-2 cap+2', result: 'You concentrate on Narvik in the north. It is the right decision and it takes too long.', diary: 'Narvik only. Sensible. Too late to be sensible.' },
      ] },

    { id: 'norway-debate', t: 1940.35, year: 1940, title: 'The Norway Debate', if: '!mp',
      venue: { plate: 'gallery', label: 'The House of Commons, 7–8 May 1940' },
      doc: { type: 'division', title: 'Division on the Adjournment, 8 May 1940', ayes: 281, noes: 200, note: 'Government majority 81, against a notional majority of over 200.' },
      text: 'Two days of debate on Norway, and the House has turned. Keys spoke in full uniform. Emery ended by quoting Cromwell to the Long Parliament: in the name of God, go. Labour has forced a division. The Prime Minister has appealed to his friends. Tonight someone must wind up for the Government, and every Member must decide whether to vote against it.',
      basis: 'The Norway Debate, 7–8 May 1940: Keyes in uniform, Amery\'s Cromwell, Chamberlain\'s appeal to his friends, Churchill winding up for the Government.',
      real: 'The Government won 281 to 200; about 41 of its supporters voted against and some 60 abstained. Churchill, as First Lord, wound up for the Government loyally. Chamberlain resigned on 10 May. The rebels included Amery, Keyes, Macmillan, Boothby, Hogg, Profumo and Nancy Astor.',
      check: 'research', facts: ['norway-vote'],
      choices: [
        { label: 'Wind up for the Government, loyally', historical: true, requires: '!admiralty2', showLocked: true, effects: 'loyalty+4 fav+8 cap+4 @pm+10', result: 'You defend the campaign, and the Prime Minister, with everything you have. The House admires the speech and votes against the man it defends. The majority falls to eighty-one.', diary: 'Defended Chambers. Did my duty. The majority is 81. He is finished, and I helped him fall standing.' },
        { label: 'Vote against the Government', effects: 'steel+3 loyalty-5 fav-6 cap+4 !norway-rebel', result: 'You walk into the No lobby with Keys, Emery, young officers in uniform and some forty others. In the Lobby someone sings Rule Britannia. The Government survives by eighty-one, and is finished.', diary: 'Voted against. The Government survives the vote and not the night.' },
        { label: 'Abstain', effects: 'loyalty-1', result: 'You stay in your seat with sixty others. The silence is as loud as the vote.', diary: 'Abstained. One of sixty. Neither brave nor loyal.' },
        { label: 'Vote with the Government', requires: '~!admiralty2', effects: 'loyalty+4 fav+6', result: 'You vote with the Government. The Chief Whip thanks you. He will not be Chief Whip much longer.', diary: 'Voted with the Government. It was not enough.' },
      ] },

    { id: 'ninth-may', t: 1940.355, year: 1940, title: 'The silence', if: '!mp !admiralty2',
      venue: { plate: 'whitehall', label: 'The Cabinet Room, 9 May 1940' },
      text: 'Four men in the Cabinet Room: the Prime Minister, the Chief Whip, Viscount Hallifield and you. Labour will not serve under the Prime Minister. He asks which of you two should succeed him. Hallifield is the obvious choice, the King\'s choice, the party\'s choice. Bracknell told you last night: whatever happens, say nothing. The silence goes on for a long time.',
      basis: '9 May 1940: the meeting of Chamberlain, Halifax, Margesson and Churchill; Bracken\'s advice to stay silent; Halifax declining.',
      real: 'Churchill stayed silent when Chamberlain asked who should succeed him. Halifax said that a peer could not lead in wartime, and Churchill became Prime Minister on 10 May, the day Germany attacked in the west.',
      check: 'research', facts: ['bracken-may1940', 'may-1940'],
      choices: [
        { label: 'Say nothing. Look out of the window', historical: true, effects: 'temper-1 @bracknell+8', roll: { stat: 'capital', diff: 25,
            pass: { effects: 'office=Prime_Minister !pm !was-pm cap+20 fav+10 press+10 war+5', result: 'Hallifield breaks the silence: a peer cannot lead the nation in war. On the 10th, as the Germans cross into Holland, the King sends for you.', diary: 'Prime Minister. I feel as if I were walking with destiny, and all my past life a preparation for this hour.' },
            fail: { effects: 'office=Minister_of_Defence !peer-war cap+10', result: 'The silence is broken by the Chief Whip: the party wants Hallifield. He accepts, and asks you to run the war under him as Minister of Defence.', diary: 'Hallifield is Prime Minister. I am to run the war for him. A strange harness.' } } },
        { label: 'Say Hallifield should have it', effects: 'loyalty+4 fav+6 office=Minister_of_Defence !peer-war cap+8 @hallifield+10', result: 'You say the generous thing. Hallifield accepts, a little sadly, and asks you to run the war under him.', diary: 'Proposed Hallifield. He is PM. I am his Minister of Defence. We shall see.' },
        { label: 'Say plainly that it must be you', effects: 'temper+3 loyalty-3 @hallifield-6', roll: { stat: 'reputation', diff: 55,
            pass: { effects: 'office=Prime_Minister !pm !was-pm cap+15 press+8 war+4', result: 'They are startled, then relieved that someone has said it. The King sends for you on the 10th.', diary: 'I said it. It is mine. God help us all.' },
            fail: { effects: 'office=Minister_of_Defence !peer-war cap+4 fav-6', result: 'It sounds like ambition, because it is. Hallifield is chosen. He keeps you, warily.', diary: 'Said it was me. Said it too loudly. Hallifield has it.' } } },
      ] },

    { id: 'may-1940-office', t: 1940.36, year: 1940, title: 'The new government', if: '!mp ~!admiralty2',
      venue: { plate: 'whitehall', label: 'Whitehall, May 1940' },
      text: 'The old Prime Minister has gone, the Germans are in France, and a new coalition with Labour is being made in a hurry. Places are being handed out in corridors. The new men want critics inside the tent: Information needs someone the press will believe, India needs a Secretary of State, and the commandos need a chief. Or you can stay where you are.',
      basis: 'The formation of the Churchill coalition, May 1940: Duff Cooper to Information, Amery to the India Office, Keyes later to Combined Operations.',
      real: 'Duff Cooper became Minister of Information, Amery Secretary of State for India (outside the War Cabinet), and Keyes the first Director of Combined Operations in June 1940. Bracken became Churchill\'s parliamentary private secretary.',
      check: 'research', facts: ['coalition-1940'],
      choices: [
        { label: 'The Ministry of Information', effects: 'cap+5 press+4 office=Minister_of_Information !minister !info', result: 'You are given the most hated ministry in London: censors, posters, and the BBC. Everyone wants more news and nobody wants to give it.', diary: 'Minister of Information. The press hates me already. That is the job.' },
        { label: 'The India Office', effects: 'empire+2 cap+5 office=Secretary_of_State_for_India !minister !india-office', result: 'You go to the India Office, outside the War Cabinet, with four hundred million people to answer for and no say in the war.', diary: 'India Secretary. The Viceroy writes long letters. Nobody else reads them.' },
        { label: 'Combined Operations: raiding the coast', requires: '!route-navy|#sailor|#brave', showLocked: true, effects: 'steel+3 cap+3 office=Director_of_Combined_Operations !minister !combined-ops', result: 'You are given the commandos and a free hand to raid the coast of Europe, with almost no ships to do it with.', diary: 'Combined Operations. Raids. At last, something with teeth.' },
        { label: 'Stay on the back benches', effects: 'loyalty-1 press+2', result: 'You stay out. Somebody must criticise the Government, now that everyone is in it.', diary: 'Stayed out. The only Opposition left.' },
      ] },

    { id: 'terms-1940', t: 1940.4, year: 1940, title: 'Terms', if: '!pm|!peer-war',
      venue: { plate: 'whitehall', label: 'The War Cabinet, 26–28 May 1940' },
      text: 'The army is trapped at Dunkirk. France is collapsing. Hallifield proposes asking Mussolini what terms Hitler would give: Britain might keep her fleet and her empire. Some in the War Cabinet think it madness to refuse even to ask. The Labour men are for fighting on. If the talk becomes known, the country may never fight again. You must decide what to say.',
      basis: 'The War Cabinet crisis of 25–28 May 1940: Halifax\'s proposal to approach Mussolini; Churchill\'s refusal; Attlee, Greenwood and Sinclair\'s support; the meeting of 25 outer ministers on 28 May.',
      real: 'Churchill refused to approach Mussolini. Attlee and Greenwood backed him and Chamberlain came round. On 28 May he addressed the 25 ministers outside the War Cabinet, who backed fighting on with enthusiasm. Halifax considered resigning but stayed.',
      check: 'research', facts: ['may-1940'],
      choices: [
        { label: 'Refuse to ask. Take it to the whole Cabinet', historical: true, effects: 'steel+5 war+6 rep+6 @hallifield-8 @astley+8', roll: { stat: 'capital', diff: 35,
            pass: { effects: 'cap+6', result: 'You call in the outer ministers and tell them that Britain will fight on. They cheer, slap your back, and some of them weep. Hallifield does not raise it again.', diary: 'Told the ministers we fight on. They cheered. Hallifield is silent. We go on to the end.' },
            fail: { effects: 'cap-6 !peace-1940 war-10', result: 'The Prime Minister overrules you, the Labour men waver, and a cable goes to Rome. Within the week there are talks in Lisbon.', diary: 'Overruled. A cable has gone to Rome. I shall resign if it comes to terms.' } } },
        { label: 'Agree to ask, without committing to anything', effects: 'steel-4 loyalty+2 !peace-1940 war-8 @hallifield+8', result: 'A carefully worded approach goes to Rome through the Italian ambassador. It cannot be unsent. By June there are talks in Lisbon.', diary: 'We have asked. Only asked. But you cannot un-ask a question like that.' },
        { label: 'Threaten to resign if the approach is made', effects: 'steel+4 temper+3', roll: { stat: 'reputation', diff: 45,
            pass: { effects: 'war+6 rep+4', result: 'The threat is enough. Nobody can face the country without you. The approach is dropped.', diary: 'Threatened to resign. They backed down. Thank God.' },
            fail: { effects: '!peace-1940 war-10 office=Backbencher -!pm -!peer-war', result: 'They call your bluff. You resign. A cable goes to Rome.', diary: 'Resigned. The cable has gone. I am out, and England is asking for terms.' } } },
      ] }
  );
})();
