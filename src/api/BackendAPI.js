import axios from 'axios'

const axiosConfig = {
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