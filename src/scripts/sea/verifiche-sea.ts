// VERIFICHE DELLA SIMULAZIONE SEA (passi "azione" e "testo")
// Si controlla com'è l'account dopo il lavoro (modifiche salvate in questo browser da stato.ts)
// oppure il testo scritto nella guida. Ogni controllo ha un suggerimento se qualcosa manca.
import type { Controllo } from "../verifiche";
import { normalizza, senzaSalute } from "../controlli-seo";
import { leggi, campagne, gruppo, annuncio, keyword, PAGINE_NEGOZIO, normalizzaUrl, type Modifiche, type Annuncio } from "./stato";
import { t, EN } from "../lingua";
// Bilingue: nomi e suggerimenti passano da t(italiano, inglese); le parole cercate nei testi
// valgono in tutte e due le lingue (chi gioca in inglese scrive annunci e parole chiave in inglese).

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
const ha = (testo: string, re: RegExp) => re.test(normalizza(testo));
const urla = (x: string) => /!!/.test(x) || (x.replace(/[^A-Za-zÀ-ú]/g, "").length > 12 && x.replace(/[^A-ZÀ-Ú]/g, "").length / x.replace(/[^A-Za-zÀ-ú]/g, "").length > 0.6);
const INFORMATIVE = /benefic|ricett|cos e|come si|come fare|latte|propriet|dimagr|gratis|benefit|recipe|what is|how to|propert|weight|slim|free/;
const INVITO = /scopri|ordina|acquista|compra|regala|prova|inizia|discover|order|buy|shop|gift|try|start|get yours|find/;
const SUPERLATIVI = /piu bass\w* d(i|el|ell)? ?(italia|mercato|web|sempre)|i piu bassi|piu convenient|miglior\w* d(i|el|ell)? ?(italia|mercato|web)|numero uno|\bn\.? ?1\b|imbattibil|lowest (\w+ )?prices? (in|on|ever)|cheapest (in|on|of|tea)|best (\w+ )?prices? (in|on)|best in (italy|the market)|number one|unbeatable/; // "il prezzo più basso degli ultimi 30 giorni" è permesso: è il prezzo di riferimento

// Controlli comuni a ogni annuncio adattabile
function annuncioBase(a: Annuncio | undefined): Controllo[] {
  const ti = (a?.titoli ?? []).filter((x) => x.trim()), d = (a?.descrizioni ?? []).filter((x) => x.trim());
  const lunghi = ti.filter((x) => x.length > 30), dLunghe = d.filter((x) => x.length > 90);
  return [
    C(t("Almeno 5 titoli", "At least 5 headlines"), ti.length >= 5, t(`Ora sono ${ti.length}: più titoli = più combinazioni da provare.`, `There are ${ti.length} now: more headlines = more combinations to test.`)),
    C(t("Ogni titolo ha al massimo 30 caratteri", "Each headline has 30 characters at most"), ti.length > 0 && lunghi.length === 0, lunghi.length ? t(`«${lunghi[0]}» ha ${lunghi[0].length} caratteri.`, `«${lunghi[0]}» has ${lunghi[0].length} characters.`) : t("Scrivi i titoli.", "Write the headlines.")),
    C(t("Almeno 2 descrizioni", "At least 2 descriptions"), d.length >= 2, t(`Ora sono ${d.length}.`, `There are ${d.length} now.`)),
    C(t("Ogni descrizione ha al massimo 90 caratteri", "Each description has 90 characters at most"), d.length > 0 && dLunghe.length === 0, dLunghe.length ? t(`Una descrizione ha ${dLunghe[0].length} caratteri.`, `A description has ${dLunghe[0].length} characters.`) : t("Scrivi le descrizioni.", "Write the descriptions.")),
    C(t("Niente promesse sulla salute", "No health claims"), senzaSalute([...ti, ...d].join(" ") || "x") && !ha([...ti, ...d].join(" "), /insonni|dormir|stress|calmant|sleep|insomnia|calming/), t("Tè e tisane sono alimenti: togli promesse come «ti aiuta a dormire» o «detox».", "Teas and herbal teas are foods: remove claims like «helps you sleep» or «detox».")),
    C(t("Non urla (niente maiuscole o «!!»)", "It doesn't shout (no capitals or «!!»)"), ![...ti, ...d].some(urla), t("Scrivi in modo normale: maiuscole e punti esclamativi ripetuti vengono spesso rifiutati.", "Write normally: capitals and repeated exclamation marks often get rejected.")),
  ];
}
const urlValido = (u = "") => !!u.trim() && PAGINE_NEGOZIO.includes(normalizzaUrl(u));

