# DATI DELLA SIMULAZIONE SEA (30/10/2026)
# Un account pubblicitario finto di Cinque Foglie, ispirato agli strumenti per gli annunci sui motori di ricerca
# (nomi generici, nessun marchio reale). Periodo dei numeri: 1-28 ottobre 2026. Tutto inventato ma coerente:
# - Tè verdi spende tanto e vende poco: "tè verde" in corrispondenza generica attira ricerche informative
#   (benefici, ricetta, gratis, dimagrire, lavoro) e il gruppo Sencha manda alla home (frequenza di rimbalzo alta).
#   Falso allarme: "gyokuro" ha pochi clic ma rende molto.
# - Tisane: il gruppo "Tisane della sera" usa un annuncio copiato dai tè verdi -> punteggio di qualità 3.
# - Kit e regali rende molto ma perde quasi metà delle impressioni per budget (utile per il Black Friday).
# - La campagna "Kit matcha" è una bozza vuota: si costruisce nelle Basi.
# Margine lordo medio 40% -> ROAS di pareggio 2,5.
# Esegui: python3 strumenti-dati/genera_sea.py
import json, os
OUT = "src/data/app/sea-sim"

def kw(id, testo, corr, qs, impr, clic, cpc, conv, valore, comp=None, stato="attiva"):
    return {"id": id, "testo": testo, "corrispondenza": corr, "qs": qs, "componenti": comp or {"ctr": "nella media", "pertinenza": "nella media", "pagina": "nella media"},
            "impressioni": impr, "clic": clic, "costo": round(clic * cpc, 2), "conversioni": conv, "valore": valore, "stato": stato}

