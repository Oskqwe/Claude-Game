# Camp 2: The Quiet Major

**Anchor:** Clement Attlee. **Divergence:** mild to moderate. **Vector:** order −6, empire −4, state +7, steel +5, loyalty +8, temper −8.

DESIGN §8 already lists 51 scenes for the anchor. This brief adds the blend: the other four figures supply alternative routes, so two players of this camp do not live the same life.

## Figures

| Real | Echo | What a scenario can use |
|---|---|---|
| Clement Attlee | Clement Astley (player holds his place) | Putney solicitor's son; Haileybury; Stepney boys' club turned him socialist; Gallipoli and Hanna; Mayor of Stepney; Limehouse 1922; leader by survival 1935; Deputy PM; PM 1945–51 |
| Arthur Greenwood | Arthur Greenhalgh | Hunslet decorator's son; *Clarion* reader; Leeds BSc; Labour research department; speaks for England on 2 Sept 1939; set up the Beveridge committee, June 1941; drink |
| James Chuter Ede | James Chilton Eade | Epsom grocer's son, Unitarian; Cambridge cut short by money; elementary teacher, NUT; RSM in the war; Education Act 1944 with Butler; Home Secretary; the Evans reprieve file |
| A. V. Alexander | A. V. Alderman | Fatherless at one; corset-maker mother; council clerk at 13; Baptist; Co-operative movement; First Lord 1940–45 kept out of the War Room; Defence 1946–50 and national service |
| Jim Griffiths | Jim Griffin | Welsh-speaking blacksmith's son; pit at 13; ILP branch at 18; anti-war 1914–18; Central Labour College; miners' president; led the 97 over Beveridge; National Insurance Act 1946 |

## Act I fork (1883–1922)

Spine: DESIGN §8 scenes 1–16. Fork scene, **"What the money allows"**, at about 1897, when the player is 14:

| Choice | Route flag | Route scenes (from) | Rejoins |
|---|---|---|---|
| Haileybury, as Father wishes (historical) | `!route-haileybury` | DESIGN §8 spine: Mafeking night, Oxford, the Bar, the boys' club | — |
| The money runs out: leave school and clerk for the council | `!route-clerk` | Alexander: council clerk at 13; the Co-op guild; Baptist chapel debating; Weston and Bristol | 1914 enlistment |
| A scholarship to the higher-grade school, then to teach | `!route-teacher` | Ede: the pupil-teacher; Cambridge until the money ends; the NUT branch; elementary classroom of 50 | 1914, enlist in the ranks (RSM route) |
| The pit at 13, Welsh your first language | `!route-pit` | Griffiths: the ILP branch at 18; Clarion cyclists; the 1914 anti-war meeting; the Central Labour College 1919 | 1919 miners' agent |
| Evening classes and the *Clarion* | `!route-leeds` | Greenwood: Leeds BSc, teaching economics at Huddersfield, a wartime Reconstruction clerkship | 1919 research department |

Notes:

- A route changes `start` money and connections, not the camp vector. All routes lean to state +, loyalty +.
- The pit and clerk routes put the player in the ranks in 1914. The officer route (Gallipoli, Hanna) stays with the Haileybury path.
- The pit route can refuse service. Griffiths campaigned against the war. Give it a real cost: favour with the patriotic lodge, and the tribunal.

## Act II hinges (1922–1938)

From DESIGN §8 scenes 17–26, plus these:

- **1926, the Co-op and the Strike** (Alexander route): feed the strikers from the stores, or keep the Co-op neutral.
- **1929–31, the schools bill** (Ede route): school-leaving age and the Catholic schools row. GK; verify.
- **1934–36, the Fed** (Griffiths route): miners' president during the company-union fight. GK detail; verify the fight.
- **Research department, 1927** (Greenwood route): write the policy the leader will not read.

## Act III: this camp's angle

- **2 September 1939.** The deputy rises when the leader is in hospital. The player may be either man: the Greenwood moment can belong to the player if `!route-leeds`.
- **May 1940.** Bournemouth and the telephone call, then hold the line in the War Cabinet.
- **June 1941.** Set up the insurance committee and choose its chairman (Greenwood). The choice decides how soon a Beverley Report comes (spine: *Beverley Day*).
- **February 1943.** Vote with the Government or lead the 97 (Griffiths). Both are open to every route; Griffiths's side is `historical` if `!route-pit`.
- **1940–45, the Admiralty without the War Room** (Alexander): a minister kept out of the room where the decisions are made.
- **1944 Education Act** (Ede, with Buller of the Middle Way).
- **1948–50, the reprieve file** (Ede): Timothy Evans. A hard subject. The player confirms or reprieves, and learns the truth only in the epilogue.
- **1946–47, national service** (Alexander): the backbench revolt over its length.

## Set pieces

- **Lunch:** with the Webbs, about 1909. Sidney Webb was later a Cabinet minister, so both get an echo: *Sidney and Beatrice Webber* (new). Courses: the Minority Report, the Fabians, the ILP.
- **QT set, 1924:** Under-Secretary for War answering on the Army estimates against his own left.
- **QT set, 1946:** the Minister of National Insurance (Griffiths) on the new scheme.
- **Walk: Stepney streets, 1907** (new place: East End). With a boys' club lad, to his home in a court off Commercial Road.
- **Walk: the Bournemouth conference, May 1940** (new place: conference hall). Along the seafront with the deputy, deciding what to tell the Tories.
- **Lobby, 1945:** the new Labour members flooding the Lobby; the player decides who gets which job.

## Hard subjects

India 1942 (arrest of Congress leaders), the Bengal famine 1943, Indian partition 1947, Palestine 1945–48, the Evans case, the docks in 1949.

## Verify list

| Fact id | Claim | Status |
|---|---|---|
| `major-governess` | A governess who had taught the young Churchill | unchecked (GK) |
| `major-mafeking` | Caned after Mafeking night at Haileybury | unchecked (GK) |
| `major-briefs` | Four briefs in three years at the Bar | unchecked (GK) |
| `major-tom-co` | Brother Tom a conscientious objector | unchecked (GK) |
| `major-limehouse-1931` | Held Limehouse by 551 in 1931 | unchecked (GK) |
| `major-bournemouth-call` | The Bournemouth telephone call, 10 May 1940 | unchecked (GK) |
| `major-letter-1945` | Long typed letter rebuking Churchill, January 1945 | unchecked (GK) |
| `greenwood-2sept` | Greenwood spoke for Labour on 2 September 1939 | research |
| `greenwood-beveridge` | Greenwood set up the committee and chose Beveridge, June 1941 | research |
| `griffiths-97` | Griffiths led the 97 Labour MPs against the Government, February 1943 | research |
| `ede-evans` | Ede confirmed Evans's sentence in 1950, later concluded it was wrong | research |
