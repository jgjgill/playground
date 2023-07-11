export default function Nodes({ targetElement, initialState, onClick, onPrevClick }) {
  const nodesElement = document.createElement('div')
  targetElement.append(nodesElement)
  nodesElement.classList.add('Nodes')

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  nodesElement.addEventListener('click', (e) => {
    const nodeElement = e.target.closest('.Node')
    const { id } = nodeElement.dataset

    if (!id) {
      // 뒤로가기 처리
    }

    const node = this.state.nodes.find((node) => node.id === id)

    if (node) {
      onClick(node)
    } else {
      onPrevClick()
    }
  })

  this.render = () => {
    const { isRoot, nodes } = this.state

    nodesElement.innerHTML = `
      ${
        isRoot
          ? ''
          : '<div class="Node"><img src="https://cdn.roto.codes/images/prev.png" /></div>'
      }
      ${nodes
        .map(
          (node) =>
            `${`
            <div class="Node" data-id="${node.id}">
              <img src="${
                node.type === 'DIRECTORY'
                  ? 'https://cdn.roto.codes/images/directory.png'
                  : 'https://cdn.roto.codes/images/file.png'
              }" />
              ${node.name}
            </div>`}`,
        )
        .join('')}
    `
  }
}
