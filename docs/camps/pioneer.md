# Camp 8: The Pioneer

**Anchor:** Ellen Wilkinson. **Divergence:** moderate. **Vector:** order −7, empire −5, state +6, steel +3, loyalty −4, temper +5.

The women who got into a House built for men, from every party. The camp is cross-party on purpose: its routes include a Conservative, a Liberal and an Independent, so its Act III must let the player sit on any bench.

## Figures

| Real | Echo | Party | What a scenario can use |
|---|---|---|---|
| Ellen Wilkinson | Ellen Wilkins (player holds her place) | Labour | Manchester; scholarships; ILP at 16; suffrage and union organiser; Communist founder, left 1924; Middlesbrough East 1924; Jarrow March 1936; shelters under Morrow; Education 1945; leaving age to 15; died Feb 1947 |
| Eleanor Rathbone | Eleanor Rathmore | Independent | Liverpool shipowning reformers; Somerville without a degree; dock labour study; English Universities 1929; refugees committee 1938; internment speech July 1940; 1942 publicity on the extermination; Family Allowances paid to mothers; died 1946 |
| Nancy Astor | Nancy Aster | Conservative | Virginia; first woman to take her seat; Cliveden; antisemitic remarks; Norway rebel; retired 1945 |
| Edith Summerskill | Edith Summerfield | Labour | Doctor; Fulham West 1938; women in the Home Guard; clean milk; National Insurance 1950 |
| Megan Lloyd George | Megan Lloyd-Gwynne | Liberal | A great Liberal's daughter; Anglesey 1929; a Welsh Parliament; deputy leader 1949; lost 1951 |
| Mavis Tate | Mavis Tatton | Conservative | Right Club 1939; mass internment 1940; breakdown and break with the far right; equal pay; Buchenwald 1945; lost 1945; died 1947 |
| Barbara Castle | Barbara Carswell | Labour | Bradford ILP household; Oxford; *Tribune*; St Pancras council; Food ministry; Blackburn 1945; PPS to Crisp |
| Thelma Cazalet-Keir | Thelma Cazenove-Kerr | Conservative | Wealthy; LCC; Islington East 1931; equal pay by one vote 1944; brother killed 1943 |

## Gender

This is the one camp where the player is a woman by default. Check how the engine handles names and pronouns before writing, and ask the owner whether the player chooses. (DESIGN §1 says only "the player types their own name".)

## Act I fork (1891–1924)

Spine (Wilkinson): Ardwick; the Methodist chapel; the pupil-teacher centre; scholarship to Manchester; the ILP; the suffrage organiser. Fork scene, **"Sixteen"**, at about 1907:

| Choice | Route flag | Route scenes (from) | Rejoins |
|---|---|---|---|
| The ILP, and a scholarship to the university (historical) | `!route-manchester` | Wilkinson spine: suffrage, union organiser, the Communist Party | — |
| Oxford, from a socialist household | `!route-oxford` | Castle: Bradford ILP; Oxford and a Third; *Tribune*; council. Shifts born to 1910 | 1945 election |
| Medicine | `!route-doctor` | Summerskill: the hospital; the slums' milk; a doctor's view of poverty | 1938 by-election |
| Your father's name and a Welsh seat | `!route-wales` | Megan Lloyd George: the great man's daughter; the 1929 election at 27 | 1929 election as a Liberal |
| Money, the LCC and the Conservatives | `!route-tory` | Cazalet-Keir and Tate: a rich girlhood; the LCC 1924; the Conservative women | 1931 election as a Conservative |

Rathmore and Aster are older and work best as relationships: the Independent who teaches the player how to work a committee, and the Virginian hostess whose house is a rival court.

## Act II hinges (1924–1938)

- **1924, the only Labour woman** (spine).
- **1926, the General Strike** speaking tour.
- **1929, the youngest woman** (Wales route) / **1931, the women's landslide for the Tories** (Tory route).
- **1934, expelled from Spain** (spine).
- **Oct 1936, Jarrow:** march with the town to London. A walk set piece.
- **1938, refugees** (Rathmore): the committee and the visa queue. Hard subject.
- **May 1939, the Right Club** (Tory route, Tatton): join or refuse. A dark path with a real cost.

## Act III: this camp's angle

- **Munich:** cross-party women's response.
- **1940, shelters:** the junior minister under Morrow; deep shelters, the Underground.
- **July 1940, internment** (Rathmore): speak for the interned refugees. Hard subject.
- **1940** (Tatton): urge mass internment. The same debate, the other side.
- **1942, the extermination** (Rathmore): press for publicity and rescue. Hard subject, written soberly.
- **28 March 1944, equal pay** (Cazenove-Kerr): carried by one, reversed in two days.
- **April 1945, Buchenwald** (Tatton): one of ten MPs.
- **1945, the leadership** (spine): back Morrow against Astley.
- **1945–47, Education:** raise the leaving age in a coal crisis.
- **Feb 1947, death** (spine): a health strand risk, not a certainty.
- **1945, Blackburn** (Carswell): force onto the shortlist.

## Set pieces

- **Lunch:** at Cliveden with Aster, 1937. Hard: the "Cliveden set". Courses: Germany, the women's vote, America.
- **QT set, 1945:** the Minister of Education on the leaving age.
- **Walk: the Jarrow March,** along a road out of a northern town, October 1936 (new place: a road; could adapt `embankment`'s street pieces).
- **Walk: Westminster Hall with Rathmore,** 1940, after the internment debate. Reuses `lobby`.
- **Walk: an Underground shelter at night,** 1940 (new place).

## Hard subjects

Refugees and visas; internment; the Holocaust and rescue; antisemitism at Cliveden; the Right Club; equal pay; Tate's later suicide (handle in the epilogue only, with care).

## Verify list

| Fact id | Claim | Status |
|---|---|---|
| `pioneer-jarrow` | Wilkinson led the Jarrow March, October 1936 | research |
| `pioneer-spain-1934` | Wilkinson expelled from Spain, 1934 | research |
| `pioneer-rathbone-1940` | Rathbone's internment speech, 10 July 1940 | research |
| `pioneer-rathbone-1942` | Rathbone pressed for publicity about the extermination, 1942 | research |
| `pioneer-tate-rightclub` | Tate joined the Right Club, May 1939 | research |
| `pioneer-buchenwald` | Ten MPs sent to Buchenwald, April 1945; Tate narrated | research |
| `pioneer-equal-pay` | Cazalet-Keir's amendment carried by one, reversed two days later | research (figures need Hansard) |
| `pioneer-leaving-age` | Leaving age raised to 15 for April 1947 | research |
