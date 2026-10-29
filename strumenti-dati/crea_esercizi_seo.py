# Script usato il 29/10/2026 per creare src/data/app/seo-pro/missioni.json con la struttura a livelli,
# partendo dalle 5 missioni lunghe di prima (copia salvata a parte). Tenuto come traccia per il case study:
# da ora il file JSON si modifica direttamente.
import json, copy
V=json.load(open('/tmp/claude-0/-home-claude/87e0aec5-25c3-5029-9e8a-34784127f512/scratchpad/missioni-vecchie.json',encoding='utf-8'))
O={m['id']:m for m in V['missioni']}
def old(mid,i): return copy.deepcopy(O[mid]['passi'][i])
L='<a href="{}">{}</a>'; B='/app/percorsi/seo/strumenti/'; PAN='/app/percorsi/seo/pannello/'
def ok(t): return {"id":"o%d"%ok.n, "testo":t, "giusta":True, "nota":""}
def no(t,n): return {"id":"o%d"%no.n, "testo":t, "giusta":False, "nota":n}
def opz(*xs):
  r=[]
  for i,(g,t,n) in enumerate(xs): r.append({"id":f"o{i+1}","testo":t,"giusta":g,"nota":n})
  return r

ES=[]
# ---------------- LIVELLO 0 · TUTORIAL ----------------
t=O['tutorial']
tut=copy.deepcopy(t)
s0=tut['passi'][0]; s4=tut['passi'][4]
s0['come'][3]="Le barre laterali si chiudono con la X e si riaprono con l'icona sul bordo. <strong>Schermo intero</strong> in alto lascia solo lo strumento."
ispeziona={"strumento":"negozio","pagina":"/app/negozio/accessori/","tipo":"radio","domanda":"Apri Ispeziona nel negozio",
 "spiega":"Il negozio è il sito vero di Cinque Foglie. In alto c'è una barra come quella di un browser: il bottone Ispeziona mostra i dati della pagina che legge Google e che un cliente non vede.",
 "esempio":"È come guardare l'etichetta sul retro di un prodotto: davanti c'è la confezione, dietro le informazioni tecniche.",
 "compito":"","come":["Sei nella pagina <strong>Accessori</strong> del negozio.","Premi il bottone scuro <strong>Ispeziona</strong>, in alto a destra accanto all'indirizzo.","Guarda cosa compare nel riquadro.","Scegli la risposta e premi <strong>Controlla</strong>."],
 "opzioni":opz((False,"Il carrello con i prodotti scelti","Il carrello è il bottone verde nell'intestazione del negozio. Ispeziona è quello scuro accanto all'indirizzo."),(True,"I dati che legge Google: stato, title, description, H1…",""),(False,"Le recensioni dei clienti","Le recensioni sono nelle schede dei prodotti. Premi Ispeziona e guarda le righe del riquadro.")),
 "perche":"Ispeziona ti servirà in quasi tutti gli esercizi: dopo ogni correzione lo apri per vedere se la pagina è cambiata.",
 "aiuto":"Il bottone Ispeziona è scuro, nella stessa riga dell'indirizzo https://cinquefoglie.example/accessori/.","dove":".ispeziona summary"}
