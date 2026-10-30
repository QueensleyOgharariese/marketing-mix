// CONTROLLI AUTOMATICI DELL'ESERCIZIO SEO (versione 2, SEO moderna)
// Controllano solo le cose misurabili, in 4 parti da 4 controlli ciascuna.
// Le parti creative si valutano con l'autovalutazione nella pagina di correzione.

// Toglie accenti, apostrofi e maiuscole, così "Tè Verde" e "te verde" sono uguali
export function normalizza(testo: string) {
  return testo.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ").replace(/\s+/g, " ").trim();
}

// Parole che fanno pensare a promesse sulla salute (vietate per gli alimenti senza autorizzazione, Reg. CE 1924/2006)
// /\bgrass[ioae]\b/ trova «grassi» ma non «grassy» (erbaceo, in inglese)
const SALUTE = [/brucia/, /\bgrass[ioae]\b/, /dimagr/, /detox/, /depur/, /benefic/, /\bcur(a|e|ano)\b/, /guari/, /previen/, /salute/, /antiossid/, /metabolism/, /drenant/,
  // le stesse promesse in inglese (l'app esiste anche in inglese)
  /\bburn/, /\bfat\b/, /slim/, /weight/, /cleans/, /purif/, /benefit/, /\bcures?\b/, /\bheal/, /prevent/, /health/, /antioxid/, /metabol/, /draining/];
export function senzaSalute(...testi: string[]) {
  const t = normalizza(testi.join(" "));
  return t.length > 0 && !SALUTE.some((r) => r.test(t));
}

