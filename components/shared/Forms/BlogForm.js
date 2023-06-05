import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import InputField from '@components/shared/Inputs/InputField';
import MarkdownInput from '@components/blog/MarkdownInput';
import SubmitBtn from '@components/shared/Inputs/SubmitBtn';
import { useMutation, useQuery } from '@apollo/client';
import { NEW_BLOG } from '@graphql/Mutations/Blog';
import { GET_BLOGS, GET_BLOG_CATEGORIES } from '@graphql/Queries/Blog';
import Select from 'react-select';
import Swal from 'sweetalert2';

const BlogForm = () => {
    const [ categoriesSelected, setCategoriesSelected ] = useState(null);
    const [ isFeatured, setIsFeatured ] = useState(false);
    const router = useRouter()
    const { t } = useTranslation();
    const { data, loading } = useQuery(GET_BLOG_CATEGORIES);

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            summary: '',
            category: '',
            isFeatured: false,
            content: '## Hello world!'
        },
        validationSchema: Yup.object({ 
            title: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            summary: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            content: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            isFeatured: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        }),
        onSubmit: (values) => onUpload(values)
    })

    const onUpload = async ({ title, author, summary, content }) => {
        const catTitle = categoriesSelected.map(el => el.title)
        try {
            const { data } = await newBlog({
                variables: {
                    input:  {
                        title, 
                        content,
                        author,
                        category: catTitle,
                        summary,
                        isFeatured: isFeatured
                    }
                }
            });
            Swal.fire({
                text: t('MESSAGES.CONFIRMATION.ON_CREATE_BLOG.TITLE'),
                icon: 'success',
                iconColor: '#154e3a',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                router.push("/admin/blog")
            }, 1500)
        } catch (error) {
            console.log(error);
        }
    }
    
    const [ newBlog ] = useMutation(NEW_BLOG, { 
        update(cache, { data: { newBlog } }) {
            const { getBlogs } = cache.readQuery({ query: GET_BLOGS })

            cache.writeQuery({
                query: GET_BLOGS,
                data: { 
                    getBlogs: [...getBlogs, newBlog] 
                }
            })} 
        }
    )
    

    const onChangeSelected = (selected) => {
        setCategoriesSelected(selected)
    }


    const onChangeIsFeatured = ({ checked }) => {
        setIsFeatured(checked)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <InputField
                label={t('LABELS.TITLE')}
                type='text'
                placeholder={t('PLACEHOLDERS.TITLE')}
                value='title'
                formik={formik}
            />
            <InputField
                label={t('LABELS.AUTHOR')}
                type='text'
                placeholder={t('PLACEHOLDERS.AUTHOR')}
                value='author'
                formik={formik}
            />
            <Select
                className="appearance-none rounder w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                options={data?.getBlogCategories}
                getOptionValue={options => options.id}
                getOptionLabel={options => options.title}
                onBlur={formik.handleBlur}
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
                formik={formik}
            />  
            <label className="inline-flex justify-center text-gray-700 text-sm font-bold mb-2 mr-2 leading-5" htmlFor="isFeatured">Marcar como destacada</label>
            <input 
                type="checkbox" 
                id="isFeatured" 
                name="isFeatured" 
                value="isFeatured"
                onBlur={formik.handleBlur}
                onChange={ev => onChangeIsFeatured(ev.target)}
            />
            <MarkdownInput
                formik={formik} 
                label={t('LABELS.CONTENT')}
                value='content' 
            />         
            <SubmitBtn value={t('BUTTONS.NEW_BLOG')} />
        </form>
    )
}

export default BlogForm