# GENERATORE DEI DATI DEL PERCORSO SEO "APPROFONDISCI"
# Crea i dati del negozio finto Cinque Foglie e di tutti gli strumenti SEO simulati.
# I dati sono INVENTATI ma coerenti tra loro: un problema tecnico nel crawler ha un effetto
# in Search Console e in Analytics, come su un sito vero.
#
# Uso: python3 strumenti-dati/genera_negozio.py   (scrive in src/data/app/seo-pro/)
# Il generatore usa un "seme" fisso: rilanciato, produce sempre gli stessi numeri.
#
# PROBLEMI NASCOSTI NEL SITO (sono le risposte delle missioni):
#  1. /tisane/ ha un meta robots "noindex" messo per errore il 18/09/2026 (aggiornamento del tema)
#     → la categoria e i suoi prodotti escono da Google proprio all'inizio della stagione delle tisane.
#  2. I filtri delle categorie (?ordina=, ?colore=) creano pagine duplicate senza canonical.
#  3. Il prodotto /te-neri/earl-grey-classico/ è stato tolto: 404, ma 6 pagine lo linkano ancora.
#  4. Catena di redirect dal vecchio sito: /prodotto.php?id=12 → /te-verdi/sencha/ → /te-verdi/sencha-bio/.
#  5. 8 prodotti hanno il title di default del tema, tutti uguali.
#  6. /matcha/ non ha l'H1.
#  7. Le pagine prodotto da telefono hanno LCP lento (foto da 2,4 MB).
#  8. "tè verde sencha": la scheda prodotto e una guida del blog si contendono la stessa ricerca (cannibalizzazione).
#  9. /te-verdi/ ha tante impressioni ma CTR bassissimo (title e description deboli).
# Trappole (NON sono problemi): carrello e account in noindex, kit tè freddo esaurito solo per la stagione,
# pagine dei tag del blog "scansionate ma non indicizzate" (poco importanti).
import json, math, os, random

random.seed(26102026)
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data", "app", "seo-pro")
os.makedirs(OUT, exist_ok=True)
DOM = "cinquefoglie.example"

def salva(nome, dati):
    with open(os.path.join(OUT, nome), "w", encoding="utf-8") as f:
        json.dump(dati, f, ensure_ascii=False, indent=1)

