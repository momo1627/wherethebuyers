import * as React from 'react'
import { startUpdate, endUpdate } from '../../actions/updateAction'
import { Update } from '../../context/context'
import './style.css'
import AlertModal from './AlertModal'
interface IProps {
    url: string;
    input: object;
    title: string;
    click: () => void;
    cancel: () => void;
}
const ConfirmActionModal = (props: IProps) => {
    const { update, updateDispatch } = React.useContext(Update)
    const { url, input, click, title, cancel } = props;
    const [alert, setAlert] = React.useState({ status: false, message: '' })
    const handleSubmit = async () => {
        const response = await fetch(url, input).then(res => res.json())
        setAlert({ status: true, message: response.message })
    }
    const handleComfirm = () => { click(); setAlert({ status: false, message: '' }); updateDispatch(startUpdate)}
    return (
        <div className='modal-container'>
            <div className='confirm-container bg-warning text-center'>
                <h3>{title}?</h3>
                <div className='d-flex justify-content-around mt-auto'>
                    <button className='btn btn-primary' onClick={handleSubmit}>Confirm</button>
                    <button className='btn btn-danger' onClick={() => { cancel() }}>Cancel</button>
                </div>
                {alert.status &&
                    <AlertModal message={alert.message} confirm={handleComfirm} clear={handleComfirm} />
                }
            </div>
        </div>

    )
}
export default ConfirmActionModal