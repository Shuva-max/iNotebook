import React from 'react'
import userContext from './userContext'

const UserState = (props) => {
    const host = "http://localhost:5000";

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
        console.log(json);
        if(json){
          localStorage.setItem('token', json.authToken)
        }else {
          console.log('no token')
        }
      }

    //singup a user
    const userRegister = async(name, email, password)=>{
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, email: email, password: password}), // body data type must match "Content-Type" header
      });
      // return response.json(); // parses JSON response into native JavaScript objects
      console.log("Creating a new User")
      const u1 = await response.json();
      console.log(u1)
      if(u1){
        localStorage.setItem('token', u1.authToken)

      }else {
        console.log('no token')
      }
    }

    return (
        <userContext.Provider value={{ userLogin, userRegister }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState
