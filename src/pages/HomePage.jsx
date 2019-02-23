import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import PostATask from '../components/PostAtask'
import {SignInStatus} from '../middleware/context'
const Home = ()=>{
    const [signInStatus] = useContext(SignInStatus)
    return (
        <div className='container'>
        <div>
            {signInStatus.isSignIn?
                <div className='h4'>{`Post a Task`}</div>:'Please Sign In first or Sign Up'}
        </div>
        <div>
            {signInStatus.isSignIn? 
            <PostATask /> : 
                <div className="btn-group py-2">
                  <Link className='btn btn-secondary' to='/Signin'>Sign In</Link>
                  <Link className='btn btn-secondary' to='/SignUp'>Sign Up</Link>
                </div>
            }  
        </div>
        </div>
    )
}
export default Home