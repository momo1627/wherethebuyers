import * as React from 'react'
import * as yup from 'yup'
import { SignInStatus, ToggleModal } from '../../context/context'
import usePostData from '../../hooks/usePostData'
import useChangeInput from '../../hooks/useChangeInput'
import AlertModal from '../../components/Modal/AlertModal'
import useValidation from '../../hooks/useValidation'
import API_Url from '../../constants/api'
import './style.css'
const schema = yup.object().shape({
    content: yup.string().required().min(10),
    rating: yup.number().required().moreThan(0)
})
const initialResponse = {
    data: {
        content: '',
        rating: 0
    },
    status: false,
    message: ''
}
type Review = {
    content: string,
    rating: number,

}
type Props = {
    reviewId: string;
    role: string;
}
const UserAccount: React.FunctionComponent<Props> = (props) => {
    const { signInStatus, signInDispatch } = React.useContext(SignInStatus);
    const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
    const [response, resetResponse, setTrigger] = usePostData(initialResponse)
    const reviewContent = React.useRef()
    const [input, handleChange, setInput] = useChangeInput<Review>({
        content: '',
        rating: 0
    });
    const [validation, validate, setValidation] = useValidation(input, schema)
    const handleReview = async () => {
        setTrigger(`${API_Url}/user`, { body: JSON.stringify({ ...input, action: 'signIn' }) })
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await validate();
        if (result) { handleReview() }
    }
    return (
        <div className='modal-container'>
            <div className='review-container mx-auto bg-white p-1'>
                <div>Review as {props.role}</div>
                <div className='d-flex flex-column flex-md-row justify-content-between'>
                    <textarea name="content" className='form-control' cols={3} rows={3} value={input.content} onChange={handleChange}></textarea>
                    <div className='d-flex flex-column justify-content-between p-1'>
                        <div className='w-50 d-flex flex-row-reverse justify-content-end'>
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
                        <div>Rating {input.rating}</div>
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-sm btn-primary' onClick={handleSubmit}>Submit</button>
                            <button className='btn btn-sm ml-1 btn-danger'>Cancel</button>
                        </div>
                    </div>
                </div>
                {validation.error && <AlertModal message={validation.message[0]} confirm={() => { setValidation({ error: false, message: '' }); }} clear={() => { setValidation({ error: false, message: '' }); setInput(initialResponse.data); }} />}
                {/* {response.status && <AlertModal message={response.message} confirm={handleResponse} clear={handleResponse} />} */}

            </div>

        </div>

    )
}
export default UserAccount