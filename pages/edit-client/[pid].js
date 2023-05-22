import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/shared/Layout';
import InputField from '../../components/shared/InputField';
import SubmitBtn from '../../components/shared/SubmitBtn';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENT } from '../../GraphQL/Queries/Client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_CLIENT } from '../../GraphQL/Mutations/Client';
import Swal from 'sweetalert2';
import Loading from '../../components/shared/Loading';

const EditClient = () => {
    const router = useRouter();
    const { query } = router;

    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: {
            id: query.pid
        }
    });

    const [ updateClient ] = useMutation(UPDATE_CLIENT)

    const schemaValidation = Yup.object({
        name: Yup.string().required('El nombre del cliente es obligatorio'),
        lastname: Yup.string().required('El apellido del cliente es obligatorio'),
        company: Yup.string().required('La empresa del cliente es obligatoria'),
        email: Yup.string().email('Email is not valid').required('Email is required'),
    })
    
    const updateClientOnDb = async values => {
        const { name, lastname, company, phone, email } = values;
        try {
            const { data } = await updateClient({
                variables: {
                    id: query.pid,
                    input: {
                        name, 
                        lastname, 
                        company, 
                        phone, 
                        email
                    }
                }
            })
            router.push("/")
            Swal.fire(
                'Actualizado',
                `El usuario fue actualizado correctamente`,
                'success'
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title="Editar Cliente">
            { loading 
                ?   <Loading />
                :   error 
                    ? 'Error component' 
                    :   <div className='flex justify-center mt-5'>
                            <div className='w-full max-w-lg'>
                                <Formik 
                                    validationSchema={schemaValidation}
                                    enableReinitialize
                                    initialValues={data?.getClient}
                                    onSubmit={ (values) => updateClientOnDb(values) }
                                >
                                    { props => {
                                        return (
                                            <form
                                                onSubmit={props.handleSubmit}
                                                className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                                                <InputField
                                                    label='Nombre'
                                                    type='text'
                                                    placeholder='Nombre del cliente'
                                                    value='name'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label='Apellido'
                                                    type='text'
                                                    placeholder='Apellido del cliente'
                                                    value='lastname'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label='Empresa'
                                                    type='text'
                                                    placeholder='Empresa del cliente'
                                                    value='company'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label='Email'
                                                    type='email'
                                                    placeholder='Email del cliente'
                                                    value='email'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label='Telefono'
                                                    type='tel'
                                                    placeholder='Telefono del cliente'
                                                    value='phone'
                                                    formik={props} 
                                                />
                                                <SubmitBtn value='Editar Cliente' />
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

export default EditClient