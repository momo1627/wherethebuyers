import * as React from 'react'
import moment from 'moment'
import TaskContent from '../BrowseTasks/TaskContent'
import API_Url from '../../constants/api'
import { isDate } from 'util';
interface IData {
    poster: string,
    posterId: string,
    postedTime: string,
    what: string,
    where: string,
    when: string,
    price: string,
    status: string,
    tasker: string,
    taskerId: string,
    assignedTime: string,
    _id: string,
    completedTime: string,
    reviews: string
}
interface IProp {
    match: {
        params: {
            id: string
        }
    }
}
const TaskDetail = (props: IProp) => {
    const [confirm, setConfirm] = React.useState(false)
    const [data, setData] = React.useState()
    const [response, setResponse] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const fetchTasks = async () => {
        setIsLoading(true);
        setIsLoaded(false);
        const response = await fetch(`${API_Url}/task/${props.match.params.id}`, { method: 'get' });
        const result = await response.json();
        setData(result.data);
        setResponse(response.ok);
        setIsLoaded(true);
        setIsLoading(false);
    }
    React.useEffect(() => { fetchTasks() }, [])
    return (
        <>

            {isLoaded && response &&
                <div className='task-item-container bg-white mx-auto p-2'>
                    <div className={`alert bg-info text-white text-center`}>{data.status}</div>
                    <div className="h4 text-center text-info font-weight-normal">{data.what}</div>
                    <div className='d-md-flex'>
                        <div className='border border-muted rounded  mx-auto small p-1 m-2'>
                            <TaskContent content={data.price}>$ Price </TaskContent>
                            <TaskContent content={''}>Location</TaskContent>
                            <TaskContent content={data.where}>&#9962; </TaskContent>
                            <TaskContent content={''}> Due</TaskContent>
                            <TaskContent content={moment(data.when).format('MMMM Do YYYY, h:mm:ss a')}>&#128359;</TaskContent>
                            <TaskContent content={''}>Completed Time </TaskContent>
                            <TaskContent content={data.completedTime && moment(data.completedTime).format('MMMM Do YYYY, h:mm:ss a')}>&#128359; </TaskContent>
                        </div>
                            <div className='mx-auto small border border-muted rounded p-1 m-2'>
                                <TaskContent content={''}>Posted By</TaskContent>
                                <a href=""><TaskContent content={data.poster}></TaskContent></a>
                                <TaskContent content={''}>Posted Time</TaskContent>
                                <TaskContent content={moment(data.postedTime).format('MMMM Do YYYY, h:mm:ss a')}></TaskContent>
                            </div>
                            <div className='mx-auto small border border-muted rounded p-1 m-2'>
                                <TaskContent content={data.tasker}>Assigned To</TaskContent>
                                <a href=""><TaskContent content={data.tasker}></TaskContent></a>
                                <TaskContent content={''}>Assigned Time </TaskContent>
                                <TaskContent content={moment(data.assignedTime).format('MMMM Do YYYY, h:mm:ss a')}></TaskContent>
                            </div>
                    </div>
                    {data.review &&
                        <div></div>
                    }

                </div>



            }






        </>

    )
}
export default TaskDetail