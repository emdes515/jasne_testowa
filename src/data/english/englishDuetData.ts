/**
 * src/data/english/englishDuetData.ts
 *
 * Baza danych dla interaktywnego kafelka „Maturalny Duet” (Tap-to-Match 3 pary)
 * oraz kontrastowych zestawień DO vs DON'T (Standard CKE vs Typowy Błąd CKE)
 * dla modułu języka angielskiego platformy JASNE.
 */

export interface DuetPair {
  id: string;
  leftText: string;
  rightText: string;
  category?: string;
}

export interface DoVsDontItem {
  doText: string;
  doExplanation: string;
  dontText: string;
  dontExplanation: string;
}

export interface LessonPewniakData {
  ckeFrequency: string; // np. "9/10 arkuszy CKE"
  pairs: DuetPair[];
  doVsDont?: DoVsDontItem;
}

export const ENGLISH_PEWNIAKI_DATA: Record<string, LessonPewniakData> = {
  // DZIAŁ 1: CZASY I ASPEKTY
  'eng-lesson-1-1': {
    ckeFrequency: '10/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'since 2022 / for 3 years', rightText: 'Present Perfect (trwa do teraz)' },
      { id: 'p2', leftText: 'yesterday / 2 days ago', rightText: 'Past Simple (czas zamknięty)' },
      { id: 'p3', leftText: 'already / just / yet', rightText: 'Skutek tu i teraz (have + V₃)' },
    ],
    doVsDont: {
      doText: 'I have known him since 2020.',
      doExplanation: 'Znam go od 2020 i nadal znam – stan trwa do chwili obecnej.',
      dontText: 'I know him since 2020. / I knew him since 2020.',
      dontExplanation: 'Błąd kalki z polskiego! Ze słówkiem „since” nie używamy czasu teraźniejszego ani Past Simple.',
    },
  },
  'eng-lesson-1-2': {
    ckeFrequency: '8/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'Czynność w toku przerwana', rightText: 'while + Past Continuous' },
      { id: 'p2', leftText: 'Nagłe zdarzenie w tle', rightText: 'when + Past Simple' },
      { id: 'p3', leftText: 'Wcześniejsza przeszłość', rightText: 'had + V₃ (Past Perfect)' },
    ],
    doVsDont: {
      doText: 'While I was cooking, the phone rang.',
      doExplanation: 'Dłuższa czynność w toku (was cooking) przerwana krótkim zdarzeniem (rang).',
      dontText: 'When I cooked, the phone was ringing.',
      dontExplanation: 'Odwrócenie aspektów: nie używamy Continuous do krótkich, jednorazowych impulsów jak dźwięk telefonu.',
    },
  },
  'eng-lesson-1-3': {
    ckeFrequency: '7/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'Spontaniczna decyzja', rightText: 'will + bezokolicznik' },
      { id: 'p2', leftText: 'Zaplanowany zamiar / chmury na niebie', rightText: 'be going to + V₁' },
      { id: 'p3', leftText: 'Umówione spotkanie w kalendarzu', rightText: 'Present Continuous (am/is/are + -ing)' },
    ],
    doVsDont: {
      doText: 'Look at the dark clouds! It is going to rain.',
      doExplanation: 'Przewidywanie oparte na widocznym dowodzie zmysłowym tu i teraz.',
      dontText: 'Look at the dark clouds! It will rain.',
      dontExplanation: '„Will” to tylko subiektywne przeczucie; przy twardym dowodzie CKE punktuje wyłącznie „going to”.',
    },
  },

  // DZIAŁ 2: GERUND, INFINITIVE I MODALE
  'eng-lesson-2-1': {
    ckeFrequency: '9/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'enjoy / avoid / mind', rightText: 'Zawsze z formą -ing (gerund)' },
      { id: 'p2', leftText: 'decide / hope / refuse', rightText: 'Zawsze z to + V₁ (infinitive)' },
      { id: 'p3', leftText: 'look forward to', rightText: 'to jest przyimkiem → wymaga -ing!' },
    ],
    doVsDont: {
      doText: 'I am looking forward to hearing from you.',
      doExplanation: 'Po zwrocie „look forward to” słówko „to” jest przyimkiem, a po przyimku ZAWSZE stoi czasownik z końcówką -ing.',
      dontText: 'I look forward to hear from you.',
      dontExplanation: 'Sztandarowa pułapka w e-mailach maturalnych! Wpisanie czystego bezokolicznika odbiera punkty za poprawność.',
    },
  },
  'eng-lesson-2-2': {
    ckeFrequency: '8/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'mustn’t', rightText: 'Kategoryczny zakaz (nie wolno!)' },
      { id: 'p2', leftText: 'don’t have to', rightText: 'Brak przymusu (nie musisz, ale możesz)' },
      { id: 'p3', leftText: 'should / ought to', rightText: 'Dobra rada / powinność' },
    ],
    doVsDont: {
      doText: 'You don’t have to pay – it is completely free.',
      doExplanation: 'Brak konieczności zapłaty: „nie musisz”.',
      dontText: 'You mustn’t pay – it is completely free.',
      dontExplanation: '„Mustn’t” oznacza surowy zakaz („masz zakaz płacenia”), a nie brak przymusu!',
    },
  },
  'eng-lesson-2-3': {
    ckeFrequency: '7/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'stop doing something', rightText: 'Rzucić nałóg / zakończyć czynność na dobre' },
      { id: 'p2', leftText: 'stop to do something', rightText: 'Zatrzymać się, aby coś zrobić' },
      { id: 'p3', leftText: 'remember doing', rightText: 'Pamiętać wspomnienie z przeszłości' },
    ],
    doVsDont: {
      doText: 'He stopped smoking three years ago.',
      doExplanation: 'Rzucił palenie raz na zawsze (zaprzestał nawyku).',
      dontText: 'He stopped to smoke three years ago.',
      dontExplanation: '„Stopped to smoke” oznaczałoby, że przerwał jazdę rowerem, żeby zapalić papierosa!',
    },
  },

  // DZIAŁ 3: CONDITIONALS I ZDANIA CZASOWE
  'eng-lesson-3-1': {
    ckeFrequency: '10/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'If / As soon as / Unless', rightText: 'NIGDY nie wstawiaj „will” po tych słowach!' },
      { id: 'p2', leftText: 'First Conditional (realny)', rightText: 'If + Present Simple, will + V₁' },
      { id: 'p3', leftText: 'Second Conditional (gdybanie)', rightText: 'If + Past Simple, would + V₁' },
    ],
    doVsDont: {
      doText: 'If it rains tomorrow, we will stay at home.',
      doExplanation: 'W zdaniu warunkowym po „if” stosujemy czas teraźniejszy (rains), a „will” tylko w zdaniu głównym.',
      dontText: 'If it will rain tomorrow, we will stay at home.',
      dontExplanation: 'Nigdy nie łącz „if + will”! To kardynalny błąd CKE, który unieważnia całą parafrazę.',
    },
  },
  'eng-lesson-3-2': {
    ckeFrequency: '8/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'unless', rightText: 'Oznacza „if not” (jeśli nie / chyba że)' },
      { id: 'p2', leftText: 'unless + twierdzenie', rightText: 'Samo w sobie niesie zaprzeczenie!' },
      { id: 'p3', leftText: 'as long as / provided that', rightText: 'Oznacza „pod warunkiem że”' },
    ],
    doVsDont: {
      doText: 'You will fail the exam unless you study harder.',
      doExplanation: '„Unless you study” = jeśli nie będziesz się uczyć pilniej.',
      dontText: 'You will fail the exam unless you don’t study harder.',
      dontExplanation: 'Podwójne przeczenie! Po „unless” zdanie musi mieć gramatyczną formę twierdzącą.',
    },
  },
  'eng-lesson-3-3': {
    ckeFrequency: '7/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'If I were you, ...', rightText: 'Udzielanie rad (Gdybym był tobą...)' },
      { id: 'p2', leftText: 'would rather + V₁', rightText: 'Wolałbym (bez „to”!)' },
      { id: 'p3', leftText: 'wish + Past Simple', rightText: 'Życzenie zmiany obecnego stanu' },
    ],
    doVsDont: {
      doText: 'If I were you, I would consult a doctor.',
      doExplanation: 'Klasyczna, elegancka forma porady w Drugim Okresie Warunkowym.',
      dontText: 'If I was you, I will consult a doctor.',
      dontExplanation: 'Mieszanie czasów: po „If” z przeszłością w drugiej części MUSI stać „would”, nigdy „will”.',
    },
  },

  // DZIAŁ 4: SŁOWOTWÓRSTWO I FALSE FRIENDS
  'eng-lesson-4-1': {
    ckeFrequency: '9/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'patient / polite / possible', rightText: 'Przedrostek im- (przed literami m, p)' },
      { id: 'p2', leftText: 'responsible / regular', rightText: 'Przedrostek ir- (przed literą r)' },
      { id: 'p3', leftText: 'legal / logical', rightText: 'Przedrostek il- (przed literą l)' },
    ],
    doVsDont: {
      doText: 'It is impossible to finish this today.',
      doExplanation: 'Słowa zaczynające się na literę „p” tworzą zaprzeczenie przez przedrostek „im-”.',
      dontText: 'It is unpossible / inpossible to finish this today.',
      dontExplanation: 'Kalka lub losowy dobór przedrostka: zapamiętaj regułę fonetyczną P/M → IM-.',
    },
  },
  'eng-lesson-4-2': {
    ckeFrequency: '10/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'actually', rightText: 'W rzeczywistości / tak naprawdę (NIE aktualnie!)' },
      { id: 'p2', leftText: 'currently / at present', rightText: 'Aktualnie / obecnie' },
      { id: 'p3', leftText: 'sympathetic', rightText: 'Pełen empatii / współczujący (NIE sympatyczny!)' },
    ],
    doVsDont: {
      doText: 'He is currently looking for a new job.',
      doExplanation: '„Currently” oznacza aktualnie w tym momencie czasu.',
      dontText: 'He is actually looking for a new job.',
      dontExplanation: 'Użycie „actually” w znaczeniu „aktualnie” to najstarszy False Friend w arkuszach CKE!',
    },
  },
  'eng-lesson-4-3': {
    ckeFrequency: '8/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'decide → decision', rightText: 'Tworzenie rzeczowników (-sion / -tion)' },
      { id: 'p2', leftText: 'success → successful', rightText: 'Tworzenie przymiotników (-ful)' },
      { id: 'p3', leftText: 'danger → dangerous', rightText: 'Końcówka przymiotnikowa (-ous)' },
    ],
    doVsDont: {
      doText: 'Her presentation was very informative.',
      doExplanation: 'Rzeczownik po „very” zamieniamy w przymiotnik (inform → informative).',
      dontText: 'Her presentation was very information.',
      dontExplanation: 'Błąd części mowy: wstawienie rzeczownika zamiast przymiotnika opisującego cechę.',
    },
  },

  // DZIAŁ 5: PARAFRAZY I TŁUMACZENIA
  'eng-lesson-5-1': {
    ckeFrequency: '10/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'Strona bierna (Passive)', rightText: 'be (w odpowiednim czasie) + V₃' },
      { id: 'p2', leftText: 'Present Simple Passive', rightText: 'am / is / are + V₃' },
      { id: 'p3', leftText: 'Past Simple Passive', rightText: 'was / were + V₃' },
    ],
    doVsDont: {
      doText: 'This castle was built in the 14th century.',
      doExplanation: 'Zamek nie zbudował się sam; konieczne jest was/were + V₃.',
      dontText: 'This castle built in the 14th century.',
      dontExplanation: 'Pominięcie czasownika „be” (was/were) zmienia stronę bierną w bzdurną stronę czynną!',
    },
  },
  'eng-lesson-5-2': {
    ckeFrequency: '9/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'said to me →', rightText: 'told me (told wymaga osoby bez „to”!)' },
      { id: 'p2', leftText: 'Cofnięcie czasów (Backshift)', rightText: 'Present Simple → Past Simple' },
      { id: 'p3', leftText: 'Zmiana określników', rightText: 'here → there, tomorrow → the next day' },
    ],
    doVsDont: {
      doText: 'She told me that she was tired.',
      doExplanation: 'Czasownik „told” łączy się bezpośrednio z osobą (told me), a czas ulega cofnięciu.',
      dontText: 'She said me that she is tired. / She told to me...',
      dontExplanation: 'Nigdy nie mówimy „said me” ani „told to me”! Mówimy „said TO me” lub „told me”.',
    },
  },
  'eng-lesson-5-3': {
    ckeFrequency: '8/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'too + przymiotnik', rightText: 'Zbyt... aby (zabarwienie negatywne)' },
      { id: 'p2', leftText: 'przymiotnik + enough', rightText: 'Wystarczająco... (słówko enough PO przymiotniku!)' },
      { id: 'p3', leftText: 'so ... that', rightText: 'Tak... że aż (skutek)' },
    ],
    doVsDont: {
      doText: 'He is not old enough to drive a car.',
      doExplanation: 'Słowo „enough” stawia się ZAWSZE po przymiotniku (old enough).',
      dontText: 'He is not enough old to drive a car.',
      dontExplanation: 'Kalka ze składni polskiej („wystarczająco stary”). W angielskim: Przymiotnik + enough!',
    },
  },

  // DZIAŁ 13: POPRAWNOŚĆ I BŁĘDY L1 W PISANIU
  'eng-lesson-13-1': {
    ckeFrequency: '10/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'invite somebody TO', rightText: 'Zaprosić kogoś NA (nigdy „for”!)' },
      { id: 'p2', leftText: 'depend ON', rightText: 'Zależeć OD (nigdy „of”!)' },
      { id: 'p3', leftText: 'congratulate ON', rightText: 'Pogratulować Z OKAZJI (nigdy „for”!)' },
    ],
    doVsDont: {
      doText: 'I would like to invite you to my birthday party.',
      doExplanation: 'Rekcja czasownika: invite + osoba + TO + wydarzenie.',
      dontText: 'I would like to invite you for my birthday party.',
      dontExplanation: 'Klasyczny polonizm! Słowo „na” bezrefleksyjnie tłumaczone jako „for” kosztuje punkty.',
    },
  },
};

