import * as React from 'react'
import * as yup from 'yup'
import { SignInStatus, ToggleModal } from '../middleware/context'
import FormGroup from './FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import { hideModal } from '../middleware/actions/showModalAction'
import { startUpdate, endUpdate } from '../middleware/actions/updateAction'
import { Update } from '../middleware/context'
import FormModal from './FormModel'
import usePostData from '../middleware/customHooks/usePostData'
import useValidation from '../middleware/customHooks/useValidation'
const schema = yup.object().shape({
    what: yup.string().required(),
    price: yup.string().required(),
    when: yup.string().required(),
    where: yup.string().required()

})
interface ITaskInput {
    price: string;
    what: string;
    where: string;
    when: string;
}
const PostAtask: React.FunctionComponent = () => {
    const defaultInput = {
        price: '',
        what: '',
        where: '',
        when: '',
    }
    const [response, resetResponse, setTrigger] = usePostData()
    const { signInStatus, } = React.useContext(SignInStatus)
    const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
    const { update, updateDispatch } = React.useContext(Update)
    const [input, handleChange, setInput] = useChangeInput<ITaskInput>(defaultInput)
    const [validation, validate, setValidation] = useValidation(input, schema)
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await validate();
        if(! result){return }
        const task = {
            id: new Date().getTime().toString(),
            postedBy: signInStatus.username,
            postedTime: new Date().toLocaleString(),
            ...input,
            status: 'OPEN',
            assignedTo: 'not assigned'
        }
        if (update) { updateDispatch(endUpdate) }
        setTrigger('http://localhost:5000/tasks', { method: 'post', body: JSON.stringify(task), headers: { 'Content-Type': 'application/json' } })
        updateDispatch(startUpdate)
    }
    const handleCancel = ()=>{
        modalDispatch(hideModal('postATask'))
    }
    const handleResponse = ()=>{
        resetResponse();
        setInput(defaultInput)
        if(response.status === 1) {return}
        modalDispatch(hideModal('postATask'))
    }

    return (
        <div className='post-content mx-auto bg-white px-2'>
            <h5 className="text-center py-1">Post A Task</h5>
            <form action="" className='px-3' >
                <FormGroup type='text' size="small" change={handleChange} content={'what'} input={input.what} title="What">What do you want to buy</FormGroup>
                <FormGroup type='text' size="small" change={handleChange} content={'price'} input={input.price} title="How Much">How much do you pay</FormGroup>
                <FormGroup type='text' size="small" change={handleChange} content={'where'} input={input.where} title="Where">Where are you</FormGroup>
                <FormGroup type='text' size="small" change={handleChange} content={'when'} input={input.when} title="When">When do you need to deliver</FormGroup>
                <div className='d-flex justify-content-between py-1'>
                    <button className='btn btn-sm btn-primary' type="submit" onClick={handleSubmit}>Submit</button>
                    <button className='btn btn-sm btn-danger' type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            {response.status !==3 && <FormModal message={response.message} cancel={handleResponse} />}
            {validation.error && <FormModal message={validation.message[0]} cancel={() => { setValidation({error:false,message:''}); setInput(defaultInput);  }} />}

        </div>

    )
}
export default PostAtask