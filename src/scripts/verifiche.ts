// VERIFICHE DEI PASSI "AZIONE" DELLE MISSIONI
// Non si sceglie una risposta: si controlla com'è il sito dopo il lavoro fatto nel Pannello del negozio
// o negli strumenti. Ogni verifica restituisce una lista di controlli, come negli esercizi.
// L'app esiste in italiano e in inglese: i nomi dei controlli passano da t(), e le parole cercate nei testi
// valgono in tutte e due le lingue (chi gioca in inglese scrive in inglese).
import { leggiModifiche, paginaEffettiva, catena, type Modifiche } from "./cms";
import { normalizza, senzaSalute, cerca, pixel, contaParole } from "./controlli-seo";
import { t as tr, EN } from "./lingua";
import catalogo from "../data/app/seo-pro/catalogo.json";
import { VERIFICHE_SOCIAL, leggiSocial } from "./social/verifiche-social";
import { VERIFICHE_SEA, leggiSea } from "./sea/verifiche-sea";
import { VERIFICHE_BRAND, leggiBrand } from "./brand/verifiche-brand";

export type Controllo = { nome: string; ok: boolean; suggerimento: string };
type Verifica = (m: Modifiche, testo: string) => Controllo[]; // testo: quello scritto nella guida (passi "testo")

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
const ha = (t: string, re: RegExp) => re.test(normalizza(t));
const quante = (testo: string, frase: string) => normalizza(testo).split(normalizza(frase)).length - 1;
// I nomi dei tè verdi del catalogo (sencha, gyokuro, …) più le parole inglesi dei tè aromatizzati
const TE_VERDI = [...catalogo.prodotti.filter((p) => p.categoria === "te-verdi").map((p) => normalizza(p.nome.replace(/^Tè verde (al |alla )?/i, "")).split(" ")[0]), "mint", "jasmine"];
// La keyword della categoria nelle due lingue: «tè verdi» e «green tea(s)»
const KW_VERDI = () => tr("te verd", "green tea");
// Il valore che c'era all'inizio: nella versione inglese i dati del negozio sono in inglese
const diverso = (valore: string, it: string, en: string) => !!valore && valore !== it && valore !== en;

