import React, { useContext, useRef } from 'react'
import CONSTANTS from '../../constants'
import contextAPI from '../../contextState/contextAPI'

const AddNewComment = (props) => {
    const commentRef = useRef()
    const context = useContext(contextAPI)

    const addNewComment = () => {
        props.addNewComment(commentRef.current.value, context.isLoggedIn.email)
        commentRef.current.value = ''
    }

    return (
        <div className='mb-4 w-75 ms-4 mb-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" ref={commentRef} placeholder={CONSTANTS.ADD_NEW_COMMENT} />
                            <div className="input-group-prepend">
                                <button className="input-group-text" id="inputGroupPrepend2" onClick={addNewComment}>{CONSTANTS.PUBLISH_THE_COMMENT}</button>
                            </div>
                        </div>
                    </div>
    )
}

export default AddNewComment