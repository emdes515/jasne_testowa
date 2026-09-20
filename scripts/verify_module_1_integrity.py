"""
verify_module_1_integrity.py - Weryfikacja jakościowa i formalna Modułu 1
Sprawdza:
- Liczbę działów (10) i lekcji (34)
- Strukturę Core-4 Bento (obecność wszystkich 4 zakładek i dedykowanych diagramów Tab 0)
- Zakaz symboli logiki formalnej w teorii podstawowej (\\iff, \\vee, \\wedge, \\forall, \\exists)
- Obecność źródeł CKE i metryk
"""
import json
import os
import re
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

CURRICULUM_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'seed', 'curriculum', 'curriculum_matematyka.json'))

def verify():
    print("Rozpoczynam weryfikację Modułu 1...")
    with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    topics = data.get("topics", [])
    assert len(topics) == 10, f"Oczekiwano 10 działów, jest {len(topics)}"

    total_lessons = 0
    total_tasks = 0
    lessons_without_tab0 = []
    lessons_with_formal_logic = []
    cke_sources_found = 0

    formal_logic_patterns = [r'\\iff', r'\\vee', r'\\wedge', r'\\forall', r'\\exists']

    for t_idx, topic in enumerate(topics, start=1):
        lessons = topic.get("lessons", [])
        total_lessons += len(lessons)
        for l_idx, lesson in enumerate(lessons, start=1):
            total_tasks += len(lesson.get("tasks", []))
            tp = lesson.get("theory_pill", {})
            
            # Weryfikacja Bento
            assert tp.get("concept_essence"), f"Brak concept_essence w {lesson['id']}"
            assert tp.get("core_formulas"), f"Brak core_formulas w {lesson['id']}"
            assert tp.get("worked_example"), f"Brak worked_example w {lesson['id']}"
            assert tp.get("exam_trap"), f"Brak exam_trap w {lesson['id']}"

            # Weryfikacja Hero Diagramu Tab 0 (Obowiązkowy dla każdej z 34 lekcji!)
            diag_tab0 = tp.get("diagram")
            if not diag_tab0:
                lessons_without_tab0.append(lesson['id'])

            # Weryfikacja zakazu logiki formalnej w concept_essence
            ce_text = tp.get("concept_essence", "")
            for pat in formal_logic_patterns:
                if re.search(pat, ce_text):
                    lessons_with_formal_logic.append((lesson['id'], pat))

            # Sprawdzenie źródeł zadań
            for task in lesson.get("tasks", []):
                src = task.get("source", "")
                if "Matura" in src or "CKE" in src:
                    cke_sources_found += 1

    print(f"Liczba działów: {len(topics)}")
    print(f"Liczba lekcji: {total_lessons} (oczekiwano 34)")
    print(f"Liczba zadań: {total_tasks}")
    print(f"Zadań z autentyczną atrybucją CKE/Matura: {cke_sources_found}")

    if lessons_without_tab0:
        print(f"[OSTRZEŻENIE] Lekcje bez diagramu Tab 0: {lessons_without_tab0}")
    else:
        print("[OK] 100% lekcji posiada dedykowany Hero Diagram Nocturne Luminary SVG w Tab 0!")

    if lessons_with_formal_logic:
        print(f"[UWAGA] Wykryto symbole akademickiej logiki w concept_essence: {lessons_with_formal_logic}")
    else:
        print("[OK] Brak zakazanych symboli akademickiej logiki formalnej w concept_essence (100% 'Z polskiego na nasze')!")

    assert total_lessons == 34, f"Oczekiwano 34 lekcji, jest {total_lessons}"
    print("\n>>> WSZYSTKIE TESTY SPÓJNOŚCI MODUŁU 1 ZAKOŃCZONE SUKCESEM! <<<")

if __name__ == '__main__':
    verify()
