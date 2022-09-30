import React from 'react'
import CONSTANTS from '../../constants'

const Forms = (props) => {
  const onChangeHandler = (e) => {
    e.preventDefault()
    props.onChangeHandler(e)
  }

  return (
    <div>
      <div className='form-group'>
        <label>{CONSTANTS.EMAIL}</label>
        <input type='email' className='form-control mt-2' name={CONSTANTS.EMAIL_FIELD} placeholder={CONSTANTS.ENTER_AN_EMAIL} onChange={onChangeHandler} required />
      </div>
      <div className='form-group mt-4'>
        <label>{CONSTANTS.PASSWORD}</label>
        <input type='password' className='form-control mt-2' name={CONSTANTS.PASSWORD_FIELD} placeholder={CONSTANTS.ENTER_PASSWORD} onChange={onChangeHandler} required />
      </div>
    </div>
  )
}

export default Forms