import React from 'react'
import Layout from '../components/Layout'
import SubmitBtn from '../components/SubmitBtn';
import AssignClient from '../components/orders/AssignClient';
import AssignProducts from '../components/orders/AssignProducts';

const NewOrder = () => {
    return (
        <Layout title="New Order">
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <div className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                        <AssignClient />
                        <AssignProducts />
                        { SubmitBtn('Generar Pedido') }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NewOrder