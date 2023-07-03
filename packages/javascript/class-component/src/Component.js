export class Component {
  targetElement
  state

  constructor(targetElement) {
    this.targetElement = targetElement
    this.setup()
    this.render()
    this.setEvent()
  }

  setup() {}
  template() {
    return ''
  }
  render() {
    this.targetElement.innerHTML = this.template()
  }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.render()
  }
}
