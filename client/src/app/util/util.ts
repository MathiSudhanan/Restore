export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function formatCurrency(amount: number, isPrice: boolean) {
  return "S" + (isPrice ? convertPrice(amount) : amount.toFixed(2));
}

export function convertPrice(amount: number): number {
  return amount / 100;
}
