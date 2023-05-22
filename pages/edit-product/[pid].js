import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/shared/Layout';
import InputField from '../../components/shared/InputField';
import SubmitBtn from '../../components/shared/SubmitBtn';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../../GraphQL/Queries/Product';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_PRODUCT } from '../../GraphQL/Mutations/Product';
import Swal from 'sweetalert2';
import Loading from '../../components/shared/Loading';

const EditProduct = () => {
    const router = useRouter();
    const { query } = router;

    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: query.pid
        }
    });
    const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

    const schemaValidation = Yup.object({
        name: Yup.string().required('El nombre del producto es obligatorio'),
        price: Yup.string().required('El precio es obligatorio'),
        quantity: Yup.string().required('La cantidad es obligatoria'),
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
            router.push("/products")
            Swal.fire(
                'Actualizado',
                `El producto fue actualizado correctamente`,
                'success'
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title="Editar Producto">
            { loading 
                ?   <Loading />
                :   error 
                    ? 'error' 
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
                                                    label='Nombre'
                                                    type='text'
                                                    placeholder='Nombre del producto'
                                                    value='name'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label='Price'
                                                    type='number'
                                                    placeholder='Precio del producto'
                                                    value='price'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label='Quantity'
                                                    type='number'
                                                    placeholder='Cantidad disponible'
                                                    value='quantity'
                                                    formik={props} 
                                                />
                                                <SubmitBtn value='Editar Producto' />
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