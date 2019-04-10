import * as React from 'react'
import TaskItem from './TaskItem'
import Loading from '../../components/Loading'
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
    isLoadingMoreData: boolean
    hasMoreTasks: boolean
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
             <div className="tasks-loading border rounded shadow-sm bg-white font-weight-bold text-center mx-2 h4">
                {props.hasMoreTasks && props.isLoadingMoreData && <Loading />}
                {!props.hasMoreTasks && !props.isLoadingMoreData && <div>no more tasks</div>}
            </div>
        </>
    )
}
export default TaskList