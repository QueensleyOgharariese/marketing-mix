# TRADUZIONI DEI DATI DELL'APP (italiano -> inglese)
# Ogni file di dati italiano (es. teoria/seo.json) ha il suo gemello inglese (teoria/seo.en.json) con la stessa forma:
# cambiano solo i testi, mai gli id, i link e i "codici" che usa il programma (es. "attiva", "reel", "frase").
#
# Come si usa (due passaggi):
#   python3 strumenti-dati/traduzioni.py estrai teoria/seo.json      -> scrive traduzioni/teoria/seo.it.txt
#   (si scrive traduzioni/teoria/seo.en.txt con le stesse righe numerate, in inglese)
#   python3 strumenti-dati/traduzioni.py applica teoria/seo.json     -> scrive src/data/app/teoria/seo.en.json
#   Se il file italiano cambia: "riallinea" tiene le traduzioni fatte e segna con ??? le frasi nuove.
#
# Nei file .txt ogni riga è "numero|testo"; gli a capo dentro un testo diventano \n.
# Le frasi uguali compaiono una volta sola, così la stessa frase ha sempre la stessa traduzione.
# Il programma controlla che manchi nessuna riga e che i numeri nei testi (prezzi, percentuali...) restino gli stessi.
import json, os, re, sys

DATI = "src/data/app"
CARTELLA = "strumenti-dati/traduzioni"
# Chiavi che contengono codici o indirizzi: non si traducono mai
SALTA = {"id", "slug", "link", "url", "tipo", "icona", "strumento", "dove", "verifica", "data", "ora", "hex", "mese",
         "settimana", "pagina", "campagna", "gruppo", "corrispondenza", "stato", "formato", "permesso", "categoria",
         "post", "quando", "autore", "fonte_id", "ruoloId", "strumentoId", "colore", "sim", "_nota",
         "pilastro", "giornalista", "fine", "canale_id", "selettore", "chiave"}
SALTA |= {"giusti", "ids", "campo", "da"}  # esercizi: id delle colonne, delle spunte, dei campi; iniziali dell'avatar
# Chiavi saltate solo quando contengono un elenco di codici (es. "righe" nelle regole: ["r1","r2"]);
# se invece contengono oggetti (le righe di una tabella con il loro testo) si traducono normalmente.
SALTA_SE_CODICI = {"righe"}
# Chiavi da saltare solo in alcuni file (aggiunte quando serve)
SALTA_FILE = {}
# File in cui anche i numeri senza lettere passano al formato inglese: "1.300" -> "1,300", "1,5%" -> "1.5%"
NUMERI_EN = ("esercizi/", "seo-sencha.json")


def salta_qui(k, v, salta):
    return k in salta or (k in SALTA_SE_CODICI and isinstance(v, list) and all(isinstance(e, str) for e in v))


def numero_en(s):
    # scambia punto e virgola solo tra cifre: 1.300,50 -> 1,300.50
    s = re.sub(r"(?<=\d)[.,](?=\d)", lambda m: "," if m.group(0) == "." else ".", s)
    # "768 €" -> "€768": in inglese il simbolo dell'euro va prima del numero
    return re.sub(r"([\d.,]+) €", r"€\1", s)


def lettere(s):
    return bool(re.search(r"[A-Za-zÀ-ÿ]", s))


def stringhe(x, salta, chiave=None, out=None):
    out = [] if out is None else out
    if isinstance(x, dict):
        for k, v in x.items():
            if salta_qui(k, v, salta): continue
            stringhe(v, salta, k, out)
    elif isinstance(x, list):
        for v in x: stringhe(v, salta, chiave, out)
    elif isinstance(x, str) and lettere(x):
        out.append(x)
    return out


def sostituisci(x, salta, mappa, chiave=None, numeri=False):
    if isinstance(x, dict):
        return {k: (v if salta_qui(k, v, salta) else sostituisci(v, salta, mappa, k, numeri)) for k, v in x.items()}
    if isinstance(x, list):
        return [sostituisci(v, salta, mappa, chiave, numeri) for v in x]
    if isinstance(x, str) and lettere(x):
        return mappa[x]
    if isinstance(x, str) and numeri:
        return numero_en(x)
    return x


def unici(lista):
    visti, out = set(), []
    for s in lista:
        if s not in visti: visti.add(s); out.append(s)
    return out


def percorsi(nome):
    base = nome[:-5]  # senza .json
    return f"{DATI}/{nome}", f"{CARTELLA}/{base}.it.txt", f"{CARTELLA}/{base}.en.txt", f"{DATI}/{base}.en.json"


def estrai(nome):
    src, it, _, _ = percorsi(nome)
    salta = SALTA | SALTA_FILE.get(nome, set())
    righe = unici(stringhe(json.load(open(src, encoding="utf-8")), salta))
    os.makedirs(os.path.dirname(it), exist_ok=True)
    with open(it, "w", encoding="utf-8") as f:
        for i, s in enumerate(righe, 1): f.write(f"{i}|{s.replace(chr(10), chr(92) + 'n')}\n")
    print(f"{nome}: {len(righe)} frasi -> {it}")


def leggi_righe(p):
    d = {}
    for r in open(p, encoding="utf-8").read().splitlines():
        if not r.strip(): continue
        n, t = r.split("|", 1)
        d[int(n)] = t.replace("\\n", "\n")
    return d


def applica(nome):
    src, it, en, out = percorsi(nome)
    salta = SALTA | SALTA_FILE.get(nome, set())
    dati = json.load(open(src, encoding="utf-8"))
    righe = unici(stringhe(dati, salta))
    tr = leggi_righe(en)
    mancano = [i for i in range(1, len(righe) + 1) if i not in tr or tr[i].startswith("???")]
    assert not mancano, f"{nome}: mancano le righe {mancano[:10]}"
    # i numeri devono restare gli stessi (prezzi, percentuali, date): segnala le differenze, non blocca
    for i, s in enumerate(righe, 1):
        a, b = sorted(re.findall(r"\d+", s)), sorted(re.findall(r"\d+", tr[i]))
        if a != b: print(f"  attenzione riga {i}: numeri diversi {a} -> {b}")
    mappa = {s: tr[i] for i, s in enumerate(righe, 1)}
    numeri = nome.startswith(NUMERI_EN)
    json.dump(sostituisci(dati, salta, mappa, numeri=numeri), open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{nome}: scritto {out}")


def riallinea(nome):
    """Quando il file italiano cambia: rifà l'elenco italiano e tiene le traduzioni già fatte (per testo).
    Le frasi nuove restano da tradurre e sono segnate con ??? nel file inglese."""
    src, it, en, _ = percorsi(nome)
    vecchie = {}
    if os.path.exists(it) and os.path.exists(en):
        a, b = leggi_righe(it), leggi_righe(en)
        vecchie = {a[i]: b[i] for i in a if i in b}
    estrai(nome)
    nuove = leggi_righe(it)
    mancano = 0
    with open(en, "w", encoding="utf-8") as f:
        for i in sorted(nuove):
            t = vecchie.get(nuove[i])
            if t is None: mancano += 1; t = "???" + nuove[i]
            f.write(f"{i}|{t.replace(chr(10), chr(92) + 'n')}\n")
    print(f"{nome}: {mancano} frasi da tradurre (righe che iniziano con ???)")


if __name__ == "__main__":
    cosa, nome = sys.argv[1], sys.argv[2]
    {"estrai": estrai, "applica": applica, "riallinea": riallinea}[cosa](nome)
