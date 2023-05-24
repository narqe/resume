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
import { useTranslation } from 'react-i18next';

const NewClient = () => {
    const [ message, saveMessage ] = useState({
        message: '',
        type: ''
    });
    const { t } = useTranslation();
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
            name: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            lastname: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            company: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            email: Yup.string()
                .email(t('INPUT_ERRORS.INVALID_EMAIL'))
                .required(t('INPUT_ERRORS.REQUIRED')),
        }),
        onSubmit: async (values) => {
            const { name, lastname, company, email, phone } = values;
            try {
                const { data } = await newClient({
                    variables: {
                        input:  {
                            name,
                            lastname,
                            company,
                            email,
                            phone
                        }
                    }
                })
                saveMessage({
                    message: t('MESSAGES.SUCCESS.ON_CREATION.CLIENT'),
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
        <Layout title={ t('LAYOUT_TITLES.CLIENTS') }>
            { useToaster(message?.message, message?.type) }
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form 
                        onSubmit={formik.handleSubmit} 
                        className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                        <InputField
                            label={t('LABELS.NAME')}
                            type='text'
                            placeholder={t('PLACEHOLDERS.NAME_CLIENT')}
                            value='name'
                            formik={formik}
                        />
                        <InputField 
                            label={t('LABELS.LASTNAME')}
                            type='text'
                            placeholder={t('PLACEHOLDERS.LASTNAME_CLIENT')}
                            value='lastname'
                            formik={formik} />
                        <InputField 
                            label={t('LABELS.COMPANY')}
                            type='text'
                            placeholder={t('PLACEHOLDERS.COMPANY_CLIENT')}
                            value='company'
                            formik={formik} />
                        <InputField 
                            label={t('LABELS.EMAIL')}
                            type='email'
                            placeholder={t('PLACEHOLDERS.EMAIL_CLIENT')}
                            value='email'
                            formik={formik} />
                        <InputField 
                            label={t('LABELS.PHONE')}
                            type='tel'
                            placeholder={t('PLACEHOLDERS.PHONE_CLIENT')}
                            value='phone'
                            formik={formik} />
                        <SubmitBtn value={t('BUTTONS.NEW_CLIENT')} />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewClient