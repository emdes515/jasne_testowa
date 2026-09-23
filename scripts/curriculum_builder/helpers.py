r"""
helpers.py - Pomocnicze fabryki zadań i lekcji dla Modułu 1 (Nocturne Luminary + Core-4)
Zapewnia bezwzględną regułę Prawdy Źródła (Truth of Source), czyste odznaki CKE / Trening JASNE,
eliminację symboli logiki formalnej (\iff, \implies, \lor, \land) oraz standaryzację pułapek CKE i podpowiedzi.
"""
import os
import json
import re

OFFICIAL_CKE_REF_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', '..', 'seed', 'curriculum', 'official_cke_tasks_reference.json')
)

OFFICIAL_CKE_TASKS = {}
if os.path.exists(OFFICIAL_CKE_REF_PATH):
    try:
        with open(OFFICIAL_CKE_REF_PATH, 'r', encoding='utf-8') as f:
            for item in json.load(f):
                b = item.get('badge', '').lower().strip()
                OFFICIAL_CKE_TASKS[b] = item
    except Exception:
        pass

def clean_cke_trap(trap_text):
    if not trap_text:
        return ''
    cleaned = re.sub(
        r'^(?:⚠️\s*)?(?:Typowy błąd|Najczęstszy błąd|Błąd)(?:\s*(?:maturalny|maturzysty|CKE))?:\s*',
        '',
        str(trap_text).strip(),
        flags=re.IGNORECASE
    )
    return cleaned

def clean_formal_logic(text):
    if not text or not isinstance(text, str):
        return text
    # Replace formal logic with friendly Polish words
    s = text
    s = s.replace(r'\iff', ' co oznacza, że ')
    s = s.replace(r'\implies', r' \text{ czyli } ')
    s = s.replace(r'\land', r' \text{ oraz } ')
    s = s.replace(r'\lor', r' \text{ lub } ')
    s = s.replace(r'\forall', r' \text{dla każdego } ')
    s = s.replace(r'\exists', r' \text{istnieje } ')
    # Clean redundant spaces
    s = re.sub(r'  +', ' ', s)
    return s

def check_content_match(question_text, cke_content):
    if not question_text or not cke_content:
        return True
    t1 = re.sub(r'\\[a-zA-Z]+', ' ', str(question_text))
    t2 = re.sub(r'\\[a-zA-Z]+', ' ', str(cke_content))
    w1 = set(re.findall(r'[a-zA-Z0-9ąćęłńóśźż]+', t1.lower()))
    w2 = set(re.findall(r'[a-zA-Z0-9ąćęłńóśźż]+', t2.lower()))
    stopwords = {
        'dokończ', 'zdanie', 'wybierz', 'właściwą', 'odpowiedź', 'spośród', 'podanych',
        'dla', 'każdej', 'liczby', 'jest', 'równa', 'oraz', 'lub', 'wartość', 'funkcja',
        'przedstawiono', 'rysunku', 'poniżej', 'zbiorem', 'wszystkich', 'rozwiązań',
        'rozwiązaniem', 'równania', 'nierówności', 'wyrażenia', 'na', 'w', 'z', 'do',
        'i', 'o', 'ze', 'za', 'po', 'od', 'się', 'że', 'to', 'co', 'gdzie', 'określona',
        'wzorem', 'rzeczywistej', 'rzeczywistych'
    }
    s1 = w1 - stopwords
    s2 = w2 - stopwords
    overlap = s1 & s2
    union = s1 | s2
    if not union:
        return True
    jaccard = len(overlap) / len(union)
    return jaccard >= 0.35 and len(overlap) >= 2

def resolve_badge_and_source(raw_source, question=None, correct_answer=None):
    if not raw_source:
        return 'Trening JASNE • Wzorzec CKE'
    
    s = str(raw_source).strip()
    slow = s.lower()
    
    # Informator CKE
    inf_m = re.search(r'informator\s+cke.*?zad(?:anie)?\.?\s*(\d+)', slow)
    if inf_m:
        return f"Informator CKE • Zad. {inf_m.group(1)}"
    
    # Matura claim: Matura [sesja] [rok] • Zad. [nr]
    m = re.search(r'matura\s+(?:cke\s+)?([a-ząćęłńóśźż]+)\s+(\d{4})\s*•\s*zad(?:anie)?\.?\s*(\d+(?:\.\d+)?)', slow)
    if m:
        month_raw = m.group(1)
        year = m.group(2)
        zad_num = m.group(3)
        month_map = {
            'maj': 'maj', 'czerwiec': 'czerwiec', 'sierpien': 'sierpień', 'sierpień': 'sierpień',
            'grudzien': 'grudzień', 'grudzień': 'grudzień', 'wrzesien': 'wrzesień', 'wrzesień': 'wrzesień', 'marzec': 'marzec'
        }
        month_clean = month_map.get(month_raw, month_raw)
        canonical = f"Matura {month_clean} {year} • Zad. {zad_num}"
        
        # Verify in official indexed CKE exams
        off_item = OFFICIAL_CKE_TASKS.get(canonical.lower())
        if off_item:
            if correct_answer is not None and off_item.get('ans'):
                ans_str = str(correct_answer).strip().upper()
                off_ans = str(off_item.get('ans')).strip().upper()
                if ans_str != off_ans:
                    # Answer mismatch -> fall back to training badge
                    return 'Trening JASNE • Wzorzec CKE'
            if question is not None and off_item.get('content'):
                if not check_content_match(question, off_item.get('content')):
                    # Content mismatch -> fall back to training badge
                    return 'Trening JASNE • Wzorzec CKE'
            return canonical
        else:
            return 'Trening JASNE • Wzorzec CKE'
            
    return 'Trening JASNE • Wzorzec CKE'

