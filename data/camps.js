/* The ten camps (DESIGN.md §3–4). All British figures appear under echo names (§9).
   Vectors: order, empire, state, steel, loyalty, temper. */
(function () {
  const TM = (window.TM = window.TM || {});

  TM.AXIS_INFO = {
    order:   { name: 'Order',   low: "The people's cause",            high: 'Property and hierarchy' },
    empire:  { name: 'Empire',  low: 'Self-government for all',       high: 'Imperial destiny' },
    state:   { name: 'State',   low: 'Free market, sound money',      high: 'Planning and public ownership' },
    steel:   { name: 'Steel',   low: 'Conciliation, peace at a price', high: 'Defiance, force if needed' },
    loyalty: { name: 'Loyalty', low: 'Conscience first',              high: 'Party first' },
    temper:  { name: 'Temper',  low: 'Cautious administrator',        high: 'Romantic gambler' },
  };

  const v = (order, empire, state, steel, loyalty, temper) => ({ order, empire, state, steel, loyalty, temper });

  TM.CAMPS = [
    { id: 'bulldog', name: 'The Bulldog', built: true, divergence: 'Drastic',
      vector: v(5, 9, -3, 10, -7, 10),
      line: 'Born to the purple and short of money. Soldier, scribbler, turncoat, and the last man standing when the lights go out.',
      figures: ['Winstan Churchward', 'Brendan Bracknell', 'the Prof (Lindqvist)', 'Desmond Martyn', 'Sir Roger Keys', 'Leo Emery', 'Duff Cowper'] },
    { id: 'major', name: 'The Quiet Major', built: true, divergence: 'Mild to moderate',
      vector: v(-6, -4, 7, 5, 8, -8),
      line: 'A Putney solicitor\'s son who found his faith in a Stepney boys\' club. Says little; outlasts everyone.',
      figures: ['Clement Astley', 'Arthur Greenhalgh', 'James Chilton Eade', 'A. V. Alderman', 'Jim Griffin'] },
    { id: 'business', name: 'The Man of Business', built: false, divergence: 'Drastic',
      vector: v(7, 4, -2, -8, 6, -7),
      line: 'Birmingham metal, a ledger mind, and the conviction that any war can be avoided by a reasonable man.',
      figures: ['Nevil Chambers', 'Viscount Hallifield', 'Sir Samuel Hoad', 'Sir John Simmons', 'Sir Kingsley Ward', 'Sir Horace Wilton'] },
    { id: 'docker', name: 'The Docker', built: true, divergence: 'Moderate',
      vector: v(-7, 2, 6, 8, 7, 1),
      line: 'Farm boy at eleven, drayman at eighteen, master of a million union cards by forty.',
      figures: ['Ernie Bevis', 'George Isaacson', 'Jim Gallagher', 'Jack Lawton', 'George Tomkinson'] },
    { id: 'firebrand', name: 'The Firebrand', built: true, divergence: 'Moderate to drastic',
      vector: v(-10, -7, 9, 3, -9, 8),
      line: 'From the pit and the soapbox. Expelled, reinstated, and building something nobody thought could be built.',
      figures: ['Nye Bowen', 'Manny Shinfield', 'Sydney Silverton', 'Jennie Leigh', 'Michael Footman', 'Woodrow Wyeth'] },
    { id: 'middle', name: 'The Middle Way', built: false, divergence: 'Mild',
      vector: v(2, 1, 4, 6, -2, 1),
      line: 'Guards officer, Somme survivor, and a Tory who has read Keynes and walked the streets of Stockton.',
      figures: ['Harold Macmorran', 'Antony Edgerton', 'Rab Buller', 'Bob Boothroyd', 'Ronald Cartwright', 'Quintin Hoggart', 'Jack Proffitt'] },
    { id: 'planner', name: 'The Planner', built: false, divergence: 'Moderate',
      vector: v(-4, -3, 10, 4, 3, -2),
      line: 'Eton or Winchester, a First, and a slide rule. Socialism as a problem in arithmetic.',
      figures: ['Hugh Dalby', 'Stafford Crisp', 'Hugh Gaskell', 'Douglas Jagger', 'Harold Wilmot', 'Evan Dunbar'] },
    { id: 'pioneer', name: 'The Pioneer', built: true, divergence: 'Moderate',
      vector: v(-7, -5, 6, 3, -4, 5),
      line: 'One of a handful of women in a House of six hundred men, and twice as busy as any of them.',
      figures: ['Ellen Wilkins', 'Eleanor Rathmore', 'Nancy Aster', 'Edith Summerfield', 'Megan Lloyd-Gwynne', 'Mavis Tatton', 'Barbara Carswell', 'Thelma Cazenove-Kerr'] },
    { id: 'machine', name: 'The Machine', built: false, divergence: 'Mild',
      vector: v(4, 2, 0, 0, 10, -6),
      line: 'The Whips\' Office, the lobby, the long memory. You count the votes before anyone casts them.',
      figures: ['David Margrave', 'Herbert Morrow', 'Chips Shannon', 'James Strathearn'] },
    { id: 'mandarin', name: 'The Mandarin', built: false, divergence: 'Mild, behind the scenes',
      vector: v(3, 1, 2, 2, 10, -10),
      line: 'First in the examination, last to leave the room. Ministers come and go; the minutes remain.',
      figures: ['Sir John Anders', 'Sir Edward Brydon', 'Sir Norman Brookfield', 'Sir Alexander Cadell', 'Jock Colvin', 'Sir William Beverley'] },
  ];
})();
