import React, { useEffect } from 'react';
import Layout from '@components/layouts/Layout';
import { useRouter } from 'next/router';
import BlogForm from '@components/shared/Forms/BlogForm';
import { useTranslation } from 'react-i18next';

const NewBlog = () => {  
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        router.push("/admin/login")
    }
  }, [])

  return(
    <Layout title={ t('LAYOUT_TITLES.NEW_BLOG') }>
      <div className='bg-white shadow-md px-8 py-8 mb-4 gap-10'>
        <BlogForm />
      </div>
    </Layout>
  )
}

export default NewBlog;
