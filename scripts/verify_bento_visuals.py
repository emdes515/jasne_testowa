import importlib
import sys
import os

sys.path.insert(0, os.path.abspath('.'))

def verify():
    total_lessons = 0
    missing_tabs = []

    for t_idx in range(1, 14):
        mod_name = f'scripts.lesson_visuals_v2.topic_{t_idx:02d}'
        try:
            mod = importlib.import_module(mod_name)
        except Exception as e:
            print(f'Error importing {mod_name}: {e}')
            return False
            
        fn = getattr(mod, f'get_topic_{t_idx:02d}_visuals')
        
        l_idx = 0
        while True:
            vis = fn(l_idx)
            if vis.get('tab0') is None and vis.get('tab2') is None and vis.get('tab3') is None:
                break
            total_lessons += 1
            for tab in ['tab0', 'tab2', 'tab3']:
                if vis.get(tab) is None:
                    missing_tabs.append((t_idx, l_idx + 1, tab))
            l_idx += 1

    print(f'Total lessons checked: {total_lessons}')
    print(f'Missing tabs count: {len(missing_tabs)}')
    if missing_tabs:
        print('Missing details:', missing_tabs)
        return False
    else:
        print('PERFECT! 100% full coverage across all topics!')
        return True

if __name__ == '__main__':
    ok = verify()
    sys.exit(0 if ok else 1)
