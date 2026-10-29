// PICCOLI AIUTI PER IL NEGOZIO FINTO (prezzi, voti, prezzo al kg, preparazione)
// Tutto calcolato a partire da catalogo.json: niente numeri scritti a mano nelle pagine.

export const prezzo = (x: number) => x.toLocaleString("it-IT", { style: "currency", currency: "EUR" });

// Voto medio "di esempio" tra 4,2 e 4,9: sempre lo stesso per lo stesso prodotto (dipende dalle lettere dell'id)
export function voto(id: string) {
  const somma = [...id].reduce((s, c) => s + c.charCodeAt(0), 0);
  return (4.2 + (somma % 8) / 10).toFixed(1).replace(".", ",");
}

// Prezzo al kg: obbligatorio in Italia per i prodotti venduti a peso (qui solo per i formati in grammi)
export function alKg(prezzoEuro: number, formato: string) {
  const g = formato.match(/^(\d+)\s*g$/);
  return g ? prezzo((prezzoEuro / Number(g[1])) * 1000) : "";
}

// Etichetta sulla foto: solo per i prodotti più recensiti o esauriti
export function etichettaProdotto(p: { recensioni: number; disponibile: boolean }) {
  if (!p.disponibile) return "Esaurito";
  if (p.recensioni >= 20) return "Più amato";
  return "";
}

// Come si prepara, per categoria: tre coppie [valore, cosa] (acqua, tempo, dose)
export const PREPARAZIONE: Record<string, [string, string][]> = {
  "te-verdi": [["75 °C", "acqua"], ["2 min", "infusione"], ["3 g", "per tazza"]],
  "te-neri": [["95 °C", "acqua"], ["4 min", "infusione"], ["3 g", "per tazza"]],
  tisane: [["100 °C", "acqua"], ["6 min", "infusione"], ["1", "bustina o 2 g"]],
  matcha: [["80 °C", "acqua"], ["20 s", "con la frusta"], ["2 g", "per tazza"]],
  "te-freddi": [["Fredda", "acqua"], ["8 ore", "in frigo"], ["6 g", "per litro"]],
};
