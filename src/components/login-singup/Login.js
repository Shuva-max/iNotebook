import React, { useContext, useState } from 'react';
import './login.css';
import userContext from '../../context/auth/userContext';

const Login = (props) => {
  const { userLogin } = useContext(userContext);

  const [user, setUser] = useState({});

  const onChange = (e)=>{
    setUser({...user, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log('handleSubmit is clicked')
    // api call
    userLogin(user.email, user.password);
    setInterval(()=>{
      props.token({status: true, token: localStorage.getItem('token')})

  }, 5000);
  }

  return (
    <div className="body-b1">
  
      <div className="parent-login">
    <div className="login-page">
        <div className="from">
            <div className="login-header">
                <h3 className="h3-login">Login</h3>

            </div>
            <form className="login-form" onSubmit={handleSubmit} >
                <input onChange={onChange} className="input-t1" type="text" placeholder="username" name="email" />
                <input onChange={onChange} className="input-t1" type="text" placeholder="password" name="password" />
                <button type="submit" className="btn-login">Login</button>
            </form>
            <p className="messege">Not a member? <span id="click-register" href="/auth/register" onClick={()=>{props.toggleShow()}} > Register</span></p>
        </div>
    </div>
</div>

</div>
  )
}

export default Login;
