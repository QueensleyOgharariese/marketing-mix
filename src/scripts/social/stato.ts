// SIMULAZIONE SOCIAL: le modifiche fatte da chi gioca e il profilo "effettivo" che ne risulta.
// Come il Pannello del negozio della SEO: tutto resta in questo browser (localStorage) e tutti gli strumenti
// leggono da qui, così una didascalia corretta nel Calendario si vede anche nel Profilo.
import POST from "../../data/app/social-sim/post.json";
import CAL from "../../data/app/social-sim/calendario.json";
import PROFILO from "../../data/app/social-sim/profilo.json";
import COMMENTI from "../../data/app/social-sim/commenti.json";

export const OGGI = "2026-10-29"; // la data "di oggi" nella simulazione
const CHIAVE = "marketing-mix-social-modifiche";

export type CampiPost = { didascalia?: string; alt?: string; collab?: boolean; archiviato?: boolean; data?: string; ora?: string; link?: string; sospeso?: boolean };
export type Modifiche = {
  post: Record<string, CampiPost>;         // modifiche a post pubblicati, programmati e bozze (per id)
  oraPredefinita: string | null;            // null = quella dello strumento (03:00)
  risposte: Record<string, string>;         // commento -> testo della risposta
  nascosti: string[];                       // commenti nascosti
  spam: string[];                           // commenti segnalati come spam
  inoltrati: Record<string, string>;        // messaggio -> a chi è stato passato
  permessi: Record<string, string>;         // foto -> testo del messaggio con cui si chiede il permesso
  crisi: boolean;                           // la crisi del kit matcha è in corso (esercizio dei Casi)
};
export type Post = (typeof POST.post)[number];
export type Bozza = { id: string; formato: string; pilastro: string; titolo: string; didascalia: string; alt: string; nota?: string; data?: string; ora?: string; link?: string; sospeso?: boolean; collab?: boolean };

const vuote = (): Modifiche => ({ post: {}, oraPredefinita: null, risposte: {}, nascosti: [], spam: [], inoltrati: {}, permessi: {}, crisi: false });
export function leggi(): Modifiche {
  try { return { ...vuote(), ...JSON.parse(localStorage.getItem(CHIAVE) ?? "{}") }; } catch { return vuote(); }
}
export function salva(m: Modifiche) {
  try { localStorage.setItem(CHIAVE, JSON.stringify(m)); } catch {}
  document.dispatchEvent(new CustomEvent("social-modificato"));
}
export function ripristinaTutto() { try { localStorage.removeItem(CHIAVE); } catch {} }

// Riporta com'erano solo le parti usate da un esercizio (campo "prepara" degli esercizi)
export type Parti = { post?: string[]; ora?: boolean; commenti?: string[]; permessi?: string[]; crisi?: boolean };
export function ripristinaParti(p: Parti) {
  const m = leggi();
  for (const id of p.post ?? []) delete m.post[id];
  if (p.ora) m.oraPredefinita = null;
  for (const c of p.commenti ?? []) { delete m.risposte[c]; delete m.inoltrati[c]; m.nascosti = m.nascosti.filter((x) => x !== c); m.spam = m.spam.filter((x) => x !== c); }
  for (const f of p.permessi ?? []) delete m.permessi[f];
  if (p.crisi !== undefined) m.crisi = p.crisi;
  try { localStorage.setItem(CHIAVE, JSON.stringify(m)); } catch {}
}

export const oraPredefinita = (m = leggi()) => m.oraPredefinita ?? PROFILO.programmazione.oraPredefinita;
// Un post pubblicato con le modifiche
export const postEffettivo = (p: Post, m = leggi()) => ({ ...p, ...(m.post[p.id] ?? {}) }) as Post & CampiPost;
export const pubblicati = (m = leggi()) => POST.post.map((p) => postEffettivo(p, m));
// Programmati e bozze (con data e ora scelte); i programmati in blocco usano l'ora predefinita
export function programmati(m = leggi()): Bozza[] {
  const base: Bozza[] = [...CAL.programmati, ...(m.crisi ? [CAL.crisi] : [])].map((p) => ({ ...p }));
  const daBozze: Bozza[] = CAL.bozze.filter((b) => m.post[b.id]?.data).map((b) => ({ ...b }));
  // I post già programmati tengono la loro ora (cambiare l'ora predefinita non li sposta: vanno spostati uno per uno)
  return [...base, ...daBozze].map((p) => {
    const c = m.post[p.id] ?? {};
    return { ...p, ...c, ora: c.ora ?? (p as Bozza).ora ?? oraPredefinita(m) };
  }).sort((a, b) => `${a.data}${a.ora}`.localeCompare(`${b.data}${b.ora}`));
}
export const bozze = (m = leggi()): Bozza[] => CAL.bozze.filter((b) => !m.post[b.id]?.data).map((b) => ({ ...b, ...(m.post[b.id] ?? {}) }));
export const trovaBozza = (id: string, m = leggi()): Bozza | undefined => {
  const b = [...CAL.bozze, ...CAL.programmati, CAL.crisi].find((x) => x.id === id);
  return b ? { ...b, ...(m.post[id] ?? {}) } : undefined;
};
export const commenti = (m = leggi()) => COMMENTI.voci.filter((c) => !(c as any).crisi || m.crisi);

// Engagement rate sulla copertura, in percentuale con un decimale
export const er = (p: Post) => Math.round(((p.like + p.commenti + p.salvataggi + p.condivisioni) / p.copertura) * 1000) / 10;
export const dataBreve = (iso: string) => { const [, mm, gg] = iso.split("-"); return `${gg}/${mm}`; };
export const GIORNI = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
export const giorno = (iso: string) => GIORNI[new Date(`${iso}T12:00:00`).getDay()];
