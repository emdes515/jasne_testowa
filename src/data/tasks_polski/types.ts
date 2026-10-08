import { PolishTask, PolishEpoch, PolishPartNumber, PolishTaskType } from '../../types/maturaTypes';

export type GranularTaskType =
  // Część I: Język polski w użyciu (280 zadań)
  | 'T1_prawda_falsz_nieliteracki'        // 50 zadań
  | 'T2_wyjasnienie_metafory_sensu'       // 50 zadań
  | 'T3_funkcje_jezykowe'                 // 40 zadań
  | 'T4_srodki_retoryczne_stylistyczne'   // 45 zadań
  | 'T5_konfrontacja_stanowisk'           // 45 zadań
  | 'T6_notatka_syntetyzujaca'            // 50 zadań
  // Część II: Test historycznoliteracki (460 zadań)
  | 'T7_ocena_postawy_bohatera'           // 90 zadań
  | 'T8_analiza_fragmentu_symboliki'      // 90 zadań
  | 'T9_ikonografia_dzielo_sztuki'        // 45 zadań
  | 'T10_prawda_falsz_lektura'            // 55 zadań
  | 'T11_tabela_syntetyczna_dopasowanie'  // 50 zadań
  | 'T12_topos_pojecie_epoki'             // 45 zadań
  | 'T13_cechy_pradu_epoki'               // 45 zadań
  | 'T14_zestawienie_komparatystyczne'    // 40 zadań
  // Część III: Warsztat wypracowania (60 zadań)
  | 'T15_formulowanie_tezy'               // 15 zadań
  | 'T16_dobor_lektury_argumentacja'      // 15 zadań
  | 'T17_dobor_kontekstu'                 // 15 zadań
  | 'T18_konspekt_rozprawki';             // 15 zadań

export interface Task800Item extends PolishTask {
  granularType: GranularTaskType;
  tags?: string[];
  difficulty?: 'podstawowa' | 'srednia' | 'zaawansowana';
  sourceCkeSession?: string;
}
