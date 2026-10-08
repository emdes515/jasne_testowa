import json

data = json.load(open('seed/curriculum/curriculum_matematyka.json', encoding='utf-8'))

topic_archetypes = {
    'dzial-1': ['ARCH-01', 'ARCH-02', 'ARCH-04'],
    'dzial-2': ['ARCH-05'],
    'dzial-3': ['ARCH-03'],
    'dzial-4': ['ARCH-06'],
    'dzial-5': ['ARCH-07'],
    'dzial-6': ['ARCH-08'],
    'dzial-7': ['ARCH-09'],
    'dzial-8': ['ARCH-10'],
    'dzial-9': ['ARCH-11'],
    'dzial-10': ['ARCH-12'],
    'dzial-11': ['ARCH-14', 'ARCH-15', 'ARCH-16'],
    'dzial-12': ['ARCH-10', 'ARCH-13'],
    'dzial-13': ['ARCH-11', 'ARCH-13'],
    'dzial-14': ['ARCH-17', 'ARCH-18'],
    'dzial-15': ['ARCH-19', 'ARCH-20'],
    'dzial-16': ['ARCH-21', 'ARCH-22'],
    'dzial-17': ['ARCH-23', 'ARCH-24', 'ARCH-25'],
    'dzial-18': ['ARCH-26', 'ARCH-27', 'ARCH-28'],
    'dzial-19': ['ARCH-29', 'ARCH-30'],
    'dzial-20': ['ARCH-31'],
    'dzial-21': ['ARCH-32']
}

topic_icons = {
    'dzial-1': 'Hash', 'dzial-2': 'Key', 'dzial-3': 'Layers', 'dzial-4': 'Cpu',
    'dzial-5': 'Divide', 'dzial-6': 'GitBranch', 'dzial-7': 'Grid', 'dzial-8': 'TrendingUp',
    'dzial-9': 'Activity', 'dzial-10': 'TrendingUp', 'dzial-11': 'Binary', 'dzial-12': 'FunctionSquare',
    'dzial-13': 'Maximize', 'dzial-14': 'Triangle', 'dzial-15': 'Shapes', 'dzial-16': 'CircleDot',
    'dzial-17': 'Compass', 'dzial-18': 'Box', 'dzial-19': 'PieChart', 'dzial-20': 'BarChart',
    'dzial-21': 'Sparkles'
}

topic_colors = {
    'dzial-1': '#FFB800', 'dzial-2': '#38BDF8', 'dzial-3': '#F59E0B', 'dzial-4': '#EC4899',
    'dzial-5': '#10B981', 'dzial-6': '#8B5CF6', 'dzial-7': '#06B6D4', 'dzial-8': '#EF4444',
    'dzial-9': '#3B82F6', 'dzial-10': '#F97316', 'dzial-11': '#38BDF8', 'dzial-12': '#10B981',
    'dzial-13': '#A855F7', 'dzial-14': '#EAB308', 'dzial-15': '#14B8A6', 'dzial-16': '#6366F1',
    'dzial-17': '#0EA5E9', 'dzial-18': '#D946EF', 'dzial-19': '#84CC16', 'dzial-20': '#F43F5E',
    'dzial-21': '#F59E0B'
}

clean_topics = []
for idx, t in enumerate(data['topics']):
    tid = t['id']
    num = idx + 1
    lessons = t.get('lessons', [])
    archs = topic_archetypes.get(tid, ['ARCH-01'])
    title = t.get('title', f'Dział {num}')
    short_title = t.get('short_title', title)
    description = t.get('description', f'Oficjalny dział CKE {num}: {title}')
    
    clean_lessons = []
    for l_idx, l in enumerate(lessons):
        arch = archs[l_idx % len(archs)]
        ltitle = l.get('title', f'Lekcja {num}.{l_idx+1}')
        lshort = l.get('short_title', ltitle)
        clean_lessons.append({
            'id': l['id'],
            'order': l.get('order', l_idx + 1),
            'title': ltitle,
            'short_title': lshort,
            'badge': f'Lekcja {num}.{l_idx+1}',
            'archetypeCode': arch,
            'estimated_time_formatted': '4–6 min',
            'theory_pill': l.get('theory_pill', {}),
            'tasks': l.get('tasks', [])
        })
        
    clean_topics.append({
        'id': tid,
        'numericId': num,
        'title': title,
        'short_title': short_title,
        'description': description,
        'icon': topic_icons.get(tid, 'Hash'),
        'color': topic_colors.get(tid, '#FFB800'),
        'matura_points_range': t.get('matura_points_range', '3–6 pkt'),
        'importance': t.get('importance', 'CRITICAL_PEWNIAK'),
        'lessons': clean_lessons
    })

output_path = 'src/data/math/math21Curriculum.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump({'topics': clean_topics}, f, ensure_ascii=False, indent=2)

print('Saved', len(clean_topics), 'topics to', output_path)
