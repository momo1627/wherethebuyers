import React,{useReducer} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Nav from './Nav'
import Header from './/Header'
import Routes from './Route'
import {SignInStatus,TaskList} from '../middleware/context'
import signInReducer from '../middleware/reducers/signInReducer';
import taskListReducer from '../middleware/reducers/taskListReducer';
const App = ()=>{
    const [signInStatus,signInDispatch] = useReducer(signInReducer,{isSignIn:false})
    const [taskList,taskListDispatch] = useReducer(taskListReducer,[])
    return(
        <Router>
            <React.Fragment>
            <SignInStatus.Provider value={[signInStatus,signInDispatch]}>
                <Header />
                <Nav />
                <TaskList.Provider value={[taskList,taskListDispatch]}>
                    <Routes />
                </TaskList.Provider>              
            </SignInStatus.Provider>
            </React.Fragment>
        </Router>
    )
}
export default App
