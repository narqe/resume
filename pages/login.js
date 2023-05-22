import Layout from '../components/shared/Layout';
import InputField from '../components/shared/InputField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useToaster from '../hooks/useToaster';
import SubmitBtn from '../components/shared/SubmitBtn';
import { AUTH_USER } from '../GraphQL/Mutations/Authentication';

const Login = () => {
    const [ authUser ] = useMutation(AUTH_USER);
    const [ message, saveMessage ] = useState({
        message: '',
        type: ''
    });
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email is not valid').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => onLogin(values)
    })

    const onLogin = async ({ email, password }) => {
        try {
            const { data } = await authUser({
                variables: {
                    input: {
                        email, 
                        password  
                    }
                }
            });
            saveMessage({
                message: 'Redirecting...',
                type: 'info'
            })
            setTimeout(() => {
                const { token } = data.authUser;
                localStorage.setItem('token', token);
            }, 1500);
            
            setTimeout(() => { 
                router.push('/')
            }, 3000);
        } catch ({ message }) {
            saveMessage({
                message: message.replace('GraphQL error:', ''),
                type: 'error'
            })
            setTimeout(() => saveMessage(null), 2000);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push("/")
        }
    }, [])

    return (
        <>
            <Layout title=''>
                <h1 className="text-2xl text-white font-light text-center">Login</h1>
                { useToaster(message?.message, message?.type) }
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form                             
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
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
                            <SubmitBtn value='Iniciar Sesión' />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login;
