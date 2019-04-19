import * as React from 'react'
import { SignInStatus } from '../../context/context';
import { signOutAction } from '../../actions/signInAction'
import API_Url from '../../constants/api'
const SignOut: React.FunctionComponent = () => {
    const { signInStatus, signInDispatch } = React.useContext(SignInStatus)
    const handleSignOut = async () => {
        const result = await fetch(`${API_Url}/user`, { method: 'post',body: JSON.stringify({action:'signOut'}),headers: { 'Content-Type': 'application/json' }, credentials: "include" })
        signInDispatch(signOutAction)
        window.location.href = '/'
    }
    return (
        <div style={{ "maxWidth": "240px" }} className="">
            <button className='btn btn-sm btn-info' onClick={() => {
                handleSignOut(); ;
            }}>SignOut</button>
        </div>
    )
}
export default SignOut
