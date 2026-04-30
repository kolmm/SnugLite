import { describe, it, expect } from 'vitest';
import { formatPriceEUR, slugify, generateOrderNumber } from '../lib/format';

describe('formatPriceEUR', () => {
  it('formats integer price with euro symbol', () => {
    expect(formatPriceEUR(389)).toBe('€389');
  });

  it('formats decimals with two places', () => {
    expect(formatPriceEUR(89.5)).toBe('€89.50');
  });

  it('handles zero', () => {
    expect(formatPriceEUR(0)).toBe('€0');
  });

  it('rounds to two decimals', () => {
    expect(formatPriceEUR(99.999)).toBe('€100');
  });
});

describe('slugify', () => {
  it('lowercases and replaces spaces with dashes', () => {
    expect(slugify('Office Furniture')).toBe('office-furniture');
  });

  it('strips special characters', () => {
    expect(slugify('Nº 001 — Premium!')).toBe('no-001-premium');
  });

  it('collapses multiple separators', () => {
    expect(slugify('a   b---c')).toBe('a-b-c');
  });
});

describe('generateOrderNumber', () => {
  it('returns 4-digit zero-padded number', () => {
    const result = generateOrderNumber(1700000000000);
    expect(result).toMatch(/^\d{4}$/);
  });

  it('different timestamps produce different numbers', () => {
    const a = generateOrderNumber(1700000000000);
    const b = generateOrderNumber(1700000000001);
    expect(a).not.toBe(b);
  });
});
