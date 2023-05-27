import { gql } from '@apollo/client';

const GET_BLOGS = gql`
    query Query {
        getBlogs {
            id
            title
            content
            author
            summary
            urlImage
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
            urlImage
            createdOn
        }
    }
`

module.exports = {
    GET_BLOGS,
    GET_BLOG_BY_ID
}