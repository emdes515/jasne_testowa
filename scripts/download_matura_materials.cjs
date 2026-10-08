const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', 'baza_cke_matematyka');

// List of all items to download
const DOWNLOAD_ITEMS = [
  // 1. Tablice wzorów
  {
    category: 'tablice_wzorow',
    year: '2023-obecnie',
    title: 'Wybrane Wzory Matematyczne na Egzamin Maturalny (Formuła 2023)',
    type: 'tablice',
    level: 'podstawowy_i_rozszerzony',
    filename: 'tablice_wzorow/wybrane_wzory_matematyczne_EM2023.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informatory/wybrane_wzory_matematyczne_EM2023.pdf',
      'https://arkusze.pl/maturalne/wybrane-wzory-matematyczne-matura-2023.pdf'
    ]
  },

  // 2. Informatory i oficjalne zbiory zadań CKE
  {
    category: 'informatory_i_zbiory_zadan',
    year: '2024-obecnie',
    title: 'Informator o egzaminie maturalnym z matematyki - Poziom Podstawowy (Formuła 2023)',
    type: 'informator',
    level: 'podstawowy',
    filename: 'informatory_i_zbiory_zadan/Informator_EM2024_matematyka_pp.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informatory/2024/Informator_EM2024_matematyka_pp.pdf',
      'https://arkusze.pl/maturalne/informator-maturalny-2023-matematyka-poziom-podstawowy.pdf'
    ]
  },
  {
    category: 'informatory_i_zbiory_zadan',
    year: '2024-obecnie',
    title: 'Informator o egzaminie maturalnym z matematyki - Poziom Rozszerzony (Formuła 2023)',
    type: 'informator',
    level: 'rozszerzony',
    filename: 'informatory_i_zbiory_zadan/Informator_EM2024_matematyka_pr.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informatory/2024/Informator_EM2024_matematyka_pr.pdf',
      'https://arkusze.pl/maturalne/informator-maturalny-2023-matematyka-poziom-rozszerzony.pdf'
    ]
  },
  {
    category: 'informatory_i_zbiory_zadan',
    year: '2024-obecnie',
    title: 'Informator o egzaminie maturalnym z matematyki - Część dwujęzyczna',
    type: 'informator',
    level: 'dwujezyczny',
    filename: 'informatory_i_zbiory_zadan/Informator_dwujezyczny_matematyka.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informatory/2024/Informator_od_2024_dwuj%C4%99zyczny_matematyka.pdf'
    ]
  },
  {
    category: 'informatory_i_zbiory_zadan',
    year: '2023',
    title: 'Oficjalny Zbiór Zadań CKE do nowej matury - Poziom Podstawowy',
    type: 'zbior_zadan',
    level: 'podstawowy',
    filename: 'informatory_i_zbiory_zadan/CKE_zbior_zadan_matematyka_podstawa.pdf',
    urls: [
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/matematyka/Matematyka%20%E2%80%93%20zbior%20zadan%20na%20poziomie%20podstawowym.pdf'
    ]
  },
  {
    category: 'informatory_i_zbiory_zadan',
    year: '2023',
    title: 'Oficjalny Zbiór Zadań CKE do nowej matury - Poziom Rozszerzony',
    type: 'zbior_zadan',
    level: 'rozszerzony',
    filename: 'informatory_i_zbiory_zadan/CKE_zbior_zadan_matematyka_rozszerzenie.pdf',
    urls: [
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/matematyka/Matematyka%20-%20zbior%20zadan%20na%20poziomie%20rozszerzonym.pdf'
    ]
  },

  // 3. Rocznik 2022 (Arkusze Pokazowe i Diagnostyczne CKE)
  {
    category: '2022',
    year: '2022',
    session: 'Marzec (Pokazowy CKE)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2022_pokazowe_i_probne/matura-2022-marzec-pokazowa-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-przykladowy-arkusz-cke-podstawowa.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/Matematyka_PP/MMAP-P0-100-2203.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Marzec (Pokazowy CKE)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2022_pokazowe_i_probne/matura-2022-marzec-pokazowa-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-przykladowy-arkusz-cke-podstawowa-odpowiedzi.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/Matematyka_PP/MMAP-P0-100-200-300-400-660-700-Q00-2203-zasady.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Marzec (Pokazowy CKE)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2022_pokazowe_i_probne/matura-2022-marzec-pokazowa-rozszerzona-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-przykladowy-arkusz-cke-rozszerzona.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/Matematyka_PR/MMAP-R0-100-2203.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Marzec (Pokazowy CKE)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2022_pokazowe_i_probne/matura-2022-marzec-pokazowa-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-przykladowy-arkusz-cke-rozszerzona-odpowiedzi.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/Matematyka_PR/MMAP-R0-100-200-300-400-660-700-Q00-2203-zasady.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Wrzesień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2022_pokazowe_i_probne/matura-2022-wrzesien-diagnostyczna-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2022-wrzesien-probna-podstawowa.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Wrzesień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2022_pokazowe_i_probne/matura-2022-wrzesien-diagnostyczna-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2022-wrzesien-probna-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2022_pokazowe_i_probne/matura-2022-grudzien-diagnostyczna-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2022-grudzien-probna-podstawowa.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2022_pokazowe_i_probne/matura-2022-grudzien-diagnostyczna-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2022-grudzien-probna-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2022_pokazowe_i_probne/matura-2022-grudzien-diagnostyczna-rozszerzona-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2022-grudzien-probna-rozszerzona.pdf'
    ]
  },
  {
    category: '2022',
    year: '2022',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2022_pokazowe_i_probne/matura-2022-grudzien-diagnostyczna-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2022-grudzien-probna-rozszerzona-odpowiedzi.pdf'
    ]
  },

  // 4. Rocznik 2023
  {
    category: '2023',
    year: '2023',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2023/matura-2023-maj-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-maj-matura-podstawowa.pdf',
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Matematyka/poziom_podstawowy/MMAP-P0-100-2305-arkusz.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2023/matura-2023-maj-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-maj-matura-podstawowa-odpowiedzi.pdf',
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Matematyka/poziom_podstawowy/MMAP-P0-100-2305-zasady.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2023/matura-2023-maj-rozszerzona-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-maj-matura-rozszerzona.pdf',
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Matematyka/poziom_rozszerzony/MMAP-R0-100-2305-arkusz.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2023/matura-2023-maj-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-maj-matura-rozszerzona-odpowiedzi.pdf',
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Matematyka/poziom_rozszerzony/MMAP-R0-100-2305-zasady.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Czerwiec (Dodatkowa)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2023/matura-2023-czerwiec-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-czerwiec-matura-podstawowa.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Czerwiec (Dodatkowa)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2023/matura-2023-czerwiec-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-czerwiec-matura-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Czerwiec (Dodatkowa)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2023/matura-2023-czerwiec-rozszerzona-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-czerwiec-matura-rozszerzona.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Czerwiec (Dodatkowa)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2023/matura-2023-czerwiec-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-czerwiec-matura-rozszerzona-odpowiedzi.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Sierpień (Poprawkowa)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2023/matura-2023-sierpien-poprawkowa-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-sierpien-poprawkowa-podstawowa.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Sierpień (Poprawkowa)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2023/matura-2023-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2023/matura-2023-grudzien-diagnostyczna-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-grudzien-probna-podstawowa.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/diagnostyczne_12_23/matematyka/MMAP-P0-100-2312-arkusz.pdf'
    ]
  },
  {
    category: '2023',
    year: '2023',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2023/matura-2023-grudzien-diagnostyczna-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2023-grudzien-probna-podstawowa-odpowiedzi.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/diagnostyczne_12_23/matematyka/MMAP-P0-100-200-300-400-660-Q00-K00-MMAU-100-2312-zasady.pdf'
    ]
  },

  // 5. Rocznik 2024
  {
    category: '2024',
    year: '2024',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2024/matura-2024-maj-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-maj-matura-podstawowa.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Matematyka/poziom_podstawowy/MMAP-P0-100-A-2405-arkusz.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2024/matura-2024-maj-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-maj-matura-podstawowa-odpowiedzi.pdf',
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Matematyka/poziom_podstawowy/MMAP-P0-100-2405-zasady.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2024/matura-2024-maj-rozszerzona-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-maj-matura-rozszerzona.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Matematyka/poziom_rozszerzony/MMAP-R0-100-A-2405-arkusz.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2024/matura-2024-maj-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-maj-matura-rozszerzona-odpowiedzi.pdf',
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Matematyka/poziom_rozszerzony/MMAP-R0-100-2405-zasady.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Czerwiec (Dodatkowa)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2024/matura-2024-czerwiec-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-podstawowa.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Czerwiec (Dodatkowa)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2024/matura-2024-czerwiec-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Czerwiec (Dodatkowa)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2024/matura-2024-czerwiec-rozszerzona-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-rozszerzona.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Czerwiec (Dodatkowa)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2024/matura-2024-czerwiec-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-rozszerzona-odpowiedzi.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Sierpień (Poprawkowa)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2024/matura-2024-sierpien-poprawkowa-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-sierpien-poprawkowa-podstawowa.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Sierpień (Poprawkowa)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2024/matura-2024-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2024/matura-2024-grudzien-diagnostyczna-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-grudzien-probna-podstawowa.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Probny/2024/Matematyka/poziom_podstawowy/MMAP-P0-100-A-2412-arkusz.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2024/matura-2024-grudzien-diagnostyczna-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-grudzien-probna-podstawowa-odpowiedzi.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Probny/2024/Matematyka/poziom_podstawowy/MMAP-P0-100-200-300-400-700-Q00-K00-MMAU-2412-zasady.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2024/matura-2024-grudzien-diagnostyczna-rozszerzona-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-grudzien-probna-rozszerzona.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Probny/2024/Matematyka/poziom_rozszerzony/MMAP-R0-100-A-2412-arkusz.pdf'
    ]
  },
  {
    category: '2024',
    year: '2024',
    session: 'Grudzień (Diagnostyczna CKE)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2024/matura-2024-grudzien-diagnostyczna-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2024-grudzien-probna-rozszerzona-odpowiedzi.pdf',
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Probny/2024/Matematyka/poziom_rozszerzony/MMAP-R0-100-200-300-400-700-Q00-K00-2412-zasady.pdf'
    ]
  },

  // 6. Rocznik 2025
  {
    category: '2025',
    year: '2025',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2025/matura-2025-maj-podstawowa-arkusz.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/Matematyka/poziom_podstawowy/MMAP-P0-100-A-2505-arkusz.pdf',
      'https://arkusze.pl/maturalne/matematyka-2025-maj-matura-podstawowa.pdf'
    ]
  },
  {
    category: '2025',
    year: '2025',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2025/matura-2025-maj-podstawowa-odpowiedzi.pdf',
    urls: [
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/zasady_oceniania/MMAP-P0-100-2505-zasady.pdf',
      'https://arkusze.pl/maturalne/matematyka-2025-maj-matura-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2025',
    year: '2025',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2025/matura-2025-maj-rozszerzona-arkusz.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/Matematyka/poziom_rozszerzony/MMAP-R0-100-A-2505-arkusz.pdf',
      'https://arkusze.pl/maturalne/matematyka-2025-maj-matura-rozszerzona.pdf'
    ]
  },
  {
    category: '2025',
    year: '2025',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2025/matura-2025-maj-rozszerzona-odpowiedzi.pdf',
    urls: [
      'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/zasady_oceniania/MMAP-R0-100-2505-zasady.pdf',
      'https://arkusze.pl/maturalne/matematyka-2025-maj-matura-rozszerzona-odpowiedzi.pdf'
    ]
  },
  {
    category: '2025',
    year: '2025',
    session: 'Czerwiec (Dodatkowa)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2025/matura-2025-czerwiec-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2025-czerwiec-matura-podstawowa.pdf'
    ]
  },
  {
    category: '2025',
    year: '2025',
    session: 'Czerwiec (Dodatkowa)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2025/matura-2025-czerwiec-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2025-czerwiec-matura-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2025',
    year: '2025',
    session: 'Sierpień (Poprawkowa)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2025/matura-2025-sierpien-poprawkowa-podstawowa-arkusz.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2025-sierpien-poprawkowa-podstawowa.pdf'
    ]
  },
  {
    category: '2025',
    year: '2025',
    session: 'Sierpień (Poprawkowa)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2025/matura-2025-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://arkusze.pl/maturalne/matematyka-2025-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf'
    ]
  },

  // 7. Rocznik 2026
  {
    category: '2026',
    year: '2026',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'arkusz',
    filename: '2026/matura-2026-maj-podstawowa-arkusz.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Matematyka/poziom_podstawowy/MMAP-P0-100-A-2605-arkusz.pdf',
      'https://arkusze.pl/maturalne/matematyka-2026-maj-matura-podstawowa.pdf'
    ]
  },
  {
    category: '2026',
    year: '2026',
    session: 'Maj (Główna)',
    level: 'podstawowy',
    type: 'odpowiedzi',
    filename: '2026/matura-2026-maj-podstawowa-odpowiedzi.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Matematyka/poziom_podstawowy/MMAP-P0-100-2605-zasady.pdf',
      'https://arkusze.pl/maturalne/matematyka-2026-maj-matura-podstawowa-odpowiedzi.pdf'
    ]
  },
  {
    category: '2026',
    year: '2026',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'arkusz',
    filename: '2026/matura-2026-maj-rozszerzona-arkusz.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Matematyka/poziom_rozszerzony/MMAP-R0-100-A-2605-arkusz.pdf',
      'https://arkusze.pl/maturalne/matematyka-2026-maj-matura-rozszerzona.pdf'
    ]
  },
  {
    category: '2026',
    year: '2026',
    session: 'Maj (Główna)',
    level: 'rozszerzony',
    type: 'odpowiedzi',
    filename: '2026/matura-2026-maj-rozszerzona-odpowiedzi.pdf',
    urls: [
      'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Matematyka/poziom_rozszerzony/MMAP-R0-100-2605-zasady.pdf',
      'https://arkusze.pl/maturalne/matematyka-2026-maj-matura-rozszerzona-odpowiedzi.pdf'
    ]
  }
];

