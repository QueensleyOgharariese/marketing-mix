// BARRE LATERALI CHIUDIBILI (workspace SEO, negozio, esercizi)
// Ogni barra che si può chiudere ha l'attributo data-pannello="nome" e data-etichetta="Nome visibile".
// Questo script aggiunge due bottoni: "Chiudi" in alto nella barra, e "Apri" che compare quando è chiusa
// (la barra diventa una striscia sottile al bordo). La scelta resta salvata in questo browser.
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
  document.querySelectorAll<HTMLElement>("[data-pannello]").forEach((p) => {
    if (p.dataset.pannelloPronto) return;
    p.dataset.pannelloPronto = "si";
    const id = p.dataset.pannello!;
    const nome = p.dataset.etichetta ?? "pannello"; // già scritto come va letto dopo "Apri" e "Chiudi"

    const chiudi = document.createElement("button");
    chiudi.type = "button";
    chiudi.className = "chiudi-pannello";
    chiudi.setAttribute("aria-label", `Chiudi ${nome}`);
    chiudi.title = `Chiudi ${nome}`;
    chiudi.innerHTML = ICONA_CHIUDI;

    const apri = document.createElement("button");
    apri.type = "button";
    apri.className = "apri-pannello";
    apri.textContent = `Apri ${nome}`;

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
