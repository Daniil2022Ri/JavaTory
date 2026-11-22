/* Легенда: Kafka — 32 вопроса */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-kafka-001", category: "legend-kafka", level: "middle",
    q: "В какой топик публикуется событие создания нового платежа?",
    options: ["payment.initiated", "payment.fee.calculated", "audit.log", "notification.DLT"],
    answer: 0,
    explain: "payment.initiated запускает маршрутизацию. Его публикует outbox-relay после фиксации платежа и outbox-записи."
  },
  {
    id: "lg-kafka-002", category: "legend-kafka", level: "middle",
    q: "В каком топике публикуется обновление статуса платежа?",
    options: ["payment.routing.requested", "payment.status.updated", "fee.calculated.completed", "notification.DLT"],
    answer: 1,
    explain: "payment.status.updated читают notification-service и audit-service. Событие публикуется после успешного изменения статуса в PostgreSQL."
  },
  {
    id: "lg-kafka-003", category: "legend-kafka", level: "middle",
    q: "Куда попадают сообщения после исчерпания попыток доставки webhook?",
    options: ["payment.initiated", "payment.provider.response", "notification.DLT", "audit.log"],
    answer: 2,
    explain: "notification.DLT хранит проблемные уведомления для разбора и возможного replay. Это защищает consumer от бесконечного retry."
  },
  {
    id: "lg-kafka-004", category: "legend-kafka", level: "middle",
    q: "Какой топик используется для audit trail?",
    options: ["payment.initiated", "payment.status.updated", "notification.DLT", "audit.log"],
    answer: 3,
    explain: "Audit-service читает audit.log batch-ами и пишет события в PostgreSQL. Kafka retention около 30 дней, БД хранит дольше."
  },
  {
    id: "lg-kafka-005", category: "legend-kafka", level: "senior",
    q: "Какая настройка producer гарантирует подтверждение от всех in-sync реплик?",
    options: ["acks=0", "acks=1", "acks=all", "compression=none"],
    answer: 2,
    explain: "acks=all повышает durability. В легенде она используется вместе с идемпотентностью и ограничением in-flight запросов."
  },
  {
    id: "lg-kafka-006", category: "legend-kafka", level: "senior",
    q: "Что включает `enable.idempotence=true` у producer?",
    options: [
      "Дедупликацию повторных записей внутри Kafka-партиции",
      "Идемпотентность webhook",
      "Уникальность комиссии в БД",
      "Отключение retries"
    ],
    answer: 0,
    explain: "Producer использует PID и sequence numbers, чтобы брокер отбрасывал дубли при повторной отправке. Это не делает всю бизнес-операцию exactly-once."
  },
  {
    id: "lg-kafka-007", category: "legend-kafka", level: "expert",
    q: "Почему в легенде `max.in.flight.requests=1`?",
    options: [
      "Чтобы уменьшить размер сообщения",
      "Чтобы сохранить порядок при retries даже без более сложной настройки идемпотентности",
      "Чтобы отключить compression",
      "Чтобы увеличить число партиций"
    ],
    answer: 1,
    explain: "Несколько незавершённых запросов могут нарушить порядок при retry. Ограничение до одного — консервативный способ сохранить порядок; идемпотентность также помогает."
  },
  {
    id: "lg-kafka-008", category: "legend-kafka", level: "middle",
    q: "Какой compression.type указан в легенде?",
    options: ["gzip", "lz4", "snappy", "zstd"],
    answer: 2,
    explain: "Snappy выбран как компромисс между сжатием и CPU-затратами. Настройка влияет на сеть, диск и нагрузку consumer'а."
  },
  {
    id: "lg-kafka-009", category: "legend-kafka", level: "middle",
    q: "Сколько retries указано в producer settings?",
    options: ["0", "3", "10", "Бесконечно"],
    answer: 1,
    explain: "retries=3 с backoff 100 мс. Количество попыток ограничено, чтобы не задерживать обработку бесконечно."
  },
  {
    id: "lg-kafka-010", category: "legend-kafka", level: "middle",
    q: "Какой backoff указан для producer?",
    options: ["10 мс", "100 мс", "1 секунда", "5 минут"],
    answer: 1,
    explain: "100 мс — базовый backoff между повторными попытками. В production обычно добавляют jitter, чтобы избежать синхронных retry-волн."
  },
  {
    id: "lg-kafka-011", category: "legend-kafka", level: "senior",
    q: "Какая настройка consumer отвечает за ручное подтверждение offset?",
    options: [
      "enable.auto.commit=false",
      "isolation.level=read_committed",
      "max.poll.records=50",
      "auto.offset.reset=earliest"
    ],
    answer: 0,
    explain: "При отключённом auto commit приложение само решает, когда коммитить offset. В легенде это делается после успешной обработки и записи в БД."
  },
  {
    id: "lg-kafka-012", category: "legend-kafka", level: "senior",
    q: "Когда consumer коммитит offset в проекте?",
    options: [
      "До чтения сообщения",
      "После успешной обработки и фиксации состояния в PostgreSQL",
      "По таймеру каждые 100 мс",
      "При старте приложения"
    ],
    answer: 1,
    explain: "Такой порядок даёт at-least-once. Падение до commit приведёт к повторному чтению, а идемпотентность защитит от дублей."
  },
  {
    id: "lg-kafka-013", category: "legend-kafka", level: "expert",
    q: "Что задаёт `isolation.level=read_committed`?",
    options: [
      "Читать только сообщения из завершённых транзакционных producer-транзакций",
      "Читать сообщения без ключа",
      "Игнорировать все ошибки",
      "Отключить consumer group"
    ],
    answer: 0,
    explain: "Этот режим не даёт consumer видеть записи незавершённых Kafka-транзакций. Он полезен при transactional producer, но не заменяет идемпотентность БД."
  },
  {
    id: "lg-kafka-014", category: "legend-kafka", level: "middle",
    q: "Чему равен `max.poll.records` в легенде?",
    options: ["1", "10", "50", "1000"],
    answer: 2,
    explain: "50 записей за poll ограничивают пачку. Это помогает укладываться в max.poll.interval и контролировать время обработки."
  },
  {
    id: "lg-kafka-015", category: "legend-kafka", level: "senior",
    q: "Зачем в легенде упомянута concurrency на consumer'ах?",
    options: [
      "Чтобы увеличить параллелизм обработки партиций",
      "Чтобы уменьшить replication factor",
      "Чтобы отключить manual commit",
      "Чтобы сжать сообщения"
    ],
    answer: 0,
    explain: "Параллельные consumer'ы в группе обрабатывают разные партиции. Верхняя граница параллелизма — число партиций."
  },
  {
    id: "lg-kafka-016", category: "legend-kafka", level: "senior",
    q: "Почему paymentId не используют как ключ партиции?",
    options: [
      "paymentId не уникален",
      "Слишком высокая cardinality и слабая локальность для порядка по мерчанту",
      "Kafka не поддерживает строковые ключи",
      "paymentId всегда null"
    ],
    answer: 1,
    explain: "Ключ merchantId позволяет сохранять порядок платежей мерчанта и лучше распределять нагрузку. PaymentId дал бы почти уникальные ключи без нужной группировки."
  },
  {
    id: "lg-kafka-017", category: "legend-kafka", level: "senior",
    q: "Что гарантируется при ключе merchantId?",
    options: [
      "Глобальный порядок всех платежей",
      "Порядок событий одного мерчанта в пределах партиции",
      "Порядок между всеми топиками",
      "Exactly-once обработка"
    ],
    answer: 1,
    explain: "Kafka гарантирует порядок внутри партиции, а одинаковый ключ ведёт в одну партицию. Глобального порядка между партициями нет."
  },
  {
    id: "lg-kafka-018", category: "legend-kafka", level: "expert",
    q: "Почему высокое число уникальных ключей может ухудшить партиционирование?",
    options: [
      "Увеличивает число consumer group",
      "Уменьшает retention",
      "Даёт плохую локальность и может неравномерно нагружать партиции",
      "Запрещает compression"
    ],
    answer: 2,
    explain: "Слишком уникальные ключи распределяют события случайно и теряют преимущество локальности, а один общий ключ создаёт hot partition. Нужен баланс."
  },
  {
    id: "lg-kafka-019", category: "legend-kafka", level: "senior",
    q: "Какая метрика показывает отставание consumer group?",
    options: [
      "kafka_consumer_group_lag",
      "hikaricp_connections_active",
      "jvm_gc_pause",
      "payment_success_rate"
    ],
    answer: 0,
    explain: "Lag — разница между концом лога и committed offset. Рост lag сигнализирует о нехватке мощности или проблемах обработки."
  },
  {
    id: "lg-kafka-020", category: "legend-kafka", level: "senior",
    q: "Что происходит при падении одного consumer instance?",
    options: [
      "Все offsets удаляются",
      "Kafka делает rebalance и перераспределяет партиции",
      "Топик становится read-only",
      "Outbox перестает работать"
    ],
    answer: 1,
    explain: "Оставшиеся consumer'ы группы забирают партиции. В этот период возможен рост lag и кратковременная пауза обработки."
  },
  {
    id: "lg-kafka-021", category: "legend-kafka", level: "expert",
    q: "Почему при падении PostgreSQL consumer не должен коммитить offset?",
    options: [
      "Иначе сообщение будет потеряно, хотя состояние не сохранено",
      "Иначе Kafka удалит топик",
      "Иначе сломается Grafana",
      "Иначе outbox станет SENT"
    ],
    answer: 0,
    explain: "Коммит означает успешную обработку. Если БД не обновлена, сообщение нужно перечитать после восстановления."
  },
  {
    id: "lg-kafka-022", category: "legend-kafka", level: "senior",
    q: "Что произойдёт с платежом при временной недоступности Kafka?",
    options: [
      "Он потеряется",
      "Он останется в outbox и будет опубликован после восстановления",
      "Он сразу станет SUCCESS",
      "Он будет удален из PostgreSQL"
    ],
    answer: 1,
    explain: "Платёж создаётся в БД, а событие остаётся PENDING в outbox. Relay повторит публикацию, когда Kafka вернётся."
  },
  {
    id: "lg-kafka-023", category: "legend-kafka", level: "middle",
    q: "Что такое DLQ/DLT в контексте consumer'а?",
    options: [
      "Очередь для успешных сообщений",
      "Топик для сообщений, которые не удалось обработать после retries",
      "Индекс PostgreSQL",
      "Тип consumer group"
    ],
    answer: 1,
    explain: "DLQ/DLT изолирует «ядовитые» сообщения, чтобы они не блокировали партицию. Нужны мониторинг и стратегия разбора."
  },
  {
    id: "lg-kafka-024", category: "legend-kafka", level: "senior",
    q: "Чем retry отличается от отправки в DLT?",
    options: [
      "Retry — повторная попытка обработки, DLT — фиксация сообщения после исчерпания попыток",
      "DLT выполняется до первой попытки",
      "Retry удаляет сообщение",
      "Это одно и то же"
    ],
    answer: 0,
    explain: "Retry пытается восстановить обработку временной ошибки. DLT сохраняет сообщение для отдельного анализа, когда автоматические попытки исчерпаны."
  },
  {
    id: "lg-kafka-025", category: "legend-kafka", level: "expert",
    q: "Чем опасно `enable.auto.commit=true`?",
    options: [
      "Offset может закоммититься до завершения обработки, что грозит потерей",
      "Consumer перестаёт читать",
      "Kafka отключает репликацию",
      "Топик становится compacted"
    ],
    answer: 0,
    explain: "Автокоммит по таймеру не знает о бизнес-успехе. В проекте его отключили и коммитят вручную после БД."
  },
  {
    id: "lg-kafka-026", category: "legend-kafka", level: "expert",
    q: "Почему commit offset до обработки даёт риск at-most-once?",
    options: [
      "Сообщение будет прочитано дважды",
      "Сбой после commit и до обработки потеряет сообщение",
      "Kafka автоматически повторит его",
      "БД откатит транзакцию"
    ],
    answer: 1,
    explain: "После commit consumer при перезапуске начнёт с более позднего offset. Если обработка не удалась, сообщение уже не будет доставлено."
  },
  {
    id: "lg-kafka-027", category: "legend-kafka", level: "expert",
    q: "Что будет, если обработка пачки превысит max.poll.interval.ms?",
    options: [
      "Kafka увеличит интервал автоматически",
      "Consumer исключат из группы, партиции перераспределятся, вероятна повторная обработка",
      "Сообщения удалятся",
      "Ничего не изменится"
    ],
    answer: 1,
    explain: "Consumer должен регулярно вызывать poll. Долгая обработка приводит к rebalance и дублям, поэтому ограничивают max.poll.records и время обработки."
  },
  {
    id: "lg-kafka-028", category: "legend-kafka", level: "senior",
    q: "Зачем ограничивать `max.poll.records`?",
    options: [
      "Чтобы уменьшить размер сообщения",
      "Чтобы уменьшить время обработки одной пачки и укладываться в poll interval",
      "Чтобы отключить consumer lag",
      "Чтобы увеличить retention"
    ],
    answer: 1,
    explain: "Меньшая пачка быстрее обрабатывается, хотя увеличивает число poll-циклов. Нужен баланс с пропускной способностью."
  },
  {
    id: "lg-kafka-029", category: "legend-kafka", level: "senior",
    q: "Какие настройки producer связаны с надёжностью записи?",
    options: [
      "acks=all, enable.idempotence=true, retries и ограничение in-flight",
      "Только compression.type",
      "Только max.poll.records",
      "Только auto.offset.reset"
    ],
    answer: 0,
    explain: "Эти параметры уменьшают риск потери и дублей на уровне Kafka. Но финальная бизнес-идемпотентность всё равно обеспечивается приложением и БД."
  },
  {
    id: "lg-kafka-030", category: "legend-kafka", level: "expert",
    q: "Что произойдёт при увеличении числа партиций у существующего топика?",
    options: [
      "Изменится маппинг ключей, и порядок для некоторых merchantId может перераспределиться",
      "Все сообщения удалятся",
      "Отключится репликация",
      "Уменьшится retention"
    ],
    answer: 0,
    explain: "Ключ хешируется по числу партиций. После увеличения те же ключи могут попасть в другие партиции, поэтому число партиций планируют заранее."
  },
  {
    id: "lg-kafka-031", category: "legend-kafka", level: "senior",
    q: "Сколько примерно хранится Kafka retention для audit в легенде?",
    options: ["1 день", "7 дней", "30 дней", "1 год"],
    answer: 2,
    explain: "Kafka хранит audit-события около 30 дней. В PostgreSQL audit trail хранится дольше для compliance."
  },
  {
    id: "lg-kafka-032", category: "legend-kafka", level: "expert",
    q: "Почему `read_committed` сам по себе не решает проблему повторной обработки?",
    options: [
      "Он только скрывает незавершённые транзакции, но не дедуплицирует уже обработанные сообщения",
      "Он запрещает consumer group",
      "Он отключает manual commit",
      "Он удаляет offsets"
    ],
    answer: 0,
    explain: "После успешной транзакции сообщение всё ещё может быть доставлено повторно при сбое. Нужны идемпотентность consumer'а и ограничения БД."
  }
]);
