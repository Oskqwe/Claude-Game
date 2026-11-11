/* The Bulldog — rogue choices of Act II (1911–1918).
     narrows   – sending the Fleet into the Dardanelles again over the First Sea Lord's head (1915).
                 It can win (a fleet off Constantinople; a different 1917 in Russia) or drown.
     sidney    – leading the rush on the house in Sidney Street (1911). Win or lose, the Prime
                 Minister cannot keep such a Home Secretary near the Navy: no Admiralty, no
                 Dardanelles; Ireland instead, through the Curragh and Larne.
     pow-1916  – leading a trench raid from Ploegsteert and being taken: two years a prisoner,
                 Holzminden, and home in time, or not, for the coupon election.
   All three bend history around a life that stays on the record (`world=`). */
(function () {
  const TM = window.TM;
  const D = (chance, text, headline) => ({ chance, text, headline });
  const A = TM.ACTS.bulldog;
  const find = (id) => { for (const n of [1, 2, 3]) { const sc = A[n].scenes.find((x) => x.id === id); if (sc) return sc; } return null; };
  const addIf = (id, term) => { const sc = find(id); if (sc && !(sc.if || '').includes(term)) sc.if = ((sc.if || '') + ' ' + term).trim(); };

  Object.assign(TM.PEOPLE, {
    mckinnon: { name: 'Mr Reginald McKinnon', role: 'Your successor at the Home Office, then First Lord' },
  });

  Object.assign(TM.FORKS, {
    narrows: {
      title: 'The Fleet sent in again', world: true,
      history: 'In March 1915 {full} sent the Fleet into the Dardanelles a second time, over the head of the First Sea Lord.',
      more: [
        { if: '!narrows-won', text: 'The forts, short of heavy shells, fell silent, and the battleships anchored off Constantinople. The Gallipoli landings never took place.' },
        { if: '!narrows-won !straits-international', text: 'The Straits were put under an Allied commission instead of being handed to Russia, and the Russians never forgave it.' },
        { if: '!narrows-won !straits-russia', text: 'Constantinople was handed to Russia, as had been secretly promised.' },
        { if: '!narrows-won !no-october', text: 'Russia, supplied through the open Straits, stayed in the war under its Provisional Government; there was no Bolshevik seizure of power in November 1917.' },
        { if: '!narrows-won ~!no-october', text: 'Even with the Straits open, Russia broke: the Tsar fell in March 1917 and the Bolsheviks took power in November.' },
        { if: '!narrows-lost', text: 'Four more battleships went down in the Narrows with two thousand men, and the man who sent them was dismissed within the week.' },
      ],
      real: 'The Fleet did not go in again after 18 March 1915, when three battleships were sunk by mines. Fisher resigned in May and Churchill was moved out of the Admiralty. The Gallipoli landings of 25 April failed and the peninsula was evacuated by January 1916. Whether the forts were nearly out of ammunition is still argued over by historians.',
    },
    sidney: {
      title: 'The Home Secretary\'s rush', world: true,
      history: 'In January 1911, at Sidney Street, {full} took a rifle and led the rush on the anarchists\' house. Whatever the papers said, the Prime Minister could not trust such a man near the Navy: in the autumn the Admiralty went to Mr McKinnon.',
      more: [
        { if: '!irish-office', text: 'Instead, {full} went to Ireland as Chief Secretary through the Home Rule crisis, the Curragh and the Larne gun-running.' },
        { if: '~!admiralty', text: 'The Dardanelles, when they came, were another man\'s plan.' },
      ],
      real: 'Churchill watched the siege from the corner and let the house burn. In October 1911 he and Reginald McKenna exchanged offices, and Churchill went to the Admiralty, where he stayed until May 1915.',
    },
    'pow-1916': {
      title: 'A prisoner of the Germans', world: true,
      history: 'In the spring of 1916 {full} led a raid from Ploegsteert into the German line and was taken. A Member of Parliament in German hands spent the rest of the war behind wire, while the war\'s direction passed to other men.',
      more: [
        { if: '!holzminden', text: 'In July 1918 {full} went out through the Holzminden tunnel and reached Holland.' },
        { if: '!swiss-interned', text: 'In 1917 {full} accepted internment in Switzerland as an invalid, and was mocked for it at home.' },
      ],
      real: 'Churchill commanded the 6th Royal Scots Fusiliers at Ploegsteert from January to May 1916, went into no man\'s land many times, and was never captured. He went back to politics and became Minister of Munitions in July 1917.',
    },
  });

  /* ── Dardanelles ── */
  const dard = find('dardanelles');
  if (dard) dard.choices.push(
    { label: 'Send the Fleet in again over Fisher\'s head, whatever it costs', effects: 'steel+5 temper+5 @fisher-30 world=narrows',
      roll: { stat: 'steel', diff: 62,
        pass: { effects: '!narrows-won war+12 rep+12 press+10 empire+2', result: 'On 25 March the old battleships go in again behind the minesweepers. Two more are lost. Then the forts fall silent; they have fired their last heavy shells. By evening the Fleet is through, and two days later it lies off the Golden Horn.', diary: 'Through! The forts were empty. Fisher has resigned, and I do not care.' },
        fail: { effects: '!narrows-lost war-8 rep-15 fav-10 office=Backbencher !resigned-1915 -!admiralty', result: 'Four more battleships go down in the Narrows with two thousand men. The forts are still firing at dusk. Fisher resigns and takes the country with him. You are dismissed within the week, the man who drowned a fleet.', diary: 'Four ships. Two thousand men. I sent them. There is nothing to write.' } } });

  /* ── Sidney Street ── */
  const sid = find('sidney-street');
  if (sid) sid.choices.push(
    { label: 'Take a rifle from a Guardsman and lead the rush on the door', effects: 'steel+4 temper+5 order+1 world=sidney !disgraced-1911',
      death: D(0.12, 'You led the rush on the house in Sidney Street with a borrowed rifle. A shot from the upper window killed you on the doorstep. You were thirty-six.', 'Home Secretary shot dead at Stepney'),
      roll: { stat: 'health', diff: 55,
        pass: { effects: 'press+8 rep-4 fav-8 @askwith-12', result: 'You go in with the police behind you. Both men are dead when you reach the top of the stairs. The crowd cheers you out; the Cabinet does not. The Prime Minister tells you, kindly, that a Home Secretary is not a sergeant.', diary: 'Went in. Both dead. The crowd cheered. Askwith did not.' },
        fail: { effects: 'health-25 press+4 rep-6 fav-8 @askwith-10', result: 'A bullet takes you through the thigh on the doorstep, and a constable drags you clear. The house burns. You spend a month in bed reading what the papers say about you, which is everything.', diary: 'Shot in the leg. The house burned. I am a laughing stock with a limp.' } } });

  const fleet = find('fleet-1914'); if (fleet) fleet.if += ' ~!disgraced-1911';

  A[2].scenes.push(
    { id: 'cf-reshuffle-1911', t: 1911.75, year: 1911, title: 'The reshuffle', if: '!disgraced-1911 !mp',
      venue: { plate: 'whitehall', label: 'Downing Street, October 1911' },
      text: 'Agadir has frightened the Cabinet, and the Prime Minister wants a new First Lord to build a naval staff. You wanted the Admiralty more than anything. He has given it to Mr McKinnon and moved McKinnon\'s rival to the Home Office. For you he offers Ireland, where the Home Rule Bill is coming and Ulster is drilling with wooden rifles, or the Duchy of Lancaster, which is nothing at all. He does not mention Sidney Street. He does not have to.',
      basis: 'The Agadir crisis of 1911 and the October 1911 reshuffle in which Asquith moved Churchill to the Admiralty to create a naval war staff.',
      real: 'In October 1911 Churchill and Reginald McKenna exchanged offices: Churchill went to the Admiralty, McKenna to the Home Office. Augustine Birrell remained Chief Secretary for Ireland until 1916.',
      check: 'unchecked', facts: ['reshuffle-1911'],
      choices: [
        { label: 'Take Ireland', effects: 'cap+4 empire-1 office=Chief_Secretary_for_Ireland !irish-office !minister', result: 'You go to the Irish Office, the graveyard of reputations, with a Home Rule Bill to pass and Ulster promising to fight it.', diary: 'Chief Secretary for Ireland. Where careers go to die. We shall see.' },
        { label: 'Take the Duchy and wait', effects: 'loyalty+3 cap-2 office=Chancellor_of_the_Duchy', result: 'You take the sinecure and sit in Cabinet with nothing to do but talk. You talk a great deal.', diary: 'The Duchy. A seat at the table and nothing on my plate.' },
        { label: 'Resign, and say why', effects: 'steel+3 loyalty-5 office=Backbencher fav-6 press+4', result: 'You resign and make a statement the House enjoys too much. The Prime Minister does not answer it.', diary: 'Resigned. The House enjoyed it. I did not.' },
      ] },

    { id: 'cf-curragh-1914', t: 1914.25, year: 1914, title: 'The Curragh', if: '!irish-office !mp',
      venue: { plate: 'whitehall', label: 'The Irish Office, March 1914' },
      text: 'The Home Rule Bill will pass this summer. Ulster has a hundred thousand Volunteers and means to resist. The Army in Ireland has been told to prepare to move on Ulster, and this morning the cavalry officers at the Curragh camp have said they would rather resign than march against the Ulstermen. It is mutiny in everything but name. The Cabinet will look to you. So will Belfast.',
      basis: 'The Curragh incident of 20 March 1914, when cavalry officers said they would resign rather than act against Ulster, and the Larne gun-running of April 1914.',
      real: 'Churchill, at the Admiralty, moved a battle squadron toward Ulster in March 1914, and was accused by the Tories of plotting a pogrom. After the Curragh the Government backed down. In April the Ulster Volunteers landed some 25,000 rifles at Larne.',
      check: 'unchecked', facts: ['curragh-1914'],
      choices: [
        { label: 'Order the troops north and face the mutiny down', effects: 'steel+4 order+2 loyalty-2', roll: { stat: 'capital', diff: 60,
            pass: { effects: 'cap+6 rep+3 press-4', result: 'The officers are given a choice between their orders and their commissions. Most take their orders. The troops go north. Belfast does not fire, yet.', diary: 'Faced it down. The Army obeyed, just. Ulster is watching.' },
            fail: { effects: 'cap-8 rep-6 fav-6', result: 'The War Office gives the officers a written promise that they will not be used against Ulster. The Government is humiliated, and you with it.', diary: 'Humiliated. The Army has a veto now. God help Home Rule.' } } },
        { label: 'Offer Ulster six years out of Home Rule', effects: 'loyalty+2 order-1 @gwynne+4', result: 'You put an exclusion offer to the Ulster leaders. They call it a sentence of death with a stay of execution. But they talk.', diary: 'Offered Ulster six years. They talk. That is something.' },
        { label: 'Watch the sea: stop the guns before they land', effects: 'steel+3 war+2', roll: { stat: 'reputation', diff: 55,
            pass: { effects: 'rep+5 press+4', result: 'The Navy stops a gun-runner off the Antrim coast in April. Twenty thousand rifles go to the bottom of the sea, and Ulster\'s fight goes with them, for now.', diary: 'Stopped the guns at sea. Ulster raging. Quiet, for now.' },
            fail: { effects: 'rep-4', result: 'The guns land at Larne by night, twenty-five thousand rifles, while the police are kept busy elsewhere. Ulster is armed.', diary: 'Larne. The guns are ashore. We were made fools of.' } } },
      ] },
  );

  /* ── Ploegsteert ── */
  const plug = find('ploegsteert');
  if (plug) plug.choices.push(
    { label: 'Lead a raid on the German salient yourself', effects: 'steel+4 temper+4 rep+3',
      death: D(0.12, 'You led a raid into the German line from Ploegsteert in 1916, and did not come back. You were forty-one.', 'Former minister killed in trench raid'),
      roll: { stat: 'health', diff: 55,
        pass: { effects: 'press+5 #brave', result: 'You bring back two prisoners and a machine gun, and every man you took out. The battalion would follow you anywhere now, which is a dangerous thing to know.', diary: 'Raid. Two prisoners, one gun, no losses. The men cheered.' },
        fail: { effects: 'world=pow-1916 !pow-held health-12 office=Prisoner_of_War', result: 'The raid runs into a German working party in the wire. In the fight you are knocked down by a bomb blast, and wake in a German dressing station with a bandaged head and a guard at the door.', diary: '(Written later.) Taken. A Member of Parliament in a German dressing station. They were very pleased with me.' } } });

  A[2].scenes.push(
    { id: 'cf-pow-1917', t: 1917.1, year: 1917, title: 'Behind the wire', if: '!pow-held',
      venue: { plate: 'prison', label: 'An officers\' camp in Germany, 1917' },
      text: 'A year a prisoner. You are in a camp for officers in a converted barracks, with Red Cross parcels, a library, amateur theatricals, and nothing to do but wait. The Germans know who you are and treat you as a prize. Through the Red Cross comes an offer: officers held for eighteen months, or ill, may be interned in neutral Switzerland instead. Your headaches would qualify you. Some in the camp are digging.',
      basis: 'Officer prisoner-of-war camps in Germany, 1916–18, and the Anglo-German agreements under which sick and long-held prisoners were interned in Switzerland.',
      real: 'Churchill was never a prisoner in this war. Sick and wounded prisoners were interned in Switzerland under Red Cross arrangements from 1916, and British and German officers held for long periods were exchanged or interned under the Hague agreements of 1917 and 1918.',
      check: 'unchecked', facts: ['swiss-internment'],
      choices: [
        { label: 'Refuse Switzerland. You will not be a special case', effects: 'steel+2 rep+3 health-4', result: 'You stay with the others. The headaches get worse in the winter. You write a history of the war from the wrong side of it.', diary: 'Refused Switzerland. Stay with the men. The headaches are bad.' },
        { label: 'Accept internment in Switzerland', effects: 'health+10 rep-6 press-4 !swiss-interned', result: 'You spend a year in a hotel at Mürren, under guard by Swiss soldiers who salute you. The papers at home call it the Mürren holiday.', diary: 'Mürren. Snow, bread, newspapers. A holiday, the papers say. It is not.' },
        { label: 'Join the diggers', effects: 'steel+3 temper+2 !digging', result: 'You trade your Red Cross chocolate for a place on the tunnel rota. You are the oldest man in it by fifteen years.', diary: 'Digging. With a spoon, at forty-two. Never been happier.' },
      ] },

    { id: 'cf-holzminden-1918', t: 1918.55, year: 1918, title: 'The tunnel', if: '!pow-held ~!swiss-interned',
      venue: { plate: 'prison', label: 'Holzminden camp, July 1918' },
      text: 'You have been moved to Holzminden, the worst officers\' camp in Germany, with a commandant who hates the British. For nine months men have dug a tunnel from under a staircase, out under the wire, to a field of rye. Tonight it is to be used. Every man who goes will need to walk a hundred and fifty miles to Holland with forged papers. You have a place in the queue. A younger man without one is watching you.',
      basis: 'The Holzminden tunnel escape of 23–24 July 1918, when 29 officers escaped and 10 reached neutral Holland.',
      real: 'The Holzminden tunnel was the largest British escape of the war: 29 officers got out and 10 reached the Netherlands. Churchill, by then Minister of Munitions, was never a prisoner.',
      check: 'unchecked', facts: ['holzminden-1918'],
      choices: [
        { label: 'Go through the tunnel', effects: 'steel+3 health-6',
          death: D(0.06, 'You went out through the Holzminden tunnel in July 1918 and were shot by a frontier guard near the Dutch border. You were forty-three.', 'Member of Parliament killed escaping'),
          roll: { stat: 'health', diff: 55,
            pass: { effects: '-!pow-held !holzminden press+10 rep+8 office=Member_of_Parliament', result: 'Twelve nights of walking by the stars, sleeping in woods, eating raw turnips. On the thirteenth you wade a ditch into Holland. The Dutch give you coffee and the newspapers give you the front page.', diary: 'Holland! Thirteen nights. I have never been so happy or so hungry.' },
            fail: { effects: 'health-8', result: 'You are caught after five days by a gamekeeper and his dog, and returned to Holzminden for six weeks in the cells.', diary: 'Caught by a dog. Back in the cells. Worth it.' } } },
        { label: 'Give your place to the younger man', effects: 'rep+4 loyalty+2 temper-2', result: 'You give him your place and your compass. Three weeks later a postcard comes from Rotterdam with no signature.', diary: 'Gave my place to a boy of twenty. A card from Rotterdam today.' },
        { label: 'Stay, and keep the guards busy while they go', effects: 'steel+2 health-4', result: 'You stage a quarrel in the yard at the right moment. In the morning the Germans find the tunnel and twenty-nine men gone. You do six weeks in the cells, cheerfully.', diary: 'Twenty-nine out. Six weeks in the cells for me. Cheap.' },
      ] },

    { id: 'cf-pow-home-1918', t: 1918.9, year: 1918, title: 'Home from Germany', if: '!pow-held',
      onEnter: '-!pow-held office=Member_of_Parliament',
      venue: { plate: 'city', label: 'Dover, December 1918' },
      text: 'The Armistice has opened the camps, and you come home through Holland on a crowded boat. At Dover there are bands and women with tea. The Prime Minister has called a general election for the fourteenth, a week away, and the coalition has issued its letters of approval to its friends. Nobody has thought to send one to a Member who has been in Germany for two years. Your association has been loyal. It needs you on the platform tomorrow.',
      basis: 'The release of British prisoners after the Armistice of 11 November 1918, and the general election of 14 December 1918, fought on coalition letters of endorsement (the "coupon").',
      real: 'Churchill, Minister of Munitions, was re-elected for Dundee in December 1918 with the coalition coupon, and became Secretary of State for War in January 1919.',
      check: 'unchecked', facts: ['coupon-1918'],
      choices: [
        { label: 'Fight the seat as you are, without the coupon', effects: 'steel+2 health-4', roll: { stat: 'reputation', diff: 45,
            pass: { effects: 'seat+20 rep+4 press+4', result: 'You speak from the platform in your prisoner\'s greatcoat. The town returns you by four thousand. You are the only Member in the new House who has spent the war in a German camp.', diary: 'Returned, in the greatcoat. The only one of us who came back from the cage.' },
            fail: { effects: 'office=None -!mp seat-20', result: 'The couponed candidate wins by three hundred. You have been away too long.', diary: 'Beaten by three hundred and a letter from Downing Street.' } } },
        { label: 'Ask for the coupon', effects: 'loyalty+3', roll: { stat: 'favour', diff: 40,
            pass: { effects: 'seat+15 fav+4', result: 'A letter of endorsement arrives by special messenger, signed by both leaders. You are returned comfortably.', diary: 'The coupon came. Returned. I have been in a cage too long to be proud.' },
            fail: { effects: 'office=None -!mp', result: 'The coupon has gone to another man. You fight anyway, and lose.', diary: 'No coupon. Lost. Home a month and out already.' } } },
        { label: 'Stand down and recover', effects: 'health+12 office=None -!mp', result: 'You stand down and spend the winter in the country learning to sleep through the night.', diary: 'Stood down. Sleeping, mostly. The war is somewhere else now.' },
      ] },
  );
  for (const id of ['influenza-1918', 'arras', 'guards-1918', 'torpedoed', 'farnborough', 'coupon-1918']) addIf(id, '~!pow-held');

  /* ── a different 1915 and 1917 ── */
  A[2].scenes.push(
    { id: 'cf-golden-horn-1915', t: 1915.33, year: 1915, title: 'The Golden Horn', if: '!narrows-won',
      venue: { plate: 'whitehall', label: 'The Admiralty war room, April 1915' },
      text: 'The Fleet lies off Constantinople. The Young Turk government has fled across the Bosphorus to Anatolia, and the city waits for terms. The Russians have been secretly promised Constantinople and the Straits if the war is won, and their ambassador is already measuring the curtains. The French want the Ottoman debt. The Greeks want a share. You have a fleet, a city and perhaps a week to decide what Britain wants.',
      basis: 'The secret Constantinople Agreement of March 1915, promising Russia the city and the Straits; the debate over what forcing the Narrows might have won.',
      real: 'This did not happen. The Fleet never reached Constantinople. The Ottoman Empire fought on until October 1918, and the Bolsheviks published the Constantinople Agreement in 1917.',
      check: 'unchecked', facts: ['constantinople-1915'],
      choices: [
        { label: 'Hand the city to Russia, as promised', effects: 'loyalty+3 empire-1 war+6 !straits-russia', result: 'The Russian flag goes up over the Bosphorus forts. Russia gets her warm-water port and her guns through the Straits, and promises to fight to the end.', diary: 'Constantinople to the Tsar. A promise is a promise. I hope it is a wise one.' },
        { label: 'Put the Straits under an Allied commission', effects: 'empire+2 cap+4 !straits-international', result: 'You insist on an international commission. The Straits are opened to Allied shipping under three flags. Petrograd is furious; Paris is relieved.', diary: 'An international Straits. Nobody happy. That usually means it is right.' },
        { label: 'Offer the Turks easy terms to leave the war at once', effects: 'empire-2 war+8 rep+4 @fisher+5', roll: { stat: 'capital', diff: 50,
            pass: { effects: 'war+4', result: 'The Ottoman government signs an armistice at Mudros in May 1915. Bulgaria stays out of the war. The Balkans breathe.', diary: 'Turkey out of the war. Three years early. Nobody will ever know how many lives.' },
            fail: { effects: 'war-2', result: 'The Turks refuse and fight on from Anatolia. You hold the city and the Straits, and an army is needed to keep them.', diary: 'The Turks will not have it. We hold a city. We need an army.' } } },
      ] },

    { id: 'cf-petrograd-1917', t: 1917.2, year: 1917, title: 'Petrograd', if: '!narrows-won',
      venue: { plate: 'whitehall', label: 'The Admiralty, March 1917' },
      text: 'Two years of guns and shells through the open Straits have kept the Russian army in the field. But there is no bread in Petrograd, the soldiers of the garrison have joined the strikers, and the Tsar has abdicated. A Provisional Government of liberals and moderate socialists has promised to fight on. In Switzerland, a revolutionary named Lenin is asking the Germans for a train. The War Cabinet wants your view.',
      basis: 'The February Revolution and the Tsar\'s abdication in March 1917, the Provisional Government, and Lenin\'s return to Russia through Germany in April 1917.',
      real: 'The Tsar abdicated on 15 March 1917. Lenin crossed Germany in a sealed train and reached Petrograd in April; the Bolsheviks seized power in November. The Straits were closed throughout, and Russia was starved of munitions.',
      check: 'unchecked', facts: ['petrograd-1917'],
      choices: [
        { label: 'Pour everything through the Straits to the new government', effects: 'war+6 state+1', roll: { stat: 'war', diff: 45,
            pass: { effects: '!no-october rep+6', result: 'Ships unload at Odessa round the clock. The Provisional Government survives the summer, and the autumn, and the Bolsheviks\' rising in November is put down in a day.', diary: 'Russia holds. The Bolsheviks are in prison. The war will end in Russia\'s favour, and ours.' },
            fail: { effects: 'war-4', result: 'The guns arrive. The bread does not. In November the Bolsheviks seize the Winter Palace anyway.', diary: 'Guns are not bread. Lenin has Petrograd.' } } },
        { label: 'Ask the Germans not to let Lenin through, through neutral channels', effects: 'cap+2 steel+1', result: 'The Germans ignore you. The sealed train crosses Germany in April.', diary: 'Asked the Kaiser, in effect, to keep his weapon. He kept it.' },
        { label: 'Hold the munitions for France instead', effects: 'war+3 loyalty+2', result: 'The shells go to the Western Front. Russia, starved again, slides toward the second revolution.', diary: 'France first. Russia must manage. I fear it cannot.' },
      ] },
  );
  addIf('russia-1919', '~!no-october');
  addIf('coupon-1918', '~!fork-pow-1916');

  for (const n of [1, 2, 3]) A[n].scenes.sort((a, b) => a.t - b.t);
})();
