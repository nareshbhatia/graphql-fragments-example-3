import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import numeral from 'numeral';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAsMoney(value: number) {
  return numeral(value).format('0,0.00');
}
