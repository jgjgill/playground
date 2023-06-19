# 자바스크립트 주요 문법

## 변수

var, let

## 상수

const

## 호이스팅

## 자료형

Number, String, Boolean, Object, Array, Function, Undefined, Null

## undefined와 Null의 차이

- `undefined`: 값이 정의되지 않는 상태
- `null`: 해당 변수가 비어있음을 나타낼 때 사용자가 의도적으로 사용

## 메모리

- 할당 -> 사용 -> 해제
- 변수 선언
- 변수의 고유 식별자 생성, 메모리의 주소 및 값 할당
- 값이 아닌 메모리 주소에 초점
- 원시 타입은 변경이 불가능하여 원시 타입의 값이 변경되면 새로운 메모리 할당

### 가상 머신

자바스크립트 엔진은 가상 머신으로 구성

메모리 모델로 `Heap`과 `Call stack`으로 구성

- `Heap`: 참조 타입
- `Call stack`: 원시 타입

### Garbage Collector

사용하지 않는 메모리 해제

**Mark and Sweep Algorithm**

닿을 수 없는 주소를 더 이상 필요없는 주소로 정의하고 지우는 알고리즘

## 표현식

표현식: 어떠한 결과 값으로 평가되는 식으로 원시 값을 포함하여 변수, 상수, 함수 호출 등으로 조합

## 연산자

- 할당 연산자: 오른쪽 표현식을 왼쪽 피연산자 값에 할당
- 비교 연산자: 좌측 피연산자와 우측 피연산자를 비교 (true or false 반환)
- 산술 연산자: 덧셈, 뺼셈, 곱셈, 나눗셈을 하는 연산자 (Number 반환)
- 비트 연산자: 비트를 직접 조작
- 논리 연산자: Boolean을 통해 참과 거짓을 검증
- 삼항 연산자: 조건에 따라 값을 선택
- 관계 연산자: 객체에 속성이 있는지 확인
- typeof 연산자: 피연산자의 타입을 반환 (문자열로 반환)

## 흐름 제어

### Control Flow

- 조건문
  - if
  - switch
- 반복문
  - for
  - while

### Data Flow

## 배열

## 객체

## 스코프

유효범위, 변수가 어느 범위까지 참조되는지 파악

- 전역 스코프
- 지역 스코프

## 클로저

함수가 선언된 환경의 스코프를 기억하여 함수가 스코프 밖에서 실행될 때에도 기억한 스코프에 접근할 수 있게 만드는 문법

### 은닉화

클로저를 이용하여 내부 변수와 함수를 은닉

## 브라우저에 URL을 입력하면 발생하는 일

### 1. URL 해석

### 2. DNS 조회

### 3. 해당 IP가 존재하는 서버로 이동

### 4. ARP를 이용하여 MAC 주소 변환

### 5. TCP 통신을 위해 Socket 오픈

### 6. 서버는 응답을 반환

### 브라우저 렌더링

## 컴퓨터 시간

### 협정 셰계시 (UTC)

### 컴퓨터가 시간을 표현하는 방법

- 하드웨어의 **시스템 쿨럭**을 사용
- 특정 시간(Epoch)을 기준으로 시스템 쿨럭의 틱을 세는 것으로 구현, **시스템 시간**
- 시스템 시간을 값으로 표현, **타임스탬프**
- 타임스탬프는 운영체제마다 기준 시간과 단위 차이
- 유닉스 계열 운영체제에서 시간을 표시하는 방법은 **Unix Time**

### 시스템 클럭

- RTC(Real Time Clock) 모듈 사용
- RTC는 메인보드에 붙어있어 전원을 끄더라도 계속 작동
- RTC는 카운터 회로를 통해 클럭 발생
  - 카운터 회로의 핵심 부품인 결정 진동자가 만든 정확한 주파수 이용
  - 1클럭에 32.768kHz (1초 계산 편이)

### Unix Time

- 1970년 1월 1일 0시 0분 0초가 기준 시각
- 1970년 이전 시간은 음수로 표현
- 초 단위로 시간 증가

### 현재 시간을 알아내는 방법

- 시스템 시간을 네트워크 타임 프로토콜(NTP)를 통해 동기화
- NTP 서버에 네트워크 요청을 하여 현재 시간 받음
- NTP 서버는 계층으로 이루어져 있으며 그 계층을 Stratum이라 지칭
- 최상위 계층을 PRC(Primary Reference Clock)이라 지칭

## 암호화

