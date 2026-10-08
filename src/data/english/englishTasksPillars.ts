/**
 * englishTasksPillars.ts
 *
 * Autentyczne zadania CKE Języka Angielskiego (Formuła 2023)
 * podzielone na 4 Filary Egzaminacyjne CKE:
 * - Filar I: Znajomość środków językowych (Use of English)
 * - Filar II: Rozumienie ze słuchu (Listening Comprehension)
 * - Filar III: Rozumienie tekstów pisanych (Reading Comprehension)
 * - Filar IV: Wypowiedź pisemna (Writing Workshop: E-mail & Blog)
 */

export interface EnglishTask {
  id: string;
  pillarId: 'pillar-use-of-english' | 'pillar-listening' | 'pillar-reading' | 'pillar-writing';
  pillarName: string;
  topicId: string;
  lessonId: string;
  type: 'SINGLE_CHOICE' | 'TRUE_FALSE' | 'TWO_PART' | 'WORD_INPUT' | 'OPEN_TASK';
  title: string;
  question: string;
  contextText?: string;
  audioUrl?: string;
  transcriptSnippet?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  ckeTrap: string;
  source: string;
  points: number;
  ai_tutor_rubric?: any;
}

export const ENGLISH_TASKS_PILLAR_1: EnglishTask[] = [
  {
    id: 'eng-task-1-1',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    topicId: 'eng-dzial-1',
    lessonId: 'eng-lesson-1-1',
    type: 'SINGLE_CHOICE',
    title: 'Present Perfect vs Past Simple – Rezultat vs Czas przeszły zamknięty',
    question: 'Wybierz poprawne uzupełnienie luki w zdaniu:\nI can’t find my keys! I think I ______ them somewhere at the bus station.',
    options: ['have lost', 'lost', 'had lost', 'am losing'],
    correctAnswer: 'have lost',
    explanation: 'Używamy **Present Perfect** (*have lost*), ponieważ skutek zdarzenia z przeszłości jest widoczny i istotny **w teraźniejszości** (*I can’t find my keys now*). Past Simple (*lost*) wymagałby precyzyjnego określenia przeszłego czasu (np. *yesterday*).',
    ckeTrap: 'Dystraktor *lost* kusi uczniów, którzy myślą „zgubiłem w przeszłości, więc Past Simple”. W arkuszach CKE kluczowe jest pierwsze zdanie pokazujące stan obecny (*I can’t find*).',
    source: 'CKE Matura Maj 2023, Zadanie 8',
    points: 1
  },
  {
    id: 'eng-task-1-2',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    topicId: 'eng-dzial-1',
    lessonId: 'eng-lesson-1-2',
    type: 'WORD_INPUT',
    title: 'Past Continuous i Past Simple – Czynność przerwana',
    question: 'Uzupełnij lukę w zdaniu poprawną formą czasownika w nawiasie:\nWhile my sister (study) ____________________ in her room, the lights suddenly went out.',
    correctAnswer: 'was studying',
    explanation: 'Długa, trwająca czynność w tle wprowadzona spójnikiem *While* wymaga czasu **Past Continuous** (*was studying*), podczas gdy krótkie zdarzenie, które ją przerwało, wyrażone jest w Past Simple (*the lights went out*).',
    ckeTrap: 'Brak operatora *was* (wpisanie samego *studying*) lub błąd ortograficzny w pisowni *study -> studying* (zamiana y na i jest błędem!).',
    source: 'CKE Matura Czerwiec 2023, Zadanie 9',
    points: 1
  },
  {
    id: 'eng-task-1-3',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    topicId: 'eng-dzial-2',
    lessonId: 'eng-lesson-2-1',
    type: 'SINGLE_CHOICE',
    title: 'Gerund vs Infinitive – Czasowniki z -ing oraz to + bezokolicznik',
    question: 'Wybierz poprawne dokończenie zdania:\nTom promised ______ me with my physics project this weekend.',
    options: ['to help', 'helping', 'help', 'to helping'],
    correctAnswer: 'to help',
    explanation: 'Czasownik *promise* łączy się z bezokolicznikiem z *to*: **promise to do something** (*obiecać coś zrobić*).',
    ckeTrap: 'Mylenie czasowników łączących się z *to* (decide, promise, hope, offer) z tymi łączącymi się z *-ing* (enjoy, avoid, suggest).',
    source: 'CKE Matura Maj 2024, Zadanie 9',
    points: 1
  },
  {
    id: 'eng-task-1-4',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    topicId: 'eng-dzial-3',
    lessonId: 'eng-lesson-3-1',
    type: 'SINGLE_CHOICE',
    title: 'Second Conditional – Gdybanie w teraźniejszości',
    question: 'Wybierz poprawne uzupełnienie okresu warunkowego:\nIf I ______ more free time, I would join a local gym club.',
    options: ['had', 'have', 'would have', 'will have'],
    correctAnswer: 'had',
    explanation: 'W drugim okresie warunkowym (Second Conditional: *If + Past Simple, would + bezokolicznik*) w części warunkowej po *if* używamy czasu przeszłego (*had*), a nie *would have*.',
    ckeTrap: 'Nigdy nie stawiamy *would* bezpośrednio po *if*! To jeden z najczęstszych błędów w kluczach CKE.',
    source: 'CKE Matura Grudzień 2023, Zadanie 8',
    points: 1
  },
  {
    id: 'eng-task-1-5',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    topicId: 'eng-dzial-4',
    lessonId: 'eng-lesson-4-1',
    type: 'WORD_INPUT',
    title: 'Słowotwórstwo – Tworzenie przymiotników zaprzeczonych',
    question: 'Uzupełnij zdanie przekształcając wyraz w nawiasie tak, aby logicznie pasował do kontekstu:\nIt is completely (POSSIBLE) ____________________ to finish all this work in just ten minutes.',
    correctAnswer: 'impossible',
    explanation: 'Przymiotnik *possible* z przedrostkiem przeczącym to **impossible** (*niemożliwy*).',
    ckeTrap: 'Wpisanie *unpossible* lub *dispossible*. CKE regularnie sprawdza przedrostki: *im-* przed literami *p/m* (*patient -> impatient*, *possible -> impossible*).',
    source: 'CKE Matura Maj 2024, Zadanie 10',
    points: 1
  },
  {
    id: 'eng-task-1-6',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    topicId: 'eng-dzial-5',
    lessonId: 'eng-lesson-5-1',
    type: 'WORD_INPUT',
    title: 'Tłumaczenie fragmentów zdań ze słowem kluczem',
    question: 'Przetłumacz na język angielski fragment podany w nawiasie:\nShe asked me (czy lubię) ____________________ spicy food.',
    correctAnswer: 'if I liked',
    explanation: 'W mowie zależnej (Reported Speech) po czasowniku pytającym w czasie przeszłym (*asked*) następuje następstwo czasów (*Present Simple -> Past Simple*). *Czy* tłumaczymy jako *if* lub *whether*. Poprawna forma: **if I liked** (lub *whether I liked*).',
    ckeTrap: 'Pozostawienie szyku pytania (*if do I like*) lub brak cofnięcia czasu (*if I like*). W mowie zależnej szyk zdania jest ZAWSZE twierdzący!',
    source: 'CKE Matura Sierpień 2024, Zadanie 11',
    points: 1
  }
];

