# Percorso SEO junior, versione del 30/10/2026 (seconda revisione).
# - Niente piu' "Come si fa" passo per passo dentro i mini esercizi: la guida ha la scheda "Come funziona"
#   che spiega solo la piattaforma (src/data/app/seo-pro/aiuto-strumenti.json), "Teoria" e "Indizio".
# - Ogni mini esercizio ha: domanda, consegna (cosa fare, senza la soluzione), teoria (spiega, esempio, errore),
#   indizio (aiuto, -5 punti), dove (Mostrami lo strumento), risposta: scelta, azione sul sito o testo da scrivere.
# - Livelli: Basi (2 esercizi), Diagnosi (3), Casi (3). Ogni esercizio 7-8 mini esercizi.
# Uso: python3 strumenti-dati/crea_livelli_seo.py (dalla cartella del progetto). Riscrive missioni.json.
import json, copy
P = "src/data/app/seo-pro/missioni.json"
src = json.load(open(P, encoding="utf-8"))
S = {m["id"]: m for m in src["missioni"]}
PAN = "/app/percorsi/seo/pannello/"

def opz(*xs):
    return [{"id": f"o{i+1}", "testo": t, "giusta": g, "nota": n} for i, (g, t, n) in enumerate(xs)]
def scelta(strumento, domanda, spiega, esempio, errore, opzioni, perche, aiuto, dove="", pagina=None, tipo="radio", consegna=""):
    p = {"strumento": strumento, "tipo": tipo, "domanda": domanda, "consegna": consegna, "spiega": spiega, "esempio": esempio,
         "errore": errore, "opzioni": opzioni, "perche": perche, "aiuto": aiuto, "dove": dove}
    if pagina: p["pagina"] = pagina
    return p
def azione(strumento, verifica, vai, negozio, domanda, consegna, spiega, esempio, errore, perche, aiuto, dove=""):
    return {"strumento": strumento, "tipo": "azione", "verifica": verifica, "vai": vai, "negozio": negozio, "domanda": domanda,
            "consegna": consegna, "spiega": spiega, "esempio": esempio, "errore": errore, "opzioni": [], "perche": perche, "aiuto": aiuto, "dove": dove}
def testo(verifica, domanda, consegna, spiega, esempio, errore, perche, aiuto, parole=(40, 160)):
    return {"strumento": "guida", "tipo": "testo", "verifica": verifica, "domanda": domanda, "consegna": consegna, "spiega": spiega,
            "esempio": esempio, "errore": errore, "opzioni": [], "perche": perche, "aiuto": aiuto, "dove": "", "parole": list(parole)}
def converti(p, consegna="", negozio=None, errore=None):
    """Passo gia' esistente: toglie le istruzioni passo per passo e aggiunge la consegna."""
    q = copy.deepcopy(p)
    q.pop("come", None); q.pop("compito", None)
    q["consegna"] = consegna or q.get("consegna", "")
    if negozio: q["negozio"] = negozio
    if errore: q["errore"] = errore
    q.setdefault("errore", "")
    return q

# ---------------- TUTORIAL (resta guidato: impara la piattaforma) ----------------
tut = copy.deepcopy(S["tutorial"])
t = tut["passi"]
t[1] = converti(t[1], "Apri Ispeziona nella pagina Accessori e guarda cosa mostra.")
t[2] = converti(t[2], "Nel Pannello cambia l'H1 di /accessori/ in «Teiere, tazze e accessori per il tè», salva e controlla.", "/app/negozio/accessori/")
t[0]["come"][2] = "<strong>A destra questa guida</strong>: in alto c'è il compito, sotto le risposte. Le schede <strong>Come funziona</strong>, <strong>Teoria</strong> e <strong>Indizio</strong> ti aiutano quando serve; il bottone per controllare è sempre in fondo."
info = t[3]
info["come"] = [
 "Tre livelli: <strong>Basi</strong>, <strong>Diagnosi</strong> e <strong>Casi</strong>. Ogni esercizio è un piccolo progetto fatto di mini esercizi; dentro un livello scegli tu l'ordine. Il livello dopo si apre quando finisci quello prima.",
 "<strong>Come funziona</strong> spiega lo strumento, non la risposta. <strong>Teoria</strong> è gratis. <strong>Indizio</strong> costa 5 punti.",
 "La guida cala salendo di livello: nelle Basi «Come funziona» è già aperto, in Diagnosi lo apri tu, nei Casi ci sono solo la teoria e i dati.",
 "Ogni esercizio parte da 100 punti: una risposta sbagliata toglie 10 punti. Quando scrivi o modifichi il sito puoi riprovare senza perdere punti.",
 "Per ripartire da zero: <strong>Ricomincia l'esercizio</strong> in alto nella guida."]
tut["passi"] = t

# ---------------- BASI ----------------
b1 = copy.deepcopy(S["base1"]); p = b1["passi"]
p[2] = converti(p[2], "Apri Ispeziona nella scheda Assam e leggi il title.")
p[4] = converti(p[4], "Seleziona tutte le pagine che hanno il title generico «Cinque Foglie | Negozio di tè online».")
p[5] = converti(p[5], "Nel Pannello riscrivi il title di /te-neri/assam/: deve far capire cosa si compra.", "/app/negozio/te-neri/assam/")
p[7] = converti(p[7], "Nel Pannello scrivi la meta description di /te-neri/darjeeling/: deve convincere a cliccare chi la legge su Google.", "/app/negozio/te-neri/darjeeling/")
b1["passi"] = [converti(x) if "come" in x else x for x in p]
b2 = copy.deepcopy(S["base2"]); p = b2["passi"]
p[1] = converti(p[1], "Apri Ispeziona nella pagina Matcha e confronta quello che vedi con quello che legge Google.")
p[2] = converti(p[2], "Nel Pannello aggiungi l'H1 alla pagina /matcha/.", "/app/negozio/matcha/")
p[3] = converti(p[3], "Trova la pagina 404 nel crawler e guarda da dove è linkata.")
p[5] = converti(p[5], "Fai in modo che chi apre la pagina 404 arrivi al prodotto giusto.", "/app/negozio/te-neri/earl-grey-classico/")
b2["passi"] = [converti(x) if "come" in x else x for x in p]
b1["livello"] = b2["livello"] = 1

