import React from 'react'
import constants from '../../constants'

const EnableButtons = (props) => {
    return (
        <div>
            <button className='btn btn-warning' value={props.id} onClick={props.editHandler}>
                {constants.edit}
            </button>
            <button className='btn btn-danger ms-2' value={props.id} onClick={props.deleteHandler}>
                {constants.delete}
            </button>
        </div>
    )
}

export default EnableButtons