def make_sc_task(task_id, source, question, options_data, correct_id, explanation, cke_trap, diagram=None, number_line=None, plot=None):
    """
    options_data: lista krotek [('A', '$2^{16}$'), ('B', '$2^8$'), ...]
    lub słowników [{'id': 'A', 'text': '...'}]
    """
    options = []
    for item in options_data:
        if isinstance(item, tuple):
            opt_id, opt_text = item
            options.append({
                'id': opt_id,
                'text': opt_text,
                'content_latex': opt_text,
                'is_correct': (opt_id == correct_id)
            })
        elif isinstance(item, dict):
            options.append(item)

    cleaned_trap = clean_cke_trap(cke_trap)
    cleaned_exp = clean_formal_logic(explanation)
    canonical_badge = resolve_badge_and_source(source, question=question, correct_answer=correct_id)

    hint_1 = "Zajrzyj do Wybranych Wzorów Matematycznych CKE (Karta Wzorów) dla tego działu."
    hint_2 = cleaned_trap if cleaned_trap else "Zapisz pierwsze przekształcenie algebraiczne i uprość wyrażenie."

    task = {
        'id': task_id,
        'type': 'SINGLE_CHOICE',
        'points': 1,
        'maxPoints': 1,
        'badge': canonical_badge,
        'source_badge': canonical_badge,
        'source': canonical_badge,
        'cke_source': canonical_badge,
        'instruction': 'Wybierz właściwą odpowiedź spośród podanych.',
        'question': question,
        'content': question,
        'math_statement': question,
        'options': options,
        'correct_answer': correct_id,
        'correctAnswer': correct_id,
        'explanation': cleaned_exp,
        'ckeTrap': cleaned_trap,
        'cke_trap': cleaned_trap,
        'hint_1': hint_1,
        'hint_2': hint_2,
        'hints': {
            'level_1': hint_1,
            'level_2': hint_2
        },
        'diagram': diagram,
        'plot': plot if plot is not None else diagram,
        'numberLine': number_line
    }
    return task

def make_tf_task(task_id, source, question, correct_tf, explanation, cke_trap, diagram=None, plot=None, number_line=None):
    """
    correct_tf: 'PRAWDA' lub 'FAŁSZ' (lub 'P', 'F')
    """
    is_true = correct_tf in ['PRAWDA', 'P', 'True', True]
    correct_id = 'P' if is_true else 'F'
    options = [
        {'id': 'P', 'text': 'PRAWDA', 'content_latex': '\\text{PRAWDA}', 'is_correct': is_true},
        {'id': 'F', 'text': 'FAŁSZ', 'content_latex': '\\text{FAŁSZ}', 'is_correct': not is_true}
    ]

    cleaned_trap = clean_cke_trap(cke_trap)
    cleaned_exp = clean_formal_logic(explanation)
    canonical_badge = resolve_badge_and_source(source, question=question, correct_answer=correct_id)

    hint_1 = "Sprawdź definicję lub wzór z Karty Wzorów CKE odpowiadający temu pojęciu."
    hint_2 = cleaned_trap if cleaned_trap else "Wykonaj szybkie podstawienie lub podstaw prosty kontrprzykład liczbowy."

    return {
        'id': task_id,
        'type': 'TRUE_FALSE',
        'points': 1,
        'maxPoints': 1,
        'badge': canonical_badge,
        'source_badge': canonical_badge,
        'source': canonical_badge,
        'cke_source': canonical_badge,
        'instruction': 'Oceń prawdziwość poniższego zdania.',
        'question': question,
        'content': question,
        'math_statement': question,
        'options': options,
        'correct_answer': correct_id,
        'correctAnswer': correct_id,
        'explanation': cleaned_exp,
        'ckeTrap': cleaned_trap,
        'cke_trap': cleaned_trap,
        'hint_1': hint_1,
        'hint_2': hint_2,
        'hints': {
            'level_1': hint_1,
            'level_2': hint_2
        },
        'diagram': diagram,
        'plot': plot if plot is not None else diagram,
        'numberLine': number_line
    }