SOPRA, MEDIA, SOTTO = "sopra la media", "nella media", "sotto la media"
campagne = [
 {"id": "brand", "nome": "Brand · Cinque Foglie", "stato": "attiva", "budget": 10, "quotaPersaBudget": 0.02, "tipo": "Rete di ricerca",
  "gruppi": [{"id": "g-brand", "nome": "Nome del negozio",
    "keyword": [kw("k-b1", "cinque foglie", "esatta", 10, 2400, 610, 0.19, 31, 1540, {"ctr": SOPRA, "pertinenza": SOPRA, "pagina": SOPRA}),
                kw("k-b2", "cinque foglie tè", "frase", 9, 900, 220, 0.24, 15, 760, {"ctr": SOPRA, "pertinenza": SOPRA, "pagina": MEDIA})],
    "annunci": [{"id": "a-brand", "titoli": ["Cinque Foglie | Sito ufficiale", "Tè e tisane biologici", "Spedizione in 24/48 ore", "Oltre 120 tè in foglie", "Resi facili in 14 giorni"],
                 "descrizioni": ["Tè e tisane biologici scelti da piccoli produttori. Spedizione gratuita da 39 €.", "Scopri tè verdi, neri, matcha e tisane. Guide semplici per prepararli."], "url": "/"}]}]},
 {"id": "teverdi", "nome": "Tè verdi", "stato": "attiva", "budget": 40, "quotaPersaBudget": 0.05, "tipo": "Rete di ricerca",
  "gruppi": [
   {"id": "g-verde", "nome": "Tè verde generico",
    "keyword": [kw("k-v1", "tè verde", "generica", 5, 21000, 840, 0.60, 6, 190, {"ctr": SOTTO, "pertinenza": MEDIA, "pagina": MEDIA}),
                kw("k-v2", "tè verde biologico", "frase", 7, 4100, 260, 0.70, 12, 380)],
    "annunci": [{"id": "a-verde", "titoli": ["Tè verde biologico in foglie", "Sencha, Gyokuro e Genmaicha", "Spedizione in 24/48 ore", "Da piccoli produttori", "Guida alla scelta"],
                 "descrizioni": ["Tè verdi biologici dal Giappone e dalla Cina, in foglie intere. Scopri la selezione.", "Spedizione gratuita da 39 €. Resi facili in 14 giorni."], "url": "/te-verdi/"}]},
   {"id": "g-sencha", "nome": "Sencha",
    "keyword": [kw("k-s1", "sencha biologico", "frase", 6, 2600, 190, 0.70, 3, 95, {"ctr": MEDIA, "pertinenza": SOPRA, "pagina": SOTTO}),
                kw("k-s2", "tè sencha", "frase", 6, 1500, 105, 0.65, 2, 64, {"ctr": MEDIA, "pertinenza": SOPRA, "pagina": SOTTO})],
    "annunci": [{"id": "a-sencha", "titoli": ["Tè Sencha biologico", "Sencha in foglie intere", "Dal Giappone, 100 g", "Spedizione in 24/48 ore", "Il tè verde di ogni giorno"],
                 "descrizioni": ["Sencha biologico fresco ed erbaceo, in latta da 100 g. Ordina ora.", "Spedizione gratuita da 39 €. Resi facili in 14 giorni."], "url": "/"}]},
   {"id": "g-gyokuro", "nome": "Gyokuro",
    "keyword": [kw("k-g1", "gyokuro", "esatta", 8, 700, 18, 0.90, 3, 98, {"ctr": SOPRA, "pertinenza": SOPRA, "pagina": MEDIA})],
    "annunci": [{"id": "a-gyokuro", "titoli": ["Gyokuro giapponese", "Tè verde cresciuto all'ombra", "Gusto dolce e morbido", "Spedizione in 24/48 ore", "Da piccoli produttori"],
                 "descrizioni": ["Il Gyokuro: tè verde pregiato coltivato all'ombra. Scopri come prepararlo.", "Spedizione gratuita da 39 €."], "url": "/te-verdi/gyokuro/"}]}]},
 {"id": "tisane", "nome": "Tisane", "stato": "attiva", "budget": 20, "quotaPersaBudget": 0.10, "tipo": "Rete di ricerca",
  "gruppi": [
   {"id": "g-sera", "nome": "Tisane della sera",
    "keyword": [kw("k-t1", "tisane della sera", "frase", 3, 3200, 70, 0.95, 3, 62, {"ctr": SOTTO, "pertinenza": SOTTO, "pagina": MEDIA}),
                kw("k-t2", "tisana rilassante", "frase", 4, 5400, 120, 0.85, 4, 85, {"ctr": SOTTO, "pertinenza": SOTTO, "pagina": MEDIA})],
    "annunci": [{"id": "a-sera", "titoli": ["Tè verde biologico in foglie", "Sencha, Gyokuro e Genmaicha", "Spedizione in 24/48 ore", "Da piccoli produttori", "Guida alla scelta"],
                 "descrizioni": ["Tè verdi biologici dal Giappone e dalla Cina, in foglie intere. Scopri la selezione.", "Spedizione gratuita da 39 €. Resi facili in 14 giorni."], "url": "/tisane/"}]},
   {"id": "g-tisanebio", "nome": "Tisane biologiche",
    "keyword": [kw("k-t3", "tisane biologiche", "frase", 7, 4800, 290, 0.45, 15, 330, {"ctr": MEDIA, "pertinenza": SOPRA, "pagina": MEDIA})],
    "annunci": [{"id": "a-tisanebio", "titoli": ["Tisane biologiche", "Camomilla, menta e rooibos", "Senza aromi artificiali", "Spedizione in 24/48 ore", "Da 5,50 € a confezione"],
                 "descrizioni": ["Tisane biologiche per ogni momento della giornata. Scopri la selezione.", "Spedizione gratuita da 39 €. Resi facili in 14 giorni."], "url": "/tisane/"}]}]},
 {"id": "regali", "nome": "Kit e idee regalo", "stato": "attiva", "budget": 25, "quotaPersaBudget": 0.38, "tipo": "Rete di ricerca",
  "gruppi": [
   {"id": "g-regali", "nome": "Idee regalo",
    "keyword": [kw("k-r1", "idee regalo tè", "frase", 8, 3900, 230, 0.55, 14, 640, {"ctr": SOPRA, "pertinenza": SOPRA, "pagina": MEDIA}),
                kw("k-r2", "kit tè regalo", "frase", 8, 2100, 150, 0.60, 9, 410, {"ctr": SOPRA, "pertinenza": SOPRA, "pagina": MEDIA}),
                kw("k-r3", "cofanetto tè", "esatta", 7, 1300, 80, 0.62, 4, 180)],
    "annunci": [{"id": "a-regali", "titoli": ["Idee regalo per chi ama il tè", "Kit e cofanetti di tè", "Teiere e tazze fatte a mano", "Spedizione in 24/48 ore", "Biglietto regalo incluso"],
                 "descrizioni": ["Kit matcha, teiere in ghisa e cofanetti di tè biologici: il regalo giusto.", "Spedizione gratuita da 39 €. Resi facili in 14 giorni."], "url": "/accessori/"}]},
   {"id": "g-bf", "nome": "Black Friday", "bozza": True, "keyword": [],
    "annunci": [{"id": "a-bf", "titoli": [], "descrizioni": [], "url": "", "fine": ""}]}]},
 {"id": "kit", "nome": "Kit matcha", "stato": "bozza", "budget": 0, "quotaPersaBudget": 0, "tipo": "Rete di ricerca",
  "gruppi": [{"id": "g-kit", "nome": "Kit matcha", "keyword": [], "annunci": [{"id": "a-kit", "titoli": [], "descrizioni": [], "url": ""}]}]},
]

