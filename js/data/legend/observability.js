/* Легенда: мониторинг, БД и Redis — 26 вопросов */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-obs-001", category: "legend-observability", level: "middle",
    q: "С какой проблемой Grafana столкнулась при нагрузке 500–800 TPS?",
    options: [
      "Dashboard грузился 30+ секунд, метрики отставали, Prometheus падал по OOM",
      "Grafana перестала поддерживать SQL",
      "Kafka удалила все топики",
      "PostgreSQL перешёл в read-only"
    ],
    answer: 0,
    explain: "Инцидент был связан с производительностью мониторинга, а не с платежным flow. Причины — cardinality, частые scrape, тяжёлые запросы и refresh."
  },
  {
    id: "lg-obs-002", category: "legend-observability", level: "middle",
    q: "Насколько отставали метрики в проблемный период?",
    options: ["На 1–2 секунды", "На 10 секунд", "На 2–3 минуты", "На 2–3 часа"],
    answer: 2,
    explain: "Метрики отставали на 2–3 минуты, а алерты приходили с задержкой. Это делало мониторинг непригодным для оперативного реагирования."
  },
  {
    id: "lg-obs-003", category: "legend-observability", level: "senior",
    q: "Почему Prometheus мог падать по OOM?",
    options: [
      "Из-за слишком большого числа Kafka-топиков",
      "Из-за high-cardinality метрик и слишком большого объёма raw series",
      "Из-за отсутствия Grafana",
      "Из-за JWT"
    ],
    answer: 1,
    explain: "Каждая уникальная комбинация labels создаёт отдельную временную серию. paymentId в labels взрывал cardinality и память."
  },
  {
    id: "lg-obs-004", category: "legend-observability", level: "senior",
    q: "Что из перечисленного было причиной проблем Grafana?",
    options: [
      "Слишком редкий scrape",
      "Отсутствие алертов",
      "Слишком маленькие time ranges",
      "Слишком частый scrape и refresh"
    ],
    answer: 3,
    explain: "Частый scrape увеличивает объём данных, частый refresh — нагрузку на dashboard. Оба параметра требуют баланса."
  },
  {
    id: "lg-obs-005", category: "legend-observability", level: "senior",
    q: "Что не относится к причинам деградации мониторинга в легенде?",
    options: [
      "Высокая cardinality labels",
      "Тяжёлые queries в dashboard",
      "Отсутствие CI/CD pipeline",
      "Большие time ranges"
    ],
    answer: 2,
    explain: "Проблема была в метриках и запросах, а не в CI/CD. Большие диапазоны и тяжёлые панели увеличивали время ответа."
  },
  {
    id: "lg-obs-006", category: "legend-observability", level: "senior",
    q: "Почему paymentId в labels был особенно плохим решением?",
    options: [
      "Почти каждое значение уникально, что создаёт огромное число временных серий",
      "paymentId нельзя передать строкой",
      "Он уменьшает retention",
      "Он ломает Kafka"
    ],
    answer: 0,
    explain: "High cardinality приводит к росту памяти, диска и стоимости запросов. Для метрик выбирают ограниченный набор измерений."
  },
  {
    id: "lg-obs-007", category: "legend-observability", level: "middle",
    q: "Какие labels оставили после оптимизации?",
    options: [
      "paymentId и traceId",
      "merchantId, provider, status, currency",
      "Только timestamp",
      "Только имя пода"
    ],
    answer: 1,
    explain: "Эти измерения полезны для агрегированного анализа и имеют ограниченную cardinality. paymentId убрали."
  },
  {
    id: "lg-obs-008", category: "legend-observability", level: "senior",
    q: "Зачем добавили recording rules в Prometheus?",
    options: [
      "Чтобы писать аудит в PostgreSQL",
      "Чтобы заменить Kafka",
      "Чтобы заранее вычислять тяжёлые агрегаты и ускорять запросы dashboard",
      "Чтобы отключить алерты"
    ],
    answer: 2,
    explain: "Recording rules сохраняют результат запроса как новую метрику. Это снижает стоимость повторяющихся тяжёлых вычислений."
  },
  {
    id: "lg-obs-009", category: "legend-observability", level: "middle",
    q: "На какие dashboards разделили мониторинг?",
    options: [
      "Overview, Kafka deep dive и audit/compliance",
      "Frontend, mobile и desktop",
      "Только production",
      "На один общий без разделения"
    ],
    answer: 0,
    explain: "Разделение уменьшает количество панелей и запросов на один экран, ускоряет загрузку и делает navigation понятнее."
  },
  {
    id: "lg-obs-010", category: "legend-observability", level: "middle",
    q: "Что сделали с time range для realtime dashboard?",
    options: [
      "Увеличили до года",
      "Отключили",
      "Оставили без изменений",
      "Сократили"
    ],
    answer: 3,
    explain: "Меньший диапазон читает меньше данных. Для исторического анализа используют отдельные dashboard'ы."
  },
  {
    id: "lg-obs-011", category: "legend-observability", level: "middle",
    q: "Что сделали с refresh interval тяжёлых панелей?",
    options: [
      "Уменьшили до 1 секунды",
      "Увеличили",
      "Отключили Grafana",
      "Сделали случайным"
    ],
    answer: 1,
    explain: "Реже обновлять тяжёлые панели — значит меньше нагрузки на Prometheus и быстрее отклик."
  },
  {
    id: "lg-obs-012", category: "legend-observability", level: "senior",
    q: "Что такое tiered alerting?",
    options: [
      "Алерты только по почте",
      "Отключение всех алертов ночью",
      "Разделение алертов на critical, warning и info",
      "Один алерт на всё"
    ],
    answer: 2,
    explain: "Разные уровни помогают приоритизировать реакцию. Critical будит дежурного, info может быть просто записью."
  },
  {
    id: "lg-obs-013", category: "legend-observability", level: "senior",
    q: "Что означает p99 latency?",
    options: [
      "99% запросов выполнились быстрее этого значения",
      "Средняя latency",
      "99% запросов завершились ошибкой",
      "Максимальная latency за год"
    ],
    answer: 0,
    explain: "p99 показывает хвостовую задержку и лучше среднего отражает опыт части пользователей. Для SLO часто используют p95/p99."
  },
  {
    id: "lg-obs-014", category: "legend-observability", level: "senior",
    q: "Что показывает метрика `kafka_consumer_group_lag`?",
    options: [
      "Сколько соединений занято в HikariCP",
      "Насколько consumer group отстаёт от конца лога",
      "Сколько места занимает Metaspace",
      "Сколько партиций у топика"
    ],
    answer: 1,
    explain: "Lag — разница между log-end offset и committed offset. В легенде для него настроен отдельный critical-алерт."
  },
  {
    id: "lg-obs-015", category: "legend-observability", level: "senior",
    q: "Зачем мониторить hikaricp_connections_active?",
    options: [
      "Чтобы считать комиссию",
      "Чтобы увидеть исчерпание пула соединений и деградацию БД",
      "Чтобы определить число мерчантов",
      "Чтобы сжать Kafka-сообщения"
    ],
    answer: 1,
    explain: "Активные соединения у предела указывают на нехватку пула или медленные запросы. Также важны connection timeout и lock wait."
  },
  {
    id: "lg-obs-016", category: "legend-observability", level: "middle",
    q: "Какие JVM-метрики перечислены в легенде?",
    options: [
      "Количество классов в Git",
      "Число HTTP-заголовков",
      "Heap usage, GC pauses, CPU, pod restarts",
      "Только версия Java"
    ],
    answer: 2,
    explain: "Эти метрики помогают увидеть утечки, паузы GC, перегрузку CPU и нестабильность подов."
  },
  {
    id: "lg-obs-017", category: "legend-observability", level: "senior",
    q: "Какая Outbox-метрика лучше всего показывает застрявшую публикацию?",
    options: [
      "oldest pending event age",
      "Количество успешных webhook",
      "Размер Kafka-сегмента",
      "Число партиций"
    ],
    answer: 0,
    explain: "Возраст старейшего PENDING-события напрямую отражает задержку. Именно на неё настроили алерт после инцидента."
  },
  {
    id: "lg-obs-018", category: "legend-observability", level: "senior",
    q: "Что важно мониторить в PostgreSQL кроме CPU?",
    options: [
      "Только размер базы",
      "Только число таблиц",
      "Только версию",
      "Slow queries, lock wait, transaction duration и connection timeout"
    ],
    answer: 3,
    explain: "Эти метрики показывают деградацию запросов и блокировки, которые напрямую влияют на платежный flow."
  },
  {
    id: "lg-obs-019", category: "legend-observability", level: "expert",
    q: "Почему высокая cardinality нередко опаснее простого объёма метрик?",
    options: [
      "Она запрещает Prometheus",
      "Умножает число временных серий и стоимость индексации/запросов",
      "Она уменьшает retention до нуля",
      "Она ломает Grafana UI"
    ],
    answer: 1,
    explain: "Даже небольшое число метрик с уникальным label может создать миллионы серий. Prometheus хранит и индексирует каждую серию отдельно."
  },
  {
    id: "lg-obs-020", category: "legend-observability", level: "middle",
    q: "Какую роль выполняет Prometheus?",
    options: [
      "Отправляет webhook",
      "Считает комиссию",
      "Собирает и хранит метрики, выполняет правила и алерты",
      "Принимает платежи"
    ],
    answer: 2,
    explain: "Prometheus scrape'ит метрики, хранит time series и вычисляет alert/recording rules. Grafana — слой визуализации."
  },
  {
    id: "lg-obs-021", category: "legend-observability", level: "middle",
    q: "Какую роль выполняет Grafana?",
    options: [
      "Визуализирует метрики и строит dashboard'ы",
      "Хранит audit trail",
      "Публикует события в Kafka",
      "Создает платежи"
    ],
    answer: 0,
    explain: "Grafana отображает данные из Prometheus и других источников. Тяжёлые queries и частый refresh нагружают хранилище метрик."
  },
  {
    id: "lg-obs-022", category: "legend-observability", level: "senior",
    q: "Почему алерт на p99 полезнее алерта только на среднюю latency?",
    options: [
      "Средняя всегда равна нулю",
      "p99 невозможно измерить",
      "p99 не зависит от нагрузки",
      "Средняя скрывает проблемы медленного хвоста, а p99 показывает опыт части запросов"
    ],
    answer: 3,
    explain: "Небольшая доля очень медленных платежей может не сильно изменить среднее, но критично влиять на SLA. Поэтому смотрят перцентили."
  },
  {
    id: "lg-obs-023", category: "legend-observability", level: "expert",
    q: "Почему для метрик опасно использовать произвольные идентификаторы в labels?",
    options: [
      "Prometheus запрещает строки",
      "Они создают неограниченное число уникальных series",
      "Они отключают Garbage Collection",
      "Они меняют ключ партиции"
    ],
    answer: 1,
    explain: "Идентификаторы с высокой cardinality быстро раздувают time series. Их заменяют агрегируемыми измерениями, а детали ищут в логах/трейсах."
  },
  {
    id: "lg-obs-024", category: "legend-observability", level: "senior",
    q: "Какая метрика сигнализирует о платежах, зависших в нефинальном статусе?",
    options: [
      "payment_success_rate",
      "provider_success_rate",
      "payment_status_stuck_count",
      "kafka_producer_record_send_rate"
    ],
    answer: 2,
    explain: "payment_status_stuck_count показывает платежи без прогресса. Её полезно смотреть вместе с возрастом статуса и PENDING outbox."
  },
  {
    id: "lg-obs-025", category: "legend-observability", level: "middle",
    q: "Какая метрика показывает долю успешных запросов к провайдеру?",
    options: [
      "provider_success_rate",
      "hikaricp_connections_active",
      "jvm_gc_pauses",
      "outbox_failed_events"
    ],
    answer: 0,
    explain: "provider_success_rate помогает оценить качество конкретного провайдера и работу fallback. Рядом смотрят timeout count."
  },
  {
    id: "lg-obs-026", category: "legend-observability", level: "senior",
    q: "Почему счётчик DLQ нужно мониторить отдельно?",
    options: [
      "Он заменяет consumer lag",
      "Он всегда равен нулю",
      "DLQ не влияет на бизнес",
      "Рост DLQ означает накопление необработанных сообщений и потенциальные потери уведомлений"
    ],
    answer: 3,
    explain: "DLQ предотвращает блокировку, но сообщения там требуют разбора. Рост метрики — сигнал о проблемах в обработке или интеграции."
  }
]);
