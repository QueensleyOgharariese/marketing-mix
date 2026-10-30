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
    // Si trascina ogni voce nella posizione giusta (mouse o dito sulla maniglia ⠿).
    // Restano anche le frecce su e giù, per chi usa la tastiera.
    let ordine = mescola(d.voci);
    if (ordine.every((v, i) => v === d.voci[i])) ordine = [...d.voci].reverse();
    box.innerHTML = `<fieldset class="q">${titolo}<p class="q-nota">Trascina le voci nell'ordine giusto, dalla prima all'ultima (oppure usa le frecce).</p><ol class="q-lista" data-lista></ol></fieldset>`;
    const lista = box.querySelector<HTMLElement>("[data-lista]")!;
    const disegna = () => {
      lista.innerHTML = ordine.map((v, i) => `<li class="q-ord"><span class="q-maniglia" aria-hidden="true">⠿</span><span class="q-num">${i + 1}</span><span class="q-voce">${esc(v)}</span>
        <span class="q-frecce"><button type="button" data-su="${i}" aria-label="Sposta su" ${i === 0 ? "disabled" : ""}>↑</button><button type="button" data-giu="${i}" aria-label="Sposta giù" ${i === ordine.length - 1 ? "disabled" : ""}>↓</button></span></li>`).join("");
    };
    disegna();
    lista.addEventListener("click", (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-su], [data-giu]");
      if (!b || b.disabled) return;
      const i = Number(b.dataset.su ?? b.dataset.giu); const j = b.dataset.su !== undefined ? i - 1 : i + 1;
      [ordine[i], ordine[j]] = [ordine[j], ordine[i]];
      disegna();
      lista.querySelector<HTMLButtonElement>(`[data-${b.dataset.su !== undefined ? "su" : "giu"}="${j}"]`)?.focus();
    });
    // Trascinamento con i Pointer Events (funzionano con mouse, dito e penna)
    lista.addEventListener("pointerdown", (e) => {
      const t = e.target as HTMLElement;
      const li = t.closest<HTMLElement>(".q-ord");
      if (!li || t.closest("button")) return;
      if (e.pointerType !== "mouse" && !t.closest(".q-maniglia")) return; // dal telefono si trascina dalla maniglia, così la pagina scorre ancora
      e.preventDefault();
      const voci = [...lista.children] as HTMLElement[];
      const da = voci.indexOf(li);
      const box0 = voci.map((x) => x.getBoundingClientRect());
      const passo = box0.length > 1 ? box0[1].top - box0[0].top : box0[0].height;
      const y0 = e.clientY;
      let a = da;
      li.classList.add("trascina");
      try { li.setPointerCapture(e.pointerId); } catch {}
      const muovi = (ev: PointerEvent) => {
        const dy = ev.clientY - y0;
        li.style.transform = `translateY(${dy}px)`;
        const centro = box0[da].top + box0[da].height / 2 + dy;
        a = voci.filter((_, i) => i !== da && box0[i].top + box0[i].height / 2 < centro).length; // posizione nuova
        voci.forEach((x, i) => {
          if (i === da) return;
          const sposta = da < a && i > da && i <= a ? -passo : da > a && i >= a && i < da ? passo : 0;
          x.style.transform = sposta ? `translateY(${sposta}px)` : "";
        });
      };
      const fine = () => {
        li.removeEventListener("pointermove", muovi);
        const [v] = ordine.splice(da, 1); ordine.splice(a, 0, v);
        disegna();
      };
      li.addEventListener("pointermove", muovi);
      li.addEventListener("pointerup", fine, { once: true });
      li.addEventListener("pointercancel", fine, { once: true });
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

// La risposta giusta scritta in chiaro (si mostra dopo due tentativi sbagliati, così non si resta bloccati)
export function soluzione(d: Domanda) {
  if (d.tipo === "singola" || d.tipo === "multipla") return d.opzioni.filter((o) => o.giusta).map((o) => o.t).join(" · ");
  if (d.tipo === "vf") return d.risposta ? "Vero" : "Falso";
  if (d.tipo === "ordina") return d.voci.map((v, i) => `${i + 1}. ${v}`).join(" → ");
  return d.coppie.map(([a, b]) => `${a} → ${b}`).join("; ");
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
