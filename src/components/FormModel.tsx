import * as React from 'react';
interface IProp {
    message: string;
    cancel: () => void
}
const FormModal = ({ message, cancel }: IProp) => {
    return (
        <div className='h6 mt-3 rounded shadow text-center'>
            <div className='text-danger'>{message}</div>
            <div className='mt-2'>
                <button className='btn-sm btn btn-warning' type="button" onClick={() => { cancel() }}>OK</button>
            </div>
        </div>
    )
}
export default FormModal