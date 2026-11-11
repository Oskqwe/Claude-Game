# The Member

A browser strategy game: live the whole life of a British politician of the 1938–1951 era, from the nursery to the October 1951 election, and bend history as you go. The agreed spec is in [DESIGN.md](DESIGN.md), the research in [RESEARCH.md](RESEARCH.md), and the working rules in [CLAUDE.md](CLAUDE.md).

## Play

Open `index.html` in a browser. There is no build step and no server: everything is plain HTML, CSS and JavaScript loaded as classic scripts, so it works straight from disk. Progress saves automatically in the browser; **New life** shows a save code that moves a life to another browser.

To make a single shareable file: `python3 tools/bundle.py` writes `dist/the-member.html`.

## What is in milestone 1

- **Engine** (`js/engine.js`, `js/story.js`): state, the compact effects language, conditions, hidden dice, period mortality, multi-course lunches, documents, save and resume.
- **Quiz** (`data/quiz.js`, `data/camps.js`): 22 questions on six conviction axes, matched by distance to all ten camps, top three shown with a reason. Any playable camp can be chosen.
- **Dossier** (`js/ui.js`): every standing score (Capital, Seat, Favour, Press, Reputation, Money, Health), the six convictions with drift from the quiz, named connections with status lines, traits, and the nation meters. Changes flash after each choice.
- **The Bulldog, Act I: The Making, 1882–1900** (`data/bulldog/act1.js`, `data/bulldog/act1-routes.js`). At thirteen your answers send you down one of seven lives drawn from the camp's leading figures, so Act I does not simply retell the anchor's biography:
  - **Harrow and Sandhurst**, the soldier-journalist (Churchill): the Frontier, Omdurman, the armoured train, Oldham.
  - **Oxford and All Souls** (Amery): Balliol, Turkish, a dinner with the High Commissioner, The Times in the Boer War, the campaign against a general.
  - **The Foreign Office** (Duff Cooper and Nicolson): the Western Department, supper at the Savoy and a forbidden marriage, the Fashoda night, the Yeomanry.
  - **The Navy** (Keyes): Britannia, slavers off Zanzibar, a destroyer of your own, the New Territories, the Peiho forts, the walls of Peking.
  - **German science** (Lindemann): Darmstadt, Nernst's laboratory, luncheon at the Kaiserhof after the Kruger telegram, leaving in haste, the balloon section.
  - **The colonies** (Bracken): bolting to Echuca, the shearers' strike, the invented orphan, selling advertising, luncheon with the great man, stabbed on election night.
  - **The guns** (Morton): Woolwich, Colenso, a bullet in the lung, intelligence and the leak.
  Each episode transposed from another life into this one says so in its "what really happened" note. Lunches and dinners are played course by course and feed Reputation.
- **Question Time** (`data/bulldog/act1-qt.js`): a `kind: 'qt'` scene is five quick-fire questions in a row, each with its own clock (`seconds`) and a `timeout` outcome if the player is too slow. The first comes in February 1901 for anyone elected.
- **Walkable places in 3D** (`js/walk.js` engine, `js/places.js` builders; scenes `kind: 'walk'` with `place`): the Members' Lobby, the Commons Chamber (Barry's, before 1941), the Carlton Club in Pall Mall, and the Victoria Embankment at night. Third-person camera, soft shadows, gaslight glow; WASD or arrows and drag to look, a thumb-stick on phones. A scene can have `npcs` to talk to, `spots` to choose between (e.g. where to sit; a choice with `sit` seats you there), and `companions` (the first whose `if` holds walks beside you, and their `beats` play as you reach markers along the path). three.js r128 is vendored in `js/vendor/` so the game still runs from disk; without WebGL the same conversations appear as a list. Act I's first weeks in the House (1901) use all four places.
- **Epilogue**: your life set against the real one, scene by scene, with each note's verification status, the real names behind the echo names, and the full diary.
- **Venue plates** (`js/plates.js`): engraved vignettes of each place, drawn in SVG.

## Act II (draft)

`data/bulldog/act2.js` (1901–1918) and `act2-later.js` (1919–1938) hold 43 scenes. The spine is Churchill's middle years; the Act I routes carry on into the lives of the camp's other figures (Keyes at Zeebrugge, Morton at Arras, Lindemann at Farnborough, Duff Cooper with the Guards, Amery torpedoed, Bracken from 1923). Players still outside Parliament get a way in at 1906, 1908, 1910, 1918, 1924 or 1934. At the end of Act I the player goes on to Act II; the history comparison is shown only when the life ends. 19 of Act II's 44 facts are still unchecked (see `data/facts.js`).

## Act III (draft)

