import re
import os

files = {
    r"scripts\curriculum_builder\topic_06_builder.py": r'''
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
''',
    r"scripts\curriculum_builder\topic_08_builder.py": r'''
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
''',
    r"scripts\curriculum_builder\topic_12_builder.py": r'''
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
}

for path, injection in files.items():
    with open(path, "r", encoding="utf-8") as f:
        code = f.read()
    
    if "Wstrzyk" not in code:
        code = code.replace("    return {", injection + "\n    return {", 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(code)

print("Injections done successfully.")
