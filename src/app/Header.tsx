import * as React from 'react'
import SignOut from '../components/SignOut'
import { SignInStatus } from '../middleware/context';
import Nav from './Nav'
import ModalButton from '../components/ModalButton'
const Header = ()=>{
    const {signInStatus} = React.useContext(SignInStatus)
    return(
        <div className="bg-dark py-1 app-header">
            <div className='container'>
                <div className="row justify-content-between align-items-center mx-auto">
                    <Nav />
                    {
                        signInStatus.isSignIn
                        ? <SignOut />
                        : 
                        <div style={{"maxWidth":"240px"}} className="d-none d-md-block btn-group px-1">
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