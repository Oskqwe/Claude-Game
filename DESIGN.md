# The Member — game design (agreed spec)

Working title: **The Member**. A browser strategy game in which the player lives the whole life of a British politician of the 1938–1951 era, from childhood to the October 1951 election, and can bend history into invented events.

Everything under "Decisions" was chosen by the project owner in a question-and-answer session. Everything under "Proposals" is the designer's suggestion for how to deliver those decisions and can be changed.

---

## 1. Decisions (settled)

| Topic | Decision |
|---|---|
| Era | Main political game runs 1938–1951 (Munich to the October 1951 election). |
| Research base | Wikipedia biographies of the era's leading MPs, advisers and civil servants (see `RESEARCH.md`). All figures in every camp must be researched before their camp is written. |
| Opening quiz | 20–25 questions, personality and politics. Shows the player's scores and assigns the closest camp. |
| Override | The quiz recommends; the player may freely pick any available camp instead. |
| Matching unit | A **camp of 3–5 real figures**. About ten camps. Scenarios blend the experiences of the figures in the camp. |
| Identity | The player types their own name. They are born into the camp's circumstances. Scenarios must stay rooted in what real people in that camp experienced. |
| Names | **Every British politician, minister and official is renamed** with an echo name (similar, not the same). Foreign leaders keep real names. |
| Early life | 12–15 playable scenarios before entering Parliament, down to niche episodes. These shape convictions and traits that change later options. |
| Middle years | A fully playable act of 8–12 scenarios between first election and 1938. |
| Main act | 1938–1951. |
| Run length | About one hour, roughly 35–40 scenarios per life. |
| Text density | Punchy: 60–100 words per scenario. |
| Branching | Anything goes. Choices can take the player off the real path entirely; the game improvises a different life. |
| Divergence | Once the character is mapped, history bends into fictitious events. Mix by camp: some camps bend history mildly, some drastically. |
| Fiction source | Both: a pre-written spine of major alternate-history branches, plus live AI generation for niche in-between moments where the platform supports it. |
| Mechanics | Deep simulation: convictions, political capital, constituency, party favour, named rivals and allies with relationship scores, cabinet posts, the press, national war and reform meters. |
| Stats display | Full dossier side panel: every score, relationship and trait, updating after each choice. |
| Luck | Hidden dice. Stats set the odds; the player never sees them. |
| Mortality | Period-accurate. Front-line service in 1914–18 is as dangerous as it was. Roughly one life in three or four ends before 1951. |
| Losing your seat | Not the end. A wilderness phase begins: a health element, the need to find other employment, always trending back toward Parliament, possibly for years. |
| Private life | A full strand: marriage, money, drink, illness, children, friendships and feuds, with their own scenarios feeding health and reputation. |
| Hard subjects | Faced squarely as real decisions with real costs, written soberly: Bengal famine, refugees turned away, internment, Partition, Palestine, area bombing. |
| Period documents | All four: invented newspaper front pages, Hansard-style division lists, letters and telegrams, and a running private diary. |
| History notes | Only at the end: a full side-by-side of the player's life against the real one. No interruptions during play. |
| First version | **Two anchor lives written in full** (Churchill-type and Attlee-type, about 50 scenarios each) with the matching engine built in. Other camps added round by round. |
| Bias when unsure | More detail, more niche. 100+ scenarios approved. |
| Where to build | Claude Code, as a long-running project with tracked changes. |

---

## 2. Game flow

1. **Name your politician.**
2. **Quiz** (20–25 questions) → conviction profile → nearest camp shown with scores → player accepts or picks another.
3. **Act I: The Making** (12–15 scenarios): childhood, school, university or first job, formative shock, war service, first election.
4. **Act II: The Climb** (8–12 scenarios): first election to 1938.
5. **Act III: The Test** (15–20 scenarios): 1938–1951, including the shared national hinges.
6. **Epilogue:** obituary-style summary, the diary, and the side-by-side comparison with real history.

