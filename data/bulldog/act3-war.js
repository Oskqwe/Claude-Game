/* The Bulldog — Act III, part 2: 1940–1945. DRAFT.
   Spine: Churchill's war (RESEARCH.md §A, §B). Blended in: Keyes at Combined Operations; Duff Cooper at
   Information and in Singapore; Amery at the India Office over the famine; Lindemann's "dehousing"
   paper and the V-2; Fitzroy Maclean's by-election and mission to Tito.
   Fictional spine (DESIGN §10): "The Peace of 1940" when !peace-1940 is set in May 1940. */
(function () {
  const TM = window.TM;
  const act = TM.ACTS.bulldog[3];
  const D = (chance, text, headline) => ({ chance, text, headline });

  Object.assign(TM.PEOPLE, {
    tito: { name: 'Josip Broz Tito', role: 'Partisan leader, Yugoslavia' },
    moran: { name: 'Your doctor', role: 'Physician' },
  });

  act.scenes.push(
    /* ───────── The Peace of 1940 (invented) ───────── */
    { id: 'lisbon-1940', t: 1940.48, year: 1940, title: 'Lisbon', if: '!peace-1940',
      venue: { plate: 'ballroom', label: 'A villa outside Lisbon, June 1940' },
      text: 'France has fallen. In a villa above the Tagus, British and German envoys have exchanged drafts through the Italians. Britain keeps her fleet, her empire and her independence; Germany keeps everything she has taken in Europe. The army is home from Dunkirk without its guns. The Americans are watching. The terms are on the table, and you must say yes or no.',
      basis: 'Invented. The spine "The Peace of 1940" (DESIGN §10), built on the War Cabinet debate of 26–28 May 1940 and Halifax\'s proposal to sound out Mussolini.',
      real: 'This did not happen. Britain made no approach for terms in 1940. Hitler offered peace in a Reichstag speech on 19 July 1940, and Halifax rejected it publicly on 22 July.',
      check: 'research', facts: ['may-1940'],
      choices: [
        { label: 'Sign, and rearm in the breathing space', effects: 'steel-5 war-20 !peace-signed rep-6', result: 'The peace is signed in Lisbon on a hot afternoon. Church bells ring in some English towns and not in others. In Warsaw, Prague and Paris the news is heard in silence.', diary: 'Peace. I have done the thing I swore I would never do. Now we must use it.' },
        { label: 'Break off the talks and fight on', historical: true, effects: 'steel+5 war+10 -!peace-1940 rep+4', result: 'You break off the talks. The fact that they took place leaks to the Americans, who trust you a little less; but Britain fights on.', diary: 'Broken off. We fight. God forgive me for asking at all.' },
        { label: 'Resign rather than sign', requires: '!minister|!pm|!peer-war', showLocked: true, effects: 'steel+4 loyalty-5 office=Backbencher -!pm -!peer-war -!minister !peace-signed rep+6', result: 'You resign and say why, in the House, to a silence that is half shame and half relief. The peace is signed without you.', diary: 'Resigned. The peace is signed. I am the leader of the war party, and the war party is me.' },
      ] },

    { id: 'peace-1941', t: 1941.48, year: 1941, title: 'Barbarossa', if: '!peace-signed',
      venue: { plate: 'whitehall', label: 'London, June 1941' },
      text: 'A year of uneasy peace. Rationing has eased. The German embassy gives parties again. This morning Germany invaded Russia along a front of a thousand miles. The papers say it is no affair of Britain\'s, and the City is relieved. Secret rearmament goes on in the shadow factories. Moscow is asking, through a frightened ambassador, whether Britain will keep the North Sea closed.',
      basis: 'Invented, within "The Peace of 1940". The German invasion of the Soviet Union on 22 June 1941 is real.',
      real: 'In real history Britain was still at war when Germany invaded the Soviet Union on 22 June 1941. Churchill at once promised Russia Britain\'s support.',
      check: 'research', facts: ['barbarossa'],
      choices: [
        { label: 'Speak for helping Russia, peace or no peace', effects: 'steel+3 loyalty-3 press+4 @astley+4', result: 'You say in the House that Britain cannot watch Europe enslaved in two halves. The Government calls it warmongering. The country starts to listen.', diary: 'Said it. Help Russia. They call me a warmonger again. Good.' },
        { label: 'Push the shadow factories harder, quietly', effects: 'war+8 cap+3', result: 'You work on the factories and the airfields, and say nothing in public.', diary: 'Factories. Airfields. Silence. When it comes again, we will be readier.' },
        { label: 'Keep the peace: it is not our war', effects: 'steel-3 loyalty+3 war-4', result: 'You stay silent while the Germans drive on Moscow.', diary: 'Silent. The Germans are at Smolensk. I do not sleep well.' },
      ] },

    { id: 'peace-1942', t: 1942.3, year: 1942, title: 'The government of resistance', if: '!peace-signed',
      venue: { plate: 'club', label: 'A house in Mayfair, spring 1942' },
      text: 'America is at war with Japan and Germany after Pearl Harbor. Britain alone of the great powers is at peace. A group of Members, generals and newspaper owners, the "King\'s party" some call it, wants a government of resistance to take Britain back into the war beside the Americans. They want you to lead it. It would mean breaking a treaty Britain signed.',
      basis: 'Invented, within "The Peace of 1940" (DESIGN §10: "a King\'s party pressing for a government of resistance").',
      real: 'This did not happen. Britain had been at war continuously since 1939; after Pearl Harbor in December 1941 Germany declared war on the United States.',
      check: 'research', facts: ['may-1940'],
      choices: [
        { label: 'Lead it, and take Britain back into the war', effects: 'steel+5 war+15 -!peace-signed !peace-ends office=Prime_Minister !pm !was-pm cap+10', roll: { stat: 'reputation', diff: 55,
            pass: { effects: 'rep+8', result: 'The Government falls in a weekend. You go to the Palace. Within the month British ships are back in the Atlantic beside the Americans.', diary: 'Prime Minister. At war again, with the Americans beside us. Two lost years.' },
            fail: { effects: 'rep-6 office=Backbencher -!pm !peace-signed', result: 'The coup fails in the division lobby by eleven votes. The peace holds, and you are a pariah.', diary: 'Beaten by eleven. The peace holds. I am finished, unless they come for us.' } } },
        { label: 'Refuse: a treaty is a treaty', effects: 'loyalty+4 steel-3 !long-peace', result: 'You refuse, and the group falls apart. Britain stays at peace while the world goes to war around her.', diary: 'Refused. Britain keeps her word, and her peace, and loses something larger.' },
        { label: 'Press for war through the House, openly', effects: 'loyalty-2 press+4', roll: { stat: 'capital', diff: 55,
            pass: { effects: '-!peace-signed !peace-ends war+12', result: 'The House votes for war by a majority of forty. The treaty is denounced. You are given the Admiralty, for the third time.', diary: 'The House has voted. We are at war again, and honestly.' },
            fail: { effects: '!long-peace', result: 'The House votes you down. Britain stays at peace.', diary: 'Voted down. Peace it is. God help Europe.' } } },
      ] },

    /* ───────── The war ───────── */
    { id: 'oran', t: 1940.52, year: 1940, title: 'The French fleet', if: '!pm|!peer-war ~!peace-signed',
      venue: { plate: 'whitehall', label: 'The Cabinet Room, July 1940' },
      text: 'France has signed an armistice. Her fleet, the fourth largest in the world, lies at Oran and Mers-el-Kébir, and the Germans may seize it. Admiral Somerville has orders ready: the French must join you, sail to a British or American port, scuttle, or be sunk. The French were your allies a fortnight ago. You must decide whether to give the order.',
      basis: 'Mers-el-Kébir, 3 July 1940: the British attack on the French fleet at Oran.',
      real: 'Churchill ordered the attack. Somerville\'s force opened fire on 3 July 1940; 1,297 French servicemen were killed. The House cheered Churchill when he reported it, and the world took note that Britain would fight.',
      check: 'unchecked', facts: ['mers-el-kebir'],
      choices: [
        { label: 'Give the order', historical: true, effects: 'steel+5 war+6 rep+3 @astley+4', result: 'The French refuse. Somerville opens fire. Thirteen hundred French sailors die. When you tell the House, it rises and cheers, and you sit with tears on your face.', diary: 'Oran. We have fired on our allies. The House cheered. I wept.' },
        { label: 'Give the French more time', effects: 'steel-2 war-2', roll: { stat: 'temper', diff: 50,
            pass: { effects: 'war+3', result: 'The extra day is enough. The French admiral sails for Martinique and disarms there.', diary: 'They sailed for Martinique. No blood. Thank God.' },
            fail: { effects: 'war-6', result: 'Two French battleships slip away to Toulon in the night, and the Germans may have them.', diary: 'The battleships got out. We hesitated. We will pay.' } } },
        { label: 'Leave the fleet alone and trust Darlan\'s word', effects: 'steel-4 war-5', result: 'You trust the French admiral\'s promise that the fleet will never be German. In the end he keeps it, at Toulon in 1942. In between, the world thinks Britain soft.', diary: 'Trusted Darlan. The Americans think we are finished.' },
      ] },

    { id: 'blitz-roof', t: 1940.7, year: 1940, title: 'On the roof', if: '~!peace-signed',
      venue: { plate: 'city', label: 'A Whitehall roof, September 1940' },
      text: 'The Blitz. Every night since September the bombers have come up the Thames. Tonight the docks are burning again and the sky over the City is orange. The shelter is below, where your staff want you. The roof is above, where you can see everything. A stick of bombs walks across St James\'s Park towards you, one, two, three.',
      basis: 'Churchill\'s habit of watching air raids from the roofs of Whitehall during the Blitz.',
      real: 'During the Blitz Churchill often went up to the roof of the Annexe or the Air Ministry to watch raids, against the pleading of his staff. Downing Street was damaged by bombs in October 1940.',
      check: 'unchecked', facts: ['blitz-roof'],
      choices: [
        { label: 'Stay on the roof', historical: true, effects: 'steel+2 temper+2 health-2 rep+2', death: D(0.02, 'A bomb fell closer than the others, in the autumn of 1940. You died on a Whitehall roof, watching London burn.', 'Death in the Blitz'), result: 'The bombs pass over you and land in the Park. You come down with plaster in your hair and something to say on the wireless.', diary: 'On the roof again. Close. London is burning, and London is laughing.' },
        { label: 'Go down to the shelter', effects: 'temper-2 health+2', result: 'You go down and work through the raid by electric light, while the building shakes.', diary: 'Below ground. Prudent. The building shook all night.' },
        { label: 'Go out to the burning docks', effects: 'steel+2 press+6 health-4', death: D(0.025, 'You died in the East End in the Blitz, among the people you had gone to see.', 'Death in the Blitz'), result: 'You go to Poplar in the morning. A woman in the ruins of her house cries that they can take it. You cry too.', diary: 'The docks. A woman said they can take it. I believe her.' },
      ] },

    { id: 'carlton-bombed', t: 1940.79, year: 1940, title: 'The Carlton', if: '!mp ~!peace-signed',
      venue: { plate: 'club', label: 'The Carlton Club, 14 October 1940' },
      text: 'You are dining at the Carlton when the bomb falls. The front of the building comes down into Pall Mall, the lights go out, and the dining room fills with dust. Nobody seems to be killed. The Chief Whip is somewhere under a heap of plaster, and an old man, a former Lord Chancellor, is being carried out by his son. The club will never be here again.',
      basis: 'The bombing of the Carlton Club, 14 October 1940, during dinner; Margesson was among those inside, and Quintin Hogg carried his father, Lord Hailsham, out.',
      real: 'The Carlton Club in Pall Mall was wrecked by a bomb on 14 October 1940 while about 120 members and staff were inside; no one was killed. The club moved to St James\'s Street. Margesson, the Chief Whip, was bombed out of his rooms there.',
      check: 'unchecked', facts: ['carlton-1940', 'machine-carlton-bomb'],
      choices: [
        { label: 'Help dig out the Chief Whip', effects: 'loyalty+3 @margrave+12 health-3', result: 'You find him under the plaster, with his eyebrows singed and his dignity intact. He says, very formally, that he is obliged to you.', diary: 'Dug Margrave out of the Carlton. He thanked me in the voice he uses for a division.' },
        { label: 'See to the waiters first', effects: 'order-2 rep+3 health-3', result: 'You go to the kitchens, where the staff are trapped, and help bring out a boy of fifteen with a broken arm.', diary: 'Got the kitchen boy out. The members can dig themselves out.' },
        { label: 'Finish the claret', effects: 'temper+2 press+2', result: 'You finish your glass in the dark. The story is all over London by morning, and is never quite the same twice.', diary: 'Finished the claret. One has standards.' },
      ] },

    { id: 'information-1941', t: 1941.2, year: 1941, title: 'What the public may know', if: '!info ~!peace-signed',
      venue: { plate: 'whitehall', label: 'Senate House, the Ministry of Information' },
      text: 'Your ministry is in the tallest building in London, and every newspaper in Fleet Street hates it. Last night Coventry, or somewhere like it, was flattened; the Air Ministry wants it reported as "a Midlands town" and the casualties kept quiet. Your social survey people are knocking on doors to measure morale, and the papers call them snoopers. What do you let the public know?',
      basis: 'Duff Cooper as Minister of Information, 1940–41: censorship of bomb damage, and the Home Intelligence morale surveys mocked as "Cooper\'s snoopers".',
      real: 'Duff Cooper was Minister of Information from May 1940 to July 1941. The ministry\'s morale surveys were attacked in the press as "Cooper\'s Snoopers", and he was moved on in 1941.',
      check: 'unchecked', facts: ['coopers-snoopers'],
      choices: [
        { label: 'Name the city and the dead', effects: 'order-2 press+8 fav-4', result: 'You publish. The Air Ministry is furious. The public, told the truth, takes it better than anyone expected.', diary: 'Named Coventry. Told the truth. Morale rose. Remarkable.' },
        { label: 'Keep it vague, as the Air Ministry asks', effects: 'loyalty+3 press-4', result: '"A Midlands town." The papers print it, and everyone in the Midlands knows which.', diary: '"A Midlands town." Everyone knows. Nobody says. That is censorship.' },
        { label: 'Stop the morale surveys', effects: 'press+4 cap-2', result: 'You stop the snoopers. Fleet Street calls it a victory. You know rather less about the country than you did.', diary: 'Stopped the surveys. The press is pleased. I am now blind as well as deaf.' },
      ] },

    { id: 'combined-ops', t: 1941.75, year: 1941, title: 'Raids', if: '!combined-ops ~!peace-signed',
      venue: { plate: 'frontier', label: 'Combined Operations Headquarters, 1941' },
      text: 'You have trained commandos for a year and been allowed to use them twice. The Chiefs of Staff think raids a waste of ships, and you think the Chiefs of Staff a waste of time. You have a plan to seize an island off Italy and another to land in Norway. You have been writing rude letters to the Prime Minister about the Chiefs. They have been writing about you.',
      basis: 'Keyes as the first Director of Combined Operations, June 1940 to October 1941; his quarrels with the Chiefs of Staff and his removal.',
      real: 'Keyes was Director of Combined Operations from July 1940 until October 1941, when Churchill replaced him with Lord Louis Mountbatten after Keyes\'s quarrels with the Chiefs of Staff.',
      check: 'research', facts: ['keyes-combined'],
      choices: [
        { label: 'Fight the Chiefs to the end', historical: true, effects: 'steel+3 loyalty-4 office=Backbencher -!minister', result: 'You fight them in memoranda and lose. In October you are replaced by a younger man with royal connections. You go back to the House to make speeches about the higher direction of the war.', diary: 'Sacked. Replaced by a cousin of the King. I will tell the House what I think of the Chiefs.' },
        { label: 'Make peace with the Chiefs and get one raid', effects: 'loyalty+3 cap+3', roll: { stat: 'temper', diff: 50,
            pass: { effects: 'rep+6 war+3', result: 'They give you one raid, on the Lofoten Islands. It is a success: fish-oil factories burned, prisoners taken, and Norwegians brought home to fight.', diary: 'Lofoten! Fish oil, prisoners, volunteers. A raid that worked.' },
            fail: { effects: 'rep-3', result: 'The raid is cancelled twice, then carried out half-heartedly. Nothing is achieved.', diary: 'The raid achieved nothing. The Chiefs are pleased.' } } },
        { label: 'Go on the raid yourself', effects: 'steel+4 temper+3', death: D(0.04, 'You were killed going ashore with the commandos, at sixty-seven, against all advice.', 'Admiral killed on commando raid'), result: 'You go ashore with the second wave at sixty-seven and come back with a German flag. The Chiefs think you mad. The commandos would follow you anywhere.', diary: 'Went in with them. Came back. The young men cheered.' },
      ] },

    { id: 'lancaster-1941', t: 1941.8, year: 1941, title: 'The serving officer', if: '~!mp ~!long-peace',
      venue: { plate: 'mill', label: 'A Lancashire town, October 1941' },
      text: 'A Conservative Member has died, and under the truce his party names his successor. The local association wants a man in uniform. You are a serving officer, home on leave, with a good record and a reputation for doing odd things in odd places. Taking the seat would not take you out of the Army; it might give the Army a voice.',
      basis: 'Fitzroy Maclean, elected for Lancaster at a by-election in October 1941 while a serving soldier, after resigning from the Diplomatic Service to enlist as a private.',
      real: 'Maclean resigned from the Diplomatic Service in 1939 to enlist, was elected for Lancaster in October 1941, and went on to serve with the SAS and lead the mission to Tito in 1943.',
      check: 'research', facts: ['maclean-lancaster'],
      choices: [
        { label: 'Take the seat and stay in the Army', historical: true, effects: 'seat+40 cap+4 office=Member_of_Parliament !mp !lancaster', result: 'You are returned unopposed, make one speech, and go back to the desert.', diary: 'A Member and a soldier. The House saw me once.' },
        { label: 'Take the seat and come home', effects: 'seat+40 cap+6 loyalty+2 office=Member_of_Parliament !mp', result: 'You take the seat and a job at the War Office.', diary: 'A Member. A desk. Safe, and restless.' },
        { label: 'Refuse. The war first', effects: 'steel+2 rep+2', result: 'You stay in the Army and go back to the Middle East.', diary: 'Refused the seat. Politics after the war.' },
      ] },

    { id: 'white-house', t: 1941.98, year: 1941, title: 'The White House, Christmas', if: '!pm ~!peace-signed',
      venue: { plate: 'newyork', label: 'The White House, December 1941' },
      text: 'America is in the war at last. You have crossed the Atlantic in a battleship to plan it with the President, and you are staying at the White House. Last night, trying to open a stuck window, you felt a pain down your left arm and could not breathe. Your doctor has listened to your chest and gone very quiet. Tomorrow you are to address Congress.',
      basis: 'Churchill\'s mild heart attack at the White House on 26 December 1941, which his doctor, Sir Charles Wilson, concealed.',
      real: 'Churchill had a mild heart attack at the White House on 26 December 1941. His doctor kept it secret, judging that the news would do more harm than the illness. Churchill went on with his programme, including speaking to Congress.',
      check: 'research', facts: ['heart-1941'],
      choices: [
        { label: 'Tell no one and go on', historical: true, effects: 'health-8 steel+2 @moran+10', death: D(0.025, 'Your heart failed in Washington at the end of 1941, on the eve of the grand alliance. You were sixty-seven.', 'Prime Minister dies in Washington'), result: 'You go on. You address Congress, which roars, and fly to Ottawa. Nobody knows, and the alliance is made.', diary: 'A pain in the arm. Wilson says nothing. Nor shall I. Congress cheered.' },
        { label: 'Rest for a week and let it be known', effects: 'health+4 press-4 rep-3', result: 'The news that you are unwell goes round the world. Berlin is delighted. You rest and recover.', diary: 'Rested. Berlin rejoiced. I am better.' },
        { label: 'Hand over the talks to your Chiefs of Staff', effects: 'health+2 cap-3', result: 'You let the soldiers plan with the Americans. They agree on more than you would have, and less than you wanted.', diary: 'The Chiefs did the talking. Not bad. Not mine.' },
      ] },

    { id: 'singapore-duff', t: 1942.1, year: 1942, title: 'Singapore', if: '!route-fo ~!pm ~!peace-signed !mp',
      venue: { plate: 'india', label: 'Singapore, January 1942' },
      text: 'You were sent to Singapore as Resident Minister to coordinate the Far East, and found a colony that refused to believe in the war. The Japanese have come down the Malay peninsula in six weeks. The Governor will not order slit trenches dug on the golf course. You have been recalled. The last ships are leaving, and the Governor is asking whether you will stay.',
      basis: 'Duff Cooper as Resident Cabinet Minister in Singapore, 1941–42, his clashes with Governor Shenton Thomas, and his recall before the fall.',
      real: 'Duff Cooper was sent to Singapore in 1941 as Minister Resident. Both the military and civil authorities were reluctant to cooperate with him. He returned to Britain before Singapore surrendered on 15 February 1942, and was blamed by some for its fall.',
      check: 'unchecked', facts: ['duff-singapore'],
      choices: [
        { label: 'Obey the recall', historical: true, effects: 'loyalty+3 rep-3', result: 'You leave on one of the last flights out. Singapore falls a month later. Your report on the Governor is read in London and filed.', diary: 'Left Singapore. It will fall. I said so, in writing, for all the good it did.' },
        { label: 'Stay and see it through', effects: 'steel+4 rep+4 health-10 !captured-1942', death: D(0.12, 'You stayed in Singapore and died in a Japanese camp. You were sixty-seven.', 'Former minister dies in Japanese captivity'), result: 'You stay. When the city surrenders you are taken into the camps with the rest. You survive, thinner, and come home in 1945.', diary: 'Changi. Thinner. Alive. The diary was kept on cigarette papers.' },
        { label: 'Take over civil defence yourself before you go', effects: 'cap+3 rep+2 fav-3', result: 'In your last week you order the trenches dug and the hospitals moved. It saves some lives. The Governor complains to London.', diary: 'Dug the trenches myself, in effect. The Governor has complained.' },
      ] },

    { id: 'dehousing', t: 1942.25, year: 1942, title: 'The Prof\'s paper', if: '!pm|!peer-war ~!peace-signed',
      venue: { plate: 'whitehall', label: 'Downing Street, March 1942' },
      text: 'The Prof has sent you a minute of two pages. Bombing the factories has failed, because the bombers cannot find them at night. Instead, he argues, bomb the working-class districts of fifty German cities: by mid-1943 a third of the German people could be "dehoused", and their will broken. The figures are his. Some scientists think them wildly wrong. The new head of Bomber Command agrees with him.',
      basis: 'Lindemann\'s "dehousing" paper of 30 March 1942, which supported area bombing of German cities.',
      real: 'Lindemann\'s minute of 30 March 1942 argued for bombing German working-class housing. Tizard and Blackett disputed his figures. The policy of area bombing, already adopted in February 1942, went ahead under Harris. Hundreds of thousands of German civilians were killed by 1945.',
      check: 'research', facts: ['dehousing'],
      choices: [
        { label: 'Endorse it', historical: true, effects: 'steel+4 war+5 @prof+8 #area-bombing', result: 'The bombers go to the cities. Within a year Hamburg burns in a firestorm that kills tens of thousands in a night. The war is shortened, or it is not; you will never be sure.', diary: 'Approved the Prof\'s paper. The bombers go to the cities. I do not sleep well.' },
        { label: 'Ask Tisdale and the other scientists to check the figures', effects: 'cap+3 @prof-6', result: 'They find the Prof\'s estimates six times too high. You approve the bombing anyway, more cautiously, and with fewer illusions.', diary: 'The figures were wrong. The bombing goes ahead. That is war.' },
        { label: 'Keep the bombers on industry and the U-boats', effects: 'steel-2 war+3 @prof-10', result: 'You divert squadrons to Coastal Command. The Atlantic is won a little sooner. The German cities are spared a little longer.', diary: 'Bombers to the Atlantic. The Prof sulks. The convoys get through.' },
      ] },

    { id: 'censure-1942', t: 1942.5, year: 1942, title: 'The censure motion', if: '!mp ~!peace-signed',
      venue: { plate: 'gallery', label: 'The House of Commons, July 1942' },
      doc: { type: 'division', title: 'Motion of No Confidence in the Central Direction of the War, 2 July 1942', ayes: 25, noes: 475, note: 'Motion rejected by 450.' },
      text: 'Singapore has fallen, and now Tobruk, with thirty thousand men. A senior Tory has moved a vote of no confidence in the central direction of the war. Sir Roger Keys has seconded it, and promptly said the Prime Minister should have more power, not less. Nye Bowen is savage. The House is angry, frightened and loyal all at once, and wants someone to blame.',
      basis: 'The censure motion of 1–2 July 1942 after the fall of Tobruk, moved by Sir John Wardlaw-Milne and seconded by Keyes.',
      real: 'The motion was defeated by 475 to 25 (Jenkins gives 477 to 27). The mover proposed the Duke of Gloucester as Commander-in-Chief, to laughter, and Keyes, seconding, argued for giving Churchill more power. Bevan attacked the Government fiercely.',
      check: 'research', facts: ['censure-1942'],
      choices: [
        { label: 'Answer the debate as Prime Minister', requires: '!pm', showLocked: true, historical: true, effects: 'cap+6 rep+3 fav+6', result: 'You admit the disasters, take the blame, and ask for the vote. The House gives it to you by 475 to 25.', diary: 'Four hundred and seventy-five to twenty-five. They are angry, and they are mine.' },
        { label: 'Vote for the censure', requires: '~!pm', effects: 'steel+2 loyalty-5 press+3', result: 'You vote with the twenty-five. Your friends think you have lost your judgment, and your enemies are delighted.', diary: 'One of the twenty-five. Someone had to say it.' },
        { label: 'Speak against the censure and for more power at the top', requires: '~!pm', effects: 'loyalty+3 cap+3 fav+4', result: 'You speak for the Government. It is the speech everybody quotes the next day.', diary: 'Spoke for the PM. The House liked it.' },
        { label: 'Abstain and demand changes in the high command', effects: 'loyalty-2 cap+2', result: 'You abstain, and the next month there is a new commander in the desert. You think you helped.', diary: 'Abstained. A new general in the desert. Good.' },
      ] },

    { id: 'beveridge-1943', t: 1943.12, year: 1943, title: 'The Beverley Report', if: '!mp ~!peace-signed',
      venue: { plate: 'gallery', label: 'The House of Commons, February 1943' },
      text: 'Sir William Beverley\'s report on social insurance, cradle to grave, has sold half a million copies. The Treasury calls it unaffordable. Labour wants it now; ninety-seven of them are going to vote against their own ministers. Young Tories of the Reform Committee want it now too. The Government will promise to study it after the war. Where do you stand?',
      basis: 'The Beveridge Report (December 1942) and the Commons debate of February 1943; Kingsley Wood\'s opposition; the Tory Reform Committee; Churchill\'s March 1943 broadcast offering a four-year plan.',
      real: 'In February 1943 the Government declined to implement Beveridge at once; 97 Labour MPs and others voted against it, and the amendment was lost 335 to 119. Churchill\'s broadcast of March 1943 promised a four-year plan after the war.',
      check: 'research', facts: ['beveridge-1943'],
      choices: [
        { label: 'A four-year plan, after victory', historical: true, effects: 'state+1 reform-2 loyalty+2 @astley-4', result: 'You broadcast a plan for after the war: insurance, health, housing, but no promises you cannot keep in wartime. It is wise, and the voters will remember it as reluctance.', diary: 'Four-year plan, after the war. Sound. Possibly fatal.' },
        { label: 'Implement it now, at once', effects: 'state+4 reform+8 fav-6 !beverley-day', result: 'You throw your weight behind the report. The Treasury fights you all spring. A Ministry of Social Security is set up in wartime.', diary: 'Beverley now. The Treasury is in revolt. The country is with us.' },
        { label: 'Call it a fraud the country cannot afford', effects: 'state-4 reform-4 order+2 press-6', result: 'You speak against it as dangerous nonsense. The Treasury is grateful. The country is not.', diary: 'Attacked Beverley. The Treasury thanks me. The country will not.' },
      ] },

    { id: 'pneumonia-1943', t: 1943.15, year: 1943, title: 'Pneumonia', if: '!pm ~!peace-signed',
      venue: { plate: 'sickroom', label: 'The Annexe, February 1943' },
      text: 'You came back from Casablanca and Turkey with a cold that has gone to your lungs. You are sixty-eight. The doctors want you in bed for a fortnight and no cigars. The war will not wait: there are papers in boxes all over the bed, and the Cabinet is meeting downstairs without you. Your temperature this morning was a hundred and two.',
      basis: 'Churchill\'s pneumonia in February 1943, after the Casablanca conference.',
      real: 'Churchill had pneumonia in February 1943 and was treated with a sulphonamide drug. He read Moll Flanders while recovering and was working from bed throughout.',
      check: 'research', facts: ['pneumonia-1943'],
      choices: [
        { label: 'Work from bed', historical: true, effects: 'health-8', death: D(0.03, 'The pneumonia of 1943 was too much at sixty-eight. You died in February, with the boxes still on the bed.', 'Death of the Prime Minister'), result: 'You work from bed with a temperature, a novel and the boxes. You recover in three weeks.', diary: 'Pneumonia. Boxes. Moll Flanders. Better.' },
        { label: 'Go on to the next conference anyway', effects: 'health-14 steel+2', death: D(0.06, 'You flew to North Africa with pneumonia in 1943, and did not come back. You were sixty-eight.', 'Death of the Prime Minister'), result: 'You fly to Algiers against every medical opinion. You survive it, and so does the alliance.', diary: 'Flew with a fever. Survived. The doctors have given up on me.' },
        { label: 'Do as the doctors say', effects: 'health+4 cap-3', death: D(0.01, 'Even rest could not save you in February 1943. You were sixty-eight.', 'Death of the Prime Minister'), result: 'You rest, properly, for a fortnight. The Cabinet manages. You are a little hurt that it does.', diary: 'Rested. They managed without me. Humiliating.' },
      ] },

    { id: 'bengal-1943', t: 1943.6, year: 1943, title: 'Bengal', if: '!pm|!india-office|!peer-war ~!peace-signed',
      venue: { plate: 'india', label: 'Whitehall, August 1943' },
      text: 'There is famine in Bengal. Burma rice has been lost to the Japanese, a cyclone wrecked the crops, prices have doubled and doubled again, and people are dying in the streets of Calcutta. The Viceroy asks for grain and ships. The ships are needed for the war; the Prof says the shipping figures do not allow it. The India Secretary has been pleading for months. You must decide.',
      basis: 'The Bengal famine of 1943; Amery\'s pleas for relief and his clashes with Churchill; Lindemann\'s advice against diverting shipping; the War Cabinet decisions of August 1943.',
      real: 'About three million people died in the Bengal famine. Amery, as India Secretary, pressed repeatedly for grain imports and was overruled on grain in August 1943. Lindemann advised against diverting shipping. Wavell became Viceroy in October 1943 and organised relief through the army. The causes and responsibility are still argued over.',
      check: 'research', facts: ['bengal-1943'],
      choices: [
        { label: 'Send the ships and the grain', effects: 'empire-1 war-4 rep+4 @prof-6 @emery+10', result: 'You divert ships from the Mediterranean and order grain from Australia. It arrives in October and November. Hundreds of thousands still die, but fewer than would have.', diary: 'Ships to Bengal. The Mediterranean must wait. It was the right thing, and late.' },
        { label: 'Keep the ships for the war; ask India to manage', historical: true, effects: 'empire+2 war+3 rep-6 @emery-12', result: 'The ships stay in the war. Some grain goes, much less than was asked. In Bengal, about three million people die.', diary: 'The ships stay. The Viceroy\'s telegrams are terrible. I do not read them all.' },
        { label: 'Send a new Viceroy with orders to use the army for relief', effects: 'cap+3 rep+2', result: 'A soldier goes out as Viceroy and puts the army to moving food. It works, too slowly for many.', diary: 'A soldier Viceroy, with lorries. Better late.' },
      ] },

    { id: 'tito-1943', t: 1943.7, year: 1943, title: 'The mission to Tito', if: '!lancaster ~!peace-signed',
      venue: { plate: 'frontier', label: 'The mountains of Bosnia, September 1943' },
      text: 'You have been dropped by parachute into Yugoslavia to find out who is really fighting the Germans: the royalist Chetniks or the Communist Partisans. Their leader, a man called Tito, is in a cave in the mountains, and the Germans are hunting him with whole divisions. London wants your report. Whatever you say will decide who rules Yugoslavia after the war.',
      basis: 'Fitzroy Maclean\'s mission to Tito, from September 1943, and his report recommending support for the Partisans.',
      real: 'Maclean parachuted into Yugoslavia in September 1943 and reported that the Partisans were fighting the Germans far more effectively than the Chetniks. Churchill switched support to Tito. Maclean, asking whether it mattered that Tito would make Yugoslavia Communist, was told by Churchill that neither of them was going to live there.',
      check: 'research', facts: ['maclean-lancaster'],
      choices: [
        { label: 'Report for Tito: he is killing Germans', historical: true, effects: 'steel+2 cap+6 rep+4 @tito+15', result: 'Your report goes to the Prime Minister and is acted on. Britain backs the Partisans. You ask whether it matters that Tito is a Communist, and are told that neither of you is going to live there.', diary: 'Backed Tito. He fights. What comes after is another war.' },
        { label: 'Report for the King\'s men', effects: 'order+3 @tito-15', result: 'You report that the royalists must not be abandoned. London listens, then reads the intercepts, and backs Tito anyway.', diary: 'Backed the King. Overruled by the codebreakers.' },
        { label: 'Report both, and let London decide', effects: 'loyalty+2 cap+2', result: 'Your report is fair and therefore useless. London decides on the intercepts.', diary: 'A fair report. Nobody read it.' },
      ] },

    { id: 'v-weapons', t: 1944.5, year: 1944, title: 'The rocket', if: '!pm|@prof>20 ~!peace-signed',
      venue: { plate: 'whitehall', label: 'A Cabinet committee, 1944' },
      text: 'Photographs from Peenemünde show something on a trailer, thirty-five feet long. The intelligence men say it is a rocket that could carry a ton of explosive to London with no warning at all. The Prof says such a rocket is impossible with any known fuel, and that this is a hoax to divert the bombers. He has been right before, and wrong.',
      basis: 'Lindemann\'s scepticism about the V-2 rocket, 1943–44.',
      real: 'Lindemann doubted that the Germans could build a long-range liquid-fuelled rocket and called it a hoax. Peenemünde was bombed in August 1943. The V-2 offensive began in September 1944 and killed about 2,700 people in London.',
      check: 'research', facts: ['v2-hoax'],
      choices: [
        { label: 'Believe the photographs: bomb Peenemünde', effects: 'war+4 @prof-6 cap+2', result: 'The bombers go to Peenemünde and set the programme back by months. When the rockets come, they come later and fewer.', diary: 'Bombed the rocket works. The Prof says it was a waste. It was not.' },
        { label: 'Back the Prof', effects: '@prof+6 war-3', result: 'You back the Prof. In September the first rocket falls on Chiswick without a sound before the bang.', diary: 'The Prof was wrong. A rocket at Chiswick. No warning at all.' },
        { label: 'Bomb it, and say nothing to the Prof', effects: 'war+3 cap+1', result: 'You order the raid quietly. The Prof finds out, of course.', diary: 'Bombed Peenemünde. The Prof is offended. The rockets are late.' },
      ] },

    { id: 'percentages', t: 1944.78, year: 1944, title: 'The half-sheet of paper', if: '!pm ~!peace-signed',
      venue: { plate: 'ballroom', label: 'The Kremlin, October 1944' },
      text: 'Moscow, late at night. The Red Army is in Romania and Bulgaria. You have pushed a half-sheet of paper across the table to Stalin with figures on it: Romania, ninety per cent Russian; Greece, ninety per cent British; Yugoslavia and Hungary, fifty-fifty. He looks at it, ticks it with a blue pencil, and pushes it back. Poland is not on the paper.',
      basis: 'The "percentages agreement" between Churchill and Stalin in Moscow, 9 October 1944.',
      real: 'Churchill and Stalin agreed spheres of influence on a half-sheet of paper in Moscow in October 1944. Stalin ticked it. Churchill reportedly suggested burning it lest they seem cynical; Stalin told him to keep it. Stalin largely kept to the Greek part; Poland was settled at Yalta.',
      check: 'research', facts: ['percentages'],
      choices: [
        { label: 'Keep the paper', historical: true, effects: 'empire+1 steel-1 cap+3', result: 'You ask whether it might be thought cynical to settle the fates of millions so offhandedly, and suggest burning it. He tells you to keep it. You do.', diary: 'A half-sheet of paper. Ninety per cent of Greece. God forgive us the rest.' },
        { label: 'Put Poland on the paper', effects: 'steel+3 cap-2', roll: { stat: 'capital', diff: 70,
            pass: { effects: 'rep+6', result: 'Stalin looks at you for a long moment and writes "50" beside Poland. Whether he means it is another matter.', diary: 'Fifty per cent of Poland, on paper. Paper.' },
            fail: { effects: 'rep-2', result: 'He crosses Poland out. The temperature in the room drops.', diary: 'He crossed out Poland. As I feared.' } } },
        { label: 'Tear it up: no spheres, only principles', effects: 'steel+2 empire-2 cap-4', result: 'You tear it up. Stalin shrugs. The Red Army settles the matter anyway.', diary: 'Tore up the paper. The tanks will draw the lines instead.' },
      ] },

    { id: 'coalition-end', t: 1945.38, year: 1945, title: 'VE Day, and after', if: '!pm ~!long-peace',
      venue: { plate: 'gallery', label: 'Whitehall, May 1945' },
      text: 'Germany has surrendered. You stood on the balcony of the Ministry of Health with the King\'s ministers, and the crowd in Whitehall sang to you. Now the coalition must end or go on. You want Labour to stay until Japan is beaten. Astley might agree; his party conference, at Blackpool, will not. An election in July, or a khaki election in the autumn?',
      basis: 'The end of the wartime coalition, May 1945: Churchill\'s offer to continue until Japan\'s defeat; Labour\'s conference refusing; the caretaker government.',
      real: 'Labour left the coalition on 23 May 1945 after its conference rejected Churchill\'s offer to continue until the defeat of Japan. A caretaker Conservative government held office until the election result on 26 July.',
      check: 'research', facts: ['coalition-1945'],
      choices: [
        { label: 'Offer to go on until Japan falls; accept their refusal', historical: true, effects: 'loyalty+2 @astley+2', result: 'Labour refuses. You resign, form a caretaker government, and call an election for July.', diary: 'Coalition over. Election in July. The country loves me. Does it love my party?' },
        { label: 'Call an election at once, while the cheering lasts', effects: 'temper+3 @astley-6 fav+4', result: 'You go to the country on the crest of victory, as quickly as the law allows.', diary: 'Election now. Strike while the country is grateful.' },
        { label: 'Press Astley hard to keep the coalition', effects: 'cap-2', roll: { stat: 'reputation', diff: 70,
            pass: { effects: '!khaki-autumn', result: 'Astley persuades his party to stay until Japan is beaten. The election is put off to the autumn.', diary: 'The coalition holds until Japan. A khaki election in the autumn.' },
            fail: { effects: '@astley-4', result: 'Blackpool says no. The election is in July.', diary: 'Blackpool said no. July it is.' } } },
      ] },

    { id: 'long-peace-1945', t: 1945.3, year: 1945, title: 'The armed peace', if: '!long-peace',
      venue: { plate: 'whitehall', label: 'London, spring 1945' },
      text: 'Five years of peace. Germany rules Europe from the Atlantic to the Volga, and fights a war in Russia that never quite ends. America has beaten Japan in the Pacific and turned her back on Europe. Britain has her fleet, her empire and her shadow factories, and a German ambassador who smiles a great deal. The country goes to the polls for the first time since 1935.',
      basis: 'Invented, within "The Peace of 1940". The general election had been due by 1940 and was postponed in real history by the war.',
      real: 'This did not happen. Germany surrendered on 7–8 May 1945. Britain held its first general election since 1935 in July 1945.',
      check: 'research', facts: ['coalition-1945'],
      choices: [
        { label: 'Fight the election for rearmament and alliance with America', effects: 'steel+3 war+5 press+4', result: 'You fight on rearmament. The country is tired of being frightened and votes for houses.', diary: 'Fought on guns. They want houses.' },
        { label: 'Fight it on peace and plenty', effects: 'steel-3 reform+4', result: 'You promise the peace will last. Nobody believes it, including you.', diary: 'Peace and plenty. A lie well told.' },
        { label: 'Stand down and write the history of the peace', effects: 'money+8 health+4 -!mp office=None', result: 'You retire to write. Your book on the peace of 1940 is the most bitter ever written by a British statesman about his own country.', diary: 'Retired. Writing. The peace will need a historian. It will not need me.' },
      ] }
  );
})();
