import * as React from 'react'
import moment from 'moment'
import TaskContent from '../BrowseTasks/TaskContent'
import API_Url from '../../constants/api'
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
    const [response, setResponse] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const fetchTasks = async () => {
        setIsLoading(true);
        const response = await fetch(`${API_Url}/tasks/${props.match.params.id}`, { method: 'get' });
        const result = await response.json();
        console.log(result)
        setResponse(result)
        setIsLoaded(true);
        setIsLoading(false);
    }
    React.useEffect(() => { fetchTasks() }, [])
    return (
        <>

            {isLoaded && response.status === 0 &&
                <div className='px-2 pt-4 w-sm-75'>
                    <div className='d-sm-flex justify-content-around'>
                        <div className={response.data.status === 'OPEN' ? 'bg-success px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>OPEN</div>
                        <div className={response.data.status === 'ASSIGNED' ? 'bg-warning px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>ASSIGNED</div>
                        <div className={response.data.status === 'PENDING' ? 'bg-danger px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>PENDING</div>
                        <div className={response.data.status === 'COMPLETED' ? 'bg-dark px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>COMPLETED</div>
                    </div>
                    <div className="w-75 my-4 py-2 mx-auto text-center  border border-muted shadow-sm rounded bg-white">
                        <div>
                            <h6 className='py-1'>Task Budget</h6>
                            <div className='h4'>${response.data.price}</div>
                        <div className="mb-4 h3 font-weight-normal">{response.data.what}</div>
                        </div>
                    </div>


                    <div className='mx-auto bg-white shadow rounded p-2'>
                        <TaskContent content={response.data.poster}>Posted By</TaskContent>
                        <TaskContent content={moment(response.data.postedTime).format('MMMM Do YYYY, h:mm:ss a')}>Posted Time</TaskContent>
                        <TaskContent content={response.data.where}>Location</TaskContent>
                        <TaskContent content={response.data.when}>Due</TaskContent>
                        <TaskContent content={response.data.tasker}>Assigned To</TaskContent>
                        <TaskContent content={moment(response.data.assignedTime).format('MMMM Do YYYY, h:mm:ss a')}>Assigned Time </TaskContent>
                        <TaskContent content={moment(response.data.completedTime).format('MMMM Do YYYY, h:mm:ss a')}>Completed Time </TaskContent>
                    </div>
                </div>
            }






        </>

    )
}
export default TaskDetail