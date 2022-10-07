import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import UserService from '../../services/userService'

const Forms = (props) => {
  const userServiceObj = new UserService()
  const context = useContext(contextAPI)
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  const onChangeHandler = (e) => {
    e.preventDefault()
    setUserDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const navigateToRegister = () => {
    navigate('/register')
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (props.type === CONSTANTS.FORM_TYPE_SIGNUP) {
      const payload = {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password
      }
      if (userDetails.password === userDetails.confirmPassword) {
        userServiceObj.registerNewUser(payload)
        navigate('/login')
      }
    }
    else {
      const credentials = {
        email: userDetails.email,
        password: userDetails.password
      }
      const user = await userServiceObj.loginUser(credentials)
      context.login(user.name, user.email, user._id, user.token)
      navigate('/')
    }
  }

  const renderConditionalSubmitButtons = () => {
    return (
      props.type === CONSTANTS.FORM_TYPE_SIGNUP ?
        <div>
          <input type='submit' value={CONSTANTS.REGISTER} className='btn btn-outline-dark mt-4' />
        </div> :
        <div>
          <input type='submit' value={CONSTANTS.LOGIN} className='btn btn-outline-dark mt-4' />
        </div>
    )
  }

  const renderNavigationButtons = () => {
    return (
      props.type === CONSTANTS.FORM_TYPE_SIGNUP ?
        <div>
          <button onClick={navigateToLogin} className="btn btn-dark mt-3">{CONSTANTS.ALREADY_EXISTS}</button>
        </div> :
        <div>
          <button onClick={navigateToRegister} className="btn btn-dark mt-3">{CONSTANTS.CREATE_AN_ACCOUNT}</button>
        </div>
    )
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {
          props.type === CONSTANTS.FORM_TYPE_SIGNUP
            ? <div>
              <div className='form-group mb-4'>
                <label>{CONSTANTS.NAME}</label>
                <input type='text' className='form-control mt-2' placeholder={CONSTANTS.ENTER_YOUR_NAME} name={CONSTANTS.NAME_FIELD} onChange={onChangeHandler} required />
              </div>
            </div>
            : null
        }
        <div className='form-group'>
          <label>{CONSTANTS.EMAIL}</label>
          <input type='email' className='form-control mt-2' name={CONSTANTS.EMAIL_FIELD} placeholder={CONSTANTS.ENTER_AN_EMAIL} onChange={onChangeHandler} required />
        </div>
        <div className='form-group mt-4'>
          <label>{CONSTANTS.PASSWORD}</label>
          <input type='password' className='form-control mt-2' name={CONSTANTS.PASSWORD_FIELD} placeholder={CONSTANTS.ENTER_PASSWORD} onChange={onChangeHandler} required />
        </div>
        {
          props.type === CONSTANTS.FORM_TYPE_SIGNUP
            ? <div>
              <div className='form-group mt-4'>
                <label>{CONSTANTS.CONFIRM_PASSWORD}</label>
                <input type='password' className='form-control mt-2' placeholder={CONSTANTS.RE_ENTER_YOUR_PASSWORD} name={CONSTANTS.CONFIRM_PASSWORD_FIELD} onChange={onChangeHandler} required />
              </div>
            </div>
            : null
        }
        {
          renderConditionalSubmitButtons()
        }
        {
          renderNavigationButtons()
        }
      </form>
    </div>
  )
}

export default Forms