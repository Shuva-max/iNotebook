import React from 'react';
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
// import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

function App() {

  return (
    <>
      <NoteState>
        <Router>
          <div className="App">
            <Navbar />
            {/* <div className="alert">
              <Alert alert={alert}/>
            </div> */}

            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
