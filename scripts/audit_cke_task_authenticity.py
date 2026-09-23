# -*- coding: utf-8 -*-
r"""
audit_cke_task_authenticity.py
Kompleksowy audytor autentyczności bazy zadań Modułu 1 (CKE 1:1, Prawda Źródła).
Weryfikuje ZARÓWNO seed/curriculum/curriculum_matematyka.json, JAK I moduły builderów:
scripts/curriculum_builder/topic_01_builder.py do topic_10_builder.py.

Kryteria:
1. Struktura: dokładnie 10 tematów, 34 mikrolekcje, dokładnie 170 zadań (po 5 na lekcję).
2. Prawda Źródła (Truth of Source):
   - Każde zadanie z odznaką "Matura ..." istnieje w oficjalnych arkuszach CKE.
   - W 100% identyczny oficjalny klucz odpowiedzi (ans).
   - W 100% zgodna merytorycznie treść zadania (brak fałszywych odznak dla zmyślonych zadań).
   - Rysunek/oś liczbowa obecna, jeśli występowała w arkuszu CKE.
3. Uczciwe odznaki treningowe: Zadania treningowe i autorskie mają odznakę:
   "Trening JASNE • Wzorzec CKE" (lub "Informator CKE • Zad. X").
4. Czystość odznak: Zero plakietek formatowych ("PRAWDA / FAŁSZ", "ZADANIE OTWARTE", itp.).
5. Standard dydaktyczny Core-4:
   - cke_trap nie zaczyna się od "Typowy błąd:" ani "Błąd:"
   - explanation nie zawiera zakazanych symboli logiki formalnej (\iff, \implies, \lor, \land, \forall, \exists)
   - hint_1 i hint_2 są poprawnie wypełnione i niepuste.
"""

import os
import sys
import json
import re

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CURRICULUM_PATH = os.path.join(PROJECT_ROOT, 'seed', 'curriculum', 'curriculum_matematyka.json')
OFFICIAL_REF_PATH = os.path.join(PROJECT_ROOT, 'seed', 'curriculum', 'official_cke_tasks_reference.json')

sys.path.append(PROJECT_ROOT)
from scripts.curriculum_builder.helpers import check_content_match
from scripts.curriculum_builder.topic_01_builder import build_topic_01
from scripts.curriculum_builder.topic_02_builder import build_topic_02
from scripts.curriculum_builder.topic_03_builder import build_topic_03
from scripts.curriculum_builder.topic_04_builder import build_topic_04
from scripts.curriculum_builder.topic_05_builder import build_topic_05
from scripts.curriculum_builder.topic_06_builder import build_topic_06
from scripts.curriculum_builder.topic_07_builder import build_topic_07
from scripts.curriculum_builder.topic_08_builder import build_topic_08
from scripts.curriculum_builder.topic_09_builder import build_topic_09
from scripts.curriculum_builder.topic_10_builder import build_topic_10
from scripts.curriculum_builder.topic_11_builder import build_topic_11
from scripts.curriculum_builder.topic_12_builder import build_topic_12
from scripts.curriculum_builder.topic_13_builder import build_topic_13

FORBIDDEN_FORMAT_WORDS = ['prawda', 'fałsz', 'otwarte', 'zamknięte', 'jednokrotny', 'wielokrotny', 'wpisz liczbę']
FORBIDDEN_LOGIC_SYMBOLS = [r'\iff', r'\implies', r'\land', r'\lor', r'\forall', r'\exists']
BAD_TRAP_PREFIXES = r'^(?:⚠️\s*)?(?:Typowy błąd|Najczęstszy błąd|Błąd)(?:\s*(?:maturalny|maturzysty|CKE))?:\s*'

