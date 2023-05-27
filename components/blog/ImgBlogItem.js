import React from 'react';
import { emptyImageDefault } from '../../constants/urls';

const ImgBlogItem = ({ img }) => {
    return (
        <img
            className="h-48 w-full object-cover lg:h-full lg:w-full p-2"
            src={img || emptyImageDefault} 
            height={'100%'} 
            width={'100%'}
        />
    )
}

export default ImgBlogItem