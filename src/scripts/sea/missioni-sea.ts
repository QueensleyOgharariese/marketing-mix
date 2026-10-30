// SIMULAZIONE SEA: il motore comune (motore.ts) con gli esercizi e lo stato della SEA.
// Gli esercizi sono in src/data/app/sea-sim/esercizi.json (generati da strumenti-dati/crea_esercizi_sea.py).
import dati from "../../data/app/sea-sim/esercizi.json";
import datiEn from "../../data/app/sea-sim/esercizi.en.json";
import { creaMotore } from "../motore";
import { ripristinaParti } from "./stato";

export const CHIAVE_SEA = "marketing-mix-simulazione-sea";
export const motoreSea = creaMotore({ dati, datiEn, chiave: CHIAVE_SEA, ripristina: ripristinaParti, base: "/app/simulazioni/sea", nome: "Simulazione SEA" });
