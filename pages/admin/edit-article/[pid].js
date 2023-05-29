import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layouts/Layout';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_BLOG_BY_ID } from '@graphql/Queries/Blog';
import { UPDATE_BLOG } from '@graphql/Mutations/Blog';
import Loading from '@components/shared/Loading';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';
import InputField from '@components/shared/Inputs/InputField';
import SubmitBtn from '@components/shared/Inputs/SubmitBtn';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MarkdownInput from '@components/blog/MarkdownInput';
import Swal from 'sweetalert2';

const EditArticle = () => {
    const router = useRouter();
    const { query } = router;
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_BLOG_BY_ID, {
        variables: {
            id: query.pid
        }
    });
    const [ updateBlog ] = useMutation(UPDATE_BLOG)

    const schemaValidation = Yup.object({
        title: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        summary: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        content: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
    })

    const updateBlogOnDb = async values => {
        const { title, summary, content } = values;
        try {
            const { data } = await updateBlog({
                variables: {
                    id: query.pid,
                    input: {
                        title, 
                        summary, 
                        content
                    }
                }
            })
            router.push(`/admin/view-article/${query.pid}`)
            Swal.fire({
                text: t('MESSAGES.CONFIRMATION.ON_UPDATE_BLOG.TITLE'),
                icon: 'success',
                iconColor: '#154e3a',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateImageOnDb = (values) => {
        
    }

    return (
        <Layout title={ t('LAYOUT_TITLES.EDIT_BLOG') }>
        { loading 
            ?   <Loading />
            :   error 
                ?   <ErrorCustomTableResults /> 
                :   <div className='bg-white shadow-md px-8 py-8 mb-4 grid md:grid-cols-3 sm:grid-cols-1 gap-10'>
                        <Formik
                            validationSchema={schemaValidation}
                            enableReinitialize
                            initialValues={ data.getBlogById }
                            onSubmit={ (values) => updateBlogOnDb(values) }
                        >
                        { props => {
                            return (
                                <form onSubmit={props.handleSubmit} className='col-span-2' >
                                    <InputField
                                        label={t('LABELS.TITLE')}
                                        type='text'
                                        placeholder={t('PLACEHOLDERS.TITLE')}
                                        value='title'
                                        formik={props}
                                    />
                                    <InputField
                                        label={t('LABELS.AUTHOR')}
                                        type='text'
                                        placeholder={t('PLACEHOLDERS.AUTHOR')}
                                        value='author'
                                        formik={props}
                                    />
                                    <InputField
                                        label={t('LABELS.SUMMARY')}
                                        type='textarea'
                                        placeholder={t('PLACEHOLDERS.SUMMARY')}
                                        value='summary'
                                        formik={props}
                                    />
                                    <MarkdownInput 
                                        formik={props} 
                                        label={t('LABELS.CONTENT')}
                                        value='content' 
                                    />
                                    <SubmitBtn value={t('BUTTONS.EDIT_BLOG')} />
                                </form>
                            )}
                        }
                        </Formik>
                        <Formik
                            enableReinitialize
                            initialValues={ data.getBlogById }
                            onSubmit={ (values) => updateImageOnDb(values) }
                        >
                        { props => {
                            return (
                                <form onSubmit={props.handleSubmit} encType='multipart/form-data' className='md:my-8'>
                                    <img
                                        src={data.getBlogById?.urlImage} 
                                        height={'100%'} 
                                        width={'100%'}
                                    />
                                    <input 
                                        className='appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        type="file" 
                                        id="file" 
                                        name="file" 
                                        accept="image/*"
                                        onChange={(e) => props.setFieldValue('file', e.currentTarget.files[0])}
                                    />
                                    <p className='break-words'>URL: { data.getBlogById?.urlImage || '-'}</p>
                                    <SubmitBtn value={t('BUTTONS.UPLOAD_PHOTO')} />
                                </form>
                            )}
                        }
                        </Formik>
                    </div>
        }
        </Layout>
    )
}

export default EditArticle