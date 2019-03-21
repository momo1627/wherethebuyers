type  UpdateState = boolean
type UpdateAction = {
    type:string
}
const updateReducer=(state:UpdateState,action:UpdateAction):UpdateState=>{
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