Death can end the run in any act. Losing a seat diverts into wilderness scenarios until the player gets back.

---

## 3. Camps (proposal: ten camps, about 55 figures)

Echo names are proposals; see section 9.

| # | Camp | Anchor | Other figures blended in | Divergence style |
|---|---|---|---|---|
| 1 | **The Bulldog** | Churchill | Bracken, Lindemann, Desmond Morton, Keyes, Amery, Duff Cooper* | Drastic |
| 2 | **The Quiet Major** | Attlee | Greenwood, Chuter Ede, A. V. Alexander, Jim Griffiths | Mild to moderate |
| 3 | **The Man of Business** | Chamberlain | Halifax, Hoare, Simon, Kingsley Wood, Horace Wilson | Drastic (peace of 1940) |
| 4 | **The Docker** | Bevin | George Isaacs, Callaghan, Jack Lawson*, George Tomlinson* | Moderate |
| 5 | **The Firebrand** | Bevan | Shinwell, Silverman, Jennie Lee, Michael Foot, Woodrow Wyatt | Moderate to drastic |
| 6 | **The Middle Way** | Macmillan | Eden, Butler, Boothby, Cartland, Hogg, Profumo | Mild |
| 7 | **The Planner** | Dalton | Cripps, Gaitskell, Douglas Jay, Harold Wilson, Durbin | Moderate |
| 8 | **The Pioneer** | Ellen Wilkinson | Rathbone, Astor, Summerskill, Megan Lloyd George, Mavis Tate, Barbara Castle, Cazalet-Keir | Moderate |
| 9 | **The Machine** | Margesson | Morrison, Channon, James Stuart* | Mild |
| 10 | **The Mandarin** | John Anderson | Bridges, Norman Brook, Cadogan, Colville, Beveridge | Mild, behind the scenes |

\* Not yet read; see the gaps list in `RESEARCH.md`.

Version 1 ships camps 1 and 2. The quiz scores all ten from day one; if the best match is unbuilt, the game says so and offers the nearest built camp.

---

## 4. The quiz (proposal)

Six conviction axes, each −10 to +10. Every question moves one or two axes.

| Axis | Low end | High end |
|---|---|---|
| **Order** | The people's cause | Property and hierarchy |
| **Empire** | Internationalist, self-government | Imperial destiny |
| **State** | Free market, sound money | Planning and public ownership |
| **Steel** | Conciliation, peace at a price | Defiance, force if needed |
| **Loyalty** | Conscience first | Party first |
| **Temper** | Cautious administrator | Romantic gambler |

Camp vectors (rough): Bulldog (Order +5, Empire +9, State −3, Steel +10, Loyalty −7, Temper +10); Quiet Major (−6, −4, +7, +5, +8, −8); Man of Business (+7, +4, −2, −8, +6, −7); Docker (−7, +2, +6, +8, +7, +1); Firebrand (−10, −7, +9, +3, −9, +8); Middle Way (+2, +1, +4, +6, −2, +1); Planner (−4, −3, +10, +4, +3, −2); Pioneer (−7, −5, +6, +3, −4, +5); Machine (+4, +2, 0, 0, +10, −6); Mandarin (+3, +1, +2, +2, +10, −10).

Match = smallest distance. Show the top three with a one-line "why".

Sample questions (write 22 in this style, period-flavoured, no modern jargon):

- *Your housemaster orders the school indoors on Mafeking night.* March anyway / Obey and seethe / Obey; he is the Master / Organise a deputation.
- *A docker's child tells you there is no tea at home.* Give her sixpence / Ask why the system allows it / Find her father work / It is not your place.
- *The Whip tells you how to vote on a matter you think wrong.* Vote as told / Abstain quietly / Vote against and say why / Vote against and write to the papers.
- *A dictator offers peace if a small country gives up a province.* Take it and rearm / Refuse and risk war / Stall for time / Ask what the small country wants.
- *You inherit £400 a year.* Leave the Bar for the East End / Invest it / Buy a horse and a commission / Fund a newspaper.
- *The pound: gold at the old parity, or a managed currency?*

