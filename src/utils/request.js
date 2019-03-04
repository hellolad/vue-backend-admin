import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5c7918a24cc0df4f4c70b2a0/v1/api',
  timeout: 15000,
  headers: {

  }
})

instance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default instance