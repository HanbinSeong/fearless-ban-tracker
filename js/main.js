import { fetchVersion, fetchChampionsData } from './dataService.js';
import { getInitials, debounce } from './utils.js';
import { usedSet, softOrder, saveState } from './state.js';
import { renderGrid, renderSidebar } from './ui.js';
import { bindEventListeners } from './events.js';

(async function init() {
  const version = await fetchVersion();
  const rawList = await fetchChampionsData(version);
  const champions = rawList.map(d => ({
    ...d,
    initials: getInitials(d.nameKR)
  })).sort((a, b) => a.nameKR.localeCompare(b.nameKR, 'ko'));

  bindEventListeners();
  window.renderAll = () => {
    renderGrid(champions, {/* 옵션 전달 */});
    renderSidebar({/* 옵션 전달 */});
    saveState();
  };
  renderAll();
})();