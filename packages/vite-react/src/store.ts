class Observable<TState> {
  private listeners = new Set<VoidFunction>()

  constructor(protected state: TState) {
    this.state = state
  }

  protected notifyAll = () => this.listeners.forEach((notify) => notify())

  subscribe = (listener: VoidFunction) => {
    this.listeners.add(listener)

    return () => this.listeners.delete(listener)
  }

  getState = () => {
    return this.state
  }
}

class CounterStore extends Observable<number> {
  constructor(initialState = 0) {
    super(initialState)
  }

  increase = () => {
    this.state += 1
    this.notifyAll()
  }

  decrease = () => {
    this.state -= 1
    this.notifyAll()
  }
}

export const counterStore = new CounterStore()
