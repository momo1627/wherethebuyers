import * as React from 'react'
import * as yup from 'yup'

interface IValidation {
    error:boolean;
    message:string[]|string
}
export default function useValidation<T>(input:T,schema:yup.Schema<T>):[IValidation,()=>object|boolean,React.Dispatch<React.SetStateAction<IValidation>>]{
    const [validation,setValidation] = React.useState<IValidation>({error:false,message:''})
    const validate = async()=>{
        try {
            const result = await schema.validate(input)
            return result 
        } catch (error) {
            setValidation({error:true,message:error.errors})
            return false
        }
    }
    return [validation,validate,setValidation]
}