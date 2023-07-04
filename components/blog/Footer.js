import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next'
import { MdOutlineReadMore } from 'react-icons/md';

const Footer = ({ id, isAdmin }) => {
    const router = useRouter()
    const { t } = useTranslation();
    const pathname = !!isAdmin ? '/admin' : '';
    const viewMoreDetail = (id) => {
        router.push({
            pathname: `${pathname}/view-article/[id]`,
            query: {
                id
            },
            
        })
    }

    return (
        <div className='flex justify-end items-center py-2 px-5 gap-5'>
            <button 
                className='bg-yellow-500 flex justify-center items-center gap-2 my-1 px-2 py-1 text-white text-xs rounded-lg uppercase hover:bg-yellow-300 cursor-pointer'
                onClick={() => viewMoreDetail(id)}
                type='button'>
                    <MdOutlineReadMore />
                    { t('BUTTONS.MORE_DETAILS') }
            </button>
        </div>
    )
}

export default Footer