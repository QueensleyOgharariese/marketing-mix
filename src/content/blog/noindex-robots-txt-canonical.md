---
title: "Noindex, robots.txt e canonical: le differenze"
description: "Noindex, robots.txt e canonical servono a cose diverse. Quando usare ciascuno, gli errori più comuni e un esempio su un negozio online."
date: 2026-10-30
categoria: "basi"
etichetta: "SEO"
formato: "guida"
tema: "seo"
minuti: 6
ruoloId: "seo"
inBreve:
  - "**robots.txt** dice a Google quali parti del sito **non visitare**."
  - "**noindex** dice a Google di **non mostrare** una pagina nei risultati."
  - "**canonical** dice a Google **qual è la versione principale** di pagine quasi uguali."
consiglio: "Non bloccare in robots.txt una pagina con il noindex: se Google non può visitarla, non vede il noindex e la pagina può restare nei risultati."
domanda:
  testo: "Vuoi togliere dai risultati di Google la pagina del carrello. Cosa usi?"
  opzioni:
    - testo: "Un blocco nel robots.txt"
    - testo: "Un noindex sulla pagina"
      giusta: true
    - testo: "Un canonical verso la home"
  spiegaSi: "Il noindex è l'istruzione per non far comparire una pagina nei risultati. Google deve poterla visitare per leggerlo."
  spiegaNo: "Il robots.txt blocca la visita, non la presenza nei risultati; il canonical serve per pagine quasi uguali, e il carrello non è una copia della home."
faq:
  - d: "Il canonical è un ordine?"
    r: "No, è un suggerimento. Google di solito lo segue, ma può scegliere un'altra pagina se i segnali sono confusi (per esempio link interni che puntano a un'altra versione)."
  - d: "Il robots.txt protegge le pagine private?"
    r: "No. È un file pubblico e chiunque può leggerlo. Le pagine private si proteggono con una password."
argomenti: ["SEO", "SEO tecnica"]
---

Tre strumenti dai nomi strani, spesso confusi tra loro. Servono tutti a **guidare Google**, ma in momenti diversi: prima della visita, dopo la visita, quando ci sono copie.

## Il confronto in una tabella

| | robots.txt | noindex | canonical |
| --- | --- | --- | --- |
| **Cos'è** | Un file nella radice del sito | Un'istruzione nella pagina | Un collegamento nella pagina |
| **Dice a Google** | "Non visitare qui" | "Non mostrare questa pagina" | "La pagina principale è quest'altra" |
| **Quando serve** | Zone inutili da visitare (filtri infiniti, ricerche interne) | Pagine che non servono nei risultati (carrello, area clienti, ringraziamento) | Pagine quasi uguali (filtri, parametri, versioni stampabili) |
| **Attenzione** | Non toglie le pagine dai risultati | Google deve poter visitare la pagina | È un suggerimento, non un ordine |

## robots.txt

È un file di testo all'indirizzo `/robots.txt`. Dice ai programmi dei motori di ricerca quali percorsi non visitare. Esempio:

```
User-agent: *
Disallow: /ricerca/
Sitemap: https://www.esempio.it/sitemap.xml
```

Serve a non sprecare le visite di Google su pagine inutili. **Non** serve a nascondere una pagina dai risultati: se altri siti la linkano, può comparire lo stesso, senza descrizione.

## noindex

È un'istruzione nel codice della pagina:

```
<meta name="robots" content="noindex">
```

Google visita la pagina, legge il noindex e la toglie dai risultati. È la scelta giusta per carrello, area clienti, pagine di ringraziamento dopo un ordine.

L'errore più pericoloso: un **noindex messo per sbaglio** su pagine importanti, per esempio dopo un cambio di tema o il passaggio da un sito di prova a quello vero. Le pagine spariscono da Google nel giro di qualche settimana.

## canonical

Quando più indirizzi mostrano quasi lo stesso contenuto, per esempio `/te-verdi/` e `/te-verdi/?ordina=prezzo`, si indica quale è la versione principale:

```
<link rel="canonical" href="https://www.esempio.it/te-verdi/">
```

Così Google concentra i segnali su una pagina sola invece di dividerli tra le copie.

## Un esempio: Cinque Foglie

Nel negozio finto di Marketing Mix sono successe due cose dopo il cambio di tema:

1. Le pagine delle **tisane** avevano un noindex per errore: le visite da Google sono calate e il problema si è visto nel rapporto delle pagine di Search Console.
2. Le pagine dei **filtri** (per prezzo, per origine) non avevano il canonical: Google ne trovava decine quasi uguali alla categoria.

Soluzione: togliere il noindex dalle tisane e chiedere a Google di ricontrollare; aggiungere il canonical dei filtri verso la categoria.

Come Google trova e salva le pagine è spiegato in [come Google trova e ordina le pagine](/blog/come-google-trova-le-pagine/).
