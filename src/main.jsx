import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PluginGate } from './components/PluginGate'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PluginGate>
      <App />
    </PluginGate>
  </React.StrictMode>,
)
