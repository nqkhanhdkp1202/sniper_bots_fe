import axios from 'axios'
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://io.dexscreener.com/",
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: {
    serialize: params => queryString.stringify(params, {arrayFormat: 'bracket'}),
  }
});

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
