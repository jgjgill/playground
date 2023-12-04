import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryPage } from './components/tanstack-query/QueryPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryPage />
    </QueryClientProvider>
  )
}

export default App
