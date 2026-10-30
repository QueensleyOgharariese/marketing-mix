# Teoria dell'Hub: ruolo pilota SEO (30/10/2026).
# Struttura di un ruolo: scheda del ruolo, 3 lezioni a blocchi (concetto + esempio + 1-2 domande),
# riepilogo e domande finali per lezione, verifica da 8 domande (6 giuste per superarla), prova veloce, pratica.
# Tipi di domanda: singola, multipla, vf (vero o falso), ordina, abbina. Ogni domanda ha la spiegazione.
# "blog": link a un articolo del blog per approfondire (solo articoli che esistono davvero).
import json
def singola(testo, giusta, sbagliate, spiega):
    return {"tipo": "singola", "testo": testo, "opzioni": [{"t": giusta, "giusta": True}] + [{"t": s, "giusta": False} for s in sbagliate], "spiegazione": spiega}
def multipla(testo, giuste, sbagliate, spiega):
    return {"tipo": "multipla", "testo": testo, "opzioni": [{"t": g, "giusta": True} for g in giuste] + [{"t": s, "giusta": False} for s in sbagliate], "spiegazione": spiega}
def vf(testo, vero, spiega):
    return {"tipo": "vf", "testo": testo, "risposta": vero, "spiegazione": spiega}
def ordina(testo, voci, spiega):
    return {"tipo": "ordina", "testo": testo, "voci": voci, "spiegazione": spiega}
def abbina(testo, coppie, spiega):
    return {"tipo": "abbina", "testo": testo, "coppie": coppie, "spiegazione": spiega}
def blocco(titolo, testo, esempio, domande, blog=None):
    b = {"titolo": titolo, "testo": testo, "esempio": esempio, "domande": domande}
    if blog: b["blog"] = blog
    return b
BLOG_RUOLO = {"slug": "cosa-fa-un-seo-specialist", "titolo": "Cosa fa un SEO specialist"}
BLOG_TITLE = {"slug": "title-e-meta-description", "titolo": "Title e meta description: come si scrivono"}

