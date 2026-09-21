# -*- coding: utf-8 -*-
"""
sanitize_curriculum_text.py - Bezpieczny procesor formatowania KaTeX dla treści Modułu 1.
Gwarantuje, że każde wyrażenie matematyczne w pigułkach wiedzy, zadaniach i wskazówkach
jest poprawnie otoczone znacznikami $...$ i sformatowane zgodnie z regułami KaTeX.
"""
import re

TOPIC_METADATA = {
    'dzial-1': {
        'short_title': 'Potęgi i pierwiastki',
        'importance': 'Pewniak CKE (Tier S+)',
        'matura_points_range': '2–4 pkt'
    },
    'dzial-2': {
        'short_title': 'Logarytmy',
        'importance': 'Pewniak CKE (Tier S+)',
        'matura_points_range': '1–2 pkt'
    },
    'dzial-3': {
        'short_title': 'Wartość bezwzględna',
        'importance': 'Pewniak CKE (Tier S)',
        'matura_points_range': '1–2 pkt'
    },
    'dzial-4': {
        'short_title': 'Wzory skróconego mnożenia i algebra',
        'importance': 'Pewniak CKE (Tier S)',
        'matura_points_range': '1–2 pkt'
    },
    'dzial-5': {
        'short_title': 'Nierówności liniowe',
        'importance': 'Pewniak CKE (Tier S)',
        'matura_points_range': '1–2 pkt'
    },
    'dzial-6': {
        'short_title': 'Równania w postaci iloczynowej',
        'importance': 'Pewniak CKE (Tier S)',
        'matura_points_range': '1–2 pkt'
    },
    'dzial-7': {
        'short_title': 'Równania i wyrażenia wymierne',
        'importance': 'Pewniak CKE (Tier S)',
        'matura_points_range': '1–2 pkt'
    },
    'dzial-8': {
        'short_title': 'Nierówności kwadratowe',
        'importance': 'Pewniak CKE (Tier S+)',
        'matura_points_range': '2–3 pkt'
    },
    'dzial-9': {
        'short_title': 'Odczytywanie informacji z wykresu funkcji',
        'importance': 'Pewniak CKE (Tier S)',
        'matura_points_range': '1–3 pkt'
    },
    'dzial-10': {
        'short_title': 'Funkcja liniowa i jej własności',
        'importance': 'Pewniak CKE (Tier S+)',
        'matura_points_range': '2–4 pkt'
    }
}

