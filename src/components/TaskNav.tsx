import * as React from 'react'
import { NavLink } from 'react-router-dom'
import TaskLink from './TaskLink'
import useFetchData from '../middleware/customHooks/useFetchData'
import { startUpdate, endUpdate } from '../middleware/actions/updateAction'
import API_Url from '../middleware/api'

type dataList = typeof initialValue;
const initialValue = {
    what: '',
    id: '',
    where: '',
    when: '',
    price: '',
    status: '',
}
const TaskList = () => {
    const [response, fetchStatus] = useFetchData<dataList>(`${API_Url}/tasks`,{method:'get'})
    const element = (
        <div className='task-list'>
            {
                response.status === 0 ? (response.data as dataList[]).map((item) => (
                    <NavLink key={item.id} activeClassName="task-link-active" className="text-dark text-decoration-none" to={`/tasks/${item.id}`} >
                        <TaskLink {...item} />
                    </NavLink>)) : 
                <div>{response.message}</div>
            }
        </div>)
    return (
        <div className="task-left">
            {fetchStatus ? element : <div>data is fetching</div> }
        </div>
    )
}
export default TaskList