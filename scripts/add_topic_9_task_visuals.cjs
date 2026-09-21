const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Diagram for task-9-1-2: Odczyt ZW_f z wykresu funkcji
const diagram912 = {
  type: 'COORDINATE_SYSTEM',
  title: 'Wykres funkcji f na przedziale [-4, 5]',
  formulaBadge: 'y = f(x)',
  caption: 'Odczytaj zbiór wartości z osi pionowej OY: od najniższego punktu do najwyższego.',
  width: 440,
  height: 240,
  grid: {
    xLines: [100, 125, 150, 175, 200, 225, 250, 275, 300, 325],
    yLines: [20, 45, 70, 95, 120, 145, 170, 195],
    minX: 80,
    maxX: 350,
    minY: 15,
    maxY: 215,
    color: 'rgba(148, 163, 184, 0.12)'
  },
  segments: [
    // Oś pozioma OX (Y = 120)
    { from: [50, 120], to: [370, 120], color: '#64748B', strokeWidth: 1.5 },
    { from: [362, 116], to: [370, 120], color: '#64748B', strokeWidth: 1.5 },
    { from: [362, 124], to: [370, 120], color: '#64748B', strokeWidth: 1.5 },
    // Oś pionowa OY (X = 200)
    { from: [200, 220], to: [200, 10], color: '#64748B', strokeWidth: 1.5 },
    { from: [196, 18], to: [200, 10], color: '#64748B', strokeWidth: 1.5 },
    { from: [204, 18], to: [200, 10], color: '#64748B', strokeWidth: 1.5 },
    // Podświetlenie ZW_f na osi OY od y = -2 (170) do y = 4 (20)
    { from: [200, 170], to: [200, 20], color: '#10B981', strokeWidth: 4, label: 'ZW' },
    // Rzutowania pomocnicze (przerywane)
    { from: [100, 145], to: [200, 145], color: '#64748B', strokeWidth: 1, dashed: true },
    { from: [175, 170], to: [200, 170], color: '#10B981', strokeWidth: 1, dashed: true },
    { from: [275, 20], to: [200, 20], color: '#FFB800', strokeWidth: 1, dashed: true },
    { from: [325, 45], to: [200, 45], color: '#64748B', strokeWidth: 1, dashed: true }
  ],
  ticks: [
    { x: 100, y: 120, label: '-4', axis: 'x' },
    { x: 175, y: 120, label: '-1', axis: 'x' },
    { x: 275, y: 120, label: '3', axis: 'x' },
    { x: 325, y: 120, label: '5', axis: 'x' },
    { x: 200, y: 170, label: '-2', axis: 'y' },
    { x: 200, y: 145, label: '-1', axis: 'y' },
    { x: 200, y: 45, label: '3', axis: 'y' },
    { x: 200, y: 20, label: '4', axis: 'y' }
  ],
  curves: [
    {
      path: 'M 100 145 C 130 168, 155 170, 175 170 C 205 170, 220 70, 240 38 C 255 18, 265 20, 275 20 C 295 20, 310 42, 325 45',
      color: '#38BDF8',
      strokeWidth: 3
    }
  ],
  points: [
    { x: 100, y: 145, dot: 'filled', color: '#38BDF8', label: '(-4,-1)', labelPosition: 'bottom' },
    { x: 175, y: 170, dot: 'filled', color: '#10B981', label: 'min: (-1,-2)', labelPosition: 'bottom' },
    { x: 275, y: 20, dot: 'filled', color: '#FFB800', label: 'max: (3,4)', labelPosition: 'top' },
    { x: 325, y: 45, dot: 'filled', color: '#38BDF8', label: '(5,3)', labelPosition: 'top' }
  ],
  texts: [
    { x: 365, y: 110, text: 'X', color: '#94A3B8', fontSize: 11, fontWeight: 'bold' },
    { x: 212, y: 15, text: 'Y', color: '#94A3B8', fontSize: 11, fontWeight: 'bold' }
  ]
};

// Diagram for task-9-3-2: Równanie f(x) = m (przecięcia z poziomą prostą)
const diagram932 = {
  type: 'COORDINATE_SYSTEM',
  title: 'Przecięcia wykresu z prostą y = -1',
  formulaBadge: 'f(x) = -1 \\implies 3\\text{ punkty}',
  caption: 'Liczba rozwiązań równania odpowiada liczbie punktów wspólnych wykresu i prostej poziomej.',
  width: 440,
  height: 220,
  grid: {
    xLines: [80, 120, 160, 200, 240, 280, 320, 360],
    yLines: [30, 70, 110, 150, 190],
    minX: 60,
    maxX: 380,
    minY: 20,
    maxY: 200,
    color: 'rgba(148, 163, 184, 0.12)'
  },
  segments: [
    // Oś OX (Y = 110)
    { from: [40, 110], to: [380, 110], color: '#64748B', strokeWidth: 1.5 },
    { from: [372, 106], to: [380, 110], color: '#64748B', strokeWidth: 1.5 },
    { from: [372, 114], to: [380, 110], color: '#64748B', strokeWidth: 1.5 },
    // Oś OY (X = 200)
    { from: [200, 205], to: [200, 15], color: '#64748B', strokeWidth: 1.5 },
    { from: [196, 23], to: [200, 15], color: '#64748B', strokeWidth: 1.5 },
    { from: [204, 23], to: [200, 15], color: '#64748B', strokeWidth: 1.5 },
    // Pozioma prosta y = -1 (Y = 150)
    { from: [50, 150], to: [370, 150], color: '#F43F5E', strokeWidth: 2, dashed: true, label: 'y = -1' }
  ],
  ticks: [
    { x: 200, y: 150, label: '-1', axis: 'y' }
  ],
  curves: [
    {
      // Funkcja przecinająca y=150 w 3 punktach (~100, ~200, ~300)
      path: 'M 70 190 C 85 140, 110 50, 140 50 C 170 50, 185 180, 210 180 C 235 180, 260 60, 290 60 C 320 60, 345 160, 360 195',
      color: '#38BDF8',
      strokeWidth: 3
    }
  ],
  points: [
    { x: 92, y: 150, dot: 'filled', color: '#F43F5E', label: 'x₁', labelPosition: 'top-left' },
    { x: 198, y: 150, dot: 'filled', color: '#F43F5E', label: 'x₂', labelPosition: 'top' },
    { x: 338, y: 150, dot: 'filled', color: '#F43F5E', label: 'x₃', labelPosition: 'top-right' }
  ],
  texts: [
    { x: 375, y: 100, text: 'X', color: '#94A3B8', fontSize: 11, fontWeight: 'bold' },
    { x: 212, y: 20, text: 'Y', color: '#94A3B8', fontSize: 11, fontWeight: 'bold' }
  ]
};

let modified = 0;
data.topics.slice(0, 10).forEach(topic => {
  topic.lessons.forEach(lesson => {
    (lesson.tasks || []).forEach(task => {
      if (task.id === 'task-9-1-2') {
        task.diagram = diagram912;
        modified++;
      }
      if (task.id === 'task-9-3-2') {
        task.diagram = diagram932;
        modified++;
      }
    });
  });
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Dołączono diagramy wektorowe do ${modified} zadań.`);
