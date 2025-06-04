import { getInitials } from '../utils.js';

describe('getInitials', () => {
  test('extracts consonants from basic Hangul', () => {
    expect(getInitials('가나')).toBe('ㄱㄴ');
  });

  test('returns question mark for non-Hangul', () => {
    expect(getInitials('abc')).toBe('???');
  });
});
