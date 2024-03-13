# 마이크로 상태 관리 3

## 리액트 컨텍스트와 구독을 이용한 컴포넌트 상태 공유

- 컨텍스트는 **하위 트리에 전역 상태 제공**, 컨텍스트 공급자 중첩 가능
  - 리액트 컴포넌트 생명 주기 내에서 `useState`와 같은 훅으로 전역 상태 제어
- 구독을 사용하면 단일 컨텍스트로는 불가능한 **리렌더링 문제 해결**

### 모듈 상태의 한계

- 모듈 상태는 리액트 컴포넌트 외부에 존재하는 전역으로 정의된 싱글턴
- 컴포넌트 트리나 하위 트리마다 다른 상태를 가질 수 없다는 한계
- 스토어를 지원하려고 할 때마다 추가되는 컴포넌트
- 이상적으로 `Counter`는 재사용 가능해야 하지만 **모듈 상태는 리액트 외부에서 정의되기 때문에 불가능**

```js
const store = createStore({ count: 0 })
const store2 = createStore({ count: 0 })
```

> `props`에 `store`를 넣으면 `Count` 컴포넌트를 재사용할 수 있지 않을까?

- `prop drilliing` 발생
- 모듈 상태를 소개한 주된 이유 중 하나는 `prop drilling`을 피하기 위한 것

#### 아쉬운 코드

```js
const Count = ({ store }) => {
  const [state, setState] = useStore(store)
  const inc = () => {
    setState((prev) => ({
      ...prev,
      count: prev.count + 1,
    }))
  }

  return (
    <div>
      {state.count} <button onClick={inc}>+1</button>
    </div>
  )
}
```

#### 이상적인 의사 코드

- `Counter` 컴포넌트를 다른 스토어에서 재사용 가능

```js
const Component = () => (
  <StoreProvider>
    <Counter />
    <Counter />
  </StoreProvider>
)

const Component2 = () => (
  <Store2Provider>
    <Counter />
    <Counter />
  </Store2Provider>
)

const Component3 = () => (
  <Store3Provier>
    <Counter />
    <Counter />
  </Store3Provier>
)
```

- 리액트 컨텍스트를 사용하기에 적합한 곳

### 컨텍스트 사용이 필요한 시점

- 공급자가 없는 컨텍스트와 기본값을 사용하는 공급자 컨텍스트의 차이점은 없음
- 모듈 상태는 트리의 최상위에 하나의 컨텍스트 공급자가 있는 사용 사례를 대체할 수 있음
  - 전역 상태를 위한 컨텍스트는 **서로 다른 하위 트리에 서로 다른 값을 제공해야 하는 경우에만 필요**

### 컨텍스트와 구독 패턴

- 하나의 컨텍스트를 사용해 전역 상태 값을 전파하는 것은 **불필요한 리렌더링 발생**
- 구독을 이용한 모듈 상태는 리렌더링 문제는 없지만 **전체 컴포넌트 트리에 대해 하나의 값만 제공**

- `useSubscription`을 통해 컨텍스트와 구독의 이점을 활용, 연결고리 역할?
- 컴포넌트가 특정 스토어 객체에 연결돼 있지 않다는 점에 주목, 직접적인 의존성 제거?

[use-subscription](https://www.npmjs.com/package/use-subscription)

## 전역 상태 관리 라이브러리 소개

### 전역 상태 관리 문제 해결하기

- 첫 번째 문제점은 **전역 상태를 읽는 방법**
- 두 번째 문제점은 **전역 상태에 값을 넣거나 갱신하는 방법**

#### 클로저 예시

```js
const createContainer = () => {
 let state = { a: 1, b: 2 }
 const getState = () => state
 const setState = (...) => { ... }

 return { getState, setState }
}

const globalContainer = createContainer()
globalContainer.setState(...)
```

### 데이터 중심 접근 방식과 컴포넌트 중심 접근 방식 사용하기

#### 데이터 중심 접근 방식

- 모듈 상태가 리액트 외부 자바스크립트 메모리에 존재
- 모듈 상태는 리액트가 렌더링 시작하기 전이나 모든 리액트 컴포넌트가 마운트 해제된 후에도 존재

#### 컴포넌트 중심 접근 방식

- 컴포넌트를 먼저 설계
- 특정 시점에 컴포넌트는 공유 정보에 접근 가능
- 컴포넌트 생명 주기 내에서 전역 상태를 유지하는 것이 적합

#### 리렌더링 최적화

- 리렌더링 최적화의 핵심은 컴포넌트에서 `state`의 어느 부분이 사용될지 지정하는 것
- `state`의 일부분을 지정하는 접근 방식
  - 선택자 함수 사용
  - 속성 접근 감지
  - 아톰 사용

##### 선택자 함수

- 컴포넌트의 어느 부분을 사용할지 명시적으로 지정
- 수동 최적화
- `useSelector`

```js
const Component = () => {
  const value = useSelector((state) => state.b.c)
  return <>{value}</>
}
```

##### 속성 접근 감지

- 속성 접근을 감지하고 감지한 정보를 렌더링 최적화에 사용
- 상태 사용 추적
- `useTrackedState`

```js
const Component = () => {
  const trackedState = useTrackedState()
  return (
    <>
      <p>{trackedState.b.c}</p>
      <p>{trackedState.e.g}</p>
    </>
  )
}
```

> `useSelector`와 `useTrackedState`의 차이?

```js
const Component = () => {
  const isSmall = useSelector((state) => state.a < 10)
  return <>{isSmall ? 'small' : 'big'}</>
}
```

```js
const Component = () => {
  const isSmall = useTrackedState().a < 10
  return <>{isSmall ? 'small' : 'big'}</>
}
```

#### 아톰 사용

- 아톰은 리렌더링을 발생시키는데 사용되는 최소 상태 단위
- 수동 최적화와 자동 최적화의 중간 정도
- 아톰과 파생 값의 정의는 명시적이지만 의존성 추적은 자동

```js
const globalState = {
  a: atom(1),
  b: atom(2),
  c: atom(3),
}

const Component = () => {
  const value = useAtom(globalState.a)
  return <>{value}</>
}
```
