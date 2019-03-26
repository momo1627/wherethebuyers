import * as React from 'react';
import TaskRow from './TaskRow';
interface ITaskList {
    role: string;
    filter: string;
}
type Filter = string;

const TaskList = ({ role,filter }: ITaskList) => {
    return (
        <div className="w-100 overflow-auto">
            <table className="mx-5">
            <tbody className="">
                {role === 'poster'
                    ? <tr className="">
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
                <TaskRow role={role} filter={filter} />
            </tbody>

        </table>
        </div>
        
    )
}
export default TaskList