seo = {
 "_nota": "Teoria del ruolo SEO specialist (Hub 1). Generato da strumenti-dati/crea_teoria_seo.py. Testi scritti da Claude: DA RILEGGERE.",
 "id": "seo", "nome": "SEO specialist", "hub": 1,
 "scheda": {
  "cosaFa": "Fa trovare un sito su Google senza pagare la pubblicità. Sceglie le ricerche giuste per ogni pagina, controlla che Google possa leggere il sito, migliora titoli e testi e misura i risultati.",
  "conChi": ["Copywriter e content creator, che scrivono i testi", "Sviluppatori e team web, che sistemano la parte tecnica", "E-commerce e marketing, che decidono cosa vendere e quando"],
  "strumenti": [
   {"nome": "Google Search Console", "cosa": "Clic, impressioni e pagine su Google. Gratis."},
   {"nome": "Google Analytics", "cosa": "Cosa succede dopo il clic: visite, ordini. Gratis."},
   {"nome": "Un crawler (es. Screaming Frog)", "cosa": "Legge tutto il sito come Google e trova i problemi. Gratis fino a 500 indirizzi."},
   {"nome": "Strumenti per le keyword (es. Keyword Planner)", "cosa": "Quante persone cercano una parola e quando."}],
  "giornata": [
   ["9:00", "Controlla in Search Console se ci sono cali o errori nuovi"],
   ["10:00", "Sceglie le keyword per un articolo e scrive il brief per il copywriter"],
   ["14:00", "Riscrive title e description di una categoria"],
   ["16:00", "Scrive una richiesta al team web per una pagina lenta"]],
  "faPerTe": "Fa per te se ti piace capire perché le persone cercano una cosa, scrivere in modo chiaro e lavorare con i numeri un po' alla volta.",
  "blog": BLOG_RUOLO},
 "lezioni": [
  {"id": "cos-e-la-seo", "titolo": "Cos'è la SEO e come funziona Google", "minuti": 10,
   "blocchi": [
    blocco("Risultati organici e annunci",
     "Quando cerchi qualcosa su Google vedi due tipi di risultati. Gli annunci, con la scritta «Sponsorizzato», si pagano a ogni clic: sono il lavoro della SEA. I risultati organici sono gratuiti: Google li mette in ordine da solo, secondo quanto ogni pagina risponde bene alla ricerca. La SEO (Search Engine Optimization) è il lavoro per far comparire le pagine di un sito in alto tra i risultati organici. Oggi in alcune ricerche Google mostra anche un riassunto scritto dall'intelligenza artificiale (AI Overviews), che cita alcune pagine come fonti.",
     "Cerchi «tè verde biologico»: in alto due annunci di negozi che pagano, sotto i risultati organici. Cinque Foglie vuole stare tra questi ultimi senza pagare ogni clic.",
     [singola("Quale di questi è un risultato organico?", "Una pagina che compare senza la scritta «Sponsorizzato»", ["Un risultato con la scritta «Sponsorizzato»", "Qualsiasi risultato in prima posizione"], "Gli annunci sono segnati come «Sponsorizzato». La prima posizione può essere anche un annuncio.")],
     BLOG_RUOLO),
    blocco("Come Google trova e ordina le pagine",
     "Google lavora in tre fasi. Scansione: un programma (Googlebot) segue i link e legge le pagine. Indicizzazione: Google salva le pagine che ritiene utili nel suo archivio, l'indice. Posizionamento: quando qualcuno cerca, Google sceglie dall'indice le pagine più utili e le mette in ordine. Una pagina che non viene scansionata o non entra nell'indice non può comparire, anche se è bellissima.",
     "Una nuova scheda prodotto di Cinque Foglie senza nessun link che porti lì rischia di non essere trovata da Googlebot, quindi di non comparire mai.",
     [ordina("Metti in ordine le fasi di Google.", ["Scansione: Googlebot legge la pagina", "Indicizzazione: la pagina entra nell'archivio", "Posizionamento: la pagina compare in una ricerca"], "Prima Google deve leggere la pagina, poi salvarla, solo dopo può mostrarla.")]),
    blocco("Le tre parti del lavoro",
     "La SEO si divide in tre parti. Contenuti: scegliere le ricerche giuste e scrivere pagine che rispondono bene, con title, description e testi chiari. Tecnica: fare in modo che Google possa leggere il sito senza ostacoli, cioè pagine veloci, nessun errore, indirizzi ordinati. Autorità: altri siti affidabili che parlano di noi e mettono un link al nostro sito (backlink).",
     "Un articolo di un blog di cucina che consiglia il matcha di Cinque Foglie con un link è autorità; una scheda veloce da telefono è tecnica; una guida su come preparare il Sencha è contenuto.",
     [abbina("Abbina ogni attività alla parte del lavoro.", [["Scrivere una guida su come preparare il Sencha", "Contenuti"], ["Rendere più veloci le schede prodotto", "Tecnica"], ["Ottenere un link da un blog di cucina", "Autorità"]], "Contenuti = cosa scrivi; tecnica = come Google legge il sito; autorità = cosa dicono gli altri di te.")],
     BLOG_RUOLO),
    blocco("Come si misura",
     "Il lavoro SEO si misura con quattro numeri, che si leggono in Google Search Console. Impressioni: quante volte una pagina compare nei risultati. Clic: quante volte qualcuno ci clicca. CTR: clic diviso impressioni, in percentuale. Posizione media: in che punto della classifica compare. Poi, con Google Analytics, si guarda cosa succede dopo il clic: visite, ordini, ricavi.",
     "La pagina dei tè verdi ha 10.000 impressioni e 100 clic: il CTR è 100 / 10.000 = 1%. Su 100 persone che la vedono, una sola clicca.",
     [singola("Una pagina ha 2.000 impressioni e 60 clic. Qual è il CTR?", "3%", ["0,3%", "30%", "60%"], "60 / 2.000 = 0,03, cioè 3%."),
      vf("Le impressioni contano quante persone hanno visitato la pagina.", False, "Le impressioni contano quante volte la pagina è comparsa nei risultati, anche se nessuno ha cliccato.")])],
   "riepilogo": ["La SEO fa comparire un sito tra i risultati organici, senza pagare ogni clic.", "Google scansiona, indicizza e poi posiziona le pagine.", "Il lavoro ha tre parti (contenuti, tecnica, autorità) e si misura con impressioni, clic, CTR e posizione."],
   "finali": [
    singola("Una pagina non compare mai su Google, nemmeno cercando il suo titolo esatto. Qual è il primo dubbio?", "Che non sia nell'indice di Google", ["Che il CTR sia basso", "Che manchino i backlink"], "Se una pagina non compare per niente, prima si controlla che Google l'abbia scansionata e indicizzata."),
    vf("La SEO e la SEA sono la stessa cosa.", False, "La SEO lavora sui risultati organici, gratuiti; la SEA sugli annunci a pagamento."),
    singola("Dove si leggono impressioni, clic e CTR di un sito?", "Google Search Console", ["Google Analytics", "Il crawler"], "Search Console mostra cosa succede su Google; Analytics cosa succede dopo il clic.")],
   "parole": [["SEO", "Lavoro per far comparire un sito tra i risultati organici di Google."], ["Indice", "L'archivio delle pagine che Google può mostrare."], ["CTR", "Clic diviso impressioni: quante persone cliccano su 100 che vedono il risultato."], ["Backlink", "Un link da un altro sito al nostro."]]},

  {"id": "keyword-e-contenuti", "titolo": "Keyword, intento e contenuti", "minuti": 12,
   "blocchi": [
    blocco("Keyword e volume",
     "Una keyword (parola chiave) è quello che una persona scrive su Google. Il volume è quante volte al mese viene cercata. Una keyword con tanto volume porta più visite possibili, ma di solito ha più concorrenza; una keyword più lunga e precisa ha meno volume ma persone più decise. Per ogni pagina si sceglie una keyword principale e qualche keyword vicina.",
     "«tè verde» ha tante ricerche ma è generico; «sencha biologico» ne ha meno, ma chi lo cerca sa già cosa vuole.",
     [singola("Quale keyword porta persone più decise a comprare?", "sencha biologico in foglie", ["tè", "tè verde"], "Più la ricerca è precisa, più chi la fa sa cosa vuole, anche se il volume è più basso.")]),
    blocco("L'intento di ricerca",
     "Dietro ogni ricerca c'è un intento, cioè cosa vuole davvero la persona. Informativo: vuole capire («come preparare il sencha»). Commerciale: confronta prima di scegliere («miglior tè verde»). Transazionale: vuole comprare («sencha biologico prezzo»). Navigazionale: cerca un sito preciso («cinque foglie»). Google mostra le pagine che corrispondono all'intento: per una ricerca informativa mostra guide, per una transazionale schede prodotto.",
     "Per «come preparare il sencha» una scheda prodotto non sale mai: Google preferisce una guida. Per «sencha biologico prezzo» vale il contrario.",
     [abbina("Abbina ogni ricerca al suo intento.", [["come preparare il sencha", "Informativo"], ["sencha biologico prezzo", "Transazionale"], ["cinque foglie", "Navigazionale"], ["miglior tè verde giapponese", "Commerciale"]], "Chiediti cosa vuole fare la persona subito dopo la ricerca: imparare, confrontare, comprare o andare su un sito preciso.")]),
    blocco("Una pagina per ogni intento",
     "Ogni pagina dovrebbe rispondere a un intento preciso. Se due pagine dello stesso sito puntano alla stessa ricerca, si fanno concorrenza: Google alterna l'una e l'altra e nessuna sale. Si chiama cannibalizzazione. Si risolve dando a ogni pagina un compito diverso e collegandole con un link.",
     "La guida «Sencha: cos'è e come si prepara» spiega; la scheda «Tè verde Sencha biologico» vende. La guida mette un link alla scheda per chi vuole comprare.",
     [vf("Due pagine che puntano alla stessa ricerca aiutano il sito a comparire di più.", False, "Si dividono i clic e Google non sa quale scegliere: di solito nessuna delle due sale.")]),
    blocco("Title, meta description e H1",
     "Il title è il titolo blu nei risultati di Google: deve contenere la keyword, dire cosa trova chi clicca e stare entro circa 580 pixel (60 caratteri). La meta description è il testo grigio sotto: 100-160 caratteri che convincono a cliccare. Non fa salire di posizione, ma aumenta i clic. L'H1 è il titolo grande nella pagina, letto da chi la visita.",
     "Title «Tè verde Sencha biologico in foglie | Cinque Foglie»; description «Sencha giapponese biologico, raccolto in primavera. Come prepararlo e spedizione in 24 ore.»; H1 «Sencha biologico».",
     [singola("Quale title è migliore per la scheda del Sencha?", "Tè verde Sencha biologico in foglie | Cinque Foglie", ["Cinque Foglie | Negozio di tè online", "Sencha sencha tè verde sencha migliore sencha"], "Dice cosa si compra, contiene la keyword una volta e chiude con il brand."),
      singola("A cosa serve la meta description?", "A convincere a cliccare chi vede il risultato", ["A far salire la pagina di posizione", "A dare il titolo alla pagina"], "Google non la usa per la classifica, ma una description chiara aumenta i clic.")],
     BLOG_TITLE),
    blocco("Contenuti utili e affidabili",
     "Google premia i contenuti scritti per le persone: utili, chiari, scritti da chi conosce l'argomento. Nelle sue linee guida usa la sigla E-E-A-T: esperienza, competenza, autorevolezza, affidabilità. Per un negozio di alimenti ci sono anche regole di legge: nell'Unione europea non si possono promettere effetti sulla salute non autorizzati (Regolamento CE 1924/2006), come «brucia i grassi» o «detox».",
     "«Il nostro Sencha si prepara a 70-80 °C, per 1-2 minuti» è utile e vero. «Il Sencha che ti fa dimagrire» è vietato e fa perdere fiducia.",
     [multipla("Quali frasi può usare Cinque Foglie in una scheda prodotto?", ["Raccolto in primavera in Giappone", "Si prepara con acqua a 70-80 °C"], ["Brucia i grassi in una settimana", "Depura l'organismo"], "Le prime due descrivono il prodotto. Le altre sono promesse sulla salute non autorizzate: vietate per un alimento.")])],
   "riepilogo": ["Ogni pagina ha una keyword principale e risponde a un intento preciso.", "Due pagine sulla stessa ricerca si fanno concorrenza: è la cannibalizzazione.", "Title e description fanno cliccare; i contenuti devono essere utili e rispettare le regole."],
   "finali": [
    singola("«come conservare il tè» ha intento…", "Informativo", ["Transazionale", "Navigazionale"], "La persona vuole imparare qualcosa, non comprare subito."),
    vf("Per salire su Google conviene ripetere la keyword molte volte nel title.", False, "Ripeterla sembra spam: Google può riscrivere il title e le persone cliccano meno."),
    singola("La guida e la scheda del Sencha si contendono «tè verde sencha». Cosa fai?", "Do a ogni pagina un intento diverso e le collego con un link", ["Cancello la guida", "Copio lo stesso testo in tutte e due"], "Così la guida risponde a chi si informa e la scheda a chi compra.")],
   "parole": [["Keyword", "Quello che le persone scrivono su Google."], ["Intento di ricerca", "Cosa vuole fare davvero chi cerca."], ["Cannibalizzazione", "Due pagine dello stesso sito che competono per la stessa ricerca."], ["Meta description", "Il testo grigio sotto il titolo nei risultati."]]},

  {"id": "tecnica-e-strumenti", "titolo": "SEO tecnica, strumenti e numeri", "minuti": 12,
   "blocchi": [
    blocco("Far entrare (o uscire) una pagina da Google",
     "Il meta robots «noindex» chiede a Google di non mostrare una pagina: si usa per carrello, area personale, pagine di servizio. Il file robots.txt invece dice a Google quali parti del sito non scansionare. Attenzione: se una pagina è bloccata nel robots.txt, Google non può leggere il suo noindex; per togliere una pagina dai risultati si usa il noindex, non il robots.txt.",
     "Il carrello di Cinque Foglie ha il noindex: va bene. Se il noindex finisse per errore su una categoria, quella categoria sparirebbe da Google.",
     [abbina("Abbina lo strumento a cosa fa.", [["noindex", "Chiede di non mostrare la pagina nei risultati"], ["robots.txt", "Chiede di non scansionare una parte del sito"]], "Il noindex agisce sull'indicizzazione, il robots.txt sulla scansione."),
      vf("Il carrello di un e-commerce dovrebbe comparire su Google.", False, "Nessuno lo cerca e non serve a chi arriva da Google: si mette in noindex.")]),
    blocco("Redirect e pagine 404",
     "Quando una pagina cambia indirizzo o viene tolta, si usa un reindirizzamento. Il 301 è definitivo: Google passa alla pagina nuova il valore della vecchia. Il 302 è temporaneo. Se un indirizzo non esiste più e non c'è un redirect, chi lo apre trova un errore 404. Un redirect va sempre verso la pagina più simile, e senza catene (un redirect che porta a un altro redirect).",
     "L'Earl Grey classico è stato sostituito dal biologico: il vecchio indirizzo va reindirizzato con un 301 alla scheda nuova, non alla home.",
     [singola("Un prodotto è stato tolto per sempre e ce n'è uno che lo sostituisce. Cosa usi?", "Un 301 verso il prodotto che lo sostituisce", ["Un 302 verso la home", "Niente: il 404 va bene"], "Il cambio è definitivo e la pagina più simile è il nuovo prodotto.")]),
    blocco("Contenuti duplicati e canonical",
     "Lo stesso contenuto può avere più indirizzi: per esempio una categoria ordinata per prezzo (/te-verdi/?ordina=prezzo). Per Google sono copie, e deve indovinare quale mostrare. Il canonical è un'indicazione nel codice che dice qual è la versione principale. Così i filtri restano per chi compra e Google mostra la pagina giusta.",
     "/te-verdi/?ordina=prezzo indica come canonical /te-verdi/: su Google compare solo la categoria.",
     [singola("Cosa indica il canonical?", "La versione principale di una pagina che ha delle copie", ["Che la pagina non deve comparire su Google", "Dove reindirizzare chi apre la pagina"], "Il canonical non nasconde e non sposta: dice quale versione considerare quella vera.")]),
    blocco("Velocità: i Core Web Vitals",
     "Google misura l'esperienza delle visite vere con i Core Web Vitals. LCP: quanto ci mette a comparire l'elemento più grande (buono sotto 2,5 secondi). INP: quanto la pagina risponde a un clic (buono sotto 200 millisecondi). CLS: quanto si sposta la pagina mentre carica (buono sotto 0,1). Si guardano separati per telefono e computer.",
     "Le schede di Cinque Foglie da telefono hanno un LCP di 4,1 secondi per una foto troppo pesante: tante persone se ne vanno prima di vedere il prodotto.",
     [abbina("Abbina la misura a cosa controlla.", [["LCP", "Quando compare l'elemento più grande"], ["INP", "Quanto risponde la pagina a un clic"], ["CLS", "Quanto si sposta la pagina mentre carica"]], "LCP = caricamento, INP = reattività, CLS = stabilità."),
      vf("Se una pagina è veloce sul computer, è veloce anche sul telefono.", False, "Telefono e computer si misurano a parte: sul telefono la connessione e il processore sono spesso più lenti.")]),
    blocco("Gli strumenti di ogni giorno",
     "Google Search Console (gratis) mostra come il sito va su Google: clic, impressioni, pagine indicizzate, errori. Google Analytics (gratis) mostra cosa fanno le persone dopo il clic. Un crawler, come Screaming Frog (gratis fino a 500 indirizzi), legge tutto il sito e trova errori, title doppi, redirect. Gli strumenti per le keyword dicono quanto e quando si cerca una parola.",
     "Un lunedì tipo: Search Console per vedere se qualcosa è calato, il crawler per trovare il perché, Analytics per capire quanto costa.",
     [abbina("Quale strumento usi per…", [["Sapere quante pagine sono su Google", "Search Console"], ["Trovare tutti i title duplicati del sito", "Crawler"], ["Sapere quanti ordini arrivano da Google", "Analytics"]], "Search Console guarda Google, il crawler guarda il sito, Analytics guarda le persone dopo il clic.")],
     BLOG_RUOLO)],
   "riepilogo": ["Il noindex toglie una pagina dai risultati; il robots.txt blocca la scansione.", "Un 301 sposta per sempre una pagina; il canonical indica la versione principale tra le copie.", "La velocità si misura con LCP, INP e CLS; gli strumenti base sono Search Console, Analytics e un crawler."],
   "finali": [
    singola("Una categoria è sparita da Google dopo un aggiornamento del sito. Cosa controlli per primo?", "Se ha un noindex", ["Se ha poche immagini", "Se il CTR è basso"], "Se una pagina sparisce del tutto, il primo sospetto è qualcosa che la esclude dall'indice."),
    vf("Un LCP di 4 secondi da telefono è buono.", False, "È oltre i 2,5 secondi: è da migliorare, anzi è al limite di «scarso»."),
    singola("Le versioni filtrate di una categoria compaiono come copie. Cosa usi?", "Il canonical verso la categoria", ["Un 404", "Il noindex sulla categoria"], "Il canonical lascia i filtri a chi compra e dice a Google quale pagina mostrare.")],
   "parole": [["Noindex", "Istruzione che chiede a Google di non mostrare una pagina."], ["Redirect 301", "Spostamento definitivo di una pagina a un altro indirizzo."], ["Canonical", "Indica la versione principale tra più copie di una pagina."], ["Core Web Vitals", "Le misure di Google sulla velocità e stabilità delle pagine."]]}],
 "verifica": [
  singola("Cosa distingue un risultato organico da un annuncio?", "L'annuncio è segnato come «Sponsorizzato» e si paga a ogni clic", ["L'organico è sempre in prima posizione", "Non c'è nessuna differenza"], "Gli annunci si pagano e sono segnati; gli organici sono gratuiti."),
  ordina("Metti in ordine cosa succede prima che una pagina compaia su Google.", ["Googlebot la legge", "Google la salva nell'indice", "Google la mostra in una ricerca"], "Scansione, indicizzazione, posizionamento."),
  singola("Una pagina ha 5.000 impressioni e 50 clic. Qual è il CTR?", "1%", ["10%", "0,1%"], "50 / 5.000 = 0,01, cioè 1%."),
  abbina("Abbina ogni ricerca all'intento.", [["tè verde prezzo", "Transazionale"], ["differenza tra tè verde e nero", "Informativo"]], "Chi chiede il prezzo vuole comprare; chi chiede la differenza vuole capire."),
  vf("La meta description fa salire una pagina di posizione.", False, "Non conta per la classifica, ma fa cliccare di più."),
  multipla("Quali pagine di un e-commerce di solito hanno il noindex?", ["Carrello", "Area personale"], ["Categoria dei prodotti", "Scheda di un prodotto"], "Carrello e area personale non servono a chi arriva da Google; categorie e prodotti sì."),
  singola("Una pagina cambia indirizzo per sempre. Cosa usi?", "Un redirect 301", ["Un redirect 302", "Un canonical"], "Il 301 è lo spostamento definitivo."),
  singola("Quale misura dice quanto ci mette a comparire l'elemento più grande della pagina?", "LCP", ["CLS", "CTR"], "L'LCP misura il caricamento; buono sotto 2,5 secondi.")],
 "prova": {"titolo": "Il Sencha online non si trova", "cosa": "Una richiesta breve di Marta: scegli la keyword, il title e la description della scheda del Sencha.", "link": "/app/seo/esercizio/", "minuti": 25},
 "pratica": {"titolo": "Percorso SEO junior", "cosa": "Lavori sul sito vero di Cinque Foglie con il Pannello e cinque strumenti: dalle basi ai casi difficili.", "link": "/app/percorsi/seo/"}}
json.dump(seo, open("src/data/app/teoria/seo.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
n = sum(len(b["domande"]) for l in seo["lezioni"] for b in l["blocchi"]) + sum(len(l["finali"]) for l in seo["lezioni"]) + len(seo["verifica"])
print("lezioni", len(seo["lezioni"]), "blocchi", sum(len(l["blocchi"]) for l in seo["lezioni"]), "domande", n)
