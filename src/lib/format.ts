import { ORDER_NUMBER_OFFSET } from './constants';

export function formatPriceEUR(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  if (Number.isInteger(rounded)) {
    return `€${rounded}`;
  }
  return `€${rounded.toFixed(2)}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateOrderNumber(timestamp: number = Date.now()): string {
  const seed = (timestamp % 100000) + ORDER_NUMBER_OFFSET;
  return String(seed).padStart(4, '0').slice(-4);
}
