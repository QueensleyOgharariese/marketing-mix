// CONTROLLI AUTOMATICI DELL'ESERCIZIO SEO (versione 2, SEO moderna)
// Controllano solo le cose misurabili, in 4 parti da 4 controlli ciascuna.
// Le parti creative si valutano con l'autovalutazione nella pagina di correzione.

// Toglie accenti, apostrofi e maiuscole, così "Tè Verde" e "te verde" sono uguali
export function normalizza(testo: string) {
  return testo.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ").replace(/\s+/g, " ").trim();
}

// Parole che fanno pensare a promesse sulla salute (vietate per gli alimenti senza autorizzazione, Reg. CE 1924/2006)
const SALUTE = [/brucia/, /grass/, /dimagr/, /detox/, /depur/, /benefic/, /\bcur(a|e|ano)\b/, /guari/, /previen/, /salute/, /antiossid/, /metabolism/, /drenant/];
export function senzaSalute(...testi: string[]) {
  const t = normalizza(testi.join(" "));
  return t.length > 0 && !SALUTE.some((r) => r.test(t));
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
  const t = normalizza(l.titolo);
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
    kw.length > 0 && t.includes(kw),
    l.titolo.trim().length >= LIMITI.titoloMin && pixel(l.titolo.trim()) <= LIMITI.titoloPx,
    t.endsWith("cinque foglie"),
    l.descrizione.trim().length >= LIMITI.descrizione[0] && l.descrizione.trim().length <= LIMITI.descrizione[1] && senzaSalute(l.titolo, l.descrizione),
    // C. Dati strutturati
    normalizza(l.schema.nome).includes("sencha") && normalizza(l.schema.marca) === "cinque foglie",
    prezzo === "12.90" || prezzo === "12.9",
    l.schema.valuta === "EUR" && l.schema.disponibilita === "InStock",
    !l.schema.stelle && l.schema.nome.trim().length > 0, // vale solo dopo aver iniziato a compilare i dati
    // D. Risposta breve
    contaParole(l.risposta) >= LIMITI.parole[0] && contaParole(l.risposta) <= LIMITI.parole[1],
    /\b7[0-9]\s*(°\s*c|gradi)/.test(r) || /\b80\s*(°\s*c|gradi)/.test(r),
    /\b(2|due)\s*minut/.test(r),
    senzaSalute(l.risposta),
  ];
}

export const PARTI = [
  { id: "intento", nome: "Intento di ricerca", controlli: ["Ricerche per informarsi riconosciute", "Ricerche per scegliere riconosciute", "Ricerca per comprare riconosciuta", "Keyword principale adatta a una pagina prodotto"] },
  { id: "titolo", nome: "Titolo e descrizione", controlli: ["Il titolo contiene la keyword scelta", "Titolo di almeno 30 caratteri e non più di 580 pixel", "Il nome del brand è alla fine del titolo", "Descrizione di 70-160 caratteri, senza promesse sulla salute"] },
  { id: "dati", nome: "Dati strutturati", controlli: ["Nome e marca del prodotto", "Prezzo uguale alla scheda prodotto", "Valuta EUR e prodotto disponibile", "Nessuna valutazione a stelle inventata"] },
  { id: "risposta", nome: "Risposta breve", controlli: ["Tra 30 e 70 parole", "Temperatura giusta dell'acqua", "Tempo giusto di infusione", "Nessuna promessa sulla salute"] },
];

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
