import type { SubjectPillarItem } from '../../schema_firestore';

/** Filary języka angielskiego – lekki moduł bez zależności od bazy zadań (ładowanej leniwie). */
export const ENGLISH_PILLARS: SubjectPillarItem[] = [
  {
    id: 'pillar-use-of-english',
    name: 'Filar I: Znajomość środków językowych',
    short_name: 'Środki Językowe',
    description: 'Gramatyka, parafrazy, luki w tekście, słowotwórstwo i minidialogi (Zadania 8–11).',
    icon: 'Sparkles',
    color: '#10B981',
    topics_count: 5,
    pointsGoal: 13
  },
  {
    id: 'pillar-listening',
    name: 'Filar II: Rozumienie ze słuchu',
    short_name: 'Rozumienie ze Słuchu',
    description: 'Wychwytywanie intencji mówcy, eliminacja dystraktorów i zadania na uzupełnianie informacji (Zadania 1–3).',
    icon: 'Headphones',
    color: '#3B82F6',
    topics_count: 3,
    pointsGoal: 15
  },
  {
    id: 'pillar-reading',
    name: 'Filar III: Rozumienie tekstów pisanych',
    short_name: 'Czytanie Tekstów',
    description: 'Dobieranie nagłówków, luki spójnościowe, teksty wieloźródłowe i Prawda/Fałsz (Zadania 4–7).',
    icon: 'BookOpen',
    color: '#F59E0B',
    topics_count: 3,
    pointsGoal: 20
  },
  {
    id: 'pillar-writing',
    name: 'Filar IV: Wypowiedź pisemna (E-mail & Blog)',
    short_name: 'Warsztat Pisania',
    description: 'Warsztat 4 kropek CKE, łączniki zdań, bank złotych zwrotów i ewaluacja AI (Zadanie 12).',
    icon: 'PenTool',
    color: '#8B5CF6',
    topics_count: 4,
    pointsGoal: 12
  }
];
