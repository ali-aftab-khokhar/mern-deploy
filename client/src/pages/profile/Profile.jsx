import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../services/useFetch'
import Header from '../../component/Header/Header'
import CONSTANTS from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import PostCard from '../../component/posts/PostCard'
import PostService from '../../services/postService'

const Profile = () => {
    const context = useContext(contextAPI)
    const postServiceObj = new PostService()
    const navigate = useNavigate()
    const [myPosts] = useFetch(`profile/${context.isLoggedIn.id}`)

    if (!context.auth()) {
        navigate('/login')
    }

    const navigateToPost = () => {
        navigate('/')
    }

    const deleteThePost = (e) => {
        const id = e.target.value
        postServiceObj.deleteThePost(id)
    }

    return (
        <div>
            <Header header={context.isLoggedIn.name} profile={context.isLoggedIn.email} />
            <div className='p-4'>
                <button className='btn btn-dark' onClick={navigateToPost}>{CONSTANTS.POSTS}</button>
            </div>
            <div className='w-100 p-5 d-flex align-items-center justify-content-center'>
                {
                    myPosts ?
                        <PostCard allPosts={myPosts} currentUser={context.isLoggedIn} deleteThePost={deleteThePost} />
                        : <div>No Post Exists</div>
                }
            </div>
        </div>
    )
}

export default Profile