# ---------------- DIAGNOSI ----------------
D = {x: S[x] for x in ("d1", "d2", "d3", "d4")}
d1 = {"id": "d1", "livello": 2, "n": 1, "nome": "Le tisane sparite da Google", "tempo": "35 minuti", "strumenti": "Indicizzazione, Negozio, Pannello, Console",
 "cosa": "Un calo di pagine indicizzate: quando, quante, perché, chi l'ha causato e come si sistema.",
 "situazione": "Le tisane non si trovano più su Google, eppure sul sito ci sono. Mi dici cosa è successo e lo sistemi?",
 "obiettivo": "Trovare quando e perché le pagine sono uscite da Google, correggere la causa e farlo sapere a Google.",
 "prepara": {"tema": True, "convalide": ['Esclusa in base al tag "noindex"']},
 "passi": [
  converti(D["d1"]["passi"][0], "Nel rapporto di indicizzazione trova quando inizia il calo e quante pagine si perdono.",
   errore="Guardare solo l'ultima settimana: senza confrontarla con le precedenti non si capisce da quando c'è il problema."),
  scelta("indicizzazione", "Quale motivo spiega il calo?",
   "Il rapporto elenca i motivi per cui le pagine sono fuori da Google. Alcuni ci sono da sempre e sono normali; per trovare la causa di un calo si cerca il motivo che è cresciuto proprio in quelle settimane.",
   "Un ristorante perde clienti a ottobre: le recensioni negative ci sono da anni, ma a ottobre ha cambiato orario. È l'orario la prima cosa da guardare.",
   "Prendere il motivo con più pagine. Il motivo più grande può essere vecchio e innocuo.",
   opz((False, "Pagina duplicata senza URL canonico", "Sono le versioni filtrate delle categorie: ci sono da prima del calo e non toccano le tisane."),
       (True, "Esclusa in base al tag \"noindex\"", ""),
       (False, "Scansionata, ma attualmente non indicizzata", "Sono pagine dei tag del blog e una seconda pagina di categoria: non c'entrano con il calo."),
       (False, "Non trovata (404)", "C'è una sola pagina 404: non spiega 7 pagine in meno.")),
   "Le pagine escluse per noindex sono le tisane: categoria e prodotti. È il motivo che spiega le 7 pagine perse.",
   "Apri ogni motivo e guarda quali pagine contiene: quali hanno a che fare con le tisane?", 'tr[data-motivo="0"]',
   consegna="Confronta i motivi di esclusione e trova quello legato al calo."),
  scelta("indicizzazione", "Tra le pagine in noindex, quali sono un problema?",
   "Il noindex chiede a Google di non mostrare una pagina. A volte è giusto: carrello, account, pagine di servizio non devono comparire nei risultati. È un problema solo quando c'è su pagine che vogliamo trovare su Google.",
   "In un sito di corsi, la pagina «Il mio profilo» in noindex va bene; la pagina del corso in noindex è un errore grave.",
   "Togliere il noindex a tutto quello che lo ha, carrello compreso: si riempie Google di pagine inutili.",
   opz((True, "/tisane/", ""), (True, "/tisane/camomilla-bio/", ""),
       (False, "/carrello/", "Il carrello non deve comparire su Google: il noindex lì è giusto."),
       (True, "/tisane/zenzero-limone/", ""),
       (False, "/account/", "L'area personale non deve comparire su Google: il noindex lì è giusto.")),
   "Le pagine delle tisane devono stare su Google, carrello e account no. Nella colonna «Sul sito oggi» il rapporto lo dice già: «Va bene così» per carrello e account.",
   "Chiediti per ogni pagina: qualcuno la cercherebbe su Google?", 'tr[data-motivo="0"]', tipo="checkbox",
   consegna="Seleziona tutte le pagine che non dovrebbero avere il noindex."),
  scelta("pannello", "Da dove arriva il noindex?",
   "Un noindex su tante pagine insieme di solito non è scritto a mano pagina per pagina: arriva da un'impostazione del tema o del gestionale. Per correggerlo bene si cerca la causa, così il problema non torna con le pagine nuove.",
   "Se tutti i prezzi di un negozio sono sbagliati di colpo, non si correggono uno per uno: si controlla la regola dello sconto che li calcola.",
   "Correggere le pagine una per una: funziona, ma la prossima tisana aggiunta al catalogo nascerà di nuovo in noindex.",
   opz((False, "Qualcuno l'ha scritto nel meta robots di ogni pagina delle tisane", "Apri una pagina delle tisane nel Pannello → Pagine: il meta robots è «Come da tema»."),
       (True, "Dall'impostazione del tema che nasconde la categoria Tisane ai motori di ricerca", ""),
       (False, "Da Google, che ha deciso di non mostrare le tisane", "Il rapporto dice che la fonte è il sito web, non Google.")),
   "Nel Pannello → Tema e impostazioni la categoria Tisane è nascosta, e il tema è stato aggiornato il 18/09/2026: lo stesso giorno in cui sono iniziate a sparire le pagine.",
   "Guarda la scheda Tema e impostazioni del Pannello e la data dell'ultimo aggiornamento del tema.", "[data-categorie]",
   consegna="Trova nel Pannello del negozio l'impostazione che mette il noindex alle tisane."),
  converti(D["d1"]["passi"][1], "Correggi la causa nel Pannello, senza toccare le pagine che devono restare fuori da Google.", "/app/negozio/tisane/",
   errore="Spegnere la causa e dimenticare di controllare: apri una tisana nel negozio e guarda il meta robots con Ispeziona."),
  scelta("console", "Google vede già la correzione?",
   "Google non legge il sito in tempo reale: conserva una copia di ogni pagina dall'ultima visita. Dopo una correzione, per un po' Google mostra ancora la versione vecchia. Il Controllo URL della Console mette a confronto le due versioni.",
   "Cambi la foto del profilo su un social: per qualche giorno, in alcune ricerche, compare ancora quella vecchia.",
   "Pensare che il problema sia risolto appena si salva: i numeri su Google cambiano solo dopo che Google ha riletto le pagine.",
   opz((False, "Sì, le modifiche sul sito arrivano subito su Google", "Nel Controllo URL la colonna di Google mostra ancora il noindex."),
       (True, "No: Google ricorda la versione vecchia con il noindex, il sito invece è già corretto", ""),
       (False, "No, perché la correzione non ha funzionato", "Guarda la colonna «Il sito adesso»: il meta robots è già cambiato.")),
   "Il sito è a posto, ma Google ha in memoria la versione con il noindex. Per accelerare si chiede a Google di ricontrollare.",
   "Nel Controllo URL scrivi /tisane/ e confronta le due colonne.", "[data-controllo-url]",
   consegna="Usa il Controllo URL della Console su /tisane/."),
  converti(D["d1"]["passi"][2], "Chiedi a Google di verificare la correzione di tutte le pagine con lo stesso problema."),
 ],
 "imparato": ["Un calo si legge confrontando le settimane e cercando cosa è cambiato in quei giorni.", "Non ogni noindex è un errore: carrello e account devono restare fuori.", "Si corregge la causa (il tema), non le pagine una per una.", "Google vede le correzioni solo dopo averle rilette: si chiede la convalida."],
 "elena": "Ho visto: le tisane sono di nuovo visibili e Google le sta ricontrollando. E ora so che il problema era il tema."}

