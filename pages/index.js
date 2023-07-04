import React from 'react';
import ClientLayout from '@components/layouts/ClientLayout';
import IndexCategoryBlog from '@components/blog/categories/IndexCategoryBlog';
import Featured from '@components/blog/categories/Featured';

const Index = ({ isAuth }) => {
    
    return (
        <ClientLayout isAuth={isAuth}>
            <Featured limit={3} />
            <div className="lg:inline-flex w-full">
                <div className='lg:w-2/3 w-full'>
                    <IndexCategoryBlog cat='MUSIC' limit={2} />
                </div>
                <div className='lg:w-1/3 w-full'>
                    <IndexCategoryBlog cat='BOOKS' limit={3} />
                </div>
            </div>

            <div className="lg:inline-flex w-full">
                <div className='lg:w-2/4'>
                    <IndexCategoryBlog cat='CINEMA' limit={4} />
                </div>
                <div className='lg:w-2/4'>
                    <IndexCategoryBlog cat='SERIES' limit={4} />
                </div>
            </div>
        </ClientLayout>
    )
}

export default Index;
