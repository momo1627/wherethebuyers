import React,{useState} from 'react'
function useChangeInput(initialValue){
    const [input,setInput] = useState(initialValue)
    const handleChange = (e)=>{
        const name=e.target.name;
        const value = e.target.value;
        const newInput = {[name]:value}
        setInput((prev)=>{return {...prev,...newInput}})
    }
    return [input,handleChange,setInput]
}
export default useChangeInput