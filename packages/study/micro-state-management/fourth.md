# 마이크로 상태 관리 4

## 사용 사례 시나리오 1: Zustand

- 불변 상태 모델 및 구독이라는 아이디어를 중심으로 설계된 작고 가벼운 라이브러리

- 선택자 기반 렌더링 최적화
  - 선택자 함수를 명시적으로 작성하기 때문에 동작을 정확히 예측
  - 단점으로 객체 참조에 대한 이해 필요

### 읽기 상태와 갱신 상태

- 읽기 상태: 리렌더링을 최적화하기 위해 선택자 함수 사용
- 쓰기 상태: 불변 상태 모델 기반

```js
const countObj = { value: 0 }

const Component = () => {
 const [count, setCount] = useState(countObj)
 const handleClick = () => {
  setCount(countObj)
 }

 useEffect(() => {
  console.log("component updated")
 }

 return (
  <>
   {count.value}
   <button onClick={handleClick}>Update</button>
  </>
 )
}
```

객체 참조가 동일하면 리액트는 `countObj` 값이 변경되지 않는다고 추측

```js
const handleClick = () => {
  countObj.value += 1
  setCount(countObj)
}
```

`Zustand` 상태 모델은 이러한 객체 불변성 규칙과 완전히 일치

## 사용 사례 시나리오 2: Jotai

- 아톰: 원자, 최소 단위

- `Zustand` 와 달리 컴포넌트 상태 사용
- `Zustand` 와 마찬가지로 불변 상태 모델

- 내부적으로 컨텍스트 사용
- 아톰 자체는 값을 가지지 않음
  - 모듈 상태와 달리 한 번 정의한 아톰을 재사용 가능
- 배열 구조로 리렌더링 최적화 기법 (Atoms-in-Atom)

### 구문 단순성

```js
const count Atom = atom(0)
```

```js
const Counter1 = () => {
  const [count, setCount] = useAtom(countAtom)
  const inc = () => setCount((c) => c + 1)
  return (
    <>
      {count} <button onClick={inc}>+1</button>
    </>
  )
}

const Counter2 = () => {
  const [count, setCount] = useAtom(countAtom)
  const inc = () => setCount((c) => c + 1)
  return (
    <>
      {count} <button onClick={inc}>+1</button>
    </>
  )
}

const App = () => (
  <>
    <div>
      <Counter1 />
    </div>
    <div>
      <Counter2 />
    </div>
  </>
)
```

- 공급자가 따로 필요하지 않음

  - 컨텍스트의 '기본 스토어'로 인해 가능
  - 서로 다른 하위 트리에 대해 각각 다른 값을 제공해야 하는 경우 공급자를 선택적으로 사용

- 구문 단순성은 훌륭하지만 새로운 기능을 제공하는 것은 아님

### 동적 아톰 생성

- 아톰은 리액트 컴포넌트 생명주기에서 생성되거나 소멸
- 다중 컨텍스트 접근 방식에서는 새로운 상태를 추가하는 것은 새로운 `Provider` 컴포넌트를 추가한다는 것을 의미

  - 리액트 컴포넌트 생명주기에서 생성되거나 소멸되는 것이 불가능

- `Jotai` 의 스토어는 기본적으로 아톰 구성 객체와 아톰 값으로 구성된 `WeakMap` 객체
- 아톰 구성 객체는 `atom` 함수로 생성
- 아톰 값은 `useAtom` 훅이 반환하는 값
- `Jotai` 의 구독은 아톰 기반, `useAtom` 훅이 `store` 에 있는 특정 아톰을 구독한다는 것을 의미

### 렌더링 최적화

```js
const firstNameAtom = atom('React')
const lastNameAtom = atom('Hooks')
const ageAtom = atom(3)
```

```js
const PersonComponent = () => {
  const [firstName] = useAtom(firstNameAtom)
  const [lastName] = useAtom(lastNameAtom)
  return (
    <>
      {firstName} {lastName}
    </>
  )
}
```

- 아톰은 리렌더링을 감지하는 단위
- 아톰은 원시 타입만큼 작게 만드는 것이 가능

  - 조작해야 할 아톰이 많을 수 있다는 것을 의미

- 파생 아톰: 기존 아톰에서 또 다른 아톰을 만드는 개념

```js
const personAtom = atom((get) => ({
  firstName: get(firstNameAtom),
  lastName: get(lastNameAtom),
  age: get(ageAtom),
}))
```

- `read` 함수(`atom` 함수의 첫 번째 인수로 들어가는 함수)는 다른 아톰을 참조하고 그 값을 가져올 수 있는 `get` 이라는 인수를 받음
- 파생 아톰의 값은 `read` 함수의 결과

### Jotai가 아톰 값을 저장하는 방식 이해하기

- `Jotai` 는 컨텍스트 사용
- 아톰 구성은 값을 가지지 않는 정의일 뿐이므로 재사용 가능
- `Provider` 컴포넌트는 리액트 컴포넌트 생명 주기에서 동적으로 사용 가능
- 구현 측면에서 `Jotai` 는 컨텍스트 기반이기에 컨텍스트가 할 수 있는 모든 것을 `Jotai` 가 할 수 있음

### 배열 구조 추가하기

- 아톰 속 아톰들 (Atoms-in-Atom)
  - 아톰 구성을 다른 아톰 값에 넣는 패턴

```js
type Todo = {
 title: string
 done: boolean
}

type TodoAtom = PrimitiveAtom<Todo>

const todoAtomsAtom = atom<TodoAtom[]>([])
```

- 아톰 구성은 문자열로 평가될 때 유일한 식별자(unique identifier; UID)를 반환

- 배열 아톰은 아톰이 요소인 배열을 보관하는데 사용
- 배열에 새로운 요소를 추가하려면 새로운 아톰을 생성해서 추가
- 아톰 구성은 문자열로 평가할 수 있으며 UID를 반환
- 요소를 렌더링하는 컴포넌트는 각 컴포넌트에서 아톰 요소 사용
  - 이를 통해 요소의 값을 쉽게 변경 가능
  - 리렌더링 문제 해결

### Jotai의 다양한 기능 사용하기

- 쓰기 가능한 파생 아톰
  - `write` 함수
- 액션 아톰
  - 상태를 변경하는 코드를 위해 함수 또는 함수 집합을 만드는 경우
