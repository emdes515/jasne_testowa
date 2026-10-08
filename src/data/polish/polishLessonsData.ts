/**
 * polishLessonsData.ts
 *
 * Komplet 75 mikro-lekcji Core-4 dla Języka Polskiego (Formuła 2023)
 * podzielonych równomiernie: po dokładnie 5 lekcji na każdy z 15 Działów CKE.
 * Zawiera pełne 15 Działów Egzaminacyjnych (Język w użyciu, Notatka, Epoki, Wypracowanie).
 */

import { PolishLesson } from '../../types/lessonTypes';

export interface PolishSection {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  pillarName: string;
  icon: string;
  points_range: string;
  description: string;
  lessonIds: string[];
}

export const POLISH_SECTIONS: PolishSection[] = [
  {
    "id": "pol-dzial-1",
    "numericId": 1,
    "title": "Dział 1: Język polski w użyciu & Czytanie krytyczne",
    "short_title": "Język w użyciu",
    "pillarName": "Część 1 CKE • Zeszyt 1",
    "icon": "FileText",
    "points_range": "10 pkt",
    "description": "Analiza tekstu nieliterackiego, fakty i opinie, manipulacja semantyczna, słowa-klucze i tabela Prawda/Fałsz.",
    "lessonIds": [
      "pol-lesson-1-1",
      "pol-lesson-1-2",
      "pol-lesson-1-3",
      "pol-lesson-1-4",
      "pol-lesson-1-5"
    ]
  },
  {
    "id": "pol-dzial-2",
    "numericId": 2,
    "title": "Dział 2: Notatka syntetyzująca CKE (Klucz do 4 pkt)",
    "short_title": "Notatka syntetyzująca",
    "pillarName": "Część 1 CKE • Zeszyt 1",
    "icon": "PenTool",
    "points_range": "4 pkt",
    "description": "Zasady notatki syntetyzującej, twardy limit 60–90 słów, synteza dwóch tekstów i eliminacja opinii własnej.",
    "lessonIds": [
      "pol-lesson-2-1",
      "pol-lesson-2-2",
      "pol-lesson-2-3",
      "pol-lesson-2-4",
      "pol-lesson-2-5"
    ]
  },
  {
    "id": "pol-dzial-3",
    "numericId": 3,
    "title": "Dział 3: Retoryka, środki stylistyczne i funkcje języka",
    "short_title": "Retoryka i Stylistyka",
    "pillarName": "Część 1 CKE • Zeszyt 1",
    "icon": "Flame",
    "points_range": "6 pkt",
    "description": "Funkcje języka (impresywna, ekspresywna, poznawcza), środki stylistyczne, etos/logos/pathos i manipulacja językowa.",
    "lessonIds": [
      "pol-lesson-3-1",
      "pol-lesson-3-2",
      "pol-lesson-3-3",
      "pol-lesson-3-4",
      "pol-lesson-3-5"
    ]
  },
  {
    "id": "pol-dzial-4",
    "numericId": 4,
    "title": "Dział 4: Starożytność i Biblia – Fundamenty kultury",
    "short_title": "Antyk i Biblia",
    "pillarName": "Test historycznoliteracki",
    "icon": "BookOpen",
    "points_range": "4–6 pkt",
    "description": "Księga Hioba, Kohelet, Apokalipsa św. Jana, mitologia grecka, Iliada, Antygona Sofoklesa i toposy antyczne.",
    "lessonIds": [
      "pol-lesson-4-1",
      "pol-lesson-4-2",
      "pol-lesson-4-3",
      "pol-lesson-4-4",
      "pol-lesson-4-5"
    ]
  },
  {
    "id": "pol-dzial-5",
    "numericId": 5,
    "title": "Dział 5: Średniowiecze – Teocentryzm, asceza i etos rycerski",
    "short_title": "Średniowiecze",
    "pillarName": "Test historycznoliteracki",
    "icon": "Shield",
    "points_range": "3–5 pkt",
    "description": "Bogurodzica, Lament świętokrzyski, Legenda o św. Aleksym, Rozmowa Mistrza Polikarpa i Pieśń o Rolandzie.",
    "lessonIds": [
      "pol-lesson-5-1",
      "pol-lesson-5-2",
      "pol-lesson-5-3",
      "pol-lesson-5-4",
      "pol-lesson-5-5"
    ]
  },
  {
    "id": "pol-dzial-6",
    "numericId": 6,
    "title": "Dział 6: Renesans – Humanizm i twórczość Jana Kochanowskiego",
    "short_title": "Renesans (Odrodzenie)",
    "pillarName": "Test historycznoliteracki",
    "icon": "Compass",
    "points_range": "5–7 pkt",
    "description": "Humanizm, Jan Kochanowski (Pieśni, Treny, Odprawa posłów greckich, Fraszki) oraz motyw theatrum mundi.",
    "lessonIds": [
      "pol-lesson-6-1",
      "pol-lesson-6-2",
      "pol-lesson-6-3",
      "pol-lesson-6-4",
      "pol-lesson-6-5"
    ]
  },
  {
    "id": "pol-dzial-7",
    "numericId": 7,
    "title": "Dział 7: Barok – Niepokój egzystencjalny, koncept i sarmatyzm",
    "short_title": "Barok",
    "pillarName": "Test historycznoliteracki",
    "icon": "Layers",
    "points_range": "4–6 pkt",
    "description": "Poezja metafizyczna (Sęp-Szarzyński, Naborowski), konceptyzm (Morsztyn), sarmatyzm i Pamiętniki Paska.",
    "lessonIds": [
      "pol-lesson-7-1",
      "pol-lesson-7-2",
      "pol-lesson-7-3",
      "pol-lesson-7-4",
      "pol-lesson-7-5"
    ]
  },
  {
    "id": "pol-dzial-8",
    "numericId": 8,
    "title": "Dział 8: Oświecenie – Racjonalizm, dydaktyzm i satyra",
    "short_title": "Oświecenie",
    "pillarName": "Test historycznoliteracki",
    "icon": "Lightbulb",
    "points_range": "4–5 pkt",
    "description": "Wiek rozumu, Ignacy Krasicki (Satyry, Bajki, Hymn do miłości ojczyzny) oraz krytyka wad narodowych.",
    "lessonIds": [
      "pol-lesson-8-1",
      "pol-lesson-8-2",
      "pol-lesson-8-3",
      "pol-lesson-8-4",
      "pol-lesson-8-5"
    ]
  },
  {
    "id": "pol-dzial-9",
    "numericId": 9,
    "title": "Dział 9: Romantyzm I: Adam Mickiewicz – Od Ballad do Dziadów cz. II i IV",
    "short_title": "Romantyzm: Ballady i Dziady cz. II/IV",
    "pillarName": "Test historycznoliteracki",
    "icon": "Flame",
    "points_range": "6–8 pkt",
    "description": "Romantyczność jako manifest epoki, Ballady i romanse, Dziady cz. II (obrzęd i moralność) oraz Dziady cz. IV (miłość romantyczna).",
    "lessonIds": [
      "pol-lesson-9-1",
      "pol-lesson-9-2",
      "pol-lesson-9-3",
      "pol-lesson-9-4",
      "pol-lesson-9-5"
    ]
  },
  {
    "id": "pol-dzial-10",
    "numericId": 10,
    "title": "Dział 10: Romantyzm II: Dziady cz. III, Kordian i Pan Tadeusz",
    "short_title": "Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz",
    "pillarName": "Test historycznoliteracki",
    "icon": "Crown",
    "points_range": "8–12 pkt",
    "description": "Wielka Improwizacja, mesjanizm, martyrologia narodowa, Kordian Słowackiego (winkelriedyzm) i Pan Tadeusz jako epopeja.",
    "lessonIds": [
      "pol-lesson-10-1",
      "pol-lesson-10-2",
      "pol-lesson-10-3",
      "pol-lesson-10-4",
      "pol-lesson-10-5"
    ]
  },
  {
    "id": "pol-dzial-11",
    "numericId": 11,
    "title": "Dział 11: Pozytywizm – Lalka Prusa, praca organiczna i Zbrodnia i kara",
    "short_title": "Pozytywizm i Realizm",
    "pillarName": "Test historycznoliteracki",
    "icon": "Award",
    "points_range": "8–12 pkt",
    "description": "Lalka Bolesława Prusa (Wokulski, Rzecki, Łęcka), praca organiczna i u podstaw, Gloria victis oraz Zbrodnia i kara.",
    "lessonIds": [
      "pol-lesson-11-1",
      "pol-lesson-11-2",
      "pol-lesson-11-3",
      "pol-lesson-11-4",
      "pol-lesson-11-5"
    ]
  },
  {
    "id": "pol-dzial-12",
    "numericId": 12,
    "title": "Dział 12: Młoda Polska – Wesele Wyspiańskiego i modernizm",
    "short_title": "Młoda Polska",
    "pillarName": "Test historycznoliteracki",
    "icon": "Zap",
    "points_range": "7–10 pkt",
    "description": "Wesele Stanisława Wyspiańskiego, chocholi taniec, bronowicka chata, dekadentyzm, poezja Tetmajera i Kasprowicza.",
    "lessonIds": [
      "pol-lesson-12-1",
      "pol-lesson-12-2",
      "pol-lesson-12-3",
      "pol-lesson-12-4",
      "pol-lesson-12-5"
    ]
  },
  {
    "id": "pol-dzial-13",
    "numericId": 13,
    "title": "Dział 13: Dwudziestolecie międzywojenne – Odzyskanie niepodległości i awangarda",
    "short_title": "Dwudziestolecie międzywojenne",
    "pillarName": "Test historycznoliteracki",
    "icon": "Compass",
    "points_range": "6–8 pkt",
    "description": "Przedwiośnie Stefana Żeromskiego (szklane domy, Cezary Baryka), Schulz (Sklepy cynamonowe) i Gombrowicz (Ferdydurke).",
    "lessonIds": [
      "pol-lesson-13-1",
      "pol-lesson-13-2",
      "pol-lesson-13-3",
      "pol-lesson-13-4",
      "pol-lesson-13-5"
    ]
  },
  {
    "id": "pol-dzial-14",
    "numericId": 14,
    "title": "Dział 14: Literatura wojenna i obozowa – Odczłowieczenie i heroizm",
    "short_title": "Literatura wojenna i okupacyjna",
    "pillarName": "Test historycznoliteracki",
    "icon": "Shield",
    "points_range": "7–10 pkt",
    "description": "Tadeusz Borowski (człowiek zlagrowany), Gustaw Herling-Grudziński (Inny świat), Hanna Krall (Zdążyć przed Panem Bogiem).",
    "lessonIds": [
      "pol-lesson-14-1",
      "pol-lesson-14-2",
      "pol-lesson-14-3",
      "pol-lesson-14-4",
      "pol-lesson-14-5"
    ]
  },
  {
    "id": "pol-dzial-15",
    "numericId": 15,
    "title": "Dział 15: Warsztat wypracowania maturalnego CKE (35 pkt)",
    "short_title": "Wypracowanie maturalne",
    "pillarName": "Część 2 CKE • Zeszyt 2",
    "icon": "PenTool",
    "points_range": "35 pkt",
    "description": "Struktura rozprawki problemowej, kompozycja tezy, dobór lektur z gwiazdką, konteksty i eliminacja błędu kardynalnego.",
    "lessonIds": [
      "pol-lesson-15-1",
      "pol-lesson-15-2",
      "pol-lesson-15-3",
      "pol-lesson-15-4",
      "pol-lesson-15-5"
    ]
  }
];