# Termini di ricerca (cosa hanno scritto davvero le persone) per le keyword della campagna Tè verdi
def termine(t, k, c, clic, cpc, conv, valore):
    return {"termine": t, "keyword": k, "campagna": c, "impressioni": clic * 25, "clic": clic, "costo": round(clic * cpc, 2), "conversioni": conv, "valore": valore}
termini = [
 termine("tè verde benefici", "tè verde", "teverdi", 170, 0.60, 0, 0),
 termine("tè verde fa dimagrire", "tè verde", "teverdi", 140, 0.60, 0, 0),
 termine("ricetta tè verde freddo", "tè verde", "teverdi", 120, 0.60, 0, 0),
 termine("campioni tè verde gratis", "tè verde", "teverdi", 95, 0.60, 0, 0),
 termine("lavoro raccolta tè verde", "tè verde", "teverdi", 40, 0.60, 0, 0),
 termine("tè verde biologico in foglie", "tè verde", "teverdi", 80, 0.60, 3, 95),
 termine("comprare tè verde online", "tè verde", "teverdi", 90, 0.60, 2, 64),
 termine("tè verde sencha", "tè verde", "teverdi", 65, 0.60, 1, 31),
 termine("tè verde", "tè verde", "teverdi", 0, 0.60, 0, 0),
 termine("tè verde biologico", "tè verde biologico", "teverdi", 160, 0.70, 8, 250),
 termine("tè verde biologico prezzo", "tè verde biologico", "teverdi", 100, 0.70, 4, 130),
 termine("sencha biologico", "sencha biologico", "teverdi", 190, 0.70, 3, 95),
 termine("tè sencha", "tè sencha", "teverdi", 105, 0.65, 2, 64),
 termine("gyokuro", "gyokuro", "teverdi", 18, 0.90, 3, 98),
 termine("tisane della sera", "tisane della sera", "tisane", 70, 0.95, 3, 62),
 termine("tisana rilassante", "tisana rilassante", "tisane", 120, 0.85, 4, 85),
 termine("tisane biologiche", "tisane biologiche", "tisane", 290, 0.45, 15, 330),
]
# il termine "tè verde" esatto prende i clic che mancano per arrivare a 840
resto = 840 - sum(t["clic"] for t in termini if t["keyword"] == "tè verde")
for t in termini:
    if t["termine"] == "tè verde": t.update({"clic": resto, "impressioni": resto * 25, "costo": round(resto * 0.60, 2)})

