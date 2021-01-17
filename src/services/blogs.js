import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createBlog = async (blog) => {
    try {
        const res = await axios.post(baseUrl, blog, {headers: {Authorization: token}})
        return res.data
    } catch (e){
        console.log('Error', e)

    }
}

const blogService = {getAll, createBlog, setToken}
export default blogService