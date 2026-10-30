# DATI FINTI DELLA SIMULAZIONE SOCIAL (profilo Instagram-like di Cinque Foglie), 30/10/2026
# Tutto inventato ma coerente. Problemi nascosti (le risposte degli esercizi):
#  1. Dal 21/09 i post si programmano "in blocco" e lo strumento li pubblica alle 03:00 (ora predefinita):
#     la copertura crolla (circa -55%) perché a quell'ora i follower dormono. I post pubblicati a mano alle 19 vanno bene.
#  2. I caroselli educativi hanno tanti salvataggi (engagement alto); le foto prodotto vanno male (falso allarme:
#     il post del 2/10 alle 19:00 va male per il formato, non per l'orario).
#  3. Il post del 12/10 usa la foto di una cliente (@giulia.foglie) senza permesso (libreria: "non chiesto").
#  4. Il reel dell'8/10 con la creator @tazzaemiele (kit regalato) non è segnalato come collaborazione.
#  5. Commenti: una critica senza risposta da 4 giorni, dati personali scritti in pubblico, spam, un insulto,
#     tre domande uguali sulle dosi del matcha, una critica sincera da NON nascondere (falso allarme).
# Uso: python3 strumenti-dati/genera_social.py (dalla cartella del progetto)
import json, random, datetime as dt, os
random.seed(30102026)
OUT = "src/data/app/social-sim"; os.makedirs(OUT, exist_ok=True)
D = lambda s: dt.date(2026, int(s[3:5]), int(s[0:2]))

BASE = {"reel": 6200, "carosello": 3700, "foto": 2300}
TASSI = {  # like, salvataggi, condivisioni, commenti (su copertura)
 "reel": (0.028, 0.006, 0.005, 0.002), "carosello": (0.035, 0.025, 0.006, 0.004),
 "foto": (0.030, 0.003, 0.001, 0.003), "prodotto": (0.012, 0.001, 0.0005, 0.0015)}
