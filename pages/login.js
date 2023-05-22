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
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [ authUser ] = useMutation(AUTH_USER);
    const [ message, saveMessage ] = useState({
        message: '',
        type: ''
    });
    const router = useRouter();
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t('INPUT_ERRORS.INVALID_EMAIL'))
                .required(t('INPUT_ERRORS.REQUIRED')),
            password: Yup.string()
                .required(t('INPUT_ERRORS.REQUIRED')),
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
                message: t('MESSAGES.REDIRECTING'),
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
                <h1 className="text-2xl text-white font-light text-center">
                    { t('LAYOUT_TITLES.LOGIN') }
                </h1>
                { useToaster(message?.message, message?.type) }
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form                             
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <InputField
                                label={t('LABELS.EMAIL')}
                                type='email'
                                placeholder={t('PLACEHOLDERS.EMAIL')}
                                value='email'
                                formik={formik}
                            />
                            <InputField 
                                label={t('LABELS.PASSWORD')}
                                type='password' 
                                placeholder={t('PLACEHOLDERS.PASSWORD')}
                                value='password' 
                                formik={formik} 
                            />
                            <SubmitBtn value={t('BUTTONS.LOGIN')} />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login;
