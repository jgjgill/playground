import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryPage } from './components/tanstack-query/QueryPage'
import ConcurrentPage from './components/concurrent-practice/ConcurrentPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryPage />
      <ConcurrentPage />
    </QueryClientProvider>
  )
}

export default App
