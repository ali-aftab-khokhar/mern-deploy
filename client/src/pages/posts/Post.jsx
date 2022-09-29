import React, { useContext, useEffect, useState } from 'react'
import CONSTANTS from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import Header from '../../component/Header/Header'
import useFetch from '../../services/useFetch'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../component/posts/PostCard'
import AddNewPost from '../../component/posts/AddNewPost'
import { toast } from 'react-toastify';
import PostService from '../../services/postService'
import UserService from '../../services/userService'

const Post = () => {
    const postServivesObj = new PostService()
    const userServiceObj = new UserService()
    const [data, refetchData] = useFetch('posts')
    const context = useContext(contextAPI)
    const [isLoggedIn, setIsLoggedIn] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.length){
            setIsLoggedIn(JSON.parse(localStorage.getItem('userLoggedIn')))
        } else {
            setIsLoggedIn(context.isLoggedIn)
        }
    }, [])

    const logoutHandle = () => {
        context.logout()
        userServiceObj.logout()
        toast.success('Logged Out')
        navigate('/login')
    }

    const deleteThePost = (e) => {
        const id = e.target.value
        postServivesObj.deleteThePost(id)
        refetchData()
    }

    const publishPost = (title, body, status) => {
        const payload = {
            title: title,
            body: body,
            ownerEmail: isLoggedIn.email,
            ownerName: isLoggedIn.name,
            likes: [],
            status: status
        }
        if (payload.ownerEmail) {
            postServivesObj.addNewPost(payload)
        }
        refetchData()
    }

    const loginHandle = () => {
        navigate('/login')
    }

    return (
        <div>
            <Header header={CONSTANTS.POSTS} profile={CONSTANTS.MY_PROFILE}/>
            <div>
                {
                    isLoggedIn.email ?
                        <div>
                            <button className='btn btn-dark ms-5 mt-5' onClick={logoutHandle}>{CONSTANTS.LOGOUT}</button>
                            <AddNewPost publishPost={publishPost} />
                        </div>
                        : <button className='btn btn-dark ms-5 mt-5' onClick={loginHandle}>{CONSTANTS.LOGIN}</button>
                }
            </div>

            <div className='w-100 p-5 d-flex align-items-center justify-content-center'>
                <PostCard allPosts={data} currentUser={isLoggedIn} deleteThePost={deleteThePost} />
            </div>
        </div>
    )
}

export default Post