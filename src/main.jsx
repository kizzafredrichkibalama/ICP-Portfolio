import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import { createRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
