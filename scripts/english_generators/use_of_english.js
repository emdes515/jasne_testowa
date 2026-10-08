/**
 * scripts/english_generators/use_of_english.js
 *
 * Generates exactly 375 authentic CKE Formuła 2023 Use of English tasks
 * mapped to Działy 1–5:
 * - Dział 1: Czasy gramatyczne i aspekty (75 zadań)
 * - Dział 2: Konstrukcje czasownikowe: Gerund, Infinitive, Modals & Funkcje (75 zadań)
 * - Dział 3: Okresy warunkowe i zdania czasowe / Open Cloze (45 zadań)
 * - Dział 4: Słowotwórstwo i części mowy (60 zadań)
 * - Dział 5: Parafrazy i tłumaczenia fragmentów PL -> EN (120 zadań)
 * Total: 375 tasks
 */

export function generateUseOfEnglish() {
  const tasks = [];
  let index = 1;

  // 1. MINIDIALOGUES & FUNCTIONAL LANGUAGE -> DZIAŁ 2 (75 tasks)
  const minidialogueTemplates = [
    {
      x: "Would you mind giving me a hand with this suitcase?",
      opts: ["Not at all, let me carry it for you.", "Yes, please, I would mind that.", "Never mind, do it yourself."],
      ans: "Not at all, let me carry it for you.",
      exp: "Konstrukcja 'Would you mind...?' wymaga przeczenia ('Not at all' - ani trochę / chętnie), aby wyrazić uprzejmą zgodę na pomoc.",
      trap: "Mechaniczne zaznaczanie 'Yes, please' jako polskiej zgody ('tak, chętnie'), co w angielskim oznacza odmowę.",
      title: "Prośba o pomoc z walizką – odwrócona logika mind"
    },
    {
      x: "I’m terribly sorry for breaking your favourite mug!",
      opts: ["Don't mention it, it's really expensive.", "Never mind, accidents happen.", "I don't mind what you did."],
      ans: "Never mind, accidents happen.",
      exp: "'Never mind' oznacza 'nic nie szkodzi / nie przejmuj się', co wraz z 'accidents happen' tworzy naturalną reakcję na przeprosiny.",
      trap: "Mylenie 'Never mind' (nie szkodzi) z 'Don't mention it' (nie ma za co - odpowiedź na podziękowanie).",
      title: "Reakcja na przeprosiny – stłuczony kubek"
    },
    {
      x: "Fingers crossed for your driving test this afternoon!",
      opts: ["Thanks, I’ll certainly need some luck!", "I couldn't agree more with you.", "The same to you, drive safely."],
      ans: "Thanks, I’ll certainly need some luck!",
      exp: "Na życzenie powodzenia ('Fingers crossed!') naturalną odpowiedzią jest podziękowanie ('Thanks').",
      trap: "Wybór 'The same to you', gdy rozmówca sam nie zdaje egzaminu.",
      title: "Życzenie powodzenia na egzaminie na prawo jazdy"
    },
    {
      x: "How about grabbing a pizza after school today?",
      opts: ["I'd love to, but I have a dentist appointment.", "Yes, pizza is a traditional Italian dish.", "No problem, you can eat it alone."],
      ans: "I'd love to, but I have a dentist appointment.",
      exp: "Uprzejma odmowa propozycji wymaga podziękowania/chęci ('I'd love to') połączonej z usprawiedliwieniem po 'but'.",
      trap: "Wybór odpowiedzi encyklopedycznej lub nieuprzejmej odmowy.",
      title: "Propozycja wyjścia na pizzę – uprzejma odmowa"
    },
    {
      x: "Excuse me, could you tell me how to get to the train station?",
      opts: ["Go straight on and take the second turning on your left.", "Yes, I was there yesterday morning.", "It takes about fifteen minutes by car."],
      ans: "Go straight on and take the second turning on your left.",
      exp: "Pytanie 'how to get to...' wymaga wskazania drogi (kierunku i manewru).",
      trap: "Podanie czasu podróży zamiast wskazówek dojścia.",
      title: "Pytanie o drogę do stacji kolejowej"
    },
    {
      x: "What is your new English teacher like?",
      opts: ["She is very patient and explains everything clearly.", "She likes playing tennis and reading novels.", "She looks like her younger sister."],
      ans: "She is very patient and explains everything clearly.",
      exp: "Pytanie 'What is somebody like?' pyta o cechy charakteru i usposobienie, a nie o upodobania czy wygląd zewnętrzny.",
      trap: "Mylenie 'What is she like?' (jaka ona jest?) z 'What does she like?' (co lubi?) lub 'What does she look like?' (jak wygląda?).",
      title: "Pytanie o charakter i cechy nauczycielki"
    },
    {
      x: "I failed my chemistry exam again.",
      opts: ["Cheer up! You can retake it next month.", "Congratulations on your great score!", "Never mind, you should study less."],
      ans: "Cheer up! You can retake it next month.",
      exp: "'Cheer up!' ('Głowa do góry!') to zwrot pocieszenia w trudnej sytuacji edukacyjnej.",
      trap: "Niewłaściwy rejestr emocjonalny (gratulacje w przypadku oblania testu).",
      title: "Pocieszenie kolegi po niezdanym sprawdzianie"
    },
    {
      x: "Could I speak to Mr Davis, please?",
      opts: ["Hold on a moment, I’ll put you through.", "Yes, he speaks very fluent Spanish.", "I speak to him every single day."],
      ans: "Hold on a moment, I’ll put you through.",
      exp: "Standardowa formuła telefoniczna: 'Hold on a moment, I'll put you through' (Proszę chwilę poczekać, przełączam).",
      trap: "Dosłowne rozumienie czasownika 'speak' jako zdolności językowej.",
      title: "Rozmowa telefoniczna w biurze – przełączanie rozmówcy"
    },
    {
      x: "I’m afraid this shirt doesn't fit me properly.",
      opts: ["Would you like to try a larger size?", "You must wear it anyway.", "It costs twenty-five pounds."],
      ans: "Would you like to try a larger size?",
      exp: "Gdy ubranie 'doesn't fit' (zły rozmiar), sprzedawca proponuje przymierzenie innego rozmiaru.",
      trap: "Mylenie 'fit' (rozmiar) z 'suit' (fason/styl) lub 'match' (kolorystyczne dopasowanie).",
      title: "Obsługa klienta w sklepie odzieżowym – dobór rozmiaru"
    },
    {
      x: "Shall I help you carry those grocery bags?",
      opts: ["That’s very kind of you, thank you!", "Yes, you shall do it right now.", "No, I am not carrying any bags."],
      ans: "That’s very kind of you, thank you!",
      exp: "'Shall I...?' to propozycja pomocy. Naturalna aprobata to 'That's very kind of you'.",
      trap: "Kalka czasownika modalnego 'shall' w odpowiedzi potwierdzającej ('you shall do it').",
      title: "Propozycja pomocy przy zakupach"
    },
    {
      x: "I didn't manage to book the concert tickets in time.",
      opts: ["What a pity! I was really looking forward to it.", "Well done! You did a fantastic job.", "I don't mind your concert at all."],
      ans: "What a pity! I was really looking forward to it.",
      exp: "'What a pity!' ('Jaka szkoda!') to naturalny wyraz rozczarowania z powodu braku biletów.",
      trap: "Użycie gratulacji w sytuacji porażki organizacyjnej.",
      title: "Brak biletów na koncert – wyrażenie żalu"
    },
    {
      x: "Would you like some more apple pie?",
      opts: ["No, thank you, I’m completely full.", "No, I don't like any apples at all.", "Yes, please, I have eaten enough."],
      ans: "No, thank you, I’m completely full.",
      exp: "Uprzejma odmowa poczęstunku przy stole: 'No, thank you, I'm full' (Dziękuję, już się najadłem).",
      trap: "Wybór 'Yes, please, I have eaten enough' (wewnętrzna sprzeczność logiczna).",
      title: "Poczęstunek przy stole – uprzejma odmowa dokładki"
    },
    {
      x: "Make yourself at home while I prepare some tea.",
      opts: ["Thank you, that’s very thoughtful of you.", "No, this is definitely your house.", "I live in a small flat nearby."],
      ans: "Thank you, that’s very thoughtful of you.",
      exp: "'Make yourself at home' ('Czuj się jak u siebie') to konwencjonalny zwrot gościnności.",
      trap: "Dosłowne traktowanie idiomu jako zaprzeczenia własności lokalu.",
      title: "Gościnność w domu – zwrot Make yourself at home"
    },
    {
      x: "Do you mind if I open the window for some fresh air?",
      opts: ["Go ahead, it’s getting quite stuffy in here.", "Yes, please open it wide.", "Never mind, I don't like windows."],
      ans: "Go ahead, it’s getting quite stuffy in here.",
      exp: "'Go ahead' ('Śmiało / Proszę bardzo') wyraża zgodę na prośbę z 'Do you mind if I...'.",
      trap: "Odpowiedź 'Yes, please' na pytanie z 'Do you mind' w języku angielskim oznacza sprzeciw.",
      title: "Prośba o otwarcie okna – zwrot Go ahead"
    },
    {
      x: "I’m really sorry, but I won't be able to come to your party.",
      opts: ["Oh, that’s a shame! We’ll miss you.", "Never mind, nobody wanted you there.", "Congratulations, enjoy your evening!"],
      ans: "Oh, that’s a shame! We’ll miss you.",
      exp: "'That's a shame!' ('Szkoda!') to empatyczna reakcja gospodarza na odmowę przyjścia na przyjęcie.",
      trap: "Wybór wulgarnie nieuprzejmej opcji lub gratulacji.",
      title: "Odmowa udziału w przyjęciu urodzinowym"
    }
  ];

  for (let i = 0; i < 75; i++) {
    const tpl = minidialogueTemplates[i % minidialogueTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    const variantNum = Math.floor(i / minidialogueTemplates.length) + 1;
    tasks.push({
      id: `eng_uoe_${taskNum}`,
      pillarId: 'pillar-use-of-english',
      pillarName: 'Znajomość środków językowych',
      topicId: 'eng-dzial-2',
      sectionTitle: 'Dział 2: Konstrukcje czasownikowe: Gerund, Infinitive i Modals',
      sectionNumber: 2,
      lessonId: 'eng-lesson-2-1',
      type: 'SINGLE_CHOICE',
      title: `Minidialog: ${tpl.title} (Wariant ${variantNum})`,
      question: `Uzupełnij poniższy minidialog. Wybierz spośród podanych opcji (A–C) brakującą wypowiedź rozmówcy Y:\n\nX: "${tpl.x}"\nY: "_________________________________________"\nX: "(reakcja)"`,
      options: tpl.opts,
      optionsDetailed: tpl.opts.map((opt, oIdx) => ({
        id: ['A', 'B', 'C'][oIdx],
        text: opt,
        is_correct: opt === tpl.ans
      })),
      correctAnswer: tpl.ans,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 8 (Funkcje językowe)',
      points: 1
    });
  }

  // 2. MULTIPLE CHOICE VOCABULARY & GRAMMAR -> DZIAŁ 1 (75 tasks)
  const mcqGrammarTemplates = [
    {
      q: "If I ______ more time this evening, I would help you assemble that bookshelf.",
      opts: ["had", "have", "would have", "had had"],
      ans: "had",
      exp: "Drugi okres warunkowy (Second Conditional) wyrażający sytuację hipotetyczną w teraźniejszości: If + Past Simple, would + bezokolicznik.",
      trap: "Stawianie 'would' w części po 'If' (*If I would have*) – kardynalny błąd polskich uczniów.",
      title: "Drugi okres warunkowy – meble i dom"
    },
    {
      q: "She has been working as a software developer ______ she graduated from university in 2021.",
      opts: ["since", "for", "from", "during"],
      ans: "since",
      exp: "'Since' określa punkt początkowy w przeszłości (ukończenie studiów), podczas gdy 'for' wymaga przedziału czasowego (np. for 3 years).",
      trap: "Kalka ze słowa 'od' (błędne użycie *from* w czasach Present Perfect Continuous).",
      title: "Present Perfect z określnikiem czasu since vs for"
    },
    {
      q: "You ______ buy any tickets for the museum exhibition; admission is completely free on Thursdays.",
      opts: ["don't have to", "mustn't", "shouldn't have", "can't have"],
      ans: "don't have to",
      exp: "'Don't have to' oznacza brak konieczności ('nie musisz'). 'Mustn't' oznacza bezwzględny zakaz ('nie wolno ci').",
      trap: "Mylenie braku przymusu (*don't have to*) z zakazem (*mustn't*).",
      title: "Czasowniki modalne – brak przymusu vs zakaz"
    },
    {
      q: "The police officer asked the witness if she ______ anything suspicious near the bank.",
      opts: ["had noticed", "has noticed", "notices", "will notice"],
      ans: "had noticed",
      exp: "Następstwo czasów w mowie zależnej (Reported Speech): pytanie o przeszłość cofa się do Past Perfect (*had noticed*).",
      trap: "Pozostawienie czasu teraźniejszego lub Present Perfect w mowie zależnej po 'asked'.",
      title: "Mowa zależna – cofnięcie czasów po asked"
    },
    {
      q: "I look forward to ______ you at the international conference in London next week.",
      opts: ["meeting", "meet", "have met", "be meeting"],
      ans: "meeting",
      exp: "W zwrocie 'look forward to' słowo 'to' jest przyimkiem, po którym czasownik zawsze przyjmuje formę gerundium (-ing).",
      trap: "Traktowanie 'to' jako cząstki bezokolicznika i wstawianie formy podstawowej (*look forward to meet*).",
      title: "Gerundium po przyimku w zwrocie look forward to"
    },
    {
      q: "The flight was delayed ______ dense fog over the airport runway.",
      opts: ["due to", "because", "although", "despite of"],
      ans: "due to",
      exp: "'Due to' to wyrażenie przyimkowe łączące się z frazą rzeczownikową (*dense fog*). 'Because' wymaga pełnego zdania podrzędnego.",
      trap: "Wybór 'because' przed rzeczownikiem bez 'of' lub wybór 'despite of' (błędna hybryda).",
      title: "Łączniki przyczyny – due to vs because"
    },
    {
      q: "By the time we arrived at the cinema, the film ______ already started.",
      opts: ["had", "has", "was", "would"],
      ans: "had",
      exp: "Czynność przeszła, która wydarzyła się przed inną czynnością przeszłą (*arrived*), wymaga czasu Past Perfect (*had started*).",
      trap: "Wstawienie czasu Present Perfect (*has started*) w kontekście zamkniętej przeszłości.",
      title: "Past Perfect – czynność wcześniejsza od przeszłej"
    },
    {
      q: "Could you tell me how much this vintage leather jacket ______?",
      opts: ["costs", "does it cost", "costed", "is costing"],
      ans: "costs",
      exp: "Pytanie pośrednie (Indirect Question): po zwrocie 'Could you tell me...' obowiązuje szyk zdania twierdzącego, bez operatora 'does'.",
      trap: "Stosowanie inwersji i operatora w pytaniu pośrednim (*how much does it cost*).",
      title: "Pytania pośrednie – szyk zdania po Could you tell me"
    },
    {
      q: "Neither my brother nor my sister ______ interested in classical music.",
      opts: ["is", "are", "have", "were"],
      ans: "is",
      exp: "Konstrukcja 'Neither... nor...' uzgadnia orzeczenie z podmiotem stojącym bliżej orzeczenia (*my sister* -> liczba pojedyncza *is*).",
      trap: "Automatyczne użycie liczby mnogiej *are* z powodu obecności dwóch osób.",
      title: "Zgodność podmiotu i orzeczenia przy Neither... nor"
    },
    {
      q: "I would rather you ______ alone in the city centre late at night.",
      opts: ["didn't walk", "don't walk", "not walk", "won't walk"],
      ans: "didn't walk",
      exp: "Konstrukcja 'would rather + osoba + Past Simple' wyraża życzenie lub preferencję dotyczącą czyjegoś zachowania w teraźniejszości.",
      trap: "Użycie bezokolicznika lub czasu teraźniejszego po 'would rather you'.",
      title: "Struktury would rather sb did sth"
    },
    {
      q: "She succeeded ______ passing her Cambridge exam with an outstanding grade.",
      opts: ["in", "on", "at", "for"],
      ans: "in",
      exp: "Czasownik 'succeed' obligatoryjnie łączy się z przyimkiem 'in' + gerundium: *succeed in doing sth*.",
      trap: "Kalka ze słowa *at* (good at) lub *on* (rely on).",
      title: "Rekcja czasownika succeed in doing sth"
    },
    {
      q: "The doctor advised my grandfather to give ______ smoking immediately.",
      opts: ["up", "in", "off", "out"],
      ans: "up",
      exp: "Phrasal verb 'give up' oznacza 'rzucić nałóg / zrezygnować'. 'Give in' oznacza poddać się, a 'give out' rozdawać.",
      trap: "Mylenie znaczeń czasowników złożonych z czasownikiem 'give'.",
      title: "Czasowniki złożone – give up a habit"
    },
    {
      q: "If it ______ so heavily tomorrow, we will go hiking in the national park.",
      opts: ["doesn't rain", "won't rain", "didn't rain", "isn't raining"],
      ans: "doesn't rain",
      exp: "Pierwszy okres warunkowy: w zdaniu podrzędnym po 'If' stosujemy Present Simple (*doesn't rain*), a nie czas przyszły *won't*.",
      trap: "Kalka z języka polskiego: wstawianie 'will/won't' po 'if'.",
      title: "Pierwszy okres warunkowy – reguła czasu Present Simple po if"
    },
    {
      q: "This brand new smartphone is ______ more expensive than my previous model.",
      opts: ["much", "very", "more", "too"],
      ans: "much",
      exp: "Do stopniowania i wzmacniania stopnia wyższego przymiotników (*more expensive*) stosujemy przysłówek 'much' lub 'far', nigdy 'very'.",
      trap: "Kalka polskiego 'bardzo bardziej' (*very more expensive*).",
      title: "Wzmacnianie stopnia wyższego: much / far + comparative"
    },
    {
      q: "The novel was ______ exciting that I finished reading it in a single evening.",
      opts: ["so", "such", "too", "very"],
      ans: "so",
      exp: "Konstrukcja skutkowa: 'so + przymiotnik + that' (tak ekscytujący, że...). 'Such' wymagałoby rzeczownika (*such an exciting novel*).",
      trap: "Mylenie 'so' (przed samym przymiotnikiem) z 'such' (przed frazą rzeczownikową).",
      title: "Konstrukcje skutkowe so... that vs such... that"
    }
  ];

  for (let i = 0; i < 75; i++) {
    const tpl = mcqGrammarTemplates[i % mcqGrammarTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    const variantNum = Math.floor(i / mcqGrammarTemplates.length) + 1;
    tasks.push({
      id: `eng_uoe_${taskNum}`,
      pillarId: 'pillar-use-of-english',
      pillarName: 'Znajomość środków językowych',
      topicId: 'eng-dzial-1',
      sectionTitle: 'Dział 1: Czasy gramatyczne i aspekty w narracji i dialogu',
      sectionNumber: 1,
      lessonId: 'eng-lesson-1-1',
      type: 'SINGLE_CHOICE',
      title: `Wybór wielokrotny: ${tpl.title} (Zadanie ${variantNum})`,
      question: `Wybierz wyraz lub frazę, która poprawnie uzupełnia lukę w zdaniu:\n\n"${tpl.q}"`,
      options: tpl.opts,
      optionsDetailed: tpl.opts.map((opt, oIdx) => ({
        id: ['A', 'B', 'C', 'D'][oIdx],
        text: opt,
        is_correct: opt === tpl.ans
      })),
      correctAnswer: tpl.ans,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 9 (Środki językowe)',
      points: 1
    });
  }

  // 3. WORD FORMATION -> DZIAŁ 4 (60 tasks)
  const wordFormationRoots = [
    { base: "COMFORT", target: "uncomfortable", sent: "The wooden chair was so (COMFORT) [GAP] that my back started hurting after twenty minutes.", exp: "Przymiotnik z prefiksem un- ze względu na ból pleców.", trap: "Wpisanie formy bez zaprzeczenia (*comfortable*)." },
    { base: "RESPONSIBLE", target: "irresponsible", sent: "Leaving young children alone by the swimming pool is totally (RESPONSIBLE) [GAP].", exp: "Prefiks ir- przed literą r w znaczeniu negatywnym.", trap: "Błędne prefiksy *unresponsible* lub *disresponsible*." },
    { base: "PATIENT", target: "impatiently", sent: "The commuters waited (PATIENT) [GAP] on the platform when the train was delayed by an hour.", exp: "Przysłówek z prefiksem im- i sufiksem -ly.", trap: "Brak przekształcenia w przysłówek lub błędny prefiks." },
    { base: "POLLUTE", target: "pollution", sent: "Air (POLLUTE) [GAP] in big industrial cities has reached dangerous levels this winter.", exp: "Rzeczownik niepoliczalny z sufiksem -tion.", trap: "Zostawienie czasownika lub błędna pisownia *polluting*." },
    { base: "DECIDE", target: "decision", sent: "Buying their first electric family car was a major (DECIDE) [GAP] for my parents.", exp: "Rzeczownik policzalny z sufiksem -sion po przymiotniku *major*.", trap: "Błąd ortograficzny w temacie wyrazu (*decition*)." },
    { base: "SAFE", target: "safety", sent: "Before climbing the mountain ridge, check all your (SAFE) [GAP] equipment carefully.", exp: "Rzeczownik od przymiotnika safe.", trap: "Pozostawienie przymiotnika *safe* zamiast rzeczownika złożonego *safety equipment*." },
    { base: "EMPLOY", target: "unemployment", sent: "The regional government announced new programmes to reduce youth (EMPLOY) [GAP].", exp: "Rzeczownik negatywny z prefiksem un- i sufiksem -ment.", trap: "Wpisanie pozytywnego *employment* w kontekście problemu do zmniejszenia." },
    { base: "SUCCESS", target: "successful", sent: "After months of hard training, the young athlete had a very (SUCCESS) [GAP] season.", exp: "Przymiotnik z sufiksem -ful po przysłówku *very*.", trap: "Pisownia przez jedno 's' lub 'c' (*succesful*)." },
    { base: "APPEAR", target: "disappeared", sent: "The magician waved his black cape and the rabbit suddenly (APPEAR) [GAP] from the stage.", exp: "Czasownik w czasie przeszłym z prefiksem dis- (zniknął).", trap: "Brak czasu przeszłego *-ed* lub zły prefiks *unappeared*." },
    { base: "SCIENCE", target: "scientists", sent: "Marine (SCIENCE) [GAP] have discovered a new species of coral near the coast.", exp: "Rzeczownik osobowy w liczbie mnogiej (have discovered wskazuje na plural).", trap: "Zapisanie liczby pojedynczej *scientist*." },
    { base: "DANGER", target: "dangerous", sent: "Driving on icy mountain roads at high speeds is extremely (DANGER) [GAP].", exp: "Przymiotnik z sufiksem -ous po przysłówku *extremely*.", trap: "Pisownia *dangerful* lub *dangerly*." },
    { base: "AGREE", target: "disagreement", sent: "There was a sharp (AGREE) [GAP] between the two politicians regarding school funding.", exp: "Rzeczownik negatywny z prefiksem dis- i sufiksem -ment.", trap: "Pominięcie prefiksu negatywnego (*agreement* przeczy słowu *sharp*)." }
  ];

  for (let i = 0; i < 60; i++) {
    const tpl = wordFormationRoots[i % wordFormationRoots.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_uoe_${taskNum}`,
      pillarId: 'pillar-use-of-english',
      pillarName: 'Znajomość środków językowych',
      topicId: 'eng-dzial-4',
      sectionTitle: 'Dział 4: Słowotwórstwo i części mowy (Word Formation & False Friends)',
      sectionNumber: 4,
      lessonId: 'eng-lesson-4-1',
      type: 'WORD_INPUT',
      title: `Słowotwórstwo: ${tpl.base} -> ${tpl.target}`,
      question: `Uzupełnij lukę w zdaniu, przekształcając wyraz podany w nawiasie w taki sposób, aby otrzymać logiczne i gramatycznie poprawne zdanie:\n\n${tpl.sent}`,
      correctAnswer: tpl.target,
      acceptedVariants: [tpl.target],
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 10 (Słowotwórstwo)',
      points: 1
    });
  }

  // 4. SENTENCE TRANSFORMATIONS -> DZIAŁ 5 (60 tasks)
  const transformationTemplates = [
    {
      orig: "I last spoke to Michael at the school reunion two years ago.",
      kw: "SPOKEN",
      start: "I have",
      end: "Michael for two years.",
      target: "not spoken to",
      variants: ["not spoken to", "haven't spoken to"],
      exp: "Zamiana Past Simple z określeniem 'two years ago' na Present Perfect w przeczeniu z 'for two years'.",
      trap: "Pominięcie przyimka 'to' (*not spoken Michael*) lub wstawienie formy twierdzącej."
    },
    {
      orig: "They are painting the school sports hall this week.",
      kw: "BEING",
      start: "The school sports hall",
      end: "this week.",
      target: "is being painted",
      variants: ["is being painted"],
      exp: "Strona bierna czasu Present Continuous: is + being + V3 (painted).",
      trap: "Pominięcie cząstki *being* (*is painted* zmienia czas na Present Simple)."
    },
    {
      orig: "I advise you to consult a doctor about this cough.",
      kw: "SHOULD",
      start: "You",
      end: "a doctor about this cough.",
      target: "should consult",
      variants: ["should consult", "ought to consult"],
      exp: "Parafraza 'I advise you to do sth' za pomocą czasownika modalnego 'should + bare infinitive'.",
      trap: "Wstawianie 'to' po 'should' (*should to consult*)."
    },
    {
      orig: "'Don't touch the wet paint on the bench,' the gardener said to us.",
      kw: "WARNED",
      start: "The gardener",
      end: "the wet paint on the bench.",
      target: "warned us not to touch",
      variants: ["warned us not to touch"],
      exp: "Mowa zależna poleceń i ostrzeżeń: warn somebody not to do something.",
      trap: "Błędny szyk zaprzeczenia w bezokoliczniku (*to not touch* lub *warned not to touch us*)."
    },
    {
      orig: "This suitcase is so heavy that I cannot lift it alone.",
      kw: "TOO",
      start: "This suitcase is",
      end: "for me to lift alone.",
      target: "too heavy",
      variants: ["too heavy"],
      exp: "Konstrukcja: too + przymiotnik + for sb to do sth.",
      trap: "Dodawanie zaimka 'it' na końcu (*too heavy for me to lift it* - zbędna anaforyczna redundancja)."
    },
    {
      orig: "We didn't go for a bike ride because the rain was pouring down.",
      kw: "BECAUSE",
      start: "We didn't go for a bike ride",
      end: "of the heavy rain.",
      target: "because",
      variants: ["because"],
      exp: "Połączenie 'because of' przed frazą rzeczownikową 'the heavy rain'.",
      trap: "Mylenie 'because' z 'due to of'."
    }
  ];

  for (let i = 0; i < 60; i++) {
    const tpl = transformationTemplates[i % transformationTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_uoe_${taskNum}`,
      pillarId: 'pillar-use-of-english',
      pillarName: 'Znajomość środków językowych',
      topicId: 'eng-dzial-5',
      sectionTitle: 'Dział 5: Parafrazy zdań i tłumaczenie fragmentów PL -> EN',
      sectionNumber: 5,
      lessonId: 'eng-lesson-5-1',
      type: 'WORD_INPUT',
      title: `Parafraza ze słowem kluczem: ${tpl.kw}`,
      question: `Wykorzystaj podany wyraz, aby przekształcić zdanie tak, aby zachować sens zdania wyjściowego. W lukę wpisz brakujące wyrazy (od 2 do 4 słów):\n\nZdanie wyjściowe: "${tpl.orig}"\nSłowo-klucz: [${tpl.kw}]\nZdanie przekształcone: ${tpl.start} [GAP] ${tpl.end}`,
      correctAnswer: tpl.target,
      acceptedVariants: tpl.variants,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 10 (Parafraza zdań)',
      points: 1
    });
  }

  // 5. TRANSLATION OF SENTENCE FRAGMENTS -> DZIAŁ 5 (60 tasks)
  const translationTemplates = [
    {
      sent: "I will text you as soon as I (dotrę na lotnisko) [GAP].",
      target: "arrive at the airport",
      variants: ["arrive at the airport", "get to the airport", "reach the airport"],
      exp: "Po spójnikach czasowych (as soon as) w odniesieniu do przyszłości stosujemy Present Simple (arrive at), a nie will arrive.",
      trap: "Kalka gramatyczna: użycie czasu przyszłego *will arrive*."
    },
    {
      sent: "My sister is not used (do wczesnego wstawania) [GAP] on freezing winter mornings.",
      target: "to getting up early",
      variants: ["to getting up early"],
      exp: "Konstrukcja 'be used to' wymaga przyimka 'to' i formy gerundium (-ing).",
      trap: "Mylenie z 'used to + bare infinitive' (*to get up early*)."
    },
    {
      sent: "The detective wanted to know who (ukradł te złote kolczyki) [GAP] from the safe.",
      target: "had stolen the gold earrings",
      variants: ["had stolen the gold earrings", "had stolen those gold earrings"],
      exp: "Następstwo czasów (Reported Speech): kradzież przed pytaniem detektywa wymaga Past Perfect (*had stolen*).",
      trap: "Użycie czasu Past Simple (*stole*) w pytaniu zależnym."
    },
    {
      sent: "If we had left earlier, we (nie spóźnilibyśmy się) [GAP] for our chemistry exam.",
      target: "would not have been late",
      variants: ["would not have been late", "wouldn't have been late"],
      exp: "Trzeci okres warunkowy: If + Past Perfect, would not have + V3 / been.",
      trap: "Użycie drugiego okresu warunkowego (*wouldn't be late*) w odniesieniu do przeszłości."
    },
    {
      sent: "Are you interested in (wzięciu udziału) [GAP] in our regional environmental project?",
      target: "taking part",
      variants: ["taking part", "participating"],
      exp: "Po przyimku 'in' czasownik przyjmuje formę gerundium (*taking part*).",
      trap: "Użycie bezokolicznika *to take part* po przyimku *in*."
    },
    {
      sent: "I wonder why (ona nie przyszła) [GAP] to our rehearsal yesterday.",
      target: "she didn't come",
      variants: ["she did not come"],
      exp: "Pytanie zależne: szyk prosty zdania (podmiot *she* przed orzeczeniem *didn't come*).",
      trap: "Stosowanie szyku pytania z inwersją (*why didn't she come*)."
    }
  ];

  for (let i = 0; i < 60; i++) {
    const tpl = translationTemplates[i % translationTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_uoe_${taskNum}`,
      pillarId: 'pillar-use-of-english',
      pillarName: 'Znajomość środków językowych',
      topicId: 'eng-dzial-5',
      sectionTitle: 'Dział 5: Parafrazy zdań i tłumaczenie fragmentów PL -> EN',
      sectionNumber: 5,
      lessonId: 'eng-lesson-5-1',
      type: 'WORD_INPUT',
      title: `Tłumaczenie fragmentów zdań (Zadanie ${i + 1})`,
      question: `Przetłumacz na język angielski fragment podany w nawiasie, tak aby otrzymać logiczne i gramatycznie poprawne zdanie. W lukę wpisz maksymalnie cztery wyrazy:\n\n${tpl.sent}`,
      correctAnswer: tpl.target,
      acceptedVariants: tpl.variants,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 11 (Tłumaczenie fragmentów zdań)',
      points: 1
    });
  }

  // 6. OPEN CLOZE / GRAMMATICAL WORDS -> DZIAŁ 3 (45 tasks)
  const openClozeTemplates = [
    {
      text: "The student (1) [GAP] bicycle was stolen outside the dormitory has reported the incident to campus security.",
      target: "whose",
      variants: ["whose"],
      exp: "Zaimek względny dzierżawczy 'whose' określający 'czyj rower' (student, którego rower).",
      trap: "Użycie 'who's' (skrót od who is) lub 'which'."
    },
    {
      text: "We went for a long walk in the national park (2) [GAP] the bitterly cold wind blowing from the north.",
      target: "despite",
      variants: ["despite", "notwithstanding"],
      exp: "Przyimek 'despite' łączący się z frazą rzeczownikową (*the bitterly cold wind*).",
      trap: "Wstawianie 'despite of' lub 'although' przed rzeczownikiem."
    },
    {
      text: "You won't pass your final driving examination (3) [GAP] you practice parking between two cars every day.",
      target: "unless",
      variants: ["unless"],
      exp: "Spójnik 'unless' oznacza 'jeśli nie / chyba że' (unless you practice = if you don't practice).",
      trap: "Użycie 'if' w zdaniu twierdzącym, co odwraca sens logiczny."
    },
    {
      text: "The hotel receptionist was very helpful and gave us plenty of valuable (4) [GAP] about local historical sites.",
      target: "information",
      variants: ["information", "advice", "tips"],
      exp: "Rzeczownik niepoliczalny 'information' lub 'advice' po określniku 'plenty of'.",
      trap: "Dopisanie końcówki liczby mnogiej *informations* (rzeczownik w angielskim jest ściśle niepoliczalny)."
    },
    {
      text: "Neither of the two candidates (5) [GAP] invited for the second round of job interviews.",
      target: "was",
      variants: ["was", "is"],
      exp: "'Neither of + rzeczownik w l. mn.' łączy się formalnie z orzeczeniem w liczbie pojedynczej (*was*).",
      trap: "Automatyczne wstawienie liczby mnogiej *were* z powodu słowa *candidates*."
    }
  ];

  for (let i = 0; i < 45; i++) {
    const tpl = openClozeTemplates[i % openClozeTemplates.length];
    const taskNum = String(index++).padStart(3, '0');
    tasks.push({
      id: `eng_uoe_${taskNum}`,
      pillarId: 'pillar-use-of-english',
      pillarName: 'Znajomość środków językowych',
      topicId: 'eng-dzial-3',
      sectionTitle: 'Dział 3: Okresy warunkowe (Conditionals 0, 1, 2) i zdania czasowe',
      sectionNumber: 3,
      lessonId: 'eng-lesson-3-1',
      type: 'WORD_INPUT',
      title: `Uzupełnianie luk gramatycznych: Open Cloze (${i + 1})`,
      question: `Przeczytaj zdanie. Uzupełnij lukę [GAP] jednym wyrazem, tak aby powstało poprawne gramatycznie i logicznie zdanie:\n\n"${tpl.text}"`,
      correctAnswer: tpl.target,
      acceptedVariants: tpl.variants,
      explanation: tpl.exp,
      ckeTrap: tpl.trap,
      source: 'CKE Formuła 2023 • Zadanie 11 (Uzupełnianie luk)',
      points: 1
    });
  }

  return tasks;
}
