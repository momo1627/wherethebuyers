import * as React from 'react'
import { SignInStatus, ToggleModal } from '../../context/context'
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
        when: Date;
    }
}
const initialResponse = {
    data: [],
    status: false,
    message: ''
}
const ReviewAndSubmit = (props: Iprops) => {
    const { signInStatus, } = React.useContext(SignInStatus)
    const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
    const [response, resetResponse, setTrigger] = usePostData(initialResponse)
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const body = {
            posterId: signInStatus.userId,
            poster: signInStatus.username,
            ...props.task,
        }
        setTrigger(`${API_Url}/task`, {  body: JSON.stringify(body)})
    }

    const handleBack = () => {
        props.handleStep(1)
    }
    const handleResponse = () => {
        resetResponse();
        modalDispatch(hideModal('postATask'));
    }
    return (
        <div>
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ "width": "100%" }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <div>
                <ul className="list-group">
                    <li className="list-group-item small "><span className='font-weight-bold'>What</span> {props.task.what}</li>
                    <li className="list-group-item small "><span className='font-weight-bold'>Where</span> {props.task.where}</li>
                    <li className="list-group-item small "><span className='font-weight-bold'>Price</span> {props.task.price}</li>
                    <li className="list-group-item small "><span className='font-weight-bold'>When</span> {props.task.when}</li>
                </ul>
            </div>
            <div className='d-flex mt-2 justify-content-around'>
                <button className='btn btn-sm btn-secondary' type="button" onClick={handleBack}>Back</button>
                <button className='btn btn-sm btn-success ' type="submit" onClick={handleSubmit}>Post</button>
            </div>
            {response.status  && <AlertModal message={response.message} confirm={handleResponse} clear={handleResponse} />}
        </div >
    )
}
export default ReviewAndSubmit