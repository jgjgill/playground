function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  }

  const breadcrumb = new BreadCrumb({
    $app,
    initialState: this.state.depth,
  })

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: (node) => {
      if (node.type === 'DIRECTORY') {
      } else if (node.type === 'FILE') {
      }
    },
  })

  this.setState = (nextState) => {
    this.state = nextState
    breadcrumb.setState(this.state.depth)
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    })
  }

  const init = async () => {
    try {
      const rootNodes = await request()
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      })
    } catch (err) {
      throw new Error(`무언가 잘못되었습니다! ${err.message}`)
    }
  }
}