# ---------------------------------------------------------------- CATALOGO
CATEGORIE = [
    {"id": "te-verdi", "nome": "Tè verdi", "h1": "Tè verdi", "title": "Tè verdi | Cinque Foglie", "description": "Tè verdi.",
     "intro": "Scopri i nostri tè verdi."},
    {"id": "te-neri", "nome": "Tè neri", "h1": "Tè neri", "title": "Tè neri biologici in foglie e bustine | Cinque Foglie",
     "description": "Earl Grey, Assam, Darjeeling e chai speziato, biologici e in foglie intere. Spedizione in 24 ore e reso facile.",
     "intro": "Dal classico Earl Grey al chai speziato: tè neri biologici per la colazione e il pomeriggio."},
    {"id": "tisane", "nome": "Tisane", "h1": "Tisane biologiche", "title": "Tisane biologiche senza teina | Cinque Foglie",
     "description": "Camomilla, rooibos, menta e le nostre Tisane della Sera: tisane bio senza teina, in bustine compostabili. Spedizione in 24 ore.",
     "intro": "Tisane senza teina per ogni momento della giornata, anche la sera."},
    {"id": "matcha", "nome": "Matcha", "h1": "", "title": "Matcha biologico giapponese | Cinque Foglie",
     "description": "Matcha cerimoniale e quotidiano, biologico e macinato a pietra in Giappone, con frusta e kit per iniziare. Spedizione in 24 ore.",
     "intro": "Matcha per la cerimonia del tè e per il latte di ogni giorno."},
    {"id": "te-freddi", "nome": "Tè freddi", "h1": "Tè freddi", "title": "Tè freddi e cold brew | Cinque Foglie",
     "description": "Kit per tè freddo, cold brew di Sencha e tè alla pesca: pronti in frigo in 8 ore. Spedizione in 24 ore.",
     "intro": "Tè da preparare a freddo, per l'estate."},
    {"id": "accessori", "nome": "Accessori", "h1": "Accessori per il tè", "title": "Teiere, tazze e accessori per il tè | Cinque Foglie",
     "description": "Teiere in ghisa, tazze in ceramica, infusori e barattoli per conservare il tè. Idee regalo con spedizione in 24 ore.",
     "intro": "Tutto quello che serve per preparare e conservare il tè."},
]
DEFAULT_TITLE = "Cinque Foglie | Negozio di tè online"
P = [
    # id, categoria, nome, prezzo, formato, note
    ("sencha-bio", "te-verdi", "Sencha biologico", 12.90, "100 g", ""),
    ("gyokuro", "te-verdi", "Gyokuro", 24.50, "50 g", ""),
    ("bancha", "te-verdi", "Bancha", 8.90, "100 g", ""),
    ("genmaicha", "te-verdi", "Genmaicha", 9.50, "100 g", ""),
    ("te-verde-menta", "te-verdi", "Tè verde alla menta", 8.50, "100 g", ""),
    ("te-verde-gelsomino", "te-verdi", "Tè verde al gelsomino", 10.90, "100 g", ""),
    ("earl-grey-bio", "te-neri", "Earl Grey biologico", 9.90, "100 g", ""),
    ("english-breakfast", "te-neri", "English Breakfast", 8.90, "100 g", ""),
    ("assam", "te-neri", "Assam", 9.50, "100 g", ""),
    ("darjeeling", "te-neri", "Darjeeling", 14.90, "100 g", ""),
    ("chai-speziato", "te-neri", "Chai speziato", 10.50, "100 g", ""),
    ("te-nero-vaniglia", "te-neri", "Tè nero alla vaniglia", 9.90, "100 g", ""),
    ("tisane-della-sera", "tisane", "Tisane della Sera", 6.90, "15 bustine", ""),
    ("camomilla-bio", "tisane", "Camomilla biologica", 5.50, "20 bustine", ""),
    ("menta-piperita", "tisane", "Menta piperita", 5.90, "20 bustine", ""),
    ("rooibos-vaniglia", "tisane", "Rooibos alla vaniglia", 7.50, "100 g", ""),
    ("zenzero-limone", "tisane", "Zenzero e limone", 6.50, "20 bustine", ""),
    ("frutti-rossi", "tisane", "Infuso ai frutti rossi", 6.90, "100 g", ""),
    ("matcha-cerimoniale", "matcha", "Matcha cerimoniale", 29.90, "30 g", ""),
    ("matcha-quotidiano", "matcha", "Matcha quotidiano", 16.90, "50 g", ""),
    ("kit-matcha", "matcha", "Kit matcha con frusta", 39.90, "kit", ""),
    ("kit-te-freddo-estate", "te-freddi", "Kit tè freddo estate", 14.90, "kit", "esaurito"),
    ("cold-brew-sencha", "te-freddi", "Cold brew di Sencha", 11.90, "10 bustine", ""),
    ("te-freddo-pesca", "te-freddi", "Tè freddo alla pesca", 9.90, "100 g", ""),
    ("teiera-ghisa", "accessori", "Teiera in ghisa 0,8 l", 49.00, "pezzo", ""),
    ("tazza-ceramica", "accessori", "Tazza in ceramica fatta a mano", 18.00, "pezzo", ""),
    ("infusore-acciaio", "accessori", "Infusore in acciaio", 7.90, "pezzo", ""),
    ("barattolo-latta", "accessori", "Barattolo in latta 200 g", 9.00, "pezzo", ""),
    ("frusta-bambu", "accessori", "Frusta in bambù per matcha", 14.00, "pezzo", ""),
]
TITLE_DEFAULT = {"earl-grey-bio", "english-breakfast", "assam", "darjeeling", "chai-speziato", "te-nero-vaniglia", "infusore-acciaio", "barattolo-latta"}
prodotti = []
for pid, cat, nome, prezzo, formato, nota in P:
    cnome = next(c["nome"] for c in CATEGORIE if c["id"] == cat)
    title = DEFAULT_TITLE if pid in TITLE_DEFAULT else f"{nome} | {cnome} | Cinque Foglie"
    if pid == "sencha-bio":
        title = "Tè verde Sencha biologico in foglie | Cinque Foglie"
    desc = ("" if pid in TITLE_DEFAULT else
            f"{nome}, {formato}. Biologico, selezionato da Cinque Foglie. Spedizione in 24 ore e reso entro 30 giorni.")
    prodotti.append({
        "id": pid, "categoria": cat, "nome": nome, "prezzo": prezzo, "formato": formato,
        "disponibile": nota != "esaurito", "nota": "Torna a maggio con la nuova stagione" if nota == "esaurito" else "",
        "url": f"/{cat}/{pid}/", "title": title, "description": desc, "h1": nome,
        "recensioni": 0 if pid in TITLE_DEFAULT else random.choice([0, 4, 7, 12, 18, 23]),
    })
salva("catalogo.json", {"_nota": "Catalogo inventato del negozio Cinque Foglie (percorso SEO). Generato da strumenti-dati/genera_negozio.py.",
                        "dominio": DOM, "categorie": CATEGORIE, "prodotti": prodotti})

