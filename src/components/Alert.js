import React, { useContext } from "react";
import alertContext from "../context/alertContext";

export default function Alert() {
  const {alert} = useContext(alertContext)
    const capitalize = (word)=> {
        const lower = word.toLowerCase();
        return ( lower.charAt(0).toUpperCase() + lower.slice(1) );
    }
    

  return (
    <div > 
      {alert && <div className={`alert alert-${alert.type} d-flex align-items-center`} role="alert" style={{borderRadius:'.55rem'}} >
      <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></svg>
      <div>
        {capitalize(alert.type) + alert.msg} 
      </div>
    </div>}
    </div>
  );
}
