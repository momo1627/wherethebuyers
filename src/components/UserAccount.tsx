import * as React from 'react'
import * as yup from 'yup'
import { SignInStatus, ToggleModal } from '../middleware/context'
import { signInAction } from '../middleware/actions/signInAction';
import { showModal, hideModal } from '../middleware/actions/showModalAction'
import usePostData from '../middleware/customHooks/usePostData'
import FormGroup from './FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import ModalButton from './ModalButton'
import FormModal from './FormModel'
import useValidation from '../middleware/customHooks/useValidation'
const schema = yup.object().shape({
    username:yup.string().required().min(6),
    password:yup.string().required().min(6)
})
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
    const [validation,validate,setValidation] = useValidation(input,schema)
    const handleSignIn = async () => {
        setTrigger(`http://localhost:5000/sign-in`,{ method: 'post', body: JSON.stringify(input), headers: { 'Content-Type': 'application/json' } })
    }
    const handleSignUp = () => {
        const newUser = { ...input, signUpTime: new Date().toLocaleString() }
        setTrigger(`http://localhost:5000/sign-up`,{ method: 'post', body: JSON.stringify(newUser), headers: { 'Content-Type': 'application/json' } })
    }
    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
            const result = await validate();   
            if(result){props.target === 'signIn' ? handleSignIn() : handleSignUp()}
    }
    const handleCancel = ()=>{
        modalDispatch(hideModal())
    }
    const handleResponse = ()=>{
        if(response.status === 0 ){signInDispatch(signInAction(input.username as string));}
        resetResponse();
        setInput({ username: '', password: '' })
        if(response.status === 1 ){return}
        modalDispatch(hideModal(props.target))
    }
    return (
        <div className='post-content  mx-auto bg-white px-3'>
            <h5 className="text-center m-0 py-1">{props.title}</h5>
            <form action="">
                <FormGroup input={input.username} change={handleChange} size='sm' content="username" type='text'>Username</FormGroup>
                <FormGroup input={input.password} change={handleChange} size='sm' content="password" type='password'>Password</FormGroup>
                <div className='d-flex justify-content-between p-1'>
                    <button className='btn btn-sm btn-primary' type="submit" onClick={handleSubmit}>Submit</button>
                    <button className='btn btn-sm btn-danger' type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            <hr className='m-0'/>
            <div className='d-flex justify-content-between align-items-center py-1'>
                    <small>{props.target === 'signIn' ? "Don't have an account?" : "Already have an account"}</small>
                    <ModalButton target={props.target === 'signIn' ? "signUp" : "signIn"}>{props.target === 'signIn' ? "Sign Up" : "Sign In"}</ModalButton>
                </div>
            {response.status !== 3 && <FormModal message={response.message} cancel={handleResponse} />}
            {validation.error && <FormModal message={validation.message[0]} cancel={() => { setValidation({error:false,message:''}); setInput({ username: '', password: '' });  }} />}
        </div>

    )
}
export default UserAccount