import re

path = r"scripts\curriculum_builder\topic_05_builder.py"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# I want to find instances of two number_line kwargs for the same make_task.
# One is multi-line, one is my new single-line replacement.
# Let's just remove the multi-line number_line={ ... } if my single line one follows it.

# Actually, the simplest fix is just to parse the file and remove the first one if two exist, 
# or just regex match `number_line=\{[\s\S]*?\},[\s\n]*number_line=\{`

new_content = re.sub(r"number_line=\{[^{}]*?(?:\{[^{}]*\}[^{}]*?)*\},\s*number_line=\{", "number_line={", content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
