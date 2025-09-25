import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BookingProvider } from './context/BookingContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>
)
