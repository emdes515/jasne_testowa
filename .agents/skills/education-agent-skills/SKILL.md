---
name: education-agent-skills
description: "Evidence-based pedagogical intelligence library with 165 skills across 20 domains (cognitive load theory, dual coding, worked-example fading, progressive hints, student error diagnosis, active recall, retrieval practice, socratic tutoring). Use when designing learning experiences, explanations, hint ladders, student diagnostics, and pedagogical sequences."
---

# Education Agent Skills Library (165 Evidence-Based Skills)

A comprehensive pedagogical knowledge base and skill library covering 20 domains of learning science, curriculum design, student interaction patterns, and active learning scaffolds.

## When to Apply

Use this skill when:
- Designing microlearning lesson structures or explanations.
- Implementing progressive hint ladders (`progressive-hint-ladder`).
- Diagnosing student misconceptions and errors (`stuck-and-error-diagnosis-coach`).
- Applying Cognitive Load Theory (Sweller) or Dual Coding (Paivio) to UI/visuals (`cognitive-load-analyser`, `dual-coding-designer`).
- Designing worked example fading (`worked-example-fading-designer`).
- Planning retrieval practice and spaced repetition schedules (`retrieval-practice-generator`, `spaced-practice-scheduler`).

---

## Key Domains & High-Impact Skills

All 165 skill definitions live locally in `./skills/<domain>/<skill-name>/SKILL.md`. Refer to `registry.json` for the complete manifest.

### 1. Student-Facing & Interactive Learning (`skills/student-learning/`)
- `progressive-hint-ladder/SKILL.md`: Multi-tier hint structure (Nudge $\to$ Strategic Hint $\to$ Structural Scaffold $\to$ Worked Step) without revealing the final answer immediately.
- `stuck-and-error-diagnosis-coach/SKILL.md`: Analyzes student input to classify errors into slip, conceptual misconception, or procedural gap.
- `retrieve-first-gate/SKILL.md`: Forces active recall before showing reference formulas or answers.
- `fading-manager/SKILL.md`: Systematically reduces scaffolding as student accuracy and confidence increase.
- `productive-failure-protocol/SKILL.md`: Structured protocol for allowing students to attempt an unfamiliar problem before direct instruction.

### 2. Memory & Learning Science (`skills/memory-learning-science/`)
- `cognitive-load-analyser/SKILL.md`: Evaluates intrinsic vs. extraneous vs. germane cognitive load in educational UI and problem text.
- `dual-coding-designer/SKILL.md`: Combines visual representations (SVG diagrams/charts) and text/math without redundancy or split-attention effect.
- `worked-example-fading-designer/SKILL.md`: Stepwise transition from fully worked examples to completion problems to independent tasks (Core-4 methodology).
- `retrieval-practice-generator/SKILL.md`: Generates low-stakes flash drills targeting previously learned concepts.
- `spaced-practice-scheduler/SKILL.md`: Intervals based on the forgetting curve (Campus Rust / Ebbinghaus).

### 3. Curriculum & Assessment (`skills/curriculum-assessment/`)
- `diagnostic-question-designer/SKILL.md`: Questions where each incorrect distractor diagnoses a specific misconception.
- `formative-assessment-builder/SKILL.md`: Continuous micro-checks embedded directly into the learning flow.

---

## How to Consult a Skill

To load and follow a specific pedagogical skill:
1. Locate the skill path in `./skills/<domain>/<skill-name>/SKILL.md` (or search `registry.json`).
2. Read the skill's `SKILL.md` using `view_file`.
3. Apply its step-by-step framework to the lesson, UI component, or task prompt.