IMPR = {"reel": 1.25, "carosello": 1.5, "foto": 1.15}
NONFOLL = {"reel": 0.55, "carosello": 0.30, "foto": 0.12}
POST = [
 ("03/09", "18:30", "carosello", "Impara il tè", "5 errori da non fare con il tè verde", "Acqua bollente, infusione troppo lunga, foglie vecchie… Scorri per scoprire i 5 errori più comuni con il tè verde (e come evitarli). Salva il post per la prossima tazza. #teverde #tèverde #comepreparareilte", "Carosello con cinque schede illustrate: una teiera, un termometro, una clessidra, un barattolo di foglie e una tazza di tè verde."),
 ("05/09", "19:00", "reel", "Ricette", "Tè freddo alla pesca in 3 passi", "Il tè freddo alla pesca fatto in casa: tè nero, pesche mature e un po' di pazienza. Ricetta completa nel link in bio. #tefreddo #ricetteestive", "Video di mani che versano tè nero su fette di pesca in una caraffa con ghiaccio."),
 ("07/09", "18:30", "foto", "Prodotto", "Nuovo: Sencha biologico 100 g", "È arrivato il nostro Sencha biologico in latta da 100 g. Lo trovi sul sito.", ""),
 ("10/09", "19:00", "carosello", "Ricette", "Matcha latte: dosi e frusta", "Il matcha latte perfetto: quanto matcha, quanta acqua, che latte. Tutto in 6 schede. #matcha #matchalatte", "Sei schede con dosi del matcha latte e foto di una frusta di bambù."),
 ("12/09", "20:00", "reel", "Dietro le quinte", "Come confezioniamo un ordine", "Dalla scelta del tè al pacco: un ordine di Cinque Foglie in 40 secondi. #dietrolequinte", "Video del magazzino: mani che pesano il tè, chiudono una latta e preparano un pacco di carta."),
 ("14/09", "18:30", "foto", "La community", "La tazza di Anna", "La tazza del lunedì di @anna.legge, con il nostro Earl Grey. Grazie per la foto! 📷 @anna.legge", "Tazza di tè con un libro aperto su un tavolo di legno, foto di una cliente."),
 ("17/09", "19:00", "carosello", "Impara il tè", "Tè verde o tè nero? Le differenze", "Vengono dalla stessa pianta, ma cambia la lavorazione. Le differenze in 5 schede. #teverde #tenero", "Cinque schede che confrontano foglie verdi e foglie scure di tè."),
 ("19/09", "18:30", "reel", "Ricette", "Cold brew: tè in frigo per 8 ore", "Il cold brew è il modo più facile per il tè freddo: acqua fredda, foglie e 8 ore di frigo. #coldbrew #tefreddo", "Video di una bottiglia di vetro con foglie di tè che si colorano lentamente."),
 ("21/09", "03:00", "carosello", "Impara il tè", "Quanta teina c'è in una tazza?", "Tè verde, nero, matcha, tisane: quanta teina c'è davvero? Scorri per scoprirlo. #tè #teina", "Schede con un grafico a barre delle quantità di teina in diversi tè."),
 ("24/09", "03:00", "reel", "Ricette", "Chai fatto in casa", "Cannella, cardamomo, zenzero e tè nero: il nostro chai in un minuto. #chai #ricette", "Video di spezie che cadono in un pentolino con latte e tè nero."),
 ("26/09", "03:00", "foto", "Prodotto", "Tisane della Sera: 3 gusti", "Tre gusti per le Tisane della Sera. Le trovi sul sito.", ""),
 ("28/09", "03:00", "carosello", "Impara il tè", "Come conservare il tè", "Luce, aria, umidità e odori: i 4 nemici del tè. Ecco come conservarlo. #conservareilte", "Schede con barattoli di latta chiusi su uno scaffale lontano dalla finestra."),
 ("01/10", "03:00", "reel", "Dietro le quinte", "Dal campo alla tazza: il Darjeeling", "Il Darjeeling cresce sulle colline dell'India: ve lo raccontiamo con le foto del nostro fornitore. #darjeeling", "Video di colline verdi coltivate a tè e di foglie raccolte in un cesto."),
 ("02/10", "19:00", "foto", "Prodotto", "Teiera in ghisa nera", "La teiera in ghisa nera da 0,8 litri. Disponibile sul sito.", ""),
 ("03/10", "03:00", "carosello", "Ricette", "3 tisane per l'autunno", "Mela e cannella, zenzero e limone, rooibos e vaniglia: tre tisane per le sere d'autunno. #tisane #autunno", "Tre tazze di tisane di colori diversi con mele e bastoncini di cannella."),
 ("05/10", "03:00", "reel", "Impara il tè", "La temperatura dell'acqua conta", "Perché il tè verde con l'acqua bollente diventa amaro? Ve lo spieghiamo in 30 secondi. #teverde", "Video di un termometro in un bollitore che segna 75 gradi."),
 ("08/10", "19:30", "reel", "Collaborazioni", "@tazzaemiele prova il kit matcha", "La nostra amica @tazzaemiele ha provato il kit matcha: guardate com'è andata! 🍵 #matcha", "Video di una ragazza che sbatte il matcha con la frusta di bambù in una ciotola."),
 ("10/10", "03:00", "foto", "Prodotto", "Kit matcha: cosa c'è dentro", "Il kit matcha: matcha biologico, frusta di bambù e ciotola. Sul sito.", ""),
 ("12/10", "19:00", "foto", "La community", "Il matcha latte di Giulia", "Che bello questo matcha latte! 💚", ""),
 ("15/10", "03:00", "carosello", "Impara il tè", "Rooibos: cos'è e come si prepara", "Il rooibos non è un tè: è una pianta del Sudafrica, senza teina. Scorri per sapere come prepararlo. #rooibos", "Schede con foglie rosse di rooibos e una tazza ambrata."),
 ("17/10", "03:00", "reel", "Ricette", "Golden milk con rooibos", "Latte, curcuma, rooibos e un pizzico di pepe: la nostra golden milk. #ricette #rooibos", "Video di latte giallo versato in una tazza di ceramica."),
 ("19/10", "03:00", "carosello", "Dietro le quinte", "Chi siamo: 5 persone e 120 tè", "Siamo in cinque e assaggiamo ogni tè prima di metterlo in vendita. Ecco chi c'è dietro Cinque Foglie. #chisiamo", "Schede con le foto delle cinque persone del team in magazzino."),
 ("22/10", "03:00", "foto", "Prodotto", "Calendario dell'avvento: in arrivo", "Il calendario dell'avvento è quasi pronto. Restate sintonizzati!", ""),
 ("24/10", "03:00", "carosello", "Impara il tè", "Tisane per la sera: come sceglierle", "Camomilla, melissa, tiglio: come scegliere la tisana giusta per la sera, in 5 schede. #tisane", "Schede con tazze di tisana e fiori secchi su un comodino."),
]
post = []
for i, (data, ora, formato, pilastro, titolo, testo, alt) in enumerate(POST, 1):
    tipo = "prodotto" if pilastro == "Prodotto" and formato == "foto" else formato
    base = BASE[formato] * (0.65 if tipo == "prodotto" else 1) * (1.15 if pilastro == "Collaborazioni" else 1)
    ora_f = 0.45 if ora == "03:00" else 1.0
    cop = int(base * ora_f * random.uniform(0.9, 1.1) / 10) * 10
    like, salv, cond, comm = (max(1, round(cop * t * random.uniform(0.85, 1.15))) for t in TASSI[tipo])
    post.append({"id": f"p{i:02d}", "data": D(data).isoformat(), "ora": ora, "formato": formato, "pilastro": pilastro, "titolo": titolo,
                 "didascalia": testo, "alt": alt, "copertura": cop, "impressioni": int(cop * IMPR[formato]), "like": like, "commenti": comm,
                 "salvataggi": salv, "condivisioni": cond, "clic": max(0, round(cop * random.uniform(0.002, 0.006))),
                 "nonFollower": round(NONFOLL[formato] * random.uniform(0.9, 1.1), 2),
                 "collab": False, "programmazione": "in blocco" if ora == "03:00" else "a mano",
                 "foto": {"p06": "u1", "p19": "u2", "p17": "v-tazzaemiele"}.get(f"p{i:02d}")})
