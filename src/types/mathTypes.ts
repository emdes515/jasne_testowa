export type MathTaskType =
  | 'SINGLE_CHOICE'
  | 'NUMERIC_INPUT'
  | 'OPEN_PROOF'
  | 'OPEN_CALCULATION'
  | 'TRUE_FALSE'
  | 'TWO_PART';

export interface MathTaskOption {
  id: string;
  text: string;
  is_correct?: boolean;
  numberLine?: any;
}

export interface MathTask {
  id: string;
  topicId: string;
  sectionTitle: string;
  taskNumber?: string;
  type: MathTaskType;
  content: string;
  options?: MathTaskOption[];
  correct_answer?: string;
  explanation?: string;
  matura_tip?: string;
  points: number;
  sourceYear?: string;
  badge?: string;
  hasVisual?: boolean;
  visualType?: 'diagram' | 'numberLine' | 'plot';
  visualData?: any;
}

export interface MathSection {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  icon: string;
  points_range: string;
  description: string;
  cke_formula_page?: string;
}

export const MATH_SECTIONS: MathSection[] = [
  {
    id: 'dzial-1',
    numericId: 1,
    title: 'Dział 1: Liczby rzeczywiste i błędy przybliżeń',
    short_title: 'Liczby rzeczywiste',
    icon: 'Binary',
    points_range: '2–4 pkt',
    description: 'Wartość bezwzględna, przedziały, błędy bezwzględne i względne, procenty.',
    cke_formula_page: 'str. 4–5'
  },
  {
    id: 'dzial-2',
    numericId: 2,
    title: 'Dział 2: Potęgi, pierwiastki i logarytmy',
    short_title: 'Potęgi i logarytmy',
    icon: 'Zap',
    points_range: '4–6 pkt',
    description: 'Działania na potęgach, prawa działań na logarytmach, definicja logarytmu.',
    cke_formula_page: 'str. 5–6'
  },
  {
    id: 'dzial-3',
    numericId: 3,
    title: 'Dział 3: Równania i nierówności liniowe oraz kwadratowe',
    short_title: 'Równania i nierówności',
    icon: 'Equal',
    points_range: '4–6 pkt',
    description: 'Delta, pierwiastki, nierówności kwadratowe z osią liczbową, równania wymierne.',
    cke_formula_page: 'str. 6–7'
  },
  {
    id: 'dzial-4',
    numericId: 4,
    title: 'Dział 4: Układy równań i algebra',
    short_title: 'Układy równań i wzory',
    icon: 'Layers',
    points_range: '2–4 pkt',
    description: 'Wzory skróconego mnożenia, rozkład na czynniki, układy liniowe z dwiema niewiadomymi.',
    cke_formula_page: 'str. 7–8'
  },
  {
    id: 'dzial-5',
    numericId: 5,
    title: 'Dział 5: Własności i wykresy funkcji',
    short_title: 'Funkcje i wykresy',
    icon: 'TrendingUp',
    points_range: '3–5 pkt',
    description: 'Dziedzina, zbiór wartości, miejsca zerowe, odczytywanie własności z wykresu, przesunięcia $f(x-p)+q$.',
    cke_formula_page: 'str. 9–10'
  },
  {
    id: 'dzial-6',
    numericId: 6,
    title: 'Dział 6: Funkcja liniowa i kwadratowa',
    short_title: 'Liniowa i kwadratowa',
    icon: 'Activity',
    points_range: '4–6 pkt',
    description: 'Postać ogólna, kanoniczna i iloczynowa paraboli, wierzchołek $(p,q)$, monotoniczność.',
    cke_formula_page: 'str. 10–12'
  },
  {
    id: 'dzial-7',
    numericId: 7,
    title: 'Dział 7: Ciągi liczbowe (arytmetyczny i geometryczny)',
    short_title: 'Ciągi liczbowe',
    icon: 'ListOrdered',
    points_range: '4–6 pkt',
    description: 'Wzory na $n$-ty wyraz, sumę $S_n$, zależność między trzema kolejnymi wyrazami.',
    cke_formula_page: 'str. 13–14'
  },
  {
    id: 'dzial-8',
    numericId: 8,
    title: 'Dział 8: Trygonometria kąta ostrego i wypukłego',
    short_title: 'Trygonometria',
    icon: 'Compass',
    points_range: '3–5 pkt',
    description: 'Definicje $\\sin, \\cos, \\operatorname{tg}$, jedynka trygonometryczna, wzory redukcyjne.',
    cke_formula_page: 'str. 14–16'
  },
  {
    id: 'dzial-9',
    numericId: 9,
    title: 'Dział 9: Planimetria (trójkąty, czworokąty, okręgi)',
    short_title: 'Planimetria',
    icon: 'Triangle',
    points_range: '5–8 pkt',
    description: 'Twierdzenie Pitagorasa, sinusów/cosinusów, kąty w okręgu, podobieństwo trójkątów.',
    cke_formula_page: 'str. 16–21'
  },
  {
    id: 'dzial-10',
    numericId: 10,
    title: 'Dział 10: Geometria analityczna na płaszczyźnie',
    short_title: 'Geometria analityczna',
    icon: 'Grid',
    points_range: '4–6 pkt',
    description: 'Długość odcinka, środek odcinka, proste prostopadłe i równoległe, równanie okręgu.',
    cke_formula_page: 'str. 21–23'
  },
  {
    id: 'dzial-11',
    numericId: 11,
    title: 'Dział 11: Stereometria (bryły przestrzenne)',
    short_title: 'Stereometria',
    icon: 'Box',
    points_range: '4–6 pkt',
    description: 'Graniastosłupy, ostrosłupy, walec, stożek, kula – pole powierzchni i objętość, kąty w bryłach.',
    cke_formula_page: 'str. 24–27'
  },
  {
    id: 'dzial-12',
    numericId: 12,
    title: 'Dział 12: Kombinatoryka i reguła mnożenia',
    short_title: 'Kombinatoryka',
    icon: 'Shuffle',
    points_range: '2–3 pkt',
    description: 'Reguła mnożenia, reguła dodawania, permutacje, zliczanie układów cyfr i liter.',
    cke_formula_page: 'str. 28'
  },
  {
    id: 'dzial-13',
    numericId: 13,
    title: 'Dział 13: Rachunek prawdopodobieństwa',
    short_title: 'Prawdopodobieństwo',
    icon: 'Dice5',
    points_range: '3–5 pkt',
    description: 'Model klasyczny $P(A) = \\frac{|A|}{|\\Omega|}$, drzewka stochastyczne, własności prawdopodobieństwa.',
    cke_formula_page: 'str. 28–29'
  },
  {
    id: 'dzial-14',
    numericId: 14,
    title: 'Dział 14: Statystyka opisowa',
    short_title: 'Statystyka',
    icon: 'BarChart2',
    points_range: '2–3 pkt',
    description: 'Średnia arytmetyczna, średnia ważona, mediana, dominanta, odchylenie standardowe.',
    cke_formula_page: 'str. 29–30'
  },
  {
    id: 'dzial-15',
    numericId: 15,
    title: 'Dział 15: Zadania optymalizacyjne',
    short_title: 'Optymalizacja',
    icon: 'Target',
    points_range: '4–5 pkt',
    description: 'Maksymalizacja pola, minimalizacja kosztu przy pomocy wierzchołka paraboli.',
    cke_formula_page: 'str. 11, 31'
  }
];
