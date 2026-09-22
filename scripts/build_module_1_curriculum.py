# -*- coding: utf-8 -*-
"""
build_module_1_curriculum.py - Główny skrypt budujący Moduł 1:
"NA 30% – ŻELAZNE PEWNIAKI MATURALNE (Tiers S+ i S)"
10 działów, 34 mikrolekcje, pełny standard Core-4 Bento + Nocturne Luminary SVG.
Zapisuje wynik bezpośrednio do: seed/curriculum/curriculum_matematyka.json
"""
import sys
import os
import json

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

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
from scripts.sanitize_curriculum_text import sanitize_topic_data

def build_full_curriculum():
    print("=" * 60)
    print("  BUDOWANIE MODUŁU 1: NA 30% - ŻELAZNE PEWNIAKI MATURALNE")
    print("  Standard: Core-4 Bento, Nocturne Luminary SVG, Autentyczne CKE")
    print("=" * 60)

    builders = [
        ("Potęgi i pierwiastki", build_topic_01),
        ("Logarytmy", build_topic_02),
        ("Wartość bezwzględna", build_topic_03),
        ("Wzory skróconego mnożenia i algebra", build_topic_04),
        ("Nierówności liniowe", build_topic_05),
        ("Równania w postaci iloczynowej", build_topic_06),
        ("Równania i wyrażenia wymierne", build_topic_07),
        ("Nierówności kwadratowe", build_topic_08),
        ("Odczytywanie informacji z wykresu funkcji", build_topic_09),
        ("Funkcja liniowa i jej własności", build_topic_10),
    ]

    topics = []
    total_lessons = 0
    total_tasks = 0

    for idx, (name, builder) in enumerate(builders, start=1):
        print(f"[{idx}/10] Budowanie i sanityzacja KaTeX: {name}...")
        topic_obj = builder()
        topic_obj = sanitize_topic_data(topic_obj)
        lesson_count = len(topic_obj.get("lessons", []))
        task_count = sum(len(l.get("tasks", [])) for l in topic_obj.get("lessons", []))
        total_lessons += lesson_count
        total_tasks += task_count
        print(f"       -> {lesson_count} lekcji, {task_count} zadań (100% KaTeX)")
        topics.append(topic_obj)

    print("-" * 60)
    print(f"Podsumowanie: {len(topics)} działów, {total_lessons} lekcji, {total_tasks} zadań.")

    curriculum = {
        "module_id": "modul-1-30-procent",
        "module_title": "MODUŁ 1: NA 30% – ŻELAZNE PEWNIAKI MATURALNE (Tiers S+ i S)",
        "module_description": "10 kluczowych tematów dających łącznie 15–18 punktów (gwarancja zdania matury). Każda lekcja w metodyce Core-4 Bento z grafikami Nocturne Luminary i autentycznymi zadaniami CKE 2022–2026.",
        "target_score": "30% - 36% (Gwarancja zdania)",
        "total_topics": len(topics),
        "total_lessons": total_lessons,
        "total_tasks": total_tasks,
        "topics": topics
    }

    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'seed', 'curriculum', 'curriculum_matematyka.json'))
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(curriculum, f, ensure_ascii=False, indent=2)

    file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Pomyślnie zapisano do: {output_path}")
    print(f"Rozmiar pliku JSON: {file_size_mb:.2f} MB")
    print("=" * 60)

if __name__ == '__main__':
    build_full_curriculum()
