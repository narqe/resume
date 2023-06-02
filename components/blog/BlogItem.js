import React from 'react'
import TitleItem from '@components/blog/TitleItem'
import Metadata from '@components/blog/Metadata'
import SummaryItem from '@components/blog/SummaryItem'
import ImgBlogItem from '@components/blog/ImgBlogItem'
import CatTags from '@components/blog/CatTags'
import Separator from '@components/shared/Structure/Separator';
import useCoverPhoto from '@hooks/useCoverPhoto'

const BlogItem = ({ article, isAdmin = true }) => {
    const { coverPhoto } = useCoverPhoto(article.content)

    return (
        <div className="m-3 py-1 rounded bg-white shadow-lg" style={{'height': 'fit-content'}}>
            <ImgBlogItem img={coverPhoto} />
            <TitleItem title={article.title} />
            <CatTags categories={article.category} />
            <Metadata author={article.author} createdOn={article.createdOn} />
            <Separator size={1} />
            <SummaryItem 
                summary={article.summary} 
                id={article.id} 
                isAdmin={isAdmin} 
            />
        </div>
    )
}

export default BlogItem