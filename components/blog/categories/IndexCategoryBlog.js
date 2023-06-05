import React from 'react'
import BlogItem from '@components/blog/BlogItem';
import EmptyResults from '@components/shared/EmptyResults';
import { useQuery } from '@apollo/client';
import { GET_LAST_BLOGS_BY_CATEGORY } from '@graphql/Queries/Blog';
import { useTranslation } from 'react-i18next';
import Loading from '@components/shared/Loading';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';
import Separator from '@components/shared/Structure/Separator';

const IndexCategoryBlog = ({ cat, limit = 10 }) => {
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
                            <h1 className="text-2xl font-bold leading-5 m-4">{t(`CATEGORY_BLOG.${cat}`)}</h1>
                            <Separator />
                            <div className={limit !== 1 ? `flex-row` : 'flex-col'}>
                                { data.getLastBlogsByCat.map(article => 
                                    <div 
                                        key={`__post${article.id}`} 
                                        className={limit !== 1 ? `w-full flex-col` : 'flex-col'} 
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

export default IndexCategoryBlog