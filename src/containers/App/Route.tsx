import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import BrowseTasks from '../BrowseTasks/TaskPage'
import MyTasks from '../MyTasks/MyTasks'
import TaskDetail from '../TaskDetail/TaskDetailsPage'
import Autocompleted from '../../components/GoogleMap/Autocompleted'
import PrivateRoute from '../../components/PrivateRoute';
import ReviewMaker from '../TaskDetail/ReviewMaker'
const Routes: React.FunctionComponent = () => {
    return (
        <div className='app-content'>
            <div className='app-container'>
                <Switch >
                    <Route  path='/tasks' component={BrowseTasks} />
                    {/* <Route exact path='/tasks/:id' component={BrowseTasks} /> */}
                    <Route exact path='/mytasks' component={MyTasks} />
                    <Route exact path='/review' component={ReviewMaker} />
                    <Route path = '/search' render={()=>{return <Autocompleted where='zetland' />}} />
                    {/* <Redirect to='tasks' /> */}
                </Switch>
            </div>
        </div>

    )
}
export default Routes