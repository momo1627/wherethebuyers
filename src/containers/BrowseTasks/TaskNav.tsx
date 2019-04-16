import * as React from 'react'
import TaskItem from './TaskItem'
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
    // isLoadingMoreData: boolean
    // hasMoreTasks: boolean
    // isLoadedMoreData:boolean
}
const TaskList = (props: IProps) => {

    const element = props.initTasks && props.initTasks.map((item) => {
        return (
            <TaskItem key={item._id} {...item} />
        )
    })
    return (
        <>
            {element}
        </>
    )
}
export default TaskList