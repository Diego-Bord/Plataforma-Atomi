/*
  ATOMI — demonstração de plataforma educacional.
  Projeto estático: pode ser publicado diretamente no GitHub Pages.
  Dados de progresso, tarefas e preferências ficam no localStorage do navegador.
  É um protótipo.
*/

const STORAGE_KEY = 'atomi-demo-v1';
const subjects = [
  { id: 'matematica', name: 'Matemática', icon: '∑', color: '#63b9ff', bg: 'rgba(32,137,255,.14)', description: 'Funções, geometria, estatística e muito mais.', lessons: ['Conjuntos numéricos', 'Função do primeiro grau', 'Função do segundo grau', 'Progressões aritméticas', 'Trigonometria básica'], duration: '12 aulas', level: 'Intermediário' },
  { id: 'fisica', name: 'Física', icon: '⚛', color: '#9d91ff', bg: 'rgba(143,118,255,.14)', description: 'Entenda os fenômenos e resolva problemas.', lessons: ['Introdução à cinemática', 'Movimento uniforme', 'Leis de Newton', 'Trabalho e energia', 'Ondulatória'], duration: '10 aulas', level: 'Intermediário' },
  { id: 'quimica', name: 'Química', icon: '⚗', color: '#42dbbb', bg: 'rgba(49,214,160,.13)', description: 'Da estrutura atômica às reações químicas.', lessons: ['Modelos atômicos', 'Tabela periódica', 'Ligações químicas', 'Funções orgânicas', 'Estequiometria'], duration: '9 aulas', level: 'Básico' },
  { id: 'biologia', name: 'Biologia', icon: '⌬', color: '#7be0a7', bg: 'rgba(68,205,134,.13)', description: 'A vida em seus diferentes níveis de organização.', lessons: ['Citologia', 'Organelas celulares', 'Genética mendeliana', 'Ecologia', 'Evolução'], duration: '11 aulas', level: 'Intermediário' },
  { id: 'historia', name: 'História', icon: '⌛', color: '#ffbd73', bg: 'rgba(255,179,92,.13)', description: 'Analise sociedades, acontecimentos e contextos.', lessons: ['Antiguidade clássica', 'Feudalismo', 'Renascimento', 'Revolução Industrial', 'Brasil República'], duration: '8 aulas', level: 'Básico' },
  { id: 'geografia', name: 'Geografia', icon: '◎', color: '#6ccedb', bg: 'rgba(8,196,214,.13)', description: 'Espaço geográfico, sociedade e meio ambiente.', lessons: ['Cartografia', 'Clima e vegetação', 'Urbanização', 'Globalização', 'Geopolítica'], duration: '8 aulas', level: 'Intermediário' },
  { id: 'portugues', name: 'Português', icon: 'Aa', color: '#f18eb4', bg: 'rgba(241,142,180,.13)', description: 'Gramática, interpretação e literatura.', lessons: ['Classes gramaticais', 'Sintaxe', 'Figuras de linguagem', 'Interpretação de texto', 'Modernismo'], duration: '10 aulas', level: 'Intermediário' },
  { id: 'redacao', name: 'Redação', icon: '✎', color: '#c0a0ff', bg: 'rgba(143,118,255,.13)', description: 'Construa argumentos e escreva com clareza.', lessons: ['Estrutura dissertativa', 'Tese e argumentação', 'Coesão textual', 'Repertório sociocultural', 'Proposta de intervenção'], duration: '6 aulas', level: 'Todos os níveis' }
];

