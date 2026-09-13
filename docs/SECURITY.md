# Bezpieczeństwo JASNE.

Dokument opisuje model zagrożeń, stan obecny zabezpieczeń oraz czynności, które
musi wykonać operator wdrożenia.

## Model zagrożeń

| Zasób | Ryzyko | Wpływ |
| --- | --- | --- |
| Klucze AI (Gemini, OpenRouter) | wyciek do bundle'a klienckiego lub repo | kradzież quota / koszty na cudze konto |
| Klucz Service Account Firebase Admin SDK | wyciek do repo | pełny zapis do Firestore, obejście reguł |
| Treści kurikulum (`subjects/**`) | nieuprawniona modyfikacja bazy zadań | manipulacja materiałem egzaminacyjnym |
| Dane gracza (`users/{userId}`) | odczyt lub podmiana cudzych postępów | wyciek danych osobowych, fałszowanie wyników |
| Endpointy AI (`/api/*`) | nadużycie jako darmowy proxy do płatnych modeli | koszty, DoS |
| Konto Firebase Web (klucz `apiKey`) | nadużycie publicznego klucza klienta | koszty, scraping |

Założenie podstawowe: **klient jest niezaufany**. Wszystko, co trafia do bundle'a
przeglądarki (zmienne `VITE_*`, kod w `src/`), musi być traktowane jako publiczne.

## Co już jest zabezpieczone

**Klucze AI wyłącznie po stronie serwera**

- `server/config.ts` czyta `GEMINI_API_KEY` i `OPENROUTER_API_KEY` — bez prefiksu
  `VITE_`, więc Vite nie wstrzykuje ich do bundle'a.
- Wywołania providerów wykonuje wyłącznie `server.ts` (BFF). Frontend nigdy nie
  dostaje klucza.
- Pozostał kompatybilnościowy fallback na `VITE_OPENROUTER_API_KEY`; przy starcie
  serwer loguje ostrzeżenie (`warnAboutLegacySecrets()`). **Do usunięcia.**

**Ochrona endpointów AI**

- Rate limiting (`server/rateLimit.ts`): osobny, ostrzejszy limit na endpointy
  wołające płatne modele (`RATE_LIMIT_AI_MAX`, domyślnie 20/min) i ogólny na
  `/api` (`RATE_LIMIT_API_MAX`, domyślnie 120/min).
- Limity wejścia: body JSON 8 MB, obraz ≤ 4 MB po dekodowaniu base64, prompt
  ≤ 8000 znaków (`server/config.ts`).
- CORS ograniczony listą `ALLOWED_ORIGINS` (pusta lista = tylko same-origin).

**Reguły Cloud Firestore (`firestore.rules`)**

- Domyślny fallback: `allow read, write: if false` (deny-all).
- `subjects/{subjectId}` i podkolekcje `topics` / `lessons`: `read: true`,
  `write: false` — treści zapisuje wyłącznie Admin SDK / service account.
- `users/{userId}`: odczyt i zapis tylko dla `request.auth.uid == userId`
  (wraz z podkolekcjami) — izolacja per użytkownik.
- `matches/{matchId}`: dostęp wyłącznie dla uczestników meczu.
- `system/**`: odczyt dla zalogowanych, zapis zablokowany.
- Kolekcje legacy (`mathTasks`, `zadania_matura`): tylko odczyt.

**Higiena repozytorium**

- `.gitignore` obejmuje `serviceAccountKey*.json`, `*adminsdk*.json`, `.env*`
  (z wyjątkiem `.env.example`), `.env.local`, `.env.*.local`, `.firebase/`.

## Co wymaga działania operatora

1. **Rotacja klucza OpenRouter.** Jeśli kiedykolwiek używano zmiennej
   `VITE_OPENROUTER_API_KEY`, klucz został wstrzyknięty do publicznego bundle'a
   i musi zostać uznany za spalony. Wygeneruj nowy klucz, ustaw go jako
   `OPENROUTER_API_KEY` i usuń zmienną z prefiksem `VITE_`.
2. **Rotacja klucza Gemini.** Ten sam powód — klucz widoczny w historii env lub
   w artefaktach buildu należy wymienić.
3. **Wdrożenie reguł Firestore.** Reguły z repozytorium nie działają, dopóki nie
   zostaną wdrożone:
   ```bash
   firebase deploy --only firestore:rules
   ```
   Następnie zweryfikuj w konsoli Firebase, że wersja reguł odpowiada
   `firestore.rules` z repo.
4. **Usunięcie kluczy service account z katalogu roboczego.** Pliki
   `serviceAccountKey.json` oraz `*-firebase-adminsdk*.json` leżą w katalogu
   głównym (są ignorowane przez git, ale są na dysku i wskazuje na nie
   `scripts/deploy_rules.cjs`). Trzymaj je poza repozytorium i wskaż przez
   `SERVICE_ACCOUNT_KEY_PATH` / `GOOGLE_APPLICATION_CREDENTIALS`.
5. **Ograniczenie klucza Web API.** W Google Cloud Console ustaw restrykcje
   HTTP referrer dla klucza z `firebase-applet-config.json` (klucz klienta jest
   publiczny z założenia, ale nie powinien działać z dowolnego originu).
6. **Rozważ włączenie Firebase App Check** dla Cloud Firestore i Auth.

## Znane ograniczenia (do zaadresowania w kodzie)

- **Stan gracza nie jest walidowany schematem reguł.** Reguła dla
  `users/{userId}` zezwala właścicielowi na zapis **dowolnego** pola swojego
  dokumentu — nie ma listy dozwolonych pól ani walidacji typów i zakresów.
  Zmodyfikowany klient może więc ustawić sobie dowolną liczbę serc, XP czy
  streak. Docelowo: `request.resource.data.diff(resource.data).affectedKeys()
  .hasOnly([...])` z walidacją typów i zakresów, a krytyczne liczniki przenieść
  do Cloud Functions / zapisu przez Admin SDK.
- **`test/{document=**}` ma publiczny odczyt** (`allow read: if true`). Kolekcja
  służy tylko do testu łączności — warto ją usunąć lub ograniczyć do
  zalogowanych.
- **Treści nadal częściowo w bundlu.** `src/data/polishCurriculum.ts` (~3,5 MB)
  i `src/data/allFormulaSheets.ts` (~280 KB) są importowane przez komponenty i
  trafiają do publicznych chunków. Nie jest to wyciek sekretu, ale narusza
  zasadę „treści wyłącznie z Cloud Firestore".
- **Brak App Check** — reguły Firestore są jedyną barierą dla nadużyć ze strony
  klienta.
- `package.json` nie deklaruje `engines`, więc wersja Node nie jest wymuszana
  przy instalacji.
