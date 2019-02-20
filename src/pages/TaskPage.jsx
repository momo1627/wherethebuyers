import React,{useContext} from 'react'
import {TaskList} from '../middleware/context'
const Task = ()=>{
    const [taskList] = useContext(TaskList)
    const element = taskList.map(item=>{
        return (
            <ul key={item.time}>
                <li>{item.price}</li>
                <li>{item.what}</li>
                <li>{item.where}</li>
                <li>{item.when}</li>                
            </ul>
        )
        
    })
    return (
        <div>
            <h1>a list of task </h1>
            {element}
        </div>
    )
}
export default Task