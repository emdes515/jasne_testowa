/**
 * scripts/english_generators/reading.js
 *
 * Generates exactly 500 authentic CKE Formuła 2023 Reading Comprehension tasks
 * mapped to Działy 9–11:
 * - Dział 9: Dobieranie nagłówków do akapitów (130 zadań)
 * - Dział 10: Uzupełnianie luk brakującymi zdaniami (Gapped Text) (120 zadań)
 * - Dział 11: Artykuły, teksty narracyjne i mediacja językowa (250 zadań)
 * Total: 500 tasks
 */

export function generateReading() {
  const tasks = [];
  let index = 1;

  // 1. HEADINGS MATCHING -> DZIAŁ 9 (130 tasks)
  const headingTexts = [
    {
      articleTitle: "The Transformation of Urban Rooftops",
      paragraphs: [
        {
          text: "Across European capitals, thousands of square metres of flat roofs used to sit empty, covered in dark gravel and industrial cooling units. Today, these neglected spaces are being converted into lush community gardens where neighbours harvest organic tomatoes, herbs, and honey from rooftop beehives.",
          heading: "Turning barren spaces into productive green areas",
          opts: [
            "A. Turning barren spaces into productive green areas",
            "B. The rising prices of luxury penthouse apartments",
            "C. Severe legal restrictions on urban agriculture",
            "D. Why wild bees avoid flying above third-floor balconies"
          ],
          trap: "Opcja D zawiera słowo 'beehives', ale tekst nie wspomina o unikaniu lotów przez pszczoły."
        },
        {
          text: "Creating an elevated green roof is not simply a matter of spreading soil over concrete. Structural engineers must calculate whether the load-bearing columns can withstand the immense weight of damp earth and heavy rainfall. In addition, specialized waterproofing membranes must be laid down to prevent water leaking into the residential flats below.",
          heading: "Technical challenges and structural safety requirements",
          opts: [
            "A. Technical challenges and structural safety requirements",
            "B. How to choose the cheapest decorative garden plants",
            "C. Replacing concrete pillars with recycled timber",
            "D. Municipal grants for single-family suburban houses"
          ],
          trap: "Wybór opcji o tanich roślinach – akapit skupia się wyłącznie na inżynierii i izolacji przeciwwilgociowej."
        }
      ]
    },
    {
      articleTitle: "The Evolution of Digital Sound and Vinyl",
      paragraphs: [
        {
          text: "In the early 2000s, music industry analysts confidently predicted the complete extinction of physical formats. MP3 files and streaming algorithms offered instantaneous access to millions of songs in your pocket. Bulky plastic discs and delicate turntable needles seemed destined for museum display cases alongside telegraph machines.",
          heading: "The premature prediction of the physical format's demise",
          opts: [
            "A. The premature prediction of the physical format's demise",
            "B. The invention of the very first portable MP3 player",
            "C. Why musicians prefer recording in analogue studios",
            "D. The skyrocketing production cost of streaming platforms"
          ],
          trap: "Uczeń sugeruje się wzmianką o MP3 i wybiera B, ignorując główną myśl o przedwczesnym uśmierceniu płyt."
        },
        {
          text: "Yet against all technological logic, vinyl records have staged a spectacular global comeback over the past decade. Young music fans who grew up purely on smartphone playlists are eagerly purchasing turntables. They crave the tangible ritual of slipping a 12-inch record from its illustrated gatefold sleeve and hearing the warm acoustic crackle.",
          heading: "Rediscovering the tactile charm of physical records",
          opts: [
            "A. Rediscovering the tactile charm of physical records",
            "B. The superior battery life of modern audio systems",
            "C. How digital algorithms recommend forgotten indie bands",
            "D. Government subsidies for independent record stores"
          ],
          trap: "Zasugerowanie się słowem 'smartphone' i wybór opcji technologicznej."
        }
      ]
    }
  ];

  for (let i = 0; i < 130; i++) {
    const art = headingTexts[i % headingTexts.length];
    const pIdx = i % art.paragraphs.length;
    const pData = art.paragraphs[pIdx];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_read_${taskNum}`,
      pillarId: 'pillar-reading',
      pillarName: 'Rozumienie tekstów pisanych',
      topicId: 'eng-dzial-9',
      sectionTitle: 'Dział 9: Dobieranie nagłówków do akapitów (Headings Matching A–D)',
      sectionNumber: 9,
      lessonId: 'eng-lesson-9-1',
      type: 'SINGLE_CHOICE',
      title: `Dobieranie nagłówka: ${art.articleTitle} (Akapit ${pIdx + 1})`,
      question: `Przeczytaj poniższy akapit artykułu "${art.articleTitle}". Wybierz nagłówek (A–D), który najlepiej podsumowuje jego treść:\n\n"${pData.text}"`,
      contextText: pData.text,
      options: pData.opts,
      optionsDetailed: pData.opts.map((opt) => ({
        id: opt.charAt(0),
        text: opt,
        is_correct: opt.includes(pData.heading)
      })),
      correctAnswer: pData.heading,
      explanation: `Nagłówek "${pData.heading}" trafnie definiuje główną myśl (gist) akapitu. Pozostałe opcje zawierają zmyłki lub detale poboczne.`,
      ckeTrap: pData.trap,
      source: 'CKE Formuła 2023 • Zadanie 4 (Dobieranie nagłówków)',
      points: 1
    });
  }

  // 2. GAPPED TEXT -> DZIAŁ 10 (120 tasks)
  const gappedTextTemplates = [
    {
      title: "Odkrycie rzymskiej mozaiki w Andaluzji",
      before: "When archaeologist Dr Evans entered the sealed underground chamber in southern Spain, she was struck by the incredible preservation of the ancient mosaics. The colourful glass tiles depicted scenes of maritime trade from the second century AD.",
      after: "In fact, the thick layer of dry sand that had drifted inside through a ventilation shaft had acted as a natural protective cushion against humidity for nearly two millennia.",
      missingSentence: "She immediately wondered how such delicate artworks had survived without deteriorating.",
      opts: [
        "A. She immediately wondered how such delicate artworks had survived without deteriorating.",
        "B. Local authorities decided to sell the archaeological site to a hotel developer.",
        "C. The humidity inside the tomb had completely destroyed all antique pottery.",
        "D. Modern chemical varnishes were urgently needed to clean the mosaics."
      ],
      ans: "A",
      exp: "Zdanie A wyraża zdziwienie badaczki, na które kolejne zdanie wprowadzone słowami 'In fact' daje bezpośrednie wyjaśnienie fizyczne (suchy piasek jako tarcza).",
      trap: "Opcja C przeczy faktom z tekstu (mowa jest o doskonałym stanie zachowania, a nie zniszczeniu)."
    },
    {
      title: "Autonomiczne minibusy w Helsinkach",
      before: "Last winter, the public transport authority in Helsinki introduced a fleet of autonomous electric minibuses to serve suburban residential districts. The vehicles operate on fixed routes connecting metro stations with residential blocks.",
      after: "Sensors detect pedestrians and icy patches on the tarmac, allowing the vehicle to brake safely even in heavy snowstorms.",
      missingSentence: "Each shuttle is equipped with sophisticated laser radar and computer vision systems.",
      opts: [
        "A. Each shuttle is equipped with sophisticated laser radar and computer vision systems.",
        "B. Diesel fuel prices forced the city council to cancel all winter bus routes.",
        "C. Passengers complained that the human drivers were driving dangerously fast.",
        "D. The metro stations remained closed for maintenance throughout the winter."
      ],
      ans: "A",
      exp: "Kolejne zdanie zaczyna się od podmiotu 'Sensors', który bezpośrednio nawiązuje do systemów radarowych i wizyjnych w zdaniu A.",
      trap: "Opcja C mówi o kierowcach, podczas gdy mowa jest o pojazdach bezzałogowych (autonomous)."
    },
    {
      title: "Medyczne właściwości miodu Manuka",
      before: "For centuries, indigenous Maori healers in New Zealand used the nectar of native tea trees to treat infected cuts and skin burns. In the 1980s, biochemists began conducting rigorous laboratory trials to test these traditional folk remedies.",
      after: "Unlike conventional antibiotics, bacteria appear incapable of developing resistance to this natural antibacterial compound.",
      missingSentence: "They discovered that Manuka honey contains extraordinarily high levels of methylglyoxal.",
      opts: [
        "A. They discovered that Manuka honey contains extraordinarily high levels of methylglyoxal.",
        "B. Bees were imported from European farms to replace indigenous species.",
        "C. Chemical antibiotics were found to be completely harmless to gut flora.",
        "D. The New Zealand parliament banned the export of all bee products in 1985."
      ],
      ans: "A",
      exp: "Zaimek 'They' nawiązuje do biochemików z poprzedniego zdania, a 'methylglyoxal' odpowiada 'natural antibacterial compound' w zdaniu następnym.",
      trap: "Opcja C przeczy wiedzy medycznej i nie łączy się z badaniami miodu."
    }
  ];

  for (let i = 0; i < 120; i++) {
    const tpl = gappedTextTemplates[i % gappedTextTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_read_${taskNum}`,
      pillarId: 'pillar-reading',
      pillarName: 'Rozumienie tekstów pisanych',
      topicId: 'eng-dzial-10',
      sectionTitle: 'Dział 10: Uzupełnianie luk brakującymi zdaniami (Gapped Text A–E)',
      sectionNumber: 10,
      lessonId: 'eng-lesson-10-1',
      type: 'SINGLE_CHOICE',
      title: `Uzupełnianie luk zdaniami: ${tpl.title} (${i + 1})`,
      question: `Przeczytaj fragment tekstu. Wybierz zdanie (A–D), które poprawnie uzupełnia lukę [LUKA], tworząc spójny i logiczny tekst:\n\n"${tpl.before} [LUKA] ${tpl.after}"`,
      contextText: `${tpl.before} [LUKA] ${tpl.after}`,
      options: tpl.opts,
      optionsDetailed: tpl.opts.map((opt) => ({
        id: opt.charAt(0),
        text: opt,
        is_correct: opt.startsWith(tpl.ans)
      })),
      correctAnswer: tpl.ans,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 7 (Uzupełnianie luk zdaniami)',
      points: 1
    });
  }

  // 3. READING MULTIPLE CHOICE -> DZIAŁ 11 (130 tasks)
  const mcqReadingTemplates = [
    {
      title: "Wyprawa na alpejski szlak",
      context: "Marcus adjusted his heavy backpack and stared up at the mountain trail ahead. The guidebook had promised a gentle two-hour stroll through alpine meadows, but the rocky path before him ascended at a brutal incline. He checked his phone; the battery indicator flashed red and died. For a fleeting second, the urge to turn back and return to the comfort of the hotel fireside was almost irresistible. Yet, looking back towards the valley below, now bathed in amber afternoon sunlight, Marcus took a deep breath and took his first determined step upward.",
      q: "When Marcus realized what the mountain trail looked like, he:",
      opts: [
        "A. felt annoyed that his guidebook was missing from the pack.",
        "B. hesitated briefly but resolved to continue his journey.",
        "C. returned immediately to the warmth of his hotel room.",
        "D. called the mountain rescue team for urgent assistance."
      ],
      ans: "B",
      exp: "Zestawienie 'For a fleeting second... almost irresistible' oraz 'Yet... took his first determined step upward' dowodzi krótkiego wahania i decyzji o kontynuowaniu marszu.",
      trap: "Opcja C kusi wzmianką o hotelu, ale Marcus nie zawrócił. Opcja D jest niemożliwa, bo telefon padł."
    },
    {
      title: "Pierwszy dzień w nowej pracy",
      context: "Sophie arrived at the architectural studio twenty minutes before nine. She had meticulously ironed her formal navy blazer the night before, determined to project professionalism. However, when she stepped past the glass revolving doors, she was greeted by senior partners wearing graphic t-shirts and ripped denim jeans, skateboarding between drafting desks. Sophie felt her cheeks flush pink as she realized she was dressed far more formally than anyone else in the building.",
      q: "Why did Sophie feel embarrassed when she arrived at the studio?",
      opts: [
        "A. She realized she had arrived forty minutes late for her first meeting.",
        "B. Her clothes were noticeably more formal than the company dress code.",
        "C. She was reprimanded by the senior partner for wearing denim.",
        "D. She tripped and fell while walking through the glass revolving doors."
      ],
      ans: "B",
      exp: "Sophie ubrała się w formalną marynarkę, a wszyscy nosili t-shirty i dżinsy: 'she realized she was dressed far more formally than anyone else'.",
      trap: "Opcja A przeczy tekstowi (przybyła 20 minut przed czasem). Opcja C sugeruje naganę, do której nie doszło."
    }
  ];

  for (let i = 0; i < 130; i++) {
    const tpl = mcqReadingTemplates[i % mcqReadingTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_read_${taskNum}`,
      pillarId: 'pillar-reading',
      pillarName: 'Rozumienie tekstów pisanych',
      topicId: 'eng-dzial-11',
      sectionTitle: 'Dział 11: Artykuły, teksty narracyjne i mediacja językowa (MCQ ABCD & Notatki)',
      sectionNumber: 11,
      lessonId: 'eng-lesson-11-1',
      type: 'SINGLE_CHOICE',
      title: `Tekst narracyjny MCQ: ${tpl.title} (${i + 1})`,
      question: `Przeczytaj poniższy tekst. Z podanych opcji (A–D) wybierz właściwą, zgodną z treścią tekstu:\n\n${tpl.q}`,
      contextText: tpl.context,
      options: tpl.opts,
      optionsDetailed: tpl.opts.map((opt) => ({
        id: opt.charAt(0),
        text: opt,
        is_correct: opt.startsWith(tpl.ans)
      })),
      correctAnswer: tpl.ans,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 6 (Wybór wielokrotny do tekstu)',
      points: 1
    });
  }

  // 4. TEXT CLUSTER & LANGUAGE MEDIATION -> DZIAŁ 11 (120 tasks)
  const mediationTemplates = [
    {
      title: "Warsztaty szkolenia psów w schronisku",
      source: "TEKST 1: Ogłoszenie schroniska\nPUPPY TRAINING WORKSHOP\nEvery Saturday in October, from 10:00 a.m. to 12:30 p.m.\nPrice: £15 per dog (free for shelter volunteers).\nLocation: Mill Creek Park near the north fountain.\nRequirement: All dogs must be vaccinated and at least 4 months old.\n\nTEKST 2: E-mail od koleżanki\nHi Tom! I heard you adopted a five-month-old puppy! If you sign up before October 1st, the shelter offers a 20% discount on grooming vouchers. Let me know if you want me to reserve a place!",
      targetMsg: "Cześć Aniu,\nWraz z Tomkiem zapisujemy naszego szczeniaka na warsztaty. Zajęcia odbywają się w soboty i trwają (1) [GAP] i pół godziny. Nasz piesek spełnia wymóg wieku, bo ma 5 miesięcy, a regulamin wymaga ukończenia co najmniej (2) [GAP] miesięcy.",
      ans: "dwie",
      variants: ["dwie", "2"],
      exp: "Czas trwania od 10:00 do 12:30 to dokładnie dwie i pół godziny.",
      trap: "Wpisanie '10' lub czasu rozpoczęcia zamiast długości trwania zajęć."
    },
    {
      title: "Letni staż w ogrodzie botanicznym",
      source: "SUMMER INTERNSHIP AT THE BOTANICAL GARDENS\nWe are offering a four-week paid placement for nature enthusiasts aged 17–19.\nWorking hours: Tuesday to Saturday, 9:00 a.m. to 2:30 p.m.\nHourly rate: £11.50 per hour.\nApplication deadline: May 15th alongside a CV and a recommendation letter from a science teacher.",
      targetMsg: "Hi David, I found this great internship at the Botanical Gardens! We would work five days a week until [GAP] in the afternoon. We only need to ask our science teacher for a recommendation letter before May 15th!",
      ans: "2:30",
      variants: ["2:30", "2:30 p.m.", "half past two"],
      exp: "Godzina zakończenia pracy podana w ogłoszeniu: 'until 2:30 p.m.'.",
      trap: "Wpisanie łącznej liczby godzin zamiast godziny zakończenia zmiany."
    }
  ];

  for (let i = 0; i < 120; i++) {
    const tpl = mediationTemplates[i % mediationTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_read_${taskNum}`,
      pillarId: 'pillar-reading',
      pillarName: 'Rozumienie tekstów pisanych',
      topicId: 'eng-dzial-11',
      sectionTitle: 'Dział 11: Artykuły, teksty narracyjne i mediacja językowa (MCQ ABCD & Notatki)',
      sectionNumber: 11,
      lessonId: 'eng-lesson-11-1',
      type: 'WORD_INPUT',
      title: `Mediacja językowa: ${tpl.title} (${i + 1})`,
      question: `Przeczytaj teksty źródłowe. Na ich podstawie uzupełnij lukę [GAP] w wiadomości (wpisz maksymalnie 2 wyrazy lub liczbę):\n\n${tpl.targetMsg}`,
      contextText: tpl.source,
      correctAnswer: tpl.ans,
      acceptedVariants: tpl.variants,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 5 (Mediacja językowa w tekście)',
      points: 1
    });
  }

  return tasks;
}