const questions = [
  { id: 1, subject: 'Matemática', level: 'Fácil', topic: 'Função do 1º grau', statement: 'Uma função do primeiro grau é definida por f(x) = 2x + 3. Qual é o valor de f(4)?', options: ['7', '8', '11', '14', '16'], answer: 2, explanation: 'Basta substituir x por 4: f(4) = 2 · 4 + 3 = 8 + 3 = 11.' },
  { id: 2, subject: 'Física', level: 'Fácil', topic: 'Velocidade média', statement: 'Um carro percorre 180 km em 3 horas, mantendo velocidade média constante. Qual é sua velocidade média?', options: ['30 km/h', '45 km/h', '60 km/h', '90 km/h', '120 km/h'], answer: 2, explanation: 'A velocidade média é a razão entre distância e tempo: Vm = 180 / 3 = 60 km/h.' },
  { id: 3, subject: 'Química', level: 'Médio', topic: 'Tabela periódica', statement: 'Os elementos de uma mesma família (grupo) da tabela periódica geralmente apresentam propriedades químicas semelhantes porque possuem:', options: ['O mesmo número de nêutrons.', 'O mesmo número de camadas eletrônicas.', 'A mesma massa atômica.', 'O mesmo número de elétrons na camada de valência.', 'O mesmo número atômico.'], answer: 3, explanation: 'Os elementos de uma família apresentam configuração semelhante na camada de valência, o que explica suas propriedades químicas parecidas.' },
  { id: 4, subject: 'Biologia', level: 'Fácil', topic: 'Citologia', statement: 'Qual organela celular é responsável pela maior parte da produção de ATP durante a respiração celular aeróbica?', options: ['Ribossomo', 'Mitocôndria', 'Lisossomo', 'Complexo golgiense', 'Centríolo'], answer: 1, explanation: 'A mitocôndria realiza etapas fundamentais da respiração celular aeróbica e produz grande parte do ATP utilizado pela célula.' },
  { id: 5, subject: 'História', level: 'Médio', topic: 'Revolução Industrial', statement: 'Uma transformação central da Primeira Revolução Industrial foi:', options: ['A substituição da produção artesanal pela produção mecanizada.', 'O fim imediato do trabalho assalariado.', 'A expansão do feudalismo europeu.', 'A redução da urbanização.', 'A adoção da informática nas fábricas.'], answer: 0, explanation: 'A mecanização da produção, inicialmente na indústria têxtil, transformou o trabalho e impulsionou o crescimento das fábricas.' },
  { id: 6, subject: 'Geografia', level: 'Médio', topic: 'Globalização', statement: 'Um dos fatores que acelerou a integração econômica e informacional entre diferentes países nas últimas décadas foi:', options: ['A diminuição dos meios de comunicação.', 'O isolamento dos mercados nacionais.', 'O avanço dos transportes e das tecnologias de informação.', 'O fim das redes de comércio.', 'A redução do fluxo de dados.'], answer: 2, explanation: 'A evolução dos transportes e das telecomunicações tornou mais rápida a circulação de mercadorias, capitais, pessoas e informações.' },
  { id: 7, subject: 'Português', level: 'Fácil', topic: 'Figuras de linguagem', statement: 'Na frase “Estou morrendo de fome”, a expressão destacada é um exemplo de:', options: ['Metáfora', 'Hipérbole', 'Eufemismo', 'Ironia', 'Personificação'], answer: 1, explanation: 'A hipérbole é o exagero intencional de uma ideia. A pessoa não está literalmente morrendo; quer enfatizar que está com muita fome.' },
  { id: 8, subject: 'Matemática', level: 'Médio', topic: 'Porcentagem', statement: 'Um produto que custava R$ 200 recebeu desconto de 15%. Qual é o novo preço?', options: ['R$ 150', 'R$ 160', 'R$ 170', 'R$ 175', 'R$ 185'], answer: 2, explanation: '15% de 200 = 30. Subtraindo o desconto: 200 − 30 = R$ 170.' },
  { id: 9, subject: 'Física', level: 'Médio', topic: 'Leis de Newton', statement: 'De acordo com a primeira lei de Newton, se a força resultante sobre um corpo é nula, ele:', options: ['Necessariamente está em repouso.', 'Necessariamente está acelerando.', 'Mantém seu estado de repouso ou de movimento retilíneo uniforme.', 'Passa a perder massa.', 'Muda a direção de seu movimento.'], answer: 2, explanation: 'O princípio da inércia afirma que um corpo mantém seu estado de movimento quando a força resultante é zero.' },
  { id: 10, subject: 'Química', level: 'Médio', topic: 'Funções orgânicas', statement: 'Qual grupo funcional caracteriza os álcoois?', options: ['−COOH', '−CHO', '−OH ligado a carbono saturado', '−NH₂', '−COO−'], answer: 2, explanation: 'Os álcoois apresentam o grupo hidroxila (−OH) ligado a um carbono saturado. O grupo −COOH, por exemplo, caracteriza os ácidos carboxílicos.' },
  { id: 11, subject: 'Biologia', level: 'Médio', topic: 'Genética', statement: 'Em um cruzamento entre dois indivíduos heterozigotos Aa, considerando dominância completa, qual é a probabilidade de nascer um descendente aa?', options: ['0%', '25%', '50%', '75%', '100%'], answer: 1, explanation: 'No cruzamento Aa × Aa, as combinações possíveis são AA, Aa, Aa e aa. Portanto, a chance de aa é 1 em 4, ou 25%.' },
  { id: 12, subject: 'História', level: 'Fácil', topic: 'Iluminismo', statement: 'O pensamento iluminista do século XVIII valorizava principalmente:', options: ['A autoridade absoluta baseada na tradição.', 'A razão, a ciência e a crítica ao absolutismo.', 'A manutenção dos privilégios feudais.', 'A rejeição de qualquer investigação científica.', 'O fortalecimento da servidão.'], answer: 1, explanation: 'Os iluministas defendiam o uso da razão e criticavam estruturas políticas e sociais consideradas contrárias à liberdade e ao progresso.' },
  { id: 13, subject: 'Geografia', level: 'Fácil', topic: 'Cartografia', statement: 'Em um mapa de escala 1:100.000, uma distância de 1 cm representa, na realidade:', options: ['10 m', '100 m', '1 km', '10 km', '100 km'], answer: 2, explanation: 'A escala 1:100.000 indica que 1 cm no mapa equivale a 100.000 cm no terreno, isto é, 1.000 m ou 1 km.' },
  { id: 14, subject: 'Português', level: 'Médio', topic: 'Coesão textual', statement: 'Em um texto, palavras como “portanto”, “entretanto” e “além disso” são utilizadas principalmente para:', options: ['Substituir todos os verbos.', 'Estabelecer relações de sentido entre as ideias.', 'Eliminar a necessidade de pontuação.', 'Indicar sempre uma comparação.', 'Repetir o sujeito da oração.'], answer: 1, explanation: 'Esses conectivos articulam as partes do texto, indicando relações como conclusão, oposição e adição.' }
];

const flashcards = [
  { subject: 'Biologia', front: 'Qual é a função dos ribossomos?', back: 'Realizar a síntese de proteínas, traduzindo a informação contida no RNA mensageiro.' },
  { subject: 'Química', front: 'O que caracteriza um ácido carboxílico?', back: 'A presença do grupo funcional carboxila: −COOH.' },
  { subject: 'Física', front: 'Qual é a fórmula da velocidade média?', back: 'Vm = ΔS / Δt, ou seja, a variação da posição dividida pelo intervalo de tempo.' },
  { subject: 'Matemática', front: 'Como calcular a área de um triângulo?', back: 'Multiplique a base pela altura e divida o resultado por 2: A = (b · h) / 2.' },
  { subject: 'História', front: 'O que foi o Iluminismo?', back: 'Um movimento intelectual do século XVIII que valorizava a razão, a ciência e a liberdade, criticando o absolutismo e os privilégios tradicionais.' },
  { subject: 'Geografia', front: 'O que é latitude?', back: 'É a distância angular de um ponto em relação à Linha do Equador, variando de 0° a 90° norte ou sul.' },
  { subject: 'Português', front: 'O que é uma metáfora?', back: 'É uma figura de linguagem que estabelece uma relação de sentido entre elementos sem utilizar conectivos comparativos explícitos.' },
  { subject: 'Redação', front: 'Quais são os elementos essenciais de uma proposta de intervenção no ENEM?', back: 'Agente, ação, meio/modo, finalidade/efeito e detalhamento. A proposta deve respeitar os direitos humanos.' }
];

