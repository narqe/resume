import React from 'react';
import Router from 'next/router';
import { useTranslation } from 'react-i18next'
import { MdOutlineReadMore } from 'react-icons/md';

const Footer = ({ id }) => {
    const { t } = useTranslation();
    const viewMoreDetail = () => {
        Router.push({
            pathname: `/view-article/[id]`,
            query: { 
                id 
            }
        })
    }
    return (
        <div className='flex justify-end px-5'>
            <button 
                className='bg-yellow-800 flex items-center gap-2 my-1 p-2 text-white text-sm rounded-lg uppercase hover:bg-yellow-700 cursor-pointer'
                onClick={() => viewMoreDetail(id)}
                type='button'>
                    <MdOutlineReadMore />
                    { t('BUTTONS.MORE_DETAILS') }
            </button>
        </div>
    )
}

export default Footer