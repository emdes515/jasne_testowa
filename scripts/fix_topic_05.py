import re

path = r"scripts\curriculum_builder\topic_05_builder.py"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find all make_xxxx_task calls and their kwargs.
# But it's easier to just match plot={ ... } and replace it based on some heuristic or just hardcode the replacements for topic 5.

# 1. ray x > -4
c = content.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [-6, 2],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [-4, 0.5], 'tip': [2, 0.5], 'color': '#10B981', 'weight': 3}
                ],
                'segments': [
                    {'from': [-4, 0], 'to': [-4, 0.5], 'color': '#10B981', 'weight': 2}
                ],
                'points': [
                    {'x': -4, 'y': 0, 'label': '-4 (otwarte: >)', 'dot': 'hollow', 'color': '#10B981', 'attach': 's'}
                ]
            }''', '''number_line={'min': -6, 'max': 2, 'ticks': [-4], 'labels': [-4], 'intervals': [{'from': -4, 'to': None, 'fromIncluded': False}]}''')

# 2. ray x > 2/3
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [-2, 4],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [0.667, 0.5], 'tip': [4, 0.5], 'color': '#10B981', 'weight': 3}
                ],
                'segments': [
                    {'from': [0.667, 0], 'to': [0.667, 0.5], 'color': '#10B981', 'weight': 2}
                ],
                'points': [
                    {'x': 0.667, 'y': 0, 'label': '2/3', 'dot': 'hollow', 'color': '#10B981', 'attach': 's'}
                ]
            }''', '''number_line={'min': -2, 'max': 4, 'ticks': [0.667], 'labels': [0.667], 'intervals': [{'from': 0.667, 'to': None, 'fromIncluded': False}]}''')

# 3. ray x >= 2
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [-1, 6],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [2, 0.5], 'tip': [6, 0.5], 'color': '#10B981', 'weight': 3}
                ],
                'segments': [
                    {'from': [2, 0], 'to': [2, 0.5], 'color': '#10B981', 'weight': 2}
                ],
                'points': [
                    {'x': 2, 'y': 0, 'label': 'min = 2 [zamknięte]', 'dot': 'filled', 'color': '#FFB800', 'attach': 's'}
                ]
            }''', '''number_line={'min': -1, 'max': 6, 'ticks': [2], 'labels': [2], 'intervals': [{'from': 2, 'to': None, 'fromIncluded': True}]}''')

# 4. ray x > 4
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [1, 8],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [4, 0.5], 'tip': [8, 0.5], 'color': '#10B981', 'weight': 3}
                ],
                'segments': [
                    {'from': [4, 0], 'to': [4, 0.5], 'color': '#10B981', 'weight': 2}
                ],
                'points': [
                    {'x': 4, 'y': 0, 'label': '4 (otwarte: >)', 'dot': 'hollow', 'color': '#10B981', 'attach': 's'}
                ]
            }''', '''number_line={'min': 1, 'max': 8, 'ticks': [4], 'labels': [4], 'intervals': [{'from': 4, 'to': None, 'fromIncluded': False}]}''')

# 5. ray x >= -3
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [-5, 3],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [-3, 0.5], 'tip': [3, 0.5], 'color': '#10B981', 'weight': 3}
                ],
                'segments': [
                    {'from': [-3, 0], 'to': [-3, 0.5], 'color': '#10B981', 'weight': 2}
                ],
                'points': [
                    {'x': -3, 'y': 0, 'label': '-3 (zamknięte: ≥)', 'dot': 'filled', 'color': '#10B981', 'attach': 's'}
                ]
            }''', '''number_line={'min': -5, 'max': 3, 'ticks': [-3], 'labels': [-3], 'intervals': [{'from': -3, 'to': None, 'fromIncluded': True}]}''')

# 6. ray x <= 7
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [2, 9],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [7, 0.5], 'tip': [2, 0.5], 'color': '#10B981', 'weight': 3}
                ],
                'segments': [
                    {'from': [7, 0], 'to': [7, 0.5], 'color': '#10B981', 'weight': 2}
                ],
                'points': [
                    {'x': 7, 'y': 0, 'label': '7 (zamknięte: ≤)', 'dot': 'filled', 'color': '#10B981', 'attach': 's'}
                ]
            }''', '''number_line={'min': 2, 'max': 9, 'ticks': [7], 'labels': [7], 'intervals': [{'from': None, 'to': 7, 'toIncluded': True}]}''')


