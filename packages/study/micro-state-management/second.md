# 마이크로 상태 관리 2

## Time Slicing

> Time Slicing is a technique in React Fiber that enables React to split rendering work into smaller tasks, which can be performed during idle periods.

- `React`가 렌더링 작업을 더 작은 작업으로 분할하여 `idle` 시간 동안 수행할 수 있게 해주는 `React Fiber`의 기술
- 집중적인 렌더링 작업을 수행할 때에도 메인 스레드의 응답성을 유지

출처: [Time Slicing](https://reintech.io/term/optimize-performance-time-slicing)

> We’ve built a generic way to ensure that high-priority updates don’t get blocked by a low-priority update, called time slicing.

우선 순위가 높은 업데이트가 우선순위가 낮은 업데이트에 의해 차단되지 않도록 하는 일반적인 방법

출처: [Sneak Peek: Beyond React 16](https://legacy.reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)

- React state

  - Hierarchical
  - Only exists in components
  - Can be manipulated by React (time slicing + Suspense)

- External state

  - Independent of the component hierarchy
  - Can be used entirely outside components or any UI at all
  - Cannot be manipulated by React

> There's a lot of reasons why people use external stores, and React simply cannot address all of those (based on time, intent, and API design). That feels like it could lead to a sort of split in the ecosystem.

- 외부 스토어를 사용하는 데에는 여러 이유가 존재 (시간, 의도, API 설계, ...)
- `React`가 모든 것을 해결할 수 없음 -> 일종의 생태계 분열?

출처: [time slicing with react state managers 답변](https://github.com/reactwg/react-18/discussions/124#discussioncomment-2368780)

## useMutableSource → useSyncExternalStore

> Our goal is for all subscription-based libraries to migrate their implementations to useSyncExternalStore.

### Deopt

- `time slicing`을 비활성화하고 완전 동기식으로 되돌려 렌더링 차단
- 새로 고침 전이 중에 백그라운드에서 새 데이터가 로드될 때까지 기다리지 않고 UI를 숨기고 `fallback`으로 대체하기
