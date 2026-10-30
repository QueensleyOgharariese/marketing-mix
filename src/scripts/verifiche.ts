// VERIFICHE DEI PASSI "AZIONE" DELLE MISSIONI
// Non si sceglie una risposta: si controlla com'è il sito dopo il lavoro fatto nel Pannello del negozio
// o negli strumenti. Ogni verifica restituisce una lista di controlli, come negli esercizi.
import { leggiModifiche, paginaEffettiva, catena, type Modifiche } from "./cms";
import { normalizza, senzaSalute, cerca, pixel, contaParole } from "./controlli-seo";
import catalogo from "../data/app/seo-pro/catalogo.json";
import { VERIFICHE_SOCIAL, leggiSocial } from "./social/verifiche-social";
import { VERIFICHE_SEA, leggiSea } from "./sea/verifiche-sea";
import { VERIFICHE_BRAND, leggiBrand } from "./brand/verifiche-brand";

export type Controllo = { nome: string; ok: boolean; suggerimento: string };
type Verifica = (m: Modifiche, testo: string) => Controllo[]; // testo: quello scritto nella guida (passi "testo")

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
const ha = (t: string, re: RegExp) => re.test(normalizza(t));
const quante = (testo: string, frase: string) => normalizza(testo).split(normalizza(frase)).length - 1;
const TE_VERDI = catalogo.prodotti.filter((p) => p.categoria === "te-verdi").map((p) => normalizza(p.nome.replace(/^Tè verde (al |alla )?/i, "")).split(" ")[0]);