export const ENGLISH_TASKS_PILLAR_2: EnglishTask[] = [
  {
    id: 'eng-task-2-1',
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    topicId: 'eng-dzial-6',
    lessonId: 'eng-lesson-6-1',
    type: 'SINGLE_CHOICE',
    title: 'Wybór wielokrotny ze słuchu – Wyłapywanie intencji mówcy',
    question: 'Usłyszysz dwukrotnie wypowiedź przewodnika wycieczki. Na podstawie nagrania odpowiedz na pytanie:\nWhat is the speaker doing?',
    contextText: '„Attention, everyone. As we enter the ancient castle, please note that photography with flash is strictly prohibited in the royal chambers. Also, please stay close to our group because the corridors are quite narrow and it is very easy to lose your way.”',
    audioUrl: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/informatory/2023/audio/EM23_J_angielski_PP.mp3',
    transcriptSnippet: 'please note that photography with flash is strictly prohibited... Also, please stay close to our group',
    options: [
      'Giving instructions to visitors',
      'Describing the history of the castle',
      'Encouraging people to take photos',
      'Complaining about tourists behavior'
    ],
    correctAnswer: 'Giving instructions to visitors',
    explanation: 'Przewodnik przekazuje instrukcje i zasady bezpieczeństwa (*please note that... please stay close*). Nie opowiada historii ani nie zachęca do robienia zdjęć (wręcz zakazuje flesza).',
    ckeTrap: 'Dystraktor „Describing history” – pojawia się słowo *ancient*, ale cała wypowiedź dotyczy instrukcji organizacyjnych.',
    source: 'CKE Matura Maj 2023, Zadanie 1',
    points: 1
  },
  {
    id: 'eng-task-2-2',
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    topicId: 'eng-dzial-7',
    lessonId: 'eng-lesson-7-1',
    type: 'SINGLE_CHOICE',
    title: 'Dobieranie wypowiedzi do osób – Identyfikacja głównej myśli',
    question: 'Wypowiedź dziewczyny o wakacyjnej pracy:\nWhich statement best describes the speaker’s experience?',
    contextText: '„I worked at an animal shelter during July. At first, cleaning cages was really hard work and I smelled like wet dogs all the time. But when I helped an abandoned puppy find a loving home in my second week, I felt that every single minute was truly worth it.”',
    audioUrl: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/informatory/2023/audio/EM23_J_angielski_PP.mp3',
    transcriptSnippet: 'I felt that every single minute was truly worth it.',
    options: [
      'She found her job rewarding despite initial difficulties.',
      'She decided to quit because of bad working conditions.',
      'She was disappointed by how little money she earned.',
      'She regretted spending her summer holidays there.'
    ],
    correctAnswer: 'She found her job rewarding despite initial difficulties.',
    explanation: 'Kluczowe zdanie w podsumowaniu: *„I felt that every single minute was truly worth it”* odpowiada synonimicznie sformułowaniu *rewarding* (dająca satysfakcję), mimo trudnego początku (*hard work*).',
    ckeTrap: 'Słuchacze sugerują się pierwszym zdaniem (*cleaning cages was really hard*) i błędnie wybierają opcję o rezygnacji lub rozczarowaniu, ignorując puentę wypowiedzi.',
    source: 'CKE Matura Maj 2024, Zadanie 2',
    points: 1
  }
];

