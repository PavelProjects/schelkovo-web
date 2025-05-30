import axios from 'axios'

const { pathname } = window.location
const axiosConfig = {
  baseUrl: pathname,
  timeout: 5000,
  withCredentials: true
}
const adminAxios = axios.create(axiosConfig)

const AdminAPI = {
  authenticate: async (username, password) => 
    (await adminAxios.post('/api/auth/login', { username, password  })),
  getCurrentUser: async () => 
    (await adminAxios.get('/api/auth')),
  setStatus: async (status) => 
    (await adminAxios.patch('/api/status', status)),
}

export {
  AdminAPI
}