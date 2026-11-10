/* The Bulldog — Act II: The Climb, part 2: 1919–1938. DRAFT.
   Spine: Churchill 1919–38 (RESEARCH.md §B). Blended in: Bracken (Brendan Bracknell) from 1923,
   Lindemann ("the Prof") and Morton (Desmond Martyn) in the 1930s, Keyes (Sir Roger Keys) at
   Portsmouth 1934, Eden (Antony Edgerton) in 1938, Keynes (Maynard Kaine) on gold. */
(function () {
  const TM = window.TM;
  const act = TM.ACTS.bulldog[2];

  Object.assign(TM.PEOPLE, {
    baldock: { name: 'Mr Stanley Baldock', role: 'Conservative leader' },
    bracknell: { name: 'Brendan Bracknell', role: 'A young man with red hair and a past' },
    prof: { name: 'Professor Lindqvist, "the Prof"', role: 'Oxford physicist' },
    martyn: { name: 'Major Desmond Martyn', role: 'Your neighbour, from intelligence' },
    kaine: { name: 'Mr Maynard Kaine', role: 'Economist' },
    edgerton: { name: 'Mr Antony Edgerton', role: 'Foreign Secretary' },
  });

  const D = (chance, text, headline) => ({ chance, text, headline });

  act.scenes.push(
    { id: 'russia-1919', t: 1919.4, year: 1919, title: 'The Whites', if: '!mp !liberal',
      venue: { plate: 'whitehall', label: 'The War Office' },
      onEnter: 'office=Secretary_of_State_for_War',
      text: 'You are Secretary for War, demobilising an army of three million men who want to go home today. In Russia, British troops are still at Archangel, and the White generals are asking for guns, money and more men to finish the Bolsheviks. The Prime Minister wants out. The Labour benches call it a war against the workers. You think Bolshevism must be strangled in its cradle.',
      basis: 'Churchill at the War Office, 1919–21, and British intervention in the Russian Civil War.',
      real: 'Churchill pressed hard for support for the White armies in 1919. Lloyd George and most of the Cabinet were reluctant, British troops were withdrawn from north Russia by the end of 1919, and the Whites were defeated.',
      check: 'research', facts: ['russia-1919'],
      choices: [
        { label: 'Send the Whites everything you can', historical: true, effects: 'steel+3 order+3 @gwynne-8 press-4 #anti-bolshevik', result: 'You send guns, tanks and money. The Whites lose anyway. The Labour movement never forgets your name.', diary: 'Armed Denikin. He is retreating. I was right about the Bolsheviks and wrong about the Whites.' },
        { label: 'Bring the troops home and leave Russia to the Russians', effects: 'steel-2 loyalty+3 fav+3 @gwynne+5', result: 'The last British soldiers leave Archangel in the autumn. The Whites call it betrayal. The country is glad.', diary: 'Out of Russia. The right decision, and I hate it.' },
        { label: 'Arm the Whites quietly, and say nothing', effects: 'steel+2 loyalty-2 press-6', result: 'It leaks within a month, through the dockers who refuse to load the ships.', diary: 'The dockers found out. Of course they did. They load the ships.' },
      ] },

    { id: 'ireland-1921', t: 1921.9, year: 1921, title: 'The Treaty', if: '!mp',
      venue: { plate: 'gallery', label: 'The House of Commons' },
      text: 'December 1921. Two years of guerrilla war in Ireland, of reprisals by the Black and Tans and burnings by both sides, have ended in a treaty. The south is to be a Free State inside the Empire; the north stays. Michael Collins has signed it. Many of your own side call it surrender to murderers. You must vote, and the Government wants you to speak for it.',
      basis: 'Churchill and the Anglo-Irish Treaty, December 1921. He had backed the Black and Tans, then helped negotiate the Treaty and steered it through the Commons.',
      real: 'Churchill supported harsh measures in Ireland in 1920–21, then took part in the Treaty negotiations, befriended Michael Collins, and piloted the Irish Free State legislation through the Commons. The Treaty passed; civil war followed in Ireland.',
      check: 'research', facts: ['ireland-1921'],
      choices: [
        { label: 'Speak for the Treaty', historical: true, effects: 'empire-2 steel-1 cap+3 rep+3 #magnanimous', result: 'You speak for it, and well. You befriend Collins, who tells you that you have signed his death warrant. He is killed within the year.', diary: 'Spoke for the Treaty. Collins says he has signed his own death. I believe him.' },
        { label: 'Vote against it with the diehards', effects: 'empire+3 steel+2 loyalty-3 #diehard', result: 'You vote against. You are on the losing side, and on the side of the men who will never forgive it.', diary: 'Voted against. Ireland is lost and I would not sign the receipt.' },
        { label: 'Vote for it, and say nothing', effects: 'loyalty+2', result: 'You vote with the Government and keep quiet. Nobody notices you, which is what you wanted.', diary: 'Voted aye. Said nothing. It is done.' },
      ] },

    { id: 'chartwell', t: 1922.7, year: 1922, title: 'The house in Kent',
      venue: { plate: 'chine', label: 'A valley in the Weald of Kent' },
      text: 'A house for sale near Westerham: ugly, damp, rotten in places, and standing over the most beautiful valley you have ever seen, with a spring that could make lakes. It would cost five thousand pounds, and as much again to make habitable. You have three children, a wife who thinks it a folly, and an income that comes and goes with your books. You can see yourself living there until you die.',
      basis: 'Churchill\'s purchase of Chartwell, near Westerham, in 1922.',
      real: 'Churchill bought Chartwell in 1922 without telling his wife the full cost. It was expensive to rebuild and run, and kept him short of money for years. He lived there until the end of his life.',
      check: 'research', facts: ['chartwell'],
      choices: [
        { label: 'Buy it, and tell her afterwards', historical: true, effects: 'money-14 health+4 temper+2 @clemency-6 !chartwell #in-debt', result: 'You buy it. She is furious, then resigned, then fond of it in spite of herself. You build walls with your own hands and it costs more every year.', diary: 'Chartwell is mine. The bank and Clemmie are both displeased. I have built a wall.' },
        { label: 'Buy it, with her blessing or not at all', effects: 'money-10 @clemency+4', roll: { stat: 'money', diff: 50,
            pass: { effects: '!chartwell health+3', result: 'She agrees, on conditions, and the conditions save you money.', diary: 'Chartwell! On terms. Fair ones.' },
            fail: { effects: 'money+10', result: 'She says no, and she is right, and you never quite forgive her for it.', diary: 'No Chartwell. She is right. I mind.' } } },
        { label: 'Live within your means in London', effects: 'money+4 temper-2', result: 'You do not buy it. Someone else does. You go and look at it once, years later, from the road.', diary: 'Did not buy the house. Sound. I think of it often.' },
      ] },

    { id: 'carlton-1922', t: 1922.8, year: 1922, title: 'The Carlton Club meeting', if: '!mp ~!liberal',
      venue: { plate: 'club', label: 'The Carlton Club, 19 October 1922' },
      text: 'The Conservative Members have been summoned to the Carlton to decide whether to fight the coming election as part of Mr Lloyd Gwynne\'s coalition. The leaders want to stay in. The backbenchers have had enough of the Welshman\'s honours for sale and his adventures abroad. A quiet man from the Board of Trade, Stanley Baldock, has said he will speak against. Which way do you vote?',
      basis: 'The Carlton Club meeting of 19 October 1922, which ended the Lloyd George coalition. Baldwin spoke against the coalition; the meeting voted to fight as an independent party.',
      real: 'The Conservative MPs voted to leave the coalition, by a margin usually given as 187 to 87. Lloyd George resigned that day, Bonar Law formed a government, and Baldwin\'s speech made his name. Churchill, then a Coalition Liberal, was not present.',
      check: 'unchecked', facts: ['carlton-1922'],
      choices: [
        { label: 'Vote to leave the coalition', effects: 'loyalty+3 fav+6 @baldock+10', result: 'You vote with the backbenchers. The coalition falls by teatime. Mr Baldock nods to you on the stairs.', diary: 'The coalition is finished. Baldock nodded. He will remember.' },
        { label: 'Vote with the leaders to stay', effects: 'loyalty-2 fav-4 @gwynne+6', result: 'You vote with the leaders and lose. They go into the wilderness, and you go with them for a while.', diary: 'Voted with the old leaders. Lost. We are the old guard now.' },
        { label: 'Abstain and leave by the side door', effects: 'temper-2', result: 'You slip out into Pall Mall before the vote. Nobody can say which side you were on, so nobody trusts you.', diary: 'Left before the vote. Safe. Cowardly. Both.' },
      ] },

    { id: 'dundee-1922', t: 1922.88, year: 1922, title: 'Without an appendix', if: '!mp !liberal',
      venue: { plate: 'sickroom', label: 'A nursing home, then Dundee' },
      text: 'November 1922. Days before the election your appendix bursts, and you are operated on. Your wife goes north to campaign for you. You arrive in Dundee in the last week, carried to the platform on a chair, to face crowds who have not forgotten Russia and who throw things. Labour and a Prohibitionist are both against you, and the Liberal vote is split in two.',
      basis: 'Churchill\'s appendicectomy and his defeat at Dundee, November 1922.',
      real: 'Churchill had his appendix removed in October 1922, campaigned briefly in Dundee from a chair, and came fourth of six. The seat went to the Prohibitionist Edwin Scrymgeour and Labour\'s E. D. Morel. He said he was "without an office, without a seat, without a party and without an appendix".',
      check: 'research', facts: ['dundee-1922'],
      choices: [
        { label: 'Speak from the chair, whatever they throw', historical: true, effects: 'steel+2 health-6', roll: { stat: 'reputation', diff: 70,
            pass: { effects: 'seat+5', result: 'You hold on by a few hundred, against every expectation.', diary: 'Held Dundee from a chair. Fight on.' },
            fail: { effects: 'seat-45 office=None -!mp !wilderness-1922', result: 'You come fourth. Without a seat, without an office, without a party, and without an appendix.', diary: 'Fourth. Out. No seat, no office, no party, no appendix.' } } },
        { label: 'Rest, and leave it to your wife', effects: 'health+4 @clemency+6', roll: { stat: 'reputation', diff: 75,
            pass: { effects: 'seat+5', result: 'She holds it for you. Dundee prefers her anyway.', diary: 'Clemmie held Dundee. She is the better candidate.' },
            fail: { effects: 'seat-45 office=None -!mp !wilderness-1922', result: 'You lose, in bed, reading the results by telegram.', diary: 'Lost, by telegram. Out.' } } },
        { label: 'Withdraw from Dundee and seek a safer seat', effects: 'loyalty-2 rep-3', roll: { stat: 'favour', diff: 60,
            pass: { effects: 'seat+15', result: 'A Liberal in the West Country stands down for you. You are returned, and Dundee says good riddance.', diary: 'A Devon seat. Dundee is welcome to its Prohibitionist.' },
            fail: { effects: 'seat-45 office=None -!mp !wilderness-1922', result: 'There is no safer seat. You are out.', diary: 'No seat anywhere. Out.' } } },
      ] },

    { id: 'bracknell', t: 1923.5, year: 1923, title: 'A young man from nowhere',
      venue: { plate: 'club', label: 'A dinner in Mayfair' },
      text: 'Mr Garroway of the Observer has brought a young man to dinner: twenty-two, red-haired, with a strange accent he says is Australian and a fund of stories about everybody. He seems to know your books by heart. He is starting a magazine, and he would like, he says, to be useful to you. Your wife takes against him at once. You find him enormously entertaining.',
      basis: 'Brendan Bracken\'s introduction to Churchill by J. L. Garvin in 1923, and his lifelong devotion. Bracken\'s invented past (he was Irish, not Australian) became a running joke.',
      real: 'Garvin introduced Bracken to Churchill in 1923. Bracken became his most loyal follower, worked on his campaigns, entered the Commons in 1929, and in May 1940 persuaded Churchill to stay silent when the succession was discussed, which helped make him Prime Minister. Clementine disliked him for years.',
      check: 'research', facts: ['bracken-1923', 'bracken-may1940'],
      choices: [
        { label: 'Take him up', historical: true, effects: '@bracknell+25 @clemency-3 press+4', status: { bracknell: 'Devoted to you. Will do anything, and does.' }, result: 'He is at your side from that night: at your elections, in your newspaper rows, at Chartwell at weekends. Half London thinks he is your son. He does not deny it.', diary: 'Bracknell. He is all invention and all loyalty. I like him enormously.' },
        { label: 'Ask a few questions about Australia', effects: '@bracknell-6 cap+1', result: 'He answers fluently and wrongly. You let it go. He knows that you know, and is careful with you after that.', diary: 'Bracknell has never been to Bendigo. Or has he? He is a mystery.' },
        { label: 'Keep him at arm\'s length', effects: '@bracknell-12 @clemency+3', result: 'He attaches himself to someone else, and becomes rich and powerful in their service instead.', diary: 'Sent the red-haired boy away. Clemmie approved.' },
      ] },

    { id: 'abbey-1924', t: 1924.2, year: 1924, title: 'The Abbey division', if: '~!mp',
      venue: { plate: 'city', label: 'Westminster, March 1924' },
      text: 'A by-election in the Abbey division of Westminster, the seat that holds Parliament itself. You stand as an independent against both the official Tory and Labour, backed by half the press and a crowd of chorus girls who address envelopes. Bracknell runs your committee room and sleeps on its floor. The fight is dirty. On polling day it is too close to call.',
      basis: 'Churchill as "Independent Anti-Socialist" at the Westminster Abbey by-election, March 1924, with Bracken running his campaign.',
      real: 'Churchill lost the Abbey by-election on 19 March 1924 by 43 votes to the official Conservative, Otho Nicholson. It brought him back towards the Conservatives, who gave him a clear run at Epping that autumn.',
      check: 'research', facts: ['abbey-1924'],
      choices: [
        { label: 'Fight to the last vote', historical: true, effects: 'steel+2 press+6 @bracknell+6', roll: { stat: 'press', diff: 60,
            pass: { effects: 'seat+35 cap+5 office=Member_of_Parliament !mp', result: 'You win by a few dozen and the chorus girls cheer in the street.', diary: 'In! By a whisker. Bracknell wept.' },
            fail: { effects: 'seat+12 rep+3', result: 'You lose by forty-three votes. The Tory managers notice how near you came, and start to talk.', diary: 'Forty-three. Bracknell says next time. He is right.' } } },
        { label: 'Make terms with the Tories before polling day', effects: 'loyalty+3 fav+6 press-3', result: 'You stand down in return for a safe seat at the general election. It is sensible and nobody admires it.', diary: 'Stood down for a promise. Promises in politics are worth what they cost.' },
        { label: 'Withdraw and go back to writing', effects: 'money+6 press-2', result: 'You withdraw and finish a volume of your war history instead. It sells better than you poll.', diary: 'Withdrew. The book is going well. The voters can wait.' },
      ] },

    { id: 'epping-1924', t: 1924.8, year: 1924, title: 'Re-ratting', if: '!liberal|!wilderness-1922',
      venue: { plate: 'gallery', label: 'Epping, October 1924' },
      text: 'The Liberal Party is dying, squeezed between Labour and the Tories. Mr Baldock, the Tory leader, has offered you a clear run at Epping as a "Constitutionalist", which is a Tory who used to be something else. People will say you have changed sides twice. You point out that anyone can rat, but it takes a certain ingenuity to re-rat.',
      basis: 'Churchill\'s return to the Conservatives at Epping in October 1924, followed by his appointment as Chancellor of the Exchequer.',
      real: 'Churchill won Epping in October 1924 as a Constitutionalist and rejoined the Conservatives formally in 1925. Baldwin surprised everyone, Churchill included, by making him Chancellor of the Exchequer. The remark about re-ratting is attributed to him (paraphrased here).',
      check: 'research', facts: ['epping-1924'],
      choices: [
        { label: 'Go back to the Tories', historical: true, effects: 'loyalty-3 fav+8 seat+40 cap+5 office=Member_of_Parliament -!liberal !mp @baldock+8', roll: { stat: 'favour', diff: 50,
            pass: { effects: 'office=Chancellor_of_the_Exchequer !chancellor cap+8', result: 'You win Epping by nine thousand. A week later Baldock asks if you will be Chancellor. You nearly ask him which Chancellor he means.', diary: 'CHANCELLOR. Of the Exchequer. Father\'s old office. I could weep.' },
            fail: { effects: 'cap+2', result: 'You win Epping comfortably. Baldock gives the big jobs to men who have been loyal for longer.', diary: 'Epping is mine. The Cabinet is not, yet.' } } },
        { label: 'Stay a Liberal to the end', effects: 'loyalty+4 rep+3 #last-liberal', roll: { stat: 'reputation', diff: 60,
            pass: { effects: 'seat+30 office=Member_of_Parliament !mp', result: 'You hold a Liberal seat in a Liberal rout. There are forty of you left.', diary: 'One of forty. A Liberal still. A lonely one.' },
            fail: { effects: 'seat-20 office=None -!mp', result: 'You go down with the Liberal ship.', diary: 'Liberal, and out.' } } },
        { label: 'Join Labour', requires: '#friend-of-labour', showLocked: true, effects: 'order-5 state+4 loyalty-5 @gwynne-4', roll: { stat: 'reputation', diff: 55,
            pass: { effects: 'seat+35 office=Member_of_Parliament !mp !labour', result: 'Labour takes you, warily. You win a northern seat. The Tories call you the reddest rat of all.', diary: 'Labour. The spinners would understand. Nobody else does.' },
            fail: { effects: 'seat-10 office=None -!mp !labour', result: 'You lose, and Labour does not quite trust you either.', diary: 'Labour, and beaten. Trusted by nobody.' } } },
      ] },

    { id: 'office-1924', t: 1924.85, year: 1924, title: 'A post under Baldock', if: '!mp ~!liberal ~!chancellor ~!labour',
      venue: { plate: 'whitehall', label: 'Downing Street' },
      text: 'The Tories are back with a huge majority, and Mr Baldock is filling the junior posts. Leo Emery, at the Colonial Office, wants a deputy who believes in imperial trade. The Admiralty needs a Civil Lord to fight the Treasury for cruisers. Or you could stay on the back benches, unbought, and say exactly what you think, which is what the House likes best and the Whips least.',
      basis: 'The second Baldwin government, 1924–29: Amery as Colonial and Dominions Secretary and the Empire Marketing Board; the naval estimates fight of 1925.',
      real: 'Amery was Colonial Secretary 1924–29, created the Dominions Office and the Empire Marketing Board. Churchill, as Chancellor, cut the naval cruiser programme in 1925 against Admiralty opposition.',
      check: 'research', facts: ['amery-colonies'],
      choices: [
        { label: 'Go to the Colonial Office under Emery', effects: 'empire+3 cap+4 office=Under-Secretary_for_the_Colonies @emery+10', result: 'You spend five years on Empire trade, posters of Australian apples, and Imperial conferences. Emery is a good master and a dull speaker.', diary: 'Under Emery. The Empire, in posters. I believe in it.' },
        { label: 'The Admiralty, and fight for cruisers', effects: 'steel+2 cap+3 office=Civil_Lord_of_the_Admiralty', result: 'You fight the Treasury for cruisers and lose some and win some.', diary: 'Civil Lord. The Treasury is a more dangerous enemy than the Germans.' },
        { label: 'Stay on the back benches', effects: 'loyalty-2 press+3 #independent', result: 'You decline. The Whips mark you as difficult.', diary: 'Declined office. My own man.' },
      ] },

    { id: 'gold-1925', t: 1925.3, year: 1925, title: 'The old parity', if: '!chancellor',
      venue: { plate: 'whitehall', label: 'Number 11 Downing Street' },
      text: 'Your first Budget. The Treasury, the Bank of England and every banker in the City say that sterling must go back on gold at the old parity of 1914, four dollars eighty-six to the pound. Mr Maynard Kaine says it will overvalue the pound by a tenth and that the cost will fall on the miners and the exporters. You do not understand the arguments as well as you would like. You give a dinner and listen to both sides.',
      basis: 'Churchill\'s return to the gold standard at the pre-war parity, April 1925, against Keynes\'s warnings.',
      real: 'Churchill put Britain back on gold at $4.86 in his 1925 Budget, after a famous dinner at which Keynes and the Treasury argued it out. Keynes attacked the decision in "The Economic Consequences of Mr Churchill". Churchill later called it the biggest mistake of his life.',
      check: 'research', facts: ['gold-1925'],
      choices: [
        { label: 'Back to gold at $4.86', historical: true, effects: 'state-2 order+2 fav+6 @kaine-10 reform-2', result: 'The City is delighted. Exports suffer, wages are pressed down, and within a year the coal owners are demanding cuts. Kaine writes a pamphlet with your name in the title.', diary: 'Gold at 4.86. The Bank is happy. Kaine has written a pamphlet about me. I fear he may be right.' },
        { label: 'Gold, but at a lower rate', effects: 'state+1 fav-2 @kaine+4', result: 'You go back at four dollars forty. The City grumbles. The mills and the pits find it a little easier.', diary: 'Gold at 4.40. Neither side satisfied. Perhaps that is right.' },
        { label: 'Stay off gold: a managed pound', effects: 'state+3 fav-10 @kaine+15 !managed-pound', result: 'You refuse. The Governor of the Bank nearly resigns. Exports pick up. No one is sure whether you are a genius or a lunatic.', diary: 'Refused gold. The Governor went white. Kaine sent flowers, I think as a joke.' },
      ] },

    { id: 'general-strike', t: 1926.35, year: 1926, title: 'Nine days in May', if: '!mp',
      venue: { plate: 'city', label: 'London, May 1926' },
      text: 'The coal owners have locked out the miners, and the TUC has called a General Strike in their support. No trains, no buses, no newspapers. Volunteers in plus-fours drive the lorries, and armoured cars escort the food convoys through the East End. The Government needs someone to run its own newspaper. Some of your colleagues want to use the troops. Some want to settle.',
      basis: 'The General Strike, 3–12 May 1926; Churchill edited the government\'s British Gazette.',
      real: 'Churchill edited the British Gazette during the strike and took a hard line. After the TUC called the strike off, he tried, without success, to broker a settlement of the miners\' dispute. The miners stayed out until November and went back beaten.',
      check: 'research', facts: ['general-strike'],
      choices: [
        { label: 'Run the Government\'s paper, and give no quarter', historical: true, requires: '!chancellor|press>40', showLocked: true, effects: 'order+3 steel+2 press+6 @gwynne-4 #anti-strike', result: 'You commandeer the Morning Post\'s presses and print two million copies a day. It is lively, partisan and not always true. When the TUC gives in, you turn round and try to get the miners a fair settlement.', diary: 'Edited the Gazette. Two million copies. Now I must get the miners something.' },
        { label: 'Press for a settlement with the miners now', effects: 'order-2 state+1 @gwynne+4 fav-4 #friend-of-labour', result: 'You go between the owners and the miners\' leaders. The owners will not move. The miners hold out until winter, and lose.', diary: 'The owners are the stupidest men I have ever met. The miners are the bravest.' },
        { label: 'Drive a lorry with the volunteers', effects: 'order+2 rep+2 health-2', result: 'You drive milk from Hyde Park for nine days. It is the most popular thing you ever do in the West End and the least popular in the East.', diary: 'Drove a milk lorry. Pelted in Bow. Cheered in Belgravia.' },
      ] },

    { id: 'crash-1929', t: 1929.82, year: 1929, title: 'Black Thursday',
      venue: { plate: 'newyork', label: 'Wall Street, October 1929' },
      text: 'You are in New York at the end of a lecture tour, and you have put most of your earnings into American shares, which have only ever gone up. On Thursday morning they start to fall. By the afternoon a man is said to have jumped from a window under yours. Your broker asks for instructions. Sell now and take a loss, or hold on for the bounce?',
      basis: 'Churchill in America during the Wall Street Crash, October 1929; his heavy losses on shares.',
      real: 'Churchill lost most of his American investments in the Wall Street Crash of October 1929. He is said to have been in New York at the time; that detail is still to be checked. He spent the 1930s writing to restore his finances.',
      check: 'research', facts: ['crash-1929'],
      choices: [
        { label: 'Hold on for the bounce', historical: true, effects: 'money-18 temper+2 #in-debt', result: 'There is no bounce. By Christmas you have lost most of what you had. You go home and write, as fast as you can, for the rest of the decade.', diary: 'Lost nearly everything. Books, then. Many books.' },
        { label: 'Sell everything at once', effects: 'money-6 temper-2', result: 'You sell on Thursday afternoon. It is a bad price and the right decision.', diary: 'Sold. Lost a third. Kept two thirds. The man downstairs was not so lucky.' },
        { label: 'Buy more, cheap', effects: 'temper+4', roll: { stat: 'temper', diff: 70,
            pass: { effects: 'money+6', result: 'You buy on Black Tuesday and sell in the spring rally. Nobody believes you when you tell them.', diary: 'Bought the bottom, sold the rally. Do not tell Clemmie how close it was.' },
            fail: { effects: 'money-25 health-4 #in-debt', result: 'It goes on falling for three years. You are ruined, nearly.', diary: 'Ruined. Nearly. I shall have to sell something. Perhaps the house.' } } },
      ] },

    { id: 'india-1931', t: 1931.05, year: 1931, title: 'The fakir', if: '!mp ~!liberal ~!labour',
      venue: { plate: 'india', label: 'The Shadow Cabinet' },
      text: 'January 1931. The Labour government is talking of dominion status for India, and Mr Baldock has agreed. Mr Gandhi is to be released from prison to negotiate. You think it the beginning of the end of the Empire. You can resign from the Shadow Cabinet and lead the diehards in the country, or stay, swallow it, and be in the next Tory Cabinet.',
      basis: 'Churchill\'s resignation from the Conservative Shadow Cabinet over India, January 1931, and his campaign against the Government of India Bill.',
      real: 'Churchill resigned from the Shadow Cabinet in January 1931 and led the fight against the India Bill until 1935. It cost him office in the National Government and much of his credibility when he later warned about Germany.',
      check: 'research', facts: ['india-1931'],
      choices: [
        { label: 'Resign and fight India reform', historical: true, effects: 'empire+4 loyalty-5 fav-12 cap-4 !india-rebel', result: 'You resign and take the campaign to the country. You are cheered by the Indian Empire Society and frozen out by your leaders for years. When you warn them about Germany, they remember India and do not listen.', diary: 'Resigned over India. Out of the Shadow Cabinet. I am right, and I am alone.' },
        { label: 'Stay and argue inside', effects: 'loyalty+3 fav+4 empire+1', result: 'You stay. When the National Government is formed that summer, you are in it, in a middling post.', diary: 'Stayed. Middling post. Middling man.' },
        { label: 'Come round to dominion status', effects: 'empire-4 fav+6 rep-2 #reformer', result: 'You surprise everyone and back it. The diehards call you a traitor. The India Office sends warm thanks.', diary: 'Backed India reform. The diehards are furious. The India Office is pleased. I am uneasy.' },
      ] },

    { id: 'national-1931', t: 1931.7, year: 1931, title: 'The National Government', if: '!mp !liberal',
      venue: { plate: 'gallery', label: 'August 1931' },
      text: 'The pound is falling, the Labour Cabinet has split over cuts to the dole, and Mr MacDougal has formed a National Government with the Tories and Liberals. The Liberals are splitting three ways. Sir John Simmons is leading a group into permanent alliance with the Tories, Sir Herbert Samuels wants to stay a separate party, and the old Welshman is against it all from his sickbed.',
      basis: 'The 1931 crisis and the Liberal split: Simon\'s Liberal Nationals, Samuel\'s official Liberals, Lloyd George\'s family group.',
      real: 'In 1931 the Liberals split three ways. Simon\'s Liberal Nationals merged in practice with the Conservatives; Samuel\'s Liberals left the National Government over tariffs in 1932; Lloyd George led a small group of Independent Liberals. The National Government won 554 of 615 seats.',
      check: 'unchecked', facts: ['liberal-split-1931'],
      choices: [
        { label: 'Go with Simmons and the Liberal Nationals', effects: 'loyalty+3 state-1 fav+6 seat+10 office=Liberal_National_Member', result: 'You join the Liberal Nationals. You keep your seat and, in time, a post. Your old friends say you have become a Tory by stages.', diary: 'Liberal National. A Tory in a Liberal coat, they say.' },
        { label: 'Stay with Samuels', effects: 'loyalty-1 rep+2 seat-10', result: 'You stay a Liberal. When Samuels leaves the Government over tariffs, you go with him into opposition, and the party shrinks again.', diary: 'Still a Liberal. Fewer of us every year.' },
        { label: 'Stand with the old Welshman against it all', effects: 'loyalty-3 @gwynne+10 seat-20', roll: { stat: 'reputation', diff: 60,
            pass: { effects: 'press+4', result: 'You hold your seat against the National tide.', diary: 'Held on. One of the Welshman\'s four.' },
            fail: { effects: 'office=None -!mp seat-20', result: 'You lose your seat in the National landslide.', diary: 'Swept away. The Welshman sent a kind telegram.' } } },
      ] },

    { id: 'fifth-avenue', t: 1931.95, year: 1931, title: 'Fifth Avenue',
      venue: { plate: 'newyork', label: 'Fifth Avenue, New York' },
      text: 'December 1931. You are in New York on a lecture tour to earn back what the Crash took. Late at night you take a cab to visit a friend, cannot find the house, and get out to cross Fifth Avenue on foot. You look left, as you would in London. The car comes from the right at thirty miles an hour.',
      basis: 'Churchill knocked down by a car on Fifth Avenue, 13 December 1931.',
      real: 'Churchill was struck by a car on Fifth Avenue on 13 December 1931 after looking the wrong way. He was badly hurt, spent weeks recovering, and wrote an article about the experience for good money. He insisted the driver was not to blame.',
      check: 'research', facts: ['fifth-avenue'],
      choices: [
        { label: 'Insist the driver was not to blame', historical: true, effects: 'health-16 rep+3 #magnanimous', death: D(0.025, 'You died of your injuries in a New York hospital in December 1931. You were fifty-seven.', 'British statesman killed in New York street accident'), result: 'You are badly hurt. From the hospital bed you tell the police it was your fault, and later write an article about it that pays for the whole trip.', diary: 'Hit by a car. My fault. Wrote it up for $2,500. The accident has paid for itself.' },
        { label: 'Sue the driver', effects: 'health-16 press-4 money+4', death: D(0.025, 'You died of your injuries in New York in December 1931. You were fifty-seven.', 'British statesman killed in New York street accident'), result: 'You recover, slowly, and the lawsuit makes you look mean in the American papers.', diary: 'Recovering. The lawyers are pleased. Nobody else is.' },
        { label: 'Cancel the tour and go home to recover', effects: 'health-12 money-8 @clemency+6', death: D(0.02, 'The injuries did not mend, and you died at home in the new year. You were fifty-seven.', 'Former minister dies after New York accident'), result: 'You sail home on a stretcher. It costs you the tour and saves your health.', diary: 'Home. The doctors say six months. I say three.' },
      ] },

    { id: 'keys-1934', t: 1934.1, year: 1934, title: 'Portsmouth North', if: '!route-navy ~!mp',
      venue: { plate: 'frontier', label: 'Portsmouth' },
      text: 'You have left the Navy with an admiral\'s flag and a famous name from Zeebrugge. Portsmouth North has a by-election, and the dockyard town wants a sailor. The local Tories offer you the seat if you will toe the line on naval estimates. You think the Navy has been starved for fifteen years, and that the Japanese and the Germans know it, and you mean to say so.',
      basis: 'Roger Keyes, elected for Portsmouth North in 1934 after retiring from the Navy.',
      real: 'Keyes won Portsmouth North in 1934 and sat until 1943, a fierce critic of the Admiralty and later of Chamberlain. He spoke in the Norway Debate of May 1940 in the full uniform of an Admiral of the Fleet.',
      check: 'research', facts: ['keyes-portsmouth'],
      choices: [
        { label: 'Take the seat and speak your mind anyway', historical: true, effects: 'seat+45 cap+4 steel+2 loyalty-2 office=Member_of_Parliament !mp', result: 'You win easily and make your maiden speech about the state of the Fleet. The Admiralty is not pleased. The dockyard is.', diary: 'Member for Portsmouth North. The Admiralty is furious. Excellent.' },
        { label: 'Take the seat on their terms', effects: 'seat+45 cap+2 loyalty+3 office=Member_of_Parliament !mp', result: 'You win and keep quiet, for a while.', diary: 'Member. Quiet. For now.' },
        { label: 'Decline, and write about the Navy instead', effects: 'money+5 press+4', result: 'You write a book on sea power that the Admiralty reads in secret and denounces in public.', diary: 'Declined Portsmouth. Wrote the book. The Admiralty is reading it.' },
      ] },

    { id: 'martyn-fields', t: 1934.5, year: 1934, title: 'Across the fields',
      venue: { plate: 'chine', label: 'The fields between two houses in Kent' },
      text: 'Your neighbour, Major Martyn, walks over the fields most evenings. He runs a small government office that watches foreign industry, and he has started bringing figures about German aircraft factories that are not what the Air Ministry is telling the House. He has not asked your leave and has not been given his own minister\'s. You could use them. He could go to prison.',
      basis: 'Desmond Morton, head of the Industrial Intelligence Centre, who lived a mile from Chartwell and briefed Churchill on German rearmament in the 1930s.',
      real: 'Morton walked over the fields from his house to Chartwell and supplied Churchill with figures on German rearmament. It seems likely that the Prime Ministers of the day knew and tolerated it. Churchill used the figures in speeches that embarrassed the Government.',
      check: 'research', facts: ['morton-fields'],
      choices: [
        { label: 'Use them in the House', historical: true, effects: 'steel+3 cap+4 press+4 fav-6 @martyn+15 #leaker', status: { martyn: 'Brings you figures. Trusts you not to ruin him.' }, result: 'You use the figures in a speech that leaves the Air Minister fumbling. The Government cannot say how you know without admitting it is true.', diary: 'Used Martyn\'s figures. The Air Minister floundered. Germany is building faster than they say.' },
        { label: 'Take them to the Prime Minister privately', effects: 'loyalty+3 cap+2 @martyn+5', result: 'He thanks you and does very little. The figures go into a file.', diary: 'Gave the figures to Downing Street. They have filed them.' },
        { label: 'Send him home. A civil servant should not do this', effects: 'loyalty+2 order+2 @martyn-15', result: 'He stops coming. You never know what you might have known.', diary: 'Told Martyn to stop. Correct. Possibly fatal.' },
      ] },

    { id: 'prof-lunch', t: 1935.4, year: 1935, title: 'Lunch with the Prof', kind: 'lunch',
      venue: { plate: 'club', label: 'The dining room at Chartwell' },
      guests: ['The Prof, Professor Lindqvist of Oxford', 'Your wife, who finds him impossible', 'Brendan Bracknell, who finds everyone possible'],
      menu: ['Clear soup (the Prof\'s without stock)', 'Sole, and for the Prof an omelette of egg whites', 'Treacle tart and the brandy he will not drink'],
      text: 'The Prof has motored down from Oxford in his chauffeur-driven car. He eats no meat, drinks no wine, and calculates everyone\'s age and income at sight. He is the cleverest man you know and the most disliked, and he is the only scientist in England who will explain things to you without condescension. Over lunch he means to talk about the air, and about what the bombers will do.',
      basis: 'Lindemann ("the Prof") at Chartwell, where he was a guest over a hundred times; his feud with Henry Tizard on the Air Defence Research committee, 1935–36.',
      real: 'Lindemann joined the Air Defence Research sub-committee through Churchill in 1935 and fell out bitterly with Henry Tizard, who backed radar, while Lindemann favoured other schemes. Tizard\'s committee members threatened to resign, and Lindemann was removed in 1936. Radar was ready in time for 1940. This lunch is an invention for the game.',
      check: 'research', facts: ['lindemann-chartwell', 'tizard-feud'],
      courses: [
        { course: 'The soup', text: 'The Prof says the bomber will always get through unless science stops it. He wants a place on the Air Ministry\'s new defence committee, and only you can get him one.',
          choices: [
            { label: 'Get him on the committee', historical: true, effects: '@prof+12 cap-2', result: 'You lean on the Air Minister. The Prof gets his place.', diary: 'The Prof is on the committee. The scientists there are already nervous.' },
            { label: 'Tell him to go through the proper channels', effects: '@prof-8', result: 'He sniffs and says that proper channels are where good ideas go to drown.', diary: 'The Prof is offended. He will recover. He always does.' },
          ] },
        { course: 'The fish', text: 'The committee chairman, Sir Henry Tisdale, is backing something called radio direction-finding. The Prof thinks it a toy, and prefers aerial mines on parachutes and infra-red. Whose science do you trust?',
          choices: [
            { label: 'Back the Prof', effects: '@prof+6 war-3', result: 'You back him. Tisdale\'s committee threatens to resign rather than sit with him.', diary: 'Backed the Prof. Tisdale\'s people threaten to resign.' },
            { label: 'Back radio, quietly', effects: '@prof-6 war+4 cap+2', result: 'You tell the Air Minister privately to give the radio men all they want. The Prof never finds out.', diary: 'Told the Air Ministry: radio. Said nothing to the Prof.' },
            { label: 'Ask him to explain radio properly', effects: 'cap+3', result: 'He does, brilliantly, and in the course of it half persuades himself.', diary: 'The Prof explained radio. I understood it. So, I think, did he.' },
          ] },
        { course: 'The pudding', text: 'He brings out a slide rule and a sheet of German figures, and shows you how many bombers the Luftwaffe could have by 1937. He wants you to say it in the House, with his numbers.',
          choices: [
            { label: 'Say it, with his numbers', effects: 'steel+2 press+4 fav-4', result: 'You say it. The numbers are exaggerated in places and right in the essentials.', diary: 'Used the Prof\'s numbers. Exaggerated, Martyn says. But not by much.' },
            { label: 'Check them against Martyn\'s first', effects: 'cap+3 @martyn+4', result: 'The two sets differ. You use the lower ones, and are more believed.', diary: 'Two sets of German numbers. I chose the dull ones. Better.' },
          ] },
      ] },

    { id: 'abdication', t: 1936.93, year: 1936, title: 'The King\'s Party', if: '!mp',
      venue: { plate: 'gallery', label: 'The House of Commons, December 1936' },
      text: 'The King wants to marry Mrs Simpson, an American divorcee, and the Prime Minister has told him that he must choose between her and the throne. A few people are talking of a King\'s Party to keep him. Lord Beaverhulme\'s papers are for the King. You have been his friend since he was a boy. On Monday you will rise in the House to ask for time.',
      basis: 'Churchill\'s support for Edward VIII during the Abdication crisis, December 1936.',
      real: 'Churchill urged delay and was shouted down in the Commons on 7 December 1936. Edward VIII abdicated on 10 December. The episode badly damaged Churchill\'s standing just as his warnings about Germany needed a hearing.',
      check: 'unchecked', facts: ['abdication-1936'],
      choices: [
        { label: 'Rise and ask for time for the King', historical: true, effects: 'loyalty-4 fav-10 rep-6 press-4 #kings-man', result: 'The House shouts you down. You stand there, swaying, and sit. The papers say your career is over. The Abdication follows four days later.', diary: 'Howled down. The House turned on me like a pack. My career may be finished. The King\'s is.' },
        { label: 'Advise the King privately to go', effects: 'loyalty+3 fav+4', result: 'You tell him, as a friend, that he cannot win. He goes. He does not write to you again for a long time.', diary: 'Told the King to go. He went. I have lost a friend and kept my seat.' },
        { label: 'Say nothing. This is not your quarrel', effects: 'temper-3 loyalty+1', result: 'You keep away. The crisis passes over you. Your warnings about Germany are heard a little better for it.', diary: 'Silent on the King. The House listens to me on Germany this week.' },
      ] },

    { id: 'edgerton-1938', t: 1938.14, year: 1938, title: 'The Foreign Secretary resigns', if: '!mp',
      venue: { plate: 'gallery', label: 'February 1938' },
      text: 'Antony Edgerton has resigned as Foreign Secretary rather than go along with the Prime Minister\'s overtures to Mussolini. He is young, handsome, and much admired, and a group of Tory Members is gathering round him. The Whips call them the Glamour Boys. Your own little band is older, louder and less respectable. Do you join him, ignore him, or try to bring the two groups together?',
      basis: 'Eden\'s resignation on 20 February 1938, and the "Glamour Boys" who gathered round him, separate from Churchill\'s smaller group.',
      real: 'Eden resigned on 20 February 1938 over Chamberlain\'s approach to Mussolini. The anti-appeasement Conservatives formed two groups, Eden\'s larger and more cautious one and Churchill\'s smaller one. They coordinated only loosely until 1939.',
      check: 'research', facts: ['eden-1938'],
      choices: [
        { label: 'Keep your own band and your own line', historical: true, effects: 'steel+2 loyalty-2 @edgerton+2', result: 'You praise his resignation in the House and keep your distance. His group thinks you a liability; yours thinks him a lightweight.', diary: 'Edgerton has gone. A good man, a little careful. We shall go our own ways for now.' },
        { label: 'Join forces with Edgerton', effects: 'loyalty-1 cap+4 @edgerton+12', result: 'You meet at a house in Mayfair. Your two groups agree to vote together. The Whips are worried for the first time.', diary: 'Joined forces with Edgerton. Thirty of us now. The Whips noticed.' },
        { label: 'Stay loyal to the Prime Minister', effects: 'loyalty+4 fav+6 steel-2', result: 'You stay with the Government. It is safer and you hate it.', diary: 'Loyal. For now. Hitler will decide how long.' },
      ] },

    { id: 'epping-1938', t: 1938.5, year: 1938, title: 'The bailiffs and the association', if: '!mp',
      venue: { plate: 'chine', label: 'Your study, summer 1938' },
      text: 'Two letters on the same morning. Your broker says that your debts now exceed what you can raise, and that the house will have to be sold. Your constituency chairman says that a group in the association wants you dropped at the next election for disloyalty to the Prime Minister. A rich admirer has sent word through Bracknell that he would like to help, quietly.',
      basis: 'Churchill\'s financial crisis of 1938, when Chartwell was put up for sale and he was rescued by a financier; and the attempts to deselect him at Epping in 1938–39.',
      real: 'In 1938 Churchill put Chartwell on the market. The financier Sir Henry Strakosch took over his share losses, and the house was withdrawn from sale. Some members of his Epping association tried to unseat him in 1938–39 for attacking Chamberlain, but failed.',
      check: 'unchecked', facts: ['rescue-1938', 'epping-deselect'],
      choices: [
        { label: 'Take the admirer\'s help and fight the association', historical: true, effects: 'money+20 steel+2 seat+5 @bracknell+6 #obliged', result: 'The debts are taken over. The house is withdrawn from sale. At a stormy meeting in Woodford the association backs you by three to one.', diary: 'Rescued. The house is saved. Woodford backs me. I owe a great deal, to a man I hardly know.' },
        { label: 'Sell the house and keep your independence', effects: 'money+12 health-4 @clemency+4 -!chartwell', result: 'The house is sold. You move to a flat in London and write harder. Nobody owns you.', diary: 'Chartwell sold. I walked round it a last time. Now I am free, and poorer.' },
        { label: 'Make peace with the Prime Minister to save the seat', effects: 'loyalty+5 fav+6 steel-3 seat+6 money+4', result: 'You tone down your speeches. The association relents. Your friends notice.', diary: 'Toned it down. The association is quiet. So, I find, am I.' },
      ] }
  );

  act.scenes.forEach((sc) => { if (sc.t == null) sc.t = sc.year; });
  act.scenes.sort((a, b) => a.t - b.t);
})();
