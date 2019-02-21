import React from 'react'
const TaskLabel = (props)=>{
    return (
        <div>    
            <div>{props.poster}</div>
            <div>{props.time}</div>
            <div>{props.price}</div>
            <div>{props.what}</div>
            <div>{props.where}</div>
            <div>{props.when}</div>
            <div>{props.status}</div>
       </div>
    )
}
export default TaskLabel