salva={"strumento":"pannello","tipo":"azione","verifica":"tutorialAccessori","domanda":"Salva la tua prima modifica",
 "spiega":"Il Pannello del negozio è il gestionale del sito: in un'azienda vera può essere WordPress o Shopify. Quello che salvi qui va subito online e lo vedono il negozio e tutti gli strumenti. Dopo ogni modifica premi Controlla il lavoro: la guida ti dice cosa va e cosa no.",
 "esempio":"Nel gestionale di un blog di viaggi cambi il titolo di un articolo, premi Salva e il titolo nuovo è già sul sito.",
 "compito":"","come":[f"Apri {L.format(PAN+'?pagina=/accessori/','/accessori/ nel Pannello del negozio')}.",
   "Nel campo <strong>H1 (il titolo grande nella pagina)</strong> scrivi <strong>Teiere, tazze e accessori per il tè</strong>.",
   "Premi <strong>Salva le modifiche</strong>.","Premi <strong>Controlla il lavoro</strong> qui nella guida.",
   f"Se vuoi, apri {L.format('/app/negozio/accessori/','/accessori/ nel negozio')}: il titolo grande è cambiato."],
 "vai":{"link":PAN+"?pagina=/accessori/","testo":"Apri /accessori/ nel Pannello"},"opzioni":[],
 "perche":"Hai cambiato il sito e l'hai controllato: negli esercizi si lavora sempre così. Se sbagli, nel Pannello c'è Torna all'originale.",
 "aiuto":"Il campo H1 è il terzo del modulo, sotto Title e Meta description. Premi Salva le modifiche prima di Controlla il lavoro.","dove":"[data-editor] input[name=h1]"}
s4['domanda']="Punti, livelli e come scegliere"
s4['spiega']="Ultime regole, poi si parte dal livello Basi."
s4['come']=["Gli esercizi sono divisi in tre livelli: <strong>Basi</strong>, <strong>Diagnosi</strong> e <strong>Casi</strong>. Dentro un livello scegli tu l'ordine.",
  "Il livello dopo si apre quando hai finito tutti gli esercizi di quello prima.",
  "Ogni esercizio parte da <strong>100 punti</strong>: una risposta sbagliata toglie 10 punti, aprire l'<strong>Aiuto</strong> ne toglie 5. Quando scrivi o modifichi il sito puoi riprovare senza perdere punti.",
  "Per ripartire da zero: Pannello del negozio → Tema e impostazioni → <strong>Ripristina il negozio</strong>."]
tut.update({"livello":0,"n":0,"nome":"Tutorial: come funziona","tempo":"8 minuti","strumenti":"Negozio, Pannello",
 "cosa":"Dove sono le cose e come si salva e si controlla una modifica.",
 "situazione":"Ciao, benvenuta in Cinque Foglie! Prima di iniziare ti faccio vedere dove sono le cose: dieci minuti e sei operativa.",
 "obiettivo":"Impara a muoverti nella scrivania e a salvare e controllare una modifica.",
 "passi":[s0,ispeziona,salva,s4],
 "imparato":["La guida a destra ti segue in ogni pagina.","Ispeziona mostra i dati della pagina che legge Google.","Nel Pannello salvi una modifica, poi premi Controlla il lavoro."],
 "elena":"Perfetto, ora sai usare la scrivania. Comincia dalle Basi: esercizi brevi, uno strumento alla volta."})
ES.append(tut)

# ---------------- LIVELLO 1 · BASI ----------------
def es(id,liv,n,nome,tempo,strum,cosa,situ,obiettivo,passi,imparato,elena):
  return {"id":id,"livello":liv,"n":n,"nome":nome,"tempo":tempo,"strumenti":strum,"cosa":cosa,"situazione":situ,"obiettivo":obiettivo,"passi":passi,"imparato":imparato,"elena":elena}

