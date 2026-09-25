import re

path = r"src\components\TaskView.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target = "activeTask.explanation || 'Poprawna odpowiedź.'"
# Since encoding might have broken the string, let's match activeTask.explanation || 'Poprawna
# or just MathRenderer content={solutionSteps[0]?.content || activeTask.explanation

match = re.search(r'(<MathRenderer content=\{solutionSteps\[0\]\?\.content \|\| activeTask\.explanation[^>]+>\s*</div>\s*)</div>', content)

if match:
    new_visuals = """
                  {/* Explanation Visuals */}
                  {((activeTask as any)?.explanationNumberLine || (activeTask as any)?.explanationDiagram || (activeTask as any)?.explanationPlot) && (
                    <div className="mt-3 flex justify-center w-full">
                      {(activeTask as any)?.explanationNumberLine ? (
                        <NumberLineDiagram data={(activeTask as any).explanationNumberLine} height={64} maxWidth="400px" />
                      ) : (activeTask as any)?.explanationDiagram || (activeTask as any)?.explanationPlot ? (
                        <MathDiagram diagram={(activeTask as any).explanationDiagram || (activeTask as any).explanationPlot} borderless />
                      ) : null}
                    </div>
                  )}
                  </div>
"""
    content = content.replace(match.group(1) + '</div>', match.group(1) + new_visuals)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
