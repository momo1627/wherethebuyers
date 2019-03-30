import * as React from 'react'
import PostAtask from './PostAtask'
import UserAccount from './UserAccount'
import {ToggleModal} from '../middleware/context'
import ErrorModal from './ErrorModal'
const ModalContent:React.FunctionComponent = ()=>{
    const {modalStatus,modalDispatch} = React.useContext(ToggleModal)
    return (
        <div className="">
            {modalStatus.modal === 'postATask' && <PostAtask />}
            {modalStatus.modal === 'signIn' &&  <UserAccount title="Sign In" target="signIn"></UserAccount>}
            {modalStatus.modal === 'signUp' &&  <UserAccount title="Sign Up" target="signUp"></UserAccount>}
            {modalStatus.modal === 'signUp' &&  <ErrorModal title="UserError" target="userError"></ErrorModal>}
        </div>
    )
}
export default ModalContent