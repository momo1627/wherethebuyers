import * as React from 'react'
import * as yup from 'yup'
import useValidation from '../../hooks/useValidation'
import AlertModal from '../../components/Modal/AlertModal'
import Autocompleted from '../../components/GoogleMap/Autocompleted'
interface Iprops {
    what: string;
    where: string;
    handleStep: (t: number) => void;
    handleWhat: (t: string) => void;
    handleWhere: (t: string) => void;
}
const schema = yup.object().shape({
    what: yup.string().required().min(6),
    where: yup.string().required()
})
const WhatAndHowMuch = (props: Iprops) => {
    const [what, setWhat] = React.useState(props.what);
    const [where, setWhere] = React.useState(props.where)
    const [validation, validate, setValidation] = useValidation({ what, where }, schema)
    const handleNext = async () => {
        const result = await validate()
        if (!result) return
        props.handleWhat(what)
        props.handleWhere(where)
        props.handleStep(1);
    }
    return (
        <div className='py-2'>
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ "width": "33%" }} aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <form action="" className='d-flex flex-column' >
                <label htmlFor="what" className="font-weight-bold mt-2">What do you need to buy?</label>
                <input type="text" id='what' name='what' className={`p-0 form-control form-control-sm`} value={what} onChange={(e) => { setWhat(e.target.value) }} />
                <label htmlFor="where" className="font-weight-bold mt-2">Where will it be send?</label>
                <div>
                    <Autocompleted input={where} setInput={(i: string) => { setWhere(i) }} />
                </div>
                <small className='text-muted'>suggest surburb only</small>
                <button className='btn btn-sm btn-success mt-2' type="button" onClick={handleNext}>Next</button>
            </form>
            {validation.error && <AlertModal message={validation.message[0]} confirm={() => { setValidation({ error: false, message: '' }); }} clear={() => { setValidation({ error: false, message: '' }); setWhat(''), setWhere('') }} />}

        </div>

    )
}
export default WhatAndHowMuch