def clean_math_string(s):
    """
    Czyści i standaryzuje wyrażenie matematyczne wewnątrz $...$.
    """
    if not s:
        return ''
    s = s.strip()
    s = re.sub(r'>=', r'\\ge ', s)
    s = re.sub(r'<=', r'\\le ', s)
    s = re.sub(r'!=', r'\\neq ', s)
    s = re.sub(r'·', r' \\cdot ', s)
    # a^(b^c) -> a^{(b^c)}
    s = re.sub(r'\^(\([^\)]+\))', r'^{\1}', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def sanitize_math_in_prose(text):
    """
    Automatycznie zamienia surowe ASCII math w tekście na poprawny KaTeX ($...$).
    """
    if not text or not isinstance(text, str):
        return text

    # Krok 1: Ochrona istniejących bloków KaTeX
    math_blocks = []
    def save_math(match):
        math_blocks.append(match.group(0))
        return f"___MATH_BLOCK_{len(math_blocks)-1}___"

    # Wykrywaj $$, $, \[, \begin{cases}...\end{cases}
    s = re.sub(r'\$\$[\s\S]*?\$\$', save_math, text)
    s = re.sub(r'\$[^\$]+?\$', save_math, s)
    s = re.sub(r'\\\[[\s\S]*?\\\]', save_math, s)
    s = re.sub(r'\\begin\{cases\}[\s\S]*?\\end\{cases\}', save_math, s)

    # Krok 2: Transformacje surowego tekstu poza $...$

    # 2a. Konkretne znane pułapki maturalne (np. z lekcji 1.1)
    s = re.sub(r'\(a\^2\)\^3\s*=\s*a\^6', r'$(a^2)^3 = a^6$', s)
    s = re.sub(r'a\^\(2\^3\)\s*=\s*a\^8', r'$a^{(2^3)} = a^8$', s)
    s = re.sub(r'2\s*·\s*2\s*to\s*nadal\s*podstawa\s*2,\s*nie\s*4!', r'$2 \\cdot 2$ to nadal podstawa $2$, nie $4$!', s)
    s = re.sub(r'm\s*-\s*\(-n\)\s*=\s*m\s*\+\s*n', r'$m - (-n) = m + n$', s)

    # 2b. Samotne komendy \sqrt{...} bez $
    s = re.sub(r'(?<!\$)\\sqrt\{([^{}]+)\}(?!\$)', r'$\\sqrt{\1}$', s)
    s = re.sub(r'(?<!\$)sqrt\(([^()]+)\)(?!\$)', r'$\\sqrt{\1}$', s)

    # 2c. Potęgowanie potęgi w nawiasie: e.g. (3^2)^4 = 3^8 lub (x+1)^2
    s = re.sub(r'(^|[\s(])(\([a-zA-Z\d\^+\-*/·]+\)\^[a-zA-Z\d\^+\-*/()]+(?:\s*=\s*[a-zA-Z\d\^+\-*/()]+)?)(?=[\s).,;!?]|$)',
               lambda m: f"{m.group(1)}${clean_math_string(m.group(2))}$", s)

    # 2d. Potęgi z nawiasem w wykładniku: a^(2^3)
    s = re.sub(r'(^|[\s(])([a-zA-Z\d]+\^\([a-zA-Z\d\^+\-*/()]+\)(?:\s*=\s*[a-zA-Z\d\^+\-*/()]+)?)(?=[\s).,;!?]|$)',
               lambda m: f"{m.group(1)}${clean_math_string(m.group(2))}$", s)

    # 2e. Standalone nierówności/równości z jedną literą: e.g. b >= 0, x > 14, x < 5, x != -3
    s = re.sub(r'(^|[\s(])([a-zA-Z]\s*(?:>=|<=|!=|>|<|=)\s*[-+]?\d+)(?=[\s).,;!?]|$)',
               lambda m: f"{m.group(1)}${clean_math_string(m.group(2))}$", s)

    # 2f. Standalone potęgi z daszkiem: e.g. x^2, x^3, 2^3, a^n, 4x^2, 3x^2, 125^4
    s = re.sub(r'(^|[\s(])([+-]?(?:\d+|[a-zA-Z\d]+)\^[a-zA-Z\d\^+\-]+)(?=[\s).,;!?]|$)',
               lambda m: f"{m.group(1)}${clean_math_string(m.group(2))}$", s)

    # 2g. Równości z prostymi operacjami: e.g. 3 + 4 = 7, 3 - 5 = -2, 16 - 12 = 4, 25 = 5^2, 125 = 5^3
    s = re.sub(r'(^|[\s(])(\d+\s*[\+\-\*\/·]\s*\d+\s*=\s*[-+]?\d+)(?=[\s).,;!?]|$)',
               lambda m: f"{m.group(1)}${clean_math_string(m.group(2))}$", s)
    s = re.sub(r'(^|[\s(])(\d+\s*=\s*\d+\^\d+)(?=[\s).,;!?]|$)',
               lambda m: f"{m.group(1)}${clean_math_string(m.group(2))}$", s)

    # 2h. Równości algebraiczne proste: e.g. 2x - 1 = x, 2x^2 - 6x = 0, x^2 - 16 = 0, 4t + 100 = 0
    s = re.sub(r'(^|[\s(])([a-zA-Z\d\^+\-*/\(\)]+\s*=\s*[-+]?[a-zA-Z\d\^+\-*/\(\)]+)(?=[\s).,;!?]|$)',
               lambda m: f"{m.group(1)}${clean_math_string(m.group(2))}$" if ('^' in m.group(2) or '+' in m.group(2) or '-' in m.group(2)) and not re.search(r'[a-zA-Z]{4,}', m.group(2)) else m.group(0), s)

    # Krok 3: Przywrócenie chronionych bloków
    for idx, mb in enumerate(math_blocks):
        s = s.replace(f"___MATH_BLOCK_{idx}___", mb)

    return s

def sanitize_topic_data(topic):
    """
    Kompleksowo sanityzuje cały obiekt działu (topic) Modułu 1.
    """
    topic_id = topic.get('id', '')
    if topic_id in TOPIC_METADATA:
        meta = TOPIC_METADATA[topic_id]
        topic['short_title'] = meta['short_title']
        if 'importance' not in topic or not topic['importance']:
            topic['importance'] = meta['importance']
        if 'matura_points_range' not in topic or not topic['matura_points_range']:
            topic['matura_points_range'] = meta['matura_points_range']

    for lesson in topic.get('lessons', []):
        pill = lesson.get('theory_pill', {})
        if pill:
            if 'concept_essence' in pill:
                pill['concept_essence'] = sanitize_math_in_prose(pill['concept_essence'])
            if 'matura_context' in pill:
                pill['matura_context'] = sanitize_math_in_prose(pill['matura_context'])
            if 'exam_trap' in pill:
                pill['exam_trap'] = sanitize_math_in_prose(pill['exam_trap'])
            if 'keyTakeaway' in pill:
                pill['keyTakeaway'] = sanitize_math_in_prose(pill['keyTakeaway'])

            # core_formulas
            for form in pill.get('core_formulas', []):
                if 'matura_tip' in form:
                    form['matura_tip'] = sanitize_math_in_prose(form['matura_tip'])
                if 'mnemonic' in form:
                    form['mnemonic'] = sanitize_math_in_prose(form['mnemonic'])
                if 'description' in form:
                    form['description'] = sanitize_math_in_prose(form['description'])
                # Upewnij się, że example ma postać z $...$
                if 'example' in form and form['example']:
                    ex = form['example'].strip()
                    if not ex.startswith('$'):
                        form['example'] = f"${clean_math_string(ex)}$"

            # worked_example
            we = pill.get('worked_example', {})
            if isinstance(we, dict):
                if 'problem' in we:
                    we['problem'] = sanitize_math_in_prose(we['problem'])
                for step in we.get('steps', []):
                    if 'text' in step:
                        step['text'] = sanitize_math_in_prose(step['text'])

        # formulaSheet
        fs = lesson.get('formulaSheet', {})
        if fs and 'formulas' in fs:
            for form in fs['formulas']:
                if 'description' in form:
                    form['description'] = sanitize_math_in_prose(form['description'])

        # tasks
        for task in lesson.get('tasks', []):
            if 'question' in task:
                task['question'] = sanitize_math_in_prose(task['question'])
            if 'content' in task:
                task['content'] = sanitize_math_in_prose(task['content'])
            if 'math_statement' in task:
                task['math_statement'] = sanitize_math_in_prose(task['math_statement'])
            if 'explanation' in task:
                task['explanation'] = sanitize_math_in_prose(task['explanation'])
            if 'cke_trap' in task:
                task['cke_trap'] = sanitize_math_in_prose(task['cke_trap'])
            if 'ckeTrap' in task:
                task['ckeTrap'] = sanitize_math_in_prose(task['ckeTrap'])
            if 'hints' in task and isinstance(task['hints'], dict):
                for hk in task['hints']:
                    task['hints'][hk] = sanitize_math_in_prose(task['hints'][hk])
            for opt in task.get('options', []):
                if isinstance(opt, dict) and 'text' in opt:
                    opt['text'] = sanitize_math_in_prose(opt['text'])

    return topic
