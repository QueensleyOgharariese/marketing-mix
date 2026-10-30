// SIMULAZIONE SOCIAL: il motore comune (motore.ts) con gli esercizi e lo stato del Social.
// Gli esercizi sono in src/data/app/social-sim/esercizi.json (generati da strumenti-dati/crea_esercizi_social.py).
import dati from "../../data/app/social-sim/esercizi.json";
import datiEn from "../../data/app/social-sim/esercizi.en.json";
import { creaMotore } from "../motore";
import { ripristinaParti } from "./stato";

export const CHIAVE_SOCIAL = "marketing-mix-simulazione-social";
export const motoreSocial = creaMotore({ dati, datiEn, chiave: CHIAVE_SOCIAL, ripristina: ripristinaParti, base: "/app/simulazioni/social", nome: "Simulazione Social" });
