import * as React from 'react'
type Props = {
    content:string
}
const TaskContent:React.FunctionComponent<Props> = (props)=>{
    return (
    <div className='mt-2 border-bottom border-muted'>
        <div className="font-weight-bold mb-1">{props.children}</div>
        <div>{props.content}</div>
    </div>
    )
}
export default TaskContent