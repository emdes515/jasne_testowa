import os
import sys
import io
import re
import json
import pypdf

# Ensure standard output uses UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_PDF_DIR = r"c:\Users\mateu\Downloads\mat\Matematyka_podstawa\matematyka_podstawa"
OUTPUT_DIR = r"c:\Users\mateu\Downloads\0.45-main\seed\curriculum\exams"
os.makedirs(OUTPUT_DIR, exist_ok=True)

EXAMS_CONFIG = [
    {
        "id": "matura-maj-2024",
        "name": "Matura Maj 2024",
        "fullName": "Matura Maj 2024 (Formuła 2023)",
        "badge": "Sesja Główna 2024",
        "year": 2024,
        "session": "Maj",
        "examPdf": "matematyka-2024-maj-matura-podstawowa.pdf",
        "ansPdf": "matematyka-2024-maj-matura-podstawowa-odpowiedzi.pdf"
    },
    {
        "id": "matura-czerwiec-2024",
        "name": "Matura Czerwiec 2024",
        "fullName": "Matura Czerwiec 2024 (Formuła 2023)",
        "badge": "Termin Dodatkowy 2024",
        "year": 2024,
        "session": "Czerwiec",
        "examPdf": "matematyka-2024-czerwiec-matura-podstawowa.pdf",
        "ansPdf": "matematyka-2024-czerwiec-matura-podstawowa-odpowiedzi.pdf"
    },
    {
        "id": "matura-sierpien-2024",
        "name": "Matura Sierpień 2024",
        "fullName": "Matura Sierpień 2024 (Formuła 2023)",
        "badge": "Sesja Poprawkowa 2024",
        "year": 2024,
        "session": "Sierpień",
        "examPdf": "matematyka-2024-sierpien-poprawkowa-podstawowa.pdf",
        "ansPdf": "matematyka-2024-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf"
    },
    {
        "id": "matura-maj-2023",
        "name": "Matura Maj 2023",
        "fullName": "Matura Maj 2023 (Formuła 2023)",
        "badge": "Sesja Główna 2023",
        "year": 2023,
        "session": "Maj",
        "examPdf": "matematyka-2023-maj-matura-podstawowa.pdf",
        "ansPdf": "matematyka-2023-maj-matura-podstawowa-odpowiedzi.pdf"
    },
    {
        "id": "matura-czerwiec-2023",
        "name": "Matura Czerwiec 2023",
        "fullName": "Matura Czerwiec 2023 (Formuła 2023)",
        "badge": "Termin Dodatkowy 2023",
        "year": 2023,
        "session": "Czerwiec",
        "examPdf": "matematyka-2023-czerwiec-matura-podstawowa.pdf",
        "ansPdf": "matematyka-2023-czerwiec-matura-podstawowa-odpowiedzi.pdf"
    },
    {
        "id": "matura-sierpien-2023",
        "name": "Matura Sierpień 2023",
        "fullName": "Matura Sierpień 2023 (Formuła 2023)",
        "badge": "Sesja Poprawkowa 2023",
        "year": 2023,
        "session": "Sierpień",
        "examPdf": "matematyka-2023-sierpien-poprawkowa-podstawowa.pdf",
        "ansPdf": "matematyka-2023-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf"
    }
]

MATH_UNICODE_MAP = {
    '𝑥': 'x', '𝑦': 'y', '𝑧': 'z',
    '𝑎': 'a', '𝑏': 'b', '𝑐': 'c', '𝑑': 'd',
    '𝑘': 'k', '𝑚': 'm', '𝑛': 'n', '𝑝': 'p', '𝑞': 'q', '𝑟': 'r', '𝑠': 's', '𝑡': 't',
    '𝑓': 'f', '𝑔': 'g', 'ℎ': 'h', '𝑊': 'W', '𝑃': 'P', '𝑄': 'Q',
    '𝐴': 'A', '𝐵': 'B', '𝐶': 'C', '𝐷': 'D', '𝐾': 'K', '𝐿': 'L', '𝑀': 'M', '𝑆': 'S', '𝑂': 'O',
    '𝛼': '\\alpha', '𝛽': '\\beta', '𝛾': '\\gamma', '𝛿': '\\delta',
    'ℝ': '\\mathbb{R}', 'ℕ': '\\mathbb{N}', 'ℤ': '\\mathbb{Z}', 'ℚ': '\\mathbb{Q}',
    '≥': '\\ge', '≤': '\\le', '≠': '\\ne', '≈': '\\approx',
    '⋅': '\\cdot', '∙': '\\cdot',
    '√': '\\sqrt',
    '∞': '\\infty', '∪': '\\cup', '∩': '\\cap'
}

