import * as React from 'react'
import { Link } from 'react-router-dom'
import TaskTable from '../components/TaskTable'
import { SignInStatus, Update } from '../middleware/context'
type Role = string;
type Filter = string;
const Mytasks = () => {
    const { signInStatus } = React.useContext(SignInStatus);
    const [role, setRole] = React.useState<Role>('postedBy')
    const [filter, setFilter] = React.useState<Filter>('all')

    return (
        <main className="bg-light">
                <nav className="navbar navbar-expand-lg">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <nav className="p-2">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="posted-tab" data-toggle="tab" href="#posted" role="tab" aria-controls="posted" aria-selected="true" onClick={(e) => { e.preventDefault; setRole('postedBy');setFilter('all') }}>As Poster</a>
                            </li>
                            <li className="nav-item mx-auto">
                                <a className="nav-link" id="taken-tab" data-toggle="tab" href="#taken" role="tab" aria-controls="taken" aria-selected="false" onClick={(e) => { e.preventDefault; setRole('assignedTo');setFilter('all') }}>As Tasker</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="p-2 collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="nav nav-pills flex-column flex-lg-row " id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true" onClick={(e) => { e.preventDefault; setFilter('all'); }}>All Tasks</a>
                            </li>
                            {role === 'postedBy' && <li className="nav-item">
                                <a className="nav-link" id="open-tab" data-toggle="tab" href="#open" role="tab" aria-controls="open" aria-selected="false" onClick={(e) => { e.preventDefault; setFilter('OPEN') }}>Open Tasks</a>
                            </li>}

                            <li className="nav-item">
                                <a className="nav-link" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="false" onClick={(e) => { e.preventDefault; setFilter('ASSIGNED') }}>Assigned Tasks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="false" onClick={(e) => { e.preventDefault; setFilter('PENDING') }}>PENDING Tasks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="completed-tab" data-toggle="tab" href="#completed" role="tab" aria-controls="completed" aria-selected="false" onClick={(e) => { e.preventDefault; setFilter('COMPLETED') }}>Completed Tasks</a>
                            </li>
                        </ul>
                    </div>

                </nav>
                <TaskTable filter={filter} role={role} />
            </main>
    )
}
export default Mytasks