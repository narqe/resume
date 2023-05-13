import React from 'react'

const SubmitBtn = (value) => {
    return (
        <input 
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
            value={value}
        />
    )
}

export default SubmitBtn