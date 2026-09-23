import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

PLOTS = {
    'matura-maj-2024-zad-11': {
        'type': 'LINEAR',
        'xRange': [-3, 5],
        'yRange': [-4, 6],
        'gridStep': 1,
        'lines': [
            {'slope': -1.5, 'intercept': 3, 'color': '#38BDF8', 'label': 'k: y = -3/2 x + 3'},
            {'slope': -1.5, 'intercept': -1, 'color': '#FFB800', 'label': 'l: y = -3/2 x - 1'}
        ],
        'points': [
            {'x': 0, 'y': 3, 'label': '(0, 3)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'},
            {'x': 2, 'y': 0, 'label': '(2, 0)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'},
            {'x': 0, 'y': -1, 'label': '(0, -1)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'}
        ]
    },
    'matura-maj-2024-zad-14_1': {
        'type': 'PARABOLA',
        'xRange': [-4, 6],
        'yRange': [-2, 11],
        'gridStep': 1,
        'parabola': {
            'a': -1,
            'p': 1,
            'q': 9,
            'color': '#FFB800',
            'domain': [-3.2, 5.2]
        },
        'axisOfSymmetry': 1,
        'points': [
            {'x': 1, 'y': 9, 'label': 'W(1, 9)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
            {'x': -2, 'y': 0, 'label': '(-2, 0)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'},
            {'x': 4, 'y': 0, 'label': '(4, 0)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'se'},
            {'x': 0, 'y': 8, 'label': '(0, 8)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'w'}
        ]
    },
    'matura-maj-2024-zad-14_2': {
        'type': 'PARABOLA',
        'xRange': [-4, 6],
        'yRange': [-2, 11],
        'gridStep': 1,
        'parabola': {
            'a': -1,
            'p': 1,
            'q': 9,
            'color': '#FFB800',
            'domain': [-3.2, 5.2]
        },
        'axisOfSymmetry': 1,
        'points': [
            {'x': 1, 'y': 9, 'label': 'W(1, 9)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
            {'x': -2, 'y': 0, 'label': '(-2, 0)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'},
            {'x': 4, 'y': 0, 'label': '(4, 0)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'se'}
        ]
    },
    'matura-maj-2024-zad-14_3': {
        'type': 'PARABOLA',
        'xRange': [-4, 6],
        'yRange': [-2, 11],
        'gridStep': 1,
        'parabola': {
            'a': -1,
            'p': 1,
            'q': 9,
            'color': '#FFB800',
            'domain': [-3.2, 5.2]
        },
        'axisOfSymmetry': 1,
        'points': [
            {'x': 1, 'y': 9, 'label': 'W(1, 9)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
            {'x': -1, 'y': 5, 'label': '(-1, 5)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'w'},
            {'x': 3, 'y': 5, 'label': '(3, 5)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'e'}
        ]
    },
    'matura-maj-2024-zad-14_4': {
        'type': 'PARABOLA',
        'xRange': [-4, 6],
        'yRange': [-2, 11],
        'gridStep': 1,
        'parabola': {
            'a': -1,
            'p': 1,
            'q': 9,
            'color': '#FFB800',
            'domain': [-3.2, 5.2]
        },
        'axisOfSymmetry': 1,
        'points': [
            {'x': 1, 'y': 9, 'label': 'W(1, 9)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
            {'x': -2, 'y': 0, 'label': '(-2, 0)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'},
            {'x': 4, 'y': 0, 'label': '(4, 0)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'se'}
        ]
    },
    'matura-maj-2023-zad-10': {
        'type': 'LINEAR',
        'xRange': [-3, 5],
        'yRange': [-3, 5],
        'gridStep': 1,
        'lines': [
            {'slope': -1, 'intercept': 2, 'color': '#38BDF8', 'label': 'y = -x + 2'},
            {'slope': 2, 'intercept': -1, 'color': '#FFB800', 'label': 'y = 2x - 1'}
        ],
        'points': [
            {'x': 1, 'y': 1, 'label': 'P(1, 1)', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'},
            {'x': 0, 'y': 2, 'label': '(0, 2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'nw'},
            {'x': 2, 'y': 0, 'label': '(2, 0)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'se'},
            {'x': 0, 'y': -1, 'label': '(0, -1)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'}
        ]
    },
    'matura-maj-2023-zad-14': {
        'type': 'PARABOLA',
        'xRange': [-7, 13],
        'yRange': [-3, 6],
        'gridStep': 2,
        'parabola': {
            'a': -0.0625,
            'p': 3,
            'q': 4,
            'color': '#FFB800',
            'domain': [-6.5, 12.5]
        },
        'axisOfSymmetry': 3,
        'points': [
            {'x': -5, 'y': 0, 'label': 'x₁ = -5', 'dot': 'filled', 'color': '#FFB800', 'attach': 'nw'},
            {'x': 3, 'y': 4, 'label': 'xw = p = 3', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
            {'x': 11, 'y': 0, 'label': 'x₂ = 11', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'}
        ]
    },
    'matura-sierpien-2024-zad-8': {
        'type': 'LINEAR',
        'xRange': [-2, 5],
        'yRange': [-5, 4],
        'gridStep': 1,
        'lines': [
            {'slope': -1, 'intercept': 2, 'color': '#38BDF8', 'label': 'y = -x + 2'},
            {'slope': 2, 'intercept': -3, 'color': '#FFB800', 'label': 'y = 2x - 3'}
        ],
        'points': [
            {'x': 0, 'y': 2, 'label': '(0, 2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'},
            {'x': 2, 'y': 0, 'label': '(2, 0)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'},
            {'x': 0, 'y': -3, 'label': '(0, -3)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'},
            {'x': 1.667, 'y': 0.333, 'label': '(5/3, 1/3)', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'}
        ]
    }
}

exam_files = [
    'seed/curriculum/exams/matura-maj-2024.json',
    'seed/curriculum/exams/matura-maj-2023.json',
    'seed/curriculum/exams/matura-sierpien-2024.json'
]

updated_count = 0
for fpath in exam_files:
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    is_list = isinstance(data, list)
    tasks = data if is_list else data.get('tasks', [])
    
    for t in tasks:
        tid = t.get('id')
        if tid in PLOTS:
            plot_obj = PLOTS[tid]
            t['plot'] = plot_obj
            t['diagram'] = plot_obj
            updated_count += 1
            ptype = plot_obj['type']
            print(f'Updated {tid} in {fpath} with Mafs {ptype}')

    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Successfully updated {updated_count} exam tasks with native Mafs plots!')
