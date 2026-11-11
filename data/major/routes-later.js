/* The Quiet Major — route hinges in Acts II and III (docs/camps/major.md).
   Each of the four non-Haileybury routes gets the episodes its model lived through:
   the clerk (Alexander) the Co-op in 1926, the Admiralty and national service;
   the teacher (Ede) the school-leaving age, the 1944 Education Act and the reprieve file;
   Leeds (Greenwood) the 1928 programme and the slum-clearance Act;
   the pit (Griffiths) the 1926 lockout and the company union.
   Plus a home-front scene for players outside the House in 1940 who are not in Stepney. */
(function () {
  const TM = window.TM;
  const A2 = TM.ACTS.major[2], A3 = TM.ACTS.major[3];

  Object.assign(TM.PEOPLE, {
    buller: { name: 'Mr R. A. Buller', role: 'President of the Board of Education' },
    scurrah: { name: 'Mr John Scurrah', role: 'A Catholic Labour Member' },
  });

  const LAB = '~!fork-national31 ~!fork-spain37';
  const DEP = '!mp ~!leader ~!pm ~!fork-national31 ~!fork-terms40';

  const act2 = [
    { id: 'coop-1926', year: 1926, title: 'The stores and the strike', if: '!route-clerk',
      venue: { plate: 'city', label: 'The Co-operative stores, {borough}' },
      text: 'May 1926. The General Strike, and then the long lockout of the miners. The Co-op stores in the pit villages are being asked for credit by families with no wages coming in. The societies\' rules say cash only. The movement is neutral, its old guard insists: its members include strikers and blacklegs alike. If the stores give credit and the strike fails, some societies will go bankrupt.',
      basis: 'Co-operative societies extended credit to miners\' families during the 1926 lockout, at great cost to their own funds.',
      real: 'Many co-operative societies in the coalfields gave credit and relief to miners\' families in 1926, some to the edge of insolvency, and the movement\'s wholesale society lent to the retail societies. Alexander, then MP for Hillsborough, was the movement\'s leading voice in the Commons.',
      check: 'unchecked', facts: ['coop-1926'],
      choices: [
        { label: 'Credit for every striking family', effects: 'state+3 loyalty+2 money-2 rep+3', historical: true,
          result: 'The stores carry the coalfields through the summer. Three societies nearly go under, and you spend the winter persuading the wholesale society to rescue them. The miners do not forget.',
          diary: 'Credit agreed. A million pounds of bread on the slate.' },
        { label: 'Keep the rules: cash only, but a relief fund', effects: 'order+2 fav+2 state+1',
          result: 'The societies stay solvent and raise a voluntary fund for the children. It is not enough, and you know it.',
          diary: 'Relief fund. Sixpence a child a week. Not enough.' },
        { label: 'Use the stores to break the lockout', effects: 'state+4 order-4 steel+2 fav-6',
          result: 'You propose that the movement buy coal only from pits that settle on the miners\' terms. The old guard is appalled and the idea dies in committee. The miners\' leaders send you a letter of thanks.',
          diary: 'Proposed a coal boycott. Killed in committee. Thanked by the Fed.' },
      ] },

    { id: 'lockout-1926', year: 1926, title: 'Seven months', if: '!route-pit',
      venue: { plate: 'mill', label: 'The miners\' hall, Ammanford' },
      text: 'October 1926. The General Strike ended in nine days. The miners have been locked out for six months since. In the anthracite villages there are soup kitchens in the chapels, and men picking coal from the tips at night. The owners offer longer hours and lower pay, district by district. Some pits have gone back. The lodge asks you, as agent, what to do.',
      basis: 'The miners\' lockout of May to November 1926, which ended in defeat and district agreements.',
      real: 'The miners stayed out until late November 1926 and went back on longer hours and lower pay, district by district. Griffiths, then working as an agent in the anthracite district, organised relief and negotiated through the defeat.',
      check: 'research', facts: ['lockout-1926'],
      choices: [
        { label: 'Hold out with the Federation to the end', effects: 'steel+3 state+2 loyalty+3 health-4', historical: true,
          result: 'You hold out until the Federation itself gives way in November. The men go back on worse terms, together. Nobody can say the anthracite broke first.',
          diary: 'Back on worse terms. Together. That matters.' },
        { label: 'Negotiate a district settlement now', effects: 'order+2 fav+2 loyalty-3 money+1',
          result: 'You get the anthracite men back on terms a little better than others will get. The Federation calls it betrayal. Families eat.',
          diary: 'Settled early. Called a traitor. Children fed.' },
        { label: 'Organise the relief and leave the talking to others', effects: 'state+2 rep+2 cap+1',
          result: 'Soup kitchens in nine chapels, boots from the Co-op, a concert party touring England for funds. When it ends you have a name in every village.',
          diary: 'Nine kitchens. Concert party raised £300 in Birmingham.' },
      ] },

    { id: 'nation-1928', year: 1928, title: 'Labour and the Nation', if: '!route-leeds ' + LAB,
      venue: { plate: 'whitehall', label: 'The research department, Eccleston Square' },
      text: '1928. The executive wants a programme for the next election, and you are to draft it: mines, land, banks, housing, pensions, India. The Leader, Mr MacDougal, wants it vague, so that no Liberal voter is frightened. The left wants it short and sharp, with dates. Your own department has costed everything. Nobody has asked for the costings.',
      basis: 'Labour\'s 1928 programme "Labour and the Nation", drafted largely by the party\'s research staff and Tawney, was famously long and unspecific.',
      real: 'Labour and the Nation (1928) listed some seventy proposals with no order of priority. Greenwood was the party\'s research secretary. When Labour took office in 1929 it had no worked plan for unemployment.',
      check: 'unchecked', facts: ['greenwood-early'],
      choices: [
        { label: 'Write what the Leader wants', effects: 'loyalty+3 fav+3 cap-1', historical: true,
          result: 'Seventy proposals, beautifully written, with no order and no price. The press calls it a catalogue. It wins votes; it will not help in office.',
          diary: 'Seventy proposals. No priorities. As instructed.' },
        { label: 'Put the costings in, and five priorities', effects: 'cap+3 state+2 fav-3',
          result: 'The executive cuts the costings and keeps two of the priorities. In 1929, when the crisis comes, ministers will find your appendix in a drawer and wish they had read it.',
          diary: 'Costings cut. Two priorities kept. Appendix in a drawer.' },
        { label: 'Leak the full version to the Herald', effects: 'press+4 loyalty-4 fav-5 state+2',
          result: 'A splash, and a row. The left loves you; the Leader will never trust you again.',
          diary: 'Herald splash. MacDougal not speaking to me.' },
      ] },

    { id: 'schools-1931', year: 1931, title: 'The school-leaving age', if: '!route-teacher !mp ' + LAB,
      venue: { plate: 'gallery', label: 'The Commons, January 1931' },
      text: 'January 1931. The Labour government\'s Bill raises the school-leaving age to fifteen. The church schools say they cannot afford the extra places. Mr Scurrah, a Catholic Labour Member, has moved an amendment to delay the Bill until the denominational schools are given money, and Catholic Labour Members from Liverpool and Glasgow will vote for it. If it carries, the Bill is as good as dead.',
      basis: 'The Education (School Attendance) Bill 1930–31 and the Scurr amendment of January 1931, carried by Catholic Labour votes; the Lords then rejected the Bill.',
      real: 'In January 1931 John Scurr\'s amendment, delaying the raising of the school-leaving age until the voluntary schools were helped, was carried against the government with Catholic Labour support; the Lords then threw out the Bill. The age was not raised to fifteen until 1947.',
      check: 'unchecked', facts: ['scurr-1931'],
      choices: [
        { label: 'Broker money for the church schools', effects: 'cap+3 loyalty+2 reform+1', historical: true,
          roll: { stat: 'capital', diff: 55,
            pass: { effects: 'rep+3', result: 'You find a compromise grant the Catholics can accept. The amendment fails by eleven. The Lords still kill the Bill, but the bargain is remembered.', diary: 'Amendment beaten. Lords will kill it. The bargain will keep.' },
            fail: { effects: 'rep-1', result: 'The Treasury refuses a penny. The amendment carries. The Bill dies.', diary: 'Scurrah carried. The Bill is dead.' } } },
        { label: 'Fight the amendment head on', effects: 'state+2 steel+2 fav-2',
          result: 'You speak against it with more passion than anyone expected. It carries anyway, and three Catholic colleagues stop speaking to you.',
          diary: 'Spoke. Lost. Made enemies.' },
        { label: 'Let it go: the party cannot split now', effects: 'loyalty+2 order+1',
          result: 'The amendment carries. Children will leave at fourteen for another sixteen years. You tell yourself there will be another chance.',
          diary: 'Let it go. Fourteen it stays.' },
      ] },

    { id: 'company-union-1935', year: 1935, title: 'Stay-down', if: '!route-pit ' + LAB,
      venue: { plate: 'mill', label: 'Nine Mile Point colliery, Monmouthshire' },
      text: 'October 1935. The owners have set up a company union at some pits, and men of the Federation are being sacked for refusing to join it. At Nine Mile Point the Federation men have gone down the pit and refused to come up: a stay-down strike, in the dark, for days. The Federation has made you its president. The owners say talk to their union. The police say they will go down.',
      basis: 'The fight between the South Wales Miners\' Federation and the company union (the South Wales Miners\' Industrial Union), and the stay-down strikes of 1935, during Griffiths\'s presidency of the Federation.',
      real: 'In 1935 Federation miners staged stay-down strikes at several pits, including Nine Mile Point, against the company union. Griffiths was president of the South Wales Miners\' Federation from 1934 to 1936, and the company union was defeated by 1938.',
      check: 'unchecked', facts: ['stay-down-1935'],
      choices: [
        { label: 'Back the men, and call the coalfield out', effects: 'steel+3 state+3 loyalty+2 order-2', historical: true,
          roll: { stat: 'favour', diff: 45,
            pass: { effects: 'rep+4', result: 'The whole coalfield threatens to stop. The owners concede a ballot, and the company union loses it badly. You are the best-known miner in Wales.', diary: 'Ballot won. The company union is finished.' },
            fail: { effects: 'rep-1 health-3', result: 'The men come up after a week, hungry and filthy, with nothing settled. The fight drags on for another two years.', diary: 'They came up. Nothing settled. Not yet.' } } },
        { label: 'Bring them up, and fight it in the courts', effects: 'order+2 cap+2 fav+2',
          result: 'You persuade them up after four days and start a long legal campaign. The young men call you an old woman. The courts are slow.',
          diary: 'Brought them up. Lawyers. Slow.' },
        { label: 'Go down and stay with them', effects: 'steel+4 press+5 health-6 rep+3',
          result: 'The president of the Federation underground with the strikers: every paper in Britain has it by morning. It is the best thing you have ever done, or the most reckless.',
          diary: 'Underground with them. Day three. Pressmen at the pithead.' },
      ] },
  ];

  const act3 = [
    { id: 'out-guard-1940', year: 1940, title: 'Parashots', if: '~!mp ~!fork-national31 !route-clerk|!route-teacher|!route-leeds|!route-pit',
      venue: { plate: 'mill', label: 'A church hall, {borough}' },
      text: 'May 1940. The wireless has called for men to join the Local Defence Volunteers against German parachutists. In {borough} two hundred turn up the first night: old soldiers, boys, a poacher with his own gun. There are eleven rifles. You are fifty-seven, a councillor everyone knows. The colonel commanding wants you as his second. The council wants you for air-raid precautions.',
      basis: 'The Local Defence Volunteers, later the Home Guard, raised from 14 May 1940.',
      real: 'Some 250,000 men volunteered for the LDV within the first day of the appeal on 14 May 1940, and over a million by July. It was renamed the Home Guard in July 1940.',
      check: 'research', facts: ['ldv-1940'],
      choices: [
        { label: 'Take the platoon', effects: 'steel+2 loyalty+2 health-2', historical: true,
          result: 'Drill with broom handles, a roadblock of farm carts, and a night on the hill watching for parachutes that never come. By autumn you have rifles, and a platoon that would follow you anywhere.',
          diary: 'Platoon. Eleven rifles, forty men. No parachutists. Yet.' },
        { label: 'Run the air-raid precautions', effects: 'state+2 cap+2',
          death: { chance: 0.02, text: 'You were killed in an air raid in 1941 while checking a public shelter. You were 58.', headline: 'Death of Councillor {first} {last}' },
          result: 'Shelters, wardens, rest centres, the lists of the dead. When the bombers come you are ready, as far as anyone can be.',
          diary: 'ARP controller. Shelters for 6,000.' },
        { label: 'Neither: the evacuees need billets', effects: 'state+1 rep+2',
          result: 'You find homes for four hundred London children, and fight the householders who will not take them.',
          diary: 'Billets for 400. Mrs Hartley refused. Took her to the tribunal.' },
      ] },

    { id: 'admiralty-1941', year: 1941, title: 'Outside the War Room', if: '!route-clerk ' + DEP,
      venue: { plate: 'whitehall', label: 'The Admiralty, Whitehall' },
      text: 'March 1941. You are First Lord of the Admiralty, the post the Prime Minister himself held until last year. You have learned what that means: he runs the Navy from the map room with the First Sea Lord, and you are told afterwards. The Atlantic convoys are losing a ship a day. You have a view on the bombers being kept from Coastal Command. Nobody has asked for it.',
      basis: 'A. V. Alexander was First Lord of the Admiralty from May 1940 to 1945, largely excluded by Churchill from operational decisions.',
      real: 'Alexander succeeded Churchill as First Lord in May 1940 and held the post throughout the war. Churchill and the First Sea Lord, Pound, ran naval operations; Alexander handled administration, production and the Commons. The struggle over long-range aircraft for Coastal Command ran through 1942–43.',
      check: 'research', facts: ['alexander-admiralty'],
      choices: [
        { label: 'Run the shipyards, and leave the war to him', effects: 'loyalty+3 cap+2 order+1', historical: true,
          result: 'You take on the yards, the dockers and the steel quotas, and the escorts come off the slips faster. The Prime Minister calls you his faithful First Lord. You are not sure it is a compliment.',
          diary: 'Twenty-two corvettes this quarter. He calls me faithful.' },
        { label: 'Fight for the long-range aircraft', effects: 'steel+3 rep+2 fav-4 war+1',
          roll: { stat: 'capital', diff: 60,
            pass: { effects: 'war+2 rep+2', result: 'You take it to the War Cabinet and win a squadron of long-range Liberators. The air gap in mid-Atlantic starts to close.', diary: 'Won the Liberators. The air gap will close.' },
            fail: { effects: 'fav-3', result: 'The Air Ministry wins. The bombers go to Germany, and the U-boats keep hunting in the gap.', diary: 'Lost. The bombers go to Germany.' } } },
        { label: 'Threaten to resign unless you are in the room', effects: 'steel+2 temper+3 fav-6',
          roll: { stat: 'favour', diff: 70,
            pass: { effects: 'rep+3', result: 'He grumbles, and lets you sit in. You say little, and are listened to more for it.', diary: 'In the map room. Listened.' },
            fail: { effects: 'office=None rep-2', result: 'He accepts your resignation with a polite letter. A Tory gets the Admiralty.', diary: 'Resigned. He did not argue.' } } },
      ] },

    { id: 'education-1944', year: 1944, title: 'The Butler Act', if: '!route-teacher ' + DEP,
      venue: { plate: 'gallery', label: 'The Board of Education, Whitehall' },
      text: '1944. You are Parliamentary Secretary to the Board of Education, the Labour half of a coalition team with Mr Buller, the clever young Conservative President. Your Bill will give free secondary schooling to every child and raise the leaving age to fifteen. The churches want money for their schools; the Treasury wants delay. A Tory back bencher has carried an amendment giving women teachers equal pay. The Prime Minister wants it reversed as a vote of confidence.',
      basis: 'The Education Act 1944, piloted by R. A. Butler and Chuter Ede; the equal-pay amendment carried on 28 March 1944 and reversed two days later on a confidence vote.',
      real: 'Ede was Butler\'s Labour deputy on the 1944 Education Act. On 28 March 1944 the Commons carried Thelma Cazalet-Keir\'s amendment for equal pay for women teachers by one vote; Churchill made its removal a matter of confidence and it was reversed on 30 March. Equal pay for teachers came in stages from 1955.',
      check: 'research', facts: ['education-1944'],
      choices: [
        { label: 'Vote to reverse it, and save the Act', effects: 'loyalty+3 order+1 reform+2', historical: true,
          result: 'You vote against something you believe in, to save something bigger. The Act passes. Every child in England will go to secondary school. The women teachers of your old union write to you in sorrow.',
          diary: 'Voted against equal pay. To save the Act. I hope they forgive me.' },
        { label: 'Resign, and vote for equal pay', effects: 'state+3 steel+3 rep+3 fav-5 office=None',
          result: 'You resign and vote with the rebels. The amendment is reversed anyway, by a large majority. Mr Buller pilots the Bill without you. The union gives you a dinner.',
          diary: 'Resigned. Voted for equal pay. Lost. The union gave me a dinner.' },
        { label: 'Persuade Buller to promise a commission', effects: 'cap+3 loyalty+1',
          roll: { stat: 'capital', diff: 50,
            pass: { effects: 'rep+2 reform+1', result: 'Buller agrees to a royal commission on equal pay. The vote is reversed, but the women have something in writing.', diary: 'A royal commission. Something.' },
            fail: { effects: 'rep-1', result: 'Buller is sympathetic and powerless. The vote is reversed.', diary: 'Buller sympathetic. Useless.' } } },
      ] },

    { id: 'national-service-1947', year: 1947, title: 'Eighteen months', if: '!route-clerk !mp ~!leader ~!pm ~!fork-national31 ~!fork-terms40',
      venue: { plate: 'whitehall', label: 'The Ministry of Defence, Storey\'s Gate' },
      text: 'April 1947. You are Minister of Defence, and the National Service Bill will conscript every young man for eighteen months, in peacetime, for the first time in British history. Seventy Labour Members have voted against it on second reading, many of them pacifists you have known for thirty years. The chiefs of staff say eighteen months is the least they can work with. The Whips say the rebellion will grow.',
      basis: 'The National Service Act 1947: Alexander, as Minister of Defence, cut the term from eighteen months to twelve after a Labour back-bench revolt (later restored to eighteen in 1948).',
      real: 'In April 1947, after 72 Labour Members voted against the National Service Bill, the government cut the term from 18 to 12 months. The chiefs of staff were dismayed, and in 1948 it was raised back to 18 months, and to two years during Korea.',
      check: 'research', facts: ['national-service-1947'],
      choices: [
        { label: 'Cut it to twelve months', effects: 'loyalty+3 fav+2 war-1', historical: true,
          result: 'The rebellion subsides. The chiefs of staff are furious; one threatens to resign. Within eighteen months you will have to put it back up.',
          diary: 'Twelve months. The Chiefs are livid. Party quiet.' },
        { label: 'Hold to eighteen', effects: 'steel+3 order+2 loyalty-3 war+2',
          roll: { stat: 'favour', diff: 50,
            pass: { effects: 'rep+2', result: 'The Bill passes with Tory votes and a bigger Labour rebellion. The chiefs trust you. The party does not.', diary: 'Eighteen months, on Tory votes.' },
            fail: { effects: 'rep-2 fav-3', result: 'The Cabinet overrules you and cuts it to twelve. You look weak and stubborn at once.', diary: 'Overruled. Worst of both.' } } },
        { label: 'Offer the pacifists a conscience clause', effects: 'state+2 cap+2',
          result: 'Wider grounds for conscientious objection, and tribunals with Labour members. A third of the rebels come back. The term stays at eighteen, for now.',
          diary: 'Conscience clause. Twenty-five rebels back.' },
      ] },

    { id: 'reprieve-1950', year: 1950, title: 'The reprieve file', if: '!route-teacher !mp ~!leader ~!pm ~!fork-national31 ~!fork-terms40',
      venue: { plate: 'whitehall', label: 'The Home Office, Whitehall' },
      text: 'March 1950. You are Home Secretary, and on your desk is the file of a young van driver from Notting Hill, of low intelligence, convicted of murdering his baby daughter. He confessed, then withdrew it, and accused the man downstairs, a former police reservist who gave evidence against him. The appeal has failed. The judge sees no grounds for mercy. The execution is in two days. Only you can stop it.',
      basis: 'The case of Timothy Evans, hanged on 9 March 1950 after Chuter Ede, as Home Secretary, declined a reprieve; John Christie, the chief prosecution witness, was later found to be a serial murderer.',
      real: 'Evans was hanged on 9 March 1950. In 1953 John Christie, who lived downstairs and had given evidence against him, was found to have murdered several women and was hanged. Evans received a posthumous pardon in 1966. Ede later said he had made a mistake and came to oppose capital punishment.',
      check: 'research', facts: ['evans-1950'],
      choices: [
        { label: 'Let the law take its course', effects: 'order+2 loyalty+1', historical: true,
          result: 'You find no grounds to interfere, as your officials advise, and initial the file. A young man is hanged at Pentonville on a Thursday morning. You will think about this file for the rest of your life.',
          diary: 'Initialled the Evans file. No grounds, they said.' },
        { label: 'Commute the sentence to life', effects: 'state+2 rep-2 press-2 #merciful',
          result: 'The newspapers say a child-killer has been spared. Three years later, the man downstairs is found to have killed at least six women in that house. You are thanked by nobody, and are glad.',
          diary: 'Commuted. The papers furious. I could not do it.' },
        { label: 'Order a fresh inquiry into the witness', effects: 'cap+2 state+1 order-1',
          roll: { stat: 'capital', diff: 60,
            pass: { effects: 'rep+3', result: 'Detectives go back to the house. Under the garden they find bones. The man downstairs is arrested, and the young man\'s conviction is quashed.', diary: 'Bones in the garden. Evans released.' },
            fail: { effects: 'rep-1', result: 'The inquiry finds nothing in two days, and the execution goes ahead. The truth comes out three years later.', diary: 'Nothing found. He was hanged.' } } },
      ] },
  ];

  const weave = (act, list) => {
    for (const sc of list) {
      const i = act.scenes.findIndex((x) => x.year > sc.year);
      act.scenes.splice(i < 0 ? act.scenes.length : i, 0, sc);
    }
  };
  weave(A2, act2);
  weave(A3, act3);
})();
