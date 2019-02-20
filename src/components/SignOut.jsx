import React,{useContext} from 'react'
import { SignInStatus } from '../middleware/context';
import {signOutAction} from '../middleware/actions/signInAction'
const SignOut = ({location})=>{
    const [signInStatus,dispatch] = useContext(SignInStatus)
    return (
        <>
        <span>welcome,{signInStatus.username}</span>
        <button onClick={()=>{dispatch(signOutAction)}}>SignOut</button>
        </>
    )
}
export default SignOut
