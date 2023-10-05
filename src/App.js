import React, {useEffect, useState} from 'react';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import About from "./components/About";
// import Alert from "./components/Alert";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { useState } from "react";
import Auth from './components/Auth';
import UserState from "./context/auth/UserState";

function App() {

  const [token, setToken] = useState({status:false, token:''})
  const navigate = useNavigate();
  useEffect(()=>{
    if(token.token !== ''){
      console.log('this is from naviagte useEffect', token.token)
      navigate('/usernotes')
    }
  }, [token.token])

  return (
    <>
      <NoteState>
      <UserState>
          <div className="App">
          {!token.status && <Auth token={setToken} /> }

            {token.status && <Navbar userName={'userName'} /> }
            {/* <div className="alert">
              <Alert alert={alert}/>
            </div> */}
            <div className="container">
            <Routes>

                <Route path='/' element={<div></div>} />
                {token.status && <Route exact path="/usernotes" element={<Home />} /> }
                {token.status && <Route exact path="/about" element={<About/> } /> }
                
              </Routes>
            </div>
          </div>
        
        </UserState>
      </NoteState>
    </>
  );
}

export default App;
