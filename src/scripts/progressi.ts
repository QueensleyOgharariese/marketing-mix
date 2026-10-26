// PROGRESSI DELLO STUDENTE
// Si salvano solo nel browser di chi usa l'app (localStorage), senza account e senza inviarli a nessuno.
// È un salvataggio "strettamente necessario" al servizio richiesto (ricordare l'esercizio), quindi non serve banner.
// Se il browser blocca il salvataggio (es. navigazione privata), l'app funziona lo stesso ma non ricorda nulla.

const CHIAVE = "marketing-mix-progressi-v1";

export type Ruolo = {
  stato?: "in-corso" | "completato";
  bozza?: { titolo: string; descrizione: string };
  consegna?: { titolo: string; descrizione: string; controlli: boolean[]; data: string };
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

// Punteggi: 10 punti per ogni controllo automatico (max 40), 15 per ogni punto di autovalutazione (max 60),
// meno 5 punti per ogni aiuto di Pesca aperto. Il totale non scende sotto zero.
export function punteggio(r: Ruolo) {
  const auto = (r.consegna?.controlli ?? []).filter(Boolean).length * 10;
  const voto = (r.autovalutazione ?? []).filter(Boolean).length * 15;
  const aiuti = (r.aiuti ?? []).length * 5;
  return { auto, voto, aiuti, totale: Math.max(0, auto + voto - aiuti) };
}
