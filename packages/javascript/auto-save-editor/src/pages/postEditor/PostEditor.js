export default function PostEditor({
  parentElement,
  initialState = { title: '', content: '' },
  onEditing,
}) {
  const postEditorElement = document.createElement('div')
  parentElement.append(postEditorElement)

  postEditorElement.innerHTML = `
  <input type="text" name="title" style="width: 600px;" />
  <div contenteditable="true" name="content" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px;"></div>
  `

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState

    this.render()
  }

  postEditorElement.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    }

    this.setState(nextState)
    onEditing(this.state)
  })

  postEditorElement.querySelector('[name=content]').addEventListener('input', (e) => {
    console.log(e.target.innerHTML)
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    }

    this.setState(nextState)
    onEditing(this.state)
  })

  this.render = () => {
    // const richContent = this.state.content
    //   .split('\n')
    //   .map((line) => {
    //     if (line.indexOf('# ') === 0) {
    //       return `<h1>${line.substring(2)}</h1>`
    //     } else if (line.indexOf('## ') === 0) {
    //       return `<h2>${line.substring(3)}</h2>`
    //     } else if (line.indexOf('### ') === 0) {
    //       return `<h3>${line.substring(4)}</h3>`
    //     }
    //     return line
    //   })
    //   .join('<br>')

    postEditorElement.querySelector('[name=title]').value = this.state.title
    postEditorElement.querySelector('[name=content]').innerHTML = this.state.content
  }
}
