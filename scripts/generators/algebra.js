import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { finalizeSingleChoiceTask, formatSigned, formatFraction, makeOptions } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateAlgebra() {
  const allTasks = [];

  // ARCH-01: Potęgi i pierwiastki (57 zadań)
  const arch01Path = path.join(__dirname, '../../src/data/math/generated/arch01_complete_57.json');
  let arch01Tasks = JSON.parse(fs.readFileSync(arch01Path, 'utf8'));

  // Ensure all ARCH-01 tasks have clean math and step-by-step structure
  arch01Tasks = arch01Tasks.map((task, idx) => {
    // Fix division by zero if present
    task.options = task.options.map(opt => opt.replace(/\\frac\{8\}\{0\}/g, '\\frac{8}{8}'));
    
    // Ensure explanation has step-by-step markers
    if (!task.explanation.includes('Krok 1:')) {
      task.explanation = `**Krok 1:** Identyfikujemy własność potęg z oficjalnych tablic (Tablice CKE str. 3: $a^r \\cdot a^s = a^{r+s}$ lub $(a^r)^s = a^{r \\cdot s}$).\n\n**Krok 2:** Wykonujemy działania na wykładnikach potęg:\n${task.explanation.split('\n\n**Pułapka CKE:**')[0]}\n\n**Krok 3:** Wyznaczamy ostateczną postać potęgi i porównujemy z odpowiedziami.\n\n**Pułapka CKE:** ${task.explanation.includes('**Pułapka CKE:**') ? task.explanation.split('**Pułapka CKE:**')[1].split('\n')[0].trim() : 'Uważaj na mylenie dodawania wykładników z ich mnożeniem.'}`;
    }

    return finalizeSingleChoiceTask(task, 1000 + idx);
  });

  allTasks.push(...arch01Tasks);

  // ARCH-02: Logarytmy (54 zadania)
  let arch02Index = 1;

  // 1. Różnica logarytmów (18 zadań)
  for (let i = 0; i < 18; i++) {
    const base = [2, 3, 5, 6, 7, 10][i % 6];
    const exp = 2 + (i % 3); // 2, 3, 4
    const resVal = Math.pow(base, exp);
    const div = [2, 3, 4, 5][i % 4];
    const top = resVal * div;
    const taskNum = String(arch02Index++).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch02_${taskNum}`,
      archetypeCode: "ARCH-02",
      category: "Liczby i wyrażenia",
      title: "Różnica logarytmów o tej samej podstawie",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nLiczba $\\log_{${base}} ${top} - \\log_{${base}} ${div}$ jest równa`,
      options: [
        `$${exp}$`,
        `$\\log_{${base}} ${top - div}$`,
        `$${resVal}$`,
        `$${exp + 1}$`
      ],
      explanation: `**Krok 1:** Przywołujemy wzór na różnicę logarytmów o tej samej podstawie (Wybrane wzory matematyczne CKE str. 4):\n$$\\log_a x - \\log_a y = \\log_a \\left(\\frac{x}{y}\\right)$$\n\n**Krok 2:** Stosujemy wzór dla podstawy $a = ${base}$:\n$$\\log_{${base}} ${top} - \\log_{${base}} ${div} = \\log_{${base}} \\left(\\frac{${top}}{${div}}\\right) = \\log_{${base}} ${resVal}$$\n\n**Krok 3:** Wyznaczamy wartość logarytmu z definicji ($${base}^c = ${resVal} \\implies c = ${exp}$):\n$$\\log_{${base}} ${resVal} = ${exp}$$\n\n**Pułapka CKE:** Powszechny błąd polega na odejmowaniu liczb logarytmowanych: $\\log_{${base}}(${top} - ${div}) = \\log_{${base}} ${top - div}$. Pamiętaj, że odejmowanie logarytmów zamienia się na dzielenie!`,
      matura_tip: "Tablice CKE str. 4: Różnica logarytmów zamienia się w logarytm ilorazu (dzielenie wnętrz)."
    };
    allTasks.push(finalizeSingleChoiceTask(task, 2000 + arch02Index));
  }

  // 2. Suma logarytmów (18 zadań)
  for (let i = 0; i < 18; i++) {
    const base = [2, 3, 4, 5, 6, 10][i % 6];
    const exp = 2 + (i % 2); // 2 lub 3
    const total = Math.pow(base, exp);
    let factor1 = 2;
    if (total % 3 === 0 && (i % 2 === 1)) factor1 = 3;
    if (total % 4 === 0 && (i % 3 === 0)) factor1 = 4;
    if (total % 5 === 0) factor1 = 5;
    const factor2 = total / factor1;
    const taskNum = String(arch02Index++).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch02_${taskNum}`,
      archetypeCode: "ARCH-02",
      category: "Liczby i wyrażenia",
      title: "Suma logarytmów o tej samej podstawie",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nLiczba $\\log_{${base}} ${factor1} + \\log_{${base}} ${factor2}$ jest równa`,
      options: makeOptions(`$${exp}$`, [
        `$\\log_{${base}} ${factor1 + factor2}$`,
        `$${total}$`,
        `$${exp + 1}$`,
        `$${exp + 2}$`,
        `$${exp - 1}$`
      ]),
      explanation: `**Krok 1:** Korzystamy ze wzoru na sumę logarytmów o tej samej podstawie (Tablice CKE str. 4):\n$$\\log_a x + \\log_a y = \\log_a (x \\cdot y)$$\n\n**Krok 2:** Zastępujemy sumę logarytmem iloczynu:\n$$\\log_{${base}} ${factor1} + \\log_{${base}} ${factor2} = \\log_{${base}} (${factor1} \\cdot ${factor2}) = \\log_{${base}} ${total}$$\n\n**Krok 3:** Obliczamy wartość logarytmu, korzystając z faktu, że $${base}^{${exp}} = ${total}$:\n$$\\log_{${base}} ${total} = ${exp}$$\n\n**Pułapka CKE:** Nie dodawaj liczb wewnątrz logarytmów ($${factor1} + ${factor2} = ${factor1 + factor2}$). Dodawanie logarytmów oznacza mnożenie ich wnętrz!`,
      matura_tip: "Dodawanie logarytmów to mnożenie liczb logarytmowanych: $\\log x + \\log y = \\log(x \\cdot y)$."
    };
    allTasks.push(finalizeSingleChoiceTask(task, 2000 + arch02Index));
  }

  // 3. Własności potęgi w logarytmie i podstawa ułamkowa (18 zadań -> łącznie 54)
  for (let i = 0; i < 18; i++) {
    const isFractional = (i % 2 === 1);
    const taskNum = String(arch02Index++).padStart(3, '0');

    if (isFractional) {
      const b = [2, 3, 4, 5][i % 4];
      const exp = 2 + (i % 3);
      const val = Math.pow(b, exp);

      const task = {
        id: `task_math_form23_arch02_${taskNum}`,
        archetypeCode: "ARCH-02",
        category: "Liczby i wyrażenia",
        title: "Logarytm o podstawie ułamkowej",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nLiczba $\\log_{\\frac{1}{${b}}} ${val}$ jest równa`,
        options: [
          `$-${exp}$`,
          `$${exp}$`,
          `$-\\frac{1}{${exp}}$`,
          `$\\frac{1}{${val}}$`
        ],
        explanation: `**Krok 1:** Przywołujemy definicję logarytmu $\\log_a b = c \\iff a^c = b$.\n\n**Krok 2:** Podstawiamy podstawę $a = \\frac{1}{${b}} = ${b}^{-1}$ oraz liczbę logarytmowaną $b = ${val} = ${b}^{${exp}}$:\n$$\\left(\\frac{1}{${b}}\\right)^c = ${val} \\implies (${b}^{-1})^c = ${b}^{${exp}} \\implies ${b}^{-c} = ${b}^{${exp}}$$\n\n**Krok 3:** Przyrównujemy wykładniki:\n$$-c = ${exp} \\implies c = -${exp}$$\n\n**Pułapka CKE:** Ułamek właściwy $\\frac{1}{b}$ w podstawie zawsze generuje minus w wykładniku potęgi.`,
        matura_tip: "Tablice CKE str. 4: $\\log_{1/a} (a^k) = -k$."
      };
      allTasks.push(finalizeSingleChoiceTask(task, 2000 + arch02Index));
    } else {
      const base = [2, 3, 5, 10][i % 4];
      const inner = [3, 4, 5, 6][i % 4];

      const task = {
        id: `task_math_form23_arch02_${taskNum}`,
        archetypeCode: "ARCH-02",
        category: "Liczby i wyrażenia",
        title: "Własności potęgi w liczbie logarytmowanej",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nLiczba $2\\log_{${base}} ${base * 2} - \\log_{${base}} 4$ jest równa`,
        options: makeOptions(`$2$`, [
          `$\\log_{${base}} ${base * 4}$`,
          `$${base === 2 ? 3 : base}$`,
          `$1$`,
          `$4$`
        ]),
        explanation: `**Krok 1:** Korzystamy ze wzoru na wciąganie współczynnika do potęgi: $k \\cdot \\log_a x = \\log_a (x^k)$:\n$$2\\log_{${base}} ${base * 2} = \\log_{${base}} (${base * 2})^2 = \\log_{${base}} (${base * base * 4})$$\n\n**Krok 2:** Stosujemy wzór na różnicę logarytmów:\n$$\\log_{${base}} (${base * base * 4}) - \\log_{${base}} 4 = \\log_{${base}} \\left(\\frac{${base * base * 4}}{4}\\right) = \\log_{${base}} (${base}^2)$$\n\n**Krok 3:** Obliczamy wynik:\n$$\\log_{${base}} (${base}^2) = 2$$\n\n**Pułapka CKE:** Współczynnik stojący przed logarytmem musi być najpierw włączony pod wykładnik potęgi, zanim wykonasz odejmowanie logarytmów!`,
        matura_tip: "Tablice CKE str. 4: $k \\cdot \\log_a x = \\log_a (x^k)$."
      };
      allTasks.push(finalizeSingleChoiceTask(task, 2000 + arch02Index));
    }
  }

  // ARCH-03: Nierówności liniowe z wartością bezwzględną (48 zadań)
  for (let i = 1; i <= 48; i++) {
    // Avoid a = 0 to eliminate any degenerate formatting
    const aVals = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    const a = aVals[i % aVals.length];
    const b = 2 + (i % 5); // 2, 3, 4, 5, 6
    const isLeq = (i % 2 === 1);
    const left = a - b;
    const right = a + b;
    const opSym = isLeq ? "\\le" : "\\ge";
    const intervalStr = isLeq ? `\\langle ${left}, ${right} \\rangle` : `(-\\infty, ${left}\\rangle \\cup \\langle ${right}, +\\infty)`;
    const wrongIntervalStr = isLeq ? `(-\\infty, ${left}\\rangle \\cup \\langle ${right}, +\\infty)` : `\\langle ${left}, ${right} \\rangle`;
    
    // Clean formatting for |x - a|
    const insideAbs = a > 0 ? `x - ${a}` : `x + ${Math.abs(a)}`;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch03_${taskNum}`,
      archetypeCode: "ARCH-03",
      category: "Równania i nierówności",
      title: "Nierówność z wartością bezwzględną",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nZbiorem wszystkich rozwiązań nierówności $|${insideAbs}| ${opSym} ${b}$ jest przedział`,
      options: [
        `$${intervalStr}$`,
        `$${wrongIntervalStr}$`,
        `$\\langle -${b}, ${b} \\rangle$`,
        `$(-\\infty, -${b}\\rangle \\cup \\langle ${b}, +\\infty)$`
      ],
      explanation: `**Krok 1:** Korzystamy z interpretacji geometrycznej wartości bezwzględnej: $|x - a|$ to odległość liczby $x$ od punktu $a$ na osi liczbowej.\nDla wyrażenia $|${insideAbs}|$ punktem centralnym jest $a = ${a}$, a maksymalną odległością jest $r = ${b}$.\n\n**Krok 2:** Wyznaczamy punkty brzegowe oddalone o $r = ${b}$ od punktu $a = ${a}$:\n$$\\text{Lewy koniec: } ${a} - ${b} = ${left}$$\n$$\\text{Prawy koniec: } ${a} + ${b} = ${right}$$\n\n**Krok 3:** Ponieważ nierówność zawiera znak $${opSym}$, szukamy liczb oddalonych o ${isLeq ? `co najwyżej ${b}` : `co najmniej ${b}`} od punktu ${a}.\nZbiorem rozwiązań jest przedział $${intervalStr}$.\n\n**Pułapka CKE:** Pamiętaj, że we wzorze $|x - a|$ minus jest częścią reguły. Zatem $|x + 3| = |x - (-3)|$, więc środkiem jest $-3$, a nie $+3$!`,
      matura_tip: "Mnemotechnika osi: $|x - a| \\le r$ to przedział wewnętrzny $\\langle a-r, a+r \\rangle$, a $|x - a| \\ge r$ to suma dwóch przedziałów zewnętrznych."
    };
    allTasks.push(finalizeSingleChoiceTask(task, 3000 + i));
  }

  // ARCH-04: Obliczenia procentowe (29 zadań)
  for (let i = 1; i <= 29; i++) {
    const p1 = [10, 20, 25, 30][i % 4];
    const p2 = [10, 20, 30][(i + 1) % 3];
    const initPrice = [100, 200, 300, 400, 500][i % 5];
    const priceAfter1 = initPrice * (1 - p1 / 100);
    const finalPrice = Math.round(priceAfter1 * (1 - p2 / 100) * 10) / 10;
    const naivePrice = initPrice * (1 - (p1 + p2) / 100);
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch04_${taskNum}`,
      archetypeCode: "ARCH-04",
      category: "Liczby i wyrażenia",
      title: "Wielokrotna obniżka procentowa",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nCena towaru wynosiła $${initPrice}$ zł. Cenę tę obniżono najpierw o $${p1}\\%$, a następnie nową cenę obniżono o kolejne $${p2}\\%$. Po obu tych obniżkach cena towaru wynosi`,
      options: makeOptions(`$${finalPrice}$ zł`, [
        `$${naivePrice}$ zł`,
        `$${priceAfter1}$ zł`,
        `$${finalPrice + 25}$ zł`,
        `$${finalPrice - 15}$ zł`,
        `$${initPrice}$ zł`
      ]),
      explanation: `**Krok 1:** Obliczamy cenę towaru po pierwszej obniżce o $${p1}\\%$:\n$$C_1 = ${initPrice} \\cdot \\left(1 - \\frac{${p1}}{100}\\right) = ${initPrice} \\cdot ${1 - p1/100} = ${priceAfter1}\\text{ zł}$$\n\n**Krok 2:** Obliczamy cenę końcową po drugiej obniżce o $${p2}\\%$ (od kwoty $${priceAfter1}$ zł):\n$$C_2 = ${priceAfter1} \\cdot \\left(1 - \\frac{${p2}}{100}\\right) = ${priceAfter1} \\cdot ${1 - p2/100} = ${finalPrice}\\text{ zł}$$\n\n**Krok 3:** Porównujemy otrzymany wynik $${finalPrice}$ zł z odpowiedziami w zadaniu.\n\n**Pułapka CKE:** Nigdy nie dodawaj procentów kolejnych obniżek ($${p1}\\% + ${p2}\\% = ${p1 + p2}\\%$)! Druga obniżka dotyczy kwoty już obniżonej, a nie pierwotnej.`,
      matura_tip: "Złota zasada CKE: Przy kolejnych zmianach cen mnożysz mnożniki: $K_{końcowe} = K_{początkowe} \\cdot (1 - p_1) \\cdot (1 - p_2)$."
    };
    allTasks.push(finalizeSingleChoiceTask(task, 4000 + i));
  }

  // ARCH-05: Błąd bezwzględny i względny (14 zadań)
  for (let i = 1; i <= 14; i++) {
    const trueVal = [20, 25, 40, 50, 80][i % 5];
    const delta = [1, 2, 4][i % 3];
    const approx = trueVal + delta;
    const absErr = delta;
    const relErr = (absErr / trueVal) * 100;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch05_${taskNum}`,
      archetypeCode: "ARCH-05",
      category: "Liczby i wyrażenia",
      title: "Błąd względny przybliżenia",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nLiczba $${approx}$ jest przybliżeniem z nadmiarem liczby dokładnej $${trueVal}$. Błąd względny tego przybliżenia jest równy`,
      options: makeOptions(`$${relErr}\\%$`, [
        `$${absErr}\\%$`,
        `$${(absErr / approx * 100).toFixed(1)}\\%$`,
        `$${relErr * 2}\\%$`,
        `$${relErr + 5}\\%$`
      ]),
      explanation: `**Krok 1:** Wyznaczamy błąd bezwzględny przybliżenia ze wzoru $\\Delta = |x - a|$, gdzie $x = ${trueVal}$ to wartość dokładna, a $a = ${approx}$ to wartość przybliżona:\n$$\\Delta = |${trueVal} - ${approx}| = |-${delta}| = ${absErr}$$\n\n**Krok 2:** Stosujemy wzór na błąd względny przybliżenia (Tablice CKE str. 2):\n$$\\delta = \\frac{\\Delta}{x} \\cdot 100\\% = \\frac{${absErr}}{${trueVal}} \\cdot 100\\%$$\n\n**Krok 3:** Wykonujemy obliczenia arytmetyczne:\n$$\\delta = ${absErr / trueVal} \\cdot 100\\% = ${relErr}\\%$$\n\n**Pułapka CKE:** W mianowniku wzoru na błąd względny ZAWSZE stawiamy wartość dokładną ($${trueVal}$), a nie wartość przybliżoną ($${approx}$).`,
      matura_tip: "Tablice CKE str. 2: Błąd względny to $\\frac{|x - a|}{x} \\cdot 100\\%$. W mianowniku zawsze stoi liczba dokładna $x$!"
    };
    allTasks.push(finalizeSingleChoiceTask(task, 5000 + i));
  }

  // ARCH-06: Wzory skróconego mnożenia drugiego stopnia (46 zadań)
  for (let i = 1; i <= 46; i++) {
    const b = 2 + (i % 6);
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch06_${taskNum}`,
      archetypeCode: "ARCH-06",
      category: "Liczby i wyrażenia",
      title: "Różnica kwadratów wyrażeń algebraicznych",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nDla każdej liczby rzeczywistej $x$ wyrażenie $(x + ${b})^2 - (x - ${b})^2$ jest równe`,
      options: [
        `$${4 * b}x$`,
        `$0$`,
        `$2x^2 + ${2 * b * b}$`,
        `$${2 * b}x$`
      ],
      explanation: `**Krok 1:** Rozpisujemy oba nawiasy za pomocą wzorów skróconego mnożenia (Tablice CKE str. 3):\n$$(x + ${b})^2 = x^2 + 2 \\cdot x \\cdot ${b} + ${b}^2 = x^2 + ${2*b}x + ${b*b}$$\n$$(x - ${b})^2 = x^2 - 2 \\cdot x \\cdot ${b} + ${b}^2 = x^2 - ${2*b}x + ${b*b}$$\n\n**Krok 2:** Odejmujemy wyrażenia, pamiętając o zmianie znaków w całym drugim nawiasie:\n$$(x + ${b})^2 - (x - ${b})^2 = (x^2 + ${2*b}x + ${b*b}) - (x^2 - ${2*b}x + ${b*b})$$\n$$= x^2 + ${2*b}x + ${b*b} - x^2 + ${2*b}x - ${b*b}$$\n\n**Krok 3:** Redukujemy wyrazy podobne:\n$$x^2 - x^2 + ${2*b}x + ${2*b}x + ${b*b} - ${b*b} = ${4*b}x$$\n\n**Pułapka CKE:** Minus przed nawiasem zmienia znak każdego składnika wewnątrz: $-(-${2*b}x) = +${2*b}x$, dlatego wyrazy z $x$ dodają się, dając $${4*b}x$.`,
      matura_tip: "Zawsze stawiaj nawias po minusie, gdy odejmujesz rozwinięcie kwadratu sumy lub różnicy!"
    };
    allTasks.push(finalizeSingleChoiceTask(task, 6000 + i));
  }

  // ARCH-07: Równania wymierne z uwzględnieniem dziedziny (48 zadań)
  for (let i = 1; i <= 48; i++) {
    const r1 = 1 + (i % 6);
    const r2 = -(2 + (i % 5));
    const isFiltered = (i % 2 === 0);
    const excluded = isFiltered ? r1 : 7;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch07_${taskNum}`,
      archetypeCode: "ARCH-07",
      category: "Równania i nierówności",
      title: "Równanie wymierne z dziedziną",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nLiczba wszystkich rozwiązań rzeczywistych równania $\\frac{(x - ${r1})(x + ${Math.abs(r2)})}{x - ${excluded}} = 0$ jest równa`,
      options: [
        `$${isFiltered ? 1 : 2}$`,
        `$${isFiltered ? 2 : 1}$`,
        `$0$`,
        `$3$`
      ],
      explanation: `**Krok 1:** Wyznaczamy dziedzinę równania wymiernego (mianownik musi być różny od zera):\n$$x - ${excluded} \\neq 0 \\implies x \\neq ${excluded} \\implies D = \\mathbb{R} \\setminus \\{${excluded}\\}$$\n\n**Krok 2:** Przyrównujemy licznik ułamka do zera:\n$$(x - ${r1})(x + ${Math.abs(r2)}) = 0 \\implies x = ${r1} \\quad \\text{lub} \\quad x = ${r2}$$\n\n**Krok 3:** Sprawdzamy przynależność otrzymanych liczb do dziedziny $D$:\n${isFiltered ? `- Dla $x = ${r1}$: liczba ta NIE należy do dziedziny ($x \\neq ${excluded}$), więc odrzucamy ten pierwiastek.\n- Dla $x = ${r2}$: należy do dziedziny ($${r2} \\in D$).\nRównanie posiada dokładnie 1 rozwiązanie rzeczywiste: $x = ${r2}$.` : `- Zarówno $x = ${r1} \\in D$, jak i $x = ${r2} \\in D$.\nRównanie posiada dokładnie 2 rozwiązania rzeczywiste.`}\n\n**Pułapka CKE:** Pospieszne policzenie pierwiastków licznika bez sprawdzenia mianownika to pułapka nr 1 na maturze! Zawsze konfrontuj kandydatów z dziedziną.`,
      matura_tip: "Złota reguła CKE przy równaniach wymiernych: ZAWSZE zacznij od wyznaczenia dziedziny!"
    };
    allTasks.push(finalizeSingleChoiceTask(task, 7000 + i));
  }

  // ARCH-08: Nierówności kwadratowe (54 zadania)
  for (let i = 1; i <= 54; i++) {
    const x1 = -(1 + (i % 4));
    const x2 = 2 + (i % 5);
    const bCoeff = -(x1 + x2);
    const cCoeff = x1 * x2;
    const signB = formatSigned(bCoeff, 'x');
    const signC = formatSigned(cCoeff, '');
    const isLess = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');
    const ansInterval = isLess ? `(${x1}, ${x2})` : `(-\\infty, ${x1}) \\cup (${x2}, +\\infty)`;
    const wrongInterval = isLess ? `(-\\infty, ${x1}) \\cup (${x2}, +\\infty)` : `(${x1}, ${x2})`;

    const task = {
      id: `task_math_form23_arch08_${taskNum}`,
      archetypeCode: "ARCH-08",
      category: "Równania i nierówności",
      title: "Nierówność kwadratowa",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nZbiorem wszystkich rozwiązań nierówności $x^2 ${signB} ${signC} ${isLess ? '<' : '>'} 0$ jest przedział`,
      options: [
        `$${ansInterval}$`,
        `$${wrongInterval}$`,
        `$(${x1}, +\\infty)$`,
        `$(-\\infty, ${x2})$`
      ],
      explanation: `**Krok 1:** Wyznaczamy miejsca zerowe trójmianu kwadratowego $x^2 ${signB} ${signC} = 0$:\n$$x_1 = ${x1}, \\quad x_2 = ${x2}$$\n\n**Krok 2:** Analizujemy znak współczynnika przy $x^2$: $a = 1 > 0$, co oznacza, że ramiona paraboli są skierowane w górę.\n\n**Krok 3:** Odczytujemy przedział rozwiązań dla nierówności $${isLess ? '< 0' : '> 0'}$:\n${isLess ? `Wartości ujemne ($< 0$) znajdują się pod osią $OX$, czyli w przedziale między miejscami zerowymi: $x \\in (${x1}, ${x2})$.` : `Wartości dodatnie ($> 0$) znajdują się nad osią $OX$, czyli na zewnątrz miejsc zerowych: $x \\in (-\\infty, ${x1}) \\cup (${x2}, +\\infty)$.`}\n\n**Pułapka CKE:** Zwracaj uwagę na zwrot nierówności oraz znak współczynnika $a$. Pomylenie przedziału wewnętrznego z zewnętrznym to częsty błąd.`,
      matura_tip: "Tablice CKE str. 8: Gdy $a > 0$, parabola ma ramiona w górę. Znak $<$ daje przedział wewnętrzny, a znak $>$ sumę przedziałów zewnętrznych."
    };
    allTasks.push(finalizeSingleChoiceTask(task, 8000 + i));
  }

  // ARCH-09: Równania wielomianowe stopnia trzeciego (40 zadań)
  // Pule bSq i aBase zaprojektowane tak, by każda para (a, bSq) była unikalna
  const arch09bSqPool = [4, 9, 16, 25, 36, 49, 64, 4, 9, 16];
  const arch09aPool   = [2, 3, 4, 5, 6, 7, 8, 3, 5, 4];
  for (let i = 1; i <= 40; i++) {
    const bSq = arch09bSqPool[(i - 1) % arch09bSqPool.length] + Math.floor((i - 1) / arch09bSqPool.length) * 4;
    const b = Math.round(Math.sqrt(bSq));
    let a = arch09aPool[(i - 1) % arch09aPool.length] + Math.floor((i - 1) / arch09aPool.length);
    // Guarantee a ≠ b (no repeated roots)
    if (a === b) a = b + 2;
    const taskNum = String(i).padStart(3, '0');

    // Display coefficient: never write "1x^2", always "x^2"
    const aCoeffStr = a === 1 ? '' : `${a}`;

    const task = {
      id: `task_math_form23_arch09_${taskNum}`,
      archetypeCode: "ARCH-09",
      category: "Równania i nierówności",
      title: "Równanie wielomianowe stopnia trzeciego",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nRównanie $x^3 - ${aCoeffStr}${aCoeffStr ? '' : ''}${a}x^2 - ${bSq}x + ${a * bSq} = 0$ w zbiorze liczb rzeczywistych`,
      options: [
        `ma dokładnie trzy rozwiązania: $x = ${a}, x = ${b}, x = -${b}$`,
        `ma dokładnie jedno rozwiązanie: $x = ${a}$`,
        `ma dokładnie dwa rozwiązania: $x = ${a}, x = ${b}$`,
        `nie ma rozwiązań rzeczywistych`
      ],
      explanation: `**Krok 1:** Stosujemy metodę grupowania wyrazów dla wielomianu stopnia trzeciego:\n$$(x^3 - ${a}x^2) - (${bSq}x - ${a * bSq}) = 0$$\n$$x^2(x - ${a}) - ${bSq}(x - ${a}) = 0$$\n\n**Krok 2:** Wyłączamy wspólny czynnik $(x - ${a})$ przed nawias:\n$$(x - ${a})(x^2 - ${bSq}) = 0$$\n\n**Krok 3:** Rozkładamy czynnik kwadratowy za pomocą wzoru na różnicę kwadratów ($x^2 - ${b}^2 = (x - ${b})(x + ${b})$):\n$$(x - ${a})(x - ${b})(x + ${b}) = 0$$\nPrzyrównujemy każdy czynnik do zera, otrzymując 3 różne rozwiązania rzeczywiste:\n$$x = ${a} \\quad \\lor \\quad x = ${b} \\quad \\lor \\quad x = -${b}$$\n\n**Pułapka CKE:** Z równania $x^2 = ${bSq}$ zawsze wynikają DWA rozwiązania: dodatnie i ujemne ($x = ${b}$ oraz $x = -${b}$). Pominięcie minusa to strata punktu na maturze!`,
      matura_tip: "Tablice CKE str. 3: Równanie $x^2 = a^2$ dla $a > 0$ ma ZAWSZE dwa rozwiązania: $x = a$ oraz $x = -a$."
    };
    allTasks.push(finalizeSingleChoiceTask(task, 9000 + i));
  }

  return allTasks;
}
