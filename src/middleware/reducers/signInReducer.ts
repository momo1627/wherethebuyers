type  SignInStatusState= {
    username:string;
    isSignIn:boolean;
}
type SignInAction = {
    type:string
    text:string
}
const signInReducer=(state:SignInStatusState,action:SignInAction):SignInStatusState=>{
    switch(action.type){
        case 'signIn':
            return {isSignIn:true,username:action.text}
        case 'signOut':
            return {isSignIn:false,username:''}
        default:
            throw new Error()
    }
}
export default signInReducer
