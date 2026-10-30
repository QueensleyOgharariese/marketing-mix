// ESERCIZI DEL PERCORSO SEO (struttura a livelli): stato salvato nel browser e regole
// Livelli: 0 Tutorial, 1 Basi, 2 Diagnosi, 3 Casi. Un livello si apre quando è finito quello prima;
// dentro un livello l'ordine è libero. Nel codice gli esercizi si chiamano ancora "missioni".
// Lo stato resta solo in questo browser (localStorage).
// Forma: { attiva: "b1" | null, missioni: { b1: { stato, passo, errori, aiuti, primoColpo } } }
import dati from "../data/app/seo-pro/missioni.json";
import { ripristinaParti, type Parti } from "./cms";

export type Opzione = { id: string; testo: string; giusta: boolean; nota: string };
// tipo: "radio" o "checkbox" = si sceglie una risposta; "azione" = si lavora sul sito e la guida controlla com'è adesso;
// "info" = solo spiegazione (usato nel tutorial), si va avanti con "Ho capito".
// come: le istruzioni numerate "Come si fa" (possono contenere link e grassetti).
export type Passo = { strumento: string; pagina?: string; domanda: string; spiega: string; esempio: string; errore?: string; compito: string; come?: string[]; tipo: "radio" | "checkbox" | "azione" | "info"; opzioni: Opzione[]; perche: string; aiuto: string; dove: string; verifica?: string; vai?: { link: string; testo: string } };
// livello: 0-3; n: posizione dentro il livello; situazione: il messaggio di Elena che apre l'esercizio
export type Missione = { id: string; n: number; livello: number; situazione: string; prepara?: Parti; nome: string; tempo: string; strumenti: string; cosa: string; obiettivo: string; passi: Passo[]; imparato: string[]; elena: string };
export type StatoMissione = { stato: "in-corso" | "completata"; passo: number; errori: number; aiuti: number[]; primoColpo: boolean[] };
export type Stato = { attiva: string | null; missioni: Record<string, StatoMissione> };

export const TUTTE = dati.missioni as Missione[]; // tutorial + esercizi, in ordine
export const TUTORIAL = TUTTE.find((m) => m.id === "tutorial")!;
export const MISSIONI = TUTTE.filter((m) => m.id !== "tutorial"); // solo gli esercizi (per contatori e panoramica)
export const LIVELLI = dati.livelli as { n: number; nome: string; cosa: string }[];
// Nome da mostrare nella guida: "Tutorial: come funziona" oppure "Basi · Scrivi una meta description"
export const etichetta = (m: Missione) => (m.livello === 0 ? m.nome : `${LIVELLI[m.livello].nome} · ${m.nome}`);
export const CHIAVE = "marketing-mix-percorso-seo-v2"; // v2: struttura a livelli (la v1 aveva 5 missioni lunghe)

export const STRUMENTI: Record<string, { nome: string; link: string }> = {
  console: { nome: "Console di ricerca", link: "/app/percorsi/seo/strumenti/console/" },
  indicizzazione: { nome: "Pagine e indicizzazione", link: "/app/percorsi/seo/strumenti/indicizzazione/" },
  keyword: { nome: "Ricerca keyword", link: "/app/percorsi/seo/strumenti/keyword/" },
  crawler: { nome: "Crawler", link: "/app/percorsi/seo/strumenti/crawler/" },
  statistiche: { nome: "Statistiche", link: "/app/percorsi/seo/strumenti/statistiche/" },
  negozio: { nome: "Il negozio", link: "/app/negozio/" },
  pannello: { nome: "Pannello del negozio", link: "/app/percorsi/seo/pannello/" },
};

export function leggiStato(): Stato {
  try {
    const s = JSON.parse(localStorage.getItem(CHIAVE) ?? "{}");
    return { attiva: s.attiva ?? null, missioni: s.missioni ?? {} };
  } catch { return { attiva: null, missioni: {} }; }
}
export function salvaStato(s: Stato) {
  try { localStorage.setItem(CHIAVE, JSON.stringify(s)); } catch {}
}

export const fatta = (s: Stato, m: Missione) => s.missioni[m.id]?.stato === "completata";
export const tutorialFatto = (s: Stato) => fatta(s, TUTORIAL);
// Un livello è aperto quando tutti gli esercizi dei livelli sotto sono completati (il tutorial è sempre aperto)
export function livelloAperto(s: Stato, livello: number) {
  return TUTTE.filter((m) => m.livello < livello).every((m) => fatta(s, m));
}
export const sbloccata = (s: Stato, m: Missione) => livelloAperto(s, m.livello);
export function saltaTutorial() {
  const s = leggiStato();
  s.missioni.tutorial = { stato: "completata", passo: 0, errori: 0, aiuti: [], primoColpo: [] };
  if (s.attiva === "tutorial") s.attiva = null;
  salvaStato(s);
}
// Il prossimo esercizio consigliato: il primo aperto e non ancora completato
export const consigliata = (s: Stato) => TUTTE.find((m) => sbloccata(s, m) && !fatta(s, m));

// Indirizzo dove si fa un passo
export const linkPasso = (p: Passo) => p.vai?.link ?? p.pagina ?? STRUMENTI[p.strumento].link;

// Avvia (o riprende) una missione e restituisce dove andare
export function avvia(id: string) {
  const s = leggiStato();
  const m = TUTTE.find((x) => x.id === id)!;
  if (!s.missioni[id] || s.missioni[id].stato === "completata") {
    s.missioni[id] = { stato: "in-corso", passo: 0, errori: 0, aiuti: [], primoColpo: [] };
    if (m.prepara) ripristinaParti(m.prepara); // le pagine dell'esercizio ripartono com'erano all'inizio
  }
  s.attiva = id;
  salvaStato(s);
  return linkPasso(m.passi[s.missioni[id].passo]);
}

// Ricomincia un esercizio da capo (anche se è a metà): punti azzerati e pagine dell'esercizio com'erano
export function ricomincia(id: string) {
  const s = leggiStato();
  delete s.missioni[id];
  salvaStato(s);
  return avvia(id);
}

// Controlla le risposte di un passo: giusto se le scelte coincidono esattamente con le opzioni giuste
export function controlla(p: Passo, scelte: string[]) {
  const giuste = p.opzioni.filter((o) => o.giusta).map((o) => o.id).sort();
  const ok = scelte.length === giuste.length && [...scelte].sort().every((x, i) => x === giuste[i]);
  const sbagliate = p.opzioni.filter((o) => scelte.includes(o.id) && !o.giusta);
  const mancanti = p.opzioni.filter((o) => o.giusta && !scelte.includes(o.id));
  return { ok, sbagliate, mancanti };
}

// Punti: 100, meno 10 per ogni risposta sbagliata e 5 per ogni aiuto aperto (minimo 0)
export const punti = (m: StatoMissione) => Math.max(0, 100 - m.errori * 10 - m.aiuti.length * 5);
