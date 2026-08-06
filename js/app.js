// ====== Synapse 主应用 ======

// ====== 安全的本地存储（兼容 Safari 无痕模式 / webview） ======
var _memStore = {};
var safeStorage = {
  getItem: function(k) {
    try { return localStorage.getItem(k); } catch(e) { return _memStore[k] || null; }
  },
  setItem: function(k, v) {
    try { localStorage.setItem(k, v); } catch(e) { _memStore[k] = v; }
  },
  removeItem: function(k) {
    try { localStorage.removeItem(k); } catch(e) { delete _memStore[k]; }
  }
};
function safeParse(k, def) {
  try { return JSON.parse(safeStorage.getItem(k) || JSON.stringify(def)); } catch(e) { return def; }
}

// ====== 状态管理 ======
const STATE = {
  currentPage: 'home',
  todos: safeParse('synapse_todos', []),
  bodyStatus: safeParse('synapse_body', DEFAULT_BODY_STATUS),
  wordCount: parseInt(safeStorage.getItem('synapse_wordCount') || '20'),
  learnedWords: safeParse('synapse_learnedWords', []),
  todayMood: safeStorage.getItem('synapse_todayMood') || null,
  moodHistory: safeParse('synapse_moodHistory', []),
  waterCups: parseInt(safeStorage.getItem('synapse_waterCups') || '0'),
  waterGoal: 8,
  dietRecords: safeParse('synapse_dietRecords', []),
  trainingDone: safeParse('synapse_trainingDone', []),
  bodyRecords: safeParse('synapse_bodyRecords', []),
  moviesWatched: safeParse('synapse_moviesWatched', MOVIES_WATCHED),
  moviesWatchlist: safeParse('synapse_moviesWatchlist', MOVIES_WATCHLIST),
  movieRecommends: safeParse('synapse_movieRecommends', MOVIE_RECOMMEND),
  recommendPool: safeParse('synapse_recommendPool', MOVIE_RECOMMEND_POOL),
  paperNotes: safeParse('synapse_paperNotes', []),
  readingList: safeParse('synapse_readingList', READING_LIST),
  whiteboardIdeas: safeParse('synapse_whiteboardIdeas', []),
  memos: safeParse('synapse_memos', [])
};

function saveState(key) {
  safeStorage.setItem('synapse_' + key, JSON.stringify(STATE[key]));
}
function savePrimitive(key) {
  safeStorage.setItem('synapse_' + key, STATE[key]);
}

// ====== 初始化 ======
document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  updateDate();
  loadPage('home');
});

// ====== 开屏 ======
function initSplash() {
  const starsContainer = document.getElementById('splashStars');
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'splash-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.width = (Math.random() * 3 + 2) + 'px';
    star.style.height = star.style.width;
    star.style.opacity = Math.random() * 0.5 + 0.3;
    starsContainer.appendChild(star);
  }
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  document.getElementById('quoteText').textContent = quote;
}

function enterMain() {
  const splash = document.getElementById('splashScreen');
  const main = document.getElementById('mainApp');
  splash.classList.add('exit');
  setTimeout(() => {
    splash.classList.add('hidden');
    main.classList.remove('hidden');
  }, 500);
}

// ====== 导航 ======
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

function navigateTo(page) {
  STATE.currentPage = page;
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  closeSidebar();
  loadPage(page);
}

const PAGE_TITLES = {
  home: '首页', words: '英语单词', mood: '每日心情', diet: '健康饮食',
  sport: '运动健康', movies: '影视收藏', notes: '纸条收纳',
  reading: '阅读档案', whiteboard: '灵感白板', memo: '生活备忘'
};

function loadPage(page) {
  document.getElementById('topbarTitle').textContent = PAGE_TITLES[page] || page;
  const container = document.getElementById('pageContainer');
  switch(page) {
    case 'home': renderHome(container); break;
    case 'words': renderWords(container); break;
    case 'mood': renderMood(container); break;
    case 'diet': renderDiet(container); break;
    case 'sport': renderSport(container); break;
    case 'movies': renderMovies(container); break;
    case 'notes': renderNotes(container); break;
    case 'reading': renderReading(container); break;
    case 'whiteboard': renderWhiteboard(container); break;
    case 'memo': renderMemo(container); break;
  }
}

function updateDate() {
  const now = new Date();
  const days = ['日','一','二','三','四','五','六'];
  document.getElementById('topbarDate').textContent = 
    `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')} 周${days[now.getDay()]}`;
}

