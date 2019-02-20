import React,{useState,useContext} from 'react'
import {Redirect} from 'react-router-dom'
import SignOut from '../components/SignOut'
import {SignInStatus} from '../middleware/context'
import {signInAction} from '../middleware/actions/signInAction';
const SignIn =()=>{
    const [signInStatus,dispatch] = useContext(SignInStatus);
    const [input,setInput] = useState('')
    const handleSubmit = ()=>{
        dispatch(signInAction(input))
    }
    return (
            signInStatus.isSignIn ? <Redirect to='/profile' /> :
            <div>
            <div>Welcome to WhereTheBuyers</div>
            <form action="">
                <input type="text" placeholder='username' value={input} onChange={(e)=>{setInput(e.target.value)}}/><br/>
                <input type="password" placeholder='password' /><br/>
                <input type="button" value='SignIn' onClick={handleSubmit}/>
            </form>
        </div>
        
    )
}
export default SignIn