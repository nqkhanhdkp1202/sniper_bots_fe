import axios from 'axios'
import { toast } from 'react-toastify'
import { ARBISCAN_END_POINT } from '../constants/common'

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: ARBISCAN_END_POINT,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(
      response => {
        if (response.status === 401) {
          toast.error(response.data.message, {
            position: 'top-center',
            autoClose: 3000
          })
        }
        const result = { ...response.data, status: response.status }
        return result
      },
      ({ response }) => {
        const result = { ...response.data, status: response.status }
        return Promise.reject(result)
      }
    )
  }

  get(url, config = null) {
    return this.instance.get(url, config)
  }

  post(url, data, config = null) {
    return this.instance.post(url, data, config)
  }

  put(url, data, config = null) {
    return this.instance.get(url, data, config)
  }

  delete(url, data, config = null) {
    return this.instance.get(url, {
      data,
      ...config
    })
  }
}

const http = new Http()
export default http
