import React from 'react'
const TaskDetail = ({location,match})=>{
    return (
        <div> i'm a task 
            <div>{location.pathname}</div>
            <div>{match.params.id}</div>
        </div>
    )
}
export default TaskDetail