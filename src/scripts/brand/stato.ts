// SIMULAZIONE BRAND: le modifiche fatte da chi gioca (manuale, testi, piano, ufficio stampa).
// Come per le altre simulazioni: tutto resta in questo browser (localStorage) e tutti gli strumenti leggono da qui.
import TESTI from "../../data/app/brand-sim/testi.json";

const CHIAVE = "marketing-mix-brand-modifiche";
export type Posizionamento = { perChi: string; categoria: string; differenza: string; prova: string };
export type Piano = { obiettivo: string; pubblico: string; messaggio: string; canali: string[]; kpi: string[] };
export type Comunicato = { titolo: string; sottotitolo: string; testo: string; contatti: string };
export type Modifiche = {
  payoff: string;
  posizionamento: Partial<Posizionamento>;
  testi: Record<string, string>;      // id del testo -> versione nuova
  piano: Partial<Piano>;
  comunicato: Partial<Comunicato>;
  destinatari: string[];              // giornalisti a cui mandare il comunicato
  risposte: Record<string, string>;   // richiesta dei giornalisti -> risposta
};
const vuote = (): Modifiche => ({ payoff: "", posizionamento: {}, testi: {}, piano: {}, comunicato: {}, destinatari: [], risposte: {} });
export function leggi(): Modifiche {
  try { return { ...vuote(), ...JSON.parse(localStorage.getItem(CHIAVE) ?? "{}") }; } catch { return vuote(); }
}
export function salva(m: Modifiche) {
  try { localStorage.setItem(CHIAVE, JSON.stringify(m)); } catch {}
  document.dispatchEvent(new CustomEvent("brand-modificato"));
}
// Riporta com'erano solo le parti usate da un esercizio (campo "prepara")
export type Parti = { payoff?: boolean; posizionamento?: boolean; testi?: string[]; piano?: boolean; comunicato?: boolean; destinatari?: boolean; risposte?: string[] };
export function ripristinaParti(p: Parti) {
  const m = leggi();
  if (p.payoff) m.payoff = "";
  if (p.posizionamento) m.posizionamento = {};
  for (const id of p.testi ?? []) delete m.testi[id];
  if (p.piano) m.piano = {};
  if (p.comunicato) m.comunicato = {};
  if (p.destinatari) m.destinatari = [];
  for (const id of p.risposte ?? []) delete m.risposte[id];
  try { localStorage.setItem(CHIAVE, JSON.stringify(m)); } catch {}
}
// Il testo com'è adesso (quello riscritto, oppure l'originale)
export const testo = (id: string, m = leggi()) => m.testi[id] ?? TESTI.voci.find((t) => t.id === id)?.testo ?? "";
export const contaParole = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
