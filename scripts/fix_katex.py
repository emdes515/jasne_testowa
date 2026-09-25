import re

path = r"scripts\curriculum_builder\topic_06_builder.py"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace:
# 'latex': 'x^3 = cx \\implies x(x^2 - c) = 0 \\quad (\\text{NIE: } x^2 = c)'
# with:
# 'latex': 'x^3 = cx \\implies x(x^2 - c) = 0 \\quad (\\text{NIE: } x^2 = c)' -> Wait, it's ALREADY in a latex field!

# Let's see the line again.
# 'latex': 'x^3 = cx \implies x(x^2 - c) = 0 \quad (\text{NIE: } x^2 = c)',
# Wait, this is a core_formula!
# The 'latex' field is rendered via KaTeX.
# If it's rendered as `(\text{NIE: } x^2 = c)` in the app, why is it failing?
# Because `\text` requires `amsmath` or it just works in math mode, but maybe `(\text{...})` is not valid without being inside math mode?
# Actually, the entire `latex` string IS evaluated in math mode by `MathRenderer`.
# Wait, if `latex` string is passed to KaTeX, `\text{NIE: }` IS valid.
# But look at the screenshot! The screenshot shows `(\text{NIE: } x^2 = c)` in blue font, which is our fallback `code` font!
# This means `MathRenderer` failed to parse it, so it fell back to displaying raw string.
# Why did KaTeX fail to parse `x^3 = cx \implies x(x^2 - c) = 0 \quad (\text{NIE: } x^2 = c)`?
# Let's test it with KaTeX CLI or node.
