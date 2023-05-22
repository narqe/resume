import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const Loading = ({ smallSize = false }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-center items-center gap-5 text-gray-800">
            { !smallSize && <span className="text-2xl">{ t('LOADING') }</span> }
            <AiOutlineLoading3Quarters className={`animate-spin h-15 w-15 ${smallSize ? 'text-2xl' : 'text-6xl'}`} />
        </div>
    )
}

export default Loading;