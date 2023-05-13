import React, { useState } from 'react'
import Layout from '../components/Layout'
import InputField from '../components/InputField'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NEW_CLIENT } from '../GraphQL/Mutations';
import { useRouter } from 'next/router';
import { GET_CLIENT_SELLERS } from '../GraphQL/Queries';
import useToaster from '../hooks/useToaster';

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
        <Layout>
            { useToaster(message?.message, message?.type) }
            <h1 className="text-2xl text-gray-800 font-light">New Client</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form 
                        onSubmit={formik.handleSubmit} 
                        className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                        { InputField('Nombre', 'text', 'Nombre del cliente', 'name', formik) }
                        { InputField('Apellido', 'text', 'Apellido del cliente', 'lastname', formik) }
                        { InputField('Empresa', 'text', 'Empresa del cliente', 'company', formik) }
                        { InputField('Email', 'email', 'Email del cliente', 'email', formik) }
                        { InputField('Telefono', 'tel', 'Telefono del cliente', 'phone', formik) }
                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                            value="Registrar Cliente"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewClient