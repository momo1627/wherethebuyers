import * as React from 'react'
import axios from 'axios'
import {Update} from '../context'
import {endUpdate} from '../actions/updateAction'
import { UpdateAction } from '../reducers/updateReducer';
type URL = string;
export default function useGetData<I>(initialValue:I,input:URL):[I,boolean,React.Dispatch<UpdateAction>]{
    const {update,updateDispatch} = React.useContext(Update)
    const [data,setData] = React.useState(initialValue)
    const [fecthStatus,setFetchStateus] = React.useState(false)
    const getData = async()=>{
        if(update) {updateDispatch(endUpdate)}
        const response = await axios.get(input)
        setData(response.data)
        setFetchStateus(true)
    }
    React.useEffect(()=>{getData()},[input,update])
    return [data,fecthStatus,updateDispatch]
}