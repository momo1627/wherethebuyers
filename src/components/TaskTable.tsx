import * as React from 'react';
import useGetData from '../middleware/customHooks/useGetData'
import { SignInStatus} from '../middleware/context'
import {Data} from '../pages/TaskDetailsPage'
import TaskRow from './TaskRow';

interface ITaskItem {
    role:string;
    filter:string;
}
const TaskTable = ({role,filter}:ITaskItem)=>{
    const { signInStatus } = React.useContext(SignInStatus);
    const username = signInStatus.username;
    const url = filter === 'all'? `http://localhost:5000/mytasks?${role}=${username}` : `http://localhost:5000/mytasks?${role}=${username}&status=${filter}` 
    const [response,fetchStatus,updateDispatch] = useGetData<Data>(url);
    const posterElement = (response.data.map((d)=>{return <TaskRow key={d.id} td1={d.id} td2={d.what} td3={d.when} td4={d.where} td5={d.completedTime} />}) )
    const taskerElement = (response.data.map((d)=>{return <TaskRow key={d.id} td1={d.id} td2={d.postedTime} td3={d.assignedTo} td4={d.assignedTime} td5={d.completedTime} />}) )
    return(
        <>
        {fetchStatus ? <table className="mx-auto mt-3">
                <tbody className="mytasks">
                    {role === 'postedBy'
                        ? <>
                        <tr className="mx-auto">
                            <th className="">Task Id</th>
                            <th className="">PostedTime</th>
                            <th className="">AssignedTo</th>
                            <th className="">AssignedTime</th>
                            <th className="">CompletedTime</th>
                        </tr>
                        {posterElement}
                        </>
                        : <>
                        <tr className="">
                            <th className="">Task Id</th>
                            <th className="">What</th>
                            <th className="">When</th>
                            <th className="">Where</th>
                            <th className="">CompletedTime</th>
                        </tr>
                        {taskerElement}
                        </>
                    }
                </tbody>
            </table> : <div>data is Loading</div>}
        {response.status !== 0 && <div className='text-center h3 mt-3'>{response.message}</div>  }
        </>
    )
}
export default TaskTable