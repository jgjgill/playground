import BreadCrumb from './BreadCrumb'
import Loading from './Loading'
import Nodes from './Nodes'

const cache = {}

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  }

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath, // selectedNodeImage
  })

  this.setState = (nextState) => {
    this.state = nextState

    breadcrumb.setState(this.state.depth)
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    })
    imageView.setState(this.state.selectedFilePath)
    loading.setState(this.state.isLoading)
  }

  const loading = new Loading({ $app, initialState: this.state.isLoading })

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
    onClick: async (node) => {
      try {
        if (node.type === 'DIRECTORY') {
          if (cache[node.id]) {
          }
          const nextNodes = await request(node.id)
          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          })
        } else if (node.type === 'FILE') {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
          })
        }
      } catch (err) {
        throw new Error(`무언가 잘못되었습니다. ${err.message}`)
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state }
        nextState.depth.pop()
        const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth.at(-1).id

        if (prevNodeId === null) {
          const rootNodes = await request()
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          })
        } else {
          const prevNodes = await request(prevNodeId)

          this.setState({
            ...nextState,
            isRoot: false,
            nodes: prevNodes,
          })
        }
      } catch (err) {
        throw new Error(`무언가 잘못되었습니다. ${err.message}`)
      }
    },
  })

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      })
      const rootNodes = await request()
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      })
    } catch (err) {
      throw new Error(`무언가 잘못되었습니다! ${err.message}`)
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      })
    }
  }

  init()
}
