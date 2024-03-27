# 마이크로 상태 관리 5

## 사용 사례 시나리오 3: Valtio

- `mutating update model`
- 모듈 상태용으로 사용
- 리액트와의 통합을 위해 프록시를 사용

  - **변경 불가능한 스냅샷** 가져오는 형태

- 프록시를 활용해 자동으로 리렌더링 최적화
  - 선택자 필요하지 않음 (zustand와의 차이?)
- 상태 사용 추적 기법 (state usage tracking)
  - 상태의 어느 부분이 사용되는지 감지
  - 사용된 부분이 변경될 경우에만 리렌더링

```js
++moduleState.count
```

리액트에서 작동하게 만들기 → **프록시** 사용

- 자바스크립트의 특수한 객체
- 객체 연산을 감지하기 위한 핸들러를 만드는데 활용 가능

```js
const proxyObject = new Proxy(
  {
    count: 0,
    text: 'hello',
  },
  {
    set: (target, prop, value) => {
      console.log('start setting', prop)
      target[prop] = value
      console.log('end setting', prop)
    },
  },
)
```

### 프록시를 활용한 변경 감지 및 불변 상태 생성하기

- 프록시를 사용해 변경 가능한 객체에서 변경 불가능한 객체 생성
  - 불변 객체를 스냅샷이라고 함

```js
import { proxy } from 'valtio'

const state = proxy({ count: 0 })
```

- 불변 객체를 생성하려면 `snapshot` 함수를 사용

```js
import { snapshot } from 'valtio'

const snap1 = snapshot(state)
```

- `Object.freeze`로 동결

```js
const state2 = proxy({
  obj1: { c: 0 },
  obj2: { c: 0 },
})

const snap21 = snapshot(state2)

++state2.obj1.c

const snap22 = snapshot(state2)
```

`snap21 !== snap22`
`snap21.obj2 === snap22.obj2`

- 참조가 동일하다는 것은 메모리를 공유한다는 의미
- 필요한 경우에만 스냅샷을 생성해서 메모리 사용량 최적화

- Zustand에서도 수행 가능
  - 하지만 새로운 불변 상태를 적절하게 생성하는 것은 개발자의 책임
- 반면 최적화를 내부에서 실행
  - 개발자가 새 불변 상태를 생성하는 책임에서 자유로움

### 프록시를 활용한 리렌더링 최적화

- `useSnapshot`
  - `snapshot` 함수와 이를 감싸는 다른 프록시를 기반
  - `snapshot` 프록시는 `proxy` 함수에서 사용되는 프록시와 다른 목적
    - `snapshot` 프록시는 스냅샷 객체의 속성 접근을 감지하는데 사용

### 이 접근 방식의 장단점

- 멘탈 모델
- 두 가지 상태 업데이트 모델
  - 불변 갱신 (리액트)
  - 변경 가능한 갱신 (자바스크립트)
- 두 모델을 혼동하지 않도록 주의
- Valtio의 상태와 리액트의 상태를 명확하게 분리

Zustand와 비교할 때 다음과 같다.

Valtio

```js
const Component = ({ showText }) => {
  const snap = useSnapshot(state)
  return (
    <>
      {snap.count} {showText ? snap.text : ''}
    </>
  )
}
```

```js
const Component = ({ showText }) => {
  const count = useStore((state) => state.count)
  const text = useStore((state) => (showText ? state.text : ''))

  return (
    <>
      {count} {text}
    </>
  )
}
```

- 프록시 기반 렌더링 최적화는 예측 가능성이 떨어짐
- 프록시는 렌더링 최적화를 내부적으로 처리하기 때문에 동작을 디버깅하기 어려움

## 사용 사례 시나리오 4: React Tracked

- 속성 감지 기반으로 자동으로 렌더링 최적화
- 상태 사용 추적 라이브러리

### React Tracked 이해하기

- 상태 관리 기능을 제공하지는 않음
- 렌더링 최적화 기능 제공
  - 이 기능을 상태 사용 추적이라고 함
  - 상태 사용 추적의 사용 사례 중 하나는 리액트 컨텍스트

```js
const NameContext = createContext([
 { firstName: 'react', lastName: 'hooks' },
 () => {},
)
```

- 배열을 초깃값으로 설정한 이유는 사용 상태의 반환 값과 일치시키기 위해
- 리렌더링 최적화의 문제

```js
const useFirstName = () => {
  const [{ firstName }] = useTracked()
  return firstName
}
```

- `useTracked`는 상태를 프록시로 감싸고 사용을 추적

```js
const useValue = () => useState({ count: 0, text: 'hello' })
```

- 사용자 정의 훅을 만들어서 `typeof` 연산자 활용

```ts
const StateContext = createContext<ReturnType<typeof useValue | null>>(null)
```

## 기타

### Zustand와 Valtio 비교

<https://daishi.gumroad.com/p/hackdiary-061#comments>

### Zustand, context 언제 사용해야 할까?

<https://twitter.com/tannerlinsley/status/1293645778532016128>
