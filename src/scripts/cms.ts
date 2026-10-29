// PANNELLO DEL NEGOZIO (un CMS finto): le modifiche fatte da chi gioca e il sito "effettivo" che ne risulta
// Le modifiche restano solo in questo browser (localStorage). Tutti gli strumenti leggono il sito da qui:
// così, se nel pannello togli il noindex alle tisane, lo vedono anche Ispeziona, il crawler e l'indicizzazione.
import crawl from "../data/app/seo-pro/crawl.json";
import catalogo from "../data/app/seo-pro/catalogo.json";

export type CampiPagina = { title?: string; description?: string; robots?: string; h1?: string; intro?: string };
export type Modifiche = {
  pagine: Record<string, CampiPagina>; // per indirizzo
  redirect: Record<string, string>; // da -> a (301)
  tema: { nascoste: string[]; canonicalFiltri: boolean }; // categorie nascoste ai motori di ricerca; canonical automatico sui filtri
  convalide: Record<string, string>; // motivo di esclusione -> data in cui è stata chiesta la convalida
  richieste: Record<string, string>; // indirizzo -> data in cui è stata chiesta l'indicizzazione
};
export type Pagina = (typeof crawl.pagine)[number] & { modificata?: boolean };

const CHIAVE = "marketing-mix-negozio-modifiche";
export const OGGI = "29/10/2026"; // la data "di oggi" nella simulazione (i dati arrivano al 25/10)

// Com'è il sito all'inizio: la categoria Tisane nascosta dal nuovo tema (è lei a mettere il noindex),
// i reindirizzamenti che il crawler trova già, nessun canonical sui filtri.
export function iniziali(): Modifiche {
  const redirect: Record<string, string> = {};
  for (const p of crawl.pagine) if (p.redirect) redirect[p.url] = p.redirect;
  return { pagine: {}, redirect, tema: { nascoste: ["tisane"], canonicalFiltri: false }, convalide: {}, richieste: {} };
}

export function leggiModifiche(): Modifiche {
  const base = iniziali();
  try {
    const s = JSON.parse(localStorage.getItem(CHIAVE) ?? "null");
    if (!s) return base;
    return { pagine: s.pagine ?? {}, redirect: s.redirect ?? base.redirect, tema: { ...base.tema, ...(s.tema ?? {}) }, convalide: s.convalide ?? {}, richieste: s.richieste ?? {} };
  } catch { return base; }
}
export function salvaModifiche(m: Modifiche) {
  try { localStorage.setItem(CHIAVE, JSON.stringify(m)); } catch {}
  document.dispatchEvent(new CustomEvent("negozio-modificato"));
}
export function ripristina() {
  try { localStorage.removeItem(CHIAVE); } catch {}
  document.dispatchEvent(new CustomEvent("negozio-modificato"));
}

// Normalizza un indirizzo scritto a mano: "te-neri/assam" -> "/te-neri/assam/"; toglie il dominio se c'è
export function pulisciUrl(u: string) {
  let x = u.trim().replace(/^https?:\/\/[^/]+/i, "");
  if (!x) return "";
  if (!x.startsWith("/")) x = "/" + x;
  if (!x.includes("?") && !/\.[a-z]+$/i.test(x) && !x.endsWith("/")) x += "/";
  return x.toLowerCase();
}

const categoriaDi = (url: string) => url.split("/")[1] ?? "";
const PAGINE = crawl.pagine as Pagina[];

// La pagina come la vede Google oggi, con le modifiche fatte nel pannello
export function paginaEffettiva(url: string, m = leggiModifiche()): Pagina | undefined {
  const base = PAGINE.find((p) => p.url === url);
  const target = m.redirect[url];
  if (!base && !target) return undefined;
  const p: Pagina = { ...(base ?? { url, tipo: "Vecchio indirizzo", stato: 301, redirect: "", indicizzabile: false, motivo: "", title: "", description: "", h1: "", canonical: "", robots: "", parole: 0, inlinks: 0, lcp: null, peso: null, profondita: 0, note: "" }) } as Pagina;

  // 1. Reindirizzamenti: se esiste, la pagina risponde 301; se è stato tolto, torna com'era (o 404)
  if (target) {
    Object.assign(p, { stato: 301, redirect: target, indicizzabile: false, motivo: "Reindirizzamento", title: "", description: "", h1: "", robots: "", canonical: "" });
    if (base?.stato !== 301) p.modificata = true;
    if (base?.redirect && base.redirect !== target) p.modificata = true;
    return p;
  }
  if (base?.stato === 301) { // reindirizzamento tolto: l'indirizzo non porta più da nessuna parte
    Object.assign(p, { stato: 404, redirect: "", indicizzabile: false, motivo: "Errore client (404)", modificata: true });
    return p;
  }
  if (p.stato !== 200) return p;

  // 2. Tema: categorie nascoste ai motori di ricerca (mettono noindex su categoria e prodotti)
  const cat = categoriaDi(url);
  const categorie = catalogo.categorie.map((c) => c.id);
  if (categorie.includes(cat) && p.tipo !== "Filtro") {
    const nascosta = m.tema.nascoste.includes(cat);
    const eraNascosta = (p.robots ?? "").includes("noindex");
    if (nascosta && !eraNascosta) Object.assign(p, { robots: "noindex, follow", indicizzabile: false, motivo: "noindex", modificata: true });
    if (!nascosta && eraNascosta) Object.assign(p, { robots: "index, follow", indicizzabile: true, motivo: "", modificata: true });
  }

  // 3. Canonical automatico sui filtri
  if (p.tipo === "Filtro" && m.tema.canonicalFiltri) Object.assign(p, { canonical: url.split("?")[0], indicizzabile: false, motivo: "Canonicalizzata", modificata: true });

  // 4. Campi scritti nella pagina
  const c = m.pagine[url];
  if (c) {
    for (const k of ["title", "description", "h1"] as const) if (c[k] !== undefined) { (p as any)[k] = c[k]; p.modificata = true; }
    if (c.robots !== undefined) {
      p.robots = c.robots; p.modificata = true;
      const noindex = c.robots.includes("noindex");
      p.indicizzabile = !noindex; p.motivo = noindex ? "noindex" : "";
    }
  }
  return p;
}

// Tutte le pagine del sito effettivo (comprese quelle nuove create da un reindirizzamento)
export function pagineEffettive(m = leggiModifiche()) {
  const url = new Set([...PAGINE.map((p) => p.url), ...Object.keys(m.redirect)]);
  return [...url].map((u) => paginaEffettiva(u, m)!).filter(Boolean);
}

// Testo introduttivo di una categoria (dal catalogo, o quello scritto nel pannello)
export function introCategoria(id: string, m = leggiModifiche()) {
  const c = m.pagine[`/${id}/`];
  return c?.intro ?? catalogo.categorie.find((x) => x.id === id)?.intro ?? "";
}

// Segue i reindirizzamenti fino alla pagina finale (massimo 5 salti)
export function catena(url: string, m = leggiModifiche()) {
  const passi = [url];
  let u = url;
  while (m.redirect[u] && passi.length < 6) { u = m.redirect[u]; passi.push(u); }
  return passi;
}
