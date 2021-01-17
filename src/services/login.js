import axios from "axios";
const baseUrl = '/api/login'


const login= async(credentials)=>{
    try {
        const res = await axios.post(baseUrl, credentials)
        console.log(res.data)
        return res.data
    }catch (e){
        console.log('Error', e.message)
    }
}

const loginService = {login}

export default loginService