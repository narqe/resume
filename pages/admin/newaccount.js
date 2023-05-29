import AuthLayout from '@components/layouts/AuthLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '@components/shared/Inputs/InputField';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { NEW_ACCOUNT } from '@graphql/Mutations/Authentication' 
import useToaster from '@hooks/useToaster';
import SubmitBtn from '@components/shared/Inputs/SubmitBtn';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Separator from '@components/shared/Structure/Separator';

const NewAccount = () => {
    const [ newUser ] = useMutation(NEW_ACCOUNT);
    const [ message, saveMessage ] = useState(null);
    const { t } = useTranslation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            lastname: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            email: Yup.string()
                .email(t('INPUT_ERRORS.INVALID_EMAIL'))
                .required(t('INPUT_ERRORS.REQUIRED')),
            password: Yup.string()
                .min(6, t('INPUT_ERRORS.MIN_REQUIRED', { qty: 6 }))
                .required(t('INPUT_ERRORS.REQUIRED')),
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
                    message: t('MESSAGES.SUCCESS.ON_CREATION.USER', { user: data.newUser.email }),
                    type: 'info'
                });
                setTimeout(() => router.push('/admin/login'), 2000);

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
            <AuthLayout title={ t('LAYOUT_TITLES.NEW_ACCOUNT') }>                
                { useToaster(message?.message, message?.type) }
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form 
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 block"
                        >
                            <InputField
                                label={t('LABELS.NAME')}
                                type='text'
                                placeholder={t('PLACEHOLDERS.NAME_ACCOUNT')}
                                value='name'
                                formik={formik} 
                            />
                            <InputField
                                label={t('LABELS.LASTNAME')}
                                type='text'
                                placeholder={t('PLACEHOLDERS.LASTNAME_ACCOUNT')}
                                value='lastname'
                                formik={formik} 
                            />
                            <InputField
                                label={t('LABELS.EMAIL')}
                                type='email'
                                placeholder={t('PLACEHOLDERS.EMAIL_ACCOUNT')}
                                value='email'
                                formik={formik} 
                            />
                            <InputField
                                label={t('LABELS.PASSWORD')}
                                type='password'
                                placeholder={t('PLACEHOLDERS.PASSWORD_ACCOUNT')}
                                value='password'
                                formik={formik} 
                            />
                            <Separator />
                            <SubmitBtn value={t('BUTTONS.NEW_USER')} />
                            <Link href="/admin/login">
                                <p className='pt-2 text-center cursor-pointer hover:underline text-yellow-700 text-sm hover:font-bold'>
                                    {t('BUTTONS.SIGN_IN')}
                                </p>
                            </Link>
                        </form>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default NewAccount;
