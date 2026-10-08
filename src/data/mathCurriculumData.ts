/**
 * mathCurriculumData.ts
 * 
 * 15 Oficjalnych Działów CKE Matematyki Podstawowej (Formuła 2023)
 * z pełnym kurikulum Core-4 Bento dla silnika nauki LearnView (Trophy Road),
 * 75 autentycznymi mikrolekcjami (po dokładnie 5 na każdy dział)
 * oraz mapą lekcji opartą o bazę 1500 zweryfikowanych zadań CKE.
 */

import { TopicDocument, LessonDocument, LessonMetadataItem } from '../schema_firestore';
import { LessonTheoryPill } from '../types';
import rawGeneratedTasks from './math/generated/all_1500_tasks.json';
import { enrichTaskWithVisual } from './mathVisualRegistry';

export interface MathLessonDefinition {
  id: string;
  order: number;
  title: string;
  short_title: string;
  badge: string;
  archetypeCode: string;
  estimated_time_formatted: string;
  theory_pill: LessonTheoryPill;
  formula_sheet?: {
    lessonId: string;
    title: string;
    formulas: { title: string; latex: string }[];
    goldenRule: string;
    ckeTrap?: { error: string; correct: string; description: string } | null;
  };
}

export interface MathTopicBlueprint {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  description: string;
  icon: string;
  color: string;
  matura_points_range: string;
  importance: 'CRITICAL_PEWNIAK' | 'HIGH';
  lessons: MathLessonDefinition[];
}