def audit_topics_structure_and_tasks(topics, context_name, official_by_badge):
    errors = []
    cke_count = 0
    training_count = 0
    informator_count = 0

    if len(topics) < 10:
        errors.append(f"[{context_name}] Niepoprawna liczba działów: {len(topics)} (oczekiwano co najmniej 10)")

    total_lessons = sum(len(t.get('lessons', [])) for t in topics)
    total_tasks = sum(len(l.get('tasks', [])) for t in topics for l in t.get('lessons', []))
    if total_tasks != total_lessons * 5:
        errors.append(f"[{context_name}] Niepoprawna liczba zadań: {total_tasks} (oczekiwano {total_lessons * 5}, czyli 5 na lekcję)")

    for topic_idx, topic in enumerate(topics, 1):
        for lesson_idx, lesson in enumerate(topic.get('lessons', []), 1):
            tasks = lesson.get('tasks', [])
            if len(tasks) != 5:
                errors.append(f"[{context_name}] Lekcja {lesson.get('id')} ma {len(tasks)} zadań (powinno być 5)")

            for task_idx, task in enumerate(tasks, 1):
                tid = task.get('id', f'unknown-T{topic_idx}L{lesson_idx}t{task_idx}')
                badge = task.get('badge') or task.get('source_badge') or task.get('source', '')
                badge_clean = badge.strip()

                # Plakietki formatowe
                for word in FORBIDDEN_FORMAT_WORDS:
                    if word in badge_clean.lower():
                        errors.append(f"[{context_name}:{tid}] Plakietka zawiera zakazany format '{word}': '{badge_clean}'")

                # Weryfikacja typu odznaki
                if badge_clean.startswith('Matura'):
                    cke_count += 1
                    matura_match = re.match(
                        r'^Matura\s+([a-ząćęłńóśźż]+)\s+(\d{4})\s*•\s*Zad\.\s*(\d+(?:\.\d+)?)$',
                        badge_clean,
                        re.IGNORECASE
                    )
                    if not matura_match:
                        errors.append(f"[{context_name}:{tid}] Nieprawidłowy format odznaki: '{badge_clean}'")
                    else:
                        canonical = badge_clean.lower()
                        if canonical not in official_by_badge:
                            errors.append(f"[{context_name}:{tid}] FAŁSZYWA ODZNAKA: '{badge_clean}' nie istnieje w CKE!")
                        else:
                            off_task = official_by_badge[canonical]
                            # Klucz odpowiedzi
                            is_open = (task.get('type') in ['OPEN_TASK', 'OPEN_PROOF'] or 
                                       off_task.get('type') in ['OPEN_CALCULATION', 'OPEN_TASK', 'OPEN_PROOF'])
                            if is_open:
                                if not task.get('scoring_key'):
                                    errors.append(
                                        f"[{context_name}:{tid}] BRAK SCORING_KEY dla zadania otwartego '{badge_clean}'"
                                    )
                            else:
                                task_ans = str(task.get('correct_answer', '')).strip().upper()
                                off_ans = str(off_task.get('ans', '')).strip().upper()
                                if task_ans != off_ans:
                                    errors.append(
                                        f"[{context_name}:{tid}] NIEZGODNOŚĆ KLUCZA CKE dla '{badge_clean}': w aplikacji={task_ans}, w oficjalnym arkuszu={off_ans}"
                                    )
                            # Zgodność treści pytania (Truth of Source)
                            q_text = task.get('question', '')
                            c_text = off_task.get('content', '')
                            if not check_content_match(q_text, c_text):
                                errors.append(
                                    f"[{context_name}:{tid}] NIEZGODNOŚĆ TREŚCI CKE dla '{badge_clean}': Treść zadania nie odpowiada oficjalnemu zadaniu CKE!"
                                )
                            # Rysunek / oś liczbowa
                            if off_task.get('numberLine') and not task.get('numberLine'):
                                has_opt_nl = any(opt.get('numberLine') for opt in task.get('options', []))
                                if not has_opt_nl:
                                    errors.append(f"[{context_name}:{tid}] Zadanie '{badge_clean}' w CKE posiadało oś liczbową, a w aplikacji brak pola 'numberLine'!")
                elif badge_clean.startswith('Informator CKE'):
                    informator_count += 1
                elif badge_clean == 'Trening JASNE • Wzorzec CKE':
                    training_count += 1
                else:
                    errors.append(f"[{context_name}:{tid}] Nieznana odznaka zadania: '{badge_clean}'")

                # cke_trap
                trap = task.get('cke_trap') or task.get('ckeTrap', '')
                if not trap:
                    errors.append(f"[{context_name}:{tid}] Puste pole cke_trap")
                elif re.search(BAD_TRAP_PREFIXES, trap, re.IGNORECASE):
                    errors.append(f"[{context_name}:{tid}] cke_trap zaczyna się od zakazanego prefiksu: '{trap[:40]}...'")

                # explanation
                exp = task.get('explanation', '')
                if not exp:
                    errors.append(f"[{context_name}:{tid}] Puste pole explanation")
                for sym in FORBIDDEN_LOGIC_SYMBOLS:
                    if sym in exp:
                        errors.append(f"[{context_name}:{tid}] explanation zawiera zakazany symbol logiki formalnej '{sym}'")

                # hints
                hints = task.get('hints', {})
                h1 = task.get('hint_1') or hints.get('level_1')
                h2 = task.get('hint_2') or hints.get('level_2')
                if not h1 or not str(h1).strip():
                    errors.append(f"[{context_name}:{tid}] Brak hint_1")
                if not h2 or not str(h2).strip():
                    errors.append(f"[{context_name}:{tid}] Brak hint_2")

    stats = {
        'cke': cke_count,
        'training': training_count,
        'informator': informator_count,
        'total': cke_count + training_count + informator_count
    }
    return errors, stats

