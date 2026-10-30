// VERIFICHE DELLA SIMULAZIONE BRAND (passi "azione" e "testo")
// Si controlla il lavoro salvato negli strumenti (stato.ts) o il testo scritto nella guida.
// Bilingue: nomi e suggerimenti passano da t(italiano, inglese); le parole cercate nei testi valgono
// in tutte e due le lingue (chi gioca in inglese scrive posizionamento, testi e comunicato in inglese).
import type { Controllo } from "../verifiche";
import { normalizza } from "../controlli-seo";
import { leggi, testo, contaParole, type Modifiche } from "./stato";
import { t } from "../lingua";

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
// normalizza() toglie gli accenti e cambia l'apostrofo in spazio ("isn't" -> "isn t")
const ha = (x: string, re: RegExp) => re.test(normalizza(x ?? ""));
const urla = (x: string) => /!!/.test(x) || (x.replace(/[^A-Za-zÀ-ú]/g, "").length > 12 && x.replace(/[^A-ZÀ-Ú]/g, "").length / x.replace(/[^A-Za-zÀ-ú]/g, "").length > 0.5);
const SUPERLATIVI = /il migliore|la migliore|i migliori|piu buon[oi] (di sempre|d italia|al mondo)|unico al mondo|numero uno|il piu bello|il piu amato|imbattibil|the best|best ever|tastiest|number one|unique in the world|most loved|most beautiful|unbeatable|world s best/;
// Il registro formale e freddo che il manuale vieta (in italiano: il "lei")
const FORMALE = /\b(sua|suo|suoi|sue|la informiamo|gentile cliente|distinti saluti|lei)\b|dear customer|we hereby|we inform you|yours faithfully|kind regards/;
const VICINO = /\b(ti|tuo|tua|tuoi|hai|puoi|sei|you|your)\b/;
const VERDI_GENERICHE = /sostenibil|impatto zero|eco[- ]?friendly|\beco\b|green|ecologic|amico dell ambiente|rispetta l ambiente|neutral|a zero emission|carbon|sustainab|zero.?impact|environment(ally)?.?friendly|planet.?friendly|climate/;
const PUBBLICO = /ogni giorno|quotidian|curios|25|40|chi beve|capire|every ?day|daily|enthusiast|drink tea|tea drinkers|understand/;
const SEMPLICE = /spieg|semplic|guid|capire|chiar|expla|simpl|guide|understand|clear/;

// Firma: l'ultimo pezzo del testo è corto e contiene un nome con la maiuscola (es. «A presto, Anna» o «Anna»)
function firmata(x: string) {
  const fine = x.trim().split(/[\n.!?]/).map((y) => y.trim()).filter(Boolean).pop() ?? "";
  const parole = fine.split(/[\s,]+/).filter(Boolean);
  return parole.length > 0 && parole.length <= 6 && (parole.length === 1 ? /^[A-Z]/.test(parole[0]) : parole.slice(1).some((w) => /^[A-Z]/.test(w)));
}

