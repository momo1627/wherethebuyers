import * as React from 'react'
import { SignInStatus, ToggleModal } from '../../context/context'
import { Update } from '../../context/context'
import usePostData from '../../hooks/usePostData'
import API_Url from '../../constants/api'
import { hideModal } from '../../actions/showModalAction'

import AlertModal from '../../components/Modal/AlertModal'
interface Iprops {
    handleStep: (t: number) => void;
    task: {
        what: string;
        price: number;
        where: string;
        when: string;
    }
}
const ReviewAndSubmit = (props: Iprops) => {
    const { signInStatus, } = React.useContext(SignInStatus)
    const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
    const [response, resetResponse, setTrigger] = usePostData()
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const body = {
            posterId: signInStatus.userId,
            poster: signInStatus.username,
            ...props.task,
        }
        setTrigger(`${API_Url}/tasks`, { method: 'post', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
    }

    const handleBack = () => {
        props.handleStep(1)
    }
    const handleResponse = () => {
        resetResponse();
        if (response.status === 1) { return }
        modalDispatch(hideModal('postATask'));
    }
    return (
        <div>
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ "width": "100%" }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <div>
                <ul className="list-group">
                    <li className="list-group-item">{props.task.what}</li>
                    <li className="list-group-item">{props.task.price}</li>
                    <li className="list-group-item">{props.task.where}</li>
                    <li className="list-group-item">{props.task.when}</li>
                </ul>
            </div>
            <div className='d-flex mt-2 justify-content-around'>
                <button className='btn btn-sm btn-secondary' type="button" onClick={handleBack}>Back</button>
                <button className='btn btn-sm btn-success ' type="submit" onClick={handleSubmit}>Post</button>
            </div>
            {response.status !== 3 && <AlertModal message={response.message} confirm={handleResponse} clear={handleResponse} />}
        </div >
    )
}
export default ReviewAndSubmit