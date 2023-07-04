import React from 'react';
import ClientLayout from '@components/layouts/ClientLayout';
import CategoryBlog from '@components/blog/categories/CategoryBlog';

const Books = ({ isAuth }) => {
    
    return (
        <ClientLayout isAuth={isAuth}>
            <CategoryBlog cat='BOOKS' limit={100} />
        </ClientLayout>
    )
}

export default Books;