async function downloadFileWithFallbacks(item) {
  const destPath = path.join(ROOT_DIR, item.filename);
  const destDir = path.dirname(destPath);
  fs.mkdirSync(destDir, { recursive: true });

  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
    const head = Buffer.alloc(5);
    const fd = fs.openSync(destPath, 'r');
    fs.readSync(fd, head, 0, 5, 0);
    fs.closeSync(fd);
    if (head.toString().startsWith('%PDF')) {
      return { success: true, cached: true, size: fs.statSync(destPath).size, path: destPath };
    }
  }

  for (const url of item.urls) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/pdf,*/*'
          },
          redirect: 'follow'
        });

        if (!res.ok) {
          // not found or error, continue
          break;
        }

        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (buffer.length < 5000) {
          // Too small, probably an error page or redirect stub
          break;
        }

        // Validate PDF signature
        if (buffer.subarray(0, 4).toString() !== '%PDF') {
          break;
        }

        fs.writeFileSync(destPath, buffer);
        return { success: true, cached: false, size: buffer.length, path: destPath, usedUrl: url };
      } catch (err) {
        if (attempt === 3) {
          // failed all attempts for this url
        }
      }
    }
  }

  return { success: false, path: destPath, triedUrls: item.urls };
}

async function run() {
  console.log(`Starting download of ${DOWNLOAD_ITEMS.length} items to ${ROOT_DIR}...`);
  fs.mkdirSync(ROOT_DIR, { recursive: true });

  const manifest = [];
  let successful = 0;
  let failed = 0;

  for (let i = 0; i < DOWNLOAD_ITEMS.length; i++) {
    const item = DOWNLOAD_ITEMS[i];
    process.stdout.write(`[${i + 1}/${DOWNLOAD_ITEMS.length}] Downloading ${path.basename(item.filename)}... `);
    const result = await downloadFileWithFallbacks(item);
    
    if (result.success) {
      successful++;
      const sizeKB = Math.round(result.size / 1024);
      console.log(`OK (${sizeKB} KB) ${result.cached ? '[cached]' : ''}`);
      manifest.push({
        ...item,
        status: 'OK',
        sizeBytes: result.size,
        sizeFormatted: `${sizeKB} KB`,
        localRelativePath: item.filename.replace(/\\/g, '/'),
        downloadedFrom: result.usedUrl || item.urls[0]
      });
    } else {
      failed++;
      console.log(`FAILED`);
      manifest.push({
        ...item,
        status: 'FAILED',
        error: 'Could not fetch from any source URL'
      });
    }
  }

  console.log(`\n========================================`);
  console.log(`SUMMARY: ${successful} succeeded, ${failed} failed.`);

  // Write manifest.json
  const manifestPath = path.join(ROOT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Manifest written to: ${manifestPath}`);

  // Generate README.md
  generateReadme(manifest);
}

function generateReadme(manifest) {
  const readmePath = path.join(ROOT_DIR, 'README.md');
  let md = `# Baza Oficjalnych Materiałów i Matur z Matematyki CKE (Formuła 2023)\n\n`;
  md += `Niniejsze repozytorium zawiera zbiór oficjalnych arkuszy maturalnych, kluczy odpowiedzi, informatorów i karty wzorów dla **obecnej podstawy programowej (Formuła 2023)**.\n\n`;
  md += `Materiały te stanowią fundament do budowy bazy zadań platformy edukacyjnej **JASNE**.\n\n`;

  md += `## 📑 Spis Treści\n`;
  md += `- [1. Obowiązujące Tablice Wzorów](#1-obowiązujące-tablice-wzorów)\n`;
  md += `- [2. Informatory i Zbiory Zadań CKE](#2-informatory-i-zbiory-zadań-cke)\n`;
  md += `- [3. Rocznik 2022 (Arkusze Pokazowe i Diagnostyczne)](#3-rocznik-2022-arkusze-pokazowe-i-diagnostyczne)\n`;
  md += `- [4. Rocznik 2023](#4-rocznik-2023)\n`;
  md += `- [5. Rocznik 2024](#5-rocznik-2024)\n`;
  md += `- [6. Rocznik 2025](#6-rocznik-2025)\n`;
  md += `- [7. Rocznik 2026](#7-rocznik-2026)\n\n`;

  const groups = [
    { key: 'tablice_wzorow', title: '1. Obowiązujące Tablice Wzorów' },
    { key: 'informatory_i_zbiory_zadan', title: '2. Informatory i Zbiory Zadań CKE' },
    { key: '2022', title: '3. Rocznik 2022 (Arkusze Pokazowe i Diagnostyczne)' },
    { key: '2023', title: '4. Rocznik 2023' },
    { key: '2024', title: '5. Rocznik 2024' },
    { key: '2025', title: '6. Rocznik 2025' },
    { key: '2026', title: '7. Rocznik 2026' }
  ];

  for (const { key: catKey, title: catTitle } of groups) {
    md += `## ${catTitle}\n\n`;
    const items = manifest.filter(m => m.category === catKey);
    if (items.length === 0) {
      md += `*Brak materiałów w tej kategorii.*\n\n`;
      continue;
    }

    md += `| Tytuł / Sesja | Poziom | Typ | Rozmiar | Plik Lokalny |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    for (const it of items) {
      const title = it.title || `${it.session || ''} (${it.year})`;
      const fileLink = it.status === 'OK' ? `[\`${path.basename(it.filename)}\`](./${it.localRelativePath})` : '*Niepobrany*';
      md += `| **${title}** | \`${it.level}\` | \`${it.type}\` | ${it.sizeFormatted || '-'} | ${fileLink} |\n`;
    }
    md += `\n`;
  }

  fs.writeFileSync(readmePath, md, 'utf-8');
  console.log(`README.md written to: ${readmePath}`);
}

run();
