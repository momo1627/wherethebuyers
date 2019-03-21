import * as React from 'react'
import {NavLink} from 'react-router-dom' 
import TaskLabel from './TaskLabel'
import useGetData from '../middleware/customHooks/useGetData'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'


const TaskList = (props)=>{
    const [data,dispatch] = useGetData([],'http://localhost:5000/tasks')
    const handleClick = ()=>{
        dispatch(startUpdate)
    }
    return(
        <div className='task-list'>
            {data.map(item => (
                <NavLink  key={item.id}  activeClassName="task-link-active" className="text-dark text-decoration-none" to={`/tasks/${item.id}`} onClick={()=>{handleClick()}}>
                    <TaskLabel  {...item} click={handleClick} />
                </NavLink>
            ))}
        </div>
    )
}
export default TaskList