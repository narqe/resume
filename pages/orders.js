import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import OrdersTable from '../components/OrdersTable';
import { useQuery } from '@apollo/client';
import { GET_ORDERS_BY_SELLER } from '../GraphQL/Queries';

const Orders = () => {
    const { data, loading } = useQuery(GET_ORDERS_BY_SELLER);

    if(loading) return ('Cargando...')

    const { getOrderVendedor } = data;

    return (
        <Layout title="Orders">
            <Link href="/neworder">
                <span className='bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
                    New Order
                </span>
            </Link>
            { !getOrderVendedor?.length 
                ? 'No hay pedidos'
                : <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
                    { getOrderVendedor.map(order => <OrdersTable key={order.id} order={order} />)}
                </div>
            }
        </Layout>
    )
}

export default Orders;