b1=es("b1",1,1,"Title e H1: qual è la differenza","5 minuti","Negozio",
 "Due titoli per ogni pagina: uno per Google, uno per chi legge.",
 "Il copywriter mi chiede che differenza c'è tra title e H1. Me lo spieghi con la pagina dei tè neri?",
 "Trova title e H1 della pagina Tè neri e capisci dove compare ciascuno.",
 [{"strumento":"negozio","pagina":"/app/negozio/te-neri/","tipo":"radio","domanda":"Qual è il title della pagina Tè neri?",
   "spiega":"Ogni pagina ha due titoli. Il title è scritto nel codice: è il titolo blu nei risultati di Google e il nome della scheda del browser. L'H1 è il titolo grande che si legge nella pagina. Possono essere diversi: il title spesso è più lungo e finisce con il nome del negozio.",
   "esempio":"In un negozio di scarpe l'H1 può essere «Sneakers» e il title «Sneakers uomo e donna | NomeNegozio».",
   "compito":"","come":["Sei nella pagina <strong>Tè neri</strong> del negozio.","Premi <strong>Ispeziona</strong> e leggi la riga <strong>Title</strong>.","Scegli la risposta e premi <strong>Controlla</strong>."],
   "opzioni":opz((False,"Tè neri","Questo è l'H1: il titolo grande scritto nella pagina. Il title è un'altra riga di Ispeziona."),(True,"Tè neri biologici in foglie e bustine | Cinque Foglie",""),(False,"Cinque Foglie | Negozio di tè online","Questo è il title di alcune schede prodotto, non della categoria. Leggi Ispeziona in questa pagina.")),
   "perche":"Il title della categoria dice cosa c'è (tè neri biologici, in foglie e bustine) e chiude con il brand. L'H1 «Tè neri» è più corto perché chi è già nella pagina sa dove si trova.",
   "aiuto":"In Ispeziona le righe sono: Stato, Title, Description, Robots, Canonical, H1. Ti serve la seconda.","dove":".ispeziona summary"},
  {"strumento":"negozio","pagina":"/app/negozio/te-neri/","tipo":"radio","domanda":"Dove compare il title?",
   "spiega":"Il title non si vede nel corpo della pagina. Lo vedono Google, che lo usa come titolo del risultato, e il browser, che lo scrive nella scheda in alto.",
   "esempio":"Se apri dieci schede nel browser, i nomi che leggi in alto sono i title delle pagine.",
   "compito":"","come":["Guarda la pagina Tè neri: il titolo grande che leggi è l'H1.","Pensa a dove hai visto invece il title.","Scegli la risposta e premi <strong>Controlla</strong>."],
   "opzioni":opz((False,"Nel titolo grande in cima alla pagina","Quello è l'H1. Il title non si vede nel corpo della pagina."),(True,"Nel titolo blu dei risultati di Google e nella scheda del browser",""),(False,"Solo nel Pannello del negozio","Nel Pannello lo scrivi, ma chi lo vede? Pensa ai risultati di una ricerca.")),
   "perche":"Per questo il title conta tanto nella SEO: è la prima cosa che una persona legge su Google e decide se cliccare.",
   "aiuto":"Il titolo grande nella pagina è l'H1. Il title si vede fuori dalla pagina.","dove":""}],
 ["Il title è il titolo blu su Google e il nome della scheda del browser.","L'H1 è il titolo grande nella pagina.","Si leggono entrambi con Ispeziona."],
 "Chiarissimo, lo giro al copywriter. Grazie!")
b2=es("b2",1,2,"Aggiungi l'H1 mancante","6 minuti","Crawler, Pannello",
 "Trova una pagina senza H1 con il crawler e correggila.",
 "Mi dicono che una categoria non ha il titolo principale nel codice. Riesci a trovarla e sistemarla?",
 "Trova con il crawler la categoria senza H1 e aggiungilo nel Pannello.",
 [copy.deepcopy(O['tutorial']['passi'][2]), copy.deepcopy(O['tutorial']['passi'][3])],
 ["Il filtro H1 mancante del crawler trova le pagine senza titolo principale.","Un titolo che sembra grande non è per forza un H1 nel codice.","L'H1 si aggiunge nel Pannello."],
 "Visto, la pagina Matcha ora ha il suo titolo. Ottimo.")
