import * as React from 'react'
import Main from './Main'
import ModalWrapper from '../../components/Modal/ModalWrapper'
import showModalReducer from '../../reducers/showModalReducer'
import { SignInStatus, ToggleModal, Update } from '../../context/context'
import signInReducer from '../../reducers/signInReducer';
import updateReducer from '../../reducers/updateReducer';
import { signInAction, signOutAction } from '../../actions/signInAction'
import API_Url from '../../constants/api'

const App = () => {
    const [update, updateDispatch] = React.useReducer(updateReducer, false);
    const [modalStatus, modalDispatch] = React.useReducer(showModalReducer, { status: false, modal: '' });
    const [signInStatus, signInDispatch] = React.useReducer(signInReducer, { username: '', userId: '', isSignIn: false });
    const checkSign = async () => {
        const result = await fetch(`${API_Url}/user-status`, { method: 'post', credentials: 'include' })
        const response = await result.json();
        if (response.status === 0) {
            signInDispatch(signInAction(response.data.username, response.data.userId))
        }
    }
    React.useEffect(() => { checkSign() }, [])


    return (
        <>
            <ToggleModal.Provider value={{ modalStatus, modalDispatch }}>
                <SignInStatus.Provider value={{ signInStatus, signInDispatch }}>
                    <Update.Provider value={{ update, updateDispatch }}>
                        <Main />
                        {modalStatus.status && <ModalWrapper />}
                    </Update.Provider>
                </SignInStatus.Provider>
            </ToggleModal.Provider>
        </>
    )
}
export default App