import React, { useRef, useState } from 'react'
import CONSTANTS from '../../constants'

const AddNewPost = (props) => {
    const [addNewPost, setAddNewPost] = useState(false)
    const postTitleRef = useRef()
    const postBodyRef = useRef()

    const publishPost = (e) => {
        e.preventDefault()
        props.publishPost(postTitleRef.current.value, postBodyRef.current.value)
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
                            <input type="text" className="form-control ms-3" ref={postTitleRef} name="title" placeholder={CONSTANTS.TITLE} />
                        </div>
                        <div className="form-group mb-4">
                            <textarea rows='4' type="text" className="form-control ms-3" ref={postBodyRef} name="body" placeholder={CONSTANTS.BODY} />
                        </div>
                        <button className='btn ms-3 btn-outline-dark' onClick={publishPost} >
                            {CONSTANTS.PUBLISH_THE_POST}
                        </button>
                    </div>
                    : null
            }
        </div>
    )
}

export default AddNewPost