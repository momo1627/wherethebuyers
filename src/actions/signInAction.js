function signInAction(text,id){
    return {
        type:'signIn',
        text:text,
        id:id
    }
}
const signOutAction ={
    type:'signOut',
    text:'',
    id:''
}
export {signInAction,signOutAction} 