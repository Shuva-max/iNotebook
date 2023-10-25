import React, { useContext, useEffect, useRef} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import userContext from '../context/auth/userContext';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alertContext';
import { useState } from 'react';


export default function Navbar(props) {
  const location = useLocation();
  const {setNotes} = useContext(noteContext)
  const {lu1, setLu1, changePassword} = useContext(userContext)
  const {showAlert} = useContext(alertContext)
  const navigate = useNavigate()
  const refClose = useRef(null);
  const refClose2 = useRef(null);
  const ref = useRef(null);
  const [cred, setCred] = useState({expass01:'', pass02: '', cnpass02: ''})

  useEffect(()=>{

  },[lu1])

  const close =()=>{
    refClose.current.click();
    ref.current.click()
  }

  const handleChangePass = async() => {
    // console.log("pass")
    const exPass = document.getElementById('expass01').value;
    const Pass = document.getElementById('pass02').value;
    const cnPass = document.getElementById('cnpass02').value;
    if (Pass !== cnPass){
      showAlert(': Enter same password!!','warning')
    } else {
      // api call
      const status = await changePassword({pass: exPass, cnPass: cnPass});
      if(status){
        showAlert(': Password changed successfully', 'success')
      }else{
        showAlert(': Put your right credential!!!', 'danger')
      }
    }
    refClose2.current.click();
    setCred({expass01:'', pass02: '', cnpass02: ''})
  }
  const onChange = (e)=>{
    setCred({...cred, [e.target.name]:e.target.value});  //using sprade operator
  }
  const handleChangeName = () => {
    console.log("name")
  }

  let timerid
  const handleLogout = ()=>{
    localStorage.setItem('token', '')
    timerid = setTimeout(()=>{
      props.token({status: false, token: localStorage.getItem('token')})
      setLu1({name: ""})
      setNotes([])
      navigate('/')
  }, 1500);    
  }
  clearTimeout(timerid)

  return (
    <>
      <div>
        <nav id='navber001' className="navbar navbar-expand-lg navbar-light">
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
                <button className="btn btn-outline-success" type="button">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
      
      <div className="div-back-logout">
        <div className="user div-logout">
          <h5 id='userName' className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"> <i className="fa-solid fa-user"></i>{lu1?lu1.name:'userName'}</h5>
          <button id='btn-logout01' onClick={handleLogout} className="btn btn-primary btn-logout" >Logout</button>
        </div>
      </div>

      {/* offcanvas */}
<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">{lu1?lu1.name:'userName'}</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" ref={refClose}></button>
  </div>
  <div className="offcanvas-body">
    <div>
      Manage your account
    </div>
    <div className="dropdown mt-3">
      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
        menu
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a className="dropdown-item" onClick={close}>change password</a></li>
        <li><a className="dropdown-item" onClick={close}>change name</a></li>
      </ul>
    </div>
  </div>
</div>

{/* Modal */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"></button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Change Your Existing Password</h5>
        <button ref={refClose2} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Current password</label>
            <input onChange={onChange} name='expass01' value={cred.expass01} type="password" className="form-control" id="expass01"/>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">New password</label>
            <input onChange={onChange} name='pass02' value={cred.pass02} type="text" className="form-control" id="pass02"/>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Confirm new password</label>
            <input onChange={onChange} name='cnpass02' value={cred.cnpass02} type="password" className="form-control" id="cnpass02"/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleChangePass}>Change Password</button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
