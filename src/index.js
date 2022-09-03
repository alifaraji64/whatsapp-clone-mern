import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import ContactsProvider from './contexts/ContactsProvider'
import ConversationsProvider from './contexts/ConversationsProvider'
import SocketProvider from './contexts/SocketProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SocketProvider>
      <ContactsProvider>
        <ConversationsProvider>
          <App />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
