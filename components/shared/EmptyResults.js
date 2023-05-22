import React from 'react';
import { TbInfoSquareRounded } from 'react-icons/tb'

const EmptyResults = ( { message } ) => {
    return (
        <div className='text-2xl w-full h-full grid gap-5 justify-items-center items-center text-gray-600 rounded bg-gray-100 my-5 p-10'>
            <TbInfoSquareRounded className="text-5xl text-blue-800" />
            { message }
        </div>
    )
}

export default EmptyResults;