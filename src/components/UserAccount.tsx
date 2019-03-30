import * as React from 'react'
import axios from 'axios'
import { SignInStatus, ToggleModal } from '../middleware/context'
import { signInAction } from '../middleware/actions/signInAction';
import { showModal, hideModal } from '../middleware/actions/showModalAction'
import useFetchData from '../middleware/customHooks/useFetchData'
import usePostData from '../middleware/customHooks/usePostData'
import FormGroup from './FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import ModalButton from './ModalButton'
import FormModal from './FormModel'
type AccontInput = {
    username: string;
    password: string;
}
type Props = {
    target: string;
    title: string;
}
const UserAccount: React.FunctionComponent<Props> = (props) => {
    const { signInStatus, signInDispatch } = React.useContext(SignInStatus);
    const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
    const [response,resetResponse,setTrigger] = usePostData()
    const [input, handleChange, setInput] = useChangeInput<AccontInput>({
        username: '',
        password: '',
    });
    
    const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTrigger(`http://localhost:5000/sign-in`,{ method: 'post', body: JSON.stringify(input), headers: { 'Content-Type': 'application/json' } })
    }
    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newUser = { ...input, signUpTime: new Date().toLocaleString() }
        setTrigger(`http://localhost:5000/sign-up`,{ method: 'post', body: JSON.stringify(newUser), headers: { 'Content-Type': 'application/json' } })
    }

    return (
        <div className={response.status === 3 ? 'post-content mx-auto bg-white p-3' : 'post-content  mx-auto bg-white p-3' }>
            <h3 className="text-center">{props.title}</h3>
            <form action="">
                <FormGroup input={input.username} change={handleChange} content="username" type='text'>We'll never share your email with anyone else.</FormGroup>
                <FormGroup input={input.password} change={handleChange} content="password" type='password'>We'll never share your password with anyone else.</FormGroup>
                <div className='d-flex justify-content-between p-0'>
                    <button className='btn btn-primary' type="submit" onClick={props.target === 'signIn' ? handleSignIn : handleSignUp}>Submit</button>
                    <button className='btn btn-danger' type="button" onClick={() => { modalDispatch(hideModal(props.target)) }}>Cancel</button>
                </div>
                <hr />
                <div className='d-flex justify-content-between p-0'>
                    <div>{props.target === 'signIn' ? "Don't have an account?" : "Already have an account"}</div>
                    <ModalButton target={props.target === 'signIn' ? "signUp" : "signIn"}>{props.target === 'signIn' ? "Sign Up" : "Sign In"}</ModalButton>
                </div>
            </form>
            {response.status === 0 && <FormModal message={response.message} cancel={() => {
                resetResponse();
                signInDispatch(signInAction(input.username as string));
                modalDispatch(hideModal(props.target))
            }} />}
            {response.status === 1 && <FormModal message={response.message} cancel={() => { resetResponse(); setInput({ username: '', password: '' }) }} />}
            {response.status === 2 && <FormModal message={response.message} cancel={() => { resetResponse(); setInput({ username: '', password: '' }); modalDispatch(hideModal(props.target)) }} />}
        </div>

    )
}
export default UserAccount