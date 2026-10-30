// Configurazione di Astro.
// "site" è l'indirizzo finale del sito: serve per la sitemap e i link canonici.
// Indirizzo dato da Cloudflare Workers; va aggiornato quando avremo un dominio vero.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://marketing-mix.queensleyk10.workers.dev",
  // Pagine della vecchia versione del prodotto (scrivania con le richieste, risultati, ricerche), tolte il 30/10/2026:
  // chi aveva salvato questi indirizzi arriva all'ingresso dell'app invece che a una pagina 404.
  redirects: {
    "/app/scrivania": "/app/",
    "/app/riepilogo": "/app/",
    "/app/dati/ricerche": "/app/",
  },
});
