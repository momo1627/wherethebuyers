import * as React from 'react'
type Props = {
    content:string
}
const TaskContent:React.FunctionComponent<Props> = (props)=>{
    return (
    <div className='py-1 border-bottom border-muted'>
        <div className="small font-weight-bold">{props.children}</div>
        <div>{props.content}</div>
    </div>
    )
}
export default TaskContent