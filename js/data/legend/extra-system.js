/* Дополнительно: System Design, Kafka, БД — 36 вопросов */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-sys-001", category: "legend-extra-system", level: "senior",
    q: "Чем Transactional Outbox лучше распределённой 2PC-транзакции для БД и Kafka?",
    options: [
      "Outbox не требует блокирующего координатора и работает через локальную транзакцию + асинхронную публикацию",
      "Outbox гарантирует физический exactly-once",
      "2PC проще масштабируется",
      "Outbox не использует БД"
    ],
    answer: 0,
    explain: "2PC повышает связанность и может блокировать участников. Outbox жертвует мгновенной публикацией ради надёжности и масштабируемости."
  },
  {
    id: "lg-sys-002", category: "legend-extra-system", level: "senior",
    q: "Что такое saga в микросервисной архитектуре?",
    options: [
      "Одна ACID-транзакция на все сервисы",
      "Последовательность локальных транзакций с компенсациями",
      "Тип Kafka-топика",
      "HTTP-аутентификация"
    ],
    answer: 1,
    explain: "Saga обеспечивает согласованность в конечном счёте через компенсирующие действия. Она не даёт мгновенной атомарности распределённой транзакции."
  },
  {
    id: "lg-sys-003", category: "legend-extra-system", level: "expert",
    q: "Почему в распределённой системе корректнее говорить об effectively-once, а не exactly-once?",
    options: [
      "Kafka не умеет считать",
      "Exactly-once невозможен даже в одной БД",
      "Физическая доставка и запись во все системы не могут быть гарантированно однократными без идемпотентности",
      "Это одно и то же"
    ],
    answer: 2,
    explain: "Сеть и сбои делают ровно одну доставку недоказуемой на всех границах. Бизнес-эффект делают однократным через дедупликацию и уникальные ограничения."
  },
  {
    id: "lg-sys-004", category: "legend-extra-system", level: "senior",
    q: "Зачем нужен API Gateway?",
    options: [
      "Для хранения платежей",
      "Для единой точки аутентификации, маршрутизации и rate limiting",
      "Для расчета комиссии",
      "Для Kafka Streams"
    ],
    answer: 1,
    explain: "Gateway упрощает клиентов и централизует cross-cutting concerns. Он не должен становиться местом хранения бизнес-состояния."
  },
  {
    id: "lg-sys-005", category: "legend-extra-system", level: "senior",
    q: "Что такое rate limiting?",
    options: [
      "Ограничение числа запросов за интервал для защиты системы",
      "Ограничение размера БД",
      "Сжатие Kafka-сообщений",
      "Тип индекса"
    ],
    answer: 0,
    explain: "Rate limiting защищает от перегрузки и злоупотреблений. Важно корректно возвращать 429 и Retry-After."
  },
  {
    id: "lg-sys-006", category: "legend-extra-system", level: "expert",
    q: "Почему retry budget полезен?",
    options: [
      "Он увеличивает число ретраев до бесконечности",
      "Он ограничивает долю повторных попыток, чтобы не усилить перегрузку зависимости",
      "Он заменяет circuit breaker",
      "Он отключает таймауты"
    ],
    answer: 1,
    explain: "При массовом сбое неограниченные retry создают шторм. Budget ограничивает дополнительную нагрузку и помогает восстановлению."
  },
  {
    id: "lg-sys-007", category: "legend-extra-system", level: "senior",
    q: "Какие состояния у circuit breaker?",
    options: [
      "Fast, slow, stopped",
      "Closed, open, half-open",
      "Start, finish, retry",
      "Red, yellow, green"
    ],
    answer: 1,
    explain: "Closed пропускает запросы, open отклоняет, half-open проверяет восстановление ограниченным трафиком."
  },
  {
    id: "lg-sys-008", category: "legend-extra-system", level: "senior",
    q: "Что такое bulkhead?",
    options: [
      "Изоляция ресурсов по зависимостям, чтобы сбой одной не исчерпал все",
      "Тип шифрования",
      "Очередь Kafka",
      "Индекс PostgreSQL"
    ],
    answer: 0,
    explain: "Отдельные пулы потоков/семафоры не дают медленной интеграции занять все ресурсы сервиса."
  },
  {
    id: "lg-sys-009", category: "legend-extra-system", level: "senior",
    q: "Что такое timeout budget?",
    options: [
      "Бюджет на покупку серверов",
      "Максимальное время обработки запроса, распределённое между внутренними вызовами",
      "Размер Kafka batch",
      "Количество ретраев"
    ],
    answer: 1,
    explain: "Если общий бюджет 1 секунда, внутренние вызовы должны укладываться в него. Иначе один медленный шаг ломает SLA запроса."
  },
  {
    id: "lg-sys-010", category: "legend-extra-system", level: "senior",
    q: "Что ограничивает максимальный параллелизм consumer group?",
    options: [
      "Количество партиций",
      "Размер JSON",
      "Число producer",
      "Retention"
    ],
    answer: 0,
    explain: "Одну партицию в группе читает один consumer. Больше consumer'ов, чем партиций, обычно простаивают."
  },
  {
    id: "lg-sys-011", category: "legend-extra-system", level: "middle",
    q: "Что произойдёт при replication factor 3 и потере одного брокера?",
    options: [
      "Топик удалится",
      "Данные будут недоступны",
      "Оставшиеся реплики сохранят доступность при достаточном ISR",
      "Все offsets обнулятся"
    ],
    answer: 2,
    explain: "Репликация повышает отказоустойчивость. Если лидер упал, новый выбирается из синхронизированных реплик."
  },
  {
    id: "lg-sys-012", category: "legend-extra-system", level: "expert",
    q: "Что означает `min.insync.replicas=2` при acks=all?",
    options: [
      "Producer не сможет писать, если в ISR меньше двух реплик",
      "Всегда нужны два consumer'а",
      "Данные хранятся вечно",
      "Партиция будет только одна"
    ],
    answer: 0,
    explain: "Это защита durability. Кластер предпочтёт отказать в записи, чтобы не подтвердить данные, которые могут потеряться."
  },
  {
    id: "lg-sys-013", category: "legend-extra-system", level: "senior",
    q: "Зачем нужен Schema Registry?",
    options: [
      "Для хранения offsets",
      "Для проверки совместимости эволюции схем Avro/Protobuf/JSON",
      "Для балансировки партиций",
      "Для сжатия"
    ],
    answer: 1,
    explain: "Registry централизует схемы и политику совместимости, снижая риск сломать consumer'ов при изменении формата."
  },
  {
    id: "lg-sys-014", category: "legend-extra-system", level: "senior",
    q: "Что такое poison message?",
    options: [
      "Сообщение с большим ключом",
      "Сообщение, которое стабильно не обрабатывается и может блокировать партицию",
      "Сообщение с истёкшим TTL",
      "Сообщение без offset"
    ],
    answer: 1,
    explain: "Его нужно изолировать в DLT после ограниченных retries, иначе обработчик будет бесконечно падать на одном сообщении."
  },
  {
    id: "lg-sys-015", category: "legend-extra-system", level: "senior",
    q: "Что такое backpressure?",
    options: [
      "Механизм сигнализирования о перегрузке и ограничении входящего потока",
      "Сжатие Kafka",
      "Резервное копирование",
      "Шифрование HMAC"
    ],
    answer: 0,
    explain: "Ограниченные очереди, rate limiting и отказ/замедление помогают не переполнить память и не деградировать бесконечно."
  },
  {
    id: "lg-sys-016", category: "legend-extra-system", level: "expert",
    q: "Как защитить webhook от replay-атаки?",
    options: [
      "Проверять timestamp и отклонять слишком старые подписи, хранить nonce/id",
      "Отключить HTTPS",
      "Использовать GET",
      "Хранить секрет в URL"
    ],
    answer: 0,
    explain: "Подпись подтверждает целостность, но не защищает от повторной отправки. Timestamp и nonce ограничивают окно replay."
  },
  {
    id: "lg-sys-017", category: "legend-extra-system", level: "senior",
    q: "Почему нельзя слепо доверять merchant_webhook_url?",
    options: [
      "Он всегда слишком длинный",
      "Он может указывать на внутренний адрес и привести к SSRF",
      "Он не поддерживает HTTPS",
      "Он ломает Kafka"
    ],
    answer: 1,
    explain: "Нужно валидировать схему, хост и блокировать внутренние диапазоны, чтобы сервис не стал инструментом SSRF."
  },
  {
    id: "lg-sys-018", category: "legend-extra-system", level: "expert",
    q: "Что должно быть областью действия idempotencyKey?",
    options: [
      "Глобально для всех мерчантов навсегда",
      "Только в пределах одного HTTP-соединения",
      "В пределах мерчанта/операции и ограниченного времени",
      "Только в Redis без TTL"
    ],
    answer: 2,
    explain: "Ключ должен однозначно идентифицировать попытку операции. Бессрочное глобальное хранение приведёт к коллизиям и росту данных."
  },
  {
    id: "lg-sys-019", category: "legend-extra-system", level: "senior",
    q: "Когда оптимистичная блокировка может быть плохим выбором?",
    options: [
      "При очень высокой конкуренции за одну строку и дорогом повторе",
      "При низкой конкуренции",
      "Когда данные только читаются",
      "Когда используется @Version"
    ],
    answer: 0,
    explain: "Постоянные конфликты приводят к множеству retry. В таких горячих точках может быть лучше пессимистичная блокировка или очередь."
  },
  {
    id: "lg-sys-020", category: "legend-extra-system", level: "senior",
    q: "Для чего нужен составной индекс `(merchant_id, created_at)`?",
    options: [
      "Для поиска по created_at без merchant_id",
      "Для фильтра по merchant_id и сортировки/диапазона по created_at",
      "Для шифрования",
      "Для Kafka"
    ],
    answer: 1,
    explain: "Порядок колонок соответствует левому префиксу и сортировке. Он помогает запросам истории платежей мерчанта."
  },
  {
    id: "lg-sys-021", category: "legend-extra-system", level: "senior",
    q: "Почему keyset pagination лучше OFFSET на больших объёмах?",
    options: [
      "Не нужно пропускать все предыдущие строки",
      "Она всегда требует меньше индексов",
      "OFFSET не поддерживается SQL",
      "Она сортирует данные магически"
    ],
    answer: 0,
    explain: "Курсор по индексированному ключу продолжает с последней позиции. OFFSET деградирует с ростом смещения."
  },
  {
    id: "lg-sys-022", category: "legend-extra-system", level: "senior",
    q: "Как обычно решают N+1 в JPA?",
    options: [
      "Отключением транзакций",
      "Увеличением пула потоков",
      "Join fetch/EntityGraph, batch fetching или DTO-проекцией",
      "Добавлением sleep"
    ],
    answer: 2,
    explain: "Нужно уменьшить число запросов, а не просто ускорить их. Иногда осознанно оставляют несколько запросов, если это дешевле сложного join."
  },
  {
    id: "lg-sys-023", category: "legend-extra-system", level: "senior",
    q: "Как работает cache-aside?",
    options: [
      "Приложение читает кэш, при промахе — источник, затем заполняет кэш",
      "Кэш сам всегда пишет в БД",
      "БД читает кэш",
      "Kafka заменяет кэш"
    ],
    answer: 0,
    explain: "Популярная стратегия, но нужно управлять TTL и инвалидацией. Возможны stale-данные и stampede."
  },
  {
    id: "lg-sys-024", category: "legend-extra-system", level: "expert",
    q: "Что должна делать система при недоступности Redis?",
    options: [
      "Терять все платежи",
      "Отключать БД",
      "Продолжать критическую операцию с опорой на БД или явно деградировать",
      "Игнорировать ошибку без логирования"
    ],
    answer: 2,
    explain: "Redis — кэш/ускоритель, а не единственный source of truth. Нужна политика fallback и защита от блокировки операций."
  },
  {
    id: "lg-sys-025", category: "legend-extra-system", level: "expert",
    q: "Что такое cache stampede?",
    options: [
      "Много параллельных промахов, одновременно нагружающих БД пересчётом",
      "Автоматическое удаление кэша",
      "Сжатие Redis",
      "Рост числа партиций"
    ],
    answer: 0,
    explain: "Решения: single-flight, распределённая блокировка, jitter TTL, early refresh."
  },
  {
    id: "lg-sys-026", category: "legend-extra-system", level: "senior",
    q: "Зачем нужна distributed lock?",
    options: [
      "Для сериализации критической секции между инстансами",
      "Для замены Kafka",
      "Для шифрования",
      "Для сортировки"
    ],
    answer: 0,
    explain: "Блокировка снижает гонки, но требует TTL, fencing token и обработки потери блокировки. Для финансов лучше опираться на БД-ограничения."
  },
  {
    id: "lg-sys-027", category: "legend-extra-system", level: "expert",
    q: "Что такое reconciliation в платёжной системе?",
    options: [
      "Сверка внутренних записей с внешними отчётами провайдера/банка",
      "Сжатие логов",
      "Разбиение Kafka",
      "Удаление старых алертов"
    ],
    answer: 0,
    explain: "Reconciliation находит расхождения, зависшие платежи и потерянные события. Это обязательный контур надёжности."
  },
  {
    id: "lg-sys-028", category: "legend-extra-system", level: "senior",
    q: "Что такое distributed tracing?",
    options: [
      "Хранение всех платежей",
      "Набор span'ов с traceId для отслеживания пути запроса через сервисы",
      "Тип индекса",
      "Способ сжатия"
    ],
    answer: 1,
    explain: "Trace context передаётся через HTTP/Kafka headers. Spans показывают тайминги и зависимости."
  },
  {
    id: "lg-sys-029", category: "legend-extra-system", level: "senior",
    q: "Что означает SLO?",
    options: [
      "Service Level Objective — целевой уровень качества услуги",
      "Тип Kafka-топика",
      "SQL-оператор",
      "Формат сериализации"
    ],
    answer: 0,
    explain: "SLO задаёт измеримую цель (например, 99.9% успешных запросов). Error budget помогает балансировать релизы и надёжность."
  },
  {
    id: "lg-sys-030", category: "legend-extra-system", level: "senior",
    q: "Зачем проводить нагрузочное тестирование платёжного flow?",
    options: [
      "Чтобы проверить деградацию latency/throughput и найти bottleneck до production",
      "Чтобы заменить тесты",
      "Чтобы шифровать трафик",
      "Чтобы удалить Kafka"
    ],
    answer: 0,
    explain: "Нагрузка выявляет проблемы пулов, БД, GC и топиков. Сценарии должны включать пики и отказы зависимостей."
  },
  {
    id: "lg-sys-031", category: "legend-extra-system", level: "expert",
    q: "Что проверяют chaos-тесты?",
    options: [
      "Только синтаксис Java",
      "Поведение системы при отказах зависимостей, сети, подов и дисков",
      "Скорость компиляции",
      "Верстку"
    ],
    answer: 1,
    explain: "Chaos engineering проверяет устойчивость и восстановление. Начинают с контролируемых экспериментов и наблюдают метрики."
  },
  {
    id: "lg-sys-032", category: "legend-extra-system", level: "senior",
    q: "Чем blue-green deployment отличается от canary?",
    options: [
      "Blue-green переключает трафик между двумя средами, canary постепенно направляет долю трафика",
      "Canary всегда переключает 100%",
      "Blue-green не позволяет откатиться",
      "Это синонимы"
    ],
    answer: 0,
    explain: "Blue-green даёт быстрый rollback ценой двойных ресурсов. Canary снижает риск, но требует совместимости версий и метрик."
  },
  {
    id: "lg-sys-033", category: "legend-extra-system", level: "senior",
    q: "Что важно при эволюции схемы Kafka-события?",
    options: [
      "Всегда удалять старые поля",
      "Обеспечить обратную/прямую совместимость и версионирование",
      "Менять формат без предупреждения",
      "Хранить схему только в коде consumer'а"
    ],
    answer: 1,
    explain: "Consumer'ы могут быть развёрнуты не одновременно. Новые поля лучше делать опциональными, а breaking changes — через новую версию."
  },
  {
    id: "lg-sys-034", category: "legend-extra-system", level: "senior",
    q: "Какая стратегия помогает при потере сообщения из Kafka?",
    options: [
      "Outbox + сверка/reconciliation и повторная публикация",
      "Увеличить JVM heap",
      "Отключить consumer lag",
      "Удалить audit"
    ],
    answer: 0,
    explain: "Outbox предотвращает потерю на границе БД/Kafka. Reconciliation ловит расхождения, которые всё равно могли возникнуть."
  },
  {
    id: "lg-sys-035", category: "legend-extra-system", level: "senior",
    q: "Зачем нужны liveness и readiness probes?",
    options: [
      "Readiness убирает под из балансировки, liveness перезапускает зависший процесс",
      "Оба только логируют",
      "Liveness убирает из трафика, readiness перезапускает",
      "Они заменяют мониторинг"
    ],
    answer: 0,
    explain: "Readiness отражает готовность принимать трафик, liveness — необходимость restart. Ошибки в них могут вызвать каскад."
  },
  {
    id: "lg-sys-036", category: "legend-extra-system", level: "expert",
    q: "Почему для финансовой идемпотентности недостаточно только распределённой блокировки?",
    options: [
      "Блокировка может потеряться/истечь, а процесс — продолжить работу; нужна финальная проверка в БД",
      "Блокировка запрещена в Java",
      "Она всегда быстрее unique constraint",
      "Она не работает с Redis"
    ],
    answer: 0,
    explain: "Блокировка снижает вероятность гонки, но не является транзакционной гарантией. Unique constraint и version остаются финальным уровнем."
  }
]);