const defaultState = {
  completedLessons: [],
  attempts: [],
  tasks: [
    { id: 1, title: 'Revisar funções do 1º grau', category: 'Matemática', done: false },
    { id: 2, title: 'Resolver 10 questões de Física', category: 'Física', done: false },
    { id: 3, title: 'Ler resumo de Citologia', category: 'Biologia', done: true }
  ],
  knownCards: [],
  studyMinutes: 50,
  weeklyMinutes: [25, 45, 60, 35, 50, 0, 0],
  theme: 'dark'
};

let state = loadState();
let currentView = 'dashboard';
let activeSubjectFilter = 'Todas';
let currentCourseId = null;
let quiz = null;
let flashIndex = 0;
let flashFlipped = false;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...structuredClone(defaultState), ...saved } : structuredClone(defaultState);
  } catch (error) { return structuredClone(defaultState); }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { console.warn('Não foi possível salvar os dados localmente.', error); }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
function formatHours(minutes) { return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}min`; }
function getSubjectByName(name) { return subjects.find(s => s.name === name); }
function subjectStyle(subject) {
  const s = typeof subject === 'string' ? getSubjectByName(subject) : subject;
  return s ? `style="--subject-color:${s.color};--subject-bg:${s.bg}"` : '';
}
function completedCount(subjectId) {
  const subject = subjects.find(s => s.id === subjectId);
  return subject ? subject.lessons.filter((_, i) => state.completedLessons.includes(`${subjectId}-${i}`)).length : 0;
}
function totalCompleted() { return state.completedLessons.length; }
function totalAttempted() { return state.attempts.length; }
function totalCorrect() { return state.attempts.filter(a => a.correct).length; }
function accuracy() { return totalAttempted() ? Math.round(totalCorrect() / totalAttempted() * 100) : 0; }
function dailyPercent() { return Math.min(100, Math.round(state.studyMinutes / 120 * 100)); }
function updateProgressUI() {
  const bar = document.getElementById('sidebarGoalBar');
  if (bar) bar.style.width = `${dailyPercent()}%`;
  const streak = document.getElementById('streakCount');
  if (streak) streak.textContent = state.studyMinutes > 0 ? '1' : '0';
}
function showToast(message) {
  const region = document.getElementById('toastRegion');
  if (!region) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
function setView(view) {
  currentView = view;
  currentCourseId = null;
  const labels = { dashboard: 'Visão geral', courses: 'Meus cursos', questions: 'Banco de questões', performance: 'Desempenho', flashcards: 'Flashcards', planner: 'Cronograma' };
  document.getElementById('pageLabel').textContent = labels[view] || 'Atomi';
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  closeSidebar();
  render();
  document.getElementById('appContent').focus({ preventScroll: true });
}
function render() {
  const content = document.getElementById('appContent');
  const views = { dashboard: renderDashboard, courses: renderCourses, questions: renderQuestions, performance: renderPerformance, flashcards: renderFlashcards, planner: renderPlanner };
  content.innerHTML = (views[currentView] || renderDashboard)();
  updateProgressUI();
}

function renderDashboard() {
  const weeklyMax = Math.max(60, ...state.weeklyMinutes);
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const chart = state.weeklyMinutes.map((minutes, i) => `<div class="chart-day"><div class="chart-bar-wrap"><div class="chart-bar" style="height:${Math.max(4, minutes / weeklyMax * 100)}%" title="${minutes} minutos"></div></div><small>${days[i]}</small></div>`).join('');
  const recently = subjects.slice(0, 4).map((s, i) => {
    const count = completedCount(s.id);
    const percent = Math.round(count / s.lessons.length * 100);
    return `<button class="course-row" data-course="${s.id}"><span class="subject-icon" ${subjectStyle(s)}>${s.icon}</span><span class="course-row-main"><strong>${s.name}</strong><small>${count ? `${count} de ${s.lessons.length} aulas concluídas` : ['Continue de onde parou', 'Comece sua primeira aula', 'Conteúdo esperando por você', 'Sua próxima revisão'][i]}</small></span><span class="course-row-end"><small>${percent}%</small><span class="circle-arrow">→</span></span></button>`;
  }).join('');
  const subjectRows = subjects.slice(0, 5).map(s => {
    const percent = Math.round(completedCount(s.id) / s.lessons.length * 100);
    return `<div class="subject-progress-item"><span>${s.name}</span><div class="progress-track"><span style="width:${percent}%"></span></div><strong>${percent}%</strong></div>`;
  }).join('');
  const mins = state.studyMinutes;
  const offset = 326.7 * (1 - dailyPercent() / 100);
  return `
    <section class="welcome-banner">
      <div class="welcome-copy">
        <div class="eyebrow">SEU ESPAÇO DE APRENDIZADO</div>
        <h1>Vamos aprender algo <em>incrível</em> hoje?</h1>
        <p>Seu próximo passo começa agora. Organize seus estudos, pratique questões e acompanhe cada conquista na sua jornada.</p>
        <div class="welcome-actions"><button class="primary-btn" data-action="go-questions">Resolver questões <span>↗</span></button><button class="secondary-btn" data-action="go-courses">Explorar matérias</button></div>
      </div>
      <div class="welcome-art"><img src="assets/atomi-logo.jpeg" alt="Atomi — Estude melhor. Com inteligência." /></div>
    </section>

    <section class="stats-grid">
      <article class="stat-card"><span class="stat-icon">◷</span><div class="stat-copy"><span>Tempo de estudo hoje</span><strong>${formatHours(mins)}</strong><small><b>${dailyPercent()}%</b> da sua meta diária</small></div></article>
      <article class="stat-card" style="--icon-bg:rgba(49,214,160,.12);--icon-color:#54ddb0;--glow:rgba(49,214,160,.15)"><span class="stat-icon">✓</span><div class="stat-copy"><span>Aulas concluídas</span><strong>${totalCompleted()}</strong><small>Continue avançando no seu ritmo</small></div></article>
      <article class="stat-card" style="--icon-bg:rgba(143,118,255,.13);--icon-color:#ac9aff;--glow:rgba(143,118,255,.15)"><span class="stat-icon">◎</span><div class="stat-copy"><span>Questões respondidas</span><strong>${totalAttempted()}</strong><small>${totalCorrect()} acertos até agora</small></div></article>
      <article class="stat-card" style="--icon-bg:rgba(255,179,92,.12);--icon-color:#ffc17b;--glow:rgba(255,179,92,.13)"><span class="stat-icon">♧</span><div class="stat-copy"><span>Taxa de acerto</span><strong>${accuracy()}%</strong><small>Seu aproveitamento geral</small></div></article>
    </section>

    <section class="dashboard-grid">
      <article class="panel"><div class="panel-heading"><div><h2>Continue estudando</h2><p>Retome seus conteúdos e mantenha o ritmo.</p></div><button class="text-link" data-action="go-courses">Ver todos →</button></div><div class="continue-list">${recently}</div></article>
      <article class="panel goal-panel"><div class="daily-goal-top"><div><h2>Meta diária</h2><p class="subtext" style="margin:5px 0 0">Um pouco por dia faz diferença.</p></div><span class="goal-round">✦</span></div><div class="ring-wrap"><svg class="progress-ring" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="ringGradient" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#2877ff"/><stop offset="100%" stop-color="#08d9ed"/></linearGradient></defs><circle class="track" cx="60" cy="60" r="52"/><circle class="value" cx="60" cy="60" r="52" style="stroke-dashoffset:${offset}"/></svg><div class="ring-label"><strong>${dailyPercent()}%</strong><span>da meta concluída</span></div></div><div class="goal-bottom"><span>${formatHours(mins)} estudadas</span><strong>Meta: 2h</strong></div></article>
    </section>

    <section class="dashboard-grid">
      <article class="panel activity-panel"><div class="panel-heading"><div><h2>Seu ritmo de estudos</h2><p>Minutos estudados durante a semana.</p></div><span class="pill">Esta semana</span></div><div class="week-chart">${chart}</div></article>
      <article class="panel"><div class="panel-heading"><div><h2>Progresso por matéria</h2><p>Suas aulas concluídas.</p></div><button class="text-link" data-action="go-performance">Detalhes</button></div><div class="subject-progress-list">${subjectRows}</div></article>
    </section>`;
}

function renderCourses() {
  if (currentCourseId) return renderCourseDetail(currentCourseId);
  const filters = ['Todas', 'Exatas', 'Biológicas', 'Humanas', 'Linguagens'];
  const filterHtml = filters.map(f => `<button class="filter-chip ${activeSubjectFilter === f ? 'active' : ''}" data-filter="${f}">${f}</button>`).join('');
  let filtered = subjects;
  if (activeSubjectFilter === 'Exatas') filtered = subjects.filter(s => ['matematica', 'fisica', 'quimica'].includes(s.id));
  if (activeSubjectFilter === 'Biológicas') filtered = subjects.filter(s => s.id === 'biologia');
  if (activeSubjectFilter === 'Humanas') filtered = subjects.filter(s => ['historia', 'geografia'].includes(s.id));
  if (activeSubjectFilter === 'Linguagens') filtered = subjects.filter(s => ['portugues', 'redacao'].includes(s.id));
  return `<div class="page-title-row"><div><div class="eyebrow">CONTEÚDO ORGANIZADO</div><h1>Meus cursos</h1><p class="subtext">Explore as matérias e avance aula por aula.</p></div><span class="pill green">${totalCompleted()} aulas concluídas</span></div>
    <div class="filter-row">${filterHtml}</div>
    <div class="course-grid">${filtered.map(s => {
      const done = completedCount(s.id); const pct = Math.round(done / s.lessons.length * 100);
      return `<article class="course-card"><div class="course-card-top"><span class="subject-icon" ${subjectStyle(s)}>${s.icon}</span><span class="pill">${s.level}</span></div><h3>${s.name}</h3><p>${s.description}</p><div class="course-meta"><span>${s.duration}</span><span>${done}/${s.lessons.length} aulas</span></div><div class="progress-track"><span style="width:${pct}%"></span></div><div class="course-card-bottom"><span class="muted" style="font-size:9px">${pct}% concluído</span><button class="soft-btn" data-course="${s.id}">Acessar curso →</button></div></article>`;
    }).join('')}</div>`;
}
function renderCourseDetail(id) {
  const s = subjects.find(x => x.id === id);
  if (!s) { currentCourseId = null; return renderCourses(); }
  const done = completedCount(s.id); const pct = Math.round(done / s.lessons.length * 100);
  return `<div class="page-title-row"><div><button class="text-link" data-action="back-courses">← Voltar para cursos</button><div class="eyebrow" style="margin-top:14px">ÁREA DE ESTUDO</div><h1>${s.name}</h1><p class="subtext">${s.description}</p></div><span class="subject-icon" ${subjectStyle(s)} style="width:58px;height:58px;font-size:25px">${s.icon}</span></div>
    <div class="course-detail"><section class="panel"><div class="panel-heading"><div><h2>Conteúdo do curso</h2><p>${s.lessons.length} aulas • Conteúdo demonstrativo</p></div><span class="pill green">${pct}% concluído</span></div><div class="lesson-list">${s.lessons.map((lesson, i) => { const isDone = state.completedLessons.includes(`${s.id}-${i}`); return `<div class="lesson-item"><span class="lesson-number">${isDone ? '✓' : String(i + 1).padStart(2, '0')}</span><div class="lesson-info"><strong>${lesson}</strong><small>${isDone ? 'Aula concluída' : 'Aula • 12 min • Material de apoio'}</small></div>${isDone ? '<span class="lesson-status">✓</span>' : ''}<button class="soft-btn" data-lesson="${s.id}-${i}">${isDone ? 'Revisar' : 'Estudar'}</button></div>`; }).join('')}</div></section>
    <aside class="panel"><h2>Seu progresso</h2><p class="subtext" style="margin:6px 0 16px">Você está construindo consistência.</p><div class="ring-wrap" style="width:125px;height:125px"><svg class="progress-ring" viewBox="0 0 120 120"><defs><linearGradient id="ringGradient" x1="0" x2="1"><stop offset="0%" stop-color="#2877ff"/><stop offset="100%" stop-color="#08d9ed"/></linearGradient></defs><circle class="track" cx="60" cy="60" r="52"/><circle class="value" cx="60" cy="60" r="52" style="stroke-dashoffset:${326.7 * (1 - pct / 100)}"/></svg><div class="ring-label"><strong>${pct}%</strong><span>concluído</span></div></div><div class="goal-bottom"><span>Aulas concluídas</span><strong>${done}/${s.lessons.length}</strong></div><div style="margin-top:17px"><span class="pill">Dica de estudo</span><p class="subtext" style="margin-top:10px">Assista ou leia o conteúdo, faça suas anotações e resolva questões para fixar o que aprendeu.</p><button class="primary-btn" style="width:100%;margin-top:8px" data-action="go-questions">Praticar questões ↗</button></div></aside></div>`;
}

function renderQuestions() {
  if (quiz && quiz.finished) return renderQuizResult();
  if (quiz && quiz.started) return renderQuizQuestion();
  return `<div class="page-title-row"><div><div class="eyebrow">PRATIQUE E EVOLUA</div><h1>Banco de questões</h1><p class="subtext">Treine com questões de diferentes matérias e veja sua evolução.</p></div><span class="pill">${questions.length} questões demonstrativas</span></div>
    <div class="question-layout"><section class="panel"><div class="quiz-empty"><div class="big-symbol">⌕</div><h2>Monte seu treino</h2><p class="subtext" style="max-width:410px;margin:8px auto 20px">Escolha uma matéria ou faça um simulado misto. Ao responder, você recebe a correção e uma explicação.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:440px;margin:0 auto 13px;text-align:left"><label><span class="muted" style="font-size:9px;display:block;margin-bottom:6px">MATÉRIA</span><select class="select-field" id="quizSubject"><option value="Todas">Todas as matérias</option>${subjects.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}</select></label><label><span class="muted" style="font-size:9px;display:block;margin-bottom:6px">QUANTIDADE</span><select class="select-field" id="quizAmount"><option value="5">5 questões</option><option value="10">10 questões</option><option value="all">Todas disponíveis</option></select></label></div>
      <button class="primary-btn" id="startQuiz">Começar treino <span>→</span></button>
    </div></section><aside class="quiz-aside"><div class="panel"><div class="panel-heading"><div><h3>Seu histórico</h3><p>Resumo de prática</p></div><span class="goal-round">◎</span></div><div class="subject-progress-list"><div class="subject-progress-item"><span>Respondidas</span><div class="progress-track"><span style="width:${Math.min(100, totalAttempted() / 20 * 100)}%"></span></div><strong>${totalAttempted()}</strong></div><div class="subject-progress-item"><span>Acertos</span><div class="progress-track"><span style="width:${accuracy()}%"></span></div><strong>${totalCorrect()}</strong></div></div></div><div class="panel"><h3>Como funciona?</h3><ul class="quiz-tips"><li>Escolha a matéria e a quantidade de questões.</li><li>Leia o enunciado com atenção.</li><li>Confira a explicação após cada resposta.</li><li>Seu desempenho será salvo automaticamente.</li></ul></div></aside></div>`;
}
function renderQuizQuestion() {
  const q = quiz.items[quiz.index];
  const chosen = quiz.answers[quiz.index];
  const answered = chosen !== undefined;
  const progress = (quiz.index + (answered ? 1 : 0)) / quiz.items.length * 100;
  return `<div class="page-title-row"><div><div class="eyebrow">MODO DE PRÁTICA</div><h1>Treino de questões</h1><p class="subtext">Uma questão por vez. Você consegue!</p></div><button class="soft-btn" data-action="exit-quiz">✕ Encerrar treino</button></div>
    <div class="question-layout"><section class="panel quiz-card"><div class="quiz-topline"><span class="pill">Questão ${quiz.index + 1} de ${quiz.items.length}</span><span class="muted" style="font-size:9px">${quiz.items.length - quiz.index - (answered ? 1 : 0)} restantes</span></div><div class="quiz-progress"><span style="width:${progress}%"></span></div><div class="question-meta"><span class="pill">${q.subject}</span><span class="pill purple">${q.topic}</span><span class="pill ${q.level === 'Fácil' ? 'green' : 'orange'}">${q.level}</span></div><h2 class="question-text">${q.statement}</h2><div class="alternatives">${q.options.map((option, i) => {
    let cls = 'alternative'; if (answered && i === q.answer) cls += ' correct'; if (answered && i === chosen && i !== q.answer) cls += ' wrong';
    return `<button class="${cls}" data-answer="${i}" ${answered ? 'disabled' : ''}><span class="alt-letter">${'ABCDE'[i]}</span><span>${option}</span>${answered && i === q.answer ? '<span style="margin-left:auto;color:#55e6b4">✓</span>' : ''}</button>`;
  }).join('')}</div><div class="feedback-box ${answered ? 'show' : ''}"><strong style="color:${answered && chosen === q.answer ? 'var(--green)' : 'var(--orange)'}">${answered && chosen === q.answer ? 'Muito bem! Resposta correta.' : 'Quase lá! Vamos aprender com o erro.'}</strong><p>${q.explanation}</p></div><div class="quiz-bottom"><span class="muted" style="font-size:9px">${answered ? (chosen === q.answer ? '1 acerto registrado' : 'Resposta registrada') : 'Selecione uma alternativa'}</span>${answered ? `<button class="primary-btn" id="nextQuestion">${quiz.index === quiz.items.length - 1 ? 'Ver resultado' : 'Próxima questão'} →</button>` : '<span class="pill">Boa prova!</span>'}</div></section>
    <aside class="quiz-aside"><div class="panel"><h3>Seu treino</h3><div style="display:flex;justify-content:space-between;margin-top:14px"><span class="muted" style="font-size:9px">Respondidas</span><strong>${Object.keys(quiz.answers).length}/${quiz.items.length}</strong></div><div class="progress-track" style="margin-top:8px"><span style="width:${Object.keys(quiz.answers).length / quiz.items.length * 100}%"></span></div><div style="display:flex;justify-content:space-between;margin-top:14px"><span class="muted" style="font-size:9px">Acertos</span><strong>${quiz.correct}</strong></div></div><div class="panel"><h3>Dica</h3><p class="quiz-tips">Leia todas as alternativas antes de escolher. Mesmo quando errar, a explicação ajuda a fixar o conteúdo.</p></div></aside></div>`;
}
function renderQuizResult() {
  const percent = Math.round(quiz.correct / quiz.items.length * 100);
  return `<div class="page-title-row"><div><div class="eyebrow">TREINO FINALIZADO</div><h1>Seu resultado</h1><p class="subtext">Cada questão é uma oportunidade de aprender.</p></div></div><section class="panel quiz-result"><div class="result-medal">✦</div><span class="pill green">Treino concluído</span><div class="result-score">${percent}%</div><h2>${percent >= 80 ? 'Excelente trabalho!' : percent >= 50 ? 'Bom progresso!' : 'Continue praticando!'}</h2><p class="subtext">Você acertou <strong style="color:var(--text)">${quiz.correct} de ${quiz.items.length}</strong> questões.</p><div style="max-width:330px;margin:18px auto;display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="stat-card" style="justify-content:center"><div class="stat-copy"><span>Acertos</span><strong style="color:var(--green)">${quiz.correct}</strong></div></div><div class="stat-card" style="justify-content:center"><div class="stat-copy"><span>Erros</span><strong style="color:var(--orange)">${quiz.items.length - quiz.correct}</strong></div></div></div><div style="display:flex;justify-content:center;gap:9px;flex-wrap:wrap"><button class="primary-btn" id="restartQuiz">Novo treino ↗</button><button class="secondary-btn" data-action="go-performance">Ver desempenho</button></div></section>`;
}

