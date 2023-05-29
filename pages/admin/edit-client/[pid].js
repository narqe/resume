import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layouts/Layout';
import InputField from '@components/shared/Inputs/InputField';
import SubmitBtn from '@components/shared/Inputs/SubmitBtn';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENT } from '@graphql/Queries/Client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_CLIENT } from '@graphql/Mutations/Client';
import Swal from 'sweetalert2';
import Loading from '@components/shared/Loading';
import { useTranslation } from 'react-i18next';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';

const EditClient = () => {
    const router = useRouter();
    const { t } = useTranslation()
    const { query } = router;

    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: {
            id: query.pid
        }
    });

    const [ updateClient ] = useMutation(UPDATE_CLIENT)

    const schemaValidation = Yup.object({
        name: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        lastname: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        company: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        email: Yup.string()
            .email(t('INPUT_ERRORS.INVALID_EMAIL'))
            .required(t('INPUT_ERRORS.REQUIRED')),
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
            Swal.fire({
                text: t('MESSAGES.CONFIRMATION.ON_UPDATE_CLIENT.TITLE'),
                icon: 'success',
                iconColor: '#154e3a',
                showConfirmButton: false,
                timer: 1500
            })
            router.push("/admin")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={t('LAYOUT_TITLES.EDIT_CLIENT')}>
            { loading 
                ?   <Loading />
                :   error 
                    ? <ErrorCustomTableResults /> 
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
                                                    label={t('LABELS.NAME')}
                                                    type='text'
                                                    placeholder={t('PLACEHOLDERS.NAME_CLIENT')}
                                                    value='name'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label={t('LABELS.LASTNAME')}
                                                    type='text'
                                                    placeholder={t('PLACEHOLDERS.LASTNAME_CLIENT')}
                                                    value='lastname'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label={t('LABELS.COMPANY')}
                                                    type='text'
                                                    placeholder={t('PLACEHOLDERS.COMPANY_CLIENT')}
                                                    value='company'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label={t('LABELS.EMAIL')}
                                                    type='email'
                                                    placeholder={t('PLACEHOLDERS.EMAIL_CLIENT')}
                                                    value='email'
                                                    formik={props} 
                                                />
                                                <InputField
                                                    label={t('LABELS.PHONE')}
                                                    type='tel'
                                                    placeholder={t('PLACEHOLDERS.PHONE_CLIENT')}
                                                    value='phone'
                                                    formik={props} 
                                                />
                                                <SubmitBtn value={t('BUTTONS.EDIT_CLIENT')} />
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