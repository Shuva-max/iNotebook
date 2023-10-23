import React, { useContext, useState } from 'react';
import './Register.css';
import userContext from '../../context/auth/userContext';
import alertContext from '../../context/alertContext';
import Alert from '../Alert';

const Register = (props) => {
    const { userRegister } = useContext(userContext);
    const { showAlert } = useContext(alertContext);
    
    const [user, setUser] = useState({name:'', password:'', email:''})

    const handleChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value});  //using sprade operator
      }

    const hanldleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if(document.getElementById('ti02').value.length===0 && document.getElementById('de02').value.length===0 && document.getElementById('pass').value.length===0){
                showAlert(": Please fill the fields with right credentials!!", 'danger')
            } else{
                // check the pass and confrom pass
                var pass = document.getElementById('pass').value;
                var confirm_pass = document.getElementById('cpass').value;
                if (pass !== confirm_pass){
                    showAlert(': Enter same password!!','warning')
                } else {
                    // api call
                    const json = await userRegister(user.name, user.email, user.password);
                    if(json.status){
                        showAlert("User register successfully...use your cerdentials to Login", 'success')
                        props.toggleShow()
                    } else {
                        showAlert(`: ${json.error || json.errors[0].msg}`, 'danger')
                    }
                    }
            }            
        } catch (error) {
            console.log(error)
            showAlert(": Please fill the fields with right credentials!!", 'danger')
        }
        }

  return (
        <div className="bg1" style={{position:'relative'}}>
            <div className="alert02" style={{display:'flex',justifyContent:'center',width:'100%', position:'absolute', zIndex:'2'}}>
                <Alert/>
            </div>
        <div className="register-page">
            <div className="rform">
                <div className="register-header">
                    <h3 className="h3-register">Register</h3>

                </div>
                <form className="register-from" onSubmit={hanldleSubmit} >
                    <input id='ti02' className="rip input-name" name="name" type="text" placeholder="Name" onChange={handleChange} />
                    <input id='de02' className="rip input-email" name="email" type="text" placeholder="Email" onChange={handleChange} />
                    <input className="rip input-pass" name="password" id='pass' type="text" placeholder="Password" onChange={handleChange} />
                    <input className="rip input-cpass" name="cpassword" id='cpass' type="password" placeholder="confirm password" onChange={handleChange} />
                    <button type="submit" className="bt-register">Register</button>          
                </form>
                <p className="message">Already a member! <span onClick={()=>{props.toggleShow()}} id="click-login" to="./login"> Login</span></p>
            </div>
        </div>
    </div>
    
  )
}

export default Register
