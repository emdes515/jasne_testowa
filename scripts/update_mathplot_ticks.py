import re

path = r"src\components\MathPlot.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if "import { MathRenderer }" not in content:
    content = content.replace("import React from 'react';", "import React from 'react';\nimport { MathRenderer } from './MathRenderer';")

# For x ticks
old_x = """{xTicks.map((x) => {
              if (x === 0) return null;
              return (
                <g key={`tick-x-${x}`}>
                  <line
                    x1={toSvgX(x)}
                    y1={originY - 3}
                    x2={toSvgX(x)}
                    y2={originY + 3}
                    stroke="#64748B"
                    strokeWidth="1.5"
                  />
                  <text
                    x={toSvgX(x)}
                    y={originY + 14}
                    fill="#64748B"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {x}
                  </text>
                </g>
              );
            })}"""

new_x = """{xTicks.map((x) => {
              if (x === 0) return null;
              const lbl = plot.xTickLabels?.[x];
              const hasMath = lbl && (lbl.includes('\\\\') || lbl.includes('^'));
              return (
                <g key={`tick-x-${x}`}>
                  <line x1={toSvgX(x)} y1={originY - 3} x2={toSvgX(x)} y2={originY + 3} stroke="#64748B" strokeWidth="1.5" />
                  {hasMath ? (
                    <foreignObject x={toSvgX(x) - 15} y={originY + 2} width="30" height="24">
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px] font-medium select-none">
                        <MathRenderer content={`$${lbl}$`} inline />
                      </div>
                    </foreignObject>
                  ) : (
                    <text x={toSvgX(x)} y={originY + 14} fill="#64748B" fontSize="10" fontWeight="500" textAnchor="middle">
                      {lbl || x}
                    </text>
                  )}
                </g>
              );
            })}"""

old_y = """{yTicks.map((y) => {
              if (y === 0) return null;
              return (
                <g key={`tick-y-${y}`}>
                  <line
                    x1={originX - 3}
                    y1={toSvgY(y)}
                    x2={originX + 3}
                    y2={toSvgY(y)}
                    stroke="#64748B"
                    strokeWidth="1.5"
                  />
                  <text
                    x={originX - 7}
                    y={toSvgY(y) + 3.5}
                    fill="#64748B"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="end"
                  >
                    {y}
                  </text>
                </g>
              );
            })}"""

new_y = """{yTicks.map((y) => {
              if (y === 0) return null;
              const lbl = plot.yTickLabels?.[y];
              const hasMath = lbl && (lbl.includes('\\\\') || lbl.includes('^'));
              return (
                <g key={`tick-y-${y}`}>
                  <line x1={originX - 3} y1={toSvgY(y)} x2={originX + 3} y2={toSvgY(y)} stroke="#64748B" strokeWidth="1.5" />
                  {hasMath ? (
                    <foreignObject x={originX - 35} y={toSvgY(y) - 12} width="30" height="24">
                      <div className="w-full h-full flex items-center justify-end pr-1 text-slate-500 text-[10px] font-medium select-none">
                        <MathRenderer content={`$${lbl}$`} inline />
                      </div>
                    </foreignObject>
                  ) : (
                    <text x={originX - 7} y={toSvgY(y) + 3.5} fill="#64748B" fontSize="10" fontWeight="500" textAnchor="end">
                      {lbl || y}
                    </text>
                  )}
                </g>
              );
            })}"""

# use regex to replace to avoid whitespace issues
import re
content = re.sub(r'\{xTicks\.map\(\(x\)\s*=>\s*\{[\s\S]*?\}\)\}', new_x, content)
content = re.sub(r'\{yTicks\.map\(\(y\)\s*=>\s*\{[\s\S]*?\}\)\}', new_y, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
