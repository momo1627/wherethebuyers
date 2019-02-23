import React from 'react'
const TaskLabel = (props)=>{
    return (
        <div className='row border border-secondary bg-white rounded mb-1 align-items-center'  key={props.id}> 
            <div className='col-5'>
            <div className='col-3 small'>{props.where}</div>
            <div className='col-3 small'>{props.when}</div>
            </div>
            <div className="col-4 text-success">{props.status}</div>
            <div className='h2 col-3  text-right'>${props.price}</div>
        </div>
    )
}
export default TaskLabel