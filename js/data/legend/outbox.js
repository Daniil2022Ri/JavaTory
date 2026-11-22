/* Легенда: Outbox и идемпотентность — 32 вопроса */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-out-001", category: "legend-outbox", level: "senior",
    q: "Какая проблема возникает, если сначала записать платеж в БД, а потом публиковать событие в Kafka?",
    options: [
      "Kafka автоматически откатит БД",
      "БД перестанет быть source of truth",
      "Платеж может быть создан, а событие потеряно при недоступности Kafka",
      "Возникнет ошибка компиляции"
    ],
    answer: 2,
    explain: "Две системы не участвуют в одной ACID-транзакции. Сбой между коммитом БД и публикацией приводит к рассинхронизации."
  },
  {
    id: "lg-out-002", category: "legend-outbox", level: "senior",
    q: "Что плохого в обратном порядке: сначала Kafka, потом запись в БД?",
    options: [
      "Kafka не поддерживает JSON",
      "Downstream может увидеть платеж, которого нет в PostgreSQL",
      "Сообщение всегда теряется",
      "PostgreSQL не умеет откатываться"
    ],
    answer: 1,
    explain: "Если после публикации упасть до записи, событие уже ушло. Outbox решает обе стороны проблемы, фиксируя событие вместе с бизнес-данными."
  },
  {
    id: "lg-out-003", category: "legend-outbox", level: "middle",
    q: "Что записывается в одной транзакции при использовании Transactional Outbox?",
    options: [
      "payment и payment_outbox",
      "Только Kafka offset",
      "Только запись в Redis",
      "Только audit-файл"
    ],
    answer: 0,
    explain: "Бизнес-изменение и outbox-событие коммитятся атомарно. Relay публикует событие позже."
  },
  {
    id: "lg-out-004", category: "legend-outbox", level: "middle",
    q: "Какие статусы проходит outbox-событие по легенде?",
    options: [
      "NEW, OLD, DELETED",
      "PENDING, SENT, FAILED",
      "OPEN, CLOSED",
      "CREATED, PAID"
    ],
    answer: 1,
    explain: "PENDING — ожидает публикации, SENT — опубликовано, FAILED — превышен лимит попыток. Статусы нужны для мониторинга и восстановления."
  },
  {
    id: "lg-out-005", category: "legend-outbox", level: "middle",
    q: "Что читает outbox-relay-service?",
    options: [
      "Все строки payments без фильтра",
      "Только SENT-события",
      "PENDING-события из payment_outbox",
      "Сообщения из notification.DLT"
    ],
    answer: 2,
    explain: "Relay забирает неопубликованные события, публикует в Kafka и обновляет их статус. Повторный опрос обеспечивает восстановление после сбоя."
  },
  {
    id: "lg-out-006", category: "legend-outbox", level: "senior",
    q: "Что делает relay после успешной публикации события?",
    options: [
      "Удаляет платеж",
      "Меняет статус на SENT",
      "Сбрасывает весь Redis",
      "Создает новый paymentId"
    ],
    answer: 1,
    explain: "SENT фиксирует факт публикации. Если процесс упадёт между публикацией и сменой статуса, событие может уйти повторно — consumer должен быть идемпотентным."
  },
  {
    id: "lg-out-007", category: "legend-outbox", level: "senior",
    q: "Что происходит при ошибке публикации outbox-события?",
    options: [
      "retryCount увеличивается",
      "Событие сразу удаляется",
      "Платеж откатывается",
      "Статус сразу становится SENT"
    ],
    answer: 0,
    explain: "RetryCount позволяет ограничить число попыток и увидеть проблемные записи. После лимита событие переходит в FAILED."
  },
  {
    id: "lg-out-008", category: "legend-outbox", level: "senior",
    q: "Когда outbox-событие переходит в FAILED?",
    options: [
      "Сразу после создания",
      "После первого чтения relay",
      "После успешной публикации",
      "После превышения лимита попыток"
    ],
    answer: 3,
    explain: "FAILED требует внимания: автоматический retry исчерпан. Нужны алерты, разбор причины и стратегия повторной публикации."
  },
  {
    id: "lg-out-009", category: "legend-outbox", level: "senior",
    q: "Какие метрики Outbox важно мониторить?",
    options: [
      "Только размер таблицы payments",
      "Количество PENDING, возраст старейшего PENDING, retryCount и FAILED",
      "Только число пользователей Grafana",
      "Только версию Spring Boot"
    ],
    answer: 1,
    explain: "Возраст старейшего PENDING показывает задержку публикации, FAILED — накопление проблем. Это важнее простого количества событий."
  },
  {
    id: "lg-out-010", category: "legend-outbox", level: "expert",
    q: "Почему алерт настроен на PENDING outbox events старше 5 минут?",
    options: [
      "Чтобы удалять старые события",
      "Чтобы отключать Kafka",
      "Чтобы заметить застрявшую публикацию до того, как платежи надолго зависнут в INITIATED",
      "Чтобы ускорить PostgreSQL"
    ],
    answer: 2,
    explain: "Сам по себе размер очереди может колебаться. Возраст записи прямо показывает, что relay не справляется или Kafka недоступна."
  },
  {
    id: "lg-out-011", category: "legend-outbox", level: "senior",
    q: "Какую гарантию доставки даёт outbox вместе с relay?",
    options: [
      "At-most-once",
      "At-least-once",
      "Физический exactly-once без идемпотентности",
      "Гарантию без повторов"
    ],
    answer: 1,
    explain: "Публикация может повториться при сбое между отправкой и сменой статуса. Поэтому downstream должен быть идемпотентным."
  },
  {
    id: "lg-out-012", category: "legend-outbox", level: "senior",
    q: "Почему consumer обязан быть идемпотентным при outbox-подходе?",
    options: [
      "Kafka запрещает повторную доставку",
      "Outbox всегда теряет события",
      "Повторная публикация или перечитывание сообщения может привести к повторной обработке",
      "Потому что PostgreSQL не поддерживает транзакции"
    ],
    answer: 2,
    explain: "At-least-once доставка допускает дубли. Идемпотентность на уровне Redis, unique constraints и optimistic locking защищает бизнес-эффект."
  },
  {
    id: "lg-out-013", category: "legend-outbox", level: "middle",
    q: "Как работает идемпотентность на уровне API Gateway?",
    options: [
      "Клиент передаёт idempotencyKey, а Redis выполняет SET NX",
      "Сервер хранит все запросы в Kafka",
      "Клиент передаёт пароль",
      "Запросы дедуплицируются по размеру тела"
    ],
    answer: 0,
    explain: "SET NX атомарно создаёт ключ только при его отсутствии. Повтор с тем же ключом не должен создавать новый платеж."
  },
  {
    id: "lg-out-014", category: "legend-outbox", level: "senior",
    q: "Что означает Redis-команда SET NX?",
    options: [
      "Записать значение всегда",
      "Записать значение, только если ключа ещё нет",
      "Удалить ключ",
      "Увеличить TTL"
    ],
    answer: 1,
    explain: "NX = Not eXists. Атомарность важна, иначе два конкурентных запроса с одним ключом могли бы оба пройти проверку."
  },
  {
    id: "lg-out-015", category: "legend-outbox", level: "senior",
    q: "Что должно произойти при повторном запросе с уже использованным idempotencyKey?",
    options: [
      "Создается второй платеж",
      "Изменяется API key",
      "Повторный запрос не создает новый платеж",
      "Удаляется outbox"
    ],
    answer: 2,
    explain: "Клиент должен получить результат исходной операции или понятный ответ о дубле. Ключ хранится с TTL и защищается финальными ограничениями БД."
  },
  {
    id: "lg-out-016", category: "legend-outbox", level: "senior",
    q: "Какой TTL использовался для ключа processed:{paymentId} после инцидента?",
    options: ["30 минут", "1 час", "24 часа", "30 дней"],
    answer: 2,
    explain: "Изначально TTL был 30 минут, что привело к дублям после перезапуска. После исправления TTL увеличили до 24 часов."
  },
  {
    id: "lg-out-017", category: "legend-outbox", level: "expert",
    q: "Почему для финансовой идемпотентности недостаточно только Redis?",
    options: [
      "Redis не поддерживает TTL",
      "Ключ может протухнуть, Redis может перезапуститься или быть недоступен",
      "Redis не умеет SET NX",
      "PostgreSQL не поддерживает unique constraints"
    ],
    answer: 1,
    explain: "Кэш — не финальная гарантия. Unique constraints и optimistic locking в PostgreSQL остаются последним уровнем защиты финансовых операций."
  },
  {
    id: "lg-out-018", category: "legend-outbox", level: "middle",
    q: "Какое ограничение в PostgreSQL защищает комиссию от дублей?",
    options: [
      "Unique constraint по paymentId + feeType",
      "Индекс по дате",
      "CHECK на положительную сумму",
      "FOREIGN KEY на Kafka"
    ],
    answer: 0,
    explain: "Комиссия одного типа для одного платежа должна существовать в единственном экземпляре. База гарантирует это даже при повторной обработке."
  },
  {
    id: "lg-out-019", category: "legend-outbox", level: "senior",
    q: "Зачем нужен unique constraint для external event id?",
    options: [
      "Чтобы сортировать события",
      "Чтобы ускорить Grafana",
      "Чтобы повторное внешнее событие не создало вторую бизнес-запись",
      "Чтобы заменить Kafka"
    ],
    answer: 2,
    explain: "Внешний идентификатор может прийти повторно. Уникальность в БД делает обработку идемпотентной независимо от состояния кэша."
  },
  {
    id: "lg-out-020", category: "legend-outbox", level: "senior",
    q: "Как используется optimistic locking в контексте идемпотентности?",
    options: [
      "Блокирует таблицу навсегда",
      "Проверяет version при UPDATE и не даёт конкурентно перезаписать состояние",
      "Удаляет старые версии",
      "Заменяет unique constraint"
    ],
    answer: 1,
    explain: "Optimistic locking защищает от lost update и устаревших событий. Он дополняет, а не заменяет уникальные ограничения."
  },
  {
    id: "lg-out-021", category: "legend-outbox", level: "senior",
    q: "Где применялся `ON CONFLICT DO NOTHING`?",
    options: [
      "При записи audit-событий",
      "При отправке webhook",
      "При чтении Kafka",
      "При расчете комиссии"
    ],
    answer: 0,
    explain: "Audit-события могут дублироваться при повторном чтении. ON CONFLICT DO NOTHING делает вставку безопасной при наличии уникального ключа."
  },
  {
    id: "lg-out-022", category: "legend-outbox", level: "senior",
    q: "Что означает обработка duplicate key как safe duplicate?",
    options: [
      "Ошибка игнорируется, а состояние считается уже корректно записанным",
      "Платеж удаляется",
      "Kafka останавливается",
      "Всегда генерируется новый id"
    ],
    answer: 0,
    explain: "Если unique constraint сработал, значит запись уже есть. Это ожидаемый результат повторной обработки, а не повод падать."
  },
  {
    id: "lg-out-023", category: "legend-outbox", level: "middle",
    q: "Сколько транзакций пострадало от дублирования комиссий в инциденте?",
    options: ["Около 2", "Около 20", "Около 200", "Около 20 000"],
    answer: 2,
    explain: "В легенде указано примерно 200 транзакций. Инцидент выявил недостаточность короткого TTL Redis."
  },
  {
    id: "lg-out-024", category: "legend-outbox", level: "expert",
    q: "Какова была причина дублирования комиссий?",
    options: [
      "Kafka потеряла сообщения",
      "TTL idempotency key 30 минут, перезапуск consumer и повторное чтение после истечения ключей",
      "PostgreSQL не поддерживал транзакции",
      "Ошибка в Grafana"
    ],
    answer: 1,
    explain: "При перезапуске сообщения перечитались, но Redis-ключи уже протухли. Consumer обработал те же события повторно."
  },
  {
    id: "lg-out-025", category: "legend-outbox", level: "senior",
    q: "Какие изменения вошли в исправление инцидента с комиссиями?",
    options: [
      "Отключение Kafka",
      "Только удаление Redis",
      "TTL 24 часа, unique constraint, safe duplicate, корректирующий скрипт и тест на redelivery",
      "Переход на монолит"
    ],
    answer: 2,
    explain: "Исправление было многоуровневым: кэш, БД, обработка ошибок, миграция данных и регрессионный тест."
  },
  {
    id: "lg-out-026", category: "legend-outbox", level: "senior",
    q: "Что именно проверял регрессионный тест после инцидента?",
    options: [
      "Скорость Grafana",
      "Повторную доставку сообщения после истечения Redis TTL",
      "Перезапуск Camunda",
      "Размер Kafka-сегмента"
    ],
    answer: 1,
    explain: "Тест воспроизводил реальный сценарий: повторная доставка после истечения ключа не должна создавать дубль комиссии."
  },
  {
    id: "lg-out-027", category: "legend-outbox", level: "expert",
    q: "Что означает effectively-once в легенде?",
    options: [
      "Физически ровно одна доставка на уровне сети",
      "Exactly-once на уровне Kafka producer без участия БД",
      "Отказ от идемпотентности",
      "Бизнес-эффект ровно один раз достигается комбинацией outbox, идемпотентности и ограничений БД"
    ],
    answer: 3,
    explain: "В распределённой системе нельзя гарантировать одну физическую доставку и одну запись во все системы. Эффект делают однократным на уровне бизнеса."
  },
  {
    id: "lg-out-028", category: "legend-outbox", level: "senior",
    q: "Почему consumer коммитит offset вручную?",
    options: [
      "Чтобы отправить offset в Grafana",
      "Чтобы подтвердить обработку только после успешной записи состояния в PostgreSQL",
      "Чтобы ускорить rebalance",
      "Чтобы отключить идемпотентность"
    ],
    answer: 1,
    explain: "Ручной commit после успешной обработки даёт at-least-once. При падении до commit сообщение перечитается, но идемпотентность защитит от дублей."
  },
  {
    id: "lg-out-029", category: "legend-outbox", level: "expert",
    q: "Что покрывает идемпотентный producer Kafka?",
    options: [
      "Повторные записи одного producer в пределах партиции/сессии",
      "Дубли во внешнем webhook",
      "Повторную обработку consumer'ом",
      "Дубли комиссии в PostgreSQL"
    ],
    answer: 0,
    explain: "Idempotent producer дедуплицирует retries на стороне Kafka. Он не заменяет идемпотентность consumer'а, unique constraints и проверку Redis."
  },
  {
    id: "lg-out-030", category: "legend-outbox", level: "senior",
    q: "Почему нельзя просто использовать Kafka transactions вместо outbox?",
    options: [
      "Kafka transactions невозможны в Java",
      "Транзакция Kafka не охватывает запись в PostgreSQL и не решает dual-write между БД и брокером",
      "Kafka transactions всегда медленнее PostgreSQL",
      "Из-за отсутствия SSL"
    ],
    answer: 1,
    explain: "Kafka-транзакция атомарна внутри Kafka, но не делает атомарными БД и внешние системы. Outbox решает именно эту границу."
  },
  {
    id: "lg-out-031", category: "legend-outbox", level: "expert",
    q: "Какое окно остаётся уязвимым при записи в Redis SET NX и последующем создании платежа?",
    options: [
      "Ключ истёк до создания платежа",
      "Kafka недоступна",
      "Процесс упал после установки ключа, но до коммита платежа — повтор может получить ключ без результата",
      "PostgreSQL перезапустился"
    ],
    answer: 2,
    explain: "Поэтому идемпотентность должна иметь состояние/срок и стратегию восстановления. Ключ не должен навсегда блокировать повтор, а БД остаётся финальной защитой."
  },
  {
    id: "lg-out-032", category: "legend-outbox", level: "senior",
    q: "Почему outbox-relay-service вынесен в отдельный процесс?",
    options: [
      "Чтобы он мог независимо опрашивать очередь и восстанавливаться, не блокируя создание платежей",
      "Чтобы убрать PostgreSQL",
      "Чтобы обойти Kafka security",
      "Чтобы считать комиссию"
    ],
    answer: 0,
    explain: "Отдельный relay упрощает масштабирование, мониторинг и восстановление публикации. Основной сервис не зависит от доступности Kafka в момент запроса."
  }
]);
