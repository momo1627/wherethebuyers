import * as React from 'react'
import {Link} from 'react-router-dom'
import {SignInStatus} from '../middleware/context'
const Nav = ()=>{
    const {signInStatus} = React.useContext(SignInStatus)
    return (
        <nav className="p-0 navbar navbar-dark navbar-expand-sm col-12 col-md-6 ">
            <Link className='navbar-brand' to='/'>WITB</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav nav-pills">
            <Link className="nav-item nav-link text-white  btn-outline-primary mr-2"  to='/tasks'>Tasks</Link>
            <Link className="nav-item nav-link text-white  btn-outline-primary" to='/mytasks'>MyTasks</Link>
            
            {/* <Link className="nav-item nav-link text-white" to={signInStatus.isSignIn?`/profile/${signInStatus.username}`:'/profile'}>Profile</Link> */}
            </div>
            </div>
        </nav>
    )
}
export default Nav