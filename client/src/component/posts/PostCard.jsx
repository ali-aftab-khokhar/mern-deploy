import React, { useContext, useState } from 'react'
import CONSTANTS from '../../constants'
import EditPost from './EditPost'
import './Icon.css'
import { useNavigate } from 'react-router-dom'
import ContextAPI from '../../contextState/contextAPI'
import LikePost from './LikePost'
import UnlikePost from './UnlikePost'
import PostService from '../../services/postService'

const PostCard = (props) => {
    const postServiceObj = new PostService()
    const navigate = useNavigate()
    const context = useContext(ContextAPI)
    const [editToggle, setEditToggle] = useState(false)
    const [activePostId, setActivePostId] = useState("")

    const openComments = (e) => {
        navigate(`/post/${e.target.value}/comments`)
    }

    const editHandler = (e) => {
        setActivePostId(e.target.value)
        setEditToggle(!editToggle)
    }

    const saveEdits = () => {
        setEditToggle(!editToggle)
    }

    const loginFirst = () => {
        navigate('/')
    }

    const dislikeThePost = (id) => {
        const payload = {
            id: id,
            email: context.isLoggedIn.email,
            todo: 'dislike'
        }
        if (id && payload.email) {
            postServiceObj.dislikeThePost(payload, id)
        }
    }

    const likeThePost = (id) => {
        const payload = {
            id: id,
            email: context.isLoggedIn.email,
            todo: 'like'
        }
        if (id && payload.email) {
            postServiceObj.likeThePost(payload, id)
        }
    }

    const publishThePost = (e) => {
        const id = e.target.value
        postServiceObj.publishThePost(id)
    }

    const unpublishThePost = (e) => {
        const id = e.target.value
        postServiceObj.unpublishThePost(id)
    }

    return (
        <div className='justify-content-center w-100'>
            {
                props.allPosts ? props.allPosts.map((post) => {

                    return (
                        <div className="card mb-3" key={post._id}>
                            <div className="card-body">
                                <h3 className='card-title'>{post.ownerName}</h3>
                                <h5 className="card-text">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                {
                                    context.isLoggedIn.email ?
                                        <div className='d-flex'>
                                            <button className="btn btn-dark" value={post._id} onClick={openComments}>
                                                {CONSTANTS.COMMENTS}
                                            </button>
                                            <div>
                                                {
                                                    post.likes.includes(context.isLoggedIn.email)
                                                        ? <LikePost dislikeThePost={dislikeThePost} id={post._id} count={post.likes.length} />
                                                        : <UnlikePost likeThePost={likeThePost} id={post._id} count={post.likes.length} />
                                                }
                                            </div>
                                        </div>
                                        : <div>
                                            <button className="btn btn-dark" value={post._id} onClick={loginFirst}>
                                                {CONSTANTS.LOGIN_FIRST}
                                            </button>
                                        </div>
                                }

                            </div>
                            {
                                props.currentUser.email === post.ownerEmail ?
                                    <div className='text-end p-3'>
                                        {
                                            post.status === CONSTANTS.NOT_PUBLISHED
                                                ? <button className='btn btn-info' value={post._id} onClick={publishThePost}>
                                                    {CONSTANTS.PUBLISH_NOW}
                                                </button>
                                                : <button className='btn btn-info' value={post._id} onClick={unpublishThePost}>
                                                    {CONSTANTS.UNPUBLISH_NOW}
                                                </button>
                                        }
                                        <button className='btn btn-warning ms-2' value={post._id} onClick={editHandler}>
                                            {CONSTANTS.EDIT}
                                        </button>
                                        <button className='btn btn-danger ms-2' value={post._id} onClick={props.deleteThePost}>
                                            {CONSTANTS.DELETE}
                                        </button>
                                    </div>
                                    : null
                            }

                            {
                                props.currentUser.email === post.ownerEmail && activePostId === post._id && editToggle ?
                                    <EditPost saveEdits={saveEdits} title={post.title} body={post.body} id={post._id} />
                                    : null
                            }
                        </div>
                    )
                }) : <div>{CONSTANTS.LOADING}</div>
            }
        </div>
    )
}

export default PostCard