function renderPerformance() {
  const week = state.weeklyMinutes;
  const max = Math.max(60, ...week);
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const bars = week.map((m, i) => `<div class="chart-day"><div class="chart-bar-wrap"><div class="chart-bar" style="height:${Math.max(3, m / max * 100)}%" title="${m} min"></div></div></div>`).join('');
  const subjectData = subjects.map(s => {
    const attempts = state.attempts.filter(a => a.subject === s.name);
    const correct = attempts.filter(a => a.correct).length;
    const percent = attempts.length ? Math.round(correct / attempts.length * 100) : 0;
    return { ...s, attempts: attempts.length, percent };
  }).sort((a, b) => b.attempts - a.attempts);
  const progressItems = subjectData.map(s => `<div class="subject-progress-item"><span>${s.name}</span><div class="progress-track"><span style="width:${s.percent}%;background:linear-gradient(90deg,${s.color},#13cfe2)"></span></div><strong>${s.attempts ? `${s.percent}%` : '—'}</strong></div>`).join('');
  return `<div class="page-title-row"><div><div class="eyebrow">DADOS DA SUA EVOLUÇÃO</div><h1>Desempenho</h1><p class="subtext">Acompanhe seus resultados e descubra onde focar.</p></div><span class="pill">Atualizado em tempo real</span></div>
    <section class="performance-stats"><article class="stat-card"><span class="stat-icon">☷</span><div class="stat-copy"><span>Questões respondidas</span><strong>${totalAttempted()}</strong><small>Em todos os treinos</small></div></article><article class="stat-card"><span class="stat-icon" style="color:var(--green)">✓</span><div class="stat-copy"><span>Questões corretas</span><strong>${totalCorrect()}</strong><small>Continue praticando</small></div></article><article class="stat-card"><span class="stat-icon" style="color:var(--purple)">◎</span><div class="stat-copy"><span>Taxa de acerto</span><strong>${accuracy()}%</strong><small>Seu aproveitamento</small></div></article><article class="stat-card"><span class="stat-icon" style="color:var(--orange)">◷</span><div class="stat-copy"><span>Estudo registrado</span><strong>${formatHours(state.weeklyMinutes.reduce((a,b) => a+b, 0))}</strong><small>Nos últimos 7 dias</small></div></article></section>
    <section class="performance-grid"><article class="panel"><div class="panel-heading"><div><h2>Atividade semanal</h2><p>Tempo dedicado aos estudos por dia.</p></div><span class="pill">Minutos</span></div><div class="large-chart">${bars}</div><div class="chart-label-row">${days.map(d => `<span>${d}</span>`).join('')}</div></article><article class="panel"><div class="panel-heading"><div><h2>Precisão geral</h2><p>Percentual de respostas corretas.</p></div></div><div class="accuracy-donut" style="--percent:${accuracy()}%"><div><strong>${accuracy()}%</strong><small>de acerto</small></div></div><p class="subtext" style="text-align:center;margin:0">${totalAttempted() ? `${totalCorrect()} acertos em ${totalAttempted()} questões` : 'Responda questões para gerar seus dados.'}</p></article></section>
    <section class="panel"><div class="panel-heading"><div><h2>Desempenho por matéria</h2><p>Veja onde você já praticou.</p></div><button class="text-link" data-action="go-questions">Praticar agora →</button></div><div class="subject-progress-list">${progressItems}</div></section>`;
}