export const VERIFICHE: Record<string, Verifica> = {
  // Tutorial
  tutorialAccessori: (m) => {
    const h1 = paginaEffettiva("/accessori/", m)?.h1 ?? "";
    return [
      C("Hai cambiato l'H1 di /accessori/", h1 !== "Accessori per il tè", "Pannello → /accessori/: scrivi nel campo H1 e premi Salva le modifiche."),
      C("L'H1 parla di teiere e tazze", normalizza(h1).includes("teiere") && normalizza(h1).includes("tazze"), "Scrivi: Teiere, tazze e accessori per il tè."),
    ];
  },

  // Livello 1 · Basi
  h1Matcha: (m) => {
    const h1 = paginaEffettiva("/matcha/", m)?.h1 ?? "";
    return [
      C("La pagina /matcha/ ha un H1", !!h1.trim(), "Pannello → Pagine → /matcha/: scrivi nel campo H1 e premi Salva le modifiche."),
      C("L'H1 contiene la parola «matcha»", normalizza(h1).includes("matcha"), "Il titolo deve dire di cosa parla la pagina: usa la parola matcha."),
      C("L'H1 è breve (massimo 60 caratteri)", h1.length <= 60, `Ora ha ${h1.length} caratteri: un titolo si legge in un colpo d'occhio.`),
    ];
  },
  titoloAssam: (m) => {
    const t = paginaEffettiva("/te-neri/assam/", m)?.title ?? "";
    const px = pixel(t);
    return [
      C("Il title non è più quello generico", !!t && t !== "Cinque Foglie | Negozio di tè online", "Pannello → /te-neri/assam/: scrivi un title nuovo e salva."),
      C("Contiene il nome del prodotto, Assam", normalizza(t).includes("assam"), "Chi cerca questo tè scrive «assam»: mettilo nel title."),
      C("Dice che è un tè nero", normalizza(t).includes("te nero"), "Aggiungi «tè nero»: è quello che cerca chi non conosce il nome."),
      C("Il brand è alla fine", cerca(t, "cinque foglie", true) !== null && !normalizza(t).startsWith("cinque foglie"), "Il nome del negozio va in fondo: «… | Cinque Foglie»."),
      C("È tra 30 caratteri e 580 pixel", t.length >= 30 && px <= 580, px > 580 ? `È lungo ${px} px: Google lo taglierebbe.` : "È troppo corto: aggiungi una caratteristica (biologico, in foglie)."),
      C("Nessuna promessa sulla salute", !t || senzaSalute(t), "Togli parole come dimagrire, detox, benefici."),
    ];
  },
  descDarjeeling: (m) => {
    const d = paginaEffettiva("/te-neri/darjeeling/", m)?.description ?? "";
    return [
      C("Hai scritto la description", !!d.trim(), "Pannello → /te-neri/darjeeling/: scrivi nel campo Meta description e salva."),
      C("È tra 100 e 160 caratteri", d.length >= 100 && d.length <= 160, `Ora ha ${d.length} caratteri.`),
      C("Nomina il Darjeeling", normalizza(d).includes("darjeeling"), "Chi legge deve capire subito che la pagina parla del Darjeeling."),
      C("Dà un motivo per cliccare", /spedizion|biologic|foglie|regalo|gratuit|24|48|reso|india|himalaya|raccolt/.test(normalizza(d)), "Aggiungi un vantaggio concreto: spedizione, biologico, foglie intere, provenienza."),
      C("Nessuna promessa sulla salute", !d || senzaSalute(d), "Per un alimento non si possono promettere effetti sulla salute."),
    ];
  },

  // Livello 2 · Diagnosi (dalle missioni di prima)
  tisaneVisibili: (m) => [
    C("La categoria Tisane è di nuovo visibile ai motori di ricerca", !m.tema.nascoste.includes("tisane"), "Pannello del negozio → Tema e impostazioni: spunta Tisane."),
    C("Nessun'altra categoria è nascosta", m.tema.nascoste.filter((c) => c !== "tisane").length === 0, "Hai nascosto un'altra categoria: rimettila visibile."),
    C("Carrello e account restano fuori da Google", ["/carrello/", "/account/"].every((u) => (paginaEffettiva(u, m)?.robots ?? "").includes("noindex")), "Il carrello e l'account devono restare in noindex."),
  ],
  redirect404: (m) => {
    const a = m.redirect["/te-neri/earl-grey-classico/"];
    return [
      C("C'è un 301 da /te-neri/earl-grey-classico/", !!a, "Pannello → Reindirizzamenti: scrivi l'indirizzo vecchio nel campo Da."),
      C("Porta al prodotto che lo sostituisce", a === "/te-neri/earl-grey-bio/", "Leggi la nota del 404 nel crawler: qual è il sostituto? Scrivi il suo indirizzo nel campo A."),
      C("La pagina di arrivo funziona (stato 200)", !!a && paginaEffettiva(a, m)?.stato === 200, "Controlla che l'indirizzo di arrivo esista nel negozio."),
    ];
  },
  catena: (m) => {
    const passi = catena("/prodotto.php?id=12", m);
    return [
      C("/prodotto.php?id=12 porta direttamente al Sencha biologico", m.redirect["/prodotto.php?id=12"] === "/te-verdi/sencha-bio/", "Modifica il reindirizzamento di /prodotto.php?id=12: la destinazione finale è /te-verdi/sencha-bio/."),
      C("Arriva in un solo salto", passi.length === 2, "Un indirizzo deve rimandare subito alla pagina finale, non a un altro reindirizzamento."),
      C("Anche /te-verdi/sencha/ porta ancora al Sencha", m.redirect["/te-verdi/sencha/"] === "/te-verdi/sencha-bio/", "Non eliminare il redirect di /te-verdi/sencha/: senza, quell'indirizzo darebbe 404."),
    ];
  },
  convalidaNoindex: (m) => [
    C("Le tisane sono di nuovo visibili sul sito", !m.tema.nascoste.includes("tisane"), "Prima correggi il sito (passo 2)."),
    C("Hai chiesto a Google di convalidare la correzione", !!m.convalide['Esclusa in base al tag "noindex"'], "Pagine e indicizzazione → motivo noindex → Convalida correzione."),
  ],

  titoloTeVerdi: (m) => {
    // Si controlla la pagina com'è adesso sul sito (anche i campi che non hai toccato)
    const p = paginaEffettiva("/te-verdi/", m);
    const t = p?.title ?? "", d = p?.description ?? "";
    const px = pixel(t);
    const parole = normalizza(t).split(" ");
    return [
      C("Hai scritto un nuovo title", !!t && t !== "Tè verdi | Cinque Foglie", "Pannello → Pagine → /te-verdi/: scrivi il title e salva."),
      C("Il title inizia con «tè verdi»", normalizza(t).startsWith("te verdi"), "Metti la keyword della pagina all'inizio."),
      C("Il title è tra 30 caratteri e 580 pixel", t.length >= 30 && px <= 580, px > 580 ? `È lungo ${px} px: Google lo taglierebbe.` : "È troppo corto: aggiungi cosa c'è di specifico (biologici, i nomi dei tè)."),
      C("Il nome del brand è alla fine", cerca(t, "cinque foglie", true) !== null, "Chiudi il title con «| Cinque Foglie»."),
      C("Nessuna parola ripetuta troppe volte", quante(t, "te verd") <= 1 && new Set(parole).size >= parole.length - 2, "Usa la keyword una volta sola: ripeterla sembra spam."),
      C("La description è tra 100 e 160 caratteri", d.length >= 100 && d.length <= 160, `Ora ha ${d.length} caratteri.`),
      C("La description nomina i tè che si trovano nella pagina", TE_VERDI.some((n) => normalizza(d).includes(n)) || normalizza(d).includes("te verd"), "Scrivi quali tè ci sono (Sencha, Gyokuro…) o almeno «tè verdi»."),
      C("Nessuna promessa sulla salute", !t || senzaSalute(t, d || " "), "Togli parole come dimagrire, brucia grassi, detox, benefici."),
    ];
  },
  testoTeVerdi: (m) => {
    const i = m.pagine["/te-verdi/"]?.intro ?? "";
    const n = contaParole(i);
    const nomi = TE_VERDI.filter((x) => normalizza(i).includes(x)).length;
    const kw = quante(i, "te verd");
    return [
      C("Il testo ha tra 60 e 300 parole", n >= 60 && n <= 300, `Ora ha ${n} parole.`),
      C("Spiega come prepararli (temperatura o tempo)", /°|grad|temperatur|minut/.test(normalizza(i)), "Aggiungi la temperatura dell'acqua o il tempo di infusione."),
      C("Nomina almeno due tè della categoria", nomi >= 2, "Cita i tè che si trovano nella pagina, es. Sencha e Gyokuro."),
      C("Parla di tè verdi senza ripeterlo troppo", kw >= 1 && kw <= 4, kw > 4 ? `«tè verde/i» compare ${kw} volte: è troppo.` : "Usa almeno una volta «tè verde» o «tè verdi»."),
      C("Nessuna promessa sulla salute", !i || senzaSalute(i), "Togli frasi su dimagrire, difese, detox, benefici."),
    ];
  },
  richiestaTeVerdi: (m) => [
    C("La pagina /te-verdi/ è stata aggiornata", !!m.pagine["/te-verdi/"]?.title, "Prima scrivi title, description e testo (passi 2 e 3)."),
    C("Hai chiesto a Google di rileggerla", !!m.richieste["/te-verdi/"], "Console di ricerca → Controllo URL → /te-verdi/ → Richiedi indicizzazione."),
  ],

  // Diagnosi
  canonicalFiltri: (m) => [
    C("Il canonical delle pagine filtrate è attivo", m.tema.canonicalFiltri, "Pannello → Tema e impostazioni → Pagine filtrate: attiva il canonical verso la categoria."),
    C("Le categorie restano visibili", m.tema.nascoste.length === 0 || (m.tema.nascoste.length === 1 && m.tema.nascoste[0] === "tisane"), "Non nascondere le categorie: il problema riguarda solo le versioni filtrate."),
  ],

  // Casi
  titoloGuidaSencha: (m) => {
    const t = paginaEffettiva("/blog/sencha-guida-completa/", m)?.title ?? "";
    const px = pixel(t);
    return [
      C("Hai cambiato il title", t !== "Tè verde Sencha: cos'è, come si prepara e dove comprarlo | Cinque Foglie", "Pannello → /blog/sencha-guida-completa/: riscrivi il title e salva."),
      C("Parla del Sencha", ha(t, /sencha/), "È una guida al Sencha: il nome deve esserci."),
      C("Non promette più un acquisto", !ha(t, /compr|acquist|prezz|offert|vendit|shop/), "È una guida: togli «dove comprarlo» e le parole da negozio."),
      C("Dice cosa si impara", ha(t, /prepar|cos.e|guida|temperatur|infusion|come /), "Fai capire cosa trova chi legge: cos'è, come si prepara, temperatura…"),
      C("Il brand è alla fine", cerca(t, "cinque foglie", true) !== null, "Chiudi con «| Cinque Foglie»."),
      C("Sta entro 580 pixel", !!t && px <= 580, `È lungo ${px} px: Google lo taglierebbe.`),
    ];
  },
  ticketLcp: (_m, t) => [
    C("Dice quali pagine", ha(t, /prodott|schede/), "Scrivi su quali pagine c'è il problema."),
    C("Dice su quale dispositivo", ha(t, /telefon|mobile|smartphone|cellular/), "Il problema c'è solo da telefono: dillo."),
    C("Dà il dato che lo dimostra", ha(t, /lcp|4[,.]1|secondi|2[,.]5/), "Aggiungi il dato: LCP di 4,1 secondi, soglia 2,5."),
    C("Dice la causa", ha(t, /foto|immagin|jpg|mb|peso/), "Scrivi la causa: la foto principale troppo pesante."),
    C("Propone cosa fare", ha(t, /compri|ridott|ridurre|webp|avif|version|dimension|leggera|ottimizz/), "Proponi una soluzione: versione ridotta per telefono, formato WebP, dimensioni nel codice."),
  ],
  messaggioElena: (_m, t) => [
    C("Dice dove nasce il calo", ha(t, /tisan/), "La conclusione principale: il calo viene dalle tisane."),
    C("Dice perché", ha(t, /noindex|tema|nascost/), "Spiega la causa: il noindex arrivato con il nuovo tema."),
    C("Dice da quando", ha(t, /18|settembre|09/), "Dai la data: dal 18 settembre."),
    C("Dice quanto costa", ha(t, /€|euro|4[0-9]{2}/), "Metti il costo al mese in euro."),
    C("Separa quello che è normale", ha(t, /fredd|stagion/), "Spiega che il calo dei tè freddi è stagionale."),
    C("Dice cosa si fa", ha(t, /tolt|togli|corrett|corregg|sistemat|convalid|chiesto|richiest/), "Chiudi con la soluzione: cosa hai fatto o cosa proponi."),
  ],
  briefRegali: (_m, t) => [
    C("Ha la keyword", ha(t, /regal/), "Scrivi la keyword principale: quella sui regali."),
    C("Dice entro quando", ha(t, /novembre|ottobre|settiman|entro|[0-9]{1,2}\/1[01]/), "Dai una data: le ricerche salgono a novembre."),
    C("Dice per chi è", ha(t, /chi |per chi|pubblico|lettor|cerca/), "Scrivi per chi è l'articolo."),
    C("Dice cosa deve contenere", ha(t, /sezion|idee|punti|parti|contenere|parlare/), "Elenca i punti da coprire."),
    C("Dice quali prodotti linkare", ha(t, /link|kit|teier|prodott|tazz|accessori/), "Indica i prodotti da linkare: è da lì che arrivano le vendite."),
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
