import React from 'react'

const Separator = ({ size = 3 }) => {
    return (
        <hr className={`my-${size}`}></hr>
    )
}

export default Separator