te0 = converti(D["d2"]["passi"][0], "Confronta impressioni, CTR e posizione di /te-verdi/ con le altre pagine.",
  errore="Guardare solo i clic: una pagina con pochi clic può avere un problema di posizione o di CTR, e si risolvono in modo diverso.")
d2 = {"id": "d2", "livello": 2, "n": 2, "nome": "La pagina dei tè verdi che nessuno clicca", "tempo": "45 minuti", "strumenti": "Console, Keyword, Pannello",
 "cosa": "CTR basso, keyword, due pagine che si rubano le ricerche: capire e riscrivere.",
 "situazione": "La pagina dei tè verdi compare spesso su Google ma ci arrivano pochissime persone. E per «tè verde sencha» non saliamo mai. Ci guardi?",
 "obiettivo": "Capire perché la pagina è poco cliccata, sceglierne la keyword, risolvere la cannibalizzazione e riscriverla.",
 "prepara": {"pagine": ["/te-verdi/"], "richieste": ["/te-verdi/"]},
 "passi": [
  te0,
  scelta("console", "Quanti clic in più con un CTR normale?",
   "Per capire se vale la pena lavorare su una pagina si stima il guadagno: impressioni × CTR che ci si aspetta = clic. La differenza con i clic di oggi è quello che si può guadagnare. Per una categoria in prima pagina un CTR del 3% è realistico.",
   "Una pagina con 10.000 impressioni e CTR 1% fa 100 clic. Al 3% ne farebbe 300: 200 clic in più.",
   "Fare il conto con un CTR irrealistico (es. 30%): la stima diventa una promessa che non si mantiene.",
   opz((False, "Circa 300 clic in più", "Ricontrolla le impressioni: sono oltre 140.000 in 3 mesi."),
       (True, "Circa 3.300 clic in più in 3 mesi", ""),
       (False, "Circa 33.000 clic in più", "Hai usato un CTR troppo alto: con il 3% il risultato è dieci volte più piccolo.")),
   "140.549 impressioni × 3% = circa 4.200 clic, contro gli 878 di oggi: circa 3.300 clic in più in 3 mesi. È la pagina con più margine di tutto il sito.",
   "Prendi le impressioni di /te-verdi/ dalla scheda Pagine, moltiplica per 0,03 e togli i clic di oggi.", "[data-scheda='pagine']",
   consegna="Stima quanti clic avrebbe /te-verdi/ con un CTR del 3%, nello stesso periodo."),
  converti(S["d4"]["passi"][0], "Nella scheda Query trova quali pagine compaiono per «tè verde sencha».",
   errore="Pensare che due pagine nei risultati siano meglio di una: spesso si dividono i clic e nessuna sale."),
  converti(S["d4"]["passi"][1], "Scegli come dare a ogni pagina un compito diverso.",
   errore="Cancellare una delle due pagine: si perde quello che di buono aveva (link, visite, contenuto)."),
  converti(D["d2"]["passi"][1], "Riscrivi title e meta description di /te-verdi/ nel Pannello.", "/app/negozio/te-verdi/",
   errore="Ripetere «tè verdi» tre volte nel title per «posizionarsi meglio»: sembra spam e Google può riscriverlo."),
  converti(D["d2"]["passi"][2], "Riscrivi il testo introduttivo di /te-verdi/: deve aiutare chi sceglie un tè verde.", "/app/negozio/te-verdi/",
   errore="Scrivere un testo per Google, pieno di keyword, che nessuno legge: Google premia i testi utili alle persone."),
  converti(D["d2"]["passi"][3], "Chiedi a Google di rileggere /te-verdi/."),
 ],
 "imparato": ["Un CTR basso con tante impressioni è un problema di title e description.", "Si stima il guadagno prima di lavorare: impressioni × CTR atteso.", "La cannibalizzazione si risolve dando a ogni pagina un intento diverso.", "Dopo una riscrittura si chiede a Google di rileggere la pagina."],
 "elena": "Bellissimo, title e testo nuovi sono online e il copywriter sistema la guida sul Sencha. Tra qualche settimana guardiamo se il CTR sale."}

