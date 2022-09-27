import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../../constants'
import Header from '../../component/Header/Header'
import postService from '../../services/postMethod'

const Register = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const nameRef = useRef(null)
    const navigate = useNavigate()

    const navigateToLogin = () => {
        navigate('/')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        if (passwordRef.current.value === confirmPasswordRef.current.value) {
            postService(payload, 'User Added', 'register')
            navigate('/')
        }
    }

    return (
        <div>
            <Header header={CONSTANTS.APP_TITLE} />
            <div className='text-center mt-5 d-flex justify-content-center align-content-center'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label>{CONSTANTS.NAME}</label>
                        <input type='text' className='form-control mt-2' placeholder={CONSTANTS.ENTER_YOUR_NAME} ref={nameRef} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{CONSTANTS.EMAIL}</label>
                        <input type='email' className='form-control mt-2' placeholder={CONSTANTS.ENTER_AN_EMAIL} ref={emailRef} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{CONSTANTS.PASSWORD}</label>
                        <input type='password' className='form-control mt-2' placeholder={CONSTANTS.ENTER_PASSWORD} ref={passwordRef} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{CONSTANTS.CONFIRM_PASSWORD}</label>
                        <input type='password' className='form-control mt-2' placeholder={CONSTANTS.RE_ENTER_YOUR_PASSWORD} ref={confirmPasswordRef} required />
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