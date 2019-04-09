import * as React from 'react'
import {ToggleModal} from '../../context/context'
import {showModal,hideModal} from '../../actions/showModalAction'
interface IProps{
    target:string;
    title:string;
}
const ErrorModal = (props:IProps)=>{
    const {modalStatus,modalDispatch} = React.useContext(ToggleModal)
    return (
        <div>
            <h3 className="text-center">{props.title}</h3>
            <div className='p-0'>
                <button className='btn btn-danger btn-sm' type="button" onClick={()=>{modalDispatch(hideModal(props.target))}}>OK</button>
            </div>
        </div>
    )
}
export default ErrorModal