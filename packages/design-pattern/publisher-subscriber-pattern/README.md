# 발행자-구독자 패턴

서로에게 직접 의존하지 않고 서로 통신할 수 있는 모듈을 만들 수 있는 패턴이다.
애플리케이션을 분리하는데 좋은 패턴이다.

## 옵저버 패턴과의 차이점

- 옵저버 패턴에 비해 상대적으로 결합도가 낮다.
- 중간에 `Message Broker` 또는 `Event Bus`가 존재한다.

## Custom Event

DOM 이벤트를 생성하고 전송하는 방법이다.
이러한 이벤트들은 브라우저 자체에서 발생되는 이벤트와는 대조적으로 합성 이벤트라고 불린다.

이벤트들은 `Event` 생성자를 사용하여 생성될 수 있다.

```js
const event = new Event('build')

// Listen for the event.
elem.addEventListener(
  'build',
  (e) => {
    /* … */
  },
  false,
)

// Dispatch the event.
elem.dispatchEvent(event)
```

`EventTarget.dispatchEvent()` 메서드를 사용한다.

`Event` 생성자는

### CustomEvent()

더 많은 데이터를 이벤트 객체에 더하기 위해 `CustomEvent` 인터페이스가 존재하고 `detail` 속성에 커스텀 데이터를 전달할 수 있다.

```js
const event = new CustomEvent('build', { detail: elem.dataset.time })
```

```js
function eventHandler(e) {
  console.log(`The time is: ${e.detail}`)
}
```
