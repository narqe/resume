import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BLOGS, GET_LAST_BLOGS_BY_CATEGORY } from '@graphql/Queries/Blog';
import { useTranslation } from 'react-i18next';
import EmptyResults from '@components/shared/EmptyResults';
import Loading from '@components/shared/Loading';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';
import BlogItem from '@components/blog/BlogItem';
import ClientLayout from '@components/layouts/ClientLayout';
import { useRouter } from 'next/router';
import Music from '@components/blog/categories/Music';
import Separator from '@components/shared/Structure/Separator';

const Index = () => {
    const router = useRouter()
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_BLOGS);
    const { data: dataCat } = useQuery(GET_LAST_BLOGS_BY_CATEGORY, {
        variables: {
            cat: 'MUSIC'
        }
    });

    if (error) {
        localStorage.removeItem('token');
        // router.reload();
    }

    return (
        <ClientLayout>
            {   loading 
                    ?   <Loading />
                    :   error 
                        ?   <ErrorCustomTableResults />
                        : 
                            <>
                            { dataCat?.getLastBlogsByCat?.length 
                                ?   <>
                                        <div className="w-full inline-flex">
                                            { dataCat.getLastBlogsByCat.map(article => 
                                                <div key={`__post${article.id}`} className="w-2/6 flex" style={{'height': 'fit-content'}}>
                                                    <Music article={article} isAdmin={false} />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                :  <EmptyResults message={t('EMPTY.BLOGS')} />
                            }
                            <Separator />
                            { data?.getBlogs.length
                                ?   <div className="lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid">
                                        { data?.getBlogs.map(article => 
                                            <div key={`__post${article.id}`} style={{'height': 'fit-content'}}>
                                                <BlogItem 
                                                    article={article}
                                                    isAdmin={false}
                                                />
                                            </div>
                                        )}
                                    </div>
                                :   <EmptyResults message={t('EMPTY.BLOGS')} />
                            }
                            </>
            }
        </ClientLayout>
    )
}

export default Index;
