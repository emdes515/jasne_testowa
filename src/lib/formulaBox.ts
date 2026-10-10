/**
 * Treść kasetonu wzoru w pigułce wiedzy.
 *
 * Pole `formula` w kursie matematyki to czysty LaTeX bez znaczników `$`. MathRenderer przy takim wejściu zgaduje,
 * czy ma do czynienia z prozą, i zbitki zmiennych („ax”, „xy”, „ab”) bierze za słowa – wtedy dzieli wzór
 * i część pokazuje jako surowy LaTeX. Dlatego wzór jawnie oznaczamy jako blok matematyczny.
 * Tekst z własnymi znacznikami `$` oraz zwykłą prozę (np. kasetony w języku polskim) zostawiamy bez zmian.
 */
export function toFormulaBoxContent(latex: string, isProse = false): string {
  const value = String(latex ?? '').trim();
  if (!value || isProse || value.includes('$')) return value;
  const looksLikeMath = /\\[a-zA-Z]+|[\^_=<>]/.test(value);
  return looksLikeMath ? `$$${value}$$` : value;
}
