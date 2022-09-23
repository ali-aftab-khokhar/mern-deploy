import React, { useState } from 'react'
import constants from '../../constants'

const UnlikePost = (props) => {
    const [count, setCount] = useState(props.count)

    const likeThePost = (e) => {
        props.likeThePost(e.target.value)
        setCount(count + 1)
    }

    return (
        <div className='d-flex'>
            <button className='btn ms-3 btn-outline-danger pt-2'>
                {count} {constants.likes}
            </button>
            <button className='btn ms-3 btn-outline-danger pt-2' value={props.id} onClick={likeThePost}>
                {constants.unlike}
            </button>
        </div>
    )
}

export default UnlikePost