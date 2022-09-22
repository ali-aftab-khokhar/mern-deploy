import React from 'react'
import constants from '../../constants'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const EnabledButtons = (props) => {
    return (
        <div>
            <button className='btn btn-warning' value={props.id} onClick={props.editHandler}>
                {constants.edit}<BiEdit className='ms-2 mb-0 h5 icons' />
            </button>
            <button className='btn btn-danger ms-2' value={props.id} onClick={props.deleteThePost}>
                {constants.delete}<AiFillDelete className='ms-2 mb-0 h5 icons' />
            </button>
        </div>
    )
}

export default EnabledButtons