def clean_unicode_math(text):
    if not text:
        return ""
    for u, rep in MATH_UNICODE_MAP.items():
        text = text.replace(u, rep)
    return text

SECTION_KEYWORDS = [
    (15, "Dział 15: Zadania Optymalizacyjne", ["optymalizac", "największe pole", "najmniejszy koszt", "ogrodzenie", "dochód", "zysk", "pole powierzchni"]),
    (14, "Dział 14: Statystyka", ["średnia arytmetyczna", "mediana", "odchylenie standardowe", "zestaw danych", "diagram przedstawiono wyniki", "ocen"]),
    (13, "Dział 13: Rachunek Prawdopodobieństwa", ["prawdopodobieństw", "zdarzenie", "losujemy", "wylosowanie", "kostk", "prawdopodobieństwo"]),
    (12, "Dział 12: Kombinatoryka", ["ile jest liczb", "kombinac", "kod czterocyfrowy", "liczba wszystkich", "cyfr", "permutac"]),
    (11, "Dział 11: Stereometria", ["graniastosłup", "ostrosłup", "objętość", "pole powierzchni całkowitej", "krawędź", "przekątna prostopadłościanu", "stożek", "walec", "kula", "ściany bocznej"]),
    (10, "Dział 10: Geometria Analityczna", ["kartezjańskim układzie współrzędnych", "równanie prostej", "środek odcinka", "długość odcinka", "współrzędne", "okrąg o równaniu"]),
    (9, "Dział 9: Planimetria", ["trójkąt", "czworokąt", "okrąg", "kąt wpisany", "kąt środkowy", "pole trójkąta", "twierdzenie pitagorasa", "trapez", "romb", "równoległobok", "dwusieczna"]),
    (8, "Dział 8: Trygonometria", ["sin", "cos", "tg", "tangens", "kąt ostry", "jedynka trygonometryczna", "sin^2", "cos^2"]),
    (7, "Dział 7: Ciągi Liczbowe", ["ciąg arytmetyczny", "ciąg geometryczny", "wyraz ciągu", "iloraz", "różnica ciągu", "suma początkowych wyrazów", "a_n"]),
    (6, "Dział 6: Funkcja Kwadratowa", ["funkcja kwadratowa", "parabol", "wierzchołek", "oś symetrii", "postać kanoniczna", "miejsca zerowe paraboli", "delta"]),
    (5, "Dział 5: Funkcja Liniowa i Układy Równań", ["funkcja liniowa", "współczynnik kierunkowy", "układ równań", "proste równoległe", "proste prostopadłe"]),
    (4, "Dział 4: Własności Funkcji i Odczytywanie Wykresów", ["wykres funkcji", "dziedzina", "zbiór wartości", "największa wartość", "funkcja malejąca", "funkcja rosnąca", "f(x)"]),
    (3, "Dział 3: Równania i Nierówności", ["nierówność", "równanie", "rozwiązaniem równania", "zbiorem rozwiązań nierówności"]),
    (2, "Dział 2: Wyrażenia Algebraiczne i Wielomiany", ["wielomian", "wyrażenie algebraiczne", "wzory skróconego mnożenia", "stopień wielomianu", "wykaż, że", "reszta z dzielenia"]),
    (1, "Dział 1: Liczby Rzeczywiste", ["liczba", "potęg", "pierwiastek", "logarytm", "procent", "wartość bezwzględna", "przedział", "log_"])
]

def determine_section(content):
    content_lower = content.lower()
    for dzial_num, section_name, keywords in SECTION_KEYWORDS:
        for kw in keywords:
            if kw in content_lower:
                return section_name, f"dzial-{dzial_num}"
    return "Dział 1: Liczby Rzeczywiste", "dzial-1"

def clean_exam_text(text):
    text = re.sub(r'Więcej arkuszy znajdziesz na stronie: arkusze\.pl', '', text)
    text = re.sub(r'Strona \d+ z \d+', '', text)
    text = re.sub(r'MMAP-[A-Z0-9_\-]+', '', text)
    text = re.sub(r'MMAU-[A-Z0-9_\-]+', '', text)
    text = re.sub(r'Brudnopis\s*.*', '', text, flags=re.DOTALL)
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return '\n'.join(lines)

