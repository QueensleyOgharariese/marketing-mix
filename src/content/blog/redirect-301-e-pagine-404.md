---
title: "Redirect 301 e pagine 404: cosa sono e quando usarli"
description: "Cos'è una pagina 404, cos'è un redirect 301 e come si gestiscono quando un prodotto cambia indirizzo o non esiste più. Con esempi."
date: 2026-10-30
categoria: "basi"
etichetta: "SEO"
formato: "pillola"
tema: "seo"
minuti: 5
ruoloId: "seo"
inBreve:
  - "Una **pagina 404** dice: «questa pagina non esiste»."
  - "Un **redirect 301** dice: «questa pagina si è spostata per sempre, eccola qui» e porta la persona al nuovo indirizzo."
  - "Si fa il redirect verso la pagina **più simile**, non sempre verso la home."
consiglio: "Quando cambi l'indirizzo di una pagina, prepara il redirect prima di pubblicare, non dopo che qualcuno ti segnala l'errore."
domanda:
  testo: "Il prodotto «Earl Grey classico» è stato sostituito dall'«Earl Grey biologico». Cosa fai con il vecchio indirizzo?"
  opzioni:
    - testo: "Lo lascio in 404"
    - testo: "Redirect 301 verso la home"
    - testo: "Redirect 301 verso la pagina dell'Earl Grey biologico"
      giusta: true
  spiegaSi: "È la pagina più vicina a quello che la persona cercava: chi arriva dal vecchio link trova subito il nuovo prodotto."
  spiegaNo: "Il 404 fa perdere chi arriva da link vecchi; la home costringe a cercare di nuovo, e Google può trattare quel redirect come un 404."
faq:
  - d: "Che differenza c'è tra 301 e 302?"
    r: "Il 301 è uno spostamento definitivo, il 302 temporaneo. Per un cambio di indirizzo che resta, si usa il 301."
  - d: "Le pagine 404 sono un problema per la SEO?"
    r: "Non sempre. Una pagina che non esiste più e non ha sostituti può restare in 404. Il problema è quando la pagina aveva visite o link e c'è un'alternativa."
  - d: "Cos'è una catena di redirect?"
    r: "Quando A porta a B e B porta a C. Rallenta e disperde i segnali: meglio portare A direttamente a C."
argomenti: ["SEO", "SEO tecnica"]
---

I siti cambiano: prodotti nuovi, indirizzi rinominati, pagine eliminate. Ogni volta, qualcuno può ancora arrivare dal vecchio indirizzo: da un link su un altro sito, da un preferito, da Google. Cosa trova dipende da come hai gestito il cambio.

## La pagina 404

Il numero 404 è un **codice di stato**: il messaggio con cui il server dice "questa pagina non c'è". Una buona pagina 404 aiuta comunque la persona: spiega cosa è successo e propone link utili (categorie, ricerca, home).

## Il redirect 301

Un redirect manda automaticamente la persona (e Google) da un indirizzo a un altro. Il **301** significa "spostato per sempre": Google capisce che la pagina nuova prende il posto della vecchia e le passa i suoi segnali.

## Quando usare cosa

| Situazione | Cosa fare |
| --- | --- |
| La pagina ha cambiato indirizzo | 301 verso il nuovo indirizzo |
| Il prodotto è sostituito da uno simile | 301 verso il prodotto nuovo |
| Il prodotto non esiste più e non ha sostituti | 301 verso la categoria, oppure 404 |
| La pagina non è mai esistita (errore di battitura) | 404 |

## Le catene di redirect

Quando un sito cambia struttura più volte, i redirect si accumulano: `/prodotto.php?id=12` porta a `/te-verdi/sencha/`, che porta a `/te-verdi/sencha-bio/`. Ogni passaggio rallenta. Si sistema facendo puntare il primo indirizzo **direttamente** all'ultimo.

## Come si trovano

- In **Search Console**, nel rapporto delle pagine, ci sono quelle "non trovate (404)".
- Un **crawler** (un programma che visita tutto il sito come Google) elenca i link interni rotti e le catene di redirect.

Nella Simulazione SEO di Marketing Mix si fanno entrambe le cose: si trova una pagina 404 con link da altri siti e una catena di redirect, e si sistemano dal pannello del negozio.
