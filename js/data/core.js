/* Java Core — 48 вопросов */
window.JavaToryData = (window.JavaToryData || []).concat([
  {
    id: "core-001", category: "core", level: "middle",
    q: "Что произойдёт при выполнении `String s = \"java\"; s += \"tory\";`?",
    options: [
      "Исходная строка изменится, новый объект не создаётся",
      "Будет создан новый объект String, а переменная s начнёт ссылаться на него",
      "Компилятор запретит конкатенацию со строковым литералом",
      "В пул строк будет добавлена изменяемая строка"
    ],
    answer: 1,
    explain: "String неизменяем. Оператор += создаёт новую строку и переприсваивает ссылку; исходный объект остаётся прежним."
  },
  {
    id: "core-002", category: "core", level: "middle",
    q: "Что выведет код?\n`String a = \"hello\"; String b = \"hel\" + \"lo\"; System.out.println(a == b);`",
    options: ["true", "false", "Ошибка компиляции", "Результат зависит от JVM"],
    answer: 0,
    explain: "Оба выражения являются константными выражениями времени компиляции. Строки интернируются, поэтому a и b ссылаются на один объект пула."
  },
  {
    id: "core-003", category: "core", level: "middle",
    q: "Чему равны результаты `new String(\"x\") == \"x\"` и `new String(\"x\").equals(\"x\")`?",
    options: [
      "false и true",
      "true и true",
      "false и false",
      "true и false"
    ],
    answer: 0,
    explain: "new String всегда создаёт объект вне пула, поэтому == сравнивает разные ссылки. equals сравнивает содержимое и возвращает true."
  },
  {
    id: "core-004", category: "core", level: "senior",
    q: "Какое требование к контракту equals/hashCode является обязательным?",
    options: [
      "У любых двух объектов с одинаковым hashCode обязательно должен быть одинаковый equals",
      "Если equals возвращает true, hashCode обязан совпадать",
      "hashCode обязан быть уникальным для каждого объекта",
      "equals обязан учитывать все поля без исключения"
    ],
    answer: 1,
    explain: "Равные по equals объекты должны иметь одинаковый hashCode. Обратное не требуется: коллизии hashCode допустимы."
  },
  {
    id: "core-005", category: "core", level: "senior",
    q: "Какое утверждение о record в Java 17+ неверно?",
    options: [
      "Record неявно является final-классом",
      "Компилятор генерирует конструктор, accessor-методы, equals, hashCode и toString",
      "Record автоматически реализует Serializable",
      "Компоненты record нельзя сделать изменяемыми через сеттеры"
    ],
    answer: 2,
    explain: "Record не реализует Serializable автоматически. Если сериализация нужна, интерфейс указывают явно. Остальные утверждения верны."
  },
  {
    id: "core-006", category: "core", level: "senior",
    q: "Что верно для sealed-иерархии классов?",
    options: [
      "Sealed-класс нельзя сделать абстрактным",
      "Все прямые наследники должны быть final, sealed или non-sealed",
      "Наследники обязаны находиться в другом модуле",
      "Sealed-класс можно наследовать без ограничений, если указан permits"
    ],
    answer: 1,
    explain: "Каждый разрешённый прямой наследник должен выбрать один из трёх режимов: final, sealed или non-sealed. Наследники также должны находиться в разрешённом модуле/пакете."
  },
  {
    id: "core-007", category: "core", level: "senior",
    q: "Класс реализует интерфейсы A и B, у которых есть default-метод `hello()` с одинаковой сигнатурой. Что необходимо сделать?",
    options: [
      "Ничего, компилятор выберет метод из интерфейса A",
      "Переопределить hello() и при необходимости вызвать `A.super.hello()` или `B.super.hello()`",
      "Удалить один из интерфейсов",
      "Объявить метод abstract в классе"
    ],
    answer: 1,
    explain: "При конфликте default-методов класс обязан переопределить метод. Вызов конкретной реализации делается через `ИмяИнтерфейса.super.метод()`."
  },
  {
    id: "core-008", category: "core", level: "senior",
    q: "Что выведет код?\n`class A { static String name() { return \"A\"; } }`\n`class B extends A { static String name() { return \"B\"; } }`\n`A x = new B(); System.out.println(x.name());`",
    options: ["A", "B", "Ошибка компиляции", "ClassCastException"],
    answer: 0,
    explain: "Статические методы не переопределяются, а скрываются. Метод выбирается по типу ссылки на этапе компиляции, поэтому вызывается A.name()."
  },
  {
    id: "core-009", category: "core", level: "middle",
    q: "Что произойдёт при выполнении?\n`final List<String> list = new ArrayList<>(); list.add(\"x\");`",
    options: [
      "Ошибка компиляции: final-коллекцию нельзя менять",
      "Ошибка времени выполнения",
      "Код компилируется и добавляет элемент: final запрещает менять ссылку, а не состояние объекта",
      "Будет создана неизменяемая копия списка"
    ],
    answer: 2,
    explain: "final гарантирует, что ссылка не будет переприсвоена. Содержимое объекта при этом можно менять."
  },
  {
    id: "core-010", category: "core", level: "middle",
    q: "Какое исключение является checked?",
    options: ["IllegalArgumentException", "NullPointerException", "IOException", "ClassCastException"],
    answer: 2,
    explain: "IOException наследует Exception, но не RuntimeException, поэтому является checked. Остальные — unchecked-наследники RuntimeException."
  },
  {
    id: "core-011", category: "core", level: "senior",
    q: "В каком порядке закрываются ресурсы в try-with-resources при нескольких объявленных ресурсах?",
    options: [
      "В порядке объявления",
      "В обратном порядке объявления",
      "Порядок не определён спецификацией",
      "Сначала все успешные, затем все с ошибками"
    ],
    answer: 1,
    explain: "Ресурсы закрываются в обратном порядке. Исключения при закрытии добавляются к основному как suppressed."
  },
  {
    id: "core-012", category: "core", level: "senior",
    q: "Какое ограничение действует на переменную в multi-catch (`catch (IOException | SQLException e)`)?",
    options: [
      "Её нельзя использовать внутри блока catch",
      "Она неявно final, поэтому переприсваивание запрещено",
      "Её тип всегда Throwable",
      "В multi-catch можно указывать только unchecked-исключения"
    ],
    answer: 1,
    explain: "Переменная multi-catch неявно final. При этом её тип — общий предок перечисленных исключений, и вызывать можно только его методы."
  },
  {
    id: "core-013", category: "core", level: "senior",
    q: "Что вернёт метод?\n`static int f() { try { return 1; } finally { return 2; } }`",
    options: ["1", "2", "Ошибка компиляции", "Не определено — зависит от JVM"],
    answer: 1,
    explain: "return в finally перекрывает return из try. Такой код опасен: finally может незаметно проглотить исключение и значение из try."
  },
  {
    id: "core-014", category: "core", level: "senior",
    q: "В чём практическая разница между `optional.orElse(compute())` и `optional.orElseGet(() -> compute())`?",
    options: [
      "Разницы нет, оба варианта ленивы",
      "orElse вычисляет аргумент всегда, orElseGet вызывает Supplier только при пустом Optional",
      "orElseGet работает только с примитивами",
      "orElse возвращает null при пустом Optional"
    ],
    answer: 1,
    explain: "Аргумент orElse вычисляется eagerly до вызова метода. orElseGet ленив и позволяет избежать дорогого вычисления при наличии значения."
  },
  {
    id: "core-015", category: "core", level: "senior",
    q: "Чем `Optional.map` отличается от `Optional.flatMap`?",
    options: [
      "map умеет работать только со строками",
      "flatMap автоматически разворачивает вложенный Optional, а map оборачивает результат ещё раз",
      "map не выполняется для пустого Optional, а flatMap выполняется",
      "flatMap возвращает null вместо Optional"
    ],
    answer: 1,
    explain: "Если функция возвращает Optional, map даст Optional<Optional<T>>, а flatMap — Optional<T>. Для пустого Optional обе операции не вызывают маппер."
  },
  {
    id: "core-016", category: "core", level: "middle",
    q: "Что верно для switch-выражения в Java 17+?",
    options: [
      "Стрелочные ветви проваливаются в следующую, как в старом switch",
      "Для возврата значения из блочной ветви используется yield",
      "Switch-выражение может возвращать только void",
      "В switch-выражении нельзя использовать enum"
    ],
    answer: 1,
    explain: "Ветви со стрелкой не проваливаются. В блочной ветви значение возвращается через yield; для выражения из одной ветви допустим просто expression."
  },
  {
    id: "core-017", category: "core", level: "senior",
    q: "Как определяется отступ (incidental whitespace) в text block?",
    options: [
      "По отступу первой строки",
      "По минимальному общему отступу непустых строк и позиции закрывающего разделителя",
      "Отступы всегда сохраняются полностью",
      "По количеству пробелов в открывающем разделителе"
    ],
    answer: 1,
    explain: "JVM убирает общий минимальный отступ значимых строк с учётом положения закрывающих кавычек. Дополнительные пробелы сверх общего отступа сохраняются."
  },
  {
    id: "core-018", category: "core", level: "middle",
    q: "Где можно использовать `var` в Java?",
    options: [
      "Для полей класса и параметров методов",
      "Только для локальных переменных с инициализатором",
      "Для любых переменных, включая null-инициализацию",
      "Только для членов record"
    ],
    answer: 1,
    explain: "var доступен для локальных переменных с инициализатором, индексов for и ресурсов try-with-resources. Поля, параметры и null без типа запрещены."
  },
  {
    id: "core-019", category: "core", level: "senior",
    q: "Что выведет код?\n`Integer a = 127, b = 127; Integer c = 128, d = 128;`\n`System.out.println((a == b) + \" \" + (c == d));`",
    options: ["true true", "false false", "true false", "false true"],
    answer: 2,
    explain: "Autoboxing использует Integer.valueOf с кэшем −128..127. Для 127 ссылки совпадают, для 128 создаются разные объекты."
  },
  {
    id: "core-020", category: "core", level: "middle",
    q: "Почему константы enum рекомендуется сравнивать через ==, а не equals?",
    options: [
      "equals для enum всегда выбрасывает исключение",
      "== проверяет идентичность, безопасен для null и семантически совпадает с единственным экземпляром константы",
      "== работает быстрее только для строк",
      "equals не учитывает порядок объявления"
    ],
    answer: 1,
    explain: "Каждая enum-константа существует в единственном экземпляре. == не может дать NPE и точно соответствует семантике перечисления."
  },
  {
    id: "core-021", category: "core", level: "senior",
    q: "Чем non-static inner class отличается от static nested class?",
    options: [
      "Non-static inner class не имеет доступа к полям внешнего класса",
      "Экземпляр non-static inner class содержит неявную ссылку на экземпляр внешнего класса",
      "Static nested class нельзя сделать private",
      "Оба варианта компилируются в один и тот же байткод"
    ],
    answer: 1,
    explain: "Внутренний нестатический класс привязан к экземпляру внешнего и хранит ссылку на него. Это может приводить к утечкам памяти; static nested такой ссылки не имеет."
  },
  {
    id: "core-022", category: "core", level: "middle",
    q: "Какое требование предъявляется к локальной переменной, захватываемой лямбдой?",
    options: [
      "Она должна быть объявлена public",
      "Она должна быть effectively final",
      "Она должна быть static",
      "Она должна иметь тип Object"
    ],
    answer: 1,
    explain: "Захватываемая локальная переменная не должна изменяться после инициализации. Фактически final-переменные и параметры также подходят."
  },
  {
    id: "core-023", category: "core", level: "senior",
    q: "Чем `this` внутри лямбды отличается от `this` внутри анонимного класса?",
    options: [
      "В лямбде this относится к enclosing-экземпляру, в анонимном классе — к самому анонимному объекту",
      "Они всегда обозначают одно и то же",
      "В лямбде this запрещён",
      "В анонимном классе this относится к внешнему классу"
    ],
    answer: 0,
    explain: "Лямбда не вводит новый this: он ссылается на окружающий экземпляр. Анонимный класс создаёт собственный объект, и его this указывает на него."
  },
  {
    id: "core-024", category: "core", level: "senior",
    q: "Какой интерфейс является функциональным?",
    options: [
      "Интерфейс с одним abstract-методом и любым числом default/static-методов",
      "Интерфейс только с default-методами",
      "Интерфейс, у которого ровно один метод, включая default",
      "Абстрактный класс с одним abstract-методом"
    ],
    answer: 0,
    explain: "Функциональный интерфейс имеет ровно один abstract-метод (SAM), но может содержать default и static-методы, а также методы Object."
  },
  {
    id: "core-025", category: "core", level: "senior",
    q: "Какой вид method reference представляет `System.out::println`?",
    options: [
      "Ссылка на статический метод",
      "Ссылка на несвязанный метод экземпляра",
      "Ссылка на связанный метод конкретного экземпляра",
      "Ссылка на конструктор"
    ],
    answer: 2,
    explain: "System.out — конкретный объект, поэтому ссылка связана с ним (bound instance method reference). Несвязанная выглядела бы как `String::length`."
  },
  {
    id: "core-026", category: "core", level: "senior",
    q: "Когда выполняются промежуточные операции Stream (`filter`, `map`)?",
    options: [
      "Сразу при вызове каждой операции",
      "Только при вызове терминальной операции",
      "При сборке мусора",
      "Только в parallel stream"
    ],
    answer: 1,
    explain: "Промежуточные операции ленивы и лишь строят pipeline. Вычисления запускает терминальная операция, например collect, forEach или count."
  },
  {
    id: "core-027", category: "core", level: "senior",
    q: "Что произойдёт при повторном использовании Stream после терминальной операции?",
    options: [
      "Поток начнётся заново",
      "Будет выброшено IllegalStateException",
      "Вернётся пустой результат",
      "Будет выброшено UnsupportedOperationException"
    ],
    answer: 1,
    explain: "Stream одноразовый. После терминальной операции он считается потреблённым, и повторный вызов операции приводит к IllegalStateException."
  },
  {
    id: "core-028", category: "core", level: "senior",
    q: "Для чего предназначен `Stream.peek`?",
    options: [
      "Для гарантированной замены каждого элемента",
      "В основном для отладки: это промежуточная операция, которая без терминальной ничего не выполнит",
      "Для терминального подсчёта элементов",
      "Для изменения размера стрима"
    ],
    answer: 1,
    explain: "peek — промежуточная операция, часто используемая для диагностики. Полагаться на неё как на обязательный side effect нельзя: оптимизации могут её пропустить."
  },
  {
    id: "core-029", category: "core", level: "senior",
    q: "Какой пул по умолчанию используют parallel streams?",
    options: [
      "Собственный пул на каждый вызов",
      "Common ForkJoinPool",
      "Пул Tomcat",
      "Один поток вызывающего кода"
    ],
    answer: 1,
    explain: "Параллельные стримы выполняются в common ForkJoinPool (обычно по числу ядер). Блокирующие задачи в нём могут замедлить другие параллельные операции."
  },
  {
    id: "core-030", category: "core", level: "senior",
    q: "Что произойдёт при `Collectors.toMap`, если два элемента дают одинаковый ключ и merge-функция не указана?",
    options: [
      "Останется первый элемент",
      "Останется последний элемент",
      "Будет выброшено IllegalStateException",
      "Будет выброшено NullPointerException"
    ],
    answer: 2,
    explain: "Без merge-функции toMap считает дубликаты ключей ошибкой и выбрасывает IllegalStateException. Нужно передать merge, например `(a, b) -> b`."
  },
  {
    id: "core-031", category: "core", level: "senior",
    q: "Какую реализацию Map по умолчанию создаёт `Collectors.groupingBy`?",
    options: ["TreeMap", "LinkedHashMap", "HashMap", "ConcurrentHashMap"],
    answer: 2,
    explain: "groupingBy по умолчанию использует HashMap. Порядок можно задать через перегрузку с supplier, например LinkedHashMap::new."
  },
  {
    id: "core-032", category: "core", level: "senior",
    q: "Какую задачу решает `Stream.flatMap`?",
    options: [
      "Заменяет каждый элемент на коллекцию и объединяет все коллекции в один поток",
      "Сортирует поток",
      "Удаляет дубликаты",
      "Собирает поток в Map"
    ],
    answer: 0,
    explain: "flatMap принимает функцию, возвращающую Stream, и «разглаживает» вложенные потоки в единый. map в такой ситуации дал бы Stream<Stream<T>>."
  },
  {
    id: "core-033", category: "core", level: "senior",
    q: "Почему `Files.lines(path)` нужно использовать в try-with-resources?",
    options: [
      "Поток файловых строк держит открытый файловый дескриптор и должен быть закрыт",
      "Иначе строки будут прочитаны в обратном порядке",
      "Иначе JVM не запустит GC",
      "Это требование только для Windows"
    ],
    answer: 0,
    explain: "Stream, возвращённый Files.lines, связан с открытым файлом и реализует AutoCloseable. Без закрытия можно исчерпать файловые дескрипторы."
  },
  {
    id: "core-034", category: "core", level: "senior",
    q: "Какие поля не сериализуются стандартным механизмом Java?",
    options: [
      "Только private-поля",
      "Поля, помеченные transient, и статические поля",
      "Только final-поля",
      "Все поля, для которых нет getter"
    ],
    answer: 1,
    explain: "transient-поля при десериализации получают значение по умолчанию, статические поля принадлежат классу и не входят в состояние объекта."
  },
  {
    id: "core-035", category: "core", level: "senior",
    q: "Что возвращает `Class.getDeclaredFields()`?",
    options: [
      "Только public-поля, включая унаследованные",
      "Все объявленные в классе поля, включая private, но без унаследованных",
      "Все поля иерархии, включая private",
      "Только static-поля"
    ],
    answer: 1,
    explain: "getDeclaredFields возвращает поля, объявленные непосредственно в классе, независимо от модификатора доступа. Унаследованные нужно искать через getSuperclass."
  },
  {
    id: "core-036", category: "core", level: "expert",
    q: "В каком порядке выполнится код при создании `new Child()`?\n`Parent`: static-блок, instance-блок, конструктор.\n`Child`: static-блок, instance-блок, конструктор.",
    options: [
      "Parent static → Parent instance → Parent ctor → Child static → Child instance → Child ctor",
      "Parent static → Child static → Parent instance → Parent ctor → Child instance → Child ctor",
      "Child static → Parent static → Child instance → Child ctor → Parent instance → Parent ctor",
      "Parent instance → Parent ctor → Child static → Child instance → Child ctor"
    ],
    answer: 1,
    explain: "Сначала инициализируются классы от родителя к потомку (static), затем при создании объекта — instance-блоки и конструкторы от родителя к потомку."
  },
  {
    id: "core-037", category: "core", level: "expert",
    q: "Почему initialization-on-demand holder идиома потокобезопасна без synchronized?",
    options: [
      "JVM гарантирует атомарную инициализацию класса и блокировку при первом обращении",
      "Потому что поле объявлено final",
      "Потому что класс загружается только одним потоком",
      "Потому что volatile запрещает гонки"
    ],
    answer: 0,
    explain: "Инициализация класса JVM выполняется под блокировкой и happens-before для всех потоков. Holder-класс загружается только при вызове getInstance."
  },
  {
    id: "core-038", category: "core", level: "expert",
    q: "Почему enum считается устойчивым вариантом singleton?",
    options: [
      "Потому что enum-конструктор можно вызвать через reflection",
      "Потому что JVM гарантирует единственный экземпляр константы и корректно восстанавливает его при сериализации",
      "Потому что enum не поддерживает методы",
      "Потому что enum автоматически потокобезопасен только в одном потоке"
    ],
    answer: 1,
    explain: "Enum-константы создаются JVM один раз, reflection не позволяет создать ещё один экземпляр, а сериализация сохраняет идентичность."
  },
  {
    id: "core-039", category: "core", level: "senior",
    q: "Какой метод класса Object является final и не может быть переопределён?",
    options: ["toString()", "equals(Object)", "hashCode()", "getClass()"],
    answer: 3,
    explain: "getClass() объявлен final: тип объекта не должен подменяться. toString, equals и hashCode при этом можно переопределять."
  },
  {
    id: "core-040", category: "core", level: "senior",
    q: "Почему наследование реализации часто предпочитают заменять композицией?",
    options: [
      "Наследование невозможно в Java без интерфейсов",
      "Композиция уменьшает связанность и защищает от хрупкости базового класса при его изменении",
      "Композиция всегда быстрее в JIT",
      "Наследование запрещает полиморфизм"
    ],
    answer: 1,
    explain: "Наследование жёстко связывает подкласс с реализацией родителя. Композиция позволяет делегировать поведение и менять реализацию без изменения иерархии."
  },
  {
    id: "core-041", category: "core", level: "senior",
    q: "Как корректно сделать класс immutable, если у него есть поле `java.util.Date`?",
    options: [
      "Достаточно объявить поле final",
      "Нужно делать defensive copy при установке и при возврате значения",
      "Достаточно переопределить equals",
      "Нужно объявить getter synchronized"
    ],
    answer: 1,
    explain: "Date изменяем: final защищает только ссылку. Копии в конструкторе и getter не дают внешнему коду изменить внутреннее состояние."
  },
  {
    id: "core-042", category: "core", level: "senior",
    q: "Что даёт реализация `Cloneable`?",
    options: [
      "Добавляет public-метод clone в класс",
      "Это маркерный интерфейс: без него Object.clone выбрасывает CloneNotSupportedException",
      "Делает клонирование глубоким",
      "Запрещает наследование класса"
    ],
    answer: 1,
    explain: "Cloneable не содержит методов. Он разрешает Object.clone работать, но стандартный clone выполняет поверхностное копирование."
  },
  {
    id: "core-043", category: "core", level: "expert",
    q: "Почему при переопределении equals в наследнике предпочтительнее `getClass()`, а не `instanceof`?",
    options: [
      "getClass() обеспечивает симметричность, которую легко нарушить при сравнении базового и производного классов через instanceof",
      "instanceof не работает с generic-типами",
      "getClass() сравнивает значения полей",
      "instanceof запрещён в equals по стандарту Java"
    ],
    answer: 0,
    explain: "Если базовый класс сравнивает через instanceof, а наследник добавляет поля, равенство может стать несимметричным. getClass требует точного типа и сохраняет контракт."
  },
  {
    id: "core-044", category: "core", level: "expert",
    q: "Что произойдёт, если объект использовать как ключ HashMap, а затем изменить поле, участвующее в hashCode?",
    options: [
      "HashMap автоматически пересчитает хеш",
      "Объект, скорее всего, станет недоступен для поиска по новому состоянию",
      "Будет выброшено ConcurrentModificationException",
      "Изменится только порядок итерации"
    ],
    answer: 1,
    explain: "HashMap вычислил bucket при вставке. После изменения hashCode поиск пойдёт в другой bucket, и запись не будет найдена. Ключи должны быть неизменяемыми."
  },
  {
    id: "core-045", category: "core", level: "expert",
    q: "Чем опасно несогласование `compareTo` и `equals` для TreeSet?",
    options: [
      "TreeSet начнёт выбрасывать ClassCastException при любом добавлении",
      "TreeSet считает элементы дубликатами, если compareTo вернул 0, даже когда equals возвращает false",
      "TreeSet перестанет сортировать элементы",
      "Ничем: TreeSet всегда использует equals"
    ],
    answer: 1,
    explain: "SortedSet определяет уникальность через compareTo. Если compareTo возвращает 0 для неравных по equals объектов, второй элемент не добавится."
  },
  {
    id: "core-046", category: "core", level: "expert",
    q: "Что вернёт выражение?\n`new BigDecimal(\"1.0\").equals(new BigDecimal(\"1.00\"))`",
    options: ["true", "false", "Ошибка компиляции", "NumberFormatException"],
    answer: 1,
    explain: "BigDecimal.equals учитывает scale: 1.0 и 1.00 не равны. Для сравнения числового значения без учёта масштаба используют compareTo == 0."
  },
  {
    id: "core-047", category: "core", level: "senior",
    q: "Что верно для pattern matching в `if (obj instanceof String s && !s.isEmpty())`?",
    options: [
      "Переменная s видна во всём методе",
      "Переменная s доступна в правой части условия и в ветви, где проверка прошла",
      "s можно использовать только после приведения типа",
      "Pattern matching поддерживается только для record"
    ],
    answer: 1,
    explain: "Java использует flow scoping: s доступна там, где компилятор доказал успешность pattern-проверки, включая правую часть && и соответствующую ветвь."
  },
  {
    id: "core-048", category: "core", level: "middle",
    q: "Что произойдёт при вызове `Optional.empty().get()`?",
    options: [
      "Вернётся null",
      "Будет выброшено NoSuchElementException",
      "Будет выброшено NullPointerException",
      "Вернётся Optional.empty()"
    ],
    answer: 1,
    explain: "Optional.get на пустом значении бросает NoSuchElementException. В коде предпочтительны orElseThrow, orElse, ifPresent или map."
  }
]);
