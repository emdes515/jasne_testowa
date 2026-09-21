'use strict';

/**
 * ⚡ JEV 1.13 AI AUDIT ENGINE FOR JASNE MODULE 1
 * Powered by TypeSafe AI Jev 1.13 via OpenRouter /api/alpha/decisions
 * 
 * System 1 ultra-fast probabilistic decision engine for:
 * 1. Key accuracy & distractor ambiguity check
 * 2. CKE trap alignment & misconception detection
 * 3. LaTeX typography & KaTeX hygiene
 * 4. Core-4 didactic quality scoring (1-5)
 */

const fs = require('fs');
const path = require('path');

// 1. Load Environment & API Key
const envPath = path.resolve(__dirname, '../.env');
let openRouterKey = process.env.OPENROUTER_API_KEY;

if (!openRouterKey && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/OPENROUTER_API_KEY=(.*)/);
  if (match) openRouterKey = match[1].trim();
}

if (!openRouterKey) {
  console.error('❌ Missing OPENROUTER_API_KEY. Please set it in .env or environment.');
  process.exit(1);
}

const CURRICULUM_PATH = path.resolve(__dirname, '../seed/curriculum/curriculum_matematyka.json');
const rawData = fs.readFileSync(CURRICULUM_PATH, 'utf8');
const curriculum = JSON.parse(rawData);

// 2. Parse CLI Arguments
const args = process.argv.slice(2);
let maxTasks = null;
let targetTopic = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--sample' && args[i + 1]) {
    maxTasks = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--topic' && args[i + 1]) {
    targetTopic = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--all') {
    maxTasks = 9999;
  }
}

// Default to sample of 5 if no flags provided
if (maxTasks === null && targetTopic === null) {
  maxTasks = 5;
}

// 3. Gather Tasks
const allTasks = [];
curriculum.topics.forEach((topic, tIdx) => {
  if (targetTopic !== null && (tIdx + 1) !== targetTopic) return;

  topic.lessons.forEach((lesson, lIdx) => {
    (lesson.tasks || []).forEach((task, taskIdx) => {
      allTasks.push({
        topicNum: tIdx + 1,
        topicTitle: topic.title,
        lessonNum: lIdx + 1,
        lessonTitle: lesson.title,
        taskIndex: taskIdx + 1,
        task: task
      });
    });
  });
});

const tasksToAudit = maxTasks ? allTasks.slice(0, maxTasks) : allTasks;

console.log('===============================================================');
console.log('       ⚡ JEV 1.13 SYSTEM-1 AI AUDIT ENGINE: JASNE MODUŁ 1      ');
console.log('===============================================================');
console.log(`Model:         typesafe/jev-1.13 via OpenRouter Decisions API`);
console.log(`Endpoint:      https://openrouter.ai/api/alpha/decisions`);
console.log(`Total Tasks:   ${tasksToAudit.length} (out of ${allTasks.length} in scope)`);
console.log('---------------------------------------------------------------\n');

