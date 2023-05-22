import React, { useState } from 'react'
import Layout from '../components/shared/Layout'
import InputField from '../components/shared/InputField'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NEW_PRODUCT } from '../GraphQL/Mutations/Product';
import { GET_PRODUCTS } from '../GraphQL/Queries/Product';
import useToaster from '../hooks/useToaster';
import SubmitBtn from '../components/shared/SubmitBtn';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const NewProduct = () => {
    const { t } = useTranslation();
    const [ message, saveMessage ] = useState({
        message: '',
        type: ''
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            price: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            quantity: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        }),
        onSubmit: async (values) => {
            const { name, price, quantity } = values;
            try {
                const { data } = await newProduct({
                    variables: {
                        input: {
                            name,
                            price,
                            quantity
                        }
                    }
                })
                Swal.fire({
                    title: t('MESSAGES.SUCCESS.ON_CREATION.TITLE', { product: name }),
                    text: t('MESSAGES.SUCCESS.ON_CREATION.TEXT'),
                    icon: 'success',
                    timer: 2000
                })
                values.name = ''
                values.price = ''
                values.quantity = ''
            } catch ({ message }) {
                saveMessage({
                    message: message.replace('GraphQL error:', ''),
                    type: 'error'
                })
            }
        }
    })
    const [ newProduct ] = useMutation(NEW_PRODUCT, {
        update( cache, { data: { newProduct } } ) {
            const { getAllProducts } = cache.readQuery({ query: GET_PRODUCTS });
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getAllProducts: [...getAllProducts, newProduct]
                }
            })
        }
    });

    return (
        <Layout title={ t('LAYOUT_TITLES.PRODUCTS') }>
            { useToaster(message?.message, message?.type) }
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form 
                        onSubmit={formik.handleSubmit} 
                        className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                        <InputField
                            label={t('LABELS.NAME')}
                            type='text'
                            placeholder={t('PLACEHOLDERS.NAME_PRODUCT')}
                            value='name'
                            formik={formik} />
                        <InputField
                            label={t('LABELS.PRICE')}
                            type='number'
                            placeholder={t('PLACEHOLDERS.PRICE_PRODUCT')}
                            value='price'
                            formik={formik} />
                        <InputField
                            label={t('LABELS.QUANTITY')}
                            type='number'
                            placeholder={t('PLACEHOLDERS.QTY_PRODUCT')}
                            value='quantity'
                            formik={formik} />
                        <SubmitBtn value={t('BUTTONS.NEW_PRODUCT')} />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewProduct