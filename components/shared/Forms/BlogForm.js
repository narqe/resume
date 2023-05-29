import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import InputField from '@components/shared/Inputs/InputField';
import MarkdownInput from '@components/blog/MarkdownInput';
import SubmitBtn from '@components/shared/Inputs/SubmitBtn';
import { useMutation } from '@apollo/client';
import { NEW_BLOG } from '@graphql/Mutations/Blog';
import { GET_BLOGS } from '@graphql/Queries/Blog';
import BlogContext from '@context/blogs/BlogContext';

const BlogForm = () => {
    const blogContext = useContext(BlogContext);
    const { coverImage, setCoverImage } = blogContext;
    const router = useRouter()
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            summary: '',
            content: '## Hello world!'
        },
        validationSchema: Yup.object({ 
            title: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            summary: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
            content: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        }),
        onSubmit: (values) => onUpload(values)
    })

    const onUpload = async ({ title, author, summary, content }) => {
        try {
            const { data } = await newBlog({
                variables: {
                    input:  {
                        title, 
                        content,
                        author,
                        summary,
                        urlImage: coverImage
                    }
                }
            });
            setCoverImage(null)
            setTimeout(() => {
                router.push("/blog");
            }, 1000);
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

    return (
        <form onSubmit={formik.handleSubmit} className='col-span-2'>
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
            <InputField
                label={t('LABELS.SUMMARY')}
                type='textarea'
                placeholder={t('PLACEHOLDERS.SUMMARY')}
                value='summary'
                formik={formik}
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