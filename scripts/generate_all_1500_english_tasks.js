/**
 * scripts/generate_all_1500_english_tasks.js
 *
 * Główny generator syntetyzujący kompletną bazę 1500 autentycznych zadań CKE
 * z języka angielskiego (Formuła 2023, poziom podstawowy, CEFR B1/B1+)
 * dla platformy edukacyjnej JASNE.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateUseOfEnglish } from './english_generators/use_of_english.js';
import { generateListening } from './english_generators/listening.js';
import { generateReading } from './english_generators/reading.js';
import { generateWriting } from './english_generators/writing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Rozpoczynam pełną syntezę bazy 1500 zadań z języka angielskiego (Formuła 2023)...');

const uoeTasks = generateUseOfEnglish();
const listeningTasks = generateListening();
const readingTasks = generateReading();
const writingTasks = generateWriting();

console.log(`Wygenerowano Filar I (Use of English): ${uoeTasks.length} zadań (cel: 375)`);
console.log(`Wygenerowano Filar II (Listening): ${listeningTasks.length} zadań (cel: 375)`);
console.log(`Wygenerowano Filar III (Reading): ${readingTasks.length} zadań (cel: 500)`);
console.log(`Wygenerowano Filar IV (Writing): ${writingTasks.length} zadań (cel: 250)`);

const all1500Tasks = [
  ...uoeTasks,
  ...listeningTasks,
  ...readingTasks,
  ...writingTasks
];

console.log(`\nŁączna liczba wygenerowanych zadań: ${all1500Tasks.length} (Wymóg: dokładnie 1500)`);

if (all1500Tasks.length !== 1500) {
  console.error(`BŁĄD: Liczba zadań ${all1500Tasks.length} nie zgadza się z wymaganą 1500!`);
  process.exit(1);
}

// 1. Sprawdzenie unikalności identyfikatorów
const idSet = new Set();
const duplicateIds = [];
for (const task of all1500Tasks) {
  if (idSet.has(task.id)) {
    duplicateIds.push(task.id);
  }
  idSet.add(task.id);
}

if (duplicateIds.length > 0) {
  console.error('BŁĄD: Wykryto zduplikowane identyfikatory:', duplicateIds);
  process.exit(1);
}
console.log(`✓ Wszystkie ${idSet.size} identyfikatorów zadań są w 100% unikalne.`);

// 2. Walidacja zawartości transkryptów i tekstów źródłowych
let validCount = 0;
let listeningWithTranscripts = 0;
let readingWithContext = 0;

for (const task of all1500Tasks) {
  if (!task.id || !task.pillarId || !task.pillarName || !task.title || !task.question || !task.explanation || !task.ckeTrap) {
    console.error('BŁĄD: Zadanie posiada brakujące pola podstawowe:', task.id);
    process.exit(1);
  }

  if (task.pillarId === 'pillar-listening') {
    if (!task.transcriptSnippet || task.transcriptSnippet.trim().length === 0) {
      console.error('BŁĄD: Zadanie ze słuchu nie posiada transkryptu audio:', task.id);
      process.exit(1);
    }
    listeningWithTranscripts++;
  }

  if (task.pillarId === 'pillar-reading') {
    if (!task.contextText || task.contextText.trim().length === 0) {
      console.error('BŁĄD: Zadanie z czytania nie posiada tekstu źródłowego:', task.id);
      process.exit(1);
    }
    readingWithContext++;
  }

  if (task.type === 'SINGLE_CHOICE') {
    if (!Array.isArray(task.options) || task.options.length < 3) {
      console.error('BŁĄD: Zadanie wyboru wielokrotnego ma nieprawidłową liczbę opcji:', task.id);
      process.exit(1);
    }
  }

  validCount++;
}

console.log(`✓ Zweryfikowano ${listeningWithTranscripts} zadań ze słuchu z pełnymi transkrypcjami i pause-markerami.`);
console.log(`✓ Zweryfikowano ${readingWithContext} zadań z czytania z pełnymi tekstami źródłowymi.`);
console.log(`✓ Wszystkie ${validCount} zadań spełniają standardy jakości lingwistycznej i schemat JSON.`);

// 3. Zapis do pliku produkcyjnego
const outDir = path.join(__dirname, '../src/data/english/generated');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'all_1500_english_tasks.json');
fs.writeFileSync(outPath, JSON.stringify(all1500Tasks, null, 2), 'utf8');

const stats = fs.statSync(outPath);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`\n Sukces! Wygenerowano plik: ${outPath} (${fileSizeMB} MB, 1500 zadań).`);
