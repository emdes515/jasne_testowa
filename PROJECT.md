# Project: JASNE Math Curriculum Audit and Standardization (CKE 2023)

## Architecture
- **Frontend UI & Presentation Layer**: `src/components/SessionRunner.tsx` handles active task sessions, theory pills (`concept_essence`, `core_formulas`, `worked_example`, `exam_trap`, `matura_context`), examiner tip displays, and task answering interactions.
- **Curriculum Data Store**: `seed/curriculum/curriculum_matematyka.json` (canonical master dataset: 15 sections, 225 lessons, 3880 tasks) and backup/distribution target `c:\Users\mateu\Downloads\mat\curriculum_matematyka.json`.
- **Standardization & Scripting Pipeline**: `scripts/` containing data processing, KaTeX formatting, deduplication, scoring key population, and verification scripts.
- **Reference Standard**: Official CKE 2023 Formula Sheet `c:\Users\mateu\Downloads\mat\Matematyka_podstawa\matematyka_podstawa\wzory-matematyczne-2023.pdf` (34 pages total, content on pages 4–32).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R1.1 Badge Label Unification | Remove "CKE" from "Patent maturalny CKE" -> "Patent maturalny" in `SessionRunner.tsx` | M1 | ORIGINAL_REQUEST §R1 |
| 2 | R1.2 Formula Sheet UI Labels | Change "Karta CKE: str. X" -> "Karta wzorów: str. X" and "W Karcie Wzorów CKE" -> "W karcie wzorów" | M1 | ORIGINAL_REQUEST §R1 |
| 3 | R1.3 Examiner Tip Header Label | Change "Wskazówka egzaminatora CKE" -> "Wskazówka egzaminatora" | M1 | ORIGINAL_REQUEST §R1 |
| 4 | R1.4 Examiner Tip Content Sanitization | Update `sanitizeExaminerTip` to strip repeated ALL-CAPS uppercase headers ending with `:` or `!` | M1 | ORIGINAL_REQUEST §R1 |
| 5 | R1.5 UI Negative String Cleanliness | Eliminate all residual "Karta CKE" and "Patent maturalny CKE" strings from `SessionRunner.tsx` | M1 | ORIGINAL_REQUEST §R1 |
| 6 | R2.1 KaTeX Formula Wrapping | Wrap bare mathematical variables, equations, and expressions in `matura_tip`, `worked_example`, `exam_trap`, `explanation`, and `hint` with `$ ... $` | M2 | ORIGINAL_REQUEST §R2 |
| 7 | R2.2 KaTeX Fraction Standardization | Convert slash fractions like `p = -b/(2a)` to proper KaTeX fractions `$p = -\frac{b}{2a}$` | M2 | ORIGINAL_REQUEST §R2 |
| 8 | R2.3 Karta Wzorów Terminology | Replace "Karty CKE" and "Karta CKE" with "karty wzorów" across tips and explanations in curriculum JSON | M2 | ORIGINAL_REQUEST §R2 |
| 9 | R2.4 Absolute Error Duplicate Fixes | Replace the 5 erroneously duplicated absolute error tips in `lesson-1-1`, `lesson-1-5`, `lesson-1-6` with lesson-appropriate matura tips | M2 | ORIGINAL_REQUEST §R2 |
| 10 | R2.5 Dział 1 Task Deduplication | Remove the 59 identical duplicate task entries appended to the ends of lessons 1.1–1.15 in Dział 1 | M2 | explorer_survey_2 handoff |
| 11 | R2.6 Dataset Synchronization | Mirror the standardized `seed/curriculum/curriculum_matematyka.json` to `c:\Users\mateu\Downloads\mat\curriculum_matematyka.json` | M2 | ORIGINAL_REQUEST §R2 |
| 12 | R3.1 CKE 2023 Formula Sheet Page Mapping | Align all `cke_page` references in `theory_pill.core_formulas` with official CKE 2023 sheet (pages 4–32) | M3 | ORIGINAL_REQUEST §R3 |
| 13 | R3.2 Options Quality & Prefix Cleanliness | Ensure multiple-choice tasks have 0 duplicates and 0 prefixes (e.g. "Odp A.", "A.") | M3 | ORIGINAL_REQUEST §R3 |
| 14 | R3.3 Correct Answer Integrity | Resolve all 277 `correct_answer` mismatches (delimiter wrapping, decimal comma, 18 content defects) | M3 | ORIGINAL_REQUEST §R3 |
| 15 | R3.4 Open Tasks Scoring Keys | Ensure 100% of open tasks (`OPEN_PROOF`, `OPEN_GENERAL`) have complete, authentic `scoring_key` criteria | M3 | ORIGINAL_REQUEST §R3 |
| 16 | R3.5 KaTeX Syntax Integrity Across Tasks | Fix the 12 corrupted JSON escape backslashes (`\f`, `\a`) and ensure 100% valid KaTeX parse across all text fields | M3 | ORIGINAL_REQUEST §R3 |
| 17 | R4.1 Automated Verification Script | Create `scripts/verify_math_curriculum.cjs` testing 100% of criteria and exiting with code 0 | M4 | ORIGINAL_REQUEST §R4 |
| 18 | R4.2 Build Verification | Verify `npm run build` succeeds with 0 errors | M4 | ORIGINAL_REQUEST §R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | SessionRunner UI & Sanitization | R1: UI labels and `sanitizeExaminerTip` in `SessionRunner.tsx` | none | DONE |
| M2 | KaTeX Standardization & Curriculum Cleaning | R2: KaTeX `$ ... $`, `\frac`, "karty wzorów", absolute error tips, deduplication, sync | none | PLANNED |
| M3 | Task Audit, Scoring Keys & CKE 2023 Alignment | R3: Correct answer matching, scoring keys for 48 open tasks, CKE pages (4–32), KaTeX escape fixes | M2 | PLANNED |
| M4 | Automated Verification Test Suite & Build | R4: `scripts/verify_math_curriculum.cjs` and `npm run build` | M1, M2, M3 | PLANNED |

