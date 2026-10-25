// Configurazione di Astro.
// "site" è l'indirizzo finale del sito: serve per la sitemap e i link canonici.
// Indirizzo dato da Cloudflare Workers; va aggiornato quando avremo un dominio vero.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://marketing-mix.queensleyk10.workers.dev",
});
