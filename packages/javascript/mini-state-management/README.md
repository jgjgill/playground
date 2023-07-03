# 프록시 활용하기

```js
let proxy = new Proxy(target, handler)
```

- `target` - 감쌀 객체.
- `handler` - `target`의 행동을 통제할 메서드들을 포함한 객체. `handler` 객체 안에 메서드들은 트랩이라고 불린다.

## get() 트랩

## set() 트랩
