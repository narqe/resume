import React from 'react'
import TitleItem from './TitleItem'
import Metadata from './Metadata'
import SummaryItem from './SummaryItem'
import Footer from './Footer'
import Separator from '../shared/Separator';
import ImgBlogItem from './ImgBlogItem'

const BlogItem = ({ article }) => {
    return (
        <div className="m-3 py-1 rounded bg-white shadow-lg" style={{'height': 'fit-content'}}>
            <ImgBlogItem img={article?.urlImage} />
            <TitleItem title={article.title} />
            <Metadata author={article.author} createdOn={article.createdOn} />
            <Separator size={1} />
            <SummaryItem summary={article.summary} />
            <Footer id={article.id} />
        </div>
    )
}

export default BlogItem