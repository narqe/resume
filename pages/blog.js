import React, { useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { useQuery } from '@apollo/client';
import { GET_BLOGS } from '../GraphQL/Queries/Blog';
import { useTranslation } from 'react-i18next';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import NewEntityBtn from '../components/shared/NewEntityBtn';
import EmptyResults from '../components/shared/EmptyResults';
import Loading from '../components/shared/Loading';
import ErrorCustomTableResults from '../components/shared/ErrorCustomTableResults';
import BlogItem from '../components/blog/BlogItem';

const Blog = () => {  
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_BLOGS);

  return(
    <Layout title={ t('LAYOUT_TITLES.BLOG') }>
      <NewEntityBtn link={'/newblog'} buttonLabel={'NEW_BLOG'} />
      { loading 
        ? <Loading />
        : error 
          ? <ErrorCustomTableResults />
          : data?.getBlogs.length
            ? <div className="lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid">
                { data.getBlogs.map(article => 
                  <BlogItem key={article.id} article={article} />
                )}
              </div>
            : <EmptyResults message={t('EMPTY.BLOGS')} 
        />
      }
    </Layout>
  )
}

export default Blog;
