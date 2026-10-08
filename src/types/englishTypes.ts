/**
 * src/types/englishTypes.ts
 *
 * Typy i struktury danych dla modułu Języka Angielskiego (Formuła 2023)
 * w architekturze platformy JASNE.
 */

export type EnglishTaskType =
  | 'SINGLE_CHOICE'
  | 'WORD_INPUT'
  | 'TRUE_FALSE'
  | 'TWO_PART'
  | 'OPEN_TASK';

export interface EnglishTaskOption {
  id: string;
  text: string;
  is_correct?: boolean;
}

export interface EnglishTask {
  id: string;
  pillarId: 'pillar-use-of-english' | 'pillar-listening' | 'pillar-reading' | 'pillar-writing';
  pillarName: string;
  topicId: string; // 'eng-dzial-1' do 'eng-dzial-15'
  sectionTitle: string;
  sectionNumber: number; // 1 do 15
  lessonId: string;
  type: EnglishTaskType;
  title: string;
  question: string;
  contextText?: string;
  audioUrl?: string;
  transcriptSnippet?: string;
  options?: string[];
  optionsDetailed?: EnglishTaskOption[];
  correctAnswer: string;
  acceptedVariants?: string[];
  explanation: string;
  ckeTrap: string;
  source: string;
  points: number;
  ai_tutor_rubric?: any;
}

export interface EnglishSection {
  id: string;
  numericId: number;
  pillarId: 'pillar-use-of-english' | 'pillar-listening' | 'pillar-reading' | 'pillar-writing';
  pillarName: string;
  title: string;
  short_title: string;
  icon: string;
  points_range: string;
  description: string;
  cke_spec: string;
  taskCount?: number;
}

