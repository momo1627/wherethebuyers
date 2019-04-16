import * as React from 'react'
import { SignInStatus } from '../../context/context';
import { signOutAction } from '../../actions/signInAction'
import API_Url from '../../constants/api'

const SignOut: React.FunctionComponent = () => {
    const { signInStatus, signInDispatch } = React.useContext(SignInStatus)
    const handleSignOut = async () => {
        const result = await fetch(`${API_Url}/user`, { method: 'post',body: JSON.stringify({action:'signOut'}),headers: { 'Content-Type': 'application/json' }, credentials: "include" })
    }
    return (
        <div style={{ "maxWidth": "240px" }} className="col-6 col-md-4 col-lg-4 btn-group px-1">
            <button className='btn btn-sm btn-info p-1'>{signInStatus.username}</button>
            <button className='btn btn-sm btn-info p-1' onClick={() => {
                handleSignOut(); signInDispatch(signOutAction);
            }}>SignOut</button>
        </div>
    )
}
export default SignOut
