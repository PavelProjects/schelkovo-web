import axios from 'axios'

const axiosConfig = {
  timeout: 5000,
}
const adminAxios = axios.create({ ...axiosConfig, withCredentials: true })

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