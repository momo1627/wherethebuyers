import * as React from 'react';
import TasksAssigned from './TasksAssigned'
import TasksPosted from './TasksPosted'
interface ITaskItem {
    role: string;
    filter: string;
}
const TaskTable = ({ role, filter }: ITaskItem) => {
    return (

        <table className="mx-auto mt-3 ">
            {role === 'postedBy' ? <TasksPosted role='postedBy' filter={filter} /> : <TasksAssigned role='assignedTo' filter={filter} />}
        </table>
    )
}
export default TaskTable