# Marketing Mix

Piattaforma per imparare il marketing facendo: lo studente scopre i ruoli del marketing e li prova dentro un'azienda finta con dati realistici.

Progetto personale di Queen (portfolio, apprendimento e case study).

## Come avviarlo sul tuo computer

Serve Node.js (versione 22 o successiva).

```bash
npm install      # scarica Astro e le altre dipendenze (solo la prima volta)
npm run dev      # avvia il sito su http://localhost:4321 e lo aggiorna mentre modifichi
npm run build    # crea il sito finale nella cartella dist/
```

## Dove sta cosa

| Cartella o file | A cosa serve |
|---|---|
| `src/pages/` | Ogni file è una pagina. `index.astro` è la home, `ruoli.astro` è `/ruoli/`. |
| `src/layouts/Base.astro` | La cornice comune: menu, footer, titolo e descrizione per Google. |
| `src/content/blog/` | Gli articoli. Un file `.md` per articolo, con titolo e descrizione in cima. |
| `src/content.config.ts` | Le regole degli articoli: quali campi servono. Se ne manca uno, la build si ferma. |
| `src/data/impostazioni.json` | Testi generali: nome del sito, titolo della home, menu, footer. |
| `src/data/ruoli.json` | I 12 ruoli del marketing mostrati nella pagina Ruoli. |
| `src/styles/global.css` | Colori, font e spaziature di tutto il sito (i "token"). |
| `public/` | File copiati così come sono (favicon, immagini). |
| `.pages.yml` | Configurazione del pannello Pages CMS. |
| `LICENZE.md` | Registro delle licenze di tutto ciò che usiamo. |

## Come cambiare un testo senza toccare il codice

- **Titolo di un articolo:** apri il file in `src/content/blog/` e cambia la riga `title:`. Oppure usa Pages CMS.
- **Titolo della home, menu, footer:** cambia `src/data/impostazioni.json`. Oppure usa Pages CMS.
- **Pubblicare un articolo:** cambia `bozza: true` in `bozza: false`.

## Pubblicazione

Il sito è pubblicato su Cloudflare Workers (file statici) all'indirizzo https://marketing-mix.queensleyk10.workers.dev/.
Ogni modifica su GitHub (anche da Pages CMS) fa ricostruire il sito in automatico.

Impostazioni del Worker (Impostazioni → Build):
- comando di build: `npm run build`
- comando di deploy: `npx wrangler deploy`
- la configurazione è in `wrangler.jsonc`: dice a Cloudflare di pubblicare la cartella `dist`.

## Regole del progetto

- Codice semplice, commenti in italiano.
- Solo contenuti originali o con licenza libera, annotati in `LICENZE.md`.
- Nessun cookie e nessun font caricato da Google: i font sono ospitati sul sito (GDPR).
- Animazioni che rispettano l'impostazione "riduci movimento".
