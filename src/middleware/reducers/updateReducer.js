const updateReducer=(state,action)=>{
    switch(action.type){
        case 'start':
            return true
        case 'end':
            return false
        default:
            return new Error()
    }
}
export default updateReducer