import re

path = r"src\components\MathPlot.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("hideGrid?: boolean;", "hideGrid?: boolean;\n    xTickLabels?: Record<number, string>;\n    yTickLabels?: Record<number, string>;")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
