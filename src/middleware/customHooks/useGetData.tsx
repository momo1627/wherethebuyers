import * as React from 'react'
import axios from 'axios'
import {Update} from '../context'
import {endUpdate} from '../actions/updateAction'
import { UpdateAction } from '../reducers/updateReducer';
type URL = string;
interface IResponse<T>{
    data:T[];
    status:number;
    message:string
}
export default function useGetData<I>(input:URL):[IResponse<I>,boolean,React.Dispatch<UpdateAction>]{
    const {update,updateDispatch} = React.useContext(Update)
    const [response,setResponse] = React.useState<IResponse<I>>({
        data:[],
        status:0,
        message:''
    })
    const [fecthStatus,setFetchStatus] = React.useState(false)
    const getData = async()=>{
        if(update) {updateDispatch(endUpdate)}
        const response = await axios.get(input)
        setResponse(response.data)
        setFetchStatus(true)
    }
    React.useEffect(()=>{getData()},[input,update])
    return [response,fecthStatus,updateDispatch]
}