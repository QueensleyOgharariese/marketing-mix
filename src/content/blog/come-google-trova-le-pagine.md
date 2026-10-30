---
title: "Come Google trova e ordina le pagine"
description: "Scansione, indicizzazione e posizionamento: i tre passaggi con cui una pagina arriva nei risultati di Google, spiegati semplici."
date: 2026-10-30
categoria: "basi"
etichetta: "SEO"
formato: "pillola"
tema: "seo"
minuti: 4
ruoloId: "seo"
inBreve:
  - "**Scansione**: Google visita le pagine seguendo i link."
  - "**Indicizzazione**: Google legge la pagina e decide se salvarla nel suo archivio."
  - "**Posizionamento**: quando qualcuno cerca, Google sceglie le pagine più utili e le mette in ordine."
consiglio: "Se una pagina non compare su Google, chiediti prima in quale dei tre passaggi si è fermata: la soluzione cambia molto."
domanda:
  testo: "Una pagina nuova non ha nessun link che porta a lei e non è nella sitemap. Cosa rischia?"
  opzioni:
    - testo: "Di essere scansionata subito"
    - testo: "Che Google non la trovi"
      giusta: true
    - testo: "Di finire prima nei risultati"
  spiegaSi: "Google trova le pagine soprattutto seguendo i link e leggendo la sitemap: una pagina isolata può restare invisibile."
  spiegaNo: "Senza link né sitemap Google non ha una strada per arrivarci: prima ancora del posizionamento, rischia di non trovarla."
faq:
  - d: "Quanto ci mette Google a trovare una pagina nuova?"
    r: "Da qualche ora a qualche settimana. Link interni, sitemap e la richiesta di indicizzazione in Search Console aiutano."
  - d: "Pagare la pubblicità aiuta l'indicizzazione?"
    r: "No. Annunci e risultati organici sono separati."
argomenti: ["SEO", "Google"]
---

Ogni volta che cerchi qualcosa, Google risponde in meno di un secondo. Non cerca in tutto il web in quel momento: cerca nel suo archivio, che ha costruito prima in tre passaggi.

## 1. Scansione: trovare le pagine

Un programma di Google (si chiama **Googlebot**) visita le pagine e segue i link, da una pagina all'altra. Per questo i **link interni** sono importanti: una pagina che nessuno collega è difficile da trovare.

Aiuta anche la **sitemap**: un file con l'elenco delle pagine del sito, che si comunica a Google in Search Console.

## 2. Indicizzazione: salvare le pagine

Google legge il contenuto della pagina e decide se salvarlo nel suo **indice**, l'archivio da cui prende i risultati. Può decidere di non farlo, per esempio se:

- la pagina chiede di non essere indicizzata (un **noindex**);
- è quasi uguale a un'altra pagina (un duplicato);
- ha poco contenuto utile.

Come si controllano queste istruzioni è spiegato in [noindex, robots.txt e canonical](/blog/noindex-robots-txt-canonical/).

## 3. Posizionamento: mettere in ordine

Quando qualcuno cerca, Google sceglie tra le pagine del suo indice quelle che rispondono meglio e le ordina. Guarda molti segnali: se la pagina risponde all'**intento**, se è affidabile, se altri siti la citano, se si apre bene da telefono.

## Un esempio

Nel negozio finto Cinque Foglie, dopo il cambio di tema del sito, le pagine delle tisane erano scansionate ma **non indicizzate**: il tema nuovo aveva aggiunto per errore un noindex. Le pagine esistevano, Google le visitava, ma non le salvava. Il problema non era la classifica: era il secondo passaggio.

Per vedere a che punto sono le pagine di un sito vero si usa [Google Search Console](/blog/search-console-per-chi-inizia/).
