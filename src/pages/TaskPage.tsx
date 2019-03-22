import * as React from 'react'
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import TaskDetailsPage from './TaskDetailsPage'
import TasksOnMap from './TaskOnMap'
import TaskList from '../components/TaskList'
const Task = ()=>{
    return (
        <Router>
            <div className="app-task-screen">
                    <div className='task-right'>
                        {/* <Route exact path='/tasks' component={TasksOnMap} /> */}
                        <Route exact path='/tasks/:id' component={TaskDetailsPage}/>
                    </div>
                    <TaskList />
            </div>

        </Router>
    )
}
export default Task