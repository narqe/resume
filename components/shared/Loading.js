import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-5 text-gray-800">
            <span className="text-2xl">Cargando...</span>
            <AiOutlineLoading3Quarters className="animate-spin h-15 w-15 text-6xl" />
        </div>
    )
}

export default Loading;