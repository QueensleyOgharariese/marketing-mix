// VERIFICHE DELLA SIMULAZIONE SEA (passi "azione" e "testo")
// Si controlla com'è l'account dopo il lavoro (modifiche salvate in questo browser da stato.ts)
// oppure il testo scritto nella guida. Ogni controllo ha un suggerimento se qualcosa manca.
import type { Controllo } from "../verifiche";
import { normalizza, senzaSalute } from "../controlli-seo";
import { leggi, campagne, gruppo, annuncio, keyword, PAGINE_NEGOZIO, normalizzaUrl, type Modifiche, type Annuncio } from "./stato";

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
const ha = (t: string, re: RegExp) => re.test(normalizza(t));
const urla = (t: string) => /!!/.test(t) || (t.replace(/[^A-Za-zÀ-ú]/g, "").length > 12 && t.replace(/[^A-ZÀ-Ú]/g, "").length / t.replace(/[^A-Za-zÀ-ú]/g, "").length > 0.6);
const INFORMATIVE = /benefic|ricett|cos e|come si|come fare|latte|propriet|dimagr|gratis/;

// Controlli comuni a ogni annuncio adattabile
function annuncioBase(a: Annuncio | undefined): Controllo[] {
  const t = (a?.titoli ?? []).filter((x) => x.trim()), d = (a?.descrizioni ?? []).filter((x) => x.trim());
  const lunghi = t.filter((x) => x.length > 30), dLunghe = d.filter((x) => x.length > 90);
  return [
    C("Almeno 5 titoli", t.length >= 5, `Ora sono ${t.length}: più titoli = più combinazioni da provare.`),
    C("Ogni titolo ha al massimo 30 caratteri", t.length > 0 && lunghi.length === 0, lunghi.length ? `«${lunghi[0]}» ha ${lunghi[0].length} caratteri.` : "Scrivi i titoli."),
    C("Almeno 2 descrizioni", d.length >= 2, `Ora sono ${d.length}.`),
    C("Ogni descrizione ha al massimo 90 caratteri", d.length > 0 && dLunghe.length === 0, dLunghe.length ? `Una descrizione ha ${dLunghe[0].length} caratteri.` : "Scrivi le descrizioni."),
    C("Niente promesse sulla salute", senzaSalute([...t, ...d].join(" ") || "x") && !ha([...t, ...d].join(" "), /insonni|dormir|stress|calmant/), "Tè e tisane sono alimenti: togli promesse come «ti aiuta a dormire» o «detox»."),
    C("Non urla (niente maiuscole o «!!»)", ![...t, ...d].some(urla), "Scrivi in modo normale: maiuscole e punti esclamativi ripetuti vengono spesso rifiutati."),
  ];
}
const urlValido = (u = "") => !!u.trim() && PAGINE_NEGOZIO.includes(normalizzaUrl(u));

