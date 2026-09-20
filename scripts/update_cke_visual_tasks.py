import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Definicje wektorowych osi liczbowych dla Maj 2024 Zad. 1
maj_2024_zad1_options = [
    {
        "id": "A",
        "text": "⟨-2, 4⟩",
        "numberLine": {
            "min": -5,
            "max": 7,
            "ticks": [-2, 4],
            "intervals": [{"from": -2, "to": 4, "fromIncluded": True, "toIncluded": True}]
        },
        "is_correct": False
    },
    {
        "id": "B",
        "text": "(-∞, -2⟩ ∪ ⟨4, +∞)",
        "numberLine": {
            "min": -5,
            "max": 7,
            "ticks": [-2, 4],
            "intervals": [
                {"from": None, "to": -2, "toIncluded": True},
                {"from": 4, "to": None, "fromIncluded": True}
            ]
        },
        "is_correct": True
    },
    {
        "id": "C",
        "text": "(-2, 4)",
        "numberLine": {
            "min": -5,
            "max": 7,
            "ticks": [-2, 4],
            "intervals": [{"from": -2, "to": 4, "fromIncluded": False, "toIncluded": False}]
        },
        "is_correct": False
    },
    {
        "id": "D",
        "text": "(-∞, -2) ∪ (4, +∞)",
        "numberLine": {
            "min": -5,
            "max": 7,
            "ticks": [-2, 4],
            "intervals": [
                {"from": None, "to": -2, "toIncluded": False},
                {"from": 4, "to": None, "fromIncluded": False}
            ]
        },
        "is_correct": False
    }
]

# Definicje wektorowych osi liczbowych dla Sierpień 2023 Zad. 1 (|x - 5| < 2)
sierpien_2023_zad1_options = [
    {
        "id": "A",
        "text": "⟨3, 7⟩",
        "numberLine": {
            "min": 0,
            "max": 10,
            "ticks": [3, 7],
            "intervals": [{"from": 3, "to": 7, "fromIncluded": True, "toIncluded": True}]
        },
        "is_correct": False
    },
    {
        "id": "B",
        "text": "(-∞, 3⟩ ∪ ⟨7, +∞)",
        "numberLine": {
            "min": 0,
            "max": 10,
            "ticks": [3, 7],
            "intervals": [
                {"from": None, "to": 3, "toIncluded": True},
                {"from": 7, "to": None, "fromIncluded": True}
            ]
        },
        "is_correct": False
    },
    {
        "id": "C",
        "text": "(-∞, 3) ∪ (7, +∞)",
        "numberLine": {
            "min": 0,
            "max": 10,
            "ticks": [3, 7],
            "intervals": [
                {"from": None, "to": 3, "toIncluded": False},
                {"from": 7, "to": None, "fromIncluded": False}
            ]
        },
        "is_correct": False
    },
    {
        "id": "D",
        "text": "(3, 7)",
        "numberLine": {
            "min": 0,
            "max": 10,
            "ticks": [3, 7],
            "intervals": [{"from": 3, "to": 7, "fromIncluded": False, "toIncluded": False}]
        },
        "is_correct": True
    }
]

# Czerwiec 2023 Zad. 14 (f(x) = ax^2 + bx + 1, a < 0, b > 0)
czerwiec_2023_zad14_options = [
    {
        "id": "A",
        "text": "Ramiona w górę (a > 0), wierzchołek w II ćwiartce (xw < 0, yw > 0)",
        "is_correct": False
    },
    {
        "id": "B",
        "text": "Ramiona w dół (a < 0), wierzchołek w II ćwiartce (xw < 0, yw > 0)",
        "is_correct": False
    },
    {
        "id": "C",
        "text": "Ramiona w górę (a > 0), wierzchołek w I ćwiartce (xw > 0, yw > 0)",
        "is_correct": False
    },
    {
        "id": "D",
        "text": "Ramiona w dół (a < 0), wierzchołek w I ćwiartce (xw > 0), przecięcie z OY w punkcie (0, 1)",
        "is_correct": True
    }
]

# Czerwiec 2024 Zad. 15.1 (f(x) = -(x+1)^2 + 4)
czerwiec_2024_zad15_options = [
    {
        "id": "A",
        "text": "Parabola o wierzchołku W = (1, 4) i ramionach skierowanych w dół",
        "is_correct": False
    },
    {
        "id": "B",
        "text": "Parabola o wierzchołku W = (-1, 4) i ramionach skierowanych w dół, przechodząca przez (0, 3)",
        "is_correct": True
    },
    {
        "id": "C",
        "text": "Parabola o wierzchołku W = (-1, -4) i ramionach skierowanych w górę",
        "is_correct": False
    },
    {
        "id": "D",
        "text": "Parabola o wierzchołku W = (1, -4) i ramionach skierowanych w górę",
        "is_correct": False
    }
]

