import { finalizeSingleChoiceTask, makeOptions } from './utils.js';

export function generateSequencesAndTrig() {
  const tasks = [];

  // ARCH-14: Ciąg arytmetyczny: wzór ogólny, różnica r, 3 kolejne wyrazy (48 zadań)
  for (let i = 1; i <= 48; i++) {
    const isThreeTerms = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');

    if (isThreeTerms) {
      const d = 2 + (i % 5);
      const a1 = 3 + (i % 6);
      const a2 = a1 + d;
      const a3 = a2 + d;

      const task = {
        id: `task_math_form23_arch14_${taskNum}`,
        archetypeCode: "ARCH-14",
        category: "Ciągi",
        title: "Trzy kolejne wyrazy ciągu arytmetycznego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nLiczby $${a1}$, $x$, $${a3}$ w podanej kolejności tworzą ciąg arytmetyczny. Liczba $x$ jest równa`,
        options: makeOptions(`$${a2}$`, [
          `$${a3 - a1}$`,
          `$${a2 + d}$`,
          `$${a2 + 1}$`,
          `$${a2 - 2}$`,
          `$${a1 * 2}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy własność trzech kolejnych wyrazów ciągu arytmetycznego (Tablice CKE str. 5):\n$$a_n = \\frac{a_{n-1} + a_{n+1}}{2} \\iff 2a_n = a_{n-1} + a_{n+1}$$\nWyraz środkowy jest średnią arytmetyczną wyrazów sąsiednich.\n\n**Krok 2:** Podstawiamy liczby $a_1 = ${a1}$ oraz $a_3 = ${a3}$:\n$$x = \\frac{${a1} + ${a3}}{2} = \\frac{${a1 + a3}}{2}$$\n\n**Krok 3:** Obliczamy wartość liczbową:\n$$x = ${a2}$$\n\n**Pułapka CKE:** Wyraz środkowy to średnia arytmetyczna skrajnych, nie ich różnica ($${a3} - ${a1} = ${a3 - a1}$) ani suma!`,
        matura_tip: "Tablice CKE str. 5: Dla ciągu arytmetycznego zawsze zachodzi $2a_n = a_{n-1} + a_{n+1}$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 14000 + i));
    } else {
      const a1 = 2 + (i % 7);
      const r = 3 + (i % 5);
      const n = 5 + (i % 5);
      const an = a1 + (n - 1) * r;

      const task = {
        id: `task_math_form23_arch14_${taskNum}`,
        archetypeCode: "ARCH-14",
        category: "Ciągi",
        title: "Wyraz ogólny ciągu arytmetycznego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW ciągu arytmetycznym $(a_n)$ określonym dla każdej liczby naturalnej $n \\ge 1$ dane są: wyraz $a_1 = ${a1}$ oraz różnica $r = ${r}$. Wtedy wyraz $a_{${n}}$ jest równy`,
        options: makeOptions(`$${an}$`, [
          `$${an + r}$`,
          `$${an - r}$`,
          `$${a1 * r + 1}$`,
          `$${an + 2 * r}$`,
          `$${an - 2}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy wzór ogólny na $n$-ty wyraz ciągu arytmetycznego (Tablice CKE str. 5):\n$$a_n = a_1 + (n - 1)r$$\n\n**Krok 2:** Podstawiamy dane: $a_1 = ${a1}$, $r = ${r}$ oraz $n = ${n}$:\n$$a_{${n}} = ${a1} + (${n} - 1) \\cdot ${r} = ${a1} + ${n - 1} \\cdot ${r}$$\n\n**Krok 3:** Wykonujemy obliczenia:\n$$a_{${n}} = ${a1} + ${(n - 1) * r} = ${an}$$\n\n**Pułapka CKE:** Uważaj na mnożenie przez $n$ zamiast $(n - 1)$! Opcja B ($${an + r}$) to $a_1 + n \\cdot r$, co odpowiada wyrazowi $a_{${n + 1}}$.`,
        matura_tip: "Pamiętaj: do pierwszego wyrazu dodajesz o JEDNĄ różnicę MNIEJ niż numer szukanego wyrazu: $a_{10} = a_1 + 9r$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 14000 + i));
    }
  }

  // ARCH-15: Ciąg arytmetyczny: suma Sn (29 zadań)
  for (let i = 1; i <= 29; i++) {
    const a1 = 1 + (i % 5);
    const r = 2 + (i % 4);
    const n = 10 + (i % 5);
    const an = a1 + (n - 1) * r;
    const sn = ((a1 + an) * n) / 2;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch15_${taskNum}`,
      archetypeCode: "ARCH-15",
      category: "Ciągi",
      title: "Suma początkowych wyrazów ciągu arytmetycznego",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW ciągu arytmetycznym $(a_n)$ określonym dla $n \\ge 1$ dane są: $a_1 = ${a1}$ oraz $a_{${n}} = ${an}$. Suma pierwszych $${n}$ wyrazów tego ciągu $S_{${n}}$ jest równa`,
      options: makeOptions(`$${sn}$`, [
        `$${sn * 2}$`,
        `$${sn - a1}$`,
        `$${sn + 14}$`,
        `$${Math.round(sn * 0.75)}$`,
        `$${sn - 10}$`
      ]),
      explanation: `**Krok 1:** Przywołujemy wzór na sumę $n$ początkowych wyrazów ciągu arytmetycznego (Tablice CKE str. 5):\n$$S_n = \\frac{a_1 + a_n}{2} \\cdot n$$\n\n**Krok 2:** Podstawiamy wartości $a_1 = ${a1}$, $a_{${n}} = ${an}$ oraz $n = ${n}$:\n$$S_{${n}} = \\frac{${a1} + ${an}}{2} \\cdot ${n} = \\frac{${a1 + an}}{2} \\cdot ${n}$$\n\n**Krok 3:** Wykonujemy obliczenia:\n$$S_{${n}} = ${(a1 + an) / 2} \\cdot ${n} = ${sn}$$\n\n**Pułapka CKE:** Nie zapomnij podzielić sumy wyrazów skrajnych przez 2 (opcja B to pominięcie dzielnika 2).`,
      matura_tip: "Tablice CKE str. 5: Suma ciągu arytmetycznego to średnia pierwszego i ostatniego wyrazu pomnożona przez ich liczbę."
    };
    tasks.push(finalizeSingleChoiceTask(task, 15000 + i));
  }

  // ARCH-16: Ciąg geometryczny: iloraz q i sąsiednie wyrazy (67 zadań)
  for (let i = 1; i <= 67; i++) {
    const isThreeTerms = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');

    if (isThreeTerms) {
      const q = 2 + (i % 3); // 2, 3, 4
      const a = 1 + (i % 4);
      const b = a * q;
      const c = b * q;

      const task = {
        id: `task_math_form23_arch16_${taskNum}`,
        archetypeCode: "ARCH-16",
        category: "Ciągi",
        title: "Trzy kolejne wyrazy ciągu geometrycznego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nDodatnie liczby $${a}$, $x$, $${c}$ w podanej kolejności tworzą ciąg geometryczny. Liczba $x$ jest równa`,
        options: makeOptions(`$${b}$`, [
          `$${Math.round((a + c) / 2)}$`,
          `$${b * 2}$`,
          `$${b + 3}$`,
          `$${b - 1}$`,
          `$${b + 5}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy własność trzech kolejnych wyrazów ciągu geometrycznego (Tablice CKE str. 5):\n$$b^2 = a \\cdot c$$\nKwadrat wyrazu środkowego jest równy iloczynowi wyrazów skrajnych.\n\n**Krok 2:** Podstawiamy $a = ${a}$ oraz $c = ${c}$:\n$$x^2 = ${a} \\cdot ${c} = ${a * c}$$\n\n**Krok 3:** Pierwiastkujemy obie strony równania (pamiętając, że liczby są dodatnie, więc $x > 0$):\n$$x = \\sqrt{${a * c}} = ${b}$$\n\n**Pułapka CKE:** Opcja B ($${Math.round((a + c) / 2)}$) to średnia arytmetyczna, która dotyczy ciągu arytmetycznego, a nie geometrycznego!`,
        matura_tip: "Dla ciągu geometrycznego o wyrazach dodatnich: wyraz środkowy to średnia GEOMETRYCZNA sąsiednich ($x = \\sqrt{ac}$)."
      };
      tasks.push(finalizeSingleChoiceTask(task, 16000 + i));
    } else {
      const q = 2 + (i % 4);
      const a1 = 1 + (i % 3);
      const a2 = a1 * q;
      const a3 = a2 * q;

      const task = {
        id: `task_math_form23_arch16_${taskNum}`,
        archetypeCode: "ARCH-16",
        category: "Ciągi",
        title: "Iloraz ciągu geometrycznego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW ciągu geometrycznym $(a_n)$ o wyrazach dodatnich dane są: $a_2 = ${a2}$ oraz $a_3 = ${a3}$. Iloraz $q$ tego ciągu jest równy`,
        options: makeOptions(`$${q}$`, [
          `$${a3 - a2}$`,
          `$\\frac{1}{${q}}$`,
          `$${q + 2}$`,
          `$${q * 2 + 1}$`,
          `$${q + 5}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy definicję ilorazu ciągu geometrycznego (Tablice CKE str. 5):\n$$q = \\frac{a_{n+1}}{a_n}$$\n\n**Krok 2:** Podstawiamy wyrazy $a_3 = ${a3}$ oraz $a_2 = ${a2}$:\n$$q = \\frac{a_3}{a_2} = \\frac{${a3}}{${a2}}$$\n\n**Krok 3:** Dzielimy liczby:\n$$q = ${q}$$\n\n**Pułapka CKE:** Opcja B ($${a3 - a2}$) to różnica wyrazów, charakterystyczna dla ciągu arytmetycznego. W ciągu geometrycznym ZAWSZE dzielimy kolejne wyrazy przez siebie!`,
        matura_tip: "W ciągu geometrycznym iloraz to iloraz (dzielenie): $q = a_{n+1} / a_n$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 16000 + i));
    }
  }

  // ARCH-17: Trygonometria: jedynka trygonometryczna i tangens (54 zadania)
  const pythTrig = [
    { sin: [3, 5], cos: [4, 5], tg: [3, 4] },
    { sin: [4, 5], cos: [3, 5], tg: [4, 3] },
    { sin: [5, 13], cos: [12, 13], tg: [5, 12] },
    { sin: [12, 13], cos: [5, 13], tg: [12, 5] },
    { sin: [8, 17], cos: [15, 17], tg: [8, 15] },
    { sin: [7, 25], cos: [24, 25], tg: [7, 24] }
  ];

  for (let i = 1; i <= 54; i++) {
    const trip = pythTrig[i % pythTrig.length];
    const taskNum = String(i).padStart(3, '0');
    const isSinToCos = (i % 2 === 1);

    if (isSinToCos) {
      const task = {
        id: `task_math_form23_arch17_${taskNum}`,
        archetypeCode: "ARCH-17",
        category: "Trygonometria",
        title: "Jedynka trygonometryczna",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nKąt $\\alpha$ jest kątem ostrym oraz $\\sin\\alpha = \\frac{${trip.sin[0]}}{${trip.sin[1]}}$. Wtedy $\\cos\\alpha$ jest równy`,
        options: makeOptions(`$\\frac{${trip.cos[0]}}{${trip.cos[1]}}$`, [
          `$\\frac{${trip.sin[1] - trip.sin[0]}}{${trip.sin[1]}}$`,
          `$\\frac{${trip.sin[0]}}{${trip.cos[0]}}$`,
          `$1 - \\frac{${trip.sin[0]}}{${trip.sin[1]}}$`,
          `$\\frac{${trip.cos[0] + 1}}{${trip.cos[1]}}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy tożsamość trygonometryczną zwaną jedynką trygonometryczną (Tablice CKE str. 9):\n$$\\sin^2\\alpha + \\cos^2\\alpha = 1 \\implies \\cos^2\\alpha = 1 - \\sin^2\\alpha$$\n\n**Krok 2:** Podstawiamy daną wartość $\\sin\\alpha = \\frac{${trip.sin[0]}}{${trip.sin[1]}}$:\n$$\\cos^2\\alpha = 1 - \\left(\\frac{${trip.sin[0]}}{${trip.sin[1]}}\\right)^2 = 1 - \\frac{${trip.sin[0] * trip.sin[0]}}{${trip.sin[1] * trip.sin[1]}} = \\frac{${trip.sin[1] * trip.sin[1] - trip.sin[0] * trip.sin[0]}}{${trip.sin[1] * trip.sin[1]}} = \\frac{${trip.cos[0] * trip.cos[0]}}{${trip.cos[1] * trip.cos[1]}}$$\n\n**Krok 3:** Ponieważ kąt $\\alpha$ jest ostry, $\\cos\\alpha > 0$, zatem:\n$$\\cos\\alpha = \\sqrt{\\frac{${trip.cos[0] * trip.cos[0]}}{${trip.cos[1] * trip.cos[1]}}} = \\frac{${trip.cos[0]}}{${trip.cos[1]}}$$\n\n**Pułapka CKE:** Pamiętaj o podnoszeniu ułamka do KWADRATU. Błędem jest odejmowanie samego sinusa bez potęgi ($1 - \\frac{a}{b}$).`,
        matura_tip: "Tablice CKE str. 9: $\\sin^2\\alpha + \\cos^2\\alpha = 1$. Zawsze pamiętaj o kwadratach!"
      };
      tasks.push(finalizeSingleChoiceTask(task, 17000 + i));
    } else {
      const task = {
        id: `task_math_form23_arch17_${taskNum}`,
        archetypeCode: "ARCH-17",
        category: "Trygonometria",
        title: "Definicja tangensa z jedynki trygonometrycznej",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nKąt $\\alpha$ jest kątem ostrym oraz $\\sin\\alpha = \\frac{${trip.sin[0]}}{${trip.sin[1]}}$ i $\\cos\\alpha = \\frac{${trip.cos[0]}}{${trip.cos[1]}}$. Wtedy $\\operatorname{tg}\\alpha$ jest równy`,
        options: makeOptions(`$\\frac{${trip.tg[0]}}{${trip.tg[1]}}$`, [
          `$\\frac{${trip.tg[1]}}{${trip.tg[0]}}$`,
          `$\\frac{${trip.sin[0]}}{${trip.sin[1]}}$`,
          `$1$`,
          `$\\frac{${trip.tg[0] + 1}}{${trip.tg[1]}}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy definicję tangensa za pomocą funkcji sinus i cosinus (Tablice CKE str. 9):\n$$\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$$\n\n**Krok 2:** Podstawiamy wartości ułamkowe:\n$$\\operatorname{tg}\\alpha = \\frac{\\frac{${trip.sin[0]}}{${trip.sin[1]}}}{\\frac{${trip.cos[0]}}{${trip.cos[1]}}} = \\frac{${trip.sin[0]}}{${trip.sin[1]}} \\cdot \\frac{${trip.cos[1]}}{${trip.cos[0]}}$$\n\n**Krok 3:** Skracamy mianowniki $${trip.sin[1]}$:\n$$\\operatorname{tg}\\alpha = \\frac{${trip.tg[0]}}{${trip.tg[1]}}$$\n\n**Pułapka CKE:** Opcja B to $\\operatorname{ctg}\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}$. Pamiętaj: tangens to ZAWSZE sinus dzielony przez cosinus!`,
        matura_tip: "Tablice CKE str. 9: $\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 17000 + i));
    }
  }

  // ARCH-18: Trygonometria w trójkącie prostokątnym (40 zadań)
  for (let i = 1; i <= 40; i++) {
    const trip = pythTrig[i % pythTrig.length];
    const taskNum = String(i).padStart(3, '0');
    const a = trip.sin[0] * 2;
    const b = trip.cos[0] * 2;
    const c = trip.sin[1] * 2;

    const task = {
      id: `task_math_form23_arch18_${taskNum}`,
      archetypeCode: "ARCH-18",
      category: "Trygonometria",
      title: "Funkcje trygonometryczne w trójkącie prostokątnym",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW trójkącie prostokątnym przyprostokątne mają długości $${a}$ i $${b}$, a przeciwprostokątna ma długość $${c}$. Jeśli $\\alpha$ jest kątem leżącym naprzeciwko przyprostokątnej o długości $${a}$, to $\\sin\\alpha$ jest równy`,
      options: makeOptions(`$\\frac{${trip.sin[0]}}{${trip.sin[1]}}$`, [
        `$\\frac{${trip.cos[0]}}{${trip.cos[1]}}$`,
        `$\\frac{${trip.tg[0]}}{${trip.tg[1]}}$`,
        `$\\frac{${trip.tg[1]}}{${trip.tg[0]}}$`,
        `$\\frac{${trip.sin[0] + 1}}{${trip.sin[1]}}$`
      ]),
      explanation: `**Krok 1:** Przywołujemy definicję sinusa w trójkącie prostokątnym (Tablice CKE str. 9): sinus kąta ostrego $\\alpha$ to stosunek długości przyprostokątnej leżącej naprzeciwko tego kąta ($a$) do długości przeciwprostokątnej ($c$):\n$$\\sin\\alpha = \\frac{a}{c}$$\n\n**Krok 2:** Identyfikujemy boki w trójkącie:\n- Przyprostokątna naprzeciw kąta $\\alpha$: $a = ${a}$\n- Przeciwprostokątna: $c = ${c}$\n\n**Krok 3:** Obliczamy stosunek i skracamy ułamek przez 2:\n$$\\sin\\alpha = \\frac{${a}}{${c}} = \\frac{${trip.sin[0]}}{${trip.sin[1]}}$$\n\n**Pułapka CKE:** Opcja B to $\\cos\\alpha = \\frac{b}{c}$, a opcja C to $\\operatorname{tg}\\alpha = \\frac{a}{b}$. Zawsze upewnij się, o którą funkcję pyta zadanie!`,
      matura_tip: "Sinus kąta ostrego to zawsze bok NAPRZECIWKO kąta podzielony przez przeciwprostokątną."
    };
    tasks.push(finalizeSingleChoiceTask(task, 18000 + i));
  }

  return tasks;
}
