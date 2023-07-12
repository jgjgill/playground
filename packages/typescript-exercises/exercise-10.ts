//

/**
 * 모든 데이터 요청 기능을 다시 구현하고 싶지 않습니다.
 * 이전 콜백 기반 함수를 새로운 Promise 호환 결과로 장식해 보세요.
 * 마지막 함수는 최종 데이터(예: users 또는 admins)로 직접 resolve 되거나 에러(또는 타입 에러)를 reject 하는 Promise를 반환해야 합니다.
 *
 * 함수의 이름은 promisify 이어야 합니다.
 *
 * 난이도 높은 보너스 연습: 함수가 있는 객체를 받고 각 함수가 약속된(promisified) 새 객체를 반환하는 함수 "promisifyAll" 함수를 생성합니다.
 *
 * 그에 따라 api 생성 다시 쓰기: const api = promisifyAll(oldApi)
 */

interface User {
  type: 'user'
  name: string
  age: number
  occupation: string
}

interface Admin {
  type: 'admin'
  name: string
  age: number
  role: string
}

type Person = User | Admin

const admins: Admin[] = [
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
]

const users: User[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
]

export type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

type CallbackBasedAsyncFunction<T> = (
  callback: (response: ApiResponse<T>) => void,
) => void

type PromiseBasedAsyncFunction<T> = () => Promise<T>

export function promisify<T>(
  fn: CallbackBasedAsyncFunction<T>,
): PromiseBasedAsyncFunction<T> {
  return () =>
    new Promise<T>((reslove, reject) => {
      fn((res) => {
        if (res.status === 'success') {
          reslove(res.data)
        } else {
          reject(new Error(res.error))
        }
      })
    })
}

type SourceObject<T> = { [K in keyof T]: CallbackBasedAsyncFunction<T[K]> }
type PromisifiedObject<T> = { [K in keyof T]: PromiseBasedAsyncFunction<T[K]> }

export function promisifyAll<T extends { [key: string]: any }>(
  obj: SourceObject<T>,
): PromisifiedObject<T> {
  const result: Partial<PromisifiedObject<T>> = {}
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[key] = promisify(obj[key])
  }
  return result as PromisifiedObject<T>
}

const oldApi = {
  requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
    callback({
      status: 'success',
      data: admins,
    })
  },
  requestUsers(callback: (response: ApiResponse<User[]>) => void) {
    callback({
      status: 'success',
      data: users,
    })
  },
  requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
    callback({
      status: 'success',
      data: Date.now(),
    })
  },
  requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
    callback({
      status: 'error',
      error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
    })
  },
}

export const api = promisifyAll(oldApi)

function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === 'admin' ? person.role : person.occupation
    }`,
  )
}

async function startTheApp() {
  console.log('Admins:')
  ;(await api.requestAdmins()).forEach(logPerson)
  console.log()

  console.log('Users:')
  ;(await api.requestUsers()).forEach(logPerson)
  console.log()

  console.log('Server time:')
  console.log(`   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`)
  console.log()

  console.log('Coffee machine queue length:')
  console.log(`   ${await api.requestCoffeeMachineQueueLength()}`)
}

startTheApp().then(
  () => {
    console.log('Success!')
  },
  (e: Error) => {
    console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`)
  },
)
