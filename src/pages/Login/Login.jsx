import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading/Loading'
import { path } from '../../constants/path'
import { rules } from '../../constants/rules'
import { AppContext } from '../../contexts/app.context'
import { loginUserApi } from '../../mocks/mockApi'
import { setAccessTokenToLS, setProfileToLS } from '../../utils/auth'

function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const  handleLogin = async value => {
    setIsLoading(true)
    try {
      const result = await loginUserApi(value)
      const { user, access_token } = result.data
      if (!user) return
      setProfile(user)
      setIsAuthenticated(true)
      setAccessTokenToLS(access_token)
      setProfileToLS(user)
      toast.success('Login successfully !!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      navigate(path.swapToken)
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    setIsLoading(false)
  }

  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                <div className="card card-plain">
                  <div className="card-header pb-0 text-start bg-transparent">
                    <h4 className="font-weight-bolder">Login</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(handleLogin)} noValidate>
                      <div className="mb-3">
                        <Controller
                          name="email"
                          control={control}
                          rules={rules.email}
                          render={({ field }) => (
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-lg"
                              placeholder="Email"
                              aria-label="Email"
                              onChange={field.onChange}
                              value={getValues('email')}
                            />
                          )}
                        />
                        <ErrorMessage errors={errors} name="email" />
                      </div>
                      <div className="mb-3">
                        <Controller
                          name="password"
                          control={control}
                          rules={rules.password}
                          render={({ field }) => (
                            <input
                              type="password"
                              name="password"
                              className="form-control form-control-lg"
                              placeholder="Password"
                              aria-label="Password"
                              onChange={field.onChange}
                              value={getValues('password')}
                            />
                          )}
                        />
                        <ErrorMessage errors={errors} name="password" />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0"
                        >
                          {isLoading ? <Loading /> : 'Login'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                <div
                  className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                  style={{
                    backgroundImage:
                      'url("https://trutrade.io/wp-content/uploads/2022/03/best-forex-trading-bots.png")',
                    backgroundSize: 'cover'
                  }}
                >
                  <span className="mask bg-gradient-primary opacity-6" />
                  <h2 className="mt-5 text-white font-weight-bolder position-relative">
                    "BOT TRADE"
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
