import React,{useContext} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {SignInStatus} from '../middleware/context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [signInStatus] = useContext(SignInStatus);
    return(
    <Route
      {...rest}
      render={props =>
        signInStatus.isSignIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );}

export default PrivateRoute