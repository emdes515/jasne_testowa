'use strict';

const fs = require('fs');
const path = require('path');

const updatedConceptEssence = {
  'lesson-1-1': "• **Przedziały otwarte $(a, b)$:** wykluczają punkty brzegowe ze zbioru (nierówności ostre $a < x < b$). Na osi liczbowej oznaczamy je kółkami otwartymi (niezamalowanymi).\n\n• **Przedziały domknięte $\\langle a, b \\rangle$:** włączają punkty brzegowe do zbioru (nierówności słabe $a \\le x \\le b$). Na osi oznaczamy je kółkami pełnymi (zamalowanymi).\n\n• **Iloczyn (część wspólna) $A \\cap B$:** zawiera wyłącznie liczby należące jednocześnie do obu przedziałów.\n\n• **Suma przedziałów $A \\cup B$:** zawiera wszystkie liczby należące do co najmniej jednego z przedziałów.",

  'lesson-1-2': "• **Liczby wymierne $\\mathbb{Q}$:** liczby dające się zapisać w postaci ułamka zwykłego $\\frac{m}{n}$, gdzie $m \\in \\mathbb{Z}$ oraz $n \\in \\mathbb{N}^+$. Mają rozwinięcie dziesiętne skończone lub nieskończone okresowe.\n\n• **Liczby niewymierne:** liczby o rozwinięciu dziesiętnym nieskończonym i nieokresowym (np. $\\sqrt{2}, \\sqrt{3}, \\pi$). Nie można ich zapisać jako ilorazu liczb całkowitych.\n\n• **Zamiana ułamka okresowego:** mnożymy równanie przez odpowiednią potęgę liczby $10$ i odejmujemy stronami, aby zredukować powtarzający się okres.",

  'lesson-1-3': "• **Wspólny mianownik:** dodawanie i odejmowanie ułamków zwykłych wymaga sprowadzenia ich do wspólnego mianownika (najlepiej NWW mianowników).\n\n• **Rozszerzanie ułamka:** mnożymy licznik i mianownik przez tę samą liczbę różną od zera: $\\frac{a}{b} = \\frac{a \\cdot k}{b \\cdot k}$.\n\n• **Działania na liczbach mieszanych:** przed odejmowaniem ułamków warto zamienić całości na ułamki niewłaściwe, aby uniknąć błędów przy zapożyczaniu jedności.",

  'lesson-1-4': "• **Mnożenie ułamków:** mnożymy licznik przez licznik oraz mianownik przez mianownik. Zawsze skracamy ułamki przed wykonaniem mnożenia.\n\n• **Dzielenie ułamków:** dzielenie przez ułamek zastępujemy mnożeniem przez jego odwrotność: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$.\n\n• **Kolejność działań:** najpierw działania w nawiasach, następnie potęgowanie i pierwiastkowanie, mnożenie i dzielenie, a na końcu dodawanie i odejmowanie.",

  'lesson-1-5': "• **Mnożnik podwyżki o $p\\%$:** nową wartość otrzymujemy mnożąc cenę początkową przez czynnik $\\left(1 + \\frac{p}{100}\\right)$.\n\n• **Mnożnik obniżki o $p\\%$:** nową wartość otrzymujemy mnożąc cenę początkową przez czynnik $\\left(1 - \\frac{p}{100}\\right)$.\n\n• **Wielokrotne zmiany cen:** kolejne mnożniki mnożymy przez siebie (np. dwie kolejne obniżki o $10\\%$ to mnożnik $0{,}90 \\cdot 0{,}90 = 0{,}81$, czyli łączna obniżka o $19\\%$, a NIE o $20\\%$).",

  'lesson-1-6': "• **Błąd bezwzględny $\\Delta$:** moduł różnicy między wartością dokładną $x$ a przybliżoną $x_0$: $\\Delta = |x - x_0|$.\n\n• **Błąd względny $\\delta$:** stosunek błędu bezwzględnego do modułu wartości dokładnej: $\\delta = \\frac{|x - x_0|}{|x|} \\cdot 100\\%$.\n\n• **Punkty procentowe (p.p.):** bezwzględna różnica między dwiema wielkościami podanymi w procentach ($p_2 - p_1$). Procentowa zmiana stopy to zmiana względna.",

  'lesson-1-7': "• **Prawa potęg o wspólnej podstawie:** przy mnożeniu wykładniki dodajemy ($a^x \\cdot a^y = a^{x+y}$), przy dzieleniu odejmujemy ($a^x : a^y = a^{x-y}$), a przy potęgowaniu potęgi mnożymy ($(a^x)^y = a^{x \\cdot y}$).\n\n• **Strategia sprowadzania bazy:** w zadaniach CKE wszystkie liczby sprowadzamy do najmniejszej wspólnej podstawy pierwszej ($2, 3, 5, 7$).\n\n• **Kategoryczna reguła:** podstawa potęgi pozostaje nienaruszona! Nigdy nie mnóż podstaw: $2^3 \\cdot 2^5 = 2^8$, a nie $4^8$.",

  'lesson-1-8': "• **Wykładnik ujemny:** minus w wykładniku odwraca podstawę potęgi do jej odwrotności: $a^{-n} = \\frac{1}{a^n}$ oraz $\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n$.\n\n• **Minus przed liczbą a w wykładniku:** znak minus w wykładniku NIE zmienia znaku samej liczby na ujemny: $2^{-3} = \\frac{1}{8} > 0$.\n\n• **Potęga o wykładniku zero:** dla każdej liczby $a \\neq 0$ zachodzi tożsamość $a^0 = 1$.",

  'lesson-1-9': "• **Potęga o wykładniku ułamkowym:** mianownik ułamka $n$ określa stopień pierwiastka, a licznik $m$ potęgę: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$ dla $a > 0$.\n\n• **Kolejność obliczeń:** zawsze najpierw wyciągaj pierwiastek, a dopiero potem podnoś wynik do potęgi: $16^{\\frac{3}{4}} = (\\sqrt[4]{16})^3 = 2^3 = 8$ (zamiast $\\sqrt[4]{16^3} = \\sqrt[4]{4096}$).\n\n• **Prawa działań:** na potęgach o wykładnikach ułamkowych obowiązują te same reguły działań (dodawanie i odejmowanie wykładników) co na potęgach całkowitych.",

  'lesson-1-10': "• **Mnożenie i dzielenie pierwiastków:** pierwiastki tego samego stopnia mnożymy i dzielimy pod wspólnym znakiem: $\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{a \\cdot b}$ oraz $\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\frac{a}{b}}$.\n\n• **Wyłączanie czynnika:** liczbę podpierwiastkową rozkładamy na iloczyn, w którym jeden z czynników jest potęgą stopnia pierwiastka: $\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}$.\n\n• **Dodawanie pierwiastków:** dodawać i odejmować można tylko pierwiastki tego samego stopnia o tej samej liczbie podpierwiastkowej. Pamiętaj: $\\sqrt{a} + \\sqrt{b} \\neq \\sqrt{a+b}$!",

  'lesson-1-11': "• **Pojedynczy pierwiastek w mianowniku:** mnożymy licznik i mianownik przez ten sam pierwiastek: $\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$.\n\n• **Suma lub różnica z pierwiastkiem:** stosujemy sprzężenie ze wzoru na różnicę kwadratów $(x-y)(x+y) = x^2 - y^2$.\n\n• **Zasada sprzężenia:** dla mianownika $\\sqrt{a} - b$ mnożymy przez $\\sqrt{a} + b$, otrzymując w mianowniku $(\\sqrt{a})^2 - b^2 = a - b^2$.",

  'lesson-1-12': "• **Kwadrat sumy i różnicy:** $(a + b)^2 = a^2 + 2ab + b^2$ oraz $(a - b)^2 = a^2 - 2ab + b^2$. Nigdy nie pomijaj podwojonego iloczynu $2ab$!\n\n• **Różnica kwadratów:** $a^2 - b^2 = (a - b)(a + b)$. Wzór ten pozwala na błyskawiczne zwijanie i rozwijanie iloczynów sprzężonych.\n\n• **Dowodzenie nierówności:** większość dowodów na maturze podstawowej sprowadza się do zwinięcia wyrażenia do postaci $(a - b)^2 \\ge 0$, co jako kwadrat liczby rzeczywistej jest zawsze prawdą.",

  'lesson-1-13': "• **Definicja logarytmu:** $\\log_a b = c$ oznacza dokładnie to samo co $a^c = b$. Logarytm to wykładnik potęgi, do której należy podnieść podstawę $a$, aby otrzymać liczbę $b$.\n\n• **Założenia (dziedzina):** podstawa musi być dodatnia i różna od jedynki ($a > 0, a \\neq 1$), a liczba logarytmowana musi być ściśle dodatnia ($b > 0$).\n\n• **Podstawowe tożsamości:** $\\log_a 1 = 0$ (bo $a^0 = 1$), $\\log_a a = 1$ (bo $a^1 = a$) oraz $a^{\\log_a b} = b$.",

  'lesson-1-14': "• **Suma logarytmów (o tej samej podstawie):** zamienia się w logarytm iloczynu: $\\log_a x + \\log_a y = \\log_a (x \\cdot y)$.\n\n• **Różnica logarytmów:** zamienia się w logarytm ilorazu: $\\log_a x - \\log_a y = \\log_a \\left(\\frac{x}{y}\\right)$.\n\n• **Współczynnik przed logarytmem:** wciągamy jako wykładnik potęgi liczby logarytmowanej: $k \\cdot \\log_a x = \\log_a (x^k)$. Zawsze wykonaj tę operację przed dodawaniem lub odejmowaniem logarytmów!",

  'lesson-1-15': "• **Definicja wartości bezwzględnej:** $|x| = x$ dla $x \\ge 0$ oraz $|x| = -x$ dla $x < 0$. Wartość bezwzględna z dowolnej liczby jest zawsze nieujemna.\n\n• **Pierwiastek z kwadratu:** tożsamość kluczowa CKE: $\\sqrt{x^2} = |x|$. Nigdy nie opuszczaj wartości bezwzględnej, jeśli nie znasz znaku liczby $x$!\n\n• **Interpretacja na osi:** nierówność $|x - a| \\le r$ oznacza przedział liczb, których odległość od środka $a$ jest nie większa niż promień $r$: $x \\in \\langle a - r, a + r \\rangle$."
};

const targetPaths = [
  path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json'),
  'c:/Users/mateu/Downloads/mat/curriculum_dzial_1.json',
  'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json'
];

targetPaths.forEach(targetPath => {
  if (!fs.existsSync(targetPath)) return;
  const data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  let lessons = [];
  if (data.topics && data.topics[0] && data.topics[0].lessons) {
    lessons = data.topics[0].lessons;
  } else if (data.topic && data.topic.lessons) {
    lessons = data.topic.lessons;
  }

  let count = 0;
  lessons.forEach(lesson => {
    if (updatedConceptEssence[lesson.id]) {
      if (!lesson.theory_pill) lesson.theory_pill = {};
      lesson.theory_pill.concept_essence = updatedConceptEssence[lesson.id];
      count++;
    }
  });

  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${count} lessons in ${targetPath}`);
});

console.log('Finished standardizing concept_essence across JSON files.');
