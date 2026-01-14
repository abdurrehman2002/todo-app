import { useState } from 'react'
import './style/App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Protected from './components/Protected';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Listing from './components/Listing';


function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar />
      <Routes>
        <Route path='/' element={<Protected><Listing /></Protected>} />
        <Route path='/add' element={<Protected><AddTask /></Protected>} />
        <Route path='/update/:id' element={<UpdateTask />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
