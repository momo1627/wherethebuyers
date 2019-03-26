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
    const [data,fetchStatus,updateDispatch] = useGetData<Data[]>(undefined,url);
    const posterElement = (data && data.map((d)=>{return <TaskRow td1={d.id} td2={d.what} td3={d.when} td4={d.where} td5={d.completedTime} />}))
    const taskerElement = (data && data.map((d)=>{return <TaskRow td1={d.id} td2={d.postedTime} td3={d.assignedTo} td4={d.assignedTime} td5={d.completedTime} />}))
    return(
        <table className="mx-auto mt-3">
                <tbody className="mytasks">
                    {role === 'postedBy'
                        ? <tr className="mx-auto">
                            <th className="">Task Id</th>
                            <th className="">PostedTime</th>
                            <th className="">AssignedTo</th>
                            <th className="">AssignedTime</th>
                            <th className="">CompletedTime</th>
                        </tr>
                        : <tr className="">
                            <th className="">Task Id</th>
                            <th className="">What</th>
                            <th className="">When</th>
                            <th className="">Where</th>
                            <th className="">CompletedTime</th>
                        </tr>
                    }
                    {role ==='postedBy' ? posterElement : taskerElement}
                </tbody>
            </table>
    )
}
export default TaskTable