def make_numeric_task(task_id, source, question, correct_val, explanation, cke_trap, diagram=None, plot=None, number_line=None):
    cleaned_trap = clean_cke_trap(cke_trap)
    cleaned_exp = clean_formal_logic(explanation)
    canonical_badge = resolve_badge_and_source(source, question=question, correct_answer=correct_val)

    hint_1 = "Zastosuj odpowiedni wzór z Wybranych Wzorów Matematycznych CKE."
    hint_2 = cleaned_trap if cleaned_trap else "Wykonaj obliczenia krok po kroku i uprość wynik do ostatecznej postaci liczbowej."

    return {
        'id': task_id,
        'type': 'NUMERIC_INPUT',
        'points': 1,
        'maxPoints': 1,
        'badge': canonical_badge,
        'source_badge': canonical_badge,
        'source': canonical_badge,
        'cke_source': canonical_badge,
        'instruction': 'Wpisz poprawny wynik w pole poniżej.',
        'question': question,
        'content': question,
        'math_statement': question,
        'numeric_correct_answer': correct_val,
        'correct_answer': str(correct_val),
        'correctAnswer': str(correct_val),
        'explanation': cleaned_exp,
        'ckeTrap': cleaned_trap,
        'cke_trap': cleaned_trap,
        'hint_1': hint_1,
        'hint_2': hint_2,
        'hints': {
            'level_1': hint_1,
            'level_2': hint_2
        },
        'diagram': diagram,
        'plot': plot if plot is not None else diagram,
        'numberLine': number_line
    }

def make_open_task(task_id, source, question, points, scoring_key, explanation, cke_trap, diagram=None, plot=None, number_line=None):
    cleaned_trap = clean_cke_trap(cke_trap)
    cleaned_exp = clean_formal_logic(explanation)
    canonical_badge = resolve_badge_and_source(source, question=question)

    hint_1 = "Wypisz założenia, zidentyfikuj wzory CKE i określ strategię rozwiązania krok po kroku."
    hint_2 = cleaned_trap if cleaned_trap else "Wykonaj pierwsze przekształcenie algebraiczne (np. wspólna podstawa lub wyłączenie czynnika przed nawias)."

    return {
        'id': task_id,
        'type': 'OPEN_TASK',
        'points': points,
        'maxPoints': points,
        'badge': canonical_badge,
        'source_badge': canonical_badge,
        'source': canonical_badge,
        'cke_source': canonical_badge,
        'instruction': 'Rozwiąż zadanie i zapisz pełny tok rozumowania.',
        'question': question,
        'content': question,
        'math_statement': question,
        'scoring_key': scoring_key,
        'officialKey': scoring_key,
        'explanation': cleaned_exp,
        'ckeTrap': cleaned_trap,
        'cke_trap': cleaned_trap,
        'hint_1': hint_1,
        'hint_2': hint_2,
        'hints': {
            'level_1': hint_1,
            'level_2': hint_2
        },
        'diagram': diagram,
        'plot': plot if plot is not None else diagram,
        'numberLine': number_line
    }

def make_lesson(lesson_id, topic_id, title, concept_essence, matura_context, core_formulas, worked_example, exam_trap, visuals, tasks):
    """
    Kompiluje obiekt lekcji spełniający standard Core-4 Bento + Nocturne Luminary.
    Czysty tytuł bez wewnętrznych kodów bazodanowych (np. "L1.1.1:").
    """
    clean_title = re.sub(r'^L\d+(?:\.\d+)+\s*[:\-–]?\s*', '', title).strip()
    return {
        'id': lesson_id,
        'topic_id': topic_id,
        'title': clean_title,
        'estimated_time_minutes': 5,
        'estimated_time_formatted': '~5 min',
        'required_correct_tasks': 4,
        'theory_pill': {
            'title': clean_title,
            'concept_essence': concept_essence,
            'matura_context': matura_context,
            'core_formulas': core_formulas,
            'worked_example': {
                'problem': worked_example['problem'],
                'steps': worked_example['steps'],
                'result': worked_example.get('result', ''),
                'diagram': visuals.get('tab2'),
                'numberLine': visuals.get('numberLine') or None
            },
            'exam_trap': clean_cke_trap(exam_trap),
            'diagram': visuals.get('tab0'),
            'numberLine': visuals.get('numberLine') or None,
            'trapDiagram': visuals.get('tab3'),
            'trapNumberLine': visuals.get('trapNumberLine') or None
        },
        'formulaSheet': {
            'title': clean_title,
            'formulas': [
                {
                    'title': f.get('title', ''),
                    'latex': f.get('latex', ''),
                    'description': f.get('description', ''),
                    'in_cke_sheet': f.get('in_cke_sheet', True),
                    'cke_page': f.get('cke_page') if f.get('cke_page') is not None else ('-' if not f.get('in_cke_sheet', True) else 'str. 4'),
                    'numberLine': f.get('numberLine') or None,
                    'diagram': f.get('diagram') or None
                } for f in core_formulas
            ]
        },
        'tasks': tasks
    }
