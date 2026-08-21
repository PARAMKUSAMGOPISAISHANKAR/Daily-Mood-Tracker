const MOODS = [
    { id:'happy',   label:'Happy',   emoji:'😊', mc:'var(--happy)',   wash:'var(--happy-wash)' },
    { id:'sad',     label:'Sad',     emoji:'😢', mc:'var(--sad)',     wash:'var(--sad-wash)' },
    { id:'excited', label:'Excited', emoji:'🤩', mc:'var(--excited)', wash:'var(--excited-wash)' },
    { id:'calm',    label:'Calm',    emoji:'😌', mc:'var(--calm)',    wash:'var(--calm-wash)' },
    { id:'angry',   label:'Angry',   emoji:'😠', mc:'var(--angry)',   wash:'var(--angry-wash)' },
    { id:'anxious', label:'Anxious', emoji:'😰', mc:'var(--anxious)', wash:'var(--anxious-wash)' },
    { id:'loved',   label:'Loved',   emoji:'🥰', mc:'var(--loved)',   wash:'var(--loved-wash)' },
    { id:'tired',   label:'Tired',   emoji:'😴', mc:'var(--tired)',   wash:'var(--tired-wash)' },
    { id:'grateful', label:'Grateful', emoji:'🙏', mc:'var(--grateful)', wash:'var(--grateful-wash)' },
    { id:'confused', label:'Confused', emoji:'😕', mc:'var(--confused)', wash:'var(--confused-wash)' },
    { id:'proud',    label:'Proud',    emoji:'😎', mc:'var(--proud)',    wash:'var(--proud-wash)' },
    { id:'bored',    label:'Bored',    emoji:'😑', mc:'var(--bored)',    wash:'var(--bored-wash)' },
    { id:'stressed', label:'Stressed', emoji:'😣', mc:'var(--stressed)', wash:'var(--stressed-wash)' },
    { id:'hopeful',  label:'Hopeful',  emoji:'🤞', mc:'var(--hopeful)',  wash:'var(--hopeful-wash)' },
    { id:'lonely',   label:'Lonely',   emoji:'😔', mc:'var(--lonely)',   wash:'var(--lonely-wash)' },
    { id:'content',  label:'Content',  emoji:'🙂', mc:'var(--content)',  wash:'var(--content-wash)' },
    { id:'motivated',   label:'Motivated',   emoji:'💪', mc:'var(--motivated)',   wash:'var(--motivated-wash)' },
    { id:'overwhelmed', label:'Overwhelmed', emoji:'😵', mc:'var(--overwhelmed)', wash:'var(--overwhelmed-wash)' },
    { id:'peaceful',    label:'Peaceful',    emoji:'🕊️', mc:'var(--peaceful)',    wash:'var(--peaceful-wash)' },
    { id:'nostalgic',   label:'Nostalgic',   emoji:'🥲', mc:'var(--nostalgic)',   wash:'var(--nostalgic-wash)' },
  ];

  const PAGE_SIZE = 6;
  let moodPage = 0;
  let dashPage = 0;
  const totalPages = Math.ceil(MOODS.length / PAGE_SIZE);

  let entries = [];
  const STORAGE_KEY = 'mood-entries';
  const THEME_KEY = 'mood-theme';

  // ---------- card 1: paginated mood grid ----------
  const grid = document.getElementById('mood-grid');
  const moodDots = document.getElementById('mood-dots');
  const moodPrevBtn = document.getElementById('mood-prev');
  const moodNextBtn = document.getElementById('mood-next');

  function renderMoodPage(){
    grid.innerHTML = '';
    const start = moodPage * PAGE_SIZE;
    const pageMoods = MOODS.slice(start, start + PAGE_SIZE);

    pageMoods.forEach(m => {
      const btn = document.createElement('button');
      btn.className = 'mood-btn';
      btn.dataset.mood = m.id;
      btn.style.setProperty('--mc', m.mc);
      btn.style.setProperty('--wash', m.wash);
      btn.innerHTML = `
        <div class="mood-halo">${m.emoji}</div>
        <div class="mood-name">${m.label}</div>
        <div class="mood-pct" data-pct="${m.id}">0%</div>
        <div class="mood-bar-track"><div class="mood-bar-fill" data-bar="${m.id}"></div></div>
      `;
      btn.addEventListener('click', () => logMood(m.id));
      grid.appendChild(btn);
    });

    moodDots.innerHTML = '';
    for (let i = 0; i < totalPages; i++){
      const dot = document.createElement('span');
      dot.className = 'pager-dot' + (i === moodPage ? ' active' : '');
      moodDots.appendChild(dot);
    }
    moodPrevBtn.disabled = moodPage === 0;
    moodNextBtn.disabled = moodPage === totalPages - 1;

    updateMoodPercentages();
  }

  moodPrevBtn.addEventListener('click', () => {
    if (moodPage > 0){ moodPage--; renderMoodPage(); }
  });
  moodNextBtn.addEventListener('click', () => {
    if (moodPage < totalPages - 1){ moodPage++; renderMoodPage(); }
  });

  function moodById(id){ return MOODS.find(m => m.id === id); }

  async function logMood(id){
    const entry = { mood:id, ts: Date.now() };
    entries.push(entry);
    await saveEntries();
    render();
  }

  function updateMoodPercentages(){
    const total = entries.length;
    MOODS.forEach(m => {
      const pctEl = document.querySelector(`[data-pct="${m.id}"]`);
      const barEl = document.querySelector(`[data-bar="${m.id}"]`);
      if (!pctEl || !barEl) return; // not on the current page
      const count = entries.filter(e => e.mood === m.id).length;
      const pct = total ? Math.round((count/total)*100) : 0;
      pctEl.textContent = pct + '%';
      barEl.style.width = pct + '%';
    });
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    if (total){
      const last = entries[entries.length-1];
      const activeBtn = document.querySelector(`.mood-btn[data-mood="${last.mood}"]`);
      if (activeBtn) activeBtn.classList.add('selected');
    }
  }

  function renderNowCard(){
    const total = entries.length;
    const nowCard = document.getElementById('now-card');
    const nowContent = document.getElementById('now-content');
    if (total){
      const last = entries[entries.length-1];
      const m = moodById(last.mood);
      nowCard.style.setProperty('--wash-live', m.wash);
      nowCard.style.setProperty('--mc-live', m.mc);
      nowCard.style.setProperty('--mc-live-text', m.mc);
      nowContent.innerHTML = `
        <div class="now-ring" style="box-shadow:0 0 0 6px ${m.mc}, 0 8px 20px rgba(0,0,0,.08);">${m.emoji}</div>
        <p id="now-label" style="color:${m.mc}">${m.label}</p>
      `;
    } else {
      nowCard.style.removeProperty('--wash-live');
      nowCard.style.removeProperty('--mc-live');
      nowContent.innerHTML = `<p id="now-empty">Nothing logged yet today — tap a mood to get started.</p>`;
    }
  }

  // ---------- card 3: paginated dashboard ----------
  const dashList = document.getElementById('dash-list');
  const dashDots = document.getElementById('dash-dots');
  const dashPrevBtn = document.getElementById('dash-prev');
  const dashNextBtn = document.getElementById('dash-next');

  function renderDashPage(){
    const total = entries.length;

    document.getElementById('stat-total').textContent = total;
    let topLabel = '—';
    if (total){
      const counts = {};
      entries.forEach(e => counts[e.mood] = (counts[e.mood]||0)+1);
      const topId = Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0];
      topLabel = moodById(topId).emoji + ' ' + moodById(topId).label;
    }
    document.getElementById('stat-top').textContent = topLabel;

    dashList.innerHTML = '';
    const start = dashPage * PAGE_SIZE;
    const pageMoods = MOODS.slice(start, start + PAGE_SIZE);
    pageMoods.forEach(m => {
      const count = entries.filter(e => e.mood === m.id).length;
      const pct = total ? Math.round((count/total)*100) : 0;
      const row = document.createElement('div');
      row.className = 'dash-row';
      row.style.setProperty('--mc', m.mc);
      row.style.setProperty('--wash', m.wash);
      row.innerHTML = `
        <span class="dash-emoji">${m.emoji}</span>
        <span class="dash-name">${m.label}</span>
        <div class="dash-track"><div class="dash-fill" style="width:${pct}%;background:${m.mc}"></div></div>
        <span class="dash-count">${count}</span>
      `;
      dashList.appendChild(row);
    });

    dashDots.innerHTML = '';
    for (let i = 0; i < totalPages; i++){
      const dot = document.createElement('span');
      dot.className = 'pager-dot' + (i === dashPage ? ' active' : '');
      dashDots.appendChild(dot);
    }
    dashPrevBtn.disabled = dashPage === 0;
    dashNextBtn.disabled = dashPage === totalPages - 1;
  }

  dashPrevBtn.addEventListener('click', () => {
    if (dashPage > 0){ dashPage--; renderDashPage(); }
  });
  dashNextBtn.addEventListener('click', () => {
    if (dashPage < totalPages - 1){ dashPage++; renderDashPage(); }
  });

  function render(){
    updateMoodPercentages();
    renderNowCard();
    renderDashPage();
  }

  async function saveEntries(){
    try{
      if (window.storage){
        await window.storage.set(STORAGE_KEY, JSON.stringify(entries));
      }
    }catch(err){ console.error('Storage error', err); }
  }

  async function loadEntries(){
    try{
      if (window.storage){
        const res = await window.storage.get(STORAGE_KEY);
        if (res && res.value) entries = JSON.parse(res.value);
      }
    }catch(err){ entries = []; }
  }

  // ---------- reset ----------
  document.getElementById('reset-btn').addEventListener('click', async () => {
    entries = [];
    await saveEntries();
    render();
  });

  // (pagers keep whatever page they were on — only the counts/percentages reset)

  // ---------- theme toggle ----------
  const toggleBtn = document.getElementById('theme-toggle');
  const knob = toggleBtn.querySelector('.knob');

  async function setTheme(mode){
    document.documentElement.setAttribute('data-theme', mode);
    knob.textContent = mode === 'dark' ? '🌙' : '☀️';
    try{ if (window.storage) await window.storage.set(THEME_KEY, mode); }catch(e){}
  }

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  async function init(){
    let theme = 'light';
    try{
      if (window.storage){
        const res = await window.storage.get(THEME_KEY);
        if (res && res.value) theme = res.value;
      }
    }catch(e){}
    setTheme(theme);
    renderMoodPage();
    await loadEntries();
    render();
  }

  init();
