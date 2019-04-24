import * as React from 'react'
import * as yup from 'yup'
import useValidation from '../../hooks/useValidation'
import useChangeInput from '../../hooks/useChangeInput'
import AlertModal from '../../components/Modal/AlertModal'
interface IProps {
    when: Date;
    price: number;
    handleStep: (t: number) => void;
    handleWhen: (t: Date) => void;
    handlePrice: (t: number) => void;

}

interface Iinput {
    when: Date;
    price: number;

}
const schema = yup.object().shape({
    when: yup.date().required().min(new Date()),
    price: yup.number().required().moreThan(2, 'pay more than $2 please'),

})

const defaultInput = {
    when: new Date(),
    price: 2
}
const WhenAndWhere = (props: IProps) => {
    const [input, handleChange, setInput] = useChangeInput<Iinput>({ when: props.when, price: props.price })
    const [when, setWhen] = React.useState()
    const [validation,setValidation] = React.useState({error:false,message:''})
    const handleNext = async () => {
        try {
            const result = await schema.validate({ when: when, price: input.price })
            console.log(result);
            props.handleWhen(when);
            props.handlePrice(input.price);
            props.handleStep(2);
        } catch (error) {
            console.log(error);
            setValidation({error:true,message:error.message})
        }

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
                <label htmlFor="when" className="font-weight-bold mt-2">When do you need it?</label>
                <input type="datetime-local" id='when' name='when' className={`p-0 form-control form-control-sm`} value={when} onChange={(e) => { setWhen(e.target.value) }} />
                <label htmlFor="price" className="font-weight-bold mt-2">How much do you pay?</label>
                <input type="number" min="2" id='price' name='price' className={`w-25 p-0 form-inline form-control form-control-sm`} value={input.price} onChange={handleChange} />
                <div className='d-flex mt-2 justify-content-around'>
                    <button className='btn btn-sm btn-secondary' type="button" onClick={handleBack}>Back</button>
                    <button className='btn btn-sm btn-success' type="button" onClick={handleNext}>Next</button>
                </div>
            </form>
            {validation.error && <AlertModal message={validation.message} confirm={() => { setValidation({ error: false, message: '' }); }} clear={() => { setValidation({ error: false, message: '' }); setInput(defaultInput); }} />}

        </div >
    )
}
export default WhenAndWhere