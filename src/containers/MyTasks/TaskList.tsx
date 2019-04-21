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
                <TaskLabel  key={item._id} role={props.role}{...item} />
        )
    })
    return (
        <>
            {element}
        </>

    )
}
export default TaskList