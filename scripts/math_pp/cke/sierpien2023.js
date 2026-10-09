// Egzamin maturalny z matematyki, poziom podstawowy, Formuła 2023 – termin poprawkowy, sierpień 2023 r.
// Transkrypcja z arkusza CKE; klucz odpowiedzi: wersja A. Rozwiązania krok po kroku – opracowanie JASNE.
import { bars, geo, panels, plot } from './fig.js';

const T = String.raw;
const SC = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\n';
const nl = (intervals) => ({ min: -6, max: 11, ticks: [-3, 3, 7], intervals });
const seg = (from, to, startDot = 'none', endDot = 'none') => ({ from, to, startDot, endDot });
const pw = (segments) => plot([-7, 7], [-6, 6], { type: 'PIECEWISE_LINEAR', segments });

const STEM14 = T`W kartezjańskim układzie współrzędnych $(x, y)$ narysowano wykres funkcji $y = f(x)$ (zobacz rysunek).`;
const F14 = pw([
  seg([-7, 4], [-5, 4], 'filled', 'filled'),
  seg([-4, 4], [-1, 4], 'filled'),
  seg([-1, 4], [4, -1], 'none', 'filled'),
  seg([5, 1], [7, 6], 'filled', 'filled')
]);
const STEM29 = T`Każda krawędź graniastosłupa prawidłowego sześciokątnego ma długość równą $6$.`;

