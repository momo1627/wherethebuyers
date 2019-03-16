import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from '../pages/HomePage'
import BuyersList from '../pages/BuyersPage'
import TasksList from '../pages/TaskPage'
import TaskDetail from '../pages/TaskDetailsPage'
import BuyerDetail from '../pages/BuyerDetailsPage'
import Profile from '../pages/ProfilePage'
import PrivateRoute from '../components/PrivateRoute'
const Routes = ()=>{
    return (
        <div className='app-content'>
            <div className='container'>
                <Switch >
                    <Route exact path = '/' component={Home} />
                    <Route exact path = '/tasks' component={TasksList} />
                    <Route exact path = '/tasks/:id' component={TasksList} />
                    <Route exact path = '/tasks/detail/:id' component={TaskDetail} />
                    <PrivateRoute path="/buyers" component={BuyersList} />
                    <PrivateRoute exact path = '/buyers/:id' component={BuyerDetail} />
                    <PrivateRoute exact path = '/profile/:id' component={Profile} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                </Switch>
                </div>
        </div>
    )
}
export default Routes