# ---------------------------------------------------------------- BLOG DEL NEGOZIO
BLOG = [
    ("sencha-guida-completa", "Tè verde Sencha: guida completa", "Tè verde Sencha: cos'è, come si prepara e dove comprarlo | Cinque Foglie"),
    ("come-preparare-il-matcha", "Come preparare il matcha", "Come preparare il matcha: dosi, acqua e frusta | Cinque Foglie"),
    ("tisane-per-la-sera", "5 tisane per la sera", "5 tisane senza teina per la sera | Cinque Foglie"),
    ("te-freddo-fatto-in-casa", "Tè freddo fatto in casa", "Tè freddo fatto in casa: la ricetta in 3 passi | Cinque Foglie"),
    ("differenza-te-verde-nero", "Differenza tra tè verde e tè nero", "Tè verde e tè nero: qual è la differenza? | Cinque Foglie"),
    ("conservare-il-te", "Come conservare il tè", "Come conservare il tè sfuso a casa | Cinque Foglie"),
]

# ---------------------------------------------------------------- CRAWL (tipo Screaming Frog)
pagine = []
def pagina(url, tipo, stato=200, title="", description="", h1="", canonical=None, robots="index, follow",
           parole=400, inlinks=5, redirect=None, lcp=None, peso=None, profondita=1, note=""):
    indicizzabile = stato == 200 and "noindex" not in robots and (canonical in (None, url))
    motivo = ""
    if stato in (301, 302): motivo = "Reindirizzamento"
    elif stato == 404: motivo = "Errore client (404)"
    elif "noindex" in robots: motivo = "noindex"
    elif canonical not in (None, url): motivo = "Canonicalizzata"
    pagine.append({"url": url, "tipo": tipo, "stato": stato, "redirect": redirect, "indicizzabile": indicizzabile, "motivo": motivo,
                   "title": title, "description": description, "h1": h1, "canonical": canonical if canonical else (url if stato == 200 else ""),
                   "robots": robots if stato == 200 else "", "parole": parole if stato == 200 else 0, "inlinks": inlinks,
                   "lcp": lcp, "peso": peso, "profondita": profondita, "note": note})

pagina("/", "Home", title="Cinque Foglie: tè e tisane biologiche online", description="Negozio online di tè e tisane biologiche: tè verdi, neri, matcha e tisane senza teina. Spedizione in 24 ore in tutta Italia.",
       h1="Tè e tisane biologiche, scelti foglia per foglia", parole=620, inlinks=58, lcp=2.1, peso=1450, profondita=0)
for c in CATEGORIE:
    robots = "noindex, follow" if c["id"] == "tisane" else "index, follow"
    pagina(f"/{c['id']}/", "Categoria", title=c["title"], description=c["description"], h1=c["h1"], robots=robots,
           parole=180 if c["id"] == "te-verdi" else 260, inlinks=40, lcp=2.4, peso=1900,
           note="noindex aggiunto il 18/09/2026 con l'aggiornamento del tema" if c["id"] == "tisane" else "")
for p in prodotti:
    pagina(p["url"], "Prodotto", title=p["title"], description=p["description"], h1=p["h1"],
           robots="noindex, follow" if p["categoria"] == "tisane" else "index, follow",
           parole=random.randint(210, 420), inlinks=random.randint(3, 9), lcp=round(random.uniform(3.6, 4.6), 1), peso=random.randint(2300, 2700), profondita=2,
           note="Prodotto esaurito fino a maggio" if not p["disponibile"] else "")
# filtri e ordinamenti: duplicati senza canonical
for c, par in [("te-verdi", "ordina=prezzo"), ("te-verdi", "ordina=nome"), ("te-verdi", "colore=verde-chiaro"), ("te-neri", "ordina=prezzo"),
               ("matcha", "ordina=prezzo"), ("accessori", "ordina=prezzo"), ("accessori", "materiale=ceramica")]:
    cc = next(x for x in CATEGORIE if x["id"] == c)
    pagina(f"/{c}/?{par}", "Filtro", title=cc["title"], description=cc["description"], h1=cc["h1"], canonical=None,
           parole=180, inlinks=40, lcp=2.4, peso=1900, profondita=2, note="Stesso contenuto della categoria, ordinato in modo diverso")
pagina("/te-verdi/?page=2", "Paginazione", title="Tè verdi | Cinque Foglie", description="Tè verdi.", h1="Tè verdi", parole=120, inlinks=2, profondita=2)
# blog
for slug, h1, title in BLOG:
    pagina(f"/blog/{slug}/", "Articolo", title=title, description=f"{h1}: la guida di Cinque Foglie, con consigli pratici e i prodotti giusti per iniziare.",
           h1=h1, parole=random.randint(900, 1600), inlinks=random.randint(4, 12), lcp=2.2, peso=1300, profondita=2)
