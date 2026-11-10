# Camp 5: The Firebrand

**Anchor:** Aneurin Bevan. **Divergence:** moderate to drastic (owns *The Town Hall Health Service* in reverse, and the Bevanite split). **Vector:** order −10, empire −7, state +9, steel +3, loyalty −9, temper +8.

Expulsion, rebellion, and then the one great thing built. The camp should feel like a life spent on the wrong side of the whip, until the player is handed power and must use it.

## Figures

| Real | Echo | What a scenario can use |
|---|---|---|
| Aneurin Bevan | Nye Bowen (player holds his place) | Tredegar, ten children, five died; stammer; butcher's boy, then the pit at 13; lodge chairman at 19; nystagmus; Central Labour College; unemployed 1921–24; father died of pneumoconiosis uncompensated; Ebbw Vale 1929; expelled 1939; wartime opposition; NHS; "vermin"; resigned 1951 |
| Emanuel Shinwell | Manny Shinfield | Spitalfields, eldest of 13; Glasgow tailoring at 11; public library; seamen's organiser; Calton Jail after George Square 1919; beat MacDonald at Seaham 1935; refused a junior post 1940; coal nationalised; the 1947 fuel crisis; Defence 1950 |
| Sydney Silverman | Sydney Silverton | Liverpool Romanian-Jewish draper's son; three prison terms as a CO; tenants' solicitor; Nelson and Colne 1935; gave up pacifism over the Jews; the 1948 hanging amendment |
| Jennie Lee | Jennie Leigh | Lochgelly miner's daughter; Edinburgh MA, LLB; youngest MP 1929 before women her age could vote; ILP; Bristol Central 1943 as Independent; Cannock 1945 |
| Michael Foot | Michael Footman | Plymouth Liberal dynasty; Oxford Union; Birkenhead shipping clerk; rejected for asthma; *Guilty Men*; editor at 28; Devonport 1945; *Keep Left*; *Tribune* |
| Woodrow Wyatt | Woodrow Wyeth | Headmaster's son; Normandy D+1; nearly court-martialled; India; Aston 1945; Cabinet Mission go-between; Keep Left |

## Act I fork (1897–1929)

Spine (Bevan): Tredegar; Sirhowy school and the stammer; the butcher's boy; Ty-Trist colliery; the lodge; the Workmen's Library. Fork scene, **"The scholarship"**, at about 1910:

| Choice | Route flag | Route scenes (from) | Rejoins |
|---|---|---|---|
| Down the pit with your father (historical) | `!route-pit` | Bevan spine | — |
| The scholarship, if you can win it | `!route-scholar` | Lee: dux of the school; Edinburgh University; the ILP; a by-election at 24 | 1929, a seat before you can vote |
| Leave for Glasgow and the tailoring shop | `!route-glasgow` | Shinwell: the public library; the seamen's union; George Square 1919 and five months in Calton | 1922 election |
| Scholarships to Liverpool, and refuse the war | `!route-co` | Silverman: three prison terms as a CO; a solicitor for tenants | 1935 election |

**Foot and Wyatt** are born 1913 and 1918; use them as the camp's younger generation: the journalist friend who writes *Guilty Men* with you, and the officer back from Normandy who joins Keep Left. Both can be companions on walks.

Notes:

- The scholarship route is a woman's route if the player chose a woman's name. The camp must support either. (DESIGN §1 has the player type their own name; check whether gender is asked. If not, ask the owner before writing this route.)
- The Glasgow route carries a prison scene (Calton Jail, 1919) and a health cost.
- The CO route is three prison terms. Hard on health; high conscience.

## Act II hinges (1919–1938)

- **1919–21, Central Labour College:** Marx, and curing the stammer by reciting Morris.
- **1921–24, unemployed:** the blacklist. Money near zero.
- **1925, the father's death:** pneumoconiosis, no compensation. Sets `#for-the-miners`.
- **1926, the lockout:** relief committees.
- **1929–31, the new Member:** savage the Chancellor of the Exchequer; flirt with the New Party (Mosley invited Bevan; GK). A dangerous route into *the Moseby path*.
- **1931, Seaham** (Glasgow route, but in 1935: beat the old leader).
- **1936–38, Spain and the Popular Front:** Unity Campaign with Crisp (the Planner camp).

## Act III: this camp's angle

- **Jan–Mar 1939, expulsion** with Crisp. Recant, or stay out. Readmission in December.
- **Apr 1939, conscription:** vote against.
- **May 1940:** Shinfield refuses a junior post. Take it, or refuse?
- **1940–45, the opposition of one:** censorship, 18B detention, coal, the Second Front. The 1944 defence regulation vote and the 71–60 whip vote. A Question Time set as the critic.
- **1940, *Guilty Men*** with Footman.
- **1943, Bristol Central** (Leigh): stand as Independent against the truce.
- **1945, Minister of Health at 47.** The hospitals: nationalise them, or leave them with the councils (Morrow of the Machine camp). Hinge into *The Town Hall Health Service*.
- **1946–48, the BMA:** concede private practice for consultants or fight on.
- **5 July 1948.** The appointed day.
- **1948, "vermin":** the speech, paraphrased. Press cost.
- **1947, the fuel crisis** (Shinfield): the minister who promised no crisis.
- **1948, hanging** (Silverton): the amendment passes the Commons and dies in the Lords.
- **April 1951:** charges on teeth and spectacles. Resign, or stay.

## Set pieces

- **Lunch:** with Beaverbrook (a British peer and minister, so echo: Lord Beaverhulme), 1940. He courts Bowen and Footman at once. Courses: the war, the newspaper, the price.
- **QT set, 1943:** the critic harrying the Home Secretary on detention and censorship.
- **QT set, 1947:** the Minister of Health on the BMA ballot.
- **Walk: Tredegar, the main street to the Workmen's Library** (new place).
- **Walk: the Embankment with Footman, 1940,** plotting *Guilty Men*. Reuses `embankment`.
- **Walk: the Commons at night, April 1951,** to the despatch box to resign. Reuses `commons`.

## Hard subjects

18B detention; the 1944 defence regulation; the BMA and doctors' freedom; hanging; prescription charges; Palestine (Silverton).

## Verify list

| Fact id | Claim | Status |
|---|---|---|
| `firebrand-expelled-1939` | Bevan and Cripps expelled, March 1939; Bevan readmitted December | research |
| `firebrand-whip-1944` | Kept the whip by 71 to 60 in 1944 | research |
| `firebrand-mosley` | Mosley sounded out Bevan for the New Party | unchecked (GK) |
| `firebrand-morris` | Beat the stammer partly by reciting Morris | research |
| `firebrand-father-1925` | Father died of pneumoconiosis, Feb 1925, uncompensated | research |
| `shinwell-calton` | Five months in Calton Jail after George Square, 1919 | research |
| `silverman-1948` | Silverman's amendment passed the Commons and died in the Lords | research |
| `lee-1929` | Lee elected for North Lanark in March 1929 before women of 25 had the vote there | research |
| `foot-guilty-men` | *Guilty Men*, 1940, co-written | research |
