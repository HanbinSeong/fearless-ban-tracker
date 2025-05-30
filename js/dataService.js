export async function fetchVersion() {
  try {
    const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(res => res.json());
    return versions[0];
  } catch {
    return '';
  }
}

export async function fetchChampionsData(version) {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
  );
  const json = await res.json();
  return Object.entries(json.data).map(([id, d]) => ({ id, nameKR: d.name }));
}