# -*- coding: utf-8 -*-
import sys, os, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('seed/curriculum/official_cke_tasks_reference.json', 'r', encoding='utf-8') as f:
    official = json.load(f)

print(f"Total official tasks: {len(official)}")

keywords = {
    'Topic 01 (Potęgi/Pierwiastki)': ['potęg', 'pierwiast', 'wykładnik', 'usuń niewymierność'],
    'Topic 02 (Logarytmy)': ['log'],
    'Topic 03 (Wartość bezwzględna)': ['wartość bezwzględna', '|', 'odległość na osi'],
    'Topic 04 (Wzory skróconego mnożenia/Algebra)': ['wzór skróconego', 'kwadrat sumy', 'różnic', 'podzielna', 'wykaż, że dla każdej liczby naturalnej', 'reszta z dzielenia'],
    'Topic 05 (Nierówności liniowe)': ['nierówność', 'oś liczbowa', 'zbior rozwiązań', 'zbiorem wszystkich rozwiązań'],
    'Topic 06 (Równania iloczynowe/Wielomiany)': ['iloczyn', 'równanie', 'stopnia', 'x^3', 'x3'],
    'Topic 07 (Wyrażenia wymierne)': ['mianownik', 'dziedzina', 'wymiern', 'proporcj'],
    'Topic 08 (Nierówności kwadratowe)': ['nierówność kwadratowa', 'delta', 'parabola', 'x^2', 'x2'],
    'Topic 09 (Wykres funkcji)': ['wykres', 'dziedzina', 'zbiór wartości', 'miejsca zerowe', 'funkcja f'],
    'Topic 10 (Funkcja liniowa)': ['funkcja liniowa', 'współczynnik kierunkowy', 'prosta', 'równoległ', 'prostopadł'],
    'Topic 11 (Ciągi)': ['ciąg', 'arytmetyczn', 'geometryczn', 'an'],
    'Topic 12 (Funkcja kwadratowa)': ['funkcja kwadratowa', 'wierzchołek', 'postać kanoniczna', 'postać iloczynowa', 'najmniejsza', 'największa'],
    'Topic 13 (Przekształcenia wykresów)': ['wektor', 'symetria', 'przesunięcie', 'f(x -', 'f(x) +', '-f(x)'],
    'Topic 14 (Trygonometria)': ['sin', 'cos', 'tg', 'kąt ostry', 'trójkąt prostokątny'],
    'Topic 15 (Planimetria - trójkąty)': ['trójkąt', 'tales', 'podobieństw', 'cechy podobieństwa'],
    'Topic 16 (Planimetria - czworokąty/okręgi)': ['trapez', 'romb', 'równoległobok', 'okrąg', 'kąt wpisany', 'kąt środkowy'],
    'Topic 17 (Geometria analityczna)': ['układzie współrzędnych', 'punkty a =', 'środek odcinka', 'długość odcinka', 'równanie okręgu'],
    'Topic 18 (Stereometria)': ['ostrosłup', 'graniastosłup', 'sześcian', 'walec', 'stożek', 'kula', 'objętość'],
    'Topic 19 (Prawdopodobieństwo/Kombinatoryka)': ['losujemy', 'kostk', 'monet', 'prawdopodobieństw', 'reguła mnożenia'],
    'Topic 20 (Statystyka)': ['średnia', 'mediana', 'odchylenie', 'dominanta', 'waria'],
    'Topic 21 (Optymalizacja)': ['największą', 'najmniejszą', 'pole działki', 'funkcja zysku', 'koszt', 'ogrodzenie']
}

for top_name, kws in keywords.items():
    matched = []
    for t in official:
        content = (t.get('content', '') + ' ' + t.get('question', '')).lower()
        if any(k in content for k in kws):
            matched.append(t)
    print(f"\n{top_name}: {len(matched)} matched official tasks")
    for m in matched[:4]:
        ans = m.get('ans')
        typ = m.get('type')
        b = m.get('badge')
        snip = m.get('content', '').replace('\n', ' ')[:60]
        print(f"   * {b} [{typ}, ans={ans}]: {snip}")
