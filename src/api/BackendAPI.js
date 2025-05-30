import axios from 'axios'

const { pathname } = window.location
const axiosConfig = {
  baseUrl: pathname,
  timeout: 5000,
}
const publicAxios = axios.create(axiosConfig)

const BackendAPI = {
  getStatus: async () => 
    (await publicAxios.get('/api/status')).data,
  stausesList: async () => 
    (await publicAxios.get('/api/status/list')).data,
}

export {
  BackendAPI
}