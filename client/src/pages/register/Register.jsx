import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import constants from '../../constants'
import Header from '../../component/Header/Header'
import postService from '../../services/postMethod'

const Register = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const nameRef = useRef(null)
    const navigate = useNavigate()

    const toLoginPage = () => {
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
            <Header header={constants.app_title} />
            <div className='text-center mt-5 d-flex justify-content-center align-content-center'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label>{constants.name}</label>
                        <input type='text' className='form-control mt-2' placeholder={constants.enter_you_name} ref={nameRef} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{constants.email}</label>
                        <input type='email' className='form-control mt-2' placeholder={constants.enter_an_email} ref={emailRef} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{constants.password}</label>
                        <input type='password' className='form-control mt-2' placeholder={constants.enter_password} ref={passwordRef} required />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{constants.confirm_password}</label>
                        <input type='password' className='form-control mt-2' placeholder={constants.re_enter_your_password} ref={confirmPasswordRef} required />
                    </div>
                    <div>
                        <input type='submit' value={constants.register} className='btn btn-outline-dark mt-4' />
                    </div>
                    <div>
                        <button onClick={toLoginPage} className="btn btn-dark mt-3">{constants.already_exist}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register