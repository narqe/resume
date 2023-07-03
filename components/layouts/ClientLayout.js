import React from 'react';
import Head from 'next/head';
import NavMenu from '@components/shared/Structure/NavMenu';

const ClientLayout = ({ children, isAuth }) => {
    return (
        <>
            <Head>
                <title>Narcotica</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" referrerPolicy="no-referrer" /> 
            </Head>
            <div className="bg-purple-50 min-h-screen">
                <div className="flex-col min-h-screen">
                    <NavMenu isAuth={isAuth} />
                    <main className="w-full sm:min-h-screen">
                        <div className='px-10 pt-5'>
                            { children }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default ClientLayout;