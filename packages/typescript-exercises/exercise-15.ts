// 객체를 조작하는 것을 돕는 라이브러리가 있습니다. 타입을 작성하려고 했지만 실패했습니다. 도와주세요!

export class ObjectManipulator<T extends {}> {
  constructor(protected obj: T) {}

  public set<K extends string, V>(
    key: K,
    value: V,
  ): ObjectManipulator<T & { [key in K]: V }> {
    return new ObjectManipulator({ ...this.obj, [key]: value }) as ObjectManipulator<
      T & { [key in K]: V }
    >
  }

  public get<K extends keyof T>(key: K) {
    return this.obj[key]
  }

  public delete<K extends keyof T>(key: K): ObjectManipulator<Omit<T, K>> {
    const newObj = { ...this.obj }
    delete newObj[key]
    return new ObjectManipulator(newObj)
  }

  public getObject(): T {
    return this.obj
  }
}
