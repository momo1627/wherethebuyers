import * as React from 'react';
interface IProp {
    message: string;
    cancel: () => void
}
const FormModal = ({ message, cancel }: IProp) => {
    return (
        <div className='response-container rounded shadow text-center'>
            <div className='response-content bg-light d-flex flex-column justify-content-around '>
            <div className='p-2 rounded mx-auto text-danger font-weight-bold'>{message}</div>
            <div className=''>
                <button className='p-2 btn btn-sm btn-primary w-25' type="button" onClick={() => { cancel() }}>OK</button>
            </div>
            </div>
        </div>
    )
}
export default FormModal