// DOMANDE DELLE LEZIONI DI TEORIA (Hub)
// Cinque tipi: singola, multipla, vf (vero o falso), ordina, abbina.
// disegnaDomanda() scrive la domanda dentro un contenitore e restituisce una funzione che dice se la risposta è giusta.
// Lo stato delle lezioni (quali sono finite, il risultato della verifica) resta in questo browser.

export type Domanda =
  | { tipo: "singola" | "multipla"; testo: string; opzioni: { t: string; giusta: boolean }[]; spiegazione: string }
  | { tipo: "vf"; testo: string; risposta: boolean; spiegazione: string }
  | { tipo: "ordina"; testo: string; voci: string[]; spiegazione: string }
  | { tipo: "abbina"; testo: string; coppie: [string, string][]; spiegazione: string };

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Mescola una lista (le risposte non sono sempre nello stesso ordine)
function mescola<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
let conta = 0;

export function disegnaDomanda(box: HTMLElement, d: Domanda): () => boolean | null {
  const id = `q${++conta}`;
  const titolo = `<legend class="q-testo">${esc(d.testo)}</legend>`;
  if (d.tipo === "singola" || d.tipo === "multipla") {
    const ordine = mescola(d.opzioni.map((o, i) => ({ ...o, i })));
    const tipo = d.tipo === "singola" ? "radio" : "checkbox";
    box.innerHTML = `<fieldset class="q">${titolo}${d.tipo === "multipla" ? '<p class="q-nota">Puoi scegliere più risposte.</p>' : ""}
      ${ordine.map((o) => `<label class="q-opz"><input type="${tipo}" name="${id}" value="${o.i}" /><span>${esc(o.t)}</span></label>`).join("")}</fieldset>`;
    return () => {
      const scelte = [...box.querySelectorAll<HTMLInputElement>(`input[name=${id}]:checked`)].map((x) => Number(x.value));
      if (!scelte.length) return null;
      const giuste = d.opzioni.map((o, i) => (o.giusta ? i : -1)).filter((i) => i >= 0);
      return scelte.length === giuste.length && scelte.every((s) => giuste.includes(s));
    };
  }
  if (d.tipo === "vf") {
    box.innerHTML = `<fieldset class="q">${titolo}<div class="q-vf">
      <label class="q-opz"><input type="radio" name="${id}" value="1" /><span>Vero</span></label>
      <label class="q-opz"><input type="radio" name="${id}" value="0" /><span>Falso</span></label></div></fieldset>`;
    return () => {
      const s = box.querySelector<HTMLInputElement>(`input[name=${id}]:checked`);
      return s ? (s.value === "1") === d.risposta : null;
    };
  }
  if (d.tipo === "ordina") {
    // Si sposta ogni voce con i bottoni su e giù (funziona anche da tastiera e da telefono)
    let ordine = mescola(d.voci);
    if (ordine.every((v, i) => v === d.voci[i])) ordine = [...d.voci].reverse();
    const disegna = () => {
      box.querySelector("[data-lista]")!.innerHTML = ordine.map((v, i) => `<li class="q-ord"><span class="q-num">${i + 1}</span><span class="q-voce">${esc(v)}</span>
        <span class="q-frecce"><button type="button" data-su="${i}" aria-label="Sposta su" ${i === 0 ? "disabled" : ""}>↑</button><button type="button" data-giu="${i}" aria-label="Sposta giù" ${i === ordine.length - 1 ? "disabled" : ""}>↓</button></span></li>`).join("");
    };
    box.innerHTML = `<fieldset class="q">${titolo}<p class="q-nota">Usa le frecce per mettere le voci nell'ordine giusto, dalla prima all'ultima.</p><ol class="q-lista" data-lista></ol></fieldset>`;
    disegna();
    box.addEventListener("click", (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-su], [data-giu]");
      if (!b || b.disabled) return;
      const i = Number(b.dataset.su ?? b.dataset.giu); const j = b.dataset.su !== undefined ? i - 1 : i + 1;
      [ordine[i], ordine[j]] = [ordine[j], ordine[i]];
      disegna();
      box.querySelector<HTMLButtonElement>(`[data-${b.dataset.su !== undefined ? "su" : "giu"}="${j}"]`)?.focus();
    });
    return () => ordine.every((v, i) => v === d.voci[i]);
  }
  // abbina: per ogni voce a sinistra si sceglie la risposta da un elenco
  const destre = mescola(d.coppie.map((c) => c[1]));
  box.innerHTML = `<fieldset class="q">${titolo}<div class="q-abbina">${d.coppie.map(([a], i) => `<label class="q-coppia"><span>${esc(a)}</span>
      <select data-coppia="${i}"><option value="">Scegli…</option>${destre.map((r) => `<option>${esc(r)}</option>`).join("")}</select></label>`).join("")}</div></fieldset>`;
  return () => {
    const sel = [...box.querySelectorAll<HTMLSelectElement>("[data-coppia]")];
    if (sel.some((s) => !s.value)) return null;
    return sel.every((s, i) => s.value === d.coppie[i][1]);
  };
}

// Stato della teoria: { seo: { lezioni: { "cos-e-la-seo": true }, verifica: { giuste: 7, superata: true } } }
const CHIAVE = "marketing-mix-teoria";
export type StatoRuolo = { lezioni: Record<string, boolean>; verifica?: { giuste: number; superata: boolean } };
export function leggiTeoria(): Record<string, StatoRuolo> {
  try { return JSON.parse(localStorage.getItem(CHIAVE) ?? "{}"); } catch { return {}; }
}
export function salvaTeoria(ruolo: string, cambia: (s: StatoRuolo) => void) {
  const t = leggiTeoria();
  t[ruolo] ??= { lezioni: {} };
  cambia(t[ruolo]);
  try { localStorage.setItem(CHIAVE, JSON.stringify(t)); } catch {}
}