pagina("/blog/", "Blog", title="Blog: guide al tè | Cinque Foglie", description="Guide pratiche su come scegliere, preparare e conservare il tè.", h1="Il blog di Cinque Foglie", parole=300, inlinks=58, profondita=1)
for tag in ["te-verde", "ricette", "estate"]:
    pagina(f"/blog/tag/{tag}/", "Tag", title=f"Tag: {tag} | Cinque Foglie", description="", h1=f"Articoli: {tag}", parole=60, inlinks=3, profondita=3,
           note="Pagina con poco testo: elenca solo i titoli degli articoli")
# pagine di servizio
for url, title, h1, robots in [("/chi-siamo/", "Chi siamo | Cinque Foglie", "Chi siamo", "index, follow"), ("/spedizioni-e-resi/", "Spedizioni e resi | Cinque Foglie", "Spedizioni e resi", "index, follow"),
                               ("/contatti/", "Contatti | Cinque Foglie", "Contatti", "index, follow"), ("/carrello/", "Carrello | Cinque Foglie", "Il tuo carrello", "noindex, follow"),
                               ("/account/", "Il tuo account | Cinque Foglie", "Accedi", "noindex, follow")]:
    pagina(url, "Servizio", title=title, description="", h1=h1, robots=robots, parole=250, inlinks=58, profondita=1)
# prodotto tolto e catena di redirect dal vecchio sito
pagina("/te-neri/earl-grey-classico/", "Prodotto", stato=404, inlinks=6, profondita=2, note="Prodotto tolto dal catalogo; il sostituto è l'Earl Grey biologico")
pagina("/prodotto.php?id=12", "Vecchio indirizzo", stato=301, redirect="/te-verdi/sencha/", inlinks=0, profondita=0, note="Indirizzo del vecchio sito, ancora linkato da altri siti")
pagina("/te-verdi/sencha/", "Vecchio indirizzo", stato=301, redirect="/te-verdi/sencha-bio/", inlinks=1, profondita=2)
pagina("/negozio/tisane/", "Vecchio indirizzo", stato=301, redirect="/tisane/", inlinks=0, profondita=0, note="Redirect diretto: va bene")
# chi linka la pagina 404
LINK_404 = ["/te-neri/", "/te-neri/english-breakfast/", "/te-neri/assam/", "/blog/differenza-te-verde-nero/", "/blog/conservare-il-te/", "/"]
salva("crawl.json", {"_nota": "Scansione simulata del sito (tipo Screaming Frog). Dati inventati.", "data": "2026-10-25", "pagine": pagine,
                     "link404": {"/te-neri/earl-grey-classico/": LINK_404}})

# ---------------------------------------------------------------- SEARCH CONSOLE: RENDIMENTO (16 mesi)
MESI = ["2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"]
# stagionalità (1 = normale) per mese dell'anno
STAG = {
    "te-freddi": [3.2, 2.6, 1.0, .35, .2, .15, .15, .2, .4, .8, 1.8, 2.8],
    "tisane":    [.55, .55, .9, 1.35, 1.6, 1.7, 1.6, 1.3, 1.0, .8, .6, .55],
    "te-neri":   [.75, .75, .95, 1.15, 1.3, 1.35, 1.3, 1.15, 1.0, .9, .8, .75],
    "accessori": [.8, .8, .9, 1.0, 1.4, 2.2, .9, .85, .85, .85, .85, .8],
}
def stag(segmento, m):
    mese = int(m[5:]) - 1
    s = STAG.get(segmento, [1] * 12)
    return s[(mese - 6) % 12] if False else s[[6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5].index(mese)]
# clic di base al mese per segmento (luglio 2025) e posizione/CTR tipici
BASE = {"home": (1500, .32, 1.4), "te-verdi": (430, .009, 7.8), "te-neri": (520, .041, 6.2), "tisane": (1150, .052, 4.9), "matcha": (690, .047, 5.1),
        "te-freddi": (260, .045, 5.6), "accessori": (380, .028, 8.4), "prodotti": (2300, .046, 6.6), "blog": (2900, .031, 8.9)}
def clic_mese(segmento, i, m):
    c0, ctr, pos = BASE[segmento]
    crescita = 1 + 0.015 * i  # il sito cresce piano: circa +1,5% al mese
    s = 1.0
    if segmento in STAG: s = stag(segmento, m)
    elif segmento == "prodotti": s = 1.0 + 0.40 * (stag("tisane", m) - 1) + 0.15 * (stag("te-freddi", m) - 1)
    c = c0 * crescita * s * random.uniform(.96, 1.04)
    # effetto del noindex su /tisane/ dal 18/09/2026: settembre perde un terzo del mese, ottobre quasi tutto
    if segmento == "tisane" and m == "2026-09": c *= 0.62
    if segmento == "tisane" and m == "2026-10": c *= 0.10
    if segmento == "prodotti" and m in ("2026-09", "2026-10"):
        c *= 0.88 if m == "2026-09" else 0.66  # anche le schede delle tisane escono da Google
    return round(c)
