import { gql } from '@apollo/client';

const GET_BLOGS = gql`
    query Query {
        getBlogs {
            id
            title
            content
            author
            summary
            category
            createdOn
        }
    }
`
const GET_BLOG_BY_ID = gql`
    query Query($id: ID!) {
        getBlogById(id: $id) {
            id
            title
            content
            author
            summary
            category
            createdOn
        }
    }
`
const GET_LAST_BLOGS_BY_CATEGORY = gql`
    query Query($cat: CatInput) {
        getLastBlogsByCat(cat: $cat) {
            id
            title
            content
            author
            summary
            category
            createdOn
        }
    }
`


const GET_BLOG_CATEGORIES = gql`
    query Query {
        getBlogCategories {
            id
            title
        }
    }
`

module.exports = {
    GET_BLOGS,
    GET_BLOG_BY_ID,
    GET_LAST_BLOGS_BY_CATEGORY,
    GET_BLOG_CATEGORIES
}