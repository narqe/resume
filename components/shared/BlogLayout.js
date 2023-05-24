import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import Header from './Header';
import Separator from './Separator';
import Metadata from '../blog/Metadata';
import SocialShareToolbar from './SocialShareToolbar';

const BlogLayout = ({ children, title, author, createdOn, url }) => {
    return (
        <>
            <Head>
                <title>CRM</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" referrerPolicy="no-referrer" /> 
            </Head>
            <div className="bg-gray-100 min-h-screen">
                <div className="sm:flex min-h-screen">
                    <Sidebar />
                    <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen">
                        <Header>
                            <h1 className="md:text-2xl px-10 py-2 font-light sm:text-md">
                                { title }
                            </h1>
                            <div className='md:flex sm:inline-flex px-5 items-center justify-between'>
                                <Metadata createdOn={createdOn} author={author} />
                                <SocialShareToolbar
                                    styles="px-5 py-2 flex md:justify-end cursor-pointer gap-2" 
                                    url={url} 
                                    size={24} 
                                />
                            </div>
                            <Separator size={1} />
                        </Header>
                        <div className='px-10 pt-5'>
                            { children }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default BlogLayout;