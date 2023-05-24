import React, { useEffect, useState } from 'react';
import Layout from '../components/shared/Layout';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/shared/InputField';
import SubmitBtn from '../components/shared/SubmitBtn';
import { NEW_BLOG } from '../GraphQL/Mutations/Blog';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from 'next/dynamic';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const NewBlog = () => {  
  const [content, setContent] = useState("## Hello world!");
  const { t } = useTranslation();
  const [ newBlog ] = useMutation(NEW_BLOG);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        router.push("/login")
    }
  }, [])

  const formik = useFormik({
    initialValues: {
        title: '',
        author: '',
        summary: '',
    },
    validationSchema: Yup.object({ 
      title: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
      summary: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
    }),
    onSubmit: (values) => onUpload(values)
  })

  const onUpload = async ({ title, author, summary }) => {
    try {
      const { data } = await newBlog({
          variables: {
              input:  {
                title, 
                content: content,
                author,
                summary
              }
          }
      });
      router.push("/blog");
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Layout title={ t('LAYOUT_TITLES.NEW_BLOG') }>
      <form 
        onSubmit={formik.handleSubmit} 
        className='bg-white shadow-md px-8 py-8 mb-4'>
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
        <>
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor='content'>
            { t('LABELS.CONTENT') }
          </label>
          <MDEditor 
            id="content" 
            value={content} 
            onChange={setContent} 
          />
        </>
        <SubmitBtn value={t('BUTTONS.NEW_BLOG')} />
      </form>
    </Layout>
  )
}

export default NewBlog;