// ====== 首页 ======
function renderHome(container) {
  const pending = STATE.todos.filter(t => !t.done);
  const done = STATE.todos.filter(t => t.done);
  const bodyStatus = STATE.bodyStatus;
  const keys = Object.keys(bodyStatus);
  
  container.innerHTML = `
    <div class="home-grid fade-in">
      <div class="todo-section">
        <div class="todo-header">
          <div class="todo-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            待办事项
          </div>
          <span class="todo-count">${pending.length} 待完成</span>
        </div>
        <div class="todo-list" id="todoPendingList">
          ${pending.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">✨</div><div class="empty-state-text">暂无待办，享受轻松时刻~</div></div>' : 
            pending.map(t => {
              const idx = STATE.todos.indexOf(t);
              return `<div class="todo-item"><div class="todo-check" onclick="toggleTodo(${idx})"></div><span class="todo-text">${escapeHtml(t.text)}</span><button class="todo-delete" onclick="deleteTodo(${idx})">×</button></div>`;
            }).join('')
          }
        </div>
        ${done.length > 0 ? `
          <div class="todo-section-divider">已完成 · ${done.length}</div>
          <div class="todo-list" id="todoDoneList">
            ${done.map(t => {
              const idx = STATE.todos.indexOf(t);
              return `<div class="todo-item"><div class="todo-check done" onclick="toggleTodo(${idx})"></div><span class="todo-text done">${escapeHtml(t.text)}</span><button class="todo-delete" onclick="deleteTodo(${idx})">×</button></div>`;
            }).join('')}
          </div>
        ` : ''}
        <div class="todo-input-row">
          <input class="input" id="todoInput" placeholder="添加新待办..." onkeydown="if(event.key==='Enter')addTodo()">
          <button class="btn btn-primary btn-sm" onclick="addTodo()">添加</button>
        </div>
      </div>

      <!-- 身体状态 - 可点击编辑 -->
      <div class="body-status">
        <div class="body-status-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          身体状态概览
          <span style="font-size:11px;color:var(--text-muted);font-weight:400;margin-left:8px">（点击编辑）</span>
        </div>
        <div class="body-status-grid">
          ${keys.map(k => {
            const s = bodyStatus[k];
            return `<div class="body-stat-item body-stat-editable" onclick="editBodyStatus('${k}')" id="bodyStat_${k}">
              <div class="body-stat-icon">${s.icon}</div>
              <div class="body-stat-label">${s.label}</div>
              <div class="body-stat-value" id="bodyStatVal_${k}">${s.value}</div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="quick-entry-grid">
        <button class="quick-entry" onclick="navigateTo('words')"><span class="quick-entry-icon">📝</span>英语单词</button>
        <button class="quick-entry" onclick="navigateTo('mood')"><span class="quick-entry-icon">💖</span>每日心情</button>
        <button class="quick-entry" onclick="navigateTo('diet')"><span class="quick-entry-icon">🥗</span>健康饮食</button>
        <button class="quick-entry" onclick="navigateTo('sport')"><span class="quick-entry-icon">🏃</span>运动健康</button>
        <button class="quick-entry" onclick="navigateTo('movies')"><span class="quick-entry-icon">🎬</span>影视收藏</button>
        <button class="quick-entry" onclick="navigateTo('notes')"><span class="quick-entry-icon">📋</span>纸条收纳</button>
        <button class="quick-entry" onclick="navigateTo('reading')"><span class="quick-entry-icon">📚</span>阅读档案</button>
        <button class="quick-entry" onclick="navigateTo('whiteboard')"><span class="quick-entry-icon">💡</span>灵感白板</button>
      </div>
    </div>
  `;
}

function addTodo() {
  const input = document.getElementById('todoInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  STATE.todos.unshift({ text, done: false, date: new Date().toISOString() });
  saveState('todos');
  input.value = '';
  loadPage('home');
}

function toggleTodo(idx) {
  STATE.todos[idx].done = !STATE.todos[idx].done;
  saveState('todos');
  loadPage('home');
}

function deleteTodo(idx) {
  STATE.todos.splice(idx, 1);
  saveState('todos');
  loadPage('home');
}

// 首页身体状态点击编辑
function editBodyStatus(key) {
  const s = STATE.bodyStatus[key];
  const newVal = prompt('修改「' + s.label + '」：', s.value);
  if (newVal !== null && newVal.trim() !== '') {
    STATE.bodyStatus[key].value = newVal.trim();
    saveState('body');
    loadPage('home');
  }
}

// ====== 英语单词 ======
function renderWords(container) {
  const todayWords = getTodayWords();
  const learnedToday = todayWords.filter(w => STATE.learnedWords.includes(w.en));
  const progress = todayWords.length > 0 ? Math.round((learnedToday.length / todayWords.length) * 100) : 0;
  const reviewWords = STATE.learnedWords.slice(-10).reverse();

  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="words-config">
        <div class="words-config-title">📝 今日单词规划</div>
        <div class="words-count-control">
          <span class="words-count-label">每日背诵数量：</span>
          <button class="words-count-btn" onclick="changeWordCount(-5)">−</button>
          <span class="words-count-num">${STATE.wordCount}</span>
          <button class="words-count-btn" onclick="changeWordCount(5)">+</button>
        </div>
        <div class="words-actions">
          <button class="btn btn-primary btn-sm" onclick="refreshWords()">🔄 随机刷新单词</button>
          <a class="btn btn-secondary btn-sm word-video-btn" href="https://www.bilibili.com/v/education/" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            学习视频
          </a>
        </div>
      </div>

      <div class="words-progress">
        <span style="font-size:13px;color:var(--text-secondary)">今日进度</span>
        <div class="words-progress-bar">
          <div class="words-progress-fill" style="width:${progress}%"></div>
        </div>
        <span class="words-progress-text">${learnedToday.length}/${todayWords.length}</span>
      </div>

      <div class="words-list">
        ${todayWords.map(w => {
          const isLearned = STATE.learnedWords.includes(w.en);
          return `
            <div class="word-card ${isLearned ? 'learned' : ''}">
              <div class="word-main">
                <span class="word-en">${w.en}</span>
                <span class="word-phonetic">${w.phonetic}</span>
              </div>
              <div class="word-zh">${w.zh}</div>
              <div class="word-example">"${w.example}"</div>
              <div class="word-actions-row">
                <button class="word-learned-btn ${isLearned ? 'done' : ''}" onclick="toggleWordLearned('${w.en}')">${isLearned ? '✓ 已掌握' : '标记已学'}</button>
                <a class="word-video-btn" href="https://www.bilibili.com/search?keyword=${encodeURIComponent(w.en + ' 英语单词')}" target="_blank" rel="noopener">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>视频
                </a>
              </div>
            </div>`;
        }).join('')}
      </div>

      ${reviewWords.length > 0 ? `
        <div class="review-section">
          <div class="review-title">🔄 复习巩固</div>
          ${reviewWords.map(w => {
            const wordData = WORD_BANK.find(wb => wb.en === w);
            if (!wordData) return '';
            return `<div class="word-card learned" style="margin-bottom:8px"><div class="word-main"><span class="word-en" style="font-size:18px">${wordData.en}</span><span class="word-phonetic">${wordData.phonetic}</span></div><div class="word-zh">${wordData.zh}</div></div>`;
          }).join('')}
        </div>` : ''}
    </div>`;
}

