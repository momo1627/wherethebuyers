type ToggleModalState = {
    status:boolean;
    modal:string;
}
type ToggleModalAction = {
    type:string;
    text:string;
}
const showModalReducer = (state:ToggleModalState,action:ToggleModalAction):ToggleModalState=>{
    switch (action.type){
        case 'show':
            return {status:true,modal:action.text};
        case 'hide':
            return {status:false,modal:''};
        default:
            throw new Error()
    }
}
export default showModalReducer