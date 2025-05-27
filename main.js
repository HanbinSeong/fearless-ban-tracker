(async function(){
  const initialConsonants=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const getInitials=str=>str.split('').map(ch=>{const code=ch.charCodeAt(0)-0xAC00;return(0<=code&&code<=11171)?initialConsonants[Math.floor(code/588)]:'?';}).join('');
  const debounce=(fn,ms)=>(...args)=>{clearTimeout(fn._t);fn._t=setTimeout(()=>fn(...args),ms);};

  let version=''; try{version=(await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r=>r.json()))[0];}catch{}
  const data=(await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`).then(r=>r.json())).data;
  const iconBase=`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;
  const champions=Object.entries(data).map(([id,d])=>({id,nameKR:d.name,initials:getInitials(d.name)})).sort((a,b)=>a.nameKR.localeCompare(b.nameKR,'ko'));

  const viewToggle = document.querySelector('#viewToggle');
  let showAll = !viewToggle.checked;  // checked => show only available (hide used); unchecked => show all
  const modeToggle=document.querySelector('#modeToggle');
  let softMode=!modeToggle.checked;
  const usedSet=new Set(JSON.parse(localStorage.getItem('usedChamps')||'[]'));
  const softOrder=new Map(JSON.parse(localStorage.getItem('softOrder')||'[]'));

  const els={grid:document.querySelector('#championGrid'),team1:document.querySelector('#team1List'),team2:document.querySelector('#team2List'),hard:document.querySelector('#hardList'),input:document.querySelector('#searchInput')};

  function resetAll(){ usedSet.clear(); softOrder.clear(); localStorage.removeItem('softOrder'); }
  function toggleMode(){ softMode=!modeToggle.checked; resetAll(); renderAll(); }

  modeToggle.addEventListener('change',toggleMode);
  document.querySelector('#resetBtn').addEventListener('click',()=>{ resetAll(); renderAll(); });
  els.input.addEventListener('input',debounce(renderAll,300));
  // Clear button functionality
  const clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', () => {
    els.input.value = '';
    renderAll();
  });
  viewToggle.addEventListener('change', ()=>{ showAll = !viewToggle.checked; renderAll(); });
  document.querySelector('#toggleBtn').addEventListener('click',()=>document.querySelector('#sidebar').classList.toggle('collapsed'));
  document.querySelector('#copyBtn').addEventListener('click', () => {
    let text = '';
    if (softMode) {
      const team1 = [...softOrder.entries()]
        .filter(([, v]) => v === 1)
        .map(([id]) => champions.find(c => c.id === id).nameKR);
      const team2 = [...softOrder.entries()]
        .filter(([, v]) => v === 2)
        .map(([id]) => champions.find(c => c.id === id).nameKR);
      if (team1.length) text += `1팀: ${team1.join(', ')}`;
      if (team2.length) {
        if (text) text += '\n';
        text += `2팀: ${team2.join(', ')}`;
      }
    } else {
      const names = [...usedSet].map(id => champions.find(c => c.id === id).nameKR);
      text = names.join(', ');
    }
    navigator.clipboard.writeText(text);
  });

  function renderGrid(){
    const q=els.input.value.trim(); const isChosung=q&&[...q].every(c=>initialConsonants.includes(c));
    const frag=document.createDocumentFragment();
    champions.forEach(c=>{
      if(q&&!((isChosung?c.initials.startsWith(q):c.nameKR.includes(q))))return;
      const hiddenByView=!showAll&&(softMode?softOrder.has(c.id):usedSet.has(c.id));
      if(hiddenByView)return;
      const fig=document.createElement('figure');let cls='card';if(!softMode&&usedSet.has(c.id))cls+=' disabled';if(softMode&&softOrder.has(c.id))cls+=' soft'+softOrder.get(c.id);fig.className=cls;
      const img=document.createElement('img');img.src=iconBase+c.id+'.png';img.alt=c.nameKR;
      const cap=document.createElement('figcaption');cap.textContent=c.nameKR;
      fig.append(img,cap);
      if(softMode&&softOrder.has(c.id)){const b=document.createElement('span');b.className='badge';b.textContent=softOrder.get(c.id);fig.append(b);}      
      fig.addEventListener('click',()=>onCardClick(c.id));frag.append(fig);
    });
    els.grid.innerHTML='';els.grid.append(frag);
  }

  function renderSidebar(){
    if(softMode){
      document.querySelector('#softLists').classList.remove('hidden'); els.hard.classList.add('hidden'); els.team1.innerHTML=''; els.team2.innerHTML=''; softOrder.forEach((v,id)=>{const card=document.createElement('div');card.className='used-card';card.innerHTML=`<img src="${iconBase}${id}.png"><button class="remove-btn">×</button>`;card.querySelector('.remove-btn').addEventListener('click',()=>{softOrder.delete(id);renderAll();});(v===1?els.team1:els.team2).append(card);});
    } else {
      document.querySelector('#softLists').classList.add('hidden'); els.hard.classList.remove('hidden'); els.hard.innerHTML=''; usedSet.forEach(id=>{const card=document.createElement('div');card.className='used-card';card.innerHTML=`<img src="${iconBase}${id}.png"><button class="remove-btn">×</button>`;card.querySelector('.remove-btn').addEventListener('click',()=>{usedSet.delete(id);renderAll();});els.hard.append(card);});
    }
  }

  function renderAll(){renderGrid();renderSidebar();localStorage.setItem('usedChamps',JSON.stringify([...usedSet]));localStorage.setItem('softOrder',JSON.stringify([...softOrder]));}
  function onCardClick(id) {
    if (softMode) {
      const state = softOrder.get(id) || 0;
      if (state === 0) {
        softOrder.set(id, 1);
        usedSet.add(id);
      } else if (state === 1) {
        softOrder.set(id, 2);
      } else {
        softOrder.delete(id);
        usedSet.delete(id);
      }
    } else {
      if (usedSet.has(id)) usedSet.delete(id);
      else usedSet.add(id);
    }
    renderAll();
  }

  renderAll();
})();