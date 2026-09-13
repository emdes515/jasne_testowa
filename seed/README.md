# `seed/` — dane wejściowe dla seedowania Cloud Firestore

Ten katalog zawiera **wyłącznie dane wejściowe** dla skryptu seedującego bazę.
Nie jest częścią bundla aplikacji.

## Zawartość

| Plik | Przeznaczenie |
| --- | --- |
| `curriculum/curriculum_matematyka.json` | Agregat matematyki podstawowej: 15 działów, 225 lekcji, 1800 zadań. |
| `curriculum/curriculum_jezyk_polski.json` | Agregat języka polskiego: 22 działy, 132 lekcje, 1056 zadań, 3 filary. |
| `curriculum/curriculum_rozdzial_1.json` | Wariant roboczy działu 1 matematyki — **nie jest używany przez `npm run seed`**, zachowany wyłącznie jako materiał źródłowy (patrz „Uwaga" niżej). |

## Zasady (ważne)

1. Te pliki są **wyłącznie wejściem dla `npm run seed`** (`scripts/seed_database.cjs`).
2. **Nie wolno ich importować z kodu w `src/.`** Aplikacja czyta kurikulum
   **wyłącznie z Cloud Firestore** — schemat
   `subjects/{subjectId}/topics/{topicId}/lessons/{lessonId}`.
3. Nie wolno ich kopiować do `public/` ani do `src/data/` — trafiłyby do bundla
   klienckiego i ujawniły całą bazę zadań (obecnie ~5,9 MB JSON).
4. Zmiany w tych plikach są widoczne dopiero po ponownym uruchomieniu seeda
   (`npm run seed`), który najpierw czyści, a potem zapisuje kolekcje
   `subjects/*/topics/*/lessons/*`.

## Uruchomienie

```bash
# 1. Klucz service account (NIE commituj go!)
#    serviceAccountKey.json w katalogu głównym lub zmienna SERVICE_ACCOUNT_KEY_PATH
# 2. Wgranie treści do Cloud Firestore
npm run seed
```

## Kontrola spójności

Skrypt `scripts/check_seed_redundancy.cjs` (tylko czyta, nic nie zapisuje)
porównuje pliki działowe z agregatami:

```bash
node scripts/check_seed_redundancy.cjs
node scripts/check_seed_redundancy.cjs --json   # wynik maszynowy
```

Kody wyjścia: `0` — wszystkie pliki działowe są w całości zawarte w agregatach,
`1` — któryś plik zawiera treść nieobecną w agregacie, `2` — błąd odczytu.

## Uwaga

`curriculum_rozdzial_1.json` został zachowany, ponieważ kontrola wykazała, że
**nie jest zawarty** w `curriculum_matematyka.json`: wszystkie 15 lekcji i
wszystkie 120 zadań mają inną treść niż w agregacie (różni się także `title`,
`description` i `final_test` działu „dzial-1"). Jest to najprawdopodobniej
wcześniejsza wersja działu 1. Plik nie jest podpinany pod seed — jeśli nie ma
być dalej rozwijany, można go usunąć.
