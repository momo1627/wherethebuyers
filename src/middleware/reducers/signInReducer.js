const signInReducer=(state,action)=>{
    switch(action.type){
        case 'signIn':
            return {isSignIn:true,username:action.text}
        case 'signOut':
            return {isSignIn:false}
        default:
            return new Error()
    }
}
export default signInReducer
// ,username:action.text