# 7. segment [1, 4)
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [-1, 6],
                'yRange': [-1, 2],
                'gridStep': 1,
                'polygons': [
                    {'points': [[1, 0], [4, 0], [4, 0.6], [1, 0.6]], 'color': '#10B981', 'fillOpacity': 0.25}
                ],
                'segments': [
                    {'from': [1, 0.6], 'to': [4, 0.6], 'color': '#10B981', 'weight': 3}
                ],
                'points': [
                    {'x': 1, 'y': 0, 'label': '1 [zamknięty]', 'dot': 'filled', 'color': '#10B981', 'attach': 's'},
                    {'x': 4, 'y': 0, 'label': '4 (otwarty)', 'dot': 'hollow', 'color': '#10B981', 'attach': 's'}
                ]
            }''', '''number_line={'min': -1, 'max': 6, 'ticks': [1, 4], 'labels': [1, 4], 'intervals': [{'from': 1, 'to': 4, 'fromIncluded': True, 'toIncluded': False}]}''')

# 8. ray x < 3 with extra point
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [-1, 5],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [3, 0.5], 'tip': [-1, 0.5], 'color': '#10B981', 'weight': 3}
                ],
                'segments': [
                    {'from': [3, 0], 'to': [3, 0.5], 'color': '#10B981', 'weight': 2}
                ],
                'points': [
                    {'x': 3, 'y': 0, 'label': '3 (otwarte)', 'dot': 'hollow', 'color': '#10B981', 'attach': 's'},
                    {'x': 2, 'y': 0, 'label': 'max całk. = 2', 'dot': 'filled', 'color': '#FFB800', 'attach': 's'}
                ]
            }''', '''number_line={'min': -1, 'max': 5, 'ticks': [2, 3], 'labels': [2, 3], 'intervals': [{'from': None, 'to': 3, 'toIncluded': False}]}''')


# 9. two rays: x < 2 OR x > 5
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [0, 7],
                'yRange': [-1, 2],
                'gridStep': 1,
                'vectors': [
                    {'tail': [2, 0.5], 'tip': [0, 0.5], 'color': '#F43F5E', 'weight': 2.5},
                    {'tail': [5, 0.5], 'tip': [7, 0.5], 'color': '#38BDF8', 'weight': 2.5}
                ],
                'segments': [
                    {'from': [2, 0], 'to': [2, 0.5], 'color': '#F43F5E', 'weight': 1.5},
                    {'from': [5, 0], 'to': [5, 0.5], 'color': '#38BDF8', 'weight': 1.5}
                ],
                'points': [
                    {'x': 2, 'y': 0, 'label': 'x < 2', 'dot': 'hollow', 'color': '#F43F5E', 'attach': 's'},
                    {'x': 5, 'y': 0, 'label': 'x > 5', 'dot': 'hollow', 'color': '#38BDF8', 'attach': 's'}
                ]
            }''', '''number_line={'min': 0, 'max': 7, 'ticks': [2, 5], 'labels': [2, 5], 'intervals': [{'from': None, 'to': 2, 'toIncluded': False}, {'from': 5, 'to': None, 'fromIncluded': False}]}''')


# 10. (-4, 3]
c = c.replace('''plot={
                'type': 'PLOT',
                'hideYAxis': True,
                'xRange': [-5, 5],
                'yRange': [-1, 2],
                'gridStep': 1,
                'polygons': [
                    {'points': [[-4, 0], [3, 0], [3, 0.6], [-4, 0.6]], 'color': '#10B981', 'fillOpacity': 0.25}
                ],
                'segments': [
                    {'from': [-4, 0.6], 'to': [3, 0.6], 'color': '#10B981', 'weight': 3}
                ],
                'points': [
                    {'x': -4, 'y': 0, 'label': '-4 (otwarty)', 'dot': 'hollow', 'color': '#10B981', 'attach': 's'},
                    {'x': 3, 'y': 0, 'label': '3 [zamknięty]', 'dot': 'filled', 'color': '#10B981', 'attach': 's'}
                ]
            }''', '''number_line={'min': -5, 'max': 5, 'ticks': [-4, 3], 'labels': [-4, 3], 'intervals': [{'from': -4, 'to': 3, 'fromIncluded': False, 'toIncluded': True}]}''')


with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print("Replaced", len(c) - len(content), "bytes in", path)
