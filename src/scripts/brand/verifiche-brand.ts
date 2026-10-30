// VERIFICHE DELLA SIMULAZIONE BRAND (passi "azione" e "testo")
// Si controlla il lavoro salvato negli strumenti (stato.ts) o il testo scritto nella guida.
import type { Controllo } from "../verifiche";
import { normalizza, senzaSalute } from "../controlli-seo";
import { leggi, testo, contaParole, type Modifiche } from "./stato";

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
const ha = (t: string, re: RegExp) => re.test(normalizza(t ?? ""));
const urla = (t: string) => /!!/.test(t) || (t.replace(/[^A-Za-zÀ-ú]/g, "").length > 12 && t.replace(/[^A-ZÀ-Ú]/g, "").length / t.replace(/[^A-Za-zÀ-ú]/g, "").length > 0.5);
const SUPERLATIVI = /il migliore|la migliore|i migliori|piu buon[oi] (di sempre|d italia|al mondo)|unico al mondo|numero uno|il piu bello|il piu amato|imbattibil/;
const DEL_LEI = /\b(sua|suo|suoi|sue|la informiamo|gentile cliente|distinti saluti|lei)\b/;
const VERDI_GENERICHE = /sostenibil|impatto zero|eco[- ]?friendly|\beco\b|green|ecologic|amico dell ambiente|rispetta l ambiente|neutral|a zero emission|carbon/;

// Firma: l'ultimo pezzo del testo è corto e contiene un nome con la maiuscola (es. «A presto, Anna» o «Anna»)
function firmata(t: string) {
  const fine = t.trim().split(/[\n.!?]/).map((x) => x.trim()).filter(Boolean).pop() ?? "";
  const parole = fine.split(/[\s,]+/).filter(Boolean);
  return parole.length > 0 && parole.length <= 6 && (parole.length === 1 ? /^[A-Z]/.test(parole[0]) : parole.slice(1).some((w) => /^[A-Z]/.test(w)));
}

