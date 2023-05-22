import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { CiCircleRemove } from 'react-icons/ci';
import { IoMdPhonePortrait } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';
import { DELETE_ORDER, UPDATE_ORDER } from '../../GraphQL/Mutations/Order';
import Swal from 'sweetalert2';
import { GET_ORDERS_BY_SELLER } from '../../GraphQL/Queries/Order';
import { useTranslation } from 'react-i18next';
import CurrencyNumber from '../shared/CurrencyNumber';

const OrdersTable = ({ order, ctx }) => {
    const { id, total, client: { name, lastname, email, phone }, state, client } = order;

    const [statusOrder, setStatusOrder] = useState(state);
    const [className, setClassName] = useState('');
    const { t } = useTranslation();
    const [ updateOrder ] = useMutation(UPDATE_ORDER);
    const [ deleteOrder ] = useMutation(DELETE_ORDER, {
        update( cache ) {
            const { getOrderVendedor } = cache.readQuery({ query: GET_ORDERS_BY_SELLER });
            cache.writeQuery({
                query: GET_ORDERS_BY_SELLER,
                data: {
                    getOrderVendedor: getOrderVendedor.filter(orders => orders.id !== id)
                }
            })
        }
    });

    useEffect(() => {
        if(statusOrder) {
            setStatusOrder(statusOrder)
        }
        orderClass()
    }, [ statusOrder ])

    const updateOrderStatus = async newStatus => {
        try {
            const { data } = await updateOrder({
                variables: {
                    id, 
                    input: {
                        state: newStatus,
                        client: client.id
                    }
                }
            })
            setStatusOrder(data.updateOrder.state)
        } catch ({ message }) {
            console.log(message);
        }
    }

    const orderClass = () => {
        if (statusOrder === "PENDING") {
            setClassName('border-yellow-500 bg-yellow-50')
        } else if(statusOrder === "COMPLETED") {
            setClassName('border-green-500 bg-green-50')
        } else {
            setClassName('border-red-800 bg-red-50 opacity-50')
        }
    }

    const confirmDeleteOrder = () => {
        Swal.fire({
            title: t('MESSAGES.CONFIRMATION.ON_DELETE.TITLE', { ctx: t("CTX."+ctx) }),
            text: t('MESSAGES.CONFIRMATION.ON_DELETE.TEXT'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('MESSAGES.CONFIRMATION.ON_DELETE.CONFIRMATION_BTN', { ctx: t("CTX."+ctx) }),
            cancelButtonText: t('MESSAGES.CONFIRMATION.ON_DELETE.CANCEL_BTN')
        }).then(async (result) => {
            if (result.value) {
                try {
                    const { data } = await deleteOrder({
                    variables: { id }
                })
                Swal.fire(
                    data.deleteOrder, 
                    t('MESSAGES.SUCCESS.ON_DELETE', { ctx: t("CTX."+ctx) }),
                    'success'
                )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }


    const showSummaryItems = () => {
        let content = '';
        order.order.map((item) => {
            content += `
                <div key=${item.id} className='mt-4'>
                    <p className='text-sm text-gray-700 italic p-0 m-0 leading-3'> 
                        <span className='font-bold'>${item.name || '-' } </span> 
                        (${ item.quantity } ud)
                    </p>
                </div>
            `
        });
        return content;
    }

    const viewOrderSummaryItems = () => {
        Swal.fire({
            title: t('MESSAGES.INFO.SUMMARY_ITEMS'),
            html: showSummaryItems(),
            icon: 'info',
        })
    }

    return (
        <div className={`${className} border-b-4 my-5 rounded p-5 grid md:grid-cols-1 gap-10 shadow-lg lg:max-h-96 sm:max-h-full min-h-fit`}>
            <div className="mt-1 flex-col flex justify-start">
                <div className='font-bold text-gray-800 flex items-center my-1'>
                    <span>
                        {t('LABELS.CLIENT')}:
                    </span>
                    <span className='mx-2 font-light'>{`${name} ${lastname}`}</span>
                </div>
                <p className='font-bold text-sm text-gray-600 flex items-center mt-1'>
                    <MdEmail />
                    <span className='mx-2 font-light'>{`${email}`}</span>
                </p>
                <p className='font-bold text-sm text-gray-600 flex items-center my-1'>
                    <IoMdPhonePortrait /> 
                    <span className='mx-2 font-light'>{`${phone || '-'}`}</span>
                </p>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-800 font-bold mt-1'>
                        {t('LABELS.ORDER_SUMMARY')}
                    </span>
                    <AiFillPlusCircle  
                        onClick={() => viewOrderSummaryItems()}
                        className='cursor-pointer' />
                </div>
                <p className='mt-3 font-bold text-gray-800'>
                    {t('LABELS.TOTAL')}: <CurrencyNumber value={total} />
                </p>
            </div>
            <div className='lg:mt-0 sm:mt-3 flex-col flex justify-end'>
                <select 
                    value={statusOrder}
                    onChange={e => updateOrderStatus(e.target.value)}
                    className='flex lg:mt-1 sm:mt-4 justify-center items-center appearence-none bg-blue-400 border border-blue-600 w-full text-white py-2 px-4 rounded text-center leading-light focus:outline-none focus:bg-blue-400 focus:border-blue-800 uppercase text-xs font-bold'>
                        <option value='COMPLETED'>
                            {t('LABELS.STATUS.COMPLETED')}
                        </option>
                        <option value='PENDING'>
                            {t('LABELS.STATUS.PENDING')}
                        </option>
                        <option value='CANCELLED'>
                            {t('LABELS.STATUS.CANCELLED')}
                        </option>
                </select>
                <button 
                    onClick={() => confirmDeleteOrder()}
                    className='flex lg:mt-1 sm:mt-4 justify-center items-center bg-red-800 px-5 py-2 text-white w-full rounded uppercase text-xs font-bold'>
                    {t('BUTTONS.DELETE_ORDER')}
                    <CiCircleRemove className='ml-2' />
                </button>
            </div>
        </div>
    )
}

export default OrdersTable;