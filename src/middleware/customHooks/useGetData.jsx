import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import {Update} from '../context'
import {endUpdate} from '../actions/updateAction'
export default function useGetData(initialValue,input){
    const [update,dispatch] = useContext(Update)
    const [data,setData] = useState(initialValue)
    const getData = async()=>{
        if(update) {dispatch(endUpdate)}
        const response = await axios.get(input)
        setData(response.data)
    }
    useEffect(()=>{getData()},[input,update])
    return [data,dispatch]
}