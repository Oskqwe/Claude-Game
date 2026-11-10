/* The opening quiz: 22 questions (DESIGN.md §4). Each answer moves one or two axes.
   Axes: order, empire, state, steel, loyalty, temper. */
(function () {
  const TM = (window.TM = window.TM || {});

  TM.QUIZ = [
    { q: 'Your housemaster orders the school indoors on Mafeking night.',
      a: [
        ['March into the town anyway', { loyalty: -2, temper: 2 }],
        ['Obey, and seethe', { loyalty: 1, temper: -1 }],
        ['Obey. He is the Master', { order: 2, loyalty: 2 }],
        ['Organise a deputation to ask him to relent', { order: -1, temper: -1 }],
      ] },
    { q: "A docker's child tells you there is no tea at home.",
      a: [
        ['Give her sixpence', { order: 1, state: -1 }],
        ['Ask why the system allows it', { order: -2, state: 2 }],
        ['Find her father work', { state: 1, temper: -1 }],
        ['It is not your place', { order: 2, state: -2 }],
      ] },
    { q: 'The Whip tells you how to vote on a matter you think wrong.',
      a: [
        ['Vote as told', { loyalty: 3 }],
        ['Abstain quietly', { loyalty: 1, temper: -1 }],
        ['Vote against, and say why in the House', { loyalty: -2, steel: 1 }],
        ['Vote against, and write to the papers', { loyalty: -3, temper: 2 }],
      ] },
    { q: 'A dictator offers peace if a small country gives up a province.',
      a: [
        ['Take it, and rearm in the time it buys', { steel: -1, temper: -1 }],
        ['Refuse, and risk war', { steel: 3, temper: 1 }],
        ['Stall for time', { steel: -2, temper: -2 }],
        ['Ask what the small country wants', { empire: -2, steel: 1 }],
      ] },
    { q: 'You inherit £400 a year.',
      a: [
        ['Leave the Bar and live in the East End', { order: -3, temper: 1 }],
        ['Invest it soundly', { state: -2, temper: -2 }],
        ['Buy a horse and a commission', { empire: 2, temper: 2 }],
        ['Fund a newspaper', { temper: 3, loyalty: -1 }],
      ] },
    { q: 'The pound: back to gold at the old parity, or a managed currency?',
      a: [
        ['Gold, at the old parity. A pound is a pound', { state: -3, order: 1 }],
        ['Gold, but at a lower rate', { state: -1, temper: -1 }],
        ['A managed pound, run for employment', { state: 3 }],
        ['Whatever the Treasury advises', { loyalty: 2, temper: -2 }],
      ] },
    { q: 'A general strike is called. The docks are idle.',
      a: [
        ['Troops to guard the convoys', { order: 3, steel: 2 }],
        ['Let it burn itself out', { steel: -1, temper: -1 }],
        ['Bring owners and men to the same table', { steel: -2, state: 1 }],
        ['Stand with the pickets', { order: -3, loyalty: -1 }],
      ] },
    { q: 'Indian leaders ask for self-government within ten years.',
      a: [
        ['Never. India is the heart of the Empire', { empire: 3, steel: 1 }],
        ['In stages, as the provinces prove themselves', { empire: 1, temper: -1 }],
        ['Yes, and set the date', { empire: -2 }],
        ['Yes, and sooner than they ask', { empire: -3, temper: 1 }],
      ] },
    { q: 'A great railway company is going bankrupt.',
      a: [
        ['Let it fail. That is how markets clear', { state: -3 }],
        ['Lend it public money on strict terms', { state: 1, temper: -1 }],
        ['Take it into public ownership', { state: 3 }],
        ['Merge it with its rivals under a board', { state: 2, order: 1 }],
      ] },
    { q: 'A press lord offers you a weekly column if you soften your line on his pet cause.',
      a: [
        ['Take the column and keep your line', { temper: 2, loyalty: -1 }],
        ['Take the column and soften', { loyalty: 1, steel: -1 }],
        ['Refuse him to his face', { steel: 2, loyalty: -1 }],
        ['Refuse politely and stay friends', { temper: -2 }],
      ] },
    { q: 'There is money for four new battleships, or for raising the school-leaving age.',
      a: [
        ['The battleships', { empire: 2, steel: 2 }],
        ['The schools', { order: -2, state: 2 }],
        ['Two of each', { temper: -2, loyalty: 1 }],
        ['Neither. Cut the income tax', { state: -3, order: 1 }],
      ] },
    { q: 'A friend in your party is caught in a scandal over a lady and a share certificate.',
      a: [
        ['Stand by him in public', { loyalty: -1, temper: 2 }],
        ['Say nothing; let the Whips handle it', { loyalty: 3 }],
        ['Tell him privately to go', { steel: 1, temper: -1 }],
        ['Say he must go, on the record', { loyalty: -3 }],
      ] },
    { q: 'August 1914. War is declared.',
      a: [
        ['Volunteer for the front at once', { steel: 2, temper: 2 }],
        ['Serve where you are most useful, at home', { temper: -2, state: 1 }],
        ['Join an ambulance unit', { steel: -1, order: -1 }],
        ['Speak against the war', { steel: -3, loyalty: -3 }],
      ] },
    { q: 'Ireland asks for Home Rule.',
      a: [
        ['Grant it. They are a nation', { empire: -3 }],
        ['Grant it, but keep Ulster out', { empire: -1, temper: -1 }],
        ['Refuse. The Union is sacred', { empire: 3, order: 1 }],
        ['Refuse, and arm the loyalists', { empire: 2, steel: 2, temper: 1 }],
      ] },
    { q: 'You are called to speak in a great debate with half an hour\'s notice.',
      a: [
        ['Rise and trust to inspiration', { temper: 3 }],
        ['Decline. You have not prepared', { temper: -3 }],
        ['Speak for five minutes, from the facts', { temper: -1, loyalty: 1 }],
        ['Ask to speak tomorrow, and sit up all night writing', { temper: 1, steel: 1 }],
      ] },
    { q: 'Refugees from a tyranny seek entry. Work is scarce at home.',
      a: [
        ['Admit them all', { empire: -2, order: -1 }],
        ['Admit those with sponsors and guarantees', { temper: -2 }],
        ['Admit none until employment recovers', { order: 2, empire: 1 }],
        ['Admit them, and shame other nations into doing the same', { steel: 1, temper: 2 }],
      ] },
    { q: 'A rich man offers to pay your election expenses, with a hint about tariffs.',
      a: [
        ['Accept. Tariffs are sound anyway', { order: 2, empire: 1 }],
        ['Accept, and ignore the hint', { temper: 2, loyalty: -1 }],
        ['Refuse', { order: -1, steel: 1 }],
        ['Refuse, and tell the agent why', { loyalty: -1, order: -2 }],
      ] },
    { q: 'Your party\'s leader is failing, and the country knows it.',
      a: [
        ['Plot to replace him', { loyalty: -2, temper: 2 }],
        ['Stay loyal. The party chose him', { loyalty: 3 }],
        ['Tell him so, to his face', { steel: 2, loyalty: -1 }],
        ['Wait. Leaders fall on their own', { temper: -2 }],
      ] },
    { q: 'Women demand the vote. Some are breaking windows.',
      a: [
        ['Give them the vote, and now', { order: -2, temper: 1 }],
        ['Give it, but not under threat', { steel: 1, loyalty: 1 }],
        ['Refuse. It is not their sphere', { order: 3 }],
        ['Say nothing until the party decides', { loyalty: 2, temper: -1 }],
      ] },
    { q: 'How should a working man be kept in sickness and old age?',
      a: [
        ['By insurance, his own stamp on a card', { state: 1, temper: -1 }],
        ['By the taxes of the rich', { state: 3, order: -2 }],
        ['By private charity and the parish', { state: -3, order: 2 }],
        ['By his friendly society and his union', { state: -1, order: -1 }],
      ] },
    { q: 'Your bank manager writes that you are overdrawn.',
      a: [
        ['Take a company directorship', { order: 1, temper: -1 }],
        ['Write for the papers until it is paid', { temper: 1 }],
        ['Sell the horses and economise', { temper: -2 }],
        ['Borrow more, and back a long shot', { temper: 3 }],
      ] },
    { q: 'A colonial rising. Two British officers are dead.',
      a: [
        ['Send the troops and restore order', { empire: 2, steel: 2 }],
        ['Send the troops, then an inquiry into the grievances', { empire: 1, temper: -1 }],
        ['Negotiate with the leaders', { empire: -2, steel: -1 }],
        ['Withdraw. It is their country', { empire: -3, steel: -1 }],
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
