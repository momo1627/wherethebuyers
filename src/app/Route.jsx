import React from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import Home from '../pages/HomePage'
import Buyers from '../pages/BuyersPage'
import Tasks from '../pages/TaskPage'
import Profile from '../pages/ProfilePage'
import SignIn from '../pages/SignInPage'
import SignUp from '../pages/SignUpPage'
const Routes = ()=>{
    return (
        <Switch>
            <Redirect exact path='/' to='/home' />
            <Route exact path = '/home' component={Home} />
            <Route exact path = '/tasks' component={Tasks} />
            <Route exact path = '/buyers' component={Buyers} />
            <Route exact path = '/profile' component={Profile} />
            <Route exact path = '/signin' component={SignIn} />
            <Route exact path = '/signup' component={SignUp} />
        </Switch>
    )
}
export default Routes