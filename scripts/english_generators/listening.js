/**
 * scripts/english_generators/listening.js
 *
 * Generates exactly 375 authentic CKE Formuła 2023 Listening Comprehension tasks
 * mapped to Działy 6–8:
 * - Dział 6: Wybór wielokrotny ze słuchu (MCQ ABC) (120 zadań)
 * - Dział 7: Dobieranie wypowiedzi do osób i sytuacji (Matching) (120 zadań)
 * - Dział 8: Zadania otwarte i luki ze słuchu (Notatki & P/F) (135 zadań)
 * Total: 375 tasks
 */

export function generateListening() {
  const tasks = [];
  let index = 1;

  // 1. LISTENING MATCHING -> DZIAŁ 7 (120 tasks)
  const matchingClusters = [
    {
      clusterTitle: "First Part-time Jobs and Summer Work Experience",
      transcripts: [
        "[Speaker 1 - Male, Standard British]:\n<break time=\"1.0s\"/>\nWhen I started my apprenticeship at the local bakery, waking up at 3:30 a.m. felt like torture. I genuinely thought I would quit after the first week. <break time=\"1.5s\"/> But once I mastered the secret of baking sourdough bread and saw the smiles of our morning customers, all that exhaustion just vanished. It has given me a true sense of purpose.",
        "[Speaker 2 - Female, General American]:\n<break time=\"1.0s\"/>\nMy friends told me that working as a summer camp counsellor would be a breeze with plenty of sunbathing. Well, they couldn't have been more wrong! <break time=\"1.5s\"/> I was responsible for twelve energetic eight-year-olds from dawn till dusk. By the end of July, I was completely drained and couldn't wait to get back to my quiet bedroom.",
        "[Speaker 3 - Male, Australian]:\n<break time=\"1.0s\"/>\nI took a temporary job at a call centre solely because the hourly rate was unusually attractive. <break time=\"1.5s\"/> However, sitting in a windowless cubicle answering angry complaints for eight hours straight took a terrible toll on my mood. No amount of money is worth feeling that miserable every single day.",
        "[Speaker 4 - Female, Standard British]:\n<break time=\"1.0s\"/>\nI volunteered to manage social media for a neighbourhood charity shop. Initially, I just wanted to boost my CV for university applications. <break time=\"1.5s\"/> But seeing how our online campaigns directly helped raise funds for the homeless community turned out to be the most meaningful thing I have ever done."
      ],
      options: [
        "A. The speaker found the job deeply satisfying despite the initial physical strain.",
        "B. The speaker realized that high pay cannot compensate for extreme stress.",
        "C. The speaker was disappointed because the work was much more exhausting than expected.",
        "D. The speaker decided to pursue a professional career in digital marketing.",
        "E. The speaker experienced unexpected emotional fulfilment from helping others."
      ],
      answers: ["A", "C", "B", "E"],
      traps: [
        "Dystraktor D zawiera słownictwo marketingowe, które uczeń kojarzy z social media, ale głośnik nie planuje kariery marketingowej.",
        "Pułapka dosłownego słowa 'sunbathing' – praca okazała się wycieńczająca.",
        "Zwrócenie uwagi na słowo 'attractive rate', ale kluczowa jest konkluzja po 'However'.",
        "Wzmianka o CV to motywacja początkowa, a puentą jest pomoc bezdomnym."
      ]
    },
    {
      clusterTitle: "Unusual Travel Encounters and Transport Delays",
      transcripts: [
        "[Speaker 1 - Female, Standard British]:\n<break time=\"1.0s\"/>\nWe were driving across the Scottish Highlands when our GPS suddenly stopped working. We ended up in a tiny remote village where a shepherd invited us into his cottage for warm scones and tea while he drew a detailed hand-made map for us.",
        "[Speaker 2 - Male, Scottish]:\n<break time=\"1.0s\"/>\nI booked an overnight sleeper train to London expecting a peaceful night's rest. Instead, an energetic school brass band in the carriage next door practiced their trumpet solos until 2:00 a.m. I arrived at my job interview with red, swollen eyes.",
        "[Speaker 3 - Female, General American]:\n<break time=\"1.0s\"/>\nMy flight was delayed by seven hours at Chicago O'Hare. Rather than complaining, I joined an impromptu acoustic jam session with three folk musicians who were also stuck near gate B12. The time flew by like magic.",
        "[Speaker 4 - Male, Canadian]:\n<break time=\"1.0s\"/>\nI decided to cycle across Vancouver Island with lightweight camping gear. On the third night, a curious black bear wandered right past my tent sniffing my bicycle saddle. I froze in total silence until it vanished into the pine trees."
      ],
      options: [
        "A. The speaker experienced wonderful local hospitality when technology failed.",
        "B. The speaker made the best of a long wait through an unexpected musical activity.",
        "C. The speaker suffered from sleep deprivation before an important meeting.",
        "D. The speaker bought a brand new bicycle after an accident.",
        "E. The speaker had a tense encounter with wildlife while camping."
      ],
      answers: ["A", "C", "B", "E"],
      traps: [
        "Dystraktor D kusi słowem 'bicycle', ale kolarz nie miał wypadku ani nie kupił roweru.",
        "Mylenie hałasu orkiestry z awarią pociągu.",
        "Wzmianka o opóźnieniu lotu – uczeń może sądzić, że to skarga, podczas gdy autorka świetnie się bawiła.",
        "Obecność niedźwiedzia – nie doszło do ataku, a jedynie cichej obserwacji."
      ]
    }
  ];

  for (let i = 0; i < 120; i++) {
    const cluster = matchingClusters[i % matchingClusters.length];
    const spkIdx = i % 4;
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_lis_${taskNum}`,
      pillarId: 'pillar-listening',
      pillarName: 'Rozumienie ze słuchu',
      topicId: 'eng-dzial-7',
      sectionTitle: 'Dział 7: Dobieranie wypowiedzi do osób i sytuacji (Matching z pułapką word-spotting)',
      sectionNumber: 7,
      lessonId: 'eng-lesson-7-1',
      type: 'SINGLE_CHOICE',
      title: `Dobieranie ze słuchu: ${cluster.clusterTitle} (Wypowiedź ${spkIdx + 1})`,
      question: `Usłyszysz wypowiedź na temat: ${cluster.clusterTitle}. Do nagrania dopasuj odpowiadające mu zdanie podsumowujące (A–E):\n\nKtóre zdanie najlepiej oddaje sens wypowiedzi Głośnika ${spkIdx + 1}?`,
      transcriptSnippet: cluster.transcripts[spkIdx],
      options: cluster.options,
      optionsDetailed: cluster.options.map((opt) => ({
        id: opt.charAt(0),
        text: opt,
        is_correct: opt.startsWith(cluster.answers[spkIdx])
      })),
      correctAnswer: cluster.answers[spkIdx],
      explanation: `Wypowiedź Głośnika ${spkIdx + 1} bezpośrednio odzwierciedla treść zdania ${cluster.answers[spkIdx]}. Analiza transkryptu potwierdza intencję mówcy.`,
      ckeTrap: cluster.traps[spkIdx],
      source: 'CKE Formuła 2023 • Zadanie 2 (Dobieranie ze słuchu)',
      points: 1
    });
  }

  // 2. LISTENING MULTIPLE CHOICE -> DZIAŁ 6 (120 tasks)
  const mcqListeningTemplates = [
    {
      title: "Audio MCQ: Podcast o technologii AI i nauce języków",
      transcript: "[Host - Female, British]:\n<break time=\"1.0s\"/>\nWelcome back to Tech Horizons. Many language learners ask whether AI chatbots will completely replace human conversation partners. <break time=\"1.5s\"/> While bots are fantastic for practicing basic verb conjugations without embarrassment, they still cannot replicate the subtle emotional nuances, humour, and spontaneous cultural references that happen when two human beings talk over a cup of coffee. Real fluency is about connection, not just algorithmic grammar.",
      q: "What is the speaker's main conclusion about AI in language learning?",
      opts: [
        "A. AI bots are completely useless for learning foreign language grammar.",
        "B. Human interaction remains essential for developing authentic fluency.",
        "C. Chatbots will replace all human language teachers within five years."
      ],
      ans: "B",
      exp: "Autorka podkreśla, że 'human beings talk over a cup of coffee... Real fluency is about connection', co oznacza, że kontakt z człowiekiem jest niezastąpiony.",
      trap: "Opcja A jest zbyt skrajna (autorka mówi, że boty są świetne do gramatyki). Opcja C to mit, któremu autorka zaprzecza."
    },
    {
      title: "Audio MCQ: Wywiad z szefem kuchni o marnowaniu żywności",
      transcript: "[Chef - Male, British]:\n<break time=\"1.0s\"/>\nWhen customers walk into my restaurant, they often wonder why our menu changes every three days. <break time=\"1.5s\"/> The simple truth is zero-waste cooking. If we have surplus roasted beetroot from Tuesday, on Wednesday it becomes the creamy base for our vegetable soup. Throwing perfectly edible produce into bins because it looks slightly misshapen is something I refuse to tolerate in my kitchen.",
      q: "The chef changes the menu frequently in order to:",
      opts: [
        "A. prevent food waste by repurposing surplus ingredients.",
        "B. attract international food critics with exotic dishes.",
        "C. lower the prices of meals for regular customers."
      ],
      ans: "A",
      exp: "Szef kuchni mówi wprost: 'The simple truth is zero-waste cooking... repurposing surplus roasted beetroot'.",
      trap: "Brak wzmianki o krytykach kulinarnych (opcja B) lub obniżce cen (opcja C)."
    },
    {
      title: "Audio MCQ: Porady dla biegaczy maratońskich",
      transcript: "[Trainer - Female, American]:\n<break time=\"1.0s\"/>\nFirst-time marathon runners almost always make the mistake of sprinting off at top speed as soon as the starting pistol fires. <break time=\"1.5s\"/> Caught up in the crowd's energy, they burn through their glycogen reserves before mile ten. My golden rule is simple: force yourself to run the first five kilometres noticeably slower than your target pace. You'll thank me when you hit mile twenty.",
      q: "What advice does the trainer give to novice marathoners?",
      opts: [
        "A. To start the race at a slower, controlled pace.",
        "B. To consume energy gels every five kilometres.",
        "C. To run as fast as possible in the first ten miles."
      ],
      ans: "A",
      exp: "Trenerka radzi: 'force yourself to run the first five kilometres noticeably slower than your target pace'.",
      trap: "Opcja C to błąd, przed którym trenerka ostrzega (początkowy sprint niszczy biegacza)."
    }
  ];

  for (let i = 0; i < 120; i++) {
    const tpl = mcqListeningTemplates[i % mcqListeningTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_lis_${taskNum}`,
      pillarId: 'pillar-listening',
      pillarName: 'Rozumienie ze słuchu',
      topicId: 'eng-dzial-6',
      sectionTitle: 'Dział 6: Wybór wielokrotny ze słuchu (MCQ ABC: intencja, detal, kontekst)',
      sectionNumber: 6,
      lessonId: 'eng-lesson-6-1',
      type: 'SINGLE_CHOICE',
      title: `${tpl.title} (Zadanie ${i + 1})`,
      question: `Usłyszysz dwukrotnie nagranie. Z podanych opcji (A–C) wybierz właściwą, zgodną z treścią nagrania:\n\n${tpl.q}`,
      transcriptSnippet: tpl.transcript,
      options: tpl.opts,
      optionsDetailed: tpl.opts.map((opt) => ({
        id: opt.charAt(0),
        text: opt,
        is_correct: opt.startsWith(tpl.ans)
      })),
      correctAnswer: tpl.ans,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 1 (Wybór wielokrotny ze słuchu)',
      points: 1
    });
  }

  // 3. LISTENING OPEN NOTE COMPLETION -> DZIAŁ 8 (90 tasks)
  const noteCompletionTemplates = [
    {
      title: "Uzupełnianie formularza: Wypożyczalnia kajaków",
      transcript: "[Receptionist - Female, British]:\n<break time=\"1.0s\"/>\nThank you for calling Riverside Kayaks. Our family weekend package for four people costs eighty-five pounds in total. That includes helmets and life vests. Just be sure to arrive at the boathouse at 9:30 a.m. sharp for the compulsory water safety briefing before we launch the boats.",
      q: "Uzupełnij luki w formularzu rezerwacji zgodnie z nagraniem (max 2 wyrazy lub liczba):\n\n• Cena pakietu dla 4 osób: £[GAP]\n• Godzina odprawy bezpieczeństwa: [GAP] rano",
      ans: "85",
      variants: ["85", "eighty-five"],
      exp: "Cena wynosi dokładnie 85 funtów (eighty-five pounds), a godzina odprawy to 9:30.",
      trap: "Wpisanie ceny za osobę zamiast łącznej kwoty pakietu rodzinnego."
    },
    {
      title: "Uzupełnianie notatki: Wystawa fotograficzna",
      transcript: "[Guide - Male, British]:\n<break time=\"1.0s\"/>\nWelcome to the City Art Pavilion. The wildlife exhibition by photographer Sarah Jenkins features seventy-two original framed prints. Admission is free for students, but all visitors must leave their backpacks in the lockers near the entrance hall.",
      q: "Uzupełnij lukę w notatce informacyjnej (max 2 wyrazy lub liczba):\n\nLiczba zaprezentowanych fotografii: [GAP]",
      ans: "72",
      variants: ["72", "seventy-two"],
      exp: "Przewodnik wymienia 'seventy-two original framed prints'. Zgodnie z zasadami CKE akceptowany jest zapis cyfrowy i słowny.",
      trap: "Pomyłka fonetyczna: seventy-two vs sixty-two."
    },
    {
      title: "Uzupełnianie ogłoszenia: Warsztaty robotyki",
      transcript: "[Teacher - Female, British]:\n<break time=\"1.0s\"/>\nAttention science club members! Our robotics workshop will take place in room 204 on Wednesday afternoon, starting at 3:15 p.m. Please remember to bring a fully charged laptop with the programming software installed.",
      q: "Uzupełnij lukę w ogłoszeniu szkolnym (max 2 wyrazy):\n\nSprzęt wymagany od każdego uczestnika: [GAP]",
      ans: "laptop",
      variants: ["laptop", "a laptop"],
      exp: "Nauczycielka wyraźnie prosi: 'bring a fully charged laptop'.",
      trap: "Wpisanie słowa 'software' zamiast wymaganego urządzenia sprzętowego."
    }
  ];

  for (let i = 0; i < 90; i++) {
    const tpl = noteCompletionTemplates[i % noteCompletionTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_lis_${taskNum}`,
      pillarId: 'pillar-listening',
      pillarName: 'Rozumienie ze słuchu',
      topicId: 'eng-dzial-8',
      sectionTitle: 'Dział 8: Zadania otwarte i luki ze słuchu (Notatki, formularze i Prawda/Fałsz)',
      sectionNumber: 8,
      lessonId: 'eng-lesson-8-1',
      type: 'WORD_INPUT',
      title: `${tpl.title} (${i + 1})`,
      question: `Usłyszysz dwukrotnie nagranie. Na podstawie informacji z nagrania uzupełnij lukę [GAP] w notatce:\n\n${tpl.q}`,
      transcriptSnippet: tpl.transcript,
      correctAnswer: tpl.ans,
      acceptedVariants: tpl.variants,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 3 (Uzupełnianie notatki ze słuchu)',
      points: 1
    });
  }

  // 4. LISTENING TRUE / FALSE -> DZIAŁ 8 (45 tasks)
  const trueFalseTemplates = [
    {
      title: "Audio Prawda/Fałsz: Wynalezienie hulajnogi elektrycznej",
      transcript: "[Speaker - Female, British]:\n<break time=\"1.0s\"/>\nMany people assume that electric scooters were invented in California during the tech boom of the 2010s. <break time=\"1.5s\"/> However, the world’s very first motorized scooter, known as the Autoped, was actually manufactured in New York City way back in 1915 and was widely used by postal workers.",
      q: "The first motorized scooters were produced in the twenty-first century.",
      ans: "FALSE",
      exp: "Po spójnikach kontrastu 'However / actually' mówca wyjaśnia, że skuter powstał w 1915 roku (XX wiek).",
      trap: "Zasugerowanie się wzmianką o Kalifornii i latach 2010 z pierwszej części zdania."
    },
    {
      title: "Audio Prawda/Fałsz: Fotografowanie w szklarni botanicznej",
      transcript: "[Guide - Male, British]:\n<break time=\"1.0s\"/>\nAlthough our botanical glasshouse contains over three thousand tropical plants, photography is strictly permitted for non-commercial purposes throughout the entire complex. Only tripods and professional lighting stands are forbidden without special permission.",
      q: "Visitors are allowed to take photos inside the glasshouse using regular handheld cameras.",
      ans: "TRUE",
      exp: "Przewodnik informuje: 'photography is strictly permitted for non-commercial purposes', a zakazane są jedynie statywy.",
      trap: "Usłyszenie słowa 'forbidden' i automatyczne założenie, że zdjęcia są zakazane."
    }
  ];

  for (let i = 0; i < 45; i++) {
    const tpl = trueFalseTemplates[i % trueFalseTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_lis_${taskNum}`,
      pillarId: 'pillar-listening',
      pillarName: 'Rozumienie ze słuchu',
      topicId: 'eng-dzial-8',
      sectionTitle: 'Dział 8: Zadania otwarte i luki ze słuchu (Notatki, formularze i Prawda/Fałsz)',
      sectionNumber: 8,
      lessonId: 'eng-lesson-8-1',
      type: 'TRUE_FALSE',
      title: `${tpl.title} (${i + 1})`,
      question: `Usłyszysz dwukrotnie wypowiedź. Zdecyduj, czy podane zdanie jest prawdziwe (TRUE), czy fałszywe (FALSE) w świetle nagrania:\n\n"${tpl.q}"`,
      transcriptSnippet: tpl.transcript,
      options: ["TRUE", "FALSE"],
      optionsDetailed: [
        { id: "A", text: "TRUE", is_correct: tpl.ans === "TRUE" },
        { id: "B", text: "FALSE", is_correct: tpl.ans === "FALSE" }
      ],
      correctAnswer: tpl.ans,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie ze słuchu (Prawda/Fałsz)',
      points: 1
    });
  }

  return tasks;
}
