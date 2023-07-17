# What's the Scope?

> JS is in fact parsed/compiled in a separate phase before execution begins.

JS는 실제로 실행이 시작되기 전에 별도의 단계로 구문 분석/컴파일된다.
스코프 구조의 결과는 일반적으로 런타임 환경의 영향을 받지 않는다.

JS 객체는 그 자체로 일급 클래스 값이다. (숫자나 문자열처럼 부여되거나 건네질 수 있음)
이러한 함수들은 변수들을 보유하고 접근하기 때문에 함수들이 끝내 실행되는 프로그램과 상관없이 원래 스코프를 유지한다.
이것이 **클로저**이다.

모듈은 모듈의 내부 스코프에 숨겨진 변수와 함수에 (클로저를 통해)접근할 수 있는 공개 메서드를 통해 특정되는 코드 구성 패턴이다.

## Compiled vs Interpreted

코드 컴파일은 코드의 텍스트를 처리하여 컴퓨터가 이해할 수 있는 명령 목록으로 변환되는 일련의 단계이다.
일반적으로 전체 소스 코드는 한 번에 변환되고 그 결과로 나온 명령어들은 나중에 실행될 수 있는 출력(output)으로 저장된다.

`interpreted`와 `compiled`의 차이점은 무엇일까?

공통점

- 프로그램을 기계가 이해할 수 있는 명령으로 변환한다.

차이점

- `compiled` 프로그램은 모든 것을 한 번에 변환한다.
- `interpreted` 프로그램은 한 줄씩 변환한다. 각 라인이 소스 코드의 다음 줄이 처리되기 전에 즉시 실행된다.

![compilation-interpretation](./imgs/compilation-interpretation.png)

`interpretation`은 소스 코드 텍스트에서 한 줄씩 작동하는 것 외에도 다른 형태를 취할 수 있다.
현대의 JS 엔진은 실제로 JS 프로그램을 처리할 때 `compilation`과 `interpretation`의 다양한 변형을 사용합니다.

JS는 컴파일된 언어로 정확하게 묘사된다.

## Compilling Code

JS의 `compiled` 여부가 왜 중요한가?

스코프는 주로 `compilation` 동안 결정된다.
그래서 컴파일과 실행이 어떻게 관련되는지 이해하는 것이 스코프의 핵심이다.

프로그램은 컴파일러에 의해 세 가지 기본 단계로 처리된다.

1. **Tokenizing/Lexing**: 문자열을 토큰이라고 하는 의미있는 청크로 분할하는 것을 토큰이라고 한다. `var a = 2;`는 `var`, `a`, `=`, `2`, `;`와 같이 토큰으로 분할될 수 있다. 공백은 의미에 따라 유지 여부가 달라진다.

2. **Parsing**: 토큰 스트림을 가져다가 프로그램의 문법 구조를 집합적으로 나타내는 중첩된 요소의 트리로 변환한다. 이를 추상 구문 트리(AST)라고 한다.

   예를 들어 `var a = 2;`는 `VariableDeclaration`이라는 최상위 노드로 시작하고 `Identifier`라는 하위 노드 (값은 a)와 `AssignmentExpression`이라는 하위 노드로 구성되며 이 하위 노드 자체에는 `NumericLiteral`이라는 하위 노드 (값은 2)가 있다.

3. **Code Generation**: AST를 가져와서 실행 코드로 변환한다. 이 부분은 언어, 대상 플랫폼, 기타 요소에 따라 크게 달라진다.

JS 엔진은 `var a = 2;`에 대해 AST를 사용하고 이 AST를 기계 명령 집합으로 변환하여 `a`라는 변수를 실제로 생성한 다음 값을 저장한다.

JS 엔진은 작업과 최적화를 수행할 충분한 시간을 가지고 있지 않다.
왜냐하면 JS 컴파일은 다른 언어와 마찬가지로 빌드 단계에서 미리 실행되지 않기 때문이다.
보통 코드가 실행되기 직전에 마이크로초 안에 발생해야 한다.
이러한 제약 조건 하에서 가장 빠른 성능을 보장하기 위해 JS 엔진은 모든 종류의 트릭을 사용한다.
이는 여기서 논의할 "스코프"의 범위를 벗어난다.

## 필수: 두 단계

JS 프로그램 처리에 대해 할 수 있는 가장 중요한 관찰은 적어도 두 단계가 발생한다.
첫째: parsing/compilation
둘째: execution

파싱/컴파일과 후속 실행 단계의 분리는 관찰 가능한 사실이다.
JS 사양은 명시적으로 "컴파일"을 요구하지 않지만,
기본적으로 컴파일 후 실행 접근에서만 실용적인 동작을 요구한다.

이를 증명하기 위해 관찰할 수 있는 세 가지 프로그램 특징이 있다.

- 구문 오류(syntax errors)
- 초기 오류(early errors)
- 호이스팅(hoisting)

### Syntax Errors

```js
var greeting = "Hello";

console.log(greeting);

greeting = ."Hi";
// SyntaxError: unexpected token .
```

첫 번째 줄과 두 번째 줄을 실행하기 전에 JS 엔진이 전체 프로그램을 먼저 구문 분석한다.

### Early Errors

