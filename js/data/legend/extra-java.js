/* Дополнительно: Java и Spring — 38 вопросов */
window.JavaToryLegendData = (window.JavaToryLegendData || []).concat([
  {
    id: "lg-java-001", category: "legend-extra-java", level: "middle",
    q: "Почему в Spring Boot-сервисах обычно избегают прямого `new` для зависимостей бизнес-логики?",
    options: [
      "Тогда Spring не сможет внедрить зависимости, применить AOP и управлять жизненным циклом",
      "Java запрещает new в enterprise-коде",
      "Это всегда вызывает утечку памяти",
      "Без new не работает Kafka"
    ],
    answer: 0,
    explain: "Ручное создание обходит DI-контейнер. Это усложняет тестирование, proxy-механизмы, транзакции и конфигурацию."
  },
  {
    id: "lg-java-002", category: "legend-extra-java", level: "expert",
    q: "Почему `@Transactional` может не сработать при вызове метода из другого метода того же класса?",
    options: [
      "Транзакции запрещены в private-методах",
      "Spring удаляет аннотацию при компиляции",
      "Вызов идёт через this мимо Spring-прокси",
      "Нужно обязательно использовать Kafka"
    ],
    answer: 2,
    explain: "AOP-прокси перехватывает внешние вызовы. Self-invocation обходит proxy, поэтому advice не применяется."
  },
  {
    id: "lg-java-003", category: "legend-extra-java", level: "senior",
    q: "Что делает propagation `REQUIRED`?",
    options: [
      "Всегда создаёт новую транзакцию",
      "Присоединяется к текущей транзакции или создаёт новую, если её нет",
      "Запрещает транзакцию",
      "Создаёт savepoint"
    ],
    answer: 1,
    explain: "Это режим по умолчанию. Внутренний вызов использует ту же транзакцию, поэтому откат распространяется на всю операцию."
  },
  {
    id: "lg-java-004", category: "legend-extra-java", level: "expert",
    q: "Зачем использовать `REQUIRES_NEW`?",
    options: [
      "Чтобы откатить внешнюю транзакцию",
      "Чтобы всегда работать без БД",
      "Чтобы заменить optimistic locking",
      "Чтобы выполнить действие в независимой транзакции, которая коммитится отдельно"
    ],
    answer: 3,
    explain: "Подходит для аудита/логов, которые должны сохраниться даже при откате основной операции. Требует отдельного соединения и аккуратности с блокировками."
  },
  {
    id: "lg-java-005", category: "legend-extra-java", level: "senior",
    q: "При каких исключениях Spring по умолчанию откатывает транзакцию?",
    options: [
      "При RuntimeException и Error",
      "При любых checked-исключениях",
      "Только при SQLException",
      "Только при 404"
    ],
    answer: 0,
    explain: "Поведение меняется через rollbackFor/noRollbackFor. Checked-исключения по умолчанию не приводят к откату."
  },
  {
    id: "lg-java-006", category: "legend-extra-java", level: "senior",
    q: "Как JPA `@Version` помогает при конкурентном обновлении платежа?",
    options: [
      "Блокирует все строки таблицы",
      "Хранит историю всех версий в Kafka",
      "Добавляет version в WHERE и обнаруживает конфликт по числу обновлённых строк",
      "Автоматически повторяет транзакцию"
    ],
    answer: 2,
    explain: "При конфликте выбрасывается OptimisticLockException. Приложение решает, повторить операцию или вернуть конфликт."
  },
  {
    id: "lg-java-007", category: "legend-extra-java", level: "senior",
    q: "Как Hibernate выполняет dirty checking?",
    options: [
      "Вызывает SQL из каждого сеттера",
      "Сравнивает managed-сущность со snapshot и генерирует UPDATE на flush",
      "Использует триггеры БД",
      "Проверяет только @Id"
    ],
    answer: 1,
    explain: "Изменения отслеживаются в persistence context. Flush синхронизирует их с БД, но не коммитит транзакцию."
  },
  {
    id: "lg-java-008", category: "legend-extra-java", level: "senior",
    q: "Что такое N+1 запросов в JPA?",
    options: [
      "N транзакций на один запрос",
      "N индексов в таблице",
      "Ошибка при N > 1",
      "Один запрос за списком плюс по запросу на каждую связанную сущность"
    ],
    answer: 3,
    explain: "Часто возникает при lazy-связях. Исправляется join fetch, EntityGraph, batch fetching или DTO-проекциями."
  },
  {
    id: "lg-java-009", category: "legend-extra-java", level: "senior",
    q: "Что произойдёт, если HikariCP исчерпает пул соединений?",
    options: [
      "Запросы начнут ждать connection timeout и могут завершиться ошибкой",
      "PostgreSQL автоматически создаст новые соединения",
      "Kafka перезапустится",
      "Транзакции станут быстрее"
    ],
    answer: 0,
    explain: "Размер пула ограничен. Медленные запросы и утечки соединений приводят к ожиданию и деградации сервиса."
  },
  {
    id: "lg-java-010", category: "legend-extra-java", level: "senior",
    q: "Для каких задач виртуальные потоки Java 21 особенно полезны?",
    options: [
      "Для CPU-bound шифрования",
      "Для замены Kafka",
      "Для большого числа блокирующих I/O-операций",
      "Для сортировки массивов"
    ],
    answer: 2,
    explain: "Виртуальные потоки дешёвы и хорошо масштабируют блокирующий I/O. Они не ускоряют CPU-bound вычисления и обычно не требуют пулинга."
  },
  {
    id: "lg-java-011", category: "legend-extra-java", level: "expert",
    q: "Почему unbounded-очередь в executor опасна?",
    options: [
      "Она запрещает Callable",
      "Она накапливает задачи без backpressure, что ведёт к росту памяти и задержек",
      "Она блокирует Kafka",
      "Она отключает логирование"
    ],
    answer: 1,
    explain: "Ограниченная очередь и политика отказа позволяют приложению сигнализировать о перегрузке вместо бесконечного накопления."
  },
  {
    id: "lg-java-012", category: "legend-extra-java", level: "senior",
    q: "Что делает `CompletableFuture.allOf(...)`?",
    options: [
      "Возвращает список результатов",
      "Отменяет все future при первой ошибке",
      "Выполняет задачи последовательно",
      "Возвращает future, завершающийся после завершения всех переданных future"
    ],
    answer: 3,
    explain: "allOf не агрегирует результаты: их получают из исходных future. При ошибке итоговый future завершится исключительно."
  },
  {
    id: "lg-java-013", category: "legend-extra-java", level: "senior",
    q: "Зачем ограничивать timeout внешнего вызова?",
    options: [
      "Чтобы освободить потоки и connections, не ожидая зависшую зависимость бесконечно",
      "Чтобы увеличить размер JSON",
      "Чтобы включить exactly-once",
      "Чтобы ускорить CPU"
    ],
    answer: 0,
    explain: "Timeout — базовая защита от каскадного зависания. Он должен вписываться в общий бюджет времени запроса."
  },
  {
    id: "lg-java-014", category: "legend-extra-java", level: "senior",
    q: "Зачем передавать traceId в MDC?",
    options: [
      "Чтобы заменить Kafka",
      "Чтобы ускорить SQL",
      "Чтобы автоматически добавлять идентификатор трассировки в логи запроса",
      "Чтобы хранить пароль"
    ],
    answer: 2,
    explain: "MDC — контекст логирования потока. Trace/correlation id позволяют связать записи разных сервисов и событий."
  },
  {
    id: "lg-java-015", category: "legend-extra-java", level: "senior",
    q: "Что важно при логировании ошибок внешнего провайдера?",
    options: [
      "Логировать пароли и токены",
      "Логировать correlationId, тип ошибки и контекст без секретов/PII",
      "Писать только stack trace без идентификаторов",
      "Логировать весь payload без фильтра"
    ],
    answer: 1,
    explain: "Логи должны помогать расследованию, но не раскрывать чувствительные данные. Структурированный формат упрощает поиск."
  },
  {
    id: "lg-java-016", category: "legend-extra-java", level: "middle",
    q: "Когда Java record удобен для DTO?",
    options: [
      "Когда нужен изменяемый объект с сеттерами",
      "Когда нужна ленивая JPA-сущность",
      "Когда требуется наследование",
      "Когда нужен неизменяемый контейнер данных с accessor'ами"
    ],
    answer: 3,
    explain: "Record хорошо подходит для простых DTO и value-объектов. Для сущностей JPA с прокси и жизненным циклом он обычно не используется."
  },
  {
    id: "lg-java-017", category: "legend-extra-java", level: "senior",
    q: "Что делает `@Valid` на DTO в контроллере?",
    options: [
      "Запускает Bean Validation ограничений",
      "Создает транзакцию",
      "Проверяет уникальность в БД",
      "Включает Kafka"
    ],
    answer: 0,
    explain: "Аннотации вроде @NotNull/@Size проверяются до бизнес-логики. Ошибки можно централизованно преобразовать в HTTP 400/422."
  },
  {
    id: "lg-java-018", category: "legend-extra-java", level: "senior",
    q: "Зачем нужен `@ControllerAdvice` с `@ExceptionHandler`?",
    options: [
      "Для создания Kafka-топиков",
      "Для миграций БД",
      "Для централизованного преобразования исключений в HTTP-ответы",
      "Для кэширования"
    ],
    answer: 2,
    explain: "Это уменьшает дублирование обработки ошибок в контроллерах и помогает отдавать единый формат ошибок."
  },
  {
    id: "lg-java-019", category: "legend-extra-java", level: "senior",
    q: "Почему POST создания платежа делают идемпотентным через отдельный ключ?",
    options: [
      "POST всегда идемпотентен по HTTP",
      "Сетевой сбой может привести к повтору, и без ключа создастся второй платеж",
      "Это требование Kafka",
      "Чтобы отказаться от БД"
    ],
    answer: 1,
    explain: "Клиент передаёт Idempotency-Key, сервер хранит результат первой операции. Повтор с тем же ключом не создаёт новый платеж."
  },
  {
    id: "lg-java-020", category: "legend-extra-java", level: "expert",
    q: "Почему подпись webhook нужно сравнивать в constant-time?",
    options: [
      "Чтобы ускорить HMAC",
      "Чтобы сэкономить память",
      "Чтобы избежать утечки информации через время сравнения",
      "Чтобы отключить TLS"
    ],
    answer: 2,
    explain: "Обычное сравнение может завершиться раньше при несовпадении, раскрывая префикс подписи. Используют MessageDigest.isEqual или аналог."
  },
  {
    id: "lg-java-021", category: "legend-extra-java", level: "middle",
    q: "Где можно безопасно хранить секрет HMAC?",
    options: [
      "В секрет-менеджере/переменных окружения с ограниченным доступом",
      "В Git вместе с кодом",
      "В логах",
      "В имени Kafka-топика"
    ],
    answer: 0,
    explain: "Секреты не должны попадать в репозиторий и логи. Используют vault/secret manager и ротацию ключей."
  },
  {
    id: "lg-java-022", category: "legend-extra-java", level: "senior",
    q: "Чем опасен бесконечный retry в обработчике?",
    options: [
      "Он ускоряет consumer",
      "Он гарантирует доставку",
      "Он может заблокировать партицию и помешать обработке остальных сообщений",
      "Он уменьшает lag"
    ],
    answer: 2,
    explain: "Нужны ограничение попыток, backoff и DLT. Иначе «ядовитое» сообщение остановит прогресс."
  },
  {
    id: "lg-java-023", category: "legend-extra-java", level: "senior",
    q: "Что такое circuit breaker в интеграции с провайдером?",
    options: [
      "Кэш ответов",
      "Защита, которая перестаёт вызывать сломанную зависимость после порога ошибок",
      "Способ шифрования",
      "Тип Kafka-партиции"
    ],
    answer: 1,
    explain: "Breaker открывается, чтобы не тратить ресурсы на заведомо неуспешные вызовы, затем пробует half-open."
  },
  {
    id: "lg-java-024", category: "legend-extra-java", level: "middle",
    q: "Зачем подключать Spring Boot Actuator?",
    options: [
      "Для миграций",
      "Для отправки webhook",
      "Для расчетов комиссии",
      "Для health/metrics/info endpoints и интеграции с мониторингом"
    ],
    answer: 3,
    explain: "Actuator даёт readiness/liveness, метрики и диагностические endpoints. Чувствительные endpoints нужно защищать."
  },
  {
    id: "lg-java-025", category: "legend-extra-java", level: "senior",
    q: "Что даёт `@ConfigurationProperties`?",
    options: [
      "Типобезопасное связывание группы конфигурационных свойств",
      "Автоматическую транзакцию",
      "Генерацию Kafka-топиков",
      "Кэш JPA"
    ],
    answer: 0,
    explain: "Класс получает значения из environment с relaxed binding. Валидация может выполняться через Bean Validation."
  },
  {
    id: "lg-java-026", category: "legend-extra-java", level: "middle",
    q: "Зачем нужны Spring profiles?",
    options: [
      "Для профилирования CPU",
      "Для замены Maven",
      "Для включения разных конфигураций и бинов в dev/test/prod",
      "Для Kafka consumer group"
    ],
    answer: 2,
    explain: "Профили помогают разделять настройки окружений. Секреты всё равно должны приходить из внешнего хранилища."
  },
  {
    id: "lg-java-027", category: "legend-extra-java", level: "senior",
    q: "Зачем использовать Testcontainers в интеграционных тестах?",
    options: [
      "Чтобы заменить JUnit",
      "Чтобы поднять реальные PostgreSQL/Kafka в Docker и проверить поведение, близкое к prod",
      "Чтобы ускорить unit-тесты",
      "Чтобы не писать assertions"
    ],
    answer: 1,
    explain: "Реальная БД выявляет особенности SQL, транзакций и драйвера, которые embedded-БД может скрывать."
  },
  {
    id: "lg-java-028", category: "legend-extra-java", level: "senior",
    q: "Чем unit-тест отличается от интеграционного?",
    options: [
      "Unit всегда медленнее",
      "Интеграционный не может использовать Spring",
      "Unit проверяет только UI",
      "Unit изолирует компонент, интеграционный проверяет взаимодействие с БД/брокером/HTTP"
    ],
    answer: 3,
    explain: "Пирамида тестов оптимизирует скорость и уверенность. Критичные сценарии покрывают интеграционно."
  },
  {
    id: "lg-java-029", category: "legend-extra-java", level: "senior",
    q: "Для чего нужен WireMock?",
    options: [
      "Для имитации внешнего HTTP API в тестах",
      "Для запуска Kafka",
      "Для миграций PostgreSQL",
      "Для сборки Docker"
    ],
    answer: 0,
    explain: "WireMock позволяет воспроизвести ответы, таймауты и ошибки провайдера без реальной интеграции."
  },
  {
    id: "lg-java-030", category: "legend-extra-java", level: "expert",
    q: "Что проверяет consumer-driven contract testing?",
    options: [
      "Производительность БД",
      "Безопасность TLS",
      "Совместимость API provider'а с ожиданиями consumer'а",
      "Количество подов"
    ],
    answer: 2,
    explain: "Контракт фиксирует ожидаемый формат и поведение. Provider проверяет его в CI, не поднимая всю систему."
  },
  {
    id: "lg-java-031", category: "legend-extra-java", level: "senior",
    q: "Что такое Micrometer?",
    options: [
      "Библиотека для Kafka Streams",
      "Фасад метрик, интегрирующий приложение с Prometheus и другими системами",
      "ORM",
      "Планировщик"
    ],
    answer: 1,
    explain: "Micrometer предоставляет API таймеров/счётчиков и экспортёры. Spring Boot Actuator использует его для метрик."
  },
  {
    id: "lg-java-032", category: "legend-extra-java", level: "senior",
    q: "Зачем нужен graceful shutdown?",
    options: [
      "Чтобы быстрее упасть",
      "Чтобы отключить health check",
      "Чтобы удалить offsets",
      "Чтобы завершить текущие запросы и корректно закрыть ресурсы до остановки процесса"
    ],
    answer: 3,
    explain: "В Kubernetes под получает сигнал и время на дренаж. Это снижает обрыв платежей и незакоммиченные изменения."
  },
  {
    id: "lg-java-033", category: "legend-extra-java", level: "expert",
    q: "Какой уровень изоляции по умолчанию в PostgreSQL?",
    options: ["READ COMMITTED", "SERIALIZABLE", "REPEATABLE READ", "READ UNCOMMITTED"],
    answer: 0,
    explain: "PostgreSQL использует READ COMMITTED. Для repeatable snapshot нужен REPEATABLE READ, для полной сериализации — SERIALIZABLE."
  },
  {
    id: "lg-java-034", category: "legend-extra-java", level: "senior",
    q: "Когда пессимистичная блокировка лучше оптимистичной?",
    options: [
      "При очень редких конфликтах",
      "Когда операция только читает",
      "При высокой конкуренции за одну строку, где повтор дорог",
      "Когда нет базы данных"
    ],
    answer: 2,
    explain: "Пессимистичная блокировка сериализует доступ к строке. Оптимистичная хороша при низкой конкуренции и редких конфликтах."
  },
  {
    id: "lg-java-035", category: "legend-extra-java", level: "senior",
    q: "Почему возникает LazyInitializationException?",
    options: [
      "Из-за отсутствия @Id",
      "Из-за доступа к lazy-связи после закрытия persistence context",
      "Из-за Kafka",
      "Из-за неверного HTTP-метода"
    ],
    answer: 1,
    explain: "Ленивому прокси нужен активный EntityManager. Решение — загрузить связь запросом, использовать DTO или держать границу транзакции."
  },
  {
    id: "lg-java-036", category: "legend-extra-java", level: "expert",
    q: "Что нужно для ручного подтверждения offset в Spring Kafka?",
    options: [
      "Включить auto commit",
      "Использовать только @Scheduled",
      "Отключить consumer group",
      "Настроить AckMode.MANUAL/MANUAL_IMMEDIATE и вызывать acknowledgment.acknowledge() после обработки"
    ],
    answer: 3,
    explain: "Ручной ack даёт контроль над моментом commit. Важно подтверждать только после успешной записи состояния в БД."
  },
  {
    id: "lg-java-037", category: "legend-extra-java", level: "senior",
    q: "Что задаёт concurrency у `@KafkaListener`?",
    options: [
      "Число потоков-контейнеров, обрабатывающих партиции",
      "Число Kafka-брокеров",
      "Replication factor",
      "Размер сообщения"
    ],
    answer: 0,
    explain: "Concurrency увеличивает параллелизм в пределах числа партиций. Слишком большое значение не даст выигрыша и усложнит ordering."
  },
  {
    id: "lg-java-038", category: "legend-extra-java", level: "senior",
    q: "Почему нельзя логировать полный номер карты и CVV?",
    options: [
      "Это замедляет Kafka",
      "Это увеличивает размер JVM",
      "Это нарушает требования безопасности и может привести к утечке платёжных данных",
      "Это отключает Prometheus"
    ],
    answer: 2,
    explain: "Чувствительные данные требуют маскирования. Логи и audit trail не должны содержать CVV и полные реквизиты."
  }
]);
