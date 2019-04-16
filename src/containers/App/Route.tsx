import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import BrowseTasks from '../BrowseTasks/TaskPage'
import MyTasks from '../MyTasks/MyTasks'
import TaskDetail from '../TaskDetail/TaskDetailsPage'
import PrivateRoute from '../../components/PrivateRoute';
import ReviewMaker from '../TaskDetail/ReviewMaker'
const Routes: React.FunctionComponent = () => {
    return (
        <div className='app-content'>
        <div className='tasks-container'>

            <Switch >
                <Route exact path='/app/' component={BrowseTasks} />
                <Route exact path='/app/tasks' component={BrowseTasks} />
                <Route exact path='/app/task/:id' component={TaskDetail} />
                {/* <Route exact path='/mytasks' component={MyTasks} /> */}
                <PrivateRoute exact path='/app/mytasks' component={MyTasks} />
                <Route exact path='/app/review' component = {ReviewMaker} />
            </Switch>
        </div>
        </div>

    )
}
export default Routes