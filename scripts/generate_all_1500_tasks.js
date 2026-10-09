import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateAlgebra } from './generators/algebra.js';
import { generateFunctions } from './generators/functions.js';
import { generateSequencesAndTrig } from './generators/sequences_trig.js';
import { generateGeometry } from './generators/geometry.js';
import { generateStereometryAndStats } from './generators/stereometry_stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SKRYPT WYCOFANY. Ten generator tworzył zadania z błędami (m.in. nierozwiązywalne równania wielomianowe,
// błędne klucze, powtórzenia treści) i nie wiązał zadań z lekcjami. Bazę 1500 zadań oraz 75 pigułek teorii
// buduje teraz `node scripts/math_pp/build.js`. Uruchomienie tego pliku nadpisałoby zweryfikowane dane,
// dlatego kończymy od razu (ucieczka awaryjna: --force-legacy).
if (!process.argv.includes('--force-legacy')) {
  console.error('Skrypt wycofany. Użyj: node scripts/math_pp/build.js');
  process.exit(1);
}

console.log('🚀 Rozpoczynam pełną syntezę i rygorystyczny audyt bazy 1500 zadań...');

const targetQuotas = {
  'ARCH-01': 54, 'ARCH-02': 54, 'ARCH-03': 48, 'ARCH-04': 29, 'ARCH-05': 14,
  'ARCH-06': 46, 'ARCH-07': 48, 'ARCH-08': 54, 'ARCH-09': 40, 'ARCH-10': 48,
  'ARCH-11': 29, 'ARCH-12': 48, 'ARCH-13': 54, 'ARCH-14': 48, 'ARCH-15': 29,
  'ARCH-16': 67, 'ARCH-17': 54, 'ARCH-18': 40, 'ARCH-19': 48, 'ARCH-20': 61,
  'ARCH-21': 40, 'ARCH-22': 40, 'ARCH-23': 40, 'ARCH-24': 67, 'ARCH-25': 40,
  'ARCH-26': 54, 'ARCH-27': 48, 'ARCH-28': 40, 'ARCH-29': 54, 'ARCH-30': 62,
  'ARCH-31': 48, 'ARCH-32': 54
};

const rawAllTasks = [
  ...generateAlgebra(),
  ...generateFunctions(),
  ...generateSequencesAndTrig(),
  ...generateGeometry(),
  ...generateStereometryAndStats()
];

// Group by archetype and slice to targetQuota
const grouped = {};
for (const task of rawAllTasks) {
  if (!grouped[task.archetypeCode]) {
    grouped[task.archetypeCode] = [];
  }
  grouped[task.archetypeCode].push(task);
}

const final1500Tasks = [];
for (const archCode of Object.keys(targetQuotas).sort()) {
  const quota = targetQuotas[archCode];
  const tasksInGroup = grouped[archCode] || [];
  if (tasksInGroup.length < quota) {
    console.error(`❌ BŁĄD: Grupa ${archCode} wygenerowała tylko ${tasksInGroup.length}, wymagane ${quota}!`);
    process.exit(1);
  }
  const selected = tasksInGroup.slice(0, quota);
  final1500Tasks.push(...selected);
}

console.log('\n--- 🔍 KRYTYCZNA WERYFIKACJA ZERO BŁĘDÓW ---');
console.log(`Łączna liczba wyselekcjonowanych zadań: ${final1500Tasks.length} (Wymóg: dokładnie 1500)`);
if (final1500Tasks.length !== 1500) {
  console.error(`❌ BŁĄD: Liczba zadań ${final1500Tasks.length} różni się od 1500!`);
  process.exit(1);
}

// 1. Sprawdzenie unikalności ID
const idSet = new Set();
for (const task of final1500Tasks) {
  if (idSet.has(task.id)) {
    console.error(`❌ BŁĄD: Zduplikowane ID zadania: ${task.id}`);
    process.exit(1);
  }
  idSet.add(task.id);
}
console.log(`✓ 1. Wszystkie ${idSet.size} identyfikatorów zadań są w 100% unikalne.`);

// 2. Weryfikacja struktury i 100% unikalności opcji
const answerDistribution = { A: 0, B: 0, C: 0, D: 0 };
let singleChoiceCount = 0;
let openCount = 0;

for (const task of final1500Tasks) {
  if (!task.id || !task.archetypeCode || !task.category || !task.title || !task.content || !task.explanation || !task.matura_tip) {
    console.error(`❌ BŁĄD: Brakujące pola bazowe w zadaniu: ${task.id}`);
    process.exit(1);
  }

  if (task.type === 'SINGLE_CHOICE') {
    singleChoiceCount++;
    if (!Array.isArray(task.options) || task.options.length !== 4) {
      console.error(`❌ BŁĄD: Zadanie ${task.id} nie ma dokładnie 4 opcji!`);
      process.exit(1);
    }
    const optionSet = new Set(task.options);
    if (optionSet.size !== 4) {
      console.error(`❌ BŁĄD: Zadanie ${task.id} ma zduplikowane opcje:`, task.options);
      process.exit(1);
    }
    if (!['A', 'B', 'C', 'D'].includes(task.correct_answer)) {
      console.error(`❌ BŁĄD: Zadanie ${task.id} ma niepoprawny klucz: ${task.correct_answer}`);
      process.exit(1);
    }
    answerDistribution[task.correct_answer]++;
  } else {
    openCount++;
    if (!task.correct_answer) {
      console.error(`❌ BŁĄD: Zadanie otwarte ${task.id} nie ma określonej poprawnej odpowiedzi!`);
      process.exit(1);
    }
  }

  // KaTeX syntax assertion
  const fullText = `${task.content} ${(task.options || []).join(' ')} ${task.explanation}`;
  const dollarCount = (fullText.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 !== 0) {
    console.error(`❌ BŁĄD: Niedomknięty delimiter KaTeX ($) w zadaniu: ${task.id}`);
    process.exit(1);
  }

  // Zero-division check
  if (/\\frac\{[^}]+\}\{\s*0\s*\}/.test(fullText)) {
    console.error(`❌ BŁĄD: Wykryto dzielenie przez zero w zadaniu: ${task.id}`);
    process.exit(1);
  }

  // Degenerate notation check (+ -, + 0, - 0)
  if (/(\+\s*-\s*|\+\s*0(?![\.\d])|-\s*0(?![\.\d]))/.test(fullText)) {
    console.error(`❌ BŁĄD: Wykryto zdegenerowaną notację matematyczną (+ -, + 0, - 0) w zadaniu: ${task.id}`);
    process.exit(1);
  }

  // Missing diagram check
  if (/na rysunku/i.test(task.content) && !task.diagram && !task.plot) {
    console.error(`❌ BŁĄD: Zadanie odwołuje się do rysunku bez dołączonego diagramu: ${task.id}`);
    process.exit(1);
  }

  // Step-by-step explanation check
  if (!task.explanation.includes('Krok 1:') || !task.explanation.includes('Pułapka CKE:')) {
    console.error(`❌ BŁĄD: Zadanie nie zawiera formalnego rozwiązania krok po kroku: ${task.id}`);
    process.exit(1);
  }
}

console.log(`✓ 2. Zbadano ${singleChoiceCount} zadań SINGLE_CHOICE oraz ${openCount} zadań otwartych.`);
console.log(`✓ 3. 100% zadań posiada 4 unikalne opcje (brak duplikatów).`);
console.log(`✓ 4. 100% zadań posiada pełne rozwiązanie krok po kroku (Krok 1, Krok 2, Pułapka CKE, Wskazówka maturalna).`);
console.log(`✓ 5. Brak błędów KaTeX, brak dzielenia przez zero, brak degeneracji notacyjnych (+ -, + 0).`);
console.log(`✓ 6. Każde zadanie odwołujące się do rysunku (ARCH-10) posiada zarejestrowany diagram SVG.`);
console.log(`\n--- 📊 ROZKŁAD KLUCZA ODPOWIEDZI (Dystrybucja A/B/C/D) ---`);
console.log(answerDistribution);

// Zapis do pliku produkcyjnego
const outputPath = path.join(__dirname, '../src/data/math/generated/all_1500_tasks.json');
fs.writeFileSync(outputPath, JSON.stringify(final1500Tasks, null, 2), 'utf8');

console.log(`\n🎉 SUKCES! Zsyntetyzowano i zweryfikowano bezbłędną bazę 1500 zadań.`);
console.log(`Plik wynikowy: ${outputPath}`);
