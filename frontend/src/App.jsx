import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
import Upload from './Pages/Upload'
import AllEvents from './Pages/AllEvents'
import EventDetail from './Pages/EventDetail'
import MyBooking from './Pages/MyBooking'
import ViewTickets from './Pages/ViewTickets'
import TicketUpdate from './Pages/TicketUpdate'
import Dashboard from './Pages/Dashboard'
import AdminTickets from './Pages/AdminTickets'
import AdminUsers from './Pages/AdminUsers'
import AdminEvents from './Pages/AdminEvents'
import UpdateEvent from './Pages/UpdateEvent'
import AddEvent from './Pages/AddEvent'
import Footer from './components/Footer.jsx'
function App() {
  const [role, setRole] = useState(null)
  const { currentUser } = useSelector((state) => state.user)
  console.log(currentUser)
  useEffect(() => {
    currentUser !== null ? setRole(currentUser.role) : setRole("customer")
  }, [])

  // const customer = [
  //   { id: 1, name: "home", path: "home" },
  //   { id: 2, name: "Events", path: "events" },
  //   { id: 3, name: "My bookings", path: `mybooks/${id}}` }
  // ]
  // const admin=[
  //   { id: 1, name: "Dashboard", path: "dashboard" },
  //   { id: 2, name: "Users", path: "users" },
  //   { id: 3, name: "books", path: `books` },
  //   { id: 4, name: "Activity", path: 'activity' },

  // ]
  // const unrecognized=[
  //   { id: 1, name: "login", path: "login" },
  //   { id: 2, name: "register", path: "" },
  // ]
  // const renderLinks = () => {
  //   switch (role) {
  //     case "admin":
  //       console.log('admin')
  //       return <Navbar items={admin} />;
  //     case "customer":
  //       console.log('uk')

  //       return <Navbar items={student} />;

  //     case "unknown":
  //       console.log('uk')
  //       return <Navbar items={unrecognized} />;
  //     default:
  //       return null;
  //   }
  // };
  return (
    <BrowserRouter>
      {currentUser === null || !currentUser? '' : currentUser.role === 'customer' ? <Navbar />:'' }
      <Routes>
        <Route path='/login' element={<SignIn />} />
         <Route path='/home' element={<Home />} /> 
         <Route path='/addevent' element={<AddEvent />} /> 
         <Route path='/dashboard/addevent' element={<AddEvent />} />
       <Route path='/alltickets' element={<AdminTickets />} /> 
       <Route path='/dashboard/alltickets' element={<AdminUsers />} /> 
       <Route path='/allusers' element={<AdminUsers />} /> 
       <Route path='/dashboard/allusers' element={<AdminUsers />} /> 

       <Route path='/allevents' element={<AdminEvents />} /> 
       <Route path='/dashboard/allevents' element={<AdminEvents />} /> 

        <Route path='/' element={<SignUp />} />
        <Route path='/getallevents' element={<AllEvents />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/mybookings/:id" element={<MyBooking />} />
        <Route path="/eventticket/:id" element={<ViewTickets />} />
        <Route path="/updateticket/:id" element={<TicketUpdate />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/updateevent/:id" element={<UpdateEvent />} />




      </Routes>
      
      {currentUser === null || !currentUser? '' : currentUser.role === 'customer' ? <Footer />:'' }
    </BrowserRouter>
  )
}

export default App
