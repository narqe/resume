import React, { useState, useEffect } from 'react';
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
import { GET_BLOG_CATEGORIES } from '@graphql/Queries/Blog';
import Select from 'react-select';

const EditArticle = () => {   
    const router = useRouter();
    const { query } = router;
    const { data, loading, error } = useQuery(GET_BLOG_BY_ID, {
        variables: {
            id: query.pid
        }
    });
    const { data: dataCategories } = useQuery(GET_BLOG_CATEGORIES);
    const [ categoriesSelected, setCategoriesSelected ] = useState(null);
    const { t } = useTranslation();
    const [ updateBlog ] = useMutation(UPDATE_BLOG)
    const [ isFeatured, setIsFeatured ] = useState(false);

    const schemaValidation = Yup.object({
        title: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        summary: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        content: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        isFeatured: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
    })

    const updateBlogOnDb = async values => {
        const titlesCatSelected = categoriesSelected.map(el => el.title)
        const { title, summary, content } = values;
        try {
            const { data } = await updateBlog({
                variables: {
                    id: query.pid,
                    input: {
                        title, 
                        summary, 
                        content,
                        category: titlesCatSelected,
                        isFeatured: isFeatured
                    }
                }
            })
            Swal.fire({
                text: t('MESSAGES.CONFIRMATION.ON_UPDATE_BLOG.TITLE'),
                icon: 'success',
                iconColor: '#154e3a',
                showConfirmButton: false,
                timer: 1500
            })
            router.push(`/admin/blog`)
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeSelected = (selected) => {
        setCategoriesSelected(selected)
    }

    const selectedValues = () => {
        let options = []
        data.getBlogById.category.map(item => {
            let x = dataCategories.getBlogCategories.map(cat => {
                if (cat.title === item) {
                    return {
                        title: cat.title,
                        id: cat.id     
                    }
                }
                return null
            })        
            x = x.filter(( element ) => element !== null);
            options.push(x[0])
            return x;
        })
        return options;
    }

    useEffect(() => {
        if (data?.getBlogById && dataCategories?.getBlogCategories) {
            setCategoriesSelected(selectedValues())
        }
    }, [data, dataCategories])

    useEffect(() => {
        if (data?.getBlogById) {
            setIsFeatured(data?.getBlogById.isFeatured)
        }
    }, [data])

    const onChangeIsFeatured = ({ checked }) => {
        setIsFeatured(checked)
    }

    return (
        <Layout title={ t('LAYOUT_TITLES.EDIT_BLOG') }>
        { loading 
            ?   <Loading />
            :   error 
                ?   <ErrorCustomTableResults /> 
                :   <div className='bg-white shadow-md px-8 py-8 mb-4 gap-10'>
                        <Formik
                            validationSchema={schemaValidation}
                            enableReinitialize
                            initialValues={ data.getBlogById }
                            onSubmit={(values) => updateBlogOnDb(values)}
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
                                    <Select
                                        className="appearance-none rounder w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        getOptionValue={options => options.id}
                                        getOptionLabel={options => options.title}
                                        options={dataCategories?.getBlogCategories}
                                        onBlur={props.handleBlur}
                                        value={categoriesSelected}
                                        onChange={selected => onChangeSelected(selected)}
                                        placeholder={t('PLACEHOLDERS.CATEGORY')}
                                        noOptionsMessage={() => t('EMPTY.CATEGORIES')}
                                        required={true}
                                        isMulti={true}
                                        id='category'
                                    />
                                    <InputField
                                        label={t('LABELS.SUMMARY')}
                                        type='textarea'
                                        placeholder={t('PLACEHOLDERS.SUMMARY')}
                                        value='summary'
                                        formik={props}
                                    />
                                    <label className="inline-flex justify-center text-gray-700 text-sm font-bold mb-2 mr-2 leading-5" htmlFor="isFeatured">Marcar como destacada</label>
                                    <input 
                                        type="checkbox" 
                                        id="isFeatured" 
                                        name="isFeatured" 
                                        value="isFeatured"
                                        checked={isFeatured}
                                        onBlur={props.handleBlur}
                                        onChange={ev => onChangeIsFeatured(ev.target)}
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
                    </div>
        }
        </Layout>
    )
}

export default EditArticle