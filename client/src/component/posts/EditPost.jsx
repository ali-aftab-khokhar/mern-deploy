import React, { useState } from 'react'
import CONSTANTS from '../../constants'
import './Icon.css'
import PostService from '../../services/postService'

const EditPost = (props) => {
    const postSericeObj = new PostService()
    const [editPostState, setEditPostState] = useState({
        title: '',
        body: ''
    })

    const onChangeHandler = (e) => {
        e.preventDefault()
        setEditPostState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const saveValues = (e) => {
        const id = e.target.value
        const payload = {
            title: editPostState.title,
            body: editPostState.body
        }
        postSericeObj.editThePost(payload, id)
        props.saveEdits()
    }

    return (
        <div>
            <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                <div className='mb-3 ms-3 font-weight-bold'>{CONSTANTS.EDIT}</div>
                <div className="form-group mb-4">
                    <input type="text" className="form-control ms-3" onChange={onChangeHandler} defaultValue={props.title} name="title" placeholder={CONSTANTS.TITLE} />
                </div>
                <div className="form-group mb-4">
                    <textarea rows='4' type="text" className="form-control ms-3" onChange={onChangeHandler} defaultValue={props.body} name="body" placeholder={CONSTANTS.BODY} />
                </div>
                <button className='btn ms-3 mb-4 text-light bg-success' value={props.id} onClick={saveValues}>
                    {CONSTANTS.EDIT_DONE}
                </button>
            </div>
        </div>
    )
}

export default EditPost