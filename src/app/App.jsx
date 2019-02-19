import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Nav from './Nav'
import Header from './/Header'
import Routes from './Route'
const App = ()=>{
    return(
        <div>
        <Router>
            <React.Fragment>
                <Header />
                <Nav />
                <Routes />
            </React.Fragment>
        </Router>
        </div>
    )
}
export default App