"use strict";

(() => {
  const CATEGORIES = [
    {
      id: "core",
      title: "Java Core",
      icon: "{ }",
      accent: "#f4b860",
      description: "Строки, исключения, ООП, Optional и современный синтаксис Java."
    },
    {
      id: "collections",
      title: "Коллекции и Generics",
      icon: "[ ]",
      accent: "#82c7ff",
      description: "HashMap, конкурентные коллекции, type erasure, PECS и wildcard."
    },
    {
      id: "concurrency",
      title: "Многопоточность",
      icon: "⇄",
      accent: "#ff8b8b",
      description: "JMM, блокировки, пулы потоков, CompletableFuture и virtual threads."
    },
    {
      id: "jvm",
      title: "JVM и GC",
      icon: "⚙",
      accent: "#b9a0ff",
      description: "Память, classloading, сборка мусора, JIT и диагностика production."
    },
    {
      id: "sql",
      title: "SQL и базы данных",
      icon: "▤",
      accent: "#7eacff",
      description: "Индексы, транзакции, изоляция, MVCC, планы запросов и оптимизация."
    },
    {
      id: "jpa",
      title: "JPA и Hibernate",
      icon: "◈",
      accent: "#55d7ad",
      description: "Persistence context, N+1, fetch-стратегии, блокировки и миграции."
    },
    {
      id: "spring",
      title: "Spring Framework",
      icon: "❋",
      accent: "#c3e85f",
      description: "DI, AOP, транзакции, MVC, Security, Boot и интеграционные тесты."
    },
    {
      id: "kafka",
      title: "Apache Kafka",
      icon: "⇶",
      accent: "#ff8fb2",
      description: "Партиции, гарантии доставки, rebalance, exactly-once и Streams."
    },
    {
      id: "architecture",
      title: "Архитектура и DevOps",
      icon: "⌘",
      accent: "#70dfd3",
      description: "REST, отказоустойчивость, тесты, Docker, Kubernetes и CI/CD."
    }
  ];

  const LEGEND_CATEGORIES = [
    {
      id: "legend-architecture",
      title: "Легенда и архитектура",
      icon: "◫",
      accent: "#f4b860",
      description: "Проект, сервисы, State Machine + Choreography и почему не Camunda."
    },
    {
      id: "legend-payment-flow",
      title: "Payment flow и State Machine",
      icon: "⇢",
      accent: "#ffd166",
      description: "Полная цепочка, статусы, переходы, комиссия и webhook."
    },
    {
      id: "legend-outbox",
      title: "Outbox и идемпотентность",
      icon: "⇄",
      accent: "#62d99b",
      description: "Dual-write, relay, Redis SET NX, unique constraints и инцидент с комиссиями."
    },
    {
      id: "legend-kafka",
      title: "Kafka в проекте",
      icon: "⇶",
      accent: "#ff8fb2",
      description: "Топики, acks, manual commit, read_committed, партиции и consumer lag."
    },
    {
      id: "legend-resilience",
      title: "Отказоустойчивость и инциденты",
      icon: "◈",
      accent: "#ff8b8b",
      description: "Падения сервисов, retry/fallback, PENDING и разбор четырёх инцидентов."
    },
    {
      id: "legend-observability",
      title: "Мониторинг и эксплуатация",
      icon: "⌁",
      accent: "#82c7ff",
      description: "Grafana/Prometheus, cardinality, метрики, Hikari и Redis."
    },
    {
      id: "legend-extra-java",
      title: "Дополнительно: Java и Spring",
      icon: "{ }",
      accent: "#b9a0ff",
      description: "Транзакции, JPA, пулы, Java 21, тесты, безопасность и webhook."
    },
    {
      id: "legend-extra-system",
      title: "Дополнительно: System Design",
      icon: "⌘",
      accent: "#70dfd3",
      description: "Saga, 2PC, Kafka, БД, кэш, SLO, deployment и reconciliation."
    }
  ];

  const CATEGORY_BY_ID = new Map(CATEGORIES.map((category) => [category.id, category]));
  const LEGEND_CATEGORY_BY_ID = new Map(LEGEND_CATEGORIES.map((category) => [category.id, category]));
  const TRACK_CATEGORIES = { base: CATEGORIES, legend: LEGEND_CATEGORIES };
  const TRACK_CATEGORY_BY_ID = { base: CATEGORY_BY_ID, legend: LEGEND_CATEGORY_BY_ID };
  const LEVEL_LABELS = {
    middle: "Разминка",
    senior: "Senior",
    expert: "Expert"
  };
  const LETTERS = ["A", "B", "C", "D"];
  const STORAGE_KEYS = {
    progress: "javatorty.progress.v1",
    meta: "javatorty.meta.v1",
    bookmarks: "javatorty.bookmarks.v1",
    settings: "javatorty.settings.v1"
  };

  const QUESTIONS = (Array.isArray(window.JavaToryData) ? window.JavaToryData : [])
    .filter((question) => question && Array.isArray(question.options) && question.options.length === 4)
    .slice();

  const LEGEND_QUESTIONS = (Array.isArray(window.JavaToryLegendData) ? window.JavaToryLegendData : [])
    .filter((question) => question && Array.isArray(question.options) && question.options.length === 4)
    .slice();

  const TRACK_QUESTIONS = { base: QUESTIONS, legend: LEGEND_QUESTIONS };
  const ALL_QUESTION_BY_ID = new Map(
    [...QUESTIONS, ...LEGEND_QUESTIONS].map((question) => [question.id, question])
  );
  const storedBookmarks = loadJSON(STORAGE_KEYS.bookmarks, []);

  const state = {
    view: "home",
    progress: loadJSON(STORAGE_KEYS.progress, {}),
    meta: loadJSON(STORAGE_KEYS.meta, { currentStreak: 0, bestStreak: 0 }),
    bookmarks: new Set(Array.isArray(storedBookmarks) ? storedBookmarks : []),
    settings: loadJSON(STORAGE_KEYS.settings, { difficulty: "all", limit: 20, legendLimit: 0 }),
    session: null,
    lastResult: null
  };

  if (!state.progress || typeof state.progress !== "object" || Array.isArray(state.progress)) {
    state.progress = {};
  }
  if (!state.meta || typeof state.meta !== "object") {
    state.meta = { currentStreak: 0, bestStreak: 0 };
  }
  state.meta.currentStreak = Number(state.meta.currentStreak) || 0;
  state.meta.bestStreak = Number(state.meta.bestStreak) || 0;
  if (!["all", "middle", "senior", "expert"].includes(state.settings?.difficulty)) {
    state.settings = { ...state.settings, difficulty: "all" };
  }
  if (![0, 20, 30, 50].includes(Number(state.settings?.limit))) {
    state.settings = { ...state.settings, limit: 20 };
  }
  if (![0, 30, 50, 100].includes(Number(state.settings?.legendLimit))) {
    state.settings = { ...state.settings, legendLimit: 0 };
  }
  state.settings.limit = Number(state.settings.limit);
  state.settings.legendLimit = Number(state.settings.legendLimit);
  state.bookmarks = new Set(
    [...state.bookmarks].filter((id) => ALL_QUESTION_BY_ID.has(id))
  );

  const els = {};

  function byId(id) {
    return document.getElementById(id);
  }

  function cacheElements() {
    [
      "home-view", "legend-view", "quiz-view", "result-view", "brand-home", "reset-progress",
      "header-answered", "header-total", "stat-answered", "stat-accuracy",
      "stat-streak", "stat-bookmarks", "bookmarks-count", "start-mix",
      "start-bookmarks", "start-mistakes", "start-bookmarks-2", "mix-meta",
      "mistakes-hint", "bookmarks-hint", "difficulty-filter", "limit-filter",
      "category-grid", "open-legend", "legend-back", "legend-start", "legend-start-label",
      "legend-mistakes", "legend-mistakes-count", "legend-limit", "legend-start-meta",
      "legend-stat-answered", "legend-stat-accuracy", "legend-stat-mistakes",
      "legend-stat-bookmarks", "legend-category-grid", "legend-banner-fill",
      "legend-banner-progress", "legend-banner-bar",
      "quiz-session-title", "quiz-score", "quiz-progress",
      "quiz-progress-fill", "quiz-progress-label", "q-category", "q-level",
      "bookmark-btn", "q-code-wrap", "q-code", "question-text", "options",
      "feedback", "prev-btn", "next-btn", "next-label", "quit-quiz",
      "question-map", "side-count", "result-ring", "result-percent",
      "result-title", "result-subtitle", "result-stats", "result-categories",
      "result-mistakes", "result-mistakes-count", "result-repeat-mistakes",
      "result-new-mix", "result-home", "toast"
    ].forEach((id) => {
      els[id] = byId(id);
    });
  }

  function loadJSON(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // The trainer remains usable if storage is unavailable.
    }
  }

  function saveProgress() {
    saveJSON(STORAGE_KEYS.progress, state.progress);
    saveJSON(STORAGE_KEYS.meta, state.meta);
  }

  function saveBookmarks() {
    saveJSON(STORAGE_KEYS.bookmarks, [...state.bookmarks]);
  }

  function saveSettings() {
    saveJSON(STORAGE_KEYS.settings, state.settings);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function richText(value) {
    return escapeHtml(value)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>");
  }

  function plural(number, one, few, many) {
    const mod10 = number % 10;
    const mod100 = number % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function questionWord(number) {
    return plural(number, "вопрос", "вопроса", "вопросов");
  }

  function percent(part, total) {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  }

  function shuffle(items) {
    const result = items.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  }

  function formatDuration(milliseconds) {
    const totalSeconds = Math.max(0, Math.round(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function tint(hex, alpha) {
    const value = hex.replace("#", "");
    const number = Number.parseInt(value, 16);
    const red = (number >> 16) & 255;
    const green = (number >> 8) & 255;
    const blue = number & 255;
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  function levelMatches(question) {
    return state.settings.difficulty === "all" || question.level === state.settings.difficulty;
  }

  function trackForView() {
    if (state.view === "legend") return "legend";
    if (state.view === "quiz" && state.session?.track === "legend") return "legend";
    if (state.view === "result" && state.lastResult?.track === "legend") return "legend";
    return "base";
  }

  function poolFor(mode, options = {}) {
    const track = options.track === "legend" ? "legend" : "base";
    const bank = TRACK_QUESTIONS[track];
    let pool;

    if (Array.isArray(options.ids) && options.ids.length > 0) {
      const ids = new Set(options.ids);
      pool = bank.filter((question) => ids.has(question.id));
    } else if (mode === "category") {
      pool = bank.filter((question) => question.category === options.categoryId);
    } else if (mode === "mistakes") {
      pool = bank.filter((question) => {
        const progress = state.progress[question.id];
        return progress && progress.lastCorrect === false;
      });
    } else if (mode === "bookmarks") {
      pool = bank.filter((question) => state.bookmarks.has(question.id));
    } else {
      pool = bank.slice();
    }

    if (track === "base" && !Array.isArray(options.ids)) {
      pool = pool.filter(levelMatches);
    }
    return pool;
  }

  function sessionQuestions(mode, options = {}) {
    const track = options.track === "legend" ? "legend" : "base";
    const pool = shuffle(poolFor(mode, options));
    const configured = track === "legend"
      ? Number(state.settings.legendLimit)
      : Number(state.settings.limit);
    return configured > 0 ? pool.slice(0, configured) : pool;
  }

  function countMistakes(questions = QUESTIONS) {
    return questions.reduce((count, question) => {
      const progress = state.progress[question.id];
      return progress && progress.lastCorrect === false ? count + 1 : count;
    }, 0);
  }

  function answeredCount(questions = QUESTIONS) {
    return questions.reduce((count, question) => (
      state.progress[question.id] ? count + 1 : count
    ), 0);
  }

  function accuracy(questions = QUESTIONS) {
    const ids = new Set(questions.map((question) => question.id));
    let attempts = 0;
    let correct = 0;
    Object.entries(state.progress).forEach(([id, entry]) => {
      if (!ids.has(id) || !entry || typeof entry !== "object") return;
      attempts += Number(entry.attempts) || 0;
      correct += Number(entry.correct) || 0;
    });
    return { attempts, correct, value: percent(correct, attempts) };
  }

  function bookmarkedQuestions(questions) {
    return questions.filter((question) => state.bookmarks.has(question.id));
  }

  function updateHeader() {
    const activeBank = TRACK_QUESTIONS[trackForView()];
    const studied = answeredCount(activeBank);
    if (els["header-answered"]) els["header-answered"].textContent = String(studied);
    if (els["header-total"]) els["header-total"].textContent = String(activeBank.length);
    if (els["stat-answered"]) els["stat-answered"].textContent = String(answeredCount(QUESTIONS));
    if (els["stat-accuracy"]) {
      const value = accuracy(QUESTIONS);
      els["stat-accuracy"].textContent = value.attempts > 0 ? `${value.value}%` : "—";
    }
    if (els["stat-streak"]) els["stat-streak"].textContent = String(state.meta.bestStreak || 0);
    if (els["stat-bookmarks"]) {
      els["stat-bookmarks"].textContent = String(bookmarkedQuestions(QUESTIONS).length);
    }
  }

  function updateTotalLabels() {
    document.querySelectorAll("[data-total]").forEach((element) => {
      element.textContent = String(QUESTIONS.length);
    });
    document.querySelectorAll("[data-legend-total]").forEach((element) => {
      element.textContent = String(LEGEND_QUESTIONS.length);
    });
  }

  function renderHome() {
    updateHeader();
    updateTotalLabels();

    if (els["difficulty-filter"]) els["difficulty-filter"].value = state.settings.difficulty;
    if (els["limit-filter"]) els["limit-filter"].value = String(state.settings.limit);

    renderCategoryGrid();

    const mistakes = countMistakes(QUESTIONS);
    const baseBookmarks = bookmarkedQuestions(QUESTIONS).length;
    if (els["mistakes-hint"]) {
      els["mistakes-hint"].textContent = mistakes > 0
        ? `${mistakes} ${questionWord(mistakes)} ждёт разбора`
        : "Пока нет ошибок — отличный старт";
    }
    if (els["bookmarks-hint"]) {
      els["bookmarks-hint"].textContent = baseBookmarks > 0
        ? `${baseBookmarks} ${questionWord(baseBookmarks)} сохранено`
        : "Отмечайте вопросы звёздочкой во время теста";
    }
    if (els["start-mistakes"]) els["start-mistakes"].disabled = mistakes === 0;
    if (els["start-bookmarks"]) els["start-bookmarks"].disabled = baseBookmarks === 0;
    if (els["start-bookmarks-2"]) els["start-bookmarks-2"].disabled = baseBookmarks === 0;
    if (els["bookmarks-count"]) els["bookmarks-count"].textContent = String(baseBookmarks);

    const available = poolFor("mix").length;
    const limit = Number(state.settings.limit);
    const planned = limit > 0 ? Math.min(limit, available) : available;
    if (els["mix-meta"]) {
      els["mix-meta"].textContent = available > 0
        ? `${planned} ${questionWord(planned)} · все темы · случайный порядок`
        : "Для выбранного уровня пока нет вопросов";
    }
    if (els["start-mix"]) els["start-mix"].disabled = available === 0;

    renderLegendBanner();
  }

  function renderLegendBanner() {
    const studied = answeredCount(LEGEND_QUESTIONS);
    const coverage = percent(studied, LEGEND_QUESTIONS.length);
    if (els["legend-banner-fill"]) els["legend-banner-fill"].style.width = `${coverage}%`;
    if (els["legend-banner-progress"]) els["legend-banner-progress"].textContent = `${coverage}%`;
    if (els["legend-banner-bar"]) els["legend-banner-bar"].setAttribute("aria-valuenow", String(coverage));
    if (els["open-legend"]) els["open-legend"].disabled = LEGEND_QUESTIONS.length === 0;
  }

  function categoryCardMarkup(category, questions, dataAttribute) {
    const studied = questions.filter((question) => state.progress[question.id]).length;
    const coverage = percent(studied, questions.length);
    return `
      <button class="category-card" type="button" ${dataAttribute}="${category.id}"
        style="--accent: ${category.accent}"
        aria-label="${escapeHtml(category.title)}: ${questions.length} ${questionWord(questions.length)}, изучено ${coverage}%">
        <span class="cat-top">
          <span class="cat-icon" aria-hidden="true">${category.icon}</span>
          <span class="cat-start" aria-hidden="true">→</span>
        </span>
        <span class="cat-name">${escapeHtml(category.title)}</span>
        <span class="cat-desc">${escapeHtml(category.description)}</span>
        <span class="cat-meta">
          <span>${questions.length} ${questionWord(questions.length)}</span>
          <b>${studied > 0 ? `${coverage}%` : "—"}</b>
        </span>
        <span class="cat-progress" aria-hidden="true"><i style="width: ${coverage}%"></i></span>
      </button>
    `;
  }

  function renderCategoryGrid() {
    if (!els["category-grid"]) return;
    els["category-grid"].innerHTML = CATEGORIES.map((category) => {
      const questions = QUESTIONS.filter((question) => question.category === category.id);
      return categoryCardMarkup(category, questions, "data-category");
    }).join("");
  }

  function renderLegend() {
    if (LEGEND_QUESTIONS.length === 0) return;

    const studied = answeredCount(LEGEND_QUESTIONS);
    const legendAccuracy = accuracy(LEGEND_QUESTIONS);
    const mistakes = countMistakes(LEGEND_QUESTIONS);
    const bookmarks = bookmarkedQuestions(LEGEND_QUESTIONS).length;
    const configured = Number(state.settings.legendLimit);
    const planned = configured > 0 ? Math.min(configured, LEGEND_QUESTIONS.length) : LEGEND_QUESTIONS.length;

    updateTotalLabels();
    if (els["legend-stat-answered"]) els["legend-stat-answered"].textContent = String(studied);
    if (els["legend-stat-accuracy"]) {
      els["legend-stat-accuracy"].textContent = legendAccuracy.attempts > 0
        ? `${legendAccuracy.value}%`
        : "—";
    }
    if (els["legend-stat-mistakes"]) els["legend-stat-mistakes"].textContent = String(mistakes);
    if (els["legend-stat-bookmarks"]) els["legend-stat-bookmarks"].textContent = String(bookmarks);
    if (els["legend-mistakes-count"]) els["legend-mistakes-count"].textContent = String(mistakes);
    if (els["legend-mistakes"]) els["legend-mistakes"].disabled = mistakes === 0;
    if (els["legend-limit"]) els["legend-limit"].value = String(configured);
    if (els["legend-start-label"]) {
      els["legend-start-label"].textContent = planned === LEGEND_QUESTIONS.length
        ? "Начать весь тест"
        : `Начать тест (${planned})`;
    }
    if (els["legend-start-meta"]) {
      els["legend-start-meta"].textContent = `${planned} ${questionWord(planned)} · ${planned === LEGEND_QUESTIONS.length ? "весь трек" : "случайная выборка"}`;
    }
    if (els["legend-start"]) els["legend-start"].disabled = LEGEND_QUESTIONS.length === 0;

    if (els["legend-category-grid"]) {
      els["legend-category-grid"].innerHTML = LEGEND_CATEGORIES.map((category) => {
        const questions = LEGEND_QUESTIONS.filter((question) => question.category === category.id);
        return categoryCardMarkup(category, questions, "data-legend-category");
      }).join("");
    }

    updateHeader();
  }

  function showView(name) {
    state.view = name;
    document.body.dataset.view = name;
    ["home", "legend", "quiz", "result"].forEach((view) => {
      const element = els[`${view}-view`];
      if (element) element.hidden = view !== name;
    });
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function openLegend() {
    state.session = null;
    showView("legend");
    renderLegend();
  }

  function startSession(mode, options = {}) {
    const track = options.track === "legend" ? "legend" : "base";
    const questions = sessionQuestions(mode, { ...options, track });
    if (questions.length === 0) {
      if (mode === "mistakes") {
        toast(track === "legend" ? "Ошибок по легенде пока нет" : "Ошибок для выбранного уровня пока нет");
      } else if (mode === "bookmarks") {
        toast("В закладках пока нет вопросов для выбранного уровня");
      } else {
        toast("Для выбранного фильтра нет вопросов");
      }
      return;
    }

    let title = options.title || (track === "legend" ? "Легенда" : "Микс");
    if (mode === "category") {
      title = TRACK_CATEGORY_BY_ID[track].get(options.categoryId)?.title || "Категория";
    } else if (mode === "mistakes" && !options.title) {
      title = track === "legend" ? "Ошибки по легенде" : "Работа над ошибками";
    } else if (mode === "bookmarks" && !options.title) {
      title = "Закладки";
    } else if (mode === "mix" && !options.title) {
      title = track === "legend" ? "Легенда · весь тест" : "Микс · все темы";
    }

    state.session = {
      questions,
      index: 0,
      answers: new Map(),
      startedAt: Date.now(),
      mode,
      categoryId: options.categoryId || null,
      track,
      title
    };
    state.lastResult = null;
    showView("quiz");
    renderQuiz();
  }

  function currentQuestion() {
    if (!state.session) return null;
    return state.session.questions[state.session.index] || null;
  }

  function currentAnswer(question) {
    return state.session?.answers.get(question.id) || null;
  }

  function renderQuiz() {
    const session = state.session;
    const question = currentQuestion();
    if (!session || !question) return;

    const category = TRACK_CATEGORY_BY_ID[session.track || "base"].get(question.category) || {
      title: question.category,
      accent: "#d8ff72"
    };
    const existing = currentAnswer(question);
    const total = session.questions.length;
    const shownNumber = session.index + 1;
    const correctCount = [...session.answers.values()].filter((answer) => answer.correct).length;
    const answered = session.answers.size;

    els["quiz-session-title"].textContent = `${session.title} · ${total} ${questionWord(total)}`;
    els["quiz-score"].textContent = `✓ ${correctCount} верно · ${answered}/${total}`;

    const progress = percent(shownNumber, total);
    els["quiz-progress-fill"].style.width = `${progress}%`;
    els["quiz-progress"].setAttribute("aria-valuenow", String(progress));
    els["quiz-progress-label"].textContent = `Вопрос ${shownNumber} из ${total}`;

    els["q-category"].textContent = category.title;
    els["q-category"].style.color = category.accent;
    els["q-category"].style.background = tint(category.accent, 0.1);
    els["q-category"].style.borderColor = tint(category.accent, 0.2);

    els["q-level"].textContent = LEVEL_LABELS[question.level] || question.level;
    els["q-level"].style.color = question.level === "expert"
      ? "#f4b860"
      : question.level === "middle" ? "#82c7ff" : "#9fbe78";

    updateBookmarkButton(question);

    if (question.code) {
      els["q-code-wrap"].hidden = false;
      els["q-code"].textContent = question.code;
    } else {
      els["q-code-wrap"].hidden = true;
      els["q-code"].textContent = "";
    }

    els["question-text"].innerHTML = richText(question.q);

    els["options"].innerHTML = "";
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.dataset.index = String(index);
      button.innerHTML = `
        <span class="opt-letter" aria-hidden="true">${LETTERS[index]}</span>
        <span class="opt-text">${richText(option)}</span>
        <span class="opt-mark" aria-hidden="true"></span>
      `;

      if (existing) {
        button.disabled = true;
        if (index === question.answer) {
          button.classList.add("is-correct");
          button.querySelector(".opt-mark").textContent = "✓";
        } else if (index === existing.selected) {
          button.classList.add("is-wrong");
          button.querySelector(".opt-mark").textContent = "✕";
        } else {
          button.classList.add("is-muted");
        }
      } else {
        button.addEventListener("click", () => handleAnswer(index));
      }

      els["options"].appendChild(button);
    });

    if (existing) {
      renderFeedback(question, existing);
    } else {
      els["feedback"].hidden = true;
      els["feedback"].className = "feedback";
      els["feedback"].innerHTML = "";
    }

    els["prev-btn"].disabled = session.index === 0;
    els["next-btn"].disabled = !existing;
    els["next-label"].textContent = !existing
      ? "Выберите ответ"
      : session.index === total - 1 ? "Показать результат" : "Следующий";

    renderMap();
  }

  function renderFeedback(question, answer) {
    const correctLetter = LETTERS[question.answer];
    const selectedLetter = LETTERS[answer.selected];
    const correctText = richText(question.options[question.answer]);
    const intro = answer.correct
      ? `Правильный ответ: <b>${correctLetter}</b> — ${correctText}`
      : `Вы выбрали <b>${selectedLetter}</b>. Правильный ответ: <b>${correctLetter}</b> — ${correctText}`;

    els["feedback"].className = `feedback ${answer.correct ? "is-correct" : "is-wrong"}`;
    els["feedback"].innerHTML = `
      <div class="feedback-head">
        <span class="feedback-icon" aria-hidden="true">${answer.correct ? "✓" : "!"}</span>
        <span>${answer.correct ? "Верно!" : "Неверно"}</span>
      </div>
      <p class="correct-answer">${intro}</p>
      <p class="explain">${richText(question.explain)}</p>
    `;
    els["feedback"].hidden = false;
  }

  function renderMap() {
    const session = state.session;
    if (!session) return;

    els["question-map"].innerHTML = session.questions.map((question, index) => {
      const answer = session.answers.get(question.id);
      const classes = ["map-dot"];
      if (index === session.index) classes.push("is-current");
      if (answer) classes.push(answer.correct ? "is-correct" : "is-wrong");
      const status = answer ? (answer.correct ? ", верно" : ", ошибка") : "";
      return `
        <button class="${classes.join(" ")}" type="button" data-index="${index}"
          aria-label="Вопрос ${index + 1}${status}" aria-current="${index === session.index ? "step" : "false"}">
          ${index + 1}
        </button>
      `;
    }).join("");

    els["side-count"].textContent = `${session.answers.size} / ${session.questions.length}`;

    const currentDot = els["question-map"].querySelector(".is-current");
    if (currentDot) {
      const map = els["question-map"];
      const mapRect = map.getBoundingClientRect();
      const dotRect = currentDot.getBoundingClientRect();
      const target = map.scrollTop + (dotRect.top - mapRect.top)
        - ((map.clientHeight - dotRect.height) / 2);
      map.scrollTop = Math.max(0, target);
    }
  }

  function handleAnswer(index) {
    const session = state.session;
    const question = currentQuestion();
    if (!session || !question) return;
    if (!Number.isInteger(index) || index < 0 || index >= question.options.length) return;
    if (session.answers.has(question.id)) return;

    const correct = index === question.answer;
    session.answers.set(question.id, { selected: index, correct });

    const oldProgress = state.progress[question.id] || {};
    state.progress[question.id] = {
      attempts: (Number(oldProgress.attempts) || 0) + 1,
      correct: (Number(oldProgress.correct) || 0) + (correct ? 1 : 0),
      lastCorrect: correct,
      selected: index,
      updatedAt: Date.now()
    };

    state.meta.currentStreak = correct ? (Number(state.meta.currentStreak) || 0) + 1 : 0;
    state.meta.bestStreak = Math.max(Number(state.meta.bestStreak) || 0, state.meta.currentStreak);

    saveProgress();
    updateHeader();
    renderQuiz();

    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      els["feedback"].scrollIntoView({
        block: "nearest",
        behavior: reduceMotion ? "auto" : "smooth"
      });
      if (!els["next-btn"].disabled) {
        els["next-btn"].focus({ preventScroll: true });
      }
    });
  }

  function nextQuestion() {
    const session = state.session;
    if (!session) return;
    const question = currentQuestion();
    if (!question || !session.answers.has(question.id)) return;

    if (session.index === session.questions.length - 1) {
      finishSession();
      return;
    }

    session.index += 1;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function previousQuestion() {
    const session = state.session;
    if (!session || session.index === 0) return;
    session.index -= 1;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function goToQuestion(index) {
    const session = state.session;
    if (!session || !Number.isInteger(index) || index < 0 || index >= session.questions.length) return;
    session.index = index;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function updateBookmarkButton(question) {
    const marked = state.bookmarks.has(question.id);
    els["bookmark-btn"].classList.toggle("is-active", marked);
    els["bookmark-btn"].textContent = marked ? "★" : "☆";
    els["bookmark-btn"].setAttribute("aria-pressed", String(marked));
    els["bookmark-btn"].setAttribute(
      "aria-label",
      marked ? "Убрать вопрос из закладок" : "Добавить вопрос в закладки"
    );
  }

  function toggleBookmark() {
    const question = currentQuestion();
    if (!question) return;
    if (state.bookmarks.has(question.id)) {
      state.bookmarks.delete(question.id);
      toast("Вопрос убран из закладок");
    } else {
      state.bookmarks.add(question.id);
      toast("Вопрос добавлен в закладки");
    }
    saveBookmarks();
    updateBookmarkButton(question);
    updateHeader();
  }

  function finishSession() {
    const session = state.session;
    if (!session) return;

    let correct = 0;
    let wrong = 0;
    session.questions.forEach((question) => {
      const answer = session.answers.get(question.id);
      if (!answer) return;
      if (answer.correct) correct += 1;
      else wrong += 1;
    });

    if (correct + wrong === 0) {
      toast("Ответьте хотя бы на один вопрос");
      return;
    }

    const total = session.questions.length;
    state.lastResult = {
      correct,
      wrong,
      answered: correct + wrong,
      total,
      percentage: percent(correct, total),
      duration: Date.now() - session.startedAt,
      title: session.title,
      track: session.track || "base",
      questions: session.questions.slice(),
      answers: new Map(session.answers)
    };

    renderResult();
    showView("result");
  }

  function renderResult() {
    const result = state.lastResult;
    if (!result) return;

    els["result-ring"].style.setProperty("--value", String(result.percentage));
    els["result-percent"].textContent = `${result.percentage}%`;

    let title = "Отличный старт для разбора.";
    if (result.percentage === 100) title = "Идеально. Без единой ошибки.";
    else if (result.percentage >= 90) title = "Senior-режим включён.";
    else if (result.percentage >= 75) title = "Крепкий результат.";
    else if (result.percentage >= 55) title = "База есть, есть что усилить.";

    els["result-title"].textContent = title;
    els["result-subtitle"].textContent = result.wrong === 0
      ? `Вы верно ответили на все ${result.total} ${questionWord(result.total)}. Следующий шаг — другая тема или новый микс.`
      : `Вы верно ответили на ${result.correct} из ${result.total} (${result.percentage}%). Все ошибки сохранены — их можно разобрать ниже или запустить отдельную сессию.`;

    els["result-stats"].innerHTML = `
      <div class="result-stat is-correct"><strong>${result.correct}</strong><span>верных ответов</span></div>
      <div class="result-stat is-wrong"><strong>${result.wrong}</strong><span>ошибок</span></div>
      <div class="result-stat"><strong>${result.percentage}%</strong><span>точность сессии</span></div>
      <div class="result-stat"><strong>${formatDuration(result.duration)}</strong><span>время прохождения</span></div>
    `;

    els["result-repeat-mistakes"].disabled = result.wrong === 0;
    els["result-repeat-mistakes"].textContent = result.wrong > 0
      ? `Повторить ошибки (${result.wrong})`
      : "Ошибок нет";
    els["result-new-mix"].textContent = result.track === "legend"
      ? "Новый тест по легенде"
      : "Новый микс";

    renderResultCategories(result);
    renderResultMistakes(result);
  }

  function renderResultCategories(result) {
    const stats = new Map();
    result.questions.forEach((question) => {
      if (!stats.has(question.category)) {
        stats.set(question.category, { total: 0, answered: 0, correct: 0 });
      }
      const entry = stats.get(question.category);
      entry.total += 1;
      const answer = result.answers.get(question.id);
      if (answer) {
        entry.answered += 1;
        if (answer.correct) entry.correct += 1;
      }
    });

    const categories = TRACK_CATEGORIES[result.track || "base"];
    const rows = categories
      .filter((category) => stats.has(category.id))
      .map((category) => {
        const entry = stats.get(category.id);
        const value = percent(entry.correct, entry.answered);
        return `
          <div class="result-category" style="--cat-accent: ${category.accent}">
            <div class="result-category-head">
              <span>${escapeHtml(category.title)}</span>
              <span>${entry.correct} / ${entry.answered}</span>
            </div>
            <div class="result-category-bar"><i style="width: ${value}%"></i></div>
          </div>
        `;
      });

    els["result-categories"].innerHTML = rows.join("") || "<p class=\"review-answer\">Нет данных.</p>";
  }

  function renderResultMistakes(result) {
    const wrongQuestions = result.questions.filter((question) => {
      const answer = result.answers.get(question.id);
      return answer && !answer.correct;
    });

    els["result-mistakes-count"].textContent = wrongQuestions.length > 0
      ? `${wrongQuestions.length} ${questionWord(wrongQuestions.length)}`
      : "чисто";

    if (wrongQuestions.length === 0) {
      els["result-mistakes"].innerHTML = `
        <div class="empty-review">
          <span aria-hidden="true">✓</span>
          <p>В этой сессии нет ошибок. Можно переходить к другой теме.</p>
        </div>
      `;
      return;
    }

    const categoryMap = TRACK_CATEGORY_BY_ID[result.track || "base"];
    els["result-mistakes"].innerHTML = wrongQuestions.map((question) => {
      const answer = result.answers.get(question.id);
      const category = categoryMap.get(question.category);
      return `
        <article class="review-item">
          <div class="review-meta">
            <span class="review-cat">${escapeHtml(category?.title || question.category)}</span>
            <span>·</span>
            <span>${escapeHtml(LEVEL_LABELS[question.level] || question.level)}</span>
          </div>
          <h3>${richText(question.q)}</h3>
          <p class="review-answer is-wrong">Ваш ответ: <b>${LETTERS[answer.selected]}</b> — ${richText(question.options[answer.selected])}</p>
          <p class="review-answer is-correct">Правильно: <b>${LETTERS[question.answer]}</b> — ${richText(question.options[question.answer])}</p>
          <details>
            <summary>Почему так</summary>
            <p>${richText(question.explain)}</p>
          </details>
        </article>
      `;
    }).join("");
  }

  function quitQuiz() {
    const session = state.session;
    if (!session) {
      goHome();
      return;
    }
    if (session.answers.size > 0) {
      const shouldQuit = window.confirm(
        `Выйти из сессии? Отвечено ${session.answers.size} из ${session.questions.length}. Прогресс ответов сохранён, но результат сессии не будет показан.`
      );
      if (!shouldQuit) return;
    }
    if (session.track === "legend") {
      openLegend();
      return;
    }
    state.session = null;
    showView("home");
    renderHome();
  }

  function goHome() {
    state.session = null;
    showView("home");
    renderHome();
  }

  function resetProgress() {
    const shouldReset = window.confirm(
      "Сбросить весь прогресс? Будут удалены история ответов, серия, закладки и настройки сессии. Это действие нельзя отменить."
    );
    if (!shouldReset) return;

    Object.values(STORAGE_KEYS).forEach((key) => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        // Ignore storage access errors.
      }
    });
    state.progress = {};
    state.meta = { currentStreak: 0, bestStreak: 0 };
    state.bookmarks = new Set();
    state.settings = { difficulty: "all", limit: 20, legendLimit: 0 };
    state.session = null;
    state.lastResult = null;
    showView("home");
    renderHome();
    toast("Прогресс сброшен");
  }

  let toastTimer = null;
  function toast(message) {
    if (!els["toast"]) return;
    els["toast"].textContent = message;
    els["toast"].classList.add("is-visible");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      els["toast"].classList.remove("is-visible");
    }, 2600);
  }

  function bindEvents() {
    els["start-mix"].addEventListener("click", () => startSession("mix"));
    els["result-new-mix"].addEventListener("click", () => {
      if (state.lastResult?.track === "legend") {
        startSession("mix", { track: "legend" });
      } else {
        startSession("mix");
      }
    });

    els["start-bookmarks"].addEventListener("click", () => startSession("bookmarks"));
    els["start-bookmarks-2"].addEventListener("click", () => startSession("bookmarks"));
    els["start-mistakes"].addEventListener("click", () => startSession("mistakes"));

    els["open-legend"].addEventListener("click", openLegend);
    els["legend-back"].addEventListener("click", goHome);
    els["legend-start"].addEventListener("click", () => startSession("mix", { track: "legend" }));
    els["legend-mistakes"].addEventListener("click", () => startSession("mistakes", { track: "legend" }));
    els["legend-limit"].addEventListener("change", (event) => {
      state.settings.legendLimit = Number(event.target.value);
      saveSettings();
      renderLegend();
    });
    els["legend-category-grid"].addEventListener("click", (event) => {
      const card = event.target.closest("[data-legend-category]");
      if (!card) return;
      startSession("category", {
        track: "legend",
        categoryId: card.dataset.legendCategory
      });
    });

    els["category-grid"].addEventListener("click", (event) => {
      const card = event.target.closest("[data-category]");
      if (!card) return;
      startSession("category", { categoryId: card.dataset.category });
    });

    els["difficulty-filter"].addEventListener("change", (event) => {
      state.settings.difficulty = event.target.value;
      saveSettings();
      renderHome();
    });

    els["limit-filter"].addEventListener("change", (event) => {
      state.settings.limit = Number(event.target.value);
      saveSettings();
      renderHome();
    });

    els["quit-quiz"].addEventListener("click", quitQuiz);
    els["prev-btn"].addEventListener("click", previousQuestion);
    els["next-btn"].addEventListener("click", nextQuestion);
    els["bookmark-btn"].addEventListener("click", toggleBookmark);

    els["question-map"].addEventListener("click", (event) => {
      const dot = event.target.closest("[data-index]");
      if (!dot) return;
      goToQuestion(Number(dot.dataset.index));
    });

    els["result-repeat-mistakes"].addEventListener("click", () => {
      const wrongIds = state.lastResult
        ? state.lastResult.questions
          .filter((question) => {
            const answer = state.lastResult.answers.get(question.id);
            return answer && !answer.correct;
          })
          .map((question) => question.id)
        : [];
      if (wrongIds.length === 0) {
        toast("Ошибок нет — повторять нечего");
        return;
      }
      const track = state.lastResult?.track === "legend" ? "legend" : "base";
      startSession("mistakes", {
        ids: wrongIds,
        track,
        title: track === "legend" ? "Разбор ошибок по легенде" : "Разбор ошибок сессии"
      });
    });

    els["result-home"].addEventListener("click", goHome);
    els["brand-home"].addEventListener("click", (event) => {
      event.preventDefault();
      if (state.view === "quiz") {
        quitQuiz();
      } else {
        goHome();
      }
    });
    els["reset-progress"].addEventListener("click", resetProgress);

    document.addEventListener("keydown", (event) => {
      if (state.view !== "quiz") return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const tag = event.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

      if (/^[1-4]$/.test(event.key)) {
        event.preventDefault();
        handleAnswer(Number(event.key) - 1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousQuestion();
        return;
      }

      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleBookmark();
        return;
      }

      if (event.key === "Enter") {
        const onButton = event.target.closest && event.target.closest("button");
        if (onButton) return;
        if (!els["next-btn"].disabled) {
          event.preventDefault();
          nextQuestion();
        }
      }
    });
  }

  function init() {
    cacheElements();
    if (QUESTIONS.length === 0) {
      document.body.innerHTML = "<main style=\"padding:40px;font-family:sans-serif\">Не удалось загрузить банк вопросов. Проверьте файлы js/data/*.js.</main>";
      return;
    }
    bindEvents();
    updateTotalLabels();
    renderHome();
    showView("home");
  }

  init();
})();
