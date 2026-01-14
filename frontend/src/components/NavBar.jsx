import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "../style/navbar.css";

function NavBar() {
  const [login, setLogin] = useState(localStorage.getItem('login'));
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('login')
    setLogin(null)
    setIsOpen(false)
    setTimeout(() => {
      navigate('/login')
    }, 0)
  }

  useEffect(() => {
    const handleStorage = () => {
      setLogin(localStorage.getItem('login'))
    }
    window.addEventListener("localStorage-change", handleStorage)

    return () => {
      window.removeEventListener("localStorage-change", handleStorage)
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className='navbar'>
      <div className='logo'>To Do App</div>

      {login && (
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        </button>
      )}

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        {login ? <>
          <li><Link to="/" onClick={() => setIsOpen(false)}>List</Link></li>
          <li><Link to="/add" onClick={() => setIsOpen(false)}>Add Task</Link></li>
          <li><Link onClick={logout}>Logout</Link></li>
        </> : null}

      </ul>
    </nav>
  )
}

export default NavBar;