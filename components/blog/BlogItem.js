import React from 'react'
import TitleItem from '@components/blog/TitleItem'
import Metadata from '@components/blog/Metadata'
import SummaryItem from '@components/blog/SummaryItem'
import ImgBlogItem from '@components/blog/ImgBlogItem'
import Separator from '@components/shared/Structure/Separator';

const BlogItem = ({ article }) => {
    return (
        <div className="m-3 py-1 rounded bg-white shadow-lg" style={{'height': 'fit-content'}}>
            <ImgBlogItem img={article?.urlImage} />
            <TitleItem title={article.title} />
            <Metadata author={article.author} createdOn={article.createdOn} />
            <Separator size={1} />
            <SummaryItem summary={article.summary} />
        </div>
    )
}

export default BlogItem