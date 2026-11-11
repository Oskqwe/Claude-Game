# Camp preparation notes

One file per unbuilt camp. These are working briefs for writing each camp's three acts, prepared on 10 November 2026 from `RESEARCH.md` §C–K and §M. Nothing here is player-facing, so real names are used freely. Echo names follow `DESIGN.md` §9 and `data/camps.js`; new echo names proposed here are marked *(new)*.

| Camp | Anchor | File | Status |
|---|---|---|---|
| 2 | Attlee | [major.md](major.md) | Brief ready; DESIGN §8 already has an anchor outline |
| 3 | Chamberlain | [business.md](business.md) | Brief ready |
| 4 | Bevin | [docker.md](docker.md) | Brief ready |
| 5 | Bevan | [firebrand.md](firebrand.md) | Brief ready |
| 6 | Macmillan | [middle.md](middle.md) | Brief ready |
| 7 | Dalton | [planner.md](planner.md) | Brief ready |
| 8 | Ellen Wilkinson | [pioneer.md](pioneer.md) | Brief ready |
| 9 | Margesson | [machine.md](machine.md) | Brief ready |
| 10 | John Anderson | [mandarin.md](mandarin.md) | Brief ready |

## What each brief contains

1. **Figures.** Real name, echo name, and the one or two things about each life that a scenario can use.
2. **Act I fork.** Following the blend-the-figures rule, the anchor's life is the spine, and one early fork scene branches into routes taken from the other figures. Each route lists its scenes and where it rejoins.
3. **Act II hinges** (first election to 1938).
4. **Act III.** The camp's own angle on the shared 1938–51 hinges (DESIGN §6), plus the camp's private hinges.
5. **Set pieces.** Candidate lunches (`kind: 'lunch'`), Question Time sets (`kind: 'qt'`), and walkable scenes (`kind: 'walk'`) with the place each needs. Places already built: `lobby`, `commons`, `carlton`, `embankment`.
6. **Hard subjects** the camp must face.
7. **Verify list.** Every (GK) item and every date the camp depends on, with the fact id it will carry in `data/facts.js`. Ids already registered there have status `unchecked` until a second source is found.

## New places the camps will want

Ordered by how many camps use them:

| Place | Used by | Notes |
|---|---|---|
| Transport House / a Labour Party conference hall | major, docker, firebrand, planner, pioneer, machine | Smith Square offices; the platform at Bournemouth, Blackpool or Brighton |
| Downing Street: Cabinet Room and the garden | business, major, machine, mandarin, planner | The long table, the pillars, the garden door |
| East End streets / a docks quayside | major, docker, firebrand, pioneer | Stepney, the Isle of Dogs, Poplar, the West India Docks |
| Whitehall corridor and a Permanent Secretary's room | mandarin, business, machine | Treasury Chambers or the Cabinet Office, green baize doors |
| A pithead and a miners' institute | firebrand, docker | Tredegar, Durham |
| The Reform Club or the Athenaeum | planner, mandarin, middle | Better than reusing the Carlton for Labour and Liberal figures |
| A country house weekend (Cliveden, Birch Grove) | middle, pioneer, machine | Terrace, library, long gallery |

## Engine work the camps need

Found while writing the briefs. None of it is needed for the Bulldog.

| Need | Camps | Notes |
|---|---|---|
| A different birth year per route | planner (Wilson route), pioneer (Castle route) | Act I `start` is one object today; make it per route, or open those routes in Act II |
| The player's sex and pronouns | pioneer, firebrand (Lee route) | Owner's answer (10 Nov 2026): no man/woman choice. The Pioneer camp is gender neutral; whether the character is treated as a woman politician follows from the quiz answers. Engine needs a quiz-derived flag for this |
| No seat in the Commons | mandarin, business (Wilson route) | Replace `seat` with standing in Whitehall; no wilderness on defeat; a "minute" document type |
| A whip's book | machine | A list of named members with loyalty scores, spent to win divisions |
| Party per route | machine (Morrison route is Labour), middle and pioneer (cross-party) | Scenes need `if` by party flag |
| A "pound" meter | planner | Sterling reserves through 1947–49 |

## Fact register

`tools/camp_facts.py` reads every brief's verify list and writes `data/facts-camps.js` (81 entries: 56 research, 25 unchecked). Run it again after editing a brief. Each camp's `data/<camp>/act1.js` is an empty stub.

## Shared rules (from CLAUDE.md)

- Scene text 60–100 words; three or four choices.
- Every scene carries `basis` and `real`; `real` is shown only in the epilogue.
- No invented quotations from real people. Reported speech only.
- (GK) items must reach `corroborated` before the epilogue states them as fact.
- Hard subjects are playable, written soberly, with real costs.
- Do not mark a camp `built: true` until all three acts are written and tested.
