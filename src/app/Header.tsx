import * as React from 'react'
import SignOut from '../components/SignOut'
import { SignInStatus, ToggleModal } from '../middleware/context';
import Nav from './Nav'
import ModalButton from '../components/PostButton'
const Header = ()=>{
    const {signInStatus} = React.useContext(SignInStatus)
    return(
        <div className="bg-dark py-1 app-header">
            <div className='container'>
                <div className="row justify-content-between align-items-center mx-auto">
                    <Nav />
                    <ModalButton target={signInStatus.isSignIn?"postATask":"signIn"}>Post A Task</ModalButton>
                    {
                        signInStatus.isSignIn
                        ? <SignOut />
                        : 
                        <div style={{"maxWidth":"240px"}} className="col-6 col-md-4 col-lg-4 btn-group px-1">
                        <ModalButton target="signIn">Sign In</ModalButton>
                        <ModalButton target="signUp">Sign Up</ModalButton>
                        </div>
                    }
                </div>  
            </div>
        </div>
    )
}
export default Header