# Sierpień 2023 Zad. 14.3 (g(x) = f(-x))
sierpien_2023_zad14_3_options = [
    {
        "id": "A",
        "text": "Symetria wykresu funkcji f względem osi OX: y = -f(x)",
        "is_correct": False
    },
    {
        "id": "B",
        "text": "Symetria wykresu funkcji f względem osi OY: y = f(-x)",
        "is_correct": True
    },
    {
        "id": "C",
        "text": "Symetria wykresu funkcji f względem początku układu współrzędnych: y = -f(-x)",
        "is_correct": False
    },
    {
        "id": "D",
        "text": "Przesunięcie równoległe wykresu funkcji f wzdłuż osi OX",
        "is_correct": False
    }
]

# Maj 2024 Zad. 14.4 (g(x) = f(x+3), h(x) = f(-x))
maj_2024_zad14_4_options = [
    {
        "id": "A",
        "text": "Wykres g(x): wierzchołek przesunięty o 3 w lewo do W=(0, 2); Wykres h(x): symetria względem OY, W=(-3, 2)",
        "is_correct": True
    },
    {
        "id": "B",
        "text": "Wykres g(x): wierzchołek W=(6, 2); Wykres h(x): wierzchołek W=(3, -2)",
        "is_correct": False
    },
    {
        "id": "C",
        "text": "Wykres g(x): wierzchołek W=(0, 5); Wykres h(x): wierzchołek W=(-3, -2)",
        "is_correct": False
    },
    {
        "id": "D",
        "text": "Wykres g(x): wierzchołek W=(3, 5); Wykres h(x): wierzchołek W=(3, 2)",
        "is_correct": False
    }
]

# Maj 2024 Zad. 25.2 (kąt nachylenia najdłuższej przekątnej graniastosłupa)
maj_2024_zad25_2_options = [
    {
        "id": "A",
        "text": "Kąt między krótszą przekątną graniastosłupa a krawędzią boczną",
        "is_correct": False
    },
    {
        "id": "B",
        "text": "Kąt między najdłuższą przekątną graniastosłupa a krawędzią boczną",
        "is_correct": False
    },
    {
        "id": "C",
        "text": "Kąt między krótszą przekątną graniastosłupa a płaszczyzną podstawy",
        "is_correct": False
    },
    {
        "id": "D",
        "text": "Kąt między najdłuższą przekątną graniastosłupa a dłuższą przekątną podstawy (płaszczyzną podstawy)",
        "is_correct": True
    }
]

print("1. Aktualizacja plików pojedynczych arkuszy CKE...")

def update_exam_task(fpath, task_num, new_opts, new_content=None, new_explanation=None, new_trap=None):
    with open(fpath, 'r', encoding='utf-8') as f:
        tasks = json.load(f)
    found = False
    for t in tasks:
        if t.get('taskNumber') == task_num:
            t['options'] = new_opts
            if new_content:
                t['content'] = new_content
            if new_explanation:
                t['explanation'] = new_explanation
            if new_trap:
                t['ckeTrap'] = new_trap
            found = True
            break
    if found:
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(tasks, f, indent=2, ensure_ascii=False)
        print(f"  [OK] {fpath} Zad. {task_num}")
    else:
        print(f"  [WARN] Not found: {fpath} Zad. {task_num}")

# Maj 2024 Zad 1
update_exam_task(
    'seed/curriculum/exams/matura-maj-2024.json',
    '1',
    maj_2024_zad1_options,
    new_content="Dana jest nierówność\n$$|x - 1| \\ge 3$$\nNa którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych spełniających powyższą nierówność? Wybierz właściwą odpowiedź spośród podanych.",
    new_explanation="Rozwiązujemy nierówność z wartością bezwzględną: $|x - 1| \\ge 3 \\iff x - 1 \\le -3 \\lor x - 1 \\ge 3 \\iff x \\le -2 \\lor x \\ge 4$.\nZbiorem rozwiązań jest suma przedziałów $(-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$.\nNa osi liczbowej zaznaczamy punkty $-2$ oraz $4$ z kółkami zamalowanymi (nierówność nieostra $\\ge$) i promieniami skierowanymi na zewnątrz (Rysunek B).",
    new_trap="Znak nierówności $\\ge$ oznacza przedziały zewnętrzne z kółkami zamalowanymi. Puste kółka (Rysunek D) lub przedział wewnętrzny (Rysunek A) to typowe pułapki CKE."
)

# Maj 2024 Zad 14.4
update_exam_task('seed/curriculum/exams/matura-maj-2024.json', '14.4', maj_2024_zad14_4_options)
# Maj 2024 Zad 25.2
update_exam_task('seed/curriculum/exams/matura-maj-2024.json', '25.2', maj_2024_zad25_2_options)

# Sierpień 2023 Zad 1
update_exam_task(
    'seed/curriculum/exams/matura-sierpien-2023.json',
    '1',
    sierpien_2023_zad1_options,
    new_content="Dana jest nierówność\n$$|x - 5| < 2$$\nNa którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych spełniających powyższą nierówność? Wybierz właściwą odpowiedź spośród podanych.",
    new_explanation="Nierówność $|x - 5| < 2$ oznacza odległość liczb na osi od punktu $5$ mniejszą od $2$.\nRozwiązujemy: $-2 < x - 5 < 2 \\iff 3 < x < 7$.\nZbiorem rozwiązań jest przedział otwarty $(3, 7)$. Na osi odpowiada to odcinkowi od $3$ do $7$ z pustymi kółkami na końcach (Rysunek D).",
    new_trap="Znak ostrej nierówności $<$ wymaga pustych kółek (przedział otwarty). Zamalowane kółka (Rysunek A) to typowa pułapka."
)

