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

## 문제 5

### Utility Types

> Utility Types에 대해 설명해줘.

유틸리티 타입은 타입스크립트에서 제공하는 내장 타입 변환 도구이다. 흔히 사용되는 타입 패턴을 간편하게 정의하고 조작할 수 있도록 도와준다. 유틸리티 타입을 통해 기존 타입을 기반으로 새로운 타입을 생성하거나 변환하는데 사용한다.

#### `Partial<Type>`

타입의 모든 속성이 옵셔널하게 설정된 타입으로 구성한다. 이 유틸리티 타입은 지정된 타입의 모든 하위 집합을 나타내는 유형을 반환한다.

> `Partial<T>`을 유용하게 사용하는 코드를 알려줘.

주어진 타입 `T`의 모든 속성을 선택적으로 만드는 유틸리티 타입이다. 이를 활용하여 기존 타입의 모든 속성을 선택적으로 다룰 수 있다.

```ts
interface User {
  name: string
  age: number
  email: string
}

function updateUser(user: User, updatedData: Partial<User>): User {
  return { ...user, ...updatedData }
}

const existingUser: User = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
}

const updatedUser = updateUser(existingUser, { age: 31, email: 'john.doe@example.com' })
console.log(updatedUser)
```

#### `Omit<Type, Keys>`

타입에서 모든 속성을 선택한 다음 `Keys`(문자열 리터럴 또는 문자열 리터럴의 유니언)를 제거하여 타입을 구성한다.

> `Omit<Type, Keys>`을 유용하게 사용하는 코드를 알려줘.

기존 타입에서 원하지 않는 속성을 간단하게 제외하고 싶을 때 유용하다.

```ts
interface User {
  id: number
  name: string
  age: number
  email: string
}

type UserWithoutId = Omit<User, 'id'>

const user: UserWithoutId = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
}

console.log(user)
```

### Predefined conditional types

> predefined-conditional-types에 대해 설명해줘.

Predefined conditional types(미리 정의된 조건부 타입)는 타입스크립트에서 제공하는 내장 조건부 타입이다. 타입에 대한 조건을 기반으로 타입을 유추하거나 변환하는데 사용된다. 특히 특정한 조건에 따라 타입을 조작하는데 유용하다.

1. `Exclude<T, U>`: T에서 U에 할당할 수 없는 타입을 추출합니다.

2. `Extract<T, U>`: T에서 U에 할당할 수 있는 타입을 추출합니다.

3. `NonNullable<T>`: T에서 null과 undefined를 제외한 타입을 추출합니다.

4. `ReturnType<T>`: 함수 타입 T의 반환 타입을 추출합니다.

5. `InstanceType<T>`: 클래스 타입 T의 인스턴스 타입을 추출합니다.

6. `Parameters<T>`: 함수 타입 T의 매개변수 타입을 추출합니다.

7. `Required<T>`: T 타입의 모든 속성을 필수 속성으로 만듭니다.

8. `Partial<T>`: T 타입의 모든 속성을 선택적 속성으로 만듭니다.

9. `Readonly<T>`: T 타입의 모든 속성을 읽기 전용으로 만듭니다.

10. `ConditionalTypes`: T 타입에 대해 조건에 따라 타입을 선택합니다.

## 문제 6

### Function Overloads

> 해결하는 과정에서 적용된 Function Overloads에 대해 더 설명해줄 수 있을까?

함수 오버로드는 타입스크립트에서 동일한 함수 이름을 가지면서 다양한 매개변수 형식 또는 반환 형식을 가진 여러 버전의 함수를 정의하는 기능이다.

함수 오버로드를 사용하면 다양한 시나리오에 대응하고 타입 안정성을 강화할 수 있다. 각각의 오버로드 시그니처는 특정한 형태의 매개변수와 반환 형식을 나타낸다. 타입스크립트 컴파일러는 함수 호출 시 전달된 인수와 오버로드된 시그니처를 비교하여 가장 일치하는 오버로드를 선택하고 해당 오버로드에 대한 타입 검사를 수행한다.

