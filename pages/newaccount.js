import Layout from '../components/shared/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/shared/InputField';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { NEW_ACCOUNT } from '../GraphQL/Mutations/Authentication' 
import useToaster from '../hooks/useToaster';
import SubmitBtn from '../components/shared/SubmitBtn';
import { useRouter } from 'next/router';

const NewAccount = () => {
    const [ newUser ] = useMutation(NEW_ACCOUNT);
    const [ message, saveMessage ] = useState(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            lastname: Yup.string().required('Last is required'),
            email: Yup.string().email('Email is not valid').required('Email is required'),
            password: Yup.string().min(6, 'Password must have at least 6 characters').required('Password is required'),
        }),
        onSubmit: async values => {
            const { name, lastname, password, email } = values
            try {
                const { data } = await newUser({
                    variables: {
                        input: {
                            name,
                            lastname, 
                            password, 
                            email
                        }
                    }
                })                
                saveMessage({
                    message: `${ data.newUser.email } was created sucessfully`,
                    type: 'info'
                });
                setTimeout(() => router.push('/login'), 2000);

            } catch ({ message }) {
                saveMessage({
                    message: message.replace('GraphQL error:', ''),
                    type: 'error'
                })
                setTimeout(() => saveMessage(null), 2000);
            }
        }
    })

    return (
        <>
            <Layout title="Crear nueva cuenta">                
                { useToaster(message?.message, message?.type) }
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form 
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <InputField
                                label='Nombre'
                                type='text'
                                placeholder='Nombre del usuario'
                                value='name'
                                formik={formik} 
                            />
                            <InputField
                                label='Apellido'
                                type='text'
                                placeholder='Apellido del usuario'
                                value='lastname'
                                formik={formik} 
                            />
                            <InputField
                                label='Email'
                                type='email'
                                placeholder='Email del usuario'
                                value='email'
                                formik={formik} 
                            />
                            <InputField
                                label='Password'
                                type='password'
                                placeholder='Password del usuario'
                                value='password'
                                formik={formik} 
                            />
                            <SubmitBtn value='Crear usuario' />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default NewAccount;
