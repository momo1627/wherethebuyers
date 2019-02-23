import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import SignOut from '../components/SignOut'
import { SignInStatus } from '../middleware/context';
import Nav from './Nav'
const Header = ()=>{
    const [signInStatus] = useContext(SignInStatus)
    return(
        <div className="bg-dark ">
        <div className='container py-2'>
        <div className="row justify-content-between align-items-center mx-auto">
        <Nav  />
            {
                signInStatus.isSignIn
                ? <SignOut />
                : 
                <div className="col-md-4 btn-group py-2">
                  <Link className='btn btn-secondary' to='/Signin'>Sign In</Link>
                  <Link className='btn btn-secondary' to='/SignUp'>Sign Up</Link>
                </div>
            }
        </div>  
        </div>
        </div>
    )
}
export default Header