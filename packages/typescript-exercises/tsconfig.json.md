# tsconfig.json

## strict

엄격한 타입 검사 활성화, 아래 옵션들을 자동으로 활성화

기본: `false`

- `noImplicitAny`: 암시적 `any` 타입 불가
- `noImplicitThis`: 암시적 `this` 타입 불가
- `strictNullChecks`: 엄격한 `null`, `undefined` 타입 검사
- `strictFunctionTypes`: 엄격한 함수의 매개변수 타입 검사
- `strictPropertyInitialization`: 엄격한 클래스의 속성 초기화 검사
- `strictBindCallApply`: 엄격한 `bind`, `call`, `apply` 메서드의 인수 검사

## target

컴파일될 ES(JS) 버전을 명시

권장: `ES2015`

선택: `ES5`, `ES6`, `ES2015`, `ES2016`, `ES2017`, ...

## lib

컴파일에서 사용할 라이브러리 지정

`target` 옵션에 따라 자동으로 지정

추천: [`ESNext`, `DOM`, `DOM.Iterable`]

## module

사용할 모듈 방식 지정

선택: `CommonJS`, `ES6`, `ES2015`, `ES2020`, `ESNEXT`, ...

- `ES2020`: `import()`, `import.meta.url` 사용
- `ESNext`: 가장 최신의 모듈 방식 사용

## moduleResolution

컴파일러가 사용할 모듈 해석 방식 지정

추천: `node` / `bundler`

선택: `classic`, `node`, `nodenext`, `bundler`, ...

- `nodenext`: Node.js의 ES 모듈 지원
- `bundler`: Vite, esbuild, Webpack, Parcel 등 최신 번들러를 사용하는 경우 (>= 5.0)

## jsx

- `react-jsx`: JSX 변경, `.js` 파일로 출력 (`_jsx`), React@17 이상
- `react-jsxdev`: JSX 변경, `.js` 파일로 출력 (`_jsxDEV`), React@17 이상
- `react`: JSX 변경, `.js` 파일로 출력 (`React.createElement`)
- `react-native`: JSX 변경 없이, `.js` 파일로 출력
- `preserve`: JSX 변경 없이, `.jsx` 파일로 출력
