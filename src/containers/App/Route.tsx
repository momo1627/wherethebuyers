import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import BrowseTasks from '../BrowseTasks/TaskPage'
import MyTasks from '../MyTasks/MyTasks'
import TaskDetail from '../TaskDetail/TaskDetailsPage'
import PrivateRoute from '../../components/PrivateRoute';

const Routes: React.FunctionComponent = () => {
    return (
        <div className='app-content'>
            <Switch >
                <Route exact path='/' component={BrowseTasks} />
                <Route exact path='/tasks' component={BrowseTasks} />
                <Route exact path='/tasks/:id' component={TaskDetail} />
                {/* <Route exact path='/mytasks' component={MyTasks} /> */}
                <PrivateRoute exact path='/mytasks' component={MyTasks} />
                {/* <Route exact path ='/profile/:id' component={Profile} /> */}
            </Switch>
        </div>
    )
}
export default Routes