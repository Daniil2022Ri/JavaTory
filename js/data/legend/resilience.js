/* Легенда: отказоустойчивость и инциденты — 30 вопросов */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-res-001", category: "legend-resilience", level: "senior",
    q: "Что возвращает API Gateway, если payment-initiation-service недоступен?",
    options: [
      "200 OK с пустым телом",
      "503 Service Unavailable и Retry-After",
      "404 Not Found",
      "302 Redirect"
    ],
    answer: 1,
    explain: "503 сигнализирует о временной недоступности, Retry-After подсказывает клиенту, когда повторить запрос."
  },
  {
    id: "lg-res-002", category: "legend-resilience", level: "senior",
    q: "Что произойдёт, если клиент повторит запрос с тем же idempotencyKey после восстановления сервиса?",
    options: [
      "Создадутся два платежа",
      "Платеж будет создан ровно один раз",
      "Вернется 500",
      "Kafka удалит платеж"
    ],
    answer: 1,
    explain: "Идемпотентность на уровне API предотвращает дубль. Клиент должен получить результат исходной операции."
  },
  {
    id: "lg-res-003", category: "legend-resilience", level: "senior",
    q: "Что происходит, если Kafka временно недоступна?",
    options: [
      "Платеж не создается",
      "Платеж создается в PostgreSQL, а событие остаётся в outbox",
      "Сразу удаляется outbox",
      "Все статусы становятся SUCCESS"
    ],
    answer: 1,
    explain: "Создание платежа не зависит от Kafka. Relay опубликует накопленные PENDING-события после восстановления брокера."
  },
  {
    id: "lg-res-004", category: "legend-resilience", level: "senior",
    q: "Что делает Kafka при падении consumer instance?",
    options: [
      "Удаляет consumer group",
      "Запускает rebalance и перераспределяет партиции",
      "Отключает DLQ",
      "Меняет ключ партиции"
    ],
    answer: 1,
    explain: "Оставшиеся consumer'ы забирают партиции. Lag может временно вырасти, пока группа стабилизируется."
  },
  {
    id: "lg-res-005", category: "legend-resilience", level: "senior",
    q: "Что произойдёт, если consumer упал до commit offset?",
    options: [
      "Сообщение будет потеряно",
      "Сообщение будет перечитано, а идемпотентность защитит от дублей",
      "Kafka создаст новый payment",
      "Outbox станет FAILED"
    ],
    answer: 1,
    explain: "Неподтверждённый offset приведёт к повторной доставке. Redis-ключи, unique constraints и optimistic locking делают повтор безопасным."
  },
  {
    id: "lg-res-006", category: "legend-resilience", level: "senior",
    q: "Почему consumer не коммитит offset при недоступности PostgreSQL?",
    options: [
      "Чтобы после восстановления БД сообщение было обработано повторно",
      "Чтобы Kafka работала быстрее",
      "Чтобы удалить DLQ",
      "Чтобы перейти на at-most-once"
    ],
    answer: 0,
    explain: "Без успешной записи состояния обработка не завершена. Не коммитить offset — значит сохранить сообщение для повторной обработки."
  },
  {
    id: "lg-res-007", category: "legend-resilience", level: "expert",
    q: "В каком порядке восстанавливают систему после одновременного падения компонентов?",
    options: [
      "Kafka → PostgreSQL → Grafana → Redis",
      "Consumers → Outbox → PostgreSQL → Kafka",
      "PostgreSQL → Kafka → Outbox Relay → Consumers → polling PENDING",
      "Сначала Grafana, затем все остальные"
    ],
    answer: 2,
    explain: "Сначала БД как source of truth, затем брокер, публикация накопленного outbox, обработка consumer'ами и догон PENDING-платежей polling'ом."
  },
  {
    id: "lg-res-008", category: "legend-resilience", level: "senior",
    q: "Почему медленный внешний провайдер опасен для всего платежного flow?",
    options: [
      "Он может занять потоки и ухудшить latency остальных запросов",
      "Он всегда возвращает 400",
      "Он удаляет Kafka-топики",
      "Он блокирует PostgreSQL"
    ],
    answer: 0,
    explain: "Без deadline и ограничения параллелизма медленный провайдер исчерпывает thread pool. Это каскадно влияет на другие платежи."
  },
  {
    id: "lg-res-009", category: "legend-resilience", level: "senior",
    q: "Какой deadline использовался для внешнего провайдера?",
    options: ["50 мс", "100 мс", "500 мс", "30 секунд"],
    answer: 2,
    explain: "Около 500 мс. Deadline ограничивает время ожидания и освобождает ресурсы для других запросов."
  },
  {
    id: "lg-res-010", category: "legend-resilience", level: "senior",
    q: "Какая библиотека использовалась для timeout и backoff?",
    options: ["Resilience4j", "Hibernate", "Lombok", "Jackson"],
    answer: 0,
    explain: "Resilience4j предоставляет timeout, retry, circuit breaker и bulkhead. В легенде он защищает интеграции с провайдерами."
  },
  {
    id: "lg-res-011", category: "legend-resilience", level: "senior",
    q: "Зачем нужен exponential backoff?",
    options: [
      "Чтобы увеличивать задержку между повторными попытками и не перегружать зависимость",
      "Чтобы ускорить каждую попытку",
      "Чтобы отключить timeout",
      "Чтобы хранить offset в Redis"
    ],
    answer: 0,
    explain: "При временной перегрузке частые повторы только ухудшают ситуацию. Backoff даёт зависимости время восстановиться."
  },
  {
    id: "lg-res-012", category: "legend-resilience", level: "senior",
    q: "Что делает fallback при ошибке основного провайдера?",
    options: [
      "Удаляет платеж",
      "Переключается на следующего провайдера из fallback-chain",
      "Отправляет webhook с ошибкой",
      "Создает новый paymentId"
    ],
    answer: 1,
    explain: "Fallback повышает вероятность успеха, но требует аккуратной обработки неопределённых статусов, чтобы не выполнить платеж дважды."
  },
  {
    id: "lg-res-013", category: "legend-resilience", level: "expert",
    q: "Почему при timeout провайдера платеж переводится в PENDING, а не сразу в FAILED?",
    options: [
      "Потому что PENDING означает успех",
      "Потому что фактический статус операции неизвестен: провайдер мог принять платеж",
      "Чтобы обойти Kafka",
      "Чтобы не платить комиссию"
    ],
    answer: 1,
    explain: "Timeout не равен отказу. PENDING и асинхронная проверка/callback позволяют выяснить фактический результат без ошибочного возврата средств."
  },
  {
    id: "lg-res-014", category: "legend-resilience", level: "senior",
    q: "Как проверяется статус PENDING-платежа?",
    options: [
      "Только вручную",
      "Через scheduler polling примерно каждые 30 секунд и/или callback провайдера",
      "Только через Grafana",
      "Через удаление из outbox"
    ],
    answer: 1,
    explain: "Polling и callback — два пути получения финального статуса. Оба должны быть идемпотентны и проверять актуальность перехода."
  },
  {
    id: "lg-res-015", category: "legend-resilience", level: "senior",
    q: "На какое событие добавили алерт после инцидента с недоступной Kafka?",
    options: [
      "На PENDING outbox events старше 5 минут",
      "На каждый успешный платёж",
      "На рост числа пользователей Grafana",
      "На изменение версии Java"
    ],
    answer: 0,
    explain: "Возраст старейшего PENDING — ранний сигнал, что relay не публикует события. Одного размера очереди недостаточно."
  },
  {
    id: "lg-res-016", category: "legend-resilience", level: "senior",
    q: "Почему недостаточно мониторить только количество PENDING outbox events?",
    options: [
      "Метрика не существует",
      "Очередь может быть большой при высокой нагрузке, важнее возраст старейшей записи и динамика",
      "Prometheus не умеет считать",
      "Это всегда ноль"
    ],
    answer: 1,
    explain: "Возраст записи показывает, как долго событие не публикуется. Абсолютное количество без контекста может быть нормальным."
  },
  {
    id: "lg-res-017", category: "legend-resilience", level: "senior",
    q: "Почему вырос consumer lag после падения одного instance?",
    options: [
      "Kafka удалила offsets",
      "Оставшиеся consumer'ы забрали партиции, но мощности обработки временно не хватило",
      "Provider начал возвращать 200",
      "Outbox стал PENDING"
    ],
    answer: 1,
    explain: "После rebalance меньше инстансов обрабатывают больше партиций. Если обработка медленная, lag растёт."
  },
  {
    id: "lg-res-018", category: "legend-resilience", level: "senior",
    q: "Какие меры приняли после роста lag?",
    options: [
      "Увеличили concurrency, оптимизировали обработку, проверили manual commit и добавили алерт",
      "Отключили идемпотентность",
      "Удалили outbox",
      "Уменьшили количество партиций"
    ],
    answer: 0,
    explain: "Сначала проверяют consumer group, commit и обработку. Затем масштабируют/оптимизируют и настраивают алерт на критический lag."
  },
  {
    id: "lg-res-019", category: "legend-resilience", level: "middle",
    q: "Какой порог critical lag указан в легенде?",
    options: ["1 000", "10 000", "100 000", "10 000 000"],
    answer: 2,
    explain: "Алерт на lag > 100K critical. Порог нужно калибровать по пропускной способности и SLO, а не копировать вслепую."
  },
  {
    id: "lg-res-020", category: "legend-resilience", level: "senior",
    q: "Зачем нужен circuit breaker?",
    options: [
      "Чтобы быстро отклонять вызовы к сломанной зависимости и дать ей восстановиться",
      "Чтобы увеличить размер JSON",
      "Чтобы хранить пароли",
      "Чтобы заменить unique constraint"
    ],
    answer: 0,
    explain: "Breaker переходит в open при превышении ошибок и не держит потоки в бесполезном ожидании. В half-open он проверяет восстановление."
  },
  {
    id: "lg-res-021", category: "legend-resilience", level: "senior",
    q: "Какие ошибки обычно стоит повторять?",
    options: [
      "Все 4xx",
      "Только ошибки валидации",
      "Временные сетевые/5xx-ошибки и таймауты идемпотентных операций",
      "Только 401"
    ],
    answer: 2,
    explain: "Повтор 4xx обычно бесполезен и может усилить нагрузку. Retry применяют к временным сбоям и только там, где повтор безопасен."
  },
  {
    id: "lg-res-022", category: "legend-resilience", level: "expert",
    q: "Зачем к retry добавляют jitter?",
    options: [
      "Чтобы разнести попытки разных клиентов и избежать синхронной retry-волны",
      "Чтобы увеличить размер сообщения",
      "Чтобы отключить backoff",
      "Чтобы ускорить Grafana"
    ],
    answer: 0,
    explain: "Без jitter множество клиентов повторяют одновременно. Случайный разброс сглаживает нагрузку."
  },
  {
    id: "lg-res-023", category: "legend-resilience", level: "expert",
    q: "Почему fallback после timeout требует особой осторожности?",
    options: [
      "Первый провайдер мог принять платеж, поэтому повтор у другого создаёт риск двойного списания",
      "Fallback всегда запрещён",
      "Timeout означает гарантированный отказ",
      "Провайдеры не поддерживают идемпотентность"
    ],
    answer: 0,
    explain: "При неопределённом результате нельзя слепо повторять финансовую операцию. Нужны idempotency key, проверка статуса и политика PENDING."
  },
  {
    id: "lg-res-024", category: "legend-resilience", level: "senior",
    q: "Как outbox повышает отказоустойчивость?",
    options: [
      "Позволяет пережить недоступность Kafka без потери события",
      "Ускоряет внешний провайдер",
      "Заменяет PostgreSQL",
      "Отключает ретраи"
    ],
    answer: 0,
    explain: "Событие уже сохранено в БД и будет опубликовано позже. Это разрывает жёсткую зависимость создания платежа от Kafka."
  },
  {
    id: "lg-res-025", category: "legend-resilience", level: "senior",
    q: "Почему manual commit повышает надёжность обработки?",
    options: [
      "Позволяет подтвердить offset только после успешного изменения состояния",
      "Уменьшает число партиций",
      "Автоматически создаёт DLQ",
      "Ускоряет PostgreSQL"
    ],
    answer: 0,
    explain: "При сбое до commit сообщение будет перечитано. Это at-least-once, а идемпотентность защищает от повторного бизнес-эффекта."
  },
  {
    id: "lg-res-026", category: "legend-resilience", level: "senior",
    q: "Какую роль играет DLQ в отказоустойчивости?",
    options: [
      "Изолирует сообщения, которые стабильно не обрабатываются, чтобы они не блокировали прогресс",
      "Ускоряет все retry",
      "Заменяет manual commit",
      "Хранит состояние платежа"
    ],
    answer: 0,
    explain: "DLQ позволяет продолжить обработку остальных сообщений. Проблемные события разбирают отдельно и при необходимости переотправляют."
  },
  {
    id: "lg-res-027", category: "legend-resilience", level: "expert",
    q: "Почему состояние PENDING требует отдельного механизма восстановления?",
    options: [
      "Провайдер мог не ответить, и финальный статус нужно получить позже через callback/polling",
      "PENDING всегда означает SUCCESS",
      "Kafka не хранит PENDING",
      "PENDING запрещает webhook"
    ],
    answer: 0,
    explain: "Без активного догона такие платежи могли бы зависнуть навсегда. Scheduler и callback закрывают неопределённость."
  },
  {
    id: "lg-res-028", category: "legend-resilience", level: "senior",
    q: "Что произойдёт с уже созданными платежами при полном падении системы?",
    options: [
      "Они исчезнут",
      "Они останутся в PostgreSQL, а события — в Kafka или outbox",
      "Они автоматически станут FAILED",
      "Kafka удалит их после рестарта"
    ],
    answer: 1,
    explain: "PostgreSQL — source of truth, Kafka/outbox хранят события. После восстановления компонентов обработка продолжается."
  },
  {
    id: "lg-res-029", category: "legend-resilience", level: "expert",
    q: "Почему просто увеличить timeout до 30 секунд — плохое решение для медленного провайдера?",
    options: [
      "Он занимает ресурсы дольше и ухудшает общую latency, не гарантируя успех",
      "Kafka не поддерживает такие timeout",
      "PostgreSQL откажется работать",
      "Это всегда вызывает OOM"
    ],
    answer: 0,
    explain: "Длинное ожидание снижает пропускную способность и повышает хвостовую latency. Нужны deadline, fallback, circuit breaker и PENDING-политика."
  },
  {
    id: "lg-res-030", category: "legend-resilience", level: "senior",
    q: "Какая комбинация механизмов обеспечивает устойчивость финансового flow?",
    options: [
      "Только retry",
      "Только Grafana",
      "Только Kafka",
      "Outbox, идемпотентность, manual commit, уникальные ограничения, optimistic locking, retry/DLQ и мониторинг"
    ],
    answer: 3,
    explain: "Надёжность достигается комбинацией механизмов. Ни один отдельный инструмент не закрывает все сбои."
  }
]);
