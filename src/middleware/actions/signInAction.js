function signInAction(text){
    return {
        type:'signIn',
        text:text
    }
}
const signOutAction ={
    type:'signOut'
}
export {signInAction,signOutAction} 