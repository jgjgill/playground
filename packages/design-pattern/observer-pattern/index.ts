/**
 * 주제(Subject) 인터페이스는 관리하는 구독자들에 대한 메서드 집합을 선언한다.
 */
interface Subject {
  // 관찰자를 주제에 연결
  attach(observer: Observer): void

  // 주제로부터 관찰자 분리
  detach(observer: Observer): void

  // 이벤트에 관한 모든 관찰자 알림
  notify(): void
}

/**
 * 상태가 변할 때 주제는 몇 가지 중요한 상태를 소유하고 관찰자들에게 알린다.
 */
class ConcreteSubject implements Subject {
  /**
   * @type {number} 단순함을 위해, 모든 구독자들에 필수적인 주제의 상태는 변수에 저장된다.
   */

  public state: number

  /**
   * @type {Observer[]} 구독자 목록. 실제 상황에서 구독자 목록은 포괄적으로 저장될 수 있다.
   */

  private observers: Observer[] = []

  /**
   * 구독 관리 메서드
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    console.log('Subject: Attached an observer.')
    this.observers.push(observer)
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this.observers.splice(observerIndex, 1)
    console.log('Subject: Detached an observer.')
  }

  /**
   * 각 구독자에게 업데이트 트리거
   */
  public notify(): void {
    console.log('Subject: Notifying observers...')
    for (const observer of this.observers) {
      observer.update(this)
    }
  }

  /**
   * 일반적으로 구독 로직은 주제가 실제로 수행하는 작업의 일부에 불과하다.
   * 주제는 일반적으로 중요한 비즈니스 로직을 가진다.
   * 이 논리는 중요한 일이 발생할 때마다 알림 방법을 트리거한다.
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.")
    this.state = Math.floor(Math.random() * (10 + 1))

    console.log(`Subject: My state has just changed to: ${this.state}`)
    this.notify()
  }
}

/**
 * 관찰자 인터페이스는 주제가 사용하는 업데이트 메서드를 선언한다.
 */
interface Observer {
  update(subject: Subject): void
}

/**
 * 구체적인 관찰자들은 첨부된 주제에 의해 발행된 업데이트들에 반응한다.
 */
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log('ConcreteObserverA: Reacted to the event.')
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log('ConcreteObserverB: Reacted to the event.')
    }
  }
}

/**
 * 클라이언트 코드
 */

const subject = new ConcreteSubject()

const observer1 = new ConcreteObserverA()
subject.attach(observer1)

const observer2 = new ConcreteObserverB()
subject.attach(observer2)

subject.someBusinessLogic()
subject.someBusinessLogic()

subject.detach(observer2)

subject.someBusinessLogic()