# Pianificatore delle keyword (ricerche al mese in Italia, inventate)
idee = [
 ("kit matcha", 1900, 0.45, 0.90, "media", "acquisto"), ("kit matcha con frusta", 480, 0.40, 0.80, "bassa", "acquisto"),
 ("set matcha", 720, 0.40, 0.85, "media", "acquisto"), ("frusta matcha", 1300, 0.30, 0.70, "media", "acquisto"),
 ("comprare matcha", 590, 0.50, 1.10, "alta", "acquisto"), ("matcha", 49500, 0.70, 1.60, "alta", "misto"),
 ("matcha benefici", 8100, 0.20, 0.50, "bassa", "informativo"), ("come si prepara il matcha", 5400, 0.15, 0.40, "bassa", "informativo"),
 ("matcha latte ricetta", 6600, 0.15, 0.35, "bassa", "informativo"), ("matcha cos'è", 2900, 0.10, 0.30, "bassa", "informativo"),
 ("kit matcha regalo", 390, 0.45, 0.95, "media", "acquisto"), ("ciotola matcha", 880, 0.30, 0.70, "media", "acquisto"),
]
pianificatore = [{"testo": t, "volume": v, "cpcBasso": a, "cpcAlto": b, "concorrenza": c, "intento": i} for t, v, a, b, c, i in idee]

# Cosa succede sul sito dopo il clic (dalle statistiche del negozio), per gruppo di annunci
def r(c, g, pag, sess, rimb, ordini, ricavi): return {"campagna": c, "gruppo": g, "pagina": pag, "sessioni": sess, "rimbalzo": rimb, "ordini": ordini, "ricavi": ricavi}
rendimento = [
 r("brand", "g-brand", "/", 790, 0.22, 46, 2300), r("teverdi", "g-verde", "/te-verdi/", 1050, 0.58, 18, 570),
 r("teverdi", "g-sencha", "/", 285, 0.78, 5, 159), r("teverdi", "g-gyokuro", "/te-verdi/gyokuro/", 17, 0.29, 3, 98),
 r("tisane", "g-sera", "/tisane/", 182, 0.47, 7, 147), r("tisane", "g-tisanebio", "/tisane/", 280, 0.38, 15, 330),
 r("regali", "g-regali", "/accessori/", 445, 0.35, 27, 1230),
]

conto = {"_nota": "Account pubblicitario finto di Cinque Foglie (ispirato agli strumenti per gli annunci sui motori di ricerca). Periodo 1-28 ottobre 2026. Dati inventati: vedi strumenti-dati/genera_sea.py.",
 "periodo": "1-28 ottobre 2026", "margine": 0.40, "budgetMensileKit": 450, "campagne": campagne}
os.makedirs(OUT, exist_ok=True)
for nome, d in [("account", conto), ("termini", {"termini": termini}), ("pianificatore", {"idee": pianificatore}), ("rendimento", {"righe": rendimento})]:
    json.dump(d, open(f"{OUT}/{nome}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
# Riepilogo per controllare i numeri
for c in campagne:
    ks = [k for g in c["gruppi"] for k in g["keyword"]]
    costo = sum(k["costo"] for k in ks); valore = sum(k["valore"] for k in ks); clic = sum(k["clic"] for k in ks); impr = sum(k["impressioni"] for k in ks); conv = sum(k["conversioni"] for k in ks)
    if ks: print(f'{c["nome"]:20} impr {impr:6} clic {clic:4} CTR {clic/impr*100:4.1f}% costo {costo:7.2f} conv {conv:3} CPA {costo/max(conv,1):6.2f} valore {valore:5} ROAS {valore/costo:4.2f}')
print("clic termini tè verde:", sum(t["clic"] for t in termini if t["keyword"] == "tè verde"), "resto", resto)