type V = (m: Modifiche, testo: string) => Controllo[];
export const VERIFICHE_SEA: Record<string, V> = {
  sea_tutorial: (m) => [C("Il budget del Brand è 12 € al giorno", m.campagne.brand?.budget === 12, "Campagne → Brand · Cinque Foglie → Budget giornaliero: scrivi 12 e premi Salva.")],

  // Basi · Kit matcha
  sea_keywordKit: () => {
    const ks = gruppo("g-kit")?.keyword ?? [];
    const info = ks.filter((k) => ha(k.testo, INFORMATIVE));
    const sole = ks.filter((k) => normalizza(k.testo) === "matcha");
    const generiche = ks.filter((k) => k.corrispondenza === "generica");
    return [
      C("Almeno 3 parole chiave nel gruppo Kit matcha", ks.length >= 3, `Ora sono ${ks.length}. Scrivi la parola chiave, scegli la corrispondenza e premi Aggiungi.`),
      C("Parlano del kit o degli strumenti del matcha", ks.length > 0 && ks.every((k) => ha(k.testo, /matcha|frusta|ciotola/)), "Ogni parola chiave deve riguardare il kit matcha."),
      C("Nessuna parola chiave informativa", info.length === 0, info.length ? `«${info[0].testo}» attira chi vuole informarsi, non comprare.` : ""),
      C("Non c'è «matcha» da sola", sole.length === 0, "«Matcha» da sola è troppo generica: aggiungi kit, set, frusta…"),
      C("Corrispondenza a frase o esatta", ks.length > 0 && generiche.length === 0, generiche.length ? `«${generiche[0].testo}» è in generica: cambiala.` : ""),
    ];
  },
  sea_annuncioKit: () => {
    const a = annuncio("a-kit");
    return [
      ...annuncioBase(a),
      C("Un titolo contiene «kit matcha»", (a?.titoli ?? []).some((t) => ha(t, /kit matcha|kit per (il )?matcha/)), "Ripeti la parola chiave in un titolo: chi l'ha cercata la riconosce."),
      C("Una descrizione invita a fare qualcosa", (a?.descrizioni ?? []).some((d) => ha(d, /scopri|ordina|acquista|compra|regala|prova|inizia/)), "Aggiungi un invito: «Ordina ora», «Scopri il kit»."),
      C("L'URL finale è la pagina del kit", normalizzaUrl(a?.url ?? "") === "/matcha/kit-matcha/", "Usa la scheda del prodotto: /matcha/kit-matcha/."),
    ];
  },
  sea_budgetKit: (m) => {
    const b = m.campagne.kit?.budget ?? 0;
    return [
      C("Il budget giornaliero è circa 15 € (450 ÷ 30,4)", b >= 14 && b <= 16, `Ora è ${b} €: dividi il budget del mese per 30,4.`),
      C("La campagna è pubblicata", m.campagne.kit?.stato === "attiva", "Premi «Pubblica la campagna» nelle impostazioni."),
    ];
  },

  // Diagnosi · Tè verdi
  sea_negative: (m) => {
    const neg = (m.negative.teverdi ?? []).map(normalizza);
    const cattive = [/benefic/, /dimagr/, /ricett/, /gratis|campion/, /lavor/];
    const prese = cattive.filter((re) => neg.some((n) => re.test(n))).length;
    // Le ricerche che vendono: nessuna negativa deve bloccarle
    const buone = ["tè verde biologico in foglie", "comprare tè verde online", "tè verde sencha", "tè verde biologico", "tè verde biologico prezzo", "sencha biologico", "gyokuro"].map(normalizza);
    // Una negativa blocca una ricerca se tutte le sue parole sono nella ricerca (come la negativa "generica" degli strumenti veri)
    const blocca = neg.filter((n) => n && buone.some((b) => n.split(" ").every((w) => b.split(" ").includes(w))));
    return [
      C("Almeno 4 tipi di ricerche sbagliate esclusi", prese >= 4, `Ne hai escluse ${prese} su 5 (benefici, dimagrire, ricetta, gratis/campioni, lavoro).`),
      C("Nessuna negativa blocca le ricerche che vendono", blocca.length === 0, blocca.length ? `«${blocca[0]}» bloccherebbe anche ricerche che vendono: toglila.` : ""),
    ];
  },
  sea_corrispondenza: () => {
    const k = keyword("k-v1");
    return [C("«tè verde» non è più in generica", !!k && k.corrispondenza !== "generica", "Campagna Tè verdi → riga «tè verde» → scegli frase o esatta.")];
  },
  sea_urlSencha: () => {
    const u = normalizzaUrl(annuncio("a-sencha")?.url ?? "");
    return [C("L'annuncio del Sencha porta alla scheda del Sencha", u === "/te-verdi/sencha-bio/", u === "/" ? "Porta ancora alla home." : "Usa l'indirizzo della scheda del Sencha biologico nel negozio.")];
  },

  // Diagnosi · Tisane
  sea_annuncioTisane: () => {
    const a = annuncio("a-sera");
    const tutto = [...(a?.titoli ?? []), ...(a?.descrizioni ?? [])].join(" ");
    return [
      ...annuncioBase(a),
      C("Almeno 2 titoli parlano di tisane", (a?.titoli ?? []).filter((t) => ha(t, /tisan|infus|camomill/)).length >= 2, "Ripeti «tisane» nei titoli: è quello che le persone hanno cercato."),
      C("Non parla più di tè verde", !ha(tutto, /te verde|sencha|gyokuro|genmaicha/), "Togli i testi copiati dai tè verdi."),
      C("L'URL finale porta alle tisane", normalizzaUrl(a?.url ?? "").startsWith("/tisane/"), "Usa /tisane/ o la scheda delle Tisane della Sera."),
    ];
  },

  // Casi · Black Friday
  sea_budgetBF: () => {
    const cs = campagne().filter((c) => c.stato === "attiva");
    const b = (id: string) => cs.find((c) => c.id === id)?.budget ?? 0;
    const tot = cs.reduce((s, c) => s + c.budget, 0);
    return [
      C("Totale al massimo 140 € al giorno", tot <= 140, `Ora le campagne attive sommano ${tot} € al giorno.`),
      C("Kit e idee regalo ha almeno 45 € al giorno", b("regali") >= 45, "È la campagna che rende e perde più impressioni per budget: alzala."),
      C("Tè verdi non sale (sotto il pareggio)", b("teverdi") <= 40, "Tè verdi è sotto il ROAS di pareggio: non dargli budget in più."),
      C("Tisane non sale (sotto il pareggio)", b("tisane") <= 20, "Anche Tisane è sotto il pareggio."),
      C("Il brand resta attivo con almeno 10 €", b("brand") >= 10, "Il brand protegge chi cerca il nome del negozio: non spegnerlo."),
    ];
  },
  sea_annuncioBF: () => {
    const a = annuncio("a-bf");
    const tutto = [...(a?.titoli ?? []), ...(a?.descrizioni ?? [])].join(" ");
    return [
      ...annuncioBase(a),
      C("Un titolo dice «Black Friday»", (a?.titoli ?? []).some((t) => ha(t, /black friday/)), "Scrivi «Black Friday» in un titolo."),
      C("Dice lo sconto (20%)", /20\s?%|-\s?20/.test(tutto), "Scrivi lo sconto: -20%."),
      C("Dice fino a quando", ha(tutto, /30\/11|30 novembre|fino al 30|27.{0,6}30/), "Scrivi la fine dell'offerta: fino al 30 novembre."),
      C("Nessuna affermazione che non si può dimostrare", !ha(tutto, /piu bass\w* d(i|el|ell)? ?(italia|mercato|web|sempre)|i piu bassi|piu convenient|miglior\w* d(i|el|ell)? ?(italia|mercato|web)|numero uno|\bn\.? ?1\b|imbattibil/), "Togli superlativi come «i prezzi più bassi»."),
      C("L'URL finale è una pagina del negozio", urlValido(a?.url) && normalizzaUrl(a?.url ?? "") !== "/", "Porta a una pagina con i prodotti in sconto, per esempio /accessori/."),
      C("La data di fine è il 30 novembre", a?.fine === "2026-11-30", "Nel campo Data di fine scegli 30/11/2026."),
    ];
  },

  // Testi scritti nella guida
  sea_reportNumeri: (_m, t) => [
    C("Dici quale campagna rende di più", ha(t, /regal|kit/), "Scrivi quale campagna va meglio (escluso il brand)."),
    C("Dici quale campagna va peggio", ha(t, /te verdi|tè verdi|verdi/), "Scrivi quale campagna spende e vende poco."),
    C("Usi una metrica con il numero", ha(t, /roas|cpa|costo per|\d/), "Aggiungi un numero: ROAS o costo per vendita."),
    C("Proponi qualcosa", ha(t, /propon|controll|suggeris|dovremmo|potremmo|sistem/), "Chiudi con una proposta."),
  ],
  sea_pianoBF: (_m, t) => [
    C("Dici quanto dai ai regali e perché", ha(t, /regal|kit/) && ha(t, /impression|perde|budget|4,6|4\.6|roas/), "Scrivi il budget dei regali e il motivo (ROAS, impressioni perse)."),
    C("Parli del pareggio", ha(t, /pareggio|2,5|2\.5|perdon|sotto/), "Spiega perché Tè verdi e Tisane non salgono."),
    C("Parli del brand", ha(t, /brand|nome del negozio/), "Dì cosa fai con il brand e perché."),
  ],
  sea_messaggioBF: (_m, t) => [
    C("Dici il budget", ha(t, /€|euro|budget/), "Scrivi quanto budget avete messo."),
    C("Descrivi l'annuncio (sconto e data)", ha(t, /20/) && ha(t, /30/), "Scrivi lo sconto e la data di fine."),
    C("Parli del prezzo di riferimento", ha(t, /30 giorni|prezzo piu basso|omnibus|riferimento/), "Ricorda da quale prezzo si calcola lo sconto."),
    C("Dici cosa controllerai dopo", ha(t, /confront|controll|ordini|roas|margine/), "Scrivi come capirete se è andato bene."),
  ],
};
export const leggiSea = leggi;
