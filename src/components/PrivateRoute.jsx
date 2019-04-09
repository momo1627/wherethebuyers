import * as React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {SignInStatus} from '../context/context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {signInStatus} = React.useContext(SignInStatus);
    return(
    <Route
      {...rest}
      render={props =>
        signInStatus.isSignIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );}

export default PrivateRoute