import React from 'react'
import BlogItem from '@components/blog/BlogItem';

const Music = ({ article, isAdmin = false }) => {
    return <BlogItem article={article} isAdmin={isAdmin} />
}

export default Music