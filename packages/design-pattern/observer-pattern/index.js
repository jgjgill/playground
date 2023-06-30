/**
 * 상태가 변할 때 주제는 몇 가지 중요한 상태를 소유하고 관찰자들에게 알린다.
 */
var ConcreteSubject = /** @class */ (function () {
    function ConcreteSubject() {
        /**
         * @type {number} 단순함을 위해, 모든 구독자들에 필수적인 주제의 상태는 변수에 저장된다.
         */
        /**
         * @type {Observer[]} 구독자 목록. 실제 상황에서 구독자 목록은 포괄적으로 저장될 수 있다.
         */
        this.observers = [];
    }
    /**
     * 구독 관리 메서드
     */
    ConcreteSubject.prototype.attach = function (observer) {
        var isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }
        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    };
    ConcreteSubject.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }
        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    };
    /**
     * 각 구독자에게 업데이트 트리거
     */
    ConcreteSubject.prototype.notify = function () {
        console.log('Subject: Notifying observers...');
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    /**
     * 일반적으로 구독 로직은 주제가 실제로 수행하는 작업의 일부에 불과하다.
     * 주제는 일반적으로 중요한 비즈니스 로직을 가진다.
     * 이 논리는 중요한 일이 발생할 때마다 알림 방법을 트리거한다.
     */
    ConcreteSubject.prototype.someBusinessLogic = function () {
        console.log("\nSubject: I'm doing something important.");
        this.state = Math.floor(Math.random() * (10 + 1));
        console.log("Subject: My state has just changed to: ".concat(this.state));
        this.notify();
    };
    return ConcreteSubject;
}());
/**
 * 구체적인 관찰자들은 첨부된 주제에 의해 발행된 업데이트들에 반응한다.
 */
var ConcreteObserverA = /** @class */ (function () {
    function ConcreteObserverA() {
    }
    ConcreteObserverA.prototype.update = function (subject) {
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    };
    return ConcreteObserverA;
}());
var ConcreteObserverB = /** @class */ (function () {
    function ConcreteObserverB() {
    }
    ConcreteObserverB.prototype.update = function (subject) {
        if (subject instanceof ConcreteSubject &&
            (subject.state === 0 || subject.state >= 2)) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    };
    return ConcreteObserverB;
}());
/**
 * 클라이언트 코드
 */
var subject = new ConcreteSubject();
var observer1 = new ConcreteObserverA();
subject.attach(observer1);
var observer2 = new ConcreteObserverB();
subject.attach(observer2);
subject.someBusinessLogic();
subject.someBusinessLogic();
subject.detach(observer2);
subject.someBusinessLogic();
