import * as React from 'react'
import TaskList from '../components/TaskList'

type Role = string;
const Mytasks = () => {
    const [role, setRole] = React.useState<Role>('postedBy')

    return (
        <main className="pt-5 bg-light task-table font-weight-bold">
                <ul className="w-100 justify-content-center px-3 text-center nav nav-pills  " id="myTab1" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="posted-tab" data-toggle="tab" href="#posted" role="tab" aria-controls="posted" aria-selected="true" onClick={(e) => { e.preventDefault; setRole('postedBy'); }}>As Poster</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="taken-tab" data-toggle="tab" href="#taken" role="tab" aria-controls="taken" aria-selected="false" onClick={(e) => { e.preventDefault; setRole('assignedTo'); }}>As Tasker</a>
                    </li>
                </ul>
            <TaskList role={role} />
        </main>
    )
}
export default Mytasks