`data/bulldog/act3.js` (1938–40), `act3-war.js` (1940–45) and `act3-after.js` (1945–51) hold 42 scenes, including a walkable Lobby after Munich and the invented "Peace of 1940" branch (DESIGN §10) if terms are sought in May 1940. Flags: `!pm`, `!was-pm`, `!peer-war` (Hallifield as PM), `!peace-1940`, `!peace-signed`, `!long-peace`. The life ends after the October 1951 election, and the full comparison with history is shown then.

## Camp briefs

`docs/camps/` holds a brief for each of the nine unbuilt camps. See `docs/camps/README.md`.

## Writing scenes

Each scene in `data/<camp>/actN.js` has `id, t (decimal year; scenes sort by it), year, title, venue, text (60–100 words), basis, real, check, facts, if, choices[]`. A lunch has `kind: 'lunch'`, `guests`, `menu` and `courses[]`, each with its own choices.

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

## Counterfactual lives

A rogue choice can take a life off the record. The effect `fork=<id>` records the moment (year and id), sets the flags `offmap` and `fork-<id>`, and stamps the outcome "History bends here". `TM.FORKS[id]` holds the invented history (`history`, plus `more: [{if, text}]` chapters chosen by flags), a `real` note, and optional act endings (`ends: {1: {if, head, text}}`). The epilogue shows "The history you made" before the side-by-side table.

Rules (owner, 10 Nov 2026): great external events still happen on schedule, but an off-record life meets them from somewhere else, with less power over them. A rogue choice can end the life outright (`!life-over` with `end: true`). An off-record life has a hard, earned road back: winning it clears `offmap` and sets `returned`, which lets the historical scenes resume. Historical scenes that would pull an off-record life back by default carry `~!offmap`.

First branch: `data/bulldog/fork-mamund.js`. Riding alone into a village at Malakand (1897) can end in capture by the Mamund; from there a Frontier career (the Khyber, the Bazar valley 1908, the Germans in Kabul 1915, Amritsar 1919, Qissa Khwani 1930), Viscount Hallifield as Prime Minister in May 1940 (fighting on or taking the Lisbon terms), and four roads back to the House (1898, 1923, 1935, 1938, 1941) and two to No. 10 (1942). A second fork, `renegade`, ends the life in the hills.

More forks (`data/bulldog/forks.js`): `bankrupt` (buying on the way down in 1929; a bankrupt cannot sit in the Commons, and an undischarged one cannot stand) and `changi` (staying in Singapore in 1942: Changi, the Burma railway, liberation). `world=<id>` records a bend in history that leaves the character on the record: the Peace of 1940, Hallifield's premiership with the player as Minister of Defence, Trondheim taken from the sea. Winning a seat clears `offmap` automatically and sets `returned`.

Act II forks (`data/bulldog/forks2.js`): `narrows` (the Fleet sent into the Dardanelles again in 1915: Constantinople and a different 1917, or a drowned fleet), `sidney` (leading the rush at Sidney Street costs the Admiralty; Ireland and the Curragh instead), `pow-1916` (taken on a raid from Ploegsteert: the camps, Switzerland or the Holzminden tunnel, and the coupon election). `data/bulldog/citizen.js` gives off-record lives an ordinary war: the ration book, the warden's post, the stranger at the club (the `traitor` fork), the call-up of old men, the flying bombs.

Typed live moves are limited to three per act (`TM.Live.PER_ACT`). `TM.DEATH_SCALE` (1.35) tunes mortality to about one life in four ending before 1951.

## Your own move (live)

In the claude.ai artifact the page can ask Claude through the `sample` capability (`js/live.js`). On ordinary scenes the player may type an action; Claude returns JSON (outcome, effects, optional roll, risk, optional fork). The engine caps every change (standing ±6, convictions ±3, nation ±5), rolls the dice itself, decides death from the stated risk, and records any fork as `live-<n>` in `s.liveForks`. Live moments are marked "written live, not from the record" in the epilogue. Opened from disk, the box never appears.

## Verification

`data/facts.js` lists every claim a "what really happened" note depends on, as `research`, `corroborated` (second source found), `conflicting` or `unchecked`. The epilogue marks unchecked notes. Division figures and the Schuman Plan and hospitals hinges are to be sourced from Hansard before Act III.

## Event explainers

`data/glossary.js` holds about 150 short explainers for the real events, places and institutions
the game mentions (Mafeking night, Black Week, the coupon election, the Blitz...). The first mention
of each in a quiz question, scene, lunch course or outcome is underlined with dots, and tapping it
opens a small card (`gl()` and `glossOpen()` in `js/ui.js`). Explainers say only what was known at the
time, keep echo names, and are never attached to invented alternate-history events. Run
`node tools/glosscov.js "$PWD"` to list scenes with no explainer.
