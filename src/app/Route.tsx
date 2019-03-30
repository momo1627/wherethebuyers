import * as React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from '../pages/HomePage'
import TasksList from '../pages/TaskPage'
// import Profile from '../pages/ProfilePage'
import MyTasks from '../pages/MyTasks'
import PrivateRoute from '../components/PrivateRoute'
const Routes:React.FunctionComponent = ()=>{
    return (
        <div className='app-content'>
            <div className='container'>
                <Switch >
                    <Route exact path = '/' component={Home} />
                    <Route exact path = '/tasks' component={TasksList} />
                    <Route exact path = '/tasks/:id' component={TasksList} />
                    <Route exact path = '/mytasks' component={MyTasks} />
                    {/* <PrivateRoute exact path = '/profile/:id' component={Profile} />
                    <PrivateRoute exact path="/profile" component={Profile} /> */}
                </Switch>
                </div>
        </div>
    )
}
export default Routes