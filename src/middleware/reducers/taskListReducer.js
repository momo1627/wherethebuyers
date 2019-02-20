const taskListReducer=(state,action)=>{
    switch(action.type){
        case 'add':
            return [...state,action.text]
        
        default:
            return new Error()
    }
}
export default taskListReducer
// ,username:action.text