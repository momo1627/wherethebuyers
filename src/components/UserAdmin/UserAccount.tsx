import * as React from 'react'
import * as yup from 'yup'
import { SignInStatus, ToggleModal } from '../../context/context'
import { signInAction } from '../../actions/signInAction';
import { showModal, hideModal } from '../../actions/showModalAction'
import usePostData from '../../hooks/usePostData'
import FormGroup from '../FormGroup'
import useChangeInput from '../../hooks/useChangeInput'
import ModalButton from '../Modal/ModalButton'
import AlertModal from '../Modal/AlertModal'
import useValidation from '../../hooks/useValidation'
import API_Url from '../../constants/api'
const schema = yup.object().shape({
    username: yup.string().required().min(6),
    password: yup.string().required().min(6)
})
const initialResponse = {
    data: {
        username: '',
        userId: ''
    },
    status: false,
    message: ''
}
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
    const [response, resetResponse, setTrigger] = usePostData(initialResponse)
    const [input, handleChange, setInput] = useChangeInput<AccontInput>({
        username: 'jiangren01',
        password: '111111',
    });
    const [validation, validate, setValidation] = useValidation(input, schema)
    const handleSignIn = async () => {
        setTrigger(`${API_Url}/user`, {body: JSON.stringify({...input,action:'signIn'})})
    }
    const handleSignUp = () => {
        setTrigger(`${API_Url}/user`, {body: JSON.stringify({...input,action:'signUp'})})
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await validate();
        if (result) { props.target === 'signIn' ? handleSignIn() : handleSignUp() }
    }
    const handleCancel = () => {
        modalDispatch(hideModal())
    }
    const handleResponse = () => {
        if (response.data) {
                signInDispatch(signInAction(response.data.username, response.data.userId));
                modalDispatch(hideModal(props.target));
                window.location.href='/mytasks'
        }
        resetResponse();
        setInput({ username: '', password: '' })
    }
    return (
        <div className='post-content mx-auto bg-white px-3 d-flex flex-column justify-content-around'>
            <div className=''>
                <h5 className="text-center m-0 py-1">{props.title}</h5>
                <form action="">
                    <FormGroup input={input.username} change={handleChange}  content="username" type='text' title='Username'>username at least 6</FormGroup>
                    <FormGroup input={input.password} change={handleChange}  content="password" type='password' title="Password">password at least 6</FormGroup>
                    <div className='d-flex justify-content-between p-1'>
                        <button className='btn btn-sm btn-primary' type="submit" onClick={handleSubmit}>Submit</button>
                        <button className='btn btn-sm btn-danger' type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
                <hr className='m-0' />
                <div className='d-flex justify-content-between align-items-center py-1'>
                    <small>{props.target === 'signIn' ? "Don't have an account?" : "Already have an account"}</small>
                    <ModalButton target={props.target === 'signIn' ? "signUp" : "signIn"}>{props.target === 'signIn' ? "Sign Up" : "Sign In"}</ModalButton>
                </div>
                {response.status && <AlertModal message={response.message} confirm={handleResponse} clear={handleResponse} />}
                {validation.error && <AlertModal message={validation.message[0]} confirm={() => { setValidation({ error: false, message: '' }); }}  clear={() => { setValidation({ error: false, message: '' }); setInput({ username: '', password: '' }); }} />}
            </div>
        </div>

    )
}
export default UserAccount