import * as React from 'react';
import {Data} from '../pages/TaskDetailsPage'
import TaskRow from './TaskRow';
import useMyTasks from '../middleware/customHooks/useMyTasks'
interface IResponse<T> {
    data: T
    status: number;
    message: string
}
interface ITaskItem {
    role:string;
    filter:string;
}
const TasksPosted = ({role,filter}:ITaskItem)=>{
    const [response,fetchStatus] = useMyTasks(role,filter)
    const  postedTasks= (response.data && (response.data as Data[]).map((d)=>{return <TaskRow key={d.id} id={d.id} td2={d.postedTime} td3={d.assignedTo} td4={d.assignedTime} td5={d.completedTime} role={role} status={d.status} filter={filter }/>}) )

    return(
                <tbody className="mytasks">
                        <tr className="table-header">
                            <th className="">Task Id</th>
                            <th className="">PostedTime</th>
                            <th className="">AssignedTo</th>
                            <th className="">AssignedTime</th>
                            <th className="">CompletedTime</th>
                        </tr>
                        {fetchStatus ? postedTasks : <div>data is Loading</div>}
        {response.status !== 0 && <div className='text-center'>{response.message}</div> }

                </tbody>
    )
}
export default TasksPosted