SEGMENTI = list(BASE.keys())
serie = []
for i, m in enumerate(MESI):
    riga = {"mese": m}
    tot_c = tot_i = 0; pos_pes = 0
    for s in SEGMENTI:
        c = clic_mese(s, i, m)
        ctr = BASE[s][1]
        imp = round(c / ctr)
        riga[s] = c
        tot_c += c; tot_i += imp; pos_pes += BASE[s][2] * imp
    riga["clic"] = tot_c; riga["impressioni"] = tot_i; riga["ctr"] = round(tot_c / tot_i * 100, 1); riga["posizione"] = round(pos_pes / tot_i, 1)
    serie.append(riga)

# Query degli ultimi 3 mesi (ago-ott 2026), con le pagine che si posizionano
def q(query, pagine_q, intento):
    return {"query": query, "intento": intento, "pagine": pagine_q,
            "clic": sum(p[1] for p in pagine_q), "impressioni": sum(p[2] for p in pagine_q),
            "posizione": round(sum(p[3] * p[2] for p in pagine_q) / max(1, sum(p[2] for p in pagine_q)), 1)}
def pg(url, clic, imp, pos): return (url, clic, imp, pos)
QUERY = [
    q("cinque foglie", [pg("/", 3900, 5200, 1.1)], "navigazionale"),
    q("tè verde", [pg("/te-verdi/", 310, 61000, 8.4)], "informativa"),
    q("tè verdi", [pg("/te-verdi/", 260, 38000, 7.1)], "commerciale"),
    q("tè verde biologico", [pg("/te-verdi/", 180, 21000, 7.6)], "commerciale"),
    q("tè verde sencha", [pg("/te-verdi/sencha-bio/", 210, 9800, 9.2), pg("/blog/sencha-guida-completa/", 160, 8100, 10.4)], "commerciale"),
    q("sencha", [pg("/blog/sencha-guida-completa/", 140, 7200, 8.8), pg("/te-verdi/sencha-bio/", 120, 6100, 11.3)], "informativa"),
    q("sencha biologico", [pg("/te-verdi/sencha-bio/", 190, 3900, 4.1)], "transazionale"),
    q("come preparare il sencha", [pg("/blog/sencha-guida-completa/", 260, 5100, 3.2)], "informativa"),
    q("gyokuro", [pg("/te-verdi/gyokuro/", 95, 2600, 6.3)], "commerciale"),
    q("genmaicha", [pg("/te-verdi/genmaicha/", 88, 2900, 7.0)], "commerciale"),
    q("matcha", [pg("/matcha/", 620, 22000, 6.8), pg("/blog/come-preparare-il-matcha/", 140, 9000, 11.6)], "commerciale"),
    q("matcha biologico", [pg("/matcha/", 540, 9400, 3.9)], "transazionale"),
    q("come preparare il matcha", [pg("/blog/come-preparare-il-matcha/", 980, 14500, 2.4)], "informativa"),
    q("matcha cerimoniale", [pg("/matcha/matcha-cerimoniale/", 160, 2700, 4.4)], "commerciale"),
    q("frusta matcha", [pg("/matcha/kit-matcha/", 70, 2100, 7.9)], "transazionale"),
    q("tè nero", [pg("/te-neri/", 140, 12000, 9.1)], "informativa"),
    q("earl grey", [pg("/te-neri/earl-grey-bio/", 52, 8800, 14.2)], "commerciale"),
    q("english breakfast tè", [pg("/te-neri/english-breakfast/", 21, 3300, 17.5)], "commerciale"),
    q("chai", [pg("/te-neri/chai-speziato/", 34, 6400, 15.8)], "commerciale"),
    q("differenza tè verde e tè nero", [pg("/blog/differenza-te-verde-nero/", 410, 6900, 2.9)], "informativa"),
    q("tisane", [pg("/tisane/", 690, 15200, 6.1)], "commerciale"),
    q("tisane biologiche", [pg("/tisane/", 410, 6100, 4.4)], "transazionale"),
    q("tisane per la sera", [pg("/blog/tisane-per-la-sera/", 480, 8700, 3.6)], "informativa"),
    q("tisana senza teina", [pg("/blog/tisane-per-la-sera/", 120, 4300, 9.8)], "commerciale"),
    q("camomilla biologica", [pg("/tisane/camomilla-bio/", 96, 1900, 6.8)], "transazionale"),
    q("rooibos", [pg("/tisane/rooibos-vaniglia/", 71, 4100, 9.6)], "commerciale"),
    q("tè freddo fatto in casa", [pg("/blog/te-freddo-fatto-in-casa/", 690, 9900, 2.7)], "informativa"),
    q("kit tè freddo", [pg("/te-freddi/kit-te-freddo-estate/", 44, 1300, 5.2)], "transazionale"),
    q("cold brew tè", [pg("/te-freddi/cold-brew-sencha/", 60, 2200, 6.1)], "commerciale"),
    q("teiera in ghisa", [pg("/accessori/teiera-ghisa/", 75, 8100, 11.8)], "commerciale"),
    q("tazza da tè in ceramica", [pg("/accessori/tazza-ceramica/", 40, 3600, 12.4)], "commerciale"),
    q("come conservare il tè", [pg("/blog/conservare-il-te/", 150, 2600, 3.4)], "informativa"),
]
for x in QUERY:
    x["ctr"] = round(x["clic"] / x["impressioni"] * 100, 1)
    x["pagine"] = [{"url": u, "clic": c, "impressioni": i, "posizione": p} for u, c, i, p in x["pagine"]]
