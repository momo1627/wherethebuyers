import * as React from 'react'
import * as yup from 'yup'
import { SignInStatus, ToggleModal } from '../../context/context'
import { signInAction } from '../../actions/signInAction';
import { showModal, hideModal } from '../../actions/showModalAction'
import useUserAdmin from '../../hooks/useUserAdmin'
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
    const [response, resetResponse, setTrigger] = useUserAdmin()
    const [input, handleChange, setInput] = useChangeInput<AccontInput>({
        username: '',
        password: '',
    });
    const [validation, validate, setValidation] = useValidation(input, schema)
    const handleSignIn = async () => {
        setTrigger(`${API_Url}/sign-in`, { method: 'post', body: JSON.stringify(input), headers: { 'Content-Type': 'application/json' } })
    }
    const handleSignUp = () => {
        setTrigger(`${API_Url}/sign-up`, { method: 'post', body: JSON.stringify(input), headers: { 'Content-Type': 'application/json' } })
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
        if (response.status === 0) {
            if (response.data) {
                signInDispatch(signInAction(response.data.username, response.data.userId))
                modalDispatch(hideModal(props.target))
            }
            ;
        }
        resetResponse();
        setInput({ username: '', password: '' })
    }
    return (
        <div className='post-content  mx-auto bg-white px-3 d-flex flex-column justify-content-around'>
            <div className=''>
                <h5 className="text-center m-0 py-1">{props.title}</h5>
                <form action="">
                    <FormGroup input={input.username} change={handleChange} size='sm' content="username" type='text' title='Username'>username at least 6</FormGroup>
                    <FormGroup input={input.password} change={handleChange} size='sm' content="password" type='password' title="Password">password at least 6</FormGroup>
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
                {/* {response.status !== 3 && <AlertModal message={response.message} cancel={handleResponse} />} */}
                {/* {validation.error && <AlertModal message={validation.message[0]} cancel={() => { setValidation({ error: false, message: '' }); setInput({ username: '', password: '' }); }} />} */}
            </div>
        </div>

    )
}
export default UserAccount