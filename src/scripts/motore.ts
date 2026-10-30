// MOTORE DELLE SIMULAZIONI (comune a SEO, Social e alle prossime)
// Ogni simulazione ha: un file di esercizi (livelli + missioni), una chiave per salvare i progressi nel browser
// e una funzione che riporta com'erano le parti del sito usate da un esercizio (campo "prepara").
// creaMotore() restituisce tutte le funzioni per leggere lo stato, avviare, controllare e dare i punti.
// Livelli: 0 Tutorial, 1 Basi, 2 Diagnosi, 3 Casi. Un livello si apre quando è finito quello prima.

export type Opzione = { id: string; testo: string; giusta: boolean; nota: string };
// tipo: "radio" o "checkbox" = si sceglie una risposta; "azione" = si lavora sul sito e la guida controlla com'è adesso;
// "testo" = si scrive nella guida e la guida lo controlla; "info" = solo da leggere (tutorial).
// consegna: cosa fare, senza la soluzione. negozio: dove vedere il risultato. parole: [minimo, massimo] per i testi.
export type Passo = { strumento: string; pagina?: string; domanda: string; consegna?: string; spiega: string; esempio: string; errore?: string; compito?: string; come?: string[]; negozio?: string; parole?: number[]; tipo: "radio" | "checkbox" | "azione" | "testo" | "info"; opzioni: Opzione[]; perche: string; aiuto: string; dove: string; verifica?: string; vai?: { link: string; testo: string } };
export type Missione = { id: string; n: number; livello: number; situazione: string; prepara?: any; nome: string; tempo: string; strumenti: string; cosa: string; obiettivo: string; passi: Passo[]; imparato: string[]; elena: string };
export type StatoMissione = { stato: "in-corso" | "completata"; passo: number; errori: number; aiuti: number[]; primoColpo: boolean[] };
export type Stato = { attiva: string | null; missioni: Record<string, StatoMissione> };
export type Strumento = { nome: string; link: string };

import { conLingua, t, EN } from "./lingua";

// Tutti gli strumenti di tutte le simulazioni (gli id sono unici): servono alla guida per dire "si fa in…"
// t(italiano, inglese): il nome nella lingua della pagina (nel browser)
export const STRUMENTI: Record<string, Strumento> = {
  // SEO
  console: { nome: t("Console di ricerca", "Search console"), link: "/app/percorsi/seo/strumenti/console/" },
  indicizzazione: { nome: t("Pagine e indicizzazione", "Pages and indexing"), link: "/app/percorsi/seo/strumenti/indicizzazione/" },
  keyword: { nome: t("Ricerca keyword", "Keyword research"), link: "/app/percorsi/seo/strumenti/keyword/" },
  crawler: { nome: t("Crawler", "Crawler"), link: "/app/percorsi/seo/strumenti/crawler/" },
  statistiche: { nome: t("Statistiche", "Analytics"), link: "/app/percorsi/seo/strumenti/statistiche/" },
  negozio: { nome: t("Il negozio", "The shop"), link: "/app/negozio/" },
  pannello: { nome: t("Pannello del negozio", "Shop admin"), link: "/app/percorsi/seo/pannello/" },
  // Social
  profilo: { nome: t("Il profilo", "The profile"), link: "/app/simulazioni/social/profilo/" },
  insight: { nome: t("Statistiche dei post", "Post insights"), link: "/app/simulazioni/social/statistiche/" },
  calendario: { nome: t("Calendario e post", "Calendar and posts"), link: "/app/simulazioni/social/calendario/" },
  community: { nome: t("Commenti e messaggi", "Comments and messages"), link: "/app/simulazioni/social/community/" },
  libreria: { nome: t("Libreria foto e musica", "Photo and music library"), link: "/app/simulazioni/social/libreria/" },
  // SEA
  campagne: { nome: t("Campagne", "Campaigns"), link: "/app/simulazioni/sea/campagne/" },
  termini: { nome: t("Termini di ricerca", "Search terms"), link: "/app/simulazioni/sea/termini/" },
  pianificatore: { nome: t("Pianificatore keyword", "Keyword planner"), link: "/app/simulazioni/sea/pianificatore/" },
  rendimento: { nome: t("Rendimento sul sito", "Website performance"), link: "/app/simulazioni/sea/rendimento/" },
  // Brand
  manuale: { nome: t("Manuale del brand", "Brand manual"), link: "/app/simulazioni/brand/manuale/" },
  ricerche: { nome: t("Ricerche sul brand", "Brand research"), link: "/app/simulazioni/brand/ricerche/" },
  testi: { nome: t("Testi del brand", "Brand copy"), link: "/app/simulazioni/brand/testi/" },
  piano: { nome: t("Piano di brand", "Brand plan"), link: "/app/simulazioni/brand/piano/" },
  stampa: { nome: t("Ufficio stampa", "Press office"), link: "/app/simulazioni/brand/stampa/" },
};