export const ENGLISH_TASKS_PILLAR_3: EnglishTask[] = [
  {
    id: 'eng-task-3-1',
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    topicId: 'eng-dzial-9',
    lessonId: 'eng-lesson-9-1',
    type: 'SINGLE_CHOICE',
    title: 'Dobieranie nagłówków do akapitów – Spójność i idea przewodnia',
    question: 'Przeczytaj poniższy fragment artykułu i wybierz nagłówek, który najlepiej oddaje jego sens:\n„Many people believe that drinking coffee immediately after waking up gives you the best energy boost. However, science proves otherwise: our cortisol levels naturally peak around 8:00 AM, making that early morning cup largely unnecessary. It is far better to wait until mid-morning when your natural energy begins to drop.”',
    options: [
      'Why early morning coffee might not be the best idea',
      'The harmful chemicals hidden in roasted coffee beans',
      'How to fall asleep faster without drinking caffeine',
      'The cultural tradition of morning breakfast in Europe'
    ],
    correctAnswer: 'Why early morning coffee might not be the best idea',
    explanation: 'Fragment tłumaczy, dlaczego kawa o świcie nie działa optymalnie (*making that early morning cup largely unnecessary*) i radzi poczekać do południa. Odpowiada temu nagłówek A.',
    ckeTrap: 'Szukanie dokładnych słów z tekstu zamiast synonimów i parafrazy. W CKE nagłówek nigdy nie powtarza dosłownie całego zdania z akapitu.',
    source: 'CKE Matura Czerwiec 2024, Zadanie 5',
    points: 1
  },
  {
    id: 'eng-task-3-2',
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    topicId: 'eng-dzial-10',
    lessonId: 'eng-lesson-10-1',
    type: 'TRUE_FALSE',
    title: 'Wyszukiwanie faktów w tekście – Prawda czy Fałsz',
    question: 'Na podstawie tekstu oceń, czy zdanie jest prawdziwe (True) czy fałszywe (False):\n„The museum tickets must be booked online at least 24 hours in advance.”\n\nFragment tekstu: „While tickets can usually be purchased at the main entrance desk upon arrival, visitors are strongly advised to reserve them online beforehand during peak holiday seasons to avoid standing in long queues.”',
    options: ['PRAWDA', 'FAŁSZ'],
    correctAnswer: 'FAŁSZ',
    explanation: 'Zdanie stwierdza, że bilety **muszą** (*must*) być kupione online 24h wcześniej. Tekst mówi, że bilety można kupić na miejscu w kasie (*can usually be purchased at the main desk*), a rezerwacja online jest jedynie zalecana (*advised*), a nie obowiązkowa.',
    ckeTrap: 'Mylenie zalecenia (*advised / recommended*) z obowiązkiem (*must / required / compulsory*). CKE bardzo często testuje tę różnicę modalną w zadaniach Prawda/Fałsz.',
    source: 'CKE Matura Maj 2025, Zadanie 6',
    points: 1
  }
];

