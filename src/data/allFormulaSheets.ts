/**
 * OFICJALNA KARTA WZORÓW CKE DLA WSZYSTKICH 225 LEKCJI
 * Wygenerowana na podstawie Wybranych Wzorów Matematycznych CKE 2023/2025.
 */

export interface FormulaItem {
  title: string;
  latex: string;
}

export interface LessonFormulaSheet {
  lessonId: string;
  title: string;
  isLeksykon?: boolean;
  formulas: FormulaItem[];
  goldenRule: string;
  ckeTrap: {
    error: string;
    correct: string;
    description: string;
  };
}

export const allFormulaSheetsByLesson: Record<string, LessonFormulaSheet> = {
  "1.1": {
    "lessonId": "1.1",
    "title": "Przedziały liczbowe i interpretacja na osi",
    "formulas": [
      {
        "title": "Przedział obustronnie otwarty",
        "latex": "x \\in (a, b) \\iff a < x < b"
      },
      {
        "title": "Przedział obustronnie domknięty",
        "latex": "x \\in \\langle a, b \\rangle \\iff a \\le x \\le b"
      },
      {
        "title": "Przedział lewostronnie domknięty",
        "latex": "x \\in \\langle a, b) \\iff a \\le x < b"
      },
      {
        "title": "Przedział prawostronnie domknięty",
        "latex": "x \\in (a, b \\rangle \\iff a < x \\le b"
      }
    ],
    "goldenRule": "Nawias ostry $\\langle$ lub $\\rangle$ oznacza włączenie liczby do zbioru (nierówność $\\le, \\ge$). Nawias okrągły $($ lub $)$ wyklucza liczbę graniczną ($<, >$).",
    "ckeTrap": {
      "error": "x \\in (2, 5\\rangle \\implies x = 2",
      "correct": "x \\in (2, 5\\rangle \\implies x > 2 \\text{ i } x \\le 5 \\implies x \\in \\{3, 4, 5\\} \\text{ dla } x \\in \\mathbb{C}",
      "description": "Nawias okrągły wyklucza punkt brzegowy! Liczba 2 nie należy do przedziału."
    }
  },
  "1.2": {
    "lessonId": "1.2",
    "title": "Liczby wymierne i niewymierne: Rozwinięcia dziesiętne",
    "formulas": [
      {
        "title": "Suma zbiorów",
        "latex": "A \\cup B = \\{x: x \\in A \\lor x \\in B\\}"
      },
      {
        "title": "Iloczyn (część wspólna) zbiorów",
        "latex": "A \\cap B = \\{x: x \\in A \\land x \\in B\\}"
      },
      {
        "title": "Różnica zbiorów",
        "latex": "A \\setminus B = \\{x: x \\in A \\land x \\notin B\\}"
      }
    ],
    "goldenRule": "Rysuj przedziały na jednej osi liczbowej. Iloczyn $A \\cap B$ to obszar, gdzie oba przedziały się nakładają (podwójne kreskowanie).",
    "ckeTrap": {
      "error": "\\langle 1, 4) \\cap \\langle 4, 7\\rangle = \\{4\\}",
      "correct": "\\langle 1, 4) \\cap \\langle 4, 7\\rangle = \\emptyset",
      "description": "Liczba 4 nie należy do pierwszego przedziału (nawias okrągły), więc nie może należeć do części wspólnej!"
    }
  },
  "1.3": {
    "lessonId": "1.3",
    "title": "Ułamki zwykłe: Dodawanie, odejmowanie i wspólny mianownik",
    "formulas": [
      {
        "title": "Podzielność przez 3 i 9",
        "latex": "3 | n \\iff 3 | (\\text{suma cyfr } n)"
      },
      {
        "title": "Podzielność przez 4",
        "latex": "4 | n \\iff 4 | (\\text{dwie ostatnie cyfry } n)"
      },
      {
        "title": "Rozkład na czynniki pierwsze",
        "latex": "n = p_1^{k_1} \\cdot p_2^{k_2} \\cdots p_m^{k_m}"
      }
    ],
    "goldenRule": "Liczba pierwsza ma dokładnie dwa różne dzielniki: 1 oraz samą siebie. Liczby 0 i 1 NIE SĄ liczbami pierwszymi!",
    "ckeTrap": {
      "error": "1 \\text{ jest liczbą pierwszą}",
      "correct": "1 \\text{ nie jest liczbą pierwszą}",
      "description": "Najmniejszą liczbą pierwszą jest 2 (jedyna parzysta liczba pierwsza)."
    }
  },
  "1.4": {
    "lessonId": "1.4",
    "title": "Ułamki zwykłe: Mnożenie, dzielenie i reguły skracania",
    "formulas": [
      {
        "title": "Liczba wymierna",
        "latex": "x \\in \\mathbb{Q} \\iff x = \\frac{m}{n}, \\quad m \\in \\mathbb{C}, n \\in \\mathbb{C} \\setminus \\{0\\}"
      },
      {
        "title": "Liczba niewymierna",
        "latex": "x \\in \\mathbb{R} \\setminus \\mathbb{Q} \\quad (\\text{np. } \\sqrt{2}, \\sqrt{3}, \\pi)"
      }
    ],
    "goldenRule": "Pierwiastek z liczby całkowitej, która nie jest kwadratem, jest ZAWSZE liczbą niewymierną.",
    "ckeTrap": {
      "error": "\\sqrt{16} \\text{ jest niewymierna}",
      "correct": "\\sqrt{16} = 4 \\in \\mathbb{W} \\text{ (wymierna)}",
      "description": "Zawsze uprość pierwiastek przed oceną jego wymierności!"
    }
  },
  "1.5": {
    "lessonId": "1.5",
    "title": "Procenty: Obliczenia procentowe, podwyżki i obniżki cen",
    "formulas": [
      {
        "title": "Ułamek okresowy na ułamek zwykły",
        "latex": "0,(3) = \\frac{3}{9} = \\frac{1}{3}, \\quad 0,(a) = \\frac{a}{9}"
      },
      {
        "title": "Mnożenie ułamków",
        "latex": "\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}"
      },
      {
        "title": "Dzielenie ułamków",
        "latex": "\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{ad}{bc}"
      }
    ],
    "goldenRule": "Przy dodawaniu i odejmowaniu ułamków ZAWSZE sprowadzaj do wspólnego mianownika (NWW).",
    "ckeTrap": {
      "error": "\\frac{a}{b} + \\frac{c}{d} = \\frac{a+c}{b+d}",
      "correct": "\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}",
      "description": "Nigdy nie dodawaj mianowników!"
    }
  },
  "1.6": {
    "lessonId": "1.6",
    "title": "Procenty: Błąd bezwzględny i błąd względny pomiaru",
    "formulas": [
      {
        "title": "Definicja wartości bezwzględnej",
        "latex": "|x| = \\begin{cases} x & \\text{dla } x \\ge 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}"
      },
      {
        "title": "Własności wartości bezwzględnej",
        "latex": "|-x| = |x|, \\quad |x \\cdot y| = |x| \\cdot |y|, \\quad \\sqrt{x^2} = |x|"
      }
    ],
    "goldenRule": "Gdy wyrażenie pod wartością bezwzględną jest ujemne, opuszczając pionowe kreski zmieniamy znak KAŻDEGO wyrazu: $|x - 3| = -(x - 3) = 3 - x$ dla $x < 3$.",
    "ckeTrap": {
      "error": "\\sqrt{(1 - \\sqrt{2})^2} = 1 - \\sqrt{2}",
      "correct": "\\sqrt{(1 - \\sqrt{2})^2} = |1 - \\sqrt{2}| = \\sqrt{2} - 1",
      "description": "Pierwiastek kwadratowy zawsze daje wynik nieujemny! Ponieważ $1 - \\sqrt{2} < 0$, wynikiem jest $\\sqrt{2} - 1$."
    }
  },
  "1.7": {
    "lessonId": "1.7",
    "title": "Potęgi: Prawa działań na potęgach i wspólna podstawa",
    "formulas": [
      {
        "title": "Odległość na osi liczbowej",
        "latex": "d(x, a) = |x - a|"
      },
      {
        "title": "Nierówność $|x - a| \\le r$",
        "latex": "|x - a| \\le r \\iff a - r \\le x \\le a + r \\iff x \\in \\langle a - r, a + r \\rangle"
      },
      {
        "title": "Nierówność $|x - a| > r$",
        "latex": "|x - a| > r \\iff x < a - r \\lor x > a + r"
      }
    ],
    "goldenRule": "$|x - a| \\le r$ to przedział o środku $a$ i promieniu $r$. Środek $a = \\frac{x_1 + x_2}{2}$, promień $r = \\frac{x_2 - x_1}{2}$.",
    "ckeTrap": {
      "error": "|x| < -2 \\implies x < -2",
      "correct": "|x| < -2 \\iff x \\in \\emptyset",
      "description": "Wartość bezwzględna nigdy nie jest mniejsza od liczby ujemnej!"
    }
  },
  "1.8": {
    "lessonId": "1.8",
    "title": "Potęgi o wykładniku całkowitym ujemnym",
    "formulas": [
      {
        "title": "Potęga o wykładniku naturalnym",
        "latex": "a^n = \\underbrace{a \\cdot a \\cdots a}_{n \\text{ razy}}, \\quad a^0 = 1 \\text{ dla } a \\neq 0"
      },
      {
        "title": "Potęga o wykładniku ujemnym",
        "latex": "a^{-n} = \\frac{1}{a^n}, \\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n"
      }
    ],
    "goldenRule": "Ujemny wykładnik odwraca liczbę/ułamek do góry nogami: $\\left(\\frac{2}{3}\\right)^{-2} = \\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4}$.",
    "ckeTrap": {
      "error": "(-2)^2 = -4",
      "correct": "(-2)^2 = 4, \\quad -2^2 = -4",
      "description": "Minus bez nawiasu nie jest potęgowany: $-2^2 = -(2^2) = -4$."
    }
  },
  "1.9": {
    "lessonId": "1.9",
    "title": "Potęgi o wykładniku wymiernym i zapis pierwiastków",
    "formulas": [
      {
        "title": "Potęga o wykładniku ułamkowym",
        "latex": "a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m \\quad (a \\ge 0, n \\ge 2)"
      },
      {
        "title": "Pierwiastek jako potęga",
        "latex": "\\sqrt{a} = a^{\\frac{1}{2}}, \\quad \\sqrt[3]{a} = a^{\\frac{1}{3}}"
      }
    ],
    "goldenRule": "Mianownik wykładnika to zawsze STOPNIEŃ pierwiastka, a licznik to potęga liczby pod pierwiastkiem.",
    "ckeTrap": {
      "error": "8^{\\frac{2}{3}} = \\sqrt{8^3}",
      "correct": "8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4",
      "description": "Mianownik 3 oznacza pierwiastek sześcienny, a nie kwadratowy!"
    }
  },
  "1.10": {
    "lessonId": "1.10",
    "title": "Pierwiastki: Mnożenie, dzielenie i wyłączanie czynnika",
    "formulas": [
      {
        "title": "Iloczyn potęg o tej samej podstawie",
        "latex": "a^r \\cdot a^s = a^{r+s}"
      },
      {
        "title": "Iloraz potęg o tej samej podstawie",
        "latex": "\\frac{a^r}{a^s} = a^{r-s}"
      },
      {
        "title": "Potęga potęgi",
        "latex": "(a^r)^s = a^{r \\cdot s}"
      },
      {
        "title": "Potęga iloczynu i ilorazu",
        "latex": "(ab)^r = a^r b^r, \\quad \\left(\\frac{a}{b}\\right)^r = \\frac{a^r}{b^r}"
      }
    ],
    "goldenRule": "Sprowadzaj wszystkie potęgi do wspólnej podstawy będącej liczbą pierwszą (np. $4 = 2^2, 8 = 2^3, 9 = 3^2, 27 = 3^3$).",
    "ckeTrap": {
      "error": "2^3 \\cdot 2^4 = 4^7",
      "correct": "2^3 \\cdot 2^4 = 2^{3+4} = 2^7",
      "description": "Przy mnożeniu potęg o tej samej podstawie podstawa POZOSTAJE BEZ ZMIAN!"
    }
  },
  "1.11": {
    "lessonId": "1.11",
    "title": "Usuwanie niewymierności z mianownika ułamka",
    "formulas": [
      {
        "title": "Definicja pierwiastka arytmetycznego",
        "latex": "\\sqrt[n]{a} = b \\iff b^n = a \\quad (a, b \\ge 0)"
      },
      {
        "title": "Pierwiastek nieparzystego stopnia",
        "latex": "\\sqrt[3]{-a} = -\\sqrt[3]{a}"
      },
      {
        "title": "Kwadrat pierwiastka",
        "latex": "(\\sqrt{a})^2 = a \\text{ dla } a \\ge 0, \\quad \\sqrt{a^2} = |a|"
      }
    ],
    "goldenRule": "Pierwiastek kwadratowy z liczby ujemnej nie istnieje w liczbach rzeczywistych, ale pierwiastek sześcienny z liczby ujemnej istnieje i jest ujemny: $\\sqrt[3]{-8} = -2$.",
    "ckeTrap": {
      "error": "\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}",
      "correct": "\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}",
      "description": "Pierwiastek sumy to NIE suma pierwiastków! $\\sqrt{9 + 16} = \\sqrt{25} = 5 \\neq 3 + 4 = 7$."
    }
  },
  "1.12": {
    "lessonId": "1.12",
    "title": "Wzory skróconego mnożenia: Kwadrat sumy i różnicy",
    "formulas": [
      {
        "title": "Mnożenie pierwiastków",
        "latex": "\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{a \\cdot b}"
      },
      {
        "title": "Dzielenie pierwiastków",
        "latex": "\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\frac{a}{b}}"
      },
      {
        "title": "Wyłączanie czynnika przed pierwiastek",
        "latex": "\\sqrt{a^2 \\cdot b} = a\\sqrt{b}"
      }
    ],
    "goldenRule": "Rozkładaj liczbę pod pierwiastkiem na iloczyn kwadratu liczby całkowitej: $\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.",
    "ckeTrap": {
      "error": "2\\sqrt{3} + 3\\sqrt{2} = 5\\sqrt{5}",
      "correct": "2\\sqrt{3} + 3\\sqrt{2} \\text{ (nie da się zredukować)}",
      "description": "Dodawać można tylko pierwiastki tego samego stopnia i o tej samej liczbie podpierwiastkowej: $2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}$."
    }
  },
  "1.13": {
    "lessonId": "1.13",
    "title": "Logarytmy: Definicja i obliczanie wartości z definicji",
    "formulas": [
      {
        "title": "Mianownik z pojedynczym pierwiastkiem",
        "latex": "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}"
      },
      {
        "title": "Mianownik z sumą/różnicą pierwiastków",
        "latex": "\\frac{c}{\\sqrt{a} - \\sqrt{b}} = \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b}"
      }
    ],
    "goldenRule": "Mnożymy licznik i mianownik przez sprzężenie mianownika ze zmienionym znakiem: dla $\\sqrt{a} - b$ sprzężeniem jest $\\sqrt{a} + b$ (wzór skróconego mnożenia $a^2 - b^2$).",
    "ckeTrap": {
      "error": "\\frac{2}{\\sqrt{3} - 1} = \\frac{2\\sqrt{3} - 2}{3 - 1}",
      "correct": "\\frac{2(\\sqrt{3} + 1)}{(\\sqrt{3}-1)(\\sqrt{3}+1)} = \\frac{2(\\sqrt{3}+1)}{3 - 1} = \\sqrt{3} + 1",
      "description": "Mnożymy przez wyrażenie z PRZECIWNYM znakiem!"
    }
  },
  "1.14": {
    "lessonId": "1.14",
    "title": "Logarytmy: Działania na logarytmach o tej samej podstawie",
    "formulas": [
      {
        "title": "Definicja logarytmu",
        "latex": "\\log_a b = c \\iff a^c = b \\quad (a > 0, a \\neq 1, b > 0)"
      },
      {
        "title": "Logarytmy podstawowe",
        "latex": "\\log_a 1 = 0, \\quad \\log_a a = 1, \\quad a^{\\log_a b} = b"
      },
      {
        "title": "Logarytm dziesiętny",
        "latex": "\\log b = \\log_{10} b"
      }
    ],
    "goldenRule": "Zawsze zadawaj pytanie: do jakiej potęgi muszę podnieść podstawę $a$, aby otrzymać liczbę logarytmowaną $b$?",
    "ckeTrap": {
      "error": "\\log_2 0 = 0",
      "correct": "\\log_2 0 \\text{ nie istnieje (b > 0)}",
      "description": "Liczba logarytmowana musi być ŚCIŚLE większa od zera!"
    }
  },
  "1.15": {
    "lessonId": "1.15",
    "title": "Wartość bezwzględna liczby i interpretacja geometryczna",
    "formulas": [
      {
        "title": "Logarytm iloczynu",
        "latex": "\\log_a x + \\log_a y = \\log_a (x \\cdot y)"
      },
      {
        "title": "Logarytm ilorazu",
        "latex": "\\log_a x - \\log_a y = \\log_a \\left(\\frac{x}{y}\\right)"
      },
      {
        "title": "Potęga w liczbie logarytmowanej",
        "latex": "\\log_a (x^k) = k \\cdot \\log_a x"
      },
      {
        "title": "Zamiana podstawy logarytmu",
        "latex": "\\log_a b = \\frac{\\log_c b}{\\log_c a}"
      }
    ],
    "goldenRule": "Zwijaj sumę i różnicę logarytmów o TEJ SAMEJ podstawie: $\\log_3 6 + \\log_3 1.5 = \\log_3 (6 \\cdot 1.5) = \\log_3 9 = 2$.",
    "ckeTrap": {
      "error": "\\log(x + y) = \\log x + \\log y",
      "correct": "\\log(x \\cdot y) = \\log x + \\log y",
      "description": "Suma logarytmów to logarytm iloczynu, a nie sumy!"
    }
  },
  "2.1": {
    "lessonId": "2.1",
    "title": "Jednomiany i sumy algebraiczne: Redukcja wyrazów podobnych",
    "formulas": [
      {
        "title": "Redukcja wyrazów podobnych",
        "latex": "ax^n + bx^n = (a + b)x^n"
      },
      {
        "title": "Mnożenie sum algebraicznych",
        "latex": "(a + b)(c + d) = ac + ad + bc + bd"
      },
      {
        "title": "Znak minus przed nawiasem",
        "latex": "-(a - b + c) = -a + b - c"
      }
    ],
    "goldenRule": "Minus przed nawiasem zmienia znaki WSZYSTKICH składników wewnątrz nawiasu.",
    "ckeTrap": {
      "error": "-(2x - 5) = -2x - 5",
      "correct": "-(2x - 5) = -2x + 5",
      "description": "Pamiętaj o zmianie znaku drugiego wyrazu: $-(-5) = +5$!"
    }
  },
  "2.2": {
    "lessonId": "2.2",
    "title": "Mnożenie sum algebraicznych: Zasadnicze reguły i znaki",
    "formulas": [
      {
        "title": "Redukcja wyrazów podobnych",
        "latex": "ax^n + bx^n = (a + b)x^n"
      },
      {
        "title": "Mnożenie sum algebraicznych",
        "latex": "(a + b)(c + d) = ac + ad + bc + bd"
      },
      {
        "title": "Znak minus przed nawiasem",
        "latex": "-(a - b + c) = -a + b - c"
      }
    ],
    "goldenRule": "Minus przed nawiasem zmienia znaki WSZYSTKICH składników wewnątrz nawiasu.",
    "ckeTrap": {
      "error": "-(2x - 5) = -2x - 5",
      "correct": "-(2x - 5) = -2x + 5",
      "description": "Pamiętaj o zmianie znaku drugiego wyrazu: $-(-5) = +5$!"
    }
  },
  "2.3": {
    "lessonId": "2.3",
    "title": "Dzielenie wielomianu przez dwumian (x - a): Schemat Hornera",
    "formulas": [
      {
        "title": "Redukcja wyrazów podobnych",
        "latex": "ax^n + bx^n = (a + b)x^n"
      },
      {
        "title": "Mnożenie sum algebraicznych",
        "latex": "(a + b)(c + d) = ac + ad + bc + bd"
      },
      {
        "title": "Znak minus przed nawiasem",
        "latex": "-(a - b + c) = -a + b - c"
      }
    ],
    "goldenRule": "Minus przed nawiasem zmienia znaki WSZYSTKICH składników wewnątrz nawiasu.",
    "ckeTrap": {
      "error": "-(2x - 5) = -2x - 5",
      "correct": "-(2x - 5) = -2x + 5",
      "description": "Pamiętaj o zmianie znaku drugiego wyrazu: $-(-5) = +5$!"
    }
  },
  "2.4": {
    "lessonId": "2.4",
    "title": "Wzory skróconego mnożenia: Różnica kwadratów",
    "formulas": [
      {
        "title": "Kwadrat sumy",
        "latex": "(a + b)^2 = a^2 + 2ab + b^2"
      },
      {
        "title": "Kwadrat różnicy",
        "latex": "(a - b)^2 = a^2 - 2ab + b^2"
      }
    ],
    "goldenRule": "Nigdy nie zapominaj o podwojonym iloczynie $2ab$ w środku wzoru!",
    "ckeTrap": {
      "error": "(a + b)^2 = a^2 + b^2",
      "correct": "(a + b)^2 = a^2 + 2ab + b^2",
      "description": "Zawsze występuje podwojony iloczyn $2ab$."
    }
  },
  "2.5": {
    "lessonId": "2.5",
    "title": "Wzory skróconego mnożenia: Sześciany i wzory trzeciego stopnia",
    "formulas": [
      {
        "title": "Różnica kwadratów",
        "latex": "a^2 - b^2 = (a - b)(a + b)"
      }
    ],
    "goldenRule": "Różnica kwadratów pozwala błyskawicznie rozłożyć wyrażenie na iloczyn i skrócić ułamki algebraiczne.",
    "ckeTrap": {
      "error": "a^2 + b^2 = (a + b)^2",
      "correct": "(a + b)^2 = a^2 + 2ab + b^2 \\neq a^2 + b^2",
      "description": "Suma kwadratów $a^2 + b^2$ nie rozkłada się w liczbach rzeczywistych!"
    }
  },
  "2.6": {
    "lessonId": "2.6",
    "title": "Wyłączanie wspólnego czynnika: Liczby i jednomiany",
    "formulas": [
      {
        "title": "Sześcian sumy",
        "latex": "(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3"
      },
      {
        "title": "Sześcian różnicy",
        "latex": "(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3"
      },
      {
        "title": "Suma sześcianów",
        "latex": "a^3 + b^3 = (a + b)(a^2 - ab + b^2)"
      },
      {
        "title": "Różnica sześcianów",
        "latex": "a^3 - b^3 = (a - b)(a^2 + ab + b^2)"
      }
    ],
    "goldenRule": "Zwróć uwagę na znak przy $ab$ w drugim nawiasie: dla $a^3 - b^3$ jest $(a^2 + ab + b^2)$ (z plusem!).",
    "ckeTrap": {
      "error": "a^3 - b^3 = (a - b)(a^2 - 2ab + b^2)",
      "correct": "a^3 - b^3 = (a - b)(a^2 + ab + b^2)",
      "description": "W drugim nawiasie jest pojedynczy iloczyn ze zmienionym znakiem, a nie podwojony iloczyn!"
    }
  },
  "2.7": {
    "lessonId": "2.7",
    "title": "Wyłączanie wspólnego czynnika: Wyrażenia nawiasowe",
    "formulas": [
      {
        "title": "Sześcian sumy",
        "latex": "(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3"
      },
      {
        "title": "Sześcian różnicy",
        "latex": "(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3"
      },
      {
        "title": "Suma sześcianów",
        "latex": "a^3 + b^3 = (a + b)(a^2 - ab + b^2)"
      },
      {
        "title": "Różnica sześcianów",
        "latex": "a^3 - b^3 = (a - b)(a^2 + ab + b^2)"
      }
    ],
    "goldenRule": "Zwróć uwagę na znak przy $ab$ w drugim nawiasie: dla $a^3 - b^3$ jest $(a^2 + ab + b^2)$ (z plusem!).",
    "ckeTrap": {
      "error": "a^3 - b^3 = (a - b)(a^2 - 2ab + b^2)",
      "correct": "a^3 - b^3 = (a - b)(a^2 + ab + b^2)",
      "description": "W drugim nawiasie jest pojedynczy iloczyn ze zmienionym znakiem, a nie podwojony iloczyn!"
    }
  },
  "2.8": {
    "lessonId": "2.8",
    "title": "Rozkładanie wielomianów na czynniki: Metoda grupowania wyrazów",
    "formulas": [
      {
        "title": "Wyłączanie wspólnego czynnika",
        "latex": "ab + ac = a(b + c)"
      },
      {
        "title": "Grupowanie wyrazów",
        "latex": "ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)"
      }
    ],
    "goldenRule": "Grupuj wyrazy parami (z pierwszych dwóch wyciągnij wspólny czynnik, z kolejnych dwóch drugi) tak, aby w nawiasach powstał IDENTYCZNY dwumian.",
    "ckeTrap": {
      "error": "x^3 - 2x^2 - x + 2 = x^2(x - 2) - (x + 2)",
      "correct": "x^3 - 2x^2 - x + 2 = x^2(x - 2) - 1(x - 2) = (x^2 - 1)(x - 2)",
      "description": "Wyciągając minus przed nawias zmieniamy znak $+2$ na $-2$!"
    }
  },
  "2.9": {
    "lessonId": "2.9",
    "title": "Wielomiany: Stopień, współczynniki i wyraz wolny",
    "formulas": [
      {
        "title": "Wyłączanie wspólnego czynnika",
        "latex": "ab + ac = a(b + c)"
      },
      {
        "title": "Grupowanie wyrazów",
        "latex": "ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)"
      }
    ],
    "goldenRule": "Grupuj wyrazy parami (z pierwszych dwóch wyciągnij wspólny czynnik, z kolejnych dwóch drugi) tak, aby w nawiasach powstał IDENTYCZNY dwumian.",
    "ckeTrap": {
      "error": "x^3 - 2x^2 - x + 2 = x^2(x - 2) - (x + 2)",
      "correct": "x^3 - 2x^2 - x + 2 = x^2(x - 2) - 1(x - 2) = (x^2 - 1)(x - 2)",
      "description": "Wyciągając minus przed nawias zmieniamy znak $+2$ na $-2$!"
    }
  },
  "2.10": {
    "lessonId": "2.10",
    "title": "Wielomiany: Dodawanie i odejmowanie wielomianów",
    "formulas": [
      {
        "title": "Wzór ogólny wielomianu",
        "latex": "W(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0"
      },
      {
        "title": "Stopień iloczynu wielomianów",
        "latex": "\\operatorname{st}(W \\cdot P) = \\operatorname{st}(W) + \\operatorname{st}(P)"
      }
    ],
    "goldenRule": "Stopień wielomianu to najwyższa potęga zmiennej $x$ przy niezerowym współczynniku.",
    "ckeTrap": {
      "error": "\\operatorname{st}((x^2 + 1)(x^3 - 2)) = 6",
      "correct": "\\operatorname{st}((x^2 + 1)(x^3 - 2)) = 2 + 3 = 5",
      "description": "Przy mnożeniu wielomianów ich stopnie się DODAJE, a nie mnoży!"
    }
  },
  "2.11": {
    "lessonId": "2.11",
    "title": "Wielomiany: Mnożenie wielomianów i współczynniki potęg",
    "formulas": [
      {
        "title": "Wzór ogólny wielomianu",
        "latex": "W(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0"
      },
      {
        "title": "Stopień iloczynu wielomianów",
        "latex": "\\operatorname{st}(W \\cdot P) = \\operatorname{st}(W) + \\operatorname{st}(P)"
      }
    ],
    "goldenRule": "Stopień wielomianu to najwyższa potęga zmiennej $x$ przy niezerowym współczynniku.",
    "ckeTrap": {
      "error": "\\operatorname{st}((x^2 + 1)(x^3 - 2)) = 6",
      "correct": "\\operatorname{st}((x^2 + 1)(x^3 - 2)) = 2 + 3 = 5",
      "description": "Przy mnożeniu wielomianów ich stopnie się DODAJE, a nie mnoży!"
    }
  },
  "2.12": {
    "lessonId": "2.12",
    "title": "Wielomiany: Równość wielomianów i wyznaczanie parametrów",
    "formulas": [
      {
        "title": "Wyrażenie wymierne",
        "latex": "W(x) = \\frac{P(x)}{Q(x)}, \\quad Q(x) \\neq 0"
      },
      {
        "title": "Mnożenie wyrażeń wymiernych",
        "latex": "\\frac{P(x)}{Q(x)} \\cdot \\frac{R(x)}{S(x)} = \\frac{P(x)R(x)}{Q(x)S(x)}"
      },
      {
        "title": "Dzielenie wyrażeń wymiernych",
        "latex": "\\frac{P(x)}{Q(x)} : \\frac{R(x)}{S(x)} = \\frac{P(x)S(x)}{Q(x)R(x)}"
      }
    ],
    "goldenRule": "Zanim cokolwiek skrócisz w wyrażeniu wymiernym, ZAWSZE wyznacz dziedzinę: mianownik $Q(x) \\neq 0$!",
    "ckeTrap": {
      "error": "\\frac{x^2 - 4}{x - 2} = x + 2 \\text{ dla } x \\in \\mathbb{R}",
      "correct": "\\frac{x^2 - 4}{x - 2} = x + 2 \\text{ dla } x \\neq 2",
      "description": "Skracanie jest poprawne tylko dla $x$ należących do dziedziny!"
    }
  },
  "2.13": {
    "lessonId": "2.13",
    "title": "Wyrażenia wymierne: Dziedzina i warunki istnienia ułamka",
    "formulas": [
      {
        "title": "Wyrażenie wymierne",
        "latex": "W(x) = \\frac{P(x)}{Q(x)}, \\quad Q(x) \\neq 0"
      },
      {
        "title": "Mnożenie wyrażeń wymiernych",
        "latex": "\\frac{P(x)}{Q(x)} \\cdot \\frac{R(x)}{S(x)} = \\frac{P(x)R(x)}{Q(x)S(x)}"
      },
      {
        "title": "Dzielenie wyrażeń wymiernych",
        "latex": "\\frac{P(x)}{Q(x)} : \\frac{R(x)}{S(x)} = \\frac{P(x)S(x)}{Q(x)R(x)}"
      }
    ],
    "goldenRule": "Zanim cokolwiek skrócisz w wyrażeniu wymiernym, ZAWSZE wyznacz dziedzinę: mianownik $Q(x) \\neq 0$!",
    "ckeTrap": {
      "error": "\\frac{x^2 - 4}{x - 2} = x + 2 \\text{ dla } x \\in \\mathbb{R}",
      "correct": "\\frac{x^2 - 4}{x - 2} = x + 2 \\text{ dla } x \\neq 2",
      "description": "Skracanie jest poprawne tylko dla $x$ należących do dziedziny!"
    }
  },
  "2.14": {
    "lessonId": "2.14",
    "title": "Wyrażenia wymierne: Skracanie ułamków algebraicznych",
    "formulas": [
      {
        "title": "Wyrażenie wymierne",
        "latex": "W(x) = \\frac{P(x)}{Q(x)}, \\quad Q(x) \\neq 0"
      },
      {
        "title": "Mnożenie wyrażeń wymiernych",
        "latex": "\\frac{P(x)}{Q(x)} \\cdot \\frac{R(x)}{S(x)} = \\frac{P(x)R(x)}{Q(x)S(x)}"
      },
      {
        "title": "Dzielenie wyrażeń wymiernych",
        "latex": "\\frac{P(x)}{Q(x)} : \\frac{R(x)}{S(x)} = \\frac{P(x)S(x)}{Q(x)R(x)}"
      }
    ],
    "goldenRule": "Zanim cokolwiek skrócisz w wyrażeniu wymiernym, ZAWSZE wyznacz dziedzinę: mianownik $Q(x) \\neq 0$!",
    "ckeTrap": {
      "error": "\\frac{x^2 - 4}{x - 2} = x + 2 \\text{ dla } x \\in \\mathbb{R}",
      "correct": "\\frac{x^2 - 4}{x - 2} = x + 2 \\text{ dla } x \\neq 2",
      "description": "Skracanie jest poprawne tylko dla $x$ należących do dziedziny!"
    }
  },
  "2.15": {
    "lessonId": "2.15",
    "title": "Dowodzenie algebraiczne: Wykazywanie nierówności i zwijanie do kwadratu",
    "formulas": [
      {
        "title": "Kwadrat liczby jest nieujemny",
        "latex": "x^2 \\ge 0 \\text{ dla każdego } x \\in \\mathbb{R}"
      },
      {
        "title": "Kolejne liczby całkowite",
        "latex": "n, n+1, n+2 \\implies n(n+1) \\text{ dzieli się przez } 2"
      }
    ],
    "goldenRule": "Aby udowodnić nierówność, przenieś wszystko na lewą stronę i zwiń do pełnego kwadratu: $(a - b)^2 \\ge 0$.",
    "ckeTrap": {
      "error": "a^2 + b^2 \\ge 2ab \\iff a + b \\ge \\sqrt{2ab}",
      "correct": "a^2 - 2ab + b^2 \\ge 0 \\iff (a - b)^2 \\ge 0",
      "description": "Nie pierwiastkuj stronami nierówności! Zwiń do kwadratu różnicy."
    }
  },
  "3.1": {
    "lessonId": "3.1",
    "title": "Równania liniowe: Przenoszenie wyrazów i redukcja",
    "formulas": [
      {
        "title": "Równanie liniowe",
        "latex": "ax + b = 0 \\iff ax = -b"
      },
      {
        "title": "Rozwiązanie dla a != 0",
        "latex": "x = -\\frac{b}{a}"
      }
    ],
    "goldenRule": "Dla $a = 0, b = 0$ równanie jest tożsamościowe ($x \\in \\mathbb{R}$). Dla $a = 0, b \\neq 0$ równanie jest sprzeczne (brak rozwiązań).",
    "ckeTrap": {
      "error": "0x = 5 \\implies x = 0",
      "correct": "0x = 5 \\implies x \\in \\emptyset \\text{ (sprzeczność)}",
      "description": "Żadna liczba pomnożona przez 0 nie daje 5!"
    }
  },
  "3.2": {
    "lessonId": "3.2",
    "title": "Równania liniowe: Ułamki i mnożenie obustronne",
    "formulas": [
      {
        "title": "Równanie liniowe",
        "latex": "ax + b = 0 \\iff ax = -b"
      },
      {
        "title": "Rozwiązanie dla a != 0",
        "latex": "x = -\\frac{b}{a}"
      }
    ],
    "goldenRule": "Dla $a = 0, b = 0$ równanie jest tożsamościowe ($x \\in \\mathbb{R}$). Dla $a = 0, b \\neq 0$ równanie jest sprzeczne (brak rozwiązań).",
    "ckeTrap": {
      "error": "0x = 5 \\implies x = 0",
      "correct": "0x = 5 \\implies x \\in \\emptyset \\text{ (sprzeczność)}",
      "description": "Żadna liczba pomnożona przez 0 nie daje 5!"
    }
  },
  "3.3": {
    "lessonId": "3.3",
    "title": "Nierówności liniowe: Zmiana zwrotu przy dzieleniu przez liczbę ujemną",
    "formulas": [
      {
        "title": "Nierówność liniowa",
        "latex": "ax + b > 0"
      },
      {
        "title": "Dzielenie przez liczbę ujemną",
        "latex": "-2x < 6 \\iff x > -3"
      }
    ],
    "goldenRule": "Gdy mnożysz lub dzielisz nierówność przez liczbę UJEMNĄ, ZAWSZE zmień zwrot znaku nierówności na przeciwny!",
    "ckeTrap": {
      "error": "-3x \\ge 12 \\implies x \\ge -4",
      "correct": "-3x \\ge 12 \\implies x \\le -4",
      "description": "Dzielenie przez -3 odwraca znak nierówności!"
    }
  },
  "3.4": {
    "lessonId": "3.4",
    "title": "Nierówności liniowe: Zapis przedziałowy i nierówności podwójne",
    "formulas": [
      {
        "title": "Nierówność liniowa",
        "latex": "ax + b > 0"
      },
      {
        "title": "Dzielenie przez liczbę ujemną",
        "latex": "-2x < 6 \\iff x > -3"
      }
    ],
    "goldenRule": "Gdy mnożysz lub dzielisz nierówność przez liczbę UJEMNĄ, ZAWSZE zmień zwrot znaku nierówności na przeciwny!",
    "ckeTrap": {
      "error": "-3x \\ge 12 \\implies x \\ge -4",
      "correct": "-3x \\ge 12 \\implies x \\le -4",
      "description": "Dzielenie przez -3 odwraca znak nierówności!"
    }
  },
  "3.5": {
    "lessonId": "3.5",
    "title": "Układy równań liniowych: Metoda podstawiania",
    "formulas": [
      {
        "title": "Wyróżnik równania kwadratowego",
        "latex": "\\Delta = b^2 - 4ac"
      },
      {
        "title": "Pierwiastki dla Delta > 0",
        "latex": "x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}"
      },
      {
        "title": "Pierwiastek dla Delta = 0",
        "latex": "x_0 = -\\frac{b}{2a}"
      }
    ],
    "goldenRule": "Uważaj na znak minus przy obliczaniu delty: gdy $c < 0$, to $-4ac > 0$ i delta rośnie!",
    "ckeTrap": {
      "error": "\\Delta = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 - 12 = -8",
      "correct": "\\Delta = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 + 12 = 16",
      "description": "Minus razy minus daje plus: $-4 \\cdot (-3) = +12$!"
    }
  },
  "3.6": {
    "lessonId": "3.6",
    "title": "Układy równań liniowych: Metoda przeciwnych współczynników",
    "formulas": [
      {
        "title": "Wyróżnik równania kwadratowego",
        "latex": "\\Delta = b^2 - 4ac"
      },
      {
        "title": "Pierwiastki dla Delta > 0",
        "latex": "x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}"
      },
      {
        "title": "Pierwiastek dla Delta = 0",
        "latex": "x_0 = -\\frac{b}{2a}"
      }
    ],
    "goldenRule": "Uważaj na znak minus przy obliczaniu delty: gdy $c < 0$, to $-4ac > 0$ i delta rośnie!",
    "ckeTrap": {
      "error": "\\Delta = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 - 12 = -8",
      "correct": "\\Delta = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 + 12 = 16",
      "description": "Minus razy minus daje plus: $-4 \\cdot (-3) = +12$!"
    }
  },
  "3.7": {
    "lessonId": "3.7",
    "title": "Układy równań: Zadania tekstowe i modelowanie matematyczne",
    "formulas": [
      {
        "title": "Wyróżnik równania kwadratowego",
        "latex": "\\Delta = b^2 - 4ac"
      },
      {
        "title": "Pierwiastki dla Delta > 0",
        "latex": "x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}"
      },
      {
        "title": "Pierwiastek dla Delta = 0",
        "latex": "x_0 = -\\frac{b}{2a}"
      }
    ],
    "goldenRule": "Uważaj na znak minus przy obliczaniu delty: gdy $c < 0$, to $-4ac > 0$ i delta rośnie!",
    "ckeTrap": {
      "error": "\\Delta = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 - 12 = -8",
      "correct": "\\Delta = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 + 12 = 16",
      "description": "Minus razy minus daje plus: $-4 \\cdot (-3) = +12$!"
    }
  },
  "3.8": {
    "lessonId": "3.8",
    "title": "Równania kwadratowe w postaci iloczynowej",
    "formulas": [
      {
        "title": "Nierówność kwadratowa z a > 0",
        "latex": "ax^2 + bx + c > 0 \\implies x \\in (-\\infty, x_1) \\cup (x_2, \\infty)"
      },
      {
        "title": "Nierówność kwadratowa z a > 0",
        "latex": "ax^2 + bx + c < 0 \\implies x \\in (x_1, x_2)"
      }
    ],
    "goldenRule": "Zawsze narysuj oś i przybliżoną parabolę: ramiona w górę ($a > 0$) lub w dół ($a < 0$). Odczytaj przedziały nad/pod osią.",
    "ckeTrap": {
      "error": "x^2 - 9 > 0 \\implies x > 3",
      "correct": "x^2 - 9 > 0 \\implies x \\in (-\\infty, -3) \\cup (3, \\infty)",
      "description": "Pamiętaj o lewym ramieniu paraboli: liczby mniejsze od -3 również spełniają nierówność (np. $(-4)^2 = 16 > 9$)!"
    }
  },
  "3.9": {
    "lessonId": "3.9",
    "title": "Równania kwadratowe w postaci ogólnej i wyróżnik Delta",
    "formulas": [
      {
        "title": "Nierówność kwadratowa z a > 0",
        "latex": "ax^2 + bx + c > 0 \\implies x \\in (-\\infty, x_1) \\cup (x_2, \\infty)"
      },
      {
        "title": "Nierówność kwadratowa z a > 0",
        "latex": "ax^2 + bx + c < 0 \\implies x \\in (x_1, x_2)"
      }
    ],
    "goldenRule": "Zawsze narysuj oś i przybliżoną parabolę: ramiona w górę ($a > 0$) lub w dół ($a < 0$). Odczytaj przedziały nad/pod osią.",
    "ckeTrap": {
      "error": "x^2 - 9 > 0 \\implies x > 3",
      "correct": "x^2 - 9 > 0 \\implies x \\in (-\\infty, -3) \\cup (3, \\infty)",
      "description": "Pamiętaj o lewym ramieniu paraboli: liczby mniejsze od -3 również spełniają nierówność (np. $(-4)^2 = 16 > 9$)!"
    }
  },
  "3.10": {
    "lessonId": "3.10",
    "title": "Równania kwadratowe niepełne: Wyłączanie x oraz pierwiastkowanie",
    "formulas": [
      {
        "title": "Postać iloczynowa wielomianu",
        "latex": "W(x) = (x - x_1)(x - x_2)(x - x_3) = 0"
      },
      {
        "title": "Zasada iloczynu zerowego",
        "latex": "A \\cdot B = 0 \\iff A = 0 \\lor B = 0"
      }
    ],
    "goldenRule": "Iloczyn jest równy zero, gdy co najmniej jeden z czynników jest zerem. Przyrównaj każdy nawias z osobna do zera.",
    "ckeTrap": {
      "error": "x(x^2 - 4) = 0 \\implies x^2 = 4 \\implies x = 2",
      "correct": "x(x^2 - 4) = 0 \\implies x = 0 \\lor x = 2 \\lor x = -2",
      "description": "Nie zapominaj o rozwiązaniu $x = 0$ z pierwszego czynnika oraz o ujemnym pierwiastku $x = -2$!"
    }
  },
  "3.11": {
    "lessonId": "3.11",
    "title": "Nierówności kwadratowe: Znak współczynnika a i szkic paraboli",
    "formulas": [
      {
        "title": "Postać iloczynowa wielomianu",
        "latex": "W(x) = (x - x_1)(x - x_2)(x - x_3) = 0"
      },
      {
        "title": "Zasada iloczynu zerowego",
        "latex": "A \\cdot B = 0 \\iff A = 0 \\lor B = 0"
      }
    ],
    "goldenRule": "Iloczyn jest równy zero, gdy co najmniej jeden z czynników jest zerem. Przyrównaj każdy nawias z osobna do zera.",
    "ckeTrap": {
      "error": "x(x^2 - 4) = 0 \\implies x^2 = 4 \\implies x = 2",
      "correct": "x(x^2 - 4) = 0 \\implies x = 0 \\lor x = 2 \\lor x = -2",
      "description": "Nie zapominaj o rozwiązaniu $x = 0$ z pierwszego czynnika oraz o ujemnym pierwiastku $x = -2$!"
    }
  },
  "3.12": {
    "lessonId": "3.12",
    "title": "Nierówności kwadratowe: Odczytywanie zbioru rozwiązań z osi liczbowej",
    "formulas": [
      {
        "title": "Równanie wymierne",
        "latex": "\\frac{P(x)}{Q(x)} = 0 \\iff P(x) = 0 \\land Q(x) \\neq 0"
      },
      {
        "title": "Proporcja",
        "latex": "\\frac{a}{b} = \\frac{c}{d} \\iff ad = bc \\quad (b, d \\neq 0)"
      }
    ],
    "goldenRule": "Krok 1 w każdym równaniu wymiernym: wyznacz dziedzinę ($D: \\text{mianowniki} \\neq 0$). Po rozwiązaniu odrzuć pierwiastki spoza dziedziny.",
    "ckeTrap": {
      "error": "\\frac{x^2 - 9}{x - 3} = 0 \\implies x = 3 \\lor x = -3",
      "correct": "x = -3 \\quad (x = 3 \\notin D)",
      "description": "Liczba 3 zeruje mianownik, więc nie może być rozwiązaniem!"
    }
  },
  "3.13": {
    "lessonId": "3.13",
    "title": "Równania wyższych stopni: Rozkład na czynniki w równaniach wielomianowych",
    "formulas": [
      {
        "title": "Równanie z wartością bezwzględną",
        "latex": "|x| = a \\iff x = a \\lor x = -a \\quad (a \\ge 0)"
      },
      {
        "title": "Nierówność z wartością bezwzględną",
        "latex": "|x| \\le a \\iff -a \\le x \\le a"
      }
    ],
    "goldenRule": "Gdy $|W(x)| = a$ i $a < 0$, równanie jest natychmiast sprzeczne.",
    "ckeTrap": {
      "error": "|2x - 1| = -5 \\implies 2x - 1 = 5",
      "correct": "|2x - 1| = -5 \\implies x \\in \\emptyset",
      "description": "Wartość bezwzględna nie może być ujemna!"
    }
  },
  "3.14": {
    "lessonId": "3.14",
    "title": "Równania wymierne: Mnożenie na krzyż i weryfikacja z dziedziną",
    "formulas": [
      {
        "title": "Równanie z wartością bezwzględną",
        "latex": "|x| = a \\iff x = a \\lor x = -a \\quad (a \\ge 0)"
      },
      {
        "title": "Nierówność z wartością bezwzględną",
        "latex": "|x| \\le a \\iff -a \\le x \\le a"
      }
    ],
    "goldenRule": "Gdy $|W(x)| = a$ i $a < 0$, równanie jest natychmiast sprzeczne.",
    "ckeTrap": {
      "error": "|2x - 1| = -5 \\implies 2x - 1 = 5",
      "correct": "|2x - 1| = -5 \\implies x \\in \\emptyset",
      "description": "Wartość bezwzględna nie może być ujemna!"
    }
  },
  "3.15": {
    "lessonId": "3.15",
    "title": "Równania i nierówności z wartością bezwzględną",
    "formulas": [
      {
        "title": "Równanie z wartością bezwzględną",
        "latex": "|x| = a \\iff x = a \\lor x = -a \\quad (a \\ge 0)"
      },
      {
        "title": "Nierówność z wartością bezwzględną",
        "latex": "|x| \\le a \\iff -a \\le x \\le a"
      }
    ],
    "goldenRule": "Gdy $|W(x)| = a$ i $a < 0$, równanie jest natychmiast sprzeczne.",
    "ckeTrap": {
      "error": "|2x - 1| = -5 \\implies 2x - 1 = 5",
      "correct": "|2x - 1| = -5 \\implies x \\in \\emptyset",
      "description": "Wartość bezwzględna nie może być ujemna!"
    }
  },
  "4.1": {
    "lessonId": "4.1",
    "title": "Pojęcie funkcji: Przyporządkowanie, dziedzina i przeciwdziedzina",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.2": {
    "lessonId": "4.2",
    "title": "Wyznaczanie dziedziny ze wzoru: Mianownik różny od zera",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.3": {
    "lessonId": "4.3",
    "title": "Wyznaczanie dziedziny ze wzoru: Wyrażenie pod pierwiastkiem kwadratowym",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.4": {
    "lessonId": "4.4",
    "title": "Odczytywanie dziedziny i zbioru wartości z wykresu",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.5": {
    "lessonId": "4.5",
    "title": "Odczytywanie wartości funkcji oraz rozwiązywanie równania f(x) = c z wykresu",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.6": {
    "lessonId": "4.6",
    "title": "Miejsca zerowe funkcji: Odczytywanie z wykresu i obliczanie ze wzoru",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.7": {
    "lessonId": "4.7",
    "title": "Przedziały monotoniczności: Funkcja rosnąca, malejąca i stała z wykresu",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.8": {
    "lessonId": "4.8",
    "title": "Przedziały, w których funkcja przyjmuje wartości dodatnie lub ujemne",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.9": {
    "lessonId": "4.9",
    "title": "Wartość największa i najmniejsza funkcji z wykresu",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.10": {
    "lessonId": "4.10",
    "title": "Przesunięcie wykresu wzdłuż osi OX: y = f(x - p)",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.11": {
    "lessonId": "4.11",
    "title": "Przesunięcie wykresu wzdłuż osi OY: y = f(x) + q",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.12": {
    "lessonId": "4.12",
    "title": "Przesunięcie o wektor [p, q]: y = f(x - p) + q",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.13": {
    "lessonId": "4.13",
    "title": "Symetria wykresu względem osi OX oraz osi OY",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.14": {
    "lessonId": "4.14",
    "title": "Wprowadzenie do funkcji wykładniczej: Wykres y = a^x",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "4.15": {
    "lessonId": "4.15",
    "title": "Proporcjonalność odwrotna: Wykres y = a/x i modelowanie sytuacji praktycznych",
    "formulas": [
      {
        "title": "Warunek dziedziny ze wzoru",
        "latex": "f(x) = \\frac{P(x)}{Q(x)} \\implies Q(x) \\neq 0, \\quad f(x) = \\sqrt{g(x)} \\implies g(x) \\ge 0"
      },
      {
        "title": "Przesunięcie wzdłuż osi OX",
        "latex": "y = f(x - p) \\quad (\\text{o } p \\text{ w prawo dla } p > 0)"
      },
      {
        "title": "Przesunięcie wzdłuż osi OY",
        "latex": "y = f(x) + q \\quad (\\text{o } q \\text{ w górę dla } q > 0)"
      },
      {
        "title": "Symetrie osiowe",
        "latex": "y = -f(x) \\text{ (względem OX)}, \\quad y = f(-x) \\text{ (względem OY)}"
      }
    ],
    "goldenRule": "$f(x - p)$: znak w nawiasie jest odwrotny do kierunku ruchu! $f(x - 3)$ przesuwa w PRAWO, a $f(x + 3)$ przesuwa w LEWO.",
    "ckeTrap": {
      "error": "y = f(x + 2) \\implies \\text{przesunięcie w prawo o 2}",
      "correct": "y = f(x + 2) \\implies \\text{przesunięcie w LEWO o 2}",
      "description": "Dodatnia liczba przy $x$ w nawiasie oznacza przesunięcie w stronę ujemnych $x$!"
    }
  },
  "5.1": {
    "lessonId": "5.1",
    "title": "Wzór kierunkowy funkcji liniowej: y = ax + b",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.2": {
    "lessonId": "5.2",
    "title": "Kąt nachylenia prostej do osi OX: Związek a = tg alfa",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.3": {
    "lessonId": "5.3",
    "title": "Monotoniczność funkcji liniowej w zależności od a",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.4": {
    "lessonId": "5.4",
    "title": "Wyraz wolny b i punkt przecięcia z osią OY",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.5": {
    "lessonId": "5.5",
    "title": "Miejsce zerowe funkcji liniowej: x_0 = -b/a",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.6": {
    "lessonId": "5.6",
    "title": "Wyznaczanie wzoru prostej przez dwa punkty",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.7": {
    "lessonId": "5.7",
    "title": "Warunek równoległości prostych: a_1 = a_2",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.8": {
    "lessonId": "5.8",
    "title": "Warunek prostopadłości prostych: a_1 * a_2 = -1",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.9": {
    "lessonId": "5.9",
    "title": "Sprawdzanie przynależności punktu do prostej i wyznaczanie parametru",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.10": {
    "lessonId": "5.10",
    "title": "Równania liniowe z parametrem w ujęciu geometrycznym",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.11": {
    "lessonId": "5.11",
    "title": "Nierówności liniowe: Rozwiązywanie algebraiczne i graficzne",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.12": {
    "lessonId": "5.12",
    "title": "Układy równań liniowych: Metoda podstawiania krok po kroku",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.13": {
    "lessonId": "5.13",
    "title": "Układy równań liniowych: Metoda przeciwnych współczynników",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.14": {
    "lessonId": "5.14",
    "title": "Interpretacja geometryczna układu równań",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "5.15": {
    "lessonId": "5.15",
    "title": "Zadania tekstowe prowadzące do układu równań liniowych",
    "formulas": [
      {
        "title": "Wzór kierunkowy prostej",
        "latex": "y = ax + b"
      },
      {
        "title": "Współczynnik kierunkowy ze współrzędnych",
        "latex": "a = \\operatorname{tg}\\alpha = \\frac{y_2 - y_1}{x_2 - x_1}"
      },
      {
        "title": "Warunek równoległości",
        "latex": "k \\parallel l \\iff a_1 = a_2"
      },
      {
        "title": "Warunek prostopadłości",
        "latex": "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
      },
      {
        "title": "Miejsce zerowe funkcji liniowej",
        "latex": "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
      }
    ],
    "goldenRule": "Dwie proste są prostopadłe, gdy ich współczynniki kierunkowe są liczbami przeciwnymi i odwrotnymi: np. $a_1 = 2 \\implies a_2 = -\\frac{1}{2}$.",
    "ckeTrap": {
      "error": "k: y = 3x - 1 \\perp l: y = -3x + 2",
      "correct": "k: y = 3x - 1 \\perp l: y = -\\frac{1}{3}x + 2",
      "description": "Warunek prostopadłości to $a_1 \\cdot a_2 = -1$, a nie samo zmienienie znaku!"
    }
  },
  "6.1": {
    "lessonId": "6.1",
    "title": "Postać ogólna funkcji kwadratowej: f(x) = ax^2 + bx + c",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.2": {
    "lessonId": "6.2",
    "title": "Wyróżnik równania kwadratowego delta i liczba miejsc zerowych",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.3": {
    "lessonId": "6.3",
    "title": "Miejsca zerowe funkcji kwadratowej: Wzory na x_1 i x_2",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.4": {
    "lessonId": "6.4",
    "title": "Współrzędne wierzchołka paraboli: p = -b/(2a) i q = -delta/(4a)",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.5": {
    "lessonId": "6.5",
    "title": "Postać kanoniczna funkcji kwadratowej: f(x) = a(x - p)^2 + q",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.6": {
    "lessonId": "6.6",
    "title": "Oś symetrii paraboli o równaniu x = p",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.7": {
    "lessonId": "6.7",
    "title": "Postać iloczynowa funkcji kwadratowej: f(x) = a(x - x_1)(x - x_2)",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.8": {
    "lessonId": "6.8",
    "title": "Przechodzenie między postaciami funkcji kwadratowej",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.9": {
    "lessonId": "6.9",
    "title": "Wyznaczanie wzoru funkcji kwadratowej na podstawie danych",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.10": {
    "lessonId": "6.10",
    "title": "Zbiór wartości i przedziały monotoniczności paraboli",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.11": {
    "lessonId": "6.11",
    "title": "Wartość najmniejsza i największa w przedziale domkniętym",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.12": {
    "lessonId": "6.12",
    "title": "Nierówności kwadratowe z delta > 0",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.13": {
    "lessonId": "6.13",
    "title": "Nierówności kwadratowe z delta <= 0",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.14": {
    "lessonId": "6.14",
    "title": "Odczytywanie znaków współczynników z rysunku paraboli",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "6.15": {
    "lessonId": "6.15",
    "title": "Podsumowanie funkcji kwadratowej: Zadania maturalne",
    "formulas": [
      {
        "title": "Postać ogólna",
        "latex": "f(x) = ax^2 + bx + c"
      },
      {
        "title": "Postać kanoniczna",
        "latex": "f(x) = a(x - p)^2 + q"
      },
      {
        "title": "Współrzędne wierzchołka paraboli",
        "latex": "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a} = f(p)"
      },
      {
        "title": "Postać iloczynowa",
        "latex": "f(x) = a(x - x_1)(x - x_2) \\quad (\\Delta > 0)"
      },
      {
        "title": "Wyróżnik i pierwiastki",
        "latex": "\\Delta = b^2 - 4ac, \\quad x_{1,2} = \\frac{-b \\mp \\sqrt{\\Delta}}{2a}"
      }
    ],
    "goldenRule": "Dla $a > 0$ funkcja osiąga wartość najmniejszą w wierzchołku: $q = f(p)$, a zbiór wartości to $\\langle q, \\infty)$. Dla $a < 0$ wierzchołek to wartość największa: $(-\\infty, q\\rangle$.",
    "ckeTrap": {
      "error": "f(x) = 2(x + 3)^2 - 5 \\implies p = 3",
      "correct": "f(x) = 2(x + 3)^2 - 5 \\implies p = -3, q = -5",
      "description": "W postaci kanonicznej jest minus: $a(x - p)^2 + q$, więc $x + 3 = x - (-3)$!"
    }
  },
  "7.1": {
    "lessonId": "7.1",
    "title": "Pojęcie ciągu liczbowego i obliczanie wyrazów z wzoru ogólnego",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.2": {
    "lessonId": "7.2",
    "title": "Badanie znaków wyrazów ciągu: Wyrazy dodatnie i ujemne",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.3": {
    "lessonId": "7.3",
    "title": "Badanie monotoniczności ciągów: Różnica a_{n+1} - a_n",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.4": {
    "lessonId": "7.4",
    "title": "Ciąg arytmetyczny 1: Rozpoznawanie i wyznaczanie różnicy r",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.5": {
    "lessonId": "7.5",
    "title": "Ciąg arytmetyczny 2: Wzór ogólny a_n = a_1 + (n-1)r",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.6": {
    "lessonId": "7.6",
    "title": "Ciąg arytmetyczny 3: Własność trzech sąsiednich wyrazów",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.7": {
    "lessonId": "7.7",
    "title": "Ciąg arytmetyczny 4: Suma początkowych wyrazów S_n",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.8": {
    "lessonId": "7.8",
    "title": "Ciąg arytmetyczny 5: Zadania tekstowe i praktyczne",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.9": {
    "lessonId": "7.9",
    "title": "Ciąg geometryczny 1: Rozpoznawanie i wyznaczanie ilorazu q",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.10": {
    "lessonId": "7.10",
    "title": "Ciąg geometryczny 2: Wzór ogólny a_n = a_1 * q^{n-1}",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.11": {
    "lessonId": "7.11",
    "title": "Ciąg geometryczny 3: Własność trzech sąsiednich wyrazów",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.12": {
    "lessonId": "7.12",
    "title": "Ciąg geometryczny 4: Suma początkowych wyrazów S_n",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.13": {
    "lessonId": "7.13",
    "title": "Ciągi mieszane: Układy warunków arytmetycznych i geometrycznych",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.14": {
    "lessonId": "7.14",
    "title": "Procent składany: Lokaty, kapitalizacja odsetek i podatki",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "7.15": {
    "lessonId": "7.15",
    "title": "Zadania dowodowe i nietypowe z ciągów liczbowych",
    "formulas": [
      {
        "title": "Wzór ogólny ciągu arytmetycznego",
        "latex": "a_n = a_1 + (n - 1)r"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu arytmetycznego",
        "latex": "a_n = \\frac{a_{n-1} + a_{n+1}}{2}"
      },
      {
        "title": "Suma n wyrazów ciągu arytmetycznego",
        "latex": "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)r}{2} \\cdot n"
      },
      {
        "title": "Wzór ogólny ciągu geometrycznego",
        "latex": "a_n = a_1 \\cdot q^{n-1}"
      },
      {
        "title": "Trzy kolejne wyrazy ciągu geometrycznego",
        "latex": "a_n^2 = a_{n-1} \\cdot a_{n+1}"
      },
      {
        "title": "Suma n wyrazów ciągu geometrycznego",
        "latex": "S_n = a_1 \\frac{1 - q^n}{1 - q} \\quad (q \\neq 1)"
      }
    ],
    "goldenRule": "Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów: $2a_2 = a_1 + a_3$. Dla geometrycznego kwadrat środkowego to iloczyn: $a_2^2 = a_1 \\cdot a_3$.",
    "ckeTrap": {
      "error": "a_n = 3 \\cdot 2^{n-1} \\implies a_1 = 3 \\cdot 2^0 = 0",
      "correct": "a_1 = 3 \\cdot 2^0 = 3 \\cdot 1 = 3",
      "description": "Każda niezerowa liczba podniesiona do potęgi zerowej wynosi 1 ($2^0 = 1$)!"
    }
  },
  "8.1": {
    "lessonId": "8.1",
    "title": "Definicje funkcji trygonometrycznych w trójkącie prostokątnym",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.2": {
    "lessonId": "8.2",
    "title": "Wartości funkcji trygonometrycznych dla kątów 30, 45 i 60 stopni",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.3": {
    "lessonId": "8.3",
    "title": "Jedynka trygonometryczna: sin^2 a + cos^2 a = 1",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.4": {
    "lessonId": "8.4",
    "title": "Związek tangensa z sinusem i cosinusem oraz obliczanie funkcji",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.5": {
    "lessonId": "8.5",
    "title": "Kąty dopełniające: Zależności między sinusem i cosinusem (90 - a)",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.6": {
    "lessonId": "8.6",
    "title": "Wzory redukcyjne dla kątów rozwartych: 180 - a",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.7": {
    "lessonId": "8.7",
    "title": "Funkcje trygonometryczne w układzie współrzędnych",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.8": {
    "lessonId": "8.8",
    "title": "Pole trójkąta z sinusem kąta: P = 1/2 * a * b * sin(gamma)",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.9": {
    "lessonId": "8.9",
    "title": "Twierdzenie sinusów (prawo sinusów): a/sin(a) = 2R",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.10": {
    "lessonId": "8.10",
    "title": "Twierdzenie cosinusów (twierdzenie Carnota): c^2 = a^2 + b^2 - 2ab*cos(gamma)",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.11": {
    "lessonId": "8.11",
    "title": "Trygonometria w czworokątach: Romb, równoległobok i trapez",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.12": {
    "lessonId": "8.12",
    "title": "Tożsamości trygonometryczne i dowodzenie zależności",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.13": {
    "lessonId": "8.13",
    "title": "Zadania praktyczne z kątem wzniesienia i depresji",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.14": {
    "lessonId": "8.14",
    "title": "Nietypowe i złożone zadania trygonometryczne na maturze",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "8.15": {
    "lessonId": "8.15",
    "title": "Podsumowanie działu: Strategie rozwiązywania zadań maturalnych z trygonometrii",
    "formulas": [
      {
        "title": "Definicje w trójkącie prostokątnym",
        "latex": "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
      },
      {
        "title": "Jedynka trygonometryczna",
        "latex": "\\sin^2\\alpha + \\cos^2\\alpha = 1"
      },
      {
        "title": "Tangens przez sinus i cosinus",
        "latex": "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
      },
      {
        "title": "Pole trójkąta z sinusem",
        "latex": "P = \\frac{1}{2}ab \\sin\\gamma"
      },
      {
        "title": "Twierdzenie sinusów",
        "latex": "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
      },
      {
        "title": "Twierdzenie cosinusów",
        "latex": "c^2 = a^2 + b^2 - 2ab \\cos\\gamma"
      }
    ],
    "goldenRule": "W kącie rozwartym $\\alpha \\in (90^\\circ, 180^\\circ)$: sinus jest dodatni ($\\sin(180^\\circ - \\alpha) = \\sin\\alpha$), a cosinus i tangens są ujemne ($\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$).",
    "ckeTrap": {
      "error": "\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = \\frac{1}{2}",
      "correct": "\\cos 120^\\circ = -\\cos 60^\\circ = -\\frac{1}{2}",
      "description": "Cosinus kąta rozwartego w trójkącie jest ZAWSZE ujemny!"
    }
  },
  "9.1": {
    "lessonId": "9.1",
    "title": "Kąty na płaszczyźnie: Przyległe, wierzchołkowe i naprzemianległe",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.2": {
    "lessonId": "9.2",
    "title": "Trójkąty 1: Suma kątów, nierówność trójkąta i klasyfikacja",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.3": {
    "lessonId": "9.3",
    "title": "Trójkąty 2: Twierdzenie Pitagorasa i trójki pitagorejskie",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.4": {
    "lessonId": "9.4",
    "title": "Trójkąt równoboczny: Wysokość, pole i promienie okręgów",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.5": {
    "lessonId": "9.5",
    "title": "Trójkąty szczególne: Kąty 30-60-90 oraz 45-45-90",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.6": {
    "lessonId": "9.6",
    "title": "Twierdzenie Talesa: Podział odcinków i proste równoległe",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.7": {
    "lessonId": "9.7",
    "title": "Podobieństwo figur: Cechy podobieństwa i skala k",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.8": {
    "lessonId": "9.8",
    "title": "Stosunek pól i obwodów figur podobnych: Skala k i k^2",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.9": {
    "lessonId": "9.9",
    "title": "Okrąg wpisany i opisany na trójkącie: Promienie r i R",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.10": {
    "lessonId": "9.10",
    "title": "Kąty w okręgu: Kąt środkowy i wpisany",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.11": {
    "lessonId": "9.11",
    "title": "Styczne do okręgu i kąt dopisany",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.12": {
    "lessonId": "9.12",
    "title": "Czworokąty wpisane i opisane na okręgu",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.13": {
    "lessonId": "9.13",
    "title": "Czworokąty: Własności przekątnych i pola figur",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.14": {
    "lessonId": "9.14",
    "title": "Pole koła, wycinek koła i długość łuku",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "9.15": {
    "lessonId": "9.15",
    "title": "Dowodzenie w planimetrii: Relacje miarowe i kątowe",
    "formulas": [
      {
        "title": "Trójkąt równoboczny",
        "latex": "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad r = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{a\\sqrt{3}}{3}"
      },
      {
        "title": "Twierdzenie Pitagorasa",
        "latex": "a^2 + b^2 = c^2"
      },
      {
        "title": "Kąty w okręgu",
        "latex": "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}"
      },
      {
        "title": "Czworokąt wpisany w okrąg",
        "latex": "\\alpha + \\gamma = \\beta + \\delta = 180^\\circ"
      },
      {
        "title": "Czworokąt opisany na okręgu",
        "latex": "a + c = b + d"
      },
      {
        "title": "Stosunek pól figur podobnych",
        "latex": "\\frac{P_1}{P_2} = k^2, \\quad \\frac{Obw_1}{Obw_2} = k"
      }
    ],
    "goldenRule": "Jeśli figura jest podobna w skali $k$, to jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie $k^2$ razy!",
    "ckeTrap": {
      "error": "k = 3 \\implies \\text{pole wzrosło 3 razy}",
      "correct": "k = 3 \\implies \\text{pole wzrosło } 3^2 = 9 \\text{ razy}",
      "description": "Stosunek pól jest kwadratem skali podobieństwa!"
    }
  },
  "10.1": {
    "lessonId": "10.1",
    "title": "Długość odcinka w układzie współrzędnych",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.2": {
    "lessonId": "10.2",
    "title": "Środek odcinka w układzie współrzędnych",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.3": {
    "lessonId": "10.3",
    "title": "Proste w postaci kierunkowej: y = ax + b i kąt nachylenia",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.4": {
    "lessonId": "10.4",
    "title": "Proste równoległe i prostopadłe w układzie współrzędnych",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.5": {
    "lessonId": "10.5",
    "title": "Równanie okręgu w postaci kanonicznej: (x - a)^2 + (y - b)^2 = r^2",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.6": {
    "lessonId": "10.6",
    "title": "Wzajemne położenie prostej i okręgu oraz styczność",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.7": {
    "lessonId": "10.7",
    "title": "Wektory w układzie współrzędnych: Współrzędne i działania",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.8": {
    "lessonId": "10.8",
    "title": "Symetria osiowa i środkowa w układzie współrzędnych",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.9": {
    "lessonId": "10.9",
    "title": "Postać ogólna prostej: Ax + By + C = 0",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.10": {
    "lessonId": "10.10",
    "title": "Pole trójkąta i wielokąta ze współrzędnych wierzchołków",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.11": {
    "lessonId": "10.11",
    "title": "Symetralna odcinka w układzie współrzędnych",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.12": {
    "lessonId": "10.12",
    "title": "Odległość punktu od prostej: d = |Ax_0 + By_0 + C| / sqrt(A^2 + B^2)",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.13": {
    "lessonId": "10.13",
    "title": "Przekształcenia geometryczne figur: Przesunięcie o wektor [p, q]",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.14": {
    "lessonId": "10.14",
    "title": "Zadania dowodowe w geometrii analitycznej",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "10.15": {
    "lessonId": "10.15",
    "title": "Podsumowanie geometrii analitycznej: Strategie rozwiązywania zadań",
    "formulas": [
      {
        "title": "Długość odcinka",
        "latex": "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
      },
      {
        "title": "Współrzędne środka odcinka",
        "latex": "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)"
      },
      {
        "title": "Równanie okręgu w postaci kanonicznej",
        "latex": "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b))"
      },
      {
        "title": "Odległość punktu od prostej",
        "latex": "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
      },
      {
        "title": "Wektor ze współrzędnych punktów",
        "latex": "\\vec{AB} = [x_B - x_A, y_B - y_A], \\quad |\\vec{u}| = \\sqrt{u_x^2 + u_y^2}"
      }
    ],
    "goldenRule": "W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi $r^2$, a nie $r$. Jeżeli po prawej stronie jest 25, to promień wynosi $\\sqrt{25} = 5$.",
    "ckeTrap": {
      "error": "(x - 2)^2 + (y + 3)^2 = 16 \\implies S = (-2, 3), r = 16",
      "correct": "S = (2, -3), \\quad r = \\sqrt{16} = 4",
      "description": "Pamiętaj o zmianie znaków współrzędnych środka oraz spierwiastkowaniu prawej strony!"
    }
  },
  "11.1": {
    "lessonId": "11.1",
    "title": "Prostopadłościan i sześcian: Przekątne, pole i objętość",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.2": {
    "lessonId": "11.2",
    "title": "Graniastosłupy proste: Siatka, pole całkowite i objętość",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.3": {
    "lessonId": "11.3",
    "title": "Graniastosłup prawidłowy trójkątny i sześciokątny",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.4": {
    "lessonId": "11.4",
    "title": "Ostrosłupy proste i prawidłowe: Pole całkowite i objętość (1/3 Pp*H)",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.5": {
    "lessonId": "11.5",
    "title": "Ostrosłup prawidłowy czworokątny: Trójkąty prostokątne w bryle",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.6": {
    "lessonId": "11.6",
    "title": "Walec: Przekrój osiowy, pole powierzchni i objętość",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.7": {
    "lessonId": "11.7",
    "title": "Stożek: Tworząca l, pole powierzchni i objętość (1/3 pi r^2 H)",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.8": {
    "lessonId": "11.8",
    "title": "Kula: Pole powierzchni i objętość",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.9": {
    "lessonId": "11.9",
    "title": "Kąty w graniastosłupach: Kąt nachylenia przekątnej bryły",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.10": {
    "lessonId": "11.10",
    "title": "Kąty w ostrosłupach: Kąt krawędzi i ściany bocznej do podstawy",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.11": {
    "lessonId": "11.11",
    "title": "Przekroje wielościanów płaszczyzną",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.12": {
    "lessonId": "11.12",
    "title": "Bryły wpisane i opisane (wzajemne relacje)",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.13": {
    "lessonId": "11.13",
    "title": "Zadania praktyczne z geometrii przestrzennej",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.14": {
    "lessonId": "11.14",
    "title": "Podobieństwo brył: Skala k, k^2 oraz k^3",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "11.15": {
    "lessonId": "11.15",
    "title": "Podsumowanie stereometrii: Strategie rozwiązywania zadań",
    "formulas": [
      {
        "title": "Prostopadłościan i sześcian",
        "latex": "V = abc, \\quad D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcianu}} = a\\sqrt{3}"
      },
      {
        "title": "Graniastosłup prosty",
        "latex": "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b"
      },
      {
        "title": "Ostrosłup",
        "latex": "V = \\frac{1}{3}P_p \\cdot H, \\quad P_c = P_p + P_b"
      },
      {
        "title": "Walec",
        "latex": "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
      },
      {
        "title": "Stożek",
        "latex": "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
      },
      {
        "title": "Kula",
        "latex": "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
      }
    ],
    "goldenRule": "W ostrosłupie i stożku ZAWSZE pamiętaj o ułamku $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3}P_p H$.",
    "ckeTrap": {
      "error": "V_{\\text{stożka}} = \\pi r^2 H",
      "correct": "V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2 H",
      "description": "Bez ułamka $\\frac{1}{3}$ obliczasz objętość walca, a nie stożka!"
    }
  },
  "12.1": {
    "lessonId": "12.1",
    "title": "Reguła mnożenia: Podstawowa zasada zliczania",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.2": {
    "lessonId": "12.2",
    "title": "Reguła dodawania: Rozłączne przypadki w zliczaniu",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.3": {
    "lessonId": "12.3",
    "title": "Tworzenie liczb z powtórzeniami cyfr",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.4": {
    "lessonId": "12.4",
    "title": "Tworzenie liczb o różnych cyfrach (bez powtórzeń cyfr)",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.5": {
    "lessonId": "12.5",
    "title": "Zliczanie liczb z cyfrą zero na określonych pozycjach",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.6": {
    "lessonId": "12.6",
    "title": "Zliczanie liczb parzystych i nieparzystych",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.7": {
    "lessonId": "12.7",
    "title": "Zliczanie liczb spełniających warunki podzielności",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.8": {
    "lessonId": "12.8",
    "title": "Silnia: Definicja, własności i upraszczanie wyrażeń",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.9": {
    "lessonId": "12.9",
    "title": "Permutacje zbioru n-elementowego: Ustawianie w kolejce",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.10": {
    "lessonId": "12.10",
    "title": "Permutacje z ograniczeniami: Elementy stojące obok siebie",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.11": {
    "lessonId": "12.11",
    "title": "Wariacje bez powtórzeń i z powtórzeniami",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.12": {
    "lessonId": "12.12",
    "title": "Kombinacje: Wybór podzbioru bez uwzględniania kolejności",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.13": {
    "lessonId": "12.13",
    "title": "Zliczanie w geometrii: Przekątne, odcinki i trójkąty",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.14": {
    "lessonId": "12.14",
    "title": "Zliczanie z ograniczeniami: Warunki brzegowe i wykluczenia",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "12.15": {
    "lessonId": "12.15",
    "title": "Złożone zadania kombinatoryczne z matur majowych",
    "formulas": [
      {
        "title": "Reguła mnożenia",
        "latex": "|A_1 \\times A_2 \\times \\cdots \\times A_k| = n_1 \\cdot n_2 \\cdots n_k"
      },
      {
        "title": "Silnia",
        "latex": "n! = 1 \\cdot 2 \\cdots n, \\quad 0! = 1"
      },
      {
        "title": "Permutacje (uporządkowania)",
        "latex": "P_n = n!"
      },
      {
        "title": "Wariacje bez powtórzeń",
        "latex": "V_n^k = \\frac{n!}{(n-k)!}"
      },
      {
        "title": "Wariacje z powtórzeniami",
        "latex": "\\overline{V}_n^k = n^k"
      },
      {
        "title": "Kombinacje (wybór bez kolejności)",
        "latex": "C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
      }
    ],
    "goldenRule": "Jeśli kolejność MA znaczenie (kod PIN, miejsca na podium, cyfry w liczbie) -> wariacje / reguła mnożenia. Jeśli kolejność NIE MA znaczenia (losowanie 3 osób z grupy) -> kombinacje $\\binom{n}{k}$.",
    "ckeTrap": {
      "error": "\\text{Wybór 2 osób z 10 to } 10 \\cdot 9 = 90",
      "correct": "\\text{Wybór 2 osób z 10 to } \\binom{10}{2} = \\frac{10 \\cdot 9}{2} = 45",
      "description": "Wybór delegacji to kombinacje (nie ma znaczenia kto wylosowany jako pierwszy)!"
    }
  },
  "13.1": {
    "lessonId": "13.1",
    "title": "Przestrzeń zdarzeń elementarnych i prawdopodobieństwo klasyczne",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.2": {
    "lessonId": "13.2",
    "title": "Dwukrotny rzut kostką: Tabela zdarzeń jako niezawodna metoda",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.3": {
    "lessonId": "13.3",
    "title": "Losowanie kul z urny: Doświadczenie jednokrotne z wieloma kolorami",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.4": {
    "lessonId": "13.4",
    "title": "Własności prawdopodobieństwa i zdarzenie przeciwne",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.5": {
    "lessonId": "13.5",
    "title": "Suma zdarzeń i prawdopodobieństwo łączne",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.6": {
    "lessonId": "13.6",
    "title": "Doświadczenia wieloetapowe: Reguła drzewa stochastycznego",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.7": {
    "lessonId": "13.7",
    "title": "Losowanie dwuetapowe bez zwracania",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.8": {
    "lessonId": "13.8",
    "title": "Doświadczenia z monetami i kostkami: Szacowanie i reguła mnożenia",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.9": {
    "lessonId": "13.9",
    "title": "Losowanie liczb ze zbioru z warunkami podzielności i nierówności",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.10": {
    "lessonId": "13.10",
    "title": "Złożone zadania z prawdopodobieństwa z matur majowych",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.11": {
    "lessonId": "13.11",
    "title": "Prawdopodobieństwo geometryczne na odcinku",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.12": {
    "lessonId": "13.12",
    "title": "Doświadczenia z monetami: Rzuty wielokrotne i symetria",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.13": {
    "lessonId": "13.13",
    "title": "Doświadczenia losowe z kartami do gry",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.14": {
    "lessonId": "13.14",
    "title": "Niezależność zdarzeń losowych w ujęciu intuicyjnym",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "13.15": {
    "lessonId": "13.15",
    "title": "Podsumowanie rachunku prawdopodobieństwa: Zadania przekrojowe",
    "formulas": [
      {
        "title": "Prawdopodobieństwo klasyczne",
        "latex": "P(A) = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1"
      },
      {
        "title": "Zdarzenie przeciwne",
        "latex": "P(A') = 1 - P(A)"
      },
      {
        "title": "Suma zdarzeń",
        "latex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
      },
      {
        "title": "Zdarzenia rozłączne",
        "latex": "A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)"
      }
    ],
    "goldenRule": "Gdy zadanie zawiera frazę 'co najmniej raz' / 'co najmniej jeden', ZAWSZE licz przez zdarzenie przeciwne: $P(A) = 1 - P(A')$, gdzie $A'$ to 'ani razu'.",
    "ckeTrap": {
      "error": "P(A) = 1.25",
      "correct": "0 \\le P(A) \\le 1",
      "description": "Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne!"
    }
  },
  "14.1": {
    "lessonId": "14.1",
    "title": "Średnia arytmetyczna liczb",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.2": {
    "lessonId": "14.2",
    "title": "Średnia arytmetyczna z dwiema niewiadomymi",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.3": {
    "lessonId": "14.3",
    "title": "Średnia ważona",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.4": {
    "lessonId": "14.4",
    "title": "Mediana zestawu danych o nieparzystej liczbie elementów",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.5": {
    "lessonId": "14.5",
    "title": "Mediana zestawu danych o parzystej liczbie elementów",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.6": {
    "lessonId": "14.6",
    "title": "Dominanta zestawu danych",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.7": {
    "lessonId": "14.7",
    "title": "Wariancja zestawu danych",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.8": {
    "lessonId": "14.8",
    "title": "Odchylenie standardowe",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.9": {
    "lessonId": "14.9",
    "title": "Przekształcenia liniowe danych statystycznych",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.10": {
    "lessonId": "14.10",
    "title": "Analiza danych z tabeli częstości",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.11": {
    "lessonId": "14.11",
    "title": "Interpretacja wykresów słupkowych i kołowych",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.12": {
    "lessonId": "14.12",
    "title": "Błąd bezwzględny i błąd względny pomiaru",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.13": {
    "lessonId": "14.13",
    "title": "Własności miar statystycznych w zadaniach dowodowych",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.14": {
    "lessonId": "14.14",
    "title": "Mediana i średnia z niewiadomymi w zadaniach tekstowych",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "14.15": {
    "lessonId": "14.15",
    "title": "Złożone zadania maturalne ze statystyki",
    "formulas": [
      {
        "title": "Średnia arytmetyczna",
        "latex": "\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}"
      },
      {
        "title": "Średnia ważona",
        "latex": "\\overline{x}_w = \\frac{x_1 w_1 + x_2 w_2 + \\cdots + x_k w_k}{w_1 + w_2 + \\cdots + w_k}"
      },
      {
        "title": "Mediana",
        "latex": "Me = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{dla } n \\text{ nieparzystego} \\\\[6pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{dla } n \\text{ parzystego} \\end{cases}"
      },
      {
        "title": "Wariancja",
        "latex": "\\sigma^2 = \\frac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}"
      },
      {
        "title": "Odchylenie standardowe",
        "latex": "\\sigma = \\sqrt{\\sigma^2}"
      }
    ],
    "goldenRule": "Zanim wyznaczysz medianę, ZAWSZE posortuj liczby w kolejności NIEMALEJĄCEJ (od najmniejszej do największej)!",
    "ckeTrap": {
      "error": "\\text{Mediana } (5, 1, 9) = 1",
      "correct": "\\text{Po posortowaniu: } (1, 5, 9) \\implies Me = 5",
      "description": "Bez uporządkowania danych mediana jest błędna!"
    }
  },
  "15.1": {
    "lessonId": "15.1",
    "title": "Schemat 5 kroków w zadaniach optymalizacyjnych",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.2": {
    "lessonId": "15.2",
    "title": "Wyznaczanie dziedziny geometrycznej w zadaniach optymalizacyjnych",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.3": {
    "lessonId": "15.3",
    "title": "Optymalizacja ogrodzenia 1: Prostokąt o zadanym obwodzie",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.4": {
    "lessonId": "15.4",
    "title": "Optymalizacja ogrodzenia 2: Działka przylegająca do muru",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.5": {
    "lessonId": "15.5",
    "title": "Optymalizacja ogrodzenia 3: Działka dzielona płotem wewnętrznym",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.6": {
    "lessonId": "15.6",
    "title": "Optymalizacja ogrodzenia 4: Bramy wjazdowe i furtki",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.7": {
    "lessonId": "15.7",
    "title": "Optymalizacja pola trójkąta prostokątnego",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.8": {
    "lessonId": "15.8",
    "title": "Optymalizacja ekonomiczna: Przychód i cena biletu",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.9": {
    "lessonId": "15.9",
    "title": "Optymalizacja ekonomiczna: Zysk firmy jako różnica przychodu i kosztów",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.10": {
    "lessonId": "15.10",
    "title": "Optymalizacja w geometrii analitycznej: Odległość punktu na prostej",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.11": {
    "lessonId": "15.11",
    "title": "Modelowanie rzutu pionowego i toru lotu pocisku",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.12": {
    "lessonId": "15.12",
    "title": "Optymalizacja pudełka z siatki i pola powierzchni",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.13": {
    "lessonId": "15.13",
    "title": "Zadania optymalizacyjne z oknem normańskim i łukiem",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.14": {
    "lessonId": "15.14",
    "title": "Kompleksowe zadanie otwarte za 4 punkty z matury majowej",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  },
  "15.15": {
    "lessonId": "15.15",
    "title": "Strategia zdobywania 4 punktów w zadaniu optymalizacyjnym",
    "formulas": [
      {
        "title": "5-krokowy schemat optymalizacji",
        "latex": "1) \\text{ Związek } y(x) \\quad 2) \\text{ Dziedzina } D \\quad 3) \\text{ Wzór celu } f(x) \\quad 4) x_w = -\\frac{b}{2a} \\quad 5) \\text{ Wynik}"
      },
      {
        "title": "Wierzchołek paraboli (wartość optymalna)",
        "latex": "x_w = -\\frac{b}{2a}, \\quad y_w = f(x_w) = -\\frac{\\Delta}{4a}"
      },
      {
        "title": "Uzasadnienie maksimum",
        "latex": "a < 0 \\implies \\text{ramiona w dół} \\implies \\text{w } x_w \\text{ funkcja osiąga maksimum}"
      },
      {
        "title": "Uzasadnienie minimum",
        "latex": "a > 0 \\implies \\text{ramiona w górę} \\implies \\text{w } x_w \\text{ funkcja osiąga minimum}"
      }
    ],
    "goldenRule": "W zadaniu za 4 punkty pamiętaj o podaniu: 1) zależności między zmiennymi, 2) dziedziny geometrycznej, 3) funkcji jednej zmiennej, 4) wierzchołka $x_w = -\\frac{b}{2a}$ wraz z uzasadnieniem $a < 0$, 5) obu wymiarów oraz odpowiedzi z jednostkami.",
    "ckeTrap": {
      "error": "P(x) = -x^2 + 100x \\implies \\text{brak dziedziny w zapisie}",
      "correct": "\\text{Warunki: } x > 0 \\land 100 - x > 0 \\implies D: x \\in (0, 100)",
      "description": "Brak wyznaczenia dziedziny geometrycznej to strata 1 punktu w kluczu maturalnym!"
    }
  }
};

export function getLessonFormulaSheet(lessonId: string): LessonFormulaSheet | null {
  const normId = String(lessonId).replace(/^lesson-/, '').replace('-', '.');
  return allFormulaSheetsByLesson[normId] || null;
}