# Pagine (ultimi 3 mesi), sommando le query + un po' di "coda lunga" di ricerche non mostrate
pagine_sc = {}
for x in QUERY:
    for p in x["pagine"]:
        d = pagine_sc.setdefault(p["url"], {"url": p["url"], "clic": 0, "impressioni": 0, "_pos": 0})
        d["clic"] += p["clic"]; d["impressioni"] += p["impressioni"]; d["_pos"] += p["posizione"] * p["impressioni"]
for d in pagine_sc.values():
    coda = random.uniform(1.15, 1.35)
    d["posizione"] = round(d["_pos"] / d["impressioni"], 1); del d["_pos"]
    d["clic"] = round(d["clic"] * coda); d["impressioni"] = round(d["impressioni"] * coda)
    d["ctr"] = round(d["clic"] / d["impressioni"] * 100, 1)
salva("search-console.json", {
    "_nota": "Search Console simulata di cinquefoglie.example. Dati inventati, coerenti con crawl.json.",
    "proprieta": f"https://{DOM}/", "aggiornato": "2026-10-25",
    "mesi": serie, "segmenti": {"home": "Home", "te-verdi": "Categoria Tè verdi", "te-neri": "Categoria Tè neri", "tisane": "Categoria Tisane", "matcha": "Categoria Matcha",
                                 "te-freddi": "Categoria Tè freddi", "accessori": "Categoria Accessori", "prodotti": "Schede prodotto", "blog": "Blog"},
    "basi": {k: {"ctr": v[1], "posizione": v[2]} for k, v in BASE.items()},  # CTR e posizione tipici di ogni parte del sito
    "periodoQuery": "1 agosto - 25 ottobre 2026",
    "query": sorted(QUERY, key=lambda x: -x["clic"]),
    "pagine": sorted(pagine_sc.values(), key=lambda x: -x["clic"]),
})

# ---------------------------------------------------------------- SEARCH CONSOLE: INDICIZZAZIONE + CORE WEB VITALS
non_ind = {}
def aggiungi(motivo, url, fonte):
    non_ind.setdefault(motivo, {"motivo": motivo, "fonte": fonte, "pagine": []})["pagine"].append(url)
for p in pagine:
    if p["stato"] == 404: aggiungi("Non trovata (404)", p["url"], "Sito web")
    elif p["stato"] in (301, 302): aggiungi("Pagina con reindirizzamento", p["url"], "Sito web")
    elif "noindex" in (p["robots"] or ""): aggiungi("Esclusa in base al tag \"noindex\"", p["url"], "Sito web")
    elif p["tipo"] == "Filtro": aggiungi("Pagina duplicata senza URL canonico selezionato dall'utente", p["url"], "Sito web")
    elif p["tipo"] in ("Tag", "Paginazione"): aggiungi("Scansionata, ma attualmente non indicizzata", p["url"], "Google")