d3 = {"id": "d3", "livello": 2, "n": 3, "nome": "Pagine doppie e redirect", "tempo": "35 minuti", "strumenti": "Indicizzazione, Crawler, Pannello",
 "cosa": "Filtri duplicati, una catena di redirect e avvisi che non sono problemi: distinguere e correggere.",
 "situazione": "Nel rapporto di Google ci sono 14 pagine escluse che non sono le tisane. Il team web vuole sapere quali sono da sistemare e quali no.",
 "obiettivo": "Capire quali esclusioni sono problemi veri, correggerle e lasciare stare quelle normali.",
 "prepara": {"tema": True, "redirect": ["/prodotto.php?id=12", "/te-verdi/sencha/"]},
 "passi": [
  scelta("indicizzazione", "Cosa sono le pagine duplicate senza canonical?",
   "Quando una categoria si può ordinare o filtrare, ogni scelta crea un indirizzo nuovo (es. /te-verdi/?ordina=prezzo) con quasi lo stesso contenuto. Se il sito non dice qual è la versione principale, Google deve indovinarla e spreca tempo a leggerle tutte.",
   "Un negozio di scarpe ha /scarpe/, /scarpe/?colore=nero e /scarpe/?ordina=prezzo: tre indirizzi, una sola pagina vera.",
   "Credere che più indirizzi su Google voglia dire più traffico: le copie si fanno concorrenza.",
   opz((False, "Prodotti copiati da un altro sito", "Guarda gli indirizzi: hanno tutti un ? con ordina, colore, materiale."),
       (True, "Le versioni ordinate e filtrate delle categorie", ""),
       (False, "Articoli del blog con lo stesso titolo", "Gli indirizzi sono di categorie, non del blog.")),
   "Sono le stesse categorie viste con un ordine o un filtro diverso. Google le considera copie e sceglie da solo quale tenere.",
   "Apri il motivo e guarda cosa hanno in comune gli indirizzi.", 'tr[data-motivo="1"]',
   consegna="Apri il motivo «Pagina duplicata senza URL canonico» e guarda gli indirizzi."),
  scelta("indicizzazione", "Come si sistemano?",
   "Il canonical è un'indicazione nel codice che dice a Google: «questa pagina è una copia, la versione principale è quell'altra». Le persone possono ancora usare i filtri, ma Google raccoglie tutto sulla categoria.",
   "Una ricetta pubblicata anche in versione stampabile: la versione stampabile indica come canonical la ricetta normale.",
   "Mettere noindex o cancellare i filtri: i filtri servono a chi compra, il problema è solo dire a Google qual è la pagina principale.",
   opz((False, "Togliere i filtri dal negozio", "I filtri servono a chi compra: il problema è solo per Google."),
       (True, "Un canonical dalle versioni filtrate verso la categoria", ""),
       (False, "Mettere noindex su tutte le categorie", "Così uscirebbero da Google anche le categorie vere.")),
   "Con il canonical le versioni filtrate restano utilizzabili e Google sa che la pagina da mostrare è la categoria.",
   "Cerca nella teoria la parola che indica la versione principale.", "",
   consegna="Scegli la soluzione che lascia i filtri a chi compra."),
  azione("pannello", "canonicalFiltri", {"link": PAN + "#tema", "testo": "Apri il Pannello"}, "",
   "Imposta il canonical delle pagine filtrate",
   "Nel Pannello attiva il canonical per tutte le pagine filtrate in un colpo solo.",
   "Quando lo stesso problema riguarda tante pagine fatte con lo stesso modello, si corregge il modello: una sola impostazione invece di 7 pagine modificate a mano.",
   "In un blog si attiva il canonical per tutte le pagine «stampa» nelle impostazioni, non articolo per articolo.",
   "Correggere a mano solo le 7 pagine di oggi: domani un filtro nuovo crea un'altra copia senza canonical.",
   "Ora tutte le versioni filtrate indicano la categoria come pagina principale, anche quelle che verranno create in futuro.",
   "È un'impostazione generale, non di una singola pagina: cercala nella scheda delle impostazioni.", "[data-canonical-filtri]"),
  converti(D["d3"]["passi"][0], "Nel crawler trova il vecchio indirizzo che arriva alla pagina finale con più di un salto."),
  converti(D["d3"]["passi"][1], "Accorcia la catena: ogni vecchio indirizzo deve arrivare alla pagina finale con un solo salto.",
   errore="Cancellare il redirect di mezzo: chi usa ancora quell'indirizzo trova un 404."),
  scelta("crawler", "/negozio/tisane/ porta a /tisane/. Va sistemato?",
   "Un redirect non è un problema in sé: serve proprio a non perdere visite quando un indirizzo cambia. Diventa un problema se porta alla pagina sbagliata, se fa più salti o se i link interni del sito ci passano sopra.",
   "Un cartello «ci siamo trasferiti» con l'indirizzo giusto è utile; tre cartelli che rimandano uno all'altro no.",
   "Togliere tutti i redirect per avere il crawler «pulito»: chi arriva dai vecchi indirizzi finisce su un errore.",
   opz((True, "No: è un solo salto verso la pagina giusta", ""),
       (False, "Sì, va eliminato perché ogni redirect è un errore", "Senza redirect chi usa il vecchio indirizzo trova un 404."),
       (False, "Sì, va trasformato in un 302", "Lo spostamento è definitivo: il 301 è quello giusto.")),
   "Il crawler lo segnala tra le cose «da controllare», non da sistemare: controllato, va bene così. Saper dire «questo non è un problema» è metà del lavoro.",
   "Guarda la riga Catena di redirect nei dettagli: quanti salti fa?", '[data-filtro="3xx"]',
   consegna="Controlla nel crawler dove porta e quanti salti fa."),
  scelta("indicizzazione", "«Scansionata, ma non indicizzata»: cosa fai?",
   "Google non indicizza tutto quello che legge: lascia fuori le pagine che ritiene poco utili, come le pagine dei tag con poche righe o le pagine 2, 3… di una categoria. Non è un errore del sito: è una scelta di Google. Si interviene solo se fuori resta una pagina importante.",
   "In una biblioteca non si mette in vetrina ogni foglio: solo i libri. Le pagine dei tag sono fogli.",
   "Cercare di far indicizzare tutto: si spreca tempo su pagine che non porterebbero visite.",
   opz((False, "È urgente: chiedere l'indicizzazione di ogni pagina", "Sono tag del blog e una pagina 2: non porterebbero visite."),
       (True, "Niente di urgente: sono pagine poco utili, è normale che restino fuori", ""),
       (False, "Mettere un 301 dalle pagine dei tag alla home", "Così chi usa i tag nel blog finisce sulla home: peggiora il sito senza motivo.")),
   "Le 4 pagine sono tre tag del blog con 60 parole e una seconda pagina di categoria. Google fa bene a lasciarle fuori.",
   "Apri il motivo e guarda che pagine sono: le cercheresti su Google?", 'tr[data-motivo="2"]',
   consegna="Apri il motivo «Scansionata, ma attualmente non indicizzata» e decidi."),
 ],
 "imparato": ["Le versioni filtrate di una categoria si sistemano con il canonical, non togliendo i filtri.", "Quando il problema è in un modello, si corregge il modello.", "Una catena di redirect si accorcia puntando alla pagina finale.", "Non ogni avviso è un problema: un redirect a un salto e le pagine povere fuori da Google vanno bene così."],
 "elena": "Perfetto: al team web giro solo i due problemi veri, e so cosa rispondere se mi chiedono degli altri avvisi."}