b2['passi'][0]['come'][0]=f"Apri il {L.format(B+'crawler/','Crawler')}."
b2['passi'][0]['domanda']="Quale categoria non ha l'H1?"
b2['passi'][0]['perche']="La categoria Matcha ha un titolo grande che sembra un H1, ma nel codice è un paragrafo: Google non lo considera il titolo della pagina."
b2['passi'][1]['domanda']="Aggiungi l'H1 alla pagina Matcha"
b2['passi'][1]['verifica']="h1Matcha"
b2['passi'][1]['come']=[f"Apri {L.format(PAN+'?pagina=/matcha/','/matcha/ nel Pannello del negozio')}.","Nel campo <strong>H1</strong> scrivi un titolo breve con la parola matcha, per esempio <strong>Tè matcha</strong>.","Premi <strong>Salva le modifiche</strong>, poi <strong>Controlla il lavoro</strong>.",f"Apri {L.format('/app/negozio/matcha/','/matcha/ nel negozio')} e premi Ispeziona: ora l'H1 c'è."]
b2['passi'][1]['perche']="Ora Google sa qual è il titolo della pagina, e nel crawler la pagina non compare più tra quelle senza H1."
b2['passi'][1]['spiega']="L'H1 è il titolo principale della pagina nel codice: dice a Google e a chi usa uno screen reader di cosa parla la pagina. Deve essercene uno, breve e con la parola chiave."
b2['passi'][1]['esempio']="In un sito di ricette la pagina dei dolci ha come H1 «Ricette di dolci», non «Benvenuti»."
b2['passi'][0]['spiega']="Il crawler visita tutte le pagine del sito seguendo i link, come fa Google, e raccoglie i problemi. A sinistra i filtri li raggruppano per tipo: cliccandone uno vedi solo le pagine con quel problema."

b3=es("b3",1,3,"Un title uguale per tanti prodotti","8 minuti","Crawler, Pannello",
 "Scrivi il title di una scheda prodotto che ora è generico.",
 "Su Google i nostri tè neri compaiono tutti con lo stesso titolo, «Cinque Foglie | Negozio di tè online». Così nessuno capisce cosa vendiamo.",
 "Trova i title duplicati e riscrivi quello della scheda Assam.",
 [{"strumento":"crawler","tipo":"radio","domanda":"Quale title si ripete su tante schede prodotto?",
   "spiega":"Se tante pagine hanno lo stesso title, Google non capisce in cosa sono diverse e le persone nei risultati non sanno quale aprire. Ogni pagina deve avere un title suo. Fanno eccezione le versioni filtrate di una categoria (es. /te-verdi/?ordina=prezzo): lì il title uguale è normale e si risolve con il canonical.",
   "esempio":"Un'agenzia di viaggi con 30 pagine intitolate tutte «Viaggi | Agenzia» invece di «Viaggio in Giappone di 10 giorni | Agenzia».",
   "compito":"","come":[f"Apri il {L.format(B+'crawler/','Crawler')}.","A sinistra, nel gruppo <strong>Da sistemare</strong>, clicca <strong>Title duplicati</strong>.","Scorri la tabella verso destra fino alla colonna <strong>Title</strong> (oppure clicca una riga e leggi il Title nei dettagli). Quale testo si ripete su schede prodotto diverse, cioè indirizzi senza ?","Scegli la risposta e premi <strong>Controlla</strong>."],
   "opzioni":opz((True,"Cinque Foglie | Negozio di tè online",""),(False,"Tè verdi | Cinque Foglie","Si ripete solo tra /te-verdi/ e le sue versioni filtrate (con ? nell'indirizzo): è normale, si risolve con il canonical."),(False,"Tè neri biologici in foglie e bustine | Cinque Foglie","È il title della categoria Tè neri, ripetuto solo nelle sue versioni filtrate. Cerca un title uguale su prodotti diversi.")),
   "perche":"Le schede dei tè neri e due accessori hanno il title generico del negozio: probabilmente il modello di quelle pagine non usa il nome del prodotto. È un problema vero, perché sono pagine diverse.",
   "aiuto":"Guarda le righe di /te-neri/assam/ e /te-neri/darjeeling/: che title hanno?","dove":"[data-filtro=\"title-dup\"]"},
  {"strumento":"pannello","tipo":"azione","verifica":"titoloAssam","domanda":"Scrivi il title della scheda Assam",
   "spiega":"Il title di una scheda prodotto dice cosa si compra: il nome del prodotto, cosa lo rende diverso (biologico, in foglie, il formato) e alla fine il brand. Deve stare entro circa 580 pixel, altrimenti Google lo taglia.",
   "esempio":"Per una crema solare: «Crema solare SPF 50 per bambini, 100 ml | NomeNegozio».",
   "compito":"","come":[f"Apri {L.format(PAN+'?pagina=/te-neri/assam/','/te-neri/assam/ nel Pannello')}.","Nel campo <strong>Title</strong> scrivi un title che contenga <strong>Assam</strong>, dica che è un tè nero e finisca con <strong>| Cinque Foglie</strong>. Guarda il contatore dei pixel.","Premi <strong>Salva le modifiche</strong>, poi <strong>Controlla il lavoro</strong>."],
   "vai":{"link":PAN+"?pagina=/te-neri/assam/","testo":"Apri l'Assam nel Pannello"},"opzioni":[],
   "perche":"Esempio di un collega senior: «Tè nero Assam biologico in foglie | Cinque Foglie». Il tuo può essere diverso: conta che rispetti le stesse regole.",
   "aiuto":"Parti dal nome del prodotto, aggiungi «tè nero» e una caratteristica (biologico, in foglie), chiudi con «| Cinque Foglie».","dove":"[data-editor] input[name=title]"}],
 ["Ogni pagina deve avere un title diverso.","Il title di un prodotto contiene il nome del prodotto e chiude con il brand.","Il title deve stare entro circa 580 pixel."],
 "Molto meglio! Chiedo al team web di usare lo stesso schema per tutti i tè neri.")
