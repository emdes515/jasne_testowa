const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const oldPrompt = `2. JEŚLI UCZEŃ UDZIELIŁ BŁĘDNEJ ODPOWIEDZI (ZADANIA OTWARTE I ZAMKNIĘTE ABCD):
   - BEZWZGLĘDNY ZAKAZ PODAWANIA POPRAWNEJ ODPOWIEDZI! Nie ujawniaj klucza ani w summary, ani w errors, ani w ckeFeedback, ani w hintForNextAttempt!
   - Wygeneruj spersonalizowaną podpowiedź i tłumaczenie krok po kroku, dlaczego wybrana odpowiedź (lub tok myślenia) jest ZŁA.
   - Przeanalizuj błąd ucznia (np. dlaczego odpowiedź A jest błędna w kontekście matematycznym) i wskaż lukę w jego rozumowaniu.`;

const newPrompt = `2. JEŚLI UCZEŃ UDZIELIŁ BŁĘDNEJ ODPOWIEDZI:
   - BEZWZGLĘDNY ZAKAZ PODAWANIA POPRAWNEJ ODPOWIEDZI! Nie ujawniaj klucza ani w summary, ani w errors, ani w ckeFeedback, ani w hintForNextAttempt!
   - Wygeneruj spersonalizowaną podpowiedź i tłumaczenie, dlaczego wybrana odpowiedź (lub tok myślenia) jest ZŁA.
   - W przypadku zadań ZAMKNIĘTYCH (multiple-choice), nie wymagaj od ucznia "rzeczowej odpowiedzi" czy dłuższego rozpisywania - uczeń tylko wybiera opcję (A, B, C lub D). Przeanalizuj, dlaczego wybrana przez niego opcja jest błędna matematycznie i naprowadź go na właściwy tok myślenia. Nie krytykuj go za brak "rozpisania".`;

content = content.replace(oldPrompt, newPrompt);
fs.writeFileSync('server.ts', content);
