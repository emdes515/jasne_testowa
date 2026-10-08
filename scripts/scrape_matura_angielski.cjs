const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_DIR = path.resolve(__dirname, '..', 'matura_angielski_podstawowy');

const TARGETS = [
  // INFORMATORY I DOKUMENTY RAMOWE
  {
    folder: 'Informatory_i_Wymagania',
    sessionName: 'Informatory CKE Formuła 2023',
    files: [
      {
        name: 'Informator_EM2023_jezyk_angielski.pdf',
        url: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informatory/Informator_EM2023_jezyk_angielski.pdf',
        type: 'informator',
        desc: 'Oficjalny informator maturalny CKE o egzaminie z języka angielskiego od roku szkolnego 2022/2023'
      },
      {
        name: 'Informator_EM_2024_angielski.pdf',
        url: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informatory/2024/Informator_EM_2024_angielski.pdf',
        type: 'informator',
        desc: 'Informator maturalny CKE z języka angielskiego na rok 2024'
      }
    ]
  },

  // 2022 - MATERIAŁY WSTĘPNE I PRÓBNE
  {
    folder: path.join('2022_Materialy_Wstepne', '2022_03_pokazowa'),
    sessionName: 'Arkusz Pokazowy CKE (Marzec 2022)',
    files: [
      {
        name: 'angielski-2022-marzec-pokazowa-podstawowa.pdf',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/angielski/MJAP-P0-100-2203.pdf',
        type: 'arkusz',
        desc: 'Arkusz pokazowy CKE marzec 2022 (poziom podstawowy, Formuła 2023)'
      },
      {
        name: 'angielski-2022-marzec-pokazowa-podstawowa-transkrypcja.pdf',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/angielski/MJAP-P0-100-200-400-660-Q00-2203-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań do arkusza pokazowego marzec 2022'
      },
      {
        name: 'angielski-2022-marzec-pokazowa-podstawowa-zasady.pdf',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/angielski/MJAP-P0-100-200-400-660-Q00-2203-zasady.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania rozwiązań zadań arkusza pokazowego marzec 2022'
      },
      {
        name: 'angielski-2022-marzec-pokazowa-podstawowa-nagrania.mp3',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/pokazowe/angielski/MJAP-P0-100-2203.mp3',
        type: 'audio',
        desc: 'Plik audio do zadań ze słuchu arkusza pokazowego marzec 2022'
      }
    ]
  },
  {
    folder: path.join('2022_Materialy_Wstepne', '2022_09_probna'),
    sessionName: 'Diagnoza Maturalna CKE (Wrzesień 2022)',
    files: [
      {
        name: 'angielski-2022-wrzesien-probna-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2022-wrzesien-probna-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz diagnostyczny CKE wrzesień 2022 (poziom podstawowy)'
      },
      {
        name: 'angielski-2022-wrzesien-probna-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2022-wrzesien-probna-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań diagnozy wrzesień 2022'
      },
      {
        name: 'angielski-2022-wrzesien-probna-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2022-wrzesien-probna-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania diagnozy wrzesień 2022'
      }
    ]
  },
  {
    folder: path.join('2022_Materialy_Wstepne', '2022_12_probna'),
    sessionName: 'Próbna Matura CKE (Grudzień 2022)',
    files: [
      {
        name: 'angielski-2022-grudzien-probna-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2022-grudzien-probna-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz próbny CKE grudzień 2022'
      },
      {
        name: 'angielski-2022-grudzien-probna-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2022-grudzien-probna-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań do matury próbnej grudzień 2022'
      },
      {
        name: 'angielski-2022-grudzien-probna-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2022-grudzien-probna-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania do matury próbnej grudzień 2022'
      }
    ]
  },

  // 2023
  {
    folder: path.join('2023', '2023_05_maj'),
    sessionName: 'Matura Maj 2023 (Sesja Główna)',
    files: [
      {
        name: 'angielski-2023-maj-matura-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-maj-matura-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Oficjalny arkusz egzaminacyjny matury maj 2023'
      },
      {
        name: 'angielski-2023-maj-matura-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-maj-matura-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury maj 2023'
      },
      {
        name: 'angielski-2023-maj-matura-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-maj-matura-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania / klucz matury maj 2023'
      }
    ]
  },
  {
    folder: path.join('2023', '2023_06_czerwiec'),
    sessionName: 'Matura Czerwiec 2023 (Termin Dodatkowy)',
    files: [
      {
        name: 'angielski-2023-czerwiec-matura-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-czerwiec-matura-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz egzaminacyjny matury czerwiec 2023'
      },
      {
        name: 'angielski-2023-czerwiec-matura-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-czerwiec-matura-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury czerwiec 2023'
      },
      {
        name: 'angielski-2023-czerwiec-matura-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-czerwiec-matura-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury czerwiec 2023'
      }
    ]
  },
  {
    folder: path.join('2023', '2023_08_sierpien_poprawkowa'),
    sessionName: 'Matura Sierpień 2023 (Sesja Poprawkowa)',
    files: [
      {
        name: 'angielski-2023-sierpien-poprawkowa-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-sierpien-poprawkowa-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz egzaminacyjny matury poprawkowej sierpień 2023'
      },
      {
        name: 'angielski-2023-sierpien-poprawkowa-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-sierpien-poprawkowa-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury poprawkowej sierpień 2023'
      },
      {
        name: 'angielski-2023-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury poprawkowej sierpień 2023'
      }
    ]
  },
  {
    folder: path.join('2023', '2023_12_probna'),
    sessionName: 'Próbna Matura Diagnostyczna CKE (Grudzień 2023)',
    files: [
      {
        name: 'angielski-2023-grudzien-probna-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-grudzien-probna-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz diagnostyczny CKE grudzień 2023'
      },
      {
        name: 'angielski-2023-grudzien-probna-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-grudzien-probna-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań diagnozy grudzień 2023'
      },
      {
        name: 'angielski-2023-grudzien-probna-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2023-grudzien-probna-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania diagnozy grudzień 2023'
      },
      {
        name: 'angielski-2023-grudzien-probna-podstawowa-nagrania.mp3',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/diagnostyczne_12_23/angielski/MJAP-P0-100-2312.mp3',
        type: 'audio',
        desc: 'Plik audio do zadań ze słuchu grudzień 2023'
      }
    ]
  },

  // 2024
  {
    folder: path.join('2024', '2024_05_maj'),
    sessionName: 'Matura Maj 2024 (Sesja Główna)',
    files: [
      {
        name: 'angielski-2024-maj-matura-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-maj-matura-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Oficjalny arkusz egzaminacyjny matury maj 2024'
      },
      {
        name: 'angielski-2024-maj-matura-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-maj-matura-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury maj 2024'
      },
      {
        name: 'angielski-2024-maj-matura-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-maj-matura-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury maj 2024'
      }
    ]
  },
  {
    folder: path.join('2024', '2024_06_czerwiec'),
    sessionName: 'Matura Czerwiec 2024 (Termin Dodatkowy)',
    files: [
      {
        name: 'angielski-2024-czerwiec-matura-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-czerwiec-matura-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz egzaminacyjny matury czerwiec 2024'
      },
      {
        name: 'angielski-2024-czerwiec-matura-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-czerwiec-matura-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury czerwiec 2024'
      },
      {
        name: 'angielski-2024-czerwiec-matura-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-czerwiec-matura-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury czerwiec 2024'
      }
    ]
  },
  {
    folder: path.join('2024', '2024_08_sierpien_poprawkowa'),
    sessionName: 'Matura Sierpień 2024 (Sesja Poprawkowa)',
    files: [
      {
        name: 'angielski-2024-sierpien-poprawkowa-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-sierpien-poprawkowa-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz egzaminacyjny matury poprawkowej sierpień 2024'
      },
      {
        name: 'angielski-2024-sierpien-poprawkowa-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-sierpien-poprawkowa-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury poprawkowej sierpień 2024'
      },
      {
        name: 'angielski-2024-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury poprawkowej sierpień 2024'
      }
    ]
  },
  {
    folder: path.join('2024', '2024_12_probna'),
    sessionName: 'Próbna Matura Diagnostyczna CKE (Grudzień 2024)',
    files: [
      {
        name: 'angielski-2024-grudzien-probna-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-grudzien-probna-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz diagnostyczny CKE grudzień 2024'
      },
      {
        name: 'angielski-2024-grudzien-probna-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-grudzien-probna-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań diagnozy grudzień 2024'
      },
      {
        name: 'angielski-2024-grudzien-probna-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2024-grudzien-probna-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania diagnozy grudzień 2024'
      },
      {
        name: 'angielski-2024-grudzien-probna-podstawowa-nagrania.mp3',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Probny/2024/Jezyk_angielski/poziom_podstawowy/MJA-P-100-2412.mp3',
        type: 'audio',
        desc: 'Plik audio do zadań ze słuchu grudzień 2024'
      }
    ]
  },

  // 2025
  {
    folder: path.join('2025', '2025_05_maj'),
    sessionName: 'Matura Maj 2025 (Sesja Główna)',
    files: [
      {
        name: 'angielski-2025-maj-matura-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-maj-matura-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Oficjalny arkusz egzaminacyjny matury maj 2025'
      },
      {
        name: 'angielski-2025-maj-matura-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-maj-matura-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury maj 2025'
      },
      {
        name: 'angielski-2025-maj-matura-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-maj-matura-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury maj 2025'
      }
    ]
  },
  {
    folder: path.join('2025', '2025_06_czerwiec'),
    sessionName: 'Matura Czerwiec 2025 (Termin Dodatkowy)',
    files: [
      {
        name: 'angielski-2025-czerwiec-matura-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-czerwiec-matura-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz egzaminacyjny matury czerwiec 2025'
      },
      {
        name: 'angielski-2025-czerwiec-matura-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-czerwiec-matura-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury czerwiec 2025'
      },
      {
        name: 'angielski-2025-czerwiec-matura-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-czerwiec-matura-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury czerwiec 2025'
      }
    ]
  },
  {
    folder: path.join('2025', '2025_08_sierpien_poprawkowa'),
    sessionName: 'Matura Sierpień 2025 (Sesja Poprawkowa)',
    files: [
      {
        name: 'angielski-2025-sierpien-poprawkowa-podstawowa.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-sierpien-poprawkowa-podstawowa.pdf',
        type: 'arkusz',
        desc: 'Arkusz egzaminacyjny matury poprawkowej sierpień 2025'
      },
      {
        name: 'angielski-2025-sierpien-poprawkowa-podstawowa-transkrypcja.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-sierpien-poprawkowa-podstawowa-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań matury poprawkowej sierpień 2025'
      },
      {
        name: 'angielski-2025-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
        url: 'https://arkusze.pl/maturalne/jezyk-angielski-2025-sierpien-poprawkowa-podstawowa-odpowiedzi.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania matury poprawkowej sierpień 2025'
      }
    ]
  },

  // 2026 - NAJNOWSZE MATERIAŁY PRÓBNE CKE
  {
    folder: path.join('2026_Probne', '2026_03_probna'),
    sessionName: 'Próbny Egzamin Maturalny CKE (Marzec 2026)',
    files: [
      {
        name: 'angielski-2026-marzec-probna-podstawowa.pdf',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/probny_egzamin/2026_marzec/Jezyk_angielski/MJAP-P0-100-A-2601-arkusz.pdf',
        type: 'arkusz',
        desc: 'Arkusz egzaminacyjny próbnej matury CKE marzec 2026'
      },
      {
        name: 'angielski-2026-marzec-probna-podstawowa-transkrypcja.pdf',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/probny_egzamin/2026_marzec/Jezyk_angielski/MJAP-P0-100-2601-transkrypcja.pdf',
        type: 'transkrypcja',
        desc: 'Transkrypcja nagrań próbnej matury marzec 2026'
      },
      {
        name: 'angielski-2026-marzec-probna-podstawowa-zasady.pdf',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/probny_egzamin/2026_marzec/Jezyk_angielski/MJAP-P0-100-2601-zasady.pdf',
        type: 'odpowiedzi',
        desc: 'Zasady oceniania próbnej matury marzec 2026'
      },
      {
        name: 'angielski-2026-marzec-probna-podstawowa-nagrania.mp3',
        url: 'http://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/materialy_dodatkowe/probny_egzamin/2026_marzec/Jezyk_angielski/MJAP-P-100-2601.mp3',
        type: 'audio',
        desc: 'Plik audio do zadań ze słuchu marzec 2026'
      }
    ]
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return resolve(downloadFile(redirectUrl, destPath));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    req.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout for ${url}`));
    });
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function run() {
  console.log('================================================================');
  console.log('   SCRAPER MATUR Z JĘZYKA ANGIELSKIEGO (FORMUŁA 2023)');
  console.log('   Docelowy katalog: ' + BASE_DIR);
  console.log('================================================================\n');

  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    formula: 'Formuła 2023 (Nowa Matura)',
    subject: 'Język angielski',
    level: 'Poziom podstawowy',
    sessions: []
  };

  let totalDownloaded = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  let totalBytes = 0;

  for (const session of TARGETS) {
    const sessionDir = path.join(BASE_DIR, session.folder);
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }

    console.log(`\n📁 [${session.sessionName}] -> ${session.folder}`);

    const sessionManifest = {
      name: session.sessionName,
      folder: session.folder,
      files: []
    };

    for (const file of session.files) {
      const destFile = path.join(sessionDir, file.name);
      let downloadedNow = false;

      if (fs.existsSync(destFile)) {
        const stat = fs.statSync(destFile);
        if (stat.size > 1024) {
          console.log(`  ⏩ Istnieje (${formatBytes(stat.size)}): ${file.name}`);
          totalSkipped++;
          totalBytes += stat.size;
          sessionManifest.files.push({
            name: file.name,
            sizeBytes: stat.size,
            sizeFormatted: formatBytes(stat.size),
            type: file.type,
            desc: file.desc,
            sourceUrl: file.url
          });
          continue;
        }
      }

      console.log(`  ⬇️ Pobieranie: ${file.name}...`);
      try {
        await downloadFile(file.url, destFile);
        const stat = fs.statSync(destFile);
        // Verify minimum size
        if (stat.size < 1024) {
          throw new Error(`Plik zbyt mały (${stat.size} B) - możliwy błąd serwera`);
        }
        console.log(`  ✅ Zapisano (${formatBytes(stat.size)}): ${file.name}`);
        totalDownloaded++;
        totalBytes += stat.size;
        sessionManifest.files.push({
          name: file.name,
          sizeBytes: stat.size,
          sizeFormatted: formatBytes(stat.size),
          type: file.type,
          desc: file.desc,
          sourceUrl: file.url
        });
      } catch (err) {
        console.error(`  ❌ Błąd pobierania ${file.name}: ${err.message}`);
        totalFailed++;
        sessionManifest.files.push({
          name: file.name,
          error: err.message,
          type: file.type,
          desc: file.desc,
          sourceUrl: file.url
        });
      }

      // Grzeczna pauza
      await new Promise(r => setTimeout(r, 400));
    }

    manifest.sessions.push(sessionManifest);
  }

  // Zapisz manifest.json
  const manifestPath = path.join(BASE_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n💾 Zapisano manifest: ${manifestPath}`);

  // Wygeneruj czytelny INDEX.md
  let indexMd = `# Repozytorium Matur z Języka Angielskiego – Poziom Podstawowy (Formuła 2023)

Pobrano z oficjalnych baz Centralnej Komisji Egzaminacyjnej (CKE) oraz arkusze.pl.
Zawiera komplet arkuszy, zasad oceniania, transkrypcji oraz nagrań do zadań z rozumienia ze słuchu.

* **Data generacji**: ${new Date().toLocaleDateString('pl-PL')} ${new Date().toLocaleTimeString('pl-PL')}
* **Liczba sesji egzaminacyjnych**: ${manifest.sessions.length}
* **Łączny rozmiar materiałów**: ${formatBytes(totalBytes)}
* **Status pobierania**: ${totalDownloaded} pobranych nowo, ${totalSkipped} pominiętych (istniejących), ${totalFailed} błędów.

---

## Wykaz Materiałów i Struktura Katalogów

`;

  for (const s of manifest.sessions) {
    indexMd += `### 📁 ${s.name}\n`;
    indexMd += `*Katalog: \`${s.folder}\`*\n\n`;
    indexMd += `| Plik | Typ | Rozmiar | Źródło |\n`;
    indexMd += `| :--- | :--- | :--- | :--- |\n`;
    for (const f of s.files) {
      if (f.error) {
        indexMd += `| ⚠️ **${f.name}** | ${f.type} | BŁĄD: ${f.error} | [Link](${f.sourceUrl}) |\n`;
      } else {
        indexMd += `| 📄 **${f.name}** | \`${f.type}\` | ${f.sizeFormatted} | [CKE / Arkusze](${f.sourceUrl}) |\n`;
      }
    }
    indexMd += `\n---\n\n`;
  }

  const indexPath = path.join(BASE_DIR, 'INDEX.md');
  fs.writeFileSync(indexPath, indexMd, 'utf8');
  console.log(`📖 Zapisano katalog główny: ${indexPath}`);

  console.log('\n================================================================');
  console.log(`PODSUMOWANIE: ${totalDownloaded} pobrano, ${totalSkipped} pominięto, ${totalFailed} błędów.`);
  console.log(`Łączna objętość danych: ${formatBytes(totalBytes)}`);
  console.log('================================================================\n');
}

run().catch(console.error);
