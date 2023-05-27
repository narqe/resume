import React from 'react';
import { useRouter } from 'next/router';
import BlogLayout from '../../components/shared/BlogLayout';
import { useQuery } from '@apollo/client';
import Loading from '../../components/shared/Loading';
import { useTranslation } from 'react-i18next';
import ErrorCustomTableResults from '../../components/shared/ErrorCustomTableResults';
import { GET_BLOG_BY_ID } from '../../GraphQL/Queries/Blog';
import ArticleDetail from '../../components/blog/ArticleDetail';

const ViewArticle = () => {
    const router = useRouter();
    const { query } = router;
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_BLOG_BY_ID, {
        variables: {
            id: query.pid
        }
    });

    return (
        <BlogLayout 
            title={data?.getBlogById && data.getBlogById.title}
            author={data?.getBlogById && data.getBlogById.author}
            createdOn={data?.getBlogById && data.getBlogById.createdOn}
            url={data?.getBlogById && window.location}
            urlImage={data?.getBlogById && data.getBlogById?.urlImage}
        >
            { loading 
                ?   <Loading />
                :   error 
                    ?   <ErrorCustomTableResults /> 
                    :   <ArticleDetail article={data.getBlogById} />
            }
        </BlogLayout>
    )
}

export default ViewArticle