// datiEn: gli stessi esercizi in inglese (stessa forma, cambiano solo i testi). I progressi restano gli stessi
// nelle due lingue, perché gli id degli esercizi non cambiano.
type Config = { dati: { livelli: any[]; missioni: any[] }; datiEn?: { livelli: any[]; missioni: any[] }; chiave: string; ripristina?: (parti: any) => void; base: string; nome: string };

export function creaMotore(conf: Config) {
  const D = EN && conf.datiEn ? conf.datiEn : conf.dati;
  const TUTTE = D.missioni as Missione[];
  const TUTORIAL = TUTTE.find((m) => m.id === "tutorial")!;
  const MISSIONI = TUTTE.filter((m) => m.id !== "tutorial");
  const LIVELLI = D.livelli as { n: number; nome: string; cosa: string }[];
  const etichetta = (m: Missione) => (m.livello === 0 ? m.nome : `${LIVELLI[m.livello].nome} · ${m.nome}`);

  function leggiStato(): Stato {
    try {
      const s = JSON.parse(localStorage.getItem(conf.chiave) ?? "{}");
      return { attiva: s.attiva ?? null, missioni: s.missioni ?? {} };
    } catch { return { attiva: null, missioni: {} }; }
  }
  function salvaStato(s: Stato) { try { localStorage.setItem(conf.chiave, JSON.stringify(s)); } catch {} }

  const fatta = (s: Stato, m: Missione) => s.missioni[m.id]?.stato === "completata";
  const tutorialFatto = (s: Stato) => fatta(s, TUTORIAL);
  const livelloAperto = (s: Stato, livello: number) => TUTTE.filter((m) => m.livello < livello).every((m) => fatta(s, m));
  const sbloccata = (s: Stato, m: Missione) => livelloAperto(s, m.livello);
  const consigliata = (s: Stato) => TUTTE.find((m) => sbloccata(s, m) && !fatta(s, m));
  function saltaTutorial() {
    const s = leggiStato();
    s.missioni.tutorial = { stato: "completata", passo: 0, errori: 0, aiuti: [], primoColpo: [] };
    if (s.attiva === "tutorial") s.attiva = null;
    salvaStato(s);
  }
  // Dove si fa un passo (i passi "testo" si fanno nella guida: si resta nella panoramica degli strumenti)
  // conLingua: nelle pagine inglesi gli indirizzi diventano /en/app/...
  const linkPasso = (p: Passo) => conLingua(p.vai?.link ?? p.pagina ?? STRUMENTI[p.strumento]?.link ?? `${conf.base}/`);
  function avvia(id: string) {
    const s = leggiStato();
    const m = TUTTE.find((x) => x.id === id)!;
    if (!s.missioni[id] || s.missioni[id].stato === "completata") {
      s.missioni[id] = { stato: "in-corso", passo: 0, errori: 0, aiuti: [], primoColpo: [] };
      if (m.prepara && conf.ripristina) conf.ripristina(m.prepara); // le parti usate dall'esercizio ripartono com'erano
    }
    s.attiva = id;
    salvaStato(s);
    return linkPasso(m.passi[s.missioni[id].passo]);
  }
  function ricomincia(id: string) {
    const s = leggiStato();
    delete s.missioni[id];
    salvaStato(s);
    return avvia(id);
  }
  function controlla(p: Passo, scelte: string[]) {
    const giuste = p.opzioni.filter((o) => o.giusta).map((o) => o.id).sort();
    const ok = scelte.length === giuste.length && [...scelte].sort().every((x, i) => x === giuste[i]);
    return { ok, sbagliate: p.opzioni.filter((o) => scelte.includes(o.id) && !o.giusta), mancanti: p.opzioni.filter((o) => o.giusta && !scelte.includes(o.id)) };
  }
  // Punti: 100, meno 10 per ogni risposta sbagliata e 5 per ogni aiuto aperto (minimo 0)
  const punti = (m: StatoMissione) => Math.max(0, 100 - m.errori * 10 - m.aiuti.length * 5);

  // "Simulazione Social" -> "Social Simulation"
  return { nome: EN ? `${conf.nome.replace("Simulazione ", "")} Simulation` : conf.nome, base: conf.base, TUTTE, TUTORIAL, MISSIONI, LIVELLI, STRUMENTI, etichetta, leggiStato, salvaStato, fatta, tutorialFatto, livelloAperto, sbloccata, consigliata, saltaTutorial, linkPasso, avvia, ricomincia, controlla, punti };
}
export type Motore = ReturnType<typeof creaMotore>;
