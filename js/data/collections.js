/* Коллекции и Generics — 32 вопроса */
window.JavaToryData = (window.JavaToryData || []).concat([
  {
    id: "col-001", category: "collections", level: "middle",
    q: "Какая сложность доступа по индексу у ArrayList и LinkedList?",
    options: [
      "ArrayList — O(1), LinkedList — O(n)",
      "Оба — O(1)",
      "ArrayList — O(log n), LinkedList — O(1)",
      "Оба — O(n)"
    ],
    answer: 0,
    explain: "ArrayList хранит элементы в массиве и вычисляет адрес по индексу. LinkedList для доступа по индексу проходит узлы с начала или конца."
  },
  {
    id: "col-002", category: "collections", level: "senior",
    q: "Во сколько раз обычно увеличивается ёмкость ArrayList при переполнении?",
    options: ["В 2 раза", "В 1.5 раза", "На 10 элементов", "В 3 раза"],
    answer: 1,
    explain: "OpenJDK увеличивает ёмкость примерно в 1.5 раза: `oldCapacity + (oldCapacity >> 1)`. Точная политика — деталь реализации."
  },
  {
    id: "col-003", category: "collections", level: "senior",
    q: "Какие значения по умолчанию у HashMap для capacity и load factor?",
    options: [
      "8 и 0.5",
      "16 и 0.75",
      "32 и 0.75",
      "16 и 1.0"
    ],
    answer: 1,
    explain: "По умолчанию HashMap создаётся с capacity 16 и load factor 0.75. Первое расширение происходит после 12 элементов (порог 16 × 0.75)."
  },
  {
    id: "col-004", category: "collections", level: "expert",
    q: "Зачем в HashMap Java 8+ используется treeification бакетов?",
    options: [
      "Чтобы сортировать ключи при итерации",
      "Чтобы деградация при массовых коллизиях была O(log n), а не O(n)",
      "Чтобы разрешить null-ключи",
      "Чтобы уменьшить расход памяти на каждый бакет"
    ],
    answer: 1,
    explain: "Когда бакет разрастается, связный список преобразуется в красно-чёрное дерево, и поиск в худшем случае становится логарифмическим. Обычная итерация всё равно не сортирована."
  },
  {
    id: "col-005", category: "collections", level: "expert",
    q: "Зачем HashMap выполняет `h ^ (h >>> 16)` над hashCode?",
    options: [
      "Чтобы хеш стал отрицательным",
      "Чтобы старшие биты участвовали в вычислении индекса бакета и уменьшалась кластеризация",
      "Чтобы сделать hashCode уникальным",
      "Чтобы поддерживать null-ключ"
    ],
    answer: 1,
    explain: "Индекс бакета вычисляется по младшим битам `(n - 1) & hash`. XOR со сдвигом примешивает старшие биты, снижая вероятность плохого распределения."
  },
  {
    id: "col-006", category: "collections", level: "middle",
    q: "Сколько null-ключей допускает обычный HashMap?",
    options: ["Ни одного", "Ровно один", "До 16", "Неограниченно"],
    answer: 1,
    explain: "HashMap поддерживает один null-ключ: он помещается в бакет 0. null-значений может быть сколько угодно."
  },
  {
    id: "col-007", category: "collections", level: "middle",
    q: "Что можно утверждать о порядке обхода обычного HashMap?",
    options: [
      "Он всегда совпадает с порядком вставки",
      "Он всегда отсортирован по hashCode",
      "Он не гарантирован и может измениться после resize",
      "Он гарантированно обратен порядку вставки"
    ],
    answer: 2,
    explain: "HashMap не даёт контракта на порядок. Для порядка вставки нужен LinkedHashMap, для сортировки — TreeMap."
  },
  {
    id: "col-008", category: "collections", level: "senior",
    q: "Какие null-значения допускает ConcurrentHashMap?",
    options: [
      "И null-ключи, и null-значения",
      "Null-ключи, но не null-значения",
      "Null-значения, но не null-ключи",
      "Ни null-ключи, ни null-значения"
    ],
    answer: 3,
    explain: "ConcurrentHashMap запрещает null и в ключах, и в значениях. Это устраняет неоднозначность при конкурентных операциях и проверках вида containsKey."
  },
  {
    id: "col-009", category: "collections", level: "senior",
    q: "Почему `computeIfAbsent` в ConcurrentHashMap предпочтительнее пары `containsKey` + `put`?",
    options: [
      "computeIfAbsent выполняет проверку и вставку атомарно для ключа",
      "Он автоматически сортирует ключи",
      "Он не блокирует другие потоки вообще",
      "Он запрещает null-значения только в этом методе"
    ],
    answer: 0,
    explain: "Две отдельные операции создают race condition. computeIfAbsent атомарно вычисляет и вставляет значение; функция не должна выполнять долгие блокирующие операции."
  },
  {
    id: "col-010", category: "collections", level: "senior",
    q: "Что верно для итераторов ConcurrentHashMap?",
    options: [
      "Они fail-fast и бросают ConcurrentModificationException при изменении",
      "Они weakly consistent: не бросают CME и могут видеть часть изменений",
      "Они всегда возвращают снимок на момент создания",
      "Они блокируют всю мапу на время обхода"
    ],
    answer: 1,
    explain: "Итераторы ConcurrentHashMap слабо согласованы: не падают при конкурентных изменениях, но и не гарантируют полный snapshot. Это компромисс в пользу масштабируемости."
  },
  {
    id: "col-011", category: "collections", level: "senior",
    q: "Чем `Collections.synchronizedMap` принципиально отличается от ConcurrentHashMap?",
    options: [
      "SynchronizedMap синхронизирует операции на одном мониторе и хуже масштабируется при конкурентной записи",
      "SynchronizedMap разрешает конкурентную запись без блокировок",
      "ConcurrentHashMap не потокобезопасен",
      "SynchronizedMap нельзя использовать для чтения"
    ],
    answer: 0,
    explain: "SynchronizedMap — обёртка с единой блокировкой. ConcurrentHashMap использует более гранулярные механизмы и lock-free чтения, поэтому лучше подходит под нагрузку."
  },
  {
    id: "col-012", category: "collections", level: "senior",
    q: "Когда CopyOnWriteArrayList особенно уместен?",
    options: [
      "При частых записях и редких чтениях",
      "При преимущественно редких записях и частых чтениях, где допустим snapshot-итератор",
      "Когда нужна сортировка элементов",
      "Когда требуется запретить null-элементы"
    ],
    answer: 1,
    explain: "Каждая запись копирует весь массив, поэтому структура выгодна при чтении гораздо чаще записи. Итератор видит снимок и не бросает CME."
  },
  {
    id: "col-013", category: "collections", level: "senior",
    q: "Что означает fail-fast поведение итератора ArrayList?",
    options: [
      "Итератор гарантированно предотвращает любое конкурентное изменение",
      "Итератор обнаруживает структурную модификацию по modCount и обычно бросает ConcurrentModificationException",
      "Итератор блокирует список на время обхода",
      "Итератор автоматически создаёт копию списка"
    ],
    answer: 1,
    explain: "Fail-fast — best-effort диагностика, а не гарантия потокобезопасности. Структурное изменение в обход итератора обычно приводит к CME."
  },
  {
    id: "col-014", category: "collections", level: "middle",
    q: "Как корректно удалить элемент во время обхода ArrayList?",
    options: [
      "Вызвать `list.remove(element)` прямо в for-each",
      "Использовать `iterator.remove()`",
      "Использовать `list.clear()` внутри цикла",
      "Изменить modCount через reflection"
    ],
    answer: 1,
    explain: "Iterator.remove удаляет текущий элемент и синхронизирует ожидаемый modCount. Удаление через сам список во время for-each приводит к CME."
  },
  {
    id: "col-015", category: "collections", level: "senior",
    q: "Что верно для `List.of(\"a\", \"b\")`?",
    options: [
      "Список изменяемый, но фиксированного размера",
      "Список неизменяемый и не допускает null-элементы",
      "Список можно расширить через add",
      "Он всегда возвращает ArrayList"
    ],
    answer: 1,
    explain: "List.of создаёт неизменяемый список, запрещающий null. Попытка add/remove/set приводит к UnsupportedOperationException."
  },
  {
    id: "col-016", category: "collections", level: "senior",
    q: "Чем `Arrays.asList(array)` отличается от `new ArrayList<>(Arrays.asList(array))`?",
    options: [
      "Первый возвращает представление фиксированного размера, связанное с массивом; второй — независимый изменяемый ArrayList",
      "Оба возвращают неизменяемые списки",
      "Первый копирует массив, второй — нет",
      "Второй нельзя изменять"
    ],
    answer: 0,
    explain: "Arrays.asList — view поверх массива: set меняет массив, add/remove запрещены. Конструктор ArrayList создаёт изменяемую копию."
  },
  {
    id: "col-017", category: "collections", level: "expert",
    q: "Чем `Collections.unmodifiableList(list)` отличается от `List.copyOf(list)`?",
    options: [
      "unmodifiableList — read-only view исходного списка, copyOf — независимая неизменяемая копия",
      "copyOf возвращает изменяемый список",
      "unmodifiableList копирует данные",
      "Оба метода возвращают один и тот же объект"
    ],
    answer: 0,
    explain: "Read-only view отражает последующие изменения исходного списка. copyOf создаёт отдельную копию, которая не меняется вместе с оригиналом."
  },
  {
    id: "col-018", category: "collections", level: "senior",
    q: "Как сделать LRU-кэш на LinkedHashMap?",
    options: [
      "Использовать конструктор с accessOrder=true и переопределить removeEldestEntry",
      "Установить loadFactor=1.0",
      "Вызывать sort() после каждой вставки",
      "Использовать ключи типа String"
    ],
    answer: 0,
    explain: "`new LinkedHashMap<>(capacity, 0.75f, true)` упорядочивает по доступу. removeEldestEntry задаёт политику вытеснения при превышении размера."
  },
  {
    id: "col-019", category: "collections", level: "senior",
    q: "Какие методы предоставляет NavigableMap для поиска ближайших ключей?",
    options: [
      "floorKey, ceilingKey, lowerKey, higherKey",
      "firstKey, lastKey, size, clear",
      "leftKey, rightKey, parentKey",
      "sortKey, rankKey, medianKey"
    ],
    answer: 0,
    explain: "NavigableMap расширяет SortedMap навигационными операциями: floor/ceiling/lower/higher, а также subMap, headMap и tailMap."
  },
  {
    id: "col-020", category: "collections", level: "senior",
    q: "Что верно для PriorityQueue?",
    options: [
      "Итерация по ней возвращает элементы в отсортированном порядке",
      "peek возвращает минимальный элемент (для natural ordering), а полная сортировка при итерации не гарантируется",
      "Она потокобезопасна",
      "Она не допускает элементы с одинаковым приоритетом"
    ],
    answer: 1,
    explain: "PriorityQueue — бинарная куча: минимум доступен за O(1), poll — O(log n). Обход в ширину не даёт отсортированной последовательности."
  },
  {
    id: "col-021", category: "collections", level: "senior",
    q: "Почему ArrayDeque предпочтительнее Stack и LinkedList для очереди/стека?",
    options: [
      "Он потокобезопасен",
      "Он даёт O(1) вставку/удаление с обоих концов и не имеет накладных расходов на узлы",
      "Он разрешает null-элементы",
      "Он автоматически сортирует элементы"
    ],
    answer: 1,
    explain: "ArrayDeque реализован на кольцевом массиве, быстр и экономичен. Stack синхронизирован и устарел, LinkedList тратит память на узлы. null запрещён."
  },
  {
    id: "col-022", category: "collections", level: "middle",
    q: "Как внутри устроен HashSet?",
    options: [
      "На массиве с линейным поиском",
      "На HashMap, где элементы являются ключами",
      "На красно-чёрном дереве",
      "На LinkedList"
    ],
    answer: 1,
    explain: "HashSet использует HashMap: элемент — ключ, значение — общий маркер-заглушка. Поэтому к элементам применяются требования equals/hashCode."
  },
  {
    id: "col-023", category: "collections", level: "expert",
    q: "Почему в HashMap важно, чтобы ключи имели корректный и стабильный hashCode?",
    options: [
      "Иначе компилятор не даст добавить ключ",
      "По hashCode выбирается бакет, и при разных hashCode у равных объектов поиск может не найти запись",
      "hashCode влияет только на порядок итерации",
      "Без hashCode HashMap работает через equals за O(1)"
    ],
    answer: 1,
    explain: "Сначала по hashCode определяется бакет, затем equals ищет среди элементов. Нарушение контракта делает равные ключи невидимыми друг для друга."
  },
  {
    id: "col-024", category: "collections", level: "senior",
    q: "Зачем задавать `new HashMap<>(expectedSize)` заранее?",
    options: [
      "Чтобы отсортировать ключи",
      "Чтобы уменьшить количество resize и перераспределений при известном объёме данных",
      "Чтобы разрешить null-ключи",
      "Чтобы отключить treeification"
    ],
    answer: 1,
    explain: "Resize перестраивает таблицу и дорог. Оценка размера снижает число расширений. При этом capacity всё равно округляется до степени двойки."
  },
  {
    id: "col-025", category: "collections", level: "senior",
    q: "Что такое type erasure в Java?",
    options: [
      "Удаление generic-информации после компиляции с заменой на верхнюю границу и проверками в местах использования",
      "Сохранение generic-типов в байткоде для reflection",
      "Запрет параметризованных типов",
      "Преобразование generics в массивы"
    ],
    answer: 0,
    explain: "На этапе компиляции добавляются проверки и приведения, а в байткоде параметры стираются до Object или bound. Поэтому `List<String>.getClass() == List<Integer>.getClass()`."
  },
  {
    id: "col-026", category: "collections", level: "senior",
    q: "Что можно делать с `List<?> list`?",
    options: [
      "Добавлять любые элементы",
      "Читать элементы как Object, но нельзя добавлять что-либо, кроме null",
      "Добавлять только String",
      "Менять тип списка через cast без предупреждений"
    ],
    answer: 1,
    explain: "Wildcard `?` означает неизвестный тип. Компилятор разрешает чтение как Object, но запрещает запись, поскольку реальный тип неизвестен."
  },
  {
    id: "col-027", category: "collections", level: "expert",
    q: "Что означает принцип PECS?",
    options: [
      "Producer Extends, Consumer Super",
      "Private Extends, Class Super",
      "Public Entity, Constructor Service",
      "Parameter Erasure, Cast Safety"
    ],
    answer: 0,
    explain: "Если структура только отдаёт значения — `? extends T`; если только принимает — `? super T`. Это расширяет набор допустимых типов и сохраняет типобезопасность."
  },
  {
    id: "col-028", category: "collections", level: "senior",
    q: "Почему `List<String>` не является подтипом `List<Object>`?",
    options: [
      "Из-за инвариантности generics: иначе через List<Object> можно было бы добавить Integer в List<String>",
      "Потому что String не наследует Object",
      "Из-за type erasure это невозможно выразить",
      "Потому что List — интерфейс"
    ],
    answer: 0,
    explain: "Generics инвариантны ради типобезопасности. Ковариантность чтения выражается wildcard-ом `List<? extends Object>`, но запись при этом ограничивается."
  },
  {
    id: "col-029", category: "collections", level: "expert",
    q: "Почему нельзя создать массив generic-типа `new T[10]`?",
    options: [
      "Из-за type erasure: массив знает свой компонентный тип во время выполнения, а T стирается",
      "Массивы в Java всегда неизменяемы",
      "T можно использовать только в интерфейсах",
      "Это разрешено, но только для T extends Number"
    ],
    answer: 0,
    explain: "Массивы ковариантны и проверяют тип элементов в runtime, а generic-параметр стирается. Компилятор не может гарантировать безопасность такого массива."
  },
  {
    id: "col-030", category: "collections", level: "expert",
    q: "Где разрешено применять `@SafeVarargs`?",
    options: [
      "К любому методу с varargs",
      "К static, final или private методам и конструкторам, где varargs-массив не сохраняется и не изменяется небезопасно",
      "Только к интерфейсам",
      "Только к generic-классам"
    ],
    answer: 1,
    explain: "Аннотация подавляет предупреждение о heap pollution, но только для методов, которые нельзя переопределить, и при реальной безопасности реализации."
  },
  {
    id: "col-031", category: "collections", level: "senior",
    q: "Почему EnumSet и EnumMap часто эффективнее HashSet и HashMap для enum-ключей?",
    options: [
      "Они используют битовую маску/обычный массив и не вычисляют hashCode",
      "Они потокобезопасны",
      "Они поддерживают null-ключи",
      "Они автоматически сортируют по вставке"
    ],
    answer: 0,
    explain: "EnumSet хранит битовую маску, EnumMap — индексированный массив по ordinal. Это экономит память и убирает хеширование."
  },
  {
    id: "col-032", category: "collections", level: "senior",
    q: "Как корректно составить Comparator по двум полям?",
    options: [
      "`Comparator.comparing(Person::name).thenComparing(Person::age)`",
      "`Comparator.comparing(Person::name).compare(Person::age)`",
      "`Comparator.thenComparing(Person::name, Person::age)`",
      "`Comparator.naturalOrder(Person::name, Person::age)`"
    ],
    answer: 0,
    explain: "thenComparing добавляет вторичный ключ, если первичный сравнялся. Для null-safe сравнения используют nullsFirst/nullsLast."
  }
]);
