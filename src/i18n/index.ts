// LINGUE DEL SITO (italiano e inglese)
// L'italiano resta agli indirizzi di sempre (/ruoli/), l'inglese sta sotto /en/ (/en/roles/).
// Qui ci sono: la mappa degli indirizzi tra le due lingue, i testi comuni (menu, footer)
// e le funzioni per avere ruoli e strumenti nella lingua giusta.
// Anche l'app (l'azienda finta) è bilingue: italiano in /app/, inglese in /en/app/ (stesse pagine, cartella src/pages/[...lang]/app).
import ruoliIt from "../data/ruoli.json";
import ruoliEn from "../data/en/ruoli.json";
import strumentiIt from "../data/strumenti.json";
import strumentiEn from "../data/en/strumenti.json";

export type Lingua = "it" | "en";

// Capisce la lingua dall'indirizzo: tutto quello che inizia con /en è inglese
export const linguaDa = (url: URL): Lingua => (url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "it");

// Pagine principali nelle due lingue (in inglese anche gli indirizzi sono tradotti: aiuta la SEO)
export const PAGINE = {
  home: { it: "/", en: "/en/" },
  ruoli: { it: "/ruoli/", en: "/en/roles/" },
  strumenti: { it: "/strumenti/", en: "/en/tools/" },
  blog: { it: "/blog/", en: "/en/blog/" },
  progetto: { it: "/progetto/", en: "/en/about/" },
  privacy: { it: "/privacy/", en: "/en/privacy/" },
  licenze: { it: "/licenze/", en: "/en/licences/" },
  app: { it: "/app/", en: "/en/app/" },
} as const;
export type Pagina = keyof typeof PAGINE;
export const link = (lang: Lingua, pagina: Pagina) => PAGINE[pagina][lang];

// Indirizzi di ruoli e strumenti
// In inglese due ruoli hanno un indirizzo tradotto; gli altri nomi (seo, crm, brand...) valgono in entrambe le lingue
export const SLUG_RUOLI_EN: Record<string, string> = { ricerca: "market-research", partner: "partnerships" };
export const slugRuoloEn = (id: string) => SLUG_RUOLI_EN[id] ?? id;
export const linkRuolo = (lang: Lingua, id: string) => (lang === "it" ? `/ruoli/${id}/` : `/en/roles/${slugRuoloEn(id)}/`);
export const SLUG_STRUMENTI_EN: Record<string, string> = {
  "link-utm": "utm-link-builder",
  "anteprima-google": "google-snippet-preview",
  "engagement-rate": "engagement-rate-calculator",
};
export const linkStrumento = (lang: Lingua, id: string) => (lang === "it" ? `/strumenti/${id}/` : `/en/tools/${SLUG_STRUMENTI_EN[id] ?? id}/`);
export const linkEsercizio = (id: string, lang: Lingua = "it") => `${lang === "en" ? "/en" : ""}/app/${id}/esercizio/`;

// Ruoli e strumenti nella lingua scelta: i testi inglesi stanno in src/data/en/ e
// sostituiscono quelli italiani; numeri, icone e collegamenti restano quelli dei file italiani.
export function ruoliDi(lang: Lingua) {
  if (lang === "it") return ruoliIt;
  return ruoliIt.map((r) => ({ ...r, ...(ruoliEn.find((e) => e.id === r.id) ?? {}) }));
}
export function strumentiDi(lang: Lingua) {
  if (lang === "it") return strumentiIt;
  return strumentiIt.map((s) => ({ ...s, ...(strumentiEn.find((e) => e.id === s.id) ?? {}) }));
}

// Testi comuni a tutte le pagine
export const COMUNI = {
  it: {
    descrizioneSito: "Impara il marketing facendo: prova i ruoli veri dentro un'azienda finta, con dati realistici.",
    vaiAlContenuto: "Vai al contenuto",
    menuPrincipale: "Menu principale",
    menu: [["Home", "home"], ["Ruoli", "ruoli"], ["Strumenti", "strumenti"], ["Blog", "blog"], ["Il progetto", "progetto"]] as [string, Pagina][],
    lingua: "Lingua",
    bottoneMenu: "Prova un ruolo",
    footer: {
      invito: "Pronta o pronto per il primo giorno?",
      sottoInvito: "Ogni ruolo si prova in circa 20 minuti.",
      bottone: "Entra in azienda",
      tornaSu: "Torna su",
      colonne: [
        { titolo: "Impara", voci: [["Ruoli", "ruoli"], ["Blog", "blog"], ["Strumenti gratuiti", "strumenti"]] },
        { titolo: "Il progetto", voci: [["Chi c'è dietro", "progetto"], ["Codice su GitHub", "github"]] },
        { titolo: "Trasparenza", voci: [["Privacy", "privacy"], ["Licenze e crediti", "licenze"]], nota: "Statistiche solo con il tuo consenso" },
      ],
      etichette: ["Fatto con Astro", "Font ospitati sul sito", "Contenuti originali", "Progetto personale di Queen"],
    },
    appSoloItaliano: "",
  },
  en: {
    descrizioneSito: "Learn marketing by doing: try real marketing roles inside a practice company, with realistic data.",
    vaiAlContenuto: "Skip to content",
    menuPrincipale: "Main menu",
    menu: [["Home", "home"], ["Roles", "ruoli"], ["Tools", "strumenti"], ["Blog", "blog"], ["About", "progetto"]] as [string, Pagina][],
    lingua: "Language",
    bottoneMenu: "Try a role",
    footer: {
      invito: "Ready for your first day?",
      sottoInvito: "Each role takes about 20 minutes. The practice company is in Italian for now.",
      bottone: "Enter the company",
      tornaSu: "Back to top",
      colonne: [
        { titolo: "Learn", voci: [["Roles", "ruoli"], ["Blog", "blog"], ["Free tools", "strumenti"]] },
        { titolo: "The project", voci: [["Who's behind it", "progetto"], ["Code on GitHub", "github"]] },
        { titolo: "Transparency", voci: [["Privacy", "privacy"], ["Licences and credits", "licenze"]], nota: "Analytics only with your consent" },
      ],
      etichette: ["Built with Astro", "Self-hosted fonts", "Original content", "A personal project by Queen"],
    },
    appSoloItaliano: "in Italian",
  },
} as const;

export const GITHUB = "https://github.com/QueensleyOgharariese/marketing-mix";

// APP BILINGUE: ogni pagina dell'app esiste due volte, /app/... e /en/app/...
// getStaticPaths delle pagine dell'app: LINGUE_APP per le pagine semplici, conLingue() per quelle che hanno già parametri.
export const LINGUE_APP = () => [{ params: { lang: undefined } }, { params: { lang: "en" } }]; // sempre oggetti nuovi: Astro li modifica
export function conLingue<T extends { params: Record<string, any>; props?: any }>(percorsi: T[]) {
  return percorsi.flatMap((p) => [{ ...p, params: { ...p.params, lang: undefined } }, { ...p, params: { ...p.params, lang: "en" } }]);
}
// Aggiunge /en davanti agli indirizzi dell'app quando la pagina è in inglese
export const appLink = (lang: Lingua, percorso: string) => (lang === "en" && percorso.startsWith("/app") ? `/en${percorso}` : percorso);
// Lo stesso indirizzo nell'altra lingua (per il selettore IT / EN dell'app)
export const altraLinguaApp = (url: URL) => (linguaDa(url) === "en" ? url.pathname.replace(/^\/en/, "") : `/en${url.pathname}`);
