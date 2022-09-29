import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants'
import Header from '../../component/Header/Header'
import UserService from '../../services/userService'

const Register = () => {
    const userServiceObj = new UserService()
    const navigate = useNavigate()
    const [signupCredentials, setSignupCredentials] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    })

    const navigateToLogin = () => {
        navigate('/')
    }

    const onChangeHandler = (e) => {
        e.preventDefault()
        setSignupCredentials(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            name: signupCredentials.name,
            email: signupCredentials.email,
            password: signupCredentials.password
        }
        if (signupCredentials.password === signupCredentials.confirmPassword) {
            // postService(payload, 'User Added', 'register')
            userServiceObj.registerNewUser(payload)
            navigate('/login')
        }
    }

    return (
        <div>
            <Header header={CONSTANTS.APP_TITLE} />
            <div className='text-center mt-5 d-flex justify-content-center align-content-center'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label>{CONSTANTS.NAME}</label>
                        <input type='text' className='form-control mt-2' placeholder={CONSTANTS.ENTER_YOUR_NAME} name={CONSTANTS.NAME_FIELD} onChange={onChangeHandler} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{CONSTANTS.EMAIL}</label>
                        <input type='email' className='form-control mt-2' placeholder={CONSTANTS.ENTER_AN_EMAIL} name={CONSTANTS.EMAIL_FIELD} onChange={onChangeHandler} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{CONSTANTS.PASSWORD}</label>
                        <input type='password' className='form-control mt-2' placeholder={CONSTANTS.ENTER_PASSWORD} name={CONSTANTS.PASSWORD_FIELD} onChange={onChangeHandler} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{CONSTANTS.CONFIRM_PASSWORD}</label>
                        <input type='password' className='form-control mt-2' placeholder={CONSTANTS.RE_ENTER_YOUR_PASSWORD} name={CONSTANTS.CONFIRM_PASSWORD_FIELD} onChange={onChangeHandler} required />
                    </div>
                    <div>
                        <input type='submit' value={CONSTANTS.REGISTER} className='btn btn-outline-dark mt-4' />
                    </div>
                    <div>
                        <button onClick={navigateToLogin} className="btn btn-dark mt-3">{CONSTANTS.ALREADY_EXISTS}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register