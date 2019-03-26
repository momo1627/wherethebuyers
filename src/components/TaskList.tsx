import * as React from 'react';
import TaskTable from './TaskTable'
import { SignInStatus, Update } from '../middleware/context'
import ModalButton from '../components/PostButton'

interface ITaskList {
    role: string;
}
type Filter = string;

const TaskList = ({ role }: ITaskList) => {
    const [filter, setFilter] = React.useState<Filter>('all')
    const { signInStatus } = React.useContext(SignInStatus);
    return (
        <div className="py-3">
            <ul className="nav nav-pills  py-0 flex-column flex-lg-row justify-content-center" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true" onClick={(e) => { e.preventDefault(); setFilter('all') }}>All Tasks</a>
                </li>
                {role === 'postedBy' && <li className="nav-item">
                    <a className="nav-link" id="open-tab" data-toggle="tab" href="#open" role="tab" aria-controls="open" aria-selected="false" onClick={(e) => { e.preventDefault(); setFilter('OPEN') }}>Open Tasks</a>
                </li>}

                <li className="nav-item">
                    <a className="nav-link" id="assigned-tab" data-toggle="tab" href="#assigned" role="tab" aria-controls="assigned" aria-selected="false" onClick={(e) => { e.preventDefault(); setFilter('ASSIGNED') }}>Assigned Tasks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="false" onClick={(e) => { e.preventDefault(); setFilter('PENDING') }}>Pending Tasks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="completed-tab" data-toggle="tab" href="#completed" role="tab" aria-controls="completed" aria-selected="false" onClick={(e) => { e.preventDefault(); setFilter('COMPLETED') }}>Completed Tasks</a>
                </li>
            </ul>
            {/* {!signInStatus.isSignIn && 'Please Sign In to view your Tasks'} */}
            <TaskTable role={role} filter={filter} />

        </div>

    )
}
export default TaskList