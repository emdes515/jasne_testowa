import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Compass, 
  Calendar, 
  Lightbulb, 
  BookOpen, 
  AlertTriangle, 
  Target, 
  Award,
  CheckCircle2
} from 'lucide-react';

export interface EpochPassportData {
  epochId: string;
  epochName: string;
  timeline: string;
  philosophy: string[];
  keyMotifs: string[];
  canonicalWorks: string[];
  ckePewniaki: {
    rule: string;
    trap: string;
    ckeTip: string;
  };
}

export const EPOCH_PASSPORTS: Record<string, EpochPassportData> = {
  'dzial-5': {
    epochId: 'dzial-5',
    epochName: 'Antyk i Biblia',
    timeline: 'VIII w. p.n.e. – 476 r. n.e. (Upadek Rzymu)',
    philosophy: [
      'Stoicyzm (Zenon z Kition) – zachowanie cnoty i niewzruszonego spokoju (ataraksja) wobec zmienności losu.',
      'Epikureizm (Epikur) – dążenie do mądrej radości życia (carpe diem) i unikanie cierpienia.',
      'Teocentryzm biblijny – Bóg jako jedyny stwórca, przymierze Boga z człowiekiem, sens cierpienia niezawinionego (Księga Hioba).'
    ],
    keyMotifs: [
      'Tragizm i Fatum (przeznaczenie silniejsze od człowieka)',
      'Hybris (pycha bohatera ściągająca zgubę)',
      'Vanitas (marność świata w Księdze Koheleta)',
      'Homo viator (człowiek wędrowiec – Odyseusz)'
    ],
    canonicalWorks: ['Sofokles: Antygona', 'Biblia: Księga Rodzaju, Księga Hioba, Księga Koheleta, Apokalipsa św. Jana', 'Mitologia grecka'],
    ckePewniaki: {
      rule: 'Antygona reprezentuje konflikt dwóch równorzędnych racji: prawa boskiego (moralnego) i prawa ziemskiego (państwowego). Żadna ze stron nie może ustąpić bez zdrady swoich wartości.',
      trap: 'Uznanie Kreona za zwykłego bezwzględnego tyrana. Kreon działa w poczuciu obrony porządku publicznego i państwa po wojnie domowej – to jego tragizm.',
      ckeTip: 'W teście historycznoliterackim (15 pkt) CKE niemal zawsze pyta o istotę konfliktu tragicznego lub symbolikę vanitas.'
    }
  },
  'dzial-6': {
    epochId: 'dzial-6',
    epochName: 'Średniowiecze',
    timeline: 'V w. – koniec XV w. (W Polsce od chrztu w 966 r. do ok. 1500 r.)',
    philosophy: [
      'Teocentryzm – Bóg w centrum wszechświata i wszelkiej myśli ludzkiej.',
      'Augustynizm – dramatyczne rozdarcie człowieka między sferą materii (ziemską) a sferą ducha (Bożą).',
      'Tomizm – harmonijny ład świata, wiara i rozum wzajemnie się uzupełniają.',
      'Franciszkanizm – radosna miłość do wszelkiego stworzenia i dobrowolne ubóstwo.'
    ],
    keyMotifs: [
      'Memento mori (pamiętaj o śmierci)',
      'Danse macabre (taniec śmierci – równość wszystkich stanów wobec zgonu)',
      'Deesis (modlitwa wstawiennicza – Bogurodzica)',
      'Wzorce osobowe: święty/asceta (św. Aleksy), idealny władca (Bolesław Chrobry), rycerz bez skazy (Roland)'
    ],
    canonicalWorks: ['Bogurodzica', 'Rozmowa Mistrza Polikarpa ze Śmiercią', 'Legenda o św. Aleksym', 'Pieśń o Rolandzie'],
    ckePewniaki: {
      rule: 'Bogurodzica to najstarszy polski hymn religijny. Układ modlitewny deesis przedstawia Chrystusa jako sędziego oraz Maryję i Jana Chrzciciela jako pośredników.',
      trap: 'Anachronizm: przypisywanie autorom średniowiecznym troski o sławę autorską. W średniowieczu dominował anonimowy kult Ad maiorem Dei gloriam.',
      ckeTip: 'CKE testuje archaizmy w Bogurodzicy (leksykalne, fonetyczne, fleksyjne) – np. „Bogurodzica Dziewica, Bogiem sławiena M喫a”.'
    }
  },
  'dzial-7': {
    epochId: 'dzial-7',
    epochName: 'Renesans (Odrodzenie)',
    timeline: 'Koniec XV w. – koniec XVI w. (Złoty wiek kultury polskiej)',
    philosophy: [
      'Humanizm – „Człowiekiem jestem i nic, co ludzkie, nie jest mi obce” (Terencjusz).',
      'Antropocentryzm – człowiek w centrum zainteresowania nauki, sztuki i filozofii.',
      'Harmonia kosmosu – świat stworzony przez Boga jako dzieło doskonałe, w którym człowiek odnajduje spokój.'
    ],
    keyMotifs: [
      'Deus artifex (Bóg jako boski artysta i budowniczy świata)',
      'Cnota (virtus) i stoicki umiar połączony z epikurejską radością życia',
      'Ojczyzna i odpowiedzialność obywatelska',
      'Kryzys światopoglądowy i jego przezwyciężenie (Treny)'
    ],
    canonicalWorks: ['Jan Kochanowski: Pieśni, Treny, Odprawa posłów greckich', 'Mikołaj Rej: Krótka rozprawa...', 'Andrzej Frycz Modrzewski: O poprawie Rzeczypospolitej'],
    ckePewniaki: {
      rule: 'Treny Kochanowskiego to poetycki traktat filozoficzny o załamaniu stoickiej tarczy mędrca po śmierci córki Urszulki i ponownym odzyskaniu równowagi (Tren XIX).',
      trap: 'Błąd: twierdzenie, że Kochanowski całkowicie odrzucił wiarę w Boga w Trenach. Przeżył kryzys filozoficzny, ale w Trenie XIX odbudowuje chrześcijańską ufność.',
      ckeTip: 'W arkuszu CKE Kochanowski pojawia się regularnie w teście historycznoliterackim – zwróć uwagę na topos Fortuny w Pieśniach.'
    }
  },
  'dzial-8': {
    epochId: 'dzial-8',
    epochName: 'Barok i Oświecenie',
    timeline: 'Barok: koniec XVI w. – poł. XVIII w. | Oświecenie: poł. XVIII w. – 1822 r.',
    philosophy: [
      'Barok: niepokój egzystencjalny, poczucie nietrwałości ziemskiego bytu, konceptyzm, mistycyzm i sarmatyzm.',
      'Oświecenie: Racjonalizm (Kartezjusz: „Myślę, więc jestem”), empiryzm (John Locke), deizm i krytycyzm społeczny.',
      'Dydaktyzm oświeceniowy: „Uczyć, bawiąc” (docere, delectare, movere).'
    ],
    keyMotifs: [
      'Vanitas i przemijanie urody oraz bogactwa (Morsztyn, Naborowski)',
      'Sarmata – dumny obrońca wiary (antemurale christianitatis) vs megaloman i pijanica',
      'Satyra na wady narodowe i walka o naprawę państwa (Krasicki)'
    ],
    canonicalWorks: ['Ignacy Krasicki: Satyry (np. Do króla, Pijaństwo), Bajki', 'Jan Andrzej Morsztyn: Do trupa', 'Daniel Naborowski: Krótkość żywota'],
    ckePewniaki: {
      rule: 'Krasicki w satyrach krytykuje wady, a nie konkretne osoby. W satyrze „Do króla” pozorne zarzuty pod adresem Stanisława Augusta w rzeczywistości obnażają głupotę szlachty.',
      trap: 'Dosłowne odczytanie satyry „Do króla” jako ataku na monarchę – to klasyczna pułapka ironii oświeceniowej!',
      ckeTip: 'Pamiętaj o rozróżnieniu barokowego konceptu (zaskakujący pomysł literacki, np. porównanie zakochanego do trupa) od oświeceniowej alegorii w bajkach.'
    }
  },
  'dzial-10': {
    epochId: 'dzial-10',
    epochName: 'Romantyzm (Kanon Wieszczów)',
    timeline: '1822 r. (Wydanie Ballad i romansów) – 1864 r. (Upadek powstania styczniowego)',
    philosophy: [
      'Iracjonalizm – prymat uczucia, wiary i intuicji nad „szkiełkiem i okiem” rozumu.',
      'Mistycyzm i mesjanizm – Polska jako „Chrystus narodów” (Winkelriedyzm u Słowackiego vs Mesjanizm u Mickiewicza).',
      'Prometeizm – bezkompromisowe poświęcenie jednostki dla dobra ogółu narodu, bunt przeciw Bogu w imię miłości do ludzi (Konrad w Wielkiej Improwizacji).'
    ],
    keyMotifs: [
      'Bunt romantyczny i samotność geniusza',
      'Duchy, zjawy, świat pozazmysłowy, ludowa sprawiedliwość moralna',
      'Cierpienie miłosne i metamorfoza bohatera (Gustaw -> Konrad)',
      'Walka o niepodległość, spisek, odpowiedzialność za los ojczyzny'
    ],
    canonicalWorks: ['Adam Mickiewicz: Dziady cz. III, Pan Tadeusz, Ballady i romanse', 'Juliusz Słowacki: Kordian', 'Zygmunt Krasiński: Nie-Boska komedia'],
    ckePewniaki: {
      rule: 'Przemiana Gustawa w Konrada w celi więziennej („Umarł Gustaw – narodził się Konrad”) to symboliczne porzucenie egoistycznej miłości do kobiety na rzecz patriotycznej miłości do narodu.',
      trap: 'Błąd kardynalny: twierdzenie, że Konrad zamordował cara lub że Kordian dokonał zamachu. Kordian zemdlał pod drzwiami sypialni cara przez Strach i Imaginację!',
      ckeTip: 'W wypracowaniu zestawienie Mickiewicza ze Słowackim (Mesjanizm vs Winkelriedyzm) daje najwyższe noty za kontekst literacko-filozoficzny.'
    }
  },
  'dzial-11': {
    epochId: 'dzial-11',
    epochName: 'Pozytywizm',
    timeline: '1864 r. (Klęska powstania) – ok. 1890 r.',
    philosophy: [
      'Scjentyzm – zaufanie do wiedzy empirycznej, nauk przyrodniczych i rozumu.',
      'Praca organiczna – społeczeństwo jako żywy organizm, wszystkie warstwy muszą współpracować.',
      'Praca u podstaw – edukacja najuboższych warstw, walka z analfabetyzmem i nędzą.',
      'Emancypacja kobiet i asymilacja mniejszości narodowych.'
    ],
    keyMotifs: [
      'Tragizm pokolenia idealistów (Wokulski, Rzecki)',
      'Miasto jako przestrzeń kontrastów społecznych (Warszawa Powiśla vs salony arystokracji)',
      'Konflikt romantyzmu z pozytywizmem w jednej duszy',
      'Kult pracy i nauki vs pasożytnictwo arystokracji'
    ],
    canonicalWorks: ['Bolesław Prus: Lalka', 'Eliza Orzeszkowa: Gloria victis', 'Henryk Sienkiewicz: Potop'],
    ckePewniaki: {
      rule: 'Stanisław Wokulski to postać niejednoznaczna: romantyk w miłości (ślepa fascynacja Izabelą Łęcką) i pozytywista w czynach (przedsiębiorca, filantrop, zwolennik nauki).',
      trap: 'Błąd kardynalny: mylenie losów Wokulskiego z Ochockim albo Rzeckim, lub stwierdzenie, że Izabela Łęcka odwzajemniła miłość i wyszła za Wokulskiego.',
      ckeTip: 'Lalka pojawia się na co drugiej maturze. Zawsze pamiętaj o trzech pokoleniach idealistów: Rzecki (romantyk polityczny), Wokulski (przejściowy), Ochocki (pozytywista naukowy).'
    }
  },
  'dzial-13': {
    epochId: 'dzial-13',
    epochName: 'Młoda Polska (Modernizm)',
    timeline: 'Ok. 1890 r. – 1918 r. (Koniec I wojny światowej)',
    philosophy: [
      'Dekadentyzm – poczucie schyłku kultury, niemocy, bierności i zniechęcenia.',
      'Filozofia Schopenhauera – życie jako pasmo cierpień, ucieczka w sztukę i nirwanę.',
      'Filozofia Nietzschego – kult silnej jednostki (nadczłowieka), odrzucenie moralności niewolników.',
      'Chłopomania – fascynacja inteligencji witalnością i obyczajami wsi.'
    ],
    keyMotifs: [
      'Dramat narodowy i niemożność czynu niepodległościowego (chocholi taniec)',
      'Konfrontacja mitów narodowych z bolesną prawdą o społeczeństwie',
      'Symbolizm: Złoty Róg, Czapka z pawich piór, Dzwon Zygmunta',
      'Zjawy i widma jako uosobienie ukrytych lęków i wyrzutów sumienia'
    ],
    canonicalWorks: ['Stanisław Wyspiański: Wesele', 'Jan Kasprowicz, Kazimierz Przerwa-Tetmajer, Leopold Staff'],
    ckePewniaki: {
      rule: 'Wesele ukazuje iluzję sojuszu inteligencji z chłopami. Inteligencja jest bierna i rozmarzona, a chłopi rwą się do walki, lecz brak im przywództwa.',
      trap: 'Błąd kardynalny: mylenie symboliki Złotego Rogu (sygnał do powstania i walki) z Chocholim Tańcem (bierność, uśpienie, niemoc narodu).',
      ckeTip: 'Pamiętaj: Widma w Weselu są subiektywnymi projekcjami psychologicznymi postaci (Stańczyk – Dziennikarz, Rycerz Czarny – Poeta, Hetman – Pan Młody, Wernyhora – Gospodarz).'
    }
  }
};

