import React,{useReducer} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import Header from './/Header'
import Routes from './Route'
import {SignInStatus,Update} from '../middleware/context'
import signInReducer from '../middleware/reducers/signInReducer';
import updateReducer from '../middleware/reducers/updateReducer';
const App = ()=>{
    const [signInStatus,signInDispatch] = useReducer(signInReducer,{isSignIn:false})
    const [update,UpdateDispatch] = useReducer(updateReducer,false)
    return(
        <Router>
            <React.Fragment>
            <SignInStatus.Provider value={[signInStatus,signInDispatch]}>
                <Header/>
                <Update.Provider value={[update,UpdateDispatch]}>
                    <Routes />
                </Update.Provider>              
            </SignInStatus.Provider>
            </React.Fragment>
        </Router>
    )
}
export default App
