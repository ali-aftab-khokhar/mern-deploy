import React, { useState } from 'react'
import CONSTANTS from '../../constants'

const AddNewPost = (props) => {
    const [addNewPost, setAddNewPost] = useState(false)
    const [newPost, setNewPost] = useState({
        title: '',
        body: ''
    })

    const onChangeHandler = (e) => {
        e.preventDefault()
        setNewPost(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const publishPost = (e) => {
        e.preventDefault()
        if (e.target.name === CONSTANTS.PUBLISHED) {
            props.publishPost(newPost.title, newPost.body, CONSTANTS.PUBLISHED)
        }
        else if (e.target.name === CONSTANTS.NOT_PUBLISHED) {
            props.publishPost(newPost.title, newPost.body, CONSTANTS.NOT_PUBLISHED)
        }
        openOrCloseModal()
    }

    const openOrCloseModal = () => {
        setAddNewPost(!addNewPost)
    }

    return (
        <div className='ms-2'>
            <button className='btn ms-5 btn-outline-dark mt-5 pt-3 ps-5 pe-5' onClick={openOrCloseModal} >
                {
                    !addNewPost ?
                        <div className='d-flex pt-1'>
                            <p>{CONSTANTS.CREATE_NEW_POST}</p>
                        </div>
                        : <div className='d-flex pt-1'>
                            <p>{CONSTANTS.CLOSE_THE_DIALOG}</p>
                        </div>
                }
            </button>

            {
                addNewPost ?
                    <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                        <div className='mb-3 ms-3 font-weight-bold'>{CONSTANTS.NEW_POST}</div>
                        <div className="form-group mb-4">
                            <input type="text" className="form-control ms-3" onChange={onChangeHandler} name="title" placeholder={CONSTANTS.TITLE} />
                        </div>
                        <div className="form-group mb-4">
                            <textarea rows='4' type="text" className="form-control ms-3" onChange={onChangeHandler} name="body" placeholder={CONSTANTS.BODY} />
                        </div>
                        <div className='d-flex'>
                            <div>
                                <input type="submit" value={CONSTANTS.PUBLISH_NOW} className="btn ms-3 btn-outline-dark me-3" onClick={publishPost} name={CONSTANTS.PUBLISHED} />
                            </div>
                            <div>
                                <input type="submit" value={CONSTANTS.SAVE} className="btn ms-3 btn-outline-dark me-3" onClick={publishPost} name={CONSTANTS.NOT_PUBLISHED} />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default AddNewPost