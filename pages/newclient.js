import React, { useState } from 'react'
import Layout from '../components/shared/Layout'
import InputField from '../components/shared/InputField'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NEW_CLIENT } from '../GraphQL/Mutations/Client';
import { useRouter } from 'next/router';
import { GET_CLIENT_SELLERS } from '../GraphQL/Queries/Client';
import useToaster from '../hooks/useToaster';
import SubmitBtn from '../components/shared/SubmitBtn';

const NewClient = () => {
    const [ message, saveMessage ] = useState({
        message: '',
        type: ''
    });
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            company: '',
            email: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre del cliente es obligatorio'),
            lastname: Yup.string().required('El apellido del cliente es obligatorio'),
            company: Yup.string().required('La empresa del cliente es obligatoria'),
            email: Yup.string().email('Email is not valid').required('Email is required'),
        }),
        onSubmit: async (values) => {
            const {name, lastname, company, email, phone } = values;
            try {
                const { data } = await newClient({
                    variables: {
                        input: {
                            name,
                            lastname,
                            company,
                            email,
                            phone
                        }
                    }
                })
                saveMessage({
                    message: 'Client created sucessfully',
                    type: 'success'
                })
                setTimeout(() => {
                    router.push('/')
                }, 1000);
            } catch ({ message }) {
                saveMessage({
                    message: message.replace('GraphQL error:', ''),
                    type: 'error'
                })
            }
        }
    })
    const [ newClient ] = useMutation(NEW_CLIENT, {
        update( cache, { data: { newClient } } ) {
            const { getClientsVendedor } = cache.readQuery({ query: GET_CLIENT_SELLERS });
            cache.writeQuery({
                query: GET_CLIENT_SELLERS,
                data: {
                    getClientsVendedor: [...getClientsVendedor, newClient]
                }
            })
        }
    });

    return (
        <Layout title="New Client">
            { useToaster(message?.message, message?.type) }
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form 
                        onSubmit={formik.handleSubmit} 
                        className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                        <InputField
                            label='Nombre'
                            type='text'
                            placeholder='Nombre del cliente'
                            value='name'
                            formik={formik}
                        />
                        <InputField 
                            label='Apellido'
                            type='text'
                            placeholder='Apellido del cliente'
                            value='lastname'
                            formik={formik} />
                        <InputField 
                            label='Empresa'
                            type='text'
                            placeholder='Empresa del cliente'
                            value='company'
                            formik={formik} />
                        <InputField 
                            label='Email'
                            type='email'
                            placeholder='Email del cliente'
                            value='email'
                            formik={formik} />
                        <InputField 
                            label='Telefono'
                            type='tel'
                            placeholder='Telefono del cliente'
                            value='phone'
                            formik={formik} />
                        <SubmitBtn value='Registrar cliente' />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewClient