# Camp 9: The Machine

**Anchor:** David Margesson. **Divergence:** mild. **Vector:** order +4, empire +2, state 0, steel 0, loyalty +10, temper −6.

Whips, fixers and party managers. The game's most mechanical camp: give it a **whip's book** (a list of named members with their loyalty) and let the player spend favours, patronage and threats to win divisions. Party is not fixed: Morrison is Labour.

## Figures

| Real | Echo | Party | What a scenario can use |
|---|---|---|---|
| David Margesson | David Margrave (player holds his place) | Conservative | Aristocratic; Harrow; left Cambridge for America; 11th Hussars adjutant; Chief Whip 1931–40; Norway; bombed out of the Carlton, Oct 1940; War Secretary; sacked after Singapore |
| Herbert Morrison | Herbert Morrow | Labour | Brixton policeman's son; blind in one eye; errand boy; CO, market gardening; Hackney; against Poplar; ran the LCC; Home Secretary 1940; shelters; banned the *Daily Worker*; released Mosley; tried to stop Attlee 1945; hospitals; Festival of Britain; Foreign Office 1951 |
| Chips Channon | Chips Shannon | Conservative | Chicago; Oxford; Guinness money; Southend; PPS to Buller; toasted the fallen PM; never in office; the diarist |
| James Stuart | James Strathearn | Conservative | Earl's third son; Eton; Royal Scots, MC and Bar; equerry to the Duke of York; a suitor of Elizabeth Bowes-Lyon; married a Duke's daughter; Moray and Nairn; Chief Whip 1941–48 |

## Act I fork (1890–1922)

Spine (Margesson): the country house; Harrow; Cambridge abandoned; the American years; the Hussars. Fork scene, **"Where you are useful"**, at about 1905:

| Choice | Route flag | Route scenes (from) | Rejoins |
|---|---|---|---|
| Harrow, and then away (historical) | `!route-hussar` | Margesson spine: America, the Hussars, the war | 1922 election |
| An earl's younger son: the Royal Scots and the Court | `!route-court` | Stuart: MC and Bar; equerry; the royal suitor; the Devonshire marriage | 1923 election |
| Leave school at 14; errands, then the party branch | `!route-london` | Morrison: the policeman's son; blind in one eye; the ILP; conscientious objection and market gardening; Hackney | London Labour, then 1923 election |
| An American with money | `!route-chicago` | Channon: Chicago, Paris, Oxford; London society; the Guinness marriage. Shifts the player to an outsider who must buy his way in | 1935 election |

The London route makes this a **Labour machine** life: the LCC, the Poplar fight, the 1945 leadership plot. Act III branches by party; every scene needs a Labour and a Conservative version or an `if` per route.

## Act II hinges (1922–1938)

- **1921, Poplar** (London route): oppose the rates rebels.
- **1923, the Royal suitor** (Court route): lose the girl to the Duke of York. Private strand.
- **1926, the General Strike:** as a whip, or as a London Labour organiser.
- **1931, Chief Whip** (spine): the National Government's 554; discipline and patronage.
- **1934, the LCC** (London route): "Up the workers", housing, Waterloo Bridge (GK detail).
- **1935, Southend and society** (Chicago route): the King's set, Mrs Simpson.
- **1936, the Abdication:** where loyalty goes.
- **1938, Munich:** whip the 30 abstainers; or sit among them.

## Act III: this camp's angle

- **8 May 1940, Norway:** the whip's book. The game's biggest whipping scene: who to threaten, who to promise. Then tell the PM the truth.
- **9–10 May 1940:** Shannon toasts the fallen leader.
- **Oct 1940, the Carlton bombed:** the club walk scene in ruins (variant of `carlton`).
- **Dec 1940–Feb 1942, the War Office;** Singapore; the sacking by your own civil servant.
- **1940–45, the Home Office** (Morrow): shelters, the *Daily Worker*, the Mosley release vote (327–62).
- **1941–45, Chief Whip** (Strathearn): the censure vote of July 1942.
- **July 1945, Transport House** (Morrow): try to stop Astley going to the Palace. Dice.
- **1945, hospitals** (Morrow vs. Bowen of the Firebrand): council or state.
- **1951, the Festival;** Abadan.

## Set pieces

- **Lunch:** at the Carlton with the Chief Whip's book on the table, 1938. Reuses `carlton`.
- **Lunch:** Belgrave Square with Shannon and his guests, 1937 (new place: a London dining room).
- **QT set, 1941:** the Home Secretary on shelters and the *Daily Worker*.
- **Walk: the division lobbies, 8 May 1940,** standing at the door counting. Reuses `lobby`/`commons`.
- **Walk: the County Hall corridors, 1934** (new place).
- **Walk: the bombed Carlton, October 1940.**

## Hard subjects

The *Daily Worker* ban; releasing Mosley; Singapore; patronage and blackmail of members; the 1949 docks (if Labour).

## Verify list

| Fact id | Claim | Status |
|---|---|---|
| `machine-carlton-bomb` | Margesson bombed out of the Carlton, October 1940 | research |
| `machine-singapore` | Sacked after Singapore and told by the civil servant who replaced him | research |
| `machine-mosley-vote` | Mosley release upheld 327–62 | research |
| `machine-transport-house` | Morrison tried to stop Attlee going to the Palace, July 1945 | research |
| `machine-stuart-suitor` | Stuart a suitor of Lady Elizabeth Bowes-Lyon | research |
| `machine-channon-toast` | Channon toasted Chamberlain as the king over the water | research |
| `machine-waterloo` | Morrison's LCC and the new Waterloo Bridge | unchecked (GK) |
| `machine-554` | National Government won 554 seats in 1931 | unchecked (GK) |
