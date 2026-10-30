# Diario di progetto: piattaforma per imparare il marketing facendo

Ultimo aggiornamento: 24/10/2026
Scopo: tenere traccia di ogni decisione, per il case study e per imparare.

## 1. Regole di lavoro (valgono sempre)

1. Codice semplice (HTML, CSS, JavaScript base).
2. Solo contenuti gratuiti e con licenza che ne permetta l'uso.
3. Rispetto della legalità nell'Unione Europea (GDPR, ePrivacy/cookie, licenze).
4. Ricontrollare sempre ciò che si produce.
5. Spiegare ogni passaggio in modo semplice (il progetto serve anche a imparare).
6. Registrare tutto in questo diario.

## 2. Il progetto in breve

- Problema: gli studenti non conoscono i ruoli del marketing (SEO, CRM, brand, partnerships, martech...) e non possono provare strumenti reali. I junior in piccole aziende non possono esercitarsi su casi grandi.
- Pubblico principale: studenti. Dopo: junior (livello intermedio e avanzato = difficoltà diverse degli stessi scenari).
- Componenti: sito di presentazione, app con azienda finta ed esercizi, strumenti gratuiti, blog, newsletter.
- Idea chiave: il valore sta negli scenari e nei dati, non nell'app.

## 3. Ordine di costruzione

0. Scegliere le aree di marketing e l'ordine (FATTO)
1. Mappa interattiva dei ruoli + blog + strumenti gratuiti (FATTO: mappa ruoli, mappa blog, mappa strumenti; da costruire davvero)
   Base tecnica scelta (FATTO). Scheletro del sito creato e su GitHub (FATTO)
   Prossimo: collegare GitHub a Claude, pubblicare su Cloudflare, poi stile del sito (moodboard) (**siamo qui**)
2. Un solo ruolo giocabile, 3-4 esercizi guidati
3. Livelli di difficoltà sullo stesso scenario
4. Altri ruoli, uno alla volta, solo dopo aver visto che il primo viene usato

## 4a. Mappa completa di aree e ruoli del marketing

1. Strategia e brand: marketing manager / CMO, brand manager, brand strategist, ricerca di mercato e consumer insights.
2. Acquisizione digitale: SEO specialist, SEA/PPC (annunci sui motori di ricerca), paid social, performance marketer, affiliate marketing, growth marketer.
3. Contenuti e social: content strategist, copywriter, social media manager, community manager, video e podcast, influencer marketing.
4. Relazione con il cliente: CRM manager, email marketing, lifecycle/retention, loyalty (programmi fedeltà), customer marketing.
5. Prodotto: product marketing manager, go-to-market (lancio prodotti), pricing, sales enablement (materiali per i venditori).
6. Vendite, canali e retail: trade marketing, category manager, shopper marketing, visual merchandising, e-commerce e marketplace manager.
7. Marketing B2B: demand generation, account-based marketing (ABM), field marketing ed eventi di settore.
8. Comunicazione e relazioni: PR e ufficio stampa, comunicazione aziendale, comunicazione interna, partnerships, eventi e sponsorizzazioni.
9. Dati e tecnologia: martech specialist, marketing automation, marketing operations, web/marketing analyst, CRO (ottimizzazione delle conversioni).
10. Internazionale: international marketing, localizzazione dei contenuti.

Nota: nelle aziende piccole una persona copre più ruoli; nelle grandi i ruoli sono separati.

## 4b. Scelta delle aree (versione studenti)

Parte 1 (decisa): brand manager, SEO, SEA/PPC, social media, influencer marketing, CRM.
Parte 2: tutti gli altri ruoli della mappa 4a.

Struttura decisa da Queen (24/10/2026), versione studenti:
1. Marketing Hub 1 (marketing mix, semplice): lo studente prova tutti e 6 i ruoli della parte 1.
2. Marketing Hub 2: lo studente prova gli altri ruoli (parte 2).
3. Percorsi focalizzati su un solo ruolo (es. SEO, brand, PPC).
Logica: prima provare tutto, poi specializzarsi.

Dettagli confermati da Queen (24/10/2026):
- I percorsi focalizzati sono uno per ruolo (SEO, brand, PPC erano solo esempi).
- Ogni hub ha il suo sito di azienda finta: Hub 1 = un sito, Hub 2 = un altro sito.
- Percorsi focalizzati: un unico sito, visto ogni volta dal punto di vista di un ruolo diverso (prima SEO, poi brand, ecc.).
- Livelli del prodotto: Studente (Hub 1, Hub 2, percorsi focalizzati), poi Junior, poi Junior avanzato. Si parte dal livello Studente, il più importante e il più grande.
- Domanda chiusa (24/10/2026): i percorsi focalizzati riusano il sito dell'Hub 1, ma molto più approfondito (più pagine, più dati, più storico).

Proposta di Claude per l'Hub 1 (in attesa di conferma): un'azienda finta unica e un esercizio breve per ciascun ruolo (6 esercizi). L'Hub 1 diventa la prima versione da testare.

Proposta precedente di Claude (superata dalla struttura a hub):
- Un'unica azienda finta per tutti e 6 i ruoli: ogni ruolo lavora su una parte diversa degli stessi dati.
- Mappa e blog coprono subito tutti e 6 i ruoli. Gli esercizi giocabili si costruiscono uno alla volta.
- Ordine degli esercizi: SEO, SEA/PPC, social media, influencer marketing, CRM, brand.
- Motivo: SEO e SEA condividono le keyword; social e influencer condividono contenuti e metriche; il brand è più difficile da correggere perché le risposte sono meno "giuste o sbagliate".

## 4c. Ruoli dell'Hub 2 (CONFERMATI da Queen il 24/10/2026)

Regola confermata da Queen: i ruoli "figli" vivono nei percorsi focalizzati (e poi nei livelli Junior), non nell'Hub 1. Nell'Hub 1 lo studente prova il ruolo principale in modo leggero.

Percorsi focalizzati e ruoli che contengono:
- SEO → content strategist, copywriting
- SEA/PPC → performance marketing, paid social
- Social media → community management, video
- Influencer marketing → contenuti sponsorizzati e regole di trasparenza
- CRM → email marketing, lifecycle, loyalty
- Brand → brand strategy

Problema: i ruoli rimasti dalla mappa 4a sono più di 30, troppi per un solo hub.

Passo 1, ruoli già coperti dall'Hub 1 (diventano esercizi dentro quei ruoli):
- copywriter, content strategist → SEO e social
- paid social → SEA e social
- community manager → social
- email marketing, lifecycle, loyalty → CRM
- brand strategist → brand manager
- e-commerce manager → contesto dell'azienda finta dell'Hub 1

Passo 2, ruoli dell'Hub 2 (6, come l'Hub 1):
1. Product marketing (lancio di un prodotto)
2. Trade marketing (vendita nei negozi e con i distributori)
3. PR e comunicazione (ufficio stampa, comunicati, crisi)
4. Partnerships (collaborazioni con altre aziende)
5. Ricerca di mercato e consumer insights
6. Marketing analytics / martech (dati, strumenti, automazioni)

Passo 3, ruoli rimandati al livello Junior (troppo avanzati per studenti): marketing manager/CMO, demand generation, ABM, pricing, marketing operations, growth, international.

Azienda finta dell'Hub 2: deve vendere anche nei negozi fisici (serve per trade marketing). Esempio: azienda di prodotti di consumo venduti in supermercati e online.

## 4. Passo 0: aree di marketing (PROPOSTA SUPERATA, in attesa di scelta sulla mappa 4a)

Criteri per scegliere l'ordine:
- A) quanto conosci già l'area (così verifichi bene gli esercizi);
- B) quanto è facile creare dati finti realistici;
- C) quanti strumenti gratuiti si possono costruire;
- D) quanto è richiesta dagli studenti.

Ordine proposto:
1. SEO (la conosci già, dati simulabili: keyword, pagine, traffico)
2. Content marketing / copywriting (legato alla SEO, riusa gli stessi dati)
3. CRM ed email marketing (dati simulabili: contatti finti, campagne)
4. Brand
5. Product marketing
6. Partnerships
7. Trade marketing
8. Martech

Da fare: confermare o cambiare quest'ordine. Prima area giocabile suggerita: SEO.

## 4d. Mappa interattiva dei ruoli, versione 1 (24/10/2026)

File: mappa-ruoli.html (pubblicata come pagina privata, si condivide dal menu Condividi).

Contenuto:
- 12 ruoli (6 Hub 1 + 6 Hub 2). Per ognuno: cosa fa, giornata tipo, strumenti gratuiti, ruoli figli del percorso focalizzato, "ti piace se...".
- Percorso del cliente in 4 fasi (farsi conoscere, farsi trovare, convincere e vendere, far tornare e misurare): spiega perché esistono ruoli diversi.
- Filtri Hub 1 / Hub 2. Elenco dei ruoli del livello Junior.

Scelte tecniche (spiegate semplici):
- Solo HTML, CSS e JavaScript base, tutto in un file.
- I ruoli stanno in una lista di dati dentro lo script: per aggiungerne uno si copia un blocco e si cambiano i testi.
- Le schede si aprono con <details>: funziona anche senza JavaScript ed è accessibile da tastiera.
- Tema chiaro e scuro automatico.

Scelte legali UE:
- Solo font di sistema, nessun Google Fonts: caricarli da Google invia l'indirizzo IP a terzi (sentenza del Tribunale di Monaco, 2022).
- Nessun cookie, nessun tracciamento: non serve il banner.
- Nomi degli strumenti citati solo come riferimento, senza loghi. Le versioni gratuite vanno ricontrollate prima del lancio.

Da fare: rivedere i testi con Queen; decidere se la mappa diventa la home del sito o una pagina a parte.

## 4e. Mappa del blog e degli strumenti, versione 1 (24/10/2026)

File: mappa-blog-strumenti.html (pagina privata).

Blog:
- 48 articoli in 15 gruppi. Ogni gruppo = 1 articolo principale (pillar) + 2-3 articoli di supporto (cluster).
- 3 ondate: 1) basi + ruoli Hub 1; 2) ruoli Hub 2; 3) carriera e regole (GDPR, cookie, licenze immagini).
- Ogni articolo ha una keyword di partenza. I volumi NON sono stati stimati: vanno verificati con Google Keyword Planner.
- Ogni gruppo è collegato a uno strumento gratuito (link interni tra blog e strumenti).

Strumenti gratuiti (12, uno per ruolo):
- Tutti funzionano nel browser: i dati inseriti non escono dal computer dell'utente (niente GDPR da gestire per gli strumenti).
- Primi tre: generatore di link UTM, anteprima risultato Google, calcolatore engagement rate.
- Motivo: facili da costruire, utili subito, il secondo è il ruolo che Queen conosce meglio.

Ricontrollo fatto: script senza errori; ogni articolo punta a uno strumento che esiste nella lista.

## 4f. Base tecnica del sito (24/10/2026)

Decisioni di Queen:
- Generatore del sito: Astro (open source, gratuito). Motivo: il blog ha 48 articoli; con Astro menu e intestazione si scrivono una volta sola e gli articoli sono file di testo (Markdown). Il risultato finale è HTML semplice.
- Hosting: Cloudflare Pages. Motivo: Queen lo usa già per un altro progetto. (Aggiornato il 25/10/2026: si usa Cloudflare Workers con file statici, vedi registro.)
- Requisito: poter modificare a mano titoli e testi senza toccare il codice.

Confronto valutato:
- HTML puro: semplice ma scomodo con 48 articoli (menu copiato in ogni file).
- WordPress: comodo ma hosting a pagamento e plugin.
- Astro: scelto.

Proposta di Claude per le modifiche manuali (in attesa di conferma):
1. Tutti i testi modificabili stanno in file separati dal codice: titolo e descrizione in cima a ogni articolo (frontmatter), testi generali in un file di impostazioni, ruoli e strumenti in file di dati.
2. Pannello di modifica: Pages CMS (gratuito, licenza MIT, nessun database o server, funziona anche da telefono). Si collega al repository GitHub.
3. Flusso: modifica in Pages CMS → salvataggio su GitHub → Cloudflare ricostruisce il sito da solo.
- Alternativa scartata per ora: Keystatic (richiede adapter, React e configurazione in più).
- Nota UE: GitHub e Cloudflare sono aziende USA; verificare adesione al Data Privacy Framework e accordo sul trattamento dati. I contenuti del sito non sono dati personali degli utenti.

Rimandati al passo 2: database e account utenti, servizio newsletter.

## 4g. Setup di lavoro su Claude (24/10/2026, proposta)

Collegamenti suggeriti: GitHub (necessario), Canva (grafiche), Figma (solo se si progettano le pagine lì), Cloudflare (utile dal passo 2).

Skill utili già disponibili: frontend-design, design-system, accessibility-review, ux-copy, code-review, seo-check / technical-seo / schema-markup, content-creation, skill Canva.
Skill personale "marketing-hub-regole" proposta il 24/10/2026: codice semplice e stack, licenze, checklist legale UE, design non generico, spiegazioni semplici, ricontrollo, aggiornamento del diario.
Collegati da Queen il 24/10/2026: Canva, Figma, Cloudflare. Nota: il connettore Cloudflare collegato risulta deprecato; Cloudflare indica come sostituto il suo nuovo server API MCP.

3D e animazioni (licenze verificate il 24/10/2026):
- Three.js: licenza MIT, per una scena 3D principale.
- GSAP: gratuito anche per uso commerciale, plugin inclusi (licenza propria di GSAP, non open source classica).
- Animazioni CSS e transizioni di Astro per i dettagli.
- Regole: rispettare "riduci movimento", caricare il 3D solo quando serve, immagine di riserva, controllare i Core Web Vitals.
- Remotion: fa video, non animazioni del sito. Gratuito per singoli e team fino a 3 persone. Utile per video promo e case study.
- Canva Pro: ok per grafiche del sito, ma limite di pixel per media non modificati, divieto di usarne i contenuti nei loghi e nei template.

## 4h. Scheletro del sito (24/10/2026)