The profile keeps moving during play; every choice nudges the axes. The dossier shows drift, and by 1938 the game reports which camp the player now most resembles.

---

## 5. Mechanics (proposal)

### 5.1 The dossier

**Convictions:** the six axes above.

**Standing (0–100):**
- **Capital** — weight in the House or the party. Spent to force outcomes.
- **Seat** — hold on the constituency.
- **Favour** — standing with the leadership and Whips.
- **Press** — how Fleet Street treats you.
- **Money** — solvency. Low money forces choices (directorships, journalism, selling the house).
- **Health** — falls with age, wounds, overwork, drink; at zero the life ends.

**Office:** current post and rank (backbencher, PPS, junior minister, minister, Cabinet, great office, leader, Prime Minister).

**Relationships:** 10–14 named people per life, each −100 to +100, with a one-line status.

**Traits:** tags earned in Act I and II that unlock or lock options later. Examples: *Trench veteran*, *Saw the East End*, *Scholarship boy*, *Orator*, *Shy*, *In debt*, *Crossed the floor*, *Marked by the Whips*, *Knows the dictators*, *Chapel*, *Wounded*.

**Nation:** **War** (military prospects) and **Reform** (the New Jerusalem), each 0–100, plus a divergence log.

### 5.2 Hidden dice

Each risky choice names a stat and a difficulty. Chance of success = clamp((stat − difficulty + 50) / 100, 5%, 95%). The player sees only the outcome. Elections roll on Seat plus the national swing for the party that year.

### 5.3 Mortality

Flagged-risk choices carry a death chance: front-line service 1914–18 (cumulative about 20% for a subaltern who stays at the front), flying, the Blitz (low), reckless stunts, and Health reaching zero. Death produces a newspaper obituary and the epilogue.

### 5.4 The wilderness

Losing a seat sets `out_of_parliament`. House scenarios are skipped (history runs its real course and is logged). The player instead draws from a wilderness pool: find work (journalism, the Bar, the City, lecturing, a union office), a health scare, money trouble, write the book, a by-election offer (dice). Each one nudges back toward Parliament. Churchill's 1922–24 and Macmillan's 1929–31 are the models.

### 5.5 Hinges and forcing outcomes

A hinge is a real decision point that the player can overturn. Each has a historical result, a cost in Capital to flip it, discounts from traits, and consequences (flags, War/Reform changes, later scenarios unlocked or removed). Leader-level characters decide some hinges outright.

### 5.6 Documents

- **Newspaper:** invented masthead (*The Daily Courier*), headline and standfirst generated from the outcome.
- **Division list:** motion, Ayes, Noes, named rebels (echo names), tellers.
- **Letters and telegrams:** from the Chief Whip, the agent, a parent, a spouse, a rival.
- **Diary:** one line per choice in the character's voice; the full diary is readable at any time and forms the epilogue.

### 5.7 Live AI moments

Where the platform lets the page call Claude, off-path stretches and small in-between moments are generated from the dossier: one 60–100 word scenario, three choices, effects limited to small stat changes and no new major flags. Always keep a pre-written fallback so the game works without it.

---

## 6. Shared hinges, 1938–1951

Division figures marked ✓ were confirmed in the pages read; others are from general knowledge and must be verified before they appear on a division list.

