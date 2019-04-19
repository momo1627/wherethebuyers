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
        <span onClick={()=>{modalDispatch(showModal(props.target))}}>{props.children}</span>
    )
}
export default ModalButton