export const MATH_TOPIC_BLUEPRINTS: MathTopicBlueprint[] = [
  {
    "id": "dzial-1",
    "numericId": 1,
    "title": "Liczby rzeczywiste, procenty i błędy przybliżeń",
    "short_title": "Liczby rzeczywiste",
    "description": "Wartość bezwzględna na osi liczbowej, obliczenia procentowe, podwyżki i obniżki wielokrotne oraz błąd bezwzględny i względny.",
    "icon": "Hash",
    "color": "#FFB800",
    "matura_points_range": "3–5 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-1-1",
        "order": 1,
        "title": "Wartość bezwzględna i nierówności na osi liczbowej",
        "short_title": "Wartość bezwzględna",
        "badge": "Lekcja 1.1",
        "archetypeCode": "ARCH-03",
        "estimated_time_formatted": "~6 min",
        "theory_pill": {
          "reading_time_minutes": 3.5,
          "concept_essence": "Geometryczna interpretacja wartości bezwzględnej $|x - a|$ to odległość liczby $x$ od punktu środkowego $a$ na osi liczbowej. Nierówność $|x - a| \\le r$ oznacza przedział domknięty wokół środka $a$ o promieniu $r$, czyli $\\langle a - r, a + r \\rangle$. Z kolei nierówność ze znakiem $\\ge r$ oznacza obszar zewnętrzny: odległość większą lub równą $r$, czyli sumę dwóch przedziałów nieskończonych $(-\\infty, a - r\\rangle \\cup \\langle a + r, +\\infty)$.",
          "matura_context": "CKE Formuła 2023 • Zadanie 1–3 w arkuszu • Waga: 1 pkt (Żelazny pewniak maturalny).",
          "plain_polish": "Z polskiego na nasze: Nierówność $|x - 3| \\le 5$ czytaj jako: „stań w punkcie 3 i zrób maksymalnie 5 kroków w lewo i 5 kroków w prawo”. W lewo dochodzisz do $3 - 5 = -2$, w prawo do $3 + 5 = 8$. Zbiorem rozwiązań jest przedział $\\langle -2, 8 \\rangle$.",
          "algorithm_steps": [
            {
              "stepNumber": 1,
              "title": "Wyznacz punkt środkowy a",
              "description": "Zawsze odwróć znak stojący przy liczbie w nawiasie bezwzględnym. Dla $|x - 5|$ środek to $a = 5$. Dla $|x + 4|$ środek to $a = -4$.",
              "tip": "Pamiętaj: wzór ogólny to $|x - a|$."
            },
            {
              "stepNumber": 2,
              "title": "Odczytaj promień r",
              "description": "Liczba stojąca po prawej stronie nierówności to promień (odległość od środka). Wymóg: $r \\ge 0$.",
              "tip": "Promień nigdy nie może być ujemny!"
            },
            {
              "stepNumber": 3,
              "title": "Oblicz krańce przedziału",
              "description": "Lewy kraniec to $a - r$, a prawy kraniec to $a + r$.",
              "tip": "Dla nierówności ostrej $\\le$ zapisz przedział domknięty $\\langle a-r, a+r \\rangle$."
            },
            {
              "stepNumber": 4,
              "title": "Dobierz zwrot przedziałów",
              "description": "Znak $\\le$ lub $<$ oznacza wnętrze przedziału. Znak $\\ge$ lub $>$ oznacza dwa skrzydła zewnętrzne rozłączne.",
              "tip": "Przy $\\ge$ rozwiązanie ma postać sumy $(-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)$."
            }
          ],
          "core_formulas": [
            {
              "name": "Nierówność wewnętrzna (promień r wokół a)",
              "formula": "|x - a| \\le r \\iff x \\in \\langle a - r, a + r \\rangle"
            },
            {
              "name": "Nierówność zewnętrzna (dwa skrzydła)",
              "formula": "|x - a| \\ge r \\iff x \\in (-\\infty, a - r\\rangle \\cup \\langle a + r, +\\infty)"
            }
          ],
          "worked_examples": [
            {
              "title": "Zadanie Standardowe CKE",
              "points": "1 pkt",
              "problem": "Wskaż zbiór wszystkich rozwiązań nierówności $|x + 4| \\le 3$.",
              "solution": "1. Zapisujemy wyrażenie w postaci kanonicznej: $|x - (-4)| \\le 3$.\n2. Środek przedziału: $a = -4$, promień: $r = 3$.\n3. Lewy kraniec: $-4 - 3 = -7$. Prawy kraniec: $-4 + 3 = -1$.\n4. Ponieważ nierówność to $\\le$, rozwiązaniem jest przedział domknięty: $x \\in \\langle -7, -1 \\rangle$.",
              "keyInsight": "Środkiem przedziału dla $|x + 4|$ jest $-4$, a nie $+4$."
            },
            {
              "title": "Zadanie Podchwytliwe CKE (Odczyt z osi)",
              "points": "2 pkt",
              "problem": "Zbiorem rozwiązań pewnej nierówności z wartością bezwzględną jest suma przedziałów $(-\\infty, -2\\rangle \\cup \\langle 8, +\\infty)$. Zapisz tę nierówność.",
              "solution": "1. Wyznaczamy środek $a$ jako średnią arytmetyczną krańców: $a = \\frac{-2 + 8}{2} = \\frac{6}{2} = 3$.\n2. Wyznaczamy promień $r$ jako odległość od środka do prawego krańca: $r = 8 - 3 = 5$.\n3. Ponieważ zbiór rozwiązań to obszary zewnętrzne, znak nierówności to $\\ge$.\n4. Otrzymujemy nierówność: $|x - 3| \\ge 5$.",
              "keyInsight": "Środek to zawsze średnia krańców: $a = \\frac{x_1 + x_2}{2}$."
            }
          ],
          "trap_details": {
            "fail": "Błąd: Przyjmowanie $+4$ jako środka dla $|x + 4|$ i wyznaczanie przedziału $\\langle 1, 7 \\rangle$.",
            "win": "Poprawnie: $|x + 4| = |x - (-4)|$, więc środek leży w punkcie $-4$, a przedział to $\\langle -7, -1 \\rangle$.",
            "explanation": "Znak plus wewnątrz wartości bezwzględnej oznacza, że punkt odniesienia leży na ujemnej półosi. Zawsze odwracaj znak stojący przy liczbie!",
            "ckeTip": "Na marginesie arkusza naszkicuj oś: zaznacz środek i odlicz promień w lewo i w prawo."
          },
          "exam_trap": "Najczęstszy błąd CKE to pomyłka znaku środka przedziału: dla $|x + 4|$ środkiem jest $-4$, a NIE $+4$!",
          "key_points": [
            "$|x - a| \\le r$ daje zawsze pojedynczy przedział domknięty $\\langle a - r, a + r \\rangle$.",
            "$|x - a| \\ge r$ daje sumę dwóch przedziałów nieskończonych $(-\\infty, a - r\\rangle \\cup \\langle a + r, +\\infty)$.",
            "Środek przedziału to średnia arytmetyczna jego końców: $a = \\frac{x_1 + x_2}{2}$."
          ]
        }
      },
      {
        "id": "math-lesson-1-2",
        "order": 2,
        "title": "Obliczenia procentowe, podatki i wielokrotne obniżki",
        "short_title": "Obliczenia procentowe",
        "badge": "Lekcja 1.2",
        "archetypeCode": "ARCH-04",
        "estimated_time_formatted": "~6 min",
        "theory_pill": {
          "reading_time_minutes": 3.5,
          "concept_essence": "W zadaniach maturalnych kluczem jest operowanie mnożnikami dziesiętnymi zamiast żmudnego układania proporcji. Podwyżka o $p\\%$ to pomnożenie kwoty przez $(1 + 0{,}01p)$. Obniżka o $p\\%$ to pomnożenie przez $(1 - 0{,}01p)$. Przy wielokrotnych zmianach cen (np. obniżka o 20%, a potem kolejna o 30%) mnożymy kolejne współczynniki: $C_{konc} = C_0 \\cdot 0{,}8 \\cdot 0{,}7 = 0{,}56 \\cdot C_0$. Oznacza to obniżkę o $44\\%$, a NIE o $50\\%$!",
          "matura_context": "CKE Formuła 2023 • Zadanie 2–4 w arkuszu • Waga: 1–2 pkt.",
          "plain_polish": "Z polskiego na nasze: Jeśli bluza kosztuje $x$ zł i tanieje o 20%, płacisz 80% jej wartości, czyli $0{,}8x$. Jeśli potem drożeje o 10%, to nową cenę mnożysz przez $1{,}1$, co daje $0{,}8x \\cdot 1{,}1 = 0{,}88x$. Ostatecznie cena spadła o 12%, a nie o 10%.",
          "algorithm_steps": [
            {
              "stepNumber": 1,
              "title": "Wyznacz mnożniki dla każdej zmiany",
              "description": "Dla podwyżki o $p\\%$ mnożnik to $(1 + \\frac{p}{100})$. Dla obniżki o $p\\%$ mnożnik to $(1 - \\frac{p}{100})$.",
              "tip": "Np. $+25\\% \\to 1{,}25$, a $-15\\% \\to 0{,}85$."
            },
            {
              "stepNumber": 2,
              "title": "Wymnóż kolejne mnożniki",
              "description": "Cena po serii zmian to iloczyn ceny początkowej i wszystkich kolejnych mnożników: $C_{konc} = C_0 \\cdot M_1 \\cdot M_2$.",
              "tip": "Kolejność obniżek nie ma znaczenia dla wyniku końcowego ($0{,}8 \\cdot 0{,}7 = 0{,}7 \\cdot 0{,}8$)."
            },
            {
              "stepNumber": 3,
              "title": "Odczytaj zmianę procentową",
              "description": "Jeśli mnożnik łączny wynosi $0{,}64$, to cena stanowi $64\\%$ ceny wyjściowej, czyli zmalała o $100\\% - 64\\% = 36\\%$.",
              "tip": "Gdy mnożnik $> 1$, nastąpił wzrost. Gdy $< 1$, nastąpił spadek."
            }
          ],
          "core_formulas": [
            {
              "name": "Mnożnik podwyżki",
              "formula": "C_1 = C_0 \\cdot \\left(1 + \\frac{p}{100}\\right)"
            },
            {
              "name": "Mnożnik obniżki",
              "formula": "C_1 = C_0 \\cdot \\left(1 - \\frac{p}{100}\\right)"
            },
            {
              "name": "Wielokrotna zmiana ceny",
              "formula": "C_{konc} = C_0 \\cdot \\left(1 \\pm \\frac{p_1}{100}\\right) \\cdot \\left(1 \\pm \\frac{p_2}{100}\\right)"
            }
          ],
          "worked_examples": [
            {
              "title": "Zadanie Standardowe CKE",
              "points": "1 pkt",
              "problem": "Cenę towaru wynoszącą 250 zł obniżono o 20%, a następnie nową cenę podwyższono o 10%. Ile wynosi cena końcowa?",
              "solution": "1. Mnożnik pierwszej obniżki: $1 - 0{,}20 = 0{,}80$.\n2. Mnożnik drugiej podwyżki: $1 + 0{,}10 = 1{,}10$.\n3. Cena końcowa: $C_{konc} = 250 \\cdot 0{,}80 \\cdot 1{,}10 = 200 \\cdot 1{,}10 = 220$ zł.",
              "keyInsight": "Druga zmiana odnosi się do nowej kwoty 200 zł, a nie do początkowych 250 zł."
            },
            {
              "title": "Zadanie Podchwytliwe CKE (Rachunek wsteczny)",
              "points": "2 pkt",
              "problem": "Po dwukrotnej obniżce ceny, za każdym razem o 20%, płaszcz kosztuje 192 zł. Oblicz cenę płaszcza przed obiema obniżkami.",
              "solution": "1. Oznaczmy cenę początkową jako $C_0$.\n2. Każda obniżka oznacza pomnożenie przez $0{,}80$.\n3. Układamy równanie: $C_0 \\cdot 0{,}80 \\cdot 0{,}80 = 192$.\n4. $C_0 \\cdot 0{,}64 = 192 \\implies C_0 = \\frac{192}{0{,}64} = \\frac{19200}{64} = 300$ zł.",
              "keyInsight": "Nigdy nie dodawaj 40% do 192 zł! Dzielimy cenę końcową przez mnożnik łączny $0{,}64$."
            }
          ],
          "trap_details": {
            "fail": "Błąd: Dodawanie procentów obniżek: $20\\% + 30\\% = 50\\%$ obniżki.",
            "win": "Poprawnie: Mnożenie współczynników: $0{,}8 \\cdot 0{,}7 = 0{,}56$, czyli realna obniżka to $1 - 0{,}56 = 44\\%$.",
            "explanation": "Druga obniżka liczona jest z już obniżonej kwoty. Sumowanie procentów to jeden z najczęstszych błędów w zadaniach za 1 pkt.",
            "ckeTip": "W zadaniach z dwiema zmianami zawsze zapisuj równanie z mnożnikami dziesiętnymi."
          },
          "exam_trap": "Nigdy nie sumuj procentów kolejnych obniżek lub podwyżek! $20\\% + 30\\% \\ne 50\\%$.",
          "key_points": [
            "Każda kolejna zmiana procentowa odnosi się do NOWEJ, aktualnej kwoty.",
            "Mnożnik obniżki o $p\\%$ to $(1 - 0{,}01p)$. Mnożnik podwyżki to $(1 + 0{,}01p)$.",
            "Cena początkowa przy rachunku wstecznym to $C_0 = \\frac{C_{konc}}{M_{laczny}}$."
          ]
        }
      },
      {
        "id": "math-lesson-1-3",
        "order": 3,
        "title": "Błąd bezwzględny i błąd względny przybliżenia",
        "short_title": "Błędy przybliżeń",
        "badge": "Lekcja 1.3",
        "archetypeCode": "ARCH-05",
        "estimated_time_formatted": "~6 min",
        "theory_pill": {
          "reading_time_minutes": 3.5,
          "concept_essence": "Błąd bezwzględny $\\Delta = |x - a|$ mierzy odchylenie przybliżenia $a$ od wartości dokładnej $x$ w jednostkach mierzonych (np. cm, zł). Błąd względny $\\delta = \\frac{\\Delta}{|x|} = \\frac{|x - a|}{|x|}$ mierzy jakość przybliżenia w procentach. Kluczem arkusza CKE jest ułamek: w mianowniku ZAWSZE musi znaleźć się wartość DOKŁADNA $x$, a nie przybliżenie $a$!",
          "matura_context": "CKE Formuła 2023 • Zadanie 1–3 w arkuszu • Waga: 1 pkt.",
          "plain_polish": "Z polskiego na nasze: Mierzyłeś deskę o długości 200 cm (wartość dokładna) i wyszło ci 196 cm (przybliżenie). Pomyliłeś się o 4 cm (błąd bezwzględny). Twój błąd względny to $\\frac{4}{200} = 2\\%$. Zawsze dzielisz przez to, ile deska naprawdę miała (prawdę), a nie przez twój odczyt.",
          "algorithm_steps": [
            {
              "stepNumber": 1,
              "title": "Rozróżnij wartość dokładną od przybliżenia",
              "description": "Z treści zadania precyzyjnie wskaż: $x$ = wartość dokładna, $a$ = przybliżenie.",
              "tip": "Słowa klucze: „liczba a jest przybliżeniem liczby x”."
            },
            {
              "stepNumber": 2,
              "title": "Oblicz błąd bezwzględny Δ",
              "description": "Zastosuj wartość bezwzględną różnicy: $\\Delta = |x - a|$. Błąd bezwzględny jest zawsze nieujemny.",
              "tip": "Np. $|50 - 54| = |-4| = 4$."
            },
            {
              "stepNumber": 3,
              "title": "Oblicz błąd względny δ",
              "description": "Podziel błąd bezwzględny $\\Delta$ przez moduł wartości DOKŁADNEJ: $\\delta = \\frac{\\Delta}{|x|}$.",
              "tip": "Pamiętaj: w mianowniku stoi $x$ (wartość dokładna)!"
            },
            {
              "stepNumber": 4,
              "title": "Zamień na procenty",
              "description": "Pomnóż wynik przez $100\\%$, aby podać błąd procentowy.",
              "tip": "Np. $\\frac{4}{50} \\cdot 100\\% = 8\\%$."
            }
          ],
          "core_formulas": [
            {
              "name": "Błąd bezwzględny",
              "formula": "\\Delta = |x - a|"
            },
            {
              "name": "Błąd względny (procentowy)",
              "formula": "\\delta = \\frac{|x - a|}{|x|} \\cdot 100\\%"
            }
          ],
          "worked_examples": [
            {
              "title": "Zadanie Standardowe CKE",
              "points": "1 pkt",
              "problem": "Liczba 17{,}5 jest przybliżeniem z nadmiarem liczby dokładnej 16. Oblicz błąd względny tego przybliżenia.",
              "solution": "1. Wartość dokładna: $x = 16$, przybliżenie: $a = 17{,}5$.\n2. Błąd bezwzględny: $\\Delta = |16 - 17{,}5| = |-1{,}5| = 1{,}5$.\n3. Błąd względny: $\\delta = \\frac{1{,}5}{16} \\cdot 100\\% = \\frac{150}{16}\\% = 9{,}375\\%$.",
              "keyInsight": "W mianowniku musi znaleźć się 16 (dokładna), a nie 17,5."
            },
            {
              "title": "Zadanie Podchwytliwe CKE (Wyznaczanie liczby)",
              "points": "2 pkt",
              "problem": "Błąd względny przybliżenia liczby dodatniej $x$ liczbą $a = 48$ wynosi 4%, przy czym jest to przybliżenie z niedomiarem. Wyznacz dokładną wartość liczby $x$.",
              "solution": "1. Przybliżenie z niedomiarem oznacza, że $a < x$, czyli $48 < x$, stąd $|x - 48| = x - 48$.\n2. Wzór na błąd względny: $\\frac{x - 48}{x} = 0{,}04$.\n3. Mnożymy obustronnie przez $x$: $x - 48 = 0{,}04x$.\n4. $0{,}96x = 48 \\implies x = \\frac{48}{0{,}96} = 50$.",
              "keyInsight": "Przybliżenie z niedomiarem oznacza: $x - a > 0$."
            }
          ],
          "trap_details": {
            "fail": "Błąd: Wstawienie przybliżenia do mianownika: $\\delta = \\frac{|x - a|}{a}$.",
            "win": "Poprawnie: W mianowniku stoi zawsze wartość dokładna: $\\delta = \\frac{|x - a|}{|x|}$.",
            "explanation": "CKE niemal zawsze umieszcza w opcjach testowych wynik z odwrotnym mianownikiem. Zapamiętaj: dzielisz przez prawdę (wartość dokładną).",
            "ckeTip": "Sprawdź w karcie wzorów CKE na stronie 2: wzór wyraźnie podaje $|x|$ w mianowniku."
          },
          "exam_trap": "W mianowniku błędu względnego ZAWSZE stoi wartość DOKŁADNA $x$, a nie przybliżenie $a$!",
          "key_points": [
            "Błąd bezwzględny ma miano (jednostkę), a błąd względny jest bezwymiarowy.",
            "W mianowniku błędu względnego ZAWSZE stoi wartość dokładna $|x|$.",
            "Przybliżenie z nadmiarem: $a > x$. Przybliżenie z niedomiarem: $a < x$."
          ]
        }
      },
      {
        "id": "math-lesson-1-4",
        "order": 4,
        "title": "Potęgi o wykładnikach całkowitych i wymiernych",
        "short_title": "Potęgi i pierwiastki",
        "badge": "Lekcja 1.4",
        "archetypeCode": "ARCH-01",
        "estimated_time_formatted": "~6 min",
        "theory_pill": {
          "reading_time_minutes": 3.5,
          "concept_essence": "Wszystkie zadania CKE z potęg opierają się na jednej żelaznej strategii: sprowadzeniu wszystkich liczb złożonych do potęg liczb pierwszych ($2, 3, 5, 7$). Przykładowo $4 \\to 2^2$, $8 \\to 2^3$, $27 \\to 3^3$, $81 \\to 3^4$. Wykładnik ujemny odwraca liczbę: $a^{-n} = \\frac{1}{a^n}$, a wykładnik ułamkowy zamienia się w pierwiastek: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$.",
          "matura_context": "CKE Formuła 2023 • Zadanie 1–2 w arkuszu • Waga: 1 pkt (Żelazny pewniak).",
          "plain_polish": "Z polskiego na nasze: Widzisz w zadaniu $8^{4} \\cdot 16^{-2}$? Nie mnóż tych liczb! Rozbij na dwójki: $(2^3)^4 \\cdot (2^4)^{-2} = 2^{12} \\cdot 2^{-8} = 2^{4} = 16$. Zawsze schodź do najmniejszego wspólnego klocka liczbowego.",
          "algorithm_steps": [
            {
              "stepNumber": 1,
              "title": "Sprowadź podstawy do liczb pierwszych",
              "description": "Zastąp liczby złożone ich rozkładem: $4=2^2$, $8=2^3$, $9=3^2$, $16=2^4$, $27=3^3$, $32=2^5$, $81=3^4$.",
              "tip": "Pamiętaj o nawiasach przy potęgowaniu, np. $(3^3)^2$."
            },
            {
              "stepNumber": 2,
              "title": "Zastosuj potęgowanie potęgi",
              "description": "Wymnóż wykładniki zewnętrzne i wewnętrzne: $(a^r)^s = a^{r \\cdot s}$.",
              "tip": "Np. $(2^3)^{-2} = 2^{-6}$."
            },
            {
              "stepNumber": 3,
              "title": "Uprość licznik i mianownik",
              "description": "Przy mnożeniu potęg o tej samej podstawie dodawaj wykładniki ($a^r \\cdot a^s = a^{r+s}$). Przy dzieleniu odejmuj ($a^r : a^s = a^{r-s}$).",
              "tip": "Uważaj na podwójny minus przy odejmowaniu ujemnego wykładnika: $3 - (-4) = 3 + 4 = 7$."
            },
            {
              "stepNumber": 4,
              "title": "Zinterpretuj wynik",
              "description": "Jeśli wykładnik jest ułamkiem, zamień na pierwiastek. Jeśli jest ujemny, odwróć ułamek.",
              "tip": "$a^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{a}}$."
            }
          ],
          "core_formulas": [
            {
              "name": "Iloczyn potęg o tej samej podstawie",
              "formula": "a^r \\cdot a^s = a^{r+s}"
            },
            {
              "name": "Iloraz potęg o tej samej podstawie",
              "formula": "\\frac{a^r}{a^s} = a^{r-s}"
            },
            {
              "name": "Potęga potęgi",
              "formula": "(a^r)^s = a^{r \\cdot s}"
            },
            {
              "name": "Wykładnik wymierny (pierwiastek)",
              "formula": "a^{\\frac{m}{n}} = \\sqrt[n]{a^m} \\quad (a > 0)"
            }
          ],
          "worked_examples": [
            {
              "title": "Zadanie Standardowe CKE",
              "points": "1 pkt",
              "problem": "Oblicz wartość wyrażenia $\\frac{27^3 \\cdot 9^{-2}}{81}$.",
              "solution": "1. Sprowadzamy podstawy do liczby 3: $27 = 3^3$, $9 = 3^2$, $81 = 3^4$.\n2. $27^3 = (3^3)^3 = 3^9$.\n3. $9^{-2} = (3^2)^{-2} = 3^{-4}$.\n4. Licznik: $3^9 \\cdot 3^{-4} = 3^{9 + (-4)} = 3^5$.\n5. Iloraz: $\\frac{3^5}{3^4} = 3^{5 - 4} = 3^1 = 3$.",
              "keyInsight": "Działania na potęgach wykonuj wyłącznie po sprowadzeniu do wspólnej podstawy 3."
            },
            {
              "title": "Zadanie Podchwytliwe CKE (Wykładniki ułamkowe)",
              "points": "2 pkt",
              "problem": "Zapisz liczbę $\\sqrt[3]{4} \\cdot 8^{\\frac{1}{2}} \\cdot 16^{-\\frac{3}{4}}$ w postaci potęgi liczby 2.",
              "solution": "1. $\\sqrt[3]{4} = 4^{\\frac{1}{3}} = (2^2)^{\\frac{1}{3}} = 2^{\\frac{2}{3}}$.\n2. $8^{\\frac{1}{2}} = (2^3)^{\\frac{1}{2}} = 2^{\\frac{3}{2}}$.\n3. $16^{-\\frac{3}{4}} = (2^4)^{-\\frac{3}{4}} = 2^{4 \\cdot (-\\frac{3}{4})} = 2^{-3}$.\n4. Mnożymy wszystkie składniki, sumując wykładniki: $\\frac{2}{3} + \\frac{3}{2} - 3 = \\frac{4}{6} + \\frac{9}{6} - \\frac{18}{6} = -\\frac{5}{6}$.\n5. Wynik: $2^{-\\frac{5}{6}}$.",
              "keyInsight": "Wykładnik pierwiastka $\\sqrt[n]{a^m}$ zawsze trafia do mianownika ułamka: $\\frac{m}{n}$."
            }
          ],
          "trap_details": {
            "fail": "Błąd: Mnożenie podstaw potęg: $2^3 \\cdot 3^2 = 6^5$ lub dodawanie potęg: $2^3 + 2^4 = 2^7$.",
            "win": "Poprawnie: Prawa działań dotyczą tylko mnożenia i dzielenia TYCH SAMYCH podstaw. Dla sumy wyłącz wspólny czynnik: $2^3 + 2^4 = 2^3(1 + 2) = 3 \\cdot 8 = 24$.",
            "explanation": "Nie istnieje wzór na sumę potęg! Gdy widzisz dodawanie potęg o tej samej podstawie, wyciągaj najmniejszą potęgę przed nawias.",
            "ckeTip": "Gdy w arkuszu masz sumę potęg w ułamku, zawsze wyłącz wspólny czynnik przed nawias w liczniku i mianowniku."
          },
          "exam_trap": "Nigdy nie mnóż podstaw potęg, gdy wykładniki są różne: $2^3 \\cdot 3^2 \\ne 6^5$!",
          "key_points": [
            "Zawsze rozkładaj podstawy na potęgi liczb pierwszych ($2, 3, 5$).",
            "Ujemny wykładnik odwraca liczbę: $a^{-n} = \\frac{1}{a^n}$.",
            "Przy sumie potęg o tej samej podstawie wyciągaj wspólny czynnik przed nawias."
          ]
        }
      },
      {
        "id": "math-lesson-1-5",
        "order": 5,
        "title": "Logarytmy i ich własności w zadaniach CKE",
        "short_title": "Własności logarytmów",
        "badge": "Lekcja 1.5",
        "archetypeCode": "ARCH-02",
        "estimated_time_formatted": "~6 min",
        "theory_pill": {
          "reading_time_minutes": 3.5,
          "concept_essence": "Logarytm $\\log_a b = c$ odpowiada na pytanie: „Do jakiej potęgi muszę podnieść podstawę $a$, aby otrzymać liczbę $b$?” ($a^c = b$). W arkuszu CKE królują dwa prawa działań: suma logarytmów o tej samej podstawie zamienia się w logarytm iloczynu: $\\log_a x + \\log_a y = \\log_a(xy)$, a różnica w logarytm ilorazu: $\\log_a x - \\log_a y = \\log_a(\\frac{x}{y})$. Zawsze pamiętaj o założeniach: podstawa $a > 0, a \\neq 1$ oraz liczba logarytmowana $b > 0$.",
          "matura_context": "CKE Formuła 2023 • Zadanie 1–3 w arkuszu • Waga: 1 pkt (Żelazny pewniak).",
          "plain_polish": "Z polskiego na nasze: $\\log_2 8$ to pytanie: „2 do ilu daje 8?”. Wynik to 3, bo $2^3 = 8$. Z kolei liczbę stojącą przed logarytmem (np. $2\\log_3 6$) musisz najpierw „wciągnąć do środka na plecy liczby jako potęgę”: $\\log_3(6^2) = \\log_3 36$.",
          "algorithm_steps": [
            {
              "stepNumber": 1,
              "title": "Wciągnij współczynniki sprzed logarytmów",
              "description": "Jeśli przed logarytmem stoi liczba (np. $2\\log_a x$ lub $\\frac{1}{2}\\log_a y$), wciągnij ją jako wykładnik: $k\\log_a x = \\log_a(x^k)$.",
              "tip": "Wzory na sumę i różnicę logarytmów działają TYLKO wtedy, gdy przed logarytmem nie ma żadnej liczby!"
            },
            {
              "stepNumber": 2,
              "title": "Upewnij się, że podstawy są identyczne",
              "description": "Możesz dodawać i odejmować logarytmy wyłącznie wtedy, gdy mają dokładnie taką samą podstawę $a$.",
              "tip": "Brak podstawy oznacza logarytm dziesiętny o podstawie 10: $\\log x = \\log_{10} x$."
            },
            {
              "stepNumber": 3,
              "title": "Zastosuj wzór na sumę lub różnicę",
              "description": "Plus zamienia się w mnożenie w argumencie: $\\log_a x + \\log_a y = \\log_a(xy)$. Minus zamienia się w dzielenie: $\\log_a x - \\log_a y = \\log_a(\\frac{x}{y})$.",
              "tip": "Najpierw wykonaj działanie wewnątrz nawiasu."
            },
            {
              "stepNumber": 4,
              "title": "Oblicz wartość liczbową z definicji",
              "description": "Zadaj sobie pytanie: „podstawa do jakiej potęgi daje liczbę w argumencie?”.",
              "tip": "Np. $\\log_3 9 = 2$, bo $3^2 = 9$."
            }
          ],
          "core_formulas": [
            {
              "name": "Definicja logarytmu",
              "formula": "\\log_a b = c \\iff a^c = b \\quad (a > 0, a \\neq 1, b > 0)"
            },
            {
              "name": "Suma logarytmów (logarytm iloczynu)",
              "formula": "\\log_a x + \\log_a y = \\log_a (xy)"
            },
            {
              "name": "Różnica logarytmów (logarytm ilorazu)",
              "formula": "\\log_a x - \\log_a y = \\log_a \\left(\\frac{x}{y}\\right)"
            },
            {
              "name": "Wciąganie współczynnika do potęgi",
              "formula": "k \\cdot \\log_a x = \\log_a (x^k)"
            }
          ],
          "worked_examples": [
            {
              "title": "Zadanie Standardowe CKE",
              "points": "1 pkt",
              "problem": "Oblicz wartość wyrażenia $\\log_3 18 - \\log_3 2$.",
              "solution": "1. Podstawy są jednakowe i równe 3. Przed logarytmami nie ma współczynników.\n2. Stosujemy wzór na różnicę logarytmów: $\\log_3 18 - \\log_3 2 = \\log_3 \\left(\\frac{18}{2}\\right)$.\n3. Dzielimy argument: $\\frac{18}{2} = 9$.\n4. Obliczamy: $\\log_3 9 = 2$, ponieważ $3^2 = 9$.",
              "keyInsight": "Różnica logarytmów to logarytm ilorazu, a nie iloraz logarytmów!"
            },
            {
              "title": "Zadanie Podchwytliwe CKE (Współczynnik i suma)",
              "points": "2 pkt",
              "problem": "Oblicz wartość wyrażenia $2\\log_2 6 - \\log_2 9 + \\log_2\\left(\\frac{1}{4}\\right)$.",
              "solution": "1. Krok 1: Wciągamy liczbę 2 do potęgi argumentu: $2\\log_2 6 = \\log_2 (6^2) = \\log_2 36$.\n2. Krok 2: Łączymy pierwsze dwa logarytmy: $\\log_2 36 - \\log_2 9 = \\log_2 \\left(\\frac{36}{9}\\right) = \\log_2 4 = 2$.\n3. Krok 3: Obliczamy trzeci składnik z definicji: $\\log_2 \\left(\\frac{1}{4}\\right) = -2$, ponieważ $2^{-2} = \\frac{1}{4}$.\n4. Krok 4: Dodajemy wyniki: $2 + (-2) = 0$.",
              "keyInsight": "Nigdy nie łącz logarytmów, dopóki stoi przed nimi jakikolwiek współczynnik liczbowy!"
            }
          ],
          "trap_details": {
            "fail": "Błąd: Łączenie logarytmów przed wciągnięciem liczby 2: $2\\log_2 6 - \\log_2 9 = 2\\log_2(6/9)$.",
            "win": "Poprawnie: Najpierw wciągnij 2 do potęgi: $\\log_2(6^2) - \\log_2 9 = \\log_2 36 - \\log_2 9 = \\log_2(36/9) = \\log_2 4 = 2$.",
            "explanation": "Wzory na sumę i różnicę logarytmów wymagają czystych logarytmów z przodu. Liczba stojąca przed logarytmem blokuje zastosowanie wzorów!",
            "ckeTip": "Najpierw potęga do środka, dopiero potem mnożenie/dzielenie argumentów."
          },
          "exam_trap": "Zanim zastosujesz wzór na sumę lub różnicę logarytmów, bezwzględnie wciągnij każdą liczbę stojącą przed logarytmem jako potęgę!",
          "key_points": [
            "Logarytm to pytanie o wykładnik potęgi: $\\log_a b = c \\iff a^c = b$.",
            "Liczbę przed logarytmem ZAWSZE wciągaj jako potęgę: $k\\log_a x = \\log_a(x^k)$.",
            "Suma logarytmów to iloczyn argumentów, różnica to iloraz argumentów."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-2",
    "numericId": 2,
    "title": "Wyrażenia algebraiczne i wzory skróconego mnożenia",
    "short_title": "Wyrażenia algebraiczne",
    "description": "Oficjalne zagadnienia CKE: Wyrażenia algebraiczne i wzory skróconego mnożenia. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 2–4 pkt.",
    "icon": "Hash",
    "color": "#FFB800",
    "matura_points_range": "2–4 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-2-1",
        "order": 1,
        "title": "Kwadrat sumy, kwadrat różnicy i różnica kwadratów",
        "short_title": "Kwadrat sumy, kwadrat różnicy i różnica kwadratów",
        "badge": "Lekcja 2.1",
        "archetypeCode": "ARCH-21",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 2: Kwadrat sumy, kwadrat różnicy i różnica kwadratów. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 2 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 2.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Kwadrat sumy, kwadrat różnicy i różnica kwadratów.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-2-2",
        "order": 2,
        "title": "Suma i różnica sześcianów w przekształceniach",
        "short_title": "Suma i różnica sześcianów w przekształceniach",
        "badge": "Lekcja 2.2",
        "archetypeCode": "ARCH-22",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 2: Suma i różnica sześcianów w przekształceniach. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 2 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 2.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Suma i różnica sześcianów w przekształceniach.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-2-3",
        "order": 3,
        "title": "Grupowanie wyrazów i wyłączanie wspólnego czynnika",
        "short_title": "Grupowanie wyrazów i wyłączanie wspólnego czynnika",
        "badge": "Lekcja 2.3",
        "archetypeCode": "ARCH-23",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 2: Grupowanie wyrazów i wyłączanie wspólnego czynnika. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 2 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 2.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Grupowanie wyrazów i wyłączanie wspólnego czynnika.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-2-4",
        "order": 4,
        "title": "Dzielenie wielomianów i pierwiastki wielomianu",
        "short_title": "Dzielenie wielomianów i pierwiastki wielomianu",
        "badge": "Lekcja 2.4",
        "archetypeCode": "ARCH-24",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 2: Dzielenie wielomianów i pierwiastki wielomianu. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 2 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 2.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Dzielenie wielomianów i pierwiastki wielomianu.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-2-5",
        "order": 5,
        "title": "Wzory skróconego mnożenia w dowodach algebraicznych",
        "short_title": "Wzory skróconego mnożenia w dowodach algebraicznych",
        "badge": "Lekcja 2.5",
        "archetypeCode": "ARCH-25",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 2: Wzory skróconego mnożenia w dowodach algebraicznych. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 2 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 2.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wzory skróconego mnożenia w dowodach algebraicznych.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-3",
    "numericId": 3,
    "title": "Równania i nierówności liniowe oraz kwadratowe",
    "short_title": "Równania i nierówności",
    "description": "Oficjalne zagadnienia CKE: Równania i nierówności liniowe oraz kwadratowe. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 3–6 pkt.",
    "icon": "Hash",
    "color": "#FFB800",
    "matura_points_range": "3–6 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-3-1",
        "order": 1,
        "title": "Równania i nierówności liniowe z jedną niewiadomą",
        "short_title": "Równania i nierówności liniowe z jedną niewiadomą",
        "badge": "Lekcja 3.1",
        "archetypeCode": "ARCH-31",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 3: Równania i nierówności liniowe z jedną niewiadomą. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 3 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 3.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Równania i nierówności liniowe z jedną niewiadomą.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-3-2",
        "order": 2,
        "title": "Równania kwadratowe: wyróżnik delta i pierwiastki",
        "short_title": "Równania kwadratowe",
        "badge": "Lekcja 3.2",
        "archetypeCode": "ARCH-32",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 3: Równania kwadratowe: wyróżnik delta i pierwiastki. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 3 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 3.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Równania kwadratowe: wyróżnik delta i pierwiastki.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-3-3",
        "order": 3,
        "title": "Nierówności kwadratowe: szkicowanie paraboli",
        "short_title": "Nierówności kwadratowe",
        "badge": "Lekcja 3.3",
        "archetypeCode": "ARCH-33",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 3: Nierówności kwadratowe: szkicowanie paraboli. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 3 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 3.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Nierówności kwadratowe: szkicowanie paraboli.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-3-4",
        "order": 4,
        "title": "Równania wymierne i wyznaczanie dziedziny",
        "short_title": "Równania wymierne i wyznaczanie dziedziny",
        "badge": "Lekcja 3.4",
        "archetypeCode": "ARCH-34",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 3: Równania wymierne i wyznaczanie dziedziny. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 3 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 3.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Równania wymierne i wyznaczanie dziedziny.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-3-5",
        "order": 5,
        "title": "Równania wielomianowe w postaci iloczynowej",
        "short_title": "Równania wielomianowe w postaci iloczynowej",
        "badge": "Lekcja 3.5",
        "archetypeCode": "ARCH-35",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 3: Równania wielomianowe w postaci iloczynowej. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 3 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 3.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Równania wielomianowe w postaci iloczynowej.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-4",
    "numericId": 4,
    "title": "Układy równań liniowych z dwiema niewiadomymi",
    "short_title": "Układy równań",
    "description": "Oficjalne zagadnienia CKE: Układy równań liniowych z dwiema niewiadomymi. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 2–3 pkt.",
    "icon": "Hash",
    "color": "#FFB800",
    "matura_points_range": "2–3 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-4-1",
        "order": 1,
        "title": "Układy równań liniowych: metoda podstawiania",
        "short_title": "Układy równań liniowych",
        "badge": "Lekcja 4.1",
        "archetypeCode": "ARCH-41",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 4: Układy równań liniowych: metoda podstawiania. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 4 • Waga: 2–3 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 4.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Układy równań liniowych: metoda podstawiania.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-4-2",
        "order": 2,
        "title": "Układy równań liniowych: metoda przeciwnych współczynników",
        "short_title": "Układy równań liniowych",
        "badge": "Lekcja 4.2",
        "archetypeCode": "ARCH-42",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 4: Układy równań liniowych: metoda przeciwnych współczynników. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 4 • Waga: 2–3 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 4.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Układy równań liniowych: metoda przeciwnych współczynników.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-4-3",
        "order": 3,
        "title": "Interpretacja geometryczna układu równań",
        "short_title": "Interpretacja geometryczna układu równań",
        "badge": "Lekcja 4.3",
        "archetypeCode": "ARCH-43",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 4: Interpretacja geometryczna układu równań. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 4 • Waga: 2–3 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 4.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Interpretacja geometryczna układu równań.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-4-4",
        "order": 4,
        "title": "Zadania tekstowe prowadzące do układu równań",
        "short_title": "Zadania tekstowe prowadzące do układu równań",
        "badge": "Lekcja 4.4",
        "archetypeCode": "ARCH-44",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 4: Zadania tekstowe prowadzące do układu równań. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 4 • Waga: 2–3 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 4.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Zadania tekstowe prowadzące do układu równań.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-4-5",
        "order": 5,
        "title": "Układy równań z parametrem w zadaniach CKE",
        "short_title": "Układy równań z parametrem w zadaniach CKE",
        "badge": "Lekcja 4.5",
        "archetypeCode": "ARCH-45",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 4: Układy równań z parametrem w zadaniach CKE. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 4 • Waga: 2–3 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 4.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Układy równań z parametrem w zadaniach CKE.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-5",
    "numericId": 5,
    "title": "Funkcje – pojęcie, własności i odczytywanie z wykresu",
    "short_title": "Własności funkcji",
    "description": "Oficjalne zagadnienia CKE: Funkcje – pojęcie, własności i odczytywanie z wykresu. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 3–5 pkt.",
    "icon": "FunctionSquare",
    "color": "#FFB800",
    "matura_points_range": "3–5 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-5-1",
        "order": 1,
        "title": "Dziedzina i zbiór wartości funkcji z wykresu",
        "short_title": "Dziedzina i zbiór wartości funkcji z wykresu",
        "badge": "Lekcja 5.1",
        "archetypeCode": "ARCH-51",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 5: Dziedzina i zbiór wartości funkcji z wykresu. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 5 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 5.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Dziedzina i zbiór wartości funkcji z wykresu.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-5-2",
        "order": 2,
        "title": "Miejsca zerowe i punkty przecięcia z osiami",
        "short_title": "Miejsca zerowe i punkty przecięcia z osiami",
        "badge": "Lekcja 5.2",
        "archetypeCode": "ARCH-52",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 5: Miejsca zerowe i punkty przecięcia z osiami. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 5 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 5.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Miejsca zerowe i punkty przecięcia z osiami.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-5-3",
        "order": 3,
        "title": "Monotoniczność i przedziały stałego znaku",
        "short_title": "Monotoniczność i przedziały stałego znaku",
        "badge": "Lekcja 5.3",
        "archetypeCode": "ARCH-53",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 5: Monotoniczność i przedziały stałego znaku. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 5 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 5.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Monotoniczność i przedziały stałego znaku.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-5-4",
        "order": 4,
        "title": "Wartość największa i najmniejsza w przedziale",
        "short_title": "Wartość największa i najmniejsza w przedziale",
        "badge": "Lekcja 5.4",
        "archetypeCode": "ARCH-54",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 5: Wartość największa i najmniejsza w przedziale. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 5 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 5.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wartość największa i najmniejsza w przedziale.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-5-5",
        "order": 5,
        "title": "Przekształcenia wykresów: translacja i symetrie",
        "short_title": "Przekształcenia wykresów",
        "badge": "Lekcja 5.5",
        "archetypeCode": "ARCH-55",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 5: Przekształcenia wykresów: translacja i symetrie. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 5 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 5.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Przekształcenia wykresów: translacja i symetrie.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-6",
    "numericId": 6,
    "title": "Funkcja liniowa i jej zastosowania",
    "short_title": "Funkcja liniowa",
    "description": "Oficjalne zagadnienia CKE: Funkcja liniowa i jej zastosowania. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 3–5 pkt.",
    "icon": "FunctionSquare",
    "color": "#FFB800",
    "matura_points_range": "3–5 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-6-1",
        "order": 1,
        "title": "Współczynnik kierunkowy a i wyraz wolny b",
        "short_title": "Współczynnik kierunkowy a i wyraz wolny b",
        "badge": "Lekcja 6.1",
        "archetypeCode": "ARCH-61",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 6: Współczynnik kierunkowy a i wyraz wolny b. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 6 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 6.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Współczynnik kierunkowy a i wyraz wolny b.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-6-2",
        "order": 2,
        "title": "Wyznaczanie wzoru prostej przez dwa punkty",
        "short_title": "Wyznaczanie wzoru prostej przez dwa punkty",
        "badge": "Lekcja 6.2",
        "archetypeCode": "ARCH-62",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 6: Wyznaczanie wzoru prostej przez dwa punkty. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 6 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 6.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wyznaczanie wzoru prostej przez dwa punkty.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-6-3",
        "order": 3,
        "title": "Warunek równoległości i prostopadłości prostych",
        "short_title": "Warunek równoległości i prostopadłości prostych",
        "badge": "Lekcja 6.3",
        "archetypeCode": "ARCH-63",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 6: Warunek równoległości i prostopadłości prostych. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 6 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 6.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Warunek równoległości i prostopadłości prostych.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-6-4",
        "order": 4,
        "title": "Miejsce zerowe funkcji liniowej i nierówności",
        "short_title": "Miejsce zerowe funkcji liniowej i nierówności",
        "badge": "Lekcja 6.4",
        "archetypeCode": "ARCH-64",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 6: Miejsce zerowe funkcji liniowej i nierówności. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 6 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 6.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Miejsce zerowe funkcji liniowej i nierówności.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-6-5",
        "order": 5,
        "title": "Zastosowania praktyczne funkcji liniowej",
        "short_title": "Zastosowania praktyczne funkcji liniowej",
        "badge": "Lekcja 6.5",
        "archetypeCode": "ARCH-65",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 6: Zastosowania praktyczne funkcji liniowej. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 6 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 6.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Zastosowania praktyczne funkcji liniowej.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-7",
    "numericId": 7,
    "title": "Funkcja kwadratowa",
    "short_title": "Funkcja kwadratowa",
    "description": "Oficjalne zagadnienia CKE: Funkcja kwadratowa. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 4–7 pkt.",
    "icon": "FunctionSquare",
    "color": "#FFB800",
    "matura_points_range": "4–7 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-7-1",
        "order": 1,
        "title": "Postać ogólna, kanoniczna i iloczynowa paraboli",
        "short_title": "Postać ogólna, kanoniczna i iloczynowa paraboli",
        "badge": "Lekcja 7.1",
        "archetypeCode": "ARCH-71",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 7: Postać ogólna, kanoniczna i iloczynowa paraboli. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 7 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 7.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Postać ogólna, kanoniczna i iloczynowa paraboli.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-7-2",
        "order": 2,
        "title": "Wierzchołek paraboli W = (p, q) i oś symetrii",
        "short_title": "Wierzchołek paraboli W = (p, q) i oś symetrii",
        "badge": "Lekcja 7.2",
        "archetypeCode": "ARCH-72",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 7: Wierzchołek paraboli W = (p, q) i oś symetrii. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 7 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 7.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wierzchołek paraboli W = (p, q) i oś symetrii.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-7-3",
        "order": 3,
        "title": "Wartość najmniejsza i największa w przedziale domkniętym",
        "short_title": "Wartość najmniejsza i największa w przedziale domkniętym",
        "badge": "Lekcja 7.3",
        "archetypeCode": "ARCH-73",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 7: Wartość najmniejsza i największa w przedziale domkniętym. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 7 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 7.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wartość najmniejsza i największa w przedziale domkniętym.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-7-4",
        "order": 4,
        "title": "Wzory Viete a w zadaniach zamkniętych CKE",
        "short_title": "Wzory Viete a w zadaniach zamkniętych CKE",
        "badge": "Lekcja 7.4",
        "archetypeCode": "ARCH-74",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 7: Wzory Viete a w zadaniach zamkniętych CKE. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 7 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 7.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wzory Viete a w zadaniach zamkniętych CKE.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-7-5",
        "order": 5,
        "title": "Zadania optymalizacyjne z funkcją kwadratową",
        "short_title": "Zadania optymalizacyjne z funkcją kwadratową",
        "badge": "Lekcja 7.5",
        "archetypeCode": "ARCH-75",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 7: Zadania optymalizacyjne z funkcją kwadratową. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 7 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 7.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Zadania optymalizacyjne z funkcją kwadratową.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-8",
    "numericId": 8,
    "title": "Funkcja wykładnicza i logarytmiczna",
    "short_title": "Wykładnicza i logarytm",
    "description": "Oficjalne zagadnienia CKE: Funkcja wykładnicza i logarytmiczna. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 2–4 pkt.",
    "icon": "FunctionSquare",
    "color": "#FFB800",
    "matura_points_range": "2–4 pkt",
    "importance": "HIGH",
    "lessons": [
      {
        "id": "math-lesson-8-1",
        "order": 1,
        "title": "Wykres i własności funkcji wykładniczej f(x) = a^x",
        "short_title": "Wykres i własności funkcji wykładniczej f(x) = a^x",
        "badge": "Lekcja 8.1",
        "archetypeCode": "ARCH-81",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 8: Wykres i własności funkcji wykładniczej f(x) = a^x. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 8 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 8.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wykres i własności funkcji wykładniczej f(x) = a^x.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-8-2",
        "order": 2,
        "title": "Proste równania i nierówności wykładnicze",
        "short_title": "Proste równania i nierówności wykładnicze",
        "badge": "Lekcja 8.2",
        "archetypeCode": "ARCH-82",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 8: Proste równania i nierówności wykładnicze. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 8 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 8.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Proste równania i nierówności wykładnicze.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-8-3",
        "order": 3,
        "title": "Wykres i własności funkcji logarytmicznej",
        "short_title": "Wykres i własności funkcji logarytmicznej",
        "badge": "Lekcja 8.3",
        "archetypeCode": "ARCH-83",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 8: Wykres i własności funkcji logarytmicznej. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 8 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 8.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wykres i własności funkcji logarytmicznej.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-8-4",
        "order": 4,
        "title": "Równania logarytmiczne i warunki dziedziny",
        "short_title": "Równania logarytmiczne i warunki dziedziny",
        "badge": "Lekcja 8.4",
        "archetypeCode": "ARCH-84",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 8: Równania logarytmiczne i warunki dziedziny. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 8 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 8.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Równania logarytmiczne i warunki dziedziny.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-8-5",
        "order": 5,
        "title": "Zastosowania funkcji wykładniczej w modelowaniu",
        "short_title": "Zastosowania funkcji wykładniczej w modelowaniu",
        "badge": "Lekcja 8.5",
        "archetypeCode": "ARCH-85",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 8: Zastosowania funkcji wykładniczej w modelowaniu. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 8 • Waga: 2–4 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 8.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Zastosowania funkcji wykładniczej w modelowaniu.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-9",
    "numericId": 9,
    "title": "Ciągi liczbowe – arytmetyczny i geometryczny",
    "short_title": "Ciągi liczbowe",
    "description": "Oficjalne zagadnienia CKE: Ciągi liczbowe – arytmetyczny i geometryczny. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 4–7 pkt.",
    "icon": "Activity",
    "color": "#FFB800",
    "matura_points_range": "4–7 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-9-1",
        "order": 1,
        "title": "Wzór ogólny i badanie monotoniczności ciągu",
        "short_title": "Wzór ogólny i badanie monotoniczności ciągu",
        "badge": "Lekcja 9.1",
        "archetypeCode": "ARCH-91",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 9: Wzór ogólny i badanie monotoniczności ciągu. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 9 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 9.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wzór ogólny i badanie monotoniczności ciągu.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-9-2",
        "order": 2,
        "title": "Ciąg arytmetyczny: różnica r i wzór na n-ty wyraz",
        "short_title": "Ciąg arytmetyczny",
        "badge": "Lekcja 9.2",
        "archetypeCode": "ARCH-92",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 9: Ciąg arytmetyczny: różnica r i wzór na n-ty wyraz. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 9 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 9.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Ciąg arytmetyczny: różnica r i wzór na n-ty wyraz.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-9-3",
        "order": 3,
        "title": "Suma n początkowych wyrazów ciągu arytmetycznego",
        "short_title": "Suma n początkowych wyrazów ciągu arytmetycznego",
        "badge": "Lekcja 9.3",
        "archetypeCode": "ARCH-93",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 9: Suma n początkowych wyrazów ciągu arytmetycznego. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 9 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 9.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Suma n początkowych wyrazów ciągu arytmetycznego.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-9-4",
        "order": 4,
        "title": "Ciąg geometryczny: iloraz q, n-ty wyraz i suma S_n",
        "short_title": "Ciąg geometryczny",
        "badge": "Lekcja 9.4",
        "archetypeCode": "ARCH-94",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 9: Ciąg geometryczny: iloraz q, n-ty wyraz i suma S_n. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 9 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 9.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Ciąg geometryczny: iloraz q, n-ty wyraz i suma S_n.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-9-5",
        "order": 5,
        "title": "Warunek trzech kolejnych wyrazów i zadania mieszane",
        "short_title": "Warunek trzech kolejnych wyrazów i zadania mieszane",
        "badge": "Lekcja 9.5",
        "archetypeCode": "ARCH-95",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 9: Warunek trzech kolejnych wyrazów i zadania mieszane. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 9 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 9.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Warunek trzech kolejnych wyrazów i zadania mieszane.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-10",
    "numericId": 10,
    "title": "Trygonometria kąta ostrego i wypukłego",
    "short_title": "Trygonometria",
    "description": "Oficjalne zagadnienia CKE: Trygonometria kąta ostrego i wypukłego. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 3–5 pkt.",
    "icon": "Activity",
    "color": "#FFB800",
    "matura_points_range": "3–5 pkt",
    "importance": "HIGH",
    "lessons": [
      {
        "id": "math-lesson-10-1",
        "order": 1,
        "title": "Definicje sin, cos, tg w trójkącie prostokątnym",
        "short_title": "Definicje sin, cos, tg w trójkącie prostokątnym",
        "badge": "Lekcja 10.1",
        "archetypeCode": "ARCH-101",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 10: Definicje sin, cos, tg w trójkącie prostokątnym. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 10 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 10.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Definicje sin, cos, tg w trójkącie prostokątnym.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-10-2",
        "order": 2,
        "title": "Wartości funkcji dla kątów 30, 45 i 60 stopni",
        "short_title": "Wartości funkcji dla kątów 30, 45 i 60 stopni",
        "badge": "Lekcja 10.2",
        "archetypeCode": "ARCH-102",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 10: Wartości funkcji dla kątów 30, 45 i 60 stopni. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 10 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 10.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wartości funkcji dla kątów 30, 45 i 60 stopni.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-10-3",
        "order": 3,
        "title": "Jedynka trygonometryczna i tożsamości kąta ostrego",
        "short_title": "Jedynka trygonometryczna i tożsamości kąta ostrego",
        "badge": "Lekcja 10.3",
        "archetypeCode": "ARCH-103",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 10: Jedynka trygonometryczna i tożsamości kąta ostrego. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 10 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 10.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Jedynka trygonometryczna i tożsamości kąta ostrego.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-10-4",
        "order": 4,
        "title": "Wzory redukcyjne dla kątów wypukłych",
        "short_title": "Wzory redukcyjne dla kątów wypukłych",
        "badge": "Lekcja 10.4",
        "archetypeCode": "ARCH-104",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 10: Wzory redukcyjne dla kątów wypukłych. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 10 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 10.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Wzory redukcyjne dla kątów wypukłych.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-10-5",
        "order": 5,
        "title": "Twierdzenie sinusów i cosinusów w trójkątach",
        "short_title": "Twierdzenie sinusów i cosinusów w trójkątach",
        "badge": "Lekcja 10.5",
        "archetypeCode": "ARCH-105",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 10: Twierdzenie sinusów i cosinusów w trójkątach. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 10 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 10.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Twierdzenie sinusów i cosinusów w trójkątach.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-11",
    "numericId": 11,
    "title": "Planimetria – trójkąty, czworokąty i okręgi",
    "short_title": "Planimetria",
    "description": "Oficjalne zagadnienia CKE: Planimetria – trójkąty, czworokąty i okręgi. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 5–8 pkt.",
    "icon": "Box",
    "color": "#FFB800",
    "matura_points_range": "5–8 pkt",
    "importance": "CRITICAL_PEWNIAK",
    "lessons": [
      {
        "id": "math-lesson-11-1",
        "order": 1,
        "title": "Pola trójkątów i twierdzenie Pitagorasa",
        "short_title": "Pola trójkątów i twierdzenie Pitagorasa",
        "badge": "Lekcja 11.1",
        "archetypeCode": "ARCH-111",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 11: Pola trójkątów i twierdzenie Pitagorasa. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 11 • Waga: 5–8 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 11.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Pola trójkątów i twierdzenie Pitagorasa.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-11-2",
        "order": 2,
        "title": "Cechy podobieństwa i przystawania trójkątów",
        "short_title": "Cechy podobieństwa i przystawania trójkątów",
        "badge": "Lekcja 11.2",
        "archetypeCode": "ARCH-112",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 11: Cechy podobieństwa i przystawania trójkątów. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 11 • Waga: 5–8 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 11.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Cechy podobieństwa i przystawania trójkątów.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-11-3",
        "order": 3,
        "title": "Własności czworokątów: trapez, romb, równoległobok",
        "short_title": "Własności czworokątów",
        "badge": "Lekcja 11.3",
        "archetypeCode": "ARCH-113",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 11: Własności czworokątów: trapez, romb, równoległobok. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 11 • Waga: 5–8 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 11.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Własności czworokątów: trapez, romb, równoległobok.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-11-4",
        "order": 4,
        "title": "Kąty środkowe i wpisane oparte na tym samym łuku",
        "short_title": "Kąty środkowe i wpisane oparte na tym samym łuku",
        "badge": "Lekcja 11.4",
        "archetypeCode": "ARCH-114",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 11: Kąty środkowe i wpisane oparte na tym samym łuku. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 11 • Waga: 5–8 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 11.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Kąty środkowe i wpisane oparte na tym samym łuku.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-11-5",
        "order": 5,
        "title": "Okrąg wpisany i opisany na wielokątach",
        "short_title": "Okrąg wpisany i opisany na wielokątach",
        "badge": "Lekcja 11.5",
        "archetypeCode": "ARCH-115",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 11: Okrąg wpisany i opisany na wielokątach. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 11 • Waga: 5–8 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 11.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Okrąg wpisany i opisany na wielokątach.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-12",
    "numericId": 12,
    "title": "Geometria analityczna na płaszczyźnie kartezjańskiej",
    "short_title": "Geometria analityczna",
    "description": "Oficjalne zagadnienia CKE: Geometria analityczna na płaszczyźnie kartezjańskiej. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 4–6 pkt.",
    "icon": "Box",
    "color": "#FFB800",
    "matura_points_range": "4–6 pkt",
    "importance": "HIGH",
    "lessons": [
      {
        "id": "math-lesson-12-1",
        "order": 1,
        "title": "Odległość dwóch punktów i współrzędne środka odcinka",
        "short_title": "Odległość dwóch punktów i współrzędne środka odcinka",
        "badge": "Lekcja 12.1",
        "archetypeCode": "ARCH-121",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 12: Odległość dwóch punktów i współrzędne środka odcinka. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 12 • Waga: 4–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 12.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Odległość dwóch punktów i współrzędne środka odcinka.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-12-2",
        "order": 2,
        "title": "Równanie prostej przechodzącej przez dwa punkty",
        "short_title": "Równanie prostej przechodzącej przez dwa punkty",
        "badge": "Lekcja 12.2",
        "archetypeCode": "ARCH-122",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 12: Równanie prostej przechodzącej przez dwa punkty. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 12 • Waga: 4–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 12.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Równanie prostej przechodzącej przez dwa punkty.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-12-3",
        "order": 3,
        "title": "Proste prostopadłe i równoległe na płaszczyźnie",
        "short_title": "Proste prostopadłe i równoległe na płaszczyźnie",
        "badge": "Lekcja 12.3",
        "archetypeCode": "ARCH-123",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 12: Proste prostopadłe i równoległe na płaszczyźnie. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 12 • Waga: 4–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 12.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Proste prostopadłe i równoległe na płaszczyźnie.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-12-4",
        "order": 4,
        "title": "Równanie okręgu w postaci kanonicznej",
        "short_title": "Równanie okręgu w postaci kanonicznej",
        "badge": "Lekcja 12.4",
        "archetypeCode": "ARCH-124",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 12: Równanie okręgu w postaci kanonicznej. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 12 • Waga: 4–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 12.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Równanie okręgu w postaci kanonicznej.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-12-5",
        "order": 5,
        "title": "Punkty wspólne prostej i okręgu oraz pola figur",
        "short_title": "Punkty wspólne prostej i okręgu oraz pola figur",
        "badge": "Lekcja 12.5",
        "archetypeCode": "ARCH-125",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 12: Punkty wspólne prostej i okręgu oraz pola figur. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 12 • Waga: 4–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 12.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Punkty wspólne prostej i okręgu oraz pola figur.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-13",
    "numericId": 13,
    "title": "Stereometria – graniastosłupy, ostrosłupy i bryły",
    "short_title": "Stereometria",
    "description": "Oficjalne zagadnienia CKE: Stereometria – graniastosłupy, ostrosłupy i bryły. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 4–7 pkt.",
    "icon": "Box",
    "color": "#FFB800",
    "matura_points_range": "4–7 pkt",
    "importance": "HIGH",
    "lessons": [
      {
        "id": "math-lesson-13-1",
        "order": 1,
        "title": "Graniastosłupy proste i prawidłowe: pole i objętość",
        "short_title": "Graniastosłupy proste i prawidłowe",
        "badge": "Lekcja 13.1",
        "archetypeCode": "ARCH-131",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 13: Graniastosłupy proste i prawidłowe: pole i objętość. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 13 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 13.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Graniastosłupy proste i prawidłowe: pole i objętość.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-13-2",
        "order": 2,
        "title": "Ostrosłupy prawidłowe: krawędzie i ściany boczne",
        "short_title": "Ostrosłupy prawidłowe",
        "badge": "Lekcja 13.2",
        "archetypeCode": "ARCH-132",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 13: Ostrosłupy prawidłowe: krawędzie i ściany boczne. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 13 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 13.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Ostrosłupy prawidłowe: krawędzie i ściany boczne.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-13-3",
        "order": 3,
        "title": "Kąty w stereometrii: kąt nachylenia krawędzi i ściany",
        "short_title": "Kąty w stereometrii",
        "badge": "Lekcja 13.3",
        "archetypeCode": "ARCH-133",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 13: Kąty w stereometrii: kąt nachylenia krawędzi i ściany. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 13 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 13.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Kąty w stereometrii: kąt nachylenia krawędzi i ściany.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-13-4",
        "order": 4,
        "title": "Bryły obrotowe: walec, stożek i kula",
        "short_title": "Bryły obrotowe",
        "badge": "Lekcja 13.4",
        "archetypeCode": "ARCH-134",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 13: Bryły obrotowe: walec, stożek i kula. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 13 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 13.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Bryły obrotowe: walec, stożek i kula.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-13-5",
        "order": 5,
        "title": "Przekroje brył płaszczyznami w arkuszu CKE",
        "short_title": "Przekroje brył płaszczyznami w arkuszu CKE",
        "badge": "Lekcja 13.5",
        "archetypeCode": "ARCH-135",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 13: Przekroje brył płaszczyznami w arkuszu CKE. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 13 • Waga: 4–7 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 13.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Przekroje brył płaszczyznami w arkuszu CKE.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-14",
    "numericId": 14,
    "title": "Kombinatoryka i rachunek prawdopodobieństwa",
    "short_title": "Prawdopodobieństwo",
    "description": "Oficjalne zagadnienia CKE: Kombinatoryka i rachunek prawdopodobieństwa. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 3–6 pkt.",
    "icon": "PieChart",
    "color": "#FFB800",
    "matura_points_range": "3–6 pkt",
    "importance": "HIGH",
    "lessons": [
      {
        "id": "math-lesson-14-1",
        "order": 1,
        "title": "Reguła mnożenia i reguła dodawania w zliczaniu",
        "short_title": "Reguła mnożenia i reguła dodawania w zliczaniu",
        "badge": "Lekcja 14.1",
        "archetypeCode": "ARCH-141",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 14: Reguła mnożenia i reguła dodawania w zliczaniu. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 14 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 14.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Reguła mnożenia i reguła dodawania w zliczaniu.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-14-2",
        "order": 2,
        "title": "Silnia, permutacje i kombinacje w praktyce",
        "short_title": "Silnia, permutacje i kombinacje w praktyce",
        "badge": "Lekcja 14.2",
        "archetypeCode": "ARCH-142",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 14: Silnia, permutacje i kombinacje w praktyce. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 14 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 14.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Silnia, permutacje i kombinacje w praktyce.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-14-3",
        "order": 3,
        "title": "Klasyczna definicja prawdopodobieństwa P(A) = |A| / |Omega|",
        "short_title": "Klasyczna definicja prawdopodobieństwa P(A) = |A| / |Omega|",
        "badge": "Lekcja 14.3",
        "archetypeCode": "ARCH-143",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 14: Klasyczna definicja prawdopodobieństwa P(A) = |A| / |Omega|. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 14 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 14.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Klasyczna definicja prawdopodobieństwa P(A) = |A| / |Omega|.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-14-4",
        "order": 4,
        "title": "Drzewo stochastyczne w doświadczeniach wieloetapowych",
        "short_title": "Drzewo stochastyczne w doświadczeniach wieloetapowych",
        "badge": "Lekcja 14.4",
        "archetypeCode": "ARCH-144",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 14: Drzewo stochastyczne w doświadczeniach wieloetapowych. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 14 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 14.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Drzewo stochastyczne w doświadczeniach wieloetapowych.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-14-5",
        "order": 5,
        "title": "Własności prawdopodobieństwa i zdarzenie przeciwne",
        "short_title": "Własności prawdopodobieństwa i zdarzenie przeciwne",
        "badge": "Lekcja 14.5",
        "archetypeCode": "ARCH-145",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 14: Własności prawdopodobieństwa i zdarzenie przeciwne. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 14 • Waga: 3–6 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 14.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Własności prawdopodobieństwa i zdarzenie przeciwne.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  },
  {
    "id": "dzial-15",
    "numericId": 15,
    "title": "Statystyka opisowa i optymalizacja",
    "short_title": "Statystyka i optymalizacja",
    "description": "Oficjalne zagadnienia CKE: Statystyka opisowa i optymalizacja. Komplet 5 mikrolekcji Core-4 przygotowujących do zadań za 3–5 pkt.",
    "icon": "PieChart",
    "color": "#FFB800",
    "matura_points_range": "3–5 pkt",
    "importance": "HIGH",
    "lessons": [
      {
        "id": "math-lesson-15-1",
        "order": 1,
        "title": "Średnia arytmetyczna i średnia ważona danych",
        "short_title": "Średnia arytmetyczna i średnia ważona danych",
        "badge": "Lekcja 15.1",
        "archetypeCode": "ARCH-151",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 15: Średnia arytmetyczna i średnia ważona danych. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 15 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 15.1",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Średnia arytmetyczna i średnia ważona danych.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-15-2",
        "order": 2,
        "title": "Mediana i dominanta (moda) zestawu liczb",
        "short_title": "Mediana i dominanta (moda) zestawu liczb",
        "badge": "Lekcja 15.2",
        "archetypeCode": "ARCH-152",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 15: Mediana i dominanta (moda) zestawu liczb. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 15 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 15.2",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Mediana i dominanta (moda) zestawu liczb.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-15-3",
        "order": 3,
        "title": "Odchylenie standardowe i wariancja próby",
        "short_title": "Odchylenie standardowe i wariancja próby",
        "badge": "Lekcja 15.3",
        "archetypeCode": "ARCH-153",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 15: Odchylenie standardowe i wariancja próby. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 15 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 15.3",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Odchylenie standardowe i wariancja próby.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-15-4",
        "order": 4,
        "title": "Interpretacja diagramów słupkowych, kołowych i tabel",
        "short_title": "Interpretacja diagramów słupkowych, kołowych i tabel",
        "badge": "Lekcja 15.4",
        "archetypeCode": "ARCH-154",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 15: Interpretacja diagramów słupkowych, kołowych i tabel. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 15 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 15.4",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Interpretacja diagramów słupkowych, kołowych i tabel.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      },
      {
        "id": "math-lesson-15-5",
        "order": 5,
        "title": "Optymalizacja z użyciem funkcji kwadratowej w CKE",
        "short_title": "Optymalizacja z użyciem funkcji kwadratowej w CKE",
        "badge": "Lekcja 15.5",
        "archetypeCode": "ARCH-155",
        "estimated_time_formatted": "~5 min",
        "theory_pill": {
          "concept_essence": "Kluczowe pojęcie dla Działu 15: Optymalizacja z użyciem funkcji kwadratowej w CKE. Standard wymaga precyzyjnego stosowania wzorów z oficjalnej karty CKE Formuła 2023.",
          "matura_context": "CKE Formuła 2023 • Dział 15 • Waga: 3–5 pkt.",
          "core_formulas": [
            {
              "name": "Wzór kluczowy lekcji 15.5",
              "formula": "f(x) \\\\implies \\\\text{Standard CKE}"
            }
          ],
          "worked_example": {
            "problem": "Modelowe zadanie maturalne z tematu: Optymalizacja z użyciem funkcji kwadratowej w CKE.",
            "solution": "Krok 1: Wypisanie danych i założeń. Krok 2: Zastosowanie odpowiedniego twierdzenia. Krok 3: Wyliczenie wyniku końcowego.",
            "keyInsight": "Zawsze sprawdzaj założenia i dziedzinę przed podaniem odpowiedzi końcowej."
          },
          "exam_trap": "Najczęstszym błędem jest zapomnienie o założeniach początkowych lub pomyłka w znakach!",
          "key_points": [
            "Stosuj wzory z karty wzorów CKE.",
            "Sprawdzaj zgodność jednostek i znaków."
          ]
        }
      }
    ]
  }
];



export function getMathTopicBlueprint(topicId: string): MathTopicBlueprint | undefined {
  return MATH_TOPIC_BLUEPRINTS.find(b => b.id === topicId);
}

export function getAllMathTopicBlueprints(): MathTopicBlueprint[] {
  return MATH_TOPIC_BLUEPRINTS;
}

/**
 * Normalizuje surowe zadanie do formatu zadania w LearnView / SessionRunner
 */
export function normalizeMathTaskForRunner(task: any, lessonId: string, topicId: string): any {
  if (!task) return null;

  const rawCorrect = task.correct_answer || task.correctAnswer || 'A';
  const isSingle = task.type === 'SINGLE_CHOICE' || !task.type;
  const isNumeric = task.type === 'NUMERIC_INPUT';

  // Format options
  let options = undefined;
  if (Array.isArray(task.options) && task.options.length > 0) {
    options = task.options.map((optText: any, idx: number) => {
      const optId = String.fromCharCode(65 + idx);
      const isCorrect = String(optId) === String(rawCorrect) || String(optText) === String(rawCorrect);
      return {
        id: optId,
        text: String(optText),
        content_latex: String(optText),
        is_correct: isCorrect
      };
    });
  }

  const questionText = task.content || task.question || '';

  const taskObj = {
    id: task.id || `math-task-${lessonId}-${Math.random().toString(36).substring(7)}`,
    lessonId,
    topicId,
    type: isNumeric ? 'NUMERIC_INPUT' : 'SINGLE_CHOICE',
    title: task.title || 'Zadanie Maturalne CKE',
    question: questionText,
    content: questionText,
    math_statement: questionText,
    options,
    correct_answer: rawCorrect,
    correctAnswer: rawCorrect,
    numeric_correct_answer: isNumeric ? rawCorrect : undefined,
    explanation: task.explanation || '',
    matura_tip: task.matura_tip || 'Zwróć uwagę na założenia i wzory z oficjalnych tablic CKE.',
    cke_tag: task.archetypeCode,
    badge: task.archetypeCode,
    points: task.points || 1,
    source: 'CKE Formuła 2023 • Baza Zadań JASNE',
    diagram: task.diagram,
    plot: task.plot,
    hints: {
      level_1: task.matura_tip || 'Zwróć uwagę na podstawowe tożsamości z karty wzorów CKE.',
      level_2: task.explanation ? `Wskazówka: ${task.explanation.slice(0, 180)}...` : 'Uważnie podstaw dane.'
    },
    hint_1: task.matura_tip || 'Zwróć uwagę na podstawowe tożsamości z karty wzorów CKE.',
    hint_2: 'Sprawdź kolejność działań i dziedzinę wyrażenia.'
  };

  return enrichTaskWithVisual(taskObj, lessonId);
}

// Mapowanie zadań z all_1500_tasks.json do archetypów
const tasksByArchetype: Record<string, any[]> = {};
(rawGeneratedTasks as any[]).forEach(task => {
  const code = task.archetypeCode || 'ARCH-01';
  if (!tasksByArchetype[code]) {
    tasksByArchetype[code] = [];
  }
  tasksByArchetype[code].push(task);
});

/**
 * Cache pełnych dokumentów lekcji dla Matematyki
 */
export const MATH_LESSON_DOCUMENTS: Map<string, LessonDocument> = new Map();

/**
 * Budowa pełnych dokumentów lekcji i tematów
 */
export const MATH_CURRICULUM_TOPICS: TopicDocument[] = MATH_TOPIC_BLUEPRINTS.map(bp => {
  const topicTasksAll: any[] = [];

  const lessonsMetadata: LessonMetadataItem[] = bp.lessons.map(l => {
    const rawArchetypeTasks = tasksByArchetype[l.archetypeCode] || [];
    // Dobierz 5 reprezentatywnych zadań dla sesji lekcyjnej
    const sessionTasksRaw = rawArchetypeTasks.slice(0, 5);
    const sessionTasks = sessionTasksRaw.map(t => normalizeMathTaskForRunner(t, l.id, bp.id));

    topicTasksAll.push(...sessionTasks);

    const lessonDoc: LessonDocument = {
      id: l.id,
      topic_id: bp.id,
      title: l.title,
      theory_pill: l.theory_pill,
      tasks: sessionTasks,
      required_correct_tasks: Math.min(3, sessionTasks.length),
      estimated_time_formatted: l.estimated_time_formatted
    };

    // Zarejestruj ze wszystkimi wariantami kluczy
    MATH_LESSON_DOCUMENTS.set(l.id, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`${bp.id}/${l.id}`, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`matematyka-podstawowa/${bp.id}/${l.id}`, lessonDoc);

    const cleanOrder = String(bp.numericId) + '.' + String(l.order);
    MATH_LESSON_DOCUMENTS.set(cleanOrder, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`lesson-${bp.numericId}-${l.order}`, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`math-lesson-${bp.numericId}-${l.order}`, lessonDoc);

    return {
      id: l.id,
      order: l.order,
      title: l.title,
      short_title: l.short_title,
      badge: l.badge,
      tasks_count: sessionTasks.length,
      estimated_time_formatted: l.estimated_time_formatted,
      points_to_unlock: l.order === 1 ? 0 : 15,
      required_correct_tasks: 3
    };
  });

  return {
    id: bp.id,
    numericId: bp.numericId,
    name: bp.title,
    title: bp.title,
    short_title: bp.short_title,
    description: bp.description,
    icon: bp.icon,
    color: bp.color,
    matura_points_range: bp.matura_points_range,
    importance: bp.importance,
    lessons_metadata: lessonsMetadata,
    tasks: topicTasksAll
  };
});

/**
 * Płaska lista wszystkich lekcji matematyki CKE z przypisanymi działami
 */
export const ALL_MATH_LESSONS = MATH_TOPIC_BLUEPRINTS.flatMap(bp => 
  bp.lessons.map(l => ({
    ...l,
    topicId: bp.id,
    topicNumericId: bp.numericId,
    topicTitle: bp.title,
    topicShortTitle: bp.short_title,
    color: bp.color,
    icon: bp.icon,
  }))
);

/**
 * Pobiera dokument lekcji matematyki
 */
export function getMathLessonDocument(topicId?: string, lessonId?: string): LessonDocument | null {
  if (!lessonId) return null;
  const cleanId = String(lessonId).trim();

  const found = MATH_LESSON_DOCUMENTS.get(cleanId) ||
         (topicId ? MATH_LESSON_DOCUMENTS.get(`${topicId}/${cleanId}`) : null) ||
         (topicId ? MATH_LESSON_DOCUMENTS.get(`matematyka-podstawowa/${topicId}/${cleanId}`) : null) ||
         null;

  if (found) {
    return { ...found, id: cleanId };
  }
  return null;
}

/**
 * Generuje Boss Exam dla wybranego działu Matematyki
 */
export function loadMathTopicBossExam(topicId: string, topicTitle?: string): any {
  const bp = MATH_TOPIC_BLUEPRINTS.find(b => 
    b.id === topicId || 
    b.numericId === parseInt(String(topicId).replace(/\D/g, '') || '1', 10)
  ) || MATH_TOPIC_BLUEPRINTS[0];

  // Zbierz zadania ze wszystkich lekcji/archetypów tego działu
  const topicArchetypes = bp.lessons.map(l => l.archetypeCode);
  const candidatePool: any[] = [];
  topicArchetypes.forEach(arch => {
    const list = tasksByArchetype[arch] || [];
    candidatePool.push(...list);
  });

  const available = candidatePool.length > 0 ? candidatePool : (rawGeneratedTasks as any[]);
  // Wymieszaj i wybierz 5 zadań
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  const chosen = shuffled.slice(0, 5);

  const examTasks = chosen.map((t, idx) => {
    const norm = normalizeMathTaskForRunner(t, `${bp.id}-boss`, bp.id);
    return {
      id: norm.id || `boss-math-${bp.id}-${idx + 1}`,
      lessonId: `${bp.id}.${idx + 1}`,
      lessonOrder: idx + 1,
      lessonTitle: norm.title || `Zadanie ${idx + 1}`,
      topicLabel: `${bp.short_title} • Zadanie ${idx + 1}`,
      question: norm.question || norm.title || '',
      content: norm.content || norm.question || '',
      math_statement: norm.question || norm.title || '',
      options: norm.options || [],
      correct_answer: norm.correct_answer || norm.correctAnswer,
      correctAnswer: norm.correctAnswer || norm.correct_answer,
      numeric_correct_answer: norm.numeric_correct_answer,
      explanation: norm.explanation || '',
      matura_tip: norm.matura_tip || '',
      hint_1: norm.hint_1 || '',
      hint_2: norm.hint_2 || '',
      source: 'CKE Formuła 2023 • Egzamin Działowy JASNE',
      type: norm.type || 'SINGLE_CHOICE',
      points: norm.points || 1,
      diagram: norm.diagram,
      plot: norm.plot
    };
  });

  const totalQuestions = examTasks.length || 5;
  const passingScore = Math.max(1, Math.ceil(totalQuestions * 0.7));

  return {
    id: `BOSS-EXAM-${String(bp.id).toUpperCase()}`,
    title: `Sprawdzian: ${bp.short_title}`,
    subtitle: `Ostateczne starcie z materiałem: ${bp.title}. Rozwiąż ${totalQuestions} zadań z tego działu.`,
    boss_name: `Egzaminator CKE: ${bp.short_title}`,
    boss_message: `Egzaminator czeka! Wykaż się wiedzą z działu: ${bp.short_title}. Zdobądź minimum 70%!`,
    timeLimitMinutes: 20,
    passingScore,
    totalQuestions,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: `master_${String(bp.id).toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    tasks: examTasks
  };
}
