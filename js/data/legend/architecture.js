/* Легенда: архитектура проекта — 32 вопроса */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-arch-001", category: "legend-architecture", level: "middle",
    q: "Что представляет собой проект из технической легенды?",
    options: [
      "Маркетплейс товаров",
      "B2B-платформа — агрегатор платежных провайдеров",
      "Мобильный банк для физических лиц",
      "Система управления складом"
    ],
    answer: 1,
    explain: "Легенда описывает B2B Payment Aggregator: платформа принимает платежи мерчантов, выбирает провайдера, отправляет платеж и уведомляет мерчанта."
  },
  {
    id: "lg-arch-002", category: "legend-architecture", level: "middle",
    q: "На какую позицию описан проект в легенде?",
    options: [
      "Java Intern",
      "Java Junior Developer",
      "Java Middle+ Developer",
      "Team Lead"
    ],
    answer: 2,
    explain: "Позиция в легенде — Java Middle+ Developer, проект B2B Payment Aggregator."
  },
  {
    id: "lg-arch-003", category: "legend-architecture", level: "middle",
    q: "Что является source of truth для основного состояния платежа?",
    options: ["PostgreSQL", "Redis", "Kafka", "Grafana"],
    answer: 0,
    explain: "PostgreSQL — source of truth для состояния платежа. Redis используется для идемпотентности и кэша, Kafka — для событий."
  },
  {
    id: "lg-arch-004", category: "legend-architecture", level: "senior",
    q: "Какие две роли выполняет Redis в описанной архитектуре?",
    options: [
      "Хранит платежи и audit trail",
      "Выполняет роль брокера Kafka",
      "Заменяет PostgreSQL для отчетов",
      "Идемпотентность и кэш конфигов"
    ],
    answer: 3,
    explain: "В легенде Redis отвечает за ключи идемпотентности и кэш конфигурации провайдеров. Основное состояние платежа хранится в PostgreSQL."
  },
  {
    id: "lg-arch-005", category: "legend-architecture", level: "senior",
    q: "Какую проблему решает Transactional Outbox в проекте?",
    options: [
      "Ускоряет выполнение SQL-запросов",
      "Защищает от потери события между записью в БД и публикацией в Kafka",
      "Гарантирует глобальный порядок всех платежей",
      "Заменяет идемпотентность consumer'ов"
    ],
    answer: 1,
    explain: "Outbox сохраняет событие в БД в одной транзакции с бизнес-изменением. Отдельный relay публикует его в Kafka, поэтому недоступность Kafka не теряет событие."
  },
  {
    id: "lg-arch-006", category: "legend-architecture", level: "senior",
    q: "Зачем в проекте используется DLQ/DLT?",
    options: [
      "Для хранения всех успешных платежей",
      "Для балансировки нагрузки между партициями",
      "Чтобы не блокировать обработку бесконечно падающими сообщениями",
      "Для замены consumer offset"
    ],
    answer: 2,
    explain: "DLQ/DLT изолирует сообщения, которые не удалось обработать после retries. Это позволяет не застревать на «ядовитом» сообщении и разбирать его отдельно."
  },
  {
    id: "lg-arch-007", category: "legend-architecture", level: "senior",
    q: "Для чего используется Resilience4j?",
    options: [
      "Для защиты от нестабильности внешних провайдеров: timeout, retry, circuit breaker",
      "Для миграций базы данных",
      "Для сборки Docker-образов",
      "Для сериализации JSON"
    ],
    answer: 0,
    explain: "Resilience4j даёт timeout/retry/circuit breaker и другие паттерны устойчивости. В легенде он ограничивает влияние медленных и падающих провайдеров."
  },
  {
    id: "lg-arch-008", category: "legend-architecture", level: "middle",
    q: "Что мониторят через Prometheus/Grafana в проекте?",
    options: [
      "Только количество строк в таблицах",
      "Только бизнес-метрики прибыли",
      "Только состояние Git-веток",
      "Latency, TPS, consumer lag и ошибки"
    ],
    answer: 3,
    explain: "В легенде перечислены latency, TPS, lag, ошибки, а также JVM/Hikari/Outbox-метрики. Grafana визуализирует метрики, собираемые Prometheus."
  },
  {
    id: "lg-arch-009", category: "legend-architecture", level: "senior",
    q: "Какая архитектурная комбинация использовалась в проекте?",
    options: [
      "Монолит + SOAP",
      "State Machine + Event-Driven Choreography",
      "Только Camunda BPMN",
      "Только синхронные REST-вызовы"
    ],
    answer: 1,
    explain: "State Machine контролирует переходы статусов, а межсервисное взаимодействие построено на Kafka-событиях без центрального оркестратора."
  },
  {
    id: "lg-arch-010", category: "legend-architecture", level: "senior",
    q: "За что отвечает State Machine платежа?",
    options: [
      "За маршрутизацию HTTP-запросов",
      "За хранение секретов",
      "За корректные переходы статусов и guard conditions",
      "За расчет комиссии"
    ],
    answer: 2,
    explain: "State Machine проверяет допустимость перехода, текущий и новый статус, устаревание события. Она не заменяет расчет комиссии или HTTP-слой."
  },
  {
    id: "lg-arch-011", category: "legend-architecture", level: "senior",
    q: "Что означает Event-Driven Choreography в этом проекте?",
    options: [
      "Сервисы реагируют на Kafka-события без центрального оркестратора",
      "Один сервис последовательно вызывает все остальные по HTTP",
      "Платежи обрабатываются только вручную",
      "Все события хранятся в Redis"
    ],
    answer: 0,
    explain: "Хореография распределяет реакцию между сервисами через события. Центральный оркестратор отсутствует, что помогает масштабироваться."
  },
  {
    id: "lg-arch-012", category: "legend-architecture", level: "expert",
    q: "Почему в легенде отказались от Camunda/BPMN?",
    options: [
      "Camunda не поддерживает BPMN",
      "Camunda не умеет работать с Java",
      "Из-за требований PCI DSS",
      "Центральный оркестратор мог стать bottleneck при 500–800 TPS и плохо подходил для асинхронных ответов провайдеров"
    ],
    answer: 3,
    explain: "Классическая оркестрация могла ограничить пропускную способность. Провайдеры отвечают по-разному, поэтому состояние удобнее держать в State Machine, а координацию — в Kafka."
  },
  {
    id: "lg-arch-013", category: "legend-architecture", level: "senior",
    q: "Почему не выбрали чистую хореографию без State Machine?",
    options: [
      "Kafka не поддерживает события",
      "Нужна строгая последовательность шагов и guard conditions для статусов",
      "Хореография всегда медленнее",
      "PostgreSQL не умеет хранить состояние"
    ],
    answer: 1,
    explain: "Нельзя рассчитать комиссию до подтверждения платежа или отправить финальный webhook до обновления статуса. State Machine задаёт допустимую последовательность."
  },
  {
    id: "lg-arch-014", category: "legend-architecture", level: "senior",
    q: "Почему состояние платежа хранится в PostgreSQL, а не только в Kafka?",
    options: [
      "Kafka не поддерживает retention",
      "PostgreSQL быстрее любого брокера",
      "Нужны транзакционность, уникальные ограничения и источник истины для запросов",
      "Kafka не умеет хранить события"
    ],
    answer: 2,
    explain: "БД позволяет атомарно менять платеж и outbox, применять unique constraints и optimistic locking. Kafka — транспорт событий, а не основной source of truth."
  },
  {
    id: "lg-arch-015", category: "legend-architecture", level: "middle",
    q: "Что делает payment-initiation-service?",
    options: [
      "Принимает платеж, валидирует API key/баланс/формат, создает payment и outbox-запись",
      "Считает комиссию по тарифной сетке",
      "Выбирает провайдера по scoring",
      "Отправляет webhook мерчанту"
    ],
    answer: 0,
    explain: "Это входная точка POST /api/v1/payments. Она создаёт payment и payment_outbox в одной транзакции и возвращает paymentId со статусом."
  },
  {
    id: "lg-arch-016", category: "legend-architecture", level: "senior",
    q: "Чем занимается outbox-relay-service?",
    options: [
      "Проверяет баланс мерчанта",
      "Считает provider fee",
      "Принимает webhook от мерчанта",
      "Читает PENDING-события и публикует их в Kafka, обновляя статус на SENT"
    ],
    answer: 3,
    explain: "Relay отделяет публикацию от бизнес-транзакции. При ошибке он увеличивает retryCount, а после лимита переводит событие в FAILED."
  },
  {
    id: "lg-arch-017", category: "legend-architecture", level: "senior",
    q: "Как routing-service выбирает провайдера?",
    options: [
      "Случайно из всех доступных",
      "По scoring с учетом комиссии, health status и success rate",
      "Только по названию провайдера",
      "По размеру Kafka-сообщения"
    ],
    answer: 1,
    explain: "Сервис загружает конфиг провайдеров, считает score, формирует fallback-chain и публикует payment.routing.requested."
  },
  {
    id: "lg-arch-018", category: "legend-architecture", level: "senior",
    q: "Что делает provider-adapter-service?",
    options: [
      "Пишет audit trail",
      "Считает комиссию",
      "Вызывает внешний API провайдера через REST/gRPC и обрабатывает timeout/fallback",
      "Управляет Grafana"
    ],
    answer: 2,
    explain: "Adapter инкапсулирует различия провайдеров. Он применяет timeout/retry, при ошибке пробует fallback, а при timeout переводит платеж в PENDING."
  },
  {
    id: "lg-arch-019", category: "legend-architecture", level: "senior",
    q: "Что делает payment-processing-service?",
    options: [
      "Проверяет идемпотентность ответа, обновляет статус в PostgreSQL и публикует события",
      "Принимает API-запрос на создание платежа",
      "Хранит конфиги Grafana",
      "Создает Docker-образы"
    ],
    answer: 0,
    explain: "Сервис обрабатывает payment.provider.response, проверяет processed key, использует optimistic locking и публикует payment.status.updated и события комиссии/уведомления."
  },
  {
    id: "lg-arch-020", category: "legend-architecture", level: "middle",
    q: "Как рассчитывается комиссия в fee-calculation-service?",
    options: [
      "Только фиксированная сумма",
      "Только процент от суммы",
      "Только курс валют",
      "Fixed amount + percentage + provider fee"
    ],
    answer: 3,
    explain: "Формула учитывает фиксированную часть, процент и комиссию провайдера. Результат защищён unique constraint paymentId + feeType."
  },
  {
    id: "lg-arch-021", category: "legend-architecture", level: "senior",
    q: "Что входит в обязанности notification-service?",
    options: [
      "Расчет provider score",
      "Отправка подписанного webhook мерчанту с retry и DLT",
      "Создание payment_outbox",
      "Проверка баланса"
    ],
    answer: 1,
    explain: "Сервис формирует payload, подписывает его HMAC-SHA256, отправляет POST, ретраит с backoff/jitter и после лимита кладёт сообщение в notification.DLT."
  },
  {
    id: "lg-arch-022", category: "legend-architecture", level: "senior",
    q: "Что делает audit-service?",
    options: [
      "Хранит только последний статус платежа",
      "Отправляет платежи провайдеру",
      "Пишет audit trail в PostgreSQL batch-вставками и хранит его дольше Kafka retention",
      "Кэширует конфиги провайдеров"
    ],
    answer: 2,
    explain: "Audit нужен для расследований и compliance. Kafka хранит события около 30 дней, а audit в БД — дольше."
  },
  {
    id: "lg-arch-023", category: "legend-architecture", level: "expert",
    q: "Зачем провайдеров вынесли в отдельный provider-adapter-service?",
    options: [
      "Чтобы изолировать различия внешних API, таймауты и fallback от основной бизнес-логики",
      "Чтобы отказаться от Kafka",
      "Чтобы убрать PostgreSQL",
      "Чтобы расчет комиссии выполнялся до платежа"
    ],
    answer: 0,
    explain: "Адаптеры инкапсулируют протоколы и ошибки провайдеров. Это позволяет менять интеграции, не размазывая их по payment-processing."
  },
  {
    id: "lg-arch-024", category: "legend-architecture", level: "expert",
    q: "Почему ключом партиции выбран merchantId, а не paymentId?",
    options: [
      "paymentId не существует",
      "merchantId всегда null",
      "Kafka не поддерживает paymentId",
      "merchantId сохраняет порядок платежей мерчанта и дает разумную cardinality без одного общего ключа"
    ],
    answer: 3,
    explain: "Слишком высокая cardinality paymentId ухудшает баланс и локальность, а один общий ключ создаёт горячую партицию. merchantId — компромисс для порядка и распределения."
  },
  {
    id: "lg-arch-025", category: "legend-architecture", level: "senior",
    q: "Какие статусы входят в State Machine платежа?",
    options: [
      "NEW, OPEN, CLOSED",
      "CREATED, SENT, DONE",
      "INITIATED, ROUTING, PROCESSING, PENDING, SUCCESS, FAILED, CANCELLED",
      "START, QUEUE, RETRY, END"
    ],
    answer: 2,
    explain: "Легенда перечисляет семь статусов. PENDING означает, что провайдер не ответил вовремя и ожидается callback или polling."
  },
  {
    id: "lg-arch-026", category: "legend-architecture", level: "senior",
    q: "Какой статус означает, что провайдер не ответил вовремя?",
    options: ["ROUTING", "PENDING", "FAILED", "CANCELLED"],
    answer: 1,
    explain: "В PENDING платеж ожидает callback или результат polling. Это не окончательный FAILED: финальный статус может прийти позже."
  },
  {
    id: "lg-arch-027", category: "legend-architecture", level: "expert",
    q: "Из какого статуса разрешён переход в CANCELLED?",
    options: [
      "Только из INITIATED",
      "Из PROCESSING",
      "Из SUCCESS",
      "Из любого статуса"
    ],
    answer: 0,
    explain: "По легенде CANCELLED доступен только из INITIATED — отмена до отправки провайдеру. После PROCESSING отмена не предусмотрена."
  },
  {
    id: "lg-arch-028", category: "legend-architecture", level: "senior",
    q: "Почему payment-processing-service использует optimistic locking?",
    options: [
      "Чтобы заблокировать все строки таблицы на время платежа",
      "Чтобы избежать Kafka",
      "Чтобы ускорить Grafana",
      "Чтобы защитить статус от конкурентных обновлений без длительных блокировок"
    ],
    answer: 3,
    explain: "Версия в UPDATE позволяет обнаружить конфликт при конкурентном изменении. Это дешевле пессимистичной блокировки и сочетается с идемпотентностью."
  },
  {
    id: "lg-arch-029", category: "legend-architecture", level: "expert",
    q: "Почему в легенде нет перехода PROCESSING → CANCELLED?",
    options: [
      "Потому что Kafka не поддерживает отмену",
      "После отправки провайдеру нельзя просто отменить операцию; нужен ответ/callback или отдельный refund-процесс",
      "Потому что CANCELLED не существует",
      "Потому что PROCESSING — финальный статус"
    ],
    answer: 1,
    explain: "После передачи платежа внешнему провайдеру отмена требует согласования с ним. В легенде отмена разрешена только до отправки."
  },
  {
    id: "lg-arch-030", category: "legend-architecture", level: "senior",
    q: "Почему audit trail хранится в PostgreSQL дольше, чем в Kafka?",
    options: [
      "Kafka не умеет хранить JSON",
      "PostgreSQL дешевле любого диска",
      "Kafka retention около 30 дней, а для расследований и compliance нужен более долгий срок",
      "Audit не связан с платежами"
    ],
    answer: 2,
    explain: "Kafka — транспорт и ограниченный по времени лог. Долговременное хранение audit trail обеспечивает БД."
  },
  {
    id: "lg-arch-031", category: "legend-architecture", level: "middle",
    q: "Какой endpoint принимает новый платеж?",
    options: [
      "POST /api/v1/payments",
      "GET /api/v1/payments/status",
      "POST /webhook",
      "GET /actuator/health"
    ],
    answer: 0,
    explain: "payment-initiation-service принимает POST /api/v1/payments, валидирует запрос и возвращает paymentId и статус."
  },
  {
    id: "lg-arch-032", category: "legend-architecture", level: "senior",
    q: "Что из перечисленного не является отдельным сервисом в легенде?",
    options: [
      "payment-initiation-service",
      "routing-service",
      "fee-calculation-service",
      "camunda-orchestrator"
    ],
    answer: 3,
    explain: "Camunda/BPMN в проекте не использовалась. Перечисленные остальные сервисы присутствуют в легенде."
  }
]);
