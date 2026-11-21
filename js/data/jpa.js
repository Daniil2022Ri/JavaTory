/* JPA и Hibernate — 26 вопросов */
window.JavaToryData = (window.JavaToryData || []).concat([
  {
    id: "jpa-001", category: "jpa", level: "senior",
    q: "Что такое persistence context в JPA?",
    options: [
      "Кэш первого уровня, в котором EntityManager отслеживает управляемые сущности",
      "Глобальный кэш второго уровня",
      "Пул JDBC-соединений",
      "Файл с SQL-логами"
    ],
    answer: 0,
    explain: "Persistence context хранит managed-сущности в рамках EntityManager. Повторный find по тому же id обычно возвращает тот же экземпляр, а изменения отслеживаются dirty checking."
  },
  {
    id: "jpa-002", category: "jpa", level: "senior",
    q: "Какие состояния жизненного цикла сущности существуют в JPA?",
    options: [
      "Transient, managed, detached, removed",
      "Active, passive, cached",
      "Open, closed, flushed",
      "Read, write, lock"
    ],
    answer: 0,
    explain: "Transient — не связана с контекстом, managed — отслеживается, detached — контекст закрыт/отсоединена, removed — помечена на удаление до flush."
  },
  {
    id: "jpa-003", category: "jpa", level: "senior",
    q: "Как Hibernate реализует dirty checking?",
    options: [
      "Сравнивает текущее состояние managed-сущности со снимком, сделанным при загрузке, и генерирует UPDATE на flush",
      "Вызывает сеттер, который сразу выполняет SQL",
      "Проверяет только аннотацию @Column",
      "Использует триггеры БД"
    ],
    answer: 0,
    explain: "При загрузке сохраняется snapshot значений. На flush Hibernate сравнивает поля и обновляет только изменённые (по умолчанию — все колонки, если не включена dynamic update)."
  },
  {
    id: "jpa-004", category: "jpa", level: "senior",
    q: "Что верно про flush в JPA?",
    options: [
      "Flush синхронизирует изменения с БД в рамках транзакции, но не обязан коммитить транзакцию",
      "Flush всегда завершает транзакцию",
      "Flush очищает persistence context",
      "Без commit flush невозможен"
    ],
    answer: 0,
    explain: "Flush отправляет SQL, но commit делает изменения видимыми окончательно и фиксирует транзакцию. Hibernate может делать auto-flush перед запросами, затрагивающими те же таблицы."
  },
  {
    id: "jpa-005", category: "jpa", level: "senior",
    q: "Чем `persist` отличается от `merge`?",
    options: [
      "persist переводит новый transient-объект в managed; merge копирует состояние detached-объекта в managed-экземпляр и возвращает его",
      "merge сохраняет объект без транзакции",
      "persist обновляет detached-объект",
      "Они всегда взаимозаменяемы"
    ],
    answer: 0,
    explain: "persist не выполняет SELECT и предназначен для новых сущностей. merge возвращает управляемую копию; исходный detached-объект остаётся detached."
  },
  {
    id: "jpa-006", category: "jpa", level: "senior",
    q: "Как безопасно обновить detached-сущность в JPA?",
    options: [
      "Вызвать `em.merge(entity)` и работать с возвращённым managed-экземпляром",
      "Изменить поля и ожидать автоматический UPDATE без merge",
      "Вызвать `em.persist(entity)` повторно",
      "Закрыть EntityManager"
    ],
    answer: 0,
    explain: "Detached-сущность не отслеживается. merge загружает/находит managed-экземпляр, копирует состояние и возвращает его; результат нужно использовать дальше."
  },
  {
    id: "jpa-007", category: "jpa", level: "senior",
    q: "Почему возникает LazyInitializationException?",
    options: [
      "Ленивая связь инициализируется после закрытия persistence context",
      "Сущность объявлена final",
      "В БД нет данных",
      "Используется JPQL вместо native SQL"
    ],
    answer: 0,
    explain: "Lazy-прокси требует активного контекста для загрузки. Вне транзакции/EntityManager доступ к незагруженной связи приводит к исключению. Решение — fetch в запросе или DTO."
  },
  {
    id: "jpa-008", category: "jpa", level: "senior",
    q: "Что такое N+1 проблема в ORM?",
    options: [
      "Один запрос за родителями и по дополнительному запросу за коллекцией/связью каждого родителя",
      "N транзакций в одном запросе",
      "Использование N индексов",
      "N соединений в пуле"
    ],
    answer: 0,
    explain: "Возникает при lazy-загрузке в цикле. Hibernate выполняет 1 + N SQL. Решения: join fetch, EntityGraph, batch size, DTO-проекции и мониторинг SQL."
  },
  {
    id: "jpa-009", category: "jpa", level: "senior",
    q: "Что делает `JOIN FETCH` в JPQL?",
    options: [
      "Загружает связь в том же запросе и инициализирует её, обходя lazy-прокси",
      "Всегда создаёт INNER JOIN, даже если связь пустая",
      "Удаляет связь",
      "Включает кэш второго уровня"
    ],
    answer: 0,
    explain: "JOIN FETCH уменьшает N+1. Для коллекций возможны дубликаты родительских строк; нужно учитывать пагинацию и несколько коллекций."
  },
  {
    id: "jpa-010", category: "jpa", level: "expert",
    q: "Зачем нужен EntityGraph?",
    options: [
      "Чтобы декларативно указать, какие связи загрузить для конкретного запроса, без изменения отображения",
      "Чтобы создать граф сущностей в БД",
      "Чтобы заменить транзакции",
      "Чтобы отключить кэш первого уровня"
    ],
    answer: 0,
    explain: "EntityGraph задаёт fetch plan через аннотацию или API. Это удобная альтернатива join fetch, особенно для Spring Data JPA."
  },
  {
    id: "jpa-011", category: "jpa", level: "senior",
    q: "Что делает `@BatchSize(size = 50)` на коллекции?",
    options: [
      "Загружает ленивые связи пакетами до 50 идентификаторов вместо запроса на каждую сущность",
      "Ограничивает число строк в таблице",
      "Создаёт batch-транзакцию",
      "Кэширует 50 сущностей навсегда"
    ],
    answer: 0,
    explain: "Batch fetching объединяет инициализацию нескольких прокси/коллекций в один IN-запрос. Это снижает N+1, но не заменяет осознанный fetch plan."
  },
  {
    id: "jpa-012", category: "jpa", level: "senior",
    q: "Какие fetch-типы по умолчанию у `@ManyToOne` и `@OneToMany`?",
    options: [
      "ManyToOne — EAGER, OneToMany — LAZY",
      "Оба EAGER",
      "Оба LAZY",
      "ManyToOne — LAZY, OneToMany — EAGER"
    ],
    answer: 0,
    explain: "JPA задаёт EAGER для ManyToOne/OneToOne и LAZY для OneToMany/ManyToMany. На практике ManyToOne часто явно делают LAZY, чтобы избежать лишних запросов."
  },
  {
    id: "jpa-013", category: "jpa", level: "senior",
    q: "Чем `orphanRemoval = true` отличается от cascade REMOVE?",
    options: [
      "orphanRemoval удаляет дочернюю сущность при удалении её из коллекции, а cascade REMOVE срабатывает при удалении родителя",
      "Это полные синонимы",
      "orphanRemoval работает только для ManyToOne",
      "cascade REMOVE удаляет всю таблицу"
    ],
    answer: 0,
    explain: "Orphan removal отслеживает исключение из связи. Cascade REMOVE распространяет удаление с родителя на связанные сущности. Их можно комбинировать."
  },
  {
    id: "jpa-014", category: "jpa", level: "expert",
    q: "Что означает `mappedBy` в двунаправленной связи?",
    options: [
      "Указывает, что эта сторона не владеет внешним ключом; владение находится в поле другой сущности",
      "Создаёт колонку с именем mappedBy",
      "Запрещает загрузку связи",
      "Включает каскадное удаление"
    ],
    answer: 0,
    explain: "Владение определяет, какие изменения попадут в БД. При `mappedBy` нужно синхронизировать обе стороны в коде, иначе in-memory состояние и БД разойдутся."
  },
  {
    id: "jpa-015", category: "jpa", level: "expert",
    q: "Почему не стоит строить equals/hashCode сущности только на generated id?",
    options: [
      "До сохранения id равен null, а после сохранения hashCode может измениться; в коллекциях это ломает поиск",
      "JPA запрещает equals для сущностей",
      "id всегда является строкой",
      "Hibernate не использует equals"
    ],
    answer: 0,
    explain: "Используют стабильный business key или осторожную реализацию с проверкой id и Hibernate-прокси. Lombok-@EqualsAndHashCode на всех полях тоже опасен для связей."
  },
  {
    id: "jpa-016", category: "jpa", level: "senior",
    q: "Как работает оптимистичная блокировка через `@Version`?",
    options: [
      "Hibernate добавляет version в WHERE при UPDATE и увеличивает её; при 0 обновлённых строк бросается OptimisticLockException",
      "Строка блокируется на чтение до commit",
      "Версия проверяется только вручную",
      "Version отключает транзакции"
    ],
    answer: 0,
    explain: "Конфликт обнаруживается при записи. Приложение должно обработать исключение и повторить операцию, если бизнес-логика это допускает."
  },
  {
    id: "jpa-017", category: "jpa", level: "senior",
    q: "Что даёт `LockModeType.PESSIMISTIC_WRITE`?",
    options: [
      "Блокировку строки БД на запись до завершения транзакции",
      "Кэширование сущности в Redis",
      "Оптимистичную проверку версии",
      "Запрет на чтение сущности"
    ],
    answer: 0,
    explain: "Это SELECT FOR UPDATE-подобная блокировка. Она защищает от конкурентных изменений, но повышает ожидания и требует коротких транзакций."
  },
  {
    id: "jpa-018", category: "jpa", level: "senior",
    q: "Что даёт `@Transactional(readOnly = true)`?",
    options: [
      "Подсказку провайдеру не выполнять dirty checking/flush и потенциально оптимизировать чтение; это не жёсткая гарантия на уровне БД",
      "Автоматически создаёт read-only соединение во всех СУБД",
      "Запрещает любые SELECT",
      "Отключает транзакцию"
    ],
    answer: 0,
    explain: "Hibernate переводит flush mode в MANUAL и может пропускать снимки для dirty checking. Для реальной защиты от записи на стороне БД нужны права/read-only replica."
  },
  {
    id: "jpa-019", category: "jpa", level: "senior",
    q: "Чем JPQL отличается от native query?",
    options: [
      "JPQL оперирует сущностями и полями, переносим между СУБД; native query использует SQL конкретной БД",
      "JPQL выполняется только в памяти",
      "Native query не поддерживает параметры",
      "JPQL не поддерживает WHERE"
    ],
    answer: 0,
    explain: "JPQL транслируется провайдером в SQL. Native-запросы нужны для специфичных возможностей, но сильнее привязывают код к БД и усложняют маппинг."
  },
  {
    id: "jpa-020", category: "jpa", level: "senior",
    q: "Зачем использовать DTO-проекции вместо загрузки сущностей?",
    options: [
      "Чтобы выбрать только нужные поля, уменьшить объём данных и избежать лишнего управления сущностями",
      "Чтобы обойти транзакции",
      "Чтобы отключить индексы",
      "Чтобы получить managed-сущности"
    ],
    answer: 0,
    explain: "Проекции особенно полезны для read-model и отчётов. Они снижают риск N+1 и лишних UPDATE от dirty checking."
  },
  {
    id: "jpa-021", category: "jpa", level: "senior",
    q: "Что нужно помнить при использовании `@Modifying @Query` для bulk UPDATE?",
    options: [
      "Запрос обходит persistence context, поэтому managed-сущности могут устареть; помогает clearAutomatically/flushAutomatically",
      "Bulk UPDATE автоматически обновляет все сущности в памяти",
      "Такой запрос нельзя выполнять в транзакции",
      "Он работает только с native SQL"
    ],
    answer: 0,
    explain: "Bulk-операции выполняются в БД напрямую. Контекст не обновляется автоматически, поэтому нужна осторожность с уже загруженными сущностями и кэшем."
  },
  {
    id: "jpa-022", category: "jpa", level: "expert",
    q: "Почему `JOIN FETCH` коллекции вместе с pagination может быть проблемой?",
    options: [
      "Из-за дублирования строк и необходимости пагинации в памяти Hibernate может предупредить и загрузить больше данных",
      "JPQL не поддерживает LIMIT",
      "Коллекции нельзя загружать join fetch",
      "Пагинация работает только с native SQL"
    ],
    answer: 0,
    explain: "Fetch join размножает родительские строки по элементам коллекции. Hibernate не может корректно применить SQL LIMIT к родителям; используют two-query approach или EntityGraph с осторожностью."
  },
  {
    id: "jpa-023", category: "jpa", level: "expert",
    q: "Почему возникает `MultipleBagFetchException`?",
    options: [
      "Нельзя одновременно fetch join-ить несколько List-коллекций из-за декартова произведения и неоднозначности",
      "В сущности больше двух полей",
      "Используется PostgreSQL",
      "Отсутствует @Version"
    ],
    answer: 0,
    explain: "Hibernate не может однозначно собрать несколько «мешков» (bag) в одном результате. Решения — Set, отдельные запросы, batch fetching или DTO."
  },
  {
    id: "jpa-024", category: "jpa", level: "senior",
    q: "Какие стратегии наследования поддерживает JPA?",
    options: [
      "SINGLE_TABLE, JOINED, TABLE_PER_CLASS",
      "ONLY_PARENT, MIXED, VIEW",
      "EAGER, LAZY, AUTO",
      "PRIMARY, UNIQUE, FOREIGN"
    ],
    answer: 0,
    explain: "SINGLE_TABLE быстра, но допускает nullable-колонки; JOINED нормализована, но требует join; TABLE_PER_CLASS плохо работает с полиморфными запросами."
  },
  {
    id: "jpa-025", category: "jpa", level: "expert",
    q: "Почему стратегия IDENTITY может ухудшать batch insert?",
    options: [
      "Hibernate должен получать сгенерированный id сразу после каждой вставки, что мешает группировать INSERT",
      "IDENTITY не поддерживается JPA",
      "IDENTITY всегда создаёт UUID",
      "Из-за неё отключается транзакционность"
    ],
    answer: 0,
    explain: "IDENTITY требует немедленного возврата ключа. SEQUENCE позволяет заранее получить пачку id и эффективнее батчить вставки (с allocationSize)."
  },
  {
    id: "jpa-026", category: "jpa", level: "senior",
    q: "Почему `ddl-auto=update` не рекомендуется в production?",
    options: [
      "Он не является полноценным инструментом миграций и может вносить неконтролируемые/небезопасные изменения схемы",
      "Он всегда удаляет базу",
      "Он не поддерживает PostgreSQL",
      "Он отключает транзакции"
    ],
    answer: 0,
    explain: "В production используют версионируемые миграции (Flyway/Liquibase) и `ddl-auto=validate` или `none`. Автоматическое обновление схемы плохо предсказуемо."
  }
]);
