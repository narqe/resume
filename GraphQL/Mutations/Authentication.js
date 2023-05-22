import { gql } from '@apollo/client';

const AUTH_USER = gql`
    mutation Mutation($input: AuthInput) {
        authUser(input: $input) {
            token
        }
    }
`;

const NEW_ACCOUNT = gql`
    mutation Mutation($input: UserInput) {
        newUser(input: $input){
            id
            name
            lastname
            email
            createdOn
        }
    }
`;

module.exports = {
    AUTH_USER,
    NEW_ACCOUNT
}