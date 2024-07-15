import type { TQuestions } from './types'

export default [
  {
    question:
      'function sayHi() {\n  console.log(name)\n  console.log(age)\n  var name = "John"\n  let age = 30\n}\n\nsayHi()',
    answers: ['John и undefined', 'John и Error', 'Error', 'undefined и Error'],
    correctAnswerIndex: 3,
    explanation:
      'В функции `sayHi` мы сначала определяем переменную `name` с помощью ключевого слова `var`. Это означает, что `name` поднимается в начало функции. `name` будет иметь значение `undefined` до тех пор, пока выполнение кода не дойдет до строки, где ей присваивается значение `John`. Мы еще не определили значение `name`, когда пытаемся вывести ее значение в консоль, поэтому получаем `undefined`. Переменные, объявленные с помощью ключевых слов `let` и `const`, также поднимаются в начало области видимости, но в отличие от переменных, объявленных с помощью `var`, не инициализируются, т.е. такие переменные поднимаются без значения. Доступ к ним до инициализации невозможен. Это называется `временной мертвой зоной`. Когда мы пытаемся обратиться к переменным до их определения, `JavaScript` выбрасывает исключение `ReferenceError`.',
  },
  {
    question:
      'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1)\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1)\n}',
    answers: [
      '0 1 2 и 0 1 2',
      '0 1 2 и 3 3 3',
      '3 3 3 и 0 1 2',
      '3 3 3 и 3 3 3',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Из-за очереди событий в `JavaScript` функция обратного вызова `setTimeout` выполняется после освобождения стека вызовов. Так как переменная `i` в первом цикле определяется с помощью ключевого слова `var`, она является глобальной. В цикле мы каждый раз увеличиваем значение `i` на `1`, используя оператор `++`. К моменту выполнения `setTimeout` в первом примере значение `i` равняется `3`. Во втором цикле переменная `i` определяется с помощью ключевого слова `let`. Такие переменные (а также переменные, объявленные с помощью ключевого слова `const`) имеют блочную область видимости (блок - это код внутри фигурных скобок - `{}`). На каждой итерации `i` будет иметь новое значение, и это значение будет замкнуто в области видимости внутри цикла.',
  },
  {
    question:
      'const shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2\n  },\n  perimeter: () => 2 * Math.PI * this.radius\n}\n\nconsole.log(shape.diameter())\nconsole.log(shape.perimeter())',
    answers: ['20 и 62.83185307179586', '20 и NaN', '20 и 63', 'NaN и 63'],
    correctAnswerIndex: 1,
    explanation:
      'Обратите внимание, что `diameter` - это обычная функция, а `perimeter` - стрелочная. У стрелочных функций, в отличие от обычных, значение `this` указывает на внешнее/лексическое окружение. Это значит, что при вызове метода `perimeter` его `this` указывает не на объект `shape`, а на глобальный объект `window`. У этого объекта нет свойства `radius`, поэтому возвращается `undefined`.',
  },
  {
    question: 'console.log(+true)\nconsole.log(!"John")',
    answers: ['1 и false', '0 и true', 'false и NaN', 'false и false'],
    correctAnswerIndex: 0,
    explanation:
      'Унарный плюс (`+`) приводит операнд к числу. `true` - это `1`, а `false` - `0`. Строка `John` - это истинное значение. Мы спрашиваем, является ли это значение ложным? Ответ: `false`.',
  },
  {
    question:
      'let c = { greeting: "Hey!" }\nlet d\n\nd = c\nc.greeting = "Hello!"\nconsole.log(d.greeting)',
    answers: ['Hello!', 'Hey!', 'undefined', 'Error'],
    correctAnswerIndex: 0,
    explanation:
      'В `JavaScript` все объекты являются "ссылочными" типами данных, т.е. значения объектов передаются по ссылкам. Сначала в переменной `c` создается ссылка на объект. Затем мы указываем переменной `d` ссылаться на тот же объект, на который ссылается `c`. При изменении объекта меняются значения всех указывающих на него ссылок.',
  },
  {
    question:
      'let a = 3\nlet b = new Number(3)\nlet c = 3\n\nconsole.log(a == b)\nconsole.log(a === b)\nconsole.log(b === c)',
    answers: [
      'true false true',
      'false false true',
      'true false false',
      'false true true',
    ],
    correctAnswerIndex: 2,
    explanation:
      '`new Number` - это встроенная функция-конструктор. И хотя она выглядит как число, это не настоящее число: у него имеется ряд дополнительных возможностей. На самом деле это объект. Оператор `==` (абстрактное/нестрогое равенство) разрешает преобразование типов данных, он проверяет равенство значений. Оба значения равны `3`, поэтому возвращается `true`. При использовании оператора `===` (строговое равенство, оператор идентичности) должны совпадать не только значения, но и типы данных. В данном случае это не так: `new Number()` - это не число, а объект. Поэтому два последних сравнения возвращают `false`.',
  },
  {
    question:
      'class Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor\n    return this.newColor\n  }\n\n  constructor({ newColor = "green" } = {}) {\n    this.newColor = newColor\n  }\n}\n\nconst freddie = new Chameleon({ newColor: "pink" })\nfreddie.colorChange("orange")',
    answers: ['orange', 'pink', 'green', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'Метод `colorChange` является статическим. Такие методы не имеют доступа к экземплярам класса. Так как `freddie` - это экземпляр, статический метод в нем не доступен. Поэтому выбрасывается исключение `TypeError`.',
  },
  {
    question:
      '// Обратите внимание: код выполняется в нестрогом режиме\nlet greeting\ngreetign = {} // опечатка!\nconsole.log(greetign)',
    answers: ['{}', 'Error', 'undefined', '""'],
    correctAnswerIndex: 0,
    explanation:
      'С помощью выражения `greetign = {}` мы создаем новый глобальный пустой объект, который выводится в консоль. Когда мы вместо `greeting` написали `greetign`, интерпретатор выполнил `global.greetign = {}` в `Node.js` (или `window.greetign = {}` в браузере). В строгом режиме (`"use strict"`) будет выброшено исключение `ReferenceError: greetign is not defined`.',
  },
  {
    question:
      'function bark() {\n  console.log("Woof!")\n}\n\nbark.animal = "dog"\n\nconsole.log(bark.animal)',
    answers: ['dog', 'Error', 'undefined', '""'],
    correctAnswerIndex: 0,
    explanation:
      'В `JavaScript` такое возможно, т.к. функции в `JS` - это тоже объекты. Точнее, функция — это специальный тип объекта, который можно вызывать (такой объект имеет внутренний слот `callable`). Кроме того, функция — это объект со свойствами, вызывать которые нельзя, поскольку они не являются функциями.',
  },
  {
    question:
      'function Person(firstName, lastName) {\n  this.firstName = firstName\n  this.lastName = lastName\n}\n\nconst person = new Person("John", "Smith")\nPerson.getFullName = function () {\n  return `${this.firstName} ${this.lastName}`\n}\n\nconsole.log(person.getFullName())',
    answers: ['Error', '""', 'John Smith', 'undefined undefined'],
    correctAnswerIndex: 0,
    explanation:
      'Нельзя добавлять свойства к конструктору как к обычному объекту. Если необходимо добавить свойство или метод всем экземплярам, то следует использовать прототипы. В данном случае выражение `Person.prototype.getFullName = function () { return ${this.firstName} ${this.lastName} }` сделает метод `getFullName` рабочим. В чем здесь преимущество? Предположим, что мы добавили этот метод к конструктору. Возможно, он нужен не каждому экземпляру класса `Person`. Это приведет к лишнему расходованию памяти, т.к. все экземпляры будут иметь указанный метод. Напротив, если мы добавим данный метод к прототипу, у нас будет только одно место в памяти, к которому смогут обращаться все экземпляры. Такие методы называются совместными или распределенными (shared).',
  },
  {
    question:
      'function Person(firstName, lastName) {\n  this.firstName = firstName\n  this.lastName = lastName\n}\n\nconst john = new Person("John", "Smith")\nconst jane = Person("Jane", "Air")\n\nconsole.log(john)\nconsole.log(jane)',
    answers: [
      'Person {firstName: "John", lastName: "Smith"} и undefined',
      'Person {firstName: "John", lastName: "Smith"} и Person {firstName: "Jane", lastName: "Air"}',
      'Person {firstName: "John", lastName: "Smith"} и {}',
      'Person {firstName: "Smith", lastName: "Smith"} и Error',
    ],
    correctAnswerIndex: 0,
    explanation:
      "Мы создаем объект `jane` без помощи ключевого слова `new`. Использование `new` приводит к созданию нового объекта (экземпляра). Без `new` создается глобальный объект. Мы указали, что `this.firstName` равняется `Jane` и `this.lastName` равняется `Air`. На самом деле, мы определили `global.firstName = 'Jane'` и `global.lastName = 'Air'`. Значением `jane` является `undefined`, поскольку мы ничего не возвращаем из функции `Person`.",
  },
  {
    question:
      'function sum(a, b) {\n  return a + b\n}\n\nconsole.log(sum(1, "2"))',
    answers: ['NaN', 'Error', '"12"', '3'],
    correctAnswerIndex: 2,
    explanation:
      '`JavaScript` - это динамически типизированный язык: мы не определяем тип данных при объявлении переменных (для этого был придуман `TypeScript`). Значения переменных могут быть автоматически преобразованы из одного типа в другой без нашего участия. Это называется "неявным приведением типов". Приведение - это преобразование данных из одного типа в другой. В рассматриваемом примере `JavaScript` конвертировал число `1` в строку, чтобы операция имела смысл и вернула хоть какое-то значение. При сложении числа (`1`) и строки (`"2"`) число преобразуется в строку. Мы можем объединять строки так: `"Hello" + "World"`. Это называется конкатенацией строк. Таким образом, `1 + "2"` возвращает `"12"`.',
  },
  {
    question:
      'let number = 0\nconsole.log(number++)\nconsole.log(++number)\nconsole.log(number)',
    answers: ['1 1 2', '1 2 2', '0 2 2', '0 1 2'],
    correctAnswerIndex: 2,
    explanation:
      'Постфиксный оператор `++`:\n- возвращает значение (`0`);\n- увеличивает (инкрементирует) значение (после чего значением переменной `number` становится `1`).\nПрефиксный оператор `++`:\n- инкрементирует значение (теперь `number === 2`);\n- возвращает значение (`2`).\nРезультат: `0 2 2`.',
  },
  {
    question:
      'function getPersonInfo(one, two, three) {\n  console.log(one)\n  console.log(two)\n  console.log(three)\n}\n\nconst person = "John"\nconst age = 30\n\ngetPersonInfo`${person} is ${age} years old`',
    answers: [
      'John 30 ["", " is ", " years old"]',
      '["", " is ", " years old"] John 30',
      'John ["", " is ", " years old"] 30',
      'undefined',
    ],
    correctAnswerIndex: 1,
    explanation:
      'При использовании тегированных шаблонных литералов (tagged template literals) первым значением, возвращаемым функцией, является массив строк. Прочими значениями являются значения, переданные функции в качестве аргументов.',
  },
  {
    question:
      'function checkAge(data) {\n  if (data === { age: 18 }) {\n    console.log("Ты взрослый!")\n  } else if (data == { age: 18 }) {\n    console.log("Ты по-прежнему взрослый.")\n  } else {\n    console.log("Хм... У тебя что, нет возраста?")\n  }\n}\n\ncheckAge({ age: 18 })',
    answers: [
      '"Ты взрослый!"',
      '"Ты по-прежнему взрослый."',
      '"Хм... У тебя что, нет возраста?"',
      'undefined',
    ],
    correctAnswerIndex: 2,
    explanation:
      'В операциях сравнения примитивы сравниваются по значениям, а объекты - по ссылкам. `JavaScript` проверяет, чтобы объекты указывали на одну и ту же область памяти. Сравниваемые объекты в рассматриваемом примере не такие: объект, переданный в качестве аргумента, указывает на другое место в памяти, нежели объекты, используемые в сравнениях. Поэтому выражения `{ age: 18 } === { age: 18 }` и `{ age: 18 } == { age: 18 }` возвращают `false`.',
  },
  {
    question:
      'function getAge(...args) {\n  console.log(typeof args)\n}\n\ngetAge(30)',
    answers: ['number', 'array', 'object', 'NaN'],
    correctAnswerIndex: 2,
    explanation:
      'Оператор распространения или расширения (spread, `...`) возвращает массив с аргументами, переданными функции. Массив - это объект, поэтому выражение `typeof args` возвращает `object`.',
  },
  {
    question:
      'function getAge() {\n  "use strict"\n  age = 30\n  console.log(age)\n}\n\ngetAge()',
    answers: ['30', 'undefined', 'Error', 'NaN'],
    correctAnswerIndex: 2,
    explanation:
      '`"use strict"`, среди прочего, позволяет предотвратить случайное объявление глобальных переменных. Мы не объявляли переменную `age`, поэтому (в строгом режиме) выбрасывается исключение `ReferenceError`. В нестрогом режиме ошибки не возникнет, а переменная `age` станет свойством глобального объекта `window`.',
  },
  {
    question: 'const sum = eval("10*10+5")\n\nconsole.log(sum)',
    answers: ['105', '"105"', 'Error', '"10*10+5"'],
    correctAnswerIndex: 0,
    explanation:
      'Функция `eval` выполняет код, переданный ей в виде строки. Если это выражение (как в данном случае), то оно вычисляется (оценивается). Выражение `10 * 10 + 5` возвращает число `105`. Использовать `eval` не рекомендуется по причинам безопасности.',
  },
  {
    question: 'var num = 8\nvar num = 10\n\nconsole.log(num)',
    answers: ['8', '10', 'undefined', 'Error'],
    correctAnswerIndex: 1,
    explanation:
      'С помощью ключевого слова `var` можно определять любое количество одноименных переменных. Переменная будет хранить последнее присвоенное ей значение. Однако, такой трюк нельзя проделать с `let` и `const`, т.к. переменные, объявленные с помощью этих ключевых слов, имеют блочную область видимости.',
  },
  {
    question:
      'const obj = { 1: "a", 2: "b", 3: "c" }\nconst set = new Set([1, 2, 3, 4, 5])\n\nconsole.log(obj.hasOwnProperty("1"))\nconsole.log(obj.hasOwnProperty(1))\nconsole.log(set.has("1"))\nconsole.log(set.has(1))',
    answers: [
      'false true false true',
      'false true true true',
      'true true false true',
      'true true true true',
    ],
    correctAnswerIndex: 2,
    explanation:
      "Ключи объектов (кроме `Symbol`) являются строками, даже если заданы не в виде строк (например, индексы в массиве). Поэтому выражение `obj.hasOwnProperty('1')` также возвращает `true`. Однако, это не работает с `Set`. Значение `1` отсутствует в `set`: `set.has('1')` возвращает `false`, а `set.has(1)` - `true`.",
  },
  {
    question:
      'const obj = { a: "one", b: "two", a: "three" }\nconsole.log(obj)',
    answers: [
      '{ a: "one", b: "two" }',
      '{ b: "two", a: "three" }',
      '{ a: "three", b: "two" }',
      'Error',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Если в объекте имеется два ключа с одинаковыми именами, то первый ключ перезаписывается. Его позиция сохраняется, а значением становится последнее из присвоенных.',
  },
  {
    question:
      'for (let i = 1; i < 5; i++) {\n  if (i === 3) continue\n  console.log(i)\n}',
    answers: ['1 2', '1 2 3', '1 2 4', '1 3 4'],
    correctAnswerIndex: 2,
    explanation:
      'Оператор `continue` пропускает текущую итерацию (цикл), если условие удовлетворяется (является истинным).',
  },
  {
    question:
      'String.prototype.giveMePizza = () => {\n  return "Give me pizza!"\n}\n\nconst name = "John"\n\nconsole.log(name.giveMePizza())',
    answers: ['"Give me pizza!"', 'Error', '""', 'undefined'],
    correctAnswerIndex: 0,
    explanation:
      '`String` - это встроенный конструктор, к которому можно добавлять новые свойства. Мы добавили метод `giveMePizza` к его прототипу. Строки-примитивы автоматически конвертируются (преобразуются) в строки-объекты (благодаря объектной обертке). Поэтому все строки (объекты) имеют доступ к указанному методу.',
  },
  {
    question:
      'const a = {}\nconst b = { key: "b" }\nconst c = { key: "c" }\n\na[b] = 123\na[c] = 456\n\nconsole.log(a[b])',
    answers: ['123', '456', 'undefined', 'Error'],
    correctAnswerIndex: 1,
    explanation:
      'Ключи объекта (кроме `Symbol`) автоматически преобразуются в строки (даже индексы в массиве). Мы пытаемся добавить объект в качестве ключа со значением `123` к объекту `a`. Однако, когда мы приводим объект к строке, он превращается в `[object Object]`. Таким образом, мы говорим, что `a["object Object"] = 123`. Затем мы повторяем процедуру. `c` - это другой объект, который мы также неявно приводим к строке. Поэтому `a["object Object"] = 456`. Наконец, когда мы выводим `a[b]` в консоль, мы на самом деле обращаемся к `a["object Object"]`. Поэтому в консоль выводится `456`.',
  },
  {
    question:
      'const foo = () => console.log("first")\nconst bar = () => setTimeout(() => console.log("second"))\nconst baz = () => console.log("third")\n\nbar()\nfoo()\nbaz()',
    answers: [
      'first second third',
      'first third second',
      'second first third',
      'second third first',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Сначала мы вызываем функцию `setTimeout`. Однако, ее колбек выполняется последним. Это происходит из-за того, что в браузерах у нас имеется не только движок для запуска (выполнения) кода, но и `WebAPI`. `WebAPI` предоставляет нам `setTimeout` и много других возможностей, например, `DOM`. После того, как `setTimeout` отправляется в `WebAPI`, функция `bar` удаляется из стека вызовов (call stack). После этого вызывается функция `foo`, и `first` выводится в консоль. `foo` удаляется из стека и вызывается функция `baz`. `third` выводится в консоль. `WebAPI` отправляет функцию обратного вызова `setTimeout` в очередь событий (task queue, второе слово читается как "кью"). Цикл событий (event loop) проверяет стек вызовов и очередь задач. Если стек оказывается пустым, то в него помещается первый элемент из очереди. Вызывается функция `bar` и в консоль выводится `second`.',
  },
  {
    question:
      '<div onclick="console.log(\'div\')">\n  <p onclick="console.log(\'p\')">\n    Нажми меня!\n  </p>\n</div>',
    answers: ['p div', 'div p', 'p', 'div'],
    correctAnswerIndex: 0,
    explanation:
      'После клика по элементу `p` в консоль будет выведено `p` и `div`. Поток события (распространение события) имеет три фазы: захват, цель и всплытие. По умолчанию обработчики событий выполняются на фазе всплытия (если не установлен параметр `useCapture` со значением `true`). Всплытие происходит от самого глубоко вложенного элемента до самого внешнего.',
  },
  {
    question:
      'const person = { name: "John" }\n\nfunction sayHi(age) {\n  console.log(`${this.name} is ${age}`)\n}\n\nsayHi.call(person, 30)\nsayHi.bind(person, 30)',
    answers: [
      'undefined is 30 и John is 30',
      'function и function',
      'John is 30 и John is 30',
      'John is 30 и function',
    ],
    correctAnswerIndex: 3,
    explanation:
      'В обоих случаях мы передаем объект, на который будет указывать `this`. Но метод `call` выполняется сразу, а метод `bind` возвращает копию функции с привязанным контекстом. Эту функцию следует вызывать отдельно или можно сделать так: `sayHi.bind(person, 30)()`.',
  },
  {
    question:
      'function sayHi() {\n  return (() => 0)()\n}\n\nconsole.log(typeof sayHi())',
    answers: ['object', 'number', 'function', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Функция `sayHi` возвращает значение немедленно вызываемого функционального выражения (Immediately Invoked Function Expression, IIFE). Результатом является число `0` типа `number`. Для информации: в `JavaScript` имеется `8` встроенных типов данных: `string, number, bigint, boolean, null, undefined, object и symbol`. `function` не является отдельным типом, функции - это объекты.',
  },
  {
    question: 'console.log(typeof typeof 1)',
    answers: ['number', 'string', 'object', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Выражение `typeof 1` возвращает `number`. Выражение `typeof number` возвращает `string`.',
  },
  {
    question:
      'const numbers = [1, 2, 3]\nnumbers[10] = 11\nconsole.log(numbers)',
    answers: [
      '[1, 2, 3, 7 x null, 11]',
      '[1, 2, 3, 11]',
      '[1, 2, 3, 7 x empty, 11]',
      'Error',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Когда в массив добавляется значение, которое выходит за пределы длины массива, `JavaScript` создает "пустые ячейки". На самом деле они имеют значение `undefined`, но в консоль выводятся как `[1, 2, 3, 7 x empty, 11]` (зависит от среды выполнения кода).',
  },
  {
    question:
      '(() => {\n  let x, y\n  try {\n    throw new Error()\n  } catch (x) {\n    (x = 1), (y = 2)\n    console.log(x)\n  }\n  console.log(x)\n  console.log(y)\n})()',
    answers: [
      '1 undefined 2',
      'undefined undefined undefined',
      '1 1 2',
      '1 undefined undefined',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Блок `catch` принимает параметр `x`. Это не тот `x`, который объявлен перед блоком `try`. Мы присваиваем этому аргументу значение `1`, а переменной `y` - `2`. После этого мы выводим в консоль значение `x`, т.е. `1`. За пределами catch `x` все еще имеет значение `undefined`, а `y` - `2`. Когда мы вызываем `console.log(x)` за пределами `catch`, возвращается `undefined`, а `console.log(y)` возвращает `2`.',
  },
  {
    question:
      'const result =\n  [[0, 1], [2, 3]].reduce(\n    (acc, cur) => {\n      return acc.concat(cur)\n    },\n    [1, 2]\n  )\n\nconsole.log(result)',
    answers: [
      '[0, 1, 2, 3, 1, 2]',
      '[6, 1, 2]',
      '[1, 2, 0, 1, 2, 3]',
      '[1, 2, 6]',
    ],
    correctAnswerIndex: 2,
    explanation:
      '`[1, 2]` - начальное значение переменной `acc`. После первого прохода `acc` равняется `[1, 2]`, а `cur` - `[0, 1]`. После конкатенации (объединения) `acc` равняется `[1, 2, 0, 1]`, а `cur` - `[2, 3]`. После их объединения, мы получаем `[1, 2, 0, 1, 2, 3]`.',
  },
  {
    question: 'console.log(!!null)\nconsole.log(!!"")\nconsole.log(!!1)',
    answers: [
      'false true false',
      'false false true',
      'false true true',
      'true true false',
    ],
    correctAnswerIndex: 1,
    explanation:
      '`null` - это `false`. `!null` возвращает `true`. `!true` возвращает `false`.\n`""` - это `false`. `!""` возвращает `true`. `!true` возвращает `false`.\n`1` - это `true`. `!1` возвращает `false`. `!false` возвращает `true`.',
  },
  {
    question: 'console.log([..."John"])',
    answers: [
      '["J", "o", "h", "n"]',
      '["John"]',
      '[[], "John"]',
      '[["J", "o", "h", "n"]]',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Строка является итерируемой (перебираемой) сущностью. Оператор распространения или расширения (spread, `...`) преобразует строку в массив, состоящий из символов этой строки.',
  },
  {
    question:
      'function* generator(i) {\n  yield i\n  yield i * 2\n}\n\nconst gen = generator(10)\n\nconsole.log(gen.next().value)\nconsole.log(gen.next().value)',
    answers: [
      '[0, 10]` и `[10, 20]',
      '20` и `20',
      '10` и `20',
      '0, 10` и `10, 20',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Выполнение обычных функций не может быть остановлено после их запуска. Однако, генераторы можно останавливать в процессе выполнения, а затем продолжать с места остановки. Каждый раз, когда в функции-генераторе встречается ключевое слово `yield`, функция возвращает значение, указанное после него. Обратите внимание, что в генераторе вместо `return` используется `yield`. Сначала мы инициализируем генератор с `i` равным `10`. Мы вызываем генератор, используя метод `next`. Когда мы в первый раз вызываем генератор, `i` равняется `10`. Движок `JavaScript` встречает первое ключевое слово `yield` и возвращает значение `i`. После этого выполнение функции приостанавливается и `10` выводится в консоль. Затем мы снова вызываем функцию посредством `next()`. Она запускается с того места, где остановилась, с `i` равным `10`. Движок встречает следующее ключевое слово `yield` и возвращает `i * 2`. `i` равно `10`, поэтому возвращается `20`.',
  },
  {
    question:
      'const firstPromise = new Promise((res, rej) => {\n  setTimeout(res, 500, "one")\n})\n\nconst secondPromise = new Promise((res, rej) => {\n  setTimeout(res, 100, "two")\n})\n\nPromise.race([firstPromise, secondPromise]).then(res => console.log(res))',
    answers: ['one', 'two', 'two one', 'one two'],
    correctAnswerIndex: 1,
    explanation:
      'Когда мы передаем несколько промисов методу `race`, он возвращает первый разрешенный (выполненный или отклоненный) промис. В функцию `setTimeout` мы передаем задержку в `500` мс для первого промиса и в `100` мс - для второго. Это означает, что `secondPromise` разрешается первым со значением `two`. Переменная `res` имеет значение `two`, которое и выводится в консоль.',
  },
  {
    question:
      'let person = { name: "John" }\nconst members = [person]\nperson = null\n\nconsole.log(members)',
    answers: ['null', '[null]', '[{}]', '[{ name: "John" }]'],
    correctAnswerIndex: 3,
    explanation:
      'Сначала мы объявляем переменную `person` со значением объекта, содержащего свойство `name`. Затем мы объявляем переменную `members`. Мы делаем первый элемент этого массива равным `[person]`. Объекты взаимодействуют посредством ссылок при установке их равными друг другу. Когда мы назначаем ссылку из одной переменной в другую, создается копия этой ссылки (обратите внимание, что у этих переменных не одинаковые ссылки). Затем мы присваиваем переменной `person` значение `null`. Мы изменили только значение `person`, а не первый элемент массива, поскольку этот элемент имеет другую (скопированную) ссылку на объект. Первый элемент в `members` по-прежнему содержит ссылку на исходный объект. Когда мы выводим в консоль массив `members`, первый элемент этого массива содержит значение объекта, который и выводится в консоль.',
  },
  {
    question:
      'const person = {\n  name: "John",\n  age: 30\n}\n\nfor (const item in person) {\n  console.log(item)\n}',
    answers: [
      '{ name: "John" } и { age: 30 }',
      'name и age',
      'John и 30',
      '["name", "John"] и ["age", 30]',
    ],
    correctAnswerIndex: 1,
    explanation:
      'С помощью цикла `for..in` мы перебираем ключи объекта, в данном случае `name` и `age`. Ключи объекта (кроме `Symbol`) являются строками. В каждом цикле мы устанавливаем значение `item` равным текущему ключу, по которому он перебирается. Сначала `item` равен `name`, и выводится в консоль. Затем `item` равен `age`, что также выводится в консоль.',
  },
  {
    question: 'console.log(3 + 4 + "5")',
    answers: ['"345"', '"75"', '12', '"12"'],
    correctAnswerIndex: 1,
    explanation:
      'Ассоциативность операторов - это порядок оценивания выражения движком `JavaScript`, слева направо или справа налево. Это происходит только в том случае, если все операторы имеют одинаковый приоритет. У нас есть только один тип оператора: `+`. Ассоциативность - слева направо. `3 + 4` оценивается первым. Это приводит к числу `7`. `7 + "5"` приводит к `"75"` из-за неявного приведения типов. `JavaScript` преобразует число `7` в строку. Мы можем объединять (конкатенировать) две строки с помощью оператор `+`. Выражение `\'7\' + \'5\'` возвращает `75`.',
  },
  {
    question: 'const num = parseInt("7*6", 10)\n\nconsole.log(num)',
    answers: ['42', '"42"', '7', 'NaN'],
    correctAnswerIndex: 2,
    explanation:
      'Функция `parseInt` проверяет, являются ли символы в строке допустимыми с точки зрения используемой системы счисления (второй необязательный аргумент). Как только встречается недопустимый символ, синтаксический анализ строки прекращается и последующие символы игнорируются. `*` является недопустимым числом. Поэтому `parseInt` прекращает разбор строки и возвращает `7`.',
  },
  {
    question:
      'const result =\n  [1, 2, 3].map(num => {\n    if (typeof num === "number") return\n    return num * 2\n  })\n\nconsole.log(result)',
    answers: [
      '[]',
      '[null, null, null]',
      '[undefined, undefined, undefined]',
      '[ 3 x empty ]',
    ],
    correctAnswerIndex: 2,
    explanation:
      "Метод `map` возвращает новый массив с обработанными с помощью функции обратного вызова элементами исходного массива. В данном случае элементы исходного массива являются числами, поэтому условие `if typeof num === 'number'` удовлетворяется. После этого выполнение функции останавливается, в новый массив попадает значение переменной `num`, равное `undefined`.",
  },
  {
    question:
      'function greeting() {\n  throw "Всем привет!"\n}\n\nfunction sayHi() {\n  try {\n    const data = greeting()\n    console.log("Работает!", data)\n  } catch (error) {\n    console.log("Ошибка: ", error)\n  }\n}\n\nsayHi()',
    answers: [
      'Работает! Всем привет!',
      'Ошибка: undefined ',
      'Error',
      'Ошибка: Всем привет!',
    ],
    correctAnswerIndex: 3,
    explanation:
      'С помощью оператора `throw` мы можем создавать собственные ошибки. Другими словами, с помощью этого оператора мы можем генерировать пользовательские исключения. Исключением может быть строка, число, логическое значение или объект. В данном случае, исключением является строка `Всем привет!`. С помощью оператора `catch` мы можем указать, что делать, если в блоке `try` возникла ошибка. Исключение - `Всем привет!`. `error` равняется этой строке. Это приводит к `Ошибка: Всем привет!`.',
  },
  {
    question:
      'function Car() {\n  this.make = "Lamborghini"\n  return { make: "Maserati" }\n}\n\nconst myCar = new Car()\nconsole.log(myCar.make)',
    answers: ['Lamborghini', 'Maserati', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Когда возвращается свойство, его значение равняется возвращаемому значению, а не значению, установленному в функции-конструкторе. Мы возвращаем строку `Maserati`, поэтому значением `myCar.make` является `Maserati`.',
  },
  {
    question:
      '(() => {\n  let x = (y = 10)\n})()\n\nconsole.log(typeof x)\nconsole.log(typeof y)',
    answers: [
      'undefined и number',
      'number и number',
      'object и number',
      'number и undefined',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Выражение `let x = y = 10` на самом деле является сокращением для `y = 10; let x = y`. Когда мы устанавливаем `y` равным `10`, мы фактически добавляем свойство `y` к глобальному объекту (`window` в браузере, `global` в `Node.js`). В браузере `window.y` теперь равняется `10`. Затем мы объявляем переменную `x` со значением `y`. Переменные, объявленные с помощью ключевых слов `let` и `const`, имеют блочную область видимости, они доступны только в том блоке, в котором они объявлены. Таким блоком в данном случае является немедленно вызываемое функциональное выражение (Immediately Invoked Function Expression, IIFE). Когда мы используем оператор `typeof`, операнд `x` не определен: мы пытаемся получить доступ к `x` вне блока его объявления. Это означает, что `x` имеет значение `undefined`. Переменные, которым не присвоено значение, по умолчанию имеют значение `undefined`. Выражение `console.log(typeof x)` возвращает `undefined`. Однако, мы создали глобальную переменную `y`, присвоив ей значение `10`. Это значение доступно в любом месте кода. `y` определена и содержит значение типа `number`. Поэтому выражение `console.log(typeof y)` возвращает `number`.',
  },
  {
    question:
      'class Dog {\n  constructor(name) {\n    this.name = name\n  }\n}\n\nDog.prototype.bark = function() {\n  console.log(`Woof I am ${this.name}`)\n}\n\nconst pet = new Dog("Rex")\n\npet.bark()\n\ndelete Dog.prototype.bark\n\npet.bark()',
    answers: [
      '"Woof I am Rex" и ""',
      '"Woof I am Rex" и "Woof I am Rex"',
      '"Woof I am Rex" и undefined',
      '"Woof I am Rex" и Error',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Оператор `delete` позволяет удалять свойства объектов, включая свойства прототипов. Удаленное свойство прототипа становится недоступным в цепочке прототипов. Другими словами, функция `bark` после `delete Dog.prototype.bark` становится недоступной, однако мы все же пытаемся получить к ней доступ. Когда мы пытаемся вызвать нечто, не являющееся функцией, выбрасывается исключение `TypeError`: в данном случае `TypeError: pet.bark is not a function`, поскольку значением свойства `bark` объекта `pet` является `undefined`.',
  },
  {
    question: 'const set = new Set([1, 1, 2, 3, 4])\n\nconsole.log(set)',
    answers: [
      '[1, 1, 2, 3, 4]',
      '[1, 2, 3, 4]',
      '{ 1, 1, 2, 3, 4 }',
      '{ 1, 2, 3, 4 }',
    ],
    correctAnswerIndex: 3,
    explanation:
      '`Set` является коллекцией уникальных значений. Мы передаем в `new Set()` массив `[1, 1, 2, 3, 4]` с повторяющимся значением `1`. Поскольку в `set` не может быть двух одинаковых значений, одно из них удаляется. Это приводит к `{ 1, 2, 3, 4 }`.',
  },
  {
    question:
      '// counter.js\nlet counter = 10\nexport default counter\n\n// index.js\nimport myCounter from "./counter.js"\n\nmyCounter += 1\n\nconsole.log(myCounter)',
    answers: ['10', '11', 'Error', 'NaN'],
    correctAnswerIndex: 2,
    explanation:
      'Импортируемый модуль доступен только для чтения: мы не можем его изменять. Это можно сделать только перед экспортом. Когда мы пытаемся увеличить значение переменной `myCounter`, возникает ошибка `myCounter доступен только для чтения и не может быть изменен`.',
  },
  {
    question:
      'const name = "John"\nage = 30\n\nconsole.log(delete name)\nconsole.log(delete age)',
    answers: [
      'false и true',
      'John и 30',
      'true и true',
      'undefined и undefined',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Оператор `delete` возвращает логическое значение: `true` при успешном удалении, иначе - `false`. Однако, переменные, объявленные с помощью ключевых слов, не могут быть удалены с помощью `delete`. Переменная `name` была объявлена \u200b\u200bс помощью ключевого слова `const`, поэтому возвращается `false`. Когда мы устанавливаем переменную `age` равной `30`, мы фактически добавляем свойство `age` к глобальному объекту (`window.age` в браузере, `global.age` в `Node.js`). Свойства объектов, включая глобальный, удалять можно, поэтому выражение `delete age` возвращает `true`.',
  },
  {
    question:
      'const numbers = [1, 2, 3, 4, 5]\nconst [y] = numbers\n\nconsole.log(y)',
    answers: ['[[1, 2, 3, 4, 5]]', '[1, 2, 3, 4, 5]', '1', '[1]'],
    correctAnswerIndex: 2,
    explanation:
      'Мы можем распаковывать элементы из массивов или свойства из объектов путем деструктуризации. Например:\n`[a, b] = [1, 2]`\nЗначение `a` теперь равно `1`, а значение `b` - `2`. Что мы на самом деле сделали в приведенном примере, так это:\n`[y] = [1, 2, 3, 4, 5]`\nЭто означает, что `y` равняется первому элементу массива, которым является число `1`. Поэтому в консоль выводится `1`.',
  },
  {
    question:
      'const user = { name: "John", age: 30 }\nconst admin = { admin: true, ...user }\n\nconsole.log(admin)',
    answers: [
      '{ admin: true, user: { name: "John", age: 30 } }',
      '{ admin: true, name: "John", age: 30 }',
      '{ admin: true, user: [John, 30] }',
      '{ admin: true }',
    ],
    correctAnswerIndex: 1,
    explanation:
      "Оператор распространения или расширения (spread, `...`) позволяет объединять объекты - создавать копии пар ключ/значение одного объекта и добавлять их в другой объект. В данном случае мы создаем копию объекта `user` и добавляем ее в объект `admin`. Объект `admin` содержит скопированные пары ключ/значение, что приводит к `{ admin: true, name: 'John', age: 30 }`.",
  },
  {
    question:
      'const person = { name: "John" }\n\nObject.defineProperty(person, "age", { value: 30 })\n\nconsole.log(person)\nconsole.log(Object.keys(person))',
    answers: [
      '{ name: "John", age: 30 } и ["name", "age"]',
      '{ name: "John", age: 30 } и ["name"]',
      '{ name: "John"} и ["name", "age"]',
      '{ name: "John"} и ["age"]',
    ],
    correctAnswerIndex: 1,
    explanation:
      'С помощью метода `defineProperty` мы можем добавлять новые свойства к объекту или изменять существующие. Когда мы добавляем свойство к объекту с помощью `defineProperty()`, они по умолчанию являются не перечисляемыми (`enumerable: false`). Метод `keys` возвращает все перечисляемые свойства объекта, в данном случае только `name`. Свойства, добавленные с помощью `defineProperty()`, по умолчанию также иммутабельны (неизменяемы, `writable: false`). Это поведение можно переопределить, используя свойства `writable`, `configurable` и `enumerable`. Таким образом, метод `defineProperty` позволяет осуществлять тонкую настройку свойств, добавляемых к объекту.',
  },
  {
    question:
      'const settings = {\n  username: "johnsmith",\n  level: 19,\n  health: 88\n}\n\nconst data = JSON.stringify(settings, ["level", "health"])\nconsole.log(data)',
    answers: [
      '{"level": 19, "health": 88}',
      '{"username": "johnsmith"}',
      '["level", "health"]',
      '{"username": "johnsmith", "level": 19, "health": 88}',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Второй аргумент `JSON.stringify()` - это заменитель (replacer). Заменитель может быть либо функцией, либо массивом, и позволяет контролировать, что и как должно быть преобразовано в значения. Если заменитель является массивом, только свойства, указанные в нем, будут добавлены в `JSON-строку`. В данном случае в строку включаются только свойства `level` и `health`, свойство `username` исключается. Значение переменной `data` равняется `{ "level": 19, "health": 90 }`. Если заменитель является функцией, она вызывается для каждого свойства объекта. Значение, возвращаемое функцией, будет значением свойства при добавлении в строку. Если значением свойства является `undefined`, такое свойство исключается из состава строки.',
  },
  {
    question:
      'let num = 10\n\nconst increaseNumber = () => num++\nconst increasePassedNumber = number => number++\n\nconst num1 = increaseNumber()\nconst num2 = increasePassedNumber(num1)\n\nconsole.log(num1)\nconsole.log(num2)',
    answers: ['10 и 10', '10 и 11', '11 и 11', '11 и 12'],
    correctAnswerIndex: 0,
    explanation:
      'Постфиксный оператор `++` сначала возвращает значение операнда, затем увеличивает его. Значение переменной `num1` равняется `10`, так как функция сначала возвращает значение переменной `num` и только после этого увеличивает его на `1`. `num2` равняется `10`, так как мы передали `num1` в функцию `increasePassedNumber`. Аргумент `number` равняется `10`. Снова оператор `++` сначала возвращает значение операнда, а затем увеличивает его на `1`. Поскольку аргумент `number` равняется `10`, `num2` также равняется `10`.',
  },
  {
    question:
      'const value = { number: 10 }\n\nconst multiply = (x = { ...value }) => {\n  console.log((x.number *= 2))\n}\n\nmultiply()\nmultiply()\nmultiply(value)\nmultiply(value)',
    answers: ['20 40 80 160', '20 40 20 40', '20 20 20 40', 'NaN NaN 20 40'],
    correctAnswerIndex: 2,
    explanation:
      'В `ES6` мы можем присваивать параметрам функции значения по умолчанию. Параметр будет иметь значение по умолчанию, если другое значение не было передано функции или, если значением переданного аргумента является `undefined`. В данном случае, мы распаковываем свойства объекта `value` в новый объект, поэтому значение `x` по умолчанию равняется `{ number: 10 }`. Аргумент по умолчанию реализуется в момент вызова функции. Каждый раз, когда мы вызываем функцию, создается новый объект. Мы вызываем функцию `multiply` первые два раза, не передавая ей никаких аргументов, поэтому `x` имеет значение `{ number: 10 }`. Затем мы умножаем значение `x.number` на `2`, получаем `20`. В третий раз, когда мы вызываем `multiply()`, мы передаем объект `value` в качестве. Оператор `*=` является сокращением для `x.number = x.number * 2`: мы меняем значение `x.number`, теперь оно равняется `20`. В четвертый раз мы снова передаем `multiply()` объект `value`. `x.number` равняется `20`, поэтому выражение `x.number *= 2` возвращает `40`.',
  },
  {
    question: '[1, 2, 3, 4].reduce((x, y) => console.log(x, y))',
    answers: [
      '1 2 3 3 6 4',
      '1 2 2 3 3 4',
      '1 undefined 2 undefined 3 undefined 4 undefined',
      '1 2 undefined 3 undefined 4',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Первый агрумент метода `reduce` - аккумулятор, в данном случае `x`. Второй аргумент - текущее значение, `y`. С помощью `reduce` мы применяем функцию обратного вызова к каждому элементу массива, что, в конечном счете, приводит к единственному значению. В приведенном примере мы не возвращаем никаких значений из функции, а просто регистрируем значение аккумулятора и текущее значение. Значение аккумулятора равняется ранее возвращенному значению колбека. Если методу `reduce` не передается необязательный аргумент `initialValue` (начальное значение), аккумулятор равняется первому элементу при первом вызове. При первом вызове аккумулятор (`x`) равняется `1`, а текущее значение (`y`) - `2`. Мы не выходим из функции, а регистрируем значение аккумулятора и текущее значение: `1` и `2`, соответственно. Если из функции не возвращается значения, она возвращает `undefined`. При следующем вызове аккумулятор равняется `undefined`, а текущее значение - `3`. `undefined` и `3` выводятся в консоль. При четвертом вызове мы снова не возвращаем значение из функции. Аккумулятор равняется `undefined`, а текущее значение - `4`: `undefined` и `4` выводятся в консоль.',
  },
  {
    question:
      "// index.js\nconsole.log('Выполнение index.js')\nimport { sum } from './sum.js'\nconsole.log(sum(1, 2))\n\n// sum.js\nconsole.log('Выполнение sum.js')\nexport const sum = (a, b) => a + b",
    answers: [
      'Выполнение index.js Выполнение sum.js 3',
      'Выполнение sum.js Выполнение index.js 3',
      'Выполнение sum.js 3 Выполнение index.js',
      'Выполнение index.js undefined Выполнение sum.js',
    ],
    correctAnswerIndex: 1,
    explanation:
      'При импорте модулей с помощью ключевого слова `import`, они являются предварительно разобранными (распарсенными). Это означает, что модули запускаются первыми, а код в файле, который импортирует модуль, выполняется позже. В этом разница между `require()` в `CommonJS` и `import()` в `ES6`. С помощью метода `require` мы можем загружать зависимости динамически во время выполнения кода. При использовании `require()` вместо `import()` в консоль будет выведено `Выполнение index.js Выполнение sum.js 3`.',
  },
  {
    question:
      "console.log(Number(2) === Number(2))\nconsole.log(Boolean(false) === Boolean(false))\nconsole.log(Symbol('foo') === Symbol('foo'))",
    answers: [
      'true true false',
      'false true false',
      'true false true',
      'true true true',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Каждый `Symbol` уникален. Цель аргумента, переданного `Symbol`, состоит в том, чтобы дать `Symbol` описание. Значение `Symbol` не зависит от переданного аргумента. Когда мы проверяем равенство, мы создаем два разных `Symbol`: первый `Symbol("foo")` и второй `Symbol("foo")`. Эти значения уникальны и не равны друг другу, поэтому выражение `Symbol("foo") === Symbol("foo")` возвращает `false`.',
  },
  {
    question:
      'nconst name = "John Smith"\nconsole.log(name.padStart(12))\nconsole.log(name.padStart(2))',
    answers: [
      '"John Smith" и "John Smith"',
      '" John Smith" и " John Smith" ("[12x whitespace]John Smith"  "[2x whitespace]John Smith")',
      '" John Smith" и "John Smith" ("[2x whitespace]John Smith", "John Smith")',
      '"John Smith" и "Jo"',
    ],
    correctAnswerIndex: 2,
    explanation:
      'С помощью метода `padStart` мы добавляем отступы в начало строки. Значение, передаваемое этому методу, представляет собой общую длину строки вместе с отступом. Строка `John Smith` имеет длину, равную `10`. `name.padStart(12)` вставляет `2` пробела в начало строки, потому что `10 + 2` есть `12`. Если аргумент, переданный методу `padStart`, меньше длины строки, заполнение не выполняется.',
  },
  {
    question: 'console.log("📱" + "💻")',
    answers: ['"📱💻"', '257548', 'undefined', 'Error'],
    correctAnswerIndex: 0,
    explanation:
      'С помощью оператора `+` мы можем объединять строки. Это называется конкатенацией. В данном случае, мы объединяем строку `📱` со строкой `💻`, что приводит к `📱💻`.',
  },
  {
    question:
      'function* startGame() {\n  const answer = yield "Ты любишь JavaScript?"\n  if (answer !== "Да") {\n    return "Как интересно... В таком случае, что ты здесь делаешь?"\n  }\n  return "JavaScript тоже тебя любит ❤️"\n}\n\nconst game = startGame()\nconsole.log(/* 1 */) // Ты любишь JavaScript?\nconsole.log(/* 2 */) // JavaScript тоже тебя любит ❤️',
    answers: [
      'game.next("Да").value и game.next().value',
      'game.next.value("Да") и game.next.value()',
      'game.next().value и game.next("Да").value',
      'game.next.value() и game.next.value("Да")',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Когда движок `JavaScript` встречает ключевое слово `yield`, выполнение функции-генератора приостанавливается. Во-первых, мы должны позволить функции вернуть строку `Ты любишь JavaScript?`, что можно сделать, вызвав `game.next().value`. Код функции выполняется последовательно до тех пор, пока не встретится ключевое слово `yield`. В первой строке имеется `yield`: выполнение останавливается с первым результатом. Это означает, что переменная `answer` на данный момент еще не определена. Когда мы вызываем `game.next("Да").value`, предыдущий `yield` заменяется значением аргумента, переданного методу `next`, в данном случае `Да`. Значение переменной `answer` равняется `Да`. Условие `if (answer !== "Да")` возвращает `false`, и `JavaScript тоже тебя любит ❤️` выводится в консоль.',
  },
  {
    question: 'console.log(String.raw`Hello\\nWorld!`)',
    answers: [
      'Hello World!',
      'Hello (на следующей строке) World!',
      'Hello\\nWorld!',
      'Hello\\n (на следующей строке) World!',
    ],
    correctAnswerIndex: 2,
    explanation:
      '`String.raw()` возвращает строку, в которой обратные последовательности (`\\n, \\v, \\t` и т.д.) игнорируются. Иногда обратная косая черта может стать проблемой, например, такой код:\n`const path = C:\\Documents\\Projects\\table.html`\nБудет преобразован в следующее:\n`C:DocumentsProjects able.html`\n`String.raw()` игнорирует управляющие символы:\n`C:\\Documents\\Projects\\table.html`',
  },
  {
    question:
      'async function getData() {\n  return await Promise.resolve("Я сделал это!")\n}\n\nconst data = getData()\nconsole.log(data)',
    answers: [
      '"Я сделал это!"',
      'Promise {\\<resolved\\>: "Я сделал это!"}',
      'Promise {\\<pending\\>}',
      'undefined',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Асинхронная функция всегда возвращает промис. `await` ожидает разрешения промиса: промис разрешается, когда мы вызываем `getData()`, чтобы присвоить его переменной `data`. Если бы мы хотели получить доступ к разрешенному значению `Я сделал это!`, мы могли бы использовать метод `then` для `data`: `data.then(res => console.log(res))`. Тогда бы мы получили `Я сделал это!`.',
  },
  {
    question:
      'function addToList(item, list) {\n  return list.push(item)\n}\n\nconst result = addToList("apple", ["banana"])\nconsole.log(result)',
    answers: ["['apple', 'banana']", '2', 'true', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Метод `push` возвращает длину нового массива. Изначально массив содержал только один элемент (строку `banana`) и имел длину, равную `1`. После добавления в массив строки `apple`, длина массива увеличилась до `2`. Именно это значение возвращается из функции `addToList`. Метод `push` модифицирует исходный массив. Если мы хотим получить сам массив, а не его длину, из функции необходимо вернуть `list` после добавления в него `item`.',
  },
  {
    question:
      'const box = { x: 10, y: 20 }\n\nObject.freeze(box)\n\nconst shape = box\nshape.x = 100\n\nconsole.log(shape)',
    answers: ['{ x: 100, y: 20 }', '{ x: 10, y: 20 }', '{ x: 100 }', 'Error'],
    correctAnswerIndex: 1,
    explanation:
      '`Object.freeze()` делает невозможным добавление, удаление или изменение свойств объекта (если только значение свойства не является другим объектом). Когда мы создаем переменную `shape` и устанавливаем ее равной замороженному объекту `box`, `shape` ссылается на этот объект. Заморожен ли объект, можно определить посредством `Object.isFrozen()`. В даном случае `Object.isFrozen(shape)` вернет `true`, поскольку переменная `shape` ссылается на замороженный объект. Поскольку `shape` заморожен, а значение свойства `x` не является объектом, мы не можем его изменять. `x` по-прежнему равняется `10`, и `{ x: 10, y: 20 }` выводится в консоль.',
  },
  {
    question: 'const { name: myName } = { name: "John" }\n\nconsole.log(name)',
    answers: ['John', 'myName', 'undefined', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'Когда мы распаковываем свойство `name` из правого объекта, мы присваиваем значение `John` переменной `myName`. С помощью выражения `{ name: myName }` мы сообщаем `JavaScript`, что хотим создать новую переменную с именем `myName` и со значением свойства `name` из правой части выражения. Поскольку мы пытаемся вывести в консоль `name`, переменную, которая не определена, выбрасывается исключение `ReferenceError`.',
  },
  {
    question:
      'const add = () => {\n  const cache = {}\n  return num => {\n    if (num in cache) {\n      return `Из кеша! ${cache[num]}`\n    } else {\n      const result = num + 10\n      cache[num] = result\n      return `Вычислено! ${result}`\n    }\n  }\n}\n\nconst addFunction = add()\nconsole.log(addFunction(10))\nconsole.log(addFunction(10))\nconsole.log(addFunction(5 * 2))',
    answers: [
      'Вычислено! 20 Вычислено! 20 Вычислено! 20',
      'Вычислено! 20 Из кеша! 20 Вычислено! 20',
      'Вычислено! 20 Из кеша! 20 Из кеша! 20',
      'Вычислено! 20 Из кеша! 20 Error',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Функция `add` является функцией запоминания (мемоизации). С помощью запоминания мы можем кешировать результаты вызова функции, чтобы ускорить ее повторное выполнение. В данном случае мы создаем объект `cache` для хранения возвращаемых функцией значений. Если мы повторно вызовем функцию `addFunction` с тем же аргументом, она сначала проверит, имеется ли соответствующее значение в кеше. Если такое значение имеется, оно возвращается, что экономит время на выполнение функции. Иначе, если значение в кеше отсутствует, оно вычисляется и сохраняется. Мы вызываем `addFunction()` 3 раза с одним и тем же аргументом: при первом вызове для `num`, равном `10`, значение, возвращаемое функцией, в кеше отсутствует. Условие `if (num in cache)` возвращает `false`, и выполняется блок `else`: `Вычислено! 20` выводится в консоль, а результат добавляется в объект `cache`. `cache` теперь выглядит как `{ 10: 20 }`. При повторном вызове значение для аргумента `10` возвращается из кеша. Условие `if (num in cache)` возвращает `true`, и `Из кеша! 20` выводится в консоль. В третий раз мы передаем в функцию выражение `5 * 2`, что оценивается (вычисляется) как `10`. Объект `cache` содержит искомое значение. Условие `if (num in cache)` возвращает `true`, и `Из кеша! 20` выводится в консоль.',
  },
  {
    question:
      'const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"]\n\nfor (let item in myLifeSummedUp) {\n  console.log(item)\n}\n\nfor (let item of myLifeSummedUp) {\n  console.log(item)\n}',
    answers: [
      '0 1 2 3 и "☕" "💻" "🍷" "🍫"',
      '"☕" "💻" "🍷" "🍫" и "☕" "💻" "🍷" "🍫"',
      '"☕" "💻" "🍷" "🍫" и 0 1 2 3',
      '0 1 2 3 и { 0: "☕", 1: "💻", 2: "🍷", 3: "🍫" }',
    ],
    correctAnswerIndex: 0,
    explanation:
      'С помощью цикла `for-in` мы перебираем перечисляемые свойства объекта. В массиве перечисляемые свойства являются "ключами" элементов массива, которые фактически являются их индексами. Вы можете представить массив как: `{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`, где ключи - перечисляемые свойства. `0 1 2 3` выводится в консоль.\nС помощью цикла `for-of` мы перебираем значения итерируемых сущностей (сущностей, поддающихся перебору). Массив является итерируемой сущностью. Когда мы выполняем итерацию по массиву, переменная `item` равняется итерируемому элементу, `"☕" "💻" "🍷" "🍫"` выводится в консоль.',
  },
  {
    question: 'const list = [1 + 2, 1 * 2, 1 / 2]\nconsole.log(list)',
    answers: [
      '["1 + 2", "1 * 2", "1 / 2"]',
      '["12", 2, 0.5]',
      '[3, 2, 0.5]',
      '[1, 1, 1]',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Элементами массива могут быть любые типы данных. Числа, строки, объекты, другие массивы, `null`, логические значения, `undefined`, а также даты, функции и выражения. Элемент будет равен возвращаемому значению. Выражение `1 + 2` возвращает `3`, `1 * 2` - `2`, а `1 / 2` - `0.5`.',
  },
  {
    question:
      'function sayHi(name) {\n  return `Hello, ${name}`\n}\n\nconsole.log(sayHi())',
    answers: ['Hello', 'Hello, undefined', 'Hello, null', 'Error'],
    correctAnswerIndex: 1,
    explanation:
      'По умолчанию аргументы функции имеют значение `undefined`, если значение не было передано при вызове функции или присвоено по умолчанию. В данном случае мы не передаем значения для аргумента `name`. `name` равняется `undefined`. В `ES6` мы можем перезаписывать `undefined` значениями по умолчанию. Например: `function sayHi(name = "John") { ... }`. В данном случае, если мы не передали значение или передали `undefined`, аргумент `name` будет иметь значение `John`.',
  },
  {
    question:
      'var status = "😎"\n\nsetTimeout(() => {\n  const status = "😍"\n\n  const data = {\n    status: "😉",\n    getStatus() {\n      return this.status\n    }\n  }\n\n  console.log(data.getStatus())\n  console.log(data.getStatus.call(this))\n}, 0)',
    answers: ['"😉" и "😍"', '"😉" и "😎"', '"😍" и "😎"', '"😎" и "😎"'],
    correctAnswerIndex: 1,
    explanation:
      'Значение ключевого слова `this` зависит от того, в каком контексте оно используется. В методе `getStatus` `this` указывает на объект, которому принадлежит метод. Метод принадлежит объекту `data`, поэтому `this` указывает на этот объект. Когда мы выводим в консоль `this.status`, выводится свойство `status` объекта `data` или `😉`. С помощью метода `call` мы можем изменить объект, на который ссылается `this` (изменить контекст `this`). В функциях ключевое слово `this` относится к объекту, которому принадлежит функция, либо к объекту, создаваемому с помощью функции-конструктора. Мы объявили функцию `setTimeout` для объекта `global`, поэтому в функции `setTimeout` ключевое слово `this` указывает на объект `global`. В глобальном объекте есть переменная `status` со значением `😎`, которое и выводится в консоль.',
  },
  {
    question:
      'const person = {\n  name: "John",\n  age: 30\n}\n\nlet city = person.city\ncity = "New York"\n\nconsole.log(person)',
    answers: [
      '{ name: "John", age: 30 }',
      '{ name: "John", age: 30, city: "New York" }',
      '{ name: "John", age: 30, city: undefined }',
      '"New York"',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Мы устанавливаем переменную `city` равной значению свойства `city` объекта `person`. У этого объекта нет свойства `city`, поэтому переменная `city` имеет значение `undefined`. Обратите внимание, что мы не ссылаемся на `person`. Мы просто устанавливаем переменную `city` равной текущему значению свойства `city` объекта `person`. Затем мы устанавливаем переменную `city` равной строке `New York`. Это не изменяет объект `person`.',
  },
  {
    question:
      'function checkAge(age) {\n  if (age < 18) {\n    const message = "Ты слишком молод."\n  } else {\n    const message = "Ты достаточно взрослый!"\n  }\n  return message\n}\n\nconsole.log(checkAge(30))',
    answers: [
      '"Ты слишком молод."',
      '"Ты достаточно взрослый!"',
      'Error',
      'undefined',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Переменные, объявленные с помощью ключевых слов `const` и `let`, имеют блочную область видимости. Блок - это любой код между фигурными скобками (`{}`) - в данном случае в фигурных скобках операторов `if-else`. Мы не можем получить доступ к переменной за пределами блока, в котором она объявлена - выбрасывается исключение `ReferenceError`.',
  },
  {
    question: 'function getName(name) {\n  const hasName = /* ? */\n}',
    answers: ['!!name', 'name', 'new Boolean(name)', 'name.length'],
    correctAnswerIndex: 0,
    explanation:
      'С помощью выражения `!!name` мы определяем, является ли значение аргумента `name` истинным. Если `name` равняется `true`, то `!name` возвращает `false`. А `!false` (это то, чем на самом деле является `!!name`) возвращает `true`. Устанавливая `hasName` равным `name`, мы устанавливаем `hasName` равным любому значению, которое передается функции `getName`, а не логическому значению `true`. `new Boolean(true)` возвращает объектную обертку, а не само логическое значение. `name.length` возвращает длину переданного аргумента.',
  },
  {
    question: 'console.log("Я хочу пиццу!"[0])',
    answers: ['""', '"Я"', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Чтобы получить символ по определенному индексу из строки, мы можем использовать скобочную нотацию. Первый символ в строке имеет индекс `0`, второй - индекс `1` и т.д. В данном случае мы хотим получить элемент с индексом `0`, символ `Я`, который и выводится в консоль. Альтернативой получения символа по индексу является метод `charAt`.',
  },
  {
    question:
      'function sum(num1, num2 = num1) {\n  console.log(num1 + num2)\n}\n\nsum(10)',
    answers: ['NaN', '20', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Мы можем установить значение параметра по умолчанию равным другому параметру функции, если такой параметр был определен до параметра по умолчанию. Мы передаем значение `10` функции `sum`. Если `sum()` получает только один аргумент, значит, значение для `num2` не передано, ей присваивается значение по умолчанию, т.е. `10`. Выражение `num1 + num2` возвращает `20`. Если попытаться установить значение параметра по умолчанию равным параметру, который определяется позже, то возникнет ошибка.',
  },
  {
    question:
      '// module.js\nexport default () => "Hello World!"\nexport const name = "John"\n\n// index.js\nimport * as data from "./module"\n\nconsole.log(data)',
    answers: ['{ default: function default(), name: "John" }', '{ default: function default() }', '{ default: "Hello World!", name: "John" }', 'глобальный объект module.js'],
    correctAnswerIndex: 0,
    explanation: 'С помощью `import * as name` мы импортируем все экспорты из файла `module.js` в файл `index.js`, создается новый объект `data`. В файле `module.js` имеется два экспорта: экспорт по умолчанию и именованный экспорт. Экспорт по умолчанию - это функция, которая возвращает строку `Hello World!`, а именованный экспорт - это переменная `nam`", которая имеет значение `John`. Объект `data` имеет свойство `default` для экспорта по умолчанию, другие свойства - именованные экспорты и соответствующие значения.',
  },
  {
    question: 'class Person {\n  constructor(name) {\n    this.name = name\n  }\n}\n\nconst member = new Person("John")\nconsole.log(typeof member)',
    answers: ['class', 'function', 'object', 'string'],
    correctAnswerIndex: 2,
    explanation:
      'Классы являются синтаксическим сахаром для функций-конструкторов. Эквивалентом класса `Person` в качестве функции-конструктора будет `function Person() { this.name = name }`. Вызов функции-конструктора с ключевым словом `new` приводит к созданию нового экземпляра объекта `Person`. Выражение `typeof member` возвращает `object`.',
  },
  {
    question: 'let newList = [1, 2, 3].push(4)\n\nconsole.log(newList.push(5))',
    answers: ['[1, 2, 3, 4, 5]', '[1, 2, 3, 5]', '[1, 2, 3, 4]', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'Метод `push` возвращает длину нового массива, а не сам массив. Устанавливая `newList` равным `[1, 2, 3].push(4)`, мы устанавливаем `newList` равным `4`. Затем мы пытаемся использовать метод `push` для `newList`. Поскольку `newList` является числом `4`, мы не можем использовать `push` - выбрасывается исключение `TypeError`.',
  },
  {
    question:
      'function giveMePizza() {\n  return "А вот и пицца!"\n}\n\nconst giveMeChocolate = () => "Вот шоколад... теперь дуй в тренажерку."\n\nconsole.log(giveMePizza.prototype)\nconsole.log(giveMeChocolate.prototype)',
    answers: [
      '{ constructor: ...} { constructor: ...}',
      '{} { constructor: ...}',
      '{ constructor: ...} {}',
      '{ constructor: ...} undefined',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Обычные функции, такие как `giveMePizza`, имеют свойство `prototype`, которое является объектом (прототипом объекта) со свойством `constructor`. Однако стрелочные функции, такие как `giveMeChocolate`, не имеют прототипа. Поэтому при попытке получить доступ к `giveMeChocolate.prototype` возвращается `undefined`.',
  },
  {
    question:
      'const person = {\n  name: "John",\n  age: 30\n}\n\nfor (const [x, y] of Object.entries(person)) {\n  console.log(x, y)\n}',
    answers: [
      'name John и age 30',
      '["name", "John"] и ["age", 30]',
      '["name", "age"] и undefined',
      'Error',
    ],
    correctAnswerIndex: 0,
    explanation:
      '`Object.entries(person)` возвращает массив вложенных массивов, содержащий ключи и значения: `[ [ \'name\', \'John\' ], [ \'age\', 30 ] ]`.\nС помощью цикла `for-of` мы перебираем элементы массива - в данном случае подмассивы. Мы можем деструктурировать подмассивы в цикле, используя `const [x, y]`. `x` равняется первому элементу в подмассиве, `y` - второму. Первым подмассивом является `[ "name", "John" ]`, где `x` равняется `name`, а `y` - `John`. Вторым подмассивом является `[ "age", 30 ]`, где `x` равняется `age`, а `y` - `30`.',
  },
  {
    question:
      'function getItems(fruitList, ...args, favoriteFruit) {\n  return [...fruitList, ...args, favoriteFruit]\n}\n\nconsole.log(getItems(["banana", "apple"], "pear", "orange"))',
    answers: [
      '["banana", "apple", "pear", "orange"]',
      '[ ["banana", "apple"], "pear", "orange" ]',
      '["banana", "apple", ["pear"], "orange"]',
      'Error',
    ],
    correctAnswerIndex: 3,
    explanation:
      '`...args` - это прочие параметры (оператор rest). Значение прочих параметров - это массив, содержащий неиспользованные аргументы и в этой связи передаваемый последним. В приведенном примере `rest` является вторым аргументом. Это приводит к синтаксической ошибке.\n\nfunction getItems(fruitList, favoriteFruit, ...args) {\n  return [...fruitList, ...args, favoriteFruit]\n}\ngetItems(["banana", "apple"], "pear", "orange")\n\nДанный код работает, как ожидается, и возвращает массив `[ \'banana\', \'apple\', \'orange\', \'pear\' ]`.',
  },
  {
    question:
      "function nums(a, b) {\n  if\n    (a > b)\n    console.log('a больше')\n  else\n    console.log('b больше')\n    return\n  a + b\n}\n\nconsole.log(nums(4, 2))\nconsole.log(nums(1, 2))",
    answers: [
      'a больше, 6 и b больше, 3',
      'a больше, undefined и b больше, undefined',
      'undefined и undefined',
      'Error',
    ],
    correctAnswerIndex: 1,
    explanation:
      'В `JavaScript` мы не обязаны явно указывать точку с запятой (`;`), однако, интерпретатор автоматически добавляет их после операторов. Оператором могут быть переменные или ключевые слова, такие как `throw`, `return`, `break` и др. В приведенном примере имеется оператор `return` и выражение `a + b` на новой строке. Поскольку это новая строка, движок не знает, что это значение, которое мы хотим вернуть. Он автоматически добавляет точку с запятой после `return`. Это выглядит так: `return; a + b`.\nЭто означает, что строка `a + b` никогда не достигается, функция возвращает управление после ключевого слова `return`. Если значение не возвращается явно, как в приведенном примере, функция возвращает `undefined`. Обратите внимание, что после операторов `if-else` точки с запятой автоматически не вставляются.',
  },
  {
    question:
      'class Person {\n  constructor() {\n    this.name = "John"\n  }\n}\n\nPerson = class AnotherPerson {\n  constructor() {\n    this.name = "Jane"\n  }\n}\n\nconst member = new Person()\nconsole.log(member.name)',
    answers: ['John', 'Jane', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Мы можем установить классы равными другим классам/функциям-конструкторам. В данном случае мы устанавливаем класс `Person` равным классу `AnotherPerson`. Свойство `name` этого конструктора имеет значение `Jane`, поэтому свойство `name` для нового экземпляра класса `Person` `member` - это также `Jane`.',
  },
  {
    question:
      'const info = {\n  [Symbol("a")]: "b"\n}\n\nconsole.log(info)\nconsole.log(Object.keys(info))',
    answers: [
      "{ Symbol('a'): 'b' } и [\"{Symbol('a')\"]",
      '{} и []',
      "{ a: 'b' } и ['a']",
      "{ Symbol('a'): 'b' } и []",
    ],
    correctAnswerIndex: 3,
    explanation:
      '`Symbol` не является перечисляемым (`enumerable: false`). Метод `keys` возвращает все перечисляемые ключи объекта. `Symbol` не просматривается таким способом, поэтому возвращается пустой массив. При выводе в консоль объекта будут видны все его свойства, даже не перечисляемые. Это одно из качеств символа: помимо представления совершенно уникального значения (которое предотвращает случайное пересечение имен в объектах, например, при работе с 2 библиотеками, которые хотят добавить свойства с одинаковыми именами к одному и тому же объекту). Мы также можем "скрыть" свойства объектов таким способом (хотя и не полностью: мы можем получить доступ к символам с помощью `Object.getOwnPropertySymbols()`).',
  },
  {
    question:
      'const getList = ([x, ...y]) => [x, y]\nconst getUser = user => { name: user.name; age: user.age }\n\nconst list = [1, 2, 3, 4]\nconst user = { name: "John", age: 30 }\n\nconsole.log(getList(list))\nconsole.log(getUser(user))',
    answers: [
      '[1, [2, 3, 4]] и undefined',
      '[1, [2, 3, 4]] и { name: "John", age: 30 }',
      '[1, 2, 3, 4] и { name: "John", age: 30 }',
      'null и { name: "John", age: 30 }',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Функция `getList` принимает массив в качестве аргумента. В `getList()` мы деструктурируем этот массив. Это выглядит так: `[x, ...y] = [1, 2, 3, 4]`.\nС помощью rest-оператора `...y` мы помещаем прочие аргументы (все аргументы, кроме первого) в массив. Такими аргументами являются `2, 3 и 4`. Значением переменной `y` является массив, содержащий прочие параметры. В данном случае значение `x` равно `1`, поэтому, в консоль попадает `[x, y]`, т.е. `[1, [2, 3, 4]]`.\nФункция `getUser` в качестве аргумента принимает нечто, похожее на объект (обратите внимание, что свойства "объекта" разделяются `;`, а не `,`). В случае стрелочных функций мы можем обойтись без фигурных скобок, если возвращаем только одно значение. Однако, если мы хотим вернуть объект из стрелочной функции, то должны указать его в круглых скобках, в противном случае, при разборе кода, когда движок встретит `,` будет выброшено исключение `SyntaxError`. Такая функция вернула бы объект: `const getUser = user => ({ name: user.name, age: user.age })`.\nПоскольку "свойства" разделены `;` и отсутствует оператор `return`, функция возвращает `undefined`.',
  },
  {
    question: 'const name = "John"\n\nconsole.log(name())',
    answers: ['SyntaxError', 'ReferenceError', 'TypeError', 'undefined'],
    correctAnswerIndex: 2,
    explanation:
      'Переменная `name` содержит строку, которая не является функцией, поэтому не может быть вызвана. `TypeError` возникает, когда значение не соответствует ожидаемому типу. Движок `JavaScript` ожидает, что значением переменной `name` является функция, так как мы пытаемся ее вызвать. Однако, значением `name` является строка, поэтому выбрасывается исключение `TypeError: name is not a function` (`name` не является функцией). `SyntaxError` генерируются, когда мы написали нечто недопустимое с точки зрения `JavaScript`, например, когда ключевое слово `return` написано как `retrun`. `ReferenceError` генерируются, когда `JavaScript` не может найти ссылку на значение, к которому мы обращаемся.',
  },
  {
    question:
      'const one = (false || {} || null)\nconst two = (null || false || "")\nconst three = ([] || 0 || true)\n\nconsole.log(one, two, three)',
    answers: ['false null []', 'null "" true', '{} "" []', 'null null true'],
    correctAnswerIndex: 2,
    explanation:
      'Оператор `||` (логическое `ИЛИ`) возвращает первый истинный операнд. Если все значения ложны, возвращается последний операнд. `(false || {} || null)`: пустой объект (`{}`) является истинным значением. Это первое (и единственное) истинное значение, которое и возвращается. Переменная `one` имеет значение `{}`. `(null || false ||"")`: все операнды являются ложными. Это означает, что возвращается последний операнд - пустая строка (`""`). Переменная `two` имеет значение `""`. `([] || 0 || true)`: пустой массив (`[]`) является истинным значением. Это первое истинное значение, которое и возвращается. Переменная `three` имеет значение `[]`.',
  },
  {
    question:
      "const myPromise = () => Promise.resolve('I have resolved!')\n\nfunction firstFunction() {\n  myPromise().then(res => console.log(res))\n  console.log('first')\n}\n\nasync function secondFunction() {\n  console.log(await myPromise())\n  console.log('second')\n}\n\nfirstFunction()\nsecondFunction()",
    answers: [
      'I have resolved! first и I have resolved! second',
      'first I have resolved! и second I have resolved!',
      'I have resolved! second и first I have resolved!',
      'first I have resolved! и I have resolved! second',
    ],
    correctAnswerIndex: 3,
    explanation:
      'С промисами дело обстоит следующим образом: "Я хочу отложить выполнение этой функции, поскольку это может занять некоторое время" (promise переводится как "обещание"). Только когда промис выполнен или отклонен (разрешен), и когда стек вызовов (call stack) пуст, я хочу получить возвращаемое им значение. Мы можем получить значение с помощью ключевого слова `then` или `await` в асинхронной функции. Эти ключевые слова работают по-разному. В `firstFunction()` мы (вроде бы) приостановили выполнение функции `myPromise`, и продолжили выполнение другого кода, в данном случае `console.log(\'first\')`. Затем функция разрешается строкой `I have resolved!`, которая выводится в консоль после освобождения стека вызовов. С помощью ключевого слова `await` в `secondFunction()` мы приостанавливаем выполнение асинхронной функции до тех пор, пока промис не будет разрешен. Это означает, что мы ожидаем разрешения `myPromise()` со значением `I have resolved!`, и только после того, как это произошло, мы переходим к следующей строке. Поэтому строка `second` выводится в консоль последней.',
  },
  {
    question:
      'const set = new Set()\n\nset.add(1)\nset.add("John")\nset.add({ name: "John" })\n\nfor (let item of set) {\n  console.log(item + 2)\n}',
    answers: [
      '3 NaN NaN',
      '3 7 NaN',
      '3 John2 [object Object]2',
      '"12" John2 [object Object]2',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Оператор `+` используется не только для сложения чисел, но и для объединения (конкатенации) строк. Всякий раз, когда движок `JavaScript` видит, что одно или несколько значений не являются числом, он приводит число к строке. Первым значением является `1` - число. Выражение `1 + 2` возвращает `3`. Вторым значением является `John`. `John` является строкой, а `2` - числом: `2` приводится к строке. `John` и `2` объединяются, что приводит к `John2`. `{ name: "John" }` является объектом. Ни число, ни объект не являются строкой, поэтому они приводятся к строке. Когда объект приводится к строке он превращается в `[object Object]`. `[object Object]`, объединенный с `2`, становится `[object Object]2`.',
  },
  {
    question: 'console.log(Promise.resolve(5))',
    answers: [
      '5',
      'Promise {<pending>: 5}',
      'Promise {<resolved>: 5}',
      'Error',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Мы можем передавать в `Promise.resolve()` любой тип данных. Данный метод возвращает промис с разрешенным значением. Если мы передадим ему обычную функцию, промис разрешится с обычным значением. Если мы передадим промис, промис разрешится с разрешенным значением переданного промиса. В данном случае мы передаем `Promise.resolve()` число `5`. Поэтому возвращается разрешенный промис со значением `5`.',
  },
  {
    question:
      'function compareMembers(person1, person2 = person) {\n  if (person1 !== person2) {\n    console.log("Не одинаковые!")\n  } else {\n    console.log("Одинаковые!")\n  }\n}\n\nconst person = { name: "Игорь" }\n\ncompareMembers(person)',
    answers: ['"Не одинаковые!"', '"Одинаковые!"', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Объекты в `JavaScript` передаются по ссылке. Когда мы проверяем объекты на строгое равенство (идентичность) с помощью оператора `===`, мы сравниваем их ссылки. Мы устанавливаем значение по умолчанию для параметра `person2`, равное объекту `person`, и передаем объект `person` в качестве значения для параметра `person1`. Это означает, что оба параметра содержат ссылку на одно и то же место в памяти, поэтому они равны. Выполняется код в блоке `else`, и в консоль выводится `Одинаковые!`.',
  },
  {
    question:
      'const colorConfig = {\n  red: true,\n  blue: false,\n  green: true,\n  black: true,\n  yellow: false,\n}\n\nconst colors = ["pink", "red", "blue"]\n\nconsole.log(colorConfig.colors[1])',
    answers: ['true', 'false', 'undefined', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'В `JavaScript` у нас есть два способа получить доступ к свойствам объекта: скобочная нотация и точечная нотация. В данном случае, мы используем точечную нотацию (`colorConfig.colors`) вместо скобочной (`colorConfig["colors"]`). При точечной нотации движок пытается найти свойство объекта с указанным именем. В приведенном примере `JavaScript` пытается найти свойство `colors` в объекте `colorConfig`. Такого свойства не существует, поэтому возвращается `undefined`. Затем мы пытаемся получить доступ к значению первого элемента массива, используя `[1]`. Мы не можем сделать этого для `undefined`, поэтому выбрасывается исключение `TypeError: Cannot read property \'1\' of undefined`. `JavaScript` интерпретирует (распаковывает) операторы. Когда мы используем скобочную нотацию, `JavaScript` видит открывающуюся скобку (`[`) и продолжает разбирать код, пока не встретит закрывающуюся скобку (`]`). Только после этого выражение оценивается. Если бы мы использовали `colorConfig[colors[1]]`, то вернулось бы значение свойства `red` объекта `colorConfig`.',
  },
  {
    question: "console.log('❤️' === '❤️')",
    answers: ['true', 'false', 'undefined', 'Error'],
    correctAnswerIndex: 0,
    explanation:
      'Смайлики - это юникоды. Юникод для сердца - `U+2764 U+FE0F`. Юникоды одинаковы для одних и тех же смайликов. Таким образом, мы сравниваем две одинаковые строки, поэтому возвращается `true`.',
  },
  {
    question:
      "const food = ['🍕', '🍫', '🍳', '🍔']\nconst info = { favoriteFood: food[0] }\n\ninfo.favoriteFood = '🍝'\n\nconsole.log(food)",
    answers: [
      "['🍕', '🍫', '🍳', '🍔']",
      "['🍝', '🍫', '🍳', '🍔']",
      "['🍝', '🍕', '🍫', '🍳', '🍔']",
      'undefined',
    ],
    correctAnswerIndex: 0,
    explanation:
      "Мы устанавливаем значение свойства `favourFood` объекта `info` равным строке `🍕`. Строка является примитивным типом данных. В `JavaScript` примитивные типы данных (все, что не является объектом) передаются по значению. Затем мы меняем значение свойства `favourFood`. Массив `food` не изменился, поскольку значение `favourFood` было скопировано из значения первого элемента в массиве и не имеет ссылки на то же место в памяти, что и `food[0]`. Поэтому в консоль выводится исходный массив `['🍕', '🍫', '🍳', '🍔']`.",
  },
  {
    question:
      "let name = 'John'\n\nfunction getName() {\n  console.log(name)\n  let name = 'Jane'\n}\n\ngetName()",
    answers: ['John', 'Jane', 'undefined', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'Каждая функция имеет собственный контекст выполнения (или область видимости). Функция `getName` сначала ищет переменную `name` в собственном контексте (области видимости). `getName()` содержит переменную `name`: мы объявляем переменную `name` с помощью ключевого слова `let` и присваиваем ей значение `Jane`. Переменные, объявленные с помощью ключевых слов `let` и `const` не поднимаются в начало области видимости (в данном случае функции), в отличие от переменных, объявленных с помощью ключевого слова `var`. Они недоступны до инициализации (присваивания им значения). Это называется "временной мертвой зоной". Когда мы пытаемся получить доступ к таким переменным, `JavaScript` выбрасывает исключение `ReferenceError`. Если бы мы не объявили переменную `name` в функции `getName`, движок продолжал бы поиск переменной по цепочке областей видимости. Внешняя область видимости содержит переменную `name` со значением `John`. В этом случае в консоль было бы выведено `John`.',
  },
  {
    question:
      "function* generatorOne() {\n  yield ['a', 'b', 'c']\n}\n\nfunction* generatorTwo() {\n  yield* ['a', 'b', 'c']\n}\n\nconst one = generatorOne()\nconst two = generatorTwo()\n\nconsole.log(one.next().value)\nconsole.log(two.next().value)",
    answers: [
      'a и a',
      'a и undefined',
      "['a', 'b', 'c'] и a",
      "a и ['a', 'b', 'c']",
    ],
    correctAnswerIndex: 2,
    explanation:
      "С помощью ключевого слова `yield` мы получаем значения в функциях-генераторах. С помощью `yield*` мы можем получить значение из другой функции-генератора или итерируемого объекта (например, массива). В `generatorOne()` мы получаем весь массив `[' a ',' b ',' c ']`, используя `yield`. Значение свойства `value`, возвращаемого методом `next` объекта `one` (`one.next().value`), равняется массиву `['a', 'b', 'c']`.\n\nconsole.log(one.next().value) // ['a', 'b', 'c']\nconsole.log(one.next().value) // undefined\n\nВ функции `generatorTwo` мы используем ключевое слово `yield*`. Это означает, что первое значение равняется первому значению итератора. Итератор - это массив `['a', 'b', 'c']`. Первым значением этого массива является `a`, поэтому когда мы вызываем `two.next().value`, возвращается `a`.\n\nconsole.log(two.next().value) // 'a'\nconsole.log(two.next().value) // 'b'\nconsole.log(two.next().value) // 'c'\nconsole.log(two.next().value) // undefined\n",
  },
  {
    question: "console.log(`${(x => x)('Я люблю')} писать код`)",
    answers: [
      'Я люблю писать код',
      'undefined писать код',
      "${(x => x)('Я люблю') писать код",
      'Error',
    ],
    correctAnswerIndex: 0,
    explanation:
      "Выражения внутри шаблонных литералов оцениваются первыми. Это означает, что строка будет содержать значение выражения - в данном случае значение немедленно вызываемого функционального выражения (IIFE) `(x => x)('Я люблю')`. Мы передаем значение `Я люблю` в качестве аргумента стрелочной функции `x => x`. Аргумент `x` имеет значение `Я люблю`, которое и возвращается. Это приводит к `Я люблю писать код`.",
  },
  {
    question:
      'const person = {\n  name: "John",\n  age: 29\n}\n\nconst changeAge = (x = { ...person }) => x.age += 1\nconst changeAgeAndName = (x = { ...person }) => {\n  x.age += 1\n  x.name = "Jane"\n}\n\nchangeAge(person)\nchangeAgeAndName()\n\nconsole.log(person)',
    answers: [
      '{ name: "Jane", age: 30 }',
      '{ name: "Jane", age: 31 }',
      '{ name: "John", age: 30 }',
      '{ name: "John", age: 31 }',
    ],
    correctAnswerIndex: 2,
    explanation:
      "Функции `changeAge` и `changeAgeAndName` имеют параметры по умолчанию, а именно: вновь созданный объект `{ ...person }`. Этот объект имеет копии всех ключей/значений объекта `person`. Сначала мы вызываем `changeAge()` и передаем ей объект `person` в качестве аргумента. Эта функция увеличивает значение свойства `age` на `1`. `person` теперь равняется `{ name: 'John', age: 30 }`. Затем мы вызываем `changeAgeAndName()` без аргументов. Поэтому значение аргумента `x` равняется новому объекту `{ ...person }`. Поскольку это новый объект, он не влияет на свойства исходного объекта `person`. Таким образом, `person` по-прежнему равняется `{ name: 'John', age: 30 }`.",
  },
  {
    question: 'function sumValues(x, y, z) {\n  return x + y + z // 6\n}',
    answers: [
      'sumValues([...1, 2, 3])',
      'sumValues([...[1, 2, 3]])',
      'sumValues(...[1, 2, 3])',
      'sumValues([1, 2, 3])',
    ],
    correctAnswerIndex: 2,
    explanation:
      'С помощью spread-оператора (`...`) мы разбиваем итерируемые сущности на отдельные элементы. Функция `sumValues` принимает три аргумента: `x, y и z`. Для того, чтобы эта функция вернула `6`, ей в качестве аргумента необходимо передать `...[1, 2, 3]`.',
  },
  {
    question:
      "let num = 1\nconst list = ['a', 'b', 'c', 'd']\n\nconsole.log(list[(num += 1)])",
    answers: ['b', 'c', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'С помощью оператора `+=` мы увеличиваем значение переменной `num` на `1`. Начальным значением `num` является `1`, выражение `1 + 1` оценивается как `2`. Элементом массива со вторым индексом является `c`, что и выводится в консоль.',
  },
  {
    question:
      "const person = {\n  firstName: 'John',\n  lastName: 'Smith',\n  pet: {\n    name: 'Rex',\n  },\n  getFullName() {\n    return `${this.firstName} ${this.lastName}`\n  }\n}\nconst member = {}\n\nconsole.log(person.pet?.name)\nconsole.log(person.pet?.family?.name)\nconsole.log(person.getFullName?.())\nconsole.log(member.getLastName?.())",
    answers: [
      'undefined undefined undefined undefined',
      'Rex undefined John Smith undefined',
      'Rex null John Smith null',
      'Error',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Благодаря оператору опциональной последовательности (`?.`) нам больше не нужно предварительно определять наличие глубоко вложенных свойств. Если мы попытаемся получить доступ к свойству значения `undefined` или `null`, выражение вернет `undefined`. `person.pet?.name`: объект `person` имеет свойство `pet`, `pet` имеет свойство `name` - возвращается `Rex`. `person.pet?.family?.name`: объект `person` имеет свойство `pet`, `pet` не имеет свойства `family` - возвращается `undefined`. `person.getFullName?.()`: объект `person` имеет метод `getFullName` - возвращается `John Smith`. `member.getLastName?.()`: объект `member` не имеет метода `getLastName`, возвращается `undefined`.',
  },
  {
    question:
      "const groceries = ['банан', 'яблоко', 'апельсин']\n\nif (groceries.indexOf('банан')) {\n  console.log('Нам нужно купить бананы!')\n} else {\n  console.log('Нам не нужно покупать бананы!')\n}",
    answers: [
      '"Нам нужно купить бананы!"',
      '"Нам не нужно покупать бананы!"',
      'undefined',
      '1',
    ],
    correctAnswerIndex: 1,
    explanation:
      "Условие `groceries.indexOf('banana')` возвращает значение `0`, которое является ложным. Поскольку условие не удовлетворяется, выполняется код в блоке `else`, в консоль выводится `Нам не нужно покупать бананы!`",
  },
  {
    question:
      'const config = {\n  languages: [],\n  set language(lang) {\n    return this.languages.push(lang)\n  }\n}\n\nconsole.log(config.language)',
    answers: [
      'function language(lang) { this.languages.push(lang }',
      '0',
      '[]',
      'undefined',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Метод `language` - это сеттер. Сеттеры не имеют собственных значений, их задача - модифицировать свойства объекта. Поэтому вызов сеттера возвращает `undefined`.',
  },
  {
    question:
      "const name = 'John Smith'\n\nconsole.log(!typeof name === 'object')\nconsole.log(!typeof name === 'string')",
    answers: ['false true', 'true false', 'false false', 'true true'],
    correctAnswerIndex: 2,
    explanation:
      "Выражение `typeof name` возвращает `string`. `string` - это истинное значение, поэтому выражение `!typeof name` возвращает `false`. `false === 'object'` и `false === 'string'` возвращают `false` (если мы хотим сравнить типы значений вместо `!typeof` следует использовать `!==`).",
  },
  {
    question:
      'const add = x => y => z => {\n  console.log(x, y, z)\n  return x + y + z\n}\n\nadd(4)(5)(6)',
    answers: ['4 5 6', '6 5 4', '4 function function', 'undefined undefined 6'],
    correctAnswerIndex: 0,
    explanation:
      'Функция `add` возвращает стрелочную функцию, которая возвращает стрелочную функцию, которая возвращает стрелочную функцию (вы еще здесь?). Это называется каррированием (currying). Первая функция принимает аргумент `x` со значением `4`. Мы вызываем вторую функцию с аргументом `y`, имеющим значение `5`. Затем мы вызываем третью функцию с аргументом `z` со значением `6`. Когда мы пытаемся получить доступ к значениям `x` и `y`, движок `JavaScript` поднимается по цепочке областей видимости в поисках соответствующих значений. Возвращается `4 5 6`.',
  },
  {
    question:
      'async function* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield Promise.resolve(i)\n  }\n}\n\n;(async () => {\n  const gen = range(1, 3)\n  for await (const item of gen) {\n    console.log(item)\n  }\n})()',
    answers: [
      'Promise {1} Promise {2} Promise {3}',
      'Promise {<pending>} Promise {<pending>} Promise {<pending>}',
      '1 2 3',
      'undefined undefined undefined',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Функция-генератор `range` возвращает асинхронный объект с промисами для каждого переданного значения: `Promise{1}, Promise{2}, Promise{3}`. Мы присваиваем переменной `gen` этот объект и перебираем его элементы с помощью цикла `for-await-of`. Мы устанавливаем значение переменной `item` равным значению промиса. Поскольку мы ожидаем значения `item`, т.е. разрешения промиса, то получаем `1 2 3`.',
  },
  {
    question:
      'const myFunc = ({ x, y, z }) => {\n  console.log(x, y, z)\n}\n\nmyFunc(1, 2, 3)',
    answers: [
      '1 2 3',
      '{ 1: 1 } { 2: 2 } { 3: 3 }',
      '{ 1: undefined } undefined undefined',
      'undefined undefined undefined',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Функция `myFunc` в качестве аргумента ожидает получить объект со свойствами `x, y и z`. Поскольку мы передаем ей `1, 2, 3`, а не `{ x: 1, y: 2, z: 3 }`, то возвращается значение `x, y и z` по умолчанию, т.е. `undefined`.',
  },
  {
    question:
      "const spookyItems = ['👻', '🎃', '👿']\n({ item: spookyItems[3] } = { item: '💀' })\n\nconsole.log(spookyItems)",
    answers: [
      '["👻", "🎃", "👿"]',
      '["👻", "🎃", "👿", "💀"]',
      '["👻", "🎃", "👿", { item: "💀" }]',
      '["👻", "🎃", "👿", "[object Object]"]',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Деструктурируя объекты, мы распаковываем значения правого объекта и присваиваем их одноименному свойству левого объекта. В данном случае мы присваиваем значение `💀` `spookyItems[3]`. Это означает, что мы модифицируем массив `spookyItems`, добавляя в него `💀`. Поэтому получаем `["👻", "🎃", "👿", "💀"]`.',
  },
  {
    question:
      "const name = 'John Smith'\nconst age = 30\n\nconsole.log(Number.isNaN(name))\nconsole.log(Number.isNaN(age))\n\nconsole.log(isNaN(name))\nconsole.log(isNaN(age))",
    answers: [
      'true false true false',
      'true false false false',
      'false false true false',
      'false true false true',
    ],
    correctAnswerIndex: 2,
    explanation:
      'С помощью `Number.isNaN()` мы проверяем, является ли переданное значение числом и равняется ли оно `NaN`. `name` не является числом, поэтому `Number.isNaN(name)` возвращает `false`. `age` является числом, но не равняется `NaN`, поэтому `Number.isNaN(age)` также возвращает `false`. С помощью метода `isNaN` мы проверяем, что переданное значение не является числом. `name` не является числом, поэтому `isNaN(name)` возвращает `true`. `age` является числом, поэтому `isNaN(age)` возвращает `false`.',
  },
  {
    question:
      "const randomValue = 30\n\nfunction getInfo() {\n  console.log(typeof randomValue)\n  const randomValue = 'John Smith'\n}\n\ngetInfo()",
    answers: ['number', 'string', 'undefined', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'Переменные, объявленные с помощью ключевых слов `const` и `let` недоступны до инициализации (присваивания им значения; это называется "временной мертвой зоной"). В `getInfo()` областью видимости переменной `randomValue` является функция. Когда мы пытаемся вывести значение `randomValue` в консоль, выбрасывается исключение `ReferenceError`. Движок `JavaScript` не поднимается по цепочке областей видимости, поскольку мы объявили переменную `randomValue` в функции `getInfo`. Если бы мы этого не сделали, в консоль бы вывелся тип внешней (глобальной) переменной `randomValue`, т.е. `number`.',
  },
  {
    question:
      "const myPromise = Promise.resolve('Woah some cool data')\n\n;(async () => {\n  try {\n    console.log(await myPromise)\n  } catch {\n    throw new Error(`Oops didn't work`)\n  } finally {\n    console.log('Oh finally')\n  }\n})()",
    answers: [
      'Woah some cool data',
      'Oh finally',
      'Woah some cool data и Oh finally',
      "Oops didn't work и Oh finally",
    ],
    correctAnswerIndex: 2,
    explanation:
      'В блоке `try` мы выводим в консоль ожидаемое (разрешенное) значение переменной `myPromise` - `Woah some cool data`. Поскольку в блоке `try` не возникло ошибки, код в блоке `catch` не выполняется. Код в блоке `finally` выполняется всегда, поэтому в консоль выводится `Oh finally`.',
  },
  {
    question:
      "const emojis = ['💫', ['✨', '✨', ['🍕', '🍕']]]\n\nconsole.log(emojis.flat(1))",
    answers: [
      "['💫', ['✨', '✨', ['🍕', '🍕']]]",
      "['💫', '✨', '✨', ['🍕', '🍕']]",
      "['💫', ['✨', '✨', '🍕', '🍕']]",
      "['💫', '✨', '✨', '🍕', '🍕']",
    ],
    correctAnswerIndex: 1,
    explanation:
      "С помощью метода `flat` мы создаем новый \"плоский\" массив. Глубина этого массива зависит от передаваемого значения. В данном случае мы передаем значение `1` (чего мы могли бы не делать, поскольку оно является значением по умолчанию), значит, будут объединены только массивы первого уровня вложенности, т.е. `['💫']` и `['✨', '✨', ['🍕', '🍕']]`. Результатом объединения этих массивов является `['💫', '✨', '✨', ['🍕', '🍕']]`.",
  },
  {
    question:
      'class Counter {\n  constructor() {\n    this.count = 0\n  }\n\n  increment() {\n    this.count++\n  }\n}\n\nconst counterOne = new Counter()\ncounterOne.increment()\ncounterOne.increment()\n\nconst counterTwo = counterOne\ncounterTwo.increment()\n\nconsole.log(counterOne.count)',
    answers: ['0', '1', '2', '3'],
    correctAnswerIndex: 3,
    explanation:
      'Переменная `counterOne` является экземпляром класса `Counter`. Класс `Counter` содержит свойство `count` в конструкторе и метод `increment`, увеличивающий значение данного свойства на `1`. Сначала мы дважды вызываем `increment()`. Значением `counterOne.count` становится равным `2`. Затем мы создаем новую переменную `counterTwo` и присваиваем ей значение переменной `counterOne`. Поскольку объекты взаимодействуют между собой через ссылки, мы просто создали новую ссылку на то же самое место в памяти, на которое указывает `counterOne`. Поскольку обе переменные ссылаются на одну и ту же область памяти, любые изменения объекта, на который ссылается `counterTwo` также влияют на `counterOne`. Таким образом, значением `counterTwo` является `2`. Мы вызываем `counterTwo.increment()`, который увеличивает значение свойства `count` до `3`. Наконец, мы выводим в консоль `counterOne.count` и получаем `3`.',
  },
  {
    question:
      "const myPromise = Promise.resolve(\n    Promise.resolve('Promise!')\n  )\n\nfunction funcOne() {\n  myPromise.then(res => res).then(res => console.log(res))\n  setTimeout(() => console.log('Timeout!', 0))\n  console.log('Last line!')\n}\n\nasync function funcTwo() {\n  const res = await myPromise\n  console.log(await res)\n  setTimeout(() => console.log('Timeout!', 0))\n  console.log('Last line!')\n}\n\nfuncOne()\nfuncTwo()",
    answers: [
      'Promise! Last line! Promise! Last line! Last line! Promise!',
      'Last line! Timeout! Promise! Last line! Timeout! Promise!',
      'Promise! Last line! Last line! Promise! Timeout! Timeout!',
      'Last line! Promise! Promise! Last line! Timeout! Timeout!',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Сначала мы вызываем функцию `funcOne`. На первой строке этой функции мы вызываем промис `myPromise`, который является асинхронной операцией. Пока движок `JavaScript` занят разрешением промиса, выполнение `funcOne()` продолжается. На следующей строке у нас имеется асинхронная функция `setTimeout`, которая отправляется в `WebAPI`. Промис и `setTimeout()` являются асинхронными, поэтому движок продолжает выполнять код функции, не ожидая разрешения промиса и обработки `setTimeout()`. Сказанное означает, что сначала в консоль выводится `Last line!`, поскольку `console.log()` - синхронная операция. Это последняя строка кода в `funcOne()`, промис разрешается и в консоль выводится `Promise!`.\nВ момент вызова функции `funcTwo` стек вызовов (call stack) не является пустым, поэтому колбек `setTimeout()` не может туда попасть. В `funcTwo()` мы сначала ожидаем разрешение промиса `myPromise`. С помощью ключевого слова `await` мы приостанавливаем выполнение функции до разрешения (выполнения или отклонения) промиса. Затем мы выводим в консоль ожидаемое значение переменной `res` (поскольку промис возвращает промис). В консоль выводится `Promise!`. На следующей строке у нас снова встречается асинхронная функция `setTimeout`, которая отправляется в `WebAPI`. Мы достигаем последней строки кода в `funcTwo()`, в консоль выводится `Last line!`.\nПосле того, как `funcTwo()` удаляется из стека вызовов, стек оказывается пустым. Ожидающие этого в очереди задач колбеки (`console.log("Timeout!")` из `funcOne()` и `console.log("Timeout!")` из `funcTwo()`) помещаются туда одна за другой. Первый колбек выводит в консоль `Timeout!` и удаляется из стека, затем то же самое происходит со вторым колбеком. Таким образом, мы получаем `Last line! Promise! Promise! Last line! Timeout! Timeout!`.',
  },
  {
    question:
      "// sum.js\nexport default function sum(x) {\n  return x + x\n}\n\n// index.js\nimport * as sum from './sum'\n/* вызов функции \"sum\" */",
      answers: ['sum()', 'sum.sum()', 'sum.default()', 'символ `*` может использоваться только при именованном экспорте'],
      correctAnswerIndex: 2,
      explanation: 'С помощью символа `*` мы импортируем все экспортируемые из файла сущности, как дефолтные, так и именованные. Если у нас есть такие файлы:\n\n// info.js\nexport const name = "John"\nexport const age = 30\nexport default "I love JavaScript!"\n\n// index.js\nimport * as info from "./info"\nconsole.log(info)\n\nВ консоль будет выведено:\n\n{ default: \"I love JavaScript!\", name: \"John\", age: 30 }\n\nВ данном случае импортированное значение функции `sum` выглядит примерно так:\n\n{ default: function sum(x) { return x + x } }\n\nМы можем вызвать эту функцию посредством `sum.default()`.',
  },
  {
    question: 'const handler = {\n  set: () => console.log("Added a new property!"),\n  get: () => console.log("Accessed a property!"),\n}\n\nconst person = new Proxy({}, handler)\n\nperson.name = "John"\nperson.name',
    answers: [
      'Added a new property!',
      'Accessed a property!',
      'Added a new property! Accessed a property!',
      'Error',
    ],
    correctAnswerIndex: 2,
    explanation:
      'С помощью прокси (Proxy) мы можем добавить объекту, передаваемому в качестве второго аргумента, определенное поведение. В данном случае мы передаем объект `handler`, который имеет два свойства: `set` и `get`. `set` вызывается при установке значений, а `get` - при их получении. Первый аргумент прокси - пустой объект (`{}`), который является значением переменной `person`. Поведение этого объекта определено в объекте `handler`. При добавлении свойства объекту `person` вызывается метод `set`. При получении доступа к свойству `person` вызывается `get()`. Сначала мы добавляем прокси новое свойство `name`. Вызывается метод `set` и в консоль выводится `Added a new property!`. Затем мы получаем значение свойства `name`. Вызывается `get()` и в консоль выводится `Accessed a property!`.',
  },
  {
    question:
      "const person = {\n  name: 'John Smith',\n  address: {\n    street: '100 Some Street',\n  }\n}\n\nObject.freeze(person)\nperson.address.street = \"101 Main Street\"\nconsole.log(person.address.street)",
    answers: ['false', '100 Some Street', '101 Main Street', 'Error'],
    correctAnswerIndex: 2,
    explanation:
      '`Object.freeze()` "замораживает" объект. В такой объект нельзя добавлять новые свойства, а существующие свойства не могут изменяться или удаляться. Тем не менее, объект замораживается поверхностно. Это означает, что свойства первого уровня вложенности иммутабельны (неизменяемы/неизменны). Однако в случае, когда таким свойством является объект (`address`), его свойства можно изменять.',
  },
  {
    question:
      'const add = x => x + x\n\nfunction myFunc(num = 2, value = add(num)) {\n  console.log(num, value)\n}\n\nmyFunc()\nmyFunc(3)',
    answers: [
      '2 4 и 3 6',
      '2 NaN и 3 NaN',
      '2 undefined и 3 6',
      '2 4 и 3 undefined',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Сначала мы вызываем функцию `myFunc` без аргументов. Поэтому аргументам присваиваются значения по умолчанию: `num` - `2`, а `value` - значение, возвращаемое функцией `add`. Мы передаем `add()` значение `num` в качестве аргумента, которое равняется `2`. `add()` возвращает `4`, что является значением `value`. Затем мы вызываем `myFunc()` с аргументом `3`, которое присваивается `num`. Поскольку мы не присваиваем значения `value`, его значением вновь становится значение, возвращаемое `add()`. Мы передаем `add()` значение `3`, она возвращает `6`, что становится значением `value`.',
  },
  {
    question:
      'class Counter {\n  #number = 10\n\n  increment() {\n    this.#number++\n  }\n\n  getNum() {\n    return this.#number\n  }\n}\n\nconst counter = new Counter()\ncounter.increment()\n\nconsole.log(counter.#number)',
    answers: ['10', '11', 'undefined', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'В `ECMAScript 2020` мы можем добавлять классам приватные (частные/закрытые) переменные с помощью символа `#`. Мы не можем получить доступ к таким переменным за пределами класса. Поэтому, когда мы пытается вывести в консоль значение `counter.#number`, выбрасывается исключение `SyntaxError`.',
  },
  {
    question:
      "const teams = [\n  { name: 'Team 1', members: ['John', 'Jane'] },\n  { name: 'Team 2', members: ['Alice', 'Bob'] },\n]\n\nfunction* getMembers(members) {\n  for (let i = 0; i < members.length; i++) {\n    yield members[i]\n  }\n}\n\nfunction* getTeams(teams) {\n  for (let i = 0; i < teams.length; i++) {\n    /* ? */\n  }\n}\n\nconst obj = getTeams(teams)\nobj.next() // { value: \"John\", done: false }\nobj.next() // { value: \"Jane\", done: false }",
    answers: [
      'yield getMembers(teams[i].members)',
      'yield* getMembers(teams[i].members)',
      'return getMembers(teams[i].members)',
      'return yield getMembers(teams[i].members)',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Для того, чтобы перебрать `members` в каждом элементе массива `items`, нам необходимо передать `teams[i].members` в функцию-генератор `getMembers`. Генератор возвращает объект. Для того, чтобы перебрать элементы этого объекта следует использовать `yield*`. Если мы не укажем `yield`, `return yield` или `return`, внутренняя функция-генератор не будет возвращена при первом вызове метода `next`.',
  },
  {
    question:
      "const person = {\n  name: 'John Smith',\n  hobbies: ['coding'],\n}\n\nfunction addHobby(hobby, hobbies = person.hobbies) {\n  hobbies.push(hobby)\n  return hobbies\n}\n\naddHobby('running', [])\naddHobby('dancing')\naddHobby('baking', person.hobbies)\n\nconsole.log(person.hobbies)",
    answers: [
      '["coding"]',
      '["coding", "dancing"]',
      '["coding", "dancing", "baking"]',
      '["coding", "running", "dancing", "baking"]',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Функция `addHobby` принимает два аргумента: `hobby` и `hobbies` с дефолтным значением, равным свойству `hobbies` объекта `person`. Сначала мы вызываем `addHobby()` и передаем ей `running` в качестве значения для `hobby` и пустой массив в качестве значения для `hobbies`. Поскольку мы передали пустой массив в качестве значения для `hobbies`, в него добавляется `running`. Затем мы вызываем `addHobby()` и передаем ей `dancing` в качестве значения для `hobby`. При этом, мы не передаем значения для `hobbies`, поэтому он получает значение по умолчанию, т.е. значение свойства `hobbies` объекта `person`. В этот массив добавляется `dancing`. Наконец, мы вызываем `addHobby()` и передаем ей `baking` в качестве значения для `hobby` и массив `person.hobbies` в качестве значения для `hobbies`. Мы добавляем `baking` в массив `person.hobbies`. После добавления `dancing` и `baking` значением `person.hoobies` является `["coding", "dancing", "baking"]`.',
  },
  {
    question:
      'class Bird {\n  constructor() {\n    console.log("I\'m a bird. 🐤")\n  }\n}\n\nclass Flamingo extends Bird {\n  constructor() {\n    console.log("I\'m pink. 🌸")\n    super()\n  }\n}\n\nconst pet = new Flamingo()',
    answers: [
      "I'm pink. 🌸",
      "I'm pink. 🌸 и I'm a bird. 🐤",
      "I'm a bird. 🐤 и I'm pink. 🌸",
      'undefined',
    ],
    correctAnswerIndex: 1,
    explanation:
      "Мы создаем переменную `pet`, которая является экземпляром класса `Flamingo`. При создании экземпляра вызывается `constructor()`. В консоль выводится `I'm pink. 🌸`, после чего вызывается `super()`. `super()` вызывает конструктор родительского класса. В консоль выводится `I'm a bird. 🐤`.",
  },
  {
    question:
      'const person = {\n  name: "John Smith",\n  age: 30\n}\n\nconsole.log([...person])\n// ["John Smith", 30] - как получить такой вывод?',
    answers: ['объекты являются итерируемыми по умолчанию', '*[Symbol.iterator]() { for (let x in this) yield* this[x] }', '*[Symbol.iterator]() { yield* Object.values(this) }', '*[Symbol.iterator]() { for (let x in this) yield this }'],
    correctAnswerIndex: 2,
    explanation: 'Объекты не являются итерируемыми (перебираемыми) по умолчанию. В итерируемых сущностях имеется протокол итератора. Мы можем реализовать такой протокол вручную, добавив в объект символ итератора (`[Symbol.iterator]`), который будет возвращать объект-генератор. Мы, например, можем преобразовать исходный объект в функцию-генератор с помощью `[Symbol.iterator]() {}`. Эта функция-генератор будет перебирать значения объекта `person`. Если мы хотим вернуть массив `[\'John Smith\', 30]`, то объект должен выглядеть так: `yield* Object.values(this)`.',
  },
  {
    question: 'let count = 0\nconst nums = [0, 1, 2, 3]\n\nnums.forEach(num => {\n  if (num) count += 1\n})\n\nconsole.log(count)',
    answers: ['1', '2', '3', '4'],
    correctAnswerIndex: 2,
    explanation:
      'Условие в цикле `forEach` проверяет, является ли значение переменной `num` истинным. Поскольку первым значением `num` является `0` (ложное значение), код в блоке `if` не выполняется. Остальные значения `num` (`1, 2, 3`) являются истинными, поэтому значение `count` увеличивается на `1` три раза. В результате значением `count` становится `3`.',
  },
  {
    question:
      "function getFruit(fruits) {\n  console.log(fruits?.[1]?.[1])\n}\n\ngetFruit([['🍊', '🍌'], ['🍍']])\ngetFruit()\ngetFruit([['🍍'], ['🍊', '🍌']])",
    answers: [
      'null undefined 🍌',
      '[] null 🍌',
      '[] [] 🍌',
      'undefined undefined 🍌',
    ],
    correctAnswerIndex: 3,
    explanation:
      "Оператор `?.` (опциональная последовательность) позволяет нам безопасно получать доступ к глубоко вложенным и потенциально несуществующим свойствам объектов. Мы пытаемся вывести в консоль элемент с индексом `1` подмассива с индексом `1` массива `fruits`. Если подмассива с индексом `1` в массиве `fruits` не существует, возвращается `undefined`. Если подмассив с индексом `1` в массиве `fruits` существует, но не имеет элемента с индексом `1`, также возвращается `undefined`. Сначала мы пытаемся вывести в консоль второй элемент подмассива `['🍍']` массива `[['🍊', '🍌'], ['🍍']]]`. Этот подмассив состоит из одного элемента, т.е. элемента с индексом `1` в данном массиве не существует, поэтому возвращается `undefined`. Затем мы вызываем функцию `getFruits` без аргументов, поэтому массив `fruits` имеет значение `undefined`. Наконец, мы пытаемся вывести в консоль второй элемент подмассива `['🍊', '🍌']` массива `['🍍'], ['🍊', '🍌']`. Элементом с индексом `1` этого подмассива является `🍌`, что и выводится в консоль.",
  },
  {
    question:
      'class Calc {\n  constructor() {\n    this.count = 0\n  }\n\n  increase() {\n    this.count++\n  }\n}\n\nconst calc = new Calc()\nnew Calc().increase()\n\nconsole.log(calc.count)',
    answers: ['0', '1', 'undefined', 'Error'],
    correctAnswerIndex: 0,
    explanation:
      'Мы присваиваем переменной `calc` значение нового экземпляра класса `Calc`. Затем мы инициализируем новый экземпляр класса `Calc` и вызываем его метод `increase`. Поскольку свойство `count` находится в конструкторе класса `Calc`, данное свойство не является общим для экземпляров класса `Calc`. Это означает, что свойство `count` не обновляется для `calc`, оно по-прежнему равняется `0`.',
  },
  {
    question:
      'const user = {\n  email: "e@mail.com",\n  password: "12345"\n}\n\nconst updateUser = ({ email, password }) => {\n  if (email) {\n    Object.assign(user, { email })\n  }\n\n  if (password) {\n    user.password = password\n  }\n\n  return user\n}\n\nconst updatedUser = updateUser({ email: "new@email.com" })\n\nconsole.log(updatedUser === user)',
    answers: ['false', 'true', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'Функция `updateUser` обновляет свойства `email` и `password` объекта `user`, если их значения переданы в качестве аргументов, после чего функция возвращает объект `user`. Значением, которое вернула `updateUser()`, является объект `user`. Таким образом, переменная `updatedUser` ссылается на то же место в памяти, что и сам `user`. Поэтому выражение `updatedUser === user` возвращает `true`.',
  },
  {
    question:
      "const fruits = ['🍌', '🍊', '🍎']\n\nfruits.slice(0, 1)\nfruits.splice(0, 1)\nfruits.unshift('🍇')\n\nconsole.log(fruits)",
    answers: [
      "['🍌', '🍊', '🍎']",
      "['🍊', '🍎']",
      "['🍇', '🍊', '🍎']",
      "['🍇', '🍌', '🍊', '🍎']",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Сначала мы вызываем метод `slice` для массива `fruits`. Данный метод не модифицирует исходный массив и возвращает извлеченное значение: `🍌`. Затем мы вызываем метод `splice`. Данный метод модифицирует исходный массив, `fruits` теперь выглядит так: `['🍊', '🍎']`. Наконец, мы вызываем метод `unshift`, который также модифицирует исходный массив, добавляя к нему `🍇` в качестве первого элемента. Массив `fruits` теперь выглядит так: `['🍇', '🍊', '🍎']`.",
  },
  {
    question:
      'const animals = {}\nlet dog = { emoji: \'🐶\' }\nlet cat = { emoji: \'🐈\' }\n\nanimals[dog] = { ...dog, name: "Rex" }\nanimals[cat] = { ...cat, name: "Niko" }\n\nconsole.log(animals[dog])',
    answers: [
      '{ emoji: "🐶", name: "Rex" }',
      '{ emoji: "🐈", name: "Niko" }',
      'undefined',
      'Error',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Ключи объекта конвертируются (преобразуются) в строки. Поскольку значением переменной `dog` является объект, `animals[dog]` означает, что мы создаем новое свойство с именем `object Object`, значением которого является новый объект. `animals["object Object"]` равняется `{ emoji: "🐶", name: "Rex"}`. Значением переменной `cat` также является объект. Это означает, что мы перезаписываем свойство `animals["object Object"]` новым значением. Поэтому, когда мы выводим в консоль `animals[dog]`, мы на самом деле обращаемся к `animals["object Object"]`, поэтому получаем `{ emoji: "🐈", name: "Niko" }`.',
  },
  {
    question:
      'const user = {\n  email: "my@email.com",\n  updateEmail: email => {\n    this.email = email\n  }\n}\n\nuser.updateEmail("new@email.com")\nconsole.log(user.email)',
    answers: ['my@email.com', 'new@email.com', 'undefined', 'Error'],
    correctAnswerIndex: 0,
    explanation:
      'Функция `updateEmail` является стрелочной, поэтому она не привязана (bind) к объекту `user`. Это означает, что ключевое слово `this` не ссылается на объект `user`. В данном случае `this` указывает на глобальную область видимости (`window` в браузере, `global` в `Node.js`). Значение свойства `email` объекта `user` не обновляется. Поэтому, когда мы обращаемся к `user.email`, в консоль выводится `my@email.com`.',
  },
  {
    question:
      "const promise1 = Promise.resolve('First')\nconst promise2 = Promise.resolve('Second')\nconst promise3 = Promise.reject('Third')\nconst promise4 = Promise.resolve('Fourth')\n\nconst runPromises = async () => {\n  const res1 = await Promise.all([promise1, promise2])\n  const res2  = await Promise.all([promise3, promise4])\n  return [res1, res2]\n}\n\nrunPromises()\n  .then(res => console.log(res))\n  .catch(er => console.log(er))",
    answers: [
      "[['First', 'Second']] и [['Fourth']]",
      "[['First', 'Second']] и [['Third', 'Fourth']]",
      "[['First', 'Second']]",
      "'Third'",
    ],
    correctAnswerIndex: 3,
    explanation:
      '`Promise.all()` выполняет переданные ему промисы одновременно (параллельно). Если один из промисов отклоняется, `Promise.all()` также отклоняется со значением отклоненного промиса. В данном случае `promise3` отклоняется со значением `Third`. Мы обрабатываем отклоненное значение в блоке `catch` функции `runPromises`. Поэтому в консоль выводится только `Third`.',
  },
  {
    question:
      'const keys = ["name", "age"]\nconst values = ["John", 30]\n\nconst method = /* ? */\n\nObject[method](keys.map((_, i) => {\n  return [keys[i], values[i]]\n})) // { name: "John", age: 30 }',
    answers: ['entries', 'values', 'fromEntries', 'forEach'],
    correctAnswerIndex: 2,
    explanation:
      "Метод `fromEntries` преобразует двумерный массив в объект. Первый элемент каждого подмассива становится ключом, а второй - значением. В данном случае мы перебираем элементы массива `keys`, возвращая массив, первым элементом которого является элемент массива `keys` с текущим индексом, вторым элементом - элемент массива `values` с текущим индексом. Это создает массив массивов с правильными ключами и значениями, которые преобразуются в `{ name: 'John', age: 30 }`.",
  },
  {
    question:
      'const createMember = ({ email, address = {}}) => {\n  const validEmail = /.+@.+..+/.test(email)\n  if (!validEmail) throw new Error("Valid email please")\n\n  return {\n    email,\n    address: address ? address : null\n  }\n}\n\nconst member = createMember({ email: "my@email.com" })\nconsole.log(member)',
    answers: [
      '{ email: "my@email.com", address: null }',
      '{ email: "my@email.com" }',
      '{ email: "my@email.com", address: {} }',
      '{ email: "my@email.com", address: undefined }',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Значением `address` по умолчанию является пустой объект (`{}`). Когда мы присваиваем переменной `member` значение, возвращаемое функцией `createMember`, мы не передаем значение для `address`, поэтому ее значением становится `{}`. Пустой объект - это истинное значение, поэтому условие `address ? address : null` возвращает `address`. Значением `address` является `{}`.',
  },
  {
    question:
      'let randomValue = { name: "John" }\nrandomValue = 30\n\nif (!typeof randomValue === "string") {\n  console.log("Это не строка!")\n} else {\n  console.log("Это строка!")\n}',
    answers: ['"Это не строка!"', '"Это строка!"', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      "Условие `if` проверяет, является ли `!typeof randomValue` строкой. Оператор `!` преобразует значение в логический тип данных и инвертирует его. Если значение истинно, возвращается `false`, если ложно - `true`. В данном случае значением `typeof randomValue` является `number`, что есть истина, поэтому возвращается `false`. Выражение `!typeof randomValue === 'string'` возвращает `false`, поскольку на самом деле мы проверяем `false === 'string'`. Условие возвращает `false`, поэтому выполняется код в блоке `else` и в консоль выводится `Это строка!`.",
  },
  {
    question:
      'var car = new Vehicle("Honda", "white", "2010", "UK")\nconsole.log(car)\n\nfunction Vehicle(model, color, year, country) {\n  this.model = model\n  this.color = color\n  this.year = year\n  this.country = country\n}',
    answers: [
      'undefined',
      'Error',
      'null',
      '{ model: "Honda", color: "white", year: "2010", country: "UK" }',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Объявление функции поднимается в начало области видимости подобно объявлению переменной. Это называется поднятием или подъемом (hoisting). Поэтому место объявления функции `Venicle` в данном случае значения не имеет.',
  },
  {
    question:
      'function foo() {\n  let x = y = 0\n  x++\n  y++\n  return x\n}\n\nconsole.log(foo(), typeof x, typeof y)',
    answers: [
      '1 undefined undefined',
      'Error',
      '1 undefined number',
      '1 number number',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Функция `foo` возвращает `1` из-за оператора `++`. Выражение `let x = y = 0` определяет локальную переменную `x`. Однако `y` определяется как глобальная переменная. Данное выражение эквивалентно следующему:\n\nlet x\nwindow.y = 0\nx = window.y\n\nПоскольку переменная `x` за пределами функции имеет значение `undefined`, т.е. не определена, ее типом также является `undefined`. Однако `y` за пределами функции доступна и имеет значение `0` с типом `number`.',
  },
  {
    question:
      "function main() {\n  console.log('A')\n  setTimeout(function print() {\n    console.log('B')\n  }, 0)\n  console.log('C')\n}\n\nmain()",
    answers: ['A B C', 'B A C', 'A C', 'A C B'],
    correctAnswerIndex: 3,
    explanation:
      "Порядок выполнения функций зависит от стека вызовов (call stack). В данном случае он будет таким:\n1. Сначала в стек помещается функция `main`.\n2. Затем в стек помещается `console.log('A')`, выполняется и удаляется из стека.\n3. Далее `setTimeot()` отправляется в `WebAPI`, а оставшийся код продолжает выполняться.\n4. В стек помещается `console.log('C')`, выполняется и удаляется из стека.\n5. Колбек `setTimeout()` помещается в очередь задач (task queue, второе слово читается как \"кью\").\n6. Функция `main` удаляется из стека.\n7. После того, как стек вызовов опустел, в него помещается колбек из очереди задач.\n8. В стек помещается `console.log('B')`, выполняется и удаляется из стека.",
  },
  {
    question: 'console.log(0.1 + 0.2 === 0.3)',
    answers: ['false', 'true', 'undefined', 'Error'],
    correctAnswerIndex: 0,
    explanation:
      'Здесь мы имеем дело с распространенной проблемой чисел с плавающей точкой (или запятой, или чисел двойной точности, см. `IEEE 754`). Поскольку такие числа преобразуются в двоичные данные, имеет место некоторая неточность округления. Поэтому математические операции с названными числами порой приводят к неожиданным результатам. В частности, значением выражения `0.1 + 0.2` будет `0.30000000000000004`, что чуть больше, чем `0.3`. Поэтому сравнение `0.1 + 0.2 === 0.3` возвращает `false`.',
  },
  {
    question:
      'var y = 1\nif (function f(){}) {\n  y += typeof f\n}\nconsole.log(y)',
    answers: ['1function', '1object', 'Error', '1undefined'],
    correctAnswerIndex: 3,
    explanation:
      'Условие `if (function f(){})` возвращает `true` (функция - это объект). Поскольку переменная `f` нигде не определяется, она имеет значение `undefined` по умолчанию с типом `undefined`. Получаем `1 + undefined` или `1undefined` (оба операнда приводятся к строке).',
  },
  {
    question:
      'function foo() {\nreturn\n  {\n    message: "Hello World"\n  }\n}\nconsole.log(foo())',
    answers: [
      'Hello World',
      'Object { message: "Hello World" }',
      'undefined',
      'Error',
    ],
    correctAnswerIndex: 2,
    explanation:
      "Здесь мы имеем дело с автоматической расстановкой точек с запятой движком `JavaScript`. В данном случае точка с запятой автоматически вставляется после оператора `return`. Поэтому функция возвращает `undefined`.\nЕсли поставить `{` перед `return`, то функция будет работать, как ожидается:\n\nfunction foo() { return { message: 'Hello World' } }\nconsole.log(foo()) // { message: 'Hello World' }\n",
  },
  {
    question:
      "var myChars = ['a', 'b', 'c', 'd']\ndelete myChars[0]\nconsole.log(myChars)\nconsole.log(myChars[0])\nconsole.log(myChars.length)",
    answers: [
      "[empty, 'b', 'c', 'd'] empty 3",
      "[null, 'b', 'c', 'd'] empty 3",
      "[empty, 'b', 'c', 'd'] undefined 4",
      "[null, 'b', 'c', 'd'] undefined 4",
    ],
    correctAnswerIndex: 2,
    explanation:
      'Оператор `delete` удаляет свойства объекта, но не индексы массива. Точнее, удаляется только значение массива по указанному индексу, сам индекс остается, его значением становится `undefined`. При этом, количество элементов в массиве и его длина сохраняются.',
  },
  {
    question:
      "const obj = {\n  prop1: function() { return 0 },\n  prop2() { return 1 },\n  ['prop' + 3]() { return 2 }\n}\n\nconsole.log(obj.prop1())\nconsole.log(obj.prop2())\nconsole.log(obj.prop3())",
    answers: [
      '0 1 2',
      '0 { return 1 } 2',
      '0 { return 1 } { return 2 }',
      '0 1 undefined',
    ],
    correctAnswerIndex: 0,
    explanation:
      '`ES6`, среди прочего, представил новые способы определения методов и сокращения свойств объекта. Поэтому `prop2` и `prop3` обрабатываются как обычные функции.',
  },
  {
    question: 'console.log(1 < 2 < 3)\nconsole.log(3 > 2 > 1)',
    answers: ['true true', 'true false', 'Error', 'false false'],
    correctAnswerIndex: 1,
    explanation:
      'Если в блоке `if` содержатся одинаковые операторы, то выражение оценивается слева направо. Для первого выражения порядок будет следующим:\n\nconsole.log(1 < 2 < 3)\nconsole.log(true < 3)\nconsole.log(1 < 3) // true\n\nА для второго таким:\n\nconsole.log(3 > 2 > 1)\nconsole.log(true > 1)\nconsole.log(1 > 1) // false\n',
  },
  {
    question:
      '// обратите внимание: код выполняется в нестрогом режиме\nfunction printNumbers (first, second, first) {\n  console.log(first, second, first)\n}\nprintNumbers(1, 2, 3)',
    answers: ['1 2 3', '3 2 3', 'Error', '1 2 1'],
    correctAnswerIndex: 1,
    explanation:
      'В нестрогом режиме дублирующиеся параметры в обычных функциях разрешены. В приведенном примере дублирующимися являются параметры `1` и `3` (`first`). Первый параметр указывает на третий аргумент, передаваемый функции. Поэтому третий аргумент перезаписывает первый параметр. Обратите внимание, что в строгом режиме будет выброшено исключение.',
  },
  {
    question:
      '// обратите внимание: код выполняется в нестрогом режиме\nconst printNumbersArrow = (first, second, first) => {\n  console.log(first, second, first)\n}\nprintNumbersArrow(1, 2, 3)',
    answers: ['1 2 3', '3 2 3', 'Error', '1 2 1'],
    correctAnswerIndex: 2,
    explanation:
      'В отличие от обычных, в стрелочных функциях дублирующиеся параметры запрещены, независимо от режима выполнения кода. Поэтому в данном случае будет выброшено исключение `SyntaxError: Duplicate parameter name not allowed in this context` (дублирующиеся названия параметров в данном контексте запрещены).',
  },
  {
    question: 'const f = () => arguments.length\nconsole.log(f(1, 2, 3))',
    answers: ['Error', '3', 'undefined', 'null'],
    correctAnswerIndex: 0,
    explanation:
      'Стрелочные функции не имеют `arguments`, `this`, `super` и `new.target`. Поэтому любое обращение к `arguments` приводит к поиску переменной с таким названием в лексическом (внешнем) окружении функции. В данном случае переменной `arguments` в коде не существует. Поэтому возникает ошибка.\nВ обычных функциях `arguments` - это массивоподобный объект, содержащий переданные функции аргументы:\n\nconst f = function () { return arguments.length }\nconsole.log(f(1, 2, 3)) // 3\n\nВ стрелочных функциях альтернативой `arguments` является rest-оператор `...` (прочие параметры):\n\nconst f = (...args) => args.length\nconsole.log(f(1, 2, 3)) // 3\n',
  },
  {
    question:
      "console.log( String.prototype.trimLeft.name === 'trimLeft' )\nconsole.log( String.prototype.trimLeft.name === 'trimStart' )",
    answers: ['true false', 'false true', 'undefined', 'null'],
    correctAnswerIndex: 1,
    explanation:
      'По аналогии с `String.prototype.padStart` встроенный метод для удаления пробелов в начале строки был назван `trimStart`. Однако для обеспечения обратной совместимости название `trimLeft` было сохранено в качестве синонима (alias) для `trimStart`. При этом, прототипом `trimLeft` является `trimStart`.',
  },
  {
    question: 'console.log(Math.max())',
    answers: ['undefined', 'Infinity', '0', '-Infinity'],
    correctAnswerIndex: 3,
    explanation:
      '`-Infinity` - это наименьшее из сравниваемых значений, поскольку почти любое другое значение в `JavaScript` больше него. Поэтому, когда `Math.max()` вызывается без аргументов, возвращается `-Infinity`.',
  },
  {
    question: 'console.log(10 == [10])\nconsole.log(10 == [[[[[[[10]]]]]]])',
    answers: ['true true', 'true false', 'false false', 'false true'],
    correctAnswerIndex: 0,
    explanation:
      'Согласно спецификации `ECMAScript` приведенные выражения будут преобразованы следующим образом:\n\n10 == Number([10].valueOf().toString()) // 10\n\nПоэтому количество скобок значения не имеет.',
  },
  {
    question: "console.log(10 + '10')\nconsole.log(10 - '10')",
    answers: ['20 0', '1010 0', '1010 10-10', 'NaN NaN'],
    correctAnswerIndex: 1,
    explanation:
      'Оператор `+` применяется как к числам, так и к строкам. Если одним из операндов является строка, второй операнд также приводится к строке, и операнды объединяются. Это называется конкатенацией. Оператор `-` пытается преобразовать операнд в число. При невозможности это сделать возвращается `NaN`.',
  },
  {
    question: 'console.log([1, 2] + [3, 4])',
    answers: ['[1, 2, 3, 4]', "'[1, 2][3, 4]'", 'Error', "'1,23,4'"],
    correctAnswerIndex: 3,
    explanation:
      'Оператор `+` не предназначен для сложения массивов. Поэтому массивы преобразуются в строки и объединяются.',
  },
  {
    question:
      "const numbers = new Set([1, 1, 2, 3, 4])\nconsole.log(numbers)\n\nconst browser = new Set('Firefox')\nconsole.log(browser)",
    answers: [
      '{ 1, 2, 3, 4 } и { "F", "i", "r", "e", "f", "o", "x" }',
      '{ 1, 2, 3, 4 } и { "F", "i", "r", "e", "o", "x" }',
      '[1, 2, 3, 4] и ["F", "i", "r", "e", "o", "x"]',
      '{ 1, 1, 2, 3, 4 } и { "F", "i", "r", "e", "f", "o", "x" }',
    ],
    correctAnswerIndex: 0,
    explanation:
      '`Set` - это объект, представляющий собой коллекцию уникальных значений, поэтому повторяющиеся значения в него не включаются. В то же время, данный объект является чувствительным к регистру, поэтому в коллекцию записываются как `F`, так и `f`.',
  },
  {
    question:
      'console.log(NaN === NaN)',
    answers: ['true', 'false', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation: '`NaN` согласно стандарту `IEEE 754` не равен никакому другому значению, включая `NaN`. Еще одной интересной особенностью `NaN` является то, что данное значение представляет собой неправильное, но все-таки число, несмотря на то, что `NaN` расшифровывается как `Not a Number` (не число). Для того, чтобы убедиться в том, что `NaN` - это число, выполните `console.log(typeof NaN)`.',
  },
  {
    question: 'const numbers = [1, 2, 3, 4, NaN]\nconsole.log(numbers.indexOf(NaN))',
    answers: ['4', 'NaN', 'Error', '-1'],
    correctAnswerIndex: 3,
    explanation:
      '`indexOf()` использует оператор строгого равенства или проверки на идентичность (`===`), а поскольку `NaN` не равен никакому другому значению, включая `NaN`, выражение `NaN === NaN` возвращает `false`. `indexOf()` не может найти `NaN` в массиве - возвращается `-1`. Для поиска индекса `NaN` можно использовать метод `findIndex`. Также для проверки наличия `NaN` в массиве можно использовать метод `includes`:\n\nconst numbers = [1, 2, 3, 4, NaN]\nconsole.log(numbers.findIndex(Number.isNaN)) // 4\nconsole.log(numbers.includes(Number.isNaN)) // true\n',
  },
  {
    question: 'const [a, ...b,] = [1, 2, 3, 4, 5]\nconsole.log(a, b)',
    answers: ['1 [2, 3, 4, 5]', '1 {2, 3, 4, 5}', 'Error', '1 [2, 3, 4]'],
    correctAnswerIndex: 2,
    explanation:
      'При использовании rest-оператора `...` (прочие параметры), он передается в качестве последнего аргумента. В данном случае использование замыкающей запятой (trailing comma) приводит к возникновению ошибки. Если убрать запятую, то все будет в порядке:\n\nconst [a, ...b] = [1, 2, 3, 4, 5]\nconsole.log(a, b) // 1 [2, 3, 4, 5]\n',
  },
  {
    question: 'async function func() {\n  return 10\n}\nconsole.log(func())',
    answers: ['Promise {:10}', '10', 'Error', 'Promise {:undefined}'],
    correctAnswerIndex: 0,
    explanation:
      'Асинхронная функция всегда возвращает промис. Даже если возвращаемое такой функцией значение само по себе не является промисом, оно будет "завернуто" в промис. Приведенный пример эквивалентен следующему:\n\nfunction func() { return Promise.resolve(10) }\n',
  },
  {
    question: 'async function func() {\n  await 10\n}\nconsole.log(func())',
    answers: ['Promise {:10}', '10', 'Error', 'Promise {:undefined}'],
    correctAnswerIndex: 3,
    explanation:
      '`await` возвращает `Promise {:10}`, который может быть обработан с помощью `then`. В данном случае функция не содержит оператора `return`, т.е. не возвращает никакого значение в явном виде. Поэтому возвращается `undefined`. Приведенный код эквивалентен следующему:\n\nfunction func () { return Promise.resolve(10).then(() => undefined) }\n',
  },
  {
    question:
      'function delay() {\n  return new Promise(resolve => setTimeout(resolve, 2000))\n}\n\nasync function delayedLog(item) {\n  await delay()\n  console.log(item)\n}\n\nasync function processArray(array) {\n  array.forEach(item => {\n    await delayedLog(item)\n  })\n}\n\nprocessArray([1, 2, 3, 4])',
    answers: ['Error', '1, 2, 3, 4', '4, 4, 4, 4', '4, 3, 2, 1'],
    correctAnswerIndex: 0,
    explanation:
      'Несмотря на то, что `processArray` - это асинхронная функция, анонимная функция, которую мы используем в `forEach()`, является синхронной. Использование ключевого слова `await` в синхронных функциях приводит к тому, что выбрасывается исключение `SyntaxError: await is only valid in async function` (ключевое слово `await` валидно только в асинхронных функциях).',
  },
  {
    question:
      "function delay() {\n  return new Promise(resolve => setTimeout(resolve, 2000))\n}\n\nasync function delayedLog(item) {\n  await delay()\n  console.log(item)\n}\n\nasync function process(array) {\n  array.forEach(async (item) => {\n    await delayedLog(item)\n  })\n  console.log('Process completed!')\n}\n\nprocess([1, 2, 3, 5])",
    answers: [
      '1 2 3 5 и Process completed!',
      '5 5 5 5 и Process completed!',
      'Process completed! и 5 5 5 5',
      'Process completed! и 1 2 3 5',
    ],
    correctAnswerIndex: 3,
    explanation:
      "Метод `forEach` не ожидает завершения операции, он лишь запускает ее выполнение и двигается дальше. Поэтому `console.log('Process finished!')` выполняется первым согласно последовательности разрешения промисов. Определить нужную последовательность можно с помощью оператора `for-of` и ключевого слова `await`:\n\nasync function processArray(array) {\n  for (const item of array) {\n    await delayedLog(item)\n  }\n  console.log('Process completed!')\n}\n",
  },
  {
    question:
      'var set = new Set()\nset.add("+0")\n  .add("-0")\n    .add(NaN)\n        .add(undefined)\n            .add(NaN)\n\nconsole.log(set)',
    answers: [
      'Set(4) { "+0", "-0", NaN, undefined }',
      'Set(3) { "+0", NaN, undefined }',
      'Set(5) { "+0", "-0", NaN, undefined, NaN }',
      'Set(4) { "+0", NaN, undefined, NaN }',
    ],
    correctAnswerIndex: 0,
    explanation:
      'В отличии от операторов равенства (`==` и `===`), для `Set` все `NaN` являются одинаковыми значениями, а `+0` и `-0` - разными.',
  },
  {
    question:
      "const sym1 = Symbol('one')\nconst sym2 = Symbol('one')\n\nconst sym3 = Symbol.for('two')\nconst sym4 = Symbol.for('two')\n\nconsole.log(sym1 === sym2, sym3 === sym4)",
    answers: ['true true', 'true false', 'false true', 'false false'],
    correctAnswerIndex: 2,
    explanation:
      'Для символом характерно следующее:\n1. Каждый символ, возвращаемый `Symbol()`, это уникальное значение. Строка, передаваемая `Symbol()`, это всего лишь опциональная метка или описание символа, которая обычно используется для отладки кода.\n2. Метод `Symbol.for` создает символ в глобальном реестре символов. При каждом вызове данного метода проверяется, имеется ли символ с указанным ключом в реестре. После этого либо возвращается найденный символ, либо создается новый.',
  },
  {
    question: "const sym1 = new Symbol('one')\nconsole.log(sym1)",
    answers: ['Error', 'one', "Symbol('one')", 'Symbol'],
    correctAnswerIndex: 0,
    explanation:
      '`Symbol` - это обычная функция, а не конструктор, в отличие, например, от `Number` или `String`. Поэтому при попытке использования его с ключевым словом `new` выбрасывается исключение `TypeError: Symbol is not a constructor` (`Symbol` не является конструктором).',
  },
  {
    question:
      'let myNumber = 100\nlet myString = "100"\n\nif (!typeof myNumber === "string") {\n  console.log("It is not a string!")\n} else {\n  console.log("It is a string!")\n}\n\nif (!typeof myString === "number"){\n  console.log("It is not a number!")\n} else {\n  console.log("It is a number!")\n}',
    answers: [
      'Error',
      'It is not a string! и It is not a number!',
      'It is not a string! и It is a number!',
      'It is a string! и It is a number!',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Оператор `!` приводит значение к логическому типу и инвертирует его. Поскольку выражения `typeof myNumber` и `typeof myString` истинные, в обоих случаях возвращается `false`. Далее выполняются блоки `else`.',
  },
  {
    question:
      "console.log(JSON.stringify({ myArray: ['one', undefined, function() {}, Symbol('')] }))\nconsole.log(JSON.stringify({ [Symbol.for('one')]: 'one' }, [Symbol.for('one')]))",
    answers: [
      '{ "myArray":[\'one\', undefined, {}, Symbol] } и {}',
      '{ "myArray":[\'one\', null, null, null] } и {}',
      "{ \"myArray\":['one', null, null, null] } и \"{ [Symbol.for('one')]: 'one' }, [Symbol.for('one')]\"",
      "{ \"myArray\":['one', undefined, function(){}, Symbol('')] } и {}",
    ],
    correctAnswerIndex: 1,
    explanation:
      '`undefined`, функции и символы не являются валидными `JSON-значениями`. Такие значения не включаются в объект и конвертируются (преобразуются) в `null`. Поэтому возвращается `null, null, null`. Глобальные символы игнорируются, поэтому возвращается пустой объект (`{}`).',
  },
  {
    question:
      'class A {\n  constructor() {\n    console.log(new.target.name)\n  }\n}\n\nclass B extends A { constructor() { super() } }\n\nnew A()\nnew B()',
    answers: ['A A', 'A B', 'B B', 'Error'],
    correctAnswerIndex: 1,
    explanation:
      '`new.target` ссылается на конструктор (указывает на класс), который вызывается с помощью ключевого слова `new`. Это также справедливо для конструктора родительского класса, вызываемого из подкласса.',
  },
  {
    question:
      'const { a: x = 10, b: y = 20 } = { a: 30 }\n\nconsole.log(x)\nconsole.log(y)',
    answers: ['30 20', '10 20', '10 undefined', '30 undefined'],
    correctAnswerIndex: 0,
    explanation:
      'Для свойств объекта характерно следующее:\n1. Значение свойства (`30`) может быть извлечено и присвоено переменной (`x`).\n2. Свойству присваивается значение по умолчанию (`20`), когда извлекаемым значением является `undefined` (`y`).',
  },
  {
    question:
      'function area({ length = 10, width = 20 }) {\n  console.log(length * width)\n}\n\narea()',
    answers: ['200', 'Error', 'undefined', '0'],
    correctAnswerIndex: 1,
    explanation:
      "Здесь мы имеем дело с деструктуризацией объекта. Если опустить правую часть выражения, функция при вызове попытается найти хотя бы один аргумент. Если ей не удастся этого сделать, будет выброшено исключение `TypeError: Cannot read property 'length' of undefined` (невозможно прочитать свойство `length` неопределенного значения). Решить данную проблему можно следующими способами:\n1. Передать функции пустой объект (`{}`) в качестве аргумента:\n\nfunction area ({ length = 10, width = 20 }) { console.log(length * width) }\narea({}) // 200\n\n2. Присвоить пустой объект в качестве значения аргумента по умолчанию:\n\nfunction area ({ length = 10, width = 20 } = {}) { console.log(length * width) }\narea() // 200\n",
  },
  {
    question:
      "const props = [\n  { id: 1, name: 'John'},\n  { id: 2, name: 'Jane'},\n  { id: 3, name: 'Bob'}\n]\n\nconst [, , { name }] = props\nconsole.log(name)",
    answers: ['Bob', 'Error', 'undefined', 'John'],
    correctAnswerIndex: 0,
    explanation:
      'Деструктуризацию массива и объекта можно комбинировать. В данном случае переменной `name` присваивается значение соответствующего свойства третьего элемента массива `props`.',
  },
  {
    question:
      "function checkType(num = 1) {\n  console.log(typeof num)\n}\n\ncheckType()\ncheckType(undefined)\ncheckType('')\ncheckType(null)",
    answers: [
      'number undefined string object',
      'undefined undefined string object',
      'number number string object',
      'number number number number',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Если функции не передается значение или передается `undefined`, аргумент принимает значение по умолчанию (`1`). Другие ложные значения (`""` и `null`) присваиваются аргументу.\nПервые два вызова функции `checkType` возвращают `number`, поскольку значением аргумента является `1`.\nТипом пустой строки (`""`) является `string`, а типом `null` - `object`.',
  },
  {
    question:
      "function add(item, items = []) {\n  items.push(item)\n  return items\n}\n\nconsole.log(add('Orange'))\nconsole.log(add('Apple'))",
    answers: [
      "['Orange'] и ['Orange', 'Apple']",
      "['Orange'] и ['Apple']",
      '[]',
      'undefined',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Аргументу `items` при каждом вызове функции `add` присваивается пустой массив (значение по умолчанию), который возвращается с помещенным в него значением аргумента `item`.',
  },
  {
    question:
      "function greet(greeting, name, message = greeting + ' ' + name) {\n  console.log([greeting, name, message])\n}\n\ngreet('Hello', 'John')\ngreet('Hello', 'John', 'Good morning!')",
    answers: [
      'Error',
      "['Hello', 'John', 'Hello John'] и ['Hello', 'John', 'Good morning!']",
      "['Hello', 'John', 'Hello John'] и ['Hello', 'John', 'Hello John']",
      'undefined',
    ],
    correctAnswerIndex: 1,
    explanation:
      "При первом вызове функции `greet` аргументу `message` присваивается значение по умолчанию (`greeting + ' ' + name`). При втором вызове данному аргументу присваивается переданное значение (`Good morning!`).",
  },
  {
    question:
      "function outer(f = inner()) {\n  function inner() { return 'Inner' }\n}\nconsole.log(outer())",
    answers: ['Error', 'Inner', 'Inner Inner', 'undefined'],
    correctAnswerIndex: 0,
    explanation:
      "Функции и переменные, объявленные в теле функции, не могут использоваться в качестве значений по умолчанию, поэтому выбрасывается исключение `ReferenceError: inner is not defined` (переменная `inner` не определена). Для того, чтобы сделать функцию работоспособной, ее можно переписать так:\n\nfunction outer (f) { function inner () { return 'Inner' }; const fun = f || inner(); return fun }\nconsole.log(outer()) // Inner\nconsole.log(outer('Outer')) // Outer\nИли так:\nconst outer = (msg = 'Inner') => msg\nconsole.log(outer()) // Inner\nconsole.log(outer('Outer')) // Outer\n",
  },
  {
    question:
      'function myFun(x, y, ...args) {\n  console.log(args)\n}\n\nmyFun(1, 2, 3, 4, 5)\nmyFun(1, 2)',
    answers: [
      '[3, 4, 5] и undefined',
      'Error',
      '[3, 4, 5] и []',
      '[3, 4, 5] и [undefined]',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Оператор rest (прочие параметры, `...`) возвращает массив с переданными функции неименованными аргументами или пустой массив в случае, когда такие аргументы отсутствуют.',
  },
  {
    question:
      "const obj = {'key': 'value'}\nconst array = [...obj]\nconsole.log(array)",
    answers: ["['key', 'value']", 'Error', '[]', "['key']"],
    correctAnswerIndex: 1,
    explanation:
      'Оператор spread (распространения или распаковки, `...`) применяется только к итерируемым (перебираемым) сущностям. Объекты таковыми не являются. Поэтому выбрасывается исключение `TypeError: object is not iterable` (объекты не являются итерируемыми сущностями).',
  },
  {
    question:
      'function* myGenFunc() {\n  yield 1\n  yield 2\n  yield 3\n}\nvar myGenObj = new myGenFunc\nconsole.log(myGenObj.next().value)',
    answers: ['1', 'undefined', '2', 'Error'],
    correctAnswerIndex: 3,
    explanation:
      'Генераторы (функции со специальным символом `*` после названия) не могут использоваться в качестве конструкторов, т.е. с ключевым словом `new`, поэтому выбрасывается исключение `TypeError: myGenFunc is not a constructor` (`myGenFunc` не является конструктором).',
  },
  {
    question:
      'function* yieldAndReturn() {\n  yield 1\n  return 2\n  yield 3\n}\n\nvar myGenObj = yieldAndReturn()\nconsole.log(myGenObj.next())\nconsole.log(myGenObj.next())\nconsole.log(myGenObj.next())',
    answers: [
      '{ value: 1, done: false }  { value: 2, done: true }  { value: undefined, done: true }',
      '{ value: 1, done: false }  { value: 2, done: false }  { value: undefined, done: true }',
      '{ value: 1, done: false }  { value: 2, done: true }  { value: 3, done: true }',
      '{ value: 1, done: false }  { value: 2, done: false }  { value: 3, done: true }',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Инструкция `return` в генераторе (функция со специальным символом `*` после названия) останавливает его выполнение. Возвращаемое значение `2` присваивается свойству `value`, а значением свойства `done` становится `true`. После завершения работы генератора вызов метода `next` возвращает `{ value: undefined, done: true }`.',
  },
  {
    question:
      'const myGenerator = (function *(){\n  yield 1\n  yield 2\n  yield 3\n})()\n\nfor (const value of myGenerator) {\n  console.log(value)\n  break\n}\n\nfor (const value of myGenerator) {\n  console.log(value)\n}',
    answers: ['1 2 3 и 1 2 3', '1 2 3 и 4 5 6', '1 1', '1'],
    correctAnswerIndex: 3,
    explanation:
      'Генератор (функция со специальным символом `*` после названия) не может использоваться после закрытия итератора. В первом цикле мы с помощью оператора `break` останавливаем выполнение генератора со значением `1`. Повторный перебор генератора невозможен, поэтому второй `console.log()` ничего не выводит в консоль.',
  },
  {
    question:
      'const squareObj = new Square(10)\nconsole.log(squareObj.area)\n\nclass Square {\n  constructor(length) {\n    this.length = length\n  }\n\n  get area() {\n    return this.length * this.length\n  }\n\n  set area(value) {\n    this.area = value\n  }\n}',
    answers: ['100', 'Error', '10', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      'В отличие от объявлений функций (но не функциональных выражений), объявления классов не поднимаются в начало области видимости. Это также справедливо для выражений класса. Поэтому использовать класс можно только после его объявления, в противном случае, выбрасывается исключение `ReferenceError: Square is not defined` (переменная `Square` не определена).',
  },
  {
    question:
      'function Person() { }\n\nPerson.prototype.walk = function() {\n  return this\n}\n\nPerson.run = function() {\n  return this\n}\n\nlet user = new Person()\nlet walk = user.walk\nconsole.log(walk())\n\nlet run = Person.run\nconsole.log(run())',
    answers: ['undefined undefined', 'Person Person', 'Error', 'Window Window'],
    correctAnswerIndex: 3,
    explanation:
      'Когда обычный метод или метод прототипа вызывается без передачи ему значения `this`, метод возвращает значение `this` по умолчанию. В данном случае таким значением является глобальный объект (`window` в браузере, `global` в `Node.js`).',
  },
  {
    question:
      "class Vehicle {\n  constructor(name) {\n    this.name = name\n  }\n\n  start() {\n    console.log(`${this.name} vehicle started`)\n  }\n}\n\nclass Car extends Vehicle {\n  start() {\n    console.log(`${this.name} car started`)\n    super.start()\n  }\n}\n\nconst car = new Car('BMW')\nconsole.log(car.start())",
    answers: [
      'Error',
      'BMW vehicle started и BMW car started',
      'BMW car started и BMW vehicle started',
      'BMW car started и BMW car started',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Ключевое слово `super` используется, в том числе, для вызова методов родительского класса. В отличие от других языков программирования, в `JavaScript` вызов `super()` не обязательно должен быть первой инструкцией.',
  },
  {
    question: "const user = {'age': 30}\nuser.age = 25\nconsole.log(user.age)",
    answers: ['30', '25', 'Error', 'undefined'],
    correctAnswerIndex: 1,
    explanation:
      "Мы используем ключевое слово `const` для объявления переменной `user`, т.е. делаем ее константой (неизменяемой или неизменной). Однако иммутабельность переменной-объекта, не распространяется на ее свойства. Другими словами, свойства такого объекта можно изменять. Но если мы попытаемся присвоить переменной `user` новое значение (`user = {'age': 25}`), будет выброшено исключение `TypeError: Assignment to constant variable`. Для обеспечения иммутабельности свойств объекта можно использовать метод `freeze`.\nМы используем ключевое слово `const` для объявления переменной `user`, т.е. делаем ее константой (неизменяемой или неизменной). Однако иммутабельность переменной-объекта, не распространяется на ее свойства. Другими словами, свойства такого объекта можно изменять. Но если мы попытаемся присвоить переменной `user` новое значение (`user = {'age': 25}`), будет выброшено исключение `TypeError: Assignment to constant variable` (попытка присвоения значения константной переменной). Для обеспечения иммутабельности свойств объекта можно использовать `Object.freeze()`.",
  },
  {
    question:
      'function a(x) {\n  x++\n  return function () {\n    console.log(++x)\n  }\n}\n\na(1)()\na(1)()\na(1)()\n\nlet x = a(1)\nx()\nx()\nx()',
    answers: [
      '1 2 3 и 1 2 3',
      '3 3 3 и 3 4 5',
      '3 3 3 и 1 2 3',
      '1 2 3 и 3 3 3',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Здесь мы имеем дело с замыканием. Замыкания позволяют нам создавать статические функции, которым доступны переменные из внешнего окружения. Другими словами, замыкание имеет доступ к глобальной области видимости, области видимости родительской функции и собственной области видимости.\nМы получаем `3 3 3` и `3 4 5`, поскольку сначала просто вызываем функцию `a`. Она работает как обычная функция. Затем мы объявляем переменную `x` и присваиваем ей значение функции `a(1)`, вот почему мы получаем `3 4 5` вместо `3 3 3`.',
  },
  {
    question:
      "function Name(a, b) {\n  this.a = a\n  this.b = b\n}\n\nconst me = Name('John', 'Smith')\n\nconsole.log(!(a.length - window.a.length))",
    answers: ['undefined', 'NaN', 'true', 'false'],
    correctAnswerIndex: 2,
    explanation:
      'Мы получаем `true`. Обратите внимание, что при создании объекта с помощью функции-конструктора `Name` мы не использовали ключевое слово `new`. Из-за этого переменная `a` стала глобальной и получила значение `John`. В действительности, глобальные переменные - это свойства глобального объекта (`window` в браузере или `global` в `Node.js`). Поэтому выражение `a.length - window.a.length` возвращает `0`, а `!0` возвращает `true`.',
  },
  {
    question:
      'const x = function (...x) {\n  let k = (typeof x).length\n  let y = () => "freetut".length\n  let z = { y: y }\n\n  return k - z.y()\n}\n\nconsole.log(Boolean(x()))',
    answers: ['true', '1', '-1', 'false'],
    correctAnswerIndex: 0,
    explanation:
      'Spread-оператор `...x` позволяет получить параметры функции в виде массива. Выражение `typeof array` возвращает `object`. Длина строки `object` равняется `6`. `z.y()` возвращает длину строки `freetut`, т.е. `7`. Функциональное выражение `x` возвращает `-1`, которое после преобразования в логический тип становится `true`. Обратите внимание, что `Boolean(0)` вернет `false`.',
  },
  {
    question:
      '(function js(x) {\n  const y = (j) => j * x\n\n  console.log(y(s()))\n\n  function s() {\n    return j()\n  }\n\n  function j() {\n    return x ** x\n  }\n})(3)',
    answers: ['undefined', '18', '81', '12'],
    correctAnswerIndex: 2,
    explanation:
      'Функция `js` выполняется автоматически, поскольку является IIFE (Immediately Invoked Function Expression - немедленно вызываемым функциональным выражением). Аргумент `x` передается `js()` со значением `3`. Значение, возвращаемое функцией `y(s())`, означает вызов трех функций: `y`, `s` и `j`, поскольку `s()` возвращает `j()`. `j()` возвращает `3 ^ 3`, или `27`, поэтому `s()` возвращает `27`. `y(s())` означает `y(27)`, что возвращает `27 * 3`, или `81`. Обратите внимание, что мы можем вызывать функции до их объявления, но это не работает с функциональными выражениями.',
  },
  {
    question:
      'var tip = 100\n\n;(function () {\n  console.log("I have $" + husband())\n\n  function wife() {\n    return tip * 2\n  }\n\n  function husband() {\n    return wife() / 2\n  }\n\n  var tip = 10\n})()',
    answers: ['I have $10', 'I have $100', 'I have $50', 'I have $NaN'],
    correctAnswerIndex: 3,
    explanation:
      'Здесь мы имеем дело с IIFE (Immediately Invoked Function Expression - немедленно вызываемым функциональным выражением). IIFE выполняются автоматически. Последовательность здесь следующая: `husband()` возвращает `wife()`, а `wife()` возвращает `tip * 2`. Можно подумать, что `tip` равняется `100`, поскольку мы объявили ее с помощью ключевого слова `var` и она стала глобальной. Однако на самом деле ее значением является `undefined`, поскольку мы объявляем переменную `tip` со значением `10` внутри функции. Поскольку переменная `tip` поднимается в начало области видимости со значением `undefined`, правильным ответом является `D`. `undefined` возвращает `NaN`, когда мы пытаемся разделить его на `2` или умножить на `2`. Если убрать `var tip = 10` в конце функции, правильным ответом будет `B`.',
  },
  {
    question:
      'const js = { language: "loosely type", label: "difficult" }\n\nconst edu = { ...js, level: "PhD" }\n\nconst newbie = edu\n\ndelete edu.language\n\nconsole.log(Object.keys(newbie).length)',
    answers: ['2', '3', '4', '5'],
    correctAnswerIndex: 0,
    explanation:
      'Данная задача посвящена spread-оператору (`...`). Этот оператор позволяет получать параметры функции, копировать или объединять объекты и массивы. В переменной `edu` мы используем оператор `...` для копирования объекта `js` и добавления к нему свойства `level`. Это также работает с массивами. Затем мы объявляем другую переменную с именем `newbie`. Важное замечание: обе переменных указывают на одно и то же место в памяти. Это называется передачей значения по ссылке. После удаления свойства `language` посредством `delete edu.language`, длина массива ключей обоих объектов становится равной `2`.',
  },
  {
    question:
      'var candidate = {\n  name: "John",\n  age: 30\n}\n\nvar job = {\n  frontend: "Vue or React",\n  backend: "Nodejs and Express",\n  city: "Ekaterinburg"\n}\n\nclass Combine {\n  static get() {\n    return Object.assign(candidate, job)\n  }\n\n  static count() {\n    return Object.keys(this.get()).length\n  }\n}\n\nconsole.log(Combine.count())',
    answers: ['5', '6', '7', '8'],
    correctAnswerIndex: 0,
    explanation:
      '`Object.assign(candidate, job)` объединяет `candidate` и `job` в один объект. Затем `Object.keys()` возвращает массив ключей объекта. Обратите внимание, что методы `get` и `count` определены как статические, поэтому их можно вызывать с помощью `Class.staticMethodName()`. Результирующий объект содержит `5` ключей.',
  },
  {
    question:
      'var x = 1\n\n;(() => {\n  x += 1\n  ++x\n})()\n\n;((y) => {\n  x += y\n  x = x % y\n})(2)\n\n;(() => (x += x))()\n\n;(() => (x *= x))()\n\nconsole.log(x)',
    answers: ['4', '50', '2', '10'],
    correctAnswerIndex: 0,
    explanation:
      'Начальное значение переменной `x` равняется `1`. В первом IIFE (Immediately Invoked Function Expression - немедленно вызываемом функциональном выражении) значение `x` увеличивается до `3`. Во втором IIFE выражение `x + y (3 + 2)` возвращает `5`, а выражение `x % y (5 % 2)` возвращает `1`. В третьем и четвертом IIFE мы получаем `2` (`1 + 1`) и `4` (`2 * 2`), соответственно.',
  },
  {
    question:
      'let x = {}\nlet y = {}\nlet z = x\n\nconsole.log(x == y)\nconsole.log(x === y)\nconsole.log(x == z)\nconsole.log(x === z)',
    answers: [
      'true true true true',
      'false false false false',
      'true true false false',
      'false false true true',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Технически `x` и `y` имеют одинаковые значения. Обе переменные являются пустыми объектами. Однако объекты сравниваются не по значениям. `z` и `x` являются объектами, ссылающимися на одно и то же место в памяти. В `JavaScript` объекты передаются по ссылкам. Поэтому при сравнении `x` и `z` возвращается `true`.',
  },
  {
    question: 'String.prototype.lengthy = () => {\n  console.log("hello")\n}\n\nlet x = { name: "John" }\n\ndelete x\n\nx.name.lengthy()',
    answers: ['John', 'hello', 'undefined', 'Error'],
    correctAnswerIndex: 1,
    explanation:
      'С помощью `String.prototype.someThing = function() {}` можно определить новый встроенный метод объекта `String`. Мы можем сделать то же самое с `Array`, `Object` или `FunctionName`, где `FunctionName` - это пользовательская функция. Несложно понять, что `string".lengthy` возвращает `hello`. Оператор `delete` удаляет свойство объекта, а не сам объект. Поэтому мы получаем `hello`, а не `ReferenceError`. Обратите внимание, что если мы объявим объект без ключевых слов `let`, `const` или `var`, то получим свойство глобальный объект (`window` в браузере, `global` в `Node.js`). В этом случае выражение `delete objectName` вернет `true`.',
  },
  {
    question:
      'let x = {}\n\nx.__proto__.hi = 10\n\nObject.prototype.hi = ++x.hi\n\nconsole.log(x.hi + Object.keys(x).length)',
    answers: ['10', '11', '12', 'NaN'],
    correctAnswerIndex: 2,
    explanation:
      'Начальным значением переменной `x` является пустой объект (`{}`). Затем мы добавляем к нему свойство `hi` со значением `10` с помощью `x.__proto__.hi`. Обратите внимание, что это эквивалентно `Object.prototype.hi = 10`, поэтому мы добавляем свойство `hi` к прототипу пустого объекта - `Object`. Это означает, что в дальнейшем любой объект будет наследовать данное свойство. Свойство `hi` становится распределенным (совместным, shared). Если мы объявим новый объект, скажем, `let y = {}`, переменная `y` унаследует свойство `hi` от `Object`. Сравнение `x.__proto__ === Object.prototype` вернет `true`. После этого, мы перезаписываем значение свойства `hi` новым значением `11`. Получаем `1` (`x` имеет одно свойство) + `11` (значение свойства `hi`), что равняется `12`.',
  },
  {
    question:
      'const array = (a) => {\n  let length = a.length\n  delete a[length - 1]\n  return a.length\n}\n\nconsole.log(array([1, 2, 3, 4]))\n\nconst object = (obj) => {\n  let key = Object.keys(obj)\n  let length = key.length\n  delete obj[key[length - 1]]\n\n  return Object.keys(obj).length\n}\n\nconsole.log(object({ 1: 2, 2: 3, 3: 4, 4: 5 }))\n\nconst setPropNull = (obj) => {\n  let key = Object.keys(obj)\n  let length = key.length\n  obj[key[length - 1]] = null\n\n  return Object.keys(obj).length\n}\n\nconsole.log(setPropNull({ 1: 2, 2: 3, 3: 4, 4: 5 }))',
    answers: ['3 3 3', '4 4 4', '4 3 4', '3 4 3'],
    correctAnswerIndex: 2,
    explanation:
      'Данная задача показывает, как работает оператор `delete`. Выражения `delete someObject` и `delete someArray` возвращают `false` (ничего не делают). Выражение `delete someObject.someProperty` удаляет указанное свойство объекта. В случае с массивом, выражение `delete someArray[keyNumber]` удаляет только значение указанного индекса, сам индекс остается и его новым значением становится `undefined`. По этой причине первый `console.log()` выводит `4` (массив содержит `4` элемента, последний имеет значение `undefined`), а второй - `3` (количество оставшихся свойств объекта). Последний `console.log()` выводит `4`, поскольку присвоение свойству объекта значения `null` или `undefined` не удаляет это свойство, ключ остается. Поэтому длина массива ключей объекта сохраняется.',
  },
  {
    question:
      'var a = [1, 2, 3]\nvar b = [1, 2, 3]\n\nvar c = [1, 2, 3]\nvar d = c\n\nvar e = [1, 2, 3]\nvar f = e.slice()\n\nconsole.log(a === b)\nconsole.log(c === d)\nconsole.log(e === f)',
    answers: [
      'true true true',
      'false false true',
      'true true false',
      'false true false',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Сравнение `a` и `b` возвращает `false`, поскольку эти переменные ссылаются на разные места в памяти, несмотря на то, что их значения являются одинаковыми. В `JavaScript`, в случае с объектами, значения передаются по ссылке. Во втором случае `d` является копией `c`, поэтому они ссылаются на одну и ту же область памяти. Любые изменения в `c` отражаются на `d` (и наоборот). Третий пример демонстирует способ копирования массива с помощью метода `slice`. `f` является копией `e`, но они ссылаются на разные места в памяти. Поэтому их сравнение возвращает `false`.',
  },
  {
    question:
      'var languages = {\n  name: ["javascript", "java", "python", "php", { name: "feature" }],\n  feature: "awesome"\n}\n\nlet flag = languages.hasOwnProperty(\n  Object.values(languages)[0][4].name\n)\n\n;(() => {\n  if (flag !== false) {\n    console.log(\n      Object.getOwnPropertyNames(languages)[0].length <<\n      Object.keys(languages)[0].length\n    )\n  } else {\n    console.log(\n      Object.getOwnPropertyNames(languages)[1].length <<\n      Object.keys(languages)[1].length\n    )\n  }\n})()',
    answers: ['8', 'NaN', '64', '12'],
    correctAnswerIndex: 2,
    explanation:
      "Данная задача является довольно сложной, поскольку в ней встречается несколько встроенных методов для работы с объектами. Например, методы `keys` и `getOwnPropertyNames` возвращают массивы ключей (названий свойств) объекта: первый - только перечисляемые, второй - также не перечисляемые. `Object.values()` и `Object.keys()` возвращают значения и ключи объекта, соответственно. `Object.hasOwnProperty('propertyName')` возвращает логическое значение в зависимости от того, существует указанное свойство в объекте или нет. Переменная `language` имеет значение `true`, поскольку `Object.values(languages)[0][4].name` возвращает `feature`, которое является свойством объекта. Наконец, мы получаем `4 << 4`, что возвращает побитовое значение, эквивалентное `4 * 2 ^ 4` или `4 * 16`, или `64`.",
  },
  {
    question:
      'var person = {}\n\nObject.defineProperties(person, {\n  name: {\n    value: "John",\n    enumerable: true,\n  },\n  job: {\n    value: "developer",\n    enumerable: true,\n  },\n  studying: {\n    value: "PhD",\n    enumerable: true,\n  },\n  money: {\n    value: "USD",\n    enumerable: false,\n  }\n})\n\nclass Evaluate {\n  static checkFlag(obj) {\n    return Object.getOwnPropertyNames(obj) > Object.keys(obj)\n      ? Object.getOwnPropertyNames(obj)\n      : Object.keys(obj)\n  }\n}\n\nconst flag = Evaluate.checkFlag(person)\n\nconsole.log(flag.length)',
    answers: ['1', '2', '3', '4'],
    correctAnswerIndex: 3,
    explanation:
      '`Object.keys(obj)` почти идентичен `Object.getOwnPropertyNames(obj)`, за исключением того, что последний, кроме перечисляемых, возвращает также неперечисляемые ключи объекта. По умолчанию все свойства создаваемого объекта являются перечисляемыми. Мы можем сделать их неперечисляемыми с помощью `Object.defineProperty()` или `Object.defineProperties()` (настройка `enumerable: false`). Поэтому `Object.keys(person)` возвращает `3`, а `Object.getOwnPropertyNames(person)` - `4`. Тернарный оператор возвращает `4`.',
  },
  {
    question:
      'const id = 10\n\nconst getID = (...id) => {\n  id(id)\n\n  function id(id) {\n    console.log(typeof id)\n  }\n}\n\ngetID(id)',
    answers: ['Error', '10', 'undefined', 'function'],
    correctAnswerIndex: 3,
    explanation:
      'Когда мы определяем одну функцию внутри другой, то получаем замыкание (closure). Обратите внимание, если функция обычная (а не функциональное выражение), она поднимается в начало области видимости. Мы видим несколько `id` в коде, но некоторые из них ничего не делают. Результатом выполнения кода является `typeof id`, т.е. `function`. Таким образом, `id` в рассматриваемом примере является функцией.',
  },
  {
    question:
      'var book1 = {\n  name: "Name of the Rose",\n  getName: function () {\n    console.log(this.name)\n  }\n}\n\nvar book2 = {\n  name: { value: "Harry Potter" }\n}\n\nvar bookCollection = Object.create(book1, book2)\n\nbookCollection.getName()',
    answers: ['Harry Potter', 'Name of the rose', 'Error', 'Object object'],
    correctAnswerIndex: 0,
    explanation:
      '`Object.create()` позволяет создавать одни объекты на основе других. Если мы не передадим второй параметр - `book2`, в данном случае - свойство `name` объекта `bookCollection` будет иметь значение `Name of the Rose`, унаследованное от `book1`. Это означает, что мы можем добавлять новые свойства создаваемому с помощью `Object.create()` объекту. `bookCollection` имеет собственное свойство `name` и одноименное свойство, унаследованное от `book1`. Собственные свойства объекта имеют приоритет над унаследованными. Поэтому мы получаем `Harry Potter`.',
  },
  {
    question:
      '(() => {\n  const a = Object.create({})\n\n  const b = Object.create(null)\n\n  let f1 = a.hasOwnProperty("toString")\n\n  let f2 = "toString" in b\n\n  let result =\n    f1 === false && f2 === false\n      ? console.log((typeof a.toString()).length)\n      : console.log(b.toString())\n})()',
    answers: ['Error', 'undefined', '0', '6'],
    correctAnswerIndex: 3,
    explanation:
      "Объекты `a` и `b` создаются с помощью `Object.create()`. Разница между ними состоит в том, что `a` наследует прототип `Object`, а `b` является совершенно пустым, поскольку мы передали аргумент `null` методу `create`. `hasOwnProperty('toString')` в обоих случаях возвращает `false`, поскольку в объектах метод `toString` не определен. Однако данный метод существует в объекте `a` как унаследованный от `Object`. `f1` и `f2` возвращают `false`. Обратите внимание, что для проверки наличия свойства в объекте мы используем `Object.hasOwnProperty('key')` и `('key' in object)`. Они отличаются тем, что первый возвращает только собственные свойства объекта, а второй - также унаследованные. `typeof a.toString()` возвращает `string`, длина которой равняется `6`.",
  },
  {
    question:
      'let promise = new Promise((rs, rj) => {\n  setTimeout(() => rs(4), 0)\n\n  Promise.resolve(console.log(3))\n\n  console.log(2)\n})\n\npromise\n  .then((rs) => {\n    console.log(rs ? rs ** rs : rs)\n    return rs\n  })\n  .then((rs) => console.log(rs === 256 ? rs : rs * rs))',
    answers: ['3 2 256 256', '3 2 256 16', '256 16 3 2', '16 256 3 2'],
    correctAnswerIndex: 1,
    explanation:
      'Мы определяем промис с помощью ключевого слова `let` и вызываем его. `setTimeout` - это асинхронная функция, которая выполняется последней, даже при нулевой задержке: `setTimeout(() => rs(4), 0)`. Хотя выражение `Promise.resolve(console.log(3))` также возвращает промис, он относится к микрозадачам (microtasks), которые имеет приоритет над макрозадачами (macrotasks), такими как `setTimeout()`. В первом `then()` мы получаем `4 ^ 4`, или `256`, во втором - `4 * 4`, или `16`. Обратите внимание, что `return rs` возвращает первоначальное значение.',
  },
  {
    question:
      'async function f() {\n  let promise = new Promise((resolve, reject) => {\n    setTimeout(() => resolve("done"), 0)\n  })\n\n  setTimeout(() => console.log("world"), 0)\n\n  console.log(await promise)\n\n  console.log("hello")\n}\n\nf(setTimeout(() => console.log("timer"), 0))',
    answers: [
      'Error',
      'done hello world',
      'hello done world',
      'timer done hello world',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Хотя мы не определяем параметров в функции `f`, мы передаем ей `setTimeout(() => console.log("timer"), 0)` при вызове. Поэтому сначала в консоль выводится `timer`. Переменная `promise`, возвращающая разрешенный промис, вызывается с помощью ключевого слова `await`. `JavaScript` приостанавливает выполнение кода на строке `console.log(await promise)` до разрешения промиса. Вот почему следующим мы получаем `done`. Почему вторым значением, выведенным в консоль, является `done`, а не `world` или `hello`? Поскольку `JavaScript` ставит выполнение кода на паузу, когда встречает ключевое слово `await`, мы не можем получить `hello` до разрешения промиса (обратите внимание, что `setTimeout()` всегда выполняется последней, поскольку является асинхронной (макро)задачей, поэтому `setTimeout(() => console.log("world"), 0))` выполняется в самом конце). Здесь мы наблюдаем разницу в работе ключевого слова `await` перед асинхронным оператором (в данном случае мы использовали `setTimeout()` для примера) и вызовом функции/оператора без него.',
  },
  {
    question:
      'class MySort {\n  constructor(object) {\n    this.object = object\n  }\n\n  getSort() {\n    return Object.entries(this.object)[0][1].sort()[\n      Object.values(this.object).length\n    ]\n  }\n}\n\nconst object = {\n  month: ["August", "September", "January", "December"],\n}\n\nconst sortMe = new MySort(object)\n\nconsole.log(sortMe.getSort())',
    answers: ['August', 'September', 'January', 'December'],
    correctAnswerIndex: 3,
    explanation:
      '`Object.entries()` возвращает массив, состоящий из ключей и значений объекта в виде массивов (подмассивов), `Object.values()` - массив значений объекта, а `Object.keys()` - массив ключей. Таким образом, `Object.entries(object)` в рассматриваемом примере возвращает вложенный массив с одним элементом, значения которого вложены в другой массив -  `[["month", ["August", "September", "January", "December"]]]`. По этой причине `Object.entries(this.object)[0][1].sort()` на самом деле сортирует значения массива и возвращает их в новом порядке: `August -> December -> January -> September`. Следовательно, когда мы пытаемся получить элемент с индексом `[Object.values(this.object).length]`, то получаем `December`, поскольку `[Object.values(this.object).length]` возвращает `1` (длина массива, возвращенного `Object.values()`).',
  },
  {
    question:
      'const flag = [] !== !!!!![]\n\nlet f = () => {}\n\nconsole.log((typeof f()).length + flag.toString().length)',
    answers: ['NaN', '12', '13', '14'],
    correctAnswerIndex: 2,
    explanation:
      'Сравнение двух массивов или объектов в `JavaScript` всегда возвращает `false`, поскольку объекты передаются по ссылке, в отличие от примитивов, таких как строка, число или логическое значение. Вот почему сравнение `[]` и `[]` с помощью `==` или `===` возвращает `false`. Сложная часть рассматриваемого примера - это `!==!!!!!`, что эквивалентно `!==`, так что на самом деле здесь нет ничего сложного. Таким образом, значением переменной `flag` является `true`. В функциональном выражении `f` мы используем стрелочную функцию, но `{}` - это часть функции, а не объект. Для того, чтобы вернуть объект, выражение следует переписать так: `let f = () => ({})` или использовать обычную функцию. С помощью ключевого слова `return` мы легко можем перехватить содержимое функции, когда используем обычный способ ее определения. Поэтому `typeof f()` возвращает `undefined`, а не `object`. Затем мы получаем `9` (длина `undefined`) + `4` (длина строки `true`), что равняется `13`.',
  },
  {
    question:
      '(function (a, b, c) {\n  arguments[2] = (typeof arguments).length\n  c > 10 ? console.log(c) : console.log(++c)\n})(1, 2, 3)',
    answers: ['4', '5', '6', '7'],
    correctAnswerIndex: 3,
    explanation:
      'Здесь мы имеем дело с самовызываемой функцией (IIFE) с тремя параметрами. Обратите внимание, что `arguments` внутри функции возвращает массивоподобный объект, состоящий из аргументов, переданных функции при вызове. Когда мы присваиваем значение этому объекту (или любому его элементу), функция будет использовать это значение, а не значение переданного при ее вызове аргумента. Поэтому значением `(typeof arguments).length` будет `6`, а не `3`. `6` меньше `10`, поэтому мы получаем `console.log(++c)` или `7`. Обратите внимание, что `arguments` недоступна в стрелочных функциях. `ES6` рекомендует использовать rest-оператор (`...`) в качестве альтернативы `arguments` в стрелочных функциях, который возвращает настойщий массив. Таким массивом можно манипулировать с помощью методов `map`, `filter`, `reduce` и др.',
  },
  {
    question:
      'class Calculator {\n  constructor(a, b) {\n    this.a = a\n    this.b = b\n  }\n  static getFlag() {\n    return new Array(this.a).length == new Array(this.b)\n      .toString().length\n  }\n\n  getValue() {\n    return Calculator.getFlag() ? typeof this.a : typeof new Number(this.b)\n  }\n}\n\nconst me = new Calculator(5, 5)\n\nconsole.log(me.getValue())',
    answers: ['NaN', 'string', 'object', 'number'],
    correctAnswerIndex: 2,
    explanation:
      'У нас имеется класс `Calculator`. При создании нового экземпляра, мы передаем ему два аргумента: `a` и `b`. Эти аргументы имеют одинаковые значения, но `new Array(this.a).length` сильно отличается от `new Array(this.b).toString().length`, поскольку последний возвращает длину строки `,,,,`, или `4`, а первый - длину массива, или `5`. По этой причине `getFlags()` возвращает `false`. В `getValue()` мы получаем выражение `typeof new Number(this.b)`, что возвращает `object`. Это немного отличается от выражения `typeof b`, которое возвращает `number`.',
  },
  {
    question:
      'var name = "John"\n\nconst obj = {\n  name: "Jane",\n\n  callMe: function () {\n    return this.name\n  }\n}\n\nlet me = obj.callMe\n\nlet she = obj.callMe.bind(obj)\n\nlet result = me() === obj.callMe() ? she() : `${me()} ${she()}`\n\nconsole.log(result)',
    answers: ['undefined', 'John', 'Jane', 'John Jane'],
    correctAnswerIndex: 3,
    explanation:
      'Данный вопрос посвящен ключевому слову `this`. У нас есть простой объект, содержащий один метод и одно свойство. Во-первых, важно понимать, что `let me = obj.callMe` и последующий вызов `me()` существенно отличаются от прямого вызова `obj.callMe()`. Если мы присваиваем переменной метод, объявленный внутри объекта, `this` в этом объекте будет вести себя по-разному (когда мы вызываем переменную как метод и когда мы вызываем сам метод). В частности, в первом случае, `this` - это глобальный объект (`window` в браузере, `global` в `Node.js`), в то время как во втором случае `this` внутри функции по-прежнему ссылается на свойство `name` объекта `obj`. Это означает, что `me()` возвращает `John`, а `obj.callMe` - `Jane`. Затем `result` возвращает `false`, и мы получаем `${me()} ${she()}`. Почему `she()` отличается от `me()`? Потому что `she()` привязана к объекту `obj`, а `me()` нет.',
  },
  {
    question:
      '((...a) => {\n  const b = ["JavaScript", "Russia"]\n\n  const c = [...a, typeof a, ...b, "apple"]\n\n  console.log(c.length + c[0].length)\n})(new Array(10))',
    answers: ['5', '10', '15', '20'],
    correctAnswerIndex: 2,
    explanation:
      '`...` используется двумя способами: как оператор распространения (spread) и как прочие параметры (rest). В рассматриваемом примере мы видим оба способа. Первый оператор в самовызываемой функции (IIFE) - это, разумеется, rest, а в константе `c` мы видим spread. В первом случае мы можем передать функции любое количество аргументов. Обратите внимание, что `typeof a` - это `object`, несмотря на то, что фактически - это массив (в отличие от массивоподобного объекта `arguments`). spread позволяет объединять массивы. Таким образом, `...a` - это оператор rest при использовании в качестве параметра функции, но в константе - это оператор spread. Мы получаем массив `c` с пятью элементами (`...a` - это вложенный массив, поэтому его длина равняется `1`), но первый элемент данного массива сам имеет `10` элементов (`new Array(10)`). Сумма длин обоих массивов равняется `15`.',
  },
  {
    question:
      'function F(name, ...career) {\n  this.name = name\n\n  return Array.isArray(career) === true && typeof career === "object" ? {} : ""\n}\n\nvar student = new F("John")\n\nconsole.log(student.name)',
    answers: ['John', 'undefined', 'Error', 'false'],
    correctAnswerIndex: 1,
    explanation:
      'У нас имеется функция-конструктор `F` (название написано с заглавной буквы, это не обязательно, но таково соглашение), которая может использоваться для создания объекта, такого как объект `student` в рассматриваемом примере. В функции имеется два параметра, хотя второй параметр - это на самом деле rest-оператор (`...`). Его типом является `object`, но выражение `Array.isArray(career)` возвращает `true`. Оператор `return` возвращает пустой объект (`{}`). Вы можете быть немного удивлены, когда `console.log(student.name)` выведет в консоль `undefined`. Все дело в том, что у пустого объекта отсутствует свойство `name`.',
  },
  {
    question:
      'class Filter {\n  constructor(element) {\n    this.element = element\n  }\n  filter() {\n    return this.type() === "object" ? this.element[0].name : "hello"\n  }\n\n  type() {\n    return typeof this.element\n  }\n}\n\nlet countries = [\n  { name: "Russia", isdeveloped: true },\n  { name: "Vietnam", isdeveloped: false },\n]\n\nlet x = new Filter(countries)\n\nconst filter = countries.filter((item) => {\n  return !item.isDeveloped\n})\n\nconsole.log(x.filter().length + filter[0].name.length)',
    answers: ['11', '12', '13', '14'],
    correctAnswerIndex: 2,
    explanation:
      'Пример получился немного длинным. На самом деле, он не слишком сложный. Вы легко найдете правильный ответ, если потратите немного времени на размышления. Сначала мы определяем класс с двумя методами. Метод `filter` возвращает первый элемент массива (свойства `element`), или `hello`, в зависимости от метода `type`. Выражение `typeof array` возвращает `object`, так что `filter()` возвращает `this.elements[0].name`. Затем мы вызываем встроенный метод `filter`. Этот метод возвращает новый массив в зависимости от условия, переданного колбеку. Обратите внимание, что `!item.isDeveloped` означает `false`. Значит, мы получаем `Vietnam`. Наконец, мы получаем `Russia.length` и `Vietnam.length`, что в сумме дает `13`.',
  },
  {
    question:
      'async function abc() {\n  console.log(8)\n\n  await Promise.resolve(2).then(console.log)\n\n  console.log(3)\n}\n\nsetTimeout(() => {\n  console.log(1)\n}, 0)\n\nabc()\n\nqueueMicrotask(() => {\n  console.log(0)\n})\n\nPromise.resolve(4).then(console.log)\n\nconsole.log(6)',
    answers: [
      '6  8  3  0  4  2  1',
      '8  2  3  0  4  6  1',
      '6  8  2  0  4  3  1',
      '8  6  2  0  4  3  1',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Порядок выполнения асинхронного кода зависит от микро- и макрозадач. Микрозадачи имеют приоритет. Запомните, что синхронный код всегда выполняется перед асинхронным. Поэтому мы имеем следующий порядок:\n1. Синхронный код.\n2. Микрозадачи (промисы, `async/await`).\n3. Макрозадачи (`setTimeout`, `setInterval`).\nОбратите внимание, что в `Node.js` у нас также имеется `process.nextTick()`, который имеет наивысший приоритет, но в рассматриваемой задаче его нет.\nИтак, колбек `setTimeout()` будет выполнен последним, поскольку является макрозадачей. Поэтому мы получаем `1` последним.\nСледующей вызывается функция `abc`. Сначала в консоль выводится `8`. Затем на ключевом слове `await` выполнение функции приостанавливается, выполняется `console.log(6)`, поскольку `Promise.resolve(4).then(console.log)` - это асинхронный код. Вот почему следующим мы получаем `6`.\nТеперь настало время для `Promise.resolve(2)`, поэтому мы получаем `2`. Что произойдет, если убрать ключевое слово `await`?\nПоскольку у нас имеется ключевое слово `await`, выполнение кода как бы ставится на паузу. Мы получаем `0` и `4`, а не `3`. Промисы и `async/await` - микрозадачи, которые выполняются перед `console.log(3)`.\nНа следующем этапе мы получаем `3` и, последним, `1`.\nТак что же произойдет, если убрать ключевое слово `await`? Тогда порядок будет следующим: `8  3  6  2  0  4  1`.',
  },
  {
    question:
      'const username = {\n  x: "youtube.com/username".length,\n  getMe() {\n    const inner = function () {\n      console.log(++this.x)\n    }\n    inner.bind(this)()\n  },\n}\n\nusername.getMe()',
    answers: ['20', '21', '22', '23'],
    correctAnswerIndex: 1,
    explanation:
      'Мы получаем `21`. Сначала `youtube.com/username` возвращает `20`, поскольку мы используем свойство `length` строки. Затем значение `x` увеличивается на `1` посредством `++this.x`. Вопрос выглядит тривиальным, но это не так. Нужно помнить о том, что `console.log(++this.x)` не будет работать, если значением `x` будет `undefined` при вызове за пределами объекта.\nМы можем решить эту проблему с `this` с помощью стрелочной функции: `const inner = () => {}`, поскольку стрелочные функции берут `this` из внешнего (лексического) окружения.\nВторым решением является использование трюка с `that/this`. Нам нужно лишь объявить новую переменную `const that = this` внутри `insideMe()` и перед объявлением функции `inner`. Это довольно распространенный прием.\nТретьим решением является использование `apply`, `call` или `bind`, нативных методов функций (функция - это объект). В данном случае, мы реализовали `bind(this)` для связывания функции и объекта, чтобы `this` указывал на объект при выполнении функции. Обратите внимание, что `bind()` не выполняется сразу, поэтому мы добавили `()` после него. Если заменить `bind()` на `call()`, то дополнительные круглые скобки не понадобятся. `inner.bind(this)()` станет `inner.call(this)`. На практике, мы, как правило, создаем переменную для хранения результата связывания функции и объекта.',
  },
  {
    question:
      'function* userName() {\n  yield "js.pro.ru"\n  yield "youtube.com/username"\n  yield "John Smith"\n}\n\nlet data = userName()\n\nconsole.log((typeof data).length + data.next().value.length)',
    answers: ['NaN', '10', 'Error', '15'],
    correctAnswerIndex: 3,
    explanation:
      'Присмотритесь к функции. После ключевого слова `function` имеется символ `*`. В функции отсутствует ключевое слово `return`. Что здесь происходит?\nЕсли вы знакомы с генераторами, вам не составит труда решить рассматриваемую задачу. Мы не часто используем генераторы, но они являются основой `async/await`, позволяющей удобно работать с асинхронным кодом.\nВыражение `typeof data` возвращает `object`, а не `function`. `typeof userName` возвращает `function`, поскольку `userName` - обычная функция. Выражение `(typeof data).length` возвращает `6`.\n`data.next()` вызывает встроенный метод `next`, который возвращает значение первого `yield`, определенного в функции. Получаем `9` - длину строки `js.pro.ru`.\nВ итоге получаем `15`. Понимание работы генераторов имеет важное значение для понимания работы ключевых слов `async/await`.',
  },
  {
    question:
      'const a = [1, 2, "one", 3, 1, "one", "two", 3]\n\nconst b = [...new Set(a)]\n\nb.length = "one".length\n\nconsole.log(b)',
    answers: [
      '4',
      '[1, 2, "one", 3, "two"]',
      '[1, 2, "one", "two"]',
      '[1, 2, "one"]',
    ],
    correctAnswerIndex: 3,
    explanation:
      '`...` в массиве - это spread-оператор (оператор распространения/распаковки), который похож на rest-оператор (прочие параметры). Данный оператор позволяет объединять (изменять) и копировать массивы. В рассматриваемом примере `b` - это копия `a`. Тем не менее, когда мы передаем `a` в `Set`, возвращаются только уникальные значения. Это означает, что `b` содержит `[1, 2, "one", 3, "two"]`. Затем мы устанавливаем значение длины `b` равным `3` (`"one".length`). Таким образом, мы уменьшили длину массива. Вот почему в консоль выводится только `[1, 2, "one"]`.',
  },
  {
    question:
      'const one = function (p) {\n  return arguments[0]\n}\n\nconst two = function (...p) {\n  return arguments[arguments[0]]\n}\n\nconst a = [one(123), two(1, 2, 3)]\n\nconsole.log(typeof a !== "object" ? a[0] : a[1])',
    answers: ['1', '2', '3', '123'],
    correctAnswerIndex: 1,
    explanation:
      'Прежде всего, следует отметить, что мы не можем использовать `arguments` в стрелочных функциях. `arguments` - это массивоподобный объект, который содержит аргументы, переданные функции при ее вызове.\nОбратите внимание, что `...` в массиве - это spread-оператор (оператор распространения/распаковки), который ведет себя иначе, чем rest-оператор (прочие параметры). При использовании `...` в функции, мы можем передавать ей любое количество аргументов.\nТакже обратите внимание, что в функции `two` мы возвращаем `arguments[arguments[0]]` или `2`, а не `1`, поскольку `arguments[0]` возвращает `1`, а `arguments[1]` - `2`.\nВыражение `typeof a` возвращает `object`. В итоге мы получаем `2` из `a[1]` или `two(1, 2, 3)`.',
  },
  {
    question:
      'class Component {\n  constructor(age) {\n    this.age = age + `${typeof Coder}`.length\n  }\n\n  getAge() {\n    return ++this.age\n  }\n}\n\nclass Coder extends Component {\n  constructor(age) {\n    super(age)\n    this.age = age - `${typeof Coder}`.length\n  }\n}\n\nconst a = new Coder(16)\n\nconsole.log(a.getAge())',
    answers: ['7', '8', '9', '10'],
    correctAnswerIndex: 2,
    explanation:
      'У нас есть два простых класса, `Coder` расширяет `Component`. Ничего особенного. Поскольку `typeof ClassName` возвращает `function`, а не `class`, мы получаем `8` из `\'function\'.length`.\nПоскольку мы используем `super(age)` в классе `Coder`, то перезаписываем конструктор родительского класса `Component`. Поэтому при инициализации объекта `a` автоматически выполняется "this.age = age - `${typeof Coder}`.length". Разница между дочерним и родительским конструкторами заключается в арифметической операции.\nТаким образом, мы получаем `16 - 8`, а не `16 + 8`, т.е. `8`. Функция `getAge` возвращает `9`.\nПомните, что `JavaScript` - это не настоящий объектно-ориентированный язык программирования, несмотря на то, что мы можем использовать в нем классы и объекты.',
  },
  {
    question:
      'class RemoveFalse {\n  constructor(element) {\n    this.element = element\n\n    this.length = this.removeFalse().length\n  }\n\n  removeFalse() {\n    this.element = this.element.filter(Boolean)\n\n    return this.element\n  }\n}\n\nconst theArray = [true, false, 1, 0, NaN, undefined, "", null, "string"]\n\nconst a = new RemoveFalse(theArray)\n\nconsole.log(a.length)',
    answers: ['false', 'true', '2', '3'],
    correctAnswerIndex: 3,
    explanation:
      "Основной вывод, который можно сделать из приведенного примера - `filter(Boolean)` может быть использован для удаления из массива ложных значений. Для этого мы также можем использовать `filter(callback)`. Обратите внимание, что мы должны передать методу `filter` функцию обратного вызова, а `Boolean` как раз является такой функцией. Вы можете убедиться в этом с помощью `typeof Boolean`.\nКак и `map` или `reduce`, `filter` возвращает новый массив на основе существующего. `[true, false, 1, 0, NaN, undefined, '', null, 'string'].filter(Boolean)` возвращает `[true, 1, 'string']`, поэтому `a.length` возвращает `3`.",
  },
  {
    question:
      'const coderfarm = [1, [], {}, [], 2, 3]\n\nconst converted = Number(coderfarm instanceof Array)\n\nconst result = coderfarm.indexOf(converted + true)\n\nconsole.log(result)',
    answers: ['[]', '{}', '2', '4'],
    correctAnswerIndex: 3,
    explanation:
      'У нас имеется массив, состоящий из нескольких чисел, двух массивов и объекта. Посредством встроенной функции `Number` мы можем конвертировать (преобразовать) любое переданное функции значение в число. `codefarm instanceof Array` возвращает `true`, которое преобразуется в `1`. Для проверки того, является ли значение массивом, также можно использовать `Array.isArray(arrayToBeChecked)`, возвращающий логическое значение. Выражение `typeof []` возвращает `object`, а не `array`. Встроенная функция `indexOf` возвращает индекс искомого элемента. Поскольку `converted + true` возвращает `2`, мы ищем индекс элемента `2` в массиве `codefarm`. Данный элемент находится на `4` позиции.',
  },
  {
    question:
      'const converter = (arrayInput) => {\n  return { ...arrayInput }\n}\n\nconst content = ["function", "object", "decorator"]\n\nconst checking = content[Number(false)]\n\nconst result = typeof converter(content) === content[1]\n\nconsole.log(checking ? (result ? (typeof converter).length : false) : false)',
    answers: ['6', 'NaN', 'true', '8'],
    correctAnswerIndex: 3,
    explanation:
      "Оператор `...` является очень полезным. В функции `converted` нет ничего необычного, она использует преимущества `...` (оператор rest || оператор spread) для преобразования массива в объект.\nКонстанта `checking` имеет значение `function` из `Number(false)`, что дает `0`, т.е. значением `checking` является элемент массива `content` с индексом `0`.\nКонстанта `result` имеет значение `true`, поскольку `typeof converter(content)` возвращает `object`, как и `content[1]`.\nТаким образом, мы имеем `checking = true` и `result = true`, поэтому получаем `(typeof converter).length` или `'function'.length`, или `8`.\nГлавный вывод здесь такой: мы можем использовать оператор распространения (spread-оператор) для преобразования массива в объект. Например: `const a = ['hello', 2]; const b = { ...a }`, получаем `b = { 0: 'hello', 1: 2 }`. Ключами объекта в данном случае являются индексы элементов в массиве.",
  },
  {
    question:
      'function* js(length) {\n  for (let i = length.length; i > 0; --i) {\n    yield i\n  }\n}\n\nlet getJS = js(typeof js)\n\nlet result = getJS.next().value\n\nconsole.log(result + getJS.next().value)',
    answers: ['10', '14', '15', '16'],
    correctAnswerIndex: 2,
    explanation:
      'Здесь мы имеем дело с функцией-генератором, которая определяется с помощью специального символа `*` после названия. Благодаря ключевому слову `yield` мы можем хранить в функции любое количество значений. Поскольку `typeof js` возвращает `function`, длина этой строки равняется `8`. Поэтому при вызове `getJS.next().value` мы получаем `8`. При следующем вызове мы получаем `7`, затем `6`. Генератор может хранить и возвращать любое количество значений. В итоге мы получаем `8 + 7`, или `15`.',
  },
  {
    question:
      'var ages = [10, 15, 20, 25]\n\nlet response = []\n\nages.some(function (currentValue, index, ages) {\n  if (currentValue > ages[ages.length - index])\n    response.push(currentValue + ages.length)\n})\n\nconsole.log(response)',
    answers: ['[20]', '[20, 25]', '[25, 29]', '[29]'],
    correctAnswerIndex: 3,
    explanation:
      '`Array.prototype.some()` - это встроенная функция, позволяющая обрабатывать элементы массива с помощью колбека. Колбек в рассматриваемом примере имеет три параметра: `currentValue` (значение текущего элемента массива), `index` (индекс текущего элемента) и `ages` (сам массив).\nМетод `some` возвращает логическое значение. Выражение `currentValue > ages[ages.length - index]` возвращает `true` лишь один раз, поскольку речь идет о последнем элементе. Давайте рассмотрим код последовательно:\n1. `10 > ages[4 - 0]`: поскольку `ages[4]` возвращает `undefined`, и `10 > undefined` возвращает `false`, выполнение кода останавливается.\n2. `15 > ages[4 - 1]`: поскольку `ages[3]` возвращает `25`, условие является ложным.\n3. `20 > ages[4 - 2]`: поскольку `ages[2]` возвращает `20`, условие также не удовлетворяется.\n4. `25 > ages[4 - 3]`: поскольку `ages[1]` возвращает `10`, выражение возвращает `true`. Только это значение помещается в массив `response`.\nВ массиве `response` содержится `response.push(currentValue + ages.length)` или `25 + ages.length`, или `25 + 4`, т.е. `29`.',
  },
  {
    question:
      'const getString = (string, method = false) => {\n  if (method === true) {\n    return string.slice(1, 4).length\n  }\n\n  return string.substr(1, 4).length\n}\n\nconsole.log(getString("hello", true) + getString("hello"))',
    answers: ['6', '7', '8', '9'],
    correctAnswerIndex: 1,
    explanation:
      "`getString` - это стрелочная функция с двумя параметрами. Как видите, параметр `method` имеет значение по умолчанию, равное `false`. Если не передать другое значение при вызове функции или передать `undefined`, будет использовано значение по умолчанию.\nОсновной вывод: разница между `slice(1, 4)`, возвращающим `3`, и `substr(1, 4)`, возвращающим `4`.\n`console.log(getString('hello', true) + getString('hello'))` или `console.log(string.substr(1, 4).length + string.slice(1, 4).length)`, или `console.log(4 + 3)` выводит в консоль `7`.",
  },
  {
    question:
      'class UserName {\n  name = "hello world"\n\n  getSlice(slice) {\n    return this.getName(slice).slice(true, this.name.length)\n  }\n\n  getName(space) {\n    return this.name.split(space)\n  }\n}\n\nUserName.prototype.split = function (argument) {\n  return this.getSlice(argument)\n}\n\nconst a = new UserName()\n\nconsole.log(a.split("").length)',
    answers: ['NaN', 'true', '10', '11'],
    correctAnswerIndex: 2,
    explanation:
      'В рассматриваемом примере нет ничего необычного. Он намеренно запутан. У нас есть класс `UserName` с двумя методами и одним свойством. Мы добавляем к нему еще один метод - `split`, используя традиционный способ (через `prototype`). Помните, что `class` в `JavaScript` - это лишь синтаксический сахар для функции-конструктора (выражение `typeof ClassName` возвращает `function`).\nПри вызове `split()`, мы передаем ему пустую строку. Данный метод вызывает другие методы. Порядок следующий:\n`split("") -> this.getSlice("") -> this.getName("") -> this.name.split("")`. Здесь `split` - это функция, преобразующая строку в массив.\nОбратите внимание, что в `getSlice()` мы используем `slice(true, this.name.length)` для модификации массива с `1` по `11` индексы. Длина нового массива составляет `10`.\nЭтот код помогает понять, как работают прототипы в `JavaScript`, а также увидеть разницу между встроенными и пользовательскими методами.',
  },
  {
    question:
      'function javaScript(node) {\n  let one = node.includes("I") ? " love " : " you "\n\n  return function (deno = one) {\n    let two = node.replace(deno, " done ")\n\n    return function (done = two) {\n      return (node + deno + done).length\n    }\n  }\n}\n\nconsole.log(javaScript("I love you")()())',
    answers: ['20', '26', '23', '25'],
    correctAnswerIndex: 1,
    explanation:
      "Кроме изучения некоторых встроенных функций для работы со строками, таких как `replace` и `includes`, здесь мы имеем дело с каррированием (currying). Обратите внимание, что только внешняя (основная) функция имеет название, внутренние функции являются анонимными. У нас также имеется три оператора `return`.\nПри вызове функции необходимо использовать 3 пары круглых скобок - `javaScript('I love you')()()`. Мы не передаем аргументы вложенным функциям, поэтому они используют значения по умолчанию.\nРезультирующим выражением является `return (node + deno + done).length`, где `node` - `I love you`, `deno` - ` love ` (2 пробела) и `done` - `I done you`. Длина получившейся строки `I love you love I done you` равняется `26`. Пробелы принимаются в расчет.",
  },
  {
    question:
      '(function (flag) {\n  let age = Boolean(NaN === NaN ? false : flag)\n\n  console.log(age.toString()[Number(flag)])\n})([])',
    answers: ['"f"', '"t"', 'true', 'false'],
    correctAnswerIndex: 1,
    explanation:
      'У нас имеется самовызывающаяся функция (IIFE) с пустым массивом в качестве аргумента. Обратите внимание, что сравнение `NaN === NaN` возвращает `false`, поэтому переменная `age` получает значение `flag`, т.е. пустой массив.\n`Boolean([])` возвращает `true`.\nФункция `toString` возвращает строку `true`, а `Number([])` - `0`. Поэтому в консоль выводится `t`.\nОбратите внимание, что `Boolean([]) === true`, но `Number([]) === 0`, а `NaN === NaN` возвращает `false`.',
  },
  {
    question:
      'console.log(Boolean([]))\nconsole.log(Number([]))\nconsole.log(Number(Boolean([])))\nconsole.log(Boolean(Number([])))\n\nconsole.log(Boolean({}))\nconsole.log(Number({}))\nconsole.log(Number(Boolean({})))\nconsole.log(Boolean(Number({})))\n\nconsole.log(Boolean(new Boolean(false)))',
    answers: [
      'true  0  1  false  true  1  1  false  false',
      'true  0  1  false  false  NaN  1  false  true',
      'true  0  1  false  false  false  1  false  false',
      'true  0  1  false  true  NaN  1  false  true',
    ],
    correctAnswerIndex: 3,
    explanation:
      '`JavaScript` - это язык со слабой и динамической типизацией. Тип переменной в `JS` может меняться в зависимости от ее значения. При изменении одного значения на другое поведение `JS` может быть весьма неожиданным.\nНапример, `Number([])` возвращает `0`, `Number({})` - `NaN`, а `Boolean([])` и `Boolean({})` - `true`.\n`Boolean(new Boolean(false))` возвращает `true`, несмотря на то, что мы передаем функции-конструктору `Boolean` значение `false`. Однако, если мы уберем ключевое слово `new`, то получим `false`. `Boolean(new Boolean(false))` - это валидная с точки зрения `JS` операция, поэтому возвращается `true`. С другой стороны, `Boolean(Boolean(false))` без ключевого слова `new`, возвращает `false`, поскольку значение `false` вообще не является операцией.',
  },
  {
    question:
      'const myYoutube = {\n  name: "username",\n  address: "youtube.com/username",\n  getInfo() {\n    return this\n  },\n  content: () => (this === window ? myYoutube.getInfo() : this),\n}\n\nconsole.log(myYoutube.content().name)',
    answers: ['username', 'window', 'NaN', 'undefined'],
    correctAnswerIndex: 0,
    explanation:
      'Для того, чтобы правильно ответить на данный вопрос, нужно понимать концепцию `this` в `JavaScript` (в расматриваемом примере речь идет только о браузере). По умолчанию `this` указывает на глобальный объект `window`. Обратите внимание, что `Window` (с заглавной буквы) - это функция-конструктор объекта `window`. Поэтому `console.log(this === window)` возвращает `true`, а `console.log(this === Window)` - `false`.\n`getInfo` - это стрелочная функция, `this`, объявленный внутри этой функции, указывает на `window`, поэтому `myYoutube.content()` возвращает `myYoutube.getInfo()`. Обратите внимание, что нам пришлось явно писать `myYoutube.getInfo()` для того, чтобы код работал корректно, поскольку `this` не указывает на текущий объект. В функции `getInfo` `this` указывает на текущий объект, поскольку `getInfo` - это обычная функция.\nВ итоге мы получаем `username` как значение свойства `name`.',
  },
  {
    question:
      'const myArray = [1, 2, 3]\n\nmyArray.someProperty = this\n\nArray.prototype.someOtherProperty = "hello"\n\nlet result = []\n\nfor (let key in myArray) {\n  result.push(key)\n}\n\nfor (let key in myArray) {\n  if (myArray.hasOwnProperty(key)) {\n    result.push(key)\n  }\n}\n\nconsole.log(result.length)',
    answers: ['10', 'NaN', '9', '7'],
    correctAnswerIndex: 2,
    explanation:
      "У нас имеется простой массив с тремя элементами. При проверке типа массива с помощью оператора `typeof` мы получаем `object` (для определения того, что значение является массивом, можно использовать `Array.isArray(array)` или `array instanceof Array`).\nПри объявлении `myArray.someProperty` мы добавляем новое свойство к данному массиву. При объявлении `Array.prototype.someProperty = 'hello'`, мы добавляем новое свойство ко всем массивам.\nЦикл `for-in` перебирает массив и возвращает пары ключ/значение, включая унаследованные свойства. На второй итерации мы используем метод `hasOwnProperty`, который перебирает только собственные (не унаследованные) ключи/значения.\nЕсли коротко, на первой итерации мы получаем `5` (`3` исходных элемента, `1` собственное свойство и еще `1` унаследованное свойство). На второй - только `4` (унаследованное свойство не учитывается).\nДля перебора массива обычно используется цикл `for-of` или классический цикл `for`. Использование `for-in` для этого считается плохой практикой. `for-in` обычно используется для перебора объектов.",
  },
  {
    question:
      'const coderfarm = [1, 2, 3, 4, 5]\n\nconst [top, ...bottom] = (function (a) {\n  let result = a\n\n  a.unshift(new Array(3))\n\n  return result\n})(coderfarm)\n\nconsole.log(top.length + bottom.length)',
    answers: ['8', '9', '10', '11'],
    correctAnswerIndex: 0,
    explanation:
      'Здесь мы используем деструктуризацию для извлечения значений массива (или объекта) и spread-оператор (оператор распространения/распаковки).\nДеструктурируемый массив возвращается из самовызывающейся функции (IIFE). Сначала мы передаем аргумент `codefarm` (параметр `a` функции). Затем мы обновляем этот массив, добавляя в начало (посредством метода `unshift`) массив из трех `undefined` (с помощью `new Array(3)`). После этого массив выглядит так: `[[undefined, undefined, undefined], 1, 2, 3, 4, 5]`.\nПеременная `top` - это первый элемент массива или `[undefined, undefined, undefined]`, длина которого равняется `3`.\nПеременная `bottom` - это прочие элементы массива, ее длина равняется `5`.\nВ итоге мы получаем `3 + 5` или `8`.',
  },
  {
    question:
      'let age = { number: 10 }\n\nconst getAge = (flag) => {\n  flag ? delete age.number : delete age\n  return age.number++\n}\n\nconsole.log(getAge(false))\n\nconsole.log(age.number)\n\nconsole.log(getAge(true))\n\nconsole.log(age.number)',
    answers: [
      '10  10  NaN  NaN',
      '10  10  undefined  undefined',
      '10  11  undefined  undefined',
      '10  11  NaN  NaN',
    ],
    correctAnswerIndex: 3,
    explanation:
      'Оператор `delete` удаляет свойство объекта, но не сам объект. У нас есть простая функция `getAge` с параметром `flag`. Если значением `flag` является `true`, выполняется код `delete age.number`, в противном случае, мы пытаемся удалить объект.\nПоскольку `delete` не может удалить объект, можно сказать, что `delete age` ничего не делает. Выражение `console.log(getAge(false))` возвращает `10` и затем увеличивает значение `age.number` на `1`. Данное значение хранится в памяти, поэтому `console.log(age.number)` возвращает `11`.\nКогда мы присваиваем `flag` значение `true`, `console.log(getAge(true))` выполняет код `delete age.number`, что удаляет свойство `number` объекта `age`. Это означает, что `age.number` равняется `undefined`. Однако, поскольку мы пытаемся увеличить значение этого свойства на `1` с помощью оператора `++`, возвращается `NaN`.',
  },
  {
    question:
      'const f = function() {\n  this.x = 5;\n  (function() {\n      this.x = 3;\n  })();\n  console.log(this.x);\n};\n\nconst obj = {\n  x: 4,\n  m: function() {\n    console.log(this.x);\n  },\n};\n\nf();\nnew f();\nobj.m();\nnew obj.m();\nf.call(f);\nobj.m.call(f);',
    answers: [
      '3 5 4 undefined 5 5',
      '5 5 4 undefined 5 undefined',
      '3 3 undefined 4 undefined 4',
      '5 5 4 undefined 3 5',
    ],
    correctAnswerIndex: 0,
    explanation:
      'При вызове функции `f` ее контекст (значение `this`) равняется `window` (в рассматриваемом примере речь идет только о браузере). Контекст самовызывающейся функции (IIFE) также равняется `window`, поэтому значением `window.x` становится `3`. Когда функцию вызывают с ключевым словом `new` - создается новый объект, который становится контекстом функции (конструктора), но самовызывающаяся функция этот контекст не получает, поэтому второй раз в консоль выводится `5`. Далее мы имеем дело с методом `m` объекта `obj`. Контекстом метода является объект, которому данный метод принадлежит. Значением свойства `obj.x` является `4`, что и выводится в консоль.\nОднако, если вызвать тот же метод с помощью `new`, то для `m` будет создан новый контекст, в этом новом контексте `x` будет иметь значение `undefined`. Вызывая функцию `f` с помощью `call(f)`, мы определяем, что контекст данной функции равен самой функции, т.е. `this === f`. Функция - это специальный вид объекта, которому, как и любому другому объекту, можно добавлять свойства. `f.x` равняется `5`, что и выводится в консоль. Наконец, мы вызываем метод `m` с помощью `call(f)`, т.е. `this === f`. После предыдущего вызова свойство `f.x` равняется `5`, поэтому вместо `undefined` в консоль снова выводится `5`.',
  },
] as TQuestions
