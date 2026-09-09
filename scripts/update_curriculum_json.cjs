const fs = require('fs');

const topic1 = {
  "id": 1,
  "slug": "liczby-rzeczywiste",
  "title": "Dział 1: Liczby Rzeczywiste",
  "short_title": "Liczby Rzeczywiste",
  "icon": "🔢",
  "color": "#00E5FF",
  "matura_points_range": "4–8 pkt",
  "importance": "Kluczowy (fundament całej matury)",
  "description": "Fundament matury z matematyki: opanuj działania na potęgach, pierwiastkach, logarytmach, procentach oraz bezbłędne dowodzenie podzielności.",
  "lessons": [
    {
      "id": "1.1",
      "slug": "potegi-i-wykladniki",
      "title": "Potęgi o wykładnikach całkowitych i wymiernych",
      "order": 1,
      "estimated_time_minutes": 5,
      "estimated_time_formatted": "~5 min",
      "theory_pill": {
        "title": "Potęgi o wykładnikach całkowitych i wymiernych",
        "concept_essence": "Potęgowanie to skrócony zapis wielokrotnego mnożenia tej samej liczby ($a^n = a \\cdot a \\dots a$). Wykładnik ujemny $a^{-n} = \\frac{1}{a^n}$ oznacza operację odwrotną do mnożenia, czyli dzielenie (odwrócenie liczby). Wykładnik ułamkowy $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$ łączy potęgowanie z pierwiastkowaniem – mianownik ułamka zawsze określa stopień pierwiastka.",
        "matura_context": "W arkuszu maturalnym zadania z potęg (zazwyczaj Zadanie 1 lub 2 za 1 pkt) NIE polegają na mechanicznym wyliczaniu wielkich liczb. Egzaminator sprawdza, czy potrafisz sprowadzić różne podstawy do jednej wspólnej bazy (najczęściej $2$, $3$ lub $5$) i wykonać działania na wykładnikach. Podstawa potęgi pozostaje nienaruszona!",
        "core_formulas": [
          "a^x \\cdot a^y = a^{x+y}",
          "\\frac{a^x}{a^y} = a^{x-y}",
          "(a^x)^y = a^{x \\cdot y}",
          "a^{-x} = \\frac{1}{a^x}",
          "a^{\\frac{m}{n}} = \\sqrt[n]{a^m}"
        ],
        "worked_example": {
          "problem": "Uprość wyrażenie z arkusza: $9^3 \\cdot 27^{-1}$",
          "step_1": "Sprowadź do wspólnej bazy $3$: zauważ, że $9 = 3^2$ oraz $27 = 3^3$.",
          "step_2": "Podstaw: $(3^2)^3 \\cdot (3^3)^{-1} = 3^6 \\cdot 3^{-3} = 3^{6-3} = 3^3 = 27$."
        },
        "exam_trap": "Kardynalny błąd: mnożenie podstaw! Zapis $2^3 \\cdot 2^4 = 4^7$ to gwarantowane zero punktów. Podstawa się nie zmienia: $2^3 \\cdot 2^4 = 2^{3+4} = 2^7$.",
        "core_formula": "$$a^x \\cdot a^y = a^{x+y}$$ \\quad | \\quad $$\\frac{a^x}{a^y} = a^{x-y}$$ \\quad | \\quad $$(a^x)^y = a^{x \\cdot y}$$ \\quad | \\quad $$a^{-x} = \\frac{1}{a^x}$$ \\quad | \\quad $$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$$",
        "coreFormulaLatex": "$$a^x \\cdot a^y = a^{x+y}$$ \\quad | \\quad $$\\frac{a^x}{a^y} = a^{x-y}$$ \\quad | \\quad $$(a^x)^y = a^{x \\cdot y}$$ \\quad | \\quad $$a^{-x} = \\frac{1}{a^x}$$ \\quad | \\quad $$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$$",
        "key_takeaway": "W arkuszu maturalnym zadania z potęg (zazwyczaj Zadanie 1 lub 2 za 1 pkt) NIE polegają na mechanicznym wyliczaniu wielkich liczb. Egzaminator sprawdza, czy potrafisz sprowadzić różne podstawy do jednej wspólnej bazy (najczęściej $2$, $3$ lub $5$) i wykonać działania na wykładnikach. Podstawa potęgi pozostaje nienaruszona!",
        "keyTakeaway": "W arkuszu maturalnym zadania z potęg (zazwyczaj Zadanie 1 lub 2 za 1 pkt) NIE polegają na mechanicznym wyliczaniu wielkich liczb. Egzaminator sprawdza, czy potrafisz sprowadzić różne podstawy do jednej wspólnej bazy (najczęściej $2$, $3$ lub $5$) i wykonać działania na wykładnikach. Podstawa potęgi pozostaje nienaruszona!",
        "trap_alert": "Kardynalny błąd: mnożenie podstaw! Zapis $2^3 \\cdot 2^4 = 4^7$ to gwarantowane zero punktów. Podstawa się nie zmienia: $2^3 \\cdot 2^4 = 2^{3+4} = 2^7$.",
        "trapAlert": "Kardynalny błąd: mnożenie podstaw! Zapis $2^3 \\cdot 2^4 = 4^7$ to gwarantowane zero punktów. Podstawa się nie zmienia: $2^3 \\cdot 2^4 = 2^{3+4} = 2^7$."
      },
      "tasks": [
        {
          "id": "MAT-01-01-A",
          "source": "Matura Maj 2024 • Zadanie 2",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Liczba $\\left(\\frac{1}{16}\\right)^8 \\cdot 8^{16}$ jest równa:",
          "options": [
            { "id": "A", "text": "$2^{24}$" },
            { "id": "B", "text": "$2^{16}$" },
            { "id": "C", "text": "$2^{12}$" },
            { "id": "D", "text": "$2^8$" }
          ],
          "correct_answer": "B",
          "hint_1": "Sprowadź obie potęgi do wspólnej podstawy równej 2: zauważ, że $\\frac{1}{16} = 2^{-4}$ oraz $8 = 2^3$.",
          "hint_2": "Mamy $(2^{-4})^8 \\cdot (2^3)^{16} = 2^{-32} \\cdot 2^{48}$. Dodaj wykładniki.",
          "explanation": "Zapisujemy podstawy w postaci potęg liczby 2:\n$$\\left(\\frac{1}{16}\\right)^8 \\cdot 8^{16} = (2^{-4})^8 \\cdot (2^3)^{16} = 2^{-32} \\cdot 2^{48} = 2^{-32 + 48} = 2^{16}$$\nPoprawna odpowiedź to B."
        },
        {
          "id": "MAT-01-01-B",
          "source": "Matura Czerwiec 2024 • Zadanie 1",
          "type": "NUMERIC_INPUT",
          "points": 1,
          "difficulty": "EASY",
          "question": "Oblicz wartość wyrażenia $2^{-1} \\cdot 32^{\\frac{3}{5}}$. Wpisz wynik jako liczbę całkowitą:",
          "correct_answer": "4",
          "correctAnswer": "4",
          "input_placeholder": "Wpisz liczbę całkowitą...",
          "hint_1": "Zauważ, że $32 = 2^5$, zatem $32^{\\frac{3}{5}} = (2^5)^{\\frac{3}{5}} = 2^3$.",
          "hint_2": "Oblicz: $2^{-1} \\cdot 2^3 = 2^{-1+3} = 2^2$.",
          "explanation": "$$2^{-1} \\cdot 32^{\\frac{3}{5}} = 2^{-1} \\cdot (2^5)^{\\frac{3}{5}} = 2^{-1} \\cdot 2^3 = 2^2 = 4$$\nPrawidłowa odpowiedź to 4."
        },
        {
          "id": "MAT-01-01-C",
          "source": "Matura Czerwiec 2023 • Zadanie 2",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Dla każdej dodatniej liczby rzeczywistej $x$ iloczyn $\\sqrt{x} \\cdot \\sqrt[3]{x} \\cdot \\sqrt[6]{x}$ jest równy:",
          "options": [
            { "id": "A", "text": "$x$" },
            { "id": "B", "text": "$\\sqrt[10]{x}$" },
            { "id": "C", "text": "$\\sqrt[11]{x}$" },
            { "id": "D", "text": "$x^2$" }
          ],
          "correct_answer": "A",
          "hint_1": "Zamień pierwiastki na potęgi o wykładnikach ułamkowych: $x^{\\frac{1}{2}} \\cdot x^{\\frac{1}{3}} \\cdot x^{\\frac{1}{6}}$.",
          "hint_2": "Sprowadź wykładniki do wspólnego mianownika 6 i dodaj je: $\\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6}$.",
          "explanation": "$$\\sqrt{x} \\cdot \\sqrt[3]{x} \\cdot \\sqrt[6]{x} = x^{\\frac{1}{2}} \\cdot x^{\\frac{1}{3}} \\cdot x^{\\frac{1}{6}} = x^{\\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6}} = x^{\\frac{6}{6}} = x^1 = x$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-01-D",
          "source": "Matura Próbna Grudzień 2023 • Zadanie 1",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Wartość wyrażenia $\\left(3^{-2{,}4} \\cdot 3^{\\frac{2}{5}}\\right)^{\\frac{1}{2}}$ jest równa:",
          "options": [
            { "id": "A", "text": "$3^{-1}$" },
            { "id": "B", "text": "$3^0$" },
            { "id": "C", "text": "$3^{-2}$" },
            { "id": "D", "text": "$3^{\\frac{1}{2}}$" }
          ],
          "correct_answer": "A",
          "hint_1": "Zamień $-2{,}4$ na ułamek zwykły: $-2{,}4 = -\\frac{24}{10} = -\\frac{12}{5}$.",
          "hint_2": "Dodaj wykładniki w nawiasie: $-\\frac{12}{5} + \\frac{2}{5} = -\\frac{10}{5} = -2$. Następnie pomnóż przez $\\frac{1}{2}$.",
          "explanation": "$$-2{,}4 + \\frac{2}{5} = -\\frac{12}{5} + \\frac{2}{5} = -\\frac{10}{5} = -2$$\nZatem:\n$$\\left(3^{-2}\\right)^{\\frac{1}{2}} = 3^{-2 \\cdot \\frac{1}{2}} = 3^{-1} = \\frac{1}{3}$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-01-E",
          "source": "Matura Poprawkowa Sierpień 2024 • Zadanie 2",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Liczba $\\left(\\frac{4}{25}\\right)^{-0{,}5}$ jest równa:",
          "options": [
            { "id": "A", "text": "$0{,}04$" },
            { "id": "B", "text": "$0{,}8$" },
            { "id": "C", "text": "$2{,}5$" },
            { "id": "D", "text": "$0{,}4$" }
          ],
          "correct_answer": "C",
          "hint_1": "Wykładnik $-0{,}5 = -\\frac{1}{2}$. Znak minus odwraca ułamek do góry nogami: $\\left(\\frac{25}{4}\\right)^{0{,}5}$.",
          "hint_2": "Wykładnik $\\frac{1}{2}$ oznacza pierwiastek kwadratowy: $\\sqrt{\\frac{25}{4}}$.",
          "explanation": "$$\\left(\\frac{4}{25}\\right)^{-0{,}5} = \\left(\\frac{25}{4}\\right)^{\\frac{1}{2}} = \\sqrt{\\frac{25}{4}} = \\frac{5}{2} = 2{,}5$$\nPoprawna odpowiedź to C."
        },
        {
          "id": "MAT-01-01-F",
          "source": "Arkusz Pokazowy • Zadanie 1",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Liczba $2 \\cdot 16^4 \\cdot 8^{-3}$ jest równa:",
          "options": [
            { "id": "A", "text": "$2^8$" },
            { "id": "B", "text": "$2^9$" },
            { "id": "C", "text": "$2^6$" },
            { "id": "D", "text": "$2^4$" }
          ],
          "correct_answer": "A",
          "hint_1": "Zamień wszystkie czynniki na potęgi 2: $16 = 2^4$, $8 = 2^3$.",
          "hint_2": "$2^1 \\cdot (2^4)^4 \\cdot (2^3)^{-3} = 2^1 \\cdot 2^{16} \\cdot 2^{-9}$.",
          "explanation": "$$2^1 \\cdot (2^4)^4 \\cdot (2^3)^{-3} = 2^1 \\cdot 2^{16} \\cdot 2^{-9} = 2^{1 + 16 - 9} = 2^8$$\nPoprawna odpowiedź to A."
        }
      ]
    },
    {
      "id": "1.2",
      "slug": "pierwiastki-i-niewymiernosc",
      "title": "Pierwiastki i działania na liczbach niewymiernych",
      "order": 2,
      "estimated_time_minutes": 6,
      "estimated_time_formatted": "~6 min",
      "theory_pill": {
        "title": "Pierwiastki i działania na liczbach niewymiernych",
        "concept_essence": "Pierwiastkowanie to operacja odwrotna do potęgowania: $\\sqrt[n]{a} = b \\iff b^n = a$. Liczba niewymierna (np. $\\sqrt{2}, \\sqrt{3}$) to liczba, której nie da się przedstawić w postaci ułamka zwykłego – jej rozwinięcie dziesiętne jest nieskończone i nieokresowe.",
        "matura_context": "Na maturze rzadko spotkasz pierwiastki dające pełne liczby całkowite. Egzaminator bada Twoją biegłość w dwóch kluczowych manewrach: wyłączaniu czynnika przed znak pierwiastka (rozbijanie liczby na iloczyn z kwadratem: $4, 9, 16, 25$) oraz usuwaniu niewymierności z mianownika.",
        "core_formulas": [
          "\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}",
          "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}",
          "\\frac{a}{\\sqrt{b}-c} = \\frac{a(\\sqrt{b}+c)}{b-c^2}"
        ],
        "worked_example": {
          "problem": "Oblicz wartość wyrażenia: $\\frac{6}{\\sqrt{3}} - \\sqrt{12}$",
          "step_1": "Usuń niewymierność: $\\frac{6}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$.",
          "step_2": "Rozłóż pierwiastek: $\\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}$. Odejmij: $2\\sqrt{3} - 2\\sqrt{3} = 0$."
        },
        "exam_trap": "Nigdy nie dodawaj liczb pod pierwiastkami! Zapis $\\sqrt{9 + 16} = \\sqrt{9} + \\sqrt{16} = 3+4=7$ jest fałszywy. Prawidłowo: $\\sqrt{9+16} = \\sqrt{25} = 5$.",
        "core_formula": "$$\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$$ \\quad | \\quad $$\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$$ \\quad | \\quad $$\\frac{a}{\\sqrt{b}-c} = \\frac{a(\\sqrt{b}+c)}{b-c^2}$$",
        "coreFormulaLatex": "$$\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$$ \\quad | \\quad $$\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$$ \\quad | \\quad $$\\frac{a}{\\sqrt{b}-c} = \\frac{a(\\sqrt{b}+c)}{b-c^2}$$",
        "key_takeaway": "Na maturze rzadko spotkasz pierwiastki dające pełne liczby całkowite. Egzaminator bada Twoją biegłość w dwóch kluczowych manewrach: wyłączaniu czynnika przed znak pierwiastka (rozbijanie liczby na iloczyn z kwadratem: $4, 9, 16, 25$) oraz usuwaniu niewymierności z mianownika.",
        "keyTakeaway": "Na maturze rzadko spotkasz pierwiastki dające pełne liczby całkowite. Egzaminator bada Twoją biegłość w dwóch kluczowych manewrach: wyłączaniu czynnika przed znak pierwiastka (rozbijanie liczby na iloczyn z kwadratem: $4, 9, 16, 25$) oraz usuwaniu niewymierności z mianownika.",
        "trap_alert": "Nigdy nie dodawaj liczb pod pierwiastkami! Zapis $\\sqrt{9 + 16} = \\sqrt{9} + \\sqrt{16} = 3+4=7$ jest fałszywy. Prawidłowo: $\\sqrt{9+16} = \\sqrt{25} = 5$.",
        "trapAlert": "Nigdy nie dodawaj liczb pod pierwiastkami! Zapis $\\sqrt{9 + 16} = \\sqrt{9} + \\sqrt{16} = 3+4=7$ jest fałszywy. Prawidłowo: $\\sqrt{9+16} = \\sqrt{25} = 5$."
      },
      "tasks": [
        {
          "id": "MAT-01-02-A",
          "source": "Matura Maj 2023 • Zadanie 2",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Liczba $\\sqrt[3]{-\\frac{27}{16}} \\cdot \\sqrt[3]{2}$ jest równa:",
          "options": [
            { "id": "A", "text": "$-\\frac{3}{2}$" },
            { "id": "B", "text": "$\\frac{3}{2}$" },
            { "id": "C", "text": "$\\frac{2}{3}$" },
            { "id": "D", "text": "$-\\frac{2}{3}$" }
          ],
          "correct_answer": "A",
          "hint_1": "Połącz iloczyn pierwiastków tego samego stopnia pod jeden wspólny pierwiastek.",
          "hint_2": "$-\\frac{27}{16} \\cdot 2 = -\\frac{27}{8}$. Teraz wyciągnij pierwiastek sześcienny.",
          "explanation": "$$\\sqrt[3]{-\\frac{27}{16}} \\cdot \\sqrt[3]{2} = \\sqrt[3]{-\\frac{27}{16} \\cdot 2} = \\sqrt[3]{-\\frac{27}{8}} = -\\frac{\\sqrt[3]{27}}{\\sqrt[3]{8}} = -\\frac{3}{2}$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-02-B",
          "source": "Matura Czerwiec 2024 • Zadanie 3",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Wartość wyrażenia $(2\\sqrt{10} + \\sqrt{2})^2$ jest równa:",
          "options": [
            { "id": "A", "text": "$22$" },
            { "id": "B", "text": "$42$" },
            { "id": "C", "text": "$42 + 4\\sqrt{5}$" },
            { "id": "D", "text": "$42 + 8\\sqrt{5}$" }
          ],
          "correct_answer": "D",
          "hint_1": "Zastosuj wzór skróconego mnożenia: $(a+b)^2 = a^2 + 2ab + b^2$.",
          "hint_2": "$a^2 = (2\\sqrt{10})^2 = 4 \\cdot 10 = 40$. Środkowy składnik: $2 \\cdot 2\\sqrt{10} \\cdot \\sqrt{2} = 4\\sqrt{20} = 4 \\cdot 2\\sqrt{5} = 8\\sqrt{5}$.",
          "explanation": "$$(2\\sqrt{10} + \\sqrt{2})^2 = (2\\sqrt{10})^2 + 2 \\cdot 2\\sqrt{10} \\cdot \\sqrt{2} + (\\sqrt{2})^2 = 40 + 4\\sqrt{20} + 2 = 42 + 4 \\cdot 2\\sqrt{5} = 42 + 8\\sqrt{5}$$\nPoprawna odpowiedź to D."
        },
        {
          "id": "MAT-01-02-C",
          "source": "Matura Poprawkowa Sierpień 2023 • Zadanie 2",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Wartość wyrażenia $\\frac{6}{\\sqrt{3}} - \\sqrt{12}$ jest równa:",
          "options": [
            { "id": "A", "text": "$0$" },
            { "id": "B", "text": "$\\sqrt{3}$" },
            { "id": "C", "text": "$2\\sqrt{3}$" },
            { "id": "D", "text": "$4\\sqrt{3}$" }
          ],
          "correct_answer": "A",
          "hint_1": "Usuń niewymierność: $\\frac{6}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$.",
          "hint_2": "Rozpisz pierwiastek: $\\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}$. Odejmij oba wyrażenia.",
          "explanation": "$$\\frac{6}{\\sqrt{3}} - \\sqrt{12} = \\frac{6\\sqrt{3}}{3} - 2\\sqrt{3} = 2\\sqrt{3} - 2\\sqrt{3} = 0$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-02-D",
          "source": "Informator Maturalny • Zadanie 2",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Wartość wyrażenia $(\\sqrt{3} - \\sqrt{2})^2 + 2\\sqrt{6}$ jest równa:",
          "options": [
            { "id": "A", "text": "$1$" },
            { "id": "B", "text": "$5$" },
            { "id": "C", "text": "$5 + 4\\sqrt{6}$" },
            { "id": "D", "text": "$1 + 4\\sqrt{6}$" }
          ],
          "correct_answer": "B",
          "hint_1": "Zastosuj $(a-b)^2 = a^2 - 2ab + b^2$.",
          "hint_2": "$(\\sqrt{3})^2 - 2\\sqrt{6} + (\\sqrt{2})^2 = 3 - 2\\sqrt{6} + 2$. Zauważ redukcję z $+2\\sqrt{6}$.",
          "explanation": "$$(\\sqrt{3} - \\sqrt{2})^2 + 2\\sqrt{6} = 3 - 2\\sqrt{6} + 2 + 2\\sqrt{6} = 5$$\nPoprawna odpowiedź to B."
        },
        {
          "id": "MAT-01-02-E",
          "source": "Matura Maj 2024 (Termin dodatkowy) • Zadanie 2",
          "type": "TRUE_FALSE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Oceń prawdziwość podanych zdań dotyczących liczb niewymiernych. Zaznacz P (Prawda) lub F (Fałsz) dla każdego zdania:",
          "correct_answer": "P,F",
          "correctAnswer": "P,F",
          "statements": [
            {
              "id": "S1",
              "text": "Wartość wyrażenia $\\sqrt{50} - \\sqrt{18} + \\sqrt{8}$ jest równa $4\\sqrt{2}$.",
              "correct": "P"
            },
            {
              "id": "S2",
              "text": "Liczba $\\sqrt{50}$ jest mniejsza od $7$.",
              "correct": "F"
            }
          ],
          "hint_1": "Wyłącz czynnik przed znak pierwiastka z każdej liczby: $\\sqrt{50} = 5\\sqrt{2}$, $\\sqrt{18} = 3\\sqrt{2}$, $\\sqrt{8} = 2\\sqrt{2}$.",
          "hint_2": "Dla zdania 2: zauważ, że $7 = \\sqrt{49}$, więc $\\sqrt{50} > 7$.",
          "explanation": "Zdanie 1: $$\\sqrt{50} - \\sqrt{18} + \\sqrt{8} = 5\\sqrt{2} - 3\\sqrt{2} + 2\\sqrt{2} = 4\\sqrt{2}$$ (Prawda).\nZdanie 2: Ponieważ $7 = \\sqrt{49}$ oraz $50 > 49$, to $\\sqrt{50} > 7$, zatem zdanie jest fałszywe (Fałsz).\nPoprawna odpowiedź to: 1. Prawda (P), 2. Fałsz (F)."
        }
      ]
    },
    {
      "id": "1.3",
      "slug": "logarytmy-od-podstaw",
      "title": "Logarytmy od podstaw do pewniaków",
      "order": 3,
      "estimated_time_minutes": 6,
      "estimated_time_formatted": "~6 min",
      "theory_pill": {
        "title": "Logarytmy od podstaw do pewniaków",
        "concept_essence": "Logarytm $\\log_a b = c$ odpowiada na elementarne pytanie: „Do jakiej potęgi $c$ muszę podnieść podstawę $a$, aby otrzymać liczbę $b$?”. Logarytm to po prostu wykładnik potęgi ukryty w innej notacji ($a^c = b$).",
        "matura_context": "Zadanie z logarytmów pojawia się w KAŻDYM arkuszu maturalnym za 1 pkt. Egzaminator sprawdza albo bezpośrednie zastosowanie definicji (np. $\\log_{\\sqrt{3}} 9 = 4$), albo zamianę sumy/różnicy logarytmów o tej samej podstawie na logarytm iloczynu lub ilorazu.",
        "core_formulas": [
          "\\log_a b = c \\iff a^c = b",
          "\\log_a x + \\log_a y = \\log_a(x \\cdot y)",
          "\\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)",
          "k \\cdot \\log_a x = \\log_a(x^k)"
        ],
        "worked_example": {
          "problem": "Oblicz wartość: $\\log_2 96 - \\log_2 3$",
          "step_1": "Różnica logarytmów to logarytm ilorazu: $\\log_2\\left(\\frac{96}{3}\\right)$.",
          "step_2": "Dzielisz liczby: $\\frac{96}{3} = 32$. Z definicji: $2^? = 32 \\implies 5$. Wynik to $5$."
        },
        "exam_trap": "Zasada sumy działa na całych logarytmach, a nie w środku! $\\log(x+y) \\neq \\log x + \\log y$. Dodawanie logarytmów zamienia się na MNOŻENIE liczb logarytmowanych.",
        "core_formula": "$$\\log_a b = c \\iff a^c = b$$ \\quad | \\quad $$\\log_a x + \\log_a y = \\log_a(x \\cdot y)$$ \\quad | \\quad $$\\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)$$ \\quad | \\quad $$k \\cdot \\log_a x = \\log_a(x^k)$$",
        "coreFormulaLatex": "$$\\log_a b = c \\iff a^c = b$$ \\quad | \\quad $$\\log_a x + \\log_a y = \\log_a(x \\cdot y)$$ \\quad | \\quad $$\\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)$$ \\quad | \\quad $$k \\cdot \\log_a x = \\log_a(x^k)$$",
        "key_takeaway": "Zadanie z logarytmów pojawia się w KAŻDYM arkuszu maturalnym za 1 pkt. Egzaminator sprawdza albo bezpośrednie zastosowanie definicji (np. $\\log_{\\sqrt{3}} 9 = 4$), albo zamianę sumy/różnicy logarytmów o tej samej podstawie na logarytm iloczynu lub ilorazu.",
        "keyTakeaway": "Zadanie z logarytmów pojawia się w KAŻDYM arkuszu maturalnym za 1 pkt. Egzaminator sprawdza albo bezpośrednie zastosowanie definicji (np. $\\log_{\\sqrt{3}} 9 = 4$), albo zamianę sumy/różnicy logarytmów o tej samej podstawie na logarytm iloczynu lub ilorazu.",
        "trap_alert": "Zasada sumy działa na całych logarytmach, a nie w środku! $\\log(x+y) \\neq \\log x + \\log y$. Dodawanie logarytmów zamienia się na MNOŻENIE liczb logarytmowanych.",
        "trapAlert": "Zasada sumy działa na całych logarytmach, a nie w środku! $\\log(x+y) \\neq \\log x + \\log y$. Dodawanie logarytmów zamienia się na MNOŻENIE liczb logarytmowanych."
      },
      "tasks": [
        {
          "id": "MAT-01-03-A",
          "source": "Matura Maj 2024 • Zadanie 4",
          "type": "NUMERIC_INPUT",
          "points": 1,
          "difficulty": "EASY",
          "question": "Oblicz wartość wyrażenia $\\log_{\\sqrt{3}} 9$. Wpisz wynik jako liczbę całkowitą:",
          "correct_answer": "4",
          "correctAnswer": "4",
          "input_placeholder": "Wpisz liczbę całkowitą...",
          "hint_1": "Zastosuj definicję logarytmu: $(\\sqrt{3})^c = 9$.",
          "hint_2": "Przejdź na potęgi trójki: $(3^{\\frac{1}{2}})^c = 3^2 \\implies 3^{\\frac{c}{2}} = 3^2$.",
          "explanation": "$$(\\sqrt{3})^c = 9 \\implies 3^{\\frac{c}{2}} = 3^2 \\implies \\frac{c}{2} = 2 \\implies c = 4$$\nPoprawny wynik to 4."
        },
        {
          "id": "MAT-01-03-B",
          "source": "Matura Maj 2023 • Zadanie 4",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Liczba $\\log_9 27 + \\log_9 3$ jest równa:",
          "options": [
            { "id": "A", "text": "$81$" },
            { "id": "B", "text": "$9$" },
            { "id": "C", "text": "$4$" },
            { "id": "D", "text": "$2$" }
          ],
          "correct_answer": "D",
          "hint_1": "Suma logarytmów o tej samej podstawie to logarytm iloczynu: $\\log_9(27 \\cdot 3)$.",
          "hint_2": "Oblicz $27 \\cdot 3 = 81$. Do jakiej potęgi podnieść 9, aby otrzymać 81?",
          "explanation": "Stosujemy wzór na sumę logarytmów o tej samej podstawie:\n$$\\log_9 27 + \\log_9 3 = \\log_9(27 \\cdot 3) = \\log_9 81$$\nPonieważ $9^2 = 81$, otrzymujemy wynik $2$.\nPoprawna odpowiedź to D."
        },
        {
          "id": "MAT-01-03-C",
          "source": "Matura Czerwiec 2024 • Zadanie 2",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Liczba $\\log_3\\left(\\frac{3}{2}\\right) + \\log_3\\left(\\frac{2}{9}\\right)$ jest równa:",
          "options": [
            { "id": "A", "text": "$\\log_3\\left(\\frac{31}{18}\\right)$" },
            { "id": "B", "text": "$\\log_3\\left(\\frac{5}{11}\\right)$" },
            { "id": "C", "text": "$-1$" },
            { "id": "D", "text": "$\\frac{1}{3}$" }
          ],
          "correct_answer": "C",
          "hint_1": "Zastosuj wzór na sumę logarytmów: $\\log_3\\left(\\frac{3}{2} \\cdot \\frac{2}{9}\\right)$.",
          "hint_2": "Uprość ułamek wewnątrz: $\\frac{3 \\cdot 2}{2 \\cdot 9} = \\frac{3}{9} = \\frac{1}{3}$. Zauważ, że $\\frac{1}{3} = 3^{-1}$.",
          "explanation": "$$\\log_3\\left(\\frac{3}{2}\\right) + \\log_3\\left(\\frac{2}{9}\\right) = \\log_3\\left(\\frac{3}{2} \\cdot \\frac{2}{9}\\right) = \\log_3\\left(\\frac{1}{3}\\right) = \\log_3(3^{-1}) = -1$$\nPoprawna odpowiedź to C."
        },
        {
          "id": "MAT-01-03-D",
          "source": "Matura Próbna Grudzień 2023 • Zadanie 2",
          "type": "TWO_PART",
          "points": 1,
          "difficulty": "EASY",
          "question": "Dokończ zdanie. Wybierz odpowiedź A albo B oraz jej uzasadnienie 1., 2. albo 3.\n\nLiczba $\\log_2 96 - \\log_2 3$ jest:",
          "correct_answer": "A2",
          "correctAnswer": "A2",
          "part_1": {
            "prompt": "Wybierz wartość:",
            "options": [
              { "id": "A", "text": "równa $5$" },
              { "id": "B", "text": "równa $32$" }
            ]
          },
          "part_2": {
            "prompt": "ponieważ:",
            "options": [
              { "id": "1", "text": "$96 - 3 = 93$" },
              { "id": "2", "text": "$\\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)$ oraz $2^5 = 32$" },
              { "id": "3", "text": "$\\frac{96}{3} = 32$, a $32 = 2 \\cdot 16$" }
            ]
          },
          "hint_1": "Różnica logarytmów to logarytm ilorazu: $\\log_2\\left(\\frac{96}{3}\\right)$.",
          "hint_2": "Podziel $96 : 3 = 32$. Sprawdź, do jakiej potęgi trzeba podnieść 2, aby uzyskać 32.",
          "explanation": "$$\\log_2 96 - \\log_2 3 = \\log_2\\left(\\frac{96}{3}\\right) = \\log_2 32 = 5 \\quad (\\text{gdyż } 2^5 = 32)$$\nPrawidłowy wybór to A (równa 5) oraz uzasadnienie 2."
        },
        {
          "id": "MAT-01-03-E",
          "source": "Matura Próbna Grudzień 2024 • Zadanie 4",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Dla każdej dodatniej liczby $x$ i dodatniej liczby $y$ wartość wyrażenia $\\log_7 x + 6\\log_7 y$ jest równa:",
          "options": [
            { "id": "A", "text": "$\\log_7\\left(\\frac{x}{y^6}\\right)$" },
            { "id": "B", "text": "$\\log_7(xy)^6$" },
            { "id": "C", "text": "$\\log_7(6xy)$" },
            { "id": "D", "text": "$\\log_7(x \\cdot y^6)$" }
          ],
          "correct_answer": "D",
          "hint_1": "Wciągnij liczbę 6 do wykładnika liczby logarytmowanej: $6\\log_7 y = \\log_7(y^6)$.",
          "hint_2": "Następnie zastosuj wzór na sumę logarytmów: $\\log_7 x + \\log_7(y^6) = \\log_7(x \\cdot y^6)$.",
          "explanation": "$$\\log_7 x + 6\\log_7 y = \\log_7 x + \\log_7(y^6) = \\log_7(x \\cdot y^6)$$\nPoprawna odpowiedź to D."
        }
      ]
    },
    {
      "id": "1.4",
      "slug": "procenty-i-punkty-procentowe",
      "title": "Procenty, punkty procentowe i obliczenia finansowe",
      "order": 4,
      "estimated_time_minutes": 7,
      "estimated_time_formatted": "~7 min",
      "theory_pill": {
        "title": "Procenty, punkty procentowe i finanse",
        "concept_essence": "Procent to ułamek o stałym mianowniku $100$ ($1\\% = 0{,}01$). Podwyżka o $p\\%$ to pomnożenie przez współczynnik $(1 + p)$, a obniżka to mnożenie przez $(1 - p)$. Punkt procentowy (p.p.) to bezwzględna arytmetyczna różnica między dwiema wielkościami procentowymi.",
        "matura_context": "W zadaniach finansowych egzaminator najchętniej sprawdza wielokrotne zmiany cen (np. dwie kolejne obniżki) oraz procent składany na lokatach bankowych. Kluczem jest mnożenie współczynników zmian, a nie ich proste dodawanie.",
        "core_formulas": [
          "K_n = K_0 \\cdot (1 + p)^n",
          "C_{\\text{po obniżce}} = C_0 \\cdot (1 - p)",
          "\\text{Różnica w p.p.} = p_2 - p_1"
        ],
        "worked_example": {
          "problem": "Cenę towaru $200\\text{ zł}$ obniżono o $20\\%$, a potem o $10\\%$. Jaka jest cena końcowa?",
          "step_1": "Mnożysz współczynniki: $0{,}80 \\cdot 0{,}90 = 0{,}72$ (łączny spadek o $28\\%$, a NIE o $30\\%!).",
          "step_2": "Obliczasz cenę: $200 \\cdot 0{,}72 = 144\\text{ zł}$."
        },
        "exam_trap": "Mylenie procentów z punktami procentowymi. Jeśli oprocentowanie wzrosło z $20\\%$ do $25\\%$, to wzrosło o $5\\text{ p.p.}$, ale relatywny wzrost wyniósł $\\frac{5}{20} = 25\\%$!",
        "core_formula": "$$K_n = K_0 \\cdot (1 + p)^n$$ \\quad | \\quad $$C_{\\text{po obniżce}} = C_0 \\cdot (1 - p)$$ \\quad | \\quad $$\\text{Różnica w p.p.} = p_2 - p_1$$",
        "coreFormulaLatex": "$$K_n = K_0 \\cdot (1 + p)^n$$ \\quad | \\quad $$C_{\\text{po obniżce}} = C_0 \\cdot (1 - p)$$ \\quad | \\quad $$\\text{Różnica w p.p.} = p_2 - p_1$$",
        "key_takeaway": "W zadaniach finansowych egzaminator najchętniej sprawdza wielokrotne zmiany cen (np. dwie kolejne obniżki) oraz procent składany na lokatach bankowych. Kluczem jest mnożenie współczynników zmian, a nie ich proste dodawanie.",
        "keyTakeaway": "W zadaniach finansowych egzaminator najchętniej sprawdza wielokrotne zmiany cen (np. dwie kolejne obniżki) oraz procent składany na lokatach bankowych. Kluczem jest mnożenie współczynników zmian, a nie ich proste dodawanie.",
        "trap_alert": "Mylenie procentów z punktami procentowymi. Jeśli oprocentowanie wzrosło z $20\\%$ do $25\\%$, to wzrosło o $5\\text{ p.p.}$, ale relatywny wzrost wyniósł $\\frac{5}{20} = 25\\%$!",
        "trapAlert": "Mylenie procentów z punktami procentowymi. Jeśli oprocentowanie wzrosło z $20\\%$ do $25\\%$, to wzrosło o $5\\text{ p.p.}$, ale relatywny wzrost wyniósł $\\frac{5}{20} = 25\\%$!"
      },
      "tasks": [
        {
          "id": "MAT-01-04-A",
          "source": "Matura Próbna Grudzień 2023 • Zadanie 3",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Pan Grzegorz wpłacił kwotę $K$ na dwuletnią lokatę z roczną kapitalizacją odsetek i oprocentowaniem $5\\%$ w skali roku. Po dwóch latach odebrał $4851\\text{ zł}$. Kwota $K$ wpłacona przez pana Grzegorza była równa:",
          "options": [
            { "id": "A", "text": "$4200\\text{ zł}$" },
            { "id": "B", "text": "$4400\\text{ zł}$" },
            { "id": "C", "text": "$4500\\text{ zł}$" },
            { "id": "D", "text": "$4600\\text{ zł}$" }
          ],
          "correct_answer": "B",
          "hint_1": "Zastosuj wzór na procent składany: $K_2 = K \\cdot (1 + 0{,}05)^2 = K \\cdot (1{,}05)^2$.",
          "hint_2": "$1{,}05^2 = 1{,}1025$. Rozwiąż równanie: $K \\cdot 1{,}1025 = 4851$.",
          "explanation": "$$K \\cdot (1{,}05)^2 = 4851 \\implies K \\cdot 1{,}1025 = 4851 \\implies K = \\frac{4851}{1{,}1025} = 4400\\text{ zł}$$\nPoprawna odpowiedź to B."
        },
        {
          "id": "MAT-01-04-B",
          "source": "Matura Czerwiec 2024 • Zadanie 4",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Klient wpłacił do banku na trzyletnią lokatę kwotę $K_0\\text{ zł}$. Po każdym rocznym okresie bank dolicza odsetki w wysokości $6\\%$ od kwoty bieżącego kapitału. Po 3 latach kwota na lokacie jest równa:",
          "options": [
            { "id": "A", "text": "$K_0 \\cdot (1{,}06)^3$" },
            { "id": "B", "text": "$K_0 \\cdot (1{,}18)$" },
            { "id": "C", "text": "$K_0 \\cdot (0{,}94)^3$" },
            { "id": "D", "text": "$K_0 + 3 \\cdot 0{,}06$" }
          ],
          "correct_answer": "A",
          "hint_1": "Oprocentowanie 6% oznacza mnożenie kapitału co roku przez $(1 + 0{,}06) = 1{,}06$.",
          "hint_2": "Po trzech latach operację powtarzamy trzykrotnie, stąd potęga 3.",
          "explanation": "Zgodnie ze wzorem na procent składany kwota po $n=3$ latach wynosi:\n$$K_3 = K_0 \\cdot (1 + 0{,}06)^3 = K_0 \\cdot (1{,}06)^3$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-04-C",
          "source": "Matura Maj 2023 • Zadanie 1",
          "type": "NUMERIC_INPUT",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Cenę pewnego towaru wynoszącą $200\\text{ zł}$ obniżono najpierw o $20\\%$, a następnie nową cenę obniżono o kolejne $10\\%$. Oblicz końcową cenę tego towaru w złotych. Wpisz liczbę:",
          "correct_answer": "144",
          "correctAnswer": "144",
          "input_placeholder": "Wpisz cenę w zł...",
          "hint_1": "Cena po pierwszej obniżce wynosi $0{,}80 \\cdot 200 = 160\\text{ zł}$.",
          "hint_2": "Cena po drugiej obniżce wynosi $0{,}90 \\cdot 160 = 144\\text{ zł}$.",
          "explanation": "Cena po pierwszej obniżce: $200 \\cdot (1 - 0{,}20) = 200 \\cdot 0{,}80 = 160\\text{ zł}$.\nCena po drugiej obniżce: $160 \\cdot (1 - 0{,}10) = 160 \\cdot 0{,}90 = 144\\text{ zł}$.\nKońcowa cena wynosi 144 zł."
        },
        {
          "id": "MAT-01-04-D",
          "source": "Informator Maturalny • Zadanie 5",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Poparcie dla kandydata w sondażu wzrosło z $20\\%$ do $25\\%$. Oznacza to, że poparcie wzrosło o:",
          "options": [
            { "id": "A", "text": "$5\\text{ p.p. oraz o } 25\\%$" },
            { "id": "B", "text": "$5\\text{ p.p. oraz o } 5\\%$" },
            { "id": "C", "text": "$25\\text{ p.p. oraz o } 20\\%$" },
            { "id": "D", "text": "$5\\text{ p.p. oraz o } 20\\%$" }
          ],
          "correct_answer": "A",
          "hint_1": "Różnica bezwzględna w punktach procentowych: $25 - 20 = 5\\text{ p.p.}$.",
          "hint_2": "Względny wzrost procentowy: $\\frac{25 - 20}{20} = \\frac{5}{20} = 0{,}25 = 25\\%$.",
          "explanation": "Wzrost w punktach procentowych wynosi $25\\% - 20\\% = 5\\text{ p.p.}$.\nWzrost procentowy liczony w odniesieniu do wartości bazowej wynosi:\n$$\\frac{25 - 20}{20} \\cdot 100\\% = \\frac{5}{20} \\cdot 100\\% = 25\\%$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-04-E",
          "source": "Matura Maj 2024 • Zadanie 5",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Cena netto pewnego towaru wynosi $150\\text{ zł}$. Do ceny netto doliczany jest podatek VAT w wysokości $23\\%$. Cena brutto tego towaru jest równa:",
          "options": [
            { "id": "A", "text": "$184{,}50\\text{ zł}$" },
            { "id": "B", "text": "$173\\text{ zł}$" },
            { "id": "C", "text": "$194{,}50\\text{ zł}$" },
            { "id": "D", "text": "$180\\text{ zł}$" }
          ],
          "correct_answer": "A",
          "hint_1": "Cena brutto to $100\\% + 23\\% = 123\\%$ ceny netto.",
          "hint_2": "Oblicz $150 \\cdot 1{,}23 = 184{,}50\\text{ zł}$.",
          "explanation": "Cena brutto wynosi:\n$$150 \\cdot (1 + 0{,}23) = 150 \\cdot 1{,}23 = 184{,}50\\text{ zł}$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-04-F",
          "source": "Matura Poprawkowa Sierpień 2023 • Zadanie 4",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Cenę pewnego towaru podwyższono dwukrotnie o $10\\%$. Po tych dwóch podwyżkach towar kosztuje $242\\text{ zł}$. Cena początkowa tego towaru wynosiła:",
          "options": [
            { "id": "A", "text": "$200\\text{ zł}$" },
            { "id": "B", "text": "$220\\text{ zł}$" },
            { "id": "C", "text": "$198\\text{ zł}$" },
            { "id": "D", "text": "$205\\text{ zł}$" }
          ],
          "correct_answer": "A",
          "hint_1": "Dwie podwyżki o 10% to mnożenie przez $1{,}10 \\cdot 1{,}10 = 1{,}21$.",
          "hint_2": "Rozwiąż równanie: $C \\cdot 1{,}21 = 242$.",
          "explanation": "$$C \\cdot (1{,}10)^2 = 242 \\implies C \\cdot 1{,}21 = 242 \\implies C = \\frac{242}{1{,}21} = 200\\text{ zł}$$\nPoprawna odpowiedź to A."
        }
      ]
    },
    {
      "id": "1.5",
      "slug": "wartosc-bezwzgledna-i-przedzialy",
      "title": "Wartość bezwzględna i przedziały liczbowe",
      "order": 5,
      "estimated_time_minutes": 6,
      "estimated_time_formatted": "~6 min",
      "theory_pill": {
        "title": "Wartość bezwzględna i przedziały liczbowe",
        "concept_essence": "Wartość bezwzględna $|x|$ to geometryczna odległość liczby $x$ od zera na osi liczbowej. Wyrażenie $|x - a|$ oznacza odległość między liczbami $x$ oraz $a$. Odległość nigdy nie może być ujemna ($|x| \\ge 0$).",
        "matura_context": "Egzaminator testuje interpretację geometryczną nierówności: $|x - a| \\le r$ to zbiór liczb odległych od środka $a$ o co najwyżej promień $r$ (przedział domknięty $\\langle a-r, a+r \\rangle$). Drugi typ zadań to opuszczanie modułu dla zadanego przedziału liczbowego ze zmianą znaku.",
        "core_formulas": [
          "|x - a| \\le r \\iff x \\in \\langle a-r, a+r \\rangle",
          "|x - a| \\ge r \\iff x \\in (-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)",
          "\\text{Środek } a = \\frac{x_1 + x_2}{2}, \\quad \\text{Promień } r = \\frac{x_2 - x_1}{2}"
        ],
        "worked_example": {
          "problem": "Zapisz przedział $\\langle -2, 4 \\rangle$ w postaci nierówności z modułem.",
          "step_1": "Wyznacz środek: $a = \\frac{-2 + 4}{2} = 1$. Wyznacz promień: $r = \\frac{4 - (-2)}{2} = 3$.",
          "step_2": "Zapisz nierówność: $|x - 1| \\le 3$."
        },
        "exam_trap": "Znak w środku modułu przy ujemnym środku: odległość od liczby ujemnej $-3$ to $|x - (-3)| = |x + 3|$. Widząc $|x + 3| \\le 2$, środkiem jest $-3$, a nie $+3$!",
        "core_formula": "$$|x - a| \\le r \\iff x \\in \\langle a-r, a+r \\rangle$$ \\quad | \\quad $$|x - a| \\ge r \\iff x \\in (-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)$$ \\quad | \\quad $$\\text{Środek } a = \\frac{x_1 + x_2}{2}, \\quad \\text{Promień } r = \\frac{x_2 - x_1}{2}$$",
        "coreFormulaLatex": "$$|x - a| \\le r \\iff x \\in \\langle a-r, a+r \\rangle$$ \\quad | \\quad $$|x - a| \\ge r \\iff x \\in (-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)$$ \\quad | \\quad $$\\text{Środek } a = \\frac{x_1 + x_2}{2}, \\quad \\text{Promień } r = \\frac{x_2 - x_1}{2}$$",
        "key_takeaway": "Egzaminator testuje interpretację geometryczną nierówności: $|x - a| \\le r$ to zbiór liczb odległych od środka $a$ o co najwyżej promień $r$ (przedział domknięty $\\langle a-r, a+r \\rangle$). Drugi typ zadań to opuszczanie modułu dla zadanego przedziału liczbowego ze zmianą znaku.",
        "keyTakeaway": "Egzaminator testuje interpretację geometryczną nierówności: $|x - a| \\le r$ to zbiór liczb odległych od środka $a$ o co najwyżej promień $r$ (przedział domknięty $\\langle a-r, a+r \\rangle$). Drugi typ zadań to opuszczanie modułu dla zadanego przedziału liczbowego ze zmianą znaku.",
        "trap_alert": "Znak w środku modułu przy ujemnym środku: odległość od liczby ujemnej $-3$ to $|x - (-3)| = |x + 3|$. Widząc $|x + 3| \\le 2$, środkiem jest $-3$, a nie $+3$!",
        "trapAlert": "Znak w środku modułu przy ujemnym środku: odległość od liczby ujemnej $-3$ to $|x - (-3)| = |x + 3|$. Widząc $|x + 3| \\le 2$, środkiem jest $-3$, a nie $+3$!"
      },
      "tasks": [
        {
          "id": "MAT-01-05-A",
          "source": "Matura Maj 2024 • Zadanie 1",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Zbiorem wszystkich rozwiązań nierówności $|x - 1| \\ge 3$ jest zbiór:",
          "options": [
            { "id": "A", "text": "$(-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$" },
            { "id": "B", "text": "$\\langle -2, 4 \\rangle$" },
            { "id": "C", "text": "$(-\\infty, -4\\rangle \\cup \\langle 2, +\\infty)$" },
            { "id": "D", "text": "$\\langle -4, 2 \\rangle$" }
          ],
          "correct_answer": "A",
          "hint_1": "Szukamy liczb odległych od punktu 1 o co najmniej 3 jednostki na osi liczbowej.",
          "hint_2": "W lewo od 1: $1 - 3 = -2$. W prawo od 1: $1 + 3 = 4$. Znak $\\ge$ oznacza przedziały na zewnątrz domknięte.",
          "explanation": "$$|x - 1| \\ge 3 \\iff x - 1 \\le -3 \\lor x - 1 \\ge 3 \\iff x \\le -2 \\lor x \\ge 4$$\nZatem $x \\in (-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$.\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-05-B",
          "source": "Matura Próbna Grudzień 2024 • Zadanie 1",
          "type": "NUMERIC_INPUT",
          "points": 1,
          "difficulty": "EASY",
          "question": "Liczby $x_1$ i $x_2$ są różnymi rozwiązaniami równania $|x + 2| = 5$. Oblicz sumę $x_1 + x_2$. Wpisz wynik jako liczbę całkowitą:",
          "correct_answer": "-4",
          "correctAnswer": "-4",
          "input_placeholder": "Wpisz liczbę całkowitą...",
          "hint_1": "Rozbij równanie na dwa przypadki: $x + 2 = 5$ lub $x + 2 = -5$.",
          "hint_2": "Otrzymujesz $x_1 = 3$ oraz $x_2 = -7$. Oblicz ich sumę: $3 + (-7)$.",
          "explanation": "$$|x + 2| = 5 \\implies x + 2 = 5 \\lor x + 2 = -5 \\implies x_1 = 3 \\lor x_2 = -7$$\nSuma rozwiązań:\n$$x_1 + x_2 = 3 + (-7) = -4$$\nPoprawny wynik to -4."
        },
        {
          "id": "MAT-01-05-C",
          "source": "Matura Poprawkowa Sierpień 2024 • Zadanie 1",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Liczba wszystkich całkowitych rozwiązań nierówności $|x + 1| < 3$ jest równa:",
          "options": [
            { "id": "A", "text": "$2$" },
            { "id": "B", "text": "$3$" },
            { "id": "C", "text": "$5$" },
            { "id": "D", "text": "$7$" }
          ],
          "correct_answer": "C",
          "hint_1": "Rozwiąż nierówność podwójną: $-3 < x + 1 < 3$.",
          "hint_2": "Odejmij 1 od wszystkich stron: $-4 < x < 2$. Wypisz liczby całkowite z tego przedziału: $-3, -2, -1, 0, 1$.",
          "explanation": "$$|x + 1| < 3 \\iff -3 < x + 1 < 3 \\iff -4 < x < 2$$\nRozwiązaniami całkowitymi są: $\\{-3, -2, -1, 0, 1\\}$. Jest ich dokładnie 5.\nPoprawna odpowiedź to C."
        },
        {
          "id": "MAT-01-05-D",
          "source": "Matura Czerwiec 2023 • Zadanie 1",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Wszystkich liczb całkowitych dodatnich spełniających nierówność $|x + 5| < 15$ jest:",
          "options": [
            { "id": "A", "text": "$9$" },
            { "id": "B", "text": "$10$" },
            { "id": "C", "text": "$20$" },
            { "id": "D", "text": "$29$" }
          ],
          "correct_answer": "A",
          "hint_1": "Rozwiąż: $-15 < x + 5 < 15 \\implies -20 < x < 10$.",
          "hint_2": "Zwróć uwagę na słowo: 'dodatnich' ($x > 0$). Wypisz: $1, 2, 3, \\dots, 9$.",
          "explanation": "$$-15 < x + 5 < 15 \\implies -20 < x < 10$$\nLiczby całkowite dodatnie to liczby naturalne większe od zera: $\\{1, 2, 3, 4, 5, 6, 7, 8, 9\\}$. Jest ich 9.\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-05-E",
          "source": "Matura Maj 2023 • Zadanie 1",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Na osi liczbowej zaznaczono sumę przedziałów $(-\\infty, 1\\rangle \\cup \\langle 4, +\\infty)$. Zbiór ten jest zbiorem wszystkich rozwiązań nierówności:",
          "options": [
            { "id": "A", "text": "$|x - 2{,}5| \\ge 1{,}5$" },
            { "id": "B", "text": "$|x - 2{,}5| \\le 1{,}5$" },
            { "id": "C", "text": "$|x - 1{,}5| \\ge 2{,}5$" },
            { "id": "D", "text": "$|x - 1{,}5| \\le 2{,}5$" }
          ],
          "correct_answer": "A",
          "hint_1": "Wyznacz środek przedziału: $a = \\frac{1 + 4}{2} = 2{,}5$.",
          "hint_2": "Wyznacz promień: $r = \\frac{4 - 1}{2} = 1{,}5$. Przedziały zewnętrzne oznaczają znak $\\ge$.",
          "explanation": "Środek symetrii obu przedziałów to $a = \\frac{1 + 4}{2} = 2{,}5$.\nOdległość od środka do końców przedziałów to $r = 4 - 2{,}5 = 1{,}5$.\nPonieważ punkty leżą na zewnątrz, nierówność ma postać $|x - 2{,}5| \\ge 1{,}5$.\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-05-F",
          "source": "Informator Maturalny • Zadanie 6",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "HARD",
          "question": "Dla liczby $x \\in (-2, 3)$ wartość wyrażenia $|x - 3| - |x + 2|$ jest równa:",
          "options": [
            { "id": "A", "text": "$1 - 2x$" },
            { "id": "B", "text": "$5$" },
            { "id": "C", "text": "$2x - 1$" },
            { "id": "D", "text": "$-5$" }
          ],
          "correct_answer": "A",
          "hint_1": "Sprawdź znaki wyrażeń pod wartością bezwzględną dla $x \\in (-2, 3)$.",
          "hint_2": "Dla $x < 3$ mamy $x - 3 < 0$, więc $|x - 3| = -(x - 3) = 3 - x$. Dla $x > -2$ mamy $x + 2 > 0$, więc $|x + 2| = x + 2$.",
          "explanation": "Dla $x \\in (-2, 3)$:\n$$|x - 3| = -(x - 3) = 3 - x$$\n$$|x + 2| = x + 2$$\nOdejmując otrzymujemy:\n$$(3 - x) - (x + 2) = 3 - x - x - 2 = 1 - 2x$$\nPoprawna odpowiedź to A."
        }
      ]
    },
    {
      "id": "1.6",
      "slug": "blad-bezwzgledny-i-wzgledny",
      "title": "Błąd bezwzględny, względny i szacowanie",
      "order": 6,
      "estimated_time_minutes": 6,
      "estimated_time_formatted": "~6 min",
      "theory_pill": {
        "title": "Błąd bezwzględny, względny i szacowanie",
        "concept_essence": "Błąd bezwzględny $\\Delta = |x - a|$ mierzy wprost wielkość pomyłki w tych samych jednostkach co pomiar. Błąd względny $\\delta = \\frac{|x - a|}{x}$ odnosi tę pomyłkę do wartości rzeczywistej, określając jakość pomiaru niezależnie od skali.",
        "matura_context": "Pewniak maturalny za 1 pkt. Zadanie polega na obliczeniu błędu względnego wyrażonego w procentach. Kluczem jest poprawna identyfikacja, która liczba w treści jest wartością dokładną $x$, a która przybliżoną $a$.",
        "core_formulas": [
          "\\Delta_x = |x - a| \\quad (\\text{błąd bezwzględny})",
          "\\delta_x = \\frac{|x - a|}{x} \\quad (\\text{błąd względny})",
          "\\delta_{\\%} = \\frac{|x - a|}{x} \\cdot 100\\% \\quad (\\text{błąd procentowy})"
        ],
        "worked_example": {
          "problem": "Liczbę dokładną $x = 12{,}5$ przybliżono jako $a = 12$. Oblicz błąd procentowy.",
          "step_1": "Oblicz błąd bezwzględny: $\\Delta = |12{,}5 - 12| = 0{,}5$.",
          "step_2": "Podziel przez wartość dokładną: $\\delta_{\\%} = \\frac{0{,}5}{12{,}5} \\cdot 100\\% = \\frac{1}{25} \\cdot 100\\% = 4\\%$."
        },
        "exam_trap": "Dzielenie przez przybliżenie! Postawienie w mianowniku wartości przybliżonej $a$ zamiast dokładnej $x$ to typowy błąd powodujący utratę punktu.",
        "core_formula": "$$\\Delta_x = |x - a| \\quad (\\text{błąd bezwzględny})$$ \\quad | \\quad $$\\delta_x = \\frac{|x - a|}{x} \\quad (\\text{błąd względny})$$ \\quad | \\quad $$\\delta_{\\%} = \\frac{|x - a|}{x} \\cdot 100\\% \\quad (\\text{błąd procentowy})$$",
        "coreFormulaLatex": "$$\\Delta_x = |x - a| \\quad (\\text{błąd bezwzględny})$$ \\quad | \\quad $$\\delta_x = \\frac{|x - a|}{x} \\quad (\\text{błąd względny})$$ \\quad | \\quad $$\\delta_{\\%} = \\frac{|x - a|}{x} \\cdot 100\\% \\quad (\\text{błąd procentowy})$$",
        "key_takeaway": "Pewniak maturalny za 1 pkt. Zadanie polega na obliczeniu błędu względnego wyrażonego w procentach. Kluczem jest poprawna identyfikacja, która liczba w treści jest wartością dokładną $x$, a która przybliżoną $a$.",
        "keyTakeaway": "Pewniak maturalny za 1 pkt. Zadanie polega na obliczeniu błędu względnego wyrażonego w procentach. Kluczem jest poprawna identyfikacja, która liczba w treści jest wartością dokładną $x$, a która przybliżoną $a$.",
        "trap_alert": "Dzielenie przez przybliżenie! Postawienie w mianowniku wartości przybliżonej $a$ zamiast dokładnej $x$ to typowy błąd powodujący utratę punktu.",
        "trapAlert": "Dzielenie przez przybliżenie! Postawienie w mianowniku wartości przybliżonej $a$ zamiast dokładnej $x$ to typowy błąd powodujący utratę punktu."
      },
      "tasks": [
        {
          "id": "MAT-01-06-A",
          "source": "Matura Próbna • Zadanie 3",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Liczba $a = 12$ jest przybliżeniem z niedomiarem liczby $x = 12{,}5$. Błąd względny tego przybliżenia jest równy:",
          "options": [
            { "id": "A", "text": "$4\\%$" },
            { "id": "B", "text": "$5\\%$" },
            { "id": "C", "text": "$0{,}5\\%$" },
            { "id": "D", "text": "$4{,}17\\%$" }
          ],
          "correct_answer": "A",
          "hint_1": "Oblicz błąd bezwzględny: $|x - a| = |12{,}5 - 12| = 0{,}5$.",
          "hint_2": "Podziel przez wartość dokładną $x=12{,}5$: $\\frac{0{,}5}{12{,}5} = \\frac{1}{25} = 0{,}04 = 4\\%$.",
          "explanation": "$$\\delta_{\\%} = \\frac{|x - a|}{x} \\cdot 100\\% = \\frac{|12{,}5 - 12|}{12{,}5} \\cdot 100\\% = \\frac{0{,}5}{12{,}5} \\cdot 100\\% = 4\\%$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-06-B",
          "source": "Informator Maturalny • Zadanie 7",
          "type": "NUMERIC_INPUT",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Przybliżeniem ułamka $\\frac{3}{8}$ jest liczba $0{,}4$. Oblicz błąd bezwzględny tego przybliżenia. Wpisz wynik w postaci ułamka dziesiętnego:",
          "correct_answer": "0.025",
          "correctAnswer": "0.025",
          "input_placeholder": "Np. 0.025",
          "hint_1": "Zamień ułamek $\\frac{3}{8}$ na ułamek dziesiętny: $\\frac{3}{8} = 0{,}375$.",
          "hint_2": "Błąd bezwzględny to $|0{,}375 - 0{,}4|$.",
          "explanation": "$$\\Delta = |x - a| = |0{,}375 - 0{,}4| = |-0{,}025| = 0{,}025$$\nPoprawny wynik to 0.025."
        },
        {
          "id": "MAT-01-06-C",
          "source": "Zadanie Egzaminacyjne • Błąd Względny",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Błąd względny pomiaru odległości równej $80\\text{ m}$ wyniósł $2{,}5\\%$. Błąd bezwzględny tego pomiaru był równy:",
          "options": [
            { "id": "A", "text": "$2\\text{ m}$" },
            { "id": "B", "text": "$3\\text{ m}$" },
            { "id": "C", "text": "$4\\text{ m}$" },
            { "id": "D", "text": "$1{,}5\\text{ m}$" }
          ],
          "correct_answer": "A",
          "hint_1": "Zastosuj wzór: $\\delta = \\frac{\\Delta}{x} \\implies \\Delta = \\delta \\cdot x$.",
          "hint_2": "Pomnóż: $0{,}025 \\cdot 80$.",
          "explanation": "$$\\Delta = \\delta \\cdot x = 0{,}025 \\cdot 80 = 2\\text{ m}$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-06-D",
          "source": "Matura Poprawkowa • Zadanie Szacowanie",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "EASY",
          "question": "Liczbę $24{,}8$ zaokrąglono do najbliższej liczby całkowitej otrzymując $25$. Błąd bezwzględny tego zaokrąglenia wynosi:",
          "options": [
            { "id": "A", "text": "$0{,}2$" },
            { "id": "B", "text": "$0{,}8$" },
            { "id": "C", "text": "$0{,}02$" },
            { "id": "D", "text": "$0{,}5$" }
          ],
          "correct_answer": "A",
          "hint_1": "Błąd bezwzględny to $|x - a|$.",
          "hint_2": "$|24{,}8 - 25| = |-0{,}2| = 0{,}2$.",
          "explanation": "$$\\Delta = |24{,}8 - 25| = |-0{,}2| = 0{,}2$$\nPoprawna odpowiedź to A."
        },
        {
          "id": "MAT-01-06-E",
          "source": "Zadanie Maturalne • Szacowanie Pierwiastka",
          "type": "SINGLE_CHOICE",
          "points": 1,
          "difficulty": "MEDIUM",
          "question": "Wartość liczby $\\sqrt{70}$ mieści się w przedziale:",
          "options": [
            { "id": "A", "text": "$(7, 8)$" },
            { "id": "B", "text": "$(8, 9)$" },
            { "id": "C", "text": "$(6, 7)$" },
            { "id": "D", "text": "$(9, 10)$" }
          ],
          "correct_answer": "B",
          "hint_1": "Znajdź najbliższe kwadraty liczb całkowitych otaczające liczbę 70: $8^2 = 64$ oraz $9^2 = 81$.",
          "hint_2": "Skoro $64 < 70 < 81$, to $\\sqrt{64} < \\sqrt{70} < \\sqrt{81}$.",
          "explanation": "Mamy $8^2 = 64$ oraz $9^2 = 81$.\nPonieważ $64 < 70 < 81$, zachodzi:\n$$8 < \\sqrt{70} < 9$$\nPoprawna odpowiedź to B."
        }
      ]
    },
    {
      "id": "1.7",
      "slug": "podzielnosc-i-dowodzenie",
      "title": "Podzielność, liczby pierwsze i dowodzenie",
      "order": 7,
      "estimated_time_minutes": 8,
      "estimated_time_formatted": "~8 min",
      "theory_pill": {
        "title": "Podzielność, liczby pierwsze i dowodzenie",
        "concept_essence": "Liczba całkowita $a$ jest podzielna przez $b$, jeśli iloraz jest liczbą całkowitą, czyli $a = b \\cdot k$ dla pewnego $k \\in \\mathbb{Z}$. Kluczowa własność arytmetyki: iloczyn $n$ kolejnych liczb całkowitych jest ZAWSZE podzielny przez $n!$ (np. iloczyn dwóch kolejnych liczb dzieli się przez 2, a trzech kolejnych przez 6).",
        "matura_context": "Sztandarowe zadanie otwarte za 2 punkty. Schemat oceniania jest bezlitosny: 1 punkt przyznawany jest za przekształcenie algebraiczne (np. rozkład na czynniki lub wyłączenie $M$ przed nawias), a 2. punkt WYŁĄCZNIE za słowny komentarz uzasadniający podzielność.",
        "core_formulas": [
          "a \\text{ podzielne przez } b \\iff a = b \\cdot k \\quad (k \\in \\mathbb{Z})",
          "n(n+1) = 2k \\quad (\\text{iloczyn 2 kolejnych liczb jest parzysty})",
          "(n-1)n(n+1) = 6k \\quad (\\text{iloczyn 3 kolejnych liczb dzieli się przez 6})"
        ],
        "worked_example": {
          "problem": "Wykaż, że dla każdego $n \\ge 1$ liczba $n^2 + n$ jest podzielna przez $2$.",
          "step_1": "Wyłącz $n$ przed nawias: $n(n+1)$.",
          "step_2": "Dopisz wniosek: $n(n+1)$ to iloczyn dwóch kolejnych liczb naturalnych, więc jedna z nich jest parzysta. Zatem iloczyn jest podzielny przez 2, co kończy dowód."
        },
        "exam_trap": "Brak komentarza słownego kończącego dowód! Nawet idealne przekształcenie algebraiczne bez dopisku wyjaśniającego, że czynnik jest całkowity lub parzysty, oznacza stratę 50% punktów za zadanie.",
        "core_formula": "$$a \\text{ podzielne przez } b \\iff a = b \\cdot k \\quad (k \\in \\mathbb{Z})$$ \\quad | \\quad $$n(n+1) = 2k \\quad (\\text{iloczyn 2 kolejnych liczb jest parzysty})$$ \\quad | \\quad $$(n-1)n(n+1) = 6k \\quad (\\text{iloczyn 3 kolejnych liczb dzieli się przez 6})$$",
        "coreFormulaLatex": "$$a \\text{ podzielne przez } b \\iff a = b \\cdot k \\quad (k \\in \\mathbb{Z})$$ \\quad | \\quad $$n(n+1) = 2k \\quad (\\text{iloczyn 2 kolejnych liczb jest parzysty})$$ \\quad | \\quad $$(n-1)n(n+1) = 6k \\quad (\\text{iloczyn 3 kolejnych liczb dzieli się przez 6})$$",
        "key_takeaway": "Sztandarowe zadanie otwarte za 2 punkty. Schemat oceniania jest bezlitosny: 1 punkt przyznawany jest za przekształcenie algebraiczne (np. rozkład na czynniki lub wyłączenie $M$ przed nawias), a 2. punkt WYŁĄCZNIE za słowny komentarz uzasadniający podzielność.",
        "keyTakeaway": "Sztandarowe zadanie otwarte za 2 punkty. Schemat oceniania jest bezlitosny: 1 punkt przyznawany jest za przekształcenie algebraiczne (np. rozkład na czynniki lub wyłączenie $M$ przed nawias), a 2. punkt WYŁĄCZNIE za słowny komentarz uzasadniający podzielność.",
        "trap_alert": "Brak komentarza słownego kończącego dowód! Nawet idealne przekształcenie algebraiczne bez dopisku wyjaśniającego, że czynnik jest całkowity lub parzysty, oznacza stratę 50% punktów za zadanie.",
        "trapAlert": "Brak komentarza słownego kończącego dowód! Nawet idealne przekształcenie algebraiczne bez dopisku wyjaśniającego, że czynnik jest całkowity lub parzysty, oznacza stratę 50% punktów za zadanie."
      },
      "tasks": [
        {
          "id": "MAT-01-07-OPEN-01",
          "source": "Matura Maj 2024 • Zadanie 3",
          "type": "OPEN_PROOF",
          "points": 2,
          "difficulty": "HARD",
          "question": "Wykaż, że dla każdej liczby naturalnej $n \\ge 1$ liczba $$n^2 + (n+1)^2 + (n+2)^2$$ przy dzieleniu przez $3$ daje resztę $2$.",
          "correct_answer": "3(n^2 + 2n + 1) + 2",
          "hint_1": "Zastosuj wzory skróconego mnożenia, podnieś nawiasy do kwadratu i zredukuj wyrazy podobne.",
          "hint_2": "Otrzymasz $3n^2 + 6n + 5$. Rozbij liczbę 5 na sumę $3 + 2$ i wyłącz 3 przed nawias.",
          "explanation": "Rozpisujemy wyrażenie ze wzorów skróconego mnożenia:\n$$n^2 + (n+1)^2 + (n+2)^2 = n^2 + (n^2 + 2n + 1) + (n^2 + 4n + 4)$$\n$$= 3n^2 + 6n + 5 = 3n^2 + 6n + 3 + 2 = 3(n^2 + 2n + 1) + 2$$\nPonieważ dla $n \\ge 1$ wyrażenie $n^2 + 2n + 1$ jest liczbą całkowitą, dana liczba jest sumą wielokrotności liczby 3 oraz liczby 2. Zatem przy dzieleniu przez 3 daje resztę 2, co kończy dowód.",
          "ai_tutor_rubric": {
            "max_points": 2,
            "criterion_1_point": "Zasadniczy postęp w rozwiązaniu: poprawne podniesienie do kwadratu i zredukowanie wyrażenia do postaci $3n^2 + 6n + 5$.",
            "criterion_2_points": "Pełne bezbłędne rozwiązanie: zapisanie wyrażenia w postaci $3(n^2 + 2n + 1) + 2$ oraz sformułowanie wniosku, że reszta z dzielenia wynosi 2."
          }
        },
        {
          "id": "MAT-01-07-OPEN-02",
          "source": "Matura Maj 2023 • Zadanie 3",
          "type": "OPEN_PROOF",
          "points": 2,
          "difficulty": "HARD",
          "question": "Wykaż, że dla każdej liczby naturalnej $n \\ge 1$ liczba $$(2n + 1)^2 - 1$$ jest podzielna przez $8$.",
          "correct_answer": "8k",
          "hint_1": "Zastosuj wzór skróconego mnożenia $(2n+1)^2 = 4n^2 + 4n + 1$.",
          "hint_2": "Po odjęciu 1 otrzymasz $4n^2 + 4n = 4n(n+1)$. Zastanów się, jaką liczbą jest iloczyn $n(n+1)$.",
          "explanation": "Przekształcamy wyrażenie:\n$$(2n + 1)^2 - 1 = 4n^2 + 4n + 1 - 1 = 4n^2 + 4n = 4n(n+1)$$\nIloczyn $n(n+1)$ jest iloczynem dwóch kolejnych liczb naturalnych, zatem co najmniej jedna z nich jest parzysta. Oznacza to, że $n(n+1) = 2k$ dla pewnego $k \\in \\mathbb{N}$.\nWtedy:\n$$4n(n+1) = 4 \\cdot 2k = 8k$$\nLiczba ta jest wielokrotnością 8, a więc dzieli się przez 8, co należało wykazać.",
          "ai_tutor_rubric": {
            "max_points": 2,
            "criterion_1_point": "Wykonanie redukcji i wyłączenie przed nawias: otrzymanie postaci $4n(n+1)$.",
            "criterion_2_points": "Wskazanie, że iloczyn $n(n+1)$ jest parzysty, co po pomnożeniu przez 4 daje podzielność przez 8, wraz z wnioskiem końcowym."
          }
        },
        {
          "id": "MAT-01-07-OPEN-03",
          "source": "Matura Czerwiec 2024 • Zadanie 5",
          "type": "OPEN_PROOF",
          "points": 2,
          "difficulty": "HARD",
          "question": "Wykaż, że dla każdej liczby naturalnej $n \\ge 1$ liczba $$5n^3 - 5n$$ jest podzielna przez $30$.",
          "correct_answer": "30k",
          "hint_1": "Wyłącz $5n$ przed nawias: $5n(n^2 - 1)$.",
          "hint_2": "Rozłóż $n^2 - 1$ ze wzoru skróconego mnożenia na $(n-1)(n+1)$. Otrzymasz $5 \\cdot (n-1)n(n+1)$.",
          "explanation": "Rozkładamy wyrażenie na czynniki:\n$$5n^3 - 5n = 5n(n^2 - 1) = 5(n-1)n(n+1)$$\nWyrażenie $(n-1)n(n+1)$ to iloczyn trzech kolejnych liczb całkowitych.\nWśród trzech kolejnych liczb co najmniej jedna jest podzielna przez 2 i dokładnie jedna podzielna przez 3. Zatem iloczyn ten jest podzielny przez $2 \\cdot 3 = 6$.\nSkoro $(n-1)n(n+1) = 6k$, to całe wyrażenie wynosi:\n$$5 \\cdot 6k = 30k$$\nLiczba jest podzielna przez 30, co kończy dowód.",
          "ai_tutor_rubric": {
            "max_points": 2,
            "criterion_1_point": "Rozłożenie wielomianu na iloczyn $5(n-1)n(n+1)$.",
            "criterion_2_points": "Uzasadnienie podzielności iloczynu 3 kolejnych liczb przez 6 i wyciągnięcie wniosku o podzielności przez 30."
          }
        },
        {
          "id": "MAT-01-07-OPEN-04",
          "source": "Matura Próbna Grudzień 2024 • Zadanie 3",
          "type": "OPEN_PROOF",
          "points": 2,
          "difficulty": "HARD",
          "question": "Wykaż, że liczba $$2^{100} + 4^{49} + 16^{24}$$ jest podzielna przez $21$.",
          "correct_answer": "21k",
          "hint_1": "Sprowadź wszystkie potęgi do wspólnej podstawy 2: $4^{49} = (2^2)^{49} = 2^{98}$, $16^{24} = (2^4)^{24} = 2^{96}$.",
          "hint_2": "Wyłącz przed nawias potęgę o najmniejszym wykładniku: $2^{96}$. Oblicz wartość w nawiasie.",
          "explanation": "Zapisujemy składniki jako potęgi dwójki:\n$$2^{100} + 4^{49} + 16^{24} = 2^{100} + (2^2)^{49} + (2^4)^{24} = 2^{100} + 2^{98} + 2^{96}$$\nWyłączamy najmniejszą potęgę $2^{96}$ przed nawias:\n$$2^{96} \\cdot (2^4 + 2^2 + 1) = 2^{96} \\cdot (16 + 4 + 1) = 2^{96} \\cdot 21$$\nJeden z czynników iloczynu to 21, zatem cała liczba jest podzielna przez 21, co kończy dowód.",
          "ai_tutor_rubric": {
            "max_points": 2,
            "criterion_1_point": "Poprawne sprowadzenie składników do podstawy 2 i wyłączenie potęgi $2^{96}$ przed nawias.",
            "criterion_2_points": "Obliczenie wartości w nawiasie równej 21 i sformułowanie wniosku o podzielności."
          }
        },
        {
          "id": "MAT-01-07-E",
          "source": "Matura Maj 2023 • Zadanie Podzielność",
          "type": "TWO_PART",
          "points": 1,
          "difficulty": "EASY",
          "question": "Dokończ zdanie. Wybierz odpowiedź A albo B oraz jej uzasadnienie 1., 2. albo 3.\n\nDla każdej liczby naturalnej $n \\ge 1$ wyrażenie $n^2 + n$ jest:",
          "correct_answer": "A1",
          "correctAnswer": "A1",
          "part_1": {
            "prompt": "Wybierz własność:",
            "options": [
              { "id": "A", "text": "zawsze liczbą parzystą" },
              { "id": "B", "text": "zawsze liczbą nieparzystą" }
            ]
          },
          "part_2": {
            "prompt": "ponieważ:",
            "options": [
              { "id": "1", "text": "$n(n+1)$ jest iloczynem dwóch kolejnych liczb naturalnych, z których co najmniej jedna jest parzysta" },
              { "id": "2", "text": "suma dwóch liczb nieparzystych jest parzysta" },
              { "id": "3", "text": "$n^2$ jest parzyste dla każdego $n$" }
            ]
          },
          "hint_1": "Wyłącz $n$ przed nawias: $n(n+1)$.",
          "hint_2": "Zauważ, że $n$ oraz $n+1$ to dwie kolejne liczby naturalne. Jedna z nich zawsze musi być parzysta.",
          "explanation": "$$n^2 + n = n(n+1)$$\nIloczyn dwóch kolejnych liczb naturalnych zawiera zawsze liczbę parzystą, dlatego wynik jest bezwzględnie podzielny przez 2.\nPrawidłowy wybór to A oraz uzasadnienie 1."
        },
        {
          "id": "MAT-01-07-OPEN-05",
          "source": "Matura Próbna • Zadanie Dowodowe",
          "type": "OPEN_PROOF",
          "points": 2,
          "difficulty": "HARD",
          "question": "Wykaż, że dla każdej liczby naturalnej $n \\ge 1$ liczba $$n^3 - n$$ jest podzielna przez $6$.",
          "correct_answer": "6k",
          "hint_1": "Wyłącz $n$ przed nawias: $n(n^2 - 1)$.",
          "hint_2": "Zastosuj wzór skróconego mnożenia: $n(n-1)(n+1) = (n-1)n(n+1)$. Zastanów się nad iloczynem trzech kolejnych liczb.",
          "explanation": "Rozkładamy na czynniki:\n$$n^3 - n = n(n^2 - 1) = (n-1)n(n+1)$$\nWyrażenie $(n-1)n(n+1)$ to iloczyn trzech kolejnych liczb naturalnych.\nWśród trzech kolejnych liczb naturalnych co najmniej jedna jest podzielna przez 2 i dokładnie jedna podzielna przez 3.\nZatem iloczyn ten jest podzielny przez $2 \\cdot 3 = 6$, co kończy dowód.",
          "ai_tutor_rubric": {
            "max_points": 2,
            "criterion_1_point": "Rozłożenie wyrażenia do postaci iloczynowej $(n-1)n(n+1)$.",
            "criterion_2_points": "Podanie uzasadnienia o podzielności przez 2 i 3 (iloczyn 3 kolejnych liczb) oraz sformułowanie wniosku o podzielności przez 6."
          }
        }
      ]
    }
  ],
  "final_test": {
    "id": "test-dzial-1",
    "title": "Sprawdzian Działu: Liczby Rzeczywiste",
    "subtitle": "Egzamin podsumowujący opanowanie Działu 1",
    "description": "Przekrojowy test podsumowujący Dział 1. Rozwiąż 7 losowych zadań ze wszystkich lekcji. Zdobądź min. 5/7 punktów, aby zaliczyć dział i odblokować Odznakę Mistrza!",
    "time_limit_minutes": 15,
    "questions_count": 7,
    "passing_score": 5,
    "reward_xp": 200,
    "reward_coins": 100,
    "badge_id": "master_dzial_1",
    "badge_title": "Mistrz Liczb Rzeczywistych",
    "unlock_condition": "Zaliczono 7/7 lekcji Działu 1"
  }
};

const current = JSON.parse(fs.readFileSync('src/data/curriculum_matematyka.json'));
current.topics[0] = topic1;

const jsonStr = JSON.stringify(current, null, 2);
fs.writeFileSync('src/data/curriculum_matematyka.json', jsonStr);
fs.writeFileSync('public/curriculum_matematyka.json', jsonStr);
console.log('Successfully updated curriculum_matematyka.json in src and public!');
