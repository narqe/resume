import React from 'react'
import Footer from '@components/blog/Footer';
import ActionsBtns from '@components/blog/ActionsBtns';

const SummaryItem = ({ summary, id, isAdmin = true }) => {
    return (
        <>
            <p className="text-gray-700 px-5 py-2 leading-1 text-sm">{summary}</p>
            <div className='flex justify-end'>
                { isAdmin && <ActionsBtns id={id} /> }
                <Footer id={id} isAdmin={isAdmin} />
            </div>
        </>
    )
}

export default SummaryItem