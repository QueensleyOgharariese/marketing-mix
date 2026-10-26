// Qui diciamo ad Astro quali "raccolte" di contenuti esistono e che forma hanno.
// Lo "schema" è un controllo: se un articolo non ha il titolo, la build si ferma
// e ci dice quale file è sbagliato. Così gli errori si vedono prima di pubblicare.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Forma di un articolo: è la stessa per le due lingue
const schema = z.object({
    title: z.string(),                 // titolo dell'articolo (anche nel tag <title>)
    description: z.string().max(160),  // descrizione per Google: massimo 160 caratteri
    date: z.coerce.date(),             // data di pubblicazione
    bozza: z.boolean().default(false), // se true, l'articolo non viene pubblicato

    // Come appare nel blog
    categoria: z.enum(["ruoli", "basi", "carriera", "regole"]), // per i filtri della pagina Blog
    etichetta: z.string(),             // es. "Guida al ruolo · SEO"
    formato: z.enum(["guida", "pillola"]).default("guida"), // pillola = articolo breve ("Hai 5 minuti?")
    tema: z.string().default("basi"),  // copertina (vedi src/components/Copertina.astro)
    minuti: z.number(),                // tempo di lettura
    inEvidenza: z.boolean().default(false), // articolo "Inizia da qui"

    // Collegamenti con il resto del sito
    ruoloId: z.string().optional(),    // es. "seo": porta a /ruoli/seo/ e all'esercizio
    strumentoId: z.string().optional(), // es. "anteprima-google": porta allo strumento

    // Parti fisse dell'articolo (disegno "Articolo")
    inBreve: z.array(z.string()).default([]),   // "In 30 secondi"
    consiglio: z.string().optional(),           // "Consiglio di Pesca"
    domanda: z.object({                          // "Mettiti alla prova"
      testo: z.string(),
      opzioni: z.array(z.object({ testo: z.string(), giusta: z.boolean().default(false) })),
      spiegaSi: z.string(),
      spiegaNo: z.string(),
    }).optional(),
    faq: z.array(z.object({ d: z.string(), r: z.string() })).default([]), // domande frequenti
    argomenti: z.array(z.string()).default([]),
    // Solo negli articoli inglesi: il nome del file dell'articolo italiano corrispondente
    // (serve ai tag hreflang e al selettore di lingua)
    traduzione: z.string().optional(),
});

// Articoli in italiano: src/content/blog → /blog/<nome-file>/
const blog = defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }), schema });
// Articoli in inglese: src/content/blog-en → /en/blog/<nome-file>/
const blogEn = defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/blog-en" }), schema });

export const collections = { blog, blogEn };