export const ENGLISH_SECTIONS: EnglishSection[] = [
  // FILAR I: ZNAJOMOŚĆ ŚRODKÓW JĘZYKOWYCH (DZIAŁY 1–5, 375 ZADAŃ)
  {
    id: 'eng-dzial-1',
    numericId: 1,
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    title: 'Dział 1: Czasy gramatyczne i aspekty w narracji i dialogu',
    short_title: 'Czasy i Aspekty',
    icon: 'Clock',
    points_range: '4–6 pkt',
    description: '7 modułów: Present Simple/Continuous, Past Simple/Continuous, Present Perfect, Past Perfect, Czasy Przyszłe i Miks Maturalny.',
    cke_spec: 'Zadania 8–9 CKE (MCQ i luki wielokrotnego wyboru)',
    taskCount: 75
  },
  {
    id: 'eng-dzial-2',
    numericId: 2,
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    title: 'Dział 2: Konstrukcje czasownikowe: Gerund, Infinitive i Modals',
    short_title: 'Gerundium, Bezokolicznik i Modalne',
    icon: 'Zap',
    points_range: '3–5 pkt',
    description: 'Czasowniki z to-infinitive vs -ing, czasowniki modalne (don’t have to vs mustn’t, should, would rather) oraz rekcja czasowników.',
    cke_spec: 'Zadania 8–10 CKE (Minidialogi i parafrazy)',
    taskCount: 75
  },
  {
    id: 'eng-dzial-3',
    numericId: 3,
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    title: 'Dział 3: Okresy warunkowe (Conditionals 0, 1, 2) i zdania czasowe',
    short_title: 'Okresy Warunkowe i Cloze',
    icon: 'GitFork',
    points_range: '3–4 pkt',
    description: 'Zasada if / unless / as soon as, First & Second Conditional, spójniki logiczne i zaimki względne (Open Cloze).',
    cke_spec: 'Zadania 9 i 11 CKE (Wybór wielokrotny i uzupełnianie luk)',
    taskCount: 45
  },
  {
    id: 'eng-dzial-4',
    numericId: 4,
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    title: 'Dział 4: Słowotwórstwo i części mowy (Word Formation & False Friends)',
    short_title: 'Słowotwórstwo i Leksyka',
    icon: 'Shuffle',
    points_range: '3–4 pkt',
    description: 'Przedrostki zaprzeczające (un-, in-, im-, dis-), sufiksy rzeczownikowe i przymiotnikowe oraz pułapki fałszywych przyjaciół.',
    cke_spec: 'Zadanie 10 CKE (Słowotwórstwo w nawiasach)',
    taskCount: 60
  },
  {
    id: 'eng-dzial-5',
    numericId: 5,
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    title: 'Dział 5: Parafrazy zdań i tłumaczenie fragmentów PL -> EN',
    short_title: 'Parafrazy i Tłumaczenia',
    icon: 'Repeat',
    points_range: '6–8 pkt',
    description: 'Mowa zależna (Reported Speech), strona bierna (Passive Voice), too/enough oraz tłumaczenie fragmentów zdań z polskimi kalkami.',
    cke_spec: 'Zadania 10–11 CKE (Zadania otwarte ze słowem w nawiasie)',
    taskCount: 120
  },

  // FILAR II: ROZUMIENIE ZE SŁUCHU (DZIAŁY 6–8, 375 ZADAŃ)
  {
    id: 'eng-dzial-6',
    numericId: 6,
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    title: 'Dział 6: Wybór wielokrotny ze słuchu (MCQ ABC: intencja, detal, kontekst)',
    short_title: 'Słuchanie: Wybór ABC',
    icon: 'Headphones',
    points_range: '5–6 pkt',
    description: 'Wywiady, komunikaty radiowe i rozmowy codzienne. Rozpoznawanie intencji autora, kontekstu i faktów.',
    cke_spec: 'Zadanie 1 CKE (Wybór wielokrotny ze słuchu)',
    taskCount: 120
  },
  {
    id: 'eng-dzial-7',
    numericId: 7,
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    title: 'Dział 7: Dobieranie wypowiedzi do osób i sytuacji (Matching z pułapką word-spotting)',
    short_title: 'Słuchanie: Dobieranie',
    icon: 'Users',
    points_range: '4–5 pkt',
    description: 'Wiązka 4 nagrań dopasowywana do 5 zdań podsumowujących. Neutralizacja pułapki dosłownego powtórzenia słowa.',
    cke_spec: 'Zadanie 2 CKE (Dobieranie wypowiedzi)',
    taskCount: 120
  },
  {
    id: 'eng-dzial-8',
    numericId: 8,
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    title: 'Dział 8: Zadania otwarte i luki ze słuchu (Notatki, formularze i Prawda/Fałsz)',
    short_title: 'Słuchanie: Notatki i P/F',
    icon: 'FileEdit',
    points_range: '4–5 pkt',
    description: 'Zapisywanie liczb, dat, cen, godzin i kluczowych pojęć w formularzach oraz wnioskowanie po spójnikach kontrastu.',
    cke_spec: 'Zadanie 3 CKE (Zadanie otwarte ze słuchu)',
    taskCount: 135
  },

  // FILAR III: ROZUMIENIE TEKSTÓW PISANYCH (DZIAŁY 9–11, 500 ZADAŃ)
  {
    id: 'eng-dzial-9',
    numericId: 9,
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    title: 'Dział 9: Dobieranie nagłówków do akapitów (Headings Matching A–D)',
    short_title: 'Czytanie: Dobieranie Nagłówków',
    icon: 'Layout',
    points_range: '4–5 pkt',
    description: 'Identyfikacja głównej myśli akapitu (gist) oraz eliminacja nagłówków bazujących na detalach pobocznych.',
    cke_spec: 'Zadanie 4 CKE (Dobieranie nagłówków)',
    taskCount: 130
  },
  {
    id: 'eng-dzial-10',
    numericId: 10,
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    title: 'Dział 10: Uzupełnianie luk brakującymi zdaniami (Gapped Text A–E)',
    short_title: 'Czytanie: Luki Spójnościowe',
    icon: 'FileText',
    points_range: '4–5 pkt',
    description: 'Kohezja tekstu, zaimki anaforiczne (this, they, such), łączniki przyczynowo-skutkowe i sekwencja logiczna.',
    cke_spec: 'Zadanie 7 CKE (Zdania w lukach tekstu)',
    taskCount: 120
  },
  {
    id: 'eng-dzial-11',
    numericId: 11,
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    title: 'Dział 11: Artykuły, teksty narracyjne i mediacja językowa (MCQ ABCD & Notatki)',
    short_title: 'Czytanie: Artykuły i Mediacja',
    icon: 'Inbox',
    points_range: '8–10 pkt',
    description: 'Weryfikacja faktów, intencja autora i dobór tytułu oraz uzupełnianie streszczeń i e-maili na podstawie wiązek tekstów.',
    cke_spec: 'Zadania 5 i 6 CKE (Wybór wielokrotny i mediacja)',
    taskCount: 250
  },

  // FILAR IV: WYPOWIEDŹ PISEMNA (DZIAŁY 12–15, 250 ZADAŃ)
  {
    id: 'eng-dzial-12',
    numericId: 12,
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    title: 'Dział 12: Warsztat 4 kropek CKE (Odniesienie vs Rozwinięcie)',
    short_title: 'Pisanie: Warsztat 4 Kropek',
    icon: 'Target',
    points_range: '5 pkt',
    description: 'Rygor CKE: 1 fakt (0.5 pkt) vs 2–3 powiązane szczegóły/uzasadnienia (1 pkt) dla każdego z 4 podpunktów polecenia.',
    cke_spec: 'Zadanie 12 CKE (Kryterium Treści)',
    taskCount: 80
  },
  {
    id: 'eng-dzial-13',
    numericId: 13,
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    title: 'Dział 13: Poprawność językowa i eliminacja błędów L1 w e-mailu/blogu',
    short_title: 'Pisanie: Poprawność i Błędy L1',
    icon: 'CheckSquare',
    points_range: '2 pkt',
    description: 'Wykrywanie i eliminacja kalk z języka polskiego, błędów rekcji przyimkowej i fałszywych przyjaciół w tekście.',
    cke_spec: 'Zadanie 12 CKE (Poprawność środków językowych)',
    taskCount: 60
  },
  {
    id: 'eng-dzial-14',
    numericId: 14,
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    title: 'Dział 14: Spójność i architektura wypowiedzi (Linking Words & Cohesion)',
    short_title: 'Pisanie: Spójność i Łączniki',
    icon: 'Layers',
    points_range: '2 pkt',
    description: 'Łączniki kontrastu (However, Although), przyczyny (As a result, Due to) oraz zwroty otwierające i zamykające e-mail.',
    cke_spec: 'Zadanie 12 CKE (Spójność i logika wypowiedzi)',
    taskCount: 50
  },
  {
    id: 'eng-dzial-15',
    numericId: 15,
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    title: 'Dział 15: Pełne formy maturalne Zadania 12 CKE (E-mail i Post na blogu z rubryką AI)',
    short_title: 'Pisanie: Pełne E-maile i Blogi',
    icon: 'PenTool',
    points_range: '12 pkt',
    description: 'Kompletne wypowiedzi pisemne (80–130 słów) we wszystkich 14 kręgach tematycznych matury z wzorcowymi tekstami i kryteriami AI.',
    cke_spec: 'Zadanie 12 CKE (Pełna forma wypowiedzi pisemnej)',
    taskCount: 60
  }
];
