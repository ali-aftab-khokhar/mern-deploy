import React from 'react'
import constants from '../../constants'

const DisabledButtons = () => {
    return (
        <div>
            <button className='btn btn-warning' disabled >
                {constants.edit}
            </button>
            <button className='btn btn-danger ms-2' disabled >
                {constants.delete}
            </button>
        </div>
    )
}

export default DisabledButtons