import re
import os

# --- topic_06_builder.py ---
t06_path = r"scripts\curriculum_builder\topic_06_builder.py"
with open(t06_path, 'r', encoding='utf-8') as f:
    t06_code = f.read()

t06_cke_tasks = r'''
    # --- Wstrzyknięte z arkuszy CKE ---
    # CKE Maj 2023 - Zadanie 20. (2 pkt) - Równanie wymierne
    lessons[0]["tasks"].append(
        make_open_calculation_task(
            id="t06_l01_cke_01",
            content="Rozwiąż równanie $$\\frac{3x - 1}{x + 5} = \\frac{2x - 3}{x + 5}$$ Zapisz obliczenia.",
            correct_answer="x = -2",
            explanation="1. Dziedzina mianownika: $x + 5 \\neq 0 \\implies x \\neq -5$.<br/>2. Mianowniki są równe, więc porównujemy liczniki (dla $x \\neq -5$):<br/>$3x - 1 = 2x - 3$<br/>$3x - 2x = -3 + 1$<br/>$x = -2$.<br/>3. Ponieważ $-2 \\neq -5$, rozwiązaniem jest $x = -2$.",
            points=2,
            source="CKE Maj 2023 • Zad. 20 (2 pkt)",
            rubric=[
                "1 pkt – poprawne wyznaczenie dziedziny równania i doprowadzenie równania do postaci liniowej",
                "2 pkt – wyznaczenie poprawnego rozwiązania"
            ]
        )
    )

    # CKE Czerwiec 2023 - Zadanie 18. (2 pkt) - Równanie wymierne
    lessons[0]["tasks"].append(
        make_open_calculation_task(
            id="t06_l01_cke_02",
            content="Rozwiąż równanie $$\\frac{3x - 6}{x - 2} = x + 1$$ Zapisz obliczenia.",
            correct_answer="x = 2 (sprzeczne), brak rozwiązań",
            explanation="1. Dziedzina mianownika: $x - 2 \\neq 0 \\implies x \\neq 2$.<br/>2. Przekształcenie do postaci wielomianowej dla $x \\neq 2$:<br/>$3x - 6 = (x + 1)(x - 2)$<br/>$3x - 6 = x^2 - x - 2$<br/>$x^2 - 4x + 4 = 0$<br/>$(x - 2)^2 = 0 \\implies x = 2$.<br/>3. Otrzymane rozwiązanie $x = 2$ nie należy do dziedziny, zatem równanie nie ma rozwiązań.",
            points=2,
            source="CKE Czerwiec 2023 • Zad. 18 (2 pkt)",
            rubric=[
                "1 pkt – poprawne wyznaczenie dziedziny i doprowadzenie równania do postaci kwadratowej lub wyłączenie wspólnego czynnika przed nawias z uwzględnieniem dziedziny",
                "2 pkt – poprawne wyznaczenie zbioru rozwiązań (zbiór pusty)"
            ]
        )
    )

'''
t06_code = re.sub(r'(\s+)(return\s*\{\s*"lessons":\s*lessons\s*\})', lambda m: t06_cke_tasks.replace('\n', '\n' + m.group(1)) + m.group(1) + m.group(2), t06_code)
with open(t06_path, 'w', encoding='utf-8') as f:
    f.write(t06_code)


# --- topic_08_builder.py ---
t08_path = r"scripts\curriculum_builder\topic_08_builder.py"
with open(t08_path, 'r', encoding='utf-8') as f:
    t08_code = f.read()

