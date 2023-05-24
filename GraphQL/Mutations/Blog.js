import { gql } from '@apollo/client';

const NEW_BLOG = gql`
    mutation Mutation($input: BlogInput) {
        newBlog(input: $input) {
            title
            content
            author
            summary
            createdOn
        }
    }
`

module.exports = {
    NEW_BLOG
}