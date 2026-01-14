import { useState } from 'react'
import './style/App.css'
import NavBar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './Components/AddTask';
import List from './Components/List';
import UpdateTask from './Components/UpdateTask';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Protected from './Components/Protected';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar />
      <Routes>
        <Route path='/' element={<Protected><List /></Protected>} />
        <Route path='/add' element={<Protected><AddTask /></Protected>} />
        <Route path='/update/:id' element={<UpdateTask />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
