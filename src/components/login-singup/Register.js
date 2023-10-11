import React, { useContext, useState } from 'react';
import './Register.css';
import userContext from '../../context/auth/userContext';

const Register = (props) => {
    const { userRegister } = useContext(userContext);
    
    const [user, setUser] = useState({name:'', password:'', email:''})

    const handleChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value});  //using sprade operator
      }

    const hanldleSubmit = async (e)=>{
        e.preventDefault();
        // check the pass and confrom pass
        var pass = document.getElementById('pass').value;
        var confirm_pass = document.getElementById('cpass').value;
        if (pass !== confirm_pass){
            alert('Enter same password!!')
        } else {
            // api call
            const json = await userRegister(user.name, user.email, user.password);
            if(json.status){
                alert("User register successfully...use your cerdentials to Login")
                props.toggleShow()
            } else {
                alert(json.error)
            }
            }
        }

  return (
        <div className="bg1">
        <div className="register-page">
            <div className="rfrom">
                <div className="register-header">
                    <h3 className="h3-register">Register</h3>

                </div>
                <form className="register-from" onSubmit={hanldleSubmit} >
                    <input className="rip input-name" name="name" type="text" placeholder="Name" onChange={handleChange} />
                    <input className="rip input-email" name="email" type="text" placeholder="Email" onChange={handleChange} />
                    <input className="rip input-pass" name="password" id='pass' type="text" placeholder="Password" onChange={handleChange} />
                    <input className="rip input-cpass" name="cpassword" id='cpass' type="password" placeholder="confirm password" onChange={handleChange} />
                    <button disabled={user.name.length < 1} type="submit" className="bt-register">Register</button>          
                </form>
                <p className="message">Already a member! <span onClick={()=>{props.toggleShow()}} id="click-login" to="./login"> Login</span></p>
            </div>
        </div>
    </div>
    
  )
}

export default Register
