// VERIFICHE DELLA SIMULAZIONE SOCIAL (passi "azione" e "testo")
// Come per la SEO: non si sceglie una risposta, si controlla com'è il profilo dopo il lavoro
// (le modifiche salvate in questo browser da stato.ts) oppure il testo scritto nella guida.
// Ogni verifica restituisce una lista di controlli con un suggerimento se qualcosa manca.
// Bilingue: i nomi dei controlli e i suggerimenti passano da t(italiano, inglese), e le espressioni
// che cercano parole nel testo accettano sia l'italiano sia l'inglese (chi gioca in inglese scrive in inglese).
import type { Controllo } from "../verifiche";
import { normalizza, senzaSalute, contaParole } from "../controlli-seo";
import { leggi, trovaBozza, programmati, type Modifiche } from "./stato";
import { t } from "../lingua";

const C = (nome: string, ok: boolean, suggerimento: string): Controllo => ({ nome, ok, suggerimento });
const ha = (testo: string, re: RegExp) => re.test(normalizza(testo));
// Ore come "19:30" -> minuti dalla mezzanotte, per confrontarle
const minuti = (ora = "") => { const [h, m] = ora.split(":").map(Number); return (h || 0) * 60 + (m || 0); };
const traOre = (ora: string | undefined, da: string, a: string) => !!ora && minuti(ora) >= minuti(da) && minuti(ora) <= minuti(a);
const hashtag = (testo: string) => (testo.match(/#[\p{L}\p{N}_]+/gu) ?? []).length;
// La prima frase: quella che si vede nel feed prima di "altro"
const primaFrase = (testo: string) => testo.trim().split(/(?<=[.!?])\s|\n/)[0] ?? "";
const urla = (testo: string) => /!!|\?\?/.test(testo) || (testo.replace(/[^A-Za-zÀ-ú]/g, "").length > 10 && testo.replace(/[^A-ZÀ-Ú]/g, "").length / testo.replace(/[^A-Za-zÀ-ú]/g, "").length > 0.5);
// normalizza() toglie gli accenti e cambia l'apostrofo in spazio ("we're" -> "we re")
const PRIVATO = /privat|\bdm\b|direct|messaggi|scriv(ici|eteci|i)|mail|message|inbox|write to (us|you)|contact/;
const SCUSE = /scus|dispiac|perdon|sorry|apolog/;
const RIMEDIO = /nuov|rispedi|sostitu|gratis|rimbors|\bnew\b|resend|re-send|replace|free|refund/;
const COLPA_ALTRI = /colpa (del|dei) corrier|non e colpa nostra|non dipende da noi|courier s fault|fault of the courier|not our fault|isn t our fault|nothing to do with us|blame the courier/;
const dataIt = (iso?: string) => `${iso?.slice(8)}/${iso?.slice(5, 7)}`;

type V = (m: Modifiche, testo: string) => Controllo[];

export const VERIFICHE_SOCIAL: Record<string, V> = {
  // Tutorial
  so_tutorial: () => {
    const d = trovaBozza("g2")?.didascalia ?? "";
    return [C(t("La didascalia del 31/10 contiene «Buon fine settimana!»", "The caption of 31/10 contains «Have a good weekend!»"), ha(d, /buon fine settimana|(good|nice|great|happy) weekend/), t("Calendario → clicca il post del 31/10, aggiungi la frase nella didascalia e premi Salva.", "Calendar → click the post of 31/10, add the sentence to the caption and press Save."))];
  },

  // Basi · Il post del kit matcha
  so_didascaliaKit: () => {
    const b = trovaBozza("k1"); const d = b?.didascalia ?? "";
    const n = hashtag(d);
    return [
      C(t("Hai scritto la didascalia", "You wrote the caption"), d.trim().length > 20 && d.trim() !== "", t("Calendario → bozza «Kit matcha: tutto per iniziare» → scrivi nel campo Didascalia e salva.", "Calendar → draft «Matcha kit: everything to get started» → write in the Caption field and save.")),
      C(t("La prima frase è corta (massimo 125 caratteri)", "The first sentence is short (125 characters at most)"), primaFrase(d).length > 0 && primaFrase(d).length <= 125, t(`Ora è di ${primaFrase(d).length} caratteri: nel feed si vede solo l'inizio. Chiudi la prima frase con un punto prima.`, `It's ${primaFrase(d).length} characters now: only the start shows in the feed. End the first sentence with a full stop sooner.`)),
      C(t("Parla del matcha", "It's about matcha"), ha(d, /matcha/), t("Chi scorre deve capire subito di cosa si parla: scrivi «matcha».", "People scrolling must understand straight away what it's about: write «matcha».")),
      C(t("Invita a fare qualcosa", "It invites people to do something"), ha(d, /link in bio|\bbio\b|sul sito|salva|commenta|scopri|lo trovi|trovi|website|\bsave\b|comment|discover|find it|shop|order|try it/), t("Aggiungi un invito: per esempio «Lo trovi nel link in bio».", "Add a call to action: for example «Find it at the link in bio».")),
      C(t("Ha da 3 a 8 hashtag", "It has 3 to 8 hashtags"), n >= 3 && n <= 8, t(`Ora ne ha ${n}: bastano pochi hashtag pertinenti.`, `It has ${n} now: a few relevant hashtags are enough.`)),
      C(t("Nessuna promessa sulla salute", "No health claims"), senzaSalute(d), t("Il matcha è un alimento: togli parole come detox, brucia grassi, benefici.", "Matcha is a food: remove words like detox, fat burning, benefits.")),
      C(t("Non urla (niente maiuscole o «!!!»)", "It doesn't shout (no capitals or «!!!»)"), !urla(d), t("Scrivi in modo normale: le maiuscole e i punti esclamativi ripetuti sembrano spam.", "Write normally: capitals and repeated exclamation marks look like spam.")),
    ];
  },
  so_altKit: () => {
    const a = (trovaBozza("k1")?.alt ?? "").trim();
    return [
      C(t("Hai scritto il testo alternativo", "You wrote the alt text"), a.length > 0, t("Nella stessa bozza scrivi nel campo Testo alternativo e salva.", "In the same draft write in the Alt text field and save.")),
      C(t("È lungo il giusto (da 40 a 250 caratteri)", "It's the right length (40 to 250 characters)"), a.length >= 40 && a.length <= 250, t(`Ora ha ${a.length} caratteri: una o due frasi bastano.`, `It has ${a.length} characters now: one or two sentences are enough.`)),
      C(t("Descrive cosa si vede", "It describes what can be seen"), ha(a, /matcha|frusta|ciotola|mani|tazza|whisk|bowl|hands|\bcup\b/), t("Racconta l'immagine: chi fa cosa, con quali oggetti.", "Describe the image: who is doing what, with which objects.")),
      C(t("Non è uno slogan e non ha hashtag", "It isn't a slogan and has no hashtags"), !a.includes("#") && !ha(a, /^(immagine|foto|video) di|^(image|photo|picture|video) of/), t("Togli hashtag e «immagine di»: descrivi e basta.", "Remove hashtags and «image of»: just describe.")),
    ];
  },
  so_programmaKit: (m) => {
    const b = programmati(m).find((p) => p.id === "k1"); // con l'ora effettiva (anche quella predefinita)
    const stessoGiorno = programmati(m).filter((p) => p.id !== "k1" && p.data === b?.data);
    return [
      C(t("Il post è programmato nella prima settimana di novembre", "The post is scheduled in the first week of November"), !!b?.data && b.data >= "2026-11-02" && b.data <= "2026-11-08", t("Trascina la bozza su un giorno tra il 2 e l'8 novembre (o scegli la data nell'editor).", "Drag the draft onto a day between 2 and 8 November (or choose the date in the editor).")),
      C(t("Esce tra le 18 e le 21", "It goes out between 18:00 and 21:00"), traOre(b?.ora, "18:00", "21:00"), t("Apri il post e scegli un'ora in cui i follower sono online.", "Open the post and choose a time when followers are online.")),
      C(t("Quel giorno non ci sono altri post", "There are no other posts that day"), !!b?.data && stessoGiorno.length === 0, t("Scegli un giorno libero: due post nello stesso giorno si rubano copertura.", "Choose a free day: two posts on the same day steal reach from each other.")),
    ];
  },

  // Diagnosi · I post delle 3 di notte
  so_oraPredefinita: (m) => [
    C(t("Hai cambiato l'ora predefinita", "You changed the default time"), !!m.oraPredefinita && m.oraPredefinita !== "03:00", t("Calendario → Impostazioni di programmazione: scegli un'altra ora e salva.", "Calendar → Scheduling settings: choose another time and save.")),
    C(t("È un'ora in cui i follower sono online (18-21)", "It's a time when followers are online (18:00-21:00)"), traOre(m.oraPredefinita ?? "", "18:00", "21:00"), t("Guarda il grafico Follower attivi per ora nelle Statistiche.", "Look at the Active followers by hour chart in the Insights.")),
  ],
  so_programmatiOra: (m) => ["g1", "g2", "g3"].map((id) => {
    const p = trovaBozza(id, m);
    return C(t(`«${p?.titolo}» esce la sera`, `«${p?.titolo}» goes out in the evening`), traOre(m.post[id]?.ora ?? p?.ora, "18:00", "21:30"), t(`Apri il post del ${dataIt(p?.data)} e cambia l'ora.`, `Open the post of ${dataIt(p?.data)} and change the time.`));
  }),

  // Diagnosi · Commenti
  so_rispostaCritica: (m) => {
    const r = m.risposte.c01 ?? "";
    return [
      C(t("Hai risposto alla cliente", "You replied to the customer"), r.trim().length > 0, t("Commenti → il commento sull'ordine in ritardo → Rispondi.", "Comments → the comment about the late order → Reply.")),
      C(t("Ti scusi o dici che ti dispiace", "You apologise or say you're sorry"), ha(r, SCUSE), t("Inizia riconoscendo il problema: «Ci dispiace davvero…».", "Start by acknowledging the problem: «We're really sorry…».")),
      C(t("Porti la conversazione in privato", "You move the conversation to private messages"), ha(r, PRIVATO), t("I dettagli dell'ordine si gestiscono in privato: invitala a scriverti o dille che le scrivi tu.", "Order details are handled privately: invite her to message you or tell her you'll message her.")),
      C(t("Non dai la colpa ad altri", "You don't blame others"), !ha(r, COLPA_ALTRI), t("Davanti a tutti non si scarica la colpa: si dice cosa si fa adesso.", "In front of everyone you don't shift the blame: you say what you're doing now.")),
      C(t("È una risposta vera (almeno 12 parole)", "It's a real reply (at least 12 words)"), contaParole(r) >= 12, t("Due frasi complete: scuse e cosa succede adesso.", "Two complete sentences: an apology and what happens now.")),
      C(t("Il commento resta visibile", "The comment stays visible"), !m.nascosti.includes("c01") && !m.spam.includes("c01"), t("Una critica sincera non si nasconde: si risponde.", "Honest criticism isn't hidden: you reply.")),
    ];
  },
  so_datiPersonali: (m) => {
    const r = m.risposte.c02 ?? "";
    return [
      C(t("Hai nascosto il commento con i dati", "You hid the comment with the data"), m.nascosti.includes("c02"), t("Sul commento con l'indirizzo usa Nascondi.", "On the comment with the address use Hide.")),
      C(t("Hai risposto invitando a scrivere in privato", "You replied inviting them to write privately"), r.trim().length > 0 && ha(r, PRIVATO), t("Rispondi chiedendo di continuare in privato.", "Reply asking to continue privately.")),
      C(t("La risposta non ripete i suoi dati", "The reply doesn't repeat their data"), !/48213/.test(r) && !ha(r, /via roma/), t("Non scrivere numero d'ordine o indirizzo nella risposta: è pubblica.", "Don't write the order number or address in the reply: it's public.")),
    ];
  },
  so_moderazione: (m) => {
    const tolto = (id: string) => m.nascosti.includes(id) || m.spam.includes(id);
    return [
      C(t("Lo spam è stato segnalato o nascosto", "The spam was reported or hidden"), tolto("c06"), t("Il commento «Guadagna 500€ al giorno» è spam: segnalalo.", "The comment «Earn €500 a day» is spam: report it.")),
      C(t("L'insulto è stato nascosto", "The insult was hidden"), tolto("c07"), t("Un insulto senza contenuto si nasconde.", "An insult without content gets hidden.")),
      C(t("La critica sul rooibos è ancora visibile", "The criticism about the rooibos is still visible"), !tolto("c08"), t("È una critica sincera su un prodotto: va lasciata e merita una risposta.", "It's honest criticism of a product: it must stay and deserves a reply.")),
      C(t("La critica sull'ordine è ancora visibile", "The criticism about the order is still visible"), !tolto("c01"), t("Le critiche non si nascondono.", "Criticism isn't hidden.")),
      C(t("Il complimento è ancora visibile", "The compliment is still visible"), !tolto("c09"), t("Non c'è niente da moderare in un complimento.", "There's nothing to moderate in a compliment.")),
    ];
  },
  so_dosi: (m) => {
    const r = ["c03", "c04", "c05"].map((id) => m.risposte[id] ?? "").find((x) => x.trim()) ?? "";
    return [
      C(t("Hai risposto a una domanda sulle dosi", "You answered a question about quantities"), r.trim().length > 0, t("Rispondi a uno dei commenti che chiedono quanto matcha usare.", "Reply to one of the comments asking how much matcha to use.")),
      C(t("Dici quanto matcha (grammi o cucchiaini)", "You say how much matcha (grams or teaspoons)"), /\d/.test(r) && ha(r, /\bg\b|gramm|cucchiain|\bgrams?\b|teaspoon|\btsp\b/), t("Scrivi un numero: per esempio 2 grammi, un cucchiaino scarso.", "Write a number: for example 2 grams, a scant teaspoon.")),
      C(t("Dici quanta acqua", "You say how much water"), ha(r, /\bml\b|millilitr|acqua|water/), t("Aggiungi quanta acqua: per esempio 70 ml.", "Add how much water: for example 70 ml.")),
    ];
  },

  // Diagnosi · Foto, diritti e collaborazioni
  so_permesso: (m) => {
    const testo = m.permessi.u2 ?? "";
    return [
      C(t("Hai scritto il messaggio", "You wrote the message"), testo.trim().length > 0, t("Libreria → la foto di Giulia → Chiedi il permesso.", "Library → Giulia's photo → Ask for permission.")),
      C(t("Chiedi il permesso", "You ask for permission"), ha(testo, /permess|possiamo|potremmo|ti va|posso|autorizz|permission|can we|could we|may we|would you mind|ok with you|okay with you/), t("Chiedi in modo chiaro se potete usare la foto.", "Ask clearly whether you can use the photo.")),
      C(t("Ti scusi per averla già usata", "You apologise for already using it"), ha(testo, SCUSE), t("La foto è già stata pubblicata: una scusa sincera è dovuta.", "The photo has already been published: a sincere apology is due.")),
      C(t("Proponi di citarla", "You offer to credit her"), ha(testo, /cit|tag|credit|menzion|nome|mention|\bname\b/), t("Proponi di citare il suo profilo nel post.", "Offer to credit her profile in the post.")),
      C(t("È un messaggio completo (almeno 20 parole)", "It's a complete message (at least 20 words)"), contaParole(testo) >= 20, t("Saluto, scuse, richiesta, citazione: qualche frase in più.", "Greeting, apology, request, credit: a few more sentences.")),
    ];
  },
  so_archiviaUgc: (m) => [C(t("Il post del 12/10 è archiviato", "The post of 12/10 is archived"), !!m.post.p19?.archiviato, t("Profilo → apri il post «Il matcha latte di Giulia» → Archivia.", "Profile → open the post «Giulia's matcha latte» → Archive."))],
  so_collab: (m) => {
    const p = m.post.p17 ?? {}; const d = p.didascalia ?? "";
    return [
      C(t("L'etichetta di collaborazione è attiva", "The partnership label is on"), !!p.collab, t("Profilo → apri il reel dell'8/10 → Modifica → attiva l'etichetta di collaborazione.", "Profile → open the reel of 8/10 → Edit → turn on the partnership label.")),
      C(t("#adv o «collaborazione» è all'inizio della didascalia", "#ad or «partnership» is at the start of the caption"), ha(d.slice(0, 40), /#adv|#ad\b|collaborazione|in collaborazione|partnership|advertising|sponsored|paid/), t("Metti #adv (o «Collaborazione con @tazzaemiele») all'inizio, non in fondo.", "Put #ad (or «Partnership with @tazzaemiele») at the start, not at the end.")),
      C(t("Il reel è ancora sul profilo", "The reel is still on the profile"), !p.archiviato, t("Non serve toglierlo: basta dichiararlo.", "There's no need to remove it: just disclose it.")),
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
      C(t("Almeno 8 bozze programmate a novembre", "At least 8 drafts scheduled in November"), bozze.length >= 8, t(`Ora sono ${bozze.length}: trascina le bozze sui giorni del calendario.`, `There are ${bozze.length} now: drag the drafts onto the calendar days.`)),
      C(t("Almeno 2 post in ogni settimana", "At least 2 posts every week"), settimane.every((n) => n >= 2), t(`Post per settimana: ${settimane.join(", ")}. Distribuiscili meglio.`, `Posts per week: ${settimane.join(", ")}. Spread them out better.`)),
      C(t("Mai due post nello stesso giorno", "Never two posts on the same day"), doppi.length === 0, doppi.length ? t(`Il ${doppi[0]!.slice(8)}/11 ha più di un post: spostane uno.`, `${doppi[0]!.slice(8)}/11 has more than one post: move one.`) : ""),
      C(t("Il lancio del calendario dell'avvento è tra il 2 e il 4 novembre", "The advent calendar launch is between 2 and 4 November"), !!b01?.data && b01.data >= "2026-11-02" && b01.data <= "2026-11-04", t("Il calendario è in vendita dal 2 novembre: il reel di lancio va subito.", "The calendar is on sale from 2 November: the launch reel goes out straight away.")),
      C(t("Il carosello «24 giorni, 24 tè» esce dopo il lancio", "The carousel «24 days, 24 teas» goes out after the launch"), !!b02?.data && !!b01?.data && b02.data > b01.data, t("Prima il reel che lo fa scoprire, poi il carosello con i dettagli.", "First the reel that gets it discovered, then the carousel with the details.")),
      C(t("Il Black Friday è il 27 novembre", "Black Friday is on 27 November"), b07?.data === "2026-11-27", t("Lo sconto vale solo venerdì 27: il post va quel giorno.", "The discount is valid only on Friday the 27th: the post goes out that day.")),
      C(t("Tutti i post escono tra le 17 e le 21:30", "All posts go out between 17:00 and 21:30"), nov.length > 0 && fuoriOra.length === 0, fuoriOra.length ? t(`«${fuoriOra[0].titolo}» esce alle ${fuoriOra[0].ora}: aprilo e cambia l'ora.`, `«${fuoriOra[0].titolo}» goes out at ${fuoriOra[0].ora}: open it and change the time.`) : ""),
      C(t("Almeno 4 pilastri diversi", "At least 4 different pillars"), pilastri.size >= 4, t(`Ora sono ${pilastri.size}: alterna prodotto, consigli, ricette, dietro le quinte e community.`, `There are ${pilastri.size} now: alternate product, tips, recipes, behind the scenes and community.`)),
    ];
  },
  so_utm: (m) => {
    const l = (trovaBozza("b07", m)?.link ?? "").trim().toLowerCase();
    return [
      C(t("C'è un link al sito", "There's a link to the website"), /^(https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}/.test(l), t("Nella bozza del Black Friday scrivi il link nel campo Link.", "In the Black Friday draft write the link in the Link field.")),
      C("utm_source=instagram", /[?&]utm_source=instagram(&|$)/.test(l), t("Aggiungi ?utm_source=instagram dopo l'indirizzo.", "Add ?utm_source=instagram after the address.")),
      C("utm_medium=social", /[?&]utm_medium=social(&|$)/.test(l), t("Aggiungi &utm_medium=social.", "Add &utm_medium=social.")),
      C(t("utm_campaign con il nome della campagna", "utm_campaign with the campaign name"), /[?&]utm_campaign=[^&]*black/.test(l), t("Aggiungi &utm_campaign=black-friday.", "Add &utm_campaign=black-friday.")),
      C(t("Niente spazi né maiuscole", "No spaces or capitals"), !/\s/.test(l) && (trovaBozza("b07", m)?.link ?? "") === (trovaBozza("b07", m)?.link ?? "").toLowerCase(), t("Scrivi tutto in minuscolo e senza spazi, sempre uguale.", "Write everything in lowercase and without spaces, always the same way.")),
    ];
  },

  // Casi · Una piccola crisi
  so_sospendi: (m) => [C(t("La promo lampo di oggi è sospesa", "Today's flash promo is suspended"), !!m.post.z1?.sospeso, t("Calendario → il post di oggi «Promo lampo: kit matcha -30%» → Sospendi.", "Calendar → today's post «Flash promo: matcha kit 30% off» → Suspend."))],
  so_risposteCrisi: (m) => {
    const ids = ["x01", "x02", "x03", "x04", "x05"];
    const risposte = ids.map((id) => (m.risposte[id] ?? "").trim()).filter(Boolean);
    const diverse = new Set(risposte.map(normalizza)).size;
    return [
      C(t("Hai risposto ad almeno 3 commenti sulla frusta rotta", "You replied to at least 3 comments about the broken whisk"), risposte.length >= 3, t(`Ora sono ${risposte.length}.`, `There are ${risposte.length} now.`)),
      C(t("Le risposte non sono tutte uguali", "The replies aren't all the same"), risposte.length > 0 && diverse >= Math.min(risposte.length, 3), t("Personalizza: usa il nome della persona o rispondi a quello che ha scritto.", "Personalise: use the person's name or reply to what they wrote.")),
      C(t("Ogni risposta si scusa o offre un rimedio", "Every reply apologises or offers a remedy"), risposte.length > 0 && risposte.every((r) => ha(r, SCUSE) || ha(r, RIMEDIO)), t("In ogni risposta: scuse e cosa fate per rimediare.", "In every reply: an apology and what you're doing to put it right.")),
      C(t("Nessun commento è nascosto", "No comment is hidden"), ids.every((id) => !m.nascosti.includes(id) && !m.spam.includes(id)), t("Le critiche della crisi restano visibili: anche «Mai più da voi».", "The crisis criticism stays visible: even «Never again».")),
    ];
  },

  // Testi scritti nella guida
  so_reportStatistiche: (_m, testo) => [
    C(t("Dici cosa funziona meglio (caroselli e salvataggi)", "You say what works best (carousels and saves)"), ha(testo, /carosell|carousel/) && ha(testo, /salvat|salvataggi|engagement|\ber\b|\bsave/), t("Scrivi che i caroselli funzionano meglio e con quale numero.", "Write that carousels work best and with which number.")),
    C(t("Dici a cosa servono i reel", "You say what reels are for"), ha(testo, /reel|video/) && ha(testo, /copertura|persone nuove|non follower|raggiung|scopr|reach|new people|non-follower|discover/), t("I reel portano persone nuove: dillo.", "Reels bring in new people: say so.")),
    C(t("Dici cosa va peggio", "You say what does worst"), ha(testo, /foto|photo/) && ha(testo, /prodott|product/), t("Scrivi che le foto dei prodotti vanno peggio.", "Write that product photos do worst.")),
    C(t("Proponi qualcosa", "You propose something"), ha(testo, /propon|consigli|suggeris|meglio|dovremmo|potremmo|invece|propose|suggest|recommend|should|could|instead|better/), t("Chiudi con una proposta concreta.", "Finish with a concrete proposal.")),
  ],
  so_didascaliaLancio: (_m, testo) => [
    C(t("Dice cos'è (il calendario dell'avvento)", "It says what it is (the advent calendar)"), ha(testo, /avvento|advent/), t("Scrivi di che prodotto si tratta.", "Write which product it is.")),
    C(t("Dice da quando si trova", "It says when it's available from"), ha(testo, /2 novembre|da oggi|disponibile|e arrivato|in vendita|2 november|november 2|from today|available|on sale|is here|out now/), t("Scrivi da quando si può comprare.", "Write when it can be bought from.")),
    C(t("Invita ad andare al link", "It invites people to go to the link"), ha(testo, /link|\bbio\b|sito|website/), t("Aggiungi «lo trovi nel link in bio».", "Add «find it at the link in bio».")),
    C(t("La prima frase è corta (massimo 125 caratteri)", "The first sentence is short (125 characters at most)"), primaFrase(testo).length > 0 && primaFrase(testo).length <= 125, t("Chiudi prima la prima frase.", "End the first sentence sooner.")),
    C(t("Niente urgenza finta", "No fake urgency"), !ha(testo, /ultimi pezzi|affrettat|corri|solo per poco|esauriment|last few|hurry|selling out|almost gone|limited stock|don t miss/), t("Il primo giorno non ci sono «ultimi pezzi»: togli l'urgenza finta.", "On the first day there are no «last few left»: remove the fake urgency.")),
    C(t("Al massimo 8 hashtag", "8 hashtags at most"), hashtag(testo) <= 8, t("Pochi hashtag pertinenti bastano.", "A few relevant hashtags are enough.")),
  ],
  so_pianoNovembre: (_m, testo) => [
    C(t("Dici quanti post e quando", "You say how many posts and when"), ha(testo, /\b3\b|tre|settiman|three|week/) && ha(testo, /sera|\b19|\b20|\b21|orari|evening|\b7 ?pm|\b8 ?pm|\b9 ?pm|time/), t("Scrivi la frequenza e l'orario.", "Write the frequency and the time.")),
    C(t("Spieghi il lancio", "You explain the launch"), ha(testo, /avvento|lancio|advent|launch/), t("Racconta come lanciate il calendario dell'avvento.", "Explain how you're launching the advent calendar.")),
    C(t("Parli del Black Friday", "You talk about Black Friday"), ha(testo, /black friday|27/), t("Scrivi quando esce il Black Friday.", "Write when the Black Friday post goes out.")),
    C(t("Dici come misurerai i risultati", "You say how you'll measure the results"), ha(testo, /utm|clic|copertura|misur|vendite|salvataggi|click|reach|measur|sales|saves/), t("Ogni obiettivo ha il suo numero: scrivi quale guarderete.", "Every goal has its number: write which one you'll look at.")),
  ],
  so_postCrisi: (_m, testo) => [
    C(t("Dici cosa è successo", "You say what happened"), ha(testo, /frust|rott|spezz|danneggi|whisk|broke|damag|snapp/), t("Scrivi il fatto: le fruste sono arrivate rotte.", "Write the fact: the whisks arrived broken.")),
    C(t("Ti scusi", "You apologise"), ha(testo, SCUSE), t("Una scusa sincera, senza giri di parole.", "A sincere apology, without beating about the bush.")),
    C(t("Dici come rimediate", "You say how you're putting it right"), ha(testo, RIMEDIO), t("Cosa fate per chi è coinvolto? Per esempio una frusta nuova, gratis.", "What are you doing for the people involved? For example a new whisk, free.")),
    C(t("Dici come contattarvi", "You say how to contact you"), ha(testo, PRIVATO), t("Scrivi dove scrivere: in privato, con il numero d'ordine.", "Write where to get in touch: privately, with the order number.")),
    C(t("Non dai la colpa ad altri e non minimizzi", "You don't blame others or play it down"), !ha(testo, COLPA_ALTRI) && !ha(testo, /pochissimi casi|very few cases|only a few cases|isolated case/), t("Niente colpe ad altri: prendetevi la responsabilità.", "Don't blame others: take responsibility.")),
  ],
  so_reportCrisi: (_m, testo) => [
    C(t("Racconti i fatti", "You describe the facts"), ha(testo, /frust|rott|whisk|broke/) && /\d/.test(testo), t("Cosa è successo e a quanti ordini (circa 40).", "What happened and to how many orders (about 40).")),
    C(t("Dici cosa avete fatto oggi", "You say what you did today"), ha(testo, /sospes|promo|rispost|risposto|storia|post|scritto|suspend|repl|story|wrote|messag/), t("Elenca le azioni: promo sospesa, messaggio, risposte.", "List the actions: promo suspended, message, replies.")),
    C(t("Dici il rimedio per i clienti", "You say the remedy for customers"), ha(testo, RIMEDIO), t("Scrivi cosa ricevono i clienti coinvolti.", "Write what the customers involved receive.")),
    C(t("Proponi cosa cambiare", "You propose what to change"), ha(testo, /imballag|propon|non succeda|controll|miglior|cambia|packag|propose|suggest|check|improv|chang|prevent|again/), t("Chiudi con cosa cambiare perché non succeda di nuovo.", "Finish with what to change so it doesn't happen again.")),
  ],
};

export const leggiSocial = leggi;
