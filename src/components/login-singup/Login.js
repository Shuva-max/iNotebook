import React, { useContext, useState } from 'react';
import './login.css';
import userContext from '../../context/auth/userContext';
import alertContext from '../../context/alertContext';
import Alert from '../Alert';

const Login = (props) => {
  const { userLogin, getUser } = useContext(userContext);
  const {showAlert} = useContext(alertContext);

  const [user, setUser] = useState({});

  const onChange = (e)=>{
    setUser({...user, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      if(document.getElementById('ti01').value.length===0 && document.getElementById('de01').value.length===0){
        showAlert(": Please fill the fields with right credentials!!", 'danger')
      } else {
      // console.log('handleSubmit is clicked')
      // api call
      const json = await userLogin(user.email, user.password);
  
      if(json.status){
          showAlert(": Login successfully", "success")
          props.token({status: true, token: localStorage.getItem('token')})
          getUser();
          // console.log('from setInterval')  
      } else {
        showAlert(`: ${json.error || json.errors[0].msg}`, "danger")
      }
    }      
    } catch (error) {
      console.log(error)
      showAlert(": Please fill the fields with right credentials!!", 'danger')
    }
  }

  return (
    <div className="body-b1" style={{position:'relative'}}>
      <div className="alert02" style={{display:'flex',justifyContent:'center',width:'100%', position:'absolute', zIndex:'2'}}>
        <Alert/>
      </div>
  
      <div className="parent-login" >
    <div className="login-page">
        <div className="from">
            <div className="login-header">
                <h3 className="h3-login">Login</h3>

            </div>
            <form className="login-form" onSubmit={handleSubmit} >
                <input id='ti01' onChange={onChange} className="input-t1" type="text" placeholder="username" name="email" />
                <input id='de01' onChange={onChange} className="input-t1" type="password" placeholder="password" name="password" />
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
