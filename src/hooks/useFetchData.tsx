import * as React from 'react'
import { Update } from '../context/context'
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
    const [isLoaded, setIsLoaded] = React.useState(false)
    const getData = async () => {
        if (update) { updateDispatch(endUpdate) }
        try {
            const result = await fetch(url, {...option,credentials:"include"})
            const response = await result.json()
            setResponse(response)
            setIsLoaded(true)
        } catch (error) {
            const response = {data:[],status:2,message:'Server Error'}
            setResponse(response)
            setIsLoaded(false)
        }
    }
    React.useEffect(() => { getData() }, [url, update])
    return [response, isLoaded, updateDispatch]
}