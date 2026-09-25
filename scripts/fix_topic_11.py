import re

path = r"scripts\curriculum_builder\topic_11_builder.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace all plot={...} with plot=None inside tasks. 
# We need to match 'plot={' and everything up to the matching '}' before the closing parenthesis of the make_*_task call.
# Actually, since it's hard to parse matching braces with regex, we can use ast or just a simpler approach:
# Just find all occurrences of plot={ and replace the whole thing.
# Let's just use Python's ast or do it manually.

def remove_plots(text):
    import ast
    # The file contains a mix of code, let's just do simple string matching
    # finding `plot={` and replacing the block until `}` that matches it.
    
    out = ""
    i = 0
    while i < len(text):
        idx = text.find("plot={", i)
        if idx == -1:
            out += text[i:]
            break
        out += text[i:idx] + "plot=None"
        
        # Now find the matching brace for `{`
        brace_count = 0
        j = idx + 5 # index of '{'
        while j < len(text):
            if text[j] == '{':
                brace_count += 1
            elif text[j] == '}':
                brace_count -= 1
                if brace_count == 0:
                    # found the end
                    i = j + 1
                    break
            j += 1
    return out

content = remove_plots(content)

# Inject CKE task
t11_cke_tasks = r'''
    # --- Wstrzyknięte z arkuszy CKE ---
    # CKE Maj 2023 - Zadanie 17. (2 pkt) - Dowód ciąg geometryczny
    lessons[2]["tasks"].append(
        make_open_calculation_task(
            id="t11_l03_cke_01",
            content="Trzy liczby dodatnie tworzą ciąg geometryczny. Wykaż, że jeśli suma tych liczb jest równa 26, a środkowa z nich jest równa 6, to pierwsza z tych liczb jest równa 2 lub 18.",
            correct_answer="Zatem x=2 lub x=18",
            explanation="Niech $a, b, c$ tworzą ciąg geometryczny. Wiemy, że $b=6$ i $a+b+c=26$.<br/>Stąd $a+6+c=26 \\implies a+c=20 \\implies c=20-a$.<br/>Z własności ciągu geometrycznego: $b^2 = a \\cdot c$.<br/>$6^2 = a(20-a)$<br/>$36 = 20a - a^2$<br/>$a^2 - 20a + 36 = 0$<br/>$\\Delta = 400 - 144 = 256$, $\\sqrt{\\Delta} = 16$.<br/>$a_1 = \\frac{20-16}{2} = 2$, $a_2 = \\frac{20+16}{2} = 18$.<br/>Obie liczby prowadzą do dodatnich ciągów: (2, 6, 18) lub (18, 6, 2).",
            points=2,
            source="CKE Maj 2023 • Zad. 17 (2 pkt)",
            rubric=[
                "1 pkt – zastosowanie własności ciągu geometrycznego i zapisanie równania kwadratowego z jedną niewiadomą",
                "2 pkt – poprawne rozwiązanie równania kwadratowego i sformułowanie poprawnego wniosku"
            ]
        )
    )
'''
content = re.sub(r'(\s+)(return\s*\{\s*"lessons":\s*lessons\s*\})', lambda m: t11_cke_tasks.replace('\n', '\n' + m.group(1)) + m.group(1) + m.group(2), content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Plots removed and CKE task injected for topic 11.")
