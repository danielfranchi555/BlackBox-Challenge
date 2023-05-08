import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { Context } from './components/Context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Context>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </Context>
  
  </React.StrictMode>,
)
