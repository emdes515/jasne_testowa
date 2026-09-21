'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../seed/curriculum/curriculum_matematyka.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const trapUpdates = {
  'task-1-2-4': 'Pułapka CKE: Najczęstszy błąd to dzielenie samych liczb pod pierwiastkiem i zapomnienie o stopniu 3, co daje błędne $\\sqrt{27} \\approx 5.19$ zamiast $\\sqrt[3]{27} = 3$. Zawsze pamiętaj: $\\frac{\\sqrt[3]{a}}{\\sqrt[3]{b}} = \\sqrt[3]{\\frac{a}{b}} = \\sqrt[3]{27} = 3$.',
  'task-1-3-4': 'Pułapka CKE: Wielu maturzystów próbuje odejmować $\\sqrt{2}$ bezpośrednio od mianownika. Pamiętaj: najpierw usuń niewymierność mnożąc przez sprzężenie $(\\sqrt{2}+1)$, co daje $(\\sqrt{2}+1) - \\sqrt{2} = 1$.',
  'task-1-4-4': 'Pułapka CKE: Nigdy nie mnóż $27 \\cdot \\frac{4}{3} = 36$! Wykładnik ułamkowy oznacza pierwiastek stopnia równego mianownikowi: $27^{\\frac{4}{3}} = (\\sqrt[3]{27})^4 = 3^4 = 81$.',
  'task-2-2-4': 'Pułapka CKE: Różnica logarytmów to logarytm ILORAZU, a nie różnicy wnętrz ($48 - 3 = 45$). Dzielimy liczby logarytmowane: $\\log_2\\left(\\frac{48}{3}\\right) = \\log_2 16 = 4$.',
  'task-2-3-4': 'Pułapka CKE: Zanim dodasz logarytmy, MUSISZ wciągnąć współczynnik $3$ jako wykładnik: $3\\log_4 2 = \\log_4 (2^3) = \\log_4 8$. Dopiero potem stosujesz sumę: $\\log_4 8 + \\log_4 8 = \\log_4 64 = 3$.',
  'task-3-1-5': 'Pułapka CKE: Równanie z wartością bezwzględną ma DWA rozwiązania: $x - 7 = 4 \\implies x = 11$ lub $x - 7 = -4 \\implies x = 3$. Ich suma wynosi $11 + 3 = 14$. Błąd to podanie tylko jednego rozwiązania $x=11$.',
  'task-4-1-5': 'Pułapka CKE: Pamiętaj o wyrazie środkowym $2ab$ ze wzorów skróconego mnożenia! Tutaj $+4\\sqrt{3}$ i $-4\\sqrt{3}$ redukują się do zera: $(3 + 4\\sqrt{3} + 4) + (3 - 4\\sqrt{3} + 4) = 7 + 7 = 14$.',
  'task-4-2-1': 'Pułapka CKE: Najczęstszy błąd to dodanie kwadratów zamiast odjęcia ($9 + 5 = 14$, opcja B) lub zamiana kolejności składników ($5 - 9 = -4$, opcja C). Pamiętaj: $(a-b)(a+b) = a^2 - b^2 = 9 - 5 = 4$.',
  'task-4-2-4': 'Pułapka CKE: Ze wzoru na różnicę kwadratów iloczyn sprzężeń $(\\sqrt{a}-b)(\\sqrt{a}+b) = a - b^2$ zawsze całkowicie eliminuje pierwiastek kwadratowy: $7 - 1 = 6 \\in \\mathbb{Q}$. Zdanie jest PRAWDZIWE.',
  'task-4-2-5': 'Pułapka CKE: Sprytny trik maturalny CKE: zapisz jako $(50 - 1)(50 + 1) = 50^2 - 1^2 = 2500 - 1 = 2499$. Unikasz mozolnego mnożenia pisemnego i ryzyka błędu rachunkowego.',
  'task-5-1-5': 'Pułapka CKE: Dzieląc nierówność przez liczbę ujemną $-2$, ZMIEŃ ZWROT ZNAKU: $-2x \\le -4 \\implies x \\ge 2$. Ponieważ nierówność jest słaba ($\\ge$), najmniejszą liczbą całkowitą jest dokładnie $2$ (a nie $3$).',
  'task-5-2-5': 'Pułapka CKE: Część wspólna to przedział domknięty $\\langle -2, 5 \\rangle$. Długość przedziału to różnica prawego i lewego końca: $5 - (-2) = 5 + 2 = 7$. Błąd to odjęcie bez minusa ($5 - 2 = 3$).',
  'task-5-3-4': 'Pułapka CKE: Uważaj na określenie zbioru liczbowego! Liczb rzeczywistych w $(0, 1)$ jest nieskończenie wiele, ale liczb CAŁKOWITYCH nie ma tam żadnej (między 0 a 1 nie ma liczb całkowitych). Zdanie jest PRAWDZIWE.',
  'task-6-2-4': 'Pułapka CKE: Pamiętaj, że dla dowolnej liczby rzeczywistej $x^2 \\ge 0$, więc $x^2 + 1 \\ge 1 > 0$ oraz $x^2 + 16 \\ge 16 > 0$. Żaden z nawiasów nigdy nie może być zerem. Zdanie jest PRAWDZIWE.',
  'task-7-2-4': 'Pułapka CKE: Ułamek jest równy zero tylko wtedy, gdy jego LICZNIK jest równy zero przy zachowaniu dziedziny ($x \\neq 3$). Tutaj licznik $x^2 + 1 = 0 \\implies x^2 = -1$, co nie ma rozwiązań w $\\mathbb{R}$. Zdanie jest PRAWDZIWE.',
  'task-7-3-5': 'Pułapka CKE: Mnożąc na krzyż, pamiętaj o nawiasach: $3(3x - 1) = 4(2x + 5) \\implies 9x - 3 = 8x + 20 \\implies x = 23$. Typowy błąd to pomnożenie tylko pierwszego wyrazu bez wymnożenia $(-1)$ i $5$.',
  'task-8-1-5': 'Pułapka CKE: Miejsca zerowe to $x_1 = 3$ oraz $x_2 = 7$ (bo $\\Delta = 100 - 84 = 16$). Odległość między nimi na osi liczbowej wynosi $|7 - 3| = 4$. Uczniowie często mylą odległość z sumą pierwiastków (10).',
  'task-8-1-3-4': 'Pułapka CKE: Jeśli $c = 0$, równanie ma postać $ax^2 + bx = 0$. Wyłączając $x$ przed nawias otrzymujemy $x(ax + b) = 0$, co zawsze daje pierwiastek $x_1 = 0$. Zdanie jest w 100% PRAWDZIWE.',
  'task-8-1-3-5': 'Pułapka CKE: Pierwiastki to $0$ i $5$, a zbiór rozwiązań to $\\langle 0, 5 \\rangle$. Liczby całkowite to: $0, 1, 2, 3, 4, 5$ – jest ich dokładnie 6! Typowy błąd maturalny to pominięcie zera i podanie 5.',
  'task-8-1-4-4': 'Pułapka CKE: Parabola z $\\Delta < 0$ nie przecina osi $OX$, a przy $a < 0$ jej ramiona skierowane są w dół. Oznacza to, że cały wykres leży poniżej osi, więc wartości są ZAWSZE ujemne. Zdanie jest PRAWDZIWE.',
  'task-9-3-4': 'Pułapka CKE: Poziomy odcinek oznacza, że dla różnych argumentów $x$ wartość funkcji $y$ nie zmienia się ($f(x) = c$), co jest ścisłą definicją funkcji stałej. Zdanie jest PRAWDZIWE.',
  'task-9-4-2': 'Pułapka CKE: Uczniowie mylą liczbę rozwiązań (ilość punktów przecięcia, czyli 3) z wartością argumentu lub myślą, że ujemna liczba $-1$ oznacza brak rozwiązań. Równanie $f(x) = m$ ma dokładnie tyle rozwiązań, w ilu punktach pozioma linia $y = m$ przecina wykres.',
  'task-9-4-4': 'Pułapka CKE: Liczba $5$ nie należy do zbioru wartości $\\langle -2, 4 \\rangle$, co oznacza, że prosta pozioma $y = 5$ leży całkowicie ponad wykresem i nie ma z nim żadnego punktu wspólnego. Zdanie jest PRAWDZIWE.',
  'task-10-1-4': 'Pułapka CKE: Gdy $a = 0$, wzór funkcji to $y = b$. Wykres jest poziomą prostą, funkcja nie rośnie ani nie maleje — jest STAŁA. Zdanie jest FAŁSZYWE.',
  'task-10-1-5': 'Pułapka CKE: Punkt przecięcia wykresu funkcji liniowej z osią $OY$ ma ZAWSZE współrzędne $(0, b)$. Zatem druga współrzędna punktu o $x = 0$ od razu daje $b = -9$. Nie trzeba układać równania!',
  'task-10-2-4': 'Pułapka CKE: Pamiętaj o MINUSIE! Rozwiązując $ax + b = 0$, przenosimy $b$ na drugą stronę ze zmianą znaku: $ax = -b \\implies x_0 = -\\frac{b}{a}$. Wzór bez minusa jest błędny, więc zdanie jest FAŁSZYWE.',
  'task-10-2-5': 'Pułapka CKE: Pamiętaj o poprawnej kolejności podstawiania współrzędnych $P(x, y)$: podstawiasz $x = 2$ oraz $y = 11$, czyli $11 = 3 \\cdot 2 + b \\implies 11 = 6 + b \\implies b = 5$. Kardynalny błąd to zamiana iksa z igrekiem.',
  'task-10-3-5': 'Pułapka CKE: Warunek prostopadłości to $a_1 \\cdot a_2 = -1$. Szukamy liczby przeciwnej i odwrotnej do $5$: $a = -\\frac{1}{5} = -0{,}2$. Typowy błąd to pominięcie minusa (podanie $0{,}2$) lub podanie $-5$.'
};

let count = 0;
data.topics.forEach(t => t.lessons.forEach(l => l.tasks?.forEach(tsk => {
  if (trapUpdates[tsk.id]) {
    tsk.cke_trap = trapUpdates[tsk.id];
    tsk.ckeTrap = trapUpdates[tsk.id];
    if (tsk.hints) {
      tsk.hints.level_2 = trapUpdates[tsk.id];
    }
    count++;
  }
})));

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully enriched all ${count} tasks with deep CKE diagnostic traps.`);
