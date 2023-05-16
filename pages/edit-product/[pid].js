import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import InputField from '../../components/InputField';
import SubmitBtn from '../../components/SubmitBtn';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../../GraphQL/Queries';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_PRODUCT } from '../../GraphQL/Mutations';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const router = useRouter();
    const { query } = router;

    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: query.pid
        }
    });
    console.log(data);

    const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

    const schemaValidation = Yup.object({
        name: Yup.string().required('El nombre del producto es obligatorio'),
        price: Yup.string().required('El precio es obligatorio'),
        quantity: Yup.string().required('La cantidad es obligatoria'),
    })

    if(loading) return 'Cargando...';

    const { getProductById } = data;
    
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
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik 
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={getProductById}
                        onSubmit={ (values) => updateProductOnDb(values) }
                    >
                        { props => {
                            return (
                                <form
                                    onSubmit={props.handleSubmit}
                                    className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                                    { InputField('Nombre', 'text', 'Nombre del producto', 'name', props) }
                                    { InputField('Price', 'number', 'Precio del producto', 'price', props) }
                                    { InputField('Quantity', 'number', 'Cantidad disponible', 'quantity', props) }
                                    { SubmitBtn('Editar Producto') }
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div> 
        </Layout>
    )
}

export default EditProduct