# follower: +60 a settimana fino al 21/09, poi +15
follower, f = [], 12400
for w in range(9):
    giorno = dt.date(2026, 8, 31) + dt.timedelta(weeks=w)
    follower.append({"settimana": giorno.isoformat(), "follower": f}); f += 60 if giorno < dt.date(2026, 9, 21) else 15
attivita = [round(v) for v in [8, 4, 2, 1, 1, 2, 6, 14, 22, 26, 30, 38, 52, 58, 44, 36, 38, 48, 66, 82, 88, 74, 46, 22]]  # % follower attivi per ora
profilo = {"_nota": "Profilo social finto di Cinque Foglie (ispirato a Instagram). Dati inventati: vedi strumenti-dati/genera_social.py.",
 "nome": "cinquefoglie.te", "nomeVisibile": "Cinque Foglie · Tè e tisane", "bio": "Tè e tisane biologici, spiegati semplici 🍃 Spedizione in 24/48 ore", "follower": f,
 "pilastri": ["Impara il tè", "Ricette", "Dietro le quinte", "La community", "Prodotto"],
 "andamentoFollower": follower, "attivitaPerOra": attivita,
 "cambio": {"data": "2026-09-21", "cosa": "Da questa data il team programma i post in blocco: lo strumento usa l'ora predefinita 03:00."},
 "programmazione": {"oraPredefinita": "03:00", "nota": "Ora usata per i post programmati in blocco, se non se ne sceglie un'altra."}}

