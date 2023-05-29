import React from 'react';
import Head from 'next/head';

const AuthLayout = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>CRM</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" referrerPolicy="no-referrer" /> 
            </Head>
            <div className="bg-green-900 min-h-screen flex flex-col justify-center">
                <div>
                    <h1 className="text-2xl text-white font-light flex justify-center pb-5">{ title }</h1>
                    { children }
                </div>
            </div>
        </>
    )
}

export default AuthLayout;