type V = (m: Modifiche, testo: string) => Controllo[];
export const VERIFICHE_SEA: Record<string, V> = {
  sea_tutorial: (m) => [C(t("Il budget del Brand è 12 € al giorno", "The Brand budget is €12 a day"), m.campagne.brand?.budget === 12, t("Campagne → Brand · Cinque Foglie → Budget giornaliero: scrivi 12 e premi Salva.", "Campaigns → Brand · Cinque Foglie → Daily budget: type 12 and press Save."))],

  // Basi · Kit matcha
  sea_keywordKit: () => {
    const ks = gruppo("g-kit")?.keyword ?? [];
    const info = ks.filter((k) => ha(k.testo, INFORMATIVE));
    const sole = ks.filter((k) => normalizza(k.testo) === "matcha");
    const generiche = ks.filter((k) => k.corrispondenza === "generica");
    return [
      C(t("Almeno 3 parole chiave nel gruppo Kit matcha", "At least 3 keywords in the Matcha kit group"), ks.length >= 3, t(`Ora sono ${ks.length}. Scrivi la parola chiave, scegli la corrispondenza e premi Aggiungi.`, `There are ${ks.length} now. Type the keyword, choose the match type and press Add.`)),
      C(t("Parlano del kit o degli strumenti del matcha", "They're about the kit or matcha tools"), ks.length > 0 && ks.every((k) => ha(k.testo, /matcha|frusta|ciotola|whisk|bowl/)), t("Ogni parola chiave deve riguardare il kit matcha.", "Every keyword must be about the matcha kit.")),
      C(t("Nessuna parola chiave informativa", "No informational keywords"), info.length === 0, info.length ? t(`«${info[0].testo}» attira chi vuole informarsi, non comprare.`, `«${info[0].testo}» attracts people who want information, not to buy.`) : ""),
      C(t("Non c'è «matcha» da sola", "No «matcha» on its own"), sole.length === 0, t("«Matcha» da sola è troppo generica: aggiungi kit, set, frusta…", "«Matcha» on its own is too generic: add kit, set, whisk…")),
      C(t("Corrispondenza a frase o esatta", "Phrase or exact match"), ks.length > 0 && generiche.length === 0, generiche.length ? t(`«${generiche[0].testo}» è in generica: cambiala.`, `«${generiche[0].testo}» is in broad match: change it.`) : ""),
    ];
  },
  sea_annuncioKit: () => {
    const a = annuncio("a-kit");
    return [
      ...annuncioBase(a),
      C(t("Un titolo contiene «kit matcha»", "A headline contains «matcha kit»"), (a?.titoli ?? []).some((x) => ha(x, /kit matcha|kit per (il )?matcha|matcha kit|matcha set|matcha starter/)), t("Ripeti la parola chiave in un titolo: chi l'ha cercata la riconosce.", "Repeat the keyword in a headline: people who searched for it will recognise it.")),
      C(t("Una descrizione invita a fare qualcosa", "A description invites people to do something"), (a?.descrizioni ?? []).some((d) => ha(d, INVITO)), t("Aggiungi un invito: «Ordina ora», «Scopri il kit».", "Add a call to action: «Order now», «Discover the kit».")),
      C(t("L'URL finale è la pagina del kit", "The final URL is the kit page"), normalizzaUrl(a?.url ?? "") === "/matcha/kit-matcha/", t("Usa la scheda del prodotto: /matcha/kit-matcha/.", "Use the product page: /matcha/kit-matcha/.")),
    ];
  },
  sea_budgetKit: (m) => {
    const b = m.campagne.kit?.budget ?? 0;
    return [
      C(t("Il budget giornaliero è circa 15 € (450 ÷ 30,4)", "The daily budget is about €15 (450 ÷ 30.4)"), b >= 14 && b <= 16, t(`Ora è ${b} €: dividi il budget del mese per 30,4.`, `It's €${b} now: divide the monthly budget by 30.4.`)),
      C(t("La campagna è pubblicata", "The campaign is published"), m.campagne.kit?.stato === "attiva", t("Premi «Pubblica la campagna» nelle impostazioni.", "Press «Publish the campaign» in the settings.")),
    ];
  },

  // Diagnosi · Tè verdi
  sea_negative: (m) => {
    const neg = (m.negative.teverdi ?? []).map(normalizza);
    // ogni tipo di ricerca sbagliata, in italiano e in inglese
    const cattive = [/benefic|benefit/, /dimagr|weight|slim/, /ricett|recipe/, /gratis|campion|free|sample/, /lavor|job|picking|work/];
    const prese = cattive.filter((re) => neg.some((n) => re.test(n))).length;
    // Le ricerche che vendono: nessuna negativa deve bloccarle
    const buone = (EN ? ["organic loose leaf green tea", "buy green tea online", "sencha green tea", "organic green tea", "organic green tea price", "organic sencha", "gyokuro"] : ["tè verde biologico in foglie", "comprare tè verde online", "tè verde sencha", "tè verde biologico", "tè verde biologico prezzo", "sencha biologico", "gyokuro"]).map(normalizza);
    // Una negativa blocca una ricerca se tutte le sue parole sono nella ricerca (come la negativa "generica" degli strumenti veri)
    const blocca = neg.filter((n) => n && buone.some((b) => n.split(" ").every((w) => b.split(" ").includes(w))));
    return [
      C(t("Almeno 4 tipi di ricerche sbagliate esclusi", "At least 4 kinds of wrong search excluded"), prese >= 4, t(`Ne hai escluse ${prese} su 5 (benefici, dimagrire, ricetta, gratis/campioni, lavoro).`, `You excluded ${prese} of 5 (benefits, weight loss, recipe, free/samples, jobs).`)),
      C(t("Nessuna negativa blocca le ricerche che vendono", "No negative blocks the searches that sell"), blocca.length === 0, blocca.length ? t(`«${blocca[0]}» bloccherebbe anche ricerche che vendono: toglila.`, `«${blocca[0]}» would also block searches that sell: remove it.`) : ""),
    ];
  },
  sea_corrispondenza: () => {
    const k = keyword("k-v1");
    return [C(t("«tè verde» non è più in generica", "«green tea» is no longer in broad match"), !!k && k.corrispondenza !== "generica", t("Campagna Tè verdi → riga «tè verde» → scegli frase o esatta.", "Green teas campaign → «green tea» row → choose phrase or exact."))];
  },
  sea_urlSencha: () => {
    const u = normalizzaUrl(annuncio("a-sencha")?.url ?? "");
    return [C(t("L'annuncio del Sencha porta alla scheda del Sencha", "The Sencha ad leads to the Sencha product page"), u === "/te-verdi/sencha-bio/", u === "/" ? t("Porta ancora alla home.", "It still leads to the home page.") : t("Usa l'indirizzo della scheda del Sencha biologico nel negozio.", "Use the address of the organic Sencha product page in the shop."))];
  },

  // Diagnosi · Tisane
  sea_annuncioTisane: () => {
    const a = annuncio("a-sera");
    const tutto = [...(a?.titoli ?? []), ...(a?.descrizioni ?? [])].join(" ");
    return [
      ...annuncioBase(a),
      C(t("Almeno 2 titoli parlano di tisane", "At least 2 headlines are about herbal teas"), (a?.titoli ?? []).filter((x) => ha(x, /tisan|infus|camomill|herbal|chamomile|rooibos/)).length >= 2, t("Ripeti «tisane» nei titoli: è quello che le persone hanno cercato.", "Repeat «herbal teas» in the headlines: it's what people searched for.")),
      C(t("Non parla più di tè verde", "It's no longer about green tea"), !ha(tutto, /te verde|green tea|sencha|gyokuro|genmaicha/), t("Togli i testi copiati dai tè verdi.", "Remove the copy taken from the green teas.")),
      C(t("L'URL finale porta alle tisane", "The final URL leads to the herbal teas"), normalizzaUrl(a?.url ?? "").startsWith("/tisane/"), t("Usa /tisane/ o la scheda delle Tisane della Sera.", "Use /tisane/ or the Evening Herbal Teas product page.")),
    ];
  },

  // Casi · Black Friday
  sea_budgetBF: () => {
    const cs = campagne().filter((c) => c.stato === "attiva");
    const b = (id: string) => cs.find((c) => c.id === id)?.budget ?? 0;
    const tot = cs.reduce((s, c) => s + c.budget, 0);
    return [
      C(t("Totale al massimo 140 € al giorno", "Total of €140 a day at most"), tot <= 140, t(`Ora le campagne attive sommano ${tot} € al giorno.`, `The active campaigns now add up to €${tot} a day.`)),
      C(t("Kit e idee regalo ha almeno 45 € al giorno", "Kits and gift ideas has at least €45 a day"), b("regali") >= 45, t("È la campagna che rende e perde più impressioni per budget: alzala.", "It's the campaign that performs and loses the most impressions to budget: raise it.")),
      C(t("Tè verdi non sale (sotto il pareggio)", "Green teas doesn't go up (below break-even)"), b("teverdi") <= 40, t("Tè verdi è sotto il ROAS di pareggio: non dargli budget in più.", "Green teas is below break-even ROAS: don't give it extra budget.")),
      C(t("Tisane non sale (sotto il pareggio)", "Herbal teas doesn't go up (below break-even)"), b("tisane") <= 20, t("Anche Tisane è sotto il pareggio.", "Herbal teas is below break-even too.")),
      C(t("Il brand resta attivo con almeno 10 €", "Brand stays active with at least €10"), b("brand") >= 10, t("Il brand protegge chi cerca il nome del negozio: non spegnerlo.", "Brand protects people searching for the shop's name: don't switch it off.")),
    ];
  },
  sea_annuncioBF: () => {
    const a = annuncio("a-bf");
    const tutto = [...(a?.titoli ?? []), ...(a?.descrizioni ?? [])].join(" ");
    return [
      ...annuncioBase(a),
      C(t("Un titolo dice «Black Friday»", "A headline says «Black Friday»"), (a?.titoli ?? []).some((x) => ha(x, /black friday/)), t("Scrivi «Black Friday» in un titolo.", "Write «Black Friday» in a headline.")),
      C(t("Dice lo sconto (20%)", "It states the discount (20%)"), /20\s?%|-\s?20/.test(tutto), t("Scrivi lo sconto: -20%.", "Write the discount: 20% off.")),
      C(t("Dice fino a quando", "It says until when"), ha(tutto, /30\/11|30 novembre|fino al 30|27.{0,6}30|30 nov|nov(ember)? 30|until (the )?30|ends (on )?(the )?30/), t("Scrivi la fine dell'offerta: fino al 30 novembre.", "Write when the offer ends: until 30 November.")),
      C(t("Nessuna affermazione che non si può dimostrare", "No claims that can't be proven"), !ha(tutto, SUPERLATIVI), t("Togli superlativi come «i prezzi più bassi».", "Remove superlatives like «the lowest prices».")),
      C(t("L'URL finale è una pagina del negozio", "The final URL is a page in the shop"), urlValido(a?.url) && normalizzaUrl(a?.url ?? "") !== "/", t("Porta a una pagina con i prodotti in sconto, per esempio /accessori/.", "Lead to a page with the discounted products, for example /accessori/.")),
      C(t("La data di fine è il 30 novembre", "The end date is 30 November"), a?.fine === "2026-11-30", t("Nel campo Data di fine scegli 30/11/2026.", "In the End date field choose 30/11/2026.")),
    ];
  },

  // Testi scritti nella guida
  sea_reportNumeri: (_m, x) => [
    C(t("Dici quale campagna rende di più", "You say which campaign performs best"), ha(x, /regal|kit|gift/), t("Scrivi quale campagna va meglio (escluso il brand).", "Write which campaign does best (excluding brand).")),
    C(t("Dici quale campagna va peggio", "You say which campaign does worst"), ha(x, /te verdi|tè verdi|verdi|green tea/), t("Scrivi quale campagna spende e vende poco.", "Write which campaign spends a lot and sells little.")),
    C(t("Usi una metrica con il numero", "You use a metric with its number"), ha(x, /roas|cpa|costo per|cost per|\d/), t("Aggiungi un numero: ROAS o costo per vendita.", "Add a number: ROAS or cost per sale.")),
    C(t("Proponi qualcosa", "You propose something"), ha(x, /propon|controll|suggeris|dovremmo|potremmo|sistem|propose|suggest|check|should|could|fix|review/), t("Chiudi con una proposta.", "Finish with a proposal.")),
  ],
  sea_pianoBF: (_m, x) => [
    C(t("Dici quanto dai ai regali e perché", "You say how much you give the gifts campaign and why"), ha(x, /regal|kit|gift/) && ha(x, /impression|perde|budget|4,6|4\.6|roas|los/), t("Scrivi il budget dei regali e il motivo (ROAS, impressioni perse).", "Write the gifts budget and the reason (ROAS, lost impressions).")),
    C(t("Parli del pareggio", "You talk about break-even"), ha(x, /pareggio|2,5|2\.5|perdon|sotto|break.?even|below|losing/), t("Spiega perché Tè verdi e Tisane non salgono.", "Explain why Green teas and Herbal teas don't go up.")),
    C(t("Parli del brand", "You talk about brand"), ha(x, /brand|nome del negozio|shop s name/), t("Dì cosa fai con il brand e perché.", "Say what you do with brand and why.")),
  ],
  sea_messaggioBF: (_m, x) => [
    C(t("Dici il budget", "You state the budget"), ha(x, /€|euro|budget/), t("Scrivi quanto budget avete messo.", "Write how much budget you've set.")),
    C(t("Descrivi l'annuncio (sconto e data)", "You describe the ad (discount and date)"), ha(x, /20/) && ha(x, /30/), t("Scrivi lo sconto e la data di fine.", "Write the discount and the end date.")),
    C(t("Parli del prezzo di riferimento", "You talk about the reference price"), ha(x, /30 giorni|prezzo piu basso|omnibus|riferimento|30 days|lowest price|reference/), t("Ricorda da quale prezzo si calcola lo sconto.", "Remember which price the discount is calculated from.")),
    C(t("Dici cosa controllerai dopo", "You say what you'll check afterwards"), ha(x, /confront|controll|ordini|roas|margine|compar|check|orders|margin/), t("Scrivi come capirete se è andato bene.", "Write how you'll know whether it went well.")),
  ],
};
export const leggiSea = leggi;
