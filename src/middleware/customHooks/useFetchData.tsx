import * as React from 'react'
import { Update } from '../context'
import { endUpdate } from '../actions/updateAction'
import { UpdateAction } from '../reducers/updateReducer';
interface IResponse<T> {
    data: T
    status: number;
    message: string
}
interface IOption {
    method: string;
    body?: any;
    headers?: any;
}
export default function useFetchData<I>(url: string, option: IOption): [IResponse<I|I[]>, boolean, React.Dispatch<UpdateAction>] {
    const { update, updateDispatch } = React.useContext(Update)
    const [response, setResponse] = React.useState<IResponse<I|I[]>>({
        data: [],
        status: 0,
        message: ''
    })
    const [fecthStatus, setFetchStatus] = React.useState(false)
    const getData = async () => {
        if (update) { updateDispatch(endUpdate) }
        try {
            const result = await fetch(url, option)
            const response = await result.json()
            setResponse(response)
            setFetchStatus(true)
        } catch (error) {
            const response = {data:[],status:2,message:'Server Error'}
            setResponse(response)
            setFetchStatus(true)
        }
    }
    React.useEffect(() => { getData() }, [url, update])
    return [response, fecthStatus, updateDispatch]
}