function renderFlashcards() {
  const card = flashcards[flashIndex];
  const known = state.knownCards.includes(flashIndex);
  return `<div class="page-title-row"><div><div class="eyebrow">MEMORIZAÇÃO INTELIGENTE</div><h1>Flashcards</h1><p class="subtext">Revise conceitos importantes com cartões de pergunta e resposta.</p></div><span class="pill green">${state.knownCards.length}/${flashcards.length} dominados</span></div>
    <div class="flashcard-stage"><div class="flashcard-controls"><button class="soft-btn" data-action="flash-prev">← Anterior</button><span>Cartão ${flashIndex + 1} de ${flashcards.length}</span><button class="soft-btn" data-action="flash-next">Próximo →</button></div><div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Virar flashcard"><span class="flashcard-hint">${flashFlipped ? 'RESPOSTA' : 'PERGUNTA'} • CLIQUE PARA VIRAR</span><div>${flashFlipped ? `<p>${escapeHTML(card.back)}</p>` : `<span class="pill" style="margin-bottom:16px">${card.subject}</span><h2>${escapeHTML(card.front)}</h2>`}</div></div><div class="flashcard-actions"><button class="secondary-btn" data-action="flash-flip">↻ Virar cartão</button><button class="primary-btn" data-action="flash-known">${known ? '✓ Já domino' : '✓ Marcar como aprendido'}</button></div></div>`;
}