export const POLISH_LESSONS: PolishLesson[] = [
  {
    "id": "pol-lesson-1-1",
    "number": 1,
    "title": "Fakty, opinie i manipulacja semantyczna w tekście nieliterackim",
    "subtitle": "Rozpoznawanie wartościowania i kwantyfikatorów skrajnych w arkuszu CKE",
    "module": "Język w użyciu",
    "epoch": "Język w użyciu",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 1: Język w użyciu. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Fakty, opinie i manipulacja semantyczna w tekście nieliterackim",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Fakty, opinie i manipulacja semantyczna w tekście nieliterackim",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Fakty, opinie i manipulacja semantyczna w tekście nieliterackim” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-1-1-a",
      "pol-task-1-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Fakty, opinie i manipulacja semantyczna w tekście nieliterackim",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-1-2",
    "number": 2,
    "title": "Teza, hipoteza i hierarchia argumentacji w eseju",
    "subtitle": "Lokalizacja stanowiska autora i rozróżnienie argumentu od przykładu",
    "module": "Język w użyciu",
    "epoch": "Język w użyciu",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 1: Język w użyciu. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Teza, hipoteza i hierarchia argumentacji w eseju",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Teza, hipoteza i hierarchia argumentacji w eseju",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Teza, hipoteza i hierarchia argumentacji w eseju” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-1-2-a",
      "pol-task-1-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Teza, hipoteza i hierarchia argumentacji w eseju",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-1-3",
    "number": 3,
    "title": "Słowa-klucze i logiczna spójność akapitów (Kohezja)",
    "subtitle": "Śledzenie nici wywodu za pomocą zaimków i spójników w Zeszycie 1",
    "module": "Język w użyciu",
    "epoch": "Język w użyciu",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 1: Język w użyciu. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Słowa-klucze i logiczna spójność akapitów (Kohezja)",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Słowa-klucze i logiczna spójność akapitów (Kohezja)",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Słowa-klucze i logiczna spójność akapitów (Kohezja)” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-1-3-a",
      "pol-task-1-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Słowa-klucze i logiczna spójność akapitów (Kohezja)",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-1-4",
    "number": 4,
    "title": "Tabela Prawda/Fałsz – Strategia eliminacji pułapek CKE",
    "subtitle": "Algorytm weryfikacji każdego wiersza bez nadinterpretacji tekstu",
    "module": "Język w użyciu",
    "epoch": "Język w użyciu",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 1: Język w użyciu. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Tabela Prawda/Fałsz – Strategia eliminacji pułapek CKE",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Tabela Prawda/Fałsz – Strategia eliminacji pułapek CKE",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Tabela Prawda/Fałsz – Strategia eliminacji pułapek CKE” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-1-4-a",
      "pol-task-1-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Tabela Prawda/Fałsz – Strategia eliminacji pułapek CKE",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-1-5",
    "number": 5,
    "title": "Streszczenie logiczne i parafraza w zadaniach otwartych",
    "subtitle": "Przekład myśli autora na własne słowa bez cytowania blokowego",
    "module": "Język w użyciu",
    "epoch": "Język w użyciu",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 1: Język w użyciu. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Streszczenie logiczne i parafraza w zadaniach otwartych",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Streszczenie logiczne i parafraza w zadaniach otwartych",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Streszczenie logiczne i parafraza w zadaniach otwartych” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-1-5-a",
      "pol-task-1-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Streszczenie logiczne i parafraza w zadaniach otwartych",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-2-1",
    "number": 6,
    "title": "Kryteria oceny notatki syntetyzującej: Matryca CKE (4 pkt)",
    "subtitle": "Treść (0-2 pkt), Kompozycja i spójność (0-1 pkt), Język i poprawność (0-1 pkt)",
    "module": "Język w użyciu",
    "epoch": "Notatka syntetyzująca",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 2: Notatka syntetyzująca. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Kryteria oceny notatki syntetyzującej: Matryca CKE (4 pkt)",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Kryteria oceny notatki syntetyzującej: Matryca CKE (4 pkt)",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Kryteria oceny notatki syntetyzującej: Matryca CKE (4 pkt)” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-2-1-a",
      "pol-task-2-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Kryteria oceny notatki syntetyzującej: Matryca CKE (4 pkt)",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-2-2",
    "number": 7,
    "title": "Selekcja informacji i wspólny temat dwóch tekstów źródłowych",
    "subtitle": "Jak wyznaczyć oś syntezy i porównać stanowiska autorów",
    "module": "Język w użyciu",
    "epoch": "Notatka syntetyzująca",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 2: Notatka syntetyzująca. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Selekcja informacji i wspólny temat dwóch tekstów źródłowych",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Selekcja informacji i wspólny temat dwóch tekstów źródłowych",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Selekcja informacji i wspólny temat dwóch tekstów źródłowych” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-2-2-a",
      "pol-task-2-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Selekcja informacji i wspólny temat dwóch tekstów źródłowych",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-2-3",
    "number": 8,
    "title": "Architektura jednoakapitowej notatki (Model 3 zdań)",
    "subtitle": "Wprowadzenie tematu -> Zestawienie stanowisk -> Syntetyczna konkluzja",
    "module": "Język w użyciu",
    "epoch": "Notatka syntetyzująca",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 2: Notatka syntetyzująca. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Architektura jednoakapitowej notatki (Model 3 zdań)",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Architektura jednoakapitowej notatki (Model 3 zdań)",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Architektura jednoakapitowej notatki (Model 3 zdań)” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-2-3-a",
      "pol-task-2-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Architektura jednoakapitowej notatki (Model 3 zdań)",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-2-4",
    "number": 9,
    "title": "Zakaz własnej opinii i cytatów w notatce syntetyzującej",
    "subtitle": "Dlaczego sformułowanie „Moim zdaniem...” kosztuje Cię punkty CKE",
    "module": "Język w użyciu",
    "epoch": "Notatka syntetyzująca",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 2: Notatka syntetyzująca. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Zakaz własnej opinii i cytatów w notatce syntetyzującej",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Zakaz własnej opinii i cytatów w notatce syntetyzującej",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Zakaz własnej opinii i cytatów w notatce syntetyzującej” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-2-4-a",
      "pol-task-2-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Zakaz własnej opinii i cytatów w notatce syntetyzującej",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-2-5",
    "number": 10,
    "title": "Trening liczenia słów i żelazna autokorekta brudnopisu",
    "subtitle": "Jak błyskawicznie skrócić tekst o 15 słów lub rozbudować go o 10 słów",
    "module": "Język w użyciu",
    "epoch": "Notatka syntetyzująca",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 2: Notatka syntetyzująca. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Trening liczenia słów i żelazna autokorekta brudnopisu",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Trening liczenia słów i żelazna autokorekta brudnopisu",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Trening liczenia słów i żelazna autokorekta brudnopisu” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-2-5-a",
      "pol-task-2-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Trening liczenia słów i żelazna autokorekta brudnopisu",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-3-1",
    "number": 11,
    "title": "Funkcje tekstu i wypowiedzi w arkuszu CKE",
    "subtitle": "Informatywna, impresywna, ekspresywna, fatyczna i metajęzykowa",
    "module": "Język w użyciu",
    "epoch": "Retoryka i Stylistyka",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 3: Retoryka i Stylistyka. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Funkcje tekstu i wypowiedzi w arkuszu CKE",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Funkcje tekstu i wypowiedzi w arkuszu CKE",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Funkcje tekstu i wypowiedzi w arkuszu CKE” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-3-1-a",
      "pol-task-3-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Funkcje tekstu i wypowiedzi w arkuszu CKE",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-3-2",
    "number": 12,
    "title": "Środki stylistyczne i ich funkcje w tekście nieliterackim",
    "subtitle": "Metafora, epitet, pytanie retoryczne, antyteza i anafora w publicystyce",
    "module": "Język w użyciu",
    "epoch": "Retoryka i Stylistyka",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 3: Retoryka i Stylistyka. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Środki stylistyczne i ich funkcje w tekście nieliterackim",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Środki stylistyczne i ich funkcje w tekście nieliterackim",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Środki stylistyczne i ich funkcje w tekście nieliterackim” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-3-2-a",
      "pol-task-3-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Środki stylistyczne i ich funkcje w tekście nieliterackim",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-3-3",
    "number": 13,
    "title": "Klasyczna retoryka: Etos, Logos i Pathos w argumentacji",
    "subtitle": "Autorytet, żelazna logika i granie na emocjach odbiorcy",
    "module": "Język w użyciu",
    "epoch": "Retoryka i Stylistyka",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 3: Retoryka i Stylistyka. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Klasyczna retoryka: Etos, Logos i Pathos w argumentacji",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Klasyczna retoryka: Etos, Logos i Pathos w argumentacji",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Klasyczna retoryka: Etos, Logos i Pathos w argumentacji” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-3-3-a",
      "pol-task-3-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Klasyczna retoryka: Etos, Logos i Pathos w argumentacji",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-3-4",
    "number": 14,
    "title": "Błędy logiczno-językowe i manipulacja w dyskursie",
    "subtitle": "Argumentum ad personam, równia pochyła, błąd fałszywej dychotomii",
    "module": "Język w użyciu",
    "epoch": "Retoryka i Stylistyka",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 3: Retoryka i Stylistyka. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Błędy logiczno-językowe i manipulacja w dyskursie",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Błędy logiczno-językowe i manipulacja w dyskursie",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Błędy logiczno-językowe i manipulacja w dyskursie” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-3-4-a",
      "pol-task-3-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Błędy logiczno-językowe i manipulacja w dyskursie",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-3-5",
    "number": 15,
    "title": "Styl naukowy, publicystyczny i potoczny – Rozpoznawanie rejestru",
    "subtitle": "Cechy leksykalne i składniowe poszczególnych stylów funkcjonalnych",
    "module": "Język w użyciu",
    "epoch": "Retoryka i Stylistyka",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 3: Retoryka i Stylistyka. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Styl naukowy, publicystyczny i potoczny – Rozpoznawanie rejestru",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Styl naukowy, publicystyczny i potoczny – Rozpoznawanie rejestru",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Styl naukowy, publicystyczny i potoczny – Rozpoznawanie rejestru” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-3-5-a",
      "pol-task-3-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Styl naukowy, publicystyczny i potoczny – Rozpoznawanie rejestru",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-4-1",
    "number": 16,
    "title": "Biblia: Sens cierpienia w Księdze Hioba i motyw teodycei",
    "subtitle": "Cierpienie niezawinione jako próba wiary i tajemnica Boga",
    "module": "Test historycznoliteracki",
    "epoch": "Antyk i Biblia",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 4: Antyk i Biblia. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Biblia: Sens cierpienia w Księdze Hioba i motyw teodycei",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Biblia: Sens cierpienia w Księdze Hioba i motyw teodycei",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Biblia: Sens cierpienia w Księdze Hioba i motyw teodycei” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-4-1-a",
      "pol-task-4-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Biblia: Sens cierpienia w Księdze Hioba i motyw teodycei",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-4-2",
    "number": 17,
    "title": "Księga Koheleta i topos Vanitas (Marność nad marnościami)",
    "subtitle": "Przemijanie dóbr doczesnych, sceptycyzm i radość z małych rzeczy",
    "module": "Test historycznoliteracki",
    "epoch": "Antyk i Biblia",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 4: Antyk i Biblia. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Księga Koheleta i topos Vanitas (Marność nad marnościami)",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Księga Koheleta i topos Vanitas (Marność nad marnościami)",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Księga Koheleta i topos Vanitas (Marność nad marnościami)” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-4-2-a",
      "pol-task-4-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Księga Koheleta i topos Vanitas (Marność nad marnościami)",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-4-3",
    "number": 18,
    "title": "Apokalipsa św. Jana: Język symboli, katastrofizm i Nowe Jeruzalem",
    "subtitle": "Czterej Jeźdźcy, Bestia 666, Baranek i eschatologiczna nadzieja",
    "module": "Test historycznoliteracki",
    "epoch": "Antyk i Biblia",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 4: Antyk i Biblia. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Apokalipsa św. Jana: Język symboli, katastrofizm i Nowe Jeruzalem",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Apokalipsa św. Jana: Język symboli, katastrofizm i Nowe Jeruzalem",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Apokalipsa św. Jana: Język symboli, katastrofizm i Nowe Jeruzalem” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-4-3-a",
      "pol-task-4-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Apokalipsa św. Jana: Język symboli, katastrofizm i Nowe Jeruzalem",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-4-4",
    "number": 19,
    "title": "Mitologia grecka: Archetypy, toposy i fatum w losach bohaterów",
    "subtitle": "Prometeusz, Dedal i Ikar, Syzyf, Narcyz i Edyp jako wzorce postaw",
    "module": "Test historycznoliteracki",
    "epoch": "Antyk i Biblia",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 4: Antyk i Biblia. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Mitologia grecka: Archetypy, toposy i fatum w losach bohaterów",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Mitologia grecka: Archetypy, toposy i fatum w losach bohaterów",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Mitologia grecka: Archetypy, toposy i fatum w losach bohaterów” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-4-4-a",
      "pol-task-4-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Mitologia grecka: Archetypy, toposy i fatum w losach bohaterów",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-4-5",
    "number": 20,
    "title": "Tragedia grecka: Antygona Sofoklesa i konflikt tragiczny",
    "subtitle": "Prawo boskie (moralne) kontra prawo ludzkie (stanowione Kreona)",
    "module": "Test historycznoliteracki",
    "epoch": "Antyk i Biblia",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 4: Antyk i Biblia. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Tragedia grecka: Antygona Sofoklesa i konflikt tragiczny",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Tragedia grecka: Antygona Sofoklesa i konflikt tragiczny",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Tragedia grecka: Antygona Sofoklesa i konflikt tragiczny” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-4-5-a",
      "pol-task-4-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Tragedia grecka: Antygona Sofoklesa i konflikt tragiczny",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-5-1",
    "number": 21,
    "title": "Teocentryzm i hierarchizm w kulturze średniowiecza",
    "subtitle": "Bóg w centrum wszechświata, anonimowość twórców i uniwersalizm europejski",
    "module": "Test historycznoliteracki",
    "epoch": "Średniowiecze",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 5: Średniowiecze. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Teocentryzm i hierarchizm w kulturze średniowiecza",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Teocentryzm i hierarchizm w kulturze średniowiecza",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Teocentryzm i hierarchizm w kulturze średniowiecza” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-5-1-a",
      "pol-task-5-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Teocentryzm i hierarchizm w kulturze średniowiecza",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-5-2",
    "number": 22,
    "title": "Bogurodzica – Arcydzieło liryki religijnej i motyw Deesis",
    "subtitle": "Chrystus, Maryja i Jan Chrzciciel jako pośrednicy ludzkich modlitw",
    "module": "Test historycznoliteracki",
    "epoch": "Średniowiecze",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 5: Średniowiecze. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Bogurodzica – Arcydzieło liryki religijnej i motyw Deesis",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Bogurodzica – Arcydzieło liryki religijnej i motyw Deesis",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Bogurodzica – Arcydzieło liryki religijnej i motyw Deesis” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-5-2-a",
      "pol-task-5-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Bogurodzica – Arcydzieło liryki religijnej i motyw Deesis",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-5-3",
    "number": 23,
    "title": "Lament świętokrzyski – Humanizacja cierpienia Maryi",
    "subtitle": "Matka Boska jako cierpiąca kobieta pod krzyżem (motyw Stabat Mater)",
    "module": "Test historycznoliteracki",
    "epoch": "Średniowiecze",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 5: Średniowiecze. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Lament świętokrzyski – Humanizacja cierpienia Maryi",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Lament świętokrzyski – Humanizacja cierpienia Maryi",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Lament świętokrzyski – Humanizacja cierpienia Maryi” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-5-3-a",
      "pol-task-5-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Lament świętokrzyski – Humanizacja cierpienia Maryi",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-5-4",
    "number": 24,
    "title": "Wzorce osobowe: Asceza w Legendzie o św. Aleksym i etos rycerski",
    "subtitle": "Rezygnacja z bogactwa dla zbawienia vs Roland umierający z honorem",
    "module": "Test historycznoliteracki",
    "epoch": "Średniowiecze",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 5: Średniowiecze. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Wzorce osobowe: Asceza w Legendzie o św. Aleksym i etos rycerski",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Wzorce osobowe: Asceza w Legendzie o św. Aleksym i etos rycerski",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Wzorce osobowe: Asceza w Legendzie o św. Aleksym i etos rycerski” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-5-4-a",
      "pol-task-5-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Wzorce osobowe: Asceza w Legendzie o św. Aleksym i etos rycerski",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-5-5",
    "number": 25,
    "title": "Rozmowa Mistrza Polikarpa ze Śmiercią i Danse Macabre",
    "subtitle": "Taniec śmierci jako wyraz równości wszystkich stanów wobec zgonu",
    "module": "Test historycznoliteracki",
    "epoch": "Średniowiecze",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 5: Średniowiecze. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Rozmowa Mistrza Polikarpa ze Śmiercią i Danse Macabre",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Rozmowa Mistrza Polikarpa ze Śmiercią i Danse Macabre",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Rozmowa Mistrza Polikarpa ze Śmiercią i Danse Macabre” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-5-5-a",
      "pol-task-5-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Rozmowa Mistrza Polikarpa ze Śmiercią i Danse Macabre",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-6-1",
    "number": 26,
    "title": "Humanizm renesansowy: Antropocentryzm, harmonia i cnota (virtus)",
    "subtitle": "Człowiek w centrum uwagi, inspiracje antyczne i afirmacja świata doczesnego",
    "module": "Test historycznoliteracki",
    "epoch": "Renesans (Odrodzenie)",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 6: Renesans (Odrodzenie). Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Humanizm renesansowy: Antropocentryzm, harmonia i cnota (virtus)",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Humanizm renesansowy: Antropocentryzm, harmonia i cnota (virtus)",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Humanizm renesansowy: Antropocentryzm, harmonia i cnota (virtus)” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-6-1-a",
      "pol-task-6-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Humanizm renesansowy: Antropocentryzm, harmonia i cnota (virtus)",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-6-2",
    "number": 27,
    "title": "Jan Kochanowski: Pieśni – Filozofia stoicko-epikurejska i patriotyzm",
    "subtitle": "Pieśń IX, Pieśń o spustoszeniu Podola i motyw horacjańskiego „Exegi monumentum”",
    "module": "Test historycznoliteracki",
    "epoch": "Renesans (Odrodzenie)",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 6: Renesans (Odrodzenie). Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Jan Kochanowski: Pieśni – Filozofia stoicko-epikurejska i patriotyzm",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Jan Kochanowski: Pieśni – Filozofia stoicko-epikurejska i patriotyzm",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Jan Kochanowski: Pieśni – Filozofia stoicko-epikurejska i patriotyzm” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-6-2-a",
      "pol-task-6-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Jan Kochanowski: Pieśni – Filozofia stoicko-epikurejska i patriotyzm",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-6-3",
    "number": 28,
    "title": "Jan Kochanowski: Treny – Kryzys światopoglądowy i odbudowa wiary",
    "subtitle": "Ewolucja żalu ojcowskiego: od buntu (Tren IX, X) do pocieszenia (Tren XIX)",
    "module": "Test historycznoliteracki",
    "epoch": "Renesans (Odrodzenie)",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 6: Renesans (Odrodzenie). Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Jan Kochanowski: Treny – Kryzys światopoglądowy i odbudowa wiary",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Jan Kochanowski: Treny – Kryzys światopoglądowy i odbudowa wiary",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Jan Kochanowski: Treny – Kryzys światopoglądowy i odbudowa wiary” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-6-3-a",
      "pol-task-6-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Jan Kochanowski: Treny – Kryzys światopoglądowy i odbudowa wiary",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-6-4",
    "number": 29,
    "title": "Odprawa posłów greckich – Pierwszy polski dramat humanistyczny",
    "subtitle": "Odpowiedzialność rządzących za los ojczyzny i ponadczasowa lekcja patriotyzmu",
    "module": "Test historycznoliteracki",
    "epoch": "Renesans (Odrodzenie)",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 6: Renesans (Odrodzenie). Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Odprawa posłów greckich – Pierwszy polski dramat humanistyczny",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Odprawa posłów greckich – Pierwszy polski dramat humanistyczny",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Odprawa posłów greckich – Pierwszy polski dramat humanistyczny” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-6-4-a",
      "pol-task-6-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Odprawa posłów greckich – Pierwszy polski dramat humanistyczny",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-6-5",
    "number": 30,
    "title": "Fraszki Jana Kochanowskiego i topos Theatrum Mundi",
    "subtitle": "Świat jako teatr, a ludzie jako marionetki w rękach Boga i Fortuny",
    "module": "Test historycznoliteracki",
    "epoch": "Renesans (Odrodzenie)",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 6: Renesans (Odrodzenie). Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Fraszki Jana Kochanowskiego i topos Theatrum Mundi",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Fraszki Jana Kochanowskiego i topos Theatrum Mundi",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Fraszki Jana Kochanowskiego i topos Theatrum Mundi” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-6-5-a",
      "pol-task-6-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Fraszki Jana Kochanowskiego i topos Theatrum Mundi",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-7-1",
    "number": 31,
    "title": "Człowiek rozdarty między ziemią a niebem: Mikołaj Sęp-Szarzyński",
    "subtitle": "Sonet IV i V – wojna ze światem, ciałem i szatanem jako kondycja ludzka",
    "module": "Test historycznoliteracki",
    "epoch": "Barok",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 7: Barok. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Człowiek rozdarty między ziemią a niebem: Mikołaj Sęp-Szarzyński",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Człowiek rozdarty między ziemią a niebem: Mikołaj Sęp-Szarzyński",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Człowiek rozdarty między ziemią a niebem: Mikołaj Sęp-Szarzyński” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-7-1-a",
      "pol-task-7-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Człowiek rozdarty między ziemią a niebem: Mikołaj Sęp-Szarzyński",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-7-2",
    "number": 32,
    "title": "Daniel Naborowski: Czas, przemijanie i krótkość żywota",
    "subtitle": "Wiersz „Krótkość żywota” i matematyczna precyzja barokowej poezji wanitatywnej",
    "module": "Test historycznoliteracki",
    "epoch": "Barok",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 7: Barok. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Daniel Naborowski: Czas, przemijanie i krótkość żywota",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Daniel Naborowski: Czas, przemijanie i krótkość żywota",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Daniel Naborowski: Czas, przemijanie i krótkość żywota” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-7-2-a",
      "pol-task-7-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Daniel Naborowski: Czas, przemijanie i krótkość żywota",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-7-3",
    "number": 33,
    "title": "Jan Andrzej Morsztyn: Konceptyzm i poetycki kunszt dworski",
    "subtitle": "Sonet „Do trupa” – zderzenie nieszczęśliwie zakochanego z człowiekiem martwym",
    "module": "Test historycznoliteracki",
    "epoch": "Barok",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 7: Barok. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Jan Andrzej Morsztyn: Konceptyzm i poetycki kunszt dworski",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Jan Andrzej Morsztyn: Konceptyzm i poetycki kunszt dworski",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Jan Andrzej Morsztyn: Konceptyzm i poetycki kunszt dworski” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-7-3-a",
      "pol-task-7-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Jan Andrzej Morsztyn: Konceptyzm i poetycki kunszt dworski",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-7-4",
    "number": 34,
    "title": "Kultura sarmacka w Polsce: Mity narodowe, wady i zalety szlachty",
    "subtitle": "Przedmurze chrześcijaństwa (Antemurale Christianitatis), złota wolność i ksenofobia",
    "module": "Test historycznoliteracki",
    "epoch": "Barok",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 7: Barok. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Kultura sarmacka w Polsce: Mity narodowe, wady i zalety szlachty",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Kultura sarmacka w Polsce: Mity narodowe, wady i zalety szlachty",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Kultura sarmacka w Polsce: Mity narodowe, wady i zalety szlachty” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-7-4-a",
      "pol-task-7-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Kultura sarmacka w Polsce: Mity narodowe, wady i zalety szlachty",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-7-5",
    "number": 35,
    "title": "Jan Chryzostom Pasek: Pamiętniki – Żywy portret szlachcica-żołnierza",
    "subtitle": "Sarmacka mentalność, rubaszny humor i narracja gawędziarska",
    "module": "Test historycznoliteracki",
    "epoch": "Barok",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 7: Barok. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Jan Chryzostom Pasek: Pamiętniki – Żywy portret szlachcica-żołnierza",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Jan Chryzostom Pasek: Pamiętniki – Żywy portret szlachcica-żołnierza",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Jan Chryzostom Pasek: Pamiętniki – Żywy portret szlachcica-żołnierza” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-7-5-a",
      "pol-task-7-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Jan Chryzostom Pasek: Pamiętniki – Żywy portret szlachcica-żołnierza",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-8-1",
    "number": 36,
    "title": "Wiek rozumu i filozofia oświecenia: Empiryzm, racjonalizm i deizm",
    "subtitle": "Krytyka zabobonów, tolerancja religijna i idea naprawy Rzeczypospolitej",
    "module": "Test historycznoliteracki",
    "epoch": "Oświecenie",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 8: Oświecenie. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Wiek rozumu i filozofia oświecenia: Empiryzm, racjonalizm i deizm",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Wiek rozumu i filozofia oświecenia: Empiryzm, racjonalizm i deizm",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Wiek rozumu i filozofia oświecenia: Empiryzm, racjonalizm i deizm” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-8-1-a",
      "pol-task-8-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Wiek rozumu i filozofia oświecenia: Empiryzm, racjonalizm i deizm",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-8-2",
    "number": 37,
    "title": "Ignacy Krasicki: Bajki – Uniwersalne prawdy o naturze ludzkiej i władzy",
    "subtitle": "Krótkie bajki epigramatyczne: „Ptaszki w klatce”, „Jagnię i wilcy”, „Dewotka”",
    "module": "Test historycznoliteracki",
    "epoch": "Oświecenie",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 8: Oświecenie. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Ignacy Krasicki: Bajki – Uniwersalne prawdy o naturze ludzkiej i władzy",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Ignacy Krasicki: Bajki – Uniwersalne prawdy o naturze ludzkiej i władzy",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Ignacy Krasicki: Bajki – Uniwersalne prawdy o naturze ludzkiej i władzy” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-8-2-a",
      "pol-task-8-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Ignacy Krasicki: Bajki – Uniwersalne prawdy o naturze ludzkiej i władzy",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-8-3",
    "number": 38,
    "title": "Ignacy Krasicki: Satyry – Diagnoza wad społeczeństwa stanowego",
    "subtitle": "„Do króla”, „Pijaństwo”, „Świat zepsuty” – ośmieszanie przywar bez personalnych ataków",
    "module": "Test historycznoliteracki",
    "epoch": "Oświecenie",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 8: Oświecenie. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Ignacy Krasicki: Satyry – Diagnoza wad społeczeństwa stanowego",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Ignacy Krasicki: Satyry – Diagnoza wad społeczeństwa stanowego",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Ignacy Krasicki: Satyry – Diagnoza wad społeczeństwa stanowego” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-8-3-a",
      "pol-task-8-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Ignacy Krasicki: Satyry – Diagnoza wad społeczeństwa stanowego",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-8-4",
    "number": 39,
    "title": "Hymn do miłości ojczyzny i motyw patriotyzmu oświeceniowego",
    "subtitle": "„Święta miłości kochanej ojczyzny” jako pierwszy hymn narodowy oświeconych",
    "module": "Test historycznoliteracki",
    "epoch": "Oświecenie",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 8: Oświecenie. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Hymn do miłości ojczyzny i motyw patriotyzmu oświeceniowego",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Hymn do miłości ojczyzny i motyw patriotyzmu oświeceniowego",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Hymn do miłości ojczyzny i motyw patriotyzmu oświeceniowego” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-8-4-a",
      "pol-task-8-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Hymn do miłości ojczyzny i motyw patriotyzmu oświeceniowego",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-8-5",
    "number": 40,
    "title": "Teatr stanisławowski i Powrót posła Juliana Ursyna Niemcewicza",
    "subtitle": "Spór stronnictwa patriotycznego ze wstecznictwem sarmackim na Sejmie Czteroletnim",
    "module": "Test historycznoliteracki",
    "epoch": "Oświecenie",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 8: Oświecenie. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Teatr stanisławowski i Powrót posła Juliana Ursyna Niemcewicza",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Teatr stanisławowski i Powrót posła Juliana Ursyna Niemcewicza",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Teatr stanisławowski i Powrót posła Juliana Ursyna Niemcewicza” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-8-5-a",
      "pol-task-8-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Teatr stanisławowski i Powrót posła Juliana Ursyna Niemcewicza",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-9-1",
    "number": 41,
    "title": "Przełom romantyczny: „Romantyczność” jako manifest światopoglądowy",
    "subtitle": "„Miej serce i patrzaj w serce” – prymat uczucia i wiary nad szkiełkiem i okiem mędrca",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Ballady i Dziady cz. II/IV",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 9: Romantyzm: Ballady i Dziady cz. II/IV. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Przełom romantyczny: „Romantyczność” jako manifest światopoglądowy",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Przełom romantyczny: „Romantyczność” jako manifest światopoglądowy",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Przełom romantyczny: „Romantyczność” jako manifest światopoglądowy” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-9-1-a",
      "pol-task-9-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Przełom romantyczny: „Romantyczność” jako manifest światopoglądowy",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-9-2",
    "number": 42,
    "title": "Ballady i romanse: Ludowość, fantastyka i żelazna moralność ludowa",
    "subtitle": "„Świteź”, „Rybka”, „Lilije” – nie ma zbrodni bez kary w świecie natury",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Ballady i Dziady cz. II/IV",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 9: Romantyzm: Ballady i Dziady cz. II/IV. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Ballady i romanse: Ludowość, fantastyka i żelazna moralność ludowa",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Ballady i romanse: Ludowość, fantastyka i żelazna moralność ludowa",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Ballady i romanse: Ludowość, fantastyka i żelazna moralność ludowa” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-9-2-a",
      "pol-task-9-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Ballady i romanse: Ludowość, fantastyka i żelazna moralność ludowa",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-9-3",
    "number": 43,
    "title": "Dziady cz. II: Obrzęd wywoływania duchów i elementarne prawdy moralne",
    "subtitle": "Duchy lekkie (Józio i Rózia), ciężkie (Zły Pan) i pośrednie (Zosia)",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Ballady i Dziady cz. II/IV",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 9: Romantyzm: Ballady i Dziady cz. II/IV. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Dziady cz. II: Obrzęd wywoływania duchów i elementarne prawdy moralne",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Dziady cz. II: Obrzęd wywoływania duchów i elementarne prawdy moralne",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Dziady cz. II: Obrzęd wywoływania duchów i elementarne prawdy moralne” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-9-3-a",
      "pol-task-9-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Dziady cz. II: Obrzęd wywoływania duchów i elementarne prawdy moralne",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-9-4",
    "number": 44,
    "title": "Dziady cz. IV: Gustaw i anatomia nieszczęśliwej miłości romantycznej",
    "subtitle": "Bohater werteryczny, „książki zbójeckie” i trzy godziny: miłości, rozpaczy i przestrogi",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Ballady i Dziady cz. II/IV",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 9: Romantyzm: Ballady i Dziady cz. II/IV. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Dziady cz. IV: Gustaw i anatomia nieszczęśliwej miłości romantycznej",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Dziady cz. IV: Gustaw i anatomia nieszczęśliwej miłości romantycznej",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Dziady cz. IV: Gustaw i anatomia nieszczęśliwej miłości romantycznej” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-9-4-a",
      "pol-task-9-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Dziady cz. IV: Gustaw i anatomia nieszczęśliwej miłości romantycznej",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-9-5",
    "number": 45,
    "title": "Konrad Wallenrod: Tragizm zdrady w imię ratowania ojczyzny",
    "subtitle": "Metoda lisa i lwa: „Trzeba być lisem i lwem”, wallenrodyzm i cena moralna zwycięstwa",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Ballady i Dziady cz. II/IV",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 9: Romantyzm: Ballady i Dziady cz. II/IV. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Konrad Wallenrod: Tragizm zdrady w imię ratowania ojczyzny",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Konrad Wallenrod: Tragizm zdrady w imię ratowania ojczyzny",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Konrad Wallenrod: Tragizm zdrady w imię ratowania ojczyzny” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-9-5-a",
      "pol-task-9-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Konrad Wallenrod: Tragizm zdrady w imię ratowania ojczyzny",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-10-1",
    "number": 46,
    "title": "Dziady cz. III: Przemiana Gustawa w Konrada i martyrologia młodzieży",
    "subtitle": "„Gustavus obiit, natus est Conradus”, proces filomatów i carski terror",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 10: Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Dziady cz. III: Przemiana Gustawa w Konrada i martyrologia młodzieży",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Dziady cz. III: Przemiana Gustawa w Konrada i martyrologia młodzieży",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Dziady cz. III: Przemiana Gustawa w Konrada i martyrologia młodzieży” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-10-1-a",
      "pol-task-10-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Dziady cz. III: Przemiana Gustawa w Konrada i martyrologia młodzieży",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-10-2",
    "number": 47,
    "title": "Wielka Improwizacja Konrada: Bunt prometejski przeciwko Bogu",
    "subtitle": "Konrad jako jednostka wybitna, żądanie rządu dusz i groźba bluźnierstwa",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 10: Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Wielka Improwizacja Konrada: Bunt prometejski przeciwko Bogu",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Wielka Improwizacja Konrada: Bunt prometejski przeciwko Bogu",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Wielka Improwizacja Konrada: Bunt prometejski przeciwko Bogu” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-10-2-a",
      "pol-task-10-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Wielka Improwizacja Konrada: Bunt prometejski przeciwko Bogu",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-10-3",
    "number": 48,
    "title": "Widzenie księdza Piotra i mesjanizm narodowy (Polska Chrystusem narodów)",
    "subtitle": "Mesjanistyczna koncepcja cierpienia jako odkupienia i zapowiedź męża „czterdzieści i cztery”",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 10: Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Widzenie księdza Piotra i mesjanizm narodowy (Polska Chrystusem narodów)",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Widzenie księdza Piotra i mesjanizm narodowy (Polska Chrystusem narodów)",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Widzenie księdza Piotra i mesjanizm narodowy (Polska Chrystusem narodów)” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-10-3-a",
      "pol-task-10-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Widzenie księdza Piotra i mesjanizm narodowy (Polska Chrystusem narodów)",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-10-4",
    "number": 49,
    "title": "Juliusz Słowacki: Kordian – Dojrzewanie bohatera i polemika z mesjanizmem",
    "subtitle": "Podróż po Europie, monolog na szczycie Mont Blanc i winkelriedyzm",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 10: Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Juliusz Słowacki: Kordian – Dojrzewanie bohatera i polemika z mesjanizmem",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Juliusz Słowacki: Kordian – Dojrzewanie bohatera i polemika z mesjanizmem",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Juliusz Słowacki: Kordian – Dojrzewanie bohatera i polemika z mesjanizmem” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-10-4-a",
      "pol-task-10-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Juliusz Słowacki: Kordian – Dojrzewanie bohatera i polemika z mesjanizmem",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-10-5",
    "number": 50,
    "title": "Adam Mickiewicz: Pan Tadeusz – Soplicowo jako arkadia i epopeja narodowa",
    "subtitle": "Rehabilitacja Jacka Soplicy (Ksiądz Robak), spór o zamek i obyczajowość szlachecka",
    "module": "Test historycznoliteracki",
    "epoch": "Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 10: Romantyzm: Dziady cz. III, Kordian, Pan Tadeusz. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Adam Mickiewicz: Pan Tadeusz – Soplicowo jako arkadia i epopeja narodowa",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Adam Mickiewicz: Pan Tadeusz – Soplicowo jako arkadia i epopeja narodowa",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Adam Mickiewicz: Pan Tadeusz – Soplicowo jako arkadia i epopeja narodowa” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-10-5-a",
      "pol-task-10-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Adam Mickiewicz: Pan Tadeusz – Soplicowo jako arkadia i epopeja narodowa",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-11-1",
    "number": 51,
    "title": "Filozofia pozytywizmu: Scjentyzm, praca organiczna i praca u podstaw",
    "subtitle": "Społeczeństwo jako żywy organizm, asymilacja Żydów i emancypacja kobiet",
    "module": "Test historycznoliteracki",
    "epoch": "Pozytywizm i Realizm",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 11: Pozytywizm i Realizm. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Filozofia pozytywizmu: Scjentyzm, praca organiczna i praca u podstaw",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Filozofia pozytywizmu: Scjentyzm, praca organiczna i praca u podstaw",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Filozofia pozytywizmu: Scjentyzm, praca organiczna i praca u podstaw” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-11-1-a",
      "pol-task-11-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Filozofia pozytywizmu: Scjentyzm, praca organiczna i praca u podstaw",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-11-2",
    "number": 52,
    "title": "Bolesław Prus: Lalka – Stanisław Wokulski na granicy dwóch epok",
    "subtitle": "Przedsiębiorca-romantyk: miłość do Izabeli Łęckiej kontra pasja naukowa i filantropia",
    "module": "Test historycznoliteracki",
    "epoch": "Pozytywizm i Realizm",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 11: Pozytywizm i Realizm. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Bolesław Prus: Lalka – Stanisław Wokulski na granicy dwóch epok",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Bolesław Prus: Lalka – Stanisław Wokulski na granicy dwóch epok",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Bolesław Prus: Lalka – Stanisław Wokulski na granicy dwóch epok” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-11-2-a",
      "pol-task-11-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Bolesław Prus: Lalka – Stanisław Wokulski na granicy dwóch epok",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-11-3",
    "number": 53,
    "title": "Bolesław Prus: Lalka – Obraz społeczeństwa Warszawy i Paryża",
    "subtitle": "Pamiętnik starego subiekta (Ignacy Rzecki), arystokracja, mieszczaństwo i Powiśle",
    "module": "Test historycznoliteracki",
    "epoch": "Pozytywizm i Realizm",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 11: Pozytywizm i Realizm. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Bolesław Prus: Lalka – Obraz społeczeństwa Warszawy i Paryża",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Bolesław Prus: Lalka – Obraz społeczeństwa Warszawy i Paryża",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Bolesław Prus: Lalka – Obraz społeczeństwa Warszawy i Paryża” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-11-3-a",
      "pol-task-11-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Bolesław Prus: Lalka – Obraz społeczeństwa Warszawy i Paryża",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-11-4",
    "number": 54,
    "title": "Eliza Orzeszkowa: Gloria victis – Pamięć o powstaniu styczniowym",
    "subtitle": "Mogiła powstańcza w poleskim lesie, heroizm Romualda Traugutta i natura jako świadek",
    "module": "Test historycznoliteracki",
    "epoch": "Pozytywizm i Realizm",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 11: Pozytywizm i Realizm. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Eliza Orzeszkowa: Gloria victis – Pamięć o powstaniu styczniowym",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Eliza Orzeszkowa: Gloria victis – Pamięć o powstaniu styczniowym",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Eliza Orzeszkowa: Gloria victis – Pamięć o powstaniu styczniowym” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-11-4-a",
      "pol-task-11-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Eliza Orzeszkowa: Gloria victis – Pamięć o powstaniu styczniowym",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-11-5",
    "number": 55,
    "title": "Fiodor Dostojewski: Zbrodnia i kara – Psychologia zbrodni i odkupienie",
    "subtitle": "Raskolnikow i teoria ludzi niezwykłych (napoleonów), rola Soni Marmieładowej i Ewangelia",
    "module": "Test historycznoliteracki",
    "epoch": "Pozytywizm i Realizm",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 11: Pozytywizm i Realizm. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Fiodor Dostojewski: Zbrodnia i kara – Psychologia zbrodni i odkupienie",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Fiodor Dostojewski: Zbrodnia i kara – Psychologia zbrodni i odkupienie",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Fiodor Dostojewski: Zbrodnia i kara – Psychologia zbrodni i odkupienie” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-11-5-a",
      "pol-task-11-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Fiodor Dostojewski: Zbrodnia i kara – Psychologia zbrodni i odkupienie",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-12-1",
    "number": 56,
    "title": "Modernistyczny bunt: Dekadentyzm, fin de siècle i poezja Tetmajera",
    "subtitle": "Poczucie kryzysu wartości, „Koniec wieku XIX”, ucieczka w nirwanę, sztukę i erotyzm",
    "module": "Test historycznoliteracki",
    "epoch": "Młoda Polska",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 12: Młoda Polska. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Modernistyczny bunt: Dekadentyzm, fin de siècle i poezja Tetmajera",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Modernistyczny bunt: Dekadentyzm, fin de siècle i poezja Tetmajera",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Modernistyczny bunt: Dekadentyzm, fin de siècle i poezja Tetmajera” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-12-1-a",
      "pol-task-12-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Modernistyczny bunt: Dekadentyzm, fin de siècle i poezja Tetmajera",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-12-2",
    "number": 57,
    "title": "Stanisław Wyspiański: Wesele – Autentyzm bronowickiej chaty i chłapomania",
    "subtitle": "Zderzenie inteligencji krakowskiej z chłopstwem: pozorna jedność i wzajemne uprzedzenia",
    "module": "Test historycznoliteracki",
    "epoch": "Młoda Polska",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 12: Młoda Polska. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Stanisław Wyspiański: Wesele – Autentyzm bronowickiej chaty i chłapomania",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Stanisław Wyspiański: Wesele – Autentyzm bronowickiej chaty i chłapomania",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Stanisław Wyspiański: Wesele – Autentyzm bronowickiej chaty i chłapomania” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-12-2-a",
      "pol-task-12-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Stanisław Wyspiański: Wesele – Autentyzm bronowickiej chaty i chłapomania",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-12-3",
    "number": 58,
    "title": "Stanisław Wyspiański: Wesele – Postacie dramatyczne i zjawy symboliczne",
    "subtitle": "Widmo (utracona miłość), Stańczyk (dzwon Zygmunta), Rycerz Czarny i Hetman Branicki",
    "module": "Test historycznoliteracki",
    "epoch": "Młoda Polska",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 12: Młoda Polska. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Stanisław Wyspiański: Wesele – Postacie dramatyczne i zjawy symboliczne",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Stanisław Wyspiański: Wesele – Postacie dramatyczne i zjawy symboliczne",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Stanisław Wyspiański: Wesele – Postacie dramatyczne i zjawy symboliczne” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-12-3-a",
      "pol-task-12-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Stanisław Wyspiański: Wesele – Postacie dramatyczne i zjawy symboliczne",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-12-4",
    "number": 59,
    "title": "Wesele – Symbole narodowe: Złoty róg, czapka z pawich piór i Chocholi Taniec",
    "subtitle": "Gospodarz, Jasiek gubiący róg, zaklęty krąg niemocy i marazmu narodowego",
    "module": "Test historycznoliteracki",
    "epoch": "Młoda Polska",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 12: Młoda Polska. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Wesele – Symbole narodowe: Złoty róg, czapka z pawich piór i Chocholi Taniec",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Wesele – Symbole narodowe: Złoty róg, czapka z pawich piór i Chocholi Taniec",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Wesele – Symbole narodowe: Złoty róg, czapka z pawich piór i Chocholi Taniec” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-12-4-a",
      "pol-task-12-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Wesele – Symbole narodowe: Złoty róg, czapka z pawich piór i Chocholi Taniec",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-12-5",
    "number": 60,
    "title": "Chłopi Władysława Reymonta – Mityzacja życia wsi i cykl natury",
    "subtitle": "Cztery pory roku, tragizm Jagny Paczesiówny, chciwość Boryny i gromada jako prawo",
    "module": "Test historycznoliteracki",
    "epoch": "Młoda Polska",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 12: Młoda Polska. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Chłopi Władysława Reymonta – Mityzacja życia wsi i cykl natury",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Chłopi Władysława Reymonta – Mityzacja życia wsi i cykl natury",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Chłopi Władysława Reymonta – Mityzacja życia wsi i cykl natury” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-12-5-a",
      "pol-task-12-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Chłopi Władysława Reymonta – Mityzacja życia wsi i cykl natury",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-13-1",
    "number": 61,
    "title": "Stefan Żeromski: Przedwiośnie – Rewolucja w Baku i mit szklanych domów",
    "subtitle": "Okrutne oblicze rewolucji bolszewickiej, marzenie Seweryna Baryki o nowoczesnej Polsce",
    "module": "Test historycznoliteracki",
    "epoch": "Dwudziestolecie międzywojenne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 13: Dwudziestolecie międzywojenne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Stefan Żeromski: Przedwiośnie – Rewolucja w Baku i mit szklanych domów",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Stefan Żeromski: Przedwiośnie – Rewolucja w Baku i mit szklanych domów",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Stefan Żeromski: Przedwiośnie – Rewolucja w Baku i mit szklanych domów” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-13-1-a",
      "pol-task-13-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Stefan Żeromski: Przedwiośnie – Rewolucja w Baku i mit szklanych domów",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-13-2",
    "number": 62,
    "title": "Stefan Żeromski: Przedwiośnie – Trzy koncepcje odbudowy Rzeczypospolitej",
    "subtitle": "Ewolucyjny program Szymona Gajowca, rewolucja komunistów (Lulek) i marsz na Belweder",
    "module": "Test historycznoliteracki",
    "epoch": "Dwudziestolecie międzywojenne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 13: Dwudziestolecie międzywojenne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Stefan Żeromski: Przedwiośnie – Trzy koncepcje odbudowy Rzeczypospolitej",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Stefan Żeromski: Przedwiośnie – Trzy koncepcje odbudowy Rzeczypospolitej",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Stefan Żeromski: Przedwiośnie – Trzy koncepcje odbudowy Rzeczypospolitej” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-13-2-a",
      "pol-task-13-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Stefan Żeromski: Przedwiośnie – Trzy koncepcje odbudowy Rzeczypospolitej",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-13-3",
    "number": 63,
    "title": "Witold Gombrowicz: Ferdydurke – Gęba, pupa i upupienie człowieka",
    "subtitle": "Pojedynek na miny u Miętusa i Syfona, groteskowa szkoła Pimki i wszechobecna forma",
    "module": "Test historycznoliteracki",
    "epoch": "Dwudziestolecie międzywojenne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 13: Dwudziestolecie międzywojenne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Witold Gombrowicz: Ferdydurke – Gęba, pupa i upupienie człowieka",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Witold Gombrowicz: Ferdydurke – Gęba, pupa i upupienie człowieka",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Witold Gombrowicz: Ferdydurke – Gęba, pupa i upupienie człowieka” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-13-3-a",
      "pol-task-13-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Witold Gombrowicz: Ferdydurke – Gęba, pupa i upupienie człowieka",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-13-4",
    "number": 64,
    "title": "Bruno Schulz: Sklepy cynamonowe – Mityzacja dzieciństwa i oniryzm",
    "subtitle": "Drohobycz jako przestrzeń magiczna, postać Ojca-demiurga i Traktat o manekinach",
    "module": "Test historycznoliteracki",
    "epoch": "Dwudziestolecie międzywojenne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 13: Dwudziestolecie międzywojenne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Bruno Schulz: Sklepy cynamonowe – Mityzacja dzieciństwa i oniryzm",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Bruno Schulz: Sklepy cynamonowe – Mityzacja dzieciństwa i oniryzm",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Bruno Schulz: Sklepy cynamonowe – Mityzacja dzieciństwa i oniryzm” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-13-4-a",
      "pol-task-13-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Bruno Schulz: Sklepy cynamonowe – Mityzacja dzieciństwa i oniryzm",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-13-5",
    "number": 65,
    "title": "Poezja dwudziestolecia: Skamander (wiosna i radość) oraz Awangarda Krakowska",
    "subtitle": "Julian Tuwim, Jan Lechoń, Peiper i hasło „Miasto, Masa, Maszyna”",
    "module": "Test historycznoliteracki",
    "epoch": "Dwudziestolecie międzywojenne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 13: Dwudziestolecie międzywojenne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Poezja dwudziestolecia: Skamander (wiosna i radość) oraz Awangarda Krakowska",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Poezja dwudziestolecia: Skamander (wiosna i radość) oraz Awangarda Krakowska",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Poezja dwudziestolecia: Skamander (wiosna i radość) oraz Awangarda Krakowska” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-13-5-a",
      "pol-task-13-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Poezja dwudziestolecia: Skamander (wiosna i radość) oraz Awangarda Krakowska",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-14-1",
    "number": 66,
    "title": "Tadeusz Borowski: Opowiadania – Koncepcja człowieka zlagrowanego",
    "subtitle": "„Pożegnanie z Marią”, „U nas w Auschwitzu” – behawioryzm, moralność odwrócona i walka o zupę",
    "module": "Test historycznoliteracki",
    "epoch": "Literatura wojenna i okupacyjna",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 14: Literatura wojenna i okupacyjna. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Tadeusz Borowski: Opowiadania – Koncepcja człowieka zlagrowanego",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Tadeusz Borowski: Opowiadania – Koncepcja człowieka zlagrowanego",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Tadeusz Borowski: Opowiadania – Koncepcja człowieka zlagrowanego” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-14-1-a",
      "pol-task-14-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Tadeusz Borowski: Opowiadania – Koncepcja człowieka zlagrowanego",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-14-2",
    "number": 67,
    "title": "Gustaw Herling-Grudziński: Inny świat – Gułag i granice człowieczeństwa",
    "subtitle": "Sowiecki łagier w Jercewie, głód, upodlenie i ocalenie ludzkiej godności (Kostylew)",
    "module": "Test historycznoliteracki",
    "epoch": "Literatura wojenna i okupacyjna",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 14: Literatura wojenna i okupacyjna. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Gustaw Herling-Grudziński: Inny świat – Gułag i granice człowieczeństwa",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Gustaw Herling-Grudziński: Inny świat – Gułag i granice człowieczeństwa",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Gustaw Herling-Grudziński: Inny świat – Gułag i granice człowieczeństwa” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-14-2-a",
      "pol-task-14-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Gustaw Herling-Grudziński: Inny świat – Gułag i granice człowieczeństwa",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-14-3",
    "number": 68,
    "title": "Hanna Krall: Zdążyć przed Panem Bogiem – Prawda o powstaniu w getcie",
    "subtitle": "Marek Edelman: demitologizacja bohaterstwa, wyścig ze śmiercią i godna śmierć z bronią",
    "module": "Test historycznoliteracki",
    "epoch": "Literatura wojenna i okupacyjna",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 14: Literatura wojenna i okupacyjna. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Hanna Krall: Zdążyć przed Panem Bogiem – Prawda o powstaniu w getcie",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Hanna Krall: Zdążyć przed Panem Bogiem – Prawda o powstaniu w getcie",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Hanna Krall: Zdążyć przed Panem Bogiem – Prawda o powstaniu w getcie” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-14-3-a",
      "pol-task-14-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Hanna Krall: Zdążyć przed Panem Bogiem – Prawda o powstaniu w getcie",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-14-4",
    "number": 69,
    "title": "Krzysztof Kamil Baczyński i pokolenie Kolumbów – Apokalipsa spełniona",
    "subtitle": "Tragizm młodości skażonej wojną: „Elegia o... [chłopcu polskim]”, „Pokolenie”",
    "module": "Test historycznoliteracki",
    "epoch": "Literatura wojenna i okupacyjna",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 14: Literatura wojenna i okupacyjna. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Krzysztof Kamil Baczyński i pokolenie Kolumbów – Apokalipsa spełniona",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Krzysztof Kamil Baczyński i pokolenie Kolumbów – Apokalipsa spełniona",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Krzysztof Kamil Baczyński i pokolenie Kolumbów – Apokalipsa spełniona” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-14-4-a",
      "pol-task-14-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Krzysztof Kamil Baczyński i pokolenie Kolumbów – Apokalipsa spełniona",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-14-5",
    "number": 70,
    "title": "Tadeusz Różewicz: „Ocalony” – Kryzys poezji i etyki po Zagładzie",
    "subtitle": "„Mam dwadzieścia cztery lata / ocalałem / prowadzony na rzeź” – potrzeba nowego języka",
    "module": "Test historycznoliteracki",
    "epoch": "Literatura wojenna i okupacyjna",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 14: Literatura wojenna i okupacyjna. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Tadeusz Różewicz: „Ocalony” – Kryzys poezji i etyki po Zagładzie",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Tadeusz Różewicz: „Ocalony” – Kryzys poezji i etyki po Zagładzie",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Tadeusz Różewicz: „Ocalony” – Kryzys poezji i etyki po Zagładzie” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-14-5-a",
      "pol-task-14-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Tadeusz Różewicz: „Ocalony” – Kryzys poezji i etyki po Zagładzie",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-15-1",
    "number": 71,
    "title": "Struktura wypracowania w Formule 2023: Matryca oceniania CKE (35 pkt)",
    "subtitle": "Kryteria: Spełnienie formalnych warunków (300+ słów), Kompetencje literackie i kulturowe, Kompozycja i Język",
    "module": "Warsztat wypracowania",
    "epoch": "Wypracowanie maturalne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 15: Wypracowanie maturalne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Struktura wypracowania w Formule 2023: Matryca oceniania CKE (35 pkt)",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Struktura wypracowania w Formule 2023: Matryca oceniania CKE (35 pkt)",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Struktura wypracowania w Formule 2023: Matryca oceniania CKE (35 pkt)” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-15-1-a",
      "pol-task-15-1-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Struktura wypracowania w Formule 2023: Matryca oceniania CKE (35 pkt)",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-15-2",
    "number": 72,
    "title": "Formułowanie precyzyjnej tezy i konspekt argumentacyjny",
    "subtitle": "Jak uniknąć banału: postawienie odważnej, wieloaspektowej tezy odpowiadającej na temat",
    "module": "Warsztat wypracowania",
    "epoch": "Wypracowanie maturalne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 15: Wypracowanie maturalne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Formułowanie precyzyjnej tezy i konspekt argumentacyjny",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Formułowanie precyzyjnej tezy i konspekt argumentacyjny",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Formułowanie precyzyjnej tezy i konspekt argumentacyjny” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-15-2-a",
      "pol-task-15-2-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Formułowanie precyzyjnej tezy i konspekt argumentacyjny",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-15-3",
    "number": 73,
    "title": "Wybór lektury obowiązkowej i funkcjonalne omówienie problemu",
    "subtitle": "Dlaczego streszczenie fabuły daje 0 pkt – technika pisania analityczno-argumentacyjnego",
    "module": "Warsztat wypracowania",
    "epoch": "Wypracowanie maturalne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 15: Wypracowanie maturalne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Wybór lektury obowiązkowej i funkcjonalne omówienie problemu",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Wybór lektury obowiązkowej i funkcjonalne omówienie problemu",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Wybór lektury obowiązkowej i funkcjonalne omówienie problemu” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-15-3-a",
      "pol-task-15-3-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Wybór lektury obowiązkowej i funkcjonalne omówienie problemu",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-15-4",
    "number": 74,
    "title": "Kontekst biograficzny, historyczny, filozoficzny i literacki",
    "subtitle": "Czym jest kontekst funkcjonalny i jak zdobyć za niego maksymalne punkty w kryterium K",
    "module": "Warsztat wypracowania",
    "epoch": "Wypracowanie maturalne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 15: Wypracowanie maturalne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Kontekst biograficzny, historyczny, filozoficzny i literacki",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Kontekst biograficzny, historyczny, filozoficzny i literacki",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Kontekst biograficzny, historyczny, filozoficzny i literacki” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-15-4-a",
      "pol-task-15-4-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Kontekst biograficzny, historyczny, filozoficzny i literacki",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  },
  {
    "id": "pol-lesson-15-5",
    "number": 75,
    "title": "Błąd kardynalny a błąd rzeczowy – Żelazne procedury eliminacji",
    "subtitle": "Co bezwzględnie zeruje pracę (0/35 pkt) i technika 15-minutowej autokorekty czystopisu",
    "module": "Warsztat wypracowania",
    "epoch": "Wypracowanie maturalne",
    "durationMinutes": 45,
    "introduction": {
      "lead": "Kluczowa lekcja Działu 15: Wypracowanie maturalne. Opanuj ten koncept w 45 minut, aby zdobyć komplet punktów w arkuszu CKE Formuła 2023.",
      "objectives": [
        "Zrozumienie kluczowego zagadnienia: Błąd kardynalny a błąd rzeczowy – Żelazne procedury eliminacji",
        "Rozpoznawanie typowych pytań i schematów zadań CKE dla tego tematu",
        "Praktyczne zastosowanie w analizie tekstów i wypracowaniu maturalnym"
      ],
      "theoryPoints": [
        {
          "title": "Istota zagadnienia: Błąd kardynalny a błąd rzeczowy – Żelazne procedury eliminacji",
          "content": "W arkuszu CKE to zagadnienie pojawia się regularnie w Zeszycie 1 lub Zeszycie 2. Wymaga precyzyjnego rozumienia pojęć, unikania banałów i operowania konkretnymi faktami z lektur oraz teorii literatury."
        },
        {
          "title": "Złota zasada egzaminatora CKE",
          "content": "Klucz CKE punktuje wyłącznie myślenie analityczne i funkcjonalne. Odpowiedź musi odpowiadać na pytanie „dlaczego?” i „w jakim celu?”, a nie tylko relacjonować fabułę czy powierzchowne skojarzenia."
        }
      ],
      "ckeExaminerTips": [
        "Uważaj na dosłowność w pytaniach zamkniętych oraz brak kontekstu w zadaniach otwartych.",
        "Zawsze sprawdzaj, czy Twoja odpowiedź bezpośrednio odnosi się do polecenia CKE."
      ],
      "gatekeeper": {
        "question": "Co jest najważniejszym kryterium przy omawianiu zagadnienia: „Błąd kardynalny a błąd rzeczowy – Żelazne procedury eliminacji” w arkuszu CKE?",
        "options": [
          "Funkcjonalne powiązanie z tezą lub poleceniem, z unikaniem samego streszczania faktów",
          "Podanie jak największej liczby nieistotnych szczegółów biograficznych",
          "Napisanie tekstu jak najdłuższego bez względu na treść",
          "Wyrażenie wyłącznie prywatnych sympatii czytelniczych"
        ],
        "correctIndex": 0,
        "explanation": "Klucz CKE zawsze wymaga ujęcia funkcjonalnego. Odpowiedź musi służyć uzasadnieniu tezy i dowodzić zrozumienia problemu.",
        "hint": "Słowo klucz: funkcjonalność i analiza zamiast streszczenia."
      }
    },
    "taskIds": [
      "pol-task-15-5-a",
      "pol-task-15-5-b"
    ],
    "summary": {
      "keyTakeaways": [
        "Opanowano kluczowe pojęcie: Błąd kardynalny a błąd rzeczowy – Żelazne procedury eliminacji",
        "Zapamiętano pułapki CKE oraz zasady modelowego formułowania odpowiedzi"
      ],
      "reflection": "Powtórz w myślach 3 najważniejsze fakty lub pojęcia poznane w tej lekcji."
    }
  }
];

export function getLessonById(id: string): PolishLesson | undefined {
  return POLISH_LESSONS.find((l) => l.id === id);
}

export function getLessonsByModule(moduleName: string): PolishLesson[] {
  return POLISH_LESSONS.filter((l) => l.module === moduleName);
}

export function getPolishLessonsBySection(sectionId: string): PolishLesson[] {
  const section = POLISH_SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  return POLISH_LESSONS.filter(l => section.lessonIds.includes(l.id));
}
