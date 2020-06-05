import React from 'react'

import {Route, BrowserRouter} from 'react-router-dom'
import CreatePoint from './pages/CreatePoint'
import Home from './pages/Home'


export default function Routes(){

  return (
    <BrowserRouter>
    <Route path='/' exact component={Home}/>
    <Route path='/cadastro' component={CreatePoint}/>       
    </BrowserRouter>
  )
}