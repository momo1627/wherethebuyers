import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './Header'
import Routes from './Route'
const Main = ()=>{
    return(
        <Router>
            <React.Fragment>
                <Header />
                <Routes />
            </React.Fragment>
        </Router>
        
    )
}
export default Main