function renderPlanner() {
  const done = state.tasks.filter(t => t.done).length;
  const taskHtml = state.tasks.length ? state.tasks.map(task => `<div class="task-item ${task.done ? 'done' : ''}"><input class="task-check" type="checkbox" data-task-check="${task.id}" ${task.done ? 'checked' : ''} aria-label="Concluir tarefa"/><div class="task-copy"><strong>${escapeHTML(task.title)}</strong><small>${escapeHTML(task.category || 'Estudo independente')}</small></div><button class="task-delete" data-task-delete="${task.id}" aria-label="Excluir tarefa">×</button></div>`).join('') : '<div class="empty-state"><strong>Nenhuma tarefa por aqui.</strong>Adicione uma atividade para organizar seus estudos.</div>';
  const date = new Date();
  const weekday = date.getDay();
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const weekButtons = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(date); d.setDate(date.getDate() - ((weekday + 6) % 7) + i);
    return `<button class="${d.toDateString() === date.toDateString() ? 'today' : ''}" type="button">${days[d.getDay()]}<span>${d.getDate()}</span></button>`;
  }).join('');
  return `<div class="page-title-row"><div><div class="eyebrow">ORGANIZE SUA ROTINA</div><h1>Cronograma</h1><p class="subtext">Planeje suas tarefas e transforme intenção em consistência.</p></div><span class="pill">${done}/${state.tasks.length} tarefas concluídas</span></div>
    <div class="planner-layout"><section class="panel"><div class="panel-heading"><div><h2>Suas tarefas</h2><p>Marque as atividades conforme for concluindo.</p></div><span class="pill green">${state.tasks.length ? Math.round(done / state.tasks.length * 100) : 0}% concluído</span></div><form class="task-form" id="taskForm"><input class="field" id="taskTitle" maxlength="90" placeholder="Ex.: Revisar eletrodinâmica" required /><select class="select-field" id="taskCategory"><option>Estudo geral</option>${subjects.map(s => `<option>${s.name}</option>`).join('')}</select><button class="primary-btn" type="submit">+ Adicionar</button></form><div class="task-list">${taskHtml}</div></section>
    <aside><div class="panel"><h2>Esta semana</h2><p class="subtext" style="margin:5px 0 0">Uma semana de cada vez.</p><div class="week-mini">${weekButtons}</div><div style="margin-top:20px;padding-top:15px;border-top:1px solid var(--line)"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="muted" style="font-size:9px">Tarefas concluídas</span><strong>${done}/${state.tasks.length}</strong></div><div class="progress-track"><span style="width:${state.tasks.length ? done / state.tasks.length * 100 : 0}%"></span></div></div></div><div class="panel" style="margin-top:13px"><span class="pill">Dica Atomi</span><p class="subtext" style="margin:10px 0 0">Divida conteúdos grandes em tarefas pequenas. Assim fica mais fácil começar e perceber seu progresso.</p></div></aside></div>`;
}

