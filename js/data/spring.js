/* Spring Framework — 52 вопроса */
window.JavaToryData = (window.JavaToryData || []).concat([
  {
    id: "spring-001", category: "spring", level: "middle",
    q: "Что такое Inversion of Control в Spring?",
    options: [
      "Контейнер сам создаёт объекты и управляет их зависимостями, а код получает готовые бины",
      "Приложение вручную создаёт все объекты через new",
      "Spring заменяет JVM",
      "Контроль версий зависимостей через Maven"
    ],
    answer: 0,
    explain: "IoC инвертирует создание и связывание объектов: контейнер управляет жизненным циклом и внедряет зависимости. DI — конкретная форма IoC."
  },
  {
    id: "spring-002", category: "spring", level: "senior",
    q: "Чем ApplicationContext отличается от BeanFactory?",
    options: [
      "ApplicationContext расширяет BeanFactory: обычно заранее создаёт singleton-бины и добавляет события, i18n, ресурсы",
      "BeanFactory поддерживает аннотации, а ApplicationContext нет",
      "ApplicationContext не умеет создавать бины",
      "Это полностью независимые API"
    ],
    answer: 0,
    explain: "BeanFactory — базовый контейнер с ленивой инициализацией. ApplicationContext добавляет корпоративные возможности и обычно заранее создаёт singleton-бины."
  },
  {
    id: "spring-003", category: "spring", level: "middle",
    q: "Какой scope у Spring-бина по умолчанию?",
    options: ["prototype", "singleton", "request", "session"],
    answer: 1,
    explain: "По умолчанию бин singleton в пределах контейнера. Это один экземпляр на ApplicationContext, а не глобальный singleton в JVM."
  },
  {
    id: "spring-004", category: "spring", level: "senior",
    q: "Что верно для prototype-scope?",
    options: [
      "Контейнер создаёт новый экземпляр на каждый запрос бина и не управляет его уничтожением",
      "Prototype-бин создаётся один раз на поток",
      "Spring вызывает @PreDestroy у каждого prototype-бина",
      "Prototype нельзя внедрить в singleton"
    ],
    answer: 0,
    explain: "Spring создаёт prototype при каждом получении, но не хранит его и не вызывает destroy-колбэки. Ответственность за очистку лежит на коде, который получил бин."
  },
  {
    id: "spring-005", category: "spring", level: "expert",
    q: "Почему внедрение prototype-бина в singleton не даёт новый экземпляр на каждый вызов?",
    options: [
      "Зависимость внедряется один раз при создании singleton; нужен ObjectProvider, @Lookup или получение из контекста",
      "Prototype-бин всегда становится singleton",
      "Spring запрещает такие зависимости",
      "Потому что prototype не поддерживает DI"
    ],
    answer: 0,
    explain: "Singleton создаётся один раз, и ссылка на prototype фиксируется. Для ленивого получения новых экземпляров используют ObjectProvider, @Lookup или фабрику."
  },
  {
    id: "spring-006", category: "spring", level: "senior",
    q: "Что делает `@ComponentScan`?",
    options: [
      "Ищет компоненты в указанных пакетах и регистрирует их как бины",
      "Сканирует базу данных",
      "Создаёт JDBC-соединения",
      "Включает AOP только для @Service"
    ],
    answer: 0,
    explain: "Сканирование находит @Component и стереотипы (@Service, @Repository, @Controller), а также @Configuration. По умолчанию @SpringBootApplication сканирует свой пакет и подпакеты."
  },
  {
    id: "spring-007", category: "spring", level: "middle",
    q: "Как по умолчанию работает `@Autowired` для поля?",
    options: [
      "Внедряет зависимость по типу; при нескольких кандидатах разрешает неоднозначность по имени/qualifier",
      "Всегда по имени бина",
      "Только через конструктор",
      "Создаёт новый экземпляр через new"
    ],
    answer: 0,
    explain: "Основной критерий — тип. Если кандидатов несколько, Spring учитывает @Qualifier, @Primary и имя поля/параметра; при неудаче бросает исключение."
  },
  {
    id: "spring-008", category: "spring", level: "senior",
    q: "Для чего нужен `@Qualifier`?",
    options: [
      "Чтобы выбрать конкретный бин среди нескольких кандидатов одного типа",
      "Чтобы сделать бин lazy",
      "Чтобы включить транзакцию",
      "Чтобы задать scope"
    ],
    answer: 0,
    explain: "@Qualifier сужает выбор по имени/значению квалификатора. Он полезен при нескольких реализациях одного интерфейса."
  },
  {
    id: "spring-009", category: "spring", level: "senior",
    q: "Что делает `@Primary`?",
    options: [
      "Помечает бин как предпочтительный при неоднозначном внедрении по типу",
      "Делает бин единственным в контексте",
      "Запрещает внедрение через конструктор",
      "Создаёт primary key в БД"
    ],
    answer: 0,
    explain: "@Primary задаёт кандидата по умолчанию. @Qualifier при этом имеет более высокий приоритет для конкретной точки внедрения."
  },
  {
    id: "spring-010", category: "spring", level: "senior",
    q: "Что происходит при циклической зависимости через конструкторы в современном Spring Boot?",
    options: [
      "Приложение падает при старте: циклические зависимости через конструктор не разрешаются",
      "Spring автоматически создаёт прокси и всё работает",
      "Зависимость внедряется как null",
      "Spring запускает бесконечный цикл"
    ],
    answer: 0,
    explain: "Конструктор требует готового аргумента, поэтому цикл невозможно разорвать. Spring Boot 2.6+ по умолчанию запрещает circular references; лучше исправить архитектуру."
  },
  {
    id: "spring-011", category: "spring", level: "expert",
    q: "Зачем в `@Configuration` по умолчанию используется proxyBeanMethods = true?",
    options: [
      "Чтобы вызовы @Bean-методов внутри конфигурации возвращали singleton-бин, а не создавали новый объект",
      "Чтобы включить транзакции",
      "Чтобы создать JDK-прокси для контроллеров",
      "Чтобы отключить component scanning"
    ],
    answer: 0,
    explain: "CGLIB-прокси перехватывает межметодные вызовы и обеспечивает singleton-семантику. `proxyBeanMethods = false` уменьшает overhead, но требует не вызывать @Bean-методы напрямую."
  },
  {
    id: "spring-012", category: "spring", level: "senior",
    q: "Когда предпочтителен `@Bean`, а не `@Component`?",
    options: [
      "Когда нужно создать бин сторонней библиотеки или сложную конфигурацию вручную",
      "Всегда, потому что @Component устарел",
      "Только для контроллеров",
      "Когда требуется prototype"
    ],
    answer: 0,
    explain: "@Component подходит для собственных классов, обнаруживаемых сканированием. @Bean даёт явное создание и настройку, особенно для классов без аннотаций Spring."
  },
  {
    id: "spring-013", category: "spring", level: "senior",
    q: "Когда вызываются `@PostConstruct` и `@PreDestroy`?",
    options: [
      "После внедрения зависимостей до использования бина и перед уничтожением контейнером",
      "До создания объекта и после каждого запроса",
      "Только для prototype-бинов",
      "Только при закрытии JVM"
    ],
    answer: 0,
    explain: "@PostConstruct выполняется после DI и before init-методов; @PreDestroy — при уничтожении singleton-бина. Для prototype destroy-колбэк Spring не вызывает."
  },
  {
    id: "spring-014", category: "spring", level: "expert",
    q: "Чем занимается BeanPostProcessor?",
    options: [
      "Обрабатывает каждый экземпляр бина до и после инициализации, позволяя оборачивать или изменять его",
      "Изменяет определения бинов до их создания",
      "Сканирует classpath",
      "Управляет транзакциями"
    ],
    answer: 0,
    explain: "BeanPostProcessor работает с уже созданными экземплярами. На нём основаны AOP-прокси, аннотации @Autowired/@PostConstruct и другие механизмы."
  },
  {
    id: "spring-015", category: "spring", level: "expert",
    q: "Чем BeanFactoryPostProcessor отличается от BeanPostProcessor?",
    options: [
      "BeanFactoryPostProcessor изменяет bean definitions до создания экземпляров; BeanPostProcessor — сами экземпляры",
      "Они полностью идентичны",
      "BeanFactoryPostProcessor работает только после shutdown",
      "BeanPostProcessor изменяет только свойства БД"
    ],
    answer: 0,
    explain: "BeanFactoryPostProcessor работает на этапе метаданных, например PropertySourcesPlaceholderConfigurer. BeanPostProcessor — на этапе жизни экземпляров."
  },
  {
    id: "spring-016", category: "spring", level: "senior",
    q: "Что верно для ApplicationEvent в Spring?",
    options: [
      "По умолчанию события доставляются синхронно в потоке publisher; асинхронность требует отдельной настройки",
      "События всегда асинхронны",
      "События работают только в web-приложениях",
      "Событие нельзя отменить"
    ],
    answer: 0,
    explain: "ApplicationEventPublisher по умолчанию вызывает слушателей синхронно. @Async или ApplicationEventMulticaster позволяют сделать доставку асинхронной."
  },
  {
    id: "spring-017", category: "spring", level: "senior",
    q: "Какой прокси использует Spring AOP для класса без интерфейса в Spring Boot 3?",
    options: [
      "CGLIB-прокси, наследующий класс",
      "JDK dynamic proxy",
      "Только байткод-инструментацию AspectJ без прокси",
      "Прокси создать невозможно"
    ],
    answer: 0,
    explain: "Spring Boot по умолчанию предпочитает CGLIB-прокси, поэтому final-классы/методы не могут быть проксированы. JDK proxy возможен при наличии интерфейса."
  },
  {
    id: "spring-018", category: "spring", level: "expert",
    q: "Почему вызов `this.transactionalMethod()` внутри того же бина может не применить @Transactional?",
    options: [
      "Вызов идёт мимо Spring-прокси, поэтому advice не срабатывает",
      "@Transactional работает только в контроллерах",
      "Транзакция всегда откатывается",
      "Метод должен быть static"
    ],
    answer: 0,
    explain: "AOP-прокси перехватывает внешние вызовы. Внутренний self-invocation обходит прокси. Решения — вынести метод в другой бин, использовать self-injection или TransactionTemplate."
  },
  {
    id: "spring-019", category: "spring", level: "senior",
    q: "Что делает propagation `REQUIRED` по умолчанию?",
    options: [
      "Присоединяется к текущей транзакции, а если её нет — создаёт новую",
      "Всегда приостанавливает текущую транзакцию и создаёт новую",
      "Требует уже открытую транзакцию и иначе падает",
      "Выполняется без транзакции"
    ],
    answer: 0,
    explain: "REQUIRED — самый распространённый режим. Внутренний вызов использует ту же транзакцию, поэтому откат внутреннего метода может откатить всю операцию."
  },
  {
    id: "spring-020", category: "spring", level: "senior",
    q: "Чем `REQUIRES_NEW` отличается от `REQUIRED`?",
    options: [
      "Приостанавливает текущую транзакцию и запускает независимую новую, которая коммитится/откатывается отдельно",
      "Всегда откатывает внешнюю транзакцию",
      "Не поддерживает БД",
      "Работает только при чтении"
    ],
    answer: 0,
    explain: "REQUIRES_NEW полезен для аудита/логов, которые должны сохраниться независимо. Нужно учитывать отдельное соединение, блокировки и невозможность откатить внешнее изменение."
  },
  {
    id: "spring-021", category: "spring", level: "expert",
    q: "Что делает propagation `NESTED`?",
    options: [
      "Создаёт savepoint внутри текущей транзакции; откат внутренней части может не откатывать внешнюю",
      "Всегда создаёт отдельное соединение",
      "Запрещает вложенные вызовы",
      "Отключает транзакцию"
    ],
    answer: 0,
    explain: "NESTED использует savepoint и поддерживается не всеми менеджерами/СУБД, особенно с JPA. Это не то же самое, что полностью независимая транзакция REQUIRES_NEW."
  },
  {
    id: "spring-022", category: "spring", level: "senior",
    q: "При каких исключениях Spring по умолчанию откатывает транзакцию?",
    options: [
      "При RuntimeException и Error; checked-исключения по умолчанию не откатывают",
      "При любых исключениях, включая checked",
      "Только при SQLException",
      "Только при ошибках валидации"
    ],
    answer: 0,
    explain: "Поведение можно изменить через `rollbackFor`/`noRollbackFor`. Это частая ошибка при работе с checked-исключениями."
  },
  {
    id: "spring-023", category: "spring", level: "expert",
    q: "Почему `@Transactional` на private-методе обычно не работает?",
    options: [
      "Spring-прокси не перехватывает private-методы",
      "Private-методы не могут содержать SQL",
      "Транзакции поддерживаются только в интерфейсах",
      "Нужно добавить @Async"
    ],
    answer: 0,
    explain: "Прокси перехватывает доступные для переопределения методы. Для транзакции метод должен вызываться через прокси и быть public/protected в зависимости от прокси."
  },
  {
    id: "spring-024", category: "spring", level: "senior",
    q: "Как метод-level `@Transactional` взаимодействует с class-level аннотацией?",
    options: [
      "Атрибуты метода переопределяют атрибуты класса для этого метода",
      "Class-level всегда побеждает",
      "Обе транзакции создаются одновременно",
      "Class-level аннотация игнорируется"
    ],
    answer: 0,
    explain: "Аннотация на методе имеет приоритет. Это позволяет задать общие настройки на классе и переопределить propagation/readOnly/timeout для отдельного метода."
  },
  {
    id: "spring-025", category: "spring", level: "senior",
    q: "Какой компонент является центральным диспетчером Spring MVC?",
    options: ["DispatcherServlet", "BeanFactory", "HandlerInterceptor", "ViewResolver"],
    answer: 0,
    explain: "DispatcherServlet принимает запрос, находит handler через HandlerMapping, вызывает его через HandlerAdapter и обрабатывает результат/представление."
  },
  {
    id: "spring-026", category: "spring", level: "middle",
    q: "Что означает `@RestController`?",
    options: [
      "Комбинацию @Controller и @ResponseBody: возвращаемое значение сериализуется в тело ответа",
      "Контроллер только для HTML-шаблонов",
      "Контроллер, работающий без HTTP",
      "Аннотацию для репозитория"
    ],
    answer: 0,
    explain: "@RestController не резолвит View по умолчанию, а пишет возвращаемое значение через HttpMessageConverter (обычно JSON)."
  },
  {
    id: "spring-027", category: "spring", level: "senior",
    q: "Чем `@RequestBody` отличается от `@RequestParam`?",
    options: [
      "@RequestBody читает тело запроса и конвертирует его; @RequestParam берёт параметр строки запроса или формы",
      "Они всегда взаимозаменяемы",
      "@RequestParam читает JSON-тело",
      "@RequestBody работает только с GET"
    ],
    answer: 0,
    explain: "@RequestBody обычно используется с JSON и HttpMessageConverter. @RequestParam подходит для query-параметров, а @ModelAttribute — для form-binding."
  },
  {
    id: "spring-028", category: "spring", level: "senior",
    q: "Что делает `@Valid` на параметре контроллера?",
    options: [
      "Запускает Bean Validation и при ошибках позволяет получить BindingResult/MethodArgumentNotValidException",
      "Проверяет SQL-синтаксис",
      "Включает транзакцию",
      "Создаёт DTO"
    ],
    answer: 0,
    explain: "@Valid инициирует валидацию ограничений (@NotNull, @Size и т. д.). Для групп валидации и method validation используют @Validated."
  },
  {
    id: "spring-029", category: "spring", level: "senior",
    q: "Для чего используется `@ControllerAdvice`?",
    options: [
      "Для глобальной обработки исключений, биндинга и модели в контроллерах",
      "Для создания бинов БД",
      "Для настройки пула потоков",
      "Для замены DispatcherServlet"
    ],
    answer: 0,
    explain: "Вместе с @ExceptionHandler он централизует маппинг ошибок в HTTP-ответы. Можно ограничить advice конкретными пакетами/аннотациями."
  },
  {
    id: "spring-030", category: "spring", level: "expert",
    q: "Чем сервлетный Filter отличается от HandlerInterceptor в Spring MVC?",
    options: [
      "Filter выполняется в контейнере до DispatcherServlet, Interceptor — внутри MVC вокруг handler",
      "Interceptor выполняется до Filter",
      "Они идентичны",
      "Filter доступен только в Spring Security"
    ],
    answer: 0,
    explain: "Filter может обрабатывать все запросы и оборачивать request/response. Interceptor знает о handler и удобен для MVC-специфичной логики, но не заменяет фильтр."
  },
  {
    id: "spring-031", category: "spring", level: "senior",
    q: "Где находится Spring Security Filter Chain относительно DispatcherServlet?",
    options: [
      "Перед DispatcherServlet: цепочка фильтров обрабатывает запрос до MVC",
      "После вызова контроллера",
      "Внутри репозитория",
      "Только при использовании JWT"
    ],
    answer: 0,
    explain: "Security реализована как набор servlet-фильтров (DelegatingFilterProxy). Аутентификация/авторизация происходят до входа в контроллер."
  },
  {
    id: "spring-032", category: "spring", level: "middle",
    q: "Чем authentication отличается от authorization?",
    options: [
      "Authentication подтверждает, кто пользователь; authorization определяет, что ему разрешено",
      "Authorization подтверждает личность, authentication выдаёт права",
      "Это синонимы",
      "Authentication работает только с JWT"
    ],
    answer: 0,
    explain: "Сначала устанавливается идентичность (логин/токен), затем проверяются права на операцию/ресурс (роли, scopes, ACL)."
  },
  {
    id: "spring-033", category: "spring", level: "senior",
    q: "Зачем нужна CSRF-защита?",
    options: [
      "Чтобы сторонний сайт не мог от имени пользователя с активной cookie-сессией выполнить state-changing запрос",
      "Чтобы шифровать пароли",
      "Чтобы ограничить размер JSON",
      "Чтобы включить CORS"
    ],
    answer: 0,
    explain: "Браузер автоматически приложит cookie к запросу с чужого сайта. CSRF-токен подтверждает намерение пользователя. Для stateless Bearer API защиту обычно отключают осознанно."
  },
  {
    id: "spring-034", category: "spring", level: "senior",
    q: "Что верно для stateless-аутентификации по JWT?",
    options: [
      "Сервер проверяет подпись и claims без серверной сессии; отзыв токена требует дополнительных механизмов",
      "JWT автоматически отзывается при logout",
      "JWT нельзя передавать в Authorization",
      "JWT шифрует payload по умолчанию"
    ],
    answer: 0,
    explain: "JWT удобен для горизонтального масштабирования, но отзыв/ротация требуют blacklist, короткого TTL и refresh-токенов. Payload обычно лишь base64url, не шифрование."
  },
  {
    id: "spring-035", category: "spring", level: "senior",
    q: "Почему пароли хешируют через BCrypt/Argon2, а не SHA-256?",
    options: [
      "Адаптивные password hashing функции медленны, используют соль и затрудняют перебор",
      "SHA-256 недостаточно быстрый для проверки",
      "BCrypt шифрует пароль с возможностью расшифровки",
      "SHA-256 не поддерживается Spring Security"
    ],
    answer: 0,
    explain: "BCrypt/Argon2 специально замедляют вычисления и используют соль. Обычные быстрые хеши без соли уязвимы к rainbow tables и GPU-перебору."
  },
  {
    id: "spring-036", category: "spring", level: "senior",
    q: "Что делает `@PreAuthorize(\"hasRole('ADMIN')\")`?",
    options: [
      "Проверяет права перед вызовом метода через method security",
      "Создаёт роль ADMIN в БД",
      "Включает CSRF",
      "Шифрует аргументы метода"
    ],
    answer: 0,
    explain: "Аннотация требует @EnableMethodSecurity и работает через AOP-прокси. Важно учитывать префикс ROLE_ и то, что self-invocation обходит проверку."
  },
  {
    id: "spring-037", category: "spring", level: "senior",
    q: "Что такое CORS?",
    options: [
      "Механизм браузера, разрешающий cross-origin запросы при наличии соответствующих HTTP-заголовков сервера",
      "Способ шифрования cookies",
      "Алгоритм балансировки",
      "Вид транзакции"
    ],
    answer: 0,
    explain: "Same-origin policy блокирует чтение ответа с другого origin. Сервер должен вернуть Access-Control-Allow-*; для нестандартных запросов сначала идёт preflight OPTIONS."
  },
  {
    id: "spring-038", category: "spring", level: "senior",
    q: "На чём основана Spring Boot auto-configuration?",
    options: [
      "На условных конфигурациях (@ConditionalOnClass, @ConditionalOnMissingBean и др.), которые активируются по classpath и свойствам",
      "На сканировании всех пакетов без условий",
      "На генерации кода при сборке",
      "На XML-файлах"
    ],
    answer: 0,
    explain: "Auto-configuration подключает разумные значения по умолчанию, отступая при наличии пользовательского бина. Порядок и условия описаны в auto-configuration imports."
  },
  {
    id: "spring-039", category: "spring", level: "middle",
    q: "Из каких аннотаций состоит `@SpringBootApplication`?",
    options: [
      "@SpringBootConfiguration, @EnableAutoConfiguration, @ComponentScan",
      "@RestController, @Service, @Repository",
      "@Configuration, @Bean, @Autowired",
      "@EnableTransactionManagement, @EnableCaching, @EnableAsync"
    ],
    answer: 0,
    explain: "Это convenience-аннотация, объединяющая конфигурацию приложения, авто-конфигурацию и сканирование пакета. Её атрибуты позволяют исключать/переопределять scan."
  },
  {
    id: "spring-040", category: "spring", level: "senior",
    q: "Зачем нужны Spring Boot starters?",
    options: [
      "Они собирают согласованный набор зависимостей для технологии, например web или data-jpa",
      "Они запускают приложение без JVM",
      "Они заменяют Maven",
      "Они создают Docker-образ"
    ],
    answer: 0,
    explain: "Starter — зависимость-агрегатор с проверенными версиями. BOM/зависимости Spring Boot управляют версиями транзитивных библиотек, снижая конфликты."
  },
  {
    id: "spring-041", category: "spring", level: "senior",
    q: "Как активировать профиль Spring `prod`?",
    options: [
      "Через `spring.profiles.active=prod` (свойство, переменная окружения или аргумент запуска)",
      "Только переименовав application.properties",
      "Только аннотацией @Profile на main-классе",
      "Профили нельзя активировать в Boot"
    ],
    answer: 0,
    explain: "Профили включают наборы конфигураций и бинов. Их можно задавать свойством, переменной `SPRING_PROFILES_ACTIVE`, CLI-аргументом или в тестах через @ActiveProfiles."
  },
  {
    id: "spring-042", category: "spring", level: "senior",
    q: "Что даёт `@ConfigurationProperties(prefix = \"app\")`?",
    options: [
      "Типобезопасное связывание группы свойств с полями класса, включая relaxed binding",
      "Создание YAML-файла",
      "Автоматическую миграцию БД",
      "Включение MVC"
    ],
    answer: 0,
    explain: "Класс получает значения из application.properties/YAML и environment. Для валидации используют Bean Validation, для регистрации — @EnableConfigurationProperties или @ConfigurationPropertiesScan."
  },
  {
    id: "spring-043", category: "spring", level: "senior",
    q: "Как безопасно относиться к Spring Boot Actuator в production?",
    options: [
      "Ограничить exposure и защитить чувствительные endpoints, оставив health/info при необходимости",
      "Открыть все endpoints без аутентификации",
      "Отключить health, потому что он не нужен",
      "Разрешить env и heapdump всем"
    ],
    answer: 0,
    explain: "Actuator может раскрывать конфигурацию, метрики и дампы. Настраивают management.endpoints.web.exposure.include, отдельный порт и аутентификацию/авторизацию."
  },
  {
    id: "spring-044", category: "spring", level: "senior",
    q: "Что происходит при запуске обычного Spring Boot web-приложения?",
    options: [
      "Запускается встроенный servlet-контейнер (по умолчанию Tomcat) и регистрируется DispatcherServlet",
      "Требуется отдельный внешний Tomcat во всех случаях",
      "Приложение работает только как WAR",
      "Boot не поддерживает embedded-серверы"
    ],
    answer: 0,
    explain: "Spring Boot упаковывает приложение в executable jar с embedded-контейнером. Внешний контейнер нужен только при осознанном развёртывании WAR."
  },
  {
    id: "spring-045", category: "spring", level: "senior",
    q: "Что делает `@SpringBootTest`?",
    options: [
      "Поднимает полный ApplicationContext и подходит для интеграционных тестов",
      "Тестирует только один контроллер без контекста",
      "Заменяет JUnit",
      "Создаёт production-базу"
    ],
    answer: 0,
    explain: "По умолчанию ищет @SpringBootConfiguration и загружает контекст. webEnvironment задаёт mock/random port/defined port; для среза контроллеров лучше @WebMvcTest."
  },
  {
    id: "spring-046", category: "spring", level: "senior",
    q: "Что тестирует `@WebMvcTest`?",
    options: [
      "Слой MVC: контроллеры, фильтры, advice, конвертеры; репозитории не поднимаются",
      "Полную БД и Kafka",
      "Только JPA-сущности",
      "Только security-конфигурацию без MVC"
    ],
    answer: 0,
    explain: "Это slice-тест с MockMvc. Зависимости контроллера мокают через @MockitoBean (ранее @MockBean). Полный контекст не загружается."
  },
  {
    id: "spring-047", category: "spring", level: "senior",
    q: "Что настраивает `@DataJpaTest`?",
    options: [
      "JPA-срез с репозиториями и EntityManager, по умолчанию транзакционный и с embedded-БД",
      "Все бины приложения",
      "Только Kafka listener",
      "Только MVC-контроллеры"
    ],
    answer: 0,
    explain: "Тест откатывается после каждого метода по умолчанию. Для реальной БД используют @AutoConfigureTestDatabase(replace = NONE) и Testcontainers."
  },
  {
    id: "spring-048", category: "spring", level: "senior",
    q: "Зачем использовать Testcontainers в тестах?",
    options: [
      "Чтобы поднимать реальные зависимости (PostgreSQL, Kafka) в Docker и тестировать с близкой к production инфраструктурой",
      "Чтобы заменить JUnit",
      "Чтобы ускорить все unit-тесты",
      "Чтобы не писать assert"
    ],
    answer: 0,
    explain: "Testcontainers управляет жизненным циклом контейнеров и позволяет избежать расхождений embedded-БД с production. Требуется Docker и разумное переиспользование контейнеров."
  },
  {
    id: "spring-049", category: "spring", level: "expert",
    q: "Почему тест с `@Transactional` может не выявить проблему с commit?",
    options: [
      "Тест откатывает транзакцию в конце, поэтому ограничения/события/видимость после commit не проверяются",
      "Транзакция в тестах всегда отключена",
      "JPA не поддерживает транзакции в тестах",
      "Из-за этого не работают mock-объекты"
    ],
    answer: 0,
    explain: "Rollback удобен для изоляции, но скрывает поведение commit, deferred constraints, outbox и кэшей. Для критичных сценариев нужен тест без отката или отдельная транзакция."
  },
  {
    id: "spring-050", category: "spring", level: "senior",
    q: "Как работает `@Cacheable` в Spring?",
    options: [
      "Через AOP-прокси: при попадании в кэш метод не вызывается, иначе результат сохраняется по key",
      "Кэширует только HTTP-ответы",
      "Всегда выполняет метод и обновляет кэш",
      "Требует Redis и не работает с локальным кэшем"
    ],
    answer: 0,
    explain: "Аннотация работает через прокси; self-invocation её обходит. Нужен CacheManager. Для условного кэширования есть condition/unless, для записи — @CachePut/@CacheEvict."
  },
  {
    id: "spring-051", category: "spring", level: "senior",
    q: "Что нужно для работы `@Async`?",
    options: [
      "Включить @EnableAsync и вызывать метод через Spring-прокси; лучше настроить собственный Executor",
      "Только добавить аннотацию к private-методу",
      "Использовать только virtual threads",
      "Отключить транзакции"
    ],
    answer: 0,
    explain: "Без прокси аннотация не сработает. По умолчанию Boot использует TaskExecutor; для управления параллелизмом и обработкой ошибок настраивают свой executor и AsyncUncaughtExceptionHandler."
  },
  {
    id: "spring-052", category: "spring", level: "senior",
    q: "Чем `fixedRate` отличается от `fixedDelay` в `@Scheduled`?",
    options: [
      "fixedRate отсчитывает интервал от старта предыдущего запуска, fixedDelay — от его завершения",
      "fixedDelay запускает параллельно, fixedRate последовательно",
      "Они полностью эквивалентны",
      "fixedRate работает только с cron"
    ],
    answer: 0,
    explain: "При долгой задаче fixedRate может накапливать задержки, а при нескольких потоках — запускать параллельно. fixedDelay гарантирует паузу после завершения."
  }
]);
