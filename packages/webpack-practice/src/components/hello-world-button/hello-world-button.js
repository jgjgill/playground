import './hello-world-button.scss'

export default class HelloWorldButton {
  buttonCssClass = 'hello-world-button'

  render() {
    const button = document.createElement('button')
    button.innerHTML = 'Hello world'
    button.classList.add(this.buttonCssClass)

    button.onclick = function () {
      const p = document.createElement('p')
      p.innerHTML = 'Hello world'
      p.classList.add('hello-world-text')
      body.append(p)
    }

    const body = document.querySelector('body')
    body.append(button)
  }
}
