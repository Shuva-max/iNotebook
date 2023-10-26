import React, { useState } from 'react'
import userContext from './userContext'

const UserState = (props) => {
    const host = "https://inotebookbackend-tyuv.onrender.com";
    // const host = "http://localhost:5000";  //http://localhost:5000/api/auth/stserver

    //login a user
    const userLogin = async(email, password)=>{
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:email, password:password})
        });
        const json = await response.json();
        // console.log(json);
        if(json.status){
          localStorage.setItem('token', json.authToken)
        }else {
          // console.log('no token')
          localStorage.setItem('token', '')
        }
        return json
      }

      // get Login or register user data
      const [lu1, setLu1] = useState()
    const getUser = async()=>{
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          }
        });
        const json = await response.json();
        // console.log(json);
        setLu1(json)
        
      }

    //singup a user
    const userRegister = async(name, email, password)=>{
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, email: email, password: password}) // body data type must match "Content-Type" header
      });
      // return response.json(); // parses JSON response into native JavaScript objects
      // console.log("Creating a new User")
      const u1 = await response.json();
      // console.log(u1)
      if(u1.status){
        localStorage.setItem('token', u1.authToken)
      }else {
        // console.log('no token')
        localStorage.setItem('token', '')
      }
      return u1
    }

    // change password api
    const changePassword = async ({pass, cnPass})=> {
      const response = await fetch(`${host}/api/auth/changepass`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({password: pass, newpass: cnPass})
      });
      const json = await response.json();      
      return json.status || false;
    }

    // change name api
    const changeName = async ({pass, name})=> {
      const response = await fetch(`${host}/api/auth/changename`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({password: pass, newname: name})
      });
      const json = await response.json();      
      return json.status || false;
    }

    return (
        <userContext.Provider value={{ userLogin, userRegister, lu1, getUser, setLu1, changePassword, changeName }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState
