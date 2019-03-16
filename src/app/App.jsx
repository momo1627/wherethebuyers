import React, {useReducer} from 'react'
import Main from './Main'
import ModalWrapper from '../components/ModalWrapper'
import showModalReducer from '../middleware/reducers/showModalReducer'
import {ToggleModal,SignInStatus,Update} from '../middleware/context'
import signInReducer from '../middleware/reducers/signInReducer';
import updateReducer from '../middleware/reducers/updateReducer';

const App = ()=>{
    const [modalStatus,modalDispatch] = useReducer(showModalReducer,false);
    const [signInStatus,signInDispatch] = useReducer(signInReducer,{isSignIn:false});
    const [update,UpdateDispatch] = useReducer(updateReducer,false);

    return (
        <>  
            <ToggleModal.Provider value={[modalStatus,modalDispatch]}>
                <SignInStatus.Provider value={[signInStatus,signInDispatch]}>
                    <Update.Provider value={[update,UpdateDispatch]}>
                        <Main />
                        {modalStatus.status && <ModalWrapper />}
                    </Update.Provider>
                </SignInStatus.Provider>
            </ToggleModal.Provider>
        </>
    )
}
export default App