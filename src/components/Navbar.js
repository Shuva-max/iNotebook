import React, { useContext, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import userContext from '../context/auth/userContext';
import noteContext from '../context/notes/noteContext';

export default function Navbar(props) {
  const location = useLocation();
  const {setNotes} = useContext(noteContext)
  const navigate = useNavigate()

  const {lu1, setLu1} = useContext(userContext)
  useEffect(()=>{

  },[lu1])

  let timerid
  const handleLogout = ()=>{
    localStorage.setItem('token', "")
    timerid = setTimeout(()=>{
      props.token({status: false, token: localStorage.getItem('token')})
      setLu1({name: ""})
      setNotes([])
      navigate("/")
  }, 2000);    
  }
  clearTimeout(timerid)

  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <span className="navbar-brand" >iNotebook</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/usernotes'?'active':""}`} aria-current="page" to="/usernotes">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/about'?'active':""}`} aria-current="page" to="/about">About</Link>
        </li>
        
        
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </div>
    <div className="user div-logout">
      <h5 id='userName'> <i className="fa-solid fa-user"></i>{lu1?lu1.name:'userName'}</h5>
      <button onClick={handleLogout} className="btn btn-primary btn-logout" >Logout</button>
    </div>

    </>
  )
}
