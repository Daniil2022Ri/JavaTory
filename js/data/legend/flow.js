/* Легенда: payment flow и State Machine — 34 вопроса */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-flow-001", category: "legend-payment-flow", level: "middle",
    q: "С какого шага начинается обработка нового платежа?",
    options: [
      "POST /api/v1/payments в payment-initiation-service",
      "Публикация payment.status.updated",
      "Отправка webhook мерчанту",
      "Расчет комиссии"
    ],
    answer: 0,
    explain: "Клиент вызывает POST /api/v1/payments. Дальше валидируются API key, баланс и формат, создается payment и outbox-запись."
  },
  {
    id: "lg-flow-002", category: "legend-payment-flow", level: "middle",
    q: "Что проверяется при инициации платежа?",
    options: [
      "Только длина paymentId",
      "API key, баланс мерчанта и формат запроса",
      "Только наличие Kafka",
      "Только версия PostgreSQL"
    ],
    answer: 1,
    explain: "В легенде указаны валидация API key, проверка баланса мерчанта и формата запроса до создания платежа."
  },
  {
    id: "lg-flow-003", category: "legend-payment-flow", level: "senior",
    q: "Что создается в одной транзакции при инициации платежа?",
    options: [
      "Только запись в Redis",
      "Только Kafka-сообщение",
      "Запись payment и запись payment_outbox",
      "Webhook и audit-файл"
    ],
    answer: 2,
    explain: "Атомарность БД-изменения и outbox-события — основа надёжной публикации. Kafka в этой транзакции не участвует."
  },
  {
    id: "lg-flow-004", category: "legend-payment-flow", level: "middle",
    q: "Какое событие публикует outbox-relay после создания платежа?",
    options: [
      "payment.initiated",
      "payment.status.updated",
      "notification.DLT",
      "fee.calculated.completed"
    ],
    answer: 0,
    explain: "Relay читает PENDING-событие payment.initiated и публикует его в Kafka. Только после этого routing-service начинает маршрутизацию."
  },
  {
    id: "lg-flow-005", category: "legend-payment-flow", level: "senior",
    q: "Что используется в качестве ключа партиции для payment.initiated?",
    options: ["paymentId", "traceId", "providerId", "merchantId"],
    answer: 3,
    explain: "merchantId обеспечивает порядок обработки платежей одного мерчанта и разумное распределение по партициям."
  },
  {
    id: "lg-flow-006", category: "legend-payment-flow", level: "senior",
    q: "Какие headers передаются с Kafka-событиями?",
    options: [
      "Только content-type",
      "correlationId, traceId и idempotencyKey",
      "Только пароль и API key",
      "Только timestamp"
    ],
    answer: 1,
    explain: "Эти headers нужны для сквозной трассировки и защиты от повторной обработки. Они не заменяют payload и offset."
  },
  {
    id: "lg-flow-007", category: "legend-payment-flow", level: "senior",
    q: "Откуда routing-service загружает конфиг провайдеров?",
    options: [
      "Только из Kafka",
      "Только из памяти без обновления",
      "Сначала из Redis, при отсутствии — из PostgreSQL",
      "Из Grafana"
    ],
    answer: 2,
    explain: "Redis ускоряет чтение конфигов, PostgreSQL остаётся надёжным источником. При промахе кэша сервис идёт в БД."
  },
  {
    id: "lg-flow-008", category: "legend-payment-flow", level: "senior",
    q: "Что учитывается при scoring провайдера?",
    options: [
      "Комиссия, health status и success rate",
      "Только название банка",
      "Только размер Kafka-сообщения",
      "Только текущее время"
    ],
    answer: 0,
    explain: "Score балансирует стоимость, доступность и надёжность провайдера. На его основе строится fallback-chain."
  },
  {
    id: "lg-flow-009", category: "legend-payment-flow", level: "senior",
    q: "Что такое fallback-chain в маршрутизации?",
    options: [
      "Список всех мерчантов",
      "Очередь Kafka-партиций",
      "Список audit-событий",
      "Упорядоченный список провайдеров для повторной попытки при ошибке"
    ],
    answer: 3,
    explain: "Если основной провайдер недоступен или вернул ошибку, adapter пробует следующего из fallback-chain. Это повышает вероятность успешного платежа."
  },
  {
    id: "lg-flow-010", category: "legend-payment-flow", level: "senior",
    q: "Какой переход статуса происходит после маршрутизации?",
    options: [
      "INITIATED → SUCCESS",
      "ROUTING → PROCESSING",
      "PROCESSING → CANCELLED",
      "FAILED → ROUTING"
    ],
    answer: 1,
    explain: "После выбора провайдера платеж переходит из ROUTING в PROCESSING. Далее adapter обращается к внешнему API."
  },
  {
    id: "lg-flow-011", category: "legend-payment-flow", level: "middle",
    q: "Что публикует provider-adapter-service после вызова внешнего API?",
    options: [
      "payment.provider.response",
      "payment.initiated",
      "payment.fee.calculated",
      "notification.DLT"
    ],
    answer: 0,
    explain: "Adapter инкапсулирует протокол конкретного провайдера, применяет timeout/retry и публикует payment.provider.response с результатом."
  },
  {
    id: "lg-flow-012", category: "legend-payment-flow", level: "middle",
    q: "Какие протоколы используются для вызова внешнего провайдера?",
    options: ["REST/gRPC", "Только SOAP", "Только FTP", "Только SMTP"],
    answer: 0,
    explain: "В легенде указаны REST/gRPC. Конкретный протокол зависит от провайдера и скрыт за adapter'ом."
  },
  {
    id: "lg-flow-013", category: "legend-payment-flow", level: "senior",
    q: "Какой deadline устанавливался на вызов провайдера?",
    options: ["50 мс", "5 секунд", "30 секунд", "Около 500 мс"],
    answer: 3,
    explain: "Deadline около 500 мс не даёт медленному провайдеру занять потоки и ухудшить latency всего flow."
  },
  {
    id: "lg-flow-014", category: "legend-payment-flow", level: "senior",
    q: "Как организован retry при вызове провайдера?",
    options: [
      "Бесконечный retry без задержки",
      "Exponential backoff через Resilience4j",
      "Фиксированная задержка 1 мс",
      "Retry только для ошибок 400"
    ],
    answer: 1,
    explain: "Exponential backoff снижает давление на нестабильного провайдера. Retries ограничены, после чего включается fallback или PENDING."
  },
  {
    id: "lg-flow-015", category: "legend-payment-flow", level: "senior",
    q: "Что публикуется при ответе провайдера 200 OK?",
    options: [
      "Только audit.log",
      "notification.DLT",
      "payment.provider.response с результатом SUCCESS",
      "payment.initiated"
    ],
    answer: 2,
    explain: "Adapter публикует ответ провайдера в payment.provider.response. payment-processing-service обновляет статус и публикует следующие события."
  },
  {
    id: "lg-flow-016", category: "legend-payment-flow", level: "senior",
    q: "Что делают при ответе провайдера 4xx/5xx?",
    options: [
      "Пробуют fallback-провайдера",
      "Сразу переводят платеж в SUCCESS",
      "Удаляют платеж из PostgreSQL",
      "Останавливают Kafka"
    ],
    answer: 0,
    explain: "Fallback позволяет повысить success rate, но важно различать бизнес-отказ и техническую ошибку. Политика зависит от типа ответа."
  },
  {
    id: "lg-flow-017", category: "legend-payment-flow", level: "expert",
    q: "Что происходит при timeout вызова провайдера?",
    options: [
      "Платеж навсегда удаляется",
      "Платеж сразу становится FAILED",
      "Создается новый paymentId",
      "Платеж переходит в PENDING и запускается асинхронная проверка"
    ],
    answer: 3,
    explain: "При timeout статус операции неизвестен: провайдер мог принять платеж. Поэтому PENDING и последующий callback/polling безопаснее немедленного FAILED."
  },
  {
    id: "lg-flow-018", category: "legend-payment-flow", level: "senior",
    q: "Что проверяет payment-processing-service перед изменением статуса?",
    options: [
      "Только размер сообщения",
      "Redis processed key для идемпотентности",
      "Только наличие Grafana",
      "Только баланс мерчанта"
    ],
    answer: 1,
    explain: "Ключ processed:{paymentId} защищает от повторной обработки одного события. Дополнительно используются optimistic locking и unique constraints."
  },
  {
    id: "lg-flow-019", category: "legend-payment-flow", level: "senior",
    q: "Что происходит, если событие уже было обработано?",
    options: [
      "Платеж создается повторно",
      "Всегда публикуется DLT",
      "Событие пропускается без повторного изменения состояния",
      "Удаляется вся партиция"
    ],
    answer: 2,
    explain: "Идемпотентный consumer распознаёт дубль и пропускает обработку. Это критично при at-least-once доставке."
  },
  {
    id: "lg-flow-020", category: "legend-payment-flow", level: "senior",
    q: "Как защищается конкурентное обновление статуса платежа?",
    options: [
      "Optimistic locking по version",
      "Блокировкой всей таблицы payments",
      "Запретом транзакций",
      "Только Redis SET NX"
    ],
    answer: 0,
    explain: "@Version проверяется в UPDATE. При конфликте обновление не проходит, и операция может быть обработана повторно/разрешена по бизнес-правилам."
  },
  {
    id: "lg-flow-021", category: "legend-payment-flow", level: "senior",
    q: "Какие события публикуются при SUCCESS?",
    options: [
      "Только payment.initiated",
      "Только notification.DLT",
      "payment.routing.requested и payment.provider.response",
      "payment.status.updated и payment.fee.calculated"
    ],
    answer: 3,
    explain: "После успешного статуса запускается расчет комиссии. Затем notification-service получает статус и результат комиссии для webhook."
  },
  {
    id: "lg-flow-022", category: "legend-payment-flow", level: "senior",
    q: "Какие события публикуются при FAILED?",
    options: [
      "payment.fee.calculated и payment.routing.requested",
      "payment.status.updated и notification.triggered",
      "Только audit.log",
      "payment.initiated"
    ],
    answer: 1,
    explain: "Мерчант должен получить уведомление о неуспешном платеже. Комиссия при FAILED в описанном flow не начисляется."
  },
  {
    id: "lg-flow-023", category: "legend-payment-flow", level: "senior",
    q: "Что запускается для платежа в PENDING?",
    options: [
      "Немедленный возврат средств",
      "Удаление outbox-события",
      "Scheduler polling статуса примерно через 30 секунд",
      "Повторное создание платежа"
    ],
    answer: 2,
    explain: "Polling проверяет фактический статус у провайдера. Также возможен callback от провайдера; оба пути должны быть идемпотентны."
  },
  {
    id: "lg-flow-024", category: "legend-payment-flow", level: "middle",
    q: "Как рассчитывается комиссия?",
    options: [
      "Fixed amount + percentage + provider fee",
      "Только случайное число",
      "Только курс валют",
      "Только сумма НДС"
    ],
    answer: 0,
    explain: "Формула учитывает фиксированную часть, процент и комиссию провайдера. Тарифная сетка задаёт параметры расчета."
  },
  {
    id: "lg-flow-025", category: "legend-payment-flow", level: "senior",
    q: "Какое ограничение защищает от дублей комиссии?",
    options: [
      "Уникальность Kafka-топика",
      "Unique constraint по paymentId + feeType",
      "Индекс по createdAt",
      "Кэш браузера"
    ],
    answer: 1,
    explain: "Даже если событие пришло повторно, БД не даст создать вторую комиссию того же типа. Это финальный уровень идемпотентности."
  },
  {
    id: "lg-flow-026", category: "legend-payment-flow", level: "senior",
    q: "Что происходит с результатом комиссии в Redis?",
    options: [
      "Он хранится вечно",
      "Он не сохраняется",
      "Он удаляется сразу после записи",
      "Пишется ключ с TTL"
    ],
    answer: 3,
    explain: "Redis-ключ с TTL ускоряет проверку дублей, но не заменяет unique constraint в PostgreSQL. TTL ограничивает жизненный цикл кэша."
  },
  {
    id: "lg-flow-027", category: "legend-payment-flow", level: "middle",
    q: "Какие поля входят в webhook payload?",
    options: [
      "Только paymentId",
      "Только пароль мерчанта",
      "paymentId, status, amount, fee, timestamp",
      "Только Kafka offset"
    ],
    answer: 2,
    explain: "Payload должен давать мерчанту достаточно данных для проверки платежа и сверки. Подпись защищает его от подмены."
  },
  {
    id: "lg-flow-028", category: "legend-payment-flow", level: "senior",
    q: "Чем подписывается webhook?",
    options: ["HMAC-SHA256", "MD5 от пароля", "Base64 без ключа", "JWT без подписи"],
    answer: 0,
    explain: "HMAC-SHA256 с секретом мерчанта позволяет проверить целостность и авторство. Сравнение подписи должно быть защищено от timing-атак."
  },
  {
    id: "lg-flow-029", category: "legend-payment-flow", level: "senior",
    q: "Что происходит после успешного webhook-ответа 2xx?",
    options: [
      "Создается новый платеж",
      "Коммитится offset и платеж помечается notified=true",
      "Удаляется audit trail",
      "Сбрасывается Redis"
    ],
    answer: 1,
    explain: "Offset коммитится только после успешной доставки. notified=true фиксирует факт уведомления, а идемпотентность защищает от повторов."
  },
  {
    id: "lg-flow-030", category: "legend-payment-flow", level: "senior",
    q: "Как выполняется retry webhook?",
    options: [
      "Без задержки и без ограничений",
      "Только один раз",
      "С фиксированным интервалом 1 час",
      "С exponential backoff и jitter"
    ],
    answer: 3,
    explain: "Backoff снижает нагрузку, jitter разносит попытки разных сообщений. После лимита сообщение уходит в notification.DLT."
  },
  {
    id: "lg-flow-031", category: "legend-payment-flow", level: "senior",
    q: "Что происходит после исчерпания попыток доставки webhook?",
    options: [
      "Сообщение отправляется в notification.DLT",
      "Платеж удаляется из БД",
      "Мерчант получает пароль",
      "Kafka перезапускается"
    ],
    answer: 0,
    explain: "DLT сохраняет проблемное сообщение для анализа и ручного/автоматического replay. Бесконечно ретраить нельзя — это блокирует прогресс."
  },
  {
    id: "lg-flow-032", category: "legend-payment-flow", level: "middle",
    q: "Что происходит с ключевыми событиями для audit-service?",
    options: [
      "Они игнорируются",
      "Они хранятся только в Redis",
      "Они дублируются в audit.log и пишутся batch-ами в audit_events",
      "Они удаляются после webhook"
    ],
    answer: 2,
    explain: "Audit trail нужен для расследований, compliance и восстановления цепочки. Batch insert снижает стоимость записи."
  },
  {
    id: "lg-flow-033", category: "legend-payment-flow", level: "expert",
    q: "Что проверяют guard conditions перед сменой статуса?",
    options: [
      "Только размер JSON",
      "Текущий статус, новый статус, допустимость перехода, устаревание и повторную обработку события",
      "Только наличие API key",
      "Только время суток"
    ],
    answer: 1,
    explain: "Guard conditions защищают State Machine от недопустимых и устаревших переходов. Дополнительно используется optimistic locking."
  },
  {
    id: "lg-flow-034", category: "legend-payment-flow", level: "expert",
    q: "Почему при обработке ответа провайдера важно проверять устаревание события?",
    options: [
      "Чтобы уменьшить размер БД",
      "Чтобы ускорить Kafka",
      "Чтобы не отправить webhook раньше времени",
      "Чтобы поздний ответ не перезаписал более актуальный финальный статус"
    ],
    answer: 3,
    explain: "События могут прийти не по порядку или повторно. Проверка версии/статуса не даёт старому ответу откатить SUCCESS обратно в PROCESSING."
  }
]);
