import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants'
import Header from '../../component/Header/Header'
import contextAPI from '../../contextState/contextAPI'
import UserService from '../../services/userService'
import Forms from '../../component/forms/Forms'

const Login = () => {
  const userServiceObj = new UserService()
  const navigate = useNavigate()
  const context = useContext(contextAPI)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const navigateToRegister = () => {
    navigate('/register')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const user = await userServiceObj.loginUser(credentials)
    context.login(user.name, user.email, user._id, user.token)
    navigate('/')
  }

  const onChangeHandler = (e) => {
    e.preventDefault()
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
        <div>
            <Header header={CONSTANTS.APP_TITLE} />
            <div className='text-center mt-5 d-flex justify-content-center align-content-center'>
                <form onSubmit={onSubmit}>
                  <Forms onChangeHandler={onChangeHandler} />
                    <div>
                        <input type='submit' value={CONSTANTS.LOGIN} className='btn btn-outline-dark mt-4' />
                    </div>
                    <div>
                        <button onClick={navigateToRegister} className="btn btn-dark mt-3">{CONSTANTS.CREATE_AN_ACCOUNT}</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Login
