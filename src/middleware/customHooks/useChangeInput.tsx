import * as React from 'react'
interface IChange  {
    (e:React.ChangeEvent<HTMLInputElement>):void
}

function useChangeInput<T>(initialValue:T):[T,IChange,React.Dispatch<React.SetStateAction<T>>]{
    const [input,setInput] = React.useState(initialValue)
    const handleChange:IChange = (e)=>{
        const name=e.target.name;
        const value = e.target.value;
        const newInput = {[name]:value}
        setInput((prev)=>{return {...prev,...newInput}})
    }
    return [input,handleChange,setInput]
}
export default useChangeInput