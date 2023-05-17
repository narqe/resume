import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const Orders = () => {
    return (
        <Layout title="Orders">
            <Link href="/neworder">
                <span className='bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
                    New Order
                </span>
            </Link>
        </Layout>
    )
}

export default Orders;