b4=es("b4",1,4,"Scrivi una meta description","8 minuti","Crawler, Pannello",
 "Il testo grigio sotto il titolo su Google: scegli dove serve e scrivilo.",
 "Il crawler dice che 16 pagine non hanno la description. Le sistemiamo tutte?",
 "Capisci quali pagine hanno bisogno della description e scrivi quella del Darjeeling.",
 [{"strumento":"crawler","tipo":"radio","domanda":"Quale pagina non serve sistemare?",
   "spiega":"La meta description è il testo grigio sotto il titolo nei risultati di Google. Serve solo alle pagine che compaiono su Google. Le pagine in noindex, come il carrello, non compaiono: lì non serve.",
   "esempio":"Un ristorante scrive la description del menu e della pagina prenotazioni, non della pagina di accesso riservata allo staff.",
   "compito":"","come":[f"Apri il {L.format(B+'crawler/','Crawler')} e clicca il filtro <strong>Description mancante</strong>.","Clicca una riga per vedere i dettagli: guarda <strong>Indicizzabile</strong>.","Scegli la pagina che non compare su Google e premi <strong>Controlla</strong>."],
   "opzioni":opz((False,"/te-neri/darjeeling/","È una scheda prodotto e compare su Google: la description serve."),(True,"/carrello/",""),(False,"/te-neri/assam/","È una scheda prodotto: compare su Google e la description serve.")),
   "perche":"Il carrello è in noindex: non compare su Google, quindi nessuno vedrà la sua description. Il tempo va speso sui prodotti.",
   "aiuto":"Nei dettagli del carrello la riga Indicizzabile dice no.","dove":"[data-filtro=\"desc-manca\"]"},
  {"strumento":"pannello","tipo":"azione","verifica":"descDarjeeling","domanda":"Scrivi la description del Darjeeling",
   "spiega":"Una buona description ha tra 100 e 160 caratteri, dice cosa si trova nella pagina e dà un motivo per cliccare (spedizione, formato, provenienza). Non deve promettere effetti sulla salute: per un alimento non si può.",
   "esempio":"Per un olio: «Olio extravergine pugliese da olive coratine, in bottiglia da 750 ml. Spedizione in 24 ore e reso gratuito».",
   "compito":"","come":[f"Apri {L.format(PAN+'?pagina=/te-neri/darjeeling/','/te-neri/darjeeling/ nel Pannello')}.","Nel campo <strong>Meta description</strong> scrivi tra 100 e 160 caratteri: nomina il Darjeeling e un vantaggio concreto.","Guarda l'<strong>Anteprima nei risultati di Google</strong>, poi premi <strong>Salva le modifiche</strong> e <strong>Controlla il lavoro</strong>."],
   "vai":{"link":PAN+"?pagina=/te-neri/darjeeling/","testo":"Apri il Darjeeling nel Pannello"},"opzioni":[],
   "perche":"Esempio di un collega senior: «Darjeeling biologico dalle colline dell'India, tè nero delicato in foglie intere. Spedizione gratuita da 39 € in 24-48 ore.»",
   "aiuto":"Scrivi due frasi: cosa è (tè nero Darjeeling, in foglie) e un vantaggio (spedizione, biologico). Il contatore ti dice quanti caratteri hai.","dove":"[data-editor] textarea[name=description]"}],
 ["La description è il testo grigio sotto il titolo su Google.","Serve solo alle pagine che compaiono su Google.","100-160 caratteri, cosa c'è nella pagina e un motivo per cliccare."],
 "Perfetto, così ci concentriamo sui prodotti. Il resto delle schede lo scrive il copywriter.")
