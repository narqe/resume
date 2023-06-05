import React from 'react';
import ClientLayout from '@components/layouts/ClientLayout';
import CategoryBlog from '@components/blog/categories/CategoryBlog';

const Music = ({ isAuth }) => {
    
    return (
        <ClientLayout isAuth={isAuth}>
            <CategoryBlog cat='MUSIC' limit={100} />
        </ClientLayout>
    )
}

export default Music;