interface PolishEpochPassportModalProps {
  epochId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PolishEpochPassportModal: React.FC<PolishEpochPassportModalProps> = ({
  epochId,
  isOpen,
  onClose,
}) => {
  const passport = EPOCH_PASSPORTS[epochId] || EPOCH_PASSPORTS['dzial-5'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-surface-card border border-rose-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/5 bg-gradient-to-r from-rose-950/40 via-surface-card to-purple-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <Compass size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    Paszport Epoki CKE
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {passport.timeline}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-100 mt-0.5">
                  {passport.epochName}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar text-xs leading-relaxed text-slate-300">
            {/* 1. Idee i Filozofia */}
            <div>
              <div className="flex items-center gap-2 text-rose-300 font-bold uppercase tracking-wider text-[11px] mb-2.5">
                <Lightbulb size={14} className="text-rose-400" />
                <span>Naczelne idee filozoficzne i światopogląd:</span>
              </div>
              <div className="space-y-2">
                {passport.philosophy.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/50 border border-white/5 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Toposy i Motywy Literackie */}
            <div>
              <div className="flex items-center gap-2 text-purple-300 font-bold uppercase tracking-wider text-[11px] mb-2.5">
                <Compass size={14} className="text-purple-400" />
                <span>Kluczowe toposy i motywy do wypracowania:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {passport.keyMotifs.map((motif, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-purple-950/10 border border-purple-500/20 text-purple-200 flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                    <span>{motif}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Kanon Lektur z Gwiazdką */}
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-[11px] mb-2">
                <BookOpen size={14} className="text-amber-400" />
                <span>Lektury obowiązkowe w epoce:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {passport.canonicalWorks.map((work, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 font-medium">
                    ★ {work}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Pewniak CKE i Ostrzeżenie Egzaminatora */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/30 to-amber-950/20 border border-rose-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Award size={15} />
                <span>Pewniak CKE (Test historycznoliteracki • 15 pkt)</span>
              </div>
              <p className="text-slate-200 font-medium">
                {passport.ckePewniaki.rule}
              </p>
              
              <div className="pt-2 border-t border-white/5 text-[11px] text-rose-300 flex items-start gap-2">
                <AlertTriangle size={14} className="shrink-0 mt-0.5 text-rose-400" />
                <div>
                  <span className="font-bold text-rose-200">Pułapka egzaminatora: </span>
                  {passport.ckePewniaki.trap}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 not-italic" />
                <span>Wskazówka: {passport.ckePewniaki.ckeTip}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/5 bg-slate-950/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950/30 transition-transform active:scale-98"
            >
              Rozumiem, przejdź do ćwiczeń
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
