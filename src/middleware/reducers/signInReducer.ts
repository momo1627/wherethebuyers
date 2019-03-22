type  SignInStatusState= {
    username:string;
    isSignIn:boolean;
}
export type SignInAction = {
    type:string
    text:string
}
export type SignOutAction = {
    type:string
    text:''
}


const signInReducer:React.Reducer<SignInStatusState,SignOutAction|SignInAction>= (state,action)=>{
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
