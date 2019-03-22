function signInAction(text){
    return {
        type:'signIn',
        text:text
    }
}
const signOutAction ={
    type:'signOut',
    text:''
}
export {signInAction,signOutAction} 