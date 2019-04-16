type  UpdateState = boolean
export type UpdateAction = {
    type:string
}
const updateReducer:React.Reducer<UpdateState,UpdateAction>=(state,action)=>{
    switch(action.type){
        case 'start':
            return true
        case 'end':
            return false
        default:
            throw new Error()
            
    }
}
export default updateReducer