- 평문(Plaintext)을 해독할 수 없는 암호문(Ciphertext)로 변환
- 단방향(해싱)과 양방향 암호화 존재

### 단방향 암호화

- 해시 알고리즘을 이용하여 **평문을 복호화할 수 없는 형태**로 암호화
- 대표적으로 MDS, SHA 알고리즘

**단방향 암호화에서 고려할 점**

- 복호화가 불가능하지만 Rainbow Table을 통해 원문을 알아낼 수 있음
  - Rainbow Table은 평문과 해시 함수로 만든 문자열을 모두 저장시켜 놓은 표
- 암호화된 데이터를 탈취당하더라도 원문을 알아낼 수 없도록 조치
  - Salt: 평문에 임의의 문자열을 추가하여 암호화
  - Key stretching: 해시를 여러 번 반복

### 양방향 암호화

- **평문을 복호화할 수 있는 형태**로 암호화
- 대칭키를 이용하는 AES와 비대칭키를 이용하는 RSA로 구분
  - 대칭키 암호 알고리즘: 같은 키를 이용하여 암호화와 복호화 가능
  - 비대칭키 암호 알고리즘: 공개키와 개인키, 두 가지 키 존재

## 모듈

- 항상 use strict로 실행
- 모듈 레벨 스코프가 존재
- 단 한 번만 평가
- 지연 실행

## 유니코드

값으로 이루어진 문자와 글꼴이 만나 렌더링 엔진을 통해 그려짐

### CSS (Coded Character Set)

- 문자들을 Code Point에 대응시켜 만든 코드화된 문자들의 집합
- Code Point는 Character의 식별자

### CES (Character Encoding Scheme)

- CSS를 octet(8bit) 집합에 대응시킨 것
- CSS와 CES는 1:1로 대응
- 인코딩에 해당
  - 인코딩: Character를 시스템이 인식할 수 있는 값으로 변환
  - 디코딩: 인코딩된 값을 다시 Character로 변환

### TES (Transfer Encoding Syntax)

- 인코딩한 문자가 특정 프로토콜을 타고 전송되도록 변환하는 것

서로 다른 인코딩 방식을 사용하면서 호환성과 확장성에 문제 -> 유니코드 등장

### 유니코드 - CCS

- Surrogate Pair 방법을 이용해 2바이트보다 큰 문자 표현

### 유니코드 - CES

- Code point가 어떤 단위로 조합되어 인코딩되는지 정의
- Big-Endian과 Little-Endian은 컴퓨터 메모리에 저장된 바이트의 순서
  - Big-Endian: 큰 쪽에서 작은 쪽으로 저장
  - Little-Endian: 작은 쪽에서 큰 쪽으로 저장
- BOM (Byte Order Mark): 문서 제일 앞에 U+FEFF를 삽입하여 애플리케이션이 바이트 순서를 알 수 있게 해줌

## DOM

DOM 트리 순회는 전위순회(PreOrder)로 이루어진다.

### 문서 노드

- 최상위 노드, DOM 트리의 시작점

### 요소 노드

- HTML 태그 그자체, 문서 구조 표현,

### 속성 노드

- 요소 노드에 붙어있는 노드, 자식 노드가 아닌 태그에 정의된 속성들이 속성 노드에 속함

### 텍스트 노드

- 요소의 텍스트 표현, 자식 노드를 가질 수 없어 DOM트리의 단말 노드

### DOM 트리 렌더링

**Attachment**

- 브라우저는 HTMLD을 읽고 파싱한 후 DOM 트리 구성
- StyleSheets 파싱하여 스타일 규칙을 만들어 CSSOM 트리 구성, DOM 요소에 스타일 추가

**Render Tree**

- DOM 트리와 CSSOM 트리 결합하여 Reder Tree 구성
- Layout(Reflow) 과정을 통해 DOM 노드 위치 지정

**Paint**

**Display**

### DOM 선택

**getElementById**

DOM 트리에서 요소 노드를 id로 찾는다. 제일 먼저 찾은 요소 하나 반환.

**getElementsByClassName**

DOM 트리에서 요소 노드를 class로 찾는다. 일치하는 모든 요소 반환.

**getElementsByTagName**

DOM 트리에서 요소 노드를 태그 이름으로 찾는다. 일치하는 모든 요소 반환.

**querySelector**

DOM 트리에서 요소 노드를 CSS Selector 문법으로 찾는다. 제일 먼저 찾은 요소 하나 반환.

