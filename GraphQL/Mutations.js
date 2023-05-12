import { gql } from '@apollo/client';

export const AUTH_USER = gql`
    mutation Mutation($input: AuthInput) {
        authUser(input: $input) {
            token
        }
    }
`;

export const NEW_ACCOUNT = gql`
    mutation Mutation($input: UserInput) {
        newUser(input: $input) {
            id
            name
            lastname
            email
            createdOn
        }
    }
`;

export const NEW_CLIENT = gql`
mutation Mutation($input: ClientInput) {
    newClient(input: $input) {
        id
        name
        lastname
        email
        company
        phone
    }
}
`

export default {
    AUTH_USER,
    NEW_ACCOUNT,
    NEW_CLIENT
};