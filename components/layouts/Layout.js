import React from 'react';
import Head from 'next/head';
import Sidebar from '@components/shared/Structure/Sidebar';
import Separator from '@components/shared/Structure/Separator';
import Header from '@components/shared/Structure/Header';

const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>Narcotica | El vicio es cultura</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" referrerPolicy="no-referrer" /> 
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="bg-purple-50 min-h-screen">
                <div className="sm:flex min-h-screen">
                    <Sidebar />
                    <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen">
                        <Header>
                            <h1 className="md:text-2xl px-10 mt-5 py-2 font-light sm:text-md">
                                { title }
                            </h1>
                            <Separator />
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

export default Layout;