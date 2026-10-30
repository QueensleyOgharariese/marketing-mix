// MOTORE DEGLI ESERCIZI (SEA, Brand, Social, Influencer, CRM)
// Ogni esercizio è un file JSON in src/data/app/esercizi/. Questo file:
//   1. legge i file (elenco ESERCIZI)
//   2. controlla le risposte con le "regole" scritte nel JSON (funzione controlla)
//   3. trasforma le risposte in frasi da mostrare nella correzione (funzione riassunto)
// Così per aggiungere un esercizio basta scrivere un nuovo JSON, senza toccare il codice.

// ---------- Tipi: com'è fatto un esercizio ----------
export type Regola =
  | { tipo: "righe"; righe: string[] } // classifica: queste righe sono nella colonna giusta
  | { tipo: "opzione"; chiave: string } // scelta: l'opzione scelta ha questa qualità (ok[chiave] = true)
  | { tipo: "menu"; campo: string; valore: string } // menu: in questo campo è scelto questo valore
  | { tipo: "spunte-tutte"; ids: string[] } // spunte: sono spuntate tutte queste
  | { tipo: "spunte-nessuna"; ids: string[] }; // spunte: c'è almeno una spunta e nessuna di queste

export type Controllo = { nome: string; regola: Regola; suggerimento: string };

// "spiega": la spiegazione mostrata PRIMA della domanda (teoria + un esempio diverso dall'esercizio)
export type Spiega = { testo: string; esempio?: string };
type Base = { id: string; titolo: string; testo: string; perche: string; soluzione: string; controlli: Controllo[]; spiega?: Spiega };
// "lezione": la mini lezione all'inizio dell'esercizio (cosa fa il ruolo, i concetti, cosa farai)
export type Lezione = { intro: string; concetti: { nome: string; spiegazione: string; esempio?: string }[]; cosaFarai: string[] };
export type Parte =
  | (Base & { tipo: "classifica"; colonne: { id: string; nome: string }[]; righe: { id: string; testo: string; giusti: string[] }[] })
  | (Base & { tipo: "scelta"; opzioni: { id: string; testo: string; ok: Record<string, boolean> }[] })
  | (Base & { tipo: "menu"; campi: { id: string; etichetta: string; opzioni: string[] }[] })
  | (Base & { tipo: "spunte"; opzioni: { id: string; testo: string }[] });

export type Esercizio = {
  id: string; ruolo: string; titolo: string; minuti: number;
  richiesta: { da: string; nome: string; ruolo: string; quando: string; oggetto: string; testo: string };
  scheda: { titolo: string; voci: [string, string][] };
  consiglio: string; parole: string[]; parti: Parte[];
  aiuti: { titolo: string; testo: string }[]; glossario: string; note: string[];
  autovalutazione: string[]; rispostaCollega: string; imparato: string[];
  lezione?: Lezione;
};

// Le risposte di una persona: per ogni parte (id) il suo valore
//   classifica → { idRiga: idColonna }   scelta → "idOpzione"   menu → { idCampo: "valore" }   spunte → ["id", ...]
export type Risposte = Record<string, any>;

// ---------- 1. Elenco degli esercizi (letti da Astro al momento della build) ----------
// Ogni esercizio ha il suo gemello inglese (nome.en.json) con la stessa forma: cambiano solo i testi
const file = import.meta.glob<Esercizio>(["../data/app/esercizi/*.json", "!../data/app/esercizi/*.en.json"], { eager: true, import: "default" });
const fileEn = import.meta.glob<Esercizio>("../data/app/esercizi/*.en.json", { eager: true, import: "default" });
export const ESERCIZI: Esercizio[] = Object.values(file);
export const ESERCIZI_EN: Esercizio[] = Object.values(fileEn);
export const esercizio = (id: string, en = false) => (en ? ESERCIZI_EN : ESERCIZI).find((e) => e.id === id);

// ---------- 2. Controlli ----------
function verifica(parte: Parte, r: any, regola: Regola): boolean {
  switch (regola.tipo) {
    case "righe": {
      if (parte.tipo !== "classifica") return false;
      const scelte = (r ?? {}) as Record<string, string>;
      return regola.righe.every((id) => parte.righe.find((x) => x.id === id)?.giusti.includes(scelte[id] ?? "") ?? false);
    }
    case "opzione": {
      if (parte.tipo !== "scelta") return false;
      return parte.opzioni.find((o) => o.id === r)?.ok[regola.chiave] === true;
    }
    case "menu":
      return (r ?? {})[regola.campo] === regola.valore;
    case "spunte-tutte": {
      const s: string[] = r ?? [];
      return regola.ids.every((id) => s.includes(id));
    }
    case "spunte-nessuna": {
      // Serve almeno una spunta: altrimenti si prenderebbero punti senza fare nulla
      const s: string[] = r ?? [];
      return s.length > 0 && !regola.ids.some((id) => s.includes(id));
    }
  }
}

// Restituisce un elenco di vero/falso, un valore per ogni controllo, parte dopo parte
export function controlla(es: Esercizio, risposte: Risposte): boolean[] {
  return es.parti.flatMap((p) => p.controlli.map((c) => verifica(p, risposte[p.id], c.regola)));
}

// Una parte è "completa" quando la persona ha risposto a tutto (serve prima di consegnare)
export function completa(p: Parte, r: any): boolean {
  if (p.tipo === "classifica") return p.righe.every((x) => (r ?? {})[x.id]);
  if (p.tipo === "menu") return p.campi.every((x) => (r ?? {})[x.id]);
  if (p.tipo === "scelta") return typeof r === "string" && r.length > 0;
  return Array.isArray(r) && r.length > 0;
}

// ---------- 3. Riassunto delle risposte, in parole ----------
// "en": la persona sta usando l'app in inglese
export function riassunto(p: Parte, r: any, en = false): string[] {
  const niente = en ? "no choice" : "nessuna scelta";
  if (p.tipo === "classifica") {
    const nome = (id: string) => p.colonne.find((c) => c.id === id)?.nome ?? niente;
    return p.righe.map((x) => `${x.testo}: ${nome((r ?? {})[x.id])}`);
  }
  if (p.tipo === "scelta") return [p.opzioni.find((o) => o.id === r)?.testo ?? (en ? "No choice" : "Nessuna scelta")];
  // Se l'etichetta è una domanda ("Quante email?") non aggiungiamo i due punti
  if (p.tipo === "menu") return p.campi.map((c) => `${c.etichetta}${c.etichetta.endsWith("?") ? "" : ":"} ${(r ?? {})[c.id] || niente}`);
  const s: string[] = r ?? [];
  const scelte = p.opzioni.filter((o) => s.includes(o.id)).map((o) => o.testo);
  return scelte.length ? scelte : [en ? "No choice" : "Nessuna scelta"];
}