# ---------------- CASI (niente indizi, solo teoria) ----------------
c1 = {"id": "c1", "livello": 3, "n": 1, "nome": "Audit di fine mese", "tempo": "45 minuti", "strumenti": "Indicizzazione, Crawler, Pannello",
 "cosa": "Velocità, title, priorità e una richiesta scritta al team web.",
 "situazione": "Fine mese: mi serve sapere cosa sistemare ancora sul sito e in che ordine. Il team web ha tempo per una sola cosa grossa.",
 "obiettivo": "Trovare i problemi rimasti, capire quanto pesano, correggere quello che puoi e scrivere la richiesta al team web.",
 "prepara": {"pagine": ["/blog/sencha-guida-completa/"]},
 "passi": [
  scelta("indicizzazione", "Quali pagine sono lente, e dove?",
   "I Core Web Vitals misurano l'esperienza di chi visita: l'LCP è il tempo in cui compare l'elemento più grande della pagina. Sotto 2,5 secondi è buono, sopra 4 secondi è scarso. Google li misura con le visite vere, separando telefono e computer.",
   "Un sito di ricette veloce sul computer può essere lentissimo sul telefono se carica le foto a piena grandezza.",
   "Guardare solo i dati del computer: oggi la maggior parte delle visite arriva dal telefono.",
   opz((False, "Il blog, su computer", "Il blog è buono su entrambi i dispositivi."),
       (True, "Le schede prodotto, sul telefono", ""),
       (False, "Le categorie, sul telefono", "Le categorie sono entro i limiti."),
       (False, "Nessuna: tutti i gruppi sono buoni", "Guarda il gruppo con lo stato Scarso.")),
   "Le 29 schede prodotto hanno un LCP di 4,1 secondi sul telefono: oltre la soglia di «scarso». Sul computer invece vanno bene.",
   "", "", consegna="Nella scheda Core Web Vitals trova il gruppo di pagine con un problema e il dispositivo."),
  scelta("indicizzazione", "Perché quel problema pesa più degli altri?",
   "Per decidere le priorità si guarda dove il problema tocca i soldi: quante pagine, quante visite e se sono pagine dove si compra. Un difetto piccolo su pagine che vendono può valere più di un difetto grande su pagine che nessuno visita.",
   "In un negozio fisico una cassa lenta costa più di un cartello storto in magazzino.",
   "Ordinare i problemi per quante volte li segnala uno strumento invece che per l'effetto sulle vendite.",
   opz((True, "Riguarda le pagine dove si compra, sul dispositivo usato di più", ""),
       (False, "Perché Google penalizza tutto il sito", "Il problema riguarda un gruppo di pagine, non tutto il sito."),
       (False, "Non pesa: gli utenti aspettano qualche secondo", "Oltre 3-4 secondi molte persone tornano indietro, soprattutto dal telefono.")),
   "Le schede prodotto sono dove si mette nel carrello: se sul telefono ci mettono 4 secondi, una parte delle persone se ne va prima di comprare.",
   "", "", consegna="Scegli il motivo per cui va sistemato per primo."),
  testo("ticketLcp", "Scrivi la richiesta al team web",
   "Scrivi 2-5 frasi per il team web: quale problema, su quali pagine e dispositivo, cosa lo causa e cosa proponi di fare.",
   "Una richiesta (ticket) per chi sviluppa deve essere chiara anche senza conoscere la SEO: cosa non va, dove, il dato che lo dimostra, la causa se la sai e il risultato che vuoi. Così si stima il lavoro e si capisce quando è finito.",
   "«Le pagine dei corsi su telefono impiegano 5 s a mostrare la foto principale (LCP, soglia 2,5 s). La causa è l'immagine da 3 MB. Proposta: versione ridotta per telefono e formato WebP. Fatto quando l'LCP è sotto 2,5 s.»",
   "Scrivere «il sito è lento, sistematelo»: senza pagine, dato e causa il team non sa da dove partire.",
   "Esempio di un collega senior: «Le 29 schede prodotto su telefono hanno un LCP di 4,1 s (soglia 2,5 s). Causa: la foto principale è un JPG da circa 2,4 MB, senza dimensioni e senza versione per telefono. Proposta: versione ridotta per telefono, formato WebP e dimensioni nel codice. Obiettivo: LCP sotto 2,5 s.»",
   "", (25, 140)),
  scelta("crawler", "Quale title supera i 580 pixel?",
   "Google mostra il title fino a circa 580 pixel (circa 60 caratteri): oltre, lo taglia con i puntini e a volte lo riscrive da solo. Le parole tagliate sono quelle in fondo.",
   "«Scarpe da corsa per principianti: come sceglierle, prezzi e i 10 modelli migliori | Negozio» viene tagliato prima della parte più utile.",
   "Contare solo i caratteri: le lettere larghe (m, w) occupano più spazio di quelle strette (i, l).",
   opz((False, "/te-verdi/", "Il title di /te-verdi/ è corto."),
       (True, "/blog/sencha-guida-completa/", ""),
       (False, "/te-neri/assam/", "Il title dell'Assam è sotto i 580 pixel.")),
   "La guida al Sencha ha un title da più di 580 pixel: «Tè verde Sencha: cos'è, come si prepara e dove comprarlo | Cinque Foglie».",
   "", "", consegna="Usa il crawler per trovarlo."),
  scelta("crawler", "Cosa c'è di sbagliato, oltre alla lunghezza?",
   "Un title promette qualcosa a chi cerca. Una guida deve promettere informazioni; una scheda prodotto un acquisto. Se una guida promette anche l'acquisto, si mette a competere con la scheda del prodotto per le stesse ricerche.",
   "Un articolo «Come scegliere una bici e dove comprarla» compare per «comprare bici» al posto delle pagine del negozio che le vendono.",
   "Pensare solo ai pixel e lasciare nel title una promessa che porta le persone sulla pagina sbagliata.",
   opz((False, "Manca la parola «Sencha»", "«Sencha» c'è, all'inizio."),
       (True, "«Dove comprarlo» promette un acquisto: la guida compete con la scheda del Sencha", ""),
       (False, "Il brand non dovrebbe esserci", "Il brand alla fine va bene.")),
   "È la causa della cannibalizzazione su «tè verde sencha»: la guida dice di vendere, quindi Google la mette in concorrenza con la scheda prodotto.",
   "", "", consegna="Rileggi il title pensando a chi cerca e a cosa trova."),
  azione("pannello", "titoloGuidaSencha", {"link": PAN + "?pagina=/blog/sencha-guida-completa/", "testo": "Apri la guida nel Pannello"}, "/app/negozio/blog/sencha-guida-completa/",
   "Riscrivi il title della guida al Sencha",
   "Nel Pannello riscrivi il title di /blog/sencha-guida-completa/.",
   "Il title di un articolo dice la domanda a cui risponde e cosa trova chi legge (es. «come si prepara», «temperatura e tempi»). Deve stare entro 580 pixel e chiudere con il brand.",
   "«Come si fa il pane in casa: impasto, lievitazione e cottura | NomeBlog».",
   "Togliere la parte d'acquisto e lasciare un title vago («Sencha | Cinque Foglie»): non dice cosa si impara.",
   "Esempio di un collega senior: «Tè verde Sencha: cos'è e come si prepara | Cinque Foglie». Ora la guida risponde a chi si informa, e la scheda prodotto a chi vuole comprare.",
   "", "[data-editor] input[name=title]"),
  scelta("indicizzazione", "Elena ti chiede l'ordine dei lavori. Quale?",
   "Le priorità si decidono incrociando l'impatto (quante pagine e quanti soldi), lo sforzo (chi lo fa e quanto ci vuole) e l'urgenza. Le cose che puoi fare tu in pochi minuti non aspettano; quelle che richiedono il team web si mettono in fila per impatto.",
   "In cucina prima si spegne il fuoco che brucia, poi si lavano i piatti, poi si riordina la dispensa.",
   "Mettere per prime le cose facili ma inutili per avere una lista «spuntata».",
   opz((True, "1) velocità delle schede prodotto su telefono (team web), 2) link interni alla vecchia pagina dell'Earl Grey, 3) description mancanti degli accessori, 4) tag del blog non indicizzati: lasciare così", ""),
       (False, "1) tag del blog non indicizzati, 2) description degli accessori, 3) velocità delle schede prodotto", "I tag del blog non portano visite: sono l'ultima cosa, anzi si possono lasciare così."),
       (False, "1) title troppo lunghi in tutto il sito, 2) velocità, 3) tutto il resto", "C'era un solo title troppo lungo e l'hai già sistemato. La velocità tocca 29 pagine che vendono.")),
   "La velocità delle schede prodotto tocca tutte le pagine dove si compra; i link interni all'Earl Grey sono pochi minuti di lavoro; le description degli accessori aiutano il CTR; i tag del blog vanno bene così.",
   "", "", consegna="Scegli l'ordine con cui li faresti."),
 ],
 "imparato": ["I Core Web Vitals si leggono per gruppo di pagine e per dispositivo.", "Le priorità si decidono guardando dove il problema tocca le vendite.", "Una richiesta al team web dice cosa, dove, il dato, la causa e quando è finito.", "Il title di una guida promette informazioni, non un acquisto."],
 "elena": "Chiarissimo. Ho girato la tua richiesta al team web così com'è: dicono che è la più chiara che abbiano ricevuto da mesi."}