function openLesson(key) {
  const [subjectId, indexText] = key.split('-');
  const subject = subjects.find(s => s.id === subjectId);
  const index = Number(indexText);
  if (!subject || !subject.lessons[index]) return;
  const lessonName = subject.lessons[index];
  const isDone = state.completedLessons.includes(key);
  const layer = document.getElementById('modalLayer');
  layer.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-header"><div><span class="eyebrow">${subject.name.toUpperCase()}</span><h2 id="modalTitle" style="margin-top:7px">${lessonName}</h2></div><button class="modal-close" data-action="close-modal" aria-label="Fechar">×</button></div><div class="lesson-content"><p>Este espaço representa a página de uma aula da plataforma Atomi. Aqui poderiam ficar o vídeo do professor, o material em PDF, as anotações e os exercícios relacionados ao tema.</p><h3>O que você vai estudar?</h3><p>Aprenda os conceitos principais de <strong>${lessonName}</strong>, observe os exemplos e tente explicar o conteúdo com suas próprias palavras. Faça pausas para anotar dúvidas e retome os pontos mais importantes ao final.</p><div class="note-box"><strong>💡 Dica:</strong> depois de estudar, resolva algumas questões sobre o assunto. A prática ajuda a identificar o que já foi compreendido e o que ainda precisa de revisão.</div><h3>Para fixar o conteúdo</h3><p>1. Leia ou assista à explicação com atenção.<br>2. Registre os conceitos e fórmulas importantes.<br>3. Faça exercícios sem consultar a resposta imediatamente.</p></div><div style="display:flex;justify-content:flex-end;gap:9px;margin-top:20px"><button class="secondary-btn" data-action="close-modal">Fechar</button><button class="primary-btn" data-complete-lesson="${key}">${isDone ? '✓ Aula concluída' : 'Marcar como concluída'}</button></div></div>`;
  layer.classList.add('open'); layer.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  const layer = document.getElementById('modalLayer');
  layer.classList.remove('open'); layer.setAttribute('aria-hidden', 'true'); layer.innerHTML = '';
}
function beginQuiz() {
  const subject = document.getElementById('quizSubject')?.value || 'Todas';
  const amountValue = document.getElementById('quizAmount')?.value || '5';
  let pool = subject === 'Todas' ? [...questions] : questions.filter(q => q.subject === subject);
  if (!pool.length) { showToast('Ainda não há questões cadastradas para esta matéria.'); return; }
  pool = pool.sort(() => Math.random() - .5);
  const amount = amountValue === 'all' ? pool.length : Math.min(Number(amountValue), pool.length);
  quiz = { items: pool.slice(0, amount), index: 0, answers: {}, correct: 0, started: true, finished: false };
  render();
}
function answerQuestion(index) {
  if (!quiz || quiz.answers[quiz.index] !== undefined) return;
  const q = quiz.items[quiz.index];
  quiz.answers[quiz.index] = index;
  const correct = index === q.answer;
  if (correct) quiz.correct++;
  state.attempts.push({ questionId: q.id, subject: q.subject, correct, date: new Date().toISOString() });
  saveState();
  render();
}
function nextQuestion() {
  if (quiz.index < quiz.items.length - 1) { quiz.index++; render(); }
  else { quiz.finished = true; render(); }
}
function finishQuiz() { quiz.finished = true; render(); }
function startNewQuiz() { quiz = null; render(); }
function flashMove(delta) { flashIndex = (flashIndex + delta + flashcards.length) % flashcards.length; flashFlipped = false; render(); }
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarScrim').classList.remove('show');
}
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarScrim').classList.toggle('show');
}
function searchSite(term) {
  const query = term.trim().toLocaleLowerCase('pt-BR');
  if (!query) return;
  const found = subjects.find(s => s.name.toLocaleLowerCase('pt-BR').includes(query) || s.lessons.some(l => l.toLocaleLowerCase('pt-BR').includes(query)));
  if (found) {
    currentView = 'courses'; currentCourseId = found.id;
    document.getElementById('pageLabel').textContent = 'Meus cursos';
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === 'courses'));
    render();
  } else {
    const q = questions.find(q => q.subject.toLocaleLowerCase('pt-BR').includes(query) || q.topic.toLocaleLowerCase('pt-BR').includes(query));
    if (q) { setView('questions'); showToast(`Encontre questões de ${q.subject} no banco de questões.`); }
    else showToast('Não encontramos esse conteúdo. Tente buscar pelo nome de uma matéria.');
  }
}

