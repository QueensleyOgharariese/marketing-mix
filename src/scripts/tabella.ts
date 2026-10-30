// TABELLE DEGLI STRUMENTI SEO: ordinamento per colonna e filtro di testo
// Uso nel markup:
//   <table data-tabella> ... <th data-ordina="numero"> o <th data-ordina="testo"> ...
//   ogni cella ordinabile può avere data-valore="123" (se manca si usa il testo)
//   <input data-filtra="id-tabella"> filtra le righe che contengono il testo scritto
// Funziona anche con più tabelle nella stessa pagina.

export function attivaTabelle(radice: ParentNode = document) {
  radice.querySelectorAll<HTMLTableElement>("table[data-tabella]").forEach((tabella) => {
    if (tabella.dataset.attiva) return;
    tabella.dataset.attiva = "si";
    const corpo = tabella.tBodies[0];
    tabella.querySelectorAll<HTMLTableCellElement>("th[data-ordina]").forEach((th, _i) => {
      const colonna = [...th.parentElement!.children].indexOf(th);
      const bottone = document.createElement("button");
      bottone.type = "button";
      bottone.className = "ordina";
      bottone.innerHTML = th.innerHTML + '<span class="freccia" aria-hidden="true"></span>';
      th.innerHTML = "";
      th.appendChild(bottone);
      th.setAttribute("aria-sort", "none");
      bottone.addEventListener("click", () => {
        const verso = th.getAttribute("aria-sort") === "descending" ? "ascending" : "descending";
        tabella.querySelectorAll("th[aria-sort]").forEach((x) => x.setAttribute("aria-sort", "none"));
        th.setAttribute("aria-sort", verso);
        const numero = th.dataset.ordina === "numero";
        const valore = (r: HTMLTableRowElement) => {
          const c = r.cells[colonna];
          const v = c?.dataset.valore ?? c?.textContent ?? "";
          return numero ? Number(v) : v.toLowerCase();
        };
        const righe = [...corpo.rows].sort((a, b) => {
          const x = valore(a), y = valore(b);
          const d = numero ? (x as number) - (y as number) : String(x).localeCompare(String(y), "it");
          return verso === "ascending" ? d : -d;
        });
        righe.forEach((r) => corpo.appendChild(r));
      });
    });
  });
  radice.querySelectorAll<HTMLInputElement>("input[data-filtra]").forEach((campo) => {
    if (campo.dataset.attiva) return;
    campo.dataset.attiva = "si";
    const tabella = document.getElementById(campo.dataset.filtra!) as HTMLTableElement | null;
    if (!tabella) return;
    campo.addEventListener("input", () => {
      const t = campo.value.trim().toLowerCase();
      [...tabella.tBodies[0].rows].forEach((r) => { r.hidden = !!t && !r.textContent!.toLowerCase().includes(t); });
    });
  });
}

// Numeri all'italiana: 3.900, 12.400 e 3,2. Lo scriviamo a mano perché il browser non mette il punto
// nei numeri di 4 cifre (scriverebbe "3900" ma "14.500"), e la tabella sembrerebbe disordinata.
// en: formato inglese (1,234.5) invece di quello italiano (1.234,5). Nel browser lo sceglie da solo
// guardando la lingua della pagina; nelle pagine create da Astro si passa a mano (num(x, 0, lang === "en")).
const EN_PAGINA = typeof document !== "undefined" && document.documentElement?.lang === "en";
export function num(x: number, dec = 0, en = EN_PAGINA) {
  const [intera, decimali] = Math.abs(x).toFixed(dec).split(".");
  return (x < 0 ? "-" : "") + intera.replace(/\B(?=(\d{3})+(?!\d))/g, en ? "," : ".") + (decimali ? (en ? "." : ",") + decimali : "");
}
