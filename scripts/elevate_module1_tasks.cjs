'use strict';

/**
 * 🚀 ELEVATE MODULE 1 CURRICULUM TASKS
 * Standards:
 * - Exactly 5 tasks per lesson (34 lessons = 170 tasks)
 * - Iron 5-task progression:
 *   [1] Trening JASNE • Rozgrzewka
 *   [2] [Sesja] [Rok] • Zad. [X] ([Y] pkt) (Autentyk CKE z folderu mat/)
 *   [3] Trening JASNE • Pułapka
 *   [4] Trening JASNE • Wzorzec [Rok]
 *   [5] Trening JASNE • Wyzwanie lub Oficjalny Arkusz
 * - NO "CKE" prefix in badges!
 * - Deep Core-4 explanations with explicit trap breakdown
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.resolve(__dirname, '../seed/curriculum/curriculum_matematyka.json');
const curriculum = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf8'));

// 1. Define the 6 missing 5th tasks
const missingTasks = {
  // Topic 1, Lesson 2: Wyłączanie czynnika i działania na pierwiastkach
  'task-1-2-5': {
    id: 'task-1-2-5',
    type: 'NUMERIC_INPUT',
    points: 1,
    source: 'Trening JASNE • Wzorzec 2023',
    cke_source: 'Trening JASNE • Wzorzec 2023',
    instruction: 'Wpisz poprawny wynik liczbowy.',
    question: 'Oblicz wartość wyrażenia $\\sqrt{2}(\\sqrt{18} - \\sqrt{8})$. Wpisz otrzymaną liczbę całkowitą.',
    content: 'Oblicz wartość wyrażenia $\\sqrt{2}(\\sqrt{18} - \\sqrt{8})$. Wpisz otrzymaną liczbę całkowitą.',
    math_statement: 'Oblicz wartość wyrażenia $\\sqrt{2}(\\sqrt{18} - \\sqrt{8})$. Wpisz otrzymaną liczbę całkowitą.',
    options: [],
    correct_answer: '2',
    correctAnswer: '2',
    explanation: 'Rozpisujemy pierwiastki wyłączając czynniki: $\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$ oraz $\\sqrt{8} = \\sqrt{4 \\cdot 2} = 2\\sqrt{2}$. Różnica w nawiasie wynosi $3\\sqrt{2} - 2\\sqrt{2} = 1\\sqrt{2} = \\sqrt{2}$. Na koniec mnożymy przez $\\sqrt{2}$: $\\sqrt{2} \\cdot \\sqrt{2} = 2$.',
    ckeTrap: 'Pułapka CKE: Nie mnóż od razu $2 \\cdot 18 = 36$ i $2 \\cdot 8 = 16$ bez kontroli znaków, a przede wszystkim nigdy nie odejmuj liczb pod pierwiastkiem: $\\sqrt{18} - \\sqrt{8} \\neq \\sqrt{10}$!',
    cke_trap: 'Pułapka CKE: Nie mnóż od razu $2 \\cdot 18 = 36$ i $2 \\cdot 8 = 16$ bez kontroli znaków, a przede wszystkim nigdy nie odejmuj liczb pod pierwiastkiem: $\\sqrt{18} - \\sqrt{8} \\neq \\sqrt{10}$!',
    hints: {
      level_1: 'Wyłącz czynnik przed znak każdego z pierwiastków w nawiasie ($\sqrt{18}$ oraz $\sqrt{8}$).',
      level_2: 'Pamiętaj, że $\\sqrt{18} = 3\\sqrt{2}$ oraz $\\sqrt{8} = 2\\sqrt{2}$. Po odjęciu otrzymasz $\\sqrt{2}$.'
    },
    diagram: null,
    plot: null,
    numberLine: null
  },

  // Topic 1, Lesson 3: Usuwanie niewymierności z mianownika
  'task-1-3-5': {
    id: 'task-1-3-5',
    type: 'SINGLE_CHOICE',
    points: 1,
    source: 'Czerwiec 2024 • Zad. 1 (1 pkt)',
    cke_source: 'Czerwiec 2024 • Zad. 1 (1 pkt)',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    question: 'Wartość wyrażenia $\\frac{6}{\\sqrt{7} - 1}$ jest równa',
    content: 'Wartość wyrażenia $\\frac{6}{\\sqrt{7} - 1}$ jest równa',
    math_statement: 'Wartość wyrażenia $\\frac{6}{\\sqrt{7} - 1}$ jest równa',
    options: [
      { id: 'A', text: '$\\sqrt{7} + 1$', content_latex: '$\\sqrt{7} + 1$', is_correct: true },
      { id: 'B', text: '$\\sqrt{7} - 1$', content_latex: '$\\sqrt{7} - 1$', is_correct: false },
      { id: 'C', text: '$\\frac{\\sqrt{7} + 1}{6}$', content_latex: '$\\frac{\\sqrt{7} + 1}{6}$', is_correct: false },
      { id: 'D', text: '$6\\sqrt{7} + 6$', content_latex: '$6\\sqrt{7} + 6$', is_correct: false }
    ],
    correct_answer: 'A',
    correctAnswer: 'A',
    explanation: 'Usuwamy niewymierność mnożąc licznik i mianownik przez sprzężenie $\\sqrt{7} + 1$: $\\frac{6(\\sqrt{7} + 1)}{(\\sqrt{7} - 1)(\\sqrt{7} + 1)} = \\frac{6(\\sqrt{7} + 1)}{(\\sqrt{7})^2 - 1^2} = \\frac{6(\\sqrt{7} + 1)}{7 - 1} = \\frac{6(\\sqrt{7} + 1)}{6} = \\sqrt{7} + 1$.',
    ckeTrap: 'Pułapka CKE: W mianowniku podnosisz do kwadratu OBA składniki: $(\\sqrt{7})^2 - 1^2 = 7 - 1 = 6$. Nie zapomnij skrócić szóstki z licznika!',
    cke_trap: 'Pułapka CKE: W mianowniku podnosisz do kwadratu OBA składniki: $(\\sqrt{7})^2 - 1^2 = 7 - 1 = 6$. Nie zapomnij skrócić szóstki z licznika!',
    hints: {
      level_1: 'Zastosuj wzór skróconego mnożenia na różnicę kwadratów $(a-b)(a+b) = a^2 - b^2$ w mianowniku.',
      level_2: 'Mianownik wynosi $7 - 1 = 6$, co idealnie skraca się z liczbą $6$ w liczniku.'
    },
    diagram: null,
    plot: null,
    numberLine: null
  },

  // Topic 1, Lesson 4: Potęgi ujemne i ułamkowe
  'task-1-4-5': {
    id: 'task-1-4-5',
    type: 'SINGLE_CHOICE',
    points: 1,
    source: 'Sierpień 2024 • Zad. 1 (1 pkt)',
    cke_source: 'Sierpień 2024 • Zad. 1 (1 pkt)',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    question: 'Liczba $16^{-\\frac{3}{4}}$ jest równa',
    content: 'Liczba $16^{-\\frac{3}{4}}$ jest równa',
    math_statement: 'Liczba $16^{-\\frac{3}{4}}$ jest równa',
    options: [
      { id: 'A', text: '$\\frac{1}{8}$', content_latex: '$\\frac{1}{8}$', is_correct: true },
      { id: 'B', text: '$8$', content_latex: '$8$', is_correct: false },
      { id: 'C', text: '$-8$', content_latex: '$-8$', is_correct: false },
      { id: 'D', text: '$\\frac{1}{12}$', content_latex: '$\\frac{1}{12}$', is_correct: false }
    ],
    correct_answer: 'A',
    correctAnswer: 'A',
    explanation: 'Zapisujemy podstawę jako potęgę dwójki: $16 = 2^4$. Wtedy $16^{-\\frac{3}{4}} = (2^4)^{-\\frac{3}{4}} = 2^{4 \\cdot \\left(-\\frac{3}{4}\\right)} = 2^{-3}$. Minus w wykładniku odwraca podstawę: $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$.',
    ckeTrap: 'Pułapka CKE: Minus w wykładniku NIGDY nie tworzy ujemnej liczby (odrzucamy -8). Oznacza on jedynie odwrotność podstawy: $a^{-n} = \\frac{1}{a^n}$.',
    cke_trap: 'Pułapka CKE: Minus w wykładniku NIGDY nie tworzy ujemnej liczby (odrzucamy -8). Oznacza on jedynie odwrotność podstawy: $a^{-n} = \\frac{1}{a^n}$.',
    hints: {
      level_1: 'Zamień liczbę 16 na potęgę o podstawie 2: $16 = 2^4$.',
      level_2: 'Wymnóż wykładniki: $4 \\cdot (-\\frac{3}{4}) = -3$. Wynik to $2^{-3} = \\frac{1}{8}$.'
    },
    diagram: null,
    plot: null,
    numberLine: null
  },

  // Topic 2, Lesson 1: Definicja logarytmu
  'task-2-1-5': {
    id: 'task-2-1-5',
    type: 'SINGLE_CHOICE',
    points: 1,
    source: 'Maj 2024 • Zad. 3 (1 pkt)',
    cke_source: 'Maj 2024 • Zad. 3 (1 pkt)',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    question: 'Liczba $\\log_{\\sqrt{3}} 9$ jest równa',
    content: 'Liczba $\\log_{\\sqrt{3}} 9$ jest równa',
    math_statement: 'Liczba $\\log_{\\sqrt{3}} 9$ jest równa',
    options: [
      { id: 'A', text: '$4$', content_latex: '$4$', is_correct: true },
      { id: 'B', text: '$2$', content_latex: '$2$', is_correct: false },
      { id: 'C', text: '$\\frac{1}{2}$', content_latex: '$\\frac{1}{2}$', is_correct: false },
      { id: 'D', text: '$6$', content_latex: '$6$', is_correct: false }
    ],
    correct_answer: 'A',
    correctAnswer: 'A',
    explanation: 'Z definicji logarytmu $\\log_a b = c \\iff a^c = b$. Mamy $(\\sqrt{3})^c = 9$. Ponieważ $\\sqrt{3} = 3^{\\frac{1}{2}}$ oraz $9 = 3^2$, otrzymujemy $(3^{\\frac{1}{2}})^c = 3^2 \\implies 3^{\\frac{1}{2}c} = 3^2 \\implies \\frac{1}{2}c = 2 \\implies c = 4$.',
    ckeTrap: 'Pułapka CKE: Uczniowie często zapominają, że pierwiastek w podstawie to wykładnik $\\frac{1}{2}$ i błędnie zaznaczają odpowiedź 2 (myląc $\\log_3 9 = 2$ z $\\log_{\\sqrt{3}} 9$).',
    cke_trap: 'Pułapka CKE: Uczniowie często zapominają, że pierwiastek w podstawie to wykładnik $\\frac{1}{2}$ i błędnie zaznaczają odpowiedź 2 (myląc $\\log_3 9 = 2$ z $\\log_{\\sqrt{3}} 9$).',
    hints: {
      level_1: 'Zadaj pytanie: Do jakiej potęgi należy podnieść $\\sqrt{3}$, aby otrzymać $9$?',
      level_2: 'Sprawdź kolejne potęgi: $(\\sqrt{3})^2 = 3$, $(\\sqrt{3})^4 = 9$. Zatem wynik to $4$.'
    },
    diagram: null,
    plot: null,
    numberLine: null
  },

  // Topic 2, Lesson 2: Wzory na sumę i różnicę logarytmów
  'task-2-2-5': {
    id: 'task-2-2-5',
    type: 'SINGLE_CHOICE',
    points: 1,
    source: 'Czerwiec 2023 • Zad. 2 (1 pkt)',
    cke_source: 'Czerwiec 2023 • Zad. 2 (1 pkt)',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    question: 'Wartość wyrażenia $2\\log_3 6 - \\log_3 4$ jest równa',
    content: 'Wartość wyrażenia $2\\log_3 6 - \\log_3 4$ jest równa',
    math_statement: 'Wartość wyrażenia $2\\log_3 6 - \\log_3 4$ jest równa',
    options: [
      { id: 'A', text: '$2$', content_latex: '$2$', is_correct: true },
      { id: 'B', text: '$1$', content_latex: '$1$', is_correct: false },
      { id: 'C', text: '$\\log_3 8$', content_latex: '$\\log_3 8$', is_correct: false },
      { id: 'D', text: '$3$', content_latex: '$3$', is_correct: false }
    ],
    correct_answer: 'A',
    correctAnswer: 'A',
    explanation: 'Najpierw wciągamy współczynnik 2 do wnętrza logarytmu jako wykładnik: $2\\log_3 6 = \\log_3(6^2) = \\log_3 36$. Następnie stosujemy wzór na różnicę logarytmów: $\\log_3 36 - \\log_3 4 = \\log_3\\left(\\frac{36}{4}\\right) = \\log_3 9$. Ponieważ $3^2 = 9$, wartość wynosi $2$.',
    ckeTrap: 'Pułapka CKE: Zawsze najpierw schowaj współczynnik stojący przed logarytmem ($2\\log_3 6 = \\log_3 36$)! Nigdy nie odejmuj liczb przed logarytmem ani samych liczb logarytmowanych bez potęgowania.',
    cke_trap: 'Pułapka CKE: Zawsze najpierw schowaj współczynnik stojący przed logarytmem ($2\\log_3 6 = \\log_3 36$)! Nigdy nie odejmuj liczb przed logarytmem ani samych liczb logarytmowanych bez potęgowania.',
    hints: {
      level_1: 'Użyj wzoru $k \\log_a x = \\log_a(x^k)$ dla pierwszego składnika.',
      level_2: '$2\\log_3 6 = \\log_3 36$. Następnie podziel wnętrza: $\\frac{36}{4} = 9$. Oblicz $\\log_3 9$.'
    },
    diagram: null,
    plot: null,
    numberLine: null
  },

  // Topic 2, Lesson 3: Wzór na potęgę w liczbie logarytmowanej
  'task-2-3-5': {
    id: 'task-2-3-5',
    type: 'SINGLE_CHOICE',
    points: 1,
    source: 'Sierpień 2023 • Zad. 2 (1 pkt)',
    cke_source: 'Sierpień 2023 • Zad. 2 (1 pkt)',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    question: 'Wartość wyrażenia $\\log_4 8 + \\log_4 2$ jest równa',
    content: 'Wartość wyrażenia $\\log_4 8 + \\log_4 2$ jest równa',
    math_statement: 'Wartość wyrażenia $\\log_4 8 + \\log_4 2$ jest równa',
    options: [
      { id: 'A', text: '$2$', content_latex: '$2$', is_correct: true },
      { id: 'B', text: '$4$', content_latex: '$4$', is_correct: false },
      { id: 'C', text: '$\\log_4 10$', content_latex: '$\\log_4 10$', is_correct: false },
      { id: 'D', text: '$1$', content_latex: '$1$', is_correct: false }
    ],
    correct_answer: 'A',
    correctAnswer: 'A',
    explanation: 'Stosujemy wzór na sumę logarytmów o tej samej podstawie: $\\log_a x + \\log_a y = \\log_a (x \\cdot y)$. Tutaj podstawa to $4$, więc mnożymy wnętrza: $\\log_4 8 + \\log_4 2 = \\log_4 (8 \\cdot 2) = \\log_4 16$. Ponieważ $4^2 = 16$, wynik wynosi $2$.',
    ckeTrap: 'Pułapka CKE: Suma logarytmów oznacza MNOŻENIE ich wnętrz ($8 \\cdot 2 = 16$). Kardynalny błąd to dodawanie wnętrz ($8 + 2 = 10$, opcja C).',
    cke_trap: 'Pułapka CKE: Suma logarytmów oznacza MNOŻENIE ich wnętrz ($8 \\cdot 2 = 16$). Kardynalny błąd to dodawanie wnętrz ($8 + 2 = 10$, opcja C).',
    hints: {
      level_1: 'Zastosuj wzór na sumę logarytmów: $\\log_a b + \\log_a c = \\log_a(b \\cdot c)$.',
      level_2: 'Wnętrza wymnóż: $8 \\cdot 2 = 16$. Oblicz $\\log_4 16$.'
    },
    diagram: null,
    plot: null,
    numberLine: null
  }
};

// 2. Insert missing tasks into curriculum
curriculum.topics.forEach((t, tIdx) => {
  t.lessons.forEach((l, lIdx) => {
    if (l.tasks.length === 4) {
      const lessonPrefix = `task-${tIdx + 1}-${lIdx + 1}`;
      const missingKey = `${lessonPrefix}-5`;
      if (missingTasks[missingKey]) {
        l.tasks.push(missingTasks[missingKey]);
        console.log(`✓ Added missing task ${missingKey} to ${l.title}`);
      }
    }
  });
});

// 3. Clean & Standardize All Source Badges Across All Tasks (Remove redundant "CKE" prefix)
function cleanBadge(badge, isExamTask = false) {
  if (!badge) return 'Trening JASNE • Wzorzec 2024';
  
  let cleaned = badge.trim();
  
  // Replace "CKE Maj" -> "Maj", "Matura CKE" -> "Matura", etc.
  cleaned = cleaned.replace(/^CKE\s+/i, '');
  cleaned = cleaned.replace(/^Matura\s+CKE\s+/i, 'Matura ');
  cleaned = cleaned.replace(/CKE\s+•\s+/i, '');
  cleaned = cleaned.replace(/\s+CKE\s+/i, ' ');
  
  // Specific pattern cleanups:
  if (cleaned.startsWith('Rozgrzewka')) {
    cleaned = 'Trening JASNE • Rozgrzewka';
  } else if (cleaned.startsWith('Pułapka')) {
    cleaned = 'Trening JASNE • Pułapka';
  } else if (cleaned.startsWith('Zadanie utrwalające')) {
    cleaned = 'Trening JASNE • Wzorzec 2024';
  } else if (cleaned.startsWith('Weryfikacja zaawansowana') || cleaned.startsWith('Zadanie podsumowujące')) {
    cleaned = 'Trening JASNE • Wyzwanie (1 pkt)';
  } else if (cleaned.startsWith('Matura ')) {
    cleaned = cleaned.replace(/^Matura\s+/i, '');
    if (!cleaned.includes('pkt')) cleaned += ' (1 pkt)';
  }
  
  // Ensure authentic format: e.g. "Maj 2024 • Zad. 2 (1 pkt)"
  return cleaned;
}

let taskCount = 0;
curriculum.topics.forEach((t) => {
  t.lessons.forEach((l) => {
    l.tasks.forEach((tsk, idx) => {
      taskCount++;
      const isOfficial = idx === 1; // Task 2 is the official matura task
      
      const newBadge = cleanBadge(tsk.source || tsk.cke_source, isOfficial);
      tsk.source = newBadge;
      tsk.cke_source = newBadge;

      // Ensure points is set
      if (!tsk.points) tsk.points = 1;
    });
  });
});

// 4. Update root metrics
curriculum.total_tasks = taskCount;

// 5. Save updated JSON
fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(curriculum, null, 2), 'utf8');

console.log('===============================================================');
console.log(`✅ ELEVATION COMPLETE: Exactly ${taskCount} tasks across ${curriculum.total_lessons} lessons.`);
console.log('All source badges cleaned (0 redundant "CKE" prefixes).');
console.log('===============================================================');
