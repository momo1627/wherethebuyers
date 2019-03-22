import * as React from 'react'
type Props = {
    content:string;
    type:string;
    input:string;
    size?:string;
    change:React.ChangeEventHandler

}
const FormGroup:React.FunctionComponent<Props> = (props)=>{
    return (
    <div className="form-group mb-1">
        <label className='m-0 p-0' htmlFor={props.content}>{props.content}</label>
        <input className={`p-0 form-control form-control-${props.size}`} name={props.content} type={props.type} id={props.content} value={props.input} onChange={(e)=>{props.change(e)}} />
        <small className="m-0 form-text text-muted">{props.children}</small>
    </div>
    )
}
export default FormGroup