import React, { useEffect } from 'react';
import Layout from '@components/layouts/Layout';
import { useRouter } from 'next/router';
import BlogForm from '@components/shared/Forms/BlogForm';
import ImgBlogForm from '@components/shared/Forms/ImgBlogForm';
import { useTranslation } from 'react-i18next';
import BlogState from '@context/blogs/BlogState';

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
      <div className='bg-white shadow-md px-8 py-8 mb-4 grid md:grid-cols-3 sm:grid-cols-1 gap-10'>
        <BlogState>
          <BlogForm />
          <ImgBlogForm />
        </BlogState>
      </div>
    </Layout>
  )
}

export default NewBlog;
