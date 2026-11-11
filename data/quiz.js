/* The opening quiz: 22 questions (DESIGN.md §4), written as everyday situations of the period
   (owner, 11 Nov 2026), so the answers draw the character before the life begins.
   Each answer moves one or two axes; the effects are unchanged from the first version.
   Axes: order, empire, state, steel, loyalty, temper. */
(function () {
  const TM = (window.TM = window.TM || {});

  TM.QUIZ = [
    { q: 'May 1900. News comes that Mafeking is relieved, and the whole town is out in the streets singing. Your housemaster locks the school doors and orders everyone to bed.',
      a: [
        ['Climb out of a window and join the crowd', { loyalty: -2, temper: 2 }],
        ['Go to bed, furious', { loyalty: 1, temper: -1 }],
        ['Go to bed. Rules are rules', { order: 2, loyalty: 2 }],
        ['Get up a petition asking him to let you out for an hour', { order: -1, temper: -1 }],
      ] },
    { q: "A winter evening. A girl of eight, a docker's daughter, is waiting by the gate as you come home. She says there is no tea at her house, and no coal either.",
      a: [
        ['Give her sixpence and see her home', { order: 1, state: -1 }],
        ["Ask yourself why a docker's wage won't feed his family", { order: -2, state: 2 }],
        ['Go round tomorrow and find her father work', { state: 1, temper: -1 }],
        ["Walk on. It's not your business", { order: 2, state: -2 }],
      ] },
    { q: "You sit on the town council. Your group's leader tells you how to vote on a housing scheme you think is wrong for the town.",
      a: [
        ["Vote as you're told", { loyalty: 3 }],
        ['Stay away from the meeting that night', { loyalty: 1, temper: -1 }],
        ['Vote against, and explain yourself in the chamber', { loyalty: -2, steel: 1 }],
        ['Vote against, and write to the local paper', { loyalty: -3, temper: 2 }],
      ] },
    { q: "At a dinner party the talk turns to the news: a dictator says he'll keep the peace if a small country hands him one of its provinces. Everyone looks at you.",
      a: [
        ["Better that than war. Rearm while there's time", { steel: -1, temper: -1 }],
        ['Say it should be refused, even if it means war', { steel: 3, temper: 1 }],
        ['Say we must play for time', { steel: -2, temper: -2 }],
        ['Ask what the small country itself wants', { empire: -2, steel: 1 }],
      ] },
    { q: 'An aunt dies and leaves you four hundred pounds a year: enough to live on without working.',
      a: [
        ['Give up your career and go to live and work in the East End', { order: -3, temper: 1 }],
        ['Invest it carefully and carry on as before', { state: -2, temper: -2 }],
        ['Buy a good horse and an army commission', { empire: 2, temper: 2 }],
        ['Put it into starting a newspaper', { temper: 3, loyalty: -1 }],
      ] },
    { q: 'At the golf club two men are arguing about money. One says the pound must go back to gold at its old value; the other says it should be managed to keep men in work. They ask you.',
      a: [
        ['Gold, at the old value. A pound is a pound', { state: -3, order: 1 }],
        ['Gold, but at a lower rate', { state: -1, temper: -1 }],
        ['Manage it to keep men in work', { state: 3 }],
        ["I'd leave it to the experts", { loyalty: 2, temper: -2 }],
      ] },
    { q: 'May 1926. The whole country is on strike. The trains have stopped and the docks are silent. A neighbour is driving a lorry for the government; another is on the picket line.',
      a: [
        ['Volunteer to drive. The country has to be fed', { order: 3, steel: 2 }],
        ["Stay at home until it's over", { steel: -1, temper: -1 }],
        ['Try to get both sides talking', { steel: -2, state: 1 }],
        ['Join the picket line', { order: -3, loyalty: -1 }],
      ] },
    { q: 'An Indian student lodging with your family asks you straight out at breakfast whether his country should govern itself within ten years.',
      a: [
        ['No. India is the heart of the Empire', { empire: 3, steel: 1 }],
        ['Yes, step by step, as each province shows it can', { empire: 1, temper: -1 }],
        ['Yes. Set a date', { empire: -2 }],
        ['Yes, and sooner than ten years', { empire: -3, temper: 1 }],
      ] },
    { q: 'The railway that employs half your town is going bankrupt. A meeting is called at the town hall.',
      a: [
        ["Let it go under. That's how business works", { state: -3 }],
        ['Ask the government for a loan on strict terms', { state: 1, temper: -1 }],
        ['Call for the state to take it over', { state: 3 }],
        ['Merge it with its rivals under one board', { state: 2, order: 1 }],
      ] },
    { q: 'A newspaper owner offers you a weekly column at a handsome fee, if you go easier on a cause he cares about.',
      a: [
        ['Take the column and write what you like', { temper: 2, loyalty: -1 }],
        ['Take it, and go easier', { loyalty: 1, steel: -1 }],
        ['Turn him down to his face', { steel: 2, loyalty: -1 }],
        ['Turn him down politely and stay friends', { temper: -2 }],
      ] },
    { q: 'Your local paper runs a debate: the government can afford four new battleships, or it can keep children at school until fifteen. Not both.',
      a: [
        ['The battleships', { empire: 2, steel: 2 }],
        ['The schools', { order: -2, state: 2 }],
        ['Two of each, somehow', { temper: -2, loyalty: 1 }],
        ['Neither. Cut the income tax', { state: -3, order: 1 }],
      ] },
    { q: 'An old friend is in the papers, caught up in a scandal over a lady and some shares. He telephones to ask what you think he should do.',
      a: [
        ['Stand by him in public', { loyalty: -1, temper: 2 }],
        ['Say nothing and let others sort it out', { loyalty: 3 }],
        ['Tell him privately that he must step down', { steel: 1, temper: -1 }],
        ['Say in public that he must go', { loyalty: -3 }],
      ] },
    { q: 'August 1914. War has been declared, and there are queues outside every recruiting office.',
      a: [
        ['Join up at once', { steel: 2, temper: 2 }],
        ["Do your bit at home, where you're more use", { temper: -2, state: 1 }],
        ['Join an ambulance unit', { steel: -1, order: -1 }],
        ['Speak out against the war', { steel: -3, loyalty: -3 }],
      ] },
    { q: 'Your Irish neighbour, whose sons drill with the Volunteers on Sundays, asks whether Ireland should rule itself.',
      a: [
        ['Yes. The Irish are a nation', { empire: -3 }],
        ['Yes, but Ulster must be left out', { empire: -1, temper: -1 }],
        ['No. The Union must stand', { empire: 3, order: 1 }],
        ['No, and Ulster should fight it if it comes', { empire: 2, steel: 2, temper: 1 }],
      ] },
    { q: 'The speaker at a public meeting has fallen ill, and the chairman asks you to take his place. You have half an hour.',
      a: [
        ['Say yes and trust to the moment', { temper: 3 }],
        ["Say no. You haven't prepared", { temper: -3 }],
        ['Speak for five minutes, plainly, on the facts', { temper: -1, loyalty: 1 }],
        ['Ask to speak at the next meeting instead, and spend the week writing', { temper: 1, steel: 1 }],
      ] },
    { q: 'A family who fled a dictatorship are living in your church hall. Jobs are scarce in your town, and some neighbours want them sent away.',
      a: [
        ['Let them stay, and others like them', { empire: -2, order: -1 }],
        ['Let them stay if someone guarantees them', { temper: -2 }],
        ["No more until there's work for our own", { order: 2, empire: 1 }],
        ['Let them stay, and shame the other towns into doing the same', { steel: 1, temper: 2 }],
      ] },
    { q: "You're standing for the council. A rich mill-owner offers to pay your election costs, with a hint about how you'll vote on his rates.",
      a: [
        ['Take it. His case is sound anyway', { order: 2, empire: 1 }],
        ['Take it and ignore the hint', { temper: 2, loyalty: -1 }],
        ['Refuse', { order: -1, steel: 1 }],
        ['Refuse, and tell your committee why', { loyalty: -1, order: -2 }],
      ] },
    { q: 'Your union, club or society has a chairman who is failing, and everyone knows it but him.',
      a: [
        ['Get together with others to replace him', { loyalty: -2, temper: 2 }],
        ['Stay loyal. The members chose him', { loyalty: 3 }],
        ['Tell him yourself, to his face', { steel: 2, loyalty: -1 }],
        ["Wait. He'll go in his own time", { temper: -2 }],
      ] },
    { w: [0], q: "1912. Women campaigning for the vote are breaking shop windows in your high street. A neighbour asks whose side you're on.",
      a: [
        ['Theirs. Give women the vote now', { order: -2, temper: 1 }],
        ['Give it, but not because of broken windows', { steel: 1, loyalty: 1 }],
        ['Neither. Politics is no place for women', { order: 3 }],
        ['Keep your opinion to yourself', { loyalty: 2, temper: -1 }],
      ] },
    { q: "The man next door has fallen ill and can't work. His wife asks you how families like theirs should get by in sickness and old age.",
      a: [
        ["Insurance: stamps on a card, paid while you're working", { state: 1, temper: -1 }],
        ['Taxes on the rich', { state: 3, order: -2 }],
        ['Charity and the parish', { state: -3, order: 2 }],
        ['The friendly society and the union', { state: -1, order: -1 }],
      ] },
    { q: 'A letter from the bank: you are badly overdrawn.',
      a: [
        ['Take a well-paid job on a company board', { order: 1, temper: -1 }],
        ["Write for the papers until it's paid off", { temper: 1 }],
        ['Sell what you can and live cheaply', { temper: -2 }],
        ['Borrow more and take a gamble', { temper: 3 }],
      ] },
    { q: 'The papers report a rising in a far-off colony. Two British officers have been killed.',
      a: [
        ['Send troops and restore order', { empire: 2, steel: 2 }],
        ["Send troops, then look into what they're angry about", { empire: 1, temper: -1 }],
        ['Talk to the leaders of the rising', { empire: -2, steel: -1 }],
        ["Withdraw. It's their country", { empire: -3, steel: -1 }],
      ] },
  ];

  // Scale raw sums onto −10…+10 by each axis' maximum reach in this quiz.
  TM.scoreQuiz = function (answers) {
    const raw = Object.fromEntries(TM.AXES.map((k) => [k, 0]));
    const reach = Object.fromEntries(TM.AXES.map((k) => [k, 0]));
    TM.QUIZ.forEach((item, qi) => {
      for (const k of TM.AXES) reach[k] += Math.max(...item.a.map((o) => Math.abs(o[1][k] || 0)));
      const pick = answers[qi];
      if (pick == null) return;
      const fx = item.a[pick][1];
      for (const k of Object.keys(fx)) raw[k] += fx[k];
    });
    const out = {};
    for (const k of TM.AXES) out[k] = TM.clamp(Math.round((raw[k] / (reach[k] || 1)) * 16), -10, 10);
    return out;
  };

  // A one-line "why" for a camp match: the axes where you and the camp lean the same way hardest.
  TM.why = function (axes, camp) {
    const shared = TM.AXES
      .map((k) => ({ k, score: axes[k] * camp.vector[k] }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => {
        const i = TM.AXIS_INFO[x.k];
        return (camp.vector[x.k] > 0 ? i.high : i.low).toLowerCase();
      });
    if (!shared.length) return 'Little in common, but nearer than the rest.';
    const last = shared.pop();
    return 'You share ' + (shared.length ? shared.join(', ') + ' and ' : '') + last + '.';
  };
})();
