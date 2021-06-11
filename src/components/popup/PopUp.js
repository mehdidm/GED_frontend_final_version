import React from 'react'
import './PopUp.css'
function PopUp(props) {
    return (props.trigger) ? ( 
        <div className="popup">
             
            <div className="popup-inner">
            
                   <button className="btn close-btn" onClick={()=>props.setTrigger(false)}> <i className="fas fa-times"></i></button>
                   {props.children}
            </div>
        </div>
    ):"";
}

export default PopUp

