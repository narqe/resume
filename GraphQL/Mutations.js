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
        newUser(input: $input){
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

export const DELETE_CLIENT = gql`
mutation Mutation($id: ID!) {
    deleteClient(id: $id)
}
`

export const UPDATE_CLIENT = gql`
mutation Mutation($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
        name
        lastname
        email
        company
        phone
    }
}
`

export const NEW_PRODUCT = gql`
    mutation Mutation($input: ProductInput) {
        newProduct(input: $input) {
            name
            quantity
            price
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation Mutation($id: ID!) {
        deleteProduct(id: $id)
    }
`;

export const UPDATE_PRODUCT = gql`
mutation Mutation($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
        name
        price
        quantity
    }
}
`;

export const NEW_ORDER = gql`
mutation Mutation($input: OrderInput) {
        newOrder(input: $input) {
            id
        }
    }
`

export const UPDATE_ORDER = gql`
mutation Mutation($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input) {
            state
        }
    }
`;

export const DELETE_ORDER = gql`
mutation Mutation($id: ID!) {
        deleteOrder(id: $id)
    }
`;

export default {
    AUTH_USER,
    NEW_ACCOUNT,
    NEW_CLIENT,
    DELETE_CLIENT,
    UPDATE_CLIENT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    NEW_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER
};