```js
console.log('Howdy')

saySomething('Hello', 'Hi')
// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context

function saySomething(greeting, greeting) {
  'use strict'
  console.log(greeting)
}
```

발생한 오류는 구문 오류가 아니지만,
엄격 모드에서는 실행이 시작되기 전에 "early error"로 사양에 따라 에러를 발생시킨다.

다시 볼 수 있듯이 실행되기 전에 코드를 완전히 구문 분석되어야 한다는 것이 유일하며 합리적인 설명이다.

### Hoisting

```js
function saySomething() {
  var greeting = 'Hello'
  {
    greeting = 'Howdy' // error comes from here
    let greeting = 'Hi'
    console.log(greeting)
  }
}

saySomething()
// ReferenceError: Cannot access 'greeting' before
// initialization
```

`ReferenceError`가 발생한다. `greeting = 'Howdy'`가 `greeting` 변수에 너무 일찍 접근해서 발생한 것으로 Temporal Dead Zone(TDZ)라고 불리는 충돌이다.

JS엔진이 다음 명령문이 동일한 이름의 블록 범위 변수를 선언한다는 것을 알 수 있는 유일한 방법은 JS 엔진이 이미 모든 스코프와 변수 연관성을 설정한 경우이다.
이러한 범위와 선언의 처리는 실행 전에 프로그램을 구문 파싱하면서 정확하게 수행할 수 있는 것이다.

이제 실행이 시작되기 전에 JS 프로그램이 파싱된다는 것을 확신할 수 있다.
하지만 이것이 컴파일된다는 것을 증명하는 것일까?

JS가 프로그램을 파싱한 다음 컴파일하지 않고 AST에 표시된 연산을 해석(인터프리티)하여 해당 프로그램을 실행할 수도 있다.
하지만 이는 매우 비효율적인 성능을 보여준다.

JS와 스코프를 효과적으로 이해하려면 JS 엔진이 우리의 코드를 어떻게 처리하는지에 대한 적절한 정신적 모델이 필요하다.

## Compiler Speak

```js
var students = [
  { id: 14, name: 'Kyle' },
  { id: 73, name: 'Suzy' },
  { id: 112, name: 'Frank' },
  { id: 6, name: 'Sarah' },
]

function getStudentName(studentID) {
  for (let student of students) {
    if (student.id == studentID) {
      return student.name
    }
  }
}

var nextStudent = getStudentName(73)

console.log(nextStudent)
// Suzy
```

### Target

### Source

## Cheating: Runtime Scope Modifications

지금까지 스코프가 런타임 환경에 의해 일반적으로 영향을 받는 것이 아닌 프로그램이 컴파일되면서 결정된다는 것은 분명하다.
그러나 비엄격 모드에서 런타임 동안 프로그램의 스코프를 수정하면서 기술적으로 이 규칙을 속이는 두 가지 방법이 있다.

물론 이러한 기술을 사용되어서는 안되며 엄격 모드를 사용하도록 해야 한다.
하지만 일부 프로그램에서 마주할 경우를 대비해 이를 알고 있는 것이 중요하다.

`eval()` 함수는 컴파일에서 코드의 문자열을 받고 런타임 동안 실행한다.
코드의 문자열이 `var` 또는 `function`을 가지면 이 선언은 `eval()`을 실행하고 있는 현재 스코프를 수정할 것이다.

```js
function badIdea() {
  eval("var oops = 'Ugh!';")
  console.log(oops)
}
badIdea() // Ugh!
```

이는 이미 컴파일되고 최적화된 스코프를 수정하는 것 외에도 당연히 많은 이유로 인해 좋지 못한 경우이다.

두 번째 속임수는 `with` 키워드이다.
이것은 객체를 로컬 스코프로 동적으로 변경시킨다.

```js
var badIdea = { oops: 'Ugh!' }

with (badIdea) {
  console.log(oops) // Ugh!
}
```

### Lexical Scope

JS의 스코프는 컴파일 타임에 결정된다.

렉시컬 스코프의 핵심 개념은 함수, 블록, 변수 선언의 배치에 의해 완전히 제어된다.

함수 안에 변수 선언을 배치하면 컴파일이 함수를 파싱하면서 선언을 다루고 선언과 함수의 스코프가 연관된다.

변수가 블록 범위로 선언되면 가장 가까운 `{ .. }` 블록과 연관된다.

게다가 변수에 대한 참조는 해당 변수에 대해 사용 가능한 범위 중 하나에서 가져온다.
그렇지 않으면 변수는 '명시되지 않음'이라고 한다.
변수가 현재 스코프에 선언되지 않는다면 다음 외부로 이어진 스코프로 이어진다.

컴파일은 스코프와 변수에 대한 메모리 예약 측면에서 아무 것도 하지 않는 것이 중요하다.

대신 컴파일은 프로그램이 실행되는 동안 필요한 렉시컬 스코프를 생성한다.
모든 스코프를 정의하고 각 스코프에 대한 모든 식별자를 등록하여 런타임에 사용할 코드를 삽입하는 것이라고 생각할 수 있다.

다시 말해 스코프는 컴파일 중에 식별되지만 스코프가 실행되어야 할 때마다 런타임 때까지 실제로 생성되지 않는다.

# Illustrating Lexical Scope
