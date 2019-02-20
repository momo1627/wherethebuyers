import React from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import Home from '../pages/HomePage'
import BuyersList from '../pages/BuyersPage'
import TasksList from '../pages/TaskPage'
import TaskDetail from '../pages/TaskDetailsPage'
import BuyerDetail from '../pages/BuyerDetailsPage'
import Profile from '../pages/ProfilePage'
import SignIn from '../pages/SignInPage'
import SignUp from '../pages/SignUpPage'
import PrivateRoute from '../components/PrivateRoute'
const Routes = ()=>{
    return (
        <Switch>
            <Redirect exact path='/' to='/home' />
            <Route exact path = '/home' component={Home} />
            <Route exact path = '/tasks' component={TasksList} />
            <Route exact path = '/tasks/:id' component={TaskDetail} />
            <Route exact path = '/signin' component={SignIn} />
            <Route exact path = '/signup' component={SignUp} />
            <PrivateRoute path="/buyers" component={BuyersList} />
            <PrivateRoute exact path = '/buyers/:id' component={BuyerDetail} />
            <PrivateRoute exact path = '/profile/:name' component={Profile} />
            <PrivateRoute path="/profile" component={Profile} />

        </Switch>
    )
}
export default Routes