import * as React from 'react'
import { NavLink } from 'react-router-dom'
import TaskLink from './TaskLink'
import useGetData from '../middleware/customHooks/useGetData'
import { startUpdate, endUpdate } from '../middleware/actions/updateAction'
type dataList = typeof initialValue[];
const initialValue = {
    what: '',
    id: '',
    where: '',
    when: '',
    price: '',
    status: '',
}
const TaskList = () => {
    const [data, fetchStatus, dispatch] = useGetData<dataList>(undefined, 'http://localhost:5000/tasks')
    const handleClick = () => {
        dispatch(startUpdate)
    }
    const element = (
        <div className='task-list'>
            {
                data && data.map((item) => (
                    <NavLink key={item.id} activeClassName="task-link-active" className="text-dark text-decoration-none" to={`/tasks/${item.id}`} onClick={() => { handleClick() }}>
                        <TaskLink {...item} />
                    </NavLink>))
            }
        </div>)
    return (
        <div className="task-left">
            {!fetchStatus && !data && <span className="p-2">no Tasks, you can post the first class</span>}
            {fetchStatus && data && element}
        </div>
    )
}
export default TaskList