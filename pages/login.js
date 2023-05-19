import Layout from '../components/Layout';
import InputField from '../components/InputField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AUTH_USER } from '../GraphQL/Mutations';
import useToaster from '../hooks/useToaster';
import SubmitBtn from '../components/SubmitBtn';

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
                            { InputField('Email', 'email', 'Email del usuario', 'email', formik) }
                            { InputField('Password', 'password', 'Password del usuario', 'password', formik) }
                            { SubmitBtn('Iniciar Sesión') }
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login;
