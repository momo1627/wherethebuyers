import * as React from 'react'
import * as yup from 'yup'
import moment from 'moment'
import useValidation from '../../hooks/useValidation'
import useChangeInput from '../../hooks/useChangeInput'
import AlertModal from '../../components/Modal/AlertModal'
interface IProps {
    when: string;
    where: string;
    handleStep: (t: number) => void;
    handleWhen: (t: string) => void;
    handleWhere: (t: string) => void;
}

interface Iinput {
    when: string;
    where: string;
}
const schema = yup.object().shape({
    when: yup.string().required(),
    where: yup.string().required()
})

const defaultInput = {
    where: '',
    when: '',
}
const WhenAndWhere = (props: IProps) => {
    const [input, handleChange, setInput] = useChangeInput<Iinput>({ when: props.when, where: props.where })
    const [validation, validate, setValidation] = useValidation(input, schema)
    const handleNext = async () => {
        const result = await validate()
        if (!result) return
        props.handleWhen(input.when);
        props.handleWhere(input.where)
        props.handleStep(2);
    }
    const handleBack = () => {
        props.handleStep(0)
    }
    return (
        <div>
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ "width": "66%" }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <form action="" className='px-3 d-flex flex-column' >
                <label htmlFor="when" className="small font-weight-bold mt-2">When do you need it?</label>
                <input type="datetime-local" id='when' name='when' className={`p-0 form-control form-control-sm`} value={input.when} onChange={handleChange} />
                <label htmlFor="where" className="small font-weight-bold mt-2">Where will it be send?</label>
                <input type="text" id='where' name='where' className={`p-0 form-control form-control-sm`} value={input.where} onChange={handleChange} />
                <small className='text-muted'>suggest surburb only</small>
                <div className='d-flex mt-2 justify-content-around'>
                    <button className='btn btn-sm btn-secondary' type="button" onClick={handleBack}>Back</button>
                    <button className='btn btn-sm btn-success' type="button" onClick={handleNext}>Next</button>
                </div>
            </form>
            {validation.error && <AlertModal message={validation.message[0]} confirm={() => { setValidation({ error: false, message: '' }); }} clear={() => { setValidation({ error: false, message: '' }); setInput(defaultInput); }} />}

        </div >
    )
}
export default WhenAndWhere