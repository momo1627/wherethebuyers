import * as React from 'react'
const FormGroup = (props)=>{
    return (
    <div className="form-group mb-1">
        <label className='m-0 p-0' htmlFor={props.content}>{props.content}</label>
        <input className={`p-0 form-control form-control-${props.size}`} name={props.content} type={props.type} id={props.content} value={props.input} onChange={(e)=>{props.change(e)}} />
        <small className="m-0 form-text text-muted">{props.children}</small>
    </div>
    )
}
export default FormGroup