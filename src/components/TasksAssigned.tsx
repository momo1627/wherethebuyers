import * as React from 'react';
import {Data} from '../pages/TaskDetailsPage'
import useMyTasks from '../middleware/customHooks/useMyTasks'
import TaskRow from './TaskRow';
interface IResponse<T> {
    data: T
    status: number;
    message: string
}
interface ITaskItem {
    role:string;
    filter:string;
}
const TasksAssigned = ({role,filter}:ITaskItem)=>{
    const [response,fetchStatus] = useMyTasks(role,filter)
    const  assignedTasks= (response.data && (response.data as Data[]).map((d)=>{return <TaskRow key={d.id} id={d.id} td2={d.what} td3={d.when} td4={d.where} td5={d.completedTime} role={role} status={d.status} filter={filter }/>}) )

    return(
                <tbody className="mytasks">
                        <tr className="table-header">
                            <th className="">Task Id</th>
                            <th className="">What</th>
                            <th className="">When</th>
                            <th className="">Where</th>
                            <th className="">CompletedTime</th>
                        </tr>
                        {fetchStatus ? assignedTasks : <div>data is Loading</div>}
                        {response.status !== 0 && <div className='text-center'>{response.message}</div> }
                </tbody>
    )
}
export default TasksAssigned