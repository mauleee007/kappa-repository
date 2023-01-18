export function formatNumber(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return rounded.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
