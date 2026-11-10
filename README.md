# The Member

A browser strategy game: live the whole life of a British politician of the 1938–1951 era, from the nursery to the October 1951 election, and bend history as you go. The agreed spec is in [DESIGN.md](DESIGN.md), the research in [RESEARCH.md](RESEARCH.md), and the working rules in [CLAUDE.md](CLAUDE.md).

## Play

Open `index.html` in a browser. There is no build step and no server: everything is plain HTML, CSS and JavaScript loaded as classic scripts, so it works straight from disk. Progress saves automatically in the browser; **New life** shows a save code that moves a life to another browser.

To make a single shareable file: `python3 tools/bundle.py` writes `dist/the-member.html`.

## What is in milestone 1

- **Engine** (`js/engine.js`, `js/story.js`): state, the compact effects language, conditions, hidden dice, period mortality, multi-course lunches, documents, save and resume.
- **Quiz** (`data/quiz.js`, `data/camps.js`): 22 questions on six conviction axes, matched by distance to all ten camps, top three shown with a reason. Any playable camp can be chosen.
- **Dossier** (`js/ui.js`): every standing score (Capital, Seat, Favour, Press, Reputation, Money, Health), the six convictions with drift from the quiz, named connections with status lines, traits, and the nation meters. Changes flash after each choice.
- **The Bulldog, Act I: The Making, 1882–1900** (`data/bulldog/act1.js`): 18 scenes on the real path, 4 off-path branches if you leave the Army, and 4 social set-pieces (dinner on Fifth Avenue, an audience at the Foreign Office, luncheon at the Carlton, dinner at the Waldorf-Astoria) played course by course and feeding Reputation.
- **Epilogue**: your life set against the real one, scene by scene, with each note's verification status, the real names behind the echo names, and the full diary.
- **Venue plates** (`js/plates.js`): engraved vignettes of each place, drawn in SVG.

## Writing scenes

Each scene in `data/<camp>/actN.js` has `id, year, title, venue, text (60–100 words), basis, real, check, facts, if, choices[]`. A lunch has `kind: 'lunch'`, `guests`, `menu` and `courses[]`, each with its own choices.

Effects are a space-separated string:

| Token | Meaning |
|---|---|
| `cap+5 seat-3 fav+2 press+4 rep+3 money-10 health-5` | standing, 0–100 |
| `order+2 empire-1 state+1 steel+2 loyalty-1 temper+3` | convictions, −10…+10 |
| `war+3 reform-2` | the nation |
| `@woom+10` | a relationship, −100…+100 |
| `#trench-veteran` / `-#shy` | add / remove a trait |
| `!crossed-floor` / `-!crossed-floor` | set / clear a flag |
| `office=Under-Secretary_for_War` | office (underscores become spaces) |

Conditions (`if`, `requires`) are space-separated terms that must all hold; `a|b` means either: `#trait`, `~#trait`, `!flag`, `~!flag`, `health>30`, `@woom>=20`, `order<0`, `age>=21`.

A choice can carry `roll: { stat, diff, pass, fail }` (chance = clamp((stat − diff + 50)/100, 5%, 95%), never shown), `death: { chance, text, headline }`, `doc`, `goto` and `historical`.

## Verification

`data/facts.js` lists every claim a "what really happened" note depends on, as `research`, `corroborated` (second source found), `conflicting` or `unchecked`. The epilogue marks unchecked notes. Division figures and the Schuman Plan and hospitals hinges are to be sourced from Hansard before Act III.
