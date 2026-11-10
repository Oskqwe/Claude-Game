/* Fact register. Every claim a "what really happened" note depends on, with its verification status.
   status: research      – in the Wikipedia pages read for RESEARCH.md
           corroborated  – a (GK) item matched by at least one independent second source (listed)
           conflicting   – sources disagree; resolve before use
           unchecked     – not yet verified; the epilogue marks the note as unverified
   Division figures and Act III hinges will be added here before Act III is written
   (Schuman Plan and the 1945–46 hospitals dispute: source from Hansard). */
(function () {
  const TM = (window.TM = window.TM || {});

  TM.FACTS = {
    'ascot-hat': { status: 'unchecked', claim: 'Kicked the Headmaster\'s straw hat to pieces at St George\'s, Ascot.', sources: [] },
    'pneumonia-1886': { status: 'unchecked', claim: 'Near-fatal pneumonia at Hove, March 1886; Dr Robson Roose attended.', sources: [] },
    'harrow-paper': { status: 'corroborated', claim: 'Left the Harrow Latin entrance paper almost blank; admitted by Welldon to the bottom form.',
      sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill', 'https://winstonchurchill.org/publications/finest-hour/finest-hour-133/spencer-churchill-p-at-harrow-school-1888-1892-2/'] },
    'harrow-english': { status: 'research', claim: 'Good only at English and History at Harrow (Somervell, Macaulay prize, fencing are GK detail).', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'gallery-1893': { status: 'unchecked', claim: 'Watched the second Home Rule Bill debate from the gallery, 1893.', sources: [] },
    'branksome-fall': { status: 'corroborated', claim: 'Fell about 29 feet from a bridge at Branksome Dene, January 1893; unconscious three days; ruptured kidney.',
      sources: ['https://www.dorset.live/news/dorset-news/bournemouth-bridge-almost-killed-winston-8227635', 'https://winstonchurchill.org/the-life-of-churchill/young-soldier/1893-1895/winter-1893-age-18/'] },
    'sandhurst': { status: 'research', claim: 'Sandhurst at the third attempt; passed out December 1894. (Father\'s letter and the placing are GK.)', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'empire-theatre': { status: 'corroborated', claim: 'Empire Theatre screens torn down, 3 November 1894; his first public speech.',
      sources: ['https://victoriancalendar.blogspot.com/2011/10/november-3-1894-great-scene-at-empire.html', 'https://winstonchurchill.org/publications/finest-hour/finest-hour-163/books-arts-curiosities-prudes-on-the-prowl-a-rant-against-mrs-ormiston-chant/'] },
    'woom-death': { status: 'research', claim: 'Father died January 1895; Mrs Everest died July 1895 with him at her bedside.', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'cockran': { status: 'unchecked', claim: 'Stayed with Bourke Cockran in New York, November 1895; Cockran became his model in oratory.', sources: [] },
    'cuba': { status: 'research', claim: 'Cuba 1895 with the Spanish forces; under fire around his 21st birthday; Daily Graphic letters.', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'bombay-shoulder': { status: 'unchecked', claim: 'Dislocated his shoulder landing at Bombay, 1896.', sources: [] },
    'malakand': { status: 'research', claim: 'Malakand 1897 as soldier-journalist; first book.', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'malakand-book': { status: 'research', claim: 'The Story of the Malakand Field Force, 1898.', sources: ['https://en.wikipedia.org/wiki/The_Story_of_the_Malakand_Field_Force'] },
    'salisbury-1898': { status: 'corroborated', claim: 'Interview with Lord Salisbury at the Foreign Office, July 1898, after Salisbury read the Malakand book.',
      sources: ['https://winstonchurchill.org/the-life-of-churchill/young-soldier/1896-1900/summer-1898-age-23/', 'https://en.wikipedia.org/wiki/The_Story_of_the_Malakand_Field_Force'] },
    'omdurman-mauser': { status: 'unchecked', claim: 'Carried a Mauser pistol in the charge because of his shoulder.', sources: [] },
    'river-war': { status: 'research', claim: 'Criticised Kitchener\'s treatment of the wounded (River War, 1899).', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'ascroft': { status: 'unchecked', claim: 'Robert Ascroft invited him to stand at Oldham and died June 1899.', sources: [] },
    'oldham-1899': { status: 'unchecked', claim: 'Lost the Oldham by-election, July 1899, with Mawdsley; repudiated the Clerical Tithes Bill.', sources: [] },
    'armoured-train': { status: 'research', claim: 'Captured after the armoured train ambush near Colenso/Chieveley, November 1899.', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'pretoria-escape': { status: 'corroborated', claim: 'Escaped alone from the State Model School, 12 December 1899; Haldane and Brockie left behind.',
      sources: ['https://en.wikipedia.org/wiki/London_to_Ladysmith_via_Pretoria', 'https://www.thecollector.com/winston-churchill-escape-boer-war/'] },
    'light-horse': { status: 'unchecked', claim: 'Commission in the South African Light Horse; Spion Kop; Ladysmith; Diamond Hill.', sources: [] },
    'oldham-1900': { status: 'research', claim: 'Elected for Oldham, October 1900, aged 25. (Chamberlain speaking for him is GK.)', sources: ['https://en.wikipedia.org/wiki/Early_life_of_Winston_Churchill'] },
    'twain-1900': { status: 'corroborated', claim: 'Introduced by Mark Twain at the Waldorf-Astoria, 12 December 1900.',
      sources: ['https://twainsgeography.com/DBD/december-12-1900-wednesday', 'https://twainquotes.com/19001213.html'] },
  };
})();
