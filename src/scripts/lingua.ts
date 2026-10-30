// LINGUA DELL'APP NEL BROWSER
// La pagina dice la sua lingua in <html lang="..."> (la mette AppLayout). Gli script leggono da qui
// per scegliere testi e dati, e aggiungono /en agli indirizzi dell'app quando la pagina è in inglese.
export type Lingua = "it" | "en";
export const LINGUA: Lingua = typeof document !== "undefined" && document.documentElement.lang === "en" ? "en" : "it";
export const EN = LINGUA === "en";
// "/app/teoria/" -> "/en/app/teoria/" se la pagina è inglese (gli altri indirizzi restano uguali)
export const conLingua = (percorso: string) => (EN && percorso.startsWith("/app") ? `/en${percorso}` : percorso);
// Sceglie il testo giusto: t("Ciao", "Hello")
export const t = (it: string, en: string) => (EN ? en : it);
// Sceglie i dati giusti tra due file: scegli(datiIt, datiEn)
export const scegli = <T>(it: T, en: T | undefined): T => (EN && en ? en : it);

// Nelle pagine inglesi corregge da solo tutti i link verso /app/ (anche quelli aggiunti dopo dagli script)
export function correggiLink() {
  if (!EN) return;
  const sistema = (radice: ParentNode) => radice.querySelectorAll<HTMLAnchorElement>('a[href^="/app"]').forEach((a) => { a.setAttribute("href", conLingua(a.getAttribute("href")!)); });
  sistema(document);
  new MutationObserver((cambi) => cambi.forEach((c) => c.addedNodes.forEach((n) => {
    if (n instanceof HTMLAnchorElement && n.getAttribute("href")?.startsWith("/app")) n.setAttribute("href", conLingua(n.getAttribute("href")!));
    if (n instanceof Element) sistema(n);
  }))).observe(document.body, { childList: true, subtree: true });
}