indicizzate = [p["url"] for p in pagine if p["indicizzabile"] and p["tipo"] not in ("Tag", "Paginazione")]
cwv = {
    "telefono": [
        {"gruppo": "Schede prodotto", "esempio": "/te-verdi/sencha-bio/", "pagine": len(prodotti), "lcp": 4.1, "inp": 180, "cls": 0.04, "stato": "Scarso"},
        {"gruppo": "Categorie", "esempio": "/te-verdi/", "pagine": len(CATEGORIE), "lcp": 2.4, "inp": 150, "cls": 0.06, "stato": "Buono"},
        {"gruppo": "Blog", "esempio": "/blog/tisane-per-la-sera/", "pagine": len(BLOG) + 1, "lcp": 2.2, "inp": 90, "cls": 0.02, "stato": "Buono"},
    ],
    "computer": [
        {"gruppo": "Schede prodotto", "esempio": "/te-verdi/sencha-bio/", "pagine": len(prodotti), "lcp": 2.3, "inp": 60, "cls": 0.03, "stato": "Buono"},
        {"gruppo": "Categorie", "esempio": "/te-verdi/", "pagine": len(CATEGORIE), "lcp": 1.8, "inp": 50, "cls": 0.05, "stato": "Buono"},
        {"gruppo": "Blog", "esempio": "/blog/tisane-per-la-sera/", "pagine": len(BLOG) + 1, "lcp": 1.6, "inp": 40, "cls": 0.02, "stato": "Buono"},
    ],
    "soglie": {"lcp": [2.5, 4.0], "inp": [200, 500], "cls": [0.1, 0.25]},
    "causa": "Foto principale del prodotto in JPG da circa 2,4 MB, caricata senza dimensioni e senza versione per telefono.",
}
# andamento delle pagine indicizzate (settimanale, ultime 12 settimane): il calo arriva dopo il 18/09
settimane = ["2026-08-03", "2026-08-10", "2026-08-17", "2026-08-24", "2026-08-31", "2026-09-07", "2026-09-14", "2026-09-21", "2026-09-28", "2026-10-05", "2026-10-12", "2026-10-19"]
n_ok = len(indicizzate)
storico_ind = []
for i, w in enumerate(settimane):
    tisane_out = 0 if w < "2026-09-21" else min(7, 2 + (i - 7) * 2)
    storico_ind.append({"settimana": w, "indicizzate": n_ok + 7 - tisane_out, "non_indicizzate": sum(len(v["pagine"]) for v in non_ind.values()) - 7 + tisane_out})
salva("indicizzazione.json", {"_nota": "Report Pagine e Core Web Vitals di Search Console, simulati.", "aggiornato": "2026-10-25",
                              "indicizzate": len(indicizzate), "motivi": list(non_ind.values()), "storico": storico_ind, "cwv": cwv})

# ---------------------------------------------------------------- RICERCA KEYWORD (tipo Keyword Planner + Semrush)
def kw(k, vol, kd, cpc, intento, trend, serp, pos=None):
    return {"keyword": k, "volume": vol, "difficolta": kd, "cpc": cpc, "intento": intento, "trend": trend, "serp": serp, "posizione": pos}
T_PIATTO = [1] * 12
def tr(nome): return [round(x, 2) for x in (STAG.get(nome, T_PIATTO))] if nome else T_PIATTO
KW = [
    kw("tè verde", 33100, 61, 0.45, "informativa", tr(None), ["Le persone chiedono anche", "Immagini", "Shopping"], 8.4),
    kw("tè verdi", 4400, 38, 0.60, "commerciale", tr(None), ["Shopping", "Le persone chiedono anche"], 7.1),
    kw("tè verde biologico", 2900, 34, 0.70, "commerciale", tr(None), ["Shopping"], 7.6),
    kw("tè verde sencha", 1600, 27, 0.55, "commerciale", tr(None), ["Shopping", "Le persone chiedono anche"], 9.2),
    kw("sencha", 2400, 31, 0.40, "informativa", tr(None), ["Snippet in evidenza", "Le persone chiedono anche"], 8.8),
    kw("come preparare il sencha", 590, 12, 0.10, "informativa", tr(None), ["Snippet in evidenza"], 3.2),
    kw("tè verde giapponese", 1300, 29, 0.50, "commerciale", tr(None), ["Shopping"], None),
    kw("tè verde benefici", 14800, 42, 0.20, "informativa", tr(None), ["Le persone chiedono anche", "Snippet in evidenza"], None),
    kw("matcha", 40500, 66, 0.65, "commerciale", tr(None), ["Shopping", "Video", "Le persone chiedono anche"], 6.8),
    kw("matcha biologico", 3600, 37, 0.80, "transazionale", tr(None), ["Shopping"], 3.9),
    kw("come preparare il matcha", 6600, 22, 0.15, "informativa", tr(None), ["Video", "Snippet in evidenza"], 2.4),
    kw("matcha latte ricetta", 2900, 18, 0.10, "informativa", tr(None), ["Video", "Immagini"], None),
    kw("frusta matcha", 1900, 19, 0.45, "transazionale", tr(None), ["Shopping"], 7.9),
    kw("tè nero", 8100, 48, 0.40, "informativa", tr("te-neri"), ["Le persone chiedono anche"], 9.1),
    kw("earl grey", 9900, 45, 0.35, "commerciale", tr("te-neri"), ["Shopping", "Le persone chiedono anche"], 14.2),
    kw("chai tè", 5400, 33, 0.40, "commerciale", tr("te-neri"), ["Video", "Shopping"], 15.8),
    kw("tè senza teina", 2400, 26, 0.50, "commerciale", tr("tisane"), ["Le persone chiedono anche", "Shopping"], None),
    kw("tisane", 18100, 52, 0.55, "commerciale", tr("tisane"), ["Shopping", "Le persone chiedono anche"], None),
    kw("tisane biologiche", 3600, 35, 0.75, "transazionale", tr("tisane"), ["Shopping"], None),
    kw("tisane per dormire", 6600, 39, 0.60, "commerciale", tr("tisane"), ["Le persone chiedono anche"], None),
    kw("tisane per la sera", 2900, 24, 0.40, "informativa", tr("tisane"), ["Snippet in evidenza"], 3.6),
    kw("rooibos", 6600, 36, 0.40, "commerciale", tr("tisane"), ["Le persone chiedono anche", "Shopping"], None),
    kw("camomilla biologica", 1600, 28, 0.55, "transazionale", tr("tisane"), ["Shopping"], None),
    kw("tisana zenzero e limone", 1900, 21, 0.35, "commerciale", tr("tisane"), ["Video", "Shopping"], None),
    kw("tè freddo fatto in casa", 9900, 21, 0.10, "informativa", tr("te-freddi"), ["Video", "Snippet in evidenza"], 2.7),
    kw("cold brew tè", 1000, 16, 0.30, "commerciale", tr("te-freddi"), ["Video"], 6.1),
    kw("tè freddo alla pesca", 4400, 30, 0.30, "commerciale", tr("te-freddi"), ["Shopping", "Video"], None),
    kw("teiera in ghisa", 5400, 41, 0.90, "commerciale", tr("accessori"), ["Shopping", "Immagini"], 11.8),
    kw("idee regalo tè", 2400, 33, 0.80, "commerciale", tr("accessori"), ["Shopping", "Le persone chiedono anche"], None),
    kw("calendario dell'avvento tè", 3600, 29, 0.70, "transazionale", [.0, .0, .1, .6, 2.6, 3.2, .1, .0, .0, .0, .0, .0], ["Shopping"], None),
    kw("come conservare il tè", 880, 9, 0.05, "informativa", tr(None), ["Snippet in evidenza"], 3.4),
    kw("differenza tè verde e tè nero", 1900, 11, 0.05, "informativa", tr(None), ["Snippet in evidenza"], 2.9),
    kw("temperatura acqua per il tè", 1300, 10, 0.05, "informativa", tr(None), ["Snippet in evidenza"], None),
]
salva("keyword.json", {"_nota": "Ricerca keyword simulata (Italia, ricerche mensili medie). Dati inventati. trend = 12 mesi da luglio a giugno (1 = media). posizione = posizione di oggi del sito (vuota se il sito non compare tra i primi 100: è il caso delle tisane, uscite da Google con il noindex).",
                       "mesiTrend": ["lug", "ago", "set", "ott", "nov", "dic", "gen", "feb", "mar", "apr", "mag", "giu"], "keyword": KW})

