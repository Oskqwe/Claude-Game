/* The Bulldog — an ordinary citizen's war, for lives that have left the record.
   The owner's rule (11 Nov 2026): a life off the record lives the war years as other people did:
   the ration book, the warden's post, the call to serve, and the stranger at the club who wants
   something. These scenes play only for off-record lives (`offmap`), and they are meant to be hard. */
(function () {
  const TM = window.TM;
  const D = (chance, text, headline) => ({ chance, text, headline });
  const A = TM.ACTS.bulldog;
  const HOME = '!offmap ~!changi-held ~!interned ~!life-over';

  Object.assign(TM.FORKS, {
    traitor: {
      title: 'The stranger at the club',
      history: 'In 1941 {full}, bitter and out of power, took money from a foreign agent for news picked up in the clubs.',
      more: [
        { if: '!life-over', text: 'MI5 had been watching the agent for months. The arrest came in the autumn, under the new Treachery Act.' },
        { if: '~!life-over', text: 'Nobody ever came. The banknotes were spent, and the fear lasted the rest of the war.' },
      ],
      real: 'This did not happen. Under the Treachery Act 1940, fifteen people were hanged in Britain during and after the war, and one more was shot after a court martial. Many other German agents were caught and turned by MI5 in the Double Cross system.',
      ends: {
        3: { if: '!life-over', head: 'The traitor', text: '{full} was tried in camera at the Old Bailey in 1942. The press was told only that a man had been convicted under the Treachery Act. The name was kept out of the papers for thirty years, at the request of people who had once called {full} a friend.' },
      },
    },
  });

  A[3].scenes.push(
    { id: 'cf-ration-1940', t: 1940.05, year: 1940, title: 'The ration book', if: HOME,
      venue: { plate: 'city', label: 'A grocer\'s in Kensington, January 1940' },
      text: 'Rationing has begun: four ounces of bacon a week, four of butter, twelve of sugar, and you must register with one grocer and buy only from him. The queue is out of the door. You are sixty-five, living on what you write, and the butcher has hinted that for a consideration there is always a little extra under the counter for a gentleman. Your neighbour has three children and a husband in France.',
      basis: 'The start of food rationing in Britain on 8 January 1940 (bacon, butter and sugar), registration with a single retailer, and the black market that grew up beside it.',
      real: 'Rationing of bacon, butter and sugar began on 8 January 1940; other foods followed through the war. Churchill, at the Admiralty, argued against extending rationing too far, fearing for morale.',
      check: 'research', facts: ['rationing-1940'],
      choices: [
        { label: 'Take the butcher\'s extra, and say nothing', effects: 'health+3 money-3 loyalty-2', roll: { stat: 'reputation', diff: 40,
            pass: { effects: '', result: 'A little extra, wrapped in newspaper, every Friday. Nobody asks, and you do not tell.', diary: 'Extra bacon. I am ashamed of how good it tastes.' },
            fail: { effects: 'rep-8 press-6 money-6', result: 'The butcher is prosecuted in March, and your name is in his order book. The magistrate fines you twenty pounds, and the local paper prints it.', diary: 'Fined for black-market bacon. In the paper. The neighbours look away.' } } },
        { label: 'Dig up the lawn and grow your own', effects: 'health+2 temper-1', result: 'You dig the lawn for potatoes and onions with a spade you have not touched in thirty years. By summer you have more than you can eat, and the neighbours have the rest.', diary: 'Dug the lawn. Blisters. Potatoes in June.' },
        { label: 'Give part of your ration to the neighbour\'s children', effects: 'health-5 rep+3 loyalty+1', result: 'Your butter and sugar go next door every week. You lose a stone by the spring. The children call you Uncle.', diary: 'Butter to the children. I am thinner. They are not.' },
      ] },

    { id: 'cf-warden-1940', t: 1940.74, year: 1940, title: 'The warden\'s post', if: HOME + ' ~!peace-signed',
      venue: { plate: 'city', label: 'A sandbagged warden\'s post, Stepney, October 1940' },
      text: 'You volunteered as an air-raid warden because nobody would have you for anything else. Every night for a month the bombers have come. Tonight a land mine has come down on its parachute behind the Commercial Road and flattened a terrace. People are under the rubble; you can hear them. The Heavy Rescue squad is an hour away. Down the road, a crowd is forcing the gates of the Underground station to shelter on the platforms.',
      basis: 'The Blitz on London from September 1940, the volunteer wardens of Air Raid Precautions, parachute mines, and East Enders taking over Tube stations as shelters against official policy.',
      real: 'The Blitz began on 7 September 1940; London was bombed on 56 of the next 57 days and nights. The Government had refused to let the Underground be used as shelters, and gave way in the second week of heavy bombing. Churchill toured the bombed East End as Prime Minister.',
      check: 'research', facts: ['blitz-shelters'],
      choices: [
        { label: 'Go into the rubble yourself', effects: 'steel+3 rep+5 health-8',
          death: D(0.14, 'You went into the ruins of a terrace off the Commercial Road in October 1940 to reach a family under the rubble. The wall above you came down. You were sixty-five.', 'Warden killed in Stepney raid'),
          result: 'You crawl in under a staircase with a torch and bring out a boy of six and his grandmother. You do not remember the next hour at all.', diary: 'Got the boy out, and the old lady. The others were dead when Heavy Rescue came.' },
        { label: 'Open the Tube gates and get the crowd below', effects: 'order-2 rep+4 fav-4', result: 'You cut the chain with a fire axe and wave them down. A thousand people sleep on the platforms of Aldgate East. A man from the Ministry says you will hear more of this. You do not.', diary: 'Opened the Tube with an axe. A thousand below. The Ministry is cross.' },
        { label: 'Run the post by the book and wait for Heavy Rescue', effects: 'order+2 loyalty+2 temper-2', result: 'You keep the log, mark the incident, hold the crowd back and wait. Heavy Rescue gets four out alive. You will never know if you could have got a fifth.', diary: 'By the book. Four alive. I keep wondering about a fifth.' },
      ] },

    { id: 'cf-stranger-1941', t: 1941.15, year: 1941, title: 'The stranger at the club', if: HOME,
      venue: { plate: 'club', label: 'A club in St James\'s, February 1941' },
      text: 'A pleasant man from a neutral legation has bought you dinner twice. He has read your articles. He agrees that the Government is run by fools. Tonight, over the port, he says that a man of your experience, who hears things in the clubs, could be very useful to people who will remember their friends when the war ends, one way or the other. He mentions a sum of money. You owe your tailor, your printer and the bank.',
      basis: 'German and Soviet attempts to recruit discontented men in London in 1940–41; the Tyler Kent and Right Club affair of May 1940; the Treachery Act 1940; MI5\'s Double Cross system, which turned captured agents.',
      real: 'This did not happen. Under the Treachery Act 1940 fifteen people were hanged and one more was shot after a court martial. MI5 caught or turned nearly every German agent sent to Britain and ran many as double agents.',
      check: 'research', facts: ['treachery-1940'],
      choices: [
        { label: 'Report him to a friend in the War Office', effects: 'loyalty+3 rep+2 war+2', roll: { stat: 'reputation', diff: 45,
            pass: { effects: 'cap+4 war+3 !double-cross', result: 'A quiet man from MI5 asks you to keep dining with him, and tells you what to say. For a year you feed a foreign power gossip invented in an office in St James\'s Street.', diary: 'Dinner with the legation man again. Every word I said was written for me. Rather enjoyed it.' },
            fail: { effects: 'rep-3', result: 'Your friend is sceptical, and by the time MI5 calls, the man has been recalled. You are left on a list of people who were approached, which is not a good list.', diary: 'Reported him. Too late. I am on a list now, I suspect.' } } },
        { label: 'Take the money', effects: 'money+20 loyalty-10 world=traitor', roll: { stat: 'favour', diff: 85,
            pass: { effects: 'money+10', result: 'You pass on club gossip for six months and are paid in banknotes. Nobody comes. You do not sleep.', diary: 'Paid again. Gossip, only gossip. I tell myself.' },
            fail: { effects: '!life-over office=Prisoner', result: 'MI5 has been watching the man for months. In October two officers call at your flat at six in the morning. You are charged under the Treachery Act, and the trial is held in secret.', diary: '(The diary was taken as evidence.)' } },
          end: true },
        { label: 'Throw your port in his face', effects: 'temper+4 steel+2 press+2', result: 'The club secretary asks you to resign for causing a scene. The legation man is posted home a fortnight later. You never learn whether anyone noticed.', diary: 'Port in his face. Asked to resign from the club. Cheap at the price.' },
      ] },

    { id: 'cf-fire-watch-1941', t: 1941.42, year: 1941, title: 'The call-up of old men', if: HOME + ' ~!peace-signed',
      venue: { plate: 'city', label: 'A labour exchange, June 1941' },
      text: 'Every man under sixty must now do his duty as a fire-watcher, and the Ministry of Labour has begun calling up women. You are over sixty and could plead age. But the Home Guard is short of men who know which end of a rifle is which, the Ministry of Information wants writers, and the merchant navy will take anyone who can stand a watch. Your knees ache and your chest is bad in the winter. The labour exchange clerk waits.',
      basis: 'The Fire Watchers Order of January 1941, the registration of women for war work from 1941, the Home Guard, and the Ministry of Information\'s use of writers.',
      real: 'Compulsory fire-watching was introduced in January 1941 after the City fire raid of 29 December 1940. Women were registered for war work from March 1941 and conscripted from December. Churchill was Prime Minister.',
      check: 'unchecked', facts: ['fire-watch-1941'],
      choices: [
        { label: 'The Home Guard: a sergeant\'s stripes at sixty-six', effects: 'steel+2 health-3 rep+2', result: 'You drill on Sunday mornings and guard a reservoir on Tuesday nights. The young men laugh at you until the first night exercise, when you are the only one who does not get lost.', diary: 'Sergeant, Home Guard. The reservoir is safe. My knees are not.' },
        { label: 'Sign on as a merchant navy purser', effects: 'steel+4 health-6 war+1',
          death: D(0.12, 'You signed on as a purser at sixty-six and sailed in an Atlantic convoy in 1941. The ship was torpedoed south of Iceland at night. Nobody from the purser\'s office got into a boat.', 'Lost at sea in the Atlantic'),
          result: 'You make two Atlantic crossings in a slow convoy, keeping the accounts of a tramp steamer while the escorts drop depth charges in the dark. Then the doctors take you off.', diary: 'Two crossings. One ship in our convoy lost. I was not on it.' },
        { label: 'Write for the Ministry of Information', effects: 'press+4 cap+2 loyalty+2', result: 'You write pamphlets for the neutrals about British courage. Some of them are true. All of them are cleared by a censor half your age.', diary: 'Pamphlets for the neutrals. A boy censor. I am useful, in a small way.' },
      ] },

    { id: 'cf-doodlebug-1944', t: 1944.47, year: 1944, title: 'The doodlebugs', if: HOME + ' ~!peace-signed ~!long-peace',
      venue: { plate: 'city', label: 'South London, June 1944' },
      text: 'The invasion of France has begun, and London thought the worst was over. Now the flying bombs come over in daylight, buzzing like motorbikes, and when the engine cuts out you have twelve seconds. One has fallen on a church in Westminster during the Sunday service. Your street is under the flight path to the city. The council is evacuating children again. You are sixty-nine, alone, and tired of shelters.',
      basis: 'The V-1 flying bomb offensive on London from 13 June 1944, a week after D-Day, including the bomb that hit the Guards Chapel during a Sunday service on 18 June.',
      real: 'The first V-1s fell on London on 13 June 1944. On 18 June one struck the Guards Chapel at Wellington Barracks during morning service, killing 121 people. About 6,000 people were killed by V-1s.',
      check: 'corroborated', facts: ['v1-1944'],
      choices: [
        { label: 'Stay in your own bed, whatever comes', effects: 'temper+2 health-2',
          death: D(0.06, 'A flying bomb cut out over your street in the summer of 1944. You were in your own bed, as you had said you would be. You were sixty-nine.', 'Killed by flying bomb'),
          result: 'You sleep in your own bed. Three nights running you hear the engine cut, and count, and the bang is somewhere else.', diary: 'Engine cut. Counted to twelve. Somewhere else. Back to sleep.' },
        { label: 'Take in an evacuee family from the docks', effects: 'rep+4 money-6 health-2', result: 'A mother and four children from Deptford move into your spare rooms. The house is never quiet again, and you find you do not want it to be.', diary: 'Five evacuees. Noise. Jam on the banisters. Better than shelters.' },
        { label: 'Go to the country and wait it out', effects: 'health+4 steel-2', result: 'You take a room at a pub in Wiltshire and read about it in the papers. You feel safe, and old, and not much use to anyone.', diary: 'Wiltshire. Safe. Useless.' },
      ] },
  );

  // The traitor's life ends with his arrest; a life that only took the money and was not caught goes on.
  const st = A[3].scenes.find((x) => x.id === 'cf-stranger-1941');
  const take = st.choices[1];
  delete take.end;
  take.roll.fail.end = true;

  A[3].scenes.sort((a, b) => a.t - b.t);
})();
