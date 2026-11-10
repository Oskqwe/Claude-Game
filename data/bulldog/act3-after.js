/* The Bulldog — Act III, part 3: 1945–1951. DRAFT.
   Spine: Churchill in opposition and his return (RESEARCH.md §B). Blended in: Bracken loses his seat
   in 1945 and returns at Bournemouth; Amery loses his seat in 1945; Duff Cooper in Paris; the Prof
   back at Oxford. The life ends with the October 1951 election. */
(function () {
  const TM = window.TM;
  const act = TM.ACTS.bulldog[3];
  const D = (chance, text, headline) => ({ chance, text, headline });

  act.scenes.push(
    { id: 'broadcast-1945', t: 1945.43, year: 1945, title: 'The broadcast', if: '!mp ~!long-peace',
      venue: { plate: 'city', label: 'Broadcasting House, June 1945' },
      text: 'The election campaign has begun, and you are to open it on the wireless. Lord Beaverhulme and the party\'s young men want a fighting speech: socialism means controls, controls mean inspectors, inspectors mean a police state. Your wife thinks it a terrible idea. Astley, who sat beside you in the War Cabinet for five years, will answer you the next night.',
      basis: 'Churchill\'s election broadcast of 4 June 1945, in which he said a socialist government would need some form of "Gestapo"; Attlee\'s reply the next evening.',
      real: 'Churchill\'s first election broadcast, on 4 June 1945, claimed that a socialist government would have to fall back on "some form of a Gestapo". It shocked many listeners. Attlee\'s calm reply the next night did him much good.',
      check: 'research', facts: ['gestapo-1945'],
      choices: [
        { label: 'Give them the fighting speech', historical: true, effects: 'order+3 state-3 press-6 rep-6 @astley-10 !partisan-1945', result: 'You warn that socialism would need a political police. The nation, which has just beaten a real one, is not amused. Astley\'s reply the next night is quiet and devastating.', diary: 'The broadcast. A mistake. Clemmie said so. She was right.' },
        { label: 'Speak as the national leader, above party', effects: 'rep+6 loyalty-3 press+4', result: 'You speak of victory and the peace to come, and barely mention Labour. The party\'s young men are furious. The country likes it.', diary: 'Spoke for the nation. The party is cross. The country listened.' },
        { label: 'Offer the four-year plan in detail', effects: 'state+2 reform+3 rep+3', result: 'You set out houses, insurance and a health service, Tory versions of all of them. It is too late to sound sincere, and some people believe it.', diary: 'Offered the plan. Houses. Health. Too late, perhaps.' },
      ] },

    { id: 'election-1945', t: 1945.56, year: 1945, title: 'The verdict', if: '~!long-peace',
      venue: { plate: 'mill', label: 'The count, July 1945' },
      text: 'The votes were cast three weeks ago and have waited for the soldiers\' ballots from overseas. Now they are counted. Your own fight looks winnable. The country is another matter: the forces vote is said to be solidly Labour, and nobody has polled the people properly since 1935. At noon the first results come in from the towns, and they are all one colour.',
      basis: 'The general election of 5 July 1945, counted on 26 July after the service votes came home; Labour\'s landslide; Churchill\'s, Bracken\'s and Amery\'s fates.',
      real: 'Labour won 393 seats and a majority of 146. Churchill held Woodford but resigned as Prime Minister that evening. Bracken and Amery both lost their seats; Bracken returned at Bournemouth in November.',
      check: 'research', facts: ['election-1945'],
      choices: [
        { label: 'Fight the seat to the last vote', requires: '!mp', effects: 'seat+5', roll: { stat: 'seat', diff: 15,
            pass: { effects: 'office=Member_of_Parliament !mp -!pm', result: 'You hold your seat. The country has rejected your party by a landslide. If you were Prime Minister, you are not any more.', diary: 'Held my seat. Lost the country. The people have spoken, and they have said: thank you, and goodbye.' },
            fail: { effects: 'office=None -!mp -!pm', result: 'You lose your seat in the landslide, with half the old Cabinet.', diary: 'Out. With half the Cabinet. The soldiers voted for the future, and I am the past.' } } },
        { label: 'Stand in a safer seat', requires: '!mp', effects: 'loyalty+2 seat+10', roll: { stat: 'favour', diff: 25,
            pass: { effects: 'office=Member_of_Parliament !mp -!pm', result: 'You are returned for a safe suburb. The rest of the news is terrible.', diary: 'Safe. The rest is ruin.' },
            fail: { effects: 'office=None -!mp -!pm', result: 'Even the safe seat goes. It is that kind of year.', diary: 'Even the safe seat. Extraordinary.' } } },
        { label: 'Stand for Parliament at last', requires: '~!mp', effects: 'loyalty+1', roll: { stat: 'reputation', diff: 45,
            pass: { effects: 'seat+35 cap+4 office=Member_of_Parliament !mp', result: 'You win a seat at the end of the war, one of the few new Members on your side. The rest of the news is terrible for it.', diary: 'Elected, at last, at seventy. On the losing side. Typical.' },
            fail: { effects: 'seat+5', result: 'You lose, like most of your side.', diary: 'Beaten in the landslide. Too old to try again, perhaps.' } } },
        { label: 'Do not stand. Seventy is old enough', requires: 'age>=68', showLocked: true, effects: 'health+6 office=None -!mp -!pm', result: 'You do not stand, and watch the landslide from the country, with relief and a little grief.', diary: 'Did not stand. Watched it from the garden. Relief. Grief.' },
      ] },

    { id: 'was-pm-1945', t: 1945.565, year: 1945, title: 'A blessing in disguise', if: '!was-pm !mp',
      venue: { plate: 'whitehall', label: 'Downing Street, 26 July 1945' },
      text: 'You drove to the Palace this evening and resigned. Astley has gone to the Palace after you. Your wife says the defeat may be a blessing in disguise; you say that at the moment it seems quite effectively disguised. The party wants to know whether you will lead it in opposition, at seventy, or hand it to Edgerton, who has waited for years.',
      basis: 'Churchill\'s resignation on 26 July 1945; Clementine\'s remark and his reply; his decision to remain Conservative leader.',
      real: 'Churchill resigned on 26 July 1945. When Clementine suggested the defeat might be a blessing in disguise, he is said to have replied that it seemed very effectively disguised. He stayed on as Leader of the Opposition, to Eden\'s frustration.',
      check: 'research', facts: ['election-1945'],
      choices: [
        { label: 'Lead the Opposition', historical: true, effects: 'steel+2 cap+4 @edgerton-8 office=Leader_of_the_Opposition', result: 'You stay. You come to the House when it suits you, and paint and write the history of the war when it does not. Edgerton waits.', diary: 'Leader of the Opposition, at seventy. Edgerton is patient. I am not going anywhere.' },
        { label: 'Hand over to Edgerton', effects: 'health+6 loyalty+3 @edgerton+15 office=Backbencher', result: 'You hand over the party and become its elder statesman. The war memoirs make you rich.', diary: 'Handed over to Edgerton. The memoirs, now. Six volumes at least.' },
        { label: 'Retire from the House altogether', effects: 'health+8 money+10 -!mp office=None', result: 'You retire, write the history of the war, and paint in the south of France. The world comes to see you.', diary: 'Retired. Writing. Painting. The world still calls.' },
      ] },

    { id: 'fulton-1946', t: 1946.18, year: 1946, title: 'Fulton, Missouri', if: '!was-pm|reputation>75 ~!long-peace',
      venue: { plate: 'newyork', label: 'Westminster College, Fulton, March 1946' },
      text: 'The President of the United States has brought you to a small college in Missouri to make a speech, and is sitting behind you on the platform. Russia has swallowed half of Europe. Nobody in America wants to hear it. You can tell them plainly that a line has come down across Europe from the Baltic to the Adriatic, or you can talk about the United Nations.',
      basis: 'Churchill\'s speech at Fulton, Missouri, on 5 March 1946, with President Truman present.',
      real: 'At Fulton on 5 March 1946 Churchill described an "iron curtain" descending across Europe from Stettin to Trieste and called for an Anglo-American alliance. It was widely condemned at first, including by some in the Labour government, and soon became the language of the Cold War.',
      check: 'research', facts: ['fulton'],
      choices: [
        { label: 'Say it plainly: a curtain has fallen across Europe', historical: true, effects: 'steel+4 press+6 rep+6 war+4', result: 'You say it. The American papers call you a warmonger. Moscow calls you worse. Within a year the President is saying the same thing.', diary: 'Said it at Fulton. A curtain across Europe. They will thank me in a year.' },
        { label: 'Speak for the United Nations and patience', effects: 'steel-2 rep+3', result: 'You make a fine, cautious speech about the new world organisation. Nobody remembers it.', diary: 'A cautious speech. Applauded. Forgotten.' },
        { label: 'Call for a united Europe, beginning with France and Germany', effects: 'empire-2 state+1 rep+4 !united-europe', result: 'You call for a kind of United States of Europe, with Britain as its friend. The Americans are puzzled; the Europeans are not.', diary: 'A United States of Europe. With us as godparents, not members. Perhaps.' },
      ] },

    { id: 'india-1947', t: 1947.2, year: 1947, title: 'The deadline', if: '!mp',
      venue: { plate: 'india', label: 'The House of Commons, March 1947' },
      text: 'The Government has announced that Britain will leave India by June 1948, come what may, and a new Viceroy is going out to arrange it. You have fought Indian self-government for sixteen years. You believe a fixed date will mean civil war between Hindus and Muslims, and partition, and massacre. Some of what you believe is right. The Bill is before the House.',
      basis: 'Churchill\'s opposition to Attlee\'s deadline for leaving India, March 1947; Partition and the violence that followed.',
      real: 'Churchill attacked the deadline in March 1947. Mountbatten brought independence forward to August 1947; India and Pakistan were partitioned. Hundreds of thousands, perhaps a million or more, were killed, and some fifteen million people were displaced. The Conservatives did not oppose the Independence Act in the end.',
      check: 'research', facts: ['india-1947'],
      choices: [
        { label: 'Attack the deadline as a scuttle', historical: true, effects: 'empire+3 steel+2 @astley-6', result: 'You call it a shameful flight. The House listens. The Bill goes through, and in the summer the Punjab burns, as you warned and as you could not prevent.', diary: 'Attacked the scuttle. It goes ahead. God help the Punjab.' },
        { label: 'Support it, and press for protection of minorities', effects: 'empire-4 rep+4 @astley+6', result: 'You back the Bill and demand that British troops stay to protect the frontier districts. The Government agrees to some of it, too late.', diary: 'Backed the Bill. Asked for troops on the frontier. Some will go.' },
        { label: 'Press for a slower timetable and no partition', effects: 'empire+1 cap+2', result: 'Your amendment for a slower transfer is defeated. Nobody knows whether it would have saved lives or cost more.', diary: 'Moved for more time. Defeated. Perhaps it would not have helped.' },
      ] },

    { id: 'winter-1947', t: 1947.1, year: 1947, title: 'The frozen winter',
      venue: { plate: 'sickroom', label: 'Your house, February 1947' },
      text: 'The worst winter in living memory. Snow has drifted to the hedge-tops, the coal trains cannot move, the power stations are shutting down, and offices work by candlelight. You are seventy-two. You have a cough that will not go, and your doctor says your chest is not what it was. There is a debate on the fuel crisis on Tuesday that you could make into a massacre.',
      basis: 'The fuel crisis of the winter of 1946–47 and Churchill\'s health in his seventies.',
      real: 'The winter of 1946–47 brought heavy snow and a fuel crisis; power cuts closed factories and up to four million people claimed unemployment benefit. Churchill, in his seventies, suffered recurring bronchial illness in these years.',
      check: 'unchecked', facts: ['winter-1947'],
      choices: [
        { label: 'Go to the House and savage the Government', effects: 'steel+2 press+4 health-10', death: D(0.06, 'You went out into the frozen February of 1947 with a fever, and the bronchitis became pneumonia. You were seventy-two.', 'Death of a great Englishman'), result: 'You make the speech, wrapped in a coat, and the Minister of Fuel sits through it grey-faced. You spend the next three weeks in bed.', diary: 'Spoke on the fuel crisis. Shinfield had no answer. My chest has given me one.' },
        { label: 'Stay in bed and write', effects: 'health+2 money+4', death: D(0.025, 'The winter of 1947 was too much at seventy-two. You died at home, in the snow.', 'Death of a great Englishman'), result: 'You stay in bed with the war memoirs and a hot-water bottle. Volume two is finished by the thaw.', diary: 'In bed. Volume two. The snow is up to the windows.' },
        { label: 'Go to the sun and paint', effects: 'health+4 press-3 money-4', death: D(0.015, 'You died abroad in the winter of 1947, painting in the sun. You were seventy-two.', 'Death of a great Englishman'), result: 'You go to Marrakech and paint. The papers ask where the Leader of the Opposition is during the nation\'s worst winter.', diary: 'Marrakech. Sunlight. The papers are cross. My chest is not.' },
      ] },

    { id: 'stroke-1949', t: 1949.6, year: 1949, title: 'The Riviera', if: 'health>0',
      venue: { plate: 'sickroom', label: 'A villa on the Riviera, August 1949' },
      text: 'You are seventy-four, on holiday, painting in the sun and playing cards until two. This morning you woke with a cramp in your right arm and leg, and your pen will not do what you tell it. The doctor flies out from London. It is a stroke, a small one. There will be an election within the year. If it becomes known, the party will want you to go.',
      basis: 'Churchill\'s first stroke, while staying with Beaverbrook in the south of France, August 1949, which was kept secret.',
      real: 'Churchill had his first stroke in August 1949 while visiting Beaverbrook in the south of France. It was concealed, and he recovered enough to lead the Conservatives through the elections of 1950 and 1951. A more serious stroke in 1953, while Prime Minister, was also concealed.',
      check: 'research', facts: ['stroke-1949'],
      choices: [
        { label: 'Conceal it and carry on', historical: true, effects: 'health-10 steel+2', death: D(0.07, 'A second stroke followed the first, in the autumn of 1949. You died at seventy-four.', 'Death of a great Englishman'), result: 'The doctor tells the press it is a chill. You go home in a fortnight, practise your signature, and go on.', diary: 'A chill, they say. My hand is weak. My will is not.' },
        { label: 'Tell the truth and retire', effects: 'health+4 -!mp office=None rep+3', result: 'You tell the party, and resign the leadership. Edgerton takes over. You go to Chartwell and paint.', diary: 'Retired. Edgerton leads. My hand is steadier on a brush than a pen.' },
        { label: 'Rest for three months, then decide', effects: 'health-4', death: D(0.025, 'You died in the winter of 1949, at seventy-five, without going back to the House.', 'Death of a great Englishman'), result: 'You rest. The election is called for February, and you decide you will fight it.', diary: 'Rested. Better. One more fight.' },
      ] },

    { id: 'schuman-1950', t: 1950.45, year: 1950, title: 'Coal and steel', if: '!mp',
      venue: { plate: 'gallery', label: 'The House of Commons, June 1950' },
      doc: { type: 'division', title: 'Opposition motion on the Schuman Plan, June 1950', ayes: 296, noes: 309, note: 'Government majority 13. (Figures to be confirmed against Hansard.)' },
      text: 'The French have proposed pooling the coal and steel of France and Germany under a common authority, and invited others to join. The Labour government has refused even to attend the talks unless it can keep control of British industry. The Opposition has a motion urging Britain to take part. You once called for a United States of Europe. Did you mean Britain to be in it?',
      basis: 'The Schuman Plan (May 1950) and the Commons debate of June 1950; Churchill attacked Labour for refusing to join the talks.',
      real: 'Labour declined to join the Schuman talks. Churchill attacked the decision, though he was vague about whether Britain should accept a supranational authority. The Opposition motion was defeated by a small margin. The European Coal and Steel Community was founded in 1951 without Britain.',
      check: 'unchecked', facts: ['schuman-1950'],
      choices: [
        { label: 'Attack the Government for staying out of the talks', historical: true, effects: 'empire-1 cap+3 press+3', result: 'You attack Labour for its absence, without quite saying Britain should join. The motion is lost by thirteen.', diary: 'Attacked Labour on Schuman. Lost by 13. We should be at the table.' },
        { label: 'Say plainly that Britain should join the pool', effects: 'empire-4 state+2 loyalty-3 !paris-treaty', result: 'You say Britain should be in, authority and all. Half your own party is appalled. The French are delighted.', diary: 'Said we should join. The party is appalled. Paris sends flowers.' },
        { label: 'Back the Government: no foreign authority over British coal', effects: 'empire+3 loyalty-2 @astley+4', result: 'You side with the Government against your own front bench. The miners\' MPs cheer you, which is a novelty.', diary: 'Sided with Labour on coal. The miners cheered me. Strange times.' },
      ] },

    { id: 'election-1951', t: 1951.8, year: 1951, title: 'One more election', if: '!mp',
      venue: { plate: 'mill', label: 'October 1951' },
      text: 'Labour has a majority of five, a Cabinet split over teeth and spectacles, and a Prime Minister just out of hospital. He has called an election for October. You are seventy-six, deaf in one ear, and the only man your party wants. The country is tired of rationing and tired of crises. This is the last chance you will ever have.',
      basis: 'The general election of 25 October 1951, which the Conservatives won with a majority of 17 on fewer votes than Labour; Churchill returned as Prime Minister at 76.',
      real: 'The Conservatives won 321 seats, a majority of 17, though Labour polled more votes. Churchill became Prime Minister again on 26 October 1951, aged 76, and served until April 1955.',
      check: 'research', facts: ['election-1951'],
      choices: [
        { label: 'Lead the party into the election', historical: true, requires: '!was-pm|reputation>70', showLocked: true, effects: 'steel+2', roll: { stat: 'reputation', diff: 45,
            pass: { effects: 'office=Prime_Minister !pm cap+10 press+6', result: 'The Conservatives win by seventeen seats on fewer votes than Labour. At seventy-six, you go to the Palace again.', diary: 'Prime Minister again. Seventy-six. Unfinished business.' },
            fail: { effects: 'office=Leader_of_the_Opposition', result: 'Labour holds on by a handful. You will not get another chance.', diary: 'Lost by a whisker. It is over. I am content, nearly.' } } },
        { label: 'Fight your own seat, and leave the leading to others', effects: 'loyalty+2 seat+5', roll: { stat: 'seat', diff: 30,
            pass: { effects: 'office=Member_of_Parliament', result: 'You hold your seat comfortably. The new Government offers you a peerage. You decline it; the Commons is your home.', diary: 'Held the seat. Declined the peerage. I will die a commoner.' },
            fail: { effects: 'office=None -!mp', result: 'You lose by a few hundred. Forty years in the House end at a count in a school gymnasium.', diary: 'Lost. Forty years, ended in a gymnasium. So be it.' } } },
        { label: 'Stand down at last', effects: 'health+6 office=None -!mp rep+2', result: 'You do not stand. On election night you listen to the results on the wireless with a cigar and a whisky and a great many memories.', diary: 'Did not stand. Listened on the wireless. A good life. Mostly.' },
      ] }
  );

  act.scenes.forEach((sc) => { if (sc.t == null) sc.t = sc.year; });
  act.scenes.sort((a, b) => a.t - b.t);
})();
