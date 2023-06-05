import React from 'react'
import BlogItem from '@components/blog/BlogItem';
import EmptyResults from '@components/shared/EmptyResults';
import { useQuery } from '@apollo/client';
import { GET_LAST_BLOGS_BY_CATEGORY } from '@graphql/Queries/Blog';
import { useTranslation } from 'react-i18next';
import Loading from '@components/shared/Loading';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';
import Separator from '@components/shared/Structure/Separator';

const CategoryBlog = ({ cat, limit = 50 }) => {
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_LAST_BLOGS_BY_CATEGORY, {
        variables: {
            cat,
            limit
        }
    });

    return (
        loading 
            ?   <Loading />
            :   error 
                ?   <ErrorCustomTableResults />
                :   data?.getLastBlogsByCat?.length 
                    ?   <>
                            <h1 className="text-2xl font-bold leading-5 m-4">
                                {t(`CATEGORY_BLOG.${cat}`)}
                            </h1>
                            <Separator />
                            <div className='lg:inline-flex w-full'>
                                { data.getLastBlogsByCat.map(article => 
                                    <div 
                                        key={`__${cat}-post-${article.id}`} 
                                        className="lg:w-1/4 md:w-1/2 md:inline-flex flex w-full" 
                                        style={{'height': 'fit-content'}}
                                    >
                                        <BlogItem article={article} isAdmin={false} />
                                    </div>
                                )}
                            </div>
                        </>
                :  <EmptyResults message={t('EMPTY.BLOGS')} />
    )
}

export default CategoryBlog