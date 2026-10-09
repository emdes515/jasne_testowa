// Egzamin maturalny z matematyki, poziom podstawowy, Formuła 2023 – termin poprawkowy, sierpień 2024 r.
// Transkrypcja z arkusza CKE; klucz odpowiedzi: wersja A. Rozwiązania krok po kroku – opracowanie JASNE.
import { geo, lines, parabola } from './fig.js';

const T = String.raw;
const SC = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\n';

const STEM11 = T`Pusta bańka na mleko o pojemności $10$ litrów ma masę $6{,}5$ kg. Jeden litr mleka ma masę $1{,}03$ kg. Niech $x$ oznacza liczbę litrów mleka w tej bańce, a $f(x)$ oznacza wyrażoną w kilogramach masę bańki wraz z mlekiem, gdzie $x \in \langle 0, 10 \rangle$.`;
const STEM12 = T`W kartezjańskim układzie współrzędnych $(x, y)$ przedstawiono fragment paraboli, która jest wykresem funkcji kwadratowej $f$ (zobacz rysunek). Wierzchołek tej paraboli oraz punkty przecięcia paraboli z osią $Ox$ układu współrzędnych mają obie współrzędne całkowite.`;
const FIG12 = { plot: parabola(0.5, 1, -2, [-3, 5], [-3, 6]) };

