import * as React from 'react'
import {ToggleModal } from '../../context/context';
import {showModal} from '../../actions/showModalAction'
import './style.css'

type Props = {
    target:string;
}
const ModalButton:React.FunctionComponent<Props> = (props) =>{
    const {modalStatus,modalDispatch} = React.useContext(ToggleModal)

    return (
        <button type='button' className='btn btn-sm btn-primary px-1'  onClick={()=>{modalDispatch(showModal(props.target))}}>{props.children}</button>
    )
}
export default ModalButton