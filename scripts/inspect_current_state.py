# -*- coding: utf-8 -*-
import sys, os, json
sys.path.append('.')

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
from scripts.curriculum_builder.topic_14_builder import build_topic_14
from scripts.curriculum_builder.topic_15_builder import build_topic_15
from scripts.curriculum_builder.topic_16_builder import build_topic_16
from scripts.curriculum_builder.topic_17_builder import build_topic_17
from scripts.curriculum_builder.topic_18_builder import build_topic_18
from scripts.curriculum_builder.topic_19_builder import build_topic_19
from scripts.curriculum_builder.topic_20_builder import build_topic_20
from scripts.curriculum_builder.topic_21_builder import build_topic_21

builders = [
    build_topic_01, build_topic_02, build_topic_03, build_topic_04,
    build_topic_05, build_topic_06, build_topic_07, build_topic_08,
    build_topic_09, build_topic_10, build_topic_11, build_topic_12,
    build_topic_13, build_topic_14, build_topic_15, build_topic_16,
    build_topic_17, build_topic_18, build_topic_19, build_topic_20,
    build_topic_21
]

total_lessons = 0
total_tasks = 0
if __name__ == '__main__':
    total_lessons = 0
    total_tasks = 0
    for idx, b in enumerate(builders, 1):
        t = b()
        lessons = t.get('lessons', [])
        total_lessons += len(lessons)
        task_counts = [len(l.get('tasks', [])) for l in lessons]
        total_tasks += sum(task_counts)
        print(f"Topic {idx:02d}: {t.get('id')} | lessons: {len(lessons)} | task counts: {task_counts}")
        for l_idx, l in enumerate(lessons):
            types_summary = [tsk.get('type') for tsk in l.get('tasks', [])]
            badges = [tsk.get('badge') for tsk in l.get('tasks', [])]
            print(f"   L{l_idx+1}: {l.get('title')[:35]} -> {types_summary}")

    print(f"\nTOTAL: {len(builders)} topics, {total_lessons} lessons, {total_tasks} tasks")

