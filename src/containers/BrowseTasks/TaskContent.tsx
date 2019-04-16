import * as React from 'react'
type Props = {
    content:string
}
const TaskContent:React.FunctionComponent<Props> = (props)=>{
    return (
    <div className='mt-1'>
        <span className="font-weight-bold">{props.children}</span>
        <span className=''>{props.content}</span>
    </div>
    )
}
export default TaskContent