/**
 * Uniwersalny fallback dla lekcji, które nie mają jeszcze wpisanych dedykowanych par w słowniku.
 */
export function getDuetDataForLesson(lessonId: string, topicId?: string): LessonPewniakData {
  if (ENGLISH_PEWNIAKI_DATA[lessonId]) {
    return ENGLISH_PEWNIAKI_DATA[lessonId];
  }

  // Inteligentny fallback oparty na działach tematycznych
  const sectionNum = topicId ? parseInt(topicId.replace('eng-dzial-', ''), 10) : 1;

  if (sectionNum >= 6 && sectionNum <= 8) {
    // FILAR II: ROZUMIENIE ZE SŁUCHU
    return {
      ckeFrequency: '9/10 arkuszy CKE',
      pairs: [
        { id: 'p1', leftText: 'Word-spotting trap', rightText: 'Dosłowne słowo z audio to często zmyłka!' },
        { id: 'p2', leftText: 'Parafraza klucza', rightText: 'Szukaj synonimów, a nie identycznych słów' },
        { id: 'p3', leftText: 'Kontrast: However / Actually', rightText: 'Kluczowa informacja pojawia się PO spójniku' },
      ],
      doVsDont: {
        doText: 'Słuchaj sensu całej wypowiedzi i wyłapuj intencję mówcy.',
        doExplanation: 'Egzaminator CKE celowo umieszcza w dystraktorze słowo wykrzyczane w nagraniu jako pułapkę.',
        dontText: 'Zaznaczanie opcji tylko dlatego, że padło w niej to samo słówko co w nagraniu.',
        dontExplanation: 'Zjawisko „word-spotting” to najczęstszy powód utraty punktów w Zadaniach 1–2.',
      },
    };
  }

  if (sectionNum >= 9 && sectionNum <= 11) {
    // FILAR III: CZYTANIE
    return {
      ckeFrequency: '9/10 arkuszy CKE',
      pairs: [
        { id: 'p1', leftText: 'Zaimki anaforiczne (this, they)', rightText: 'Wskazują na rzeczownik z poprzedniego zdania' },
        { id: 'p2', leftText: 'Główna myśl akapitu (Gist)', rightText: 'Nagłówek podsumowuje całość, nie tylko jeden detal' },
        { id: 'p3', leftText: 'Mediacja językowa', rightText: 'Trzymaj się ściśle limitu słów (np. max 2-3 wyrazy)' },
      ],
      doVsDont: {
        doText: 'Sprawdź logiczne powiązanie zdania PRZED i PO luce w tekście.',
        doExplanation: 'Zdanie wstawiane w lukę musi spinać się semantycznie i gramatycznie z oboma sąsiadami.',
        dontText: 'Wybieranie nagłówka na podstawie jednego słowa kluczowego z pierwszego wersu.',
        dontExplanation: 'CKE często wstawia słowo-klucz w akapicie jako dystraktor dla powierzchownego czytelnika.',
      },
    };
  }

  if (sectionNum >= 12 && sectionNum <= 15) {
    // FILAR IV: WYPOWIEDŹ PISEMNA
    return {
      ckeFrequency: '10/10 arkuszy CKE',
      pairs: [
        { id: 'p1', leftText: 'Rozwinięcie kropki CKE', rightText: 'Minimum 2 powiązane fakty lub przyczyna + skutek' },
        { id: 'p2', leftText: 'Limit słów (80–130)', rightText: 'Optymalnie napisz 100–115 słów' },
        { id: 'p3', leftText: 'Łączniki: However / What is more', rightText: 'Zapewniają punkty za Spójność i Logikę' },
      ],
      doVsDont: {
        doText: 'Podaj fakt i od razu dodaj szczegół lub swoje odczucie (2 pkt za kropkę).',
        doExplanation: 'Tylko pełne rozwinięcie („podróż pociągiem spóźniła się 2h, przez co uciekł mi autobus”) daje max punktów.',
        dontText: 'Zaliczenie kropki jednym krótkim zdaniem bez rozwinięcia („Byłem zmęczony”).',
        dontExplanation: 'Pojedynczy suchy fakt to tylko odniesienie (0.5 pkt) zamiast pełnego rozwinięcia (1 pkt).',
      },
    };
  }

  // Domyślny uniwersalny zestaw
  return {
    ckeFrequency: '8/10 arkuszy CKE',
    pairs: [
      { id: 'p1', leftText: 'Sygnał czasowy / Zwrot klucz', rightText: 'Determinuje właściwą formę gramatyczną' },
      { id: 'p2', leftText: 'False Friends', rightText: 'Nie ufaj słowom brzmiącym identycznie po polsku' },
      { id: 'p3', leftText: 'Rekcja przyimkowa', rightText: 'Angielskie przyimki rzadko pokrywają się z polskimi' },
    ],
    doVsDont: {
      doText: 'Analizuj słowa kluczowe i kontekst przed wyborem odpowiedzi.',
      doExplanation: 'Każde zadanie CKE posiada przynajmniej jeden jednoznaczny znacznik gramatyczny lub leksykalny.',
      dontText: 'Tłumaczenie zdań słowo w słowo z języka polskiego na angielski.',
      dontExplanation: 'Kalki językowe (L1 interference) to 80% wszystkich błędów popełnianych na maturze podstawowej.',
    },
  };
}
