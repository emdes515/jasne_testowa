"""
__init__.py - Główny dyspozytor diagramów wektorowych SVG dla 225 lekcji matematyki.
"""
from .topic_01 import get_topic_01_visuals
from .topic_02 import get_topic_02_visuals
from .topic_03 import get_topic_03_visuals
from .topic_04 import get_topic_04_visuals
from .topic_05 import get_topic_05_visuals
from .topic_06 import get_topic_06_visuals
from .topic_07 import get_topic_07_visuals
from .topic_08 import get_topic_08_visuals
from .topic_09 import get_topic_09_visuals
from .topic_10 import get_topic_10_visuals
from .topic_11 import get_topic_11_visuals
from .topic_12 import get_topic_12_visuals
from .topic_13 import get_topic_13_visuals
from .topic_14 import get_topic_14_visuals
from .topic_15 import get_topic_15_visuals

TOPIC_DISPATCHER = {
    1: get_topic_01_visuals,
    2: get_topic_02_visuals,
    3: get_topic_03_visuals,
    4: get_topic_04_visuals,
    5: get_topic_05_visuals,
    6: get_topic_06_visuals,
    7: get_topic_07_visuals,
    8: get_topic_08_visuals,
    9: get_topic_09_visuals,
    10: get_topic_10_visuals,
    11: get_topic_11_visuals,
    12: get_topic_12_visuals,
    13: get_topic_13_visuals,
    14: get_topic_14_visuals,
    15: get_topic_15_visuals,
}

def get_visuals_for_lesson(topic_id, lesson_id, lesson_title, lesson_idx):
    """
    Pobiera dedykowany zestaw 4 diagramów/osi liczbowych Bento (tab0, tab1, tab2, tab3)
    dla konkretnej lekcji z 225 lekcji matematyki.
    """
    try:
        t_num = int(str(topic_id).replace('dzial-', '').strip())
    except ValueError:
        t_num = 1

    handler = TOPIC_DISPATCHER.get(t_num, get_topic_01_visuals)
    return handler(lesson_idx, lesson_id, lesson_title)
