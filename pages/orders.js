import React from 'react';
import Layout from '../components/shared/Layout';
import OrdersTable from '../components/orders/OrdersTable';
import { useQuery } from '@apollo/client';
import { GET_ORDERS_BY_SELLER } from '../GraphQL/Queries/Order';
import Loading from '../components/shared/Loading';
import { useTranslation } from 'react-i18next';
import EmptyResults from '../components/shared/EmptyResults';
import NewEntityBtn from '../components/shared/NewEntityBtn';

const Orders = () => {
    const { data, loading } = useQuery(GET_ORDERS_BY_SELLER);
    const { t } = useTranslation();

    return (
        <Layout title={ t('LAYOUT_TITLES.ORDERS') }>
            <NewEntityBtn link={'/neworder'} buttonLabel={'NEW_ORDER'} />
            { loading 
                ? <Loading /> 
                :  data?.getOrderVendedor?.length 
                    ?   <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
                            { data.getOrderVendedor.map(order => 
                                <OrdersTable 
                                    ctx={'Order'}
                                    key={order.id} 
                                    order={order} 
                                />
                            )}
                        </div>
                    : <EmptyResults  message={t('EMPTY.ORDERS')} />
            }
        </Layout>
    )
}

export default Orders;