r404=old('m1',2)
r404['come']=[f"Apri {L.format(PAN+'#redirect','Pannello del negozio → Reindirizzamenti')}.","In <strong>Da</strong> scrivi l'indirizzo della pagina 404, in <strong>A</strong> l'indirizzo del prodotto che la sostituisce.","Premi <strong>Salva il 301</strong>, poi <strong>Controlla il lavoro</strong>.",f"Prova: apri {L.format('/app/negozio/te-neri/earl-grey-classico/','il vecchio indirizzo nel negozio')} e guarda dove arrivi."]
b5=es("b5",1,5,"Un link rotto: il redirect 301","8 minuti","Crawler, Pannello",
 "Un prodotto non esiste più: manda chi lo cerca al prodotto nuovo.",
 "Un cliente mi scrive che il link all'Earl Grey nella newsletter dà errore. Puoi controllare?",
 "Trova la pagina 404 e crea un reindirizzamento 301 verso il prodotto che la sostituisce.",
 [{"strumento":"crawler","tipo":"radio","domanda":"Quale prodotto sostituisce la pagina 404?",
   "spiega":"Una pagina 404 non esiste più: chi la apre trova un errore, e Google la toglie dai risultati. Se il prodotto è stato sostituito, si crea un reindirizzamento 301: chi apre l'indirizzo vecchio arriva al nuovo.",
   "esempio":"Una libreria toglie dal catalogo la vecchia edizione di un libro e manda chi la cerca alla nuova edizione.",
   "compito":"","come":[f"Apri il {L.format(B+'crawler/','Crawler')} e clicca il filtro <strong>Pagine 404</strong> (gruppo Errori).","Clicca la riga che compare e leggi i <strong>Dettagli dell'indirizzo</strong>: la nota dice quale prodotto lo sostituisce.","Scegli la risposta e premi <strong>Controlla</strong>."],
   "opzioni":opz((False,"/te-neri/english-breakfast/","È un altro tè nero, ma non il sostituto. Leggi la nota nei dettagli della pagina 404."),(True,"/te-neri/earl-grey-bio/",""),(False,"La home page","Mandare tutto alla home confonde chi cercava un prodotto preciso: Google lo tratta quasi come un 404.")),
   "perche":"L'Earl Grey biologico ha preso il posto del classico: è la pagina più vicina a quello che cercava chi apre il vecchio indirizzo.",
   "aiuto":"Il filtro Pagine 404 è nel gruppo Errori, in alto a sinistra.","dove":"[data-filtro=\"4xx\"]"},
  r404],
 ["Una pagina 404 non esiste più.","Il 301 manda chi apre l'indirizzo vecchio a quello nuovo.","Il redirect va verso la pagina più simile, non verso la home."],
 "Provato: il link della newsletter ora porta all'Earl Grey biologico. Grazie!")
