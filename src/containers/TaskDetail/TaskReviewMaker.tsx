import * as React from 'react'
import * as yup from 'yup'
import useChangeInput from '../../hooks/useChangeInput'
import AlertModal from '../../components/Modal/AlertModal'
import useValidation from '../../hooks/useValidation'
import API_Url from '../../constants/api'
import { startUpdate, endUpdate } from '../../actions/updateAction';
import { Update } from '../../context/context'
import './style.css'
const schema = yup.object().shape({
    message: yup.string().required().min(10),
    rating: yup.number().required().moreThan(0)
})
const initialResponse = {
    status: false,
    message: ''
}

type Props = {
    reviewId: string;
    cancel: () => void;
    role: string;
}
const TaskReviewMaker: React.FunctionComponent<Props> = (props) => {
    const { update, updateDispatch } = React.useContext(Update)
    const [response, setResponse] = React.useState(initialResponse)
    const [rating,setRating] = React.useState(0);
    const [message,setMessage] = React.useState('');
    const [validation, validate, setValidation] = useValidation({rating:rating,message:message}, schema)
    const SubmitReview = async () => {
        console.log({rating:rating,message:message})
        const validation = await validate();
        if (!validation) return
        const result = await fetch(`${API_Url}/review/${props.reviewId}`, { body: JSON.stringify({rating:rating,message:message, role: props.role }), method: 'put', headers: { 'Content-Type': 'application/json' } })
        const response = await result.json();
        setResponse({ status: result.ok, message: response.message as string })
    }
    const handleResponse = () => {
        props.cancel();
        setResponse(initialResponse);
        updateDispatch(startUpdate)
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = parseInt(e.target.value);
        setRating(value)
    }
    const handleTextArea = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const value = e.target.value;
        setMessage(value)
    }
    return (
        <div className='modal-container'>
            <div className='review-container mx-auto text-center bg-white p-1'>
                <div>Review as {props.role}</div>
                <div className=''>
                    <div className='d-flex flex-column justify-content-between '>
                        <div className='d-flex flex-row-reverse justify-content-end'>
                            <input type="radio" id='rating-input5' name='rating' className='rating-input' value={5} onChange={handleChange} />
                            <label htmlFor="rating-input5" className='rating-star'>★</label>
                            <input type="radio" id='rating-input4' name='rating' className='rating-input' value={4} onChange={handleChange} />
                            <label htmlFor="rating-input4" className='rating-star'>★</label>
                            <input type="radio" id='rating-input3' name='rating' className='rating-input' value={3} onChange={handleChange} />
                            <label htmlFor="rating-input3" className='rating-star'>★</label>
                            <input type="radio" id='rating-input2' name='rating' className='rating-input' value={2} onChange={handleChange} />
                            <label htmlFor="rating-input2" className='rating-star'>★</label>
                            <input type="radio" id='rating-input1' name='rating' className='rating-input' value={1} onChange={handleChange} />
                            <label htmlFor="rating-input1" className='rating-star'>★</label>
                        </div>
                        <textarea name="content" className='form-control p-0' placeholder='leave messages' value={message} onChange={handleTextArea}></textarea>
                        <div className='d-flex justify-content-between mt-1'>
                            <button className='btn btn-sm btn-primary' onClick={SubmitReview}>Submit</button>
                            <button className='btn btn-sm btn-danger' onClick={props.cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
                {validation.error && <AlertModal message={validation.message[0]} confirm={() => { setValidation({ error: false, message: '' }); }} clear={() => { setValidation({ error: false, message: '' })}} />}
                {response.status && <AlertModal message={response.message} confirm={handleResponse} clear={handleResponse} />}
            </div>
        </div>
    )
}
export default TaskReviewMaker