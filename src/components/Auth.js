import React, { useEffect, useState } from 'react'
import Login from './login-singup/Login'
import Register from './login-singup/Register';

const Auth = (props) => {
    const [currStatus, setCurrStatus] = useState(true)
    const toggleShow = ()=>{
        console.log("toggleShow onclicked..")
        setCurrStatus(!currStatus)
    }

    useEffect(()=>{
        console.log('useEffect on Auth componet')
    }, [currStatus])

  return (
    <div>
        {currStatus && <Login toggleShow={toggleShow} token={props.token} /> }
        
        {!currStatus && <Register toggleShow={toggleShow} token={props.token} />}

    </div>
  )
}

export default Auth
