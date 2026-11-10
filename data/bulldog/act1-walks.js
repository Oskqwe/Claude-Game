/* The Bulldog — Act I: three walkable scenes in the new Member's first weeks, 1901.
   kind 'walk' with a place (js/places.js): choosing a seat in the Chamber, a night walk along
   the Embankment with a colleague, and an evening at the Carlton Club. */
(function () {
  const TM = window.TM;
  const act = TM.ACTS.bulldog[1];
  const seat = TM.Places.commons.seat;

  Object.assign(TM.PEOPLE, {
    gest: { name: 'Ivor Gest', role: 'Your cousin, Member for a Midlands seat' },
    belford: { name: 'Mr Arthur Belford', role: 'First Lord of the Treasury, Leader of the House' },
    mabberley: { name: 'General Sir Hector Mabberley', role: 'A club bore who knew your father' },
  });

  act.scenes.push(
    /* ── 1. Taking your seat ───────────────────────────────── */
    { id: 'chamber-seat', t: 1900.985, year: 1901, title: 'Where to sit', kind: 'walk', place: 'commons', if: '!mp',
      venue: { plate: 'gallery', label: 'The Chamber of the House of Commons' },
      enter: 'Walk onto the floor of the House', skip: 'Sit wherever there is room', leaveLabel: 'Leave the Chamber',
      text: 'February 1901. You have taken the oath and signed the roll, and now you must find somewhere to sit. There are no places marked, but every Member knows the geography: behind the Ministers for the loyal, below the gangway for the awkward, and across the floor for the enemy. Where a new Member sits is the first thing the House learns about him.',
      basis: 'The seating of the Commons as a political statement: the government side behind the Treasury bench, the independents and rebels below the gangway (where Lord Randolph Churchill\'s "Fourth Party" sat in the 1880s), and Churchill crossing the floor to the Liberal benches on 31 May 1904.',
      real: 'Churchill crossed the floor of the House to sit with the Liberals on 31 May 1904, over Free Trade. The Chamber you walk is the one built by Charles Barry, which was destroyed by German bombs on the night of 10 May 1941 and rebuilt to a new design.',
      check: 'corroborated', facts: ['crossed-1904', 'commons-1941'],
      leave: 'You have chosen your place. From the gallery the Whips note it, and so do the newspapers: where you sit tomorrow, they will expect to find you.',
      leaveAlone: 'You sit wherever there is room, which happens to be near the door. Nobody can tell yet what kind of Member you mean to be.',
      spots: [
        { id: 'seat-treasury', name: 'Behind the Treasury bench', role: 'With the Ministers\' supporters', at: [-2, -6], group: 'seat', verb: 'Look at this seat',
          talk: { text: 'Just behind the Ministers, where a Whip can tap your shoulder and a Minister can turn to ask your opinion. Promotion sits here. So does a great deal of nodding.',
            choices: [
              { label: 'Take this seat', effects: 'fav+5 loyalty+3 order+1', sit: seat(-1, 1, -6), result: 'You sit down behind the Treasury bench. A Minister turns, sees who it is, and gives you a small, approving nod.', diary: 'Sat behind the Ministers today. A nod from the front bench. One must begin somewhere.' },
              { label: 'Look elsewhere', stay: true },
            ] } },
        { id: 'seat-gangway', name: 'Below the gangway', role: 'Where the independents sit', at: [-2, 5], group: 'seat', verb: 'Look at this seat',
          talk: { text: 'The corner seat below the gangway, on the government side, where a man can support his party and still be a nuisance to it. Your father\'s small band of rebels sat near here twenty years ago and made the front bench\'s lives a misery.',
            choices: [
              { label: 'Take the corner seat', historical: true, effects: 'cap+3 loyalty-2 temper+1 press+2 #below-gangway', sit: seat(-1, 0, 5), result: 'You take the corner seat. An old Member across the gangway looks at you, then at the seat, and says your father\'s name, not quite to himself.', diary: 'The corner below the gangway. Papa\'s old ground. The House noticed.' },
              { label: 'Look elsewhere', stay: true },
            ] } },
        { id: 'seat-across', name: 'Across the floor', role: 'The Opposition benches', at: [2, -2], group: 'seat', verb: 'Look at this seat',
          talk: { text: 'The Opposition benches, among the Liberals. There is room, and some of them are quite welcoming. But to sit here as a government Member, on your first day, would be a sensation, and not a kind one.',
            choices: [
              { label: 'Sit with the Opposition', effects: 'loyalty-8 fav-10 press+6 rep+2 state+2 !sat-opposite', sit: seat(1, 2, -2), result: 'A murmur runs round the Chamber. The Liberal next to you shifts along with elaborate courtesy. By evening the story is in every club in London.', diary: 'Sat on the wrong side of the House. On purpose. Uproar, gratifying.' },
              { label: 'Look elsewhere', stay: true },
            ] } },
      ] },

    /* ── 2. A night walk along the Embankment ──────────────── */
    { id: 'embankment-walk', t: 1900.997, year: 1901, title: 'The Embankment, after midnight', kind: 'walk', place: 'embankment', if: '!mp',
      venue: { plate: 'embankment', label: 'The Victoria Embankment' },
      enter: 'Walk along the river', skip: 'Take a hansom home instead', leaveLabel: 'Stop walking',
      text: 'The House rose after midnight. Instead of a cab you walk home along the Embankment, under the dolphin lamps, with the river black on your left and the Clock Tower lit ahead. You are not alone: there is a plan to be made about the War Secretary\'s army scheme, and the Embankment at this hour is the one place in Westminster where nobody is listening.',
      basis: 'The Hughligans plotting against Brodrick\'s army scheme in the spring of 1901, and Churchill\'s attack on it in the House on 13 May 1901; Lord Hugh Cecil\'s circle; and the question, which ended with Churchill crossing the floor in 1904, of how far a rebel can go.',
      real: 'Churchill made his attack on Brodrick\'s army scheme in the House on 13 May 1901, with the support of the small group of young Conservatives around Lord Hugh Cecil. In 1904 he crossed to the Liberals over Free Trade; Cecil, a Free Trader too, stayed a Conservative. The Embankment\'s dolphin lamps were designed by George Vulliamy around 1870.',
      check: 'corroborated', facts: ['brodrick-1901', 'hughligans', 'crossed-1904', 'dolphin-lamps'],
      leave: 'You part at the foot of the Clock Tower as Big Ben strikes one. The plan is made. Whether it is a good plan, May will tell.',
      leaveAlone: 'You take a hansom home. The plan will have to be made by daylight, in rooms where people listen.',
      companions: [
        { if: '#rebel-set', name: 'Lord Hugo Seyton', role: 'Walking with you', look: { coat: 0x18181e, hat: 'none', hair: 0x8a6a3a },
          beats: [
            { at: [.5, 26], text: 'Lord Hugo walks with his hands behind his back, talking fast. The army scheme will come to a vote in May. Six army corps, at a cost nobody will state. He wants you to lead the attack, because you have been to war and he has not. How?',
              choices: [
                { label: 'A full-dress speech on the cost', historical: true, effects: 'cap+5 press+4 fav-4 state+1 !army-speech', result: 'He stops under a lamp and laughs aloud. That is it: a soldier who says the Army is too expensive. They will never forgive you, and they will never forget it.', diary: 'H. agrees: I shall make the speech on the cost. Must learn it by heart.' },
                { label: 'An amendment signed by all of us', effects: 'cap+3 loyalty-2 fav-2 @seyton+4', result: 'He likes it: a dozen names are harder to punish than one. He will draft it tonight, in the beautiful hand he uses for heresy.', diary: 'An amendment, with all our names. Safety in numbers. Possibly.' },
                { label: 'Go quietly to the Treasury, which hates the bill too', effects: 'fav+2 cap+2 order+1', result: 'He looks at you sideways. Cleverer than a speech, he says, and duller. But it may work, which speeches seldom do.', diary: 'Suggested working through the Treasury. Hugo thinks me a cynic. He may be right.' },
              ] },
            { at: [.5, 6], text: 'You pass a hansom waiting at the kerb, the horse asleep on its feet. Who else should be told? The young men are not enough on their own. Lord Hugo runs through the names: the Liberal Imperialists across the floor, the newspapers, or the old men of your father\'s day who never forgave the party for dropping him.',
              choices: [
                { label: 'The newspapers, first', effects: 'press+5 loyalty-2', result: 'He winces, then agrees. You know a man at the Morning Post who will print anything with a good sentence in it.', diary: 'We will go to the papers first. H. hates it. Necessary.' },
                { label: 'Your father\'s old friends', effects: 'rep+3 cap+2 @father+2', result: 'He is touched, and a little surprised. There are three old men in the Carlton who will do anything for Lord Randal\'s son. You will see them tomorrow.', diary: 'Papa\'s old friends. They will come, for his sake.' },
                { label: 'The Liberals across the floor', effects: 'loyalty-4 state+2 fav-4 @gwynne+6', result: 'He stops walking. That is a long road, he says quietly, and men who start down it do not always come back. Then he walks on.', diary: 'Proposed going to the Liberals. Hugo went quiet. I meant it.' },
              ] },
            { at: [.5, -16], text: 'The Clock Tower fills the sky ahead. Lord Hugo asks, as lightly as he can, the question he has been carrying all evening: if the party ever turned against Free Trade, which it may, would you stay with it? Or would you cross the floor?',
              choices: [
                { label: 'Never. A man dies in the party he was born in', effects: 'loyalty+4 order+1 @seyton+4', result: 'He nods, relieved, and says that is what he would say too. Neither of you is quite sure either of you means it.', diary: 'Told H. I would never cross. I wonder.' },
                { label: 'If it abandons Free Trade, yes', historical: true, effects: 'state+2 loyalty-3 cap+2 #free-trader', result: 'He is quiet for a long while. Then he says he would stay and fight from inside, and you would not, and that is the difference between you.', diary: 'Said I would cross over Free Trade. Hugo would not. We parted friends.' },
                { label: 'Laugh, and point at the moon', effects: 'temper+2 rep+1', result: 'He laughs too, and lets it go. But he will ask again, and next time he will want an answer.', diary: 'Ducked the question with a joke. He will ask again.' },
              ] },
          ] },
        { if: '~#rebel-set', name: 'Ivor Gest', role: 'Your cousin, walking with you', look: { coat: 0x1b1b24, hat: 'top', hair: 0x2a1d12, moustache: 0x2a1d12 },
          beats: [
            { at: [.5, 26], text: 'Your cousin Ivor, elected at the same election, falls into step. He is rich, amiable and cautious. The War Secretary\'s army scheme comes before the House in May, and he has heard you mean to speak against it. Is that wise, in your first session?',
              choices: [
                { label: 'Yes: speak against it on the cost', historical: true, effects: 'cap+4 press+4 fav-4 state+1 !army-speech @gest-2', result: 'He sighs. Then, being family, he offers to find you the figures from his father\'s friends at the War Office.', diary: 'Ivor thinks the speech mad. He is getting me the figures anyway.' },
                { label: 'Perhaps a question or two, nothing more', effects: 'fav+2 cap+1 @gest+4', result: 'He is relieved. A question or two is how a sensible man begins.', diary: 'Agreed with Ivor to go carefully. For now.' },
                { label: 'No. Support it, and be noticed by the Whips', effects: 'fav+5 loyalty+3 @gest+3 empire+1', result: 'He claps you on the shoulder. The Whips will hear of it by Thursday, he promises. He knows one of them from Eton.', diary: 'I shall support the army scheme. The Whips will be told. Ivor arranged it.' },
              ] },
            { at: [.5, 6], text: 'You pass a hansom waiting at the kerb. Ivor has a proposal: his family has money, and a London house on Park Lane, and they mean to give dinners for the young men of the party. Would you help him choose the guests?',
              choices: [
                { label: 'Gladly: the cleverest young men', effects: 'cap+3 rep+2 @gest+6', result: 'Between you, by Westminster Bridge, you have a list of eight names. Three of them will be in the Cabinet one day.', diary: 'Ivor\'s dinners: we chose the guests. A good list.' },
                { label: 'Only if the newspapers are asked too', effects: 'press+4 @gest+2', result: 'He is doubtful, but agrees to one editor, on probation.', diary: 'Got an editor onto Ivor\'s list. Useful.' },
                { label: 'Decline: you will make your own way', effects: 'temper+1 @gest-4', result: 'He is hurt, and hides it badly. Family, he says, is supposed to help.', diary: 'Refused Ivor\'s dinners. He took it badly.' },
              ] },
            { at: [.5, -16], text: 'The Clock Tower fills the sky ahead. Ivor asks, half joking, what you will do if the party ever goes in for tariffs. His family are Free Traders to the bone. Would you stay with the party?',
              choices: [
                { label: 'Stay with the party, whatever it does', effects: 'loyalty+4 @gest-1', result: 'He nods slowly. He is not sure he could, he says. You walk on in silence.', diary: 'Told Ivor I would stay with the party. He is not sure he would.' },
                { label: 'Cross the floor together, if it comes to that', historical: true, effects: 'state+2 loyalty-3 @gest+8 #free-trader', result: 'He laughs, and shakes your hand on it under the Clock Tower, and neither of you thinks it will ever come to that.', diary: 'Shook hands with Ivor: if the party goes for tariffs, we cross together.' },
                { label: 'Change the subject to horses', effects: 'temper+1', result: 'He lets you. Ivor always lets you.', diary: 'Talked of horses. Ivor let me.' },
              ] },
          ] },
      ] },

    /* ── 3. An evening at the Carlton ───────────────────────── */
    { id: 'carlton-evening', t: 1900.998, year: 1901, title: 'An evening at the Carlton', kind: 'walk', place: 'carlton', if: '!mp',
      venue: { plate: 'club', label: 'The Carlton Club, Pall Mall' },
      enter: 'Go into the Carlton', skip: 'Dine at home tonight', leaveLabel: 'Leave the club',
      text: 'The Carlton in Pall Mall, the party\'s club: granite columns, a Turkey carpet, the great dead in oils and the living asleep under newspapers. You have been a member since the election. Tonight the Leader of the House is standing by the fire, the party\'s agent is at a table with his papers, and an old general who knew your father is lying in wait in an armchair.',
      basis: 'The Carlton Club as the Conservative party\'s social headquarters before 1914; Balfour as Leader of the House (1891–92, 1895–1902); Captain Middleton as the party\'s principal agent; and the club life of a young Member.',
      real: 'The Carlton\'s clubhouse in Pall Mall was destroyed by German bombs on 14 October 1940, and the club moved to 69 St James\'s Street. Balfour led the House of Commons until he became Prime Minister in July 1902.',
      check: 'corroborated', facts: ['carlton-1940', 'balfour-leader'],
      leave: 'You go out into Pall Mall. The porter whistles up a hansom. Behind you the Carlton settles back into its newspapers, having taken your measure.',
      leaveAlone: 'You dine at home. The Carlton will have to wait for you, as it has waited for better men.',
      npcs: [
        { id: 'belford', name: 'Mr Arthur Belford', role: 'Leader of the House', at: [-6.6, -2.6], face: 1.3,
          look: { coat: 0x18181e, hat: 'none', hair: 0x6b5a44, moustache: 0x6b5a44 },
          talk: { text: 'The Leader of the House is tall, languid and charming, warming his coat-tails at the fire. He has read your first speeches, he says, with more pleasure than he expected. He asks, idly, whether you find the House a good club or a bad debating society.',
            choices: [
              { label: 'A good club, and you mean to be a member of it', effects: 'fav+4 loyalty+2 @belford+8', result: 'He smiles. The right answer, he says, and the wrong one would have been more interesting. He drifts away to talk to a Duke.', diary: 'Belford by the fire. Charm itself. I gave the safe answer.' },
              { label: 'A bad debating society, which you mean to improve', effects: 'cap+3 rep+2 fav-1 @belford+4', result: 'He laughs, genuinely. He has thought so for twenty years, he says, and has never dared say so in the Carlton.', diary: 'Told Belford the House debates badly. He agreed! Or seemed to.' },
              { label: 'Ask him straight out about the army scheme', effects: 'cap+2 fav-2 press+1 @belford-2', result: 'His face does not change, but the conversation is over. He has a gift for leaving without appearing to move.', diary: 'Asked Belford about the army scheme. He vanished like smoke.' },
            ] },
          after: 'Mr Belford is telling a story to a Duke, who is laughing too loudly.' },
        { id: 'middleham', name: 'Captain Middleham', role: 'The party\'s principal agent', at: [6.2, -3.4], face: -1.4,
          look: { coat: 0x22201e, hat: 'none', hair: 0x8c8278, whiskers: 0x8c8278 },
          talk: { text: 'Captain Middleham runs the party\'s elections from a room full of ledgers. He has looked at your majority and frankly does not like it. There are safer seats, he says, for young men who make themselves useful. And there are speaking engagements in the country, every Saturday, for young men who want to.',
            choices: [
              { label: 'Take the Saturday speeches', effects: 'seat+5 press+3 health-3 fav+3 @middleham+8', result: 'He writes your name in a ledger with satisfaction. Bolton, Bristol, Bury St Edmunds. Every Saturday until Easter.', diary: 'Saturdays until Easter, speaking for the party in the country. Exhausting. Useful.' },
              { label: 'Ask about a safer seat', effects: 'seat+3 loyalty+2 fav+2 @middleham+3', result: 'He taps his nose. There may be something in Kent, in a year or two, for a young man who is no trouble. He looks at you. No trouble at all.', diary: 'Middleham hints at a safe seat in Kent. If I behave.' },
              { label: 'Say you mean to hold your own seat on your own terms', effects: 'seat+2 temper+2 fav-2 @middleham-3', result: 'He shrugs. Many have said that, he says. He has their names in a ledger too, in a different column.', diary: 'Told Middleham I hold my seat my own way. He was not impressed.' },
            ] },
          after: 'Captain Middleham is deep in his ledgers.' },
        { id: 'mabberley', name: 'General Sir Hector Mabberley', role: 'A club bore who knew your father', at: [6.6, 5.6], face: -2.6, sit: true, sitY: -.47,
          look: { coat: 0x26231f, hat: 'none', hair: 0xc9c2b6, whiskers: 0xc9c2b6 },
          talk: { text: 'The General has been waiting for you since the soup. He knew your father, served under the Duke of Cambridge, and has opinions on the army scheme, the Boers, the young and the price of port, which he means you to hear in that order.',
            choices: [
              { label: 'Sit and listen to all of it', effects: 'rep+2 fav+2 health-2 @mabberley+12', result: 'An hour and a half later he tells you something genuinely useful: which officers at the War Office think the army scheme is nonsense, and will say so to a Member.', diary: 'Two hours of the General. Buried in it, a list of names at the War Office. Worth it.' },
              { label: 'Ask him about your father', effects: 'rep+1 @mabberley+6 @father+2', result: 'He softens at once, and tells you a story about your father you have never heard, which may even be true.', diary: 'The General told me a story about Papa I never knew. I shall not check it.' },
              { label: 'Escape, with a courteous excuse', effects: 'temper+1 @mabberley-4', result: 'He watches you go with the eyes of a man who has been escaped from by better men, and will tell the smoking room so.', diary: 'Escaped the General. He will tell the smoking room.' },
            ] },
          after: 'The General is asleep under the Morning Post.' },
      ] }
  );
  act.scenes.sort((a, b) => a.t - b.t);
})();
