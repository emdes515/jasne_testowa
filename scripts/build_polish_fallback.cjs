const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_jezyk_polski.json'), 'utf8'));
const outPath = path.resolve(__dirname, '..', 'src', 'data', 'polishCurriculumFallback.ts');

const topicsStr = JSON.stringify(raw.topics.map(t => ({
  id: t.id,
  numericId: t.numericId,
  subject_id: 'jezyk-polski',
  pillar_id: t.pillar_id,
  pillar_name: t.pillar_name,
  title: t.title,
  name: t.title,
  short_title: t.short_title || t.title,
  description: t.description || '',
  icon: t.icon || 'BookOpen',
  color: t.color || '#F43F5E',
  matura_points_range: t.matura_points_range || '2-5 pkt',
  importance: t.importance || 'Kluczowy pewniak CKE',
  required_books: t.required_books || [],
  lessons_count: (t.lessons || []).length,
  tasks_count: (t.lessons || []).reduce((acc, l) => acc + (l.tasks || []).length, 0),
  lessons_metadata: (t.lessons || []).map(l => ({
    id: l.id,
    title: l.title,
    required_points: l.required_correct_tasks || 3,
    required_correct_tasks: l.required_correct_tasks || 3,
    estimated_time_formatted: l.estimated_time_formatted || '~5 min',
    tasks_count: (l.tasks || []).length
  }))
})), null, 2);

const lessonsList = raw.topics.flatMap(t => (t.lessons || []).map(l => ({
  id: l.id,
  topic_id: t.id,
  title: l.title,
  theory_pill: l.theory_pill || { concept_essence: l.title },
  formulaSheet: l.leksykon ? {
    title: l.leksykon.title || l.title,
    description: 'Leksykon CKE i kluczowe pojPęcia',
    formulas: (l.leksykon.pojęcia || []).map(p => ({
      name: p.title,
      formula: p.def,
      description: p.title
    })),
    goldenRule: l.leksykon.goldenRule || (l.theory_pill ? l.theory_pill.golden_rule : '') || '',
    ckeTrap: l.leksykon.ckeTrap || (l.theory_pill ? l.theory_pill.cke_trap : null) || null
  } : null,
  formula_sheet: null,
  tasks: (l.tasks || []).map(tsk => ({
    ...tsk,
    instruction: tsk.instruction || tsk.question || '',
    math_statement: tsk.math_statement || '',
    title: tsk.title || l.title,
    topic: t.title,
    hints: tsk.hints || { level_1: 'Definicja w leksykonie.', level_2: 'Kontekst tekstu.' }
  }))
})));

const lessonsStr = JSON.stringify(lessonsList, null, 2);

const code = [
  "import { TopicDocument, LessonDocument } from '../schema_firestore';",
  "",
  "export interface PolishPillarInfo {",
  "  id: string; title: string; name: string; short_title: string; description: string; icon: string; color: string; pointsGoal: number; topics_range: [number, number];",
  "}",
  "",
  "export const POLISH_PILLARS: PolishPillarInfo[] = [",
  "  {",
  "    id: 'pillar-1-jezyk-w-uzyciu', title: 'Język w użyciu i Retoryka', name: 'Język w użyciu i Retoryka', short_title: 'Język w użyciu',",
  "    description: 'Funkcje języka, retoryka, stylistyka i notatka syntetyzująca (Arkusz 1, cz. 1 –10 pkt)',",
  "    icon: 'MessageSquare', color: '#F43F5E', pointsGoal: 10, topics_range: [1, 4]",
  "  },",
  "  {",
  "    id: 'pillar-2-lektury', title: 'Kanon Lektur i Epoki', name: 'Kanon Lektur i Epoki', short_title: 'Lektury i Epoki',",
  "    description: 'Paszporty epok, omówienie lektur z gwiazdką, toposy i test historycznoliteracki (Arkusz 1, cz. 2 – 15 pkt)',",
  "    icon: 'BookOpen', color: '#8B5CF6', pointsGoal: 15, topics_range: [5, 16]",
  "  },",
  "  {",
  "    id: 'pillar-3-wypracowanie', title: 'Trenażer Wypracowania', name: 'Trenażer Wypracowania', short_title: 'Wypracowanie',",
  "    description: 'Konstrukcja tezy, argumentacja C-W-K/TEEL, matryca kontekstów i obrona przed kardynałem (Arkusz 2 – 35 pkt)',",
  "    icon: 'PenTool', color: '#10B981', pointsGoal: 35, topics_range: [17, 20]",
  "  }",
  "];",
  "",
  "export const POLISH_FALLBACK_TOPICS: TopicDocument[] = " + topicsStr + " as TopicDocument[];",
  "",
  "const rawLessons: any[] = " + lessonsStr + ";",
  "const lessonsMap: Record<string, LessonDocument> = {};",
  "rawLessons.forEach((l) => { lessonsMap[l.id] = l as LessonDocument; });",
  "",
  "export function getPolishFallbackLesson(lessonId: string): LessonDocument | null {",
  "  if (!lessonId) return null;",
  "  const clean = lessonId.replace(/^pol-/, '').replace(/^lesson-/, '');",
  "  for (const key of Object.keys(lessonsMap)) {",
  "    if (key === lessonId || key.endsWith(lessonId) || key.replace(/^pol-/, '').replace(/^lesson-/, '') === clean) {",
  "      return lessonsMap[key];",
  "    }",
  "  }",
  "  return null;",
  "}",
  "",
  "export function getPolishFallbackTopic(topicId: string): TopicDocument | null {",
  "  return POLISH_FALLBACK_TOPICS.find(t => t.id === topicId || String(t.numericId) === topicId.replace(/\\D/g, '')) || null;",
  "}"
].join('\n');
fs.writeFileSync(outPath, code, 'utf8');
const stat = fs.statSync(outPath);
console.log('Successfully wrote', outPath, 'Bytes:', stat.size);