| Year | Hinge | Real result | Invented result if flipped |
|---|---|---|---|
| Oct 1938 | Approve the Munich Agreement | Approved 366–144; about 30 Conservatives abstained | Government falls in 1938; a Halifax-type takes over; rearmament a year early |
| Apr–May 1939 | Peacetime conscription (Military Training Act) | Passed; 87% of Labour MPs voted against ✓ | No conscripts before September; a thinner army in France |
| 8 May 1940 | Norway Debate | Government won 281–200 ✓, majority cut from 213 to 81 ✓; Chamberlain resigned 10 May | (a) Majority holds: he stays. (b) Outright defeat: faster change |
| 9 May 1940 | Who succeeds: the peer or the gambler? | Halifax declined; Churchill sent for ✓ | A Halifax-type premiership with the gambler running defence |
| 26–28 May 1940 | Approach Mussolini for terms? | War Cabinet split; 25-strong outer cabinet backed fighting on ✓ | Lisbon peace talks; the pre-written "Peace of 1940" spine |
| Feb 1943 | Implement Beveridge now? | Amendment lost 335–119; 97 Labour MPs rebelled ✓ | Social security begins in wartime; Treasury crisis; 1945 election changes |
| May 1945 | End the coalition or continue to Japan's defeat | Labour left; July election ✓ | An autumn "khaki" election |
| Oct 1945 | Hospitals: national (Bevan) or municipal (Morrison) | Bevan won ✓ | A council-run health service |
| Jan 1947 | Build the British bomb (secret committee) | Yes; Dalton and Cripps excluded ✓ | No British bomb when the Soviets test in 1949 |
| Feb 1947 | A deadline to leave India | Deadline set; independence August 1947 | No deadline; a longer, bloodier retreat or a different settlement |
| Sept 1949 | Devalue the pound | Devalued (to $2.80) | Hold the rate; reserves run out |
| June 1950 | Join the Schuman Plan talks | Stayed out; government won by 13 (309–296) | Britain a founder of the Coal and Steel Community |
| Apr 1951 | Health charges to pay for rearmament | Charges imposed; Bevan, Wilson, Freeman resigned ✓ | No charges; the Chancellor resigns instead |
| Oct 1951 | General election | Conservatives won a majority of 17 on fewer votes ✓ | Depends on everything above |

---

## 7. Anchor life 1: The Bulldog (Churchill camp)

Real basis in brackets. "→" marks a fork off the real path.

