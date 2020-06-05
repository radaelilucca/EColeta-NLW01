import React from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Routes from './routes'


function App() {
  return (
    <>
    <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <Routes/>
    </>
  )
}

export default App;