# Post già programmati (prossimi giorni, in blocco alle 03:00) e bozze per novembre
programmati = [
 {"id": "g1", "data": "2026-10-30", "ora": "03:00", "formato": "carosello", "pilastro": "Ricette", "titolo": "Tè e biscotti: 4 abbinamenti", "didascalia": "Shortbread e Earl Grey, cantucci e Darjeeling… 4 abbinamenti da provare. #tè", "alt": "Schede con biscotti e tazze di tè su un vassoio."},
 {"id": "g2", "data": "2026-10-31", "ora": "03:00", "formato": "reel", "pilastro": "Dietro le quinte", "titolo": "Il nostro ottobre in 30 secondi", "didascalia": "Un mese di tè, pacchi e assaggi in 30 secondi. #dietrolequinte", "alt": "Video veloce di momenti in magazzino."},
 {"id": "g3", "data": "2026-11-01", "ora": "03:00", "formato": "carosello", "pilastro": "Impara il tè", "titolo": "Il tè nero con il latte: sì o no?", "didascalia": "Tè nero e latte: quali tè si sposano meglio? Scorri. #tenero", "alt": "Schede con tazze di tè nero e un bricco di latte."},
]
bozze = [
 {"id": "k1", "formato": "reel", "pilastro": "Prodotto", "titolo": "Kit matcha: tutto per iniziare", "didascalia": "", "alt": "", "nota": "Video già girato: mani che preparano il matcha con la frusta di bambù del kit."},
 {"id": "b01", "formato": "reel", "pilastro": "Prodotto", "titolo": "Il calendario dell'avvento è arrivato", "didascalia": "", "alt": "", "nota": "Lancio: in vendita dal 2 novembre.", "lancio": True},
 {"id": "b02", "formato": "carosello", "pilastro": "Prodotto", "titolo": "24 giorni, 24 tè: cosa c'è dentro", "didascalia": "", "alt": "", "nota": "Da pubblicare dopo il lancio."},
 {"id": "b03", "formato": "carosello", "pilastro": "Impara il tè", "titolo": "Tisane per la sera: 3 abbinamenti", "didascalia": "", "alt": "", "nota": ""},
 {"id": "b04", "formato": "reel", "pilastro": "Ricette", "titolo": "Come si prepara il chai", "didascalia": "", "alt": "", "nota": ""},
 {"id": "b05", "formato": "reel", "pilastro": "Dietro le quinte", "titolo": "Dal produttore: la raccolta autunnale", "didascalia": "", "alt": "", "nota": ""},
 {"id": "b06", "formato": "carosello", "pilastro": "La community", "titolo": "Le vostre tazze di ottobre", "didascalia": "", "alt": "", "nota": "Solo foto con il permesso delle persone."},
 {"id": "b07", "formato": "carosello", "pilastro": "Prodotto", "titolo": "Black Friday: -20% su tutto", "didascalia": "", "alt": "", "nota": "Lo sconto vale solo venerdì 27 novembre.", "blackFriday": True},
 {"id": "b08", "formato": "carosello", "pilastro": "Impara il tè", "titolo": "Quanta acqua per il matcha?", "didascalia": "", "alt": "", "nota": "Risponde alla domanda più frequente nei commenti."},
 {"id": "b09", "formato": "carosello", "pilastro": "Prodotto", "titolo": "Idee regalo sotto i 25 €", "didascalia": "", "alt": "", "nota": ""},
 {"id": "b10", "formato": "carosello", "pilastro": "Impara il tè", "titolo": "Come conservare il tè d'inverno", "didascalia": "", "alt": "", "nota": ""},
]
calendario = {"_nota": "Post programmati e bozze. Oggi nella simulazione è il 29/10/2026.", "programmati": programmati, "bozze": bozze,
 "crisi": {"id": "z1", "data": "2026-10-29", "ora": "18:00", "formato": "foto", "pilastro": "Prodotto", "titolo": "Promo lampo: kit matcha -30%", "didascalia": "Solo oggi: kit matcha -30%! Corri sul sito 🔥", "alt": ""}}

