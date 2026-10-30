---
title: "Google Search Console per chi inizia"
description: "Cos'è Google Search Console, come si attiva e quali rapporti guardare per primi: prestazioni, pagine, controllo URL e Core Web Vitals."
date: 2026-10-30
categoria: "basi"
etichetta: "SEO"
formato: "guida"
tema: "seo"
minuti: 7
ruoloId: "seo"
inBreve:
  - "**Search Console** è lo strumento gratuito di Google che mostra come il tuo sito appare nelle ricerche."
  - "Il rapporto **Prestazioni** dice clic, impressioni, CTR e posizione media, per ricerca e per pagina."
  - "Il rapporto **Pagine** dice quali pagine sono su Google e perché le altre no."
consiglio: "Quando i clic calano, confronta sempre con lo stesso periodo dell'anno prima: molte ricerche cambiano con le stagioni."
domanda:
  testo: "Una pagina ha 10.000 impressioni e 50 clic. Cosa ti dice?"
  opzioni:
    - testo: "Che Google non la mostra"
    - testo: "Che compare spesso ma pochi cliccano: title e description vanno migliorati"
      giusta: true
    - testo: "Che la pagina non è indicizzata"
  spiegaSi: "CTR dello 0,5%: la pagina viene vista ma non convince. Spesso basta riscrivere title e meta description."
  spiegaNo: "10.000 impressioni vogliono dire che è indicizzata e compare: il problema è che pochi scelgono di cliccare."
faq:
  - d: "Search Console è a pagamento?"
    r: "No, è gratuito. Serve un account Google e dimostrare di gestire il sito."
  - d: "Quanto indietro arrivano i dati?"
    r: "Il rapporto Prestazioni mostra fino a 16 mesi: abbastanza per confrontare un mese con lo stesso mese dell'anno prima."
  - d: "Search Console e Google Analytics sono la stessa cosa?"
    r: "No. Search Console racconta cosa succede su Google, prima del clic. Analytics racconta cosa fanno le persone sul sito, dopo il clic."
argomenti: ["SEO", "Google", "Strumenti"]
---

Se lavori in SEO, Search Console è la prima scheda che apri la mattina. È gratuita, è di Google e risponde alla domanda più importante: **come vede Google il mio sito?**

## Come si attiva

1. Vai su Search Console con un account Google.
2. Aggiungi il sito (la "proprietà").
3. Dimostra che è tuo: di solito con un record nel DNS del dominio o con un file caricato sul sito.
4. Invia la **sitemap**, il file con l'elenco delle pagine.

I dati iniziano a comparire nei giorni successivi.

## I 4 rapporti da conoscere subito

### 1. Prestazioni

Mostra, per ogni ricerca e per ogni pagina:

| Numero | Cosa vuol dire |
| --- | --- |
| **Impressioni** | Quante volte il sito è comparso nei risultati |
| **Clic** | Quante volte qualcuno ha cliccato |
| **CTR** | Clic ÷ impressioni: quanto il risultato convince |
| **Posizione media** | In che posizione compare, in media |

Si può filtrare per periodo, pagina, Paese e dispositivo, e confrontare due periodi.

### 2. Pagine (indicizzazione)

Dice quante pagine sono su Google e, per le altre, **il motivo**: escluse da un noindex, non trovate (404), duplicate senza canonical, scansionate ma non indicizzate. Dopo aver corretto un problema si può chiedere a Google di **convalidare la correzione**. Le differenze tra noindex e canonical sono spiegate in [noindex, robots.txt e canonical](/blog/noindex-robots-txt-canonical/).

### 3. Controllo URL

Scrivi l'indirizzo di una pagina e vedi cosa ne sa Google: se è indicizzata, quando l'ha visitata, quale canonical ha scelto. Da qui si può **richiedere l'indicizzazione** di una pagina nuova o aggiornata.

### 4. Core Web Vitals

Raggruppa le pagine in buone, da migliorare e scarse, per telefono e computer. Cosa misurano è spiegato in [Core Web Vitals spiegati semplici](/blog/core-web-vitals/).

## Una routine da 10 minuti

1. **Prestazioni**: clic e impressioni rispetto al mese prima e all'anno prima.
2. **Pagine**: ci sono nuovi motivi di esclusione?
3. **Le pagine più importanti**: un controllo URL veloce sulle due o tre pagine che vendono di più.

## Un esempio

Nel negozio finto Cinque Foglie, a ottobre i clic da Google erano calati. Le Prestazioni hanno mostrato due cause diverse: le ricerche dei tè freddi in calo (normale, succede ogni autunno) e le tisane quasi sparite. Il rapporto Pagine ha spiegato il perché: dal cambio di tema, le tisane avevano un noindex. Un problema vero e uno stagionale, distinguibili solo guardando i dati.

Nella Simulazione SEO di Marketing Mix c'è una Console di ricerca ispirata a Search Console, con questi rapporti e dati inventati ma coerenti.
