import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import { createRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Connect2ICProvider } from '@connect2ic/react'
import { BrowserRouter } from 'react-router-dom'
import { createClient } from '@connect2ic/core'
import { defaultProviders } from '@connect2ic/core/providers'

const queryClient = new QueryClient()
const client = createClient({
  providers: defaultProviders,
})
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <Connect2ICProvider client={client}>
          <App />
        </Connect2ICProvider>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>,
)