// Eventos globais — delegação permite atualizar as telas sem perder interações.
document.addEventListener('click', event => {
  const nav = event.target.closest('[data-view]');
  if (nav) { setView(nav.dataset.view); return; }
  const course = event.target.closest('[data-course]');
  if (course) { currentCourseId = course.dataset.course; currentView = 'courses'; document.getElementById('pageLabel').textContent = 'Meus cursos'; document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === 'courses')); render(); return; }
  const filter = event.target.closest('[data-filter]');
  if (filter) { activeSubjectFilter = filter.dataset.filter; render(); return; }
  const lesson = event.target.closest('[data-lesson]');
  if (lesson) { openLesson(lesson.dataset.lesson); return; }
  const complete = event.target.closest('[data-complete-lesson]');
  if (complete) {
    const key = complete.dataset.completeLesson;
    if (!state.completedLessons.includes(key)) { state.completedLessons.push(key); state.studyMinutes = Math.min(120, state.studyMinutes + 15); const weekdayIndex = (new Date().getDay() + 6) % 7; state.weeklyMinutes[weekdayIndex] += 15; saveState(); showToast('Aula concluída! Seu progresso foi atualizado.'); }
    closeModal(); render(); return;
  }
  const answer = event.target.closest('[data-answer]');
  if (answer) { answerQuestion(Number(answer.dataset.answer)); return; }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action) {
    if (action === 'go-questions') setView('questions');
    if (action === 'go-courses') setView('courses');
    if (action === 'go-performance') setView('performance');
    if (action === 'back-courses') { currentCourseId = null; render(); }
    if (action === 'close-modal') closeModal();
    if (action === 'exit-quiz') { quiz = null; render(); }
    if (action === 'flash-prev') flashMove(-1);
    if (action === 'flash-next') flashMove(1);
    if (action === 'flash-flip') { flashFlipped = !flashFlipped; render(); }
    if (action === 'flash-known') { if (!state.knownCards.includes(flashIndex)) { state.knownCards.push(flashIndex); saveState(); showToast('Flashcard marcado como aprendido!'); } else { showToast('Este cartão já está na sua lista de dominados.'); } render(); }
    return;
  }
  if (event.target.closest('#startQuiz')) { beginQuiz(); return; }
  if (event.target.closest('#nextQuestion')) { nextQuestion(); return; }
  if (event.target.closest('#restartQuiz')) { startNewQuiz(); return; }
  if (event.target.closest('#flashcard')) { flashFlipped = !flashFlipped; render(); return; }
  const deleteTask = event.target.closest('[data-task-delete]');
  if (deleteTask) { state.tasks = state.tasks.filter(t => t.id !== Number(deleteTask.dataset.taskDelete)); saveState(); render(); showToast('Tarefa removida.'); return; }
});

document.addEventListener('change', event => {
  const checkbox = event.target.closest('[data-task-check]');
  if (checkbox) {
    const task = state.tasks.find(t => t.id === Number(checkbox.dataset.taskCheck));
    if (task) { task.done = checkbox.checked; saveState(); render(); }
  }
});

document.addEventListener('submit', event => {
  if (event.target.id === 'taskForm') {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    const category = document.getElementById('taskCategory').value;
    if (!title) return;
    state.tasks.push({ id: Date.now(), title, category, done: false });
    saveState(); render(); showToast('Tarefa adicionada ao seu cronograma.');
  }
});

document.getElementById('menuToggle').addEventListener('click', toggleSidebar);
document.getElementById('sidebarClose').addEventListener('click', closeSidebar);
document.getElementById('sidebarScrim').addEventListener('click', closeSidebar);
document.getElementById('themeToggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.body.classList.toggle('light-theme', state.theme === 'light');
  saveState();
});
document.getElementById('globalSearch').addEventListener('keydown', event => { if (event.key === 'Enter') { searchSite(event.target.value); event.target.blur(); } });
document.getElementById('profileButton').addEventListener('click', () => showToast('Perfil demonstrativo: Aluno Atomi.'));
document.getElementById('topAvatar').addEventListener('click', () => showToast('Perfil demonstrativo: Aluno Atomi.'));
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.getElementById('globalSearch').focus(); }
  if (event.key === 'Escape') { closeModal(); closeSidebar(); }
  if (currentView === 'flashcards' && (event.key === ' ' || event.key === 'Enter') && event.target.id === 'flashcard') { event.preventDefault(); flashFlipped = !flashFlipped; render(); }
});

// Inicialização
if (state.theme === 'light') document.body.classList.add('light-theme');
render();
