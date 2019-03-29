import * as React from 'react'
import {Link} from 'react-router-dom'
import PostButton from '../components/ModalButton'
import {SignInStatus} from '../middleware/context'
const Nav = ()=>{
    const {signInStatus} = React.useContext(SignInStatus)
    return (
        <nav className="col-12 col-sm-6 navbar navbar-dark">
            <div className="nav nav-pills nav-fill flex">
            <Link className="mr-2 nav-item nav-link text-white  btn-outline-primary"  to='/tasks'>Tasks</Link>
            <Link className="mr-2 nav-item nav-link text-white  btn-outline-primary" to='/mytasks'>MyTasks</Link>
            <PostButton target={signInStatus.isSignIn?"postATask":"signIn"}>Post A Task</PostButton>
            </div>
        </nav>
    )
}
export default Nav