c2s = S["c2"]["passi"]
c2 = {"id": "c2", "livello": 3, "n": 2, "nome": "Il calo di ottobre", "tempo": "50 minuti", "strumenti": "Console, Indicizzazione, Statistiche",
 "cosa": "Separare il normale dal problema vero, calcolare il costo e scrivere il riepilogo.",
 "situazione": "Ottobre va male: i clic da Google sono scesi rispetto a settembre, e di solito in autunno saliamo. Venerdì presento i numeri: mi spieghi cosa è successo?",
 "obiettivo": "Capire se il calo è normale o no, dove nasce, quanto costa e scrivere il riepilogo per Elena.",
 "passi": [
  scelta("console", "Quanto sono calati i clic a ottobre?",
   "Una variazione si misura in percentuale: (nuovo − vecchio) / vecchio × 100. Così si possono confrontare mesi e parti del sito di dimensioni diverse.",
   "Da 2.000 a 1.800 visite: (1.800 − 2.000) / 2.000 = −10%.",
   "Confrontare i numeri assoluti di parti molto diverse: 100 clic in meno sul blog e 100 sulle tisane non pesano allo stesso modo.",
   opz((True, "Circa −7% rispetto a settembre", ""), (False, "Circa −27%", "Ricontrolla: da circa 11.000 a circa 10.300."), (False, "Sono saliti", "Guarda settembre e ottobre 2026 nel grafico.")),
   "Da 11.068 a 10.261 clic: circa −7%.",
   "", "", consegna="Nella Console, per tutto il sito, confronta settembre e ottobre 2026."),
  scelta("console", "È un calo normale per la stagione?",
   "Molti siti hanno una stagionalità: periodi dell'anno in cui le ricerche salgono o scendono da sole. Per capire se un calo è normale si confronta lo stesso periodo dell'anno prima.",
   "Un negozio di costumi da bagno cala a settembre ogni anno: non è un problema, è la stagione.",
   "Confrontare solo con il mese prima e scambiare la stagione per un problema (o il contrario).",
   opz((False, "Sì, anche l'anno scorso a ottobre i clic erano scesi", "Guarda settembre e ottobre 2025: erano saliti."),
       (True, "No: l'anno scorso da settembre a ottobre i clic erano saliti di circa il 10%", ""),
       (False, "Non si può sapere senza altri dati", "Il confronto con l'anno prima è proprio il dato che serve.")),
   "Nel 2025 da settembre a ottobre si passava da 10.131 a 11.116 clic (circa +10%). Quest'anno si scende: qualcosa non va.",
   "", "", consegna="Confronta lo stesso passaggio di mesi con l'anno prima."),
  converti(c2s[0], "Trova la parte del sito che scende molto più delle altre."),
  converti(c2s[1], "Controlla se il calo dei tè freddi è un problema o la stagione."),
  scelta("indicizzazione", "Cosa collega il calo delle tisane a una modifica del sito?",
   "Quando un calo riguarda una parte precisa del sito e inizia in una data precisa, si cerca cosa è cambiato in quella parte in quei giorni: un aggiornamento del tema, una migrazione, un cambio di indirizzi.",
   "Le vendite di un ristorante calano dal martedì in cui è cambiato il sito delle prenotazioni: prima si controlla il sito.",
   "Dare la colpa all'algoritmo di Google senza controllare cosa è cambiato sul proprio sito.",
   opz((False, "Un aggiornamento dell'algoritmo di Google", "Il rapporto dice che la fonte è il sito web, e il calo tocca solo le tisane."),
       (True, "Il noindex arrivato con il nuovo tema il 18 settembre", ""),
       (False, "I prezzi delle tisane", "I prezzi non tolgono le pagine da Google.")),
   "Le pagine indicizzate scendono dalla settimana del 21 settembre, subito dopo il nuovo tema del 18/09, e quelle uscite sono proprio le tisane.",
   "", "", consegna="Cerca nel rapporto di indicizzazione la data e il motivo."),
  converti(c2s[2], "Calcola quanto valgono al mese le visite perse dalle tisane."),
  scelta("console", "Quanto è urgente?",
   "Per la stagionalità bisogna guardare anche i mesi che arrivano: un problema su un prodotto invernale costa poco a settembre e molto a dicembre.",
   "Un negozio di cappotti che sparisce da Google ad agosto perde poco; se resta fuori anche a novembre perde la stagione.",
   "Calcolare il costo solo sul mese passato quando i mesi forti devono ancora arrivare.",
   opz((False, "Può aspettare la primavera: costa poco", "Guarda le tisane nel 2025 tra novembre e gennaio."),
       (True, "Molto: tra novembre e gennaio le tisane fanno quasi il triplo dei clic", ""),
       (False, "Non è urgente perché le tisane sono una parte piccola", "Nei mesi freddi sono una delle parti più cercate.")),
   "Nel 2025 le tisane facevano circa 1.900-2.100 clic al mese tra novembre e gennaio, contro i circa 750 di settembre. Restare fuori da Google in inverno costerebbe molto più dei 470 € di oggi.",
   "", "", consegna="Guarda le tisane, mese per mese, nell'anno prima."),
  testo("messaggioElena", "Scrivi il riepilogo per Elena",
   "Scrivi 3-8 frasi: cosa è successo, da quando, perché, quanto costa, cosa è normale e cosa hai fatto o proponi.",
   "Un riepilogo per un responsabile mette prima la conclusione, poi i numeri che la dimostrano e infine cosa fare. Niente gergo non spiegato: chi legge deve poter decidere in un minuto.",
   "«Il calo di ottobre viene dalla categoria scarpe da trail, uscita da Google il 3 ottobre per un errore del gestionale: costa circa 800 € al mese. Il calo dei sandali invece è stagionale. Ho corretto l'errore e chiesto a Google di ricontrollare: i numeri torneranno in 2-3 settimane.»",
   "Raccontare tutti i passaggi dell'analisi: il responsabile vuole la conclusione e cosa fare.",
   "Esempio di un collega senior: «Il calo di ottobre (−7%) viene dalle tisane: dal 18 settembre il nuovo tema le ha nascoste a Google con un noindex. Costano circa 470 € al mese e peseranno di più in inverno. Il calo dei tè freddi è invece stagionale, come ogni anno. Ho tolto il noindex e chiesto a Google di convalidare la correzione.»",
   "", (40, 170)),
 ],
 "imparato": S["c2"]["imparato"] + ["guardare i mesi che arrivano per capire l'urgenza"],
 "elena": S["c2"]["elena"]}