> Function Overloads를 유용하게 사용하는 코드를 알려줘.

```ts
function processInput(value: string): number
function processInput(value: number): string

function processInput(value: string | number): string | number {
  if (typeof value === 'string') {
    // 문자열을 받아서 숫자로 변환
    return parseInt(value)
  } else {
    // 숫자를 받아서 문자열로 변환
    return String(value)
  }
}

const result1 = processInput('123') // 결과: 123 (숫자)
const result2 = processInput(456) // 결과: "456" (문자열)
```

## 문제 7

### Tuple Types

튜플 타입은 포함된 요소의 수와 특정 위치에 포함된 유형을 정확하게 파악하는 또 다른 유형의 배열 타입이다.

```ts
type StringNumberPair = [string, number]
```

### Generics

> Generics에 대해 설명해줘.

`Generics`은 타입스크립트에서 재사용 가능한 컴포넌트나 함수를 작성할 때 **타입 안전성과 유연성**을 제공하기 위해 사용되는 기능이다. `Generics`를 사용하면 함수 또는 클래스에서 사용되는 타입을 인자로 받아서 재사용할 수 있다.

1. 타입 안전성: 컴파일러가 함수나 클래스 내부에서 사용되는 타입을 추론하고 확인할 수 있다.

2. 재사용성: 동일한 코드를 여러 다른 타입에 대해 재사용할 수 있다. 타입 매개변수를 사용하여 여러 타입에 대응하는 일반적인 코드를 작성할 수 있다.

3. 유연성: 코드의 유연성을 높일 수 있다. 타입 매개변수를 이용하여 함수나 클래스를 호출할 때 원하는 타입을 동적으로 지정할 수 있다.

```ts
// 함수에서의 Generics
function identity<T>(arg: T): T {
  return arg
}

const result1 = identity<string>('Hello') // 결과: 'Hello' (문자열)
const result2 = identity<number>(42) // 결과: 42 (숫자)

// 클래스에서의 Generics
class Box<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }
}

const box1 = new Box<string>('Apple')
console.log(box1.getValue()) // 출력: 'Apple' (문자열)

const box2 = new Box<number>(10)
console.log(box2.getValue()) // 출력: 10 (숫자)
```

## 문제 8

### Intersection Types

> Intersection Types에 대해 설명해줘.

교차 타입은 타입스크립트에서 두 개 이상의 타입을 결합하여 새로운 타입을 생성하는 기능이다.

```ts
type A = { name: string; age: number }
type B = { name: string; occupation: string }

type AB = A & B // { name: string; age: number; occupation: string }
```

## 문제 9

> 타입스크립트에서 `ApiResponse<T>`와 같이 제네릭을 활용한 유용한 코드에 대해 알려줘.

배열 유틸리티 함수와 제네릭

```ts
function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate)
}

function mapArray<T, R>(array: T[], transform: (item: T) => R): R[] {
  return array.map(transform)
}

// 사용 예시
const numbers = [1, 2, 3, 4, 5]

const evenNumbers = filterArray(numbers, (num) => num % 2 === 0)
console.log('Even numbers:', evenNumbers) // [2, 4]

const squaredNumbers = mapArray(numbers, (num) => num * num)
console.log('Squared numbers:', squaredNumbers) // [1, 4, 9, 16, 25]
```

> 제네릭과 관련된 유용한 코드로 한 가지만 더 알려줄 수 있을까?

제네릭 제약

제네릭 타입 매개변수에 특정 조건을 부여하여 특정 유형의 동작을 보장하거나 제한하는데 사용한다.

```ts
interface Lengthwise {
  length: number
}

// 타입 매개변수 T를 Lengthwise 인터페이스를 준수하는 유형으로 제한
function logLength<T extends Lengthwise>(item: T): void {
  console.log('Length:', item.length)
}

// 사용 예시
const array: number[] = [1, 2, 3, 4, 5]
const str: string = 'Hello, world!'
const obj: { length: number } = { length: 10 }

logLength(array) // Length: 5
logLength(str) // Length: 13
logLength(obj) // Length: 10

// 컴파일 에러
logLength(123) // Argument of type 'number' is not assignable to parameter of type 'Lengthwise'
```

