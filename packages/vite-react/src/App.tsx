import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryPage } from './components/tanstack-query/QueryPage'
import ConcurrentPage from './components/concurrent-practice/ConcurrentPage'
import OverlayPage from './components/overlay/OverlayPage'
import { OverlayProvider } from '@toss/use-overlay'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <QueryPage />
        <ConcurrentPage />
        <OverlayPage />
      </OverlayProvider>
    </QueryClientProvider>
  )
}

export default App
