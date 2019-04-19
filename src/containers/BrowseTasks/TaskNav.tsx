import * as React from 'react'
import TaskItem from './TaskItem'
import {Route, NavLink} from 'react-router-dom'
import { Update } from '../../context/context'
import { startUpdate } from '../../actions/updateAction';
interface IData {
    poster: '',
    posterId: '',
    postedTime: '',
    what: '',
    where: '',
    when: '',
    price: '',
    status: '',
    tasker: '',
    taskerId: '',
    assignedTime: '',
    _id: '',
    completedTime: '',
    reviews: ''
}
interface IProps {
    initTasks: IData[],
    click:()=>void
    // isLoadingMoreData: boolean
    // hasMoreTasks: boolean
    // isLoadedMoreData:boolean
}
const TaskList = (props: IProps) => {
    const { update, updateDispatch } = React.useContext(Update)
    const element = props.initTasks && props.initTasks.map((item) => {
        return (
            <NavLink activeClassName='task-link-active' className='text-dark text-decoration-none ' key={item._id} to={`/tasks/${item._id}`} onClick={() => { props.click(); }}>
                <TaskItem  {...item} />
            </NavLink>
        )
    })
    return (
        <>
            {element}
        </>
    )
}
export default TaskList