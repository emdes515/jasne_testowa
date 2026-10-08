import { MathTask } from '../../types/mathTypes';
import { getAll1500MathTasks } from '../../services/maturaExamGenerator';

export const AUTHENTIC_CKE_TASKS: MathTask[] = [
  {
    "id": "matura-maj-2024-zad-1",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "1",
    "type": "SINGLE_CHOICE",
    "content": "Dana jest nierówność\n$$|x - 1| \\ge 3$$\nNa którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych spełniających powyższą nierówność? Wybierz właściwą odpowiedź spośród podanych.",
    "options": [
      {
        "id": "A",
        "text": "⟨-2, 4⟩",
        "is_correct": false,
        "numberLine": {
          "min": -5,
          "max": 7,
          "ticks": [
            -2,
            4
          ],
          "intervals": [
            {
              "from": -2,
              "to": 4,
              "fromIncluded": true,
              "toIncluded": true
            }
          ]
        }
      },
      {
        "id": "B",
        "text": "(-∞, -2⟩ ∪ ⟨4, +∞)",
        "is_correct": true,
        "numberLine": {
          "min": -5,
          "max": 7,
          "ticks": [
            -2,
            4
          ],
          "intervals": [
            {
              "from": null,
              "to": -2,
              "toIncluded": true
            },
            {
              "from": 4,
              "to": null,
              "fromIncluded": true
            }
          ]
        }
      },
      {
        "id": "C",
        "text": "(-2, 4)",
        "is_correct": false,
        "numberLine": {
          "min": -5,
          "max": 7,
          "ticks": [
            -2,
            4
          ],
          "intervals": [
            {
              "from": -2,
              "to": 4,
              "fromIncluded": false,
              "toIncluded": false
            }
          ]
        }
      },
      {
        "id": "D",
        "text": "(-∞, -2) ∪ (4, +∞)",
        "is_correct": false,
        "numberLine": {
          "min": -5,
          "max": 7,
          "ticks": [
            -2,
            4
          ],
          "intervals": [
            {
              "from": null,
              "to": -2,
              "toIncluded": false
            },
            {
              "from": 4,
              "to": null,
              "fromIncluded": false
            }
          ]
        }
      }
    ],
    "correct_answer": "B",
    "explanation": "Rozwiązujemy nierówność z wartością bezwzględną: $|x - 1| \\ge 3 \\iff x - 1 \\le -3 \\lor x - 1 \\ge 3 \\iff x \\le -2 \\lor x \\ge 4$.\nZbiorem rozwiązań jest suma przedziałów $(-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$.\nNa osi liczbowej zaznaczamy punkty $-2$ oraz $4$ z kółkami zamalowanymi (nierówność nieostra $\\ge$) i promieniami skierowanymi na zewnątrz (Rysunek B).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  ( 1\n16)\n8\n\\cdot 816  jest równa",
    "options": [
      {
        "id": "A",
        "text": "224",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "216",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "212",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "28",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-3",
    "topicId": "dzial-2",
    "sectionTitle": "Dział 2: Wyrażenia Algebraiczne i Wielomiany",
    "taskNumber": "3",
    "type": "OPEN_PROOF",
    "content": "Wykaż, że dla każdej liczby naturalnej  𝒏 \\ge 𝟏  liczba  𝒏𝟐 + (𝒏 + 𝟏)𝟐 + (𝒏 + 𝟐)𝟐  przy\ndzieleniu przez  𝟑  daje resztę  𝟐.\n3.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równoważnie dane wyrażenie \n \nn2 + (n + 1)2 + (n + 2)2 = n2 + n2 + 2n + 1 + n2 + 4n + 4 \n \n= 3n2 + 6n + 5 = 3 \\cdot (n2 + 2n + 1) + 2 \n \nPonieważ  n  jest liczbą naturalną, więc  n2 + 2n + 1  jest liczbą naturalną.  \nZatem  3 \\cdot (n2 + 2n + 1)  jest wielokrotnością liczby  3.  \nStąd  3 \\cdot (n2 + 2n + 1) + 2  przy dzieleniu przez  3  daje resztę  2.  \nTo należało wykazać.  \n \n \nSposób II \nLiczby  n,  n + 1,  n + 2  to trzy kolejne liczby naturalne, więc dokładnie jedna z nich jest \npodzielna przez  3, a dwie pozostałe nie są podzielne przez  3. \nKwadrat liczby podzielnej przez  3  jest również podzielny przez  3. \nKwadrat liczby niepodzielnej przez  3  daje przy dzieleniu przez  3  resztę  1.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-4",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "4",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  log\\sqrt3 9  jest równa",
    "options": [
      {
        "id": "A",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "9",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nWersja A Wersja B \nC B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-5",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "5",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdej liczby rzeczywistej  a  i dla każdej liczby rzeczywistej  b  wartość wyrażenia\n(2a + b)2 − (2a − b)2  jest równa wartości wyrażenia",
    "options": [
      {
        "id": "A",
        "text": "8a2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "8ab",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "−8ab",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "2b2",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nWersja A Wersja B \nB D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-6",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "6",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nZbiorem wszystkich rozwiązań nierówności\n1 − 3\n2 x < 2\n3 − x\njest przedział",
    "options": [
      {
        "id": "A",
        "text": "(−\\infty, − 2\n3)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−\\infty, 2\n3)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(− 2\n3 , +\\infty)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(2\n3 , +\\infty)",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nWersja A Wersja B \nD D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-7",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "7",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nRównanie  x+1\n(x+2)(x−3) = 0  w zbiorze liczb rzeczywistych",
    "options": [
      {
        "id": "A",
        "text": "nie ma rozwiązania.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "ma dokładnie jedno rozwiązanie:  (−1).",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "ma dokładnie dwa rozwiązania:  (−2)  oraz  3.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "ma dokładnie trzy rozwiązania:  (−1),  (−2)  oraz  3.",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-8",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "8",
    "type": "TRUE_FALSE",
    "content": "Dany jest wielomian  W(x) = 3x3 + 6x2 + 9x.\nOceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nWielomian  W  jest iloczynem wielomianów  𝐹(x) = 3x  i  𝐺(x) = x2 + 2x + 3. P F\nLiczba  (−1)  jest rozwiązaniem równania  W(x) = 0. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "PF",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nPF FP",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-9",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "9",
    "type": "OPEN_CALCULATION",
    "content": "Rozwiąż równanie\n𝒙𝟑 − 𝟐𝒙𝟐 − 𝟑𝒙 + 𝟔 = 𝟎\nZapisz obliczenia.\n9.\n0–1–\n2–3",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \nx3 − 2x2 − 3x + 6 = 0 \n \nx2(x − 2) − 3(x − 2) = 0 \n \n(x − 2)(x2 − 3) = 0 \n \n(x − 2)(x − \\sqrt3)(x + \\sqrt3) = 0 \n \nx − 2 = 0    lub    x − \\sqrt3 = 0    lub    x + \\sqrt3 = 0 \n \nx = 2    lub    x = \\sqrt3    lub    x = −\\sqrt3 \n \nRozwiązaniami równania są liczby:  (−\\sqrt3),  \\sqrt3,  2. \n \n \nSposób II \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \nx3 − 2x2 − 3x + 6 = 0 \n \nx(x2 − 3) − 2(x2 − 3) = 0 \n \n(x − 2)(x2 − 3) = 0",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 3,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-10",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "10",
    "type": "SINGLE_CHOICE",
    "content": "W październiku 2022 roku założono dwa sady, w których posadzono łącznie  1960  drzew.\nPo roku stwierdzono, że uschło  5%  drzew w pierwszym sadzie i  10%  drzew w drugim\nsadzie. Uschnięte drzewa usunięto, a nowych nie dosadzano.\nLiczba drzew, które pozostały w drugim sadzie, stanowiła  60%  liczby drzew, które\npozostały w pierwszym sadzie.\nNiech  x  oraz  y  oznaczają liczby drzew posadzonych – odpowiednio – w pierwszym\ni drugim sadzie.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nUkładem równań, którego poprawne rozwiązanie prowadzi do obliczenia liczby  x  drzew\nposadzonych w pierwszym sadzie oraz liczby  y  drzew posadzonych w drugim sadzie, jest",
    "options": [
      {
        "id": "A",
        "text": "{ x + y = 1960\n0,6 \\cdot 0,95x = 0,9y",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "{ x + y = 1960\n0,95x = 0,6 \\cdot 0,9y",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "{ x + y = 1960\n0,05x = 0,6 \\cdot 0,1y",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "{ x + y = 1960\n0,4 \\cdot 0,95x = 0,9y",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-11",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "11",
    "type": "SINGLE_CHOICE",
    "content": "Na rysunku, w kartezjańskim układzie współrzędnych  (x, y), przedstawiono dwie proste\nrównoległe, które są interpretacją geometryczną jednego z poniższych układów równań A–D.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nUkładem równań, którego interpretację geometryczną przedstawiono na rysunku, jest",
    "options": [
      {
        "id": "A",
        "text": "{\ny = − 3\n2 x + 3\ny = − 3\n2 x − 1",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "{\ny = 3\n2 x + 3\ny = − 2\n3 x − 1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "{\ny = 3\n2 x + 3\ny = 3\n2 x − 1",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "{\ny = − 3\n2 x − 3\ny = 3\n2 x + 1",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-12",
    "topicId": "dzial-5",
    "sectionTitle": "Dział 5: Funkcja Liniowa i Układy Równań",
    "taskNumber": "12",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja liniowa  f  jest określona wzorem  f(x) = (−2k + 3)x + k − 1, gdzie  k ∈ \\mathbb{R}.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja  f  jest malejąca dla każdej liczby  k  należącej do przedziału",
    "options": [
      {
        "id": "A",
        "text": "(−\\infty, 1)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−\\infty, − 3\n2)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(1, +\\infty)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(3\n2 , +\\infty)",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-13",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "13",
    "type": "SINGLE_CHOICE",
    "content": "Funkcje liniowe  f  oraz  g, określone wzorami  f(x) = 3x + 6  oraz  g(x) = ax + 7, mają\nto samo miejsce zerowe.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWspółczynnik  a  we wzorze funkcji  g  jest równy",
    "options": [
      {
        "id": "A",
        "text": "(− 7\n2)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(− 2\n7)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2\n7",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "7\n2",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD A",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-14_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "14.1",
    "type": "NUMERIC_INPUT",
    "content": "Uzupełnij poniższe zdanie. Wpisz odpowiedni przedział w wykropkowanym miejscu\ntak, aby zdanie było prawdziwe.\nZbiorem wszystkich rozwiązań nierówności  f(x) \\ge 0  jest przedział  ………………………  .",
    "correct_answer": "[−2,4]",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \n[−2,4] \n \nKryteria uwzględniające specyficzne trudności w uczeniu się matematyki \n \nJeśli zdający pomyli porządek liczb na osi liczbowej, np. zapisze zbiór rozwiązań nierówności \nw postaci  [4,−2], to otrzymuje 1 punkt.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-14_2",
    "topicId": "dzial-6",
    "sectionTitle": "Dział 6: Funkcja Kwadratowa",
    "taskNumber": "14.2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja kwadratowa  f  jest określona wzorem",
    "options": [
      {
        "id": "A",
        "text": "f(x) = −(x + 1)2 − 9",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "f(x) = −(x − 1)2 + 9",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "f(x) = −(x − 1)2 − 9",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "f(x) = −(x + 1)2 + 9",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB A",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-14_3",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "14.3",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla funkcji  f  prawdziwa jest równość",
    "options": [
      {
        "id": "A",
        "text": "f(−4) = f(6)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "f(−4) = f(5)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "f(−4) = f(4)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "f(−4) = f(7)",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-14_4",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "14.4",
    "type": "SINGLE_CHOICE",
    "content": "Funkcje kwadratowe  g  oraz  h  są określone za pomocą funkcji  f  (zobacz rysunek na\nstronie 13) następująco:  g(x) = f(x + 3),  h(x) = f(−x).\nNa rysunkach A–F przedstawiono, w kartezjańskim układzie współrzędnych  (x, y),\nfragmenty wykresów różnych funkcji – w tym fragment wykresu funkcji  g  oraz fragment\nwykresu funkcji  h.\nUzupełnij tabelę. Każdej z funkcji  𝒈  oraz  𝒉  przyporządkuj fragment jej wykresu.\nWpisz w każdą pustą komórkę tabeli właściwą odpowiedź, wybraną spośród\noznaczonych literami A–F.\nFragment wykresu funkcji  y = g(x)  przedstawiono na rysunku\nFragment wykresu funkcji  y = h(x)  przedstawiono na rysunku",
    "options": [
      {
        "id": "A",
        "text": "Wykres g(x): wierzchołek przesunięty o 3 w lewo do W=(0, 2); Wykres h(x): symetria względem OY, W=(-3, 2)",
        "is_correct": true
      },
      {
        "id": "B",
        "text": "Wykres g(x): wierzchołek W=(6, 2); Wykres h(x): wierzchołek W=(3, -2)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "Wykres g(x): wierzchołek W=(0, 5); Wykres h(x): wierzchołek W=(-3, -2)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "Wykres g(x): wierzchołek W=(3, 5); Wykres h(x): wierzchołek W=(3, 2)",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "dwie poprawne odpowiedzi. \n1 pkt – jedna poprawna odpowiedź. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA A \nE E",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-15",
    "topicId": "dzial-7",
    "sectionTitle": "Dział 7: Ciągi Liczbowe",
    "taskNumber": "15",
    "type": "TRUE_FALSE",
    "content": "Ciąg  (an)  jest określony wzorem  an = (−1)n \\cdot (n − 5)  dla każdej liczby\nnaturalnej  n \\ge 1.\nOceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nPierwszy wyraz ciągu  (an)  jest dwa razy większy od trzeciego wyrazu tego\nciągu. P F\nWszystkie wyrazy ciągu  (an)  są dodatnie. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "PF",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nPF PF",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-16",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "16",
    "type": "NUMERIC_INPUT",
    "content": "Trzywyrazowy ciąg  (12, 6, 2m − 1)  jest geometryczny.\nDokończ zdanie. Wybierz odpowiedź A albo B oraz odpowiedź 1., 2. albo 3.\nTen ciąg jest\nrosnący\noraz\n1. m = 1\n2A.\n2. m = 2\nmalejący B. 3. m = 3",
    "correct_answer": "B2",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB2 A2",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-17",
    "topicId": "dzial-7",
    "sectionTitle": "Dział 7: Ciągi Liczbowe",
    "taskNumber": "17",
    "type": "OPEN_CALCULATION",
    "content": "Ciąg arytmetyczny  (an)  jest określony dla każdej liczby naturalnej  n \\ge 1. Trzeci wyraz\ntego ciągu jest równy  (−1), a suma piętnastu początkowych kolejnych wyrazów tego ciągu\njest równa  (−165).\nOblicz różnicę tego ciągu. Zapisz obliczenia.\n17.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nKorzystamy ze wzorów na  n-ty wyraz i sumę  n  początkowych wyrazów ciągu \narytmetycznego i otrzymujemy układ równań \n \n{\n−1 = a1 + 2r\n−165 = 2a1 + 14r\n2 \\cdot 15\n \n \nPrzekształcając ten układ równoważnie, otrzymujemy \n \n{\n−1 = a1 + 2r\n−11 = a1 + 7r\n \n \nOdejmując stronami równania układu, otrzymujemy \n \n10 = −5r \n \nr = −2 \n \nRóżnica ciągu jest równa  (−2). \n \n \nSposób II \nSuma kolejnych piętnastu początkowych wyrazów ciągu arytmetycznego jest równa (−165), \nzatem \n \na1 + a2 + a3 + … + a15 = −165 \n \n(a3 − 2r) + (a3 − r) + a3 + (a3 + r) + (a3 + 2r) + … + (a3 + 12r) = −165 \n \n15a3 + (−2r − r + 0 + r + 2r + 3r + … + 12r) = −165 \n \ngdzie  a3 = −1, a suma piętnastu liczb  (−2r − r + 0 + r + 2r + 3r + … + 12r)  jest \nrówna \n \n−2r + 12r\n2 \\cdot 15 = 75r \n \nZatem \n \n15 \\cdot (−1) + 75r = −165 \n \n75r = −150 \n \nr = −2 \n \nRóżnica ciągu jest równa  (−2). \n \n \nSposób III \nSuma kolejnych piętnastu początkowych wyrazów ciągu arytmetycznego jest równa (−165), \nzatem \n \na1 + a15\n2 \\cdot 15 = −165 \n \na1 + a15 = −22 \n \n(a3 − 2r) + (a3 + 12r) = −22 \n \n2a3 + 10r = −22 \n \nStąd i z tego, że  a3 = −1, otrzymujemy \n \n2 \\cdot (−1) + 10r = −22 \n \nZatem \n \n10r = −20 \n \nr = −2 \n \nRóżnica ciągu jest równa  (−2). \n \n \nSposób IV \nSuma kolejnych piętnastu początkowych wyrazów ciągu arytmetycznego jest równa (−165), \nzatem \n \na1 + a2 + a3 + … + a15 = −165 \n \n(a8 − 7r) + (a8 − 6r) + … + a8 + … + (a8 + 6r) + (a8 + 7r) = −165 \n \n15a8 = −165 \n \na8 = −165\n15 = −11",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-18",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "18",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  zaznaczono kąt o mierze  \\alpha  taki, że\ntg \\alpha = −3  oraz  90° < \\alpha < 180°  (zobacz rysunek).\nUzupełnij zdanie. Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami\nA–F i wpisz te litery w wykropkowanych miejscach.\nPrawdziwe są zależności:  .............  oraz  ............  .",
    "options": [
      {
        "id": "A",
        "text": "sin \\alpha < 0",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "sin \\alpha \\cdot cos \\alpha < 0",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "sin \\alpha \\cdot cos \\alpha > 0",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "cos \\alpha > 0\nE.  sin \\alpha = − 1\n3 cos \\alpha  F.  sin \\alpha = −3 cos \\alpha",
        "is_correct": false
      }
    ],
    "correct_answer": "BF",
    "explanation": "wybranie dwóch odpowiedzi, z których obie są poprawne. \n1 pkt – wybranie jednej lub dwóch odpowiedzi, z których jedna jest poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nBF CF",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-19",
    "topicId": "dzial-8",
    "sectionTitle": "Dział 8: Trygonometria",
    "taskNumber": "19",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  sin3 20° + cos2 20° \\cdot sin 20°  jest równa",
    "options": [
      {
        "id": "A",
        "text": "cos 20°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "sin 20°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "tg 20°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "sin 20° \\cdot cos 20°",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB A",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-20",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "20",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest trójkąt  KLM,  w którym  |KM| = a,  |LM| = b  oraz  a \\ne b. Dwusieczna kąta\nKML  przecina bok  KL  w punkcie  𝑁  takim, że  |K𝑁| = c,  |𝑁L| = d  oraz  |M𝑁| = 𝑒\n(zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nW trójkącie  KLM  prawdziwa jest równość",
    "options": [
      {
        "id": "A",
        "text": "a \\cdot b = c \\cdot d",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "a \\cdot d = b \\cdot c",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "a \\cdot c = b \\cdot d",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "a \\cdot b = 𝑒 \\cdot 𝑒",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-21",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "21",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest równoległobok o bokach długości  3  i  4  oraz o kącie między nimi o mierze  120°.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPole tego równoległoboku jest równe",
    "options": [
      {
        "id": "A",
        "text": "12",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "12\\sqrt3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "6",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "6\\sqrt3",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-22",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "22",
    "type": "SINGLE_CHOICE",
    "content": "W trójkącie  ABC, wpisanym w okrąg o środku w punkcie  S, kąt  ACB  ma miarę  42°\n(zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nMiara kąta ostrego  BAS  jest równa",
    "options": [
      {
        "id": "A",
        "text": "42°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "45°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "48°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "69°",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-23",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "23",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  proste  k  oraz  𝑙  są określone równaniami\nk:   y = (m + 1)x + 7\n𝑙:   y = −2x + 7\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nProste  k  oraz  𝑙  są prostopadłe, gdy liczba  m  jest równa",
    "options": [
      {
        "id": "A",
        "text": "(− 1\n2)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "1\n2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(−3)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "1",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-24",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "24",
    "type": "OPEN_CALCULATION",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  dany jest równoległobok  ABCD, w którym\nA = (−2, 6)  oraz  B = (10, 2). Przekątne  AC  oraz  BD  tego równoległoboku przecinają\nsię w punkcie  P = (6, 7).\nOblicz długość boku  𝑩𝑪  tego równoległoboku. Zapisz obliczenia.\n24.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nPunkt  P  jest środkiem przekątnej  AC. Ze wzoru na współrzędne środka odcinka \notrzymujemy \n \n−2 + xc\n2 = 6    oraz    6 + yc\n2 = 7 \nZatem  C = (14,8). \n \nObliczamy długość odcinka  BC: \n \n|BC| = \\sqrt(14 − 10)2 + (8 − 2)2 = \\sqrt16 + 36 = \\sqrt52 = 2\\sqrt13 \n \n \nSposób II \nPunkt  P  jest środkiem przekątnej  BD. Ze wzoru na współrzędne środka odcinka \notrzymujemy \n \n10 + xd\n2 = 6    oraz    2 + yd\n2 = 7 \n \nZatem  D = (2,12). \n \nObliczamy długość odcinka  BC: \n \n|BC| = |AD| = \\sqrt(2 + 2)2 + (12 − 6)2 = \\sqrt16 + 36 = \\sqrt52 = 2\\sqrt13 \n \n \nSposób III \nObliczamy współrzędne punktu  S  środka odcinka  AB: \n \nS = (−2 + 10\n2 ,6 + 2\n2 ) \n \nS = (4,4) \n \nObliczamy długość odcinka  BC: \n \n|BC| = 2|PS| = 2\\sqrt(4 − 6)2 + (4 − 7)2 = 2\\sqrt4 + 9 = 2\\sqrt13",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-25_1",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "25.1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPole jednej ściany bocznej tego graniastosłupa jest równe",
    "options": [
      {
        "id": "A",
        "text": "36\\sqrt10",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "60",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "6\\sqrt10",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "360",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC A",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-25_2",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "25.2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nKąt nachylenia najdłuższej przekątnej graniastosłupa prawidłowego sześciokątnego do\npłaszczyzny podstawy jest zaznaczony na rysunku",
    "options": [
      {
        "id": "A",
        "text": "Kąt między krótszą przekątną graniastosłupa a krawędzią boczną",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "Kąt między najdłuższą przekątną graniastosłupa a krawędzią boczną",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "Kąt między krótszą przekątną graniastosłupa a płaszczyzną podstawy",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "Kąt między najdłuższą przekątną graniastosłupa a dłuższą przekątną podstawy (płaszczyzną podstawy)",
        "is_correct": true
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-26",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "26",
    "type": "NUMERIC_INPUT",
    "content": "Ostrosłup  𝐹1  jest podobny do ostrosłupa  𝐹2.\nObjętość ostrosłupa  𝐹1  jest równa  64.\nObjętość ostrosłupa  𝐹2  jest równa  512.\nUzupełnij poniższe zdanie. Wpisz odpowiednią liczbę w wykropkowanym miejscu tak,\naby zdanie było prawdziwe.\nStosunek pola powierzchni całkowitej ostrosłupa  𝐹2  do pola powierzchni całkowitej\nostrosłupa  𝐹1  jest równy  ……….  .",
    "correct_answer": "4",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \n4",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-27",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "27",
    "type": "SINGLE_CHOICE",
    "content": "Rozważamy wszystkie kody czterocyfrowe utworzone tylko z cyfr  1,  3,  6,  8, przy czym\nw każdym kodzie każda z tych cyfr występuje dokładnie jeden raz.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba wszystkich takich kodów jest równa",
    "options": [
      {
        "id": "A",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "10",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "24",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "16",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-28",
    "topicId": "dzial-14",
    "sectionTitle": "Dział 14: Statystyka",
    "taskNumber": "28",
    "type": "SINGLE_CHOICE",
    "content": "Średnia arytmetyczna trzech liczb:  a,  b,  c, jest równa  9.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nŚrednia arytmetyczna sześciu liczb:  a,  a,  b,  b,  c,  c, jest równa",
    "options": [
      {
        "id": "A",
        "text": "9",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "6",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4,5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "18",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-29",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "29",
    "type": "SINGLE_CHOICE",
    "content": "Na diagramie przedstawiono wyniki sprawdzianu z matematyki w pewnej klasie maturalnej.\nNa osi poziomej podano oceny, które uzyskali uczniowie tej klasy, a na osi pionowej podano\nliczbę uczniów, którzy otrzymali daną ocenę.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nMediana ocen uzyskanych z tego sprawdzianu przez uczniów tej klasy jest równa",
    "options": [
      {
        "id": "A",
        "text": "4,5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3,5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "3",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-30",
    "topicId": "dzial-13",
    "sectionTitle": "Dział 13: Rachunek Prawdopodobieństwa",
    "taskNumber": "30",
    "type": "OPEN_CALCULATION",
    "content": "Dany jest pięcioelementowy zbiór  K = {5, 6, 7, 8, 9}. Wylosowanie każdej liczby z tego\nzbioru jest jednakowo prawdopodobne. Ze zbioru  K  losujemy ze zwracaniem kolejno dwa\nrazy po jednej liczbie i zapisujemy je w kolejności losowania.\nOblicz prawdopodobieństwo zdarzenia  𝑨  polegającego na tym, że suma\nwylosowanych liczb jest liczbą parzystą. Zapisz obliczenia.\n30.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nZdarzeniami elementarnymi są wszystkie uporządkowane pary liczb  (x,y), gdzie   \nx,y ∈ {5,6,7,8,9}. \nLiczbę wszystkich zdarzeń elementarnych obliczamy, korzystając z reguły mnożenia.  \nMoc zbioru  Ω  jest równa  5 \\cdot 5 = 25. \nLiczbę wszystkich zdarzeń elementarnych sprzyjających zdarzeniu  A  obliczamy, \nkorzystając z reguły mnożenia i reguły dodawania. Suma dwóch liczb naturalnych jest liczbą \nparzystą, gdy sumujemy dwie liczby parzyste lub dwie liczby nieparzyste. Stąd moc zbioru  A  \njest równa  3 \\cdot 3 + 2 \\cdot 2 = 13. \nZatem prawdopodobieństwo zdarzenia  A  jest równe  13\n25 . \n \n \nSposób II \nW tabeli literą  A  zaznaczamy zdarzenia elementarne sprzyjające zdarzeniu  A  (pary liczb, \nktórych suma jest liczbą parzystą).  \n \n 5 6 7 8 9 \n5 A  A  A \n6  A  A  \n7 A  A  A \n8  A  A  \n9 A  A  A \n \nMoc zbioru  Ω  jest równa  25. \nZdarzeń sprzyjających wylosowaniu liczb, których suma jest parzysta, jest  13. \nZatem prawdopodobieństwo zdarzenia  A  jest równe  13\n25 . \n  \nSposób III (drzewo stochastyczne) \nRysujemy drzewo stochastyczne rozważanego doświadczenia. \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \nPrawdopodobieństwo zdarzenia  A  jest równe  \n \nP(A) = 2\n5 \\cdot 2\n5 + 3\n5 \\cdot 3\n5 = 13\n25",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2024-zad-31",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "31",
    "type": "OPEN_CALCULATION",
    "content": "W schronisku dla zwierząt, na płaskiej powierzchni, należy zbudować ogrodzenie z siatki\nwydzielające trzy identyczne wybiegi o wspólnych ścianach wewnętrznych.\nPodstawą każdego z tych trzech wybiegów jest prostokąt (jak pokazano na rysunku).\nDo wykonania tego ogrodzenia należy zużyć  36  metrów bieżących siatki.\nSchematyczny rysunek trzech wybiegów (widok z góry).\nLinią przerywaną zaznaczono siatkę.\nOblicz wymiary  𝒙  oraz  𝒚  jednego wybiegu, przy których suma pól podstaw tych\ntrzech wybiegów będzie największa. W obliczeniach pomiń szerokość wejścia na\nkażdy z wybiegów. Zapisz obliczenia.\n31.\n0–1–\n2–3–4\ny\ny\ny\nx\nwybieg 1.\nwybieg 2.\nwybieg 3.\nBRUDNOPIS (nie podlega ocenie)\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzyjmijmy oznaczenia jak na rysunku w zadaniu. Długość siatki użytej do wykonania \nogrodzenia – po uwzględnieniu warunków zadania – można zapisać równaniem \n \n4x + 6y = 36 \n \nStąd wyznaczamy  y:  y = 6 − 2\n3x. \n \nZ warunków zadania wynika, że \n \nx > 0       i       y > 0 \n \nNiech  P  oznacza sumę pól podstaw trzech wybiegów.  \nSuma pól podstaw trzech wybiegów jest równa polu prostokąta o bokach długości  x  oraz  3y. \nZatem \n \nP = 3xy  \n \nSumę pól podstaw trzech wybiegów zapisujemy jako funkcję jednej zmiennej  x. W tym celu \npodstawiamy  y = 6 − 2\n3x  i otrzymujemy \n \nP(x) = 3x (6 − 2\n3x) = −2x2 + 18x \n \nWyznaczamy dziedzinę funkcji  P. Wykorzystamy związek między wymiarami  x  i  y  oraz \nwykorzystamy warunki, jakie te wymiary spełniają \n \ny = 6 − 2\n3x > 0  oraz  x > 0 \n \nZatem \n \nx < 9  oraz  x > 0 \n \nZmienna  x  może przyjmować wartości z przedziału  (0,9). \n \nWykresem funkcji  P  jest fragment paraboli skierowanej ramionami do dołu. Obliczamy \npierwszą współrzędną wierzchołka paraboli: \n \np = − 18\n2 \\cdot (−2) = 4,5 ∈ (0,9) \n \nZatem funkcja  P  przyjmuje wartość największą dla argumentu  4,5. \n \nObliczamy drugi wymiar, dla którego suma pól podstaw trzech wybiegów jest największa \n \ny = 6 − 2\n3 \\cdot 4,5 = 3 \n \nSuma pól podstaw trzech wybiegów jest największa, gdy:  x = 4,5 m  oraz  y = 3 m. \n \n  \nSposób II \nPrzyjmijmy oznaczenia jak na rysunku w zadaniu. Długość siatki użytej do wykonania \nogrodzenia – po uwzględnieniu warunków zadania – można zapisać równaniem \n \n4x + 6y = 36 \n \nStąd wyznaczamy  x:  x = 9 − 3\n2y. \n \nZ warunków zadania wynika, że \n \nx > 0       i       y > 0 \n \nNiech  P  oznacza sumę pól podstaw trzech wybiegów.  \nSuma pól podstaw trzech wybiegów jest równa polu prostokąta o bokach długości  x  oraz  3y. \nZatem \n \nP = 3xy  \n \nSumę pól podstaw trzech wybiegów zapisujemy jako funkcję jednej zmiennej  y. W tym celu \npodstawiamy  x = 9 − 3\n2y  i otrzymujemy \n \nP(y) = 3(9 − 3\n2y)y = −9\n2y(y − 6) \n \nWyznaczamy dziedzinę funkcji  P. Wykorzystamy związek między wymiarami  x  i  y  oraz \nwykorzystamy warunki, jakie te wymiary spełniają \n \nx = 9 − 3\n2y > 0  oraz  y > 0 \n \nZatem \n \ny < 6  oraz  y > 0 \n \nZmienna  y  może przyjmować wartości z przedziału  (0,6). \n \nWykresem funkcji  P  jest fragment paraboli skierowanej ramionami do dołu. Pierwsza \nwspółrzędna wierzchołka paraboli jest średnią arytmetyczną pierwiastków równania: \n \n−9\n2y(y − 6) = 0 \n \nZatem pierwsza współrzędna wierzchołka paraboli jest równa \n \np = 0 + 6\n2 = 3 ∈ (0,6) \n \nZatem funkcja  P  przyjmuje wartość największą dla argumentu  3. \n \nObliczamy drugi wymiar, dla którego suma pól podstaw trzech wybiegów jest największa:  \n \nx = 9 − 3\n2 \\cdot 3 = 4,5 \n \nSuma pól podstaw trzech wybiegów jest największa, gdy:  x = 4,5 m  oraz  y = 3 m.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 4,
    "sourceYear": "Matura Maj 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  2−1 \\cdot 32\n3\n5\njest równa",
    "options": [
      {
        "id": "A",
        "text": "(−16)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−4)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "4",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD \n \n \n \n \n \n \n \n \n \n \n \n \n \n                                                \n1 Rozporządzenie Ministra Edukacji i Nauki z dnia 10 czerwca 2022 r. w sprawie wymagań egzaminacyjnych dla \negzaminu maturalnego przeprowadzanego w roku szkolnym 2022/2023 i 2023/2024 (Dz.U. 2022, poz.1246).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  log3 (3\n2) + log3 (2\n9)  jest równa",
    "options": [
      {
        "id": "A",
        "text": "log3\n31\n18",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "log3\n5\n11",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(−1)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "1\n3",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-3",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "3",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  (2\\sqrt10 + \\sqrt2)\n2\njest równa",
    "options": [
      {
        "id": "A",
        "text": "22",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "42",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "42 + 4\\sqrt5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "42 + 8\\sqrt5",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-4",
    "topicId": "dzial-14",
    "sectionTitle": "Dział 14: Statystyka",
    "taskNumber": "4",
    "type": "SINGLE_CHOICE",
    "content": "Klient wpłacił do banku na trzyletnią lokatę kwotę w wysokości  K0  zł. Po każdym rocznym\nokresie oszczędzania bank dolicza odsetki w wysokości  6%  od kwoty bieżącego kapitału\nznajdującego się na lokacie – zgodnie z procentem składanym.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPo trzech latach oszczędzania w tym banku kwota na lokacie (bez uwzględniania podatków)\njest równa",
    "options": [
      {
        "id": "A",
        "text": "K0 \\cdot (1,06)3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "K0 \\cdot (1,02)3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "K0 \\cdot (1,03)6",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "K0 \\cdot 1,18",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-5",
    "topicId": "dzial-2",
    "sectionTitle": "Dział 2: Wyrażenia Algebraiczne i Wielomiany",
    "taskNumber": "5",
    "type": "OPEN_PROOF",
    "content": "Wykaż, że dla każdej liczby naturalnej  𝒏 \\ge 𝟏  liczba  𝟓𝒏𝟑 − 𝟓𝒏  jest podzielna przez  𝟑𝟎.",
    "correct_answer": "A",
    "explanation": "Przekształcamy wyrażenie  5n3 − 5n  do postaci iloczynu \n \n5n3 − 5n = 5n(n2 − 1) = 5n(n − 1)(n + 1)  \n \nJeden z czynników w rozkładzie jest równy  5, więc liczba  5n(n − 1)(n + 1)  jest podzielna \nprzez  5.  Wśród każdych trzech kolejnych liczb całkowitych  n − 1, n, n + 1  co najmniej \njedna jest podzielna przez  2  i dokładnie jedna jest podzielna przez  3.  \nZatem liczba  5n(n − 1)(n + 1)  dzieli się przez  5  oraz przez  2  oraz przez  3. \nPonadto liczby  2,  3,  5  są parami względnie pierwsze. \nZatem liczba  5n3 − 5n = 5n(n2 − 1) = 5n(n − 1)(n + 1)  jest podzielna przez  30. \nTo kończy dowód.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-6",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "6",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba wszystkich całkowitych dodatnich rozwiązań nierówności\n3x − 5\n12 < 1\n3\njest równa",
    "options": [
      {
        "id": "A",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "6",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-7",
    "topicId": "dzial-5",
    "sectionTitle": "Dział 5: Funkcja Liniowa i Układy Równań",
    "taskNumber": "7",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nUkład równań  { x − 2y = 3\n−4x + 8y = −12",
    "options": [
      {
        "id": "A",
        "text": "nie ma rozwiązań.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "ma dokładnie jedno rozwiązanie.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "ma dokładnie dwa rozwiązania.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "ma nieskończenie wiele rozwiązań.",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-8",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "8",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdej liczby rzeczywistej  x  różnej od:  (−1),  0  i  1, wartość wyrażenia  2x2\nx2−1 \\cdot x+1\nx\njest równa wartości wyrażenia",
    "options": [
      {
        "id": "A",
        "text": "2x + 2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "2x\nx−1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2x\nx2−1",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "2x3+1\nx3−1",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-9",
    "topicId": "dzial-2",
    "sectionTitle": "Dział 2: Wyrażenia Algebraiczne i Wielomiany",
    "taskNumber": "9",
    "type": "NUMERIC_INPUT",
    "content": "Wielomian  W(x) = ax3 + bx2 + cx + d  jest iloczynem wielomianów  𝐹(x) = (2 − 3x)2\noraz  𝐺(x) = 3x − 2.\nUzupełnij poniższe zdanie. Wpisz odpowiednią liczbę w wykropkowanym miejscu tak,\naby zdanie było prawdziwe.\nSuma  a + b + c + d  współczynników wielomianu  W  jest równa  ……….  .",
    "correct_answer": "1",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \n1",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-10",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "10",
    "type": "OPEN_CALCULATION",
    "content": "Rozwiąż równanie\n𝟒𝒙𝟑 − 𝟏𝟐𝒙𝟐 − 𝒙 + 𝟑 = 𝟎\nZapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \n4x3 − 12x2 − x + 3 = 0 \n \n4x2(x − 3) − (x − 3) = 0 \n \n(x − 3)(4x2 − 1) = 0 \n \n(x − 3)(2x − 1)(2x + 1) = 0 \n \nx − 3 = 0    lub    2x − 1 = 0    lub    2x + 1 = 0 \n \nx = 3    lub    x = 1\n2    lub    x = −1\n2 \n \nRozwiązaniami równania są liczby:  (−1\n2),  1\n2,  3. \n \nSposób II \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów:",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 3,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-11_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "11.1",
    "type": "NUMERIC_INPUT",
    "content": "Uzupełnij poniższe zdanie. Wpisz odpowiedni przedział w wykropkowanym miejscu\ntak, aby zdanie było prawdziwe.\nZbiorem wszystkich rozwiązań nierówności  f(x) \\le 2  jest przedział  ………………………  .",
    "correct_answer": "[0,4]",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \n[0,4] \n \nKryteria uwzględniające specyficzne trudności w uczeniu się matematyki \n \nJeśli zdający pomyli porządek liczb na osi liczbowej, np. zapisze zbiór rozwiązań nierówności \nw postaci  [4,0], to otrzymuje 1 punkt.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-11_2",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "11.2",
    "type": "NUMERIC_INPUT",
    "content": "Na rysunku 2., w kartezjańskim układzie współrzędnych  (x, y), przedstawiono wykres funkcji  g,\npowstałej w wyniku przesunięcia równoległego wykresu funkcji  f  wzdłuż osi  Ox\no  4  jednostki w lewo.\nRysunek 2.\nDokończ zdanie. Wybierz odpowiedź A, B albo C oraz odpowiedź 1. albo 2.\nFunkcje  f  i  g  są powiązane zależnością\nA. g(x) = f(x + 4)\noraz mają takie same\n1. dziedziny.\nB. g(x) = f(x − 4)\n2. zbiory wartości. C. g(x) = f(x) − 4",
    "correct_answer": "A2",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA2",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-12",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "12",
    "type": "TRUE_FALSE",
    "content": "Funkcja  y = f(x)  jest określona za pomocą tabeli\n𝒙 −2 −1 0 1 2\n𝒚 −1 0 1 0 3\nOceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nFunkcja  f  ma dokładnie jedno miejsce zerowe.  P F\nW kartezjańskim układzie współrzędnych  (x, y)  wykres funkcji  f  jest\nsymetryczny względem osi  Oy. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "FF",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nFF",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-13",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "13",
    "type": "SINGLE_CHOICE",
    "content": "Liczba  2  jest miejscem zerowym funkcji liniowej  f(x) = (3 − m)x + 4.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  m  jest równa",
    "options": [
      {
        "id": "A",
        "text": "0",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "5",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-14",
    "topicId": "dzial-6",
    "sectionTitle": "Dział 6: Funkcja Kwadratowa",
    "taskNumber": "14",
    "type": "OPEN_CALCULATION",
    "content": "Parabola, która jest wykresem funkcji kwadratowej  f, ma z osiami kartezjańskiego układu\nwspółrzędnych  (x, y)  dokładnie dwa punkty wspólne:  M = (0, 18)  oraz  𝑁 = (3, 0).\nWyznacz wzór funkcji kwadratowej  𝒇. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I  \nPonieważ punkt  𝑁 = (3,0)  jest jedynym punktem wspólnym wykresu funkcji  f  i osi  Ox, \nwięc jest to wierzchołek paraboli będącej wykresem funkcji  f.  \n \nZapisujemy wzór funkcji  f  w postaci kanonicznej: \n \nf(x) = a(x − 3)2,  gdzie  a \\ne 0 \n \nPunkt  M = (0,18)  leży na wykresie funkcji  f, zatem \n \nf(0) = 18 \n \na(0 − 3)2 = 18 \n \n9a = 18 \n \na = 2 \n \nZatem  f(x) = 2(x − 3)2 .",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-15_1",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "15.1",
    "type": "SINGLE_CHOICE",
    "content": "Na jednym z rysunków A–D przedstawiono, w kartezjańskim układzie współrzędnych  (x, y),\nfragment wykresu funkcji  y = f(x).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFragment wykresu funkcji  y = f(x)  przedstawiono na rysunku",
    "options": [
      {
        "id": "A",
        "text": "Parabola o wierzchołku W = (1, 4) i ramionach skierowanych w dół",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "Parabola o wierzchołku W = (-1, 4) i ramionach skierowanych w dół, przechodząca przez (0, 3)",
        "is_correct": true
      },
      {
        "id": "C",
        "text": "Parabola o wierzchołku W = (-1, -4) i ramionach skierowanych w górę",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "Parabola o wierzchołku W = (1, -4) i ramionach skierowanych w górę",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-15_2",
    "topicId": "dzial-4",
    "sectionTitle": "Dział 4: Własności Funkcji i Odczytywanie Wykresów",
    "taskNumber": "15.2",
    "type": "TRUE_FALSE",
    "content": "Oceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nWykres funkcji  f  przecina oś  Oy  kartezjańskiego układu współrzędnych\n(x, y)  w punkcie o współrzędnych  (0, 4).  P F\nMiejsca zerowe funkcji  f  są równe:  (−3)  oraz  1. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "FP",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nFP",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-16_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "16.1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nSuma dziesięciu początkowych kolejnych wyrazów tego ciągu jest równa",
    "options": [
      {
        "id": "A",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "7",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "50",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "100",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-16_2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "16.2",
    "type": "TRUE_FALSE",
    "content": "Oceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nCiąg  (an)  jest malejący. P F\nCiąg  (an)  jest geometryczny. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "FF",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nFF",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-17",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "17",
    "type": "SINGLE_CHOICE",
    "content": "W ciągu arytmetycznym  (an), określonym dla każdej liczby naturalnej  n \\ge 1, dane są\nwyrazy:  a1 = 7  oraz  a2 = 13.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWyraz  a10  jest równy",
    "options": [
      {
        "id": "A",
        "text": "(−47)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "52",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "61",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "67",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-18",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "18",
    "type": "SINGLE_CHOICE",
    "content": "Trzywyrazowy ciąg  (−1, 2, x)  jest arytmetyczny.\nTrzywyrazowy ciąg  (−1, 2, y)  jest geometryczny.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczby  x  oraz  y  spełniają warunki",
    "options": [
      {
        "id": "A",
        "text": "x > 0   i   y > 0",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "x > 0   i   y < 0",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "x < 0   i   y > 0",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "x < 0   i   y < 0",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-19",
    "topicId": "dzial-8",
    "sectionTitle": "Dział 8: Trygonometria",
    "taskNumber": "19",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  1 + cos2 27°  jest równa",
    "options": [
      {
        "id": "A",
        "text": "2 − sin2 27°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "sin2 27°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2 + sin2 27°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "2",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-20",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "20",
    "type": "SINGLE_CHOICE",
    "content": "Podstawy trapezu prostokątnego  ABCD  mają długości:  |AB| = 8  oraz  |CD| = 5.\nWysokość  AD  tego trapezu ma długość  \\sqrt3  (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nMiara kąta ostrego  ABC  jest równa",
    "options": [
      {
        "id": "A",
        "text": "15°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "30°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "45°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "60°",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-21",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "21",
    "type": "SINGLE_CHOICE",
    "content": "Punkty  A,  B  oraz  C  leżą na okręgu o środku w punkcie  S. Długość łuku  AB, na którym\njest oparty kąt wpisany  ACB, jest równa  1\n5  długości okręgu (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nMiara kąta ostrego  ACB  jest równa",
    "options": [
      {
        "id": "A",
        "text": "18°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "30°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "36°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "72°",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-22",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "22",
    "type": "OPEN_CALCULATION",
    "content": "Bok kwadratu  ABCD  ma długość równą  12. Punkt  S  jest środkiem boku  BC  tego\nkwadratu. Na odcinku  AS  leży punkt  P  taki, że odcinek  BP  jest prostopadły do odcinka  AS.\nOblicz długość odcinka  𝑩𝑷. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nPunkt  S  jest środkiem odcinka  BC, więc  |BS| = 6. \nTrójkąt  ABS  jest prostokątny. Odcinek  BP  jest wysokością trójkąta  ABS  poprowadzoną \nna przeciwprostokątną  AS  (jak na rysunku). \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n A \n B \nC \nD \nS \nP \n12 \n6 \nZ twierdzenia Pitagorasa obliczamy długość odcinka  AS \n \n|AS|2 = 122 + 62 \n \n|AS|2 = 180 \n \n|AS| = \\sqrt180 = 6\\sqrt5 \n \nPonieważ odcinek  BP  jest wysokością trójkąta prostokątnego poprowadzoną na \nprzeciwprostokątną, więc \n \n|BP| =\n|AB| \\cdot |BS|\n|AS| = 12 \\cdot 6\n6\\sqrt5\n= 12\n\\sqrt5\n= 12\\sqrt5\n5  \n  \n \nDługość odcinka  BP  jest równa  12\\sqrt5\n5\n . \n \n \nSposób II \nPunkt  S  jest środkiem odcinka  BC, więc  |BS| = 6. \nTrójkąt  ABS  jest prostokątny. Odcinek  BP  jest wysokością trójkąta  ABS  poprowadzoną \nna przeciwprostokątną  AS  (jak na rysunku). \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \nZ twierdzenia Pitagorasa obliczamy długość odcinka  AS \n \n|AS|2 = 122 + 62 \n \n|AS|2 = 180 \n \n|AS| = \\sqrt180 = 6\\sqrt5 \n \nPole trójkąta  ABS  jest równe \nPABS = 1\n2 \\cdot 6\\sqrt5 \\cdot |BP| \n \nPonadto pole trójkąta  ABS  można obliczyć jako połowę iloczynu długości przyprostokątnych \n \nPABS = 1\n2 \\cdot 12 \\cdot 6 = 36 \n \nA \n B \nC \nD \nS \nP \n12 \n6",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-23_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "23.1",
    "type": "TRUE_FALSE",
    "content": "Oceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nDo okręgu  𝒪  należy punkt o współrzędnych  (−1, −3). P F\nPromień okręgu  𝒪  jest równy  5. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "PF",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nPF",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-23_2",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "23.2",
    "type": "SINGLE_CHOICE",
    "content": "Okrąg  𝒦  jest obrazem okręgu  𝒪  w symetrii środkowej względem początku układu\nwspółrzędnych.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nOkrąg  𝒦  jest określony równaniem",
    "options": [
      {
        "id": "A",
        "text": "(x − 1)2 + (y + 2)2 = 5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(x + 1)2 + (y + 2)2 = 5",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(x − 1)2 + (y − 2)2 = 5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(x + 1)2 + (y − 2)2 = 5",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-24",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "24",
    "type": "OPEN_CALCULATION",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  dane są punkty  A = (2, 8)  oraz\nB = (10, 2). Symetralna odcinka  AB  przecina oś  Ox  układu współrzędnych w punkcie  P.\nOblicz współrzędne punktu  𝑷  oraz  długość odcinka  𝑨𝑷. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nObliczamy współczynnik kierunkowy prostej  AB: \n \naAB = 2 − 8\n10 − 2 = −3\n4 \n \nZatem współczynnik kierunkowy symetralnej  k  odcinka  AB  jest równy \n \nak = 4\n3 \n \nSymetralna  k  przechodzi przez środek  M  odcinka  AB. Obliczamy współrzędne punktu  M: \n \nM = (2 + 10\n2 ,8 + 2\n2 ) = (6,5) \n \nZatem prosta  k  ma równanie postaci \n \ny = 4\n3(x − 6) + 5 \n \ny = 4\n3x − 3 \n \nPunkt  P  jest punktem przecięcia symetralnej  k  z osią  Ox, więc współrzędne  \npunktu  P = (xp,yp)  spełniają równania \n \nyp = 4\n3xp − 3     oraz     yp = 0 \n \nStąd otrzymujemy: \n \n0 = 4\n3xp − 3     oraz     yp = 0 \n \nxp = 9\n4     oraz     yp = 0 \n \nZatem  P = (9\n4,0) \n \nObliczamy długość odcinka  AP: \n \n|AP| = \\sqrt(9\n4 − 2)\n2\n+ (0 − 8)2 = \\sqrt(1\n4)\n2\n+ (−8)2 = \\sqrt 1\n16 + 64 = \\sqrt1025\n16 = 5\\sqrt41\n4  \n  \nSposób II \nPonieważ punkt  P  leży na osi  Ox, więc jego współrzędne są równe  P = (xp,0). \n \nPonieważ  punkt  P  leży na symetralnej odcinka  AB, więc  |AP| = |BP|. \nStąd i ze wzoru na odległość między dwoma punktami otrzymujemy równanie \n \n\\sqrt(xp − 2)\n2\n+ (0 − 8)2 = \\sqrt(xp − 10)\n2\n+ (0 − 2)2 \n \n(xp − 2)\n2\n+ (0 − 8)2 = (xp − 10)\n2\n+ (0 − 2)2 \n \nxp\n2 − 4xp + 4 + 64 = xp\n2 − 20xp + 100 + 4 \n \n16xp = 36 \n \nxp = 9\n4 \n \nZatem  P = (9\n4,0). \n \nObliczamy długość odcinka  AP: \n \n|AP| = \\sqrt(9\n4 − 2)\n2\n+ (0 − 8)2 = \\sqrt(1\n4)\n2\n+ (−8)2 = \\sqrt 1\n16 + 64 = \\sqrt1025\n16 = 5\\sqrt41\n4",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 4,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-25",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "25",
    "type": "SINGLE_CHOICE",
    "content": "Ostrosłup prawidłowy ma  2024  ściany boczne.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba wszystkich krawędzi tego ostrosłupa jest równa",
    "options": [
      {
        "id": "A",
        "text": "2025",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "2026",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4048",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "4052",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-26",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "26",
    "type": "SINGLE_CHOICE",
    "content": "Przekątna ściany sześcianu ma długość  2\\sqrt2.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nObjętość tego sześcianu jest równa",
    "options": [
      {
        "id": "A",
        "text": "8",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "24",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "16\\sqrt6\n9",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "16\\sqrt2",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-27",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "27",
    "type": "SINGLE_CHOICE",
    "content": "Podstawą graniastosłupa prawidłowego czworokątnego jest kwadrat o boku długości  4.\nPrzekątna tego graniastosłupa jest nachylona do płaszczyzny podstawy pod kątem  \\alpha  takim,\nże  tg \\alpha = 2  (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWysokość tego graniastosłupa jest równa",
    "options": [
      {
        "id": "A",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "8",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "8\\sqrt2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "16\\sqrt2",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-28",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "28",
    "type": "SINGLE_CHOICE",
    "content": "Na diagramie przedstawiono wyniki sprawdzianu z matematyki w pewnej klasie maturalnej.\nNa osi poziomej podano oceny, które uzyskali uczniowie tej klasy, a na osi pionowej podano\nliczbę uczniów, którzy otrzymali daną ocenę.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nŚrednia arytmetyczna ocen uzyskanych z tego sprawdzianu przez uczniów tej klasy jest\nrówna",
    "options": [
      {
        "id": "A",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3,12",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3,5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "4,1(6)",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-29",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "29",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWszystkich liczb naturalnych czterocyfrowych parzystych, w których zapisie dziesiętnym\nwystępują tylko cyfry  2,  4,  7  (np.:  7272,  2222,  7244), jest",
    "options": [
      {
        "id": "A",
        "text": "16",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "27",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "54",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "81",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-30",
    "topicId": "dzial-13",
    "sectionTitle": "Dział 13: Rachunek Prawdopodobieństwa",
    "taskNumber": "30",
    "type": "SINGLE_CHOICE",
    "content": "W pudełku znajdują się wyłącznie kule białe i czarne. Kul czarnych jest  18.\nZ tego pudełka w sposób losowy wyciągamy jedną kulę.\nPrawdopodobieństwo zdarzenia polegającego na tym, że wyciągniemy kulę czarną,\njest równe  3\n5\n.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba kul białych w pudełku, przed wyciągnięciem jednej kuli, była równa",
    "options": [
      {
        "id": "A",
        "text": "9",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "12",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "15",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "30",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-31",
    "topicId": "dzial-13",
    "sectionTitle": "Dział 13: Rachunek Prawdopodobieństwa",
    "taskNumber": "31",
    "type": "OPEN_CALCULATION",
    "content": "Doświadczenie losowe polega na dwukrotnym rzucie symetryczną sześcienną kostką do gry,\nktóra na każdej ściance ma inną liczbę oczek – od jednego oczka do sześciu oczek.\nOblicz prawdopodobieństwo zdarzenia  𝑨  polegającego na tym, że w pierwszym\nrzucie wypadnie większa liczba oczek niż w drugim rzucie. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nW tabeli literą  A  zaznaczamy zdarzenia elementarne sprzyjające zdarzeniu  A. \n \n 𝟏 𝟐 𝟑 𝟒 𝟓 𝟔 \n𝟏       \n𝟐 A      \n𝟑 A A     \n𝟒 A A A    \n𝟓 A A A A   \n𝟔 A A A A A  \n \nMoc zbioru  Ω  jest równa  36. \nZdarzeń sprzyjających zdarzeniu  A  jest  15. \nZatem prawdopodobieństwo zdarzenia  A  jest równe  15\n36 = 5\n12\n . \n \n \nSposób II (drzewo stochastyczne) \nRysujemy fragment drzewa stochastycznego rozważanego doświadczenia z uwzględnieniem \nwszystkich istotnych gałęzi. \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \nPrawdopodobieństwo zdarzenia  A  jest równe \n \nP(A) = 1\n6 \\cdot 1\n6 + 1\n6 \\cdot 2\n6 + 1\n6 \\cdot 3\n6 + 1\n6 \\cdot 4\n6 + 1\n6 \\cdot 5\n6 = 15\n36 = 5\n12 \n  \n2 \n 3 \n 4 \n 5 \n 6 \n1 \n 1 \n2 \n1 \n2 \n3 \n1 \n2 \n3 \n4 \n1 \n2 \n3 \n4 \n5 \n1\n6 \n2\n6 \n3\n6 \n4\n6 \n5\n6 \n1\n6 \n1\n6 \n1\n6 \n1\n6 \n1\n6",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2024-zad-32",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "32",
    "type": "SINGLE_CHOICE",
    "content": "Właściciel sklepu z zabawkami przeprowadził lokalne badanie rynkowe dotyczące wpływu\nzmiany ceny zestawu klocków na liczbę kupujących ten produkt. Z badania wynika, że\ndzienny przychód  P  ze sprzedaży zestawów klocków, w zależności od kwoty obniżki ceny\nzestawu o  x  zł, wyraża się wzorem\nP(x) = (70 − x)(20 + x)\ngdzie  x  jest liczbą całkowitą spełniającą warunki  x \\ge 0  i  x \\le 60.\nUzupełnij tabelę. Wpisz w każdą pustą komórkę tabeli właściwą odpowiedź, wybraną\nspośród oznaczonych literami A–E.\n32.1.\nDzienny przychód ze sprzedaży zestawów klocków będzie największy,\ngdy liczba  x  jest równa\n32.2. Dzienny przychód ze sprzedaży zestawów klocków będzie równy  800  zł,\ngdy liczba  x  jest równa",
    "options": [
      {
        "id": "A",
        "text": "25",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "30",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "45",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "50 E.  60",
        "is_correct": false
      }
    ],
    "correct_answer": "32.1. A",
    "explanation": "wybranie dwóch poprawnych odpowiedzi. \n1 pkt – wybranie jednej poprawnej odpowiedzi. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \n32.1. A \n32.2. E \n  \n \nObowiązują zasady oceniania stosowane przy sprawdzaniu prac zdających bez stwierdzonej \ndyskalkulii z dodatkowym uwzględnieniem: \nI. ogólnych zasad oceniania zadań otwartych w przypadku arkuszy osób ze \nstwierdzoną dyskalkulią (punkty 1.–12.); \nII. dodatkowych szczegółowych zasad oceniania zadań otwartych w przypadku arkuszy \nosób ze stwierdzoną dyskalkulią – egzamin maturalny z matematyki, poziom \npodstawowy, termin dodatkowy 2024. \n \n \nI. Ogólne zasady oceniania zadań otwartych w przypadku arkuszy osób ze stwierdzoną \ndyskalkulią \n \n1. Nie należy traktować jako błędy merytoryczne pomyłek, wynikających z: \n• błędnego przepisania \n• przestawienia cyfr \n• zapisania innej cyfry, ale o podobnym wyglądzie \n• przestawienia położenia przecinka \n• przestawienia położenia znaku liczby. \n2. W przypadku błędów, wynikających ze zmiany znaku liczby, należy w każdym zadaniu \noddzielnie przeanalizować, czy zdający opanował inne umiejętności, poza \numiejętnościami rachunkowymi, oceniane w zadaniu. W przypadku opanowania \nbadanych umiejętności zdający powinien otrzymać przynajmniej 1 punkt. \n3. We wszystkich zadaniach otwartych, w których wskazano poprawną metodę \nrozwiązania, części lub całości zadania, zdającemu należy przyznać przynajmniej \n1 punkt, zgodnie z kryteriami do poszczególnych zadań. \n4. Jeśli zdający przedstawia nieprecyzyjne zapisy, na przykład pomija nawiasy lub \nzapisuje nawiasy w niewłaściwych miejscach, ale przeprowadza poprawne \nrozumowanie lub stosuje właściwą strategię, to może otrzymać przynajmniej 1 punkt \nza rozwiązanie zadania. \n5. W przypadku zadania wymagającego wyznaczenia pierwiastków trójmianu \nkwadratowego zdający może otrzymać 1 punkt, jeżeli przedstawi poprawną metodę \nwyznaczania pierwiastków trójmianu kwadratowego, przy podanych w treści zadania \nwartościach liczbowych. \n6. W przypadku zadania wymagającego rozwiązania nierówności kwadratowej zdający \nmoże otrzymać 1 punkt, jeżeli stosuje poprawny algorytm rozwiązywania nierówności \nkwadratowej, przy podanych w treści zadania wartościach liczbowych. \n7. W przypadku zadania wymagającego stosowania własności funkcji kwadratowej \nzdający może otrzymać 1 punkt za wykorzystanie konkretnych własności funkcji \nkwadratowej, istotnych przy poszukiwaniu rozwiązania. \n8. W przypadku zadania wymagającego zastosowania własności ciągów arytmetycznych \nlub geometrycznych zdający może otrzymać 1 punkt, jeżeli przedstawi wykorzystanie \ntakiej własności ciągu, która umożliwia znalezienie rozwiązania zadania. \n9. W przypadku zadania wymagającego analizowania figur geometrycznych na \npłaszczyźnie kartezjańskiej zdający może otrzymać punkty, jeżeli przy poszukiwaniu \nrozwiązania przedstawi poprawne rozumowanie, wykorzystujące własności figur \ngeometrycznych lub zapisze zależności, pozwalające rozwiązać zadanie. \n10. W przypadku zadania z rachunku prawdopodobieństwa zdający może otrzymać \nprzynajmniej 1 punkt, jeśli przy wyznaczaniu liczby zdarzeń elementarnych \nsprzyjających rozważanemu zdarzeniu przyjmuje określoną regularność lub podaje \nprawidłową metodę wyznaczenia tej liczby zdarzeń elementarnych. \n11. W przypadku zadania z geometrii zdający może otrzymać przynajmniej 1 punkt, jeżeli \npodaje poprawną metodę wyznaczenia długości odcinka potrzebnej do znalezienia \nrozwiązania. \n12. W przypadku zadania wymagającego przeprowadzenia dowodu (z zakresu algebry lub \ngeometrii), jeśli w przedstawionym rozwiązaniu zdający powoła się na własność, która \nwyznacza istotny postęp, prowadzący do przeprowadzenia dowodu, to może otrzymać \n1 punkt. \n \n \nII. Dodatkowe szczegółowe zasady oceniania zadań otwartych w przypadku arkuszy osób \nze stwierdzoną dyskalkulią",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-1",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba wszystkich całkowitych rozwiązań nierówności  |x + 1| < 3  jest równa",
    "options": [
      {
        "id": "A",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "7",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC \n \n  \n                                                \n1 Rozporządzenie Ministra Edukacji i Nauki z dnia 10 czerwca 2022 r. w sprawie wymagań egzaminacyjnych dla \negzaminu maturalnego przeprowadzanego w roku szkolnym 2022/2023 i 2023/2024 (Dz.U. 2022, poz.1246).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  ( 4\n25)\n−0,5\njest równa",
    "options": [
      {
        "id": "A",
        "text": "0,04",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "0,8",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2,5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "0,4",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-3",
    "topicId": "dzial-2",
    "sectionTitle": "Dział 2: Wyrażenia Algebraiczne i Wielomiany",
    "taskNumber": "3",
    "type": "OPEN_PROOF",
    "content": "Wykaż, że dla każdej liczby naturalnej  𝒏 \\ge 𝟏  liczba  (𝟐𝒏 + 𝟓)𝟐 + 𝟑  jest podzielna\nprzez  𝟒.\n3.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równoważnie dane wyrażenie \n \n(2n + 5)2 + 3 = 4n2 + 20n + 25 + 3 = 4n2 + 20n + 28 = 4(n2 + 5n + 7) \n \nPonieważ  n  jest liczbą naturalną, więc  n2 + 5n + 7  jest liczbą naturalną.  \nZatem liczba  (2n + 5)2 + 3 = 4(n2 + 5n + 7)  jest podzielna przez  4. \nTo należało wykazać. \n \n \nSposób II \nPrzekształcamy równoważnie dane wyrażenie \n \n(2n + 5)2 + 3 = (2n + 5)2 − 1 + 4 = (2n + 5 − 1)(2n + 5 + 1) + 4 \n \n= (2n + 4)(2n + 6) + 4 \n \nPonieważ  n  jest liczbą naturalną, więc liczby  2n + 4  oraz  2n + 6  są parzyste. Stąd \nwynika, że iloczyn  (2n + 4)(2n + 6)  jest liczbą podzielną przez  4. \nZatem suma  (2n + 4)(2n + 6) + 4  dwóch liczb podzielnych przez  4  jest podzielna przez  4. \nTo należało wykazać.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-4",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "4",
    "type": "SINGLE_CHOICE",
    "content": "Uzupełnij zdanie. Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami\nA–F i wpisz te litery w wykropkowanych miejscach.\nPrawdziwe są równości:  ...............  oraz  ...............  .",
    "options": [
      {
        "id": "A",
        "text": "log2 16 + log2 9 = log2 25",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "log2 16 + log2 9 = 2 \\cdot log2 5",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "log2 16 + log2 9 = log2 144",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "log2 16 + log2 9 = log4 144\nE.  log2 16 + log2 9 = 4 + 2 \\cdot log2 3\nF.  log2 16 + log2 9 = 2 \\cdot log4 12",
        "is_correct": false
      }
    ],
    "correct_answer": "CE",
    "explanation": "wybranie dwóch odpowiedzi, z których obie są poprawne. \n1 pkt – wybranie jednej lub dwóch odpowiedzi, z których jedna jest poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nCE",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-5",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "5",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nZbiorem wszystkich rozwiązań nierówności\n3(6 − x)\n17 \\le 3\njest przedział",
    "options": [
      {
        "id": "A",
        "text": "(−\\infty, −11)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−\\infty, −11]",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(−11, +\\infty)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "[−11, +\\infty)",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-6",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "6",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nRównanie  x(x+5)(2−x)\n2x+4 = 0  w zbiorze liczb rzeczywistych ma dokładnie",
    "options": [
      {
        "id": "A",
        "text": "dwa rozwiązania:  (−5)  oraz  2.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "dwa rozwiązania:  (−5)  oraz  0.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "trzy rozwiązania:  (−5),  0  oraz  2.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "cztery rozwiązania:  (−5),  (−2),  0  oraz  2.",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-7",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "7",
    "type": "OPEN_CALCULATION",
    "content": "Rozwiąż równanie\n𝒙𝟑 + 𝟓𝒙𝟐 − 𝟐𝒙 − 𝟏𝟎 = 𝟎\nZapisz obliczenia.\n7.\n0–1–\n2–3",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \nx3 + 5x2 − 2x − 10 = 0 \n \nx2(x + 5) − 2(x + 5) = 0 \n \n(x + 5)(x2 − 2) = 0",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 3,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-8",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "8",
    "type": "SINGLE_CHOICE",
    "content": "Na rysunku, w kartezjańskim układzie współrzędnych  (x, y), przedstawiono interpretację\ngeometryczną jednego z poniższych układów równań A–D.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nUkładem równań, którego interpretację geometryczną przedstawiono na rysunku, jest",
    "options": [
      {
        "id": "A",
        "text": "{ y = x + 2\ny = 2x − 3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "{ y = −x + 2\ny = 2x − 3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "{ y = x + 2\ny = −2x − 3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "{ y = −x + 2\ny = 2x + 3",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-9",
    "topicId": "dzial-4",
    "sectionTitle": "Dział 4: Własności Funkcji i Odczytywanie Wykresów",
    "taskNumber": "9",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja  y = f(x)  jest określona za pomocą tabeli\n𝒙 −6 −4 −2 0 2 4 6\n𝒚 −3 −4 4 1 5 0 2\nUzupełnij poniższą tabelę. Wpisz w każdą pustą komórkę tabeli właściwą odpowiedź,\nwybraną spośród oznaczonych literami A–E.\n9.1. Największa wartość funkcji  f  jest równa\n9.2. Miejsce zerowe funkcji  f  jest równe",
    "options": [
      {
        "id": "A",
        "text": "1",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "5 E.  6",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "dwie poprawne odpowiedzi. \n1 pkt – jedna poprawna odpowiedź. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-10",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "10",
    "type": "NUMERIC_INPUT",
    "content": "Funkcja liniowa  f  jest określona wzorem  f(x) =\n\\sqrt3\n3 x − 3.\nW kartezjańskim układzie współrzędnych  (x, y)  wykres funkcji  y = f(x)  jest prostą\nnachyloną do osi  Ox  pod kątem ostrym  \\alpha.\nUzupełnij poniższe zdanie. Wpisz odpowiednią liczbę w wykropkowanym miejscu tak,\naby zdanie było prawdziwe.\nSinus kąta  \\alpha  jest równy ………. .",
    "correct_answer": "1",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \n1\n2",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-11_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "11.1",
    "type": "TRUE_FALSE",
    "content": "Oceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nFunkcja  f  jest malejąca. P F\nFunkcja  f  nie ma miejsc zerowych.  P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "FP",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nFP",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-11_2",
    "topicId": "dzial-4",
    "sectionTitle": "Dział 4: Własności Funkcji i Odczytywanie Wykresów",
    "taskNumber": "11.2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nNajwiększa wartość funkcji  f  jest równa",
    "options": [
      {
        "id": "A",
        "text": "16,8",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "15,8",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "11,3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "10,3",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-11_3",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "11.3",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja  f  jest określona wzorem",
    "options": [
      {
        "id": "A",
        "text": "f(x) = 6,5x + 1,03",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "f(x) = 1,03x + 10",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "f(x) = 10x + 1,03",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "f(x) = 1,03x + 6,5",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-12_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "12.1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nZbiorem wartości funkcji  f  jest przedział",
    "options": [
      {
        "id": "A",
        "text": "(−\\infty, −2]",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "[1, +\\infty)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "[−1, 3]",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "[−2, +\\infty)",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-12_2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "12.2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nOsią symetrii wykresu funkcji  f  jest prosta o równaniu",
    "options": [
      {
        "id": "A",
        "text": "x = 1",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "y = 1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "x = −2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "y = −2",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-12_3",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "12.3",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja  f  jest określona wzorem",
    "options": [
      {
        "id": "A",
        "text": "f(x) = 1\n2 (x − 1)2 + 2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "f(x) = 1\n2 (x + 1)2 + 2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "f(x) = 1\n2 (x − 1)2 − 2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "f(x) = 1\n2 (x + 1)2 − 2",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-13",
    "topicId": "dzial-7",
    "sectionTitle": "Dział 7: Ciągi Liczbowe",
    "taskNumber": "13",
    "type": "SINGLE_CHOICE",
    "content": "Ciąg  (an)  jest określony dla każdej liczby naturalnej  n \\ge 1.\nSuma  n  początkowych wyrazów tego ciągu wyraża się wzorem  Sn = n2 + 2n  dla każdej\nliczby naturalnej  n \\ge 1.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nTrzeci wyraz ciągu  (an)  jest równy",
    "options": [
      {
        "id": "A",
        "text": "5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "7",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "13",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "15",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-14",
    "topicId": "dzial-7",
    "sectionTitle": "Dział 7: Ciągi Liczbowe",
    "taskNumber": "14",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest ciąg geometryczny  (an)  określony dla każdej liczby naturalnej  n \\ge 1, w którym\na2 = 2  oraz  a5 = 54.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nIloraz ciągu  (an)  jest równy",
    "options": [
      {
        "id": "A",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "9",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "52\n3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "27",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-15",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "15",
    "type": "NUMERIC_INPUT",
    "content": "Trzywyrazowy ciąg  (2m − 5, 4, 9)  jest arytmetyczny.\nDokończ zdanie. Wybierz odpowiedź A albo B oraz odpowiedź 1., 2. albo 3.\nTen ciąg jest\nrosnący\noraz\n1. m = −1 A.\n2. m = 2\nmalejący B. 3. m = 3",
    "correct_answer": "A2",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA2",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-16",
    "topicId": "dzial-8",
    "sectionTitle": "Dział 8: Trygonometria",
    "taskNumber": "16",
    "type": "SINGLE_CHOICE",
    "content": "Kąt  \\alpha  jest ostry oraz  cos \\alpha = 24\n25\n.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nTangens kąta  \\alpha  jest równy",
    "options": [
      {
        "id": "A",
        "text": "7\n18",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "7\n24",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "7\n25",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "18\n25",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-17",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "17",
    "type": "SINGLE_CHOICE",
    "content": "W trójkącie prostokątnym  ABC  sinus kąta  CAB  jest równy  3\n5\n, a przeciwprostokątna  AB\njest o  8  dłuższa od przyprostokątnej  BC.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDługość przeciwprostokątnej  AB  tego trójkąta jest równa",
    "options": [
      {
        "id": "A",
        "text": "18",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "20",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "24",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "25",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-18",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "18",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest trójkąt  ABC, w którym  |AB| = 5,  |AC| = 2  oraz  cos|∡BAC| = 3\n5\n.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDługość boku  BC  tego trójkąta jest równa",
    "options": [
      {
        "id": "A",
        "text": "\\sqrt17",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "\\sqrt23",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "\\sqrt35",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "\\sqrt41",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-19",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "19",
    "type": "SINGLE_CHOICE",
    "content": "Punkty  K,  L  oraz  M  leżą na okręgu o środku w punkcie  S. Miara kąta  KSM  jest równa 160°\n(zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nMiara kąta wpisanego  KLM  jest równa",
    "options": [
      {
        "id": "A",
        "text": "80°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "90°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "100°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "110°",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-20",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "20",
    "type": "OPEN_CALCULATION",
    "content": "Podstawy trapezu prostokątnego  ABCD  mają długości:  |AB| = 12  oraz  |CD| = 6.\nWysokość  AD  tego trapezu ma długość  24. Na odcinku  AD  leży punkt  𝐸  taki, że\n|∡B𝐸A| = |∡C𝐸D|  (zobacz rysunek).\nOblicz długość odcinka  𝑩𝑬. Zapisz obliczenia.\n20.\n0–1–2\nC\nD\n𝐸\n\\cdot\nB\n\\cdot\nA",
    "correct_answer": "A",
    "explanation": "Sposób I \nTrójkąty  AB𝐸  oraz  DC𝐸  są podobne na podstawie cechy kąt – kąt – kąt podobieństwa \ntrójkątów. Stąd \n \n|A𝐸|\n|AB| = |D𝐸|\n|CD| \n \n|A𝐸|\n12 = 24 − |A𝐸|\n6  \n \n|A𝐸| = 48 − 2|A𝐸| \n \n3|A𝐸| = 48 \n \n|A𝐸| = 16 \n \nKorzystamy z twierdzenia Pitagorasa i obliczamy długość odcinka  B𝐸: \n \n|B𝐸|2 = |AB|2 + |A𝐸|2 \n \n|B𝐸|2 = 122 + 162 \n \n|B𝐸|2 = 400 \n \n|B𝐸| = 20",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-21",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "21",
    "type": "OPEN_CALCULATION",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  przekątne równoległoboku  ABCD\nprzecinają się w punkcie  S = (9, 11). Bok  AB  tego równoległoboku zawiera się w prostej\no równaniu  y = 1\n2 x − 1, a bok  AD  zawiera się w prostej o równaniu  y = 2x − 4.\nOblicz współrzędne wierzchołka  𝑩. Zapisz obliczenia.\n21.\n0–1–\n2–3–4",
    "correct_answer": "A",
    "explanation": "Sposób I \nPunkt  A  jest punktem wspólnym prostych  AB  i  AD, zatem współrzędne tego punktu są \nrozwiązaniem układu równań \n{ y = 1\n2 x − 1\ny = 2x − 4\n \n \nStąd \n2x − 4 = 1\n2 x − 1 \n \n3\n2 x = 3 \n \nx = 2 \n \ny = 0 \n \nZatem  A = (2, 0). \n \nPunkt  S  jest środkiem odcinka  AC, więc \n \n2 + xc\n2 = 9   oraz  0 + yc\n2 = 11 \n \nxc = 16   oraz   yc = 22 \n \nZatem  C = (16, 22). \n \nProsta  BC  jest równoległa do prostej  AD, zatem współczynnik kierunkowy prostej  BC  jest \nrówny  2. Wyznaczamy równanie prostej  BC: \n \ny = 2(x − 16) + 22 \n \ny = 2x − 10 \n \nPunkt  B  jest punktem wspólnym prostych  AB  i  BC, zatem współrzędne tego punktu są \nrozwiązaniem układu równań \n{ y = 1\n2 x − 1\ny = 2x − 10\n \n \nStąd \n2x − 10 = 1\n2 x − 1 \n \n3\n2 x = 9 \n \nx = 6 \n \ny = 2 \n \nZatem  B = (6, 2).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 4,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-22",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "22",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  proste  k  oraz  𝑙  są określone równaniami\nk:  y = (3m − 2)x − 2\n𝑙:   y = (2m + 4)x + 2\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nProste  k  oraz  𝑙  są równoległe, gdy liczba  m  jest równa",
    "options": [
      {
        "id": "A",
        "text": "(−6)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−2)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "6",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-23",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "23",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  odcinek o końcach  A = (−4, 7)  oraz\nB = (6, −1)  jest średnicą okręgu  𝒪.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nOkrąg  𝒪  jest określony równaniem",
    "options": [
      {
        "id": "A",
        "text": "(x − 1)2 + (y − 3)2 = 41",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(x − 5)2 + (y + 4)2 = 41",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(x − 1)2 + (y + 3)2 = 41",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(x − 5)2 + (y − 4)2 = 41",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-24",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "24",
    "type": "SINGLE_CHOICE",
    "content": "Liczba wszystkich ścian ostrosłupa prawidłowego jest równa  12.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba wszystkich wierzchołków tego ostrosłupa jest równa",
    "options": [
      {
        "id": "A",
        "text": "10",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "11",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "12",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "13",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-25",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "25",
    "type": "SINGLE_CHOICE",
    "content": "Długości trzech wychodzących z jednego wierzchołka krawędzi prostopadłościanu są trzema\nkolejnymi liczbami naturalnymi parzystymi. Najdłuższa krawędź tego prostopadłościanu ma\ndługość  10.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPole powierzchni całkowitej tego prostopadłościanu jest równe",
    "options": [
      {
        "id": "A",
        "text": "376",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "466",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "480",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "720",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-26",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "26",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest prostopadłościan  ABCD𝐸𝐹𝐺𝐻, w którym podstawy  ABCD  i  𝐸𝐹𝐺𝐻  są\nkwadratami o boku długości  6. Przekątna  B𝐻  tego prostopadłościanu tworzy z przekątną\nA𝐻  ściany bocznej  AD𝐻𝐸  kąt o mierze  30°  (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPrzekątna  B𝐻  tego prostopadłościanu ma długość równą",
    "options": [
      {
        "id": "A",
        "text": "4\\sqrt3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "6\\sqrt3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "12",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "12\\sqrt2",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-27",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "27",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWszystkich liczb naturalnych dwucyfrowych, w których zapisie dziesiętnym cyfra dziesiątek\njest o  3  większa od cyfry jedności, jest",
    "options": [
      {
        "id": "A",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "6",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "7",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "13",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-28",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "28",
    "type": "SINGLE_CHOICE",
    "content": "W tabeli zestawiono liczbę punktów uzyskanych przez  32  uczniów pewnej klasy za\nrozwiązanie jednego z zadań testu z matematyki.\nLiczba punktów 0 1 2 3 4 5\nLiczba uczniów 2 2 5 6 11 6\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nŚrednia arytmetyczna liczby punktów uzyskanych za rozwiązanie tego zadania przez\nuczniów tej klasy jest równa",
    "options": [
      {
        "id": "A",
        "text": "2,5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3,25",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3,31",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "4",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-29",
    "topicId": "dzial-13",
    "sectionTitle": "Dział 13: Rachunek Prawdopodobieństwa",
    "taskNumber": "29",
    "type": "OPEN_CALCULATION",
    "content": "Dane są dwa zbiory:  C = {0, 4, 5, 7, 9}  oraz  D = {1, 2, 3}.\nLosujemy jedną liczbę ze zbioru  C, a następnie losujemy jedną liczbę ze zbioru  D.\nOblicz prawdopodobieństwo zdarzenia  𝑨  polegającego na tym, że suma\nwylosowanych liczb będzie większa od  𝟗. Zapisz obliczenia.\n29.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nZdarzeniami elementarnymi są wszystkie uporządkowane pary liczb  (x, y), gdzie   \nx ∈ {0, 4, 5, 7, 9}  oraz  y ∈ {1, 2, 3}. \nLiczbę wszystkich zdarzeń elementarnych obliczamy, korzystając z reguły mnożenia.  \nMoc zbioru  Ω  jest równa  5 \\cdot 3 = 15. \nZdarzeniu  A  sprzyjają następujące zdarzenia elementarne:  (7,3), (9,1), (9,2), (9,3), więc \nmoc zbioru  A  jest równa  4. \nZatem prawdopodobieństwo zdarzenia  A  jest równe  4\n15 . \n \n \nSposób II \nW tabeli literą  A  zaznaczamy zdarzenia elementarne sprzyjające zdarzeniu  A  (pary liczb, \nktórych suma jest liczbą większą od  9).  \n \n 0 4 5 7 9 \n1     A \n2     A \n3    A A \n \nMoc zbioru  Ω  jest równa  15. \nZdarzeń sprzyjających wylosowaniu liczb, których suma jest większa od  9, jest  4. \nZatem prawdopodobieństwo zdarzenia  A  jest równe  4\n15 . \n \n  \nC \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2024-zad-30",
    "topicId": "dzial-14",
    "sectionTitle": "Dział 14: Statystyka",
    "taskNumber": "30",
    "type": "OPEN_CALCULATION",
    "content": "Suma dwóch nieujemnych liczb rzeczywistych  x  oraz  y  jest równa  12.\nWyznacz  𝒙  oraz  𝒚, dla których wartość wyrażenia  𝟐𝒙𝟐 + 𝒚𝟐  jest najmniejsza.\nOblicz tę najmniejszą wartość. Zapisz obliczenia.\n30.\n0–1–\n2–3\nBRUDNOPIS (nie podlega ocenie)\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023",
    "correct_answer": "A",
    "explanation": "Sposób I \nPonieważ  x + y = 12, więc  y = 12 − x. \n \nWyrażenie  2x2 + y2  zapisujemy jako funkcję  f  jednej zmiennej  x. W tym celu \npodstawiamy  y = 12 − x  i otrzymujemy \n \nf(x) = 2x2 + (12 − x)2 = 2x2 + 144 − 24x + x2 = 3x2 − 24x + 144 \n \nWyznaczamy dziedzinę funkcji  f. Z warunków zadania wynika, że \n \nx \\ge 0       i      y \\ge 0 \n \nZatem \n \nx \\ge 0     oraz     12 − x \\ge 0  \n \nx \\ge 0     oraz     x \\le 12 \n \nZmienna  x  może przyjmować wartości z przedziału  [0, 12]. \n \nWykresem funkcji  f  jest fragment paraboli skierowanej ramionami do góry.  \nObliczamy pierwszą współrzędną wierzchołka paraboli: \n \np = − −24\n2 \\cdot 3 = 4 ∈ [0, 12] \n \nZatem funkcja  f  przyjmuje wartość najmniejszą dla argumentu  4. \nWobec tego wartość wyrażenia  2x2 + y2  jest najmniejsza dla  x = 4  oraz  y = 12 − 4 = 8. \n \nObliczamy najmniejszą wartość wyrażenia  2x2 + y2: \n \nf(4) = 3 \\cdot 42 − 24 \\cdot 4 + 144 = 96 \n \nSposób II \nPonieważ  x + y = 12, więc  x = 12 − y. \n \nWartość wyrażenia  2x2 + y2  zapisujemy jako funkcję  f  jednej zmiennej  y. W tym celu \npodstawiamy  x = 12 − y  i otrzymujemy \n \nf(y) = 2(12 − y)2 + y2 = 2(144 − 24y + y2) + y2 = 288 − 48y + 2y2 + y2 \n \nf(y) = 3y2 − 48y + 288 \n \nWyznaczamy dziedzinę funkcji  f. Z warunków zadania wynika, że \n \nx \\ge 0       i      y \\ge 0 \n \nZatem \n \n12 − y \\ge 0     oraz     y \\ge 0  \n \ny \\le 12     oraz     y \\ge 0 \n \nZmienna  y  może przyjmować wartości z przedziału  [0, 12]. \n \nWykresem funkcji  f  jest fragment paraboli skierowanej ramionami do góry.  \nObliczamy pierwszą współrzędną wierzchołka paraboli: \n \np = − −48\n2 \\cdot 3 = 8 ∈ [0, 12] \n \nZatem funkcja  f  przyjmuje wartość najmniejszą dla argumentu  8. \nWobec tego wartość wyrażenia  2x2 + y2  jest najmniejsza dla  y = 8  oraz  x = 12 − 8 = 4. \n \nObliczamy najmniejszą wartość wyrażenia  2x2 + y2: \n \nf(8) = 3 \\cdot 82 − 48 \\cdot 8 + 288 = 96",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 3,
    "sourceYear": "Matura Sierpień 2024 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "1",
    "type": "SINGLE_CHOICE",
    "content": "Na osi liczbowej zaznaczono sumę przedziałów.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nZbiór zaznaczony na osi jest zbiorem wszystkich rozwiązań nierówności",
    "options": [
      {
        "id": "A",
        "text": "|x − 3,5| \\ge 1,5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "|x − 1,5| \\ge 3,5",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "|x − 3,5| \\le 1,5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "|x − 1,5| \\le 3,5",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB D \n \n  \n                                                \n1 Rozporządzenie Ministra Edukacji i Nauki z dnia 10 czerwca 2022 r. w sprawie wymagań egzaminacyjnych dla \negzaminu maturalnego przeprowadzanego w roku szkolnym 2022/2023 i 2023/2024 (Dz.U. 2022, poz.1246).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  \\sqrt− 27\n16\n3\n\\cdot \\sqrt2\n3\njest równa",
    "options": [
      {
        "id": "A",
        "text": "(− 3\n2)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3\n2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2\n3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(− 2\n3)",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-3",
    "topicId": "dzial-2",
    "sectionTitle": "Dział 2: Wyrażenia Algebraiczne i Wielomiany",
    "taskNumber": "3",
    "type": "OPEN_PROOF",
    "content": "Wykaż, że dla każdej liczby naturalnej  𝒏 \\ge 𝟏  liczba  (𝟐𝒏 + 𝟏)𝟐 − 𝟏  jest podzielna\nprzez  𝟖.\n3.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nKorzystając z wzoru skróconego mnożenia, zapisujemy liczbę  (2n + 1)2 − 1  w postaci \n \n(2n + 1)2 − 1 = 4n2 + 4n + 1 − 1 = 4n(n + 1) \n \nPonieważ liczby  n  oraz  n + 1  są kolejnymi liczbami naturalnymi, to jedna z nich jest liczbą \nparzystą, zatem iloczyn  n(n + 1)  jest  liczbą parzystą, więc iloczyn  4n(n + 1)  jest \npodzielny przez  8. To należało wykazać. \n \nSposób II  \nKorzystając z wzoru skróconego mnożenia, zapisujemy liczbę  (2n + 1)2 − 1  w postaci",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-4",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "4",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  log9 27 + log9 3  jest równa",
    "options": [
      {
        "id": "A",
        "text": "81",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "9",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "2",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nWersja A Wersja B \nD C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-5",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "5",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdej liczby rzeczywistej  a  wyrażenie  (2a − 3)2 − (2a + 3)2  jest równe",
    "options": [
      {
        "id": "A",
        "text": "−24a",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "0",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "18",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "16a2 − 24a",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nWersja A Wersja B \nA B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-6",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "6",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nZbiorem wszystkich rozwiązań nierówności\n−2(x + 3) \\le 2 − x\n3\njest przedział",
    "options": [
      {
        "id": "A",
        "text": "(−\\infty, −4]",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−\\infty, 4]",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "[−4, \\infty)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "[4, \\infty)",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie  \nWersja A Wersja B \nC A",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-7",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "7",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nJednym z rozwiązań równania  \\sqrt3(x2 − 2)(x + 3) = 0  jest liczba",
    "options": [
      {
        "id": "A",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "\\sqrt3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "\\sqrt2",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-8",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "8",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nRównanie\n(x+1)(x−1)2\n(x−1)(x+1)2 = 0  w zbiorze liczb rzeczywistych",
    "options": [
      {
        "id": "A",
        "text": "nie ma rozwiązania.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "ma dokładnie jedno rozwiązanie:  −1.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "ma dokładnie jedno rozwiązanie:  1.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "ma dokładnie dwa rozwiązania:  −1  oraz  1.",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA A",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-9",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "9",
    "type": "OPEN_CALCULATION",
    "content": "Rozwiąż równanie\n𝟑𝒙𝟑 − 𝟐𝒙𝟐 − 𝟏𝟐𝒙 + 𝟖 = 𝟎\nZapisz obliczenia.\n9.\n0–1–\n2–3",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \n3x3 − 2x2 − 12x + 8 = 0 \n \nx2(3x − 2) − 4(3x − 2) = 0 \n \n(3x − 2)(x2 − 4) = 0 \n \n(3x − 2)(x − 2)(x + 2) = 0 \n \n3x − 2 = 0    lub    x − 2 = 0    lub    x + 2 = 0 \n \nx = 2\n3     lub    x = 2   lub    x = −2 \n \nRozwiązaniami równania są liczby:  (−2), 2\n3 , 2. \n \nSposób II \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \n3x3 − 2x2 − 12x + 8 = 0 \n \n3x(x2 − 4) − 2(x2 − 4) = 0 \n \n(3x − 2)(x2 − 4) = 0 \n \n(3x − 2)(x − 2)(x + 2) = 0 \n \n3x − 2 = 0    lub    x − 2 = 0    lub    x + 2 = 0 \n \nx = 2\n3     lub    x = 2   lub    x = −2 \n \nRozwiązaniami równania są liczby:  (−2), 2\n3 , 2. \n \nSposób III \nObliczamy  W(2) = 0  i stwierdzamy, że liczba  2  jest pierwiastkiem wielomianu  \nW(x) = 3x3 − 2x2 − 12x + 8. \n \nZatem wielomian  W  jest podzielny przez dwumian  x − 2. Dzielimy wielomian  W  przez \ndwumian  x − 2  i otrzymujemy  \n \n(3x3 − 2x2 − 12x + 8): (x − 2) = 3x2 + 4x − 4 \n \nZatem  W(x) = (x − 2)(3x2 + 4x − 4). \n \nObliczamy pierwiastki trójmianu  3x2 + 4x − 4: \n \nΔ = 42 − 4 \\cdot 3 \\cdot (−4) = 64 \n \nx = −4 − 8\n2 \\cdot 3 = −2    oraz    x = −4 + 8\n2 \\cdot 3 = 2\n3 \n \nRozwiązaniami równania są liczby:  (−2), 2\n3 , 2. \n \nSposób IV \nObliczamy  W(2) = 0  i stwierdzamy, że liczba  2  jest pierwiastkiem wielomianu  \nW(x) = 3x3 − 2x2 − 12x + 8. \n \nObliczamy  W(−2) = 0  i stwierdzamy, że liczba  (−2)  jest pierwiastkiem wielomianu  \nW(x) = 3x3 − 2x2 − 12x + 8. \n \nObliczamy  W (2\n3) = 0  i stwierdzamy, że liczba  2\n3  jest pierwiastkiem wielomianu  \nW(x) = 3x3 − 2x2 − 12x + 8. \n \nPonieważ  W  jest wielomianem stopnia trzeciego, więc ma co najwyżej trzy pierwiastki \nrzeczywiste. Oznacza to, że jedynymi rozwiązaniami równania  3x3 − 2x2 − 12x + 8 = 0  \nsą liczby:  (−2), 2\n3 , 2.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 3,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-10",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "10",
    "type": "SINGLE_CHOICE",
    "content": "Na rysunku przedstawiono interpretację geometryczną w kartezjańskim układzie\nwspółrzędnych  (x, y)  jednego z niżej zapisanych układów równań A–D.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nUkładem równań, którego interpretację geometryczną przedstawiono na rysunku, jest",
    "options": [
      {
        "id": "A",
        "text": "{ y = −x + 2\ny = −2x + 1",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "{ y = x − 2\ny = −2x − 1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "{ y = x − 2\ny = 2x + 1",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "{ y = −x + 2\ny = 2x − 1",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-11",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "11",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest prostokąt o bokach długości  a  i  b, gdzie  a > b. Obwód tego prostokąta jest\nrówny  30. Jeden z boków prostokąta jest o  5  krótszy od drugiego.\nUzupełnij zdanie. Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami\nA–F i wpisz te litery w wykropkowanych miejscach.\nZależności między długościami boków tego prostokąta zapisano w układach równań\noznaczonych literami: ……… oraz ……… .",
    "options": [
      {
        "id": "A",
        "text": "{ 2ab = 30\na − b = 5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "{ 2a + b = 30\na = 5b",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "{ 2(a + b) = 30\nb = a − 5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "{ 2a + 2b = 30\nb = 5a\nE.  { 2a + 2b = 30\na − b = 5\nF.  { a + b = 30\na = b + 5",
        "is_correct": false
      }
    ],
    "correct_answer": "CE",
    "explanation": "wybranie dwóch odpowiedzi, z których obie są poprawne. \n1 pkt – wybranie jednej lub dwóch odpowiedzi, z których jedna jest poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nCE AD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-12_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "12.1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDziedziną funkcji  f  jest zbiór",
    "options": [
      {
        "id": "A",
        "text": "[−6, 5]",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−6, 5)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(−3, 5]",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "[−3, 5]",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-12_2",
    "topicId": "dzial-4",
    "sectionTitle": "Dział 4: Własności Funkcji i Odczytywanie Wykresów",
    "taskNumber": "12.2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nNajwiększa wartość funkcji  f  w przedziale  [−4, 1]  jest równa",
    "options": [
      {
        "id": "A",
        "text": "0",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "5",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-12_3",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "12.3",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja  f  jest malejąca w zbiorze",
    "options": [
      {
        "id": "A",
        "text": "[−6, −3)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "[−3, 1]",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(1, 2]",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "[2, 5]",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-13",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "13",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja liniowa  f  jest określona wzorem\nf(x) = ax + b, gdzie  a  i  b  są pewnymi\nliczbami rzeczywistymi. Na rysunku obok\nprzedstawiono fragment wykresu funkcji  f\nw kartezjańskim układzie współrzędnych  (x, y).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  a  oraz liczba  b  we wzorze funkcji  f  spełniają warunki:",
    "options": [
      {
        "id": "A",
        "text": "a > 0  i  b > 0.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "a > 0  i  b < 0.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "a < 0  i  b > 0.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "a < 0  i  b < 0.",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-14",
    "topicId": "dzial-6",
    "sectionTitle": "Dział 6: Funkcja Kwadratowa",
    "taskNumber": "14",
    "type": "SINGLE_CHOICE",
    "content": "Jednym z miejsc zerowych funkcji kwadratowej  f  jest liczba  (−5). Pierwsza współrzędna\nwierzchołka paraboli, będącej wykresem funkcji  f, jest równa  3.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDrugim miejscem zerowym funkcji  f  jest liczba",
    "options": [
      {
        "id": "A",
        "text": "11",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(−1)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(−13)",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-15",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "15",
    "type": "SINGLE_CHOICE",
    "content": "Ciąg  (an)  jest określony wzorem  an = 2n \\cdot (n + 1)  dla każdej liczby naturalnej  n \\ge 1.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWyraz  a4  jest równy",
    "options": [
      {
        "id": "A",
        "text": "64",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "40",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "48",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "80",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-16",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "16",
    "type": "SINGLE_CHOICE",
    "content": "Trzywyrazowy ciąg  (27, 9, a − 1)  jest geometryczny.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  a  jest równa",
    "options": [
      {
        "id": "A",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "0",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "2",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-17",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "17",
    "type": "OPEN_CALCULATION",
    "content": "Pan Stanisław spłacił pożyczkę w wysokości  8910 zł w osiemnastu ratach. Każda kolejna\nrata była mniejsza od poprzedniej o  30 zł.\nOblicz kwotę pierwszej raty. Zapisz obliczenia.\n17.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nKolejne raty tworzą ciąg arytmetyczny, w którym  S18 = 8910  i  r = −30. Korzystamy ze \nwzoru na sumę  n  początkowych wyrazów ciągu arytmetycznego i otrzymujemy równanie \n \n2a1 + 17 \\cdot (−30)\n2 \\cdot 18 = 8910 \n \nPrzekształcając to równanie równoważnie, otrzymujemy \n \n9(2a1 − 510) = 8910 \n \n2a1 − 510 = 990 \n \na1 = 750 \n \nPierwsza rata była równa  750 zł. \n \nSposób II \nPrzyjmujemy, że kolejne (licząc od końca) raty tworzą ciąg arytmetyczny, w którym   \nS18 = 8910  i  r = 30. Korzystamy ze wzoru na sumę  n  początkowych wyrazów ciągu \narytmetycznego i otrzymujemy równanie",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-18",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "18",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  zaznaczono kąt  \\alpha  o wierzchołku\nw punkcie  O = (0, 0). Jedno z ramion tego kąta pokrywa się z dodatnią półosią  Ox,\na drugie przechodzi przez punkt  P = (−3, 1)  (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nTangens kąta  \\alpha  jest równy",
    "options": [
      {
        "id": "A",
        "text": "1\n\\sqrt10",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(− 3\n\\sqrt10)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(− 3\n1)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(− 1\n3)",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-19",
    "topicId": "dzial-8",
    "sectionTitle": "Dział 8: Trygonometria",
    "taskNumber": "19",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdego kąta ostrego  \\alpha  wyrażenie  sin4 \\alpha  + sin2 \\alpha  \\cdot cos2 \\alpha  jest równe",
    "options": [
      {
        "id": "A",
        "text": "sin2 \\alpha",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "sin6 \\alpha  \\cdot cos2 \\alpha",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "sin4 \\alpha + 1",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "sin2 \\alpha \\cdot (sin \\alpha + cos \\alpha) \\cdot (sin \\alpha − cos \\alpha)",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-20",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "20",
    "type": "SINGLE_CHOICE",
    "content": "W rombie o boku długości  6\\sqrt2  kąt rozwarty ma miarę  150°.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nIloczyn długości przekątnych tego rombu jest równy",
    "options": [
      {
        "id": "A",
        "text": "24",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "72",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "36",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "36\\sqrt2",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-21",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "21",
    "type": "SINGLE_CHOICE",
    "content": "Punkty  A, B, C  leżą na okręgu o środku w punkcie  O.\nKąt  ACO  ma miarę  70°  (zobacz rysunek).\nDokończ zdanie.\nWybierz właściwą odpowiedź spośród podanych.\nMiara kąta ostrego  ABC  jest równa",
    "options": [
      {
        "id": "A",
        "text": "10°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "20°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "35°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "40°",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB C",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-22",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "22",
    "type": "OPEN_CALCULATION",
    "content": "Trójkąty prostokątne  𝑇1  i  𝑇2  są podobne. Przyprostokątne trójkąta  𝑇1  mają\ndługości  5  i  12. Przeciwprostokątna trójkąta  𝑇2  ma długość  26.\nOblicz pole trójkąta  𝑻𝟐. Zapisz obliczenia.\n22.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I  \nDługości przyprostokątnych trójkątów  𝑇1  i  𝑇2  oznaczymy odpowiednio jako:  a1, b1  oraz  \na2, b2 . Z podobieństwa trójkątów  𝑇1  i  𝑇2  wynika, że stosunki odpowiednich boków są \nrówne: \n \na2\nb2\n= a1\nb1\n    gdzie   a1 = 12,   b1 = 5 \n \nZatem \n \na2\nb2\n= 12\n5    więc    b2 = 5\n12 a2 \n \nZ twierdzenia Pitagorasa dla trójkąta  𝑇2  mamy: \n \na2\n2 + b2\n2 = 262 \n \na2\n2 + ( 5\n12)\n2\na2\n2 = 262 \n \n169\n144 a2\n2 = 262 \n \na2 = \\sqrt144\n169 \\cdot 26 = 24 \n \nZatem  b2 = 5\n12 \\cdot 24 = 10. \nObliczamy pole trójkąta  𝑇2: \n \nP2 = 1\n2 \\cdot a2 \\cdot b2 = 1\n2 \\cdot 24 \\cdot 10 = 120 \n \nSposób II \nOznaczamy wierzchołki trójkąta  𝑇1  przez  A, B, C, gdzie  BC  jest przeciwprostokątną tego \ntrójkąta, |AB| = 12  i  |AC| = 5. Oznaczamy wierzchołki trójkąta  𝑇2  przez  D, 𝐸, 𝐹, gdzie  \n𝐸𝐹  jest przeciwprostokątną tego trójkąta. \n \nZ twierdzenia Pitagorasa dla trójkąta  𝑇1  mamy \n \n|AB|2 + |AC|2 = |BC|2 \n \n122 + 52 = |BC|2 \n \n|BC|2 = 169 \n \n|BC| = 13 \n \nObliczamy skalę podobieństwa trójkąta  𝑇2  do trójkąta  𝑇1: \n \nk = |𝐸𝐹|\n|BC| = 26\n13 = 2 \n \nObliczamy długości przyprostokątnych trójkąta  𝑇2: \n \n|D𝐸| = 2 \\cdot |AB| = 2 \\cdot 12 = 24 \n \n|D𝐹| = 2 \\cdot |AC| = 2 \\cdot 5 = 10 \n \nObliczamy pole trójkąta  𝑇2: \n \nP2 = 1\n2 \\cdot |D𝐸| \\cdot |D𝐹| = 1\n2 \\cdot 24 \\cdot 10 = 120 \n  \nD \n𝐸 \n𝐹 \n26 \n5 \n12 \nA \nB \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-23",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "23",
    "type": "NUMERIC_INPUT",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  dane są proste  k  oraz  𝑙  o równaniach\nk:   y = 2\n3 x\n𝑙:   y = − 3\n2 x + 13\nDokończ zdanie. Wybierz odpowiedź A albo B oraz odpowiedź 1., 2. albo 3.\nProste  k  oraz  𝑙\nsą prostopadłe\ni przecinają się w punkcie  P  o współrzędnych\n1. (−6, −4) A.\n2. (6, 4)\nnie są\nprostopadłe B. 3. (−6, 4)",
    "correct_answer": "A2",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nA2 A3",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-24",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "24",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  dana jest prosta  k  o równaniu\ny = − 1\n3 x + 2\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nProsta o równaniu  y = ax + b  jest równoległa do prostej  k  i przechodzi przez\npunkt  P = (3, 5), gdy",
    "options": [
      {
        "id": "A",
        "text": "a = 3  i  b = 4.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "a = − 1\n3  i  b = 4.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "a = 3  i  b = −4.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "a = − 1\n3  i  b = 6.",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nD B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-25",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "25",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest graniastosłup prawidłowy czworokątny, w którym krawędź podstawy ma\ndługość  15. Przekątna graniastosłupa jest nachylona do płaszczyzny podstawy pod\nkątem  \\alpha  takim, że  cos \\alpha =\n\\sqrt2\n3  .\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDługość przekątnej tego graniastosłupa jest równa",
    "options": [
      {
        "id": "A",
        "text": "15\\sqrt2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "45",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "5\\sqrt2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "10",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB D",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-26",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "26",
    "type": "OPEN_CALCULATION",
    "content": "Dany jest ostrosłup prawidłowy czworokątny. Wysokość ściany bocznej tego ostrosłupa jest\nnachylona do płaszczyzny podstawy pod kątem  30°  i ma długość równą  6  (zobacz rysunek).\nOblicz objętość i pole powierzchni całkowitej tego ostrosłupa. Zapisz obliczenia.\n30°\n6\n26.\n0–1–\n2–3–4",
    "correct_answer": "A",
    "explanation": "Przyjmujemy oznaczenia jak na rysunku: \na – długość krawędzi podstawy, \n𝐻 – wysokość ostrosłupa. \n \nZauważamy, że  a > 0  i  𝐻 > 0. \n \nPonieważ  O  jest punktem przecięcia \nprzekątnych kwadratu, to  |O𝐸| = 1\n2  a. \n \nW trójkącie prostokątnym  SO𝐸  mamy \n \nsin 30° =\n|SO|\n|S𝐸| = 𝐻\n6 \n \nZatem \n \n𝐻 = 6 \\cdot sin 30° = 6 \\cdot 1\n2 = 3 \n \nPonadto \n \ncos 30° =\n|O𝐸|\n|S𝐸| =\n1\n2 a\n6 = a\n12 \n \nStąd \n \na = 12 \\cdot cos 30° = 12 \\cdot \\sqrt3\n2 = 6\\sqrt3 \n30° \n6 \n𝐻 \n1\n2 a \nS \n𝐸 \nO \n30° \n6 \n𝐻 \na \nS \n𝐸 \nO \nD \nB \nA \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 4,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-27",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "27",
    "type": "SINGLE_CHOICE",
    "content": "W pewnym ostrosłupie prawidłowym stosunek liczby  W  wszystkich wierzchołków do\nliczby  K  wszystkich krawędzi jest równy  W\nK = 3\n5 .\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPodstawą tego ostrosłupa jest",
    "options": [
      {
        "id": "A",
        "text": "kwadrat.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "pięciokąt foremny.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "sześciokąt foremny.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "siedmiokąt foremny.",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nB B",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-28",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "28",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWszystkich liczb naturalnych pięciocyfrowych, w których zapisie dziesiętnym występują tylko\ncyfry  0, 5, 7  (np.  57 075, 55 555), jest",
    "options": [
      {
        "id": "A",
        "text": "53",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "2 \\cdot 43",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2 \\cdot 34",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "35",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nC A",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-29",
    "topicId": "dzial-14",
    "sectionTitle": "Dział 14: Statystyka",
    "taskNumber": "29",
    "type": "SINGLE_CHOICE",
    "content": "Na diagramie poniżej przedstawiono ceny pomidorów w szesnastu wybranych sklepach.\nUzupełnij tabelę. Wpisz w każdą pustą komórkę tabeli właściwą odpowiedź, wybraną\nspośród oznaczonych literami A–E.\n29.1. Mediana ceny kilograma pomidorów w tych wybranych sklepach jest\nrówna\n29.2. Średnia cena kilograma pomidorów w tych wybranych sklepach jest\nrówna",
    "options": [
      {
        "id": "A",
        "text": "5,80  zł",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "5,73  zł",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "5,85  zł",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "6,00  zł E.  5,70  zł",
        "is_correct": false
      }
    ],
    "correct_answer": "Wersja A Wersja B",
    "explanation": "wybranie dwóch poprawnych odpowiedzi. \n1 pkt – wybranie jednej poprawnej odpowiedzi. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \n29.1. C 29.1. B \n29.2. A 29.2. E",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-30",
    "topicId": "dzial-13",
    "sectionTitle": "Dział 13: Rachunek Prawdopodobieństwa",
    "taskNumber": "30",
    "type": "OPEN_CALCULATION",
    "content": "Ze zbioru ośmiu liczb  {2, 3, 4, 5, 6, 7, 8, 9}  losujemy ze zwracaniem kolejno dwa razy po\njednej liczbie.\nOblicz prawdopodobieństwo zdarzenia  𝑨  polegającego na tym, że iloczyn\nwylosowanych liczb jest podzielny przez  𝟏𝟓. Zapisz obliczenia.\n30.\n0–1–2",
    "correct_answer": "A",
    "explanation": "Sposób I \nZbiór wszystkich zdarzeń elementarnych obrazuje tabela  8 × 8, co oznacza, że moc zbioru  \nΩ  jest równa  64. \n \nW tabeli zaznaczamy iloczyny podzielne przez  15. \n \n 2 3 4 5 6 7 8 9 \n2         \n3    ×     \n4         \n5  ×   ×   × \n6    ×     \n7         \n8         \n9    ×     \n \nZdarzeń sprzyjających wylosowaniu liczb, których iloczyn jest podzielny przez  15, jest  6. \nZatem prawdopodobieństwo zdarzenia polegającego na wylosowaniu liczb, których iloczyn \njest podzielny przez  15, jest równe  6\n64 . \n \nSposób II (drzewo stochastyczne) \nRysujemy fragment drzewa stochastycznego rozważanego doświadczenia z uwzględnieniem \nwszystkich istotnych gałęzi. \nOznaczamy przez  A  zdarzenie polegające na tym, że iloczyn wylosowanych liczb jest \npodzielny przez  15. \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \nPrawdopodobieństwo zdarzenia  A  jest równe \n \nP(A) = 1\n8 \\cdot 1\n8  +  1\n8 \\cdot 1\n8  +  1\n8 \\cdot 1\n8 +  1\n8 \\cdot 1\n8 +  1\n8 \\cdot 1\n8 +  1\n8 \\cdot 1\n8 = 6\n64 \n  \n1\n8 \n1\n8 \n1\n8 \n1\n8 \n5 \n 3 \n 6 \n 9 \n 5 \n 5 \n3 \n 5 \n 6 \n 9 \n1\n8 \n1\n8 \n1\n8 \n1\n8 \n1\n8 \n1\n8",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-31_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "31.1",
    "type": "TRUE_FALSE",
    "content": "Oceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nŁączna liczba klientów obsłużonych w czasie wszystkich analizowanych dni\njest równa  L(30). P F\nW trzecim dniu analizowanego okresu obsłużono  336  klientów. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "FP",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nWersja A Wersja B \nFP FP",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-maj-2023-zad-31_2",
    "topicId": "dzial-14",
    "sectionTitle": "Dział 14: Statystyka",
    "taskNumber": "31.2",
    "type": "OPEN_CALCULATION",
    "content": "Którego dnia analizowanego okresu w aptece obsłużono największą liczbę klientów?\nOblicz liczbę klientów obsłużonych tego dnia. Zapisz obliczenia.\n31.2.\n0–1–2\nBRUDNOPIS (nie podlega ocenie)\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023",
    "correct_answer": "A",
    "explanation": "Sposób I \nWykresem funkcji  L(n) = −n2 + 22n + 279, gdzie  n  jest liczbą naturalną z przedziału  \n[1, 30], jest zbiór punktów leżących na paraboli o ramionach skierowanych w dół. \nPrzekształcamy wzór funkcji  L  do postaci kanonicznej:",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Maj 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-1",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWszystkich liczb całkowitych dodatnich spełniających nierówność  |x + 5| < 15  jest",
    "options": [
      {
        "id": "A",
        "text": "9",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "10",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "20",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "21",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA \n \n  \n                                                \n1 Rozporządzenie Ministra Edukacji i Nauki z dnia 10 czerwca 2022 r. w sprawie wymagań egzaminacyjnych dla \negzaminu maturalnego przeprowadzanego w roku szkolnym 2022/2023 i 2023/2024 (Dz.U. 2022, poz.1246).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdej dodatniej liczby rzeczywistej  x  iloczyn  \\sqrtx \\cdot \\sqrtx\n3\n\\cdot \\sqrtx\n6\njest równy",
    "options": [
      {
        "id": "A",
        "text": "x",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "\\sqrtx\n10",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "\\sqrtx\n18",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "x2",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-3",
    "topicId": "dzial-2",
    "sectionTitle": "Dział 2: Wyrażenia Algebraiczne i Wielomiany",
    "taskNumber": "3",
    "type": "OPEN_PROOF",
    "content": "Wykaż, że dla każdej liczby całkowitej  𝒌  reszta z dzielenia liczby  𝟒𝟗𝒌𝟐 + 𝟕𝒌 − 𝟐\nprzez  𝟕  jest równa  𝟓.",
    "correct_answer": "A",
    "explanation": "Przekształcamy równoważnie dane wyrażenie \n \n49k2 + 7k − 2 = 49k2 + 7k − 7 + 5 = 7 \\cdot (7k2 + k − 1) + 5 \n \nPonieważ  k  jest liczbą całkowitą, więc  7k2 + k − 1  jest liczbą całkowitą. Zatem   \n7 \\cdot (7k2 + k − 1)  jest wielokrotnością liczby  7. Stąd  7 \\cdot (7k2 + k − 1) + 5  przy dzieleniu \nprzez  7  daje resztę  5. To należało pokazać.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-4",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "4",
    "type": "SINGLE_CHOICE",
    "content": "Klient wpłacił do banku  30 000  zł  na lokatę dwuletnią. Po każdym rocznym okresie\noszczędzania bank dolicza odsetki w wysokości  7%  od kwoty bieżącego kapitału\nznajdującego się na lokacie.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPo dwóch latach oszczędzania łączna wartość doliczonych odsetek na tej lokacie (bez\nuwzględniania podatków) jest równa",
    "options": [
      {
        "id": "A",
        "text": "2100  zł",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "2247  zł",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4200  zł",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "4347  zł",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-5",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "5",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  log2  1\n8 + log2 4  jest równa",
    "options": [
      {
        "id": "A",
        "text": "(−1)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "1\n2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "5",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-6",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "6",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  (1 + \\sqrt5)\n2\n− (1 − \\sqrt5)\n2\njest równa",
    "options": [
      {
        "id": "A",
        "text": "0",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−10)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "4\\sqrt5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "2 + 2\\sqrt5",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-7",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "7",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdej liczby rzeczywistej  x  różnej od  0  i  2  wyrażenie  x2+x\n(x−2)2 \\cdot x−2\nx   jest równe",
    "options": [
      {
        "id": "A",
        "text": "x2+1\nx−2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "x+1\n2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "x2\n(x−2)2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "x+1\nx−2",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-8",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "8",
    "type": "OPEN_CALCULATION",
    "content": "Rozwiąż nierówność\n𝒙(𝟐𝒙 − 𝟏) < 𝟐𝒙\nZapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy nierówność równoważnie: \n \nx(2x − 1) < 2x \n \n2x2 − x − 2x < 0 \n \n2x2 − 3x < 0 \n \n2x (x − 3\n2) < 0 \n \nOdczytujemy i zapisujemy pierwiastki trójmianu  2x (x −\n3\n2):  x = 0  lub  x =\n3\n2 . \nPodajemy zbiór rozwiązań nierówności:  (0,\n3\n2)  lub  x ∈ (0,\n3\n2), lub zaznaczamy zbiór \nrozwiązań na osi liczbowej \n \n \n \n \n \n \n \nInny sposób realizacji obliczenia pierwiastków trójmianu: \nPrzekształcamy równoważnie nierówność do postaci  2x2 − 3x < 0, obliczamy wyróżnik  Δ  \ntrójmianu  2x2 − 3x, a następnie pierwiastki tego trójmianu: \n \nΔ = (−3)2 − 4 \\cdot 2 \\cdot 0 = 9 \n \nx = −(−3) − 3\n2 \\cdot 2 = 0    lub    x = −(−3) + 3\n2 \\cdot 2 = 3\n2 \n \nSposób II \nRozpatrujemy trzy przypadki: \na)  x ∈ (−\\infty, 0) \n \nPrzekształcamy nierówność, otrzymując: \n \nx(2x − 1) < 2x   /: x \n \n2x − 1 > 2 \n \nx > 3\n2 \n \nNierówność  x(2x − 1) < 2x  nie ma rozwiązań w zbiorze  (−\\infty, 0). \n \nb)  x = 0 \n \nGdy  x = 0, to otrzymujemy nierówność  0 \\cdot (2 \\cdot 0 − 1) < 2 \\cdot 0, która jest fałszywa. Zatem \nliczba  0  nie jest rozwiązaniem nierówności  x(2x − 1) < 2x. \n \nc)  x ∈ (0, +\\infty) \n \nPrzekształcamy nierówność, otrzymując: \n \n0 \n x \n3\n2 \nx(2x − 1) < 2x   /: x \n \n2x − 1 < 2 \n \nx < 3\n2 \n \nW zbiorze  (0, +\\infty)  rozwiązaniami nierówności  x(2x − 1) < 2x  są wszystkie liczby \nz przedziału  (0,\n3\n2). \nOstatecznie zbiorem wszystkich rozwiązań nierówności  x(2x − 1) < 2x  jest  (0,\n3\n2).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-9",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "9",
    "type": "OPEN_CALCULATION",
    "content": "Rozwiąż równanie\n𝒙𝟑 + 𝟒𝒙𝟐 − 𝟗𝒙 − 𝟑𝟔 = 𝟎\nZapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \nx3 + 4x2 − 9x − 36 = 0 \n \nx2(x + 4) − 9(x + 4) = 0 \n \n(x + 4)(x2 − 9) = 0 \n \n(x + 4)(x + 3)(x − 3) = 0 \n \nx + 4 = 0    lub    x + 3 = 0    lub    x − 3 = 0 \n \nx = −4    lub    x = −3   lub    x = 3 \n \nRozwiązaniami równania są liczby:  (−4), (−3), 3. \n \nSposób II \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \nx3 + 4x2 − 9x − 36 = 0 \n \nx(x2 − 9) + 4(x2 − 9) = 0 \n \n(x2 − 9)(x + 4) = 0 \n \n(x − 3)(x + 3)(x + 4) = 0 \n \nx − 3 = 0    lub    x + 3 = 0    lub    x + 4 = 0 \n \nx = 3    lub    x = −3   lub    x = −4 \n \nRozwiązaniami równania są liczby:  (−4), (−3), 3. \n \nSposób III \nObliczamy  W(3) = 0  i stwierdzamy, że liczba  3  jest pierwiastkiem wielomianu  \nW(x) = x3 + 4x2 − 9x − 36. \n \nZatem wielomian  W  jest podzielny przez dwumian  x − 3. Dzielimy wielomian  W  przez \ndwumian  x − 3  i otrzymujemy  \n \n(x3 + 4x2 − 9x − 36): (x − 3) = x2 + 7x + 12 \n \nZatem  W(x) = (x − 3)(x2 + 7x + 12). \n \nObliczamy pierwiastki trójmianu  x2 + 7x + 12: \n \nΔ = 72 − 4 \\cdot 1 \\cdot 12 = 1 \n \nx = −7 − 1\n2 \\cdot 1 = −4    oraz    x = −7 + 1\n2 \\cdot 1 = −3 \n \nRozwiązaniami równania są liczby:  (−4), (−3), 3. \n \nSposób IV \nObliczamy  W(3) = 0  i stwierdzamy, że liczba  3  jest pierwiastkiem wielomianu  \nW(x) = x3 + 4x2 − 9x − 36. \n \nObliczamy  W(−3) = 0  i stwierdzamy, że liczba  (−3)  jest pierwiastkiem wielomianu  \nW(x) = x3 + 4x2 − 9x − 36. \n \nObliczamy  W(−4) = 0  i stwierdzamy, że liczba  (−4)  jest pierwiastkiem wielomianu  \nW(x) = x3 + 4x2 − 9x − 36. \n \nPonieważ  W  jest wielomianem stopnia trzeciego, więc ma co najwyżej trzy pierwiastki \nrzeczywiste. Oznacza to, że jedynymi rozwiązaniami równania  x3 + 4x2 − 9x − 36 = 0  są \nliczby:  (−4), (−3), 3.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 3,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-10",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "10",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nRównanie  (x2−3x)(x+2)\nx2−4 = 0  w zbiorze liczb rzeczywistych ma dokładnie",
    "options": [
      {
        "id": "A",
        "text": "jedno rozwiązanie.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "dwa rozwiązania.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "trzy rozwiązania.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "cztery rozwiązania.",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-11",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "11",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nW kartezjańskim układzie współrzędnych  (x, y)  wykresy funkcji liniowych\nf(x) = (2m + 3)x + 5  oraz  g(x) = −x  nie mają punktów wspólnych dla",
    "options": [
      {
        "id": "A",
        "text": "m = −2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "m = −1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "m = 1",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "m = 2",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-12",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "12",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  prosta o równaniu  y = ax + b  przechodzi\nprzez punkty  A = (−3, −1)  oraz  B = (4, 3).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWspółczynnik  a  w równaniu tej prostej jest równy",
    "options": [
      {
        "id": "A",
        "text": "(−4)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(− 1\n2)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "4\n7",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-13_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "13.1",
    "type": "SINGLE_CHOICE",
    "content": "Uzupełnij tabelę. Wpisz w każdą pustą komórkę tabeli właściwą odpowiedź, wybraną\nspośród oznaczonych literami A–F.\nDziedziną funkcji  f  jest zbiór\nZbiorem wartości funkcji  f  jest zbiór",
    "options": [
      {
        "id": "A",
        "text": "[−3, −1] \\cup [1, 3]",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−3, 3)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(−3, −1) \\cup (1, 3)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "[−5, −1] \\cup [1, 5]\nE.  (−5, 5)\nF.  (−5, −1) \\cup (1, 5)",
        "is_correct": false
      }
    ],
    "correct_answer": "FA",
    "explanation": "wybranie dwóch poprawnych odpowiedzi. \n1 pkt – wybranie jednej poprawnej odpowiedzi. \n0 pkt – odpowiedzi niepoprawne albo brak odpowiedzi. \n \nRozwiązanie \nFA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-13_2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "13.2",
    "type": "NUMERIC_INPUT",
    "content": "Zapisz poniżej zbiór wszystkich rozwiązań nierówności  𝒇(𝒙) < −𝟏.\n................................ ................................ ................................ ................................ .................",
    "correct_answer": "(−5, −3)",
    "explanation": "rozwiązanie poprawne. \n0 pkt – rozwiązanie niepoprawne albo brak rozwiązania. \n \nKryteria uwzględniające specyficzne trudności w uczeniu się matematyki \n \nJeśli zdający zapisze zbiór rozwiązań nierówności w postaci  (−3, −5), to otrzymuje 1 punkt. \n \n \nRozwiązanie \n(−5, −3)",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-14",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "14",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja kwadratowa  f  jest określona wzorem  f(x) = ax2 + bx + 1, gdzie  a  oraz  b  są\npewnymi liczbami rzeczywistymi, takimi, że  a < 0  i  b > 0. Na jednym z rysunków A–D\nprzedstawiono fragment wykresu tej funkcji w kartezjańskim układzie współrzędnych  (x, y).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFragment wykresu funkcji  f  przedstawiono na rysunku",
    "options": [
      {
        "id": "A",
        "text": "Ramiona w górę (a > 0), wierzchołek w II ćwiartce (xw < 0, yw > 0)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "Ramiona w dół (a < 0), wierzchołek w II ćwiartce (xw < 0, yw > 0)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "Ramiona w górę (a > 0), wierzchołek w I ćwiartce (xw > 0, yw > 0)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "Ramiona w dół (a < 0), wierzchołek w I ćwiartce (xw > 0), przecięcie z OY w punkcie (0, 1)",
        "is_correct": true
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-15_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "15.1",
    "type": "NUMERIC_INPUT",
    "content": "Chory przyjął jednorazowo lek ℒ w dawce  200  mg.\nOblicz, ile mg leku 𝓛 pozostanie w organizmie chorego po  𝟏𝟐  godzinach od momentu\nprzyjęcia dawki. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Obliczamy  m(12) = 200 \\cdot (0,6)0,25\\cdot12 = 200 \\cdot (0,6)3 = 43,2  mg.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-15_2",
    "topicId": "dzial-7",
    "sectionTitle": "Dział 7: Ciągi Liczbowe",
    "taskNumber": "15.2",
    "type": "NUMERIC_INPUT",
    "content": "Liczby  m(2,5), m(4,5), m(6,5)  w podanej kolejności tworzą ciąg geometryczny.\nOblicz iloraz tego ciągu. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Obliczamy iloraz  q  ciągu geometrycznego: \n \nq = m(4,5)\nm(2,5) = m0 \\cdot (0,6)0,25\\cdot4,5\nm0 \\cdot (0,6)0,25\\cdot2,5 = (0,6)0,25\\cdot(4,5−2,5) = (0,6)0,5 \n \nInna przykładowa realizacja: \n \nq = m(6,5)\nm(4,5) = m0 \\cdot (0,6)0,25\\cdot6,5\nm0 \\cdot (0,6)0,25\\cdot4,5 = (0,6)1,625\n(0,6)1,125 = (0,6)0,5",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-16",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "16",
    "type": "SINGLE_CHOICE",
    "content": "Ciąg  (an)  jest określony wzorem  an = n−2\n3   dla każdej liczby naturalnej  n \\ge 1.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba wyrazów tego ciągu mniejszych od  10  jest równa",
    "options": [
      {
        "id": "A",
        "text": "28",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "31",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "32",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "27",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-17",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "17",
    "type": "SINGLE_CHOICE",
    "content": "Trzywyrazowy ciąg  (1, 4, a + 5)  jest arytmetyczny.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  a  jest równa",
    "options": [
      {
        "id": "A",
        "text": "0",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "7",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "11",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-18",
    "topicId": "dzial-7",
    "sectionTitle": "Dział 7: Ciągi Liczbowe",
    "taskNumber": "18",
    "type": "SINGLE_CHOICE",
    "content": "Ciąg geometryczny  (an)  jest określony dla każdej liczby naturalnej  n \\ge 1. W tym ciągu\na1 = 3,75  oraz  a2 = −7,5.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nSuma trzech początkowych wyrazów ciągu  (an)  jest równa",
    "options": [
      {
        "id": "A",
        "text": "11,25",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−18,75)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "15",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(−15)",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-19",
    "topicId": "dzial-8",
    "sectionTitle": "Dział 8: Trygonometria",
    "taskNumber": "19",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdego kąta ostrego  \\alpha  wyrażenie  cos \\alpha − cos \\alpha \\cdot sin2 \\alpha  jest równe",
    "options": [
      {
        "id": "A",
        "text": "cos3 \\alpha",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "sin2 \\alpha",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "1 − sin2 \\alpha",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "cos \\alpha",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-20",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "20",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest trójkąt, którego kąty mają miary  30°, 45°  oraz  105°. Długości boków trójkąta,\nleżących naprzeciwko tych kątów są równe – odpowiednio –  a, b  oraz  c  (zobacz rysunek).\nUzupełnij zdanie. Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami\nA–F i wpisz te litery w wykropkowanych miejscach.\nPole tego trójkąta poprawnie określają wyrażenia oznaczone literami:\n......................  oraz  ......................  .",
    "options": [
      {
        "id": "A",
        "text": "\\sqrt2\n2 \\cdot a \\cdot c",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "1\n4 \\cdot a \\cdot c",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "\\sqrt2\n4 \\cdot a \\cdot c",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "\\sqrt3\n4 \\cdot b \\cdot c\nE.  1\n2 \\cdot b \\cdot c\nF.  1\n4 \\cdot b \\cdot c",
        "is_correct": false
      }
    ],
    "correct_answer": "CF",
    "explanation": "wybranie dwóch odpowiedzi, z których obie są poprawne: C i F. \n1 pkt – wybranie jednej lub dwóch odpowiedzi, z których jedna jest poprawna: C albo F. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nCF",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-21",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "21",
    "type": "SINGLE_CHOICE",
    "content": "Odcinek  AB  jest średnicą okręgu o środku  S. Prosta  k  jest styczna do tego okręgu\nw punkcie  A. Prosta  𝑙  przecina ten okrąg w punktach  B  i  C. Proste  k  i  𝑙  przecinają się\nw punkcie  D, przy czym  |BC| = 4  i  |CD| = 3  (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nOdległość punktu  A  od prostej  𝑙  jest równa",
    "options": [
      {
        "id": "A",
        "text": "7\n2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "5",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "\\sqrt12",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "\\sqrt3 + 2",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-22",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "22",
    "type": "TRUE_FALSE",
    "content": "W trapezie  ABCD  o podstawach  AB  i  CD  przekątne przecinają się w punkcie  𝐸  (zobacz\nrysunek).\nOceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nTrójkąt  AB𝐸  jest podobny do trójkąta  CD𝐸. P F\nPole trójkąta  ACD  jest równe polu trójkąta  BCD. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "PP",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nPP",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-23",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "23",
    "type": "SINGLE_CHOICE",
    "content": "Na łukach  AB  i  CD  okręgu są oparte kąty wpisane  ADB  i  DBC, takie, że  |∡ADB| = 20°\ni  |∡DBC| = 40°  (zobacz rysunek). Cięciwy  AC  i  BD  przecinają się w punkcie  K.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nMiara kąta  DKC  jest równa",
    "options": [
      {
        "id": "A",
        "text": "80°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "60°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "50°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "40°",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-24",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "24",
    "type": "NUMERIC_INPUT",
    "content": "Pole trójkąta równobocznego  𝑇1  jest równe\n(1,5)2\\cdot\\sqrt3\n4   . Pole trójkąta równobocznego  𝑇2\njest równe\n(4,5)2\\cdot\\sqrt3\n4  .\nDokończ zdanie tak, aby było prawdziwe. Wybierz odpowiedź A albo B oraz jej\nuzasadnienie 1., 2. albo 3.\nTrójkąt  𝑇2  jest podobny do trójkąta  𝑇1  w skali\nA. 3,\nponieważ\n1. każdy z tych trójkątów ma dokładnie trzy osie symetrii.\n2. pole trójkąta  𝑇2  jest  9  razy większe od pola\ntrójkąta  𝑇1 .\nB. 9, 3. bok trójkąta  𝑇2  jest o  3  dłuższy od boku\ntrójkąta  𝑇1 .",
    "correct_answer": "A2",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA2",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-25",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "25",
    "type": "SINGLE_CHOICE",
    "content": "Pole równoległoboku  ABCD  jest równe  40\\sqrt6. Bok  AD  tego równoległoboku ma\ndługość  10, a kąt  ABC  równoległoboku ma miarę  135°  (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDługość boku  AB  jest równa",
    "options": [
      {
        "id": "A",
        "text": "8\\sqrt3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "8\\sqrt2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "16\\sqrt2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "16\\sqrt3",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-26",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "26",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja liniowa  f  jest określona wzorem  f(x) = −x + 1. Funkcja  g  jest liniowa.\nW kartezjańskim układzie współrzędnych  (x, y)  wykres funkcji  g  przechodzi przez punkt\nP = (0, −1)  i jest prostopadły do wykresu funkcji  f.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWzorem funkcji  g  jest",
    "options": [
      {
        "id": "A",
        "text": "g(x) = x + 1",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "g(x) = −x − 1",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "g(x) = −x + 1",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "g(x) = x − 1",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-27",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "27",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  punkty  A = (−1, 5)  oraz  C = (3, −3)  są\nprzeciwległymi wierzchołkami kwadratu  ABCD.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPole kwadratu  ABCD  jest równe",
    "options": [
      {
        "id": "A",
        "text": "8\\sqrt10",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "16\\sqrt5",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "40",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "80",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-28",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "28",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  dane są punkty  A = (1, 7)  oraz\nP = (3, 1). Punkt  P  dzieli odcinek  AB  tak, że  |AP| ∶ |PB| = 1 ∶ 3.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPunkt  B  ma współrzędne",
    "options": [
      {
        "id": "A",
        "text": "(9, −5)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(9, −17)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(7, −11)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(5, −5)",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-29_1",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "29.1",
    "type": "NUMERIC_INPUT",
    "content": "Uzupełnij zdanie. Wpisz odpowiednią wartość liczbową w wykropkowanym miejscu.\nObjętość tego ostrosłupa jest równa  ................................ .......... .",
    "correct_answer": "144",
    "explanation": "rozwiązanie poprawne. \n0 pkt – rozwiązanie niepoprawne albo brak rozwiązania. \n \nRozwiązanie \n144",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-29_2",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "29.2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nTangens kąta nachylenia najdłuższej krawędzi bocznej tego ostrosłupa do płaszczyzny\npodstawy jest równy",
    "options": [
      {
        "id": "A",
        "text": "\\sqrt2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "\\sqrt6\n3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "\\sqrt2\n2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "\\sqrt3\n3",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-30",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "30",
    "type": "SINGLE_CHOICE",
    "content": "Dany jest graniastosłup prawidłowy sześciokątny  ABCD𝐸𝐹A′B′C′D′𝐸′𝐹′, w którym krawędź\npodstawy ma długość  5. Przekątna  AD′  tego graniastosłupa jest nachylona do płaszczyzny\npodstawy pod kątem  45°  (zobacz rysunek).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPole ściany bocznej tego graniastosłupa jest równe",
    "options": [
      {
        "id": "A",
        "text": "12,5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "25",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "50",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "100",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-31",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "31",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWszystkich liczb naturalnych trzycyfrowych o sumie cyfr równej  3  jest",
    "options": [
      {
        "id": "A",
        "text": "8",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "4",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "6",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-32",
    "topicId": "dzial-13",
    "sectionTitle": "Dział 13: Rachunek Prawdopodobieństwa",
    "taskNumber": "32",
    "type": "OPEN_CALCULATION",
    "content": "Ze zbioru ośmiu kolejnych liczb naturalnych – od  1  do  8  – losujemy kolejno bez zwracania\ndwa razy po jednej liczbie.\nNiech  A  oznacza zdarzenie polegające na tym, że suma wylosowanych liczb jest\ndzielnikiem liczby  8.\nOblicz prawdopodobieństwo zdarzenia  𝑨. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nZdarzeniami elementarnymi są wszystkie uporządkowane pary liczb  (a, b), gdzie   \na, b ∈ {1, 2, 3, 4, 5, 6, 7, 8}  i  a \\ne b. \n \nLiczba wszystkich zdarzeń elementarnych jest równa  |Ω| = 8 \\cdot 7 = 56. \n \nZdarzeniu  A  sprzyjają następujące zdarzenia elementarne: \n \n(1, 3), (1, 7), (2, 6), (3, 1), (3, 5), (5, 3), (6, 2), (7, 1), \n \nwięc  |A| = 8. \n \nPrawdopodobieństwo zdarzenia  A  jest równe:  P(A) =\n|A|\n|Ω| =\n8\n56 =\n1\n7 . \n \nSposób II \nZdarzeniami elementarnymi są wszystkie uporządkowane pary liczb  (a, b), gdzie   \na, b ∈ {1, 2, 3, 4, 5, 6, 7, 8}  i  a \\ne b. \nJest to model klasyczny. Budujemy tabelę ilustrującą sytuację opisaną w zadaniu. \n \n  I losowanie   \n  1 2 3 4 5 6 7 8 \nII losowanie \n1   +    +  \n2      +   \n3 +    +    \n4         \n5   +      \n 6  +       \n 7 +        \n 8         \n \n \nBiałe pola tabeli odpowiadają zdarzeniom elementarnym. Symbolem  „+”  oznaczono pola \nodpowiadające zdarzeniom elementarnym sprzyjającym zdarzeniu  A. \nWszystkich zdarzeń elementarnych w tym doświadczeniu jest  56. \nLiczba wszystkich zdarzeń elementarnych sprzyjających zdarzeniu  A  jest równa  8. \nStąd  P(A) =\n|A|\n|Ω| = 8\n56 = 1\n7 .",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-czerwiec-2023-zad-33",
    "topicId": "dzial-14",
    "sectionTitle": "Dział 14: Statystyka",
    "taskNumber": "33",
    "type": "OPEN_CALCULATION",
    "content": "Działka ma kształt trapezu. Podstawy  AB  i  CD  tego trapezu mają długości  |AB| = 400 m\noraz  |CD| = 100 m. Wysokość trapezu jest równa  75 m, a jego kąty  DAB  i  ABC  są\nostre.\nZ działki postanowiono wydzielić plac w kształcie prostokąta z przeznaczeniem na parking.\nDwa z wierzchołków tego prostokąta mają leżeć na podstawie  AB  tego trapezu, a dwa\npozostałe – 𝐸  oraz  𝐹 – na ramionach  AD  i  BC  trapezu (zobacz rysunek).\nWyznacz długości boków prostokąta, dla których powierzchnia wydzielonego placu\nbędzie największa. Wyznacz tę największą powierzchnię.\nZapisz obliczenia.\nWskazówka:\nAby powiązać ze sobą wymiary prostokąta, skorzystaj z tego, że pole trapezu  ABCD  jest\nsumą pól trapezów  AB𝐹𝐸  oraz  𝐸𝐹CD:\nPABCD = PAB𝐹𝐸 + P𝐸𝐹CD\n100 m\nplac przeznaczony na parking\n75 m\n400 m\nB\n𝐸\n𝐹\nA\nD\nC\nBRUDNOPIS (nie podlega ocenie)\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023",
    "correct_answer": "A",
    "explanation": "Przyjmijmy oznaczenia jak na rysunku. \n \n \n \n \n \n \n \n \n \n \n \n \nZ porównania sumy pól trapezów  AB𝐹𝐸  i  𝐸𝐹CD  otrzymujemy \n \nPABCD = PAB𝐹𝐸 + P𝐸𝐹CD \n \n100 + 400\n2 \\cdot 75 = 400 + y\n2 \\cdot x + 100 + y\n2 \\cdot (75 − x) \n \nStąd otrzymujemy \ny = 400 − 4x \n \nZatem pole  P  placu wyraża się wzorem  P(x) = x \\cdot (400 − 4x)  dla  x ∈ (0,75]. \nKorzystamy z własności funkcji kwadratowej i obliczamy wartość  x, dla którego wyrażenie  \nx(400 − 4x)  osiąga wartość największą: \n \np = x1 + x2\n2 = 0 + 100\n2 = 50 \n \n400 m \n100 m \nA \n B \nC \nD \nx \n75 m \n y \n𝐸 \n 𝐹 \nPonieważ  50 ∈ (0, 75], więc funkcja  P  osiąga wartość największa dla argumentu  x = 50. \nWtedy  y = 200. Zatem plac o największej powierzchni ma wymiary  50 m x 200 m. \nPowierzchnia placu o największej powierzchni jest równa  50 m \\cdot 200 m = 10 000 m2 .",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 4,
    "sourceYear": "Matura Czerwiec 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-1",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "1",
    "type": "SINGLE_CHOICE",
    "content": "Dana jest nierówność\n$$|x - 5| < 2$$\nNa którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych spełniających powyższą nierówność? Wybierz właściwą odpowiedź spośród podanych.",
    "options": [
      {
        "id": "A",
        "text": "⟨3, 7⟩",
        "is_correct": false,
        "numberLine": {
          "min": 0,
          "max": 10,
          "ticks": [
            3,
            7
          ],
          "intervals": [
            {
              "from": 3,
              "to": 7,
              "fromIncluded": true,
              "toIncluded": true
            }
          ]
        }
      },
      {
        "id": "B",
        "text": "(-∞, 3⟩ ∪ ⟨7, +∞)",
        "is_correct": false,
        "numberLine": {
          "min": 0,
          "max": 10,
          "ticks": [
            3,
            7
          ],
          "intervals": [
            {
              "from": null,
              "to": 3,
              "toIncluded": true
            },
            {
              "from": 7,
              "to": null,
              "fromIncluded": true
            }
          ]
        }
      },
      {
        "id": "C",
        "text": "(-∞, 3) ∪ (7, +∞)",
        "is_correct": false,
        "numberLine": {
          "min": 0,
          "max": 10,
          "ticks": [
            3,
            7
          ],
          "intervals": [
            {
              "from": null,
              "to": 3,
              "toIncluded": false
            },
            {
              "from": 7,
              "to": null,
              "fromIncluded": false
            }
          ]
        }
      },
      {
        "id": "D",
        "text": "(3, 7)",
        "is_correct": true,
        "numberLine": {
          "min": 0,
          "max": 10,
          "ticks": [
            3,
            7
          ],
          "intervals": [
            {
              "from": 3,
              "to": 7,
              "fromIncluded": false,
              "toIncluded": false
            }
          ]
        }
      }
    ],
    "correct_answer": "D",
    "explanation": "Nierówność $|x - 5| < 2$ oznacza odległość liczb na osi od punktu $5$ mniejszą od $2$.\nRozwiązujemy: $-2 < x - 5 < 2 \\iff 3 < x < 7$.\nZbiorem rozwiązań jest przedział otwarty $(3, 7)$. Na osi odpowiada to odcinkowi od $3$ do $7$ z pustymi kółkami na końcach (Rysunek D).",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "2",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  3\\sqrt45 − \\sqrt20  jest równa",
    "options": [
      {
        "id": "A",
        "text": "(7 \\cdot 5)\n1\n2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "5\n1\n2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "7",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "7 \\cdot 5\n1\n2",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-3",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "3",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba  log25 1 − 1\n2 log25 5  jest równa",
    "options": [
      {
        "id": "A",
        "text": "(− 1\n4)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(− 1\n2)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "1\n4",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "1\n2",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-4",
    "topicId": "dzial-2",
    "sectionTitle": "Dział 2: Wyrażenia Algebraiczne i Wielomiany",
    "taskNumber": "4",
    "type": "OPEN_PROOF",
    "content": "Wykaż, że dla każdej liczby naturalnej  𝒏 \\ge 𝟏  liczba  𝟑𝒏𝟑 + 𝟏𝟖𝒏𝟐 + 𝟏𝟓𝒏  jest\npodzielna przez  𝟔.",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równoważnie wyrażenie  3n3 + 18n2 + 15n  do postaci iloczynu \n \n3n3 + 18n2 + 15n = 3n(n2 + 6n + 5) = 3n(n + 1)(n + 5) \n \nPonieważ liczby  n  oraz  n + 1  są kolejnymi liczbami naturalnymi, to jedna z nich jest liczbą \nparzystą, zatem iloczyn  n(n + 1)  jest  liczbą parzystą, więc iloczyn  3n(n + 1)(n + 5)  jest \npodzielny przez  6. To należało wykazać. \n \nSposób II  \nPrzekształcamy równoważnie wyrażenie  3n3 + 18n2 + 15n  do postaci iloczynu \n \n3n3 + 18n2 + 15n = 3(n3 + 6n2 + 5n) \n \nRozważmy dwa przypadki: gdy  n  jest liczbą parzystą oraz gdy  n  jest liczbą nieparzystą. \n \nJeśli  n  jest liczbą parzystą, to wtedy  n3  jest liczbą parzystą, 6n2  jest liczba parzystą i  5n  \njest liczbą parzystą. Stąd  n3 + 6n2 + 5n  jest liczbą parzystą (jako suma liczb parzystych). \nZatem  3(n3 + 6n2 + 5n)  dzieli się przez  3  oraz przez  2, czyli dzieli się przez  6. \n \nJeśli  n  jest liczbą nieparzystą, to wtedy  n3  jest liczbą nieparzystą, 6n2  jest liczba parzystą \ni  5n  jest liczbą nieparzystą. Stąd  n3 + 6n2 + 5n  jest liczbą parzystą (jako suma dwóch \nliczb nieparzystych i liczby parzystej). Zatem  3(n3 + 6n2 + 5n)  dzieli się przez  3  oraz \nprzez  2, czyli dzieli się przez  6. To należało wykazać.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-5",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "5",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWartość wyrażenia  3−1\n(− 1\n9\n)\n−2 \\cdot 81  jest równa",
    "options": [
      {
        "id": "A",
        "text": "1\n3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(− 1\n3)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(−3)",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-6",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "6",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWartość wyrażenia  (2 − \\sqrt3)\n2\n− (\\sqrt3 − 2)\n2\njest równa",
    "options": [
      {
        "id": "A",
        "text": "(−2\\sqrt3)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "0",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "6",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "8\\sqrt3",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-7",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "7",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdej liczby rzeczywistej  x  różnej od  0  wartość wyrażenia  1\n2x − x  jest równa\nwartości wyrażenia",
    "options": [
      {
        "id": "A",
        "text": "1\nx",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "1−x\n2x",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "1−2x2\n2x",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "− 1\n2x",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-8",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "8",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nRównanie  (x2−3x)(x2+1)\nx2−25 = 0  w zbiorze liczb rzeczywistych ma dokładnie",
    "options": [
      {
        "id": "A",
        "text": "jedno rozwiązanie.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "dwa rozwiązania.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "trzy rozwiązania.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "cztery rozwiązania.",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-9",
    "topicId": "dzial-3",
    "sectionTitle": "Dział 3: Równania i Nierówności",
    "taskNumber": "9",
    "type": "OPEN_CALCULATION",
    "content": "Rozwiąż równanie\n𝟑𝒙𝟑 − 𝟐𝒙𝟐 − 𝟑𝒙 + 𝟐 = 𝟎\nZapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \n3x3 − 2x2 − 3x + 2 = 0 \n \nx2(3x − 2) − (3x − 2) = 0 \n \n(3x − 2)(x2 − 1) = 0 \n \n(3x − 2)(x − 1)(x + 1) = 0 \n \n3x − 2 = 0    lub    x − 1 = 0    lub    x + 1 = 0 \n \nx = 2\n3     lub    x = 1   lub    x = −1 \n \nRozwiązaniami równania są liczby:  (−1), 2\n3 , 1. \n \nSposób II \nPrzekształcamy równanie równoważnie i stosujemy metodę grupowania wyrazów: \n \n3x3 − 2x2 − 3x + 2 = 0 \n \n3x(x2 − 1) − 2(x2 − 1) = 0 \n \n(3x − 2)(x2 − 1) = 0 \n \n(3x − 2)(x − 1)(x + 1) = 0 \n \n3x − 2 = 0    lub    x − 1 = 0    lub    x + 1 = 0 \n \nx = 2\n3     lub    x = 1   lub    x = −1 \n \nRozwiązaniami równania są liczby:  (−1), 2\n3 , 1. \n \nSposób III \nObliczamy  W(1) = 0  i stwierdzamy, że liczba  1  jest pierwiastkiem wielomianu  \nW(x) = 3x3 − 2x2 − 3x + 2. \n \nZatem wielomian  W  jest podzielny przez dwumian  x − 1. Dzielimy wielomian  W  przez \ndwumian  x − 1  i otrzymujemy  \n \n(3x3 − 2x2 − 3x + 2): (x − 1) = 3x2 + x − 2 \n \nZatem  W(x) = (x − 1)(3x2 + x − 2). \n \nObliczamy pierwiastki trójmianu  3x2 + x − 2: \n \nΔ = 12 − 4 \\cdot 3 \\cdot (−2) = 25 \n \nx = −1 − 5\n2 \\cdot 3 = −1    oraz    x = −1 + 5\n2 \\cdot 3 = 2\n3",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 3,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-10",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "10",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nW kartezjańskim układzie współrzędnych  (x, y), punkt  (−8, 6)  jest punktem przecięcia\nprostych o równaniach",
    "options": [
      {
        "id": "A",
        "text": "2x + 3y = 2 i −x + y = −14.",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3x + 2y = −12 i 2x + y = 10.",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "x + y = −2 i x − 2y = 4.",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "x − y = −14 i −2x + y = 22.",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-11",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "11",
    "type": "SINGLE_CHOICE",
    "content": "Miejscem zerowym funkcji liniowej  f  jest liczba  1. Wykres tej funkcji przechodzi przez\npunkt  (−1, 4).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWzór funkcji  f  ma postać",
    "options": [
      {
        "id": "A",
        "text": "f(x) = − 1\n2 x + 1",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "f(x) = − 1\n3 x + 1\n3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "f(x) = −2x + 2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "f(x) = −3x + 1",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-12",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "12",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja  f  jest określona dla każdej liczby rzeczywistej  x  wzorem  f(x) = x−k\nx2+1 , gdzie  k\njest pewną liczbą rzeczywistą. Ta funkcja spełnia warunek  f(1) = 2.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWartość współczynnika  k  we wzorze tej funkcji jest równa",
    "options": [
      {
        "id": "A",
        "text": "(−3)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(−4)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "4",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-13",
    "topicId": "dzial-6",
    "sectionTitle": "Dział 6: Funkcja Kwadratowa",
    "taskNumber": "13",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja kwadratowa  f  jest określona wzorem  f(x) = (x − 13)2 − 256. Jednym z miejsc\nzerowych tej funkcji jest liczba  (−3).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDrugim miejscem zerowym funkcji  f  jest liczba",
    "options": [
      {
        "id": "A",
        "text": "(−29)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−23)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "23",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "29",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-14_1",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "14.1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja  f  jest rosnąca w przedziale",
    "options": [
      {
        "id": "A",
        "text": "[−5, 4]",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "[5, 7]",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "[1, 5]",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "[−1, 5]",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-14_2",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "14.2",
    "type": "NUMERIC_INPUT",
    "content": "Zapisz poniżej w postaci sumy przedziałów zbiór wszystkich argumentów, dla których\nfunkcja  𝒇  przyjmuje wartości większe od  𝟏.\n................................ ................................ ................................ ................................ .................",
    "correct_answer": "[−7, −5] \\cup [−4, 2) \\cup (5, 7]",
    "explanation": "rozwiązanie poprawne. \n0 pkt – rozwiązanie niepoprawne lub niepełne albo brak rozwiązania. \n \nRozwiązanie \n[−7, −5] \\cup [−4, 2) \\cup (5, 7] \n \nKryteria uwzględniające specyficzne trudności w uczeniu się matematyki \n \nJeśli zdający pomyli porządek liczb na osi liczbowej i zapisze rozwiązanie jako np.   \n[−7, −5] \\cup (2, −4] \\cup (5, 7]  albo  [−5, −7] \\cup [−4, 2) \\cup [7,5), to otrzymuje 1 punkt.",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-14_3",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "14.3",
    "type": "SINGLE_CHOICE",
    "content": "Funkcja  g  jest określona za pomocą funkcji  f  następująco:  g(x) = f(−x)  dla każdego\nx ∈ [−7, −5] \\cup [−4, 4] \\cup [5, 7]. Na jednym z rysunków  A–D  przedstawiono,\nw kartezjańskim układzie współrzędnych  (x, y), wykres funkcji  y = g(x).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWykres funkcji  y = g(x)  przedstawiono na rysunku",
    "options": [
      {
        "id": "A",
        "text": "Symetria wykresu funkcji f względem osi OX: y = -f(x)",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "Symetria wykresu funkcji f względem osi OY: y = f(-x)",
        "is_correct": true
      },
      {
        "id": "C",
        "text": "Symetria wykresu funkcji f względem początku układu współrzędnych: y = -f(-x)",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "Przesunięcie równoległe wykresu funkcji f wzdłuż osi OX",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-15",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "15",
    "type": "SINGLE_CHOICE",
    "content": "Funkcje  A, B, C, D, 𝐸  oraz  𝐹  są określone dla każdej liczby rzeczywistej  x. Wzory tych\nfunkcji podano poniżej.\nUzupełnij zdanie. Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami\nA–F i wpisz te litery w wykropkowanych miejscach.\nPrzedział  (−\\infty, 2]  jest zbiorem wartości funkcji   .............   oraz   .............  .",
    "options": [
      {
        "id": "A",
        "text": "A(x) = −(x − 3)2 + 2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "B(x) = x2 + 2",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "C(x) = −5(x − 2)2",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "D(x) = (x − 2)2\nE.  𝐸(x) = 2x2 − 8x + 10\nF.  𝐹(x) = −2x2 + 4x",
        "is_correct": false
      }
    ],
    "correct_answer": "AF",
    "explanation": "wybranie dwóch odpowiedzi, z których obie są poprawne. \n1 pkt – wybranie jednej lub dwóch odpowiedzi, z których dokładnie jedna jest poprawna. \n0 pkt – odpowiedzi niepoprawne albo brak odpowiedzi. \n \nRozwiązanie \nAF",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-16",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "16",
    "type": "SINGLE_CHOICE",
    "content": "Ciąg  (an)  jest określony wzorem  an = (−1)n \\cdot n+1\n2   dla każdej liczby naturalnej  n \\ge 1.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nTrzeci wyraz tego ciągu jest równy",
    "options": [
      {
        "id": "A",
        "text": "2",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(−2)",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(−1)",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-17",
    "topicId": "dzial-7",
    "sectionTitle": "Dział 7: Ciągi Liczbowe",
    "taskNumber": "17",
    "type": "TRUE_FALSE",
    "content": "Dany jest ciąg geometryczny  (an), określony dla każdej liczby naturalnej  n \\ge 1. Pierwszy\nwyraz tego ciągu jest równy  128, natomiast iloraz ciągu jest równy  (− 1\n2).\nOceń prawdziwość poniższych stwierdzeń. Wybierz P, jeśli stwierdzenie jest\nprawdziwe, albo F – jeśli jest fałszywe.\nWyraz  a2023  jest liczbą ujemną. P F\nRóżnica  a3 − a2  jest równa  96. P F",
    "options": [
      {
        "id": "A",
        "text": "PRAWDA",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "FAŁSZ",
        "is_correct": false
      }
    ],
    "correct_answer": "FP",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nFP",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-18",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "18",
    "type": "OPEN_CALCULATION",
    "content": "Ciąg  (3x2 + 5x, x2, 20 − x2)  jest arytmetyczny.\nOblicz  𝒙. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nZ własności ciągu arytmetycznego otrzymujemy \n \n3x2 + 5x + 20 − x2\n2 = x2 \n \n2x2 + 5x + 20 = 2x2 \n \nx = −4 \n \n \nSposób II \nZ definicji/własności ciągu arytmetycznego otrzymujemy \n \nx2 − (3x2 + 5x) = (20 − x2) − x2 \n \nStąd \n \n−2x2 − 5x = 20 − 2x2 \n \nx = −4",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-19",
    "topicId": "dzial-8",
    "sectionTitle": "Dział 8: Trygonometria",
    "taskNumber": "19",
    "type": "SINGLE_CHOICE",
    "content": "Kąt  \\alpha  jest ostry i  cos \\alpha = 2\\sqrt6\n7  .\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nSinus kąta  \\alpha  jest równy",
    "options": [
      {
        "id": "A",
        "text": "24\n49",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "5\n7",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "25\n49",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "\\sqrt6\n7",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-20",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "20",
    "type": "SINGLE_CHOICE",
    "content": "Trapez  𝑇1 , o polu równym  52  i obwodzie  36, jest podobny do trapezu  𝑇2 . Pole trapezu\n𝑇2  jest równe  13.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nObwód trapezu  𝑇2  jest równy",
    "options": [
      {
        "id": "A",
        "text": "18",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "9",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "169\n9",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "52\n3",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-21",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "21",
    "type": "SINGLE_CHOICE",
    "content": "Koło ma promień równy  3.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nObwód wycinka tego koła o kącie środkowym  30°  jest równy",
    "options": [
      {
        "id": "A",
        "text": "3\n4 𝜋",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "1\n2 𝜋",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3\n4 𝜋 + 6",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "1\n2 𝜋 + 6",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-22",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "22",
    "type": "SINGLE_CHOICE",
    "content": "W okręgu  𝒪  kąt środkowy  \\beta  oraz kąt wpisany  \\alpha  są oparte na tym samym łuku. Kąt  \\beta\nma miarę o  40°  większą od kąta  \\alpha.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nMiara kąta  \\beta  jest równa",
    "options": [
      {
        "id": "A",
        "text": "40°",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "80°",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "100°",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "120°",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-23",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "23",
    "type": "SINGLE_CHOICE",
    "content": "W trójkącie  ABC  długość boku  AC  jest równa  3, a długość boku  BC  jest równa  4.\nDwusieczna kąta  ACB  przecina bok  AB  w punkcie  D.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nStosunek  |AD| ∶ |DB|  jest równy",
    "options": [
      {
        "id": "A",
        "text": "4 ∶ 3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "4 ∶ 7",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3 ∶ 4",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "3 ∶ 7",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-24",
    "topicId": "dzial-9",
    "sectionTitle": "Dział 9: Planimetria",
    "taskNumber": "24",
    "type": "OPEN_CALCULATION",
    "content": "Dany jest trapez równoramienny  ABCD, w którym podstawa  CD  ma długość  6, ramię  AD\nma długość  4, a kąty  BAD  oraz  ABC  mają miarę  60°  (zobacz rysunek).\nOblicz pole tego trapezu. Zapisz obliczenia.\nC\nD\n60°\n6\n4\nB\nA\n60°",
    "correct_answer": "A",
    "explanation": "Sposób I \nNiech  D𝐸  oraz  C𝐹  będą wysokościami trapezu opuszczonymi na podstawę  AB. \n \n \n \n \n \n \n \n  \n𝐸 \n 𝐹 \nC \nD \n60° \n6 \n4 \nB \nA \n60° \nStosując definicje funkcji trygonometrycznych dla kąta  BAD  w trójkącie prostokątnym  𝐹AD  \n(lub korzystając ze związków miarowych dla trójkąta o kątach  30°, 60°  i  90°), otrzymujemy \n \n|A𝐸|\n|AD| = c𝑜s 60°, więc  |A𝐸| = |AD| \\cdot c𝑜s 60° = 4 \\cdot 1\n2 = 2 \n \noraz \n \n|D𝐸|\n|AD| = s𝑖n 60°, więc  |D𝐸| = |AD| \\cdot s𝑖n 60° = 4 \\cdot\n\\sqrt3\n2 = 2\\sqrt3. \nPonieważ trapez jest równoramienny, więc  |A𝐸| = |𝐹B|. Zatem   \n|AB| = |CD| + 2 \\cdot |A𝐸| = 10.  \nObliczamy pole  P  trapezu  ABCD: \n \nP =\n|AB| + |CD|\n2 \\cdot |D𝐸| = 10 + 6\n2 \\cdot 2\\sqrt3 = 16\\sqrt3 \n \nSposób II \nProwadzimy odcinek  C𝐺  równoległy do ramienia  AD  tak, żeby koniec  𝐺  tego odcinka \nleżał na podstawie  AB  trapezu  ABCD. \n \n \n \n \n \n \n \n \n \n \n \nOdcinek  C𝐺  dzieli trapez  ABCD  na równoległobok  A𝐺CD  i trójkąt równoboczny  𝐺BC. \nZatem pole  P  trapezu  ABCD  jest równe \n \nP = PA𝐺CD + P𝐺BC = 4 \\cdot 6 \\cdot s𝑖n 60° + 42\\sqrt3\n4 = 24 \\cdot \\sqrt3\n2 + 4\\sqrt3 = 16\\sqrt3",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-25",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "25",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  dane są prosta  k  o równaniu\ny = 3\n4 x − 7\n4  oraz punkt  P = (12, −1).\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nProsta przechodząca przez punkt  P  i równoległa do prostej  k  ma równanie",
    "options": [
      {
        "id": "A",
        "text": "y = − 3\n4 x + 8",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "y = 3\n4 x − 10",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "y = 4\n3 x − 17",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "y = − 4\n3 x + 15",
        "is_correct": false
      }
    ],
    "correct_answer": "B",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB \n \n  \n𝐺 \nC \nD \n60° \n6 \n4 \nB \nA \n60°",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-26",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "26",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  dany jest okrąg  𝒪  o środku  S = (−1, 2)\ni promieniu  3.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nOkrąg  𝒪  jest określony równaniem",
    "options": [
      {
        "id": "A",
        "text": "(x − 1)2 + (y + 2)2 = 9",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "(x − 1)2 + (y + 2)2 = 3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "(x + 1)2 + (y − 2)2 = 9",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "(x + 1)2 + (y − 2)2 = 3",
        "is_correct": false
      }
    ],
    "correct_answer": "C",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nC",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-27",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "27",
    "type": "NUMERIC_INPUT",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  proste o równaniach:\n• y = \\sqrt3x + 6\n• y = −\\sqrt3x + 6\n• y = − 1\n\\sqrt3 x − 2,\nprzecinają się w punktach, które są wierzchołkami trójkąta  KLM.\nDokończ zdanie tak, aby było prawdziwe. Wybierz odpowiedź A albo B oraz jej\nuzasadnienie 1., 2. albo 3.\nTrójkąt  KLM  jest\nA. równoramienny,\nponieważ\n1.\noś  Ox  przechodzi przez jeden z wierzchołków\ntego trójkąta i środek jednego z boków tego\ntrójkąta.\n2. dwie z tych prostych są prostopadłe.\nB. prostokątny,\n3. oś  Oy  zawiera dwusieczną tego trójkąta.",
    "correct_answer": "B2",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepełna lub niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nB2",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-28",
    "topicId": "dzial-10",
    "sectionTitle": "Dział 10: Geometria Analityczna",
    "taskNumber": "28",
    "type": "SINGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzędnych  (x, y)  punkt  A = (−1, −4)  jest wierzchołkiem\nrównoległoboku  ABCD. Punkt  S = (2, 2)  jest środkiem symetrii tego równoległoboku.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDługość przekątnej  AC  równoległoboku  ABCD  jest równa",
    "options": [
      {
        "id": "A",
        "text": "\\sqrt5",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "2\\sqrt5",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "3\\sqrt5",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "6\\sqrt5",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-29_1",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "29.1",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nPole powierzchni całkowitej tego graniastosłupa jest równe",
    "options": [
      {
        "id": "A",
        "text": "216 + 18\\sqrt3",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "216 + 54\\sqrt3",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "216 + 216\\sqrt3",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "216 + 108\\sqrt3",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-29_2",
    "topicId": "dzial-11",
    "sectionTitle": "Dział 11: Stereometria",
    "taskNumber": "29.2",
    "type": "NUMERIC_INPUT",
    "content": "Oblicz cosinus kąta nachylenia dłuższej przekątnej tego graniastosłupa do\npłaszczyzny podstawy graniastosłupa. Zapisz obliczenia.",
    "correct_answer": "2",
    "explanation": "rozwiązanie poprawne. \n0 pkt – rozwiązanie niepoprawne albo brak rozwiązania. \n \nRozwiązanie \n2\n\\sqrt5",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-30",
    "topicId": "dzial-12",
    "sectionTitle": "Dział 12: Kombinatoryka",
    "taskNumber": "30",
    "type": "SINGLE_CHOICE",
    "content": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWszystkich liczb naturalnych czterocyfrowych, w których zapisie dziesiętnym cyfry się\nnie powtarzają, jest",
    "options": [
      {
        "id": "A",
        "text": "9 \\cdot 10 \\cdot 10 \\cdot 10 \\cdot 10",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "9 \\cdot 9 \\cdot 9 \\cdot 9",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "10 \\cdot 9 \\cdot 8 \\cdot 7",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "9 \\cdot 9 \\cdot 8 \\cdot 7",
        "is_correct": false
      }
    ],
    "correct_answer": "D",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nD",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-31",
    "topicId": "dzial-13",
    "sectionTitle": "Dział 13: Rachunek Prawdopodobieństwa",
    "taskNumber": "31",
    "type": "OPEN_CALCULATION",
    "content": "Ze zbioru pięciu liczb  {1, 2, 3, 4, 5}  losujemy bez zwracania kolejno dwa razy po jednej\nliczbie.\nOblicz prawdopodobieństwo zdarzenia  𝑨  polegającego na tym, że obie wylosowane\nliczby są nieparzyste. Zapisz obliczenia.",
    "correct_answer": "A",
    "explanation": "Sposób I \nZdarzeniami elementarnymi są wszystkie uporządkowane pary liczb  (a, b), gdzie   \na, b ∈ {1, 2, 3, 4, 5}  i  a \\ne b. \n \nLiczba wszystkich zdarzeń elementarnych jest równa  |Ω| = 5 \\cdot 4 = 20. \n \nZdarzeniu  A  sprzyjają następujące zdarzenia elementarne: \n \n(1, 3), (1, 5), (3, 1), (3, 5), (5, 1), (5, 3), \n \nwięc  |A| = 6. \n \nPrawdopodobieństwo zdarzenia  A  jest równe:  P(A) = |A|\n|Ω| = 6\n20 = 3\n10 . \n \nSposób II (drzewo stochastyczne) \nRysujemy fragment drzewa stochastycznego rozważanego doświadczenia z uwzględnieniem \nwszystkich istotnych gałęzi. \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \nPrawdopodobieństwo zdarzenia  A  jest równe \n \nP(A) = 1\n5 \\cdot 1\n4  +  1\n5 \\cdot 1\n4 +  1\n5 \\cdot 1\n4  + 1\n5 \\cdot 1\n4  + 1\n5 \\cdot 1\n4  + 1\n5 \\cdot 1\n4 = 6\n20 = 3\n10 \n \n \nSposób IIa  (drzewo stochastyczne uproszczone) \nRozpatrujemy dwuetapowe doświadczenie losowe. Niech  n  odpowiada zdarzeniu \nwylosowania liczby nieparzystej, natomiast  p  – zdarzeniu wylosowania liczby parzystej. \nRysujemy drzewo z uwzględnieniem wszystkich istotnych gałęzi. \n \n  \n1\n5 \n1\n5 \n1\n5 \n3 \n 5 \n 1 \n 5 \n 1 \n 3 \n1 \n 3 \n 5 \n1\n4 \n1\n4 \n1\n4 \n1\n4 \n1\n4 \n1\n4 \n \n \n \n \n \n \n \n \n \n \n \nPrawdopodobieństwo zdarzenia  A  jest równe \n \nP(A) = 3\n5 \\cdot 2\n4 = 6\n20 = 3\n10",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 2,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-32",
    "topicId": "dzial-1",
    "sectionTitle": "Dział 1: Liczby Rzeczywiste",
    "taskNumber": "32",
    "type": "SINGLE_CHOICE",
    "content": "Na diagramie przedstawiono rozkład wynagrodzenia brutto wszystkich stu pracowników\npewnej firmy za styczeń 2023 roku.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nŚrednia wynagrodzenia brutto wszystkich pracowników tej firmy za styczeń 2023 roku jest\nrówna",
    "options": [
      {
        "id": "A",
        "text": "5 690  zł",
        "is_correct": false
      },
      {
        "id": "B",
        "text": "5 280  zł",
        "is_correct": false
      },
      {
        "id": "C",
        "text": "6 257  zł",
        "is_correct": false
      },
      {
        "id": "D",
        "text": "5 900  zł",
        "is_correct": false
      }
    ],
    "correct_answer": "A",
    "explanation": "odpowiedź poprawna. \n0 pkt – odpowiedź niepoprawna albo brak odpowiedzi. \n \nRozwiązanie \nA",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 1,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  },
  {
    "id": "matura-sierpien-2023-zad-33",
    "topicId": "dzial-15",
    "sectionTitle": "Dział 15: Zadania Optymalizacyjne",
    "taskNumber": "33",
    "type": "OPEN_CALCULATION",
    "content": "Zakład stolarski produkuje krzesła, które sprzedaje po  196  złotych za sztukę. Właściciel,\nna podstawie analizy rzeczywistych wpływów i wydatków, stwierdził, że:\n• przychód  P  (w złotych) ze sprzedaży  x  krzeseł można opisać funkcją  P(x) = 196x\n• koszt  K  (w złotych) produkcji  x  krzeseł dziennie można opisać funkcją\nK(x) = 4x2 + 4x + 240\nDziennie w zakładzie można wyprodukować co najwyżej  30  krzeseł.\nOblicz, ile krzeseł powinien dziennie sprzedawać zakład, aby zysk ze sprzedaży\nkrzeseł wyprodukowanych przez ten zakład w ciągu jednego dnia był możliwie\nnajwiększy. Oblicz ten największy zysk.\nZapisz obliczenia.\nWskazówka: przyjmij, że zysk jest różnicą przychodu i kosztów.\nBRUDNOPIS (nie podlega ocenie)\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023\nMATEMATYKA\nPoziom podstawowy\nFormuła 2023",
    "correct_answer": "A",
    "explanation": "Sposób I \nOznaczmy przez  x  liczbę krzeseł wyprodukowanych w ciągu jednego dnia. \nZysk ze sprzedaży jest różnicą przychodu ze sprzedaży krzeseł oraz kosztu ich wytworzenia: \n \n𝑍(x) = 196x − K(x) = 196x − (4x2 + 4x + 240) = −4x2 + 192x − 240 \n \nPonieważ dziennie w zakładzie można wyprodukować maksymalnie  30  krzeseł, więc \ndziedziną funkcji  𝑍  jest zbiór wszystkich liczb całkowitych należących do przedziału  [0, 30]. \nWykresem funkcji  𝑍(x) = −4x2 + 192x − 240, gdzie  x  jest liczbą całkowitą z przedziału  \n[0, 30], jest zbiór punktów leżących na paraboli o ramionach skierowanych w dół. \nPrzekształcamy wzór funkcji  𝑍  do postaci kanonicznej: \n \n𝑍(x) = −4x2 + 192x − 240 = −4(x2 − 48x) − 240 = −4[(x − 24)2 − 242] − 240 = \n \n= −4(x − 24)2 + 2064 \n \nZ postaci kanonicznej odczytujemy współrzędne wierzchołka paraboli:  W = (24, 2064). \nPonieważ  24  należy do dziedziny funkcji  𝑍, więc funkcja zysku przyjmuje największą \nwartość, równą  2 064,  dla argumentu  24. \n \n \nSposób II \nOznaczmy przez  x  liczbę krzeseł wyprodukowanych w ciągu jednego dnia. \nZysk ze sprzedaży jest różnicą przychodu ze sprzedaży krzeseł oraz kosztu ich wytworzenia: \n \n𝑍(x) = 196x − K(x) = 196x − (4x2 + 4x + 240) = −4x2 + 192x − 240 \n \nPonieważ dziennie w zakładzie można wyprodukować maksymalnie  30  krzeseł, więc \ndziedziną funkcji  𝑍  jest zbiór wszystkich liczb całkowitych należących do przedziału  [0, 30]. \nWykresem funkcji  𝑍(x) = −4x2 + 192x − 240, gdzie  x  jest liczbą całkowitą z przedziału  \n[0, 30], jest zbiór punktów leżących na paraboli o ramionach skierowanych w dół. \nObliczamy współrzędne wierzchołka  W = (p, q)  tej paraboli: \n \np = −192\n2 \\cdot (−4) = 24,     24 ∈ {0, 1, 2, … , 30} \n \nq = 𝑍(p) = −4 \\cdot 242 + 192 \\cdot 24 − 240 = 2 064 \n \nNajwiększy dzienny zysk, równy  2 064 zł, jest osiągany przy dziennej produkcji  24  krzeseł. \n  \n \nObowiązują",
    "matura_tip": "Zwróć uwagę na założenia i dziedzinę wyrażenia.",
    "points": 4,
    "sourceYear": "Matura Sierpień 2023 (Formuła 2023)"
  }
];

export const GENERATED_MATH_TASKS: MathTask[] = getAll1500MathTasks();

export const ALL_MATH_TASKS: MathTask[] = [
  ...AUTHENTIC_CKE_TASKS,
  ...GENERATED_MATH_TASKS
];

