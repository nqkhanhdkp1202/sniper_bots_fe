import { mockDataUsers } from './mockUsers'

const loginUserApi = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const userFound = mockDataUsers.find(u => u.email === email) || null
    if (!userFound) {
      setTimeout(
        () => reject(new Error('Username or password is incorrect')),
        1000
      )
    }
    if (password !== '123456') {
      setTimeout(
        () => reject(new Error('Username or password is incorrect')),
        1000
      )
    }

    setTimeout(
      () =>
        resolve({
          message: 'Login successfully',
          data: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xOVQwNDoxODowMC4wNjRaIiwiaWF0IjoxNjcxNDIzNDgwLCJleHAiOjE2NzI0MjM0Nzl9.AxOvjaTErYwvOSdMWtZgefX8JJ3KaMCZWNCj72uqzYY',
            expires: 999999,
            user: userFound
          }
        }),
      1000
    )
  })
}

export { loginUserApi }
