import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import SignOut from '../components/SignOut'
import { SignInStatus } from '../middleware/context';
const Header = ()=>{
    const [signInStatus] = useContext(SignInStatus)
    return(
        <div>
            <Link to='/'>WhereIsTheBuyer</Link>
            {
                signInStatus.isSignIn
                ? <SignOut />
                : 
                <>
                <Link to='/Signin'>Signin</Link>
                <Link to='/SignUp'>SignUp</Link>
                </>
            }
            
        </div>
    )
}
export default Header