export default {
  examId: 'matura-sierpien-2024',
  examName: 'Matura Sierpień 2024 (Formuła 2023)',
  sourceLabel: 'Matura Sierpień 2024',
  refLabel: 'Matura sierpień 2024',
  year: 2024,
  session: 'Sierpień',
  totalPoints: 46,
  tasks: [
    {
      n: '1', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba wszystkich całkowitych rozwiązań nierówności $|x + 1| < 3$ jest równa`,
      o: ['$2$', '$3$', '$5$', '$7$'],
      a: 'C',
      s: [
        T`$|x + 1| < 3$ oznacza, że liczba $x$ leży na osi w odległości mniejszej niż $3$ od liczby $-1$.`,
        T`$-3 < x + 1 < 3$, czyli $-4 < x < 2$.`,
        T`Liczby całkowite w tym przedziale: $-3, -2, -1, 0, 1$ – jest ich $5$.`
      ],
      trap: T`Nierówność jest ostra, więc końce $-4$ i $2$ NIE należą do zbioru rozwiązań. Policzenie ich daje błędną odpowiedź $7$.`
    },
    {
      n: '2', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $\left(\frac{4}{25}\right)^{-0{,}5}$ jest równa`,
      o: ['$0{,}04$', '$0{,}8$', '$2{,}5$', '$0{,}4$'],
      a: 'C',
      s: [
        T`Wykładnik ujemny odwraca ułamek: $\left(\frac{4}{25}\right)^{-0{,}5} = \left(\frac{25}{4}\right)^{0{,}5}$.`,
        T`Wykładnik $0{,}5 = \frac{1}{2}$ oznacza pierwiastek kwadratowy: $\sqrt{\frac{25}{4}} = \frac{5}{2} = 2{,}5$.`
      ],
      trap: T`Odpowiedź $0{,}4$ to sam pierwiastek z $\frac{4}{25}$ – bez uwzględnienia minusa w wykładniku, który odwraca ułamek.`
    },
    {
      n: '3', pts: 2, t: 2, k: 'PROOF',
      q: T`Wykaż, że dla każdej liczby naturalnej $n \ge 1$ liczba $(2n + 5)^2 + 3$ jest podzielna przez $4$.`,
      a: T`$(2n + 5)^2 + 3 = 4(n^2 + 5n + 7)$, a liczba $n^2 + 5n + 7$ jest całkowita, więc dana liczba jest podzielna przez $4$.`,
      s: [
        T`Rozwijamy kwadrat: $(2n + 5)^2 + 3 = 4n^2 + 20n + 25 + 3 = 4n^2 + 20n + 28$.`,
        T`Wyłączamy $4$ przed nawias: $4(n^2 + 5n + 7)$.`,
        T`Liczba $n^2 + 5n + 7$ jest całkowita (bo $n$ jest liczbą naturalną), więc dana liczba jest wielokrotnością $4$.`
      ],
      trap: T`W rozwinięciu $(2n + 5)^2$ nie wolno zgubić wyrazu środkowego $2 \cdot 2n \cdot 5 = 20n$. Dowód kończy zdanie o tym, że czynnik w nawiasie jest liczbą całkowitą.`
    },
    {
      n: '4', pts: 2, t: 1, k: 'MULTI',
      q: T`Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami A–F. Prawdziwe są równości:`,
      o: [
        T`$\log_2 16 + \log_2 9 = \log_2 25$`,
        T`$\log_2 16 + \log_2 9 = 2 \cdot \log_2 5$`,
        T`$\log_2 16 + \log_2 9 = \log_2 144$`,
        T`$\log_2 16 + \log_2 9 = \log_4 144$`,
        T`$\log_2 16 + \log_2 9 = 4 + 2 \cdot \log_2 3$`,
        T`$\log_2 16 + \log_2 9 = 2 \cdot \log_4 12$`
      ],
      a: 'CE',
      s: [
        T`Suma logarytmów to logarytm iloczynu: $\log_2 16 + \log_2 9 = \log_2 (16 \cdot 9) = \log_2 144$ – równość C jest prawdziwa.`,
        T`Inaczej: $\log_2 16 = 4$, a $\log_2 9 = \log_2 3^2 = 2\log_2 3$, więc suma to $4 + 2\log_2 3$ – równość E jest prawdziwa.`,
        T`Pozostałe: $\log_2 25 = 2\log_2 5$ pochodzi z błędnego dodania $16 + 9$ (A, B), a $\log_4 144 = 2\log_4 12 = \log_2 12$, czyli o połowę za mało (D, F).`
      ],
      trap: T`$\log_a x + \log_a y = \log_a (x \cdot y)$, a NIE $\log_a (x + y)$. Zmiana podstawy z $2$ na $4$ też zmienia wartość logarytmu.`,
      tip: T`Karta wzorów, str. 5: logarytm iloczynu i logarytm potęgi.`
    },
    {
      n: '5', pts: 1, t: 3, k: 'SC',
      q: SC + T`Zbiorem wszystkich rozwiązań nierówności` + '\n$$\\frac{3(6 - x)}{17} \\le 3$$\n' + T`jest przedział`,
      o: [T`$(-\infty, -11)$`, T`$(-\infty, -11 \rangle$`, T`$(-11, +\infty)$`, T`$\langle -11, +\infty)$`],
      a: 'D',
      s: [
        T`Mnożymy obie strony przez $17$: $3(6 - x) \le 51$.`,
        T`Dzielimy przez $3$: $6 - x \le 17$, czyli $-x \le 11$.`,
        T`Mnożymy przez $-1$ i odwracamy znak: $x \ge -11$, więc $x \in \langle -11, +\infty)$.`
      ],
      trap: T`Dwie pułapki naraz: odwrócenie znaku przy mnożeniu przez $-1$ oraz domknięcie przedziału przy nierówności nieostrej.`
    },
    {
      n: '6', pts: 1, t: 3, k: 'SC',
      q: SC + T`Równanie $\frac{x(x + 5)(2 - x)}{2x + 4} = 0$ w zbiorze liczb rzeczywistych ma dokładnie`,
      o: [T`dwa rozwiązania: $(-5)$ oraz $2$.`, T`dwa rozwiązania: $(-5)$ oraz $0$.`, T`trzy rozwiązania: $(-5)$, $0$ oraz $2$.`, T`cztery rozwiązania: $(-5)$, $(-2)$, $0$ oraz $2$.`],
      a: 'C',
      s: [
        T`Dziedzina: $2x + 4 \ne 0$, czyli $x \ne -2$.`,
        T`Licznik jest równy zero, gdy $x = 0$ lub $x + 5 = 0$ lub $2 - x = 0$, czyli dla $x = 0$, $x = -5$, $x = 2$.`,
        T`Żadna z tych liczb nie jest równa $-2$, więc wszystkie trzy są rozwiązaniami.`
      ],
      trap: T`Liczba $-2$ zeruje mianownik – jest wykluczona z dziedziny, a nie jest rozwiązaniem. Nie wolno też zgubić rozwiązania $x = 0$.`
    },
    {
      n: '7', pts: 3, t: 3, k: 'OPEN',
      q: T`Rozwiąż równanie` + '\n$$x^3 + 5x^2 - 2x - 10 = 0$$\n' + T`Zapisz obliczenia.`,
      a: T`$x = -5$ lub $x = -\sqrt{2}$ lub $x = \sqrt{2}$.`,
      s: [
        T`Grupujemy wyrazy: $x^2(x + 5) - 2(x + 5) = 0$.`,
        T`$(x + 5)(x^2 - 2) = 0$.`,
        T`$x + 5 = 0$ lub $x^2 = 2$, czyli $x = -5$ lub $x = \sqrt{2}$ lub $x = -\sqrt{2}$.`
      ],
      trap: T`Równanie $x^2 = 2$ ma dwa rozwiązania: $\sqrt{2}$ i $-\sqrt{2}$. Pominięcie ujemnego to strata punktu.`
    },
    {
      n: '8', pts: 1, t: 5, k: 'SC',
      q: T`Na rysunku, w kartezjańskim układzie współrzędnych $(x, y)$, przedstawiono interpretację geometryczną jednego z poniższych układów równań A–D.` + '\n\n' + SC + T`Układem równań, którego interpretację geometryczną przedstawiono na rysunku, jest`,
      fig: { plot: lines([[-1, 2], [2, -3]], [-5, 5], [-5, 5]) },
      o: [
        T`$\begin{cases} y = x + 2 \\ y = 2x - 3 \end{cases}$`,
        T`$\begin{cases} y = -x + 2 \\ y = 2x - 3 \end{cases}$`,
        T`$\begin{cases} y = x + 2 \\ y = -2x - 3 \end{cases}$`,
        T`$\begin{cases} y = -x + 2 \\ y = 2x + 3 \end{cases}$`
      ],
      a: 'B',
      s: [
        T`Jedna prosta opada i przecina oś $Oy$ w punkcie $(0, 2)$ – jej równanie ma ujemny współczynnik kierunkowy i wyraz wolny $2$: $y = -x + 2$.`,
        T`Druga prosta rośnie i przecina oś $Oy$ w punkcie $(0, -3)$: $y = 2x - 3$.`,
        T`Taką parę równań zawiera układ B.`
      ],
      trap: T`Wyraz wolny to punkt przecięcia z osią $Oy$, a znak współczynnika kierunkowego mówi, czy prosta rośnie, czy opada. Wystarczy sprawdzić te dwie rzeczy dla każdej prostej.`
    },
    {
      n: '9', pts: 2, t: 4, k: 'PARTS',
      q: T`Funkcja $y = f(x)$ jest określona za pomocą tabeli` + '\n$$\\begin{array}{c|ccccccc} x & -6 & -4 & -2 & 0 & 2 & 4 & 6 \\\\ \\hline y & -3 & -4 & 4 & 1 & 5 & 0 & 2 \\end{array}$$\n' + T`Uzupełnij każde zdanie. Wybierz właściwą odpowiedź spośród oznaczonych literami A–E.`,
      parts: [T`Największa wartość funkcji $f$ jest równa`, T`Miejsce zerowe funkcji $f$ jest równe`],
      choices: ['$1$', '$2$', '$4$', '$5$', '$6$'],
      a: 'DC',
      s: [
        T`Wartości funkcji to liczby z dolnego wiersza tabeli: $-3, -4, 4, 1, 5, 0, 2$. Największa z nich to $5$ – odpowiedź D.`,
        T`Miejsce zerowe to argument, dla którego wartość jest równa $0$. W tabeli $y = 0$ dla $x = 4$ – odpowiedź C.`
      ],
      trap: T`Największa WARTOŚĆ to liczba z wiersza $y$ (czyli $5$), a nie największy argument ($6$). Miejsce zerowe to ARGUMENT z wiersza $x$ (czyli $4$), a nie $f(0) = 1$.`
    },
    {
      n: '10', pts: 1, t: 5, k: 'FILL',
      q: T`Funkcja liniowa $f$ jest określona wzorem $f(x) = \frac{\sqrt{3}}{3}x - 3$. W kartezjańskim układzie współrzędnych $(x, y)$ wykres funkcji $y = f(x)$ jest prostą nachyloną do osi $Ox$ pod kątem ostrym $\alpha$.` + '\n\n' + T`Uzupełnij zdanie. Wpisz odpowiednią liczbę tak, aby zdanie było prawdziwe.` + '\n\n' + T`Sinus kąta $\alpha$ jest równy …`,
      a: T`$\frac{1}{2}$`,
      s: [
        T`Współczynnik kierunkowy prostej to tangens kąta jej nachylenia do osi $Ox$: $\operatorname{tg} \alpha = \frac{\sqrt{3}}{3}$.`,
        T`Kąt ostry o takim tangensie to $\alpha = 30^\circ$.`,
        T`$\sin 30^\circ = \frac{1}{2}$.`
      ],
      trap: T`Współczynnik kierunkowy to TANGENS kąta nachylenia, a nie sinus. Najpierw znajdź kąt ($30^\circ$), potem jego sinus.`,
      tip: T`Karta wzorów, str. 12: $\operatorname{tg} 30^\circ = \frac{\sqrt{3}}{3}$, $\sin 30^\circ = \frac{1}{2}$.`
    },
    {
      n: '11.1', pts: 1, t: 5, k: 'PF',
      q: STEM11,
      st: [T`Funkcja $f$ jest malejąca.`, T`Funkcja $f$ nie ma miejsc zerowych.`],
      a: 'FP',
      s: [
        T`Masa bańki z mlekiem: $f(x) = 1{,}03x + 6{,}5$. Współczynnik kierunkowy $1{,}03 > 0$, więc funkcja jest rosnąca – stwierdzenie 1 jest fałszywe.`,
        T`Dla $x \in \langle 0, 10 \rangle$ wartości funkcji są nie mniejsze niż $f(0) = 6{,}5 > 0$, więc funkcja nie ma miejsc zerowych – stwierdzenie 2 jest prawdziwe.`
      ],
      trap: T`Im więcej mleka, tym większa masa – funkcja rośnie. Miejsce zerowe prostej $y = 1{,}03x + 6{,}5$ jest ujemne, czyli leży poza dziedziną $\langle 0, 10 \rangle$.`
    },
    {
      n: '11.2', pts: 1, t: 5, k: 'SC',
      q: STEM11 + '\n\n' + SC + T`Największa wartość funkcji $f$ jest równa`,
      o: ['$16{,}8$', '$15{,}8$', '$11{,}3$', '$10{,}3$'],
      a: 'A',
      s: [
        T`$f(x) = 1{,}03x + 6{,}5$ jest funkcją rosnącą, więc największą wartość przyjmuje dla największego argumentu: $x = 10$.`,
        T`$f(10) = 1{,}03 \cdot 10 + 6{,}5 = 10{,}3 + 6{,}5 = 16{,}8$.`
      ],
      trap: T`$10{,}3$ kg to masa samego mleka. Trzeba jeszcze doliczyć masę pustej bańki: $6{,}5$ kg.`
    },
    {
      n: '11.3', pts: 1, t: 5, k: 'SC',
      q: STEM11 + '\n\n' + SC + T`Funkcja $f$ jest określona wzorem`,
      o: [T`$f(x) = 6{,}5x + 1{,}03$`, T`$f(x) = 1{,}03x + 10$`, T`$f(x) = 10x + 1{,}03$`, T`$f(x) = 1{,}03x + 6{,}5$`],
      a: 'D',
      s: [
        T`Każdy litr mleka dodaje $1{,}03$ kg, więc $x$ litrów mleka ma masę $1{,}03x$ – to część zależna od $x$.`,
        T`Pusta bańka waży zawsze $6{,}5$ kg – to wyraz wolny.`,
        T`$f(x) = 1{,}03x + 6{,}5$.`
      ],
      trap: T`Współczynnik przy $x$ to „ile przybywa na każdy litr” ($1{,}03$), a wyraz wolny to „ile jest na starcie” ($6{,}5$). Pojemność $10$ litrów określa tylko dziedzinę.`
    },
    {
      n: '12.1', pts: 1, t: 6, k: 'SC',
      q: STEM12 + '\n\n' + SC + T`Zbiorem wartości funkcji $f$ jest przedział`,
      fig: FIG12,
      o: [T`$(-\infty, -2 \rangle$`, T`$\langle 1, +\infty)$`, T`$\langle -1, 3 \rangle$`, T`$\langle -2, +\infty)$`],
      a: 'D',
      s: [
        T`Z wykresu: wierzchołek paraboli to $(1, -2)$, a ramiona są skierowane w górę.`,
        T`Najmniejsza wartość funkcji to druga współrzędna wierzchołka, czyli $-2$; większe wartości są przyjmowane bez ograniczeń.`,
        T`$ZW = \langle -2, +\infty)$.`
      ],
      trap: T`Zbiór wartości czytamy z osi $Oy$. Przedział $\langle -1, 3 \rangle$ to argumenty między miejscami zerowymi, a nie wartości.`
    },
    {
      n: '12.2', pts: 1, t: 6, k: 'SC',
      q: STEM12 + '\n\n' + SC + T`Osią symetrii wykresu funkcji $f$ jest prosta o równaniu`,
      fig: FIG12,
      o: [T`$x = 1$`, T`$y = 1$`, T`$x = -2$`, T`$y = -2$`],
      a: 'A',
      s: [
        T`Oś symetrii paraboli to pionowa prosta przechodząca przez wierzchołek.`,
        T`Wierzchołek ma pierwszą współrzędną $1$ (to także środek między miejscami zerowymi $-1$ i $3$), więc oś symetrii ma równanie $x = 1$.`
      ],
      trap: T`Prosta pionowa ma równanie $x = \ldots$, a pozioma $y = \ldots$ Oś symetrii paraboli jest pionowa.`
    },
    {
      n: '12.3', pts: 1, t: 6, k: 'SC',
      q: STEM12 + '\n\n' + SC + T`Funkcja $f$ jest określona wzorem`,
      fig: FIG12,
      o: [T`$f(x) = \frac{1}{2}(x - 1)^2 + 2$`, T`$f(x) = \frac{1}{2}(x + 1)^2 + 2$`, T`$f(x) = \frac{1}{2}(x - 1)^2 - 2$`, T`$f(x) = \frac{1}{2}(x + 1)^2 - 2$`],
      a: 'C',
      s: [
        T`Wierzchołek $(1, -2)$ daje postać kanoniczną $f(x) = a(x - 1)^2 - 2$.`,
        T`Sprawdzenie dla miejsca zerowego $x = 3$: $\frac{1}{2} \cdot (3 - 1)^2 - 2 = 2 - 2 = 0$ – zgadza się.`
      ],
      trap: T`W postaci kanonicznej $a(x - p)^2 + q$ wierzchołek $(1, -2)$ daje nawias $(x - 1)$ i wyraz $-2$. Zamiana znaków to najczęstszy błąd.`
    },
    {
      n: '13', pts: 1, t: 7, k: 'SC',
      q: T`Ciąg $(a_n)$ jest określony dla każdej liczby naturalnej $n \ge 1$. Suma $n$ początkowych wyrazów tego ciągu wyraża się wzorem $S_n = n^2 + 2n$ dla każdej liczby naturalnej $n \ge 1$.` + '\n\n' + SC + T`Trzeci wyraz ciągu $(a_n)$ jest równy`,
      o: ['$5$', '$7$', '$13$', '$15$'],
      a: 'B',
      s: [
        T`Trzeci wyraz to różnica sum: $a_3 = S_3 - S_2$.`,
        T`$S_3 = 9 + 6 = 15$ oraz $S_2 = 4 + 4 = 8$.`,
        T`$a_3 = 15 - 8 = 7$.`
      ],
      trap: T`$S_3 = 15$ to suma TRZECH wyrazów, a nie trzeci wyraz. Żeby dostać $a_3$, trzeba odjąć sumę dwóch pierwszych.`
    },
    {
      n: '14', pts: 1, t: 7, k: 'SC',
      q: T`Dany jest ciąg geometryczny $(a_n)$ określony dla każdej liczby naturalnej $n \ge 1$, w którym $a_2 = 2$ oraz $a_5 = 54$.` + '\n\n' + SC + T`Iloraz ciągu $(a_n)$ jest równy`,
      o: ['$3$', '$9$', T`$\frac{52}{3}$`, '$27$'],
      a: 'A',
      s: [
        T`Od wyrazu drugiego do piątego mnożymy przez iloraz trzy razy: $a_5 = a_2 \cdot q^3$.`,
        T`$54 = 2 \cdot q^3$, więc $q^3 = 27$ i $q = 3$.`
      ],
      trap: T`$27$ to $q^3$, a nie $q$. Odpowiedź $\frac{52}{3}$ powstaje z potraktowania ciągu jak arytmetycznego ($\frac{54 - 2}{3}$).`
    },
    {
      n: '15', pts: 1, t: 7, k: 'AB',
      q: T`Trzywyrazowy ciąg $(2m - 5, 4, 9)$ jest arytmetyczny.` + '\n\n' + T`Dokończ zdanie. Wybierz właściwe zakończenie.` + '\n\n' + T`Ten ciąg jest`,
      ab: ['rosnący', 'malejący'],
      r: [T`$m = -1$`, T`$m = 2$`, T`$m = 3$`],
      join: 'oraz',
      a: 'A2',
      s: [
        T`Różnica ciągu: $r = 9 - 4 = 5 > 0$, więc ciąg jest rosnący.`,
        T`Pierwszy wyraz: $4 - 5 = -1$, zatem $2m - 5 = -1$.`,
        T`$2m = 4$, czyli $m = 2$.`
      ],
      trap: T`$-1$ to wartość pierwszego WYRAZU, a nie liczby $m$. Trzeba jeszcze rozwiązać równanie $2m - 5 = -1$.`
    },
    {
      n: '16', pts: 1, t: 8, k: 'SC',
      q: T`Kąt $\alpha$ jest ostry oraz $\cos \alpha = \frac{24}{25}$.` + '\n\n' + SC + T`Tangens kąta $\alpha$ jest równy`,
      o: [T`$\frac{7}{18}$`, T`$\frac{7}{24}$`, T`$\frac{7}{25}$`, T`$\frac{18}{25}$`],
      a: 'B',
      s: [
        T`Z jedynki trygonometrycznej: $\sin^2 \alpha = 1 - \left(\frac{24}{25}\right)^2 = 1 - \frac{576}{625} = \frac{49}{625}$.`,
        T`Kąt jest ostry, więc $\sin \alpha > 0$: $\sin \alpha = \frac{7}{25}$.`,
        T`$\operatorname{tg} \alpha = \frac{\sin \alpha}{\cos \alpha} = \frac{7}{25} : \frac{24}{25} = \frac{7}{24}$.`
      ],
      trap: T`$\frac{7}{25}$ to sinus, a nie tangens. Tangens to iloraz sinusa przez cosinus.`,
      tip: T`Szybciej: trójkąt prostokątny o bokach $7$, $24$, $25$ – przyprostokątna przyległa $24$, przeciwległa $7$.`
    },
    {
      n: '17', pts: 1, t: 8, k: 'SC',
      q: T`W trójkącie prostokątnym $ABC$ sinus kąta $CAB$ jest równy $\frac{3}{5}$, a przeciwprostokątna $AB$ jest o $8$ dłuższa od przyprostokątnej $BC$.` + '\n\n' + SC + T`Długość przeciwprostokątnej $AB$ tego trójkąta jest równa`,
      o: ['$18$', '$20$', '$24$', '$25$'],
      a: 'B',
      s: [
        T`Sinus kąta $CAB$ to stosunek przyprostokątnej leżącej naprzeciw tego kąta do przeciwprostokątnej: $\frac{|BC|}{|AB|} = \frac{3}{5}$.`,
        T`Oznaczmy $|BC| = 3k$, $|AB| = 5k$. Z treści: $5k = 3k + 8$, więc $k = 4$.`,
        T`$|AB| = 5 \cdot 4 = 20$.`
      ],
      trap: T`Naprzeciw kąta $CAB$ (przy wierzchołku $A$) leży bok $BC$ – to on trafia do licznika sinusa, nie bok $AC$.`
    },
    {
      n: '18', pts: 1, t: 8, k: 'SC',
      q: T`Dany jest trójkąt $ABC$, w którym $|AB| = 5$, $|AC| = 2$ oraz $\cos |\sphericalangle BAC| = \frac{3}{5}$.` + '\n\n' + SC + T`Długość boku $BC$ tego trójkąta jest równa`,
      o: [T`$\sqrt{17}$`, T`$\sqrt{23}$`, T`$\sqrt{35}$`, T`$\sqrt{41}$`],
      a: 'A',
      s: [
        T`Twierdzenie cosinusów: $|BC|^2 = |AB|^2 + |AC|^2 - 2 \cdot |AB| \cdot |AC| \cdot \cos |\sphericalangle BAC|$.`,
        T`$|BC|^2 = 25 + 4 - 2 \cdot 5 \cdot 2 \cdot \frac{3}{5} = 29 - 12 = 17$.`,
        T`$|BC| = \sqrt{17}$.`
      ],
      trap: T`W twierdzeniu cosinusów iloczyn odejmujemy. Dodanie go daje $\sqrt{41}$, a pominięcie dwójki – $\sqrt{23}$.`,
      tip: T`Karta wzorów, str. 14: twierdzenie cosinusów $c^2 = a^2 + b^2 - 2ab\cos\gamma$.`
    },
    {
      n: '19', pts: 1, t: 9, k: 'SC',
      q: T`Punkty $K$, $L$ oraz $M$ leżą na okręgu o środku w punkcie $S$. Miara kąta $KSM$ jest równa $160^\circ$, a punkt $L$ leży na krótszym łuku $KM$ (zobacz rysunek).` + '\n\n' + SC + T`Miara kąta wpisanego $KLM$ jest równa`,
      fig: { diagram: geo({ pts: { S: [0, 0, 'l'], M: [0, 1, 't'], K: [0.342, -0.94, 'b'], L: [0.906, -0.423, 'r'] }, segs: ['MS', 'SK', 'ML', 'LK'], circles: [[0, 0, 1]], texts: [[0.3, 0.05, '160°']] }) },
      o: [T`$80^\circ$`, T`$90^\circ$`, T`$100^\circ$`, T`$110^\circ$`],
      a: 'C',
      s: [
        T`Kąt wpisany $KLM$ jest oparty na tym łuku $KM$, na którym NIE leży punkt $L$ – czyli na dłuższym łuku.`,
        T`Dłuższemu łukowi odpowiada kąt środkowy $360^\circ - 160^\circ = 200^\circ$.`,
        T`Kąt wpisany to połowa kąta środkowego opartego na tym samym łuku: $\frac{200^\circ}{2} = 100^\circ$.`
      ],
      trap: T`Odpowiedź $80^\circ$ (połowa $160^\circ$) byłaby poprawna, gdyby wierzchołek $L$ leżał na DŁUŻSZYM łuku. Tutaj leży na krótszym, więc kąt jest rozwarty.`,
      tip: T`Karta wzorów, str. 18: kąt wpisany jest połową kąta środkowego opartego na tym samym łuku.`
    },
    {
      n: '20', pts: 2, t: 9, k: 'OPEN',
      q: T`Podstawy trapezu prostokątnego $ABCD$ mają długości: $|AB| = 12$ oraz $|CD| = 6$. Wysokość $AD$ tego trapezu ma długość $24$. Na odcinku $AD$ leży punkt $E$ taki, że $|\sphericalangle BEA| = |\sphericalangle CED|$ (zobacz rysunek).` + '\n\n' + T`Oblicz długość odcinka $BE$. Zapisz obliczenia.`,
      fig: { diagram: geo({ pts: { A: [0, 0, 'bl'], B: [12, 0, 'br'], C: [6, 24, 'tr'], D: [0, 24, 'tl'], E: [0, 16, 'l'] }, segs: ['AB', 'BC', 'CD', 'DA', 'EB', 'EC'], height: 340 }) },
      a: T`$|BE| = 20$`,
      s: [
        T`Trójkąty $ABE$ i $DCE$ są prostokątne (kąty proste przy $A$ i $D$) i mają równe kąty ostre przy wierzchołku $E$, więc są podobne (cecha kąt–kąt).`,
        T`Oznaczmy $|AE| = x$, wtedy $|DE| = 24 - x$. Z podobieństwa: $\frac{|AB|}{|AE|} = \frac{|DC|}{|DE|}$, czyli $\frac{12}{x} = \frac{6}{24 - x}$.`,
        T`$12(24 - x) = 6x$, stąd $288 = 18x$ i $x = 16$.`,
        T`Z twierdzenia Pitagorasa w trójkącie $ABE$: $|BE| = \sqrt{12^2 + 16^2} = \sqrt{400} = 20$.`
      ],
      trap: T`W proporcji trzeba zestawić odpowiadające sobie boki: przyprostokątne leżące naprzeciw równych kątów ($AB$ z $DC$) oraz przyległe do nich ($AE$ z $DE$).`
    },
    {
      n: '21', pts: 4, t: 10, k: 'OPEN',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ przekątne równoległoboku $ABCD$ przecinają się w punkcie $S = (9, 11)$. Bok $AB$ tego równoległoboku zawiera się w prostej o równaniu $y = \frac{1}{2}x - 1$, a bok $AD$ zawiera się w prostej o równaniu $y = 2x - 4$.` + '\n\n' + T`Oblicz współrzędne wierzchołka $B$. Zapisz obliczenia.`,
      a: T`$B = (6, 2)$`,
      s: [
        T`Wierzchołek $A$ to punkt wspólny prostych $AB$ i $AD$: $\frac{1}{2}x - 1 = 2x - 4$, stąd $\frac{3}{2}x = 3$, $x = 2$, $y = 0$. Zatem $A = (2, 0)$.`,
        T`Punkt $S$ jest środkiem przekątnej $AC$: $C = (2 \cdot 9 - 2, 2 \cdot 11 - 0) = (16, 22)$.`,
        T`Bok $BC$ jest równoległy do boku $AD$, więc prosta $BC$ ma współczynnik kierunkowy $2$ i przechodzi przez $C$: $y = 2(x - 16) + 22 = 2x - 10$.`,
        T`Wierzchołek $B$ to punkt wspólny prostych $AB$ i $BC$: $\frac{1}{2}x - 1 = 2x - 10$, stąd $\frac{3}{2}x = 9$, $x = 6$, $y = 2$. Zatem $B = (6, 2)$.`
      ],
      trap: T`Punkt $S$ jest środkiem PRZEKĄTNYCH, a nie boków. Najpierw trzeba znaleźć $A$, potem $C$ jako obraz $A$ w symetrii względem $S$, i dopiero wtedy prostą $BC$.`,
      tip: T`Sprawdzenie: $D = 2S - B = (12, 20)$ powinien leżeć na prostej $AD$: $2 \cdot 12 - 4 = 20$ – zgadza się.`
    },
    {
      n: '22', pts: 1, t: 10, k: 'SC',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ proste $k$ oraz $l$ są określone równaniami` + '\n$$k\\colon\\ y = (3m - 2)x - 2$$\n$$l\\colon\\ y = (2m + 4)x + 2$$\n' + SC + T`Proste $k$ oraz $l$ są równoległe, gdy liczba $m$ jest równa`,
      o: ['$(-6)$', '$(-2)$', '$2$', '$6$'],
      a: 'D',
      s: [
        T`Proste są równoległe, gdy mają równe współczynniki kierunkowe: $3m - 2 = 2m + 4$.`,
        T`$m = 6$.`
      ],
      trap: T`Warunek równoległości to RÓWNOŚĆ współczynników kierunkowych. Iloczyn równy $-1$ dotyczy prostych prostopadłych.`,
      tip: T`Karta wzorów, str. 22: proste $y = a_1x + b_1$ i $y = a_2x + b_2$ są równoległe, gdy $a_1 = a_2$.`
    },
    {
      n: '23', pts: 1, t: 10, k: 'SC',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ odcinek o końcach $A = (-4, 7)$ oraz $B = (6, -1)$ jest średnicą okręgu $\mathcal{O}$.` + '\n\n' + SC + T`Okrąg $\mathcal{O}$ jest określony równaniem`,
      o: [T`$(x - 1)^2 + (y - 3)^2 = 41$`, T`$(x - 5)^2 + (y + 4)^2 = 41$`, T`$(x - 1)^2 + (y + 3)^2 = 41$`, T`$(x - 5)^2 + (y - 4)^2 = 41$`],
      a: 'A',
      s: [
        T`Środek okręgu to środek średnicy: $S = \left(\frac{-4 + 6}{2}, \frac{7 + (-1)}{2}\right) = (1, 3)$.`,
        T`Kwadrat promienia: $r^2 = |SA|^2 = (1 + 4)^2 + (3 - 7)^2 = 25 + 16 = 41$.`,
        T`Równanie okręgu: $(x - 1)^2 + (y - 3)^2 = 41$.`
      ],
      trap: T`Środek odcinka to POŁOWA SUMY współrzędnych, a nie połowa różnicy. Para $(5, -4)$ z odpowiedzi B to połowa różnicy.`,
      tip: T`Karta wzorów, str. 21 i 23: środek odcinka oraz równanie okręgu $(x - a)^2 + (y - b)^2 = r^2$.`
    },
    {
      n: '24', pts: 1, t: 11, k: 'SC',
      q: T`Liczba wszystkich ścian ostrosłupa prawidłowego jest równa $12$.` + '\n\n' + SC + T`Liczba wszystkich wierzchołków tego ostrosłupa jest równa`,
      o: ['$10$', '$11$', '$12$', '$13$'],
      a: 'C',
      s: [
        T`Ostrosłup ma jedną podstawę, więc ścian bocznych jest $12 - 1 = 11$. Podstawą jest jedenastokąt.`,
        T`Wierzchołki: $11$ w podstawie i $1$ wierzchołek ostrosłupa.`,
        T`Razem: $11 + 1 = 12$.`
      ],
      trap: T`W ostrosłupie liczba ścian jest równa liczbie wierzchołków ($n + 1$). Odpowiedź $11$ pomija wierzchołek „na górze”.`
    },
    {
      n: '25', pts: 1, t: 11, k: 'SC',
      q: T`Długości trzech wychodzących z jednego wierzchołka krawędzi prostopadłościanu są trzema kolejnymi liczbami naturalnymi parzystymi. Najdłuższa krawędź tego prostopadłościanu ma długość $10$.` + '\n\n' + SC + T`Pole powierzchni całkowitej tego prostopadłościanu jest równe`,
      o: ['$376$', '$466$', '$480$', '$720$'],
      a: 'A',
      s: [
        T`Trzy kolejne liczby parzyste, z których największa to $10$: $6$, $8$, $10$.`,
        T`$P_c = 2(6 \cdot 8 + 6 \cdot 10 + 8 \cdot 10) = 2(48 + 60 + 80) = 2 \cdot 188 = 376$.`
      ],
      trap: T`$480 = 6 \cdot 8 \cdot 10$ to OBJĘTOŚĆ, nie pole powierzchni. „Kolejne liczby parzyste” różnią się o $2$, a nie o $1$.`
    },
    {
      n: '26', pts: 1, t: 11, k: 'SC',
      q: T`Dany jest prostopadłościan $ABCDEFGH$, w którym podstawy $ABCD$ i $EFGH$ są kwadratami o boku długości $6$. Przekątna $BH$ tego prostopadłościanu tworzy z przekątną $AH$ ściany bocznej $ADHE$ kąt o mierze $30^\circ$.` + '\n\n' + SC + T`Przekątna $BH$ tego prostopadłościanu ma długość równą`,
      o: [T`$4\sqrt{3}$`, T`$6\sqrt{3}$`, '$12$', T`$12\sqrt{2}$`],
      a: 'C',
      s: [
        T`Krawędź $AB$ jest prostopadła do ściany $ADHE$, więc jest prostopadła do odcinka $AH$. Trójkąt $ABH$ jest prostokątny z kątem prostym przy wierzchołku $A$.`,
        T`W tym trójkącie kąt $AHB$ ma miarę $30^\circ$, a naprzeciw niego leży bok $AB$ o długości $6$.`,
        T`$\sin 30^\circ = \frac{|AB|}{|BH|}$, czyli $\frac{1}{2} = \frac{6}{|BH|}$, stąd $|BH| = 12$.`
      ],
      trap: T`Kąt prosty jest przy wierzchołku $A$ (a nie $H$), więc $BH$ jest PRZECIWPROSTOKĄTNĄ. Naprzeciw kąta $30^\circ$ leży bok dwa razy krótszy od przeciwprostokątnej.`
    },
    {
      n: '27', pts: 1, t: 12, k: 'SC',
      q: SC + T`Wszystkich liczb naturalnych dwucyfrowych, w których zapisie dziesiętnym cyfra dziesiątek jest o $3$ większa od cyfry jedności, jest`,
      o: ['$3$', '$6$', '$7$', '$13$'],
      a: 'C',
      s: [
        T`Cyfra dziesiątek to cyfra jedności plus $3$ i nie może przekroczyć $9$, więc cyfra jedności może być równa $0, 1, 2, 3, 4, 5, 6$.`,
        T`Odpowiadające liczby: $30, 41, 52, 63, 74, 85, 96$.`,
        T`Jest ich $7$.`
      ],
      trap: T`Cyfra jedności może być równa $0$ (liczba $30$). Pominięcie jej daje błędny wynik $6$.`
    },
    {
      n: '28', pts: 1, t: 14, k: 'SC',
      q: T`W tabeli zestawiono liczbę punktów uzyskanych przez $32$ uczniów pewnej klasy za rozwiązanie jednego z zadań testu z matematyki.` + '\n$$\\begin{array}{l|cccccc} \\text{Liczba punktów} & 0 & 1 & 2 & 3 & 4 & 5 \\\\ \\hline \\text{Liczba uczniów} & 2 & 2 & 5 & 6 & 11 & 6 \\end{array}$$\n' + SC + T`Średnia arytmetyczna liczby punktów uzyskanych za rozwiązanie tego zadania przez uczniów tej klasy jest równa`,
      o: ['$2{,}5$', '$3{,}25$', '$3{,}31$', '$4$'],
      a: 'B',
      s: [
        T`Suma punktów: $0 \cdot 2 + 1 \cdot 2 + 2 \cdot 5 + 3 \cdot 6 + 4 \cdot 11 + 5 \cdot 6 = 0 + 2 + 10 + 18 + 44 + 30 = 104$.`,
        T`Liczba uczniów: $32$.`,
        T`Średnia: $\frac{104}{32} = 3{,}25$.`
      ],
      trap: T`$2{,}5$ to średnia liczb $0$–$5$ bez uwzględnienia liczby uczniów, a $4$ to dominanta. Średnia ważona wymaga pomnożenia każdej wartości przez jej liczebność.`
    },
    {
      n: '29', pts: 2, t: 13, k: 'OPEN',
      q: T`Dane są dwa zbiory: $C = \{0, 4, 5, 7, 9\}$ oraz $D = \{1, 2, 3\}$. Losujemy jedną liczbę ze zbioru $C$, a następnie losujemy jedną liczbę ze zbioru $D$.` + '\n\n' + T`Oblicz prawdopodobieństwo zdarzenia $A$ polegającego na tym, że suma wylosowanych liczb będzie większa od $9$. Zapisz obliczenia.`,
      a: T`$P(A) = \frac{4}{15}$`,
      s: [
        T`Liczba wszystkich par: $|\Omega| = 5 \cdot 3 = 15$.`,
        T`Pary o sumie większej od $9$: $(7, 3)$, $(9, 1)$, $(9, 2)$, $(9, 3)$. Zatem $|A| = 4$.`,
        T`$P(A) = \frac{4}{15}$.`
      ],
      trap: T`Suma ma być WIĘKSZA od $9$, więc pary o sumie równej $9$ (np. $(7, 2)$) się nie liczą.`
    },
    {
      n: '30', pts: 3, t: 15, k: 'OPEN',
      q: T`Suma dwóch nieujemnych liczb rzeczywistych $x$ oraz $y$ jest równa $12$.` + '\n\n' + T`Wyznacz $x$ oraz $y$, dla których wartość wyrażenia $2x^2 + y^2$ jest najmniejsza. Oblicz tę najmniejszą wartość. Zapisz obliczenia.`,
      a: T`$x = 4$, $y = 8$; najmniejsza wartość wyrażenia jest równa $96$.`,
      s: [
        T`Z warunku $x + y = 12$ mamy $y = 12 - x$. Liczby są nieujemne, więc $x \in \langle 0, 12 \rangle$.`,
        T`$f(x) = 2x^2 + (12 - x)^2 = 2x^2 + 144 - 24x + x^2 = 3x^2 - 24x + 144$.`,
        T`Ramiona paraboli są skierowane w górę, więc wartość najmniejsza jest w wierzchołku: $x = \frac{24}{2 \cdot 3} = 4$. Liczba ta należy do dziedziny.`,
        T`$y = 12 - 4 = 8$, a najmniejsza wartość to $f(4) = 2 \cdot 16 + 64 = 96$.`
      ],
      trap: T`Najmniejsza wartość NIE wypada dla $x = y = 6$ – współczynnik $2$ przy $x^2$ przesuwa optimum. Trzeba policzyć wierzchołek, a nie zgadywać.`,
      tip: T`Karta wzorów, str. 8: pierwsza współrzędna wierzchołka paraboli $p = -\frac{b}{2a}$.`
    }
  ]
};