**querySelectorAll**

DOM 트리에서 요소 노드를 CSS Selector 문법으로 찾는다. 일치하는 모든 요소 반환. 사용하기에 가장 편한 방식.

**window.[id]**

id가 있는 요소는 window 객체를 통해 찾을 수 있다. 여러 개라면 리스트로 반환.

### DOM 탐색

**parentNode**

선택한 요소 노드의 부모 노드를 불러온다. document의 부모 노드는 null.

**firstElementNode**

선택한 요소 노드의 자식 요소 노드 중 첫 번째를 불러온다. 없을 경우 null 반환.

**children**

선택한 요소 노드의 자식 요소 노드를 불러온다. 없을 경우 빈 배열 반환.

**nextElementSibling**

선택한 요소 노드의 다음 형제 요소 노드를 불러온다. 없을 경우 null 반환.

**previousElementSibling**

선택한 요소 노드의 이전 형제 요소 노드를 불러온다. 없을 경우 null 반환.

### DOM 조작

**class 접근**

선택한 요소 노드에서 className과 classList로 요소의 class 속성을 불러오고 변경.

**hasAttribute**

선택한 요소 노드에서 속성을 가지고 있는지 확인.

**getAttribute**

선택한 요소 노드에서 속성의 값 반환. 없다면 null 반환.

**setAttribute**

선택한 요소 노드에서 속성 정의.

**removeAttribute**

선택한 요소 노드에서 속성 제거.

**textContent**

선택한 요소 노드에서 텍스트 노드 접근, 변경

**innerHTML**

선택한 요소 노드에서 내부 HTML 수정. XSS 위험.

**createElement**

요소 노드 생성

**appendChild**

선택한 요소 노드 마지막 자식 요소로 추가

**removeChild**

선택한 요소 노드 자식 노드 중 해당하는 요소 제거

## Virtual DOM

- 브라우저 렌더링 과정은 많은 시간을 소요
- Virtual DOM은 실제 DOM 트리를 자바스크립트 객체로 구성
- 직접 DOM을 수정하지 않고 Virtual DOM에서 바뀐 부분만 수정한 후 렌더링

## 명령형 프로그래밍

- 컴퓨터가 수행할 명령들을 순서대로 써놓은 것
- "어떻게 구현하는가"를 디테일하게 기술하는 관점

```js
const double = (arr) => {
  const result = []

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2)
  }

  return result
}
```

## 선언형 프로그래밍

- "무엇을 구현하는가"를 기술하는 관점

```js
const double = (arr) => {
  return arr.map((n) => n * 2)
}
```

## 쿠키

## Local Storage

## Module

### export, import

- 스크립트 의존성을 간편하게 관리

## 비동기

### callback

- 특정 코드의 연산이 끝날떄까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행

```js
function request(url, successCallback, failCallback) {
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', (e) => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successCallback(JSON.parse(xhr.responseText))
      } else {
        failCallback(xhr.statusText)
      }
    }
  })
  xhr.addEventListener('error', (e) => failCallback(xhr.statusText))

  xhr.open('GET', url)
  xhr.send()
}
```

### Promise

- `resolve`, `reject`
- `then`, `catch`, `finally`

```js
const promise = new Promise((resolve, reject) => {
  // promise 내부에서 비동기 상황이 종료될 때, resolve 함수 호출
  // promise 내부에서 오류 상황일 때, reject 함수 호출
})
```

```js
function request(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(xhr.statusText)
        }
      }
    })
    xhr.addEventListener('error', () => reject(xhr.statusText))

    xhr.open('GET', url)
    xhr.send()
  })
}
```

**`Promise.all`**

- **`Promise.race`**

- 여러 `Promise` 중 하나라도 `resolve` 혹은 `reject` 되면 종료

**`Promise.any`**

- 여러 `Promise` 중 하나라도 `resolve`되면 종료

**`Promise.allSettled`**

- 여러 `Promise`들이 성공했거나 실패했거나 상관없이 모두 이행된 경우를 처리

### async, await

### fetch api

- `xmlHTTPRequest`을 대체
- `Promise` 기반으로 동작
- fetch는 HTTP 에러가 발생해도 `reject`되지 않음
- 네트워크나 요청이 완료되지 못한 경우에만 `reject`
- 서버 요청 중 에러가 생겼을 경우에도 `then`으로 떨어지므로, `response`의 상태 코드(status code)가 `ok`인지 체크해주는 것이 좋음
