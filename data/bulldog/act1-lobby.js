/* The Bulldog — Act I: the Members' Lobby after Questions, 1901 (kind: 'lobby', walked in 3D).
   npcs: { id, name, role, at: [x, z], face, look: { coat, trousers, hat, hair, whiskers }, if, talk, after }
   The room runs x −10…10, z −13…13; the Chamber door is on the north wall (z = −13). */
(function () {
  const TM = window.TM;
  const act = TM.ACTS.bulldog[1];

  Object.assign(TM.PEOPLE, {
    walbrook: { name: 'Sir William Walbrook', role: 'Chief Whip' },
    pellow: { name: 'Mr Pellow', role: 'Lobby correspondent, Morning Post' },
    seyton: { name: 'Lord Hugo Seyton', role: 'Member, a Prime Minister\'s son' },
  });

  act.scenes.push(
    { id: 'lobby-1901', t: 1900.995, year: 1901, title: 'The Members\' Lobby', kind: 'walk', place: 'lobby', if: '!mp', enter: 'Walk into the Lobby', skip: 'Pass through without stopping', leaveLabel: 'Leave the Lobby',
      venue: { plate: 'gallery', label: 'The Members\' Lobby' },
      text: 'Questions are over and the House empties into the Members\' Lobby, under the gas-lamps and the marble statesmen, where the real business of Parliament is done standing up. The Chief Whip is by the Chamber door. A Colonial Secretary holds court by a statue. A Welsh Radical, a newspaperman and a clever young lord are each, for their own reasons, waiting to see whether the new Member will come their way.',
      basis: 'Churchill\'s first session, 1901: the Members\' Lobby as the place of business with Whips, ministers and lobby journalists; Lord Hugh Cecil\'s group of young Conservative rebels, the "Hughligans"; Lloyd George\'s pro-Boer campaign; and the army estimates fight with the War Office.',
      real: 'In 1901 Churchill joined a small group of young Conservative rebels around Lord Hugh Cecil, nicknamed the "Hughligans", who dined together and harried their own front bench. Sir William Walrond was the Conservative Chief Whip. Chamberlain, the Colonial Secretary, did not launch his campaign for imperial preference until May 1903. Churchill admired Lloyd George\'s courage over the war and later worked closely with him.',
      check: 'corroborated', facts: ['hughligans', 'walrond-whip'],
      leave: 'You go back through the brass gates into the Chamber with more friends, and more enemies, than you had an hour ago. The Lobby has seen you, and the Lobby will remember.',
      leaveAlone: 'You walk through the Lobby without stopping. A few heads turn. The new Member, it is noted, keeps himself to himself.',
      npcs: [
        { id: 'walbrook', name: 'Sir William Walbrook', role: 'Chief Whip', at: [-2.4, -10.4], face: 0.25,
          look: { coat: 0x15151a, whiskers: 0x9a9690 },
          talk: { text: 'The Chief Whip takes your elbow, pleasantly. The army estimates come before the House next month. The Government is a little anxious about some of its younger Members. He is sure he need not be anxious about you.',
            choices: [
              { label: 'Promise him your vote', effects: 'fav+6 loyalty+3 @walbrook+12', status: { walbrook: 'Counts on you. Says so to the Prime Minister.' }, result: 'He pats your arm and says that is capital. You have been entered in a book you cannot see, on the right side of the page.', diary: 'Promised the Chief Whip my vote on the army. He looked relieved.' },
              { label: 'Say you will listen to the debate first', effects: 'fav-1 cap+2 @walbrook-3', result: 'His smile does not change at all. He walks off to find somebody easier.', diary: 'Told Walbrook I would decide after the debate. He did not like it.' },
              { label: 'Tell him you mean to vote against the army corps scheme', historical: true, effects: 'loyalty-4 fav-6 press+2 temper+2 @walbrook-12 !army-rebel', status: { walbrook: 'Has put you down as trouble.' }, result: 'He lets go of your elbow and remarks, quietly, that your father once had the same notion about army estimates, and you know how that ended. He walks away.', diary: 'Told the Chief Whip I shall vote against the army scheme. He invoked Papa. Unforgivable, and effective.' },
            ] },
          after: 'The Chief Whip is talking to someone else, and does not look round.' },

        { id: 'chambers', name: 'Mr Joseph Chambers', role: 'Colonial Secretary', at: [5.6, -7.4], face: -0.7,
          look: { coat: 0x101014, trousers: 0x55555c },
          talk: { text: 'Mr Chambers, eyeglass in place, orchid in his buttonhole, is talking of the Empire after the war: the colonies bound to the mother country by trade as well as blood, a family behind a common tariff wall. He turns the eyeglass on you. What do the young men think?',
            choices: [
              { label: 'Say the young men are with him', effects: 'empire+3 state+1 @chambers+8 fav+2', status: { chambers: 'Thinks you might be one of his.' }, result: 'He is pleased, and shows it, and tells you to come to Birmingham one day and say so. It is not quite an invitation, but it is close.', diary: 'Chambers asked what the young men think. I told him we are with him. Are we?' },
              { label: 'Say Free Trade made England rich', effects: 'empire-1 state-2 cap+2 @chambers-5 rep+2', status: { chambers: 'Has marked you down as a Free Trader.' }, result: 'He smiles thinly, allows that it did, once, and turns back to his circle. You will remember this conversation in two years\' time.', diary: 'Defended Free Trade to Chambers\'s face. He did not argue. That was worse.' },
              { label: 'Ask to see his figures', effects: 'cap+3 @chambers+3', result: 'He laughs, delighted to meet a young man who reads figures, and promises to send them. They arrive the next week, in his own hand.', diary: 'Chambers is sending me his figures on imperial trade. In his own hand.' },
            ] },
          after: 'Mr Chambers is deep in talk with two colonial agents.' },

        { id: 'gwynne', name: 'Mr Lloyd Gwynne', role: 'Welsh Radical, against the war', at: [-6.4, -1.6], face: 1.1,
          look: { coat: 0x22201e, hat: 'none', hair: 0x2c1d12, whiskers: 0x2c1d12 },
          talk: { text: 'The Welsh Radical who tackled you in the Chamber is leaning against a pillar, quite unembarrassed. He says you answered better than most of your side could have, and asks whether you would care to dine one evening, privately, to argue about the war.',
            choices: [
              { label: 'Accept, and dine with him', historical: true, effects: 'rep+3 loyalty-2 fav-3 @gwynne+14 state+1', status: { gwynne: 'Has dined with you. Thinks you are wasted on the Tories.' }, result: 'You dine in a Soho chop-house and argue until midnight. You agree about nothing and like each other enormously.', diary: 'Dined with Gwynne. Disagreed about everything. Best evening since I came into the House.' },
              { label: 'Shake his hand, but decline', effects: 'rep+1 @gwynne+4', result: 'He takes it in good part and says there will be another time. He seems quite sure of it.', diary: 'Shook hands with Gwynne. He says there will be another time.' },
              { label: 'Cut him dead', effects: 'fav+3 empire+1 rep-2 @gwynne-12', status: { gwynne: 'Cut by you in the Lobby. He tells the story against you.' }, result: 'You walk past him. Your own side approves. He tells the story against you in the Tea Room, and tells it well.', diary: 'Cut Gwynne in the Lobby. The Tories liked it. I did not much.' },
            ] },
          after: 'Mr Lloyd Gwynne waves cheerfully across the Lobby.' },

        { id: 'pellow', name: 'Mr Pellow', role: 'Lobby correspondent, Morning Post', at: [4.4, 3.2], face: -1.3,
          look: { coat: 0x4a3a28, trousers: 0x3a3026, hat: 'none', hair: 0x6b5a44 },
          talk: { text: 'The man from the Morning Post has a notebook and an apologetic manner that fools nobody. His paper would like a line from the new Member on the remounts, for tomorrow. On the record or off it, just as you please.',
            choices: [
              { label: 'Give him a quotable line, on the record', effects: 'press+6 fav-2 @pellow+8', result: 'It is in the paper next morning, under your name, in a box on the leader page. Two Ministers mention it to you, coldly.', diary: 'In the Morning Post today, under my own name. The Ministers are not amused.' },
              { label: 'Brief him off the record', effects: 'press+3 loyalty-2 @pellow+10 #lobby-source', result: 'Next morning the Post says that "Government back-benchers are uneasy". You are a Government back-bencher, uneasy.', diary: 'Briefed Pellow off the record. "Back-benchers uneasy." It reads well.' },
              { label: 'Tell him you speak only in the House', effects: 'fav+2 press-2 @pellow-4', result: 'He closes the notebook politely. The Morning Post will now have to find its own line, and you may not like the one it finds.', diary: 'Refused Pellow. Proper, and probably a mistake.' },
            ] },
          after: 'Mr Pellow is buttonholing someone else, notebook open.' },

        { id: 'seyton', name: 'Lord Hugo Seyton', role: 'Member, a Prime Minister\'s son', at: [-3.6, 5.2], face: 0.5,
          look: { coat: 0x18181e, hat: 'none', hair: 0x8a6a3a },
          talk: { text: 'A thin, brilliant young lord, a Prime Minister\'s son, draws you aside. A few of the younger Members dine together on Thursdays to decide how best to make their own front bench uncomfortable. They would be glad of a man who can talk. Would you care to join them?',
            choices: [
              { label: 'Join the Thursday dinners', historical: true, effects: 'cap+4 loyalty-3 fav-3 rep+3 @seyton+14 #rebel-set', status: { seyton: 'Has made you one of his set.' }, result: 'Thursday comes, and the dinner is the best talk you have heard in your life. The Whips give your set a nickname, and not a kind one.', diary: 'Dined with Seyton\'s set. The Whips call us hooligans. I have never enjoyed anything more.' },
              { label: 'Go once, to see', effects: 'cap+2 @seyton+6', result: 'You go once, listen a great deal, and say less than you mean to. They ask you back.', diary: 'One Thursday with Seyton\'s lot. Clever. Dangerous. I may go again.' },
              { label: 'Decline. You did not come in to make mischief', effects: 'fav+3 loyalty+2 @seyton-4', result: 'He bows, amused, and observes that you will be very useful to someone and very dull to the rest of us.', diary: 'Declined Seyton\'s dinners. Safe. Possibly dull.' },
            ] },
          after: 'Lord Hugo raises a hand: Thursday, remember.' },
      ] }
  );
  act.scenes.sort((a, b) => a.t - b.t);
})();
