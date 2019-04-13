import * as React from 'react'
import * as yup from 'yup'
import $ from 'jquery'
import useValidation from '../../hooks/useValidation'
import useChangeInput from '../../hooks/useChangeInput'
import AlertModal from '../../components/Modal/AlertModal'
interface Iprops {
    what:string;
    price:number
    handleStep: (t: number) => void;
    handleWhat: (t: string) => void;
    handlePrice: (t: number) => void;
}
interface IInput {
    price: number;
    what: string;
}
const schema = yup.object().shape({
    what: yup.string().required().min(6),
    price: yup.number().required().moreThan(2, 'pay more than $2 please'),
})

const defaultInput = {
    price: 0,
    what: '',
}
const WhatAndHowMuch = (props: Iprops) => {
    const [input, handleChange, setInput] = useChangeInput<IInput>({price:props.price,what:props.what})
    const [validation, validate, setValidation] = useValidation(input, schema)
    const handleNext = async () => {
        const result = await validate()
        if (!result) return
        props.handlePrice(input.price);
        props.handleWhat(input.what)
        props.handleStep(1);
    }
    return (
        <div className='py-2'>
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ "width": "33%" }} aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}></div>

            </div>
            <form action="" className='d-flex flex-column' >
                <label htmlFor="what" className="small font-weight-bold mt-2">What do you need to buy?</label>
                <input type="text" id='what' name='what' className={`p-0 form-control form-control-sm`} value={input.what} onChange={handleChange} />
                <label htmlFor="price" className="small font-weight-bold mt-2">How much do you pay?</label>
                <input type="number" min="2" id='price' name='price' className={`small w-25 p-0 form-inline form-control form-control-sm`} value={input.price} onChange={handleChange} />
                <button className='btn btn-sm btn-success mt-2' type="button" onClick={handleNext}>Next</button>
            </form>
            {validation.error && <AlertModal message={validation.message[0]} confirm={() => { setValidation({ error: false, message: '' }); }} clear={() => { setValidation({ error: false, message: '' }); setInput(defaultInput); }} />}

        </div>

    )
}
export default WhatAndHowMuch