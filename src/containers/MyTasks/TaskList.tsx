import * as React from 'react';
import TaskLabel from './TaskLabel'
import TaskTag from './TaskTag'

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
            <div className='py-1 mt-1  mytask-list-item  bg-light border ' key={item._id}>
                <TaskLabel  {...item} />
                <TaskTag _id={item._id} status={item.status} role={props.role} />
            </div>
        )
    })
    return (
        <>
            {element}
        </>

    )
}
export default TaskList