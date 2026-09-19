import { TopicDocument, LessonDocument } from '../schema_firestore';

export interface PolishPillarInfo {
  id: string; title: string; name: string; short_title: string; description: string; icon: string; color: string; pointsGoal: number; topics_range: [number, number];
}

export const POLISH_PILLARS: PolishPillarInfo[] = [
  {
    id: 'pillar-1-jezyk-w-uzyciu', title: 'Język w użyciu i Retoryka', name: 'Język w użyciu i Retoryka', short_title: 'Język w użyciu',
    description: 'Funkcje języka, retoryka, stylistyka i notatka syntetyzująca (Arkusz 1, cz. 1 –10 pkt)',
    icon: 'MessageSquare', color: '#F43F5E', pointsGoal: 10, topics_range: [1, 4]
  },
  {
    id: 'pillar-2-lektury', title: 'Kanon Lektur i Epoki', name: 'Kanon Lektur i Epoki', short_title: 'Lektury i Epoki',
    description: 'Paszporty epok, omówienie lektur z gwiazdką, toposy i test historycznoliteracki (Arkusz 1, cz. 2 – 15 pkt)',
    icon: 'BookOpen', color: '#8B5CF6', pointsGoal: 15, topics_range: [5, 16]
  },
  {
    id: 'pillar-3-wypracowanie', title: 'Trenażer Wypracowania', name: 'Trenażer Wypracowania', short_title: 'Wypracowanie',
    description: 'Konstrukcja tezy, argumentacja C-W-K/TEEL, matryca kontekstów i obrona przed kardynałem (Arkusz 2 – 35 pkt)',
    icon: 'PenTool', color: '#10B981', pointsGoal: 35, topics_range: [17, 20]
  }
];

