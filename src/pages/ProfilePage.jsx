import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {SignInStatus} from '../middleware/context'
const Profile = (props)=>{
    const [signInStatus] = useContext(SignInStatus)
    return (
        <div>
            My Profile 
        <div>
            {signInStatus.isSignIn?`welcome,${signInStatus.username},you can view your detail`:'Please signIn first or signUp'}
        </div>
        <div>
            {signInStatus.isSignIn? 'Show Your Detail' : <>
                <Link to='/Signin'>Signin</Link>
                <Link to='/SignUp'>SignUp</Link>
                </>}  
        </div>
        </div>
    )
}
export default Profile