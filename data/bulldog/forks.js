/* The Bulldog — more rogue choices that bend history.
   Two forks take the life off the record:
     bankrupt  – buying on the way down in 1929, then letting the law take its course or fleeing:
                 a bankrupt cannot sit in the Commons, so the seat goes (1930–38, road back by discharge)
     changi    – staying in Singapore in 1942: three and a half years a prisoner of the Japanese
   Three bend the world while the character stays on it (`world=`): the Peace of 1940, Hallifield's
   war with the player as his Minister of Defence, and Trondheim taken from the sea.
   Loaded after fork-mamund.js, which defines the shared off-record scenes of 1938–45. */
(function () {
  const TM = window.TM;
  const D = (chance, text, headline) => ({ chance, text, headline });
  const A = TM.ACTS.bulldog;
  const find = (id) => { for (const n of [1, 2, 3]) { const sc = A[n].scenes.find((x) => x.id === id); if (sc) return sc; } return null; };
  const choice = (id, re) => { const sc = find(id); return sc && sc.choices.find((c) => re.test(c.label)); };
  const addIf = (id, term) => { const sc = find(id); if (sc && !(sc.if || '').includes(term)) sc.if = ((sc.if || '') + ' ' + term).trim(); };

  Object.assign(TM.FORKS, {
    bankrupt: {
      title: 'Bankrupt, and out of the House',
      history: 'In October 1929 {full} bought shares on the way down and was ruined. In 1930 the creditors went to court; a bankrupt cannot sit in the House of Commons, and the seat was declared vacant. The 1930s, the decade of the warnings, were spent writing for the trustee in bankruptcy at so much in the pound.',
      more: [
        { if: '!exile-1930', text: 'For two years the bankrupt lived on the Riviera, out of reach of writs.' },
        { if: '!returned', text: 'Discharged at last, {full} found a seat and came back to the House.' },
        { if: '!hallifield-pm', text: 'In May 1940, with no fighting man of this stamp in the House, the King sent for Viscount Hallifield.' },
        { if: '!hallifield-pm !peace-1940', text: 'Hallifield took the Lisbon terms in the summer of 1940.' },
        { if: '!hallifield-pm !hallifield-war', text: 'Hallifield refused to treat and fought on, carefully.' },
        { if: '!was-pm', text: 'And, against every expectation of 1930, the bankrupt became Prime Minister.' },
      ],
      real: 'Churchill lost heavily in the Crash of 1929 but was never made bankrupt. He stayed Member for Epping throughout the 1930s. In 1938, facing new losses, he was rescued by the financier Sir Henry Strakosch, who took over his share positions.',
      ends: {
        2: { if: '!offmap', head: 'The bankrupt', text: 'In 1938 {full} is {age}, outside Parliament, a writer still paying old debts at so much in the pound. Germany is rearming, and the warnings are being written for the Sunday papers instead of spoken in the House.' },
        3: { if: '!offmap', head: 'The life outside the record', text: 'October 1951. {full} is {age}. The war came and went, and the great decisions were taken by other men. A ruinous week on Wall Street in 1929 decided where this life would stand when they were made.' },
      },
    },
    changi: {
      title: 'A prisoner of the Japanese',
      history: 'In February 1942 {full} refused the recall from Singapore, stayed to see it through, and went into the camps when the city surrendered. Three and a half years at Changi followed, through the years when the war was won, the Beverley Report argued over and the 1945 election fought, all of it without this life.',
      more: [
        { if: '!f-force', text: 'In 1943, at sixty-eight, {full} went north with the working parties to the Burma railway, and came back.' },
        { if: '!returned', text: 'Home in 1945, the man from Changi won a by-election and came back to the House.' },
      ],
      real: 'Duff Cooper, the Minister Resident in Singapore, left in January 1942, before the city fell on 15 February. Churchill was Prime Minister throughout. About 80,000 British, Indian and Australian troops became prisoners at Singapore.',
      ends: {
        3: { if: '!offmap', head: 'The man from Changi', text: 'October 1951. {full} is {age}, and weighs what a man of that age should, at last. The war was won while you were behind the wire, and the peace was made without you. Some lives are bent by a single decision to stay.' },
      },
    },
    'peace1940': {
      title: 'The Peace of 1940', world: true,
      history: 'In the summer of 1940 Britain signed terms with Germany at Lisbon. Germany kept the Continent; Britain kept her fleet and her empire, and a German ambassador who smiled a great deal.',
      more: [
        { if: '!peace-ends', text: 'In 1942 a government of resistance took Britain back into the war beside the Americans.' },
        { if: '!long-peace', text: 'The peace held. By 1945 Germany ruled from the Atlantic to the Volga.' },
      ],
      real: 'Britain made no peace in 1940. The War Cabinet refused to ask for Italian mediation in May; Hitler\'s offer of 19 July was rejected by Halifax on 22 July.',
    },
    'peer-war': {
      title: 'Hallifield\'s premiership', world: true,
      history: 'In May 1940 the silence in the Cabinet Room was broken the other way: Viscount Hallifield became Prime Minister, and {full} ran the war under him as Minister of Defence.',
      real: 'On 9 May 1940 Halifax said that a peer could not lead the nation in war, and Churchill became Prime Minister the next day.',
    },
    trondheim: {
      title: 'Trondheim from the sea', world: true,
      history: 'In April 1940 old battleships forced the fjord at dawn under Sir Roger Keys and shelled the forts, and Trondheim fell. For a week Britain had a victory in Norway.',
      real: 'Keyes begged to lead old battleships up the fjord to Trondheim; the Admiralty refused. The Norway campaign failed, and its failure brought down Chamberlain.',
    },
  });

  /* ── the forks themselves, on existing choices ── */
  const buy = choice('crash-1929', /Buy more, cheap/);
  if (buy) buy.roll.fail.effects += ' !ruined-1929';

  const stay = choice('singapore-duff', /Stay and see it through/);
  if (stay) Object.assign(stay, {
    effects: 'steel+4 rep+4 health-6 fork=changi !changi-held -!mp -!minister -!info -!india-office -!combined-ops -!peer-war -!lancaster office=Civilian_internee',
    death: D(0.04, 'You stayed in Singapore. In the last days of the siege a shell found the Cathay building while you were on the roof. You were sixty-seven.', 'Former minister killed in Singapore'),
    result: 'You stay. The city surrenders on 15 February, and you go into captivity with the rest.',
    diary: 'Stayed. Surrender today. Tomorrow, the camps. I chose this.',
  });

  const sign = choice('lisbon-1940', /^Sign/); if (sign) sign.effects += ' world=peace1940';
  const resign = choice('lisbon-1940', /Resign rather than sign/); if (resign) resign.effects += ' world=peace1940';
  const nm = find('ninth-may');
  if (nm) {
    nm.choices[0].roll.fail.effects += ' world=peer-war';
    nm.choices[1].effects += ' world=peer-war';
    nm.choices[2].roll.fail.effects += ' world=peer-war';
  }
  const fjord = choice('trondheim', /Let him go up the fjord/); if (fjord) fjord.roll.pass.effects += ' world=trondheim';

  /* ── Act II: the bankrupt ── */
  A[2].scenes.push(
    { id: 'cf-ruin-1930', t: 1930.25, year: 1930, title: 'The Official Receiver', if: '!ruined-1929 !mp',
      venue: { plate: 'city', label: 'Carey Street, London, spring 1930' },
      text: 'Your creditors have lost patience. A petition in bankruptcy has been filed, and the Official Receiver\'s letter is on your desk. If you are adjudged bankrupt and the order stands, you cannot sit in the House of Commons, and your seat will be declared vacant. Your friends have heard. One of them, a financier who admires your books, has offered quietly to take over your debts.',
      basis: 'The rule that a bankrupt cannot sit in the House of Commons, which forced Horatio Bottomley to resign his seat in 1912; and the 1938 rescue of Churchill\'s debts by Sir Henry Strakosch.',
      real: 'Churchill lost heavily in the Crash but was never made bankrupt. In 1938, facing new share losses, he put Chartwell up for sale, and Sir Henry Strakosch took over his positions.',
      check: 'research', facts: ['bankrupt-mp'],
      choices: [
        { label: 'Take the financier\'s money', effects: 'loyalty+1', roll: { stat: 'favour', diff: 40,
            pass: { effects: '-!ruined-1929 money+20 rep-1', result: 'The debts vanish into an account in the City. You never quite know what you owe him, which is the point.', diary: 'Rescued. By a man I hardly know. I shall not ask the price.' },
            fail: { effects: 'fork=bankrupt -!mp office=Undischarged_bankrupt rep-6', result: 'He withdraws after a bad week of his own in the markets. You are adjudged bankrupt in June, and in December the Speaker reads out that your seat is vacant.', diary: 'Bankrupt. The seat goes at Christmas. I have never felt so small.' } } },
        { label: 'Let the law take its course', effects: 'fork=bankrupt -!mp office=Undischarged_bankrupt rep-5 steel+2',
          result: 'You are adjudged bankrupt in June. Six months later the Speaker announces that your seat is vacant, and the by-election is fought without you.',
          diary: 'Let it come. Bankrupt. Seat gone. I owe nobody a lie, at least.' },
        { label: 'Take the Blue Train to the Riviera, out of reach', effects: 'fork=bankrupt !exile-1930 -!mp office=Absconded_debtor rep-10 health+3 temper+3',
          result: 'You go south on the night train. The creditors make you bankrupt in your absence, the seat is declared vacant, and you paint the harbour at Cannes where no writ can reach you.',
          diary: 'Cannes. Painting the harbour. A process server is said to be in Nice.' },
      ] },

    { id: 'cf-bankrupt-1932', t: 1932.6, year: 1932, title: 'Writing for the trustee', if: '!fork-bankrupt !offmap',
      venue: { plate: 'chine', label: 'A rented study, summer 1932' },
      text: 'Two years on. Everything you earn goes to the trustee in bankruptcy, who pays it out to your creditors at so much in the pound. You write for the Sunday papers, for American magazines, for anyone who pays: lives of generals, a film script that is never made. To be discharged you must satisfy the court you have paid what you can. In Germany the Nazis have just become the largest party in the Reichstag.',
      basis: 'Discharge from bankruptcy by the court; Churchill\'s own journalism of the early 1930s; the German election of July 1932, in which the Nazis became the largest party.',
      real: 'Churchill was never bankrupt. In the early 1930s he wrote at great speed to repair his losses, including Marlborough and the essays later collected as Great Contemporaries.',
      check: 'research', facts: ['reichstag-1932'],
      choices: [
        { label: 'Write anything that pays', effects: 'money+10 health-4 press+3', result: 'You write a million words in two years. Your creditors get eleven shillings in the pound. You get tired.', diary: 'Eleven shillings in the pound. A million words. Not one about Germany.' },
        { label: 'Apply to the court for your discharge', effects: 'cap+1', roll: { stat: 'money', diff: 45,
            pass: { effects: '!discharged', result: 'The registrar finds that you have paid what you could, and grants your discharge with a lecture on prudence.', diary: 'Discharged. Lectured. Free.' },
            fail: { effects: 'rep-2', result: 'The registrar finds you have not paid enough, and suspends your discharge for two years.', diary: 'Discharge refused. Two more years of Carey Street.' } } },
        { label: 'Write about Germany, whether it pays or not', effects: 'steel+2 press+4 money-3 war+1', result: 'Your articles on the new Germany are printed in the provincial papers and read in Berlin. The trustee asks why you are wasting your time.', diary: 'Wrote about Germany. Paid nothing. Mattered, I think.' },
      ] },

    { id: 'cf-bankrupt-1935', t: 1935.85, year: 1935, title: 'The November election', if: '!fork-bankrupt !offmap',
      venue: { plate: 'mill', label: 'A constituency office, November 1935' },
      text: 'A general election has been called for November. Mussolini has invaded Abyssinia; Germany has announced an air force and conscription. A seat on the edge of London wants a candidate who knows what is coming, and your name has been mentioned, with the inevitable question. An undischarged bankrupt cannot stand. A discharged one can, if the voters will forgive him.',
      basis: 'The general election of 14 November 1935; the Italian invasion of Abyssinia (October 1935); Germany\'s announcement of the Luftwaffe and of conscription (March 1935).',
      real: 'Churchill was returned for Epping in November 1935. Baldwin won a large majority and did not offer him office.',
      check: 'unchecked', facts: ['election-1935'],
      choices: [
        { label: 'Stand', requires: '!discharged', showLocked: true, effects: 'steel+2', roll: { stat: 'press', diff: 50,
            pass: { effects: '!mp seat+25 cap+4 office=Member_of_Parliament', result: 'You win by a thousand votes. Five years after the Speaker declared your seat vacant, you take the oath again, and the Members who remember you look at you oddly.', diary: 'Elected. Back. The Members who remember me look at me oddly.' },
            fail: { effects: 'rep-2 fav-2', result: 'The voters remember the bankruptcy better than the warnings. You lose by two thousand.', diary: 'Lost. They remember Carey Street.' } } },
        { label: 'Apply for discharge in time for the next one', requires: '~!discharged', effects: 'cap+1', roll: { stat: 'money', diff: 50,
            pass: { effects: '!discharged', result: 'Discharged a week before nominations close; too late for this election. Next time.', diary: 'Discharged. Too late for November.' },
            fail: { effects: 'health-3', result: 'Refused again. You watch the election from the outside.', diary: 'Refused. Outside again.' } } },
        { label: 'Stay out and keep writing', effects: 'press+3 money+4', result: 'You report the election for an American paper. Mr Baldock wins by a street.', diary: 'Wrote it up for New York. Baldock by a mile.' },
      ] },
  );

  /* ── Act III: Changi ── */
  A[3].scenes.push(
    { id: 'cf-changi-1942', t: 1942.13, year: 1942, title: 'Changi', if: '!fork-changi !changi-held',
      venue: { plate: 'prison', label: 'Changi, Singapore, March 1942' },
      text: 'Singapore surrendered on 15 February, and tens of thousands of British, Indian and Australian troops went into captivity in a day. You have been marched with the civilians to Changi gaol, at the eastern end of the island: sixty-seven, a former minister, and of interest to the Japanese only as a name. The food is rice and little else. Dysentery has begun. The internees want someone to deal with the guards.',
      basis: 'The fall of Singapore on 15 February 1942 and the internment of British civilians in Changi gaol.',
      real: 'This did not happen. Duff Cooper, the Minister Resident, had left Singapore in January 1942. About 80,000 Allied troops surrendered on 15 February; about 3,000 civilians were interned in Changi gaol.',
      check: 'unchecked', facts: ['singapore-1942'],
      choices: [
        { label: 'Deal with the guards yourself', effects: 'steel+2 rep+4 health-6',
          death: D(0.06, 'You stood between a guard and a sick man in the spring of 1942. You were sixty-seven, and you did not get up.', 'Former minister dies in Japanese hands'),
          roll: { stat: 'reputation', diff: 50,
            pass: { effects: 'cap+3', result: 'You learn to bow correctly and to bargain badly. The guards come to treat you as a kind of headman, and the hospital hut gets more rice.', diary: 'Bowed to a corporal. Got the rice. Pride is a luxury here.' },
            fail: { effects: 'health-8', result: 'The commandant takes your manner for insolence. You spend a week in a cage in the sun.', diary: 'A week in the cage. I am too old to be insolent, and I was.' } } },
        { label: 'Start lectures in the yard', effects: 'cap+3 health-2 rep+3', result: 'You lecture on history and politics to men and women sitting on the stones. Two hundred come. A guard listens at the wire.', diary: 'Lectured on the Reform Bill in a prison yard. Two hundred came.' },
        { label: 'Keep a secret diary of everything', effects: 'press+3 steel+1',
          death: D(0.03, 'Your diary was found in a search in 1942. You were taken away for questioning and did not come back.', 'Former minister dies in Japanese hands'),
          result: 'You write in pencil on toilet paper and hide it in a hollow bamboo. It is the most important thing you will ever write.', diary: '(Hidden in the bamboo.) Everything. Names, dates, rations, deaths.' },
      ] },

    { id: 'cf-railway-1943', t: 1943.33, year: 1943, title: 'The railway', if: '!fork-changi !changi-held',
      venue: { plate: 'prison', label: 'Changi, April 1943' },
      text: 'The Japanese are building a railway through the jungle from Thailand into Burma, and they want seven thousand men from Changi for it. They say the new camps will be healthier, with better food. The doctors do not believe it. The men going north are soldiers, not internees, but the senior officers have asked you, as an old man they trust, to help decide which of the sick can be kept back. Every man kept back, another goes.',
      basis: 'F Force, about 7,000 prisoners sent from Changi in April 1943 to the Burma–Thailand railway, after being told the camps would be healthier; nearly half died.',
      real: 'F Force left Changi in April 1943. Cholera, dysentery and starvation killed some 3,000 of its 7,000 men. Civilian internees were not sent to the railway.',
      check: 'unchecked', facts: ['f-force-1943'],
      choices: [
        { label: 'Choose, and live with it', effects: 'steel+2 health-4 loyalty+2', result: 'You go down the lines with the doctors and make the list. Of the men who go north, nearly half will not come back. You keep the list until you die.', diary: 'Made the list. God forgive me. Somebody had to.' },
        { label: 'Refuse to choose, and demand the sick stay', effects: 'steel+3 rep+3', roll: { stat: 'reputation', diff: 60,
            pass: { effects: 'health-4', result: 'The Japanese strike a few hundred of the worst cases off the list. It is not enough. It is not nothing.', diary: 'Three hundred kept back. Not enough. Not nothing.' },
            fail: { effects: 'health-10', result: 'The commandant has you beaten in front of the parade. The sick go north.', diary: 'Beaten on the square. The sick went anyway.' } },
          death: D(0.04, 'You were beaten on the parade ground at Changi for refusing to choose which sick men went north. You were sixty-eight.', 'Former minister dies in Japanese hands') },
        { label: 'Go north with them', effects: 'steel+4 rep+6 health-20 !f-force',
          death: D(0.35, 'You went north with the working parties in 1943 and died at a jungle camp near the Burmese border, of cholera, at sixty-eight. The men buried you beside the line.', 'Former minister dies on the Burma railway'),
          result: 'You talk your way onto a train north. By some miracle, at sixty-eight, you come back to Changi in December, a skeleton among skeletons.', diary: 'Back from the railway. I cannot write what I saw. One day.' },
      ] },

    { id: 'cf-liberation-1945', t: 1945.7, year: 1945, title: 'Liberation', if: '!fork-changi !changi-held',
      onEnter: '-!changi-held',
      venue: { plate: 'prison', label: 'Changi, September 1945' },
      text: 'Japan surrendered a month ago, and this morning British troops walked into Changi. You weigh seven stone. In England there has been a general election, held while you were behind the wire: Labour has won by a landslide, and men you have never heard of are ministers. Your old association, not knowing if you were alive, chose another candidate. A journalist wants your story, a doctor wants you in hospital, and a friend writes that a by-election is coming.',
      basis: 'The Japanese surrender of 15 August 1945, the British return to Singapore in early September, and the July 1945 general election.',
      real: 'Japan surrendered on 15 August 1945 and the British fleet reached Singapore on 4 September and troops landed on the 5th. Labour won the election of July 1945 by a landslide; Churchill stayed in the House as Leader of the Opposition.',
      check: 'corroborated', facts: ['singapore-1945'],
      choices: [
        { label: 'Come home and fight the by-election', effects: 'steel+2 health-4', roll: { stat: 'reputation', diff: 50,
            pass: { effects: '!mp seat+25 cap+6 rep+5 office=Member_of_Parliament', result: 'In the spring of 1946 a safe seat falls vacant, and the man from Changi is returned with the largest majority of his life.', diary: 'Elected. Seven stone and seventy-one. The House stood when I came in.' },
            fail: { effects: 'fav-4', result: 'The doctors say no, and the party agrees with them. By the time you are fit, the seats have gone to younger men.', diary: 'Too ill to stand. The seats have gone.' } } },
        { label: 'Tell the story, all of it', effects: 'press+8 money+8 health-2', result: 'Your account of Changi and the railway, from the diary in the bamboo or from memory, is read across the country. It is the most important thing you will ever write.', diary: 'Told it. All of it.' },
        { label: 'Go to hospital and stay there', effects: 'health+15', result: 'You spend the winter in a hospital in Hampshire learning to eat again.', diary: 'Hospital. Porridge. The nurses are kind.' },
      ] },

    { id: 'cf-old-1950', t: 1950.6, year: 1950, title: 'The long view', if: '!offmap ~!fork-mamund',
      venue: { plate: 'sickroom', label: 'A house in the country, autumn 1950' },
      text: 'You are seventy-five. The doctor comes twice a week and no longer bothers to hide what he thinks. A publisher wants your memoirs, and has said, tactlessly, that there is a market for the lives of men who might have been somebody. The war was fought and won, or not, by other men. You can still write it down, or put down the pen and sit in the sun for whatever is left.',
      basis: 'Invented. Old age outside power; drawn from the memoirs of politicians whose careers were broken early.',
      real: 'This did not happen. In 1950 Churchill was Leader of the Opposition, writing his war memoirs, and a year from returning as Prime Minister.',
      check: 'research', facts: [],
      choices: [
        { label: 'Write the memoirs, and leave nothing out', effects: 'press+5 money+6 health-4',
          death: D(0.12, 'You died in the winter of 1950 with the memoirs two chapters short. The publisher brought them out unfinished.', 'Death of a might-have-been'),
          result: 'You write every morning until noon. The book is honest about what you did, and what you did not do, and the man you might have been.', diary: 'Writing it all. Even the bad week that changed everything.' },
        { label: 'Put down the pen and sit in the sun', effects: 'health+3',
          death: D(0.06, 'You died in the spring of 1951, in a deckchair, in the sun.', 'Death of a might-have-been'),
          result: 'You sit in the sun and read other people\'s memoirs, and find that you are not angry any more.', diary: 'Sun. Other men\'s memoirs. Not angry. Surprised.' },
        { label: 'Write to The Times one last time', effects: 'press+3 steel+1', result: 'They print it. A young Member writes to say he read your warnings in the 1930s and wishes he had listened.', diary: 'One last letter. One young man listened.' },
      ] },
  );

  /* ── make the shared off-record scenes fit any off-record life ── */
  const mamundOnly = ['cf-qissa-1930', 'cf-india-bill-1935', 'cf-czech-1938', 'cf-frontier-1947', 'cf-last-1950'];
  for (const id of mamundOnly) addIf(id, '!fork-mamund');
  const crisis = find('cf-crisis-1942'); if (crisis) crisis.if = '!returned !hallifield-war !mp ~!pm';
  const ipi = choice('cf-hallifield-1941', /Frontier/); if (ipi) { ipi.requires = '!fork-mamund'; }
  const told = choice('cf-armed-peace-1945', /Tell them/); if (told) told.result = 'You tell them what fighting really cost, the first time round and the second. They had expected something more glorious.';
  const ve = find('cf-ve-1945'); if (ve) ve.if += ' ~!changi-held';
  for (const n of [2, 3]) for (const end of ['mamund']) { const f = TM.FORKS[end]; if (f.ends[n]) f.ends[n].if += ' !fork-mamund'; }
  // The Press Gallery and the truce seat are open to any off-record life except the Frontier one,
  // which has its own 1938 and 1939.
  // An undischarged bankrupt cannot stand for Parliament.
  for (const [id, re] of [['outside-1938', /by-election/], ['outside-1939', /Seek a seat/], ['lancaster-1941', /Take the seat and stay/], ['lancaster-1941', /Take the seat and come/]]) {
    const c = choice(id, re); if (c) { c.requires = ((c.requires || '') + ' ~!fork-bankrupt|!discharged').trim(); c.showLocked = true; }
  }
  for (const id of ['outside-1938', 'outside-1939']) {
    const sc = find(id); if (sc) sc.if = sc.if.replace('~!offmap', '~!fork-mamund');
  }
  for (const id of ['v-weapons', 'election-1945']) addIf(id, '~!changi-held');

  for (const n of [1, 2, 3]) A[n].scenes.sort((a, b) => a.t - b.t);
})();
