import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://chainlist.org/_next/data/VL571rgUuidqQKcegYkMj/'
})

axiosClient.interceptors.request.use()

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  error => {
    throw error
  }
)

export default axiosClient
