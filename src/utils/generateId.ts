export function generateQuoteId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `QUOTE-KOTA-${num}`;
}

export function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `ORDER-KOTA-${num}`;
}
