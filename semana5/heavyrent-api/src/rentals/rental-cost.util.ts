/** Días inclusivos entre startDate y endDate (YYYY-MM-DD). */
export function calculateRentalDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

export function calculateRentalCosts(
  dailyRate: number,
  startDate: string,
  endDate: string,
): { totalCost: number; depositAmount: number } {
  const days = calculateRentalDays(startDate, endDate);
  const rate = Number(dailyRate);
  const totalCost = Math.round(days * rate * 100) / 100;
  const depositAmount = Math.round(totalCost * 0.1 * 100) / 100;
  return { totalCost, depositAmount };
}