# ---------------------------------------------------------------- ANALYTICS (visite da Google e vendite per pagina di ingresso)
def conv(url):
    if url.startswith("/blog/"): return 0.006
    if url == "/": return 0.021
    if url.count("/") == 2: return 0.018  # categoria
    return 0.034  # prodotto
analytics = []
for d in pagine_sc.values():
    sess = round(d["clic"] * random.uniform(.66, .74))  # circa 70%: solo chi accetta i cookie viene contato
    cr = conv(d["url"]) * random.uniform(.75, 1.3)  # ogni pagina converte un po' diversamente
    ordini = round(sess * cr)
    valore = 24 if not d["url"].startswith("/accessori/") else 42
    analytics.append({"pagina": d["url"], "sessioni": sess, "conversione": round(ordini / sess * 100, 1) if sess else 0, "ordini": ordini, "ricavi": ordini * valore})
mesi_ga = [{"mese": r["mese"], "sessioni": round(r["clic"] * .70), "ordini": round(r["clic"] * .70 * .019), "ricavi": round(r["clic"] * .70 * .019 * 26)} for r in serie]
salva("analytics.json", {"_nota": "Analytics simulato: solo visite da ricerca organica, con consenso ai cookie (circa 70% delle visite reali). Dati inventati.",
                         "periodo": "1 agosto - 25 ottobre 2026", "pagine": sorted(analytics, key=lambda x: -x["ricavi"]), "mesi": mesi_ga})

# riepilogo per controllare a occhio
ott, set_, ott25 = serie[-1], serie[-2], serie[3]
print("clic ott 2026", ott["clic"], "set 2026", set_["clic"], "variazione", round((ott["clic"] / set_["clic"] - 1) * 100), "%")
print("clic ott 2025", ott25["clic"], "→ ott 2026 anno su anno", round((ott["clic"] / ott25["clic"] - 1) * 100), "%")
print("tisane ott 2025", ott25["tisane"], "ott 2026", ott["tisane"], "| tè freddi set/ott 2026", set_["te-freddi"], ott["te-freddi"])
print("pagine crawl", len(pagine), "| indicizzate", len(indicizzate), "| motivi", {k: len(v["pagine"]) for k, v in non_ind.items()})
