import React from 'react'
import ReactDOM from 'react-dom/client'
import { DialogProvider } from 'react-hook-dialog'
import App from './App'
import PromptDialog from './components/promptDialog'
import { dialogs } from './hooks/dialog'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DialogProvider dialogs={dialogs}>
      <App />
      <PromptDialog />
    </DialogProvider>
  </React.StrictMode>,
)
