import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ModalButton from '../../components/Modal/ModalButton'
import SignOut from '../../components/UserAdmin/SignOut'
import { SignInStatus } from '../../context/context'
import PostButton from '../../components/Modal/ModalButton'

const Nav = () => {
    const { signInStatus } = React.useContext(SignInStatus)
    return (
        <nav className="fixed-top bg-dark navbar-expand-sm navbar-dark">
            <div className='header-container navbar flex-sm-row-reverse'>
                <div className='d-sm-none'>
                    <PostButton target={signInStatus.isSignIn ? "postATask" : "signIn"}>Post A Task</PostButton>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav justify-content-between">
                        <div className="nav-item nav-link " data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <NavLink activeClassName='nav-link-active' className="text-white text-decoration-none" to='/tasks' >Browse Tasks</NavLink>
                        </div>
                        <div className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            {signInStatus.isSignIn && <NavLink activeClassName='nav-link-active' className="text-white text-decoration-none" to='/mytasks'>MyTasks</NavLink>}
                        </div>
                        <div className='d-none d-sm-block nav-item nav-link'>
                            <PostButton target={signInStatus.isSignIn ? "postATask" : "signIn"}>Post A Task</PostButton>
                        </div>
                        <div className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            {
                                signInStatus.isSignIn
                                    ? <SignOut />
                                    :
                                    <div style={{ "maxWidth": "240px" }} className="mx-auto btn-group px-1">
                                        <ModalButton target="signIn">Sign In</ModalButton>
                                        <ModalButton target="signUp">Sign Up</ModalButton>
                                    </div>
                            }
                        </div>
                    </ul>

                </div>
            </div>

        </nav>
    )
}
export default Nav