// 4. Jev Decision Caller
async function evaluateTaskWithJev(taskItem) {
  const { task, topicTitle, lessonTitle } = taskItem;

  const statePayload = {
    task_id: task.id,
    task_type: task.type,
    topic: topicTitle,
    lesson: lessonTitle,
    question: task.question || task.content || task.math_statement,
    options: (task.options || []).map(o => ({
      id: o.id,
      text: o.text || o.content_latex,
      is_marked_correct: Boolean(o.is_correct)
    })),
    claimed_correct_answer: task.correct_answer || task.correctAnswer,
    explanation: task.explanation,
    cke_trap: task.cke_trap || task.ckeTrap
  };

  const decisionQuestions = {
    key_accuracy: {
      type: 'choice',
      instructions: 'Verify if the claimed_correct_answer is mathematically and unambiguously the ONLY correct option among the provided choices.',
      criteria: {
        CORRECT: 'The claimed correct answer is strictly and unambiguously correct.',
        WRONG_KEY: 'The claimed correct answer is mathematically wrong (another option is right).',
        AMBIGUOUS: 'Multiple options are mathematically correct or the question has multiple valid interpretations.'
      }
    },
    cke_trap_alignment: {
      type: 'choice',
      instructions: (task.options && task.options.length > 0)
        ? 'Verify if the distractors and cke_trap reflect genuine, authentic Polish secondary school matura pitfalls and common student misconceptions.'
        : 'Verify if the cke_trap and explanation accurately diagnose authentic Polish secondary school matura pitfalls and common student errors for this problem.',
      criteria: {
        AUTHENTIC_TRAPS: 'The problem features genuine, well-targeted student misconceptions and explicit CKE traps.',
        WEAK_DISTRACTORS: 'The distractors or trap are generic, trivial, or lack pedagogical value.'
      }
    },
    latex_hygiene: {
      type: 'choice',
      instructions: 'Check if mathematical expressions in the question, options, and explanation use clean, standard LaTeX syntax without raw ASCII hacks.',
      criteria: {
        CLEAN_LATEX: 'All mathematical terms are properly formatted with standard LaTeX delimiters ($...$).',
        LATEX_DEFECTS: 'Contains unescaped symbols, broken delimiters, or unformatted raw math strings.'
      }
    },
    didactic_score: {
      type: 'score',
      instructions: 'Rate the didactic quality of the explanation and task design on a scale of 1 to 5 for matura exam preparation.',
      criteria: [
        '1: Deficient or contains mathematical misconceptions',
        '2: Minimalist, dry, lacks pedagogical clarity',
        '3: Standard textbook problem and explanation',
        '4: Solid matura preparation with clear step-by-step reasoning',
        '5: Exemplary Core-4 standard: concise, identifies CKE trap, builds deep intuition'
      ]
    }
  };

  const startTime = Date.now();

  const response = await fetch('https://openrouter.ai/api/alpha/decisions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openRouterKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'typesafe/jev-1.13',
      state: statePayload,
      questions: decisionQuestions
    })
  });

  const latencyMs = Date.now() - startTime;

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter HTTP ${response.status}: ${errorText}`);
  }

  const result = await response.json();

  return {
    taskId: task.id,
    type: task.type,
    topicNum: taskItem.topicNum,
    lessonNum: taskItem.lessonNum,
    latencyMs,
    answers: result.answers,
    usage: result.usage,
    cost: result.usage?.cost || 0
  };
}

// 5. Worker Pool for Fast Concurrent Auditing
async function runAudit() {
  const CONCURRENCY = 4;
  const results = [];
  let totalCost = 0;
  let completed = 0;
  let failed = 0;

  const queue = [...tasksToAudit];

  async function worker(workerId) {
    while (queue.length > 0) {
      const taskItem = queue.shift();
      try {
        const evalResult = await evaluateTaskWithJev(taskItem);
        results.push(evalResult);
        totalCost += evalResult.cost;
        completed++;

        const keyChoice = evalResult.answers.key_accuracy?.choice;
        const trapChoice = evalResult.answers.cke_trap_alignment?.choice;
        const latexChoice = evalResult.answers.latex_hygiene?.choice;
        const score = evalResult.answers.didactic_score?.score?.toFixed(2);

        const statusIcon = keyChoice === 'CORRECT' ? '✅' : (keyChoice === 'AMBIGUOUS' ? '⚠️' : '❌');
        console.log(
          `[${completed}/${tasksToAudit.length}] ${statusIcon} Task ${taskItem.task.id} (${evalResult.latencyMs}ms) | ` +
          `Key: ${keyChoice} | Traps: ${trapChoice} | LaTeX: ${latexChoice} | Score: ${score}/5.0 | Cost: $${evalResult.cost.toFixed(6)}`
        );
      } catch (err) {
        failed++;
        console.error(`❌ Error auditing ${taskItem.task.id}:`, err.message);
      }
    }
  }

  const startTime = Date.now();
  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
  await Promise.all(workers);
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);

  // 6. Aggregate Statistics
  console.log('\n===============================================================');
  console.log('                   📊 JEV AUDIT SUMMARY RESULTS                ');
  console.log('===============================================================');
  console.log(`Total Tasks Audited: ${completed}`);
  console.log(`Failed / Errors:     ${failed}`);
  console.log(`Total Time:          ${totalDuration} s (avg ${(totalDuration / completed).toFixed(2)} s/task)`);
  console.log(`Total API Cost:      $${totalCost.toFixed(6)} USD`);

  const keyStats = { CORRECT: 0, AMBIGUOUS: 0, WRONG_KEY: 0 };
  const trapStats = { AUTHENTIC_TRAPS: 0, WEAK_DISTRACTORS: 0 };
  const latexStats = { CLEAN_LATEX: 0, LATEX_DEFECTS: 0 };
  let totalScore = 0;
  const issues = [];

  results.forEach(r => {
    const k = r.answers.key_accuracy?.choice;
    if (keyStats[k] !== undefined) keyStats[k]++;

    const t = r.answers.cke_trap_alignment?.choice;
    if (trapStats[t] !== undefined) trapStats[t]++;

    const l = r.answers.latex_hygiene?.choice;
    if (latexStats[l] !== undefined) latexStats[l]++;

    const s = r.answers.didactic_score?.score || 0;
    totalScore += s;

    if (k !== 'CORRECT' || l !== 'CLEAN_LATEX' || s < 3.0) {
      issues.push({
        taskId: r.taskId,
        keyVerdict: k,
        latexVerdict: l,
        score: s.toFixed(2),
        confidence: r.answers.key_accuracy?.confidence
      });
    }
  });

  const avgScore = (totalScore / (completed || 1)).toFixed(2);

  console.log(`\n🔑 Key Accuracy:`);
  console.log(`   - Strictly Correct: ${keyStats.CORRECT} (${((keyStats.CORRECT / completed) * 100).toFixed(1)}%)`);
  console.log(`   - Ambiguous:        ${keyStats.AMBIGUOUS} (${((keyStats.AMBIGUOUS / completed) * 100).toFixed(1)}%)`);
  console.log(`   - Wrong Key:        ${keyStats.WRONG_KEY} (${((keyStats.WRONG_KEY / completed) * 100).toFixed(1)}%)`);

  console.log(`\n🎯 CKE Trap Quality:`);
  console.log(`   - Authentic Traps:  ${trapStats.AUTHENTIC_TRAPS} (${((trapStats.AUTHENTIC_TRAPS / completed) * 100).toFixed(1)}%)`);
  console.log(`   - Weak Distractors: ${trapStats.WEAK_DISTRACTORS} (${((trapStats.WEAK_DISTRACTORS / completed) * 100).toFixed(1)}%)`);

  console.log(`\n📐 LaTeX Hygiene:`);
  console.log(`   - Clean LaTeX:      ${latexStats.CLEAN_LATEX} (${((latexStats.CLEAN_LATEX / completed) * 100).toFixed(1)}%)`);
  console.log(`   - LaTeX Defects:    ${latexStats.LATEX_DEFECTS} (${((latexStats.LATEX_DEFECTS / completed) * 100).toFixed(1)}%)`);

  console.log(`\n⭐ Average Core-4 Didactic Score: ${avgScore} / 5.00`);

  if (issues.length > 0) {
    console.log(`\n⚠️ Flagged Items (${issues.length}):`);
    issues.forEach(iss => {
      console.log(`   - ${iss.taskId}: Key=${iss.keyVerdict}, LaTeX=${iss.latexVerdict}, Score=${iss.score} (Conf: ${iss.confidence})`);
    });
  }

  // 7. Write Report to audits/
  const auditsDir = path.resolve(__dirname, '../audits');
  if (!fs.existsSync(auditsDir)) fs.mkdirSync(auditsDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(auditsDir, `jev_audit_report_${timestamp}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    model: 'typesafe/jev-1.13',
    totalAudited: completed,
    totalCostUsd: totalCost,
    averageScore: avgScore,
    keyStats,
    trapStats,
    latexStats,
    issues,
    results
  }, null, 2));

  console.log(`\n📁 Full JSON results saved to: ${reportPath}`);
}

runAudit().catch(err => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
