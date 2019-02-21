import axios from 'axios'
const getTaskList = async ()=>{
    const response = await axios.get(`http://localhost:4000`)
    return response.data
}
export { getTaskList}