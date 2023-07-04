import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getBlogs = async () => {
    return await API.getMethod(ENDPOINT.blogs.getMany, false)
}

const getSearchedBlogs = async (data) => {
    return await API.getMethod(ENDPOINT.blogs.getMany, false, data)
}

const getOneBlog = async (id) => {
    return await API.getMethod(`${ENDPOINT.blogs.getOne}/${id}`, false)
}

export default {
    getBlogs,
    getOneBlog,
    getSearchedBlogs
}