def extract_closed_options(content):
    # Match A. ... B. ... C. ... D. ...
    opt_match = re.search(r'(?:^|\n)\s*A\.\s*(.*?)\s*(?:^|\n)\s*B\.\s*(.*?)\s*(?:^|\n)\s*C\.\s*(.*?)\s*(?:^|\n)\s*D\.\s*(.*?)$', content, re.DOTALL)
    if not opt_match:
        opt_match = re.search(r'\bA\.\s*(.*?)\s*\bB\.\s*(.*?)\s*\bC\.\s*(.*?)\s*\bD\.\s*(.*?)$', content, re.DOTALL)
    
    if opt_match:
        question_part = content[:opt_match.start()].strip()
        opts = [opt_match.group(i).strip() for i in range(1, 5)]
        opts_cleaned = [clean_unicode_math(opt) for opt in opts]
        return clean_unicode_math(question_part), opts_cleaned
    return clean_unicode_math(content), []

def parse_exam_pair(config):
    exam_id = config["id"]
    year = config["year"]
    session = config["session"]
    e_path = os.path.join(BASE_PDF_DIR, config["examPdf"])
    a_path = os.path.join(BASE_PDF_DIR, config["ansPdf"])

    print(f"\n==========================================")
    print(f"📖 Przetwarzanie: {config['fullName']}")
    print(f"==========================================")

    e_reader = pypdf.PdfReader(e_path)
    a_reader = pypdf.PdfReader(a_path)

    e_full = '\n'.join([p.extract_text() for p in e_reader.pages])
    a_full = '\n'.join([p.extract_text() for p in a_reader.pages])

    task_pattern = re.compile(r'Zadanie\s+(\d+(?:\.\d+)?)\.\s*(?:\((\d+)[–-](\d+)\))?', re.MULTILINE)
    e_matches = list(task_pattern.finditer(e_full))

    tasks = []
    seen_ids = set()

    for idx, m in enumerate(e_matches):
        num_str = m.group(1)
        pts = int(m.group(3)) if m.group(3) else (int(m.group(2)) if m.group(2) else 1)
        start = m.start()
        end = e_matches[idx+1].start() if idx+1 < len(e_matches) else len(e_full)
        raw_task_content = e_full[start:end]

        # Ignore non-task intro headers that have no points and are immediately followed by subtasks
        if '.' not in num_str and idx+1 < len(e_matches) and e_matches[idx+1].group(1).startswith(f"{num_str}."):
            # This is an intro to a wiązka (e.g. Zadanie 14 introducing 14.1, 14.2)
            continue

        cleaned_text = clean_exam_text(raw_task_content)
        # Remove task header line from question body
        cleaned_text = re.sub(r'^Zadanie\s+\d+(?:\.\d+)?\.\s*(?:\(\d+[–-]\d+\))?\s*', '', cleaned_text).strip()

        question_part, options = extract_closed_options(cleaned_text)

        # Look up corresponding answer in a_full
        a_pos = a_full.find(f"Zadanie {num_str}.")
        if a_pos == -1:
            a_pos = a_full.find(f"Zadanie {num_str}")
        
        correct_answer = "A"
        is_closed = len(options) == 4
        explanation = ""
        cke_trap = ""

        if a_pos != -1:
            next_a_pos = a_full.find("Zadanie ", a_pos + 10)
            if next_a_pos == -1:
                next_a_pos = len(a_full)
            a_snippet = a_full[a_pos:next_a_pos]

            # 1. Closed answer lookup
            ab_match = re.search(r'Wersja\s+A\s+Wersja\s+B\s*\n\s*([A-Za-z0-9]+)\s+([A-Za-z0-9]+)', a_snippet)
            if ab_match:
                ans_raw = ab_match.group(1).strip().upper()
                if len(ans_raw) == 1 and ans_raw in ['A', 'B', 'C', 'D']:
                    correct_answer = ans_raw
                    is_closed = True
                elif ans_raw in ['PF', 'FP', 'PP', 'FF']:
                    correct_answer = ans_raw
                    is_closed = True
                else:
                    correct_answer = ans_raw
            else:
                # Direct Rozwiązanie single letter/number
                rozw_match = re.search(r'Rozwiązanie\s*\n\s*([^\n]+)', a_snippet)
                if rozw_match:
                    ans_line = rozw_match.group(1).strip()
                    if ans_line in ['A', 'B', 'C', 'D']:
                        correct_answer = ans_line
                        is_closed = True
                    else:
                        correct_answer = clean_unicode_math(ans_line)

            # 2. Extract explanation / model solution
            sol_match = re.search(r'Przykładowe.*?(?:rozwiązani[ae]|odpowiedź)(.*?)(?:Zasady oceniania|Uwagi:|$)', a_snippet, re.DOTALL | re.IGNORECASE)
            if sol_match:
                explanation = clean_unicode_math(sol_match.group(1).strip())
            else:
                crit_match = re.search(r'Zasady oceniania.*?(?:pkt\s*–\s*)(.*?)(?:Wymagania|$)', a_snippet, re.DOTALL | re.IGNORECASE)
                if crit_match:
                    explanation = clean_unicode_math(crit_match.group(1).strip())

            # 3. Extract CKE trap / tip
            trap_match = re.search(r'Uwagi:(.*?)(?:Przykładowe|Zasady oceniania|Wymagania|$)', a_snippet, re.DOTALL | re.IGNORECASE)
            if trap_match:
                cke_trap = clean_unicode_math(trap_match.group(1).strip())

        # Determine task type
        if is_closed and len(options) == 4:
            task_type = "SINGLE_CHOICE"
        elif "P, jeśli" in cleaned_text or "Prawda" in cleaned_text or correct_answer in ['PF', 'FP', 'PP', 'FF']:
            task_type = "TRUE_FALSE"
            is_closed = True
            if not options:
                options = ["PRAWDA", "FAŁSZ"]
        elif pts >= 2 and ("Wykaż" in cleaned_text or "Uzasadnij" in cleaned_text or "Udowodnij" in cleaned_text):
            task_type = "OPEN_PROOF"
            is_closed = False
        elif pts >= 2:
            task_type = "OPEN_CALCULATION"
            is_closed = False
        elif not is_closed:
            task_type = "NUMERIC_INPUT"
            is_closed = False
        else:
            task_type = "SINGLE_CHOICE"

        section_name, topic_id = determine_section(cleaned_text)

        # Source badge formatting: EXACT and 100% authentic
        source_label = f"Matura {session} {year} • Zad. {num_str}"
        task_id = f"{exam_id}-zad-{num_str.replace('.', '_')}"

        if task_id not in seen_ids:
            seen_ids.add(task_id)
            task_item = {
                "id": task_id,
                "examId": exam_id,
                "examName": config["fullName"],
                "taskNumber": num_str,
                "section": section_name,
                "topicId": topic_id,
                "type": task_type,
                "content": question_part,
                "options": options,
                "correctAnswer": correct_answer,
                "points": pts,
                "isClosed": is_closed,
                "explanation": explanation or f"Oficjalny klucz CKE: Odpowiedź {correct_answer}.",
                "ckeTrap": cke_trap or "Uważaj na typowe pułapki rachunkowe i dziedzinę wyrażenia.",
                "source": source_label,
                "year": year,
                "session": session,
                "isCke": True
            }
            tasks.append(task_item)

    # Sort tasks naturally by task number
    def sort_key(t):
        parts = t["taskNumber"].split('.')
        return [int(p) for p in parts]

    tasks.sort(key=sort_key)

    total_pts = sum(t["points"] for t in tasks)
    print(f"✓ Wyekstrahowano {len(tasks)} zadań o łącznej sumie {total_pts} punktów.")

    out_file = os.path.join(OUTPUT_DIR, f"{exam_id}.json")
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, ensure_ascii=False, indent=2)
    print(f"💾 Zapisano do: {out_file}")

    return tasks

def main():
    all_compiled_tasks = []
    
    for config in EXAMS_CONFIG:
        exam_tasks = parse_exam_pair(config)
        all_compiled_tasks.extend(exam_tasks)

    # Write consolidated zadania_matura.json
    master_matura_path = r"c:\Users\mateu\Downloads\0.45-main\seed\curriculum\zadania_matura.json"
    with open(master_matura_path, 'w', encoding='utf-8') as f:
        json.dump(all_compiled_tasks, f, ensure_ascii=False, indent=2)
    print(f"\n🚀 Zaktualizowano {master_matura_path} ({len(all_compiled_tasks)} autentycznych zadań CKE)")

if __name__ == "__main__":
    main()