t08_cke_tasks = r'''
    # --- Wstrzyknięte z arkuszy CKE ---
    # CKE Maj 2023 - Zadanie 15. (2 pkt)
    lessons[2]["tasks"].append(
        make_open_calculation_task(
            id="t08_l03_cke_01",
            content="Rozwiąż nierówność: $$x^2 - 2x - 8 \\ge 0$$ Zapisz obliczenia.",
            correct_answer="x \\in (-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)",
            explanation="1. Miejsca zerowe: $\\Delta = (-2)^2 - 4 \\cdot 1 \\cdot (-8) = 4 + 32 = 36$.<br/>$\\sqrt{\\Delta} = 6$.<br/>$x_1 = \\frac{2 - 6}{2} = -2$<br/>$x_2 = \\frac{2 + 6}{2} = 4$<br/>2. Parabola skierowana ramionami w górę ($a = 1 > 0$).<br/>3. Wartości $\\ge 0$ (nieujemne) parabola przyjmuje na zewnątrz pierwiastków.<br/>Odp: $x \\in (-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$.",
            points=2,
            source="CKE Maj 2023 • Zad. 15 (2 pkt)",
            rubric=[
                "1 pkt – poprawne wyznaczenie pierwiastków trójmianu kwadratowego",
                "2 pkt – podanie poprawnego zbioru rozwiązań nierówności"
            ]
        )
    )

    # CKE Informator 2025 - Przykład nierówności z ujemnym a
    lessons[2]["tasks"].append(
        make_open_calculation_task(
            id="t08_l03_cke_02",
            content="Rozwiąż nierówność: $$-2x^2 + 5x - 3 \\le 0$$ Zapisz obliczenia.",
            correct_answer="x \\in (-\\infty, 1\\rangle \\cup \\langle 1.5, +\\infty)",
            explanation="1. Miejsca zerowe: $\\Delta = 5^2 - 4 \\cdot (-2) \\cdot (-3) = 25 - 24 = 1$.<br/>$\\sqrt{\\Delta} = 1$.<br/>$x_1 = \\frac{-5 - 1}{2 \\cdot (-2)} = \\frac{-6}{-4} = 1.5$<br/>$x_2 = \\frac{-5 + 1}{-4} = 1$<br/>2. Parabola ramionami w dół ($a = -2 < 0$).<br/>3. Wartości $\\le 0$ są pod osią OX (na zewnątrz).<br/>Odp: $x \\in (-\\infty, 1\\rangle \\cup \\langle \\frac{3}{2}, +\\infty)$.",
            points=2,
            source="CKE Informator 2025 • Przykład",
            rubric=[
                "1 pkt – wyznaczenie miejsc zerowych funkcji",
                "2 pkt – sformułowanie ostatecznej odpowiedzi w postaci sumy przedziałów domkniętych"
            ]
        )
    )
'''
t08_code = re.sub(r'(\s+)(return\s*\{\s*"lessons":\s*lessons\s*\})', lambda m: t08_cke_tasks.replace('\n', '\n' + m.group(1)) + m.group(1) + m.group(2), t08_code)
with open(t08_path, 'w', encoding='utf-8') as f:
    f.write(t08_code)

# --- topic_11_builder.py ---
t11_path = r"scripts\curriculum_builder\topic_11_builder.py"
with open(t11_path, 'r', encoding='utf-8') as f:
    t11_code = f.read()

t11_cke_tasks = r'''
    # --- Wstrzyknięte z arkuszy CKE ---
    # CKE Maj 2023 - Zadanie 17. (2 pkt) - Dowód ciąg geometryczny
    lessons[2]["tasks"].append(
        make_open_calculation_task(
            id="t11_l03_cke_01",
            content="Trzy liczby dodatnie tworzą ciąg geometryczny. Wykaż, że jeśli suma tych liczb jest równa 26, a środkowa z nich jest równa 6, to pierwsza z tych liczb jest równa 2 lub 18.",
            correct_answer="Zatem x=2 lub x=18",
            explanation="Niech $a, b, c$ tworzą ciąg geometryczny. Wiemy, że $b=6$ i $a+b+c=26$.<br/>Stąd $a+6+c=26 \\implies a+c=20 \\implies c=20-a$.<br/>Z własności ciągu geometrycznego: $b^2 = a \\cdot c$.<br/>$6^2 = a(20-a)$<br/>$36 = 20a - a^2$<br/>$a^2 - 20a + 36 = 0$<br/>$\\Delta = 400 - 144 = 256$, $\\sqrt{\\Delta} = 16$.<br/>$a_1 = \\frac{20-16}{2} = 2$, $a_2 = \\frac{20+16}{2} = 18$.<br/>Obie liczby prowadzą do dodatnich ciągów: (2, 6, 18) lub (18, 6, 2).",
            points=2,
            source="CKE Maj 2023 • Zad. 17 (2 pkt)",
            rubric=[
                "1 pkt – zastosowanie własności ciągu geometrycznego i zapisanie równania kwadratowego z jedną niewiadomą",
                "2 pkt – poprawne rozwiązanie równania kwadratowego i sformułowanie poprawnego wniosku"
            ]
        )
    )
'''
t11_code = re.sub(r'(\s+)(return\s*\{\s*"lessons":\s*lessons\s*\})', lambda m: t11_cke_tasks.replace('\n', '\n' + m.group(1)) + m.group(1) + m.group(2), t11_code)
with open(t11_path, 'w', encoding='utf-8') as f:
    f.write(t11_code)

