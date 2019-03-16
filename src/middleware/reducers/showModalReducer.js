const showModalReducer = (state,action)=>{
    switch (action.type){
        case 'show':
            return {status:true,modal:action.text};
        case 'hide':
            return {status:false,modal:''};
        default:
            return new Error()
    }
}
export default showModalReducer