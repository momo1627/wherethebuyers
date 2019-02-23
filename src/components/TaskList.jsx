import React from 'react'
const TaskList = (props)=>{
    const handleClick =()=>{ props.click(props.id)}
    return(
        <div className='small bg-white border border-primary rounded'>
            <div className='row'>
                <div className='col-12 col-sm-6'>id:{props.id}</div>
                <div className='col-12 col-sm-6'>{props.status}</div>
                <div className='col-12 col-sm-6'>{props.poster}</div>
                <div className='col-12 col-sm-6'>{props.assignTo}</div>
            </div>
            <div className='row'>
                <div className='col-12 col-sm-6'>{props.what}</div>
                <div className='col-12 col-sm-6'>{props.price}</div>
                <div className='col-12 col-sm-6'>{props.where}</div>
                <div className='col-12 col-sm-6'>{props.when}</div>
                <div className='col-12 col-sm-6'>{props.time}</div>
            </div>
            {props.click?<button className='btn btn-primary' onClick={handleClick}>Done</button>:''}
        </div>
    )
}
export default TaskList