// Quante lettere bisogna aggiungere, togliere o cambiare per passare da a a b (distanza di Levenshtein)
export function distanza(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

// Cerca una frase nel testo accettando piccoli errori di battitura.
// Risponde "esatto", "quasi" (1-2 lettere sbagliate) oppure null.
export function cerca(testo: string, frase: string, soloAllaFine = false): "esatto" | "quasi" | null {
  const t = normalizza(testo).replace(/[|·\-–—:,.]/g, " ").replace(/\s+/g, " ").trim();
  const f = normalizza(frase);
  if (!f || !t) return null;
  if (soloAllaFine ? t.endsWith(f) : t.includes(f)) return "esatto";
  const parole = t.split(" ");
  const n = f.split(" ").length;
  const tolleranza = f.length >= 12 ? 2 : 1;
  const inizi = soloAllaFine ? [parole.length - n] : parole.map((_, i) => i);
  for (const i of inizi) {
    if (i < 0 || i + n > parole.length) continue;
    if (distanza(parole.slice(i, i + n).join(" "), f) <= tolleranza) return "quasi";
  }
  return null;
}

export const LIMITI = { titoloPx: 580, titoloMin: 30, descrizione: [70, 160], parole: [30, 70] };

// Larghezza del titolo in pixel, come lo misura Google (stima: Arial 20 px, simile ai risultati da computer)
let tela: CanvasRenderingContext2D | null = null;
export function pixel(testo: string) {
  if (typeof document === "undefined") return testo.length * 9;
  if (!tela) { tela = document.createElement("canvas").getContext("2d"); }
  if (!tela) return testo.length * 9;
  tela.font = "20px Arial";
  return Math.round(tela.measureText(testo).width);
}

export function contaParole(testo: string) {
  return testo.trim() ? testo.trim().split(/\s+/).length : 0;
}

export type Lavoro = {
  intenti: Record<string, string>; // ricerca -> id dell'intento scelto
  blocchi?: string[]; // id dei blocchi del titolo, in ordine
  keyword: string;
  titolo: string;
  descrizione: string;
  schema: { nome: string; marca: string; prezzo: string; valuta: string; disponibilita: string; stelle: boolean };
  risposta: string;
};

type Ricerca = { ricerca: string; giusti: string[] };

export function controlla(l: Lavoro, ricerche: Ricerca[], keywordGiuste: string[]) {
  const giusto = (r: Ricerca) => r.giusti.includes(l.intenti[r.ricerca] ?? "");
  const gruppo = (filtro: (r: Ricerca) => boolean) => {
    const scelte = ricerche.filter(filtro);
    return scelte.length > 0 && scelte.every(giusto);
  };
  const kw = normalizza(l.keyword);
  const r = normalizza(l.risposta);
  const prezzo = l.schema.prezzo.replace(",", ".").replace(/[^\d.]/g, "");

  return [
    // A. Intento di ricerca
    gruppo((x) => x.giusti.length === 1 && x.giusti[0] === "info"),
    gruppo((x) => x.giusti.includes("scelta")),
    gruppo((x) => x.giusti.length === 1 && x.giusti[0] === "acquisto"),
    keywordGiuste.map(normalizza).includes(kw),
    // B. Titolo e descrizione
    kw.length > 0 && cerca(l.titolo, l.keyword) !== null,
    l.titolo.trim().length >= LIMITI.titoloMin && pixel(l.titolo.trim()) <= LIMITI.titoloPx,
    cerca(l.titolo, "cinque foglie", true) !== null,
    l.descrizione.trim().length >= LIMITI.descrizione[0] && l.descrizione.trim().length <= LIMITI.descrizione[1] && senzaSalute(l.titolo, l.descrizione),
    // C. Dati strutturati
    ["Sencha biologico", "Organic Sencha"].includes(l.schema.nome) && l.schema.marca === "Cinque Foglie", // nome italiano o inglese (app in due lingue)
    prezzo === "12.90",
    l.schema.valuta === "EUR" && l.schema.disponibilita === "InStock",
    !l.schema.stelle && l.schema.nome.trim().length > 0, // vale solo dopo aver iniziato a compilare i dati
    // D. Risposta breve
    contaParole(l.risposta) >= LIMITI.parole[0] && contaParole(l.risposta) <= LIMITI.parole[1],
    /\b7[0-9]\s*(°\s*c|gradi|degrees)/.test(r) || /\b80\s*(°\s*c|gradi|degrees)/.test(r),
    /\b(2|due|two)\s*minut/.test(r),
    senzaSalute(l.risposta),
  ];
}

// Errori di battitura trovati (per avvisare la persona, senza togliere punti)
export function avvisiBattitura(l: Lavoro, en = false) {
  const avvisi: string[] = [];
  if (l.keyword && cerca(l.titolo, l.keyword) === "quasi") avvisi.push(en ? `In the title the keyword "${l.keyword}" seems to have a typo: check it.` : `Nel titolo la keyword "${l.keyword}" sembra scritta con un errore: controllala.`);
  if (cerca(l.titolo, "cinque foglie", true) === "quasi") avvisi.push(en ? "Check how you've written \"Cinque Foglie\" at the end of the title." : "Controlla come hai scritto \"Cinque Foglie\" alla fine del titolo.");
  return avvisi;
}

export const PARTI = [
  { id: "intento", nome: "Intento di ricerca", controlli: ["Ricerche per informarsi riconosciute", "Ricerche per scegliere riconosciute", "Ricerca per comprare riconosciuta", "Keyword principale adatta a una pagina prodotto"] },
  { id: "titolo", nome: "Titolo e descrizione", controlli: ["Il titolo contiene la keyword scelta", "Titolo di almeno 30 caratteri e non più di 580 pixel", "Il nome del brand è alla fine del titolo", "Descrizione di 70-160 caratteri, senza promesse sulla salute"] },
  { id: "dati", nome: "Dati strutturati", controlli: ["Nome e marca del prodotto", "Prezzo uguale alla scheda prodotto", "Valuta EUR e prodotto disponibile", "Nessuna valutazione a stelle inventata"] },
  { id: "risposta", nome: "Risposta breve", controlli: ["Tra 30 e 70 parole", "Temperatura giusta dell'acqua", "Tempo giusto di infusione", "Nessuna promessa sulla salute"] },
];

// Le stesse parti nella versione inglese dell'app (stesso ordine dei controlli)
export const PARTI_EN = [
  { id: "intento", nome: "Search intent", controlli: ["Searches for learning recognised", "Searches for choosing recognised", "Search for buying recognised", "Main keyword suited to a product page"] },
  { id: "titolo", nome: "Title and description", controlli: ["The title contains the chosen keyword", "Title of at least 30 characters and no more than 580 pixels", "The brand name is at the end of the title", "Description of 70-160 characters, with no health promises"] },
  { id: "dati", nome: "Structured data", controlli: ["Product name and brand", "Price matches the product page", "EUR currency and product in stock", "No made-up star rating"] },
  { id: "risposta", nome: "Short answer", controlli: ["Between 30 and 70 words", "Right water temperature", "Right steeping time", "No health promises"] },
];
export const partiDi = (en = false) => (en ? PARTI_EN : PARTI);

export const NOMI_CONTROLLI = PARTI.flatMap((p) => p.controlli);

// Crea il codice JSON-LD che andrebbe nella pagina (schema.org/Product)
export function jsonLd(l: Lavoro, url: string) {
  const prezzo = l.schema.prezzo.replace(",", ".").replace(/[^\d.]/g, "");
  const dati: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: l.schema.nome || undefined,
    brand: l.schema.marca ? { "@type": "Brand", name: l.schema.marca } : undefined,
    description: l.descrizione || undefined,
    offers: {
      "@type": "Offer",
      url,
      price: prezzo || undefined,
      priceCurrency: l.schema.valuta,
      availability: `https://schema.org/${l.schema.disponibilita}`,
    },
  };
  if (l.schema.stelle) dati.aggregateRating = { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "120" };
  return JSON.stringify(dati, null, 2);
}
