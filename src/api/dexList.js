import axiosClient from './axiosClient'

export const dexList = {
  getPair: (tokenAddress) => {
    const url = '/dex/search/pairs';
    return axiosClient.get(url, {params:{q:tokenAddress}});
  }
}
