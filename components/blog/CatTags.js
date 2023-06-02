import React from 'react'

const CatTags = ({ categories }) => {
    
    return (
        <div className="px-3 py-1">
            {categories.map(category => 
                <div className='mx-1 inline-flex text-white bg-green-600 rounded-lg text-xs p-1'>
                    #{category}
                </div>
            )}
        </div>
    )
}

export default CatTags