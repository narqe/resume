import React from 'react';
import Head from 'next/head';

const ClientLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title>CRM</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" referrerPolicy="no-referrer" /> 
            </Head>
            <div className="bg-green-50 min-h-screen">
                <div className="sm:flex min-h-screen">
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