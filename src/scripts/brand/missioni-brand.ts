// SIMULAZIONE BRAND: il motore comune (motore.ts) con gli esercizi e lo stato del Brand.
// Gli esercizi sono in src/data/app/brand-sim/esercizi.json (generati da strumenti-dati/crea_esercizi_brand.py).
import dati from "../../data/app/brand-sim/esercizi.json";
import datiEn from "../../data/app/brand-sim/esercizi.en.json";
import { creaMotore } from "../motore";
import { ripristinaParti } from "./stato";

export const CHIAVE_BRAND = "marketing-mix-simulazione-brand";
export const motoreBrand = creaMotore({ dati, datiEn, chiave: CHIAVE_BRAND, ripristina: ripristinaParti, base: "/app/simulazioni/brand", nome: "Simulazione Brand" });