function getTodayWords() {
  const today = new Date().toDateString();
  const storedDate = safeStorage.getItem('synapse_wordDate');
  const storedWords = JSON.parse(safeStorage.getItem('synapse_todayWords') || 'null');
  
  if (storedDate === today && storedWords) return storedWords;
  
  const pool = [...WORD_BANK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const selected = pool.slice(0, Math.min(STATE.wordCount, WORD_BANK.length));
  safeStorage.setItem('synapse_wordDate', today);
  safeStorage.setItem('synapse_todayWords', JSON.stringify(selected));
  return selected;
}

function changeWordCount(delta) {
  STATE.wordCount = Math.max(5, Math.min(50, STATE.wordCount + delta));
  savePrimitive('wordCount');
  safeStorage.removeItem('synapse_wordDate');
  loadPage('words');
}

function refreshWords() {
  safeStorage.removeItem('synapse_wordDate');
  loadPage('words');
}

function toggleWordLearned(word) {
  const idx = STATE.learnedWords.indexOf(word);
  if (idx > -1) STATE.learnedWords.splice(idx, 1);
  else STATE.learnedWords.push(word);
  saveState('learnedWords');
  loadPage('words');
}

// ====== 每日心情 ======
function renderMood(container) {
  const today = new Date().toDateString();
  const storedMoodDate = safeStorage.getItem('synapse_moodDate');
  const todayMood = (storedMoodDate === today) ? STATE.todayMood : null;
  
  const now = new Date();
  const dateStr = `${now.getFullYear()}年${(now.getMonth()+1)}月${now.getDate()}日`;
  
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="module-header">
        <div class="module-title">💖 今天心情如何？</div>
        <div class="module-desc">📅 ${dateStr} · 点击选择你今天的心情状态</div>
      </div>
      <div class="mood-grid">
        ${MOOD_OPTIONS.map(m => `
          <div class="mood-item ${todayMood === m.label ? 'selected' : ''}" onclick="selectMood('${m.label}')">
            <span class="mood-emoji">${m.emoji}</span>
            <span class="mood-label">${m.label}</span>
          </div>
        `).join('')}
      </div>
      ${STATE.moodHistory.length > 0 ? `
        <div class="mood-history">
          <div class="mood-history-title">📅 心情记录（点击可删除）</div>
          <div class="mood-history-list">
            ${STATE.moodHistory.slice(-30).reverse().map((h, i) => {
              const realIdx = STATE.moodHistory.length - 1 - (STATE.moodHistory.slice(-30).length - 1 - i);
              const moodData = MOOD_OPTIONS.find(m => m.label === h.mood);
              const d = new Date(h.date);
              const fullDate = `${d.getFullYear()}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}`;
              return `
                <div class="mood-history-item" onclick="deleteMoodRecord(${realIdx})" title="点击删除此记录">
                  <span>${moodData ? moodData.emoji : '😶'}</span>
                  <span style="color:var(--text-muted);font-size:10px">${fullDate}</span>
                </div>`;
            }).join('')}
          </div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:6px;text-align:center">💡 点击历史记录可删除选错的心情</div>
        </div>` : ''}
    </div>`;
}

function selectMood(mood) {
  const today = new Date().toDateString();
  STATE.todayMood = mood;
  safeStorage.setItem('synapse_todayMood', mood);
  safeStorage.setItem('synapse_moodDate', today);
  
  const existingIdx = STATE.moodHistory.findIndex(h => h.date === today);
  if (existingIdx > -1) {
    STATE.moodHistory[existingIdx].mood = mood;
  } else {
    STATE.moodHistory.unshift({ mood, date: today });
  }
  if (STATE.moodHistory.length > 60) STATE.moodHistory = STATE.moodHistory.slice(0, 60);
  saveState('moodHistory');
  loadPage('mood');
}

function deleteMoodRecord(idx) {
  if (confirm('确定删除这条心情记录吗？')) {
    STATE.moodHistory.splice(idx, 1);
    const today = new Date().toDateString();
    const remaining = STATE.moodHistory.find(h => h.date === today);
    if (!remaining) {
      STATE.todayMood = null;
      safeStorage.removeItem('synapse_todayMood');
      safeStorage.removeItem('synapse_moodDate');
    }
    saveState('moodHistory');
    loadPage('mood');
  }
}

// ====== 健康饮食饮水 ======
function renderDiet(container) {
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="water-tracker">
        <div class="water-header"><span class="water-title">💧 饮水打卡</span><span class="water-goal">目标: ${STATE.waterGoal}杯/天</span></div>
        <div class="water-cups">
          ${Array.from({length: STATE.waterGoal}, (_, i) => `<div class="water-cup ${i < STATE.waterCups ? 'filled' : ''}" onclick="toggleWaterCup(${i})">${i < STATE.waterCups ? '💧' : '🫗'}</div>`).join('')}
        </div>
        <div class="water-progress-bar"><div class="water-progress-fill" style="width:${(STATE.waterCups/STATE.waterGoal)*100}%"></div></div>
        <div style="text-align:center;margin-top:8px;font-size:13px;color:var(--text-muted)">${STATE.waterCups}/${STATE.waterGoal} 杯 · ${STATE.waterCups * 250}ml / ${STATE.waterGoal * 250}ml</div>
      </div>
      <div class="module-header"><div class="module-title">🍽️ 今日推荐菜谱</div><div class="module-desc">适配低血压、肌肉量偏低体质</div></div>
      ${RECIPES.map(r => `<div class="recipe-card"><div class="recipe-name">${r.name}</div><div class="recipe-tags"><span class="tag">${r.meal}</span>${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}<span class="tag">${r.cal}kcal</span></div><div class="recipe-desc">${r.desc}</div></div>`).join('')}
      <div class="module-header" style="margin-top:20px"><div class="module-title">📔 饮食记录</div></div>
      <div id="dietRecordList">
        ${STATE.dietRecords.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">🍴</div><div class="empty-state-text">今天吃了什么？记录一下吧~</div></div>' :
          STATE.dietRecords.map((r, i) => `<div class="diet-record-item"><span class="diet-record-time">${r.time}</span><span class="diet-record-content">${escapeHtml(r.content)}</span><button class="memo-delete" onclick="deleteDietRecord(${i})">×</button></div>`).join('')}
      </div>
      <div class="todo-input-row" style="margin-top:12px">
        <input class="input" id="dietInput" placeholder="记录饮食，如：早餐-燕麦粥+鸡蛋..." onkeydown="if(event.key==='Enter')addDietRecord()">
        <button class="btn btn-primary btn-sm" onclick="addDietRecord()">记录</button>
      </div>
    </div>`;
}

