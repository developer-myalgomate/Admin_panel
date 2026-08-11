import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5044/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const axios_get = async (url, params = {}) => {
  const response = await instance.get(url, {
    params,
  })

  return response.data
}

export const axios_post = async (url, body = {}) => {
  const response = await instance.post(url, body)

  return response.data
}

export const axios_put = async (url, body = {}) => {
  const response = await instance.put(url, body)

  return response.data
}

export const axios_delete = async (url) => {
  const response = await instance.delete(url)

  return response.data
}

export default instance
