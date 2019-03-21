import * as React from 'react'
import axios from 'axios'
import {Update} from '../context'
import {endUpdate} from '../actions/updateAction'

export default function useGetData(initialValue,input){
    const [update,dispatch] = React.useContext(Update)
    const [data,setData] = React.useState(initialValue)
    const getData = async()=>{
        if(update) {dispatch(endUpdate)}
        const response = await axios.get(input)
        setData(response.data)
    }
    React.useEffect(()=>{getData()},[input,update])
    return [data,dispatch]
}