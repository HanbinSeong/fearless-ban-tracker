export const usedSet = new Set(
  JSON.parse(localStorage.getItem('usedChamps') || '[]')
);
export const softOrder = new Map(
  JSON.parse(localStorage.getItem('softOrder') || '[]')
);

export function saveState() {
  localStorage.setItem('usedChamps', JSON.stringify([...usedSet]));
  localStorage.setItem('softOrder', JSON.stringify([...softOrder]));
}