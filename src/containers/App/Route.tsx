import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import BrowseTasks from '../BrowseTasks/TaskPage'
import MyTasks from '../MyTasks/MyTasks'
import TaskDetail from '../TaskDetail/TaskDetailsPage'
import PrivateRoute from '../../components/PrivateRoute';
import Home from '../../containers/HomePage/HomePage'
import TaskReviewMaker from '../TaskDetail/TaskReviewMaker'
import PublicProfile from '../../containers/Profile/PublicProfile'
const Routes: React.FunctionComponent = () => {
    return (
        <div className='app-content'>
            <div className='app-container'>
                <Switch >
                    <Route exact path='/' component={Home} />
                    <Route  path='/tasks' component={BrowseTasks} />
                    <Route exact path='/task/:id' component={TaskDetail} />
                    <Route exact path='/mytasks' component={MyTasks} />
                    <Route exact path='/review' component={TaskReviewMaker} />
                    <Route exact path='/profile/:id' component={PublicProfile} />

                    {/* <Redirect to='tasks' /> */}
                </Switch>
            </div>
        </div>

    )
}
export default Routes