export const POLISH_FALLBACK_TOPICS: TopicDocument[] = [
  {
    "id": "pol-dzial-1",
    "numericId": 1,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-1-jezyk-w-uzyciu",
    "pillar_name": "Język w użyciu",
    "title": "Dział 1: Funkcje języka, akty mowy i komunikacja",
    "name": "Dział 1: Funkcje języka, akty mowy i komunikacja",
    "short_title": "Funkcje języka i komunikacja",
    "description": "Rozpoznawanie funkcji językowych (informatywna, ekspresywna, impresywna, fatyczna, metajęzykowa, stanowiąca) oraz analiza aktów mowy w tekstach nieliterackich.",
    "icon": "MessageSquare",
    "color": "#F43F5E",
    "matura_points_range": "2–4 pkt",
    "importance": "Kluczowy pewniak (Arkusz 1, zadania 1–3)",
    "required_books": [],
    "lessons_count": 2,
    "tasks_count": 12,
    "lessons_metadata": [
      {
        "id": "pol-lesson-1-1",
        "title": "Funkcja informatywna (poznawcza) a ekspresywna",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 6
      },
      {
        "id": "pol-lesson-1-2",
        "title": "Funkcja impresywna, fatyczna i metajęzykowa",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 6
      }
    ]
  },
  {
    "id": "pol-dzial-2",
    "numericId": 2,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-1-jezyk-w-uzyciu",
    "pillar_name": "Język w użyciu",
    "title": "Dział 2: Retoryka, perswazja, manipulacja i argumentacja",
    "name": "Dział 2: Retoryka, perswazja, manipulacja i argumentacja",
    "short_title": "Retoryka i manipulacja",
    "description": "Rozpoznawanie środków retorycznych, rozróżnianie perswazji od manipulacji, odróżnianie faktów od opinii oraz budowanie i analiza argumentów (logicznych, rzeczowych, emocjonalnych).",
    "icon": "Flame",
    "color": "#E11D48",
    "matura_points_range": "3–6 pkt",
    "importance": "Kluczowy pewniak (Arkusz 1)",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 5,
    "lessons_metadata": [
      {
        "id": "pol-lesson-2-1",
        "title": "Perswazja a manipulacja – jak je odróżnić na maturze",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 5
      }
    ]
  },
  {
    "id": "pol-dzial-3",
    "numericId": 3,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-1-jezyk-w-uzyciu",
    "pillar_name": "Język w użyciu",
    "title": "Dział 3: Stylistyka, środki językowe i rodzaje stylizacji",
    "name": "Dział 3: Stylistyka, środki językowe i rodzaje stylizacji",
    "short_title": "Stylistyka i środki językowe",
    "description": "Środki stylistyczne i ich funkcje w tekście, rodzaje stylizacji (archaizacja, dialektyzacja, kolokwializacja) oraz poprawność językowa i frazeologiczna.",
    "icon": "Feather",
    "color": "#FB7185",
    "matura_points_range": "2–4 pkt",
    "importance": "Wysoka waga (Arkusz 1, zadania leksykalne i składniowe)",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 3,
    "lessons_metadata": [
      {
        "id": "pol-lesson-3-1",
        "title": "Rodzaje stylizacji: archaizacja, dialektyzacja i kolokwializacja",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 3
      }
    ]
  },
  {
    "id": "pol-dzial-4",
    "numericId": 4,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-1-jezyk-w-uzyciu",
    "pillar_name": "Język w użyciu",
    "title": "Dział 4: Mistrz Notatki Syntetyzującej (CKE Masterclass)",
    "name": "Dział 4: Mistrz Notatki Syntetyzującej (CKE Masterclass)",
    "short_title": "Notatka syntetyzująca",
    "description": "Zasady CKE, żelazny limit 60–90 słów, szablony zdań łączących dwa teksty, eliminacja własnych opinii i dygresji, praktyczny trening na arkuszach maturalnych (4 punkty!).",
    "icon": "Layers",
    "color": "#BE123C",
    "matura_points_range": "4 pkt",
    "importance": "Absolutny pewniak maturalny (Zadanie otwarte za 4 pkt)",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 4,
    "lessons_metadata": [
      {
        "id": "pol-lesson-4-1",
        "title": "Zasady CKE i kryteria oceniania notatki syntetyzującej",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 4
      }
    ]
  },
  {
    "id": "pol-dzial-5",
    "numericId": 5,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
    "name": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
    "short_title": "Antyk i Biblia",
    "description": "Fundamenty kultury: Sofokles 'Antygona', mity greckie, Księga Hioba, Kohelet i Apokalipsa św. Jana. Toposy, archetypy i pojęcia tragizmu.",
    "icon": "BookOpen",
    "color": "#3B82F6",
    "matura_points_range": "4–8 pkt",
    "importance": "Kluczowy fundament (Arkusze 1 i 2)",
    "required_books": [],
    "lessons_count": 3,
    "tasks_count": 6,
    "lessons_metadata": [
      {
        "id": "pol-lesson-5-1",
        "title": "Paszport Epoki: Antyk i Biblia – filozofie, toposy i ramy czasowe",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      },
      {
        "id": "pol-lesson-5-2",
        "title": "Sofokles: Antygona – istota konfliktu tragicznego i fatum",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      },
      {
        "id": "pol-lesson-5-3",
        "title": "Biblia: Księga Hioba i Apokalipsa św. Jana – cierpienie i eschatologia",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      }
    ]
  },
  {
    "id": "pol-dzial-6",
    "numericId": 6,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 6: Średniowiecze – Bogurodzica, sacrum i etos rycerski",
    "name": "Dział 6: Średniowiecze – Bogurodzica, sacrum i etos rycerski",
    "short_title": "Średniowiecze",
    "description": "Bogurodzica (motyw deesis, archaizmy), Lament świętokrzyski, Legenda o św. Aleksym (asceza) i Pieśń o Rolandzie (etos rycerski). Danse macabre i memento mori.",
    "icon": "ShieldAlert",
    "color": "#6366F1",
    "matura_points_range": "3–6 pkt",
    "importance": "Częsty motyw w teście historycznoliterackim",
    "required_books": [],
    "lessons_count": 2,
    "tasks_count": 4,
    "lessons_metadata": [
      {
        "id": "pol-lesson-6-1",
        "title": "Paszport Epoki: Średniowiecze – teocentryzm, uniwersalizm i ramy czasowe",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      },
      {
        "id": "pol-lesson-6-2",
        "title": "Bogurodzica i Lament świętokrzyski – teologia i humanizacja sacrum",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      }
    ]
  },
  {
    "id": "pol-dzial-7",
    "numericId": 7,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 7: Renesans – Jan Kochanowski i harmonia świata",
    "name": "Dział 7: Renesans – Jan Kochanowski i harmonia świata",
    "short_title": "Renesans – Kochanowski",
    "description": "Paszport Renesansu (humanizm, stoicyzm, epikureizm). Jan Kochanowski: Pieśni, Treny (kryzys światopoglądowy) oraz Odprawa posłów greckich (obywatelska odpowiedzialność).",
    "icon": "Sun",
    "color": "#10B981",
    "matura_points_range": "5–10 pkt",
    "importance": "Kluczowy pewniak maturalny",
    "required_books": [],
    "lessons_count": 2,
    "tasks_count": 2,
    "lessons_metadata": [
      {
        "id": "pol-lesson-7-1",
        "title": "Paszport Epoki: Renesans – humanizm, antropocentryzm i ramy czasowe",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-7-2",
        "title": "Jan Kochanowski: Treny – dramat ojca i kryzys światopoglądowy mędrca",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-8",
    "numericId": 8,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 8: Barok i Oświecenie – Kontrasty, koncept i rozum",
    "name": "Dział 8: Barok i Oświecenie – Kontrasty, koncept i rozum",
    "short_title": "Barok i Oświecenie",
    "description": "Barokowy niepokój i poezja konceptualna (Morsztyn, Naborowski, Sęp Szarzyński). Oświeceniowy racjonalizm i dydaktyzm: Ignacy Krasicki (Bajki, Satyry) oraz Molier (Świętoszek).",
    "icon": "Scale",
    "color": "#F59E0B",
    "matura_points_range": "4–8 pkt",
    "importance": "Częsty motyw w zadaniach porównawczych",
    "required_books": [],
    "lessons_count": 2,
    "tasks_count": 2,
    "lessons_metadata": [
      {
        "id": "pol-lesson-8-1",
        "title": "Paszport Epoki: Barok i Oświecenie – sprzeczności i wiek rozumu",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-8-2",
        "title": "Ignacy Krasicki: Bajki i Satyry – dydaktyzm i krytyka sarmatyzmu",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-9",
    "numericId": 9,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 9: Romantyzm I – Świat ducha, wina i kara",
    "name": "Dział 9: Romantyzm I – Świat ducha, wina i kara",
    "short_title": "Romantyzm I – Duch i wina",
    "description": "Paszport Romantyzmu (irracjonalizm, ludowość, 1822–1864). Adam Mickiewicz: Ballady i romanse (Romantyczność), Dziady cz. II (etyka ludowa). Juliusz Słowacki: Balladyna (władza i zbrodnia).",
    "icon": "Moon",
    "color": "#8B5CF6",
    "matura_points_range": "6–12 pkt",
    "importance": "Kluczowy pewniak maturalny",
    "required_books": [],
    "lessons_count": 3,
    "tasks_count": 3,
    "lessons_metadata": [
      {
        "id": "pol-lesson-9-1",
        "title": "Paszport Epoki: Romantyzm – serce, bunt i ramy czasowe",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-9-2",
        "title": "Adam Mickiewicz: Dziady cz. II – obrzęd i etyka ludowa",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-9-3",
        "title": "Juliusz Słowacki: Balladyna – mechanizm zbrodni i żądza władzy",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-10",
    "numericId": 10,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 10: Romantyzm II – Dziady cz. III, Pan Tadeusz i Kordian",
    "name": "Dział 10: Romantyzm II – Dziady cz. III, Pan Tadeusz i Kordian",
    "short_title": "Romantyzm II – Dziady III, Kordian, Pan Tadeusz",
    "description": "Arcydzieła narodowe: Adam Mickiewicz 'Dziady cz. III' (prometeizm, mesjanizm, martyrologia) i 'Pan Tadeusz' (arkadia, Jacek Soplica). Juliusz Słowacki 'Kordian' (winkelriedyzm).",
    "icon": "Flame",
    "color": "#A855F7",
    "matura_points_range": "15–35 pkt",
    "importance": "Absolutny fundament wypracowania maturalnego",
    "required_books": [],
    "lessons_count": 3,
    "tasks_count": 5,
    "lessons_metadata": [
      {
        "id": "pol-lesson-10-1",
        "title": "Adam Mickiewicz: Dziady cz. III – martyrologia, prometeizm i mesjanizm",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      },
      {
        "id": "pol-lesson-10-2",
        "title": "Juliusz Słowacki: Kordian – winkelriedyzm i dramat niemocy czynu",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      },
      {
        "id": "pol-lesson-10-3",
        "title": "Adam Mickiewicz: Pan Tadeusz – mit arkadii i bohater dynamiczny",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-11",
    "numericId": 11,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 11: Pozytywizm I – Bolesław Prus: Lalka",
    "name": "Dział 11: Pozytywizm I – Bolesław Prus: Lalka",
    "short_title": "Lalka – Bolesław Prus",
    "description": "Arcydzieło polskiego realizmu. Stanisław Wokulski, Ignacy Rzecki, Izabela Łęcka. Konflikt romantyzmu i pozytywizmu, portret Warszawy i Paryża, błędy kardynalne.",
    "icon": "Bookmark",
    "color": "#F43F5E",
    "matura_points_range": "15–35 pkt",
    "importance": "Absolutny pewniak maturalny (najczęstszy temat wypracowań)",
    "required_books": [],
    "lessons_count": 2,
    "tasks_count": 2,
    "lessons_metadata": [
      {
        "id": "pol-lesson-11-1",
        "title": "Stanisław Wokulski – dualizm bohatera na granicy dwóch epok",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-11-2",
        "title": "Ignacy Rzecki i Pamiętnik starego subiekta – idealizm polityczny",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-12",
    "numericId": 12,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 12: Pozytywizm II – Walka o tożsamość i pamięć",
    "name": "Dział 12: Pozytywizm II – Walka o tożsamość i pamięć",
    "short_title": "Pozytywizm II – Potop, Gloria victis",
    "description": "Henryk Sienkiewicz 'Potop' (mit ku pokrzepieniu serc, rehabilitacja Kmicica). Eliza Orzeszkowa 'Gloria victis' (pamięć powstania styczniowego).",
    "icon": "Shield",
    "color": "#EF4444",
    "matura_points_range": "4–10 pkt",
    "importance": "Ważna baza do wypracowań o patriotyzmie",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 1,
    "lessons_metadata": [
      {
        "id": "pol-lesson-12-1",
        "title": "Henryk Sienkiewicz: Potop – przemiana Kmicica i mit kompensacyjny",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-13",
    "numericId": 13,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 13: Młoda Polska – Stanisław Wyspiański: Wesele",
    "name": "Dział 13: Młoda Polska – Stanisław Wyspiański: Wesele",
    "short_title": "Wesele – Stanisław Wyspiański",
    "description": "Paszport Młodej Polski (dekadentyzm, symbolizm, 1890–1918). Wesele: konfrontacja inteligencji i chłopów, zjawy, symbole narodowe (złoty róg, chocholi taniec).",
    "icon": "Music",
    "color": "#EC4899",
    "matura_points_range": "15–35 pkt",
    "importance": "Kluczowy pewniak maturalny (wypracowanie & test)",
    "required_books": [],
    "lessons_count": 2,
    "tasks_count": 3,
    "lessons_metadata": [
      {
        "id": "pol-lesson-13-1",
        "title": "Paszport Epoki: Młoda Polska – dekadentyzm, chłopomania i symbole",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-13-2",
        "title": "Stanisław Wyspiański: Wesele – zjawy i symbole narodowej niemocy",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 2
      }
    ]
  },
  {
    "id": "pol-dzial-14",
    "numericId": 14,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 14: Dwudziestolecie międzywojenne – Nowa Polska i Forma",
    "name": "Dział 14: Dwudziestolecie międzywojenne – Nowa Polska i Forma",
    "short_title": "Dwudziestolecie międzywojenne",
    "description": "Stefan Żeromski 'Przedwiośnie' (szklane domy, Cezary Baryka). Witold Gombrowicz 'Ferdydurke' (gęba, upupienie, forma). Bruno Schulz 'Sklepy cynamonowe'.",
    "icon": "Layers",
    "color": "#F59E0B",
    "matura_points_range": "10–25 pkt",
    "importance": "Kluczowy pewniak maturalny",
    "required_books": [],
    "lessons_count": 2,
    "tasks_count": 2,
    "lessons_metadata": [
      {
        "id": "pol-lesson-14-1",
        "title": "Stefan Żeromski: Przedwiośnie – rozczarowanie wolnością i szklane domy",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-14-2",
        "title": "Witold Gombrowicz: Ferdydurke – gęba, pupa i wszechwładna Forma",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-15",
    "numericId": 15,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 15: Literatura wojny i okupacji – Świat odczłowieczony",
    "name": "Dział 15: Literatura wojny i okupacji – Świat odczłowieczony",
    "short_title": "Wojna i okupacja",
    "description": "Zagłada, lagry i łagry. Tadeusz Borowski 'Opowiadania' (człowiek zlagrowany, behawioryzm). Gustaw Herling-Grudziński 'Inny świat' (sowiecki gułag). Hanna Krall 'Zdążyć przed Panem Bogiem'. Poezja Baczyńskiego i Różewicza.",
    "icon": "AlertTriangle",
    "color": "#BE123C",
    "matura_points_range": "10–25 pkt",
    "importance": "Kluczowy pewniak maturalny",
    "required_books": [],
    "lessons_count": 3,
    "tasks_count": 3,
    "lessons_metadata": [
      {
        "id": "pol-lesson-15-1",
        "title": "Tadeusz Borowski: Opowiadania – człowiek zlagrowany i technika behawioryzmu",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-15-2",
        "title": "Gustaw Herling-Grudziński: Inny świat – ocalenie człowieczeństwa w sowieckim łagrze",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-15-3",
        "title": "Hanna Krall: Zdążyć przed Panem Bogiem – demitologizacja Zagłady",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-16",
    "numericId": 16,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-2-lektury",
    "pillar_name": "Kanon Lektur i Epoki",
    "title": "Dział 16: Literatura współczesna – Bunt, system i moralność",
    "name": "Dział 16: Literatura współczesna – Bunt, system i moralność",
    "short_title": "Współczesność – Dżuma, Rok 1984, Tango",
    "description": "Albert Camus 'Dżuma' (parabola zła, laicki heroizm). George Orwell 'Rok 1984' (inwigilacja, nowomowa, totalitaryzm). Sławomir Mrożek 'Tango' (upadek formy, groteska). Poezja Zbigniewa Herberta.",
    "icon": "Eye",
    "color": "#14B8A6",
    "matura_points_range": "10–25 pkt",
    "importance": "Kluczowy pewniak maturalny",
    "required_books": [],
    "lessons_count": 3,
    "tasks_count": 3,
    "lessons_metadata": [
      {
        "id": "pol-lesson-16-1",
        "title": "Albert Camus: Dżuma – powieść-parabola i heroizm codzienności",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-16-2",
        "title": "George Orwell: Rok 1984 – anatomia totalitaryzmu i nowomowa",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      },
      {
        "id": "pol-lesson-16-3",
        "title": "Sławomir Mrożek: Tango – upadek wartości i dyktatura prymitywnej siły",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-17",
    "numericId": 17,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-3-wypracowanie",
    "pillar_name": "Trenażer Wypracowania",
    "title": "Dział 17: Konstrukcja Tezy i Architektura Rozprawki",
    "name": "Dział 17: Konstrukcja Tezy i Architektura Rozprawki",
    "short_title": "Teza i kompozycja wypracowania",
    "description": "Zasady CKE (minimum 300 słów), analiza problemowa polecenia, formułowanie precyzyjnej tezy/hipotezy, trójdzielna kompozycja (wstęp, rozwinięcie, zakończenie).",
    "icon": "PenTool",
    "color": "#F43F5E",
    "matura_points_range": "35 pkt",
    "importance": "Klucz do 35 punktów w Arkuszu 2",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 1,
    "lessons_metadata": [
      {
        "id": "pol-lesson-17-1",
        "title": "Analiza tematu i formułowanie dojrzałej tezy",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-18",
    "numericId": 18,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-3-wypracowanie",
    "pillar_name": "Trenażer Wypracowania",
    "title": "Dział 18: Argumentacja metodą C-W-K",
    "name": "Dział 18: Argumentacja metodą C-W-K",
    "short_title": "Metoda argumentacji C-W-K",
    "description": "Jak pisać rozwinięcie bez streszczania fabuły. Metoda C-W-K: Cecha/twierdzenie, Wątek/dowód z lektury, Konkluzja odpowiadająca na temat wypracowania.",
    "icon": "GitCommit",
    "color": "#E11D48",
    "matura_points_range": "35 pkt",
    "importance": "Klucz do 8 punktów za argumentację",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 1,
    "lessons_metadata": [
      {
        "id": "pol-lesson-18-1",
        "title": "Algorytm akapitu C-W-K: od twierdzenia do wniosku",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-19",
    "numericId": 19,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-3-wypracowanie",
    "pillar_name": "Trenażer Wypracowania",
    "title": "Dział 19: Matryca Kontekstów (Punkto-generator)",
    "name": "Dział 19: Matryca Kontekstów (Punkto-generator)",
    "short_title": "Matryca kontekstów CKE",
    "description": "Wymóg CKE: co najmniej dwa konteksty. Jak poprawnie i funkcjonalnie wprowadzać kontekst historyczny, biograficzny, filozoficzny, literacki i mitologiczny.",
    "icon": "Compass",
    "color": "#10B981",
    "matura_points_range": "35 pkt",
    "importance": "Klucz do zaliczenia kryterium kontekstów",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 1,
    "lessons_metadata": [
      {
        "id": "pol-lesson-19-1",
        "title": "Typy kontekstów i zasada funkcjonalności",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  },
  {
    "id": "pol-dzial-20",
    "numericId": 20,
    "subject_id": "jezyk-polski",
    "pillar_id": "pillar-3-wypracowanie",
    "pillar_name": "Trenażer Wypracowania",
    "title": "Dział 20: Strażnik Błędów Kardynalnych i Egzamin Finałowy",
    "name": "Dział 20: Strażnik Błędów Kardynalnych i Egzamin Finałowy",
    "short_title": "Błędy kardynalne & Symulator CKE",
    "description": "Katalog 50 najgroźniejszych błędów kardynalnych niszczących wypracowanie, trening anty-kardynalny oraz pełny symulator wypracowania z oficjalną rubryką punktową CKE (35 pkt).",
    "icon": "AlertOctagon",
    "color": "#E11D48",
    "matura_points_range": "35 pkt",
    "importance": "Ochrona przed zerem z wypracowania",
    "required_books": [],
    "lessons_count": 1,
    "tasks_count": 1,
    "lessons_metadata": [
      {
        "id": "pol-lesson-20-1",
        "title": "Czym jest błąd kardynalny i jak go bezwzględnie unikać",
        "required_points": 3,
        "required_correct_tasks": 3,
        "estimated_time_formatted": "~5 min",
        "tasks_count": 1
      }
    ]
  }
] as TopicDocument[];

const rawLessons: any[] = [
  {
    "id": "pol-lesson-1-1",
    "topic_id": "pol-dzial-1",
    "title": "Funkcja informatywna (poznawcza) a ekspresywna",
    "theory_pill": {
      "concept_essence": "Funkcja informatywna (poznawcza) służy obiektywnemu przekazywaniu faktów i wiedzy o świecie. Funkcja ekspresywna służy ujawnianiu emocji, uczuć i subiektywnego stanu nadawcy.",
      "key_points": [
        "Wskaźniki funkcji informatywnej: zdania oznajmujące, neutralne słownictwo, brak nacechowania emocjonalnego, liczby, fakty.",
        "Wskaźniki funkcji ekspresywnej: wykrzyknienia, znaki zapytania, epitety wartościujące ('wspaniały', 'ohydny'), zdrobnienia, zgrubienia, czasowniki w 1. os. lp."
      ],
      "golden_rule": "Gdy CKE pyta o dominującą funkcję fragmentu, szukaj słownictwa wartościującego. Jeśli przeważają fakty bez emocji – to funkcja poznawcza. Jeśli pojawia się ocena i emocja – to ekspresywna.",
      "cke_trap": {
        "error": "Mylenie ekspresji nadawcy z wywieraniem wpływu na odbiorcę.",
        "correct": "Funkcja ekspresywna wyraża stan NADAWCY ('Jestem wściekły!'). Funkcja impresywna ma skłonić ODBIORCĘ do reakcji ('Uspokój się!').",
        "description": "Zawsze patrz, czy wektor komunikatu jest skierowany na 'ja' nadawcy, czy na 'ty' odbiorcy."
      }
    },
    "formulaSheet": {
      "title": "Leksykon CKE: Funkcja poznawcza i ekspresywna",
      "description": "Leksykon CKE i kluczowe pojPęcia",
      "formulas": [
        {
          "name": "Funkcja poznawcza (informatywna)",
          "formula": "Przekaz faktów, styl neutralny, orzekanie o rzeczywistości.",
          "description": "Funkcja poznawcza (informatywna)"
        },
        {
          "name": "Funkcja ekspresywna (emotywna)",
          "formula": "Ujawnianie emocji, wykrzyknienia, słownictwo wartościujące.",
          "description": "Funkcja ekspresywna (emotywna)"
        },
        {
          "name": "Słownictwo nacechowane",
          "formula": "Wyrazy niosące ładunek emocjonalny dodatni (melioratywy) lub ujemny (pejoratywy).",
          "description": "Słownictwo nacechowane"
        }
      ],
      "goldenRule": "Wypowiedź naukowa i encyklopedyczna to 100% funkcja poznawcza. Felieton i blog to dominacja ekspresji.",
      "ckeTrap": {
        "error": "Uznanie pytania retorycznego za czystą informację.",
        "correct": "Pytanie retoryczne to środek perswazji lub ekspresji, nigdy nie służy tylko do przekazania danych.",
        "description": "CKE często testuje pytania retoryczne jako wskaźnik emocji lub perswazji."
      }
    },
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-1-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Przeczytaj fragment artykułu:\n\n„Piramida Cheopsa w Gizie ma obecnie wysokość 138,75 m, a jej podstawa tworzy kwadrat o boku 230,36 m. Do jej budowy użyto około 2,3 miliona kamiennych bloków”.\n\nJaka funkcja języka dominuje w powyższym fragmencie?",
        "options": [
          {
            "id": "A",
            "text": "Funkcja informatywna (poznawcza)",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Funkcja ekspresywna",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Funkcja impresywna",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Funkcja fatyczna",
            "is_correct": false
          }
        ],
        "explanation": "Tekst podaje ścisłe fakty, wymiary i liczby. Słownictwo jest całkowicie neutralne, brak jakichkolwiek ocen czy emocji nadawcy.",
        "hints": {
          "level_1": "Zwróć uwagę, czy autor wyraża swoje emocje lub próbuje cię do czegoś nakłonić.",
          "level_2": "Występują tu wyłącznie konkretne dane liczbowe i opisy wymiarów."
        },
        "cke_tag": "Funkcje języka • Funkcja informatywna",
        "instruction": "Przeczytaj fragment artykułu:\n\n„Piramida Cheopsa w Gizie ma obecnie wysokość 138,75 m, a jej podstawa tworzy kwadrat o boku 230,36 m. Do jej budowy użyto około 2,3 miliona kamiennych bloków”.\n\nJaka funkcja języka dominuje w powyższym fragmencie?",
        "math_statement": "",
        "title": "Funkcja informatywna (poznawcza) a ekspresywna",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-1-2",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Przeczytaj wypowiedź felietonisty:\n\n„To po prostu niewiarygodny skandal! Aż we mnie kipi ze złości, gdy patrzę na te bezduszne, betonowe potworki niszczące krajobraz mojego ukochanego miasta!”.\n\nKtóre elementy tekstu decydują o dominacji funkcji ekspresywnej?",
        "options": [
          {
            "id": "A",
            "text": "Wykrzyknienia, pejoratywne epitety ('bezduszne betonowe potworki') oraz bezpośrednie nazwanie emocji ('kipi ze złości')",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Użycie terminologii architektonicznej i urbanistycznej",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Obiektywny opis inwestycji budowlanych w mieście",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Apel do rady miasta o wstrzymanie pozwoleń na budowę",
            "is_correct": false
          }
        ],
        "explanation": "Użycie wykrzyknień, czasownika wyrażającego wzburzenie ('kipi ze złości') oraz słownictwa silnie wartościującego negatywnie świadczy o dominacji funkcji ekspresywnej.",
        "hints": {
          "level_1": "Szukaj słów, które zdradzają stan emocjonalny autora.",
          "level_2": "Zwróć uwagę na interpunkcję (wykrzykniki) i słowa wyrażające oburzenie."
        },
        "cke_tag": "Funkcje języka • Funkcja ekspresywna",
        "instruction": "Przeczytaj wypowiedź felietonisty:\n\n„To po prostu niewiarygodny skandal! Aż we mnie kipi ze złości, gdy patrzę na te bezduszne, betonowe potworki niszczące krajobraz mojego ukochanego miasta!”.\n\nKtóre elementy tekstu decydują o dominacji funkcji ekspresywnej?",
        "math_statement": "",
        "title": "Funkcja informatywna (poznawcza) a ekspresywna",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-1-3",
        "type": "TRUE_FALSE",
        "tier": "B",
        "points": 1,
        "question": "Oceń prawdziwość stwierdzenia: „Wypowiedź o dominującej funkcji ekspresywnej nie może jednocześnie zawierać żadnych informacji o faktach”.",
        "options": [
          {
            "id": "A",
            "text": "Prawda",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Fałsz",
            "is_correct": true
          }
        ],
        "explanation": "Fałsz. Wypowiedź może podawać fakty (np. 'Wczoraj spóźnił się pociąg!'), ale jeśli towarzyszy temu silny ładunek emocjonalny ('To skrajna bezczelność, nienawidzę tego przewoźnika!'), dominuje funkcja ekspresywna.",
        "hints": {
          "level_1": "Czy kiedy wyrażasz złość z powodu jakiegoś wydarzenia, wspominasz o samym wydarzeniu?",
          "level_2": "Funkcje języka rzadko występują w izolacji – jedna z nich jest zazwyczaj dominująca."
        },
        "cke_tag": "Teoria komunikacji • Relacje funkcji",
        "instruction": "Oceń prawdziwość stwierdzenia: „Wypowiedź o dominującej funkcji ekspresywnej nie może jednocześnie zawierać żadnych informacji o faktach”.",
        "math_statement": "",
        "title": "Funkcja informatywna (poznawcza) a ekspresywna",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-1-4",
        "type": "TWO_PART",
        "tier": "B",
        "points": 1,
        "question": "Rozpoznaj funkcję językową oraz cel zabiegu w poniższym zdaniu z recenzji literackiej:\n\n„Ta powieść to prawdziwa perła współczesnej prozy – hipnotyzująca od pierwszego zdania!”.",
        "part_1": {
          "prompt": "Dominująca funkcja językowa powyższego zdania to:",
          "options": [
            {
              "id": "A",
              "text": "Funkcja ekspresywna"
            },
            {
              "id": "B",
              "text": "Funkcja poznawcza"
            },
            {
              "id": "C",
              "text": "Funkcja metajęzykowa"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaki jest cel użytych metafor ('prawdziwa perła', 'hipnotyzująca')?",
          "options": [
            {
              "id": "1",
              "text": "Wyrażenie najwyższego zachwytu i subiektywnego uznania recenzenta"
            },
            {
              "id": "2",
              "text": "Ścisłe sklasyfikowanie gatunku literackiego książki"
            },
            {
              "id": "3",
              "text": "Nawiązanie bezpośredniego kontaktu z czytelnikiem"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Metafory wartościujące dodatnio ujawniają emocje i entuzjazm nadawcy, realizując funkcję ekspresywną.",
        "hints": {
          "level_1": "Czy recenzent podaje obiektywną definicję, czy wyraża swoje zachwycenie?",
          "level_2": "Słowa 'perła' i 'hipnotyzująca' to melioratywy – wyrazy oceniające pozytywnie."
        },
        "cke_tag": "Funkcje języka • Zadanie dwuczęściowe",
        "instruction": "Rozpoznaj funkcję językową oraz cel zabiegu w poniższym zdaniu z recenzji literackiej:\n\n„Ta powieść to prawdziwa perła współczesnej prozy – hipnotyzująca od pierwszego zdania!”.",
        "math_statement": "",
        "title": "Funkcja informatywna (poznawcza) a ekspresywna",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-1-5",
        "type": "SINGLE_CHOICE",
        "tier": "B",
        "points": 1,
        "question": "Wskaż wypowiedź, w której funkcja informatywna jest zakłócona przez subiektywne słownictwo wartościujące:",
        "options": [
          {
            "id": "A",
            "text": "Wczorajsza debata kandydatów na prezydenta rozpoczęła się o godzinie 20:00 i trwała 90 minut.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Połowa respondentów opowiedziała się za wprowadzeniem nowych przepisów podatkowych.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Podczas wczorajszej farsy politycznej pseudoelektorat dał popis żałosnej naiwności.",
            "is_correct": true
          },
          {
            "id": "D",
            "text": "W badaniu laboratoryjnym wskaźnik zanieczyszczenia wody wzrósł o 12% w skali miesiąca.",
            "is_correct": false
          }
        ],
        "explanation": "Opcja C używa pejoratywów ('farsa', 'pseudoelektorat', 'żałosna naiwność'), co sprawia, że informacja została zdominowana przez agresywną ekspresję i ocenę nadawcy.",
        "hints": {
          "level_1": "Szukaj zdań, w których autor używa obraźliwych lub złośliwych określeń.",
          "level_2": "Słowa 'farsa' i 'żałosna' to jaskrawe przykłady słownictwa wartościującego."
        },
        "cke_tag": "Język w użyciu • Obiektywizm tekstu",
        "instruction": "Wskaż wypowiedź, w której funkcja informatywna jest zakłócona przez subiektywne słownictwo wartościujące:",
        "math_statement": "",
        "title": "Funkcja informatywna (poznawcza) a ekspresywna",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-1-6",
        "type": "OPEN_SHORT",
        "tier": "C",
        "points": 1,
        "question": "Przekształć poniższe zdanie o funkcji ekspresywnej w neutralne zdanie o czystej funkcji informatywnej:\n\n„Ten koszmarny, potwornie nudny wykład z chemii ciągnął się w nieskończoność!”.",
        "correct_answer": "Wykład z chemii trwał długo. / Wykład z chemii trwał dwie godziny. / Odbył się długi wykład z chemii.",
        "explanation": "Aby uzyskać funkcję informatywną, należy usunąć pejoratywne epitety ('koszmarny', 'potwornie nudny') oraz wykrzyknik, pozostawiając sam neutralny fakt o trwaniu wykładu.",
        "hints": {
          "level_1": "Usuń wszystkie przymiotniki oceniające i wykrzyknik.",
          "level_2": "Zapisz samo stwierdzenie faktu w trybie oznajmującym."
        },
        "cke_tag": "Transformacja tekstu • Funkcja informatywna",
        "ai_tutor_rubric": {
          "max_points": 1,
          "criterion_1_point": "Zdający usunął elementy emocjonalne/wartościujące i sformułował poprawne gramatycznie zdanie oznajmujące o neutralnym charakterze.",
          "criterion_0_points": "Pozostawiono słownictwo wartościujące lub nie zachowano sensu wypowiedzi."
        },
        "instruction": "Przekształć poniższe zdanie o funkcji ekspresywnej w neutralne zdanie o czystej funkcji informatywnej:\n\n„Ten koszmarny, potwornie nudny wykład z chemii ciągnął się w nieskończoność!”.",
        "math_statement": "",
        "title": "Funkcja informatywna (poznawcza) a ekspresywna",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      }
    ]
  },
  {
    "id": "pol-lesson-1-2",
    "topic_id": "pol-dzial-1",
    "title": "Funkcja impresywna, fatyczna i metajęzykowa",
    "theory_pill": {
      "concept_essence": "Funkcja impresywna wpływa na odbiorcę (nakazy, apele, perswazja). Funkcja fatyczna służy nawiązaniu lub podtrzymaniu kontaktu. Funkcja metajęzykowa to mówienie o samym języku i znaczeniu słów.",
      "key_points": [
        "Impresywna: tryb rozkazujący ('Kup!', 'Pomyśl!'), formy wołacza, bezokoliczniki w funkcji apelu, slogany reklamowe.",
        "Fatyczna: 'Halo?', 'Słuchasz mnie?', 'Dzień dobry', zwroty grzecznościowe, potwierdzenia ('mhm', 'no tak').",
        "Metajęzykowa: 'Wyraz X oznacza...', 'Słowo to pochodzi z greki...', definiowanie pojęć, objaśnianie gramatyki."
      ],
      "golden_rule": "Gdy w tekście autor tłumaczy, co znaczy dany termin lub skąd pochodzi jego nazwa – to zawsze jest funkcja metajęzykowa!",
      "cke_trap": {
        "error": "Mylenie pytania o uwagę ('Wiesz co mam na myśli?') z pytaniem o wiedzę.",
        "correct": "Pytania sprawdzające, czy rozmówca nas słucha, pełnią funkcję fatyczną, a nie poznawczą.",
        "description": "Funkcja fatyczna nie niesie żadnej nowej wiedzy – dba jedynie o drożność kanału komunikacji."
      }
    },
    "formulaSheet": {
      "title": "Leksykon CKE: Funkcja impresywna, fatyczna i metajęzykowa",
      "description": "Leksykon CKE i kluczowe pojPęcia",
      "formulas": [
        {
          "name": "Funkcja impresywna (konatywna)",
          "formula": "Kształtowanie postaw i zachowań odbiorcy, nakazy, prośby, sugestie.",
          "description": "Funkcja impresywna (konatywna)"
        },
        {
          "name": "Funkcja fatyczna",
          "formula": "Otwieranie, podtrzymywanie lub zamykanie kontaktu (np. 'Do widzenia', 'Rozumiesz?').",
          "description": "Funkcja fatyczna"
        },
        {
          "name": "Funkcja metajęzykowa",
          "formula": "Użycie języka do opisu kodu językowego, etymologia, słowniki.",
          "description": "Funkcja metajęzykowa"
        }
      ],
      "goldenRule": "Reklama i manifest polityczny bazują na funkcji impresywnej. Słownik i podręcznik gramatyki na metajęzykowej.",
      "ckeTrap": {
        "error": "Uznanie powitania 'Cześć' za funkcję ekspresywną.",
        "correct": "'Cześć' to czysta funkcja fatyczna – służy otwarciu kontaktu.",
        "description": "Zwroty powitalne i pożegnalne to podręcznikowy przykład funkcji fatycznej."
      }
    },
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-1-2-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Przeczytaj hasło ze słownika języka polskiego:\n\n„Topos (gr. topos – miejsce) – powtarzający się motyw lub odwieczny motyw literacki i kulturowy, będący wspólnym dziedzictwem danej kultury”.\n\nJaka funkcja języka jest dominująca w tym tekście?",
        "options": [
          {
            "id": "A",
            "text": "Funkcja metajęzykowa",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Funkcja impresywna",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Funkcja poetycka",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Funkcja fatyczna",
            "is_correct": false
          }
        ],
        "explanation": "Tekst wyjaśnia etymologię oraz definicję samego wyrazu językowego ('topos'). To podręcznikowy przykład funkcji metajęzykowej.",
        "hints": {
          "level_1": "Czy autor mówi o świecie, czy o znaczeniu konkretnego słowa?",
          "level_2": "Przedmiotem wypowiedzi jest kod językowy i objaśnienie terminu."
        },
        "cke_tag": "Funkcje języka • Funkcja metajęzykowa",
        "instruction": "Przeczytaj hasło ze słownika języka polskiego:\n\n„Topos (gr. topos – miejsce) – powtarzający się motyw lub odwieczny motyw literacki i kulturowy, będący wspólnym dziedzictwem danej kultury”.\n\nJaka funkcja języka jest dominująca w tym tekście?",
        "math_statement": "",
        "title": "Funkcja impresywna, fatyczna i metajęzykowa",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-2-2",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Wskaż wypowiedź, której głównym celem jest realizacja funkcji fatycznej:",
        "options": [
          {
            "id": "A",
            "text": "„Słuchaj, jesteś tam jeszcze? Przerywa nam na linii!”.",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "„Nie zwlekaj, zagłosuj na nasz komitet już w najbliższą niedzielę!”.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "„Słowo 'dygresja' oznacza odejście od głównego tematu rozmowy”.",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "„Jestem głęboko poruszony twoją wspaniałą postawą”.",
            "is_correct": false
          }
        ],
        "explanation": "Opcja A służy sprawdzeniu drożności kanału komunikacyjnego ('przerywa nam na linii', 'jesteś tam jeszcze?'). To czysta funkcja fatyczna.",
        "hints": {
          "level_1": "Szukaj zdania, które sprawdza, czy rozmowa w ogóle trwa.",
          "level_2": "Pytania o jakość połączenia telefonicznego to klasyczny przykład podtrzymania kontaktu."
        },
        "cke_tag": "Funkcje języka • Funkcja fatyczna",
        "instruction": "Wskaż wypowiedź, której głównym celem jest realizacja funkcji fatycznej:",
        "math_statement": "",
        "title": "Funkcja impresywna, fatyczna i metajęzykowa",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-2-3",
        "type": "TWO_PART",
        "tier": "B",
        "points": 1,
        "question": "Przeczytaj hasło kampanii ekologicznej:\n\n„Zgaś zbędne światło! Każda zaoszczędzona kilowatogodzina to mniej smogu nad twoim domem”.",
        "part_1": {
          "prompt": "Główna funkcja językowa tego hasła to:",
          "options": [
            {
              "id": "A",
              "text": "Funkcja impresywna"
            },
            {
              "id": "B",
              "text": "Funkcja ekspresywna"
            },
            {
              "id": "C",
              "text": "Funkcja fatyczna"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaki zabieg językowy posłużył do realizacji tej funkcji?",
          "options": [
            {
              "id": "1",
              "text": "Użycie trybu rozkazującego ('Zgaś!') połączone z argumentem przyczynowo-skutkowym"
            },
            {
              "id": "2",
              "text": "Zastosowanie definicji encyklopedycznej kilowatogodziny"
            },
            {
              "id": "3",
              "text": "Wyrażenie bezsilności autora wobec problemu smogu"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Hasło nakłania odbiorcę do konkretnego działania (tryb rozkazujący 'Zgaś!'), podając korzyść. Jest to funkcja impresywna.",
        "hints": {
          "level_1": "Do czego dąży autor hasła – do wyrażenia siebie czy nakłonienia odbiorcy do działania?",
          "level_2": "Forma 'Zgaś!' to wezwanie skierowane bezpośrednio do czytelnika."
        },
        "cke_tag": "Funkcje języka • Funkcja impresywna",
        "instruction": "Przeczytaj hasło kampanii ekologicznej:\n\n„Zgaś zbędne światło! Każda zaoszczędzona kilowatogodzina to mniej smogu nad twoim domem”.",
        "math_statement": "",
        "title": "Funkcja impresywna, fatyczna i metajęzykowa",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-2-4",
        "type": "MATCHING",
        "tier": "B",
        "points": 1,
        "question": "Przyporządkuj wypowiedź do dominującej w niej funkcji języka:",
        "pairs": [
          {
            "concept": "„Polska leży w Europie Środkowej nad Morzem Bałtyckim”.",
            "definition": "Funkcja informatywna (poznawcza)"
          },
          {
            "concept": "„Weź się w garść i nie poddawaj!”.",
            "definition": "Funkcja impresywna"
          },
          {
            "concept": "„Przez pojęcie 'frazeologizm' rozumiemy utrwalone połączenie wyrazów”.",
            "definition": "Funkcja metajęzykowa"
          }
        ],
        "explanation": "Każde zdanie realizuje inny cel: informacja o geografii (poznawcza), apel do woli (impresywna), definicja pojęcia językowego (metajęzykowa).",
        "cke_tag": "Funkcje języka • Dopasowanie",
        "instruction": "Przyporządkuj wypowiedź do dominującej w niej funkcji języka:",
        "math_statement": "",
        "title": "Funkcja impresywna, fatyczna i metajęzykowa",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-1-2-5",
        "type": "TRUE_FALSE",
        "tier": "B",
        "points": 1,
        "question": "Oceń prawdziwość stwierdzenia: „Funkcja stanowiąca (performatywna) pojawia się wtedy, gdy samo wypowiedzenie słów powoduje zmianę w świecie rzeczywistym (np. 'Ogłaszam was mężem i żoną', 'Nadaję ci imię Jan')”.",
        "options": [
          {
            "id": "A",
            "text": "Prawda",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Fałsz",
            "is_correct": false
          }
        ],
        "explanation": "Prawda. Wypowiedzi performatywne (funkcja stanowiąca) tworzą nowy stan prawny lub społeczny z mocy samego wypowiedzenia słów przez uprawnioną osobę.",
        "hints": {
          "level_1": "Pomyśl o przysiędze lub wyroku sądowym – czy same słowa zmieniają status prawny?",
          "level_2": "Funkcja stanowiąca tworzy nowy fakt społeczny lub prawny."
        },
        "cke_tag": "Funkcje języka • Funkcja stanowiąca",
        "instruction": "Oceń prawdziwość stwierdzenia: „Funkcja stanowiąca (performatywna) pojawia się wtedy, gdy samo wypowiedzenie słów powoduje zmianę w świecie rzeczywistym (np. 'Ogłaszam was mężem i żoną', 'Nadaję ci imię Jan')”.",
        "math_statement": "",
        "title": "Funkcja impresywna, fatyczna i metajęzykowa",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      },
      {
        "id": "task-pol-1-2-6",
        "type": "SINGLE_CHOICE",
        "tier": "C",
        "points": 1,
        "question": "Przeczytaj fragment rozmowy:\n\n– Więc mówię mu, że… no wiesz… jakby to powiedzieć…\n– No mów śmiało, słucham cię uważnie!\n\nJaką rolę pełnią podkreślone zwroty („no wiesz”, „słucham cię uważnie”)?",
        "options": [
          {
            "id": "A",
            "text": "Podtrzymują kontakt i dają sygnał gotowości do odbioru (funkcja fatyczna)",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Przekazują kluczową treść logiczną wypowiedzi (funkcja poznawcza)",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Wyjaśniają skomplikowane zjawisko gramatyczne (funkcja metajęzykowa)",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Stanowią rozkaz wykonania pracy fizycznej (funkcja impresywna)",
            "is_correct": false
          }
        ],
        "explanation": "Wtrącenia te nie wnoszą treści merytorycznej, lecz regulują przebieg dialogu i potwierdzają uwagę rozmówcy (funkcja fatyczna).",
        "hints": {
          "level_1": "Zastanów się, co wnoszą te słowa do tematu rozmowy.",
          "level_2": "Służą one wyłącznie organizacji kanału kontaktu między rozmówcami."
        },
        "cke_tag": "Funkcje języka • Dialog i fatyzm",
        "instruction": "Przeczytaj fragment rozmowy:\n\n– Więc mówię mu, że… no wiesz… jakby to powiedzieć…\n– No mów śmiało, słucham cię uważnie!\n\nJaką rolę pełnią podkreślone zwroty („no wiesz”, „słucham cię uważnie”)?",
        "math_statement": "",
        "title": "Funkcja impresywna, fatyczna i metajęzykowa",
        "topic": "Dział 1: Funkcje języka, akty mowy i komunikacja"
      }
    ]
  },
  {
    "id": "pol-lesson-2-1",
    "topic_id": "pol-dzial-2",
    "title": "Perswazja a manipulacja – jak je odróżnić na maturze",
    "theory_pill": {
      "concept_essence": "Perswazja to jawny, uczciwy wpływ na odbiorcę za pomocą rzetelnych argumentów. Manipulacja to nieuczciwe, ukryte wywieranie wpływu mające przynieść korzyść nadawcy kosztem odbiorcy.",
      "key_points": [
        "Perswazja: jawny cel, rzetelne fakty, szacunek dla wolności wyboru odbiorcy, logiczne wnioskowanie.",
        "Manipulacja: ukryty cel, fałszowanie faktów, żerowanie na lękach i uprzedzeniach, pochlebstwa, chwyty erystyczne (np. argumentum ad personam)."
      ],
      "golden_rule": "Gdy w tekście autor atakuje przeciwnika zamiast jego poglądów (np. 'mój oponent jest niekompetentny i śmieszny') – to zawsze jest zabieg erystyczny/manipulacyjny (ad personam).",
      "cke_trap": {
        "error": "Twierdzenie, że każda reklama lub apel to manipulacja.",
        "correct": "Jeśli nadawca jawnie przekonuje do swoich racji i nie ukrywa intencji, stosuje perswazję, a nie manipulację.",
        "description": "Manipulacja zachodzi TYLKO wtedy, gdy mechanizm wpływu jest ukryty lub oparty na nieczystych chwytach."
      }
    },
    "formulaSheet": {
      "title": "Leksykon CKE: Perswazja vs Manipulacja",
      "description": "Leksykon CKE i kluczowe pojPęcia",
      "formulas": [
        {
          "name": "Perswazja",
          "formula": "Sztuka przekonywania do własnych racji z poszanowaniem prawdy i wolności odbiorcy.",
          "description": "Perswazja"
        },
        {
          "name": "Manipulacja",
          "formula": "Ukryte oddziaływanie na myśli i emocje w celu osiągnięcia własnej korzyści.",
          "description": "Manipulacja"
        },
        {
          "name": "Argumentum ad personam",
          "formula": "Pozamerytoryczny atak na cechy osobiste oponenta zamiast dyskusji z tezą.",
          "description": "Argumentum ad personam"
        },
        {
          "name": "Argumentum ad baculum",
          "formula": "Odwołanie się do groźby, zastraszenia odbiorcy.",
          "description": "Argumentum ad baculum"
        }
      ],
      "goldenRule": "Prawda i jawność = perswazja. Ukryty interes i zniekształcenie prawdy = manipulacja.",
      "ckeTrap": {
        "error": "Utożsamianie perswazji z kłamstwem.",
        "correct": "Perswazja opiera się na prawdzie i argumentach – kłamstwo to domena manipulacji.",
        "description": "Pamiętaj o tym rozróżnieniu na zadaniach z czytania ze zrozumieniem."
      }
    },
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-2-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Który z poniższych komunikatów ma charakter czystej manipulacji językowej?",
        "options": [
          {
            "id": "A",
            "text": "„Badania kliniczne wykazały, że regularny spacer obniża ciśnienie krwi o 8%”.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "„Zachęcam do zakupu naszej książki, ponieważ zysk przekażemy na schronisko”.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "„Każdy prawdziwy Polak i człowiek honoru bez wahania poprze nasz projekt ustawy!”.",
            "is_correct": true
          },
          {
            "id": "D",
            "text": "„Proponuję przełożyć spotkanie na piątek ze względu na zapowiadaną śnieżycę”.",
            "is_correct": false
          }
        ],
        "explanation": "Komunikat C stosuje manipulacyjny szantaż emocjonalny (argument z fałszywego autorytetu / definicji perswazyjnej: jeśli nie poprzesz ustawy, nie jesteś 'prawdziwym Polakiem ani człowiekiem honoru').",
        "hints": {
          "level_1": "Szukaj zdania, które wywiera nieuczciwą presję tożsamościową na odbiorcę.",
          "level_2": "Użycie sformułowań 'każdy prawdziwy...' to podręcznikowa manipulacja."
        },
        "cke_tag": "Manipulacja językowa • Szantaż emocjonalny",
        "instruction": "Który z poniższych komunikatów ma charakter czystej manipulacji językowej?",
        "math_statement": "",
        "title": "Perswazja a manipulacja – jak je odróżnić na maturze",
        "topic": "Dział 2: Retoryka, perswazja, manipulacja i argumentacja"
      },
      {
        "id": "task-pol-2-1-2",
        "type": "TWO_PART",
        "tier": "B",
        "points": 1,
        "question": "W debacie publicznej polityk powiedział o swoim oponencie:\n\n„Nie powinniśmy słuchać pana Kowalskiego w kwestii edukacji, gdyż sam dwukrotnie powtarzał klasę w liceum!”.",
        "part_1": {
          "prompt": "Jaki pozamerytoryczny chwyt erystyczny zastosował mówca?",
          "options": [
            {
              "id": "A",
              "text": "Argumentum ad personam (atak osobisty)"
            },
            {
              "id": "B",
              "text": "Argumentum ad populum (odwołanie do upodobań tłumu)"
            },
            {
              "id": "C",
              "text": "Argument z autorytetu naukowego"
            }
          ]
        },
        "part_2": {
          "prompt": "Dlaczego ten argument jest logicznie wadliwy?",
          "options": [
            {
              "id": "1",
              "text": "Odnosi się do przeszłości oponenta zamiast merytorycznej oceny jego obecnych propozycji"
            },
            {
              "id": "2",
              "text": "Zawiera błąd ortograficzny w nazwisku Kowalskiego"
            },
            {
              "id": "3",
              "text": "Jest zbyt skomplikowany dla przeciętnego odbiorcy"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Polityk zaatakował biografię rozmówcy, zamiast odnieść się do przedstawionych przez niego argumentów edukacyjnych. To klasyczny chwyt ad personam.",
        "hints": {
          "level_1": "Czy mówca dyskutuje z pomysłami, czy z człowiekiem?",
          "level_2": "Atak na osobę to po łacinie 'ad personam'."
        },
        "cke_tag": "Erystyka • Argumentum ad personam",
        "instruction": "W debacie publicznej polityk powiedział o swoim oponencie:\n\n„Nie powinniśmy słuchać pana Kowalskiego w kwestii edukacji, gdyż sam dwukrotnie powtarzał klasę w liceum!”.",
        "math_statement": "",
        "title": "Perswazja a manipulacja – jak je odróżnić na maturze",
        "topic": "Dział 2: Retoryka, perswazja, manipulacja i argumentacja"
      },
      {
        "id": "task-pol-2-1-3",
        "type": "TRUE_FALSE",
        "tier": "A",
        "points": 1,
        "question": "Oceń prawdziwość stwierdzenia: „Zdanie 'Polska wstąpiła do Unii Europejskiej 1 maja 2004 roku' jest faktem, natomiast zdanie 'Przystąpienie Polski do Unii Europejskiej było najlepszą decyzją w naszej historii' jest opinią”.",
        "options": [
          {
            "id": "A",
            "text": "Prawda",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Fałsz",
            "is_correct": false
          }
        ],
        "explanation": "Prawda. Data wstąpienia do UE jest obiektywnie weryfikowalnym faktem historycznym. Określenie decyzji mianem 'najlepszej' to subiektywna opinia wartościująca.",
        "hints": {
          "level_1": "Czy pierwsze zdanie można sprawdzić w kalendarzu i dokumentach?",
          "level_2": "Słowo 'najlepsza' to ocena, a nie obiektywny fakt."
        },
        "cke_tag": "Język w użyciu • Fakt a opinia",
        "instruction": "Oceń prawdziwość stwierdzenia: „Zdanie 'Polska wstąpiła do Unii Europejskiej 1 maja 2004 roku' jest faktem, natomiast zdanie 'Przystąpienie Polski do Unii Europejskiej było najlepszą decyzją w naszej historii' jest opinią”.",
        "math_statement": "",
        "title": "Perswazja a manipulacja – jak je odróżnić na maturze",
        "topic": "Dział 2: Retoryka, perswazja, manipulacja i argumentacja"
      },
      {
        "id": "task-pol-2-1-4",
        "type": "SINGLE_CHOICE",
        "tier": "B",
        "points": 1,
        "question": "Wskaż wypowiedź stanowiącą ARGUMENT RZECZOWY (oparty na twardych danych i faktach):",
        "options": [
          {
            "id": "A",
            "text": "„Wszyscy wiemy, że ta reforma nie ma najmniejszego sensu”.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "„Według danych GUS stopa bezrobocia w listopadzie wyniosła 5,0%, co oznacza spadek o 0,2 p.p. rok do roku”.",
            "is_correct": true
          },
          {
            "id": "C",
            "text": "„Moja ciocia uważa, że pogoda w tym roku będzie wyjątkowo deszczowa”.",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "„Powinieneś się wstydzić, że w ogóle zadajesz takie pytania!”.",
            "is_correct": false
          }
        ],
        "explanation": "Argument rzeczowy opiera się na faktach, statystykach, orzeczeniach, badaniach lub dokumentach (dane GUS).",
        "hints": {
          "level_1": "Szukaj instytucji badawczej i konkretnych liczb.",
          "level_2": "Dane Głównego Urzędu Statystycznego to niepodważalny fakt."
        },
        "cke_tag": "Argumentacja • Argument rzeczowy",
        "instruction": "Wskaż wypowiedź stanowiącą ARGUMENT RZECZOWY (oparty na twardych danych i faktach):",
        "math_statement": "",
        "title": "Perswazja a manipulacja – jak je odróżnić na maturze",
        "topic": "Dział 2: Retoryka, perswazja, manipulacja i argumentacja"
      },
      {
        "id": "task-pol-2-1-5",
        "type": "OPEN_SHORT",
        "tier": "C",
        "points": 1,
        "question": "Wyjaśnij w jednym zdaniu, na czym polega manipulacyjny charakter pytania sugerującego:\n\n„Dlaczego tak bardzo lekceważy pan swoje obowiązki domowe?”.",
        "correct_answer": "Pytanie zawiera w sobie ukryte, nieudowodnione założenie, że rozmówca lekceważy obowiązki, zmuszając go do tłumaczenia się z rzekomej winy.",
        "explanation": "Pytanie sugerujące zawiera fałszywą lub nieudowodnioną przesłankę jako fakt pewny, odbierając pytanemu możliwość zaprzeczenia samemu zarzutowi bez wikłania się w tłumaczenia.",
        "hints": {
          "level_1": "Zwróć uwagę, co pytanie zakłada z góry o rozmówcy.",
          "level_2": "Niezależnie od odpowiedzi, pytany potwierdza, że 'lekceważy obowiązki'."
        },
        "cke_tag": "Erystyka • Pytanie sugerujące",
        "ai_tutor_rubric": {
          "max_points": 1,
          "criterion_1_point": "Zdający wskazał, że pytanie zawiera ukrytą tezę/założenie o winie rozmówcy i narzuca mu niekorzystną pozycję obronną.",
          "criterion_0_points": "Brak wyjaśnienia mechanizmu manipulacji."
        },
        "instruction": "Wyjaśnij w jednym zdaniu, na czym polega manipulacyjny charakter pytania sugerującego:\n\n„Dlaczego tak bardzo lekceważy pan swoje obowiązki domowe?”.",
        "math_statement": "",
        "title": "Perswazja a manipulacja – jak je odróżnić na maturze",
        "topic": "Dział 2: Retoryka, perswazja, manipulacja i argumentacja"
      }
    ]
  },
  {
    "id": "pol-lesson-3-1",
    "topic_id": "pol-dzial-3",
    "title": "Rodzaje stylizacji: archaizacja, dialektyzacja i kolokwializacja",
    "theory_pill": {
      "concept_essence": "Stylizacja to świadome ukształtowanie wypowiedzi na wzór określonego stylu, epoki lub odmiany języka. Służy uwiarygodnieniu świata przedstawionego, charakteryzacji bohatera lub budowaniu nastroju.",
      "key_points": [
        "Archaizacja: wprowadzanie dawnych form wyrazowych (archaizmów) – np. u Sienkiewicza w 'Trylogii' w celu oddania klimatu XVII wieku.",
        "Dialektyzacja: wprowadzanie elementów gwary ludowej (np. podhalańskiej w 'Weselu' Wyspiańskiego czy w prozie Reymonta).",
        "Kolokwializacja: używanie języka potocznego, słownictwa potocznego, skrótów myślowych w tekście o charakterze artystycznym lub oficjalnym."
      ],
      "golden_rule": "Gdy CKE pyta o funkcję stylizacji w utworze, nigdy nie odpowiadaj jednym słowem. Zawsze wskaż: 1. Nazwę stylizacji, 2. Cel (np. oddanie kolorytu historycznego XVII wieku lub scharakteryzowanie chłopa z Bronowic).",
      "cke_trap": {
        "error": "Uznanie archaizacji za błąd językowy autora.",
        "correct": "Archaizacja to celowy zabieg artystyczny, a nie błąd. Błędem byłoby użycie archaizmu w oficjalnym podaniu współczesnym.",
        "description": "W zadaniach maturalnych analizujemy funkcję zabiegu artystycznego."
      }
    },
    "formulaSheet": {
      "title": "Leksykon CKE: Rodzaje stylizacji",
      "description": "Leksykon CKE i kluczowe pojPęcia",
      "formulas": [
        {
          "name": "Archaizacja",
          "formula": "Wprowadzenie słów, form gramatycznych lub składni z dawnych epok.",
          "description": "Archaizacja"
        },
        {
          "name": "Dialektyzacja (stylizacja gwarowa)",
          "formula": "Wprowadzenie elementów gwary wiejskiej lub regionalizmów.",
          "description": "Dialektyzacja (stylizacja gwarowa)"
        },
        {
          "name": "Kolokwializacja",
          "formula": "Wprowadzenie wyrazów i zwrotów z języka potocznego do stylu wyższego.",
          "description": "Kolokwializacja"
        }
      ],
      "goldenRule": "Funkcja stylizacji: uwiarygodnienie postaci (charakterologiczna) lub epoki (historyczna).",
      "ckeTrap": {
        "error": "Mylenie gwary z żargonem środowiskowym.",
        "correct": "Gwara to język ludności wiejskiej danego regionu (np. gwara góralska). Żargon to język grupy zawodowej/społecznej (np. slang młodzieżowy, żargon medyczny).",
        "description": "Zawsze weryfikuj źródło pochodzenia słownictwa."
      }
    },
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-3-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Przeczytaj fragment wypowiedzi Czepca z „Wesela” Stanisława Wyspiańskiego:\n\n„Cóż tam, panie, w polityce?\nChińcyki trzymają się mocno!?\n(...) Panowie duzo wiecie,\nwitoć tańcujecie, a my nie.”",
        "part_1": {
          "prompt": "Jaki rodzaj stylizacji językowej zastosował autor we fragmencie?",
          "options": [
            {
              "id": "A",
              "text": "Dialektyzację (stylizację gwarową)"
            },
            {
              "id": "B",
              "text": "Archaizację"
            },
            {
              "id": "C",
              "text": "Stylizację biblijną"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaka jest funkcja tej stylizacji w dramacie?",
          "options": [
            {
              "id": "1",
              "text": "Charakterystyka środowiskowa i językowa małopolskiego chłopa"
            },
            {
              "id": "2",
              "text": "Podkreślenie szlacheckiego rodowodu bohatera"
            },
            {
              "id": "3",
              "text": "Wprowadzenie atmosfery grozy i mistycyzmu"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Zastosowanie form gwarowych ('Chińcyki', 'witoć') to dialektyzacja, która służy realistycznej charakterystyce Czepca jako przedstawiciela gromady chłopskiej.",
        "cke_tag": "Stylizacja • Dialektyzacja w Weselu",
        "instruction": "Przeczytaj fragment wypowiedzi Czepca z „Wesela” Stanisława Wyspiańskiego:\n\n„Cóż tam, panie, w polityce?\nChińcyki trzymają się mocno!?\n(...) Panowie duzo wiecie,\nwitoć tańcujecie, a my nie.”",
        "math_statement": "",
        "title": "Rodzaje stylizacji: archaizacja, dialektyzacja i kolokwializacja",
        "topic": "Dział 3: Stylistyka, środki językowe i rodzaje stylizacji",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-3-1-2",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Przeczytaj zdanie z „Potopu” Henryka Sienkiewicza:\n\n„A waść kto za jeden, że tak śmiało w oczy zacnym kawalerom poglądasz i szablą pobrzękujesz?”.\n\nKtóry zabieg stylistyczny dominuje w tym zdaniu?",
        "options": [
          {
            "id": "A",
            "text": "Archaizacja (użycie dawnych zaimków 'waść' i szyku zdań)",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Kolokwializacja (język współczesnych nastolatków)",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Stylizacja naukowa",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Wulgaryzacja języka",
            "is_correct": false
          }
        ],
        "explanation": "Sienkiewicz używa archaizmów ('waść', 'poglądasz'), aby przenieść czytelnika w realia XVII-wiecznej Rzeczypospolitej szlacheckiej.",
        "cke_tag": "Stylizacja • Archaizacja Sienkiewiczowska",
        "instruction": "Przeczytaj zdanie z „Potopu” Henryka Sienkiewicza:\n\n„A waść kto za jeden, że tak śmiało w oczy zacnym kawalerom poglądasz i szablą pobrzękujesz?”.\n\nKtóry zabieg stylistyczny dominuje w tym zdaniu?",
        "math_statement": "",
        "title": "Rodzaje stylizacji: archaizacja, dialektyzacja i kolokwializacja",
        "topic": "Dział 3: Stylistyka, środki językowe i rodzaje stylizacji",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-3-1-3",
        "type": "TRUE_FALSE",
        "tier": "B",
        "points": 1,
        "question": "Oceń prawdziwość stwierdzenia: „Zabieg stylizacji biblijnej charakteryzuje się m.in. częstym rozpoczynaniem zdań od spójnika 'I', paralelizmem składniowym, uroczystym tonem oraz stosowaniem inwersji”.",
        "options": [
          {
            "id": "A",
            "text": "Prawda",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Fałsz",
            "is_correct": false
          }
        ],
        "explanation": "Prawda. Są to klasyczne wyznaczniki stylu biblijnego, widoczne np. w 'Księgach narodu polskiego i pielgrzymstwa polskiego' Mickiewicza.",
        "cke_tag": "Stylizacja • Styl biblijny",
        "instruction": "Oceń prawdziwość stwierdzenia: „Zabieg stylizacji biblijnej charakteryzuje się m.in. częstym rozpoczynaniem zdań od spójnika 'I', paralelizmem składniowym, uroczystym tonem oraz stosowaniem inwersji”.",
        "math_statement": "",
        "title": "Rodzaje stylizacji: archaizacja, dialektyzacja i kolokwializacja",
        "topic": "Dział 3: Stylistyka, środki językowe i rodzaje stylizacji",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-4-1",
    "topic_id": "pol-dzial-4",
    "title": "Zasady CKE i kryteria oceniania notatki syntetyzującej",
    "theory_pill": {
      "concept_essence": "Notatka syntetyzująca to zwięzłe, rzeczowe przedstawienie wspólnego zagadnienia na podstawie dwóch tekstów nieliterackich. Musi liczyć od 60 do 90 słów, być uogólnieniem (a nie streszczeniem) i nie zawierać opinii własnych.",
      "key_points": [
        "Kryterium 1 (0–2 pkt): Treść i synteza – czy uczeń połączył oba teksty wokół zadanego tematu i dokonał uogólnienia?",
        "Kryterium 2 (0–1 pkt): Spójność – czy tekst stanowi logiczną całość (akapit) i zawiera stosowne spójniki?",
        "Kryterium 3 (0–1 pkt): Poprawność językowa, ortograficzna i interpunkcyjna.",
        "UWAGA: Poniżej 60 słów lub powyżej 90 słów egzaminator OBINA punkty za język/syntezę, a poniżej 30 słów praca otrzymuje 0 punktów!"
      ],
      "golden_rule": "Złota matryca zdania syntetyzującego: 'Obaj autorzy podejmują problem X. Podczas gdy [Autor 1] kładzie nacisk na [Aspekt A], [Autor 2] zwraca uwagę na [Aspekt B]. Wspólnym wnioskiem jest [Syntetyczny wniosek C]'.",
      "cke_trap": {
        "error": "Użycie sformułowań: 'Moim zdaniem', 'Uważam, że', 'W mojej opinii'.",
        "correct": "Pisz wyłącznie w 3. osobie ('Autorzy wskazują...', 'Teksty dowodzą...').",
        "description": "Za wprowadzenie opinii własnej w notatce syntetyzującej traci się punkty za rzeczowość!"
      }
    },
    "formulaSheet": {
      "title": "Leksykon CKE: Notatka syntetyzująca",
      "description": "Leksykon CKE i kluczowe pojPęcia",
      "formulas": [
        {
          "name": "Synteza",
          "formula": "Połączenie elementów z dwóch źródeł w spójną całość wyższego rzędu (uogólnienie).",
          "description": "Synteza"
        },
        {
          "name": "Parafraza",
          "formula": "Oddanie myśli autora własnymi słowami bez dosłownego cytowania.",
          "description": "Parafraza"
        },
        {
          "name": "Spójnik komparatywny",
          "formula": "Słowa łączące porównanie: 'podczas gdy', 'natomiast', 'z kolei', 'zarówno jak i'.",
          "description": "Spójnik komparatywny"
        }
      ],
      "goldenRule": "Notatka musi zmieścić się w 1 akapicie liczącym od 60 do 90 słów.",
      "ckeTrap": {
        "error": "Napisanie dwóch osobnych akapitów streszczających tekst 1 i tekst 2.",
        "correct": "Połącz myśli z obu tekstów w jedną logiczną całość.",
        "description": "Dwa osobne streszczenia to błąd gatunkowy – CKE obniża ocenę za brak syntezy."
      }
    },
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-4-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Jaki jest dopuszczalny limit słów w notatce syntetyzującej na maturze podstawowej z języka polskiego?",
        "options": [
          {
            "id": "A",
            "text": "60–90 wyrazów",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "100–150 wyrazów",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Dowolny, byle w jednym zdaniu",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Minimum 200 wyrazów",
            "is_correct": false
          }
        ],
        "explanation": "Zgodnie z wymogami CKE notatka syntetyzująca musi liczyć od 60 do 90 słów. Praca licząca mniej niż 60 lub więcej niż 90 słów jest penalizowana punktowo.",
        "cke_tag": "Notatka syntetyzująca • Limity CKE",
        "instruction": "Jaki jest dopuszczalny limit słów w notatce syntetyzującej na maturze podstawowej z języka polskiego?",
        "math_statement": "",
        "title": "Zasady CKE i kryteria oceniania notatki syntetyzującej",
        "topic": "Dział 4: Mistrz Notatki Syntetyzującej (CKE Masterclass)",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-4-1-2",
        "type": "CARDINAL_TRAP",
        "tier": "B",
        "points": 1,
        "question": "Wskaż zdanie, które NIE MOŻE znaleźć się w poprawnej notatce syntetyzującej:",
        "options": [
          {
            "id": "A",
            "text": "Autor pierwszego tekstu zwraca uwagę na zagrożenia wynikające z rozwoju sztucznej inteligencji.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Z kolei autorka drugiego tekstu postrzega technologię jako szansę na zniwelowanie barier edukacyjnych.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Moim zdaniem obaj autorzy przesadzają, ponieważ sam codziennie korzystam ze smartfona i nie widzę w tym nic złego.",
            "is_correct": true
          },
          {
            "id": "D",
            "text": "Wspólnym wnioskiem płynącym z obu artykułów jest konieczność zachowania umiaru i krytycyzmu.",
            "is_correct": false
          }
        ],
        "explanation": "Opcja C zawiera subiektywną opinię własną autora notatki ('Moim zdaniem', 'sam codziennie korzystam...'). Notatka syntetyzująca musi być wyłącznie obiektywnym uogólnieniem cudzych tekstów!",
        "cke_tag": "Notatka syntetyzująca • Błąd subiektywizmu",
        "instruction": "Wskaż zdanie, które NIE MOŻE znaleźć się w poprawnej notatce syntetyzującej:",
        "math_statement": "",
        "title": "Zasady CKE i kryteria oceniania notatki syntetyzującej",
        "topic": "Dział 4: Mistrz Notatki Syntetyzującej (CKE Masterclass)",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-4-1-3",
        "type": "SYNTHESIS_CLOZE",
        "tier": "B",
        "points": 1,
        "question": "Uzupełnij luki w zdaniu syntetyzującym odpowiednimi spójnikami logiki wypowiedzi:\n\n„[...] autor pierwszego tekstu skupia się na negatywnych skutkach turystyki masowej, [...] autorka drugiego tekstu dostrzega w podróżowaniu szansę na otwarcie na inną kulturę”.",
        "options": [
          {
            "id": "A",
            "text": "Podczas gdy ... o tyle",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Ponieważ ... dlatego",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Chociaż ... chociaż",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Ani ... ani",
            "is_correct": false
          }
        ],
        "explanation": "Zestawienie 'Podczas gdy ... o tyle' (lub 'o ile ... o tyle') to wzorcowa konstrukcja kontrastująca dwa stanowiska w notatce syntetyzującej.",
        "cke_tag": "Notatka syntetyzująca • Spójniki logiczne",
        "instruction": "Uzupełnij luki w zdaniu syntetyzującym odpowiednimi spójnikami logiki wypowiedzi:\n\n„[...] autor pierwszego tekstu skupia się na negatywnych skutkach turystyki masowej, [...] autorka drugiego tekstu dostrzega w podróżowaniu szansę na otwarcie na inną kulturę”.",
        "math_statement": "",
        "title": "Zasady CKE i kryteria oceniania notatki syntetyzującej",
        "topic": "Dział 4: Mistrz Notatki Syntetyzującej (CKE Masterclass)",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-4-1-4",
        "type": "SYNTHESIS_CONDENSER",
        "tier": "C",
        "points": 4,
        "question": "Na podstawie obu tekstów wyjaśnij, czym różni się podejście autorów do wpływu nowych technologii na język i relacje międzyludzkie. Twoja notatka syntetyzująca musi liczyć od 60 do 90 słów i łączyć oba teksty w logiczną całość bez subiektywnych ocen.",
        "cke_tag": "Notatka syntetyzująca • Symulator 4 pkt CKE",
        "synthesisData": {
          "topic": "Na podstawie obu tekstów wyjaśnij, czym różni się podejście autorów do wpływu nowoczesnych technologii na język i relacje międzyludzkie.",
          "sourceTexts": [
            {
              "id": "st-1",
              "author": "Prof. Jan Miodek",
              "workTitle": "Słowo w sieci",
              "excerpt": "Internet i komunikatory bez wątpienia zrewolucjonizowały polszczyznę. Z jednej strony obserwujemy skrótowość, zalew emotikonów i zanik dbałości o interpunkcję. Z drugiej jednak strony nigdy dotąd młodzi ludzie nie pisali tak wiele, jak obecnie. To nie jest upadek języka, lecz jego dynamiczna adaptacja do nowych warunków cyfrowej komunikacji."
            },
            {
              "id": "st-2",
              "author": "Dr hab. Anna Baran",
              "workTitle": "Ekranowe relacje",
              "excerpt": "Cyfrowa komunikacja, choć sprzyja natychmiastowej wymianie informacji, drastycznie spłyca relacje interpersonalne. Zamiast głębokiego dialogu twarzą w twarz otrzymujemy szybkie, powierzchowne komunikaty. Język staje się narzędziem czysto użytkowym, a zanika w nim funkcja poetycka i zdolność do wyrażania niuansów emocjonalnych."
            }
          ],
          "minWords": 60,
          "maxWords": 90,
          "availableElements": [
            {
              "id": "el-1",
              "text": "Autorzy obu tekstów podejmują problem transformacji komunikacji i języka pod wpływem nowoczesnych technologii cyfrowych.",
              "isKeySynthesis": true,
              "explanation": "Prawidłowe uogólnienie tematyczne wspólne dla obu autorów."
            },
            {
              "id": "el-2",
              "text": "Jan Miodek dostrzega w internetowej skrótowości naturalną ewolucję i wzmożoną aktywność piśmienniczą młodego pokolenia.",
              "isKeySynthesis": true,
              "explanation": "Rzetelne podsumowanie stanowiska pierwszego autora."
            },
            {
              "id": "el-3",
              "text": "Przeciwstawne stanowisko prezentuje Anna Baran, która wskazuje na spłycenie relacji interpersonalnych oraz redukcję języka do wymiaru czysto pragmatycznego.",
              "isKeySynthesis": true,
              "explanation": "Prawidłowe zestawienie z tezą drugiego tekstu (kontrast)."
            },
            {
              "id": "el-4",
              "text": "Podsumowując, oboje badacze dostrzegają fundamentalną zmianę obyczajów językowych, różniąc się jednak w ocenie jej kulturowych konsekwencji.",
              "isKeySynthesis": true,
              "explanation": "Syntetyczna puenta zamykająca wywód w wymaganym limicie 60–90 słów."
            },
            {
              "id": "el-5",
              "text": "Uważam osobiście, że rację ma pani Baran, bo sam zauważam, że moi koledzy z klasy nie potrafią już rozmawiać bez smartfona.",
              "isKeySynthesis": false,
              "isSubjectiveTrap": true,
              "explanation": "Pułapka CKE: Subiektywizm i opinia własna (0 pkt za treść wg kryteriów maturalnych)."
            },
            {
              "id": "el-6",
              "text": "Jan Miodek podaje także ciekawe przykłady błędów ortograficznych, które zauważa w pracach swoich studentów na Uniwersytecie Wrocławskim.",
              "isKeySynthesis": false,
              "isOneSided": true,
              "explanation": "Pułapka CKE: Dygresja dotycząca tylko jednego tekstu, niezwiązana z syntezą."
            }
          ],
          "ckeCriteria": {
            "contentPoints": 2,
            "cohesionPoints": 1,
            "languagePoints": 1
          }
        },
        "instruction": "Na podstawie obu tekstów wyjaśnij, czym różni się podejście autorów do wpływu nowych technologii na język i relacje międzyludzkie. Twoja notatka syntetyzująca musi liczyć od 60 do 90 słów i łączyć oba teksty w logiczną całość bez subiektywnych ocen.",
        "math_statement": "",
        "title": "Zasady CKE i kryteria oceniania notatki syntetyzującej",
        "topic": "Dział 4: Mistrz Notatki Syntetyzującej (CKE Masterclass)",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-5-1",
    "topic_id": "pol-dzial-5",
    "title": "Paszport Epoki: Antyk i Biblia – filozofie, toposy i ramy czasowe",
    "theory_pill": {
      "concept_essence": "Antyk grecko-rzymski i tradycja judeochrześcijańska (Biblia) to dwa filary kultury europejskiej. Z antyku czerpiemy pojęcie piękna, demokracji i tragizmu; z Biblii – porządek moralny, monoteizm i sens cierpienia.",
      "epoch_passport": {
        "dates_framework": {
          "antiquity": "Od narodzin piśmiennictwa (VIII w. p.n.e. – Homer) do upadku cesarstwa zachodniorzymskiego (476 r. n.e.).",
          "bible": "Stary Testament (XIII–I w. p.n.e.), Nowy Testament (I w. n.e.)."
        },
        "credo": "Antyk: 'Człowiek jest miarą wszechrzeczy' (Protagoras). Biblia: 'Będziesz miłował Pana Boga swego i bliźniego swego'.",
        "philosophy_trio": [
          {
            "name": "Stoicyzm (Zenon z Kition)",
            "essence": "Cnota, opanowanie emocji (apatheia), spokój ducha niezależnie od losu."
          },
          {
            "name": "Epikureizm (Epikur)",
            "essence": "Czerpanie radości z życia (carpe diem), brak cierpienia, zaspokajanie podstawowych potrzeb."
          },
          {
            "name": "Platonizm (Platon)",
            "essence": "Dualizm świata: świat materialny to tylko cień doskonałego świata idei."
          }
        ],
        "flagship_topoi": [
          "Homo viator (człowiek wędrowiec przemierzający życie jak Odyseusz)",
          "Theatrum mundi (świat jako teatr, ludzie jako marionetki losu)",
          "Vanitas (marność nad marnościami – z Księgi Koheleta)",
          "Arkadia (kraina wiecznej szczęśliwości i harmonii z naturą)"
        ]
      },
      "golden_rule": "Gdy odwołujesz się do antyku na wypracowaniu, zawsze precyzuj nurt filozoficzny (np. 'stoicki spokój bohatera') lub topos (np. 'topos homo viator'). To gwarantuje punkty za kontekst!",
      "cke_trap": {
        "error": "Mylenie epikureizmu z bezmyślnym hedonizmem i uganianiem się za luksusem.",
        "correct": "Epikureizm to radość z prostego życia i spokoju ('chleba i wody, a z bogami będę konkurował'), a nie niepohamowana konsumpcja.",
        "description": "Częsty błąd pojęciowy w pracach maturalnych."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-5-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Przyporządkuj postawę życiową i szkołę filozoficzną do sentencji Horacego 'Carpe diem':",
        "part_1": {
          "prompt": "Szkoła filozoficzna, z której wyrasta sentencja 'Carpe diem', to:",
          "options": [
            {
              "id": "A",
              "text": "Epikureizm"
            },
            {
              "id": "B",
              "text": "Stoicyzm"
            },
            {
              "id": "C",
              "text": "Cynizm"
            }
          ]
        },
        "part_2": {
          "prompt": "Jak należy właściwie rozumieć to hasło w kontekście antycznym?",
          "options": [
            {
              "id": "1",
              "text": "Jako świadome chwytanie dnia i docenianie chwili w poczuciu ulotności czasu"
            },
            {
              "id": "2",
              "text": "Jako nakaz rezygnacji ze wszystkich ziemskich dóbr"
            },
            {
              "id": "3",
              "text": "Jako obojętność wobec cierpienia i bólu"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Carpe diem (chwytaj dzień) to kluczowe hasło epikureizmu, wzywające do doceniania teraźniejszości w obliczu nieuchronnego przemijania.",
        "cke_tag": "Antyk • Epikureizm i stoicyzm",
        "instruction": "Przyporządkuj postawę życiową i szkołę filozoficzną do sentencji Horacego 'Carpe diem':",
        "math_statement": "",
        "title": "Paszport Epoki: Antyk i Biblia – filozofie, toposy i ramy czasowe",
        "topic": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-5-1-2",
        "type": "MATCHING",
        "tier": "B",
        "points": 1,
        "question": "Dopasuj topos biblijno-antyczny do jego kulturowego znaczenia:",
        "pairs": [
          {
            "concept": "Homo viator",
            "definition": "Motyw człowieka pielgrzyma, którego życie jest nieustanną wędrówką i dojrzewaniem"
          },
          {
            "concept": "Vanitas",
            "definition": "Motyw przemijania, ulotności ziemskich zaszczytów i dóbr materialnych"
          },
          {
            "concept": "Theatrum mundi",
            "definition": "Przekonanie, że życie ludzkie jest przedstawieniem, a człowiek aktorem sterowanym przez wyższe siły"
          }
        ],
        "explanation": "To fundamentalne toposy maturalne, do których uczniowie odwołują się w rozprawkach.",
        "cke_tag": "Toposy • Antyk i Biblia",
        "instruction": "Dopasuj topos biblijno-antyczny do jego kulturowego znaczenia:",
        "math_statement": "",
        "title": "Paszport Epoki: Antyk i Biblia – filozofie, toposy i ramy czasowe",
        "topic": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-5-2",
    "topic_id": "pol-dzial-5",
    "title": "Sofokles: Antygona – istota konfliktu tragicznego i fatum",
    "theory_pill": {
      "concept_essence": "Tragedia antyczna opiera się na konflikcie tragicznym – starciu dwóch równorzędnych racji, gdzie każdy wybór bohatera prowadzi do nieuchronnej katastrofy z powodu fatum (przeznaczenia).",
      "key_points": [
        "Antygona: reprezentuje prawo boskie, miłość braterską, odwieczne tradycje pochówku i wierność sumieniu.",
        "Kreon: reprezentuje prawo ludzkie (państwowe), autorytet władcy, porządek prawny i rację stanu (Polinejkes był zdrajcą ojczyzny).",
        "Wina tragiczna (hamartia): błędne rozpoznanie sytuacji przez bohatera, który działając w dobrej wierze ściąga na siebie zgubę.",
        "Pycha (hybris): zuchwałość Kreona, który postawił rozkaz ludzki ponad prawa bogów."
      ],
      "golden_rule": "Kreon NIE JEST bezmyślnym tyranem, a Antygona nie jest buntowniczką bez powodu. Oboje mają swoje racje! Istotą tragedii jest to, że racje państwowe zderzają się z prawem boskim.",
      "cke_trap": {
        "error": "Twierdzenie, że Polinejkes i Eteokles zginęli w walce o serce Antygony.",
        "correct": "Byli jej braćmi i zginęli w pojedynku w bratobójczej walce o tron Teb.",
        "description": "Kardynalna pomyłka w relacjach rodzinnych w rodzie Labdakidów!"
      }
    },
    "formulaSheet": {
      "title": "Leksykon CKE: Sofokles – Antygona",
      "description": "Leksykon CKE i kluczowe pojPęcia",
      "formulas": [
        {
          "name": "Konflikt tragiczny",
          "formula": "Zderzenie dwóch przeciwstawnych, równorzędnych racji moralnych lub prawnych.",
          "description": "Konflikt tragiczny"
        },
        {
          "name": "Fatum",
          "formula": "Nieodwracalne przeznaczenie ciążące nad jednostką (klątwa rodu Labdakidów).",
          "description": "Fatum"
        },
        {
          "name": "Katharsis",
          "formula": "Oczyszczenie emocjonalne widza przez wzbudzenie litości i trwogi.",
          "description": "Katharsis"
        },
        {
          "name": "Hybris",
          "formula": "Pycha bohatera wynikająca z wiary, że może przeciwstawić się bogom lub przeznaczeniu.",
          "description": "Hybris"
        }
      ],
      "goldenRule": "Odwołując się do Antygony na wypracowaniu o wyborach moralnych, zawsze użyj pojęcia 'konflikt tragiczny'.",
      "ckeTrap": {
        "error": "Mylenie Antygony z Ismeną.",
        "correct": "Antygona była bezkompromisowa i pochowała brata; Ismena lękała się złamania prawa króla.",
        "description": "Ismena początkowo odmówiła pomocy siostrze ze strachu przed karą śmierci."
      }
    },
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-5-2-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Na czym polega istota konfliktu tragicznego w „Antygonie” Sofoklesa?",
        "options": [
          {
            "id": "A",
            "text": "Na zderzeniu prawa boskiego (reprezentowanego przez Antygonę) z prawem ludzkim i racją stanu (reprezentowaną przez Kreona)",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Na kłótni majątkowej między spadkobiercami rodu Labdakidów",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Na rywalizacji Antygony i Ismeny o względy Hajmona",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Na buncie niewolników przeciwko królowi Teb",
            "is_correct": false
          }
        ],
        "explanation": "Istotą tragedii jest niemożliwy do pogodzenia konflikt racji moralno-religijnych (obowiązek pochówku brata) z racjami państwowymi (kara za zdradę ojczyzny).",
        "cke_tag": "Antygona • Konflikt tragiczny",
        "instruction": "Na czym polega istota konfliktu tragicznego w „Antygonie” Sofoklesa?",
        "math_statement": "",
        "title": "Sofokles: Antygona – istota konfliktu tragicznego i fatum",
        "topic": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-5-2-2",
        "type": "CARDINAL_TRAP",
        "tier": "B",
        "points": 1,
        "question": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący fabuły „Antygony”:",
        "options": [
          {
            "id": "A",
            "text": "Kreon skazał Antygonę na zamurowanie żywcem w grobowcu.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Hajmon był synem Kreona i narzeczonym Antygony.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Kreon po wysłuchaniu wróżbity Tyrezjasza nakazał natychmiastowe stracenie Ismeny.",
            "is_correct": true
          },
          {
            "id": "D",
            "text": "Eurydyka, żona Kreona, popełniła samobójstwo po wieści o śmierci syna.",
            "is_correct": false
          }
        ],
        "explanation": "Zdanie C zawiera błąd. Kreon pod wpływem Tyrezjasza i przestrogi chóru postanowił uwolnić Antygonę i pochować Polinejkesa. Ismena nie została skazana na śmierć.",
        "cke_tag": "Błąd kardynalny • Antygona fabuła",
        "instruction": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący fabuły „Antygony”:",
        "math_statement": "",
        "title": "Sofokles: Antygona – istota konfliktu tragicznego i fatum",
        "topic": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-5-3",
    "topic_id": "pol-dzial-5",
    "title": "Biblia: Księga Hioba i Apokalipsa św. Jana – cierpienie i eschatologia",
    "theory_pill": {
      "concept_essence": "Księga Hioba redefiniuje sens ludzkiego cierpienia (teodycea – cierpienie niezawinione będące próbą wiary, a nie karą za grzechy). Apokalipsa św. Jana przynosi wizję końca świata, Sądu Ostatecznego i ostatecznego zwycięstwa dobra.",
      "key_points": [
        "Hiob: archetyp cierpiącego sprawiedliwego, próba wiary, niezbadane wyroki Boże ('Pan dał, Pan wziął, niech imię Pańskie będzie błogosławione').",
        "Kohelet: marność świata ('Vanitas vanitatum et omnia vanitas'), wszystko ma swój wyznaczony czas pod słońcem.",
        "Apokalipsa: symbolika liczb (4 jeźdźców, 7 pieczęci i trąb, 12 pokoleń, 666 – liczba Bestii), Baranek, Nowe Jeruzalem."
      ],
      "golden_rule": "Hiob jest zaprzeczeniem teorii retrybucji (przekonania, że cierpienie jest ZAWSZE karą za grzechy). Hiob był niewinny, a jego cierpienie miało charakter próby i tajemnicy.",
      "cke_trap": {
        "error": "Uznanie, że Hiob w swoim cierpieniu wyparł się Boga i przeklął Go.",
        "correct": "Hiob zadawał pytania i przeklął dzień swoich narodzin, ale NIGDY nie wyparł się Boga ani nie zwątpił w Jego istnienie.",
        "description": "Kluczowy detal teologiczny i literacki często weryfikowany w CKE."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-5-3-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Jaki jest główny sens problemu teodycei podjętego w biblijnej „Księdze Hioba”?",
        "options": [
          {
            "id": "A",
            "text": "Pytanie o to, dlaczego dobry i wszechmocny Bóg dopuszcza cierpienie niewinnych ludzi",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Opis wojen prowadzonych przez naród wybrany w Ziemi Obiecanej",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Przestroga przed lenistwem i marnotrawieniem talentów",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Instrukcja budowy świątyni jerozolimskiej",
            "is_correct": false
          }
        ],
        "explanation": "Teodycea to zagadnienie usprawiedliwienia Bożej sprawiedliwości w obliczu istnienia zła i cierpienia niezawinionego na świecie.",
        "cke_tag": "Biblia • Księga Hioba teodycea",
        "instruction": "Jaki jest główny sens problemu teodycei podjętego w biblijnej „Księdze Hioba”?",
        "math_statement": "",
        "title": "Biblia: Księga Hioba i Apokalipsa św. Jana – cierpienie i eschatologia",
        "topic": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-5-3-2",
        "type": "TWO_PART",
        "tier": "B",
        "points": 1,
        "question": "Zinterpretuj symbolikę Czterech Jeźdźców Apokalipsy z wizji św. Jana:",
        "part_1": {
          "prompt": "Co symbolizują Jeźdźcy Apokalipsy pojawiający się po złamaniu kolejnych pieczęci?",
          "options": [
            {
              "id": "A",
              "text": "Katastrofy nękające ludzkość: wojnę, zarazę/zwycięstwo, głód i śmierć"
            },
            {
              "id": "B",
              "text": "Cztery pory roku w kalendarzu żydowskim"
            },
            {
              "id": "C",
              "text": "Czterech ewangelistów Nowego Testamentu"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaki jest ostateczny sens przesłania Apokalipsy św. Jana dla wierzących?",
          "options": [
            {
              "id": "1",
              "text": "Pocieszenie i nadzieja na ostateczne zwycięstwo Boga nad złem i triumf Nowego Jeruzalem"
            },
            {
              "id": "2",
              "text": "Beznadziejna zagłada całej ludzkości bez możliwości ratunku"
            },
            {
              "id": "3",
              "text": "Konieczność ucieczki z miast i życia w odosobnieniu"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Apokalipsa nie jest księgą grozy, lecz księgą nadziei (parakletyczną) – zapowiada upadek Babilonu i panowanie sprawiedliwości Bożej.",
        "cke_tag": "Biblia • Apokalipsa symbolika",
        "instruction": "Zinterpretuj symbolikę Czterech Jeźdźców Apokalipsy z wizji św. Jana:",
        "math_statement": "",
        "title": "Biblia: Księga Hioba i Apokalipsa św. Jana – cierpienie i eschatologia",
        "topic": "Dział 5: Antyk i Biblia – Źródła tożsamości europejskiej",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-6-1",
    "topic_id": "pol-dzial-6",
    "title": "Paszport Epoki: Średniowiecze – teocentryzm, uniwersalizm i ramy czasowe",
    "theory_pill": {
      "concept_essence": "Średniowiecze (ok. V–XV w.) to najdłuższa epoka w historii kultury, zdominowana przez teocentryzm (Bóg w centrum wszechświata) oraz uniwersalizm (wspólny język łaciński, wiara chrześcijańska i zwierzchnictwo papieża oraz cesarza).",
      "epoch_passport": {
        "dates_framework": {
          "europe": "476 r. (upadek Rzymu) – 1453 r. (upadek Konstantynopola) / 1492 r. (odkrycie Ameryki).",
          "poland": "966 r. (chrzest Polski) – koniec XV wieku."
        },
        "credo": "Ad maiorem Dei gloriam (Na większą chwałę Bożą) / Memento mori (Pamiętaj o śmierci).",
        "archetypes": [
          "Władca idealny (sprawiedliwy, waleczny, pobożny – np. Bolesław Chrobry w kronice Galla Anonima, Karol Wielki).",
          "Rycerz bez skazy (honor, wierność seniorowi i Bogu, obrona wiary i damy serca – Roland).",
          "Święty asceta (dobrowolne wyrzeczenie się dóbr, umartwianie ciała w imię zbawienia duszy – św. Aleksy)."
        ],
        "flagship_motifs": [
          "Deesis (motyw pośrednictwa: Chrystus, Matka Boska i Jan Chrzciciel)",
          "Danse macabre (taniec śmierci – równość wszystkich stanów wobec zgonu)",
          "Stabat Mater Dolorosa (Matka Boska stojąca pod krzyżem, cierpiąca matka)"
        ]
      },
      "golden_rule": "W literaturze średniowiecznej autor często pozostaje anonimowy, ponieważ tworzy nie dla własnej chwały, lecz 'ad maiorem Dei gloriam'.",
      "cke_trap": {
        "error": "Twierdzenie, że średniowiecze to 'wieki ciemne' pozbawione osiągnięć naukowych.",
        "correct": "W średniowieczu powstały uniwersytety (Bolonia, Paryż, Kraków 1364), wspaniałe katedry gotyckie i fundamenty europejskiego prawa.",
        "description": "CKE docenia obiektywne zrozumienie kulturowego bogactwa epoki."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-6-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Które z pojęć najlepiej oddaje naczelną zasadę światopoglądową średniowiecza, według której wszelkie sprawy ludzkie podporządkowane są Bogu?",
        "options": [
          {
            "id": "A",
            "text": "Teocentryzm",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Antropocentryzm",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Scjentyzm",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Racjonalizm",
            "is_correct": false
          }
        ],
        "explanation": "Teocentryzm (z gr. theos – Bóg) to pogląd stawiający Boga w centrum zainteresowania człowieka, nauki i sztuki średniowiecznej.",
        "cke_tag": "Średniowiecze • Teocentryzm",
        "instruction": "Które z pojęć najlepiej oddaje naczelną zasadę światopoglądową średniowiecza, według której wszelkie sprawy ludzkie podporządkowane są Bogu?",
        "math_statement": "",
        "title": "Paszport Epoki: Średniowiecze – teocentryzm, uniwersalizm i ramy czasowe",
        "topic": "Dział 6: Średniowiecze – Bogurodzica, sacrum i etos rycerski",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-6-1-2",
        "type": "MATCHING",
        "tier": "B",
        "points": 1,
        "question": "Przyporządkuj średniowieczny wzorzec osobowy do odpowiadającego mu bohatera literackiego:",
        "pairs": [
          {
            "concept": "Wzorzec świętego ascety",
            "definition": "Święty Aleksy (dobrowolne żebractwo i cierpienie pod schodami własnego domu)"
          },
          {
            "concept": "Wzorzec idealnego rycerza",
            "definition": "Hrabia Roland (wierność Bogu, królowi Karolowi i troska o honor ojczyzny)"
          },
          {
            "concept": "Wzorzec idealnego władcy",
            "definition": "Bolesław Chrobry z Kroniki Galla Anonima (mądry, sprawiedliwy i waleczny monarcha)"
          }
        ],
        "explanation": "Literatura parenetyczna średniowiecza tworzyła idealne wzorce do naśladowania dla każdego ze stanów.",
        "cke_tag": "Średniowiecze • Pareneza",
        "instruction": "Przyporządkuj średniowieczny wzorzec osobowy do odpowiadającego mu bohatera literackiego:",
        "math_statement": "",
        "title": "Paszport Epoki: Średniowiecze – teocentryzm, uniwersalizm i ramy czasowe",
        "topic": "Dział 6: Średniowiecze – Bogurodzica, sacrum i etos rycerski",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-6-2",
    "topic_id": "pol-dzial-6",
    "title": "Bogurodzica i Lament świętokrzyski – teologia i humanizacja sacrum",
    "theory_pill": {
      "concept_essence": "Bogurodzica to najstarszy polski hymn religijny (z motywem deesis). Lament świętokrzyski (Posłuchajcie, bracia miła...) to arcydzieło liryki żałobnej ukazujące cierpienie Matki Boskiej pod krzyżem w wymiarze czysto ludzkim.",
      "key_points": [
        "Bogurodzica: modlitwa zbiorowa o godne życie na ziemi i zbawienie wieczne. Motyw Deesis: prośba zanoszona do Chrystusa za wstawiennictwem Maryi i Jana Chrzciciela.",
        "Archaizmy w Bogurodzicy: leksykalne (bogurodzica, dziela, zbożny), fonetyczne (Krzciciela), fleksyjne (zwolena, spuści).",
        "Lament świętokrzyski: motyw stabat mater dolorosa. Maryja mówi nie jako Królowa Niebios, lecz jako bezradna, rozpaczająca ziemska matka patrząca na katusze Syna."
      ],
      "golden_rule": "Na maturze często zestawia się obraz Maryi w 'Bogurodzicy' (majestatyczna Pośredniczka, ikona sacrum) z 'Lamentem świętokrzyskim' (cierpiąca, ziemska kobieta z krwi i kości).",
      "cke_trap": {
        "error": "Twierdzenie, że 'Bogurodzica' powstała w XIX wieku z okazji bitwy pod Grunwaldem.",
        "correct": "Hymn powstał w XIII/XIV wieku, a pod Grunwaldem (1410) był śpiewany jako pieśń bojowa rycerstwa polskiego.",
        "description": "Błąd chronologiczny i historyczny."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-6-2-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj kompozycję i motyw przewodni „Bogurodzicy”:",
        "part_1": {
          "prompt": "Na czym polega motyw 'Deesis' zrealizowany w dwóch pierwszych strofach 'Bogurodzicy'?",
          "options": [
            {
              "id": "A",
              "text": "Na pośrednictwie Matki Bożej i Jana Chrzciciela w zanoszeniu ludzkich próśb do Chrystusa"
            },
            {
              "id": "B",
              "text": "Na opisie tańca śmierci pustoszącego średniowieczne miasta"
            },
            {
              "id": "C",
              "text": "Na pożegnaniu rycerza wyruszającego na krucjatę"
            }
          ]
        },
        "part_2": {
          "prompt": "O co proszą wierni w drugiej strofie utworu?",
          "options": [
            {
              "id": "1",
              "text": "O dostatnie i pobożne życie na ziemi oraz życie wieczne w niebie po śmierci"
            },
            {
              "id": "2",
              "text": "O militarne zwycięstwo nad wojskami zakonu krzyżackiego"
            },
            {
              "id": "3",
              "text": "O bogactwa materialne i obfite plony"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Deesis (z gr. modlitwa wstawiennicza) przedstawia Chrystusa jako Sędziego, do którego ludzie zwracają się przez najgodniejszych orędowników: Maryję i Jana Chrzciciela.",
        "cke_tag": "Bogurodzica • Motyw Deesis",
        "instruction": "Zanalizuj kompozycję i motyw przewodni „Bogurodzicy”:",
        "math_statement": "",
        "title": "Bogurodzica i Lament świętokrzyski – teologia i humanizacja sacrum",
        "topic": "Dział 6: Średniowiecze – Bogurodzica, sacrum i etos rycerski",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-6-2-2",
        "type": "SINGLE_CHOICE",
        "tier": "B",
        "points": 1,
        "question": "Na czym polega nowatorstwo wizerunku Matki Boskiej w „Lamencie świętokrzyskim”?",
        "options": [
          {
            "id": "A",
            "text": "Została ukazana jako zwykła, cierpiąca matka, która pragnie ulżyć swojemu umierającemu dziecku (humanizacja postaci)",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Przedstawiono ją jako groźną wojowniczkę karzącą oprawców Jezusa",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Ukazano ją wyłącznie w otoczeniu chórów anielskich w złotej koronie",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Przemawia językiem łacińskim jako monarchini Kościoła",
            "is_correct": false
          }
        ],
        "explanation": "W 'Lamencie świętokrzyskim' następuje niezwykła humanizacja sacrum – Maryja dzieli się matczynym bólem ze wszystkimi ludźmi ('Posłuchajcie, bracia miła...').",
        "cke_tag": "Lament świętokrzyski • Humanizacja sacrum",
        "instruction": "Na czym polega nowatorstwo wizerunku Matki Boskiej w „Lamencie świętokrzyskim”?",
        "math_statement": "",
        "title": "Bogurodzica i Lament świętokrzyski – teologia i humanizacja sacrum",
        "topic": "Dział 6: Średniowiecze – Bogurodzica, sacrum i etos rycerski",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-7-1",
    "topic_id": "pol-dzial-7",
    "title": "Paszport Epoki: Renesans – humanizm, antropocentryzm i ramy czasowe",
    "theory_pill": {
      "concept_essence": "Renesans (Odrodzenie, XIV/XV–XVI w.) postawił w centrum człowieka (antropocentryzm) i odrodził kulturę antyczną. Głównym prądem stał się humanizm ('Człowiekiem jestem i nic, co ludzkie, nie jest mi obce').",
      "epoch_passport": {
        "dates_framework": {
          "europe": "XIV w. (Włochy – Petrarca, Boccaccio) do końca XVI w.",
          "poland": "Koniec XV w. do przełomu XVI/XVII w. (tzw. złoty wiek kultury polskiej)."
        },
        "credo": "Homo sum, humani nihil a me alienum puto (Terencjusz) / Deus artifex (Bóg jako najwyższy artysta i architekt wszechświata).",
        "philosophy_trio": [
          {
            "name": "Stoicyzm",
            "essence": "Zachowanie cnoty i równowagi emocjonalnej w szczęściu i nieszczęściu."
          },
          {
            "name": "Epikureizm",
            "essence": "Radość z uroków życia ziemskiego, biesiady i przyjaźni."
          },
          {
            "name": "Humanizm renesansowy",
            "essence": "Wiara w możliwości ludzkiego rozumu, wszechstronny rozwój talentów (homo universalis)."
          }
        ]
      },
      "golden_rule": "Kochanowski łączył w swojej twórczości stoicyzm z epikureizmem (tzw. synteza horacjańska) – ciesz się chwilą, ale miej stałe serce na wypadek nieszczęścia.",
      "cke_trap": {
        "error": "Twierdzenie, że renesans odrzucił Boga.",
        "correct": "Renesans nie był ateistyczny! Bóg był postrzegany jako miłościwy Stwórca harmonijnego świata (np. hymn 'Czego chcesz od nas, Panie').",
        "description": "Zastąpiono surowego sędziego ze średniowiecza dobrotliwym Architektem."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-7-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "W jaki sposób Bóg jest przedstawiony w hymnie Jana Kochanowskiego „Czego chcesz od nas, Panie, za Twe hojne dary?”?",
        "options": [
          {
            "id": "A",
            "text": "Jako wielki Artysta (Deus artifex), szczodry Dawca i stwórca harmonijnego kosmosu",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Jako groźny i mściwy Sędzia karzący za każdy grzech potępieniem wiecznym",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Jako obojętna siła kosmiczna nieingerująca w losy ziemi",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Jako władca wymagający krwawych ofiar ze zwierząt",
            "is_correct": false
          }
        ],
        "explanation": "Hymn 'Czego chcesz od nas, Panie' to manifest renesansowego deizmu i zachwytu nad ładem przyrody stworzonej przez kochającego Boga-Artystę.",
        "cke_tag": "Kochanowski • Hymn Deus artifex",
        "instruction": "W jaki sposób Bóg jest przedstawiony w hymnie Jana Kochanowskiego „Czego chcesz od nas, Panie, za Twe hojne dary?”?",
        "math_statement": "",
        "title": "Paszport Epoki: Renesans – humanizm, antropocentryzm i ramy czasowe",
        "topic": "Dział 7: Renesans – Jan Kochanowski i harmonia świata",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-7-2",
    "topic_id": "pol-dzial-7",
    "title": "Jan Kochanowski: Treny – dramat ojca i kryzys światopoglądowy mędrca",
    "theory_pill": {
      "concept_essence": "Cykl 19 Trenów to zapis osobistej tragedii po śmierci 2,5-letniej córki Urszulki oraz głębokiego kryzysu renesansowej filozofii stoickiej, zwieńczony odbudową wiary w Trenie XIX (Sen).",
      "key_points": [
        "Etapy cyklu: Treny I–VIII (narastający żal, idealizacja zmarłej Urszulki), Treny IX–XI (punkt kulminacyjny: załamanie stoicyzmu, zwątpienie w cnotę w Trenie XI: 'Fraszka cnota!'), Treny XVI–XVIII (stopniowe uspokojenie), Tren XIX (ukazanie się matki z Urszulką na ręku i przestroga: 'Ludzkie przygody po ludzku znoś').",
        "Przełom w gatunku: treny w antyku pisano dla królów, wodzów i bohaterów – Kochanowski jako pierwszy w Europie poświęcił cykl trenologiczny małemu dziecku."
      ],
      "golden_rule": "Gdy piszesz o Trenach, pamiętaj o przesłaniu Trenu XIX: 'Ludzkie przygody ludzku noś' – oznacza to, że cierpienie jest częścią ludzkiej kondycji, a mędrzec ma prawo do łez.",
      "cke_trap": {
        "error": "Twierdzenie, że Urszulka była dorosłą córką Kochanowskiego.",
        "correct": "Urszulka zmarła w wieku około dwóch i pół roku, a poeta widział w niej swoją następczynię (nazywał ją 'Safoną słowieńską').",
        "description": "Błąd rzeczowy w faktach biograficznych."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-7-2-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj kryzys filozoficzny poety w „Trenie IX” i „Trenie XI”:",
        "part_1": {
          "prompt": "W co zwątpił Jan Kochanowski pod wpływem nagłej śmierci dziecka?",
          "options": [
            {
              "id": "A",
              "text": "W stoicką Mądrość i Cnotę, które miały chronić człowieka przed rozpaczą"
            },
            {
              "id": "B",
              "text": "W swój talent poetycki i znajomość języka łacińskiego"
            },
            {
              "id": "C",
              "text": "W sens prowadzenia gospodarstwa w Czarnolesie"
            }
          ]
        },
        "part_2": {
          "prompt": "Jakie słowa podsumowują ten kryzys w Trenie XI?",
          "options": [
            {
              "id": "1",
              "text": "„Fraszka cnota! – powiada z Ochotna Brutus...”"
            },
            {
              "id": "2",
              "text": "„Serce roście, patrząc na te czasy...”"
            },
            {
              "id": "3",
              "text": "„Nie porzucaj nadzieje, jakoć sie kolwiek dzieje...”"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "W Trenach IX i XI Kochanowski konstatuje, że wieloletnie studia filozoficzne nie uchroniły go przed bólem: okazał się zwykłym, cierpiącym ojcem zrzuconym ze stopni mądrości.",
        "cke_tag": "Kochanowski • Kryzys w Trenach",
        "instruction": "Zanalizuj kryzys filozoficzny poety w „Trenie IX” i „Trenie XI”:",
        "math_statement": "",
        "title": "Jan Kochanowski: Treny – dramat ojca i kryzys światopoglądowy mędrca",
        "topic": "Dział 7: Renesans – Jan Kochanowski i harmonia świata",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-8-1",
    "topic_id": "pol-dzial-8",
    "title": "Paszport Epoki: Barok i Oświecenie – sprzeczności i wiek rozumu",
    "theory_pill": {
      "concept_essence": "Barok (XVII w.) to epoka niepokoju metafizycznego, rozdarcia człowieka między ciałem a duszą oraz kunsztownego konceptyzmu. Oświecenie (XVIII w.) odrzuciło mistycyzm na rzecz czystego rozumu (racjonalizm), empiryzmu i dydaktycznej naprawy państwa.",
      "epoch_passport": {
        "dates_framework": {
          "baroque": "Od końca XVI w. do połowy XVIII w. (w Polsce okres wojen i sarmatyzmu).",
          "enlightenment": "Od połowy XVIII w. (w Polsce czasy stanisławowskie 1764–1795) do 1822 r."
        },
        "credo": "Barok: 'I nie miłować ciężko, i miłować nędzna pociecha' (Sęp Szarzyński). Oświecenie: 'Sapere aude – miej odwagę być mądrym' (Kant).",
        "philosophy_trio": [
          {
            "name": "Konceptyzm barokowy",
            "essence": "Zadziwienie czytelnika zaskakującym pomysłem (konceptem), paradoksem i antytezą."
          },
          {
            "name": "Racjonalizm oświeceniowy (Kartezjusz)",
            "essence": "Rozum jako jedyne pewne źródło poznania prawdy ('Myślę, więc jestem')."
          },
          {
            "name": "Dydaktyzm oświeceniowy",
            "essence": "Sztuka powinna uczyć bawiąc ('Uczyć, bawiąc' – Krasicki)."
          }
        ]
      },
      "golden_rule": "Satyra i bajka w oświeceniu NIGDY nie służyły czystej rozrywce – ich celem była zawsze bezwzględna krytyka ludzkiej głupoty i naprawa Rzeczypospolitej.",
      "cke_trap": {
        "error": "Mylenie Mikołaja Sępa Szarzyńskiego (barok) z Janem Kochanowskim (renesans).",
        "correct": "Sęp Szarzyński to prekursor baroku – u niego świat nie jest harmonijny, lecz pełen pokus i grzechu, a człowiek jest 'wątły, niebaczny, rozdwojony w sobie'.",
        "description": "Kluczowe rozróżnienie w poezji religijnej."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-8-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Porównaj koncepcję człowieka w poezji renesansu i baroku:",
        "part_1": {
          "prompt": "Jak barokowy poeta Mikołaj Sęp Szarzyński określa kondycję człowieka w 'Sonecie IV'?",
          "options": [
            {
              "id": "A",
              "text": "Jako istotę 'rozdwojoną w sobie', toczącą nieustanny bój z ciałem, światem i szatanem"
            },
            {
              "id": "B",
              "text": "Jako szczęśliwego gospodarza żyjącego w harmonii z przyrodą"
            },
            {
              "id": "C",
              "text": "Jako dumnego zdobywcę panującego nad prawami natury"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaki topos wyraża ten sonet?",
          "options": [
            {
              "id": "1",
              "text": "Topos 'militia Christiana' (życie ludzkie jako nieustanna walka duchowa)"
            },
            {
              "id": "2",
              "text": "Topos arkadyjski"
            },
            {
              "id": "3",
              "text": "Topos 'deus artifex'"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Sęp Szarzyński widzi życie jako bój bojowanie na ziemi (militia Christiana) z rozdarciem między ziemskimi pokusami a tęsknotą za Bogiem.",
        "cke_tag": "Barok • Sęp Szarzyński militia Christiana",
        "instruction": "Porównaj koncepcję człowieka w poezji renesansu i baroku:",
        "math_statement": "",
        "title": "Paszport Epoki: Barok i Oświecenie – sprzeczności i wiek rozumu",
        "topic": "Dział 8: Barok i Oświecenie – Kontrasty, koncept i rozum",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-8-2",
    "topic_id": "pol-dzial-8",
    "title": "Ignacy Krasicki: Bajki i Satyry – dydaktyzm i krytyka sarmatyzmu",
    "theory_pill": {
      "concept_essence": "Ignacy Krasicki (Książę Biskup Warmiński) wykorzystał zwięzłą bajkę zwierzęcą i satyrę do demaskowania obłudy, pijaństwa, bezmyślnego naśladowania obcej mody oraz ułomności natury ludzkiej.",
      "key_points": [
        "Bajki: alegoryczne opowiastki ze zwierzętami uosabiającymi stałe cechy (lis – chytrość, wilk – bezwzględna siła, jagnię – bezbronna ofiara). Pesymistyczny wniosek: światem rządzi prawo silniejszego ('Jagnię i wilcy').",
        "Satyry: 'Pijaństwo' (tragikomizm nałogu, usprawiedliwianie picia tradycją i polityką), 'Do króla' (pozorny atak na Stanisława Augusta Poniatowskiego, w rzeczywistości obnażenie zacofania szlachty sarmackiej), 'Żona modna' (krytyka bezmyślnej frankomanii)."
      ],
      "golden_rule": "W satyrze 'Do króla' Krasicki stosuje genialną ironię: oskarżenia rzucane na króla (że jest młody, mądry, wykształcony i jest Polakiem) to w istocie najwyższe pochwały monarchy i kompromitacja szlacheckich zarzutów!",
      "cke_trap": {
        "error": "Dosłowne odczytanie satyry 'Do króla' jako krytyki Stanisława Augusta.",
        "correct": "To satyra na ciemnotę i konserwatyzm szlachty sarmackiej, która miała za złe monarsze, że ceni naukę i książki.",
        "description": "Zrozumienie techniki ironicznej jest kluczowe w zadaniach maturalnych."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-8-2-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Jaki mechanizm obnaża Ignacy Krasicki w bajce „Jagnię i wilcy” (w której wilki pożerają jagnię, mówiąc: 'Smacznyś, słaby i w lesie!')?",
        "options": [
          {
            "id": "A",
            "text": "Okrutne prawo siły, w którym sprawiedliwość i prawo są bezradne wobec bezwzględnego drapieżnika",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Pochwałę sprytu słabszych zwierząt unikających zagrożenia",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Zalecenie wegetarianizmu dla ludzi epoki oświecenia",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Konieczność grodzenia lasów przez leśników",
            "is_correct": false
          }
        ],
        "explanation": "Krasicki bez złudzeń pokazuje, że niewinność i racja moralna nie wystarczą, gdy naprzeciw staje naga przemoc ('Smacznyś, słaby i w lesie').",
        "cke_tag": "Krasicki • Bajki prawo siły",
        "instruction": "Jaki mechanizm obnaża Ignacy Krasicki w bajce „Jagnię i wilcy” (w której wilki pożerają jagnię, mówiąc: 'Smacznyś, słaby i w lesie!')?",
        "math_statement": "",
        "title": "Ignacy Krasicki: Bajki i Satyry – dydaktyzm i krytyka sarmatyzmu",
        "topic": "Dział 8: Barok i Oświecenie – Kontrasty, koncept i rozum",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-9-1",
    "topic_id": "pol-dzial-9",
    "title": "Paszport Epoki: Romantyzm – serce, bunt i ramy czasowe",
    "theory_pill": {
      "concept_essence": "Romantyzm w Polsce to epoka wielkiego buntu przeciw racjonalizmowi, prymatu uczucia, wiary w świat pozamaterialny oraz walki o wolność ojczyzny po upadku powstania listopadowego (1830).",
      "epoch_passport": {
        "dates_framework": {
          "poland": "1822 r. (wydanie 'Ballad i romansów' Adama Mickiewicza) – 1863/1864 r. (upadek powstania styczniowego).",
          "europe": "1789 r. (Wielka Rewolucja Francuska) – 1848 r. (Wiosna Ludów)."
        },
        "credo": "Miej serce i patrzaj w serce! / Martwe znasz prawdy, nieznane dla ludu, / Widzisz świat w proszku, w każdej gwiazd iskierce; / Nie znasz prawd żywych, nie obaczysz cudu! (Romantyczność).",
        "philosophy_trio": [
          {
            "name": "Irracjonalizm",
            "essence": "Prawdziwe poznanie świata dokonuje się przez serce, wiarę, intuicję i sny, a nie rozum."
          },
          {
            "name": "Ludowość",
            "essence": "Kultura i wierzenia prostego ludu jako skarbnica prawdy moralnej i metafizycznej."
          },
          {
            "name": "Mistycyzm",
            "essence": "Wiara w bezpośredni kontakt duszy ludzkiej z Bogiem i światem duchów."
          }
        ]
      },
      "golden_rule": "Spór w balladzie 'Romantyczność' (Starzec ze szkiełkiem i okiem vs Narrator i Karusia z sercem) to manifest całego polskiego romantyzmu.",
      "cke_trap": {
        "error": "Twierdzenie, że polski romantyzm rozpoczął się po powstaniu listopadowym.",
        "correct": "Romantyzm w Polsce zaczął się w 1822 roku wraz z 'Balladami i romansami'. Powstanie listopadowe (1830) otworzyło jedynie jego dojrzałą, tyrtejską i mesjanistyczną fazę.",
        "description": "Żelazna data graniczna polskiej literatury: 1822!"
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-9-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Wskaż rok i wydarzenie uznawane oficjalnie za początek epoki romantyzmu w Polsce:",
        "options": [
          {
            "id": "A",
            "text": "1822 r. – wydanie I tomu 'Poezji' Adama Mickiewicza zawierającego 'Ballady i romanse'",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "1789 r. – wybuch Rewolucji Francuskiej",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "1830 r. – wybuch powstania listopadowego",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "1863 r. – wybuch powstania styczniowego",
            "is_correct": false
          }
        ],
        "explanation": "Rok 1822 w Wilnie to przełomowa data narodzin polskiego romantyzmu.",
        "cke_tag": "Romantyzm • Ramy czasowe 1822",
        "instruction": "Wskaż rok i wydarzenie uznawane oficjalnie za początek epoki romantyzmu w Polsce:",
        "math_statement": "",
        "title": "Paszport Epoki: Romantyzm – serce, bunt i ramy czasowe",
        "topic": "Dział 9: Romantyzm I – Świat ducha, wina i kara",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-9-2",
    "topic_id": "pol-dzial-9",
    "title": "Adam Mickiewicz: Dziady cz. II – obrzęd i etyka ludowa",
    "theory_pill": {
      "concept_essence": "Dziady cz. II to dramat obrzędowy przedstawiający pradawny pogańsko-chrześcijański rytuał wywoływania duchów zmarłych. Utwór formułuje żelazny kodeks ludowej sprawiedliwości moralnej: nie ma winy bez kary.",
      "key_points": [
        "Duchy lekkie (Józio i Rózia): nie doznały ziemskiego cierpienia ('Kto nie doznał goryczy ni razu, ten nie dozna słodyczy w niebie').",
        "Duch ciężki (Widmo Złego Pana): okrucieństwo wobec poddanych i brak miłosierdzia ('Bo kto nie był człowiekiem ni razu, temu człowiek nic nie pomoże').",
        "Duch pośredni (Zosia): obojętność na miłość, życie w oderwaniu od świata ('Kto nie dotknął ziemi ni razu, ten nigdy nie może być w niebie').",
        "Widmo nieme: tajemniczy duch wpatrzony w Pasterkę (zapowiedź Gustawa z IV cz. Dziadów)."
      ],
      "golden_rule": "Moralność ludowa w 'Dziadach cz. II' wymaga pełnego człowieczeństwa: trzeba poznać ziemski trud, kochać drugiego człowieka i okazywać miłosierdzie ubogim.",
      "cke_trap": {
        "error": "Mylenie Złego Pana z Senatorem Nowosilcowem.",
        "correct": "Zły Pan to bezimienny dziedzic wioski z Dziadów cz. II; Nowosilcow to carski dygnitarz z Dziadów cz. III.",
        "description": "Bardzo częsty błąd kardynalny w pracach pisemnych!"
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-9-2-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Przyporządkuj przewinę Widma Złego Pana do jego kary i pouczenia moralnego w „Dziadach cz. II”:",
        "part_1": {
          "prompt": "Na czym polegała wina Złego Pana za życia?",
          "options": [
            {
              "id": "A",
              "text": "Na bezduszności, braku miłosierdzia dla głodnych poddanych i skazaniu ich na śmierć"
            },
            {
              "id": "B",
              "text": "Na tchórzostwie i ucieczce z pola bitwy"
            },
            {
              "id": "C",
              "text": "Na kradzieży majątku kościelnego"
            }
          ]
        },
        "part_2": {
          "prompt": "Które pouczenie moralne wypowiada Chór po jego odejściu?",
          "options": [
            {
              "id": "1",
              "text": "„Bo kto nie był człowiekiem ni razu, temu człowiek nic nie pomoże”"
            },
            {
              "id": "2",
              "text": "„Kto nie doznał goryczy ni razu, ten nie dozna słodyczy w niebie”"
            },
            {
              "id": "3",
              "text": "„Ciemno wszędzie, głucho wszędzie, co to będzie, co to będzie?”"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Zły Pan odmówił chleba kobiecie z dzieckiem i kazał wychłostać głodnego chłopa za zjedzenie jabłek. Za brak człowieczeństwa spotyka go wieczny głód i szarpanie przez drapieżne ptaki.",
        "cke_tag": "Dziady cz. II • Etyka ludowa Zły Pan",
        "instruction": "Przyporządkuj przewinę Widma Złego Pana do jego kary i pouczenia moralnego w „Dziadach cz. II”:",
        "math_statement": "",
        "title": "Adam Mickiewicz: Dziady cz. II – obrzęd i etyka ludowa",
        "topic": "Dział 9: Romantyzm I – Świat ducha, wina i kara",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-9-3",
    "topic_id": "pol-dzial-9",
    "title": "Juliusz Słowacki: Balladyna – mechanizm zbrodni i żądza władzy",
    "theory_pill": {
      "concept_essence": "Balladyna to dramat szekspirowski ukazujący tragiczne konsekwencje nieposkromionej żądzy władzy. Pierwsza zbrodnia (zabójstwo siostry Aliny o dzbanek malin) uruchamia niepowstrzymaną spiralę kolejnych morderstw.",
      "key_points": [
        "Przemiana Balladyny: od wiejskiej dziewczyny wstydzącej się matki do bezwzględnej królowej na zamku w Gnieźnie.",
        "Łańcuch ofiar: Alina, Gralon, Grabiec, Pustelnik (prawowity król Popiel III), Kostryn (wspólnik otruty chlebem z trucizną).",
        "Sprawiedliwość natury i Boga: Balladyna jako sprawiedliwa królowa wydaje na siebie trzy wyroki śmierci i ginie uderzona piorunem z jasnego nieba."
      ],
      "golden_rule": "W 'Balladynie' natura bierze aktywny udział w wymierzaniu sprawiedliwości: krwawe znamię na czole Balladyny, korona Lecha i piorun wieńczący sąd.",
      "cke_trap": {
        "error": "Twierdzenie, że to Kirkor zabił Balladynę w pojedynku.",
        "correct": "Kirkor zginął w bitwie z wojskami Balladyny i Kostryna. Balladyna została uśmiercona przez piorun Boży po wydaniu na siebie wyroku.",
        "description": "Finał Balladyny to kluczowy element fabularny."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-9-3-1",
        "type": "CARDINAL_TRAP",
        "tier": "B",
        "points": 1,
        "question": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący losów bohaterów „Balladyny”:",
        "options": [
          {
            "id": "A",
            "text": "Balladyna wyparła się swojej starej matki i kazała wygnać ją z zamku podczas burzy.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Alina została zamordowana w lesie nożem podczas zbierania malin.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Kostryn zginął w pojedynku z Kirkorem pod murami Gniezna.",
            "is_correct": true
          },
          {
            "id": "D",
            "text": "Pustelnik był w rzeczywistości wygnanym królem Popielem III.",
            "is_correct": false
          }
        ],
        "explanation": "Kostryn nie zginął w pojedynku z Kirkorem – Kirkor zginął w bitwie, natomiast Kostryn został podstępnie otruty przez Balladynę chlebem przekrojonym zatrutym nożem.",
        "cke_tag": "Błąd kardynalny • Balladyna fabuła",
        "instruction": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący losów bohaterów „Balladyny”:",
        "math_statement": "",
        "title": "Juliusz Słowacki: Balladyna – mechanizm zbrodni i żądza władzy",
        "topic": "Dział 9: Romantyzm I – Świat ducha, wina i kara",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-10-1",
    "topic_id": "pol-dzial-10",
    "title": "Adam Mickiewicz: Dziady cz. III – martyrologia, prometeizm i mesjanizm",
    "theory_pill": {
      "concept_essence": "Dziady drezdeńskie (cz. III) to arcydramat narodowy ukazujący męczeństwo polskiej młodzieży po powstaniu listopadowym, bunt Konrada przeciw Bogu w imię miłości do narodu (prometeizm) oraz ideę Polski jako Chrystusa Narodów (mesjanizm).",
      "key_points": [
        "Przemiana Konrada: Gustaw (nieszczęśliwy kochanek) umiera, rodzi się Konrad (kochanek ojczyzny: 'Oto zmarł Gustaw, narodził się Konrad').",
        "Wielka Improwizacja: szczyt romantycznego prometeizmu. Konrad żąda od Boga rządu dusz, zarzuca Mu brak miłości i niemal nazywa Go 'carem' (szatan dopowiada bluźnierstwo).",
        "Widzenie ks. Piotra: pokorny zakonnik otrzymuje łaskę poznania boskich planów – Polska jako Chrystus Narodów, a przyszłym wybawicielem ma być mąż o tajemniczym imieniu 'czterdzieści i cztery'.",
        "Salon Warszawski: kontrast postaw – arystokracja i literaci lojalni wobec cara (piją herbatę po francusku) vs młodzi patrioci przy drzwiach mówiący o męczeństwie narodu (słynne słowa Wysockiego: 'Nasz naród jak lawa...')."
      ],
      "golden_rule": "Na wypracowaniu ZAWSZE cytuj Wysockiego: 'Nasz naród jak lawa, z wierzchu zimna i twarda, sucha i plugawa, lecz wewnętrznego ognia sto lat nie wyziębi; plwajmy na tę skorupę i zstąpmy do głębi!'. To klucz do charakterystyki Polaków!",
      "cke_trap": {
        "error": "Twierdzenie, że Konrad sam nazwał Boga carem.",
        "correct": "Konrad zemdlał przed wypowiedzeniem tego słowa – bluźniercze słowo 'carem' dopowiedział za niego szatan (Głos z lewej strony).",
        "description": "Dzięki temu Konrad nie został potępiony na wieki i ks. Piotr mógł ocalić jego duszę egzorcyzmami."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-10-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zinterpretuj postawę Konrada w Wielkiej Improwizacji w „Dziadach cz. III”:",
        "part_1": {
          "prompt": "Na czym polega postawa prometejska Konrada?",
          "options": [
            {
              "id": "A",
              "text": "Na buncie przeciw Bogu i gotowości do cierpienia w imię dobra i wolności całego narodu"
            },
            {
              "id": "B",
              "text": "Na uległości wobec carskich represji"
            },
            {
              "id": "C",
              "text": "Na walce o odzyskanie ukochanej kobiety"
            }
          ]
        },
        "part_2": {
          "prompt": "Które słowa Konrada najpełniej wyrażają jego utożsamienie z ojczyzną?",
          "options": [
            {
              "id": "1",
              "text": "„Nazywam się Milijon – bo za milijony kocham i cierpię katusze!”"
            },
            {
              "id": "2",
              "text": "„Miej serce i patrzaj w serce!”"
            },
            {
              "id": "3",
              "text": "„Ciemno wszędzie, głucho wszędzie...”"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Konrad czuje w sobie potęgę twórczą równą Bogu i żąda rządu dusz, by uszczęśliwić swój naród, za który cierpi milijonowe katusze.",
        "cke_tag": "Dziady cz. III • Prometeizm Konrada",
        "instruction": "Zinterpretuj postawę Konrada w Wielkiej Improwizacji w „Dziadach cz. III”:",
        "math_statement": "",
        "title": "Adam Mickiewicz: Dziady cz. III – martyrologia, prometeizm i mesjanizm",
        "topic": "Dział 10: Romantyzm II – Dziady cz. III, Pan Tadeusz i Kordian",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-10-1-2",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Jaki obraz polskiego społeczeństwa wyłania się ze sceny VII „Salon Warszawski”?",
        "options": [
          {
            "id": "A",
            "text": "Głęboki podział narodu na kosmopolityczną, ugodową elitę przy stoliku oraz prawdziwych, cierpiących patriotów stojących przy drzwiach",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Pełna jedność wszystkich klas społecznych w walce przeciw caratowi",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Powszechne poparcie dla polityki Nowosilcowa wśród polskiej młodzieży",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Beztroska zabawa karnawałowa bez żadnych wątków politycznych",
            "is_correct": false
          }
        ],
        "explanation": "Salon Warszawski to bezwzględny portret zdrady części arystokracji i serwilizmu wobec cara, skontrastowany z męczeństwem patriotów (Cichowski, Wysocki).",
        "cke_tag": "Dziady cz. III • Salon Warszawski",
        "instruction": "Jaki obraz polskiego społeczeństwa wyłania się ze sceny VII „Salon Warszawski”?",
        "math_statement": "",
        "title": "Adam Mickiewicz: Dziady cz. III – martyrologia, prometeizm i mesjanizm",
        "topic": "Dział 10: Romantyzm II – Dziady cz. III, Pan Tadeusz i Kordian",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-10-2",
    "topic_id": "pol-dzial-10",
    "title": "Juliusz Słowacki: Kordian – winkelriedyzm i dramat niemocy czynu",
    "theory_pill": {
      "concept_essence": "Kordian to polemika Słowackiego z mickiewiczowskim mesjanizmem. Zamiast biernego cierpienia (Chrystus narodów), Słowacki proponuje ideę czynu zbrojnego: winkelriedyzm ('Polska Winkelriedem narodów!'). Dramat pokazuje jednak tragizm samotnego spiskowca sparaliżowanego przez Strach i Imaginację.",
      "key_points": [
        "Etapy dojrzewania Kordiana: młodzieńczy ból istnienia i nieudane samobójstwo z miłości (akt I), podróż po Europie i utrata złudzeń co do świata pieniądza, miłości i polityki papieża (akt II), monolog na szczycie Mont Blanc i narodziny idei walki (akt III).",
        "Winkelriedyzm: nawiązanie do szwajcarskiego bohatera Arnolda Winkelrieda, który skierował włócznie wrogów we własną pierś, by otworzyć drogę rodakom. Polska ma podjąć aktywną walkę i ściągnąć na siebie ciosy caratu, dając wolność innym ludom.",
        "Próba carobójstwa: Kordian sam idzie zabić cara w Zamku Królewskim, lecz przed sypialnią cara padają jego siły psychiczne uosobione przez Strach i Imaginację – mdleje na progu komnaty."
      ],
      "golden_rule": "Różnica maturalna: Mesjanizm Mickiewicza (Dziady) = Polska jak Chrystus cierpi za grzechy świata. Winkelriedyzm Słowackiego (Kordian) = Polska jak Winkelried aktywnie walczy zbrojnie i poświęca się w boju!",
      "cke_trap": {
        "error": "Twierdzenie, że Papież w Rzymie pobłogosławił Polaków w walce o wolność.",
        "correct": "Papież nakazał Polakom posłuszeństwo carowi, grożąc klątwą w razie buntu ('Niechaj się Polaki modlą, czczą cara i wierzą').",
        "description": "To kluczowy moment rozczarowania Kordiana instytucją Kościoła w akcie II."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-10-2-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj ideę winkelriedyzmu sformułowaną w monologu Kordiana na szczycie Mont Blanc:",
        "part_1": {
          "prompt": "Do jakiego historycznego/legendarnego bohatera nawiązuje hasło 'Polska Winkelriedem narodów'?",
          "options": [
            {
              "id": "A",
              "text": "Do Arnolda Winkelrieda, szwajcarskiego rycerza, który poświęcił życie w bitwie pod Sempach"
            },
            {
              "id": "B",
              "text": "Do Wilhelma Tella walczącego z zaborcami austriackimi"
            },
            {
              "id": "C",
              "text": "Do Joanny d'Arc ratującej Francję"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaki jest sens tej koncepcji w opozycji do mesjanizmu z 'Dziadów cz. III'?",
          "options": [
            {
              "id": "1",
              "text": "Kładzie nacisk na aktywny czyn zbrojny i poświęcenie w walce, a nie na bierne cierpienie"
            },
            {
              "id": "2",
              "text": "Zaleca emigrację zarobkową do Szwajcarii"
            },
            {
              "id": "3",
              "text": "Nawołuje do pogodzenia się z caratem"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Winkelriedyzm to idea czynnego oporu – skupienia na sobie uwagi i ciosów zaborcy, aby wywalczyć niepodległość dla Polski i innych narodów Europy.",
        "cke_tag": "Kordian • Winkelriedyzm",
        "instruction": "Zanalizuj ideę winkelriedyzmu sformułowaną w monologu Kordiana na szczycie Mont Blanc:",
        "math_statement": "",
        "title": "Juliusz Słowacki: Kordian – winkelriedyzm i dramat niemocy czynu",
        "topic": "Dział 10: Romantyzm II – Dziady cz. III, Pan Tadeusz i Kordian",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-10-2-2",
        "type": "CARDINAL_TRAP",
        "tier": "B",
        "points": 1,
        "question": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący losów Kordiana:",
        "options": [
          {
            "id": "A",
            "text": "W Londynie Kordian przekonuje się od dozorcy w Saint James Park, że światem rządzą pieniądze.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Włoszka Wioletta kochała Kordiana szczerze i pozostała mu wierna mimo utraty jego majątku.",
            "is_correct": true
          },
          {
            "id": "C",
            "text": "Kordian zemdlał przed carską sypialnią w wyniku zmagań z własną psychiką (Strachem i Imaginacją).",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Prezes w podziemiach katedry św. Jana sprzeciwiał się planom zamachu na cara.",
            "is_correct": false
          }
        ],
        "explanation": "Wioletta była wyrachowaną materialistką – gdy Kordian podstępnie powiedział jej, że jego konie gubią złote podkowy i stał się bankrutem, natychmiast go porzuciła.",
        "cke_tag": "Błąd kardynalny • Kordian fabuła",
        "instruction": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący losów Kordiana:",
        "math_statement": "",
        "title": "Juliusz Słowacki: Kordian – winkelriedyzm i dramat niemocy czynu",
        "topic": "Dział 10: Romantyzm II – Dziady cz. III, Pan Tadeusz i Kordian",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-10-3",
    "topic_id": "pol-dzial-10",
    "title": "Adam Mickiewicz: Pan Tadeusz – mit arkadii i bohater dynamiczny",
    "theory_pill": {
      "concept_essence": "Pan Tadeusz (1834) to polska epopeja narodowa pisana trzynastozgłoskowcem na emigracji w Paryżu. Łączy mit utraconej ojczyzny-arkadii (kraju lat dziecinnych) z motywem głębokiej przemiany wewnętrznej bohatera (Jacek Soplica $\rightarrow$ ksiądz Robak).",
      "key_points": [
        "Soplicowo jako centrum polszczyzny: kraina ładu, harmonii, poszanowania tradycji i hierarchii (grzybobranie, polowanie, polonez).",
        "Jacek Soplica jako bohater dynamiczny: dumny warchoł, nieszczęśliwy kochanek Ewy Horeszkówny, mimowolny zabójca Stolnika $\rightarrow$ pokorny bernardyn, emisariusz przygotowujący powstanie na Litwie, rehabilitowany przed śmiercią i odznaczony Legią Honorową.",
        "Kontekst historyczny: nadzieje związane z kampanią napoleońską 1812 roku (marsz na Moskwę)."
      ],
      "golden_rule": "Jacek Soplica to wzorcowy bohater dynamiczny na maturze – odkupił prywatne winy wieloletnią, heroiczną służbą dla narodu.",
      "cke_trap": {
        "error": "Mylenie Tadeusza z Jackiem Soplicą.",
        "correct": "Tadeusz jest synem Jacka Soplicy i młodym dziedzicem; Jacek Soplica to jego ojciec działający w przebraniu księdza Robaka.",
        "description": "Błąd w relacjach bohaterów epopei."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-10-3-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Na czym polegała przemiana wewnętrzna Jacka Soplicy (księdza Robaka) w „Panu Tadeuszu”?",
        "options": [
          {
            "id": "A",
            "text": "Z dumnego, porywczego szlachcica-indywidualisty przekształcił się w pokornego mnicha i emisariusza służącego sprawie narodowej",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Z bogatego magnata stał się skąpym bankierem w Petersburgu",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Z żołnierza napoleońskiego przeszedł na służbę u cara Rosji",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Zrezygnował z walki o wolność i osiadł na bezludnej wyspie",
            "is_correct": false
          }
        ],
        "explanation": "Jacek Soplica to klasyczny bohater dynamiczny: odkupił grzech zdrady narodowej i morderstwa Stolnika przez anonimową, pełną poświęcenia walkę jako emisariusz.",
        "cke_tag": "Pan Tadeusz • Przemiana Jacka Soplicy",
        "instruction": "Na czym polegała przemiana wewnętrzna Jacka Soplicy (księdza Robaka) w „Panu Tadeuszu”?",
        "math_statement": "",
        "title": "Adam Mickiewicz: Pan Tadeusz – mit arkadii i bohater dynamiczny",
        "topic": "Dział 10: Romantyzm II – Dziady cz. III, Pan Tadeusz i Kordian",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-11-1",
    "topic_id": "pol-dzial-11",
    "title": "Stanisław Wokulski – dualizm bohatera na granicy dwóch epok",
    "theory_pill": {
      "concept_essence": "Stanisław Wokulski to bohater tragiczny i pęknięty wewnętrznie: z jednej strony pozytywistyczny naukowiec, przedsiębiorca i filantrop realizujący pracę organiczną, z drugiej – nieszczęśliwie zakochany romantyczny idealista niszczony przez afekt do arystokratki.",
      "key_points": [
        "Genom romantyczny: udział w powstaniu styczniowym, zsyłka do Irkucka, lektura Mickiewicza, idealizacja kobiety, samotność, próba samobójcza na torach w Skierniewicach.",
        "Genom pozytywistyczny: praca u podstaw i organiczna (spółka handlowa, wspieranie ubogich: Marii, Węgiełka, Wysockiego), pasja naukowa (fascynacja Geistem i Ochockim)."
      ],
      "golden_rule": "Wokulski to 'romantyk w pozytywistycznym przebraniu'. Na wypracowaniu zawsze akcentuj jego rozdarcie pokoleniowe.",
      "cke_trap": {
        "error": "Twierdzenie, że Wokulski zginął na torach kolejowych w Skierniewicach.",
        "correct": "Został w ostatniej chwili odciągnięty od pociągu przez dróżnika Wysockiego, któremu wcześniej pomógł!",
        "description": "To jeden z najczęstszych błędów kardynalnych na maturze!"
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-11-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj scenę próby samobójczej Wokulskiego w Skierniewicach po podsłuchaniu rozmowy Izabeli ze Starskim w pociągu:",
        "part_1": {
          "prompt": "Co doprowadziło Wokulskiego do próby samobójczej?",
          "options": [
            {
              "id": "A",
              "text": "Zrozumienie, że Izabela traktowała go przedmiotowo i flirtowała ze Starskim po angielsku za jego plecami"
            },
            {
              "id": "B",
              "text": "Bankructwo jego sklepu w Warszawie"
            },
            {
              "id": "C",
              "text": "Wiadomość o aresztowaniu Ignacego Rzeckiego"
            }
          ]
        },
        "part_2": {
          "prompt": "Kto uratował życie Wokulskiemu na torach kolejowych?",
          "options": [
            {
              "id": "1",
              "text": "Brat dróżnika Wysockiego, któremu Wokulski wcześniej udzielił wsparcia finansowego"
            },
            {
              "id": "2",
              "text": "Julian Ochocki"
            },
            {
              "id": "3",
              "text": "Ignacy Rzecki"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Scena ta ukazuje klęskę romantycznego idealizmu Wokulskiego oraz moralny paradoks: jego pozytywistyczna dobroć (pomoc ubogiemu dróżnikowi) uratowała mu życie.",
        "cke_tag": "Lalka • Próba samobójcza Wokulskiego",
        "instruction": "Zanalizuj scenę próby samobójczej Wokulskiego w Skierniewicach po podsłuchaniu rozmowy Izabeli ze Starskim w pociągu:",
        "math_statement": "",
        "title": "Stanisław Wokulski – dualizm bohatera na granicy dwóch epok",
        "topic": "Dział 11: Pozytywizm I – Bolesław Prus: Lalka",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-11-2",
    "topic_id": "pol-dzial-11",
    "title": "Ignacy Rzecki i Pamiętnik starego subiekta – idealizm polityczny",
    "theory_pill": {
      "concept_essence": "Ignacy Rzecki to ostatni z romantyków politycznych. Jego Pamiętnik starego subiekta wprowadza drugą perspektywę narracyjną, ukazując dzieje Wiosny Ludów na Węgrzech, kult rodu Bonaparte oraz bezgraniczną wierność przyjaźni ze Stachem Wokulskim.",
      "key_points": [
        "Idealizm polityczny: niezłomna wiara, że Napoleon i ród Bonaparte wyzwolą Polskę i zaprowadzą ład na świecie.",
        "Tragizm Rzeckiego: samotność wśród zabawek na wystawie sklepowej (motyw theatrum mundi: 'Marionetki!... Wszystko marionetki!...'), niezrozumienie przez młodszych subiektów i śmierć przy biurku ('Non omnis moriar')."
      ],
      "golden_rule": "Rzecki i Wokulski reprezentują dwa różne rodzaje idealizmu: Rzecki – idealizm polityczny, Wokulski – idealizm miłosny.",
      "cke_trap": {
        "error": "Twierdzenie, że Rzecki brał udział w powstaniu styczniowym.",
        "correct": "Rzecki walczył w Wiośnie Ludów na Węgrzech (1848). W powstaniu styczniowym (1863) brał udział Wokulski!",
        "description": "Częsty błąd faktograficzny w rozróżnieniu biografii obu bohaterów."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-11-2-1",
        "type": "CARDINAL_TRAP",
        "tier": "B",
        "points": 1,
        "question": "Wskaż zdanie zawierające BŁĄD RZECZOWY dotyczący postaci Ignacego Rzeckiego:",
        "options": [
          {
            "id": "A",
            "text": "Rzecki wieczorami nakręcał w pustym sklepie mechaniczne zabawki i snuł refleksje o ludziach jako marionetkach.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Rzecki wziął udział w powstaniu styczniowym u boku generała Langiewicza.",
            "is_correct": true
          },
          {
            "id": "C",
            "text": "Rzecki zmarł w pokoiku przy sklepie z powodu zawału serca.",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Rzecki bezskutecznie próbował ożenić Wokulskiego z panią Stawską.",
            "is_correct": false
          }
        ],
        "explanation": "Ignacy Rzecki walczył na Węgrzech w 1848 roku w pułku piechoty. W powstaniu styczniowym walczył Wokulski!",
        "cke_tag": "Błąd kardynalny • Biografia Rzeckiego",
        "instruction": "Wskaż zdanie zawierające BŁĄD RZECZOWY dotyczący postaci Ignacego Rzeckiego:",
        "math_statement": "",
        "title": "Ignacy Rzecki i Pamiętnik starego subiekta – idealizm polityczny",
        "topic": "Dział 11: Pozytywizm I – Bolesław Prus: Lalka",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-12-1",
    "topic_id": "pol-dzial-12",
    "title": "Henryk Sienkiewicz: Potop – przemiana Kmicica i mit kompensacyjny",
    "theory_pill": {
      "concept_essence": "Potop powstał 'ku pokrzepieniu serc' w czasach zaborów. Sienkiewicz przypomina obronę Jasnej Góry i ocalenie Rzeczypospolitej, a w losach Andrzeja Kmicica (Babinicza) kreuje wzorcową postać bohatera dynamicznego, który odkupuje grzech zdrady.",
      "key_points": [
        "Etapy przemiany: warchoł i zdrajca u boku Radziwiłłów w Kiejdanach $\rightarrow$ szok po ujawnieniu zdrady i przybranie nazwiska Babinicz $\rightarrow$ obrona Jasnej Góry i wysadzenie kolubryny $\rightarrow$ obrona króla Jana Kazimierza na Śląsku $\rightarrow$ rehabilitacja w kościele w Upicie i ślub z Oleńką.",
        "Mit kompensacyjny (ku pokrzepieniu serc): odwołanie do chwały oręża polskiego miało podtrzymać tożsamość narodu skazanego na rusyfikację i germanizację."
      ],
      "golden_rule": "Kmicic, podobnie jak Jacek Soplica, to najważniejszy bohater dynamiczny w literaturze polskiej – popełnia błąd, przeżywa wstrząs, działa pod przybranym nazwiskiem i osiąga moralne zwycięstwo.",
      "cke_trap": {
        "error": "Twierdzenie, że Kmicic wiedział od początku o zdradzie Radziwiłłów.",
        "correct": "Kmicic złożył przysięgę na krzyż Januszowi Radziwiłłowi, nie wiedząc, że hetman spiskuje ze Szwedami przeciwko prawowitemu królowi!",
        "description": "Kmicic czuł się związany rycerskim słowem, a nie chęcią zdrady Polski."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-12-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj przełom moralny w życiu Andrzeja Kmicica po uczcie w Kiejdanach:",
        "part_1": {
          "prompt": "Jakie nazwisko przybrał Kmicic, by zmazać hańbę zdrady i anonimowo służyć ojczyźnie?",
          "options": [
            {
              "id": "A",
              "text": "Babinicz"
            },
            {
              "id": "B",
              "text": "Robak"
            },
            {
              "id": "C",
              "text": "Horeszko"
            }
          ]
        },
        "part_2": {
          "prompt": "Który z jego czynów wojennych stał się punktem zwrotnym w wojnie ze Szwedami?",
          "options": [
            {
              "id": "1",
              "text": "Wysadzenie szwedzkiej kolubryny (wielkiego działa) podczas oblężenia Jasnej Góry"
            },
            {
              "id": "2",
              "text": "Zabicie Karola Gustawa w pojedynku"
            },
            {
              "id": "3",
              "text": "Zdobycie Warszawy na czele chorągwi tatarskiej"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Kmicic pod nazwiskiem Babinicz ryzykował życie w obronie klasztoru na Jasnej Górze, wysadzając gigantyczną kolubrynę.",
        "cke_tag": "Potop • Przemiana Kmicica",
        "instruction": "Zanalizuj przełom moralny w życiu Andrzeja Kmicica po uczcie w Kiejdanach:",
        "math_statement": "",
        "title": "Henryk Sienkiewicz: Potop – przemiana Kmicica i mit kompensacyjny",
        "topic": "Dział 12: Pozytywizm II – Walka o tożsamość i pamięć",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-13-1",
    "topic_id": "pol-dzial-13",
    "title": "Paszport Epoki: Młoda Polska – dekadentyzm, chłopomania i symbole",
    "theory_pill": {
      "concept_essence": "Młoda Polska (Modernizm, przełom XIX i XX w.) to epoka buntu przeciw pozytywistycznemu pragmatyzmowi. Charakteryzuje się nastrojem schyłkowości (dekadentyzm, 'fin de siècle'), ucieczką w sztukę ('sztuka dla sztuki') oraz fascynacją wsią (chłopomania).",
      "epoch_passport": {
        "dates_framework": {
          "poland": "1890 r. (debiuty poetów) – 1918 r. (odzyskanie niepodległości)."
        },
        "credo": "Evviva l'arte! (Niech żyje sztuka!) / Koniec wieku XIX (Tetmajer: 'Cóż więc jest? Co zostało nam...?').",
        "philosophy_trio": [
          {
            "name": "Schopenhaueryzm",
            "essence": "Życie ludzkie to pasmo cierpienia; ucieczką jest nirwana, sztuka lub współczucie."
          },
          {
            "name": "Nietzscheanizm",
            "essence": "Kult nadczłowieka, wola mocy, odrzucenie moralności niewolników."
          },
          {
            "name": "Bergsonizm",
            "essence": "Intuicjonizm, elan vital (siła życiowa), ciągły upływ czasu."
          }
        ]
      },
      "golden_rule": "W 'Weselu' chłopomania krakowskiej inteligencji okazuje się powierzchowna – panowie zachwycają się kolorowymi strojami chłopów, ale nie rozumieją ich mentalności ani gotowości do walki.",
      "cke_trap": {
        "error": "Twierdzenie, że Młoda Polska trwała w czasie I wojny światowej i po niej.",
        "correct": "Młoda Polska definitywnie kończy się w 1918 roku wraz z odzyskaniem niepodległości przez Polskę.",
        "description": "Rok 1918 to żelazna cezura początkowa dwudziestolecia międzywojennego."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-13-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Na czym polegało zjawisko 'chłopomanii' (ludomanii) typowe dla artystów Młodej Polski?",
        "options": [
          {
            "id": "A",
            "text": "Na powierzchownej fascynacji życiem wsi, obyczajami i urodą wiejskich dziewcząt, często prowadzącej do małżeństw inteligencko-chłopskich",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Na oddaniu całego majątku szlacheckiego na rzecz reformy rolnej",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Na powszechnym wstępowaniu inteligencji do partii chłopskich",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Na zakazie wstępu chłopom do krakowskich teatrów",
            "is_correct": false
          }
        ],
        "explanation": "Chłopomania krakowskiej bohemy (np. Lucjan Rydel, Włodzimierz Tetmajer) polegała na estetycznym zachwycie folklorem, który obnażył Wyspiański w 'Weselu'.",
        "cke_tag": "Młoda Polska • Chłopomania",
        "instruction": "Na czym polegało zjawisko 'chłopomanii' (ludomanii) typowe dla artystów Młodej Polski?",
        "math_statement": "",
        "title": "Paszport Epoki: Młoda Polska – dekadentyzm, chłopomania i symbole",
        "topic": "Dział 13: Młoda Polska – Stanisław Wyspiański: Wesele",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-13-2",
    "topic_id": "pol-dzial-13",
    "title": "Stanisław Wyspiański: Wesele – zjawy i symbole narodowej niemocy",
    "theory_pill": {
      "concept_essence": "Wesele (1901) to narodowy dramat symboliczny oparty na autentycznym weselu Lucjana Rydla z Jadwigą Mikołajczykówną w Bronowicach. W akcie II wesele zamienia się w seans psychologiczno-historyczny: gościom weselnym ukazują się zjawy będące wyrzutami ich sumienia.",
      "key_points": [
        "Zjawy i ich adresaci: Widmo malarza de Laveaux (Marysia – utracona miłość), Stańczyk (Dziennikarz – kompromitacja ugodowej polityki konserwatystów), Rycerz Zawisza Czarny (Poeta – pragnienie potęgi i czynu), Hetman Branicki (Pan Młody – zdrada narodowa magnaterii), Upiór Jakuba Szeli (Dziad – krwawa pamięć rzezi galicyjskiej 1846 r.), Wernyhora (Gospodarz – zapowiedź powstania).",
        "Symbole kluczowe: Złoty róg (hasło do walki, zjednoczenie narodu), Czapka z pawich piór (prywata, próżność chłopska: 'Miałeś, chamie, złoty róg, ostał ci się ino sznur'), Chocholi taniec (letarg, uśpienie narodu, niemoc podjęcia czynu niepodległościowego)."
      ],
      "golden_rule": "Słynne słowa: 'Miałeś, chamie, złoty róg, ostał ci się ino sznur' to podsumowanie klęski: Jasiek zgubił złoty róg, schylając się po błahostkę – pawie pióra!",
      "cke_trap": {
        "error": "Twierdzenie, że to Gospodarz zgubił złoty róg.",
        "correct": "Wernyhora wręczył róg Gospodarzowi, lecz ten lekkomyślnie przekazał go młodemu Jaśkowi, by ten obwołał powstanie!",
        "description": "Kluczowy łańcuch zdarzeń w finale dramatu."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-13-2-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Przyporządkuj zjawę i jej znaczenie symboliczne do Dziennikarza w „Weselu”:",
        "part_1": {
          "prompt": "Jaka zjawa ukazuje się Dziennikarzowi (Rudolfowi Starzewskiemu) w akcie II?",
          "options": [
            {
              "id": "A",
              "text": "Stańczyk – renesansowy błazen królewski"
            },
            {
              "id": "B",
              "text": "Rycerz Zawisza Czarny"
            },
            {
              "id": "C",
              "text": "Upiór Jakuba Szeli"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaki symbol wręcza mu ta postać na pożegnanie?",
          "options": [
            {
              "id": "1",
              "text": "Kadyceusz (laskę błazeńską) – symbol znieczulania i usypiania narodu przez lojalistyczną prasę"
            },
            {
              "id": "2",
              "text": "Złoty róg"
            },
            {
              "id": "3",
              "text": "Zardzewiałą szablę"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Stańczyk demaskuje ugodowość krakowskich konserwatystów ('Stańczyków') i wręcza Dziennikarzowi Kaduceusz polski, mówiąc: 'Mąć tę wodę, mąć!'.",
        "cke_tag": "Wesele • Stańczyk i Dziennikarz",
        "instruction": "Przyporządkuj zjawę i jej znaczenie symboliczne do Dziennikarza w „Weselu”:",
        "math_statement": "",
        "title": "Stanisław Wyspiański: Wesele – zjawy i symbole narodowej niemocy",
        "topic": "Dział 13: Młoda Polska – Stanisław Wyspiański: Wesele",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      },
      {
        "id": "task-pol-13-2-2",
        "type": "SINGLE_CHOICE",
        "tier": "B",
        "points": 1,
        "question": "Co symbolizuje finałowy 'Chocholi taniec' w dramacie Wyspiańskiego?",
        "options": [
          {
            "id": "A",
            "text": "Uśpienie, bierność, marazm i niezdolność polskiego narodu do podjęcia czynu niepodległościowego",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Radosne świętowanie nadejścia wiosny przez mieszkańców wsi",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Zwycięstwo chłopów w walce z carskimi wojskami",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Przeprosiny inteligencji za lata pańszczyzny",
            "is_correct": false
          }
        ],
        "explanation": "Taniec w takt muzyki Chochoła to symbol narodowego letargu i zaklętego kręgu niemocy, z którego Polacy nie potrafią się wyrwać.",
        "cke_tag": "Wesele • Chocholi taniec symbolika",
        "instruction": "Co symbolizuje finałowy 'Chocholi taniec' w dramacie Wyspiańskiego?",
        "math_statement": "",
        "title": "Stanisław Wyspiański: Wesele – zjawy i symbole narodowej niemocy",
        "topic": "Dział 13: Młoda Polska – Stanisław Wyspiański: Wesele",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-14-1",
    "topic_id": "pol-dzial-14",
    "title": "Stefan Żeromski: Przedwiośnie – rozczarowanie wolnością i szklane domy",
    "theory_pill": {
      "concept_essence": "Przedwiośnie (1925) to gorzki rozrachunek z pierwszymi latami odzyskanej niepodległości. Powieść śledzi dojrzewanie Cezarego Baryki na tle rewolucji w Baku, wojny polsko-bolszewickiej (1920) oraz zderzenia mitu 'szklanych domów' z nędzą i chaosem odrodzonej Polski.",
      "key_points": [
        "Mit szklanych domów: opowieść umierającego ojca (Seweryna) o czystych, tanich i estetycznych domach ze szkła budowanych dla robotników nad Wisłą – symbol marzeń o nowoczesnym, sprawiedliwym państwie.",
        "Zderzenie z realiami: widok błota, nędzy i żydowskich slumsów w przygranicznym miasteczku.",
        "Trzy drogi naprawy Polski w części 'Wiatr od wschodu': droga rewolucji komunistycznej (Lulek), droga ewolucyjnych reform państwowych (Szymon Gajowiec), droga buntu Baryki (marsz na Belweder w mundurze legionisty, lecz z boku manifestacji).",
        "Nawłoć: sielankowy, tradycyjny dwór szlachecki przypominający Soplicowo, uśpiony w beztrosce."
      ],
      "golden_rule": "Finał Przedwiośnia jest otwarty: Cezary Baryka idzie w pierwszym szeregu manifestantów na Belweder, ale idzie OSOBNO, w polskim mundurze – to wyraz jego wewnętrznego buntu, a nie ślepego poparcia dla komunistów!",
      "cke_trap": {
        "error": "Uznanie Cezarego Baryki za bezkrytycznego komunistę.",
        "correct": "Cezary w rozmowie z Lulkiem ostro krytykował komunizm za terror, niszczenie kultury i brak poszanowania dla polskiej niepodległości.",
        "description": "Baryka poszukiwał własnej drogi, odrzucając zarówno bezwzględny bolszewizm, jak i powolność reform Gajowca."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-14-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj symbolikę 'szklanych domów' w „Przedwiośniu” Stefana Żeromskiego:",
        "part_1": {
          "prompt": "Kto opowiedział Cezaremu Baryce utopijną wizję szklanych domów?",
          "options": [
            {
              "id": "A",
              "text": "Jego ojciec, Seweryn Baryka, podczas podróży pociągiem do Polski"
            },
            {
              "id": "B",
              "text": "Komunista Antoni Lulek"
            },
            {
              "id": "C",
              "text": "Szymon Gajowiec w Warszawie"
            }
          ]
        },
        "part_2": {
          "prompt": "Co w rzeczywistości zastał Cezary po przekroczeniu granicy polskiej?",
          "options": [
            {
              "id": "1",
              "text": "Błoto, szarzyznę, nędzne drewniane rudery i brud w przygranicznym miasteczku"
            },
            {
              "id": "2",
              "text": "Nowoczesne fabryki i szklane osiedla mieszkaniowe"
            },
            {
              "id": "3",
              "text": "Pałace arystokratów budowane ze szkła"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Wizja szklanych domów była mitem i tęsknotą starego Baryki; rzeczywistość Polski po 123 latach zaborów okazała się dramatycznie uboga.",
        "cke_tag": "Przedwiośnie • Szklane domy",
        "instruction": "Zanalizuj symbolikę 'szklanych domów' w „Przedwiośniu” Stefana Żeromskiego:",
        "math_statement": "",
        "title": "Stefan Żeromski: Przedwiośnie – rozczarowanie wolnością i szklane domy",
        "topic": "Dział 14: Dwudziestolecie międzywojenne – Nowa Polska i Forma",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-14-2",
    "topic_id": "pol-dzial-14",
    "title": "Witold Gombrowicz: Ferdydurke – gęba, pupa i wszechwładna Forma",
    "theory_pill": {
      "concept_essence": "Ferdydurke (1937) to genialna powieść groteskowa demaskująca mechanizmy społeczne, w których człowiek nigdy nie jest w pełni sobą, lecz zostaje uwięziony w sztucznej 'Formie' narzucanej przez innych.",
      "key_points": [
        "Trzy kluczowe pojęcia Gombrowicza:",
        "1. Pupa (upupienie): infantylizowanie człowieka, traktowanie go jak niedojrzałego ucznia (szkoła dyrektora Piórkowskiego i profesora Pimki).",
        "2. Gęba (przyprawianie gęby): narzucanie człowiekowi określonej roli, maski, opinii, z której nie sposób się uwolnić ('Nie ma ucieczki przed gębą, jak tylko w inną gębę').",
        "3. Łydka: kult cielesności, nowoczesności i wyzwolenia obyczajowego (dom Młodziaków – pensjonarka Mizia).",
        "Świat dworku w Bolimowie: próba ucieczki w tradycję szlachecką i patriarchat, kończąca się 'braterstwem z parobkiem' (Miętus)."
      ],
      "golden_rule": "Według Gombrowicza człowiek nie może istnieć bez Formy – jesteśmy zawsze stwarzani przez spojrzenie drugiego człowieka ('człowiek jest stwarzany przez człowieka').",
      "cke_trap": {
        "error": "Uznanie 30-letniego Józia Kowalskiego za rzeczywiste dziecko w szkole.",
        "correct": "Józio ma 30 lat, ale zostaje cofnięty do szkoły i zdziecinniały przez profesora Pimkę za pomocą zabiegu upupienia.",
        "description": "To groteskowa metafora społecznej manipulacji i niedojrzałości."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-14-2-1",
        "type": "MATCHING",
        "tier": "A",
        "points": 1,
        "question": "Przyporządkuj pojęcie z filozofii Witolda Gombrowicza do jego metaforycznego znaczenia:",
        "pairs": [
          {
            "concept": "Pupa (upupienie)",
            "definition": "Wymuszone zdziecinnienie, narzucenie roli posłusznego i naiwnego malca"
          },
          {
            "concept": "Gęba",
            "definition": "Maska społeczna, rola narzucona jednostce przez otoczenie"
          },
          {
            "concept": "Łydka",
            "definition": "Kult młodości, swobody obyczajowej, nowoczesności i wysportowanego ciała"
          }
        ],
        "explanation": "To fundamentalne kategorie analizy rzeczywistości w dziełach Gombrowicza.",
        "cke_tag": "Ferdydurke • Gęba pupa łydka",
        "instruction": "Przyporządkuj pojęcie z filozofii Witolda Gombrowicza do jego metaforycznego znaczenia:",
        "math_statement": "",
        "title": "Witold Gombrowicz: Ferdydurke – gęba, pupa i wszechwładna Forma",
        "topic": "Dział 14: Dwudziestolecie międzywojenne – Nowa Polska i Forma",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-15-1",
    "topic_id": "pol-dzial-15",
    "title": "Tadeusz Borowski: Opowiadania – człowiek zlagrowany i technika behawioryzmu",
    "theory_pill": {
      "concept_essence": "Opowiadania oświęcimskie Borowskiego ('Proszę państwa do gazu', 'Ludzie, którzy szli') to wstrząsający obraz niemieckiego obozu koncentracyjnego (lagru). Ukazują 'człowieka zlagrowanego' – jednostkę, której instynkt biologicznego przetrwania i głód odebrały wszelkie normy moralne.",
      "key_points": [
        "Człowiek zlagrowany: więzień, który zaakceptował zasady obozowe, by przeżyć (brak litości dla idących na śmierć, praca przy rozładunku transportów za dodatkowy chleb, cynizm).",
        "Behawioryzm: technika pisarska polegająca na opisywaniu wyłącznie zewnętrznych zachowań i reakcji bohaterów bez wnikania w ich psychikę i bez komentarza moralnego (to czytelnik ma dokonać oceny).",
        "Dramatyzm rampy w Birkenau: obozowa rutyna, obojętność wobec tragedii ('Między jednym a drugim zacięciem się w meczu wywieziono do gazu trzy tysiące ludzi')."
      ],
      "golden_rule": "Borowski nie oskarża więźniów – oskarża nieludzki, zbrodniczy system obozowy stworzony przez nazistów, który doprowadził do upadku wartości europejskich.",
      "cke_trap": {
        "error": "Mylenie lagru (niemiecki obóz koncentracyjny) z łagrem (sowiecki obóz pracy przymusowej).",
        "correct": "Lagier = Auschwitz/Birkenau (Borowski). Łagier = Gułag/Jercewo w ZSRR (Grudziński).",
        "description": "Pomyłka kardynalna w terminologii na maturze!"
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-15-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj pojęcie 'człowieka zlagrowanego' w prozie Tadeusza Borowskiego:",
        "part_1": {
          "prompt": "Czym charakteryzuje się postawa 'człowieka zlagrowanego'?",
          "options": [
            {
              "id": "A",
              "text": "Przystosowaniem się do zbrodniczych praw obozu, znieczuleniem na cudze cierpienie i walką o biologiczne przetrwanie za wszelką cenę"
            },
            {
              "id": "B",
              "text": "Nieustanną modlitwą i heroicznym oddawaniem własnych racji żywnościowych innym więźniom"
            },
            {
              "id": "C",
              "text": "Prowadzeniem tajnych wykładów uniwersyteckich w baraku"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaka metoda narracyjna służy do opisu tej rzeczywistości?",
          "options": [
            {
              "id": "1",
              "text": "Behawioryzm – chłodny opis faktów i czynności fizycznych bez moralizatorstwa"
            },
            {
              "id": "2",
              "text": "Patetyczny monolog romantyczny"
            },
            {
              "id": "3",
              "text": "Żartobliwa gawęda szlachecka"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Borowski stosuje behawioryzm, by ukazać potworność lagru w sposób chłodny, gdzie śmierć tysięcy ludzi staje się codzienną, mechaniczną rutyną.",
        "cke_tag": "Borowski • Człowiek zlagrowany",
        "instruction": "Zanalizuj pojęcie 'człowieka zlagrowanego' w prozie Tadeusza Borowskiego:",
        "math_statement": "",
        "title": "Tadeusz Borowski: Opowiadania – człowiek zlagrowany i technika behawioryzmu",
        "topic": "Dział 15: Literatura wojny i okupacji – Świat odczłowieczony",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-15-2",
    "topic_id": "pol-dzial-15",
    "title": "Gustaw Herling-Grudziński: Inny świat – ocalenie człowieczeństwa w sowieckim łagrze",
    "theory_pill": {
      "concept_essence": "Inny świat (Zapiski sowieckie) to autobiograficzna relacja z pobytu w łagrze w Jercewie (sowiecki Gułag). W przeciwieństwie do Borowskiego, Grudziński wierzy, że nawet w nieludzkich warunkach można ocalić resztki moralności i godności ludzkiej.",
      "key_points": [
        "Sowiecki obóz pracy: niewolnicza praca przy wyrębie lasu, system 'kotłów' (racje żywności zależne od wyrobienia normy produkcyjnej – głodzenie słabszych), nocne polowania 'urków' (kryminalistów) na kobiety.",
        "Przykłady ocalenia godności: Kostylew (przypalał sobie rękę w ogniu, by nie pracować dla swoich oprawców), głodówka protestacyjna autora o zwolnienie z obozu po amnestii.",
        "Epilog w Rzymie (1945 r.): spotkanie z dawnym współwięźniem (Żydem z Grodna), który błaga o słowo 'rozumiem' za złożenie fałszywego donosu ratującego mu życie. Autor milczy – nie potrafi powiedzieć 'rozumiem' w świecie ludzi wolnych."
      ],
      "golden_rule": "Słynne zdanie z Innego świata: 'Człowiek jest ludzki w ludzkich warunkach' – Grudziński dowodzi, że nie mamy prawa sądzić ludzi według praw wolnego świata, dopóki sami nie znaleźliśmy się w piekle obozu.",
      "cke_trap": {
        "error": "Twierdzenie, że autor w epilogu wybaczył i powiedział 'rozumiem'.",
        "correct": "Grudziński nie wypowiedział słowa 'rozumiem' – odszedł w milczeniu, chroniąc powojenny ład moralny przed relatywizmem.",
        "description": "Kluczowa scena epilogu Innego świata."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-15-2-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "W jaki sposób inżynier Kostylew manifestował swój heroiczny sprzeciw wobec systemu sowieckiego obozu w Jercewie?",
        "options": [
          {
            "id": "A",
            "text": "Świadomie przypalał swoją rękę w ogniu, aby nie pracować niewolniczo na rzecz zbrodniczego systemu",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "Zorganizował zbrojne powstanie w zonie obozowej",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Uciekł pociągiem towarowym do Moskwy",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Pisał listy protestacyjne do Józefa Stalina",
            "is_correct": false
          }
        ],
        "explanation": "Kostylew wybierał niewyobrażalny fizyczny ból poparzeń, by nie oddawać swoich sił wrogom i zachować suwerenność ducha.",
        "cke_tag": "Inny świat • Postawa Kostylewa",
        "instruction": "W jaki sposób inżynier Kostylew manifestował swój heroiczny sprzeciw wobec systemu sowieckiego obozu w Jercewie?",
        "math_statement": "",
        "title": "Gustaw Herling-Grudziński: Inny świat – ocalenie człowieczeństwa w sowieckim łagrze",
        "topic": "Dział 15: Literatura wojny i okupacji – Świat odczłowieczony",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-15-3",
    "topic_id": "pol-dzial-15",
    "title": "Hanna Krall: Zdążyć przed Panem Bogiem – demitologizacja Zagłady",
    "theory_pill": {
      "concept_essence": "Zdążyć przed Panem Bogiem to wywiad-rzeka z Markiem Edelmanem, ostatnim przywódcą powstania w getcie warszawskim (1943) i powojennym kardiochirurgiem. Utwór dokonuje bezwzględnej demitologizacji bohaterstwa, sprowadzając motywację powstańców do godnej śmierci z bronią w ręku.",
      "key_points": [
        "Wybór sposobu umierania: powstanie w getcie nie miało szans na militarne zwycięstwo – chodziło o to, by 'nie dać się zapędzić na rzeź jak barany', lecz wybrać śmierć z podniesioną głową.",
        "Dwa etapy życia Edelmana: w getcie wyrywał ludzi z Umschlagplatzu idących do Treblinki; po wojnie jako kardiochirurg wyrywał pacjentów ze szponów śmierci na stole operacyjnym ('wyścig z Panem Bogiem o ludzkie życie').",
        "Prostota i brak patosu: Edelman mówi o bohaterach w sposób bezpretensjonalny, odrzucając pomniki i koturny."
      ],
      "golden_rule": "Edelman w 'Zdążyć przed Panem Bogiem' stawia znak równości między śmiercią z karabinem na barykadzie a cichą śmiercią w komorze gazowej – każda śmierć jest równa i nikt nie ma prawa oceniać ofiar.",
      "cke_trap": {
        "error": "Mylenie powstania w getcie warszawskim (kwiecień 1943) z powstaniem warszawskim (sierpień 1944).",
        "correct": "Powstanie w getcie (1943) wywołali Żydzi z ŻOB i ŻZW w murach getta; powstanie warszawskie (1944) wywołała Armia Krajowa w całym mieście.",
        "description": "Najgroźniejszy błąd kardynalny z historii XX wieku!"
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-15-3-1",
        "type": "CARDINAL_TRAP",
        "tier": "A",
        "points": 1,
        "question": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący treści „Zdążyć przed Panem Bogiem”:",
        "options": [
          {
            "id": "A",
            "text": "Marek Edelman był po wojnie wybitnym kardiochirurgiem w Łodzi.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Mordechaj Anielewicz popełnił samobójstwo w bunkrze przy ulicy Miłej 18.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "Powstanie w getcie warszawskim wybuchło w sierpniu 1944 roku i doprowadziło do wyzwolenia stolicy.",
            "is_correct": true
          },
          {
            "id": "D",
            "text": "Umschlagplatz był placem przeładunkowym, z którego Niemcy wywozili Żydów do obozu zagłady w Treblince.",
            "is_correct": false
          }
        ],
        "explanation": "Powstanie w getcie wybuchło 19 kwietnia 1943 roku i zakończyło się zburzeniem getta przez Niemców. Sierpień 1944 roku to data wybuchu powstania warszawskiego!",
        "cke_tag": "Błąd kardynalny • Powstanie w getcie vs Powstanie warszawskie",
        "instruction": "Wskaż zdanie, które zawiera BŁĄD RZECZOWY dotyczący treści „Zdążyć przed Panem Bogiem”:",
        "math_statement": "",
        "title": "Hanna Krall: Zdążyć przed Panem Bogiem – demitologizacja Zagłady",
        "topic": "Dział 15: Literatura wojny i okupacji – Świat odczłowieczony",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-16-1",
    "topic_id": "pol-dzial-16",
    "title": "Albert Camus: Dżuma – powieść-parabola i heroizm codzienności",
    "theory_pill": {
      "concept_essence": "Dżuma (1947) to powieść-parabola o algierskim mieście Oran dotkniętym epidemią dżumy. W sensie dosłownym opisuje walkę z zarazą, w sensie przenośnym – dżuma to metafora wszelkiego zła (wojny, faszyzmu, absurdu istnienia), a postawy bohaterów to modele reakcji człowieka na nieszczęście.",
      "key_points": [
        "Bernard Rieux (lekarz): postawa laickiego heroizmu – nie wierzy w Boga, lecz walczy z cierpieniem po prostu ze zwykłej ludzkiej przyzwoitości ('uczciwość to jedyny sposób walki z dżumą').",
        "Jean Tarrou: pragnie 'być świętym bez Boga', zakłada ochotnicze formacje sanitarne.",
        "Ojciec Paneloux: początkowo uważa dżumę za Bożą karę za grzechy; po wstrząsającej śmierci małego synka sędziego Othona zmienia postawę i angażuje się w ratowanie chorych.",
        "Raymond Rambert: początkowo chce uciec z Oranu do ukochanej kobiety w Paryżu, lecz ostatecznie zostaje, rozumiejąc, że nikt nie ma prawa być szczęśliwym w pojedynkę.",
        "Cottard: przestępca czerpiący zyski z epidemii i czarnego rynku (dżuma jest dla niego wybawieniem przed więzieniem)."
      ],
      "golden_rule": "Finałowe ostrzeżenie Dżumy: 'bakcyl dżumy nigdy nie umiera i nie znika' – zło jest uśpione i może w każdej chwili uderzyć ponownie ku nieszczęściu i nauce ludzi.",
      "cke_trap": {
        "error": "Twierdzenie, że doktor Rieux uciekł z miasta i zostawił pacjentów.",
        "correct": "Doktor Rieux był narratorem kroniki, pozostał w Oranie do końca i leczył chorych z narażeniem życia, tracąc w tym czasie chorą żonę w sanatorium.",
        "description": "Rieux to wzór etyki zawodowej i ludzkiej solidarności."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-16-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj postawę doktora Bernarda Rieux w obliczu zarazy w „Dżumie” Camusa:",
        "part_1": {
          "prompt": "Czym kierował się doktor Rieux, niosąc pomoc chorym mimo braku skutecznych leków?",
          "options": [
            {
              "id": "A",
              "text": "Zwykłą ludzką przyzwoitością i wiernością powołaniu lekarskiemu bez oczekiwania nagrody w niebie"
            },
            {
              "id": "B",
              "text": "Chęcią zdobycia sławy naukowej i bogactwa"
            },
            {
              "id": "C",
              "text": "Ślepym posłuszeństwem wobec poleceń prefektury"
            }
          ]
        },
        "part_2": {
          "prompt": "Co w sensie parabolicznym symbolizuje dżuma w utworze?",
          "options": [
            {
              "id": "1",
              "text": "Zło tkwiące w świecie i człowieku, totalitaryzm, wojnę oraz absurd istnienia"
            },
            {
              "id": "2",
              "text": "Jedynie chorobę zakaźną wywołaną przez ugryzienia pcheł szczurzych"
            },
            {
              "id": "3",
              "text": "Karygodne zaniedbania służb sanitarnych Algierii"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Rieux reprezentuje egzystencjalny heroizm moralny: wobec absurdu świata i obecności zła jedyną godną odpowiedzią jest solidarność i walka o człowieka.",
        "cke_tag": "Dżuma • Postawa doktora Rieux",
        "instruction": "Zanalizuj postawę doktora Bernarda Rieux w obliczu zarazy w „Dżumie” Camusa:",
        "math_statement": "",
        "title": "Albert Camus: Dżuma – powieść-parabola i heroizm codzienności",
        "topic": "Dział 16: Literatura współczesna – Bunt, system i moralność",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-16-2",
    "topic_id": "pol-dzial-16",
    "title": "George Orwell: Rok 1984 – anatomia totalitaryzmu i nowomowa",
    "theory_pill": {
      "concept_essence": "Rok 1984 to antyutopia (dystopia) opisująca totalitarne państwo Oceanii pod władzą Wielkiego Brata i Partii Angsocu. Orwell analizuje mechanizmy niszczenia jednostki przez inwigilację (teleekrany), fałszowanie historii, dwójmyślenie oraz nowomowę.",
      "key_points": [
        "Nowomowa (Newspeak): język zaprojektowany tak, by uniemożliwić jakąkolwiek myśl niezgodną z ideologią Partii (brak słów do wyrażenia wolności = brak wolności).",
        "Dwójmyślenie (Doublethink): umiejętność wyznawania dwóch sprzecznych poglądów naraz i wierzenia w oba ('Wojna to pokój', 'Wolność to niewola', 'Ignorancja to siła').",
        "Losy Winstona Smitha: próba zachowania pamięci, intymności i miłości do Julii $\rightarrow$ zdrada w Pokoju 101 pod wpływem panicznego lęku przed szczurami $\rightarrow$ całkowite złamanie psychiczne i wyznanie miłości Wielkiemu Bratu."
      ],
      "golden_rule": "Zdanie-klucz: 'Kto rządzi przeszłością, w tego rękach jest przyszłość; kto rządzi teraźniejszością, w tego rękach jest przeszłość'.",
      "cke_trap": {
        "error": "Twierdzenie, że Winston Smith dokonał udanego zamachu na Wielkiego Brata.",
        "correct": "Winston został aresztowany przez Policję Myśli, torturowany przez O'Briena i całkowicie złamany psychicznie – w finale sam szczerze kocha Wielkiego Brata.",
        "description": "Finał Orwella jest bezwzględnym ostrzeżeniem przed potęgą inżynierii totalitarnej."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-16-2-1",
        "type": "MATCHING",
        "tier": "A",
        "points": 1,
        "question": "Przyporządkuj orwellowskie hasło do jego definicji w realiach Oceanii:",
        "pairs": [
          {
            "concept": "Nowomowa",
            "definition": "Język uboższy w słowa, mający uniemożliwić sformułowanie myśli buntowniczej"
          },
          {
            "concept": "Dwójmyślenie",
            "definition": "Zdolność jednoczesnego uznawania dwóch sprzecznych twierdzeń za w 100% prawdziwe"
          },
          {
            "concept": "Myściozbrodnia",
            "definition": "Przestępstwo polegające na samej wewnętrznej, nieprawomyślnej myśli o buncie"
          }
        ],
        "explanation": "To fundamentalne pojęcia dystopii orwellowskiej, analizowane na maturze.",
        "cke_tag": "Rok 1984 • Nowomowa i dwójmyślenie",
        "instruction": "Przyporządkuj orwellowskie hasło do jego definicji w realiach Oceanii:",
        "math_statement": "",
        "title": "George Orwell: Rok 1984 – anatomia totalitaryzmu i nowomowa",
        "topic": "Dział 16: Literatura współczesna – Bunt, system i moralność",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-16-3",
    "topic_id": "pol-dzial-16",
    "title": "Sławomir Mrożek: Tango – upadek wartości i dyktatura prymitywnej siły",
    "theory_pill": {
      "concept_essence": "Tango (1964) to dramat groteskowy ukazujący kryzys kultury europejskiej. Młody Artur próbuje przywrócić ład i tradycyjne zasady w domu zdemoralizowanych rodziców (Stomila i Eleonory). Gdy jego konserwatywny bunt ponosi klęskę, władzę w domu brutalną przemocą przejmuje prymityw Edek.",
      "key_points": [
        "Odwrócenie ról pokoleniowych: rodzice (Stomil i Eleonora) to wieczni anarchiści i rewolucjoniści obyczajowi; ich syn Artur staje się konserwatystą tęskniącym za garniturem, ślubem kościelnym i hierarchią.",
        "Finał dramatu: po śmierci Artura (zabitego przez Edka ciosem w kark), cham Edek nakłada marynarkę Artura i zmusza wuja Eugeniusza do zatańczenia tanga 'La Cumparsita' – metafora przejęcia władzy przez bezwzględną siłę chamstwa i tyranii."
      ],
      "golden_rule": "Finałowe tango Edka z Eugeniuszem to wprost nawiązanie do 'Chocholego tańca' z Wesela – symbol kapitulacji inteligencji przed brutalną, bezmyślną siłą.",
      "cke_trap": {
        "error": "Twierdzenie, że Artur zginął w pojedynku szermierczym ze Stomilem.",
        "correct": "Artur został zdradziecko zabity od tyłu ciosem w kark zadanym przez Edka.",
        "description": "Kluczowa scena ukazująca triumf fizycznej brutalności nad intelektem."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-16-3-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj finałową scenę dramatu „Tango” Sławomira Mrożka:",
        "part_1": {
          "prompt": "Kto przejmuje władzę w rodzinie po śmierci Artura?",
          "options": [
            {
              "id": "A",
              "text": "Edek – uosobienie prymitywnej siły fizycznej i chamstwa"
            },
            {
              "id": "B",
              "text": "Wuj Eugeniusz"
            },
            {
              "id": "C",
              "text": "Stomil"
            }
          ]
        },
        "part_2": {
          "prompt": "Jaki taniec wykonuje zwycięzca z uległym wujem Eugeniuszem?",
          "options": [
            {
              "id": "1",
              "text": "Tango 'La Cumparsita'"
            },
            {
              "id": "2",
              "text": "Poloneza"
            },
            {
              "id": "3",
              "text": "Walca wiedeńskiego"
            }
          ]
        },
        "correct_answer": "A-1",
        "explanation": "Tango Edka z Eugeniuszem to groteskowa klamra dramatu – gdy intelekt i normy zawodzą, nastaje dyktatura prymitywnej przemocy.",
        "cke_tag": "Tango • Finałowe tango Edka",
        "instruction": "Zanalizuj finałową scenę dramatu „Tango” Sławomira Mrożka:",
        "math_statement": "",
        "title": "Sławomir Mrożek: Tango – upadek wartości i dyktatura prymitywnej siły",
        "topic": "Dział 16: Literatura współczesna – Bunt, system i moralność",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-17-1",
    "topic_id": "pol-dzial-17",
    "title": "Analiza tematu i formułowanie dojrzałej tezy",
    "theory_pill": {
      "concept_essence": "Teza to Twoja bezpośrednia odpowiedź na pytanie postawione w temacie wypracowania. Dobra teza nie może być banałem ani prostym powtórzeniem słów z polecenia – musi zapowiadać kierunek argumentacji.",
      "key_points": [
        "Wymóg CKE: minimum 300 słów. Praca poniżej 300 słów podlega surowej redukcji punktów za język i kompozycję!",
        "Wstęp wzorcowy (3 elementy): 1. Zdanie wprowadzające w problematykę, 2. Krótkie zdefiniowanie kluczowych pojęć tematu (np. wolność, bunt, tradycja), 3. Jasna, wieloaspektowa teza.",
        "Struktura pracy: Wstęp $\rightarrow$ Akapit 1 (Lektura obowiązkowa) $\rightarrow$ Akapit 2 (Inny utwór literacki) $\rightarrow$ Akapit 3 (Konteksty) $\rightarrow$ Zakończenie (synteza wniosków)."
      ],
      "golden_rule": "Nigdy nie pisz: 'W mojej pracy postaram się udowodnić, że...'. Sformułuj stanowisko wprost: 'Wybory moralne determinują tożsamość człowieka, jednak w warunkach próby skrajnej ich ocena wymyka się jednoznacznym kryteriom'.",
      "cke_trap": {
        "error": "Brak wyraźnego stanowiska (tezy) we wstępie.",
        "correct": "Jeśli egzaminator nie znajdzie w pracy tezy lub hipotezy, za kryterium 'Sformułowanie stanowiska' otrzymujesz 0/1 pkt, co rzutuje negatywnie na ocenę całej argumentacji!",
        "description": "Teza to kręgosłup całej pracy."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-17-1-1",
        "type": "SINGLE_CHOICE",
        "tier": "A",
        "points": 1,
        "question": "Temat brzmi: „Bunt jako źródło siły lub cierpienia człowieka”. Która z poniższych propozycji stanowi NAJLEPIEJ sformułowaną, dojrzałą tezę maturalną?",
        "options": [
          {
            "id": "A",
            "text": "„Bunt jest dla jednostki potężnym źródłem siły budującym podmiotowość, jednak w starciu z bezwzględnymi mechanizmami historii lub prawami transcendencji niemal zawsze okupiony jest cierpieniem i samotnością”.",
            "is_correct": true
          },
          {
            "id": "B",
            "text": "„Uważam, że bunt może być źródłem siły, ale może być też źródłem cierpienia, o czym przekonam w pracy”.",
            "is_correct": false
          },
          {
            "id": "C",
            "text": "„W literaturze jest wielu bohaterów, którzy się buntowali, na przykład Konrad i Kordian”.",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "„Bunt to bardzo ciekawy temat i każdy człowiek czasem się buntuje”.",
            "is_correct": false
          }
        ],
        "explanation": "Teza A jest dojrzała, problemowa, łączy oba człony tematu (siła vs cierpienie) i nakreśla filozoficzny wymiar argumentacji.",
        "cke_tag": "Wypracowanie • Formułowanie tezy",
        "instruction": "Temat brzmi: „Bunt jako źródło siły lub cierpienia człowieka”. Która z poniższych propozycji stanowi NAJLEPIEJ sformułowaną, dojrzałą tezę maturalną?",
        "math_statement": "",
        "title": "Analiza tematu i formułowanie dojrzałej tezy",
        "topic": "Dział 17: Konstrukcja Tezy i Architektura Rozprawki",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-18-1",
    "topic_id": "pol-dzial-18",
    "title": "Algorytm akapitu C-W-K: od twierdzenia do wniosku",
    "theory_pill": {
      "concept_essence": "Najczęstszym błędem na wypracowaniu jest streszczanie lektury (tzw. streszczalnictwo). CKE wymaga argumentacji: musisz udowadniać tezę za pomocą metody C-W-K.",
      "key_points": [
        "C (Cecha / Twierdzenie cząstkowe): Zdanie wprowadzające problem akapitu (np. 'Poczucie misji patriotycznej może prowadzić do samotności i pychy').",
        "W (Wątek / Dowód): Przywołanie konkretnej sceny, motywacji bohatera i cytatu (np. 'Widać to w postawie Konrada w Wielkiej Improwizacji...').",
        "K (Konkluzja): Podsumowanie akapitu, które bezpośrednio łączy wątek z Twoją tezą główną (np. 'Tym samym samotny bunt Konrada dowodzi, że jednostka bez oparcia w wspólnocie skazana jest na duchową klęskę')."
      ],
      "golden_rule": "Każdy akapit w rozwinięciu MUSI kończyć się wnioskiem cząstkowym odpowiadającym na pytanie z tematu pracy.",
      "cke_trap": {
        "error": "Opisywanie fabuły od początku do końca ('Wokulski pojechał na wojnę, zarobił pieniądze, wrócił, kupił kamienicę...').",
        "correct": "Wybieraj tylko tę jedną scenę, która bezpośrednio dowodzi Twojej tezy, i natychmiast ją interpretuj!",
        "description": "Za streszczanie fabuły CKE obniża ocenę za argumentację do 1–2 pkt zamiast 8 pkt."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-18-1-1",
        "type": "TWO_PART",
        "tier": "A",
        "points": 1,
        "question": "Zanalizuj budowę akapitu argumentacyjnego o Stanisławie Wokulskim:",
        "part_1": {
          "prompt": "Które z poniższych zdań stanowi poprawne TWIERDZENIE (C w metodzie C-W-K)?",
          "options": [
            {
              "id": "A",
              "text": "Wokulski urodził się w zubożałej rodzinie szlacheckiej i pracował u Hopfera w winiarni."
            },
            {
              "id": "B",
              "text": "Nawet wybitny racjonalizm i sukces ekonomiczny stają się bezradne w obliczu destrukcyjnej, romantycznej fascynacji drugim człowiekiem."
            },
            {
              "id": "C",
              "text": "Izabela Łęcka była córką Tomasza Łęckiego i mieszkała w Warszawie."
            }
          ]
        },
        "part_2": {
          "prompt": "Który element zamyka poprawny akapit argumentacyjny (K – Konkluzja)?",
          "options": [
            {
              "id": "1",
              "text": "Wniosek uogólniający, wyjaśniający, dlaczego przywołana sytuacja potwierdza tezę o rozdarciu bohatera"
            },
            {
              "id": "2",
              "text": "Kolejne streszczenie następnego rozdziału książki"
            },
            {
              "id": "3",
              "text": "Pytanie do egzaminatora o jego zdanie"
            }
          ]
        },
        "correct_answer": "B-1",
        "explanation": "Zdanie B formułuje uniwersalną myśl problemową (C), a poprawny akapit musi zamknąć się wnioskiem (K), a nie kolejnymi faktami fabularnymi.",
        "cke_tag": "Wypracowanie • Metoda C-W-K",
        "instruction": "Zanalizuj budowę akapitu argumentacyjnego o Stanisławie Wokulskim:",
        "math_statement": "",
        "title": "Algorytm akapitu C-W-K: od twierdzenia do wniosku",
        "topic": "Dział 18: Argumentacja metodą C-W-K",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-19-1",
    "topic_id": "pol-dzial-19",
    "title": "Typy kontekstów i zasada funkcjonalności",
    "theory_pill": {
      "concept_essence": "Kontekst na maturze to przywołanie wiedzy spoza samego utworu, która pozwala głębiej zrozumieć jego sens. CKE wymaga, aby kontekst był funkcjonalny – czyli wyjaśniał sens tekstu, a nie był tylko 'doklejonym faktem'.",
      "key_points": [
        "Kontekst historyczny: tło epoki (np. zsyłki na Sybir w Dziadach cz. III, powstanie styczniowe w Lalce i Glorii victis).",
        "Kontekst biograficzny: fakty z życia autora wpływające na dzieło (np. aresztowanie Mickiewicza w klasztorze bazylianów, pobyt Grudzińskiego w Jercewie).",
        "Kontekst filozoficzny: prądy myślowe (np. egzystencjalizm w Dżumie, stoicyzm w Trenach Kochanowskiego, mesjanizm).",
        "Kontekst literacki / kulturowy: porównanie motywu z innym dziełem (np. motyw winy i kary u Szekspira i Słowackiego)."
      ],
      "golden_rule": "Formuła funkcjonalnego kontekstu: 'Wiedza o [fakt z biografii/historii/filozofii] pozwala zrozumieć, że [interpretacja utworu]'.",
      "cke_trap": {
        "error": "Wypisanie daty urodzenia i śmierci pisarza bez powiązania z tematem.",
        "correct": "CKE uznaje taki kontekst za niefunkcjonalny (0 pkt za kontekst!). Kontekst musi oświetlać problem poruszony w pracy.",
        "description": "Zasada funkcjonalności to żelazny wymóg egzaminatora."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-19-1-1",
        "type": "MATCHING",
        "tier": "A",
        "points": 1,
        "question": "Dopasuj przywołanie kontekstu do jego właściwego typu:",
        "pairs": [
          {
            "concept": "Odwołanie do założeń stoickiej cnoty i równowagi emocjonalnej w Pieśniach",
            "definition": "Kontekst filozoficzny"
          },
          {
            "concept": "Wskazanie na traumę przeżyć więziennych Gustawa Herlinga-Grudzińskiego w łagrze",
            "definition": "Kontekst biograficzny"
          },
          {
            "concept": "Nawiązanie do represji carskich po powstaniu listopadowym i procesu filomatów",
            "definition": "Kontekst historyczny"
          }
        ],
        "explanation": "Prawidłowe nazwanie i zastosowanie kontekstu gwarantuje maksymalną ocenę w karcie ocen CKE.",
        "cke_tag": "Wypracowanie • Typy kontekstów",
        "instruction": "Dopasuj przywołanie kontekstu do jego właściwego typu:",
        "math_statement": "",
        "title": "Typy kontekstów i zasada funkcjonalności",
        "topic": "Dział 19: Matryca Kontekstów (Punkto-generator)",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  },
  {
    "id": "pol-lesson-20-1",
    "topic_id": "pol-dzial-20",
    "title": "Czym jest błąd kardynalny i jak go bezwzględnie unikać",
    "theory_pill": {
      "concept_essence": "Błąd kardynalny to całkowite przekłamanie sensu lektury obowiązkowej z gwiazdką, świadczące o jej nieznajomości (np. przypisanie bohaterowi czynów sprzecznych z wymową dzieła). Skutek: praca otrzymuje 0 PUNKTÓW!",
      "key_points": [
        "Błąd kardynalny dotyczy WYŁĄCZNIE lektur obowiązkowych poznawanych w całości!",
        "Przykłady błędów kardynalnych: 'Kordian zabił cara', 'Wokulski ożenił się z Izabelą', 'Roland stchórzył i uciekł z pola bitwy', 'Konrad w Dziadach walczył pod Wiedniem'.",
        "Zwykły błąd rzeczowy (np. pomyłka w imieniu drugoplanowego subiekta) kosztuje tylko utratę punktu z poprawności rzeczowej, ale NIE ZERUJE wypracowania."
      ],
      "golden_rule": "Złota zasada bezpieczeństwa: Jeśli nie pamiętasz dokładnie imienia jakiejś postaci lub nazwy wsi, opisz ją opisowo (np. 'stary subiekt', 'wieś pod Krakowem') – w ten sposób NIGDY nie popełnisz błędu rzeczowego ani kardynalnego!",
      "cke_trap": {
        "error": "Wymyślanie własnego zakończenia lektury z gwiazdką.",
        "correct": "Zawsze weryfikuj losy bohaterów: czy przeżyli, jak zginęli, co było ich motywacją.",
        "description": "Finały dzieł to najczęstsze pole występowania błędów kardynalnych."
      }
    },
    "formulaSheet": null,
    "formula_sheet": null,
    "tasks": [
      {
        "id": "task-pol-20-1-1",
        "type": "CARDINAL_TRAP",
        "tier": "A",
        "points": 1,
        "question": "Wskaż zdanie, które stanowi BŁĄD KARDYNALNY (skutkujący wyzerowaniem wypracowania):",
        "options": [
          {
            "id": "A",
            "text": "Kordian po ucieczce z sypialni cara został aresztowany i skazany na śmierć przez rozstrzelanie.",
            "is_correct": false
          },
          {
            "id": "B",
            "text": "Stanisław Wokulski poślubił Izabelę Łęcką i wspólnie wyjechali do Paryża, by założyć rodzinę.",
            "is_correct": true
          },
          {
            "id": "C",
            "text": "Cezary Baryka uczestniczył w manifestacji robotniczej zmierzającej w stronę Belwederu.",
            "is_correct": false
          },
          {
            "id": "D",
            "text": "Gospodarz z 'Wesela' przekazał złoty róg młodemu Jaśkowi.",
            "is_correct": false
          }
        ],
        "explanation": "Zdanie B to jaskrawy błąd kardynalny. Małżeństwo Wokulskiego z Izabelą nigdy nie doszło do skutku – zaręczyny zostały zerwane w pociągu po zdradzie Izabeli ze Starskim, co doprowadziło Wokulskiego do próby samobójczej i zniknięcia.",
        "cke_tag": "Błąd kardynalny • Lalka fałszywy finał",
        "instruction": "Wskaż zdanie, które stanowi BŁĄD KARDYNALNY (skutkujący wyzerowaniem wypracowania):",
        "math_statement": "",
        "title": "Czym jest błąd kardynalny i jak go bezwzględnie unikać",
        "topic": "Dział 20: Strażnik Błędów Kardynalnych i Egzamin Finałowy",
        "hints": {
          "level_1": "Definicja w leksykonie.",
          "level_2": "Kontekst tekstu."
        }
      }
    ]
  }
];
const lessonsMap: Record<string, LessonDocument> = {};
rawLessons.forEach((l) => { lessonsMap[l.id] = l as LessonDocument; });

export function getPolishFallbackLesson(lessonId: string): LessonDocument | null {
  if (!lessonId) return null;
  const clean = lessonId.replace(/^pol-/, '').replace(/^lesson-/, '');
  for (const key of Object.keys(lessonsMap)) {
    if (key === lessonId || key.endsWith(lessonId) || key.replace(/^pol-/, '').replace(/^lesson-/, '') === clean) {
      return lessonsMap[key];
    }
  }
  return null;
}

export function getPolishFallbackTopic(topicId: string): TopicDocument | null {
  return POLISH_FALLBACK_TOPICS.find(t => t.id === topicId || String(t.numericId) === topicId.replace(/\D/g, '')) || null;
}