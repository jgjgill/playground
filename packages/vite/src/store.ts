class CounterStore {
  private state: number = 0
  private listeners = new Set<VoidFunction>()

  private notifyAll = () => this.listeners.forEach((notify) => notify())

  subscribe = (dispatcher: VoidFunction) => {
    this.listeners.add(dispatcher)

    return () => this.listeners.delete(dispatcher)
  }

  getState = () => {
    return this.state
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

const counterStore = new CounterStore()
