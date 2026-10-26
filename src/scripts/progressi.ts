// PROGRESSI DELLO STUDENTE
// Si salvano solo nel browser di chi usa l'app (localStorage), senza account e senza inviarli a nessuno.
// È un salvataggio "strettamente necessario" al servizio richiesto (ricordare l'esercizio), quindi non serve banner.
// Se il browser blocca il salvataggio (es. navigazione privata), l'app funziona lo stesso ma non ricorda nulla.

// v2: l'esercizio SEO è cambiato (4 parti), quindi i vecchi salvataggi non si usano più
const CHIAVE = "marketing-mix-progressi-v2";

export type Ruolo = {
  stato?: "in-corso" | "completato";
  bozza?: Record<string, any>; // il lavoro non ancora consegnato
  consegna?: { lavoro: Record<string, any>; controlli: boolean[]; data: string };
  autovalutazione?: boolean[];
  aiuti?: number[]; // quali aiuti di Pesca sono stati aperti (ognuno toglie 5 punti)
  gradimento?: number;
};
export type Progressi = { ruoli: Record<string, Ruolo> };

export function leggi(): Progressi {
  try {
    const testo = localStorage.getItem(CHIAVE);
    if (testo) return JSON.parse(testo);
  } catch (e) {
    /* salvataggio non disponibile: si riparte da zero */
  }
  return { ruoli: {} };
}

export function salva(p: Progressi) {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(p));
  } catch (e) {
    /* salvataggio non disponibile: ignoriamo */
  }
}

// Aggiorna un solo ruolo e salva
export function aggiornaRuolo(id: string, dati: Partial<Ruolo>) {
  const p = leggi();
  p.ruoli[id] = { ...(p.ruoli[id] ?? {}), ...dati };
  salva(p);
  return p;
}

export function cancellaTutto() {
  try {
    localStorage.removeItem(CHIAVE);
  } catch (e) {
    /* niente da cancellare */
  }
}

// Punteggi: i controlli automatici valgono in tutto 40 punti (divisi in parti uguali), l'autovalutazione 60 (15 per punto),
// meno 5 punti per ogni aiuto di Pesca aperto. Il totale non scende sotto zero.
export function punteggio(r: Ruolo) {
  const controlli = r.consegna?.controlli ?? [];
  const auto = controlli.length ? Math.round((controlli.filter(Boolean).length / controlli.length) * 40) : 0;
  const voto = (r.autovalutazione ?? []).filter(Boolean).length * 15;
  const aiuti = (r.aiuti ?? []).length * 5;
  return { auto, voto, aiuti, totale: Math.max(0, auto + voto - aiuti) };
}
