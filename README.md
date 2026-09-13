# JASNE.

Platforma do nauki do matury — aplikacja webowa (SPA) z treściami merytorycznymi
utrzymywanymi w Cloud Firestore i backendem Express (BFF) obsługującym funkcje AI.

## Zakres treści

Liczby poniżej wynikają z plików źródłowych seeda w `seed/curriculum/`:

| Przedmiot | Działy | Lekcje | Zadania |
| --- | --- | --- | --- |
| Matematyka podstawowa | 15 | 225 | 1800 |
| Język polski (3 filary) | 22 | 132 | 1056 |

## Stack i architektura

**Frontend (SPA)**

- React 19 + TypeScript 5.8
- Vite 6 (build i dev server)
- Tailwind CSS 4
- KaTeX / `react-katex` / `react-markdown` — renderowanie wzorów i treści
- Firebase Web SDK 12 (Auth + Cloud Firestore)
- `motion`, `lucide-react`, `canvas-confetti` — warstwa UI

**Backend (BFF — Backend For Frontend)**

- Express 4 uruchamiany przez `tsx` (`server.ts`), w produkcji bundlowany
  `esbuild` do `dist/server.cjs`
- Jedyny powód istnienia backendu: **klucze AI nigdy nie trafiają do przeglądarki**
- Obsługiwane providery AI: Google Gemini (`@google/genai`) oraz OpenRouter
  (model tekstowy i wizyjny), z licznikiem zużycia po stronie serwera

**Dane (Cloud Firestore — jedyne źródło treści)**

```
subjects/{subjectId}
  topics/{topicId}
    lessons/{lessonId}
```

- `subjects/{subjectId}` — metadane przedmiotu + `topics_metadata`
- `subjects/{subjectId}/topics/{topicId}` — metadane działu + `lessons_metadata`
- `subjects/{subjectId}/topics/{topicId}/lessons/{lessonId}` — teoria, ściąga
  formuł i tablica `tasks`

Dostęp do danych odbywa się przez `src/services/curriculumRepository.ts`
(polityka cache-first: jeden odczyt dokumentu na dział / na lekcję).

**Zasada: treści wyłącznie z Cloud Firestore.** Pliki z `seed/` są wyłącznie
wejściem dla `npm run seed` — **nie są i nie mogą być importowane przez kod
w `src/`**. Aplikacja nie zawiera kurikulum w bundlu.

> **Znane odstępstwa (stan obecny, do uprzątnięcia).** W `src/data/` pozostają
> historyczne, bundlowane pliki treści: `polishCurriculum.ts` (~3,5 MB) oraz
> `allFormulaSheets.ts` (~280 KB), importowane m.in. przez `LearnView.tsx`,
> `DashboardView.tsx` i `dzial1TaskPool.ts`. Trafiają one do chunków
> `data-polish` / `data-math`. Docelowo powinny zostać usunięte, a ich treść
> pochodzić z Firestore. Zmiana ta **nie** należy do zakresu porządków repo
> i wymaga osobnego zadania.

## Wymagania

- **Node.js 20 LTS lub 22 LTS** (CI używa Node 22) oraz npm
- Konto Firebase z włączonym Cloud Firestore i Firebase Authentication
- Klucz API Gemini i/lub OpenRouter — **używany wyłącznie po stronie serwera**
- Do wgrania treści: klucz Service Account Firebase Admin SDK

## Szybki start

```bash
# 1. Zależności
npm install

# 2. Konfiguracja środowiska
#    Skopiuj .env.example -> .env i uzupełnij wartościami z konsoli Firebase
cp .env.example .env

# 3. Dev server (Express + Vite) -> http://localhost:3000
npm run dev

# 4. Wgranie kurikulum do Cloud Firestore (wymaga klucza service account)
npm run seed

# 5. Build produkcyjny (frontend + dist/server.cjs)
npm run build
npm start

# 6. Testy
npm test
```

### Skrypty npm

