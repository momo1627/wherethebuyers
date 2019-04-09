import * as React from 'react'
type Props = {
    content:string
}
const TaskContent:React.FunctionComponent<Props> = (props)=>{
    return (
    <div className='mt-1'>
        <span className="font-weight-bold m-1">{props.children}:</span>
        <span className='m-1'>{props.content}</span>
    </div>
    )
}
export default TaskContent