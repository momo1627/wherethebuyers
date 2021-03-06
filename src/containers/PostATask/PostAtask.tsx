import * as React from 'react'
import { hideModal } from '../../actions/showModalAction'
import { SignInStatus, ToggleModal } from '../../context/context'
import './style.css'
import WhenAndHowMuch from './WhenAndHowMuch'
import WhatAndWhere from './WhatAndWhere'
import ReviewAndSubmit from './ReviewAndSubmit'
type Step = number

const PostAtask: React.FunctionComponent = () => {
    const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
    const [what, setWhat] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(2)
    const [where, setWhere] = React.useState<string>('')
    const [when, setWhen] = React.useState<Date>(new Date())
    const [step, setStep] = React.useState<Step>(0)
    const [alert, setAlert] = React.useState(false)

    const task = { what: what, when: when, where: where, price: price }

    const cancelTask = () => {
        modalDispatch(hideModal('postATask'))
    }
    const continueTask = () => {
        setAlert(false)
    }
    return (
        <div className='post-content mx-auto bg-white p-2'>
            <div className='d-flex align-items-center justify-content-between font-weight-bold'>
                {step === 0 && <span className='text-center flex-grow-1'>What and How Much</span>}
                {step === 1 && <span className='text-center flex-grow-1'>When and Where</span>}
                {step === 2 && <span className='text-center flex-grow-1'>Check and Post!</span>}
                <button className='btn' type='button' onClick={(e) => { e.preventDefault(); setAlert(true) }}><span className='h4'>&times;</span></button>
            </div>
            {step === 0 && <WhatAndWhere what={what} where={where} handleStep={(i) => { setStep(i) }} handleWhat={(i) => { setWhat(i) }} handleWhere={(i) => { setWhere(i) }} />}
            {step === 1 && <WhenAndHowMuch when={when}  price={price} handleStep={(i) => { setStep(i) }} handleWhen={(i) => { setWhen(i) }} handlePrice={(i) => { setPrice(i) }} />}
            {step === 2 && <ReviewAndSubmit task={task} handleStep={(i) => { setStep(i) }} />}
            {alert &&
                <div className='task-alert-container small'>
                    <div className='task-alert-content bg-white text-center py-2'>
                        <h4>Sorry to see you leave</h4>
                        <p>Are you sure? You almost done !</p>
                        <div className='d-flex justify-content-around'>
                            <button className='btn btn-primary btn-sm text-center text-white' onClick={continueTask} >Continue Task</button>
                            <button className='btn btn-danger btn-sm text-center text-white' onClick={cancelTask} >Cancel Task</button>
                        </div>
                    </div>
                </div>}
        </div>

    )
}
export default PostAtask