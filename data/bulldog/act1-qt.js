/* The Bulldog — Act I: the first Question Time, early 1901 (kind: 'qt').
   Each question is a "course" with its own clock (seconds) and an optional timeout outcome. */
(function () {
  const TM = window.TM;
  const act = TM.ACTS.bulldog[1];

  Object.assign(TM.PEOPLE, {
    brodwell: { name: 'Mr St John Brodwell', role: 'Secretary of State for War' },
    gwynne: { name: 'Mr Lloyd Gwynne', role: 'Welsh Radical, against the war' },
  });

  act.scenes.push(
    { id: 'first-questions', t: 1900.99, year: 1901, title: 'Questions to the War Office', kind: 'qt', if: '!mp', seconds: 15,
      venue: { plate: 'gallery', label: 'The Chamber of the House of Commons' },
      guests: ['Mr Speaker', 'Mr St John Brodwell, Secretary of State for War', 'Mr Lloyd Gwynne', 'The Irish benches'],
      text: 'February 1901. The old Queen is dead, the war drags on, and the Chamber is packed for Questions. Your name is on the Order Paper: a question to the Secretary of State for War on the price paid for remount horses in South Africa. When the Speaker calls your number, five hundred men turn to look at the new Member. There is no time to think. Answer as fast as the House talks.',
      basis: 'Churchill\'s first months in the House: his maiden speech on the war (18 February 1901) and his attack on the War Secretary\'s army scheme (May 1901). Also the remounts scandal, and the Irish members removed from the Chamber by police in March 1901. Question Time as a form, set in 1901.',
      real: 'Churchill made his maiden speech on the Boer War on 18 February 1901, following the Welsh pro-Boer Lloyd George, and in May 1901 attacked Brodrick\'s plan for six army corps as too costly. Horses bought for the war, many in Hungary, were questioned in the House from 1901 and led to a military court of inquiry in 1902. On 5 March 1901 Irish Nationalist members who refused to leave the Chamber after suspension were removed by police.',
      check: 'corroborated', facts: ['maiden-1901', 'brodrick-1901', 'remounts', 'irish-1901'],
      courses: [
        { course: 'The Minister replies', text: 'The Secretary for War gives you a smooth answer: the horses were bought by experienced officers at fair prices, and the figures will be laid before the House in due course. The benches behind him murmur approval. Mr Speaker looks at you. Do you have a supplementary?',
          timeout: { effects: 'cap-2 rep-1', result: 'You half rise and sit down again. The Speaker calls the next question.' },
          choices: [
            { label: 'Read out the price of a horse in Hungary against the price paid', historical: false, effects: 'press+4 cap+3 fav-3 @brodwell-6 state+1', status: { brodwell: 'Noted the new Member with the figures.' }, result: 'You have the figures, and they are bad. The Minister promises to look into it. The press gallery writes your name down.', diary: 'Had the Minister on the remounts. He promised to "look into it". Ha.' },
            { label: 'Ask, sweetly, whether "due course" means before the war ends', effects: 'rep+3 press+2 fav-1 temper+1', result: 'The House laughs, the Minister colours, and somebody on your own side says "Hear, hear" before he can stop himself.', diary: 'Got a laugh at Questions. The trick is to be short.' },
            { label: 'Thank the Minister and sit down', effects: 'fav+3 loyalty+2 press-1', result: 'The Whips approve of a new Member who knows his place. Nobody else notices you at all.', diary: 'Thanked the Minister. Safe. Dull.' },
          ] },
        { course: 'Mr Lloyd Gwynne rises', text: 'Before the next question a Welsh Radical is on his feet with a point of his own: does the honourable Member who is so worried about horses also approve of the burning of Boer farms and the herding of women and children into camps?',
          timeout: { effects: 'press-2 rep-1', result: 'You say nothing, and it looks as if you have nothing to say.' },
          choices: [
            { label: 'Say a brave enemy deserves to be treated honourably', historical: true, effects: 'rep+4 press+3 fav-4 temper-1 @gwynne+8', status: { gwynne: 'Was surprised by you, and said so in the Tea Room.' }, result: 'There is a growl from your own benches and a cheer from the Radicals. It is not what a government Member is supposed to say.', diary: 'Said the Boers deserve honour. My own side growled. I meant it.' },
            { label: 'Say the camps are a military necessity', effects: 'fav+3 empire+2 order+1 @gwynne-6 rep-1', result: 'Your side cheers. The Radical sits down shaking his head, and the reports of the camps get no better.', diary: 'Defended the camps. Hear, hear. I wonder.' },
            { label: 'Say that is not the question on the Paper', effects: 'temper-1 cap+1', result: 'The Speaker agrees with you. The point is lost, and so is the moment.', diary: 'Ducked Gwynne on a point of order.' },
          ] },
        { course: 'Uproar below the gangway', text: 'The Irish members choose this moment to protest against the closure of a debate. They will not leave, the Serjeant-at-Arms is sent for, and the House is in uproar. In the noise a Member near you shouts that it is a disgrace, and looks to you to agree.',
          timeout: { effects: 'rep-1', result: 'You sit through it white-faced, and later cannot say what you thought.' },
          choices: [
            { label: 'Shout for order with the rest', effects: 'order+2 fav+2 empire+1', result: 'You add your voice to the din. When the police come in to carry the Irish members out, it is an ugly sight.', diary: 'Police in the Chamber. I shouted with the rest. I am not proud of it.' },
            { label: 'Stay silent and watch', effects: 'temper-2 rep+1', result: 'You watch the police carry men out of the Chamber. You will remember it the next time someone talks of order.', diary: 'Saw the Irish members carried out by police. Remember this.' },
            { label: 'Cross the floor to speak to the Irish whip', effects: 'loyalty-2 rep+2 fav-3 state-1', result: 'You ask whether there is a way out with dignity. There is not, but he notes who asked.', diary: 'Spoke to the Irish whip in the middle of it. Fav will be cross.' },
          ] },
        { course: 'A note from the Whips', text: 'Order is restored. A folded note reaches you along the bench: the Whips would be obliged if you would not press the remounts question further today. The Secretary for War is a friend of the Prime Minister\'s. Your next question is due in two minutes.',
          timeout: { effects: 'fav-1', result: 'You are still holding the note when your question is called, and you read it out badly.' },
          choices: [
            { label: 'Tear up the note and press on', effects: 'loyalty-4 press+3 fav-6 temper+2 #awkward', result: 'You press on, and the papers love it. The Chief Whip passes you in the Lobby without a word.', diary: 'Tore up the Whips\' note. Chief Whip cut me in the Lobby.' },
            { label: 'Withdraw the question, this once', effects: 'fav+5 loyalty+3 press-2', result: 'You withdraw it. A Whip touches your shoulder on the way out: you will not be forgotten.', diary: 'Withdrew, this once. Owed a favour now.' },
            { label: 'Put it down for written answer instead', effects: 'fav+1 cap+2 state+1', result: 'You get your figures in Hansard a week later, quietly, and use them in a speech in your constituency.', diary: 'Written answer. The figures will keep.' },
          ] },
        { course: 'The planted question', text: 'Last of all, a Whip hands you a question for the Colonial Secretary, Mr Joseph Chambers, written for you: will he tell the House of the great progress being made in South Africa? It is a gift to the government, and a test of whether you can be trusted.',
          timeout: { effects: 'fav-2', result: 'You fumble the paper and the Speaker moves on. The Whip takes it back from you.' },
          choices: [
            { label: 'Ask it, word for word', effects: 'fav+4 loyalty+2 @chambers+4 rep-1', result: 'Mr Chambers rises and gives a long, confident answer. He nods to you afterwards.', diary: 'Asked the planted question. Chambers nodded to me.' },
            { label: 'Ask it, but add "and at what cost"', effects: 'cap+3 press+2 fav-2 @chambers+1 temper+1', result: 'The extra words get a laugh and a sharper answer than the Whips wanted. Mr Chambers looks at you with interest.', diary: '"And at what cost." Chambers looked at me as if he might like me.' },
            { label: 'Hand it back. You will ask your own questions', effects: 'loyalty-3 rep+3 fav-4 #independent', result: 'The Whip takes it back and gives it to someone else. Word goes round that you are your own man.', diary: 'Gave the planted question back. My own man.' },
          ] },
      ] }
  );
  act.scenes.sort((a, b) => a.t - b.t);
})();
