# 클래스

## constructor

인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수한 메서드
`constructor`는 인스턴스의 생성과 동시에 클래스 필드의 생성과 초기화를 실행한다.

## 클래스 필드 (class field)

- 클래스 내부의 캡슐화된 변수를 말하며 데이터 멤버 또는 멤버 변수라고 부른다.
- 클래스 필드는 인스턴스의 프로퍼티 또는 정적 프로퍼티가 될 수 있다.

`constructor` 내부에서 선언한 클래스 필드는 클래스가 생성할 인스턴스를 가리키는 `this`에 바인딩한다.
이로써 클래스 필드는 클래스가 생성할 인스턴스의 프로퍼티가 되며,
클래스와 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다.
즉 언제나 `public`이다.

## Class field declarations proposal

```js
class Foo {
  x = 1 // Field declaration
  #p = 0 // Private field
  static y = 20 // Static public field
  static #sp = 30 // Static private field
  // 2019/5 : Chrome 미구현
  // static #sm() {    // Static private method
  //   console.log('static private method');
  // }

  bar() {
    this.#p = 10 // private 필드 참조
    // this.p = 10; // 새로운 public p 필드를 동적 추가한다.
    return this.#p
  }
}

const foo = new Foo()
console.log(foo) // Foo&nbsp;{#p: 10, x: 1}

console.log(foo.x) // 1
// console.log(foo.#p); // SyntaxError: Undefined private field #p: must be declared in an enclosing class
console.log(Foo.y) // 20
// console.log(Foo.#sp); // SyntaxError: Undefined private field #sp: must be declared in an enclosing class
console.log(foo.bar()) // 10
```

## getter, setter

### getter

클래스 필드에 접근할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 때 사용한다.
`getter`는 메서드 이름 앞에 `get` 키워드를 사용해 정의한다.
이때 메서드 이름은 클래스 필드 이름처럼 사용된다.
`getter`는 호출 하는 것이 아닌 프로퍼티처럼 참조하는 형식으로 사용하며 참조 시에 메서드가 호출된다.
`getter`는 이름 그대로 무언가를 취득할 때 사용되므로 반드시 무언가를 반환해야 한다.

### setter

클래스 필드에 값을 할당할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 때 사용한다.
`setter`는 메서드 이름 앞에 `set` 키워드를 사용해 정의한다.
이때 메서드 이름은 클래스 필드 이름처럼 사용된다.
`setter`는 호출 하는 것이 아닌 프로퍼티처럼 참조하는 형식으로 사용하며 참조 시에 메서드가 호출된다.

## 정적 메서드

`static` 키워드를 사용한다.
클래스의 인스턴스가 아닌 클래스 이름으로 호출한다.
따라서 클래스의 인스턴스를 생성하지 않아도 호출할 수 있다.

클래스의 정적 메서드는 인스턴스로 호출할 수 없다.
이것은 정적 메서드는 `this`를 사용할 수 없다는 것을 의미한다.
일반 메서드 내부에서 `this`는 클래스의 인스턴스를 가리키며,
메서드 내부에서 `this`를 사용한다는 것은 클래스의 인스턴스 생성을 전제로 하는 것이다.

정적 메서드는 클래스 이름으로 호출하기 때문에 클래스의 인스턴스를 생성하지 않아도 사용할 수 있다.
메서드 내부에서 `this`를 사용할 필요가 없는 메서드는 정적 메서드로 만들 수 있다.
정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수를 생성할 때 주로 사용한다.

## 클래스 상속

### extends 키워드

부모 클래스를 상속받는 자식 클래스를 정의할 때 사용한다.

오버라이딩: 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식
오버로딩: 매개변수의 타입 또는 갯수가 다른, 같은 이름의 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식

### super 키워드

부모 클래스를 참조할 때 또는 부모 클래스의 `constructor`를 호춣할 때 사용한다.
