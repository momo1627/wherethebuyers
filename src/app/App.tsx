import * as React from 'react'
import Main from './Main'
import ModalWrapper from '../components/ModalWrapper'
import showModalReducer from '../middleware/reducers/showModalReducer'
import {ToggleModal,SignInStatus,Update} from '../middleware/context'
import signInReducer from '../middleware/reducers/signInReducer';
import updateReducer from '../middleware/reducers/updateReducer';



const App = ()=>{
    const [update,UpdateDispatch] = React.useReducer(updateReducer,false);
    const [modalStatus,modalDispatch] = React.useReducer(showModalReducer,{status:false,modal:''});
    const [signInStatus,signInDispatch] = React.useReducer(signInReducer,{username:'',isSignIn:false});

    return (
        <>  
            <ToggleModal.Provider value={{modalStatus,modalDispatch}}>
                <SignInStatus.Provider value={{signInStatus,signInDispatch}}>
                    <Update.Provider value={{update,UpdateDispatch}}>
                        <Main />
                        {modalStatus.status && <ModalWrapper />}
                    </Update.Provider>
                </SignInStatus.Provider>
            </ToggleModal.Provider>
        </>
    )
}
export default App