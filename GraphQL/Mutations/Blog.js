import { gql } from '@apollo/client';

const NEW_BLOG = gql`
    mutation Mutation($input: BlogInput) {
        newBlog(input: $input) {
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
const UPDATE_BLOG = gql`
    mutation Mutation($id: ID!, $input: BlogInput) {
        updateBlog(id: $id, input: $input) {
            title,
            summary,
            content
        }
    }
`;

const DELETE_BLOG = gql`
    mutation Mutation($id: ID!) {
            deleteBlog(id: $id)
        }
    `;

module.exports = {
    NEW_BLOG,
    UPDATE_BLOG,
    DELETE_BLOG
}