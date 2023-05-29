import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BLOGS } from '@graphql/Queries/Blog';
import { useTranslation } from 'react-i18next';
import EmptyResults from '@components/shared/EmptyResults';
import Loading from '@components/shared/Loading';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';
import BlogItem from '@components/blog/BlogItem';
import ClientLayout from '@components/layouts/ClientLayout';
import ClientFooter from '@components/blog/ClientFooter';

const Index = () => {  
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_BLOGS);

    return (
        <ClientLayout>
            {   loading 
                    ? <Loading />
                    : error 
                        ? <ErrorCustomTableResults />
                        : data?.getBlogs.length
                        ? <div className="lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid">
                            { data.getBlogs.map(article => 
                            <div key={`__post${article.id}`} style={{'height': 'fit-content'}}>
                                <BlogItem article={article} />
                                <ClientFooter id={article.id} />
                            </div>
                            )}
                            </div>
                        : <EmptyResults message={t('EMPTY.BLOGS')} />
            }
        </ClientLayout>
    )
}

export default Index;
