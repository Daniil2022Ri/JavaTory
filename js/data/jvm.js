/* JVM, GC и производительность — 30 вопросов */
window.JavaToryData = (window.JavaToryData || []).concat([
  {
    id: "jvm-001", category: "jvm", level: "senior",
    q: "Какие области памяти JVM являются общими для всех потоков?",
    options: [
      "Heap и Metaspace, тогда как стек и PC-регистр принадлежат потоку",
      "Только стек",
      "Все области, включая стек, общие",
      "Только PC-регистр"
    ],
    answer: 0,
    explain: "Heap и Metaspace (а также code cache) разделяются потоками. У каждого потока собственный стек и PC-регистр; нативные стеки зависят от платформы."
  },
  {
    id: "jvm-002", category: "jvm", level: "senior",
    q: "Где в Java 8+ хранится метаинформация о классах?",
    options: ["В PermGen внутри heap", "В Metaspace, размещённом в native memory", "В стеке потока", "В TLAB"],
    answer: 1,
    explain: "PermGen удалён в Java 8, метаданные классов перенесены в Metaspace. Его размер по умолчанию ограничен доступной native memory, но может задаваться параметрами."
  },
  {
    id: "jvm-003", category: "jvm", level: "senior",
    q: "Что обычно вызывает StackOverflowError, а что OutOfMemoryError: Java heap space?",
    options: [
      "SOE — слишком глубокая рекурсия/стек; OOM heap — исчерпание heap объектами",
      "SOE — исчерпание heap; OOM heap — глубокая рекурсия",
      "Оба возникают только из-за Metaspace",
      "Оба относятся только к native memory"
    ],
    answer: 0,
    explain: "StackOverflowError сигнализирует о переполнении стека вызовов, чаще из-за рекурсии. Heap OOM возникает, когда объекты не помещаются после сборки мусора."
  },
  {
    id: "jvm-004", category: "jvm", level: "expert",
    q: "Какие этапы включает linking класса?",
    options: [
      "Verification, preparation, resolution",
      "Loading, compilation, execution",
      "Scanning, parsing, optimizing",
      "Initialization, finalization, unloading"
    ],
    answer: 0,
    explain: "Linking состоит из verification (проверка корректности байткода), preparation (память и значения по умолчанию для static) и resolution (разрешение ссылок)."
  },
  {
    id: "jvm-005", category: "jvm", level: "expert",
    q: "Что происходит на этапе preparation при загрузке класса?",
    options: [
      "Выполняется static-инициализатор",
      "Выделяется память под static-поля и присваиваются значения по умолчанию",
      "Проверяется байткод",
      "Класс немедленно выгружается"
    ],
    answer: 1,
    explain: "Preparation устанавливает нулевые/дефолтные значения. Явные инициализаторы и static-блоки выполняются позже, на этапе initialization, в методе `<clinit>`."
  },
  {
    id: "jvm-006", category: "jvm", level: "senior",
    q: "Как работает parent delegation model загрузки классов?",
    options: [
      "Сначала загрузчик ищет класс у родителя, и только потом пытается загрузить сам",
      "Сначала всегда загружает класс из пользовательского classpath",
      "Класс загружается параллельно всеми загрузчиками",
      "Bootstrap-загрузчик обращается к пользовательскому загрузчику"
    ],
    answer: 0,
    explain: "Запрос делегируется вверх до bootstrap. Это защищает базовые классы от подмены и обеспечивает единообразие. Пользовательский загрузчик может нарушить модель осознанно."
  },
  {
    id: "jvm-007", category: "jvm", level: "senior",
    q: "Чем NoClassDefFoundError отличается от ClassNotFoundException?",
    options: [
      "Это одно и то же",
      "ClassNotFoundException — checked-исключение при явной загрузке по имени; NoClassDefFoundError — ошибка, когда класс был доступен при компиляции, но не загрузился в runtime",
      "NoClassDefFoundError возникает только у интерфейсов",
      "ClassNotFoundException — ошибка JVM, NoClassDefFoundError — checked"
    ],
    answer: 1,
    explain: "ClassNotFoundException бросают Class.forName и загрузчики. NoClassDefFoundError — LinkageError, часто из-за отсутствия класса в classpath или неудачи его инициализации."
  },
  {
    id: "jvm-008", category: "jvm", level: "senior",
    q: "Что может выступать GC root?",
    options: [
      "Только объекты, созданные в main",
      "Ссылки в стеке активных потоков, статические поля классов, JNI-ссылки и мониторы",
      "Только объекты старше одной сборки",
      "Любые объекты с переопределённым finalize"
    ],
    answer: 1,
    explain: "GC обходит граф от корней: локальные переменные активных потоков, static-поля, JNI, активные мониторы и т. п. Всё достижимое от корней считается живым."
  },
  {
    id: "jvm-009", category: "jvm", level: "senior",
    q: "Соберёт ли GC циклическую структуру объектов, недостижимую из корней?",
    options: [
      "Нет, циклы всегда остаются в памяти",
      "Да, современные сборщики анализируют достижимость, а не только счётчики ссылок",
      "Только если вызвать System.gc()",
      "Только при использовании WeakReference"
    ],
    answer: 1,
    explain: "JVM использует tracing GC: недостижимый цикл не является живым. System.gc() лишь рекомендует сборку и не должен быть частью логики."
  },
  {
    id: "jvm-010", category: "jvm", level: "middle",
    q: "Какая ссылка не позволяет собрать объект, пока сама ссылка достижима?",
    options: ["StrongReference", "SoftReference", "WeakReference", "PhantomReference"],
    answer: 0,
    explain: "Обычная сильная ссылка удерживает объект. Soft может быть очищена при нехватке памяти, weak — при следующей сборке, phantom не даёт доступ к объекту."
  },
  {
    id: "jvm-011", category: "jvm", level: "senior",
    q: "Когда JVM обычно очищает SoftReference?",
    options: [
      "При каждой young GC",
      "При давлении на память, чтобы избежать OutOfMemoryError",
      "Только при завершении JVM",
      "Никогда"
    ],
    answer: 1,
    explain: "Soft-ссылки хороши для memory-sensitive кэшей: JVM стремится сохранить их, но очищает при нехватке heap. Поведение зависит от реализации."
  },
  {
    id: "jvm-012", category: "jvm", level: "senior",
    q: "Что такое WeakHashMap?",
    options: [
      "Map, которая хранит ключи только до тех пор, пока на них есть сильные ссылки извне",
      "Map, которая никогда не удаляет записи",
      "Потокобезопасная реализация HashMap",
      "Map, использующая только строковые ключи"
    ],
    answer: 0,
    explain: "Ключи WeakHashMap хранятся через WeakReference. Когда на ключ больше никто не ссылается, запись может исчезнуть после GC. Это не общий потокобезопасный кэш."
  },
  {
    id: "jvm-013", category: "jvm", level: "expert",
    q: "Что верно для PhantomReference?",
    options: [
      "Через неё можно получить объект и изменить его",
      "Она позволяет узнать о недостижимости объекта через ReferenceQueue, но get() всегда возвращает null",
      "Она продлевает жизнь объекта навсегда",
      "Она работает только с примитивами"
    ],
    answer: 1,
    explain: "Phantom-ссылка используется для посмертной очистки ресурсов. Объект уже недоступен через get(); уведомление приходит через очередь ссылок."
  },
  {
    id: "jvm-014", category: "jvm", level: "senior",
    q: "Почему finalize() считается плохим механизмом очистки?",
    options: [
      "Он не гарантирует своевременный вызов и может существенно усложнить/задержать сборку",
      "Он вызывается слишком часто и сразу после создания",
      "Он работает только для массивов",
      "Он запрещён компилятором"
    ],
    answer: 0,
    explain: "Время вызова finalize не определено, метод может не выполниться, а его наличие усложняет GC. Используют try-with-resources, Cleaner или явное закрытие."
  },
  {
    id: "jvm-015", category: "jvm", level: "senior",
    q: "Из каких областей обычно состоит young generation в классическом generational GC?",
    options: [
      "Eden и два Survivor-пространства",
      "Old и Metaspace",
      "Code Cache и TLAB",
      "Только один Survivor"
    ],
    answer: 0,
    explain: "Новые объекты аллоцируются в Eden. Выжившие при minor GC копируются в Survivor, а после нескольких сборок могут быть повышены в old generation."
  },
  {
    id: "jvm-016", category: "jvm", level: "senior",
    q: "Что такое promotion в контексте GC?",
    options: [
      "Перемещение выживших объектов из young в old generation",
      "Повышение приоритета потока",
      "Сжатие Metaspace",
      "Переход JIT на C2"
    ],
    answer: 0,
    explain: "Объекты, пережившие несколько minor GC (или не поместившиеся в Survivor), продвигаются в old generation. Частый promotion может увеличивать давление на old GC."
  },
  {
    id: "jvm-017", category: "jvm", level: "expert",
    q: "Зачем нужен TLAB?",
    options: [
      "Для быстрого выделения памяти потоком без гонки за общий указатель heap",
      "Для хранения метаданных классов",
      "Для сжатия строк",
      "Для DirectByteBuffer"
    ],
    answer: 0,
    explain: "Thread-Local Allocation Buffer — локальный участок Eden. Поток выделяет объекты из него, снижая конкуренцию; новый TLAB запрашивается при исчерпании."
  },
  {
    id: "jvm-018", category: "jvm", level: "expert",
    q: "Что может сделать JIT благодаря escape analysis?",
    options: [
      "Гарантированно разместить все объекты в стеке",
      "Убрать аллокацию или разложить объект на скалярные поля, если он не «убегает»",
      "Отключить сборку мусора",
      "Автоматически сделать класс immutable"
    ],
    answer: 1,
    explain: "Escape analysis позволяет оптимизировать невышедшие за пределы метода объекты: scalar replacement, устранение блокировок. Это оптимизация, а не гарантия языка."
  },
  {
    id: "jvm-019", category: "jvm", level: "senior",
    q: "Какую модель памяти использует G1 GC?",
    options: [
      "Heap разбит на регионы; сборщик может собирать их частично и стремится уложиться в target pause",
      "Один непрерывный old generation без регионов",
      "Только stack allocation",
      "Metaspace вместо heap"
    ],
    answer: 0,
    explain: "G1 делит heap на регионы (Eden, Survivor, Old, Humongous) и собирает наиболее «мусорные» с учётом целевой паузы. Это default GC во многих современных JDK."
  },
  {
    id: "jvm-020", category: "jvm", level: "senior",
    q: "Для чего оптимизирован ZGC?",
    options: [
      "Для максимальной пропускной способности пакетной обработки",
      "Для очень низких пауз GC при больших heap",
      "Для минимизации Metaspace",
      "Для сборки только young generation"
    ],
    answer: 1,
    explain: "ZGC — низколатентный сборщик с конкурентной работой и очень короткими паузами. В современных JDK он generational и поддерживает большие heap."
  },
  {
    id: "jvm-021", category: "jvm", level: "senior",
    q: "Какой GC обычно ориентирован на максимальную пропускную способность?",
    options: ["Parallel GC", "ZGC", "Shenandoah", "G1 с target 1 ms"],
    answer: 0,
    explain: "Parallel GC использует несколько потоков и минимизирует накладные расходы, ориентируясь на throughput, но с более длинными STW-паузами."
  },
  {
    id: "jvm-022", category: "jvm", level: "middle",
    q: "Что означает stop-the-world пауза?",
    options: [
      "Приложение продолжает работать, но без I/O",
      "Все прикладные потоки JVM приостанавливаются на время фазы GC",
      "Останавливается только GC-поток",
      "JVM завершает работу"
    ],
    answer: 1,
    explain: "На STW-фазе прикладные потоки не выполняются, что влияет на latency. Современные сборщики сокращают такие паузы, выполняя большую часть работы конкурентно."
  },
  {
    id: "jvm-023", category: "jvm", level: "middle",
    q: "Что задаёт `-Xmx`?",
    options: [
      "Начальный размер heap",
      "Максимальный размер heap",
      "Размер Metaspace",
      "Размер стека каждого потока"
    ],
    answer: 1,
    explain: "`-Xmx` — максимальный heap, `-Xms` — начальный. Нередко их выравнивают, чтобы избежать дорогого роста heap в runtime. Размер стека задаёт `-Xss`."
  },
  {
    id: "jvm-024", category: "jvm", level: "senior",
    q: "Какой флаг поможет получить heap dump при OutOfMemoryError?",
    options: [
      "`-XX:+HeapDumpOnOutOfMemoryError`",
      "`-XX:+PrintGCDetails`",
      "`-Xss512k`",
      "`-XX:+UseCompressedOops`"
    ],
    answer: 0,
    explain: "Флаг создаёт дамп при OOM; путь задаётся `-XX:HeapDumpPath`. Это ключевой инструмент post-mortem анализа утечек."
  },
  {
    id: "jvm-025", category: "jvm", level: "senior",
    q: "Что показывает `jstack`?",
    options: [
      "Heap dump",
      "Thread dump со стеками потоков и состоянием блокировок",
      "Список классов Metaspace",
      "GC-логи"
    ],
    answer: 1,
    explain: "jstack (или `jcmd Thread.print`) снимает thread dump. Он помогает искать deadlock, зависшие потоки и hot spots, но не анализирует содержимое heap."
  },
  {
    id: "jvm-026", category: "jvm", level: "senior",
    q: "Какая утилита строит гистограмму классов в heap?",
    options: ["jmap -histo", "jstack", "jrunscript", "keytool"],
    answer: 0,
    explain: "`jmap -histo:live` показывает количество и суммарный размер экземпляров классов. Для полноценного анализа дампа используют MAT, VisualVM и другие инструменты."
  },
  {
    id: "jvm-027", category: "jvm", level: "senior",
    q: "Что такое Java Flight Recorder (JFR)?",
    options: [
      "Профайлер/система событий с низкими накладными расходами, встроенная в JDK",
      "Менеджер зависимостей",
      "Альтернатива HTTPS",
      "Инструмент сборки"
    ],
    answer: 0,
    explain: "JFR записывает события JVM и приложения с минимальным overhead. Запись анализируют через JDK Mission Control или `jfr` CLI."
  },
  {
    id: "jvm-028", category: "jvm", level: "expert",
    q: "Почему утечка ClassLoader приводит к утечке Metaspace?",
    options: [
      "ClassLoader удерживает загруженные классы и их метаданные; пока он жив, классы не выгружаются",
      "ClassLoader хранит только строки",
      "Metaspace очищается только вручную",
      "Классы всегда живут до перезапуска JVM"
    ],
    answer: 0,
    explain: "Класс выгружается, когда недостижимы его ClassLoader и классы. Долгоживущая ссылка на загрузчик (например, в ThreadLocal или статическом поле) удерживает всю метаинформацию."
  },
  {
    id: "jvm-029", category: "jvm", level: "expert",
    q: "Где находятся данные DirectByteBuffer?",
    options: [
      "В heap, как обычный byte[]",
      "В native memory вне heap; освобождаются через Cleaner при недостижимости",
      "В Metaspace",
      "В стеке потока"
    ],
    answer: 1,
    explain: "DirectByteBuffer выделяет память вне Java heap, что удобно для I/O, но не учитывается в `-Xmx`. Освобождение зависит от GC/Cleaner, поэтому важны лимиты и аккуратность."
  },
  {
    id: "jvm-030", category: "jvm", level: "senior",
    q: "Зачем JVM использует tiered compilation?",
    options: [
      "Чтобы быстро стартовать с C1 и затем оптимизировать горячий код через C2",
      "Чтобы интерпретировать весь код без JIT",
      "Чтобы отключить профилирование",
      "Чтобы компилировать только один раз при загрузке"
    ],
    answer: 0,
    explain: "Tiered compilation сочетает быстрый C1 и агрессивный C2: приложение быстро стартует, а горячие методы со временем получают более оптимальный код."
  }
]);
