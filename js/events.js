import { renderAll } from './main.js';
export function bindEventListeners() {
  document.querySelector('#modeToggle')
    .addEventListener('change', renderAll);
  // 나머지 이벤트 등록...
}