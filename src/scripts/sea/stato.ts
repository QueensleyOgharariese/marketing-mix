// SIMULAZIONE SEA: le modifiche fatte da chi gioca e l'account "effettivo" che ne risulta.
// Come per SEO e Social: tutto resta in questo browser (localStorage) e tutti gli strumenti leggono da qui.
// Le keyword aggiunte da chi gioca partono da zero (nessun dato: non sono ancora state pubblicate).
import CONTO_IT from "../../data/app/sea-sim/account.json";
import CONTO_EN from "../../data/app/sea-sim/account.en.json";
import { scegli, EN } from "../lingua";
// L'account nella lingua della pagina (il gemello inglese ha la stessa forma: cambiano solo i testi)
export const CONTO = scegli(CONTO_IT, CONTO_EN as typeof CONTO_IT);
import CATALOGO from "../../data/app/seo-pro/catalogo.json";

const CHIAVE = "marketing-mix-sea-modifiche";
export type Corrispondenza = "generica" | "frase" | "esatta";
export type Modifiche = {
  campagne: Record<string, { budget?: number; stato?: string }>;
  keyword: Record<string, { corrispondenza?: Corrispondenza; stato?: string }>;
  nuove: Record<string, { id: string; testo: string; corrispondenza: Corrispondenza }[]>; // gruppo -> keyword aggiunte
  negative: Record<string, string[]>;                                                          // campagna -> parole escluse
  annunci: Record<string, { titoli?: string[]; descrizioni?: string[]; url?: string; fine?: string }>;
};
export type Keyword = (typeof CONTO.campagne)[number]["gruppi"][number]["keyword"][number] & { nuova?: boolean };
export type Annuncio = { id: string; titoli: string[]; descrizioni: string[]; url: string; fine?: string };
export type Gruppo = { id: string; nome: string; bozza?: boolean; keyword: Keyword[]; annunci: Annuncio[] };
export type Campagna = { id: string; nome: string; stato: string; budget: number; quotaPersaBudget: number; tipo: string; gruppi: Gruppo[]; negative: string[] };

const vuote = (): Modifiche => ({ campagne: {}, keyword: {}, nuove: {}, negative: {}, annunci: {} });
export function leggi(): Modifiche {
  try { return { ...vuote(), ...JSON.parse(localStorage.getItem(CHIAVE) ?? "{}") }; } catch { return vuote(); }
}
export function salva(m: Modifiche) {
  try { localStorage.setItem(CHIAVE, JSON.stringify(m)); } catch {}
  document.dispatchEvent(new CustomEvent("sea-modificato"));
}

// Riporta com'erano solo le parti usate da un esercizio (campo "prepara" degli esercizi)
export type Parti = { campagne?: string[]; keyword?: string[]; nuove?: string[]; negative?: string[]; annunci?: string[] };
export function ripristinaParti(p: Parti) {
  const m = leggi();
  for (const id of p.campagne ?? []) delete m.campagne[id];
  for (const id of p.keyword ?? []) delete m.keyword[id];
  for (const id of p.nuove ?? []) delete m.nuove[id];
  for (const id of p.negative ?? []) delete m.negative[id];
  for (const id of p.annunci ?? []) delete m.annunci[id];
  try { localStorage.setItem(CHIAVE, JSON.stringify(m)); } catch {}
}

// L'account con le modifiche applicate
export function campagne(m = leggi()): Campagna[] {
  return CONTO.campagne.map((c) => ({
    ...c, ...(m.campagne[c.id] ?? {}),
    negative: m.negative[c.id] ?? [],
    gruppi: c.gruppi.map((g) => ({
      ...g,
      keyword: [
        ...g.keyword.map((k) => ({ ...k, ...(m.keyword[k.id] ?? {}) })),
        ...(m.nuove[g.id] ?? []).map((k) => ({ ...k, qs: 0, componenti: { ctr: "-", pertinenza: "-", pagina: "-" }, impressioni: 0, clic: 0, costo: 0, conversioni: 0, valore: 0, stato: "attiva", nuova: true })),
      ] as Keyword[],
      annunci: g.annunci.map((a) => ({ ...a, ...(m.annunci[a.id] ?? {}) }) as Annuncio),
    })),
  })) as Campagna[];
}
export const campagna = (id: string, m = leggi()) => campagne(m).find((c) => c.id === id);
export const gruppo = (id: string, m = leggi()) => campagne(m).flatMap((c) => c.gruppi).find((g) => g.id === id);
export const annuncio = (id: string, m = leggi()) => campagne(m).flatMap((c) => c.gruppi.flatMap((g) => g.annunci)).find((a) => a.id === id);
export const keyword = (id: string, m = leggi()) => campagne(m).flatMap((c) => c.gruppi.flatMap((g) => g.keyword)).find((k) => k.id === id);

// Totali di una campagna (dai dati di ottobre)
export function totali(c: Campagna) {
  const ks = c.gruppi.flatMap((g) => g.keyword);
  const t = ks.reduce((s, k) => ({ impressioni: s.impressioni + k.impressioni, clic: s.clic + k.clic, costo: s.costo + k.costo, conversioni: s.conversioni + k.conversioni, valore: s.valore + k.valore }), { impressioni: 0, clic: 0, costo: 0, conversioni: 0, valore: 0 });
  return { ...t, ctr: t.impressioni ? (t.clic / t.impressioni) * 100 : 0, cpc: t.clic ? t.costo / t.clic : 0, cpa: t.conversioni ? t.costo / t.conversioni : 0, roas: t.costo ? t.valore / t.costo : 0 };
}

// Gli indirizzi che esistono nel negozio (per controllare l'URL finale degli annunci)
export const PAGINE_NEGOZIO = ["/", ...CATALOGO.categorie.map((c) => `/${c.id}/`), ...CATALOGO.prodotti.map((p) => p.url)];
export const normalizzaUrl = (u: string) => {
  let x = u.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?cinquefoglie\.example/, "").replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0];
  if (!x.startsWith("/")) x = "/" + x;
  if (!x.endsWith("/")) x += "/";
  return x;
};
// Prezzi: "12,50 €" in italiano, "€12.50" in inglese (en si può passare a mano nelle pagine create da Astro)
export const euro = (x: number, dec = 2, en = EN) => (en ? `€${x.toFixed(dec)}` : x.toFixed(dec).replace(".", ",") + " €");
