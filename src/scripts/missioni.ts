// MISSIONI DEL PERCORSO SEO: stato salvato nel browser e regole
// Lo stato resta solo in questo browser (localStorage), come i progressi degli esercizi.
// Forma: { attiva: "m1" | null, missioni: { m1: { stato, passo, errori, aiuti, primoColpo } } }
import dati from "../data/app/seo-pro/missioni.json";

export type Opzione = { id: string; testo: string; giusta: boolean; nota: string };
// tipo: "radio" o "checkbox" = si sceglie una risposta; "azione" = si lavora sul sito e la guida controlla com'è adesso
export type Passo = { strumento: string; pagina?: string; domanda: string; spiega: string; esempio: string; compito: string; tipo: "radio" | "checkbox" | "azione"; opzioni: Opzione[]; perche: string; aiuto: string; dove: string; verifica?: string; vai?: { link: string; testo: string } };
export type Missione = { id: string; n: number; nome: string; tempo: string; strumenti: string; cosa: string; obiettivo: string; passi: Passo[]; imparato: string[]; elena: string };
export type StatoMissione = { stato: "in-corso" | "completata"; passo: number; errori: number; aiuti: number[]; primoColpo: boolean[] };
export type Stato = { attiva: string | null; missioni: Record<string, StatoMissione> };

export const MISSIONI = dati.missioni as Missione[];
const CHIAVE = "marketing-mix-percorso-seo";

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

// Una missione si può fare se è la prima o se la precedente è completata
export function sbloccata(s: Stato, m: Missione) {
  if (m.n === 1) return true;
  const prima = MISSIONI.find((x) => x.n === m.n - 1)!;
  return s.missioni[prima.id]?.stato === "completata";
}

// Indirizzo dove si fa un passo
export const linkPasso = (p: Passo) => p.vai?.link ?? p.pagina ?? STRUMENTI[p.strumento].link;

// Avvia (o riprende) una missione e restituisce dove andare
export function avvia(id: string) {
  const s = leggiStato();
  const m = MISSIONI.find((x) => x.id === id)!;
  if (!s.missioni[id] || s.missioni[id].stato === "completata") s.missioni[id] = { stato: "in-corso", passo: 0, errori: 0, aiuti: [], primoColpo: [] };
  s.attiva = id;
  salvaStato(s);
  return linkPasso(m.passi[s.missioni[id].passo]);
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