| Skrypt | Działanie |
| --- | --- |
| `npm run dev` | Serwer deweloperski (`tsx watch server.ts`) na `http://localhost:3000` |
| `npm run build` | `vite build` + bundling `server.ts` → `dist/server.cjs` |
| `npm start` | Uruchomienie builda produkcyjnego |
| `npm run preview` | Podgląd builda Vite |
| `npm run lint` | Type checking: `tsc --noEmit` |
| `npm test` | Testy jednostkowe (Vitest, tryb `run`) |
| `npm run test:watch` | Vitest w trybie watch |
| `npm run seed` | Seedowanie Cloud Firestore z `seed/curriculum/` |

### Zmienne środowiskowe

Wzór i opisy znajdują się w `.env.example`. Najważniejsze grupy:

- `VITE_FIREBASE_*` — konfiguracja klienta Firebase (publiczna z założenia)
- `GEMINI_API_KEY`, `OPENROUTER_API_KEY` — **tylko serwer**, nigdy `VITE_*`

## Bezpieczeństwo

**Czego nie wolno commitować:**

- kluczy Service Account Firebase (`serviceAccountKey.json`,
  `*-firebase-adminsdk*.json`) — są ignorowane przez `.gitignore`, ale muszą
  fizycznie leżeć poza repozytorium
- plików `.env`, `.env.local`, `.env.*.local` (z commitem jest tylko `.env.example`)
- kluczy AI z prefiksem `VITE_` — taka zmienna trafia do bundla klienckiego

**Reguły Firestore:** `firestore.rules` (indeksy: `firestore.indexes.json`).
Domyślnie obowiązuje `deny all`; odczyt `subjects/**` jest publiczny, zapis do
treści wyłącznie przez Admin SDK. Dane gracza (`users/{userId}`) są izolowane
per użytkownik.

```bash
firebase deploy --only firestore:rules
```

Szczegóły modelu zagrożeń: [`docs/SECURITY.md`](docs/SECURITY.md).

## Mapa katalogów

```
.
├── src/
│   ├── components/     # 41 komponentów widoków (LearnView, SessionRunner, DashboardView, ...)
│   ├── services/       # curriculumRepository (Firestore), aiUsageTracker
│   ├── lib/            # firebase, curriculumSync, heartsManager, guestMigration, maturaPredictor
│   ├── data/           # LEGACY: bundlowane treści (do usunięcia — patrz wyżej)
│   ├── utils/          # funkcje pomocnicze (streaki, parsowanie rozwiązań)
│   └── scripts/        # seedMatura.ts (klient po stronie przeglądarki)
├── server.ts           # Express BFF: proxy AI, walidacja, klucze serwerowe
├── server/             # moduły BFF: config (env), rateLimit, validation, logger, aiRequest
├── scripts/
│   ├── seed_database.cjs          # npm run seed — wgrywa seed/curriculum/ do Firestore
│   ├── check_seed_redundancy.cjs  # kontrola spójności seeda (tylko czyta)
│   └── deploy_rules.cjs           # wdrożenie reguł Firestore
├── seed/
│   ├── README.md
│   └── curriculum/     # wejście seeda (NIE importowane przez src/)
├── docs/               # dokumentacja bezpieczeństwa
├── public/             # statyki kopiowane 1:1 do dist/
├── dist/               # artefakt buildu (vite + esbuild)
├── firestore.rules     # reguły bezpieczeństwa Cloud Firestore
└── .github/workflows/  # CI (lint, test, build)
```

## Dokumentacja

- [`README_IMPROVEMENTS.md`](README_IMPROVEMENTS.md) — historyczny opis
  wprowadzonych ulepszeń. **Uwaga:** zawiera nieaktualne twierdzenia
  (m.in. że włączono `strict` w `tsconfig.json` — w rzeczywistości
  `tsconfig.json` nie zawiera żadnej z opcji strict).
- [`docs/SECURITY.md`](docs/SECURITY.md) — model zagrożeń i zasady bezpieczeństwa.
- [`seed/README.md`](seed/README.md) — zasady dotyczące danych seeda.
