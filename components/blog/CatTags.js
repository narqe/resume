import React from 'react'

const CatTags = ({ categories }) => {
    
    return (
        <div className="px-3 py-1">
            { categories.map(category => 
                <div key={`category_${category.id}-${Math.random()}`} className='mx-1 inline-flex text-white bg-purple-600 rounded-full	text-xs px-5 py-1'>
                    #{category}
                </div>
            )}
        </div>
    )
}

export default CatTags