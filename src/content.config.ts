// Qui diciamo ad Astro quali "raccolte" di contenuti esistono e che forma hanno.
// Lo "schema" è un controllo: se un articolo non ha il titolo, la build si ferma
// e ci dice quale file è sbagliato. Così gli errori si vedono prima di pubblicare.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Tutti i file .md dentro src/content/blog sono articoli
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),                 // titolo dell'articolo (anche nel tag <title>)
    description: z.string().max(160),  // descrizione per Google: massimo 160 caratteri
    date: z.coerce.date(),             // data di pubblicazione
    ruolo: z.string().optional(),      // ruolo collegato, es. "SEO specialist"
    bozza: z.boolean().default(false), // se true, l'articolo non viene pubblicato
  }),
});

export const collections = { blog };
