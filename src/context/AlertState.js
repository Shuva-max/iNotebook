import React, { useState } from 'react';
import alertContext from './alertContext';

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (massege, type) => {
        setAlert({type: type, msg: massege})

        setTimeout(() => {
            setAlert(null)
        }, 3000);
    }
  return (
    <alertContext.Provider value={{alert, showAlert}}>
        {props.children}
    </alertContext.Provider>
  )
}

export default AlertState;
