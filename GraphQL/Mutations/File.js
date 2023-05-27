import { gql } from '@apollo/client';

const UPLOAD_FILE = gql`
    mutation Mutation($input: FileInput) {
        uploadFile(input: $input) {
            url
        }
    }
`

module.exports = {
    UPLOAD_FILE
};