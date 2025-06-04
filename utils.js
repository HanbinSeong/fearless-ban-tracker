export const initialConsonants = [
  "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"
];

export function getInitials(str) {
  return str.split('').map(ch => {
    const code = ch.charCodeAt(0) - 0xAC00;
    return (0 <= code && code <= 11171)
      ? initialConsonants[Math.floor(code / 588)]
      : '?';
  }).join('');
}

export function debounce(fn, ms) {
  return (...args) => {
    clearTimeout(fn._t);
    fn._t = setTimeout(() => fn(...args), ms);
  };
}