**Act I — The Making (1882–1900)**
1. 1882, the flogging school at Ascot: endure, rebel, or tell Nanny. [St George's; Mrs Everest]
2. 1886, pneumonia at Brighton: health roll.
3. 1888, the Harrow entrance paper: bluff, blank, or cram. [barely passed]
4. 1889–92, Harrow: English, fencing, or idleness. [strong only in English and History]
5. 1893, the bridge at Bournemouth: jump, climb, or surrender. Death risk. [a near-fatal fall]
6. 1893, Sandhurst at the third attempt: cavalry (dear), try again for infantry, or → abandon the Army.
7. 1894, the Empire Theatre: a first public speech, a letter to the papers, or stay away.
8. 1895, a father dies, then the nurse: the bedside or the regiment. Private strand.
9. 1895, Cuba: a 21st birthday under fire and a first newspaper commission.
10. 1896, Bangalore: Gibbon and Macaulay, polo, or drift. The dislocated shoulder.
11. 1897, Malakand: ride the skirmish line to be noticed. Death risk. First book.
12. 1898, Omdurman: pull strings past Kitchener; the Lancers' charge. Death risk.
13. 1899, the armoured train, capture, and escape from Pretoria: go alone or wait for comrades.
14. 1900, Oldham won; the lecture tour and the money.

**Act II — The Climb (1900–1938)**
15. 1901, the maiden speech: sympathy for the enemy, or the safe line.
16. 1904, free trade: cross the floor, or → stay a Tory.
17. 1908, marriage; lose Manchester, win Dundee.
18. 1910, Tonypandy: troops or police.
19. 1911, Sidney Street: stand in the firing line; let the house burn.
20. July 1914, the Fleet: keep it concentrated without Cabinet leave.
21. 1915, the Dardanelles: push it, drop it, or resign early.
22. 1916, a battalion at Ploegsteert. Death risk.
23. 1919–21, Russia and Ireland: intervention; the Black and Tans; the Treaty.
24. 1922, appendix, defeat at Dundee, Chartwell bought: the first wilderness. Money.
25. 1924–25, back to the Tories; gold at the old parity, or → a managed pound.
26. 1926, the General Strike: the government newspaper; hard or soft on the miners.
27. 1929–31, the Crash losses; knocked down on Fifth Avenue. Health roll.
28. 1931, India: resign from the front bench, or swallow it.
29. 1934–36, the leaked figures: use what the intelligence man brings across the fields.
30. 1936, the Abdication: defend the King and be howled down.

**Act III — The Test (1938–1951)**
31. Munich: abstain, vote against, or support. Hinge.
32. 1938–39, the constituency revolt. Seat.
33. Sept 1939, the Admiralty again.
34. May 1940, winding up the Norway Debate for a government you think is failing. Hinge.
35. 9 May 1940, the silence. Hinge.
36. 26–28 May 1940, terms. Hinge.
37. July 1940, the French fleet at Oran.
38. 1940, the rooftops in the Blitz. Death risk.
39. Dec 1941, the heart at the White House: conceal it?
40. 1942, Singapore, Tobruk, the censure motion; who is sacked.
41. 1942, the "dehousing" paper: area bombing. Hard subject.
42. 1943, Bengal: ships or grain. Hard subject.
43. 1943, Beveridge: embrace it or the four-year plan. Hinge.
44. Oct 1944, the percentages on a half-sheet of paper.
45. 1945, the election broadcast: statesman or partisan; defeat.
46. 1946, the iron curtain speech; Zurich.
47. 1947, India: fight the bill or let it pass.
48. 1949, the stroke at Monte Carlo: conceal or retire.
49. 1950, the Schuman Plan. Hinge.
50. 1951, at seventy-six: one more election.

---

## 8. Anchor life 2: The Quiet Major (Attlee camp)

Items marked (GK) come from general knowledge, not the pages read; verify before writing.

**Act I — The Making (1883–1922)**
1. 1892, the Putney nursery: a governess who once taught a far noisier boy (GK).
2. 1896–1900, Haileybury: Mafeking night, the Master defied, the cane (GK).
3. 1901–04, Oxford: an "imperialist conservative" who never speaks at the Union. [his own description ✓]
4. 1906, the Bar: four briefs in three years; persist or drift. [called 1906, disliked it ✓]
5. 1905–07, a first evening at the Stepney boys' club: go back weekly, or → decline and stay a Tory barrister.
6. 1907–08, manager of the club: charity, the Fabians, or the ILP soapbox. [joined ILP 1908 ✓]
7. 1908, a father's death and £400 a year: give up the Bar. Money. [father died Nov 1908 ✓]
8. 1909–11, secretary to Beatrice Webb; Toynbee Hall; explaining the Insurance Act by bicycle (GK for the bicycle).
9. 1912, the LSE lectureship. [✓]
10. 1914, one brother a conscientious objector, and you are 31: volunteer, or stand with him. (GK for the brother)
11. 1915, Gallipoli: dysentery; refuse the hospital ship? Hidden luck.
12. Dec 1915, Suvla: the rearguard, among the last off the beach. [✓]
13. April 1916, Hanna: wounded storming a trench. Death risk. [✓]
14. 1919, Mayor of Stepney: the mayors' march for the unemployed; the Poplar rates revolt. [Mayor 1919 ✓]
15. 1921–22, an Italian holiday and a marriage. Private strand. (GK)
16. Nov 1922, Limehouse. [✓]

**Act II — The Climb (1922–1938)**
17. 1924, Under-Secretary for War: defend the Army estimates against your own left. [✓]
18. 1926, the General Strike and the Stepney electricity committee: power for hospitals, none for factories; the personal lawsuit (GK).
19. 1927, the India commission: two years away while the party fumes. [✓]
20. 1930–31, the vacancy the rebel left behind; then the Post Office.
21. Aug 1931, the leader walks out to form a National Government: go with him or stay. Then hold Limehouse by a few hundred votes (GK). Dice.
22. 1931–33, deputy leader by survival; no money; a rich colleague pays for the secretary (GK). Money.
23. 1935, Brighton: the union boss destroys the pacifist leader. Whose side?
24. Nov 1935, the leadership ballot against the London boss and the deputy. Dice; → a deputy's life if lost.
25. 1936, "a War Budget": oppose the arms estimates while demanding resistance to the dictators. [✓]
26. Dec 1937, Spain: the volunteers, the salute, the company named after you. [visit ✓]

**Act III — The Test (1938–1951)**
27. Munich: "a victory for brute force". Hinge. [✓]
28. 1939, expel the Popular Front rebels? [Cripps and Bevan expelled ✓]
29. Apr 1939, conscription: oppose it. Hinge. [✓]
30. Summer 1939, the operations; on 2 September the deputy speaks for England because you cannot. Health. [✓]
31. Winter 1939, the whisper that you should go.
32. 8 May 1940, force the division? Hinge.
33. 9–10 May 1940, the two questions put to the party at Bournemouth; the telephone call. Hinge. (GK)
34. 26–28 May 1940, terms: hold the line with the gambler. Hinge. [✓]
35. 1940–42, running the home front while he runs the war.
36. Aug 1942, in the chair when India rises: arrest the Congress leaders? Hard subject. (GK)
37. Feb 1943, Beveridge: vote with the government against 97 of your own. Hinge. [✓]
38. 1943, the famine. Hard subject.
39. Jan 1945, the two-thousand-word letter you type yourself telling the Prime Minister to read his papers (GK).
40. May 1945, Blackpool: end the coalition. Hinge. [✓]
41. June 1945, the party chairman who will not stop talking; the broadcast reply.
42. 26 July 1945, the challenge at Transport House; "go to the Palace". Dice. [Morrison's challenge ✓]
43. Cabinet-making: who gets the Foreign Office; hospitals. Hinge. [✓]
44. Dec 1945, the American loan and its strings. [✓]
45. Jan 1947, the bomb. Hinge. [✓]
46. Feb 1947, India: the deadline and the last Viceroy. Hinge. Hard subject.
47. 1947, the frozen winter, the sterling crisis, and the colleague who asks you to resign; one telephone call. [plot ✓; the call GK]
48. 1949, the dock strike and the troops; devaluation. Hinge. [✓]
49. 1950, a majority of five; the Schuman Plan; Korea; the flight to Washington. Hinge. [majority ✓, Korea ✓]
50. Apr 1951, in hospital while the Cabinet tears itself apart. Hinge. Health. (hospital GK)
51. Oct 1951, the election you need not have called. [✓]

---

## 9. Echo names (proposal)

Rule: British politicians, ministers and officials are renamed. Foreign leaders, royalty, generals and writers keep real names. The end-of-game comparison reveals the real names.

| Real | Echo | Real | Echo |
|---|---|---|---|
| Winston Churchill | Winstan Churchward | Clement Attlee | Clement Astley |
| Neville Chamberlain | Nevil Chambers | Lord Halifax | Viscount Hallifield |
| Ernest Bevin | Ernie Bevis | Aneurin Bevan | Nye Bowen |
| Herbert Morrison | Herbert Morrow | Hugh Dalton | Hugh Dalby |
| Stafford Cripps | Stafford Crisp | Arthur Greenwood | Arthur Greenhalgh |
| Anthony Eden | Antony Edgerton | Harold Macmillan | Harold Macmorran |
| David Margesson | David Margrave | Brendan Bracken | Brendan Bracknell |
| F. Lindemann | "the Prof", Lindqvist | Leo Amery | Leo Emery |
| David Lloyd George | David Lloyd-Gwynne | H. H. Asquith | H. H. Askwith |
| Stanley Baldwin | Stanley Baldock | Ramsay MacDonald | Ramsay MacDougal |
| George Lansbury | George Lansdown | William Beveridge | Sir William Beverley |
| Hugh Gaitskell | Hugh Gaskell | Ellen Wilkinson | Ellen Wilkins |
| Kingsley Wood | Sir Kingsley Ward | Horace Wilson | Sir Horace Wilton |
| John Simon | Sir John Simmons | Samuel Hoare | Sir Samuel Hoad |
| Rab Butler | Rab Buller | Chips Channon | Chips Shannon |
| Roger Keyes | Sir Roger Keys | Duff Cooper | Duff Cowper |
| Emanuel Shinwell | Manny Shinfield | Jim Griffiths | Jim Griffin |
| John Anderson | Sir John Anders | Edward Bridges | Sir Edward Brydon |
| Jock Colville | Jock Colvin | Alexander Cadogan | Sir Alexander Cadell |
| Lord Beaverbrook | Lord Beaverhulme | Oswald Mosley | Sir Oswald Moseby |
| Maynard Keynes | Maynard Kaine | Harold Wilson | Harold Wilmot |

When the player takes camp 1, Churchward does not exist as a separate person; the player holds his place. Likewise Astley in camp 2.

---

## 10. Pre-written fictional spine (proposal)

Each appears only when its flag is set.

- **The Peace of 1940** (4–5 scenarios): the Lisbon terms; the quiet year while Germany turns east; secret rearmament; a "King's party" pressing for a government of resistance.
- **The Peer's War:** a Halifax-type premiership with the player as the fighting minister under him.
- **The Thin Line:** France 1940 without the 1939 conscripts.
- **Beverley Day:** social security starts in 1943; the Treasury rebels.
- **The Khaki Autumn:** the coalition lasts until Japan falls; a different 1945 election.
- **The Town Hall Health Service:** hospitals under the councils.
- **No British Bomb:** 1949 without one.
- **The Long Retreat:** India without a deadline.
- **The Paris Treaty:** Britain signs up to coal and steel in 1951; the miners revolt.
- **The Strike That Wasn't:** no return to gold in 1925, no General Strike in 1926.

---

## 11. Data shape (proposal)

One JSON or JS file per camp per act. Each scenario:

```
id, year, act, title
text            60–100 words
basis           which real figure and episode it draws on
real            what really happened (shown only in the epilogue)
if              condition for the scenario to appear (traits, flags, stats)
needs_seat      true if it only happens to a sitting MP
doc             optional letter, telegram, front page or division list
choices[]       label, result, effects, requires, roll, death_text,
                sets_flags, diary_line, is_historical
```

Effects use a compact string, for example `cap+5 seat-3 @bevis+10 #trench-veteran !crossed-floor war+3`.

---

## 12. Build order (proposal)

1. Engine: state, dossier panel, effects parser, conditions, hidden dice, save and resume.
2. Quiz and camp matching.
3. Documents: diary, letters, front pages, division lists.
4. Bulldog life, Act I. Playtest for tone and length.
5. Bulldog Acts II and III; shared hinges.
6. Quiet Major, all three acts.
7. Wilderness pool; mortality tuning (target: one life in three or four ends early).
8. Fictional spine.
9. Epilogue and side-by-side history.
10. Live AI moments, with fallbacks.
11. Then one camp per round, researching every figure in it first.

## 13. Open points

- Verify every division figure and every (GK) item against a second source before it is shown as fact in the epilogue.
- Finish reading the six figures listed as gaps in `RESEARCH.md`.
- Decide whether camp 10 (officials) uses the same Seat stat or a "Post" equivalent.
- A female player in camps other than the Pioneer: allowed by "anything goes", but the period barriers need their own scenarios.
