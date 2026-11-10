/* The Bulldog — Act II: The Climb (1901–1938), part 1: 1901–1918.
   DRAFT. Spine: Churchill's middle years (RESEARCH.md §B). Blended in, by Act I route:
     route-navy     → Roger Keyes (Sir Roger Keys): Zeebrugge 1918
     route-gunner   → Desmond Morton (Desmond Martyn): shot through the lung at Arras 1917
     route-germany  → F. Lindemann (the Prof): Farnborough spin recovery 1916
     route-fo       → Duff Cooper (Duff Cowper): Grenadier Guards, DSO 1918
     route-oxford   → Leo Amery (Leo Emery): the 1908 by-election lost by eight; intelligence; torpedoed
     route-colonies → Brendan Bracken (Brendan Bracknell): the invented self, publishing (part 2)
   Players who left Act I without a seat get a way in (1906, 1908, 1910, 1918).
   Scenes carry `t` (decimal year) and are sorted with the rest of Act II at the end of part 2. */
(function () {
  const TM = window.TM;
  TM.ACTS.bulldog = TM.ACTS.bulldog || {};

  Object.assign(TM.PEOPLE = TM.PEOPLE || {}, {
    askwith: { name: 'Mr H. H. Askwith', role: 'Liberal leader, then Prime Minister' },
    clemency: { name: 'Miss Clemency Hosier', role: 'Clever, poor, and very beautiful' },
    fisher: { name: 'Admiral Lord Fisher', role: 'First Sea Lord' },
    keys: { name: 'Commodore Roger Keys', role: 'Naval officer' },
    sergeant: { name: 'Sergeant Hollis', role: 'Your battery sergeant' },
  });

  const D = (chance, text, headline) => ({ chance, text, headline });

  TM.ACTS.bulldog[2] = {
    title: 'Act II · The Climb',
    span: '1901–1938',
    intro: 'The old Queen is dead and the century is new. You are twenty-six, with a famous name, a little money from books and lectures, and a great deal of impatience. Ahead lie thirty-seven years of office and exile, war and recovery, friends made and friends lost. By the end of them you will be either a spent force or the one man the country has not yet tried.',
    start: { year: 1901, effects: 'health+6' },
    scenes: [],
  };
  const act = TM.ACTS.bulldog[2];

  act.scenes.push(
    /* ───────── Outside the House: the way in ───────── */
    { id: 'out-1901', t: 1901.4, year: 1901, title: 'Outside the House', if: '~!mp',
      venue: { plate: 'city', label: 'Rooms in Mayfair' },
      text: 'The new century has begun without you in Parliament. Men you knew at school are already Members, and one or two are already bores. You have a name, a set of rooms you cannot quite afford, and a pile of letters asking you to speak, to write, to invest, to marry. A seat will come up sooner or later. The question is what you will be when it does.',
      basis: 'Churchill\'s lecture tours of 1900–01; Amery\'s years at The Times before his 1908 by-election; Bracken\'s self-invention in publishing.',
      real: 'Churchill was already an MP by 1901 and earned about £10,000 from lectures and books in 1900–01. Amery spent the decade at The Times and writing its history of the Boer War before standing for Parliament. Bracken, a generation later, made his name and money in financial publishing.',
      check: 'research', facts: ['lecture-tour', 'amery-times'],
      choices: [
        { label: 'Lecture in America and come home with money', effects: 'money+12 press+3 rep+2 #lecturer', result: 'You lecture from Boston to Winnipeg on the war, to halls that are sometimes full and sometimes hostile. You come home with ten thousand pounds and a cold.', diary: 'Ten thousand pounds! America pays to hear about a war it disapproves of.' },
        { label: 'Join The Times and write its history of the war', effects: 'cap+3 empire+2 press+4 #times-man', result: 'Printing House Square takes you on. You write the war, volume by volume, and find that you know where every reputation is buried.', diary: 'A desk at The Times. I am writing the war, and the generals are frightened of me.' },
        { label: 'Start a weekly paper, on borrowed money', effects: 'money-8 press+6 temper+2 #proprietor', roll: { stat: 'temper', diff: 50,
            pass: { effects: 'money+10 rep+3', result: 'The paper sells. Advertisers come, then politicians, asking to be noticed.', diary: 'The paper pays! Men who would not see me last year now ask me to lunch.' },
            fail: { effects: 'money-8', result: 'It folds after nine months, owing the printer. You learn a great deal about printers.', diary: 'The paper is dead. The printer is not, and wants paying.' } } },
        { label: 'Nurse a constituency and wait', effects: 'seat+10 loyalty+2 fav+3', result: 'You take a hall in a northern town every month and talk to whoever comes. Slowly more come.', diary: 'Forty-one at the meeting tonight. Last month it was nineteen.' },
      ] },

    { id: 'election-1906', t: 1906.05, year: 1906, title: 'The landslide', if: '~!mp',
      venue: { plate: 'mill', label: 'A Lancashire count' },
      text: 'January 1906. The Tories are going down to the worst defeat in their history: Free Trade, Chinese labour on the Rand, and a decade of being in office. You have been offered a candidacy. The question is under which colours. The Tory label is poison this winter. The Liberals would take you, and so might the Free Trade Unionists, who belong to nobody.',
      basis: 'The 1906 general election; the Liberal landslide; Churchill\'s Free Trade campaign in Manchester North West.',
      real: 'The Liberals won about 400 seats in January 1906, and the Conservatives fell to 157. Churchill, by then a Liberal, won Manchester North West. Balfour lost his own seat.',
      check: 'research', facts: ['election-1906'],
      choices: [
        { label: 'Stand as a Liberal and Free Trader', historical: true, effects: 'state+1 loyalty-2 !liberal', roll: { stat: 'reputation', diff: 30,
            pass: { effects: 'seat+40 cap+5 office=Member_of_Parliament !mp', result: 'The tide carries you in, with a majority of over a thousand.', diary: 'Elected, in the landslide! A Liberal, and in.' },
            fail: { effects: 'seat+5', result: 'Even in the landslide, your town stays Tory by eighty votes.', diary: 'Lost, in a Liberal year. Remarkable. I must be the only one.' } } },
        { label: 'Stand as a Tory and take the beating', effects: 'loyalty+3 fav+5 empire+1', roll: { stat: 'reputation', diff: 55,
            pass: { effects: 'seat+35 cap+6 press+4 office=Member_of_Parliament !mp', result: 'You hold on, one of the few new Tories to win anywhere. The party remembers it.', diary: 'A Tory seat in a Liberal flood. They will not forget this at Central Office.' },
            fail: { effects: 'seat+8 fav+3', result: 'You lose, honourably, with everybody else.', diary: 'Out, with the whole party. At least I have company.' } } },
        { label: 'Stand as an Independent Free Trader', effects: 'loyalty-4 temper+2 #independent', roll: { stat: 'press', diff: 45,
            pass: { effects: 'seat+30 cap+4 office=Member_of_Parliament !mp', result: 'Both parties stand against you, and you beat them both.', diary: 'Elected, belonging to nobody. Both Whips glare at me equally.' },
            fail: { effects: 'seat+4', result: 'You split the vote and let the Liberal in.', diary: 'Split the vote. The Liberal thanked me. I could have struck him.' } } },
      ] },

    { id: 'wolverhampton-1908', t: 1908.3, year: 1908, title: 'By eight votes', if: '~!mp',
      venue: { plate: 'mill', label: 'A by-election in the Black Country' },
      text: 'A Liberal Member has died and the seat is to be fought at once. It is a working town of foundries and chapels, and the Liberals held it by thousands in 1906. Your agent thinks it can be won on tariffs and jobs. The count goes on past midnight. The returning officer sends for both candidates. It is close, he says. Very close. Do you ask for a recount?',
      basis: 'Leo Amery at the Wolverhampton East by-election, 1908.',
      real: 'Amery fought Wolverhampton East as a Tariff Reformer in May 1908 and lost by eight votes. He did not enter Parliament until 1911, for Birmingham South.',
      check: 'research', facts: ['amery-eight'],
      choices: [
        { label: 'Demand a recount', effects: 'temper+1', roll: { stat: 'temper', diff: 55,
            pass: { effects: 'seat+35 cap+5 press+5 office=Member_of_Parliament !mp', result: 'The recount finds a bundle of your votes on the wrong table. You are in, by eleven.', diary: 'In by eleven, after the recount. Eleven men in Wolverhampton made me.' },
            fail: { effects: 'seat+10 rep+2 !lost-by-eight', result: 'The recount confirms it. You have lost by eight votes.', diary: 'Eight votes. EIGHT. I could have shaken eight more hands in the market.' } } },
        { label: 'Accept the count and shake his hand', historical: true, effects: 'rep+3 seat+10 !lost-by-eight', result: 'You lose by eight. You make a short speech that the crowd likes better than his, and the paper says you will be back.', diary: 'Lost by eight. Shook his hand. Next time.' },
        { label: 'Claim irregularities and petition the courts', effects: 'money-6 fav-3 press+2', roll: { stat: 'money', diff: 50,
            pass: { effects: 'seat+30 office=Member_of_Parliament !mp', result: 'The election court finds that his agent treated voters to beer. The result is reversed.', diary: 'The court has unseated him for beer. I am a Member by judgment.' },
            fail: { effects: 'money-6 rep-3', result: 'The petition fails, and costs a fortune. You look like a bad loser.', diary: 'Petition thrown out. Costs against me.' } } },
      ] },

    { id: 'election-1910', t: 1910.05, year: 1910, title: 'The Peers against the People', if: '~!mp',
      venue: { plate: 'city', label: 'A London count' },
      text: 'January 1910. The Lords have thrown out the Budget, and the country is voting on whether they had the right. Every candidate in England is shouting about dukes. You have been given a seat in a London suburb that your side might take. The crowds are bigger and angrier than you have ever seen, and the posters show a coronet crushing a loaf of bread.',
      basis: 'The January 1910 election on the People\'s Budget and the Lords\' veto.',
      real: 'The Lords rejected Lloyd George\'s 1909 Budget, forcing an election in January 1910. The Liberals lost their overall majority and governed with Irish and Labour support. A second election followed in December 1910, and the Parliament Act of 1911 curbed the Lords.',
      check: 'research', facts: ['election-1910'],
      choices: [
        { label: 'Fight for the Budget and against the Lords', effects: 'order-2 state+2 !liberal', roll: { stat: 'reputation', diff: 40,
            pass: { effects: 'seat+35 cap+4 office=Member_of_Parliament !mp', result: 'You win, narrowly, on the dukes.', diary: 'Elected! The dukes did it for me.' },
            fail: { effects: 'seat+6', result: 'The suburb dislikes dukes, but it dislikes taxes more.', diary: 'Out again. The villas do not want to soak the rich. They hope to be rich.' } } },
        { label: 'Fight for the Lords and for tariffs', effects: 'order+2 empire+2', roll: { stat: 'reputation', diff: 35,
            pass: { effects: 'seat+35 cap+4 fav+4 office=Member_of_Parliament !mp', result: 'The suburbs swing back, and you swing with them.', diary: 'Elected! The villas are with us.' },
            fail: { effects: 'seat+6', result: 'A close defeat.', diary: 'Out again. One more go.' } } },
        { label: 'Stand aside and go back to work', effects: 'money+6 health+3', result: 'You let someone else have the seat, and spend the year earning money instead.', diary: 'Did not stand. The bank manager is grateful.' },
      ] },

    /* ───────── In the House: the spine ───────── */
    { id: 'free-trade-1904', t: 1904.4, year: 1904, title: 'Across the floor', if: '!mp ~!liberal',
      venue: { plate: 'gallery', label: 'The House of Commons' },
      text: 'Mr Chambers has resigned to campaign for tariffs, and your party is splitting. Free Traders are hissed at their own meetings. When you rose to speak last month, the Prime Minister and most of the front bench walked out. The Liberals are watching you. Their benches have a seat beside a Welsh Radical you have come to like. It is a short walk across the floor and a very long way back.',
      basis: 'Churchill\'s crossing to the Liberals, 31 May 1904, over Free Trade and the Aliens Bill.',
      real: 'Churchill crossed the floor on 31 May 1904 and took his seat beside Lloyd George. The immediate causes were Joseph Chamberlain\'s tariff campaign and the Aliens Bill. Tory Members had walked out when he rose to speak that spring.',
      check: 'research', facts: ['crossed-1904'],
      choices: [
        { label: 'Bow to the Speaker and sit with the Liberals', historical: true, requires: '#free-trader|loyalty<3', showLocked: true, effects: 'loyalty-6 state+2 fav-15 press+6 @gwynne+10 !liberal', result: 'You walk in, bow to the Chair, look at the Liberal benches, and sit down beside Mr Lloyd Gwynne. The Tories call you a rat. The Liberals cheer. Both sides will remember it.', diary: 'Crossed. Sat by Gwynne. Rat, they said. I have been called worse by better.' },
        { label: 'Stay, and fight for Free Trade from inside', effects: 'loyalty+2 cap+2 fav-4 #free-fooder', result: 'You stay a Tory Free Trader, one of a dwindling band, harried by your own Whips and ignored by your own leaders.', diary: 'Stayed. They make it hard. Good.' },
        { label: 'Come round to tariffs', effects: 'empire+3 state-1 fav+8 @chambers+12', result: 'You make a speech for imperial preference. Mr Chambers sends a note of thanks in his own hand. The Free Traders call you a weathercock.', diary: 'Came out for tariffs. The Free Fooders are wounded. Chambers is delighted.' },
        { label: 'Resign the seat and fight it again as a Free Trader', effects: 'temper+3 loyalty-3 rep+3', roll: { stat: 'reputation', diff: 50,
            pass: { effects: 'press+8 !liberal #independent', result: 'You win your own by-election against both parties.', diary: 'Resigned and re-elected. The voters agree with me, if no one else does.' },
            fail: { effects: 'seat-40 office=None -!mp', result: 'You lose the seat you resigned. It was magnificent and it was not politics.', diary: 'Resigned, and lost. Out of the House at twenty-nine.' } } },
      ] },

    { id: 'manchester-1908', t: 1908.3, year: 1908, title: 'Two elections in a month', if: '!mp !liberal',
      venue: { plate: 'mill', label: 'Manchester North West' },
      text: 'Mr Askwith has become Prime Minister and offered you the Board of Trade, in the Cabinet, at thirty-three. Under the rules a new minister must fight his seat again. The Tories, the brewers and the suffragettes all mean to make an example of you in Manchester. Dundee has a Liberal vacancy and would take you if Manchester throws you out. Do you hedge?',
      basis: 'Churchill\'s Manchester North West by-election, April 1908, and his election for Dundee in May.',
      real: 'Churchill lost the Manchester North West by-election in April 1908 on appointment to the Board of Trade, then won Dundee weeks later and held it until 1922.',
      check: 'research', facts: ['dundee-1908'],
      onEnter: 'office=President_of_the_Board_of_Trade cap+6',
      choices: [
        { label: 'Fight Manchester and nothing else', historical: true, effects: 'steel+1', roll: { stat: 'press', diff: 55,
            pass: { effects: 'seat+10 press+4', result: 'You hold Manchester by a hundred and twenty.', diary: 'Held Manchester! The suffragettes shouted the whole way through. I spoke louder.' },
            fail: { effects: 'press-3 seat+20', result: 'You lose Manchester. Dundee takes you within the month, by a majority Manchester never gave you.', diary: 'Lost Manchester. Won Dundee. A safe seat at last, and a cold one.' } } },
        { label: 'Take Dundee at once and leave Manchester', effects: 'seat+25 rep-3', result: 'You go north before the fight. Manchester calls you a deserter; Dundee is pleased to have a Cabinet minister.', diary: 'Dundee. Safe, wet, and mine.' },
        { label: 'Meet the suffragettes and promise a hearing', effects: 'order-1 press+3 @askwith-4', result: 'You meet them. They are cleverer than your agent. You promise more than the Prime Minister will like.', diary: 'Met the suffragettes. They had better arguments than I did.' },
      ] },

    { id: 'marriage-1908', t: 1908.6, year: 1908, title: 'The girl at the dinner party',
      venue: { plate: 'ballroom', label: 'A summer house at Blenheim' },
      text: 'You met her years ago at a ball and were tongue-tied. You met her again this spring at dinner and were not. She is clever, poor, beautiful, a Liberal by conviction, and nobody\'s fool. You have brought her to a temple in the park, in the rain, and you have been talking for an hour about everything except the thing you came to say. She is waiting.',
      basis: 'Churchill\'s proposal to Clementine Hozier at Blenheim, August 1908.',
      real: 'Churchill proposed to Clementine Hozier at the Temple of Diana at Blenheim in August 1908, and they married that September. The marriage lasted until his death in 1965.',
      check: 'research', facts: ['marriage-1908'],
      choices: [
        { label: 'Ask her to marry you', historical: true, effects: 'health+6 temper-1 @clemency+40 #married', status: { clemency: 'Your wife. Your sternest critic and your best friend.' }, result: 'She says yes. You are married within a month, and you write later that you lived happily ever after. It is very nearly true.', diary: 'She said yes. I can think of nothing else to write. She said yes.' },
        { label: 'Lose your nerve and talk about the Budget', effects: '@clemency+5', roll: { stat: 'temper', diff: 50,
            pass: { effects: 'health+4 @clemency+30 #married', result: 'She lets you finish, and then asks you herself. You are married in September.', diary: 'I talked about the Budget. She proposed. I accepted.' },
            fail: { effects: '@clemency-10', result: 'The rain stops. So does the moment. She marries someone else two years later.', diary: 'I talked about the Budget. Fool.' } } },
        { label: 'Stay a bachelor. Politics is jealous', effects: 'cap+3 health-4 #bachelor', result: 'You go back to London alone, and to work. It suits you, mostly.', diary: 'Alone. Work. It will do.' },
      ] },

    { id: 'lords-1910', t: 1910.6, year: 1910, title: 'The ditch', if: '!mp ~!liberal',
      venue: { plate: 'club', label: 'The Carlton Club' },
      text: 'The Lords have lost two elections on the Budget, and now the King has promised to create enough Liberal peers to swamp them. Some Tories want to fight to the last ditch: let the King make five hundred peers and be damned. Others say surrender and save the House from ridicule. Your leaders are divided. They want to know which way the younger men will go.',
      basis: 'The Parliament Act crisis, 1910–11: the Conservative "ditchers" against the "hedgers". Amery, then a young Tariff Reformer, sided with the diehards.',
      real: 'The Parliament Act passed the Lords in August 1911 by 131 to 114 after the King agreed to create peers if needed. The Conservative diehards who fought to the end were called "ditchers".',
      check: 'unchecked', facts: ['ditchers-1911'],
      choices: [
        { label: 'Die in the last ditch', effects: 'order+3 steel+2 loyalty-2 fav+2 #diehard', result: 'You vote and speak with the diehards. You lose, gloriously, and the leader who would not fight is gone within the year.', diary: 'We lost. We were right. The leader is finished.' },
        { label: 'Hedge, and keep the House from farce', effects: 'loyalty+2 cap+2 fav+4', result: 'You advise surrender. The Bill passes; the Lords survive, smaller.', diary: 'Hedged. Sensible. I feel a coward.' },
        { label: 'Back the Bill, and say why', effects: 'order-3 loyalty-6 fav-10 @gwynne+8 press+4', result: 'You speak for the Bill. Your own side howls. You are now trusted by nobody, which is a kind of freedom.', diary: 'Spoke for the Parliament Bill. My side thinks me a traitor. Perhaps.' },
      ] },

    { id: 'tonypandy', t: 1910.85, year: 1910, title: 'The Rhondda', if: '!mp !liberal',
      venue: { plate: 'whitehall', label: 'The Home Office' },
      onEnter: 'office=Home_Secretary cap+4',
      text: 'November 1910. You are Home Secretary. In the Rhondda the miners are out, the pits are guarded, and last night there was rioting at Tonypandy. The Chief Constable of Glamorgan has asked for troops. The soldiers are already on the trains. You can let them go on, hold them back and send London police instead, or go down yourself. Whatever you do, the valleys will remember it.',
      basis: 'Churchill as Home Secretary and the Tonypandy riots, November 1910.',
      real: 'Churchill held the troops back and sent about 270 Metropolitan Police, while keeping soldiers in reserve under General Macready. Soldiers were later deployed. The legend that he "sent the troops" against the miners followed him for the rest of his life.',
      check: 'research', facts: ['tonypandy'],
      choices: [
        { label: 'Hold the troops; send London police', historical: true, effects: 'order+1 steel-1 press-2 #held-troops', result: 'Two hundred and seventy London police go down, with the soldiers held at Cardiff. The riots die down. The Tories say you were weak, and the miners will say for fifty years that you sent the soldiers.', diary: 'Held the soldiers back. Both sides hate me for it. Probably right, then.' },
        { label: 'Let the troops go on', effects: 'order+3 steel+2 @gwynne-6 #sent-troops', result: 'The soldiers go in. There is no shooting, this time. The valleys never forgive you.', diary: 'Soldiers into the Rhondda. Order restored. Something else lost.' },
        { label: 'Go down to Tonypandy yourself', effects: 'temper+3 rep+3 health-3', roll: { stat: 'temper', diff: 55,
            pass: { effects: 'press+6 order-1 #friend-of-labour', result: 'You talk to the lodge in a chapel vestry for three hours. The riots stop. The owners are furious.', diary: 'Three hours in a vestry with the lodge. They are not wicked. Nor are the police.' },
            fail: { effects: 'press-6 health-4', result: 'Your carriage is stoned in the valley and you are got out by the back of a chapel.', diary: 'Stoned in the Rhondda. A Home Secretary in a vestry, running.' } } },
      ] },

    { id: 'sidney-street', t: 1911.02, year: 1911, title: 'Sidney Street', if: '!mp !liberal',
      venue: { plate: 'city', label: 'Stepney, East London' },
      text: 'January 1911. Armed anarchists who shot three policemen dead last month are cornered in a house in Sidney Street, Stepney. The police have only shotguns and revolvers. Scots Guards have come from the Tower. A crowd of thousands is watching, and so is a newsreel camera. You are in your top hat at the corner, under fire. Then the house begins to burn, and the fire brigade asks your leave to go in.',
      basis: 'Churchill at the Siege of Sidney Street, 3 January 1911.',
      real: 'Churchill went to Sidney Street and was photographed there in his top hat. When the house caught fire, he supported the decision to let it burn rather than send firemen in under fire. Two bodies were found inside. Balfour mocked him in the House for being there.',
      check: 'research', facts: ['sidney-street'],
      choices: [
        { label: 'Let it burn', historical: true, effects: 'steel+2 temper+2 press-3 #under-fire', result: 'The house burns. Two bodies are found in the ashes. In the House next week the Tory leader asks, drily, what the Home Secretary was doing there.', diary: 'Let it burn. I should not have been there. I would go again.' },
        { label: 'Send the firemen in', effects: 'order-1 rep+2', death: D(0.01, 'A stray shot from the burning house, in Sidney Street. You were thirty-six.', 'Home Secretary killed at Stepney siege'), roll: { stat: 'temper', diff: 55,
            pass: { effects: 'press+3', result: 'The firemen go in as the last shots stop. Nobody else dies.', diary: 'Firemen went in. Nobody else killed. A good day, just.' },
            fail: { effects: 'press-6 rep-3', result: 'A fireman is wounded at the door. The papers ask who gave the order.', diary: 'A fireman shot. My order. My fault.' } } },
        { label: 'Go home. A Home Secretary does not stand on street corners', effects: 'temper-3 loyalty+2', result: 'You leave it to the police. The siege ends without you, and so does the photograph.', diary: 'Stayed away. Correct. Hated it.' },
      ] },

    { id: 'fleet-1914', t: 1914.55, year: 1914, title: 'The Fleet at Spithead', if: '!mp !liberal',
      venue: { plate: 'whitehall', label: 'The Admiralty' },
      onEnter: 'office=First_Lord_of_the_Admiralty !admiralty',
      text: 'July 1914. You have been First Lord of the Admiralty since 1911. The Fleet has just finished a test mobilisation at Spithead and is due to disperse. Austria has sent an ultimatum to Serbia. The Cabinet has not decided anything and will not for days. If the ships go to their home ports, it will take a week to bring them back together.',
      basis: 'Churchill at the Admiralty, 1911–15; the order of 26 July 1914 keeping the Fleet together after the test mobilisation.',
      real: 'Churchill became First Lord in October 1911. On 26 July 1914 the First Sea Lord, Prince Louis of Battenberg, stopped the dispersal of the Fleet after the test mobilisation, and Churchill backed him. On 29 July the Fleet moved to Scapa Flow.',
      check: 'unchecked', facts: ['fleet-1914'],
      choices: [
        { label: 'Hold the Fleet together without asking', historical: true, effects: 'steel+3 loyalty-2 war+4 @askwith-2', result: 'The order goes out at four in the afternoon. The Fleet stays together, then steams north to Scapa in the dark, unlit. When war comes, it is ready.', diary: 'Fleet held. Sent north in the dark. Nobody asked me. I shall be glad of that.' },
        { label: 'Ask the Cabinet first', effects: 'loyalty+3 steel-1', roll: { stat: 'favour', diff: 50,
            pass: { effects: 'fav+3', result: 'The Prime Minister agrees in a scribbled note.', diary: 'Askwith agreed. The Fleet is held.' },
            fail: { effects: 'war-3', result: 'The Cabinet argues for three days. Half the Fleet goes home to refit.', diary: 'Cabinet argued. Half the Fleet dispersed. God help us.' } } },
        { label: 'Let the ships go home. Do not provoke the Germans', effects: 'steel-3 war-5', result: 'The squadrons disperse. When war comes a week later, they come back together in a hurry.', diary: 'Fleet dispersed. I hope I was right.' },
      ] },

    { id: 'dardanelles', t: 1915.3, year: 1915, title: 'The Narrows', if: '!admiralty',
      venue: { plate: 'whitehall', label: 'The Admiralty war room' },
      text: 'Spring 1915. The Western Front is stuck. You have pressed for the Fleet to force the Dardanelles and knock Turkey out. The ships went in on 18 March; three battleships were sunk by mines and the admiral has stopped. Lord Fisher, your First Sea Lord, has turned against the whole affair. The Army is landing at Gallipoli. Do you push on, cut your losses, or stand by it?',
      basis: 'Churchill and the Dardanelles campaign, 1915; Fisher\'s resignation in May 1915.',
      real: 'The naval attack failed on 18 March 1915. Fisher resigned in May, the Liberal government became a coalition, and Churchill was demoted to Chancellor of the Duchy of Lancaster. He resigned on 25 November 1915 and went to the Western Front. Gallipoli was evacuated in January 1916.',
      check: 'research', facts: ['dardanelles'],
      choices: [
        { label: 'Push on: send the ships in again', historical: true, effects: 'steel+3 temper+3 @fisher-20 war-4 rep-6 office=Chancellor_of_the_Duchy !resigned-1915', result: 'The Navy will not go in again. Lord Fisher resigns. The Tories enter a coalition on condition that you leave the Admiralty. You are given a sinecure. In November, shut out of the war\'s direction, you resign it and go to France.', diary: 'Fisher has gone. So have I, in all but name. Chancellor of the Duchy. A title for a corpse.' },
        { label: 'Call it off and save the Army', effects: 'steel-2 loyalty+2 rep-3', result: 'You argue for evacuation and lose. The Army stays. You stay too, discredited by the ships if not by the soldiers.', diary: 'Argued for withdrawal. Overruled. It will go on.' },
        { label: 'Resign at once and take the blame', effects: 'rep+4 cap-10 office=Backbencher !resigned-1915', result: 'You resign before you are pushed and make a statement the House hears in silence. Then you look for a regiment.', diary: 'Resigned. Clean. Now the trenches.' },
      ] },

    { id: 'august-1914', t: 1914.6, year: 1914, title: 'August', if: '~!admiralty',
      venue: { plate: 'city', label: 'London, August 1914' },
      text: 'War. The crowds in Whitehall are cheering and the recruiting offices have queues round the block. You are forty and could stay where you are: Members, journalists and men of business are needed at home, and nobody would blame you. Your old friends are already in uniform. What you choose now decides where you spend the next four years, and whether you see the end of them.',
      basis: 'August 1914 and the camp\'s war records: Keyes at sea, Morton in the artillery, Lindemann at Farnborough, Duff Cooper in the Guards, Amery in intelligence.',
      real: 'Keyes served in the Dardanelles and led the Zeebrugge raid in 1918. Morton was shot through the lung at Arras in 1917. Lindemann worked out spin recovery at Farnborough and learned to fly to test it. Duff Cooper won the DSO with the Grenadiers in 1918. Amery served as an intelligence officer in the Balkans and was torpedoed.',
      check: 'research', facts: ['keyes-zeebrugge', 'morton-arras', 'lindemann-spin', 'duff-dso', 'amery-war'],
      choices: [
        { label: 'Into the line, as soon as they will have you', effects: 'steel+3 empire+1 rep+3 !at-front', result: 'You get a commission in a week. In the new year you go to France.', diary: 'Commissioned. France in the spring. I am too old for this, and delighted.' },
        { label: 'Intelligence, and the Balkans', requires: '#linguist|#knows-the-balkans|!balkans|#intelligence', showLocked: true, effects: 'cap+2 empire+1 !intel-war', result: 'You are sent to Salonika as an intelligence officer, because you speak the languages and nobody else does.', diary: 'Salonika. My Bulgarian is wanted at last.' },
        { label: 'The aircraft factory at Farnborough', requires: '#scientist|#mathematician', showLocked: true, effects: 'state+1 cap+2 !farnborough', result: 'You go to the Royal Aircraft Factory, where men are inventing a new arm of war out of wire and fabric.', diary: 'Farnborough. Aeroplanes fall out of the sky and nobody knows why. I mean to find out.' },
        { label: 'Stay in London and do your part from there', effects: 'cap+3 loyalty+2 rep-2', result: 'You stay, and work. It is necessary work. Some people do not let you forget that it was safe.', diary: 'Staying. A white feather arrived by post. I have put it in a drawer.' },
      ] },

    /* ───────── The war, by route ───────── */
    { id: 'zeebrugge', t: 1918.3, year: 1918, title: 'St George\'s Day', if: '!route-navy ~!admiralty',
      venue: { plate: 'frontier', label: 'Off Zeebrugge' },
      text: 'The night of 22 April 1918. You command a ship in the raid on Zeebrugge, where the German submarines come out of the Bruges canal. Blockships are to be sunk across the canal mouth while storming parties go over the Mole under fire. Your old friend Keys commands the whole thing from a destroyer. The smoke screen has just blown back in the wind.',
      basis: 'Roger Keyes and the Zeebrugge raid, 23 April 1918.',
      real: 'Keyes planned and led the raid. Blockships were sunk in the canal mouth, but the canal was only partly blocked. There were about 500 British casualties, and eight Victoria Crosses were awarded. Keyes became a national hero.',
      check: 'research', facts: ['keyes-zeebrugge'],
      choices: [
        { label: 'Go in, smoke or no smoke', historical: true, effects: 'steel+3 rep+6 health-6 #decorated', death: D(0.07, 'Your ship was hit alongside the Mole at Zeebrugge on St George\'s Day 1918. You were forty-three.', 'Naval officer killed at Zeebrugge'), result: 'You go in under the guns. The blockships settle in the canal mouth. You come out with a hole in your funnel and a recommendation for the DSO.', diary: 'Zeebrugge. We went in. Not all of us came out.' },
        { label: 'Hold off until the smoke is laid again', effects: 'temper-2 steel-1', result: 'You wait, and the wind shifts back. You go in late and get out with nobody killed. Keys does not mention you in his report.', diary: 'Waited for the smoke. Saved my men. Keys says nothing. That says enough.' },
        { label: 'Take your boat to pull men off the Mole', effects: 'rep+4 loyalty+2 health-4 @keys+10', death: D(0.04, 'You were killed pulling men out of the water under the Mole at Zeebrugge. You were forty-three.', 'Naval officer killed at Zeebrugge'), result: 'You bring off sixty-one men under fire from the Mole. One of them is a stoker who was at school with nobody and will remember you all his life.', diary: 'Sixty-one off the Mole. I counted them.' },
      ] },

    { id: 'farnborough', t: 1916.5, year: 1916, title: 'The spin', if: '!farnborough',
      venue: { plate: 'desert', label: 'Royal Aircraft Factory, Farnborough' },
      text: 'Pilots are dying because their machines fall into a spin and nobody knows how to stop one. You think you have worked out the mathematics: let go, put the nose down, opposite rudder. The only way to prove it is to take a machine up to a few thousand feet and spin it deliberately. You have had a few flying lessons. Your notebook is full of figures.',
      basis: 'F. A. Lindemann at Farnborough, 1916: the theory of spin recovery, which he learned to fly in order to test.',
      real: 'Lindemann learned to fly and in 1917 put an aircraft into a spin deliberately to test his theory of recovery. It worked, and the technique was taught to pilots. He was nicknamed "the Prof" and later became Churchill\'s scientific adviser.',
      check: 'research', facts: ['lindemann-spin'],
      choices: [
        { label: 'Go up and spin it yourself', historical: true, effects: 'steel+3 temper+3 rep+6 #flier #scientist', death: D(0.08, 'The machine spun into the ground at Farnborough in 1916, and the theory with it. You were forty-two.', 'Scientist killed in experimental flight'), result: 'At five thousand feet you kick it into a spin, count, and do what the figures say. It comes out. You do it again to be sure. The Army teaches it within the month.', diary: 'Spun it. Came out. The figures were right. I knew they were.' },
        { label: 'Give the figures to a test pilot', effects: 'temper-2 cap+2', roll: { stat: 'reputation', diff: 50,
            pass: { effects: 'rep+3', result: 'He tries it, and it works. The credit is shared, more or less.', diary: 'The pilot did it. My figures; his nerve.' },
            fail: { effects: 'rep-3', result: 'He does not believe it, and will not try. Your paper sits in a drawer for a year.', diary: 'Nobody will try it. The drawer is full of dead men\'s mathematics.' } } },
        { label: 'Publish and let the Army decide', effects: 'loyalty+2', result: 'The paper is read and argued over. It is taken up slowly. Some men die in the meantime.', diary: 'Published. The committee is considering it.' },
      ] },

    { id: 'arras', t: 1917.3, year: 1917, title: 'Arras', if: '!at-front !route-gunner',
      venue: { plate: 'veldt', label: 'A battery position near Arras' },
      text: 'April 1917. Your battery is firing for the attack at Arras, and the German counter-battery fire is finding you. Something hits you in the chest like a fist. You are on your back looking at the sky, breathing badly, and the sergeant is asking whether you can hear him. A bullet has gone through your lung. The guns are still firing, and the battery has no other officer.',
      basis: 'Desmond Morton, Royal Artillery, shot through the lung at Arras in 1917; he served on with the bullet still in him.',
      real: 'Morton was shot through the lung at Arras in 1917 and continued to serve with the bullet lodged near his heart. He won the MC, became ADC to Haig, and later ran the Industrial Intelligence Centre, from which he briefed Churchill in the 1930s.',
      check: 'research', facts: ['morton-arras'],
      choices: [
        { label: 'Stay with the guns', historical: true, effects: 'steel+4 health-14 rep+4 #bullet-in-the-lung #decorated', death: D(0.11, 'You stayed with the guns at Arras until the bleeding stopped you. You were forty-two.', 'Gunner officer dies of wounds at Arras'), result: 'You stay until the fire plan is finished, then let them carry you back. The surgeons decide the bullet is safer left where it is. You keep it for the rest of your life, and get the Military Cross.', diary: 'A bullet in the lung. They are leaving it there. So am I.' },
        { label: 'Let them carry you back', effects: 'health-8 temper-1', death: D(0.06, 'You died of wounds at a casualty clearing station behind Arras. You were forty-two.', 'Gunner officer dies of wounds'), result: 'They carry you back. You live. Your wound takes you to a staff job and the ear of the Commander-in-Chief.', diary: 'Carried back. Alive. On the staff now.' },
        { label: 'Hand over to the sergeant and walk back', effects: 'health-10 loyalty+2 @sergeant+10', death: D(0.05, 'You collapsed on the walk back from the guns at Arras and did not get up. You were forty-two.', 'Gunner officer dies of wounds'), result: 'You walk back a mile with a field dressing pressed to your chest. The sergeant fights the battery all afternoon and gets the Distinguished Conduct Medal, which you see that he does.', diary: 'Walked back. The sergeant held the guns. I have put him in for the DCM.' },
      ] },

    { id: 'guards-1918', t: 1918.65, year: 1918, title: 'The canal', if: '!at-front !route-fo',
      venue: { plate: 'veldt', label: 'The Albert Canal, August 1918' },
      text: 'August 1918. You are a junior officer in the Guards, older than your company commander, after leaving a Foreign Office desk to enlist. Your platoon is pinned down by a machine gun on the far side of a canal. The rest of the company is too far back. You can see the gun. You could get across, with luck and a few men.',
      basis: 'Duff Cooper with the Grenadier Guards, 1918. He left the Foreign Office to enlist and won the DSO in August 1918 for capturing prisoners and machine guns.',
      real: 'Duff Cooper joined the Grenadier Guards in 1917, and in August 1918 won the DSO, an unusual award for a junior officer, for an action near the Albert Canal in which he captured several machine guns and prisoners.',
      check: 'research', facts: ['duff-dso'],
      choices: [
        { label: 'Go across with three men', historical: true, effects: 'steel+4 rep+6 #decorated', death: D(0.10, 'You were killed crossing the canal in August 1918, with the war almost won. You were forty-three.', 'Guards officer killed in final advance'), result: 'You get across. The gun crew surrenders, and so do eighteen others. You are recommended for the DSO, which is almost never given to a lieutenant.', diary: 'Across the canal. Eighteen prisoners. They say the DSO. I say I was lucky.' },
        { label: 'Hold and wait for the guns', effects: 'temper-2 loyalty+2', death: D(0.02, 'A shell found your platoon on the canal bank in August 1918. You were forty-three.', 'Guards officer killed'), result: 'You wait for the artillery. It takes an hour. The machine gun is gone when you cross.', diary: 'Waited for the guns. Safer. Duller. Alive.' },
        { label: 'Work round the flank with a Lewis gun', effects: 'steel+2 cap+2 rep+3', death: D(0.05, 'You were killed working round the flank at the canal in August 1918. You were forty-three.', 'Guards officer killed in final advance'), result: 'You take the Lewis gun team along the bank and enfilade the post. The crew run. It is less glorious than a charge and costs nobody.', diary: 'Flanked the gun. Nobody hurt on our side. That is the art of it.' },
      ] },

    { id: 'torpedoed', t: 1917.5, year: 1917, title: 'The Aegean', if: '!intel-war',
      venue: { plate: 'frontier', label: 'A transport in the Aegean' },
      text: 'You are on your way home from Salonika with a satchel of papers when the transport is torpedoed at night. The ship is going down by the bow. The boats are being lowered badly. Your satchel holds the only copy of a report on the Bulgarian army that took you a year to write. The water below looks very cold and very black.',
      basis: 'Leo Amery, intelligence officer in the Balkans, torpedoed in the Mediterranean during the war.',
      real: 'Amery served as an intelligence officer in Flanders, the Balkans and Gallipoli, and survived a torpedoing. In 1917 he joined the War Cabinet secretariat.',
      check: 'research', facts: ['amery-war'],
      choices: [
        { label: 'Keep the satchel and go over the side', effects: 'steel+2 cap+4 health-8', death: D(0.06, 'You went into the water with the satchel, and neither was found. You were forty-three.', 'Intelligence officer lost at sea'), result: 'You are picked up after four hours, holding the satchel above your head. The report reaches London, damp and legible.', diary: 'Four hours in the sea. The report is safe. I am not sure I am.' },
        { label: 'Drop it and help with the boats', historical: true, effects: 'loyalty+2 rep+3 health-4', result: 'The satchel goes down with the ship. You get forty men into boats. In London they ask you to write the report again from memory, and you do.', diary: 'Lost the report. Saved some men. Wrote it again in a week.' },
        { label: 'Take the satchel into the first boat', effects: 'cap+3 rep-5 loyalty-2', result: 'You are in the first boat, with the satchel, ahead of men who had a better right to it. The report reaches London. So does the story.', diary: 'The report is safe. I was in the first boat. I shall not write down how.' },
      ] },

    { id: 'ploegsteert', t: 1916.15, year: 1916, title: 'Plugstreet', if: '!at-front|!resigned-1915 ~!route-navy|!resigned-1915 ~!route-gunner|!resigned-1915 ~!route-fo|!resigned-1915',
      venue: { plate: 'veldt', label: 'Ploegsteert, Belgium' },
      onEnter: 'office=Lieutenant-Colonel',
      text: 'January 1916. You command a battalion of a Scottish regiment in a quiet sector near Ploegsteert, which the men call Plugstreet. They distrusted you on sight: a politician, a disgraced one, from the Admiralty. You have declared war on lice. The trenches are wet and the shelling is steady. Every night you go out into No Man\'s Land, and there is no need for you to go.',
      basis: 'Churchill commanding the 6th Royal Scots Fusiliers at Ploegsteert, January–May 1916.',
      real: 'Churchill commanded the 6th Battalion, Royal Scots Fusiliers, at Ploegsteert from January to May 1916. He made the men\'s comfort his business, went out into No Man\'s Land often, and had several narrow escapes. He left when the battalion was amalgamated and returned to politics.',
      check: 'research', facts: ['ploegsteert'],
      choices: [
        { label: 'Keep going out at night', historical: true, effects: 'steel+3 temper+2 rep+4 #brave', death: D(0.10, 'A burst of machine-gun fire found you on a night patrol at Ploegsteert in 1916. You were forty-one.', 'Former minister killed in Flanders'), result: 'You go out thirty-six times. Once a shell lands on the dugout you have just left. The battalion decides it likes you.', diary: 'A shell on the dugout I had left five minutes before. Somebody wants me alive.' },
        { label: 'Command from the battalion headquarters', effects: 'temper-2 loyalty+2', death: D(0.05, 'A shell hit battalion headquarters at Ploegsteert in 1916. You were forty-one.', 'Former minister killed in Flanders'), result: 'You command properly, from where a colonel should be. Casualties are low. The men grumble less than you expected.', diary: 'Headquarters. Proper. The men are dry, mostly.' },
        { label: 'Go home after a hundred days and speak in the House', effects: 'cap+4 press+4 rep-2', result: 'You go home to speak on the war. It is the right thing for your career and you feel a deserter.', diary: 'Home. I left them in the mud. I shall make the House listen, at least.' },
      ] },

    { id: 'influenza-1918', t: 1918.85, year: 1918, title: 'The influenza',
      venue: { plate: 'sickroom', label: 'A bedroom in London, November 1918' },
      text: 'The war is ending and a new killer is going through London: an influenza that takes the young and strong in two days, turning their faces blue. The theatres are half empty and the undertakers have run out of coffins. You woke this morning with a fever and an ache in every bone. Your doctor is overworked and frightened. There is an Armistice to celebrate, and a great deal to do.',
      basis: 'The influenza pandemic of 1918–19, which killed about 228,000 people in Britain.',
      real: 'The 1918 influenza killed about a quarter of a million people in Britain, many of them young adults, with the worst wave in October and November 1918. None of the camp\'s figures is recorded as having died of it, but it is the risk every one of them ran.',
      check: 'unchecked', facts: ['flu-1918'],
      choices: [
        { label: 'Go to bed and stay there', effects: 'health-6 cap-1', death: D(0.015, 'The influenza of 1918 took you in three days, a week after the Armistice. You were forty-four.', 'Death from influenza'), result: 'You stay in bed for a fortnight and miss the Armistice. You get up thin and weak, and alive.', diary: 'Missed the Armistice in bed. Alive. Many are not.' },
        { label: 'Get up for the Armistice', effects: 'temper+2 health-12', death: D(0.05, 'You went out into the Armistice crowds with a fever and died of pneumonia a week later. You were forty-four.', 'Death from influenza'), result: 'You go out into the crowds in Trafalgar Square, and pay for it with three weeks of pneumonia.', diary: 'The Armistice! Cheered with the crowd. Paid for it. Worth it.' },
        { label: 'Take the doctor\'s whisky cure and work', effects: 'health-8 steel+1 #drinks', death: D(0.03, 'The influenza turned to pneumonia in November 1918, and no whisky could stop it. You were forty-four.', 'Death from influenza'), result: 'You work through it on whisky and quinine, and recover, and keep the whisky.', diary: 'Whisky and quinine. The fever broke. I have kept the whisky.' },
      ] },

    { id: 'coupon-1918', t: 1918.95, year: 1918, title: 'The coupon', if: '~!mp',
      venue: { plate: 'city', label: 'A khaki election' },
      text: 'December 1918. The war is won, and the coalition is going to the country at once. Men with a letter of endorsement from the Prime Minister and the Tory leader, the "coupon", are almost certain to win. Men without one are going down by the hundred. Your war record is a good one. The party managers have a coupon to offer you, for a seat in the suburbs.',
      basis: 'The 1918 "coupon" election; ex-officers entering Parliament on the coalition ticket.',
      real: 'The Lloyd George–Bonar Law coalition won the December 1918 election by a landslide, with 478 seats. Many officers entered the House for the first time. Asquith lost his seat.',
      check: 'research', facts: ['coupon-1918'],
      choices: [
        { label: 'Take the coupon', effects: 'seat+45 cap+4 loyalty+2 office=Member_of_Parliament !mp', result: 'You are elected by eleven thousand. The new House is full of hard-faced men who have done well out of the war, and some who have done badly.', diary: 'Elected at last. Forty-four years old. The war has made a great many Members, and me.' },
        { label: 'Refuse it and stand on your own', effects: 'loyalty-4 rep+3 #independent', roll: { stat: 'reputation', diff: 50,
            pass: { effects: 'seat+35 cap+4 office=Member_of_Parliament !mp', result: 'You win without the coupon, which almost nobody does.', diary: 'Won without the coupon. My own man.' },
            fail: { effects: 'seat+10', result: 'You lose to a man with the coupon.', diary: 'Beaten by a letter. Next time.' } } },
        { label: 'Stand for Labour, with the returning soldiers', requires: '#friend-of-labour', showLocked: true, effects: 'order-4 state+3 loyalty-3 !labour', roll: { stat: 'reputation', diff: 55,
            pass: { effects: 'seat+35 office=Member_of_Parliament !mp', result: 'You win a mill town for Labour, one of very few that year.', diary: 'Labour Member! The spinners would be proud.' },
            fail: { effects: 'seat+8', result: 'The coupon sweeps you away.', diary: 'Labour, and beaten. The khaki vote is not ours yet.' } } },
        { label: 'Do not stand. Go back to work', effects: 'money+6 health+4', result: 'You let the khaki election go by. There will be other elections, and fewer of them in khaki.', diary: 'Did not stand. Peace first. Politics after.' },
      ] }
  );
})();
