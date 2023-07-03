# 연습하기

## 발행기관 (Publisher)

내부에 변화가 생길 경우 구독자에게 알린다.

## 구독자 (Subscriber)

발행기관에서 변화가 생겼을 때 하는 일을 정의한다.
발행기관을 구독한다.

## `observable`과 `observe`라는 관계로 추상화해보기

- `observable`은 `observe`에서 사용된다
- `observable`에 변화가 생기면, `observe`에 등록된 함수가 실행된다

### Object.defineProperty()

객체에 새로운 속성을 직접 정의하거나 이미 존재하는 속성을 수정한 후, 해당 객체를 반환한다.

- `object`: 속성을 정의할 객체
- `property`: 새로 정의하거나 수정하려는 속성의 이름 또는 `Symbol`
- `descriptor`: 새로 정의하거나 수정하려는 속성을 기술하는 객체
- 반환 값: `object` 객체
