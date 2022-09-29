import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CONSTANTS from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import Header from '../../component/Header/Header'
import useFetch from '../../services/useFetch'
import EditComment from '../../component/comment/EditComment'
import AddNewComment from '../../component/comment/AddNewComment'
import EditDeleteButtons from '../../component/comment/EditDeleteButtons'
import CommentService from '../../services/commentsService'

const Comment = () => {
    const commentServiceObj = new CommentService()
    const params = useParams()
    const [commentsData, refetchData] = useFetch(`${params.id}/comments`)
    const [post] = useFetch(`post/${params.id}/comments`)
    const context = useContext(contextAPI)
    const [isLoggedIn] = useState(context.isLoggedIn)
    const navigate = useNavigate()
    const [editToggle, setEditToggle] = useState(false)
    const [activeCommentId, setActiveCommentId] = useState("")

    useEffect(() => {
        if (!context.auth()) {
            navigate('/login')
        }
    }, [])

    const addNewComment = (body, email) => {
        const payload = {
            commentBody: body,
            commentBy: email,
            _id: commentsData.length
        }
        if (isLoggedIn.email) {
            commentServiceObj.publishNewComment(payload, params.id)
            // postService(payload, 'Commented', `${params.id}/comments`)
        }
        refetchData()
    }

    const deleteHandler = (e) => {
        const id = e.target.value
        // deleteService(`comment/${id}`)
        commentServiceObj.deleteTheComment(id)
        refetchData()
    }

    const editHandler = (e) => {
        setActiveCommentId(e.target.value)
        setEditToggle(!editToggle)
        refetchData()
    }

    const saveEdits = (e) => {
        setEditToggle(!editToggle)
        refetchData()
    }

    const navigateToPost = () => {
        navigate('/')
    }

    return (
        <div>
            <Header header={CONSTANTS.COMMENTS} />
            <div className='p-4'>
                <button className='btn btn-dark' onClick={navigateToPost}>{CONSTANTS.GO_BACK}</button>
            </div>
            <div>
                <div className="card m-5">
                    <h1 className='p-3'>{CONSTANTS.POST}</h1>
                    {
                        post ?
                            <div className="card-body pb-5">
                                <h5 className="card-title">{post[0].title}</h5>
                                <p className="card-text">{post[0].body}</p>
                            </div>
                            : <div>
                                <h5>{CONSTANTS.LOADING}</h5>
                            </div>
                    }

                    <div className='pb-5'>
                        <h2 className='p-4'>{CONSTANTS.COMMENTS}</h2>
                        {
                            commentsData ? commentsData.map((comm) => {
                                return (<div className='w-50 p-3 ms-3 b-2 mb-4' key={comm._id}>
                                    <div className='d-flex'>
                                        <div className='w-75'>
                                            <div className='pt-1'>
                                                <h6>{comm.commentByName}</h6>
                                            </div>
                                            <div className='ps-3'>
                                                {comm.commentBody}
                                            </div>
                                        </div>
                                        {
                                            comm.commentBy === isLoggedIn.email ?
                                                <div className='text-end p-2 d-flex'>
                                                    <EditDeleteButtons editHandler={editHandler} deleteHandler={deleteHandler} id={comm._id} />
                                                </div>
                                                : null
                                        }
                                    </div>
                                    {
                                        editToggle && activeCommentId === comm._id ?
                                            <EditComment saveEdits={saveEdits} commentBody={comm.commentBody} id={comm._id} />
                                            : null
                                    }
                                </div>)
                            }) : <div className='ps-5'> {CONSTANTS.LOADING} </div>
                        }
                    </div>

                    {
                        isLoggedIn.email ?
                            <AddNewComment addNewComment={addNewComment} />
                            : null
                    }

                </div>
            </div>
        </div>
    )
}

export default Comment