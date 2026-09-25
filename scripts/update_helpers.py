import re

path = r"scripts\curriculum_builder\helpers.py"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace `number_line=None, plot=None):` with `number_line=None, plot=None, explanation_diagram=None, explanation_plot=None, explanation_number_line=None):`
content = content.replace("number_line=None, plot=None):", "number_line=None, plot=None, explanation_diagram=None, explanation_plot=None, explanation_number_line=None):")
content = content.replace("plot=None, number_line=None):", "plot=None, number_line=None, explanation_diagram=None, explanation_plot=None, explanation_number_line=None):")

# Next, inside each function, I need to add them to the dictionary if they are not None.
# Usually it ends with:
#     if plot:
#         task['plot'] = plot
#     if number_line:
#         task['numberLine'] = number_line
#     return task

replacement_block = """
    if plot:
        task['plot'] = plot
    if number_line:
        task['numberLine'] = number_line
    if explanation_diagram:
        task['explanationDiagram'] = explanation_diagram
    if explanation_plot:
        task['explanationPlot'] = explanation_plot
    if explanation_number_line:
        task['explanationNumberLine'] = explanation_number_line
    return task
"""

content = re.sub(r'(\s*if plot:\s*task\[\'plot\'\] = plot\s*)?(\s*if number_line:\s*task\[\'numberLine\'\] = number_line\s*)?return task', replacement_block, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
