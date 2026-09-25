import sys
import os
import re
import importlib

sys.path.insert(0, os.path.abspath('.'))
sys.stdout.reconfigure(encoding='utf-8')

for topic_num in range(11, 22):
    mod_name = f"scripts.lesson_visuals_v2.topic_{topic_num:02d}"
    try:
        mod = importlib.import_module(mod_name)
    except Exception as e:
        print(f"Error importing {mod_name}: {e}")
        continue
    
    # Check functions in mod
    funcs = [f for f in dir(mod) if callable(getattr(mod, f)) and not f.startswith('_')]
    print(f"\n=== {mod_name} ({len(funcs)} functions) ===")
    
    # Let's inspect the source code of the module for potential issues
    with open(f"scripts/lesson_visuals_v2/topic_{topic_num:02d}.py", encoding='utf-8') as f:
        src = f.read()
    
    # Check for raw underscores in text/tspan: e.g. x_A, y_B, y_śr, \Delta
    raw_sub = re.findall(r'>[^<]*?([a-zA-Z]_[a-zA-Z0-9ąćęłńóśźż]+|\\[a-zA-Z]+)[^<]*?<', src)
    if raw_sub:
        print(f"  ⚠️ Potential raw subscripts/latex in SVG text: {set(raw_sub[:10])}")
    else:
        print("  ✓ No obvious raw subscripts in SVG text")
        
    # Check for text elements without background rect or filter
    text_count = len(re.findall(r'<text', src))
    rect_count = len(re.findall(r'<rect', src))
    print(f"  Info: <text> tags: {text_count}, <rect> tags: {rect_count}")
