import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import { useRouter } from "next/router"
import Header from './Header';

const Layout = ({ children, title }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>CRM</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" referrerpolicy="no-referrer" /> 
            </Head>
            { router.pathname === '/login' || router.pathname === '/newaccount' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>
                        <h1 className="text-2xl text-white font-light flex justify-center pb-5">{ title }</h1>
                        { children }
                    </div>
                </div>
            ) : (
                <div className="bg-gray-200 min-h-screen">
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen">
                            <Header>
                                <h1 className="text-2xl text-gray-800 font-light">{ title }</h1>
                            </Header>
                            <div className='px-10 pt-5'>
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    )
}

export default Layout;