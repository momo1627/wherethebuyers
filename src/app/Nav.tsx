import * as React from 'react'
import {Link} from 'react-router-dom'
import ModalButton from '../components/PostButton'
import {SignInStatus} from '../middleware/context'
const Nav = ()=>{
    const {signInStatus} = React.useContext(SignInStatus)
    return (
        <nav className="col-12 col-sm-6 navbar navbar-dark">
            <div className="nav nav-pills nav-fill flex">
            <Link className="mr-2 nav-item nav-link text-white  btn-outline-primary"  to='/tasks'>Tasks</Link>
            <Link className="mr-2 nav-item nav-link text-white  btn-outline-primary" to='/mytasks'>MyTasks</Link>
            <ModalButton target={signInStatus.isSignIn?"postATask":"signIn"}>Post A Task</ModalButton>
            
            {/* <Link className="nav-item nav-link text-white" to={signInStatus.isSignIn?`/profile/${signInStatus.username}`:'/profile'}>Profile</Link> */}
            </div>
        </nav>
    )
}
export default Nav