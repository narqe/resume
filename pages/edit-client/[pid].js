import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import InputField from '../../components/InputField';
import SubmitBtn from '../../components/SubmitBtn';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENT } from '../../GraphQL/Queries';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_CLIENT } from '../../GraphQL/Mutations';
import Swal from 'sweetalert2';

const EditClient = () => {
    const router = useRouter();
    const { query } = router;

    const { data, loading, error} = useQuery(GET_CLIENT, {
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
    
    if(loading) return 'Cargando...';

    const { getClient } = data;
    
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
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik 
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={getClient}
                        onSubmit={ (values) => updateClientOnDb(values) }
                    >
                        { props => {
                            return (
                                <form
                                    onSubmit={props.handleSubmit}
                                    className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                                    { InputField('Nombre', 'text', 'Nombre del cliente', 'name', props) }
                                    { InputField('Apellido', 'text', 'Apellido del cliente', 'lastname', props) }
                                    { InputField('Empresa', 'text', 'Empresa del cliente', 'company', props) }
                                    { InputField('Email', 'email', 'Email del cliente', 'email', props) }
                                    { InputField('Telefono', 'tel', 'Telefono del cliente', 'phone', props) }
                                    { SubmitBtn('Editar Cliente') }
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div> 
        </Layout>
    )
}

export default EditClient