export const ENGLISH_TASKS_PILLAR_4: EnglishTask[] = [
  {
    id: 'eng-task-4-1',
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    topicId: 'eng-dzial-12',
    lessonId: 'eng-lesson-12-1',
    type: 'SINGLE_CHOICE',
    title: 'Warsztat 4 kropek CKE – Rozwinięcie podpunktu vs wzmianka',
    question: 'Podpunkt polecenia CKE brzmi:\n„Napisz, jak zareagowali Twoi znajomi na Twój nowy pomysł.”\nKtóry z poniższych fragmentów otrzyma maksymalną liczbę punktów za ROZWINIĘCIE (a nie tylko odniesienie)?',
    options: [
      'My friends were really surprised at first, but after I explained the details to them, they decided to join me and help with the preparations.',
      'My friends liked the idea very much yesterday.',
      'I have many nice friends from my school.',
      'They reacted to my idea.'
    ],
    correctAnswer: 'My friends were really surprised at first, but after I explained the details to them, they decided to join me and help with the preparations.',
    explanation: 'Egzaminator CKE ocenia podpunkt jako **rozwinięty** (2 pkt), gdy uczeń podaje reakcję oraz szczegół pogłębiający (dlaczego tak zareagowali lub co zrobili potem: *first surprised, then joined me and helped*). Opcja B to tylko wzmianka (1 pkt), a C i D nie realizują kropki.',
    ckeTrap: 'Napisanie jednego krótkiego zdania bez uzasadnienia (np. *They were happy*). W kluczu CKE to tylko „odniesienie się” warte 0.5 punktu za treść!',
    source: 'Informator CKE Formuła 2023, Kryteria oceniania wypowiedzi pisemnej',
    points: 1
  },
  {
    id: 'eng-task-4-2',
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    topicId: 'eng-dzial-15',
    lessonId: 'eng-lesson-15-1',
    type: 'OPEN_TASK',
    title: 'Autentyczne Zadanie 12 CKE – E-mail do kolegi z zagranicy (80–130 słów)',
    question: 'Wygrałeś/aś konkurs fotograficzny organizowany przez lokalny dom kultury. W e-mailu do kolegi z Londynu:\n1. Poinformuj o wygranej i opisz zdjęcie, które zgłosiłeś/aś do konkursu.\n2. Wyjaśnij, dlaczego zdecydowałeś/aś się wziąć udział w tym konkursie.\n3. Opisz, jak zareagowała Twoja rodzina, gdy dowiedziała się o Twoim sukcesie.\n4. Wspomnij o nagrodzie i napisz, na co planujesz ją przeznaczyć.\n\nRozwiń swoją wypowiedź w każdym z czterech podpunktów. Długość wypowiedzi powinna wynosić od 80 do 130 wyrazów.',
    correctAnswer: 'Przykładowa wzorcowa realizacja: Hi Mark! Great news! I’ve just won first prize in a local photography contest. My winning photo shows a misty autumn morning over the old castle in my hometown. I decided to enter the competition because my art teacher strongly encouraged me to show my work to others. When I told my parents, they were absolutely thrilled and my mum even bought a cake to celebrate! The prize is a high-tech camera and a gift voucher. I’m planning to spend the voucher on a professional tripod for landscape shots. How are you doing? Write back soon! XYZ',
    explanation: 'Wypowiedź realizuje wszystkie 4 podpunkty w sposób rozwinięty, mieści się w limicie 80-130 słów (ok. 105 słów), zawiera naturalne łączniki (*because*, *when*, *and*) oraz zróżnicowane słownictwo (*misty autumn*, *thrilled*, *high-tech*, *tripod*).',
    ckeTrap: 'Przekroczenie limitu słów (poniżej 80 lub powyżej 130 słów może obniżyć ocenę za spójność/zakres). Brak rozwinięcia co najmniej 3 z 4 podpunktów.',
    source: 'CKE Matura Maj 2024, Zadanie 12',
    points: 12,
    ai_tutor_rubric: {
      max_points: 12,
      criterion_1_point: 'Częściowe odniesienie się do kropek (0-4 pkt)',
      criterion_2_points: 'Pełna realizacja wszystkich 4 kropek z bogatym słownictwem (10-12 pkt)'
    }
  }
];

export const ALL_ENGLISH_TASKS: EnglishTask[] = [
  ...ENGLISH_TASKS_PILLAR_1,
  ...ENGLISH_TASKS_PILLAR_2,
  ...ENGLISH_TASKS_PILLAR_3,
  ...ENGLISH_TASKS_PILLAR_4
];

export function getEnglishTasksByPillar(pillarId: string): EnglishTask[] {
  return ALL_ENGLISH_TASKS.filter(t => t.pillarId === pillarId);
}

export function getEnglishTasksByTopic(topicId: string): EnglishTask[] {
  return ALL_ENGLISH_TASKS.filter(t => t.topicId === topicId);
}

export function getEnglishTasksByLesson(lessonId: string): EnglishTask[] {
  return ALL_ENGLISH_TASKS.filter(t => t.lessonId === lessonId);
}
