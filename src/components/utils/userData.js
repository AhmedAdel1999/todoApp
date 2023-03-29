import { useSelector } from "react-redux"

const GetConfig = () =>{
    const token  = useSelector((state)=>state.user.token)
    return{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
}
const GetUsername = () =>{
    const username  = useSelector((state)=>state.user.username)
    return username
}
export {GetConfig,GetUsername};