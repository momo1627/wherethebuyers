import * as React from 'react'
import {NavLink} from 'react-router-dom' 
import TaskLabel from './TaskLabel'
import useGetData from '../middleware/customHooks/useGetData'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
type dataList = typeof initialValue [];
const initialValue = {
    what:'',
    id:'',
    where:'',
    when:'',
    price:'',
    status:'',
}
const TaskList = ()=>{
    const [data,fetchStatus,dispatch] = useGetData([initialValue],'http://localhost:5000/tasks')
    const handleClick = ()=>{
        dispatch(startUpdate)
    }
    const element = (<div className='task-list'>
    {(data as dataList).map((item) => (
        <NavLink  key={item.id}  activeClassName="task-link-active" className="text-dark text-decoration-none" to={`/tasks/${item.id}`} onClick={()=>{handleClick()}}>
            <TaskLabel {...item}  />
        </NavLink>
    ))}
    </div>) 
    return(
            <div className="task-left">
            {fetchStatus ? element : <div>isLoading</div>}
            </div>
        )
}
export default TaskList