import React, { useState } from 'react'
import CONSTANTS from '../../constants'
import CommentService from '../../services/commentsService'

const EditComment = (props) => {
    const commentServiceObj = new CommentService()
    const [commentState, setCommentState] = useState('')

    const onChangeHandler = (e) => {
        e.preventDefault()
        setCommentState(e.target.value)
    }

    const saveEdits = (e) => {
        const id = e.target.value
        const payload = {
            updatedComment: commentState
        }
        commentServiceObj.editTheComment(payload, id)
        // putService(payload, 'Updated', `comment/${id}`)
        props.saveEdits()
    }

    return (
        <div className='mb-4 w-100 ms-4 mb-3 mt-3'>
            <div className="input-group">
                <input type="text" className="form-control" onChange={onChangeHandler} placeholder={CONSTANTS.ADD_NEW_COMMENT} defaultValue={props.commentBody} />
                <div className="input-group-prepend">
                    <button className="input-group-text" id="inputGroupPrepend2" value={props.id} onClick={saveEdits}>{CONSTANTS.EDIT_DONE}</button>
                </div>
            </div>
        </div>
    )
}

export default EditComment