type V = (m: Modifiche, testo: string) => Controllo[];
export const VERIFICHE_BRAND: Record<string, V> = {
  brand_tutorial: (m) => [C("Il payoff è «Tè e tisane, spiegati semplici»", ha(m.payoff, /te e tisane,? spiegati semplici/), "Manuale → campo Payoff: scrivi la frase e premi Salva.")],

  // Basi
  brand_posizionamento: (m) => {
    const p = m.posizionamento, tutto = Object.values(p).join(" ");
    return [
      C("Hai compilato tutti e quattro i campi", ["perChi", "categoria", "differenza", "prova"].every((k) => ((p as any)[k] ?? "").trim().length > 3), "Manuale → Posizionamento: compila per chi, che cosa, cosa ci rende diversi, perché crederci, poi Salva."),
      C("Per chi: un pubblico preciso (non «tutti»)", ha(p.perChi ?? "", /ogni giorno|quotidian|curios|25|40|chi beve|capire/) && !ha(p.perChi ?? "", /^tutti|chiunque/), "Usa il segmento più grande delle Ricerche: chi beve tè ogni giorno e vuole capire cosa compra."),
      C("Che cosa: la categoria (tè e tisane)", ha(p.categoria ?? "", /te|tisan|infus/), "Scrivi la categoria: per esempio «il negozio online di tè e tisane biologici»."),
      C("Cosa ci rende diversi: lo spazio libero tra i concorrenti", ha(p.differenza ?? "", /spieg|semplic|guid|capire|chiar/), "La differenza che nessun concorrente occupa: spiegare il tè in modo semplice."),
      C("Perché crederci: un fatto verificabile", ha(p.prova ?? "", /\d|certific|guid|produttor|biologic/), "Scrivi un fatto: «guide per ogni tè», «tutto certificato biologico», «8 piccoli produttori»."),
      C("Niente superlativi che non si dimostrano", !ha(tutto, SUPERLATIVI), "Togli «il migliore» e simili: non distinguono e non si dimostrano."),
    ];
  },
  brand_email: (m) => {
    const t = testo("t2", m);
    return [
      C("Hai riscritto il testo", t !== testo("t2", { ...m, testi: {} }) && t.trim().length > 10, "Testi → Email della promozione → scrivi la versione nuova e premi Salva."),
      C("Niente maiuscole per gridare e niente «!!»", !urla(t), "Scrivi in modo normale: il manuale vieta le urla."),
      C("Dice l'offerta (-15%, solo oggi)", /15/.test(t) && ha(t, /oggi|24 ore|stasera|fino a mezzanotte/), "Mantieni l'offerta: -15%, solo oggi."),
      C("Niente fretta finta", !ha(t, /compra subito|affrettat|prima che finisca|corri|ultim[ie] (pezzi|occasion)/), "Togli «compra subito» e «prima che finisca»."),
      C("È breve (massimo 40 parole)", contaParole(t) <= 40, `Ora sono ${contaParole(t)} parole: è l'oggetto con la prima riga.`),
    ];
  },
  brand_assistenza: (m) => {
    const t = testo("t4", m);
    return [
      C("Dà del tu", !ha(t, DEL_LEI) && ha(t, /\b(ti|tuo|tua|tuoi|hai|puoi|sei)\b/), "Il manuale dice: sempre il tu. Togli «Gentile cliente», «Sua», «Distinti saluti»."),
      C("Riconosce l'attesa", ha(t, /attesa|aspett|capisc|dispiac|scus/), "Inizia mostrando che capisci: «Capisco l'attesa»."),
      C("Dice cosa succede e quando", ha(t, /entro|giorn|ore|domani|luned|marted|mercoled|gioved|venerd|tracking|traccia/), "Dai un'informazione concreta: quando arriva, come seguirlo."),
      C("È firmata da una persona", firmata(t), "Chiudi con un nome: «Anna, assistenza Cinque Foglie»."),
      C("Niente frasi vuote", !ha(t, /presa in carico|tempistiche previste|evasa/), "Togli «presa in carico» e «tempistiche previste»: non dicono niente."),
    ];
  },

  // Diagnosi
  brand_promessa: (m) => {
    const t = testo("t1", m);
    return [
      C("Non promette più 24 ore", !ha(t, /24 ore|24h|in giornata|domani/), "Oggi le spedizioni ci mettono in media 4 giorni: non promettere 24 ore."),
      C("Dice tempi veri", ha(t, /[2-5]\s?(-|a|o)\s?[3-5] giorni|[3-5] giorni|pochi giorni|giorni lavorativi/), "Scrivi tempi che riusciamo a mantenere, per esempio «in 3-5 giorni lavorativi»."),
      C("Resta la frase del brand (tè e tisane biologici)", ha(t, /te|tisan/), "Non perdere il messaggio principale: tè e tisane biologici."),
    ];
  },
  brand_packaging: (m) => {
    const t = testo("t5", m);
    return [
      C("Niente affermazioni ambientali generiche", !ha(t, VERDI_GENERICHE), "Togli sostenibile, impatto zero, eco, green: dal 27/09/2026 non si possono usare senza prove riconosciute."),
      C("Parla della latta e del riciclo", ha(t, /latta|allumini/) && ha(t, /riciclabil|ricicla/), "Scrivi un fatto preciso: «latta in alluminio riciclabile»."),
      C("Parla della busta compostabile certificata", ha(t, /busta/) && ha(t, /compostabil/) && ha(t, /13432|certificat/), "Aggiungi: «busta interna compostabile certificata EN 13432»."),
      C("Non dice cose false sulla plastica", !ha(t, /senza plastica|plastic[- ]?free|zero plastica/), "Da ottobre c'è il pluriball: non scrivere «senza plastica»."),
    ];
  },

  // Casi
  brand_piano: (m) => {
    const p = m.piano;
    const KPI_BUONI = ["Notorietà spontanea", "Notorietà guidata", "Ricerche del nome del negozio", "NPS"];
    const buoni = (p.kpi ?? []).filter((k) => KPI_BUONI.includes(k));
    return [
      C("L'obiettivo ha numeri", /\d/.test(p.obiettivo ?? "") && ha(p.obiettivo ?? "", /%|per cento/), "Scrivi da quanto a quanto: per esempio «dal 4% al 7%»."),
      C("L'obiettivo ha una scadenza", ha(p.obiettivo ?? "", /2027|entro|dicembre|giugno/), "Aggiungi entro quando."),
      C("L'obiettivo riguarda la notorietà o la fiducia", ha(p.obiettivo ?? "", /notoriet|conosc|nps|consigli|ricord/), "Un piano di brand misura notorietà o fiducia, non le vendite di un mese."),
      C("Il pubblico è quello del posizionamento", ha(p.pubblico ?? "", /ogni giorno|quotidian|curios|25|chi beve|capire/), "Usa il pubblico principale: i curiosi del tè di ogni giorno."),
      C("Il messaggio è coerente con il brand", ha(p.messaggio ?? "", /spieg|semplic|capire|chiar/) && !ha(p.messaggio ?? "", SUPERLATIVI), "Il messaggio riprende la differenza: il tè biologico spiegato semplice."),
      C("Da 3 a 5 canali", (p.canali ?? []).length >= 3 && (p.canali ?? []).length <= 5, `Ne hai scelti ${(p.canali ?? []).length}: un piano sceglie.`),
      C("Almeno 2 KPI che misurano l'obiettivo, massimo 4 in tutto", buoni.length >= 2 && (p.kpi ?? []).length <= 4, "Scegli KPI di brand: notorietà, ricerche del nome, NPS."),
    ];
  },
  brand_comunicato: (m) => {
    const c = m.comunicato, tutto = [c.titolo, c.sottotitolo, c.testo].join(" ");
    const primo = (c.testo ?? "").trim().split(/\n\s*\n/)[0] ?? "";
    return [
      C("Il titolo parla del calendario dell'avvento", ha(c.titolo ?? "", /calendario dell.? ?avvento/), "Il titolo deve dire subito la notizia."),
      C("Il titolo è informativo e breve (massimo 100 caratteri)", (c.titolo ?? "").trim().length > 15 && (c.titolo ?? "").length <= 100, "Un titolo da giornale: una riga."),
      C("Il primo paragrafo dice chi, cosa e quando", ha(primo, /cinque foglie/) && ha(primo, /calendario/) && ha(primo, /2 novembre|novembre/), "Nel primo paragrafo: Cinque Foglie, il calendario, dal 2 novembre (separa i paragrafi con una riga vuota)."),
      C("Contiene i fatti concreti", ha(tutto, /24/) && ha(tutto, /produttor/), "Metti i numeri: 24 tè, 8 piccoli produttori."),
      C("Ha una citazione", /[«"“].{15,}[»"”]/.test(c.testo ?? ""), "Aggiungi la citazione di Marco F., tra virgolette."),
      C("Ha prezzo e dove si compra", /34,90|34\.90/.test(tutto) && ha(tutto, /online|sito|cinquefoglie\.example/), "Scrivi il prezzo e dove si compra."),
      C("Ha i contatti stampa", ha(c.contatti ?? "", /@|045|telefono/), "Nel campo Contatti: chi contattare, email e telefono."),
      C("Niente superlativi", !ha(tutto, SUPERLATIVI), "Togli «il migliore», «unico al mondo»: il giornalista li cancella."),
      C("Sta in una pagina (massimo 400 parole)", contaParole(c.testo ?? "") <= 400, `Ora sono ${contaParole(c.testo ?? "")} parole.`),
    ];
  },
  brand_destinatari: (m) => {
    const d = m.destinatari, pertinenti = ["g1", "g2", "g3", "g4", "g8"].filter((x) => d.includes(x));
    return [
      C("Almeno 4 giornalisti pertinenti", pertinenti.length >= 4, `Ne hai scelti ${pertinenti.length} tra quelli che si occupano di cucina, tè, regali o imprese locali.`),
      C("Nessun giornalista fuori tema", !d.includes("g5") && !d.includes("g7"), "Sport e cronaca nera non c'entrano con un calendario di tè."),
      C("Rispetti chi ha chiesto di non essere contattato", !d.includes("g6"), "Elisa Fontana ha chiesto di non ricevere più comunicati: toglila."),
    ];
  },
  brand_rispostaGiornalista: (m) => {
    const t = m.risposte.r1 ?? "";
    return [
      C("Hai risposto", t.trim().length > 0, "Ufficio stampa → Richieste → rispondi a Paolo Neri."),
      C("Dici i fatti: non tutti i kit, circa 40", ha(t, /40|quaranta/) && !ha(t, /tutti i kit (sono|erano|hanno)/), "Usa la nota interna: circa 40 kit, gli altri non hanno avuto problemi."),
      C("Rispondi sul ritiro", ha(t, /ritir/) || ha(t, /trasporto|spedizion/), "Paolo chiede del ritiro: spiega che il problema è nato nel trasporto, non nel prodotto."),
      C("Dici il rimedio", ha(t, /frusta nuova|nuova frusta|gratis|sostitu|rispedi/), "Scrivi cosa ricevono i clienti coinvolti."),
      C("Dici cosa cambia", ha(t, /astuccio|imballag|3 novembre/), "Scrivi cosa avete cambiato perché non succeda di nuovo."),
      C("Dai un contatto", ha(t, /elena|045|@|contatt|disponibil/), "Indica il portavoce: Elena M."),
      C("Niente «no comment» né colpe ad altri", !ha(t, /no comment|nessun commento|colpa del corrier|non e colpa nostra/), "Rispondi nel merito e senza scaricare colpe."),
      C("È una risposta completa (almeno 40 parole)", contaParole(t) >= 40, `Ora sono ${contaParole(t)} parole.`),
    ];
  },

  // Testi scritti nella guida
  brand_reportNotorieta: (_m, t) => [
    C("Rispondi alla domanda (crisi sì o no)", ha(t, /non (e|siamo) in crisi|nessuna crisi|non c e (una )?crisi|non e una crisi/), "Inizia dalla risposta: il brand non è in crisi."),
    C("Spieghi il falso allarme delle ricerche", ha(t, /ricerch/) && ha(t, /ogni anno|stagional|2025|anno scorso|22/), "Le ricerche calano ogni anno dopo l'estate e crescono rispetto al 2025."),
    C("Indichi il problema vero (NPS e spedizioni)", ha(t, /nps|31/) && ha(t, /spedizion|consegn|ritard/), "Il problema vero: NPS da 52 a 31 per le spedizioni."),
    C("Proponi cosa fare", ha(t, /propon|promessa|magazzino|corrett|sistem/), "Chiudi con cosa avete fatto o proponete."),
  ],
  brand_sintesiPiano: (_m, t) => [
    C("Dici l'obiettivo con i numeri", ha(t, /notoriet/) && /\d\s?%/.test(t), "Scrivi l'obiettivo: notorietà spontanea dal 4% al 7%."),
    C("Dici per chi e con quale messaggio", ha(t, /curios|ogni giorno|chi beve/) && ha(t, /spieg|semplic/), "Scrivi il pubblico e il messaggio."),
    C("Dici i canali", ha(t, /stampa|social|creator|newsletter|eventi|podcast/), "Nomina i canali principali."),
    C("Dici come misurerete", ha(t, /misur|sondaggio|kpi|nps|ricerche del nome/), "Scrivi come misurerete il risultato."),
  ],
};
export const leggiBrand = leggi;