export default {
  examId: 'matura-sierpien-2023',
  examName: 'Matura Sierpień 2023 (Formuła 2023)',
  sourceLabel: 'Matura Sierpień 2023',
  refLabel: 'Matura sierpień 2023',
  year: 2023,
  session: 'Sierpień',
  totalPoints: 46,
  tasks: [
    {
      n: '1', pts: 1, t: 1, k: 'SC',
      q: T`Dana jest nierówność` + '\n$$|x - 5| < 2$$\n' + T`Na którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych spełniających powyższą nierówność? Wybierz właściwą odpowiedź spośród podanych.`,
      o: [T`$(-\infty, -3) \cup (7, +\infty)$`, T`$(-3, 7)$`, T`$(-\infty, 3) \cup (7, +\infty)$`, T`$(3, 7)$`],
      optNL: [
        nl([{ from: null, to: -3, toIncluded: false }, { from: 7, to: null, fromIncluded: false }]),
        nl([{ from: -3, to: 7, fromIncluded: false, toIncluded: false }]),
        nl([{ from: null, to: 3, toIncluded: false }, { from: 7, to: null, fromIncluded: false }]),
        nl([{ from: 3, to: 7, fromIncluded: false, toIncluded: false }])
      ],
      a: 'D',
      s: [
        T`$|x - 5|$ to odległość liczby $x$ od liczby $5$ na osi liczbowej. Szukamy liczb odległych od $5$ o mniej niż $2$.`,
        T`$5 - 2 = 3$ oraz $5 + 2 = 7$, więc $3 < x < 7$.`,
        T`Nierówność jest ostra – końce $3$ i $7$ nie należą do zbioru (puste kółka).`
      ],
      trap: T`Środkiem przedziału jest $5$ (liczba po minusie w module), a nie $-5$ ani $2$. Znak $<$ daje odcinek „do środka”, a nie dwa promienie.`
    },
    {
      n: '2', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $3\sqrt{45} - \sqrt{20}$ jest równa`,
      o: [T`$(7 \cdot 5)^{\frac{1}{2}}$`, T`$5^{\frac{1}{2}}$`, '$7$', T`$7 \cdot 5^{\frac{1}{2}}$`],
      a: 'D',
      s: [
        T`Wyłączamy czynnik przed pierwiastek: $\sqrt{45} = \sqrt{9 \cdot 5} = 3\sqrt{5}$ oraz $\sqrt{20} = \sqrt{4 \cdot 5} = 2\sqrt{5}$.`,
        T`$3 \cdot 3\sqrt{5} - 2\sqrt{5} = 9\sqrt{5} - 2\sqrt{5} = 7\sqrt{5}$.`,
        T`$\sqrt{5} = 5^{\frac{1}{2}}$, więc wynik to $7 \cdot 5^{\frac{1}{2}}$.`
      ],
      trap: T`$(7 \cdot 5)^{\frac{1}{2}} = \sqrt{35}$ to nie to samo co $7 \cdot \sqrt{5}$. Wykładnik $\frac{1}{2}$ dotyczy tylko piątki.`
    },
    {
      n: '3', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $\log_{25} 1 - \frac{1}{2}\log_{25} 5$ jest równa`,
      o: [T`$\left(-\frac{1}{4}\right)$`, T`$\left(-\frac{1}{2}\right)$`, T`$\frac{1}{4}$`, T`$\frac{1}{2}$`],
      a: 'A',
      s: [
        T`$\log_{25} 1 = 0$, bo $25^0 = 1$.`,
        T`$\log_{25} 5 = \frac{1}{2}$, bo $25^{\frac{1}{2}} = \sqrt{25} = 5$.`,
        T`$0 - \frac{1}{2} \cdot \frac{1}{2} = -\frac{1}{4}$.`
      ],
      trap: T`Logarytm z jedynki jest zawsze równy $0$ (nie $1$). A $\log_{25} 5$ to $\frac{1}{2}$, nie $2$ – bo to $25$ jest potęgą piątki, a nie odwrotnie.`
    },
    {
      n: '4', pts: 2, t: 2, k: 'PROOF',
      q: T`Wykaż, że dla każdej liczby naturalnej $n \ge 1$ liczba $3n^3 + 18n^2 + 15n$ jest podzielna przez $6$.`,
      a: T`$3n^3 + 18n^2 + 15n = 3 \cdot n(n + 1) \cdot (n + 5)$, a iloczyn $n(n + 1)$ dwóch kolejnych liczb naturalnych jest parzysty, więc cała liczba jest podzielna przez $3 \cdot 2 = 6$.`,
      s: [
        T`Wyłączamy $3n$: $3n^3 + 18n^2 + 15n = 3n(n^2 + 6n + 5)$.`,
        T`Rozkładamy trójmian: $n^2 + 6n + 5 = (n + 1)(n + 5)$, więc liczba jest równa $3 \cdot n(n + 1)(n + 5)$.`,
        T`Liczby $n$ i $n + 1$ to dwie kolejne liczby naturalne – jedna z nich jest parzysta, więc $n(n + 1) = 2k$ dla pewnej liczby całkowitej $k$. Stąd dana liczba jest równa $6k(n + 5)$, czyli jest podzielna przez $6$.`
      ],
      trap: T`Trójka przed nawiasem daje tylko podzielność przez $3$. Parzystość trzeba uzasadnić osobno – np. iloczynem dwóch kolejnych liczb.`
    },
    {
      n: '5', pts: 1, t: 1, k: 'SC',
      q: SC + T`Wartość wyrażenia $\frac{3^{-1}}{\left(-\frac{1}{9}\right)^{-2}} \cdot 81$ jest równa`,
      o: [T`$\frac{1}{3}$`, T`$\left(-\frac{1}{3}\right)$`, '$3$', '$(-3)$'],
      a: 'A',
      s: [
        T`$3^{-1} = \frac{1}{3}$.`,
        T`$\left(-\frac{1}{9}\right)^{-2} = (-9)^2 = 81$ – wykładnik ujemny odwraca ułamek, a wykładnik parzysty „zjada” minus.`,
        T`$\frac{\frac{1}{3}}{81} \cdot 81 = \frac{1}{3}$.`
      ],
      trap: T`Potęga o wykładniku PARZYSTYM z liczby ujemnej jest dodatnia: $(-9)^2 = 81$, a nie $-81$. Stąd wynik jest dodatni.`
    },
    {
      n: '6', pts: 1, t: 2, k: 'SC',
      q: SC + T`Wartość wyrażenia $\left(2 - \sqrt{3}\right)^2 - \left(\sqrt{3} - 2\right)^2$ jest równa`,
      o: [T`$\left(-2\sqrt{3}\right)$`, '$0$', '$6$', T`$8\sqrt{3}$`],
      a: 'B',
      s: [
        T`Liczby $2 - \sqrt{3}$ oraz $\sqrt{3} - 2$ są przeciwne: $\sqrt{3} - 2 = -(2 - \sqrt{3})$.`,
        T`Kwadraty liczb przeciwnych są równe: $(-a)^2 = a^2$.`,
        T`Różnica dwóch równych liczb jest równa $0$.`
      ],
      trap: T`Nie trzeba niczego rozwijać – wystarczy zauważyć, że w nawiasach stoją liczby przeciwne. Rozwijanie „na piechotę” to okazja do błędu znaku.`
    },
    {
      n: '7', pts: 1, t: 2, k: 'SC',
      q: SC + T`Dla każdej liczby rzeczywistej $x$ różnej od $0$ wartość wyrażenia $\frac{1}{2x} - x$ jest równa wartości wyrażenia`,
      o: [T`$\frac{1}{x}$`, T`$\frac{1 - x}{2x}$`, T`$\frac{1 - 2x^2}{2x}$`, T`$-\frac{1}{2x}$`],
      a: 'C',
      s: [
        T`Sprowadzamy do wspólnego mianownika $2x$: $x = \frac{x \cdot 2x}{2x} = \frac{2x^2}{2x}$.`,
        T`$\frac{1}{2x} - \frac{2x^2}{2x} = \frac{1 - 2x^2}{2x}$.`
      ],
      trap: T`Żeby odjąć $x$ od ułamka, trzeba pomnożyć $x$ przez CAŁY mianownik $2x$. Odpowiedź $\frac{1 - x}{2x}$ powstaje z odjęcia $x$ tylko od licznika.`
    },
    {
      n: '8', pts: 1, t: 3, k: 'SC',
      q: SC + T`Równanie $\frac{(x^2 - 3x)(x^2 + 1)}{x^2 - 25} = 0$ w zbiorze liczb rzeczywistych ma dokładnie`,
      o: ['jedno rozwiązanie.', 'dwa rozwiązania.', 'trzy rozwiązania.', 'cztery rozwiązania.'],
      a: 'B',
      s: [
        T`Dziedzina: $x^2 - 25 \ne 0$, czyli $x \ne 5$ i $x \ne -5$.`,
        T`Licznik: $x(x - 3)(x^2 + 1) = 0$. Czynnik $x^2 + 1$ jest zawsze dodatni, więc zostaje $x = 0$ lub $x = 3$.`,
        T`Obie liczby należą do dziedziny – równanie ma dwa rozwiązania.`
      ],
      trap: T`Równanie $x^2 + 1 = 0$ nie ma rozwiązań rzeczywistych ($x^2$ nie może być równe $-1$), więc ten nawias nie „dokłada” żadnych pierwiastków.`
    },
    {
      n: '9', pts: 3, t: 3, k: 'OPEN',
      q: T`Rozwiąż równanie` + '\n$$3x^3 - 2x^2 - 3x + 2 = 0$$\n' + T`Zapisz obliczenia.`,
      a: T`$x = \frac{2}{3}$ lub $x = -1$ lub $x = 1$.`,
      s: [
        T`Grupujemy wyrazy: $x^2(3x - 2) - (3x - 2) = 0$.`,
        T`$(3x - 2)(x^2 - 1) = 0$, czyli $(3x - 2)(x - 1)(x + 1) = 0$.`,
        T`$x = \frac{2}{3}$ lub $x = 1$ lub $x = -1$.`
      ],
      trap: T`$-3x + 2 = -(3x - 2)$ – po wyłączeniu minusa w nawiasie zmieniają się oba znaki. Po wyłączeniu wspólnego czynnika w drugim nawiasie zostaje $-1$, a nie zero.`
    },
    {
      n: '10', pts: 1, t: 5, k: 'SC',
      q: SC + T`W kartezjańskim układzie współrzędnych $(x, y)$ punkt $(-8, 6)$ jest punktem przecięcia prostych o równaniach`,
      o: [T`$2x + 3y = 2$ i $-x + y = -14$.`, T`$3x + 2y = -12$ i $2x + y = 10$.`, T`$x + y = -2$ i $x - 2y = 4$.`, T`$x - y = -14$ i $-2x + y = 22$.`],
      a: 'D',
      s: [
        T`Punkt przecięcia musi spełniać OBA równania. Podstawiamy $x = -8$, $y = 6$.`,
        T`W każdej z par A, B, C pierwsze równanie jest spełnione, ale drugie nie: $-(-8) + 6 = 14 \ne -14$; $2 \cdot (-8) + 6 = -10 \ne 10$; $-8 - 12 = -20 \ne 4$.`,
        T`Para D: $-8 - 6 = -14$ oraz $-2 \cdot (-8) + 6 = 22$ – oba równania są spełnione.`
      ],
      trap: T`Sprawdzenie tylko pierwszego równania nic nie rozstrzyga – we wszystkich czterech odpowiedziach jest ono spełnione. Trzeba sprawdzić także drugie.`
    },
    {
      n: '11', pts: 1, t: 5, k: 'SC',
      q: T`Miejscem zerowym funkcji liniowej $f$ jest liczba $1$. Wykres tej funkcji przechodzi przez punkt $(-1, 4)$.` + '\n\n' + SC + T`Wzór funkcji $f$ ma postać`,
      o: [T`$f(x) = -\frac{1}{2}x + 1$`, T`$f(x) = -\frac{1}{3}x + \frac{1}{3}$`, T`$f(x) = -2x + 2$`, T`$f(x) = -3x + 1$`],
      a: 'C',
      s: [
        T`Wykres przechodzi przez punkty $(1, 0)$ (miejsce zerowe) oraz $(-1, 4)$.`,
        T`Współczynnik kierunkowy: $a = \frac{0 - 4}{1 - (-1)} = \frac{-4}{2} = -2$.`,
        T`$f(x) = -2x + b$ oraz $f(1) = 0$, więc $b = 2$. Zatem $f(x) = -2x + 2$.`
      ],
      trap: T`Miejsce zerowe $1$ oznacza punkt $(1, 0)$ na wykresie, a nie wyraz wolny równy $1$.`
    },
    {
      n: '12', pts: 1, t: 4, k: 'SC',
      q: T`Funkcja $f$ jest określona dla każdej liczby rzeczywistej $x$ wzorem $f(x) = \frac{x - k}{x^2 + 1}$, gdzie $k$ jest pewną liczbą rzeczywistą. Ta funkcja spełnia warunek $f(1) = 2$.` + '\n\n' + SC + T`Wartość współczynnika $k$ we wzorze tej funkcji jest równa`,
      o: ['$(-3)$', '$3$', '$(-4)$', '$4$'],
      a: 'A',
      s: [
        T`Podstawiamy $x = 1$: $f(1) = \frac{1 - k}{1^2 + 1} = \frac{1 - k}{2}$.`,
        T`$\frac{1 - k}{2} = 2$, czyli $1 - k = 4$.`,
        T`$k = -3$.`
      ],
      trap: T`Z równania $1 - k = 4$ wynika $k = -3$, a nie $3$. Minus przed $k$ łatwo zgubić.`
    },
    {
      n: '13', pts: 1, t: 6, k: 'SC',
      q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = (x - 13)^2 - 256$. Jednym z miejsc zerowych tej funkcji jest liczba $(-3)$.` + '\n\n' + SC + T`Drugim miejscem zerowym funkcji $f$ jest liczba`,
      o: ['$(-29)$', '$(-23)$', '$23$', '$29$'],
      a: 'D',
      s: [
        T`Z postaci kanonicznej: wierzchołek ma pierwszą współrzędną $p = 13$ – to oś symetrii paraboli.`,
        T`Miejsca zerowe leżą symetrycznie względem osi: $\frac{-3 + x_2}{2} = 13$.`,
        T`$x_2 = 26 + 3 = 29$.`
      ],
      trap: T`Odległość od $-3$ do osi $x = 13$ wynosi $16$, więc drugie miejsce zerowe to $13 + 16 = 29$. Odpowiedź $23$ to błąd w odejmowaniu liczby ujemnej.`,
      tip: T`Sprawdzenie: $(29 - 13)^2 - 256 = 16^2 - 256 = 0$.`
    },
    {
      n: '14.1', pts: 1, t: 4, k: 'SC',
      q: STEM14 + '\n\n' + SC + T`Funkcja $f$ jest rosnąca w przedziale`,
      fig: { plot: F14 },
      o: [T`$\langle -5, 4 \rangle$`, T`$\langle 5, 7 \rangle$`, T`$\langle 1, 5 \rangle$`, T`$\langle -1, 5 \rangle$`],
      a: 'B',
      s: [
        T`Funkcja jest rosnąca tam, gdzie wykres „wznosi się” przy przesuwaniu się w prawo.`,
        T`Dla $x \in \langle -7, -5 \rangle$ i $x \in \langle -4, -1 \rangle$ wykres jest poziomy, dla $x \in \langle -1, 4 \rangle$ opada.`,
        T`Wznosi się tylko ostatni fragment: od punktu $(5, 1)$ do punktu $(7, 6)$, czyli dla $x \in \langle 5, 7 \rangle$.`
      ],
      trap: T`Przedział monotoniczności podajemy na osi $Ox$ (argumenty). Przedział $\langle 1, 5 \rangle$ wygląda kusząco, ale to zakres WARTOŚCI, a nie argumentów.`
    },
    {
      n: '14.2', pts: 1, t: 4, k: 'FILL',
      q: STEM14 + '\n\n' + T`Zapisz w postaci sumy przedziałów zbiór wszystkich argumentów, dla których funkcja $f$ przyjmuje wartości większe od $1$.`,
      fig: { plot: F14 },
      a: T`$\langle -7, -5 \rangle \cup \langle -4, 2) \cup (5, 7 \rangle$`,
      s: [
        T`Szukamy argumentów, dla których wykres leży POWYŻEJ prostej $y = 1$.`,
        T`Pierwszy fragment ma wartość $4$ dla $x \in \langle -7, -5 \rangle$ – cały leży powyżej. Drugi fragment: dla $x \in \langle -4, -1 \rangle$ wartość to $4$, dalej wykres opada wzdłuż prostej $y = -x + 3$ i osiąga wartość $1$ dla $x = 2$; stąd $x \in \langle -4, 2)$.`,
        T`Trzeci fragment zaczyna się w punkcie $(5, 1)$ i rośnie, więc wartości większe od $1$ są dla $x \in (5, 7 \rangle$. Razem: $\langle -7, -5 \rangle \cup \langle -4, 2) \cup (5, 7 \rangle$.`
      ],
      trap: T`Nierówność jest ostra: argumenty $x = 2$ i $x = 5$, dla których $f(x) = 1$, NIE należą do rozwiązania – stąd nawiasy okrągłe w tych miejscach.`
    },
    {
      n: '14.3', pts: 1, t: 4, k: 'SC',
      q: STEM14 + ' ' + T`Funkcja $g$ jest określona za pomocą funkcji $f$ następująco: $g(x) = f(-x)$ dla każdego $x \in \langle -7, -5 \rangle \cup \langle -4, 4 \rangle \cup \langle 5, 7 \rangle$. Na jednym z rysunków A–D przedstawiono, w kartezjańskim układzie współrzędnych $(x, y)$, wykres funkcji $y = g(x)$.` + '\n\n' + SC + T`Wykres funkcji $y = g(x)$ przedstawiono na rysunku`,
      fig: {
        plot: panels([
          ['Wykres funkcji f', F14],
          ['A', pw([seg([-7, 1], [-5, 6], 'filled', 'filled'), seg([-4, -1], [1, 4], 'filled'), seg([1, 4], [4, 4], 'none', 'filled'), seg([5, 4], [7, 4], 'filled', 'filled')])],
          ['B', pw([seg([-7, 6], [-5, 1], 'filled', 'filled'), seg([-4, -1], [1, 4], 'filled'), seg([1, 4], [4, 4], 'none', 'filled'), seg([5, 4], [7, 4], 'filled', 'filled')])],
          ['C', pw([seg([-7, -6], [-5, -6], 'filled', 'filled'), seg([-4, -6], [-1, -6], 'filled'), seg([-1, -6], [4, -1], 'none', 'filled'), seg([5, 1], [7, -4], 'filled', 'filled')])],
          ['D', pw([seg([-7, -4], [-5, -4], 'filled', 'filled'), seg([-4, -4], [-1, -4], 'filled'), seg([-1, -4], [4, 1], 'none', 'filled'), seg([5, -1], [7, -6], 'filled', 'filled')])]
        ])
      },
      o: ['A', 'B', 'C', 'D'],
      a: 'B',
      s: [
        T`Wykres funkcji $g(x) = f(-x)$ to wykres funkcji $f$ odbity symetrycznie względem osi $Oy$ – każdy punkt $(x, y)$ przechodzi na punkt $(-x, y)$.`,
        T`Poziomy odcinek od $(-7, 4)$ do $(-5, 4)$ przechodzi na odcinek od $(5, 4)$ do $(7, 4)$, a rosnący fragment od $(5, 1)$ do $(7, 6)$ – na fragment od $(-7, 6)$ do $(-5, 1)$.`,
        T`Taki wykres – z fragmentem opadającym od $(-7, 6)$ do $(-5, 1)$ – jest na rysunku B.`
      ],
      trap: T`Rysunki C i D to odbicia „do góry nogami” (zmienione wartości). Symetria $f(-x)$ zamienia stronę lewą z prawą, a wysokości punktów zostawia bez zmian.`,
      tip: T`Uwaga: od 2025 r. wymagania egzaminacyjne obejmują tylko przesunięcia $y = f(x - a)$ i $y = f(x) + b$; symetria $y = f(-x)$ już nie obowiązuje.`
    },
    {
      n: '15', pts: 2, t: 6, k: 'MULTI',
      q: T`Funkcje $A$, $B$, $C$, $D$, $E$ oraz $F$ są określone dla każdej liczby rzeczywistej $x$. Wzory tych funkcji podano poniżej.` + '\n\n' + T`Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami A–F. Przedział $(-\infty, 2 \rangle$ jest zbiorem wartości funkcji:`,
      o: [T`$A(x) = -(x - 3)^2 + 2$`, T`$B(x) = x^2 + 2$`, T`$C(x) = -5(x - 2)^2$`, T`$D(x) = (x - 2)^2$`, T`$E(x) = 2x^2 - 8x + 10$`, T`$F(x) = -2x^2 + 4x$`],
      a: 'AF',
      s: [
        T`Zbiór wartości $(-\infty, 2 \rangle$ ma funkcja kwadratowa o ramionach skierowanych w dół ($a < 0$) i wierzchołku o drugiej współrzędnej $q = 2$.`,
        T`Funkcja $A$: postać kanoniczna z $a = -1$ i $q = 2$ – pasuje.`,
        T`Funkcja $F$: $-2x^2 + 4x = -2(x - 1)^2 + 2$, czyli $a = -2$ i $q = 2$ – pasuje. Pozostałe: $B$, $D$, $E$ mają $a > 0$, a funkcja $C$ ma $q = 0$.`
      ],
      trap: T`W funkcji $C$ dwójka stoi w nawiasie – to pierwsza współrzędna wierzchołka ($p = 2$), a nie druga. Jej zbiór wartości to $(-\infty, 0 \rangle$.`
    },
    {
      n: '16', pts: 1, t: 7, k: 'SC',
      q: T`Ciąg $(a_n)$ jest określony wzorem $a_n = (-1)^n \cdot \frac{n + 1}{2}$ dla każdej liczby naturalnej $n \ge 1$.` + '\n\n' + SC + T`Trzeci wyraz tego ciągu jest równy`,
      o: ['$2$', '$(-2)$', '$3$', '$(-1)$'],
      a: 'B',
      s: [
        T`Podstawiamy $n = 3$: $a_3 = (-1)^3 \cdot \frac{3 + 1}{2}$.`,
        T`$(-1)^3 = -1$ oraz $\frac{4}{2} = 2$.`,
        T`$a_3 = -2$.`
      ],
      trap: T`Potęga $(-1)^n$ o wykładniku NIEPARZYSTYM jest równa $-1$. Dla $n = 3$ wyraz jest ujemny.`
    },
    {
      n: '17', pts: 1, t: 7, k: 'PF',
      q: T`Dany jest ciąg geometryczny $(a_n)$, określony dla każdej liczby naturalnej $n \ge 1$. Pierwszy wyraz tego ciągu jest równy $128$, natomiast iloraz ciągu jest równy $\left(-\frac{1}{2}\right)$.`,
      st: [T`Wyraz $a_{2023}$ jest liczbą ujemną.`, T`Różnica $a_3 - a_2$ jest równa $96$.`],
      a: 'FP',
      s: [
        T`$a_{2023} = 128 \cdot \left(-\frac{1}{2}\right)^{2022}$. Wykładnik $2022$ jest parzysty, więc potęga jest dodatnia i cały wyraz jest dodatni – stwierdzenie 1 jest fałszywe.`,
        T`$a_2 = 128 \cdot \left(-\frac{1}{2}\right) = -64$ oraz $a_3 = -64 \cdot \left(-\frac{1}{2}\right) = 32$. Różnica: $32 - (-64) = 96$ – stwierdzenie 2 jest prawdziwe.`
      ],
      trap: T`W wyrazie $a_n = a_1 q^{n-1}$ wykładnik to $n - 1$. Dla $n = 2023$ jest to $2022$ – liczba PARZYSTA, więc wyraz jest dodatni (wyrazy o numerach nieparzystych są dodatnie).`
    },
    {
      n: '18', pts: 2, t: 7, k: 'OPEN',
      q: T`Ciąg $(3x^2 + 5x, x^2, 20 - x^2)$ jest arytmetyczny.` + '\n\n' + T`Oblicz $x$. Zapisz obliczenia.`,
      a: T`$x = -4$`,
      s: [
        T`W ciągu arytmetycznym wyraz środkowy jest średnią arytmetyczną wyrazów sąsiednich: $2 \cdot x^2 = (3x^2 + 5x) + (20 - x^2)$.`,
        T`$2x^2 = 2x^2 + 5x + 20$, czyli $5x + 20 = 0$.`,
        T`$x = -4$. Sprawdzenie: wyrazy to $28$, $16$, $4$ – ciąg arytmetyczny o różnicy $-12$.`
      ],
      trap: T`Po uporządkowaniu wyrazy z $x^2$ się skracają i zostaje równanie liniowe – nie trzeba liczyć delty. Warto na końcu sprawdzić, czy otrzymane wyrazy rzeczywiście tworzą ciąg arytmetyczny.`,
      tip: T`Karta wzorów, str. 9: w ciągu arytmetycznym $a_n = \frac{a_{n-1} + a_{n+1}}{2}$.`
    },
    {
      n: '19', pts: 1, t: 8, k: 'SC',
      q: T`Kąt $\alpha$ jest ostry i $\cos \alpha = \frac{2\sqrt{6}}{7}$.` + '\n\n' + SC + T`Sinus kąta $\alpha$ jest równy`,
      o: [T`$\frac{24}{49}$`, T`$\frac{5}{7}$`, T`$\frac{25}{49}$`, T`$\frac{\sqrt{6}}{7}$`],
      a: 'B',
      s: [
        T`$\cos^2 \alpha = \left(\frac{2\sqrt{6}}{7}\right)^2 = \frac{4 \cdot 6}{49} = \frac{24}{49}$.`,
        T`Z jedynki trygonometrycznej: $\sin^2 \alpha = 1 - \frac{24}{49} = \frac{25}{49}$.`,
        T`Kąt jest ostry, więc $\sin \alpha > 0$: $\sin \alpha = \frac{5}{7}$.`
      ],
      trap: T`$\frac{25}{49}$ to KWADRAT sinusa. Trzeba jeszcze wyciągnąć pierwiastek.`
    },
    {
      n: '20', pts: 1, t: 9, k: 'SC',
      q: T`Trapez $T_1$, o polu równym $52$ i obwodzie $36$, jest podobny do trapezu $T_2$. Pole trapezu $T_2$ jest równe $13$.` + '\n\n' + SC + T`Obwód trapezu $T_2$ jest równy`,
      o: ['$18$', '$9$', T`$\frac{169}{9}$`, T`$\frac{52}{3}$`],
      a: 'A',
      s: [
        T`Stosunek pól figur podobnych to kwadrat skali: $k^2 = \frac{13}{52} = \frac{1}{4}$, więc $k = \frac{1}{2}$.`,
        T`Obwody pozostają w stosunku równym skali: obwód $T_2$ to $\frac{1}{2} \cdot 36 = 18$.`
      ],
      trap: T`Pole zmalało $4$ razy, ale obwód maleje tylko $2$ razy – skala to PIERWIASTEK ze stosunku pól. Odpowiedź $9$ to podzielenie obwodu przez $4$.`
    },
    {
      n: '21', pts: 1, t: 9, k: 'SC',
      q: T`Koło ma promień równy $3$.` + '\n\n' + SC + T`Obwód wycinka tego koła o kącie środkowym $30^\circ$ jest równy`,
      o: [T`$\frac{3}{4}\pi$`, T`$\frac{1}{2}\pi$`, T`$\frac{3}{4}\pi + 6$`, T`$\frac{1}{2}\pi + 6$`],
      a: 'D',
      s: [
        T`Długość łuku: $\frac{30^\circ}{360^\circ} \cdot 2\pi \cdot 3 = \frac{1}{12} \cdot 6\pi = \frac{1}{2}\pi$.`,
        T`Obwód wycinka to łuk i DWA promienie: $\frac{1}{2}\pi + 3 + 3 = \frac{1}{2}\pi + 6$.`
      ],
      trap: T`Obwód wycinka to nie tylko łuk – trzeba doliczyć dwa promienie. Z kolei $\frac{3}{4}\pi$ to POLE tego wycinka, a nie długość łuku.`,
      tip: T`Karta wzorów, str. 17: długość łuku $l = \frac{\alpha}{360^\circ} \cdot 2\pi r$.`
    },
    {
      n: '22', pts: 1, t: 9, k: 'SC',
      q: T`W okręgu $\mathcal{O}$ kąt środkowy $\beta$ oraz kąt wpisany $\alpha$ są oparte na tym samym łuku. Kąt $\beta$ ma miarę o $40^\circ$ większą od kąta $\alpha$.` + '\n\n' + SC + T`Miara kąta $\beta$ jest równa`,
      o: [T`$40^\circ$`, T`$80^\circ$`, T`$100^\circ$`, T`$120^\circ$`],
      a: 'B',
      s: [
        T`Kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku: $\beta = 2\alpha$.`,
        T`Z treści: $\beta = \alpha + 40^\circ$, więc $2\alpha = \alpha + 40^\circ$ i $\alpha = 40^\circ$.`,
        T`$\beta = 80^\circ$.`
      ],
      trap: T`$40^\circ$ to miara kąta WPISANEGO $\alpha$. Pytają o kąt środkowy $\beta$.`
    },
    {
      n: '23', pts: 1, t: 9, k: 'SC',
      q: T`W trójkącie $ABC$ długość boku $AC$ jest równa $3$, a długość boku $BC$ jest równa $4$. Dwusieczna kąta $ACB$ przecina bok $AB$ w punkcie $D$.` + '\n\n' + SC + T`Stosunek $|AD| : |DB|$ jest równy`,
      o: ['$4 : 3$', '$4 : 7$', '$3 : 4$', '$3 : 7$'],
      a: 'C',
      s: [
        T`Twierdzenie o dwusiecznej: dwusieczna kąta trójkąta dzieli przeciwległy bok w stosunku długości boków przyległych do tego kąta.`,
        T`$\frac{|AD|}{|DB|} = \frac{|AC|}{|BC|} = \frac{3}{4}$.`
      ],
      trap: T`Odcinek $AD$ leży przy boku $AC$, więc w liczniku stoi $3$. Stosunek $3 : 7$ to stosunek $|AD|$ do całego boku $|AB|$.`
    },
    {
      n: '24', pts: 2, t: 9, k: 'OPEN',
      q: T`Dany jest trapez równoramienny $ABCD$, w którym podstawa $CD$ ma długość $6$, ramię $AD$ ma długość $4$, a kąty $BAD$ oraz $ABC$ mają miarę $60^\circ$ (zobacz rysunek).` + '\n\n' + T`Oblicz pole tego trapezu. Zapisz obliczenia.`,
      fig: { diagram: geo({ pts: { A: [0, 0, 'bl'], B: [10, 0, 'br'], C: [8, 3.464, 'tr'], D: [2, 3.464, 'tl'] }, segs: ['AB', 'BC', 'CD', 'DA'], texts: [[5, 3.95, '6'], [0.55, 1.9, '4'], [1.0, 0.35, '60°'], [9.0, 0.35, '60°']], height: 240 }) },
      a: T`$P = 16\sqrt{3}$`,
      s: [
        T`Opuszczamy wysokość $DE$ na podstawę $AB$. W trójkącie prostokątnym $AED$: $h = 4 \cdot \sin 60^\circ = 2\sqrt{3}$ oraz $|AE| = 4 \cdot \cos 60^\circ = 2$.`,
        T`Trapez jest równoramienny, więc $|AB| = 2 + 6 + 2 = 10$.`,
        T`$P = \frac{|AB| + |CD|}{2} \cdot h = \frac{10 + 6}{2} \cdot 2\sqrt{3} = 16\sqrt{3}$.`
      ],
      trap: T`Dłuższa podstawa wystaje poza krótszą z OBU stron – po $2$ z każdej. Stąd $|AB| = 10$, a nie $8$.`,
      tip: T`Karta wzorów, str. 19: pole trapezu $P = \frac{a + b}{2} \cdot h$.`
    },
    {
      n: '25', pts: 1, t: 10, k: 'SC',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ dane są prosta $k$ o równaniu $y = \frac{3}{4}x - \frac{7}{4}$ oraz punkt $P = (12, -1)$.` + '\n\n' + SC + T`Prosta przechodząca przez punkt $P$ i równoległa do prostej $k$ ma równanie`,
      o: [T`$y = -\frac{3}{4}x + 8$`, T`$y = \frac{3}{4}x - 10$`, T`$y = \frac{4}{3}x - 17$`, T`$y = -\frac{4}{3}x + 15$`],
      a: 'B',
      s: [
        T`Prosta równoległa ma ten sam współczynnik kierunkowy: $y = \frac{3}{4}x + b$.`,
        T`Podstawiamy punkt $P$: $-1 = \frac{3}{4} \cdot 12 + b$, czyli $-1 = 9 + b$.`,
        T`$b = -10$, więc $y = \frac{3}{4}x - 10$.`
      ],
      trap: T`Wszystkie cztery proste przechodzą przez punkt $P$ – o wyborze decyduje współczynnik kierunkowy. Równoległość to TEN SAM współczynnik ($\frac{3}{4}$); $-\frac{4}{3}$ dałoby prostą prostopadłą.`
    },
    {
      n: '26', pts: 1, t: 10, k: 'SC',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ dany jest okrąg $\mathcal{O}$ o środku $S = (-1, 2)$ i promieniu $3$.` + '\n\n' + SC + T`Okrąg $\mathcal{O}$ jest określony równaniem`,
      o: [T`$(x - 1)^2 + (y + 2)^2 = 9$`, T`$(x - 1)^2 + (y + 2)^2 = 3$`, T`$(x + 1)^2 + (y - 2)^2 = 9$`, T`$(x + 1)^2 + (y - 2)^2 = 3$`],
      a: 'C',
      s: [
        T`Równanie okręgu o środku $(a, b)$ i promieniu $r$: $(x - a)^2 + (y - b)^2 = r^2$.`,
        T`Dla $a = -1$, $b = 2$, $r = 3$: $(x - (-1))^2 + (y - 2)^2 = 3^2$.`,
        T`$(x + 1)^2 + (y - 2)^2 = 9$.`
      ],
      trap: T`Dwie pułapki: znaki w nawiasach są PRZECIWNE do współrzędnych środka, a po prawej stronie stoi KWADRAT promienia.`,
      tip: T`Karta wzorów, str. 23: równanie okręgu.`
    },
    {
      n: '27', pts: 1, t: 10, k: 'AB',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ proste o równaniach: $y = \sqrt{3}x + 6$, $y = -\sqrt{3}x + 6$, $y = -\frac{1}{\sqrt{3}}x - 2$, przecinają się w punktach, które są wierzchołkami trójkąta $KLM$.` + '\n\n' + T`Dokończ zdanie tak, aby było prawdziwe. Wybierz właściwe zakończenie wraz z uzasadnieniem.` + '\n\n' + T`Trójkąt $KLM$ jest`,
      ab: ['równoramienny', 'prostokątny'],
      r: [T`oś $Ox$ przechodzi przez jeden z wierzchołków tego trójkąta i środek jednego z boków tego trójkąta`, T`dwie z tych prostych są prostopadłe`, T`oś $Oy$ zawiera dwusieczną tego trójkąta`],
      a: 'B2',
      s: [
        T`Sprawdzamy iloczyny współczynników kierunkowych: $\sqrt{3} \cdot \left(-\frac{1}{\sqrt{3}}\right) = -1$.`,
        T`Proste $y = \sqrt{3}x + 6$ oraz $y = -\frac{1}{\sqrt{3}}x - 2$ są więc prostopadłe.`,
        T`Trójkąt, którego dwa boki leżą na prostych prostopadłych, ma kąt prosty – jest prostokątny.`
      ],
      trap: T`Proste $y = \sqrt{3}x + 6$ i $y = -\sqrt{3}x + 6$ są symetryczne względem osi $Oy$, co sugeruje trójkąt równoramienny – ale trzecia prosta nie jest pozioma, więc ta symetria nie przenosi się na trójkąt.`,
      tip: T`Karta wzorów, str. 22: proste są prostopadłe, gdy $a_1 \cdot a_2 = -1$.`
    },
    {
      n: '28', pts: 1, t: 10, k: 'SC',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ punkt $A = (-1, -4)$ jest wierzchołkiem równoległoboku $ABCD$. Punkt $S = (2, 2)$ jest środkiem symetrii tego równoległoboku.` + '\n\n' + SC + T`Długość przekątnej $AC$ równoległoboku $ABCD$ jest równa`,
      o: [T`$\sqrt{5}$`, T`$2\sqrt{5}$`, T`$3\sqrt{5}$`, T`$6\sqrt{5}$`],
      a: 'D',
      s: [
        T`Środek symetrii równoległoboku to punkt przecięcia przekątnych, czyli środek przekątnej $AC$.`,
        T`$|AS| = \sqrt{(2 + 1)^2 + (2 + 4)^2} = \sqrt{9 + 36} = \sqrt{45} = 3\sqrt{5}$.`,
        T`$|AC| = 2 \cdot |AS| = 6\sqrt{5}$.`
      ],
      trap: T`$3\sqrt{5}$ to dopiero POŁOWA przekątnej (odcinek $AS$). Cała przekątna jest dwa razy dłuższa.`
    },
    {
      n: '29.1', pts: 1, t: 11, k: 'SC',
      q: STEM29 + '\n\n' + SC + T`Pole powierzchni całkowitej tego graniastosłupa jest równe`,
      o: [T`$216 + 18\sqrt{3}$`, T`$216 + 54\sqrt{3}$`, T`$216 + 216\sqrt{3}$`, T`$216 + 108\sqrt{3}$`],
      a: 'D',
      s: [
        T`Podstawa to sześciokąt foremny o boku $6$, złożony z $6$ trójkątów równobocznych: $P_p = 6 \cdot \frac{6^2\sqrt{3}}{4} = 54\sqrt{3}$.`,
        T`Ściany boczne to $6$ kwadratów o boku $6$: $P_b = 6 \cdot 36 = 216$.`,
        T`$P_c = 2 \cdot 54\sqrt{3} + 216 = 216 + 108\sqrt{3}$.`
      ],
      trap: T`Graniastosłup ma DWIE podstawy. $216 + 54\sqrt{3}$ to pole z jedną podstawą.`,
      tip: T`Karta wzorów, str. 15: pole trójkąta równobocznego $\frac{a^2\sqrt{3}}{4}$.`
    },
    {
      n: '29.2', pts: 1, t: 11, k: 'OPEN',
      q: STEM29 + '\n\n' + T`Oblicz cosinus kąta nachylenia dłuższej przekątnej tego graniastosłupa do płaszczyzny podstawy graniastosłupa. Zapisz obliczenia.`,
      a: T`$\cos \alpha = \frac{2\sqrt{5}}{5}$`,
      s: [
        T`Rzutem dłuższej przekątnej graniastosłupa na podstawę jest dłuższa przekątna sześciokąta foremnego: $d = 2 \cdot 6 = 12$.`,
        T`Długość przekątnej graniastosłupa (z twierdzenia Pitagorasa, wysokość $H = 6$): $D = \sqrt{12^2 + 6^2} = \sqrt{180} = 6\sqrt{5}$.`,
        T`$\cos \alpha = \frac{d}{D} = \frac{12}{6\sqrt{5}} = \frac{2}{\sqrt{5}} = \frac{2\sqrt{5}}{5}$.`
      ],
      trap: T`Cosinus to stosunek przyprostokątnej PRZYLEGŁEJ (przekątna podstawy) do przeciwprostokątnej (przekątna graniastosłupa). Stosunek $\frac{6}{12}$ to tangens tego kąta.`
    },
    {
      n: '30', pts: 1, t: 12, k: 'SC',
      q: SC + T`Wszystkich liczb naturalnych czterocyfrowych, w których zapisie dziesiętnym cyfry się nie powtarzają, jest`,
      o: [T`$9 \cdot 10 \cdot 10 \cdot 10 \cdot 10$`, T`$9 \cdot 9 \cdot 9 \cdot 9$`, T`$10 \cdot 9 \cdot 8 \cdot 7$`, T`$9 \cdot 9 \cdot 8 \cdot 7$`],
      a: 'D',
      s: [
        T`Pierwsza cyfra: dowolna oprócz zera – $9$ możliwości.`,
        T`Druga cyfra: dowolna oprócz już użytej (zero jest teraz dozwolone) – $9$ możliwości. Trzecia: $8$, czwarta: $7$.`,
        T`Z reguły mnożenia: $9 \cdot 9 \cdot 8 \cdot 7$.`
      ],
      trap: T`Na pierwszym miejscu nie może stać zero ($9$ możliwości), ale na drugim zero „wraca do gry” – stąd znów $9$, a nie $8$.`
    },
    {
      n: '31', pts: 2, t: 13, k: 'OPEN',
      q: T`Ze zbioru pięciu liczb $\{1, 2, 3, 4, 5\}$ losujemy bez zwracania kolejno dwa razy po jednej liczbie.` + '\n\n' + T`Oblicz prawdopodobieństwo zdarzenia $A$ polegającego na tym, że obie wylosowane liczby są nieparzyste. Zapisz obliczenia.`,
      a: T`$P(A) = \frac{6}{20} = \frac{3}{10}$`,
      s: [
        T`Losujemy kolejno dwie różne liczby z pięciu: $|\Omega| = 5 \cdot 4 = 20$.`,
        T`Liczby nieparzyste w zbiorze: $1$, $3$, $5$. Pierwszą można wybrać na $3$ sposoby, drugą – na $2$: $|A| = 3 \cdot 2 = 6$.`,
        T`$P(A) = \frac{6}{20} = \frac{3}{10}$.`
      ],
      trap: T`Losowanie BEZ zwracania: po wylosowaniu jednej liczby nieparzystej zostają tylko dwie. Wynik $\frac{9}{25}$ dotyczy losowania ze zwracaniem.`
    },
    {
      n: '32', pts: 1, t: 14, k: 'SC',
      q: T`Na diagramie przedstawiono rozkład wynagrodzenia brutto wszystkich stu pracowników pewnej firmy za styczeń 2023 roku.` + '\n\n' + SC + T`Średnia wynagrodzenia brutto wszystkich pracowników tej firmy za styczeń 2023 roku jest równa`,
      fig: { diagram: bars([[4800, 10], [5100, 36], [5500, 5], [5900, 25], [6400, 18], [7500, 4], [8600, 2]], { xTitle: 'wynagrodzenie brutto za styczeń 2023 (w zł)', yTitle: 'liczba pracowników' }) },
      o: ['$5690$ zł', '$5280$ zł', '$6257$ zł', '$5900$ zł'],
      a: 'A',
      s: [
        T`Suma wynagrodzeń: $4800 \cdot 10 + 5100 \cdot 36 + 5500 \cdot 5 + 5900 \cdot 25 + 6400 \cdot 18 + 7500 \cdot 4 + 8600 \cdot 2$.`,
        T`$48\,000 + 183\,600 + 27\,500 + 147\,500 + 115\,200 + 30\,000 + 17\,200 = 569\,000$.`,
        T`Średnia: $\frac{569\,000}{100} = 5690$ zł.`
      ],
      trap: T`$6257$ zł to średnia siedmiu kwot z osi bez uwzględnienia liczby pracowników. Każdą kwotę trzeba pomnożyć przez liczbę osób, które ją otrzymały.`,
      tip: T`Karta wzorów, str. 29: średnia ważona.`
    },
    {
      n: '33', pts: 4, t: 15, k: 'OPEN',
      q: T`Zakład stolarski produkuje krzesła, które sprzedaje po $196$ złotych za sztukę. Właściciel, na podstawie analizy rzeczywistych wpływów i wydatków, stwierdził, że: przychód $P$ (w złotych) ze sprzedaży $x$ krzeseł można opisać funkcją $P(x) = 196x$, a koszt $K$ (w złotych) produkcji $x$ krzeseł dziennie można opisać funkcją` + '\n$$K(x) = 4x^2 + 4x + 240$$\n' + T`Dziennie w zakładzie można wyprodukować co najwyżej $30$ krzeseł.` + '\n\n' + T`Oblicz, ile krzeseł powinien dziennie sprzedawać zakład, aby zysk ze sprzedaży krzeseł wyprodukowanych przez ten zakład w ciągu jednego dnia był możliwie największy. Oblicz ten największy zysk. Zapisz obliczenia.` + '\n\n' + T`Wskazówka: przyjmij, że zysk jest różnicą przychodu i kosztów.`,
      a: T`Zakład powinien sprzedawać $24$ krzesła dziennie; największy zysk to $2064$ zł.`,
      s: [
        T`Zysk: $Z(x) = P(x) - K(x) = 196x - (4x^2 + 4x + 240) = -4x^2 + 192x - 240$.`,
        T`Dziedzina: $x$ jest liczbą naturalną i $x \le 30$.`,
        T`Ramiona paraboli są skierowane w dół, więc wartość największa jest w wierzchołku: $x = -\frac{192}{2 \cdot (-4)} = 24$. Liczba $24$ jest naturalna i nie przekracza $30$.`,
        T`$Z(24) = -4 \cdot 576 + 192 \cdot 24 - 240 = -2304 + 4608 - 240 = 2064$ zł.`
      ],
      trap: T`Odejmując koszt, trzeba zmienić znaki WSZYSTKICH jego składników: $-(4x^2 + 4x + 240)$. Trzeba też sprawdzić, czy wierzchołek mieści się w ograniczeniu $x \le 30$.`,
      tip: T`Karta wzorów, str. 8: $p = -\frac{b}{2a}$, $q = f(p)$.`
    }
  ]
};