export const VERIFICHE: Record<string, Verifica> = {
  // Tutorial
  tutorialAccessori: (m) => {
    const h1 = paginaEffettiva("/accessori/", m)?.h1 ?? "";
    return [
      C(tr("Hai cambiato l'H1 di /accessori/", "You've changed the H1 of /accessori/"), diverso(h1, "Accessori per il tè", "Tea accessories"), tr("Pannello → /accessori/: scrivi nel campo H1 e premi Salva le modifiche.", "Admin → /accessori/: type in the H1 field and press Save changes.")),
      C(tr("L'H1 parla di teiere e tazze", "The H1 talks about teapots and cups"), ha(h1, /teier|teapot/) && ha(h1, /tazz|\bcups?\b/), tr("Scrivi: Teiere, tazze e accessori per il tè.", "Type: Teapots, cups and tea accessories.")),
    ];
  },

  // Livello 1 · Basi
  h1Matcha: (m) => {
    const h1 = paginaEffettiva("/matcha/", m)?.h1 ?? "";
    return [
      C(tr("La pagina /matcha/ ha un H1", "The /matcha/ page has an H1"), !!h1.trim(), tr("Pannello → Pagine → /matcha/: scrivi nel campo H1 e premi Salva le modifiche.", "Admin → Pages → /matcha/: type in the H1 field and press Save changes.")),
      C(tr("L'H1 contiene la parola «matcha»", "The H1 contains the word «matcha»"), normalizza(h1).includes("matcha"), tr("Il titolo deve dire di cosa parla la pagina: usa la parola matcha.", "The heading must say what the page is about: use the word matcha.")),
      C(tr("L'H1 è breve (massimo 60 caratteri)", "The H1 is short (60 characters at most)"), h1.length <= 60, tr(`Ora ha ${h1.length} caratteri: un titolo si legge in un colpo d'occhio.`, `It now has ${h1.length} characters: a heading is read at a glance.`)),
    ];
  },
  titoloAssam: (m) => {
    const t = paginaEffettiva("/te-neri/assam/", m)?.title ?? "";
    const px = pixel(t);
    return [
      C(tr("Il title non è più quello generico", "The title is no longer the generic one"), diverso(t, "Cinque Foglie | Negozio di tè online", "Cinque Foglie | Online tea shop"), tr("Pannello → /te-neri/assam/: scrivi un title nuovo e salva.", "Admin → /te-neri/assam/: write a new title and save.")),
      C(tr("Contiene il nome del prodotto, Assam", "It contains the product name, Assam"), normalizza(t).includes("assam"), tr("Chi cerca questo tè scrive «assam»: mettilo nel title.", "People looking for this tea type «assam»: put it in the title.")),
      C(tr("Dice che è un tè nero", "It says it's a black tea"), ha(t, /te nero|black tea/), tr("Aggiungi «tè nero»: è quello che cerca chi non conosce il nome.", "Add «black tea»: it's what people search for when they don't know the name.")),
      C(tr("Il brand è alla fine", "The brand is at the end"), cerca(t, "cinque foglie", true) !== null && !normalizza(t).startsWith("cinque foglie"), tr("Il nome del negozio va in fondo: «… | Cinque Foglie».", "The shop's name goes at the end: «… | Cinque Foglie».")),
      C(tr("È tra 30 caratteri e 580 pixel", "It's between 30 characters and 580 pixels"), t.length >= 30 && px <= 580, px > 580 ? tr(`È lungo ${px} px: Google lo taglierebbe.`, `It's ${px} px long: Google would cut it.`) : tr("È troppo corto: aggiungi una caratteristica (biologico, in foglie).", "It's too short: add a feature (organic, loose leaf).")),
      C(tr("Nessuna promessa sulla salute", "No health promises"), !t || senzaSalute(t), tr("Togli parole come dimagrire, detox, benefici.", "Remove words like slimming, detox, benefits.")),
    ];
  },
  descDarjeeling: (m) => {
    const d = paginaEffettiva("/te-neri/darjeeling/", m)?.description ?? "";
    return [
      C(tr("Hai scritto la description", "You've written the description"), !!d.trim(), tr("Pannello → /te-neri/darjeeling/: scrivi nel campo Meta description e salva.", "Admin → /te-neri/darjeeling/: type in the Meta description field and save.")),
      C(tr("È tra 100 e 160 caratteri", "It's between 100 and 160 characters"), d.length >= 100 && d.length <= 160, tr(`Ora ha ${d.length} caratteri.`, `It now has ${d.length} characters.`)),
      C(tr("Nomina il Darjeeling", "It names the Darjeeling"), normalizza(d).includes("darjeeling"), tr("Chi legge deve capire subito che la pagina parla del Darjeeling.", "Readers must understand straight away that the page is about Darjeeling.")),
      C(tr("Dà un motivo per cliccare", "It gives a reason to click"), /spedizion|biologic|foglie|regalo|gratuit|24|48|reso|india|himalaya|raccolt|shipping|deliver|organic|leaf|gift|free|return|harvest/.test(normalizza(d)), tr("Aggiungi un vantaggio concreto: spedizione, biologico, foglie intere, provenienza.", "Add a concrete benefit: shipping, organic, whole leaf, origin.")),
      C(tr("Nessuna promessa sulla salute", "No health promises"), !d || senzaSalute(d), tr("Per un alimento non si possono promettere effetti sulla salute.", "For a food you can't promise health effects.")),
    ];
  },

  // Livello 2 · Diagnosi (dalle missioni di prima)
  tisaneVisibili: (m) => [
    C(tr("La categoria Tisane è di nuovo visibile ai motori di ricerca", "The Herbal teas category is visible to search engines again"), !m.tema.nascoste.includes("tisane"), tr("Pannello del negozio → Tema e impostazioni: spunta Tisane.", "Shop admin → Theme and settings: tick Herbal teas.")),
    C(tr("Nessun'altra categoria è nascosta", "No other category is hidden"), m.tema.nascoste.filter((c) => c !== "tisane").length === 0, tr("Hai nascosto un'altra categoria: rimettila visibile.", "You've hidden another category: make it visible again.")),
    C(tr("Carrello e account restano fuori da Google", "Cart and account stay out of Google"), ["/carrello/", "/account/"].every((u) => (paginaEffettiva(u, m)?.robots ?? "").includes("noindex")), tr("Il carrello e l'account devono restare in noindex.", "The cart and the account must stay noindex.")),
  ],
  redirect404: (m) => {
    const a = m.redirect["/te-neri/earl-grey-classico/"];
    return [
      C(tr("C'è un 301 da /te-neri/earl-grey-classico/", "There's a 301 from /te-neri/earl-grey-classico/"), !!a, tr("Pannello → Reindirizzamenti: scrivi l'indirizzo vecchio nel campo Da.", "Admin → Redirects: type the old address in the From field.")),
      C(tr("Porta al prodotto che lo sostituisce", "It goes to the product that replaces it"), a === "/te-neri/earl-grey-bio/", tr("Leggi la nota del 404 nel crawler: qual è il sostituto? Scrivi il suo indirizzo nel campo A.", "Read the 404's note in the crawler: what's the replacement? Type its address in the To field.")),
      C(tr("La pagina di arrivo funziona (stato 200)", "The destination page works (status 200)"), !!a && paginaEffettiva(a, m)?.stato === 200, tr("Controlla che l'indirizzo di arrivo esista nel negozio.", "Check that the destination address exists in the shop.")),
    ];
  },
  catena: (m) => {
    const passi = catena("/prodotto.php?id=12", m);
    return [
      C(tr("/prodotto.php?id=12 porta direttamente al Sencha biologico", "/prodotto.php?id=12 goes straight to the organic Sencha"), m.redirect["/prodotto.php?id=12"] === "/te-verdi/sencha-bio/", tr("Modifica il reindirizzamento di /prodotto.php?id=12: la destinazione finale è /te-verdi/sencha-bio/.", "Edit the redirect of /prodotto.php?id=12: the final destination is /te-verdi/sencha-bio/.")),
      C(tr("Arriva in un solo salto", "It gets there in a single hop"), passi.length === 2, tr("Un indirizzo deve rimandare subito alla pagina finale, non a un altro reindirizzamento.", "An address must redirect straight to the final page, not to another redirect.")),
      C(tr("Anche /te-verdi/sencha/ porta ancora al Sencha", "/te-verdi/sencha/ still goes to the Sencha too"), m.redirect["/te-verdi/sencha/"] === "/te-verdi/sencha-bio/", tr("Non eliminare il redirect di /te-verdi/sencha/: senza, quell'indirizzo darebbe 404.", "Don't delete the redirect of /te-verdi/sencha/: without it, that address would give a 404.")),
    ];
  },
  convalidaNoindex: (m) => [
    C(tr("Le tisane sono di nuovo visibili sul sito", "The herbal teas are visible on the website again"), !m.tema.nascoste.includes("tisane"), tr("Prima correggi il sito (passo 2).", "First fix the website (step 2).")),
    // la chiave è il codice del motivo (in italiano anche nella versione inglese)
    C(tr("Hai chiesto a Google di convalidare la correzione", "You've asked Google to validate the fix"), !!m.convalide['Esclusa in base al tag "noindex"'], tr("Pagine e indicizzazione → motivo noindex → Convalida correzione.", "Pages and indexing → noindex reason → Validate fix.")),
  ],

  titoloTeVerdi: (m) => {
    // Si controlla la pagina com'è adesso sul sito (anche i campi che non hai toccato)
    const p = paginaEffettiva("/te-verdi/", m);
    const t = p?.title ?? "", d = p?.description ?? "";
    const px = pixel(t);
    const parole = normalizza(t).split(" ");
    // In italiano la keyword va all'inizio («Tè verdi biologici…»); in inglese l'aggettivo viene prima
    // («Organic green teas…»), quindi basta che sia tra le prime parole
    const inizio = EN ? /^(\w+ )?green teas?\b/.test(normalizza(t)) : normalizza(t).startsWith("te verdi");
    return [
      C(tr("Hai scritto un nuovo title", "You've written a new title"), diverso(t, "Tè verdi | Cinque Foglie", "Green teas | Cinque Foglie"), tr("Pannello → Pagine → /te-verdi/: scrivi il title e salva.", "Admin → Pages → /te-verdi/: write the title and save.")),
      C(tr("Il title inizia con «tè verdi»", "The title starts with «green teas»"), inizio, tr("Metti la keyword della pagina all'inizio.", "Put the page's keyword at the start (an adjective before it, like «Organic», is fine).")),
      C(tr("Il title è tra 30 caratteri e 580 pixel", "The title is between 30 characters and 580 pixels"), t.length >= 30 && px <= 580, px > 580 ? tr(`È lungo ${px} px: Google lo taglierebbe.`, `It's ${px} px long: Google would cut it.`) : tr("È troppo corto: aggiungi cosa c'è di specifico (biologici, i nomi dei tè).", "It's too short: add what's specific (organic, the names of the teas).")),
      C(tr("Il nome del brand è alla fine", "The brand name is at the end"), cerca(t, "cinque foglie", true) !== null, tr("Chiudi il title con «| Cinque Foglie».", "End the title with «| Cinque Foglie».")),
      C(tr("Nessuna parola ripetuta troppe volte", "No word repeated too many times"), quante(t, KW_VERDI()) <= 1 && new Set(parole).size >= parole.length - 2, tr("Usa la keyword una volta sola: ripeterla sembra spam.", "Use the keyword only once: repeating it looks like spam.")),
      C(tr("La description è tra 100 e 160 caratteri", "The description is between 100 and 160 characters"), d.length >= 100 && d.length <= 160, tr(`Ora ha ${d.length} caratteri.`, `It now has ${d.length} characters.`)),
      C(tr("La description nomina i tè che si trovano nella pagina", "The description names the teas on the page"), TE_VERDI.some((n) => normalizza(d).includes(n)) || ha(d, /te verd|green tea/), tr("Scrivi quali tè ci sono (Sencha, Gyokuro…) o almeno «tè verdi».", "Say which teas are there (Sencha, Gyokuro…) or at least «green teas».")),
      C(tr("Nessuna promessa sulla salute", "No health promises"), !t || senzaSalute(t, d || " "), tr("Togli parole come dimagrire, brucia grassi, detox, benefici.", "Remove words like slimming, fat burning, detox, benefits.")),
    ];
  },
  testoTeVerdi: (m) => {
    const i = m.pagine["/te-verdi/"]?.intro ?? "";
    const n = contaParole(i);
    const nomi = TE_VERDI.filter((x) => normalizza(i).includes(x)).length;
    const kw = quante(i, KW_VERDI());
    return [
      C(tr("Il testo ha tra 60 e 300 parole", "The text has between 60 and 300 words"), n >= 60 && n <= 300, tr(`Ora ha ${n} parole.`, `It now has ${n} words.`)),
      C(tr("Spiega come prepararli (temperatura o tempo)", "It explains how to brew them (temperature or time)"), /°|grad|temperatur|minut|degree/.test(normalizza(i)), tr("Aggiungi la temperatura dell'acqua o il tempo di infusione.", "Add the water temperature or the steeping time.")),
      C(tr("Nomina almeno due tè della categoria", "It names at least two teas in the category"), nomi >= 2, tr("Cita i tè che si trovano nella pagina, es. Sencha e Gyokuro.", "Mention the teas on the page, e.g. Sencha and Gyokuro.")),
      C(tr("Parla di tè verdi senza ripeterlo troppo", "It talks about green teas without repeating it too much"), kw >= 1 && kw <= 4, kw > 4 ? tr(`«tè verde/i» compare ${kw} volte: è troppo.`, `«green tea(s)» appears ${kw} times: that's too many.`) : tr("Usa almeno una volta «tè verde» o «tè verdi».", "Use «green tea» or «green teas» at least once.")),
      C(tr("Nessuna promessa sulla salute", "No health promises"), !i || senzaSalute(i), tr("Togli frasi su dimagrire, difese, detox, benefici.", "Remove sentences about slimming, immunity, detox, benefits.")),
    ];
  },
  richiestaTeVerdi: (m) => [
    C(tr("La pagina /te-verdi/ è stata aggiornata", "The /te-verdi/ page has been updated"), !!m.pagine["/te-verdi/"]?.title, tr("Prima scrivi title, description e testo (passi 2 e 3).", "First write the title, description and text (steps 2 and 3).")),
    C(tr("Hai chiesto a Google di rileggerla", "You've asked Google to reread it"), !!m.richieste["/te-verdi/"], tr("Console di ricerca → Controllo URL → /te-verdi/ → Richiedi indicizzazione.", "Search Console → URL Inspection → /te-verdi/ → Request indexing.")),
  ],

  // Diagnosi
  canonicalFiltri: (m) => [
    C(tr("Il canonical delle pagine filtrate è attivo", "The canonical for filtered pages is on"), m.tema.canonicalFiltri, tr("Pannello → Tema e impostazioni → Pagine filtrate: attiva il canonical verso la categoria.", "Admin → Theme and settings → Filtered pages: turn on the canonical to the category.")),
    C(tr("Le categorie restano visibili", "The categories stay visible"), m.tema.nascoste.length === 0 || (m.tema.nascoste.length === 1 && m.tema.nascoste[0] === "tisane"), tr("Non nascondere le categorie: il problema riguarda solo le versioni filtrate.", "Don't hide the categories: the problem only affects the filtered versions.")),
  ],

  // Casi
  titoloGuidaSencha: (m) => {
    const t = paginaEffettiva("/blog/sencha-guida-completa/", m)?.title ?? "";
    const px = pixel(t);
    return [
      C(tr("Hai cambiato il title", "You've changed the title"), diverso(t, "Tè verde Sencha: cos'è, come si prepara e dove comprarlo | Cinque Foglie", "Sencha green tea: what it is, how to brew it and where to buy it | Cinque Foglie"), tr("Pannello → /blog/sencha-guida-completa/: riscrivi il title e salva.", "Admin → /blog/sencha-guida-completa/: rewrite the title and save.")),
      C(tr("Parla del Sencha", "It's about Sencha"), ha(t, /sencha/), tr("È una guida al Sencha: il nome deve esserci.", "It's a guide to Sencha: the name must be there.")),
      C(tr("Non promette più un acquisto", "It no longer promises a purchase"), !ha(t, /compr|acquist|prezz|offert|vendit|shop|\bbuy|purchas|price|offer|\bsale/), tr("È una guida: togli «dove comprarlo» e le parole da negozio.", "It's a guide: remove «where to buy it» and the shop words.")),
      C(tr("Dice cosa si impara", "It says what you'll learn"), ha(t, /prepar|cos.e|guida|temperatur|infusion|come |brew|what it is|what is|guide|steep|how to/), tr("Fai capire cosa trova chi legge: cos'è, come si prepara, temperatura…", "Make clear what readers will find: what it is, how to brew it, temperature…")),
      C(tr("Il brand è alla fine", "The brand is at the end"), cerca(t, "cinque foglie", true) !== null, tr("Chiudi con «| Cinque Foglie».", "End with «| Cinque Foglie».")),
      C(tr("Sta entro 580 pixel", "It stays within 580 pixels"), !!t && px <= 580, tr(`È lungo ${px} px: Google lo taglierebbe.`, `It's ${px} px long: Google would cut it.`)),
    ];
  },
  ticketLcp: (_m, t) => [
    C(tr("Dice quali pagine", "It says which pages"), ha(t, /prodott|schede|product/), tr("Scrivi su quali pagine c'è il problema.", "Say which pages have the problem.")),
    C(tr("Dice su quale dispositivo", "It says on which device"), ha(t, /telefon|mobile|smartphone|cellular|phone/), tr("Il problema c'è solo da telefono: dillo.", "The problem is only on phone: say so.")),
    C(tr("Dà il dato che lo dimostra", "It gives the data that proves it"), ha(t, /lcp|4[,.]1|secondi|seconds|2[,.]5/), tr("Aggiungi il dato: LCP di 4,1 secondi, soglia 2,5.", "Add the data: LCP of 4.1 seconds, threshold 2.5.")),
    C(tr("Dice la causa", "It says the cause"), ha(t, /foto|immagin|jpg|mb|peso|photo|image|picture|heavy|size/), tr("Scrivi la causa: la foto principale troppo pesante.", "Say the cause: the main photo is too heavy.")),
    C(tr("Propone cosa fare", "It proposes what to do"), ha(t, /compri|ridott|ridurre|webp|avif|version|dimension|leggera|ottimizz|compress|smaller|reduc|lighter|optimi|resiz/), tr("Proponi una soluzione: versione ridotta per telefono, formato WebP, dimensioni nel codice.", "Propose a solution: a smaller version for phones, WebP format, dimensions in the code.")),
  ],
  messaggioElena: (_m, t) => [
    C(tr("Dice dove nasce il calo", "It says where the drop comes from"), ha(t, /tisan|herbal/), tr("La conclusione principale: il calo viene dalle tisane.", "The main conclusion: the drop comes from the herbal teas.")),
    C(tr("Dice perché", "It says why"), ha(t, /noindex|tema|nascost|theme|hidden|hid\b/), tr("Spiega la causa: il noindex arrivato con il nuovo tema.", "Explain the cause: the noindex that came with the new theme.")),
    C(tr("Dice da quando", "It says since when"), ha(t, /18|settembre|septemb|09/), tr("Dai la data: dal 18 settembre.", "Give the date: since 18 September.")),
    C(tr("Dice quanto costa", "It says how much it costs"), ha(t, /€|euro|4[0-9]{2}/), tr("Metti il costo al mese in euro.", "Give the monthly cost in euros.")),
    C(tr("Separa quello che è normale", "It separates what's normal"), ha(t, /fredd|stagion|iced|season/), tr("Spiega che il calo dei tè freddi è stagionale.", "Explain that the iced tea drop is seasonal.")),
    C(tr("Dice cosa si fa", "It says what's being done"), ha(t, /tolt|togli|corrett|corregg|sistemat|convalid|chiesto|richiest|remov|fix|validat|asked|request|solved|restor/), tr("Chiudi con la soluzione: cosa hai fatto o cosa proponi.", "End with the solution: what you've done or what you propose.")),
  ],
  briefRegali: (_m, t) => [
    C(tr("Ha la keyword", "It has the keyword"), ha(t, /regal|gift/), tr("Scrivi la keyword principale: quella sui regali.", "Write the main keyword: the one about gifts.")),
    C(tr("Dice entro quando", "It says by when"), ha(t, /novembre|ottobre|settiman|entro|novemb|octob|week|\bby\b|[0-9]{1,2}\/1[01]/), tr("Dai una data: le ricerche salgono a novembre.", "Give a date: searches rise in November.")),
    C(tr("Dice per chi è", "It says who it's for"), ha(t, /chi |per chi|pubblico|lettor|cerca|\bfor\b|audience|reader|people|looking/), tr("Scrivi per chi è l'articolo.", "Say who the article is for.")),
    C(tr("Dice cosa deve contenere", "It says what it must contain"), ha(t, /sezion|idee|punti|parti|contenere|parlare|section|ideas|points|cover|include|contain/), tr("Elenca i punti da coprire.", "List the points to cover.")),
    C(tr("Dice quali prodotti linkare", "It says which products to link"), ha(t, /link|kit|teier|prodott|tazz|accessori|teapot|product|\bcups?\b|accessor/), tr("Indica i prodotti da linkare: è da lì che arrivano le vendite.", "Say which products to link: that's where sales come from.")),
  ],
};

export function verifica(id: string, testo = "") {
  // Le verifiche della Simulazione Social (id "so_…") leggono le modifiche del profilo, non quelle del negozio
  // e quelle della Simulazione SEA (id "sea_…") leggono le modifiche dell'account pubblicitario
  const controlli = id.startsWith("so_") ? (VERIFICHE_SOCIAL[id]?.(leggiSocial(), testo) ?? [])
    : id.startsWith("sea_") ? (VERIFICHE_SEA[id]?.(leggiSea(), testo) ?? [])
    : id.startsWith("brand_") ? (VERIFICHE_BRAND[id]?.(leggiBrand(), testo) ?? [])
    : (VERIFICHE[id]?.(leggiModifiche(), testo) ?? []);
  return { ok: controlli.length > 0 && controlli.every((c) => c.ok), controlli };
}
