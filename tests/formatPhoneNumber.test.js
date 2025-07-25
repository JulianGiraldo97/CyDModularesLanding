const { formatPhoneNumber } = require('../script.js');

describe('formatPhoneNumber', () => {
  test('formats 10-digit Colombian numbers', () => {
    expect(formatPhoneNumber('3001234567')).toBe('+57 300 123 4567');
    expect(formatPhoneNumber('(301) 234-5678')).toBe('+57 301 234 5678');
  });

  test('formats numbers with country code 57', () => {
    expect(formatPhoneNumber('573001234567')).toBe('+57 300 123 4567');
    expect(formatPhoneNumber('+57 3021234567')).toBe('+57 302 123 4567');
  });

  test('returns input unchanged for invalid lengths', () => {
    expect(formatPhoneNumber('12345')).toBe('12345');
    expect(formatPhoneNumber('57300123456')).toBe('57300123456');
  });
});
