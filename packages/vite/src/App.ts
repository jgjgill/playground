export class App {
  targetElement: Element

  constructor(targetElement: Element) {
    this.targetElement = targetElement
    this.template()
  }

  template() {
    this.targetElement.innerHTML = `
      <div>app입니다.</div>
    `
  }

  render() {
    console.log(123)
  }
}
