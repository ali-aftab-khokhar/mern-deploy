import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants'
import Header from '../../component/Header/Header'
import contextAPI from '../../contextState/contextAPI'
import UserService from '../../services/userService'

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
                    <div className='form-group'>
                        <label>{CONSTANTS.EMAIL}</label>
                        <input type='email' className='form-control mt-2' name={CONSTANTS.EMAIL_FIELD} placeholder={CONSTANTS.ENTER_AN_EMAIL} onChange={onChangeHandler} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{CONSTANTS.PASSWORD}</label>
                        <input type='password' className='form-control mt-2' name={CONSTANTS.PASSWORD_FIELD} placeholder={CONSTANTS.ENTER_PASSWORD} onChange={onChangeHandler} required />
                    </div>
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