c3s = S["c1"]["passi"]
c3 = {"id": "c3", "livello": 3, "n": 3, "nome": "Il piano dei contenuti", "tempo": "45 minuti", "strumenti": "Keyword, Statistiche",
 "cosa": "Cosa scrivere fino a Natale, in che ordine, e il brief per il copywriter.",
 "situazione": "Il copywriter ha tempo per un articolo a settimana. Su cosa lo facciamo lavorare fino a Natale?",
 "obiettivo": "Usare stagionalità, intento e dati di vendita per scegliere cosa pubblicare e quando, e scrivere il brief del primo articolo.",
 "passi": [converti(x) for x in c3s] + [
  testo("briefRegali", "Scrivi il brief per il copywriter",
   "Scrivi il brief del primo articolo: keyword principale, per chi è, entro quando pubblicarlo, cosa deve contenere e quali prodotti linkare.",
   "Un brief è la consegna per chi scrive: senza, il copywriter indovina. Contiene la keyword e l'intento, il pubblico, la data, i punti da coprire e i link interni verso i prodotti.",
   "«Keyword: idee regalo per chi ama cucinare. Per chi cerca un regalo a novembre. Pubblicare entro il 10/11. Sezioni: 5 idee sotto i 30 €, come scegliere, confezione regalo. Link alle pagine dei kit e degli utensili.»",
   "Dare solo il titolo: il copywriter non sa per chi scrive, quando serve e dove portare chi legge.",
   "Esempio di un collega senior: «Keyword: idee regalo tè. Per chi cerca un regalo a un amante del tè, budget 20-50 €. Pubblicare entro metà novembre (le ricerche salgono da novembre). Sezioni: idee per budget, kit e accessori, come scegliere il tè giusto. Link: kit matcha, teiera in ghisa, tisane della sera.»",
   "", (30, 160))],
 "imparato": S["c1"]["imparato"] + ["scrivere un brief chiaro per chi produce i contenuti"],
 "elena": S["c1"]["elena"]}

for e in [d1, d2, d3, c1, c2, c3]:
    for q in e["passi"]:
        q.setdefault("errore", ""); q.pop("come", None); q.pop("compito", None)
src["livelli"] = [
 {"n": 0, "nome": "Tutorial", "cosa": "Come funziona la scrivania."},
 {"n": 1, "nome": "Basi", "cosa": "Un concetto alla volta. «Come funziona» è già aperto e l'indizio è sempre disponibile."},
 {"n": 2, "nome": "Diagnosi", "cosa": "Problemi mescolati, anche falsi allarmi. «Come funziona» lo apri tu."},
 {"n": 3, "nome": "Casi", "cosa": "Nessun indizio: solo dati e teoria. Calcoli, priorità e testi da scrivere."}]
src["_nota"] = "Percorso SEO junior a livelli. Generato da strumenti-dati/crea_livelli_seo.py: vedi le note in testa allo script."
src["missioni"] = [tut, b1, b2, d1, d2, d3, c1, c2, c3]
json.dump(src, open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for e in src["missioni"]:
    print(e["livello"], e["id"], e["nome"], len(e["passi"]), [q["tipo"][0] + (":" + q["verifica"] if q.get("verifica") else "") for q in e["passi"]])
