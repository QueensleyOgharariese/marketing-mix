---
title: "Core Web Vitals spiegati semplici: LCP, INP e CLS"
description: "Cosa misurano i Core Web Vitals, quali sono le soglie (LCP 2,5 s, INP 200 ms, CLS 0,1) e le cause più comuni di una pagina lenta."
date: 2026-10-30
categoria: "basi"
etichetta: "SEO"
formato: "pillola"
tema: "seo"
minuti: 5
ruoloId: "seo"
inBreve:
  - "I **Core Web Vitals** sono tre misure di Google su come si vive una pagina: **caricamento**, **reattività** e **stabilità**."
  - "Soglie buone: **LCP sotto 2,5 secondi**, **INP sotto 200 millisecondi**, **CLS sotto 0,1**."
  - "Si misurano sulle **visite vere**, soprattutto da telefono."
consiglio: "Guarda sempre i dati del telefono: spesso il sito sembra veloce dal computer dell'ufficio e lentissimo da uno smartphone in metropolitana."
domanda:
  testo: "Le schede prodotto hanno un LCP di 4,1 secondi su telefono. Qual è la causa più probabile?"
  opzioni:
    - testo: "Il title troppo lungo"
    - testo: "La foto principale troppo pesante"
      giusta: true
    - testo: "Troppe parole nella descrizione"
  spiegaSi: "L'LCP misura quando compare l'elemento più grande, che nelle schede prodotto è quasi sempre la foto. Una foto da qualche MB rallenta tutto."
  spiegaNo: "Title e testo non pesano quasi niente: l'LCP dipende quasi sempre dall'immagine o dal blocco più grande in alto."
faq:
  - d: "I Core Web Vitals fanno salire in classifica?"
    r: "Sono uno dei tanti segnali, non il più importante. Ma una pagina lenta fa perdere persone e vendite, anche senza contare Google."
  - d: "Dove li vedo?"
    r: "In Search Console, nel rapporto Core Web Vitals, e con PageSpeed Insights, che è gratuito."
  - d: "Cos'era il FID?"
    r: "La vecchia misura della reattività. Da marzo 2024 è stata sostituita dall'INP."
argomenti: ["SEO", "SEO tecnica"]
---

Una pagina può avere il testo perfetto, ma se ci mette troppo ad aprirsi o "salta" mentre la leggi, le persone se ne vanno. Google misura questa esperienza con tre numeri: i **Core Web Vitals**.

## Le tre misure

| Misura | Cosa controlla | Buono | Da migliorare | Scarso |
| --- | --- | --- | --- | --- |
| **LCP** (Largest Contentful Paint) | Quando compare l'elemento più grande | fino a 2,5 s | 2,5-4 s | oltre 4 s |
| **INP** (Interaction to Next Paint) | Quanto è veloce la risposta a un clic o tocco | fino a 200 ms | 200-500 ms | oltre 500 ms |
| **CLS** (Cumulative Layout Shift) | Quanto la pagina si sposta mentre carica | fino a 0,1 | 0,1-0,25 | oltre 0,25 |

Google considera i dati delle **visite reali** e guarda il 75° percentile: una pagina "passa" se almeno 3 visite su 4 hanno valori buoni per tutte e tre le misure.

## Cosa le rovina, di solito

- **LCP alto**: immagini troppo pesanti, non ridimensionate per il telefono, in formati vecchi.
- **INP alto**: troppi script (chat, pubblicità, strumenti di tracciamento) che tengono occupato il browser.
- **CLS alto**: immagini senza dimensioni indicate, banner che compaiono in alto e spingono giù il testo.

## Un esempio

Nel negozio finto Cinque Foglie le 29 schede prodotto avevano un LCP di 4,1 secondi da telefono. La causa: la foto principale, un JPG di circa 2,4 MB uguale per computer e telefono.

La soluzione, scritta in una richiesta per chi sviluppa il sito:

1. una versione più leggera della foto per il telefono (formato WebP);
2. larghezza e altezza indicate nel codice;
3. obiettivo: LCP sotto 2,5 secondi.

## Da dove partire

1. Apri il rapporto Core Web Vitals in [Search Console](/blog/search-console-per-chi-inizia/) e guarda i gruppi di pagine "scarsi" da telefono.
2. Prova una pagina di quel gruppo con PageSpeed Insights: ti dice quale elemento è il più lento.
3. Sistema una causa alla volta e ricontrolla dopo qualche settimana: i dati reali si aggiornano lentamente.
