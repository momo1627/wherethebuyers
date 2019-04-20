import * as React from 'react';
import { Route, NavLink } from 'react-router-dom'
import TaskLabel from './TaskLabel'

interface IProps {
    data: IData[]
    role: string;
}

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

const TaskList = (props: IProps) => {
    const element = props.data && props.data.map((item) => {
        return (
            <NavLink activeClassName='task-link-active' className='text-dark text-decoration-none ' key={item._id} to={`/tasks/${item._id}`} >
                <TaskLabel  {...item} />
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