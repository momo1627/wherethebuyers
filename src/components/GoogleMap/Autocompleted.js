/* eslint-disable no-undef */
import * as React from 'react'
const Autocompleted = (props) => {
    const searchBox = React.useRef({ current: { value: '' } });
    const [input, setInput] = React.useState(props.input)
    const [predictions, setPredictions] = React.useState([])
    React.useEffect(() => {
        if (searchBox.current.value.length > 0) {
            const autoComplete = new google.maps.places.AutocompleteService()
            autoComplete.getPlacePredictions(
                {
                    input: searchBox.current.value,
                    types: ['(regions)'],
                    componentRestrictions: {
                        country: "au"
                    }
                },
                (predictions, status) => {
                    if (props.input !== input) {
                        setPredictions(predictions)
                        console.log(predictions)
                    }
                }
            )
        }
    }, [searchBox.current.value])
    const handleSelect = (e) => {
        setInput(e.target.textContent)
        props.setInput(e.target.textContent)
        setPredictions([])
    }
    const handleClear = () =>{
        setInput('')
        props.setInput('')
        setPredictions([])
    }
    return (
        <>
            <div className='input-group'>
                <input className={`p-0 form-control form-control-sm`} type="text" ref={searchBox} value={input} placeholder={'Enter a Suburb'} onChange={(e) => { setPredictions([]); setInput(e.target.value) }} />
                <button className='input-group-append btn btn-sm btn-secondary' type="button" onClick={handleClear} >Clear</button>
            </div>
            <div className="list-group position-absolute" style={{ zIndex: 1050 }}>
                {predictions && predictions.map((p) => {
                    return (
                        <span key={p.id} className='list-group-item p-1 small' onClick={handleSelect} >{p.description}</span>
                    )
                })}
            </div>
        </>
    )
}
export default Autocompleted