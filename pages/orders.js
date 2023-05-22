import React from 'react';
import Layout from '../components/shared/Layout';
import Link from 'next/link';
import OrdersTable from '../components/orders/OrdersTable';
import { useQuery } from '@apollo/client';
import { GET_ORDERS_BY_SELLER } from '../GraphQL/Queries/Order';
import Loading from '../components/shared/Loading';
import { BsPlusCircle } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import EmptyResults from '../components/shared/EmptyResults';

const Orders = () => {
    const { data, loading } = useQuery(GET_ORDERS_BY_SELLER);
    const { t } = useTranslation();

    return (
        <Layout title={ t('LAYOUT_TITLES.ORDERS') }>
            <Link href="/neworder">
                <span className='bg-blue-800 py-2 px-5 mt-2 leading-4 inline-flex justify-center items-middle gap-3 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
                    <BsPlusCircle />
                    { t('BUTTONS.NEW_ORDER') }
                </span>
            </Link>
            { loading 
                ? <Loading /> 
                :  data?.getOrderVendedor.length 
                    ? <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
                        { data.getOrderVendedor.map(order => 
                            <OrdersTable 
                                ctx={'Order'}
                                key={order.id} 
                                order={order} 
                            />
                        )}
                    </div>
                    : <EmptyResults 
                        message={t('EMPTY.ORDERS')} 
                    />
            }
        </Layout>
    )
}

export default Orders;