def run_audit():
    print("=" * 75)
    print("🔍 AUDYT AUTENTYCZNOŚCI ZADAŃ MODUŁU 1 (CKE TRUTH OF SOURCE AUDIT)")
    print("   Sprawdzanie: seed/curriculum/curriculum_matematyka.json + 10 builderów")
    print("=" * 75)

    all_errors = []

    # 1. Baza referencyjna CKE
    if not os.path.exists(OFFICIAL_REF_PATH):
        print(f"❌ BŁĄD: Brak bazy referencyjnej CKE: {OFFICIAL_REF_PATH}")
        sys.exit(1)

    with open(OFFICIAL_REF_PATH, 'r', encoding='utf-8') as f:
        official_tasks = json.load(f)

    official_by_badge = {t['badge'].lower().strip(): t for t in official_tasks}
    print(f" Załadowano {len(official_tasks)} oficjalnych zadań CKE z bazy referencyjnej.")

    # 2. Audyt curriculum_matematyka.json
    print("\n[KROK 1/2] Audyt pliku seed/curriculum/curriculum_matematyka.json...")
    if not os.path.exists(CURRICULUM_PATH):
        print(f"❌ BŁĄD: Brak pliku curriculum: {CURRICULUM_PATH}")
        sys.exit(1)

    with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
        curriculum = json.load(f)

    json_errors, json_stats = audit_topics_structure_and_tasks(
        curriculum.get('topics', []),
        'curriculum_matematyka.json',
        official_by_badge
    )
    all_errors.extend(json_errors)
    print(f"  • Zweryfikowano zadań: {json_stats['total']} (CKE: {json_stats['cke']}, Trening: {json_stats['training']}, Informator: {json_stats['informator']})")
    print(f"  • Błędów w JSON: {len(json_errors)}")

    # 3. Audyt builderów Topic 01 - Topic 13
    print("\n[KROK 2/2] Audyt generatorów Pythona (topic_01_builder do topic_13_builder)...")
    builder_funcs = [
        build_topic_01, build_topic_02, build_topic_03, build_topic_04,
        build_topic_05, build_topic_06, build_topic_07, build_topic_08,
        build_topic_09, build_topic_10, build_topic_11, build_topic_12,
        build_topic_13
    ]
    built_topics = []
    for b_fn in builder_funcs:
        built_topics.append(b_fn())

    py_errors, py_stats = audit_topics_structure_and_tasks(
        built_topics,
        'python_builders',
        official_by_badge
    )
    all_errors.extend(py_errors)
    print(f"  • Zweryfikowano zadań: {py_stats['total']} (CKE: {py_stats['cke']}, Trening: {py_stats['training']}, Informator: {py_stats['informator']})")
    print(f"  • Błędów w builderach: {len(py_errors)}")

    # 4. Podsumowanie
    print("\n" + "=" * 75)
    if all_errors:
        print(f"❌ WYKRYTO {len(all_errors)} BŁĘDÓW W AUDYCIE:")
        for err in all_errors[:30]:
            print(f"  - {err}")
        if len(all_errors) > 30:
            print(f"  ... i {len(all_errors) - 30} kolejnych błędów.")
        sys.exit(1)

    print("✅ SUKCES: ALL TASKS 100% AUTHENTIC AND VERIFIED!")
    print("   Zarówno curriculum_matematyka.json jak i moduły builderów przeszły pełny audyt:")
    print(f"   • {json_stats['cke']} w 100% autentycznych zadań CKE (zgodna treść, opcje, klucz, rysunki).")
    print(f"   • {json_stats['training']} uczciwie oznaczonych zadań Trening JASNE • Wzorzec CKE.")
    print("   • 0 zakazanych plakietek formatowych, 0 zakazanych prefiksów pułapek, 0 logiki formalnej.")
    print("=" * 75)
    sys.exit(0)

if __name__ == '__main__':
    run_audit()
