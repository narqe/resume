import React from 'react';
import { useRouter } from 'next/router';
import ClientBlogLayout from '@components/layouts/ClientBlogLayout';
import { useQuery } from '@apollo/client';
import Loading from '@components/shared/Loading';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';
import { GET_BLOG_BY_ID } from '@graphql/Queries/Blog';
import ArticleDetail from '@components/blog/ArticleDetail';

const ViewArticle = () => {
    const router = useRouter();
    const { query } = router;
    const { data, loading, error } = useQuery(GET_BLOG_BY_ID, {
        variables: {
            id: query.pid,
        }
    });

    return (
        <ClientBlogLayout
            title={data?.getBlogById && data.getBlogById.title}
            author={data?.getBlogById && data.getBlogById.author}
            createdOn={data?.getBlogById && data.getBlogById.createdOn}
            url={data?.getBlogById && window.location}
            content={data?.getBlogById && data.getBlogById?.content}
        >
            { loading 
                ?   <Loading />
                :   error 
                    ?   <ErrorCustomTableResults /> 
                    :   <ArticleDetail article={data.getBlogById} />
            }
        </ClientBlogLayout>
    )
}

export default ViewArticle