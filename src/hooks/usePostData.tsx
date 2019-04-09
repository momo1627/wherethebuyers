import * as React from 'react'
import { Update } from '../context/context'
import { endUpdate } from '../actions/updateAction'
import { UpdateAction } from '../reducers/updateReducer';
interface IResponse {
    data: [];
    status: number;
    message: string
}
interface IOption {
    method: string;
    body?: any;
    headers?: any;
}
export default function usePostData():[IResponse,()=>void,(url:string,option:object)=>void] {
    const initialResponse  = {
        data:[],
        status: 3,
        message: ''
    }
    const [response, setResponse] = React.useState<IResponse>(initialResponse as IResponse)
    const postData = async (url:string,option:{}) => {
        try {
            const result = await fetch(url, {credentials:"include",...option})
            const response = await result.json()
            setResponse(response)
        } catch (error) {
            const response = {data:[],status:2,message:'Server Error'}
            setResponse(response as IResponse)
        }
    }
    const triggerPost = async (url:string,option:object)=>{
        const result = await postData(url,option);
    }
    const resetResponse = () =>{
        setResponse(initialResponse as IResponse)
    }
    return [response,resetResponse,triggerPost]
}