commenti = {"_nota": "Commenti e messaggi della settimana. 'crisi': compaiono solo nell'esercizio della crisi.", "voci": [
 {"id": "c01", "tipo": "commento", "autore": "@marta.r_84", "post": "p22", "quando": "25/10, 21:12", "testo": "Ordine arrivato dopo 9 giorni e nessuno risponde alle mail. Davvero delusa.", "categoria": "critica"},
 {"id": "c02", "tipo": "commento", "autore": "@luca_bianchi.pd", "post": "p24", "quando": "28/10, 10:05", "testo": "Il mio ordine 48213 non è ancora arrivato, abito in via Roma 12 a Padova, potete controllare?", "categoria": "dati"},
 {"id": "c03", "tipo": "commento", "autore": "@sofi.green", "post": "p18", "quando": "26/10, 18:40", "testo": "Quanto matcha devo mettere per una tazza?", "categoria": "dosi"},
 {"id": "c04", "tipo": "messaggio", "autore": "@paolo.tea", "post": None, "quando": "27/10, 09:15", "testo": "Ciao! Quanti grammi di matcha per un matcha latte?", "categoria": "dosi"},
 {"id": "c05", "tipo": "commento", "autore": "@ele_and_books", "post": "p17", "quando": "28/10, 22:30", "testo": "Ma quanta acqua ci vuole per il matcha? Il mio è sempre amaro", "categoria": "dosi"},
 {"id": "c06", "tipo": "commento", "autore": "@soldi.facili.ora", "post": "p24", "quando": "28/10, 04:02", "testo": "Guadagna 500€ al giorno da casa!!! Scrivimi in privato 💸💸", "categoria": "spam"},
 {"id": "c07", "tipo": "commento", "autore": "@anonimo_x99", "post": "p23", "quando": "27/10, 23:50", "testo": "Siete dei ladri e degli incapaci.", "categoria": "insulto"},
 {"id": "c08", "tipo": "commento", "autore": "@giorgia.mm", "post": "p21", "quando": "27/10, 12:20", "testo": "Il rooibos dell'ultimo ordine aveva un sapore diverso dal solito, più amaro. Avete cambiato fornitore?", "categoria": "critica-sincera"},
 {"id": "c09", "tipo": "commento", "autore": "@francy_tazze", "post": "p20", "quando": "26/10, 08:10", "testo": "Il Sencha è buonissimo, ormai lo bevo ogni mattina!", "categoria": "complimento"},
 {"id": "c10", "tipo": "messaggio", "autore": "@viaggiconiltè", "post": None, "quando": "28/10, 15:00", "testo": "Ciao, sono una creator di viaggi (32k follower). Vi andrebbe una collaborazione?", "categoria": "collaborazione"},
 {"id": "c11", "tipo": "commento", "autore": "@nonna.rita", "post": "p02", "quando": "24/10, 17:00", "testo": "Si può fare il tè freddo anche con le tisane?", "categoria": "domanda"},
 {"id": "c12", "tipo": "commento", "autore": "@kiara.home", "post": "p24", "quando": "29/10, 07:30", "testo": "Spedite anche in Svizzera?", "categoria": "domanda"},
 {"id": "x01", "tipo": "commento", "autore": "@ale.matcha", "post": "p24", "quando": "29/10, 10:02", "testo": "Kit matcha arrivato con la frusta rotta 😞", "categoria": "crisi", "crisi": True},
 {"id": "x02", "tipo": "commento", "autore": "@robi_tea", "post": "p24", "quando": "29/10, 10:20", "testo": "Anche a me, frusta spezzata in due. Che peccato, era un regalo.", "categoria": "crisi", "crisi": True},
 {"id": "x03", "tipo": "commento", "autore": "@cami.g", "post": "p24", "quando": "29/10, 10:41", "testo": "Ma li controllate i pacchi prima di spedirli??", "categoria": "crisi", "crisi": True},
 {"id": "x04", "tipo": "commento", "autore": "@tazzaemiele", "post": "p24", "quando": "29/10, 11:05", "testo": "Ragazzi è successo anche a me, ne parlo nelle storie. Spero sistemiate 🙏", "categoria": "crisi", "crisi": True},
 {"id": "x05", "tipo": "commento", "autore": "@paola.verdi", "post": "p24", "quando": "29/10, 11:30", "testo": "Mai più da voi.", "categoria": "crisi", "crisi": True},
]}
libreria = {"_nota": "Foto, video e musica che il team può usare, con permessi e licenze.", "voci": [
 {"id": "f1", "tipo": "foto", "titolo": "Latte di tè in magazzino", "fonte": "Foto del team", "permesso": "proprio", "nota": "Scattata da Cinque Foglie."},
 {"id": "f2", "tipo": "foto", "titolo": "Kit matcha su fondo chiaro", "fonte": "Foto del team", "permesso": "proprio", "nota": "Scattata da Cinque Foglie."},
 {"id": "u1", "tipo": "foto", "titolo": "La tazza di Anna (con libro)", "fonte": "@anna.legge", "permesso": "concesso", "nota": "Permesso chiesto e dato in privato il 13/09. Da citare."},
 {"id": "u2", "tipo": "foto", "titolo": "Matcha latte di Giulia", "fonte": "@giulia.foglie", "permesso": "non chiesto", "nota": "Presa dal suo profilo il 11/10. Usata nel post del 12/10."},
 {"id": "s1", "tipo": "foto", "titolo": "Tazza fumante su sfondo autunnale", "fonte": "Archivio di foto con licenza", "permesso": "licenza commerciale", "nota": "Licenza acquistata: uso commerciale consentito."},
 {"id": "s2", "tipo": "foto", "titolo": "Teiere vintage", "fonte": "Trovata su una bacheca di ispirazione", "permesso": "sconosciuto", "nota": "Non si sa chi l'ha scattata."},
 {"id": "m1", "tipo": "musica", "titolo": "Chitarra acustica tranquilla", "fonte": "Libreria musicale della piattaforma", "permesso": "uso commerciale", "nota": "Nella sezione per i profili aziendali."},
 {"id": "m2", "tipo": "musica", "titolo": "Canzone famosa del momento", "fonte": "Classifica musicale", "permesso": "non per profili aziendali", "nota": "Non disponibile per l'uso commerciale."},
 {"id": "v-tazzaemiele", "tipo": "video", "titolo": "Reel di @tazzaemiele con il kit matcha", "fonte": "@tazzaemiele", "permesso": "concesso", "nota": "Kit matcha regalato in cambio del video (accordo via email del 1/10)."},
]}
for nome, dati in [("profilo", profilo), ("post", {"_nota": "Post pubblicati dal 1/09 al 25/10/2026, con le statistiche.", "post": post}), ("calendario", calendario), ("commenti", commenti), ("libreria", libreria)]:
    json.dump(dati, open(f"{OUT}/{nome}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# Controlli di coerenza (stampati per il diario)
media = lambda xs: round(sum(xs) / len(xs)) if xs else 0
prima = [p["copertura"] for p in post if p["ora"] != "03:00"]; notte = [p["copertura"] for p in post if p["ora"] == "03:00"]
print("copertura media: ore serali", media(prima), "| ore 03:00", media(notte))
for fm in ("reel", "carosello", "foto"):
    ps = [p for p in post if p["formato"] == fm]
    er = [round((p["like"] + p["commenti"] + p["salvataggi"] + p["condivisioni"]) / p["copertura"] * 100, 1) for p in ps]
    print(fm, "copertura media", media([p["copertura"] for p in ps]), "| ER medio", round(sum(er) / len(er), 1), "| salvataggi medi", media([p["salvataggi"] for p in ps]))
for p in post: print(p["id"], p["data"], p["ora"], p["formato"], p["pilastro"][:10], p["copertura"], round((p["like"] + p["commenti"] + p["salvataggi"] + p["condivisioni"]) / p["copertura"] * 100, 1))
print("follower", f)