> 제네릭 제약을 사용한 다른 유용한 코드도 알려줘.

키 추출하기

```ts
// T는 `object` 타입을 확장, 객체에만 적용
function extractKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}

// 사용 예시
const person = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com',
}

const keys = extractKeys(person)
console.log('Keys:', keys) // ["name", "age", "email"]
```

> 타입스크립트에서 extends는 제한이 맞아? 확장이 맞아?

타입스크립트에서 `extends` 키워드는 일반적으로 "확장"을 의미한다. 제네릭 제약에서 `extends` 키워드는 타입 매개변수가 특정 타입을 "제한" 또는 "확장"함을 나타낸다.

`extends` 키워드를 사용하여 타입 매개변수의 상위 타입을 지정함으로써, 해당 제네릭 매개변수가 특정 조건을 만족하거나 특정 유형의 속성을 가져야 한다는 **제약 조건**을 부여할 수 있다. 이를 통해 제네릭 타입의 유연성을 유지하면서 타입 안정성을 강화할 수 있다.

`T extends SomeType`라고 선언하면, `T`는 `SomeType`을 "확장"하거나 "상속"해야 한다는 의미이다. 이는 `T`가 `SomeType`의 하위 타입이거나 `SomeType`에 정의된 속성을 가져야 한다는 것을 의미한다.

다른 관점에서 `extends` 키워드는 일반적으로 "상속"을 나타내지만, 타입스크립트의 제네릭에서 `extends` 키워드는 일종의 "제한" 역할도 수행한다. 특정 유형의 제약을 부여하여 타입의 동작을 제한하는데 사용된다.

타입스크립트에서 extends 키워드는 주로 "제한" 또는 "확장"을 의미하는 것으로 이해된다. 이러한 의미는 제네릭 제약에서 `extends` 키워드를 사용할 때에만 해당되며 다른 컨텍스트에서 `extends` 키워드는 다른 의미를 갖을 수 있다.

## 문제 10

## 문제 11

> ambient-modules에 대해 설명해줘.

ambient modules은 타입스크립트에서 외부 라이브러리나 모듈의 타입을 정의하기 위해 사용되는 개념이다. 일반적으로 외부 자바스크립트 라이브러리는 타입스크립트와 함께 사용될 때 타입 정보가 부족하거나 없을 수 있다. 이때 ambient modules를 사용하여 타입 정보를 정의하고 외부 모듈을 타입 안전하게 사용할 수 있다.

ambient modules는 일반적으로 `.d.ts` 확장자를 가진 타입 선언 파일에 정의된다. 이 파일들은 주로 타입 선언만 포함하며, 구현 코드가 없다. ambient modules의 목적은 타입 정보를 제공하는 것이기 때문이다.

## 문제 12

> type MapFunction<T, U> = (value: T) => U;
>
> type MapFunction = <T, U>(value: T) => U;
>
> 다음 두 코드의 차이점에 대해 설명해줘.

`type MapFunction<T, U> = (value: T) => U;`

- 재사용 가능한 타입 정의를 작성할 수 있다.
- 해당 타입 별칭을 사용하는 곳에서 제네릭 타입 매개변수를 구체화하거나 다른 타입 정보와 결합하여 사용할 수 있다.

```ts
const myMap: MapFunction<number, string> = (value) => String(value)
```

`type MapFunction = <T, U>(value: T) => U;`

- 다른 타입의 변수에 할당하거나 다른 함수의 매개변수로 사용될 수 있다.
- 해당 제네릭 함수 타입을 다른 타입의 변수에 할당하거나 함수 타입을 요구하는 매개변수로 사용할 수 있다.

```ts
function applyMap<T, U>(value: T, mapFunction: MapFunction): U {
  return mapFunction(value)
}
```

