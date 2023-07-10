# Typescript Exercises

## 다루는 내용

1. Basic typing.
2. Refining types.
3. Union types.
4. Merged types.
5. Generics.
6. Type declarations.
7. Module augmentation.
8. Advanced type mapping.

## 연습 공간

[Typescript Exercises](https://typescript-exercises.github.io/)

[TS Playground](https://www.typescriptlang.org/play)

> GPT 질문 내용

## 문제 1

### interface와 type의 차이

> 타입스크립트에서 interface와 type의 차이점에 대해 설명해줘.

#### 확장성 차이

- `interface`는 상속이 가능하다. 여러 개의 `interface`를 정의하고 이들을 합쳐서 상속할 수 있다.

```ts
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}
```

- `type`은 상속이 아닌 별칭으로써의 역할을 수행한다. 기존 타입을 참조하여 새로운 타입으로 지정하는 역할을 한다.

```ts
type Shape = {
  color: string
}

type Squre = Shape & {
  sideLength: number
}
```

#### 언제 사용해야 할까?

- 타입 확장이 필요한 경우 `interface`를 사용한다.
- 타입을 별칭, 조합, 계산된 속성을 사용하는 경우 `type`을 사용한다.
- 실제로는 `interface`와 `type`이 많은 부분에서 상호 교차 가능하기 때문에 팀의 가이드, 패턴을 따르는 것이 중요하다.

## 문제 2

### Union Types

`union`의 모든 멤버에 대해 유효한 경우에만 작동을 허용한다.

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase())
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
}
```

> Union Types에서 타입 좁히기에 대해 설명해줘.

- 타입 가드

함수를 사용하여 특정 조건을 검사하고 해당 조건에서 타입을 좁히는 방법이다.
일반적으로 `typeof`, `instanceof`, `in` 연산자 등을 사용하여 타입을 확인하고 해당 조건에서의 타입을 제한한다.

```ts
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log('ID is a string')
    console.log(`Value: ${id.toUpperCase()}`)
  } else {
    console.log('ID is a number')
    console.log(`Value: ${id.toFixed(2)}`)
  }
}
```

- 타입 단언 (Aseertion)

`as` 연산자를 사용하여 특정 타입으로 타입 단언을 한다. 이는 개발자가 특정 상황에서 타입을 임의로 좁히는 방법이다.

```ts
const myCanvas = document.getElementById('main_canvas') // HTMLElement | null

const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement // HTMLCanvasElement
```

## 문제 3

### The in operator narrowing

자바스크립트에는 객체나 프로토타입 체인에 `in` 연산자라는 이름의 속성 여부를 결정하는 연산자가 있다.

옵셔널 속성은 좁히기에서 양쪽에 존재한다.

```ts
type Fish = { swim: () => void }
type Bird = { fly: () => void }
type Human = { swim?: () => void; fly?: () => void }

function move(animal: Fish | Bird | Human) {
  if ('swim' in animal) {
    animal // Fish | Human
  } else {
    animal // Fish | Human
  }
}
```

### instanceof narrowing

자바스크립트에는 어떤 값이 다른 값의 "instance"인지 확인하는 연산자가 있다.

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString())
  } else {
    console.log(x.toUpperCase())
  }
}
```

## 문제 4

### Using type predicates

좁히기를 처리하기 위해 기존 자바스크립트 구조를 사용해 왔지만, 때떄로 코드 전체에서 타입이 어떻게 변화하는지에 대해 직접적인 제어를 원하기도 한다.

직접 타입 가드를 정의하려면 반환 타입이 `type predicate`인 함수를 정의하면 된다.

> Type Predicate에 대해 설명해줘.

타입스크립트에서 `Type Predicate`는 타입 가드 함수를 정의할 때 사용되는 타입 어노테이션이다. `Type Predicate`는 함수의 반환 타입 어노테이션으로 사용되며 해당 함수가 특정 조건에서 참인지 거짓인지 판별하는 용도로 사용된다.

```ts
function isType(variable: any): variable is SomeType {
  // 타입 가드 조건을 검사하여 true 또는 false를 반환
}
```

`Type Predicate`을 사용하면 더 정확한 타입 가드 함수를 작성할 수 있다. 이를 통해 타입 검사와 타입 좁히기를 조합하여 **코드의 안전성과 가독성**을 향상시킬 수 있다.
