import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import PostATask from '../components/PostAtask'
import {SignInStatus} from '../middleware/context'
const Home = ()=>{
    const [signInStatus] = useContext(SignInStatus)
    return (
        <>
        <div>
            Home Page 
        </div>
        <div>
            {signInStatus.isSignIn?`welcome,${signInStatus.username},you can post a task`:'Please signIn first or signUp'}
        </div>
        <div>
            {signInStatus.isSignIn? <PostATask /> : <>
                <Link to='/Signin'>Signin</Link>
                <Link to='/SignUp'>SignUp</Link>
                </>}  
        </div>
        </>
    )
}
export default Home