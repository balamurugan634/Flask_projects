import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Navbar from './components/Navbar'
import MyBooks from './Pages/MyBooks'
import AllBooks from './Pages/AllBooks'
import { useSelector } from 'react-redux'
import Upload from './Pages/Upload'
function App() {
  const [role,setRole]=useState(null)
  const[id,setid]=useState('')
  const {currentUser}=useSelector((state)=>state.user2)
  console.log(currentUser)
useEffect(()=>{  currentUser !==null ? setRole(currentUser.role) :setRole("unknown")
  currentUser !==null && setid(currentUser.id) 
},[])
  
const student=[
    { id: 1, name: "home", path: "home" },
    { id: 2, name: "Explore", path: "explore" },
    { id: 3, name: "My books", path: `mybooks/${id}}` }
]
const admin=[
  { id: 1, name: "Dashboard", path: "dashboard" },
  { id: 2, name: "Users", path: "users" },
  { id: 3, name: "books", path: `books` },
  { id: 4, name: "Activity", path: 'activity' },

]
const unrecognized=[
  { id: 1, name: "login", path: "login" },
  { id: 2, name: "register", path: "" },
]
const renderLinks = () => {
  switch (role) {
    case "admin":
      console.log('admin')
      return <Navbar items={admin} />;
    case "customer":
      console.log('uk')

      return <Navbar items={student} />;
      
    case "unknown":
      console.log('uk')
      return <Navbar items={unrecognized} />;
    default:
      return null;
  }
};
 return (
    <BrowserRouter>
    {/* {renderLinks()} */}
    <Routes>
      {/* <Route path='/' element={<SignUp />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/home' element={<Home />} />
      <Route path='/explore' element={<AllBooks />} />
      <Route path='/mybooks' element={<MyBooks />} /> */}
      <Route path='/' element={<Upload />} />


    </Routes>
     
    </BrowserRouter>
  )
}

export default App
