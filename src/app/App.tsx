import * as React from 'react'
import Main from './Main'
import ModalWrapper from '../components/ModalWrapper'
import showModalReducer from '../middleware/reducers/showModalReducer'
import { SignInStatus, ToggleModal, Update } from '../middleware/context'
import signInReducer from '../middleware/reducers/signInReducer';
import updateReducer from '../middleware/reducers/updateReducer';
import { signInAction, signOutAction } from '../middleware/actions/signInAction'
import API_Url from '../middleware/api'

const App = () => {
    const [update, updateDispatch] = React.useReducer(updateReducer, false);
    const [modalStatus, modalDispatch] = React.useReducer(showModalReducer, { status: false, modal: '' });
    const [signInStatus, signInDispatch] = React.useReducer(signInReducer, { username: '',userId:'', isSignIn: false });
    const checkSign = async () => {
      
        const result = await fetch(`${API_Url}/validation`, { method: 'get', credentials: 'include' })
        const response = await result.json();
        const data = response.data
        if (data.status) {
            signInDispatch(signInAction(data.username,data.userId))
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