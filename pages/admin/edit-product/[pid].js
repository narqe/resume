import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layouts/Layout';
import InputField from '@components/shared/Inputs/InputField';
import SubmitBtn from '@components/shared/Inputs/SubmitBtn';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '@graphql/Queries/Product';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_PRODUCT } from '@graphql/Mutations/Product';
import Swal from 'sweetalert2';
import Loading from '@components/shared/Loading';
import { useTranslation } from 'react-i18next';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';

const EditProduct = () => {
    const router = useRouter();
    const { query } = router;
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: query.pid
        }
    });
    const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

    const schemaValidation = Yup.object({
        name: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        price: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        quantity: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
    })
    
    const updateProductOnDb = async values => {
        const { name, price, quantity } = values;
        try {
            const { data } = await updateProduct({
                variables: {
                    id: query.pid,
                    input: {
                        name, 
                        price, 
                        quantity
                    }
                }
            })
            router.push("/admin/products")
            Swal.fire({
                text: t('MESSAGES.CONFIRMATION.ON_UPDATE_PRODUCT.TITLE'),
                icon: 'success',
                iconColor: '#154e3a',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={t('LAYOUT_TITLES.EDIT_PRODUCT')}>
            { loading 
                ?   <Loading />
                :   error 
                    ? <ErrorCustomTableResults /> 
                    :   <div className='flex justify-center mt-5'>
                            <div className='w-full max-w-lg'>
                                <Formik 
                                    validationSchema={schemaValidation}
                                    enableReinitialize
                                    initialValues={ data?.getProductById }
                                    onSubmit={ (values) => updateProductOnDb(values) }
                                >
                                    { props => {
                                        return (
                                            <form
                                                onSubmit={props.handleSubmit}
                                                className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                                                <InputField
                                                    label={t('LABELS.NAME')}
                                                    type='text'
                                                    placeholder={t('PLACEHOLDERS.NAME_PRODUCT')}
                                                    value='name'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label={t('LABELS.PRICE')}
                                                    type='number'
                                                    placeholder={t('PLACEHOLDERS.PRICE_PRODUCT')}
                                                    value='price'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label={t('LABELS.QUANTITY')}
                                                    type='number'
                                                    placeholder={t('PLACEHOLDERS.QTY_PRODUCT')}
                                                    value='quantity'
                                                    formik={props} 
                                                />
                                                <SubmitBtn value={t('BUTTONS.EDIT_PRODUCT')} />
                                            </form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        </div> 
            }
        </Layout>
    )
}

export default EditProduct