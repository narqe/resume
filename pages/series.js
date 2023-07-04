import React from 'react';
import ClientLayout from '@components/layouts/ClientLayout';
import CategoryBlog from '@components/blog/categories/CategoryBlog';

const Series = ({ isAuth }) => {
    
    return (
        <ClientLayout isAuth={isAuth}>
            <CategoryBlog cat='SERIES' limit={100} />
        </ClientLayout>
    )
}

export default Series;
