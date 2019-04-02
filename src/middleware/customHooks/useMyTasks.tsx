import * as React from 'react';
import useFetchData from './useFetchData'
import { startUpdate, endUpdate } from '../actions/updateAction'
import { SignInStatus} from '../context'
import {Data} from '../../pages/TaskDetailsPage'
import API_URL from '../api'
interface IResponse<T> {
    data: T
    status: number;
    message: string
}
export default function useMyTasks(role:string,filter:string):[IResponse<Data[]>,boolean]{
    const { signInStatus } = React.useContext(SignInStatus);
    const username = signInStatus.username;
    const url = filter === 'all'? `${API_URL}/mytasks?${role}=${username}` : `${API_URL}/mytasks?${role}=${username}&status=${filter}` 
    const [response,fetchStatus,updateDispatch] = useFetchData<Data>(url,{method:'get'});
    updateDispatch(endUpdate)
    return [response as IResponse<Data[]> ,fetchStatus]
}