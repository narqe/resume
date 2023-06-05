import React from 'react';
import ClientLayout from '@components/layouts/ClientLayout';
import CategoryBlog from '@components/blog/categories/CategoryBlog';

const Cinema = ({ isAuth }) => {
    
    return (
        <ClientLayout isAuth={isAuth}>
            <CategoryBlog cat='CINEMA' limit={100} />
        </ClientLayout>
    )
}

export default Cinema;
