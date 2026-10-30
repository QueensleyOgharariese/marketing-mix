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

// Tutti gli strumenti di tutte le simulazioni (gli id sono unici): servono alla guida per dire "si fa in…"
export const STRUMENTI: Record<string, Strumento> = {
  // SEO
  console: { nome: "Console di ricerca", link: "/app/percorsi/seo/strumenti/console/" },
  indicizzazione: { nome: "Pagine e indicizzazione", link: "/app/percorsi/seo/strumenti/indicizzazione/" },
  keyword: { nome: "Ricerca keyword", link: "/app/percorsi/seo/strumenti/keyword/" },
  crawler: { nome: "Crawler", link: "/app/percorsi/seo/strumenti/crawler/" },
  statistiche: { nome: "Statistiche", link: "/app/percorsi/seo/strumenti/statistiche/" },
  negozio: { nome: "Il negozio", link: "/app/negozio/" },
  pannello: { nome: "Pannello del negozio", link: "/app/percorsi/seo/pannello/" },
  // Social
  profilo: { nome: "Il profilo", link: "/app/simulazioni/social/profilo/" },
  insight: { nome: "Statistiche dei post", link: "/app/simulazioni/social/statistiche/" },
  calendario: { nome: "Calendario e post", link: "/app/simulazioni/social/calendario/" },
  community: { nome: "Commenti e messaggi", link: "/app/simulazioni/social/community/" },
  libreria: { nome: "Libreria foto e musica", link: "/app/simulazioni/social/libreria/" },
  // SEA
  campagne: { nome: "Campagne", link: "/app/simulazioni/sea/campagne/" },
  termini: { nome: "Termini di ricerca", link: "/app/simulazioni/sea/termini/" },
  pianificatore: { nome: "Pianificatore keyword", link: "/app/simulazioni/sea/pianificatore/" },
  rendimento: { nome: "Rendimento sul sito", link: "/app/simulazioni/sea/rendimento/" },
  // Brand
  manuale: { nome: "Manuale del brand", link: "/app/simulazioni/brand/manuale/" },
  ricerche: { nome: "Ricerche sul brand", link: "/app/simulazioni/brand/ricerche/" },
  testi: { nome: "Testi del brand", link: "/app/simulazioni/brand/testi/" },
  piano: { nome: "Piano di brand", link: "/app/simulazioni/brand/piano/" },
  stampa: { nome: "Ufficio stampa", link: "/app/simulazioni/brand/stampa/" },
};

type Config = { dati: { livelli: any[]; missioni: any[] }; chiave: string; ripristina?: (parti: any) => void; base: string; nome: string };

export function creaMotore(conf: Config) {
  const TUTTE = conf.dati.missioni as Missione[];
  const TUTORIAL = TUTTE.find((m) => m.id === "tutorial")!;
  const MISSIONI = TUTTE.filter((m) => m.id !== "tutorial");
  const LIVELLI = conf.dati.livelli as { n: number; nome: string; cosa: string }[];
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
  const linkPasso = (p: Passo) => p.vai?.link ?? p.pagina ?? STRUMENTI[p.strumento]?.link ?? `${conf.base}/`;
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

  return { nome: conf.nome, base: conf.base, TUTTE, TUTORIAL, MISSIONI, LIVELLI, STRUMENTI, etichetta, leggiStato, salvaStato, fatta, tutorialFatto, livelloAperto, sbloccata, consigliata, saltaTutorial, linkPasso, avvia, ricomincia, controlla, punti };
}
export type Motore = ReturnType<typeof creaMotore>;
