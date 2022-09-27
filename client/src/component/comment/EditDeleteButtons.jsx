import React from 'react'
import CONSTANTS from '../../constants'

const EditDeleteButtons = (props) => {
    return (
        <div>
            <button className='btn btn-warning' value={props.id} onClick={props.editHandler}>
                {CONSTANTS.EDIT}
            </button>
            <button className='btn btn-danger ms-2' value={props.id} onClick={props.deleteHandler}>
                {CONSTANTS.DELETE}
            </button>
        </div>
    )
}

export default EditDeleteButtons