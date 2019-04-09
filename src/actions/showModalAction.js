const showModal = (text)=>{
    return {
        type:'show',
        text:text
    }
}
const hideModal = (text)=>{
    return {
        type:'hide',
        text:text
    }
}
export {showModal,hideModal}