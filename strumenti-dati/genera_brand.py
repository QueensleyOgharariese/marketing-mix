# DATI DELLA SIMULAZIONE BRAND (30/10/2026)
# Manuale del brand, ricerche sul brand, testi da sistemare, piano di brand e ufficio stampa di Cinque Foglie.
# Tutto inventato (persone, testate, numeri) ma coerente tra gli strumenti:
# - Il NPS scende da 52 a 31 a ottobre: i detrattori parlano di spedizioni in ritardo (la home promette 24 ore,
#   la media di ottobre è 4,1 giorni) e di plastica nel pacco.
# - Falso allarme: le ricerche del nome calano da settembre a ottobre, ma succede ogni anno e rispetto al 2025 crescono.
# - Il packaging dice "100% sostenibile, spedizioni a impatto zero": affermazioni generiche vietate
#   (direttiva UE 2024/825, in vigore dal 27/09/2026); i fatti veri sono nella scheda dell'ufficio qualità.
# - Ufficio stampa: lista giornalisti con chi è pertinente e chi ha chiesto di non essere contattato.
# Esegui: python3 strumenti-dati/genera_brand.py
import json, os
OUT = "src/data/app/brand-sim"
os.makedirs(OUT, exist_ok=True)
def salva(nome, d): json.dump(d, open(f"{OUT}/{nome}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

salva("manuale", {
 "_nota": "Manuale del brand di Cinque Foglie (inventato).",
 "missione": "Far scoprire il tè buono a chi non è un esperto, spiegando tutto in modo semplice.",
 "valori": [
  {"nome": "Chiarezza", "cosa": "Spieghiamo cosa c'è nella tazza e come prepararlo, senza parole da esperti."},
  {"nome": "Rispetto per chi coltiva", "cosa": "Compriamo da piccoli produttori biologici e diciamo chi sono."},
  {"nome": "Curiosità", "cosa": "Facciamo venire voglia di provare un tè nuovo, senza giudicare chi beve solo camomilla."}],
 "tono": {
  "siamo": ["Amichevoli ma competenti", "Semplici: frasi corte, parole di tutti i giorni", "Calmi: niente urla, niente fretta finta"],
  "nonSiamo": ["Freddi o burocratici", "Snob o da esperti", "Aggressivi nelle vendite"],
  "regole": ["Diamo del tu, sempre.", "Niente maiuscole per gridare e niente «!!!».", "Una cosa alla volta: prima il beneficio concreto, poi i dettagli.", "Le emoji vanno bene solo sui social, al massimo una per testo.", "Nessuna promessa sulla salute: tè e tisane sono alimenti."],
  "esempi": [{"prima": "Gentile cliente, la informiamo che il prodotto è disponibile.", "dopo": "Buone notizie: il tuo tè preferito è tornato."},
             {"prima": "SUPER OFFERTA!!! COMPRA ORA!!!", "dopo": "Questa settimana il Sencha costa il 15% in meno."}]},
 "logo": "Cinque foglie stilizzate in cerchio. Su fondo chiaro va in verde scuro, su fondo scuro in bianco. Non si deforma e non si cambia colore.",
 "colori": [{"nome": "Verde foglia", "hex": "#1F5C38"}, {"nome": "Crema", "hex": "#F4F1EA"}, {"nome": "Inchiostro", "hex": "#24211E"}]
})

mesi = ["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12",
        "2026-01","2026-02","2026-03","2026-04","2026-05","2026-06","2026-07","2026-08","2026-09","2026-10"]
ricerche = [1450,1380,1300,1250,1520,1900,2150,2050,1700,1430,1820,2400, 1800,1720,1650,1560,1890,2380,2700,2560,2120,1740]
salva("indagini", {
 "_nota": "Ricerche sul brand di Cinque Foglie (inventate).",
 "segmenti": {"fonte": "Sondaggio a 612 clienti, settembre 2026", "voci": [
  {"nome": "Curiosi del tè di ogni giorno", "eta": "25-40 anni", "quota": 0.46, "cosa": "Bevono tè ogni giorno, vogliono capire cosa comprano e provare cose nuove senza spendere troppo."},
  {"nome": "Chi fa un regalo", "eta": "30-55 anni", "quota": 0.22, "cosa": "Comprano soprattutto a Natale e per i compleanni, cercano confezioni belle."},
  {"nome": "Esperti appassionati", "eta": "35-60 anni", "quota": 0.18, "cosa": "Conoscono le origini e le annate, cercano tè rari."},
  {"nome": "Benessere", "eta": "20-35 anni", "quota": 0.14, "cosa": "Scelgono tisane e matcha per la routine della giornata."}]},
 "concorrenti": [
  {"nome": "Grande catena del tè", "prezzo": "basso", "scelta": "molto ampia", "spiegazioni": "poche, linguaggio da catalogo", "biologico": "in parte"},
  {"nome": "Boutique del tè pregiato", "prezzo": "alto", "scelta": "media", "spiegazioni": "approfondite ma per esperti", "biologico": "sì"},
  {"nome": "Marketplace generalista", "prezzo": "da basso a medio", "scelta": "enorme", "spiegazioni": "nessuna", "biologico": "misto"},
  {"nome": "Cinque Foglie", "prezzo": "medio", "scelta": "120 tè e tisane", "spiegazioni": "guide semplici per ogni tè", "biologico": "sì, tutto certificato"}],
 "nps": [
  {"mese": "2026-07", "promotori": 0.58, "passivi": 0.33, "detrattori": 0.09, "risposte": 210},
  {"mese": "2026-08", "promotori": 0.61, "passivi": 0.31, "detrattori": 0.08, "risposte": 188},
  {"mese": "2026-09", "promotori": 0.60, "passivi": 0.32, "detrattori": 0.08, "risposte": 230},
  {"mese": "2026-10", "promotori": 0.45, "passivi": 0.41, "detrattori": 0.14, "risposte": 251}],
 "motiviDetrattori": {"mese": "2026-10", "voci": [
  {"motivo": "Spedizione in ritardo rispetto alla promessa", "quota": 0.48, "esempio": "Sul sito c'è scritto 24 ore, è arrivato dopo 5 giorni."},
  {"motivo": "Troppa plastica nel pacco", "quota": 0.22, "esempio": "Sulla scatola dite sostenibile, ma dentro c'era il pluriball."},
  {"motivo": "Prezzo", "quota": 0.14, "esempio": "Buono ma un po' caro."},
  {"motivo": "Gusto", "quota": 0.09, "esempio": "Il rooibos era diverso dal solito."},
  {"motivo": "Altro", "quota": 0.07, "esempio": ""}]},
 "spedizioni": {"promessaSito": "24 ore", "mediaGiorni": {"2026-09": 1.8, "2026-10": 4.1}, "nota": "Da ottobre il magazzino ha cambiato corriere: le consegne medie sono passate da 1,8 a 4,1 giorni lavorativi."},
 "ricercheNome": [{"mese": m, "ricerche": r} for m, r in zip(mesi, ricerche)],
 "notorieta": {"fonte": "Sondaggio a 1.000 persone che bevono tè almeno una volta a settimana", "rilevazioni": [
  {"quando": "marzo 2026", "spontanea": 0.04, "guidata": 0.16}, {"quando": "settembre 2026", "spontanea": 0.04, "guidata": 0.21}],
  "definizioni": {"spontanea": "Senza suggerimenti: «Quali negozi di tè conosci?»", "guidata": "Con un elenco: «Tra questi, quali conosci?»"}},
 "schedaPackaging": {"fonte": "Ufficio qualità, ottobre 2026", "fatti": [
  "Latta in alluminio: riciclabile nella raccolta dei metalli.",
  "Busta interna in carta compostabile certificata secondo la norma EN 13432.",
  "Scatola di spedizione in cartone riciclato all'80%.",
  "Riempitivo: da ottobre pluriball in plastica (il fornitore di carta riempitiva ha finito le scorte). Dal 15 novembre si torna alla carta.",
  "Spedizioni: le emissioni sono compensate con un progetto di riforestazione (compensazione, non riduzione).",
  "Tutti i tè sono biologici certificati secondo il regolamento UE 2018/848, con il codice dell'organismo di controllo sull'etichetta."]}
})

salva("testi", {"_nota": "Testi del brand da controllare (inventati).", "voci": [
 {"id": "t1", "canale": "Sito · frase in alto nella home", "testo": "Tè e tisane biologici, a casa tua in 24 ore."},
 {"id": "t2", "canale": "Email · oggetto e prima riga della promozione", "testo": "OFFERTA IMPERDIBILE!!! SOLO OGGI -15% SU TUTTO, COMPRA SUBITO PRIMA CHE FINISCA!!!"},
 {"id": "t3", "canale": "Social · bio del profilo", "testo": "Tè e tisane biologici, spiegati semplici 🍃 Spedizione in tutta Italia"},
 {"id": "t4", "canale": "Assistenza · risposta standard a chi chiede dov'è l'ordine", "testo": "Gentile cliente, la Sua richiesta è stata presa in carico e verrà evasa secondo le tempistiche previste. Distinti saluti, Servizio Clienti."},
 {"id": "t5", "canale": "Packaging · frase sul retro della scatola", "testo": "Confezione 100% sostenibile. Spedizioni a impatto zero."},
 {"id": "t6", "canale": "Sito · descrizione del Sencha", "testo": "Il tè verde di ogni giorno: fresco, erbaceo, leggermente amaro. Ti basta acqua a 75 °C e due minuti."}]})

salva("stampa", {"_nota": "Ufficio stampa di Cinque Foglie: giornalisti e testate inventati.",
 "giornalisti": [
  {"id": "g1", "nome": "Marta Ferri", "testata": "Il Mestolo (blog di cucina)", "tema": "Ricette, prodotti alimentari", "nota": ""},
  {"id": "g2", "nome": "Paolo Neri", "testata": "Foglie & Tazze (rivista sul tè)", "tema": "Tè, tisane, produttori", "nota": ""},
  {"id": "g3", "nome": "Chiara Lodi", "testata": "Cronache Scaligere (quotidiano locale, pagina economia)", "tema": "Imprese di Verona", "nota": ""},
  {"id": "g4", "nome": "Sara Conti", "testata": "Idee regalo della settimana (newsletter)", "tema": "Regali, Natale", "nota": ""},
  {"id": "g5", "nome": "Luca Riva", "testata": "Sport e Motori Oggi", "tema": "Calcio, automobili", "nota": ""},
  {"id": "g6", "nome": "Elisa Fontana", "testata": "Vivere Bio (mensile)", "tema": "Biologico, alimentazione", "nota": "A marzo 2026 ha chiesto di non ricevere più comunicati stampa da noi."},
  {"id": "g7", "nome": "Andrea Gallo", "testata": "Cronache Scaligere (cronaca nera)", "tema": "Cronaca", "nota": ""},
  {"id": "g8", "nome": "Giulia Marchi", "testata": "Pausa tè (podcast)", "tema": "Tè, piccoli produttori", "nota": ""}],
 "fattiCalendario": ["24 tè e tisane biologici, uno per ogni giorno dal 1 al 24 dicembre.", "Arrivano da 8 piccoli produttori di 6 Paesi.", "Illustrazioni di un'artista veronese, stampate su cartone riciclato.", "Prezzo: 34,90 €. In vendita online dal 2 novembre 2026, fino a esaurimento delle 3.000 copie.", "Citazione disponibile: Marco F., fondatore: «Volevamo un calendario che facesse scoprire un tè nuovo ogni giorno, con una guida semplice dietro ogni finestrella.»", "Contatti stampa: Sara L., stampa@cinquefoglie.example, 045 000 0000 (numero inventato)."],
 "richieste": [
  {"id": "r1", "da": "Paolo Neri", "testata": "Foglie & Tazze", "quando": "29/10, 11:40", "oggetto": "Kit matcha arrivati rotti",
   "testo": "Buongiorno, sto scrivendo un pezzo sui kit matcha arrivati con la frusta rotta di cui si parla sui social. Mi conferma che il problema riguarda tutti i kit venduti? Avete intenzione di ritirarli dal mercato? Mi servirebbe una risposta entro le 17. Grazie, Paolo Neri"}],
 "notaInterna": ["Circa 40 kit spediti il 28/10 sono arrivati con la frusta di bambù rotta: si è spezzata durante il trasporto (stesso lotto di imballaggi).", "Gli altri kit venduti non hanno avuto problemi.", "A tutti i clienti coinvolti spediamo una frusta nuova gratis; li stiamo contattando uno per uno.", "Dal 3 novembre le fruste viaggiano in un astuccio rigido.", "Portavoce per la stampa: Elena M., responsabile e-commerce (telefono 045 000 0000, inventato)."]})
print("ok", sorted(os.listdir(OUT)))
for x in [("2026-09", .60, .08), ("2026-10", .45, .14)]: print("NPS", x[0], round((x[1]-x[2])*100))
print("ricerche set->ott 2025", round((1430/1700-1)*100), "2026", round((1740/2120-1)*100), "ott su ott", round((1740/1430-1)*100))