# Sierpień 2023 Zad 14.3
update_exam_task('seed/curriculum/exams/matura-sierpien-2023.json', '14.3', sierpien_2023_zad14_3_options)

# Czerwiec 2024 Zad 15.1
update_exam_task('seed/curriculum/exams/matura-czerwiec-2024.json', '15.1', czerwiec_2024_zad15_options)

# Czerwiec 2023 Zad 14
update_exam_task('seed/curriculum/exams/matura-czerwiec-2023.json', '14', czerwiec_2023_zad14_options)

print("\n2. Złożenie master arkuszy (zadania_matura.json)...")
all_exam_tasks = []
exam_files = [
    'seed/curriculum/exams/matura-maj-2024.json',
    'seed/curriculum/exams/matura-czerwiec-2024.json',
    'seed/curriculum/exams/matura-sierpien-2024.json',
    'seed/curriculum/exams/matura-maj-2023.json',
    'seed/curriculum/exams/matura-czerwiec-2023.json',
    'seed/curriculum/exams/matura-sierpien-2023.json'
]
for ef in exam_files:
    with open(ef, 'r', encoding='utf-8') as f:
        tasks = json.load(f)
        all_exam_tasks.extend(tasks)

with open('seed/curriculum/zadania_matura.json', 'w', encoding='utf-8') as f:
    json.dump(all_exam_tasks, f, indent=2, ensure_ascii=False)
print(f"  [OK] Zapisano {len(all_exam_tasks)} zadań do zadania_matura.json")

print("\n3. Aktualizacja bazy Maratonu CKE (cke_tasks_matematyka.json)...")
# Uruchomimy compile_cke_tasks.cjs za chwilę

print("\n4. Harmonizacja i aktualizacja modułu Nauka (curriculum_matematyka.json)...")
with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    curriculum = json.load(f)

sanitized_count = 0
updated_t1 = False

for topic in curriculum.get('topics', []):
    for lesson in topic.get('lessons', []):
        for task in lesson.get('tasks', []):
            tid = task.get('id', '')
            # Aktualizacja zadania 1 w Lekcji 1.1 do autentycznego CKE Maj 2024 Zad 1
            if tid == 'task-1-01-11':
                task['question'] = "Dana jest nierówność\n$$|x - 1| \\ge 3$$\nNa którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych spełniających powyższą nierówność? Wybierz właściwą odpowiedź spośród podanych."
                task['source'] = "Matura Maj 2024 • Zad. 1"
                task['cke_source'] = "Matura Maj 2024 • Zad. 1"
                task['cke_badge'] = "Matura Maj 2024 • Zad. 1"
                task['badge'] = "Matura Maj 2024 • Zad. 1"
                task['correct_answer'] = "B"
                task['options'] = maj_2024_zad1_options
                task['explanation'] = "Rozwiązujemy nierówność: $|x - 1| \\ge 3 \\iff x - 1 \\le -3 \\lor x - 1 \\ge 3 \\iff x \\le -2 \\lor x \\ge 4$.\nZbiorem rozwiązań jest suma przedziałów $(-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$.\nNa osi liczbowej zaznaczamy punkty $-2$ oraz $4$ z kółkami zamalowanymi i promieniami na zewnątrz (Rysunek B)."
                task['hint'] = "Wartość bezwzględna $\\ge 3$ oznacza odległość od liczby $1$ co najmniej $3$. Rozbij na $x-1 \\le -3$ lub $x-1 \\ge 3$."
                updated_t1 = True
                continue

            # Harmonizacja badge'y dla wszystkich pozostałych zadań
            src = str(task.get('source', '')).strip()
            cke_badge = str(task.get('cke_badge', '')).strip()
            badge = str(task.get('badge', '')).strip()

            # Jeśli zadanie było fałszywie oznaczone jako Maj 2024 w cke_badge/badge a w source było autorskie:
            if 'autorsk' in src.lower() or not src:
                task['source'] = 'Zadanie autorskie'
                task['cke_source'] = 'Zadanie autorskie'
                task['cke_badge'] = 'Zadanie autorskie'
                task['badge'] = 'Zadanie autorskie'
                sanitized_count += 1
            elif 'informator' in src.lower():
                task['source'] = src
                task['cke_source'] = src
                task['cke_badge'] = src
                task['badge'] = src
            elif 'matura' in src.lower() or 'cke' in src.lower():
                # Ujednolicenie
                task['cke_source'] = src
                task['cke_badge'] = src
                task['badge'] = src

with open('seed/curriculum/curriculum_matematyka.json', 'w', encoding='utf-8') as f:
    json.dump(curriculum, f, indent=2, ensure_ascii=False)

print(f"  [OK] Zaktualizowano Lekcję 1.1 Zad 1: {updated_t1}")
print(f"  [OK] Zharmonizowano {sanitized_count} zadań autorskich w curriculum_matematyka.json")
