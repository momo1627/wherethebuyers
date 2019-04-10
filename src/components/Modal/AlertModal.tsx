import * as React from 'react';
import './style.css'
interface IProp {
    message: string;
    cancel: () => void
}
const FormModal = ({ message, cancel }: IProp) => {
    return (
        <div className='response-container rounded shadow text-center'>
            <div className='response-content bg-light d-flex flex-column justify-content-around '>
                <div className='p-2 h6 rounded mx-auto text-danger font-weight-bold'>{message}</div>
                <div className=''>
                    <button className='btn btn-primary' type="button" onClick={() => { cancel() }}>OK</button>
                </div>
            </div>
        </div>
    )
}
export default FormModal