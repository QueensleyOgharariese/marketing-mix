// CONTROLLI AUTOMATICI DELL'ESERCIZIO SEO
// Controllano solo le cose misurabili. Le parti creative si valutano con l'autovalutazione.

// Toglie accenti e maiuscole, così "Tè Verde" e "te verde" sono uguali
export function normalizza(testo: string) {
  return testo.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
}

// Parole che fanno pensare a promesse sulla salute (vietate per gli alimenti senza autorizzazione, Reg. CE 1924/2006)
const SALUTE = [/brucia/, /grass/, /dimagr/, /detox/, /depur/, /benefic/, /\bcur(a|e|ano)\b/, /guari/, /previen/, /salute/, /antiossid/, /metabolism/, /drenant/];

export const LIMITI = { titolo: [30, 60], descrizione: [70, 160] };

export function controlla(titolo: string, descrizione: string) {
  const t = normalizza(titolo);
  const d = normalizza(descrizione);
  const lunghezze =
    titolo.trim().length >= LIMITI.titolo[0] && titolo.trim().length <= LIMITI.titolo[1] &&
    descrizione.trim().length >= LIMITI.descrizione[0] && descrizione.trim().length <= LIMITI.descrizione[1];
  const keyword = t.includes("te verde sencha") || t.includes("sencha te verde");
  const brand = t.endsWith("cinque foglie");
  // Superato solo se c'è del testo e nessuna parola sulla salute
  const salute = (t + d).length > 0 && !SALUTE.some((r) => r.test(t) || r.test(d));
  return [lunghezze, keyword, brand, salute];
}

export const NOMI_CONTROLLI = [
  "Lunghezze giuste (titolo 30-60, descrizione 70-160 caratteri)",
  "Il titolo contiene \"tè verde Sencha\"",
  "Il nome del brand è alla fine del titolo",
  "Nessuna promessa sulla salute",
];