# --- topic_12_builder.py ---
t12_path = r"scripts\curriculum_builder\topic_12_builder.py"
with open(t12_path, 'r', encoding='utf-8') as f:
    t12_code = f.read()

t12_cke_tasks = r'''
    # --- Wstrzyknięte z arkuszy CKE ---
    # CKE Maj 2024 - Zadanie 18. (2 pkt) - Zastosowanie funkcji kwadratowej
    lessons[2]["tasks"].append(
        make_open_calculation_task(
            id="t12_l03_cke_01",
            content="Funkcja kwadratowa $f$ jest określona wzorem $f(x) = -(x - 1)^2 + 4$. Wyznacz zbiór wartości tej funkcji i określ w jakim przedziale funkcja rośnie.",
            correct_answer="ZW = (-\\infty, 4\\rangle, rośnie w (-\\infty, 1\\rangle",
            explanation="1. Wzór $f(x) = -(x - 1)^2 + 4$ ma postać kanoniczną $f(x) = a(x-p)^2 + q$.<br/>2. Otrzymujemy $p = 1, q = 4$, $a = -1$.<br/>3. Ponieważ $a < 0$, parabola ma ramiona skierowane w dół, a wierzchołkiem jest punkt $W(1, 4)$.<br/>4. Zbiór wartości to $y \\in (-\\infty, 4\\rangle$.<br/>5. Funkcja rośnie w przedziale od $-\\infty$ do współrzędnej $x$ wierzchołka, czyli w $(-\\infty, 1\\rangle$.",
            points=2,
            source="CKE Maj 2024 • Zad. 18 (2 pkt)",
            rubric=[
                "1 pkt – podanie współrzędnych wierzchołka i odczytanie z nich jednej z żądanych własności",
                "2 pkt – poprawne określenie zarówno zbioru wartości jak i przedziału monotoniczności"
            ]
        )
    )

    # CKE Sierpień 2023 - Zadanie 11. (2 pkt)
    lessons[3]["tasks"].append(
        make_open_calculation_task(
            id="t12_l04_cke_01",
            content="Wyznacz najmniejszą i największą wartość funkcji $f(x) = x^2 - 4x + 3$ w przedziale $\\langle 1, 4\\rangle$. Zapisz obliczenia.",
            correct_answer="min = -1 (dla x=2), max = 3 (dla x=4)",
            explanation="1. Współrzędna wierzchołka $p = -\\frac{b}{2a} = -\\frac{-4}{2} = 2$.<br/>2. Sprawdzamy, czy $p \\in \\langle 1, 4\\rangle$. Tak, $2 \\in \\langle 1, 4\\rangle$.<br/>3. Obliczamy wartość funkcji w wierzchołku: $f(2) = 2^2 - 4(2) + 3 = 4 - 8 + 3 = -1$.<br/>4. Obliczamy wartości na końcach przedziału:<br/>$f(1) = 1^2 - 4(1) + 3 = 1 - 4 + 3 = 0$<br/>$f(4) = 4^2 - 4(4) + 3 = 16 - 16 + 3 = 3$<br/>5. Porównujemy wyniki: $\\{-1, 0, 3\\}$.<br/>Wartość najmniejsza wynosi -1, a największa 3.",
            points=2,
            source="CKE Sierpień 2023 • Zad. 11 (2 pkt)",
            rubric=[
                "1 pkt – poprawne wyznaczenie współrzędnej p wierzchołka i sprawdzenie przynależności do przedziału",
                "2 pkt – obliczenie wartości na końcach przedziału i w wierzchołku oraz sformułowanie poprawnej odpowiedzi"
            ]
        )
    )
'''
t12_code = re.sub(r'(\s+)(return\s*\{\s*"lessons":\s*lessons\s*\})', lambda m: t12_cke_tasks.replace('\n', '\n' + m.group(1)) + m.group(1) + m.group(2), t12_code)
with open(t12_path, 'w', encoding='utf-8') as f:
    f.write(t12_code)

print("CKE tasks injected successfully.")
