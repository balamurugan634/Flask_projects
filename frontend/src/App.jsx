import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/home' element={<Home />} />


    </Routes>
     
    </BrowserRouter>
  )
}

export default App
