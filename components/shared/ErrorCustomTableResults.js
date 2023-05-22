import React from 'react';
import { useTranslation } from 'react-i18next';
import { TbFaceIdError } from 'react-icons/tb'

const ErrorCustomTableResults = ({ message = 'ERRORS.MESSAGE_001' }) => {
    const { t } = useTranslation()
    return (
        <div className='text-2xl w-full h-48 grid gap-5 justify-items-center items-center text-red-800 rounded bg-red-100 my-5 p-10'>
            <TbFaceIdError className='text-5xl text-align-center' />
            <span>{ t(message) }</span>
        </div>
    )
}

export default ErrorCustomTableResults;