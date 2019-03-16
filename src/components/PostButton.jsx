import React,{useContext} from 'react'
import {ToggleModal } from '../middleware/context';
import {showModal} from '../middleware/actions/showModalAction'
const ModalButton = (props) =>{
    const [modalStatus,modalDispatch] = useContext(ToggleModal)

    return (
        <button type='button'   className='btn btn-sm btn-primary'  onClick={()=>{modalDispatch(showModal(props.target))}}>{props.children}</button>
    )
}
export default ModalButton