// BARRE LATERALI CHIUDIBILI (workspace SEO, negozio, esercizi)
// Ogni barra che si può chiudere ha l'attributo data-barra="nome" e data-etichetta="Nome visibile".
// Questo script aggiunge due bottoni: "Chiudi" in alto nella barra, e "Apri" che compare quando è chiusa
// (la barra diventa una striscia sottile al bordo). La scelta resta salvata in questo browser.
import { t } from "./lingua";
const CHIAVE = "marketing-mix-pannelli";

function leggi(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(CHIAVE) ?? "{}"); } catch { return {}; }
}
function salva(stato: Record<string, boolean>) {
  try { localStorage.setItem(CHIAVE, JSON.stringify(stato)); } catch {}
}

const ICONA_CHIUDI = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

export function attivaPannelli() {
  const stato = leggi();
  document.querySelectorAll<HTMLElement>("[data-barra]").forEach((p) => {
    if (p.dataset.barraPronta) return;
    p.dataset.barraPronta = "si";
    const id = p.dataset.barra!;
    const nome = p.dataset.etichetta ?? t("pannello", "panel"); // già scritto come va letto dopo "Apri" e "Chiudi"

    const chiudi = document.createElement("button");
    chiudi.type = "button";
    chiudi.className = "chiudi-pannello";
    chiudi.setAttribute("aria-label", `${t("Chiudi", "Close")} ${nome}`);
    chiudi.title = `${t("Chiudi", "Close")} ${nome}`;
    chiudi.innerHTML = ICONA_CHIUDI;

    const apri = document.createElement("button");
    apri.type = "button";
    apri.className = "apri-pannello";
    // Icona del pannello che si riapre (lato sinistro o destro), con il nome per chi usa lo screen reader e nel suggerimento
    const destra = p.dataset.lato === "destra";
    apri.setAttribute("aria-label", `${t("Apri", "Open")} ${nome}`);
    apri.title = `${t("Apri", "Open")} ${nome}`;
    apri.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="${destra ? "M15 4v16" : "M9 4v16"}"/><path d="${destra ? "M10 10l-2 2 2 2" : "M14 10l2 2-2 2"}"/></svg>`;

    p.prepend(chiudi);
    p.append(apri);

    const imposta = (chiuso: boolean, focus = false) => {
      if (chiuso) p.dataset.chiuso = "si"; else delete p.dataset.chiuso;
      const s = leggi(); s[id] = chiuso; salva(s);
      if (focus) (chiuso ? apri : chiudi).focus();
    };
    chiudi.addEventListener("click", () => imposta(true, true));
    apri.addEventListener("click", () => imposta(false, true));
    if (stato[id]) p.dataset.chiuso = "si";
  });
}