type V = (m: Modifiche, testo: string) => Controllo[];
export const VERIFICHE_BRAND: Record<string, V> = {
  brand_tutorial: (m) => [C(t("Il payoff è «Tè e tisane, spiegati semplici»", "The tagline is «Teas and herbal teas, explained simply»"), ha(m.payoff, /te e tisane,? spiegati semplici|teas and herbal teas,? explained simply/), t("Manuale → campo Payoff: scrivi la frase e premi Salva.", "Manual → Tagline field: write the sentence and press Save."))],

  // Basi
  brand_posizionamento: (m) => {
    const p = m.posizionamento, tutto = Object.values(p).join(" ");
    return [
      C(t("Hai compilato tutti e quattro i campi", "You filled in all four fields"), ["perChi", "categoria", "differenza", "prova"].every((k) => ((p as any)[k] ?? "").trim().length > 3), t("Manuale → Posizionamento: compila per chi, che cosa, cosa ci rende diversi, perché crederci, poi Salva.", "Manual → Positioning: fill in who it's for, what, what makes us different, why believe it, then Save.")),
      C(t("Per chi: un pubblico preciso (non «tutti»)", "Who it's for: a precise audience (not «everyone»)"), ha(p.perChi ?? "", PUBBLICO) && !ha(p.perChi ?? "", /^tutti|chiunque|^everyone|^anyone|^all /), t("Usa il segmento più grande delle Ricerche: chi beve tè ogni giorno e vuole capire cosa compra.", "Use the largest segment in the Research: people who drink tea every day and want to understand what they buy.")),
      C(t("Che cosa: la categoria (tè e tisane)", "What: the category (teas and herbal teas)"), ha(p.categoria ?? "", /te|tisan|infus|tea|herbal/), t("Scrivi la categoria: per esempio «il negozio online di tè e tisane biologici».", "Write the category: for example «the online shop of organic teas and herbal teas».")),
      C(t("Cosa ci rende diversi: lo spazio libero tra i concorrenti", "What makes us different: the free space between competitors"), ha(p.differenza ?? "", SEMPLICE), t("La differenza che nessun concorrente occupa: spiegare il tè in modo semplice.", "The difference no competitor holds: explaining tea simply.")),
      C(t("Perché crederci: un fatto verificabile", "Why believe it: a verifiable fact"), ha(p.prova ?? "", /\d|certific|guid|produttor|biologic|certif|guide|grower|producer|organic/), t("Scrivi un fatto: «guide per ogni tè», «tutto certificato biologico», «8 piccoli produttori».", "Write a fact: «guides for every tea», «everything certified organic», «8 small growers».")),
      C(t("Niente superlativi che non si dimostrano", "No superlatives that can't be proven"), !ha(tutto, SUPERLATIVI), t("Togli «il migliore» e simili: non distinguono e non si dimostrano.", "Remove «the best» and the like: they set nobody apart and can't be proven.")),
    ];
  },
  brand_email: (m) => {
    const x = testo("t2", m);
    return [
      C(t("Hai riscritto il testo", "You rewrote the text"), x !== testo("t2", { ...m, testi: {} }) && x.trim().length > 10, t("Testi → Email della promozione → scrivi la versione nuova e premi Salva.", "Copy → Promotion email → write the new version and press Save.")),
      C(t("Niente maiuscole per gridare e niente «!!»", "No capitals for shouting and no «!!»"), !urla(x), t("Scrivi in modo normale: il manuale vieta le urla.", "Write normally: the manual forbids shouting.")),
      C(t("Dice l'offerta (-15%, solo oggi)", "It states the offer (15% off, today only)"), /15/.test(x) && ha(x, /oggi|24 ore|stasera|fino a mezzanotte|today|24 hours|tonight|until midnight/), t("Mantieni l'offerta: -15%, solo oggi.", "Keep the offer: 15% off, today only.")),
      C(t("Niente fretta finta", "No fake urgency"), !ha(x, /compra subito|affrettat|prima che finisca|corri|ultim[ie] (pezzi|occasion)|buy now|hurry|before it ends|before it s gone|last (few|chance)|don t miss/), t("Togli «compra subito» e «prima che finisca».", "Remove «buy now» and «before it ends».")),
      C(t("È breve (massimo 40 parole)", "It's short (40 words at most)"), contaParole(x) <= 40, t(`Ora sono ${contaParole(x)} parole: è l'oggetto con la prima riga.`, `It's ${contaParole(x)} words now: it's the subject and the first line.`)),
    ];
  },
  brand_assistenza: (m) => {
    const x = testo("t4", m);
    return [
      C(t("Dà del tu", "It's warm and direct, not stiffly formal"), !ha(x, FORMALE) && ha(x, VICINO), t("Il manuale dice: sempre il tu. Togli «Gentile cliente», «Sua», «Distinti saluti».", "The manual says: always warm and direct. Remove «Dear customer», «we hereby», «Yours faithfully».")),
      C(t("Riconosce l'attesa", "It acknowledges the wait"), ha(x, /attesa|aspett|capisc|dispiac|scus|wait|understand|sorry|apolog/), t("Inizia mostrando che capisci: «Capisco l'attesa».", "Start by showing you understand: «I understand the wait».")),
      C(t("Dice cosa succede e quando", "It says what happens and when"), ha(x, /entro|giorn|ore|domani|luned|marted|mercoled|gioved|venerd|tracking|traccia|within|\bby\b|day|hour|tomorrow|monday|tuesday|wednesday|thursday|friday|track/), t("Dai un'informazione concreta: quando arriva, come seguirlo.", "Give concrete information: when it arrives, how to track it.")),
      C(t("È firmata da una persona", "It's signed by a person"), firmata(x), t("Chiudi con un nome: «Anna, assistenza Cinque Foglie».", "Finish with a name: «Anna, Cinque Foglie customer service».")),
      C(t("Niente frasi vuote", "No empty phrases"), !ha(x, /presa in carico|tempistiche previste|evasa|has been received|processed|expected timeframe|in due course/), t("Togli «presa in carico» e «tempistiche previste»: non dicono niente.", "Remove «has been received» and «expected timeframes»: they say nothing.")),
    ];
  },

  // Diagnosi
  brand_promessa: (m) => {
    const x = testo("t1", m);
    return [
      C(t("Non promette più 24 ore", "It no longer promises 24 hours"), !ha(x, /24 ore|24h|in giornata|domani|24 hours|same.?day|next.?day|tomorrow/), t("Oggi le spedizioni ci mettono in media 4 giorni: non promettere 24 ore.", "Shipping takes 4 days on average today: don't promise 24 hours.")),
      C(t("Dice tempi veri", "It states real timeframes"), ha(x, /[2-5]\s?(-|a|o)\s?[3-5] giorni|[3-5] giorni|pochi giorni|giorni lavorativi|[2-5]\s?(-|to)\s?[3-5] (working |business )?days|[3-5] (working |business )?days|a few days|working days/), t("Scrivi tempi che riusciamo a mantenere, per esempio «in 3-5 giorni lavorativi».", "Write timeframes we can keep, for example «in 3-5 working days».")),
      C(t("Resta la frase del brand (tè e tisane biologici)", "The brand line stays (organic teas and herbal teas)"), ha(x, /te|tisan|tea|herbal/), t("Non perdere il messaggio principale: tè e tisane biologici.", "Don't lose the main message: organic teas and herbal teas.")),
    ];
  },
  brand_packaging: (m) => {
    const x = testo("t5", m);
    return [
      C(t("Niente affermazioni ambientali generiche", "No generic environmental claims"), !ha(x, VERDI_GENERICHE), t("Togli sostenibile, impatto zero, eco, green: dal 27/09/2026 non si possono usare senza prove riconosciute.", "Remove sustainable, zero impact, eco, green: since 27/09/2026 they can't be used without recognised proof.")),
      C(t("Parla della latta e del riciclo", "It mentions the tin and recycling"), ha(x, /latta|allumini|\btin\b|alumin/) && ha(x, /riciclabil|ricicla|recycl/), t("Scrivi un fatto preciso: «latta in alluminio riciclabile».", "Write a precise fact: «recyclable aluminium tin».")),
      C(t("Parla della busta compostabile certificata", "It mentions the certified compostable bag"), ha(x, /busta|\bbag\b|pouch/) && ha(x, /compostabil|compostab/) && ha(x, /13432|certific|certif/), t("Aggiungi: «busta interna compostabile certificata EN 13432».", "Add: «inner bag certified compostable to EN 13432».")),
      C(t("Non dice cose false sulla plastica", "It doesn't say false things about plastic"), !ha(x, /senza plastica|plastic[- ]?free|zero plastica|no plastic|without plastic/), t("Da ottobre c'è il pluriball: non scrivere «senza plastica».", "Since October there's bubble wrap: don't write «plastic-free».")),
    ];
  },

  // Casi
  brand_piano: (m) => {
    const p = m.piano;
    // i KPI sono salvati con il loro codice (il nome italiano), qualunque sia la lingua della pagina
    const KPI_BUONI = ["Notorietà spontanea", "Notorietà guidata", "Ricerche del nome del negozio", "NPS"];
    const buoni = (p.kpi ?? []).filter((k) => KPI_BUONI.includes(k));
    return [
      C(t("L'obiettivo ha numeri", "The goal has numbers"), /\d/.test(p.obiettivo ?? "") && ha(p.obiettivo ?? "", /%|per cento|percent/), t("Scrivi da quanto a quanto: per esempio «dal 4% al 7%».", "Write from how much to how much: for example «from 4% to 7%».")),
      C(t("L'obiettivo ha una scadenza", "The goal has a deadline"), ha(p.obiettivo ?? "", /2027|entro|dicembre|giugno|\bby\b|december|june/), t("Aggiungi entro quando.", "Add by when.")),
      C(t("L'obiettivo riguarda la notorietà o la fiducia", "The goal is about awareness or trust"), ha(p.obiettivo ?? "", /notoriet|conosc|nps|consigli|ricord|awareness|known|recommend|recall/), t("Un piano di brand misura notorietà o fiducia, non le vendite di un mese.", "A brand plan measures awareness or trust, not a month's sales.")),
      C(t("Il pubblico è quello del posizionamento", "The audience is the positioning's one"), ha(p.pubblico ?? "", PUBBLICO), t("Usa il pubblico principale: i curiosi del tè di ogni giorno.", "Use the main audience: everyday tea enthusiasts.")),
      C(t("Il messaggio è coerente con il brand", "The message is consistent with the brand"), ha(p.messaggio ?? "", SEMPLICE) && !ha(p.messaggio ?? "", SUPERLATIVI), t("Il messaggio riprende la differenza: il tè biologico spiegato semplice.", "The message picks up the difference: organic tea explained simply.")),
      C(t("Da 3 a 5 canali", "3 to 5 channels"), (p.canali ?? []).length >= 3 && (p.canali ?? []).length <= 5, t(`Ne hai scelti ${(p.canali ?? []).length}: un piano sceglie.`, `You chose ${(p.canali ?? []).length}: a plan makes choices.`)),
      C(t("Almeno 2 KPI che misurano l'obiettivo, massimo 4 in tutto", "At least 2 KPIs that measure the goal, 4 at most in total"), buoni.length >= 2 && (p.kpi ?? []).length <= 4, t("Scegli KPI di brand: notorietà, ricerche del nome, NPS.", "Choose brand KPIs: awareness, searches for the name, NPS.")),
    ];
  },
  brand_comunicato: (m) => {
    const c = m.comunicato, tutto = [c.titolo, c.sottotitolo, c.testo].join(" ");
    const primo = (c.testo ?? "").trim().split(/\n\s*\n/)[0] ?? "";
    return [
      C(t("Il titolo parla del calendario dell'avvento", "The headline is about the advent calendar"), ha(c.titolo ?? "", /calendario dell.? ?avvento|advent calendar/), t("Il titolo deve dire subito la notizia.", "The headline must give the news straight away.")),
      C(t("Il titolo è informativo e breve (massimo 100 caratteri)", "The headline is informative and short (100 characters at most)"), (c.titolo ?? "").trim().length > 15 && (c.titolo ?? "").length <= 100, t("Un titolo da giornale: una riga.", "A newspaper headline: one line.")),
      C(t("Il primo paragrafo dice chi, cosa e quando", "The first paragraph says who, what and when"), ha(primo, /cinque foglie/) && ha(primo, /calendario|calendar/) && ha(primo, /2 novembre|novembre|november/), t("Nel primo paragrafo: Cinque Foglie, il calendario, dal 2 novembre (separa i paragrafi con una riga vuota).", "In the first paragraph: Cinque Foglie, the calendar, from 2 November (separate paragraphs with an empty line).")),
      C(t("Contiene i fatti concreti", "It contains the concrete facts"), ha(tutto, /24/) && ha(tutto, /produttor|grower|producer/), t("Metti i numeri: 24 tè, 8 piccoli produttori.", "Put in the numbers: 24 teas, 8 small growers.")),
      C(t("Ha una citazione", "It has a quote"), /[«"“].{15,}[»"”]/.test(c.testo ?? ""), t("Aggiungi la citazione di Marco F., tra virgolette.", "Add Marco F.'s quote, in quotation marks.")),
      C(t("Ha prezzo e dove si compra", "It has the price and where to buy it"), /34,90|34\.90/.test(tutto) && ha(tutto, /online|sito|website|cinquefoglie\.example/), t("Scrivi il prezzo e dove si compra.", "Write the price and where to buy it.")),
      C(t("Ha i contatti stampa", "It has the press contacts"), ha(c.contatti ?? "", /@|045|telefono|phone/), t("Nel campo Contatti: chi contattare, email e telefono.", "In the Contacts field: who to contact, email and phone.")),
      C(t("Niente superlativi", "No superlatives"), !ha(tutto, SUPERLATIVI), t("Togli «il migliore», «unico al mondo»: il giornalista li cancella.", "Remove «the best», «unique in the world»: the journalist will delete them.")),
      C(t("Sta in una pagina (massimo 400 parole)", "It fits on one page (400 words at most)"), contaParole(c.testo ?? "") <= 400, t(`Ora sono ${contaParole(c.testo ?? "")} parole.`, `It's ${contaParole(c.testo ?? "")} words now.`)),
    ];
  },
  brand_destinatari: (m) => {
    const d = m.destinatari, pertinenti = ["g1", "g2", "g3", "g4", "g8"].filter((x) => d.includes(x));
    return [
      C(t("Almeno 4 giornalisti pertinenti", "At least 4 relevant journalists"), pertinenti.length >= 4, t(`Ne hai scelti ${pertinenti.length} tra quelli che si occupano di cucina, tè, regali o imprese locali.`, `You chose ${pertinenti.length} among those covering food, tea, gifts or local businesses.`)),
      C(t("Nessun giornalista fuori tema", "No off-topic journalists"), !d.includes("g5") && !d.includes("g7"), t("Sport e cronaca nera non c'entrano con un calendario di tè.", "Sport and crime news have nothing to do with a tea calendar.")),
      C(t("Rispetti chi ha chiesto di non essere contattato", "You respect people who asked not to be contacted"), !d.includes("g6"), t("Elisa Fontana ha chiesto di non ricevere più comunicati: toglila.", "Elisa Fontana asked to stop receiving press releases: remove her.")),
    ];
  },
  brand_rispostaGiornalista: (m) => {
    const x = m.risposte.r1 ?? "";
    return [
      C(t("Hai risposto", "You replied"), x.trim().length > 0, t("Ufficio stampa → Richieste → rispondi a Paolo Neri.", "Press office → Requests → reply to Paolo Neri.")),
      C(t("Dici i fatti: non tutti i kit, circa 40", "You give the facts: not all the kits, about 40"), ha(x, /40|quaranta|forty/) && !ha(x, /tutti i kit (sono|erano|hanno)|all (the )?kits (are|were|have)/), t("Usa la nota interna: circa 40 kit, gli altri non hanno avuto problemi.", "Use the internal note: about 40 kits, the others had no problems.")),
      C(t("Rispondi sul ritiro", "You answer about the withdrawal"), ha(x, /ritir|trasporto|spedizion|withdraw|recall|transport|transit|shipping/), t("Paolo chiede del ritiro: spiega che il problema è nato nel trasporto, non nel prodotto.", "Paolo asks about a withdrawal: explain that the problem arose in transport, not in the product.")),
      C(t("Dici il rimedio", "You state the remedy"), ha(x, /frusta nuova|nuova frusta|gratis|sostitu|rispedi|new whisk|free|replace|resend|re-send/), t("Scrivi cosa ricevono i clienti coinvolti.", "Write what the customers involved receive.")),
      C(t("Dici cosa cambia", "You say what's changing"), ha(x, /astuccio|imballag|3 novembre|\bcase\b|packag|3 november|november 3/), t("Scrivi cosa avete cambiato perché non succeda di nuovo.", "Write what you've changed so it doesn't happen again.")),
      C(t("Dai un contatto", "You give a contact"), ha(x, /elena|045|@|contatt|disponibil|contact|available/), t("Indica il portavoce: Elena M.", "Name the spokesperson: Elena M.")),
      C(t("Niente «no comment» né colpe ad altri", "No «no comment» and no blaming others"), !ha(x, /no comment|nessun commento|colpa del corrier|non e colpa nostra|courier s fault|not our fault/), t("Rispondi nel merito e senza scaricare colpe.", "Answer the question and don't shift the blame.")),
      C(t("È una risposta completa (almeno 40 parole)", "It's a complete reply (at least 40 words)"), contaParole(x) >= 40, t(`Ora sono ${contaParole(x)} parole.`, `It's ${contaParole(x)} words now.`)),
    ];
  },

  // Testi scritti nella guida
  brand_reportNotorieta: (_m, x) => [
    C(t("Rispondi alla domanda (crisi sì o no)", "You answer the question (crisis or not)"), ha(x, /non (e|siamo) in crisi|nessuna crisi|non c e (una )?crisi|non e una crisi|not in (a )?crisis|no crisis|isn t (a|in) crisis|there is no crisis|not a crisis/), t("Inizia dalla risposta: il brand non è in crisi.", "Start with the answer: the brand isn't in crisis.")),
    C(t("Spieghi il falso allarme delle ricerche", "You explain the false alarm about searches"), ha(x, /ricerch|search/) && ha(x, /ogni anno|stagional|2025|anno scorso|22|every year|seasonal|last year/), t("Le ricerche calano ogni anno dopo l'estate e crescono rispetto al 2025.", "Searches fall every year after the summer and are growing compared with 2025.")),
    C(t("Indichi il problema vero (NPS e spedizioni)", "You point out the real problem (NPS and shipping)"), ha(x, /nps|31/) && ha(x, /spedizion|consegn|ritard|shipping|deliver|late|delay/), t("Il problema vero: NPS da 52 a 31 per le spedizioni.", "The real problem: NPS from 52 to 31 because of shipping.")),
    C(t("Proponi cosa fare", "You propose what to do"), ha(x, /propon|promessa|magazzino|corrett|sistem|propos|promise|warehouse|correct|fix/), t("Chiudi con cosa avete fatto o proponete.", "Finish with what you've done or propose.")),
  ],
  brand_sintesiPiano: (_m, x) => [
    C(t("Dici l'obiettivo con i numeri", "You state the goal with numbers"), ha(x, /notoriet|awareness/) && /\d\s?%/.test(x), t("Scrivi l'obiettivo: notorietà spontanea dal 4% al 7%.", "Write the goal: unaided awareness from 4% to 7%.")),
    C(t("Dici per chi e con quale messaggio", "You say for whom and with which message"), ha(x, PUBBLICO) && ha(x, /spieg|semplic|expla|simpl/), t("Scrivi il pubblico e il messaggio.", "Write the audience and the message.")),
    C(t("Dici i canali", "You name the channels"), ha(x, /stampa|social|creator|newsletter|eventi|podcast|press|events/), t("Nomina i canali principali.", "Name the main channels.")),
    C(t("Dici come misurerete", "You say how you'll measure"), ha(x, /misur|sondaggio|kpi|nps|ricerche del nome|measur|survey|searches for the name/), t("Scrivi come misurerete il risultato.", "Write how you'll measure the result.")),
  ],
};
export const leggiBrand = leggi;
