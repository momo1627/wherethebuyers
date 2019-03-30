import * as React from 'react'
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import TaskDetailsPage from './TaskDetailsPage'
import HomePage from './HomePage'
import TaskNav from '../components/TaskNav'
const Task = ()=>{
    return (
        <Router>
            <div className="app-task-screen">
                    <div className='task-right'>
                        <Route exact path='/tasks' component={HomePage} />
                        <Route exact path='/tasks/:id' component={TaskDetailsPage}/>
                    </div>
                    <TaskNav />
            </div>

        </Router>
    )
}
export default Task