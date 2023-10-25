import React, { useEffect, useState } from 'react';
import NoteState from "./context/notes/NoteState";
import UserState from "./context/auth/UserState";
import AlertState from './context/AlertState';

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Alert from "./components/Alert";
import Auth from './components/Auth';
import { Routes, Route, useNavigate } from "react-router-dom";
import Spinner from './components/Spinner';

function App() {

  const [token, setToken] = useState({status:false, token:''})
  const [load, setLoad] = useState({status: false})
  const navigate = useNavigate();
  // const [render, setRender] = useState(false)

  useEffect(()=>{
    const stServer = async()=>{
      const response = await fetch('https://inotebookbackend-tyuv.onrender.com/api/auth/stserver', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        }
      });
      const json = await response.json();
      // console.log(json);    
      if(json.path === '/stserver'){
        setLoad({status: true})
        // console.log(load.status)
      }
    }
    stServer();
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    if(token.token !== '' ){
      // console.log('this is from naviagte useEffect', token.token)
      navigate('/usernotes')
    }
  }, [token.token])

  // const {alert} = useContext(alertContext)

  return (
    <>
      <NoteState>
      <UserState>
      <AlertState>

          <div className="App">

            { !load.status && <Spinner /> }

          {!token.status && load.status && <Auth token={setToken} /> }

            {token.status && load.status && <Navbar token={setToken} /> }

            {/* Alert component */}
            {token.status && load.status && <div className="" style={{height:'59px', position: 'sticky', top:'46px', zIndex: 1}}>
              <Alert />
            </div>}

            <div className="container">
            <Routes>

                <Route path='/' element={<div></div>} />
                {token.status && <Route path="/usernotes" element={<Home />} /> }
                {token.status && <Route exact path="/about" element={<About/> } /> }
                
              </Routes>
            </div>
          </div>
        
          </AlertState>
        </UserState>
      </NoteState>
    </>
  );
}

export default App;
