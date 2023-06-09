# 함수형 프로그래밍

## 정의

함수형 프로그래밍은 애플리케이션, 함수의 구성 요소,
더 나아가 언어 자체를 함수처럼 여기도록 만들고,
이러한 **함수 개념을 가장 우선순위**에 놓는다.

> **함수형 사고방식**은 문제의 해결 방법을 **동사**(함수)들로 **구성**(조합)하는 것

### 함수를 가장 우선순위에 놓는 프로그래밍

```js
// 데이터(객체) 기준
duck.moveLeft()
duck.moveRight()
dog.moveLeft()
dog.moveRight()

// 함수 기준
moveLeft(dog)
moveRight(duck)
moveLeft({ x: 5, y: 2 })
moveRight(dog)
```

## 사이드 이펙트

- 값이 전역으로 변한다. (변수, 속성, 데이터 구조, ...)
- 함수 전달인자의 원래 값이 변한다.
- 예외를 발생시킨다.
- 화면에 출력되거나 로깅(logging)된다.
- 외부 과정이 발생한다.
- 사이드 이펙트를 가지는 다른 함수들을 유발한다.

다음 코드는 사이드 이펙트가 발생한다.

```js
let count = 0

let increment = function() {
  cont++
  return count
}
```

`count` 변수는 `function` 밖에 위치한다.

### 개선된 코드

```js
let increment = function(count) {
  return count + 1
}
```

## 사이드 이펙트의 단점

- 코드를 예측하기 어렵게 만든다.
- 디버깅하기 어렵게 만든다.

## 사이드 이펙트는 반드시 일어난다

함수형 프로그래밍의 목표는 단지 사이드 이펙트를 잘 피하도록 관리하는 것이다.
사이드 이펙트를 사용하면서 우리의 목표를 달성할 수 있다.
하지만, 사이드 이펙트를 광범위하게 사용하면 문제가 발생한다.
그래서, **사이드 이펙트를 관리**하는 것이 중요하다.

함수형 프로그래밍에서 사이드 이펙트를 관리하는 한 가지 방법은 사이드 이펙트를 가지는 코드를 같이 포함시키는 것이다.
그렇게 함으로써 모든 다른 것들은 사이드 이펙트를 가지지 않게 된다.

## 순수 함수

- 함수는 제공된 `input`에 의존하며 변화하는 외부 데이터에는 의존하지 않는다.
- 함수는 사이드 이펙트를 유발하지 않는다. 스코프를 넘어서 변화를 발생시키지 않는다.
- 같은 `input`이 주어지면, 함수는 항상 같은 결과를 반환한다.

## 일급 함수

```js
var f1 = function(a) { return a * a }
console.log(f1)
// ƒ (a) { return a * a }
```

변수에 함수가 담길 수 있다.

```js
function f2(f) {
  return f()
}

f2(function () {
  return 10
})
// 10
```

함수가 함수를 전달인자로 받을 수 있다.

언제 평가해도 상관없는 순수 함수들을 많이 만든다.
순수 함수들을 값으로 들고 다니며 적절한 시점에 평가한다.

## 고차 함수

## 응용 함수

함수가 함수를 받아서 원하는 시점에 해당하는 함수가 알고 있는 전달인자를 적용하는 방식이다.

## 다형성

메서드는 객체지향 프로그래밍이다.
메서드는 해당 클래스에 정의되기 때문에 해당 클래스의 인스턴스에서만 사용 가능하다.
그래서 평가 순서가 굉장히 중요하게 작용하며 형(다형성)을 다루기 어려운 부분들이 존재한다.
반면 함수가 기준이 되는 함수형 프로래밍에서는 함수를 먼저 만들고 함수에 맞는 데이터를 구성해서 함수에 적용한다.
데이터가 생기지 않아도 함수 자체는 먼저 존재하게 된다.
이는 높은 다형성을 가지며 평가 시점이 유연하고 실용적인 형태를 만들게 한다.

예외적인 데이터가 들어오는 경우에 대해 **다형성을 높이는 방법**으로 해결하기도 한다.
엄격한 형체크나 `try...catch`문을 적극적으로 사용하는 것이 아니라 흘려 보내는 방식으로 적절한 답들을 내도록 코드를 설계하는 것이다.
이런 방식으로 데이터를 다루는 것도 실용적이며 안전하다.

## 불변성

함수형 프로그래밍에서는 **불변성(immutability)**을 추구한다.

## 함수 합성

### compose

함수들이 오른쪽에서 왼쪽으로 실행된다.

```js
const compose = function(...fns) {
  return function(x) {
    return fns.reduceRight(function(v, f) {
      return f(v)
    }, x)
  }
}
```

### pipe

함수들이 왼쪽에서 오른쪽으로 실행된다.

```js
const pipe = function(...fns) {
  return function(x) {
    return fns.reduce(function(v, f) {
      return f(v)
    }, x)
  }
}
```

### 함수 vs 프로시저

## 컬렉션 중심 프로그래밍

### 수집하기

대표 함수는 `map`이 있다.
`map`을 활용하여 `values`와 `pluck` 같은 함수를 만든다.

### 거르기

대표 함수는 `filter`가 있다.
`filter`를 활용하여 `reject`와 `compact` 같은 함수를 만든다.

### 찾아내기

대표 함수는 `find`가 있다.
`find`를 활용하여 `find_index`, `some`, `every` 같은 함수를 만든다.

### 접기

대표 함수는 `reduce`가 있다.
`reduce`를 활용하여 `min_by`, `max_by`, `group_by`, `count_by` 같은 함수를 만든다.

## 액션 - 계산 - 데이터

## 지연 평가

## 커링

- 함수를 구체화시켜준다.
- 함수 합성을 쉽게 해준다.

### curry

```js
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArgs) {
      var args = [...prevArgs, nextArgs]
      if (args.length >= arity) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  })([])
}
```

## 데이터 흐름 프로그래밍
