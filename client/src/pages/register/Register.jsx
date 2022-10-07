import CONSTANTS from '../../constants'
import Header from '../../component/Header/Header'
import Forms from '../../component/forms/Forms'

const Register = () => {

  return (
    <div>
      <Header header={CONSTANTS.APP_TITLE} />
      <div className='text-center mt-5 d-flex justify-content-center align-content-center'>
        <Forms type={CONSTANTS.FORM_TYPE_SIGNUP} />
      </div>
    </div>
  )
}

export default Register
