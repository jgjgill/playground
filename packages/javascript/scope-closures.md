# What's the Scope?

> JS is in fact parsed/compiled in a separate phase before execution begins.

JS는 실제로 실행이 시작되기 전에 별도의 단계로 구문 분석/컴파일된다.
스코프 구조의 결과는 일반적으로 런타임 환경의 영향을 받지 않는다.

JS 객체는 그 자체로 일급 클래스 값이다. (숫자나 문자열처럼 부여되거나 건네질 수 있음)
이러한 함수들은 변수들을 보유하고 접근하기 때문에 함수들이 끝내 실행되는 프로그램과 상관없이 원래 스코프를 유지한다.
이것이 **클로저**이다.

모듈은 모듈의 내부 스코프에 숨겨진 변수와 함수에 (클로저를 통해)접근할 수 있는 공개 메서드를 통해 특정되는 코드 구성 패턴이다.

## Compiled vs Interpreted

코드 컴파일은 코드의 텍스트를 처리하여 컴퓨터가 이해할 수 있는 명령 목록으로 변환되는 일련의 단계이다.
일반적으로 전체 소스 코드는 한 번에 변환되고 그 결과로 나온 명령어들은 나중에 실행될 수 있는 출력(output)으로 저장된다.

`interpreted`와 `compiled`의 차이점은 무엇일까?

공통점

- 프로그램을 기계가 이해할 수 있는 명령으로 변환한다.

차이점

- `compiled` 프로그램은 모든 것을 한 번에 변환한다.
- `interpreted` 프로그램은 한 줄씩 변환한다. 각 라인이 소스 코드의 다음 줄이 처리되기 전에 즉시 실행된다.

![compilation-interpretation](./imgs/compilation-interpretation.png)

`interpretation`은 소스 코드 텍스트에서 한 줄씩 작동하는 것 외에도 다른 형태를 취할 수 있다.
현대의 JS 엔진은 실제로 JS 프로그램을 처리할 때 `compilation`과 `interpretation`의 다양한 변형을 사용합니다.

JS는 컴파일된 언어로 정확하게 묘사된다.

## Compilling Code

JS가 `compiled` 여부가 중요한가?
