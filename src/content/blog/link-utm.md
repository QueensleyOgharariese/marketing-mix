---
title: "Link UTM: cosa sono e come usarli"
description: "Cosa sono i parametri UTM, a cosa servono source, medium e campaign e come scriverli sempre allo stesso modo, con un esempio di newsletter."
date: 2026-10-26
categoria: "basi"
etichetta: "Analytics"
formato: "pillola"
tema: "basi"
minuti: 4
ruoloId: "analytics"
strumentoId: "link-utm"
inBreve:
  - "Gli UTM sono **etichette** aggiunte alla fine di un link."
  - "Dicono agli strumenti di analisi **da dove arriva** una visita."
  - "Le tre che servono sempre: **source, medium e campaign**, scritte sempre allo stesso modo."
consiglio: "Tieni un foglio condiviso con le regole degli UTM del team: è il modo più semplice per avere report che tornano."
domanda:
  testo: "Che utm_medium metti nel link di una newsletter?"
  opzioni:
    - testo: "social"
    - testo: "email"
      giusta: true
    - testo: "Newsletter Ottobre!!"
  spiegaSi: "La newsletter arriva per email: il medium dice il tipo di canale."
  spiegaNo: "Social è un altro canale; e \"Newsletter Ottobre!!\" è un nome di campagna scritto male, non un medium."
faq:
  - d: "Gli UTM raccolgono dati sulle persone?"
    r: "No, da soli sono solo testo nel link. Le visite si misurano con lo strumento di analisi del sito, che deve rispettare il consenso ai cookie."
  - d: "Posso usare gli UTM nei link interni del mio sito?"
    r: "Meglio di no: rischi di cambiare la provenienza della visita a metà, e i report diventano confusi. Usali per i link che portano al sito da fuori."
argomenti: ["Analytics", "Email", "Social"]
---

Hai mandato una newsletter e pubblicato un post: il giorno dopo il sito ha più visite. Ma quante arrivano dalla newsletter e quante dal post? Senza UTM, spesso non lo sai.

## Cosa sono i parametri UTM?

Sono etichette che aggiungi alla fine di un link, dopo il punto di domanda. Non cambiano la pagina che si apre: servono agli strumenti di analisi, come Google Analytics, per capire da dove arriva la visita.

Un esempio dalla newsletter di Cinque Foglie, l'azienda finta di Marketing Mix:

`cinquefoglie.example/tisane-della-sera?utm_source=newsletter&utm_medium=email&utm_campaign=tisane-ottobre`

## Le tre etichette che servono sempre

| Etichetta | Cosa dice | Esempio |
| --- | --- | --- |
| `utm_source` | Chi manda la visita | newsletter, instagram |
| `utm_medium` | Il tipo di canale | email, social, cpc |
| `utm_campaign` | Il nome della campagna | tisane-ottobre |

Ce ne sono altre due facoltative: `utm_term` (la parola chiave, negli annunci) e `utm_content` (per distinguere due link nella stessa email, per esempio il bottone in alto e quello in fondo).

## Le regole per non fare confusione

- **Sempre minuscolo**: "Newsletter" e "newsletter" diventano due fonti diverse nei report.
- **Trattini al posto degli spazi**: "tisane-ottobre", non "Tisane ottobre".
- **Medium comuni**: usa valori come email, social o cpc, che gli strumenti di analisi riconoscono per raggruppare le visite per canale.
- **Nomi che si capiscono**: tra sei mesi "campagna1" non dirà niente a nessuno.

## Cosa non fanno gli UTM

Gli UTM non contano nulla da soli. Le visite vengono misurate dallo strumento di analisi del sito, che in Italia deve partire solo dopo il consenso ai cookie, quando non è anonimo. Quindi alcune visite non saranno contate: è normale.
