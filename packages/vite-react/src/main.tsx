import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Parent from './parent.tsx'
// import Child from './child.tsx'

// const router = createBrowserRouter([
//   { path: '/', element: <Parent /> },
//   { path: '/child', element: <Child /> },
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>,
)
