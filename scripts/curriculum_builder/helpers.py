"""
helpers.py - Pomocnicze fabryki zadań i lekcji dla Modułu 1 (Nocturne Luminary + Core-4)
"""
import re

def make_sc_task(task_id, source, question, options_data, correct_id, explanation, cke_trap, diagram=None, number_line=None):
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

    task = {
        'id': task_id,
        'type': 'SINGLE_CHOICE',
        'points': 1,
        'source': source,
        'cke_source': source,
        'instruction': 'Wybierz właściwą odpowiedź spośród podanych.',
        'question': question,
        'content': question,
        'math_statement': question,
        'options': options,
        'correct_answer': correct_id,
        'correctAnswer': correct_id,
        'explanation': explanation,
        'ckeTrap': cke_trap,
        'cke_trap': cke_trap,
        'hints': {
            'level_1': 'Zastanów się, jaki wzór lub reguła ma tu bezpośrednie zastosowanie.',
            'level_2': cke_trap
        },
        'diagram': diagram,
        'plot': diagram,
        'numberLine': number_line
    }
    return task

def make_tf_task(task_id, source, question, correct_tf, explanation, cke_trap):
    """
    correct_tf: 'PRAWDA' lub 'FAŁSZ' (lub 'P', 'F')
    """
    is_true = correct_tf in ['PRAWDA', 'P', 'True', True]
    correct_id = 'P' if is_true else 'F'
    options = [
        {'id': 'P', 'text': 'PRAWDA', 'content_latex': '\\text{PRAWDA}', 'is_correct': is_true},
        {'id': 'F', 'text': 'FAŁSZ', 'content_latex': '\\text{FAŁSZ}', 'is_correct': not is_true}
    ]
    return {
        'id': task_id,
        'type': 'TRUE_FALSE',
        'points': 1,
        'source': source,
        'cke_source': source,
        'instruction': 'Oceń prawdziwość poniższego zdania.',
        'question': question,
        'content': question,
        'math_statement': question,
        'options': options,
        'correct_answer': correct_id,
        'correctAnswer': correct_id,
        'explanation': explanation,
        'ckeTrap': cke_trap,
        'cke_trap': cke_trap,
        'hints': {
            'level_1': 'Sprawdź definicję lub wykonaj szybkie podstawienie.',
            'level_2': cke_trap
        },
        'diagram': None,
        'plot': None,
        'numberLine': None
    }

def make_numeric_task(task_id, source, question, correct_val, explanation, cke_trap):
    return {
        'id': task_id,
        'type': 'NUMERIC_INPUT',
        'points': 1,
        'source': source,
        'cke_source': source,
        'instruction': 'Wpisz poprawny wynik w pole poniżej.',
        'question': question,
        'content': question,
        'math_statement': question,
        'numeric_correct_answer': correct_val,
        'correct_answer': str(correct_val),
        'correctAnswer': str(correct_val),
        'explanation': explanation,
        'ckeTrap': cke_trap,
        'cke_trap': cke_trap,
        'hints': {
            'level_1': 'Wykonaj obliczenia krok po kroku i uprość wynik do najprostszej postaci.',
            'level_2': cke_trap
        },
        'diagram': None,
        'plot': None,
        'numberLine': None
    }

def make_open_task(task_id, source, question, points, scoring_key, explanation, cke_trap, diagram=None):
    return {
        'id': task_id,
        'type': 'OPEN_TASK',
        'points': points,
        'maxPoints': points,
        'source': source,
        'cke_source': source,
        'instruction': 'Rozwiąż zadanie i zapisz pełny tok rozumowania.',
        'question': question,
        'content': question,
        'math_statement': question,
        'scoring_key': scoring_key,
        'officialKey': scoring_key,
        'explanation': explanation,
        'ckeTrap': cke_trap,
        'cke_trap': cke_trap,
        'hints': {
            'level_1': 'Wypisz dane, załóż odpowiednie warunki i zapisz kolejne kroki algorytmu.',
            'level_2': cke_trap
        },
        'diagram': diagram,
        'plot': diagram,
        'numberLine': None
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
            'exam_trap': exam_trap,
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
