import * as React from 'react';
import './style.css'
interface IProp {
    message: string;
    clear: () => void
    confirm: () => void

}
const FormModal = ({ message, clear, confirm }: IProp) => {
    return (
        <div className='alert-container rounded shadow text-center'>
            <div className='alert-content bg-light d-flex flex-column justify-content-around '>
                <div className='p-2 small rounded mx-auto text-danger font-weight-bold'>{message}</div>
                <div className='d-flex justify-content-between p-2'>
                    <button className='btn btn-primary btn-sm' type="button" onClick={() => { confirm() }}>ok</button>
                    <button className='btn btn-danger btn-sm' type="button" onClick={() => { clear() }}>clear</button>
                </div>
            </div>
        </div>
    )
}
export default FormModal