import * as React from 'react'
interface IProps {
    url: string;
    input: object;
    title: string;
    click: () => void;
    cancel: () => void;
}
const ConfirmActionModal = (props: IProps) => {
    const { url, input, click, title, cancel } = props;
    const [alert, setAlert] = React.useState({ status: false, message: '' })
    const handleSubmit = async () => {
        const response = await fetch(url, input).then(res => res.json())
        setAlert({ status: true, message: response.message })
    }
    return (
        <>
            <div className='confirm-container bg-warning text-center'>
                <h3>{title}?</h3>
                <div className='d-flex justify-content-around mt-auto'>
                    <button className='btn btn-primary' onClick={handleSubmit}>Confirm</button>
                    <button className='btn btn-danger' onClick={() => { cancel() }}>Cancel</button>
                </div>
            </div>
            {alert.status &&
                <div className='alert-container'>
                    <div className='alert-content bg-success text-center text-white'>
                        <button className='btn btn-sm btn-primary' onClick={() => { click(); setAlert({ status: false, message: '' }); }}>{alert.message}</button>
                    </div>
                </div>}
        </>
    )
}
export default ConfirmActionModal