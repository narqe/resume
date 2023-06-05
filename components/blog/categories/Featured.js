import React from 'react'
import TitleItem from '@components/blog/TitleItem'
import Metadata from '@components/blog/Metadata'
import SummaryItem from '@components/blog/SummaryItem'
import CatTags from '@components/blog/CatTags'
import Separator from '@components/shared/Structure/Separator';
import EmptyResults from '@components/shared/EmptyResults';
import FeaturedImage from '@components/blog/FeaturedImage';
import { useQuery } from '@apollo/client';
import { GET_FEATURED_POSTS } from '@graphql/Queries/Blog';
import { useTranslation } from 'react-i18next';
import Loading from '@components/shared/Loading';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Featured = ({ limit = 3, isAuth }) => {
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_FEATURED_POSTS, {
        variables: {
            limit
        }
    });

    return (
        loading 
            ?   <Loading />
            :   error 
                ?   <ErrorCustomTableResults />
                :   data?.getFeaturedPosts?.length 
                    ?   <>
                            <h1 className="text-2xl font-bold leading-5 m-4">{t(`CATEGORY_BLOG.FEATURED`)}</h1>
                            <Separator />
                            <Carousel
                                showStatus={false}
                                showIndicators={false}
                                showThumbs={false}
                                infiniteLoop
                                autoPlay
                                centreMode
                            >
                            { data.getFeaturedPosts.map(article => 
                                <div key={`__featured${article.id}`} className={`w-full`}>
                                    <div className="text-left m-3 rounded bg-white shadow-lg">
                                        <FeaturedImage img={article.content} />
                                        <TitleItem title={article.title} />
                                        <CatTags categories={article.category} />
                                        <Metadata author={article.author} createdOn={article.createdOn} />
                                        <Separator size={1} />
                                        <SummaryItem 
                                            summary={article.summary} 
                                            id={article.id} 
                                            isAdmin={false} 
                                            isAuth={isAuth}
                                        />
                                    </div>
                                </div>
                            )}            
                            </Carousel>
                        </>
                :  <EmptyResults message={t('EMPTY.BLOGS')} />
    )
}

export default Featured