ES+= [b1,b2,b3,b4,b5]

# ---------------- LIVELLO 2 · DIAGNOSI ----------------
conv=old('m1',4)
d1=es("d1",2,1,"Le tisane sparite da Google","15 minuti","Indicizzazione, Pannello",
 "Leggi il rapporto di indicizzazione, trova la causa e correggila.",
 "Le tisane non si trovano più su Google, eppure sul sito ci sono. Cosa è successo?",
 "Trova da quando mancano le pagine, rimettile visibili e chiedi a Google di ricontrollarle.",
 [old('m1',0), old('m1',1), conv],
 ["Il grafico dell'indicizzazione mostra quando si perdono pagine.","Un noindex messo per errore dal tema nasconde intere categorie.","Dopo la correzione si chiede a Google di convalidarla."],
 "Ho visto: le tisane sono di nuovo visibili. Bel lavoro!")
d2=es("d2",2,2,"La pagina dei tè verdi che nessuno clicca","20 minuti","Console, Pannello",
 "Trova perché una pagina è poco cliccata e riscrivila.",
 "La pagina dei tè verdi compare spesso su Google ma ci arrivano pochissime persone. Puoi migliorarla?",
 "Trova cosa non va nei dati, riscrivi title, description e testo e chiedi a Google di rileggerla.",
 [old('m3',0), old('m3',1), old('m3',2), old('m3',3)],
 O['m3']['imparato'],"Bellissimo, il nuovo title è già online. Tra qualche settimana guardiamo se il CTR sale.")
cat0={"strumento":"crawler","tipo":"radio","domanda":"Quale indirizzo fa due salti?",
 "spiega":"Un reindirizzamento manda da un indirizzo a un altro. Se l'indirizzo di arrivo rimanda a sua volta altrove, si forma una catena: ogni salto rallenta la pagina e Google può smettere di seguirla.",
 "esempio":"Un pacco spedito al vecchio indirizzo, rispedito a quello dell'anno scorso e solo dopo a quello giusto.",
 "compito":"","come":[f"Apri il {L.format(B+'crawler/','Crawler')} e clicca il filtro <strong>Redirect 3xx</strong> (gruppo Da controllare).","Clicca una riga alla volta e leggi nei <strong>Dettagli dell'indirizzo</strong> la riga <strong>Catena di redirect</strong>: dice dove porta e quanti salti fa.","Trova l'indirizzo che fa più di un salto, scegli e premi <strong>Controlla</strong>."],
 "opzioni":opz((True,"/prodotto.php?id=12",""),(False,"/negozio/tisane/","Porta direttamente a /tisane/, che è una pagina vera: un salto solo, va bene."),(False,"/te-verdi/sencha/","Porta direttamente a /te-verdi/sencha-bio/: un salto solo. Però è l'anello in mezzo di una catena: chi ci arriva prima?")),
 "perche":"/prodotto.php?id=12 porta a /te-verdi/sencha/, che porta a /te-verdi/sencha-bio/: due salti invece di uno.",
 "aiuto":"Nei dettagli la Catena di redirect finisce con il numero di salti tra parentesi: cerca quella con 2.","dove":"[data-filtro=\"3xx\"]"}
d3=es("d3",2,3,"La catena di reindirizzamenti","10 minuti","Crawler, Pannello",
 "Trova un redirect che fa due salti e accorcialo.",
 "Il team web dice che un vecchio indirizzo del sito fa un giro lungo prima di arrivare. Ci guardi?",
 "Trova la catena nel crawler e falla arrivare con un solo salto.",
 [cat0, old('m1',3)],
 ["Una catena è un redirect che porta a un altro redirect.","Si accorcia facendo puntare il primo indirizzo alla pagina finale.","I redirect intermedi restano, per chi usa ancora quegli indirizzi."],
 "Perfetto, ora il vecchio indirizzo arriva al Sencha in un salto.")
