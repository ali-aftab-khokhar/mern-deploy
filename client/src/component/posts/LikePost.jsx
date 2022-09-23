import React, { useState } from 'react'
import constants from '../../constants'

const LikePost = (props) => {
    const [count, setCount] = useState(props.count)

    const dislikeThePost = (e) => {
        props.dislikeThePost(e.target.value)
        setCount(count - 1)
    }

    return (
        <div>
            <button className='btn ms-3 btn-outline-danger pt-2' value={props.id} onClick={dislikeThePost}>
                {count} {constants.like}
            </button>
        </div>
    )
}

export default LikePost