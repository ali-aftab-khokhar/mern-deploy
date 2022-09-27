import React, { useState } from 'react'
import CONSTANTS from '../../constants'

const UnlikePost = (props) => {
    const [count, setCount] = useState(props.count)

    const likeThePost = (e) => {
        props.likeThePost(e.target.value)
        setCount(count + 1)
    }

    return (
        <div className='d-flex'>
            <div className='ms-3 pt-2'>
                {count} {CONSTANTS.LIKES}
            </div>
            <button className='btn ms-3 btn-outline-danger pt-2' value={props.id} onClick={likeThePost}>
                {CONSTANTS.LIKE}
            </button>
        </div>
    )
}

export default UnlikePost