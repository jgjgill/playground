export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState
  this.$target = document.createElement('nav')
  $app.appendChild(this.$target)

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.onClick = onClick
  this.onBackClcik = onBackClick

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === 'FILE' ? './assets/file.png' : './assets/directory.png'

          return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" />
            <div>${node.name}</div>
          </div>
        `
        })
        .join('')

      this.$target.innerHTML = !this.state.isRoot
        ? `
          <div class="Node"><img src="/assets/prev.png"></div>
          ${nodesTemplate}
        `
        : nodesTemplate
    }

    this.$target.addEventListener('click', (e) => {
      const $node = e.target.closest('.Node')

      if ($node) {
        const { nodeId } = $node.dataset

        if (!nodeId) {
          this.onBackClcik()
          return
        }

        const selectedNode = this.state.nodes.find((node) => node.id === nodeId)
      }
    })

    this.$target.querySelectorAll('.Node').forEach(($node) => {
      $node.addEventListener('click', (e) => {
        const { nodeId } = e.target.dataset

        if (!nodeId) {
          this.onBackClcik()
        }

        const selectedNode = this.state.nodes.find((node) => node.id === nodeId)

        if (selectedNode) {
          this.onClick(selectedNode)
        }
      })
    })
  }

  this.render()
}