function toggleWaterCup(idx) {
  if (idx < STATE.waterCups) STATE.waterCups = idx;
  else STATE.waterCups = idx + 1;
  if (STATE.waterCups > STATE.waterGoal) STATE.waterCups = STATE.waterGoal;
  savePrimitive('waterCups');
  loadPage('diet');
}

function addDietRecord() {
  const input = document.getElementById('dietInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  const now = new Date();
  STATE.dietRecords.unshift({ time: `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`, content: text });
  saveState('dietRecords');
  input.value = '';
  loadPage('diet');
}

function deleteDietRecord(idx) {
  STATE.dietRecords.splice(idx, 1);
  saveState('dietRecords');
  loadPage('diet');
}

// ====== 运动健康 ======
function renderSport(container) {
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="module-header">
        <div class="module-title">🏃 今日训练菜单</div>
        <div class="module-desc">居家力量训练 · 适配低血压 & 肌肉量偏低体质</div>
      </div>
      ${TRAINING_PLAN.map((t, i) => `
        <div class="training-card">
          <div class="training-name">${t.icon} ${t.name} — ${t.target}</div>
          <div class="training-details">
            <span class="training-detail">📐 ${t.sets}</span>
            <span class="training-detail">🔄 ${t.reps}</span>
            <span class="training-detail">⏱ ${t.duration}</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:6px">💡 ${t.note}</div>
          <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
            <button class="training-check-btn ${STATE.trainingDone.includes(i) ? 'done' : ''}" onclick="toggleTraining(${i})">${STATE.trainingDone.includes(i) ? '✓ 已完成' : '标记完成'}</button>
            <a class="movie-ext-link" href="${t.video}" target="_blank" rel="noopener" style="text-decoration:none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              视频跟练
            </a>
          </div>
        </div>`).join('')}
      <div class="body-record-form">
        <div class="module-title" style="font-size:16px;margin-bottom:12px">📊 身体状态记录</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">睡眠时长</label><input class="input" id="bodySleep" placeholder="如：7h"></div>
          <div class="form-group"><label class="form-label">体能感受</label><input class="input" id="bodyEnergy" placeholder="如：良好"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">身体体感</label><input class="input" id="bodyFeeling" placeholder="如：正常"></div>
          <div class="form-group"><label class="form-label">情绪碎片</label><input class="input" id="bodyMoodFrag" placeholder="如：平静"></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveBodyRecord()" style="margin-top:8px">保存记录</button>
        ${STATE.bodyRecords.length > 0 ? `<div style="margin-top:16px"><div style="font-size:14px;font-weight:700;margin-bottom:8px">📋 历史记录</div>${STATE.bodyRecords.slice(-5).reverse().map(r => `<div style="font-size:12px;color:var(--text-muted);padding:6px 0;border-bottom:1px solid rgba(212,197,240,0.1)">${r.date} · 睡眠${r.sleep} · 体能${r.energy} · 体感${r.feeling} · ${r.moodFrag}</div>`).join('')}</div>` : ''}
      </div>
    </div>`;
}

function toggleTraining(idx) {
  const pos = STATE.trainingDone.indexOf(idx);
  if (pos > -1) STATE.trainingDone.splice(pos, 1);
  else STATE.trainingDone.push(idx);
  saveState('trainingDone');
  loadPage('sport');
}

function saveBodyRecord() {
  const sleep = document.getElementById('bodySleep')?.value || '';
  const energy = document.getElementById('bodyEnergy')?.value || '';
  const feeling = document.getElementById('bodyFeeling')?.value || '';
  const moodFrag = document.getElementById('bodyMoodFrag')?.value || '';
  if (!sleep && !energy && !feeling && !moodFrag) return;
  STATE.bodyRecords.push({ date: new Date().toLocaleDateString('zh-CN'), sleep, energy, feeling, moodFrag });
  saveState('bodyRecords');
  if (sleep) STATE.bodyStatus.sleep.value = sleep;
  if (energy) STATE.bodyStatus.energy.value = energy;
  if (feeling) STATE.bodyStatus.feeling.value = feeling;
  if (moodFrag) STATE.bodyStatus.moodFrag.value = moodFrag;
  saveState('body');
  loadPage('sport');
}

// ====== 影视收藏 ======
function renderMovies(container) {
  const activeTab = container.dataset.movieTab || 'watchlist';
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="movie-tabs">
        <button class="movie-tab ${activeTab==='watchlist'?'active':''}" onclick="switchMovieTab('watchlist')">📋 待观看</button>
        <button class="movie-tab ${activeTab==='watched'?'active':''}" onclick="switchMovieTab('watched')">✅ 已看完</button>
        <button class="movie-tab ${activeTab==='recommend'?'active':''}" onclick="switchMovieTab('recommend')">🎯 推荐</button>
      </div>
      <div style="margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap">
        <input class="input" id="movieName" placeholder="影片名称" style="flex:1;min-width:100px;padding:8px 10px;font-size:13px">
        <input class="input" id="movieLink" placeholder="豆瓣链接(可选)" style="flex:1;min-width:100px;padding:8px 10px;font-size:13px">
        <button class="btn btn-primary btn-sm" onclick="addMovie()" style="white-space:nowrap">+ 添加到${activeTab==='watched'?'已看完':'待观看'}</button>
      </div>
      <div id="movieList">${renderMovieList(activeTab)}</div>
    </div>`;
}

function switchMovieTab(tab) {
  const container = document.getElementById('pageContainer');
  container.dataset.movieTab = tab;
  loadPage('movies');
}

function renderMovieList(tab) {
  if (tab === 'watchlist') {
    if (STATE.moviesWatchlist.length === 0) return '<div class="empty-state"><div class="empty-state-icon">🎬</div><div class="empty-state-text">待观看列表为空，在上方添加吧~</div></div>';
    return STATE.moviesWatchlist.map((m, i) => `
      <div class="movie-card">
        <div class="movie-name">${m.name}</div>
        <div class="movie-info">${m.genre || '未分类'} · ${m.year || '未知'}</div>
        <div class="movie-tags">${(m.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${m.link ? `<a class="movie-ext-link" href="${m.link}" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>豆瓣详情</a>` : ''}
          <button class="movie-move-btn" onclick="moveToWatched(${i})">标记已看</button>
          <button class="movie-delete-btn" onclick="deleteMovieFromWatchlist(${i})">删除</button>
        </div>
      </div>`).join('');
  } else if (tab === 'watched') {
    if (STATE.moviesWatched.length === 0) return '<div class="empty-state"><div class="empty-state-icon">🎉</div><div class="empty-state-text">还没有已看完的影片，在上方添加吧~</div></div>';
    return STATE.moviesWatched.map((m, i) => `
      <div class="movie-card watched">
        <div class="movie-name">${m.name}</div>
        <div class="movie-info">${m.genre || '未分类'} · ${m.year || '未知'}</div>
        <div class="movie-tags">${(m.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div style="display:flex;gap:8px">
          ${m.link ? `<a class="movie-ext-link" href="${m.link}" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>豆瓣详情</a>` : ''}
          <button class="movie-delete-btn" onclick="deleteMovieFromWatched(${i})">删除</button>
        </div>
      </div>`).join('');
  } else {
    if (STATE.movieRecommends.length === 0) return '<div class="empty-state"><div class="empty-state-icon">🎯</div><div class="empty-state-text">推荐池已用完，新的推荐正在路上~</div></div>';
    return STATE.movieRecommends.map((m, i) => `
      <div class="movie-card">
        <div class="movie-name">${m.name} <span class="tag" style="background:rgba(240,160,168,0.15);color:var(--danger)">推荐</span></div>
        <div class="movie-info">${m.genre} · ${m.year}</div>
        <div class="movie-tags">${(m.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">💡 ${m.reason}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <a class="movie-ext-link" href="${m.link}" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>豆瓣详情</a>
          <button class="movie-move-btn" onclick="moveRecommendToWatchlist(${i})">想看</button>
          <button class="training-check-btn" onclick="moveRecommendToWatched(${i})" style="border-color:var(--success);color:var(--success)">标记已看</button>
        </div>
      </div>`).join('');
  }
}

function addMovie() {
  const nameEl = document.getElementById('movieName');
  const linkEl = document.getElementById('movieLink');
  if (!nameEl) return;
  const name = nameEl.value.trim();
  if (!name) return;
  const link = (linkEl && linkEl.value.trim()) ? linkEl.value.trim() : '';
  const tab = document.getElementById('pageContainer').dataset.movieTab || 'watchlist';
  
  const movie = { name, genre: '', year: '', tags: [], link };
  
  if (tab === 'watched') {
    STATE.moviesWatched.unshift(movie);
    saveState('moviesWatched');
  } else {
    STATE.moviesWatchlist.unshift(movie);
    saveState('moviesWatchlist');
  }
  nameEl.value = '';
  if (linkEl) linkEl.value = '';
  loadPage('movies');
}

function deleteMovieFromWatchlist(idx) {
  if (confirm('确定删除这部影片吗？')) {
    STATE.moviesWatchlist.splice(idx, 1);
    saveState('moviesWatchlist');
    loadPage('movies');
  }
}

function deleteMovieFromWatched(idx) {
  if (confirm('确定删除这部影片吗？')) {
    STATE.moviesWatched.splice(idx, 1);
    saveState('moviesWatched');
    loadPage('movies');
  }
}

function moveToWatched(idx) {
  const movie = STATE.moviesWatchlist.splice(idx, 1)[0];
  STATE.moviesWatched.unshift(movie);
  saveState('moviesWatchlist');
  saveState('moviesWatched');
  loadPage('movies');
}

function moveRecommendToWatchlist(idx) {
  const movie = STATE.movieRecommends.splice(idx, 1)[0];
  STATE.moviesWatchlist.unshift(movie);
  saveState('movieRecommends');
  saveState('moviesWatchlist');
  autoRefillRecommends();
  loadPage('movies');
}

function moveRecommendToWatched(idx) {
  const movie = STATE.movieRecommends.splice(idx, 1)[0];
  STATE.moviesWatched.unshift(movie);
  saveState('movieRecommends');
  saveState('moviesWatched');
  autoRefillRecommends();
  loadPage('movies');
}

function autoRefillRecommends() {
  if (STATE.movieRecommends.length < 3 && STATE.recommendPool.length > 0) {
    const poolIdx = Math.floor(Math.random() * STATE.recommendPool.length);
    const newRec = STATE.recommendPool.splice(poolIdx, 1)[0];
    STATE.movieRecommends.push(newRec);
    saveState('recommendPool');
    saveState('movieRecommends');
  }
}

// ====== 纸条收纳 ======
function renderNotes(container) {
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="module-header"><div class="module-title">📋 纸条内容收纳</div><div class="module-desc">粘贴纸条APP文本，自动总结梳理</div></div>
      <div style="margin-bottom:16px">
        <textarea class="input" id="paperInput" placeholder="在此粘贴纸条内容..." rows="4"></textarea>
        <button class="btn btn-primary btn-sm" onclick="addPaperNote()" style="margin-top:8px">收纳 + 总结</button>
      </div>
      <div id="paperList">
        ${STATE.paperNotes.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📜</div><div class="empty-state-text">还没有收纳任何纸条内容</div></div>' :
          STATE.paperNotes.map((n, i) => `
            <div class="note-card">
              <div class="note-date">${n.date}</div>
              <div class="note-content">${escapeHtml(n.content)}</div>
              ${n.summary ? `<div class="note-summary"><div class="note-summary-label">📌 AI 总结</div><div>${escapeHtml(n.summary)}</div></div>` : ''}
              <div class="note-actions">
                ${!n.summary ? `<button class="note-summarize-btn" onclick="summarizeNote(${i})">生成总结</button>` : ''}
                <button class="note-delete-btn" onclick="deletePaperNote(${i})">删除</button>
              </div>
            </div>`).join('')}
      </div>
    </div>`;
}

function addPaperNote() {
  const input = document.getElementById('paperInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  STATE.paperNotes.unshift({ date: new Date().toLocaleDateString('zh-CN'), content: text, summary: generateSummary(text) });
  saveState('paperNotes');
  input.value = '';
  loadPage('notes');
}

function generateSummary(text) {
  if (text.length <= 50) return text;
  const sentences = text.split(/[。！？\n]+/).filter(s => s.trim());
  if (sentences.length <= 1) return text.slice(0, 100) + (text.length > 100 ? '...' : '');
  return sentences.slice(0, Math.min(3, sentences.length)).join('。') + (sentences.length > 3 ? '……' : '');
}

function summarizeNote(idx) {
  STATE.paperNotes[idx].summary = generateSummary(STATE.paperNotes[idx].content);
  saveState('paperNotes');
  loadPage('notes');
}

function deletePaperNote(idx) {
  STATE.paperNotes.splice(idx, 1);
  saveState('paperNotes');
  loadPage('notes');
}

// ====== 阅读档案 ======
function renderReading(container) {
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="module-header"><div class="module-title">📚 阅读档案</div><div class="module-desc">记录阅读进度与摘抄笔记</div></div>
      ${STATE.readingList.map((book, bi) => `
        <div class="reading-card">
          <div class="reading-book-name">${book.name}</div>
          <div class="reading-author">${book.author}</div>
          <div class="reading-progress-row">
            <span style="font-size:12px;color:var(--text-muted)">阅读进度</span>
            <div class="reading-progress-bar"><div class="reading-progress-fill" style="width:${book.progress}%"></div></div>
            <span class="reading-progress-text">${book.progress}%</span>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:8px">
            <input type="number" class="input" id="readingProgress${bi}" placeholder="更新进度 %" style="width:100px;padding:6px 10px;font-size:13px" min="0" max="100">
            <button class="btn btn-primary btn-sm" onclick="updateReadingProgress(${bi})">更新</button>
          </div>
          ${book.excerpts && book.excerpts.length > 0 ? `<div style="font-size:14px;font-weight:700;margin:10px 0 6px;color:var(--text-primary)">📝 摘抄</div>${book.excerpts.map(e => `<div class="reading-excerpt"><div class="reading-excerpt-label">摘录</div><div>${escapeHtml(e)}</div></div>`).join('')}` : ''}
          ${book.notes ? `<div style="margin-top:10px"><div style="font-size:13px;font-weight:700;color:var(--purple-deep);margin-bottom:4px">💭 读书笔记</div><div style="font-size:13px;color:var(--text-secondary);line-height:1.7">${escapeHtml(book.notes)}</div></div>` : ''}
          <div style="margin-top:10px">
            <textarea class="input" id="readingExcerpt${bi}" placeholder="添加新摘抄..." rows="2" style="font-size:13px"></textarea>
            <button class="btn btn-secondary btn-sm" onclick="addExcerpt(${bi})" style="margin-top:6px">添加摘抄</button>
          </div>
        </div>`).join('')}
      <div class="reading-card" style="margin-top:16px">
        <div style="font-size:15px;font-weight:700;margin-bottom:10px">➕ 添加新书</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">书名</label><input class="input" id="newBookName" placeholder="书名"></div>
          <div class="form-group"><label class="form-label">作者</label><input class="input" id="newBookAuthor" placeholder="作者"></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="addNewBook()" style="margin-top:8px">添加</button>
      </div>
    </div>`;
}

function updateReadingProgress(bi) {
  const input = document.getElementById('readingProgress' + bi);
  if (!input) return;
  const val = parseInt(input.value);
  if (isNaN(val) || val < 0 || val > 100) return;
  STATE.readingList[bi].progress = val;
  saveState('readingList');
  input.value = '';
  loadPage('reading');
}

function addExcerpt(bi) {
  const input = document.getElementById('readingExcerpt' + bi);
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  if (!STATE.readingList[bi].excerpts) STATE.readingList[bi].excerpts = [];
  STATE.readingList[bi].excerpts.push(text);
  saveState('readingList');
  input.value = '';
  loadPage('reading');
}

function addNewBook() {
  const name = document.getElementById('newBookName')?.value.trim();
  const author = document.getElementById('newBookAuthor')?.value.trim();
  if (!name || !author) return;
  STATE.readingList.push({ name, author, progress: 0, excerpts: [], notes: '' });
  saveState('readingList');
  loadPage('reading');
}

// ====== 灵感白板 ======
function renderWhiteboard(container) {
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="whiteboard-input-area">
        <div style="font-size:15px;font-weight:700;margin-bottom:10px">💡 记录灵感</div>
        <textarea class="input" id="ideaInput" placeholder="写下你的突发想法、碎片思绪..." rows="3"></textarea>
        <button class="btn btn-primary btn-sm" onclick="addIdea()" style="margin-top:8px">记录灵感</button>
      </div>
      <div class="whiteboard-ideas" id="ideaList">
        ${STATE.whiteboardIdeas.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">💭</div><div class="empty-state-text">灵感还未降临，放松一下~</div></div>' :
          STATE.whiteboardIdeas.map((idea, i) => `<div class="idea-card"><div class="idea-time">${idea.date}</div><div class="idea-text">${escapeHtml(idea.text)}</div><button class="idea-delete" onclick="deleteIdea(${i})">×</button></div>`).join('')}
      </div>
    </div>`;
}

function addIdea() {
  const input = document.getElementById('ideaInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  STATE.whiteboardIdeas.unshift({ date: new Date().toLocaleString('zh-CN'), text });
  saveState('whiteboardIdeas');
  input.value = '';
  loadPage('whiteboard');
}

function deleteIdea(idx) {
  STATE.whiteboardIdeas.splice(idx, 1);
  saveState('whiteboardIdeas');
  loadPage('whiteboard');
}

// ====== 生活备忘 ======
function renderMemo(container) {
  container.innerHTML = `
    <div class="module-page fade-in">
      <div class="module-header"><div class="module-title">📌 生活备忘</div><div class="module-desc">零散琐事，随手记录</div></div>
      <div style="margin-bottom:16px">
        <div class="todo-input-row">
          <input class="input" id="memoInput" placeholder="记录零散琐事..." onkeydown="if(event.key==='Enter')addMemo()">
          <button class="btn btn-primary btn-sm" onclick="addMemo()">记录</button>
        </div>
      </div>
      <div class="memo-list" id="memoList">
        ${STATE.memos.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📎</div><div class="empty-state-text">暂无备忘，一切井井有条~</div></div>' :
          STATE.memos.map((m, i) => `<div class="memo-card"><span class="memo-pin">📌</span><div class="memo-body"><div class="memo-text">${escapeHtml(m.text)}</div><div class="memo-date">${m.date}</div></div><button class="memo-delete" onclick="deleteMemo(${i})">×</button></div>`).join('')}
      </div>
    </div>`;
}

function addMemo() {
  const input = document.getElementById('memoInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  STATE.memos.unshift({ text, date: new Date().toLocaleDateString('zh-CN') });
  saveState('memos');
  input.value = '';
  loadPage('memo');
}

function deleteMemo(idx) {
  STATE.memos.splice(idx, 1);
  saveState('memos');
  loadPage('memo');
}

// ====== 工具函数 ======
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
