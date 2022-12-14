import React, { useState } from 'react'
import CONSTANTS from '../../constants'

const LikePost = (props) => {
    const [count, setCount] = useState(props.count)

    const dislikeThePost = (e) => {
        props.dislikeThePost(e.target.value)
        setCount(count - 1)
    }

    return (
        <div className='d-flex'>
            <div className='ms-3 pt-2'>
                {count} {CONSTANTS.LIKES}
            </div>
            <button className='btn ms-3 btn-outline-danger pt-2' value={props.id} onClick={dislikeThePost}>
                {CONSTANTS.UNLIKE}
            </button>
        </div>
    )
}

export default LikePost