import React from 'react'
const TaskLabel = (props)=>{
    let status
    switch(props.status){
        case 'DONE':
            status = 'text-danger'
            break 
        case 'ASSIGNED':
            status = 'text-warning'
            break
        default:
            status = 'text-success'
    }
    return (
        <div className='task-list-item-active task-list-item bg-white m-2 px-2'  key={props.id}> 
            <div className="large">Buy {props.what}</div>
            <div className='d-flex  align-items-center justify-content-between'>          
                <div className='text-muted'>
                    <div className=''>{props.where}</div>
                    <div className=''>{props.when}</div>
                </div>
            <div className={`${status} text-right h3`}>${props.price}</div>
            </div>
            <hr className="m-0"/>
            <div className={`${status} small font-weight-bold`}>{props.status}</div>
        </div>
    )
}
export default TaskLabel