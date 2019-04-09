import * as React from 'react'
import PostAtask from '../../containers/App/PostAtask'
import UserAccount from '../UserAdmin/UserAccount'
import {ToggleModal} from '../../context/context'
const ModalContent = ()=>{
    const {modalStatus,modalDispatch} = React.useContext(ToggleModal)
    return (
        <div className="">
            {modalStatus.modal === 'postATask' && <PostAtask />}
            {modalStatus.modal === 'signIn' &&  <UserAccount title="Sign In" target="signIn"></UserAccount>}
            {modalStatus.modal === 'signUp' &&  <UserAccount title="Sign Up" target="signUp"></UserAccount>}
            
        </div>
    )
}
export default ModalContent