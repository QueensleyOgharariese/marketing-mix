// TESTI BREVI CON IL GRASSETTO
// Trasforma **parola** in <strong>parola</strong> per i punti "In 30 secondi" degli articoli.
// Prima toglie ogni carattere HTML (< > & "), così non può entrare codice nella pagina.
export function marked(testo: string) {
  const sicuro = testo.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return sicuro.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
