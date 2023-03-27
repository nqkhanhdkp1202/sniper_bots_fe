import axiosClient from './axiosClient'

export const chainlistRPC = {
  getRPCList: (chainid, params) => {
    const url = 'chain/' + chainid + '.json'
    return axiosClient.get(url, { params })
  }
}
