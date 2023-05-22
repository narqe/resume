import React from 'react';
import Layout from '../components/shared/Layout';
import Link from 'next/link';
import OrdersTable from '../components/orders/OrdersTable';
import { useQuery } from '@apollo/client';
import { GET_ORDERS_BY_SELLER } from '../GraphQL/Queries/Order';
import Loading from '../components/shared/Loading';

const Orders = () => {
    const { data, loading } = useQuery(GET_ORDERS_BY_SELLER);

    return (
        <Layout title="Orders">
            <Link href="/neworder">
                <span className='bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
                    New Order
                </span>
            </Link>
            { loading 
                ? <Loading /> 
                :  data?.getOrderVendedor.length 
                    ? <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
                        { data.getOrderVendedor.map(order => 
                            <OrdersTable 
                                key={order.id} 
                                order={order} 
                            />
                        )}
                    </div>
                    : 'Empty state'
            }
        </Layout>
    )
}

export default Orders;