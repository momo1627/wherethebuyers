import React from 'react'
const Button = (props) =>{
    return (
        <button type={props.type} style={props.style} className={props.buttonStyle} onClick={props.click}>{props.children}</button>
    )
}
export default Button