## Interface Contracts
### `SessionRunner.tsx` ↔ Curriculum Data (`seed/curriculum/curriculum_matematyka.json`)
- `theory_pill.matura_context`: string. `sanitizeExaminerTip` receives this string and returns clean text without uppercase banner prefixes.
- `theory_pill.core_formulas[i]`: object `{ title: string, latex: string, description: string, in_cke_sheet: boolean, cke_page: string | null, matura_tip: string }`.
  - When rendered in `SessionRunner.tsx`: if `in_cke_sheet` is true, badge reads "W karcie wzorów", and page tag displays `Karta wzorów: str. X` (or exact string if already includes 'str.').
- `theory_pill.core_formulas[i].matura_tip`: string rendered with `MathRenderer`; contains inline LaTeX wrapped in `$ ... $`.
- `tasks[i].options`: array of strings. In `SINGLE_CHOICE`, length is 4. No prefixes.
- `tasks[i].correct_answer`: string matching exactly one element of `tasks[i].options` (including exact LaTeX delimiter and notation match).
- `tasks[i].scoring_key`: string or array of strings for `OPEN_PROOF` and `OPEN_GENERAL`.

### `scripts/verify_math_curriculum.cjs` ↔ Repository
- Standalone CommonJS script executed via `node scripts/verify_math_curriculum.cjs`.
- Exit code 0 if and only if all curriculum validation tests and UI label checks pass. Non-zero on any failure.

## Code Layout
- `src/components/SessionRunner.tsx`: UI component for practice sessions.
- `seed/curriculum/curriculum_matematyka.json`: Master database file for mathematics curriculum.
- `c:\Users\mateu\Downloads\mat\curriculum_matematyka.json`: Synchronized mirror of the master database.
- `scripts/verify_math_curriculum.cjs`: Verification test suite.
- `scripts/standardize_math_curriculum.cjs`: Standardization script.
