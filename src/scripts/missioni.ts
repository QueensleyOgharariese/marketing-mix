// SIMULAZIONE SEO: il motore comune (motore.ts) con i dati e lo stato della SEO.
// Restano esportati gli stessi nomi di prima, così le pagine della SEO non cambiano.
// Forma dello stato: { attiva: "base1" | null, missioni: { base1: { stato, passo, errori, aiuti, primoColpo } } }
import dati from "../data/app/seo-pro/missioni.json";
import { ripristinaParti } from "./cms";
import { creaMotore } from "./motore";
export type { Opzione, Passo, Missione, StatoMissione, Stato } from "./motore";

export const CHIAVE = "marketing-mix-percorso-seo-v2"; // v2: struttura a livelli (la v1 aveva 5 missioni lunghe)
export const motoreSeo = creaMotore({ dati, chiave: CHIAVE, ripristina: ripristinaParti, base: "/app/percorsi/seo", nome: "Simulazione SEO" });
export const { TUTTE, TUTORIAL, MISSIONI, LIVELLI, STRUMENTI, etichetta, leggiStato, salvaStato, fatta, tutorialFatto, livelloAperto, sbloccata, consigliata, saltaTutorial, linkPasso, avvia, ricomincia, controlla, punti } = motoreSeo;
