import React, { useContext, useState } from 'react'
import Layout from '../components/shared/Layout'
import AssignClient from '../components/orders/AssignClient';
import AssignProducts from '../components/orders/AssignProducts';
import SummaryOrder from '../components/orders/SummaryOrder';
import Total from '../components/orders/Total';
import OrderContext from '../context/orders/OrderContext';
import { useMutation } from '@apollo/client';
import { NEW_ORDER } from '../GraphQL/Mutations/Order';
import { GET_ORDERS_BY_SELLER } from '../GraphQL/Queries/Order';
import useToaster from '../hooks/useToaster';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const NewOrder = () => {
    const [ message, saveMessage ] = useState({
        message: '',
        type: ''
    });
    const { t } = useTranslation();
    const router = useRouter();
    const [ newOrder ] = useMutation(NEW_ORDER, { 
        update(cache, { data: { newOrder }}){
            const { getOrderVendedor } = cache.readQuery({
                query: GET_ORDERS_BY_SELLER
            })

            cache.writeQuery({
                query: GET_ORDERS_BY_SELLER,
                data: {
                    getOrderVendedor: [ ...getOrderVendedor, newOrder ]
                }
            })
        } 
    })
    const orderContext = useContext(OrderContext);
    const { client, products, total } = orderContext;

    const validateOrder = () => {
        return (!products?.every(product => product.quantity > 0) || total === 0 || !client) ? " bg-gray-200 opacity-50 cursor-not-allowed text-gray-500" : "text-white bg-blue-700 "
    }

    const createNewOrder = async () => {
        try {
            const order = products.map(({ __typename, ...product }) => product)
            const { data } = await newOrder({
                variables: {
                    input: {
                        client: client?.id,
                        total,
                        order
                    }
                }
            })
            saveMessage({
                message: 'Your order was created succesfully',
                type: 'success'
            })
            setTimeout(() => {
                router.push("/orders")
            }, 1500)
        } catch ({ message }) {
            saveMessage({
                message,
                type: 'error'
            })
        }
    }
    
    return (
        <Layout title={ t('LAYOUT_TITLES.ORDERS') }>
            { useToaster(message?.message, message?.type) }
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <div className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                        <AssignClient />
                        <AssignProducts />
                        <SummaryOrder />
                        <Total />
                        <button 
                            type='button'
                            onClick={() => createNewOrder()}
                            className={ `w-full mt-5 p-2 uppercase cursor-pointer ${validateOrder()}` }>
                                Generar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NewOrder