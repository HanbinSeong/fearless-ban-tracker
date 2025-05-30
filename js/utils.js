export const initialConsonants = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
export function getInitials(str) {
  return [...str].map(ch => {
    const code = ch.charCodeAt(0) - 0xAC00;
    return (0 <= code && code <= 11171) ? initialConsonants[Math.floor(code / 588)] : '?';
  }).join('');
}
export const debounce = (fn, ms = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};