Repository: github.com/QueensleyOgharariese/marketing-mix (vuoto all'inizio).

Cosa contiene (commit "Scheletro del sito con Astro"):
- Astro 7.3.8 (scelta una versione uscita da più di due settimane, per stabilità).
- Layout comune: menu, footer, titolo nella scheda, descrizione per Google, link canonico.
- Pagine: home, /ruoli/ (12 ruoli letti da src/data/ruoli.json), /blog/ e una pagina per ogni articolo.
- Articolo di esempio "Cosa fa un SEO specialist", in bozza: si vede solo in locale, non sul sito pubblicato.
- Controllo dei campi degli articoli (content.config.ts): se manca il titolo o la descrizione supera 160 caratteri, la build si ferma.
- Testi modificabili senza codice: impostazioni.json, frontmatter degli articoli, pannello Pages CMS (.pages.yml).
- Stile provvisorio in global.css (token): lo stile vero arriva dopo la moodboard.
- README in italiano (dove sta cosa, come cambiare un testo) e LICENZE.md (registro licenze).

Scelte legali: solo font di sistema, nessun cookie, nessun script di terzi, "riduci movimento" rispettato.
Nota: Astro raccoglie statistiche anonime d'uso sul computer di chi sviluppa (telemetria). Non riguarda i visitatori. Si può disattivare con "npx astro telemetry disable".

Ricontrollo fatto: build senza errori (3 pagine); bozza visibile in locale e nascosta in produzione; screenshot a 1200px e 390px, tema chiaro e scuro, nessuno scorrimento orizzontale.

Risolto (24/10/2026): Queen ha installato l'app GitHub di Claude; scheletro inviato su GitHub (branch main). Aggiunto il file .node-version (Node 22) perché Cloudflare usi la versione giusta di Node nella build.
Da fare dopo: Pages CMS: aggiungere la modifica dei ruoli; verificare il pannello sul repository vero.

## 4i. Pagina "Cose da imparare" (24/10/2026)

Richiesta di Queen: una pagina per studiare i concetti importanti del progetto, divisa tra "da imparare" e "imparate".
Link: https://claude.ai/artifact/JzJbYkqQnCzfkb6ZmFvWMo (privata).
- 40 concetti in 5 argomenti: marketing, web e codice, Astro e pubblicazione, legge e licenze UE, metodo.
- Ogni concetto: spiegazione semplice, esempio nel progetto, domanda di ripasso con risposta nascosta.
- I segni "imparato" restano nel browser del dispositivo (non sincronizzati tra telefono e computer).
- Regola: a ogni lavoro nuovo si aggiungono i concetti nuovi a questa pagina (aggiunta alla skill del progetto).

## 4j. Direzioni di stile (24/10/2026, in attesa di scelta)

Richiesta di Queen: look professionale ma giocoso, animato e approcciabile.
Canvas: https://claude.ai/artifact/LCTttUw2DiXeLWjFKWC4jZ (3 versioni della home).
- A · Quaderno vivo: adesivi dei ruoli che fluttuano, evidenziatore giallo animato sul titolo, bordi e ombre "disegnate". Font: Bricolage Grotesque + Atkinson Hyperlegible.
- B · Ufficio in miniatura: l'azienda finta come ufficio isometrico, ogni scrivania è un ruolo che si solleva. Base naturale per il 3D con Three.js. Font: Familjen Grotesk + Figtree.
- C · Livelli e badge: stile gioco, barra dei punti, ruoli da sbloccare, missione del giorno. Font: Rubik + JetBrains Mono.
Tutti i font proposti hanno licenza SIL OFL: sul sito vero vanno scaricati e ospitati da noi (nella bozza del canvas sono caricati da Google solo per l'anteprima).
Tutte le animazioni si fermano con "riduci movimento".

Aggiornamento 24/10/2026: Queen ha scartato A, B e C (restano sulla tela per il case study).
Decisione di Queen: colore principale arancione; simbolo del brand una pesca.
Nuove proposte di Claude (in attesa di scelta):
- D · Pesca solare: sfondo bianco, pesca mascotte grande su cerchio pesca chiaro, etichette dei ruoli che fluttuano, fumetto di benvenuto. Font: Gabarito + Figtree (SIL OFL).
- E · Pesca e blu notte: parte alta blu notte con la pesca che "brilla", nastro arancione con i 12 ruoli che scorre. Font: Bricolage Grotesque + Atkinson Hyperlegible (SIL OFL).
La pesca è un disegno originale in SVG (nessun personaggio esistente): sbatte gli occhi, rimbalza, muove la foglia.
Accessibilità: sui bottoni arancioni il testo è scuro, perché il bianco sull'arancione non è abbastanza leggibile.

Aggiornamento 24/10/2026: Queen ha scelto D (Pesca solare) e ha chiesto 5 varianti con pesche e hero diverse.
Varianti proposte (in attesa di scelta), stessa palette e stessi font della D:
- D1 · Pesca-logo: pesca geometrica senza faccia che sostituisce la "a" di "facendolo" in un titolo gigante; ruoli come etichette sotto.
- D2 · Pesca studentessa: pesca con occhiali che sbircia da un'anteprima di esercizio SEO (titolo che si scrive da solo, contatore caratteri).
- D3 · Pesca aperta: mezza pesca enorme con il nocciolo che gira; al centro una scritta che cambia ("dentro c'è la SEO, il brand...").
- D4 · Pesca adesivo: pesca con bordo bianco che saluta con la mano, al centro di una griglia di riquadri dei ruoli.
- D5 · Pesca 3D: pesca realistica con luci e ombre fatte in CSS, che fluttua; i ruoli le girano intorno come pianeti. Anticipa il 3D con Three.js.
Nota: nella D2 la "borraccia termica" è solo un esempio; il settore dell'e-commerce è ancora da decidere.

Aggiornamento 24/10/2026: Queen sceglie di unire D, D2, D3 e D4 in una home completa (tavola "Home" sulla tela).
Struttura della home (proposta di Claude):
1. Apertura (D): "Il marketing si impara facendolo", pesca che saluta, etichette dei ruoli.
2. Dentro il marketing (D3): mezza pesca con il nocciolo che gira, "dentro c'è la SEO, il brand...".
3. Scegli un ruolo (D4): griglia dei 6 ruoli dell'Hub 1 con la pesca adesivo.
4. Esercizi (D2): sezione scura con la pesca con gli occhiali e l'anteprima dell'esercizio SEO.
5. Come funziona: 3 passi.
6. Newsletter con casella di consenso e link all'informativa privacy (GDPR), poi footer.
Idea che tiene insieme tutto: una sola mascotte con pose diverse.

Aggiornamento 24/10/2026: Queen approva la struttura della home ma chiede di migliorarla. Creata "Home v2" accanto alla v1 (prima e dopo per il case study).
Miglioramenti della v2 (proposta di Claude):
- Apertura: al posto delle etichette, "messaggi" dall'azienda finta (SEO, brand, CRM) che arrivano alla pesca; ombra sotto la pesca; riga con 12 ruoli, 1 azienda finta, 0 €.
- Dentro il marketing: aggiunte le 4 fasi con i ruoli di ciascuna (informazione utile, non solo decorazione).
- Griglia ruoli: ogni riquadro dice cosa fa il ruolo; la pesca adesivo invita a leggere la mappa.
- Esercizi: i 3 passi stanno dentro questa sezione (tolta la sezione "Come funziona", che era ripetuta).
- Nuova sezione: percorso a livelli (Hub 1, Hub 2, percorsi focalizzati, Junior) con la pesca che cammina sulla strada tratteggiata.
- Nuova sezione: 3 strumenti gratuiti, con la frase "quello che scrivi non esce dal tuo computer".
- Newsletter con la pesca postina; footer a colonne.
- Bordi ondulati tra le sezioni e bottoni che si "premono".

Aggiornamento 24/10/2026 (commento di Queen sulla griglia dei ruoli: "migliora questa sezione"):
- Colore dei riquadri legato alla fase del percorso del cliente, con legenda.
- Ogni ruolo: icona, cosa fa, esercizio che lo studente farà, freccia animata.
- Pesca adesivo su fondo arancione con consiglio "Parti dalla SEO" e bottone.
- Riquadro finale che anticipa i 6 ruoli dell'Hub 2.

Aggiornamento 24/10/2026 (commento di Queen: "migliora il footer che è banale"):
- Footer scuro con la pesca che si affaccia dal bordo.
- Ultimo invito all'azione ("Pronta o pronto per il primo giorno?") e "Torna su".
- 4 colonne: Impara, Percorso, Il progetto, Trasparenza (privacy, licenze, nessun cookie).
- Etichette su come è fatto il sito; nome "Marketing Mix" gigante in fondo.

Aggiornamento 24/10/2026 (commento di Queen: "metti 6 strumenti"): la sezione strumenti ora ha 6 strumenti, uno per ogni ruolo dell'Hub 1 (UTM, anteprima Google, engagement, CPC/CPA/ROAS, checklist post sponsorizzato, retention e valore cliente), più il link a tutti i 12.

Aggiornamento 24/10/2026 (commento di Queen: i riquadri dei ruoli sono "basic" e hanno colori brutti):
- Riquadri sostituiti da "pass" dell'azienda finta (come i badge del primo giorno di lavoro): fascetta scura con foro, numero, icona, nome del ruolo, cosa fa, primo compito.
- Solo colori del brand (bianco, marrone scuro, arancione, pesca); tolti i colori legati alle fasi.
- I pass dondolano dal foro al passaggio del mouse.
- Hub 2 mostrato come una pila di pass.
Lezione per il case study: legare un elemento grafico all'idea del prodotto (entrare in un'azienda) funziona meglio di un riquadro generico.

Aggiornamento 24/10/2026 (commento di Queen sulla pesca aperta: migliorare design e animazione):
- Polpa sfumata come una pesca vera, fibre, buccia e nocciolo con luci.
- La metà con la faccia della mascotte si apre come un coperchio, mostra il nocciolo e si richiude; gocce di succo.
- Anello di testo con i 12 ruoli che gira intorno; scritta "Dentro c'è" spostata sotto.
- Con "riduci movimento" la pesca resta aperta e ferma.

Aggiornamento 24/10/2026 (altri 3 commenti di Queen sulla tela):
- La pesca della griglia "parla": fumetto con 5 frasi che cambiano (un consiglio per ruolo), bocca animata.
- Percorso a livelli: la pesca salta di tappa in tappa (si schiaccia e si allunga), i pallini delle tappe si accendono.
- Nuova sezione "Strumento in azione": demo animata dell'Anteprima risultato di ricerca (titolo che si scrive, contatori, risultato finale).
- Nuova sezione "Dal blog": 3 articoli del piano con copertine nei colori del brand.
- Poi (commento di Queen "le icone sono brutte"): ogni copertina è una piccola scena con la pesca, con testo alternativo per l'accessibilità.

## 4k. Sito multilingua (decisione di Queen, 24/10/2026)

Il sito sarà in italiano e inglese (IT/EN).
- Navbar: selettore di lingua IT | EN (aggiunto nella Home v2).
Proposta tecnica di Claude per Astro (da applicare nella costruzione):
- un indirizzo per lingua (es. /it/ruoli/ e /en/roles/) con il routing multilingua di Astro;
- tag hreflang su ogni pagina e attributo lang corretto;
- testi separati per lingua in dati, articoli e pannello Pages CMS;
- il piano del blog e le keyword vanno fatti anche per l'inglese (le keyword non si traducono parola per parola).

## 4l. Azienda finta dell'Hub 1 e correzione (decisioni di Queen, 24/10/2026)

- Settore dell'e-commerce: tè (proposta di Queen). Nome provvisorio dell'azienda: "Cinque Foglie" (da verificare che non sia un marchio registrato prima del lancio).
  Perché funziona: catalogo con categorie chiare (verdi, neri, tisane, matcha, accessori), ricerche a coda lunga per la SEO, stagionalità per SEA e social, abbonamenti per il CRM, mondo benessere per gli influencer. E si lega alla pesca (tè alla pesca).
  Attenzione legale da insegnare: nell'UE le indicazioni sulla salute degli alimenti sono regolate (Reg. CE 1924/2006). Frasi come "brucia i grassi" non si possono usare: diventa un controllo negli esercizi.
- Correzione degli esercizi: mix. Controlli automatici per le parti misurabili (lunghezza, keyword presente, calcoli, regole) + soluzione di riferimento e autovalutazione per le parti creative.

## 4m. Design del prodotto, versione 1 (24/10/2026)

Tela: https://claude.ai/artifact/XpoxpUA5a4KxPVM8Qimfr1 ("Prodotto Marketing Mix"). Flusso di 5 schermate dell'Hub 1, collegate tra loro:
1. Benvenuto in azienda: Pesca tutor si presenta, scheda di Cinque Foglie (numeri inventati e segnalati come tali), categorie, colleghi (Marta fondatrice, Luca e-commerce, Sara social), scelta del primo pass.
2. Scrivania: menu con i 6 ruoli e i dati dell'azienda; richieste in arrivo dai colleghi; consiglio di Pesca; progressi.
3. Esercizio SEO (pagina del tè Sencha): richiesta, tabella delle ricerche (dati simulati, con avviso su "benefici"), area di lavoro con contatori, controlli automatici, anteprima nei risultati, aiuti di Pesca che costano punti.
4. Correzione mix: punteggio automatico (40) + autovalutazione (60), confronto affiancato con la soluzione di un professionista e il perché, risposta di Marta, cosa hai imparato.
5. Fine dell'Hub 1: punti e gradimento per ruolo, consiglio del percorso focalizzato, Hub 2, riepilogo per il CV.
Scelte: indirizzi d'esempio con dominio .example (riservato, non esiste davvero); ogni dato dell'azienda è inventato e dichiarato.
Da decidere: come salvare i progressi (serve un account o basta il browser?) → tema del passo 2 (database e GDPR).

Aggiornamento 24/10/2026: Queen approva la mascotte ma chiede un prodotto più professionale. Creata la versione 2 delle 5 schermate (stessa tela, riga sotto la v1).
Cambi della v2 (proposta di Claude):
- Stile da software di lavoro: sfondo grigio caldo neutro, bordi sottili, angoli più piccoli, niente ombre "disegnate".
- Arancione solo per azioni principali e stato attivo; verde per i controlli superati.
- Struttura da app: barra superiore con percorso (breadcrumb), menu laterale con icone, richieste come una casella email (lista + dettaglio), editor a tre colonne, tabella dei risultati.
- Pesca resta come tutor piccola: avatar nei consigli, non più protagonista.
- Testo neutro rispetto al genere ("Ti diamo il benvenuto").

Aggiornamento 24/10/2026: Queen chiede un mix tra v1 e v2. Creata la versione 3 (terza riga della tela, tavole M1–M5).
Cosa prende da ciascuna (proposta di Claude):
- Dalla v2: barra con il percorso, menu laterale con icone, casella delle richieste (lista + dettaglio), editor a tre colonne, tabella dei risultati, bordi sottili e sfondo neutro.
- Dalla v1: Pesca più presente (riquadro di benvenuto color pesca, fumetti con consigli, occhiali nell'esercizio, festa nella correzione e alla fine), cerchi color pesca per le icone dei ruoli, titoli in Gabarito più decisi, tocchi color pesca per le cose importanti.
- Animazioni brevi: la pesca fa festa solo 3 volte e poi si ferma, per non distrarre dal lavoro.
Decisione di Queen (24/10/2026): la v3 è il design del prodotto. v1 e v2 restano sulla tela per il case study.

## 4n. Progressi, SEO e analytics del sito (decisioni di Queen, 24/10/2026)

Progressi degli studenti: opzione C.
- All'inizio solo nel browser, nessun account e nessun dato personale. Lo studente può scaricare un file con i progressi e il riepilogo per il CV.
- L'account con email arriverà dopo, solo se il prodotto viene usato.
- Motivo legale: in Italia il consenso ai servizi online si può dare da soli dai 14 anni; molti studenti sono minorenni.

Il sito vero raccoglierà i dati base per SEO e analytics (richiesta di Queen). Proposta di Claude:
- SEO: Google Search Console (gratuito; verifica tramite DNS su Cloudflare; dà ricerche, clic, posizioni e pagine indicizzate; non raccoglie dati personali dei visitatori). In più: sitemap automatica, robots.txt, tag hreflang IT/EN, dati strutturati.
- Analytics di base: Cloudflare Web Analytics (gratuito, senza cookie né localStorage, senza fingerprinting): niente banner. Dà visite, pagine, provenienza, paesi e velocità del sito.
- Precisazione di Queen (24/10/2026): i dati servono a lei, come proprietaria del sito, da mostrare nel portfolio e nel case study.
- Confermato da Queen: GA4 + Search Console come strumenti principali (standard riconosciuto dalle aziende), con banner di consenso e Consent Mode; Cloudflare Web Analytics in parallelo, senza cookie, per contare anche chi rifiuta. La differenza tra i due numeri è essa stessa un dato da raccontare nel case study.
- Report per il portfolio: Looker Studio (gratuito) collegato a GA4 e Search Console.
- I dati delle esercitazioni nell'app restano sempre simulati, mai dati veri dei visitatori.

## 4o. Pagine interne: Ruoli, Strumenti, Blog (25/10/2026)

Richiesta di Queen: fare le pagine Ruoli, Strumenti e Blog. Tre tavole nuove sulla tela di stile, sotto la Home v2, con stessa navbar, pesca e footer.
Le pagine sono generate da uno script a partire dai dati delle mappe (ruoli.json, piano del blog, elenco strumenti): testi e numeri restano uguali in tutto il sito.

Ruoli:
- Apertura "12 ruoli del marketing. Trova il tuo." con la pesca con gli occhiali e un pass al collo.
- Le 4 fasi del percorso del cliente, con i ruoli di ciascuna.
- 12 pass con filtri (Tutti, Hub 1, Hub 2, per fase). Ogni pass: cosa fa, "Fa per te se", e un pannello apribile con giornata tipo, strumenti gratuiti e percorso focalizzato. L'Hub 2 mostra "Si sblocca dopo l'Hub 1".
- Quiz "Non sai da dove partire?": 6 risposte, Pesca consiglia un ruolo dell'Hub 1.
- Riquadro con i ruoli del livello Junior (in arrivo).
- Testi "ti piace se" resi neutri rispetto al genere (da riportare anche in ruoli.json).

Strumenti:
- Apertura "Gli attrezzi del mestiere, gratis." con 3 garanzie: niente registrazione, dati nel browser, gratis.
- Demo dell'Anteprima risultato Google con l'azienda finta Cinque Foglie (tè Sencha), con il controllo "nessuna frase sulla salute" (Reg. CE 1924/2006).
- 12 strumenti con filtri (Tutti, Pronti, Hub 1, Hub 2). I primi 3 dell'ordine di costruzione sono "Pronto", gli altri "In arrivo". Ogni strumento rimanda all'articolo con la teoria.
- "Come si usano" in 3 passi e spiegazione semplice del perché i dati non escono dal computer.

Blog:
- Apertura con ricerca e la pesca che legge un libro.
- Articolo in evidenza "Che cos'è il marketing e quali ruoli esistono" (pillar delle basi).
- Guide con filtri (Tutti, Hub 1, Hub 2, Carriera e regole): 6 guide Hub 1, carriera e GDPR, Hub 2 "in scrittura".
- Articoli brevi (cluster) con il tempo di lettura; riquadro "Leggi, poi prova"; newsletter.
- Copertine illustrate con la pesca, una scena per argomento (niente icone nei quadratini).

Scelte tecniche: filtri e quiz fatti solo con CSS (radio nascosti in modo accessibile + :has()), nessun JavaScript. Animazioni ferme con "riduci movimento".
Correzione di coerenza: nel footer "Nessun cookie, nessun tracciamento" non era più vero (abbiamo scelto GA4 con consenso). Ora c'è scritto "Statistiche solo con il tuo consenso", anche nella Home v2.
Da fare: i tempi di lettura sono indicativi e vanno ricalcolati sugli articoli veri. La demo strumento della home usa ancora la borraccia: da passare al tè.
Ricontrollo fatto: pagine misurate a 1280 px e 390 px, senza scorrimento orizzontale; screenshot controllati (sistemate la freccia nella copertina CRM e l'a capo di "Lettura 7 min").

Aggiornamento 25/10/2026: pagina del singolo articolo (tavola "Pagina Articolo (modello)"), richiesta di Queen.
- Esempio: "Cosa fa un SEO specialist", testo originale e semplice. La stessa struttura vale per tutti gli articoli.
- Struttura: percorso (Blog › Guide ai ruoli › SEO), etichetta, titolo, sottotitolo, autrice, data e tempo di lettura, copertina illustrata.
- Testo largo al massimo 720 px (righe facili da leggere), con: riquadro "In 30 secondi", giornata tipo con orari, glossario "Le parole da sapere", "Consiglio di Pesca", strumenti gratuiti, esempio con Cinque Foglie (con la regola UE sulle indicazioni di salute), "Fa per te?".
- Domanda di ripasso "Mettiti alla prova", fatta solo con CSS: la spiegazione compare dopo la risposta.
- Colonna laterale fissa: indice dell'articolo e "Prova subito" (strumento + esercizio).
- Barra di lettura arancione in alto che si riempie mentre scorri (animazione CSS legata allo scorrimento; dove non è supportata non compare).
- In fondo: argomenti, "Continua a leggere", newsletter, footer.
- SEO del modello: un solo H1, H2 per ogni sezione, data con <time>, percorso di navigazione; nel sito vero si aggiungono i dati strutturati Article e BreadcrumbList.

Aggiornamento 25/10/2026: pagina "Il progetto" (about us), richiesta di Queen. Tavola "Pagina Il progetto (about us)".
- Apertura: "Il marketing si impara facendolo." con la pesca che saluta.
- Perché esiste: i 3 problemi del brief (ruoli sconosciuti, strumenti mai provati, casi grandi lontani).
- Come funziona in 3 passi: entri in un'azienda finta, provi i ruoli, scegli la tua strada. Idea chiave: il valore sta negli scenari e nei dati.
- Cosa promettiamo: gratis, dati inventati e dichiarati, privacy (statistiche solo con consenso), contenuti originali e licenze libere, accessibilità.
- Il progetto in numeri: 12 ruoli, 12 strumenti, 48 articoli in programma, 1 azienda finta.
- Chi c'è dietro: Queen (testo in prima persona, da rivedere), link a LinkedIn, case study e GitHub; riquadro su Pesca, personaggio inventato.
- Costruito passo per passo: linea del tempo delle tappe (fatto / prossimo) e link al case study.
- Contatti: "Hai un'idea o vuoi collaborare?" con link a LinkedIn (nessuna email pubblicata per ora).
Deciso da Queen: come avatar resta la "Q" (niente foto). Da decidere: se indicare città o azienda, e quali link mettere (gli indirizzi veri).

## 4p. Costruzione del sito: la base (26/10/2026)

Sito online: https://marketing-mix.queensleyk10.workers.dev/ (Cloudflare Workers, file statici). Ogni invio su GitHub ricostruisce e pubblica il sito.
Problema risolto: la prima build falliva perché mancava la configurazione; Cloudflare provava a installare da solo l'adattatore @astrojs/cloudflare, che richiede Astro 7.4. Soluzione: file wrangler.jsonc con la cartella dist e wrangler nel progetto. Per un sito statico l'adattatore non serve.

Base comune a tutte le pagine (commit "Base del sito con lo stile del design"):
- Token di stile in global.css: colori del brand, raggi, ombra "disegnata", bottoni ed etichette riutilizzabili.
- Font Gabarito e Figtree ospitati sul sito con i pacchetti Fontsource (solo caratteri latini e pesi usati). Nessuna richiesta a Google.
- Cursore a foglia (solo con il mouse).
- Navbar a capsula: voce attiva con pallino, su telefono le voci vanno su una riga sotto. Selettore IT/EN presente, ma EN non è ancora attivo.
- Footer con la pesca che salta, colonne Impara / Il progetto / Trasparenza. Tolta la colonna "Percorso" con gli Hub, per coerenza con la scelta di non mostrare gli Hub nelle pagine pubbliche.
- Componente Pesca riutilizzabile (occhiali, saluto, animazione).
- Link "Vai al contenuto" per chi usa la tastiera; meta Open Graph.
- Pagine: home (solo apertura, provvisoria), Ruoli (provvisoria, senza Hub), Blog, Strumenti e Il progetto (in costruzione), Privacy (bozza), Licenze e crediti, pagina 404.
Ricontrollo: build senza errori (8 pagine), font caricati, nessuno scorrimento orizzontale a 1280 e 390 px.
Prossimi passi: home completa, poi Ruoli, Strumenti, Blog, Articolo, Il progetto; poi la versione inglese.

Aggiornamento 26/10/2026: home completa in codice (commit "Home completa dal design"), online.
- Tutte le sezioni della Home v2: apertura con casella delle richieste, pesca aperta con le 4 fasi, 12 pass, esercizi, percorso, 6 strumenti, strumento in azione, blog, newsletter, footer.
- Cambi rispetto al design, per coerenza con le decisioni:
  - i 12 pass sono tutti uguali, senza gruppi Hub 1 / Hub 2;
  - il percorso usa nomi chiari (Prova i ruoli, Scegli il tuo, Approfondisci, Livello avanzato) al posto di Hub 1, Hub 2, Percorsi focalizzati, Junior;
  - gli esempi usano Cinque Foglie e il tè Sencha al posto della borraccia;
  - la newsletter è "In arrivo", senza modulo: niente raccolta di email finché non c'è il servizio con doppio consenso e informativa;
  - i link puntano alle pagine che esistono (Ruoli, Strumenti, Blog).
- Su telefono: pass su due colonne, percorso verticale, la pesca del percorso non salta.
- Dati spostati in file: strumenti.json (12 strumenti, quali mostrare in home) e in ruoli.json numero, icona e frase breve. Testi "ti piace se" resi neutri anche in ruoli.json.
Ricontrollo: build senza errori, nessuno scorrimento orizzontale a 1280 e 390 px, pubblicata in circa 90 secondi.

## 4q. L'app in codice: Cinque Foglie e il primo esercizio SEO (26/10/2026)

Richiesta di Queen: "facciamo il workspace" = l'app con la scrivania (design v3, schermate M1-M5). Online su /app/.
Schermate:
1. /app/ Benvenuto: Pesca tutor, scheda di Cinque Foglie (dati inventati e dichiarati), catalogo, colleghi, scelta del primo pass. Pronto solo SEO; gli altri 5 ruoli "In arrivo".
2. /app/scrivania/ Scrivania: menu dei pass e dei dati, casella delle richieste (Marta/SEO attiva; Luca/SEA e Sara/Social in arrivo), consiglio di Pesca, parole da sapere.
3. /app/seo/esercizio/ Esercizio: richiesta, tabella delle ricerche (numeri inventati), editor con contatori, 4 controlli automatici in tempo reale, anteprima su Google, Pesca che suggerisce il prossimo passo, aiuti apribili (-5 punti ciascuno), salva bozza, consegna.
4. /app/seo/correzione/ Correzione mista: controlli automatici (40 punti) + autovalutazione con la soluzione di un professionista (60 punti), meno gli aiuti; gradimento 1-5; risposta di Marta; cosa hai imparato.
5. /app/riepilogo/ Risultati: tabella per ruolo, consiglio di Pesca, scarica il riepilogo (file di testo per il CV), cancella i progressi (doppio clic, senza finestre).
6. /app/dati/ricerche/ Pagina dati con le ricerche.

Scelte:
- Nessun "Hub" nei nomi: il percorso in alto dice solo Cinque Foglie / Scrivania.
- Controlli (src/scripts/controlli-seo.ts): titolo 30-60 e descrizione 70-160 caratteri; titolo con "tè verde Sencha"; brand alla fine; nessuna parola da promessa sulla salute (es. brucia, grassi, detox, benefici, salute). Accenti e maiuscole non contano.
- Progressi (opzione C): solo nel browser (localStorage), senza account. È un salvataggio strettamente necessario al servizio richiesto, quindi senza banner; spiegato nella privacy, con la possibilità di cancellare.
- Contenuti dell'esercizio in file di dati (src/data/app/seo-sencha.json, cinque-foglie.json): per creare un nuovo esercizio si parte da lì.
- Pagine dell'app con noindex: sono esercizi, non pagine da trovare su Google.
- Il sito porta all'app: bottone del menu, apertura della home, sezione esercizi, footer.
Ricontrollo: test automatico di tutto il percorso (benvenuto → scrivania → esercizio → correzione → risultati → scarica → cancella), nessun errore JavaScript, nessuno scorrimento orizzontale a 390 px.
Corretti durante il test: il controllo "nessuna promessa sulla salute" risultava verde a campi vuoti; una classe CSS con lo stesso nome ("barra") ingrandiva le barre; l'attributo hidden non nascondeva i riquadri con display flex.

Aggiornamento 26/10/2026: esercizio SEO versione 2, con la SEO di oggi (richiesta di Queen: "miglioriamo l'esercizio, con la SEO moderna").
Ora l'esercizio è in 4 parti sulla stessa pagina prodotto, circa 25 minuti:
1. Intento di ricerca: 7 ricerche da classificare (Informarsi, Scegliere, Comprare) e scelta della keyword principale. Giuste: "tè verde sencha" o "sencha biologico", non "tè verde" (troppo generica) né "benefici" (promessa sulla salute).
2. Titolo e descrizione: il titolo è misurato in pixel (stima Arial 20 px, limite 580 px), come fa Google; si spiega che Google può riscrivere un titolo che non descrive la pagina.
3. Dati strutturati Product: nome, marca, prezzo, valuta, disponibilità; il codice JSON-LD si vede mentre si compila e l'anteprima mostra prezzo e disponibilità. Trappola didattica: la casella "aggiungi le stelle 4,8" fa perdere il punto, perché la scheda dice che non ci sono recensioni verificate (recensioni false vietate, Direttiva UE 2019/2161 "Omnibus").
4. Risposta breve alla domanda "Come si prepara il tè Sencha?" (30-70 parole), pensata per "Le persone chiedono anche" e per le panoramiche AI di Google; deve usare i dati della scheda (75 °C, 2 minuti).
- Nuova scheda prodotto con dati inventati da usare (prezzo 12,90 €, preparazione, spedizione, recensioni assenti).
- 16 controlli automatici (4 per parte) che valgono 40 punti in proporzione; autovalutazione 60 punti con 4 frasi nuove; aiuti -5 punti.
- Salvataggio automatico a ogni modifica; correzione parte per parte con la soluzione accanto.
- Salvataggi della versione 1 non più usati (nuova chiave nel browser).
Corretti durante il test: il controllo "nessuna stella" dava punti a modulo vuoto; la tabella faceva scorrere la pagina di lato su telefono; la classe "scheda" del sito dava un bordo scuro alla scheda prodotto.
Da verificare con Queen (esperta SEO): il limite di 580 px e le regole dei controlli.

Aggiornamento 26/10/2026 (commento di Queen: il testo libero crea problemi perché si possono sbagliare i nomi; serve una guida all'inizio):
- Guida iniziale a 5 passi (finestra <dialog>): spiega l'esercizio e le tre colonne con uno schema che evidenzia la zona di cui si parla. Si apre da sola solo la prima volta (ricordato nel browser) e si riapre con "Rivedi la guida".
- Dati strutturati: nome, marca e prezzo si scelgono da un menu (una sola risposta giusta, presa dalla scheda), non si scrivono più.
- Titolo: bottoni "+ keyword" e "+ | Cinque Foglie" che inseriscono il testo scritto giusto dove si trova il cursore.
- Controlli tolleranti: keyword e brand valgono anche con 1-2 lettere sbagliate (distanza di Levenshtein); in quel caso Pesca avvisa di controllare come sono scritti, senza togliere punti.
- Resta libero solo il testo dove la scrittura è l'abilità da allenare (titolo, descrizione, risposta breve); lì i controlli guardano lunghezze, numeri e parole vietate, non l'ortografia.

Aggiornamento 26/10/2026 (Queen: "l'esercizio non deve dare la possibilità di scrivere"): esercizio SEO versione 3, nessun campo di testo.
- Titolo: si compone cliccando 11 blocchi pronti, nell'ordine scelto; un clic su un blocco del titolo lo toglie. Blocchi trappola: "che brucia i grassi" (salute), "il migliore d'Italia", "Offerta imperdibile!", un blocco lunghissimo che supera i 580 px, "Cinque Foglie |" (brand all'inizio).
- Descrizione: si sceglie tra 4 proposte (giusta; con promesse sulla salute; troppo corta; troppo lunga, oltre 160 caratteri).
- Risposta breve: si sceglie tra 4 proposte (giusta con 75 °C e 2 minuti; acqua bollente e 5 minuti; promesse di dimagrimento; lunga e senza risposta).
- I controlli automatici sono gli stessi: lavorano sul testo scelto, quindi le proposte sbagliate perdono solo i punti del loro difetto.
- L'anteprima su Google taglia con "..." i titoli e le descrizioni troppo lunghi, come fa Google.
- Autovalutazione riscritta per un esercizio a scelte (capire il perché delle scelte).
Decisione di progetto: negli esercizi niente testo libero, per evitare errori di battitura e correzioni ingiuste. Si allena il giudizio (scegliere e motivare), non la scrittura.

## 5. Decisione aperta: correzione degli esercizi

- Opzione A: automatica (più costosa e complessa).
- Opzione B: confronto con una soluzione di riferimento (più semplice).
- Suggerimento per la prima versione: opzione B. Si passa ad A solo se gli utenti completano gli esercizi.

## 6. Note legali UE da ricordare

- Dati degli utenti: se raccogli email o statistiche servono informativa privacy e base giuridica (GDPR).
- Cookie e analytics: serve il consenso prima dei cookie non necessari (ePrivacy).
- Newsletter: iscrizione con consenso esplicito (meglio con conferma via email).
- Dati dell'azienda finta: tutti inventati da noi, nessun dato personale reale.
- Immagini, font, icone: solo con licenza libera (CC0, CC BY, MIT, SIL OFL). Annotare sempre autore e licenza. Meglio ospitare i font sul proprio sito.
- Da ricontrollare con un professionista prima del lancio pubblico: queste note sono informative, non consulenza legale.

## 7. Metriche di successo (confermate da Queen il 24/10/2026)

- Visite totali e visite da ricerca organica (GA4, Cloudflare, Search Console)
- Clic e impressioni su Google, keyword per cui il sito compare (Search Console)
- Esercizi iniziati e completati (evento GA4, solo con consenso)
- Strumenti gratuiti usati (evento GA4)
- Iscritti alla newsletter (quando ci sarà)
- Velocità del sito / Core Web Vitals (Cloudflare, Search Console)

## 8. Registro delle decisioni

| Data | Decisione | Motivo |
|------|-----------|--------|
| 24/10/2026 | Creato il diario e fissate le regole di lavoro | Base per il case study |
| 24/10/2026 | Proposto ordine delle aree (in attesa di conferma) | Passo 0 |
| 24/10/2026 | Ordine rimandato: prima mappa completa di aree e ruoli (sezione 4a) | Decidere su un quadro completo |
| 24/10/2026 | Parte 1 = brand, SEO, SEA/PPC, social, influencer, CRM; Parte 2 = il resto | Scelta di Queen (sezione 4b) |
| 24/10/2026 | Struttura a tre livelli: Hub 1 (mix), Hub 2 (altri ruoli), percorsi focalizzati | Prima provare tutto, poi specializzarsi |
| 24/10/2026 | Un sito finto per Hub 1, uno per Hub 2, uno per i percorsi focalizzati (un ruolo alla volta); livelli Studente, Junior, Junior avanzato | Scelta di Queen |
| 24/10/2026 | I percorsi focalizzati riusano il sito dell'Hub 1, in versione molto più approfondita | Meno lavoro, continuità per lo studente |
| 24/10/2026 | Prossimo passo: scegliere settore e tipo dell'azienda finta dell'Hub 1 | Il sito viene riusato, quindi deve reggere 6 ruoli e molto approfondimento |
| 24/10/2026 | Azienda finta dell'Hub 1 = e-commerce B2C (settore da decidere) | Funziona per tutti e 6 i ruoli, catalogo facile da ingrandire |
| 24/10/2026 | Prossimo passo: scegliere i ruoli dell'Hub 2 (proposta di Claude nella sezione 4c) | — |
| 24/10/2026 | Hub 2 confermato: product marketing, trade marketing, PR, partnerships, ricerca di mercato, analytics/martech | Scelta di Queen |
| 24/10/2026 | I ruoli "figli" (content, email, lifecycle, loyalty...) vanno nei percorsi focalizzati e nei livelli Junior | Nell'Hub 1 si prova, nei percorsi si approfondisce |
| 24/10/2026 | Passo 0 (scelta delle aree) concluso | — |
| 24/10/2026 | Mappa interattiva dei ruoli v1 pubblicata (sezione 4d) | Primo pezzo del passo 1, non dipende dall'azienda finta |
| 24/10/2026 | Mappa del blog (48 articoli, 3 ondate) e degli strumenti (12) pubblicata (sezione 4e) | Completare la pianificazione del passo 1 |
| 24/10/2026 | Prossimo: scegliere gli strumenti tecnici della base del sito | Richiesta di Queen |
| 24/10/2026 | Base tecnica: Astro + Cloudflare Pages; testi modificabili a mano (sezione 4f) | Scelta di Queen |
| 24/10/2026 | Collegati Canva, Figma, Cloudflare; proposta skill personale del progetto (sezione 4g) | Setup di lavoro |
| 24/10/2026 | Creato lo scheletro del sito con Astro 7.3.8 (sezione 4h) | Base per blog, ruoli e strumenti |
| 24/10/2026 | Creata la pagina "Cose da imparare" con 40 concetti (sezione 4i) | Richiesta di Queen: studiare il progetto |
| 24/10/2026 | Proposte 3 direzioni di stile per la home (sezione 4j) | Richiesta di Queen: professionale, giocoso, animato, approcciabile |
| 24/10/2026 | Scartate A, B, C. Colore principale arancione, simbolo una pesca; proposte D ed E | Scelta di Queen |
| 24/10/2026 | Scelta D (Pesca solare); proposte 5 varianti D1-D5 | Scelta di Queen |
| 24/10/2026 | Home completa che unisce D, D2, D3, D4 | Scelta di Queen |
| 24/10/2026 | Home v2: più contenuto utile, percorso a livelli, strumenti, meno ripetizioni | Richiesta di Queen: migliorarla |
| 24/10/2026 | Griglia dei ruoli rifatta: colori per fase, esercizio per ruolo, anteprima Hub 2 | Commento di Queen sulla tela |
| 24/10/2026 | Footer rifatto: pesca che si affaccia, invito finale, 4 colonne, trasparenza | Commento di Queen sulla tela |
| 24/10/2026 | Home: 6 strumenti gratuiti invece di 3 | Commento di Queen sulla tela |
| 24/10/2026 | Ruoli mostrati come "pass" aziendali, solo colori del brand | Commento di Queen: riquadri basic e colori brutti |
| 24/10/2026 | Pesca aperta rifatta: più realistica, si apre come un coperchio, anello dei ruoli | Commento di Queen sulla tela |
| 24/10/2026 | Apertura: messaggi spostati intorno alla pesca (il messaggio Brand la copriva) | Commento di Queen sulla tela |
| 24/10/2026 | Pesca che parla, percorso con salti, demo dello strumento, sezione blog | Commenti di Queen sulla tela |
| 24/10/2026 | Tolto il "coperchio" della pesca aperta: la parte interna resta sempre visibile | Queen preferiva vedere sempre l'interno |
| 24/10/2026 | Navbar a capsula fissa in alto; cursore a foglia (verde, arancione sui link), solo con il mouse | Commento di Queen sulla tela |
| 24/10/2026 | Apertura: messaggi ordinati in una colonna "casella dei messaggi" accanto alla pesca | Commento di Queen: posizione strana dei rettangoli |
| 24/10/2026 | Navbar: tolto il numero 12 accanto a "Ruoli" | Commento di Queen sulla tela |
| 24/10/2026 | Sito multilingua IT/EN; selettore di lingua nella navbar (sezione 4k) | Decisione di Queen |
| 24/10/2026 | E-commerce finto dell'Hub 1 = negozio di tè (nome provvisorio Cinque Foglie) | Proposta di Queen |
| 24/10/2026 | Correzione esercizi = mix: automatica per le parti misurabili + soluzione di riferimento | Decisione di Queen (chiude la decisione aperta) |
| 24/10/2026 | Inizio design del prodotto (app) | Richiesta di Queen |
| 24/10/2026 | Design del prodotto v1: 5 schermate dell'Hub 1 (sezione 4m) | Prima versione da rivedere con Queen |
| 24/10/2026 | Design del prodotto v2: stile professionale, Pesca solo come tutor | Richiesta di Queen |
| 24/10/2026 | Design del prodotto v3: mix tra struttura della v2 e calore della v1 (tavole M1–M5) | Richiesta di Queen |
| 24/10/2026 | Approvata la v3 come design del prodotto | Scelta di Queen |
| 24/10/2026 | Progressi: prima solo nel browser, account più avanti (opzione C) | Scelta di Queen; meno dati personali, tutela dei minori |
| 24/10/2026 | Dati base SEO e analytics: Search Console + Cloudflare Web Analytics (proposta, sezione 4n) | Richiesta di Queen |
| 24/10/2026 | I dati servono a Queen per il portfolio: proposta GA4 con consenso + Search Console + Cloudflare, report in Looker Studio | Precisazione di Queen |
| 24/10/2026 | Confermati strumenti di misura e metriche di successo (sezione 7) | Scelta di Queen |
| 24/10/2026 | Scheletro del sito su GitHub; prossimo: collegare Cloudflare Pages | App GitHub di Claude installata |
| 24/10/2026 | Home: tutti i 12 ruoli come pass semplici (nome, icona, 2-3 parole), divisi in Hub 1 e Hub 2 | Commento di Queen: pass troppo pieni |
| 24/10/2026 | Cursore: nuova foglia uguale a quella della pesca del logo (verde; arancione sui link) | Commento di Queen: la foglia di prima non piaceva |
| 24/10/2026 | Percorso: la pesca salta senza deformarsi (resta rotonda) | Commento di Queen sulla tela |
| 24/10/2026 | Aggiunti 3 concetti a "Cose da imparare" (contrasto, hero, mascotte) | Regola 9 della skill |
| 24/10/2026 | Blog della home: icone sostituite da copertine illustrate con la pesca (SEO con lente, SEA con grafico, regole con #adv) | Commento di Queen: icone brutte |
| 24/10/2026 | Newsletter: dopo l'iscrizione compare la conferma "Controlla la tua email" (doppio consenso), bottone attivo solo con email valida e consenso | Commento di Queen sulla tela |
| 24/10/2026 | Footer: la pesca salta ogni 5 secondi circa (resta rotonda); braccia rifatte con manine aggrappate al bordo | Commento di Queen sulla tela |
| 25/10/2026 | Disegnate le pagine Ruoli, Strumenti e Blog (sezione 4o) | Richiesta di Queen |
| 25/10/2026 | Footer: "Statistiche solo con il tuo consenso" al posto di "nessun tracciamento" | Coerenza con la scelta di GA4 con consenso |
| 25/10/2026 | Aggiunti 3 concetti a "Cose da imparare" (doppio consenso, filtri CSS, pagina hub del blog) | Regola 9 della skill |
| 25/10/2026 | Pagina Strumenti: la demo dello strumento spostata in fondo, prima del footer | Commento di Queen sulla tela |
| 25/10/2026 | Pagine Ruoli, Strumenti e Blog senza divisione Hub 1 / Hub 2 / Junior: filtri per fase, disponibilità e argomento; gli Hub restano solo nell'app | Commento di Queen: per chi legge la divisione non ha senso |
| 25/10/2026 | Pagina Ruoli: pass semplificati (numero, icona, nome, una frase, "Scopri il ruolo"); i dettagli vanno nella pagina del singolo ruolo | Commento di Queen: design troppo pieno |
| 25/10/2026 | Blog: tolta la sezione delle guide "in scrittura"; si mostrano solo articoli pronti | Commento di Queen sulla tela |
| 25/10/2026 | Blog: articoli brevi rifatti come "pillole" (Hai 5 minuti?, tacche di lettura) e fascia "Leggi, poi prova" con esempi articolo-strumento | Commento di Queen: migliora questo |
| 25/10/2026 | Pagina Ruoli: pass ridisegnati come badge aziendali (cordino, ritratto con icona, nome, 2-3 parole, codice a barre) | Commento di Queen: migliora il design |
| 25/10/2026 | Pagina Strumenti: icone sostituite da mini anteprime illustrate di ogni strumento (numeri di esempio) | Commento di Queen: migliora le icone |
| 25/10/2026 | Pagina Strumenti: tolte le immagini dalle schede (solo testo, etichetta e stato) | Commento di Queen sulla tela |
| 25/10/2026 | Pagina Ruoli: i 12 pass sono tutti uguali (stesso colore, stessa azione, niente "In arrivo"); tolto il filtro "Da provare subito" | Commento di Queen: i ruoli devono essere tutti uguali |
| 25/10/2026 | Pagina Ruoli: pass senza arancione (ritratto, cordino e freccia in pesca chiaro) | Commento di Queen: arancione troppo potente |
| 25/10/2026 | Disegnata la pagina del singolo articolo (modello, esempio SEO specialist) | Richiesta di Queen |
| 25/10/2026 | Articolo: struttura v2 (H2 come domande, SEO vs SEA, 3 parti del lavoro, esempio passo per passo con prima/dopo, come si diventa, checklist, FAQ); sezioni numerate come l'indice | Commento di Queen: miglioriamo la struttura |
| 25/10/2026 | Disegnata la pagina "Il progetto" (about us) | Richiesta di Queen |
| 25/10/2026 | Pagina "Il progetto": avatar con la lettera Q, nessuna foto | Scelta di Queen |
| 25/10/2026 | Link (LinkedIn, GitHub) e scelta città/azienda per "Il progetto": rimandati alla fine | Scelta di Queen |
| 25/10/2026 | Hosting: Cloudflare Workers con file statici (non Pages), indirizzo marketing-mix.queensleyk10.workers.dev; aggiunti wrangler.jsonc e wrangler 4.149.0 | Cloudflare ora propone solo Workers per i nuovi progetti (indicazione di Queen); per un sito statico funziona come Pages |
| 26/10/2026 | Sito online su marketing-mix.queensleyk10.workers.dev (build e deploy da GitHub funzionanti) | Queen ha rilanciato la build dopo la correzione |
| 26/10/2026 | Base del sito in codice: stile, font ospitati, navbar, footer, pagine provvisorie, privacy, licenze, 404 (sezione 4p) | Primo passo della costruzione |
| 26/10/2026 | Build automatiche funzionanti: Cloudflare non riceveva i commit (app GitHub senza accesso al repository, poi collegato per errore a web-tools). Risolto dando accesso a marketing-mix e ricollegando | Prova: commit vuoto pubblicato in circa 40 secondi |
| 26/10/2026 | Home completa in codice e online (pass uguali, percorso senza Hub, esempi con il tè, newsletter in arrivo) | Richiesta di Queen |
| 26/10/2026 | App in codice: benvenuto, scrivania, esercizio SEO con controlli automatici, correzione mista, risultati (sezione 4q) | Richiesta di Queen |
| 26/10/2026 | Scrivania a tutta pagina (tre colonne a tutta altezza, allegati nella richiesta, progressi); esercizio a tutta larghezza | Richiesta di Queen: usare tutto lo spazio |
| 26/10/2026 | Esercizio SEO v2 con la SEO moderna: intento, title in pixel, dati strutturati Product, risposta per AI e "Le persone chiedono anche" | Richiesta di Queen |
| 26/10/2026 | Esercizio SEO: guida iniziale, menu di scelta nei dati strutturati, bottoni per inserire keyword e brand, controlli tolleranti agli errori di battitura | Commento di Queen |
| 26/10/2026 | Esercizi senza testo libero: titolo a blocchi, descrizione e risposta a scelta multipla (esercizio SEO v3) | Decisione di Queen |
| 26/10/2026 | Esercizi per SEA, Brand, Social, Influencer e CRM, con la stessa logica della SEO: 4 parti, nessun testo da scrivere, controlli automatici, correzione con soluzione e autovalutazione | Richiesta di Queen: "fai gli altri esercizi" |
| 26/10/2026 | "Motore" degli esercizi: ogni esercizio è un file JSON (src/data/app/esercizi/) con 4 tipi di parte (classifica, scelta, menu, spunte) e regole di controllo; due pagine generiche costruiscono tutti gli esercizi | Aggiungere un ruolo = scrivere un file di dati, senza nuovo codice |
| 26/10/2026 | Regole UE e italiane dentro gli esercizi: claim salute (Reg. 1924/2006), green claim generici (Dir. 2024/825), pubblicità riconoscibile per influencer (Digital Chart IAP, linee guida AGCOM), consenso email e eccezione per i clienti (GDPR, art. 130 Codice privacy), urgenze finte come pratica scorretta | Ogni esercizio insegna anche cosa è legale |
| 26/10/2026 | Scrivania con 6 richieste cliccabili (una per ruolo) e stato di ogni ruolo; benvenuto e risultati per tutti i ruoli; il consiglio di Pesca indica il ruolo preferito dopo almeno 3 provati | Ora tutti i ruoli sono giocabili |
| 26/10/2026 | Prova automatica dei 5 esercizi: risposte giuste = tutti i controlli verdi e 40/40; risposte sbagliate = quasi tutto rosso; nessun errore e niente sforamenti sul telefono | Ricontrollo (regola del progetto) |
| 26/10/2026 | I ruoli successivi (Product, Trade, PR, Partnerships, Ricerca, Analytics) restano in Cinque Foglie: niente seconda azienda finta; Cinque Foglie entrerà anche nei negozi per il trade marketing | Scelta di Queen (supera la decisione del 24/10 su un sito per l'Hub 2) |
| 26/10/2026 | Tutti i ruoli restano sempre aperti nell'app, senza sblocchi | Scelta di Queen |
| 26/10/2026 | Esercizio Product marketing: lancio delle Tisane della Sera (caratteristiche e benefici, posizionamento, prezzo e margine, controlli prima del lancio con etichetta Reg. UE 1169/2011, claim salute, prezzo barrato Omnibus, green claim) | Prossimo ruolo nell'ordine della mappa (7) |
| 26/10/2026 | Barra dei progressi: conta i ruoli reali dell'azienda (ora 7) invece di 6 fissi | Serve per i ruoli che si aggiungono |
| 26/10/2026 | Prova automatica Product: risposte giuste 14/14, sbagliate 0/14, nessun errore | Ricontrollo |
| 26/10/2026 | Cinque Foglie entra in 40 supermercati di una catena del Veneto (catena senza nome, per non richiamare aziende reali); nuovo collega Giorgio, Vendite e negozi | Serve per il trade marketing |
| 26/10/2026 | Esercizio Trade marketing: posizione sullo scaffale, sell-in e sell-out, promozione in negozio (consenso già spuntato non valido per il GDPR, affermazioni non verificate ingannevoli), azioni nei negozi deboli (niente recensioni finte, Omnibus) | Ruolo 8 della mappa; richiesta di Queen |
| 26/10/2026 | Prova automatica Trade: risposte giuste 15/15, nessun errore | Ricontrollo |
| 26/10/2026 | Esercizio PR e comunicazione: riconoscere una notizia, scegliere l'inizio del comunicato stampa, mandarlo ai giornalisti giusti (niente liste comprate, niente regali in cambio di articoli), gestire una crisi sui social (niente cancellazioni, niente dati dei clienti in pubblico) | Ruolo 9 della mappa; richiesta di Queen |
| 26/10/2026 | Giornali dell'esercizio PR senza nome, per non richiamare testate reali | Regola: niente aziende reali imitate |
| 26/10/2026 | Prova automatica PR: risposte giuste 14/14, sbagliate 0/14, nessun errore | Ricontrollo |
| 26/10/2026 | Esercizio Partnerships: scegliere un partner complementare (no concorrenti, no valori lontani), proposta di co-marketing misurabile (no scambio di liste clienti, GDPR), conti della box con margine diviso a metà, cosa scrivere nell'accordo (dati e art. 28 GDPR, niente esclusive per sempre, consiglio di un legale) | Ruolo 10 della mappa; richiesta di Queen |
| 26/10/2026 | Partner dell'esercizio senza nome, per non richiamare aziende reali | Regola: niente aziende reali imitate |
| 26/10/2026 | Prova automatica Partnerships: risposte giuste 14/14, nessun errore | Ricontrollo |
| 26/10/2026 | Esercizio Ricerca di mercato: domande fatte bene (neutre, una cosa per volta, solo dati necessari: minimizzazione GDPR), campione giusto senza bias, lettura prudente dei risultati (intenzione non è vendita, prezzo per 3 persone su 4), passi successivi (test piccolo, informativa, dati usati solo per lo scopo dichiarato, niente numeri ritoccati) | Ruolo 11 della mappa; richiesta di Queen |
| 26/10/2026 | Prova automatica Ricerca: risposte giuste 15/15, sbagliate 0/15, nessun errore; conto del prezzo ricontrollato (50+20+5 = 75%) | Ricontrollo |
| 26/10/2026 | Esercizio Marketing analytics / martech: canali di traffico (organico, a pagamento, email, social), link con UTM coerenti, lettura del funnel con i valori tipici, strumenti e consenso (linee guida del Garante sui cookie 2021: Rifiuta facile come Accetta, lo scorrimento non è consenso; dati dei clienti al sicuro) | Ruolo 12 della mappa; richiesta di Queen |
| 26/10/2026 | TRAGUARDO: tutti i 12 ruoli sono giocabili nell'app, ognuno con un esercizio in 4 parti, nessun testo da scrivere | — |
| 26/10/2026 | Corretto: i link lunghi (UTM) uscivano dallo schermo del telefono; ora vanno a capo. Ricontrollate 28 pagine a 390 px: nessuno sforamento | Ricontrollo |
| 26/10/2026 | Pagina Ruoli in codice come da tela: apertura, 4 fasi, 12 pass uguali con filtri per fase, quiz "Non sai da dove partire?" esteso a 12 risposte (ora tutti i ruoli sono giocabili); filtri e quiz funzionano senza JavaScript | Richiesta di Queen |
| 26/10/2026 | 12 pagine dei singoli ruoli (/ruoli/seo/ ecc.) da un solo modello: cosa fa, giornata tipo, strumenti gratuiti (citati come esempio), ruoli più specifici, esercizio dell'app, altri ruoli della stessa fase; titoli pagina scritti a mano ("Cos'è il trade marketing") perché "Cosa fa un Partnerships" non funziona | La tela diceva: i dettagli vanno nella pagina del singolo ruolo |
| 26/10/2026 | I pass della home portano alla pagina del ruolo (link interni per la SEO); footer e home aggiornati a 20-25 minuti | Coerenza con gli esercizi nuovi |
| 26/10/2026 | Quiz su telefono: dopo la scelta la pagina scorre fino al risultato (piccolo script; senza JavaScript funziona lo stesso) | Il risultato finiva sotto le 12 risposte, fuori schermo |
| 26/10/2026 | Ricontrollo: filtri (12/3/3 pass), quiz, 12 link dei pass, nessuno sforamento a 390 px, nessun errore | Ricontrollo |
| 26/10/2026 | Pagina Strumenti in codice come da tela: apertura, 12 schede solo testo con filtri (Tutti / Pronti / In arrivo), come si usano, privacy, demo dell'anteprima Google in fondo | Richiesta di Queen |
| 26/10/2026 | Costruiti anche i primi 3 strumenti dell'ordine (link UTM, anteprima risultato Google, engagement rate), così i bottoni "Apri lo strumento" portano a qualcosa di vero | Una pagina con strumenti "Pronti" che non esistono sarebbe ingannevole |
| 26/10/2026 | Strumenti: calcoli solo nel browser, niente salvataggio, esempio di Cinque Foglie con un clic, spiegazione sotto, link al ruolo e all'esercizio. Engagement: niente "valori giusti" inventati, si confronta con i propri post | Regole del progetto (dati, onestà) |
| 26/10/2026 | Articoli di teoria e "Avvisami con la newsletter" non ancora attivi: scritti come "articolo in arrivo" e "Arriva presto", senza link | Blog e newsletter non ci sono ancora |
| 26/10/2026 | Ricontrollo: filtri 12/3/9, UTM pulito e copiato, avviso su UTM già presenti, anteprima con titolo tagliato e frasi sulla salute in rosso, engagement 4,5% e 1,3% sui follower; nessun errore, nessuno sforamento a 390 px | Ricontrollo |
| 26/10/2026 | Blog in codice come da tele Blog e Articolo: elenco (in evidenza, guide con filtri, "Hai 5 minuti?", "Leggi, poi prova", ricerca) e modello di articolo (barra di lettura, indice, titoli numerati, In 30 secondi, consiglio di Pesca, domanda di ripasso, FAQ, articoli collegati) | Richiesta di Queen |
| 26/10/2026 | Articoli in Markdown con schema controllato (content collection): le parti fisse stanno nei dati in cima al file, così ogni articolo ha la stessa struttura | Codice semplice; un articolo nuovo = un file .md |
| 26/10/2026 | Primi 5 articoli pubblicati: Che cos'è il marketing (in evidenza), Cosa fa un SEO specialist, Title e meta description, Link UTM, Engagement rate. Scritti da Claude, firmati Queen: DA RILEGGERE da Queen | Servono come teoria dei 3 strumenti pronti e come base del blog |
| 26/10/2026 | Articolo SEO corretto rispetto alla tela: title misurato in pixel (circa 580) e non "60 caratteri"; spedizione in 24 ore come nella scheda prodotto (anche nella demo della home) | Coerenza con esercizio e strumenti |
| 26/10/2026 | Collegamenti: gli strumenti mostrano "Impara la teoria" con il link vero; la home mostra gli ultimi 3 articoli veri | Link interni |
| 26/10/2026 | Ricontrollo: ricerca (utm = 1, parola assente = messaggio), domanda di ripasso giusta/sbagliata, indice con ancore valide, tutti i link interni a 200, tabelle a tutta larghezza, nessuno sforamento a 390 px, nessun errore | Ricontrollo |
| 26/10/2026 | Versione inglese: prima il sito pubblico, l'app resta in italiano per ora | Scelta di Queen |
| 26/10/2026 | Indirizzi: l'italiano resta dov'è (/ruoli/), l'inglese sta sotto /en/ con indirizzi tradotti (/en/roles/, /en/tools/utm-link-builder/, /en/roles/market-research/) | Scelta di Queen; nessun link attuale si rompe (supera "/it/ e /en/" della sezione 4k) |
| 26/10/2026 | Nei testi inglesi solo regole UE: niente riferimenti italiani (Codice privacy, AGCOM, IAP); per i cookie si citano le regole ePrivacy UE; nella privacy inglese resta il Garante come autorità del Paese da cui è gestito il sito | Scelta di Queen |
| 26/10/2026 | Come è fatto: src/i18n/index.ts (lingue, mappa degli indirizzi, testi comuni), testi inglesi dei dati in src/data/en/, ogni pagina è un componente con i testi IT e EN uno accanto all'altro; le pagine italiane e inglesi lo usano con lang="it" / lang="en" | Codice semplice: lo stile e la struttura si scrivono una volta sola |
| 26/10/2026 | SEO multilingua: attributo lang, tag hreflang reciproci (it, en, x-default) su ogni pagina, selettore IT/EN che porta alla stessa pagina tradotta; articoli inglesi con il campo "traduzione" | Sezione 4k |
| 26/10/2026 | 5 articoli in inglese scritti per chi legge in inglese (non tradotti parola per parola), DA RILEGGERE da Queen; riassunto inglese dei 12 esercizi in src/data/en/esercizi.json | Blog e pagine dei ruoli in inglese |
| 26/10/2026 | Corretto nel ricontrollo: il controllo delle frasi sulla salute dell'anteprima Google segnava come vietata la descrizione inglese, perché l'elenco italiano ("grass" = grassi) trovava "grassy"; ora ogni lingua usa il suo elenco | Ricontrollo |
| 26/10/2026 | Ricontrollo: 54 pagine pubbliche (27 italiane, 27 inglesi) con lingua giusta, hreflang reciproci, selettore e link interni funzionanti, nessuna parola italiana nelle pagine inglesi, nessuno sforamento a 390 px, nessun errore | Ricontrollo |
| 26/10/2026 | Percorsi di approfondimento: il primo è la SEO (content strategy e copywriting dentro, come ruoli figli). Deve sembrare un e-commerce vero con strumenti SEO realistici; circa 2 ore e mezza, 5 missioni, solo scelte (niente testo da scrivere) | Richiesta e scelte di Queen |
| 26/10/2026 | Negozio finto navigabile dentro l'app (/app/negozio/): cinquefoglie.example, 6 categorie, 29 prodotti, blog; cornice da browser con il bottone "Ispeziona" che mostra cosa legge Google (stato, title, description, meta robots, canonical, H1). Dominio .example: riservato agli esempi, non può essere di nessuno | Si impara la SEO guardando un sito vero, non una descrizione |
| 26/10/2026 | Dati generati da uno script con seme fisso (strumenti-dati/genera_negozio.py): stessi numeri ogni volta, e ogni strumento legge gli stessi file, così un problema compare uguale in tutti gli strumenti | Coerenza dei dati, ripetibile |
| 26/10/2026 | 9 problemi nascosti nel sito (sono le risposte delle missioni): /tisane/ in noindex dal 18/09 dopo un aggiornamento del tema; 7 filtri duplicati senza canonical; prodotto 404 linkato da 6 pagine; catena di 2 redirect; 8 prodotti con title predefinito e description vuota; /matcha/ senza H1; LCP da telefono 4,1 s per una foto da 2,4 MB; cannibalizzazione su "tè verde sencha"; /te-verdi/ con CTR 0,9%. Più trappole che vanno bene così (carrello noindex, prodotto esaurito, pagine dei tag non indicizzate) | Sono i problemi più comuni di un e-commerce vero |
| 26/10/2026 | Il calo di ottobre ha due cause mescolate: il noindex delle tisane (vero problema) e la fine della stagione del tè freddo (normale). Il confronto con l'anno prima serve a distinguerle | Caso finale realistico: non tutto il calo è un errore |
| 26/10/2026 | 5 strumenti simulati con nomi generici, ispirati (detto in pagina) a quelli professionali: Console di ricerca (Search Console), Pagine e indicizzazione con Core Web Vitals, Ricerca keyword (Keyword Planner / Semrush), Crawler (Screaming Frog), Statistiche (Google Analytics 4) | Regola: niente imitazione di marchi reali; ma i nomi veri si citano per far capire cosa si impara |
| 26/10/2026 | Statistiche coerenti con il consenso ai cookie: le sessioni sono circa il 70% dei clic (chi rifiuta i cookie non viene contato), detto in pagina | Corretto nel ricontrollo: prima erano il 92%, in contraddizione con la nota |
| 26/10/2026 | Numeri all'italiana scritti a mano (3.900 e non 3900) e grafico scalato tra minimo e massimo; andamento delle keyword a barrette (barre uguali = keyword non stagionale) | Il browser scriveva i numeri in modo diverso; la curva piatta sembrava un errore |
| 26/10/2026 | Ricontrollo: 8 pagine senza errori, nessuno sforamento a 390 px, filtri del crawler (1 errore 404, 3 redirect, 1 title oltre 580 px), dettaglio del 404 con le 6 pagine che lo linkano, catena di redirect, 14 keyword dove il sito non compare | Ricontrollo |
| 26/10/2026 | Bozza pubblicata e mostrata a Queen prima di costruire le missioni | Correggere la direzione prima del lavoro grosso |
| 26/10/2026 | Feedback di Queen sulla bozza: il negozio non sembra abbastanza un e-commerce vero; gli strumenti vanno bene; mancano cose (sitemap, dati strutturati, backlink) ma per il livello junior va bene così: complesso ma non troppo. Prima si lavora solo sulla grafica | Feedback di Queen |
| 26/10/2026 | Fatti i design (tela "Workspace SEO junior", 9 schermate): negozio (home, categoria Tè verdi, scheda prodotto) e workspace (panoramica del percorso, Console, Pagine e indicizzazione, Ricerca keyword, Crawler, Statistiche) | Richiesta di Queen |
| 26/10/2026 | Negozio più realistico: barra spedizioni, ricerca, account, carrello, menu con Idee regalo, banner stagionale, vantaggi, filtri e ordinamento, FAQ in categoria, galleria, formati, quantità, recensioni con distribuzione, prodotti correlati, newsletter con consenso non pre-spuntato, banner cookie con Rifiuta e Accetta uguali, footer con note legali | Feedback "non abbastanza e-commerce" |
| 26/10/2026 | Regole UE nel design: prezzo scontato con "prezzo più basso degli ultimi 30 giorni" (direttiva Omnibus), prezzo al kg, IVA inclusa, recesso 14 giorni; recensioni scritte come "di esempio di un negozio finto" (niente recensioni false spacciate per vere) | Legalità UE |
| 26/10/2026 | Livello junior nel design: a destra di ogni strumento un pannello "Guida della missione" con passo, domanda, suggerimento su dove guardare, risposte a scelta, "Controlla" e "Mostrami dove", spiegazione della parola difficile; eventi annotati sui grafici (aggiornamento del tema il 18/09); motivi di esclusione spiegati in parole semplici; problemi del crawler divisi in Errori, Da sistemare, Da sapere | Junior: complesso ma non troppo |
| 27/10/2026 | Design della workspace: tolto l'arancio chiaro (pesca #fff1e6, #fff6ee, #ffb27a, #efc4a2). Ora l'unico arancione è quello del marchio (--arancio #ff7a1a) per bottoni, pallini, barre e risposte scelte; il resto è neutro (sfondo #f6f2ee, voce attiva #efe8e2). Il pesca resta solo nel logo, perché è il colore della mascotte | Feedback di Queen: "l'arancione chiaro è strano, usiamo l'arancione definito come colore principale" |
| 27/10/2026 | Design della workspace: lo sfondo beige-rosato (#f6f2ee) diventa grigio chiaro neutro (#f4f4f2); anche bordi e testi secondari passano da toni caldi a grigi neutri. Così l'unico colore caldo è l'arancione del marchio. Il negozio tiene il suo crema, che fa parte del marchio Cinque Foglie | Feedback di Queen: "il problema era lo sfondo" |
| 27/10/2026 | Esercizi dell'Hub 1 più educativi: prima di lavorare si spiega. Due aggiunte al motore degli esercizi: 1) "lezione" all'inizio (cosa fa il ruolo, 3-4 concetti con un esempio ciascuno, cosa farai); 2) "Prima di rispondere" in ogni parte (come si ragiona, più un esempio su un prodotto diverso, così l'esempio insegna senza dare la risposta) | Richiesta di Queen: "devono spiegare bene ogni cosa prima" |
| 27/10/2026 | Primo esercizio aggiornato: SEA (esempi sulle teiere in ghisa, conti ricontrollati). Mostrato a Queen prima di fare gli altri (brand, SEO, social, influencer, CRM) | Correggere la direzione prima del lavoro grosso |
| 29/10/2026 | Critica del design della pagina esercizio (metodo: prima impressione, usabilità, gerarchia, coerenza, accessibilità). Problemi trovati: i nomi dei controlli a destra svelavano le risposte ("Clic giusti: 750"); la lezione era una griglia di 4 schede uguali; sfondo e riquadri color pesca; tre colonne con lo stesso peso | Richiesta di Queen: migliorare il design |
| 29/10/2026 | Cambiato: i controlli mostrano il loro nome solo quando li superi (prima "Da superare"); la lezione si legge come una pagina (concetto a sinistra, esempio a destra, righe separate), "Cosa farai" porta alle parti; colonna centrale max 760 px per righe leggibili; "Prima di rispondere" su grigio con esempio in bianco; risposte scelte con bordo arancione, senza fondo pesca; costo degli aiuti scritto accanto a ogni aiuto; bersagli dei radio da 44 px e bordo visibile con la tastiera | Educativo e accessibile |
| 29/10/2026 | Tutta l'app passa a colori neutri: sfondo #f4f4f2, bordi #e3e1dc, testi secondari grigi; l'arancione del marchio resta per bottoni, numeri e stato attivo. Il sito pubblico resta com'è (crema e pesca fanno parte della sua identità) | Coerenza con il feedback sui design |
| 29/10/2026 | Lezione iniziale e "Prima di rispondere" anche per brand, SEO, social, influencer e CRM: tutto l'Hub 1 ora spiega prima di chiedere. Esempi sempre su un'attività diversa (libreria, teiere, tazze in ceramica, negozio di candele), così insegnano il metodo senza dare la risposta | Richiesta di Queen |
| 29/10/2026 | Lezione e spiegazione diventano due componenti riusabili (src/components/esercizio/Lezione.astro e Spiega.astro), usati sia dagli esercizi generici sia da quello SEO, che ha una pagina sua. Anche nella SEO i controlli mostrano il nome solo quando li superi | Codice semplice: si scrive una volta sola |
| 29/10/2026 | Corretto nel ricontrollo: la lezione SEO diceva "40-60 parole" mentre il controllo accetta 30-70; ora dice 30-70 | Ricontrollo |
| 29/10/2026 | Ricontrollo: prove automatiche con risposte giuste (SEA 16/16, brand 13/13, social 15/15, influencer 14/14, CRM 14/14 controlli verdi; SEO completo) e sbagliate (0-2 verdi); 6 esercizi con 4 concetti e 4 spiegazioni; nessun errore; nessuno sforamento a 390 px; conti degli esempi rifatti a mano | Ricontrollo |
| 29/10/2026 | Lezione iniziale e "Prima di rispondere" anche per i 6 esercizi dell'Hub 2 (product, trade, PR, partnership, ricerca di mercato, analytics): ora tutti i 12 esercizi spiegano prima di chiedere. Esempi su attività diverse: borraccia termica, marmellata artigianale, panificio, libreria + caffetteria, gelateria, negozio di candele. Testi scritti da Claude: DA RILEGGERE da Queen | Richiesta di Queen |
| 29/10/2026 | Corretto nel ricontrollo: nell'esercizio analytics il link UTM di esempio usciva dallo schermo del telefono (115 px); ora va a capo | Ricontrollo |
| 29/10/2026 | Ricontrollo: risposte giuste tutte verdi (product 14/14, trade 15/15, PR 14/14, partnership 14/14, ricerca 15/15, analytics 15/15), risposte sbagliate 0-2 verdi; 12 esercizi senza sforamenti a 390 px; nessun errore; conti degli esempi rifatti a mano | Ricontrollo |
| 29/10/2026 | Design della workspace SEO allineati agli esercizi: il pannello "Guida della missione" ora segue lo stesso ordine educativo (passo, domanda, "Prima di rispondere" con spiegazione ed esempio su un'altra attività, dove guardare, risposte, Controlla) e l'aiuto è chiuso, con il costo scritto (−5 punti) | Richiesta di Queen: "prima sistema i design" |
| 29/10/2026 | Tolto dai design tutto ciò che svelava la risposta: risposte già selezionate ed evidenziate in arancione, la riga della keyword giusta colorata, il riquadro "Giusto!" nelle Statistiche | Come per gli esercizi: feedback senza soluzione |
| 29/10/2026 | Pulizia tipografica: niente etichette in maiuscoletto spaziato (anche nel negozio), niente frasi spezzate con il puntino "·" nei sottotitoli; bottone Controlla con l'arancione del marchio, come nell'app | Coerenza e leggibilità |
| 29/10/2026 | Workspace SEO costruita nel sito seguendo i design approvati. Negozio: barra spedizioni, ricerca, account e carrello finti, menu con "Il Diario del tè", home con apertura, vantaggi, categorie, più venduti, banner Tisane della Sera, articoli, newsletter con consenso non spuntato; categoria con ordina e filtra; scheda prodotto con galleria, voto, prezzo con IVA e prezzo al kg, consegna, preparazione, descrizione, recensioni "di esempio di un negozio finto", prodotti correlati; piè di pagina con la nota "negozio finto" | Richiesta di Queen: "sì" ai design |
| 29/10/2026 | I problemi SEO voluti restano nelle pagine anche col nuovo aspetto: /te-verdi/ con testo povero, /matcha/ senza H1 (il titolo si vede ma non è un H1), noindex sulle tisane, link al prodotto tolto. I filtri della categoria mostrano solo gli indirizzi che il crawler trova davvero | Le missioni si basano su questi problemi |
| 29/10/2026 | Titoli del negozio in Fraunces (font libero, licenza SIL OFL, installato con @fontsource, nessun collegamento a Google Fonts). Prezzo al kg calcolato dal formato in grammi (in Italia va indicato per i prodotti venduti a peso). Voto medio di esempio calcolato dall'id del prodotto, sempre uguale | Legalità e coerenza dei dati |
| 29/10/2026 | Cornice della workspace: in alto "Livello junior" e "Missioni 0 di 5" (si aggiornerà con le missioni), menu "Il lavoro" e "Strumenti" con pallino arancione sulla voce attiva, spazio per la guida della missione a destra (pronto per le missioni). Panoramica come nel design: benvenuto, messaggio di Elena (calo calcolato dai dati: -7%), 5 missioni (la prima "In arrivo", le altre bloccate), strumenti, parole che incontrerai | Design approvati |
| 29/10/2026 | Strumenti: Console con schede delle metriche piene del colore della loro linea e l'evento del 18/09 segnato sul grafico; Indicizzazione con l'evento sul grafico, "7 in meno da metà settembre" calcolato dai dati e ogni motivo spiegato in parole semplici; Keyword con tre cifre che seguono i filtri; Crawler con i problemi divisi in Errori, Da sistemare, Da controllare | Design approvati |
| 29/10/2026 | Ricontrollo: 58 pagine del negozio e della workspace raggiunte seguendo i link, tutte rispondono; nessun errore JavaScript; nessuno sforamento a 390 px; Console tisane 3 mesi = 1.687 clic (-49% sull'anno prima), Crawler 1 pagina 404, Keyword 33 keyword e 14 dove il sito non compare | Ricontrollo |
| 29/10/2026 | Le 5 missioni del percorso SEO sono giocabili: 4 passi ciascuna, 20 in tutto. Ogni passo segue l'ordine degli esercizi: domanda, "Prima di rispondere" con spiegazione ed esempio su un'altra attività (candele, libreria, gelateria), dove guardare, risposte a scelta, Controlla, aiuto chiuso (−5 punti) | Richiesta di Queen ("ok" alle missioni) |
| 29/10/2026 | Missioni: 1 audit tecnico (pagine perse dopo il 18/09, noindex giusti e sbagliati, 404 con redirect 301, priorità); 2 keyword e cannibalizzazione ("tè verdi" per la categoria, Sencha prodotto contro guida, intenti diversi, "matcha latte ricetta" come opportunità); 3 categoria Tè verdi (CTR 0,6%, title, description, testo); 4 piano dei contenuti (tè freddo da aggiornare ad aprile-maggio, calendario dell'Avvento serve una pagina prodotto, ruolo del blog, "idee regalo" da scrivere ora); 5 caso finale (tisane -49% sull'anno prima, tè freddi stagionali, circa 470 € al mese, messaggio a Elena) | Tutte le risposte ricontrollate sui dati generati |
| 29/10/2026 | Come funziona: le missioni sono in src/data/app/seo-pro/missioni.json; la guida (src/components/seopro/GuidaMissione.astro) è a destra in tutti gli strumenti e nel negozio; se il passo si fa in un altro strumento, la guida porta lì. Dopo una risposta sbagliata spiega perché quella opzione non va; dopo quella giusta spiega il perché. "Mostrami dove guardare" evidenzia la parte dello strumento da usare | Educativo: si impara anche dall'errore |
| 29/10/2026 | Stato delle missioni salvato solo nel browser (chiave marketing-mix-percorso-seo): si sbloccano una alla volta; punti = 100 − 10 per errore − 5 per aiuto; a fine missione: punti, risposte giuste al primo tentativo, cosa hai imparato, risposta di Elena e bottone per la missione successiva. La panoramica mostra lo stato di ogni missione e "Inizia" o "Continua" | Come gli esercizi: niente dati personali sul server |
| 29/10/2026 | Ricontrollo: prova automatica di tutte le 5 missioni (20 passi) dall'inizio alla fine, con una risposta sbagliata e un aiuto nel primo passo (85 punti) e le altre giuste (100); ogni "dove guardare" trova la parte giusta della pagina; contatore "Missioni 5 di 5"; nessun errore; nessuno sforamento a 390 px | Ricontrollo |
| 29/10/2026 | Bottone "Schermo intero" nella barra in alto della workspace e del negozio: nasconde il menu a sinistra e la guida della missione, allarga la pagina e, se il browser lo permette, la mette a tutto schermo. Premendolo di nuovo (o con Esc) torna tutto com'era. La scelta resta salvata nel browser | Richiesta di Queen |
| 29/10/2026 | Spazi rifiniti con una scala regolare (8, 12, 16, 24, 32, 48, 64 px): workspace con margini più ampi (32-40 px), contenuto al massimo 1.280 px e centrato, schede e tabelle più ariose; negozio con 64 px tra le sezioni, margini di 48 px, griglie che riempiono tutta la riga, apertura con barattoli più grandi e titolo bilanciato, voto delle schede su una riga sola | Richiesta di Queen: "raffina il design, le distanze e gli spazi" |
| 29/10/2026 | Esercizi sul telefono: la scheda dei dati (es. "Dati della campagna") è richiudibile. Parte chiusa sul telefono con "Mostra" accanto al titolo, resta aperta sul computer. Così dopo la richiesta del collega si vedono subito il titolo e la lezione. Vale per i 12 esercizi e per quello SEO | Richiesta di Queen ("ok fallo") |
| 29/10/2026 | Ricontrollo: scheda chiusa sul telefono e aperta sul computer, si apre toccando il titolo; prove automatiche degli esercizi ancora tutte verdi; nessun errore; nessuno sforamento a 390 px | Ricontrollo |
| 29/10/2026 | Tolta la scheda dei dati richiudibile sul telefono (Queen: "no"); al suo posto ogni barra laterale si può chiudere da sola con la X in alto e riaprire con "Apri ..." | Richiesta di Queen: "metti l'opzione di chiudere la barra" |
| 29/10/2026 | Barre chiudibili: menu e guida nella workspace SEO, guida nel negozio, "richiesta e dati" e "Pesca e controlli" negli esercizi. Chiusa, la barra diventa una striscia sottile al bordo con il bottone per riaprirla; il centro si allarga (es. Console da 832 a 1.280 px, esercizio da 744 a 960 px). Il browser ricorda quali barre hai chiuso. Codice unico in src/scripts/pannelli.ts: basta aggiungere data-pannello e data-etichetta a una barra | Codice semplice e riusabile |
| 29/10/2026 | Ricontrollo: chiusura, riapertura e memoria delle barre su 4 pagine; nessuno sforamento a 390 px; missioni e esercizi ancora funzionanti; nessun errore | Ricontrollo |
| 29/10/2026 | Barre chiuse: al posto del testo "Apri ..." c'è un'icona (un pannello con una freccia, girata verso il lato giusto). Il nome resta per lo screen reader e appare passando sopra con il mouse. Attributo rinominato da data-pannello a data-barra perché data-pannello era già usato dalle schede degli strumenti | Richiesta di Queen: "metti un icona al posto del testo" |
| 29/10/2026 | Nuovo "Pannello del negozio": un CMS finto (come quello di un e-commerce vero) dove si scrivono title, description, H1, testo delle categorie, meta robots, reindirizzamenti 301 e impostazioni del tema. Le modifiche restano nel browser (localStorage) e si vedono ovunque: nel negozio (Ispeziona, testo nuovo, il link rotto ora porta al prodotto giusto con l'avviso del 301), nel crawler (righe cambiate evidenziate), in Pagine e indicizzazione (colonna "Sul sito oggi" e bottone Convalida correzione) e nella Console (Controllo URL e Richiedi indicizzazione). Codice in src/scripts/cms.ts | Richiesta di Queen: esercizi junior più realistici, "qui possono scrivere e gli effetti si devono vedere sul sito" |
| 29/10/2026 | Missioni 1 e 3 riscritte con passi "azione": non si sceglie una risposta, si sistema il sito (tisane visibili, 301 per il 404, catena accorciata, convalida; title, description e testo di /te-verdi/, richiesta di indicizzazione). La guida controlla com'è il sito con una lista di controlli verdi/rossi e suggerimenti (src/scripts/verifiche.ts). Nei passi azione si può riprovare senza perdere punti. Dopo il successo si vede la soluzione di un collega senior come confronto | Correzione: verifica automatica a regole semplici, poi confronto con una soluzione di riferimento (unisce le due opzioni della decisione aperta) |
| 29/10/2026 | Missioni 2, 4 e 5 restano a scelta per ora: le rendiamo pratiche nel prossimo passo | Una cosa alla volta |
| 29/10/2026 | Ricontrollo: prova automatica di tutte e 5 le missioni (100 punti), effetti verificati su negozio, crawler, indicizzazione e console; title di esempio accorciato perché era esattamente a 580 px; conferma del ripristino nella pagina al posto della finestra del browser; nessun errore; nessuno sforamento a 390 px. Testi scritti da Claude: DA RILEGGERE | Ricontrollo |
| 29/10/2026 | Tutorial obbligatorio prima delle missioni (si può saltare con un link piccolo): 5 passi, 10 minuti. 1) come è fatta la scrivania (menu, strumento, guida; "Mostrami dove" evidenzia il menu); 2) nel negozio premi Ispeziona e trovi il title di /te-verdi/ (title diverso da H1); 3) nel crawler usi il filtro H1 mancante e trovi /matcha/; 4) nel Pannello aggiungi l'H1 a /matcha/ e la guida lo controlla; 5) regole su punti, aiuti e scelta delle missioni. Nel tutorial gli errori non tolgono punti | Feedback di Queen: "non si capisce bene quello che devi fare e come si fanno le cose ... ci deve essere un tutorial prima" |
| 29/10/2026 | Missioni in ordine di difficoltà, con livello indicato da tacche (1 = Facile, 2 = Media, 3 = Difficile): 1 Riscrivi la categoria Tè verdi (Facile), 2 Piano dei contenuti (Facile), 3 Keyword e cannibalizzazione (Media), 4 Audit tecnico (Difficile), 5 Caso finale (Difficile). Dopo il tutorial sono tutte aperte: si sceglie da quale partire; la panoramica segna la "Consigliata ora" (la prima non completata) | Feedback di Queen: "gli esercizi devono andare da facile a difficile e puoi scegliere quale fare". Le missioni pratiche con un solo compito chiaro sono più facili di quelle che chiedono di collegare più strumenti |
| 29/10/2026 | Ogni passo ora ha "Come si fa": istruzioni numerate (apri questo, clicca quello, scrivi qui, premi Controlla) con link diretti alla pagina giusta. Vengono prima della teoria, che resta sotto con il titolo "Da sapere". "Mostrami dove" c'è anche nei passi in cui si modifica il sito, solo se l'elemento è nella pagina aperta | Feedback di Queen: non si capiva cosa fare e come |
| 29/10/2026 | Ricontrollo: prova automatica di tutorial + 5 missioni (tutte completate, nessun errore), prova del "salta il tutorial" e della scelta libera (Audit tecnico avviabile subito), nessuno sforamento a 390 px. Testi nuovi scritti da Claude: DA RILEGGERE | Ricontrollo |
| 29/10/2026 | Percorso SEO rifatto da zero con la struttura A "scala a livelli" (scelta di Queen tra A scala a livelli, B per strumento, C mappa per area). Livello 0 Tutorial; Livello 1 Basi (un concetto, uno strumento, un'azione, 5-8 minuti); Livello 2 Diagnosi (trovi il problema nei dati e lo correggi, 10-20 minuti); Livello 3 Casi (più strumenti e priorità, 30 minuti). Un livello si apre quando è finito quello prima; dentro il livello l'ordine è libero | Scelta di Queen: "A". Più chiara, obbliga ad andare dal facile al difficile ma lascia scegliere dentro il livello |
| 29/10/2026 | Esercizi brevi (11 + tutorial) al posto di 5 missioni lunghe. Storia di Elena tenuta leggera: due righe di situazione all'inizio di ogni esercizio, il calo di ottobre è l'ultimo caso | Scelte di default dichiarate a Queen, da confermare |
| 29/10/2026 | Programma. Tutorial: scrivania, Ispeziona, prima modifica nel Pannello (H1 di /accessori/), regole. Basi: title e H1 (/te-neri/), H1 mancante (/matcha/), title duplicati (scheda Assam), meta description (Darjeeling, e capire che il carrello non serve), redirect 301 (Earl Grey). Diagnosi: tisane sparite (noindex + convalida), tè verdi poco cliccati (CTR, title, testo, richiesta), catena di redirect, cannibalizzazione. Casi: piano dei contenuti, calo di ottobre | I contenuti buoni delle missioni di prima sono stati riusati; ogni esercizio Basi lavora su una pagina diversa così l'ordine è davvero libero |
| 29/10/2026 | Formato fisso di ogni esercizio: messaggio di Elena, obiettivo in una riga, "Come si fa" numerato, "Da sapere" (teoria + esempio), scelta o modifica controllata, poi spiegazione o soluzione di un collega senior da confrontare | Si impara una volta come funziona un esercizio e vale per tutti |
| 29/10/2026 | Tecnica: livelli in missioni.json (campo livelli + livello e situazione per esercizio); progressi salvati con una chiave nuova (marketing-mix-percorso-seo-v2) perché gli esercizi sono cambiati; script di creazione tenuto in strumenti-dati/crea_esercizi_seo.py come traccia | Codice semplice, tutto tracciato per il case study |
| 29/10/2026 | Ricontrollo: prova automatica di tutorial + 11 esercizi in ordine (livelli che si aprono al momento giusto, tutti a 100 punti, nessun errore); controllate nel crawler le risposte dei nuovi esercizi (title duplicati, description mancanti, catena con i salti nei dettagli); corretti due testi che non corrispondevano a quello che mostra lo strumento; nessuno sforamento a 390 px. Testi nuovi scritti da Claude: DA RILEGGERE | Ricontrollo |
| 30/10/2026 | Nuova divisione dei ruoli: gli esercizi degli Hub (tutti i ruoli, livello Studente) diventeranno esercizi per imparare la teoria, in forma di "lezione a blocchi + mini quiz" (un concetto, 1-2 domande, il concetto dopo, alla fine riepilogo e domande finali). Il percorso SEO junior diventa la parte per praticare | Richiesta di Queen: "gli esercizi di non specializzati all'inizio devono essere ... per imparare la parte teorica e seo junior diventa invece per praticare" |
| 30/10/2026 | SEO junior: ogni esercizio grande è un piccolo progetto di 6-8 mini esercizi, ognuno con la sua teoria (spiegazione, esempio, errore comune), istruzioni e controllo. Fatto prima il livello Basi: "Le schede dei tè neri" (8 mini: title vs H1, dove compare il title, title generico, title duplicati nel crawler, quante pagine, riscrivi Assam, quale pagina non serve, description Darjeeling) e "Titoli nascosti e link rotti" (7 mini: H1 mancante, perché un titolo grande non è un H1, aggiungi H1, quante pagine linkano il 404, sostituto, crea il 301, aggiorna i link interni) | Richiesta di Queen: "mini esercizi dentro ogni grande esercizio", "deve essere più teoria" |
| 30/10/2026 | Difficoltà che cresce con il livello (solo nella parte specializzata, non negli Hub): Basi con istruzioni passo per passo; Diagnosi con le istruzioni nascoste dietro "Mostra i passi" (costa 5 punti); Casi senza istruzioni e senza "Mostrami dove". Prossimo: rifare Diagnosi e Casi come progetti più lunghi con più problemi mescolati e trappole | Scelte di Queen: "meno guida salendo di livello" e "più problemi insieme"; "è per il livello specializzato e non per le hub" |
| 30/10/2026 | Ricontrollo: prova automatica di tutto il percorso (tutorial + 8 esercizi), risposte verificate sui dati (8 pagine con title generico, 404 linkata da 6 pagine compresa la home, Ispeziona di /matcha/ dice H1 manca), guida diversa nei tre livelli verificata. Testi nuovi scritti da Claude: DA RILEGGERE | Ricontrollo |
| 30/10/2026 | Bug: se nel negozio restavano modifiche fatte prima (es. H1 di Matcha già messo, 301 dell'Earl Grey già creato), gli esercizi non tornavano: il crawler non trovava più la pagina 404 né l'H1 mancante. Correzione: ogni esercizio dichiara quali parti del negozio usa (campo "prepara") e quando lo inizi o lo rifai quelle parti tornano com'erano. In più nella guida c'è "Ricomincia l'esercizio" | Segnalazione di Queen ("ci sono dei bug nell'esercizio"); trovato provando gli esercizi con le modifiche dei giorni prima |
| 30/10/2026 | Altri bug corretti: la guida non portava alla scheda Assam quando il mini esercizio cambiava pagina del negozio; nel crawler la colonna Title era fuori schermo con la guida aperta (ora il title è sotto l'indirizzo); nel Pannello le righe dei reindirizzamenti e dell'elenco pagine non avevano stile (gli stili di Astro valgono solo per l'HTML scritto nella pagina, non per quello creato dallo script: servono le regole :global) e la colonna Stato era tagliata | Ricontrollo fatto "da utente": seguendo i link della guida, con screenshot di ogni mini esercizio |
| 30/10/2026 | Guida degli esercizi ridisegnata: in alto domanda e risposta, sotto tre schede di aiuto chiuse finché non servono. "Come funziona" spiega solo come si usa lo strumento (testi in aiuto-strumenti.json, uguali per tutti gli esercizi: non possono contenere la soluzione), "Teoria" è gratis (spiegazione, esempio, errore comune), "Indizio" costa 5 punti e chiede conferma. Il bottone Controlla resta fisso in basso e dopo la risposta giusta diventa "Passo successivo". Guida larga 400 px | Feedback di Queen: "da sapere ... più come aiuto", "come si fa non deve dire il risultato ma spiegare solo come funziona la piattaforma", "sistemerei il layout"; proposta con mockup approvata ("ok va bene") |
| 30/10/2026 | La guida cala con il livello: Basi con "Come funziona" già aperto; Diagnosi con tutte le schede chiuse; Casi solo con la Teoria (niente indizi, niente "Mostrami lo strumento") | Difficoltà che cresce, scelta di Queen |
| 30/10/2026 | Diagnosi rifatta in 3 esercizi da 7 mini esercizi, con falsi allarmi mescolati ai problemi veri: "Le tisane sparite" (quando, quale motivo, quali noindex sono giusti, da dove arriva, correzione, cosa vede Google, convalida); "La pagina dei tè verdi" (CTR, stima dei clic in più, cannibalizzazione, title, testo, richiesta); "Pagine doppie e redirect" (filtri duplicati, canonical, catena, un redirect che va bene, pagine fuori da Google che vanno bene così) | Richiesta di Queen: "fai gli altri esercizi", difficoltà molto più alta, più problemi insieme |
| 30/10/2026 | Casi rifatti in 3 esercizi con testi da scrivere nella guida e controllati: "Audit di fine mese" (Core Web Vitals, priorità, richiesta al team web, title troppo lungo che causa la cannibalizzazione, ordine dei lavori), "Il calo di ottobre" (percentuali, confronto con l'anno prima, causa, costo, urgenza invernale, riepilogo per Elena), "Il piano dei contenuti" (con brief per il copywriter). Nuovo tipo di mini esercizio "testo" | Pratica più realistica: nel lavoro vero si scrivono richieste e riepiloghi |
| 30/10/2026 | Ricontrollo: giro completo automatico "da utente" partendo da un negozio già modificato (tutorial + 8 esercizi, 59 mini esercizi, tutti superati, nessun errore), schede di aiuto giuste per livello, telefono senza sforamenti. Trovato e corretto un conflitto: il campo di testo della guida aveva lo stesso attributo della casella di ricerca degli strumenti. Testi nuovi scritti da Claude: DA RILEGGERE | Ricontrollo |
| 30/10/2026 | Struttura degli Hub decisa (proposta approvata da Queen): ogni ruolo ha scheda del ruolo, 3 lezioni da circa 10 minuti fatte di 4-5 blocchi (concetto, esempio su Cinque Foglie, 1-2 domande), riepilogo e 3 domande finali, verifica da 8 domande (almeno 6 giuste), prova veloce facoltativa (gli esercizi pratici di prima), link al percorso pratico. Si fa prima un ruolo pilota (SEO), poi gli altri a gruppi di tre | Hub = teoria, percorsi specializzati = pratica |
| 30/10/2026 | Domande di teoria di 5 tipi: scelta singola, multipla, vero o falso, metti in ordine (con frecce su e giù, accessibili anche da tastiera), abbina (con menu a tendina). Se sbagli vedi la spiegazione e riprovi, senza punti persi; nella verifica invece la correzione arriva solo alla fine, con la revisione di tutte le risposte | È teoria: si impara sbagliando; la verifica misura cosa è rimasto |
| 30/10/2026 | Approfondimenti della teoria sul blog: ogni blocco può avere "Approfondisci sul blog" (solo verso articoli che esistono). Articoli da scrivere per la SEO: intento di ricerca; noindex, robots.txt e canonical; redirect 301 e pagine 404; Core Web Vitals spiegati semplici; Search Console per chi inizia | Richiesta di Queen: "per approfondimenti alla teoria andrà al blog" |
| 30/10/2026 | Layout: /app/ diventa l'ingresso degli Hub (azienda, "Come funziona" in 3 passi, ruoli divisi in Hub 1 "Farsi trovare e parlare con i clienti" e Hub 2 "Prodotto, vendite e dati", 3 per riga, con stato della teoria). Pagina del ruolo con testata scura, scheda in riquadri, percorso a passi numerati e avanzamento a destra. Lezione a tre colonne: indice dei blocchi, blocco al centro, parole da ricordare a destra; al telefono una colonna. I nomi dei due Hub sono una proposta di Claude | Richiesta di Queen: "sistema il layout anche" |
| 30/10/2026 | Ricontrollo: lezioni SEO e verifica fatte con una prova automatica (risposta sbagliata blocca "Avanti" e mostra la spiegazione; 7 su 8 supera la verifica; stato salvato e mostrato nella pagina del ruolo e in /app/), nessun errore, nessuno sforamento a 390 px. Corretto un altro scontro con la classe globale .scheda. Fatti SEO ricontrollati (soglie Core Web Vitals, robots.txt e noindex, 301/302, Regolamento CE 1924/2006). Testi DA RILEGGERE | Ricontrollo |
| 30/10/2026 | Bug segnalato: "se sbagli poi non puoi più andare avanti". Nelle prove automatiche correggere la risposta sbloccava "Avanti", ma una persona poteva restare bloccata se non riusciva a trovare la risposta (soprattutto nel "metti in ordine", che funzionava solo con le frecce). Correzione: dopo due tentativi sbagliati compare "Vedi la soluzione" (lezioni) o "Mostra la risposta" (guida SEO junior), che mostra la risposta giusta e lascia andare avanti. Nella guida gli errori hanno già tolto punti | Segnalazione di Queen; regola: in un esercizio non si deve mai restare bloccati |
| 30/10/2026 | "Metti in ordine" con il trascinamento (drag and drop) fatto con i Pointer Events: funziona con mouse, dito e penna. Dal telefono si trascina dalla maniglia ⠿, così la pagina continua a scorrere. Restano le frecce su e giù per chi usa la tastiera. Nessuna libreria esterna | Richiesta di Queen: "per mettere le cose nella posizione è meglio il drag n drop" |
| 30/10/2026 | Causa del blocco nelle lezioni (indicata da Queen: "la domanda prima della soluzione", cioè il blocco con due domande prima del riepilogo): ogni domanda aveva il suo bottone Controlla, e se se ne controllava una sola "Avanti" restava spento senza spiegare perché. Correzione: un solo bottone "Controlla le risposte" alla fine del blocco, che corregge tutte le domande insieme; "Avanti" premuto troppo presto dice "Prima rispondi alle domande e premi Controlla" e porta al bottone | Segnalazione di Queen; le prove automatiche premevano ogni bottone e non vedevano il problema: lezione per il case study, provare anche come una persona distratta |
| 30/10/2026 | Ingresso del prodotto: dopo il bottone del sito ("Entra in azienda") si sceglie tra Teoria (gli Hub, ora in /app/teoria/) e Simulazioni (/app/simulazioni/). Il "percorso SEO junior" si chiama ora "Simulazione SEO" in tutta l'interfaccia (l'indirizzo /app/percorsi/seo/ resta uguale per non rompere i link); tolta l'etichetta "Livello junior" | Richiesta di Queen: "entrare subito nelle simulazioni junior che adesso chiameremo solo simulazioni", "puoi scegliere se fare teoria o pratica" |
| 30/10/2026 | Pagina Simulazioni: la Simulazione SEO in evidenza (livelli, esercizi, durata, avanzamento) e gli altri 11 ruoli "in arrivo" con link alla loro teoria | Una simulazione alla volta, come deciso nell'ordine di costruzione |
| 30/10/2026 | Ricontrollo: ingresso, scelta e pagine nuove su computer e telefono senza sforamenti; teoria completa con errori in ogni blocco e "Avanti" premuto troppo presto; simulazione SEO completa (59 mini esercizi); nessun link interno rotto nelle pagine principali | Ricontrollo |
| 30/10/2026 | SEA, brand e social vanno fatti completi come la SEO (teoria + prova veloce + simulazione), prima degli altri ruoli | Decisione di Queen: "sono i ruoli che vogliono fare maggiormente le persone" (cambia la regola "altri ruoli solo dopo aver visto l'uso del primo") |
| 30/10/2026 | Teoria di SEA, brand e social fatta con la stessa struttura della SEO: 3 lezioni da 4 blocchi per ruolo, verifica da 8 domande, prova veloce (gli esercizi già esistenti). SEA: asta e punteggio di qualità, corrispondenze, keyword negative, annunci adattabili (15 titoli da 30 caratteri, 4 descrizioni da 90), CPA e ROAS, consenso ai cookie. Brand: brand e logo, identità e immagine, posizionamento, dichiarazioni ambientali, manuale, tono di voce, notorietà, NPS, marchio UIBM/EUIPO, crisi. Social: obiettivi, piattaforme, algoritmo, pilastri, formati, calendario, UGC e diritti, accessibilità, metriche, engagement rate, community, #adv, concorsi a premio (DPR 430/2001). Testi DA RILEGGERE | Prima la teoria (veloce), poi le simulazioni (da progettare e approvare) |
| 30/10/2026 | Ricontrollo: lezioni e verifiche dei 3 ruoli completate con prova automatica, stato salvato nella pagina del ruolo e nelle carte degli Hub, nessuno sforamento a 390 px. Se un ruolo non ha ancora la simulazione, pagina e verifica lo dicono invece di mandare alla pratica | Ricontrollo |
| 30/10/2026 | Motore comune delle simulazioni (src/scripts/motore.ts): livelli, avvio, punti, controllo delle risposte e "prepara" sono gli stessi per tutte le simulazioni. Ogni simulazione dà solo i suoi esercizi, la sua chiave di salvataggio e la funzione che rimette com'erano le parti usate. La guida e la cornice degli strumenti scelgono la simulazione con l'attributo sim | Fare il Social (e poi SEA e Brand) senza riscrivere la guida; la SEO funziona come prima (giro completo da 59 mini esercizi ripassato) |
| 30/10/2026 | Simulazione Social: 5 strumenti con nomi generici ispirati ai social (Il profilo, Calendario e post, Commenti e messaggi, Statistiche dei post, Libreria foto e musica). Persona che assegna i compiti: Sara L., social media manager (inventata). Problemi nascosti nei dati: dal 21/09 i post programmati in blocco escono alle 03:00 (copertura dimezzata); una foto di una cliente usata senza permesso; un reel con kit regalato senza etichetta di collaborazione; commenti con dati personali, spam, insulto e una critica sincera da NON nascondere; falsi allarmi (una foto prodotto bassa per il formato, non per l'orario; una foto con licenza commerciale) | Stessa logica della SEO: un problema trovato in uno strumento si ritrova negli altri |
| 30/10/2026 | Esercizi Social: Tutorial; Basi (il post del kit matcha, leggere le statistiche); Diagnosi (i post delle 3 di notte, una settimana di commenti, foto/diritti/collaborazioni); Casi (il calendario di novembre con lancio e Black Friday e link UTM, una piccola crisi con le fruste rotte). 50 mini esercizi. Le verifiche controllano il lavoro fatto negli strumenti (es. prima frase della didascalia sotto 125 caratteri, 3-8 hashtag, niente promesse sulla salute, risposta che non ripete i dati personali, #adv all'inizio, parametri UTM in minuscolo, nessun commento di crisi nascosto). Testi DA RILEGGERE | Ricontrollo: giro completo senza errori; 18 prove "in negativo" (lavoro sbagliato) tutte respinte; nessuno sforamento a 390 px |
| 30/10/2026 | Calendario: una bozza si programma trascinandola su un giorno (computer) oppure scegliendo data e ora nell'editor (funziona anche sul telefono). Cambiare l'ora predefinita non sposta i post già programmati: è parte dell'esercizio (vanno spostati uno per uno, come negli strumenti veri) | Insegnare che una correzione vale per il futuro e va controllato ciò che è già in coda |
| 30/10/2026 | La teoria del ruolo Social ora porta alla Simulazione Social; la pagina Simulazioni mostra SEO e Social come disponibili | La pratica del Social esiste |
| 30/10/2026 | Tolti i riferimenti alla vecchia versione del prodotto (la "scrivania" con le richieste dei ruoli, la pagina dei risultati e la pagina delle ricerche). Le pagine /app/scrivania/, /app/riepilogo/ e /app/dati/ricerche/ non esistono più: chi ha quei link salvati arriva all'ingresso dell'app (redirect in astro.config.mjs). Le prove veloci ora tornano alla pagina di teoria del ruolo (bottone "Teoria del ruolo" e, a fine correzione, di nuovo lì); tolta la nota "le prove veloci sono anche nella scrivania" dalla pagina Teoria | Richiesta di Queen: "togli il riferimento agli hub vecchi che esistono ancora". Così c'è una sola strada: Teoria o Simulazioni |
| 30/10/2026 | Simulazione Brand: oltre a identità, posizionamento e tono di voce comprenderà la strategia di brand e la parte press (comunicati stampa e rapporti con i giornalisti) | Decisione di Queen ("in brand metti anche strategia e pres"; "pres" = press) |
| 30/10/2026 | Le emoji restano nei contenuti finti della Simulazione Social (bio e commenti degli utenti inventati), perché i profili veri le usano; l'interfaccia resta senza emoji | Confermato da Queen |
| 30/10/2026 | Simulazione SEA: 4 strumenti con nomi generici ispirati agli strumenti per gli annunci sui motori di ricerca (Campagne, Termini di ricerca, Pianificatore keyword, Rendimento sul sito). Persona che assegna i compiti: Davide R., performance marketing manager (inventato). Dati di ottobre coerenti tra gli strumenti (strumenti-dati/genera_sea.py): Tè verdi spende 903 € con ROAS 0,9 perché «tè verde» in corrispondenza generica attira ricerche informative (benefici, dimagrire, ricetta, campioni gratis, lavoro) e il gruppo Sencha porta alla home (rimbalzo 78%); il gruppo «Tisane della sera» usa l'annuncio copiato dai tè verdi (punteggio di qualità 3 e 4); Kit e idee regalo rende 4,6 ma perde il 38% delle impressioni per budget. Falsi allarmi: «gyokuro» con 18 clic ma ROAS 6; «tisane biologiche» che da sola è in pari. Margine 40% → ROAS di pareggio 2,5 | Stessa logica di SEO e Social |
| 30/10/2026 | Esercizi SEA: Tutorial; Basi (la campagna del kit matcha da costruire e pubblicare, leggere i numeri: CTR, CPC, tasso di conversione, CPA, ROAS); Diagnosi (Tè verdi: negative, corrispondenza, pagina di arrivo; punteggio di qualità delle tisane); Casi (budget del Black Friday con ROAS di pareggio e impressioni perse; annunci del Black Friday con prezzo di riferimento Omnibus, niente affermazioni non dimostrabili, data di fine). 42 mini esercizi. Due Diagnosi invece di tre: preferita la qualità a un terzo esercizio poco solido. Testi DA RILEGGERE | Proposta approvata da Queen ("Si") |
| 30/10/2026 | Le verifiche SEA controllano il lavoro negli strumenti: parole chiave con intento di acquisto e a frase/esatta, titoli ≤30 e descrizioni ≤90 caratteri, URL finale che esiste nel negozio, negative che escludono le ricerche sbagliate senza bloccare quelle che vendono (una negativa blocca una ricerca se tutte le sue parole sono nella ricerca), budget sotto il tetto e niente budget in più a chi è sotto il pareggio. Corretto un controllo troppo largo: «prezzo più basso degli ultimi 30 giorni» veniva scambiato per il superlativo vietato «i prezzi più bassi» | Ricontrollo: giro completo SEA senza errori, 20 prove "in negativo" tutte respinte, SEO (59) e Social (50) ripassati senza errori, nessuno sforamento a 390 px |
| 30/10/2026 | Simulazione Brand (con strategia e press, come chiesto da Queen): 5 strumenti (Manuale del brand, Ricerche sul brand, Testi del brand, Piano di brand, Ufficio stampa). Persona che assegna i compiti: Irene P., brand manager (inventata). Dati (strumenti-dati/genera_brand.py): segmenti di clienti, 3 concorrenti, NPS da 52 a 31 a ottobre per le spedizioni (il sito promette 24 ore, la media è 4,1 giorni), ricerche del nome in calo da settembre a ottobre ma come ogni anno e +22% sul 2025 (falso allarme), notorietà spontanea 4% e guidata 21%, frase «100% sostenibile, impatto zero» sulla scatola, lista di 8 giornalisti inventati (2 fuori tema, 1 che ha chiesto di non essere contattato), domanda di un giornalista sui kit rotti | Stessa logica delle altre simulazioni |
| 30/10/2026 | Esercizi Brand: Tutorial; Basi (posizionamento con la formula per chi/che cosa/differenza/prova; tono di voce con email e risposta dell'assistenza da riscrivere); Diagnosi (cosa pensano di noi: NPS, motivi, promessa del sito da allineare, falso allarme delle ricerche; packaging con le affermazioni ambientali generiche vietate dalla direttiva UE 2024/825, in vigore dal 27/09/2026, e il falso allarme «biologico» certificato); Casi (strategia 2027 con obiettivo SMART, canali e KPI; ufficio stampa: notizia, comunicato, destinatari, embargo, risposta in crisi, niente «fuori registrazione»). 36 mini esercizi. Testi DA RILEGGERE | Struttura approvata da Queen ("Va bene così") |
| 30/10/2026 | Ricontrollo Brand: giro completo senza errori, 15 prove "in negativo" tutte respinte, nessuno sforamento a 390 px. Ripassate SEO (59 mini esercizi), Social (47) e SEA (40) senza errori. Per i test il sito si serve con un server statico sulla cartella dist (il server di anteprima di Astro si chiudeva a ogni nuova build) | Ricontrollo |
| 30/10/2026 | Le quattro simulazioni (SEO, SEA, Brand, Social) e la teoria dei quattro ruoli sono complete: ogni ruolo ha scheda, 3 lezioni, verifica, prova veloce e simulazione | Obiettivo fissato da Queen: "sea, brand e social per forza completi" |
| 30/10/2026 | Blog SEO: 8 articoli nuovi in italiano e in inglese (16 file), scritti da Claude e firmati Queen, DA RILEGGERE. Guide: Come scegliere le keyword; Content strategy per principianti; Noindex, robots.txt e canonical; Google Search Console per chi inizia. Pillole: L'intento di ricerca; Come Google trova e ordina le pagine; Redirect 301 e pagine 404; Core Web Vitals (LCP, INP, CLS). Ogni articolo ha In 30 secondi, consiglio di Pesca, domanda, FAQ ed esempio su Cinque Foglie coerente con la Simulazione SEO. Le versioni inglesi usano keyword ed esempi pensati in inglese (non tradotti parola per parola) | Richiesta di Queen: "facciamo gli articoli blog seo"; completano il gruppo SEO del piano del blog e gli approfondimenti promessi dalla teoria |
| 30/10/2026 | Fatti ricontrollati su fonti aggiornate prima di scrivere: soglie dei Core Web Vitals (LCP 2,5 s, INP 200 ms, CLS 0,1, al 75° percentile; INP ha sostituito FID a marzo 2024) e i 16 mesi di dati di Search Console. Volumi delle keyword negli articoli: nessun numero inventato presentato come vero | Regola "ricontrolla sempre" |
| 30/10/2026 | Teoria SEO: 11 blocchi su 14 ora rimandano all'articolo del blog più vicino ("Approfondisci sul blog"). Il generatore controlla che il file dell'articolo esista prima di creare il link | Mai link verso articoli che non esistono |
| 30/10/2026 | Ricontrollo: build senza errori, nessun link interno al blog rotto (IT ed EN), descrizioni sotto i 160 caratteri, nessuno sforamento a 390 px. Le tabelle a 4 colonne sul telefono scorrono di lato (comportamento già esistente) | Ricontrollo |
| 30/10/2026 | Blog Social e Brand: 16 articoli nuovi in italiano e in inglese (32 file), scritti da Claude e firmati Queen, DA RILEGGERE. Social (7): Cosa fa un social media manager (articolo del ruolo); Come fare un calendario editoriale; Come funziona l'algoritmo dei social; Foto dei clienti, musica e testo alternativo; Le metriche dei social; Gestire commenti e community; Pubblicità, concorsi e privacy sui social. Brand (9): Cosa fa un brand manager (articolo del ruolo); Tono di voce; Brand identity; Il posizionamento di marca; Il manuale del brand; Come si misura un brand (notorietà, NPS, ricerche del nome); Green claims; Come proteggere il marchio (UIBM, EUIPO); Comunicazione di crisi. Esempi coerenti con le simulazioni Social e Brand | Richiesta di Queen: "anche articoli social e brand" |
| 30/10/2026 | Fatti ricontrollati su fonti ufficiali o aggiornate: concorsi a premio (DPR 430/2001: comunicazione al MIMIT almeno 15 giorni prima, cauzione pari al 100% dei premi, notaio o funzionario camerale), linee guida e codice di condotta AGCOM sugli influencer del 2025 (obblighi specifici da 500.000 follower o un milione di visualizzazioni medie al mese, sanzioni fino a 250.000 euro), direttiva UE 2024/825 sulle affermazioni ambientali (si applica dal 27/09/2026) | Regola "ricontrolla sempre" e legalità UE |
| 30/10/2026 | Teoria Social e Brand: ogni blocco (12 su 12) rimanda all'articolo più vicino; la scheda del ruolo («Fa per te?») porta all'articolo del ruolo. Il generatore controlla che ogni articolo esista. Tolto il link allo strumento «Controllo contrasto colori» dall'articolo sulla brand identity: lo strumento non è ancora pronto | Mai link verso cose che non esistono |
| 30/10/2026 | Ricontrollo: build senza errori, nessun link interno rotto, ogni articolo italiano ha la sua versione inglese (29 + 29), descrizioni sotto i 160 caratteri, nessuno sforamento a 390 px | Ricontrollo |
| 30/10/2026 | Newsletter tolta per ora: sezione della home, testi e stili rimossi (nessuna raccolta di email). Si rimetterà quando ci sarà un servizio con doppio consenso e informativa | Richiesta di Queen: "per adesso togli la newsletter" |
| 30/10/2026 | Responsive: controllate tutte le pagine a 390, 768 e 1280 px, nessuno sforamento orizzontale. Nel blog le tabelle con 3 o più colonne diventano schede sul telefono | Richiesta di Queen: "rendi il sito e prodotto responsive" |
| 30/10/2026 | Prodotto bilingue, scelta di Queen: "Tutto, anche le simulazioni". Ogni pagina dell'app esiste in /app/ (italiano) e /en/app/ (inglese), con selettore IT/EN in alto. I progressi sono gli stessi nelle due lingue (gli id degli esercizi non cambiano) | Richiesta di Queen + risposta alla domanda |
| 30/10/2026 | Metodo di traduzione dei dati: ogni file JSON ha un gemello .en.json con la stessa forma. Lo strumento strumenti-dati/traduzioni.py estrae le frasi in un file numerato (.it.txt), la traduzione va in .en.txt con gli stessi numeri, poi "applica" crea il JSON inglese. Non traduce mai id, link e codici; segnala se i numeri cambiano; "riallinea" tiene le traduzioni quando l'italiano cambia | Un solo metodo, ripetibile e controllabile |
| 30/10/2026 | Fatto in inglese finora: teoria dei 4 ruoli (lezioni e quiz), le 11 prove veloci con correzione, la guida degli esercizi, la cornice delle simulazioni, l'aiuto degli strumenti e tutta la Simulazione Social. Le verifiche Social accettano testi in italiano e in inglese (scuse, privato, rimedio, promesse sulla salute ecc.). Numeri in formato inglese (1,234.5 e €12) | Avanzamento |
| 30/10/2026 | Ricontrollo: le 11 prove veloci passano in IT e in EN; Simulazione Social completa senza errori in IT e in EN (8 esercizi, 47 mini esercizi); prove "in negativo" respinte in entrambe le lingue | Ricontrollo |
| 30/10/2026 | Traduzioni scritte da Claude: DA RILEGGERE. Da fare: Simulazioni SEA, Brand e SEO in inglese (per la SEO anche dati di ricerca pensati per l'inglese), poi i link del sito inglese verso /en/app/ e il controllo responsive delle pagine inglesi | Lavoro su più sessioni |
| 30/10/2026 | Simulazione SEA in inglese: account, annunci, termini di ricerca, pianificatore, 7 esercizi e pagine tradotti. Le parole chiave sono pensate per chi cerca in inglese («matcha kit», «green tea», «green tea benefits»…), non tradotte parola per parola. Gli indirizzi del negozio restano quelli di oggi (/te-verdi/, /matcha/kit-matcha/) finché non si traduce il negozio con la SEO | Richiesta di Queen: "ok fai SEA" |
| 30/10/2026 | Verifiche SEA bilingui: parole chiave informative, negative, inviti all'azione, superlativi e promesse sulla salute riconosciuti anche in inglese. «Il prezzo più basso degli ultimi 30 giorni» resta permesso perché è il prezzo di riferimento della direttiva Omnibus, non un superlativo | Ricontrollo: un primo controllo lo respingeva per errore |
| 30/10/2026 | Ricontrollo SEA: giro completo senza errori in italiano e in inglese (7 esercizi, 40 mini esercizi); 12 prove "in negativo" in inglese e 20 in italiano corrette; nessuno sforamento a 390 px | Ricontrollo |
| 30/10/2026 | Simulazione Brand in inglese: manuale, ricerche, testi, piano di brand, ufficio stampa e 7 esercizi tradotti. Il «tu» del manuale diventa in inglese «warm and direct, never stiff and formal», perché in inglese tu e lei non esistono: il controllo cerca le formule fredde («Dear customer», «we hereby inform you», «Yours faithfully») | Richiesta di Queen: "brand" |
| 30/10/2026 | Nel piano di brand canali e KPI si salvano con un codice uguale nelle due lingue (il nome italiano); cambia solo l'etichetta mostrata. Così i progressi restano validi se si cambia lingua | Coerenza dei dati tra le lingue |
| 30/10/2026 | Ricontrollo Brand: giro completo senza errori in italiano e in inglese (7 esercizi, 36 mini esercizi); 11 prove "in negativo" in inglese e 15 in italiano corrette; nessuno sforamento a 390 px | Ricontrollo |
| 30/10/2026 | Simulazione SEO in inglese: negozio, pannello, cinque strumenti, 9 esercizi (719 frasi) ed esercizio veloce del Sencha. Le ricerche non sono tradotte parola per parola ma ripensate come le scriverebbe una persona in inglese («tè verde» → «green tea», «tisane per dormire» → «herbal tea for sleep», «calendario dell'avvento tè» → «tea advent calendar»); volumi, posizioni e numeri restano gli stessi | Richiesta di Queen: "ok fallo" (SEO in inglese, negozio compreso) |
| 30/10/2026 | Nel negozio inglese gli indirizzi restano quelli italiani (/te-verdi/sencha-bio/): sono codici che usano pannello, crawler, redirect e verifiche. Anche tipo di pagina, motivi di esclusione e intento restano codici italiani nei dati; in inglese si mostrano con un'etichetta (i motivi con i nomi veri di Search Console, es. «Excluded by 'noindex' tag») | Così i progressi e le modifiche al negozio valgono in tutte e due le lingue |
| 30/10/2026 | Verifiche SEO bilingui: in inglese l'aggettivo viene prima («Organic green teas: …»), quindi per il title della categoria basta che «green tea(s)» sia tra le prime parole, non per forza all'inizio | Differenza di grammatica tra italiano e inglese |
| 30/10/2026 | Corretto un controllo sulla salute: cercava «grass» per trovare «grassi», ma bloccava anche l'inglese «grassy» (erbaceo). Ora cerca solo grassi, grasso, grassa, grasse | Errore trovato dal giro completo in inglese |
| 30/10/2026 | Il sito inglese ora porta all'app inglese (/en/app/) e non dice più «in Italian»: Home, Ruoli, pagina del ruolo, articoli del blog, strumenti e menu. Tolto il file del riassunto inglese degli esercizi (data/en/esercizi.json), non serve più | L'app è bilingue |
| 30/10/2026 | Pulizia: tolti dal repository 27 screenshot delle prove finiti per sbaglio nella cartella principale e i file temporanei di Python; aggiunti al .gitignore | Ordine del progetto |
| 30/10/2026 | Ricontrollo SEO: giro completo senza errori in italiano e in inglese (tutorial + 9 esercizi, tutti a 100 punti); 18 prove "in negativo" in inglese corrette; esercizio veloce del Sencha con 16 controlli verdi in tutte e due le lingue; nessuno sforamento a 390 px su 13 pagine inglesi | Ricontrollo |
