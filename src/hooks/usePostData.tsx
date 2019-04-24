import * as React from 'react'
export default function usePostData<IResponse>(initialResponse: IResponse): [IResponse, () => void, (url: string, option: object) => void] {
    const [response, setResponse] = React.useState<IResponse>(initialResponse)
    const postData = async (url: string, option: {}) => {
        const result = await fetch(url, { method: 'post', credentials: "include", headers: { 'Content-Type': 'application/json' }, ...option })
        const response = await result.json()
        setResponse({ ...response, status: true })
    }
    const triggerPost = async (url: string, option: object) => {
        await postData(url, option);
    }
    const resetResponse = () => {
        setResponse(initialResponse)
    }
    return [response, resetResponse, triggerPost]
}