d4=es("d4",2,4,"Due pagine per la stessa ricerca","12 minuti","Console",
 "Riconosci una cannibalizzazione e decidi come risolverla.",
 "Per «tè verde sencha» a volte esce la scheda, a volte la guida del blog, e nessuna delle due sale. Strano, no?",
 "Trova quali pagine si contendono la ricerca e scegli come dare a ognuna un compito diverso.",
 [old('m2',1), old('m2',2)],
 ["Una cannibalizzazione è quando due pagine del sito competono per la stessa ricerca.","Si risolve dando a ogni pagina un intento diverso: una vende, l'altra spiega."],
 "Perfetto. Il copywriter sistema la guida sul Sencha e mette un link alla scheda.")
ES+=[d1,d2,d3,d4]

# ---------------- LIVELLO 3 · CASI ----------------
c1=es("c1",3,1,"Il piano dei contenuti","30 minuti","Keyword, Statistiche",
 "Decidi quali articoli scrivere nei prossimi mesi, e quando.",
 "Il copywriter ha tempo per un articolo a settimana. Su cosa lo facciamo lavorare fino a Natale?",
 "Usa stagionalità, intento e dati di vendita per scegliere cosa pubblicare e quando.",
 [old('m4',0), old('m4',1), old('m4',2), old('m2',3), old('m4',3)],
 O['m4']['imparato']+["trovare ricerche dove il sito non compare ancora"],
 "Ottimo piano: l'articolo sui regali parte la prossima settimana.")
c2=es("c2",3,2,"Il calo di ottobre","30 minuti","Tutti gli strumenti",
 "Metti insieme tutto: cosa è successo, cosa è normale, quanto costa.",
 "Ottobre va male: i clic da Google sono scesi rispetto a settembre, e di solito in autunno saliamo. A fine settimana mi spieghi cosa è successo?",
 "Separa il calo normale da quello vero, calcola quanto costa e scrivi il riepilogo per Elena.",
 [old('m5',0), old('m5',1), old('m5',2), old('m5',3)],
 O['m5']['imparato'],O['m5']['elena'])
ES+=[c1,c2]

for e in ES:
  for p in e['passi']:
    p.setdefault('come',[]); p.setdefault('dove','')
    for k in ('compito',): p.setdefault(k,'')
d={"_nota":"Percorso SEO junior, struttura a livelli: 0 Tutorial, 1 Basi (un concetto, uno strumento, un'azione), 2 Diagnosi (trovi il problema e lo correggi), 3 Casi (più strumenti e priorità). Un livello si apre quando è finito quello prima; dentro il livello l'ordine è libero. Ogni esercizio: situazione (Elena), obiettivo, passi con 'come' (istruzioni numerate), 'spiega' ed 'esempio' (teoria), scelta o azione controllata da verifiche.ts, 'perche' (spiegazione o soluzione di un collega senior). Le risposte sono coerenti con i dati di genera_negozio.py.","livelli":[
 {"n":0,"nome":"Tutorial","cosa":"Come funziona la scrivania."},
 {"n":1,"nome":"Basi","cosa":"Un concetto, uno strumento, un'azione. 5-8 minuti ciascuno."},
 {"n":2,"nome":"Diagnosi","cosa":"Trovi un problema nei dati e lo correggi nel sito. 10-20 minuti."},
 {"n":3,"nome":"Casi","cosa":"Problemi aperti: più strumenti, priorità da decidere. 30 minuti."}],
 "missioni":ES}
json.dump(d,open('/home/claude/marketing-mix/src/data/app/seo-pro/missioni.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
for e in ES: print(e['livello'],e['id'],e['nome'],len(e['passi']),[p.get('verifica') or p['tipo'] for p in e['passi']])