## 문제 13

### Declaration Merging

선언 병합은 컴파일러가 동일한 이름으로 선언된 두 개의 독립된 선언을 하나의 정의로 병합하는 것을 의미한다. 병합된 정의는 원래 두 선언의 특징을 모두 가지고 있다. 두 개의 선언으로 제한되지 않고 몇 개의 선언이든지 병할할 수 있다.

> 타입스크립트에서 Declaration Merging에 대해 알려줘.

선언 병합은 여러 선언은 하나로 병합하는 기능이다. 이를 통해 동일한 이름을 가진 인터페이스, 네임스페이스, 클래스 등을 병합하여 하나의 선언으로 간주할 수 있다.

**인터페이스 병합 (Interface Merging)**: 같은 이름을 가진 인터페이스들을 병합하여 하나의 인터페이스로 간주한다. 이는 인터페이스의 속성과 메서드를 확장하고, 기존의 인터페이스르 확장할 수 있는 방법을 제공한다.

두 개의 인터페이스를 선언한다.

```ts
interface Car {
  brand: string
}

interface Car {
  color: string
}
```

Declaration Merging으로 두 인터페이스가 병합된다.

```ts
interface Car {
  brand: string
  color: string
}

const myCar: Car = {
  brand: 'Toyota',
  color: 'blue',
}
```

**네임스페이스 병합 (Namespace Merging)**: 동일한 이름을 가진 네임스페이스를 병합하여 하나의 네임스페이스로 간주한다. 이를 통해 여러 파일에 나뉘어 작성된 네임스페이스를 단일 네임스페이스로 취급할 수 있다.

```ts
namespace Utilities {
  export function trim(value: string): string {
    return value.trim()
  }
}

namespace Utilities {
  export function capitalize(value: string): string {
    return value.toUpperCase()
  }
}
```

Declaration Merging으로 두 네임스페이스가 병합된다.

```ts
namespace Utilities {
  export function trim(value: string): string {
    return value.trim()
  }

  export function capitalize(value: string): string {
    return value.toUpperCase()
  }
}
```

> namespace에 대해 설명해줘.

네임스페이스는 타입스크립트에서 코드를 구조화하고 모듈화하기 위해 사용되는 기능이다. 네임스페이스는 전역 스코프를 오염시키지 않으면서 관련된 코드를 그룹화할 수 있는 논리적인 컨테이너 역할을 한다.

```ts
namespace MyNamespace {
  export interface Person {
    name: string
    age: number
  }

  export function greet(person: Person): void {
    console.log(`Hello, ${person.name}! You are ${person.age} years old.`)
  }
}

const person: MyNamespace.Person = { name: 'Alice', age: 25 }
MyNamespace.greet(person)
```

타입스크립트 2.0버전 이상에서는 `namespace` 대신 `module` 키워드를 사용하여 모듈 시스템을 사용할 수도 있다. 모듈은 네임스페이스보다 더 강력하고 유연한 구조를 가지며 네임스페이스보다 권장되는 모듈화 방식이다. 그래도 기존 코드와의 호환성을 위해 네임스페이스를 계속해서 사용할 수 있다.

## 문제 14

## 문제 15

> {[key in K]: V} 이 코드가 잘 이해가 안되고 있어. 특히 in이 어떻게 작동하는지 중심으로 설명해줘.

제네틱 타입에서 `{[key in K]: V}`는 타입스크립트의 맵드 타입(Mapped Type) 구문이다. 이 구문은 `K` 타입에 대해 반복(iterate)하며, 각각의 키를 가지고 새로운 타입을 생성한다.

`in` 키워드는 반복(iteration)을 위해 사용되는 타입스크립트 연산자이다.

```ts
type MyMappedType<K extends string> = { [key in K]: number }

const myObj: MyMappedType<'a' | 'b' | 'c'> = {
  a: 1,
  b: 2,
  c: 3,
}

console.log(myObj)
// Output:
// { a: 1, b: 2, c: 3 }
```
