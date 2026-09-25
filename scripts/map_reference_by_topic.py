# -*- coding: utf-8 -*-
import json
import re

with open('seed/curriculum/official_cke_tasks_reference.json', 'r', encoding='utf-8') as f:
    ref = json.load(f)

# Define classifiers for each of the 21 topics
def classify_task(item):
    badge = item.get('badge', '')
    content = (item.get('content', '') + ' ' + item.get('question', '')).lower()
    m = re.search(r'zad\.\s*(\d+(?:\.\d+)?)', badge.lower())
    num = float(m.group(1)) if m else 0.0
    
    # Check by keywords and exam number
    # Topic 1: Potęgi i pierwiastki
    if any(k in content for k in ['potęg', 'pierwiast', 'wykładnik', '2^{', '3^{', '5^{', '4^{', r'\sqrt', r'2^{-']) and ('log' not in content) and ('kąt' not in content) and ('trójkąt' not in content) and ('ciąg' not in content) and num <= 3:
        return 1
    # Topic 2: Logarytmy
    if 'log' in content:
        return 2
    # Topic 3: Wartość bezwzględna
    if '|' in content or 'wartość bezwzględna' in content or 'osi liczbowej zaznaczono' in content:
        if 'trójkąt' not in content and 'wektor' not in content and 'prosta' not in content and num <= 4:
            return 3
    # Topic 4: Wzory skróconego mnożenia i dowody algebraiczne
    if any(k in content for k in ['podzieln', 'reszta z dzielenia', 'wykaż, że dla każdej liczby naturalnej', 'wykaż, że dla każdej liczby całkowitej']):
        return 4
    # Topic 5: Nierówności liniowe
    if 'nierównoś' in content and 'kwadrat' not in content and 'funkcj' not in content and num <= 8:
        return 5
    # Topic 6: Równania iloczynowe i wielomiany
    if any(k in content for k in ['równanie 3x^3', 'równanie x^3', 'równanie 4x^3', 'wielomian']) or (('równanie' in content or 'iloczyn' in content) and any(f'x^{p}' in content or f'x{p}' in content for p in [3, 4]) and num in [7, 8, 9, 10]):
        return 6
    # Topic 7: Wyrażenia i równania wymierne
    if 'wymiern' in content or ('mianownik' in content and 'dziedzin' in content):
        return 7
    # Topic 8: Nierówności kwadratowe
    if ('nierównoś' in content or 'zbiorem wszystkich rozwiązań' in content) and any(k in content for k in ['x^2', 'x2', 'kwadrat', '(2x - 1) < 2x', 'ax^2']) and num <= 10:
        return 8
    # Topic 9: Odczytywanie informacji z wykresu funkcji
    if ('wykres' in content or 'rysunku' in content or 'funkcja f' in content) and any(k in content for k in ['dziedzin', 'zbiór wartości', 'miejsc', 'największ', 'malejąc', 'f(x) <', 'f(-2)']) and num in [10, 11, 12, 13, 14]:
        return 9
    # Topic 10: Funkcja liniowa
    if ('funkcja liniowa' in content or 'prosta o równaniu' in content or 'współczynnik kierunkowy' in content) and ('kąt' not in content or 'nachylenia' in content) and num in [10, 11, 12, 13, 23, 24]:
        return 10
    # Topic 11: Ciągi
    if 'ciąg' in content or 'arytmetyczn' in content or 'geometryczn' in content or 'a_n' in content or 'an =' in content:
        return 11
    # Topic 12: Funkcja kwadratowa
    if 'funkcja kwadratowa' in content or 'parabola' in content or 'wierzchołek' in content or 'osią symetrii' in content or ('f(x) = (x' in content) or ('f(x) = ax^2' in content):
        return 12
    # Topic 13: Przekształcenia wykresów
    if any(k in content for k in ['przesunię', 'wektor', 'symetri']) and 'funkcj' in content:
        return 13
    # Topic 14: Trygonometria
    if any(k in content for k in ['sin', 'cos', 'tg', 'kąt ostry']) and ('graniastosłup' not in content and 'ostrosłup' not in content):
        return 14
    # Topic 15: Planimetria - trójkąty
    if any(k in content for k in ['trójkąt', 'tales', 'podobieństw']) and ('ostrosłup' not in content and 'graniastosłup' not in content and 'układzie' not in content):
        return 15
    # Topic 16: Planimetria - czworokąty i okręgi
    if any(k in content for k in ['romb', 'trapez', 'równoległobok', 'okrąg', 'okręgu', 'kwadrat']) and ('ostrosłup' not in content and 'graniastosłup' not in content and 'układzie' not in content):
        return 16
    # Topic 17: Geometria analityczna
    if 'kartezjańskim układzie' in content or 'w układzie współrzędnych' in content or 'punkty a =' in content or 'proste k oraz l' in content:
        return 17
    # Topic 18: Stereometria
    if any(k in content for k in ['graniastosłup', 'ostrosłup', 'sześcian', 'walec', 'stożek', 'kula', 'czworościan', 'objętość']):
        return 18
    # Topic 19: Kombinatoryka i prawdopodobieństwo
    if any(k in content for k in ['losujemy', 'kostk', 'monet', 'prawdopodobieństw', 'pięcioelementowy zbiór', 'pięciocyfrowych']):
        return 19
    # Topic 20: Statystyka
    if any(k in content for k in ['średnia', 'mediana', 'wariancj', 'odchylenie', 'diagramie przedstawiono']):
        return 20
    # Topic 21: Optymalizacja
    if any(k in content for k in ['ogrodzenie', 'działka ma kształt', 'zakład stolarski', 'aptece obsłużono', 'największą wartość', 'maksymaln']):
        return 21
    
    return 0

topics_map = {i: [] for i in range(22)}
for item in ref:
    t_id = classify_task(item)
    topics_map[t_id].append(item)

for i in range(1, 22):
    print(f"\n==================== TOPIC {i} ({len(topics_map[i])} tasks in ref) ====================")
    for t in topics_map[i]:
        b = t.get('badge')
        typ = t.get('type')
        ans = t.get('ans')
        c = t.get('content', '').replace('\n', ' ')[:65]
        print(f"  {b} [{typ}, ans={ans}]: {c}")

print(f"\nUnclassified ({len(topics_map[0])}):")
for t in topics_map[0]:
    print(f"  {t.get('badge')} [{t.get('type')}]: {t.get('content', '').replace(chr(10), ' ')[:65]}")
