import React, { useContext, useState } from 'react';
import './Register.css';
import userContext from '../../context/auth/userContext';

const Register = (props) => {
    const { userRegister } = useContext(userContext);
    
    const [user, setUser] = useState({})

    const handleChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value});  //using sprade operator
      }

    const hanldleSubmit = async (e)=>{
        e.preventDefault();
        // api call
        userRegister(user.name, user.email, user.password);
        props.toggleShow()
        }

  return (
        <div className="body">
        <div className="register-page">
            <div className="from">
                <div className="register-header">
                    <h3 className="h3-register">Register</h3>

                </div>
                <form className="register-from" onSubmit={hanldleSubmit} >
                    <input className="input" name="name" type="text" placeholder="Name" onChange={handleChange} />
                    <input className="input" name="email" type="text" placeholder="Email" onChange={handleChange} />
                    <input className="input" name="password" type="text" placeholder="Password" onChange={handleChange} />
                    <button type="submit" className="bt-register">Register</button>          
                </form>
                <p className="message">Already a member! <span onClick={()=>{props.toggleShow()}} id="click-login" to="./login"> Login</span></p>
            </div>
        </div>
    </div>
    
  )
}

export default Register
