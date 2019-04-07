interface  SignInStatusState  {
    username:string;
    isSignIn:boolean;
    userId:string;
}
export type SignInAction = {
    type:string
    text:string
    id:string
}
export type SignOutAction = {
    type:string
    text:'';
    id:string;
}


const signInReducer:React.Reducer<SignInStatusState,SignOutAction|SignInAction>= (state,action)=>{
    switch(action.type){
        case 'signIn':
            return {isSignIn:true,username:action.text,userId:action.id}
        case 'signOut':
            return {isSignIn:false,username:'',userId:''}
        default:
            throw new Error()
    }
}
export default signInReducer
