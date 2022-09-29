import React, { useContext, useState } from 'react'
import CONSTANTS from '../../constants'
import contextAPI from '../../contextState/contextAPI'

const AddNewComment = (props) => {
    const context = useContext(contextAPI)
    const [commentState, setCommentState] = useState('')

    const onChangeHandler = (e) => {
        e.preventDefault()
        setCommentState(e.target.value)
    }

    const addNewComment = () => {
        props.addNewComment(commentState, context.isLoggedIn.email)
        setCommentState('')
    }

    return (
        <div className='mb-4 w-75 ms-4 mb-3'>
            <div className="input-group">
                <input type="text" className="form-control" onChange={onChangeHandler} placeholder={CONSTANTS.ADD_NEW_COMMENT} />
                <div className="input-group-prepend">
                    <button className="input-group-text" id="inputGroupPrepend2" onClick={addNewComment}>{CONSTANTS.PUBLISH_THE_COMMENT}</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewComment