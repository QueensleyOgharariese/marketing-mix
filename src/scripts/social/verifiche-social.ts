// VERIFICHE DELLA SIMULAZIONE SOCIAL (passi "azione" e "testo")
// Come per la SEO: non si sceglie una risposta, si controlla com'è il profilo dopo il lavoro
// (le modifiche salvate in questo browser da stato.ts) oppure il testo scritto nella guida.
// Ogni verifica restituisce una lista di controlli con un suggerimento se qualcosa manca.
import type { Controllo } from "../verifiche";
import { normalizza, senzaSalute, contaParole } from "../controlli-seo";
import { leggi, trovaBozza, programmati, type Modifiche } from "./stato";

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
const ha = (t: string, re: RegExp) => re.test(normalizza(t));
// Ore come "19:30" -> minuti dalla mezzanotte, per confrontarle
const minuti = (ora = "") => { const [h, m] = ora.split(":").map(Number); return (h || 0) * 60 + (m || 0); };
const traOre = (ora: string | undefined, da: string, a: string) => !!ora && minuti(ora) >= minuti(da) && minuti(ora) <= minuti(a);
const hashtag = (t: string) => (t.match(/#[\p{L}\p{N}_]+/gu) ?? []).length;
// La prima frase: quella che si vede nel feed prima di "altro"
const primaFrase = (t: string) => t.trim().split(/(?<=[.!?])\s|\n/)[0] ?? "";
const urla = (t: string) => /!!|\?\?/.test(t) || (t.replace(/[^A-Za-zÀ-ú]/g, "").length > 10 && t.replace(/[^A-ZÀ-Ú]/g, "").length / t.replace(/[^A-Za-zÀ-ú]/g, "").length > 0.5);
const PRIVATO = /privat|\bdm\b|direct|messaggi|scriv(ici|eteci|i)|mail/;
const SCUSE = /scus|dispiac|perdon/;

type V = (m: Modifiche, testo: string) => Controllo[];

export const VERIFICHE_SOCIAL: Record<string, V> = {
  // Tutorial
  so_tutorial: () => {
    const d = trovaBozza("g2")?.didascalia ?? "";
    return [C("La didascalia del 31/10 contiene «Buon fine settimana!»", ha(d, /buon fine settimana/), "Calendario → clicca il post del 31/10, aggiungi la frase nella didascalia e premi Salva.")];
  },

  // Basi · Il post del kit matcha
  so_didascaliaKit: () => {
    const b = trovaBozza("k1"); const d = b?.didascalia ?? "";
    const n = hashtag(d);
    return [
      C("Hai scritto la didascalia", d.trim().length > 20 && d.trim() !== "", "Calendario → bozza «Kit matcha: tutto per iniziare» → scrivi nel campo Didascalia e salva."),
      C("La prima frase è corta (massimo 125 caratteri)", primaFrase(d).length > 0 && primaFrase(d).length <= 125, `Ora è di ${primaFrase(d).length} caratteri: nel feed si vede solo l'inizio. Chiudi la prima frase con un punto prima.`),
      C("Parla del matcha", ha(d, /matcha/), "Chi scorre deve capire subito di cosa si parla: scrivi «matcha»."),
      C("Invita a fare qualcosa", ha(d, /link in bio|\bbio\b|sul sito|salva|commenta|scopri|lo trovi|trovi/), "Aggiungi un invito: per esempio «Lo trovi nel link in bio»."),
      C("Ha da 3 a 8 hashtag", n >= 3 && n <= 8, `Ora ne ha ${n}: bastano pochi hashtag pertinenti.`),
      C("Nessuna promessa sulla salute", senzaSalute(d), "Il matcha è un alimento: togli parole come detox, brucia grassi, benefici."),
      C("Non urla (niente maiuscole o «!!!»)", !urla(d), "Scrivi in modo normale: le maiuscole e i punti esclamativi ripetuti sembrano spam."),
    ];
  },
  so_altKit: () => {
    const a = (trovaBozza("k1")?.alt ?? "").trim();
    return [
      C("Hai scritto il testo alternativo", a.length > 0, "Nella stessa bozza scrivi nel campo Testo alternativo e salva."),
      C("È lungo il giusto (da 40 a 250 caratteri)", a.length >= 40 && a.length <= 250, `Ora ha ${a.length} caratteri: una o due frasi bastano.`),
      C("Descrive cosa si vede", ha(a, /matcha|frusta|ciotola|mani|tazza/), "Racconta l'immagine: chi fa cosa, con quali oggetti."),
      C("Non è uno slogan e non ha hashtag", !a.includes("#") && !ha(a, /^(immagine|foto|video) di/), "Togli hashtag e «immagine di»: descrivi e basta."),
    ];
  },
  so_programmaKit: (m) => {
    const b = programmati(m).find((p) => p.id === "k1"); // con l'ora effettiva (anche quella predefinita)
    const stessoGiorno = programmati(m).filter((p) => p.id !== "k1" && p.data === b?.data);
    return [
      C("Il post è programmato nella prima settimana di novembre", !!b?.data && b.data >= "2026-11-02" && b.data <= "2026-11-08", "Trascina la bozza su un giorno tra il 2 e l'8 novembre (o scegli la data nell'editor)."),
      C("Esce tra le 18 e le 21", traOre(b?.ora, "18:00", "21:00"), "Apri il post e scegli un'ora in cui i follower sono online."),
      C("Quel giorno non ci sono altri post", !!b?.data && stessoGiorno.length === 0, "Scegli un giorno libero: due post nello stesso giorno si rubano copertura."),
    ];
  },

  // Diagnosi · I post delle 3 di notte
  so_oraPredefinita: (m) => [
    C("Hai cambiato l'ora predefinita", !!m.oraPredefinita && m.oraPredefinita !== "03:00", "Calendario → Impostazioni di programmazione: scegli un'altra ora e salva."),
    C("È un'ora in cui i follower sono online (18-21)", traOre(m.oraPredefinita ?? "", "18:00", "21:00"), "Guarda il grafico Follower attivi per ora nelle Statistiche."),
  ],
  so_programmatiOra: (m) => ["g1", "g2", "g3"].map((id) => {
    const p = trovaBozza(id, m);
    return C(`«${p?.titolo}» esce la sera`, traOre(m.post[id]?.ora ?? p?.ora, "18:00", "21:30"), `Apri il post del ${p?.data?.slice(8)}/${p?.data?.slice(5, 7)} e cambia l'ora.`);
  }),

  // Diagnosi · Commenti
  so_rispostaCritica: (m) => {
    const r = m.risposte.c01 ?? "";
    return [
      C("Hai risposto alla cliente", r.trim().length > 0, "Commenti → il commento sull'ordine in ritardo → Rispondi."),
      C("Ti scusi o dici che ti dispiace", ha(r, SCUSE), "Inizia riconoscendo il problema: «Ci dispiace davvero…»."),
      C("Porti la conversazione in privato", ha(r, PRIVATO), "I dettagli dell'ordine si gestiscono in privato: invitala a scriverti o dille che le scrivi tu."),
      C("Non dai la colpa ad altri", !ha(r, /colpa (del|dei) corrier|non e colpa nostra|non dipende da noi/), "Davanti a tutti non si scarica la colpa: si dice cosa si fa adesso."),
      C("È una risposta vera (almeno 12 parole)", contaParole(r) >= 12, "Due frasi complete: scuse e cosa succede adesso."),
      C("Il commento resta visibile", !m.nascosti.includes("c01") && !m.spam.includes("c01"), "Una critica sincera non si nasconde: si risponde."),
    ];
  },
  so_datiPersonali: (m) => {
    const r = m.risposte.c02 ?? "";
    return [
      C("Hai nascosto il commento con i dati", m.nascosti.includes("c02"), "Sul commento con l'indirizzo usa Nascondi."),
      C("Hai risposto invitando a scrivere in privato", r.trim().length > 0 && ha(r, PRIVATO), "Rispondi chiedendo di continuare in privato."),
      C("La risposta non ripete i suoi dati", !/48213/.test(r) && !ha(r, /via roma/), "Non scrivere numero d'ordine o indirizzo nella risposta: è pubblica."),
    ];
  },
  so_moderazione: (m) => {
    const tolto = (id: string) => m.nascosti.includes(id) || m.spam.includes(id);
    return [
      C("Lo spam è stato segnalato o nascosto", tolto("c06"), "Il commento «Guadagna 500€ al giorno» è spam: segnalalo."),
      C("L'insulto è stato nascosto", tolto("c07"), "Un insulto senza contenuto si nasconde."),
      C("La critica sul rooibos è ancora visibile", !tolto("c08"), "È una critica sincera su un prodotto: va lasciata e merita una risposta."),
      C("La critica sull'ordine è ancora visibile", !tolto("c01"), "Le critiche non si nascondono."),
      C("Il complimento è ancora visibile", !tolto("c09"), "Non c'è niente da moderare in un complimento."),
    ];
  },
  so_dosi: (m) => {
    const r = ["c03", "c04", "c05"].map((id) => m.risposte[id] ?? "").find((t) => t.trim()) ?? "";
    return [
      C("Hai risposto a una domanda sulle dosi", r.trim().length > 0, "Rispondi a uno dei commenti che chiedono quanto matcha usare."),
      C("Dici quanto matcha (grammi o cucchiaini)", /\d/.test(r) && ha(r, /\bg\b|gramm|cucchiain/), "Scrivi un numero: per esempio 2 grammi, un cucchiaino scarso."),
      C("Dici quanta acqua", ha(r, /\bml\b|millilitr|acqua/), "Aggiungi quanta acqua: per esempio 70 ml."),
    ];
  },

  // Diagnosi · Foto, diritti e collaborazioni
  so_permesso: (m) => {
    const t = m.permessi.u2 ?? "";
    return [
      C("Hai scritto il messaggio", t.trim().length > 0, "Libreria → la foto di Giulia → Chiedi il permesso."),
      C("Chiedi il permesso", ha(t, /permess|possiamo|potremmo|ti va|posso|autorizz/), "Chiedi in modo chiaro se potete usare la foto."),
      C("Ti scusi per averla già usata", ha(t, SCUSE), "La foto è già stata pubblicata: una scusa sincera è dovuta."),
      C("Proponi di citarla", ha(t, /cit|tag|credit|menzion|nome/), "Proponi di citare il suo profilo nel post."),
      C("È un messaggio completo (almeno 20 parole)", contaParole(t) >= 20, "Saluto, scuse, richiesta, citazione: qualche frase in più."),
    ];
  },
  so_archiviaUgc: (m) => [C("Il post del 12/10 è archiviato", !!m.post.p19?.archiviato, "Profilo → apri il post «Il matcha latte di Giulia» → Archivia.")],
  so_collab: (m) => {
    const p = m.post.p17 ?? {}; const d = p.didascalia ?? "";
    return [
      C("L'etichetta di collaborazione è attiva", !!p.collab, "Profilo → apri il reel dell'8/10 → Modifica → attiva l'etichetta di collaborazione."),
      C("#adv o «collaborazione» è all'inizio della didascalia", ha(d.slice(0, 40), /#adv|collaborazione|in collaborazione/), "Metti #adv (o «Collaborazione con @tazzaemiele») all'inizio, non in fondo."),
      C("Il reel è ancora sul profilo", !p.archiviato, "Non serve toglierlo: basta dichiararlo."),
    ];
  },

  // Casi · Il calendario di novembre
  so_calendarioNovembre: (m) => {
    const nov = programmati(m).filter((p) => p.data?.startsWith("2026-11"));
    const bozze = nov.filter((p) => /^b\d/.test(p.id));
    const giorni = nov.map((p) => p.data);
    const doppi = giorni.filter((g, i) => giorni.indexOf(g) !== i);
    const settimane = [["02", "08"], ["09", "15"], ["16", "22"], ["23", "29"]].map(([a, b]) => nov.filter((p) => p.data! >= `2026-11-${a}` && p.data! <= `2026-11-${b}`).length);
    const b01 = trovaBozza("b01", m), b02 = trovaBozza("b02", m), b07 = trovaBozza("b07", m);
    const fuoriOra = nov.filter((p) => !traOre(p.ora, "17:00", "21:30"));
    const pilastri = new Set(nov.map((p) => p.pilastro));
    return [
      C("Almeno 8 bozze programmate a novembre", bozze.length >= 8, `Ora sono ${bozze.length}: trascina le bozze sui giorni del calendario.`),
      C("Almeno 2 post in ogni settimana", settimane.every((n) => n >= 2), `Post per settimana: ${settimane.join(", ")}. Distribuiscili meglio.`),
      C("Mai due post nello stesso giorno", doppi.length === 0, doppi.length ? `Il ${doppi[0]!.slice(8)}/11 ha più di un post: spostane uno.` : ""),
      C("Il lancio del calendario dell'avvento è tra il 2 e il 4 novembre", !!b01?.data && b01.data >= "2026-11-02" && b01.data <= "2026-11-04", "Il calendario è in vendita dal 2 novembre: il reel di lancio va subito."),
      C("Il carosello «24 giorni, 24 tè» esce dopo il lancio", !!b02?.data && !!b01?.data && b02.data > b01.data, "Prima il reel che lo fa scoprire, poi il carosello con i dettagli."),
      C("Il Black Friday è il 27 novembre", b07?.data === "2026-11-27", "Lo sconto vale solo venerdì 27: il post va quel giorno."),
      C("Tutti i post escono tra le 17 e le 21:30", nov.length > 0 && fuoriOra.length === 0, fuoriOra.length ? `«${fuoriOra[0].titolo}» esce alle ${fuoriOra[0].ora}: aprilo e cambia l'ora.` : ""),
      C("Almeno 4 pilastri diversi", pilastri.size >= 4, `Ora sono ${pilastri.size}: alterna prodotto, consigli, ricette, dietro le quinte e community.`),
    ];
  },
  so_utm: (m) => {
    const l = (trovaBozza("b07", m)?.link ?? "").trim().toLowerCase();
    return [
      C("C'è un link al sito", /^(https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}/.test(l), "Nella bozza del Black Friday scrivi il link nel campo Link."),
      C("utm_source=instagram", /[?&]utm_source=instagram(&|$)/.test(l), "Aggiungi ?utm_source=instagram dopo l'indirizzo."),
      C("utm_medium=social", /[?&]utm_medium=social(&|$)/.test(l), "Aggiungi &utm_medium=social."),
      C("utm_campaign con il nome della campagna", /[?&]utm_campaign=[^&]*black/.test(l), "Aggiungi &utm_campaign=black-friday."),
      C("Niente spazi né maiuscole", !/\s/.test(l) && (trovaBozza("b07", m)?.link ?? "") === (trovaBozza("b07", m)?.link ?? "").toLowerCase(), "Scrivi tutto in minuscolo e senza spazi, sempre uguale."),
    ];
  },

  // Casi · Una piccola crisi
  so_sospendi: (m) => [C("La promo lampo di oggi è sospesa", !!m.post.z1?.sospeso, "Calendario → il post di oggi «Promo lampo: kit matcha -30%» → Sospendi.")],
  so_risposteCrisi: (m) => {
    const ids = ["x01", "x02", "x03", "x04", "x05"];
    const risposte = ids.map((id) => (m.risposte[id] ?? "").trim()).filter(Boolean);
    const diverse = new Set(risposte.map(normalizza)).size;
    return [
      C("Hai risposto ad almeno 3 commenti sulla frusta rotta", risposte.length >= 3, `Ora sono ${risposte.length}.`),
      C("Le risposte non sono tutte uguali", risposte.length > 0 && diverse >= Math.min(risposte.length, 3), "Personalizza: usa il nome della persona o rispondi a quello che ha scritto."),
      C("Ogni risposta si scusa o offre un rimedio", risposte.length > 0 && risposte.every((r) => ha(r, SCUSE) || ha(r, /nuov|rispedi|sostitu|gratis|rimbors/)), "In ogni risposta: scuse e cosa fate per rimediare."),
      C("Nessun commento è nascosto", ids.every((id) => !m.nascosti.includes(id) && !m.spam.includes(id)), "Le critiche della crisi restano visibili: anche «Mai più da voi»."),
    ];
  },

  // Testi scritti nella guida
  so_reportStatistiche: (_m, t) => [
    C("Dici cosa funziona meglio (caroselli e salvataggi)", ha(t, /carosell/) && ha(t, /salvat|salvataggi|engagement|\ber\b/), "Scrivi che i caroselli funzionano meglio e con quale numero."),
    C("Dici a cosa servono i reel", ha(t, /reel|video/) && ha(t, /copertura|persone nuove|non follower|raggiung|scopr/), "I reel portano persone nuove: dillo."),
    C("Dici cosa va peggio", ha(t, /foto/) && ha(t, /prodott/), "Scrivi che le foto dei prodotti vanno peggio."),
    C("Proponi qualcosa", ha(t, /propon|consigli|suggeris|meglio|dovremmo|potremmo|invece/), "Chiudi con una proposta concreta."),
  ],
  so_didascaliaLancio: (_m, t) => [
    C("Dice cos'è (il calendario dell'avvento)", ha(t, /avvento/), "Scrivi di che prodotto si tratta."),
    C("Dice da quando si trova", ha(t, /2 novembre|da oggi|disponibile|e arrivato|in vendita/), "Scrivi da quando si può comprare."),
    C("Invita ad andare al link", ha(t, /link|\bbio\b|sito/), "Aggiungi «lo trovi nel link in bio»."),
    C("La prima frase è corta (massimo 125 caratteri)", primaFrase(t).length > 0 && primaFrase(t).length <= 125, "Chiudi prima la prima frase."),
    C("Niente urgenza finta", !ha(t, /ultimi pezzi|affrettat|corri|solo per poco|esauriment/), "Il primo giorno non ci sono «ultimi pezzi»: togli l'urgenza finta."),
    C("Al massimo 8 hashtag", hashtag(t) <= 8, "Pochi hashtag pertinenti bastano."),
  ],
  so_pianoNovembre: (_m, t) => [
    C("Dici quanti post e quando", ha(t, /\b3\b|tre|settiman/) && ha(t, /sera|\b19|\b20|\b21|orari/), "Scrivi la frequenza e l'orario."),
    C("Spieghi il lancio", ha(t, /avvento|lancio/), "Racconta come lanciate il calendario dell'avvento."),
    C("Parli del Black Friday", ha(t, /black friday|27/), "Scrivi quando esce il Black Friday."),
    C("Dici come misurerai i risultati", ha(t, /utm|clic|copertura|misur|vendite|salvataggi/), "Ogni obiettivo ha il suo numero: scrivi quale guarderete."),
  ],
  so_postCrisi: (_m, t) => [
    C("Dici cosa è successo", ha(t, /frust|rott|spezz|danneggi/), "Scrivi il fatto: le fruste sono arrivate rotte."),
    C("Ti scusi", ha(t, SCUSE), "Una scusa sincera, senza giri di parole."),
    C("Dici come rimediate", ha(t, /nuov|rispedi|sostitu|gratis|rimbors/), "Cosa fate per chi è coinvolto? Per esempio una frusta nuova, gratis."),
    C("Dici come contattarvi", ha(t, PRIVATO), "Scrivi dove scrivere: in privato, con il numero d'ordine."),
    C("Non dai la colpa ad altri e non minimizzi", !ha(t, /colpa (del|dei) corrier|pochissimi casi|non e colpa nostra|non dipende da noi/), "Niente colpe ad altri: prendetevi la responsabilità."),
  ],
  so_reportCrisi: (_m, t) => [
    C("Racconti i fatti", ha(t, /frust|rott/) && /\d/.test(t), "Cosa è successo e a quanti ordini (circa 40)."),
    C("Dici cosa avete fatto oggi", ha(t, /sospes|promo|rispost|risposto|storia|post|scritto/), "Elenca le azioni: promo sospesa, messaggio, risposte."),
    C("Dici il rimedio per i clienti", ha(t, /nuov|rispedi|sostitu|gratis|rimbors/), "Scrivi cosa ricevono i clienti coinvolti."),
    C("Proponi cosa cambiare", ha(t, /imballag|propon|non succeda|controll|miglior|cambia/), "Chiudi con cosa cambiare perché non succeda di nuovo."),
  ],
};

export const leggiSocial = leggi;
